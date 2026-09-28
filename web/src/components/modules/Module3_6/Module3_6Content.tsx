"use client";

import React from "react";
import {
  ListTodo,
  CheckCircle2,
  Code2,
  Layers,
  Sparkles,
  ArrowRight,
  Lightbulb,
} from "lucide-react";
import PlanAndExecuteStudio from "./PlanAndExecuteStudio";
import Module3_6Quiz from "./Module3_6Quiz";

export default function Module3_6Content() {
  return (
    <div className="space-y-10">
      {/* Hero Banner */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-slate-50 dark:to-slate-950 p-6 md:p-8 relative overflow-hidden transition-colors">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30">
              Module 3.6 • Advanced Patterns
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              ~20 min hands-on
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Constructing Plan-and-Execute Agent Systems
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            When planning a vacation, you don't step outside and guess your direction at every corner (ReAct). You create a <strong>flight and hotel itinerary first</strong> (Plan), execute tasks one by one, and update the schedule if a flight is delayed (Replan).
          </p>
        </div>
      </div>

      {/* Section 1: ReAct vs Plan-and-Execute */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-500" />
          1. ReAct vs. Plan-and-Execute
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 uppercase flex items-center gap-1.5">
              🏃 ReAct (Reactive, Step-by-Step)
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Decides what to do next one action at a time. Fast for simple inquiries, but prone to wandering in circles on long multi-step research tasks.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-indigo-200 dark:border-indigo-900/40 bg-indigo-50/50 dark:bg-indigo-950/20 space-y-2">
            <span className="text-xs font-mono font-bold text-indigo-700 dark:text-indigo-400 uppercase flex items-center gap-1.5">
              🗺️ Plan-and-Execute (Deliberate Roadmap)
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              An <strong>Architect model</strong> writes a clear todo list first. An <strong>Executor model</strong> tackles each step. A <strong>Replanner</strong> dynamically revises the remaining tasks.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Code Blueprint */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Code2 className="w-5 h-5 text-purple-500" />
          2. Implementing Plan-and-Execute in LangGraph
        </h2>
        <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs border border-slate-800 overflow-x-auto">
          <pre>{`from typing import List, TypedDict
from langgraph.graph import StateGraph, START, END

class PlanExecuteState(TypedDict):
    input: str
    plan: List[str]
    past_steps: List[tuple]
    response: str

def planner_node(state: PlanExecuteState):
    # Generates initial list of tasks
    steps = planner_llm.invoke(f"Decompose this goal: {state['input']}")
    return {"plan": steps}

def executor_node(state: PlanExecuteState):
    current_task = state["plan"][0]
    result = agent_executor.invoke({"task": current_task})
    return {"past_steps": [(current_task, result)]}

def replanner_node(state: PlanExecuteState):
    # If all tasks are finished, output final answer
    if len(state["plan"]) <= 1:
        return {"response": "All tasks completed successfully."}
    # Otherwise, prune completed step and update remaining plan
    return {"plan": state["plan"][1:]}

# Wire Graph
builder = StateGraph(PlanExecuteState)
builder.add_node("planner", planner_node)
builder.add_node("executor", executor_node)
builder.add_node("replanner", replanner_node)

builder.add_edge(START, "planner")
builder.add_edge("planner", "executor")
builder.add_edge("executor", "replanner")
builder.add_conditional_edges(
    "replanner",
    lambda state: END if state.get("response") else "executor"
)`}</pre>
        </div>
      </section>

      {/* Interactive Studio */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-500" />
            3. Interactive Plan-and-Execute Studio
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Live Todo List Execution
          </span>
        </div>
        <PlanAndExecuteStudio />
      </section>

      {/* Section 4: Golden Rule */}
      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 space-y-2">
        <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-semibold text-sm">
          <Lightbulb className="w-4 h-4 text-indigo-500 shrink-0" />
          The Rule of Task Complexity
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          For single-turn queries (<em>"What is the capital of Japan?"</em>), Plan-and-Execute adds unnecessary latency and cost. Reserve it for complex objectives requiring 3+ distinct tools and intermediate data synthesis.
        </p>
      </div>

      {/* Quiz */}
      <section className="space-y-4">
        <Module3_6Quiz />
      </section>
    </div>
  );
}
