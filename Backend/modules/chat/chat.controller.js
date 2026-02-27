const { createChatReply } = require("./chat.service");

const FALLBACK_REPLY =
  "I can help you navigate the site. Try asking about VR games, events, or the community.";

async function chatController(req, res) {
  try {
    const incomingMessage =
      req.body?.message ?? req.body?.text ?? req.body?.content ?? "";

    const reply = await createChatReply({ message: incomingMessage });

    if (!reply) {
      return res.json({ reply: FALLBACK_REPLY });
    }

    return res.json({ reply });
  } catch (err) {
    const statusCode = Number(err?.statusCode) || 500;

    if (err?.message === "missing_message") {
      return res.status(400).json({ reply: "Please type a message." });
    }

    if (err?.message === "gemini_api_error") {
      return res.status(200).json({ reply: FALLBACK_REPLY });
    }

    if (err?.message === "missing_gemini_api_key") {
      return res.status(200).json({ reply: FALLBACK_REPLY });
    }

    if (statusCode === 401 || statusCode === 403) {
      return res.status(200).json({ reply: FALLBACK_REPLY });
    }

    if (statusCode === 429) {
      return res.status(200).json({ reply: FALLBACK_REPLY });
    }

    return res.status(200).json({ reply: FALLBACK_REPLY });
  }
}

module.exports = {
  chatController,
};
