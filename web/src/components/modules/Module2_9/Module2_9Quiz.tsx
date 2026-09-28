"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { CheckCircle2, XCircle, Award, RotateCcw } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Why is structured JSON logging essential for production AI agents instead of simple `print()` statements?",
    options: [
      "Because `print()` statements disable GPU acceleration.",
      "Because JSON logs are machine-searchable, filterable by run ID, and can track exact token usage, latencies, and dollar costs per node.",
      "Because Python no longer supports the print function in production.",
      "Because JSON logs prevent the agent from making API calls.",
    ],
    correctIndex: 1,
    explanation:
      "When diagnosing why an agent failed at 3 AM across 10,000 runs, structured JSON logs allow you to query `run_id`, filter by `level='ERROR'`, and pinpoint the exact failing tool parameter.",
  },
  {
    id: 2,
    question: "Which logging level should be used for detailed intermediate state snapshots and verbose prompt payloads?",
    options: [
      "CRITICAL",
      "INFO",
      "DEBUG",
      "WARNING",
    ],
    correctIndex: 2,
    explanation:
      "`DEBUG` is intended for granular diagnostic information. Key milestones (like tool calls and task completion) belong in `INFO`, while unexpected recoverable events belong in `WARNING`.",
  },
  {
    id: 3,
    question: "What core capability do observability platforms like LangSmith or Phoenix provide?",
    options: [
      "They automatically rewrite your code in Rust.",
      "They provide hierarchical visual trace trees showing the exact inputs, outputs, token counts, latencies, and tool calls for every step of an agent run.",
      "They replace the need for API keys by generating free tokens.",
      "They delete all failed runs from existence.",
    ],
    correctIndex: 1,
    explanation:
      "Observability platforms turn multi-step 'black-box' agent reasoning into clear parent-child trace trees, allowing engineers to visualize every model call, tool execution, and state transition.",
  },
];

export default function Module2_9Quiz() {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSelect = (questionId: number, optionIndex: number) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const calculateScore = () => {
    let score = 0;
    QUESTIONS.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score++;
      }
    });
    return score;
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const score = calculateScore();
    if (score === QUESTIONS.length) {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setSubmitted(false);
  };

  const score = calculateScore();
  const allAnswered = Object.keys(selectedAnswers).length === QUESTIONS.length;

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm overflow-hidden p-6 md:p-8 transition-colors">
      <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1.5">
            <Award className="w-4 h-4" />
            Module 2.9 Knowledge Check
          </span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            Structured Logging & Observability
          </h3>
        </div>

        {submitted && (
          <div className="text-right">
            <div className="text-2xl font-black font-mono text-amber-600 dark:text-amber-400">
              {score} / {QUESTIONS.length}
            </div>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {QUESTIONS.map((q, idx) => {
          const selected = selectedAnswers[q.id];
          const isCorrect = selected === q.correctIndex;

          return (
            <div
              key={q.id}
              className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40"
            >
              <div className="flex items-start gap-3 mb-3">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 leading-snug">
                  {q.question}
                </h4>
              </div>

              <div className="space-y-2 ml-9">
                {q.options.map((opt, optIdx) => {
                  const isThisSelected = selected === optIdx;
                  let optionStyles =
                    "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700";

                  if (isThisSelected) {
                    optionStyles =
                      "border-amber-500 bg-amber-500/10 text-amber-950 dark:text-amber-200 ring-1 ring-amber-500/30";
                  }

                  if (submitted) {
                    if (optIdx === q.correctIndex) {
                      optionStyles =
                        "border-emerald-500 bg-emerald-500/20 text-emerald-950 dark:text-emerald-200 font-medium";
                    } else if (isThisSelected && !isCorrect) {
                      optionStyles =
                        "border-red-500 bg-red-500/15 text-red-950 dark:text-red-200";
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelect(q.id, optIdx)}
                      disabled={submitted}
                      className={`w-full text-left p-3 rounded-lg border text-xs transition flex items-center justify-between gap-3 ${optionStyles}`}
                    >
                      <span>{opt}</span>
                      {submitted && optIdx === q.correctIndex && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      )}
                      {submitted && isThisSelected && !isCorrect && (
                        <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                      )}
                    </button>
                  );
                })}

                {submitted && (
                  <div className="mt-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-slate-700 dark:text-slate-300">
                    <strong className="text-amber-700 dark:text-amber-300 block mb-0.5 font-mono">
                      Explanation:
                    </strong>
                    {q.explanation}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Quiz
        </button>

        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className="px-6 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-40 text-white font-mono text-xs font-bold transition shadow-sm"
          >
            Submit Answers
          </button>
        ) : (
          <span className="text-xs font-mono text-slate-500">
            {score === QUESTIONS.length ? "Mastered! Proceed to Module 2.10" : "Review notes above"}
          </span>
        )}
      </div>
    </div>
  );
}
