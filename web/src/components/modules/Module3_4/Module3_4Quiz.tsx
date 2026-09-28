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
    question: "How does the Model Context Protocol (MCP) resolve the 'M × N' integration nightmare?",
    options: [
      "By requiring all developers to use only one database brand.",
      "By replacing custom bespoke adapters between M clients and N tools with a single universal open protocol, reducing required connectors to M + N.",
      "By training a new foundation model every time a tool is created.",
      "By banning third-party API keys.",
    ],
    correctIndex: 1,
    explanation:
      "Before MCP, connecting 5 AI apps to 10 tools required 50 unique integrations. With MCP, you build 1 MCP client per app and 1 MCP server per tool (5 + 10 = 15 total).",
  },
  {
    id: 2,
    question: "Why is MCP described as the 'USB-C for AI Applications'?",
    options: [
      "Because MCP only runs on hardware made by Apple.",
      "Because just as USB-C allows any computer to plug into any monitor or hard drive using one standard port, MCP allows any AI host to plug into any data source or tool server via one open standard.",
      "Because MCP requires physical cables plugged into GPU servers.",
      "Because USB-C cables run Python scripts natively.",
    ],
    correctIndex: 1,
    explanation:
      "Universal interoperability: An MCP server written for PostgreSQL can be used interchangeably by Claude Desktop, Cursor, or a custom LangGraph agent without rewriting integration code.",
  },
  {
    id: 3,
    question: "What is the key difference between LLM Tool Calling and MCP?",
    options: [
      "Tool calling is obsolete and replaced by MCP.",
      "Tool calling is the model's cognitive decision to invoke a function; MCP is the open wire protocol (JSON-RPC) that standardizes how tools are discovered, secured, and invoked across process boundaries.",
      "Tool calling only works in JavaScript, while MCP only works in C++.",
      "MCP is proprietary software owned by Google.",
    ],
    correctIndex: 1,
    explanation:
      "Agents still use tool calling under the hood. MCP provides the standardized discovery and execution layer connecting the agent host to the tool server.",
  },
];

export default function Module3_4Quiz() {
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
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Concept Mastery Check
          </span>
          <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
            Module 3.4 • Model Context Protocol (MCP) Quiz
          </h3>
        </div>

        {submitted && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono font-bold">
              <Award className="w-4 h-4 text-emerald-500" />
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
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 shrink-0">
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
                      "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-semibold";
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
            className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-mono text-xs font-bold transition shadow-sm"
          >
            Submit Answers
          </button>
        ) : (
          <span className="text-xs font-mono text-slate-500">
            {score === QUESTIONS.length ? "Mastered! Proceed to Module 3.5" : "Review notes above"}
          </span>
        )}
      </div>
    </div>
  );
}
