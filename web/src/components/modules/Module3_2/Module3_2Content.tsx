"use client";

import React from "react";
import {
  Network,
  CheckCircle2,
  Code2,
  Layers,
  Sparkles,
  Repeat,
  GitBranch,
  Lightbulb,
} from "lucide-react";
import WorkflowTopologyBuilder from "./WorkflowTopologyBuilder";
import Module3_2Quiz from "./Module3_2Quiz";

export default function Module3_2Content() {
  return (
    <div className="space-y-10">
      {/* Hero Banner */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-slate-50 dark:to-slate-950 p-6 md:p-8 relative overflow-hidden transition-colors">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/30">
              Module 3.2 • Advanced Patterns
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              ~20 min hands-on
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Designing Custom Workflows with State Graphs
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Real enterprise agents are rarely single functions. They are composed into <strong>State Graphs</strong> matching one of three fundamental patterns: straight Linear pipelines, Cyclic self-correction loops, or Branching triage networks.
          </p>
        </div>
      </div>

      {/* Section 1: The 3 Canonical Topologies */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-purple-500" />
          1. The 3 Master Workflow Blueprints
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase flex items-center gap-1.5">
              1. Linear Pipeline
            </span>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white">Assembly Line</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Fixed sequential steps where each node refines previous output (e.g. <code>Load PDF ➔ Extract ➔ Format JSON</code>).
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 uppercase flex items-center gap-1.5">
              2. Cyclic Reflection
            </span>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white">Author & Editor</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Iterative refinement loops. An evaluator grades quality; if imperfect, it loops back to revise until passing score.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
            <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase flex items-center gap-1.5">
              3. Branching Triage
            </span>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white">Hospital ER Triage</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              A classifier node categorizes intent and delegates work to narrow specialist nodes (Billing, Tech, or Support).
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Code Blueprint for Cyclic Reflection */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Code2 className="w-5 h-5 text-pink-500" />
          2. Implementing a Self-Correction Loop in LangGraph
        </h2>
        <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs border border-slate-800 overflow-x-auto">
          <pre>{`from langgraph.graph import StateGraph, START, END

def router_check_quality(state: AgentState):
    # Loop safety ceiling: prevent infinite loops
    if state["loop_count"] >= 3:
        return END
        
    if state["quality_score"] >= 85:
        return END # Passed review!
        
    return "revise_node" # Iterate again!

builder = StateGraph(AgentState)
builder.add_node("draft_node", generate_draft)
builder.add_node("critique_node", review_critique)
builder.add_node("revise_node", rewrite_improvements)

builder.add_edge(START, "draft_node")
builder.add_edge("draft_node", "critique_node")

# Conditional loop edge
builder.add_conditional_edges(
    "critique_node",
    router_check_quality,
    {"revise_node": "revise_node", END: END}
)
builder.add_edge("revise_node", "critique_node") # Loop back`}</pre>
        </div>
      </section>

      {/* Interactive Studio */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            3. Interactive Topology Builder
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Compare Topologies
          </span>
        </div>
        <WorkflowTopologyBuilder />
      </section>

      {/* Section 4: Golden Rule */}
      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 space-y-2">
        <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-semibold text-sm">
          <Lightbulb className="w-4 h-4 text-purple-500 shrink-0" />
          Pro-Tip: Sketch the State Map First
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Before writing any code, sketch your graph on paper: What fields live in the <code>State</code>? Which node writes each field? What is the exit condition? Defining state schemas first prevents messy architectural refactors later.
        </p>
      </div>

      {/* Quiz */}
      <section className="space-y-4">
        <Module3_2Quiz />
      </section>
    </div>
  );
}
