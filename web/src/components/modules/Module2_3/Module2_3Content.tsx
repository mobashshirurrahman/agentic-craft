"use client";

import React from "react";
import {
  Globe,
  Search,
  CheckCircle2,
  Code2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Sliders,
} from "lucide-react";
import ExternalToolStudio from "./ExternalToolStudio";
import Module2_3Quiz from "./Module2_3Quiz";

export default function Module2_3Content() {
  return (
    <div className="space-y-10">
      {/* Hero Banner */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-teal-500/10 via-sky-500/5 to-slate-50 dark:to-slate-950 p-6 md:p-8 relative overflow-hidden transition-colors">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-teal-500/20 text-teal-700 dark:text-teal-300 border border-teal-500/30">
              Module 2.3 • Core Implementation
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              ~15 min hands-on
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Integrating External Tools into an Agent
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            An LLM alone is frozen in time. By integrating external tools like the <strong>Tavily Search API</strong>, our agent gains eyes on the live web, access to current news, and real-time facts.
          </p>
        </div>
      </div>

      {/* Section 1: Standardized Tool Interfaces */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Globe className="w-5 h-5 text-teal-500" />
          1. Standardized Tool Interfaces
        </h2>
        <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Modern agent frameworks handle three crucial tasks when you bind a tool:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <span className="text-teal-600 dark:text-teal-400 font-mono text-xs font-bold">1. Schema Generation</span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Converts function docstrings and type annotations into LLM function-calling JSON Schemas.
            </p>
          </div>
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <span className="text-sky-600 dark:text-sky-400 font-mono text-xs font-bold">2. Model Binding</span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Binds tools to the model via <code className="font-mono text-[10px]">model.bind_tools([tool])</code>.
            </p>
          </div>
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <span className="text-emerald-600 dark:text-emerald-400 font-mono text-xs font-bold">3. Auto Execution</span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Executes the Python function when the model outputs a tool call and routes observations back.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Code Walkthrough */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Code2 className="w-5 h-5 text-sky-500" />
          2. Tavily Search Integration in Python
        </h2>
        <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs border border-slate-800 overflow-x-auto">
          <pre>{`from langchain_community.tools.tavily_search import TavilySearchResults
from langchain_openai import ChatOpenAI
from langgraph.prebuilt import create_react_agent

# 1. Initialize Tavily search tool (clean, LLM-optimized snippets)
search_tool = TavilySearchResults(max_results=3)

# 2. Bind to model
model = ChatOpenAI(model="gpt-4o-mini", temperature=0)
agent = create_react_agent(model, [search_tool])

# 3. Invoke with a live query
result = agent.invoke({"messages": [("user", "What is the latest score of the cricket match today?")]})
print(result["messages"][-1].content)`}</pre>
        </div>
      </section>

      {/* Section 3: Tool Selection Guidelines */}
      <section className="space-y-3">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Sliders className="w-5 h-5 text-amber-500" />
          3. Tool Selection Golden Rules
        </h2>
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-600 dark:text-slate-300 space-y-2">
          <div className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
            <span><strong className="text-slate-900 dark:text-white">Start with one tool:</strong> Test thoroughly before expanding. Never bombard an agent with 20 tools initially.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
            <span><strong className="text-slate-900 dark:text-white">Account for latency & cost:</strong> Web searches take 300-800ms and incur API fees. Don&apos;t invoke search when arithmetic or RAG suffices.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
            <span><strong className="text-slate-900 dark:text-white">Clear docstrings:</strong> State exactly *when* the model should invoke the tool and what parameters it requires.</span>
          </div>
        </div>
      </section>

      {/* Interactive Studio */}
      <section className="space-y-4">
        <ExternalToolStudio />
      </section>

      {/* Quiz */}
      <section className="space-y-4">
        <Module2_3Quiz />
      </section>

      {/* Next Step Callout */}
      <div className="p-4 rounded-xl border border-teal-500/30 bg-teal-500/10 text-xs font-mono text-slate-700 dark:text-slate-300 flex items-center justify-between">
        <span>Up Next: Module 2.4 — Building Simple Multi-Step LLM Workflows</span>
        <ArrowRight className="w-4 h-4 text-teal-500" />
      </div>
    </div>
  );
}
