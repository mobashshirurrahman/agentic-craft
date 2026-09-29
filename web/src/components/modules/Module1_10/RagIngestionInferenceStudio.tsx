"use client";

import React, { useState } from "react";
import {
  Layers,
  Database,
  Search,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Play,
  ArrowRight,
  Filter,
  FileText,
} from "lucide-react";

export default function RagIngestionInferenceStudio() {
  const [activeTab, setActiveTab] = useState<"ingestion" | "inference">("ingestion");
  const [chunkSize, setChunkSize] = useState<number>(256);
  const [retrievalQuality, setRetrievalQuality] = useState<"high" | "noisy">("high");
  const [isSearching, setIsSearching] = useState<boolean>(false);

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden my-6">
      {/* Studio Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 px-5 py-4 bg-slate-50/80 dark:bg-slate-800/50 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-teal-500 animate-pulse" />
            <h3 className="font-bold text-base md:text-lg text-slate-900 dark:text-white">
              RAG Lifecycle & Retrieval Quality Laboratory
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            Test the Ingestion Phase (Chunking & Embedding) and the Inference Phase (Vector Search & Noise Impact).
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setActiveTab("ingestion")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "ingestion"
                ? "bg-teal-600 text-white font-bold shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>1. Ingestion Phase</span>
          </button>
          <button
            onClick={() => setActiveTab("inference")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "inference"
                ? "bg-teal-600 text-white font-bold shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>2. Inference & Quality Simulation</span>
          </button>
        </div>
      </div>

      {activeTab === "ingestion" ? (
        <div className="p-5 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Raw Document & Chunking Controls */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-4">
            <div className="bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 rounded-xl p-4">
              <span className="text-xs font-mono uppercase tracking-wider text-teal-700 dark:text-teal-400 font-bold block mb-2">
                Raw Enterprise Policy Document
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
                Raw unstructured documents must be segmented into chunks before they can be converted into numerical vectors.
              </p>

              <div className="p-3 bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-[11px] text-slate-800 dark:text-slate-300 max-h-40 overflow-y-auto leading-relaxed shadow-inner">
                &quot;FinCorp Enterprise SLA (Rev 2026.2): Tier 1 enterprise clients receive 99.99% uptime guarantees. Scheduled maintenance occurs on the first Sunday of each month between 02:00 and 04:00 UTC. In the event of an unplanned outage exceeding 15 minutes, enterprise accounts are eligible for a 15% billing credit upon submitting a formal claim within 30 days.&quot;
              </div>

              {/* Chunk Size Slider */}
              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700/60">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-semibold text-slate-900 dark:text-white">
                    Chunk Window Size:
                  </span>
                  <span className="font-mono font-bold text-teal-700 dark:text-teal-300 bg-teal-100 dark:bg-teal-500/20 px-2 py-0.5 rounded border border-teal-200 dark:border-teal-500/30">
                    {chunkSize} tokens
                  </span>
                </div>
                <input
                  type="range"
                  min={128}
                  max={512}
                  step={64}
                  value={chunkSize}
                  onChange={(e) => setChunkSize(Number(e.target.value))}
                  className="w-full accent-teal-600 cursor-pointer"
                />
              </div>
            </div>

            <div className="p-3 rounded-lg bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30 text-xs text-teal-900 dark:text-teal-300">
              💡 <strong>Chunking Rule:</strong> Too small (e.g. 50 tokens) loses sentence context; too large (e.g. 2000 tokens) dilutes semantic embedding specificity.
            </div>
          </div>

          {/* Right: Chunking & Vector Output */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-4">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 font-mono text-xs flex-1">
              <span className="text-[11px] text-teal-700 dark:text-teal-400 font-bold block mb-2">
                Compiled Vector Database Payloads (Pinecone Index)
              </span>

              <div className="space-y-2">
                <div className="p-2.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400">
                    <span>Chunk_ID: chunk_sla_001</span>
                    <span className="text-teal-700 dark:text-teal-400 font-semibold">1536-dim vector embedded</span>
                  </div>
                  <p className="text-[11px] text-slate-800 dark:text-slate-200">
                    &quot;Tier 1 enterprise clients receive 99.99% uptime guarantees. Scheduled maintenance occurs on the first Sunday...&quot;
                  </p>
                </div>

                <div className="p-2.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400">
                    <span>Chunk_ID: chunk_sla_002</span>
                    <span className="text-teal-700 dark:text-teal-400 font-semibold">1536-dim vector embedded</span>
                  </div>
                  <p className="text-[11px] text-slate-800 dark:text-slate-200">
                    &quot;...unplanned outage exceeding 15 minutes, enterprise accounts are eligible for a 15% billing credit upon formal claim...&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Tab 2: Inference & Quality Simulation */
        <div className="p-5 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Query & Retrieval Quality Toggle */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-4">
            <div className="bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 rounded-xl p-4 space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-teal-700 dark:text-teal-400 font-bold block">
                Inference Vector Query
              </span>

              <div className="p-2.5 rounded bg-white dark:bg-slate-950 font-mono text-xs text-sky-800 dark:text-sky-300 border border-slate-200 dark:border-slate-800">
                User Query: &quot;What happens if our system is down for 30 minutes?&quot;
              </div>

              <div>
                <span className="text-xs font-semibold text-slate-900 dark:text-white block mb-2">
                  Simulate Retrieval Quality:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setRetrievalQuality("high")}
                    className={`p-2.5 rounded-lg border text-xs font-semibold transition cursor-pointer ${
                      retrievalQuality === "high"
                        ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-500/20 text-emerald-900 dark:text-emerald-300 font-bold shadow-sm"
                        : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:border-slate-300"
                    }`}
                  >
                    ✓ High Relevance Chunks
                  </button>
                  <button
                    onClick={() => setRetrievalQuality("noisy")}
                    className={`p-2.5 rounded-lg border text-xs font-semibold transition cursor-pointer ${
                      retrievalQuality === "noisy"
                        ? "border-rose-500 bg-rose-50 dark:bg-rose-500/20 text-rose-900 dark:text-rose-300 font-bold shadow-sm"
                        : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:border-slate-300"
                    }`}
                  >
                    ⚠️ Noisy / Irrelevant Chunks
                  </button>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsSearching(true);
                  setTimeout(() => setIsSearching(false), 600);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-500 text-white shadow-sm transition-all cursor-pointer"
              >
                <Search className="w-3.5 h-3.5" />
                <span>{isSearching ? "Searching Vector Store..." : "Run Vector Similarity Search"}</span>
              </button>
            </div>
          </div>

          {/* Right: Synthesis Outcome */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-4">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 font-mono text-xs flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[11px] text-teal-700 dark:text-teal-400 font-bold block mb-2">
                  Retrieved Context & Generated Answer
                </span>

                {retrievalQuality === "high" ? (
                  <div className="space-y-3">
                    <div className="p-2 rounded bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-emerald-900 dark:text-emerald-300 text-[11px]">
                      ✓ Retrieved: chunk_sla_002 (Score: 0.93 - Outage &gt; 15 min ➔ 15% credit)
                    </div>
                    <div className="p-3 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs leading-relaxed">
                      &quot;Under Section 2 of our Enterprise SLA, because the 30-minute outage exceeds the 15-minute threshold, your account is eligible for a <strong>15% billing credit</strong> upon submitting a claim within 30 days.&quot;
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="p-2 rounded bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30 text-rose-900 dark:text-rose-300 text-[11px]">
                      ⚠️ Retrieved: chunk_parking_policy (Score: 0.41 - Building visitor parking rules)
                    </div>
                    <div className="p-3 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-rose-900 dark:text-rose-200 text-xs leading-relaxed">
                      &quot;Hallucination Risk: 'The company will provide reserved visitor parking during system downtime.' (Model hallucinated due to noisy, irrelevant retrieval chunks!)&quot;
                    </div>
                  </div>
                )}
              </div>

              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-3 pt-2 border-t border-slate-200 dark:border-slate-800">
                Grounding lesson: RAG is only as truthful as the relevance of the retrieved vectors.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
