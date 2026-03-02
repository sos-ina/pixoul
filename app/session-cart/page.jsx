"use client";

import Link from "next/link";
import Image from "next/image";
import { Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "@/components/cart/SessionCartProvider";
import PackageSuggestions from "@/components/cart/PackageSuggestions";

const PACKAGE_CATALOG = [
  { package_id:"starter-pack-100-aed", title:"Starter Pack 100 AED", price:100, minTotal:0, minVrGames:1, description:"..." },
  { package_id:"gamers-choice...", title:"Gamer's Choice + FREE 3 VR Experiences 300 AED", price:300, minTotal:250, minVrGames:2, description:"..." },
  { package_id:"pro-gamer...", title:"Pro-Gamer Fuel + FREE 5 VR Experiences 500 AED", price:500, minTotal:400, minVrGames:3, description:"..." },
  { package_id:"elite...", title:"Elite Bundle + FREE 7 VR Experiences 700 AED", price:700, minTotal:600, minVrGames:4, description:"..." },
  { package_id:"the-ulitimate...", title:"The Ulitimate + FREE 10 VR Experiences 1000 AED", price:1000, minTotal:850, minVrGames:5, description:"..." },
  // You can keep racing packages in catalog but isTopupBundle() currently ignores them anyway
];

export default function SessionPage() {
  const {
    items,
    removeExperience,
    removePackage,
    updateQuantity,
    updateHours,
    total,
  } = useCart();

  const getCartItemKey = (item) => {
    if (item.type === "package") return `package-${item.package_id}`;
    return `exp-${item.experience_id}-${item.booking_type === "hourly" ? item.selected_hours : "fixed"}`;
  };

  return (
    <section className="min-h-screen bg-white dark:bg-[#0a0a0a] text-black dark:text-white pt-15 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-10">Your Session</h1>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-black/60 dark:text-white/70 text-lg mb-6">
              Your cart is empty.
            </p>
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
              {items.map((item) => {
                const isPackage = item.type === "package";

                return (
                  <div
                    key={getCartItemKey(item)}
                    className="border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 p-6 rounded-none hover:border-[#38C2D9]/60 transition shadow-[0_0_30px_rgba(56,194,217,0.03)]"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row">
                      {/* Image */}

                      <div className="relative w-full sm:w-40 h-32 bg-black/5 dark:bg-black/40 border border-black/10 dark:border-white/10 rounded overflow-hidden flex-shrink-0">
                        {typeof item.image_url === "string" && item.image_url.trim().length > 0 ? (
                          <Image
                            src={item.image_url}
                            alt={item.title}
                            fill
                            className="object-cover"
                            sizes="96px"
                          />
                        ) : item.type === "package" ? (
                          <PackageImageFallback title={item.title} />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-black/40 dark:text-white/40">
                            No Image
                          </div>
                        )}
                      </div>

                      {/* Details */}
                      <div className="flex-1 flex flex-col">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div className="flex-1">
                            <h2 className="text-xl font-bold">{item.title}</h2>

                            {isPackage ? (
                              <p className="mt-2 text-sm text-black/60 dark:text-white/70">
                                Package
                              </p>
                            ) : (
                              <>
                                <div className="mt-2 flex flex-wrap items-center gap-2">
                                  {item.category_name && (
                                    <span className="px-2 py-0.5 text-xs font-semibold bg-[#38C2D9]/10 text-[#38C2D9] rounded-none uppercase">
                                      {item.category_name}
                                    </span>
                                  )}
                                  {item.genre && (
                                    <span className="text-xs text-black/60 dark:text-white/70">
                                      {item.genre}
                                    </span>
                                  )}
                                </div>

                                {item.booking_type === "hourly" ? (
                                  <p className="mt-2 text-sm text-black/60 dark:text-white/70">
                                    Hours: {item.selected_hours}
                                  </p>
                                ) : (
                                  item.duration_minutes != null && (
                                    <p className="mt-2 text-sm text-black/60 dark:text-white/70">
                                      Duration: {item.duration_minutes} minutes
                                    </p>
                                  )
                                )}
                              </>
                            )}

                            {isPackage && item.description && (
                              <p className="mt-2 text-sm text-black/60 dark:text-white/70">
                                {item.description}
                              </p>
                            )}
                          </div>

                          {/* Remove */}
                          <button
                            onClick={() => {
                              if (isPackage) removePackage(item.package_id);
                              else removeExperience(item.experience_id, item.selected_hours);
                            }}
                            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950 rounded transition"
                            aria-label="Remove from cart"
                            type="button"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>

                        {/* Controls & Price */}
                        <div className="flex items-center justify-between mt-auto pt-3 border-t border-black/10 dark:border-white/10">
                          {/* Controls */}
                          <div className="flex items-center gap-3">
                            {isPackage ? (
                              <>
                                <span className="text-sm text-black/60 dark:text-white/70">
                                  Quantity:
                                </span>

                                <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded">
                                  <button
                                    onClick={() =>
                                      updateQuantity(
                                        item.package_id,
                                        (item.quantity ?? 1) - 1,
                                        null,
                                        "package"
                                      )
                                    }
                                    disabled={(item.quantity ?? 1) <= 1}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 transition disabled:opacity-40 disabled:cursor-not-allowed"
                                    type="button"
                                  >
                                    <Minus size={16} />
                                  </button>

                                  <span className="px-4 font-semibold min-w-[2rem] text-center">
                                    {item.quantity ?? 1}
                                  </span>

                                  <button
                                    onClick={() =>
                                      updateQuantity(
                                        item.package_id,
                                        (item.quantity ?? 1) + 1,
                                        null,
                                        "package"
                                      )
                                    }
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 transition"
                                    type="button"
                                  >
                                    <Plus size={16} />
                                  </button>
                                </div>
                              </>
                            ) : item.booking_type === "hourly" ? (
                              <>
                                <span className="text-sm text-black/60 dark:text-white/70">
                                  Hours:
                                </span>

                                <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded">
                                  <button
                                    onClick={() =>
                                      updateHours(
                                        item.experience_id,
                                        item.selected_hours,
                                        item.selected_hours - 1
                                      )
                                    }
                                    disabled={item.selected_hours <= (item.min_hours ?? 1)}
                                    className="p-2 hover:bg-black/5 dark:hover:bg-white/5 transition disabled:opacity-40 disabled:cursor-not-allowed"
                                    type="button"
                                  >
                                    <Minus size={16} />
                                  </button>

                                  <span className="px-4 font-semibold min-w-[2rem] text-center">
                                    {item.selected_hours}
                                  </span>

                                  <button
                                    onClick={() =>
                                      updateHours(
                                        item.experience_id,
                                        item.selected_hours,
                                        item.selected_hours + 1
                                      )
                                    }
                                    disabled={item.max_hours != null && item.selected_hours >= item.max_hours}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 transition disabled:opacity-40 disabled:cursor-not-allowed"
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
                                        item.experience_id,
                                        (item.quantity ?? 1) - 1,
                                        item.selected_hours ?? null,
                                        "experience"
                                      )
                                    }
                                    disabled={(item.quantity ?? 1) <= 1}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 transition disabled:opacity-40 disabled:cursor-not-allowed"
                                    type="button"
                                  >
                                    <Minus size={16} />
                                  </button>

                                  <span className="px-4 font-semibold min-w-[2rem] text-center">
                                    {item.quantity ?? 1}
                                  </span>

                                  <button
                                    onClick={() =>
                                      updateQuantity(
                                        item.experience_id,
                                        (item.quantity ?? 1) + 1,
                                        item.selected_hours ?? null,
                                        "experience"
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
                              AED{" "}
                              {isPackage
                                ? Number(item.price ?? 0) * (item.quantity ?? 1)
                                : item.booking_type === "hourly"
                                ? Number(item.total_price ?? 0)
                                : Number(item.price ?? 0) * (item.quantity ?? 1)}
                            </p>

                            {isPackage && (item.quantity ?? 1) > 1 && (
                              <p className="text-xs text-black/60 dark:text-white/70">
                                AED {Number(item.price ?? 0)} each
                              </p>
                            )}

                            {!isPackage && item.booking_type !== "hourly" && (item.quantity ?? 1) > 1 && (
                              <p className="text-xs text-black/60 dark:text-white/70">
                                AED {Number(item.price ?? 0)} each
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Accent line */}
            <div className="h-[2px] w-full bg-[#38C2D9] my-6" />

            <PackageSuggestions catalog={PACKAGE_CATALOG} />

            {/* Summary */}
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

function PackageImageFallback({ title }) {
  const initials = String(title || "PKG")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

  return (
    <div className="w-full h-full flex items-center justify-center bg-black/10 dark:bg-white/10 border border-black/10 dark:border-white/10">
      <div className="text-center">
        <div className="text-xl font-black tracking-widest text-[#38C2D9]">
          {initials}
        </div>
        <div className="text-[10px] uppercase tracking-[0.25em] text-black/50 dark:text-white/50 mt-1">
          Package
        </div>
      </div>
    </div>
  );
}