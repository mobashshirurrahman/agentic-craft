"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  Check,
  ArrowRight,
  Brain,
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
  Network,
  RotateCw,
} from "lucide-react";
import DeepAgentPlannerWorkbench from "./DeepAgentPlannerWorkbench";
import Module3_7Quiz from "./Module3_7Quiz";

export default function Module3_7Content() {
  const [selectedPillar, setSelectedPillar] = useState<string>("hierarchy");
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [activeCodeTab, setActiveCodeTab] = useState<"code" | "output">("code");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);

  const pillars = [
    {
      id: "hierarchy",
      title: "1. Hierarchical Task Trees",
      tagline: "Recursive Goal Breakdown",
      desc: "Deep planning breaks complex missions into multi-level tree hierarchies with explicit dependencies (Task A must precede Task B and C).",
      icon: Network,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-500/10",
      border: "border-blue-200 dark:border-blue-500/30",
      badge: "Tree DAG",
      codeSnippet: `# 1. HIERARCHICAL TASK TREE SCHEMA
from pydantic import BaseModel, Field
from typing import List, Optional

class TaskNode(BaseModel):
    id: str
    title: str
    description: str
    dependencies: List[str] = Field(default_factory=list) # IDs that must finish first
    subtasks: List["TaskNode"] = Field(default_factory=list) # Recursive children
    status: str = "pending" # pending | running | completed | failed

class MasterPlanTree(BaseModel):
    project_goal: str
    root_tasks: List[TaskNode]

# Pydantic recursive self-reference update
TaskNode.model_rebuild()`,
    },
    {
      id: "search",
      title: "2. Tree Search & Exploration",
      tagline: "Evaluating Speculative Paths",
      desc: "Rather than committing immediately to the first action idea, deep planners simulate several hypothetical steps (Beam Search / MCTS), scoring their expected utility before executing.",
      icon: Brain,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-500/10",
      border: "border-purple-200 dark:border-purple-500/30",
      badge: "Speculative Simulation",
      codeSnippet: `# 2. SPECULATIVE TREE SEARCH (Beam Search of Candidates)
from langchain_openai import ChatOpenAI

evaluator_llm = ChatOpenAI(model="gpt-4o", temperature=0.7)

def evaluate_candidates(task: str, candidates: list[str]) -> str:
    """Evaluates multiple candidate execution strategies and picks highest utility."""
    prompt = f"""
    Task to accomplish: {task}
    Candidate strategies:
    {candidates}
    
    Score each candidate from 0.0 to 1.0 based on feasibility, safety, and efficiency.
    Return ONLY the index of the best winning strategy.
    """
    decision = evaluator_llm.invoke(prompt)
    return decision.content`,
    },
    {
      id: "backtracking",
      title: "3. State Backtracking",
      tagline: "Rewinding Dead Ends",
      desc: "When a tactical path fails (e.g. library installation incompatibility), shallow agents crash. Deep planners catch the failure, prune the branch, backtrack state, and try an alternate branch.",
      icon: RotateCw,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      border: "border-emerald-200 dark:border-emerald-500/30",
      badge: "State Rollback",
      codeSnippet: `# 3. BACKTRACKING & BRANCH RECOVERY IN LANGGRAPH
def branch_executor_node(state: DeepPlanState) -> dict:
    current_node = state["active_task"]
    
    try:
        result = execute_task(current_node)
        return {"completed_tasks": [current_node.id], "backtrack_stack": []}
    except ExecutionFailure as e:
        # Prune failing branch and pop previous checkpoint from stack
        previous_safe_state = state["backtrack_stack"][-1]
        print(f"⚠️ Branch failed: {e}. Backtracking to {previous_safe_state['step_name']}")
        return {
            "failed_branches": [current_node.id],
            "active_task": previous_safe_state["alternate_task"]
        }`,
    },
    {
      id: "subgraphs",
      title: "4. Hierarchical Subgraphs",
      tagline: "Parent-Child Graph Composition",
      desc: "In LangGraph, each subtask node can execute an entire encapsulated child StateGraph. The master graph maintains strategic oversight while child graphs handle domain tools.",
      icon: Layers,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      border: "border-amber-200 dark:border-amber-500/30",
      badge: "Nested Subgraphs",
      codeSnippet: `# 4. COMPOSING NESTED SUBGRAPHS IN LANGGRAPH
from langgraph.graph import StateGraph, START, END

# Define child research subgraph
research_builder = StateGraph(ResearchChildState)
research_builder.add_node("scrape", scrape_node)
research_builder.add_node("summarize", summarize_node)
research_builder.add_edge(START, "scrape")
research_builder.add_edge("scrape", "summarize")
research_builder.add_edge("summarize", END)
research_subgraph = research_builder.compile()

# Master Deep Planner graph embeds child graph as a single node
master_builder = StateGraph(MasterPlanState)
master_builder.add_node("planner", master_planner_node)
master_builder.add_node("research_specialist", research_subgraph)
master_builder.add_node("code_specialist", coding_subgraph)
master_builder.compile()`,
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
      <div className="rounded-2xl border border-blue-200 dark:border-blue-500/30 bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-slate-50 dark:to-slate-950 p-6 md:p-8 relative overflow-hidden transition-colors">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-500/30">
              Module 3.7 • Deep Planning Architecture
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              ~20 min interactive
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Implementing Deep Planning Agents
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Move beyond flat task lists. In this lesson, we implement <strong>Deep Planning Agents</strong>: building hierarchical task trees with explicit dependencies, speculative path search, branch backtracking, and nested LangGraph subgraphs.
          </p>
        </div>
      </div>

      {/* SECTION 1: 4 PILLARS OF DEEP PLANNING */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-500" />
            1. Core Mechanics of Deep Planning
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Select a deep planning concept
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
                    ? `${pillar.border} ${pillar.bg} shadow-md ring-1 ring-blue-500/50`
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
                  <div className="text-[11px] font-medium text-blue-600 dark:text-blue-400">
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
            <Code2 className="w-4 h-4 text-blue-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white font-mono uppercase tracking-wider">
              Deep Planner Code Inspector
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={runSimulation}
              disabled={isSimulating}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-xs disabled:opacity-50 transition-all cursor-pointer"
            >
              {isSimulating ? (
                <>
                  <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                  <span>Traversing Tree...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Simulate Tree Execution</span>
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
                deep_planning.py • {selectedPillar}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveCodeTab("code")}
                className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition-all ${
                  activeCodeTab === "code"
                    ? "bg-blue-600/30 text-blue-300 border border-blue-500/40"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Code
              </button>
              <button
                onClick={() => setActiveCodeTab("output")}
                className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition-all ${
                  activeCodeTab === "output"
                    ? "bg-blue-600/30 text-blue-300 border border-blue-500/40"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Hierarchical Trace
              </button>
            </div>
          </div>

          <div className="p-4 overflow-x-auto text-slate-300 leading-relaxed font-mono">
            {activeCodeTab === "code" ? (
              <pre>
                <code>{currentSnippet}</code>
              </pre>
            ) : (
              <div className="space-y-2 text-blue-300 font-mono text-[11px]">
                <p className="text-slate-400">$ python run_deep_planner.py --task "Build and deploy Next.js auth feature"</p>
                <p className="text-purple-300">[Master Tree Planner] Built 2 root tasks with 4 leaf subtasks:</p>
                <p className="text-slate-300">&gt;&gt; Root 1: Backend Auth (dep: none) -&gt; Leaf 1.1: DB Schema, Leaf 1.2: API Route</p>
                <p className="text-slate-300">&gt;&gt; Root 2: Frontend Auth (dep: Root 1) -&gt; Leaf 2.1: LoginForm, Leaf 2.2: Middleware</p>
                <p className="text-sky-300">[Child Subgraph: Backend] Leaf 1.1 executed: Supabase schema migrated ✅</p>
                <p className="text-amber-300">[Branch Check] Leaf 1.2 test failed -&gt; Backtracking triggered! Alternate auth method selected.</p>
                <p className="text-emerald-400 font-bold">&gt;&gt; Root 1 completed. Root 2 unblocked and executed successfully!</p>
              </div>
            )}
          </div>
        </div>

        {/* Simulation Banner */}
        {simStep > 0 && (
          <div className="p-3.5 rounded-xl border border-blue-200 dark:border-blue-500/30 bg-blue-50/80 dark:bg-blue-950/30 flex items-center justify-between text-xs font-mono">
            <span className="text-blue-800 dark:text-blue-200">
              {simStep === 1 && "Master Planner recursively generates multi-level TaskNode tree DAG"}
              {simStep === 2 && "Dependency resolver unblocks tasks with completed prerequisite IDs"}
              {simStep === 3 && "Leaf subtask delegates to specialized LangGraph child subgraph"}
              {simStep === 4 && "Child completes -> Parent state updates -> Backtrack stack safely cleared!"}
            </span>
            <span className="text-blue-600 dark:text-blue-400 font-bold">
              Step {simStep}/4
            </span>
          </div>
        )}
      </section>

      {/* SECTION 3: INTERACTIVE STUDIO */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-500" />
            2. Interactive Deep Agent Planner Workbench
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Hierarchical DAG Inspector
          </span>
        </div>
        <DeepAgentPlannerWorkbench />
      </section>

      {/* SECTION 4: HANDWRITTEN NOTE */}
      <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-500/30 bg-blue-50/90 dark:bg-blue-500/10 shadow-sm">
        <span className="font-['Caveat',cursive] text-base text-blue-950 dark:text-blue-200 block">
          📌 Engineering Rule: The difference between an amateur agent and an enterprise agent is Backtracking. Amateur agents crash and give up when step 4 encounters a 403 Forbidden. Deep planning agents rewind to step 3, identify an alternate route, and complete the objective autonomously!
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
              TRAP #1: Circular Dependency Deadlocks
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Allowing the planner to output circular dependencies (Task A depends on Task B, while Task B depends on Task A) permanently freezes the scheduler. Always run a topological sort (Cycle Detection) on the plan graph before dispatching tasks.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-500/5 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
              TRAP #2: Combinatorial Explosion in Search Trees
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Exploring all potential action paths with depth=5 and branching_factor=4 requires 1,024 LLM evaluations. Always enforce beam pruning (keeping only top 2 candidates per level) and set hard timeout ceilings on speculative evaluation.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6: KEY TAKEAWAYS */}
      <section className="rounded-xl border border-blue-200 dark:border-blue-500/30 bg-blue-50/50 dark:bg-blue-500/5 p-5 space-y-3">
        <h4 className="font-bold text-sm text-blue-900 dark:text-blue-300 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          Key Architectural Takeaways
        </h4>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          {[
            ["1.", "Tree Over Lists:", "Complex real-world tasks have prerequisite constraints. Modeling them as a DAG or tree ensures subtasks execute in valid logical order."],
            ["2.", "Fail-Safe Backtracking:", "Maintaining state snapshots enables agents to backtrack from dead-ends rather than hallucinating answers when a tool fails."],
            ["3.", "Modular Subgraphs:", "Breaking monolithic agents into a master planner and specialist subgraphs improves debuggability, latency, and code reuse."],
          ].map(([n, bold, rest]) => (
            <li key={n} className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400 font-bold">{n}</span>
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
            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                Concept Check: Deep Planning
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {showQuiz ? "Click to collapse" : "Test your understanding of tree search and backtracking (3 questions)"}
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-semibold px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30">
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
              <Module3_7Quiz />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* SECTION 8: NEXT MODULE BRIDGE */}
      <section className="rounded-2xl border border-blue-200 dark:border-blue-500/30 bg-gradient-to-r from-blue-50 via-white to-slate-50 dark:from-blue-500/10 dark:via-slate-900 dark:to-slate-950 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">
            <span>Up Next • Module 3.8</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Adding Human-in-the-Loop Checkpoints</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
            Never let an AI agent execute financial transfers or delete databases without permission. Master LangGraph breakpoints, interrupts, state mutation, and human approval flows.
          </p>
        </div>
        <Link
          href="/learn/level-3/module-3-8"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow-blue-500/20 transition-all shrink-0 cursor-pointer"
        >
          <span>Continue to Module 3.8</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
