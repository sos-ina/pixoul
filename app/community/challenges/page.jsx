"use client";
import React from 'react';
import Link from 'next/link';

export default function ChallengesHub() {
  const missions = [
    { id: "headshot-hero", title: "Headshot Hero", reward: "500 XP", progress: 80, category: "Daily", icon: "🎯" },
    { id: "vr-marathon", title: "VR Marathon", reward: "2000 XP", progress: 30, category: "Weekly", icon: "🥽" },
    { id: "squad-leader", title: "Squad Leader", reward: "Exclusive Badge", progress: 100, category: "Milestone", icon: "👑" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-28 px-6 pb-20">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="bg-gradient-to-br from-[#111] to-black border border-white/10 rounded-[3rem] p-10 mb-12 flex flex-col md:flex-row justify-between items-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#38C2D9]/5 blur-[100px] rounded-full"></div>
          <div className="relative z-10">
            <h1 className="text-6xl font-black italic uppercase tracking-tighter mb-2">Challenge <span className="text-[#38C2D9]">Hub</span></h1>
            <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.3em]">Level up your Pixoul ranking</p>
          </div>
          <div className="flex gap-10 mt-8 md:mt-0 relative z-10">
            <div className="text-center">
              <p className="text-4xl font-black text-[#38C2D9]">14</p>
              <p className="text-[10px] uppercase text-gray-500 font-black tracking-widest">Rank</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-black text-white">12.4k</p>
              <p className="text-[10px] uppercase text-gray-500 font-black tracking-widest">Total XP</p>
            </div>
          </div>
        </div>

        {/* Missions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {missions.map((m) => (
            <Link 
              key={m.id} 
              href={`/community/challenges/${m.id}`} // THE CORRECT NESTED PATH
              className="group">
                
              <div className="bg-white/[0.02] border border-white/30 p-8 rounded-[2.5rem] hover:border-[#38C2D9]/50 hover:bg-white/[0.05] transition-all duration-500 cursor-pointer h-full flex flex-col">
                <div className="flex justify-between items-start mb-8">
                  <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center text-4xl border border-white/5 group-hover:scale-110 group-hover:border-[#38C2D9]/30 transition-all">
                    {m.icon}
                  </div>
                  <span className="text-[9px] font-black bg-white/5 text-gray-400 border border-white/10 px-4 py-1.5 rounded-full uppercase tracking-widest">
                    {m.category}
                  </span>
                </div>

                <h3 className="text-2xl font-black italic uppercase mb-2 group-hover:text-[#38C2D9] transition-colors tracking-tight">
                  {m.title}
                </h3>
                <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-10">
                  Reward: <span className="text-white">{m.reward}</span>
                </p>

                <div className="mt-auto">
                  <div className="flex justify-between text-[10px] font-black uppercase mb-3 tracking-widest text-gray-500">
                    <span>Progress</span>
                    <span className="text-white">{m.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-black rounded-full overflow-hidden border border-white/5 p-[2px]">
                    <div 
                      className="h-full bg-gradient-to-r from-[#38C2D9] to-blue-500 rounded-full transition-all duration-1000"
                      style={{ width: `${m.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}