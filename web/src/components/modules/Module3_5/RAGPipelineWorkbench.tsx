"use client";

import React, { useState } from "react";
import {
  BookOpen,
  Search,
  Sparkles,
  ArrowRight,
  Database,
  Layers,
  Cpu,
  CheckCircle2,
  FileText,
  Sliders,
} from "lucide-react";

interface DocumentChunk {
  id: string;
  sourceDoc: string;
  text: string;
  similarityScore: number;
}

const SAMPLE_KNOWLEDGE_BASE: DocumentChunk[] = [
  {
    id: "chunk-1",
    sourceDoc: "HR_Policy_2025.pdf",
    text: "Employees receive 20 days of paid annual leave. Unused leave up to 5 days rolls over into Q1.",
    similarityScore: 0.92,
  },
  {
    id: "chunk-2",
    sourceDoc: "HR_Policy_2025.pdf",
    text: "Health insurance covers medical, dental, and vision for full-time staff starting on Day 30.",
    similarityScore: 0.41,
  },
  {
    id: "chunk-3",
    sourceDoc: "IT_Security_Manual.pdf",
    text: "All remote employees must connect via corporate WireGuard VPN before accessing internal databases.",
    similarityScore: 0.32,
  },
  {
    id: "chunk-4",
    sourceDoc: "Expense_Guidelines.pdf",
    text: "Meals during business travel are reimbursed up to $75/day with itemized merchant receipts.",
    similarityScore: 0.28,
  },
];

export default function RAGPipelineWorkbench() {
  const [userQuery, setUserQuery] = useState<string>("How many annual vacation days do I get?");
  const [topK, setTopK] = useState<number>(2);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [retrievedResults, setRetrievedResults] = useState<DocumentChunk[] | null>(null);

  const runRetrieval = () => {
    setIsSearching(true);
    setRetrievedResults(null);

    setTimeout(() => {
      // Sort and slice topK
      const results = [...SAMPLE_KNOWLEDGE_BASE]
        .sort((a, b) => b.similarityScore - a.similarityScore)
        .slice(0, topK);
      setRetrievedResults(results);
      setIsSearching(false);
    }, 400);
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm overflow-hidden transition-colors">
      {/* Header */}
      <div className="p-5 md:p-6 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-transparent">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base md:text-lg text-slate-900 dark:text-white">
                Interactive Two-Phase RAG Pipeline Studio
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Visualize how vector embeddings retrieve grounded facts to augment agent prompts
              </p>
            </div>
          </div>

          <button
            onClick={runRetrieval}
            disabled={isSearching}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-40 text-white font-mono text-xs font-bold transition shadow-sm"
          >
            <Search className={`w-3.5 h-3.5 ${isSearching ? "animate-spin" : ""}`} />
            {isSearching ? "Searching Vectors..." : "Execute Vector Search"}
          </button>
        </div>
      </div>

      <div className="p-5 md:p-6 space-y-6">
        {/* Controls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-1.5">
            <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase">
              User Runtime Query
            </label>
            <input
              type="text"
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            />
          </div>

          <div className="space-y-1.5 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="font-bold text-slate-700 dark:text-slate-300">Top-K Chunks</span>
              <span className="text-amber-600 dark:text-amber-400 font-bold">{topK} chunks</span>
            </div>
            <input
              type="range"
              min={1}
              max={3}
              value={topK}
              onChange={(e) => setTopK(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <span className="text-[10px] text-slate-500 block">
              Controls how many matching chunks enter LLM prompt
            </span>
          </div>
        </div>

        {/* The Two Phases Architecture Diagram */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Phase 1: Ingestion */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-950/30 space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase text-slate-500">
              Phase 1: Ingestion (Offline / Batch)
            </span>
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
              <span>PDF / Docs</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              <span>Chunks</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              <span>Embeddings</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-amber-600 dark:text-amber-400">Vector Store</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Documents are pre-chunked and embedded once into high-dimensional vectors.
            </p>
          </div>

          {/* Phase 2: Inference */}
          <div className="p-4 rounded-xl border border-amber-300 dark:border-amber-800/60 bg-amber-50/20 dark:bg-amber-950/20 space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase text-amber-700 dark:text-amber-400">
              Phase 2: Inference (Runtime Query)
            </span>
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
              <span>User Query</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              <span>Similarity Search</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-emerald-600 dark:text-emerald-400">Augmented Prompt</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Query is converted into a vector with the same model to find nearest neighbor chunks.
            </p>
          </div>
        </div>

        {/* Retrieved Results & Prompt Augmentation */}
        {retrievedResults && (
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase text-slate-700 dark:text-slate-300">
                Retrieved Vector Chunks (Cosine Similarity)
              </span>
              <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                {retrievedResults.length} Chunks Injected
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {retrievedResults.map((chunk) => (
                <div
                  key={chunk.id}
                  className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-900/50 bg-white dark:bg-slate-900 space-y-1.5 shadow-sm"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-slate-500 font-bold">{chunk.sourceDoc}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold">
                      score: {(chunk.similarityScore * 100).toFixed(0)}%
                    </span>
                  </div>
                  <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed">
                    "{chunk.text}"
                  </p>
                </div>
              ))}
            </div>

            {/* Final Augmented Prompt Preview */}
            <div className="space-y-1 pt-2">
              <span className="text-[11px] font-mono font-bold uppercase text-slate-500">
                Resulting Augmented LLM Prompt:
              </span>
              <pre className="p-3.5 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs overflow-x-auto border border-slate-800 leading-relaxed">
                {`SYSTEM: Answer user questions using ONLY the provided facts below.
--- CONTEXT ---
${retrievedResults.map((c, i) => `[Source: ${c.sourceDoc}]\n${c.text}`).join("\n\n")}
---
USER: ${userQuery}
ASSISTANT: You receive 20 days of paid annual leave, and up to 5 unused days can roll over into Q1.`}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
