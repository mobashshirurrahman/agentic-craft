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
    question: "What is the primary difference between a Shallow Agent and a Deep Planning Agent?",
    options: [
      "Shallow agents run in the cloud, while deep agents only run on mobile phones.",
      "Shallow agents use generic prompts with basic reactive tool loops; deep agents use structured decision trees, dynamic todo trackers, sub-agent decomposition, and persistent filesystem memory.",
      "Deep agents do not use LLMs.",
      "Shallow agents can only process image files.",
    ],
    correctIndex: 1,
    explanation:
      "Deep agents are engineered for sustained autonomous operation on complex software engineering and deep research workloads.",
  },
  {
    id: 2,
    question: "Why do modern coding agents (like Claude Code) maintain an active Todo List in their context?",
    options: [
      "Because the operating system demands a todo file.",
      "To prevent context drift: an explicit checklist keeps the model grounded on completed vs. pending tasks across multi-turn sessions.",
      "To increase API latency on purpose.",
      "To delete user source code automatically.",
    ],
    correctIndex: 1,
    explanation:
      "Context engineering with todo tracking eliminates 'forgetting' when tasks involve dozens of file edits and test runs.",
  },
  {
    id: 3,
    question: "When is deploying a Deep Planning Agent considered an anti-pattern (overkill)?",
    options: [
      "Refactoring an entire enterprise React codebase.",
      "Straightforward, single-turn tasks (like 'What's the weather in Tokyo?' or 'Summarize this email') where deep planning adds unnecessary latency, token cost, and complexity.",
      "Conducting a 10-source market research report.",
      "Running multi-file integration tests.",
    ],
    correctIndex: 1,
    explanation:
      "Match agent sophistication to task complexity: use simple prompt chains for quick queries, and deep planning agents for open-ended multi-step work.",
  },
];

export default function Module3_7Quiz() {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSelect = (qId: number, optionIdx: number) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
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
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
      });
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setSubmitted(false);
  };

  const score = calculateScore();
  const allAnswered = QUESTIONS.every((q) => selectedAnswers[q.id] !== undefined);

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm p-6 md:p-8 space-y-6 transition-colors">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Concept Mastery Check
          </span>
          <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
            Module 3.7 • Deep Planning Agents Quiz
          </h3>
        </div>

        {submitted && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono font-bold">
              <Award className="w-4 h-4 text-blue-500" />
              <span>
                Score: {score} / {QUESTIONS.length}
              </span>
            </div>
            <button
              onClick={handleReset}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-mono transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Retry
            </button>
          </div>
        )}
      </div>

      {/* Questions */}
      <div className="space-y-6">
        {QUESTIONS.map((q, idx) => {
          const isSelected = selectedAnswers[q.id] !== undefined;
          const isCorrect = selectedAnswers[q.id] === q.correctIndex;

          return (
            <div
              key={q.id}
              className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-3"
            >
              <div className="flex items-start gap-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-600 dark:text-blue-400 shrink-0">
                  Q{idx + 1}
                </span>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {q.question}
                </p>
              </div>

              <div className="space-y-2 pt-1">
                {q.options.map((option, optIdx) => {
                  const selectedThis = selectedAnswers[q.id] === optIdx;
                  let btnStyle =
                    "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700";

                  if (selectedThis) {
                    btnStyle =
                      "border-blue-500 bg-blue-50/50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 font-semibold";
                  }

                  if (submitted) {
                    if (optIdx === q.correctIndex) {
                      btnStyle =
                        "border-emerald-500 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 font-semibold";
                    } else if (selectedThis && !isCorrect) {
                      btnStyle =
                        "border-red-500 bg-red-500/10 text-red-800 dark:text-red-300";
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={submitted}
                      onClick={() => handleSelect(q.id, optIdx)}
                      className={`w-full text-left p-3 rounded-lg border text-xs transition flex items-center justify-between gap-3 ${btnStyle}`}
                    >
                      <span>{option}</span>
                      {submitted && optIdx === q.correctIndex && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      )}
                      {submitted && selectedThis && !isCorrect && (
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
                  <span className="font-bold">Explanation: </span>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-2">
        <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
          {Object.keys(selectedAnswers).length} of {QUESTIONS.length} answered
        </span>

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
            {score === QUESTIONS.length ? "Mastered! Proceed to Module 3.8" : "Review notes above"}
          </span>
        )}
      </div>
    </div>
  );
}
