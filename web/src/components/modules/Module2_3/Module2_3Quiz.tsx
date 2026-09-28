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
    question: "Why do AI agent frameworks use standardized tool interfaces (like LangChain's @tool decorator) instead of passing raw functions?",
    options: [
      "To prevent Python from converting the function to assembly code.",
      "To automatically extract name, docstrings, and type hints into a standardized JSON Schema understood by LLM function-calling endpoints.",
      "Because Python functions cannot execute math without decorators.",
      "To bypass API pricing on cloud models.",
    ],
    correctIndex: 1,
    explanation:
      "Standardized tool interfaces generate the exact parameter schema, handle serialization, and bind execution hooks so the model can invoke the function cleanly.",
  },
  {
    id: 2,
    question: "What makes specialized agent search tools (such as Tavily) superior to scraping standard search engines for LLM agents?",
    options: [
      "They return raw unprocessed HTML containing advertising trackers.",
      "They return clean, deduplicated, LLM-optimized text snippets and direct source URLs, fitting context windows efficiently.",
      "They can predict future news events before they occur.",
      "They run entirely locally without requiring internet access.",
    ],
    correctIndex: 1,
    explanation:
      "Tavily is designed specifically for autonomous agents: it strips HTML bloat, handles proxies/captchas, and delivers clean, relevant snippets with accurate source URLs.",
  },
  {
    id: 3,
    question: "According to production tool selection guidelines, how should you introduce tools to a new agent?",
    options: [
      "Bind all 50 enterprise tools simultaneously so the agent can do everything at once.",
      "Start with one tool, test thoroughly, and verify that its utility justifies its latency and API cost before adding more.",
      "Never give an agent any tools; rely strictly on base model hallucinations.",
      "Only provide tools that have no input parameters.",
    ],
    correctIndex: 1,
    explanation:
      "Starting small prevents tool confusion, lowers latency, avoids API rate limit throttling, and makes debugging deterministic.",
  },
];

export default function Module2_3Quiz() {
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
          <span className="text-xs font-mono uppercase tracking-wider text-teal-600 dark:text-teal-400 font-bold flex items-center gap-1.5">
            <Award className="w-4 h-4" />
            Module 2.3 Knowledge Check
          </span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            External Tool Integration & Selection
          </h3>
        </div>

        {submitted && (
          <div className="text-right">
            <div className="text-2xl font-black font-mono text-teal-600 dark:text-teal-400">
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
                <span className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-700 dark:text-teal-300 font-mono text-xs font-bold flex items-center justify-center shrink-0">
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
                      "border-teal-500 bg-teal-500/10 text-teal-950 dark:text-teal-200 ring-1 ring-teal-500/30";
                  }

                  if (submitted) {
                    if (optIdx === q.correctIndex) {
                      optionStyles =
                        "border-teal-500 bg-teal-500/20 text-teal-950 dark:text-teal-200 font-medium";
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
                        <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" />
                      )}
                      {submitted && isThisSelected && !isCorrect && (
                        <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                      )}
                    </button>
                  );
                })}

                {submitted && (
                  <div className="mt-3 p-3 rounded-lg bg-teal-500/10 border border-teal-500/20 text-xs text-slate-700 dark:text-slate-300">
                    <strong className="text-teal-700 dark:text-teal-300 block mb-0.5 font-mono">
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
            className="px-6 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 disabled:opacity-40 text-white font-mono text-xs font-bold transition shadow-sm"
          >
            Submit Answers
          </button>
        ) : (
          <span className="text-xs font-mono text-slate-500">
            {score === QUESTIONS.length ? "Mastered! Proceed to Module 2.4" : "Review notes above"}
          </span>
        )}
      </div>
    </div>
  );
}
