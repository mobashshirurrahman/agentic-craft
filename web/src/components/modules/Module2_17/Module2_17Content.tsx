"use client";

import React from "react";
import {
  BarChart3,
  CheckCircle2,
  Clock,
  DollarSign,
  TrendingUp,
  Cpu,
  Code2,
  Sparkles,
  Award,
  Layers,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import AgentTelemetryCostStudio from "./AgentTelemetryCostStudio";
import Module2_17Quiz from "./Module2_17Quiz";

export default function Module2_17Content() {
  return (
    <div className="space-y-10">
      {/* Hero Banner */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-sky-500/10 via-blue-500/5 to-slate-50 dark:to-slate-950 p-6 md:p-8 relative overflow-hidden transition-colors">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-sky-500/20 text-sky-700 dark:text-sky-300 border border-sky-500/30">
              Module 2.17 • Level 2 Capstone
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              ~25 min hands-on
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Measuring Agent Performance and Cost
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Unmonitored agents are an open checkbook and a latency gamble. Moving from local scripts to production requires tracking <strong>four core telemetry dimensions</strong>: Time to First Token (TTFT), per-node latency waterfalls, token unit economics, and task completion rates.
          </p>
        </div>
      </div>

      {/* Section 1: The 4 Production Telemetry Pillars */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-sky-500" />
          1. The 4 Production Telemetry Pillars
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
            <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 font-bold text-xs font-mono uppercase">
              <Clock className="w-4 h-4" />
              1. Latency Profile
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Track TTFT (&lt;400ms for UI responsiveness), per-node processing time, and P95 percentile tail latency.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs font-mono uppercase">
              <DollarSign className="w-4 h-4" />
              2. Token Economics
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Calculate cost per resolved user goal, input vs. output token ratio, and prompt cache hit rate savings.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold text-xs font-mono uppercase">
              <CheckCircle2 className="w-4 h-4" />
              3. Resolution Rate
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Percentage of tasks resolved without human escalation, tool calling precision, and error recovery success.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-xs font-mono uppercase">
              <TrendingUp className="w-4 h-4" />
              4. System Efficiency
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Tokens consumed per successful action. Flag loop drift where agents repeat unnecessary tool calls.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Telemetry Implementation in Code */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Code2 className="w-5 h-5 text-blue-500" />
          2. Implementing Production Telemetry Callbacks
        </h2>
        <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs border border-slate-800 overflow-x-auto">
          <pre>{`from langchain_core.callbacks import BaseCallbackHandler
import time

class AgentTelemetryHandler(BaseCallbackHandler):
    def __init__(self):
        self.start_times = {}

    def on_llm_start(self, serialized, prompts, **kwargs):
        self.start_times["llm"] = time.perf_counter()

    def on_llm_end(self, response, **kwargs):
        duration = time.perf_counter() - self.start_times["llm"]
        usage = response.llm_output.get("token_usage", {})
        
        prompt_tokens = usage.get("prompt_tokens", 0)
        completion_tokens = usage.get("completion_tokens", 0)
        
        # Log to DataDog / OpenTelemetry / Prometheus
        metrics_collector.record(
            metric="agent.llm.duration_seconds", value=duration,
            tags={"model": "gpt-4o"}
        )
        metrics_collector.record(
            metric="agent.tokens.total", value=prompt_tokens + completion_tokens
        )`}</pre>
        </div>
      </section>

      {/* Interactive Telemetry & Cost Studio */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-sky-500" />
            3. Interactive Telemetry & Unit Economics Studio
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Live Cost Calculator
          </span>
        </div>
        <AgentTelemetryCostStudio />
      </section>

      {/* Level 2 Capstone Graduation Card */}
      <div className="rounded-2xl border border-sky-300 dark:border-sky-800/80 bg-gradient-to-r from-sky-500/15 via-blue-500/10 to-transparent p-6 md:p-8 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-sky-500/20 text-sky-600 dark:text-sky-300 flex items-center justify-center font-bold">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              Level 2 Completed! (17 of 17 Modules)
            </span>
            <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
              Congratulations! You Have Mastered Core Implementation & Workflows
            </h3>
          </div>
        </div>

        <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          You now possess the foundational engineering tools to build production agents: from LangGraph state graphs and Pydantic schemas, to streaming token telemetry, async concurrency, prompt templates, defense-in-depth guardrails, automated pytest suites, and financial unit cost monitoring.
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-sky-200 dark:border-sky-800/50">
          <span className="text-xs font-mono text-slate-500">
            Next Milestone: <strong>Level 3 • Advanced Patterns & System Design</strong> (MCP, Deep Planning, Subgraphs, HITL)
          </span>
          <Link
            href="/#curriculum"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-mono text-xs font-bold transition shadow-sm"
          >
            <span>Explore Level 3 Curriculum</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Quiz */}
      <section className="space-y-4">
        <Module2_17Quiz />
      </section>
    </div>
  );
}
