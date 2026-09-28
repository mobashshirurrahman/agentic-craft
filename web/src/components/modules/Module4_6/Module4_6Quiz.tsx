"use client";
import React, { useState } from "react";
import confetti from "canvas-confetti";
import { CheckCircle2, XCircle, Award, RotateCcw } from "lucide-react";

const QUESTIONS = [
  {
    id: 1,
    question: "A user asks: 'Summarize Tesla's Q4 earnings, recent product launches, and stock performance.' Which plan strategy is correct and why?",
    options: [
      "Sequential — always safe because you process one thing at a time.",
      "Parallel — all 3 sub-queries are independent. Earnings don't depend on product data. Running with Send() gives ~3× speedup.",
      "Sequential — the LLM must read earnings before analyzing stock performance.",
      "Ask the user which order they want the information in.",
    ],
    correctIndex: 1,
    explanation: "Independence is the test. Tesla earnings, product launches, and stock performance are fetched from completely different sources with no dependency between them. Parallel plan with Send() is the right call — this is exactly the example from the slides.",
  },
  {
    id: 2,
    question: "A user asks: 'Find AI products from the company that acquired DeepMind in 2014.' Why must this be sequential?",
    options: [
      "Because AI product searches are always slow and need extra time.",
      "Because the second sub-query ('find AI products by X') can only be executed after the first sub-query reveals who X is. Step 2 is data-dependent on Step 1.",
      "Because DeepMind is a proprietary topic that requires sequential access.",
      "It doesn't need to be sequential — you can run both sub-queries in parallel and merge later.",
    ],
    correctIndex: 1,
    explanation: "Dependency = sequential. You cannot search 'AI products by [company]' until sub-query 1 tells you which company acquired DeepMind. Forcing these into parallel gives you either wrong results or empty results.",
  },
  {
    id: 3,
    question: "Your LLM query planner returns a plan with 4 sub-queries: A, B, C (independent of each other), and D (depends on C's output). What is the optimal execution strategy?",
    options: [
      "Run all 4 in parallel — it's always faster.",
      "Run all 4 sequentially — it's always safe.",
      "Run A, B, C in parallel using Send(). When C completes, run D sequentially using C's output. Hybrid approach.",
      "Let the agent decide at runtime without any planning.",
    ],
    correctIndex: 2,
    explanation: "Real-world plans are rarely all-parallel or all-sequential. The optimal approach is a hybrid: fan out independent tasks (A, B, C) in parallel, then chain dependent tasks (D after C) sequentially. This is exactly what the slides call 'Query Analysis For Strategy Selection'.",
  },
];

export default function Module4_6Quiz() {
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
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">Concept Mastery Check</span>
          <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">Module 4.6 • Plan Execution Quiz</h3>
        </div>
        {submitted && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border text-xs font-mono font-bold">
              <Award className="w-4 h-4 text-blue-500" />{score} / {QUESTIONS.length}
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
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-600 dark:text-blue-400 shrink-0">Q{idx + 1}</span>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{q.question}</p>
              </div>
              <div className="space-y-2">
                {q.options.map((opt, optIdx) => {
                  const sel = selected[q.id] === optIdx;
                  let style = "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300";
                  if (sel) style = "border-blue-500 bg-blue-50/50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 font-semibold";
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
          <button onClick={handleSubmit} disabled={Object.keys(selected).length < QUESTIONS.length} className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white font-mono text-xs font-bold transition">Submit</button>
        ) : (
          <span className="text-xs font-mono text-slate-500">{score === QUESTIONS.length ? "🧠 Planning Expert!" : "Review explanations above"}</span>
        )}
      </div>
    </div>
  );
}
