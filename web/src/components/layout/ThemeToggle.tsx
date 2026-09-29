"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "@/lib/theme-context";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Enabled theme toggle
  const ENABLE_THEME_TOGGLE = true;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!ENABLE_THEME_TOGGLE) {
    return null;
  }

  if (!mounted) {
    return (
      <div className={`w-9 h-9 rounded-xl bg-slate-900/50 border border-slate-800 ${className}`} />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`relative p-2 rounded-xl transition-all duration-200 border flex items-center justify-center ${
        isDark
          ? "bg-slate-900 hover:bg-slate-800 text-amber-300 border-slate-800 hover:border-slate-700 shadow-md shadow-slate-950/50"
          : "bg-white hover:bg-slate-100 text-sky-600 border-slate-200 hover:border-slate-300 shadow-md shadow-slate-200/50"
      } ${className}`}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ scale: 0.6, rotate: -90, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0.6, rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Moon className="w-4 h-4 fill-current text-amber-300" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ scale: 0.6, rotate: 90, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0.6, rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Sun className="w-4 h-4 fill-current text-amber-500" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
