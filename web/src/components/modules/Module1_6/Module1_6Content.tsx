"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  Check,
  ArrowRight,
  RotateCw,
  Eye,
  Brain,
  Zap,
  Activity,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Lightbulb,
  Sparkles,
  Layers,
  ShieldAlert,
  Flame,
  Clock,
  Coins,
  Cpu,
} from "lucide-react";
import AgenticLoopFivePhaseVisualizer from "./AgenticLoopFivePhaseVisualizer";
import LoopExecutionEngineWorkbench from "./LoopExecutionEngineWorkbench";
import Module1_6Quiz from "./Module1_6Quiz";

export default function Module1_6Content() {
  const [selectedPhase, setSelectedPhase] = useState<string>("reason");
  const [showQuiz, setShowQuiz] = useState<boolean>(false);

  const loopPhases = [
    {
      id: "perceive",
      title: "1. Perceive",
      tagline: "Context & State Ingestion",
      desc: "Ingests the initial user goal, prior conversation turns, environment files, and active tool catalog.",
      icon: Eye,
      color: "text-sky-600 dark:text-sky-400",
      bg: "bg-sky-50 dark:bg-sky-500/10",
      border: "border-sky-200 dark:border-sky-500/30",
      badge: "Observation Ingestion",
      codeSnippet: `# Phase 1: Ingest environment state and conversation memory
context = {
    "user_prompt": message.content,
    "conversation_history": session.get_messages(),
    "tool_catalog": registry.get_schemas()
}`,
    },
    {
      id: "reason",
      title: "2. Reason",
      tagline: "Plan & Next-Action Choice",
      desc: "Evaluates missing information, formulates an internal plan, and selects the optimal tool call.",
      icon: Brain,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-500/10",
      border: "border-purple-200 dark:border-purple-500/30",
      badge: "LLM Inference Pass",
      codeSnippet: `# Phase 2: Cognitive evaluation pass
thought = llm.generate_thought(context)
action = llm.decide_tool_call(context, thought)
# Output: {"tool": "fetch_stock_quote", "args": {"ticker": "AAPL"}}`,
    },
    {
      id: "act",
      title: "3. Act",
      tagline: "Tool / Environment Execution",
      desc: "Host runtime intercepts the structured call, validates arguments via Pydantic, and invokes the real tool.",
      icon: Zap,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      border: "border-amber-200 dark:border-amber-500/30",
      badge: "Tool Invocation",
      codeSnippet: `# Phase 3: Host runtime dispatches real tool function
validated_args = ToolSchema(**action.args)
raw_result = tool_registry[action.tool](**validated_args.dict())
# Result: {"ticker": "AAPL", "price": 224.50, "status": "200 OK"}`,
    },
    {
      id: "observe",
      title: "4. Observe & Stop",
      tagline: "Feedback & Exit Evaluation",
      desc: "Captures the tool result, checks if the overall goal is satisfied, and decides whether to terminate or re-cycle.",
      icon: Activity,
      color: "text-teal-600 dark:text-teal-400",
      bg: "bg-teal-50 dark:bg-teal-500/10",
      border: "border-teal-200 dark:border-teal-500/30",
      badge: "Grounding & Termination",
      codeSnippet: `# Phase 4: Ground next turn in external reality
context["conversation_history"].append({"role": "tool", "content": raw_result})
if is_goal_complete(context):
    return synthesize_final_response(context) # TERMINATE
# else: loop back to Phase 1 (Perceive)`,
    },
  ];

  const currentPhase =
    loopPhases.find((p) => p.id === selectedPhase) || loopPhases[1];

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
                <span>Understand the closed-loop architecture: Perceive ➔ Reason ➔ Act ➔ Observe ➔ Terminate</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                <span>Master observation grounding: why agents must inspect feedback before planning next steps</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                <span>Implement safety ceilings (`max_iterations`, token budgets) to prevent infinite loop drift</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                <span>Build self-healing loops that recover from flaky tool 500/503 errors autonomously</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: THE HEARTBEAT OF AUTONOMY */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30 text-teal-700 dark:text-teal-400 font-mono text-xs font-bold">
            Section 1 • Autonomous Heartbeat
          </span>
          <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
        </div>

        <div className="space-y-2">
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            The Agentic Loop: How Systems Adapt to Reality
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            In traditional programming, code follows a rigid script from line 1 to line 100 without pausing to re-evaluate whether reality changed. If step 2 throws an unexpected error, the entire program crashes.
          </p>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            An <strong className="text-teal-700 dark:text-teal-400 font-semibold">Agentic Loop</strong> runs an ongoing cycle: after every action, it pauses to <strong className="text-slate-900 dark:text-white">Observe</strong> the real outcome. If a database query fails or a file is missing, the Reasoner pivots and attempts an alternate strategy.
          </p>
        </div>

        {/* Visual Analogy: Script vs Chess Grandmaster */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-1">
          <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-500/30 bg-rose-50/50 dark:bg-rose-950/10 space-y-2">
            <span className="text-xs font-mono font-bold uppercase text-rose-700 dark:text-rose-400 block">
              🤖 Blind Script (Open-Loop)
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Decides all 5 steps in advance. If step 2 encounters a locked table or schema mismatch, steps 3, 4, and 5 fail catastrophically. Zero runtime awareness.
            </p>
            <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/50 text-[11px] font-mono text-rose-700 dark:text-rose-400">
              Input ──▶ [Step 1] ➔ [Step 2: 💥 Error] ➔ [Step 3: Crash]
            </div>
          </div>

          <div className="p-4 rounded-xl border border-teal-200 dark:border-teal-500/30 bg-teal-50/50 dark:bg-teal-950/10 space-y-2">
            <span className="text-xs font-mono font-bold uppercase text-teal-700 dark:text-teal-400 block">
              ♟️ Chess Grandmaster (Closed-Loop)
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Observes the board, calculates candidate moves, executes ONE move, and waits to observe how the opponent responds before calculating the next turn.
            </p>
            <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-teal-200 dark:border-teal-900/50 text-[11px] font-mono text-teal-700 dark:text-teal-400">
              Perceive ──▶ Reason ──▶ Act ──▶ Observe Result ──▶ Iterate/Win
            </div>
          </div>
        </div>

        {/* ✍️ HANDWRITTEN INSTRUCTOR NOTE */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-amber-50/90 dark:bg-amber-500/10 border border-amber-300 dark:border-amber-500/30 shadow-sm sm:-rotate-0.5 transition-transform">
          <div className="flex items-start gap-2.5">
            <span className="text-lg">✍️</span>
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-amber-950 dark:text-amber-300 font-mono uppercase tracking-wider block">
                Instructor Note • The Observation Invariant
              </span>
              <p className="text-xs sm:text-sm text-amber-950 dark:text-amber-200 font-handwriting leading-snug">
                &quot;Never allow an agent to assume its action succeeded! The Observation phase must always catch the real output from the operating system or API. If a file edit returned an error, that exact error string must become part of the agent&apos;s perception for the next turn!&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE 4 CORE PHASES (INTERACTIVE GRID) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30 text-teal-700 dark:text-teal-400 font-mono text-xs font-bold">
            Section 2 • The Loop Phases
          </span>
          <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
        </div>

        <div className="space-y-1">
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            The 4 Operational Phases
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
            Select a phase to inspect its code pattern and runtime responsibilities:
          </p>
        </div>

        {/* 2x2 MOBILE / 4-COL DESKTOP SYMMETRICAL CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3.5">
          {loopPhases.map((phase) => {
            const Icon = phase.icon;
            const isSelected = selectedPhase === phase.id;

            return (
              <button
                key={phase.id}
                onClick={() => setSelectedPhase(phase.id)}
                className={`p-3 sm:p-4 rounded-xl border text-left transition-all relative flex flex-col justify-between min-h-[145px] sm:min-h-[160px] touch-manipulation active:scale-95 ${
                  isSelected
                    ? "bg-white dark:bg-slate-900 border-teal-500 ring-2 ring-teal-500/20 shadow-md"
                    : "bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-2 rounded-lg ${phase.bg} ${phase.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                    )}
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-tight">
                    {phase.title}
                  </h4>
                  <p className="text-[10px] sm:text-xs font-mono text-teal-700 dark:text-teal-400 mt-0.5">
                    {phase.tagline}
                  </p>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mt-2">
                  {phase.desc}
                </p>
              </button>
            );
          })}
        </div>

        {/* Dynamic Deep-Dive Inspection Box */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPhase.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400">
                  Active Phase: {currentPhase.title}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  {currentPhase.badge}
                </span>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                Engine Logic
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {currentPhase.desc}
            </p>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 overflow-x-auto">
              <pre className="text-[11px] sm:text-xs text-emerald-400 leading-relaxed">
                <code>{currentPhase.codeSnippet}</code>
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
                Mental Model • The Thermostat
              </span>
              <p className="text-xs sm:text-sm text-teal-950 dark:text-teal-200 font-handwriting leading-snug">
                &quot;A home thermostat senses current temperature (Perceive), compares it to 72°F (Reason), fires the furnace (Act), checks the thermometer again 5 minutes later (Observe), and turns off when the target is reached (Terminate)!&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE 4 STOPPING CONDITIONS */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30 text-teal-700 dark:text-teal-400 font-mono text-xs font-bold">
            Section 3 • Stopping Boundaries
          </span>
          <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
        </div>

        <div className="space-y-1">
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            The 4 Critical Stopping Conditions
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
            Every autonomous loop must have ironclad exit conditions to prevent infinite loops, runaway API bills, and thread deadlock:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 space-y-2 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                1. Goal Satisfied (Success)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30">
                Happy Path
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              The agent evaluates observations and confirms all subtasks are resolved. Emits final synthesized answer to user and terminates.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 space-y-2 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                2. Step Ceiling (`max_iterations`)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30">
                Safety Guardrail
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              A hard limit on cycle count (e.g. `max_iterations = 10`). Prevents the agent from endlessly cycling if a task is unsolvable.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 space-y-2 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-sky-700 dark:text-sky-400 flex items-center gap-1.5">
                <Coins className="w-3.5 h-3.5" />
                3. Cost / Token Budget Cap
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-50 dark:bg-sky-500/10 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-500/30">
                Financial Guardrail
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Monitors cumulative tokens or dollar spend across cycles. If budget exceeds $0.50 or 50k tokens, halts and asks user for approval.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 space-y-2 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5" />
                4. Unrecoverable Failure Escalation
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-500/30">
                HITL Escalation
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              When tools report missing credentials, 401 unauthorized errors, or critical policy halts, the agent cleanly yields to a human operator.
            </p>
          </div>
        </div>

        {/* 📌 CORE RULE NOTE */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-sky-50/90 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/30 shadow-sm">
          <div className="flex items-start gap-2.5">
            <span className="text-lg">📌</span>
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-sky-950 dark:text-sky-300 font-mono uppercase tracking-wider block">
                The Invariant of Finite Agency
              </span>
              <p className="text-xs sm:text-sm text-sky-950 dark:text-sky-200 font-handwriting leading-snug">
                &quot;Every autonomous loop must have a guaranteed termination bound. Never ship a `while True:` loop in production agentic software. Always enforce `while step &lt; max_iterations:`!&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: IN-CONTEXT SIMULATION (AgenticLoopFivePhaseVisualizer) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30 text-teal-700 dark:text-teal-400 font-mono text-xs font-bold">
            Section 4 • Interactive Simulator
          </span>
          <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
        </div>

        <AgenticLoopFivePhaseVisualizer />
      </section>

      {/* SECTION 5: HANDS-ON WORKBENCH (LoopExecutionEngineWorkbench) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30 text-teal-700 dark:text-teal-400 font-mono text-xs font-bold">
            Section 5 • Hands-On Code Laboratory
          </span>
          <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
        </div>

        <LoopExecutionEngineWorkbench />

        {/* 📝 PRO-TIP NOTE */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-amber-50/90 dark:bg-amber-500/10 border border-amber-300 dark:border-amber-500/30 shadow-sm">
          <div className="flex items-start gap-2.5">
            <span className="text-lg">📝</span>
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-amber-950 dark:text-amber-300 font-mono uppercase tracking-wider block">
                Production Pro-Tip • Context Window Pruning
              </span>
              <p className="text-xs sm:text-sm text-amber-950 dark:text-amber-200 font-handwriting leading-snug">
                &quot;In long multi-cycle loops, observations accumulate rapidly. If an agent calls search tools 8 times, the context window will balloon and slow down inference. Always truncate or summarize intermediate observations older than 3 cycles!&quot;
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
              TRAP #1: The Infinite Retry Loop
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              When a tool returns a 404 Not Found error, a naive agent will repeatedly call the exact same tool with the exact same arguments indefinitely.
            </p>
            <p className="text-xs text-rose-800 dark:text-rose-300 font-semibold pt-1">
              Fix: Implement duplicate action detection. If the agent repeats an action identically, inject a prompt constraint warning it to pivot.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-950/10 space-y-2">
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-xs font-mono uppercase">
              <AlertTriangle className="w-4 h-4" />
              TRAP #2: Blind Open-Loop Execution
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Skipping the observation step and assuming that firing an API call means the state was successfully modified in the database.
            </p>
            <p className="text-xs text-amber-800 dark:text-amber-300 font-semibold pt-1">
              Fix: Always require a verified return code or database select query before confirming task resolution to the user.
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
                <strong>The 5-phase loop is the engine of agency:</strong> Perceive, Reason, Act, Observe, and Iterate form a continuous closed loop that grounds LLMs in real-world feedback.
              </span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
              <span>
                <strong>Observations enable self-healing:</strong> By ingesting error traces into context, an agent can diagnose why a tool call failed and autonomously attempt a corrected query.
              </span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
              <span>
                <strong>Always enforce strict stopping conditions:</strong> Hard ceilings on `max_iterations` and token budgets are non-negotiable guardrails against infinite loop drift.
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
            <Module1_6Quiz />
          )}
        </div>
      </section>

      {/* SECTION 8: BRIDGE TO MODULE 1.7 */}
      <section className="pt-4">
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-r from-teal-50/70 via-slate-50 to-sky-50/70 dark:from-teal-950/20 dark:via-slate-900/40 dark:to-sky-950/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div className="space-y-1">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400">
              Next Step in Level 1
            </span>
            <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Module 1.7: Common Agentic Design Patterns
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Master the architectural patterns: Prompt Chaining, Routing, Parallelization, Orchestrator-Workers, and Evaluator-Optimizer.
            </p>
          </div>

          <Link
            href="/learn/level-1/module-1-7"
            className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center gap-2 transition shadow-sm shrink-0 touch-manipulation active:scale-95"
          >
            <span>Proceed to 1.7</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
