"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
 const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  /* Sync class to <html> so Tailwind dark: works (next-themes does this too; ensure it sticks) */
  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    const isDark = resolvedTheme === "dark";
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [mounted, resolvedTheme]);

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
      className="p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-black hover:bg-gray-100 dark:hover:bg-gray-800"
      aria-label="Toggle theme"
    >
      {isDark ? <Moon  size={18} /> : <Sun size={18} />}
    </button>
  );
}