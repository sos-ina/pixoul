"use client";

import { useCart } from "./SessionCartProvider";
import { useState } from "react";
import { Check, ShoppingCart } from "lucide-react";

export default function AddToSessionButton({ experience, className = "" }) {
  const { addExperience, items } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  // Match by hours variant too (important for hourly experiences)
  const cartItem = items.find(
    (x) =>
      x.type !== "package" &&
      x.experience_id === experience.experience_id &&
      (x.booking_type === "hourly"
        ? x.selected_hours === experience.selected_hours
        : true)
  );

  const isInCart = !!cartItem;

  const handleAdd = () => {
    addExperience({ type: "experience", ...experience });
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
          bg-[#38C2D9]/90
          text-white
          flex items-center gap-2 justify-center
          rounded-none
          ${className}
        `}
        type="button"
      >
        <Check size={18} />
        Added
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
      type="button"
    >
      <ShoppingCart size={18} />
      {isInCart ? `Add Another (${cartItem.quantity ?? 1})` : "Add to Cart"}
    </button>
  );
}