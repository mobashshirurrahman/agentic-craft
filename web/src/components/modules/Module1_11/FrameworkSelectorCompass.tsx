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
    <div className="rounded-2xl border border-slate-700/60 bg-slate-900/90 dark:bg-slate-900/90 light:bg-white light:border-slate-300 shadow-xl overflow-hidden my-8">
      {/* Header */}
      <div className="border-b border-slate-700/60 dark:border-slate-700/60 light:border-slate-200 px-5 py-4 bg-slate-800/50 dark:bg-slate-800/50 light:bg-slate-50 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-teal-400 animate-pulse" />
            <h3 className="font-bold text-base md:text-lg text-white dark:text-white light:text-slate-900">
              Interactive Decision Wizard: Pick Your Framework in 30 Seconds
            </h3>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 mt-0.5">
            Cure framework paralysis by aligning your immediate project constraints with the right tool.
          </p>
        </div>

        <span className="px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-teal-500/10 text-teal-300 dark:text-teal-300 light:text-teal-700 border border-teal-500/30">
          Anti-Paralysis Guide
        </span>
      </div>

      <div className="p-5 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: What is your primary objective? */}
        <div className="lg:col-span-6 flex flex-col justify-between gap-4 bg-slate-800/40 dark:bg-slate-800/40 light:bg-slate-50 border border-slate-700/50 dark:border-slate-700/50 light:border-slate-200 rounded-xl p-5">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold block mb-3">
              Step 1: Select Your Current Engineering Goal
            </span>

            <div className="space-y-2">
              <button
                onClick={() => setProjectType("enterprise_production")}
                className={`w-full p-3 rounded-lg border text-left transition ${
                  projectType === "enterprise_production"
                    ? "border-teal-400 bg-teal-500/20 text-teal-200 font-bold"
                    : "border-slate-700 bg-slate-900/60 text-slate-400 hover:text-white"
                }`}
              >
                <div className="text-xs font-bold text-white dark:text-white light:text-slate-900">
                  1. Enterprise Production with Human Approval & Strict Audits
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Need state checkpoints, deterministic graphs, compliance traces, and time-travel rollbacks.
                </div>
              </button>

              <button
                onClick={() => setProjectType("quick_prototype")}
                className={`w-full p-3 rounded-lg border text-left transition ${
                  projectType === "quick_prototype"
                    ? "border-teal-400 bg-teal-500/20 text-teal-200 font-bold"
                    : "border-slate-700 bg-slate-900/60 text-slate-400 hover:text-white"
                }`}
              >
                <div className="text-xs font-bold text-white dark:text-white light:text-slate-900">
                  2. Rapid Hackathon / Multi-Agent Roleplay Prototype
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Want to assemble a 3-agent team (Researcher, Writer, Reviewer) in an afternoon.
                </div>
              </button>

              <button
                onClick={() => setProjectType("clean_python")}
                className={`w-full p-3 rounded-lg border text-left transition ${
                  projectType === "clean_python"
                    ? "border-teal-400 bg-teal-500/20 text-teal-200 font-bold"
                    : "border-slate-700 bg-slate-900/60 text-slate-400 hover:text-white"
                }`}
              >
                <div className="text-xs font-bold text-white dark:text-white light:text-slate-900">
                  3. Lightweight Python App with Zero Framework Bloat
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Starting out with simple tools, handoffs, and native OpenAI models.
                </div>
              </button>

              <button
                onClick={() => setProjectType("academic_research")}
                className={`w-full p-3 rounded-lg border text-left transition ${
                  projectType === "academic_research"
                    ? "border-teal-400 bg-teal-500/20 text-teal-200 font-bold"
                    : "border-slate-700 bg-slate-900/60 text-slate-400 hover:text-white"
                }`}
              >
                <div className="text-xs font-bold text-white dark:text-white light:text-slate-900">
                  4. Academic Multi-Agent Conversation & Debate Research
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Studying emergent behaviors and event-driven multi-agent simulations.
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Right: The Prescribed Framework */}
        <div className="lg:col-span-6 flex flex-col justify-between gap-4">
          <div className="p-5 rounded-xl border border-teal-500/40 bg-teal-500/10 flex-1 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400 block mb-1">
                Your Recommended Path
              </span>

              {projectType === "enterprise_production" && (
                <div>
                  <h4 className="text-xl font-bold text-white dark:text-white light:text-slate-900 mb-2">
                    Choose LangGraph
                  </h4>
                  <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed mb-3">
                    LangGraph gives you low-level graph mechanics, state persistence out of the box, and Human-in-the-Loop breakpoints. It is the enterprise standard because nothing happens by accident—every transition is explicit.
                  </p>
                  <div className="p-2.5 rounded bg-slate-950/80 font-mono text-[11px] text-teal-300">
                    Terminal: <code>pip install langgraph langchain-core</code>
                  </div>
                </div>
              )}

              {projectType === "quick_prototype" && (
                <div>
                  <h4 className="text-xl font-bold text-white dark:text-white light:text-slate-900 mb-2">
                    Choose CrewAI
                  </h4>
                  <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed mb-3">
                    CrewAI has the fastest time-to-value for multi-agent workflows. Its intuitive role-playing abstractions (Roles, Goals, Backstories) let you assemble working teams in minutes.
                  </p>
                  <div className="p-2.5 rounded bg-slate-950/80 font-mono text-[11px] text-teal-300">
                    Terminal: <code>pip install crewai crewai-tools</code>
                  </div>
                </div>
              )}

              {projectType === "clean_python" && (
                <div>
                  <h4 className="text-xl font-bold text-white dark:text-white light:text-slate-900 mb-2">
                    Choose OpenAI Agents SDK
                  </h4>
                  <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed mb-3">
                    Simple, lightweight, and Python-native. It avoids heavy graph machinery and focuses strictly on Agents, Tools, and Handoffs.
                  </p>
                  <div className="p-2.5 rounded bg-slate-950/80 font-mono text-[11px] text-teal-300">
                    Terminal: <code>pip install openai-agents</code>
                  </div>
                </div>
              )}

              {projectType === "academic_research" && (
                <div>
                  <h4 className="text-xl font-bold text-white dark:text-white light:text-slate-900 mb-2">
                    Choose AutoGen (Microsoft)
                  </h4>
                  <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed mb-3">
                    Microsoft AutoGen provides rich multi-agent conversation infrastructure, asynchronous event buses, and research-tested debate patterns.
                  </p>
                  <div className="p-2.5 rounded bg-slate-950/80 font-mono text-[11px] text-teal-300">
                    Terminal: <code>pip install pyautogen</code>
                  </div>
                </div>
              )}
            </div>

            {/* Anti-Lock-in Pill */}
            <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-300 leading-relaxed">
              ❤️ <strong>Remember the Anti-Lock-in Rule:</strong> Concepts transfer 100% between frameworks (state, loops, tools, and prompts remain identical). Stop worrying about picking the wrong one—just pick one and start building!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
