"use client";

import React from "react";
import {
  Database,
  CheckCircle2,
  Code2,
  Layers,
  Sparkles,
  HardDrive,
  Key,
  Lightbulb,
} from "lucide-react";
import DatabaseCheckpointerStudio from "./DatabaseCheckpointerStudio";
import Module3_10Quiz from "./Module3_10Quiz";

export default function Module3_10Content() {
  return (
    <div className="space-y-10">
      {/* Hero Banner */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-emerald-500/10 via-cyan-500/5 to-slate-50 dark:to-slate-950 p-6 md:p-8 relative overflow-hidden transition-colors">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
              Module 3.10 • Advanced Patterns
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              ~20 min hands-on
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Managing Conversation History in a Database
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            In-memory session storage vanishes when your cloud container restarts. Like <strong>saving your progress in a video game</strong>, production agents use persistent <strong>Database Checkpointers</strong> to save state snapshots to PostgreSQL or SQLite, partitioned securely by <code>thread_id</code>.
          </p>
        </div>
      </div>

      {/* Section 1: The Video Game Save Slot Principle */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-emerald-500" />
          1. The 3 Lifecycle Phases of Database Checkpointing
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
            <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase">
              1. Load Phase
            </span>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white">Load by thread_id</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              When a user sends a message, LangGraph queries the DB for the latest checkpoint matching that exact <code>thread_id</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
            <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase">
              2. Mutate Phase
            </span>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white">Node Execution</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Nodes execute their tools and update state fields in memory without worrying about database connection pools.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
            <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400 uppercase">
              3. Commit Phase
            </span>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white">Linked Checkpoint</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              LangGraph writes a new row containing the updated state and points its <code>parent_id</code> to the previous step.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Code Blueprint */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Code2 className="w-5 h-5 text-teal-500" />
          2. Production PostgresSaver Pattern in LangGraph
        </h2>
        <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs border border-slate-800 overflow-x-auto">
          <pre>{`from psycopg_pool import ConnectionPool
from langgraph.checkpoint.postgres import PostgresSaver
from langgraph.graph import StateGraph

# 1. Initialize persistent PostgreSQL connection pool
connection_kwargs = {"autocommit": True, "prepare_threshold": 0}
pool = ConnectionPool(conninfo="postgresql://user:pass@localhost:5432/agent_db", kwargs=connection_kwargs)

with PostgresSaver(pool) as checkpointer:
    # Creates necessary tables: checkpoints, checkpoint_blobs, checkpoint_writes
    checkpointer.setup()

    # 2. Compile graph with PostgreSQL persistence
    app = builder.compile(checkpointer=checkpointer)

    # 3. Thread configuration isolates Alice's context from Bob's
    config = {"configurable": {"thread_id": "user-alice-session-9"}}
    response = app.invoke({"messages": [("user", "Check my balance")]}, config=config)`}</pre>
        </div>
      </section>

      {/* Interactive Studio */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-500" />
            3. Interactive Database Checkpointer Studio
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Live Checkpoint Inspector
          </span>
        </div>
        <DatabaseCheckpointerStudio />
      </section>

      {/* Section 4: Golden Rule */}
      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 space-y-2">
        <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-semibold text-sm">
          <Lightbulb className="w-4 h-4 text-emerald-500 shrink-0" />
          Production Engineering Rule: Plan for Checkpoint Pruning
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Because checkpointers write an immutable row on every single step, active enterprise chatbots generate thousands of checkpoints daily. Implement a TTL (Time-To-Live) partition or archival cron job to prune checkpoints older than 30 days to prevent ballooning storage costs.
        </p>
      </div>

      {/* Quiz */}
      <section className="space-y-4">
        <Module3_10Quiz />
      </section>
    </div>
  );
}
