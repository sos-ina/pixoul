"use client";
import React from 'react';
import Link from 'next/link';

export default function PricingPage() {
  const priceOptions = [
    {
      title: "Single VR Game",
      price: "35",
      unit: "per game",
      features: [
        "Choice of 1 VR experience",
        "Approx. 6-10 minutes play",
        "Wireless HTC Focus 3 Gear",
        "4D Motion Platform access"
      ],
      highlight: false,
      buttonText: "Book Single"
    },
    {
      title: "Story Mode Bundle",
      price: "250",
      unit: "full experience",
      features: [
        "All 10 VR Experiences included",
        "Over 1 hour of total gameplay",
        "Chronological Narrative Path",
        "Full Pixoul Planet Lore"
      ],
      highlight: true,
      buttonText: "Start Mission"
    }
  ];

  return (
    <div className="min-h-screen dark:bg-[#0a0a0a] dark:text-white bg-white text-black pt-31 px-6 pb-24">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-[#38C2D9] text-xs font-black uppercase tracking-[0.5em] mb-4">Investment</h2>
          <h1 className="text-7xl font-black  uppercase tracking-tighter mb-6">
            Access <span className="text-[#38C2D9]">Tiers</span>
          </h1>
          <p className="max-w-xl mx-auto text-gray-400 text-sm leading-relaxed">
            Entry to Pixoul Gaming is free. Choose your mission level below to begin your journey into the metaverse.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20">
          {priceOptions.map((tier, idx) => (
            <div 
              key={idx} 
              className={`relative p-10 rounded-[3rem] border transition-all duration-500 ${
                tier.highlight 
                ? 'bg-[#38C2D9]/5 border-[#38C2D9] shadow-[0_0_40px_rgba(56,194,217,0.1)]' 
                : 'bg-white/5 border-white/10 hover:border-white/20'
              }`}
            >
              {tier.highlight && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#38C2D9] text-black text-[9px] font-black uppercase px-6 py-2 rounded-full tracking-widest">
                  Most Popular
                </span>
              )}

              <h3 className="text-2xl font-black italic uppercase mb-2">{tier.title}</h3>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-sm font-bold text-gray-500 italic">AED</span>
                <span className="text-6xl font-black italic">{tier.price}</span>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-2">{tier.unit}</span>
              </div>

              <ul className="space-y-4 mb-10">
                {tier.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-3 text-sm text-gray-300">
                    <span className="text-[#38C2D9]">▶</span> {feature}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-5 rounded-2xl font-black uppercase text-xs transition-all italic ${
                tier.highlight 
                ? 'bg-[#38C2D9] text-black hover:scale-[1.02]' 
                : 'bg-white/10 text-white hover:bg-white/20'
              }`}>
                {tier.buttonText}
              </button>
            </div>
          ))}
        </div>

        {/* Additional Rates (Esports & Retro) */}
        <div className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-12">
          <h4 className="text-center text-[10px] font-black uppercase tracking-[0.5em] text-gray-500 mb-10">Other Experiences</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="text-center">
              <p className="text-gray-400 text-[10px] font-black uppercase mb-1">Retro Zone</p>
              <p className="text-2xl font-black italic uppercase">Classic Arcade</p>
              <p className="text-[9px] text-[#38C2D9] font-bold mt-2">Pay Per Play</p>
            </div>
            <div className="text-center border-x border-white/5">
              <p className="text-gray-400 text-[10px] font-black uppercase mb-1">Esports Academy</p>
              <p className="text-2xl font-black italic uppercase">Pro Training</p>
              <p className="text-[9px] text-[#38C2D9] font-bold mt-2">Certified Courses</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-[10px] font-black uppercase mb-1">Mobile Gaming</p>
              <p className="text-2xl font-black italic uppercase">Device Rental</p>
              <p className="text-[9px] text-[#38C2D9] font-bold mt-2">High-Spec Mobile</p>
            </div>
          </div>
        </div>

        {/* FAQ Link Button */}
        <div className="mt-16 text-center">
          <Link href="/plan-your-visit/faqs">
            <button className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-[#38C2D9] transition-colors">
              Have questions about PCR or Age limits? View FAQs →
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}