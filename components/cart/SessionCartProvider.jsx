"use client";

import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function SessionCartProvider({ children }) {
  const [items, setItems] = useState([]);

  // Add experience (prevent duplicates)
  function addExperience(exp) {
    setItems((prev) => {
      if (prev.some((x) => x.experience_id === exp.experience_id)) {
        return prev;
      }
      return [...prev, exp];
    });
  }

  // Remove experience
  function removeExperience(id) {
    setItems((prev) => prev.filter((x) => x.experience_id !== id));
  }

  return (
    <CartContext.Provider value={{ items, addExperience, removeExperience }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
