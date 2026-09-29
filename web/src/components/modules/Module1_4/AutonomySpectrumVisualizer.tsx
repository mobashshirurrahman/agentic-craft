"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sliders,
  Code,
  Sparkles,
  Layers,
  GitFork,
  RotateCcw,
  Bot,
  UserCheck,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

interface SpectrumLevel {
  level: number;
  id: string;
  name: string;
  category: "human" | "hybrid" | "agent";
  badge: string;
  color: string;
  bgGlow: string;
  borderGlow: string;
  decideOutput: "Human Code" | "LLM (1 Step)" | "LLM (Multi-Step)" | "LLM Autonomous";
  decideNextStep: "Human Code" | "LLM Router" | "LLM (with Cycles)" | "LLM Autonomous";
  decideAvailableTools: "Human Code" | "LLM Autonomous";
  realWorldExample: string;
  summary: string;
  riskProfile: "Lowest Risk" | "Low Risk" | "Moderate Risk" | "Higher Risk / Flexible";
}

const SPECTRUM_LEVELS: SpectrumLevel[] = [
  {
    level: 1,
    id: "code",
    name: "Pure Deterministic Code",
    category: "human",
    badge: "Level 1: Human-Driven",
    color: "text-slate-600 dark:text-slate-400",
    bgGlow: "bg-slate-100 dark:bg-slate-500/10",
    borderGlow: "border-slate-300 dark:border-slate-500/30",
    decideOutput: "Human Code",
    decideNextStep: "Human Code",
    decideAvailableTools: "Human Code",
    realWorldExample: "Traditional Python script, regex parser, SQL query pipeline with zero AI.",
    summary: "100% predictable. Every output, conditional branch, and outcome is explicitly authored by software engineers.",
    riskProfile: "Lowest Risk",
  },
  {
    level: 2,
    id: "llm_call",
    name: "Single LLM Call",
    category: "human",
    badge: "Level 2: Isolated Generation",
    color: "text-emerald-700 dark:text-emerald-400",
    bgGlow: "bg-emerald-50 dark:bg-emerald-500/10",
    borderGlow: "border-emerald-200 dark:border-emerald-500/30",
    decideOutput: "LLM (1 Step)",
    decideNextStep: "Human Code",
    decideAvailableTools: "Human Code",
    realWorldExample: "User clicks 'Summarize Document' -> System passes text to LLM -> Renders summary.",
    summary: "The LLM generates text for one isolated operation. Code controls inputs, validation, and what happens next.",
    riskProfile: "Lowest Risk",
  },
  {
    level: 3,
    id: "chain",
    name: "Sequential Chain",
    category: "human",
    badge: "Level 3: Fixed Pipeline",
    color: "text-sky-700 dark:text-sky-400",
    bgGlow: "bg-sky-50 dark:bg-sky-500/10",
    borderGlow: "border-sky-200 dark:border-sky-500/30",
    decideOutput: "LLM (Multi-Step)",
    decideNextStep: "Human Code",
    decideAvailableTools: "Human Code",
    realWorldExample: "Step 1: Translate email -> Step 2: Extract sentiment -> Step 3: Draft polite reply.",
    summary: "A fixed sequence of LLM calls hardcoded in software. No branching or autonomous decision on step sequence.",
    riskProfile: "Low Risk",
  },
  {
    level: 4,
    id: "router",
    name: "Router / Conditional Branching",
    category: "hybrid",
    badge: "Level 4: Intelligent Routing",
    color: "text-violet-700 dark:text-violet-400",
    bgGlow: "bg-violet-50 dark:bg-violet-500/10",
    borderGlow: "border-violet-200 dark:border-violet-500/30",
    decideOutput: "LLM (Multi-Step)",
    decideNextStep: "LLM Router",
    decideAvailableTools: "Human Code",
    realWorldExample: "Customer support router: LLM decides if inquiry is 'Billing', 'Bug', or 'Sales', then directs flow.",
    summary: "The LLM determines which predefined branch or workflow to invoke next, but cannot invent new steps.",
    riskProfile: "Low Risk",
  },
  {
    level: 5,
    id: "state_machine",
    name: "State Machine with Cycles",
    category: "hybrid",
    badge: "Level 5: Evaluator-Optimizer",
    color: "text-amber-700 dark:text-amber-400",
    bgGlow: "bg-amber-50 dark:bg-amber-500/10",
    borderGlow: "border-amber-200 dark:border-amber-500/30",
    decideOutput: "LLM (Multi-Step)",
    decideNextStep: "LLM (with Cycles)",
    decideAvailableTools: "Human Code",
    realWorldExample: "Code Generator writes Python -> Test Runner runs tests -> If fail, LLM fixes code and loops up to 3 times.",
    summary: "Includes feedback loops and retry cycles. Can iterate until quality thresholds are satisfied within a fixed state machine.",
    riskProfile: "Moderate Risk",
  },
  {
    level: 6,
    id: "autonomous_agent",
    name: "Autonomous Agent",
    category: "agent",
    badge: "Level 6: Full Autonomy",
    color: "text-teal-700 dark:text-teal-400",
    bgGlow: "bg-teal-50 dark:bg-teal-500/10",
    borderGlow: "border-teal-200 dark:border-teal-500/30",
    decideOutput: "LLM Autonomous",
    decideNextStep: "LLM Autonomous",
    decideAvailableTools: "LLM Autonomous",
    realWorldExample: "Claude Code / Devin: given a GitHub issue, explores files, chooses tools, writes code, tests, and makes PR.",
    summary: "The agent dynamically decides which tools to call, which files to inspect, how many steps to take, and when it is finished.",
    riskProfile: "Higher Risk / Flexible",
  },
];

