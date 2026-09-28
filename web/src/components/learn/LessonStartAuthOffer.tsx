"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  Flame,
  Sparkles,
  CheckCircle2,
  X,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  Laptop,
  Check,
} from "lucide-react";

import { useAuth } from "@/lib/auth-context";

interface LessonStartAuthOfferProps {
  moduleTitle: string;
}

export default function LessonStartAuthOffer({ moduleTitle }: LessonStartAuthOfferProps) {
  const { isAuthenticated, setAuthModalOpen } = useAuth();
  const [isDismissed, setIsDismissed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [learnerName, setLearnerName] = useState("Your Name");
  const [activeTab, setActiveTab] = useState<"certificate" | "streak">("certificate");

  useEffect(() => {
    const dismissed = sessionStorage.getItem("agentic_offer_dismissed");
    if (dismissed === "true") {
      setIsDismissed(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    sessionStorage.setItem("agentic_offer_dismissed", "true");
  };

  // If already authenticated or dismissed for session, do not show the banner
  if (isAuthenticated || isDismissed) {
    return null;
  }


  return (
    <>
      {/* Non-intrusive, High-Value Offer Banner at Lesson Start */}
      <div className="relative overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-slate-900/90 to-teal-500/10 p-4 sm:p-5 shadow-lg shadow-black/20 my-6 transition-all">
        {/* Subtle decorative glow */}
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/40 flex items-center justify-center shrink-0 shadow-inner">
              <Award className="w-5 h-5 text-amber-400 animate-pulse" />
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  🎁 Free Learner Perk
                </span>
                <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
                  • Zero Cost • 100% Crawlable
                </span>
              </div>

              <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
                Unlock Verified Certificate & Daily Streak Tracker
              </h4>

              <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
                Ready to master <strong className="text-teal-300">{moduleTitle}</strong>? Enable cloud sync to record your daily streak 🔥 and earn your <strong>Informational Completion Badge</strong> for your study milestones.
              </p>

              {/* Feature Pills */}
              <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1 text-amber-300">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  Day 1 Streak Active
                </span>
                <span className="flex items-center gap-1 text-teal-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                  Free Completion Badge
                </span>
                <span className="flex items-center gap-1 text-sky-300">
                  <Laptop className="w-3.5 h-3.5 text-sky-400" />
                  Sync Laptop & Phone
                </span>
              </div>

            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5 shrink-0 self-end md:self-center">
            <button
              onClick={() => setModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs font-mono flex items-center gap-2 shadow-md shadow-amber-500/20 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <span>Preview Free Certificate</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleDismiss}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-800/60 transition"
              title="Dismiss for this session"
              aria-label="Dismiss banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Certificate & Streak Preview Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-2xl bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden text-slate-200"
            >
              {/* Close Button */}
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-2.5 mb-2">
                <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  <Sparkles className="w-4 h-4" />
                </span>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                  Free Student Recognition
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Your AgenticCraft Credentials & Streak
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Learn without paywalls. Sign up to save your daily streak across devices and claim your verifiable certificate upon finishing all 4 levels.
              </p>

              {/* Tab Selector */}
              <div className="flex items-center gap-2 mt-5 p-1 bg-slate-900/80 border border-slate-800 rounded-xl text-xs font-mono">
                <button
                  onClick={() => setActiveTab("certificate")}
                  className={`flex-1 py-2 rounded-lg font-bold flex items-center justify-center gap-2 transition ${
                    activeTab === "certificate"
                      ? "bg-slate-800 text-amber-300 shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Award className="w-4 h-4" />
                  <span>Certificate Preview</span>
                </button>
                <button
                  onClick={() => setActiveTab("streak")}
                  className={`flex-1 py-2 rounded-lg font-bold flex items-center justify-center gap-2 transition ${
                    activeTab === "streak"
                      ? "bg-slate-800 text-orange-400 shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Flame className="w-4 h-4" />
                  <span>Streak Tracker</span>
                </button>
              </div>

              {/* Tab 1: Certificate Preview */}
              {activeTab === "certificate" && (
                <div className="mt-5 space-y-4">
                  {/* Name Customizer Input */}
                  <div className="flex items-center gap-2">
                    <label className="text-xs font-mono text-slate-400 shrink-0">
                      Customize Name:
                    </label>
                    <input
                      type="text"
                      value={learnerName}
                      onChange={(e) => setLearnerName(e.target.value)}
                      placeholder="Enter your full name"
                      className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>

                  {/* Visual Certificate Card */}
                  <div className="relative rounded-2xl border-2 border-amber-500/40 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 p-6 sm:p-8 text-center space-y-3 shadow-xl overflow-hidden">
                    <div className="absolute top-2 left-2 text-[10px] font-mono text-amber-400/60 uppercase tracking-widest">
                      AgenticCraft Academy • Informational Badge
                    </div>


                    <div className="w-12 h-12 mx-auto rounded-full bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-300 shadow-md">
                      <Award className="w-6 h-6" />
                    </div>

                    <h5 className="text-xs font-mono tracking-widest text-amber-300/90 uppercase">
                      Informational Certificate of Completion
                    </h5>

                    <h4 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-wide">
                      {learnerName || "Your Name"}
                    </h4>

                    <p className="text-[11px] text-slate-400 max-w-md mx-auto leading-relaxed">
                      Completed all foundational lessons in <strong>Agentic AI Architecture</strong>, <strong>Autonomous ReAct Loops</strong>, <strong>LangGraph Multi-Agent Workflows</strong>, and <strong>Model Context Protocol (MCP)</strong>.
                    </p>

                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-500">
                      <span>Curriculum Modules Completed</span>
                      <span className="text-teal-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Informational Study Token
                      </span>
                    </div>
                  </div>

                </div>
              )}

              {/* Tab 2: Streak Tracker Preview */}
              {activeTab === "streak" && (
                <div className="mt-5 space-y-4">
                  <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/30 flex items-center justify-center font-bold">
                          🔥
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white">Daily Learning Streak</h4>
                          <p className="text-xs text-slate-400">Complete 1 topic per day to keep your flame burning</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xl font-extrabold text-orange-400 font-mono">1 Day</span>
                        <span className="text-[10px] text-slate-500 block font-mono">Current Streak</span>
                      </div>
                    </div>

                    {/* 7-Day Visual Tracker */}
                    <div className="grid grid-cols-7 gap-2 pt-2">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, idx) => (
                        <div
                          key={day}
                          className={`p-2.5 rounded-xl border text-center font-mono ${
                            idx === 0
                              ? "bg-orange-500/20 border-orange-500/50 text-orange-300"
                              : "bg-slate-950 border-slate-800 text-slate-600"
                          }`}
                        >
                          <span className="text-[10px] block">{day}</span>
                          <span className="text-xs font-bold block mt-1">
                            {idx === 0 ? "🔥" : "○"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed text-center">
                    💡 Learners with a 7-day streak complete the curriculum 4.8x faster and retain 80% more Python code patterns.
                  </p>
                </div>
              )}

              {/* Quick Free Sign In / Sign Up Trigger */}
              <div className="mt-6 pt-5 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-slate-400 font-mono">
                  100% Free Forever • No Credit Card
                </span>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      setModalOpen(false);
                      setAuthModalOpen(true);
                    }}
                    className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold text-xs font-mono flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20 transition-all cursor-pointer"
                  >
                    <span>Connect Free (Google / GitHub)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
