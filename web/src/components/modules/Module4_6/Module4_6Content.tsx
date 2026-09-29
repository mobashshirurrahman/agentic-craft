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
  Zap,
  BarChart3,
  Network,
} from "lucide-react";
import PlanExecutionComparer from "./PlanExecutionComparer";
import Module4_6Quiz from "./Module4_6Quiz";

export default function Module4_6Content() {
  const [selectedPillar, setSelectedPillar] = useState<string>("dependencies");
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [activeCodeTab, setActiveCodeTab] = useState<"code" | "output">("code");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);

  const pillars = [
    {
      id: "dependencies",
      title: "1. The Dependency Test",
      tagline: "Sequential vs Parallel Criteria",
      desc: "If Subtask B requires the return value of Subtask A (e.g. 'Find CEO of Acme' -> 'Search CEO's college'), execution MUST be sequential. If independent, it must be parallel.",
      icon: GitBranch,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      border: "border-amber-200 dark:border-amber-500/30",
      badge: "Dependency Test",
      codeSnippet: `# 1. DEPENDENCY TEST EVALUATION
def is_independent(task_a: dict, task_b: dict) -> bool:
    """Returns True if task_b does not consume any outputs produced by task_a."""
    return not any(dep in task_a["outputs"] for dep in task_b.get("depends_on", []))

# Independent Example:
# Task A: "Fetch Tesla Q3 deliveries"
# Task B: "Fetch BYD Q3 deliveries"
# -> Independent! Run parallel.

# Dependent Example:
# Task 1: "Find founder of DeepMind" -> output: 'Demis Hassabis'
# Task 2: "Find books written by <founder>" -> Depends on Task 1! Run sequential.`,
    },
    {
      id: "hybrid_waves",
      title: "2. Hybrid Wave Execution",
      tagline: "Staged Topological Batches",
      desc: "Real-world plans are rarely 100% sequential or 100% parallel. They execute in waves: Wave 1 (fetch data concurrently) -> Wave 2 (synthesize) -> Wave 3 (dispatch actions in parallel).",
      icon: Layers,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-500/10",
      border: "border-blue-200 dark:border-blue-500/30",
      badge: "Wave-Based DAG",
      codeSnippet: `# 2. WAVE-BASED SCHEDULER IN LANGGRAPH
# Wave 1: 3 parallel data retrievers
builder.add_edge(START, "fetch_pricing")
builder.add_edge(START, "fetch_reviews")
builder.add_edge(START, "fetch_inventory")

# Wave 2: Synchronization Barrier (Fan-in)
builder.add_edge("fetch_pricing", "compare_data")
builder.add_edge("fetch_reviews", "compare_data")
builder.add_edge("fetch_inventory", "compare_data")

# Wave 3: Final Synthesis
builder.add_edge("compare_data", "generate_pdf_report")
builder.add_edge("generate_pdf_report", END)`,
    },
    {
      id: "cost_dynamics",
      title: "3. Cost & Token Dynamics",
      tagline: "Parallel vs Sequential Tradeoffs",
      desc: "Parallel plans compress wall-clock latency, but sequential plans can early-exit. If Step 1 solves the user's question, sequential stops immediately, saving tokens.",
      icon: BarChart3,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-500/10",
      border: "border-purple-200 dark:border-purple-500/30",
      badge: "Token Economics",
      codeSnippet: `# 3. EARLY EXIT ADVANTAGE OF SEQUENTIAL PLANS
def sequential_runner(steps: list, context: dict):
    for step in steps:
        result = execute_step(step, context)
        context.update(result)
        
        # Early-exit condition: Did step 1 directly answer the query?
        if context.get("is_conclusive"):
            print("Early exit triggered! Saved tokens on remaining steps.")
            return context["final_answer"]
            
    return context["final_answer"]`,
    },
    {
      id: "dag_planner",
      title: "4. Dynamic DAG Planner",
      tagline: "Topological Sort Planning",
      desc: "Advanced planners emit a list of tasks where each task specifies depends_on=['task_id']. A topological sorter automatically groups tasks into parallel execution waves.",
      icon: Network,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      border: "border-emerald-200 dark:border-emerald-500/30",
      badge: "Topological Planner",
      codeSnippet: `# 4. PYDANTIC DAG PLAN SCHEMA
from pydantic import BaseModel, Field

class DAGSubtask(BaseModel):
    id: str
    description: str
    depends_on: list[str] = Field(default_factory=list)

class ExecutionPlan(BaseModel):
    tasks: list[DAGSubtask]

# Planner prompt:
# "Decompose the goal into tasks. Only set depends_on if a task strictly
# needs another task's output data. Independent tasks must have depends_on=[]"`,
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
      <div className="rounded-2xl border border-amber-200 dark:border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-blue-500/5 to-slate-50 dark:to-slate-950 p-6 md:p-8 relative overflow-hidden transition-colors">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30">
              Module 4.6 • Execution Strategies
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              ~20 min interactive
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Comparing Sequential and Parallel Plan Execution
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Decomposing tasks is only half the battle. In this lesson, we compare <strong>Sequential vs Parallel plan execution</strong>: applying the data dependency test, scheduling hybrid wave-based DAGs, and balancing token costs against latency.
          </p>
        </div>
      </div>

      {/* SECTION 1: 4 PILLARS OF PLAN COMPARISON */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-amber-500" />
            1. Core Decision Framework
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Select a strategy component
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
              Strategy Benchmark Inspector
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
                  <span>Comparing Paths...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Simulate Plan Comparer</span>
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
                plan_comparer.py • {selectedPillar}
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
                Scheduler Trace
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
                <p className="text-slate-400">[Planner] Analyzing query: &apos;Compare features of 3 CRM vendors and email findings&apos;</p>
                <p className="text-purple-300">&gt;&gt; Dependency graph built:</p>
                <p className="text-sky-300">   • Wave 1 (Parallel): [Fetch Hubspot, Fetch Salesforce, Fetch Zoho] - 0 dependencies</p>
                <p className="text-sky-300">   • Wave 2 (Sequential): [Synthesize comparison table] - depends on Wave 1</p>
                <p className="text-sky-300">   • Wave 3 (Sequential): [Draft & send email] - depends on Wave 2</p>
                <p className="text-emerald-400 font-bold">&gt;&gt; Hybrid plan completed in 2.1s (Pure sequential would take 6.4s)!</p>
              </div>
            )}
          </div>
        </div>

        {/* Simulation Banner */}
        {simStep > 0 && (
          <div className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/80 dark:bg-amber-950/30 flex items-center justify-between text-xs font-mono">
            <span className="text-amber-800 dark:text-amber-200">
              {simStep === 1 && "Planner generates subtasks and marks input/output dependencies"}
              {simStep === 2 && "Scheduler isolates independent tasks into Wave 1 parallel batch"}
              {simStep === 3 && "Dependent tasks queued behind synchronization barriers"}
              {simStep === 4 && "Execution completes with minimum possible latency and zero race conditions!"}
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
            2. Interactive Plan Execution Comparer
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Sequential vs Parallel vs Hybrid Sandbox
          </span>
        </div>
        <PlanExecutionComparer />
      </section>

      {/* SECTION 4: HANDWRITTEN NOTE */}
      <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/90 dark:bg-amber-500/10 shadow-sm">
        <span className="font-['Caveat',cursive] text-base text-amber-950 dark:text-amber-200 block">
          📌 The Gold Standard: Never choose 100% sequential or 100% parallel. The best production agents are Hybrid Wave Planners: fan-out parallel for research, collapse into a single sequential synthesis node, and fan-out parallel for notifications!
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
              TRAP #1: Running Dependent Tasks in Parallel
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Forcing Task B (&quot;Find CEO&apos;s email&quot;) to run concurrently with Task A (&quot;Who is the CEO of Acme?&quot;) results in Task B hallucinating an email address because Task A hasn&apos;t identified the person yet. Respect dataflow dependencies strictly.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-500/5 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
              TRAP #2: Ignoring Early Exit Opportunities
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              In parallel execution, you pay token costs for ALL tasks even if the first subtask answers the question. If checking an in-memory cache could answer the query instantly, run that sequentially first before fanning out expensive web searches.
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
            ["1.", "Dataflow Independence:", "Only tasks whose inputs do not depend on sibling outputs should run in parallel."],
            ["2.", "Wave-Based Architecture:", "Group subtasks into topological waves to achieve maximum parallelism without causality violations."],
            ["3.", "Latency vs Token Optimization:", "Use parallel execution for user-facing interactive queries, and sequential early-exit plans for cost-sensitive batch jobs."],
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
                Concept Check: Plan Execution
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {showQuiz ? "Click to collapse" : "Test your understanding of sequential and parallel planning (3 questions)"}
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
              <Module4_6Quiz />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* SECTION 8: NEXT MODULE BRIDGE */}
      <section className="rounded-2xl border border-amber-200 dark:border-amber-500/30 bg-gradient-to-r from-amber-50 via-white to-slate-50 dark:from-amber-500/10 dark:via-slate-900 dark:to-slate-950 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
            <span>Up Next • Module 4.7</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Developing Error Handling and Recovery Pathways</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
            When production agents hit rate limits or API downtime, crashes are unacceptable. Learn how to architect fallback routers, model downgrade chains, and self-healing recovery pathways.
          </p>
        </div>
        <Link
          href="/learn/level-4/module-4-7"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow-amber-500/20 transition-all shrink-0 cursor-pointer"
        >
          <span>Continue to Module 4.7</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
