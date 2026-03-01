"use client";
import React from 'react';

// The "export default" must be present for Next.js to recognize the page
export default function MissionBundlesPage() {
  const bundles = [
    { 
      name: "The Ultimate", 
      credits: "1000 + 10 Free VR Games", 
      price: "1000",
      savings: "Save AED 50",
      accent: "#38C2D9",
      popular: true 
    },
    { 
      name: "Elite Bundle", 
      credits: "700 + 7 Free VR Games", 
      price: "700",
      savings: "Save AED 35",
      accent: "#38C2D9",
      popular: false 
    },
    { 
      name: "Pro Gamer Fuel", 
      credits: "500 + 5 Free VR Games", 
      price: "500",
      savings: "Save AED 25",
      accent: "#38C2D9",
      popular: false 
    },
    { 
      name: "Gamers Choice", 
      credits: "300 + 3 Free VR Games", 
      price: "300",
      savings: "Save AED 15",
      accent: "#38C2D9",
      popular: false 
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-black dark:text-white pt-28 px-6 pb-24">
      <div className="mx-auto max-w-7xl">
        
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase">
            Mission <span className="text-[#38C2D9]">Bundles</span>
          </h1>
          <p className="text-black/60 dark:text-white/70 font-bold uppercase tracking-[0.3em] text-xs">
            Top-up your credits & unlock the metaverse
          </p>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {bundles.map((bundle, idx) => (
            <div 
              key={idx}
              className="relative transition-all duration-500 border border border-black/10 dark:border-white/10 
              group hover:-translate-y-3
              hover:ring-2 hover:ring-[#ffffff] hover:ring-offset-0 hover:shadow-[0_0_10px_#38C2D9]"
            >
              {/* Card Body */}
              <div 
                className="relative bg-white dark:bg-[#111] p-8 h-full border-b-4 transition-all group-hover:shadow-[0_20px_50px_rgba(255,0,229,0.2)]"
                style={{ 
                  borderBottomColor: bundle.accent,
                  clipPath: 'polygon(0 0, 100% 0, 100% 90%, 85% 100%, 0 100%)' 
                }}
              >
                {bundle.popular && (
                  <span className="absolute -top-0 left-1/2 -translate-x-1/2 bg-[#38C2D9] text-white text-[9px] font-black uppercase px-2 py-1 rounded-b-full tracking-widest z-10">
                    Most Popular
                  </span>
                )}

                <div className="flex flex-col justify-between h-full">
                  <div>
                    <h3 className="mb-2 text-2xl italic font-black leading-none uppercase">
                      {bundle.name.split(' ')[0]} <br/>
                      <span style={{ color: bundle.accent }}>{bundle.name.split(' ').slice(1).join(' ')}</span>
                    </h3>
                    <p className="text-[10px] text-black/60 dark:text-white/60 font-bold uppercase tracking-widest mb-8">
                      {bundle.credits}
                    </p>
                  </div>

                  <div className="mt-8">
                    <div className="flex items-baseline gap-1 mb-1">
                      <span className="text-sm italic font-bold text-black/50 dark:text-white/50">AED</span>
                      <span className="text-5xl italic font-black">{bundle.price}</span>
                    </div>
                    <p className="text-[9px] font-black uppercase text-[#38C2D9] mb-6 tracking-wider">
                      {bundle.savings}
                    </p>
                    
                    <button 
                      className="w-full py-4 font-black uppercase text-[10px] tracking-widest italic transition-all border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-white hover:text-black"
                    >
                      Select Bundle
                    </button>
                  </div>
                </div>
              </div>

              {/* Background Glow */}
              <div 
                className="absolute inset-0 transition-all duration-500 opacity-0 group-hover:opacity-10 blur-3xl -z-10"
                style={{ backgroundColor: bundle.accent }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
}