"use client";

import { useCart } from "./SessionCartProvider";
import { useState } from "react";
import { Check, ShoppingCart } from "lucide-react";

export default function AddToSessionButton({ experience, className = "" }) {
  const { addExperience, items } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const cartItem = items.find((x) => x.experience_id === experience.experience_id);
  const isInCart = !!cartItem;

  const handleAdd = () => {
    addExperience(experience);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  // Show "Added!" feedback for 2 seconds
  if (justAdded) {
    return (
      <button
        disabled
        className={`
          px-4 py-2 text-sm
          bg-[#B04198]
          text-white
          flex items-center gap-2 justify-center
          rounded-none
          ${className}
        `}
      >
        <Check size={18} />
        Added!
      </button>
    );
  }

  return (
    <button
      onClick={handleAdd}
      className={`
        px-4 py-2 text-sm
        border border-[#38C2D9]
        text-[#38C2D9]
        hover:bg-[#38C2D9]
        hover:text-black
        transition
        rounded-none
        flex items-center gap-2 justify-center
        ${className}
      `}
    >
      <ShoppingCart size={18} />
      {isInCart ? `Add Another (${cartItem.quantity})` : "Add to Cart"}
    </button>
  );
}