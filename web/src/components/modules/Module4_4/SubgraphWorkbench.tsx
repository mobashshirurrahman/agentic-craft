"use client";

import React, { useState } from "react";
import { GitBranch, Play, RotateCcw, CheckCircle2, Cpu, Layers } from "lucide-react";

type SubgraphStep = {
  label: string;
  type: "parent" | "subgraph" | "result";
  node: string;
  detail: string;
  color: string;
};

type Example = {
  id: string;
  label: string;
  description: string;
  steps: SubgraphStep[];
  benefit: string;
};

const EXAMPLES: Example[] = [
  {
    id: "research",
    label: "📚 Research Pipeline",
    description: "Parent graph calls a self-contained Research Subgraph (search + rank + extract) as a single node.",
    steps: [
      { label: "Parent Graph", type: "parent", node: "START → route_task", detail: "Detects research intent, prepares query", color: "amber" },
      { label: "→ Research Subgraph entry", type: "subgraph", node: "search_node", detail: "Queries external APIs, returns raw results", color: "blue" },
      { label: "  Research Subgraph", type: "subgraph", node: "rank_node", detail: "Scores results by relevance, removes duplicates", color: "blue" },
      { label: "  Research Subgraph", type: "subgraph", node: "extract_node", detail: "Pulls key facts, entities, source citations", color: "blue" },
      { label: "← Research Subgraph exit", type: "subgraph", node: "subgraph END", detail: "Returns {facts, sources} to parent state", color: "blue" },
      { label: "Parent Graph", type: "parent", node: "synthesize_node", detail: "LLM writes final answer from extracted facts", color: "amber" },
      { label: "Parent Graph", type: "result", node: "END", detail: "Complete — all state preserved", color: "emerald" },
    ],
    benefit: "The Research Subgraph is a fully reusable unit — plug it into any parent graph without rewriting the search-rank-extract logic.",
  },
  {
    id: "validation",
    label: "🛡️ Validation Subgraph",
    description: "Parent graph validates every user input through a dedicated Validation Subgraph before passing it to the agent.",
    steps: [
      { label: "Parent Graph", type: "parent", node: "START → receive_input", detail: "User message arrives, enters parent state", color: "amber" },
      { label: "→ Validation Subgraph entry", type: "subgraph", node: "schema_check_node", detail: "Pydantic validates message format and length", color: "purple" },
      { label: "  Validation Subgraph", type: "subgraph", node: "safety_check_node", detail: "Regex guards detect prompt injection patterns", color: "purple" },
      { label: "  Validation Subgraph", type: "subgraph", node: "policy_check_node", detail: "Business-rule filters (topic allowlist, PII detection)", color: "purple" },
      { label: "← Validation Subgraph exit", type: "subgraph", node: "subgraph END", detail: "Returns {is_valid, rejection_reason} to parent", color: "purple" },
      { label: "Parent Graph", type: "parent", node: "conditional_route", detail: "Routes to agent (valid) or error response (invalid)", color: "amber" },
      { label: "Parent Graph", type: "result", node: "END", detail: "Safe, validated flow complete", color: "emerald" },
    ],
    benefit: "The Validation Subgraph is tested once, shared by every agent in the system. Zero duplicated validation logic across 10+ agent nodes.",
  },
];

const colorMap: Record<string, string> = {
  amber: "border-amber-400 bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300",
  blue: "border-blue-400 bg-blue-50 dark:bg-blue-950/30 text-blue-800 dark:text-blue-300",
  purple: "border-purple-400 bg-purple-50 dark:bg-purple-950/30 text-purple-800 dark:text-purple-300",
  emerald: "border-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300",
};

export default function SubgraphWorkbench() {
  const [example, setExample] = useState<Example>(EXAMPLES[0]);
  const [visibleSteps, setVisibleSteps] = useState(0);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);

  const run = (ex: Example) => {
    setExample(ex);
    setVisibleSteps(0);
    setDone(false);
    setRunning(true);
    ex.steps.forEach((_, i) => {
      setTimeout(() => {
        setVisibleSteps(i + 1);
        if (i === ex.steps.length - 1) {
          setRunning(false);
          setDone(true);
        }
      }, (i + 1) * 550);
    });
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
      {/* Tabs */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-wrap gap-3 items-center">
        <Layers className="w-4 h-4 text-slate-400" />
        {EXAMPLES.map((ex) => (
          <button
            key={ex.id}
            onClick={() => run(ex)}
            disabled={running}
            className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition disabled:opacity-50 ${
              example.id === ex.id
                ? "border-indigo-500/60 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300"
                : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            {ex.label}
          </button>
        ))}
        <button onClick={() => { setVisibleSteps(0); setDone(false); setRunning(false); }} className="ml-auto text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition">
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="p-5 space-y-4">
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{example.description}</p>

        {/* Execution Trace */}
        <div className="space-y-1.5">
          {example.steps.slice(0, visibleSteps).map((step, i) => (
            <div
              key={i}
              className={`p-3 rounded-xl border text-xs flex items-start gap-3 ${
                step.type === "subgraph" ? "ml-6" : ""
              } ${colorMap[step.color] || ""}`}
            >
              <div className="flex-1 space-y-0.5">
                <div className="flex items-center gap-2 flex-wrap">
                  {step.type === "subgraph" && (
                    <GitBranch className="w-3 h-3 opacity-60 shrink-0" />
                  )}
                  {step.type === "parent" && (
                    <Cpu className="w-3 h-3 opacity-60 shrink-0" />
                  )}
                  {step.type === "result" && (
                    <CheckCircle2 className="w-3 h-3 opacity-80 shrink-0" />
                  )}
                  <span className="font-bold">{step.label}</span>
                  <span className="font-mono text-[10px] opacity-60">→ {step.node}</span>
                </div>
                <p className="text-[11px] opacity-75 pl-5">{step.detail}</p>
              </div>
            </div>
          ))}
        </div>

        {done && (
          <div className="p-4 rounded-xl border border-indigo-400 bg-indigo-50 dark:bg-indigo-950/30">
            <p className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase mb-1">
              💡 Why Subgraphs Pay Off
            </p>
            <p className="text-xs text-indigo-800 dark:text-indigo-300 leading-relaxed">{example.benefit}</p>
          </div>
        )}

        {visibleSteps === 0 && (
          <button
            onClick={() => run(example)}
            disabled={running}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-mono text-xs font-bold flex items-center justify-center gap-2 transition"
          >
            <Play className="w-4 h-4" />
            Trace Execution
          </button>
        )}
      </div>
    </div>
  );
}
