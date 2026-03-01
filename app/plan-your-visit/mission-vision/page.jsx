"use client";
import React from 'react';

export default function MissionVision() {
  const values = [
    {
      title: "Passion for Gaming",
      desc: "We are gamers at heart, dedicated to sharing the joy of immersive experiences.",
      icon: "🎮"
    },
    {
      title: "Community First",
      desc: "Building connections and fostering a welcoming space for all players.",
      icon: "🌐"
    },
    {
      title: "Innovation",
      desc: "Constantly evolving to bring the latest and best gaming technology.",
      icon: "⚙️"
    },
    {
      title: "Accessibility",
      desc: "Making premium VR experiences available to everyone.",
      icon: "🔓"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-black dark:text-white pt-28 px-6 pb-24">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-20 text-center">
          <h2 className="text-[#38C2D9] text-xs font-black uppercase tracking-[0.5em] mb-4">Core Identity</h2>
          <h1 className="mb-6 text-3xl sm:text-5xl md:text-7xl italic font-black tracking-tighter uppercase">
            Mission <span className="text-[#38C2D9]">&</span> Vision
          </h1>
          <p className="max-w-xl mx-auto text-black/60 dark:text-white/70 text-sm font-medium uppercase tracking-[0.2em]">
            What drives us and where we are headed.
          </p>
        </div>

        {/* Mission & Vision Split - Branding: Deep Slate & Pixoul Blue */}
        <div className="grid gap-8 mb-32 md:grid-cols-2">
          {/* Mission */}
          <div className="relative p-6 sm:p-10 md:p-12 bg-black/5 dark:bg-[#111] border border-black/10 dark:border-white/10 rounded-none overflow-hidden group hover:border-[#38C2D9]/50 transition-all">
            <div className="absolute top-0 right-0 p-8 italic font-black text-black dark:text-white select-none text-7xl opacity-5">MISSION</div>
            <h3 className="text-[#38C2D9] text-2xl font-black italic uppercase mb-6 tracking-widest">Our Mission</h3>
            <p className="text-lg italic font-bold leading-relaxed text-black/70 dark:text-white/80">
               &quot;To make world-class virtual reality gaming accessible to everyone, creating unforgettable experiences that bring people together.&quot;
            </p>
          </div>

          {/* Vision */}
          <div className="relative p-12 dark:bg-[#111] bg-black/5 border border-white/10 rounded-sm overflow-hidden group hover:border-[#38C2D9]/50 transition-all">
            <div className="absolute top-0 right-0 p-8 italic font-black text-black dark:text-white select-none text-7xl opacity-5">VISION</div>
            <h3 className="text-[#38C2D9] text-2xl font-black italic uppercase mb-6 tracking-widest">Our Vision</h3>
            <p className="text-lg italic font-bold leading-relaxed text-black/70 dark:text-white/80">
               &quot;To be the premier destination for immersive gaming, where technology and community come together to create the future of entertainment.&quot;
            </p>
          </div>
        </div>

        {/* Core Values Section */}
        <div className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-16">
            <h3 className="text-3xl italic font-black uppercase whitespace-nowrap">Core <span className="text-[#38C2D9]">Values</span></h3>
            <div className="h-[2px] w-full bg-gradient-to-r from-[#38C2D9]/50 to-transparent"></div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((val, idx) => (
              <div key={idx} className="p-10 bg-black/5 dark:bg-[#0f0f0f] border border-black/10 dark:border-white/10 rounded-none hover:border-[#38C2D9] transition-all group relative overflow-hidden">
                {/* Subtle corner accent */}
                <div className="absolute top-0 right-0 w-8 h-8 bg-[#38C2D9]/10 clip-path-corner"></div>
                
                <span className="block mb-6 text-4xl transition-all filter grayscale group-hover:grayscale-0">{val.icon}</span>
                <h4 className="mb-4 text-lg italic font-black text-black dark:text-white uppercase">{val.title}</h4>
                <p className="text-xs font-medium leading-relaxed tracking-wider text-black/60 dark:text-white/70 uppercase">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Statistics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 py-16 border-y border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
          <div className="text-center border-r border-black/10 dark:border-white/10">
            <p className="text-[#38C2D9] text-5xl font-black italic mb-2 tracking-tighter">4,500</p>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-black/60 dark:text-white/70">Square Meters</p>
          </div>
          <div className="text-center border-r border-black/10 dark:border-white/10">
            <p className="mb-2 text-5xl italic font-black tracking-tighter text-black dark:text-white">10</p>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-black/60 dark:text-white/70">VR Experiences</p>
          </div>
          <div className="text-center border-r border-black/10 dark:border-white/10">
            <p className="text-[#38C2D9] text-5xl font-black italic mb-2 tracking-tighter">800</p>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-black/60 dark:text-white/70">Arena Seats</p>
          </div>
          <div className="text-center">
            <p className="mb-2 text-5xl italic font-black tracking-tighter text-black dark:text-white">100%</p>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-black/60 dark:text-white/70">Immersive</p>
          </div>
        </div>

      </div>
    </div>
  );
}