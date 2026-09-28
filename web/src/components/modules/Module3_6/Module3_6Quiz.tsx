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
    question: "How does the Plan-and-Execute pattern fundamentally differ from the ReAct pattern?",
    options: [
      "ReAct requires internet access, while Plan-and-Execute runs entirely offline.",
      "ReAct decides actions one-by-one reactively; Plan-and-Execute builds an explicit multi-step roadmap upfront, executes each task, and updates the plan dynamically.",
      "Plan-and-Execute uses Python, while ReAct uses C++.",
      "ReAct can only execute 1 tool in its entire lifetime.",
    ],
    correctIndex: 1,
    explanation:
      "By separating the planner (architect) from the executor (worker), the agent maintains a clear high-level goal and avoids losing its train of thought.",
  },
  {
    id: 2,
    question: "What is the primary role of the Replanner Node in a LangGraph state graph?",
    options: [
      "To restart the computer whenever an error happens.",
      "To inspect the latest tool observation, prune finished tasks, re-order remaining steps, and decide whether the goal is completed or needs a new sub-plan.",
      "To convert Python strings into JSON objects.",
      "To delete all checkpoints from the database.",
    ],
    correctIndex: 1,
    explanation:
      "The replanner keeps the agent adaptive: if step 2 reveals unexpected data, the replanner alters steps 3 and 4 rather than mindlessly sticking to an outdated plan.",
  },
  {
    id: 3,
    question: "For which use case is Plan-and-Execute clearly superior to a simple ReAct agent?",
    options: [
      "Answering 'What is the current temperature in Paris?'.",
      "Multi-step, long-horizon objectives (e.g. competitor research, generating a 10-page market report, refactoring a multi-file repository) where reactive agents easily drift.",
      "Converting a single word into uppercase.",
      "Generating a random number between 1 and 10.",
    ],
    correctIndex: 1,
    explanation:
      "ReAct agents often get lost in rabbit holes on complex tasks. An explicit roadmap keeps execution structured and prevents looping.",
  },
];

export default function Module3_6Quiz() {
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
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Concept Mastery Check
          </span>
          <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
            Module 3.6 • Plan-and-Execute Systems Quiz
          </h3>
        </div>

        {submitted && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono font-bold">
              <Award className="w-4 h-4 text-indigo-500" />
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
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 shrink-0">
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
                      "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200 font-semibold";
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
            className="px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-mono text-xs font-bold transition shadow-sm"
          >
            Submit Answers
          </button>
        ) : (
          <span className="text-xs font-mono text-slate-500">
            {score === QUESTIONS.length ? "Mastered! Proceed to Module 3.7" : "Review notes above"}
          </span>
        )}
      </div>
    </div>
  );
}
