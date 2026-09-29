"use client";

import React, { useState } from "react";
import {
  Search,
  Database,
  Cpu,
  ArrowRight,
  GitBranch,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  RotateCw,
} from "lucide-react";

export default function RagNodeVsToolVisualizer() {
  const [mode, setMode] = useState<"node" | "tool">("node");

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden my-6">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 px-5 py-4 bg-slate-50/80 dark:bg-slate-800/50 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-teal-500 animate-pulse" />
            <h3 className="font-bold text-base md:text-lg text-slate-900 dark:text-white">
              Interactive Architectural Paradigm: RAG as a Node vs. RAG as a Tool
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            Compare deterministic pipeline retrieval (Node) against dynamic agentic self-directed search (Tool).
          </p>
        </div>

        {/* Toggle Switch */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setMode("node")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              mode === "node"
                ? "bg-teal-600 text-white font-bold shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span>RAG as a Workflow Node</span>
          </button>
          <button
            onClick={() => setMode("tool")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              mode === "tool"
                ? "bg-teal-600 text-white font-bold shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>RAG as an Agentic Tool</span>
          </button>
        </div>
      </div>

      <div className="p-5 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Visual Architecture Diagram */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-4">
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/70 p-5 min-h-[300px] flex flex-col justify-center">
            {mode === "node" ? (
              <div className="space-y-4">
                <span className="text-xs font-mono uppercase tracking-wider text-teal-700 dark:text-teal-400 block text-center mb-1 font-bold">
                  Deterministic Pipeline (Retrieval Always Happens)
                </span>

                <div className="space-y-3">
                  <div className="p-3 rounded-lg border border-sky-300 dark:border-sky-500/40 bg-sky-50 dark:bg-sky-500/10 flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-sky-800 dark:text-sky-300">1. User Query Ingestion Node</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">&quot;What is our refund SLA?&quot;</span>
                  </div>

                  <div className="text-center text-teal-600 dark:text-teal-400 text-xs font-bold">↓ Mandatory Transition</div>

                  <div className="p-3.5 rounded-xl border-2 border-teal-500 bg-teal-50 dark:bg-teal-500/20 text-center shadow-sm">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-teal-700 dark:text-teal-300 font-bold block">
                      Fixed Graph Node
                    </span>
                    <h5 className="font-bold text-slate-900 dark:text-white text-xs">Vector Knowledge Base Retrieval</h5>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 font-mono">
                      Query vector DB ➔ Ingest Top-3 policy chunks
                    </p>
                  </div>

                  <div className="text-center text-teal-600 dark:text-teal-400 text-xs font-bold">↓ Mandatory Transition with Injected Context</div>

                  <div className="p-3 rounded-lg border border-purple-300 dark:border-purple-500/40 bg-purple-50 dark:bg-purple-500/10 flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-purple-800 dark:text-purple-300">3. Final Response Generator Node</span>
                    <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold">Strictly Grounded Answer</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <span className="text-xs font-mono uppercase tracking-wider text-teal-700 dark:text-teal-400 block text-center mb-1 font-bold">
                  Autonomous Agentic Loop (Agent Chooses If & When)
                </span>

                <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 text-xs font-mono">
                  <span className="text-teal-700 dark:text-teal-400 font-bold">User:</span> &quot;Compare our 2024 enterprise refund policy with our EU statutory obligations and calculate average refund timeline.&quot;
                </div>

                <div className="p-3.5 rounded-xl border border-teal-300 dark:border-teal-500/40 bg-teal-50 dark:bg-teal-500/15 text-xs font-mono space-y-2">
                  <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Cpu className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                    <span>Agent Reasoning Engine:</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
                    &quot;I notice I need two different internal documents plus a calculation. I will invoke my <code>search_internal_docs</code> tool twice with tailored queries!&quot;
                  </p>
                  <div className="space-y-1.5 pt-1">
                    <div className="p-2 rounded bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[11px] text-sky-800 dark:text-sky-300">
                      ⚡ Tool Call 1: <code>search_internal_docs(&quot;Enterprise tier SLA 2024&quot;)</code>
                    </div>
                    <div className="p-2 rounded bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[11px] text-purple-800 dark:text-purple-300">
                      ⚡ Tool Call 2: <code>search_internal_docs(&quot;EU consumer statutory refund window&quot;)</code>
                    </div>
                    <div className="p-2 rounded bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[11px] text-emerald-800 dark:text-emerald-300">
                      ⚡ Tool Call 3: <code>calculator(days=14, buffer=2)</code>
                    </div>
                  </div>
                </div>

                <div className="text-center text-[11px] font-mono text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-800">
                  The agent decided <strong>when</strong>, <strong>what</strong>, and <strong>how many times</strong> to retrieve!
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Architectural Tradeoffs */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-4">
          <div className="bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 rounded-xl p-4 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-teal-700 dark:text-teal-400 font-bold block">
              Architectural Analysis
            </span>

            {mode === "node" ? (
              <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  When to use RAG as a Node:
                </h4>
                <p>
                  • <strong>Mandatory Domain Pipelines:</strong> Customer support chatbots where every single inquiry MUST check the official FAQ before replying.
                </p>
                <p>
                  • <strong>Predictable SLAs & Cost:</strong> Exactly one retrieval vector search per request. Zero risk of the agent looping or skipping search.
                </p>
              </div>
            ) : (
              <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  When to use RAG as a Tool:
                </h4>
                <p>
                  • <strong>Variable Research Tasks:</strong> Some user questions are conversational (&quot;Hello!&quot;), some need 1 search, and complex inquiries need 4 iterative queries.
                </p>
                <p>
                  • <strong>Multi-Repository Exploration:</strong> Agent dynamically decides whether to query the Code Repo, the HR Handbook, or the SQL Database.
                </p>
              </div>
            )}
          </div>

          {/* Pitfall Notice: Slide 141 */}
          <div className="p-4 rounded-xl border border-rose-300 dark:border-rose-500/40 bg-rose-50 dark:bg-rose-500/10 text-xs text-rose-950 dark:text-rose-200 space-y-1.5 leading-relaxed">
            <div className="flex items-center gap-1.5 font-bold text-rose-700 dark:text-rose-400">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span>Critical Truth: RAG Does NOT Solve Hallucinations</span>
            </div>
            <p>
              RAG merely shifts the problem from <em>&quot;making things up from weights&quot;</em> to <em>&quot;retrieval quality and context adherence&quot;</em>. If your vector database returns irrelevant or truncated chunks, the model will hallucinate around the noise!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
