"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  Check,
  ArrowRight,
  Sparkles,
  Brain,
  Layers,
  Zap,
  HelpCircle,
  AlertTriangle,
  Lightbulb,
  Code2,
  Cpu,
  Factory,
  Compass,
  FileText,
} from "lucide-react";
import EvolutionComparisonVisualizer from "./EvolutionComparisonVisualizer";
import Module1_2CodeExecutor from "./Module1_2CodeExecutor";
import Module1_2Quiz from "./Module1_2Quiz";

export default function Module1_2Content() {
  const [selectedParadigm, setSelectedParadigm] = useState<string>("chains");
  const [showQuiz, setShowQuiz] = useState<boolean>(false);

  const paradigms = [
    {
      id: "prompts",
      title: "1. Prompts",
      tagline: "Single Call (Static)",
      desc: "One input creates one output. Best for classification and fast summaries.",
      icon: Sparkles,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      border: "border-emerald-200 dark:border-emerald-500/30",
      badge: "Prompt Engineering",
      codeSnippet: `# Single Input -> Single Output pass
response = llm.generate("Classify support ticket: 'Cannot reset password'")`,
    },
    {
      id: "cot",
      title: "2. CoT",
      tagline: "Guided Reasoning",
      desc: "Prompts the LLM to output step-by-step thinking before final answer.",
      icon: Brain,
      color: "text-sky-600 dark:text-sky-400",
      bg: "bg-sky-50 dark:bg-sky-500/10",
      border: "border-sky-200 dark:border-sky-500/30",
      badge: "Chain of Thought",
      codeSnippet: `# Generates internal scratchpad reasoning tokens
prompt = "Think step-by-step: If item costs $50 with 8% tax, what is total?"`,
    },
    {
      id: "chains",
      title: "3. Chains",
      tagline: "Deterministic Pipeline",
      desc: "Output of step A feeds input of step B in a fixed, predictable sequence.",
      icon: Layers,
      color: "text-violet-600 dark:text-violet-400",
      bg: "bg-violet-50 dark:bg-violet-500/10",
      border: "border-violet-200 dark:border-violet-500/30",
      badge: "Prompt Chaining",
      codeSnippet: `# Fixed sequential stations (Linear & Low Latency)
outline = llm.generate(f"Create outline for {topic}")
draft = llm.generate(f"Write draft based on outline: {outline}")`,
    },
    {
      id: "agents",
      title: "4. Agents",
      tagline: "Autonomous Loop",
      desc: "Dynamic decision loop that chooses tools, evaluates feedback, and adapts.",
      icon: Zap,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      border: "border-amber-200 dark:border-amber-500/30",
      badge: "Autonomous Agent",
      codeSnippet: `# Dynamic execution path decided at runtime by LLM
while not goal_satisfied:
    action = llm.decide(history, tools)
    observation = execute(action)`,
    },
  ];

  const currentParadigm =
    paradigms.find((p) => p.id === selectedParadigm) || paradigms[2];

  return (
    <div className="space-y-10 text-slate-800 dark:text-slate-200 pb-12">
      {/* ───────────────────────────────────────────────────────────── */}
      {/* TOP LEARNING OBJECTIVE CARD                                   */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="rounded-2xl sm:rounded-3xl border border-sky-200/90 dark:border-sky-500/30 bg-sky-50/70 dark:bg-sky-500/10 p-4 sm:p-7 shadow-xs">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-sky-500/15 border border-sky-500/30 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0 shadow-xs">
            <Target className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="space-y-2 sm:space-y-2.5 flex-1 min-w-0">
            <h2 className="text-sm sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
              By the end of this module, you will:
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
                <span>Differentiate the 4 LLM paradigms: Prompts, CoT, Chains, and Agents</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
                <span>Understand the engineering trade-offs: When to chain vs when to loop</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
                <span>Master Context Windows and avoid the "Lost in the Middle" trap</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
                <span>Compare live Chain vs Agent execution in interactive simulator</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* SECTION 1: HOW LLMS EVOLVED                                   */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="space-y-3.5 sm:space-y-4">
        <div className="space-y-1.5">
          <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            1. The Evolution of LLM Applications
          </h2>
          <p className="text-xs sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Not every problem requires an autonomous agent. Production AI engineering is about choosing
            the simplest architecture that solves the problem reliably:
          </p>
        </div>

        {/* Visual Analogy Card: Factory Conveyor vs Autonomous Detective */}
        <div className="p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-5 transition hover:shadow-sm">
          {/* Prompt Chains */}
          <div className="flex items-center gap-3.5 sm:gap-4 flex-1 w-full p-3 sm:p-0 rounded-xl sm:rounded-none bg-violet-50/50 dark:bg-violet-500/10 sm:bg-transparent sm:dark:bg-transparent border border-violet-100 dark:border-violet-500/20 sm:border-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-violet-100 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0 border border-violet-200 dark:border-violet-500/30">
              <Factory className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h3 className="text-xs sm:text-base font-bold text-slate-900 dark:text-white">
                Prompt Chain = Conveyor Belt
              </h3>
              <p className="text-[11px] sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                Fixed assembly stations. Fast, deterministic, and low cost.
              </p>
            </div>
          </div>

          {/* Center Divider / Arrow */}
          <div className="text-slate-300 dark:text-slate-600 shrink-0 hidden sm:block">
            <ArrowRight className="w-6 h-6" />
          </div>
          <div className="text-slate-400 dark:text-slate-500 shrink-0 block sm:hidden py-0.5">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 uppercase font-bold">
              vs
            </span>
          </div>

          {/* AI Agent */}
          <div className="flex items-center gap-3.5 sm:gap-4 flex-1 w-full p-3 sm:p-0 rounded-xl sm:rounded-none bg-amber-50/50 dark:bg-amber-500/10 sm:bg-transparent sm:dark:bg-transparent border border-amber-100 dark:border-amber-500/20 sm:border-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 border border-amber-200 dark:border-amber-500/30">
              <Compass className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h3 className="text-xs sm:text-base font-bold text-slate-900 dark:text-white">
                Agent = Field Investigator
              </h3>
              <p className="text-[11px] sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                Chooses own tools, inspects clues, self-corrects, and stops when finished.
              </p>
            </div>
          </div>
        </div>

        {/* Handwritten Teacher Note */}
        <div className="flex items-start sm:items-center gap-2.5 sm:gap-3 p-3.5 sm:p-4 rounded-2xl bg-amber-50/90 dark:bg-amber-500/10 border border-amber-300/80 dark:border-amber-500/30 text-amber-950 dark:text-amber-200 sm:-rotate-0.5 shadow-2xs">
          <span className="text-xl sm:text-2xl shrink-0 mt-0.5 sm:mt-0">✍️</span>
          <p className="font-handwriting text-base sm:text-xl leading-snug">
            "Instructor note: Don't use a bulldozer to plant a flower! If your task is linear and predictable, a simple Prompt Chain beats an Agent in cost, speed, and reliability every single time."
          </p>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* SECTION 2: THE 4 PARADIGMS INTERACTIVE GRID                    */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="space-y-3.5 sm:space-y-4">
        <div className="space-y-1.5">
          <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            2. The 4 Key Paradigms
          </h2>
          <p className="text-xs sm:text-base text-slate-600 dark:text-slate-300">
            Tap any paradigm to inspect its code pattern and architecture:
          </p>
        </div>

        {/* 4 Interactive Cards (2x2 Grid on Mobile, 4 Cols on Desktop) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3.5">
          {paradigms.map((p) => {
            const Icon = p.icon;
            const isSelected = selectedParadigm === p.id;

            return (
              <button
                key={p.id}
                onClick={() => setSelectedParadigm(p.id)}
                className={`p-2.5 sm:p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[145px] sm:min-h-[160px] active:scale-[0.98] touch-manipulation ${
                  isSelected
                    ? `${p.border} ${p.bg} ring-2 ring-teal-500/40 shadow-xs`
                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                <div>
                  <div
                    className={`w-7 h-7 sm:w-9 sm:h-9 rounded-xl ${p.bg} ${p.color} border ${p.border} flex items-center justify-center mb-1.5 sm:mb-3`}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-tight">
                    {p.title}
                  </h3>
                  <span className="text-[9px] sm:text-[10px] font-mono uppercase font-bold text-slate-500 dark:text-slate-400 block mt-0.5 truncate">
                    {p.tagline}
                  </span>
                  <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-300 mt-1 leading-snug line-clamp-3 sm:line-clamp-none">
                    {p.desc}
                  </p>
                </div>

                <div className="mt-2 pt-1.5 border-t border-slate-100 dark:border-slate-800 text-[10px] sm:text-[11px] font-mono text-teal-600 dark:text-teal-400 flex items-center justify-between">
                  <span>{isSelected ? "Active" : "Inspect"}</span>
                  <span>→</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Paradigm Code Deep-Dive Box */}
        <div className="p-3 sm:p-5 rounded-2xl bg-slate-950 text-slate-100 border border-slate-800 shadow-xs space-y-2 sm:space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span
                className={`text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md shrink-0 ${currentParadigm.bg} ${currentParadigm.color}`}
              >
                {currentParadigm.badge}
              </span>
              <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                Architecture: {currentParadigm.title}
              </h4>
            </div>
            <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 self-end sm:self-auto shrink-0">
              Python Pattern
            </span>
          </div>

          <pre className="p-3 sm:p-3.5 rounded-xl bg-slate-900 text-emerald-300 font-mono text-xs font-semibold overflow-x-auto border border-slate-800">
            <code>{currentParadigm.codeSnippet}</code>
          </pre>
        </div>

        {/* Handwritten Mental Model Note */}
        <div className="flex items-start sm:items-center gap-2.5 sm:gap-3 p-3.5 rounded-2xl bg-teal-50/90 dark:bg-teal-500/10 border border-teal-200/80 dark:border-teal-500/30 text-teal-950 dark:text-teal-200 sm:rotate-0.5 shadow-2xs">
          <span className="text-xl shrink-0 mt-0.5 sm:mt-0">💡</span>
          <p className="font-handwriting text-base sm:text-lg leading-snug">
            "Mental model: Prompt = One question. Chain = Fixed conveyor belt. Agent = Worker who chooses their own tools."
          </p>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* SECTION 3: CONTEXT WINDOWS & ATTENTION TRAP                   */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="space-y-3.5 sm:space-y-4">
        <div className="space-y-1.5">
          <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            3. Context Engineering & The "Lost in the Middle" Trap
          </h2>
          <p className="text-xs sm:text-base text-slate-600 dark:text-slate-300">
            Even models with 1M+ token windows suffer from retrieval degradation in the center of their prompt:
          </p>
        </div>

        {/* Attention Curve Visualizer Card */}
        <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3.5">
          <div className="flex items-center justify-between text-xs font-mono text-slate-500">
            <span>U-Shaped Attention Curve</span>
            <span className="text-teal-600 dark:text-teal-400 font-bold">Research Proven</span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
            {/* Top */}
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-emerald-950 dark:text-emerald-300">
              <span className="font-bold block text-sm">95%+ Recall</span>
              <span className="text-[10px] text-emerald-700 dark:text-emerald-400">Prompt Start</span>
              <p className="text-[10px] mt-1 text-slate-600 dark:text-slate-400">System Role & Core Rules</p>
            </div>

            {/* Middle */}
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 text-amber-950 dark:text-amber-300">
              <span className="font-bold block text-sm">50%-70% Recall</span>
              <span className="text-[10px] text-amber-700 dark:text-amber-400">Middle 50%</span>
              <p className="text-[10px] mt-1 text-slate-600 dark:text-slate-400">History & Background Docs</p>
            </div>

            {/* Bottom */}
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-emerald-950 dark:text-emerald-300">
              <span className="font-bold block text-sm">95%+ Recall</span>
              <span className="text-[10px] text-emerald-700 dark:text-emerald-400">Prompt End</span>
              <p className="text-[10px] mt-1 text-slate-600 dark:text-slate-400">User Query & JSON Schema</p>
            </div>
          </div>
        </div>

        {/* Handwritten Rule Note */}
        <div className="flex items-start sm:items-center gap-2.5 sm:gap-3 p-3.5 rounded-2xl bg-sky-50/80 dark:bg-sky-500/10 border border-sky-200/80 dark:border-sky-500/30 text-sky-950 dark:text-sky-200 sm:-rotate-0.5 shadow-2xs">
          <span className="text-xl shrink-0 mt-0.5 sm:mt-0">📌</span>
          <p className="font-handwriting text-base sm:text-lg leading-snug">
            "Context rule: Put critical system constraints and output schema at the very top or bottom of your prompt — models pay the least attention to the middle 50%!"
          </p>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* SECTION 4: SEE IT IN ACTION (Evolution Decision Matrix)       */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="space-y-3.5 sm:space-y-4 pt-1 sm:pt-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-teal-600 dark:text-teal-400 shrink-0" />
              <span>4. See It in Action (Evolutionary Decision Matrix)</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Inspect latency, cost, and best-use cases across each architectural tier:
            </p>
          </div>
        </div>

        <EvolutionComparisonVisualizer />
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* SECTION 5: TRY IT YOURSELF (Live Hands-on Simulator)          */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="space-y-3.5 sm:space-y-4 pt-1 sm:pt-2">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Code2 className="w-5 h-5 sm:w-6 sm:h-6 text-sky-600 dark:text-sky-400 shrink-0" />
            <span>5. Try It Yourself (Interactive Code Runner)</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Toggle between Prompt Chaining and Autonomous Agent Loop, then tap{" "}
            <strong className="text-violet-600 dark:text-violet-400">Run</strong>:
          </p>
        </div>

        <Module1_2CodeExecutor />

        {/* Handwritten Note on Tools */}
        <div className="flex items-start sm:items-center gap-2.5 sm:gap-3 p-3.5 rounded-2xl bg-amber-50/80 dark:bg-amber-500/10 border border-amber-200/80 dark:border-amber-500/30 text-amber-950 dark:text-amber-200 sm:rotate-0.5 shadow-2xs">
          <span className="text-xl shrink-0 mt-0.5 sm:mt-0">📝</span>
          <p className="font-handwriting text-base sm:text-lg leading-snug">
            "Pro tip: High-performance production systems combine both: Chains handle predictable subtasks, while Agents handle dynamic decisions."
          </p>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* SECTION 6: COMMON MISCONCEPTIONS                              */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="space-y-3.5 sm:space-y-4 pt-1 sm:pt-2">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500 shrink-0" />
            <span>6. Common Misconceptions</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Two traps engineers face when moving from prompts to agent systems:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {/* Gotcha 1 */}
          <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-amber-50/70 dark:bg-amber-500/10 border border-amber-200/80 dark:border-amber-500/30 space-y-1.5 sm:space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 inline-block">
              Trap #1
            </span>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
              Everything needs to be an autonomous agent
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Premature agentification causes nondeterminism, infinite loops, and high token costs.
              Use prompt chaining whenever steps are known in advance.
            </p>
          </div>

          {/* Gotcha 2 */}
          <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5 sm:space-y-2 shadow-xs">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 inline-block">
              Trap #2
            </span>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
              Huge context windows eliminate the need for filtering
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Dumping raw unformatted documents into context causes attention dilution. Careful
              context curation directly correlates with agent decision accuracy.
            </p>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* SECTION 7: KEY TAKEAWAYS & KNOWLEDGE CHECK                    */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="space-y-3.5 sm:space-y-4 pt-1 sm:pt-2">
        {/* Key Takeaways Card */}
        <div className="p-4 sm:p-7 rounded-2xl sm:rounded-3xl bg-amber-50/80 dark:bg-amber-500/10 border border-amber-200/90 dark:border-amber-500/30 space-y-3 sm:space-y-3.5 shadow-xs">
          <div className="flex items-center gap-2 text-amber-900 dark:text-amber-300">
            <Lightbulb className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider font-mono">
              Key Takeaways
            </h3>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
            <li className="flex items-start gap-2 sm:gap-2.5">
              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span>Prompt chains are <strong>fixed & deterministic</strong>; agents are <strong>dynamic & self-directed</strong>.</span>
            </li>
            <li className="flex items-start gap-2 sm:gap-2.5">
              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span>Always place critical instructions at the <strong>start or end</strong> of the context window.</span>
            </li>
            <li className="flex items-start gap-2 sm:gap-2.5">
              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span>Production architectures pair <strong>chains for pipelines</strong> with <strong>agents for exploratory steps</strong>.</span>
            </li>
          </ul>

          {/* Handwritten Pro Tip Note */}
          <div className="pt-2.5 sm:pt-3 border-t border-amber-200/80 dark:border-amber-500/20">
            <p className="font-handwriting text-base sm:text-lg text-amber-950 dark:text-amber-200 leading-snug">
              "Pro tip: Before writing a single line of agent code, ask: 'Can this be solved with a 2-step prompt chain?' If yes, do not build an agent!"
            </p>
          </div>
        </div>

        {/* Knowledge Check Card */}
        <div className="p-4 sm:p-7 rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-violet-100 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  Knowledge Check Quiz
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Quick 3-question check to test what you learned in Module 1.2.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowQuiz(!showQuiz)}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-mono text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-95 touch-manipulation"
            >
              <span>{showQuiz ? "Hide Quiz" : "Start Quiz"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <AnimatePresence>
            {showQuiz && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="pt-3 sm:pt-4 border-t border-slate-200 dark:border-slate-800 overflow-hidden"
              >
                <Module1_2Quiz />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* SECTION 8: BRIDGE TO NEXT MODULE                              */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-teal-500/10 via-emerald-500/10 to-teal-500/10 border border-teal-500/30 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 shadow-xs">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
            Ready to Level Up?
          </span>
          <h3 className="text-sm sm:text-lg font-bold text-slate-900 dark:text-white mt-0.5">
            Next: Module 1.3 • Tackling Complex Tasks with AI Agent Workflows
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Discover routing, parallelization, and evaluator-optimizer patterns for complex agent workflows.
          </p>
        </div>

        <Link
          href="/learn/level-1/module-1-3"
          className="w-full sm:w-auto justify-center px-5 py-3 sm:py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs font-mono flex items-center gap-1.5 shadow-md shadow-teal-500/20 transition-all hover:scale-[1.02] active:scale-95 shrink-0"
        >
          <span>Next Module</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
