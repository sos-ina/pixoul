"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { authAPI, statsAPI } from '@/lib/api/experiences';

// This is your main page for /community/player-profile
export default function PlayerProfilePage() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const me = await authAPI.getCurrentUser();
        if (cancelled) return;
        setUser(me?.user || null);

        const st = await statsAPI.getMyStats();
        if (cancelled) return;
        setStats(st?.stats || null);
      } catch {
        if (!cancelled) setUser(null);
        if (!cancelled) setStats(null);
      }
    };

    load();
    const onAuthChanged = () => load();
    window.addEventListener('auth:changed', onAuthChanged);
    return () => {
      cancelled = true;
      window.removeEventListener('auth:changed', onAuthChanged);
    };
  }, []);

  const displayName = user?.display_name || user?.username || 'PLAYER';
  const subtitle = user?.username ? `@${user.username}` : 'PIXOUL ELITE MEMBER';

  const statCards = [
    {
      label: 'Global Rank',
      val: stats?.globalRank ? `#${stats.globalRank.toLocaleString()}` : '—',
      sub: stats?.globalRank ? 'Leaderboard' : 'No data yet',
    },
    {
      label: 'Total XP',
      val: typeof stats?.totalXp === 'number' ? stats.totalXp.toLocaleString() : '—',
      sub: 'Based on bookings',
    },
    {
      label: 'Wins',
      val: typeof stats?.wins === 'number' ? stats.wins.toLocaleString() : '—',
      sub: 'Non-cancelled bookings',
    },
    {
      label: 'Achievements',
      val:
        stats?.achievements?.unlocked !== undefined
          ? `${stats.achievements.unlocked}/${stats.achievements.total || 50}`
          : '—',
      sub: 'Unlocked',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] dark:bg-black bg-white dark:text-white text-black p-4 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* --- SECTION 1: PLAYER HEADER & STATS --- */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Identity Card */}
          <div className="dark:bg-gradient-to-b dark:from-gray-900 dark:to-black bg-white border border-white/10 p-8 rounded-[2rem] text-center shadow-2xl">
            <div className="relative w-32 h-32 mx-auto mb-6">
              <div className="w-full h-full rounded-full bg-gray-800 border-4 border-[#38C2D9] animate-pulse-slow overflow-hidden">
                {user?.avatar_url ? (
                  <img src={user.avatar_url} alt="avatar" className="w-full h-full object-cover" />
                ) : null}
              </div>
              <div className="absolute -bottom-2 -right-2 bg-[#38C2D9] text-black text-xs font-black px-3 py-1 rounded-full">
                LVL 24
              </div>
            </div>
            <h1 className="text-3xl font-black tracking-tighter uppercase">{displayName}</h1>
            <p className="text-[#38C2D9] font-mono text-sm mt-1">{subtitle}</p>
           <Link href="/community/player-profile/settings">
              <button className="w-full mt-6 py-3 border border-[#38C2D9] text-[#38C2D9] rounded-xl font-bold text-xs uppercase hover:bg-[#38C2D9] hover:text-black transition-all">
                Edit Settings
              </button>
          </Link>
          </div>

          {/* Rapid Stats Grid */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-4 h-full">
            {statCards.map((s, i) => (
              <div key={i} className="bg-white/5 border border-white/5 p-6 rounded-[1.5rem] hover:border-[#38C2D9]/50 transition-colors group">
                <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold mb-2">{s.label}</p>
                <p className="text-3xl font-black group-hover:text-[#38C2D9] transition-colors">{s.val}</p>
                <p className="text-[10px] text-gray-400 mt-1">{s.sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- SECTION 2: TOP PLAYERS THIS MONTH (THE PODIUM) --- */}
        <section>
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black uppercase tracking-tighter">Top Players <span className="text-[#38C2D9]">This Month</span></h2>
            <p className="text-gray-500 text-sm">Real-time leaderboard rankings across all Pixoul gaming zones.</p>
          </div>

          <div className="bg-white/5 border border-white/5 rounded-[3rem] p-10 backdrop-blur-sm">
            <div className="flex items-end justify-center gap-2 md:gap-8 overflow-x-y-auto pb-4">
              
              {/* 2nd Place */}
              <div className="flex flex-col items-center group">
                <div className="w-16 h-16 rounded-full bg-gray-800 border-2 border-gray-400 mb-2 group-hover:scale-110 transition-transform"></div>
                <div className="h-28 w-24 bg-gradient-to-t from-gray-800/50 to-gray-700/50 rounded-t-2xl flex flex-col items-center justify-center border-t-2 border-gray-400">
                  <span className="text-gray-400 font-bold">2nd</span>
                  <span className="text-[10px] font-bold text-white truncate px-2">NEON_SAMURAI</span>
                </div>
              </div>

              {/* 1st Place - The King */}
              <div className="flex flex-col items-center group">
                <div className="w-24 h-24 rounded-full bg-gray-800 border-4 border-[#38C2D9] mb-2 shadow-[0_0_30px_rgba(56,194,217,0.3)] group-hover:scale-110 transition-transform"></div>
                <div className="h-44 w-32 bg-gradient-to-t from-[#38C2D9]/20 to-[#38C2D9]/40 rounded-t-2xl flex flex-col items-center justify-center border-t-4 border-[#38C2D9]">
                  <span className="text-[#38C2D9] font-black text-xl">1st</span>
                  <span className="text-sm font-black text-white truncate px-2">CYBER_KNIGHT</span>
                </div>
              </div>

              {/* 3rd Place */}
              <div className="flex flex-col items-center group">
                <div className="w-16 h-16 rounded-full bg-gray-800 border-2 border-orange-700 mb-2 group-hover:scale-110 transition-transform"></div>
                <div className="h-20 w-24 bg-gradient-to-t from-gray-800/50 to-gray-700/50 rounded-t-2xl flex flex-col items-center justify-center border-t-2 border-orange-700">
                  <span className="text-orange-700 font-bold">3rd</span>
                  <span className="text-[10px] font-bold text-white truncate px-2">VORTEX_X</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* --- SECTION 3: TRACK ACHIEVEMENTS --- */}
        <section>
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl font-black uppercase tracking-tight">Recent Achievements</h2>
          <Link href="/community/player-profile/achievements">
            <button className="text-[10px] font-black text-[#38C2D9] hover:underline cursor-pointer">
              VIEW ALL 50+
            </button>
          </Link>         
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'First Blood', desc: 'Win your first match.', date: 'Unlocked Jan 12', done: true },
              { title: 'VR Veteran', desc: '10 hours in VR world.', date: 'Unlocked Feb 02', done: true },
              { title: 'Retro King', desc: 'High score in PacMan.', date: 'In Progress (80%)', done: false },
              { title: 'Socialite', desc: 'Add 10 friends.', date: 'Locked', done: false },
            ].map((ach, i) => (
              <div key={i} className={`p-6 rounded-2xl border ${ach.done ? 'border-[#38C2D9]/30 bg-[#38C2D9]/5' : 'border-white/5 bg-white/5 opacity-50'}`}>
                <div className={`w-10 h-10 rounded-lg mb-4 flex items-center justify-center font-bold ${ach.done ? 'bg-[#38C2D9] text-black' : 'bg-gray-800 text-gray-500'}`}>
                  {ach.done ? '✓' : '!'}
                </div>
                <h4 className="font-bold text-sm uppercase">{ach.title}</h4>
                <p className="text-[10px] text-gray-400 mt-1">{ach.desc}</p>
                <p className={`text-[9px] mt-4 font-bold ${ach.done ? 'text-[#38C2D9]' : 'text-gray-600'}`}>{ach.date}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}