"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function ThreadPage() {
  const [replyText, setReplyText] = useState("");

  // Dummy Data for the conversation
  const replies = [
    {
      id: 1,
      user: "Shadow_X",
      rank: "Pro Gamer",
      time: "2 hours ago",
      text: "I tried the new VR haptic vests yesterday. The feedback is insane when you're in the Arena. Highly recommend checking the calibration settings first though!",
      avatar: "S"
    },
    {
      id: 2,
      user: "Pixoul_Staff",
      rank: "Admin",
      time: "1 hour ago",
      text: "Glad you liked them! We just updated the firmware on all vests in Zone A for even better precision.",
      avatar: "P",
      isAdmin: true
    },
    {
      id: 3,
      user: "RetroKnight",
      rank: "Member",
      time: "45 mins ago",
      text: "Does this work for the older arcade titles too, or just the new VR stuff?",
      avatar: "R"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-28 px-6 pb-20">
      <div className="max-w-4xl mx-auto">
        
        {/* Navigation Breadcrumbs */}
        <div className="flex gap-2 text-[10px] uppercase font-bold text-gray-500 mb-8">
          <Link href="/community/forums" className="hover:text-[#38C2D9]">Forums</Link>
          <span>/</span>
          <Link href="/community/forums/general" className="hover:text-[#38C2D9]">General</Link>
          <span>/</span>
          <span className="text-white">Haptic Vest Feedback</span>
        </div>

        {/* --- Main Topic Post --- */}
        <div className="bg-white/5 border border-[#38C2D9]/20 rounded-[2.5rem] p-8 mb-10 shadow-[0_0_30px_rgba(56,194,217,0.05)]">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-[#38C2D9] rounded-2xl flex items-center justify-center font-black text-black">
              SX
            </div>
            <div>
              <h1 className="text-3xl font-black italic uppercase tracking-tighter">New Haptic Vests in the VR Zone</h1>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Started by Shadow_X • 3 hours ago</p>
            </div>
          </div>
          <p className="text-gray-300 leading-relaxed text-lg">
            Just spent 2 hours in the VR Arena. The new haptic integration is a game changer for immersion. 
            Has anyone else noticed the difference in the recoil feedback?
          </p>
        </div>

        {/* --- Replies Section --- */}
        <div className="space-y-6 mb-10 relative before:absolute before:left-6 before:top-0 before:bottom-0 before:w-[1px] before:bg-white/10">
          {replies.map((msg) => (
            <div key={msg.id} className="relative pl-14">
              <div className={`bg-white/[0.03] border ${msg.isAdmin ? 'border-[#38C2D9]/30' : 'border-white/5'} rounded-3xl p-6 transition-hover hover:bg-white/[0.05]`}>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-[#38C2D9]">{msg.user}</span>
                    <span className="text-[8px] bg-white/10 px-2 py-0.5 rounded-full uppercase font-black text-gray-400">
                      {msg.rank}
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-600 font-mono">{msg.time}</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* --- The Reply Input (Texting UI) --- */}
        <div className="bg-[#111] border border-white/10 rounded-[2.5rem] p-8 mt-12">
          <div className="flex items-center gap-2 mb-4 ml-2">
            <div className="w-2 h-2 bg-[#38C2D9] rounded-full animate-pulse"></div>
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Join the conversation</h3>
          </div>
          
          <textarea 
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write your reply..."
            className="w-full bg-black/40 border border-white/5 rounded-2xl p-5 h-32 text-white focus:border-[#38C2D9] outline-none transition-all resize-none mb-4 placeholder:text-gray-700"
          />
          
          <div className="flex justify-end">
            <button className="bg-[#38C2D9] text-black font-black px-10 py-4 rounded-xl text-xs uppercase italic hover:scale-105 transition-all active:scale-95 shadow-[0_0_20px_rgba(56,194,217,0.2)]">
              Send Reply
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}