"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  Check,
  ArrowRight,
  Workflow,
  GitBranch,
  Network,
  Layers,
  HelpCircle,
  AlertTriangle,
  Lightbulb,
  Code2,
  Cpu,
  Zap,
  Split,
  Compass,
} from "lucide-react";
import TaskDecompositionVisualizer from "./TaskDecompositionVisualizer";
import DecompositionCodeExecutor from "./DecompositionCodeExecutor";
import Module1_3Quiz from "./Module1_3Quiz";

export default function Module1_3Content() {
  const [selectedStrategy, setSelectedStrategy] = useState<string>("parallel");
  const [showQuiz, setShowQuiz] = useState<boolean>(false);

  const strategies = [
    {
      id: "sequential",
      title: "1. Sequential",
      tagline: "Linear Pipeline",
      desc: "Each subtask strictly consumes the output of the prior step. Highest determinism.",
      icon: Layers,
      color: "text-violet-600 dark:text-violet-400",
      bg: "bg-violet-50 dark:bg-violet-500/10",
      border: "border-violet-200 dark:border-violet-500/30",
      badge: "Linear Pipeline",
      codeSnippet: `# Sequential Pipeline: Output of step N feeds into step N+1
step1_attendees = list_attendees()
step2_dates = survey_dates(step1_attendees)
step3_venue = book_venue(step2_dates["selected_date"])`,
    },
    {
      id: "parallel",
      title: "2. Parallel",
      tagline: "Fork-Join Fan-Out",
      desc: "Independent subproblems run concurrently via async gather. Slashes total latency by ~50%.",
      icon: GitBranch,
      color: "text-teal-600 dark:text-teal-400",
      bg: "bg-teal-50 dark:bg-teal-500/10",
      border: "border-teal-200 dark:border-teal-500/30",
      badge: "Fork-Join Concurrency",
      codeSnippet: `# Async Parallel Fan-Out: No shared mutable dependencies
import asyncio
resorts, lodges, cabins = await asyncio.gather(
    scout_beach_resorts(budget),
    scout_mountain_lodges(budget),
    scout_forest_cabins(budget)
)`,
    },
    {
      id: "dynamic",
      title: "3. Dynamic",
      tagline: "Adaptive Re-Planner",
      desc: "The agent generates its subtask plan at runtime and updates the DAG if errors occur.",
      icon: Workflow,
      color: "text-sky-600 dark:text-sky-400",
      bg: "bg-sky-50 dark:bg-sky-500/10",
      border: "border-sky-200 dark:border-sky-500/30",
      badge: "Runtime Re-Planning",
      codeSnippet: `# Dynamic Re-Planning Loop
plan = agent.generate_plan(complex_goal)
for step in plan:
    result = execute(step)
    if result.failed:
        plan = agent.replan(goal, failed_step=step, error=result.error)`,
    },
    {
      id: "hierarchical",
      title: "4. Hierarchical",
      tagline: "Coordinator & Workers",
      desc: "A supervisor agent delegates entire sub-domains to specialized worker sub-agents.",
      icon: Network,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      border: "border-amber-200 dark:border-amber-500/30",
      badge: "Manager / Worker Squads",
      codeSnippet: `# Hierarchical Coordinator Pattern
coordinator = CoordinatorAgent()
research_squad = ResearchAgent()
logistics_squad = LogisticsAgent()

subtasks = coordinator.decompose(event_goal)
res1 = research_squad.run(subtasks.research_tasks)
res2 = logistics_squad.run(subtasks.logistics_tasks)`,
    },
  ];

  const currentStrategy =
    strategies.find((s) => s.id === selectedStrategy) || strategies[1];

  return (
    <div className="space-y-10 max-w-5xl mx-auto pb-16">
      {/* 🎯 TOP OBJECTIVE BANNER */}
      <section className="rounded-2xl border border-teal-200 dark:border-teal-500/30 bg-teal-50/60 dark:bg-teal-500/5 p-4 sm:p-6 backdrop-blur-sm shadow-sm">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-teal-600 text-white shrink-0 shadow-sm mt-0.5">
            <Target className="w-5 h-5" />
          </div>
          <div className="space-y-2 flex-1">
            <h2 className="text-sm font-mono uppercase tracking-wider text-teal-800 dark:text-teal-400 font-bold">
              🎯 By the end of this module, you will:
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                <span>Understand why monolithic single prompts collapse under complex goals</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                <span>Master 4 task decomposition strategies: Sequential, Parallel, Dynamic, &amp; Hierarchical</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                <span>Know when to use compile-time DAGs vs runtime adaptive re-planners</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                <span>Avoid the dangerous micro-decomposition trap and shared-state race conditions</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: THE CORE PROBLEM — MONOLITHIC PROMPT VS DECOMPOSED GRAPH */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30 text-teal-700 dark:text-teal-400 font-mono text-xs font-bold">
            Section 1 • The Cognitive Shift
          </span>
          <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
        </div>

        <div className="space-y-2">
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Monolithic Prompts Fail. Decomposed Graphs Win.
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Asking an LLM to <strong className="text-slate-900 dark:text-white">&quot;Build a full SaaS platform with auth, billing, and databases&quot;</strong> in one single prompt forces the model to juggle hundreds of conflicting constraints in a single generation pass, leading to hallucinations and missed requirements.
          </p>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            <strong className="text-teal-700 dark:text-teal-400 font-semibold">Task Decomposition</strong> systematically breaks large, fuzzy objectives into discrete subproblems with explicit schemas and isolated contexts, guaranteeing verifiable intermediate checkpoints.
          </p>
        </div>

        {/* Visual Analogy: Monolithic vs Decomposed */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-2">
          <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-500/30 bg-rose-50/50 dark:bg-rose-950/10 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase text-rose-700 dark:text-rose-400">
                ❌ Monolithic Single Prompt
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300">
                High Failure Rate
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              One giant prompt attempts schema design, backend auth, frontend UI, and unit tests all at once. If step 2 hallucinates, all subsequent reasoning becomes invalid.
            </p>
            <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/50 text-[11px] font-mono text-rose-600 dark:text-rose-400">
              User Prompt ──▶ [Huge LLM Generation] ──▶ 💥 Missed Steps &amp; Syntax Errors
            </div>
          </div>

          <div className="p-4 rounded-xl border border-teal-200 dark:border-teal-500/30 bg-teal-50/50 dark:bg-teal-950/10 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase text-teal-700 dark:text-teal-400">
                ✅ Decomposed Subtask Graph
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-100 dark:bg-teal-900/40 text-teal-800 dark:text-teal-300">
                Production Pattern
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Decomposed into 4 isolated phases: Schema ➔ Auth API ➔ UI Components ➔ Integration Test. Each step verifies its JSON contract before proceeding.
            </p>
            <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-teal-200 dark:border-teal-900/50 text-[11px] font-mono text-teal-700 dark:text-teal-400">
              Goal ──▶ [Phase 1: DB] ➔ [Phase 2: API] ➔ [Phase 3: UI] ──▶ ✅ Verified Output
            </div>
          </div>
        </div>

        {/* ✍️ HANDWRITTEN INSTRUCTOR NOTE */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-amber-50/90 dark:bg-amber-500/10 border border-amber-300 dark:border-amber-500/30 shadow-sm sm:-rotate-0.5 transition-transform">
          <div className="flex items-start gap-2.5">
            <span className="text-lg">✍️</span>
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-amber-950 dark:text-amber-300 font-mono uppercase tracking-wider block">
                Instructor Note • Modular Architecture
              </span>
              <p className="text-xs sm:text-sm text-amber-950 dark:text-amber-200 font-handwriting leading-snug">
                &quot;Treat task decomposition just like refactoring a 5,000-line monolithic function into clean, pure micro-functions. If any subtask fails, you only need to re-run that specific node rather than restarting the entire pipeline!&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE 4 DECOMPOSITION TOPOLOGIES (INTERACTIVE GRID) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30 text-teal-700 dark:text-teal-400 font-mono text-xs font-bold">
            Section 2 • Architectural Topologies
          </span>
          <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
        </div>

        <div className="space-y-1">
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            The 4 Execution Topologies
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
            Select a topology below to inspect its execution graph and code implementation:
          </p>
        </div>

        {/* 2x2 MOBILE / 4-COL DESKTOP SYMMETRICAL CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3.5">
          {strategies.map((strat) => {
            const Icon = strat.icon;
            const isSelected = selectedStrategy === strat.id;

            return (
              <button
                key={strat.id}
                onClick={() => setSelectedStrategy(strat.id)}
                className={`p-3 sm:p-4 rounded-xl border text-left transition-all relative flex flex-col justify-between min-h-[145px] sm:min-h-[160px] touch-manipulation active:scale-95 ${
                  isSelected
                    ? "bg-white dark:bg-slate-900 border-teal-500 ring-2 ring-teal-500/20 shadow-md"
                    : "bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-2 rounded-lg ${strat.bg} ${strat.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                    )}
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-tight">
                    {strat.title}
                  </h4>
                  <p className="text-[10px] sm:text-xs font-mono text-teal-700 dark:text-teal-400 mt-0.5">
                    {strat.tagline}
                  </p>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mt-2">
                  {strat.desc}
                </p>
              </button>
            );
          })}
        </div>

        {/* Dynamic Deep-Dive Inspection Box */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStrategy.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400">
                  Active Topology: {currentStrategy.title}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  {currentStrategy.badge}
                </span>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                Inspect Implementation
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {currentStrategy.desc}
            </p>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 overflow-x-auto">
              <pre className="text-[11px] sm:text-xs text-emerald-400 leading-relaxed">
                <code>{currentStrategy.codeSnippet}</code>
              </pre>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* 💡 HANDWRITTEN MENTAL MODEL NOTE */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-teal-50/90 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30 shadow-sm">
          <div className="flex items-start gap-2.5">
            <span className="text-lg">💡</span>
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-teal-950 dark:text-teal-300 font-mono uppercase tracking-wider block">
                Mental Model • The General Contractor
              </span>
              <p className="text-xs sm:text-sm text-teal-950 dark:text-teal-200 font-handwriting leading-snug">
                &quot;A master contractor doesn&apos;t pour the foundation, wire the circuits, and install plumbing simultaneously in one room. They draft a blueprint, hire specialized subcontractors, and parallelize trades that don&apos;t physically block each other.&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: STATIC DAGS VS DYNAMIC RE-PLANNING */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30 text-teal-700 dark:text-teal-400 font-mono text-xs font-bold">
            Section 3 • Decision Matrix
          </span>
          <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
        </div>

        <div className="space-y-1">
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Static Pipelines vs. Dynamic Planning Agents
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
            When building production agentic systems, one of your first architectural decisions is choosing between a compile-time fixed pipeline and a runtime dynamic loop:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 space-y-2 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                Static Decomposition (DAG)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-50 dark:bg-sky-500/10 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-500/30">
                Predictable
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              All subtasks and transitions are pre-compiled in code. The LLM only executes individual steps, never changing the route.
            </p>
            <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1 pt-1">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Zero risk of infinite agent loops
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Deterministic, audit-ready compliance
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                Fragile when unexpected runtime roadblocks occur
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 space-y-2 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                Dynamic Decomposition (Agentic)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30">
                Adaptive
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              The agent evaluates the environment, invents subtasks on the fly, and generates new plan branches when tools return errors.
            </p>
            <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1 pt-1">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Solves open-ended research &amp; debugging tasks
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Self-heals around failing APIs or missing files
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                Higher token cost and latency variance
              </li>
            </ul>
          </div>
        </div>

        {/* 📌 CORE RULE NOTE */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-sky-50/90 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/30 shadow-sm">
          <div className="flex items-start gap-2.5">
            <span className="text-lg">📌</span>
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-sky-950 dark:text-sky-300 font-mono uppercase tracking-wider block">
                The Goldilocks Rule of Decomposition
              </span>
              <p className="text-xs sm:text-sm text-sky-950 dark:text-sky-200 font-handwriting leading-snug">
                &quot;Default to static deterministic pipelines whenever steps are known in advance (e.g., ETL, document ingestion, KYC). Only reach for dynamic re-planning when the agent must explore unfamiliar APIs or open-ended web environments.&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: IN-CONTEXT SIMULATION (TaskDecompositionVisualizer) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30 text-teal-700 dark:text-teal-400 font-mono text-xs font-bold">
            Section 4 • Interactive Simulator
          </span>
          <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
        </div>

        <TaskDecompositionVisualizer />
      </section>

      {/* SECTION 5: HANDS-ON CODE EXECUTOR (DecompositionCodeExecutor) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30 text-teal-700 dark:text-teal-400 font-mono text-xs font-bold">
            Section 5 • Hands-On Code Laboratory
          </span>
          <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
        </div>

        <DecompositionCodeExecutor />

        {/* 📝 PRO-TIP NOTE */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-amber-50/90 dark:bg-amber-500/10 border border-amber-300 dark:border-amber-500/30 shadow-sm">
          <div className="flex items-start gap-2.5">
            <span className="text-lg">📝</span>
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-amber-950 dark:text-amber-300 font-mono uppercase tracking-wider block">
                Production Pro-Tip • Step Budgeting
              </span>
              <p className="text-xs sm:text-sm text-amber-950 dark:text-amber-200 font-handwriting leading-snug">
                &quot;When deploying dynamic re-planning agents, always enforce a strict `max_subtasks=10` guardrail. Unbounded agents can get trapped in recursive re-planning loops that burn your entire API budget in minutes!&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: COMMON MISCONCEPTIONS (TRAPS) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30 text-rose-700 dark:text-rose-400 font-mono text-xs font-bold">
            Section 6 • Production Gotchas
          </span>
          <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-500/30 bg-rose-50/50 dark:bg-rose-950/10 space-y-2">
            <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold text-xs font-mono uppercase">
              <AlertTriangle className="w-4 h-4" />
              TRAP #1: Micro-Decomposition Hell
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Splitting a straightforward task (like &quot;summarize meeting notes&quot;) into 12 distinct subtasks adds massive network serialization overhead and creates 12 distinct failure points.
            </p>
            <p className="text-xs text-rose-800 dark:text-rose-300 font-semibold pt-1">
              Fix: Decompose only when subtasks require different tools, separate rate limits, or isolated context windows.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-950/10 space-y-2">
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-xs font-mono uppercase">
              <AlertTriangle className="w-4 h-4" />
              TRAP #2: Blind Concurrency &amp; Race Conditions
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Firing worker agents in parallel without immutable state leads to race conditions where Task B overwrites memory variables while Task A is actively reading them.
            </p>
            <p className="text-xs text-amber-800 dark:text-amber-300 font-semibold pt-1">
              Fix: Keep parallel workers completely stateless. Collate their outputs via a fan-in reducer pattern.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 7: KEY TAKEAWAYS & KNOWLEDGE CHECK */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30 text-teal-700 dark:text-teal-400 font-mono text-xs font-bold">
            Section 7 • Key Takeaways &amp; Quiz
          </span>
          <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
        </div>

        <div className="p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 space-y-3">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
            Summary Checklist
          </h4>
          <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
              <span>
                <strong>Decomposition transforms open-ended chaos into verifiable steps:</strong> Smaller subproblems reduce token context saturation and enable isolated schema validation.
              </span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
              <span>
                <strong>Parallelize whenever dependencies allow:</strong> Independent tasks should always run via async concurrency (`asyncio.gather`), slashing runtime latency by ~50%.
              </span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
              <span>
                <strong>Static for compliance, dynamic for discovery:</strong> Use pre-compiled DAGs for predictable enterprise workflows; reserve dynamic re-planning for open-ended problem solving.
              </span>
            </div>
          </div>
        </div>

        {/* Expandable Quiz Container */}
        <div className="pt-2">
          {!showQuiz ? (
            <button
              onClick={() => setShowQuiz(true)}
              className="w-full py-3.5 px-4 rounded-xl border border-teal-200 dark:border-teal-500/30 bg-teal-50/60 dark:bg-teal-500/10 hover:bg-teal-100/60 dark:hover:bg-teal-500/20 text-teal-800 dark:text-teal-300 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-sm touch-manipulation active:scale-[0.99]"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Take Knowledge Check (3 Questions)</span>
            </button>
          ) : (
            <Module1_3Quiz />
          )}
        </div>
      </section>

      {/* SECTION 8: BRIDGE TO MODULE 1.4 */}
      <section className="pt-4">
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-r from-teal-50/70 via-slate-50 to-sky-50/70 dark:from-teal-950/20 dark:via-slate-900/40 dark:to-sky-950/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div className="space-y-1">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400">
              Next Step in Level 1
            </span>
            <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Module 1.4: Spectrum of Autonomy in AI Systems
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Explore when to keep humans in the loop vs granting full autonomous tool execution.
            </p>
          </div>

          <Link
            href="/learn/level-1/module-1-4"
            className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center gap-2 transition shadow-sm shrink-0 touch-manipulation active:scale-95"
          >
            <span>Proceed to 1.4</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
