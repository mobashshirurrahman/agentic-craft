"use client";

import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import {
  Flame,
  Award,
  LogOut,
  User,
  ChevronDown,
  Sparkles,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function UserProfileButton() {
  const {
    user,
    isAuthenticated,
    streak,
    certificates,
    setAuthModalOpen,
    setCertificateModalData,
    logout,
  } = useAuth();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!isAuthenticated || !user) {
    return (
      <button
        onClick={() => setAuthModalOpen(true)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-teal-500/10 via-emerald-500/10 to-teal-500/10 hover:from-teal-500/20 hover:to-emerald-500/20 border border-teal-500/30 text-teal-700 dark:text-teal-300 font-mono text-xs font-semibold transition cursor-pointer shadow-xs"
        title="Sign in to track streaks and claim certificates"
      >
        <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
        <span>Sign In</span>
      </button>
    );
  }

  // Get Initials
  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "AC";

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Streak Day Count Badge */}
        <div
          className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-gradient-to-r from-amber-500/15 to-orange-500/15 border border-amber-500/40 text-amber-700 dark:text-amber-400 font-mono text-xs font-bold shadow-xs select-none"
          title={`Daily Study Streak: ${streak.count} consecutive ${streak.count === 1 ? "day" : "days"}`}
        >
          <span className="text-sm animate-pulse">🔥</span>
          <span>{streak.count} {streak.count === 1 ? "Day" : "Days"}</span>
        </div>

        {/* Profile Avatar Button */}
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-1.5 p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 transition cursor-pointer"
          aria-label="User profile and certificates"
        >
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-7 h-7 rounded-lg object-cover border border-teal-500/30"
            />
          ) : (
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 text-white font-bold font-mono text-xs flex items-center justify-center shadow-xs">
              {initials}
            </div>
          )}
          <ChevronDown className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 hidden sm:block" />
        </button>
      </div>

      {/* Profile Dropdown Menu */}
      <AnimatePresence>
        {dropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-2xl p-4 z-50 text-slate-800 dark:text-slate-200"
          >
            {/* User Identity */}
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-850">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white font-bold font-mono text-sm flex items-center justify-center shadow-sm shrink-0">
                {initials}
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                  {user.name}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono truncate">
                  {user.email}
                </p>
              </div>
            </div>

            {/* Streak & Activity Card */}
            <div className="my-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🔥</span>
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">
                    {streak.count}-Day Learning Streak
                  </span>
                  <span className="text-[10px] text-amber-700 dark:text-amber-400 font-mono">
                    Longest: {streak.longestStreak} days
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-700 dark:text-amber-300">
                Active
              </span>
            </div>

            {/* Certificates List */}
            <div className="space-y-2 py-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1 font-semibold">
                  <Award className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                  My Certificates ({certificates.length})
                </span>
              </div>

              {certificates.length === 0 ? (
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 text-center">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    No certificates claimed yet.
                  </p>
                  <p className="text-[11px] text-teal-600 dark:text-teal-400 font-mono mt-1">
                    Finish Level 1 (Module 1.13) to earn your first badge!
                  </p>
                </div>
              ) : (
                <div className="max-h-40 overflow-y-auto space-y-1.5 pr-1">
                  {certificates.map((cert) => (
                    <button
                      key={cert.id}
                      onClick={() => {
                        setCertificateModalData(cert);
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left p-2 rounded-lg bg-slate-50 dark:bg-slate-900 hover:bg-teal-50 dark:hover:bg-teal-950/40 border border-slate-200 dark:border-slate-800 hover:border-teal-500/40 transition flex items-center justify-between group cursor-pointer"
                    >
                      <div className="min-w-0 pr-2">
                        <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 block truncate group-hover:text-teal-600 dark:group-hover:text-teal-300">
                          {cert.type === "master" ? "🏆 Master Diploma" : `Level ${cert.levelNumber} Specialist`}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500 truncate block">
                          ID: {cert.verificationCode}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-teal-600 dark:text-teal-400 group-hover:underline shrink-0">
                        View
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Logout CTA */}
            <div className="pt-2 mt-2 border-t border-slate-100 dark:border-slate-850">
              <button
                onClick={async () => {
                  setDropdownOpen(false);
                  await logout();
                }}
                className="w-full py-1.5 px-2.5 rounded-lg hover:bg-rose-500/10 text-rose-600 dark:text-rose-400 font-mono text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
