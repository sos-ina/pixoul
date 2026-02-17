"use client";
import React from 'react';
import Link from 'next/link';

export default function AchievementGallery() {
  const achievements = [
    { id: 1, title: "First Blood", desc: "Get 10 kills in one session", tier: "Common", icon: "🩸", date: "Jan 12, 2026" },
    { id: 2, title: "Night Crawler", desc: "Play 5 hours after midnight", tier: "Rare", icon: "🌙", date: "Jan 15, 2026" },
    { id: 3, title: "Immortal", desc: "Win a match without dying", tier: "Legendary", icon: "💎", date: "Feb 01, 2026" },
    { id: 4, title: "Pixoul Pioneer", desc: "Join during the Alpha launch", tier: "Epic", icon: "🚀", date: "Dec 20, 2025" },
    { id: 5, title: "Technician", desc: "Repair 50 haptic vests", tier: "Common", icon: "🔧", date: "Feb 05, 2026" },
    { id: 6, title: "God Like", desc: "Reach 1,000,000 total XP", tier: "Legendary", icon: "🔥", date: "Locked" },
  ];

  const getTierColor = (tier) => {
    switch (tier) {
      case "Legendary": return "text-yellow-500 border-yellow-500/50 bg-yellow-500/5";
      case "Epic": return "text-purple-500 border-purple-500/50 bg-purple-500/5";
      case "Rare": return "text-[#38C2D9] border-[#38C2D9]/50 bg-[#38C2D9]/5";
      default: return "text-gray-400 border-white/10 bg-white/5";
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-28 px-6 pb-20">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <Link href="/community/player-profile" className="text-[10px] font-black uppercase text-gray-500 hover:text-[#38C2D9] mb-4 block transition-all">
              ← Back to Profile
            </Link>
            <h1 className="text-6xl font-black italic uppercase tracking-tighter">Trophy <span className="text-[#38C2D9]">Case</span></h1>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 flex gap-8">
            <div className="text-center">
              <p className="text-2xl font-black italic">52</p>
              <p className="text-[8px] uppercase font-black text-gray-500">Unlocked</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-black italic text-yellow-500">3</p>
              <p className="text-[8px] uppercase font-black text-gray-500">Legendary</p>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((ach) => (
            <div 
              key={ach.id} 
              className={`p-6 rounded-[2rem] border transition-all hover:scale-[1.02] ${ach.date === 'Locked' ? 'opacity-40 grayscale' : 'hover:shadow-[0_0_30px_rgba(56,194,217,0.1)]'} ${getTierColor(ach.tier)}`}
            >
              <div className="flex justify-between items-start mb-6">
                <span className="text-4xl">{ach.icon}</span>
                <span className="text-[8px] font-black uppercase tracking-widest px-2 py-1 border border-current rounded-md">
                  {ach.tier}
                </span>
              </div>
              
              <h3 className="text-xl font-black uppercase italic mb-1 text-white">{ach.title}</h3>
              <p className="text-xs text-gray-400 font-medium leading-relaxed mb-4">{ach.desc}</p>
              
              <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                <span className="text-[9px] font-black uppercase text-gray-500">Earned On</span>
                <span className="text-[9px] font-mono text-white">{ach.date}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}