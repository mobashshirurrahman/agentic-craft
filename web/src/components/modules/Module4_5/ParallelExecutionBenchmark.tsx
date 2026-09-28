"use client";

import React, { useState } from "react";
import { Zap, Play, RotateCcw, Clock, CheckCircle2 } from "lucide-react";

type Task = {
  id: string;
  topic: string;
  color: string;
};

type Mode = "sequential" | "parallel";

const TASKS: Task[] = [
  { id: "t1", topic: "Tesla Q4 earnings analysis", color: "blue" },
  { id: "t2", topic: "EV market share 2024 report", color: "purple" },
  { id: "t3", topic: "Competitor analysis: Rivian vs BYD", color: "teal" },
];

const TASK_DURATION_MS = 1400; // each task takes ~1.4s
const SEQ_TOTAL_MS = TASK_DURATION_MS * TASKS.length;
const PAR_TOTAL_MS = TASK_DURATION_MS + 300; // parallel overhead

const taskColors: Record<string, string> = {
  blue: "border-blue-400 bg-blue-50 dark:bg-blue-950/30 text-blue-800 dark:text-blue-300",
  purple: "border-purple-400 bg-purple-50 dark:bg-purple-950/30 text-purple-800 dark:text-purple-300",
  teal: "border-teal-400 bg-teal-50 dark:bg-teal-950/30 text-teal-800 dark:text-teal-300",
};

export default function ParallelExecutionBenchmark() {
  const [mode, setMode] = useState<Mode | null>(null);
  const [running, setRunning] = useState(false);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState<number>(0);
  const [done, setDone] = useState(false);
  const [timer, setTimer] = useState<ReturnType<typeof setInterval> | null>(null);

  const reset = () => {
    setMode(null);
    setRunning(false);
    setCompletedTasks([]);
    setStartTime(null);
    setElapsed(0);
    setDone(false);
    if (timer) clearInterval(timer);
  };

  const run = (m: Mode) => {
    reset();
    setMode(m);
    setRunning(true);
    const start = Date.now();
    setStartTime(start);
    setDone(false);

    const t = setInterval(() => {
      setElapsed(Math.floor((Date.now() - start) / 100) * 100);
    }, 100);
    setTimer(t);

    if (m === "sequential") {
      TASKS.forEach((task, i) => {
        setTimeout(() => {
          setCompletedTasks((prev) => [...prev, task.id]);
          if (i === TASKS.length - 1) {
            setRunning(false);
            setDone(true);
            clearInterval(t);
            setElapsed(SEQ_TOTAL_MS);
          }
        }, TASK_DURATION_MS * (i + 1));
      });
    } else {
      // All tasks complete at almost the same time
      TASKS.forEach((task, i) => {
        setTimeout(() => {
          setCompletedTasks((prev) => [...prev, task.id]);
        }, TASK_DURATION_MS + i * 80); // stagger completion slightly
      });
      setTimeout(() => {
        setRunning(false);
        setDone(true);
        clearInterval(t);
        setElapsed(PAR_TOTAL_MS);
      }, PAR_TOTAL_MS + TASKS.length * 80);
    }
  };

  const speedup = (SEQ_TOTAL_MS / PAR_TOTAL_MS).toFixed(1);

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
      {/* Mode buttons */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 grid grid-cols-2 gap-3">
        <button
          onClick={() => run("sequential")}
          disabled={running}
          className={`p-4 rounded-xl border text-xs font-mono font-bold text-center transition disabled:opacity-40 ${
            mode === "sequential"
              ? "border-slate-400 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
              : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
          }`}
        >
          <div className="text-lg mb-1">🐢</div>
          Sequential
          <div className="text-[10px] font-normal text-slate-500 mt-0.5">~{SEQ_TOTAL_MS / 1000}s total</div>
        </button>
        <button
          onClick={() => run("parallel")}
          disabled={running}
          className={`p-4 rounded-xl border text-xs font-mono font-bold text-center transition disabled:opacity-40 ${
            mode === "parallel"
              ? "border-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300"
              : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
          }`}
        >
          <div className="text-lg mb-1">⚡</div>
          Parallel (Send API)
          <div className="text-[10px] font-normal text-slate-500 mt-0.5">~{PAR_TOTAL_MS / 1000}s total</div>
        </button>
      </div>

      <div className="p-5 space-y-4">
        {/* Task Cards */}
        <div className="space-y-2">
          {TASKS.map((task) => {
            const isComplete = completedTasks.includes(task.id);
            const isRunning = running && (
              mode === "parallel" || (mode === "sequential" && !isComplete && completedTasks.length === TASKS.indexOf(task))
            );
            return (
              <div
                key={task.id}
                className={`p-3 rounded-xl border text-xs flex items-center justify-between gap-3 transition-all duration-300 ${
                  isComplete ? taskColors[task.color] : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 text-slate-500"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full shrink-0 ${isComplete ? "bg-emerald-500" : isRunning ? "bg-amber-400 animate-pulse" : "bg-slate-300 dark:bg-slate-700"}`} />
                  <span className={isComplete ? "font-semibold" : ""}>{task.topic}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-mono shrink-0">
                  {isComplete ? (
                    <><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /><span className="text-emerald-600 dark:text-emerald-400">done</span></>
                  ) : isRunning ? (
                    <span className="text-amber-500 animate-pulse">running...</span>
                  ) : (
                    <span className="text-slate-400">waiting</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Timer */}
        {mode && (
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500">
              <Clock className="w-3.5 h-3.5" />
              Elapsed
            </div>
            <span className={`font-mono text-sm font-bold ${done ? (mode === "parallel" ? "text-emerald-500" : "text-slate-500") : "text-amber-500"}`}>
              {(elapsed / 1000).toFixed(1)}s
            </span>
          </div>
        )}

        {/* Result */}
        {done && mode && (
          <div className={`p-4 rounded-xl border space-y-1 ${mode === "parallel" ? "border-emerald-400 bg-emerald-50 dark:bg-emerald-950/30" : "border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"}`}>
            {mode === "parallel" ? (
              <>
                <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                  <Zap className="w-4 h-4" />
                  {speedup}× faster with LangGraph Send() API
                </p>
                <p className="text-[11px] text-emerald-700 dark:text-emerald-400">
                  All 3 tasks ran simultaneously. Total: {PAR_TOTAL_MS / 1000}s vs {SEQ_TOTAL_MS / 1000}s sequential.
                </p>
              </>
            ) : (
              <>
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Sequential complete — {SEQ_TOTAL_MS / 1000}s total
                </p>
                <p className="text-[11px] text-slate-500">
                  Each task waited for the previous one. Try Parallel mode to see {speedup}× speedup.
                </p>
              </>
            )}
          </div>
        )}

        {!mode && (
          <p className="text-xs text-slate-500 dark:text-slate-400 text-center font-mono">
            Click Sequential or Parallel above to run the benchmark
          </p>
        )}
      </div>
    </div>
  );
}
