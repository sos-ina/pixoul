"use client";

import { useMemo } from "react";
import { useCart } from "@/components/cart/SessionCartProvider";

// Decide which packages are "top-up / VR bundles"
function isTopupBundle(pkg) {
  const t = (pkg.title ?? "").toLowerCase();
  return (
    t.includes("starter") ||
    t.includes("recharge") ||
    t.includes("gamer") ||
    t.includes("pro-gamer") ||
    t.includes("elite") ||
    t.includes("ulitimate") ||
    t.includes("ultimate") ||
    t.includes("vr game play")
  );
}

function getCartStats(items, total) {
  const experiences = items.filter((x) => x.type !== "package");

  // VR game count: adjust this rule to your schema
  const vrItems = experiences.filter((x) => (x.category_name ?? "").toLowerCase().includes("vr"));
  const vrCount = vrItems.reduce((sum, x) => sum + (x.quantity ?? 1), 0);

  // Total count of experiences (any)
  const expCount = experiences.reduce((sum, x) => sum + (x.quantity ?? 1), 0);

  return { total, vrCount, expCount };
}

// Choose “best” package by thresholds of BOTH total & VR count
function pickBestPackage(catalog, stats) {
  const topups = (catalog ?? []).filter(isTopupBundle);

  // sort by "tier" (price) ascending so last eligible is best
  const sorted = [...topups].sort((a, b) => Number(a.price ?? 0) - Number(b.price ?? 0));

  const eligible = sorted.filter((p) => {
    const minTotal = p.minTotal ?? 0;
    const minVr = p.minVrGames ?? 0;
    return stats.total >= minTotal && stats.vrCount >= minVr;
  });

  if (eligible.length > 0) return eligible[eligible.length - 1];

  // If not eligible by thresholds but user has VR games, suggest smallest topup
  if (stats.vrCount > 0 && sorted.length > 0) return sorted[0];

  return null;
}

// Find current “best” package in cart (highest price top-up bundle)
function getCurrentTopupInCart(items, catalog) {
  const topupIds = new Set((catalog ?? []).filter(isTopupBundle).map((p) => p.package_id));
  const inCart = items
    .filter((x) => x.type === "package" && topupIds.has(x.package_id))
    .sort((a, b) => Number(a.price ?? 0) - Number(b.price ?? 0));
  return inCart.length ? inCart[inCart.length - 1] : null;
}

export default function SmartSuggestions({ catalog }) {
  const { items, total, addPackage, removePackage } = useCart();

  const stats = useMemo(() => getCartStats(items, total), [items, total]);

  const best = useMemo(() => pickBestPackage(catalog, stats), [catalog, stats]);
  const current = useMemo(() => getCurrentTopupInCart(items, catalog), [items, catalog]);

  // Show nothing if no experiences
  const hasExperience = items.some((x) => x.type !== "package");
  if (!hasExperience || !best) return null;

  const isUpgrade =
    current && Number(best.price ?? 0) > Number(current.price ?? 0);

  const reasons = [];
  if (stats.vrCount > 0) reasons.push(`VR games in cart: ${stats.vrCount}`);
  reasons.push(`Cart total: AED ${stats.total}`);

  // If they already have a package, we still show suggestion:
  // - if upgrade -> show upgrade UI
  // - else -> show “Add another top-up” (optional)
  return (
    <div className="mt-10 border border-black/10 dark:border-white/10 bg-[#38C2D9]/10 dark:bg-[#38C2D9]/20 p-6 rounded-none">
      <h3 className="text-xl font-bold mb-2">
        {isUpgrade ? "Upgrade Recommendation" : "Recommended Package"}
      </h3>

      <p className="text-sm text-black/60 dark:text-white/70 mb-4">
        {isUpgrade
          ? "You already have a package — this one fits your cart better."
          : "Based on your cart, this package could be a good match."}
      </p>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border border-black/10 dark:border-white/10 p-4 bg-white/60 dark:bg-black/40">
        <div className="flex-1">
          <p className="font-bold">{best.title}</p>
          <p className="text-sm text-black/60 dark:text-white/70">
            AED {best.price}
          </p>

          {best.description && (
            <p className="text-xs text-black/60 dark:text-white/60 mt-2">
              {best.description}
            </p>
          )}

          <ul className="mt-3 space-y-1 text-xs text-black/60 dark:text-white/70 list-disc pl-5">
            {reasons.map((r, idx) => (
              <li key={idx}>{r}</li>
            ))}
            {isUpgrade && current && (
              <li>
                Current package: <span className="font-semibold">{current.title}</span>
              </li>
            )}
          </ul>
        </div>

        <div className="flex flex-col gap-2 md:items-end">
          {isUpgrade ? (
            <button
              onClick={() => {
                // Replace: remove current top-up, add best
                removePackage(current.package_id);
                addPackage(best);
              }}
              className="px-6 py-3 bg-[#38C2D9] text-black font-bold hover:bg-[#38C2D9]/90 transition whitespace-nowrap"
              type="button"
            >
              Upgrade (Replace)
            </button>
          ) : (
            <button
              onClick={() => addPackage(best)}
              className="px-6 py-3 bg-[#38C2D9] text-black font-bold hover:bg-[#38C2D9]/90 transition whitespace-nowrap"
              type="button"
            >
              Add Package
            </button>
          )}

          {current && !isUpgrade && (
            <p className="text-[11px] text-black/50 dark:text-white/50">
              You already have a similar package.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}