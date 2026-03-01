"use client";
import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function CategoryDetail() {
  const params = useParams(); // This gets the "id" from the URL (e.g., 'general')

  // 1. DEFINE THE DATA (Fixes the "topics is not defined" error)
  const topics = [
    { id: "101", title: "How to beat the boss in Level 4?", author: "GamerPro", replies: 12, views: 145, time: "2h ago" },
    { id: "102", title: "Best headset settings for low latency", author: "TechNick", replies: 8, views: 320, time: "5h ago" },
    { id: "103", title: "Tournament this Saturday! Who's in?", author: "Admin_Pixoul", replies: 45, views: "1.2k", time: "1d ago" },
  ];

  return (
    <div className="min-h-screen dark:bg-[#0a0a0a] dark:text-white bg-white text-black pt-28 px-6 pb-20">
      <div className="max-w-6xl mx-auto">
        
        {/* Breadcrumbs */}
        <div className="flex gap-2 text-[10px] uppercase font-bold text-black/60 dark:text-gray-500 mb-6">
          <Link href="/community/forums" className="hover:text-[#38C2D9]">Forums</Link>
          <span>/</span>
          <span className="text-[#38C2D9] uppercase">{params.id}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black italic uppercase mb-8">
          {params.id?.replace('-', ' ')} <span className="text-[#38C2D9]">Discussions</span>
        </h1>

        <div className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-none overflow-hidden">
          {topics.map((topic) => (
            /* 2. THE DYNAMIC LINK (This connects the pages) */
            <Link 
              key={topic.id} 
              href={`/community/forums/${params.id}/${topic.id}`}
              className="p-6 border-b border-b border-black/10 dark:border-white/10 hover:bg-black/[0.04] dark:hover:bg-white/[0.07] transition-all flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#38C2D9] to-blue-600 flex items-center justify-center font-bold text-xs">
                  {topic.author[0]}
                </div>
                <div>
                  <h3 className="font-bold group-hover:text-[#38C2D9] transition-colors">
                    {topic.title}
                  </h3>
                  <p className="text-[10px] text-black/60 dark:text-gray-500 uppercase mt-1">
                    Started by <span className="text-black/80 dark:text-gray-300">{topic.author}</span> • {topic.time}
                  </p>
                </div>
              </div>
              
              <div className="hidden md:flex gap-8 text-center text-sm">
                <div className="w-16">
                  <p className="font-bold">{topic.replies}</p>
                  <p className="text-[9px] text-black/60 dark:text-gray-500 uppercase font-black">Replies</p>
                </div>
                <div className="w-16">
                  <p className="font-bold">{topic.views}</p>
                  <p className="text-[9px] text-black/60 dark:text-gray-500 uppercase font-black">Views</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}