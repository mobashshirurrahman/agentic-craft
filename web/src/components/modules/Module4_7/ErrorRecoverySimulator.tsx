"use client";

import React, { useState } from "react";
import { AlertTriangle, Play, RotateCcw, CheckCircle2, XCircle, ArrowRight, RefreshCw } from "lucide-react";

type ErrorType = "transient" | "permanent" | "partial" | "cascading";
type Recovery = "retry" | "fallback" | "skip" | "circuit_open";

const SCENARIOS: Array<{
  id: string;
  label: string;
  errorType: ErrorType;
  description: string;
  steps: Array<{ label: string; status: "ok" | "fail" | "recovery" | "fallback" | "skip"; detail: string }>;
  recovery: Recovery;
  insight: string;
}> = [
  {
    id: "transient",
    label: "🔄 Transient — HTTP 503",
    errorType: "transient",
    description: "Search API returns 503 (server overloaded). This is temporary — it'll recover.",
    steps: [
      { label: "Agent calls web_search()", status: "ok", detail: "Request sent to search API" },
      { label: "HTTP 503 Service Unavailable", status: "fail", detail: "Server overloaded — transient error" },
      { label: "Retry 1 — wait 0.5s", status: "recovery", detail: "Exponential backoff: attempt 2 of 3" },
      { label: "HTTP 503 again", status: "fail", detail: "Still overloaded" },
      { label: "Retry 2 — wait 1.0s", status: "recovery", detail: "Exponential backoff: attempt 3 of 3" },
      { label: "HTTP 200 OK", status: "ok", detail: "Server recovered. Search results returned." },
    ],
    recovery: "retry",
    insight: "Transient errors are expected in distributed systems. Retry with exponential backoff — never give up on the first 503.",
  },
  {
    id: "permanent",
    label: "❌ Permanent — Auth Error",
    errorType: "permanent",
    description: "Agent sends an expired API key. Retrying will never fix this — it's a configuration problem.",
    steps: [
      { label: "Agent calls database_query()", status: "ok", detail: "Connecting to PostgreSQL..." },
      { label: "HTTP 401 Unauthorized", status: "fail", detail: "API key expired 48 hours ago" },
      { label: "Detect: permanent error (AUTH_ERROR)", status: "recovery", detail: "No point retrying — error type: PERMANENT" },
      { label: "Route to error_handler_node", status: "fallback", detail: "Returns structured AUTH_ERROR to user with instructions" },
    ],
    recovery: "fallback",
    insight: "Permanent errors (invalid credentials, malformed input, forbidden resources) must NOT be retried. Detect and route immediately to a clear error response.",
  },
  {
    id: "partial",
    label: "⚠️ Partial — 1 of 3 Tools Fail",
    errorType: "partial",
    description: "Agent runs 3 tools in parallel. 2 succeed, 1 fails. Should the whole task fail?",
    steps: [
      { label: "parallel: web_search() → ✅ Results returned", status: "ok", detail: "5 results found for query" },
      { label: "parallel: arxiv_search() → ✅ Results returned", status: "ok", detail: "3 papers found" },
      { label: "parallel: internal_db() → ❌ Timeout (5s)", status: "fail", detail: "Internal database unreachable" },
      { label: "Partial success detected in merge_node", status: "recovery", detail: "State: {web_ok: true, arxiv_ok: true, db_ok: false}" },
      { label: "Skip db results — synthesize with available data", status: "skip", detail: "Agent notes: 'Internal data unavailable — results based on web + arxiv'" },
    ],
    recovery: "skip",
    insight: "Partial failures are the most nuanced. Don't fail the whole task when 2 of 3 tools succeed. Skip failed components, flag them in state, and let the LLM produce the best answer with what's available.",
  },
  {
    id: "circuit",
    label: "⚡ Circuit Breaker",
    errorType: "cascading",
    description: "The payment API has failed 5 consecutive times in 30 seconds. Circuit breaker trips open.",
    steps: [
      { label: "Failure 1–5: payment_api() returns 503", status: "fail", detail: "5 consecutive failures detected by circuit breaker" },
      { label: "Circuit OPEN — stops all calls to payment_api", status: "recovery", detail: "Threshold: 5 failures / 30s window" },
      { label: "All payment_api calls → immediate CIRCUIT_OPEN error", status: "fallback", detail: "No HTTP requests made — protects the downstream service" },
      { label: "After 60s — circuit enters HALF-OPEN", status: "recovery", detail: "One test request allowed to check if service recovered" },
      { label: "Test request succeeds → circuit CLOSED", status: "ok", detail: "Normal traffic resumes" },
    ],
    recovery: "circuit_open",
    insight: "Circuit breakers prevent cascading failures. When a service is overwhelmed, hammering it with retries makes things worse. Open the circuit, give the service breathing room, then probe carefully.",
  },
];

