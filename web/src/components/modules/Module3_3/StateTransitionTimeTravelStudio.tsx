"use client";

import React, { useState } from "react";
import {
  History,
  Play,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Cpu,
  Layers,
  Search,
  Eye,
  FileCode,
} from "lucide-react";

interface StepSnapshot {
  stepIndex: number;
  nodeName: string;
  timestamp: string;
  deltaUpdates: Record<string, any>;
  fullValues: Record<string, any>;
  commentary: string;
}

const EXECUTION_TIMELINE: StepSnapshot[] = [
  {
    stepIndex: 1,
    nodeName: "input_guardrail",
    timestamp: "12:00:01.050",
    deltaUpdates: {
      safety_status: "PASSED",
      sanitized_query: "Find total revenue for Q3 2024 in EU region.",
    },
    fullValues: {
      raw_input: "Find total revenue for Q3 2024 in EU region.",
      safety_status: "PASSED",
      sanitized_query: "Find total revenue for Q3 2024 in EU region.",
      messages: [{ role: "user", content: "Find total revenue for Q3 2024 in EU region." }],
    },
    commentary: "Guardrail verified no prompt injection. Sets safety_status='PASSED'.",
  },
  {
    stepIndex: 2,
    nodeName: "sql_planner",
    timestamp: "12:00:01.820",
    deltaUpdates: {
      generated_sql: "SELECT SUM(amount) FROM sales WHERE quarter='Q3' AND region='EU';",
      requires_tool: true,
    },
    fullValues: {
      raw_input: "Find total revenue for Q3 2024 in EU region.",
      safety_status: "PASSED",
      sanitized_query: "Find total revenue for Q3 2024 in EU region.",
      messages: [{ role: "user", content: "Find total revenue for Q3 2024 in EU region." }],
      generated_sql: "SELECT SUM(amount) FROM sales WHERE quarter='Q3' AND region='EU';",
      requires_tool: true,
    },
    commentary: "Model analyzed schema and synthesized SQL query. Appended generated_sql to state.",
  },
  {
    stepIndex: 3,
    nodeName: "sql_executor",
    timestamp: "12:00:02.140",
    deltaUpdates: {
      query_result: [{ region: "EU", quarter: "Q3", total_revenue: 4820000 }],
      execution_error: null,
    },
    fullValues: {
      raw_input: "Find total revenue for Q3 2024 in EU region.",
      safety_status: "PASSED",
      sanitized_query: "Find total revenue for Q3 2024 in EU region.",
      messages: [{ role: "user", content: "Find total revenue for Q3 2024 in EU region." }],
      generated_sql: "SELECT SUM(amount) FROM sales WHERE quarter='Q3' AND region='EU';",
      requires_tool: true,
      query_result: [{ region: "EU", quarter: "Q3", total_revenue: 4820000 }],
      execution_error: null,
    },
    commentary: "Database executed query in 320ms and returned rows into query_result.",
  },
  {
    stepIndex: 4,
    nodeName: "synthesis_node",
    timestamp: "12:00:02.950",
    deltaUpdates: {
      final_answer: "In Q3 2024, total European revenue was €4.82M.",
      status: "COMPLETED",
    },
    fullValues: {
      raw_input: "Find total revenue for Q3 2024 in EU region.",
      safety_status: "PASSED",
      sanitized_query: "Find total revenue for Q3 2024 in EU region.",
      messages: [
        { role: "user", content: "Find total revenue for Q3 2024 in EU region." },
        { role: "assistant", content: "In Q3 2024, total European revenue was €4.82M." },
      ],
      generated_sql: "SELECT SUM(amount) FROM sales WHERE quarter='Q3' AND region='EU';",
      requires_tool: true,
      query_result: [{ region: "EU", quarter: "Q3", total_revenue: 4820000 }],
      execution_error: null,
      final_answer: "In Q3 2024, total European revenue was €4.82M.",
      status: "COMPLETED",
    },
    commentary: "Synthesis node transformed raw SQL rows into a natural language response. Graph halts at END.",
  },
];

