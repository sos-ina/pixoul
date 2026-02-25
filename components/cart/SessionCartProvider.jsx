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

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("pixoul-cart");
    if (stored) {
      try {
        setItems(JSON.parse(stored));
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
      const existing = prev.find((x) => x.experience_id === exp.experience_id);
      if (existing) {
        return prev.map((x) =>
          x.experience_id === exp.experience_id
            ? { ...x, quantity: x.quantity + quantity }
            : x
        );
      }
      return [...prev, { ...exp, quantity }];
    });
  }

  // Update quantity
  function updateQuantity(id, quantity) {
    if (quantity <= 0) {
      removeExperience(id);
      return;
    }
    setItems((prev) =>
      prev.map((x) => (x.experience_id === id ? { ...x, quantity } : x))
    );
  }

  // Remove experience
  function removeExperience(id) {
    setItems((prev) => prev.filter((x) => x.experience_id !== id));
  }

  // Clear cart
  function clearCart() {
    setItems([]);
  }

  // Calculate totals
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addExperience,
        removeExperience,
        updateQuantity,
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
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg"
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
                    key={item.experience_id}
                    className="border border-gray-200 dark:border-gray-800 rounded-lg p-4"
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
                            onClick={() => removeExperience(item.experience_id)}
                            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950 rounded ml-2"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>

                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          Duration: {item.duration_minutes} minutes
                        </p>

                        <div className="flex items-center justify-between">
                          {/* Quantity */}
                          <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded">
                            <button
                              onClick={() => updateQuantity(item.experience_id, item.quantity - 1)}
                              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="px-3 font-semibold">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.experience_id, item.quantity + 1)}
                              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900"
                            >
                              <Plus size={16} />
                            </button>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <p className="text-lg font-bold">AED {item.price * item.quantity}</p>
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