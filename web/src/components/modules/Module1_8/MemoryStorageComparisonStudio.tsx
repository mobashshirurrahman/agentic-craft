"use client";

import React, { useState } from "react";
import {
  Database,
  Search,
  KeyRound,
  Network,
  Zap,
  CheckCircle2,
  Clock,
  Terminal,
  Server,
  Play,
  ArrowRight,
} from "lucide-react";

type StorageEngine = "vector" | "sql" | "keyvalue" | "graph";

interface StorageInfo {
  id: StorageEngine;
  name: string;
  technologies: string;
  icon: any;
  color: string;
  bestFor: string;
  whenToUse: string;
  latencyProfile: string;
  sampleQuery: string;
  mockOutput: string;
}

const ENGINES: StorageInfo[] = [
  {
    id: "vector",
    name: "Vector Databases",
    technologies: "Pinecone, Weaviate, Qdrant, Chroma",
    icon: Search,
    color: "text-purple-700 dark:text-purple-400",
    bestFor: "Semantic search & natural language fuzzy matching",
    whenToUse: "When user intent or phrasing varies: 'I love backend architecture' matches 'APIs, PostgreSQL, Redis'",
    latencyProfile: "~15ms - 40ms",
    sampleQuery: `results = vector_vault.similarity_search(
    query="developer preferred infrastructure", 
    top_k=3, 
    filter={"user_id": "usr_991"}
)`,
    mockOutput: `[
  {"text": "User specializes in PostgreSQL connection pooling", "score": 0.94},
  {"text": "User deployed async Python microservices on Docker", "score": 0.89}
]`,
  },
  {
    id: "sql",
    name: "Relational / Document DBs",
    technologies: "PostgreSQL, MySQL, MongoDB",
    icon: Database,
    color: "text-sky-700 dark:text-sky-400",
    bestFor: "Structured metadata, timestamps, and relational filters",
    whenToUse: "When you need audit logs, session ranges, or multi-attribute filtering",
    latencyProfile: "~2ms - 10ms",
    sampleQuery: `SELECT user_id, preference_key, preference_value 
FROM agent_memory 
WHERE user_id = 'usr_991' 
  AND updated_at > NOW() - INTERVAL '30 days';`,
    mockOutput: `[
  {"preference_key": "cloud_provider", "preference_value": "AWS"},
  {"preference_key": "programming_language", "preference_value": "Python 3.11"}
]`,
  },
  {
    id: "keyvalue",
    name: "Key-Value In-Memory Caches",
    technologies: "Redis, Memcached, Cloudflare KV",
    icon: KeyRound,
    color: "text-amber-700 dark:text-amber-400",
    bestFor: "Sub-millisecond retrieval of hot session scratchpads",
    whenToUse: "Active multi-turn dialog context and sliding window message buffers",
    latencyProfile: "< 1ms",
    sampleQuery: `session_data = redis_client.get("session:usr_991:active_context")`,
    mockOutput: `{"turn_count": 4, "pending_subtasks": ["deploy_container", "verify_health"]}`,
  },
  {
    id: "graph",
    name: "Knowledge Graphs",
    technologies: "Neo4j, Memgraph, Amazon Neptune",
    icon: Network,
    color: "text-emerald-700 dark:text-emerald-400",
    bestFor: "Complex multi-hop entity relationships and hierarchies",
    whenToUse: "Organizational charts, dependency trees, and fraud rings",
    latencyProfile: "~20ms - 60ms",
    sampleQuery: `MATCH (u:User {id: 'usr_991'})-[:MANAGES]->(p:Project)-[:DEPENDS_ON]->(d:Database)
RETURN p.name, d.type;`,
    mockOutput: `[
  {"project": "BillingService", "database": "PostgreSQL"},
  {"project": "AnalyticsPipeline", "database": "ClickHouse"}
]`,
  },
];

export default function MemoryStorageComparisonStudio() {
  const [selectedEngine, setSelectedEngine] = useState<StorageEngine>("vector");
  const currentEngine = ENGINES.find((e) => e.id === selectedEngine) || ENGINES[0];
  const Icon = currentEngine.icon;

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-4 sm:p-6 shadow-sm dark:shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400 px-2.5 py-0.5 rounded-full bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30">
              Interactive Storage Architecture
            </span>
            <span className="text-[11px] font-mono text-slate-500">4 Technology Stacks</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-1">
            Comparing Memory Storage Engines
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Evaluate latency profiles, query semantics, and practical trade-offs for production memory backends
          </p>
        </div>

        <div className="px-3 py-1 rounded-xl bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30 text-teal-800 dark:text-teal-300 font-mono text-xs font-bold self-start sm:self-center">
          {currentEngine.technologies.split(",")[0]}
        </div>
      </div>

      {/* Engine Switcher Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {ENGINES.map((e) => {
          const EIcon = e.icon;
          const isSelected = e.id === selectedEngine;

          return (
            <button
              key={e.id}
              onClick={() => setSelectedEngine(e.id)}
              className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between min-h-[95px] touch-manipulation active:scale-95 ${
                isSelected
                  ? "border-teal-500 bg-teal-50 dark:bg-teal-500/15 shadow-sm ring-1 ring-teal-500/30"
                  : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <EIcon className={`w-4 h-4 ${isSelected ? "text-teal-700 dark:text-teal-400" : "text-slate-500"}`} />
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />}
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                  {e.name.split(" ")[0]}
                </h4>
                <span className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                  {e.latencyProfile}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Engine Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
        {/* Left Column: Metadata & Best For */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200 dark:border-slate-800">
            <div className="w-8 h-8 rounded-lg bg-teal-100 dark:bg-teal-500/20 text-teal-700 dark:text-teal-400 flex items-center justify-center font-bold">
              <Icon className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">{currentEngine.name}</h4>
              <span className="text-[10px] font-mono text-slate-500">{currentEngine.technologies}</span>
            </div>
          </div>

          <div className="space-y-1 text-xs">
            <span className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[10px] block">
              Optimal For:
            </span>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              {currentEngine.bestFor}
            </p>
          </div>

          <div className="space-y-1 text-xs">
            <span className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[10px] block">
              When to Select:
            </span>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              {currentEngine.whenToUse}
            </p>
          </div>

          <div className="p-2.5 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-mono shadow-sm">
            <span className="text-slate-500">Typical Latency:</span>
            <span className="font-bold text-teal-700 dark:text-teal-400">{currentEngine.latencyProfile}</span>
          </div>
        </div>

        {/* Right Column: Code & Wire Mock */}
        <div className="lg:col-span-7 space-y-3">
          <div>
            <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900 rounded-t-lg border-t border-x border-slate-800 text-[11px] font-mono text-slate-400">
              <div className="flex items-center gap-1.5 text-teal-400">
                <Terminal className="w-3 h-3" />
                <span>Sample Query</span>
              </div>
              <span>Python</span>
            </div>
            <pre className="p-3 bg-slate-950 border border-slate-800 rounded-b-lg font-mono text-xs text-teal-300 overflow-x-auto leading-relaxed max-h-36">
              <code>{currentEngine.sampleQuery}</code>
            </pre>
          </div>

          <div>
            <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900 rounded-t-lg border-t border-x border-slate-800 text-[11px] font-mono text-slate-400">
              <span>Retrieved Memory Payload</span>
              <span>JSON</span>
            </div>
            <pre className="p-3 bg-slate-950 border border-slate-800 rounded-b-lg font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed max-h-36">
              <code>{currentEngine.mockOutput}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
