"use client";
import React, { useState } from 'react';

export default function SettingsPage() {
  const [username, setUsername] = useState("SHADOW_PLAYER");

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-28 px-6">
      <div className="max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-[2rem] p-8 md:p-12">
        <h1 className="text-3xl font-black uppercase italic mb-8">Edit <span className="text-[#38C2D9]">Profile</span></h1>
        
        <div className="space-y-8">
          {/* Avatar Change */}
          <div className="flex items-center gap-6 pb-8 border-b border-white/5">
            <div className="w-20 h-20 rounded-full border-2 border-[#38C2D9] bg-gray-800 flex items-center justify-center text-2xl">
              👤
            </div>
            <button className="text-xs font-bold py-2 px-4 bg-white/10 rounded-lg hover:bg-[#38C2D9] hover:text-black transition-all">
              CHANGE AVATAR
            </button>
          </div>

          {/* Form Fields */}
          <div className="grid gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase font-black tracking-widest text-gray-400">Gamer Tag</label>
              <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                className="bg-black/50 border border-white/10 rounded-xl p-4 focus:border-[#38C2D9] outline-none transition-all"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase font-black tracking-widest text-gray-400">Bio</label>
              <textarea 
                placeholder="Tell the community about yourself..."
                className="bg-black/50 border border-white/10 rounded-xl p-4 h-32 focus:border-[#38C2D9] outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button className="flex-1 bg-[#38C2D9] text-black font-black py-4 rounded-xl hover:scale-[1.02] transition-transform">
              SAVE CHANGES
            </button>
            <button 
              onClick={() => window.history.back()}
              className="px-8 border border-white/10 rounded-xl font-bold text-sm hover:bg-red-500/20 hover:border-red-500/50 transition-all"
            >
              CANCEL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}