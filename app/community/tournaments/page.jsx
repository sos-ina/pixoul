"use client";

import Link from "next/link";

export default function TournamentsHub() {
 const tournaments = [
  {
    id: "fortnite",
    title: "Fortnite Tournament",
    subtitle: "6-Week Competition • AED 2000 Weekly • $10,000 Grand Prize",
    badge: "Featured",
    icon: "🏆",
    meta: [
      "Qualifiers Mon–Thu (6:30–9PM)",
      "Sunday Finals (4:30–10:30PM)",
      "AED 30 PC Usage",
      "AED 100 Voucher",
      "No Pro Players"
    ],
    href: "/community/tournaments/fortnite",
  },
  {
    id: "roblox-weekly-showdown",
    title: "Roblox Weekly Showdown",
    subtitle: "Weekly Mobile Tournament • 10 Spots Only • Robux Rewards",
    badge: "Weekly",
    icon: "🧩",
    meta: [
      "AED 40 Entry Fee",
      "Every Sunday 5:00PM",
      "Ages 5–14",
      "1 Hour Max",
      "Devices Provided"
    ],
    href: "/community/tournaments/roblox-weekly",
  },
];

  return (
    <div className="min-h-screen dark:bg-[#0a0a0a] dark:text-white bg-white text-black pt-28 px-6 pb-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="dark:bg-gradient-to-br dark:from-[#111] dark:to-black bg-white border border-black/10 dark:border-white/10 rounded-none p-6 sm:p-8 md:p-10 mb-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#38C2D9]/5 blur-[100px] rounded-full"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <h1 className="text-5xl sm:text-6xl font-black uppercase tracking-tighter mb-2">
                Tournaments <span className="text-[#38C2D9]">Hub</span>
              </h1>
              <p className="text-black/60 dark:text-gray-500 font-bold uppercase text-[10px] tracking-[0.3em]">
                Register, compete, and climb the rankings
              </p>
            </div>

            <div className="flex gap-10">
              <div className="text-center">
                <p className="text-4xl font-black text-[#38C2D9]">2</p>
                <p className="text-[10px] uppercase text-gray-500 font-black tracking-widest">
                  Active
                </p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-black dark:text-white text-black">∞</p>
                <p className="text-[10px] uppercase text-black/60 dark:text-gray-500 font-black tracking-widest">
                  Hype
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tournaments.map((t) => (
            <Link key={t.id} href={t.href} className="group">
              <div className="bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/[0.04] dark:hover:bg-white/[0.05] p-8 rounded-none border border-black/10 dark:border-white/10 hover:border-[#38C2D9]/50 transition-all duration-500 cursor-pointer h-full flex flex-col shadow-2xl relative overflow-hidden">

                {/* Glow Effect */}
                <div className="absolute -top-12 -right-12 w-56 h-56 bg-[#38C2D9]/10 blur-[90px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>

                {/* Icon + Badge */}
                <div className="flex justify-between items-start mb-8 relative z-10">
                  <div className="w-16 h-16 rounded-none flex items-center justify-center text-4xl bg-black/10 dark:bg-black/40 border border-black/10 dark:border-white/10 group-hover:scale-110 group-hover:border-[#38C2D9]/30 transition-all">
                    {t.icon}
                  </div>
                  <span className="text-[9px] font-black bg-black/5 dark:bg-white/5 text-black/60 dark:text-gray-300 border border-black/10 dark:border-white/10 px-4 py-1.5 rounded-full uppercase tracking-widest">
                    {t.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-black italic uppercase mb-2 group-hover:text-[#38C2D9] transition-colors tracking-tight relative z-10">
                  {t.title}
                </h3>

                {/* Subtitle */}
                <p className="text-black/60 dark:text-gray-500 text-[10px] font-black uppercase tracking-widest mb-8 relative z-10">
                  {t.subtitle}
                </p>

                {/* Bottom Section */}
                <div className="mt-auto relative z-10">

                  {/* Meta Chips */}
                  <div className="flex flex-wrap gap-2">
                    {t.meta.map((m) => (
                      <span
                        key={m}
                        className="text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-black/60 dark:text-gray-300"
                      >
                        {m}
                      </span>
                    ))}
                  </div>

                                    {/* Learn More CTA */}
                  <div className="mb-5 mt-5">
                    <span
                      className="
                        inline-flex items-center justify-center
                        px-5 py-2.5
                        bg-[#38C2D9] text-black
                        font-black uppercase text-[10px] tracking-widest
                        hover:bg-[#2fa8bb]
                        transition
                        group-hover:translate-x-0.5
                      "
                      aria-hidden="true"
                    >
                      Learn More
                    </span>
                  </div>

                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Small note */}
        <div className="mt-10 text-[10px] uppercase font-black tracking-[0.25em] text-black/50 dark:text-gray-500">
          Tip: Join early to secure your slot.
        </div>
      </div>
    </div>
  );
}