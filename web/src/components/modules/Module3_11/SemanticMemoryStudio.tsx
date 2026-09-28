"use client";

import React, { useState } from "react";
import {
  Search,
  Database,
  Sparkles,
  Play,
  RotateCcw,
  BookOpen,
  Cpu,
  CheckCircle2,
} from "lucide-react";

interface MemoryEntry {
  id: string;
  text: string;
  embedding: number[]; // 4-dim simplified
  tags: string[];
}

const MEMORY_STORE: MemoryEntry[] = [
  {
    id: "m1",
    text: "User prefers dark mode and uses Python for all automation tasks.",
    embedding: [0.91, 0.12, 0.34, 0.08],
    tags: ["preference", "python"],
  },
  {
    id: "m2",
    text: "The project deadline is November 15th. Budget is $40,000.",
    embedding: [0.11, 0.88, 0.22, 0.41],
    tags: ["project", "deadline", "budget"],
  },
  {
    id: "m3",
    text: "User's team uses LangGraph for all production agent workflows.",
    embedding: [0.89, 0.18, 0.67, 0.09],
    tags: ["tech", "langgraph", "workflow"],
  },
  {
    id: "m4",
    text: "Last meeting discussed switching from Pinecone to pgvector for cost savings.",
    embedding: [0.15, 0.72, 0.85, 0.31],
    tags: ["infrastructure", "vector-db"],
  },
  {
    id: "m5",
    text: "User dislikes verbose outputs. Prefer bullet-point summaries.",
    embedding: [0.88, 0.09, 0.28, 0.12],
    tags: ["preference", "output"],
  },
];

// Tiny cosine-similarity approximation (4D)
function cosineSim(a: number[], b: number[]): number {
  const dot = a.reduce((sum, v, i) => sum + v * b[i], 0);
  const magA = Math.sqrt(a.reduce((s, v) => s + v * v, 0));
  const magB = Math.sqrt(b.reduce((s, v) => s + v * v, 0));
  return dot / (magA * magB);
}

// Very naïve query→embedding simulation
function queryToEmbedding(q: string): number[] {
  const lower = q.toLowerCase();
  const pref = lower.includes("prefer") || lower.includes("like") || lower.includes("dislike") ? 0.9 : 0.1;
  const proj = lower.includes("project") || lower.includes("deadline") || lower.includes("budget") ? 0.85 : 0.1;
  const tech = lower.includes("langgraph") || lower.includes("agent") || lower.includes("workflow") ? 0.8 : 0.15;
  const infra = lower.includes("vector") || lower.includes("pinecone") || lower.includes("pgvector") || lower.includes("database") ? 0.78 : 0.2;
  const mag = Math.sqrt(pref ** 2 + proj ** 2 + tech ** 2 + infra ** 2);
  return [pref / mag, proj / mag, tech / mag, infra / mag];
}

const PRESET_QUERIES = [
  "What does the user prefer for output style?",
  "When is the project deadline and what is the budget?",
  "What tech stack does the team use for agents?",
  "What infrastructure decisions were discussed?",
];

interface Result {
  entry: MemoryEntry;
  score: number;
}

export default function SemanticMemoryStudio() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"search" | "store">("search");

  const runSearch = (q: string) => {
    if (!q.trim()) return;
    setLoading(true);
    setSearched(false);
    setResults([]);
    setTimeout(() => {
      const qEmb = queryToEmbedding(q);
      const scored = MEMORY_STORE.map((entry) => ({
        entry,
        score: cosineSim(qEmb, entry.embedding),
      }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);
      setResults(scored);
      setLoading(false);
      setSearched(true);
    }, 900);
  };

  const handleReset = () => {
    setQuery("");
    setResults([]);
    setSearched(false);
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800">
        {(["search", "store"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-xs font-mono font-bold uppercase tracking-wider transition ${
              activeTab === tab
                ? "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-b-2 border-purple-500"
                : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            }`}
          >
            {tab === "search" ? "🔍 Semantic Search" : "🗄️ Memory Store"}
          </button>
        ))}
      </div>

      {activeTab === "store" ? (
        /* Memory Store View */
        <div className="p-5 space-y-3">
          <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            {MEMORY_STORE.length} memories indexed in vector store — each with a 4-dim embedding
          </p>
          {MEMORY_STORE.map((entry) => (
            <div
              key={entry.id}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 space-y-2"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed flex-1">
                  {entry.text}
                </p>
                <span className="text-[10px] font-mono text-slate-400 shrink-0">{entry.id}</span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {entry.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-[10px] font-mono"
                  >
                    #{t}
                  </span>
                ))}
              </div>
              <div className="font-mono text-[10px] text-slate-400">
                emb: [{entry.embedding.map((v) => v.toFixed(2)).join(", ")}]
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Search View */
        <div className="p-5 space-y-5">
          {/* Preset query pills */}
          <div className="space-y-2">
            <p className="text-xs font-mono text-slate-500 dark:text-slate-400">Try a preset query:</p>
            <div className="flex flex-wrap gap-2">
              {PRESET_QUERIES.map((q) => (
                <button
                  key={q}
                  onClick={() => {
                    setQuery(q);
                    runSearch(q);
                  }}
                  className="text-[11px] font-mono px-3 py-1.5 rounded-full border border-purple-300 dark:border-purple-700 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/40 transition"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && runSearch(query)}
              placeholder="Type any natural language query..."
              className="flex-1 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            />
            <button
              onClick={() => runSearch(query)}
              disabled={loading || !query.trim()}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white text-xs font-mono font-bold flex items-center gap-1.5 transition"
            >
              {loading ? (
                <span className="animate-spin">⏳</span>
              ) : (
                <Play className="w-3.5 h-3.5" />
              )}
              Search
            </button>
            <button
              onClick={handleReset}
              className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Pipeline trace */}
          {loading && (
            <div className="space-y-2">
              {["Embedding query with text-embedding-3-small...", "Computing cosine similarity across 5 vectors...", "Ranking by score and returning top-3..."].map((step, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  <Cpu className="w-3.5 h-3.5 text-purple-400" />
                  {step}
                </div>
              ))}
            </div>
          )}

          {/* Results */}
          {searched && results.length > 0 && (
            <div className="space-y-3">
              <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
                Top {results.length} semantic matches for: <span className="text-purple-500">&ldquo;{query}&rdquo;</span>
              </p>
              {results.map((r, idx) => (
                <div
                  key={r.entry.id}
                  className={`p-4 rounded-xl border space-y-2 ${
                    idx === 0
                      ? "border-purple-400 bg-purple-50 dark:bg-purple-950/30"
                      : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {idx === 0 && <CheckCircle2 className="w-4 h-4 text-purple-500" />}
                      <span className="text-[10px] font-mono text-slate-500">
                        Rank #{idx + 1} • {r.entry.id}
                      </span>
                    </div>
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full ${
                        r.score > 0.85
                          ? "bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300"
                          : r.score > 0.6
                          ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      sim: {(r.score * 100).toFixed(1)}%
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {r.entry.text}
                  </p>
                  <div className="flex gap-1.5 flex-wrap">
                    {r.entry.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
