"use client";
import { createPortal } from "react-dom";
import { useMemo, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function EmailConfirmationModal({ isOpen, email, onClose }) {
  const supabase = useMemo(() => createClient(), []);
  const [status, setStatus] = useState({ type: "idle", message: "" });

  if (!isOpen) return null;
  if (typeof document === "undefined") return null;

  const handleResend = async () => {
    if (!email) return;
    setStatus({ type: "loading", message: "" });

    try {
      const { error } = await supabase.auth.resend({ type: "signup", email });
      if (error) throw error;
      setStatus({ type: "ok", message: "Verification email sent." });
    } catch (err) {
      setStatus({ type: "error", message: err?.message || "Failed to resend email." });
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[40] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40"
      />
      <div className="relative w-full max-w-lg border border-[#00d4ff]/30 bg-[#0a0a0a] p-8 shadow-2xl">
        <div className="text-white" style={{ fontFamily: "Orbitron, monospace" }}>
          Verify Your Email
        </div>

        <div className="mt-3 text-sm text-white/60">
          We&apos;ve sent a confirmation email to{" "}
          <span className="text-white font-semibold">{email || "your email"}</span>.
        </div>
        <div className="mt-2 text-sm text-white/50">
          Click the link in your email to verify your account.
        </div>
        <div className="mt-2 text-sm text-white/50">
          After verification, you&apos;ll be automatically logged in.
        </div>

        {status.type === "error" ? (
          <div className="mt-4 text-sm text-pink-400">{status.message}</div>
        ) : null}
        {status.type === "ok" ? (
          <div className="mt-4 text-sm text-[#00d4ff]">{status.message}</div>
        ) : null}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="border border-white/10 px-6 py-3 text-xs font-bold uppercase tracking-[0.28em] text-white/60 hover:text-white"
            disabled={status.type === "loading"}
          >
            Close
          </button>

          <button
            type="button"
            onClick={handleResend}
            className="border border-[#00d4ff] px-6 py-3 text-xs font-bold uppercase tracking-[0.28em] text-[#00d4ff] hover:bg-[#00d4ff] hover:text-black disabled:opacity-60"
            disabled={status.type === "loading" || !email}
          >
            {status.type === "loading" ? "Resending..." : "Resend Email"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