const stepColor = (status: string) => {
  if (status === "ok") return "border-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300";
  if (status === "fail") return "border-red-400 bg-red-50 dark:bg-red-950/20 text-red-800 dark:text-red-300";
  if (status === "recovery") return "border-amber-400 bg-amber-50 dark:bg-amber-950/20 text-amber-800 dark:text-amber-300";
  if (status === "fallback") return "border-blue-400 bg-blue-50 dark:bg-blue-950/20 text-blue-800 dark:text-blue-300";
  if (status === "skip") return "border-slate-400 bg-slate-50 dark:bg-slate-950/40 text-slate-600 dark:text-slate-400";
  return "";
};

const stepIcon = (status: string) => {
  if (status === "ok") return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />;
  if (status === "fail") return <XCircle className="w-3.5 h-3.5 text-red-500 shrink-0" />;
  if (status === "recovery") return <RefreshCw className="w-3.5 h-3.5 text-amber-500 shrink-0" />;
  if (status === "fallback") return <ArrowRight className="w-3.5 h-3.5 text-blue-500 shrink-0" />;
  return <span className="w-3.5 h-3.5 text-slate-400 shrink-0 text-xs">⤷</span>;
};

export default function ErrorRecoverySimulator() {
  const [scenario, setScenario] = useState(SCENARIOS[0]);
  const [visible, setVisible] = useState(0);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);

  const run = (s: typeof SCENARIOS[0]) => {
    setScenario(s);
    setVisible(0);
    setDone(false);
    setRunning(true);
    s.steps.forEach((_, i) => {
      setTimeout(() => {
        setVisible(i + 1);
        if (i === s.steps.length - 1) { setRunning(false); setDone(true); }
      }, (i + 1) * 600);
    });
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-2">
        {SCENARIOS.map((s) => (
          <button key={s.id} onClick={() => run(s)} disabled={running}
            className={`p-2 rounded-xl border text-[11px] font-mono font-bold text-center transition disabled:opacity-50 ${scenario.id === s.id ? "border-red-400/60 bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-300" : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"}`}>
            {s.label}
          </button>
        ))}
      </div>

      <div className="p-5 space-y-4">
        <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 space-y-1">
          <p className="text-[10px] font-mono text-slate-400 uppercase font-bold">Scenario</p>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{scenario.description}</p>
        </div>

        <div className="space-y-2">
          {scenario.steps.slice(0, visible).map((step, i) => (
            <div key={i} className={`p-3 rounded-xl border text-xs flex items-start gap-2 ${stepColor(step.status)}`}>
              {stepIcon(step.status)}
              <div className="flex-1">
                <p className="font-semibold">{step.label}</p>
                <p className="text-[10px] opacity-70 mt-0.5">{step.detail}</p>
              </div>
            </div>
          ))}
        </div>

        {done && (
          <div className="p-3 rounded-xl border border-blue-300 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20">
            <p className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400 uppercase mb-1">💡 The Lesson</p>
            <p className="text-xs text-blue-800 dark:text-blue-300 leading-relaxed">{scenario.insight}</p>
          </div>
        )}

        {visible === 0 && (
          <button onClick={() => run(scenario)} disabled={running}
            className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-40 text-white font-mono text-xs font-bold flex items-center justify-center gap-2 transition">
            <Play className="w-4 h-4" />Simulate Error Recovery
          </button>
        )}
      </div>
    </div>
  );
}