export default function StateTransitionTimeTravelStudio() {
  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);
  const [viewMode, setViewMode] = useState<"updates" | "values">("updates");

  const currentSnapshot = EXECUTION_TIMELINE[activeStepIdx];

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm overflow-hidden transition-colors">
      {/* Header */}
      <div className="p-5 md:p-6 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-blue-500/10 via-cyan-500/5 to-transparent">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base md:text-lg text-slate-900 dark:text-white">
                State Transition Time-Travel Debugger
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Rewind and inspect state snapshots step-by-step between stream modes ('values' vs 'updates')
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex text-xs font-mono">
              <button
                onClick={() => setViewMode("updates")}
                className={`px-3 py-1 rounded-lg transition ${
                  viewMode === "updates"
                    ? "bg-blue-600 text-white font-bold"
                    : "text-slate-600 dark:text-slate-400 hover:text-white"
                }`}
              >
                stream_mode="updates"
              </button>
              <button
                onClick={() => setViewMode("values")}
                className={`px-3 py-1 rounded-lg transition ${
                  viewMode === "values"
                    ? "bg-blue-600 text-white font-bold"
                    : "text-slate-600 dark:text-slate-400 hover:text-white"
                }`}
              >
                stream_mode="values"
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 md:p-6 space-y-6">
        {/* Step Progression Timeline */}
        <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
          <div className="flex items-center gap-2">
            {EXECUTION_TIMELINE.map((item, idx) => (
              <button
                key={item.nodeName}
                onClick={() => setActiveStepIdx(idx)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition ${
                  activeStepIdx === idx
                    ? "bg-blue-600 text-white font-bold shadow-sm"
                    : activeStepIdx > idx
                    ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-medium"
                    : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500"
                }`}
              >
                <span>{item.stepIndex}.</span>
                <span>{item.nodeName}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveStepIdx((prev) => Math.max(0, prev - 1))}
              disabled={activeStepIdx === 0}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 disabled:opacity-30 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <ArrowLeft className="w-4 h-4 text-slate-600 dark:text-slate-300" />
            </button>
            <span className="text-xs font-mono text-slate-500">
              Step {activeStepIdx + 1} of {EXECUTION_TIMELINE.length}
            </span>
            <button
              onClick={() => setActiveStepIdx((prev) => Math.min(EXECUTION_TIMELINE.length - 1, prev + 1))}
              disabled={activeStepIdx === EXECUTION_TIMELINE.length - 1}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 disabled:opacity-30 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <ArrowRight className="w-4 h-4 text-slate-600 dark:text-slate-300" />
            </button>
          </div>
        </div>

        {/* Active Node Detail Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Node Commentary */}
          <div className="lg:col-span-5 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-950/30 space-y-3">
            <div>
              <span className="text-[10px] font-mono uppercase font-bold text-blue-600 dark:text-blue-400">
                Inspecting Node Execution
              </span>
              <h4 className="text-base font-bold text-slate-900 dark:text-white font-mono">
                {currentSnapshot.nodeName}
              </h4>
              <span className="text-[11px] font-mono text-slate-500">
                Executed at: {currentSnapshot.timestamp}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {currentSnapshot.commentary}
            </div>

            <div className="space-y-1.5 pt-2 text-xs font-mono">
              <div className="text-slate-500 font-bold uppercase text-[10px]">
                Stream Mode Distinction:
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                {viewMode === "updates"
                  ? "🔹 'updates' mode shows ONLY the fresh keys written by this exact node. Ideal for zeroing in on which node modified what."
                  : "🔸 'values' mode shows the entire accumulated state dictionary snapshot after this node finishes. Ideal for end-to-end inspection."}
              </p>
            </div>
          </div>

          {/* JSON State Inspector */}
          <div className="lg:col-span-7 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-slate-700 dark:text-slate-300">
                {viewMode === "updates" ? "Node Delta Mutation (Diff)" : "Full State Snapshot (Values)"}
              </span>
              <span className="text-blue-600 dark:text-blue-400">
                {Object.keys(viewMode === "updates" ? currentSnapshot.deltaUpdates : currentSnapshot.fullValues).length} fields
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs border border-slate-800 overflow-x-auto max-h-[300px]">
              <pre>
                {JSON.stringify(
                  viewMode === "updates"
                    ? currentSnapshot.deltaUpdates
                    : currentSnapshot.fullValues,
                  null,
                  2
                )}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
