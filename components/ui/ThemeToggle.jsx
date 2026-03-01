"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
 const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="p-2 w-[42px] h-[42px]" />; // Placeholder to prevent layout shift
  }

  const isDark = resolvedTheme === "dark";

  const handleToggle = () => {
    const next = isDark ? "light" : "dark";
    setTheme(next);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="
      px-4 py-2 
      border 
      border-gray-300 
      dark:border-gray-700 rounded 
      bg-white/60 
      dark:bg-black/60
      hover:bg-gray-100 
      dark:hover:bg-gray-800"
      aria-label="Toggle theme"
    >
      {isDark ? <Moon  size={18} /> : <Sun size={18} />}
    </button>
  );
}