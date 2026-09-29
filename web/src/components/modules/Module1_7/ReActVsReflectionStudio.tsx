"use client";

import React, { useState } from "react";
import {
  Brain,
  Repeat,
  History,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Terminal,
  FileCode,
  Flame,
  UserCheck,
  Edit3,
  Undo2,
  Sparkles,
} from "lucide-react";

export default function ReActVsReflectionStudio() {
  const [activeTab, setActiveTab] = useState<"react" | "reflection" | "time_travel">("react");

  // Tab 1: ReAct States
  const [reactStep, setReactStep] = useState<number>(1);

  // Tab 2: Reflection States
  const [reflectionPhase, setReflectionPhase] = useState<"draft" | "critique" | "refined">("draft");

  // Tab 3: Time Travel States
  const [activeCheckpoint, setActiveCheckpoint] = useState<number>(3);
  const [editedRecipient, setEditedRecipient] = useState<string>("security-team@acmecorp.com");
  const [timeTravelApplied, setTimeTravelApplied] = useState<boolean>(false);

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm dark:shadow-2xl overflow-hidden">
      {/* Studio Header */}
      <div className="border-b border-slate-100 dark:border-slate-800 p-4 sm:p-5 bg-slate-50 dark:bg-slate-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-teal-500 animate-pulse" />
            <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
              Interactive Design Patterns &amp; Time-Travel Studio
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Test the original ReAct reasoning trajectory, the Actor-Critic reflection loop, and human state rewinding
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-white dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm text-xs font-mono self-start sm:self-center">
          <button
            onClick={() => setActiveTab("react")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all touch-manipulation active:scale-95 ${
              activeTab === "react"
                ? "bg-teal-600 text-white font-bold shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Brain className="w-3.5 h-3.5" />
            <span>ReAct Trajectory</span>
          </button>
          <button
            onClick={() => setActiveTab("reflection")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all touch-manipulation active:scale-95 ${
              activeTab === "reflection"
                ? "bg-teal-600 text-white font-bold shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Repeat className="w-3.5 h-3.5" />
            <span>Reflection &amp; Self-Correction</span>
          </button>
          <button
            onClick={() => setActiveTab("time_travel")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all touch-manipulation active:scale-95 ${
              activeTab === "time_travel"
                ? "bg-teal-600 text-white font-bold shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>HITL Time Travel</span>
          </button>
        </div>
      </div>

      {/* TAB 1: ReAct Framework */}
      {activeTab === "react" && (
        <div className="p-4 sm:p-5 grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Column: ReAct Step Progression */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider">
                  The Canonical ReAct Trajectory (Yao et al., 2023)
                </span>
                <span className="text-xs font-mono text-slate-500">Step {reactStep} of 4</span>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-xs font-mono text-slate-800 dark:text-slate-200 mb-4 shadow-sm">
                <span className="text-teal-700 dark:text-teal-400 font-bold">Query:</span> &quot;Who wrote the book that inspired the movie &apos;Blade Runner&apos;?&quot;
              </div>

              {/* Step Trajectory Cards */}
              <div className="space-y-2.5">
                <div
                  className={`p-3.5 rounded-xl border transition-all ${
                    reactStep >= 1
                      ? "border-sky-300 dark:border-sky-500/50 bg-sky-50 dark:bg-sky-500/10 text-sky-950 dark:text-sky-200 shadow-sm"
                      : "border-slate-200 dark:border-slate-800 opacity-40 bg-white dark:bg-slate-950"
                  }`}
                >
                  <div className="flex items-center gap-2 font-mono text-xs font-bold text-sky-700 dark:text-sky-400 mb-1">
                    <span>1. Thought 1</span>
                  </div>
                  <p className="text-xs leading-relaxed font-mono">
                    &quot;I need to find out which book inspired &apos;Blade Runner&apos; and who authored it.&quot;
                  </p>
                </div>

                <div
                  className={`p-3.5 rounded-xl border transition-all ${
                    reactStep >= 2
                      ? "border-amber-300 dark:border-amber-500/50 bg-amber-50 dark:bg-amber-500/10 text-amber-950 dark:text-amber-200 shadow-sm"
                      : "border-slate-200 dark:border-slate-800 opacity-40 bg-white dark:bg-slate-950"
                  }`}
                >
                  <div className="flex items-center gap-2 font-mono text-xs font-bold text-amber-700 dark:text-amber-400 mb-1">
                    <span>2. Action 1 &amp; Observation 1</span>
                  </div>
                  <div className="text-xs font-mono space-y-1">
                    <div className="text-amber-800 dark:text-amber-300">
                      Action: search(&quot;Book that inspired &apos;Blade Runner&apos;&quot;)
                    </div>
                    <div className="text-emerald-800 dark:text-emerald-300 pl-3 border-l-2 border-emerald-500">
                      Observation: &quot;&apos;Do Androids Dream of Electric Sheep?&apos; by Philip K. Dick.&quot;
                    </div>
                  </div>
                </div>

                <div
                  className={`p-3.5 rounded-xl border transition-all ${
                    reactStep >= 3
                      ? "border-purple-300 dark:border-purple-500/50 bg-purple-50 dark:bg-purple-500/10 text-purple-950 dark:text-purple-200 shadow-sm"
                      : "border-slate-200 dark:border-slate-800 opacity-40 bg-white dark:bg-slate-950"
                  }`}
                >
                  <div className="flex items-center gap-2 font-mono text-xs font-bold text-purple-700 dark:text-purple-400 mb-1">
                    <span>3. Thought 2</span>
                  </div>
                  <p className="text-xs leading-relaxed font-mono">
                    &quot;Observation confirms the book is &apos;Do Androids Dream of Electric Sheep?&apos; and the author is Philip K. Dick. Ready to output final answer.&quot;
                  </p>
                </div>

                <div
                  className={`p-3.5 rounded-xl border transition-all ${
                    reactStep >= 4
                      ? "border-emerald-300 dark:border-emerald-500/50 bg-emerald-50 dark:bg-emerald-500/15 text-emerald-950 dark:text-emerald-200 shadow-sm"
                      : "border-slate-200 dark:border-slate-800 opacity-40 bg-white dark:bg-slate-950"
                  }`}
                >
                  <div className="flex items-center gap-2 font-mono text-xs font-bold text-emerald-700 dark:text-emerald-400 mb-1">
                    <span>4. Final Answer</span>
                  </div>
                  <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300 font-mono">
                    &quot;Philip K. Dick wrote &apos;Do Androids Dream of Electric Sheep?&apos;, which inspired &apos;Blade Runner&apos;.&quot;
                  </p>
                </div>
              </div>
            </div>

            {/* Stepper Controls */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setReactStep(1)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 transition touch-manipulation active:scale-95"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setReactStep((prev) => Math.max(prev - 1, 1))}
                  disabled={reactStep === 1}
                  className="px-3 py-1.5 rounded-lg text-xs border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-40 transition touch-manipulation active:scale-95"
                >
                  Prev
                </button>
                <button
                  onClick={() => setReactStep((prev) => Math.min(prev + 1, 4))}
                  disabled={reactStep === 4}
                  className="flex items-center gap-1 px-4 py-1.5 rounded-lg text-xs font-bold bg-teal-600 hover:bg-teal-500 text-white disabled:opacity-40 transition touch-manipulation active:scale-95 shadow-sm"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Benchmark Hallucination Comparison */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm">
              <span className="text-xs font-mono uppercase tracking-wider text-teal-700 dark:text-teal-400 font-bold block mb-3">
                HotpotQA Benchmark: Hallucination Rates
              </span>

              {/* Bar 1: Chain of Thought */}
              <div className="space-y-1 mb-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-700 dark:text-slate-300">
                    Chain-of-Thought (Reason Only)
                  </span>
                  <span className="text-rose-600 dark:text-rose-400 font-bold">14% Hallucination</span>
                </div>
                <div className="h-3 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-300 dark:border-slate-700">
                  <div className="h-full bg-rose-500 rounded-full" style={{ width: "70%" }} />
                </div>
                <p className="text-[11px] text-slate-500 italic">
                  Hallucinates ungrounded facts when missing external real-world knowledge.
                </p>
              </div>

              {/* Bar 2: ReAct */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-700 dark:text-slate-300 font-bold">
                    ReAct (Reason + Act)
                  </span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">6% Hallucination</span>
                </div>
                <div className="h-3 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-300 dark:border-slate-700">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: "30%" }} />
                </div>
                <p className="text-[11px] text-slate-500 italic">
                  Grounds reasoning in verified tool observations, cutting hallucinations by more than half!
                </p>
              </div>
            </div>

            {/* ReAct Limitations Notice */}
            <div className="bg-amber-50/70 dark:bg-amber-950/20 border border-amber-300 dark:border-amber-500/30 rounded-xl p-4 text-xs text-amber-950 dark:text-amber-200 space-y-1.5 shadow-sm">
              <div className="flex items-center gap-1.5 text-amber-800 dark:text-amber-400 font-bold">
                <AlertTriangle className="w-4 h-4" />
                <span>Known Limitations of ReAct</span>
              </div>
              <p className="leading-relaxed">
                1. <strong>Loop Exit Challenges:</strong> Can get stuck cycling the same thoughts without termination.
                <br />
                2. <strong>Single-Agent Bottleneck:</strong> Performance degrades as tool counts exceed 15-20 tools.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Reflection & Self-Correction */}
      {activeTab === "reflection" && (
        <div className="p-4 sm:p-5 grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Column: Dual-Node Pipeline */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <span className="text-xs font-mono font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider block">
              Actor-Critic Reflection Workflow
            </span>

            {/* Phase Selector */}
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setReflectionPhase("draft")}
                className={`py-2 px-2 rounded-lg text-xs font-bold transition-all border touch-manipulation ${
                  reflectionPhase === "draft"
                    ? "bg-rose-50 dark:bg-rose-500/20 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-500/50 shadow-sm"
                    : "bg-white dark:bg-slate-900/40 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800"
                }`}
              >
                1. Initial Draft (Flawed)
              </button>
              <button
                onClick={() => setReflectionPhase("critique")}
                className={`py-2 px-2 rounded-lg text-xs font-bold transition-all border touch-manipulation ${
                  reflectionPhase === "critique"
                    ? "bg-amber-50 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-500/50 shadow-sm"
                    : "bg-white dark:bg-slate-900/40 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800"
                }`}
              >
                2. Critic Evaluation
              </button>
              <button
                onClick={() => setReflectionPhase("refined")}
                className={`py-2 px-2 rounded-lg text-xs font-bold transition-all border touch-manipulation ${
                  reflectionPhase === "refined"
                    ? "bg-emerald-50 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-500/50 shadow-sm"
                    : "bg-white dark:bg-slate-900/40 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800"
                }`}
              >
                3. Refined Version (Fixed)
              </button>
            </div>

            {/* Dynamic Code/Review Box */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs min-h-[220px]">
              {reflectionPhase === "draft" && (
                <div className="space-y-2 text-rose-300">
                  <div className="text-slate-500 text-[11px]"># Actor Output - Initial Draft (Naive O(2^n))</div>
                  <pre>{`def fibonacci(n):
    # CRITIQUE: Exponential complexity, crashes on n > 35!
    # CRITIQUE: Zero type validation, fails on negative input!
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)`}</pre>
                </div>
              )}

              {reflectionPhase === "critique" && (
                <div className="space-y-2 text-amber-300">
                  <div className="text-slate-500 text-[11px]"># Critic Node - Quality Rubric Report</div>
                  <pre>{`Evaluation Rubric Score: 4/10 (FAIL)
Deficiencies Identified:
1. Time Complexity: Recursive calls without memoization cause O(2^n) time.
2. Missing Guardrails: No check for negative numbers (triggers infinite recursion).
3. Type Safety: Missing integer type annotations.

Recommendation for Actor:
- Rewrite with O(n) iterative loop or memoization.
- Add ValueError check for n < 0.`}</pre>
                </div>
              )}

              {reflectionPhase === "refined" && (
                <div className="space-y-2 text-emerald-300">
                  <div className="text-slate-500 text-[11px]"># Actor Refinement - Version 2 (Production Grade)</div>
                  <pre>{`def fibonacci(n: int) -> int:
    """Computes nth Fibonacci number in O(n) time and O(1) space."""
    if not isinstance(n, int) or n < 0:
        raise ValueError("Input 'n' must be a non-negative integer.")
    if n <= 1:
        return n
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b  # Benchmark: Runs n=1000 in < 0.05ms!`}</pre>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: The 3 Pillars of Reflection */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-4">
            <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-3 shadow-sm">
              <span className="text-xs font-mono uppercase tracking-wider text-teal-700 dark:text-teal-400 font-bold block">
                The 3 Core Purposes of Reflection
              </span>

              <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs shadow-sm">
                <strong className="text-purple-700 dark:text-purple-300 block mb-0.5">
                  1. Re-Planning
                </strong>
                <p className="text-slate-600 dark:text-slate-400">
                  Detecting when a plan has failed and pivoting strategy before burning further tokens.
                </p>
              </div>

              <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs shadow-sm">
                <strong className="text-sky-700 dark:text-sky-300 block mb-0.5">
                  2. Tree Search &amp; Exploration
                </strong>
                <p className="text-slate-600 dark:text-slate-400">
                  Generating multiple candidate solutions and exploring alternative paths dynamically.
                </p>
              </div>

              <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs shadow-sm">
                <strong className="text-emerald-700 dark:text-emerald-300 block mb-0.5">
                  3. Quality Evaluation &amp; Grading
                </strong>
                <p className="text-slate-600 dark:text-slate-400">
                  Using an independent critic prompt to score outputs against security, grammar, or logic rubrics.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Human-in-the-Loop & Time Travel */}
      {activeTab === "time_travel" && (
        <div className="p-4 sm:p-5 grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left: Checkpoint Timeline */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider">
                  Checkpoint Persistence Timeline
                </span>
                <span className="text-xs font-mono text-slate-500">
                  LangGraph Memory Saver
                </span>
              </div>

              <div className="space-y-2.5">
                {[
                  { id: 1, name: "Checkpoint 1: Ingest Threat Alert", time: "10:04:02 AM", status: "Clean" },
                  { id: 2, name: "Checkpoint 2: Identify IP Address & Payload", time: "10:04:14 AM", status: "Clean" },
                  { id: 3, name: "Checkpoint 3: Propose Email Dispatch (Flawed Recipient)", time: "10:04:25 AM", status: "Modified" },
                ].map((cp) => (
                  <button
                    key={cp.id}
                    onClick={() => setActiveCheckpoint(cp.id)}
                    className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-center justify-between touch-manipulation ${
                      activeCheckpoint === cp.id
                        ? "border-teal-500 bg-teal-50 dark:bg-teal-500/15 shadow-sm ring-1 ring-teal-500/30"
                        : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    <div>
                      <h5 className="text-xs font-bold text-slate-900 dark:text-white">{cp.name}</h5>
                      <span className="text-[10px] font-mono text-slate-500">{cp.time}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      Step {cp.id}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Travel Modifier Box */}
            <div className="p-4 rounded-xl border border-teal-200 dark:border-teal-500/30 bg-teal-50/50 dark:bg-teal-950/20 space-y-3 shadow-sm">
              <div className="flex items-center gap-2 text-teal-800 dark:text-teal-400 text-xs font-bold">
                <Undo2 className="w-4 h-4" />
                <span>Rewind &amp; Fork Execution from Checkpoint 3</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                The agent originally hallucinated sending this security report to `all-staff@acmecorp.com`. Modify the recipient below and resume execution:
              </p>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={editedRecipient}
                  onChange={(e) => setEditedRecipient(e.target.value)}
                  className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono text-slate-900 dark:text-white"
                />
                <button
                  onClick={() => setTimeTravelApplied(true)}
                  className="px-4 py-1.5 rounded-lg text-xs font-bold bg-teal-600 hover:bg-teal-500 text-white shadow-sm transition touch-manipulation active:scale-95"
                >
                  Apply &amp; Fork State
                </button>
              </div>

              {timeTravelApplied && (
                <div className="p-2.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-500/40 text-emerald-900 dark:text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>
                    State updated! Forked branch created. Recipient set to: <strong>{editedRecipient}</strong>.
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Time Travel Benefits */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-3 shadow-sm">
              <span className="text-xs font-mono uppercase tracking-wider text-teal-700 dark:text-teal-400 font-bold block">
                Why Time Travel is Essential
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                In complex 20-step workflows, re-running from scratch costs significant latency and tokens. Time travel allows humans to:
              </p>
              <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-2 pt-1">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Fix a typo in a tool argument without losing prior steps</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>A/B test different reasoning branches from the same state</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Audit historical decision trajectories for compliance</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
