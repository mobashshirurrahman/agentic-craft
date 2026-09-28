"use client";
import React, { useState } from "react";
import confetti from "canvas-confetti";
import { CheckCircle2, XCircle, Award, RotateCcw } from "lucide-react";

const QUESTIONS = [
  {
    id: 1,
    question: "The slides identify '3 Critical Agent Reminders' to include in system prompts. Which of these is one of them and why does it matter?",
    options: [
      "'Always be concise' — shorter prompts save tokens.",
      "'Persistence: Keep going until the task is completely resolved' — without this, agents stop after partial answers ~20% more often.",
      "'Never use more than 3 tools per response' — tool limits prevent hallucination.",
      "'Always confirm with the user before each tool call' — prevents mistakes.",
    ],
    correctIndex: 1,
    explanation: "Persistence is a non-obvious but high-impact reminder. Without it, agents frequently declare victory after one tool call even when the task requires 3–4 steps. Research shows this single instruction reduces premature stopping by ~20%.",
  },
  {
    id: 2,
    question: "Your agent frequently calls `web_search()` for stock prices, when `live_price()` exists specifically for real-time quotes. What is the root cause and fix?",
    options: [
      "The agent needs more training data — nothing you can fix via prompt.",
      "The tool descriptions are ambiguous. Fix: add explicit decision criteria — 'Use live_price() for real-time quotes. Use web_search() only for news, filings, and opinions — NEVER for price data.'",
      "You should delete the web_search() tool so the agent can't choose it.",
      "This is expected behavior — web_search() can handle price queries too.",
    ],
    correctIndex: 1,
    explanation: "Tool selection errors are almost always a prompt problem, not an LLM problem. The agent doesn't know your intent — it reads tool descriptions and guesses. Explicit decision criteria ('Use X for Y, never use X for Z') eliminate the ambiguity that causes wrong tool selection.",
  },
  {
    id: 3,
    question: "The slides warn: 'A developer tweaks a prompt, runs 2-3 test queries, declares it better, and deploys. Two weeks later, 15% of queries break.' What is the correct process?",
    options: [
      "Run 2-3 tests is actually fine — more testing is wasteful.",
      "Build a golden dataset of 20-50 representative queries including edge cases. Evaluate every prompt change against this dataset BEFORE deploying. Version every change and monitor regression after deployment.",
      "Always deploy to 100% of traffic immediately — rollbacks are fast.",
      "Only change prompts when users report problems, not proactively.",
    ],
    correctIndex: 1,
    explanation: "Prompt optimization is engineering, not intuition. The golden dataset is your test suite. You wouldn't ship code without tests — don't ship prompt changes without evaluating them against a representative benchmark.",
  },
];

export default function Module4_9Quiz() {
  const [selected, setSelected] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const score = QUESTIONS.filter((q) => selected[q.id] === q.correctIndex).length;
  const handleSubmit = () => {
    setSubmitted(true);
    if (score === QUESTIONS.length) confetti({ particleCount: 60, spread: 70, origin: { y: 0.75 } });
  };
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm p-6 md:p-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">Concept Mastery Check</span>
          <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">Module 4.9 • Prompt Optimization Quiz</h3>
        </div>
        {submitted && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border text-xs font-mono font-bold">
              <Award className="w-4 h-4 text-orange-500" />{score} / {QUESTIONS.length}
            </div>
            <button onClick={() => { setSelected({}); setSubmitted(false); }} className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-mono transition">
              <RotateCcw className="w-3.5 h-3.5" />Retry
            </button>
          </div>
        )}
      </div>
      <div className="space-y-6">
        {QUESTIONS.map((q, idx) => {
          const isCorrect = selected[q.id] === q.correctIndex;
          return (
            <div key={q.id} className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-3">
              <div className="flex items-start gap-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-orange-500/20 text-orange-600 dark:text-orange-400 shrink-0">Q{idx + 1}</span>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{q.question}</p>
              </div>
              <div className="space-y-2">
                {q.options.map((opt, optIdx) => {
                  const sel = selected[q.id] === optIdx;
                  let style = "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300";
                  if (sel) style = "border-orange-500 bg-orange-50/50 dark:bg-orange-950/40 text-orange-900 dark:text-orange-200 font-semibold";
                  if (submitted) {
                    if (optIdx === q.correctIndex) style = "border-emerald-500 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 font-semibold";
                    else if (sel && !isCorrect) style = "border-red-500 bg-red-500/10 text-red-800 dark:text-red-300";
                  }
                  return (
                    <button key={optIdx} disabled={submitted} onClick={() => !submitted && setSelected((p) => ({ ...p, [q.id]: optIdx }))} className={`w-full text-left p-3 rounded-lg border text-xs transition flex items-center justify-between gap-3 ${style}`}>
                      <span>{opt}</span>
                      {submitted && optIdx === q.correctIndex && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
                      {submitted && sel && !isCorrect && <XCircle className="w-4 h-4 text-red-500 shrink-0" />}
                    </button>
                  );
                })}
              </div>
              {submitted && (
                <div className={`p-3 rounded-lg text-xs leading-relaxed ${isCorrect ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800" : "bg-red-50 dark:bg-red-950/30 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800"}`}>
                  <span className="font-bold">Why: </span>{q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-between pt-2">
        <span className="text-xs text-slate-500 font-mono">{Object.keys(selected).length} of {QUESTIONS.length} answered</span>
        {!submitted ? (
          <button onClick={handleSubmit} disabled={Object.keys(selected).length < QUESTIONS.length} className="px-6 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 disabled:opacity-40 text-white font-mono text-xs font-bold transition">Submit</button>
        ) : (
          <span className="text-xs font-mono text-slate-500">{score === QUESTIONS.length ? "✍️ Prompt Scientist!" : "Review explanations above"}</span>
        )}
      </div>
    </div>
  );
}
