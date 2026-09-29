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
      "According to recent agent benchmarks (Masterman et al., 2024), what is a major engineering limitation of forcing a Single-Agent architecture on large systems?",
    contextHint: "Think about tool catalogs and model context confusion.",
    options: [
      "Single agents cannot execute Python code under any circumstances.",
      "Model accuracy degrades sharply and parameter misfires rise when a single agent is overloaded with more than 15 to 20 tools at once.",
      "Single agents automatically consume 100x more electricity per token.",
      "Single agents are unable to run on cloud servers.",
    ],
    correctIndex: 1,
    explanation:
      "Spot on! When you give an LLM 30 or 50 tool schemas simultaneously, the model experiences cognitive tool confusion—often calling the wrong tool or hallucinating parameter names. Multi-agent systems resolve this by granting each specialized subagent a lean, focused toolset of 3-5 tools!",
  },
  {
    id: 2,
    question:
      "In Claude Code's Hierarchical Supervisor architecture, what key constraint prevents runaway costs and context pollution?",
    contextHint: "Recall how subagents communicate their findings back to the orchestrator.",
    options: [
      "Subagents are forced to shut down after 5 seconds.",
      "Subagents work in isolated context windows, cannot spawn further subagents (shallow hierarchy), and return only verified conclusions while discarding noisy exploration traces.",
      "Subagents can only communicate using binary Morse code.",
      "The supervisor deletes the user's repository if an error occurs.",
    ],
    correctIndex: 1,
    explanation:
      "Exactly right! Claude Code implements a disciplined 'shallow hierarchy': the supervisor spawns subagents (Explore, Plan, Execute) in clean isolated sandboxes. When an explore agent greps 100 files, all that noisy intermediate terminal output is discarded—only the concise conclusion is returned to the main supervisor context!",
  },
  {
    id: 3,
    question:
      "What is the Golden Architectural Rule when deciding between a Single-Agent and Multi-Agent design?",
    contextHint: "Think about simplicity, premature optimization, and coordination overhead.",
    options: [
      "Never build single agents; all modern applications require at least 10 communicating agents.",
      "Start with a single well-designed agent! Only split into multiple agents when you hit hard boundaries: tool catalog overload (>20 tools), context overflow, or strict need for concurrent parallelism.",
      "Always use peer-to-peer network handoffs with no supervision.",
      "Multi-agent architectures should only be deployed on mobile devices.",
    ],
    correctIndex: 1,
    explanation:
      "Brilliant! Multi-agent systems look cool in whiteboard diagrams, but in production they introduce inter-agent latency, cascading points of failure, and coordination complexity. The golden engineering rule is: Start simple with a single agent, and only partition into a multi-agent team when clear bottlenecks demand it!",
  },
];

export default function Module1_9Quiz() {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleSelect = (questionId: number, optionIndex: number) => {
    if (showResults) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleCheckAnswers = () => {
    setShowResults(true);
    let score = 0;
    QUESTIONS.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score++;
      }
    });

    if (score === QUESTIONS.length) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  const allAnswered = QUESTIONS.every((q) => selectedAnswers[q.id] !== undefined);
  const correctCount = QUESTIONS.filter(
    (q) => selectedAnswers[q.id] === q.correctIndex
  ).length;

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 md:p-8 shadow-sm my-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-500/20 border border-teal-200 dark:border-teal-500/40 flex items-center justify-center text-teal-600 dark:text-teal-400">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
              Concept Check: Single-Agent vs. Multi-Agent Architectures
            </h3>
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400">
              Validate your grasp of tool thresholds, multi-agent topologies, and the golden simplicity rule.
            </p>
          </div>
        </div>

        {showResults && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30 text-teal-800 dark:text-teal-300 font-mono text-xs font-bold">
            <Award className="w-4 h-4" />
            <span>
              Score: {correctCount} / {QUESTIONS.length} (
              {Math.round((correctCount / QUESTIONS.length) * 100)}%)
            </span>
          </div>
        )}
      </div>

      {/* Questions */}
      <div className="space-y-6 mt-6">
        {QUESTIONS.map((q, index) => {
          const selected = selectedAnswers[q.id];
          const isCorrect = selected === q.correctIndex;

          return (
            <div
              key={q.id}
              className={`p-4 md:p-5 rounded-xl border transition-all ${
                showResults
                  ? isCorrect
                    ? "border-emerald-300 dark:border-emerald-500/50 bg-emerald-50/50 dark:bg-emerald-500/5"
                    : "border-rose-300 dark:border-rose-500/50 bg-rose-50/50 dark:bg-rose-500/5"
                  : "border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <span className="text-xs font-mono font-bold text-teal-700 dark:text-teal-400 px-2 py-0.5 rounded bg-teal-100 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/20 flex-shrink-0">
                  Question {index + 1}
                </span>
                {q.contextHint && !showResults && (
                  <span className="text-[11px] text-slate-500 italic">
                    💡 {q.contextHint}
                  </span>
                )}
              </div>

              <h4 className="text-sm md:text-base font-semibold text-slate-900 dark:text-slate-200 mt-2 mb-3">
                {q.question}
              </h4>

              <div className="space-y-2">
                {q.options.map((option, optIdx) => {
                  const isSelected = selected === optIdx;
                  let optionStyles =
                    "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-slate-800 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700";

                  if (showResults) {
                    if (optIdx === q.correctIndex) {
                      optionStyles =
                        "border-emerald-500 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-950 dark:text-emerald-200 font-semibold";
                    } else if (isSelected && !isCorrect) {
                      optionStyles =
                        "border-rose-500 bg-rose-100 dark:bg-rose-500/20 text-rose-950 dark:text-rose-200";
                    } else {
                      optionStyles = "opacity-50 border-slate-200 dark:border-slate-800 text-slate-500";
                    }
                  } else if (isSelected) {
                    optionStyles =
                      "border-teal-500 bg-teal-50 dark:bg-teal-500/15 text-teal-900 dark:text-teal-200 font-semibold shadow-sm";
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelect(q.id, optIdx)}
                      disabled={showResults}
                      className={`w-full text-left p-3 rounded-lg border text-xs md:text-sm flex items-start gap-3 transition-all cursor-pointer ${optionStyles}`}
                    >
                      <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] font-mono flex-shrink-0 mt-0.5">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="flex-1 leading-relaxed">{option}</span>
                      {showResults && optIdx === q.correctIndex && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                      )}
                      {showResults && isSelected && !isCorrect && (
                        <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>

              {showResults && (
                <div
                  className={`mt-4 p-3.5 rounded-lg border text-xs leading-relaxed ${
                    isCorrect
                      ? "border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-900 dark:text-emerald-300"
                      : "border-rose-200 dark:border-rose-500/30 bg-rose-50 dark:bg-rose-500/10 text-rose-900 dark:text-rose-300"
                  }`}
                >
                  <strong className="block mb-1">
                    {isCorrect ? "✅ Spot on!" : "❌ Let's review:"}
                  </strong>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="flex flex-wrap items-center justify-between gap-4 mt-8 pt-5 border-t border-slate-200 dark:border-slate-800">
        <p className="text-xs text-slate-600 dark:text-slate-400">
          {!showResults
            ? allAnswered
              ? "All questions answered! Click below to evaluate."
              : `Answer all 3 questions to unlock results.`
            : `Review the tutor explanations above to solidify your mental model.`}
        </p>

        <div className="flex items-center gap-3">
          {showResults ? (
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry Quiz</span>
            </button>
          ) : (
            <button
              onClick={handleCheckAnswers}
              disabled={!allAnswered}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-500 text-white shadow-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Check My Answers</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
