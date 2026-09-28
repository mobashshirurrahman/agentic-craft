"use client";

import React from "react";
import {
  GitFork,
  CheckCircle2,
  Code2,
  Layers,
  Sparkles,
  ArrowRight,
  Lightbulb,
} from "lucide-react";
import ConditionalEdgeSimulator from "./ConditionalEdgeSimulator";
import Module3_1Quiz from "./Module3_1Quiz";

export default function Module3_1Content() {
  return (
    <div className="space-y-10">
      {/* Hero Banner */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-violet-500/10 via-purple-500/5 to-slate-50 dark:to-slate-950 p-6 md:p-8 relative overflow-hidden transition-colors">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-violet-500/20 text-violet-700 dark:text-violet-300 border border-violet-500/30">
              Module 3.1 • Advanced Patterns
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              ~20 min hands-on
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Implementing Conditional Edges in LangGraph
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Standard pipelines flow in a straight line. Real agents make decisions. <strong>Conditional edges</strong> are the railway switches of LangGraph—they inspect current state and dynamically route execution to the right destination node.
          </p>
        </div>
      </div>

      {/* Section 1: The Railway Switch Mental Model */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-violet-500" />
          1. The 3 Core Components of a Dynamic Route
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
            <span className="text-xs font-mono font-bold text-violet-600 dark:text-violet-400 uppercase">
              1. Source Node
            </span>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white">Where It Begins</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              The node that just finished its work and updated state (e.g., <code>"agent_model"</code>).
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
            <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400 uppercase">
              2. Routing Function
            </span>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white">The State Inspector</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              A pure Python function that reads <code>state</code> and returns a decision string (e.g. <code>"continue"</code> or <code>"end"</code>).
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
            <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase">
              3. Path Map
            </span>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white">The Destination Table</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              A dictionary matching the returned string to the actual target graph node or <code>END</code>.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Code Blueprint */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Code2 className="w-5 h-5 text-purple-500" />
          2. The Conditional Edge Code Pattern
        </h2>
        <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs border border-slate-800 overflow-x-auto">
          <pre>{`from typing import Literal
from langgraph.graph import StateGraph, START, END

# 1. Routing function: Inspects state and returns choice
def should_continue(state: AgentState) -> Literal["call_tools", "__end__"]:
    last_message = state["messages"][-1]
    
    # If LLM requested tools, go to tools node
    if last_message.tool_calls:
        return "call_tools"
        
    # Otherwise, stop and return answer to user
    return "__end__"

# 2. Wire conditional edge to the StateGraph builder
builder = StateGraph(AgentState)
builder.add_node("agent", call_model_node)
builder.add_node("call_tools", execute_tools_node)

builder.add_edge(START, "agent")

# The Switch: routes out of "agent" dynamically!
builder.add_conditional_edges(
    "agent",
    should_continue,
    {
        "call_tools": "call_tools",
        "__end__": END,
    }
)
builder.add_edge("call_tools", "agent") # Loop back after tools`}</pre>
        </div>
      </section>

      {/* Interactive Studio */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-violet-500" />
            3. Interactive Railway Switch Simulator
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Live Route Inspector
          </span>
        </div>
        <ConditionalEdgeSimulator />
      </section>

      {/* Section 4: Golden Rule */}
      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 space-y-2">
        <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-semibold text-sm">
          <Lightbulb className="w-4 h-4 text-violet-500 shrink-0" />
          The Architect's Rule: Routing Functions Decide, Nodes Execute
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Never make external API calls, write to databases, or run LLM inference inside a routing function. Keep routing functions lightweight (&lt;1ms)—their only job is reading state and returning a string.
        </p>
      </div>

      {/* Quiz */}
      <section className="space-y-4">
        <Module3_1Quiz />
      </section>
    </div>
  );
}
