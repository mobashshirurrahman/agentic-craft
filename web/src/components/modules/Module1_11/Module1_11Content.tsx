"use client";

import React from "react";
import Link from "next/link";
import {
  Workflow,
  Cpu,
  Layers,
  Terminal,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  BookOpen,
  ShieldCheck,
  Compass,
  Code2,
  Users,
} from "lucide-react";
import FrameworkComparisonMatrixVisualizer from "./FrameworkComparisonMatrixVisualizer";
import FrameworkSelectorCompass from "./FrameworkSelectorCompass";
import Module1_11Quiz from "./Module1_11Quiz";

export default function Module1_11Content() {
  return (
    <div className="space-y-12">
      {/* SECTION 1: Friendly Welcome & The Workshop Power Tools Analogy */}
      <section className="rounded-2xl border border-teal-500/30 bg-gradient-to-br from-teal-500/10 via-slate-900/80 to-slate-950 p-6 md:p-8 relative overflow-hidden dark:from-teal-500/10 dark:via-slate-900/80 dark:to-slate-950 light:from-teal-50 light:via-white light:to-slate-50 light:border-teal-200">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-500/40 text-teal-300 dark:text-teal-300 light:text-teal-700 text-xs font-mono font-semibold mb-4">
            <Workflow className="w-3.5 h-3.5" />
            <span>Module 1.11 • Foundations & Architecture</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold text-white dark:text-white light:text-slate-900 tracking-tight">
            Hello and Welcome! Let's Master AI Agent Frameworks
          </h2>

          <p className="mt-3 text-slate-300 dark:text-slate-300 light:text-slate-700 text-sm md:text-base leading-relaxed">
            As you embark on building production agents, you face a crowded landscape of competing frameworks: LangGraph, CrewAI, AutoGen, and the OpenAI Agents SDK.
            <br /><br />
            Which one should you choose? And more importantly, how do you avoid the dreaded trap of <em>Framework Analysis Paralysis</em>? Today, we cut through the hype and evaluate each framework with ruthless engineering pragmatism!
          </p>

          {/* Workshop Tool Analogy */}
          <div className="mt-6 p-5 rounded-xl border border-teal-500/40 bg-teal-950/30 dark:bg-teal-950/30 light:bg-teal-50/80 flex flex-col md:flex-row gap-4 items-start">
            <div className="w-12 h-12 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400 flex-shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white dark:text-white light:text-slate-900 text-base">
                The Workshop Analogy: Hand Chisels vs. Modular Power Tools
              </h4>
              <p className="text-xs md:text-sm text-slate-300 dark:text-slate-300 light:text-slate-700 mt-1 leading-relaxed">
                Could you build a dining table by forging your own nails, cutting trees with a manual hand axe, and carving joints with a pocket knife? Yes, but it will take months!
                <br /><br />
                Frameworks are the industrial power tools of AI engineering:
                <br />
                • <strong>LangGraph</strong> is the precision CNC milling machine—maximum control, programmable coordinates, and zero surprises.
                <br />
                • <strong>CrewAI</strong> is the ready-to-assemble modular furniture kit—fast, intuitive, and lets you assemble a whole room in hours.
                <br />
                • <strong>OpenAI Agents SDK</strong> is the sleek high-torque electric screwdriver—lightweight, minimal, and does one job with pure efficiency.
              </p>
              <p className="text-xs md:text-sm text-teal-300 dark:text-teal-300 light:text-teal-800 mt-2 font-medium">
                You don't need to pledge allegiance to one tool for life. You pick the right instrument for the specific project in front of you!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Why Use a Framework at All? */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
            <Layers className="w-4 h-4" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white dark:text-white light:text-slate-900">
            Why Use an Agent Framework?
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-900/60 dark:bg-slate-900/60 light:bg-white space-y-1.5">
            <span className="font-bold text-xs font-mono uppercase text-teal-400 block">
              1. Battle-Tested Patterns
            </span>
            <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
              Provides pre-built abstractions for Reflection, Planning, Map-Reduce, and Multi-Agent delegation.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-900/60 dark:bg-slate-900/60 light:bg-white space-y-1.5">
            <span className="font-bold text-xs font-mono uppercase text-sky-400 block">
              2. State Management & Checkpoints
            </span>
            <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
              Automatically persists intermediate state across turns, enabling error recovery, crash resilience, and Time Travel.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-900/60 dark:bg-slate-900/60 light:bg-white space-y-1.5">
            <span className="font-bold text-xs font-mono uppercase text-purple-400 block">
              3. Standardized Tool Calling
            </span>
            <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
              Automatically translates Python functions and Pydantic schemas into provider-compliant JSON schemas.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-900/60 dark:bg-slate-900/60 light:bg-white space-y-1.5">
            <span className="font-bold text-xs font-mono uppercase text-amber-400 block">
              4. Observability & Tracing
            </span>
            <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
              Hooks directly into telemetry tools (LangSmith, OpenInference) to track token costs, latency, and reasoning traces.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-900/60 dark:bg-slate-900/60 light:bg-white space-y-1.5 sm:col-span-2 lg:col-span-2">
            <span className="font-bold text-xs font-mono uppercase text-emerald-400 block">
              5. Production Deployment Utilities
            </span>
            <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
              Pre-built streaming endpoints (SSE / WebSockets), async execution schedulers, and queue management out of the box.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: The Big 4 Frameworks (Interactive Matrix) */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
            <Code2 className="w-4 h-4" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white dark:text-white light:text-slate-900">
            The Big 4 Frameworks Head-to-Head
          </h3>
        </div>

        <p className="text-xs md:text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
          Click through each framework to inspect its architectural philosophy, key capabilities, target use cases, and canonical implementation code!
        </p>

        {/* Embedded Framework Matrix */}
        <FrameworkComparisonMatrixVisualizer />
      </section>

      {/* SECTION 4: Interactive Framework Decision Compass */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
            <Compass className="w-4 h-4" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white dark:text-white light:text-slate-900">
            Framework Selector Compass: Pick in 30 Seconds
          </h3>
        </div>

        <p className="text-xs md:text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
          Select your immediate project requirement to get an unambiguous recommendation and eliminate analysis paralysis.
        </p>

        {/* Embedded Compass */}
        <FrameworkSelectorCompass />
      </section>

      {/* SECTION 5: The Critical Mindset — Curing Framework Lock-in Anxiety */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-amber-400">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white dark:text-white light:text-slate-900">
            Curing "Framework Lock-in Anxiety"
          </h3>
        </div>

        <div className="p-6 rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-slate-900/80 to-slate-950 text-xs md:text-sm text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed space-y-3">
          <strong className="text-amber-300 dark:text-amber-300 light:text-amber-700 block text-base">
            The Industry Trap: Spending 3 Weeks Comparing Tools Instead of Building
          </strong>
          <p>
            Junior teams frequently stall for weeks agonizing over whether to use LangGraph, CrewAI, or raw Python. They worry: <em>"What if we pick the wrong framework and get locked in?"</em>
          </p>
          <p>
            Here is the liberating truth: <strong>Foundational agent concepts transfer 100% between frameworks!</strong>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 font-mono text-xs text-slate-200 dark:text-slate-200 light:text-slate-800">
            <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
              ✓ <strong>Pydantic Schemas:</strong> Your tool definitions are 100% portable Python code.
            </div>
            <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
              ✓ <strong>Prompt Engineering:</strong> System instructions transfer verbatim across all engines.
            </div>
            <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
              ✓ <strong>State Mechanics:</strong> Graphs and state dictionaries translate easily.
            </div>
          </div>
          <p className="font-semibold text-teal-300 dark:text-teal-300 light:text-teal-800 pt-1">
            Pick one, build the project, ship to users, and learn from live feedback. You can always refactor later!
          </p>
        </div>
      </section>

      {/* SECTION 6: Concept Check Quiz */}
      <section>
        <Module1_11Quiz />
      </section>

      {/* SECTION 7: Teacher Summary & Bridge to Module 1.12 */}
      <section className="rounded-2xl border border-teal-500/40 bg-gradient-to-r from-teal-500/10 via-slate-900/70 to-slate-950 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 dark:from-teal-500/10 dark:via-slate-900/70 dark:to-slate-950 light:from-teal-50 light:via-white light:to-slate-50 light:border-teal-200">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-teal-400 font-mono text-xs uppercase tracking-wider font-bold">
            <BookOpen className="w-4 h-4" />
            <span>Teacher Summary • Module 1.11 Complete!</span>
          </div>
          <h4 className="text-lg md:text-xl font-bold text-white dark:text-white light:text-slate-900">
            You now possess clarity across the entire agent framework ecosystem!
          </h4>
          <p className="text-xs md:text-sm text-slate-300 dark:text-slate-300 light:text-slate-700 max-w-2xl leading-relaxed">
            We evaluated LangGraph, CrewAI, AutoGen, and the OpenAI Agents SDK, mapped their optimal use cases, and cured framework paralysis.
            <br />
            Next up: <strong>Module 1.12: Real-World Applications for AI Agents</strong>, where we examine multi-million dollar production deployments across Customer Support, Software Engineering, and Deep Research!
          </p>
        </div>

        <Link
          href="/learn/level-1/module-1-12"
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs md:text-sm transition-all shadow-lg hover:shadow-teal-500/20 whitespace-nowrap flex-shrink-0 cursor-pointer"
        >
          <span>Next: Module 1.12</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
