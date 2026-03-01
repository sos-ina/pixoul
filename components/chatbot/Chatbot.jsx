"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { intents } from "@/lib/chatbotIntents";
import ChatBotIcon from "@/public/logos/chat-icon.png";


const GREETING_MESSAGE =
  "Hi! I\'m the Pixoul Assistant. Ask me anything about Pixoul — VR games, events, birthday parties, or the community.";
const FALLBACK_MESSAGE =
  "Sorry — that\'s outside my scope. I\'m the Pixoul Assistant and I can only help with Pixoul-related questions. For help, contact Pixoul at +971 2 418 6699.";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

const CHAT_API_BASE_URL =
  process.env.NEXT_PUBLIC_CHAT_API_URL || API_BASE_URL;

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function matchesKeyword(normalizedInput, keyword) {
  const normalizedKeyword = keyword.toLowerCase().trim();
  if (!normalizedKeyword) return false;

  const isPhrase = /\s/.test(normalizedKeyword);
  if (isPhrase) return normalizedInput.includes(normalizedKeyword);

  const re = new RegExp(`\\b${escapeRegExp(normalizedKeyword)}\\b`, "i");
  return re.test(normalizedInput);
}

function resolveIntent(input) {
  const normalized = input.toLowerCase();

  return (
    intents.find((intent) =>
      intent.keywords.some((keyword) => matchesKeyword(normalized, keyword))
    ) || null
  );
}

export default function Chatbot() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [hasGreeted, setHasGreeted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const scrollRef = useRef(null);

  const canSend = useMemo(() => input.trim().length > 0, [input]);

  useEffect(() => {
    intents.forEach((intent) => {
      if (intent?.route) router.prefetch(intent.route);
    });
  }, [router]);

  useEffect(() => {
    if (!isOpen) return;
    if (hasGreeted) return;

    setMessages([{ from: "bot", text: GREETING_MESSAGE }]);
    setHasGreeted(true);
  }, [hasGreeted, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const el = scrollRef.current;
    if (!el) return;

    el.scrollTop = el.scrollHeight;
  }, [isOpen, messages.length]);

  async function sendMessage() {
    const userText = input.trim();
    if (!userText) return;

    if (isLoading) return;

    setInput("");

    const intent = resolveIntent(userText);

    const wantsNavigation =
      !!intent?.route &&
      /\b(go to|take me|open|navigate|show me|bring me)\b/i.test(userText);

    const shouldCallApi = !intent || !intent?.route || !wantsNavigation;

    const loadingId = `${Date.now()}-${Math.random().toString(16).slice(2)}`;

    setMessages((prev) => {
      const next = [...prev, { from: "user", text: userText }];

      if (intent?.route && wantsNavigation) {
        return [...next, { from: "bot", text: intent?.response || FALLBACK_MESSAGE }];
      }

      if (shouldCallApi) {
        return [...next, { id: loadingId, from: "bot", text: "Thinking..." }];
      }

      return [...next, { from: "bot", text: FALLBACK_MESSAGE }];
    });

    if (intent?.route && wantsNavigation) {
      setTimeout(() => {
        router.push(intent.route);
      }, 150);
      return;
    }

    if (!shouldCallApi) return;

    setIsLoading(true);
    try {
      const history = [...messages, { from: "user", text: userText }]
        .filter((m) => m?.from && typeof m?.text === "string" && m.text && m.text !== "Thinking...")
        .slice(-12);

      async function fetchChat(baseUrl) {
        const resp = await fetch(`${baseUrl}/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userText, history }),
        });

        const data = await resp.json().catch(() => null);
        const reply = typeof data?.reply === "string" ? data.reply : "";
        return { ok: resp.ok, reply };
      }

      let result = await fetchChat(CHAT_API_BASE_URL);
      if (!result?.ok || !result?.reply) {
        if (API_BASE_URL && API_BASE_URL !== CHAT_API_BASE_URL) {
          result = await fetchChat(API_BASE_URL);
        }
      }

      const reply = result?.reply || "";
      if (!reply) throw new Error("chat_failed");

      setMessages((prev) =>
        prev.map((m) => (m.id === loadingId ? { ...m, text: reply } : m))
      );
    } catch (e) {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === loadingId
            ? { ...m, text: "Sorry — I\'m having trouble right now. Please try again. If you need support, contact Pixoul at +971 2 418 6699." }
            : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="fixed right-4 top-[60%] -translate-y-1/2 z-[60] font-lato">
      <div className="flex flex-col items-center">
        {isOpen && (
          <div className="mb-3 w-[22rem] max-w-[calc(100vw-2rem)] rounded-2xl border border-white/10 dark:bg-black/90 bg-white/90 backdrop-blur-md shadow-2xl">
          <div className="flex items-center justify-between px-4 py-3 border-b dark:border-white/10 border-white/10">
            <div className="text-sm font-semibold">Pixoul Assistant</div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="dark:text-white/70 text-black/70 hover:text-white text-sm"
              aria-label="Close chatbot"
            >
              ✕
            </button>
          </div>

          <div
            ref={scrollRef}
            className="max-h-80 overflow-y-auto px-4 py-3 space-y-3"
          >
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={
                  m.from === "user" ? "flex justify-end" : "flex justify-start"
                }
              >
                <div
                  className={
                    m.from === "user"
                      ? "max-w-[85%] rounded-2xl rounded-br-md bg-[#38C2D9] px-3 py-2 text-sm text-black dark:text-white"
                      : "max-w-[85%] rounded-2xl rounded-bl-md bg-white/10 px-3 py-2 text-sm text-black dark:text-white"
                  }
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 px-4 py-3 border-t border-white/10">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
              placeholder="Type a message..."
              className="flex-1 rounded-xl bg-black/40 border border-white/10 px-3 py-2 text-sm outline-none focus:border-white/30"
            />
            <button
              type="button"
              onClick={sendMessage}
              disabled={!canSend || isLoading}
              className="rounded-xl bg-white dark:bg-black text-black dark:text-white px-3 py-2 text-sm font-semibold disabled:opacity-50"
            >
              Send
            </button>
          </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          className="h-24 w-24 rounded-full bg-transparent shadow-xl hover:opacity-95 overflow-hidden"
          aria-label="Open chatbot"
        >
          <Image
            src={ChatBotIcon}
            alt="Chatbot"
            width={96}
            height={96}
            className="h-full w-full object-cover"
            priority
          />
        </button>
      </div>
    </div>
  );
}