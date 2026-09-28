"use client";
import React, { useState, useEffect } from "react";
import {
  Server,
  Cpu,
  Layers,
  Play,
  RotateCcw,
  Plus,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldAlert,
  Zap,
} from "lucide-react";

interface Job {
  id: string;
  title: string;
  status: "QUEUED" | "PROCESSING" | "COMPLETED" | "FAILED";
  assignedWorker: number | null;
  progress: number;
}

interface Worker {
  id: number;
  status: "IDLE" | "BUSY" | "CRASHED";
  currentJobId: string | null;
  tasksCompleted: number;
}

const INITIAL_WORKERS: Worker[] = [
  { id: 1, status: "IDLE", currentJobId: null, tasksCompleted: 0 },
  { id: 2, status: "IDLE", currentJobId: null, tasksCompleted: 0 },
];

export default function WorkerQueueSimulator() {
  const [workers, setWorkers] = useState<Worker[]>(INITIAL_WORKERS);
  const [queue, setQueue] = useState<Job[]>([]);
  const [deadLetterQueue, setDeadLetterQueue] = useState<Job[]>([]);
  const [autoScale, setAutoScale] = useState<boolean>(false);

  // Simulation tick loop
  useEffect(() => {
    const interval = setInterval(() => {
      // 1. Process active jobs
      setQueue((prevQueue) => {
        let updatedQueue = prevQueue.map((job) => {
          if (job.status === "PROCESSING") {
            const nextProgress = job.progress + 25;
            if (nextProgress >= 100) {
              return { ...job, status: "COMPLETED" as const, progress: 100 };
            }
            return { ...job, progress: nextProgress };
          }
          return job;
        });

        // 2. Free up workers whose jobs completed
        const completedJobIds = updatedQueue
          .filter((j) => j.status === "COMPLETED")
          .map((j) => j.id);

        if (completedJobIds.length > 0) {
          setWorkers((prevWorkers) =>
            prevWorkers.map((w) => {
              if (w.currentJobId && completedJobIds.includes(w.currentJobId)) {
                return {
                  ...w,
                  status: "IDLE",
                  currentJobId: null,
                  tasksCompleted: w.tasksCompleted + 1,
                };
              }
              return w;
            })
          );
          // Remove completed from active queue
          updatedQueue = updatedQueue.filter((j) => j.status !== "COMPLETED");
        }

        // 3. Assign queued jobs to idle workers
        setWorkers((prevWorkers) => {
          const availableWorker = prevWorkers.find((w) => w.status === "IDLE");
          const nextJob = updatedQueue.find((j) => j.status === "QUEUED");

          if (availableWorker && nextJob) {
            updatedQueue = updatedQueue.map((j) =>
              j.id === nextJob.id
                ? { ...j, status: "PROCESSING" as const, assignedWorker: availableWorker.id }
                : j
            );
            return prevWorkers.map((w) =>
              w.id === availableWorker.id
                ? { ...w, status: "BUSY", currentJobId: nextJob.id }
                : w
            );
          }
          return prevWorkers;
        });

        return updatedQueue;
      });
    }, 800);

    return () => clearInterval(interval);
  }, []);

  // Auto-scaler check
  useEffect(() => {
    if (autoScale && queue.filter((j) => j.status === "QUEUED").length > 3 && workers.length < 5) {
      setWorkers((prev) => [
        ...prev,
        { id: prev.length + 1, status: "IDLE", currentJobId: null, tasksCompleted: 0 },
      ]);
    }
  }, [queue, autoScale, workers.length]);

  const handleEnqueueTasks = (count: number = 3) => {
    const titles = [
      "Analyze Tesla 10-K Filing",
      "Audit ERC-20 Smart Contract",
      "Draft M&A Due Diligence Memo",
      "Scrape 50 Competitor Pricing Pages",
      "Generate Unit Test Suite for Auth API",
    ];

    const newJobs: Job[] = Array.from({ length: count }).map((_, i) => ({
      id: "job_" + Math.random().toString(36).substring(2, 7),
      title: titles[Math.floor(Math.random() * titles.length)],
      status: "QUEUED",
      assignedWorker: null,
      progress: 0,
    }));

    setQueue((prev) => [...prev, ...newJobs]);
  };

  const handleSimulateCrash = () => {
    const busyWorker = workers.find((w) => w.status === "BUSY");
    if (busyWorker && busyWorker.currentJobId) {
      const crashedJobId = busyWorker.currentJobId;
      // Mark worker as crashed
      setWorkers((prev) =>
        prev.map((w) => (w.id === busyWorker.id ? { ...w, status: "CRASHED", currentJobId: null } : w))
      );
      // Re-queue or send to DLQ
      setQueue((prev) => {
        const target = prev.find((j) => j.id === crashedJobId);
        if (target) {
          setDeadLetterQueue((dlq) => [
            { ...target, status: "FAILED" },
            ...dlq.slice(0, 4),
          ]);
        }
        return prev.filter((j) => j.id !== crashedJobId);
      });
    }
  };

  const handleReset = () => {
    setWorkers(INITIAL_WORKERS);
    setQueue([]);
    setDeadLetterQueue([]);
  };

  const queuedCount = queue.filter((j) => j.status === "QUEUED").length;
  const processingCount = queue.filter((j) => j.status === "PROCESSING").length;

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-4 md:p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
            Distributed Systems Workbench
          </span>
          <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white">
            FastAPI + Redis Queue (Celery/RQ) Worker Simulator
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setAutoScale(!autoScale)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition border ${
              autoScale
                ? "bg-teal-500/20 text-teal-700 dark:text-teal-300 border-teal-500/30"
                : "bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700"
            }`}
          >
            Auto-Scale: {autoScale ? "ON" : "OFF"}
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-mono transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>
      </div>

      <div className="p-5 md:p-6 space-y-6">
        {/* Controls Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleEnqueueTasks(1)}
              className="px-3 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition"
            >
              <Plus className="w-3.5 h-3.5" /> Enqueue 1 Task
            </button>
            <button
              onClick={() => handleEnqueueTasks(4)}
              className="px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition"
            >
              <Zap className="w-3.5 h-3.5" /> Enqueue Burst (4 Tasks)
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSimulateCrash}
              disabled={processingCount === 0}
              className="px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-700 dark:text-rose-400 border border-rose-300 dark:border-rose-900/60 text-xs font-semibold flex items-center gap-1.5 disabled:opacity-40 transition"
            >
              <ShieldAlert className="w-3.5 h-3.5" /> Simulate Worker Crash
            </button>
          </div>
        </div>

        {/* 3-Tier Architecture Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Layer 1: FastAPI Web Ingestion Layer */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                <Server className="w-4 h-4 text-sky-500" />
                1. Web Nodes (FastAPI)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/20 text-sky-600 dark:text-sky-300">
                HTTP 202 Accepted
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Handles client TLS & auth in <strong>&lt;50ms</strong>. Enqueues job payload into Redis and returns immediately without blocking.
            </p>
            <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-[11px] text-slate-600 dark:text-slate-400 space-y-1">
              <div>Incoming Throughput: <strong className="text-slate-900 dark:text-white">1,200 req/min</strong></div>
              <div>Web Latency: <strong className="text-emerald-500">28ms avg</strong></div>
            </div>
          </div>

          {/* Layer 2: Message Broker (Redis Queue) */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-teal-500" />
                2. Broker (Redis)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-500/20 text-teal-700 dark:text-teal-300 font-bold">
                {queuedCount} Queued
              </span>
            </div>
            <div className="space-y-2 min-h-[140px] max-h-[180px] overflow-y-auto">
              {queue.length === 0 ? (
                <div className="text-center py-10 text-xs text-slate-400 italic">
                  Queue is empty. Click &ldquo;Enqueue&rdquo; above!
                </div>
              ) : (
                queue.map((j) => (
                  <div
                    key={j.id}
                    className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between gap-1 text-[11px]">
                      <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">{j.title}</span>
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-bold shrink-0 ${
                          j.status === "PROCESSING"
                            ? "bg-teal-500/20 text-teal-600 dark:text-teal-300"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                        }`}
                      >
                        {j.status}
                      </span>
                    </div>
                    {j.status === "PROCESSING" && (
                      <div className="w-full h-1 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                        <div
                          className="h-full bg-teal-500 transition-all duration-300"
                          style={{ width: `${j.progress}%` }}
                        />
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Layer 3: Celery/RQ Background Workers */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-indigo-500" />
                3. Worker Fleet ({workers.length})
              </span>
              <button
                onClick={() =>
                  setWorkers((prev) => [
                    ...prev,
                    { id: prev.length + 1, status: "IDLE", currentJobId: null, tasksCompleted: 0 },
                  ])
                }
                disabled={workers.length >= 6}
                className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 font-bold hover:bg-indigo-500/30 transition disabled:opacity-40"
              >
                + Add Worker
              </button>
            </div>
            <div className="space-y-2 min-h-[140px] max-h-[180px] overflow-y-auto">
              {workers.map((w) => (
                <div
                  key={w.id}
                  className={`p-2.5 rounded-lg border text-xs flex items-center justify-between transition ${
                    w.status === "BUSY"
                      ? "border-teal-500 bg-teal-50/40 dark:bg-teal-950/30"
                      : w.status === "CRASHED"
                      ? "border-rose-500 bg-rose-50/40 dark:bg-rose-950/30"
                      : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        w.status === "BUSY"
                          ? "bg-teal-500 animate-pulse"
                          : w.status === "CRASHED"
                          ? "bg-rose-500"
                          : "bg-slate-400"
                      }`}
                    />
                    <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                      Worker #{w.id}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-mono">
                    <span className="text-slate-500">{w.tasksCompleted} done</span>
                    <span
                      className={`px-1.5 py-0.5 rounded font-bold uppercase text-[10px] ${
                        w.status === "BUSY"
                          ? "text-teal-600 dark:text-teal-300"
                          : w.status === "CRASHED"
                          ? "text-rose-600 dark:text-rose-400"
                          : "text-slate-400"
                      }`}
                    >
                      {w.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dead Letter Queue Callout if any */}
        {deadLetterQueue.length > 0 && (
          <div className="p-3.5 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/20 space-y-1">
            <span className="text-xs font-bold text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              Dead Letter Queue (DLQ): {deadLetterQueue.length} Failed Tasks Captured
            </span>
            <p className="text-[11px] text-slate-600 dark:text-slate-300">
              Worker crash recovered! The broker isolated the unacknowledged job to avoid poisoning the active queue and triggered an automated alert.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
