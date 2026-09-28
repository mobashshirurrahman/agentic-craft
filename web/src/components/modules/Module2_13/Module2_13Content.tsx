"use client";

import React from "react";
import {
  Timer,
  Sparkles,
  ArrowRight,
  Code2,
  Cpu,
  Clock,
  Zap,
} from "lucide-react";
import AsyncVsSyncBenchmarker from "./AsyncVsSyncBenchmarker";
import Module2_13Quiz from "./Module2_13Quiz";

export default function Module2_13Content() {
  return (
    <div className="space-y-10">
      {/* Hero Banner */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-blue-500/10 via-sky-500/5 to-slate-50 dark:to-slate-950 p-6 md:p-8 relative overflow-hidden transition-colors">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-500/30">
              Module 2.13 • Core Implementation
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              ~20 min hands-on
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Configuring Async and Sync Agent Execution
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            LLM applications are almost entirely <strong>I/O-bound</strong>. While waiting 2 seconds for a model response, your CPU sits idle. Understanding <strong>asynchronous execution</strong> allows your agent to handle dozens of concurrent user tasks simultaneously.
          </p>
        </div>
      </div>

      {/* Section 1: The I/O-Bound Reality */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Zap className="w-5 h-5 text-blue-500" />
          1. The Math of Concurrency
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
            <span className="text-xs font-mono font-bold text-red-600 dark:text-red-400 uppercase">
              Sequential (Synchronous)
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              6 tasks executed one after another: <strong>6 × 2.0s = 12.0s</strong> total delay. Blocks user thread.
            </p>
            <div className="p-2 rounded bg-slate-900 text-slate-300 font-mono text-[11px]">
              result = agent.invoke(...)
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
            <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase">
              Concurrent (Asynchronous)
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              6 tasks dispatched concurrently: <strong>~2.2s total delay</strong> (5.5x faster throughput!).
            </p>
            <div className="p-2 rounded bg-slate-900 text-blue-300 font-mono text-[11px]">
              result = await agent.ainvoke(...)
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Method Naming & Thread Bridging */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Code2 className="w-5 h-5 text-sky-500" />
          2. Async Method Patterns in Python
        </h2>
        <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs border border-slate-800 overflow-x-auto">
          <pre>{`import asyncio

# 1. Async agent invocation
async def process_batch(prompts: list[str]):
    # asyncio.gather fires all requests concurrently!
    tasks = [agent.ainvoke({"messages": [("user", p)]}) for p in prompts]
    return await asyncio.gather(*tasks)

# 2. Safely wrapping a legacy blocking sync tool:
def legacy_sql_query(sql: str):
    ...  # blocking sync DB call

async def safe_tool_wrapper(sql: str):
    # Offloads blocking work to worker thread pool
    return await asyncio.to_thread(legacy_sql_query, sql)`}</pre>
        </div>
      </section>

      {/* Interactive Benchmarker */}
      <section className="space-y-4">
        <AsyncVsSyncBenchmarker />
      </section>

      {/* Quiz */}
      <section className="space-y-4">
        <Module2_13Quiz />
      </section>

      {/* Next Step Callout */}
      <div className="p-4 rounded-xl border border-blue-500/30 bg-blue-500/10 text-xs font-mono text-slate-700 dark:text-slate-300 flex items-center justify-between">
        <span>Up Next: Module 2.14 — Creating Reusable Dynamic Prompt Templates</span>
        <ArrowRight className="w-4 h-4 text-blue-500" />
      </div>
    </div>
  );
}
