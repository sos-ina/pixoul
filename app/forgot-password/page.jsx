"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authAPI } from "@/lib/api/experiences";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    setError("");
    setMessage("");
    setIsLoading(true);

    try {
      const result = await authAPI.forgotPassword(email);
      setMessage(result?.message || "If an account exists, a password reset email has been sent.");
    } catch (err) {
      setError(err?.message || "Failed to send reset email");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white flex items-center justify-center px-6">
      <div className="max-w-lg w-full border border-white/10 bg-white/5 p-8 rounded-2xl">
        <div className="text-xl font-semibold" style={{ fontFamily: "Orbitron, monospace" }}>
          Forgot Password
        </div>
        <div className="text-sm text-white/70 mt-2">
          Enter your email and we’ll send you a link to reset your password.
        </div>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs text-white/70 mb-2">Email</label>
            <input
              type="email"
              className="w-full bg-black/40 border border-white/10 rounded-md px-4 py-3 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="player@pixoul.com"
            />
          </div>

          {error ? <div className="text-sm text-red-400">{error}</div> : null}
          {message ? <div className="text-sm text-white/70">{message}</div> : null}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 px-4 py-3 rounded-md border border-cyan-400 text-cyan-300 hover:bg-cyan-400/10 disabled:opacity-50"
            style={{ fontFamily: "Orbitron, monospace" }}
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <button
          type="button"
          className="mt-4 w-full text-sm text-white/60 hover:text-cyan-300"
          onClick={() => router.push("/login")}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}
