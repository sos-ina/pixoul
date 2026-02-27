
const axios = require("axios");

const DEFAULT_MODEL = "models/gemini-2.5-flash";
const GEMINI_TIMEOUT_MS = 15000;

function normalizeText(s) {
  return String(s || "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function pickVariant(message, variants) {
  const text = String(message || "");
  let sum = 0;
  for (let i = 0; i < text.length; i += 1) sum += text.charCodeAt(i);
  const idx = variants.length ? sum % variants.length : 0;
  return variants[idx] || variants[0] || "";
}

function isGreetingMessage(message) {
  const t = normalizeText(message);
  if (!t) return false;

  const greetingPhrases = [
    "hi",
    "hello",
    "hey",
    "good morning",
    "good afternoon",
    "good evening",
    "how are you",
    "how r u",
    "hru",
    "what's up",
    "whats up",
    "thanks",
    "thank you",
  ];

  return greetingPhrases.some((p) => t === p || t.startsWith(`${p} `) || t.includes(` ${p} `));
}

function isPixoulRelated(message) {
  const t = normalizeText(message);
  if (!t) return false;

  const keywords = [
    "pixoul",
    "al qana",
    "abu dhabi",
    "gaming",
    "vr",
    "virtual reality",
    "arcade",
    "console",
    "pc",
    "party",
    "birthday",
    "team building",
    "booking",
    "book",
    "reserve",
    "event",
    "pricing",
    "price",
    "cost",
    "package",
    "membership",
    "hours",
    "timing",
    "open",
    "location",
    "address",
    "phone",
    "contact",
    "community",
    "reviews",
    "leaderboard",
    "challenges",
  ];

  return keywords.some((k) => t.includes(k));
}

const SYSTEM_PROMPT = `You are Pixoul Assistant, the official AI assistant for Pixoul Gaming LLC.

You MUST strictly follow these rules:

1. Only use the official company information provided.
2. Pixoul Gaming is located at Al Qana Walk, Abu Dhabi, UAE.
3. Do NOT invent additional branches or locations.
4. Do NOT invent pricing, policies, schedules, or business history.
5. If you are unsure about a business fact, say:
   'I don't have confirmed information about that. Please contact Pixoul directly for accurate details.'
5a. If the user asks for pricing, offers, timings, age restrictions, booking rules, or any other operational detail not explicitly provided, you MUST use the sentence above.
6. Keep responses short (3–6 sentences).
7. Maintain a friendly, energetic, and professional tone.
8. Encourage visiting Pixoul naturally but do not push aggressively.
9. For recommendations, personalize based on group size, mood, and occasion.`;

const KNOWLEDGE_BLOCK = `Official Pixoul Business Data:
- Company Name: Pixoul Gaming LLC
- Location: Al Qana Walk, Abu Dhabi, UAE
- Phone: +971 2 418 6699
- Services: Virtual Reality (VR) Experiences, Console Gaming, Arcade Games, Multiplayer Battles, Redemption Games
- Target Audience: Families, Groups of friends, Corporate team building, Birthday parties
- Brand Personality: High-tech, Immersive, Energetic, Friendly, Professional`;

async function createChatReply({ message }) {
  const model = (process.env.GEMINI_MODEL || DEFAULT_MODEL).trim();

  const normalizedModel = model.startsWith("models/") ? model : `models/${model}`;

  const userMessage = typeof message === "string" ? message.trim() : "";
  if (!userMessage) {
    const err = new Error("missing_message");
    err.statusCode = 400;
    throw err;
  }

  if (isGreetingMessage(userMessage)) {
    return pickVariant(userMessage, [
      "Hi! I\'m the Pixoul Assistant. Ask me anything about Pixoul — VR games, events, birthday parties, or the community.",
      "Hello! Pixoul Assistant here. How can I help you with Pixoul today (games, events, or the community)?",
      "Hey! I\'m Pixoul Assistant. What would you like to explore at Pixoul — VR, arcade, events, or community pages?",
    ]);
  }

  if (!isPixoulRelated(userMessage)) {
    return pickVariant(userMessage, [
      "Sorry — that\'s outside my scope. I\'m the Pixoul Assistant and I can only help with Pixoul-related questions. For anything else, please contact Pixoul customer service at +971 2 418 6699.",
      "I\'m sorry, I can\'t help with that. I\'m the Pixoul Assistant (Pixoul-only questions like games, events, bookings, and location). If you need help, please contact +971 2 418 6699.",
      "That question isn\'t in my context. I\'m the Pixoul Assistant and I can answer Pixoul-related topics only. For support, please reach Pixoul at +971 2 418 6699.",
    ]);
  }

  if (!process.env.GEMINI_API_KEY) {
    const err = new Error("missing_gemini_api_key");
    err.statusCode = 500;
    throw err;
  }

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/${normalizedModel}:generateContent?key=${encodeURIComponent(
      process.env.GEMINI_API_KEY
    )}`;

    const payload = {
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `${SYSTEM_PROMPT}\n\n${KNOWLEDGE_BLOCK}\n\nUser: ${userMessage}`,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 220,
      },
    };

    const result = await axios.post(url, payload, { timeout: GEMINI_TIMEOUT_MS });

    const parts = result?.data?.candidates?.[0]?.content?.parts;
    const reply = Array.isArray(parts)
      ? parts
          .map((p) => p?.text)
          .filter(Boolean)
          .join("")
          .trim()
      : "";

    return typeof reply === "string" ? reply : "";
  } catch (err) {
    const isTimeout = err?.code === "ECONNABORTED";
    const status =
      Number(err?.response?.status) || (isTimeout ? 504 : 0) || Number(err?.status) || 500;
    const details =
      typeof err?.response?.data?.error?.message === "string"
        ? err.response.data.error.message.slice(0, 500)
        : typeof err?.message === "string"
          ? err.message.slice(0, 500)
          : "";

    console.error(
      "Gemini API error:",
      status,
      `model=${normalizedModel}`,
      details ? `| ${details}` : ""
    );

    const e = new Error("gemini_api_error");
    e.statusCode = status;
    e.details = details;

    throw e;
  }
}

module.exports = {
  createChatReply,
};
