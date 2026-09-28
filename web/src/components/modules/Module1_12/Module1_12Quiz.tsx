"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { CheckCircle2, XCircle, HelpCircle, RotateCcw, Award, Sparkles } from "lucide-react";

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
    question: "What differentiates a production-grade enterprise support agent (like Zendesk AI or Intercom Fin) from a brittle legacy chatbot?",
    options: [
      "It attempts to resolve 100% of all requests without ever allowing a human agent to intervene.",
      "It resolves standard tasks via tools and knowledge bases, but detects policy constraints to seamlessly escalate edge cases to human specialists with pre-populated context.",
      "It relies entirely on generative hallucinations without connecting to internal databases or ERP APIs.",
      "It requires retraining the base LLM foundation model every time a customer asks an unfamiliar question.",
    ],
    correctIndex: 1,
    explanation:
      "Enterprise support agents thrive on bounded autonomy. By handling 60-70% of routine workflows (order lookups, policy questions) and escalating ambiguous or high-risk actions to humans with pre-drafted notes, they achieve high ROI without compromising customer trust.",
  },
  {
    id: 2,
    question: "How does AI agent scalability differ fundamentally from human workforce scaling during sudden demand spikes (e.g., Black Friday)?",
    options: [
      "Human scaling is instantaneous, whereas AI agents require 3 months of onboarding for each new server instance.",
      "Agents require proportional linear hiring of full-time managers for every additional 1,000 queries.",
      "Agents offer near-instant elasticity and zero marginal onboarding lag, absorbing 10x traffic surges without seasonal recruiting overhead.",
      "Agents can only handle sequential queries and cannot execute operations in parallel.",
    ],
    correctIndex: 2,
    explanation:
      "Scalability is one of the 4 core business vectors. While human teams face severe recruiting, training, and overtime constraints during peak spikes, cloud-hosted agents scale compute elastically to process thousands of concurrent interactions in real time.",
  },
  {
    id: 3,
    question: "According to documented enterprise case studies (such as IBM's AskHR agent), what was a key measurable outcome of large-scale agentic deployment?",
    options: [
      "Zero human employees remained employed across all enterprise departments.",
      "Over $3.5 billion in productivity savings achieved across 11.5M+ interactions, automating 94% of routine tasks.",
      "The system could only answer one hardcoded question and failed in all practical tests.",
      "Compute costs exceeded enterprise revenue, forcing a return to manual pen-and-paper triage.",
    ],
    correctIndex: 1,
    explanation:
      "IBM's AskHR agent demonstrated that focused, enterprise-grade agentic workflows targeting routine internal operations (benefits, time-off, onboarding) deliver billions in reclaimed productivity by successfully automating 94% of routine queries.",
  },
];

export default function Module1_12Quiz() {
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
        particleCount: 80,
        spread: 70,
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
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5">
            <Award className="w-4 h-4" />
            Knowledge Check
          </span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            Real-World Agent Applications & Business ROI
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Test your understanding of enterprise agent deployment, human-in-the-loop escalation, and ROI vectors.
          </p>
        </div>

        {submitted && (
          <div className="text-right">
            <div className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400">
              {score} / {QUESTIONS.length}
            </div>
            <div className="text-[11px] font-mono text-slate-400">
              {score === QUESTIONS.length ? "Perfect Score! 🎉" : "Review Explanations Below"}
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
            {score === QUESTIONS.length ? "Great job! Keep learning." : "Review the notes and try again."}
          </span>
        )}
      </div>
    </div>
  );
}
