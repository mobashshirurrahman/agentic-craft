"use client";
import React, { useState } from "react";
import {
  DollarSign,
  TrendingDown,
  Layers,
  Database,
  Sliders,
  CheckCircle2,
  Sparkles,
  Zap,
  RotateCcw,
  Search,
  ArrowRight,
} from "lucide-react";

export default function CostOptimizerStudio() {
  const [modelTieringEnabled, setModelTieringEnabled] = useState<boolean>(true);
  const [semanticCacheEnabled, setSemanticCacheEnabled] = useState<boolean>(true);
  const [toolCacheEnabled, setToolCacheEnabled] = useState<boolean>(true);
  const [similarityThreshold, setSimilarityThreshold] = useState<number>(0.92);

  // Test query simulation
  const [sampleQuery, setSampleQuery] = useState<string>("Can I get a refund on damaged goods?");
  const [cacheStatus, setCacheStatus] = useState<"HIT" | "MISS">("HIT");

  const handleTestQuery = (query: string) => {
    setSampleQuery(query);
    if (!semanticCacheEnabled) {
      setCacheStatus("MISS");
    } else {
      // Simulate semantic match for return/refund queries
      if (
        query.toLowerCase().includes("refund") ||
        query.toLowerCase().includes("return") ||
        query.toLowerCase().includes("damaged")
      ) {
        setCacheStatus("HIT");
      } else {
        setCacheStatus("MISS");
      }
    }
  };

  // Cost calculations for 100,000 monthly agent tasks
  const baselineCost = 4250; // Everything on GPT-4o / Claude Sonnet with zero caching

  let optimizedCost = baselineCost;
  if (modelTieringEnabled) optimizedCost *= 0.35; // 65% reduction via mini router
  if (semanticCacheEnabled) optimizedCost *= 0.70; // 30% cache hits
  if (toolCacheEnabled) optimizedCost *= 0.85; // Tool result reuse

  const totalSaved = baselineCost - optimizedCost;
  const savingsPct = Math.round((totalSaved / baselineCost) * 100);

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-4 md:p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
            Unit Economics Workbench
          </span>
          <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white">
            Agent Cost Optimization & Semantic Caching Laboratory
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            {savingsPct}% Cost Reduction
          </span>
        </div>
      </div>

      <div className="p-5 md:p-6 space-y-6">
        {/* The 3 Levers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Lever 1: Model Tiering Router */}
          <div
            onClick={() => setModelTieringEnabled(!modelTieringEnabled)}
            className={`p-4 rounded-xl border cursor-pointer transition space-y-2 select-none ${
              modelTieringEnabled
                ? "border-teal-500 bg-teal-50/40 dark:bg-teal-950/30"
                : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 opacity-60"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-teal-500" />
                1. Model Tiering Router
              </span>
              <span
                className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                  modelTieringEnabled ? "bg-teal-500/20 text-teal-600" : "bg-slate-200 text-slate-500"
                }`}
              >
                {modelTieringEnabled ? "ACTIVE" : "OFF"}
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Routes 75% simple tasks to GPT-4o-mini ($0.15/M) and reserves Opus/Sonnet ($3.00/M) for multi-step reasoning.
            </p>
            <div className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
              Impact: ~65% savings
            </div>
          </div>

          {/* Lever 2: Semantic Embedding Cache */}
          <div
            onClick={() => setSemanticCacheEnabled(!semanticCacheEnabled)}
            className={`p-4 rounded-xl border cursor-pointer transition space-y-2 select-none ${
              semanticCacheEnabled
                ? "border-indigo-500 bg-indigo-50/40 dark:bg-indigo-950/30"
                : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 opacity-60"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Database className="w-4 h-4 text-indigo-500" />
                2. Semantic Vector Cache
              </span>
              <span
                className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                  semanticCacheEnabled ? "bg-indigo-500/20 text-indigo-600" : "bg-slate-200 text-slate-500"
                }`}
              >
                {semanticCacheEnabled ? "ACTIVE" : "OFF"}
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Matches queries by meaning (cosine &ge; {similarityThreshold}). Reuses previous answers for 99% cost reduction per hit.
            </p>
            <div className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
              Impact: ~30% cache hits
            </div>
          </div>

          {/* Lever 3: Tool Execution Cache */}
          <div
            onClick={() => setToolCacheEnabled(!toolCacheEnabled)}
            className={`p-4 rounded-xl border cursor-pointer transition space-y-2 select-none ${
              toolCacheEnabled
                ? "border-sky-500 bg-sky-50/40 dark:bg-sky-950/30"
                : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 opacity-60"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-sky-500" />
                3. Tool Response Caching
              </span>
              <span
                className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                  toolCacheEnabled ? "bg-sky-500/20 text-sky-600" : "bg-slate-200 text-slate-500"
                }`}
              >
                {toolCacheEnabled ? "ACTIVE" : "OFF"}
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Caches expensive web search results (SerpAPI/Tavily) and SQL lookups with 30-minute TTL freshness.
            </p>
            <div className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
              Impact: ~15% API cost cut
            </div>
          </div>
        </div>

        {/* Live Semantic Cache Matcher Playground */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-teal-500" />
              Test Semantic Cache Meaning Matcher
            </span>
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-slate-500">Cosine Threshold:</span>
              <strong className="text-teal-600 dark:text-teal-400">{similarityThreshold}</strong>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              "Can I get a refund on damaged goods?",
              "How do I return a broken item?",
              "What is your return policy for broken stuff?",
              "Who founded Apple in 1976?",
            ].map((q) => (
              <button
                key={q}
                onClick={() => handleTestQuery(q)}
                className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition ${
                  sampleQuery === q
                    ? "border-teal-500 bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-300 font-bold"
                    : "border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300"
                }`}
              >
                {q}
              </button>
            ))}
          </div>

          <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-mono">
            <div>
              <span className="text-slate-500 block text-[10px]">Testing Query:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">&ldquo;{sampleQuery}&rdquo;</span>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`px-2.5 py-1 rounded-full font-bold text-xs ${
                  cacheStatus === "HIT"
                    ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                    : "bg-amber-500/20 text-amber-600 dark:text-amber-400"
                }`}
              >
                {cacheStatus === "HIT" ? "⚡ SEMANTIC CACHE HIT ($0.0001)" : "⚠️ CACHE MISS -> INVOKE LLM ($0.025)"}
              </span>
            </div>
          </div>
        </div>

        {/* Live Monthly Spend Comparison Meter */}
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-900 text-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              Monthly Projected Spend (100,000 Tasks)
            </span>
            <div className="text-right">
              <span className="text-xs font-mono line-through text-slate-500 mr-2">${baselineCost}</span>
              <span className="text-lg font-bold font-mono text-emerald-400">
                ${Math.round(optimizedCost)} / mo
              </span>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px] font-mono text-slate-400">
              <span>Unoptimized ($4,250)</span>
              <span>Optimized (${Math.round(optimizedCost)})</span>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden flex">
              <div
                className="h-full bg-emerald-500 transition-all duration-500"
                style={{ width: `${(optimizedCost / baselineCost) * 100}%` }}
              />
              <div
                className="h-full bg-slate-700/60 transition-all duration-500"
                style={{ width: `${((baselineCost - optimizedCost) / baselineCost) * 100}%` }}
              />
            </div>
          </div>

          <p className="text-xs text-emerald-400/90 font-mono flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            Saving ${Math.round(totalSaved).toLocaleString()} every single month ({savingsPct}% efficiency gain)!
          </p>
        </div>
      </div>
    </div>
  );
}
