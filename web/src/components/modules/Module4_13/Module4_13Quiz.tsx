"use client";
import React, { useState } from "react";
import confetti from "canvas-confetti";
import { CheckCircle2, XCircle, Award, RotateCcw } from "lucide-react";

const QUESTIONS = [
  {
    id: 1,
    question: "When a client submits a long-running research prompt to your agent API, which HTTP status code should your server return immediately?",
    options: [
      "200 OK with the final result once the agent finishes in 4 minutes.",
      "202 Accepted with a payload containing a task ID and status URL (e.g., {'task_id': 'job_123', 'status_url': '/tasks/job_123'}).",
      "504 Gateway Timeout to let the client know it will take a long time.",
      "301 Moved Permanently to redirect the client to OpenAI's documentation.",
    ],
    correctIndex: 1,
    explanation: "HTTP 202 Accepted explicitly conveys to the client: 'The request has been accepted for processing, but processing has not completed.' The response should return immediately (in <100ms) with a unique task ID, allowing the client to poll or await a webhook without holding open a fragile HTTP connection.",
  },
  {
    id: 2,
    question: "For a real-time web application where the user wants to see the agent's step-by-step thinking and generated words live, what is the most lightweight, robust protocol?",
    options: [
      "Synchronous blocking HTTP POST requests.",
      "Server-Sent Events (SSE): a unidirectional HTTP streaming standard supported natively by all modern browsers (EventSource).",
      "Setting up a dedicated gRPC microservice for every individual browser session.",
      "Polling every 10 milliseconds over HTTP 1.1.",
    ],
    correctIndex: 1,
    explanation: "Server-Sent Events (SSE) runs over standard HTTP, traverses corporate firewalls effortlessly, supports automatic reconnection, and is unidirectional (server -> client), making it perfect for streaming agent reasoning traces and output tokens without the bidirectional complexity of WebSockets.",
  },
  {
    id: 3,
    question: "When sending task completion results to an external partner's webhook callback URL, how do you verify that the callback genuinely originated from your server?",
    options: [
      "Include the partner's password in plain text inside the JSON payload.",
      "Sign the payload body using an HMAC SHA-256 signature with a shared secret, and send it in a custom header (e.g., X-Hub-Signature-256 or X-Signature).",
      "Webhooks do not need security because HTTP is always private.",
      "Tell the client to turn off their firewall.",
    ],
    correctIndex: 1,
    explanation: "HMAC SHA-256 signatures with a pre-shared secret (the industry standard used by GitHub, Stripe, and Shopify) allow the receiving client to compute the HMAC hash of the raw incoming request body and verify that it matches the header. This prevents spoofing, tampering, and replay attacks.",
  },
];

export default function Module4_13Quiz() {
  const [selected, setSelected] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const score = QUESTIONS.filter((q) => selected[q.id] === q.correctIndex).length;

  const handleSubmit = () => {
    setSubmitted(true);
    if (score === QUESTIONS.length) {
      confetti({ particleCount: 70, spread: 75, origin: { y: 0.75 } });
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm p-6 md:p-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
            Concept Mastery Check
          </span>
          <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
            Module 4.13 • Long-Running Agent APIs Quiz
          </h3>
        </div>
        {submitted && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border text-xs font-mono font-bold">
              <Award className="w-4 h-4 text-teal-500" />
              {score} / {QUESTIONS.length}
            </div>
            <button
              onClick={() => {
                setSelected({});
                setSubmitted(false);
              }}
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
          const isCorrect = selected[q.id] === q.correctIndex;
          return (
            <div
              key={q.id}
              className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-3"
            >
              <div className="flex items-start gap-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-teal-500/20 text-teal-600 dark:text-teal-400 shrink-0">
                  Q{idx + 1}
                </span>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {q.question}
                </p>
              </div>

              <div className="space-y-2">
                {q.options.map((opt, optIdx) => {
                  const sel = selected[q.id] === optIdx;
                  let style =
                    "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300";
                  if (sel) {
                    style =
                      "border-teal-500 bg-teal-50/50 dark:bg-teal-950/40 text-teal-900 dark:text-teal-200 font-semibold";
                  }
                  if (submitted) {
                    if (optIdx === q.correctIndex) {
                      style =
                        "border-emerald-500 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 font-semibold";
                    } else if (sel && !isCorrect) {
                      style =
                        "border-red-500 bg-red-500/10 text-red-800 dark:text-red-300";
                    }
                  }
                  return (
                    <button
                      key={optIdx}
                      disabled={submitted}
                      onClick={() =>
                        !submitted &&
                        setSelected((p) => ({ ...p, [q.id]: optIdx }))
                      }
                      className={`w-full text-left p-3 rounded-lg border text-xs transition flex items-center justify-between gap-3 ${style}`}
                    >
                      <span>{opt}</span>
                      {submitted && optIdx === q.correctIndex && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      )}
                      {submitted && sel && !isCorrect && (
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
                  <span className="font-bold">Why: </span>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={Object.keys(selected).length < QUESTIONS.length}
          className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-semibold text-xs tracking-wider uppercase transition shadow-sm"
        >
          Submit Answers
        </button>
      )}
    </div>
  );
}
