"use client";
import React, { useState } from "react";
import confetti from "canvas-confetti";
import { CheckCircle2, XCircle, Award, RotateCcw } from "lucide-react";

const QUESTIONS = [
  {
    id: 1,
    question: "What is the key mechanism that allows agents in a Swarm to hand off control to each other?",
    options: [
      "A central database that each agent polls every 500ms.",
      "Each agent is given a set of handoff tools — calling `transfer_to_billing_agent()` passes full conversation context to the Billing Agent and relinquishes control.",
      "Agents email each other their results using SMTP.",
      "A shared Python queue that all agents subscribe to.",
    ],
    correctIndex: 1,
    explanation: "Handoff tools are the secret sauce of Swarm architecture. They're not data tools — they're control-transfer tools. When called, they move the active agent pointer AND pass the full state (conversation history, tool results, user context) to the receiving agent.",
  },
  {
    id: 2,
    question: "A customer asks: 'I want a refund AND can you reply in French?' — how does a Swarm handle this differently from a Supervisor?",
    options: [
      "A Swarm cannot handle multiple intents in one message.",
      "In a Swarm: Triage Agent → Billing Agent (processes refund) → Language Agent (translates). Each agent decides for itself when to hand off — no coordinator needed. In a Supervisor: the Supervisor LLM makes every routing decision.",
      "A Supervisor is faster because it uses a queue.",
      "Both handle it identically — there's no practical difference.",
    ],
    correctIndex: 1,
    explanation: "This is the defining difference: in a Supervisor, routing decisions live in ONE place (the supervisor LLM). In a Swarm, each agent is responsible for its own self-awareness — it knows when it's out of its domain and hands off accordingly. Swarms handle multi-intent elegantly without bottlenecks.",
  },
  {
    id: 3,
    question: "When should you choose a Supervisor over a Swarm?",
    options: [
      "Always — Supervisors are strictly better than Swarms.",
      "When you need centralized audit logs, strict routing control, compliance traceability, or when routing logic is complex and must not be distributed across multiple agents.",
      "When you have fewer than 3 agents.",
      "When your agents need to run in parallel.",
    ],
    correctIndex: 1,
    explanation: "Supervisor wins when you need a single source of truth for routing decisions — finance, healthcare, and legal systems where every routing choice must be auditable. Swarm wins when routing is emergent and you value flexibility over control. Both are valid — pick based on your compliance and operational requirements.",
  },
];

export default function Module4_3Quiz() {
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
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">Concept Mastery Check</span>
          <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">Module 4.3 • Swarm Systems Quiz</h3>
        </div>
        {submitted && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border text-xs font-mono font-bold">
              <Award className="w-4 h-4 text-teal-500" />{score} / {QUESTIONS.length}
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
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-teal-500/20 text-teal-600 dark:text-teal-400 shrink-0">Q{idx + 1}</span>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{q.question}</p>
              </div>
              <div className="space-y-2">
                {q.options.map((opt, optIdx) => {
                  const sel = selected[q.id] === optIdx;
                  let style = "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700";
                  if (sel) style = "border-teal-500 bg-teal-50/50 dark:bg-teal-950/40 text-teal-900 dark:text-teal-200 font-semibold";
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
          <button onClick={handleSubmit} disabled={Object.keys(selected).length < QUESTIONS.length} className="px-6 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 disabled:opacity-40 text-white font-mono text-xs font-bold transition">Submit Answers</button>
        ) : (
          <span className="text-xs font-mono text-slate-500">{score === QUESTIONS.length ? "🌊 Swarm Architect!" : "Review explanations above"}</span>
        )}
      </div>
    </div>
  );
}
