"use client";
import React, { useState } from "react";
import confetti from "canvas-confetti";
import { CheckCircle2, XCircle, Award, RotateCcw } from "lucide-react";

const QUESTIONS = [
  {
    id: 1,
    question: "Your agent calls a search tool with `max_results: 500`. The API limit is 10. What does a robust tool do?",
    options: [
      "Silently caps it to 10 without telling the agent.",
      "Crashes with an unhandled Python exception.",
      "Returns a structured VALIDATION_ERROR with the field name and limit, so the agent understands what went wrong and can retry correctly.",
      "Returns 500 empty results.",
    ],
    correctIndex: 2,
    explanation: "Structured errors are the language an agent speaks. If your tool crashes with a Python traceback, the agent sees a wall of text and hallucinates a fix. A structured VALIDATION_ERROR tells the agent exactly which parameter was wrong and why — enabling self-correction.",
  },
  {
    id: 2,
    question: "A web search tool fails with HTTP 503 (server overloaded). What is the correct production response?",
    options: [
      "Immediately return an error to the agent — retries waste time.",
      "Retry with exponential backoff (0.5s, 1s, 2s) up to 3 attempts, then return a structured NETWORK_ERROR if all retries fail.",
      "Wait exactly 30 seconds and retry once.",
      "Switch to a completely different tool without logging anything.",
    ],
    correctIndex: 1,
    explanation: "503s are transient — the server was briefly overloaded. Exponential backoff with jitter gives the server time to recover without hammering it with rapid retries. This is the Tenacity library's default pattern and is battle-tested in production at every major tech company.",
  },
  {
    id: 3,
    question: "Why must you sanitize sensitive data (API keys, passwords, PII) before writing structured logs?",
    options: [
      "Because log files are always encrypted and don't need sanitization.",
      "Because logs flow to systems like Datadog, Splunk, or CloudWatch — which are accessible to many engineers. A raw API key in a log line is a credential leak waiting to happen.",
      "Because Python's `logging` module cannot store strings longer than 50 characters.",
      "Because sensitive data makes log files too large to read.",
    ],
    correctIndex: 1,
    explanation: "The principle of least exposure: logs should contain correlation IDs, request shapes, and timing — not secrets. Redact with patterns like `***` before writing. This is a SOC 2 compliance requirement in most production environments.",
  },
];

export default function Module4_1Quiz() {
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
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">Concept Mastery Check</span>
          <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">Module 4.1 • Robust Tools Quiz</h3>
        </div>
        {submitted && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border text-xs font-mono font-bold">
              <Award className="w-4 h-4 text-amber-500" />{score} / {QUESTIONS.length}
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
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-600 dark:text-amber-400 shrink-0">Q{idx + 1}</span>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{q.question}</p>
              </div>
              <div className="space-y-2">
                {q.options.map((opt, optIdx) => {
                  const sel = selected[q.id] === optIdx;
                  let style = "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700";
                  if (sel) style = "border-amber-500 bg-amber-50/50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 font-semibold";
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
          <button onClick={handleSubmit} disabled={Object.keys(selected).length < QUESTIONS.length} className="px-6 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-40 text-white font-mono text-xs font-bold transition">Submit Answers</button>
        ) : (
          <span className="text-xs font-mono text-slate-500">{score === QUESTIONS.length ? "🔥 Production Engineer mindset unlocked!" : "Review the explanations above"}</span>
        )}
      </div>
    </div>
  );
}
