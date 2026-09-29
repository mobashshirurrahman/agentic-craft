"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  Check,
  ArrowRight,
  Zap,
  Code2,
  Layers,
  Sparkles,
  HelpCircle,
  Copy,
  CheckCheck,
  Play,
  RotateCcw,
  FileText,
  AlertTriangle,
  GitFork,
  FastForward,
  Cpu,
  Clock,
} from "lucide-react";
import ParallelExecutionBenchmark from "./ParallelExecutionBenchmark";
import Module4_5Quiz from "./Module4_5Quiz";

export default function Module4_5Content() {
  const [selectedPillar, setSelectedPillar] = useState<string>("send");
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [activeCodeTab, setActiveCodeTab] = useState<"code" | "output">("code");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);

  const pillars = [
    {
      id: "send",
      title: "1. Dynamic Fan-Out with Send()",
      tagline: "Map-Reduce at Runtime",
      desc: "When an agent generates N items dynamically (e.g. 5 sub-topics to research), use LangGraph's Send() API to spawn N parallel node executions concurrently.",
      icon: GitFork,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      border: "border-amber-200 dark:border-amber-500/30",
      badge: "Send('node', state)",
      codeSnippet: `# 1. DYNAMIC FAN-OUT WITH LANGGRAPH Send()
from langgraph.constants import Send
from langgraph.graph import StateGraph, START, END

def fan_out_topics(state: ResearchState):
    """Spawns parallel worker executions for every discovered topic."""
    topics = state["topics_to_investigate"]
    # Returns a list of Send objects — LangGraph runs them concurrently!
    return [Send("research_worker", {"topic": t}) for t in topics]

builder = StateGraph(ResearchState)
builder.add_node("planner", planner_node)
builder.add_node("research_worker", worker_node)
builder.add_node("synthesizer", synthesis_node)

builder.add_conditional_edges("planner", fan_out_topics, ["research_worker"])
builder.add_edge("research_worker", "synthesizer")
builder.add_edge("synthesizer", END)`,
    },
    {
      id: "static_branches",
      title: "2. Static Parallel Edges",
      tagline: "Concurrent Fixed Branches",
      desc: "Wiring multiple destination nodes from a single source node instructs LangGraph's Pregel runtime to execute all branches in parallel automatically.",
      icon: FastForward,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-500/10",
      border: "border-blue-200 dark:border-blue-500/30",
      badge: "Multiple add_edge()",
      codeSnippet: `# 2. STATIC PARALLEL BRANCHES
# Node 'orchestrator' triggers both sentiment AND financial analysis concurrently:
builder.add_edge("orchestrator", "analyze_sentiment")
builder.add_edge("orchestrator", "analyze_financials")

# Fan-in: Synthesizer waits until BOTH parallel nodes finish!
builder.add_edge("analyze_sentiment", "synthesizer")
builder.add_edge("analyze_financials", "synthesizer")`,
    },
    {
      id: "reducers",
      title: "3. Fan-In State Reducers",
      tagline: "Thread-Safe State Merges",
      desc: "When 3 parallel nodes complete simultaneously, they all return state deltas. Using Annotated[list, operator.add] ensures their outputs merge cleanly without race condition overwrites.",
      icon: Layers,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-500/10",
      border: "border-purple-200 dark:border-purple-500/30",
      badge: "operator.add Reducer",
      codeSnippet: `# 3. FAN-IN REDUCER GUARANTEES NO RACE CONDITIONS
from typing import TypedDict, Annotated, List
import operator

class ParallelState(TypedDict):
    query: str
    # ⚠️ CRITICAL: Must use a reducer like operator.add
    # Parallel returns: nodeA -> ['fact 1'], nodeB -> ['fact 2']
    # Merged result: ['fact 1', 'fact 2'] seamlessly!
    collected_facts: Annotated[List[str], operator.add]
    final_summary: str`,
    },
    {
      id: "latency",
      title: "4. Latency Optimization",
      tagline: "3x Latency Compression",
      desc: "Sequential execution of 3 tools taking 1.5s each results in 4.5s latency. Running them concurrently with parallel fan-out compresses total time to ~1.6s.",
      icon: Clock,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      border: "border-emerald-200 dark:border-emerald-500/30",
      badge: "Amdahl's Gain",
      codeSnippet: `# 4. BENCHMARK COMPARISON
# Sequential: Task 1 (1.4s) -> Task 2 (1.3s) -> Task 3 (1.5s) = 4.2s total
# Parallel:   max(Task 1, Task 2, Task 3) + 0.1s overhead    = 1.6s total

# 62% latency reduction achieved simply by removing artificial sequential edges!`,
    },
  ];

  const currentSnippet = pillars.find((p) => p.id === selectedPillar)?.codeSnippet || "";

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const runSimulation = () => {
    setIsSimulating(true);
    setSimStep(1);
    setTimeout(() => setSimStep(2), 700);
    setTimeout(() => setSimStep(3), 1400);
    setTimeout(() => {
      setSimStep(4);
      setIsSimulating(false);
    }, 2100);
  };

  return (
    <div className="space-y-10">
      {/* HERO BANNER */}
      <div className="rounded-2xl border border-amber-200 dark:border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-emerald-500/5 to-slate-50 dark:to-slate-950 p-6 md:p-8 relative overflow-hidden transition-colors">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30">
              Module 4.5 • Concurrency & Scale
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              ~20 min interactive
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Implementing Parallel Task Execution in LangGraph
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Never wait sequentially for independent tasks. In this lesson, we master <strong>parallel execution in LangGraph</strong>: dispatching dynamic fan-out tasks with <code>Send()</code>, synchronizing fan-in branches, and resolving concurrent state reducers.
          </p>
        </div>
      </div>

      {/* SECTION 1: 4 PILLARS OF PARALLEL EXECUTION */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-amber-500" />
            1. Core Mechanics of Parallel Execution
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Select a concurrency pattern
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            const isSelected = selectedPillar === pillar.id;
            return (
              <button
                key={pillar.id}
                onClick={() => setSelectedPillar(pillar.id)}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? `${pillar.border} ${pillar.bg} shadow-md ring-1 ring-amber-500/50`
                    : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className={`p-2 rounded-lg ${pillar.bg} ${pillar.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 font-semibold">
                      {pillar.badge}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    {pillar.title}
                  </h3>
                  <div className="text-[11px] font-medium text-amber-600 dark:text-amber-400">
                    {pillar.tagline}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* SECTION 2: CODE & EXECUTION INSPECTOR */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-amber-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white font-mono uppercase tracking-wider">
              Parallel Execution Inspector
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={runSimulation}
              disabled={isSimulating}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold shadow-xs disabled:opacity-50 transition-all cursor-pointer"
            >
              {isSimulating ? (
                <>
                  <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                  <span>Fanning Out...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Simulate Fan-Out</span>
                </>
              )}
            </button>
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 text-slate-600 dark:text-slate-400 text-xs font-mono transition-all cursor-pointer"
            >
              {copiedCode ? <CheckCheck className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? "Copied" : "Copy"}</span>
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden text-xs font-mono shadow-md">
          <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800/80 bg-slate-900/60">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
              <span className="text-slate-400 text-[11px] ml-2 font-mono">
                parallel_execution.py • {selectedPillar}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveCodeTab("code")}
                className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition-all ${
                  activeCodeTab === "code"
                    ? "bg-amber-600/30 text-amber-300 border border-amber-500/40"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Code
              </button>
              <button
                onClick={() => setActiveCodeTab("output")}
                className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition-all ${
                  activeCodeTab === "output"
                    ? "bg-amber-600/30 text-amber-300 border border-amber-500/40"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Execution Benchmark
              </button>
            </div>
          </div>

          <div className="p-4 overflow-x-auto text-slate-300 leading-relaxed font-mono">
            {activeCodeTab === "code" ? (
              <pre>
                <code>{currentSnippet}</code>
              </pre>
            ) : (
              <div className="space-y-2 text-amber-300 font-mono text-[11px]">
                <p className="text-slate-400">[Planner] Identified 3 independent research targets</p>
                <p className="text-purple-300">&gt;&gt; [Fan-Out Triggered] Spawning 3 concurrent Send() tasks:</p>
                <p className="text-sky-300">   • [Worker 1] Querying Tesla Q3 revenue (1.2s)</p>
                <p className="text-sky-300">   • [Worker 2] Querying BYD Q3 market share (1.4s)</p>
                <p className="text-sky-300">   • [Worker 3] Querying Analyst sentiment (1.1s)</p>
                <p className="text-emerald-400">[Fan-In Barrier] All 3 tasks resolved. State reducer aggregated results.</p>
                <p className="text-emerald-300 font-bold">&gt;&gt; Total execution completed in 1.45s (vs 3.7s sequential)!</p>
              </div>
            )}
          </div>
        </div>

        {/* Simulation Banner */}
        {simStep > 0 && (
          <div className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/80 dark:bg-amber-950/30 flex items-center justify-between text-xs font-mono">
            <span className="text-amber-800 dark:text-amber-200">
              {simStep === 1 && "Planner node analyzes goal -> Decomposes into 3 parallel subtasks"}
              {simStep === 2 && "Send() maps 3 separate worker instances into the async runtime"}
              {simStep === 3 && "Workers execute concurrently across event loop without blocking each other"}
              {simStep === 4 && "Fan-in node synchronizes results via operator.add reducer!"}
            </span>
            <span className="text-amber-600 dark:text-amber-400 font-bold">
              Step {simStep}/4
            </span>
          </div>
        )}
      </section>

      {/* SECTION 3: INTERACTIVE STUDIO */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            2. Interactive Parallel Execution Benchmark
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Sequential vs Parallel Live Simulator
          </span>
        </div>
        <ParallelExecutionBenchmark />
      </section>

      {/* SECTION 4: HANDWRITTEN NOTE */}
      <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/90 dark:bg-amber-500/10 shadow-sm">
        <span className="font-['Caveat',cursive] text-base text-amber-950 dark:text-amber-200 block">
          📌 Amdahl&apos;s Law in AI: An agent that calls 4 APIs sequentially feels slow, sluggish, and broken to users. Fanning out with Send() makes your agent feel instantaneous by running all 4 calls within the latency envelope of the single slowest call!
        </span>
      </div>

      {/* SECTION 5: TRAPS & PITFALLS */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          Common Engineering Traps
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-500/30 bg-rose-50/50 dark:bg-rose-500/5 space-y-2">
            <span className="text-xs font-mono font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider block">
              TRAP #1: Missing Reducer on Fan-In State
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              If two parallel nodes return <code>{`{"results": [...]}`}</code> without an additive reducer, the last node to finish overwrites the first node&apos;s data. Always annotate parallel channels with <code>Annotated[list, operator.add]</code>.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-500/5 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
              TRAP #2: Spawning Unbounded Parallel Calls
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Fanning out 50 Send() tasks simultaneously will trip external API rate limits (HTTP 429) instantly. Use an <code>asyncio.Semaphore(5)</code> inside the worker to cap maximum concurrent in-flight requests.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6: KEY TAKEAWAYS */}
      <section className="rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-500/5 p-5 space-y-3">
        <h4 className="font-bold text-sm text-amber-900 dark:text-amber-300 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          Key Architectural Takeaways
        </h4>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          {[
            ["1.", "Send() for Dynamic Fan-Out:", "Spawn dynamic numbers of parallel workers determined at runtime by the model."],
            ["2.", "Pregel Automatic Synchronization:", "LangGraph handles fan-in synchronization automatically, ensuring the downstream node waits for all parallel branches."],
            ["3.", "Massive Latency Reduction:", "Compress execution time from the sum of all tasks to the maximum duration of the single slowest task."],
          ].map(([n, bold, rest]) => (
            <li key={n} className="flex items-start gap-2">
              <span className="text-amber-600 dark:text-amber-400 font-bold">{n}</span>
              <span><strong>{bold}</strong> {rest}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* SECTION 7: QUIZ */}
      <section className="space-y-3">
        <button
          onClick={() => setShowQuiz(!showQuiz)}
          className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all text-left cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                Concept Check: Parallel Execution
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {showQuiz ? "Click to collapse" : "Test your understanding of fan-out and fan-in (3 questions)"}
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-semibold px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30">
            {showQuiz ? "Hide Quiz" : "Start Quiz"}
          </span>
        </button>
        <AnimatePresence>
          {showQuiz && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Module4_5Quiz />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* SECTION 8: NEXT MODULE BRIDGE */}
      <section className="rounded-2xl border border-amber-200 dark:border-amber-500/30 bg-gradient-to-r from-amber-50 via-white to-slate-50 dark:from-amber-500/10 dark:via-slate-900 dark:to-slate-950 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
            <span>Up Next • Module 4.6</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Comparing Sequential and Parallel Plan Execution</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
            When does parallel execution help, and when does it hurt? Learn how to calculate dependency graphs and choose the optimal execution strategy for cost, latency, and tokens.
          </p>
        </div>
        <Link
          href="/learn/level-4/module-4-6"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow-amber-500/20 transition-all shrink-0 cursor-pointer"
        >
          <span>Continue to Module 4.6</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
