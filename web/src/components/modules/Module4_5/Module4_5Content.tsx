"use client";

import React from "react";
import { Zap, Code2, Layers, Sparkles, Lightbulb, CheckCircle2 } from "lucide-react";
import ParallelExecutionBenchmark from "./ParallelExecutionBenchmark";
import Module4_5Quiz from "./Module4_5Quiz";

export default function Module4_5Content() {
  return (
    <div className="space-y-10">
      {/* Hero Banner */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-emerald-500/10 via-green-500/5 to-slate-50 dark:to-slate-950 p-6 md:p-8 transition-colors">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
              Module 4.5 • Production, Scaling & Optimization
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">~20 min hands-on</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Implementing Parallel Task Execution in LangGraph
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            If your agent needs to research <em>Tesla earnings</em>, <em>EV market share</em>, and <em>analyst sentiment</em> — why wait for each one to finish before starting the next? These tasks have zero dependency on each other. Running them sequentially is like cooking a 3-course meal by finishing the dessert before you start the salad. <strong>Parallel execution is one of the highest-ROI performance wins in agentic systems.</strong>
          </p>
        </div>
      </div>

      {/* Section 1: The Independence Test */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-emerald-500" />
          1. The Independence Test: Can These Run in Parallel?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/40 bg-emerald-50 dark:bg-emerald-950/20 space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase">✅ Parallelizable — Independent Tasks</span>
            <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1.5 leading-relaxed">
              <li>• Research Tesla earnings (doesn&apos;t need market share data)</li>
              <li>• Research EV market share (doesn&apos;t need earnings data)</li>
              <li>• Fetch analyst sentiment (independent source)</li>
              <li>→ Run all 3 with <code>Send()</code>: ~1.4s vs ~4.2s sequential</li>
            </ul>
          </div>
          <div className="p-4 rounded-xl border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-950/20 space-y-3">
            <span className="text-xs font-mono font-bold text-red-600 dark:text-red-400 uppercase">❌ Must Be Sequential — Dependent Tasks</span>
            <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1.5 leading-relaxed">
              <li>• First: Find which company acquired DeepMind in 2024</li>
              <li>• Then: Search for AI products launched by <em>that company</em></li>
              <li>→ Can&apos;t parallelize: Step 2 needs Step 1&apos;s output</li>
              <li>→ Force them into parallel and you get wrong results</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 2: 3 Approaches */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-500" />
          2. Three Ways to Run in Parallel — Pick the Right Tool
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { approach: "Send() API", when: "Multiple independent graph-level tasks", how: "Router node returns a list of Send objects. LangGraph runs each as a parallel branch with its own state. Results merged by a reducer.", best: "Dynamic number of tasks (N research topics)", color: "emerald" },
            { approach: "asyncio.gather()", when: "Multiple independent API calls inside ONE node", how: "Await all coroutines concurrently. Returns when all finish. All parallelism is contained in one node.", best: "Fixed set of parallel API calls per node execution", color: "blue" },
            { approach: "ThreadPoolExecutor", when: "CPU-bound or sync library calls", how: "Manages a pool of threads. Good for sync libraries that don't support async.", best: "pandas, NumPy, or other sync data processing", color: "purple" },
          ].map((item) => (
            <div key={item.approach} className={`p-4 rounded-xl border border-${item.color}-200 dark:border-${item.color}-900/40 bg-${item.color}-50 dark:bg-${item.color}-950/20 space-y-2`}>
              <h3 className={`text-sm font-bold text-${item.color}-700 dark:text-${item.color}-400`}>{item.approach}</h3>
              <p className={`text-[10px] font-mono font-bold text-${item.color}-600 dark:text-${item.color}-500 uppercase`}>When: {item.when}</p>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{item.how}</p>
              <p className={`text-[10px] text-${item.color}-600 dark:text-${item.color}-400 font-semibold`}>Best for: {item.best}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Code */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Code2 className="w-5 h-5 text-teal-500" />
          3. The Send() API Pattern — Dynamic Fan-Out
        </h2>
        <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs border border-slate-800 overflow-x-auto">
          <pre>{`from langgraph.graph import StateGraph, START, END
from langgraph.types import Send
from typing import TypedDict, Annotated
import operator

class ResearchState(TypedDict):
    topics: list[str]
    # ← THE CRITICAL PART: reducer merges results from all parallel branches
    results: Annotated[list[str], operator.add]

class TopicState(TypedDict):
    topic: str
    results: Annotated[list[str], operator.add]

def research_node(state: TopicState) -> dict:
    """Each branch runs independently, researches its assigned topic."""
    result = web_search(state["topic"])
    return {"results": [f"{state['topic']}: {result}"]}

def route_to_parallel(state: ResearchState):
    """Router: returns a Send for each topic → LangGraph fans them all out at once."""
    return [
        Send("research", {"topic": topic, "results": []})
        for topic in state["topics"]
    ]

def synthesize(state: ResearchState) -> dict:
    """Runs after ALL parallel branches complete. Receives merged results."""
    combined = "\\n".join(state["results"])
    answer = llm.invoke(f"Synthesize these research findings:\\n{combined}")
    return {"final_answer": answer.content}

builder = StateGraph(ResearchState)
builder.add_node("research", research_node)
builder.add_node("synthesize", synthesize)
builder.add_conditional_edges(START, route_to_parallel, ["research"])  # fan-out
builder.add_edge("research", "synthesize")   # fan-in (waits for ALL branches)
builder.add_edge("synthesize", END)

app = builder.compile()

# Runs 3 parallel research branches simultaneously
result = app.invoke({
    "topics": ["Tesla Q4 2024 earnings", "EV market share 2024", "Tesla analyst sentiment"],
    "results": []
})`}</pre>
        </div>
      </section>

      {/* Interactive Benchmark */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-500" />
            4. Live Parallel vs Sequential Benchmark
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Real-Time Comparison</span>
        </div>
        <ParallelExecutionBenchmark />
      </section>

      {/* Golden Rule */}
      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 space-y-2">
        <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-semibold text-sm">
          <Lightbulb className="w-4 h-4 text-emerald-500 shrink-0" />
          The Reducer Is Non-Negotiable
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          The most common parallel LangGraph bug: fan out 5 tasks, get only 1 result. The cause: missing reducer. Without <code>Annotated[list, operator.add]</code>, each branch overwrites the <code>results</code> field instead of appending to it. You end up with the result of whichever branch finished last. Always define the reducer first, then add the fan-out logic.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500" />Key Takeaways</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { title: "Independence Test First", body: "Before parallelizing, ask: does task B need task A's output? If yes, they're sequential. If no, parallelize with Send()." },
            { title: "Send() = Dynamic Fan-Out", body: "Router returns a list of Send objects — one per task. LangGraph runs all of them simultaneously and waits for all to finish before the next node." },
            { title: "asyncio.gather() for In-Node", body: "For a fixed set of concurrent API calls inside one node, gather is simpler than Send(). Use Send() when you need each branch to checkpoint or stream independently." },
          ].map((item) => (
            <div key={item.title} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
              <h3 className="text-xs font-bold text-emerald-700 dark:text-emerald-400">{item.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4"><Module4_5Quiz /></section>
    </div>
  );
}
