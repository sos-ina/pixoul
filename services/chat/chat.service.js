
const axios = require("axios");

const DEFAULT_MODEL = "models/gemini-2.5-flash";

async function listAvailableModels({ apiKey }) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(
    apiKey
  )}`;
  const resp = await axios.get(url, { timeout: 20000 });
  const models = Array.isArray(resp?.data?.models) ? resp.data.models : [];

  return models
    .filter((m) => Array.isArray(m?.supportedGenerationMethods))
    .filter((m) => m.supportedGenerationMethods.includes("generateContent"))
    .map((m) => m?.name)
    .filter(Boolean);
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
  if (!process.env.GEMINI_API_KEY) {
    const err = new Error("missing_gemini_api_key");
    err.statusCode = 500;
    throw err;
  }

  const model = (process.env.GEMINI_MODEL || DEFAULT_MODEL).trim();

  const userMessage = typeof message === "string" ? message.trim() : "";
  if (!userMessage) {
    const err = new Error("missing_message");
    err.statusCode = 400;
    throw err;
  }

  try {
    const { GoogleGenAI } = await import("@google/genai");
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const result = await ai.models.generateContent({
      model,
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
    });

    const reply =
      typeof result?.text === "string"
        ? result.text.trim()
        : result?.candidates?.[0]?.content?.parts
            ?.map((p) => p?.text)
            .filter(Boolean)
            .join("")
            .trim();

    return typeof reply === "string" ? reply : "";
  } catch (err) {
    const status = Number(err?.status) || Number(err?.code) || 500;
    const details =
      typeof err?.message === "string" ? err.message.slice(0, 500) : "";

    console.error(
      "Gemini API error:",
      status,
      `model=${model}`,
      details ? `| ${details}` : ""
    );

    const e = new Error("gemini_api_error");
    e.statusCode = status;
    e.details = details;

    if (status === 404 && process.env.GEMINI_API_KEY) {
      try {
        e.availableModels = await listAvailableModels({
          apiKey: process.env.GEMINI_API_KEY,
        });
      } catch (inner) {
        // ignore
      }
    }

    throw e;
  }
}

module.exports = {
  createChatReply,
};
