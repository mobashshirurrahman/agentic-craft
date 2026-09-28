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
      "According to AI system architecture principles, how is the relationship between Workflows and Autonomous Agents best framed?",
    contextHint: "Think about Andrew Ng's core thesis on autonomy.",
    options: [
      "Agents and workflows are mutually exclusive; modern software should always eliminate workflows in favor of full autonomy.",
      "It is a continuous spectrum of autonomy—the central architectural question is 'how much autonomy does your specific use case need?'",
      "Workflows only support rule-based regex code, whereas agents can only generate unstructured text.",
      "Autonomous agents can only operate on local hardware, while workflows run strictly in cloud clusters.",
    ],
    correctIndex: 1,
    explanation:
      "Spot on! Autonomy is a continuous spectrum, not a binary toggle. As Andrew Ng emphasized: 'The question isn't agents vs. workflows. It's how much autonomy does your use case need?' You tune the autonomy level according to your risk tolerance, predictability, and auditability requirements.",
  },
  {
    id: 2,
    question:
      "Why is an Agentic Workflow (e.g. Gemini Meeting Notes) superior to a fully autonomous agent for generating meeting docs?",
    contextHint: "Consider predictability, bounds, and repeatability.",
    options: [
      "Because meeting notes require arbitrary, open-ended web browsing and unstructured experimentation.",
      "Because the pipeline is bounded and repeatable (capture audio ➔ summarize key decisions ➔ format Doc ➔ attach to Calendar event) requiring deterministic reliability.",
      "Because autonomous agents are incapable of understanding calendar invitations.",
      "Because LLMs cannot run multiple steps in an agentic loop.",
    ],
    correctIndex: 1,
    explanation:
      "Exactly right! When tasks follow a bounded, repeatable progression (listen ➔ extract ➔ format ➔ distribute), an Agentic Workflow provides guaranteed SLAs, zero loop drift, and predictable token costs. Fully autonomous exploration would introduce unnecessary latency and unpredictability.",
  },
  {
    id: 3,
    question:
      "What is the core mechanism of 'Graduated Autonomy' in production AI agent systems?",
    contextHint: "Recall how low-risk read tasks differ from high-risk write actions.",
    options: [
      "It forces human operators to type out all prompt completions manually.",
      "It grants the agent full autonomy for routine, low-risk operations while introducing Human-in-the-Loop (HITL) approval gates for high-risk write or financial actions.",
      "It automatically downgrades the model to an older generation when errors occur.",
      "It prevents the agent from retaining any memory across multi-turn sessions.",
    ],
    correctIndex: 1,
    explanation:
      "Brilliant! Graduated Autonomy combines maximum velocity with bulletproof safety. The agent acts autonomously for 90% of safe read tasks (like looking up account status), but automatically pauses for human sign-off before executing irreversible write actions (like processing a $120 refund or deleting a server).",
  },
];

export default function Module1_4Quiz() {
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400 px-2.5 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/30">
              Module 1.4 Checkpoint
            </span>
            <span className="text-xs font-mono text-slate-500">
              {answeredCount}/{QUESTIONS.length} Answered
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white mt-1">
            Knowledge Check: The Spectrum of Autonomy
          </h3>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Validate your mastery of autonomy levels, decision vectors, and graduated governance.
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
