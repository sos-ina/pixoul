"use client";

import Link from "next/link";
import Image from "next/image";
import { Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "@/components/cart/SessionCartProvider";

export default function SessionPage() {
  const { items, removeExperience, updateQuantity, total } = useCart();

  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold mb-10">Your Session</h1>

      {items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg mb-6">No games selected yet.</p>
          <Link
            href="/experience/vr"
            className="inline-block px-6 py-3 bg-[#38C2D9] text-black font-semibold hover:bg-[#2da3bd] transition"
          >
            Browse VR Experiences
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-6">
            {items.map((game) => (
              <div
                key={game.experience_id}
                className="border border-gray-200 dark:border-gray-800 p-6 rounded-lg hover:border-[#38C2D9] transition"
              >
                <div className="flex flex-col gap-4 sm:flex-row">
                  {/* Game Image */}
                  <div className="relative w-full sm:w-40 h-32 bg-gray-100 dark:bg-gray-900 rounded overflow-hidden flex-shrink-0">
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
                            <span className="px-2 py-0.5 text-xs font-semibold bg-[#38C2D9]/10 text-[#38C2D9] rounded uppercase">
                              {game.category_name}
                            </span>
                          )}
                          {game.genre && (
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {game.genre}
                            </span>
                          )}
                        </div>
                        {game.duration_minutes != null && (
                          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            Duration: {game.duration_minutes} minutes
                          </p>
                        )}
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeExperience(game.experience_id)}
                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950 rounded transition"
                        aria-label="Remove from cart"
                        type="button"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>

                    {/* Quantity Controls & Price */}
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-200 dark:border-gray-800">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Quantity:
                        </span>
                        <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded">
                          <button
                            onClick={() =>
                              updateQuantity(game.experience_id, game.quantity - 1)
                            }
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={game.quantity <= 1}
                            aria-label="Decrease quantity"
                            type="button"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="px-4 font-semibold min-w-[2rem] text-center">
                            {game.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(game.experience_id, game.quantity + 1)
                            }
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 transition"
                            aria-label="Increase quantity"
                            type="button"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-xl font-bold">
                          AED {game.price * game.quantity}
                        </p>
                        {game.quantity > 1 && (
                          <p className="text-xs text-gray-500 dark:text-gray-400">
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
                className="text-[#38C2D9] hover:underline font-semibold"
              >
                ← Add More Games
              </Link>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="text-right">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Total Amount
                  </p>
                  <p className="text-2xl font-bold text-[#38C2D9]">
                    AED {total}
                  </p>
                </div>

                <Link
                  href="/checkout"
                  className="px-8 py-3 bg-[#38C2D9] text-black font-bold text-center hover:bg-[#2da3bd] transition whitespace-nowrap"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}