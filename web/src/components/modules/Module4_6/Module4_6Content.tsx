"use client";
import React from "react";
import { Zap, Code2, Sparkles, Lightbulb, CheckCircle2, GitBranch } from "lucide-react";
import PlanExecutionComparer from "./PlanExecutionComparer";
import Module4_6Quiz from "./Module4_6Quiz";

export default function Module4_6Content() {
  return (
    <div className="space-y-10">
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-slate-50 dark:to-slate-950 p-6 md:p-8">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-500/30">Module 4.6 • Production, Scaling & Optimization</span>
            <span className="text-xs font-mono text-slate-500">~20 min</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Comparing Sequential and Parallel Plan Execution
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Most agents receive complex queries that need to be decomposed into sub-tasks. The question isn&apos;t <em>whether</em> to decompose — it&apos;s <em>how</em>. Get this wrong and you either waste 3× the time running independent tasks one by one, or you run dependent tasks in parallel and get completely wrong answers. The good news: <strong>the rule is simple once you see it.</strong>
          </p>
        </div>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2"><GitBranch className="w-5 h-5 text-blue-500" />1. The Only Rule You Need: The Independence Test</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/40 bg-emerald-50 dark:bg-emerald-950/20 space-y-2">
            <p className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase">✅ Parallel — if sub-tasks are independent</p>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">Ask yourself: <em>"Does sub-task B need sub-task A&apos;s output to run?"</em> If NO — they&apos;re independent. Run them in parallel.</p>
            <p className="text-xs text-slate-600 dark:text-slate-500 italic">Example: &ldquo;Tesla earnings + Tesla products + Tesla leadership&rdquo; — all from different sources, zero dependency.</p>
          </div>
          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-900/40 bg-amber-50 dark:bg-amber-950/20 space-y-2">
            <p className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 uppercase">🐢 Sequential — if sub-tasks depend on each other</p>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">If sub-task B <em>cannot begin</em> until sub-task A returns a specific value — they must be sequential.</p>
            <p className="text-xs text-slate-600 dark:text-slate-500 italic">Example: &ldquo;Find the company that acquired DeepMind → Find products by THAT company.&rdquo; Step 2 needs Step 1&apos;s answer.</p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2"><Code2 className="w-5 h-5 text-teal-500" />2. How the Query Planner Works</h2>
        <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs border border-slate-800 overflow-x-auto">
          <pre>{`from langgraph.types import Send
from typing import TypedDict, Annotated, Literal
import operator

class PlannerOutput(TypedDict):
    sub_queries: list[str]
    strategy: Literal["sequential", "parallel"]

def query_planner_node(state):
    """Step 1: LLM decides the decomposition strategy."""
    plan = llm.with_structured_output(PlannerOutput).invoke(
        f"""Decompose this query into sub-queries and choose a strategy:
        
Query: {state["query"]}

Strategy rules:
- parallel: sub-queries are independent (different sources, no data dependencies)
- sequential: each sub-query needs the previous result to proceed

Return JSON with sub_queries list and strategy."""
    )
    return {"plan": plan}

def route_by_strategy(state):
    """Step 2: Execute the chosen strategy."""
    plan = state["plan"]
    if plan["strategy"] == "parallel":
        # Fan out — LangGraph runs all simultaneously
        return [Send("research", {"query": q}) for q in plan["sub_queries"]]
    else:
        # Return sequential marker — nodes execute one at a time
        return "sequential_research"

# Results field uses reducer — merges all parallel branch outputs
class AgentState(TypedDict):
    query: str
    plan: PlannerOutput
    results: Annotated[list[str], operator.add]
    final_answer: str`}</pre>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2"><Sparkles className="w-5 h-5 text-blue-500" />3. Interactive Plan Execution Lab</h2>
        </div>
        <PlanExecutionComparer />
      </section>

      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 space-y-2">
        <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-semibold text-sm"><Lightbulb className="w-4 h-4 text-blue-500 shrink-0" />Hybrid Plans Are the Real World</div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">Most production queries are neither purely sequential nor purely parallel — they&apos;re hybrid. &ldquo;Get competitor prices (parallel: A, B, C) → then compare them (sequential: needs all prices)&rdquo; is a classic fan-out/fan-in. Your planner LLM should be taught to produce these hybrid plans, not forced to choose one extreme.</p>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500" />Key Takeaways</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { title: "Independence = Parallel", body: "If sub-task B doesn't need sub-task A's output, they're independent. Use Send() to fan them out simultaneously." },
            { title: "Dependency = Sequential", body: "If sub-task B needs A's answer (like 'find X, then research X'), they must run in order. No shortcut." },
            { title: "Use an LLM Planner", body: "Don't hard-code the strategy. Use a structured output call to let the LLM analyze each query and choose sequential, parallel, or hybrid." },
          ].map((item) => (
            <div key={item.title} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
              <h3 className="text-xs font-bold text-blue-700 dark:text-blue-400">{item.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="space-y-4"><Module4_6Quiz /></section>
    </div>
  );
}
