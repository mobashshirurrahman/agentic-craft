"use client";

import React, { useState } from "react";
import { Users, Play, RotateCcw, ArrowRight, CheckCircle2, Cpu, MessageSquare } from "lucide-react";

type AgentStep = {
  agent: string;
  action: string;
  result: string;
  color: string;
};

type Task = {
  id: string;
  label: string;
  query: string;
  steps: AgentStep[];
  finalAnswer: string;
};

const TASKS: Task[] = [
  {
    id: "earnings",
    label: "📊 Earnings Report",
    query: "Summarize Tesla Q4 2024: revenue, stock move, and analyst sentiment.",
    steps: [
      { agent: "Supervisor", action: "Routes to → Research Agent (financial data needed)", result: "Routing decision made", color: "amber" },
      { agent: "Research Agent", action: "Fetches Tesla Q4 2024 10-Q filing and earnings call transcript", result: "Revenue: $25.7B (+3% YoY). EPS: $0.73.", color: "blue" },
      { agent: "Supervisor", action: "Routes to → Analysis Agent (interpretation needed)", result: "Routing decision made", color: "amber" },
      { agent: "Analysis Agent", action: "Computes margin trends, compares to analyst consensus ($24.1B expected)", result: "Beat estimates by 6.6%. Operating margin compressed 180bps.", color: "emerald" },
      { agent: "Supervisor", action: "Routes to → Sentiment Agent (analyst tone needed)", result: "Routing decision made", color: "amber" },
      { agent: "Sentiment Agent", action: "Scans 14 analyst reports post-earnings", result: "8 upgrades, 4 hold, 2 sell. Average PT raised from $195 to $218.", color: "purple" },
      { agent: "Supervisor", action: "Aggregates all results into final answer", result: "Complete", color: "amber" },
    ],
    finalAnswer: "Tesla Q4 2024: Revenue $25.7B (+3% YoY), beat $24.1B estimate. EPS $0.73. Margin compressed 180bps. Post-earnings: 8 analyst upgrades, average PT raised to $218.",
  },
  {
    id: "market",
    label: "🌍 Market Research",
    query: "What are the top 3 competitors to OpenAI in the enterprise LLM market?",
    steps: [
      { agent: "Supervisor", action: "Routes to → Research Agent (market data needed)", result: "Routing decision made", color: "amber" },
      { agent: "Research Agent", action: "Searches enterprise LLM market reports 2024-2025", result: "Found: Anthropic, Google DeepMind, Mistral AI, Cohere, Meta AI.", color: "blue" },
      { agent: "Supervisor", action: "Routes to → Analysis Agent (ranking needed)", result: "Routing decision made", color: "amber" },
      { agent: "Analysis Agent", action: "Ranks by enterprise revenue, Fortune 500 contracts, API adoption", result: "Top 3: Anthropic (Claude for Business), Google (Vertex AI), Cohere (enterprise focus).", color: "emerald" },
      { agent: "Supervisor", action: "Synthesizes final answer", result: "Complete", color: "amber" },
    ],
    finalAnswer: "Top 3 enterprise LLM competitors to OpenAI: (1) Anthropic — Claude for Business, strong safety focus. (2) Google — Vertex AI + Gemini, deep enterprise integrations. (3) Cohere — command models purpose-built for enterprise RAG.",
  },
];

const colorMap: Record<string, string> = {
  amber: "border-amber-400 bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300",
  blue: "border-blue-400 bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300",
  emerald: "border-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300",
  purple: "border-purple-400 bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300",
};

export default function SupervisorAgentStudio() {
  const [task, setTask] = useState<Task>(TASKS[0]);
  const [visibleSteps, setVisibleSteps] = useState<number>(0);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);

  const run = (t: Task) => {
    setTask(t);
    setVisibleSteps(0);
    setDone(false);
    setRunning(true);

    t.steps.forEach((_, i) => {
      setTimeout(() => {
        setVisibleSteps(i + 1);
        if (i === t.steps.length - 1) {
          setRunning(false);
          setDone(true);
        }
      }, (i + 1) * 700);
    });
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
      {/* Task Picker */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-wrap gap-3 items-center">
        <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mr-1">
          Task:
        </p>
        {TASKS.map((t) => (
          <button
            key={t.id}
            onClick={() => run(t)}
            disabled={running}
            className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition disabled:opacity-50 ${
              task.id === t.id
                ? "border-amber-500/60 bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300"
                : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            {t.label}
          </button>
        ))}
        <button
          onClick={() => { setVisibleSteps(0); setDone(false); setRunning(false); }}
          className="ml-auto px-2 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="p-5 space-y-4">
        {/* User Query */}
        <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 flex items-start gap-2">
          <MessageSquare className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-[10px] font-mono text-slate-400 mb-0.5">User Query</p>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{task.query}</p>
          </div>
        </div>

        {/* Step-by-step execution */}
        <div className="space-y-2">
          {task.steps.slice(0, visibleSteps).map((step, i) => (
            <div
              key={i}
              className={`p-3 rounded-xl border text-xs space-y-1 animate-[fadeIn_0.3s_ease] ${colorMap[step.color]}`}
            >
              <div className="flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 shrink-0" />
                <span className="font-bold">{step.agent}</span>
                <ArrowRight className="w-3 h-3 opacity-50" />
                <span className="opacity-80">{step.action}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] opacity-70">
                <CheckCircle2 className="w-3 h-3" />
                {step.result}
              </div>
            </div>
          ))}
        </div>

        {/* Final Answer */}
        {done && (
          <div className="p-4 rounded-xl border border-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 space-y-1.5">
            <p className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase">
              ✓ Supervisor Final Answer
            </p>
            <p className="text-xs text-emerald-800 dark:text-emerald-300 leading-relaxed">
              {task.finalAnswer}
            </p>
          </div>
        )}

        {/* Run Button */}
        {visibleSteps === 0 && (
          <button
            onClick={() => run(task)}
            disabled={running}
            className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-40 text-white font-mono text-xs font-bold flex items-center justify-center gap-2 transition"
          >
            <Play className="w-4 h-4" />
            Run Supervisor System
          </button>
        )}
      </div>
    </div>
  );
}
