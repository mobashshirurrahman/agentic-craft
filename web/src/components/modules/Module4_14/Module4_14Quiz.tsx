"use client";
import React, { useState } from "react";
import confetti from "canvas-confetti";
import { CheckCircle2, XCircle, Award, RotateCcw } from "lucide-react";

const QUESTIONS = [
  {
    id: 1,
    question: "Why is running multi-step agent reasoning loops inside standard web server processes (like Uvicorn / Gunicorn web threads) an architectural anti-pattern?",
    options: [
      "Python does not support running loops inside functions.",
      "Agent execution is I/O intensive and long-running (30s to 5m). Running them in web threads exhausts the web server's connection pool, causing fast endpoints (like health checks and logins) to queue up and drop for all users.",
      "Web servers cannot import the OpenAI Python library.",
      "Worker nodes are cheaper than web servers.",
    ],
    correctIndex: 1,
    explanation: "Web servers are designed to handle thousands of concurrent requests that finish in milliseconds. When a web thread is blocked waiting for an agent's multi-step tool calls, that thread cannot serve any other traffic. Decoupling web servers from background worker nodes ensures the web layer remains blisteringly fast and responsive.",
  },
  {
    id: 2,
    question: "What is the purpose of a 'Visibility Timeout' (or ACK timeout) in a message queue like Celery with Redis or AWS SQS?",
    options: [
      "To hide the message from users who have not logged in.",
      "If a worker node crashes mid-execution without sending an acknowledgment (ACK), the queue automatically makes the message visible again so another healthy worker can pick it up.",
      "To automatically delete tasks that take longer than 5 seconds.",
      "To compress message tokens to save memory in Redis.",
    ],
    correctIndex: 1,
    explanation: "Visibility timeouts provide fault tolerance. When worker #1 pulls a job, the broker hides it from other workers. If worker #1 crashes (out of memory, server reboot) and fails to send an ACK before the visibility timeout expires, the broker unhides the job so worker #2 can resume execution.",
  },
  {
    id: 3,
    question: "When choosing between Celery and RQ (Redis Queue) for Python agent deployments, when is RQ preferred?",
    options: [
      "When you need support for RabbitMQ, Kafka, and complex chord/canvas workflows.",
      "When you want a lightweight, simple, 100% Pythonic queue that only requires Redis and has minimal configuration overhead for early-stage production.",
      "RQ is written in C++ and runs faster than Celery.",
      "RQ does not support background tasks.",
    ],
    correctIndex: 1,
    explanation: "RQ (Redis Queue) is specifically praised in the slides for its simplicity: it uses Redis as its sole broker and state store, requires zero boilerplate config compared to Celery's extensive broker configurations, and is ideal for straightforward agent background job processing.",
  },
];

export default function Module4_14Quiz() {
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
            Module 4.14 • Worker Node Architecture Quiz
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
