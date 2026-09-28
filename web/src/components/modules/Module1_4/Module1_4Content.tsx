"use client";

import React from "react";
import Link from "next/link";
import {
  Sliders,
  Sparkles,
  Bot,
  UserCheck,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Layers,
  Cpu,
  Workflow,
  Quote,
  Terminal,
  FileText,
  Calendar,
  Mail,
  FileCode,
} from "lucide-react";
import AutonomySpectrumVisualizer from "./AutonomySpectrumVisualizer";
import GraduatedAutonomySimulator from "./GraduatedAutonomySimulator";
import Module1_4Quiz from "./Module1_4Quiz";

export default function Module1_4Content() {
  return (
    <div className="space-y-12">
      {/* Friendly Tutor Introduction */}
      <section className="rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/80 to-slate-950/80 p-6 md:p-8 backdrop-blur-sm relative overflow-hidden shadow-xl">
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <div className="p-3 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-teal-400 shrink-0">
            <Sliders className="w-6 h-6" />
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400">
                Architectural Governance
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs font-mono text-slate-400">
                Foundations &amp; Architecture
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Hello and welcome! In this lesson, we will master the Spectrum of Autonomy in AI Agents.
            </h2>

            <p className="text-sm md:text-base text-slate-300 leading-relaxed">
              In software engineering, beginners often imagine AI autonomy as a black-or-white binary: either you write rigid, hardcoded code, or you let an unpredictable autonomous agent run wild.
            </p>

            <p className="text-sm md:text-base text-slate-300 leading-relaxed">
              In real-world production, <strong className="text-teal-400">autonomy is never binary—it is a continuous spectrum</strong>.
              As AI pioneer <strong className="text-white">Andrew Ng</strong> famously put it:
            </p>

            {/* Andrew Ng Quote Card */}
            <div className="p-4 rounded-xl border border-teal-500/30 bg-teal-500/5 flex items-start gap-3 my-2">
              <Quote className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <blockquote className="text-sm md:text-base italic text-slate-100 font-medium">
                  &ldquo;The question isn&apos;t agents vs. workflows. It&apos;s how much autonomy does your use case need?&rdquo;
                </blockquote>
                <span className="text-xs font-mono text-teal-400 block font-semibold">
                  — Andrew Ng
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed">
              In this module, we will explore the 6 levels of autonomy, compare structured agentic workflows against autonomous agents, analyze two landmark industry case studies (Gemini Meeting Notes vs. Claude Code), and master <strong>Graduated Autonomy with Human-in-the-Loop</strong> governance.
            </p>
          </div>
        </div>
      </section>

      {/* Part 1: The 6-Level Autonomy Spectrum Visualizer */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 font-mono text-xs font-bold">
            Part 1 • The Autonomy Spectrum
          </span>
          <div className="h-px bg-slate-800 flex-1" />
        </div>

        <div className="space-y-3">
          <h3 className="text-2xl font-extrabold text-white tracking-tight">
            The 6 Tiers of Control in Modern LLM Systems
          </h3>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Every step along this spectrum shifts authority from deterministic human code to LLM decision-making. Click each level below to inspect who controls outputs, pathways, and tool selection.
          </p>
        </div>

        <AutonomySpectrumVisualizer />
      </section>

      {/* Part 2: Workflows vs. Autonomous Agents */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 font-mono text-xs font-bold">
            Part 2 • Workflows vs. Agents
          </span>
          <div className="h-px bg-slate-800 flex-1" />
        </div>

        <div className="space-y-3">
          <h3 className="text-2xl font-extrabold text-white tracking-tight">
            Agentic Workflows vs. Autonomous Agents
          </h3>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            How do you decide between a bounded, graph-based workflow and a self-governing autonomous agent?
          </p>
        </div>

        {/* Side-by-Side Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Agentic Workflows */}
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/50 space-y-4 hover:border-slate-700 transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-violet-400 px-2.5 py-0.5 rounded bg-violet-500/10 border border-violet-500/20">
                Bounded Governance
              </span>
              <span className="text-xs font-mono text-slate-500">Graph of Nodes &amp; Edges</span>
            </div>

            <div>
              <h4 className="text-lg font-bold text-white flex items-center gap-2">
                <Workflow className="w-5 h-5 text-violet-400" />
                Agentic Workflows
              </h4>
              <p className="text-xs md:text-sm text-slate-300 mt-2 leading-relaxed">
                The engineer explicitly designs the graph topology. The LLM makes decisions strictly within predefined boundaries, and tool execution is programmatically wired.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-850 space-y-2 text-xs font-mono">
              <span className="text-teal-400 font-bold block">🎯 When to Use Workflows:</span>
              <ul className="text-slate-300 space-y-1 list-disc list-inside">
                <li>Critical tasks requiring strict compliance and audits</li>
                <li>Fixed business logic with deterministic SLAs</li>
                <li>When predictable costs and debugging are top priorities</li>
              </ul>
            </div>
          </div>

          {/* Autonomous Agents */}
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/50 space-y-4 hover:border-slate-700 transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-amber-400 px-2.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                Self-Directed Loop
              </span>
              <span className="text-xs font-mono text-slate-500">Emergent Execution</span>
            </div>

            <div>
              <h4 className="text-lg font-bold text-white flex items-center gap-2">
                <Bot className="w-5 h-5 text-amber-400" />
                Autonomous Agents
              </h4>
              <p className="text-xs md:text-sm text-slate-300 mt-2 leading-relaxed">
                The agent decides what tools to use, plans its own course of action, inspects intermediate results, and can modify its own execution pathway at runtime.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-850 space-y-2 text-xs font-mono">
              <span className="text-amber-400 font-bold block">🎯 When to Use Autonomous Agents:</span>
              <ul className="text-slate-300 space-y-1 list-disc list-inside">
                <li>Exploratory tasks with unknown steps and environments</li>
                <li>Complex code debugging and repository navigation</li>
                <li>Open-ended research, synthesis, and creative problem-solving</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 4 Decision Vectors Grid */}
        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-950 space-y-4">
          <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider text-teal-400">
            The 4 Architectural Decision Vectors
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-850 space-y-1">
              <span className="text-slate-400 block font-bold">1. Task Predictability</span>
              <p className="text-slate-300 text-[11px]">
                Predictable ➔ Lower autonomy (Workflow)
                <br />
                Unpredictable ➔ Higher autonomy (Agent)
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-850 space-y-1">
              <span className="text-slate-400 block font-bold">2. Risk Tolerance</span>
              <p className="text-slate-300 text-[11px]">
                High Stakes ➔ Lower autonomy (HITL Gate)
                <br />
                Low Stakes ➔ Higher autonomy
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-850 space-y-1">
              <span className="text-slate-400 block font-bold">3. Need for Explainability</span>
              <p className="text-slate-300 text-[11px]">
                Must Explain Every Step ➔ Workflow
                <br />
                Black-Box Acceptable ➔ Agent
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-850 space-y-1">
              <span className="text-slate-400 block font-bold">4. Performance / SLAs</span>
              <p className="text-slate-300 text-[11px]">
                Strict Sub-Second Latency ➔ Workflow
                <br />
                Deep Iterative Quality ➔ Agent Loop
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Part 3: Two Landmark Case Studies */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 font-mono text-xs font-bold">
            Part 3 • Production Case Studies
          </span>
          <div className="h-px bg-slate-800 flex-1" />
        </div>

        <div className="space-y-3">
          <h3 className="text-2xl font-extrabold text-white tracking-tight">
            How Industry Leaders Implement Autonomy
          </h3>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Let&apos;s contrast how Google and Anthropic engineer autonomy for completely different production problem spaces.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Case Study 1: Gemini Meeting Notes */}
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-950 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-sky-400 px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/20">
                Case Study 1
              </span>
              <span className="text-xs font-mono text-slate-500">Agentic Workflow</span>
            </div>

            <h4 className="text-lg font-bold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-sky-400" />
              Gemini Meeting Notes (Google Meet)
            </h4>

            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Objective:</strong> Transform a live Google Meet call into an actionable summary Google Doc and distribute it to all attendees.
            </p>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-850 space-y-2 text-xs font-mono text-slate-300">
              <span className="text-teal-400 font-bold block">Execution Flow:</span>
              <div className="space-y-1 text-[11px]">
                <div>1. Capture audio stream during the meeting</div>
                <div>2. Synthesize key points, decisions, and next steps</div>
                <div>3. Generate structured Google Doc format</div>
                <div>4. Attach doc link to Calendar event &amp; email attendees</div>
              </div>
            </div>

            <div className="text-xs text-slate-400 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              <strong className="text-slate-200">Why a Workflow is Best:</strong> It is a repeatable, bounded pipeline (capture ➔ synthesize ➔ publish ➔ share). An open-ended agent could drift or hallucinate unnecessary actions when predictability and strict SLAs are essential.
            </div>
          </div>

          {/* Case Study 2: Claude Code */}
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-950 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                Case Study 2
              </span>
              <span className="text-xs font-mono text-slate-500">Autonomous Agent</span>
            </div>

            <h4 className="text-lg font-bold text-white flex items-center gap-2">
              <FileCode className="w-5 h-5 text-amber-400" />
              Claude Code (Anthropic CLI)
            </h4>

            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Objective:</strong> Hand the agent a coding goal (&quot;fix bug in auth flow&quot; or &quot;refactor database layer&quot;) and let it drive the solution end-to-end.
            </p>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-850 space-y-2 text-xs font-mono text-slate-300">
              <span className="text-amber-400 font-bold block">Autonomous Loop:</span>
              <div className="space-y-1 text-[11px]">
                <div>1. Explores repository files and grep patterns</div>
                <div>2. Inherits terminal/bash shell tooling</div>
                <div>3. Edits code, runs test suites, reads stack traces</div>
                <div>4. Self-corrects compiler errors until tests pass</div>
              </div>
            </div>

            <div className="text-xs text-slate-400 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              <strong className="text-slate-200">Why Autonomy is Best:</strong> Coding tasks cannot follow a rigid pre-wired flowchart. The sequence of actions depends entirely on what the agent discovers (unexpected errors, missing dependencies, or breaking unit tests).
            </div>
          </div>
        </div>
      </section>

      {/* Part 4: Graduated Autonomy & Human-in-the-Loop Simulator */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 font-mono text-xs font-bold">
            Part 4 • Graduated Autonomy
          </span>
          <div className="h-px bg-slate-800 flex-1" />
        </div>

        <div className="space-y-3">
          <h3 className="text-2xl font-extrabold text-white tracking-tight">
            Graduated Autonomy: The Gold Standard for Production Systems
          </h3>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Most successful enterprise production systems use <strong className="text-teal-400">Graduated Autonomy</strong>: high autonomy for harmless read operations, bounded governance for intermediate workflows, and mandatory <strong className="text-amber-300">Human-in-the-Loop (HITL) approval gates</strong> for irreversible write actions.
          </p>
        </div>

        <GraduatedAutonomySimulator />
      </section>

      {/* Part 5: Knowledge Check Checkpoint */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 font-mono text-xs font-bold">
            Part 5 • Knowledge Check
          </span>
          <div className="h-px bg-slate-800 flex-1" />
        </div>

        <Module1_4Quiz />
      </section>

      {/* Summary & Bridge to Module 1.5 */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              Module 1.4 Summary: Key Takeaways
            </h3>
            <p className="text-xs text-slate-400">
              The four foundational rules of system autonomy and governance
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-850 space-y-1">
            <span className="font-bold text-teal-400 block font-mono text-xs">
              1. Continuous Spectrum
            </span>
            <p className="text-slate-300">
              Autonomy is not binary. Systems span 6 levels, from pure deterministic code to single LLM calls, prompt chains, routers, state machines, and autonomous agents.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-850 space-y-1">
            <span className="font-bold text-teal-400 block font-mono text-xs">
              2. Right Tool for the Job
            </span>
            <p className="text-slate-300">
              Use Agentic Workflows when predictability, compliance, and strict SLAs matter. Reserve Autonomous Agents for exploratory, open-ended tasks like code generation and research.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-850 space-y-1">
            <span className="font-bold text-teal-400 block font-mono text-xs">
              3. Graduated Autonomy
            </span>
            <p className="text-slate-300">
              Grant autonomy for safe, routine read actions. Implement mandatory Human-in-the-Loop authorization gates for high-stakes write and financial operations.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-850 space-y-1">
            <span className="font-bold text-teal-400 block font-mono text-xs">
              4. Always Build Override Mechanisms
            </span>
            <p className="text-slate-300">
              Production architectures must always include kill switches, manual human takeover capabilities, and full audit trails for every agent decision.
            </p>
          </div>
        </div>

        {/* Bridge to Module 1.5 */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">
              Up Next • Module 1.5
            </span>
            <h4 className="text-sm font-bold text-white">
              How AI Agents Use Tools (Read vs. Write Actions, APIs, and Environmental Grounding)
            </h4>
          </div>

          <Link
            href="/learn/level-1/module-1-5"
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition shadow-lg shadow-teal-500/20"
          >
            <span>Continue to Module 1.5</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
