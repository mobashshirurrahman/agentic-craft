"use client";

import React, { useState } from "react";
import { CheckCircle2, XCircle, HelpCircle, Sparkles, RefreshCw } from "lucide-react";
import confetti from "canvas-confetti";

interface Question {
  id: number;
  question: string;
  category: string;
  options: {
    label: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation: {
    correct: string;
    incorrect: string;
  };
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Is a single LLM API call with a very detailed system prompt considered an AI Agent?",
    category: "System Boundaries",
    options: [
      {
        label: "A",
        text: "Yes, as long as the prompt is long, detailed, and uses few-shot examples.",
        isCorrect: false,
      },
      {
        label: "B",
        text: "No. A single API call is just an LLM call. An agent requires autonomy, decision-making, and an iterative feedback loop with tools.",
        isCorrect: true,
      },
      {
        label: "C",
        text: "Yes, but only if you use a top-tier model like GPT-4 or Claude 3.5.",
        isCorrect: false,
      },
      {
        label: "D",
        text: "Only if the output format is strictly structured as JSON.",
        isCorrect: false,
      },
    ],
    explanation: {
      correct:
        "Spot on! Just writing an elaborate prompt does not make something an agent. An agent must possess an autonomous loop, the ability to take actions through tools, and iterate based on environmental feedback.",
      incorrect:
        "Take another look! Writing a long, clever prompt is simply prompt engineering. For an application to be truly agentic, it must make autonomous decisions, invoke tools, and adapt based on observations.",
    },
  },
  {
    id: 2,
    question: "What is the primary role of the Reasoning Engine in an agent architecture?",
    category: "Core Reasoning",
    options: [
      {
        label: "A",
        text: "To execute database queries directly without needing external functions.",
        isCorrect: false,
      },
      {
        label: "B",
        text: "To act as the 'brain' that understands goals, synthesizes context, formulates plans, and selects appropriate tools.",
        isCorrect: true,
      },
      {
        label: "C",
        text: "To provide persistent disk storage for multi-turn chat history.",
        isCorrect: false,
      },
      {
        label: "D",
        text: "To eliminate the need for error handling in production code.",
        isCorrect: false,
      },
    ],
    explanation: {
      correct:
        "Exactly right! The reasoning engine (the LLM) serves as the cognitive center—interpreting user intent, evaluating trade-offs, synthesizing context, and deciding which actions to take.",
      incorrect:
        "Not quite! The reasoning engine doesn't execute database queries or act as storage—those belong to Tools and Memory. The LLM acts strictly as the cognitive planner and decision-maker.",
    },
  },
  {
    id: 3,
    question: "What fundamental characteristic of LLMs makes external Tools essential for agents?",
    category: "LLM Capabilities & Tools",
    options: [
      {
        label: "A",
        text: "LLMs can only understand English and fail completely on other languages.",
        isCorrect: false,
      },
      {
        label: "B",
        text: "LLMs are statistical pattern recognizers predicting next tokens, not real-time calculators or live database search engines.",
        isCorrect: true,
      },
      {
        label: "C",
        text: "LLMs cannot generate valid Python code syntax.",
        isCorrect: false,
      },
      {
        label: "D",
        text: "LLMs can only be run once per day due to compute constraints.",
        isCorrect: false,
      },
    ],
    explanation: {
      correct:
        "Brilliant! LLMs generate text based on learned statistical patterns. To access live data, perform verified math, or interact with external services, they must be paired with external tools like APIs and databases.",
      incorrect:
        "Not quite! LLMs are remarkable at language, but they are statistical token predictors. They don't have built-in calculators or live internet access without external tools!",
    },
  },
];

