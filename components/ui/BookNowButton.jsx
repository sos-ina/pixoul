"use client";
import { useRouter } from "next/navigation";
import { routes } from "@/lib/routes";

export default function BookNowButton({ onClick, className = "" }) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push(routes.bookExperience(experienceId))}
      className={`
        relative
        px-5 py-2
        bg-[#38C2D9
        dark:text-white text-black
        font-semibold
        tracking-wide
        rounded-none
        border
        border-[#38C2D9]
        overflow-hidden
        transition-all
        duration-300
        ${className}
      `}
    >
      {/* Shimmer edge */}
      <span className="absolute inset-0 pointer-events-none shimmer-border"></span>

      {/* Text */}
      <span className="relative z-10">
        Book Now
      </span>
    </button>
  );
}
