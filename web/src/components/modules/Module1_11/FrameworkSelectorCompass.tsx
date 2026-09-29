"use client";

import React, { useState } from "react";
import {
  Compass,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  Workflow,
  Users,
  Terminal,
} from "lucide-react";

type ProjectType = "enterprise_production" | "quick_prototype" | "clean_python" | "academic_research";

export default function FrameworkSelectorCompass() {
  const [projectType, setProjectType] = useState<ProjectType>("enterprise_production");

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden my-6">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 px-5 py-4 bg-slate-50/80 dark:bg-slate-800/50 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-teal-500 animate-pulse" />
            <h3 className="font-bold text-base md:text-lg text-slate-900 dark:text-white">
              Interactive Decision Wizard: Pick Your Framework in 30 Seconds
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            Cure framework paralysis by aligning your immediate project constraints with the right tool.
          </p>
        </div>

        <span className="px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-500/30">
          Anti-Paralysis Guide
        </span>
      </div>

      <div className="p-5 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: What is your primary objective? */}
        <div className="lg:col-span-6 flex flex-col justify-between gap-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 rounded-xl p-5">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-teal-700 dark:text-teal-400 font-bold block mb-3">
              Step 1: Select Your Current Engineering Goal
            </span>

            <div className="space-y-2">
              <button
                onClick={() => setProjectType("enterprise_production")}
                className={`w-full p-3 rounded-lg border text-left transition cursor-pointer ${
                  projectType === "enterprise_production"
                    ? "border-teal-500 bg-teal-50 dark:bg-teal-500/20 text-teal-900 dark:text-teal-200 font-bold shadow-sm"
                    : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:border-slate-300"
                }`}
              >
                <div className="text-xs font-bold text-slate-900 dark:text-white">
                  1. Enterprise Production with Human Approval & Strict Audits
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Need state checkpoints, deterministic graphs, compliance traces, and time-travel rollbacks.
                </div>
              </button>

              <button
                onClick={() => setProjectType("quick_prototype")}
                className={`w-full p-3 rounded-lg border text-left transition cursor-pointer ${
                  projectType === "quick_prototype"
                    ? "border-teal-500 bg-teal-50 dark:bg-teal-500/20 text-teal-900 dark:text-teal-200 font-bold shadow-sm"
                    : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:border-slate-300"
                }`}
              >
                <div className="text-xs font-bold text-slate-900 dark:text-white">
                  2. Rapid Hackathon / Multi-Agent Roleplay Prototype
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Want to assemble a 3-agent team (Researcher, Writer, Reviewer) in an afternoon.
                </div>
              </button>

              <button
                onClick={() => setProjectType("clean_python")}
                className={`w-full p-3 rounded-lg border text-left transition cursor-pointer ${
                  projectType === "clean_python"
                    ? "border-teal-500 bg-teal-50 dark:bg-teal-500/20 text-teal-900 dark:text-teal-200 font-bold shadow-sm"
                    : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:border-slate-300"
                }`}
              >
                <div className="text-xs font-bold text-slate-900 dark:text-white">
                  3. Lightweight Python App with Zero Framework Bloat
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Starting out with simple tools, handoffs, and native OpenAI models.
                </div>
              </button>

              <button
                onClick={() => setProjectType("academic_research")}
                className={`w-full p-3 rounded-lg border text-left transition cursor-pointer ${
                  projectType === "academic_research"
                    ? "border-teal-500 bg-teal-50 dark:bg-teal-500/20 text-teal-900 dark:text-teal-200 font-bold shadow-sm"
                    : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:border-slate-300"
                }`}
              >
                <div className="text-xs font-bold text-slate-900 dark:text-white">
                  4. Academic Research / Emergent Conversational Debate
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Studying event-driven conversational patterns and multi-agent sociology.
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Recommendation Card */}
        <div className="lg:col-span-6 flex flex-col justify-between gap-4">
          <div className="p-5 rounded-xl border border-teal-200 dark:border-teal-500/40 bg-teal-50/80 dark:bg-teal-500/10 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300">
                  Recommended Architecture
                </span>
                <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-teal-100 dark:bg-teal-500/20 text-teal-900 dark:text-teal-300 border border-teal-200 dark:border-teal-500/30">
                  Optimal Match
                </span>
              </div>

              {projectType === "enterprise_production" && (
                <div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    LangGraph (LangChain Ecosystem)
                  </h4>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                    LangGraph treats agentic workflows as explicit cyclical state graphs with state persistence. If you need audit logs for compliance, time travel to replay past failures, or human approval gates before executing high-risk database transactions, LangGraph is the undisputed enterprise standard.
                  </p>
                </div>
              )}

              {projectType === "quick_prototype" && (
                <div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    CrewAI (João Moura / CrewAI Inc.)
                  </h4>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                    CrewAI mirrors human organizations. You define agents with a Role, Goal, and Backstory, assemble them into a Crew, and kick off the process. It handles task delegation, shared memory, and tool integration with almost zero boilerplate.
                  </p>
                </div>
              )}

              {projectType === "clean_python" && (
                <div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    OpenAI Agents SDK / Swarm
                  </h4>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                    Lightweight, elegant, and Pythonic. Instead of learning complex framework DSLs, you use standard Python functions for agent tools and handoffs. Perfect for lean apps that want maximum performance without heavy framework baggage.
                  </p>
                </div>
              )}

              {projectType === "academic_research" && (
                <div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    AutoGen (Microsoft Research)
                  </h4>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                    AutoGen specializes in conversational, event-driven multi-agent systems where agents debate, critique, and solve problems through iterative dialogue. Ideal for research simulations and academic experimentation.
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2.5 rounded bg-white dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                  <span className="text-slate-500 dark:text-slate-400 block text-[10px]">Setup Velocity:</span>
                  <span className="font-bold text-teal-700 dark:text-teal-400">
                    {projectType === "quick_prototype" || projectType === "clean_python" ? "⚡ Under 1 Hour" : "🛠️ 1-3 Days"}
                  </span>
                </div>
                <div className="p-2.5 rounded bg-white dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                  <span className="text-slate-500 dark:text-slate-400 block text-[10px]">Control Level:</span>
                  <span className="font-bold text-teal-700 dark:text-teal-400">
                    {projectType === "enterprise_production" ? "🔒 Fine-Grained (Graph Nodes)" : "🚀 High-Level Abstractions"}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-teal-200 dark:border-teal-500/30 text-[11px] font-mono text-teal-800 dark:text-teal-300">
              💡 Core takeaway: Choose for the current milestone; transferable concepts mean you can adapt later!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
