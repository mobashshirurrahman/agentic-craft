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
      "When should an engineering team choose Prompt Chaining instead of an Autonomous AI Agent?",
    contextHint: "Think about predictability, latency, and cost trade-offs.",
    options: [
      "When the workflow steps are predictable, fixed upfront, and do not require dynamic LLM decision-making.",
      "When the task requires an unpredictable number of loops and arbitrary tool exploration.",
      "Only when you have zero external data and need a one-word answer.",
      "When you want the system to continuously rewrite its own goals indefinitely.",
    ],
    correctIndex: 0,
    explanation:
      "Spot on! If the pipeline steps are known in advance (e.g. Generate Outline ➔ Draft Content ➔ Polish Style), hardcoding a prompt chain gives you maximum speed, lower cost, and zero unpredictability. Always reach for a chain before jumping to an agent!",
  },
  {
    id: 2,
    question:
      "What is the primary mechanism of Chain of Thought (CoT) prompting?",
    contextHint: "Recall how math problems are solved step-by-step.",
    options: [
      "It connects the model to external REST APIs and executes SQL queries.",
      "It induces intermediate step-by-step reasoning tokens before producing the final answer.",
      "It compresses the prompt into an embedding vector to save token costs.",
      "It creates an autonomous background process that runs on the client machine.",
    ],
    correctIndex: 1,
    explanation:
      "Exactly right! Chain of Thought guides the model to 'show its scratch work'. By generating reasoning tokens sequentially, the model's self-attention has access to its own preliminary deductions, dramatically boosting accuracy on logic and multi-step problems.",
  },
  {
    id: 3,
    question:
      "Why is Context Engineering critical for production AI agents?",
    contextHint: "Remember the 5 layers of agent state and tool schemas.",
    options: [
      "It completely eliminates the need to pay for input token fees.",
      "It replaces the LLM reasoning engine with a deterministic regex parser.",
      "Agents make multi-step decisions over time where memory, tool definitions, and runtime state dictate action planning.",
      "It forces the agent to bypass company security constraints and API rate limits.",
    ],
    correctIndex: 2,
    explanation:
      "Brilliant! Unlike one-off prompts, an agent operates across extended loops. Managing what enters the context window—user profile, recent action observations, company rules, and tool descriptions—is what keeps the agent grounded, reliable, and effective.",
  },
];

export default function Module1_2Quiz() {
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
              Interactive Checkpoint
            </span>
            <span className="text-xs font-mono text-slate-500">
              {answeredCount}/{QUESTIONS.length} Answered
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white mt-1">
            Module 1.2 Knowledge Check
          </h3>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Test your understanding of prompts, chains, autonomous agents, and context engineering.
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

      {/* Questions List */}
      <div className="space-y-6 mt-6">
        {QUESTIONS.map((q, qIndex) => {
          const isAnswered = selectedAnswers[q.id] !== undefined;
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
              {/* Question Title */}
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

              {/* Options */}
              <div className="grid grid-cols-1 gap-2 mt-4">
                {q.options.map((opt, optIdx) => {
                  const isThisSelected = selectedOption === optIdx;
                  let optStyle = "bg-slate-950/70 border-slate-800 text-slate-300 hover:bg-slate-900 hover:border-slate-700";

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

              {/* Post-Submit Explanation */}
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

      {/* Submit Button Bar */}
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
