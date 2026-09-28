"use client";

import React, { useState } from "react";
import {
  GitFork,
  Play,
  RotateCcw,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Layers,
  HelpCircle,
} from "lucide-react";

interface DecisionScenario {
  id: string;
  label: string;
  hasToolCalls: boolean;
  isError: boolean;
  iterationCount: number;
  maxIterations: number;
  expectedRoute: "call_tools" | "human_review" | "end";
  explanation: string;
}

const SCENARIOS: DecisionScenario[] = [
  {
    id: "sc-1",
    label: "🛠️ Model Requested a Tool Call",
    hasToolCalls: true,
    isError: false,
    iterationCount: 1,
    maxIterations: 5,
    expectedRoute: "call_tools",
    explanation: "State has tool_calls in last message. Router switches track to 'call_tools'.",
  },
  {
    id: "sc-2",
    label: "✅ Goal Finished (Final Answer)",
    hasToolCalls: false,
    isError: false,
    iterationCount: 2,
    maxIterations: 5,
    expectedRoute: "end",
    explanation: "No tool calls requested. Task is complete, so router switches track to END.",
  },
  {
    id: "sc-3",
    label: "🚨 Max Loop Safety Brake Tripped",
    hasToolCalls: true,
    isError: false,
    iterationCount: 5,
    maxIterations: 5,
    expectedRoute: "human_review",
    explanation: "Iteration limit reached (5/5)! Router prevents infinite loop by sending to 'human_review'.",
  },
  {
    id: "sc-4",
    label: "⚠️ Unhandled Tool Exception",
    hasToolCalls: false,
    isError: true,
    iterationCount: 3,
    maxIterations: 5,
    expectedRoute: "human_review",
    explanation: "Error flag set in state. Router immediately diverts to fallback/human station.",
  },
];

