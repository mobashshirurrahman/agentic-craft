"use client";

import React from "react";
import Link from "next/link";
import {
  Brain,
  HardDrive,
  Cpu,
  Database,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  BookOpen,
  Terminal,
  Zap,
  Layers,
  History,
  Clock,
  KeyRound,
  Network,
  Search,
} from "lucide-react";
import AgentMemoryArchitectureVisualizer from "./AgentMemoryArchitectureVisualizer";
import MemoryStorageComparisonStudio from "./MemoryStorageComparisonStudio";
import Module1_8Quiz from "./Module1_8Quiz";

export default function Module1_8Content() {
  return (
    <div className="space-y-12">
      {/* SECTION 1: Friendly Welcome & The RAM vs SSD Analogy */}
      <section className="rounded-2xl border border-teal-500/30 bg-gradient-to-br from-teal-500/10 via-slate-900/80 to-slate-950 p-6 md:p-8 relative overflow-hidden dark:from-teal-500/10 dark:via-slate-900/80 dark:to-slate-950 light:from-teal-50 light:via-white light:to-slate-50 light:border-teal-200">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-500/40 text-teal-300 dark:text-teal-300 light:text-teal-700 text-xs font-mono font-semibold mb-4">
            <Brain className="w-3.5 h-3.5" />
            <span>Module 1.8 • Foundations & Architecture</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold text-white dark:text-white light:text-slate-900 tracking-tight">
            Hello and Welcome! Let's Master Agent Memory Systems
          </h2>

          <p className="mt-3 text-slate-300 dark:text-slate-300 light:text-slate-700 text-sm md:text-base leading-relaxed">
            Have you ever chatted with an AI bot that seemed brilliant for 5 minutes, but the moment you opened a new tab the next morning, it treated you like a complete stranger?
            <br /><br />
            An AI without memory suffers from perpetual amnesia. Memory transforms a stateless predictive text engine into a trusted, personalized digital colleague that learns your coding habits, respects your enterprise rules, and remembers your preferences across months!
          </p>

          {/* Computer RAM vs SSD Analogy */}
          <div className="mt-6 p-5 rounded-xl border border-teal-500/40 bg-teal-950/30 dark:bg-teal-950/30 light:bg-teal-50/80 flex flex-col md:flex-row gap-4 items-start">
            <div className="w-12 h-12 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400 flex-shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white dark:text-white light:text-slate-900 text-base">
                The Computer Analogy: Fast RAM vs. Durable NVMe SSD
              </h4>
              <p className="text-xs md:text-sm text-slate-300 dark:text-slate-300 light:text-slate-700 mt-1 leading-relaxed">
                Your laptop relies on two distinct memory architectures:
                <br />
                • <strong>RAM (Short-Term Memory):</strong> Super-fast, holds currently open browser tabs and working code variables. But when you power down your computer, RAM vanishes instantly.
                <br />
                • <strong>NVMe SSD (Long-Term Memory):</strong> Permanent, retains your files, operating system, and documents even when the computer is shut down for months.
              </p>
              <p className="text-xs md:text-sm text-teal-300 dark:text-teal-300 light:text-teal-800 mt-2 font-medium">
                Modern AI agents operate on this exact dual architecture: Short-Term Working Context (RAM) for the active conversation, and Long-Term Persistent Stores (SSD) that survive across sessions!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Memory in Action — With vs. Without Memory */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
            <History className="w-4 h-4" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white dark:text-white light:text-slate-900">
            Memory in Action: The Amnesia Contrast
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Without Memory */}
          <div className="rounded-xl border border-rose-500/30 bg-rose-500/5 dark:bg-rose-500/5 light:bg-rose-50/50 p-5 space-y-3">
            <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider block">
              Without Memory (Stateless Amnesia)
            </span>
            <ul className="space-y-2 text-xs md:text-sm text-slate-300 dark:text-slate-300 light:text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span>Treats every single turn and new session as a brand new interaction.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span>Has zero context from previous conversations or past bugs resolved.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span>Cannot learn user preferences or team coding standards.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span>Forces users to tediously re-explain their requirements repeatedly.</span>
              </li>
            </ul>
            <div className="p-3 rounded-lg bg-slate-950 font-mono text-xs text-rose-300">
              User: "My name is Alice." ➔ Agent: "Nice to meet you!"<br />
              User: "What is my name?" ➔ Agent: "I'm sorry, I don't know your name."
            </div>
          </div>

          {/* With Memory */}
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 dark:bg-emerald-500/5 light:bg-emerald-50/50 p-5 space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block">
              With Memory (Cognitive Continuity)
            </span>
            <ul className="space-y-2 text-xs md:text-sm text-slate-300 dark:text-slate-300 light:text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span>References previous interactions and builds continuity over time.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span>Learns user preferences (e.g. prefers Python over JS, uses dark mode).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span>Applies past troubleshooting successes to solve new similar errors.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span>Tracks multi-day project progress across independent sessions.</span>
              </li>
            </ul>
            <div className="p-3 rounded-lg bg-slate-950 font-mono text-xs text-emerald-300">
              User: "My name is Alice." ➔ Agent: "Nice to meet you, Alice!"<br />
              User: "What is my name?" ➔ Agent: "Your name is Alice."
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Short-Term Memory vs. Long-Term Memory */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
            <Layers className="w-4 h-4" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white dark:text-white light:text-slate-900">
            Short-Term Memory vs. Long-Term Memory
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Short-Term */}
          <div className="p-5 rounded-xl border border-sky-500/30 bg-sky-500/5 dark:bg-sky-500/5 light:bg-sky-50/50 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-base text-white dark:text-white light:text-slate-900 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-sky-400" />
                <span>Short-Term Memory</span>
              </h4>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-sky-500/20 text-sky-300">
                Session Scope
              </span>
            </div>
            <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
              Maintains immediate context within a single interaction. Cleared after the session ends.
            </p>
            <div className="space-y-1.5 text-xs font-mono text-slate-300 dark:text-slate-300 light:text-slate-700">
              <div>• <strong>Conversation History:</strong> Recent user/assistant dialogue turns.</div>
              <div>• <strong>Working State:</strong> Active plan, scratchpad, reasoning checkpoints.</div>
              <div>• <strong>Context:</strong> Active project constraints & current domain focus.</div>
              <div>• <strong>Tool Results:</strong> Raw outputs from recently executed APIs.</div>
            </div>
          </div>

          {/* Long-Term */}
          <div className="p-5 rounded-xl border border-teal-500/30 bg-teal-500/5 dark:bg-teal-500/5 light:bg-teal-50/50 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-base text-white dark:text-white light:text-slate-900 flex items-center gap-2">
                <Database className="w-4 h-4 text-teal-400" />
                <span>Long-Term Memory</span>
              </h4>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-teal-500/20 text-teal-300">
                Persistent Across Months
              </span>
            </div>
            <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
              Retains facts, user patterns, and domain experiences across multiple sessions indefinitely.
            </p>
            <div className="space-y-1.5 text-xs font-mono text-slate-300 dark:text-slate-300 light:text-slate-700">
              <div>• <strong>User Profiles:</strong> Identity, roles, tech stacks, preferred tools.</div>
              <div>• <strong>Learned Facts:</strong> System architecture decisions and domain rules.</div>
              <div>• <strong>Historical Interactions:</strong> Previous troubleshooting logs and outcomes.</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: The 3 Classical Types of Long-Term Memory */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white dark:text-white light:text-slate-900">
            The 3 Types of Long-Term Memory
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Semantic Memory */}
          <div className="p-5 rounded-xl border border-purple-500/30 bg-slate-900/60 dark:bg-slate-900/60 light:bg-white space-y-2">
            <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
              <Brain className="w-4 h-4" />
              <span>1. Semantic Memory</span>
            </div>
            <span className="text-[11px] font-mono text-slate-400 block">Facts, Concepts & Preferences</span>
            <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
              Stores generalized factual knowledge about the world, the user, or the enterprise domain.
            </p>
            <div className="p-2.5 rounded bg-slate-950 font-mono text-[11px] text-purple-300">
              Example: "User prefers Python over JavaScript and deploys on AWS ECS."
            </div>
          </div>

          {/* Episodic Memory */}
          <div className="p-5 rounded-xl border border-sky-500/30 bg-slate-900/60 dark:bg-slate-900/60 light:bg-white space-y-2">
            <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
              <Clock className="w-4 h-4" />
              <span>2. Episodic Memory</span>
            </div>
            <span className="text-[11px] font-mono text-slate-400 block">Past Experiences & Events</span>
            <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
              Stores specific biographical episodes and past interactions bound to a time, place, and outcome.
            </p>
            <div className="p-2.5 rounded bg-slate-950 font-mono text-[11px] text-sky-300">
              Example: "On Dec 15, 2024, user reported an authentication bug in auth.py."
            </div>
          </div>

          {/* Procedural Memory */}
          <div className="p-5 rounded-xl border border-emerald-500/30 bg-slate-900/60 dark:bg-slate-900/60 light:bg-white space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <Zap className="w-4 h-4" />
              <span>3. Procedural Memory</span>
            </div>
            <span className="text-[11px] font-mono text-slate-400 block">Instructions, Rules & Policies</span>
            <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
              Stores how actions must be executed: policies, checklist rules, and learned behavioral blueprints.
            </p>
            <div className="p-2.5 rounded bg-slate-950 font-mono text-[11px] text-emerald-300">
              Example: "When user requests a PR review, check for SQL injection & linting first."
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Interactive Visualizer */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
            <Cpu className="w-4 h-4" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white dark:text-white light:text-slate-900">
            Dual-Memory Architecture Explorer (Interactive)
          </h3>
        </div>

        <p className="text-xs md:text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
          Simulate an agent onboarding a user on Day 1, extracting key tech stack facts, and recalling them seamlessly 30 days later in a completely fresh session!
        </p>

        {/* Embedded Visualizer */}
        <AgentMemoryArchitectureVisualizer />
      </section>

      {/* SECTION 6: Memory Writing Strategies & Storage Engines */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
            <Database className="w-4 h-4" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white dark:text-white light:text-slate-900">
            Writing Strategies & Storage Options
          </h3>
        </div>

        {/* Writing Strategies Comparison Table */}
        <div className="rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200 overflow-hidden bg-slate-900/60 dark:bg-slate-900/60 light:bg-white">
          <div className="p-4 border-b border-slate-800 dark:border-slate-800 light:border-slate-200">
            <h4 className="text-sm font-bold text-white dark:text-white light:text-slate-900">
              Writing Strategies: Hot Path (Synchronous) vs. Background (Asynchronous)
            </h4>
          </div>

          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left font-mono">
              <thead className="bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-100 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-3">Aspect</th>
                  <th className="p-3 text-amber-400">Hot Path (Synchronous)</th>
                  <th className="p-3 text-teal-400">Background (Asynchronous)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 dark:divide-slate-800 light:divide-slate-200 text-slate-300 dark:text-slate-300 light:text-slate-700">
                <tr>
                  <td className="p-3 font-bold text-white dark:text-white light:text-slate-900">When</td>
                  <td className="p-3">During active user interaction</td>
                  <td className="p-3">After response is delivered</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white dark:text-white light:text-slate-900">Timing</td>
                  <td className="p-3 text-rose-400">Real-time, blocks response</td>
                  <td className="p-3 text-emerald-400">Separate worker process, 0 latency</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white dark:text-white light:text-slate-900">Pros</td>
                  <td className="p-3">Immediate availability, fully synchronized</td>
                  <td className="p-3">No latency impact, scalable batch processing</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white dark:text-white light:text-slate-900">Cons</td>
                  <td className="p-3">Adds response latency, agent multitasking load</td>
                  <td className="p-3">Delayed availability by a few seconds</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white dark:text-white light:text-slate-900">Best For</td>
                  <td className="p-3">Explicit commands ("Call me Dr. Smith")</td>
                  <td className="p-3">Deep entity extraction & episodic summaries</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Embedded Storage Comparison Studio */}
        <MemoryStorageComparisonStudio />
      </section>

      {/* SECTION 7: The Complete Hybrid Memory Flow */}
      <section className="space-y-4">
        <div className="rounded-xl border border-teal-500/40 bg-gradient-to-r from-teal-500/10 via-slate-900/60 to-transparent p-5 text-xs md:text-sm text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed space-y-3">
          <strong className="text-teal-300 dark:text-teal-300 light:text-teal-700 block text-base">
            The Complete Hybrid Memory Lifecycle
          </strong>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1 font-mono text-xs">
            <div className="p-3 rounded-lg border border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-50 space-y-1">
              <span className="font-bold text-sky-400 block mb-1">1. Reading (Context Preparation):</span>
              <div>• Ingest recent short-term messages from current session.</div>
              <div>• Query long-term vector store for top semantic matches.</div>
              <div>• Merge into system prompt ➔ LLM generates response.</div>
            </div>
            <div className="p-3 rounded-lg border border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-50 space-y-1">
              <span className="font-bold text-teal-400 block mb-1">2. Writing (Memory Update):</span>
              <div>• Immediately append turn to short-term session history.</div>
              <div>• Evaluate importance of facts revealed in user prompt.</div>
              <div>• Asynchronously extract and upsert to long-term vault!</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: Concept Check Quiz */}
      <section>
        <Module1_8Quiz />
      </section>

      {/* SECTION 9: Teacher Summary & Bridge to Module 1.9 */}
      <section className="rounded-2xl border border-teal-500/40 bg-gradient-to-r from-teal-500/10 via-slate-900/70 to-slate-950 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 dark:from-teal-500/10 dark:via-slate-900/70 dark:to-slate-950 light:from-teal-50 light:via-white light:to-slate-50 light:border-teal-200">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-teal-400 font-mono text-xs uppercase tracking-wider font-bold">
            <BookOpen className="w-4 h-4" />
            <span>Teacher Summary • Module 1.8 Complete!</span>
          </div>
          <h4 className="text-lg md:text-xl font-bold text-white dark:text-white light:text-slate-900">
            You now understand how AI Agents remember across time and space!
          </h4>
          <p className="text-xs md:text-sm text-slate-300 dark:text-slate-300 light:text-slate-700 max-w-2xl leading-relaxed">
            We covered Short-Term RAM vs Long-Term SSD persistence, the 3 types of memory (Semantic, Episodic, and Procedural), the Hybrid Hot-Path vs Background writing strategy, and the 4 storage engines.
            <br />
            Next up: <strong>Module 1.9: Comparing Single-Agent and Multi-Agent Architectures</strong>, where we explore when a single agent is enough versus when you must build a team!
          </p>
        </div>

        <Link
          href="/learn/level-1/module-1-9"
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs md:text-sm transition-all shadow-lg hover:shadow-teal-500/20 whitespace-nowrap flex-shrink-0 cursor-pointer"
        >
          <span>Next: Module 1.9</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
