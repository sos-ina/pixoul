"use client";
import React, { useState } from 'react';

export default function FAQPage() {
  const faqData = [
    {
      category: "Entry & Safety",
      questions: [
        { 
          q: "What are the vaccination or PCR requirements?", 
          a: "All visitors must show a 'Green status' on the Alhosn app. Unvaccinated guests must present a negative PCR test no older than 7 days." 
        },
        { 
          q: "Is there an age limit?", 
          a: "Pixoul Gaming caters to all ages, but children below 12 must be supervised by an adult." 
        },
        { 
          q: "Is entry to Pixoul Gaming free?", 
          a: "Yes, entry to the building is free. Charges apply only for games, academy enrollment, or specific experiences." 
        }
      ]
    },
    {
      category: "Facilities & Access",
      questions: [
        { 
          q: "What are the opening hours?", 
          a: "The VR Zone is open 10am – 10pm daily. The Esports Zone is open 12pm – Late night." 
        },
        { 
          q: "Is there free parking?", 
          a: "Yes, Al Qana provides over 3,000 outdoor and basement parking spaces free of charge." 
        },
        { 
          q: "Do you have access for People of Determination?", 
          a: "Yes, we offer full access and provide wheelchairs free of charge against a valid ID." 
        }
      ]
    },
    {
      category: "Gaming & Content",
      questions: [
        { 
          q: "How many VR games are available?", 
          a: "Pixoul Planet houses 10 different VR and AR games available in both story and arcade mode." 
        },
        { 
          q: "How long does a typical experience last?", 
          a: "An average game lasts about 6 minutes, which is double the length of typical regional gaming hubs." 
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen dark:bg-[#0a0a0a] dark:text-white bg-white text-black pt-28 px-6 pb-24">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-16">
          <h2 className="
          text-[#38C2D9] 
          text-xs 
          font-black 
          uppercase tracking-[0.5em] 
          mb-4 text-center">
            Support</h2>
          <h1 className="text-6xl 
          font-black 
          tracking-tighter 
          text-center 
          uppercase">
            Frequently Asked <span className="text-[#38C2D9]">Questions</span>
          </h1>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-12">
          {faqData.map((section, sIdx) => (
            <div key={sIdx}>
              <h3 className="
              text-[#38C2D9] 
              text-[10px] 
              font-black 
              uppercase 
              tracking-widest mb-6 
              border-b 
              dark:border-white/10 border-black/10 pb-2">
                {section.category}
              </h3>
              <div className="space-y-4">
                {section.questions.map((item, qIdx) => (
                  <details key={qIdx} className="overflow-hidden transition-all border group dark:bg-white/5 bg-black/5 dark:border-white/10 border-black/10 rounded-2xl hover:border-[#38C2D9]/50">
                    <summary className="flex items-center justify-between p-6 text-sm italic font-bold tracking-tight uppercase list-none cursor-pointer">
                      {item.q}
                      <span className="text-[#38C2D9] group-open:rotate-45 transition-transform">+</span>
                    </summary>
                    <div className="p-6 pt-0 text-sm leading-relaxed dark:text-gray-400 text-gray-500 border-t dark:border-white/5 border-black/10">
                      {item.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>

       {/* Contact Footer */}
        <div className="mt-20 p-10 bg-gradient-to-r from-[#38C2D9]/10 to-transparent border border-[#38C2D9]/20 rounded-[3rem] text-center">
          <h4 className="mb-2 text-xl italic font-black uppercase">Still need help?</h4>
          <p className="mb-6 text-xs font-medium text-gray-400">Contact our mission control for private events or educational tours.</p>
          <div className="flex flex-wrap justify-center gap-4 text-[10px] font-black uppercase">
            {/* General Inquiries */}
            <a 
              href="mailto:info@pixoulgaming.com" 
              className="px-4 py-2 bg-white/5 rounded-full border border-white/10 hover:border-[#38C2D9] hover:text-[#38C2D9] transition-all"
            >
              info@pixoulgaming.com
            </a>
            
            {/* Private Events & Arena Booking */}
            <a 
              href="mailto:events@pixoulgaming.com" 
              className="px-4 py-2 bg-white/5 rounded-full border border-white/10 hover:border-[#38C2D9] hover:text-[#38C2D9] transition-all"
            >
            events@pixoulgaming.com
          </a>
        </div>
      </div>
      </div>
    </div>
  );
}