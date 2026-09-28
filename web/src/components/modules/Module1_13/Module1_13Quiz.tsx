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
    question: "Why is Indirect Prompt Injection fundamentally more catastrophic in an AI agent than in a traditional chatbot?",
    options: [
      "Because chatbots have higher API costs than agents.",
      "Because agents have access to tools, databases, and APIs; a hijacked agent can execute destructive real-world actions like exfiltrating keys or altering databases.",
      "Because agents cannot read natural language text from external websites.",
      "Because prompt injections permanently damage the physical GPU hardware in the cloud.",
    ],
    correctIndex: 1,
    explanation:
      "In a chatbot, prompt injection merely alters conversational text output. In an agent, because 'Data is Code', untrusted text scanned from an email or webpage can trick the agent into invoking destructive or privileged tool calls (excessive agency) with real external consequences.",
  },
  {
    id: 2,
    question: "What is the recommended engineering decision hierarchy when evaluating whether to build an autonomous agent for a new task?",
    options: [
      "Always start with a 10-agent autonomous swarm and only simplify if the bill exceeds $10,000.",
      "Start simple first: evaluate direct prompts, RAG lookups, and deterministic prompt chains/workflows before introducing autonomous loops.",
      "Avoid all LLMs and use only regex patterns for all tasks.",
      "Autonomous agents should only be used if the task has exactly two predictable, static steps.",
    ],
    correctIndex: 1,
    explanation:
      "Core Principle #1 is 'Simple Approaches First'. Deterministic workflows are far more predictable, testable, and cheaper. Reserve autonomous agents specifically for open-ended problems where the exact sequence of sub-steps cannot be known in advance.",
  },
  {
    id: 3,
    question: "How should an engineering team protect their system against Excessive Agency when an agent has access to sensitive tools (e.g. database deletes, payments)?",
    options: [
      "Ask the LLM in the system prompt to 'please be careful' and remove all human oversight.",
      "Enforce the Principle of Least Privilege, whitelist permissible parameters, and implement mandatory Human-in-the-Loop (HITL) confirmation gates for destructive actions.",
      "Grant root administrator shell privileges to ensure the agent never gets permission denied errors.",
      "Remove all logging and tracing so errors don't trigger alerts.",
    ],
    correctIndex: 1,
    explanation:
      "Excessive agency is mitigated by least privilege (restricting tools to narrow, read-only scopes by default) and requiring explicit human approval (HITL) before executing irreversible, high-impact mutations.",
  },
];

export default function Module1_13Quiz() {
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
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
      });
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
            Capstone Knowledge Check
          </span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            Core Principles & Agentic Security Architecture
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Validate your mastery of safety, observability, error handling, and the simple-first philosophy.
          </p>
        </div>

        {submitted && (
          <div className="text-right">
            <div className="text-2xl font-black font-mono text-teal-600 dark:text-teal-400">
              {score} / {QUESTIONS.length}
            </div>
            <div className="text-[11px] font-mono text-slate-400">
              {score === QUESTIONS.length ? "Mastery Achieved! 🏆" : "Review Notes Below"}
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
            {score === QUESTIONS.length ? "Congratulations on completing Level 1!" : "Review the lessons and try again."}
          </span>
        )}
      </div>
    </div>
  );
}
