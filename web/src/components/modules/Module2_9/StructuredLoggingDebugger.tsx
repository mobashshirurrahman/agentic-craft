"use client";

import React, { useState } from "react";
import {
  Activity,
  Terminal,
  FileCode,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  Clock,
  Coins,
  Bug,
  Filter,
} from "lucide-react";

export default function StructuredLoggingDebugger() {
  const [viewMode, setViewMode] = useState<"print" | "structured" | "trace">("structured");
  const [filterLevel, setFilterLevel] = useState<"ALL" | "INFO" | "WARNING" | "DEBUG">("ALL");

  const rawPrintOutput = `Starting agent run...
User asked: 'Check stock for SKU-901'
calling llm...
llm responded with tool call
executing tool check_inventory
tool returned {"stock": 14}
calling llm again
final response: SKU-901 has 14 units in stock.
finished.`;

  const structuredLogs = [
    {
      timestamp: "2026-09-28T13:20:01.102Z",
      level: "INFO",
      run_id: "run_88fa1",
      node: "call_model",
      event: "llm_invoke",
      tokens: { prompt: 142, completion: 24, total: 166 },
      latency_ms: 310,
      cost_usd: 0.00028,
    },
    {
      timestamp: "2026-09-28T13:20:01.415Z",
      level: "DEBUG",
      run_id: "run_88fa1",
      node: "call_tools",
      event: "tool_dispatch",
      tool: "check_inventory",
      args: { sku: "SKU-901" },
      latency_ms: 45,
    },
    {
      timestamp: "2026-09-28T13:20:01.462Z",
      level: "WARNING",
      run_id: "run_88fa1",
      node: "call_tools",
      event: "db_slow_query",
      detail: "Warehouse DB replica latency above 40ms threshold",
    },
    {
      timestamp: "2026-09-28T13:20:01.780Z",
      level: "INFO",
      run_id: "run_88fa1",
      node: "call_model",
      event: "final_synthesis",
      tokens: { prompt: 198, completion: 32, total: 230 },
      latency_ms: 285,
      cost_usd: 0.00036,
    },
  ];

  const filteredLogs = structuredLogs.filter((log) => {
    if (filterLevel === "ALL") return true;
    return log.level === filterLevel;
  });

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm overflow-hidden transition-colors">
      {/* Header */}
      <div className="p-5 md:p-6 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-amber-500/10 via-sky-500/5 to-transparent">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                Structured Logging & Observability Studio
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                  Trace Diagnostics
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Compare noisy print statements against structured JSON traces with token, latency, and cost telemetry
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              Run ID: <code className="text-amber-600 dark:text-amber-400 font-bold">run_88fa1</code>
            </span>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="p-5 md:p-6 space-y-4">
        {/* View Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode("print")}
              className={`text-xs font-mono px-3 py-1.5 rounded-lg transition ${
                viewMode === "print"
                  ? "bg-red-500/20 text-red-700 dark:text-red-300 font-bold"
                  : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              Raw print() Logs
            </button>
            <button
              onClick={() => setViewMode("structured")}
              className={`text-xs font-mono px-3 py-1.5 rounded-lg transition ${
                viewMode === "structured"
                  ? "bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold"
                  : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              Structured JSON Logs
            </button>
            <button
              onClick={() => setViewMode("trace")}
              className={`text-xs font-mono px-3 py-1.5 rounded-lg transition ${
                viewMode === "trace"
                  ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold"
                  : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              Visual Trace Tree
            </button>
          </div>

          {viewMode === "structured" && (
            <div className="flex items-center gap-1.5 text-xs font-mono">
              <Filter className="w-3 h-3 text-slate-400" />
              <span className="text-slate-400">Level:</span>
              {(["ALL", "INFO", "WARNING", "DEBUG"] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setFilterLevel(lvl)}
                  className={`px-2 py-0.5 rounded text-[10px] ${
                    filterLevel === lvl
                      ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold"
                      : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content Views */}
        {viewMode === "print" && (
          <div className="p-4 rounded-xl bg-slate-950 text-slate-300 font-mono text-xs border border-red-500/30 space-y-2">
            <div className="text-[10px] text-red-400 font-bold pb-1 border-b border-slate-800 flex items-center justify-between">
              <span>UNSTRUCTURED CONSOLE STDOUT</span>
              <span>CANNOT PARSE / NO TELEMETRY</span>
            </div>
            <pre className="text-slate-400 leading-relaxed">{rawPrintOutput}</pre>
          </div>
        )}

        {viewMode === "structured" && (
          <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
            {filteredLogs.map((log, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 font-mono text-xs space-y-1"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                        log.level === "INFO"
                          ? "bg-sky-500/20 text-sky-700 dark:text-sky-300"
                          : log.level === "WARNING"
                          ? "bg-amber-500/20 text-amber-700 dark:text-amber-300"
                          : "bg-purple-500/20 text-purple-700 dark:text-purple-300"
                      }`}
                    >
                      {log.level}
                    </span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      [{log.node}] {log.event}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400">{log.timestamp}</span>
                </div>

                <div className="p-2 rounded bg-slate-900 text-slate-300 text-[11px] overflow-x-auto">
                  <pre>{JSON.stringify(log, null, 2)}</pre>
                </div>
              </div>
            ))}
          </div>
        )}

        {viewMode === "trace" && (
          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 space-y-3">
            <div className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              LangSmith Trace Tree Span: run_88fa1 (640ms total)
            </div>

            <div className="pl-4 border-l-2 border-slate-300 dark:border-slate-700 space-y-2.5 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <span>1. call_model (LLM Thought & Tool Call)</span>
                <span className="text-[11px] text-slate-400">310ms • 166 tokens ($0.00028)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between ml-4">
                <span className="text-sky-600 dark:text-sky-400">└─ Tool: check_inventory(sku=&apos;SKU-901&apos;)</span>
                <span className="text-[11px] text-slate-400">45ms • DB latency ok</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <span>2. call_model (Final Synthesis)</span>
                <span className="text-[11px] text-slate-400">285ms • 230 tokens ($0.00036)</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
