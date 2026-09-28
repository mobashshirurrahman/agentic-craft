"use client";

import React from "react";
import {
  RotateCcw,
  Sparkles,
  ArrowRight,
  Terminal,
  AlertTriangle,
  CheckCircle2,
  Code2,
} from "lucide-react";
import AgentLoopSimulator from "./AgentLoopSimulator";
import Module2_6Quiz from "./Module2_6Quiz";

export default function Module2_6Content() {
  return (
    <div className="space-y-10">
      {/* Hero Banner */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-sky-500/10 via-teal-500/5 to-slate-50 dark:to-slate-950 p-6 md:p-8 relative overflow-hidden transition-colors">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-sky-500/20 text-sky-700 dark:text-sky-300 border border-sky-500/30">
              Module 2.6 • Core Implementation
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              ~15 min hands-on
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Implementing Loops for Multi-Step Agent Tasks
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            In Module 2.5, our scratch agent ran a single turn. But real tasks require <strong>multi-turn iterative loops</strong>—repeating Thought ➔ Action ➔ Observation until the problem is solved.
          </p>
        </div>
      </div>

      {/* Section 1: The While Loop Engine */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <RotateCcw className="w-5 h-5 text-sky-500" />
          1. The Multi-Step while Loop Pattern
        </h2>
        <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          The agent loop requires two critical rules: an <strong>exit condition</strong> (model stops calling tools) and a <strong>hard iteration ceiling</strong> (preventing runaway token costs).
        </p>

        <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs border border-slate-800 overflow-x-auto">
          <pre>{`def run_loop(agent, prompt, max_iterations=5):
    agent.add_user_message(prompt)

    for i in range(max_iterations):
        thought, action = agent.step()
        
        # 1. Exit condition: Model produced direct answer without actions
        if not action:
            return agent.get_final_response()

        # 2. Execute tool and feed observation back into context
        observation = execute_action(action.name, action.args)
        agent.add_observation(observation)

    return "Error: Agent reached max iteration ceiling without resolving."`}</pre>
        </div>
      </section>

      {/* Interactive Simulator */}
      <section className="space-y-4">
        <AgentLoopSimulator />
      </section>

      {/* Section 2: Loop Failure Modes */}
      <section className="p-5 rounded-xl border border-amber-500/30 bg-amber-500/10 text-xs text-slate-700 dark:text-slate-300 space-y-2">
        <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
          <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          Why While-Loops Aren&apos;t Enough for Production
        </div>
        <p className="text-[11px] leading-relaxed">
          While raw Python loops work for simple scripts, production applications quickly need branching logic, human approval mid-loop, checkpoints, and time travel. This is why we transition to <strong>State Graphs (LangGraph)</strong> in Module 2.7!
        </p>
      </section>

      {/* Quiz */}
      <section className="space-y-4">
        <Module2_6Quiz />
      </section>

      {/* Next Step Callout */}
      <div className="p-4 rounded-xl border border-sky-500/30 bg-sky-500/10 text-xs font-mono text-slate-700 dark:text-slate-300 flex items-center justify-between">
        <span>Up Next: Module 2.7 — Understanding Nodes and Edges in LangGraph</span>
        <ArrowRight className="w-4 h-4 text-sky-500" />
      </div>
    </div>
  );
}
