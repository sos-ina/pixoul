const { createChatReply } = require("./chat.service");

const FALLBACK_REPLY = "Sorry, I'm having trouble right now. Please try again.";

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

    if (err?.message === "gemini_api_error" && statusCode === 400) {
      return res.status(400).json({
        reply:
          "Chat service rejected the request (400). Please try again, or contact support if it keeps happening.",
      });
    }

    if (err?.message === "gemini_api_error" && statusCode === 404) {
      const available = Array.isArray(err?.availableModels)
        ? err.availableModels
        : [];

      if (available.length) {
        return res.status(404).json({
          reply: `Gemini model not found. Set GEMINI_MODEL in .env.local to one of: ${available
            .slice(0, 12)
            .join(", ")}${available.length > 12 ? ", ..." : ""}`,
        });
      }

      return res.status(404).json({
        reply:
          "Gemini model not found. Set GEMINI_MODEL in .env.local to a model available to your API key.",
      });
    }

    if (err?.message === "missing_gemini_api_key") {
      return res
        .status(500)
        .json({ reply: "Server is missing GEMINI_API_KEY configuration." });
    }

    if (statusCode === 401 || statusCode === 403) {
      return res
        .status(statusCode)
        .json({ reply: "Chat service authentication failed. Please check GEMINI_API_KEY." });
    }

    if (statusCode === 429) {
      return res
        .status(429)
        .json({ reply: "Chat service is busy right now. Please try again in a moment." });
    }

    return res.status(500).json({ reply: FALLBACK_REPLY });
  }
}

module.exports = {
  chatController,
};