export default function ConditionalEdgeSimulator() {
  const [activeScenarioIdx, setActiveScenarioIdx] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [routedNode, setRoutedNode] = useState<string | null>(null);

  const scenario = SCENARIOS[activeScenarioIdx];

  const runRouter = (sc: DecisionScenario) => {
    setIsSimulating(true);
    setRoutedNode(null);

    setTimeout(() => {
      setRoutedNode(sc.expectedRoute);
      setIsSimulating(false);
    }, 400);
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm overflow-hidden transition-colors">
      {/* Header */}
      <div className="p-5 md:p-6 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-violet-500/10 via-purple-500/5 to-transparent">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-500/20 text-violet-600 dark:text-violet-400 flex items-center justify-center font-bold">
              <GitFork className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base md:text-lg text-slate-900 dark:text-white">
                Conditional Edge Railway Switch Simulator
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                See how a routing function inspects state and flips the execution track in real time
              </p>
            </div>
          </div>

          <button
            onClick={() => runRouter(scenario)}
            disabled={isSimulating}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-40 text-white font-mono text-xs font-bold transition shadow-sm"
          >
            <Play className={`w-3.5 h-3.5 ${isSimulating ? "animate-spin" : ""}`} />
            {isSimulating ? "Evaluating State..." : "Execute Routing Decision"}
          </button>
        </div>
      </div>

      <div className="p-5 md:p-6 space-y-6">
        {/* Scenario Selector */}
        <div className="space-y-2">
          <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
            Select State Snapshot
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {SCENARIOS.map((sc, idx) => (
              <button
                key={sc.id}
                onClick={() => {
                  setActiveScenarioIdx(idx);
                  runRouter(sc);
                }}
                className={`p-3 text-left rounded-xl border text-xs font-mono transition-all ${
                  activeScenarioIdx === idx
                    ? "border-violet-500 bg-violet-50/50 dark:bg-violet-950/40 text-violet-900 dark:text-violet-200 font-bold"
                    : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:border-slate-300"
                }`}
              >
                {sc.label}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Railway Track Canvas */}
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-slate-500">
            <span>Source Node: [agent_model]</span>
            <span>Conditional Edge: should_continue()</span>
          </div>

          {/* Interactive Node Graph */}
          <div className="grid grid-cols-1 md:grid-cols-5 items-center gap-3 py-4">
            {/* Start / Source Node */}
            <div className="p-4 rounded-xl border-2 border-violet-500 bg-white dark:bg-slate-900 text-center space-y-1 shadow-sm">
              <span className="text-[10px] font-mono font-bold text-violet-600 dark:text-violet-400 uppercase">
                Source Node
              </span>
              <div className="text-xs font-bold text-slate-900 dark:text-white font-mono">
                agent_model
              </div>
              <div className="text-[10px] text-slate-500">Updates state</div>
            </div>

            {/* Decision Arrow */}
            <div className="flex flex-col items-center justify-center text-slate-400">
              <ArrowRight className="w-5 h-5 hidden md:block text-violet-500 animate-pulse" />
              <span className="text-[10px] font-mono mt-1 text-center">state evaluation</span>
            </div>

            {/* The Switch (Routing Function) */}
            <div className="p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-violet-50/80 dark:bg-violet-950/50 text-center space-y-1">
              <span className="text-[10px] font-mono font-bold text-violet-600 dark:text-violet-400 uppercase">
                Routing Logic
              </span>
              <div className="text-xs font-mono font-bold text-slate-900 dark:text-white">
                should_continue(state)
              </div>
              <div className="text-[10px] text-slate-500">Returns string key</div>
            </div>

            {/* Decision Arrow */}
            <div className="flex flex-col items-center justify-center text-slate-400">
              <ArrowRight className="w-5 h-5 hidden md:block text-violet-500 animate-pulse" />
              <span className="text-[10px] font-mono mt-1 text-center">path map</span>
            </div>

            {/* Destination Target Nodes */}
            <div className="space-y-2">
              <div
                className={`p-2.5 rounded-lg border text-xs font-mono transition-all flex items-center justify-between ${
                  routedNode === "call_tools"
                    ? "border-emerald-500 bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 font-bold scale-105"
                    : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-400 opacity-60"
                }`}
              >
                <span>🛠️ "call_tools"</span>
                {routedNode === "call_tools" && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
              </div>

              <div
                className={`p-2.5 rounded-lg border text-xs font-mono transition-all flex items-center justify-between ${
                  routedNode === "end"
                    ? "border-sky-500 bg-sky-500/20 text-sky-800 dark:text-sky-300 font-bold scale-105"
                    : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-400 opacity-60"
                }`}
              >
                <span>🏁 END (Finished)</span>
                {routedNode === "end" && <CheckCircle2 className="w-4 h-4 text-sky-500" />}
              </div>

              <div
                className={`p-2.5 rounded-lg border text-xs font-mono transition-all flex items-center justify-between ${
                  routedNode === "human_review"
                    ? "border-amber-500 bg-amber-500/20 text-amber-800 dark:text-amber-300 font-bold scale-105"
                    : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-400 opacity-60"
                }`}
              >
                <span>👤 "human_review"</span>
                {routedNode === "human_review" && <CheckCircle2 className="w-4 h-4 text-amber-500" />}
              </div>
            </div>
          </div>

          {/* Explanation Banner */}
          <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono">
            <span className="font-bold text-violet-600 dark:text-violet-400">Active Rule: </span>
            <span className="text-slate-700 dark:text-slate-300">{scenario.explanation}</span>
          </div>
        </div>

        {/* The 3 Core Components Blueprint */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
          <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase">1. Source Node</span>
            <p className="text-slate-700 dark:text-slate-300">
              Where the edge starts: <code>"agent_model"</code>
            </p>
          </div>
          <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase">2. Routing Function</span>
            <p className="text-slate-700 dark:text-slate-300">
              Inspects state dict: <code>def should_continue(state): ...</code>
            </p>
          </div>
          <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase">3. Path Map Dictionary</span>
            <p className="text-slate-700 dark:text-slate-300">
              Maps returns to nodes: <code>&#123;"continue": "tools", "stop": END&#125;</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
