"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  Check,
  ArrowRight,
  Sliders,
  Bot,
  UserCheck,
  ShieldCheck,
  AlertTriangle,
  HelpCircle,
  Lightbulb,
  Quote,
  Layers,
  Sparkles,
  GitFork,
  Code2,
  Workflow,
  Compass,
} from "lucide-react";
import AutonomySpectrumVisualizer from "./AutonomySpectrumVisualizer";
import GraduatedAutonomySimulator from "./GraduatedAutonomySimulator";
import Module1_4Quiz from "./Module1_4Quiz";

export default function Module1_4Content() {
  const [selectedTier, setSelectedTier] = useState<string>("workflows");
  const [showQuiz, setShowQuiz] = useState<boolean>(false);

  const tiers = [
    {
      id: "code",
      title: "1. Deterministic",
      tagline: "Levels 1 & 2",
      desc: "Traditional code controls 100% of execution. LLM acts as an isolated pure text function.",
      icon: Code2,
      color: "text-slate-600 dark:text-slate-400",
      bg: "bg-slate-100 dark:bg-slate-500/10",
      border: "border-slate-200 dark:border-slate-800",
      badge: "Zero Risk",
      codeSnippet: `# Level 2: Isolated Single Pass
summary = llm.generate(f"Summarize document: {user_doc}")
render_ui(summary) # Code handles 100% of routing and validation`,
    },
    {
      id: "workflows",
      title: "2. Workflows",
      tagline: "Levels 3 & 4",
      desc: "Fixed pipelines and intelligent LLM routers. Step sequences are bounded by human code.",
      icon: Layers,
      color: "text-sky-600 dark:text-sky-400",
      bg: "bg-sky-50 dark:bg-sky-500/10",
      border: "border-sky-200 dark:border-sky-500/30",
      badge: "Enterprise Standard",
      codeSnippet: `# Level 4: Intelligent Router Pipeline
route = llm.classify(support_ticket) # ["billing", "tech", "sales"]
if route == "billing":
    handle_billing_workflow(ticket)
elif route == "tech":
    handle_tech_workflow(ticket)`,
    },
    {
      id: "state_machine",
      title: "3. Evaluator Loop",
      tagline: "Level 5",
      desc: "Cycles and self-correction within a fixed state machine. Can iterate up to N times.",
      icon: Workflow,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      border: "border-amber-200 dark:border-amber-500/30",
      badge: "Controlled Cycles",
      codeSnippet: `# Level 5: Evaluator-Optimizer Cycle
code = llm.generate_code(spec)
for attempt in range(max_retries):
    test_result = run_unit_tests(code)
    if test_result.passed: break
    code = llm.fix_code(code, test_result.errors)`,
    },
    {
      id: "autonomous",
      title: "4. Full Agent",
      tagline: "Level 6",
      desc: "The agent invents its own subtasks, selects tools autonomously, and decides when it is finished.",
      icon: Bot,
      color: "text-teal-600 dark:text-teal-400",
      bg: "bg-teal-50 dark:bg-teal-500/10",
      border: "border-teal-200 dark:border-teal-500/30",
      badge: "Maximum Freedom",
      codeSnippet: `# Level 6: Autonomous Agent Loop
agent = ClaudeCodeAgent(tools=[BashTool(), GitTool(), FileEditTool()])
# The agent decides which tools to invoke and when to stop
agent.solve_issue(github_issue="#402")`,
    },
  ];

  const currentTier = tiers.find((t) => t.id === selectedTier) || tiers[1];

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
                <span>Understand why autonomy is a continuous slider, not a binary toggle</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                <span>Navigate the 6 Levels of Autonomy from deterministic code to autonomous loops</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                <span>Analyze real-world architectures: Gemini Meeting Notes vs Claude Code</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                <span>Implement Graduated Autonomy with Human-in-the-Loop (HITL) safety gates</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: THE FALLACY OF THE BINARY */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30 text-teal-700 dark:text-teal-400 font-mono text-xs font-bold">
            Section 1 • Architectural Spectrum
          </span>
          <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
        </div>

        <div className="space-y-2">
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Autonomy is a Continuous Slider, Not a Binary Toggle
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Beginners often assume you must choose between rigid traditional code and completely unconstrained autonomous agents. In enterprise production, 90% of winning AI systems live comfortably in the middle.
          </p>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Software engineers dial autonomy up or down depending on task predictability, error tolerance, and financial risk.
          </p>
        </div>

        {/* Andrew Ng Quote Callout */}
        <div className="p-4 rounded-xl border border-teal-200 dark:border-teal-500/30 bg-teal-50/50 dark:bg-teal-950/20 flex items-start gap-3 shadow-sm">
          <Quote className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <blockquote className="text-xs sm:text-sm italic text-slate-800 dark:text-slate-100 font-medium leading-relaxed">
              &ldquo;The question isn&apos;t agents vs. workflows. It&apos;s how much autonomy does your use case need?&rdquo;
            </blockquote>
            <span className="text-[11px] font-mono text-teal-700 dark:text-teal-400 block font-bold">
              — Andrew Ng, AI Pioneer &amp; Founder of DeepLearning.AI
            </span>
          </div>
        </div>

        {/* Visual Analogy: Cruise Control vs Self-Driving */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-1">
          <div className="p-4 rounded-xl border border-sky-200 dark:border-sky-500/30 bg-sky-50/50 dark:bg-sky-950/10 space-y-2">
            <span className="text-xs font-mono font-bold uppercase text-sky-700 dark:text-sky-400 block">
              🚗 Bounded Autonomy (Cruise Control)
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              The car maintains speed and lane position, but the human driver steers, navigates intersections, and applies brakes when needed. High predictability and guaranteed safety boundaries.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-teal-200 dark:border-teal-500/30 bg-teal-50/50 dark:bg-teal-950/10 space-y-2">
            <span className="text-xs font-mono font-bold uppercase text-teal-700 dark:text-teal-400 block">
              🚀 High Autonomy (Robotaxi)
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              The car chooses routes, dodges pedestrians, navigates roadwork, and reacts dynamically to unexpected detours without human intervention. Extreme capability, requiring extensive safety monitoring.
            </p>
          </div>
        </div>

        {/* ✍️ HANDWRITTEN INSTRUCTOR NOTE */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-amber-50/90 dark:bg-amber-500/10 border border-amber-300 dark:border-amber-500/30 shadow-sm sm:-rotate-0.5 transition-transform">
          <div className="flex items-start gap-2.5">
            <span className="text-lg">✍️</span>
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-amber-950 dark:text-amber-300 font-mono uppercase tracking-wider block">
                Instructor Note • The Autonomy Dial
              </span>
              <p className="text-xs sm:text-sm text-amber-950 dark:text-amber-200 font-handwriting leading-snug">
                &quot;Never give an AI agent more autonomy than the task requires. If a process can be modeled as a deterministic 3-step DAG, keep it as a workflow. Save Level 6 autonomous loops for ambiguous, exploratory problems like coding and research!&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE 4 TIERS OF CONTROL (INTERACTIVE GRID) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30 text-teal-700 dark:text-teal-400 font-mono text-xs font-bold">
            Section 2 • The 4 Tiers of Control
          </span>
          <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
        </div>

        <div className="space-y-1">
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            The 4 Architectural Control Tiers
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
            Tap a tier below to inspect its code pattern and governance characteristics:
          </p>
        </div>

        {/* 2x2 MOBILE / 4-COL DESKTOP SYMMETRICAL CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3.5">
          {tiers.map((tier) => {
            const Icon = tier.icon;
            const isSelected = selectedTier === tier.id;

            return (
              <button
                key={tier.id}
                onClick={() => setSelectedTier(tier.id)}
                className={`p-3 sm:p-4 rounded-xl border text-left transition-all relative flex flex-col justify-between min-h-[145px] sm:min-h-[160px] touch-manipulation active:scale-95 ${
                  isSelected
                    ? "bg-white dark:bg-slate-900 border-teal-500 ring-2 ring-teal-500/20 shadow-md"
                    : "bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-2 rounded-lg ${tier.bg} ${tier.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                    )}
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-tight">
                    {tier.title}
                  </h4>
                  <p className="text-[10px] sm:text-xs font-mono text-teal-700 dark:text-teal-400 mt-0.5">
                    {tier.tagline}
                  </p>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mt-2">
                  {tier.desc}
                </p>
              </button>
            );
          })}
        </div>

        {/* Dynamic Deep-Dive Inspection Box */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTier.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400">
                  Tier: {currentTier.title}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  {currentTier.badge}
                </span>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                Code Blueprint
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {currentTier.desc}
            </p>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 overflow-x-auto">
              <pre className="text-[11px] sm:text-xs text-emerald-400 leading-relaxed">
                <code>{currentTier.codeSnippet}</code>
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
                Mental Model • Train Tracks vs Off-Roading
              </span>
              <p className="text-xs sm:text-sm text-teal-950 dark:text-teal-200 font-handwriting leading-snug">
                &quot;An agentic workflow is a bullet train on fixed tracks—ultra fast, reliable, and impossible to derail. An autonomous agent is an all-terrain vehicle—it can navigate unmarked wilderness, but requires an alert driver to watch for steep cliffs!&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: INDUSTRY CASE STUDIES */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30 text-teal-700 dark:text-teal-400 font-mono text-xs font-bold">
            Section 3 • Production Case Studies
          </span>
          <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
        </div>

        <div className="space-y-1">
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Industry Architectures Compared
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
            See how modern frontier AI products deliberately choose different positions on the autonomy spectrum:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 space-y-2 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-slate-900 dark:text-white">
                Gemini Meeting Notes (Google Workspace)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-50 dark:bg-sky-500/10 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-500/30">
                Level 3: Workflow
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              When a Google Meet call ends, an agentic workflow executes a deterministic sequence:
            </p>
            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[11px] font-mono text-slate-700 dark:text-slate-300 space-y-1">
              <div>1. Capture transcript audio text</div>
              <div>2. Extract action items &amp; decisions</div>
              <div>3. Generate Google Doc template</div>
              <div>4. Attach Doc to Google Calendar invite</div>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-1">
              Why not full autonomy? The user expects deterministic speed and consistency every single time.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 space-y-2 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-slate-900 dark:text-white">
                Claude Code / Devin (Autonomous Dev)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-500/30">
                Level 6: Autonomous Agent
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Given a complex bug report (&quot;Fix race condition in redis cache&quot;), the agent runs dynamically:
            </p>
            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[11px] font-mono text-slate-700 dark:text-slate-300 space-y-1">
              <div>1. grep_search codebase for redis calls</div>
              <div>2. read_file around the failure point</div>
              <div>3. edit code to implement distributed lock</div>
              <div>4. run `npm test` and iterate until green</div>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-1">
              Why full autonomy? Software engineering is non-deterministic; the agent must navigate unexpected errors dynamically.
            </p>
          </div>
        </div>

        {/* 📌 CORE RULE NOTE */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-sky-50/90 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/30 shadow-sm">
          <div className="flex items-start gap-2.5">
            <span className="text-lg">📌</span>
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-sky-950 dark:text-sky-300 font-mono uppercase tracking-wider block">
                The Architectural Law of Predictability
              </span>
              <p className="text-xs sm:text-sm text-sky-950 dark:text-sky-200 font-handwriting leading-snug">
                &quot;If you can draw your business process on a whiteboard as a flowchart with clear yes/no branches, build it as an Agentic Workflow. If the path to the solution cannot be mapped in advance, deploy an Autonomous Agent with HITL guardrails!&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: IN-CONTEXT SIMULATION (AutonomySpectrumVisualizer) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30 text-teal-700 dark:text-teal-400 font-mono text-xs font-bold">
            Section 4 • Interactive Autonomy Slider
          </span>
          <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
        </div>

        <AutonomySpectrumVisualizer />
      </section>

      {/* SECTION 5: GRADUATED AUTONOMY & HITL SIMULATOR */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30 text-teal-700 dark:text-teal-400 font-mono text-xs font-bold">
            Section 5 • Human-in-the-Loop Governance
          </span>
          <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
        </div>

        <GraduatedAutonomySimulator />

        {/* 📝 PRO-TIP NOTE */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-amber-50/90 dark:bg-amber-500/10 border border-amber-300 dark:border-amber-500/30 shadow-sm">
          <div className="flex items-start gap-2.5">
            <span className="text-lg">📝</span>
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-amber-950 dark:text-amber-300 font-mono uppercase tracking-wider block">
                Production Pro-Tip • Read/Write Policy Separation
              </span>
              <p className="text-xs sm:text-sm text-amber-950 dark:text-amber-200 font-handwriting leading-snug">
                &quot;Always categorize agent tools into idempotent READ operations (fetching records, searching logs) and state-mutating WRITE operations (sending emails, modifying databases, charging credit cards). Grant autonomous execution to reads, but require human confirmation for writes!&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: COMMON MISCONCEPTIONS (TRAPS) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30 text-rose-700 dark:text-rose-400 font-mono text-xs font-bold">
            Section 6 • Production Traps
          </span>
          <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-500/30 bg-rose-50/50 dark:bg-rose-950/10 space-y-2">
            <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold text-xs font-mono uppercase">
              <AlertTriangle className="w-4 h-4" />
              TRAP #1: The Full-Autonomy Ego Trap
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Assuming that giving an agent 100% freedom to decide all steps is inherently superior. In enterprise apps, unnecessary autonomy leads to latency spikes, hallucinations, and customer churn.
            </p>
            <p className="text-xs text-rose-800 dark:text-rose-300 font-semibold pt-1">
              Fix: Start at Level 3 (Workflows). Only increase autonomy when user requirements demand handling unpredictable branches.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-950/10 space-y-2">
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-xs font-mono uppercase">
              <AlertTriangle className="w-4 h-4" />
              TRAP #2: The Over-Gated Paralysis Trap
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Requiring human confirmation for trivial actions (like searching a document or formatting a table). This causes alert fatigue and destroys user productivity.
            </p>
            <p className="text-xs text-amber-800 dark:text-amber-300 font-semibold pt-1">
              Fix: Implement graduated autonomy thresholds: auto-approve low-cost or reversible actions; gate high-consequence operations.
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
                <strong>Autonomy is a spectrum:</strong> Ranging from Level 1 (deterministic code) to Level 6 (fully autonomous loops). Choose the lowest level that reliably solves the problem.
              </span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
              <span>
                <strong>Workflows excel for repeatable paths:</strong> When tasks follow structured procedures, agentic workflows deliver deterministic speed and token efficiency.
              </span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
              <span>
                <strong>Graduated Autonomy provides safety at scale:</strong> Grant autonomous execution for safe, read-only operations while inserting HITL approval gates for irreversible actions.
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
            <Module1_4Quiz />
          )}
        </div>
      </section>

      {/* SECTION 8: BRIDGE TO MODULE 1.5 */}
      <section className="pt-4">
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-r from-teal-50/70 via-slate-50 to-sky-50/70 dark:from-teal-950/20 dark:via-slate-900/40 dark:to-sky-950/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div className="space-y-1">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400">
              Next Step in Level 1
            </span>
            <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Module 1.5: How AI Agents Use Tools
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Master function calling, JSON schemas, environment feedback, and tool error handling.
            </p>
          </div>

          <Link
            href="/learn/level-1/module-1-5"
            className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center gap-2 transition shadow-sm shrink-0 touch-manipulation active:scale-95"
          >
            <span>Proceed to 1.5</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
