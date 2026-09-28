"use client";

import React from "react";
import {
  Brain,
  CheckCircle2,
  Code2,
  Layers,
  Sparkles,
  Users,
  FolderGit2,
  Lightbulb,
} from "lucide-react";
import DeepAgentPlannerWorkbench from "./DeepAgentPlannerWorkbench";
import Module3_7Quiz from "./Module3_7Quiz";

export default function Module3_7Content() {
  return (
    <div className="space-y-10">
      {/* Hero Banner */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-slate-50 dark:to-slate-950 p-6 md:p-8 relative overflow-hidden transition-colors">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-500/30">
              Module 3.7 • Advanced Patterns
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              ~20 min hands-on
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Implementing Deep Planning Agents
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Giving an intern a vague order like <em>"Fix the website"</em> leads to failure. A senior software engineer creates a <strong>sprint board, breaks tasks into sub-tasks, assigns specialists, and tracks progress</strong>. That is the essence of a Deep Planning Agent.
          </p>
        </div>
      </div>

      {/* Section 1: Shallow vs Deep Agents */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-blue-500" />
          1. Shallow Agents vs. Deep Planning Agents
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <span className="text-xs font-mono font-bold text-slate-500 uppercase flex items-center gap-1.5">
              🏃 Shallow Agent (Generic Assistant)
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Generic prompt (<em>"You are a helpful assistant"</em>) with basic tools. Works well for simple 1-step questions, but collapses when faced with a 50-file codebase refactor.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-900/40 bg-blue-50/50 dark:bg-blue-950/20 space-y-2">
            <span className="text-xs font-mono font-bold text-blue-700 dark:text-blue-400 uppercase flex items-center gap-1.5">
              🧠 Deep Agent (Autonomous Engineer)
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Equipped with <strong>dynamic todo trackers</strong>, decision-tree prompts, specialized sub-agents, and persistent filesystem access to sustain hours of autonomous work.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: The 4 Core Pillars */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Brain className="w-5 h-5 text-indigo-500" />
          2. The 4 Core Architectural Pillars
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
            <span className="font-bold text-blue-600 dark:text-blue-400 font-mono uppercase text-[10px]">
              1. Decision Trees
            </span>
            <p className="text-slate-600 dark:text-slate-400">
              System prompts define strict algorithmic fallbacks: <em>"Search functions before files; inspect tests before modifying code."</em>
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
            <span className="font-bold text-indigo-600 dark:text-indigo-400 font-mono uppercase text-[10px]">
              2. Todo Trackers
            </span>
            <p className="text-slate-600 dark:text-slate-400">
              An explicit in-context checklist that prevents context drift and hallucinated progress across long sessions.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
            <span className="font-bold text-purple-600 dark:text-purple-400 font-mono uppercase text-[10px]">
              3. Sub-Agents
            </span>
            <p className="text-slate-600 dark:text-slate-400">
              Decomposing big problems into isolated worker agents (Research, Backend, Frontend, QA) with dedicated context windows.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
            <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono uppercase text-[10px]">
              4. Filesystem
            </span>
            <p className="text-slate-600 dark:text-slate-400">
              Local disk access serves as external unlimited scratchpad memory beyond the limited LLM token window.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Studio */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-500" />
            3. Interactive Deep Agent Planner Studio
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Live Architecture Workbench
          </span>
        </div>
        <DeepAgentPlannerWorkbench />
      </section>

      {/* Section 4: Golden Rule */}
      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 space-y-2">
        <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-semibold text-sm">
          <Lightbulb className="w-4 h-4 text-blue-500 shrink-0" />
          The Law of Proportional Architecture
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Deep agents are powerful, but deploying a full multi-agent deep planner for <em>"What's the weather?"</em> is massive overkill. Match agent sophistication directly to the depth of the task.
        </p>
      </div>

      {/* Quiz */}
      <section className="space-y-4">
        <Module3_7Quiz />
      </section>
    </div>
  );
}
