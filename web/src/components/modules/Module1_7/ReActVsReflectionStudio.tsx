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
    <div className="rounded-2xl border border-slate-700/60 bg-slate-900/90 dark:bg-slate-900/90 light:bg-white light:border-slate-300 shadow-xl overflow-hidden my-8">
      {/* Studio Header */}
      <div className="border-b border-slate-700/60 dark:border-slate-700/60 light:border-slate-200 px-5 py-4 bg-slate-800/50 dark:bg-slate-800/50 light:bg-slate-50 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-teal-400 animate-pulse" />
            <h3 className="font-bold text-base md:text-lg text-white dark:text-white light:text-slate-900">
              Interactive Design Patterns & Time-Travel Studio
            </h3>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 mt-0.5">
            Test the original ReAct reasoning trajectory, the Actor-Critic reflection loop, and human state rewinding.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-slate-900/80 dark:bg-slate-900/80 light:bg-slate-200 p-1 rounded-xl border border-slate-700/80 dark:border-slate-700/80 light:border-slate-300">
          <button
            onClick={() => setActiveTab("react")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "react"
                ? "bg-teal-500 text-slate-950 font-bold shadow-sm"
                : "text-slate-400 dark:text-slate-400 light:text-slate-700 hover:text-white dark:hover:text-white"
            }`}
          >
            <Brain className="w-3.5 h-3.5" />
            <span>ReAct Trajectory</span>
          </button>
          <button
            onClick={() => setActiveTab("reflection")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "reflection"
                ? "bg-teal-500 text-slate-950 font-bold shadow-sm"
                : "text-slate-400 dark:text-slate-400 light:text-slate-700 hover:text-white dark:hover:text-white"
            }`}
          >
            <Repeat className="w-3.5 h-3.5" />
            <span>Reflection & Self-Correction</span>
          </button>
          <button
            onClick={() => setActiveTab("time_travel")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "time_travel"
                ? "bg-teal-500 text-slate-950 font-bold shadow-sm"
                : "text-slate-400 dark:text-slate-400 light:text-slate-700 hover:text-white dark:hover:text-white"
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>HITL Time Travel</span>
          </button>
        </div>
      </div>

      {/* TAB 1: ReAct Framework */}
      {activeTab === "react" && (
        <div className="p-5 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: ReAct Step Progression */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider">
                  The Canonical ReAct Trajectory (Yao et al., 2023)
                </span>
                <span className="text-xs font-mono text-slate-400">Step {reactStep} of 4</span>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-50 text-xs font-mono text-slate-300 dark:text-slate-300 light:text-slate-700 mb-4">
                <span className="text-teal-400 font-bold">Query:</span> "Who wrote the book that inspired the movie 'Blade Runner'?"
              </div>

              {/* Step Trajectory Cards */}
              <div className="space-y-3">
                <div
                  className={`p-3.5 rounded-xl border transition-all ${
                    reactStep >= 1
                      ? "border-sky-500/50 bg-sky-500/10 text-sky-200"
                      : "border-slate-800 opacity-40"
                  }`}
                >
                  <div className="flex items-center gap-2 font-mono text-xs font-bold text-sky-400 mb-1">
                    <span>1. Thought 1</span>
                  </div>
                  <p className="text-xs leading-relaxed text-slate-200 dark:text-slate-200 light:text-slate-800 font-mono">
                    "I need to find out which book inspired 'Blade Runner' and who authored it."
                  </p>
                </div>

                <div
                  className={`p-3.5 rounded-xl border transition-all ${
                    reactStep >= 2
                      ? "border-amber-500/50 bg-amber-500/10 text-amber-200"
                      : "border-slate-800 opacity-40"
                  }`}
                >
                  <div className="flex items-center gap-2 font-mono text-xs font-bold text-amber-400 mb-1">
                    <span>2. Action 1 & Observation 1</span>
                  </div>
                  <div className="text-xs font-mono space-y-1">
                    <div className="text-amber-300 dark:text-amber-300 light:text-amber-800">
                      Action: search("Book that inspired 'Blade Runner'")
                    </div>
                    <div className="text-emerald-300 dark:text-emerald-300 light:text-emerald-800 pl-3 border-l-2 border-emerald-500/50">
                      Observation: "'Do Androids Dream of Electric Sheep?' by Philip K. Dick."
                    </div>
                  </div>
                </div>

                <div
                  className={`p-3.5 rounded-xl border transition-all ${
                    reactStep >= 3
                      ? "border-purple-500/50 bg-purple-500/10 text-purple-200"
                      : "border-slate-800 opacity-40"
                  }`}
                >
                  <div className="flex items-center gap-2 font-mono text-xs font-bold text-purple-400 mb-1">
                    <span>3. Thought 2</span>
                  </div>
                  <p className="text-xs leading-relaxed text-slate-200 dark:text-slate-200 light:text-slate-800 font-mono">
                    "Observation confirms the book is 'Do Androids Dream of Electric Sheep?' and the author is Philip K. Dick. Ready to output final answer."
                  </p>
                </div>

                <div
                  className={`p-3.5 rounded-xl border transition-all ${
                    reactStep >= 4
                      ? "border-emerald-500/50 bg-emerald-500/15 text-emerald-200"
                      : "border-slate-800 opacity-40"
                  }`}
                >
                  <div className="flex items-center gap-2 font-mono text-xs font-bold text-emerald-400 mb-1">
                    <span>4. Final Answer</span>
                  </div>
                  <p className="text-xs font-bold text-emerald-300 dark:text-emerald-300 light:text-emerald-800 font-mono">
                    "Philip K. Dick wrote 'Do Androids Dream of Electric Sheep?', which inspired 'Blade Runner'."
                  </p>
                </div>
              </div>
            </div>

            {/* Stepper Controls */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800 dark:border-slate-800 light:border-slate-200">
              <button
                onClick={() => setReactStep(1)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-700 dark:border-slate-700 light:border-slate-300 text-slate-300 dark:text-slate-300 light:text-slate-700 hover:bg-slate-800"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setReactStep((prev) => Math.max(prev - 1, 1))}
                  disabled={reactStep === 1}
                  className="px-3 py-1.5 rounded-lg text-xs border border-slate-700 text-slate-300 disabled:opacity-40"
                >
                  Prev
                </button>
                <button
                  onClick={() => setReactStep((prev) => Math.min(prev + 1, 4))}
                  disabled={reactStep === 4}
                  className="flex items-center gap-1 px-4 py-1.5 rounded-lg text-xs font-bold bg-teal-400 text-slate-950 hover:bg-teal-300 disabled:opacity-40"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Benchmark Hallucination Comparison */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            <div className="bg-slate-800/40 dark:bg-slate-800/40 light:bg-slate-50 border border-slate-700/50 dark:border-slate-700/50 light:border-slate-200 rounded-xl p-4">
              <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold block mb-3">
                HotpotQA Benchmark: Hallucination Rates
              </span>

              {/* Bar 1: Chain of Thought */}
              <div className="space-y-1 mb-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300 dark:text-slate-300 light:text-slate-700">
                    Chain-of-Thought (Reason Only)
                  </span>
                  <span className="text-rose-400 font-bold">14% Hallucination</span>
                </div>
                <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-700">
                  <div className="h-full bg-rose-500 rounded-full" style={{ width: "70%" }} />
                </div>
                <p className="text-[11px] text-slate-400 italic">
                  Hallucinates ungrounded facts when missing external real-world knowledge.
                </p>
              </div>

              {/* Bar 2: ReAct */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300 dark:text-slate-300 light:text-slate-700 font-bold">
                    ReAct (Reason + Act)
                  </span>
                  <span className="text-emerald-400 font-bold">6% Hallucination</span>
                </div>
                <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-700">
                  <div className="h-full bg-emerald-400 rounded-full" style={{ width: "30%" }} />
                </div>
                <p className="text-[11px] text-slate-400 italic">
                  Grounds reasoning in verified tool observations, cutting hallucinations by more than half!
                </p>
              </div>
            </div>

            {/* ReAct Limitations Notice */}
            <div className="bg-slate-950/80 dark:bg-slate-950/80 light:bg-white border border-amber-500/30 rounded-xl p-4 text-xs text-slate-300 dark:text-slate-300 light:text-slate-700 space-y-1.5">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold">
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
        <div className="p-5 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Dual-Node Pipeline */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider block">
              Actor-Critic Reflection Workflow
            </span>

            {/* Phase Selector */}
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setReflectionPhase("draft")}
                className={`py-2 px-2 rounded-lg text-xs font-bold transition-all border ${
                  reflectionPhase === "draft"
                    ? "bg-rose-500/20 text-rose-300 border-rose-500/50"
                    : "bg-slate-900/40 text-slate-400 border-slate-800 hover:text-white"
                }`}
              >
                1. Initial Draft (Flawed)
              </button>
              <button
                onClick={() => setReflectionPhase("critique")}
                className={`py-2 px-2 rounded-lg text-xs font-bold transition-all border ${
                  reflectionPhase === "critique"
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                    : "bg-slate-900/40 text-slate-400 border-slate-800 hover:text-white"
                }`}
              >
                2. Critic Evaluation
              </button>
              <button
                onClick={() => setReflectionPhase("refined")}
                className={`py-2 px-2 rounded-lg text-xs font-bold transition-all border ${
                  reflectionPhase === "refined"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                    : "bg-slate-900/40 text-slate-400 border-slate-800 hover:text-white"
                }`}
              >
                3. Refined Version (Fixed)
              </button>
            </div>

            {/* Dynamic Code/Review Box */}
            <div className="rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200 overflow-hidden bg-slate-950 p-4 font-mono text-xs min-h-[220px]">
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
            <div className="bg-slate-800/40 dark:bg-slate-800/40 light:bg-slate-50 border border-slate-700/50 dark:border-slate-700/50 light:border-slate-200 rounded-xl p-4 space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold block">
                The 3 Core Purposes of Reflection
              </span>

              <div className="p-3 rounded-lg border border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-900/60 dark:bg-slate-900/60 light:bg-white text-xs">
                <strong className="text-purple-300 dark:text-purple-300 light:text-purple-800 block mb-0.5">
                  1. Re-Planning
                </strong>
                <p className="text-slate-300 dark:text-slate-300 light:text-slate-600">
                  Detecting when a plan has failed and pivoting strategy before burning further tokens.
                </p>
              </div>

              <div className="p-3 rounded-lg border border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-900/60 dark:bg-slate-900/60 light:bg-white text-xs">
                <strong className="text-sky-300 dark:text-sky-300 light:text-sky-800 block mb-0.5">
                  2. Tree Search & Exploration
                </strong>
                <p className="text-slate-300 dark:text-slate-300 light:text-slate-600">
                  Generating multiple candidate solutions and exploring alternative paths dynamically.
                </p>
              </div>

              <div className="p-3 rounded-lg border border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-900/60 dark:bg-slate-900/60 light:bg-white text-xs">
                <strong className="text-emerald-300 dark:text-emerald-300 light:text-emerald-800 block mb-0.5">
                  3. Quality Evaluation & Grading
                </strong>
                <p className="text-slate-300 dark:text-slate-300 light:text-slate-600">
                  Using an independent critic prompt to score outputs against security, grammar, or logic rubrics.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Human-in-the-Loop & Time Travel */}
      {activeTab === "time_travel" && (
        <div className="p-5 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Checkpoint Timeline */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider">
                  Checkpoint Persistence Timeline
                </span>
                <span className="text-xs font-mono text-slate-400">Click a checkpoint to rewind state</span>
              </div>

              <div className="space-y-2">
                {[
                  { id: 1, title: "Checkpoint 1: Ingest User Security Prompt", state: "Safe (Read)" },
                  { id: 2, title: "Checkpoint 2: Scan AWS S3 Bucket Permissions", state: "Safe (Read)" },
                  { id: 3, title: "Checkpoint 3: Formulate Emergency Notification", state: "Pending Dispatch (Write)" },
                  { id: 4, title: "Checkpoint 4: Dispatch Email via SendGrid", state: "State Mutated (Dispatched)" },
                ].map((cp) => {
                  const isSelected = activeCheckpoint === cp.id;
                  return (
                    <button
                      key={cp.id}
                      onClick={() => {
                        setActiveCheckpoint(cp.id);
                        setTimeTravelApplied(false);
                      }}
                      className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                        isSelected
                          ? "border-teal-400 bg-teal-500/15 shadow-sm"
                          : "border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-50 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
                            isSelected ? "bg-teal-400 text-slate-950" : "bg-slate-800 text-slate-400"
                          }`}
                        >
                          {cp.id}
                        </div>
                        <span className="text-xs font-semibold text-white dark:text-white light:text-slate-900">
                          {cp.title}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">{cp.state}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Travel Modifier Box */}
            <div className="p-4 rounded-xl border border-teal-500/40 bg-slate-950 dark:bg-slate-950 light:bg-slate-50 space-y-3">
              <div className="flex items-center gap-2 text-teal-400 text-xs font-bold">
                <Undo2 className="w-4 h-4" />
                <span>Time-Travel State Rewind at Checkpoint {activeCheckpoint}</span>
              </div>
              <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
                Notice an issue before dispatching? Rewind execution to Checkpoint 3, edit the tool parameters, and fork execution with the new state!
              </p>

              <div>
                <label className="text-[11px] font-mono text-slate-400 block mb-1">
                  Recipient State Variable:
                </label>
                <input
                  type="text"
                  value={editedRecipient}
                  onChange={(e) => setEditedRecipient(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900 text-white font-mono text-xs focus:outline-none focus:border-teal-400"
                />
              </div>

              <button
                onClick={() => setTimeTravelApplied(true)}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold bg-teal-400 hover:bg-teal-300 text-slate-950 shadow-md transition-all cursor-pointer"
              >
                <History className="w-3.5 h-3.5" />
                <span>Rewind Time & Resume Execution from Checkpoint {activeCheckpoint}</span>
              </button>
            </div>
          </div>

          {/* Right: State Trace */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            <div className="bg-slate-800/40 dark:bg-slate-800/40 light:bg-slate-50 border border-slate-700/50 dark:border-slate-700/50 light:border-slate-200 rounded-xl p-4">
              <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold block mb-2">
                Active State Snapshot
              </span>
              <pre className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-[11px] font-mono text-slate-300 leading-relaxed overflow-x-auto">
                {JSON.stringify(
                  {
                    checkpoint_id: `chk_00${activeCheckpoint}`,
                    timestamp: "2026-09-28T10:14:00Z",
                    tool_call: "send_security_alert",
                    arguments: {
                      recipient: editedRecipient,
                      severity: "CRITICAL_P0",
                      action: timeTravelApplied ? "RESUMED_WITH_OVERRIDE" : "STANDARD_DISPATCH",
                    },
                    status: timeTravelApplied ? "FORKED_HISTORY_CONFIRMED" : "AWAITING_REVIEW",
                  },
                  null,
                  2
                )}
              </pre>
            </div>

            {timeTravelApplied && (
              <div className="p-3.5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-xs text-emerald-300 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Time Travel Successful:</strong> Execution forked from checkpoint #{activeCheckpoint}. The alert will now be delivered strictly to <code>{editedRecipient}</code> without modifying production state erroneously!
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
