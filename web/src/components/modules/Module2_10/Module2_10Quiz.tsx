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
    question: "When an agent hits an HTTP 429 Rate Limit error, what is the best practice client-side mitigation?",
    options: [
      "Immediately fire 10 more requests per second to force the connection through.",
      "Implement exponential backoff with jitter, waiting progressively longer between retries with small randomized delays.",
      "Permanently delete the user's account.",
      "Switch the computer to airplane mode.",
    ],
    correctIndex: 1,
    explanation:
      "Exponential backoff with jitter gives the API server time to replenish token buckets and prevents the 'thundering herd' problem where thousands of concurrent clients retry at the exact same millisecond.",
  },
  {
    id: 2,
    question: "How should an enterprise agent architecture handle an upstream HTTP 503 Service Unavailable outage?",
    options: [
      "Show an unhandled crash screen to all users.",
      "Configure automated fallback model routing (e.g. `model.with_fallbacks([secondary_model])`) to seamlessly divert traffic to another provider.",
      "Re-train the foundation model from scratch on local laptops.",
      "Wait 24 hours before attempting any response.",
    ],
    correctIndex: 1,
    explanation:
      "Multi-provider fallback routing (e.g. Primary: GPT-4o ➔ Fallback: Claude 3.5 Haiku or Gemini Flash) ensures zero user downtime when a single cloud provider experiences an incident.",
  },
  {
    id: 3,
    question: "Why should a retry policy NEVER retry an HTTP 401 Unauthorized error?",
    options: [
      "Because HTTP 401 indicates an invalid, missing, or revoked API key; retrying with the same bad credentials will fail every time and waste time.",
      "Because 401 errors automatically delete the Python virtual environment.",
      "Because 401 means the prompt was too long.",
      "Because API providers charge a 10x penalty for retrying authentication errors.",
    ],
    correctIndex: 0,
    explanation:
      "401 errors are fatal client-side authentication errors. Retrying without providing valid credentials is futile. The system should alert the developer immediately.",
  },
];

export default function Module2_10Quiz() {
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
          <span className="text-xs font-mono uppercase tracking-wider text-red-600 dark:text-red-400 font-bold flex items-center gap-1.5">
            <Award className="w-4 h-4" />
            Module 2.10 Knowledge Check
          </span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            HTTP Errors, Rate Limits, and Fallbacks
          </h3>
        </div>

        {submitted && (
          <div className="text-right">
            <div className="text-2xl font-black font-mono text-red-600 dark:text-red-400">
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
                <span className="w-6 h-6 rounded-full bg-red-500/20 text-red-700 dark:text-red-300 font-mono text-xs font-bold flex items-center justify-center shrink-0">
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
                      "border-red-500 bg-red-500/10 text-red-950 dark:text-red-200 ring-1 ring-red-500/30";
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
                  <div className="mt-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-slate-700 dark:text-slate-300">
                    <strong className="text-red-700 dark:text-red-300 block mb-0.5 font-mono">
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
            className="px-6 py-2 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-40 text-white font-mono text-xs font-bold transition shadow-sm"
          >
            Submit Answers
          </button>
        ) : (
          <span className="text-xs font-mono text-slate-500">
            {score === QUESTIONS.length ? "Mastered! Proceed to Module 2.11" : "Review notes above"}
          </span>
        )}
      </div>
    </div>
  );
}
