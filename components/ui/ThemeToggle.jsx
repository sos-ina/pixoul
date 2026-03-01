"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
 const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="w-9 h-9 shrink-0" aria-hidden="true" />; // Placeholder to prevent layout shift
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
      className="p-2 border border-gray-300 dark:border-gray-700 rounded bg-white/60 dark:bg-black/60 hover:bg-gray-100 dark:hover:bg-gray-800 shrink-0"
      aria-label="Toggle theme"
    >
      {isDark ? <Moon size={16} /> : <Sun size={16} />}
    </button>
  );
}