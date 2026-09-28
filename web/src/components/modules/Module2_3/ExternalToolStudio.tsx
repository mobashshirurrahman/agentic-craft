"use client";

import React, { useState } from "react";
import {
  Search,
  Globe,
  Play,
  RotateCcw,
  Sparkles,
  ExternalLink,
  Code2,
  Clock,
  Coins,
  CheckCircle2,
  Terminal,
} from "lucide-react";

interface SearchResult {
  title: string;
  url: string;
  content: string;
}

export default function ExternalToolStudio() {
  const [query, setQuery] = useState<string>("What are the latest developments in humanoid robotics 2026?");
  const [maxResults, setMaxResults] = useState<number>(3);
  const [searchDepth, setSearchDepth] = useState<"basic" | "advanced">("basic");
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [results, setResults] = useState<{
    latencyMs: number;
    tokenCost: number;
    searchResults: SearchResult[];
    synthesizedAnswer: string;
  } | null>(null);

  const handleRunSearch = () => {
    setIsExecuting(true);
    setResults(null);

    setTimeout(() => {
      setIsExecuting(false);
      setResults({
        latencyMs: searchDepth === "basic" ? 380 : 850,
        tokenCost: searchDepth === "basic" ? 0.003 : 0.007,
        searchResults: [
          {
            title: "Next-Gen Humanoid Robots Enter Automotive Assembly Lines",
            url: "https://robotics-today.org/news/humanoid-assembly-2026",
            content: "Leading automotive manufacturers deployed over 500 bipedal humanoid robots for parts sequencing, achieving 99.4% uptime and autonomous battery recharging.",
          },
          {
            title: "Actuator Innovations: High-Torque Density Motors in Bipedal Systems",
            url: "https://engineering-journal.com/robotics/actuators-2026",
            content: "New quasi-direct drive brushless motors reduce heat dissipation while increasing dynamic back-drivability for safer human-robot collaboration.",
          },
          {
            title: "End-to-End Vision-Language-Action (VLA) Models in Robotics",
            url: "https://ai-research.dev/vla-models-robotics",
            content: "Robotics foundations models trained on multimodal datasets demonstrate zero-shot generalization across 40+ complex household manipulation tasks.",
          },
        ].slice(0, maxResults),
        synthesizedAnswer:
          "In 2026, humanoid robotics has reached factory commercialization with over 500 units deployed in automotive assembly lines. Key technological breakthroughs include high-torque quasi-direct drive actuators and Vision-Language-Action (VLA) foundation models enabling zero-shot task generalization.",
      });
    }, 600);
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm overflow-hidden transition-colors">
      {/* Header */}
      <div className="p-5 md:p-6 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-teal-500/10 via-sky-500/5 to-transparent">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                External Search Tool Integration Studio
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-700 dark:text-teal-300 border border-teal-500/30">
                  Tavily Search API
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Experience how external search tools provide live grounded web data beyond training cutoffs
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setQuery("What are the latest developments in humanoid robotics 2026?");
              setMaxResults(3);
              setSearchDepth("basic");
              setResults(null);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-xs font-mono text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>
      </div>

      {/* Main Body */}
      <div className="p-5 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Tool Parameters (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold pb-2 border-b border-slate-200 dark:border-slate-800">
            Tavily Tool Parameters
          </div>

          <div>
            <label className="block text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-1">
              Search Query
            </label>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full text-xs font-mono p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-1">
                Max Results
              </label>
              <select
                value={maxResults}
                onChange={(e) => setMaxResults(Number(e.target.value))}
                className="w-full text-xs font-mono p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200"
              >
                <option value={1}>1 Result</option>
                <option value={2}>2 Results</option>
                <option value={3}>3 Results</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-1">
                Search Depth
              </label>
              <select
                value={searchDepth}
                onChange={(e) => setSearchDepth(e.target.value as any)}
                className="w-full text-xs font-mono p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200"
              >
                <option value="basic">basic (faster)</option>
                <option value="advanced">advanced (deep)</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleRunSearch}
            disabled={isExecuting}
            className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-mono text-xs font-bold transition flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
          >
            <Search className="w-4 h-4" />
            <span>{isExecuting ? "Querying Tavily API..." : "Execute Tavily Tool Call"}</span>
          </button>

          {/* Code snippet */}
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-mono text-[11px] overflow-x-auto">
            <span className="text-slate-500"># Tool Binding in Python:</span>
            <pre className="text-teal-300 mt-1">{`from langchain_community.tools.tavily_search import TavilySearchResults

tavily_tool = TavilySearchResults(max_results=${maxResults})
model_with_tools = model.bind_tools([tavily_tool])`}</pre>
          </div>
        </div>

        {/* Right: Retrieved Data & Synthesis (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
            <span>Retrieved Web Context & Agent Response</span>
            {results && (
              <span className="text-[10px] font-mono text-teal-600 dark:text-teal-400 flex items-center gap-2">
                <span>⏱️ {results.latencyMs}ms</span>
                <span>💰 ~${results.tokenCost}</span>
              </span>
            )}
          </div>

          {results ? (
            <div className="space-y-3">
              {/* Retrieved Sources */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">
                  Raw Web Search Results ({results.searchResults.length}):
                </span>
                {results.searchResults.map((r, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 dark:text-white truncate max-w-[80%]">
                        {r.title}
                      </span>
                      <a
                        href={r.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[10px] text-teal-600 dark:text-teal-400 flex items-center gap-1 hover:underline"
                      >
                        Source <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                      {r.content}
                    </p>
                  </div>
                ))}
              </div>

              {/* Synthesized Response */}
              <div className="p-4 rounded-xl border border-teal-500/30 bg-teal-500/10 text-teal-950 dark:text-teal-200 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-teal-700 dark:text-teal-300">
                  <CheckCircle2 className="w-4 h-4 text-teal-500" />
                  Agent Synthesized Output with Citations:
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                  {results.synthesizedAnswer}
                </p>
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-xl border border-dashed border-slate-300 dark:border-slate-800 text-center text-slate-400 space-y-2">
              <Globe className="w-6 h-6 mx-auto text-teal-500/60" />
              <div className="text-xs font-mono">
                Click &ldquo;Execute Tavily Tool Call&rdquo; to test real-world external retrieval
              </div>
              <p className="text-[11px] text-slate-500 max-w-sm mx-auto">
                Search tools bridge the temporal gap between LLM static training weights and dynamic, live world state.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
