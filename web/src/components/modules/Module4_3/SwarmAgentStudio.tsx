"use client";

import React, { useState } from "react";
import { ArrowRight, Play, RotateCcw, CheckCircle2, Cpu, MessageSquare, Network } from "lucide-react";

type SwarmStep = {
  from: string;
  to: string;
  reason: string;
  action: string;
  result: string;
};

type Scenario = {
  id: string;
  label: string;
  query: string;
  steps: SwarmStep[];
  finalAnswer: string;
};

const SCENARIOS: Scenario[] = [
  {
    id: "support",
    label: "🎧 Customer Support",
    query: "I need a refund for order #12345 — and also, can you help me in Spanish?",
    steps: [
      { from: "Triage Agent", to: "Billing Agent", reason: "Detects billing intent (refund request)", action: "Transfers full context: order #12345, refund intent", result: "Handoff accepted. Billing Agent takes control." },
      { from: "Billing Agent", to: "Billing Agent", reason: "Processes the refund", action: "Looks up order, initiates $47.99 refund", result: "Refund approved. Processing in 3-5 days." },
      { from: "Billing Agent", to: "Language Agent", reason: "Detects language preference (Spanish request)", action: "Transfers context + resolved refund status", result: "Handoff accepted. Language Agent takes control." },
      { from: "Language Agent", to: "Language Agent", reason: "Translates resolution", action: "Formats full response in Spanish", result: "Tu reembolso de $47.99 ha sido aprobado y se procesará en 3-5 días hábiles." },
    ],
    finalAnswer: "Refund for #12345 approved ($47.99). Full resolution delivered in Spanish by Language Agent. Zero supervisor overhead — each agent self-selected the next peer.",
  },
  {
    id: "research",
    label: "🔬 Research Pipeline",
    query: "Find recent papers on LLM fine-tuning, then summarize the top 3 methods.",
    steps: [
      { from: "Query Agent", to: "Search Agent", reason: "Identifies search task", action: "Transfers search intent + domain (LLM fine-tuning)", result: "Handoff accepted." },
      { from: "Search Agent", to: "Search Agent", reason: "Executes search", action: "Queries arXiv, Semantic Scholar for papers 2024-2025", result: "Retrieved 12 relevant papers." },
      { from: "Search Agent", to: "Summarize Agent", reason: "Search complete — summarization needed", action: "Transfers 12 paper abstracts + metadata", result: "Handoff accepted." },
      { from: "Summarize Agent", to: "Summarize Agent", reason: "Distills results", action: "Ranks by citation count, extracts top 3 methods", result: "LoRA, QLoRA, RLHF with PPO summarized." },
    ],
    finalAnswer: "Top 3 fine-tuning methods (2024-2025): (1) LoRA — parameter-efficient adapters. (2) QLoRA — 4-bit quantized LoRA, 65% memory reduction. (3) RLHF with PPO — reinforcement learning from human feedback.",
  },
];

const agentColors: Record<string, string> = {
  "Triage Agent": "amber",
  "Billing Agent": "blue",
  "Language Agent": "purple",
  "Query Agent": "teal",
  "Search Agent": "emerald",
  "Summarize Agent": "orange",
};

const bgMap: Record<string, string> = {
  amber: "border-amber-400 bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300",
  blue: "border-blue-400 bg-blue-50 dark:bg-blue-950/30 text-blue-800 dark:text-blue-300",
  purple: "border-purple-400 bg-purple-50 dark:bg-purple-950/30 text-purple-800 dark:text-purple-300",
  teal: "border-teal-400 bg-teal-50 dark:bg-teal-950/30 text-teal-800 dark:text-teal-300",
  emerald: "border-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300",
  orange: "border-orange-400 bg-orange-50 dark:bg-orange-950/30 text-orange-800 dark:text-orange-300",
};

export default function SwarmAgentStudio() {
  const [scenario, setScenario] = useState<Scenario>(SCENARIOS[0]);
  const [visibleSteps, setVisibleSteps] = useState(0);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);

  const run = (s: Scenario) => {
    setScenario(s);
    setVisibleSteps(0);
    setDone(false);
    setRunning(true);

    s.steps.forEach((_, i) => {
      setTimeout(() => {
        setVisibleSteps(i + 1);
        if (i === s.steps.length - 1) {
          setRunning(false);
          setDone(true);
        }
      }, (i + 1) * 800);
    });
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
      {/* Scenario Picker */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-3">
        <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
          Scenario:
        </p>
        {SCENARIOS.map((s) => (
          <button
            key={s.id}
            onClick={() => run(s)}
            disabled={running}
            className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition disabled:opacity-50 ${
              scenario.id === s.id
                ? "border-teal-500/60 bg-teal-50 dark:bg-teal-950/30 text-teal-700 dark:text-teal-300"
                : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            {s.label}
          </button>
        ))}
        <button onClick={() => { setVisibleSteps(0); setDone(false); setRunning(false); }} className="ml-auto text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition">
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="p-5 space-y-4">
        {/* User Query */}
        <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 flex items-start gap-2">
          <MessageSquare className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-[10px] font-mono text-slate-400 mb-0.5">User Query (No Supervisor — Swarm decides)</p>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{scenario.query}</p>
          </div>
        </div>

        {/* Swarm Steps */}
        <div className="space-y-2">
          {scenario.steps.slice(0, visibleSteps).map((step, i) => {
            const color = agentColors[step.from] || "slate";
            const isHandoff = step.from !== step.to;
            return (
              <div key={i} className={`p-3 rounded-xl border text-xs space-y-1.5 ${bgMap[color] || ""}`}>
                <div className="flex items-center gap-1.5 flex-wrap font-semibold">
                  <Cpu className="w-3.5 h-3.5 shrink-0" />
                  <span>{step.from}</span>
                  {isHandoff && (
                    <>
                      <ArrowRight className="w-3.5 h-3.5 opacity-60" />
                      <span className="opacity-80">{step.to}</span>
                      <span className="text-[10px] font-normal opacity-60 ml-1">(handoff)</span>
                    </>
                  )}
                </div>
                <p className="text-[10px] opacity-70 pl-5">{step.reason}</p>
                <p className="text-[11px] pl-5">{step.action}</p>
                <div className="flex items-center gap-1 text-[10px] opacity-70 pl-5">
                  <CheckCircle2 className="w-3 h-3" /> {step.result}
                </div>
              </div>
            );
          })}
        </div>

        {done && (
          <div className="p-4 rounded-xl border border-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 space-y-1.5">
            <p className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase flex items-center gap-1.5">
              <Network className="w-3.5 h-3.5" />
              Swarm Outcome
            </p>
            <p className="text-xs text-emerald-800 dark:text-emerald-300 leading-relaxed">{scenario.finalAnswer}</p>
          </div>
        )}

        {visibleSteps === 0 && (
          <button
            onClick={() => run(scenario)}
            disabled={running}
            className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-500 disabled:opacity-40 text-white font-mono text-xs font-bold flex items-center justify-center gap-2 transition"
          >
            <Play className="w-4 h-4" />
            Run Swarm
          </button>
        )}
      </div>
    </div>
  );
}
