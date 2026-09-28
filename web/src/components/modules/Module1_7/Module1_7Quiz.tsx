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
      "Why does the ReAct framework achieve a substantially lower hallucination rate than standard Chain-of-Thought (e.g. 6% vs 14% on HotpotQA)?",
    contextHint: "Recall how Thought and Action interplay with real-world observations.",
    options: [
      "Because ReAct increases the context window size of the GPU cluster.",
      "Because ReAct anchors its reasoning in external tool observations at each step, preventing the model from hallucinating ungrounded facts.",
      "Because ReAct compiles all natural language prompts into binary C++ executables.",
      "Because ReAct disables the model's ability to call external APIs.",
    ],
    correctIndex: 1,
    explanation:
      "Spot on! Standard Chain-of-Thought (CoT) relies purely on frozen internal weights, often hallucinating when missing facts. ReAct (Yao et al., 2023) alternates between Thought, Action, and Observation—grounding its reasoning trajectory in verified real-world tool responses!",
  },
  {
    id: 2,
    question:
      "In the Reflection design pattern, what is the core architectural mechanism used to elevate output quality?",
    contextHint: "Think about the Actor-Critic dual-node setup.",
    options: [
      "Compressing all system prompts into binary vectors.",
      "A dual-node workflow where an Actor produces an initial output, an independent Critic evaluates it against strict rubrics, and the Actor refines it based on feedback.",
      "Running 100 identical prompts simultaneously and choosing the shortest answer.",
      "Automatically deleting any code that fails on the first run.",
    ],
    correctIndex: 1,
    explanation:
      "Exactly right! Reflection decouples generation from critique. Just as an author benefits from an editor, an Actor node drafts a solution, an Evaluator/Critic critiques it for security, logic, or syntax bugs, and the Actor iteratively self-corrects until quality thresholds are satisfied.",
  },
  {
    id: 3,
    question:
      "What distinct operational superpower does the 'Time Travel' pattern unlock in persistent agent workflows (such as LangGraph)?",
    contextHint: "Consider debugging or editing past state checkpoints.",
    options: [
      "It allows the model to predict next week's stock prices with 100% certainty.",
      "It enables human operators to rewind to any past persistent checkpoint, modify state variables or tool arguments, and resume or fork execution from that point.",
      "It speeds up GPU inference by running the clock backwards.",
      "It automatically converts all SQLite databases into vector stores.",
    ],
    correctIndex: 1,
    explanation:
      "Brilliant! Because modern graph frameworks like LangGraph save state checkpoints at every step, humans can 'Time Travel' back to any previous node, inspect variables, alter a flawed draft or parameter, and resume execution without having to re-run the entire expensive workflow from step one!",
  },
];

export default function Module1_7Quiz() {
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
              Concept Check: Common Agentic Design Patterns
            </h3>
            <p className="text-xs md:text-sm text-slate-400 dark:text-slate-400 light:text-slate-600">
              Test your understanding of ReAct grounding, Reflection loops, and Human-in-the-Loop time travel.
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
