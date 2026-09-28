"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { CheckCircle2, XCircle, HelpCircle, Award, RotateCcw } from "lucide-react";

interface Question {
  id: number;
  question: string;
  contextHint?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question:
      "When should an AI system use Parallel Execution instead of Sequential Execution for subtasks?",
    contextHint: "Think about dependency relationships between tasks.",
    options: [
      "When subtasks are independent of each other with no shared state or sequential dependencies.",
      "When each subtask strictly requires the output from the previous subtask to begin.",
      "Only when the task has a single input and needs to minimize concurrent API calls.",
      "When you need strict step-by-step human approval before every single sub-action.",
    ],
    correctIndex: 0,
    explanation:
      "Spot on! Parallel execution is ideal when subtasks have zero dependencies and share no mutable state (e.g. querying 3 independent venue APIs or extracting data from 5 separate PDFs). This cuts total latency from the sum of all tasks to the single slowest task!",
  },
  {
    id: 2,
    question:
      "What is the fundamental difference between Static Decomposition and Dynamic Decomposition?",
    contextHint: "Recall when the execution plan is created.",
    options: [
      "Static decomposition requires a local GPU, while dynamic decomposition only runs in the cloud.",
      "Static decomposition defines all steps upfront before execution, whereas dynamic decomposition allows the plan to emerge and adapt at runtime based on intermediate results.",
      "Static decomposition is for vision models, whereas dynamic is exclusively for text models.",
      "Dynamic decomposition completely removes all tools and memory from the agent architecture.",
    ],
    correctIndex: 1,
    explanation:
      "Exactly right! In static decomposition, the roadmap is hardcoded or planned completely in advance (ideal for well-understood, predictable environments). In dynamic decomposition, the agent evaluates the runtime environment, adapts to intermediate feedback, and replans when roadblocks emerge.",
  },
  {
    id: 3,
    question:
      "Why is 'Over-Decomposing' simple tasks considered a serious anti-pattern in Agentic AI?",
    contextHint: "Think about latency, cost, and failure probability.",
    options: [
      "It causes the LLM to run too quickly and fail to log execution traces.",
      "Breaking a simple task into excessive micro-steps introduces compounding latency, multiplies token costs, and creates unnecessary failure points.",
      "Modern frontier LLMs are incapable of handling more than 2 steps in any program.",
      "It forces the system to delete all intermediate memory buffers.",
    ],
    correctIndex: 1,
    explanation:
      "Brilliant! Breaking a simple task (like 'draft an email') into 12 separate micro-steps adds massive network latency, explodes API costs, and creates 12 distinct points where a tool or model can fail. Modern reasoning models decompose internally during inference—if a model can handle the task reliably in one call, do not force artificial decomposition!",
  },
];

export default function Module1_3Quiz() {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (questionId: number, optionIdx: number) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIdx,
    }));
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const allAnswered = answeredCount === QUESTIONS.length;

  const calculateScore = () => {
    let score = 0;
    QUESTIONS.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score += 1;
      }
    });
    return score;
  };

  const handleSubmit = () => {
    if (!allAnswered) return;
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

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 md:p-8 shadow-2xl">
      {/* Quiz Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400 px-2.5 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/30">
              Module 1.3 Checkpoint
            </span>
            <span className="text-xs font-mono text-slate-500">
              {answeredCount}/{QUESTIONS.length} Answered
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white mt-1">
            Knowledge Check: Task Decomposition &amp; Strategies
          </h3>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Verify your understanding of sequential, parallel, and hierarchical patterns, and how to avoid over-engineering.
          </p>
        </div>

        {submitted && (
          <div className="flex items-center gap-3">
            <div className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
              Score:{" "}
              <strong className={score === QUESTIONS.length ? "text-emerald-400" : "text-amber-400"}>
                {score} / {QUESTIONS.length}
              </strong>
            </div>
            <button
              onClick={handleReset}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
              title="Retake Quiz"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Questions */}
      <div className="space-y-6 mt-6">
        {QUESTIONS.map((q, qIndex) => {
          const selectedOption = selectedAnswers[q.id];
          const isCorrect = selectedOption === q.correctIndex;

          return (
            <div
              key={q.id}
              className={`p-4 md:p-5 rounded-xl border transition-all ${
                submitted
                  ? isCorrect
                    ? "bg-emerald-950/20 border-emerald-500/40"
                    : "bg-red-950/20 border-red-500/40"
                  : "bg-slate-900/40 border-slate-800 hover:border-slate-750"
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-lg bg-slate-800 text-teal-400 font-mono text-xs flex items-center justify-center shrink-0 mt-0.5">
                  Q{qIndex + 1}
                </span>
                <div className="flex-1">
                  <h4 className="text-sm md:text-base font-bold text-white">
                    {q.question}
                  </h4>
                  {q.contextHint && (
                    <p className="text-xs text-slate-400 mt-1 italic flex items-center gap-1">
                      <HelpCircle className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      {q.contextHint}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2 mt-4">
                {q.options.map((opt, optIdx) => {
                  const isThisSelected = selectedOption === optIdx;
                  let optStyle =
                    "bg-slate-950/70 border-slate-800 text-slate-300 hover:bg-slate-900 hover:border-slate-700";

                  if (submitted) {
                    if (optIdx === q.correctIndex) {
                      optStyle = "bg-emerald-950/70 border-emerald-500 text-emerald-200 font-medium";
                    } else if (isThisSelected && !isCorrect) {
                      optStyle = "bg-red-950/70 border-red-500 text-red-200";
                    } else {
                      optStyle = "bg-slate-950/40 border-slate-850 text-slate-500 opacity-60";
                    }
                  } else if (isThisSelected) {
                    optStyle = "bg-teal-500/15 border-teal-500 text-teal-200 font-medium shadow-sm";
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={submitted}
                      onClick={() => handleSelect(q.id, optIdx)}
                      className={`p-3 rounded-lg border text-left text-xs md:text-sm flex items-start gap-2.5 transition-all ${optStyle}`}
                    >
                      <span className="w-5 h-5 rounded-full border border-current shrink-0 flex items-center justify-center text-[10px] font-mono mt-0.5">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="flex-1 leading-snug">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <div
                  className={`mt-4 p-3 rounded-lg text-xs leading-relaxed font-mono flex items-start gap-2 ${
                    isCorrect
                      ? "bg-emerald-950/40 border border-emerald-500/30 text-emerald-300"
                      : "bg-red-950/40 border border-red-500/30 text-red-300"
                  }`}
                >
                  {isCorrect ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <span className="font-bold block mb-1">
                      {isCorrect ? "Correct!" : "Explanation:"}
                    </span>
                    {q.explanation}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!submitted && (
        <div className="mt-6 pt-5 border-t border-slate-800 flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
              allAnswered
                ? "bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-lg shadow-teal-500/20"
                : "bg-slate-800 text-slate-500 cursor-not-allowed"
            }`}
          >
            <Award className="w-4 h-4" />
            Submit Answers ({answeredCount}/{QUESTIONS.length})
          </button>
        </div>
      )}
    </div>
  );
}
