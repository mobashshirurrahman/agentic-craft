"use client";

import React from "react";
import { GitBranch, Code2, Layers, Sparkles, Lightbulb, CheckCircle2 } from "lucide-react";
import SubgraphWorkbench from "./SubgraphWorkbench";
import Module4_4Quiz from "./Module4_4Quiz";

export default function Module4_4Content() {
  return (
    <div className="space-y-10">
      {/* Hero Banner */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-indigo-500/10 via-violet-500/5 to-slate-50 dark:to-slate-950 p-6 md:p-8 transition-colors">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30">
              Module 4.4 • Production, Scaling & Optimization
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">~20 min hands-on</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Structuring Workflows with Subgraphs
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            When your graph grows beyond 15–20 nodes, something subtle starts happening: <strong>you stop being able to reason about it</strong>. A change to one node breaks something three edges away. Testing a single phase requires running the entire graph. Sound familiar? This is exactly why programming has functions and modules. Subgraphs bring the same sanity to LangGraph.
          </p>
        </div>
      </div>

      {/* Section 1: What Is a Subgraph */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-500" />
          1. A Subgraph Is a Compiled Graph Used as a Node
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 space-y-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Python Function analogy</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              You have a 200-line function doing search, ranking, deduplication, and summarization. You extract it into <code>def process_results()</code> — now it&apos;s testable, reusable, and readable. Subgraph is exactly this, but for a LangGraph phase.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-indigo-200 dark:border-indigo-900/40 bg-indigo-50 dark:bg-indigo-950/20 space-y-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">But better than a function</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              A subgraph is a <em>compiled</em> LangGraph graph — it has its own state, it streams in LangSmith traces, it can be paused for HITL, and it checkpoints. A Python function is invisible to LangGraph. A subgraph is fully observable.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: State Contract */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <GitBranch className="w-5 h-5 text-violet-500" />
          2. The State Contract — How Parent and Subgraph Share Data
        </h2>
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 space-y-3">
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            The parent graph has a state schema. The subgraph has its own schema — usually a subset. At the entry boundary, LangGraph maps the relevant parent fields into the subgraph&apos;s state. At exit, only the modified fields flow back. Think of it as calling an API: you send specific parameters, you get back a specific response — the API&apos;s internals are its own business.
          </p>
          <div className="font-mono text-[11px] space-y-1 text-slate-600 dark:text-slate-400">
            <div><span className="text-slate-400">Parent state:</span> <span className="text-blue-400">{"{ messages, user_id, billing_data, ui_theme }"}</span></div>
            <div className="pl-6 text-slate-500">↓ entry mapping (only passes relevant fields)</div>
            <div className="pl-6"><span className="text-indigo-400">Billing Subgraph state:</span> <span className="text-blue-400">{"{ user_id, billing_data }"}</span></div>
            <div className="pl-6 text-slate-500">↓ exit mapping (only modified fields return)</div>
            <div><span className="text-slate-400">Parent state:</span> <span className="text-blue-400">{"{ messages, user_id, billing_data (updated), ui_theme }"}</span></div>
          </div>
        </div>
      </section>

      {/* Section 3: Code */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Code2 className="w-5 h-5 text-teal-500" />
          3. Subgraph Pattern in LangGraph
        </h2>
        <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs border border-slate-800 overflow-x-auto">
          <pre>{`from langgraph.graph import StateGraph, START, END
from typing import TypedDict

# ── Subgraph: self-contained Research unit ─────────
class ResearchState(TypedDict):
    query: str
    raw_results: list[str]
    ranked_results: list[str]
    extracted_facts: list[str]

def search_node(state: ResearchState):
    return {"raw_results": web_search(state["query"])}

def rank_node(state: ResearchState):
    return {"ranked_results": rank_by_relevance(state["raw_results"])}

def extract_node(state: ResearchState):
    return {"extracted_facts": extract_key_facts(state["ranked_results"])}

research_builder = StateGraph(ResearchState)
research_builder.add_node("search", search_node)
research_builder.add_node("rank", rank_node)
research_builder.add_node("extract", extract_node)
research_builder.add_edge(START, "search")
research_builder.add_edge("search", "rank")
research_builder.add_edge("rank", "extract")
research_builder.add_edge("extract", END)

# Compile — now this is a node you can drop anywhere
research_subgraph = research_builder.compile()

# ── Parent Graph: orchestrates subgraphs ──────────
class ParentState(TypedDict):
    query: str
    extracted_facts: list[str]  # shared field with subgraph
    final_answer: str

parent = StateGraph(ParentState)
parent.add_node("research", research_subgraph)  # ← subgraph AS a node
parent.add_node("synthesize", synthesize_node)
parent.add_edge(START, "research")
parent.add_edge("research", "synthesize")
parent.add_edge("synthesize", END)

app = parent.compile()`}</pre>
        </div>
      </section>

      {/* Interactive Studio */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-500" />
            4. Interactive Subgraph Workbench
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Execution Trace</span>
        </div>
        <SubgraphWorkbench />
      </section>

      {/* When to use */}
      <section className="space-y-3">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-indigo-500" />
          5. When to Extract a Subgraph
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { signal: "🔁 Reuse", desc: "The same sequence of nodes appears in 3+ different graphs. Extract it once, import it everywhere." },
            { signal: "📦 Ownership", desc: "A team (e.g., 'the billing team') owns a workflow phase. Give them a subgraph they can develop, test, and deploy independently." },
            { signal: "🧩 Clear Boundary", desc: "The phase has a name ('validation', 'research', 'synthesis') and clean inputs/outputs. If you can write the API contract, extract it." },
          ].map((item) => (
            <div key={item.signal} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
              <h3 className="text-sm font-bold text-indigo-700 dark:text-indigo-400">{item.signal}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 space-y-2">
        <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-semibold text-sm">
          <Lightbulb className="w-4 h-4 text-indigo-500 shrink-0" />
          Don&apos;t Abstract Prematurely
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          The worst subgraph mistake is extracting too early. Start with one flat graph — it&apos;s easier to debug and reason about. Only extract into subgraphs when the reuse signal or team boundary becomes <em>concrete and real</em>, not theoretical. Premature subgraph decomposition creates distributed complexity without any benefit.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500" />Key Takeaways</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { title: "Subgraph = Node", body: "A compiled subgraph is used exactly like any other node. The parent graph doesn't know or care what's inside it." },
            { title: "State Contract at Boundaries", body: "Parent fields map in at entry. Modified subgraph fields map back at exit. LangGraph handles this automatically — no serialization boilerplate." },
            { title: "3 Integration Patterns", body: "Sequential (A→B→C subgraphs), Conditional (router picks subgraph), and Parallel (Send() fans out to multiple subgraphs simultaneously)." },
          ].map((item) => (
            <div key={item.title} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
              <h3 className="text-xs font-bold text-indigo-700 dark:text-indigo-400">{item.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4"><Module4_4Quiz /></section>
    </div>
  );
}
