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
      "What is the canonical 5-phase operational sequence that powers an autonomous Agentic Loop?",
    contextHint: "Think about the cycle from input ingestion to final termination.",
    options: [
      "Prompt ➔ Fine-tune ➔ Deploy ➔ Monitor ➔ Archive",
      "Perceive ➔ Reason ➔ Act ➔ Observe ➔ Iterate",
      "Compile ➔ Execute ➔ Benchmark ➔ Minify ➔ Distribute",
      "Embed ➔ Cluster ➔ Vectorize ➔ Re-rank ➔ Cache",
    ],
    correctIndex: 1,
    explanation:
      "Spot on! The Agentic Loop follows a disciplined 5-phase cycle: (1) Perceive the context & history, (2) Reason about goals and missing information, (3) Act by invoking a tool or updating state, (4) Observe external results and feedback, and (5) Iterate to evaluate whether the task is complete or requires another cycle!",
  },
  {
    id: 2,
    question:
      "Why is the 'Observation' phase strictly essential before an agent initiates its next reasoning cycle?",
    contextHint: "Consider what happens if an API call fails or returns unexpected data.",
    options: [
      "Observation is solely used to format CSS styles for the web frontend.",
      "The agent must inspect real-world feedback (tool outputs, error messages, state changes) to ground its next reasoning step, rather than blindly hallucinating that its action succeeded.",
      "Observation is only needed when using local open-source models, not commercial APIs.",
      "Because Python functions cannot return values without an observation decorator.",
    ],
    correctIndex: 1,
    explanation:
      "Exactly right! Without observation, an agent is operating blindfolded. Grounding the agent in real tool outputs, database return values, and error traces allows it to verify task progress, ingest new discoveries, or self-correct if a tool threw an exception.",
  },
  {
    id: 3,
    question:
      "What catastrophic risk occurs if an Agentic Loop is deployed without explicit termination conditions (like `max_iterations`)?",
    contextHint: "Think about loop drift, ambiguous prompts, and API bills.",
    options: [
      "The LLM will automatically delete its own training weights.",
      "The agent can get trapped in an Infinite Loop—repeatedly calling tools or retrying failed actions, which drains API budgets, creates latency lockouts, and degrades reliability.",
      "The operating system will revoke the server's SSL certificates.",
      "The agent will automatically switch to a lower context window model.",
    ],
    correctIndex: 1,
    explanation:
      "Brilliant! Infinite loops and loop drift are among the most dangerous failure modes in agentic engineering. Without a hard `max_iterations` cap and explicit completion checks, an agent encountering repetitive errors or vague instructions will loop endlessly, burning thousands of dollars in API tokens in minutes!",
  },
];

export default function Module1_6Quiz() {
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
    <div className="rounded-2xl border border-slate-700/60 dark:border-slate-700/60 light:border-slate-300 bg-slate-900/90 dark:bg-slate-900/90 light:bg-white p-5 md:p-8 shadow-xl my-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800 dark:border-slate-800 light:border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-bold text-white dark:text-white light:text-slate-900">
              Concept Check: Fundamentals of the Agentic Loop
            </h3>
            <p className="text-xs md:text-sm text-slate-400 dark:text-slate-400 light:text-slate-600">
              Validate your grasp of the 5 phases, observation grounding, and safety loop guardrails.
            </p>
          </div>
        </div>

        {showResults && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-300 font-mono text-xs font-bold">
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
                    ? "border-emerald-500/50 bg-emerald-500/5"
                    : "border-rose-500/50 bg-rose-500/5"
                  : "border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-950/40 dark:bg-slate-950/40 light:bg-slate-50"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <span className="text-xs font-mono font-bold text-teal-400 px-2 py-0.5 rounded bg-teal-500/10 border border-teal-500/20 flex-shrink-0">
                  Question {index + 1}
                </span>
                {q.contextHint && !showResults && (
                  <span className="text-[11px] text-slate-500 italic">
                    💡 {q.contextHint}
                  </span>
                )}
              </div>

              <h4 className="text-sm md:text-base font-semibold text-slate-200 dark:text-slate-200 light:text-slate-900 mt-2 mb-3">
                {q.question}
              </h4>

              <div className="space-y-2">
                {q.options.map((option, optIdx) => {
                  const isSelected = selected === optIdx;
                  let optionStyles =
                    "border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-900/60 dark:bg-slate-900/60 light:bg-white text-slate-300 dark:text-slate-300 light:text-slate-700 hover:border-slate-700 dark:hover:border-slate-700 light:hover:border-slate-300";

                  if (showResults) {
                    if (optIdx === q.correctIndex) {
                      optionStyles =
                        "border-emerald-500 bg-emerald-500/20 text-emerald-200 font-semibold";
                    } else if (isSelected && !isCorrect) {
                      optionStyles =
                        "border-rose-500 bg-rose-500/20 text-rose-200";
                    } else {
                      optionStyles = "opacity-50 border-slate-800 text-slate-500";
                    }
                  } else if (isSelected) {
                    optionStyles =
                      "border-teal-500 bg-teal-500/15 text-teal-200 font-semibold shadow-sm";
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelect(q.id, optIdx)}
                      disabled={showResults}
                      className={`w-full text-left p-3 rounded-lg border text-xs md:text-sm flex items-start gap-3 transition-all ${optionStyles}`}
                    >
                      <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] font-mono flex-shrink-0 mt-0.5">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="flex-1 leading-relaxed">{option}</span>
                      {showResults && optIdx === q.correctIndex && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      )}
                      {showResults && isSelected && !isCorrect && (
                        <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>

              {showResults && (
                <div
                  className={`mt-4 p-3.5 rounded-lg border text-xs leading-relaxed ${
                    isCorrect
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300 dark:text-emerald-300 light:text-emerald-800"
                      : "border-rose-500/30 bg-rose-500/10 text-rose-300 dark:text-rose-300 light:text-rose-800"
                  }`}
                >
                  <strong className="block mb-1">
                    {isCorrect ? "✅ Excellent reasoning!" : "❌ Let's review:"}
                  </strong>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="flex flex-wrap items-center justify-between gap-4 mt-8 pt-5 border-t border-slate-800 dark:border-slate-800 light:border-slate-200">
        <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600">
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
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border border-slate-700 dark:border-slate-700 light:border-slate-300 text-slate-300 dark:text-slate-300 light:text-slate-700 hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-slate-100 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry Quiz</span>
            </button>
          ) : (
            <button
              onClick={handleCheckAnswers}
              disabled={!allAnswered}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-teal-400 hover:bg-teal-300 text-slate-950 shadow-md transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
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
