"use client";

import React, { useState } from "react";
import {
  Database,
  Layers,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  Code2,
  Sliders,
  Plus,
  ArrowRight,
} from "lucide-react";

export default function LangGraphStateInspector() {
  const [reducerType, setReducerType] = useState<"overwrite" | "append">("append");
  const [stepIndex, setStepIndex] = useState<number>(0);

  const steps = [
    {
      node: "Initial State (START)",
      update: { messages: ["User: 'Find flights to Tokyo'"], counter: 0 },
    },
    {
      node: "Node 1: call_model",
      update: { messages: ["AI: 'Calling flight search tool...'"], counter: 1 },
    },
    {
      node: "Node 2: call_tools",
      update: { messages: ["Tool: 'Found 3 flights from $450'"], counter: 2 },
    },
  ];

  // Calculate current state based on reducerType
  const getCurrentState = () => {
    if (stepIndex === 0) {
      return steps[0].update;
    }

    if (reducerType === "overwrite") {
      // Overwrite: messages only contains the latest node's messages
      return {
        messages: steps[stepIndex].update.messages,
        counter: steps[stepIndex].update.counter,
      };
    } else {
      // Append reducer: accumulates messages
      const accumulatedMessages: string[] = [];
      for (let i = 0; i <= stepIndex; i++) {
        accumulatedMessages.push(...steps[i].update.messages);
      }
      return {
        messages: accumulatedMessages,
        counter: steps[stepIndex].update.counter,
      };
    }
  };

  const currentState = getCurrentState();

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm overflow-hidden transition-colors">
      {/* Header */}
      <div className="p-5 md:p-6 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                LangGraph State & Reducer Inspector
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                  State Mutation Lab
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Observe the difference between Default Overwrite Reducers and Annotated Append Reducers
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setStepIndex(0)}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition"
              title="Reset"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="p-5 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Reducer Configuration & Node Step (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold pb-2 border-b border-slate-200 dark:border-slate-800">
            1. Reducer Configuration
          </div>

          <div className="space-y-2">
            <label className="block text-[11px] font-mono text-slate-500 dark:text-slate-400">
              Select Reducer for `messages` key:
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setReducerType("append")}
                className={`p-2.5 rounded-xl border text-xs font-mono text-left transition ${
                  reducerType === "append"
                    ? "border-emerald-500 bg-emerald-500/15 text-emerald-950 dark:text-white font-bold ring-1 ring-emerald-500/30"
                    : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-slate-500"
                }`}
              >
                <div>Annotated[list, operator.add]</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Appends to history</div>
              </button>

              <button
                onClick={() => setReducerType("overwrite")}
                className={`p-2.5 rounded-xl border text-xs font-mono text-left transition ${
                  reducerType === "overwrite"
                    ? "border-amber-500 bg-amber-500/15 text-amber-950 dark:text-white font-bold ring-1 ring-amber-500/30"
                    : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-slate-500"
                }`}
              >
                <div>Default Reducer</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Overwrites key</div>
              </button>
            </div>
          </div>

          {/* Stepper Controls */}
          <div className="space-y-2 pt-2">
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              Simulate Graph Progression:
            </span>
            <div className="flex items-center gap-2">
              {steps.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => setStepIndex(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition ${
                    stepIndex === idx
                      ? "bg-emerald-600 text-white font-bold shadow-sm"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  Step {idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Python Schema snippet */}
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-mono text-[11px] overflow-x-auto">
            <span className="text-slate-500"># LangGraph State Schema:</span>
            <pre className="text-emerald-300 mt-1">{`from typing import TypedDict, Annotated
import operator

class State(TypedDict):
    # ${reducerType === "append" ? "Appends updates to list" : "Overwrites list on each node"}
    messages: ${reducerType === "append" ? "Annotated[list, operator.add]" : "list"}
    counter: int`}</pre>
          </div>
        </div>

        {/* Right: State Snapshot Inspector (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
            <span>2. Current State Snapshot (Memory)</span>
            <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
              After {steps[stepIndex].node}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs border border-slate-800 space-y-3 min-h-[220px]">
            <div className="text-[10px] text-slate-400 border-b border-slate-800 pb-1.5 flex items-center justify-between">
              <span>STATE DICTIONARY</span>
              <span className="text-emerald-400">
                {reducerType === "append" ? "Accumulative Memory" : "Overwritten Memory"}
              </span>
            </div>

            <div>
              <span className="text-purple-400">counter:</span>{" "}
              <span className="text-sky-300">{currentState.counter}</span>
            </div>

            <div>
              <span className="text-purple-400">messages:</span> [
              <div className="pl-4 space-y-1 my-1">
                {currentState.messages.map((m, idx) => (
                  <div key={idx} className="text-emerald-300">
                    &quot;{m}&quot;{idx < currentState.messages.length - 1 ? "," : ""}
                  </div>
                ))}
              </div>
              ]
            </div>

            {reducerType === "overwrite" && stepIndex > 0 && (
              <div className="p-2 rounded bg-amber-500/20 text-amber-300 text-[10px]">
                ⚠️ <strong>Notice:</strong> Without <code className="font-mono">Annotated[list, operator.add]</code>, earlier messages were erased! Only the newest message remains.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
