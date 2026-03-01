"use client";
import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function ChallengeDetail() {
  const params = useParams();
  const id = params?.id;

  // Static leaderboard data for UI
  const leaders = [
    { rank: "01", name: "Vortex_Runner", score: "2,400 XP" },
    { rank: "02", name: "GhostPixel", score: "2,150 XP" },
    { rank: "03", name: "NeonSamurai", score: "1,980 XP" },
  ];

  if (!id) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-black dark:text-white pt-28 px-6 pb-20"    >
      <div className="max-w-5xl mx-auto">
        
        {/* Navigation */}
        <Link 
          href="/community/challenges" 
          className="inline-flex items-center gap-2 text-[10px] uppercase font-black text-black/50 dark:text-gray-500 hover:text-[#38C2D9] mb-12 transition-all group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Return to Challenge Hub
        </Link>

        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Left Column: Mission Details */}
          <div className="lg:col-span-2">
            <h2 className="text-[#38C2D9] text-xs font-black uppercase tracking-[0.4em] mb-4">Active Mission</h2>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-black italic uppercase mb-8 tracking-tighter">
              {id.replace(/-/g, ' ')}
            </h1>
            
            <div className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-none p-6 sm:p-8 md:p-10 space-y-8">
              <div>
                <h3 className="text-black dark:text-white font-black uppercase text-sm mb-4 italic">Mission Objective</h3>
                <p className="text-black/70 dark:text-gray-400 leading-relaxed">
                  Decryption in progress for <span className="text-black dark:text-white">{id}</span>. 
                  Synchronize your neural link and complete the specified parameters 
                  to earn seasonal ranking points.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 bg-black/5 dark:bg-black/40 border border-black/10 dark:border-white/10 p-6 rounded-none">
                  <p className="text-[10px] text-black/50 dark:text-gray-600 font-black uppercase mb-1">Status</p>
                  <p className="text-[#38C2D9] font-black italic">CONNECTED</p>
                </div>
                <div className="flex-1 bg-black/5 dark:bg-black/40 border border-black/10 dark:border-white/10 p-6 rounded-none">
                  <p className="text-[10px] text-black/50 dark:text-gray-600 font-black uppercase mb-1">Difficulty</p>
                  <p className="text-black dark:text-white font-black italic">HARDCORE</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Mini Leaderboard */}
          <div className="bg-black/[0.02] dark:bg-white/[0.02] border border-black/10 dark:border-white/10 rounded-none p-8 h-fit">
            <h3 className="text-center text-[10px] font-black uppercase tracking-[0.2em] text-black/50 dark:text-gray-500 mb-8">Top Operatives</h3>
            <div className="space-y-6">
              {leaders.map((player) => (
                <div key={player.rank} className="flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-black text-black/40 dark:text-gray-700 group-hover:text-[#38C2D9] transition-colors">{player.rank}</span>
                    <span className="font-bold text-sm tracking-tight">{player.name}</span>
                  </div>
                  <span className="font-mono text-[10px] text-[#38C2D9] bg-[#38C2D9]/5 px-2 py-1 rounded border border-[#38C2D9]/10">
                    {player.score}
                  </span>
                </div>
              ))}
            </div>
            <Link
              href="/community/leaderboard"
              className="block w-full mt-10 py-4 border border-black/10 dark:border-white/10 rounded-none text-[10px] font-black uppercase tracking-widest hover:bg-[#38C2D9] hover:text-black hover:border-[#38C2D9] transition-all text-center"
            >
              View All Rankings
            </Link>
           
          </div>

        </div>
      </div>
    </div>
  );
}