"use client";

import React from "react";
import {
  ShieldCheck,
  Sparkles,
  Layers,
  Activity,
  AlertTriangle,
  Lock,
  ArrowRight,
  CheckCircle2,
  Trophy,
  Compass,
  FileCode,
  Flame,
  Lightbulb,
} from "lucide-react";
import AgentSecurityThreatSimulator from "./AgentSecurityThreatSimulator";
import CorePrinciplesChecklistWorkbench from "./CorePrinciplesChecklistWorkbench";
import Module1_13Quiz from "./Module1_13Quiz";

export default function Module1_13Content() {
  return (
    <div className="space-y-12">
      {/* Teacher Welcome & Capstone Celebration */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-teal-500/10 via-emerald-500/5 to-slate-50 dark:to-slate-950 p-6 md:p-8 relative overflow-hidden transition-colors">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-teal-500/20 text-teal-700 dark:text-teal-300 border border-teal-500/30">
                Module 1.13 • Level 1 Capstone
              </span>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                ~75 min read & laboratory
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Core Principles for Building Agentic Systems
            </h1>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Hello and welcome to our capstone lesson of Level 1! You have journeyed through the full theoretical foundation of modern AI agents—from cognitive loops and vector memories to multi-agent topologies and enterprise ROI. Now, we bring everything together: <strong className="text-slate-900 dark:text-white">What separates fragile academic prototypes from hardened, production-grade agentic systems?</strong>
            </p>
          </div>

          <div className="hidden lg:flex flex-col items-center justify-center p-4 rounded-xl border border-teal-500/30 bg-teal-500/10 shrink-0 text-center w-52 shadow-sm">
            <Trophy className="w-8 h-8 text-teal-600 dark:text-teal-400 mb-2" />
            <span className="text-xs font-mono font-bold text-slate-900 dark:text-white">
              Level 1 Capstone
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Completing the Foundations & Architecture Curriculum
            </span>
          </div>
        </div>
      </div>

      {/* Part 1: The Core Philosophy - Simple Approaches First */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-teal-600 dark:text-teal-400 font-bold flex items-center gap-1.5">
            <Compass className="w-4 h-4" />
            Part 1: The Guiding Philosophy
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mt-1">
            Simple Approaches First (The Complexity Ladder)
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
            The biggest mistake new agent engineers make is jumping directly to an autonomous, multi-agent loop for every problem. Effective agentic systems succeed by maximizing simplicity whenever possible.
          </p>
        </div>

        {/* Complexity Ladder Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between">
            <div>
              <div className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold mb-1">
                Level 1: Prompt Only
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Single LLM Call
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                A single well-crafted prompt with context or RAG retrieval. Predictable, fast, and lowest cost.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-[10px] font-mono text-slate-400">
              When to use: Predefined linear queries, text rewrites, classification.
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between">
            <div>
              <div className="text-[11px] font-mono text-sky-600 dark:text-sky-400 font-bold mb-1">
                Level 2: Prompt Chains
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Deterministic Pipelines
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Sequential prompts with programmatic checkpoints. Step B only runs after Step A passes validation.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-[10px] font-mono text-slate-400">
              When to use: Fixed multi-step tasks, document summarization pipelines.
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between">
            <div>
              <div className="text-[11px] font-mono text-purple-600 dark:text-purple-400 font-bold mb-1">
                Level 3: Graph Workflows
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                State Machines (LangGraph)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Tasks with known steps but conditional branching, parallel fan-out, and reflection loops.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-[10px] font-mono text-slate-400">
              When to use: Support routing, multi-criteria validation, code review loops.
            </div>
          </div>

          <div className="p-4 rounded-xl border border-teal-500/40 bg-teal-500/10 dark:bg-teal-500/5 flex flex-col justify-between">
            <div>
              <div className="text-[11px] font-mono text-teal-700 dark:text-teal-400 font-bold mb-1">
                Level 4: Autonomous Agents
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Dynamic ReAct Loops
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                Open-ended reasoning where the exact sequence of tool calls cannot be predicted in advance.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-teal-500/20 text-[10px] font-mono text-teal-600 dark:text-teal-400">
              When to use: Deep web research, repository bug fixing, dynamic incident triage.
            </div>
          </div>
        </div>
      </section>

      {/* Part 2: Critical Tradeoffs - Autonomy vs Predictability */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5">
            <Layers className="w-4 h-4" />
            Part 2: The Critical Trade-offs
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mt-1">
            Autonomy vs Predictability: The Golden Dial
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
            In system architecture, every knob you turn carries an inverse cost. More autonomy gives an agent incredible adaptability to novel inputs, but drastically reduces predictability, auditability, and deterministic guarantees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
              Autonomy vs. Predictability
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              When you give an agent freedom to decide which tool to call next, you unlock creativity and edge-case handling. However, you also introduce variance: the agent might take 2 steps on Monday and 8 steps on Tuesday for the identical input.
            </p>
            <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 pt-1">
              Design Rule: Bound autonomy by wrapping open-ended loops inside strict graph boundaries.
            </div>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              Flexibility vs. Reliability
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Highly dynamic multi-agent topologies (e.g. peer-to-peer swarms) can solve unforeseen hurdles, but are prone to conversational drift, loops, and runaway token bills. Rigid pipelines are 100% reliable but brittle to unexpected schema changes.
            </p>
            <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 pt-1">
              Design Rule: Use deterministic types (Pydantic / Zod) for all tool inputs and outputs.
            </div>
          </div>
        </div>
      </section>

      {/* Part 3: Operational Essentials (Observability & Error Handling) */}
      <section className="p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-5">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-purple-600 dark:text-purple-400 font-bold flex items-center gap-1.5">
            <Activity className="w-4 h-4" />
            Part 3: Production Operations
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mt-1">
            Observability & Error Handling Essentials
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
            You cannot optimize or debug what you cannot observe. In agentic systems, errors are not bugs to be hidden; they are first-class feedback signals for the agent loop.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Observability */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 space-y-2">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-xs">
              <Activity className="w-4 h-4 text-purple-500" />
              Observability & Tracing Pillars
            </div>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 list-disc list-inside">
              <li>
                <strong className="text-slate-800 dark:text-slate-200">Execution Traces:</strong> Persist full chains: Prompt ➔ Reasoning Thought ➔ Tool Call ➔ Raw Observation ➔ Final Text.
              </li>
              <li>
                <strong className="text-slate-800 dark:text-slate-200">Latency & Token Spikes:</strong> Track token consumption and time spent per tool call to catch runaway loops.
              </li>
              <li>
                <strong className="text-slate-800 dark:text-slate-200">Drift Detection:</strong> Monitor user feedback ratings and tool error frequencies over rolling windows.
              </li>
            </ul>
          </div>

          {/* Error Handling */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 space-y-2">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-xs">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              Actionable Error Engineering
            </div>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 list-disc list-inside">
              <li>
                <strong className="text-slate-800 dark:text-slate-200">Informative Error Messages:</strong> Don&apos;t just throw 500. Return: <code className="text-teal-600 dark:text-teal-400 font-mono">&quot;Error: Table &apos;users&apos; not found. Available tables: [accounts, orders].&quot;</code>
              </li>
              <li>
                <strong className="text-slate-800 dark:text-slate-200">Exponential Backoff:</strong> Wrap external web search and LLM calls in jittered exponential retries.
              </li>
              <li>
                <strong className="text-slate-800 dark:text-slate-200">Graceful Degradation:</strong> If the primary tool fails, fall back to a simpler heuristic or escalate to human review.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Part 4: Interactive Security Threat Simulator */}
      <section className="space-y-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-red-600 dark:text-red-400 font-bold flex items-center gap-1.5">
            <Lock className="w-4 h-4" />
            Part 4: Interactive Security Lab
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mt-1">
            Agent Security: The &ldquo;Data is Code&rdquo; Frontier
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
            In standard software, data is separate from code. In LLM agents, natural language data *is* code. Experience how Indirect Prompt Injections, Excessive Agency, and Data Leakage compromise agents—and how to implement defense-in-depth.
          </p>
        </div>

        <AgentSecurityThreatSimulator />
      </section>

      {/* Part 5: Production Readiness Audit Workbench */}
      <section className="space-y-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-teal-600 dark:text-teal-400 font-bold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            Part 5: Production Readiness Workbench
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mt-1">
            Audit Your Agent Architecture
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
            Before deploying any agent to real users, verify your design against the 5 core engineering tenets.
          </p>
        </div>

        <CorePrinciplesChecklistWorkbench />
      </section>

      {/* Part 6: Capstone Knowledge Check Quiz */}
      <section className="space-y-4">
        <Module1_13Quiz />
      </section>

      {/* Level 1 Capstone Graduation Callout & Bridge to Level 2 */}
      <div className="rounded-2xl border border-emerald-500/40 bg-gradient-to-br from-emerald-500/15 via-teal-500/10 to-slate-50 dark:to-slate-950 p-6 md:p-8 relative overflow-hidden transition-colors">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 shrink-0">
            <Trophy className="w-7 h-7" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                Milestone Complete
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                Level 1: 13 of 13 Modules Completed
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white">
              Congratulations! You Have Mastered Foundations & Architecture
            </h3>
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              You now command the complete cognitive theory, memory taxonomies, tool paradigms, multi-agent topologies, RAG architectures, framework compasses, business ROI metrics, and security guardrails of modern autonomous systems.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <div className="text-xs font-mono text-slate-700 dark:text-slate-300">
                🚀 <strong className="text-slate-900 dark:text-white">Ready for Level 2:</strong> Core Implementation & Workflows (Hands-on Python, LangGraph state machines, Pydantic schemas, streaming outputs, and production debugging!).
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
