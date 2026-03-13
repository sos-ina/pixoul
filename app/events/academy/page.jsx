"use client";

import { useState } from "react";
import AcademyEnrollmentModal from "@/components/forms/AcademyEnrollmentForm";

export default function AcademyPage() {
  const [open, setOpen] = useState(false);

  const programs = [
    {
      id: "fortnite",
      title: "Fortnite Training",
      icon: "🛡️",
      points: ["Building + edits", "Rotations + game sense", "Aim routines"],
    },
    {
      id: "valorant",
      title: "Valorant Training",
      icon: "🎯",
      points: ["Crosshair placement", "Utility + executes", "Comms + teamwork"],
    },
  ];

  return (
    <div className="min-h-screen dark:bg-[#0a0a0a] dark:text-white bg-white text-black pt-28 px-6 pb-20">
      <div className="max-w-6xl mx-auto">
        {/* HERO (more breathing room, less blocks) */}
        <div className="relative overflow-hidden border border-black/10 dark:border-white/10 bg-white dark:bg-gradient-to-br dark:from-[#111] dark:to-black rounded-none p-8 sm:p-10 md:p-12 shadow-2xl">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#38C2D9]/7 blur-[120px] rounded-full" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#38C2D9]/6 blur-[120px] rounded-full" />

          <div className="relative z-10 max-w-3xl">
            <p className="text-black/60 dark:text-gray-500 font-black uppercase text-[10px] tracking-[0.35em]">
              Academy Classes
            </p>

            <h1 className="mt-3 text-5xl sm:text-6xl font-black uppercase tracking-tighter">
              Pixoul <span className="text-[#38C2D9]">Academy</span>
            </h1>

            <p className="mt-5 text-black/60 dark:text-gray-400 text-sm leading-relaxed">
              Professional training sessions for gamers who are serious about leveling up in{" "}
              <span className="text-black dark:text-white font-semibold">Fortnite</span> and{" "}
              <span className="text-black dark:text-white font-semibold">Valorant</span>. Led by
              coach{" "}
              <span className="text-black dark:text-white font-semibold">
                Omar Altamimi (A9FAR)
              </span>
              , sessions cover strategy, technique, and best practices—tailored to your skill level.
            </p>

            {/* Minimal badges */}
            <div className="mt-7 flex flex-wrap gap-2">
              {["1:1 Coaching", "Beginner → Advanced", "Fortnite • Valorant"].map((t) => (
                <span
                  key={t}
                  className="text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-black/60 dark:text-gray-300"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* CTA row */}
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setOpen(true)}
                className="px-7 py-3 bg-[#38C2D9] text-black font-black uppercase text-[11px] tracking-widest hover:bg-[#2fa8bb] transition"
              >
                Request a Session
              </button>

              <a
                href="#programs"
                className="px-7 py-3 border border-black/10 dark:border-white/10 text-black/70 dark:text-white/80 font-black uppercase text-[11px] tracking-widest hover:border-[#38C2D9]/50 hover:text-[#38C2D9] transition"
              >
                View Programs
              </a>
            </div>

            {/* tiny helper */}
            <p className="mt-4 text-[11px] text-black/50 dark:text-gray-500">
              Request form: name, email, phone number, preferred date, game title (Fortnite / Valorant).
            </p>
          </div>
        </div>

        {/* PROGRAMS (simple two-card row) */}
        <div id="programs" className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {programs.map((p) => (
            <div
              key={p.id}
              className="group relative overflow-hidden bg-black/[0.02] dark:bg-white/[0.02] border border-black/10 dark:border-white/10 rounded-none p-8 shadow-2xl hover:border-[#38C2D9]/50 transition-all duration-500"
            >
              <div className="absolute -top-16 -right-16 w-72 h-72 bg-[#38C2D9]/10 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10 flex items-start gap-4">
                <div className="w-14 h-14 rounded-none flex items-center justify-center text-3xl bg-black/10 dark:bg-black/40 border border-black/10 dark:border-white/10">
                  {p.icon}
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-black italic uppercase tracking-tight group-hover:text-[#38C2D9] transition-colors">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[10px] font-black uppercase tracking-widest text-black/60 dark:text-gray-500">
                    What you’ll work on
                  </p>
                </div>
              </div>

              <ul className="relative z-10 mt-6 space-y-3 text-sm text-black/70 dark:text-gray-300">
                {p.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-3">
                    <span className="mt-1.5 inline-block w-2 h-2 bg-[#38C2D9]" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setOpen(true)}
                className="relative z-10 mt-8 w-full py-3 border border-black/10 dark:border-white/10 text-black/70 dark:text-white/80 font-black uppercase text-[11px] tracking-widest hover:border-[#38C2D9]/50 hover:text-[#38C2D9] transition"
              >
                Request Training
              </button>
            </div>
          ))}
        </div>

        {/* HOW IT WORKS (single calm strip instead of a big column) */}
        <div className="mt-10 border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] rounded-none p-7 sm:p-8 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight">
                How it <span className="text-[#38C2D9]">Works</span>
              </h2>
              <p className="mt-2 text-sm text-black/60 dark:text-gray-400 max-w-2xl">
                Submit a request, confirm your slot, and train with structured drills + coaching feedback.
              </p>
            </div>

            <button
              onClick={() => setOpen(true)}
              className="px-7 py-3 bg-[#38C2D9] text-black font-black uppercase text-[11px] tracking-widest hover:bg-[#2fa8bb] transition"
            >
              Start Now
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { step: "Step 1", text: "Send your request (game + preferred date)." },
              { step: "Step 2", text: "We confirm availability and session details." },
              { step: "Step 3", text: "Train, review, and track improvements." },
            ].map((s) => (
              <div
                key={s.step}
                className="border border-black/10 dark:border-white/10 bg-white/60 dark:bg-black/30 p-5 rounded-none"
              >
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-black/60 dark:text-gray-500">
                  {s.step}
                </p>
                <p className="mt-2 text-sm text-black/70 dark:text-gray-300">{s.text}</p>
              </div>
            ))}
          </div>
        </div>

        {open ? <AcademyEnrollmentModal onClose={() => setOpen(false)} /> : null}
      </div>
    </div>
  );
}