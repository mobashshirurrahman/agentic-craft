"use client";
import React, { useState } from "react";
import confetti from "canvas-confetti";
import { CheckCircle2, XCircle, Award, RotateCcw } from "lucide-react";

const QUESTIONS = [
  {
    id: 1,
    question: "What makes a subgraph different from just extracting code into a Python function?",
    options: [
      "Subgraphs are exactly the same as Python functions — just a different word.",
      "A subgraph is a fully compiled LangGraph StateGraph with its own state schema, nodes, edges, and checkpointing. It can be tested independently, versioned separately, and used as a node in any parent graph — with full LangGraph observability.",
      "Subgraphs run in a separate thread automatically.",
      "Subgraphs require a cloud deployment to function.",
    ],
    correctIndex: 1,
    explanation: "The power of subgraphs over Python functions: they're first-class LangGraph citizens. They stream, checkpoint, can be paused for HITL, and appear in LangSmith traces. A function call is a black box to LangGraph; a subgraph is fully transparent.",
  },
  {
    id: 2,
    question: "Your parent graph has state with `messages`, `user_id`, and `billing_data`. Your Billing Subgraph only needs `user_id` and `billing_data`. How does LangGraph handle this state contract?",
    options: [
      "The subgraph crashes if its state schema doesn't exactly match the parent.",
      "The parent state flows into the subgraph at entry — the subgraph only sees and modifies the fields in its own schema. When it exits, only those modified fields flow back into the parent state.",
      "The subgraph gets a full copy of parent state but must return all fields unchanged.",
      "You must manually serialize and deserialize state at every subgraph boundary.",
    ],
    correctIndex: 1,
    explanation: "This is the state contract concept from the slides. Subgraphs define their own schema — a subset or variation of the parent. LangGraph handles the mapping automatically at entry and exit, giving you clean encapsulation without boilerplate serialization code.",
  },
  {
    id: 3,
    question: "When is the right time to extract part of your graph into a subgraph?",
    options: [
      "Immediately — always start by designing subgraphs from day one.",
      "When 3+ nodes consistently appear together across different graphs (reuse), when a phase has a natural conceptual boundary (e.g., 'validation' vs 'execution'), or when a team needs to own and independently test one part of the workflow.",
      "Only when your graph has more than 50 nodes.",
      "When the graph is running too slowly in production.",
    ],
    correctIndex: 1,
    explanation: "Don't prematurely abstract. Start with a monolithic graph — it's simpler to debug. Extract into subgraphs when the reuse case or team boundary becomes clear. The principle: subgraphs should solve a real organizational or reuse problem, not satisfy a desire for clean architecture.",
  },
];

export default function Module4_4Quiz() {
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
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Concept Mastery Check</span>
          <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">Module 4.4 • Subgraphs Quiz</h3>
        </div>
        {submitted && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border text-xs font-mono font-bold">
              <Award className="w-4 h-4 text-indigo-500" />{score} / {QUESTIONS.length}
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
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 shrink-0">Q{idx + 1}</span>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{q.question}</p>
              </div>
              <div className="space-y-2">
                {q.options.map((opt, optIdx) => {
                  const sel = selected[q.id] === optIdx;
                  let style = "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700";
                  if (sel) style = "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200 font-semibold";
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
          <button onClick={handleSubmit} disabled={Object.keys(selected).length < QUESTIONS.length} className="px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-mono text-xs font-bold transition">Submit Answers</button>
        ) : (
          <span className="text-xs font-mono text-slate-500">{score === QUESTIONS.length ? "🏗️ Graph Architect!" : "Review explanations above"}</span>
        )}
      </div>
    </div>
  );
}
