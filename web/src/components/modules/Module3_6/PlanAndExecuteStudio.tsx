"use client";

import React, { useState } from "react";
import {
  ListTodo,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Layers,
  Cpu,
  RefreshCw,
} from "lucide-react";

interface PlanStep {
  id: number;
  text: string;
  status: "pending" | "running" | "completed" | "failed";
  tool: string;
  result?: string;
}

export default function PlanAndExecuteStudio() {
  const [goal, setGoal] = useState<string>(
    "Research competitor pricing for Q3, generate financial comparison table, and draft executive summary."
  );
  const [steps, setSteps] = useState<PlanStep[]>([
    {
      id: 1,
      text: "Search competitor website and extract pricing tiers",
      status: "pending",
      tool: "web_search(query='competitor SaaS pricing')",
    },
    {
      id: 2,
      text: "Format pricing data into a structured comparison table",
      status: "pending",
      tool: "data_formatter(schema='PricingTable')",
    },
    {
      id: 3,
      text: "Draft 200-word executive summary with recommendations",
      status: "pending",
      tool: "llm_writer(tone='executive')",
    },
  ]);

  const [activePhase, setActivePhase] = useState<"idle" | "planning" | "executing" | "replanning" | "done">("idle");
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(-1);

  const runPlanAndExecute = () => {
    setActivePhase("planning");
    setCurrentStepIdx(-1);

    // Reset steps
    setSteps((prev) =>
      prev.map((s) => ({ ...s, status: "pending", result: undefined }))
    );

    // 1. Planning phase (800ms)
    setTimeout(() => {
      setActivePhase("executing");
      setCurrentStepIdx(0);
      setSteps((prev) =>
        prev.map((s, idx) => (idx === 0 ? { ...s, status: "running" } : s))
      );

      // Step 1 finishes
      setTimeout(() => {
        setSteps((prev) =>
          prev.map((s, idx) =>
            idx === 0
              ? {
                  ...s,
                  status: "completed",
                  result: "Found 3 tiers: Starter ($29), Pro ($79), Enterprise ($199)",
                }
              : idx === 1
              ? { ...s, status: "running" }
              : s
          )
        );
        setCurrentStepIdx(1);

        // Step 2 finishes
        setTimeout(() => {
          setSteps((prev) =>
            prev.map((s, idx) =>
              idx === 1
                ? {
                    ...s,
                    status: "completed",
                    result: "Markdown table generated with 4 comparison columns",
                  }
                : idx === 2
                ? { ...s, status: "running" }
                : s
            )
          );
          setCurrentStepIdx(2);

          // Step 3 finishes
          setTimeout(() => {
            setSteps((prev) =>
              prev.map((s, idx) =>
                idx === 2
                  ? {
                      ...s,
                      status: "completed",
                      result: "Executive summary ready: Recommend positioning at $69/mo.",
                    }
                  : s
              )
            );
            setActivePhase("done");
          }, 600);
        }, 600);
      }, 600);
    }, 500);
  };

  const resetAll = () => {
    setActivePhase("idle");
    setCurrentStepIdx(-1);
    setSteps((prev) =>
      prev.map((s) => ({ ...s, status: "pending", result: undefined }))
    );
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm overflow-hidden transition-colors">
      {/* Header */}
      <div className="p-5 md:p-6 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-indigo-500/10 via-purple-500/5 to-transparent">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <ListTodo className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base md:text-lg text-slate-900 dark:text-white">
                Plan-and-Execute Agent Architecture Studio
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Contrast single-step ReAct loops with structured Architect-Executor-Replanner workflows
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={resetAll}
              disabled={activePhase === "idle"}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 text-slate-600 dark:text-slate-400 text-xs font-mono transition"
              title="Reset"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={runPlanAndExecute}
              disabled={activePhase !== "idle" && activePhase !== "done"}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-mono text-xs font-bold transition shadow-sm"
            >
              <Play className={`w-3.5 h-3.5 ${activePhase === "executing" ? "animate-spin" : ""}`} />
              {activePhase === "idle"
                ? "Execute Multi-Step Plan"
                : activePhase === "done"
                ? "Run Again"
                : "Executing Plan..."}
            </button>
          </div>
        </div>
      </div>

      <div className="p-5 md:p-6 space-y-6">
        {/* User Objective Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase">
            High-Level Agent Goal
          </label>
          <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-mono text-slate-800 dark:text-slate-200">
            "{goal}"
          </div>
        </div>

        {/* 3 Phases Visualizer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div
            className={`p-3.5 rounded-xl border text-center transition-all ${
              activePhase === "planning"
                ? "border-indigo-500 bg-indigo-500/20 text-indigo-900 dark:text-indigo-200 font-bold scale-105"
                : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400"
            }`}
          >
            <span className="text-[10px] font-mono uppercase block text-slate-500">1. Architect</span>
            <span className="text-xs font-mono font-bold">Planner Node</span>
            <p className="text-[11px] text-slate-500 mt-1">Decomposes goal into ordered steps</p>
          </div>

          <div
            className={`p-3.5 rounded-xl border text-center transition-all ${
              activePhase === "executing"
                ? "border-purple-500 bg-purple-500/20 text-purple-900 dark:text-purple-200 font-bold scale-105"
                : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400"
            }`}
          >
            <span className="text-[10px] font-mono uppercase block text-slate-500">2. Worker</span>
            <span className="text-xs font-mono font-bold">Executor Node</span>
            <p className="text-[11px] text-slate-500 mt-1">Executes current step using tools</p>
          </div>

          <div
            className={`p-3.5 rounded-xl border text-center transition-all ${
              activePhase === "done"
                ? "border-emerald-500 bg-emerald-500/20 text-emerald-900 dark:text-emerald-200 font-bold scale-105"
                : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400"
            }`}
          >
            <span className="text-[10px] font-mono uppercase block text-slate-500">3. Supervisor</span>
            <span className="text-xs font-mono font-bold">Replanner Node</span>
            <p className="text-[11px] text-slate-500 mt-1">Evaluates status: replan or complete</p>
          </div>
        </div>

        {/* Dynamic Todo List Canvas */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="font-bold text-slate-700 dark:text-slate-300 uppercase">
              Current Plan State (State["plan"])
            </span>
            <span className="text-indigo-600 dark:text-indigo-400 font-bold">
              {steps.filter((s) => s.status === "completed").length}/{steps.length} Steps Completed
            </span>
          </div>

          <div className="space-y-2">
            {steps.map((step, idx) => (
              <div
                key={step.id}
                className={`p-4 rounded-xl border transition-all ${
                  step.status === "running"
                    ? "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/40 shadow-sm"
                    : step.status === "completed"
                    ? "border-emerald-300 dark:border-emerald-800/60 bg-emerald-50/20 dark:bg-emerald-950/20"
                    : "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center text-[10px] font-mono font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="text-xs font-mono font-semibold text-slate-900 dark:text-white">
                        {step.text}
                      </div>
                      <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                        Tool: <code className="text-indigo-600 dark:text-indigo-400">{step.tool}</code>
                      </div>
                      {step.result && (
                        <div className="mt-2 p-2 rounded bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800/50 text-[11px] font-mono text-emerald-800 dark:text-emerald-300">
                          Observation: {step.result}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="shrink-0 text-xs font-mono font-bold">
                    {step.status === "running" && (
                      <span className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400">
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        Running...
                      </span>
                    )}
                    {step.status === "completed" && (
                      <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-4 h-4" />
                        Done
                      </span>
                    )}
                    {step.status === "pending" && (
                      <span className="text-slate-400">Pending</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
