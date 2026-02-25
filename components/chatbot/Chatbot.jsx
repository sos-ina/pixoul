"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { intents } from "@/lib/chatbotIntents";
import ChatBotIcon from "./Image/ChatBot.png";

const GREETING_MESSAGE = "Hi! I can help you navigate Pixoul. What are you looking for?";
const FALLBACK_MESSAGE =
  "I can help you navigate the site. Try asking about VR games, events, or the community.";

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

    const shouldCallApi =
      !intent || intent.type === "casual" || intent.type === "recommendation";

    const loadingId = `${Date.now()}-${Math.random().toString(16).slice(2)}`;

    setMessages((prev) => {
      const next = [...prev, { from: "user", text: userText }];

      if (shouldCallApi) {
        return [...next, { id: loadingId, from: "bot", text: "Thinking..." }];
      }

      return [...next, { from: "bot", text: intent.response }];
    });

    if (intent?.route) {
      setTimeout(() => {
        router.push(intent.route);
      }, 150);
      return;
    }

    if (!shouldCallApi) return;

    setIsLoading(true);
    try {
      const resp = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      });

      const data = await resp.json().catch(() => null);
      const reply = typeof data?.reply === "string" ? data.reply : "";

      if (!reply) throw new Error("chat_failed");

      setMessages((prev) =>
        prev.map((m) => (m.id === loadingId ? { ...m, text: reply } : m))
      );
    } catch (e) {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === loadingId
            ? { ...m, text: "Sorry, I'm having trouble right now. Please try again. For now I can only help you navigate the site." }
            : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="fixed right-4 top-[60%] -translate-y-1/2 z-[60]">
      <div className="flex flex-col items-center">
        {isOpen && (
          <div className="mb-3 w-[22rem] max-w-[calc(100vw-2rem)] rounded-2xl border dark:border-white/10 border-white/10 dark:bg-black/90 bg-white/90 backdrop-blur-md shadow-2xl">
          <div className="flex items-center justify-between px-4 py-3 border-b dark:border-white/10 border-white/10">
            <div className="text-sm font-semibold">Pixoul Assistant</div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="dark:text-white/70 text-black/70 hover:dark:text-white hover:text-black text-sm"
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
                      ? "max-w-[85%] rounded-2xl rounded-br-md bg-[#007EC6] px-3 py-2 text-sm dark:text-white text-black"
                      : "max-w-[85%] rounded-2xl rounded-bl-md dark:bg-white/10 bg-black/10 px-3 py-2 text-sm dark:text-white text-black"
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
              className="flex-1 rounded-xl bg-white dark:bg-black/40 border border-white/10 px-3 py-2 text-sm outline-none focus:border-white/30"
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
