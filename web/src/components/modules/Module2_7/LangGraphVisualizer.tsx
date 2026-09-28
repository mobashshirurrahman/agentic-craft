"use client";

import React, { useState } from "react";
import {
  GitBranch,
  Play,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Code2,
  Cpu,
  CheckCircle2,
  Layers,
} from "lucide-react";

export default function LangGraphVisualizer() {
  const [queryType, setQueryType] = useState<"with_tools" | "direct">("with_tools");
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [statusLog, setStatusLog] = useState<string[]>([]);

  const runGraph = () => {
    setIsAnimating(true);
    setActiveNode("START");
    setStatusLog(["Entered graph via START node"]);

    setTimeout(() => {
      setActiveNode("call_model");
      setStatusLog((prev) => [...prev, "call_model: LLM processed prompt"]);

      setTimeout(() => {
        if (queryType === "with_tools") {
          setActiveNode("should_continue");
          setStatusLog((prev) => [
            ...prev,
            "Conditional Edge: Tool call detected in state['messages']",
          ]);

          setTimeout(() => {
            setActiveNode("call_tools");
            setStatusLog((prev) => [...prev, "call_tools: Executed tool, appended Observation"]);

            setTimeout(() => {
              setActiveNode("call_model");
              setStatusLog((prev) => [...prev, "call_model: Synthesized final answer from Observation"]);

              setTimeout(() => {
                setActiveNode("END");
                setStatusLog((prev) => [...prev, "Conditional Edge: No further tools -> Reached END"]);
                setIsAnimating(false);
              }, 600);
            }, 600);
          }, 600);
        } else {
          setActiveNode("should_continue");
          setStatusLog((prev) => [
            ...prev,
            "Conditional Edge: No tool calls needed -> Routing straight to END",
          ]);

          setTimeout(() => {
            setActiveNode("END");
            setStatusLog((prev) => [...prev, "Reached END terminal point"]);
            setIsAnimating(false);
          }, 600);
        }
      }, 600);
    }, 600);
  };

  const handleReset = () => {
    setActiveNode(null);
    setIsAnimating(false);
    setStatusLog([]);
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm overflow-hidden transition-colors">
      {/* Header */}
      <div className="p-5 md:p-6 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-purple-500/10 via-sky-500/5 to-transparent">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
              <GitBranch className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                LangGraph StateGraph Visualizer
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/30">
                  Nodes & Edges
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Visualize how Normal Edges and Conditional Edges route state between functions in a graph
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition"
              title="Reset"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="p-5 md:p-6 space-y-6">
        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-500">Query Mode:</span>
            <button
              onClick={() => {
                setQueryType("with_tools");
                handleReset();
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition ${
                queryType === "with_tools"
                  ? "bg-purple-600 text-white font-bold"
                  : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
              }`}
            >
              Tool Calling Query (&quot;What is 45 * 18?&quot;)
            </button>
            <button
              onClick={() => {
                setQueryType("direct");
                handleReset();
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition ${
                queryType === "direct"
                  ? "bg-purple-600 text-white font-bold"
                  : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
              }`}
            >
              Direct Chat (&quot;Hello!&quot;)
            </button>
          </div>

          <button
            onClick={runGraph}
            disabled={isAnimating}
            className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs font-bold transition flex items-center gap-1.5 shadow-sm disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isAnimating ? "Traversing Graph..." : "Execute Graph"}</span>
          </button>
        </div>

        {/* Graph Canvas */}
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-2xl mx-auto">
            {/* START Node */}
            <div
              className={`p-3.5 rounded-xl border text-center transition-all duration-300 w-28 ${
                activeNode === "START"
                  ? "border-emerald-500 bg-emerald-500/20 text-emerald-950 dark:text-emerald-300 scale-110 shadow-md ring-2 ring-emerald-500/30 font-bold"
                  : "border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400"
              }`}
            >
              <div className="text-[10px] font-mono uppercase text-slate-400">Entry Point</div>
              <div className="text-xs font-mono font-bold mt-0.5">START</div>
            </div>

            <ArrowRight className="w-4 h-4 text-slate-400 shrink-0 hidden sm:block" />

            {/* Model Node */}
            <div
              className={`p-3.5 rounded-xl border text-center transition-all duration-300 w-36 ${
                activeNode === "call_model"
                  ? "border-sky-500 bg-sky-500/20 text-sky-950 dark:text-sky-300 scale-110 shadow-md ring-2 ring-sky-500/30 font-bold"
                  : "border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400"
              }`}
            >
              <div className="text-[10px] font-mono uppercase text-slate-400">Node</div>
              <div className="text-xs font-mono font-bold mt-0.5">call_model</div>
            </div>

            {/* Conditional Branch Arrow */}
            <div className="flex flex-col items-center gap-1">
              <span className="text-[9px] font-mono text-purple-600 dark:text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded border border-purple-500/20">
                Conditional Edge
              </span>
              <ArrowRight className="w-4 h-4 text-purple-400 shrink-0 hidden sm:block" />
            </div>

            {/* Fork: Tools or END */}
            <div className="flex flex-col gap-3">
              {/* Tool Node */}
              <div
                className={`p-3 rounded-xl border text-center transition-all duration-300 w-32 ${
                  activeNode === "call_tools"
                    ? "border-amber-500 bg-amber-500/20 text-amber-950 dark:text-amber-300 scale-110 shadow-md ring-2 ring-amber-500/30 font-bold"
                    : "border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400"
                }`}
              >
                <div className="text-[10px] font-mono uppercase text-slate-400">Node</div>
                <div className="text-xs font-mono font-bold">call_tools</div>
              </div>

              {/* END Node */}
              <div
                className={`p-3 rounded-xl border text-center transition-all duration-300 w-32 ${
                  activeNode === "END"
                    ? "border-emerald-500 bg-emerald-500/20 text-emerald-950 dark:text-emerald-300 scale-110 shadow-md ring-2 ring-emerald-500/30 font-bold"
                    : "border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400"
                }`}
              >
                <div className="text-[10px] font-mono uppercase text-slate-400">Terminal</div>
                <div className="text-xs font-mono font-bold">END</div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Trace & Python Code */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
              State Transition Log
            </span>
            <div className="p-3 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs border border-slate-800 min-h-[140px] space-y-1">
              {statusLog.length > 0 ? (
                statusLog.map((log, idx) => (
                  <div key={idx} className="text-emerald-400 text-[11px]">
                    &gt; {log}
                  </div>
                ))
              ) : (
                <span className="text-slate-500">Awaiting execution...</span>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
              LangGraph Definition Code
            </span>
            <div className="p-3 rounded-xl bg-slate-900 text-slate-300 font-mono text-[11px] border border-slate-800 overflow-x-auto min-h-[140px]">
              <pre className="text-purple-300">{`from langgraph.graph import StateGraph, START, END

builder = StateGraph(State)
builder.add_node("call_model", call_model)
builder.add_node("call_tools", call_tools)

builder.add_edge(START, "call_model")
builder.add_conditional_edges(
    "call_model",
    should_continue,
    {"tools": "call_tools", "end": END}
)
builder.add_edge("call_tools", "call_model") # loop back!`}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
