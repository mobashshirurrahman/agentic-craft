"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Repeat,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  RotateCcw,
  Play,
  FileText,
  Star,
  Layers,
} from "lucide-react";

export default function ReflectionEngineStudio() {
  const [taskPrompt, setTaskPrompt] = useState<string>(
    "Write a concise executive briefing on why our database migrated from MongoDB to PostgreSQL."
  );

  const [cycle, setCycle] = useState<number>(0);
  const [isReflecting, setIsReflecting] = useState<boolean>(false);

  // States across reflection iterations
  const DRAFT_1 = {
    text: "We moved to PostgreSQL because MongoDB was bad for ACID transactions. Postgres is relational and has SQL which our team likes. It also supports JSONB so we don't lose NoSQL capabilities. The migration was good.",
    score: 64,
    critiques: [
      "Too informal (uses words like 'bad' and 'good').",
      "Lacks concrete technical metrics (no mention of transaction consistency or query latency).",
      "Does not mention cost or indexing improvements.",
    ],
  };

  const DRAFT_2 = {
    text: "Executive Briefing: Database Architecture Migration\n\nOur engineering team completed a planned migration from MongoDB to PostgreSQL to achieve strict multi-table ACID compliance and consolidate relational data integrity. While MongoDB served our early document-store needs, our enterprise workflows required complex foreign-key constraints and rigorous financial reporting.\n\nKey Strategic Outcomes:\n1. Reliability: Full ACID transactions eliminated distributed write race conditions.\n2. Flexibility: Native JSONB indexing retained flexible schema querying without performance penalties.\n3. Cost Optimization: Consolidated database infrastructure reduced AWS operational licensing expenses by 28%.",
    score: 95,
    critiques: [
      "Tone is executive, structured, and formal.",
      "Cites concrete engineering rationale and business cost metrics (28% savings).",
      "Quality threshold (95% >= 85%) exceeded. Ready for publication.",
    ],
  };

  const runReflection = () => {
    setIsReflecting(true);
    setCycle(1);

    setTimeout(() => {
      setCycle(2);
      setIsReflecting(false);
    }, 900);
  };

  const resetAll = () => {
    setCycle(0);
    setIsReflecting(false);
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm overflow-hidden transition-colors">
      {/* Header */}
      <div className="p-5 md:p-6 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-purple-500/10 via-pink-500/5 to-transparent">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
              <Repeat className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base md:text-lg text-slate-900 dark:text-white">
                Reflection Pattern Workbench (Actor ➔ Critic ➔ Reviser)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Witness how automated self-critique transforms weak 1-shot drafts into publication-grade outputs
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={resetAll}
              disabled={cycle === 0}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 text-slate-600 dark:text-slate-400 text-xs font-mono transition"
              title="Reset"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={runReflection}
              disabled={isReflecting || cycle === 2}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white font-mono text-xs font-bold transition shadow-sm"
            >
              <Play className={`w-3.5 h-3.5 ${isReflecting ? "animate-spin" : ""}`} />
              {cycle === 0
                ? "Trigger Reflection Loop"
                : cycle === 1
                ? "Running Critic..."
                : "Reflection Completed (95%)"}
            </button>
          </div>
        </div>
      </div>

      <div className="p-5 md:p-6 space-y-6">
        {/* User Task Card */}
        <div className="space-y-1.5">
          <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase">
            Prompt Objective
          </label>
          <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-mono text-slate-800 dark:text-slate-200">
            "{taskPrompt}"
          </div>
        </div>

        {/* 3 Nodes Flow Diagram */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div
            className={`p-3.5 rounded-xl border text-center transition-all ${
              cycle >= 1
                ? "border-purple-500 bg-purple-500/10 text-purple-900 dark:text-purple-200 font-bold"
                : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-500"
            }`}
          >
            <span className="text-[10px] font-mono uppercase block text-slate-400">Node 1</span>
            <span className="text-xs font-mono font-bold">generator_actor</span>
            <p className="text-[11px] text-slate-500 mt-1">Generates initial fast draft</p>
          </div>

          <div
            className={`p-3.5 rounded-xl border text-center transition-all ${
              cycle === 1
                ? "border-amber-500 bg-amber-500/20 text-amber-900 dark:text-amber-200 font-bold scale-105 animate-pulse"
                : cycle > 1
                ? "border-purple-500 bg-purple-500/10 text-purple-900 dark:text-purple-200 font-bold"
                : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-500"
            }`}
          >
            <span className="text-[10px] font-mono uppercase block text-slate-400">Node 2</span>
            <span className="text-xs font-mono font-bold">evaluator_critic</span>
            <p className="text-[11px] text-slate-500 mt-1">Grades clarity, metrics & tone</p>
          </div>

          <div
            className={`p-3.5 rounded-xl border text-center transition-all ${
              cycle === 2
                ? "border-emerald-500 bg-emerald-500/20 text-emerald-900 dark:text-emerald-200 font-bold scale-105 shadow-sm"
                : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-500"
            }`}
          >
            <span className="text-[10px] font-mono uppercase block text-slate-400">Node 3</span>
            <span className="text-xs font-mono font-bold">reviser_polisher</span>
            <p className="text-[11px] text-slate-500 mt-1">Rewrites draft to fix critiques</p>
          </div>
        </div>

        {/* Side-by-Side Comparison Canvas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Draft 1: Unreflected */}
          <div
            className={`p-4 rounded-xl border transition-all space-y-3 ${
              cycle >= 1
                ? "border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950/40"
                : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 opacity-60"
            }`}
          >
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
              <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase">
                Iteration 1 (Raw 1-Shot Draft)
              </span>
              {cycle >= 1 && (
                <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded">
                  Score: {DRAFT_1.score}/100
                </span>
              )}
            </div>

            <p className="text-xs font-mono text-slate-700 dark:text-slate-300 leading-relaxed italic">
              "{DRAFT_1.text}"
            </p>

            {cycle >= 1 && (
              <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs font-mono space-y-1">
                <span className="font-bold text-amber-700 dark:text-amber-400 text-[10px] uppercase block">
                  Critic Evaluator Feedback:
                </span>
                <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-slate-600 dark:text-slate-400">
                  {DRAFT_1.critiques.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Draft 2: Post-Reflection */}
          <div
            className={`p-4 rounded-xl border transition-all space-y-3 ${
              cycle === 2
                ? "border-emerald-500 bg-emerald-50/20 dark:bg-emerald-950/20 shadow-md"
                : "border-slate-200 dark:border-slate-800 bg-slate-50/20 dark:bg-slate-950/20 opacity-40"
            }`}
          >
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
              <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-300 uppercase">
                Iteration 2 (Reflected & Polished)
              </span>
              {cycle === 2 && (
                <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded">
                  Score: {DRAFT_2.score}/100 (PASSED)
                </span>
              )}
            </div>

            <div className="text-xs font-mono text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-line">
              {cycle === 2 ? DRAFT_2.text : "Awaiting reflection feedback..."}
            </div>

            {cycle === 2 && (
              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono space-y-1">
                <span className="font-bold text-emerald-700 dark:text-emerald-400 text-[10px] uppercase block">
                  Critic Verdict:
                </span>
                <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-slate-600 dark:text-slate-400">
                  {DRAFT_2.critiques.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
