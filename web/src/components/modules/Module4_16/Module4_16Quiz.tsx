"use client";
import React, { useState } from "react";
import confetti from "canvas-confetti";
import { CheckCircle2, XCircle, Award, RotateCcw } from "lucide-react";

const QUESTIONS = [
  {
    id: 1,
    question: "What is 'Model Tiering' (or Router-based Model Selection) and why does it save so much money in production AI agent systems?",
    options: [
      "Running all requests on the most expensive reasoning model available.",
      "Using a lightweight classifier or router to send simple, high-frequency tasks (FAQ, intent detection) to cheap, fast models (e.g., GPT-4o-mini at $0.15/1M), and reserving expensive models (Sonnet / o3) only for complex multi-step reasoning.",
      "Training a new 70B parameter model from scratch every month.",
      "Switching between models based on the time of day.",
    ],
    correctIndex: 1,
    explanation: "In production, 70-80% of agent steps are straightforward classifications, formatting checks, or simple lookups that do not require an expensive reasoning model. Routing those to high-speed, low-cost models drops overall API expenses by 60%+ without degrading task quality.",
  },
  {
    id: 2,
    question: "Why is Semantic Caching (using vector embeddings) vastly superior to traditional exact-string caching for AI agents?",
    options: [
      "Traditional string caches cannot store JSON objects.",
      "Users ask the same question in hundreds of slightly different ways ('How do I return shoes?' vs 'What is your shoe return policy?'). Traditional caching misses almost all of them, whereas semantic caching matches them by cosine similarity in vector space.",
      "Vector embeddings are free and do not use RAM.",
      "Semantic caching automatically translates prompts into French.",
    ],
    correctIndex: 1,
    explanation: "Exact-string caching only hits if the user types the exact identical characters with identical spacing and punctuation. Semantic caching computes the embedding of the query and checks if a semantically equivalent query already exists in the cache (e.g. cosine similarity >= 0.92), turning 2% hit rates into 35-50% hit rates.",
  },
  {
    id: 3,
    question: "What is the biggest operational hazard of Semantic Caching in an autonomous agent system, and how do you prevent it?",
    options: [
      "Vector search consumes too much disk space.",
      "Cache Staleness: returning an outdated cached answer to a time-sensitive query (e.g., 'What is today's stock price?' returning last week's price). Prevention: enforce strict TTLs and never cache non-idempotent or real-time tool outputs.",
      "Semantic caches cause the LLM to forget its system prompt.",
      "It requires switching from Python to C++.",
    ],
    correctIndex: 1,
    explanation: "As highlighted in the curriculum slides: 'Semantic cache hit rates look great until you realize users are getting stale information.' Time-sensitive data (news, stocks, live inventory) must have short TTLs (5–15 minutes) or bypass the cache entirely via a 'cache-control: no-cache' flag.",
  },
];

export default function Module4_16Quiz() {
  const [selected, setSelected] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const score = QUESTIONS.filter((q) => selected[q.id] === q.correctIndex).length;

  const handleSubmit = () => {
    setSubmitted(true);
    if (score === QUESTIONS.length) {
      confetti({ particleCount: 70, spread: 75, origin: { y: 0.75 } });
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm p-6 md:p-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
            Concept Mastery Check
          </span>
          <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
            Module 4.16 • Cost Optimization & Semantic Caching Quiz
          </h3>
        </div>
        {submitted && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border text-xs font-mono font-bold">
              <Award className="w-4 h-4 text-teal-500" />
              {score} / {QUESTIONS.length}
            </div>
            <button
              onClick={() => {
                setSelected({});
                setSubmitted(false);
              }}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-mono transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Retry
            </button>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {QUESTIONS.map((q, idx) => {
          const isCorrect = selected[q.id] === q.correctIndex;
          return (
            <div
              key={q.id}
              className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-3"
            >
              <div className="flex items-start gap-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-teal-500/20 text-teal-600 dark:text-teal-400 shrink-0">
                  Q{idx + 1}
                </span>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {q.question}
                </p>
              </div>

              <div className="space-y-2">
                {q.options.map((opt, optIdx) => {
                  const sel = selected[q.id] === optIdx;
                  let style =
                    "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300";
                  if (sel) {
                    style =
                      "border-teal-500 bg-teal-50/50 dark:bg-teal-950/40 text-teal-900 dark:text-teal-200 font-semibold";
                  }
                  if (submitted) {
                    if (optIdx === q.correctIndex) {
                      style =
                        "border-emerald-500 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 font-semibold";
                    } else if (sel && !isCorrect) {
                      style =
                        "border-red-500 bg-red-500/10 text-red-800 dark:text-red-300";
                    }
                  }
                  return (
                    <button
                      key={optIdx}
                      disabled={submitted}
                      onClick={() =>
                        !submitted &&
                        setSelected((p) => ({ ...p, [q.id]: optIdx }))
                      }
                      className={`w-full text-left p-3 rounded-lg border text-xs transition flex items-center justify-between gap-3 ${style}`}
                    >
                      <span>{opt}</span>
                      {submitted && optIdx === q.correctIndex && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      )}
                      {submitted && sel && !isCorrect && (
                        <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <div
                  className={`p-3 rounded-lg text-xs leading-relaxed ${
                    isCorrect
                      ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                      : "bg-red-50 dark:bg-red-950/30 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800"
                  }`}
                >
                  <span className="font-bold">Why: </span>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={Object.keys(selected).length < QUESTIONS.length}
          className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-semibold text-xs tracking-wider uppercase transition shadow-sm"
        >
          Submit Answers
        </button>
      )}
    </div>
  );
}
