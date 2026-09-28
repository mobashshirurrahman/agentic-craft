"use client";

import React, { useState } from "react";
import {
  Users,
  Network,
  Workflow,
  GitBranch,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  Layers,
  CheckCircle2,
  Cpu,
  ArrowDown,
  RefreshCw,
} from "lucide-react";

type TopologyType = "supervisor" | "sequential" | "network";

export default function MultiAgentTopologySimulator() {
  const [activeTopology, setActiveTopology] = useState<TopologyType>("supervisor");

  return (
    <div className="rounded-2xl border border-slate-700/60 bg-slate-900/90 dark:bg-slate-900/90 light:bg-white light:border-slate-300 shadow-xl overflow-hidden my-8">
      {/* Header */}
      <div className="border-b border-slate-700/60 dark:border-slate-700/60 light:border-slate-200 px-5 py-4 bg-slate-800/50 dark:bg-slate-800/50 light:bg-slate-50 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-teal-400 animate-pulse" />
            <h3 className="font-bold text-base md:text-lg text-white dark:text-white light:text-slate-900">
              Interactive Multi-Agent Topology Simulator
            </h3>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 mt-0.5">
            Explore the 3 canonical coordination patterns: Hierarchical Supervisor, Sequential Pipeline, and Peer Network.
          </p>
        </div>

        {/* Topology Selector Tabs */}
        <div className="flex items-center bg-slate-900/80 dark:bg-slate-900/80 light:bg-slate-200 p-1 rounded-xl border border-slate-700/80 dark:border-slate-700/80 light:border-slate-300">
          <button
            onClick={() => setActiveTopology("supervisor")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTopology === "supervisor"
                ? "bg-teal-500 text-slate-950 font-bold shadow-sm"
                : "text-slate-400 dark:text-slate-400 light:text-slate-700 hover:text-white dark:hover:text-white"
            }`}
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span>1. Supervisor (Hierarchical)</span>
          </button>
          <button
            onClick={() => setActiveTopology("sequential")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTopology === "sequential"
                ? "bg-teal-500 text-slate-950 font-bold shadow-sm"
                : "text-slate-400 dark:text-slate-400 light:text-slate-700 hover:text-white dark:hover:text-white"
            }`}
          >
            <Workflow className="w-3.5 h-3.5" />
            <span>2. Sequential (Pipeline)</span>
          </button>
          <button
            onClick={() => setActiveTopology("network")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTopology === "network"
                ? "bg-teal-500 text-slate-950 font-bold shadow-sm"
                : "text-slate-400 dark:text-slate-400 light:text-slate-700 hover:text-white dark:hover:text-white"
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            <span>3. Network (Peer Handoff)</span>
          </button>
        </div>
      </div>

      {/* Main Simulation View */}
      <div className="p-5 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Diagram Canvas */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-4">
          <div className="rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-950/70 p-5 min-h-[300px] flex flex-col justify-center">
            {activeTopology === "supervisor" && (
              <div className="space-y-6">
                {/* Supervisor Node */}
                <div className="max-w-xs mx-auto p-3.5 rounded-xl border-2 border-teal-400 bg-teal-500/20 text-center shadow-lg shadow-teal-500/10">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-teal-300 font-bold block">
                    Central Coordinator
                  </span>
                  <h4 className="font-bold text-white text-sm">Supervisor Orchestrator Agent</h4>
                  <p className="text-[11px] text-slate-300 mt-1 font-mono">
                    Decomposes task & routes to subagents
                  </p>
                </div>

                {/* Branches */}
                <div className="flex justify-center items-center text-teal-400 text-xs font-mono gap-4">
                  <span>↙ Dispatches (Isolated)</span>
                  <span>↓</span>
                  <span>↘ Dispatches (Isolated)</span>
                </div>

                {/* Subagents Grid */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 rounded-lg border border-sky-500/40 bg-sky-500/10 text-center">
                    <span className="font-bold text-xs text-sky-300 block">Explore Agent</span>
                    <span className="text-[10px] text-slate-400 font-mono">Tools: Search, Read</span>
                  </div>
                  <div className="p-3 rounded-lg border border-purple-500/40 bg-purple-500/10 text-center">
                    <span className="font-bold text-xs text-purple-300 block">Coding Agent</span>
                    <span className="text-[10px] text-slate-400 font-mono">Tools: Edit, Bash</span>
                  </div>
                  <div className="p-3 rounded-lg border border-emerald-500/40 bg-emerald-500/10 text-center">
                    <span className="font-bold text-xs text-emerald-300 block">Testing Agent</span>
                    <span className="text-[10px] text-slate-400 font-mono">Tools: Pytest</span>
                  </div>
                </div>

                <div className="text-center text-[11px] font-mono text-slate-400">
                  ⚡ <strong>Shallow Hierarchy:</strong> Subagents return clean conclusions to Supervisor; exploration noise is discarded!
                </div>
              </div>
            )}

            {activeTopology === "sequential" && (
              <div className="space-y-4">
                <span className="text-xs font-mono uppercase tracking-wider text-teal-400 block text-center mb-1">
                  Deterministic Step-by-Step Pipeline
                </span>

                <div className="space-y-2.5">
                  <div className="p-3 rounded-lg border border-sky-500/40 bg-sky-500/10 flex items-center justify-between text-xs font-mono">
                    <div>
                      <span className="font-bold text-sky-300">Stage 1: Clarification Agent</span>
                      <p className="text-[11px] text-slate-400">Engages user to eliminate ambiguity & define scope</p>
                    </div>
                    <span className="text-sky-400 font-bold">100% Deterministic</span>
                  </div>

                  <div className="text-center text-teal-400 text-xs">↓ Feeds Structured Output</div>

                  <div className="p-3 rounded-lg border border-purple-500/40 bg-purple-500/10 flex items-center justify-between text-xs font-mono">
                    <div>
                      <span className="font-bold text-purple-300">Stage 2: Deep Research Agent</span>
                      <p className="text-[11px] text-slate-400">Queries web APIs, crawls docs, gathers citations</p>
                    </div>
                    <span className="text-purple-400 font-bold">Parallel Search</span>
                  </div>

                  <div className="text-center text-teal-400 text-xs">↓ Feeds Raw Facts</div>

                  <div className="p-3 rounded-lg border border-emerald-500/40 bg-emerald-500/10 flex items-center justify-between text-xs font-mono">
                    <div>
                      <span className="font-bold text-emerald-300">Stage 3: Synthesis & Report Agent</span>
                      <p className="text-[11px] text-slate-400">Compiles findings into executive whitepaper</p>
                    </div>
                    <span className="text-emerald-400 font-bold">Final Deliverable</span>
                  </div>
                </div>
              </div>
            )}

            {activeTopology === "network" && (
              <div className="space-y-6 text-center">
                <span className="text-xs font-mono uppercase tracking-wider text-teal-400 block mb-2">
                  Decentralized Swarm Handoff Network
                </span>

                <div className="grid grid-cols-3 gap-3 items-center">
                  <div className="p-3.5 rounded-xl border border-sky-500/40 bg-sky-500/10">
                    <span className="text-[10px] font-mono text-sky-400 uppercase font-bold block">Front Desk</span>
                    <h5 className="font-bold text-xs text-white">Triage Agent</h5>
                    <p className="text-[10px] text-slate-400 mt-1">Routes user based on intent</p>
                  </div>

                  <div className="text-xs font-mono text-teal-300">
                    ⇄ transfer_to_*() ⇄
                    <br />
                    <span className="text-[10px] text-slate-500">Peer Handoffs</span>
                  </div>

                  <div className="space-y-2">
                    <div className="p-2.5 rounded-lg border border-amber-500/40 bg-amber-500/10">
                      <span className="font-bold text-xs text-amber-300 block">Refunds Agent</span>
                      <span className="text-[10px] text-slate-400">Payment API</span>
                    </div>
                    <div className="p-2.5 rounded-lg border border-purple-500/40 bg-purple-500/10">
                      <span className="font-bold text-xs text-purple-300 block">Sales Agent</span>
                      <span className="text-[10px] text-slate-400">CRM API</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300">
                  Any agent can autonomously transfer context to any peer without returning to a central bottleneck!
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Architectural Rules & Landmark Case Study */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-4">
          <div className="bg-slate-800/40 dark:bg-slate-800/40 light:bg-slate-50 border border-slate-700/50 dark:border-slate-700/50 light:border-slate-200 rounded-xl p-4 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold block">
              Landmark Industry Case Study
            </span>

            {activeTopology === "supervisor" && (
              <div>
                <h4 className="font-bold text-sm text-white dark:text-white light:text-slate-900">
                  Claude Code (Anthropic)
                </h4>
                <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600 mt-1 leading-relaxed">
                  Claude Code employs a master orchestrator that spawns isolated subagents (e.g. for codebase exploration). The subagents search and test code in clean separate sandboxes, returning only their verified conclusions back to the main agent.
                </p>
              </div>
            )}

            {activeTopology === "sequential" && (
              <div>
                <h4 className="font-bold text-sm text-white dark:text-white light:text-slate-900">
                  Deep Research (OpenAI / Gemini)
                </h4>
                <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600 mt-1 leading-relaxed">
                  Deep research workflows follow a strict immutable pipeline: Clarify requirements ➔ Plan queries ➔ Execute research across hundreds of sources ➔ Synthesize comprehensive report. The sequence never deviates at runtime.
                </p>
              </div>
            )}

            {activeTopology === "network" && (
              <div>
                <h4 className="font-bold text-sm text-white dark:text-white light:text-slate-900">
                  Customer Support Handoff Network
                </h4>
                <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600 mt-1 leading-relaxed">
                  A frontline Triage agent acts as receptionist. When a refund is requested, it invokes <code>transfer_to_refund()</code>, passing conversation state directly to the Billing agent, which can hand back upon completion.
                </p>
              </div>
            )}
          </div>

          {/* The Golden Rule Alert */}
          <div className="p-4 rounded-xl border border-amber-500/40 bg-amber-500/10 text-xs text-amber-200 dark:text-amber-200 light:text-amber-800 space-y-1.5 leading-relaxed">
            <div className="flex items-center gap-1.5 font-bold">
              <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>The Architect's Golden Rule</span>
            </div>
            <p>
              Multi-agent systems add coordination lag, latency, and debugging complexity. <strong>Start with a single well-designed agent!</strong> Only split into multiple agents when you hit clear limitations: tool confusion (&gt;20 tools) or conflicting role requirements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
