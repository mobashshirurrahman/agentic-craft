"use client";

import React, { useState } from "react";
import {
  Timer,
  Play,
  RotateCcw,
  Sparkles,
  Zap,
  Clock,
  ArrowRight,
  Code2,
  Cpu,
  Layers,
} from "lucide-react";

export default function AsyncVsSyncBenchmarker() {
  const [mode, setMode] = useState<"sync" | "async">("async");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [progress, setProgress] = useState<number[]>([0, 0, 0, 0]);
  const [elapsedTime, setElapsedTime] = useState<number | null>(null);

  const taskCount = 4;
  const taskDurationMs = 1200; // 1.2s per simulated LLM API call

  const handleRun = () => {
    setIsRunning(true);
    setProgress([0, 0, 0, 0]);
    setElapsedTime(null);
    const start = Date.now();

    if (mode === "sync") {
      // Run sequentially: task 0, then 1, then 2, then 3
      let currentTask = 0;
      const syncInterval = setInterval(() => {
        setProgress((prev) => {
          const next = [...prev];
          next[currentTask] = 100;
          return next;
        });

        currentTask++;
        if (currentTask >= taskCount) {
          clearInterval(syncInterval);
          setIsRunning(false);
          setElapsedTime(Date.now() - start);
        }
      }, 700);
    } else {
      // Run concurrently: all 4 tasks progress at once
      setTimeout(() => {
        setProgress([100, 100, 100, 100]);
        setIsRunning(false);
        setElapsedTime(Date.now() - start);
      }, 750);
    }
  };

  const handleReset = () => {
    setProgress([0, 0, 0, 0]);
    setElapsedTime(null);
    setIsRunning(false);
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm overflow-hidden transition-colors">
      {/* Header */}
      <div className="p-5 md:p-6 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-blue-500/10 via-sky-500/5 to-transparent">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <Timer className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                Async vs. Sync Concurrency Benchmarker
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-500/30">
                  I/O-Bound Optimization
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Experience why asynchronous execution (ainvoke / asyncio.gather) is mandatory for multi-user AI agents
              </p>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Mode Selector */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => {
              setMode("async");
              handleReset();
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition ${
              mode === "async"
                ? "bg-blue-600 text-white font-bold"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
            }`}
          >
            Asynchronous (.ainvoke / Non-blocking)
          </button>
          <button
            onClick={() => {
              setMode("sync");
              handleReset();
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition ${
              mode === "sync"
                ? "bg-blue-600 text-white font-bold"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
            }`}
          >
            Synchronous (.invoke / Blocking)
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="p-5 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Task Progress Bars (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold pb-2 border-b border-slate-200 dark:border-slate-800">
            <span>4 Concurrent Tool Calls (Search / DB / Calculations)</span>
            {elapsedTime !== null && (
              <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400">
                ⏱️ Total: {(elapsedTime / 1000).toFixed(2)}s
              </span>
            )}
          </div>

          <div className="space-y-3">
            {progress.map((pct, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-[11px] font-mono text-slate-600 dark:text-slate-400">
                  <span>Task #{idx + 1}: Query API Endpoint</span>
                  <span>{pct === 100 ? "Completed" : pct > 0 ? "Working..." : "Queued"}</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      pct === 100 ? "bg-emerald-500" : "bg-blue-500"
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleRun}
            disabled={isRunning}
            className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold transition flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>{isRunning ? "Executing..." : `Benchmark ${mode.toUpperCase()} Execution`}</span>
          </button>
        </div>

        {/* Right: Code Pattern Walkthrough (5 cols) */}
        <div className="lg:col-span-5 space-y-3 font-mono text-xs">
          <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold pb-2 border-b border-slate-200 dark:border-slate-800">
            Python Async Method Patterns
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900 text-slate-300 border border-slate-800 overflow-x-auto text-[11px]">
            <pre className="text-blue-300">{`import asyncio

# 1. Async invocation with 'a' prefix:
async def run_concurrently():
    tasks = [
        agent.ainvoke({"input": q1}),
        agent.ainvoke({"input": q2}),
        agent.ainvoke({"input": q3}),
        agent.ainvoke({"input": q4}),
    ]
    # Executes all 4 in parallel!
    results = await asyncio.gather(*tasks)

# 2. Wrapping blocking sync tool:
import asyncio
result = await asyncio.to_thread(sync_tool)`}</pre>
          </div>

          <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs text-slate-700 dark:text-slate-300">
            💡 <strong className="text-slate-900 dark:text-white">Why async rules AI:</strong> LLM apps spend 95% of execution waiting for cloud sockets. While waiting, Python&apos;s async event loop can process dozens of other user requests simultaneously!
          </div>
        </div>
      </div>
    </div>
  );
}
