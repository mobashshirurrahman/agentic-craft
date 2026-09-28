"use client";

import React from "react";
import Link from "next/link";
import {
  Workflow,
  GitBranch,
  Network,
  Layers,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Clock,
  Sparkles,
  Cpu,
  Split,
  Compass,
  Check,
  Zap,
} from "lucide-react";
import TaskDecompositionVisualizer from "./TaskDecompositionVisualizer";
import DecompositionCodeExecutor from "./DecompositionCodeExecutor";
import Module1_3Quiz from "./Module1_3Quiz";

export default function Module1_3Content() {
  return (
    <div className="space-y-12">
      {/* Friendly Tutor Introduction */}
      <section className="rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/80 to-slate-950/80 p-6 md:p-8 backdrop-blur-sm relative overflow-hidden shadow-xl">
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <div className="p-3 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-teal-400 shrink-0">
            <Workflow className="w-6 h-6" />
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400">
                Core Cognitive Strategy
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs font-mono text-slate-400">
                Foundations &amp; Architecture
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Hello and welcome! In this lesson, we will master how AI systems tackle complex challenges through Task Decomposition.
            </h2>

            <p className="text-sm md:text-base text-slate-300 leading-relaxed">
              If you ask any human engineer to <strong className="text-white">&quot;Build an entire web application&quot;</strong> in one single breath, they cannot succeed without first breaking that massive goal into smaller, manageable parts: designing the schema, building the API, setting up authentication, and coding the frontend.
            </p>

            <p className="text-sm md:text-base text-slate-300 leading-relaxed">
              AI systems face the exact same reality. Large language models struggle when overloaded with monolithic, open-ended tasks in a single prompt.
              In this module, we will explore <strong className="text-teal-400">Task Decomposition</strong>, compare <strong className="text-sky-300">Static vs. Dynamic planning</strong>, master the <strong className="text-violet-300">3 core execution strategies (Sequential, Parallel, Hierarchical)</strong>, and learn the golden rule to prevent over-engineering.
            </p>
          </div>
        </div>
      </section>

      {/* Part 1: What is Task Decomposition? */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 font-mono text-xs font-bold">
            Part 1 • The Fundamental Capability
          </span>
          <div className="h-px bg-slate-800 flex-1" />
        </div>

        <div className="space-y-3">
          <h3 className="text-2xl font-extrabold text-white tracking-tight">
            What is Task Decomposition and Why Does It Matter?
          </h3>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Task decomposition is the systematic process of breaking a complex, multifaceted goal into smaller, discrete, and independently verifiable subproblems.
          </p>
        </div>

        {/* 3 Core Benefits Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block">
              1. Eliminates Cognitive Overload
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Complex tasks overwhelm single-step generation. Smaller subproblems have concise context windows and allow the model to focus its reasoning tokens with laser precision.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider block">
              2. Independent Verification
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              When a task is broken down, each intermediate output can be validated programmatically (via JSON schema or unit test) before feeding into subsequent steps.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <span className="text-xs font-mono font-bold text-violet-400 uppercase tracking-wider block">
              3. Unlocks Concurrency
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Independent subtasks can be executed simultaneously in parallel across worker threads, dramatically reducing overall wall-clock latency.
            </p>
          </div>
        </div>

        {/* The Concrete Example: Planning a Team Offsite */}
        <div className="p-5 md:p-6 rounded-2xl border border-slate-800 bg-slate-950 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400">
                Real-World Decomposition Pattern
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-slate-400">Master Example</span>
            </div>
            <span className="text-xs font-mono text-slate-500 hidden sm:inline">1 Goal ➔ 8 Subtasks</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800 text-xs font-mono text-slate-300 flex items-center justify-between">
            <div>
              <span className="text-slate-500">Complex Goal: </span>
              <strong className="text-white">&quot;Plan an annual 3-day company team offsite for 50 people&quot;</strong>
            </div>
            <span className="text-xs font-mono text-teal-400 px-2 py-0.5 rounded bg-teal-500/10 border border-teal-500/20">
              Decomposed DAG
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-850">
              <span className="text-slate-500 text-[10px] block">Step 1</span>
              <span className="text-slate-200 font-bold">List Attendees</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-850">
              <span className="text-slate-500 text-[10px] block">Step 2</span>
              <span className="text-slate-200 font-bold">Survey Dates</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-850">
              <span className="text-slate-500 text-[10px] block">Step 3</span>
              <span className="text-slate-200 font-bold">Research Venues</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-850">
              <span className="text-slate-500 text-[10px] block">Step 4</span>
              <span className="text-slate-200 font-bold">Compare Costs</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-850">
              <span className="text-slate-500 text-[10px] block">Step 5</span>
              <span className="text-slate-200 font-bold">Book Venue</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-850">
              <span className="text-slate-500 text-[10px] block">Step 6</span>
              <span className="text-slate-200 font-bold">Arrange Transport</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-850">
              <span className="text-slate-500 text-[10px] block">Step 7</span>
              <span className="text-slate-200 font-bold">Create Agenda</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-850">
              <span className="text-slate-500 text-[10px] block">Step 8</span>
              <span className="text-slate-200 font-bold">Send Invites</span>
            </div>
          </div>
        </div>
      </section>

      {/* Part 2: Static vs. Dynamic Decomposition */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 font-mono text-xs font-bold">
            Part 2 • Planning Paradigms
          </span>
          <div className="h-px bg-slate-800 flex-1" />
        </div>

        <div className="space-y-3">
          <h3 className="text-2xl font-extrabold text-white tracking-tight">
            Static vs. Dynamic Decomposition: How Plans Are Formed
          </h3>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            When an AI system breaks down a problem, does it chart the entire course before taking its first step, or does it navigate dynamically as it learns from the environment?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Static Decomposition */}
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/50 space-y-4 hover:border-slate-700 transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-violet-400 px-2 py-0.5 rounded bg-violet-500/10 border border-violet-500/20">
                Predictable
              </span>
              <span className="text-xs font-mono text-slate-500">Plan Upfront</span>
            </div>

            <div>
              <h4 className="text-lg font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-violet-400" />
                Static Decomposition
              </h4>
              <p className="text-xs md:text-sm text-slate-300 mt-2 leading-relaxed">
                The entire execution graph is planned completely upfront before any code or tool runs. The agent follows a fixed sequence regardless of intermediate observations.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-850 space-y-2 text-xs font-mono">
              <span className="text-teal-400 font-bold block">🎯 Best Fit:</span>
              <span className="text-slate-300 block">
                Well-understood tasks in predictable, controlled environments (e.g. data ingestion pipelines, PDF invoice processing, automated code formatters).
              </span>
            </div>
          </div>

          {/* Dynamic Decomposition */}
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/50 space-y-4 hover:border-slate-700 transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                Adaptive
              </span>
              <span className="text-xs font-mono text-slate-500">Plan at Runtime</span>
            </div>

            <div>
              <h4 className="text-lg font-bold text-white flex items-center gap-2">
                <Network className="w-5 h-5 text-amber-400" />
                Dynamic Decomposition
              </h4>
              <p className="text-xs md:text-sm text-slate-300 mt-2 leading-relaxed">
                The plan emerges adaptively during execution. The agent evaluates the results of previous actions, inspects error codes, and synthesizes the next steps on the fly.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-850 space-y-2 text-xs font-mono">
              <span className="text-amber-400 font-bold block">🎯 Best Fit:</span>
              <span className="text-slate-300 block">
                Ambiguous goals, web browsing, debugging unknown codebases, and error-prone environments where the next action depends on live API feedback.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Part 3: The 3 Core Execution Strategies & Simulator */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 font-mono text-xs font-bold">
            Part 3 • Execution Strategies
          </span>
          <div className="h-px bg-slate-800 flex-1" />
        </div>

        <div className="space-y-3">
          <h3 className="text-2xl font-extrabold text-white tracking-tight">
            Sequential, Parallel, and Hierarchical Execution
          </h3>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Once subtasks are identified, how should they execute? The choice of strategy directly dictates system throughput, latency, and fault tolerance.
          </p>
        </div>

        {/* Embed Interactive Strategy Simulator */}
        <TaskDecompositionVisualizer />

        {/* 3 Strategy Comparison Table */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden">
          <div className="p-4 border-b border-slate-800 bg-slate-900/50">
            <h4 className="text-sm font-bold text-white">
              Strategy Trade-Off &amp; Selection Guide
            </h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300 font-mono">
              <thead className="bg-slate-900/80 text-slate-400 text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="p-3.5 border-b border-slate-800">Strategy</th>
                  <th className="p-3.5 border-b border-slate-800">When to Use</th>
                  <th className="p-3.5 border-b border-slate-800 text-emerald-400">Key Advantages</th>
                  <th className="p-3.5 border-b border-slate-800 text-amber-400">Trade-offs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850">
                <tr>
                  <td className="p-3.5 font-bold text-white">Sequential</td>
                  <td className="p-3.5">Strict step dependencies (Output A required for Input B)</td>
                  <td className="p-3.5 text-emerald-400">Easy to track, inspect, and debug</td>
                  <td className="p-3.5 text-amber-300">Highest latency; bottlenecks at slow steps</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-white">Parallel</td>
                  <td className="p-3.5">Completely independent tasks with zero shared mutable state</td>
                  <td className="p-3.5 text-emerald-400">Fastest completion; max resource utilization</td>
                  <td className="p-3.5 text-amber-300">Requires fork-join synchronization logic</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-white">Hierarchical</td>
                  <td className="p-3.5">Complex tasks with multi-tier coordination requirements</td>
                  <td className="p-3.5 text-emerald-400">Optimizes speed and specialized domain depth</td>
                  <td className="p-3.5 text-amber-300">Most complex architecture to orchestrate</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Part 4: Hands-on Code Studio & Best Practices */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 font-mono text-xs font-bold">
            Part 4 • Code Studio &amp; Best Practices
          </span>
          <div className="h-px bg-slate-800 flex-1" />
        </div>

        <DecompositionCodeExecutor />

        {/* 3 Best Practices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 space-y-1">
            <span className="font-bold text-teal-400 text-xs font-mono block">
              1. Clear Boundaries
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every subtask must define an explicit input signature and typed output schema (e.g. Pydantic). Avoid overlapping responsibilities between tasks.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 space-y-1">
            <span className="font-bold text-sky-400 text-xs font-mono block">
              2. Appropriate Granularity
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Do not make subtasks too coarse (which re-introduces hallucination) or too micro (which wastes latency on communication overhead).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 space-y-1">
            <span className="font-bold text-violet-400 text-xs font-mono block">
              3. Minimize Dependencies
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Design tasks so state is decoupled wherever possible. Removing unnecessary dependencies converts slow serial chains into fast parallel forks.
            </p>
          </div>
        </div>

        {/* The Golden Warning: Pitfall of Over-Decomposition */}
        <div className="p-6 rounded-2xl border border-amber-500/30 bg-amber-500/5 space-y-4">
          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-300 shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                Critical Engineering Pitfall: Over-Decomposing Simple Tasks
              </span>
              <h3 className="text-lg md:text-xl font-bold text-white">
                Never break down what a modern model can solve in a single call.
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Breaking a straightforward task like <strong className="text-white">&quot;write a welcome email&quot;</strong> into 12 distinct micro-subtasks (e.g., generate greeting ➔ draft body ➔ format signature ➔ check tone) adds enormous network latency, multiplies your API billing 10x, and creates 12 chances for a task failure.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-amber-500/20 text-xs md:text-sm font-mono text-slate-300">
            <strong className="text-teal-400">💡 Modern Reasoning Model Insight:</strong>
            <br />
            Modern frontier models (with &quot;thinking modes&quot; or extended deliberation) perform internal task decomposition during token inference. If a capable model can achieve the goal reliably in one call, <strong className="text-amber-300">avoid explicit programmatic decomposition</strong>!
          </div>
        </div>
      </section>

      {/* Part 5: Knowledge Check Checkpoint */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 font-mono text-xs font-bold">
            Part 5 • Knowledge Check
          </span>
          <div className="h-px bg-slate-800 flex-1" />
        </div>

        <Module1_3Quiz />
      </section>

      {/* Summary & Bridge to Module 1.4 */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              Module 1.3 Summary: Key Takeaways
            </h3>
            <p className="text-xs text-slate-400">
              The four foundational rules for building robust task-decomposed systems
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-850 space-y-1">
            <span className="font-bold text-teal-400 block font-mono text-xs">
              1. Decomposition Tames Complexity
            </span>
            <p className="text-slate-300">
              Decomposing big goals into smaller subtasks prevents LLM cognitive overload and enables granular programmatic output validation.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-850 space-y-1">
            <span className="font-bold text-teal-400 block font-mono text-xs">
              2. Static vs. Dynamic
            </span>
            <p className="text-slate-300">
              Use static pipelines for predictable domains with known steps; reserve dynamic agent planning for uncertain or error-prone environments.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-850 space-y-1">
            <span className="font-bold text-teal-400 block font-mono text-xs">
              3. Match the Execution Strategy
            </span>
            <p className="text-slate-300">
              Use Sequential when dependencies exist, Parallel when subproblems are decoupled, and Hierarchical when coordinating multi-level specialist squads.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-850 space-y-1">
            <span className="font-bold text-teal-400 block font-mono text-xs">
              4. Don&apos;t Over-Decompose
            </span>
            <p className="text-slate-300">
              Always balance granularity against latency and token cost. If a modern reasoning model can solve the task in a single inference call, let it do so.
            </p>
          </div>
        </div>

        {/* Bridge to Module 1.4 */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">
              Up Next • Module 1.4
            </span>
            <h4 className="text-sm font-bold text-white">
              The Spectrum of Autonomy in AI Agents (From Human-in-the-Loop to Full Autonomy)
            </h4>
          </div>

          <Link
            href="/learn/level-1/module-1-4"
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition shadow-lg shadow-teal-500/20"
          >
            <span>Continue to Module 1.4</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
