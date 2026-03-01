"use client";
import React from 'react';

export default function Reach() {
  const contactInfo = [
    { 
      label: "Call Us", 
      value: "+971 2 418 6699", 
      icon: "📞", 
      link: "tel:+97124186699" 
    },
    { 
      label: "Email Us", 
      value: "info@pixoulgaming.com", 
      icon: "✉️", 
      link: "mailto:info@pixoulgaming.com" 
    },
    { 
      label: "Location", 
      value: "Al Qana Walk, Rabdan, Abu Dhabi", 
      icon: "📍", 
      link: "https://www.google.com/maps/dir//Pixoul+Gaming+Al+Qana+Abu+Dhabi" 
    }
  ];

  const hours = [
    { days: "Sun – Wed", time: "10:00 AM – 10:00 PM" },
    { days: "Thu – Sat", time: "10:00 AM – 12:00 AM" }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-black dark:text-white pt-28 px-6 pb-24 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-20 text-center">
          <h2 className="text-[#38C2D9] text-xs font-black uppercase tracking-[0.5em] mb-4">FIND US</h2>
          <h1 className="mb-6  font-black tracking-tighter uppercase text-4xl sm:text-6xl md:text-7xl lg:text-8xl">
            Get <span className="text-[#38C2D9]">In</span> Touch
          </h1>
          <p className="max-w-xl mx-auto text-black/60 dark:text-white/70 text-sm font-medium uppercase tracking-[0.2em]">
            Find us at the heart of Al Qana, Abu Dhabi.
          </p>
        </div>

        <div className="grid items-stretch gap-12 lg:grid-cols-2">
          
          {/* Left Side: Contact & Hours */}
          <div className="flex flex-col space-y-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
              {contactInfo.map((info, idx) => (
                <a 
                  href={info.link} 
                  key={idx}
                  target={info.label === "Location" ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className="group p-8 bg-black/5 dark:bg-[#111] border border-black/10 dark:border-white/10 hover:border-[#38C2D9] transition-all flex items-center gap-6"
                >
                  <span className="text-3xl transition-all grayscale group-hover:grayscale-0">{info.icon}</span>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#38C2D9] mb-1">{info.label}</p>
                    <p className="text-lg italic font-bold transition-colors group-hover:text-black dark:group-hover:text-white">{info.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Operating Hours Box */}
            <div className="p-8 bg-black/5 dark:bg-[#111] border border-black/10 dark:border-white/10 flex-grow">
              <h3 className="flex items-center gap-3 mb-6 text-xl italic font-black uppercase">
                <span className="w-2 h-2 bg-[#38C2D9]"></span>
                Operating Hours
              </h3>
              <div className="space-y-4">
                {hours.map((item, idx) => (
                  <div key={idx} className="flex justify-between pb-2 border-b border-black/10 dark:border-white/10">
                    <span className="text-xs font-bold tracking-widest text-black/60 dark:text-white/70 uppercase">{item.days}</span>
                    <span className="font-black italic text-[#38C2D9]">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Visual Location & Interactive Map */}
          <div className="relative min-h-[500px] bg-black/5 dark:bg-[#111] border border-black/10 dark:border-white/10 overflow-hidden flex flex-col">
            
            {/* Live Google Map Embed - Centered on Pixoul Gaming */}
            <div className="w-full h-1/2 min-h-[250px] relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3632.7483838423456!2d54.45145707604599!3d24.424785461973686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e4198403a138b%3A0x114d3932327c306c!2sPixoul%20Gaming!5e0!3m2!1sen!2sae!4v1709123456789!5m2!1sen!2sae"
                className="absolute inset-0 w-full h-full grayscale opacity-70 hover:opacity-100 transition-opacity duration-500 dark:invert dark:contrast-[1.2] transition-opacity duration-500"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            
            <div className="flex flex-col justify-center flex-1 p-10 bg-white dark:bg-black">
              <h3 className="mb-2 text-4xl italic font-black leading-none uppercase">
                Pixoul <span className="text-[#38C2D9]">Hub</span>
              </h3>
              <p className="max-w-xs mb-8 text-sm font-medium tracking-widest text-black/60 dark:text-white/70 uppercase">
                Al Qana Walk, Abu Dhabi's premier waterfront destination.
              </p>
              
              <a 
                href="https://www.google.com/maps/dir//Pixoul+Gaming+Al+Qana+Abu+Dhabi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-fit px-10 py-4 bg-[#38C2D9] text-black font-black uppercase italic text-xs tracking-widest hover:bg-white transition-all transform hover:-translate-y-1"
              >
                Get Directions
              </a>
            </div>

            {/* Technical Detail */}
            <div className="absolute hidden p-3 border pointer-events-none top-4 right-4  bg-white/60 dark:bg-black/60 backdrop-blur-md border-white/5 md:block">
              <div className="text-[8px] font-mono text-[#38C2D9] uppercase leading-tight">
                Loc_Ref: 24.424° N <br />
                Lon_Ref: 54.451° E
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}