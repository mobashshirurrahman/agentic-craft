"use client";

import React from "react";
import Link from "next/link";
import {
  Workflow,
  Brain,
  Repeat,
  Layers,
  Users,
  UserCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  BookOpen,
  Terminal,
  Cpu,
  History,
  GitFork,
  FileCode,
  Sliders,
  Edit3,
} from "lucide-react";
import AgenticDesignPatternsExplorer from "./AgenticDesignPatternsExplorer";
import ReActVsReflectionStudio from "./ReActVsReflectionStudio";
import Module1_7Quiz from "./Module1_7Quiz";

export default function Module1_7Content() {
  return (
    <div className="space-y-12">
      {/* SECTION 1: Friendly Welcome & The Film Crew Analogy */}
      <section className="rounded-2xl border border-teal-500/30 bg-gradient-to-br from-teal-500/10 via-slate-900/80 to-slate-950 p-6 md:p-8 relative overflow-hidden dark:from-teal-500/10 dark:via-slate-900/80 dark:to-slate-950 light:from-teal-50 light:via-white light:to-slate-50 light:border-teal-200">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-500/40 text-teal-300 dark:text-teal-300 light:text-teal-700 text-xs font-mono font-semibold mb-4">
            <Workflow className="w-3.5 h-3.5" />
            <span>Module 1.7 • Foundations & Architecture</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold text-white dark:text-white light:text-slate-900 tracking-tight">
            Hello and Welcome! Let's Master Common Agentic Design Patterns
          </h2>

          <p className="mt-3 text-slate-300 dark:text-slate-300 light:text-slate-700 text-sm md:text-base leading-relaxed">
            In our last module, we dissected the 5-phase Agentic Loop. But in production, you can't just unleash a single open-ended loop and hope for the best. Complex real-world systems require <strong>proven architectural design patterns</strong> to ensure reliability, auditability, and speed.
          </p>

          {/* Film Production Crew Analogy */}
          <div className="mt-6 p-5 rounded-xl border border-teal-500/40 bg-teal-950/30 dark:bg-teal-950/30 light:bg-teal-50/80 flex flex-col md:flex-row gap-4 items-start">
            <div className="w-12 h-12 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400 flex-shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white dark:text-white light:text-slate-900 text-base">
                The Real-World Analogy: Directing a Hollywood Blockbuster
              </h4>
              <p className="text-xs md:text-sm text-slate-300 dark:text-slate-300 light:text-slate-700 mt-1 leading-relaxed">
                Imagine shooting a big-budget movie. You wouldn't hire one lone person to write the script, operate the camera, do the stunts, edit the sound, and grade the color simultaneously!
                <br />
                Instead, you use structured roles:
                <br />
                • A <strong>Planner</strong> storyboards the scenes upfront.
                <br />
                • An <strong>Editor</strong> reviews the day's footage and orders reshoots (<strong>Reflection</strong>).
                <br />
                • Multiple crews shoot B-roll across cities concurrently (<strong>Map-Reduce</strong>).
                <br />
                • Specialized experts—sound designers, colorists, stunt coordinators—work together (<strong>Multi-Agent</strong>).
                <br />
                • The Executive Producer retains final cut approval before release (<strong>Human-in-the-Loop</strong>).
              </p>
              <p className="text-xs md:text-sm text-teal-300 dark:text-teal-300 light:text-teal-800 mt-2 font-medium">
                These exact organizational patterns form the structural backbone of robust AI agent engineering!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: The Foundation — The ReAct Framework */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
            <Brain className="w-4 h-4" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white dark:text-white light:text-slate-900">
            The Foundation: The ReAct Framework (Reasoning + Acting)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-900/60 dark:bg-slate-900/60 light:bg-white p-5 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider block mb-1">
                Origins & Core Concept (Yao et al., 2023)
              </span>
              <h4 className="text-base font-bold text-white dark:text-white light:text-slate-900 mb-2">
                What is ReAct?
              </h4>
              <p className="text-xs md:text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
                <strong>ReAct</strong> stands for <strong>Reasoning + Acting</strong>. It is a single-agent framework where the LLM alternates between <em>thinking</em> (writing explicit reasoning thoughts) and <em>doing</em> (performing tool actions), observing the output, and repeating until complete.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 dark:border-slate-800 light:border-slate-100 flex items-center gap-2 text-xs font-mono text-teal-300 dark:text-teal-300 light:text-teal-700">
              <CheckCircle2 className="w-4 h-4 text-teal-400" />
              <span>Thought ➔ Action ➔ Observation ➔ Repeat</span>
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-900/60 dark:bg-slate-900/60 light:bg-white p-5">
            <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider block mb-1">
              Empirical Proof: HotpotQA Benchmark
            </span>
            <h4 className="text-base font-bold text-white dark:text-white light:text-slate-900 mb-2">
              Halving Hallucination Rates
            </h4>
            <p className="text-xs md:text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed mb-3">
              When models only reason (Chain of Thought), they hallucinate because their internal weights lack dynamic world facts. By anchoring thoughts to real tool observations, ReAct slashed hallucinations on the HotpotQA dataset from <strong>14% down to 6%</strong>!
            </p>
            <div className="p-3 rounded-lg bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 text-xs font-mono">
              <div className="flex justify-between text-rose-400">
                <span>Chain-of-Thought (Reason Only):</span>
                <span className="font-bold">14% Hallucination</span>
              </div>
              <div className="flex justify-between text-emerald-400 mt-1">
                <span>ReAct (Reason + Act):</span>
                <span className="font-bold">6% Hallucination (-57%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Limitations of ReAct */}
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 dark:bg-amber-500/5 light:bg-amber-50/50 p-5">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-2">
            <AlertTriangle className="w-4 h-4" />
            <span>Why ReAct Alone is Not Enough (The Need for Patterns)</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs md:text-sm text-slate-300 dark:text-slate-300 light:text-slate-700">
            <div>
              <strong>1. Loop Exit Challenges:</strong> On ambiguous tasks, a basic ReAct loop can get stuck repeatedly generating the same thoughts and actions without progressing.
            </div>
            <div>
              <strong>2. Single-Agent Scalability Bottleneck:</strong> A single agent cannot parallelize work, and its reasoning degrades sharply when presented with more than 15-20 tools at once.
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: The 5 Core Agentic Design Patterns */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
            <Layers className="w-4 h-4" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white dark:text-white light:text-slate-900">
            The 5 Core Agentic Design Patterns
          </h3>
        </div>

        <p className="text-xs md:text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
          To solve the limitations of basic loops, industry practitioners rely on 5 battle-tested structural patterns:
        </p>

        {/* Embedded Interactive Patterns Explorer */}
        <AgenticDesignPatternsExplorer />
      </section>

      {/* SECTION 4: Interactive Studio — ReAct, Reflection, and Time Travel */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
            <Terminal className="w-4 h-4" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white dark:text-white light:text-slate-900">
            Interactive Studio: Trajectories, Self-Correction & Time Travel
          </h3>
        </div>

        <p className="text-xs md:text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
          Step through the original Blade Runner ReAct trajectory, test an Actor-Critic reflection loop that detects exponential code complexity, and practice rewinding state checkpoints using <strong>Time Travel</strong>!
        </p>

        {/* Embedded Studio */}
        <ReActVsReflectionStudio />
      </section>

      {/* SECTION 5: Human-in-the-Loop (HITL) Deep-Dive */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
            <UserCheck className="w-4 h-4" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white dark:text-white light:text-slate-900">
            The 4 Human-in-the-Loop (HITL) Patterns
          </h3>
        </div>

        <p className="text-xs md:text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
          Human-in-the-loop isn't just a generic button; it is implemented in production systems through 4 distinct structural mechanisms:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-900/60 dark:bg-slate-900/60 light:bg-white space-y-1.5">
            <div className="flex items-center gap-2 text-teal-400 font-bold text-sm">
              <ShieldCheck className="w-4 h-4" />
              <span>1. Approval Gate</span>
            </div>
            <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
              The agent pauses execution before calling sensitive or irreversible tools (e.g. approving a database DROP/UPDATE or firing an API that charges a payment card).
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-900/60 dark:bg-slate-900/60 light:bg-white space-y-1.5">
            <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
              <UserCheck className="w-4 h-4" />
              <span>2. Wait for Input</span>
            </div>
            <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
              The agent pauses to proactively ask human operators for missing details or clarifying choices before proceeding (e.g. a customer service agent asking for a tracking number).
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-900/60 dark:bg-slate-900/60 light:bg-white space-y-1.5">
            <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
              <History className="w-4 h-4" />
              <span>3. Time Travel</span>
            </div>
            <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
              Allows operators to inspect past state checkpoints, rewind execution to an earlier point in time, modify state variables or history, and fork execution from that checkpoint.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-900/60 dark:bg-slate-900/60 light:bg-white space-y-1.5">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <Edit3 className="w-4 h-4" />
              <span>4. Review Tool Calls</span>
            </div>
            <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
              A human inspects the exact tool arguments formulated by the model (e.g. reviewing the drafted email body or SQL query) and edits the parameters directly before execution.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6: Why LangGraph & Graph Orchestration are Fundamental */}
      <section className="space-y-4">
        <div className="rounded-xl border border-teal-500/40 bg-gradient-to-r from-teal-500/10 via-slate-900/60 to-transparent p-5 text-xs md:text-sm text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed">
          <strong className="text-teal-300 dark:text-teal-300 light:text-teal-700 block text-base mb-1">
            How Frameworks (Like LangGraph) Power These Patterns
          </strong>
          Notice why linear chains cannot support these patterns! Implementing Reflection, Map-Reduce, and Time Travel requires modeling workflows as <strong>Graphs</strong>:
          <br /><br />
          • <strong>Nodes:</strong> Represent discrete functions, agents, or tools.
          <br />
          • <strong>Edges & Conditional Edges:</strong> Route state dynamically between nodes based on decisions (e.g. routing back to Actor if Critic rejects).
          <br />
          • <strong>Durable Checkpointing (Persistence):</strong> Saves the state dictionary after every node transition, making error recovery and Human-in-the-Loop Time Travel natively possible!
        </div>
      </section>

      {/* SECTION 7: Concept Check Quiz */}
      <section>
        <Module1_7Quiz />
      </section>

      {/* SECTION 8: Teacher Summary & Bridge to Module 1.8 */}
      <section className="rounded-2xl border border-teal-500/40 bg-gradient-to-r from-teal-500/10 via-slate-900/70 to-slate-950 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 dark:from-teal-500/10 dark:via-slate-900/70 dark:to-slate-950 light:from-teal-50 light:via-white light:to-slate-50 light:border-teal-200">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-teal-400 font-mono text-xs uppercase tracking-wider font-bold">
            <BookOpen className="w-4 h-4" />
            <span>Teacher Summary • Module 1.7 Complete!</span>
          </div>
          <h4 className="text-lg md:text-xl font-bold text-white dark:text-white light:text-slate-900">
            You now possess the master blueprints of agentic system architecture!
          </h4>
          <p className="text-xs md:text-sm text-slate-300 dark:text-slate-300 light:text-slate-700 max-w-2xl leading-relaxed">
            We conquered the ReAct framework and its empirical grounding, explored the 5 core design patterns (Planning, Reflection, Map-Reduce, Multi-Agent, and HITL), and mastered state rewinding with Time Travel.
            <br />
            Next up: <strong>Module 1.8: Short-Term and Long-Term Agent Memory</strong>, where we explore how agents remember context across conversations and recall knowledge across months!
          </p>
        </div>

        <Link
          href="/learn/level-1/module-1-8"
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs md:text-sm transition-all shadow-lg hover:shadow-teal-500/20 whitespace-nowrap flex-shrink-0 cursor-pointer"
        >
          <span>Next: Module 1.8</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
