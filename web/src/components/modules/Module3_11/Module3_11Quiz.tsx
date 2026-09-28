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
    question: "What makes semantic memory different from exact keyword search?",
    options: [
      "Semantic memory searches only file names, not content.",
      "It converts both the query and stored memories into vector embeddings, then retrieves memories by meaning (cosine similarity) — so 'Python automation' finds 'scripting workflows' even without matching words.",
      "It always returns every memory in alphabetical order.",
      "It requires the user to write SQL queries manually.",
    ],
    correctIndex: 1,
    explanation:
      "Embedding-based retrieval captures conceptual meaning, not character sequences. This is why agents can answer 'What does the user like?' and retrieve a memory about 'preferences' — zero keyword overlap needed.",
  },
  {
    id: 2,
    question: "Why does a production agent use a vector store instead of just appending all memories to the system prompt?",
    options: [
      "Because LLMs cannot read text that appears inside a system prompt.",
      "Because context windows are finite. An agent with 1 million memories cannot fit them all into a 128k-token window. The vector store retrieves only the top-k most relevant memories, keeping token costs under control.",
      "Because vector stores automatically translate memories into 15 languages.",
      "Because system prompts are limited to exactly 3 sentences.",
    ],
    correctIndex: 1,
    explanation:
      "This is the core engineering trade-off: full context vs. selective retrieval. Vector stores let agents scale to unlimited long-term memories while only paying for relevant ones at inference time.",
  },
  {
    id: 3,
    question: "What role does cosine similarity play in a semantic memory retrieval pipeline?",
    options: [
      "It counts how many characters two memories share.",
      "It measures the angular distance between two embedding vectors in high-dimensional space — returning a score between 0 (completely unrelated) and 1 (identical meaning).",
      "It computes the size of the database in megabytes.",
      "It deletes duplicate memories automatically.",
    ],
    correctIndex: 1,
    explanation:
      "Cosine similarity ignores vector magnitude and focuses purely on direction, making it robust to differently-phrased sentences that carry the same meaning — the foundation of semantic retrieval.",
  },
];

export default function Module3_11Quiz() {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSelect = (qId: number, optionIdx: number) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    QUESTIONS.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) score++;
    });
    return score;
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const score = calculateScore();
    if (score === QUESTIONS.length) {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setSubmitted(false);
  };

  const score = calculateScore();
  const allAnswered = QUESTIONS.every((q) => selectedAnswers[q.id] !== undefined);

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm p-6 md:p-8 space-y-6 transition-colors">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
            Concept Mastery Check
          </span>
          <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
            Module 3.11 • Semantic Memory Quiz
          </h3>
        </div>
        {submitted && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono font-bold">
              <Award className="w-4 h-4 text-purple-500" />
              <span>Score: {score} / {QUESTIONS.length}</span>
            </div>
            <button
              onClick={handleReset}
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
          const isCorrect = selectedAnswers[q.id] === q.correctIndex;
          return (
            <div
              key={q.id}
              className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-3"
            >
              <div className="flex items-start gap-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-600 dark:text-purple-400 shrink-0">
                  Q{idx + 1}
                </span>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {q.question}
                </p>
              </div>
              <div className="space-y-2 pt-1">
                {q.options.map((option, optIdx) => {
                  const selectedThis = selectedAnswers[q.id] === optIdx;
                  let btnStyle =
                    "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700";
                  if (selectedThis) {
                    btnStyle =
                      "border-purple-500 bg-purple-50/50 dark:bg-purple-950/40 text-purple-900 dark:text-purple-200 font-semibold";
                  }
                  if (submitted) {
                    if (optIdx === q.correctIndex) {
                      btnStyle =
                        "border-emerald-500 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 font-semibold";
                    } else if (selectedThis && !isCorrect) {
                      btnStyle =
                        "border-red-500 bg-red-500/10 text-red-800 dark:text-red-300";
                    }
                  }
                  return (
                    <button
                      key={optIdx}
                      disabled={submitted}
                      onClick={() => handleSelect(q.id, optIdx)}
                      className={`w-full text-left p-3 rounded-lg border text-xs transition flex items-center justify-between gap-3 ${btnStyle}`}
                    >
                      <span>{option}</span>
                      {submitted && optIdx === q.correctIndex && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      )}
                      {submitted && selectedThis && !isCorrect && (
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
                  <span className="font-bold">Explanation: </span>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between pt-2">
        <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
          {Object.keys(selectedAnswers).length} of {QUESTIONS.length} answered
        </span>
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className="px-6 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white font-mono text-xs font-bold transition shadow-sm"
          >
            Submit Answers
          </button>
        ) : (
          <span className="text-xs font-mono text-slate-500">
            {score === QUESTIONS.length ? "🎉 Semantic Memory Mastered!" : "Review the explanations above"}
          </span>
        )}
      </div>
    </div>
  );
}
