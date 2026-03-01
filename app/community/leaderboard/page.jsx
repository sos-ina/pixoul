"use client";
import React from 'react';

export default function GlobalLeaderboard() {
  const players = [
    { rank: 1, name: "Vortex_Runner", level: 99, xp: "1.2M", wins: 450, status: "online" },
    { rank: 2, name: "GhostPixel", level: 94, xp: "1.1M", wins: 412, status: "away" },
    { rank: 3, name: "NeonSamurai", level: 88, xp: "950k", wins: 380, status: "online" },
    { rank: 4, name: "Shadow_X", level: 85, xp: "920k", wins: 345, status: "offline" },
    { rank: 5, name: "CyberQueen", level: 82, xp: "890k", wins: 310, status: "online" },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-black dark:text-white pt-28 px-6 pb-20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-[#38C2D9] text-xs font-black uppercase tracking-[0.5em] mb-4">Hall of Fame</h2>
          <h1 className="text-6xl font-black italic uppercase tracking-tighter">Global <span className="text-[#38C2D9]">Rankings</span></h1>
        </div>

        <div className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-none overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>

              <tr className="border-b border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.02]">
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-black/60 dark:text-gray-500">Rank</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-black/60 dark:text-gray-500">Player</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-black/60 dark:text-gray-500">Level</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-black/60 dark:text-gray-500">Total XP</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-black/60 dark:text-gray-500 text-right">Wins</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player) => (
                <tr key={player.rank} className="border-b border-black/10 dark:border-white/10 hover:bg-black/[0.04] dark:hover:bg-white/[0.03] transition-colors group">
                  <td className="p-6 font-black italic text-xl">
                    {player.rank === 1 ? <span className="text-yellow-500">01</span> : `0${player.rank}`}
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${player.status === 'online' ? 'bg-[#38C2D9] shadow-[0_0_10px_#38C2D9]' : 'bg-gray-600'}`}></div>
                      <span className="font-bold group-hover:text-[#38C2D9] transition-colors">{player.name}</span>
                    </div>
                  </td>
                  <td className="p-6 font-mono text-sm text-black/60 dark:text-gray-400">LVL {player.level}</td>
                  <td className="p-6 font-bold text-[#38C2D9]">{player.xp}</td>
                  <td className="p-6 text-right font-black italic">{player.wins}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}