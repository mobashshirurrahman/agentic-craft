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
  Compass,
  Cpu,
  Terminal,
  ShieldCheck,
} from "lucide-react";
import PromptOptimizerLab from "./PromptOptimizerLab";
import Module4_9Quiz from "./Module4_9Quiz";

export default function Module4_9Content() {
  const [selectedPillar, setSelectedPillar] = useState<string>("role_framing");
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [activeCodeTab, setActiveCodeTab] = useState<"code" | "output">("code");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);

  const pillars = [
    {
      id: "role_framing",
      title: "1. Role & Persistence Framing",
      tagline: "Preventing Premature Stopping",
      desc: "Without explicit persistence directives, agents quit after a single tool call. Define the agent's scope, operational persona, and mandatory completion criteria.",
      icon: Compass,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      border: "border-amber-200 dark:border-amber-500/30",
      badge: "Persistence Directive",
      codeSnippet: `# 1. PRODUCTION SYSTEM PROMPT WITH PERSISTENCE DIRECTIVE
SYSTEM_PROMPT = """You are an expert equity research intelligence agent.
OPERATIONAL SCOPE:
- Synthesize verifiable financial facts from SEC filings and live feeds.
- CRITICAL PERSISTENCE RULE: Do not terminate with partial insights. If an initial
  search query produces ambiguous numbers, inspect secondary sources until completely verified.
- Do not stop until all user questions have citation-backed financial metrics."""`,
    },
    {
      id: "tool_boundaries",
      title: "2. Tool Docstrings as Decision Rules",
      tagline: "Explicit Negative Criteria",
      desc: "LLMs pick tools purely based on description strings. Adding explicit 'When NOT to use' negative criteria eliminates tool confusion and hallucinated tool calls.",
      icon: Terminal,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-500/10",
      border: "border-blue-200 dark:border-blue-500/30",
      badge: "Negative Constraints",
      codeSnippet: `# 2. EXPLICIT TOOL BOUNDARIES & NEGATIVE CONSTRAINTS
from langchain_core.tools import tool

@tool
def query_live_stock_quote(symbol: str) -> str:
    """Fetch real-time NYSE/NASDAQ ticker quote data.
    
    WHEN TO USE:
    - User asks for current trading price, day high/low, or volume.
    
    WHEN NOT TO USE:
    - NEVER use this for historical trends older than 24 hours (use get_historical_bars).
    - NEVER use for macro-economic news (use search_financial_news)."""
    return f"Quote for {symbol}: $182.40 (+1.4%)"`,
    },
    {
      id: "pydantic_schemas",
      title: "3. Typed Pydantic Arguments",
      tagline: "Eliminating Schema Hallucinations",
      desc: "Constrain tool arguments with Pydantic field validators, regex patterns, and enums so the agent passes syntactically valid parameters on the first attempt.",
      icon: ShieldCheck,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-500/10",
      border: "border-purple-200 dark:border-purple-500/30",
      badge: "Strict Schema",
      codeSnippet: `# 3. TYPED PYDANTIC TOOL CONTRACT
from pydantic import BaseModel, Field
from typing import Literal

class FinancialReportInput(BaseModel):
    ticker: str = Field(..., pattern=r"^[A-Z]{1,5}$", description="Stock symbol uppercase, e.g. 'NVDA'")
    quarter: Literal["Q1", "Q2", "Q3", "Q4"] = Field(..., description="Target fiscal quarter")
    fiscal_year: int = Field(..., ge=2015, le=2026, description="Year between 2015-2026")

@tool(args_schema=FinancialReportInput)
def fetch_10q_filing(ticker: str, quarter: str, fiscal_year: int):
    """Retrieve 10-Q filing from SEC EDGAR."""
    return f"Retrieved 10-Q for {ticker} ({quarter} {fiscal_year}) SEC EDGAR."`,
    },
    {
      id: "few_shot_routing",
      title: "4. In-Context Routing Demonstrations",
      tagline: "Few-Shot Disambiguation",
      desc: "For edge cases where two tools seem plausible, provide 2-3 input-to-tool-call demonstrations directly in the system prompt to anchor routing decisions.",
      icon: Cpu,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      border: "border-emerald-200 dark:border-emerald-500/30",
      badge: "Few-Shot Anchors",
      codeSnippet: `# 4. FEW-SHOT DEMONSTRATIONS FOR EDGE CASES
ROUTING_EXAMPLES = """
EXAMPLE 1:
User: "How did Apple perform in Q3 2023?"
Thought: The user asks for historical SEC financial performance.
Action: fetch_10q_filing(ticker="AAPL", quarter="Q3", fiscal_year=2023)

EXAMPLE 2:
User: "What is Apple trading at right now?"
Thought: The user asks for real-time stock price.
Action: query_live_stock_quote(symbol="AAPL")
"""`,
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
              Module 4.9 • Production, Scaling & Optimization
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              ~25 min interactive
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Optimizing Prompts and Tool Selection
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            When an agent picks the wrong tool or stops halfway, engineers reflexively blame the LLM. In reality, <strong>90% of agent routing failures stem from vague tool docstrings and ambiguous system prompts</strong>. Master the art of deterministic prompt engineering and tool boundary definition.
          </p>
        </div>
      </div>

      {/* SECTION 1: 4 ARCHITECTURE PILLARS */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-amber-500" />
            1. Core Pillars of Tool Prompt Optimization
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Select a design pillar
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
              Prompt & Tool Routing Inspector
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
                  <span>Evaluating Routing...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Simulate Tool Selection</span>
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
                prompt_tuning.py • {selectedPillar}
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
                Routing Telemetry
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
                <p className="text-slate-400">&gt;&gt; Query: &quot;What was MSFT&apos;s net income in Q2 2024?&quot;</p>
                <p className="text-slate-300">   [Prompt Evaluator] Parsing available tool schema definitions...</p>
                <p className="text-slate-300">   [Negative Check] query_live_stock_quote rejected: requires real-time quote, not historical.</p>
                <p className="text-emerald-400">   [Docstring Match] fetch_10q_filing selected (confidence: 0.98)</p>
                <p className="text-sky-300">   [Pydantic Validation] Arguments validated: ticker=&apos;MSFT&apos;, quarter=&apos;Q2&apos;, fiscal_year=2024</p>
                <p className="text-amber-400 font-bold">&gt;&gt; Result: Zero tool hallucination. Deterministic execution achieved.</p>
              </div>
            )}
          </div>
        </div>

        {/* Simulation Banner */}
        {simStep > 0 && (
          <div className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/80 dark:bg-amber-950/30 flex items-center justify-between text-xs font-mono">
            <span className="text-amber-800 dark:text-amber-200">
              {simStep === 1 && "Evaluating prompt against ambiguous query test suite..."}
              {simStep === 2 && "Inspecting tool docstring boundary rules ('When NOT to use')..."}
              {simStep === 3 && "Pydantic validator enforcing strict schema format and bounds..."}
              {simStep === 4 && "Deterministic tool chosen with 100% parameter accuracy!"}
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
            2. Interactive Prompt Optimizer Lab
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            A/B Test Prompt Revisions Live
          </span>
        </div>
        <PromptOptimizerLab />
      </section>

      {/* SECTION 4: HANDWRITTEN PRODUCTION INSIGHT */}
      <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/90 dark:bg-amber-500/10 shadow-sm">
        <span className="font-['Caveat',cursive] text-base text-amber-950 dark:text-amber-200 block">
          📌 Production Insight: The LLM does not execute your Python function — it reads your docstring and tries to guess how to populate JSON arguments. If your docstring is &quot;Searches data&quot;, the agent will hallucinate parameters every time. Write docstrings with the exact same rigor you give to customer-facing REST API specs!
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
              TRAP #1: The 2-3 Query Testing Fallacy
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              A developer tweaks a prompt, runs 2 test queries in terminal, sees good output, and pushes to production. Two days later, 15% of edge-case user queries break. Never deploy a prompt change without benchmarking against a golden dataset of at least 30 representative test questions.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-500/5 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
              TRAP #2: Overlapping Tool Semantic Space
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Giving an agent both <code>search_web</code> and <code>fetch_online_articles</code> without clear boundary criteria leads to erratic coin-flip routing. When tool scopes overlap, merge them into a single parameterized tool or explicitly state mutually exclusive routing rules.
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
            ["1.", "Explicit Negative Boundaries:", "Include 'WHEN NOT TO USE' clauses in tool docstrings to actively reject incorrect tools."],
            ["2.", "Strict Pydantic Validation:", "Constrain parameters with regex, bounds, and enums so syntax errors are caught before runtime."],
            ["3.", "Persistence Directives:", "Mandate in the system prompt that the agent must not terminate until tasks are thoroughly verified."],
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
                Concept Check: Prompt & Tool Selection
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {showQuiz ? "Click to collapse" : "Test your understanding of tool boundaries and prompt persistence (3 questions)"}
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
              <Module4_9Quiz />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* SECTION 8: NEXT MODULE BRIDGE */}
      <section className="rounded-2xl border border-amber-200 dark:border-amber-500/30 bg-gradient-to-r from-amber-50 via-white to-slate-50 dark:from-amber-500/10 dark:via-slate-900 dark:to-slate-950 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
            <span>Up Next • Module 4.10</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Managing Context Windows Effectively</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
            Large context windows are not infinite trash cans. Learn how to prevent the &apos;Lost in the Middle&apos; degradation with windowing, summarization nodes, and selective state pruning.
          </p>
        </div>
        <Link
          href="/learn/level-4/module-4-10"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow-amber-500/20 transition-all shrink-0 cursor-pointer"
        >
          <span>Continue to Module 4.10</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
