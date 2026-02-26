"use client";
import { useRouter } from "next/navigation";

export default function BookNowButton({ className = "" }) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push('/mission-bundles')} // Pointing to your new page
      className={`
        relative
        px-6 py-2.5
        bg-[#38C2D9] 
        dark:text-black text-black
        font-black
        italic
        uppercase
        text-[10px]
        tracking-widest
        rounded-sm
        border
        border-[#38C2D9]
        overflow-hidden
        transition-all
        duration-300
        hover:bg-[#38C2D9]
        hover:border-[#38C2D9]
        hover:text-white
        group
        ${className}
      `}
    >
      {/* Shimmer Effect */}
      <span className="absolute inset-0 transition-transform duration-500 -translate-x-full pointer-events-none bg-white/20 group-hover:translate-x-full"></span>

      <span className="relative z-10">View Mission Bundles</span>
    </button>
  );
}