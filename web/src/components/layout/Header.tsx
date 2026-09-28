"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useProgress } from "@/lib/store";
import { getAllModules } from "@/lib/curriculum-data";
import ThemeToggle from "./ThemeToggle";
import ViewCounter from "./ViewCounter";
import {
  Bot,
  Compass,
  Layers,
  Sparkles,
  BookOpen,
  Menu,
  X,
  CheckCircle,
  Search,
} from "lucide-react";

export default function Header() {
  const { progress } = useProgress();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalModules = getAllModules().length;
  const completedCount = progress.completedModules.length;
  const percentage = Math.round((completedCount / totalModules) * 100);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800/80 bg-white/85 dark:bg-slate-950/85 backdrop-blur-xl transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 via-sky-500 to-indigo-600 p-[1px] shadow-md shadow-teal-500/10 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-white dark:bg-slate-950 rounded-[11px] flex items-center justify-center">
              <Bot className="w-5 h-5 text-teal-600 dark:text-teal-400 group-hover:text-teal-500 transition-colors" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">
              Agentic<span className="text-teal-600 dark:text-teal-400 font-mono">Craft</span>
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 -mt-1 font-mono tracking-wider">
              ACADEMY • 59 MODULES
            </span>
          </div>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-300">
          <Link
            href="/#curriculum"
            className="px-3.5 py-2 rounded-lg hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 transition flex items-center gap-1.5"
          >
            <Compass className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            Curriculum
          </Link>

          <Link
            href="/#simulator"
            className="px-3.5 py-2 rounded-lg hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 transition flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-violet-500 dark:text-violet-400" />
            Interactive Loop
          </Link>

          <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-800 mx-2" />

          {/* Quick Level links */}
          <Link
            href="/learn/level-1/module-1-1"
            className="px-2.5 py-1.5 rounded-md text-xs font-mono text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/20 transition"
          >
            Level 1
          </Link>
          <Link
            href="/learn/level-2/module-2-1"
            className="px-2.5 py-1.5 rounded-md text-xs font-mono text-sky-700 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-500/10 border border-sky-300 dark:border-sky-500/20 transition"
          >
            Level 2
          </Link>
          <Link
            href="/learn/level-3/module-3-1"
            className="px-2.5 py-1.5 rounded-md text-xs font-mono text-violet-700 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-500/10 border border-violet-300 dark:border-violet-500/20 transition"
          >
            Level 3
          </Link>
          <Link
            href="/learn/level-4/module-4-1"
            className="px-2.5 py-1.5 rounded-md text-xs font-mono text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-500/10 border border-amber-300 dark:border-amber-500/20 transition"
          >
            Level 4
          </Link>
        </nav>

        {/* Right Action Area */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Live Global Visit / View Counter */}
          <ViewCounter />

          {/* Overall Progress Badge */}
          <div className="hidden sm:flex items-center">
            <Link
              href="/learn/level-1/module-1-1"
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition group"
            >
              <div className="flex flex-col text-right">
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  Progress: <strong className="text-slate-900 dark:text-white">{completedCount}/{totalModules}</strong>
                </span>
                <div className="w-20 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden mt-1">
                  <div
                    className="h-full bg-gradient-to-r from-teal-500 to-sky-500 transition-all duration-500"
                    style={{ width: `${Math.max(percentage, 2)}%` }}
                  />
                </div>
              </div>
              <div className="w-7 h-7 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-700 dark:text-teal-400 text-xs font-bold font-mono">
                {percentage}%
              </div>
            </Link>
          </div>

          {/* Theme Toggle Button */}
          <ThemeToggle />

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 pt-3 pb-6 space-y-3">
          <Link
            href="/#curriculum"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
          >
            Curriculum Roadmap (59 Modules)
          </Link>
          <Link
            href="/#simulator"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
          >
            Interactive Loop Simulator
          </Link>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono">
            <span className="text-slate-600 dark:text-slate-400">Theme Preference:</span>
            <ThemeToggle />
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80">
            <Link
              href="/learn/level-1/module-1-1"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-mono text-center"
            >
              Level 1 (Foundations)
            </Link>
            <Link
              href="/learn/level-2/module-2-1"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-300 text-xs font-mono text-center"
            >
              Level 2 (Implementation)
            </Link>
            <Link
              href="/learn/level-3/module-3-1"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-mono text-center"
            >
              Level 3 (Advanced Patterns)
            </Link>
            <Link
              href="/learn/level-4/module-4-1"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-mono text-center"
            >
              Level 4 (Production Scaling)
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
