"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function AuthCallbackPage() {
  const router = useRouter();
  const params = useSearchParams();
  const [message, setMessage] = useState("Completing sign-in...");

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      try {
        const supabase = createClient();
        const code = params?.get("code");

        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) throw error;
        }

        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;

        const token = data?.session?.access_token;
        if (!token) {
          setMessage("No session found. Please sign in again.");
          return;
        }

        localStorage.setItem("auth_token", token);
        window.dispatchEvent(new Event("auth:changed"));

        if (!cancelled) {
          router.replace("/community/player-profile/settings");
        }
      } catch (err) {
        setMessage(err?.message || "Failed to complete sign-in.");
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [params, router]);

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white flex items-center justify-center px-6">
      <div className="max-w-lg w-full text-center border border-white/10 bg-white/5 p-8 rounded-2xl">
        <div className="text-sm text-white/70" style={{ fontFamily: "Orbitron, monospace" }}>
          {message}
        </div>
      </div>
    </div>
  );
}
