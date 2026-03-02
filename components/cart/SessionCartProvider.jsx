"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { X, ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Context for cart state
const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Supports both packages + experiences
  const getCartItemKey = (item) => {
    if (item.type === "package") return `package-${item.package_id}`;
    // experience
    return `exp-${item.experience_id}-${item.booking_type === "hourly" ? item.selected_hours : "fixed"}`;
  };

  // Merge duplicates safely (and compute hourly totals)
  const normalizeCartItems = (cartItems) => {
    const merged = new Map();

    (cartItems ?? []).forEach((raw) => {
      const item = {
        ...raw,
        // Default type to experience for backward-compat with old localStorage
        type: raw?.type ?? "experience",
        quantity: raw?.quantity ?? 1,
      };

      const key = getCartItemKey(item);
      const current = merged.get(key);

      // Compute total_price for hourly experiences
      if (item.type === "experience" && item.booking_type === "hourly") {
        item.total_price = (item.price ?? 0) * (item.selected_hours ?? 1);
      }

      if (!current) {
        merged.set(key, item);
        return;
      }

      // Merge quantities
      const newQty = (current.quantity ?? 1) + (item.quantity ?? 1);

      // Keep a sensible merged object
      const mergedItem = { ...current, quantity: newQty };

      // Recompute hourly total_price (per-item, not multiplied by quantity, matching your existing behavior)
      if (mergedItem.type === "experience" && mergedItem.booking_type === "hourly") {
        mergedItem.total_price = (mergedItem.price ?? 0) * (mergedItem.selected_hours ?? 1);
      }

      merged.set(key, mergedItem);
    });

    return Array.from(merged.values());
  };

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("pixoul-cart");
    if (stored) {
      try {
        setItems(normalizeCartItems(JSON.parse(stored)));
      } catch (e) {
        console.error("Failed to parse cart:", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever items change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("pixoul-cart", JSON.stringify(items));
    }
  }, [items, isLoaded]);

  // ----------------------------
  // Add experience (game)
  // ----------------------------
  function addExperience(exp, quantity = 1) {
    const normalized = { type: "experience", ...exp };

    setItems((prev) => {
      const existing = prev.find(
        (x) =>
          x.type === "experience" &&
          x.experience_id === normalized.experience_id &&
          x.selected_hours === normalized.selected_hours
      );

      if (existing) {
        return prev.map((x) =>
          x.type === "experience" &&
          x.experience_id === normalized.experience_id &&
          x.selected_hours === normalized.selected_hours
            ? { ...x, quantity: (x.quantity ?? 1) + quantity }
            : x
        );
      }

      return [...prev, { ...normalized, quantity }];
    });
  }

  // ----------------------------
  // Add package
  // ----------------------------
  function addPackage(pkg, quantity = 1) {
    const normalized = {
      type: "package",
      package_id: pkg.package_id,
      title: pkg.title,
      price: Number(pkg.price ?? 0),
      image_url: pkg.image_url ?? null,
      description: pkg.description ?? null,
      meta: pkg.meta ?? {},
    };

    setItems((prev) => {
      const existing = prev.find(
        (x) => x.type === "package" && x.package_id === normalized.package_id
      );

      if (existing) {
        return prev.map((x) =>
          x.type === "package" && x.package_id === normalized.package_id
            ? { ...x, quantity: (x.quantity ?? 1) + quantity }
            : x
        );
      }

      return [...prev, { ...normalized, quantity }];
    });
  }

  // Update quantity (experience OR package)
  function updateQuantity(id, quantity, selectedHours = null, type = "experience") {
    if (quantity < 1) return;

    setItems((prev) =>
      prev.map((item) => {
        if (type === "package") {
          return item.type === "package" && item.package_id === id ? { ...item, quantity } : item;
        }

        return item.type === "experience" &&
          item.experience_id === id &&
          (selectedHours === null || item.selected_hours === selectedHours)
          ? { ...item, quantity }
          : item;
      })
    );
  }

  // Update hours (hourly experiences only)
  function updateHours(id, currentHours, newHours) {
    if (newHours < 1) return;

    setItems((prev) => {
      const sourceItem = prev.find(
        (item) =>
          item.type === "experience" &&
          item.experience_id === id &&
          item.selected_hours === currentHours
      );

      if (!sourceItem) return prev;

      // If changing to a hours variant that already exists, merge quantities
      const targetExists = prev.some(
        (item) =>
          item.type === "experience" &&
          item.experience_id === id &&
          item.selected_hours === newHours
      );

      if (targetExists) {
        return prev
          .filter(
            (item) =>
              !(
                item.type === "experience" &&
                item.experience_id === id &&
                item.selected_hours === currentHours
              )
          )
          .map((item) =>
            item.type === "experience" &&
            item.experience_id === id &&
            item.selected_hours === newHours
              ? {
                  ...item,
                  quantity: (item.quantity ?? 1) + (sourceItem.quantity ?? 1),
                  total_price: (item.price ?? 0) * newHours,
                }
              : item
          );
      }

      // Otherwise update the existing item hours
      return prev.map((item) =>
        item.type === "experience" &&
        item.experience_id === id &&
        item.selected_hours === currentHours
          ? {
              ...item,
              selected_hours: newHours,
              total_price: (item.price ?? 0) * newHours,
            }
          : item
      );
    });
  }

  // Remove experience
  function removeExperience(id, selectedHours = null) {
    setItems((prev) =>
      prev.filter(
        (x) =>
          !(
            x.type === "experience" &&
            x.experience_id === id &&
            (selectedHours === null || x.selected_hours === selectedHours)
          )
      )
    );
  }

  // Remove package
  function removePackage(packageId) {
    setItems((prev) => prev.filter((x) => !(x.type === "package" && x.package_id === packageId)));
  }

  // Clear cart
  function clearCart() {
    setItems([]);
  }

  // Totals
  const total = items.reduce((sum, item) => {
    if (item.type === "package") {
      return sum + (Number(item.price ?? 0) * (item.quantity ?? 1));
    }
    // experience
    if (item.booking_type === "hourly") return sum + (Number(item.total_price ?? 0));
    return sum + (Number(item.price ?? 0) * (item.quantity ?? 1));
  }, 0);

  const itemCount = items.reduce((sum, item) => sum + (item.quantity ?? 1), 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addExperience,
        addPackage,
        removeExperience,
        removePackage,
        updateQuantity,
        updateHours,
        clearCart,
        total,
        itemCount,
        isOpen,
        setIsOpen,
      }}
    >
      {children}

      {/* Cart Sidebar UI (included in provider) */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={() => setIsOpen(false)}
          />

          {/* Sidebar */}
          <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-black border-l border-[#38C2D9] flex flex-col z-50 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#38C2D9]">
              <div>
                <h2 className="text-2xl font-bold">Your Cart</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {itemCount} {itemCount === 1 ? "item" : "items"}
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-none"
                type="button"
              >
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingCart size={64} className="text-gray-300 dark:text-gray-700 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">
                    Start adding experiences or packages!
                  </p>
                  <Link
                    href="/experience/vr"
                    onClick={() => setIsOpen(false)}
                    className="px-6 py-3 bg-[#38C2D9] text-black font-semibold hover:bg-[#2da3bd]"
                  >
                    Browse Experiences
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={getCartItemKey(item)}
                    className="border border-gray-200 dark:border-gray-800 rounded-none p-4"
                  >
                    <div className="flex gap-4">
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
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h3 className="font-bold text-lg">{item.title}</h3>

                            {item.type === "package" ? (
                              <p className="text-xs text-gray-500 mt-1">Package</p>
                            ) : (
                              <p className="text-xs text-gray-500 mt-1">
                                {item.booking_type === "hourly"
                                  ? `Hours: ${item.selected_hours}`
                                  : item.duration_minutes != null
                                  ? `Duration: ${item.duration_minutes} min`
                                  : null}
                              </p>
                            )}
                          </div>

                          <button
                            onClick={() => {
                              if (item.type === "package") removePackage(item.package_id);
                              else removeExperience(item.experience_id, item.selected_hours);
                            }}
                            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950 rounded ml-2"
                            type="button"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>

                        {/* Controls + Price */}
                        <div className="flex items-center justify-between mt-3">
                          {item.type === "package" ? (
                            <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded">
                              <button
                                onClick={() => updateQuantity(item.package_id, (item.quantity ?? 1) - 1, null, "package")}
                                disabled={(item.quantity ?? 1) <= 1}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 disabled:opacity-40 disabled:cursor-not-allowed"
                                type="button"
                              >
                                <Minus size={16} />
                              </button>
                              <span className="px-3 font-semibold">{item.quantity ?? 1}</span>
                              <button
                                onClick={() => updateQuantity(item.package_id, (item.quantity ?? 1) + 1, null, "package")}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900"
                                type="button"
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                          ) : item.booking_type === "hourly" ? (
                            <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded">
                              <button
                                onClick={() =>
                                  updateHours(item.experience_id, item.selected_hours, item.selected_hours - 1)
                                }
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 disabled:opacity-40 disabled:cursor-not-allowed"
                                disabled={item.selected_hours <= (item.min_hours ?? 1)}
                                type="button"
                              >
                                <Minus size={16} />
                              </button>
                              <span className="px-3 font-semibold">{item.selected_hours}</span>
                              <button
                                onClick={() =>
                                  updateHours(item.experience_id, item.selected_hours, item.selected_hours + 1)
                                }
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 disabled:opacity-40 disabled:cursor-not-allowed"
                                disabled={item.max_hours != null && item.selected_hours >= item.max_hours}
                                type="button"
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded">
                              <button
                                onClick={() => updateQuantity(item.experience_id, (item.quantity ?? 1) - 1, item.selected_hours ?? null, "experience")}
                                disabled={(item.quantity ?? 1) <= 1}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 disabled:opacity-40 disabled:cursor-not-allowed"
                                type="button"
                              >
                                <Minus size={16} />
                              </button>
                              <span className="px-3 font-semibold">{item.quantity ?? 1}</span>
                              <button
                                onClick={() => updateQuantity(item.experience_id, (item.quantity ?? 1) + 1, item.selected_hours ?? null, "experience")}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900"
                                type="button"
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                          )}

                          <div className="text-right">
                            <p className="text-lg font-bold">
                              AED{" "}
                              {item.type === "package"
                                ? Number(item.price ?? 0) * (item.quantity ?? 1)
                                : item.booking_type === "hourly"
                                ? Number(item.total_price ?? 0)
                                : Number(item.price ?? 0) * (item.quantity ?? 1)}
                            </p>

                            {item.type === "package" && (item.quantity ?? 1) > 1 && (
                              <p className="text-xs text-gray-500">AED {Number(item.price ?? 0)} each</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-[#38C2D9] bg-gray-50 dark:bg-gray-900/50 p-6 space-y-4">
                <div className="flex justify-between items-center text-xl font-bold">
                  <span>Total</span>
                  <span className="text-[#38C2D9]">AED {total}</span>
                </div>
                <Link
                  href="/checkout"
                  onClick={() => setIsOpen(false)}
                  className="block w-full bg-[#38C2D9] text-black text-center py-4 font-bold hover:bg-[#2da3bd]"
                >
                  Proceed to Checkout
                </Link>
                <button
                  onClick={() => {
                    if (confirm("Clear cart?")) clearCart();
                  }}
                  className="block w-full border-2 border-red-500 text-red-500 text-center py-3 font-semibold hover:bg-red-500 hover:text-white"
                  type="button"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </CartContext.Provider>
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

// Cart Button (use in Navbar)
export function CartButton() {
  const { itemCount, setIsOpen } = useCart();

  return (
    <button
      onClick={() => setIsOpen(true)}
      className="relative p-2 border border-[#38C2D9] text-[#38C2D9] hover:bg-[#38C2D9] hover:text-black transition"
      type="button"
    >
      <ShoppingCart size={20} />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-[#38C2D9] text-black text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
          {itemCount}
        </span>
      )}
    </button>
  );
}

// Hook to use cart
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}