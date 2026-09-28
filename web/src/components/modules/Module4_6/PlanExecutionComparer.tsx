"use client";

import React, { useState } from "react";
import { Play, RotateCcw, ArrowRight, CheckCircle2, Clock, Cpu, Zap } from "lucide-react";

type Strategy = "sequential" | "parallel";
type Step = { label: string; dependsOn?: string; done: boolean };

const EXAMPLES = [
  {
    id: "chain",
    label: "🔗 Chained Query",
    query: "Find AI products launched by the company that acquired DeepMind in 2024",
    strategy: "sequential" as Strategy,
    reason: "Step 2 depends on Step 1's answer — you can't search 'products by X' until you know who X is.",
    steps: [
      { label: "Step 1: Who acquired DeepMind in 2024?", done: false },
      { label: "Step 2: What AI products did Google launch?", dependsOn: "Step 1", done: false },
      { label: "Step 3: Summarize the top 3 products.", dependsOn: "Step 2", done: false },
    ],
    totalMs: 3600,
    savings: null,
  },
  {
    id: "multi",
    label: "⚡ Multi-Topic Query",
    query: "Summarize Tesla's Q4 2024 earnings, recent product launches, and leadership changes",
    strategy: "parallel" as Strategy,
    reason: "All 3 sub-queries are independent — earnings don't affect product data, which doesn't affect leadership data.",
    steps: [
      { label: "Branch A: Tesla Q4 2024 earnings", done: false },
      { label: "Branch B: Tesla recent product launches", done: false },
      { label: "Branch C: Tesla leadership changes", done: false },
    ],
    totalMs: 1400,
    savings: "60% faster than sequential (4.2s → 1.4s)",
  },
];

export default function PlanExecutionComparer() {
  const [example, setExample] = useState(EXAMPLES[0]);
  const [steps, setSteps] = useState<Step[]>([]);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [timer, setTimer] = useState<ReturnType<typeof setInterval> | null>(null);

  const reset = () => {
    setSteps([]);
    setRunning(false);
    setDone(false);
    setElapsed(0);
    if (timer) clearInterval(timer);
  };

  const run = (ex: typeof EXAMPLES[0]) => {
    reset();
    setExample(ex);
    setRunning(true);
    const t0 = Date.now();
    const iv = setInterval(() => setElapsed(Date.now() - t0), 100);
    setTimer(iv);

    const initSteps = ex.steps.map((s) => ({ ...s, done: false }));
    setSteps(initSteps);

    if (ex.strategy === "sequential") {
      ex.steps.forEach((_, i) => {
        setTimeout(() => {
          setSteps((prev) => prev.map((s, idx) => idx === i ? { ...s, done: true } : s));
          if (i === ex.steps.length - 1) {
            setRunning(false);
            setDone(true);
            clearInterval(iv);
          }
        }, (i + 1) * 1200);
      });
    } else {
      ex.steps.forEach((_, i) => {
        setTimeout(() => {
          setSteps((prev) => prev.map((s, idx) => idx === i ? { ...s, done: true } : s));
        }, 1200 + i * 90);
      });
      setTimeout(() => {
        setRunning(false);
        setDone(true);
        clearInterval(iv);
      }, 1400);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
      {/* Example Tabs */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-wrap gap-3 items-center">
        {EXAMPLES.map((ex) => (
          <button
            key={ex.id}
            onClick={() => run(ex)}
            disabled={running}
            className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition disabled:opacity-50 ${
              example.id === ex.id
                ? "border-blue-500/60 bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300"
                : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            {ex.label}
          </button>
        ))}
        <button onClick={reset} className="ml-auto text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition">
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="p-5 space-y-4">
        {/* Query */}
        <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 space-y-1.5">
          <p className="text-[10px] font-mono text-slate-400">User Query</p>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic">&ldquo;{example.query}&rdquo;</p>
          <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
            example.strategy === "sequential"
              ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300"
              : "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300"
          }`}>
            {example.strategy === "sequential" ? "🐢 Sequential Plan" : "⚡ Parallel Plan"}
          </div>
        </div>

        {/* Reason */}
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-l-2 border-blue-400 pl-3">
          <strong>Why this strategy:</strong> {example.reason}
        </p>

        {/* Steps */}
        {steps.length > 0 && (
          <div className={`space-y-2 ${example.strategy === "parallel" ? "" : ""}`}>
            {example.strategy === "parallel" && (
              <p className="text-[10px] font-mono text-emerald-500 dark:text-emerald-400">↓ All branches launch simultaneously</p>
            )}
            {steps.map((step, i) => (
              <div key={i} className={`p-3 rounded-xl border text-xs flex items-center justify-between gap-3 transition-all duration-300 ${
                step.done
                  ? "border-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300"
                  : running && (example.strategy === "parallel" || i === steps.filter(s => s.done).length)
                  ? "border-blue-400 bg-blue-50 dark:bg-blue-950/30 text-blue-800 dark:text-blue-300"
                  : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 text-slate-500"
              }`}>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full shrink-0 ${step.done ? "bg-emerald-500" : running ? "bg-blue-400 animate-pulse" : "bg-slate-300 dark:bg-slate-700"}`} />
                  <span className={step.done ? "font-semibold" : ""}>{step.label}</span>
                  {step.dependsOn && <span className="text-[10px] text-slate-400 ml-1">(needs {step.dependsOn})</span>}
                </div>
                {step.done && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />}
              </div>
            ))}
          </div>
        )}

        {/* Timer + Result */}
        {running || done ? (
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500">
              <Clock className="w-3.5 h-3.5" />
              Elapsed
            </div>
            <span className={`font-mono text-sm font-bold ${done ? (example.strategy === "parallel" ? "text-emerald-500" : "text-slate-500") : "text-amber-500"}`}>
              {(elapsed / 1000).toFixed(1)}s
            </span>
          </div>
        ) : null}

        {done && example.savings && (
          <div className="p-3 rounded-xl border border-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 flex items-center gap-2">
            <Zap className="w-4 h-4 text-emerald-500 shrink-0" />
            <p className="text-xs text-emerald-800 dark:text-emerald-300 font-semibold">{example.savings}</p>
          </div>
        )}

        {steps.length === 0 && (
          <button
            onClick={() => run(example)}
            disabled={running}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white font-mono text-xs font-bold flex items-center justify-center gap-2 transition"
          >
            <Play className="w-4 h-4" />
            Run Plan
          </button>
        )}
      </div>
    </div>
  );
}
