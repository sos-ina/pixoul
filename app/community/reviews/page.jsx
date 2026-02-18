"use client";
import React, { useState } from 'react';

export default function ReviewsPage() {
  const [showReviewForm, setShowReviewForm] = useState(false);

  const ratings = [
    { stars: 5, percent: 78 },
    { stars: 4, percent: 18 },
    { stars: 3, percent: 3 },
    { stars: 2, percent: 1 },
    { stars: 1, percent: 0 },
  ];

  return (
    <div className="min-h-screen dark:bg-[#060606] bg-white dark:text-white text-black pt-28 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-5xl font-black italic tracking-tighter mb-2">REVIEWS & <span className="text-[#38C2D9]">RATINGS</span></h1>
          <p className="text-gray-400">See what our community has to say about their Pixoul experiences.</p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Summary */}
          <aside className="lg:w-1/3 space-y-6">
            <div className="dark:bg-[#111] bg-white border border-white/5 rounded-3xl p-8 sticky top-32">
              <h2 className="text-lg font-bold mb-6">Overall Rating</h2>
              <div className="flex flex-col items-center mb-8">
                <span className="text-7xl font-black text-[#38C2D9]">4.8</span>
                <div className="flex text-yellow-400 my-2">★★★★★</div>
                <p className="text-gray-500 text-sm">1,247 reviews</p>
              </div>

              <div className="space-y-3 mb-8">
                {ratings.map((r) => (
                  <div key={r.stars} className="flex items-center gap-4 text-sm">
                    <span className="w-2 flex items-center">{r.stars} ★</span>
                    <div className="flex-1 h-2 dark:bg-black/40 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${r.percent}%` }}></div>
                    </div>
                    <span className="w-8 text-right text-gray-500">{r.percent}%</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => setShowReviewForm(true)}
                className="w-full py-4 bg-[#38C2D9] dark:text-black text-whitefont-black rounded-xl hover:scale-[1.02] transition-transform uppercase italic"
              >
                Write a Review
              </button>
            </div>
          </aside>

          {/* Review Feed */}
          <main className="lg:w-2/3 space-y-4">
            <ReviewCard 
              name="Michael T." 
              date="Jan 15, 2026" 
              tag="Beat Saber" 
              initials="M"
              text="Absolutely incredible experience! The staff was super helpful and the VR equipment was top-notch. Beat Saber was so much fun, I lost track of time completely."
            />
            <ReviewCard 
              name="Jessica R." 
              date="Jan 12, 2026" 
              tag="Arizona Sunshine" 
              initials="J"
              bgColor="bg-purple-500"
              text="Brought my friends for a zombie-killing session and we had a blast! The multiplayer experience was seamless and the atmosphere was perfect."
            />
          </main>
        </div>
      </div>

      {/* Overlay Review Form */}
      {showReviewForm && (
        <ReviewModal onClose={() => setShowReviewForm(false)} />
      )}
    </div>
  );
}

function ReviewCard({ name, date, tag, text, initials, bgColor = "bg-blue-500" }) {
  return (
    <div className="dark:bg-[#111] bg-white border border-white/5 rounded-3xl p-6 hover:border-white/10 transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-4">
          <div className={`w-12 h-12 rounded-full ${bgColor} flex items-center justify-center font-bold text-lg`}>
            {initials}
          </div>
          <div>
            <h3 className="font-bold leading-none">{name}</h3>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest">{date}</span>
          </div>
        </div>
        <div className="flex text-yellow-400 text-sm">★★★★★</div>
      </div>
      <span className="inline-block px-3 py-1 bg-[#38C2D9]/10 text-[#38C2D9] text-[10px] font-bold rounded-md mb-4 uppercase tracking-tighter">
        {tag}
      </span>
      <p className="text-gray-300 leading-relaxed text-sm">{text}</p>
      <div className="mt-6 pt-6 border-t border-white/5 flex items-center gap-2 text-xs text-gray-500">
        <button className="hover:text-white flex items-center gap-1">👍 Helpful (24)</button>
      </div>
    </div>
  );
}

function ReviewModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 dark:bg-black/80 bg-white/80 backdrop-blur-sm"></div>
      
      {/* Form Container */}
      <div className="relative dark:bg-[#0a0a0a] bg-white border border-[#38C2D9]/30 w-full max-w-lg rounded-[2.5rem] p-8 shadow-2xl shadow-[#38C2D9]/10">
        <h2 className="text-2xl font-black italic mb-6">POST YOUR <span className="text-[#38C2D9]">FEEDBACK</span></h2>
        
        <div className="space-y-6">
          <div>
            <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest block mb-2">Rate Your Experience</label>
            <div className="flex gap-2 text-3xl text-gray-700">
              {[1, 2, 3, 4, 5].map((s) => (
                <button key={s} className="hover:text-yellow-400 transition-colors">★</button>
              ))}
            </div>
          </div>

    <div>
  <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest block mb-2">Game / Experience</label>
  <select className="w-full dark:bg-black/40 bg-white/40 border border-white/10 rounded-xl p-4 text-sm text-white focus:border-[#38C2D9] outline-none appearance-none cursor-pointer">
    <option className="dark:bg-black/40 bg-white/40 text-gray-400">Select an experience...</option>
    <option className="dark:bg-black/40 bg-white/40 text-white" value="vr">VR Games</option>
    <option className="dark:bg-black/40 bg-white/40 text-white" value="pc">PC Arena</option>
    <option className="dark:bg-black/40 bg-white/40 text-white" value="retro">Retro Zone</option>
  </select>
</div>

          <div>
            <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest block mb-2">Your Review</label>
            <textarea 
              placeholder="What did you think of Pixoul?"
              className="w-full dark:bg-black/40 bg-white/40 border border-white/10 rounded-2xl p-4 h-40 text-sm focus:border-[#38C2D9] outline-none transition-all resize-none"
            />
          </div>

          <div className="flex gap-4 pt-2">
            <button className="flex-1 py-4 bg-[#38C2D9] dark:text-black text-white font-black rounded-xl italic uppercase hover:scale-[1.02] transition-transform">
              Publish Review
            </button>
            <button onClick={onClose} className="px-6 text-gray-500 font-bold text-xs uppercase hover:text-white transition-colors">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}