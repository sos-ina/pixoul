"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/SessionCartProvider";

export default function SessionPage() {
  const { items, removeExperience } = useCart();

  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold mb-10">
        Your Session
      </h1>

      {items.length === 0 ? (
        <p className="text-gray-400">
          No games selected yet.
        </p>
      ) : (
        <div className="space-y-6">
          {items.map((game) => (
            <div
              key={game.experience_id}
              className="border border-white/10 p-6 bg-black/60"
            >
              <h2 className="text-xl font-semibold">
                {game.title}
              </h2>

              <p className="text-gray-400 text-sm">
                {game.duration_minutes} min • {game.genre}
              </p>

              <button
                onClick={() => removeExperience(game.experience_id)}
                className="mt-4 text-red-400 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Back */}
      <div className="mt-10">
        <Link
          href="/experience/vr"
          className="text-[#38C2D9] hover:underline"
        >
          ← Add More Games
        </Link>
      </div>
    </div>
  );
}
