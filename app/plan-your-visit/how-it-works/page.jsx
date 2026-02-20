"use client";
import React from 'react';
import Link from 'next/link';
import StoryTimeline from '@/components/vr/StoryTimeline';

export default function HowItWorks() {
  const steps = [
    { 
      num: "01", 
      title: "Choose Your Path", 
      desc: "Decide between 'Story Mode' (the full 10-game VR journey) or 'Arcade Mode' for individual sessions and retro classics.", 
      icon: "🛤️" 
    },
    { 
      num: "02", 
      title: "Gear Up", 
      desc: "Equip the region's first fully wireless HTC Focus 3 headsets synced with 4D motion platforms and haptic simulators.", 
      icon: "🥽" 
    },
    { 
      num: "03", 
      title: "Enter the Metaverse", 
      desc: "Follow ERIC through the 10-mission saga to defeat the Elite group and reclaim the soul of Pixoul Planet.", 
      icon: "🪐" 
    }
  ];

  return (
    <div className="min-h-screen dark:bg-[#0a0a0a] dark:text-white bg-white text-black pt-31 px-6 pb-24">
      <div className="max-w-6xl mx-auto">
        
        {/* Fixed Header Section */}
        <div className="mb-20">
          <h2 className="text-[#38C2D9] text-xs font-black uppercase tracking-[0.5em] mb-4">Plan Your Visit</h2>
          <h1 className="text-7xl font-black uppercase tracking-tighter mb-6">
            How Pixoul <span className="text-[#38C2D9]">Works</span>
          </h1>
            <p className="max-w-2xl text-gray-400 leading-relaxed text-lg">
            From the moment you arrive, your journey begins. Choose your experience, gear up with our 
            fully wireless VR technology, and step into an immersive world where every mission, movement, 
            and decision shapes your adventure.
            </p>
        </div>

        {/* The 3-Step Process Grid */}
        <div className="grid md:grid-cols-3 gap-12 mb-32">
          {steps.map((step) => (
            <div key={step.num} className="group relative p-8 dark:bg-white/5 bg-black/5 border dark:border-white/10 border-black/10 rounded-[2.5rem] hover:border-[#38C2D9]/50 transition-all">
              <div className="text-5xl font-black italic dark:text-white/5 text-black/5 absolute top-6 right-8">{step.num}</div>
              <span className="text-4xl mb-6 block">{step.icon}</span>
              <h3 className="text-2xl font-black italic uppercase mb-4">{step.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Story Timeline Component Integration */}
        <StoryTimeline />

        {/* Call to Action Section */}
        <div className="bg-gradient-to-br from-[#111] to-black border border-white/10 rounded-[3rem] p-12 flex flex-col md:flex-row items-center justify-between gap-8 mt-20">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-black italic uppercase mb-2">Ready to Join the Resistance?</h2>
            <p className="text-gray-400 text-sm">Experience double the immersion of any other hub in the region.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/plan-your-visit/pricing">
              <button className="bg-[#38C2D9] text-black px-10 py-4 rounded-2xl font-black uppercase text-xs hover:scale-105 transition-all italic">
                View Pricing
              </button>
            </Link>
            <Link href="/community/challenges">
              <button className="bg-white/5 border border-white/10 hover:bg-white/10 text-white px-10 py-4 rounded-2xl font-black uppercase text-xs transition-all italic">
                Challenge Hub
              </button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}