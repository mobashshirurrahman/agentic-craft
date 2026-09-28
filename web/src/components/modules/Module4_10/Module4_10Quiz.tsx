"use client";
import React, { useState } from "react";
import confetti from "canvas-confetti";
import { CheckCircle2, XCircle, Award, RotateCcw } from "lucide-react";

const QUESTIONS = [
  {
    id: 1,
    question: "A model advertises a 200K token context window. Your agent sends 150K tokens per request. Should you trust that performance will be good?",
    options: [
      "Yes — 150K is well within the 200K limit, so performance is guaranteed.",
      "No — the 'lost in the middle' problem means LLMs perform worse as context grows, even within their limit. Performance degrades before you hit the hard cap.",
      "Yes — larger context windows always improve accuracy.",
      "Only if you use a reasoning model like o1 or Claude 3.5.",
    ],
    correctIndex: 1,
    explanation: "The slides specifically warn: 'models advertise 200K or 1M context windows, but performance degrades long before you hit the limit.' Research shows LLMs lose focus on middle-of-context content as size grows. Manage context size actively, don't trust the technical limit.",
  },
  {
    id: 2,
    question: "A customer has a 40-turn conversation about returning a laptop. Turn 35: return completed. Turn 40: 'What's your warranty on headphones?' What context management strategy is most appropriate?",
    options: [
      "Send all 40 turns — the model should handle it.",
      "Use summarization: compress turns 1–38 (laptop return) into 2 sentences, keep turns 39–40. The agent gets the essential history without 38 turns of irrelevant laptop details.",
      "Delete everything before turn 39 — the agent only needs the current question.",
      "Create a new conversation thread for every new topic.",
    ],
    correctIndex: 1,
    explanation: "Summarization is ideal here: the laptop return is complete, but isn't entirely irrelevant (the agent might reference the completed return). Compression preserves the semantic meaning in 2 sentences instead of 38 turns, keeping the context lean without losing useful history.",
  },
  {
    id: 3,
    question: "What is 'token-aware truncation' and why is it more accurate than 'message-count truncation'?",
    options: [
      "They are equivalent — counting messages and counting tokens gives the same result.",
      "Message-count truncation keeps the last N messages, but messages vary hugely in length (10 tokens to 2000 tokens). Token-aware truncation counts actual tokens per message and keeps messages until the token budget is exhausted — staying within exact model limits.",
      "Token-aware truncation is slower and not worth the added complexity.",
      "Token-aware truncation only works with OpenAI models, not other providers.",
    ],
    correctIndex: 1,
    explanation: "A 'keep last 10 messages' rule could keep 200 tokens or 20,000 tokens depending on message length. For a 4,096 token limit, those are wildly different! Token-aware truncation counts precisely, so you maximize context utility without exceeding model limits.",
  },
];

export default function Module4_10Quiz() {
  const [selected, setSelected] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const score = QUESTIONS.filter((q) => selected[q.id] === q.correctIndex).length;
  const handleSubmit = () => {
    setSubmitted(true);
    if (score === QUESTIONS.length) confetti({ particleCount: 60, spread: 70, origin: { y: 0.75 } });
  };
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm p-6 md:p-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">Concept Mastery Check</span>
          <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">Module 4.10 • Context Window Quiz</h3>
        </div>
        {submitted && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border text-xs font-mono font-bold">
              <Award className="w-4 h-4 text-cyan-500" />{score} / {QUESTIONS.length}
            </div>
            <button onClick={() => { setSelected({}); setSubmitted(false); }} className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-mono transition">
              <RotateCcw className="w-3.5 h-3.5" />Retry
            </button>
          </div>
        )}
      </div>
      <div className="space-y-6">
        {QUESTIONS.map((q, idx) => {
          const isCorrect = selected[q.id] === q.correctIndex;
          return (
            <div key={q.id} className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-3">
              <div className="flex items-start gap-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 shrink-0">Q{idx + 1}</span>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{q.question}</p>
              </div>
              <div className="space-y-2">
                {q.options.map((opt, optIdx) => {
                  const sel = selected[q.id] === optIdx;
                  let style = "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300";
                  if (sel) style = "border-cyan-500 bg-cyan-50/50 dark:bg-cyan-950/40 text-cyan-900 dark:text-cyan-200 font-semibold";
                  if (submitted) {
                    if (optIdx === q.correctIndex) style = "border-emerald-500 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 font-semibold";
                    else if (sel && !isCorrect) style = "border-red-500 bg-red-500/10 text-red-800 dark:text-red-300";
                  }
                  return (
                    <button key={optIdx} disabled={submitted} onClick={() => !submitted && setSelected((p) => ({ ...p, [q.id]: optIdx }))} className={`w-full text-left p-3 rounded-lg border text-xs transition flex items-center justify-between gap-3 ${style}`}>
                      <span>{opt}</span>
                      {submitted && optIdx === q.correctIndex && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
                      {submitted && sel && !isCorrect && <XCircle className="w-4 h-4 text-red-500 shrink-0" />}
                    </button>
                  );
                })}
              </div>
              {submitted && (
                <div className={`p-3 rounded-lg text-xs leading-relaxed ${isCorrect ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800" : "bg-red-50 dark:bg-red-950/30 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800"}`}>
                  <span className="font-bold">Why: </span>{q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-between pt-2">
        <span className="text-xs text-slate-500 font-mono">{Object.keys(selected).length} of {QUESTIONS.length} answered</span>
        {!submitted ? (
          <button onClick={handleSubmit} disabled={Object.keys(selected).length < QUESTIONS.length} className="px-6 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-white font-mono text-xs font-bold transition">Submit</button>
        ) : (
          <span className="text-xs font-mono text-slate-500">{score === QUESTIONS.length ? "🪟 Context Master!" : "Review explanations above"}</span>
        )}
      </div>
    </div>
  );
}
