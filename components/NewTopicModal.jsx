"use client";
import React, { useState, useEffect } from 'react';

export default function NewTopicModal({ onClose, categories }) {
  // 1. STATE FOR INPUTS (To keep it empty or reset it)
  const [selectedCategory, setSelectedCategory] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      
      {/* 2. CLICK-AWAY BACKDROP */}
      {/* This div is the dark background. Clicking it triggers onClose */}
      <div 
        className="absolute inset-0 dark:bg-black/90 bg-white/90 backdrop-blur-md cursor-pointer" 
      ></div>

        {/* Modal Content */}
      <div className="relative bg-[#111] border border-white/10 w-full max-w-2xl rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
        <div className="mb-8">
          <h2 className="text-3xl font-black italic uppercase">Start a <span className="text-[#38C2D9]">New Topic</span></h2>
          <p className="text-gray-500 text-xs uppercase font-bold tracking-widest mt-2">Post to the Pixoul community</p>
        </div>

        <div className="space-y-6">
          {/* Title Input */}
          <div>
            <label className="text-[10px] uppercase font-black text-gray-500 mb-2 block">Topic Title</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your topic a clear name..."
              className="w-full dark:bg-black/40 bg-white/40 border border-white/10 rounded-xl p-4 text-white focus:border-[#38C2D9] outline-none transition-all"
            />
          </div>

          {/* Category Selector */}
          <div>
            <label className="text-[10px] uppercase font-black text-gray-500 mb-2 block">Post In</label>
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full dark:bg-black/40 bg-white/40 border border-white/10 rounded-xl p-4 text-white focus:border-[#38C2D9] outline-none appearance-none cursor-pointer"
            >
              {/* --- HERE ARE YOUR OPTIONS --- */}
              <option value="" disabled className="bg-[#111]">Choose a category...</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id} className="bg-[#111]">
                  {cat.title}
                </option>
              ))}
              {/* ------------------------------ */}
            </select>
          </div>

          {/* Message Area */}
          <div>
            <label className="text-[10px] uppercase font-black text-gray-500 mb-2 block">Your Message</label>
            <textarea 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full dark:bg-black/40 bg-white/40 border border-white/10 rounded-2xl p-4 h-48 text-white focus:border-[#38C2D9] outline-none transition-all resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button 
              className="flex-1 bg-[#38C2D9] text-black font-black py-4 rounded-xl hover:bg-white transition-all uppercase italic"
              onClick={() => {
                console.log("Posting:", { title, selectedCategory, message });
                onClose(); // Close after "posting"
              }}
            >
              Post Topic
            </button>
            <button 
              onClick={onClose}
              className="px-8 text-gray-500 font-bold hover:text-white transition-colors uppercase text-xs"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}