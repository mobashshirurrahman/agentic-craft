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
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (questionId: number, optionIndex: number) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

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
    setSubmitted(true);
    const score = calculateScore();
    if (score === QUESTIONS.length) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
        });
      } catch {
        // Confetti fallback
      }
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setSubmitted(false);
  };

  const allAnswered = QUESTIONS.every((q) => selectedAnswers[q.id] !== undefined);
  const score = calculateScore();

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-4 sm:p-6 shadow-sm dark:shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30 text-teal-700 dark:text-teal-400">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Knowledge Check: The Agentic Loop
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Verify your architectural understanding of the 5 phases, observation grounding, and stopping boundaries
            </p>
          </div>
        </div>

        {submitted && (
          <div className="flex items-center gap-2 self-start sm:self-center">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold font-mono ${
                score === QUESTIONS.length
                  ? "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30"
                  : "bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30"
              }`}
            >
              Score: {score} / {QUESTIONS.length}
            </span>
            <button
              onClick={handleReset}
              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition touch-manipulation active:scale-95"
              title="Reset quiz"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {QUESTIONS.map((q, qIndex) => {
          const userAnswer = selectedAnswers[q.id];
          const isAnswered = userAnswer !== undefined;
          const isCorrect = isAnswered && userAnswer === q.correctIndex;

          return (
            <div
              key={q.id}
              className="p-3.5 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 space-y-3"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-mono font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider">
                  Question {qIndex + 1} of {QUESTIONS.length}
                </span>
                <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug">
                  {q.question}
                </h4>
                {q.contextHint && !submitted && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                    Hint: {q.contextHint}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-2 pt-1">
                {q.options.map((opt, optIndex) => {
                  const isSelected = userAnswer === optIndex;
                  let btnStyle =
                    "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 hover:border-slate-300 dark:hover:border-slate-700 text-slate-800 dark:text-slate-200";

                  if (isSelected && !submitted) {
                    btnStyle =
                      "border-teal-600 bg-teal-50 dark:bg-teal-500/15 text-teal-950 dark:text-white font-semibold ring-1 ring-teal-500";
                  }

                  if (submitted) {
                    if (optIndex === q.correctIndex) {
                      btnStyle =
                        "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-950 dark:text-emerald-200 font-semibold";
                    } else if (isSelected && !isCorrect) {
                      btnStyle =
                        "border-rose-400 bg-rose-50 dark:bg-rose-950/30 text-rose-950 dark:text-rose-200";
                    } else {
                      btnStyle = "opacity-40 border-slate-200 dark:border-slate-800";
                    }
                  }

                  return (
                    <button
                      key={optIndex}
                      onClick={() => handleSelect(q.id, optIndex)}
                      disabled={submitted}
                      className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition flex items-start gap-2.5 touch-manipulation active:scale-[0.99] ${btnStyle}`}
                    >
                      <span className="w-5 h-5 rounded-full border border-current shrink-0 flex items-center justify-center text-[10px] font-mono mt-0.5 font-bold">
                        {String.fromCharCode(65 + optIndex)}
                      </span>
                      <span className="leading-relaxed flex-1">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <div
                  className={`p-3 rounded-lg text-xs leading-relaxed ${
                    isCorrect
                      ? "bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-500/30 text-emerald-950 dark:text-emerald-300"
                      : "bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-500/30 text-rose-950 dark:text-rose-300"
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold mb-1">
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>Correct!</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                        <span>Not quite right</span>
                      </>
                    )}
                  </div>
                  <p>{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="text-xs text-slate-500 dark:text-slate-400">
          {!allAnswered
            ? `Answer all ${QUESTIONS.length} questions to check your score.`
            : submitted
            ? score === QUESTIONS.length
              ? "Mastery achieved! You are ready for Module 1.7."
              : "Review the explanations above to solidify your mental model."
            : "All questions answered. Ready to verify!"}
        </span>

        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className={`w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition shadow-sm touch-manipulation active:scale-95 ${
              !allAnswered
                ? "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed"
                : "bg-teal-600 hover:bg-teal-500 text-white shadow-teal-500/20"
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            Check Answers
          </button>
        ) : (
          <button
            onClick={handleReset}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition touch-manipulation active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Retake Quiz
          </button>
        )}
      </div>
    </div>
  );
}
