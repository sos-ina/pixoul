"use client";
import React from 'react';

const StoryTimeline = () => {
  const timelineEvents = [
    {
      period: "THE EXODUS",
      title: "Earth's Final Days",
      description: "Corruption, plague, and war spread across Earth. Four scientists gather to create technology for intergalactic travel.",
      icon: "🌍"
    },
    {
      period: "THE ARRIVAL",
      title: "Founding Pixoul Planet",
      description: "The founders and 1,000 hand-picked pioneers land and build Legacy City, a sustainable green city.",
      icon: "🚀"
    },
    {
      period: "THE HYPER-SLEEP",
      title: "100 Year Glitch",
      description: "Founders enter Cryo Chambers to regenerate for 1 year, but wake up 100 years later to a corrupted world.",
      icon: "❄️"
    },
    {
      period: "THE RESISTANCE",
      title: "Reclaim the Soul",
      description: "The Elite group has enslaved the population. Guided by ERIC, you must bring the soul back to Pixoul.",
      icon: "⚔️"
    }
  ];

  return (
    <div className="py-20 bg-black/50 rounded-[3rem] border border-white/5 my-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-[#38C2D9] text-[10px] font-black uppercase tracking-[0.5em] mb-4">The Narrative</h2>
          <h3 className="text-4xl font-black italic uppercase italic">Mission <span className="text-[#38C2D9]">Background</span></h3>
        </div>

        <div className="relative border-l border-white/10 ml-6 space-y-12">
          {timelineEvents.map((event, index) => (
            <div key={index} className="relative pl-10 group">
              {/* Timeline Dot */}
              <div className="absolute -left-[5px] top-1 w-[9px] h-[9px] bg-white/20 rounded-full group-hover:bg-[#38C2D9] group-hover:shadow-[0_0_15px_#38C2D9] transition-all"></div>
              
              <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl hover:bg-white/[0.04] transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xl">{event.icon}</span>
                  <span className="text-[10px] font-black text-[#38C2D9] uppercase tracking-widest">{event.period}</span>
                </div>
                <h4 className="text-xl font-black italic uppercase mb-2">{event.title}</h4>
                <p className="text-sm text-gray-400 leading-relaxed font-medium">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoryTimeline;