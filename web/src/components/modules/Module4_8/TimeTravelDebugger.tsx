"use client";

import React, { useState } from "react";
import { Clock, Play, RotateCcw, GitBranch, CheckCircle2, ArrowLeft } from "lucide-react";

type Checkpoint = {
  id: string;
  label: string;
  turn: number;
  state: string;
  canBranch: boolean;
};

const CHECKPOINTS: Checkpoint[] = [
  { id: "cp1", label: "START — user query received", turn: 0, state: '{ messages: ["Analyze top 5 AI stocks"], step: "start" }', canBranch: false },
  { id: "cp2", label: "research_node — fetched market data", turn: 1, state: '{ messages: [..., "Fetched NVDA, MSFT, GOOGL, META, AMZN data"], step: "research" }', canBranch: true },
  { id: "cp3", label: "analysis_node — ran analysis (had a bug: wrong ranking formula)", turn: 2, state: '{ messages: [..., "Ranked by volume (wrong!)"], step: "analysis", error: "wrong_metric" }', canBranch: true },
  { id: "cp4", label: "summarize_node — wrote final report (based on bad analysis)", turn: 3, state: '{ messages: [..., "Final report: AMZN #1 by volume... (incorrect)"], step: "summary" }', canBranch: false },
];

export default function TimeTravelDebugger() {
  const [selected, setSelected] = useState<Checkpoint | null>(null);
  const [branching, setBranching] = useState(false);
  const [branchDone, setBranchDone] = useState(false);
  const [branchSteps, setBranchSteps] = useState<string[]>([]);
  const [fix, setFix] = useState('metric: "market_cap"  // was "volume" — now corrected');

  const startBranch = () => {
    if (!selected) return;
    setBranching(true);
    setBranchDone(false);
    const steps = [
      `⏪ Rewind to checkpoint: "${selected.label}"`,
      "🔧 Injecting state correction: " + fix,
      "🌿 New branch created from checkpoint",
      "▶ Re-running analysis_node with corrected metric (market_cap)...",
      "✅ analysis_node → correct ranking: NVDA #1, MSFT #2, GOOGL #3",
      "▶ Re-running summarize_node with corrected analysis...",
      "✅ Final report generated — accurate, no hallucination",
    ];
    steps.forEach((s, i) => {
      setTimeout(() => {
        setBranchSteps((prev) => [...prev, s]);
        if (i === steps.length - 1) { setBranching(false); setBranchDone(true); }
      }, (i + 1) * 550);
    });
  };

  const reset = () => {
    setSelected(null);
    setBranching(false);
    setBranchDone(false);
    setBranchSteps([]);
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <p className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
          <Clock className="w-4 h-4" />
          Checkpoint Timeline (thread_id: "analysis-001")
        </p>
        <button onClick={reset} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition">
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="p-5 space-y-4">
        {/* Timeline */}
        <div className="space-y-2">
          {CHECKPOINTS.map((cp, i) => (
            <button
              key={cp.id}
              onClick={() => { if (cp.canBranch && !branching) { setSelected(cp); setBranchSteps([]); setBranchDone(false); } }}
              disabled={branching}
              className={`w-full text-left p-3 rounded-xl border text-xs transition ${
                selected?.id === cp.id
                  ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30"
                  : cp.canBranch
                  ? "border-slate-200 dark:border-slate-800 hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/20 cursor-pointer"
                  : "border-slate-200 dark:border-slate-800 opacity-60 cursor-default"
              }`}
            >
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-[10px] text-slate-500">Turn {cp.turn}</span>
                <div className={`w-2 h-2 rounded-full shrink-0 ${i === 2 ? "bg-red-500" : "bg-emerald-500"}`} />
                <span className={`font-semibold ${i === 2 ? "text-red-700 dark:text-red-400" : "text-slate-800 dark:text-slate-200"}`}>{cp.label}</span>
                {cp.canBranch && (
                  <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 font-mono">⏪ click to branch</span>
                )}
              </div>
              <p className="text-[10px] font-mono text-slate-500 mt-1 truncate">{cp.state}</p>
            </button>
          ))}
        </div>

        {/* Branch Panel */}
        {selected && (
          <div className="p-4 rounded-xl border border-indigo-300 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/30 space-y-3">
            <p className="text-xs font-bold text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5">
              <GitBranch className="w-4 h-4" />
              Branch from: &ldquo;{selected.label}&rdquo;
            </p>
            <div className="space-y-1.5">
              <p className="text-[10px] font-mono text-slate-500">State correction to inject:</p>
              <textarea
                value={fix}
                onChange={(e) => setFix(e.target.value)}
                className="w-full p-2 rounded-lg bg-slate-900 text-slate-200 font-mono text-[11px] border border-slate-700 resize-none"
                rows={2}
              />
            </div>
            <button
              onClick={startBranch}
              disabled={branching || branchDone}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-mono text-xs font-bold flex items-center justify-center gap-2 transition"
            >
              <GitBranch className="w-3.5 h-3.5" />
              {branchDone ? "Branch Complete ✓" : "Create Branch & Re-run"}
            </button>
          </div>
        )}

        {/* Branch Execution Log */}
        {branchSteps.length > 0 && (
          <div className="space-y-1.5">
            {branchSteps.map((step, i) => (
              <div key={i} className={`p-2 rounded-lg text-[11px] font-mono flex items-start gap-1.5 ${step.includes("✅") ? "text-emerald-600 dark:text-emerald-400" : step.includes("⏪") || step.includes("🌿") ? "text-indigo-600 dark:text-indigo-400" : "text-slate-600 dark:text-slate-400"}`}>
                <span>{step}</span>
              </div>
            ))}
          </div>
        )}

        {!selected && (
          <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center font-mono">
            Click a checkpoint with &ldquo;⏪ click to branch&rdquo; to rewind and debug
          </p>
        )}
      </div>
    </div>
  );
}
