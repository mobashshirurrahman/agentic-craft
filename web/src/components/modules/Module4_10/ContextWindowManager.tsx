"use client";

import React, { useState } from "react";
import { Layers, Trash2, AlertTriangle, CheckCircle2 } from "lucide-react";

type Strategy = "truncate" | "token_aware" | "summarize" | "selective";

type Message = {
  turn: number;
  role: "user" | "assistant";
  content: string;
  tokens: number;
  keep?: boolean;
};

const HISTORY: Message[] = [
  { turn: 1, role: "user", content: "Hi, I want to return my laptop.", tokens: 45, keep: true },
  { turn: 1, role: "assistant", content: "Sure! What's your order number?", tokens: 38 },
  { turn: 2, role: "user", content: "It's ORD-98712. The laptop has a cracked screen.", tokens: 62 },
  { turn: 2, role: "assistant", content: "Got it. Initiating return for ORD-98712 — cracked screen qualifies for warranty.", tokens: 74 },
  { turn: 3, role: "user", content: "How long will the refund take?", tokens: 42 },
  { turn: 3, role: "assistant", content: "3–5 business days after we receive the laptop.", tokens: 55 },
  { turn: 4, role: "user", content: "Can I also get a prepaid shipping label?", tokens: 51 },
  { turn: 4, role: "assistant", content: "Yes, I've emailed a prepaid FedEx label to you.", tokens: 57 },
  { turn: 5, role: "user", content: "Great. Return is complete. Now — what's your warranty on headphones?", tokens: 68, keep: true },
  { turn: 5, role: "assistant", content: "Our headphones carry a 1-year warranty covering manufacturing defects.", tokens: 72 },
];

const STRATEGIES: Array<{ id: Strategy; label: string; desc: string; color: string }> = [
  { id: "truncate", label: "✂️ Simple Truncation", desc: "Keep only the 4 most recent messages. Fast, but loses context.", color: "blue" },
  { id: "token_aware", label: "🔢 Token-Aware", desc: "Keep messages until token budget (200) is exhausted. Exact, not approximate.", color: "purple" },
  { id: "summarize", label: "📝 Summarize Old Turns", desc: "Compress turns 1–4 into a 1-sentence summary. Preserves meaning, saves tokens.", color: "amber" },
  { id: "selective", label: "🎯 Selective Deletion", desc: "Keep first user message, last 2 turns, delete the middle. Smart pruning.", color: "emerald" },
];

function applyStrategy(strategy: Strategy, messages: Message[]): Message[] {
  switch (strategy) {
    case "truncate":
      return messages.slice(-4);
    case "token_aware": {
      const budget = 200;
      let used = 0;
      const kept: Message[] = [];
      for (let i = messages.length - 1; i >= 0; i--) {
        if (used + messages[i].tokens <= budget) {
          used += messages[i].tokens;
          kept.unshift(messages[i]);
        }
      }
      return kept;
    }
    case "summarize":
      return [
        { turn: 0, role: "assistant", content: "[SUMMARY: User returned laptop ORD-98712 (cracked screen). Refund approved, shipping label sent. Completed.]", tokens: 48 },
        ...messages.slice(-4),
      ];
    case "selective":
      return [messages[0], ...messages.slice(-4)];
    default:
      return messages;
  }
}

export default function ContextWindowManager() {
  const [strategy, setStrategy] = useState<Strategy | null>(null);
  const [result, setResult] = useState<Message[] | null>(null);

  const apply = (s: Strategy) => {
    setStrategy(s);
    setResult(applyStrategy(s, HISTORY));
  };

  const totalTokens = HISTORY.reduce((s, m) => s + m.tokens, 0);
  const keptTokens = result?.reduce((s, m) => s + m.tokens, 0) ?? 0;
  const saving = result ? Math.round((1 - keptTokens / totalTokens) * 100) : 0;

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
      {/* Strategy Picker */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-2">
        {STRATEGIES.map((s) => (
          <button key={s.id} onClick={() => apply(s.id)}
            className={`p-3 rounded-xl border text-[11px] font-mono font-bold text-left space-y-1 transition ${strategy === s.id ? `border-${s.color}-400 bg-${s.color}-50 dark:bg-${s.color}-950/20 text-${s.color}-700 dark:text-${s.color}-300` : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"}`}>
            <div>{s.label}</div>
            <div className="text-[9px] font-normal text-slate-400 leading-snug">{s.desc}</div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-800">
        {/* Before */}
        <div className="p-4 space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-mono font-bold uppercase text-slate-400">Before — Full History</p>
            <span className="text-[10px] font-mono text-red-500 font-bold">{totalTokens} tokens</span>
          </div>
          <div className="space-y-1.5 max-h-72 overflow-y-auto">
            {HISTORY.map((msg, i) => (
              <div key={i} className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-[10px] space-y-0.5">
                <div className="flex items-center justify-between">
                  <span className={`font-bold font-mono ${msg.role === "user" ? "text-blue-500" : "text-emerald-500"}`}>T{msg.turn} {msg.role}</span>
                  <span className="text-slate-400 font-mono">{msg.tokens}t</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-snug">{msg.content.slice(0, 60)}{msg.content.length > 60 ? "…" : ""}</p>
              </div>
            ))}
          </div>
        </div>

        {/* After */}
        <div className="p-4 space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-mono font-bold uppercase text-slate-400">After — Pruned Context</p>
            {result && <span className="text-[10px] font-mono text-emerald-500 font-bold">{keptTokens} tokens ({saving}% saved)</span>}
          </div>
          {result ? (
            <div className="space-y-1.5 max-h-72 overflow-y-auto">
              {result.map((msg, i) => (
                <div key={i} className={`p-2 rounded-lg border text-[10px] space-y-0.5 ${msg.turn === 0 ? "border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/20" : "border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/50 dark:bg-emerald-950/10"}`}>
                  <div className="flex items-center justify-between">
                    <span className={`font-bold font-mono ${msg.turn === 0 ? "text-amber-600" : msg.role === "user" ? "text-blue-500" : "text-emerald-500"}`}>
                      {msg.turn === 0 ? "SUMMARY" : `T${msg.turn} ${msg.role}`}
                    </span>
                    <span className="text-slate-400 font-mono">{msg.tokens}t</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 leading-snug">{msg.content.slice(0, 80)}{msg.content.length > 80 ? "…" : ""}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 text-xs text-slate-400 font-mono">
              ← Select a strategy to see pruned context
            </div>
          )}
        </div>
      </div>

      {result && (
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
          <p className="text-[11px] text-slate-600 dark:text-slate-400">
            Pruned from <strong>{totalTokens}</strong> → <strong>{keptTokens}</strong> tokens. Agent now focuses on the current question, not 40-turn laptop return history.
          </p>
        </div>
      )}
    </div>
  );
}
