"use client";
import React, { useState } from "react";
import confetti from "canvas-confetti";
import { CheckCircle2, XCircle, Award, RotateCcw } from "lucide-react";

const QUESTIONS = [
  {
    id: 1,
    question: "LangGraph's `Send()` API is used to fan out parallel tasks. What must your state define for the results to merge correctly?",
    options: [
      "Nothing — LangGraph automatically appends results in arrival order.",
      "A reducer on the results field: `Annotated[list[str], operator.add]`. Without it, each parallel branch overwrites the previous result instead of appending to a shared list.",
      "A global lock variable that sequential threads acquire before writing.",
      "A database table that each parallel node writes to independently.",
    ],
    correctIndex: 1,
    explanation: "This is the most common parallel bug in LangGraph. If you fan out 5 tasks and forget the reducer, you get 1 result instead of 5 — each branch overwrites the previous. `operator.add` is the list append reducer that safely merges all branches.",
  },
  {
    id: 2,
    question: "You need to run 8 API calls inside a single LangGraph node. The calls are all independent. What is the most efficient approach?",
    options: [
      "Run them sequentially with a for loop — it's simpler and safe.",
      "Use `asyncio.gather()` to run all 8 API calls concurrently inside the async node. This keeps parallelism contained in one node and reduces latency from 8×T to approximately T.",
      "Spawn 8 separate LangGraph Send() nodes, one per API call.",
      "Use ProcessPoolExecutor since API calls are CPU-bound.",
    ],
    correctIndex: 1,
    explanation: "`asyncio.gather()` is perfect for I/O-bound parallel work (API calls, database queries) within a single node. It's simpler than multi-node Send() when you don't need the results to checkpoint independently. ProcessPoolExecutor is for CPU-bound work (data processing, ML inference), not network I/O.",
  },
  {
    id: 3,
    question: "When researching 'Tesla Q4 earnings, EV market share, and analyst sentiment', which approach is correct and why?",
    options: [
      "Sequential — you need the earnings data before you can analyze sentiment.",
      "Parallel — all 3 sub-queries are independent. Earnings don't affect market share data. Running them with Send() cuts research time from ~3×T to ~T, with a reducer to merge results.",
      "Sequential — parallel execution requires more tokens.",
      "Neither works — you must choose a single sub-query per request.",
    ],
    correctIndex: 1,
    explanation: "Independence is the key test: if sub-query B doesn't depend on the output of sub-query A, they can run in parallel. 'Tesla earnings', 'EV market share', and 'analyst sentiment' are all fetched from different sources with zero dependency on each other — perfect Send() parallelism candidates.",
  },
];

export default function Module4_5Quiz() {
  const [selected, setSelected] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const score = QUESTIONS.filter((q) => selected[q.id] === q.correctIndex).length;

  const handleSubmit = () => {
    setSubmitted(true);
    if (score === QUESTIONS.length) confetti({ particleCount: 80, spread: 80, origin: { y: 0.7 } });
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm p-6 md:p-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Concept Mastery Check</span>
          <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">Module 4.5 • Parallel Execution Quiz</h3>
        </div>
        {submitted && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border text-xs font-mono font-bold">
              <Award className="w-4 h-4 text-emerald-500" />{score} / {QUESTIONS.length}
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
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 shrink-0">Q{idx + 1}</span>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{q.question}</p>
              </div>
              <div className="space-y-2">
                {q.options.map((opt, optIdx) => {
                  const sel = selected[q.id] === optIdx;
                  let style = "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700";
                  if (sel) style = "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-semibold";
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
          <button onClick={handleSubmit} disabled={Object.keys(selected).length < QUESTIONS.length} className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-mono text-xs font-bold transition">Submit Answers</button>
        ) : (
          <span className="text-xs font-mono text-slate-500">{score === QUESTIONS.length ? "⚡ Parallel Systems Expert!" : "Review explanations above"}</span>
        )}
      </div>
    </div>
  );
}
