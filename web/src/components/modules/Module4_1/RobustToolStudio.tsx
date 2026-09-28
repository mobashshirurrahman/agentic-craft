"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Play,
  RotateCcw,
  Bug,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Layers,
} from "lucide-react";

type Scenario = {
  id: string;
  label: string;
  input: Record<string, string | number>;
  validationError?: string;
  networkError?: boolean;
  retries?: number;
  latencyMs: number;
  logLines: string[];
  result?: string;
};

const SCENARIOS: Scenario[] = [
  {
    id: "valid",
    label: "✅ Happy Path",
    input: { query: "Apple revenue 2024", max_results: 5 },
    latencyMs: 340,
    logLines: [
      '[INFO]  tool="web_search" query="Apple revenue 2024" max_results=5 correlation_id="req-9a3f"',
      '[INFO]  validation=PASS schema=SearchInput',
      '[INFO]  http_request url="https://search.api/v1" timeout=10s',
      '[INFO]  http_response status=200 results=5 latency=340ms',
      '[INFO]  tool_result success=true result_count=5',
    ],
    result: "Found 5 results for 'Apple revenue 2024'.",
  },
  {
    id: "validation_fail",
    label: "❌ Bad Input",
    input: { query: "", max_results: 999 },
    validationError: "query: must not be empty | max_results: must be ≤ 10",
    latencyMs: 5,
    logLines: [
      '[WARN]  tool="web_search" query="" max_results=999 correlation_id="req-b7c1"',
      '[ERROR] validation=FAIL field="query" reason="must not be empty"',
      '[ERROR] validation=FAIL field="max_results" reason="999 exceeds max allowed (10)"',
      '[INFO]  tool_result success=false error_type=VALIDATION_ERROR',
    ],
  },
  {
    id: "retry",
    label: "🔄 Network Retry",
    input: { query: "LangGraph pricing", max_results: 3 },
    networkError: true,
    retries: 2,
    latencyMs: 2200,
    logLines: [
      '[INFO]  tool="web_search" query="LangGraph pricing" correlation_id="req-d4e8"',
      '[INFO]  validation=PASS schema=SearchInput',
      '[WARN]  attempt=1 http_error=503 retry_in=0.5s',
      '[WARN]  attempt=2 http_error=503 retry_in=1.0s (exponential backoff)',
      '[INFO]  attempt=3 http_response status=200 latency=2200ms',
      '[INFO]  tool_result success=true result_count=3',
    ],
    result: "Found 3 results after 2 retries.",
  },
  {
    id: "auth_fail",
    label: "🔐 Auth Error",
    input: { query: "internal-data", max_results: 2 },
    latencyMs: 80,
    logLines: [
      '[INFO]  tool="web_search" query="internal-data" correlation_id="req-f2a9"',
      '[INFO]  validation=PASS schema=SearchInput',
      '[INFO]  http_request url="https://search.api/v1"',
      '[ERROR] http_response status=401 body="Unauthorized"',
      '[ERROR] error_type=AUTH_ERROR message="API key invalid or expired"',
      '[INFO]  tool_result success=false error_type=AUTH_ERROR',
    ],
  },
];

export default function RobustToolStudio() {
  const [active, setActive] = useState<Scenario>(SCENARIOS[0]);
  const [running, setRunning] = useState(false);
  const [visibleLogs, setVisibleLogs] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  const run = (scenario: Scenario) => {
    setActive(scenario);
    setRunning(true);
    setVisibleLogs([]);
    setDone(false);

    scenario.logLines.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLogs((prev) => [...prev, line]);
        if (i === scenario.logLines.length - 1) {
          setRunning(false);
          setDone(true);
        }
      }, i * 280);
    });
  };

  const logColor = (line: string) => {
    if (line.includes("[ERROR]")) return "text-red-400";
    if (line.includes("[WARN]")) return "text-yellow-400";
    if (line.includes("validation=PASS") || line.includes("success=true")) return "text-emerald-400";
    return "text-slate-300";
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
      {/* Scenario Picker */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 space-y-2">
        <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
          Select Scenario
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {SCENARIOS.map((s) => (
            <button
              key={s.id}
              onClick={() => run(s)}
              disabled={running}
              className={`p-3 rounded-xl border text-xs font-mono text-left transition space-y-1 disabled:opacity-50 ${
                active.id === s.id
                  ? "border-amber-500/60 bg-amber-50 dark:bg-amber-950/30"
                  : "border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              <div className="font-bold text-slate-800 dark:text-slate-200">{s.label}</div>
              <div className="text-[10px] text-slate-500">
                {s.retries ? `${s.retries} retries • ` : ""}~{s.latencyMs}ms
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-800">
        {/* Input Panel */}
        <div className="p-4 space-y-3">
          <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
            Tool Input
          </p>
          <pre className="p-3 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto">
            {JSON.stringify(active.input, null, 2)}
          </pre>

          {active.validationError && done && (
            <div className="p-3 rounded-xl border border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-950/30 space-y-1">
              <div className="flex items-center gap-1.5 text-red-600 dark:text-red-400 font-mono text-[11px] font-bold">
                <XCircle className="w-3.5 h-3.5" />
                Validation Failed — Agent receives structured error:
              </div>
              <pre className="text-[10px] font-mono text-red-700 dark:text-red-300">
                {JSON.stringify({ error: "VALIDATION_ERROR", details: active.validationError }, null, 2)}
              </pre>
            </div>
          )}

          {active.result && done && (
            <div className="p-3 rounded-xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30">
              <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-mono text-[11px] font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Tool Result
              </div>
              <p className="text-xs text-emerald-800 dark:text-emerald-300 mt-1">{active.result}</p>
            </div>
          )}

          <button
            onClick={() => run(active)}
            disabled={running}
            className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-40 text-white font-mono text-xs font-bold flex items-center justify-center gap-2 transition"
          >
            {running ? <span className="animate-spin">⚙️</span> : <Play className="w-3.5 h-3.5" />}
            {running ? "Executing..." : "Run Tool"}
          </button>
        </div>

        {/* Log Panel */}
        <div className="p-4 space-y-2">
          <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" />
            Structured Log Output
          </p>
          <div className="p-3 rounded-xl bg-slate-950 font-mono text-[10px] min-h-[180px] space-y-0.5 overflow-x-auto">
            {visibleLogs.length === 0 && !running && (
              <span className="text-slate-600">// Press "Run Tool" to see structured logs...</span>
            )}
            {visibleLogs.map((line, i) => (
              <div key={i} className={logColor(line)}>
                {line}
              </div>
            ))}
            {running && (
              <div className="text-slate-500 animate-pulse">// executing...</div>
            )}
          </div>
          {done && (
            <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
              <Clock className="w-3 h-3" />
              Total latency: ~{active.latencyMs}ms
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
