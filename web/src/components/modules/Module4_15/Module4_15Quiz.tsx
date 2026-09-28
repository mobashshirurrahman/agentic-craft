"use client";
import React, { useState } from "react";
import confetti from "canvas-confetti";
import { CheckCircle2, XCircle, Award, RotateCcw } from "lucide-react";

const QUESTIONS = [
  {
    id: 1,
    question: "Why can't you scale an autonomous AI agent workload simply by upgrading to a massive 64-core machine (Vertical Scaling)?",
    options: [
      "Modern operating systems do not support more than 8 CPU cores.",
      "Agent workloads are heavily I/O-bound (waiting on external LLM token generation, vector search, and web APIs). A faster CPU cannot force OpenAI or Anthropic servers to generate tokens faster — you need horizontal scaling (more parallel worker containers).",
      "Vertical scaling is illegal under cloud provider terms of service.",
      "LLMs can only connect to single-core computers.",
    ],
    correctIndex: 1,
    explanation: "Because agent execution spends 85%+ of its wall-clock time waiting on remote network I/O from LLM providers and external APIs, buying a faster CPU yields almost zero speedup. You must scale horizontally by distributing parallel agent sessions across dozens or hundreds of lightweight stateless worker containers.",
  },
  {
    id: 2,
    question: "What is the primary role of 'Cold Storage' (e.g. AWS S3) in a scaled production agent architecture?",
    options: [
      "To store temporary session cache keys that need 1-millisecond access.",
      "To offload bulky, low-frequency artifacts (such as scraped 5MB web HTML pages, generated PDF reports, and raw audio files) so that the PostgreSQL database doesn't bloat and slow down query indices.",
      "To act as the primary message broker instead of Redis.",
      "To execute Python code inside S3 buckets.",
    ],
    correctIndex: 1,
    explanation: "In agent workflows, agents frequently download huge PDF documents, scrape raw HTML DOM trees, or generate CSVs. Storing raw 10MB blobs inside relational databases quickly exhausts IOPS and bloats database backups. Offloading artifacts to S3 while storing only the S3 URL in PostgreSQL keeps the database fast and lean.",
  },
  {
    id: 3,
    question: "What is 'Graceful Draining' and why is it critical when deploying Kubernetes rolling updates to agent worker fleets?",
    options: [
      "Deleting all user databases before updating the code.",
      "Allowing in-flight agent sessions to finish their active thoughts and save their checkpoints before the container is terminated, rather than sending a hard SIGKILL that corrupts user tasks mid-workflow.",
      "Draining the cooling water in the physical server rack.",
      "Flushing the Redis cache every 10 seconds.",
    ],
    correctIndex: 1,
    explanation: "Standard web containers finish in 50ms, so SIGTERM termination is painless. But an agent might be on step 4 of a 5-step financial transaction! Graceful draining stops the worker from accepting new jobs, gives it a grace period (e.g. 180 seconds) to complete its in-flight workflow, saves the checkpoint, and only then shuts down.",
  },
];

export default function Module4_15Quiz() {
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
            Module 4.15 • Production Scaling & Storage Quiz
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
