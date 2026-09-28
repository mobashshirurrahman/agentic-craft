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
    color: "text-purple-400",
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
    color: "text-sky-400",
    bestFor: "Structured metadata, timestamps, and relational filters",
    whenToUse: "When you need audit logs, session ranges, or multi-attribute filtering",
    latencyProfile: "~2ms - 10ms",
    sampleQuery: `SELECT interaction_id, topic, status, created_at 
FROM session_memories 
WHERE user_id = 'usr_991' 
  AND created_at >= NOW() - INTERVAL '30 days'
ORDER BY created_at DESC;`,
    mockOutput: `[
  {"interaction_id": "sess_801", "topic": "Architecture Review", "status": "COMPLETED", "created_at": "2026-08-29 14:10:00"}
]`,
  },
  {
    id: "keyvalue",
    name: "Key-Value Stores",
    technologies: "Redis, AWS DynamoDB",
    icon: KeyRound,
    color: "text-emerald-400",
    bestFor: "Sub-millisecond direct lookups of user settings & flags",
    whenToUse: "When immediate instant retrieval of known key-value attributes is required",
    latencyProfile: "< 1ms (In-Memory)",
    sampleQuery: `user_settings = redis_client.hgetall("user:usr_991:profile")`,
    mockOutput: `{
  "theme": "cyber_dark",
  "timezone": "Asia/Kolkata",
  "default_lang": "python",
  "tier": "enterprise"
}`,
  },
  {
    id: "graph",
    name: "Knowledge Graphs",
    technologies: "Neo4j, AWS Neptune",
    icon: Network,
    color: "text-amber-400",
    bestFor: "Entity relationships, organizational hierarchies, multi-hop traversals",
    whenToUse: "Connecting complex multi-entity nodes: 'User works at Company X' -> 'Company X uses Tech Y'",
    latencyProfile: "~10ms - 30ms",
    sampleQuery: `MATCH (u:User {id: 'usr_991'})-[:WORKS_AT]->(c:Company)-[:USES_TECH]->(t:Tech)
RETURN u.name, c.name, collect(t.name) AS stack;`,
    mockOutput: `{
  "user": "Rahul",
  "company": "FinCorp",
  "stack": ["Python", "PostgreSQL", "LangGraph", "Docker"]
}`,
  },
];

export default function MemoryStorageComparisonStudio() {
  const [selectedEngine, setSelectedEngine] = useState<StorageEngine>("vector");
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const active = ENGINES.find((e) => e.id === selectedEngine)!;

  const handleSimulate = () => {
    setIsExecuting(true);
    setTimeout(() => setIsExecuting(false), 600);
  };

  return (
    <div className="rounded-2xl border border-slate-700/60 bg-slate-900/90 dark:bg-slate-900/90 light:bg-white light:border-slate-300 shadow-xl overflow-hidden my-8">
      {/* Studio Header */}
      <div className="border-b border-slate-700/60 dark:border-slate-700/60 light:border-slate-200 px-5 py-4 bg-slate-800/50 dark:bg-slate-800/50 light:bg-slate-50 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-teal-400 animate-pulse" />
            <h3 className="font-bold text-base md:text-lg text-white dark:text-white light:text-slate-900">
              Long-Term Memory Storage Engine Laboratory
            </h3>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 mt-0.5">
            Compare Vector Stores, Relational SQL, Key-Value Caches, and Knowledge Graphs for AI memory.
          </p>
        </div>

        <span className="px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-teal-500/10 text-teal-300 dark:text-teal-300 light:text-teal-700 border border-teal-500/30">
          Storage Decision Matrix
        </span>
      </div>

      {/* Engine Selection Bar */}
      <div className="px-5 py-3 bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-100/80 border-b border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 overflow-x-auto">
        <div className="flex items-center min-w-[620px] gap-2">
          {ENGINES.map((eng) => {
            const isSelected = eng.id === selectedEngine;
            const Icon = eng.icon;

            return (
              <button
                key={eng.id}
                onClick={() => setSelectedEngine(eng.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all border ${
                  isSelected
                    ? "bg-teal-500 text-slate-950 font-bold border-teal-400 shadow-sm"
                    : "bg-slate-900/40 dark:bg-slate-900/40 light:bg-white text-slate-300 dark:text-slate-300 light:text-slate-700 border-slate-700/60 dark:border-slate-700/60 light:border-slate-200 hover:border-slate-600"
                }`}
              >
                <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="whitespace-nowrap">{eng.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Stage */}
      <div className="p-5 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Architecture Details */}
        <div className="lg:col-span-6 flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-lg font-bold text-white dark:text-white light:text-slate-900">
                {active.name}
              </h4>
              <span className="text-xs font-mono font-bold text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20">
                {active.latencyProfile}
              </span>
            </div>

            <div className="text-xs font-mono text-slate-400 mb-4">
              Technologies: <strong className="text-slate-200 dark:text-slate-200 light:text-slate-800">{active.technologies}</strong>
            </div>

            <div className="space-y-3 text-xs md:text-sm">
              <div className="p-3 rounded-lg border border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-50">
                <span className="font-bold text-teal-400 block mb-1 text-xs font-mono uppercase">
                  Best For:
                </span>
                <p className="text-slate-300 dark:text-slate-300 light:text-slate-700">
                  {active.bestFor}
                </p>
              </div>

              <div className="p-3 rounded-lg border border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-50">
                <span className="font-bold text-teal-400 block mb-1 text-xs font-mono uppercase">
                  When to Deploy in Your Agent:
                </span>
                <p className="text-slate-300 dark:text-slate-300 light:text-slate-700">
                  {active.whenToUse}
                </p>
              </div>
            </div>
          </div>

          {/* Teacher Takeaway */}
          <div className="p-3.5 rounded-xl border border-teal-500/30 bg-teal-950/20 dark:bg-teal-950/20 light:bg-teal-50/60 text-xs text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed">
            <strong className="text-teal-400 dark:text-teal-400 light:text-teal-700 block mb-0.5">
              💡 Production Wisdom: Use a Hybrid Persistence Layer!
            </strong>
            Production architectures don't pick just one. They use <strong>Redis</strong> for instant user ID lookups, <strong>PostgreSQL</strong> for session logs, and <strong>Pinecone</strong> for semantic fuzzy recall!
          </div>
        </div>

        {/* Right: Code & Query Simulator */}
        <div className="lg:col-span-6 flex flex-col justify-between gap-4">
          <div className="rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-950 overflow-hidden shadow-inner">
            <div className="px-3.5 py-1.5 bg-slate-900 border-b border-slate-800 text-xs font-mono text-slate-400 flex items-center justify-between">
              <span>Query Execution Sample</span>
              <span className="text-[10px] text-teal-400">{active.id}.py</span>
            </div>
            <pre className="p-4 text-xs font-mono text-teal-300 overflow-x-auto leading-relaxed">
              {active.sampleQuery}
            </pre>
          </div>

          {/* Interactive Run Query */}
          <div>
            <button
              onClick={handleSimulate}
              disabled={isExecuting}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold bg-teal-400 hover:bg-teal-300 text-slate-950 shadow-md transition-all cursor-pointer disabled:opacity-50"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isExecuting ? "Executing Storage Query..." : `Test Query Execution on ${active.name}`}</span>
            </button>
          </div>

          {/* Query Output Result */}
          <div className="rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-950 p-4 font-mono text-xs flex-1">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[11px] text-slate-400">
              <span>Query Return Payload</span>
              <span className="text-emerald-400">200 OK</span>
            </div>
            <pre className="text-[11px] text-slate-300 overflow-x-auto leading-relaxed">
              {active.mockOutput}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
