"use client";
import React, { useState } from "react";
import confetti from "canvas-confetti";
import { CheckCircle2, XCircle, Award, RotateCcw } from "lucide-react";

const QUESTIONS = [
  {
    id: 1,
    question: "Your agent has 20 tools: web search, 8 databases, 5 analytics APIs, and 6 communication tools. When you test it, the agent frequently calls the wrong tool. What architectural fix solves this?",
    options: [
      "Write a longer system prompt describing all 20 tools in more detail.",
      "Split into a Supervisor + specialized sub-agents: a Research Agent with search/database tools, an Analytics Agent with analytics APIs, and a Comms Agent with communication tools. Each agent has 4–7 tools it knows deeply.",
      "Reduce to only 5 tools by deleting the less important ones.",
      "Increase the LLM temperature so it tries more diverse tool selections.",
    ],
    correctIndex: 1,
    explanation: "Research by Masterman et al. (2024) found LLMs start making tool selection errors above ~15 tools. A supervisor splits the tool space — each specialist agent only sees its own 4–7 tools, which is well within the reliable range.",
  },
  {
    id: 2,
    question: "In a Supervisor system, what happens after a specialist sub-agent finishes its task?",
    options: [
      "It calls the next agent directly, bypassing the supervisor.",
      "It always ends the entire workflow.",
      "Control returns to the Supervisor LLM, which re-evaluates the full state and decides whether to call another agent, ask for more data, or return the final answer.",
      "The sub-agent stores its result in a shared database that all other agents poll.",
    ],
    correctIndex: 2,
    explanation: "This is the core of the Supervisor pattern — the supervisor is the single source of routing truth. Every agent reports back to it. This gives you a centralized audit trail and makes it easy to add new agents without changing the others.",
  },
  {
    id: 3,
    question: "A team argues: 'Our Supervisor LLM itself will become a bottleneck for very complex tasks.' What is the right counter-argument?",
    options: [
      "The supervisor never actually processes data, so it can't be slow.",
      "You can nest supervisors — a top-level supervisor routes to domain supervisors (Finance Supervisor, Research Supervisor), each of which manages their own specialist agents. This creates a scalable hierarchy.",
      "You should remove the supervisor and let agents communicate peer-to-peer instead (that's a Swarm, a different pattern).",
      "Both B and C are valid responses to different scaling scenarios.",
    ],
    correctIndex: 3,
    explanation: "Great engineering question! If the supervisor bottleneck is real, you have two valid paths: (1) Nested supervisor hierarchy (still Supervisor pattern, but multi-level), or (2) Switch to a Swarm pattern for fully decentralized routing. The right answer depends on whether you need central audit control or prefer maximum flexibility.",
  },
];

export default function Module4_2Quiz() {
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
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">Concept Mastery Check</span>
          <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">Module 4.2 • Supervisor Systems Quiz</h3>
        </div>
        {submitted && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border text-xs font-mono font-bold">
              <Award className="w-4 h-4 text-amber-500" />{score} / {QUESTIONS.length}
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
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-600 dark:text-amber-400 shrink-0">Q{idx + 1}</span>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{q.question}</p>
              </div>
              <div className="space-y-2">
                {q.options.map((opt, optIdx) => {
                  const sel = selected[q.id] === optIdx;
                  let style = "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700";
                  if (sel) style = "border-amber-500 bg-amber-50/50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 font-semibold";
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
          <button onClick={handleSubmit} disabled={Object.keys(selected).length < QUESTIONS.length} className="px-6 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-40 text-white font-mono text-xs font-bold transition">Submit Answers</button>
        ) : (
          <span className="text-xs font-mono text-slate-500">{score === QUESTIONS.length ? "🏆 Multi-Agent Architect!" : "Review explanations above"}</span>
        )}
      </div>
    </div>
  );
}
