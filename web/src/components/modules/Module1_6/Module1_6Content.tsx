"use client";

import React from "react";
import Link from "next/link";
import {
  RotateCw,
  Eye,
  Brain,
  Zap,
  Activity,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  BookOpen,
  Terminal,
  Cpu,
  Layers,
  Flame,
  Clock,
  Coins,
} from "lucide-react";
import AgenticLoopFivePhaseVisualizer from "./AgenticLoopFivePhaseVisualizer";
import LoopExecutionEngineWorkbench from "./LoopExecutionEngineWorkbench";
import Module1_6Quiz from "./Module1_6Quiz";

export default function Module1_6Content() {
  return (
    <div className="space-y-12">
      {/* SECTION 1: Welcome & Intuitive Analogy */}
      <section className="rounded-2xl border border-teal-500/30 bg-gradient-to-br from-teal-500/10 via-slate-900/80 to-slate-950 p-6 md:p-8 relative overflow-hidden dark:from-teal-500/10 dark:via-slate-900/80 dark:to-slate-950 light:from-teal-50 light:via-white light:to-slate-50 light:border-teal-200">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-500/40 text-teal-300 dark:text-teal-300 light:text-teal-700 text-xs font-mono font-semibold mb-4">
            <RotateCw className="w-3.5 h-3.5" />
            <span>Module 1.6 • Foundations & Architecture</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold text-white dark:text-white light:text-slate-900 tracking-tight">
            Hello and Welcome! Let's Master the Agentic Loop
          </h2>

          <p className="mt-3 text-slate-300 dark:text-slate-300 light:text-slate-700 text-sm md:text-base leading-relaxed">
            In Module 1.5, we discovered how tools grant an AI agent the ability to touch the physical world. But how does an agent know <em>what to do first</em>, <em>when to retry if something fails</em>, and <em>when the job is truly finished</em>?
            <br /><br />
            The answer is the heartbeat of all autonomous intelligence: <strong>The Agentic Loop</strong>.
          </p>

          {/* Master Chess Player / Electrician Analogy */}
          <div className="mt-6 p-5 rounded-xl border border-teal-500/40 bg-teal-950/30 dark:bg-teal-950/30 light:bg-teal-50/80 flex flex-col md:flex-row gap-4 items-start">
            <div className="w-12 h-12 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400 flex-shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white dark:text-white light:text-slate-900 text-base">
                The Real-World Analogy: The Chess Grandmaster at the Board
              </h4>
              <p className="text-xs md:text-sm text-slate-300 dark:text-slate-300 light:text-slate-700 mt-1 leading-relaxed">
                Think about how a chess champion plays:
                <br />
                1. <strong>Perceive:</strong> They look at the 64 squares and note every piece's position.
                <br />
                2. <strong>Reason:</strong> They mentally calculate: <em>"If I move knight to f3, black will counter with pawn to d5. What is missing in my defense?"</em>
                <br />
                3. <strong>Act:</strong> They physically move their knight.
                <br />
                4. <strong>Observe:</strong> They watch black's actual response on the board.
                <br />
                5. <strong>Iterate:</strong> Did that move produce checkmate? If yes, game over! If not, they loop back to step 1 with the new board state.
              </p>
              <p className="text-xs md:text-sm text-teal-300 dark:text-teal-300 light:text-teal-800 mt-2 font-medium">
                An AI agent behaves identically. It doesn't blindly guess the whole solution in one shot; it cycles through perception, thought, action, and observation until the goal is fulfilled!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Definition & The 5 Core Phases */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
            <RotateCw className="w-4 h-4" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white dark:text-white light:text-slate-900">
            What is the Agentic Loop?
          </h3>
        </div>

        <div className="rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-900/60 dark:bg-slate-900/60 light:bg-white p-5 md:p-6 space-y-4">
          <p className="text-xs md:text-sm text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed">
            The <strong>Agentic Loop</strong> is the foundational operational cycle that enables an artificial agent to interact autonomously with its dynamic environment. Rather than relying on a static single-turn prompt-response, the agent operates in an iterative feedback loop:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
            <div className="p-3.5 rounded-xl border border-sky-500/40 bg-sky-500/10 text-center">
              <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400 font-bold block mb-1">
                Phase 1
              </span>
              <h4 className="font-bold text-sm text-white dark:text-white light:text-slate-900">Perceive</h4>
              <p className="text-[11px] text-slate-300 dark:text-slate-300 light:text-slate-600 mt-1">
                Ingest state, user goal & tools
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-purple-500/40 bg-purple-500/10 text-center">
              <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 font-bold block mb-1">
                Phase 2
              </span>
              <h4 className="font-bold text-sm text-white dark:text-white light:text-slate-900">Reason</h4>
              <p className="text-[11px] text-slate-300 dark:text-slate-300 light:text-slate-600 mt-1">
                Evaluate missing info & plan move
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-amber-500/40 bg-amber-500/10 text-center">
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block mb-1">
                Phase 3
              </span>
              <h4 className="font-bold text-sm text-white dark:text-white light:text-slate-900">Act</h4>
              <p className="text-[11px] text-slate-300 dark:text-slate-300 light:text-slate-600 mt-1">
                Invoke tool or execute code
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-center">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block mb-1">
                Phase 4
              </span>
              <h4 className="font-bold text-sm text-white dark:text-white light:text-slate-900">Observe</h4>
              <p className="text-[11px] text-slate-300 dark:text-slate-300 light:text-slate-600 mt-1">
                Capture raw feedback & errors
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-teal-500/40 bg-teal-500/10 text-center">
              <span className="text-[10px] font-mono uppercase tracking-wider text-teal-400 font-bold block mb-1">
                Phase 5
              </span>
              <h4 className="font-bold text-sm text-white dark:text-white light:text-slate-900">Iterate</h4>
              <p className="text-[11px] text-slate-300 dark:text-slate-300 light:text-slate-600 mt-1">
                Evaluate goal completion
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Deep Dive into the 5 Phases */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
            <Layers className="w-4 h-4" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white dark:text-white light:text-slate-900">
            Deep-Dive: The Anatomy of Each Phase
          </h3>
        </div>

        <div className="space-y-4">
          {/* Phase 1 */}
          <div className="p-5 rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-900/60 dark:bg-slate-900/60 light:bg-white flex flex-col md:flex-row gap-4">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center flex-shrink-0">
              <Eye className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-sky-400">Phase 1</span>
                <h4 className="text-base font-bold text-white dark:text-white light:text-slate-900">
                  Perception: Understanding Context & Environment
                </h4>
              </div>
              <p className="text-xs md:text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 mt-1 leading-relaxed">
                Perception is how the agent ingests the current state of affairs. Rather than just seeing the raw prompt, the agent constructs a rich holistic view.
              </p>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-slate-400">
                <div className="p-2 rounded bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200">
                  • User queries & instruction parameters
                </div>
                <div className="p-2 rounded bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200">
                  • Multimodal inputs (images, audio, files)
                </div>
                <div className="p-2 rounded bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200">
                  • Conversation history & previous action traces
                </div>
                <div className="p-2 rounded bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200">
                  • Available tools, schemas & environmental limits
                </div>
              </div>
            </div>
          </div>

          {/* Phase 2 */}
          <div className="p-5 rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-900/60 dark:bg-slate-900/60 light:bg-white flex flex-col md:flex-row gap-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center flex-shrink-0">
              <Brain className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-purple-400">Phase 2</span>
                <h4 className="text-base font-bold text-white dark:text-white light:text-slate-900">
                  Reasoning: Analyzing, Planning & Selecting Actions
                </h4>
              </div>
              <p className="text-xs md:text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 mt-1 leading-relaxed">
                The reasoning engine analyzes the perceived information to bridge the gap between where it is and where it needs to be.
              </p>
              <div className="mt-3 p-3 rounded-lg bg-purple-950/20 border border-purple-500/30 text-xs text-purple-200 dark:text-purple-200 light:text-purple-800 font-mono space-y-1">
                <div>1. <strong>Understand the objective:</strong> What is the explicit target outcome?</div>
                <div>2. <strong>Identify available info:</strong> What facts are already verified in context?</div>
                <div>3. <strong>Determine what's missing:</strong> What data gap prevents completing the goal right now?</div>
                <div>4. <strong>Select best action:</strong> Which tool or sub-step can resolve that missing piece?</div>
              </div>
            </div>
          </div>

          {/* Phase 3 */}
          <div className="p-5 rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-900/60 dark:bg-slate-900/60 light:bg-white flex flex-col md:flex-row gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-amber-400">Phase 3</span>
                <h4 className="text-base font-bold text-white dark:text-white light:text-slate-900">
                  Action: Executing the Decided Step
                </h4>
              </div>
              <p className="text-xs md:text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 mt-1 leading-relaxed">
                The agent transitions from thought to deed. It "does" something in the external environment or its internal memory.
              </p>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono text-slate-300 dark:text-slate-300 light:text-slate-700">
                <div className="p-2 rounded bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200">
                  • Calling external APIs & databases
                </div>
                <div className="p-2 rounded bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200">
                  • Executing Python code in a sandbox
                </div>
                <div className="p-2 rounded bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200">
                  • Updating internal state or delegating
                </div>
              </div>
            </div>
          </div>

          {/* Phase 4 */}
          <div className="p-5 rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-900/60 dark:bg-slate-900/60 light:bg-white flex flex-col md:flex-row gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <Activity className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-emerald-400">Phase 4</span>
                <h4 className="text-base font-bold text-white dark:text-white light:text-slate-900">
                  Observation: Examining Results & Feedback
                </h4>
              </div>
              <p className="text-xs md:text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 mt-1 leading-relaxed">
                Crucial! The agent does not assume its action worked. It pauses and inspects the real output returned by the operating system, tool, or API.
              </p>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-slate-400">
                <div className="p-2 rounded bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200">
                  • Tool execution return payload (JSON / text)
                </div>
                <div className="p-2 rounded bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200">
                  • Success or failure status codes (200 vs 500)
                </div>
                <div className="p-2 rounded bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200">
                  • Detailed error traces and stack diagnostics
                </div>
                <div className="p-2 rounded bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200">
                  • Changed external system state
                </div>
              </div>
            </div>
          </div>

          {/* Phase 5 */}
          <div className="p-5 rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-900/60 dark:bg-slate-900/60 light:bg-white flex flex-col md:flex-row gap-4">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center flex-shrink-0">
              <RotateCw className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-teal-400">Phase 5</span>
                <h4 className="text-base font-bold text-white dark:text-white light:text-slate-900">
                  Iteration: Exit Evaluation & Loop Control
                </h4>
              </div>
              <p className="text-xs md:text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 mt-1 leading-relaxed">
                The agent answers the million-dollar question: <em>"Are we done yet?"</em>
              </p>
              <div className="mt-3 p-3 rounded-lg bg-teal-950/20 border border-teal-500/30 text-xs text-teal-200 dark:text-teal-200 light:text-teal-800 font-mono space-y-1">
                <div>• <strong>Is the goal achieved?</strong> If YES ➔ Synthesize final answer & terminate.</div>
                <div>• <strong>Is more information needed?</strong> If YES ➔ Loop back to Phase 1 for another cycle.</div>
                <div>• <strong>Did an error occur that needs fixing?</strong> If YES ➔ Formulate a recovery plan.</div>
                <div>• <strong>Should we try a different approach?</strong> If YES ➔ Pivot strategy.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Interactive 5-Phase Loop Simulator */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
            <Zap className="w-4 h-4" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white dark:text-white light:text-slate-900">
            Interactive 5-Phase Agentic Loop Simulator
          </h3>
        </div>

        <p className="text-xs md:text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
          Test drive the live cycle! Explore <strong>Scenario A</strong> to follow a normal multi-turn task, or switch to <strong>Scenario B</strong> to watch how the loop dynamically self-heals when a database query throws a syntax error.
        </p>

        {/* Embedded Visualizer */}
        <AgenticLoopFivePhaseVisualizer />
      </section>

      {/* SECTION 5: What Makes the Loop Powerful vs. The 4 Gotchas */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white dark:text-white light:text-slate-900">
            The 4 Superpowers & 4 Critical Pitfalls
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Superpowers */}
          <div className="p-5 rounded-xl border border-teal-500/30 bg-teal-500/5 dark:bg-teal-500/5 light:bg-teal-50/50 space-y-3">
            <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider block">
              Why the Agentic Loop is Revolutionary
            </span>
            <ul className="space-y-2.5 text-xs md:text-sm text-slate-300 dark:text-slate-300 light:text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">1.</span>
                <span>
                  <strong>Adaptability:</strong> Unlike hard-coded pipelines, the agent changes course dynamically based on what it observes.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">2.</span>
                <span>
                  <strong>Resilience:</strong> If an API is down or returns a 404, the agent doesn't crash; it retries with alternate parameters or fallback tools.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">3.</span>
                <span>
                  <strong>Completeness:</strong> It persists across multi-turn subtasks until the overarching goal is fully achieved.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">4.</span>
                <span>
                  <strong>Transparency:</strong> Every phase—every thought, tool call, and observation—is logged and auditable in the trace.
                </span>
              </li>
            </ul>
          </div>

          {/* Pitfalls & Watch-outs */}
          <div className="p-5 rounded-xl border border-rose-500/30 bg-rose-500/5 dark:bg-rose-500/5 light:bg-rose-50/50 space-y-3">
            <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider block">
              Watch Out: The 4 Production Gotchas
            </span>
            <ul className="space-y-2.5 text-xs md:text-sm text-slate-300 dark:text-slate-300 light:text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">⚠️</span>
                <span>
                  <strong>Infinite Loops:</strong> An ambiguous prompt or repeating error can cause the agent to loop forever without a safety termination brake.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">⚠️</span>
                <span>
                  <strong>Error Handling:</strong> Never crash your Python host; always return structured error strings so the model can self-correct.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">⚠️</span>
                <span>
                  <strong>Efficiency & Token Costs:</strong> Each iteration consumes LLM context tokens. You must balance thoroughness with latency and budget.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">⚠️</span>
                <span>
                  <strong>Safety & Oversight:</strong> Include checks and balances at each phase, especially Human-in-the-Loop gates for destructive writes.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 6: Hands-on Loop Engine & Guardrails Studio */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
            <Terminal className="w-4 h-4" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white dark:text-white light:text-slate-900">
            Hands-on: Loop Engine & Guardrails Workbench
          </h3>
        </div>

        <p className="text-xs md:text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
          Inspect how an enterprise agent loop is implemented in pure Python. Test what happens when an infinite loop threatens system resources, and observe how the <code className="text-teal-400 font-mono">max_iterations</code> safety ceiling protects your production environment!
        </p>

        {/* Embedded Workbench */}
        <LoopExecutionEngineWorkbench />
      </section>

      {/* SECTION 7: Concept Check Quiz */}
      <section>
        <Module1_6Quiz />
      </section>

      {/* SECTION 8: Wrap-up & Bridge to Module 1.7 */}
      <section className="rounded-2xl border border-teal-500/40 bg-gradient-to-r from-teal-500/10 via-slate-900/70 to-slate-950 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 dark:from-teal-500/10 dark:via-slate-900/70 dark:to-slate-950 light:from-teal-50 light:via-white light:to-slate-50 light:border-teal-200">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-teal-400 font-mono text-xs uppercase tracking-wider font-bold">
            <BookOpen className="w-4 h-4" />
            <span>Teacher Summary • Module 1.6 Complete!</span>
          </div>
          <h4 className="text-lg md:text-xl font-bold text-white dark:text-white light:text-slate-900">
            You have mastered the core heartbeat of autonomous systems!
          </h4>
          <p className="text-xs md:text-sm text-slate-300 dark:text-slate-300 light:text-slate-700 max-w-2xl leading-relaxed">
            We covered the complete 5-phase operational cycle (Perceive ➔ Reason ➔ Act ➔ Observe ➔ Iterate), explored self-healing error recovery, and implemented production guardrails against runaway infinite loops.
            <br />
            Next up: <strong>Module 1.7: Common Agentic Design Patterns</strong>, where we examine classic architectural blueprints like Reflection, Tool Use patterns, Planning, and Multi-Agent Collaboration!
          </p>
        </div>

        <Link
          href="/learn/level-1/module-1-7"
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs md:text-sm transition-all shadow-lg hover:shadow-teal-500/20 whitespace-nowrap flex-shrink-0 cursor-pointer"
        >
          <span>Next: Module 1.7</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
