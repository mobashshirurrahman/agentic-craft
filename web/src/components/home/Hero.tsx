"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Compass,
  Cpu,
  Eye,
  Wrench,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  BookOpen,
  Coffee,
  Code2,
} from "lucide-react";

export default function Hero() {
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps = [
    {
      num: 1,
      title: "Perceive & Ingest",
      icon: Eye,
      tag: "Step 1",
      analogy: "Like a doctor asking symptoms before prescribing medication.",
      detail:
        "The agent ingests the user goal, parses context constraints, and identifies what knowledge is missing from its weights.",
    },
    {
      num: 2,
      title: "Cognitive Plan",
      icon: Cpu,
      tag: "Step 2",
      analogy: "Like a chess grandmaster visualizing 3 moves ahead.",
      detail:
        "Instead of guessing, the LLM constructs an internal scratchpad thought: 'I need to query external search and run calculations.'",
    },
    {
      num: 3,
      title: "Tool Execution",
      icon: Wrench,
      tag: "Step 3",
      analogy: "Like giving an engineer a calculator and internet connection.",
      detail:
        "The agent outputs structured tool calls via Model Context Protocol (MCP) to fetch live data or mutate state safely.",
    },
    {
      num: 4,
      title: "Self-Reflection",
      icon: RotateCcw,
      tag: "Step 4",
      analogy: "Like a writer proofreading their own draft before publishing.",
      detail:
        "The agent audits the tool outputs against the original goal. If errors exist, it self-corrects without crashing.",
    },
  ];

  return (
    <section className="relative pt-10 pb-16 md:pt-20 md:pb-24 overflow-hidden">
      {/* Subtle, soft ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-teal-500/10 via-sky-500/5 to-transparent blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Handwritten Announcement Note */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 dark:bg-teal-500/15 border border-teal-500/30 text-teal-800 dark:text-teal-300 text-xs shadow-sm">
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
            <span className="font-mono font-bold tracking-tight">59 In-Depth Lessons</span>
            <span className="text-slate-300 dark:text-slate-600">•</span>
            <span className="font-handwriting text-base text-teal-700 dark:text-teal-300 font-bold">
              Handcrafted for software engineers ✍️
            </span>
          </div>
        </motion.div>

        {/* Clean, Non-Overwhelming Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center space-y-4 max-w-3xl mx-auto"
        >
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            Master Agentic AI from{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-teal-600 dark:text-teal-400">
                First Principles
              </span>
              {/* Organic Hand-Drawn Underline SVG Doodle */}
              <svg
                className="absolute -bottom-2 left-0 w-full h-3 text-teal-400/80 -z-0"
                viewBox="0 0 200 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 8C50 2 150 2 198 8"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto pt-2">
            No marketing buzzwords or superficial demos. Learn how real autonomous agents perceive, reason, call tools, and scale in production with relatable everyday analogies and clean Python code.
          </p>
        </motion.div>

        {/* Action CTAs + Handwritten Sticky Pointer */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 relative"
        >
          <Link
            href="/learn/level-1/module-1-1"
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm tracking-wide shadow-lg shadow-teal-600/20 hover:shadow-teal-600/30 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group"
          >
            <span>Start Lesson 1.1 Free</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="#curriculum"
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <Compass className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span>Browse 4 Levels (59 Lessons)</span>
          </Link>

          {/* Playful Handwritten Doodle Note on Desktop */}
          <div className="hidden md:flex items-center gap-1 absolute -right-24 -top-6 rotate-[6deg] pointer-events-none select-none">
            <span className="font-handwriting text-xl text-amber-600 dark:text-amber-400 font-bold whitespace-nowrap">
              100% free forever ☕
            </span>
            <svg
              className="w-7 h-7 text-amber-500 -scale-x-100"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 14c4 4 10 4 14-2m-3-1l3 3-1-4" />
            </svg>
          </div>
        </motion.div>

        {/* Clean, Non-Overwhelming Interactive Preview Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-14 max-w-3xl mx-auto rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/80 p-5 sm:p-7 shadow-xl shadow-slate-200/50 dark:shadow-none backdrop-blur-xl"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                The Core Mental Model
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                How an Autonomous AI Agent Actually Thinks
              </h3>
            </div>
            <span className="font-handwriting text-base text-slate-500 dark:text-slate-400 hidden sm:inline">
              Tap a step to explore &rarr;
            </span>
          </div>

          {/* 4 Interactive Step Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-4">
            {steps.map((s) => {
              const Icon = s.icon;
              const isActive = activeStep === s.num;
              return (
                <button
                  key={s.num}
                  onClick={() => setActiveStep(s.num)}
                  className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between gap-2 ${
                    isActive
                      ? "border-teal-500 bg-teal-50/60 dark:bg-teal-950/40 text-teal-950 dark:text-teal-200 shadow-sm"
                      : "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 hover:border-slate-300 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                      {s.tag}
                    </span>
                    <Icon className={`w-4 h-4 ${isActive ? "text-teal-600 dark:text-teal-400" : "text-slate-400"}`} />
                  </div>
                  <span className="font-bold text-xs line-clamp-1">{s.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Step Details Panel */}
          {(() => {
            const cur = steps.find((s) => s.num === activeStep)!;
            return (
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-handwriting text-base text-teal-700 dark:text-teal-300 font-bold">
                    💡 Everyday Analogy:
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                    &ldquo;{cur.analogy}&rdquo;
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed pt-1">
                  {cur.detail}
                </p>
              </div>
            );
          })()}
        </motion.div>

        {/* 3 Clean Value Cards (Bento Style) */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/50 space-y-2">
            <span className="text-xl">☕</span>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Human Tutor Style</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Every lesson begins with a relatable everyday analogy (chefs, hospital ERs, restaurant pagers) before writing code.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/50 space-y-2">
            <span className="text-xl">🏗️</span>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Real Production Architectures</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Master LangGraph state graphs, MCP tools, Redis session caching, Celery worker nodes, and token rate limiters.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/50 space-y-2">
            <span className="text-xl">🧪</span>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Interactive Labs in Every Lesson</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              All 59 modules feature hands-on interactive visual simulators, runnable Python snippets, and knowledge checks.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
