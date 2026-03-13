"use client";

import { useState } from "react";
import Link from "next/link";
import FortniteTournamentForm from "@/components/forms/FortniteTournament";

export default function FortniteTournamentPage() {
  const [open, setOpen] = useState(false);

  const chips = [
    "6-week tournament",
    "Qualifiers Mon–Thu (6:30–9:00 PM)",
    "Finals Sunday (4:30–10:30 PM)",
    "AED 30/day PC usage",
    "Bring your own gear",
    "No pro players",
  ];

  const qualifierMatches = [
    { label: "Match 1", time: "6:30 PM" },
    { label: "Match 2", time: "7:10 PM" },
    { label: "Match 3", time: "7:50 PM" },
    { label: "Match 4", time: "8:30 PM" },
  ];

  const finalsMatches = [
    { label: "Match 1", time: "4:30 PM" },
    { label: "Match 2", time: "5:15 PM" },
    { label: "Match 3", time: "6:00 PM" },
    { label: "Match 4", time: "6:45 PM" },
    { label: "Match 5", time: "8:15 PM" },
    { label: "Match 6", time: "9:45 PM" },
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

        {/* HERO (cleaner, less crowded) */}
        <div className="relative overflow-hidden border border-black/10 dark:border-white/10 bg-white dark:bg-gradient-to-br dark:from-[#111] dark:to-black rounded-none p-8 sm:p-10 md:p-12 shadow-2xl">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#38C2D9]/7 blur-[130px] rounded-full" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#38C2D9]/6 blur-[130px] rounded-full" />

          <div className="relative z-10 max-w-3xl">
            <p className="text-[10px] font-black uppercase tracking-[0.35em] text-black/60 dark:text-gray-500">
              Fortnite Tournament
            </p>

            <h1 className="mt-3 text-5xl sm:text-6xl font-black uppercase tracking-tighter">
              Register <span className="text-[#38C2D9]">Now</span>
            </h1>

            <p className="mt-4 text-black/60 dark:text-gray-400 text-sm leading-relaxed">
              Join an exciting <span className="font-semibold text-black dark:text-white">6-week</span>{" "}
              tournament starting on <span className="font-semibold text-black dark:text-white">January 29</span>.
              Qualify through weekday matches, then compete in Sunday Finals for weekly cash rewards.
            </p>

            {/* Voucher callout (simple strip) */}
            <div className="mt-6 border border-[#38C2D9]/30 bg-[#38C2D9]/10 dark:bg-[#38C2D9]/10 p-4 rounded-none">
              <p className="text-[11px] font-black uppercase tracking-widest text-black/80 dark:text-white/80">
                Register now and get <span className="text-[#38C2D9]">AED 100</span> voucher for Pixoul Gaming
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

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setOpen(true)}
                className="px-7 py-3 bg-[#38C2D9] text-black font-black uppercase text-[11px] tracking-widest hover:bg-[#2fa8bb] transition"
              >
                Register
              </button>

              <a
                href="#schedule"
                className="px-7 py-3 border border-black/10 dark:border-white/10 text-black/70 dark:text-white/80 font-black uppercase text-[11px] tracking-widest hover:border-[#38C2D9]/50 hover:text-[#38C2D9] transition"
              >
                View Schedule
              </a>
            </div>
          </div>
        </div>

        {/* PRIZES (one calm row, not many boxes) */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-8 rounded-none shadow-2xl">
            <h2 className="text-2xl font-black uppercase tracking-tight">
              Prizes <span className="text-[#38C2D9]">Overview</span>
            </h2>

            <div className="mt-5 space-y-4 text-sm text-black/70 dark:text-gray-300 leading-relaxed">
              <p>
                Weekly prize of <span className="font-semibold text-black dark:text-white">AED 2000</span>{" "}
                split among the top 10 players in cash every Sunday.
              </p>
              <p>
                Weekly winners qualify for the Grand Event in Pixoul (March/April) with a{" "}
                <span className="font-semibold text-black dark:text-white">$10,000</span> prize pool.
              </p>
              <p>
                Note: pro players’ participation is not allowed. PC usage cost is{" "}
                <span className="font-semibold text-black dark:text-white">AED 30</span> for every day of participation.
              </p>
            </div>
          </div>

          {/* Quick info card */}
          <div className="border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-8 rounded-none shadow-2xl">
            <h3 className="text-xl font-black uppercase tracking-tight">
              Quick <span className="text-[#38C2D9]">Notes</span>
            </h3>

            <ul className="mt-5 space-y-3 text-sm text-black/70 dark:text-gray-300">
              <li>• Qualifiers: Mon–Thu, 6:30–9:00 PM</li>
              <li>• Finals: Sunday, 4:30–10:30 PM</li>
              <li>• Bring: keyboard, headset, controller</li>
              <li>• Pre-registration required</li>
            </ul>

            <button
              onClick={() => setOpen(true)}
              className="mt-8 w-full py-3 border border-black/10 dark:border-white/10 text-black/70 dark:text-white/80 font-black uppercase text-[11px] tracking-widest hover:border-[#38C2D9]/50 hover:text-[#38C2D9] transition"
            >
              Register Now
            </button>
          </div>
        </div>

        {/* SCHEDULE (simple two-column, very readable) */}
        <div id="schedule" className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Qualifiers */}
          <div className="border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-8 rounded-none shadow-2xl">
            <h2 className="text-2xl font-black uppercase tracking-tight">
              Qualifiers <span className="text-[#38C2D9]">Schedule</span>
            </h2>

            <p className="mt-3 text-sm text-black/60 dark:text-gray-400">
              Monday–Thursday (6:30 PM – 9:00 PM). Players only need to participate once during qualifiers
              and once during finals (you can join extra days for the spirit of competition).
            </p>

            <div className="mt-6 border border-black/10 dark:border-white/10 bg-white/60 dark:bg-black/30 rounded-none overflow-hidden">
              {qualifierMatches.map((m, idx) => (
                <div
                  key={m.label}
                  className={`flex items-center justify-between px-5 py-4 text-sm ${
                    idx !== qualifierMatches.length - 1
                      ? "border-b border-black/10 dark:border-white/10"
                      : ""
                  }`}
                >
                  <span className="font-black uppercase text-[11px] tracking-widest text-black/70 dark:text-gray-300">
                    {m.label}
                  </span>
                  <span className="font-black text-black dark:text-white">{m.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Finals */}
          <div className="border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-8 rounded-none shadow-2xl">
            <h2 className="text-2xl font-black uppercase tracking-tight">
              Sunday <span className="text-[#38C2D9]">Finals</span>
            </h2>

            <p className="mt-3 text-sm text-black/60 dark:text-gray-400">
              Main event: Sunday (4:30 PM – 10:30 PM). Finals include winners of qualifiers.
            </p>

            <div className="mt-6 border border-black/10 dark:border-white/10 bg-white/60 dark:bg-black/30 rounded-none overflow-hidden">
              {finalsMatches.map((m, idx) => (
                <div
                  key={m.label}
                  className={`flex items-center justify-between px-5 py-4 text-sm ${
                    idx !== finalsMatches.length - 1
                      ? "border-b border-black/10 dark:border-white/10"
                      : ""
                  }`}
                >
                  <span className="font-black uppercase text-[11px] tracking-widest text-black/70 dark:text-gray-300">
                    {m.label}
                  </span>
                  <span className="font-black text-black dark:text-white">{m.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FORM MODAL */}
        {open ? (
          <FortniteTournamentForm onClose={() => setOpen(false)} />
        ) : null}
      </div>
    </div>
  );
}