"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tokens, setTokens] = useState(null);
  const [tokensChecked, setTokensChecked] = useState(false);

  useEffect(() => {
    const parseTokens = () => {
      const hash = String(window.location.hash || "").replace(/^#/, "");
      const search = String(window.location.search || "").replace(/^\?/, "");

      const params = new URLSearchParams(hash || search);
      const accessToken = params.get("access_token");
      const refreshToken = params.get("refresh_token");
      const type = params.get("type");

      if (!accessToken || !refreshToken) return null;
      return { accessToken, refreshToken, type };
    };

    setTokens(parseTokens());
    setTokensChecked(true);
  }, []);

  useEffect(() => {
    if (!tokensChecked) return;
    if (!tokens) {
      setError("Invalid or expired reset link. Please request a new one.");
      return;
    }

    if (tokens.type && tokens.type !== "recovery") {
      setMessage("Link opened. Please set a new password.");
      return;
    }

    setMessage("Link verified. Please set a new password.");
  }, [tokens]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    setError("");
    setMessage("");

    if (!tokens) {
      setError("Invalid or expired reset link. Please request a new one.");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const supabase = createClient();

      const { error: sessionError } = await supabase.auth.setSession({
        access_token: tokens.accessToken,
        refresh_token: tokens.refreshToken,
      });

      if (sessionError) {
        setError("Invalid or expired reset link. Please request a new one.");
        return;
      }

      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) throw updateError;

      const { data: sessionData, error: getSessionError } = await supabase.auth.getSession();
      if (getSessionError) throw getSessionError;

      const token = sessionData?.session?.access_token;
      if (token) {
        localStorage.setItem("auth_token", token);
        window.dispatchEvent(new Event("auth:changed"));
      }

      setMessage("Password updated successfully. Redirecting...");
      router.replace("/community/player-profile");
    } catch (err) {
      setError(err?.message || "Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white flex items-center justify-center px-6">
      <div className="max-w-lg w-full border border-white/10 bg-white/5 p-8 rounded-2xl">
        <div className="text-xl font-semibold" style={{ fontFamily: "Orbitron, monospace" }}>
          Reset Password
        </div>
        <div className="text-sm text-white/70 mt-2">Choose a new password for your account.</div>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs text-white/70 mb-2">New Password</label>
            <input
              type="password"
              className="w-full bg-black/40 border border-white/10 rounded-md px-4 py-3 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
            />
          </div>

          <div>
            <label className="block text-xs text-white/70 mb-2">Confirm Password</label>
            <input
              type="password"
              className="w-full bg-black/40 border border-white/10 rounded-md px-4 py-3 outline-none"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
            />
          </div>

          {error ? <div className="text-sm text-red-400">{error}</div> : null}
          {message ? <div className="text-sm text-white/70">{message}</div> : null}

          <button
            type="submit"
            disabled={isLoading || !tokensChecked || !tokens}
            className="w-full mt-2 px-4 py-3 rounded-md border border-cyan-400 text-cyan-300 hover:bg-cyan-400/10 disabled:opacity-50"
            style={{ fontFamily: "Orbitron, monospace" }}
          >
            {isLoading ? "Updating..." : "Update Password"}
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