export default function AutonomySpectrumVisualizer() {
  const [currentLevelIndex, setCurrentLevelIndex] = useState(3); // Level 4 default
  const activeLevel = SPECTRUM_LEVELS[currentLevelIndex];

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-4 sm:p-6 shadow-sm dark:shadow-2xl space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400 px-2.5 py-0.5 rounded-full bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30">
              Interactive Architectural Slider
            </span>
            <span className="text-[11px] font-mono text-slate-500">6 Levels</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-1">
            The Continuous Spectrum of Autonomy
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Slide or tap to inspect how control shifts from human-authored code to autonomous agent reasoning
          </p>
        </div>

        {/* Level Badge */}
        <div className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-bold self-start sm:self-center shadow-sm ${activeLevel.bgGlow} ${activeLevel.borderGlow} ${activeLevel.color}`}>
          {activeLevel.badge}
        </div>
      </div>

      {/* Interactive Range Slider */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1">
            <Code className="w-3.5 h-3.5" />
            Deterministic Code
          </span>
          <span className="flex items-center gap-1">
            <Bot className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            Full Autonomous Agent
          </span>
        </div>

        <input
          type="range"
          min="0"
          max="5"
          step="1"
          value={currentLevelIndex}
          onChange={(e) => setCurrentLevelIndex(Number(e.target.value))}
          className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-600 focus:outline-none touch-manipulation"
        />

        {/* Step Marker Buttons */}
        <div className="grid grid-cols-6 gap-1 pt-1">
          {SPECTRUM_LEVELS.map((lvl, idx) => (
            <button
              key={lvl.id}
              onClick={() => setCurrentLevelIndex(idx)}
              className={`py-1.5 px-1 rounded-lg text-center font-mono text-[10px] sm:text-xs transition-all touch-manipulation active:scale-95 ${
                idx === currentLevelIndex
                  ? "bg-teal-600 text-white font-bold shadow-sm"
                  : "bg-slate-50 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800"
              }`}
            >
              L{lvl.level}
            </button>
          ))}
        </div>
      </div>

      {/* Active Level Inspector Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeLevel.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200/80 dark:border-slate-800">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                {activeLevel.name}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                {activeLevel.summary}
              </p>
            </div>
            <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 shrink-0 self-start sm:self-center shadow-sm">
              Risk Profile: <strong className="text-teal-700 dark:text-teal-400">{activeLevel.riskProfile}</strong>
            </span>
          </div>

          {/* Decision Ownership Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
            <div className="p-3 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block">
                Who Generates Content?
              </span>
              <span className="font-bold text-slate-900 dark:text-white">
                {activeLevel.decideOutput}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block">
                Who Decides Next Step?
              </span>
              <span className="font-bold text-slate-900 dark:text-white">
                {activeLevel.decideNextStep}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block">
                Tool Selection
              </span>
              <span className="font-bold text-slate-900 dark:text-white">
                {activeLevel.decideAvailableTools}
              </span>
            </div>
          </div>

          {/* Real World Example */}
          <div className="p-3 rounded-lg bg-teal-50/60 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-500/30 text-xs">
            <span className="font-bold font-mono text-teal-800 dark:text-teal-400 block mb-1">
              Production Example:
            </span>
            <p className="text-slate-700 dark:text-slate-300">
              {activeLevel.realWorldExample}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
