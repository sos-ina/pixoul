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
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-28 px-6 pb-24">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-20 text-center">
          <h2 className="text-[#38C2D9] text-xs font-black uppercase tracking-[0.5em] mb-4">Core Identity</h2>
          <h1 className="mb-6 text-6xl italic font-black tracking-tighter uppercase md:text-7xl">
            Mission <span className="text-[#38C2D9]">&</span> Vision
          </h1>
          <p className="max-w-xl mx-auto text-gray-400 text-sm font-medium uppercase tracking-[0.2em]">
            What drives us and where we are headed.
          </p>
        </div>

        {/* Mission & Vision Split - Branding: Deep Slate & Pixoul Blue */}
        <div className="grid gap-8 mb-32 md:grid-cols-2">
          {/* Mission */}
          <div className="relative p-12 bg-[#111] border border-white/10 rounded-sm overflow-hidden group hover:border-[#38C2D9]/50 transition-all">
            <div className="absolute top-0 right-0 p-8 italic font-black text-white select-none text-7xl opacity-5">MISSION</div>
            <h3 className="text-[#38C2D9] text-2xl font-black italic uppercase mb-6 tracking-widest">Our Mission</h3>
            <p className="text-lg italic font-bold leading-relaxed text-gray-300">
               &quot;To make world-class virtual reality gaming accessible to everyone, creating unforgettable experiences that bring people together.&quot;
            </p>
          </div>

          {/* Vision */}
          <div className="relative p-12 bg-[#111] border border-white/10 rounded-sm overflow-hidden group hover:border-[#38C2D9]/50 transition-all">
            <div className="absolute top-0 right-0 p-8 italic font-black text-white select-none text-7xl opacity-5">VISION</div>
            <h3 className="text-[#38C2D9] text-2xl font-black italic uppercase mb-6 tracking-widest">Our Vision</h3>
            <p className="text-lg italic font-bold leading-relaxed text-gray-300">
               &quot;To be the premier destination for immersive gaming, where technology and community come together to create the future of entertainment.&quot;
            </p>
          </div>
        </div>

        {/* Core Values Section */}
        <div className="mb-20">
          <div className="flex items-center gap-6 mb-16">
            <h3 className="text-3xl italic font-black uppercase whitespace-nowrap">Core <span className="text-[#38C2D9]">Values</span></h3>
            <div className="h-[2px] w-full bg-gradient-to-r from-[#38C2D9]/50 to-transparent"></div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((val, idx) => (
              <div key={idx} className="p-10 bg-[#0f0f0f] border border-white/5 rounded-none hover:border-[#38C2D9] transition-all group relative overflow-hidden">
                {/* Subtle corner accent */}
                <div className="absolute top-0 right-0 w-8 h-8 bg-[#38C2D9]/10 clip-path-corner"></div>
                
                <span className="block mb-6 text-4xl transition-all filter grayscale group-hover:grayscale-0">{val.icon}</span>
                <h4 className="mb-4 text-lg italic font-black text-white uppercase">{val.title}</h4>
                <p className="text-xs font-medium leading-relaxed tracking-wider text-gray-500 uppercase">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Statistics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 py-16 border-y border-white/10 bg-white/[0.02]">
          <div className="text-center border-r border-white/5">
            <p className="text-[#38C2D9] text-5xl font-black italic mb-2 tracking-tighter">4,500</p>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Square Meters</p>
          </div>
          <div className="text-center border-r border-white/5">
            <p className="mb-2 text-5xl italic font-black tracking-tighter text-white">10</p>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">VR Experiences</p>
          </div>
          <div className="text-center border-r border-white/5">
            <p className="text-[#38C2D9] text-5xl font-black italic mb-2 tracking-tighter">800</p>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Arena Seats</p>
          </div>
          <div className="text-center">
            <p className="mb-2 text-5xl italic font-black tracking-tighter text-white">100%</p>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Immersive</p>
          </div>
        </div>

      </div>
    </div>
  );
}