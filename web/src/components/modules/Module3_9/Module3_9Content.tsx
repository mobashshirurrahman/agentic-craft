"use client";

import React from "react";
import {
  Repeat,
  CheckCircle2,
  Code2,
  Layers,
  Sparkles,
  Award,
  Lightbulb,
} from "lucide-react";
import ReflectionEngineStudio from "./ReflectionEngineStudio";
import Module3_9Quiz from "./Module3_9Quiz";

export default function Module3_9Content() {
  return (
    <div className="space-y-10">
      {/* Hero Banner */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-slate-50 dark:to-slate-950 p-6 md:p-8 relative overflow-hidden transition-colors">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/30">
              Module 3.9 • Advanced Patterns
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              ~20 min hands-on
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Implementing the Reflection Pattern
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Before heading out for an important interview, you check yourself in the mirror to fix a crooked tie. The <strong>Reflection Pattern</strong> gives AI agents that exact mirror: an automated loop where a Critic model critiques the Actor's draft and guides a Reviser to polish it before the user ever sees it.
          </p>
        </div>
      </div>

      {/* Section 1: The 3 Core Roles */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-purple-500" />
          1. The 3 Specialized Roles in Reflection
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
            <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase">
              1. The Actor (Draft)
            </span>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white">generator_node</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Generates a fast, raw initial response focused on answering the core question.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
            <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 uppercase">
              2. The Critic (Score)
            </span>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white">critic_node</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Scores the draft against explicit rubrics: tone, conciseness, hallucinated facts, and missing data.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
            <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase">
              3. The Reviser (Fix)
            </span>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white">reviser_node</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Rewrites the draft incorporating the exact critique notes until the score passes 85%.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Code Blueprint */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Code2 className="w-5 h-5 text-pink-500" />
          2. Implementing Reflection in LangGraph
        </h2>
        <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs border border-slate-800 overflow-x-auto">
          <pre>{`from langgraph.graph import StateGraph, START, END

def router_reflection_gate(state: ReflectionState):
    # 1. Dual exit condition: score threshold OR max loop brake
    if state["loop_count"] >= 2 or state["critique_score"] >= 85:
        return END # Passed inspection!
    return "reviser_node"

builder = StateGraph(ReflectionState)
builder.add_node("draft_node", generate_first_draft)
builder.add_node("critic_node", evaluate_rubric)
builder.add_node("reviser_node", rewrite_improvements)

builder.add_edge(START, "draft_node")
builder.add_edge("draft_node", "critic_node")
builder.add_conditional_edges(
    "critic_node",
    router_reflection_gate,
    {"reviser_node": "reviser_node", END: END}
)
builder.add_edge("reviser_node", "critic_node") # Loop back for re-check`}</pre>
        </div>
      </section>

      {/* Interactive Studio */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            3. Interactive Reflection Engine Studio
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Live Actor-Critic Loop
          </span>
        </div>
        <ReflectionEngineStudio />
      </section>

      {/* Section 4: Golden Rule */}
      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 space-y-2">
        <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-semibold text-sm">
          <Lightbulb className="w-4 h-4 text-purple-500 shrink-0" />
          The Rule of Objective Rubrics
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Never tell the critic model to just <em>"make it better"</em>. Provide an explicit rubric: (1) Does it cite numbers? (2) Is the tone executive? (3) Is it under 250 words? Objective rules give the reviser concrete instructions to fix.
        </p>
      </div>

      {/* Quiz */}
      <section className="space-y-4">
        <Module3_9Quiz />
      </section>
    </div>
  );
}
