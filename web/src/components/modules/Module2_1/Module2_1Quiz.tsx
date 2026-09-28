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
    question: "What is the primary advantage of using a pre-built agent function (like LangGraph's create_react_agent)?",
    options: [
      "It eliminates the need to pay for LLM token usage.",
      "It automatically constructs the ReAct state machine, message history, and tool dispatch loop with minimal boilerplate.",
      "It permanently hardcodes all tool execution outputs so the model never fails.",
      "It replaces the Python interpreter with a proprietary cloud runtime.",
    ],
    correctIndex: 1,
    explanation:
      "Pre-built agent functions abstract away the state graph, tool invocation nodes, and conditional exit edges, allowing you to prototype an end-to-end ReAct loop in just 4 lines of code.",
  },
  {
    id: 2,
    question: "Why are Python type hints and docstrings critical when defining custom agent tools?",
    options: [
      "Python will refuse to compile without docstrings.",
      "The framework parses docstrings and type hints to automatically generate the JSON Schema that guides the LLM on tool usage.",
      "Docstrings make the model execute 10x faster by bypassing the GPU.",
      "They are only needed if you are running in offline mode.",
    ],
    correctIndex: 1,
    explanation:
      "The LLM never sees your Python function body; it only sees the auto-generated JSON Schema derived from your function name, argument type hints, and docstring explanation.",
  },
  {
    id: 3,
    question: "Why is a low temperature (0.0 to 0.2) strongly advised when configuring models for agentic tool use?",
    options: [
      "To maximize creative storytelling and diverse tool interpretations.",
      "To ensure deterministic, consistent tool parameter formatting and minimize syntax errors.",
      "Because high temperature damages the local CPU cooling system.",
      "Because API providers charge double for temperature values above 0.5.",
    ],
    correctIndex: 1,
    explanation:
      "Tool-calling requires precise, schema-compliant JSON outputs. A low temperature minimizes hallucinated parameters and maximizes adherence to structured tool calling.",
  },
];

export default function Module2_1Quiz() {
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
          <span className="text-xs font-mono uppercase tracking-wider text-sky-600 dark:text-sky-400 font-bold flex items-center gap-1.5">
            <Award className="w-4 h-4" />
            Module 2.1 Knowledge Check
          </span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            Running Pre-Built Agents & Tool Schemas
          </h3>
        </div>

        {submitted && (
          <div className="text-right">
            <div className="text-2xl font-black font-mono text-sky-600 dark:text-sky-400">
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
                <span className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-700 dark:text-sky-300 font-mono text-xs font-bold flex items-center justify-center shrink-0">
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
                      "border-sky-500 bg-sky-500/10 text-sky-950 dark:text-sky-200 ring-1 ring-sky-500/30";
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
                  <div className="mt-3 p-3 rounded-lg bg-sky-500/10 border border-sky-500/20 text-xs text-slate-700 dark:text-slate-300">
                    <strong className="text-sky-700 dark:text-sky-300 block mb-0.5 font-mono">
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
            className="px-6 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:opacity-40 text-white font-mono text-xs font-bold transition shadow-sm"
          >
            Submit Answers
          </button>
        ) : (
          <span className="text-xs font-mono text-slate-500">
            {score === QUESTIONS.length ? "Mastered! Proceed to Module 2.2" : "Review notes above"}
          </span>
        )}
      </div>
    </div>
  );
}
