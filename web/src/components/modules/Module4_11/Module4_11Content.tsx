"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  ArrowRight,
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
  Scale,
  Compass,
  CheckCircle2,
  ShieldCheck,
  BarChart3,
  Bot,
} from "lucide-react";
import AgentEvalStudio from "./AgentEvalStudio";
import Module4_11Quiz from "./Module4_11Quiz";

export default function Module4_11Content() {
  const [selectedPillar, setSelectedPillar] = useState<string>("trajectory");
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [activeCodeTab, setActiveCodeTab] = useState<"code" | "output">("code");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);

  const pillars = [
    {
      id: "trajectory",
      title: "1. Trajectory Evaluation",
      tagline: "Inspecting Every Intermediate Step",
      desc: "An agent that arrives at the right answer via hallucinated tool arguments or redundant loops is broken. Score tool accuracy, order, and step efficiency.",
      icon: Compass,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      border: "border-amber-200 dark:border-amber-500/30",
      badge: "Trajectory Match",
      codeSnippet: `# 1. TRAJECTORY EVALUATOR: CHECKING INTERMEDIATE TOOL CALLS
def evaluate_trajectory(execution_trace, expected_tools):
    """Verifies that the agent selected the required tools without hallucinated extras."""
    actual_tools = [
        step["tool"] for step in execution_trace if step.get("type") == "tool_call"
    ]
    
    # Exact ordered match or subset match
    tool_match = actual_tools == expected_tools
    efficiency_score = len(expected_tools) / max(len(actual_tools), 1)
    
    return {
        "passed": tool_match and efficiency_score >= 0.8,
        "actual_tools": actual_tools,
        "efficiency_score": efficiency_score
    }`,
    },
    {
      id: "llm_judge",
      title: "2. LLM-as-a-Judge with Rubrics",
      tagline: "Automated Semantic Grading",
      desc: "Prompt a stronger model (e.g. Claude 3.5 Sonnet / GPT-4o) with an immutable rubric (accuracy, safety, tone) to grade output on a 1-5 scale with structured JSON.",
      icon: Scale,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-500/10",
      border: "border-blue-200 dark:border-blue-500/30",
      badge: "LLM-as-Judge",
      codeSnippet: `# 2. LLM-AS-A-JUDGE WITH PYDANTIC RUBRICS
from pydantic import BaseModel, Field

class EvaluationScore(BaseModel):
    factual_accuracy: int = Field(..., ge=1, le=5, description="1=hallucinated, 5=fully verified")
    conciseness: int = Field(..., ge=1, le=5, description="1=rambling, 5=succinct")
    reasoning: str = Field(..., description="Justification for given grades")

JUDGE_PROMPT = """You are an impartial agent evaluator.
User Query: {query}
Agent Output: {output}
Reference Answer: {ground_truth}

Score the agent response strictly against the reference using the EvaluationScore schema."""`,
    },
    {
      id: "golden_eval",
      title: "3. Golden Benchmark Suites",
      tagline: "Regression Prevention Matrix",
      desc: "Maintain 50+ curated multi-turn scenarios covering edge cases, adversarial inputs, and format constraints. Run them on every PR before deployment.",
      icon: ShieldCheck,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-500/10",
      border: "border-purple-200 dark:border-purple-500/30",
      badge: "Golden Dataset",
      codeSnippet: `# 3. GOLDEN BENCHMARK RUNNER
GOLDEN_DATASET = [
    {
        "id": "case_01_stock_split",
        "input": "Calculate Apple's 2020 4-for-1 split adjusted dividend yield.",
        "required_tools": ["fetch_sec_filing", "math_engine"],
        "min_accuracy_threshold": 4
    },
    # 50+ real customer failure edge cases here...
]

def run_regression_suite(agent):
    results = [evaluate_case(agent, case) for case in GOLDEN_DATASET]
    pass_rate = sum(r["passed"] for r in results) / len(results)
    assert pass_rate >= 0.92, f"Regression detected! Pass rate: {pass_rate:.1%}"`,
    },
    {
      id: "regression_gates",
      title: "4. Token & Latency CI Gates",
      tagline: "Guardrails for Production SLAs",
      desc: "Even if an answer is correct, an agent that spikes from 800 tokens to 12,000 tokens or from 2s to 45s must fail CI/CD build gates.",
      icon: BarChart3,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      border: "border-emerald-200 dark:border-emerald-500/30",
      badge: "CI/CD Gates",
      codeSnippet: `# 4. TOKEN & LATENCY BUDGET ASSERTIONS
def test_agent_sla_bounds(benchmark):
    trace = benchmark.run(agent.invoke, {"query": "Summarize Q3 earnings"})
    
    # Assert performance invariants:
    assert trace.total_tokens < 2500, f"Token blowout: {trace.total_tokens}"
    assert trace.duration_seconds < 4.5, f"Latency violation: {trace.duration_seconds}s"
    assert trace.tool_call_count <= 2, f"Excessive loop detected: {trace.tool_call_count}"`,
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
      <div className="rounded-2xl border border-amber-200 dark:border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-slate-50 dark:to-slate-950 p-6 md:p-8 relative overflow-hidden transition-colors">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30">
              Module 4.11 • Production, Scaling & Optimization
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              ~25 min interactive
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Testing & Evaluating AI Agents
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            In traditional software, <code className="font-mono">add(2, 3) == 5</code> is deterministic. In AI agents, identical prompts can yield completely different trajectories! Welcome to <strong>Evaluation-Driven Development (EDD)</strong>: measuring trajectory efficiency, LLM-as-a-judge rubrics, and CI/CD regression gates.
          </p>
        </div>
      </div>

      {/* SECTION 1: 4 ARCHITECTURE PILLARS */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-amber-500" />
            1. Core Pillars of Agent Evaluation
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Select an evaluation dimension
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
              Agent Benchmark & Eval Inspector
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
                  <span>Grading Trajectory...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Simulate Benchmark Run</span>
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
                eval_suite.py • {selectedPillar}
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
                Eval Report
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
                <p className="text-slate-400">&gt;&gt; Running Golden Eval Suite: 50 Scenarios...</p>
                <p className="text-slate-300">   [Scenario 1..46] Passed Trajectory &amp; Factual Checks (Score: 5/5)</p>
                <p className="text-amber-400">   [Scenario 47] Warning: Agent took 3 web searches instead of 1.</p>
                <p className="text-emerald-400">   [LLM Judge: Sonnet 3.5] Factual accuracy: 98.4% | Hallucination rate: 0.2%</p>
                <p className="text-sky-300">   [SLA Check] P95 Latency: 3.2s (Threshold: &lt; 5.0s) | Cost/run: $0.0034</p>
                <p className="text-emerald-400 font-bold">&gt;&gt; CI/CD Status: PASSED (96.0% overall benchmark score)</p>
              </div>
            )}
          </div>
        </div>

        {/* Simulation Banner */}
        {simStep > 0 && (
          <div className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/80 dark:bg-amber-950/30 flex items-center justify-between text-xs font-mono">
            <span className="text-amber-800 dark:text-amber-200">
              {simStep === 1 && "Spawning 50 parallel agent benchmark test runs across edge cases..."}
              {simStep === 2 && "Inspecting intermediate trajectory paths for redundant tool loops..."}
              {simStep === 3 && "Invoking LLM-as-a-judge rubric grading on synthesis accuracy..."}
              {simStep === 4 && "Regression gate validated: 96% pass rate with zero SLA infractions!"}
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
            2. Interactive Agent Eval Studio
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Real-Time Rubric & Trajectory Scorer
          </span>
        </div>
        <AgentEvalStudio />
      </section>

      {/* SECTION 4: HANDWRITTEN PRODUCTION INSIGHT */}
      <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/90 dark:bg-amber-500/10 shadow-sm">
        <span className="font-['Caveat',cursive] text-base text-amber-950 dark:text-amber-200 block">
          📌 Production Insight: Never evaluate an agent by its final response alone! An agent that outputs the right stock price after triggering 8 unnecessary SQL queries and consuming 40,000 tokens is a broken, dangerous agent. Always score the trajectory: did it pick the minimal optimal sequence of tools?
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
              TRAP #1: The Outcome-Only Illusion
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Testing only whether the final string contains expected keywords. The agent might have hallucinated bad intermediate steps or hit fallback loops, yet happened to stumble upon the answer. Trajectory evaluation is required to guarantee reproducibility.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-500/5 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
              TRAP #2: Using the Same Model as its Own Judge
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Using a small model (e.g., Llama-3-8B) to grade its own answers leads to severe self-affirmation bias. Always use an independent, higher-tier reasoning model (Claude 3.5 Sonnet, GPT-4o) with explicit scoring rubrics to judge agent outputs.
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
            ["1.", "Trajectory Auditing:", "Track every tool invocation and intermediate state delta to prevent hidden failure loops."],
            ["2.", "Structured Rubric Scoring:", "Use Pydantic schema validation for LLM-as-a-judge to yield objective numeric scores."],
            ["3.", "Statistical CI/CD Gates:", "Demand >= 90% benchmark pass rates across golden test suites before merging prompt or code updates."],
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
                Concept Check: Testing & Evaluating Agents
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {showQuiz ? "Click to collapse" : "Test your understanding of trajectory scoring and LLM judges (3 questions)"}
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
              <Module4_11Quiz />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* SECTION 8: NEXT MODULE BRIDGE */}
      <section className="rounded-2xl border border-amber-200 dark:border-amber-500/30 bg-gradient-to-r from-amber-50 via-white to-slate-50 dark:from-amber-500/10 dark:via-slate-900 dark:to-slate-950 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
            <span>Up Next • Module 4.12</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Fine-Tuning Agents with Feedback & Monitoring</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
            Production deployment is Day 1. Learn how to capture production traces, curate human feedback into DPO datasets, and build a self-improving agent flywheel.
          </p>
        </div>
        <Link
          href="/learn/level-4/module-4-12"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow-amber-500/20 transition-all shrink-0 cursor-pointer"
        >
          <span>Continue to Module 4.12</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
