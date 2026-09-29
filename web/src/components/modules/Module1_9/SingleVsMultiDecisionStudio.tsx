"use client";

import React, { useState } from "react";
import {
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Cpu,
  Users,
  Layers,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";

export default function SingleVsMultiDecisionStudio() {
  const [toolCount, setToolCount] = useState<number>(8);
  const [concurrencyNeed, setConcurrencyNeed] = useState<"sequential" | "parallel">("sequential");
  const [roleDivergence, setRoleDivergence] = useState<"single" | "multiple">("single");

  // Recommendation logic
  const isMultiAgentRecommended =
    toolCount > 15 || concurrencyNeed === "parallel" || roleDivergence === "multiple";

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden my-6">
      {/* Studio Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 px-5 py-4 bg-slate-50/80 dark:bg-slate-800/50 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-teal-500 animate-pulse" />
            <h3 className="font-bold text-base md:text-lg text-slate-900 dark:text-white">
              Architectural Compass: Single-Agent vs. Multi-Agent Decision Studio
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            Configure your technical requirements to discover the ideal architectural pattern and avoid over-engineering.
          </p>
        </div>

        <span className="px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-500/30">
          Decision Diagnostic Engine
        </span>
      </div>

      <div className="p-5 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Input Parameters */}
        <div className="lg:col-span-6 flex flex-col justify-between gap-5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 rounded-xl p-5">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-teal-700 dark:text-teal-400 font-bold block mb-4">
              Project Diagnostic Vectors
            </span>

            {/* Parameter 1: Tool Count */}
            <div className="space-y-2 mb-5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-900 dark:text-white">
                  Total External Tools Required:
                </span>
                <span className="font-mono font-bold text-teal-700 dark:text-teal-300 bg-teal-100 dark:bg-teal-500/20 px-2 py-0.5 rounded border border-teal-200 dark:border-teal-500/30">
                  {toolCount} tools
                </span>
              </div>
              <input
                type="range"
                min={2}
                max={40}
                value={toolCount}
                onChange={(e) => setToolCount(Number(e.target.value))}
                className="w-full accent-teal-600 cursor-pointer"
              />
              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                {toolCount <= 15
                  ? "✓ Within safe single-agent capacity (low risk of tool hallucination)."
                  : "⚠️ Exceeds 15 tools! Single agents suffer high degradation and parameter misfires (Masterman et al., 2024)."}
              </p>
            </div>

            {/* Parameter 2: Concurrency Need */}
            <div className="space-y-2 mb-5">
              <span className="text-xs font-semibold text-slate-900 dark:text-white block">
                Execution Flow Dependency:
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setConcurrencyNeed("sequential")}
                  className={`p-2.5 rounded-lg border text-xs font-semibold text-left transition cursor-pointer ${
                    concurrencyNeed === "sequential"
                      ? "border-teal-500 bg-teal-50 dark:bg-teal-500/20 text-teal-900 dark:text-teal-300 font-bold shadow-sm"
                      : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:border-slate-300"
                  }`}
                >
                  Sequential (Step 1 ➔ Step 2)
                </button>
                <button
                  onClick={() => setConcurrencyNeed("parallel")}
                  className={`p-2.5 rounded-lg border text-xs font-semibold text-left transition cursor-pointer ${
                    concurrencyNeed === "parallel"
                      ? "border-teal-500 bg-teal-50 dark:bg-teal-500/20 text-teal-900 dark:text-teal-300 font-bold shadow-sm"
                      : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:border-slate-300"
                  }`}
                >
                  Parallel (Concurrent Tasks)
                </button>
              </div>
            </div>

            {/* Parameter 3: Role Specialization */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-900 dark:text-white block">
                Persona & Responsibility Divergence:
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setRoleDivergence("single")}
                  className={`p-2.5 rounded-lg border text-xs font-semibold text-left transition cursor-pointer ${
                    roleDivergence === "single"
                      ? "border-teal-500 bg-teal-50 dark:bg-teal-500/20 text-teal-900 dark:text-teal-300 font-bold shadow-sm"
                      : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:border-slate-300"
                  }`}
                >
                  Single Unified Role
                </button>
                <button
                  onClick={() => setRoleDivergence("multiple")}
                  className={`p-2.5 rounded-lg border text-xs font-semibold text-left transition cursor-pointer ${
                    roleDivergence === "multiple"
                      ? "border-teal-500 bg-teal-50 dark:bg-teal-500/20 text-teal-900 dark:text-teal-300 font-bold shadow-sm"
                      : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:border-slate-300"
                  }`}
                >
                  Conflicting Personas (e.g. Coder vs Auditor)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Recommendation Card */}
        <div className="lg:col-span-6 flex flex-col justify-between gap-4">
          <div
            className={`p-5 rounded-xl border flex-1 flex flex-col justify-between ${
              !isMultiAgentRecommended
                ? "border-emerald-300 dark:border-emerald-500/40 bg-emerald-50/80 dark:bg-emerald-500/10"
                : "border-purple-300 dark:border-purple-500/40 bg-purple-50/80 dark:bg-purple-500/10"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Architectural Verdict
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-bold ${
                    !isMultiAgentRecommended
                      ? "bg-emerald-200 dark:bg-emerald-500/20 text-emerald-900 dark:text-emerald-300"
                      : "bg-purple-200 dark:bg-purple-500/20 text-purple-900 dark:text-purple-300"
                  }`}
                >
                  {!isMultiAgentRecommended ? "Single-Agent Recommended" : "Multi-Agent Recommended"}
                </span>
              </div>

              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                {!isMultiAgentRecommended
                  ? "Build a Single Well-Architected ReAct Agent"
                  : toolCount > 20
                  ? "Deploy a Hierarchical Supervisor Architecture"
                  : concurrencyNeed === "parallel"
                  ? "Deploy Parallel Worker Subagents (Map-Reduce / Supervisor)"
                  : "Deploy a Specialized Multi-Agent Team"}
              </h4>

              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                {!isMultiAgentRecommended
                  ? "Your workload has fewer than 15 tools and no conflicting role personas. Introducing multi-agent orchestration right now would needlessly inflate token costs, introduce coordination latency, and make debugging much harder. Keep it lean and simple!"
                  : "Your constraints show clear indicators for multi-agent partitioning: tool overload, parallel concurrency, or persona conflicts. Dividing responsibilities across specialized subagents with isolated context windows will maximize reliability and throughput."}
              </p>

              {/* Engineering scorecard */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2.5 rounded bg-white dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                  <span className="text-slate-500 dark:text-slate-400 block text-[10px]">Implementation Complexity:</span>
                  <span className="font-bold text-teal-700 dark:text-teal-400">
                    {!isMultiAgentRecommended ? "Low (1-2 Days)" : "Medium/High (1-2 Weeks)"}
                  </span>
                </div>
                <div className="p-2.5 rounded bg-white dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                  <span className="text-slate-500 dark:text-slate-400 block text-[10px]">Token Overhead:</span>
                  <span className="font-bold text-teal-700 dark:text-teal-400">
                    {!isMultiAgentRecommended ? "Baseline (1x)" : "Higher (1.5x - 3x)"}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800/80 text-[11px] font-mono text-slate-600 dark:text-slate-400 flex items-center justify-between">
              <span>Framework Fit:</span>
              <span className="text-teal-700 dark:text-teal-400 font-bold">
                {!isMultiAgentRecommended ? "LangGraph ReAct Node" : "LangGraph Supervisor Graph"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
