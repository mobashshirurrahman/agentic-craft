"use client";
import React, { useState } from "react";
import confetti from "canvas-confetti";
import { CheckCircle2, XCircle, Award, RotateCcw } from "lucide-react";

const QUESTIONS = [
  {
    id: 1,
    question: "Why do state-of-the-art autonomous coding agents (like Claude Code, Devin, and LangGraph Deep Agents) divide work into specialized sub-agents rather than giving 100 tools to a single monolithic prompt?",
    options: [
      "Modern LLMs cannot process more than 2 tools at a time.",
      "Tool confusion and Context Window pollution: when a single agent has 100 tools and sees every file in a 500,000-line codebase, its reasoning degrades rapidly ('Lost in the Middle'). Isolating sub-agents gives each role clean context and 3-5 laser-focused tools.",
      "Sub-agents use different programming languages.",
      "Monolithic agents are illegal under open-source licenses.",
    ],
    correctIndex: 1,
    explanation: "Research across SWE-bench and enterprise coding agents shows that giving an agent dozens of irrelevant tools causes high hallucination rates and tool selection errors. Deep agents separate Planning (Supervisor) from Execution (Sub-Agents), providing each sub-agent with its own clean context window and a minimal, tailored toolset.",
  },
  {
    id: 2,
    question: "What is the difference between 'Functional Specialization' and 'Domain Specialization' in deep agent architectures?",
    options: [
      "Functional specialization divides agents by task step (Researcher -> Architect -> Coder -> Tester), whereas Domain specialization divides them by business area (Payments Agent, Inventory Agent, Shipping Agent).",
      "Functional agents are written in Python while Domain agents are written in JavaScript.",
      "They are identical terms for the same concept.",
      "Functional specialization only works in military applications.",
    ],
    correctIndex: 0,
    explanation: "Functional specialization decomposes an epic problem into procedural phases (e.g. Code Archaeologist -> Code Architect -> Synthesizer -> QA Auditor), while Domain specialization organizes agents around distinct business or microservice bounded contexts (e.g. Billing, Identity, Recommendations).",
  },
  {
    id: 3,
    question: "In a production Supervisor-Worker Deep Agent pattern, what should the Supervisor agent NEVER do?",
    options: [
      "Decompose user goals into sub-tasks.",
      "Directly execute low-level file edits and shell commands itself — the Supervisor must remain a high-level orchestrator that plans, delegates to workers, and synthesizes final verification.",
      "Synthesize answers from sub-agents.",
      "Evaluate whether the final objective was accomplished.",
    ],
    correctIndex: 1,
    explanation: "A cardinal rule of deep agent architectures is the strict separation between Planning and Execution. If the Supervisor starts running low-level file edits and bash commands, its context window becomes polluted with raw terminal outputs and file diffs, destroying its ability to maintain high-level strategic reasoning.",
  },
];

export default function Module4_17Quiz() {
  const [selected, setSelected] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const score = QUESTIONS.filter((q) => selected[q.id] === q.correctIndex).length;

  const handleSubmit = () => {
    setSubmitted(true);
    if (score === QUESTIONS.length) {
      confetti({ particleCount: 80, spread: 80, origin: { y: 0.75 } });
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm p-6 md:p-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
            Final Capstone Mastery Check
          </span>
          <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
            Module 4.17 • Deep Agents Architecture Quiz
          </h3>
        </div>
        {submitted && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border text-xs font-mono font-bold">
              <Award className="w-4 h-4 text-teal-500" />
              {score} / {QUESTIONS.length}
            </div>
            <button
              onClick={() => {
                setSelected({});
                setSubmitted(false);
              }}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-mono transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Retry
            </button>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {QUESTIONS.map((q, idx) => {
          const isCorrect = selected[q.id] === q.correctIndex;
          return (
            <div
              key={q.id}
              className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-3"
            >
              <div className="flex items-start gap-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-teal-500/20 text-teal-600 dark:text-teal-400 shrink-0">
                  Q{idx + 1}
                </span>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {q.question}
                </p>
              </div>

              <div className="space-y-2">
                {q.options.map((opt, optIdx) => {
                  const sel = selected[q.id] === optIdx;
                  let style =
                    "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300";
                  if (sel) {
                    style =
                      "border-teal-500 bg-teal-50/50 dark:bg-teal-950/40 text-teal-900 dark:text-teal-200 font-semibold";
                  }
                  if (submitted) {
                    if (optIdx === q.correctIndex) {
                      style =
                        "border-emerald-500 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 font-semibold";
                    } else if (sel && !isCorrect) {
                      style =
                        "border-red-500 bg-red-500/10 text-red-800 dark:text-red-300";
                    }
                  }
                  return (
                    <button
                      key={optIdx}
                      disabled={submitted}
                      onClick={() =>
                        !submitted &&
                        setSelected((p) => ({ ...p, [q.id]: optIdx }))
                      }
                      className={`w-full text-left p-3 rounded-lg border text-xs transition flex items-center justify-between gap-3 ${style}`}
                    >
                      <span>{opt}</span>
                      {submitted && optIdx === q.correctIndex && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      )}
                      {submitted && sel && !isCorrect && (
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
                  <span className="font-bold">Why: </span>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={Object.keys(selected).length < QUESTIONS.length}
          className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-semibold text-xs tracking-wider uppercase transition shadow-sm"
        >
          Submit Answers
        </button>
      )}
    </div>
  );
}
