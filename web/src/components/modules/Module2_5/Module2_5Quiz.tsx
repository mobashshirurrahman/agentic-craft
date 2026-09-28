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
    question: "Stripped of all framework abstractions, what is an AI Agent class in pure Python?",
    options: [
      "A neural network trained locally using PyTorch tensors.",
      "A class that stores message history (`self.messages`), prompts an LLM, parses action strings, and executes callables from an actions dictionary.",
      "A compiled binary driver that communicates with GPU registers.",
      "An automated bot that only sends HTTP POST requests to webhooks.",
    ],
    correctIndex: 1,
    explanation:
      "All agent frameworks (LangGraph, CrewAI, AutoGen) are built upon this exact fundamental pattern: a message list, an LLM call, an action parser, and a dictionary of callable Python functions.",
  },
  {
    id: 2,
    question: "Why does the raw ReAct system prompt instruct the LLM to output 'PAUSE' after an Action?",
    options: [
      "Because the LLM needs to cool down its internal transistors.",
      "To signal to the Python script that the model has finished deciding its action, so the script can execute the tool and return the observation.",
      "Because PAUSE is a reserved keyword in the Python language.",
      "To allow the user to type in a secondary password.",
    ],
    correctIndex: 1,
    explanation:
      "Without 'PAUSE' or stop tokens, the LLM would hallucinate a fake observation itself instead of waiting for the real Python tool execution.",
  },
  {
    id: 3,
    question: "Why is implementing a single-turn agent (without loops) an essential milestone before adding while-loops?",
    options: [
      "Because Python while-loops are deprecated in modern programming.",
      "Because it isolates the exact Thought ➔ Action ➔ Observation hand-off mechanics before introducing cycle control, retry policies, and infinite loop guards.",
      "Because single-turn agents can solve all enterprise problems without iteration.",
      "Because LLMs can only run once per computer reboot.",
    ],
    correctIndex: 1,
    explanation:
      "Mastering the single-turn hand-off ensures that tool dispatching and observation grounding are rock solid before adding loop iteration and termination logic.",
  },
];

export default function Module2_5Quiz() {
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
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5">
            <Award className="w-4 h-4" />
            Module 2.5 Knowledge Check
          </span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            Pure Python Agent Class Mechanics
          </h3>
        </div>

        {submitted && (
          <div className="text-right">
            <div className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400">
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
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-mono text-xs font-bold flex items-center justify-center shrink-0">
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
                      "border-emerald-500 bg-emerald-500/10 text-emerald-950 dark:text-emerald-200 ring-1 ring-emerald-500/30";
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
                  <div className="mt-3 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-slate-700 dark:text-slate-300">
                    <strong className="text-emerald-700 dark:text-emerald-300 block mb-0.5 font-mono">
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
            className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-mono text-xs font-bold transition shadow-sm"
          >
            Submit Answers
          </button>
        ) : (
          <span className="text-xs font-mono text-slate-500">
            {score === QUESTIONS.length ? "Mastered! You understand raw agent Python" : "Review notes above"}
          </span>
        )}
      </div>
    </div>
  );
}
