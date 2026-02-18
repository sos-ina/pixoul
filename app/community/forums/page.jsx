"use client";
import React, { useState } from 'react';
import Link from 'next/link'; // Import Link
import NewTopicModal from '@/components/NewTopicModal'; 

export default function ForumsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const categories = [
    { id: "general", title: "General Discussion", topics: 124, posts: "1.2k", icon: "💬", desc: "Talk about anything Pixoul related." },
    { id: "vr-strategy", title: "VR Strategy & Tips", topics: 85, posts: "450", icon: "🥽", desc: "Master the meta in VR games." },
    { id: "squad-finder", title: "Squad Finder / LFG", topics: 210, posts: "890", icon: "👥", desc: "Find teammates for your next session." },
    { id: "tournaments", title: "Tournaments", topics: 31, posts: "204", icon: "🏆", desc: "Official and community-run brackets." },
  ];

  return (
    <div className="min-h-screen dark:bg-[#0a0a0a]  dark:text-white text-black bg-white dark
   pt-28 px-6 pb-20">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h1 className="text-5xl font-black uppercase tracking-tighter">Community <span className="text-[#38C2D9]">Forums</span></h1>
            <p className="text-gray-500 mt-2 uppercase text-xs font-bold tracking-widest">Connect • Strategize • Dominate</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#38C2D9] text-black font-black px-8 py-4 rounded-xl text-sm hover:bg-white transition-all uppercase italic shadow-[0_0_20px_rgba(56,194,217,0.1)]"
          >
            + Start New Topic
          </button>
        </div>

        {/* Categories List */}
        <div className="space-y-4">
          {categories.map((cat) => (
            /* WRAP THE ENTIRE CARD IN A LINK */
            <Link 
              key={cat.id} 
              href={`/community/forums/${cat.id}`} 
              className="bg-white/5 border border-white/10 p-6 rounded-[2rem] flex items-center justify-between hover:border-[#38C2D9]/50 hover:bg-white/[0.02] transition-all cursor-pointer group block"
            >
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 dark:bg-black bg-white rounded-2xl border border-white/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold group-hover:text-[#38C2D9] transition-colors">{cat.title}</h3>
                  <p className="text-gray-500 text-sm mt-1">{cat.desc}</p>
                </div>
              </div>

              <div className="hidden md:flex gap-12 text-center mr-8">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-black">Topics</p>
                  <p className="font-mono text-lg">{cat.topics}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-black">Posts</p>
                  <p className="font-mono text-lg">{cat.posts}</p>
                </div>
                <div className="w-32 text-right">
                  <p className="text-[10px] text-[#38C2D9] font-black uppercase">Latest Activity</p>
                  <p className="text-xs truncate">by Shadow_X</p>
                  <p className="text-[10px] text-gray-600">5 mins ago</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {isModalOpen && <NewTopicModal onClose={() => setIsModalOpen(false)} categories={categories} />}
    </div>
  );
}