"use client";

import { useCart } from "./SessionCartProvider";

export default function AddToSessionButton({ experience, className = "" }) {
  const { addExperience } = useCart();

  return (
    <button
      onClick={() => addExperience(experience)}
      className={`
        px-4 py-2 text-sm
        border border-[#38C2D9]
        text-[#38C2D9]
        hover:bg-[#38C2D9]
        hover:text-black
        transition
        rounded-none
        ${className}
      `}
    >
      Add to Cart
    </button>
  );
}
