"use client";

import { useState } from "react";
import Link from "next/link";
import RobloxShowdownForm from "@/components/forms/RobloxShowdownForm";

export default function RobloxWeeklyShowdownPage() {
  const [open, setOpen] = useState(false);

  const chips = [
    "Entry fee: AED 40 (Incl. VAT)",
    "Every Sunday • 5:00 PM",
    "Only 10 spots",
    "Mobile devices provided",
    "Roblox accounts provided",
    "Ages 5–14",
    "Max duration: 1 hour",
    "Prize: Robux gift card",
  ];

  const terms = [
    "Played on mobile phones provided by Pixoul Gaming.",
    "Played on Roblox accounts provided by Pixoul Gaming.",
    "Maximum duration of one hour.",
    "Open to participants aged 5 to 14 years old.",
    "Winner receives a Robux gift card via email or WhatsApp immediately after winning.",
    "Participants may join every week.",
  ];

  return (
    <div className="min-h-screen dark:bg-[#0a0a0a] dark:text-white bg-white text-black pt-28 px-6 pb-20">
      <div className="max-w-6xl mx-auto">
        {/* Back */}
        <div className="mb-6">
          <Link
            href="/community/tournaments"
            className="text-[10px] font-black uppercase tracking-[0.3em] text-black/60 dark:text-gray-500 hover:text-[#38C2D9] transition"
          >
            ← Back to Tournaments Hub
          </Link>
        </div>

        {/* HERO */}
        <div className="relative overflow-hidden border border-black/10 dark:border-white/10 bg-white dark:bg-gradient-to-br dark:from-[#111] dark:to-black rounded-none p-8 sm:p-10 md:p-12 shadow-2xl">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#38C2D9]/7 blur-[130px] rounded-full" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#38C2D9]/6 blur-[130px] rounded-full" />

          <div className="relative z-10 max-w-3xl">
            <p className="text-[10px] font-black uppercase tracking-[0.35em] text-black/60 dark:text-gray-500">
              Roblox Weekly Showdown
            </p>

            <h1 className="mt-3 text-5xl sm:text-6xl font-black uppercase tracking-tighter">
              Mobile <span className="text-[#38C2D9]">Tournament</span>
            </h1>

            <p className="mt-4 text-black/60 dark:text-gray-400 text-sm leading-relaxed">
              Looking for the ultimate mobile gaming showdown? With only{" "}
              <span className="font-semibold text-black dark:text-white">10 spots</span> available
              every weekend, secure your place and compete for a{" "}
              <span className="font-semibold text-black dark:text-white">Robux prize</span>.
            </p>

            {/* Email contact strip */}
            <div className="mt-6 border border-[#38C2D9]/30 bg-[#38C2D9]/10 p-4 rounded-none">
              <p className="text-[11px] font-black uppercase tracking-widest text-black/80 dark:text-white/80">
                For details: <span className="text-[#38C2D9]">academy@pixoulgaming.com</span>
              </p>
            </div>

            {/* Chips */}
            <div className="mt-7 flex flex-wrap gap-2">
              {chips.map((c) => (
                <span
                  key={c}
                  className="text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-black/60 dark:text-gray-300"
                >
                  {c}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setOpen(true)}
                className="px-7 py-3 bg-[#38C2D9] text-black font-black uppercase text-[11px] tracking-widest hover:bg-[#2fa8bb] transition"
              >
                Register Now
              </button>

              <a
                href="#terms"
                className="px-7 py-3 border border-black/10 dark:border-white/10 text-black/70 dark:text-white/80 font-black uppercase text-[11px] tracking-widest hover:border-[#38C2D9]/50 hover:text-[#38C2D9] transition"
              >
                Terms & Conditions
              </a>
            </div>
          </div>
        </div>

        {/* TERMS (simple and calm) */}
        <div
          id="terms"
          className="mt-10 border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] rounded-none p-8 shadow-2xl"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tight">
                Terms <span className="text-[#38C2D9]">& Conditions</span>
              </h2>
              <p className="mt-2 text-sm text-black/60 dark:text-gray-400">
                Please review before registering.
              </p>
            </div>

            <button
              onClick={() => setOpen(true)}
              className="px-7 py-3 border border-black/10 dark:border-white/10 text-black/70 dark:text-white/80 font-black uppercase text-[11px] tracking-widest hover:border-[#38C2D9]/50 hover:text-[#38C2D9] transition"
            >
              Register
            </button>
          </div>

          <ul className="mt-6 space-y-3 text-sm text-black/70 dark:text-gray-300">
            {terms.map((t) => (
              <li key={t} className="flex items-start gap-3">
                <span className="mt-2 inline-block w-2 h-2 bg-[#38C2D9]" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>

        {open ? <RobloxShowdownForm onClose={() => setOpen(false)} /> : null}
      </div>
    </div>
  );
}