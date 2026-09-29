"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  GitCommit,
  Bot,
  Layers,
  Zap,
  CheckCircle2,
  Clock,
  DollarSign,
  AlertCircle,
} from "lucide-react";

interface Paradigm {
  id: string;
  name: string;
  subtitle: string;
  badge: string;
  color: string;
  bgGlow: string;
  borderGlow: string;
  flowDescription: string;
  bestFor: string;
  latencyCost: string;
  analogy: string;
  example: string;
}

const PARADIGMS: Paradigm[] = [
  {
    id: "prompts",
    name: "Prompt Engineering",
    subtitle: "Single Input ➔ Single Output",
    badge: "Level 1: Static",
    color: "text-emerald-400",
    bgGlow: "bg-emerald-500/10",
    borderGlow: "border-emerald-500/30",
    flowDescription: "A single API request with instructions and optional few-shot examples.",
    bestFor: "Simple, well-defined tasks where a single response is sufficient (e.g. summarization, classification).",
    latencyCost: "Lowest latency (~300ms) • Lowest token cost ($)",
    analogy: "Asking a question to a reference book and reading the single paragraph answer.",
    example: 'Input: "Summarize this email in one sentence." ➔ Output: Immediate 1-sentence summary.',
  },
  {
    id: "cot",
    name: "Chain of Thought (CoT)",
    subtitle: "Step-by-Step Internal Reasoning",
    badge: "Level 2: Guided Reasoning",
    color: "text-sky-400",
    bgGlow: "bg-sky-500/10",
    borderGlow: "border-sky-500/30",
    flowDescription: "Prompting technique that guides the LLM to write out intermediate thinking steps before answering.",
    bestFor: "Complex mathematical reasoning, logic puzzles, and multi-step deduction within a single call.",
    latencyCost: "Low latency (~800ms) • Modest token cost ($$)",
    analogy: "A student showing their step-by-step scratch work on paper before writing the final math answer.",
    example: 'Prompt: "Think step-by-step: If a store has 15 apples and sells 4..." ➔ Model explains steps before total.',
  },
  {
    id: "chains",
    name: "Chains / Prompt Chaining",
    subtitle: "Sequential Multi-Step Pipeline",
    badge: "Level 3: Deterministic Pipeline",
    color: "text-violet-400",
    bgGlow: "bg-violet-500/10",
    borderGlow: "border-violet-500/30",
    flowDescription: "A fixed, sequential workflow where Output from Step A becomes Input to Step B programmatically.",
    bestFor: "Multi-stage tasks with known, predictable dependencies (e.g. Generate Outline ➔ Draft Content ➔ Review & Format).",
    latencyCost: "Medium latency (~2s) • Predictable token cost ($$$)",
    analogy: "An assembly line in a factory. Product moves from station 1 to station 2 in fixed order.",
    example: "Step 1: Extract keywords ➔ Step 2: Query database with keywords ➔ Step 3: Format into report.",
  },
  {
    id: "agents",
    name: "AI Agents",
    subtitle: "Dynamic Decision Loops & Tools",
    badge: "Level 4: Autonomous Loop",
    color: "text-amber-400",
    bgGlow: "bg-amber-500/10",
    borderGlow: "border-amber-500/30",
    flowDescription: "The LLM actively controls the execution path, invokes tools dynamically, evaluates results, and loops until done.",
    bestFor: "Open-ended goals, unpredictable environments, dynamic tool selection, and tasks requiring self-correction.",
    latencyCost: "Higher latency (~3s-15s) • Variable token cost ($$$$)",
    analogy: "An engineer troubleshooting a bug: tests a fix, reads compiler error, modifies code, re-tests until tests pass.",
    example: "User asks to resolve support ticket: Agent inspects user account, calls Stripe API, processes refund, emails receipt.",
  },
];

export default function EvolutionComparisonVisualizer() {
  const [selectedId, setSelectedId] = useState<string>("chains");
  const active = PARADIGMS.find((p) => p.id === selectedId) || PARADIGMS[2];

  return (
    <div className="rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-4 sm:p-7 shadow-xs relative overflow-hidden transition-colors">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="text-[10px] sm:text-xs font-mono font-bold text-teal-700 dark:text-teal-400 px-2.5 py-0.5 rounded-full bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30">
            Interactive Decision Matrix
          </span>
          <h3 className="text-base sm:text-xl font-bold text-slate-900 dark:text-white mt-1">
            The Evolution of LLM Applications
          </h3>
        </div>
        <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
          Tap a paradigm to inspect
        </span>
      </div>

      {/* 4 Stage Progression Selector (2x2 Mobile, 4-Col Desktop) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5 my-4 sm:my-6">
        {PARADIGMS.map((item, idx) => {
          const isSelected = item.id === selectedId;

          return (
            <button
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              className={`p-3 sm:p-3.5 rounded-xl border text-left transition-all relative cursor-pointer active:scale-95 touch-manipulation ${
                isSelected
                  ? `${item.bgGlow} ${item.borderGlow} ring-2 ring-teal-500/30 shadow-xs scale-[1.01]`
                  : "bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 dark:text-slate-400 mb-1">
                <span>Stage {idx + 1}</span>
                {isSelected && <span className="text-teal-600 dark:text-teal-400 font-bold">ACTIVE</span>}
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-tight">
                {item.name}
              </h4>
              <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                {item.subtitle}
              </p>
            </button>
          );
        })}
      </div>

      {/* Deep-Dive Inspection Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className={`rounded-2xl border ${active.borderGlow} ${active.bgGlow} p-4 sm:p-5 space-y-3.5 sm:space-y-4`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
            <div>
              <span className="text-[10px] sm:text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {active.badge}
              </span>
              <h4 className="text-sm sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                {active.name}
              </h4>
            </div>

            <div className="text-[11px] sm:text-xs font-mono text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900/80 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 self-start sm:self-center shadow-2xs">
              {active.latencyCost}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3 text-xs sm:text-sm">
            {/* Best For Box */}
            <div className="p-3 sm:p-3.5 rounded-xl bg-white dark:bg-slate-950/70 border border-slate-200 dark:border-slate-850 shadow-2xs">
              <span className="text-[11px] font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider block font-mono mb-1">
                🎯 Best Use Cases:
              </span>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">{active.bestFor}</p>
            </div>

            {/* Analogy Box */}
            <div className="p-3 sm:p-3.5 rounded-xl bg-white dark:bg-slate-950/70 border border-slate-200 dark:border-slate-850 shadow-2xs">
              <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block font-mono mb-1">
                💡 Real-World Analogy:
              </span>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">{active.analogy}</p>
            </div>
          </div>

          {/* Example Demonstration */}
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs">
            <span className="text-sky-400 font-bold block mb-1 text-[11px]">Practical Example Flow:</span>
            <code className="text-slate-200 block text-xs break-words">{active.example}</code>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
