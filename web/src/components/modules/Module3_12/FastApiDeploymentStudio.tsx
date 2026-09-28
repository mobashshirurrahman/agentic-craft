"use client";

import React, { useState } from "react";
import {
  Server,
  Play,
  RotateCcw,
  Zap,
  CheckCircle2,
  Clock,
  Send,
  Terminal,
} from "lucide-react";

interface Endpoint {
  method: "POST" | "GET";
  path: string;
  description: string;
  body?: Record<string, string>;
  response: Record<string, unknown>;
  latencyMs: number;
  statusCode: number;
}

const ENDPOINTS: Endpoint[] = [
  {
    method: "POST",
    path: "/run",
    description: "Invoke agent synchronously. Blocks until final answer is ready.",
    body: { input: "\"Research the top 3 Python web frameworks\"" },
    response: {
      output: "1. FastAPI — async, fastest. 2. Django — batteries-included. 3. Flask — lightweight microframework.",
      steps: 4,
      tokens_used: 312,
    },
    latencyMs: 1840,
    statusCode: 200,
  },
  {
    method: "POST",
    path: "/stream",
    description: "Invoke agent with Server-Sent Events streaming. Returns tokens as they arrive.",
    body: { input: "\"Summarize LangGraph in 2 sentences\"" },
    response: {
      stream: "data: LangGraph is...\ndata: a graph-based...\ndata: framework for...\ndata: stateful agents.\ndata: [DONE]",
      ttft_ms: 210,
    },
    latencyMs: 420,
    statusCode: 200,
  },
  {
    method: "GET",
    path: "/history/{thread_id}",
    description: "Fetch full message history for a conversation thread from PostgreSQL.",
    response: {
      thread_id: "user-alice-42",
      messages: [
        { role: "user", content: "What is LangGraph?" },
        { role: "assistant", content: "LangGraph is a graph-based agent framework..." },
      ],
      checkpoint_count: 2,
    },
    latencyMs: 58,
    statusCode: 200,
  },
  {
    method: "GET",
    path: "/health",
    description: "Liveness probe for Kubernetes / AWS ECS health checks.",
    response: { status: "ok", version: "1.0.0", uptime_s: 3600 },
    latencyMs: 4,
    statusCode: 200,
  },
];

export default function FastApiDeploymentStudio() {
  const [activeEndpoint, setActiveEndpoint] = useState<Endpoint>(ENDPOINTS[0]);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [latency, setLatency] = useState<number | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const callEndpoint = () => {
    setLoading(true);
    setResponse(null);
    setLatency(null);
    setLogs([]);

    const startLogs = [
      `→ ${activeEndpoint.method} http://localhost:8000${activeEndpoint.path}`,
      "  ⬡ FastAPI worker received request",
      "  ⬡ Dependency injection: LangGraph app instance",
      activeEndpoint.path.includes("stream")
        ? "  ⬡ Streaming response via Server-Sent Events"
        : "  ⬡ Awaiting agent response...",
    ];

    startLogs.forEach((log, i) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, log]);
      }, i * 180);
    });

    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        `  ✓ ${activeEndpoint.statusCode} OK (${activeEndpoint.latencyMs}ms)`,
      ]);
      setResponse(JSON.stringify(activeEndpoint.response, null, 2));
      setLatency(activeEndpoint.latencyMs);
      setLoading(false);
    }, Math.min(activeEndpoint.latencyMs + 200, 2000));
  };

  const methodColor =
    activeEndpoint.method === "POST"
      ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700"
      : "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700";

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-800">
        {/* Endpoint List */}
        <div className="p-4 space-y-2">
          <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-3">
            API Endpoints
          </p>
          {ENDPOINTS.map((ep) => (
            <button
              key={ep.path}
              onClick={() => {
                setActiveEndpoint(ep);
                setResponse(null);
                setLatency(null);
                setLogs([]);
              }}
              className={`w-full text-left p-3 rounded-xl border text-xs transition space-y-1 ${
                activeEndpoint.path === ep.path
                  ? "border-teal-500/50 bg-teal-50 dark:bg-teal-950/30"
                  : "border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${
                    ep.method === "POST"
                      ? "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 border-blue-300 dark:border-blue-700"
                      : "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-700"
                  }`}
                >
                  {ep.method}
                </span>
                <span className="font-mono text-slate-700 dark:text-slate-300 text-[11px]">
                  {ep.path}
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2">
                {ep.description}
              </p>
            </button>
          ))}
        </div>

        {/* Request Panel */}
        <div className="p-4 space-y-4">
          <div className="space-y-1">
            <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
              Request
            </p>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${methodColor}`}>
                {activeEndpoint.method}
              </span>
              <span className="font-mono text-xs text-slate-700 dark:text-slate-300">
                localhost:8000{activeEndpoint.path}
              </span>
            </div>
          </div>

          {activeEndpoint.body && (
            <div className="space-y-1">
              <p className="text-[10px] font-mono text-slate-400">Request Body (JSON)</p>
              <pre className="p-3 rounded-xl bg-slate-900 text-slate-200 font-mono text-[11px] overflow-x-auto">
                {JSON.stringify(activeEndpoint.body, null, 2)}
              </pre>
            </div>
          )}

          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
            {activeEndpoint.description}
          </p>

          <div className="flex gap-2">
            <button
              onClick={callEndpoint}
              disabled={loading}
              className="flex-1 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 disabled:opacity-40 text-white font-mono text-xs font-bold flex items-center justify-center gap-2 transition"
            >
              {loading ? (
                <span className="animate-spin">⏳</span>
              ) : (
                <Send className="w-3.5 h-3.5" />
              )}
              {loading ? "Calling..." : "Send Request"}
            </button>
            <button
              onClick={() => { setResponse(null); setLogs([]); setLatency(null); }}
              className="px-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Response Panel */}
        <div className="p-4 space-y-3">
          <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
            Response
          </p>

          {/* Terminal Logs */}
          {logs.length > 0 && (
            <div className="p-3 rounded-xl bg-slate-950 text-slate-400 font-mono text-[10px] space-y-0.5 min-h-[80px]">
              <div className="flex items-center gap-1.5 text-teal-400 mb-1">
                <Terminal className="w-3 h-3" />
                <span>API Server Log</span>
              </div>
              {logs.map((log, i) => (
                <div key={i} className="text-slate-300">{log}</div>
              ))}
            </div>
          )}

          {/* Response Body */}
          {response && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="flex items-center gap-1 text-emerald-500">
                  <CheckCircle2 className="w-3 h-3" />
                  {activeEndpoint.statusCode} OK
                </span>
                {latency && (
                  <span className="flex items-center gap-1 text-slate-400">
                    <Clock className="w-3 h-3" />
                    {latency}ms
                  </span>
                )}
              </div>
              <pre className="p-3 rounded-xl bg-slate-900 text-emerald-300 font-mono text-[10px] overflow-x-auto max-h-48">
                {response}
              </pre>
            </div>
          )}

          {!response && !loading && (
            <div className="flex flex-col items-center justify-center h-32 text-slate-400 dark:text-slate-600 text-xs font-mono text-center gap-2">
              <Server className="w-8 h-8 opacity-30" />
              <span>Hit "Send Request" to call the endpoint</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
