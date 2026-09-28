"use client";
import React from "react";
import { Clock, Code2, Sparkles, Lightbulb, CheckCircle2, GitBranch } from "lucide-react";
import TimeTravelDebugger from "./TimeTravelDebugger";
import Module4_8Quiz from "./Module4_8Quiz";

export default function Module4_8Content() {
  return (
    <div className="space-y-10">
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-violet-500/10 via-purple-500/5 to-slate-50 dark:to-slate-950 p-6 md:p-8">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-violet-500/20 text-violet-700 dark:text-violet-300 border border-violet-500/30">Module 4.8 • Production, Scaling & Optimization</span>
            <span className="text-xs font-mono text-slate-500">~20 min</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Using Time Travel for State Branching</h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Imagine your agent completes a 10-step research workflow, and at step 6 you notice it used the wrong ranking metric. Without time travel, you throw away 5 steps of expensive tool calls and re-run everything from scratch. <strong>LangGraph&apos;s time travel is Git for agent execution</strong> — rewind to any checkpoint, fix the bug, and replay from exactly that point.
          </p>
        </div>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2"><Clock className="w-5 h-5 text-violet-500" />1. How Checkpoints Enable Time Travel</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { step: "Every node execution saves a checkpoint", detail: "LangGraph automatically persists the full state after every node. With MemorySaver or PostgresSaver, these are permanent.", color: "violet" },
            { step: "You can navigate the checkpoint timeline", detail: "Call `app.get_state_history(config)` to see every checkpoint in reverse order — like a git log for your agent.", color: "blue" },
            { step: "Rewind + inject correction = new branch", detail: "Pick a checkpoint, modify state (fix a parameter, correct a value), and invoke from there. LangGraph creates a new execution branch.", color: "emerald" },
          ].map((item, i) => (
            <div key={i} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
              <div className={`text-xs font-mono font-bold text-${item.color}-600 dark:text-${item.color}-400`}>Step {i + 1}</div>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{item.step}</p>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2"><Code2 className="w-5 h-5 text-teal-500" />2. Time Travel in LangGraph — 4 Lines to Rewind</h2>
        <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs border border-slate-800 overflow-x-auto">
          <pre>{`from langgraph.checkpoint.memory import MemorySaver
from langgraph.graph import StateGraph

# ── Step 1: Run with checkpointing ───────────────
memory = MemorySaver()
app = graph.compile(checkpointer=memory)

config = {"configurable": {"thread_id": "analysis-001"}}
app.invoke({"query": "Analyze top 5 AI stocks"}, config=config)

# ── Step 2: View the checkpoint timeline ─────────
history = list(app.get_state_history(config))
# history[0] = most recent, history[-1] = START
# Each item has: .config (checkpoint_id), .values (full state), .next (next node)

for checkpoint in history:
    print(checkpoint.config["configurable"]["checkpoint_id"])
    print(checkpoint.values["step"])  # e.g., "analysis", "research"

# ── Step 3: Identify the buggy checkpoint ────────
buggy_checkpoint = history[2]  # analysis step — used wrong metric

# ── Step 4: Inject correction + branch ───────────
# Modify state at the checkpoint
app.update_state(
    buggy_checkpoint.config,
    {"ranking_metric": "market_cap"}  # was "volume" — now corrected
)

# Re-run from that checkpoint — only re-executes downstream nodes
corrected_result = app.invoke(None, config=buggy_checkpoint.config)
# ↑ Steps 1-2 preserved. Only steps 3-N re-execute with the fix.`}</pre>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2"><Sparkles className="w-5 h-5 text-violet-500" />3. Interactive Time Travel Debugger</h2>
        </div>
        <TimeTravelDebugger />
      </section>

      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2"><GitBranch className="w-5 h-5 text-blue-500" />4. Use Cases Beyond Debugging</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { title: "A/B Test Prompts", body: "Branch from the same checkpoint with Prompt A vs Prompt B. Both branches start from identical state — pure comparison, no variance from different inputs." },
            { title: "HITL Correction", body: "Agent produces a draft. Human reviews, rejects, edits a parameter in state. Agent re-runs from that checkpoint with the human correction applied." },
            { title: "What-If Analysis", body: "Create multiple branches from the same decision point to explore alternative agent strategies — like parallel universes for your agent execution." },
          ].map((item) => (
            <div key={item.title} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
              <h3 className="text-xs font-bold text-violet-700 dark:text-violet-400">{item.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 space-y-2">
        <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-semibold text-sm"><Lightbulb className="w-4 h-4 text-violet-500 shrink-0" />Time Travel Requires a Persistent Checkpointer</div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">MemorySaver works for development — all checkpoints live in RAM and disappear on process restart. For production, use PostgresSaver or RedisSaver. The checkpointer is what makes time travel permanent and shareable across sessions.</p>
      </div>
      <section className="space-y-4"><Module4_8Quiz /></section>
    </div>
  );
}
