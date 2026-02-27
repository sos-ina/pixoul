"use client";
import React from 'react';

export default function OurStory() {
  const timeline = [
    { year: "2020", title: "The Vision", desc: "Founded with a vision to make premium VR gaming accessible to everyone." },
    { year: "2021", title: "First Location", desc: "Opened our first gaming center with 8 VR stations and a small arcade area." },
    { year: "2022", title: "Expansion", desc: "Expanded to include The Hall event space and doubled our VR capacity." },
    { year: "2023", title: "Community Growth", desc: "Launched community programs, tournaments, and educational partnerships." },
    { year: "2024", title: "Innovation", desc: "Introduced cutting-edge equipment and launched our mobile booking app." },
    { year: "2025", title: "Today & Beyond", desc: "Continuing to innovate with new experiences and community features." }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-28 px-6 pb-24">
      <div className="max-w-4xl mx-auto">
        
        {/* Hero Section */}
        <div className="mb-24 text-center">
          <h2 className="text-[#38C2D9] text-xs font-black uppercase tracking-[0.5em] mb-4">Our Heritage</h2>
          <h1 className="mb-6 italic font-black tracking-tighter uppercase text-7xl">
            Our <span className="text-[#38C2D9]">Story</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg font-medium leading-relaxed text-gray-400">
            From a simple idea to a thriving gaming community - this is the Pixoul journey.
          </p>
        </div>

        {/* Origin Section */}
        <div className="grid items-center gap-12 mb-32 md:grid-cols-2">
          <div className="p-10 bg-white/5 border border-white/10 rounded-[3rem]">
            <h3 className="mb-6 text-2xl italic font-black uppercase">Where It All Began</h3>
            <p className="mb-4 text-sm leading-relaxed text-gray-400">
              Pixoul Gaming was born from a simple belief: that everyone deserves to experience the magic of virtual reality gaming, not just those who can afford expensive equipment.
            </p>
            <p className="text-sm leading-relaxed text-gray-400">
              Our founders noticed a gap in the market. VR technology was advancing rapidly, but access remained limited. They envisioned a space where friends and families could come together.
            </p>
          </div>
          <div className="space-y-4">
             <div className="h-2 w-20 bg-[#38C2D9]"></div>
             <p className="text-xl italic font-bold leading-tight uppercase">
               What started as a small lounge has grown into a vibrant community hub.
             </p>
             <p className="text-sm text-gray-500">
               Hosting tournaments, birthday parties, and corporate events for gamers of all ages.
             </p>
          </div>
        </div>

        {/* The Journey Timeline */}
        <div className="relative pl-10 ml-4 space-y-16 border-l-2 border-white/10 md:ml-0">
          <h3 className="text-4xl font-black italic uppercase mb-12 ml-[-2.5rem] bg-[#0a0a0a] inline-block pr-4">
            Our <span className="text-[#38C2D9]">Journey</span>
          </h3>
          
          {timeline.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline Dot */}
              <div className="absolute -left-[3.15rem] top-1 w-4 h-4 rounded-full bg-[#111] border-2 border-gray-700 group-hover:border-[#38C2D9] transition-colors"></div>
              
              <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:gap-8">
                <span className="text-3xl font-black italic text-[#38C2D9] opacity-50 group-hover:opacity-100 transition-opacity">
                  {item.year}
                </span>
                <div>
                  <h4 className="mb-2 text-xl italic font-black uppercase">{item.title}</h4>
                  <p className="max-w-xl text-sm leading-relaxed text-gray-400">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}