export default function Module1_1Quiz() {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (questionId: number, label: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: label,
    }));
  };

  const calculateScore = () => {
    let score = 0;
    QUESTIONS.forEach((q) => {
      const correctOpt = q.options.find((o) => o.isCorrect);
      if (selectedAnswers[q.id] === correctOpt?.label) {
        score += 1;
      }
    });
    return score;
  };

  const handleCheckAnswers = () => {
    setShowResults(true);
    const score = calculateScore();
    if (score === QUESTIONS.length) {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
      });
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  const isAllAnswered = Object.keys(selectedAnswers).length === QUESTIONS.length;
  const score = calculateScore();

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 md:p-8 space-y-6 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-850">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400">
            Interactive Concept Check
          </span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            Test Your Understanding
          </h3>
        </div>

        {showResults && (
          <div className="flex items-center gap-3">
            <span
              className={`font-mono text-xs font-bold px-3 py-1 rounded-full border ${
                score === QUESTIONS.length
                  ? "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-500/40"
                  : "bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-500/40"
              }`}
            >
              Score: {score}/{QUESTIONS.length}
            </span>
            <button
              onClick={handleReset}
              className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition"
              title="Retake Quiz"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Questions list */}
      <div className="space-y-6">
        {QUESTIONS.map((q, idx) => {
          const userAnswer = selectedAnswers[q.id];
          const isCorrect =
            showResults &&
            userAnswer === q.options.find((o) => o.isCorrect)?.label;

          return (
            <div
              key={q.id}
              className="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-855 space-y-3"
            >
              <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                <span>Question {idx + 1} of {QUESTIONS.length}</span>
                <span className="text-slate-600 dark:text-slate-400">{q.category}</span>
              </div>

              <h4 className="text-sm md:text-base font-semibold text-slate-900 dark:text-white">
                {q.question}
              </h4>

              {/* Options */}
              <div className="grid grid-cols-1 gap-2 pt-1">
                {q.options.map((opt) => {
                  const isSelected = userAnswer === opt.label;
                  let optionClass =
                    "bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100/60 dark:hover:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700";

                  if (showResults) {
                    if (opt.isCorrect) {
                      optionClass =
                        "bg-emerald-50 dark:bg-emerald-500/15 border-emerald-500 text-emerald-950 dark:text-emerald-200 font-medium";
                    } else if (isSelected && !opt.isCorrect) {
                      optionClass =
                        "bg-red-50 dark:bg-red-500/15 border-red-500 text-red-950 dark:text-red-300";
                    }
                  } else if (isSelected) {
                    optionClass =
                      "bg-teal-50 dark:bg-teal-500/20 border-teal-500 text-teal-950 dark:text-teal-200 font-medium";
                  }

                  return (
                    <button
                      key={opt.label}
                      disabled={showResults}
                      onClick={() => handleSelect(q.id, opt.label)}
                      className={`w-full text-left p-3 rounded-xl border text-xs md:text-sm flex items-start gap-3 transition-all ${optionClass}`}
                    >
                      <span className="w-5 h-5 rounded-md bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center font-mono text-xs shrink-0 font-bold text-slate-700 dark:text-slate-300">
                        {opt.label}
                      </span>
                      <span className="leading-snug">{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tutor explanation upon check */}
              {showResults && (
                <div
                  className={`p-3 rounded-xl border text-xs leading-relaxed mt-2 ${
                    isCorrect
                      ? "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-300 dark:border-emerald-500/30 text-emerald-900 dark:text-emerald-200"
                      : "bg-amber-50 dark:bg-amber-500/10 border-amber-300 dark:border-amber-500/30 text-amber-900 dark:text-amber-200"
                  }`}
                >
                  <strong className="block font-mono uppercase text-[11px] mb-1">
                    {isCorrect ? "💡 Tutor Feedback:" : "⚠️ Helpful Insight:"}
                  </strong>
                  {isCorrect ? q.explanation.correct : q.explanation.incorrect}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit Button */}
      {!showResults && (
        <div className="pt-2">
          <button
            disabled={!isAllAnswered}
            onClick={handleCheckAnswers}
            className={`w-full py-3 rounded-xl font-bold text-sm tracking-wide transition flex items-center justify-center gap-2 ${
              isAllAnswered
                ? "bg-teal-600 hover:bg-teal-500 text-white shadow-md shadow-teal-600/20 cursor-pointer"
                : "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Check My Answers ({Object.keys(selectedAnswers).length}/{QUESTIONS.length})</span>
          </button>
        </div>
      )}
    </div>
  );
}
