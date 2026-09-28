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
    question: "Why are AI agent applications characterized as predominantly I/O-bound rather than CPU-bound?",
    options: [
      "Because Python scripts cannot perform addition.",
      "Because 95% of execution time is spent idling while waiting on network HTTP responses from cloud model APIs, vector stores, and web searches.",
      "Because GPUs do not use electricity.",
      "Because async code can only run on optical quantum computers.",
    ],
    correctIndex: 1,
    explanation:
      "Your machine doesn't compute LLM tokens locally; it waits for network packets over cloud sockets. While waiting, an async event loop can service hundreds of other client requests concurrently.",
  },
  {
    id: 2,
    question: "What is the standard naming convention for asynchronous methods across LangChain and LangGraph?",
    options: [
      "Methods are prefixed with an 'a' (e.g., `.invoke()` ➔ `.ainvoke()`, `.stream()` ➔ `.astream()`).",
      "Methods end with `_async_mode`.",
      "Methods must be written in capital letters.",
      "Methods require a `@thread` decorator on every line.",
    ],
    correctIndex: 0,
    explanation:
      "All async runnables in the ecosystem follow the pythonic convention of prefixing with `a`: `ainvoke`, `astream`, `abatch`.",
  },
  {
    id: 3,
    question: "How should you safely invoke a legacy, synchronous blocking tool inside an async agent node?",
    options: [
      "Call it directly, which freezes all other concurrent user connections.",
      "Wrap it using `asyncio.to_thread(blocking_func)` to run it in a separate worker thread without stalling the event loop.",
      "Delete the function and replace it with a prompt.",
      "Rewrite Python's asyncio module in C.",
    ],
    correctIndex: 1,
    explanation:
      "`asyncio.to_thread()` offloads the blocking I/O or heavy computation to a background thread pool, keeping the main async event loop responsive.",
  },
];

export default function Module2_13Quiz() {
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
          <span className="text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1.5">
            <Award className="w-4 h-4" />
            Module 2.13 Knowledge Check
          </span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            Async / Sync Concurrency & Event Loops
          </h3>
        </div>

        {submitted && (
          <div className="text-right">
            <div className="text-2xl font-black font-mono text-blue-600 dark:text-blue-400">
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
                <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-700 dark:text-blue-300 font-mono text-xs font-bold flex items-center justify-center shrink-0">
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
                      "border-blue-500 bg-blue-500/10 text-blue-950 dark:text-blue-200 ring-1 ring-blue-500/30";
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
                  <div className="mt-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs text-slate-700 dark:text-slate-300">
                    <strong className="text-blue-700 dark:text-blue-300 block mb-0.5 font-mono">
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
            className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white font-mono text-xs font-bold transition shadow-sm"
          >
            Submit Answers
          </button>
        ) : (
          <span className="text-xs font-mono text-slate-500">
            {score === QUESTIONS.length ? "Mastered! Proceed to Module 2.14" : "Review notes above"}
          </span>
        )}
      </div>
    </div>
  );
}
