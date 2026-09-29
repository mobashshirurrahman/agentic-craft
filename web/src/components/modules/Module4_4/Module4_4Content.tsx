"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  Check,
  ArrowRight,
  GitBranch,
  Layers,
  Sparkles,
  HelpCircle,
  Copy,
  CheckCheck,
  Play,
  RotateCcw,
  FileText,
  AlertTriangle,
  Code2,
  Workflow,
  Cpu,
  Package,
  FolderGit2,
} from "lucide-react";
import SubgraphWorkbench from "./SubgraphWorkbench";
import Module4_4Quiz from "./Module4_4Quiz";

export default function Module4_4Content() {
  const [selectedPillar, setSelectedPillar] = useState<string>("encapsulation");
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [activeCodeTab, setActiveCodeTab] = useState<"code" | "output">("code");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);

  const pillars = [
    {
      id: "encapsulation",
      title: "1. Graph Encapsulation",
      tagline: "Compiled Graphs as Nodes",
      desc: "In LangGraph, any compiled StateGraph is a valid node function. You can embed an entire 5-node research workflow as a single black-box node inside a master graph.",
      icon: Package,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      border: "border-amber-200 dark:border-amber-500/30",
      badge: "add_node(subgraph)",
      codeSnippet: `# 1. CREATING AND EMBEDDING A SUBGRAPH
from langgraph.graph import StateGraph, START, END

# Define child research graph
research_builder = StateGraph(ResearchChildState)
research_builder.add_node("query_api", query_node)
research_builder.add_node("parse_results", parse_node)
research_builder.add_edge(START, "query_api")
research_builder.add_edge("query_api", "parse_results")
research_builder.add_edge("parse_results", END)

# Compile the child graph
research_subgraph = research_builder.compile()

# Parent graph embeds child as a standard node!
parent_builder = StateGraph(ParentState)
parent_builder.add_node("research_phase", research_subgraph)
parent_builder.add_node("summary_phase", summary_node)
parent_builder.add_edge(START, "research_phase")
parent_builder.add_edge("research_phase", "summary_phase")
parent_app = parent_builder.compile()`,
    },
    {
      id: "schemas",
      title: "2. Isolated State Schemas",
      tagline: "Zero State Bleed",
      desc: "Child subgraphs define their own private TypedDict schemas. Internal scratchpad variables like raw_html_dumps stay quarantined inside the child and never clutter parent state.",
      icon: Layers,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-500/10",
      border: "border-blue-200 dark:border-blue-500/30",
      badge: "Scoped TypedDict",
      codeSnippet: `# 2. PRIVATE SCHEMA VS PUBLIC CONTRACT
from typing import TypedDict, List

# Parent state only cares about high-level inputs and outputs
class ParentState(TypedDict):
    topic: str
    final_report: str

# Child state contains internal temporary scratchpad keys:
class ResearchChildState(TypedDict):
    topic: str             # Inherited from parent
    raw_html_payloads: list # ⚠️ Isolated: Does NOT bleed to ParentState!
    filtered_facts: list
    final_report: str      # Output returned back to parent`,
    },
    {
      id: "reusability",
      title: "3. Modular Reusability",
      tagline: "Plug-and-Play Phases",
      desc: "Package complex functionality (like code syntax verification or web scraping) into a single reusable subgraph and plug it across 10 different production agent pipelines.",
      icon: FolderGit2,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-500/10",
      border: "border-purple-200 dark:border-purple-500/30",
      badge: "Modular Component",
      codeSnippet: `# 3. REUSABLE SUBGRAPH LIBRARY (common/verifiers.py)
# Build once, use in CustomerSupport, CodingAgent, and SalesAgent!
def create_verification_subgraph():
    builder = StateGraph(VerifyState)
    builder.add_node("lint", lint_node)
    builder.add_node("security_audit", security_node)
    builder.add_edge(START, "lint")
    builder.add_edge("lint", "security_audit")
    builder.add_edge("security_audit", END)
    return builder.compile()

# In your agent code:
app_builder.add_node("verify_code", create_verification_subgraph())`,
    },
    {
      id: "observability",
      title: "4. Hierarchical Tracing",
      tagline: "Nested Traces in LangSmith",
      desc: "Unlike a raw Python function, subgraphs preserve full LangGraph runtime observability: nested execution spans, independent checkpoints, and child-level breakpoints.",
      icon: Workflow,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      border: "border-emerald-200 dark:border-emerald-500/30",
      badge: "Nested Spans",
      codeSnippet: `# 4. OBSERVABILITY AND NESTED CHECKPOINTING
# In LangSmith and execution logs:
# Parent Run: 'MasterAgent'
#   ├── Node: 'initialize' (12ms)
#   ├── Subgraph: 'research_phase' (450ms)
#   │     ├── Node: 'query_api' (210ms)
#   │     └── Node: 'parse_results' (140ms)
#   └── Node: 'summary_phase' (310ms)
#
# Each child node has its own distinct latency and error boundaries!`,
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
      <div className="rounded-2xl border border-amber-200 dark:border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-indigo-500/5 to-slate-50 dark:to-slate-950 p-6 md:p-8 relative overflow-hidden transition-colors">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30">
              Module 4.4 • Modular Architecture
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              ~20 min interactive
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Structuring Workflows with Subgraphs
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Prevent 30-node monolithic graphs from becoming unmaintainable. In this lesson, we master <strong>LangGraph Subgraphs</strong>: compiling reusable workflows into discrete nodes with isolated state schemas and nested execution tracing.
          </p>
        </div>
      </div>

      {/* SECTION 1: 4 PILLARS OF SUBGRAPHS */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-amber-500" />
            1. Core Mechanics of Subgraph Composition
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Select a subgraph principle to inspect
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
              Subgraph Composition Inspector
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
                  <span>Entering Subgraph...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Simulate Nested Run</span>
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
                subgraph_composition.py • {selectedPillar}
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
                Nested Spans Trace
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
                <p className="text-slate-400">[Parent Graph] START --&gt; Entering node: &apos;research_phase&apos;</p>
                <p className="text-purple-300">  [Child Subgraph] Initializing ResearchChildState with topic=&apos;Quantum Computing&apos;</p>
                <p className="text-blue-300">  [Child Subgraph: query_api] 4 articles fetched into raw_html_payloads</p>
                <p className="text-blue-300">  [Child Subgraph: parse_results] Filtered to 5 key facts</p>
                <p className="text-purple-300">  [Child Subgraph] END -&gt; Returning final_report. Scratchpad destroyed.</p>
                <p className="text-emerald-400 font-bold">[Parent Graph] Node &apos;research_phase&apos; complete -&gt; Moving to &apos;summary_phase&apos;</p>
              </div>
            )}
          </div>
        </div>

        {/* Simulation Banner */}
        {simStep > 0 && (
          <div className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/80 dark:bg-amber-950/30 flex items-center justify-between text-xs font-mono">
            <span className="text-amber-800 dark:text-amber-200">
              {simStep === 1 && "Parent graph reaches subgraph node -> Maps ParentState inputs to ChildState"}
              {simStep === 2 && "Child graph executes internal nodes with private memory channels"}
              {simStep === 3 && "Child reaches END -> Emits clean output keys back to ParentState"}
              {simStep === 4 && "Parent resumes execution flow seamlessly with zero state pollution!"}
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
            2. Interactive Subgraph Workbench
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Modular Composition Visualizer
          </span>
        </div>
        <SubgraphWorkbench />
      </section>

      {/* SECTION 4: HANDWRITTEN NOTE */}
      <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/90 dark:bg-amber-500/10 shadow-sm">
        <span className="font-['Caveat',cursive] text-base text-amber-950 dark:text-amber-200 block">
          📌 Software Engineering Analogy: Writing an entire multi-phase agent in one giant StateGraph is like writing your entire web backend in one 3,000-line main.py file. Subgraphs are your modules — test each phase independently in pytest, then assemble!
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
              TRAP #1: Forgetting to Compile the Child Graph
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Passing an uncompiled <code>StateGraph</code> builder to <code>parent.add_node(&quot;child&quot;, child_builder)</code> raises a TypeError. You must call <code>child_builder.compile()</code> before attaching it as a node to the parent graph.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-500/5 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
              TRAP #2: Shared Key Overwrite Collisions
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              If both parent and child have a key named <code>&quot;messages&quot;</code> with different reducers, data may be overwritten unexpectedly. Use distinct key names or inherit from parent schema to maintain alignment.
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
            ["1.", "Modularity & Testability:", "Subgraphs can be unit-tested in isolation with pytest before plugging into the master orchestrator."],
            ["2.", "State Hygiene:", "Child graphs keep temporary variables quarantined, keeping parent state clean and predictable."],
            ["3.", "Enterprise Reusability:", "Standardized subgraphs can be shared across multiple agent workflows in an organization."],
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
                Concept Check: Subgraphs
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {showQuiz ? "Click to collapse" : "Test your understanding of graph modularity (3 questions)"}
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
              <Module4_4Quiz />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* SECTION 8: NEXT MODULE BRIDGE */}
      <section className="rounded-2xl border border-amber-200 dark:border-amber-500/30 bg-gradient-to-r from-amber-50 via-white to-slate-50 dark:from-amber-500/10 dark:via-slate-900 dark:to-slate-950 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
            <span>Up Next • Module 4.5</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Implementing Parallel Task Execution in LangGraph</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
            Why wait sequentially for 5 API calls? Discover LangGraph&apos;s parallel branch execution, fan-out / fan-in topology, and concurrent state reduction.
          </p>
        </div>
        <Link
          href="/learn/level-4/module-4-5"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow-amber-500/20 transition-all shrink-0 cursor-pointer"
        >
          <span>Continue to Module 4.5</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
