"use client";

import React, { useMemo, useState } from "react";
import { useCart } from "@/components/cart/SessionCartProvider";
import { Check, ShoppingCart } from "lucide-react";

function slugify(str) {
  return String(str || "")
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function MissionBundlesPage() {
  const { addPackage, items } = useCart();
  const [justAddedId, setJustAddedId] = useState(null);

  // All packages from the HTML file (extracted)
  const packages = useMemo(
    () => [
      {
        title: "Recharge 200 AED",
        price: 200,
        description: "Card Charge AED 5 will be added for New card purchase",
      },
      {
        title: "Gamer's Choice + FREE 3 VR Experiences 300 AED",
        price: 300,
        description: "Card Charge AED 5 will be added for New card purchase",
      },
      {
        title: "Pro-Gamer Fuel + FREE 5 VR Experiences 500 AED",
        price: 500,
        description: "Card Charge AED 5 will be added for New card purchase",
      },
      {
        title: "Starter Pack 100 AED",
        price: 100,
        description: "Card Charge AED 5 will be added for New card purchase",
      },
      {
        title: "Elite Bundle + FREE 7 VR Experiences 700 AED",
        price: 700,
        description: "Card Charge AED 5 will be added for New card purchase",
      },
      {
        title: "The Ulitimate + FREE 10 VR Experiences 1000 AED",
        price: 1000,
        description: "Card Charge AED 5 will be added for New card purchase",
      },
      {
        title: "Formula Racing - Discovery- 08Min.",
        price: 50,
        description: "30MIN Session easy track and car + video tutorial and support",
      },
      {
        title: "Formula Racing - Beginner - 30 Min.",
        price: 150,
        description: "30MIN Session easy track and car + video tutorial and support",
      },
      {
        title: "Formula Racing - Group Racing - 1Hr",
        price: 200,
        description: "60MIN Session Min 4Pax, Practice/Qualifying/Race",
      },
      {
        title: "Formula Racing - Race Session - 1Hr",
        price: 225,
        description: "60MIN Session Choose track and car, Practice/Qualifying/Race",
      },
      {
        title: "3 VR Game Play",
        price: 95,
        description: "Card Charge AED 5 will be added for New card purchase",
      },
    ],
    []
  );

  const packagesWithIds = packages.map((p) => ({
    ...p,
    package_id: slugify(p.title),
    accent: "#38C2D9",
    popular:
      p.title.toLowerCase().includes("ultimate") ||
      p.title.toLowerCase().includes("ulitimate"),
  }));

  const getQtyInCart = (packageId) => {
    const item = items.find((x) => x.type === "package" && x.package_id === packageId);
    return item?.quantity ?? 0;
  };

  const handleAdd = (pkg) => {
    addPackage({
      package_id: pkg.package_id,
      title: pkg.title,
      price: pkg.price,
      description: pkg.description,
      // Optional image_url if you have one later
      image_url: null,
      meta: {},
    });

    setJustAddedId(pkg.package_id);
    setTimeout(() => setJustAddedId(null), 1500);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-black dark:text-white pt-28 px-6 pb-24">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase">
            Pixoul <span className="text-[#38C2D9]">Packages</span>
          </h1>
          <p className="text-black/60 dark:text-white/70 font-bold uppercase tracking-[0.3em] text-xs">
            Add packages & racing sessions to your cart
          </p>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {packagesWithIds.map((pkg) => {
            const qty = getQtyInCart(pkg.package_id);
            const isJustAdded = justAddedId === pkg.package_id;

            return (
              <div
                key={pkg.package_id}
                className="relative transition-all duration-500 border border-black/10 dark:border-white/10 group hover:-translate-y-3 hover:ring-2 hover:ring-[#ffffff] hover:ring-offset-0 hover:shadow-[0_0_10px_#38C2D9]"
              >
                <div
                  className="relative bg-white dark:bg-[#111] p-8 h-full border-b-4 transition-all"
                  style={{
                    borderBottomColor: pkg.accent,
                    clipPath: "polygon(0 0, 100% 0, 100% 90%, 85% 100%, 0 100%)",
                  }}
                >
                  {pkg.popular && (
                    <span className="absolute -top-0 left-1/2 -translate-x-1/2 bg-[#38C2D9] text-white text-[9px] font-black uppercase px-2 py-1 rounded-b-full tracking-widest z-10">
                      Featured
                    </span>
                  )}

                  <div className="flex flex-col justify-between h-full">
                    <div>
                      <h3 className="mb-3 text-xl font-black leading-tight uppercase">
                        {pkg.title}
                      </h3>

                      {pkg.description && (
                        <p className="text-[11px] text-black/60 dark:text-white/60 font-semibold leading-relaxed">
                          {pkg.description}
                        </p>
                      )}
                    </div>

                    <div className="mt-10">
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-sm italic font-bold text-black/50 dark:text-white/50">
                          AED
                        </span>
                        <span className="text-5xl italic font-black">{pkg.price}</span>
                      </div>

                      {isJustAdded ? (
                        <button
                          disabled
                          className="w-full py-4 font-black uppercase text-[10px] tracking-widest italic transition-all border border-black/10 dark:border-white/10 bg-[#38C2D9]/90 text-white flex items-center justify-center gap-2"
                          type="button"
                        >
                          <Check size={16} />
                          Added
                        </button>
                      ) : (
                        <button
                          onClick={() => handleAdd(pkg)}
                          className="w-full py-4 font-black uppercase text-[10px] tracking-widest italic transition-all border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-white hover:text-black flex items-center justify-center gap-2"
                          type="button"
                        >
                          <ShoppingCart size={16} />
                          {qty > 0 ? `Add Another (${qty})` : "Add to Cart"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Background Glow */}
                <div
                  className="absolute inset-0 transition-all duration-500 opacity-0 group-hover:opacity-10 blur-3xl -z-10"
                  style={{ backgroundColor: pkg.accent }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}