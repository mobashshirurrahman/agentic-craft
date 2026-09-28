"use client";

import React from "react";
import Link from "next/link";
import {
  Users,
  Cpu,
  GitBranch,
  Workflow,
  Network,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  BookOpen,
  Terminal,
  Zap,
  Layers,
  Sliders,
} from "lucide-react";
import MultiAgentTopologySimulator from "./MultiAgentTopologySimulator";
import SingleVsMultiDecisionStudio from "./SingleVsMultiDecisionStudio";
import Module1_9Quiz from "./Module1_9Quiz";

export default function Module1_9Content() {
  return (
    <div className="space-y-12">
      {/* SECTION 1: Friendly Welcome & The Solo Doctor vs Hospital Team Analogy */}
      <section className="rounded-2xl border border-teal-500/30 bg-gradient-to-br from-teal-500/10 via-slate-900/80 to-slate-950 p-6 md:p-8 relative overflow-hidden dark:from-teal-500/10 dark:via-slate-900/80 dark:to-slate-950 light:from-teal-50 light:via-white light:to-slate-50 light:border-teal-200">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-500/40 text-teal-300 dark:text-teal-300 light:text-teal-700 text-xs font-mono font-semibold mb-4">
            <Users className="w-3.5 h-3.5" />
            <span>Module 1.9 • Foundations & Architecture</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold text-white dark:text-white light:text-slate-900 tracking-tight">
            Hello and Welcome! Let's Master Single-Agent vs. Multi-Agent Architectures
          </h2>

          <p className="mt-3 text-slate-300 dark:text-slate-300 light:text-slate-700 text-sm md:text-base leading-relaxed">
            One of the hottest debates in AI engineering today is: <em>"Should I build one super-smart agent, or a team of 10 specialized collaborating agents?"</em>
            <br /><br />
            The truth is that multi-agent systems are visually impressive on architecture diagrams, but in production, they introduce massive coordination overhead. Today, we demystify when a single agent is king, and when you truly need a multi-agent team!
          </p>

          {/* General Practitioner vs Hospital Team Analogy */}
          <div className="mt-6 p-5 rounded-xl border border-teal-500/40 bg-teal-950/30 dark:bg-teal-950/30 light:bg-teal-50/80 flex flex-col md:flex-row gap-4 items-start">
            <div className="w-12 h-12 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400 flex-shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white dark:text-white light:text-slate-900 text-base">
                The Analogy: The Family Clinic Doctor vs. The Multi-Department Hospital
              </h4>
              <p className="text-xs md:text-sm text-slate-300 dark:text-slate-300 light:text-slate-700 mt-1 leading-relaxed">
                If you have a seasonal fever, you go to a <strong>single doctor</strong> at a family clinic. They examine you, write a prescription, and you leave in 10 minutes. Bringing in a committee of 5 surgeons, a radiologist, and an anesthesiologist for a common cold would be absurdly expensive, slow, and confusing!
                <br /><br />
                However, if a patient requires open-heart surgery, that same single family doctor cannot do it alone. You need a <strong>specialized hospital team</strong>: a lead surgeon, a cardiologist, an anesthesiologist, and a recovery nurse working together in a synchronized protocol.
              </p>
              <p className="text-xs md:text-sm text-teal-300 dark:text-teal-300 light:text-teal-800 mt-2 font-medium">
                In AI engineering, the golden principle is identical: Start with a single doctor! Only recruit the specialized surgical team when task complexity and tool counts demand it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Single-Agent Architectures: Deep Dive */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
            <Cpu className="w-4 h-4" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white dark:text-white light:text-slate-900">
            Single-Agent Architectures: Strengths & Hard Limits
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pros */}
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 dark:bg-emerald-500/5 light:bg-emerald-50/50 p-5 space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block">
              Single-Agent Superpowers
            </span>
            <ul className="space-y-2.5 text-xs md:text-sm text-slate-300 dark:text-slate-300 light:text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>Simplicity:</strong> Only one agent loop, one prompt, and one context history to monitor.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>Low Latency & Cost:</strong> Zero inter-agent message passing or debate delays.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>Trivial Debugging:</strong> A single continuous execution trace with zero cascading points of failure.</span>
              </li>
            </ul>
          </div>

          {/* Cons */}
          <div className="rounded-xl border border-rose-500/30 bg-rose-500/5 dark:bg-rose-500/5 light:bg-rose-50/50 p-5 space-y-3">
            <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider block">
              Where Single-Agents Break Down
            </span>
            <ul className="space-y-2.5 text-xs md:text-sm text-slate-300 dark:text-slate-300 light:text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">⚠️</span>
                <span>
                  <strong>Tool Catalog Overload:</strong> Research (Masterman et al., 2024) reveals model accuracy plunges when loaded with more than 15-20 tools at once.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">⚠️</span>
                <span>
                  <strong>Lack of Parallelism:</strong> Cannot concurrently scrape 10 documents or run multiple tests simultaneously.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">⚠️</span>
                <span>
                  <strong>Role Conflicts:</strong> A single system prompt cannot easily act as an uninhibited creative brainstorming partner and a hyper-strict security auditor simultaneously.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 3: Multi-Agent Architectures: Definitions & Comparison */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
            <Users className="w-4 h-4" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white dark:text-white light:text-slate-900">
            Architectural Head-to-Head Comparison
          </h3>
        </div>

        {/* Comparison Matrix */}
        <div className="rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200 overflow-hidden bg-slate-900/60 dark:bg-slate-900/60 light:bg-white">
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left font-mono">
              <thead className="bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-100 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-3">Architectural Dimension</th>
                  <th className="p-3 text-sky-400">Single-Agent Architecture</th>
                  <th className="p-3 text-purple-400">Multi-Agent Architecture</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 dark:divide-slate-800 light:divide-slate-200 text-slate-300 dark:text-slate-300 light:text-slate-700">
                <tr>
                  <td className="p-3 font-bold text-white dark:text-white light:text-slate-900">Complexity Handling</td>
                  <td className="p-3">Limited (Best for linear, bounded tasks)</td>
                  <td className="p-3 text-emerald-400 font-bold">High (Deconstructs massive diverse domains)</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white dark:text-white light:text-slate-900">Ease of Implementation</td>
                  <td className="p-3 text-emerald-400 font-bold">Easy (1 prompt, 1 loop)</td>
                  <td className="p-3 text-amber-400">Complex (Orchestration graphs & state routing)</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white dark:text-white light:text-slate-900">Parallel Task Execution</td>
                  <td className="p-3 text-rose-400">Not efficient / Mostly sequential</td>
                  <td className="p-3 text-emerald-400 font-bold">Highly Efficient (Concurrent worker agents)</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white dark:text-white light:text-slate-900">Tool Capacity</td>
                  <td className="p-3">Limited (&lt; 15-20 tools)</td>
                  <td className="p-3 text-emerald-400 font-bold">Massive (Subagents hold narrow sets of 3-5 tools)</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white dark:text-white light:text-slate-900">Evaluation & Debugging</td>
                  <td className="p-3 text-emerald-400 font-bold">Easy (Deterministic single trace)</td>
                  <td className="p-3 text-amber-400">More Complex (Multi-agent tracing & debate loops)</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white dark:text-white light:text-slate-900">Best For</td>
                  <td className="p-3">Simple, well-defined linear tasks</td>
                  <td className="p-3">Complex, multi-faceted enterprise workflows</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SECTION 4: The 3 Main Multi-Agent Topologies (Interactive Simulator) */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
            <Network className="w-4 h-4" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white dark:text-white light:text-slate-900">
            The 3 Canonical Multi-Agent Topologies
          </h3>
        </div>

        <p className="text-xs md:text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
          How do multiple agents actually coordinate? Explore the 3 foundational industry topologies below, featuring real-world architecture breakdowns from <strong>Claude Code</strong> and <strong>Deep Research</strong>!
        </p>

        {/* Embedded Topology Simulator */}
        <MultiAgentTopologySimulator />
      </section>

      {/* SECTION 5: Interactive Diagnostic Decision Studio */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
            <Sliders className="w-4 h-4" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white dark:text-white light:text-slate-900">
            Diagnostic Studio: Single vs. Multi-Agent Compass
          </h3>
        </div>

        <p className="text-xs md:text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
          Adjust your tool counts, concurrency requirements, and persona divergence to receive an instant architectural recommendation.
        </p>

        {/* Embedded Decision Studio */}
        <SingleVsMultiDecisionStudio />
      </section>

      {/* SECTION 6: Concept Check Quiz */}
      <section>
        <Module1_9Quiz />
      </section>

      {/* SECTION 7: Teacher Summary & Bridge to Module 1.10 */}
      <section className="rounded-2xl border border-teal-500/40 bg-gradient-to-r from-teal-500/10 via-slate-900/70 to-slate-950 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 dark:from-teal-500/10 dark:via-slate-900/70 dark:to-slate-950 light:from-teal-50 light:via-white light:to-slate-50 light:border-teal-200">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-teal-400 font-mono text-xs uppercase tracking-wider font-bold">
            <BookOpen className="w-4 h-4" />
            <span>Teacher Summary • Module 1.9 Complete!</span>
          </div>
          <h4 className="text-lg md:text-xl font-bold text-white dark:text-white light:text-slate-900">
            You now master single vs multi-agent system partitioning!
          </h4>
          <p className="text-xs md:text-sm text-slate-300 dark:text-slate-300 light:text-slate-700 max-w-2xl leading-relaxed">
            We broke down when single agents reign supreme, explored the 15-tool degradation threshold, and analyzed the 3 canonical multi-agent topologies (Supervisor, Sequential, and Peer Network).
            <br />
            Next up: <strong>Module 1.10: Enhancing Agents with Retrieval Augmented Generation (RAG)</strong>, where we explore how RAG transforms from a static pipeline into an autonomous, agent-controlled search tool!
          </p>
        </div>

        <Link
          href="/learn/level-1/module-1-10"
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs md:text-sm transition-all shadow-lg hover:shadow-teal-500/20 whitespace-nowrap flex-shrink-0 cursor-pointer"
        >
          <span>Next: Module 1.10</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
