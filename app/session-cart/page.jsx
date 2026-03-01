"use client";

import Link from "next/link";
import Image from "next/image";
import { Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "@/components/cart/SessionCartProvider";

export default function SessionPage() {
  const { items, removeExperience, updateQuantity, updateHours, total } = useCart();

  const getCartItemKey = (game) =>
    `${game.experience_id}-${game.booking_type === "hourly" ? game.selected_hours : "fixed"}`;

  return (
    <section className="min-h-screen bg-white dark:bg-[#0a0a0a] text-black dark:text-white pt-28 pb-20"> 
    <div className="max-w-5xl mx-auto px-6">
      <h1 className="text-4xl font-bold mb-10">Your Session</h1>

      {items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-black/60 dark:text-white/70 text-lg mb-6">No games selected yet.</p>
          <Link
            href="/experience/vr"
            className="inline-block px-6 py-3 bg-[#38C2D9] text-black font-semibold hover:bg-[#38C2D9]/90 transition"
          >
            Browse VR Experiences
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-6">
            {items.map((game) => (
              <div
                key={getCartItemKey(game)}
                className="border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 p-6 rounded-none hover:border-[#38C2D9]/60 transition shadow-[0_0_30px_rgba(56,194,217,0.03)]"
              >
                <div className="flex flex-col gap-4 sm:flex-row">
                  {/* Game Image */}
                  <div className="relative w-full sm:w-40 h-32 bg-black/5 dark:bg-black/40 border border-black/10 dark:border-white/10 rounded overflow-hidden flex-shrink-0">
                    {game.image_url && (
                      <Image
                        src={game.image_url}
                        alt={game.title}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>

                  {/* Game Details */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex-1">
                        <h2 className="text-xl font-bold">{game.title}</h2>
                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          {game.category_name && (
                            <span className="px-2 py-0.5 text-xs font-semibold bg-[#38C2D9]/10 text-[#38C2D9] rounded-none uppercase">
                              {game.category_name}
                            </span>
                          )}
                          {game.genre && (
                            <span className="text-xs text-black/60 dark:text-white/70">
                              {game.genre}
                            </span>
                          )}
                        </div>
                       {game.booking_type === "hourly" ? (
                            <p className="mt-2 text-sm text-black/60 dark:text-white/70">
                              Hours: {game.selected_hours}
                            </p>
                          ) : (
                            game.duration_minutes != null && (
                              <p className="mt-2 text-sm text-black/60 dark:text-white/70">
                                Duration: {game.duration_minutes} minutes
                              </p>
                            )
                          )}
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() =>
  removeExperience(game.experience_id, game.selected_hours)
}
                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950 rounded transition"
                        aria-label="Remove from cart"
                        type="button"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>

                    {/* Quantity Controls & Price */}
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-black/10 dark:border-white/10">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">

  {game.booking_type === "hourly" ? (
    <>
      <span className="text-sm text-black/60 dark:text-white/70">
        Hours:
      </span>

      <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded">
        <button
          onClick={() =>
            updateHours(
              game.experience_id,
              game.selected_hours,
              game.selected_hours - 1
            )
          }
          disabled={game.selected_hours <= game.min_hours}
          className="p-2 hover:bg-black/5 dark:hover:bg-white/5 transition disabled:opacity-40 disabled:cursor-not-allowed"
          type="button"
        >
          <Minus size={16} />
        </button>

        <span className="px-4 font-semibold min-w-[2rem] text-center">
          {game.selected_hours}
        </span>

        <button
          onClick={() =>
            updateHours(
              game.experience_id,
              game.selected_hours,
              game.selected_hours + 1
            )
          }
          disabled={game.selected_hours >= game.max_hours}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 transition"
          type="button"
        >
          <Plus size={16} />
        </button>
      </div>
    </>
  ) : (
    <>
      <span className="text-sm text-black/60 dark:text-white/70">
        Quantity:
      </span>

      <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded">
        <button
          onClick={() =>
            updateQuantity(
              game.experience_id,
              game.quantity - 1,
              game.selected_hours ?? null
            )
          }
          disabled={game.quantity <= 1}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 transition"
          type="button"
        >
          <Minus size={16} />
        </button>

        <span className="px-4 font-semibold min-w-[2rem] text-center">
          {game.quantity}
        </span>

        <button
          onClick={() =>
            updateQuantity(
              game.experience_id,
              game.quantity + 1,
              game.selected_hours ?? null
            )
          }
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 transition"
          type="button"
        >
          <Plus size={16} />
        </button>
      </div>
    </>
  )}
</div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-xl font-bold">
                          AED {
                              game.booking_type === "hourly"
                                ? game.total_price
                                : game.price * game.quantity
                            }
                        </p>
                        
                        {game.booking_type !== "hourly" && game.quantity > 1 && (
                            <p className="text-xs text-black/60 dark:text-white/70">
                              AED {game.price} each
                            </p>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Section */}
          <div className="mt-10 border-t border-gray-200 dark:border-gray-800 pt-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <Link
                href="/experience/vr"
                className="text-[#38C2D9] hover:text-[#38C2D9]/80 font-semibold"
              >
                ← Add More Games
              </Link>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="text-right">
                  <p className="text-sm text-black/60 dark:text-white/70">
                    Total Amount
                  </p>
                  <p className="text-2xl font-bold text-[#38C2D9]">
                    AED {total}
                  </p>
                </div>

                <Link
                  href="/checkout"
                  className="px-8 py-3 bg-[#38C2D9] text-black font-bold text-center hover:bg-[#38C2D9]/90 transition whitespace-nowrap"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
    </section>
  );
}