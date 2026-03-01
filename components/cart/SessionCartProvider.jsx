"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { X, ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Context for cart state
const CartContext = createContext();

// Provider + Sidebar in one component
export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const getCartItemKey = (item) =>
    `${item.experience_id}-${item.booking_type === "hourly" ? item.selected_hours : "fixed"}`;

  const normalizeCartItems = (cartItems) => {
    const merged = new Map();

    cartItems.forEach((item) => {
      const key = getCartItemKey(item);
      const current = merged.get(key);

      if (!current) {
        merged.set(key, {
          ...item,
          quantity: item.quantity ?? 1,
          total_price:
            item.booking_type === "hourly"
              ? (item.price ?? 0) * (item.selected_hours ?? 1)
              : item.total_price,
        });
        return;
      }

      const quantity = (current.quantity ?? 1) + (item.quantity ?? 1);
      merged.set(key, {
        ...current,
        quantity,
        total_price:
          current.booking_type === "hourly"
            ? (current.price ?? 0) * (current.selected_hours ?? 1)
            : current.total_price,
      });
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

  // Add experience
  function addExperience(exp, quantity = 1) {
    setItems((prev) => {
      const existing = prev.find(
  (x) =>
    x.experience_id === exp.experience_id &&
    x.selected_hours === exp.selected_hours
);
      if (existing) {
        return prev.map((x) =>
          x.experience_id === exp.experience_id &&
          x.selected_hours === exp.selected_hours
            ? { ...x, quantity: x.quantity + quantity }
            : x
        );
      }
      return [...prev, { ...exp, quantity }];
    });
  }

  // Update quantity
  function updateQuantity(id, quantity, selectedHours = null) {
    if (quantity < 1) return;
    setItems((prev) =>
      prev.map((item) =>
        item.experience_id === id &&
        (selectedHours === null || item.selected_hours === selectedHours)
          ? { ...item, quantity }
          : item
      )
    );
  }

  // Update hours for hourly bookings
  function updateHours(id, currentHours, newHours) {
    if (newHours < 1) return;
    if (currentHours === newHours) return;

    setItems((prev) => {
      const sourceItem = prev.find(
        (item) => item.experience_id === id && item.selected_hours === currentHours
      );

      if (!sourceItem) return prev;

      const targetItem = prev.find(
        (item) => item.experience_id === id && item.selected_hours === newHours
      );

      if (targetItem) {
        return prev
          .filter(
            (item) =>
              !(item.experience_id === id && item.selected_hours === currentHours)
          )
          .map((item) =>
            item.experience_id === id && item.selected_hours === newHours
              ? {
                  ...item,
                  quantity: item.quantity + sourceItem.quantity,
                  total_price: item.price * newHours,
                }
              : item
          );
      }

      return prev.map((item) =>
        item.experience_id === id && item.selected_hours === currentHours
          ? {
              ...item,
              selected_hours: newHours,
              total_price: item.price * newHours,
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
            x.experience_id === id &&
            (selectedHours === null || x.selected_hours === selectedHours)
          )
      )
    );
  }

  // Clear cart
  function clearCart() {
    setItems([]);
  }

  // Calculate totals
 const total = items.reduce((sum, item) => {
  if (item.booking_type === "hourly") {
    return sum + item.total_price;
  }
  return sum + item.price * item.quantity;
}, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addExperience,
        removeExperience,
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
                  {itemCount} {itemCount === 1 ? "experience" : "experiences"}
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-none"
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
                    Start adding experiences!
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
                      <div className="relative w-24 h-24 flex-shrink-0 bg-gray-100 dark:bg-gray-900 rounded overflow-hidden">
                        <Image
                          src={item.image_url}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h3 className="font-bold text-lg">{item.title}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="px-2 py-0.5 text-xs font-semibold bg-[#38C2D9]/10 text-[#38C2D9] rounded uppercase">
                                {item.category_name}
                              </span>
                              <span className="text-xs text-gray-500">{item.genre}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => removeExperience(item.experience_id, item.selected_hours)}
                            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950 rounded ml-2"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>

                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                            {item.booking_type === "hourly" ? (
                              <>Hours: {item.selected_hours}</>
                            ) : (
                              <>Duration: {item.duration_minutes} minutes</>
                            )}
                        </p>

                        <div className="flex items-center justify-between">
                          {/* Quantity */}
                          <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded">
                            <button
                              onClick={() => updateQuantity(item.experience_id, item.quantity - 1, item.selected_hours ?? null)}
                              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="px-3 font-semibold">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.experience_id, item.quantity + 1, item.selected_hours ?? null)}
                              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900"
                            >
                              <Plus size={16} />
                            </button>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                           <p className="text-lg font-bold">
                                  AED {
                                    item.booking_type === "hourly"
                                      ? item.total_price
                                      : item.price * item.quantity
                                  }
                                </p>
                            {item.quantity > 1 && (
                              <p className="text-xs text-gray-500">AED {item.price} each</p>
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

// Cart Button (use in Navbar)
export function CartButton() {
  const { itemCount, setIsOpen } = useCart();

  return (
    <button
      onClick={() => setIsOpen(true)}
      className="relative p-2 border border-[#38C2D9] text-[#38C2D9] hover:bg-[#38C2D9] hover:text-black transition"
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