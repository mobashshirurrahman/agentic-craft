"use client";

import React, { useState } from "react";
import { CheckCircle2, XCircle, ArrowRight, Zap } from "lucide-react";

type Prompt = {
  id: string;
  label: string;
  text: string;
  issues: string[];
  toolCalls: Array<{ tool: string; correct: boolean; note: string }>;
  score: number;
};

const PROMPTS: Prompt[] = [
  {
    id: "vague",
    label: "❌ Too Vague",
    text: "You are a helpful financial assistant. Answer questions and use tools when needed.",
    issues: [
      "No tool selection criteria — agent guesses which tool to call",
      "No output format specified — inconsistent responses",
      "No persistence instruction — agent stops too early",
      "No guardrails — agent may hallucinate rather than use tools",
    ],
    toolCalls: [
      { tool: "web_search()", correct: false, note: "Called for a price query that needed live_price() — wrong tool" },
      { tool: "calculator()", correct: false, note: "Skipped — agent guessed the answer instead" },
      { tool: "END (premature)", correct: false, note: "Stopped after 1 step even though task was incomplete" },
    ],
    score: 38,
  },
  {
    id: "optimal",
    label: "✅ Well-Structured",
    text: `You are a financial research assistant. Keep going until the task is COMPLETELY resolved.

TOOL SELECTION:
- live_price(): for current stock prices only (real-time)
- web_search(): for news, filings, analyst reports (not prices)
- calculator(): for any arithmetic — never compute in your head
- sec_filings(): for 10-K, 10-Q, earnings transcripts

OUTPUT FORMAT: Always end with a structured JSON summary:
{ "answer": "...", "sources": [...], "confidence": "high|medium|low" }

Never guess. If you don't have data, use a tool to get it.`,
    issues: [],
    toolCalls: [
      { tool: "live_price('NVDA')", correct: true, note: "Correct tool for real-time price" },
      { tool: "calculator(revenue / shares)", correct: true, note: "Used tool for EPS — no mental math" },
      { tool: "web_search('NVDA analyst upgrades')", correct: true, note: "Correct tool for news/opinion data" },
    ],
    score: 91,
  },
];

export default function PromptOptimizerLab() {
  const [active, setActive] = useState<Prompt>(PROMPTS[0]);

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
      {/* Tabs */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex gap-3">
        {PROMPTS.map((p) => (
          <button
            key={p.id}
            onClick={() => setActive(p)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition ${
              active.id === p.id
                ? p.id === "vague"
                  ? "border-red-400 bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400"
                  : "border-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400"
                : "border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="p-5 space-y-4">
        {/* Prompt text */}
        <div className="space-y-1.5">
          <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">System Prompt</p>
          <pre className="p-3 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto whitespace-pre-wrap leading-relaxed">
            {active.text}
          </pre>
        </div>

        {/* Issues */}
        {active.issues.length > 0 && (
          <div className="p-3 rounded-xl border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-950/20 space-y-1.5">
            <p className="text-[10px] font-mono font-bold text-red-600 dark:text-red-400 uppercase">Problems with this prompt:</p>
            {active.issues.map((issue, i) => (
              <div key={i} className="flex items-start gap-1.5 text-xs text-red-800 dark:text-red-300">
                <XCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-red-500" />
                {issue}
              </div>
            ))}
          </div>
        )}

        {/* Tool call trace */}
        <div className="space-y-2">
          <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">Resulting Tool Calls</p>
          {active.toolCalls.map((tc, i) => (
            <div key={i} className={`p-3 rounded-xl border text-xs flex items-start gap-2 ${tc.correct ? "border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300" : "border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-950/20 text-red-800 dark:text-red-300"}`}>
              {tc.correct ? <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-500 mt-0.5" /> : <XCircle className="w-3.5 h-3.5 shrink-0 text-red-500 mt-0.5" />}
              <div>
                <span className="font-mono font-bold">{tc.tool}</span>
                <p className="text-[10px] opacity-75 mt-0.5">{tc.note}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Score */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
          <span className="text-xs font-mono text-slate-500">Agent Performance Score</span>
          <div className="flex items-center gap-2">
            <div className="w-32 h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${active.score >= 80 ? "bg-emerald-500" : "bg-red-500"}`}
                style={{ width: `${active.score}%` }}
              />
            </div>
            <span className={`text-xs font-mono font-bold ${active.score >= 80 ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}>
              {active.score}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
