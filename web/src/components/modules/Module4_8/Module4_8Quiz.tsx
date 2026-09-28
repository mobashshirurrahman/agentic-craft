"use client";
import React, { useState } from "react";
import confetti from "canvas-confetti";
import { CheckCircle2, XCircle, Award, RotateCcw } from "lucide-react";

const QUESTIONS = [
  {
    id: 1,
    question: "Your agent produced a wrong answer at step 3 due to a bad routing decision. Without time travel, what do you have to do?",
    options: [
      "Nothing — the agent will self-correct on the next message.",
      "Re-run the entire workflow from scratch, losing all the expensive tool call results from steps 1–2.",
      "Manually edit the Python code and redeploy.",
      "Delete the conversation and start a new session.",
    ],
    correctIndex: 1,
    explanation: "Without time travel, a mid-workflow error means throwing away all previous computation and re-running from zero. LangGraph's time travel lets you rewind to any checkpoint, inject a correction, and re-run only from that point — preserving all the work done before the bug.",
  },
  {
    id: 2,
    question: "What is the difference between 'replaying from a checkpoint' and 'branching from a checkpoint'?",
    options: [
      "There is no difference — both terms mean the same thing.",
      "Replaying re-runs the exact same execution path. Branching modifies state at the checkpoint (e.g., changes a parameter) and creates a new alternative execution path, leaving the original intact.",
      "Replaying is for debugging only. Branching is for production A/B testing only.",
      "Branching requires a new thread_id. Replaying uses the same thread_id.",
    ],
    correctIndex: 1,
    explanation: "The Git analogy from the slides: replaying is like 'git checkout' — you return to a past state and re-run it identically. Branching is like 'git checkout -b new-branch' — you start a new execution path from that point with modified state. Both use the same checkpoint infrastructure.",
  },
  {
    id: 3,
    question: "You're doing A/B testing on two different system prompt versions. How does time travel enable this?",
    options: [
      "Deploy two separate agents with different prompts and compare their results.",
      "Run the agent once, identify a decision-point checkpoint, then branch from that checkpoint with Prompt A in one branch and Prompt B in another. Compare the two execution trees from the same starting state.",
      "Time travel cannot be used for A/B testing — only for debugging.",
      "Ask the agent to explain what it would have done with a different prompt.",
    ],
    correctIndex: 1,
    explanation: "This is one of the most powerful time travel use cases from the slides. By forking from the same checkpoint, both A/B branches start with identical state — eliminating variance from initial conditions. Your comparison is pure prompt difference, not noise from different inputs.",
  },
];

export default function Module4_8Quiz() {
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
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400">Concept Mastery Check</span>
          <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">Module 4.8 • Time Travel Quiz</h3>
        </div>
        {submitted && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border text-xs font-mono font-bold">
              <Award className="w-4 h-4 text-violet-500" />{score} / {QUESTIONS.length}
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
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-violet-500/20 text-violet-600 dark:text-violet-400 shrink-0">Q{idx + 1}</span>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{q.question}</p>
              </div>
              <div className="space-y-2">
                {q.options.map((opt, optIdx) => {
                  const sel = selected[q.id] === optIdx;
                  let style = "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300";
                  if (sel) style = "border-violet-500 bg-violet-50/50 dark:bg-violet-950/40 text-violet-900 dark:text-violet-200 font-semibold";
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
          <button onClick={handleSubmit} disabled={Object.keys(selected).length < QUESTIONS.length} className="px-6 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-40 text-white font-mono text-xs font-bold transition">Submit</button>
        ) : (
          <span className="text-xs font-mono text-slate-500">{score === QUESTIONS.length ? "⏱️ Time Travel Master!" : "Review explanations above"}</span>
        )}
      </div>
    </div>
  );
}
