"use client";

import React from "react";
import {
  Activity,
  Sparkles,
  ArrowRight,
  Code2,
  Bug,
  CheckCircle2,
  Terminal,
} from "lucide-react";
import StructuredLoggingDebugger from "./StructuredLoggingDebugger";
import Module2_9Quiz from "./Module2_9Quiz";

export default function Module2_9Content() {
  return (
    <div className="space-y-10">
      {/* Hero Banner */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-amber-500/10 via-sky-500/5 to-slate-50 dark:to-slate-950 p-6 md:p-8 relative overflow-hidden transition-colors">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30">
              Module 2.9 • Core Implementation
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              ~20 min hands-on
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Debugging Agent Executions with Logging
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            When an agent fails to complete a task, diagnosing why is notoriously difficult due to non-deterministic outputs and hidden intermediate reasoning. <strong>Structured observability</strong> turns the black box into an open window.
          </p>
        </div>
      </div>

      {/* Section 1: The Observability Pillars */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Activity className="w-5 h-5 text-amber-500" />
          1. What to Log in an Agent Run
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 uppercase">
              1. LLM Interactions
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Exact system prompts, user variables, raw model completions, token counts, and API response latencies.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 uppercase">
              2. Tool Activity
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Parsed arguments, execution timestamps, database query durations, and raw returned observation payloads.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase">
              3. Telemetry & Cost
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Run IDs, user session identifiers, total token expenditure, and estimated financial cost per execution.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Code Walkthrough */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Code2 className="w-5 h-5 text-sky-500" />
          2. Implementing Structured Logging in Python
        </h2>
        <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs border border-slate-800 overflow-x-auto">
          <pre>{`import logging, json

logger = logging.getLogger("agent.core")
logger.setLevel(logging.INFO)

def log_event(level: str, event_type: str, data: dict):
    payload = {
        "timestamp": datetime.utcnow().isoformat(),
        "run_id": current_run_id,
        "event": event_type,
        **data
    }
    # Emits machine-parsable JSON
    getattr(logger, level.lower())(json.dumps(payload))

# Usage inside a LangGraph Node:
log_event("INFO", "tool_called", {
    "tool": "search_db",
    "params": {"query": "Q4 earnings"},
    "latency_ms": 142
})`}</pre>
        </div>
      </section>

      {/* Interactive Logging Studio */}
      <section className="space-y-4">
        <StructuredLoggingDebugger />
      </section>

      {/* Quiz */}
      <section className="space-y-4">
        <Module2_9Quiz />
      </section>

      {/* Next Step Callout */}
      <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 text-xs font-mono text-slate-700 dark:text-slate-300 flex items-center justify-between">
        <span>Up Next: Module 2.10 — Troubleshooting Common LLM API Issues</span>
        <ArrowRight className="w-4 h-4 text-amber-500" />
      </div>
    </div>
  );
}
