"use client";

import React from "react";
import {
  Database,
  Layers,
  Sparkles,
  ArrowRight,
  Code2,
  CheckCircle2,
  Sliders,
} from "lucide-react";
import LangGraphStateInspector from "./LangGraphStateInspector";
import Module2_8Quiz from "./Module2_8Quiz";

export default function Module2_8Content() {
  return (
    <div className="space-y-10">
      {/* Hero Banner */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-slate-50 dark:to-slate-950 p-6 md:p-8 relative overflow-hidden transition-colors">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
              Module 2.8 • Core Implementation
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              ~15 min hands-on
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Defining and Managing State in LangGraph
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            State is the shared memory of your graph. As nodes execute, they return partial updates. Understanding <strong>state schemas</strong> and <strong>reducers</strong> is what prevents your agent from accidentally erasing its own memory.
          </p>
        </div>
      </div>

      {/* Section 1: TypedDict vs Pydantic */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Database className="w-5 h-5 text-emerald-500" />
          1. State Schemas: TypedDict vs Pydantic
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
            <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase">
              TypedDict (Fast & Lightweight)
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Ideal for most agent graphs. Provides static type hints without runtime serialization overhead.
            </p>
            <div className="p-2 rounded bg-slate-900 text-emerald-300 font-mono text-[11px]">
              class AgentState(TypedDict): ...
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
            <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 uppercase">
              Pydantic BaseModel (Validation)
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Adds strict runtime data validation and value constraints. Great for public API ingestion nodes.
            </p>
            <div className="p-2 rounded bg-slate-900 text-sky-300 font-mono text-[11px]">
              class AgentState(BaseModel): ...
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Reducers & operator.add */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-teal-500" />
          2. The Reducer Secret: Overwrite vs. Append
        </h2>
        <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          By default, when Node B returns <code className="font-mono">{`{"messages": [new_msg]}`}</code>, LangGraph <strong>overwrites</strong> the entire list! To accumulate conversational history, wrap the key with an <strong>Annotated Reducer</strong>:
        </p>

        <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs border border-slate-800 overflow-x-auto">
          <pre>{`from typing import TypedDict, Annotated
import operator
from langgraph.graph.message import add_messages

class AgentState(TypedDict):
    # Option A: Python's standard operator.add (appends lists)
    items: Annotated[list, operator.add]

    # Option B: LangGraph's add_messages (handles deduplication by ID!)
    messages: Annotated[list, add_messages]

    # Without annotation, this key is simply overwritten on each update:
    current_step: int`}</pre>
        </div>
      </section>

      {/* Interactive State Inspector */}
      <section className="space-y-4">
        <LangGraphStateInspector />
      </section>

      {/* Quiz */}
      <section className="space-y-4">
        <Module2_8Quiz />
      </section>

      {/* Next Step Callout */}
      <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-xs font-mono text-slate-700 dark:text-slate-300 flex items-center justify-between">
        <span>Up Next: Module 2.9 — Debugging Agent Executions with Logging</span>
        <ArrowRight className="w-4 h-4 text-emerald-500" />
      </div>
    </div>
  );
}
