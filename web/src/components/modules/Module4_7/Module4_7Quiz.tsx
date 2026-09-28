"use client";
import React, { useState } from "react";
import confetti from "canvas-confetti";
import { CheckCircle2, XCircle, Award, RotateCcw } from "lucide-react";

const QUESTIONS = [
  {
    id: 1,
    question: "Your web search tool returns HTTP 429 (rate limit exceeded). What is the correct error handling strategy?",
    options: [
      "Classify as PERMANENT error — rate limit means the tool is broken.",
      "Classify as TRANSIENT error — retry with exponential backoff (0.5s, 1s, 2s). Rate limits reset after a short window.",
      "Immediately switch to a different search tool without logging.",
      "Return an empty result and let the agent continue without the search data.",
    ],
    correctIndex: 1,
    explanation: "HTTP 429 is by definition transient — the limit resets. Retry with exponential backoff. The key distinction: transient = recoverable with time/retry. Permanent = not recoverable by retrying (e.g., 401 Unauthorized, 404 Not Found).",
  },
  {
    id: 2,
    question: "What does a Circuit Breaker do when it transitions to OPEN state?",
    options: [
      "It retries the failed service more aggressively to force recovery.",
      "It immediately fails all calls to the broken service without making any HTTP requests, protecting both the caller and the overwhelmed downstream service from further load.",
      "It routes all traffic to a backup service automatically.",
      "It sends an alert email and waits for human intervention.",
    ],
    correctIndex: 1,
    explanation: "OPEN state = fail fast with no network calls. This is the key insight: when a service is down, hammering it with retries from dozens of agents makes the outage worse. The circuit breaker absorbs the impact, gives the service time to recover, then probes with a single test request (HALF-OPEN) before restoring full traffic.",
  },
  {
    id: 3,
    question: "The slides warn about 'Silent Error Swallowing' — a catch-all exception handler that logs and continues. Why is this dangerous for agents specifically?",
    options: [
      "It's not dangerous — logging and continuing is always the safe approach.",
      "The agent produces an answer that appears complete but is actually based on missing or wrong data. The user doesn't know, the logs don't alert, and the bug propagates silently through every subsequent step.",
      "It causes the agent to crash immediately on the next tool call.",
      "It only affects the logging system, not agent output quality.",
    ],
    correctIndex: 1,
    explanation: "Silent errors are especially insidious in agents because agents chain outputs: if step 3 fails silently and returns empty data, steps 4, 5, and 6 all reason on top of that empty data — producing confident-sounding but wrong final answers. Always propagate errors explicitly through state.",
  },
];

export default function Module4_7Quiz() {
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
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-600 dark:text-red-400">Concept Mastery Check</span>
          <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">Module 4.7 • Error Handling Quiz</h3>
        </div>
        {submitted && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border text-xs font-mono font-bold">
              <Award className="w-4 h-4 text-red-500" />{score} / {QUESTIONS.length}
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
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-red-500/20 text-red-600 dark:text-red-400 shrink-0">Q{idx + 1}</span>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{q.question}</p>
              </div>
              <div className="space-y-2">
                {q.options.map((opt, optIdx) => {
                  const sel = selected[q.id] === optIdx;
                  let style = "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300";
                  if (sel) style = "border-red-500 bg-red-50/50 dark:bg-red-950/40 text-red-900 dark:text-red-200 font-semibold";
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
          <button onClick={handleSubmit} disabled={Object.keys(selected).length < QUESTIONS.length} className="px-6 py-2 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-40 text-white font-mono text-xs font-bold transition">Submit</button>
        ) : (
          <span className="text-xs font-mono text-slate-500">{score === QUESTIONS.length ? "🛡️ Resilience Expert!" : "Review explanations above"}</span>
        )}
      </div>
    </div>
  );
}
