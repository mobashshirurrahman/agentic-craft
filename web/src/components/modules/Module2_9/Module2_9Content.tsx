"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target, Check, ArrowRight, Activity, Bug, Code2, Terminal,
  AlertTriangle, Sparkles, HelpCircle, Copy, CheckCheck,
  Play, RotateCcw, FileText, Clock, Database, Search,
} from "lucide-react";
import StructuredLoggingDebugger from "./StructuredLoggingDebugger";
import Module2_9Quiz from "./Module2_9Quiz";

export default function Module2_9Content() {
  const [selectedPillar, setSelectedPillar] = useState<string>("llm");
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [activeCodeTab, setActiveCodeTab] = useState<"code" | "output">("code");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);

  const pillars = [
    {
      id: "llm",
      title: "1. LLM Interactions",
      tagline: "Prompts & Completions",
      desc: "Log the exact system prompt, user variables, raw model completion, token counts, and API response latency for every LLM call.",
      icon: Terminal,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      border: "border-amber-200 dark:border-amber-500/30",
      badge: "Pillar 1",
      codeSnippet: `# Pillar 1: Log all LLM interactions with full context
import json, logging
from datetime import datetime

logger = logging.getLogger("agent.llm")

def log_llm_call(prompt: str, response: str, token_usage: dict, latency_ms: float):
    logger.info(json.dumps({
        "timestamp": datetime.utcnow().isoformat(),
        "event": "llm_call",
        "run_id": current_run_id,
        "model": "gpt-4o-mini",
        "prompt_tokens": token_usage["prompt_tokens"],
        "completion_tokens": token_usage["completion_tokens"],
        "latency_ms": round(latency_ms, 2),
        "response_preview": response[:200]  # First 200 chars only
    }))`,
    },
    {
      id: "tools",
      title: "2. Tool Activity",
      tagline: "Dispatch & Results",
      desc: "Capture every tool call: name, parsed arguments, execution duration, and the raw observation payload returned to the LLM.",
      icon: Search,
      color: "text-sky-600 dark:text-sky-400",
      bg: "bg-sky-50 dark:bg-sky-500/10",
      border: "border-sky-200 dark:border-sky-500/30",
      badge: "Pillar 2",
      codeSnippet: `# Pillar 2: Log all tool dispatches and their results
import time

def log_tool_call(tool_name: str, args: dict, result, duration_ms: float):
    logger.info(json.dumps({
        "timestamp": datetime.utcnow().isoformat(),
        "event": "tool_called",
        "run_id": current_run_id,
        "tool": tool_name,
        "args": args,
        "result_preview": str(result)[:300],
        "latency_ms": round(duration_ms, 2),
        "status": "success" if result else "empty_result"
    }))

# Usage inside a LangGraph node:
start = time.perf_counter()
observation = search_tool.invoke({"query": "Q4 earnings"})
log_tool_call("search_db", {"query": "Q4 earnings"}, observation,
              (time.perf_counter() - start) * 1000)`,
    },
    {
      id: "telemetry",
      title: "3. Telemetry & Cost",
      tagline: "IDs & Economics",
      desc: "Attach a unique run_id + session_id to every event. Track cumulative token spend and estimated dollar cost so you can alert on cost spikes.",
      icon: Clock,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      border: "border-emerald-200 dark:border-emerald-500/30",
      badge: "Pillar 3",
      codeSnippet: `# Pillar 3: Track cost telemetry per agent run
import uuid

COST_PER_1K = {"gpt-4o-mini": {"input": 0.00015, "output": 0.00060}}

def calculate_run_cost(model: str, prompt_tokens: int, completion_tokens: int) -> float:
    rates = COST_PER_1K.get(model, {"input": 0, "output": 0})
    return (prompt_tokens / 1000 * rates["input"] +
            completion_tokens / 1000 * rates["output"])

run_id = str(uuid.uuid4())[:8]
total_cost = calculate_run_cost("gpt-4o-mini", prompt_tokens=1200, completion_tokens=340)

logger.info(json.dumps({
    "event": "run_summary", "run_id": run_id,
    "total_tokens": 1540, "estimated_cost_usd": round(total_cost, 6)
}))`,
    },
    {
      id: "debug",
      title: "4. Debug Replay",
      tagline: "Failure Forensics",
      desc: "Structure logs so you can replay an exact agent run from stored log events — reconstructing the full message history and tool call sequence to diagnose failures.",
      icon: Bug,
      color: "text-rose-600 dark:text-rose-400",
      bg: "bg-rose-50 dark:bg-rose-500/10",
      border: "border-rose-200 dark:border-rose-500/30",
      badge: "Pillar 4",
      codeSnippet: `# Pillar 4: Structured log format for replay debugging
# Every event has enough context to reconstruct the full run

LOG_SCHEMA = {
    "timestamp": "ISO-8601 UTC",
    "run_id": "uuid-v4-prefix",        # Link all events in one run
    "session_id": "user_session_id",   # Link across runs for a user
    "event": "llm_call | tool_called | run_start | run_end",
    "node_name": "LangGraph node name",
    "sequence_num": "monotonic int",   # Replay ordering
    "data": { ... }                    # Event-specific payload
}

# In LangSmith / Langfuse / custom S3 → replay any production run
# by filtering: WHERE run_id = 'abc123' ORDER BY sequence_num ASC`,
    },
  ];

  const currentPillar = pillars.find((p) => p.id === selectedPillar) || pillars[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentPillar.codeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setActiveCodeTab("output");
    setSimStep(1);
    setTimeout(() => setSimStep(2), 900);
    setTimeout(() => setSimStep(3), 1800);
    setTimeout(() => { setSimStep(4); setIsSimulating(false); }, 2700);
  };

  return (
    <div className="space-y-10 max-w-5xl mx-auto pb-16">
      {/* 🎯 OBJECTIVE BANNER */}
      <section className="rounded-2xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/60 dark:bg-amber-500/5 p-4 sm:p-6 shadow-sm">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-amber-600 text-white shrink-0 shadow-sm mt-0.5"><Target className="w-5 h-5" /></div>
          <div className="space-y-2 flex-1">
            <h2 className="text-sm font-mono uppercase tracking-wider text-amber-800 dark:text-amber-400 font-bold">🎯 By the end of this module, you will:</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              {[
                "Build a structured JSON logging system for every LLM call and tool dispatch",
                "Attach run_id, session_id, and sequence numbers to enable full run replay",
                "Calculate per-run token cost in real-time using model pricing tables",
                "Distinguish debug vs. info vs. error log levels for production observability",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: 4 OBSERVABILITY PILLARS */}
      <section className="space-y-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-mono font-semibold mb-2">
            <Activity className="w-3.5 h-3.5" /><span>Observability • Structured Logging</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Debugging Agent Executions with Logging</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Agents fail silently. Without structured logs, you can&apos;t tell <em>which</em> tool failed, <em>what</em> the LLM decided, or <em>why</em> it looped. Four observability pillars transform your black box into an open window.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            const isSelected = selectedPillar === pillar.id;
            return (
              <button key={pillar.id} onClick={() => setSelectedPillar(pillar.id)}
                className={`p-3.5 sm:p-4 rounded-xl border text-left transition-all flex flex-col justify-between min-h-[145px] sm:min-h-[160px] active:scale-95 cursor-pointer ${isSelected ? "border-amber-500 bg-white dark:bg-slate-900 shadow-md ring-2 ring-amber-500/20" : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700"}`}>
                <div className="space-y-2">
                  <div className={`inline-flex p-1.5 rounded-lg ${pillar.bg} border ${pillar.border}`}><Icon className={`w-4 h-4 ${pillar.color}`} /></div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">{pillar.title}</div>
                    <div className={`text-[10px] font-mono ${pillar.color} mt-0.5`}>{pillar.tagline}</div>
                  </div>
                </div>
                <p className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-2">{pillar.desc}</p>
              </button>
            );
          })}
        </div>

        {/* CODE INSPECTOR */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`inline-flex p-1.5 rounded-lg ${currentPillar.bg} border ${currentPillar.border}`}><currentPillar.icon className={`w-4 h-4 ${currentPillar.color}`} /></div>
              <span className="text-xs font-bold text-slate-900 dark:text-white">{currentPillar.title}</span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${currentPillar.bg} ${currentPillar.color} border ${currentPillar.border}`}>{currentPillar.badge}</span>
            </div>
            <button onClick={handleCopyCode} className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer">
              {copiedCode ? <CheckCheck className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedCode ? "Copied!" : "Copy"}
            </button>
          </div>
          <div className="rounded-xl border border-slate-800 overflow-hidden bg-slate-950">
            <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-slate-800">
              <div className="flex gap-1">
                {(["code", "output"] as const).map((tab) => (
                  <button key={tab} onClick={() => setActiveCodeTab(tab)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono cursor-pointer ${activeCodeTab === tab ? "bg-slate-700 text-white" : "text-slate-400 hover:text-slate-200"}`}>
                    {tab === "code" ? <FileText className="w-3 h-3" /> : <Terminal className="w-3 h-3" />}
                    {tab === "code" ? "Python Code" : "Log Output"}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                {simStep > 0 && <button onClick={() => { setSimStep(0); setActiveCodeTab("code"); }} className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 cursor-pointer"><RotateCcw className="w-3 h-3" /> Reset</button>}
                <button onClick={handleRunSimulation} disabled={isSimulating}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-600 hover:bg-amber-500 text-white text-xs font-mono disabled:opacity-50 cursor-pointer">
                  <Play className="w-3 h-3" />{isSimulating ? "Logging..." : "Run"}
                </button>
              </div>
            </div>
            <div className="p-4 min-h-[140px] font-mono text-xs">
              {activeCodeTab === "code" ? (
                <pre className="text-slate-300 whitespace-pre-wrap leading-relaxed">{currentPillar.codeSnippet}</pre>
              ) : (
                <div className="space-y-2 text-slate-300">
                  {simStep === 0 && <div className="text-slate-500 italic">Click &apos;Run&apos; to emit structured logs...</div>}
                  {simStep >= 1 && <div className="text-amber-400">➜ [INFO] agent.llm | {"{"}&quot;event&quot;: &quot;run_start&quot;, &quot;run_id&quot;: &quot;a3f9b2c1&quot;{"}"}</div>}
                  {simStep >= 2 && <div className="text-slate-400 pl-4">[INFO] {"{"}&quot;event&quot;: &quot;llm_call&quot;, &quot;latency_ms&quot;: 842, &quot;prompt_tokens&quot;: 312{"}"}<br /><span className="text-sky-400">[INFO] {"{"}&quot;event&quot;: &quot;tool_called&quot;, &quot;tool&quot;: &quot;search_db&quot;, &quot;latency_ms&quot;: 142{"}"}</span></div>}
                  {simStep >= 3 && <div className="text-emerald-400">[INFO] {"{"}&quot;event&quot;: &quot;tool_called&quot;, &quot;tool&quot;: &quot;search_db&quot;, &quot;status&quot;: &quot;success&quot;{"}"}</div>}
                  {simStep >= 4 && <div className="text-emerald-400 font-bold pt-2 border-t border-slate-800">
                    ✔ [INFO] {"{"}&quot;event&quot;: &quot;run_summary&quot;, &quot;total_tokens&quot;: 1540, &quot;cost_usd&quot;: 0.000386{"}"}<br />
                    <span className="text-slate-400 font-normal text-[10px]">Full run logged with run_id=a3f9b2c1 — replay any failure from these events.</span>
                  </div>}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: ANALOGY */}
      <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">✈️ Mental Model: Agent Logs = Flight Data Recorder</h3>
        </div>
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-2">
            <div className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">❌ No Structured Logs</div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">Like an airplane crash with no black box. You know it crashed, you have the wreckage — but no idea what happened in the last 30 seconds before impact. Impossible to diagnose or prevent.</p>
          </div>
          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/10 space-y-2">
            <div className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400">✅ Structured JSON Logs</div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">Like a flight data recorder that captures altitude, speed, and every control input every 10ms. When the agent fails, you replay its exact decisions, tool calls, and LLM responses step by step.</p>
          </div>
        </div>
      </section>

      {/* SECTION 3: INTERACTIVE DEBUGGER */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">🔬 Structured Logging Debugger</h3>
        <StructuredLoggingDebugger />
      </section>

      {/* SECTION 4: HANDWRITTEN NOTES */}
      <section className="space-y-3">
        <div className="p-4 rounded-xl border border-amber-300 dark:border-amber-500/30 bg-amber-50/90 dark:bg-amber-500/10 shadow-sm">
          <span className="font-['Caveat',cursive] text-base text-amber-950 dark:text-amber-200 block">✍️ Instructor Note: &quot;Never use print() for production observability. print() is synchronous, has no log level, and can&apos;t be filtered by severity. Use Python&apos;s logging module with a JSON formatter from day one.&quot;</span>
        </div>
        <div className="p-4 rounded-xl border border-teal-200 dark:border-teal-500/30 bg-teal-50/90 dark:bg-teal-500/10 shadow-sm">
          <span className="font-['Caveat',cursive] text-base text-teal-950 dark:text-teal-200 block">💡 Mental Model: Think of run_id like a tracking number on a courier package. Every log event for one agent run carries that same tracking number so you can reconstruct the full journey from start to delivery (or failure!).</span>
        </div>
        <div className="p-4 rounded-xl border border-sky-200 dark:border-sky-500/30 bg-sky-50/90 dark:bg-sky-500/10 shadow-sm">
          <span className="font-['Caveat',cursive] text-base text-sky-950 dark:text-sky-200 block">📌 Core Rule: Log the first 200–300 chars of every prompt and response. Logging the full text is expensive and often hits PII regulations. Log IDs, token counts, and truncated previews — then retrieve full text from LangSmith only when debugging a specific failure.</span>
        </div>
      </section>

      {/* SECTION 5: TRAPS */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-500" /><span>Agent Logging Traps</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-500/30 bg-rose-50/50 dark:bg-rose-500/5 space-y-2">
            <span className="text-xs font-mono font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider block">TRAP #1: Logging Full Prompts to stdout</span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">Logging the complete system prompt + user message + history to stdout will leak PII into server logs, violate GDPR, and fill your disk in hours. Always truncate, redact, or hash sensitive fields before logging.</p>
          </div>
          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-500/5 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">TRAP #2: No Sequence Numbers</span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">Without monotonic sequence numbers, concurrent async agent runs produce interleaved logs that are impossible to reconstruct in order. Always add a seq: int counter per run to enable deterministic replay ordering.</p>
          </div>
        </div>
      </section>

      {/* SECTION 6: KEY TAKEAWAYS */}
      <section className="rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-500/5 p-5 space-y-3">
        <h4 className="font-bold text-sm text-amber-900 dark:text-amber-300 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" /><span>Key Takeaways</span>
        </h4>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          {[
            ["1.", "Structured JSON Logs:", "Every log event should be machine-parsable JSON, not human-readable text blobs. This enables filter, aggregate, and alert tooling in Datadog, Grafana, or custom dashboards."],
            ["2.", "run_id is Sacred:", "Every log event for one agent execution must share the same run_id. This is your forensic thread for reconstructing exactly what happened in any failure."],
            ["3.", "Log Cost in Real-Time:", "Calculate and log token cost per run using your model's pricing table. Alert when a single run exceeds a cost ceiling — runaway loops can burn $50 in minutes without guardrails."],
          ].map(([n, bold, rest]) => (
            <li key={n} className="flex items-start gap-2">
              <span className="text-amber-600 dark:text-amber-400 font-bold">{n}</span>
              <span><strong>{bold}</strong> {rest}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* SECTION 7: QUIZ */}
      <section className="space-y-3">
        <button onClick={() => setShowQuiz(!showQuiz)}
          className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all text-left cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400"><HelpCircle className="w-5 h-5" /></div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">Concept Check: Agent Observability</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">{showQuiz ? "Click to collapse" : "Test your logging intuition (3 questions)"}</p>
            </div>
          </div>
          <span className="text-xs font-mono font-semibold px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30">
            {showQuiz ? "Hide Quiz" : "Start Quiz"}
          </span>
        </button>
        <AnimatePresence>
          {showQuiz && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }}>
              <Module2_9Quiz />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* NEXT MODULE BRIDGE */}
      <section className="rounded-2xl border border-amber-200 dark:border-amber-500/30 bg-gradient-to-r from-amber-50 via-white to-slate-50 dark:from-amber-500/10 dark:via-slate-900 dark:to-slate-950 p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <div className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">Up Next • Module 2.10</div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Troubleshooting Common LLM API Issues</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">Build self-healing agents with exponential backoff, multi-provider fallback routing, and structured error categorization for 401, 429, and 500 errors.</p>
        </div>
        <Link href="/learn/level-2/module-2-10" className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs sm:text-sm shadow-sm transition-all shrink-0 cursor-pointer">
          <span>Continue to Module 2.10</span><ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
