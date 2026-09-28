"use client";

import React from "react";
import {
  UserCheck,
  CheckCircle2,
  Code2,
  Layers,
  Sparkles,
  PauseCircle,
  ShieldAlert,
  Lightbulb,
} from "lucide-react";
import HumanInTheLoopStudio from "./HumanInTheLoopStudio";
import Module3_8Quiz from "./Module3_8Quiz";

export default function Module3_8Content() {
  return (
    <div className="space-y-10">
      {/* Hero Banner */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-slate-50 dark:to-slate-950 p-6 md:p-8 relative overflow-hidden transition-colors">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30">
              Module 3.8 • Advanced Patterns
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              ~20 min hands-on
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Adding Human-in-the-Loop Checkpoints
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Giving an autonomous agent the power to unilaterally delete databases or wire money is an existential business risk. <strong>Human-in-the-Loop (HITL)</strong> acts as an airplane co-pilot: the agent automates the research and drafts the action, but a human must confirm before landing the plane.
          </p>
        </div>
      </div>

      {/* Section 1: The 3 Canonical HITL Patterns */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-amber-500" />
          1. The 3 Master HITL Interaction Patterns
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
            <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 uppercase">
              1. Approval Gate
            </span>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white">Yes / No Breakpoint</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Execution pauses right before a critical action. A human reviews the plan and clicks <strong>Approve</strong> or <strong>Reject</strong>.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
            <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase">
              2. Edit State
            </span>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white">Human Calibration</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Human reviews the agent's proposed arguments and edits them (e.g. changing refund amount from $5,000 to $500) before resuming.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
            <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400 uppercase">
              3. Wait for Input
            </span>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white">Missing Information</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              The agent pauses because it lacks critical data (e.g., asking user for an OTP code or manager approval signature).
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Code Blueprint */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Code2 className="w-5 h-5 text-orange-500" />
          2. Implementing Breakpoints in LangGraph
        </h2>
        <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs border border-slate-800 overflow-x-auto">
          <pre>{`from langgraph.checkpoint.memory import MemorySaver
from langgraph.graph import StateGraph

checkpointer = MemorySaver()
builder = StateGraph(BankingState)
# ... define nodes and edges ...

# 1. Compile with interrupt_before:
app = builder.compile(
    checkpointer=checkpointer,
    interrupt_before=["transfer_money_tool"] # PAUSES HERE!
)

config = {"configurable": {"thread_id": "session-42"}}

# 2. Run graph: halts cleanly right before transfer_money_tool
app.invoke({"amount": 2500, "recipient": "Acme Corp"}, config=config)

# 3. Later, after human clicks 'Approve' in UI, resume execution:
app.invoke(None, config=config) # Continues from breakpoint!`}</pre>
        </div>
      </section>

      {/* Interactive Studio */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            3. Interactive Human-in-the-Loop Studio
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Live Breakpoint Simulator
          </span>
        </div>
        <HumanInTheLoopStudio />
      </section>

      {/* Section 4: Golden Rule */}
      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 space-y-2">
        <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-semibold text-sm">
          <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
          The Principle of Least Irreversibility
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Read-only operations (searching docs, analyzing data, drafting text) should be 100% autonomous. Destructive, legal, or financial write operations should always pass through an approval checkpoint.
        </p>
      </div>

      {/* Quiz */}
      <section className="space-y-4">
        <Module3_8Quiz />
      </section>
    </div>
  );
}
