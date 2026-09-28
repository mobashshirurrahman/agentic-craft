"use client";

import React from "react";
import {
  GitBranch,
  Sparkles,
  ArrowRight,
  Code2,
  Cpu,
  Layers,
  CheckCircle2,
} from "lucide-react";
import LangGraphVisualizer from "./LangGraphVisualizer";
import Module2_7Quiz from "./Module2_7Quiz";

export default function Module2_7Content() {
  return (
    <div className="space-y-10">
      {/* Hero Banner */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-purple-500/10 via-sky-500/5 to-slate-50 dark:to-slate-950 p-6 md:p-8 relative overflow-hidden transition-colors">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/30">
              Module 2.7 • Core Implementation
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              ~20 min hands-on
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Understanding Nodes and Edges in LangGraph
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            While-loops are hard to debug and branch. <strong>LangGraph</strong> models agents as <strong>graphs</strong>: functions become <em>Nodes</em>, and transitions become <em>Edges</em>. This enables checkpoints, time-travel, and complex cyclical routing.
          </p>
        </div>
      </div>

      {/* Section 1: Core Anatomy of LangGraph */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-purple-500" />
          1. The Graph Anatomy: Nodes & Edges
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 uppercase">
              1. Nodes (The Workers)
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Standard Python functions that take the current <code className="font-mono text-slate-800 dark:text-slate-200">state</code>, perform computation (LLM call, API request, DB query), and return a state update dictionary.
            </p>
            <div className="p-2 rounded bg-slate-900 text-sky-300 font-mono text-[11px]">
              builder.add_node(&quot;call_model&quot;, model_function)
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400 uppercase">
              2. Edges (The Flow Controllers)
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Rules determining which node executes next. Includes <strong>Normal Edges</strong> (direct link) and <strong>Conditional Edges</strong> (dynamic router function based on state).
            </p>
            <div className="p-2 rounded bg-slate-900 text-purple-300 font-mono text-[11px]">
              builder.add_edge(&quot;call_tools&quot;, &quot;call_model&quot;)
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Complete Code Walkthrough */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Code2 className="w-5 h-5 text-sky-500" />
          2. Building a ReAct Graph in Python
        </h2>
        <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs border border-slate-800 overflow-x-auto">
          <pre>{`from langgraph.graph import StateGraph, START, END

# 1. Routing function for Conditional Edge
def should_continue(state):
    last_message = state["messages"][-1]
    if last_message.tool_calls:
        return "tools"  # Route to tool execution node
    return "end"        # Route to END

# 2. Build Graph
builder = StateGraph(State)
builder.add_node("call_model", call_model)
builder.add_node("call_tools", call_tools)

# 3. Add Edges
builder.add_edge(START, "call_model")
builder.add_conditional_edges(
    "call_model",
    should_continue,
    {"tools": "call_tools", "end": END}
)
builder.add_edge("call_tools", "call_model")  # Loop back!

# 4. Compile into executable runnable
app = builder.compile()`}</pre>
        </div>
      </section>

      {/* Interactive Graph Canvas */}
      <section className="space-y-4">
        <LangGraphVisualizer />
      </section>

      {/* Quiz */}
      <section className="space-y-4">
        <Module2_7Quiz />
      </section>

      {/* Next Step Callout */}
      <div className="p-4 rounded-xl border border-purple-500/30 bg-purple-500/10 text-xs font-mono text-slate-700 dark:text-slate-300 flex items-center justify-between">
        <span>Up Next: Module 2.8 — Defining and Managing State in LangGraph</span>
        <ArrowRight className="w-4 h-4 text-purple-500" />
      </div>
    </div>
  );
}
