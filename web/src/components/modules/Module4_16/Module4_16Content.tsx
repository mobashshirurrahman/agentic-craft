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
  Coins,
  Cpu,
  Zap,
  Repeat,
  DollarSign,
} from "lucide-react";
import CostOptimizerStudio from "./CostOptimizerStudio";
import Module4_16Quiz from "./Module4_16Quiz";

export default function Module4_16Content() {
  const [selectedPillar, setSelectedPillar] = useState<string>("model_tiering");
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [activeCodeTab, setActiveCodeTab] = useState<"code" | "output">("code");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);

  const pillars = [
    {
      id: "model_tiering",
      title: "1. Model Tiering Router",
      tagline: "Intelligent Task-Based Routing",
      desc: "Route simple summarization, classification, and formatting tasks to cheap models (GPT-4o-mini at $0.15/1M). Reserve frontier models (Claude 3.5 Sonnet / o3) for complex planning.",
      icon: Cpu,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      border: "border-amber-200 dark:border-amber-500/30",
      badge: "Dynamic Tiering",
      codeSnippet: `# 1. DYNAMIC MODEL TIERING ROUTER
def select_model_tier(task_complexity: str):
    """Assigns optimal cost-effective LLM based on task nature."""
    if task_complexity in ["classification", "json_format", "fact_extraction"]:
        # 100x cheaper than frontier models!
        return ChatOpenAI(model="gpt-4o-mini", temperature=0.0)
    elif task_complexity in ["multi_step_planning", "code_gen", "subgraph_synthesis"]:
        return ChatAnthropic(model="claude-3-5-sonnet-20241022", temperature=0.1)
    else:
        return ChatOpenAI(model="gpt-4o", temperature=0.2)`,
    },
    {
      id: "prompt_caching",
      title: "2. Native Prompt Caching",
      tagline: "90% Prefix Token Cost Reduction",
      desc: "Place static instructions, massive schemas, and few-shot examples at the exact top of your prompt. Modern LLMs cache prefixes, slashing input token billing by 90%.",
      icon: Coins,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-500/10",
      border: "border-blue-200 dark:border-blue-500/30",
      badge: "Prompt Caching",
      codeSnippet: `# 2. ANTHROPIC / OPENAI PROMPT PREFIX CACHING
system_message = {
    "role": "system",
    "content": [
        {
            "type": "text",
            "text": IMMUTABLE_5000_TOKEN_DOCSTRING_AND_RULES,
            # Cache checkpoint: reads cost only $0.375/1M instead of $3.00/1M!
            "cache_control": {"type": "ephemeral"}
        }
    ]
}

# In multi-turn agents, turns 2-15 pay nearly ZERO for the system prompt!`,
    },
    {
      id: "semantic_cache",
      title: "3. Semantic Vector Caching",
      tagline: "Zero-Cost Deduplication",
      desc: "Embed incoming user queries and check a vector cache. If a near-identical query was answered within the last 2 hours (cosine >= 0.95), return the cached response instantly.",
      icon: Zap,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-500/10",
      border: "border-purple-200 dark:border-purple-500/30",
      badge: "Semantic Cache",
      codeSnippet: `# 3. REDIS SEMANTIC QUERY CACHE
from langchain_community.cache import RedisSemanticCache
import langchain

# Intercepts identical or semantically equivalent questions
langchain.llm_cache = RedisSemanticCache(
    redis_url="redis://localhost:6379",
    embedding=embed_model,
    score_threshold=0.05 # Cosine distance <= 0.05 (Similarity >= 95%)
)

# Second invocation of "What's Apple's PE ratio?" returns in 2ms for $0.00!`,
    },
    {
      id: "tool_caching",
      title: "4. Idempotent Tool Caching",
      tagline: "Eliminating Redundant API Calls",
      desc: "Decorate expensive search and SQL tools with TTL memoization. Multiple parallel sub-agents asking for the same data share a single cached API response.",
      icon: Repeat,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      border: "border-emerald-200 dark:border-emerald-500/30",
      badge: "Tool Memoization",
      codeSnippet: `# 4. TOOL LEVEL RESULT CACHING
from functools import lru_cache
import redis

r = redis.Redis()

def cached_web_search(query: str, ttl_seconds: int = 1800):
    cache_key = f"tool:search:{hash(query)}"
    cached = r.get(cache_key)
    if cached:
        return cached.decode()
        
    result = serpapi_search(query) # $0.01 per search
    r.set(cache_key, result, ex=ttl_seconds)
    return result`,
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
              Module 4.16 • Production, Scaling & Optimization
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              ~25 min interactive
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Implementing Cost Optimization Strategies
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            LLM bills represent <strong>75% to 85% of total agent infrastructure costs</strong>. In unoptimized systems, every turn invokes a frontier model with repeating system prompts. Master <strong>model tiering</strong>, prompt prefix caching, semantic vector deduplication, and tool memoization.
          </p>
        </div>
      </div>

      {/* SECTION 1: 4 ARCHITECTURE PILLARS */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-amber-500" />
            1. Core Pillars of Cost Optimization
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Select a cost optimization vector
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
              Token Economy &amp; Cost Auditor
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
                  <span>Auditing Costs...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Simulate Cost Optimization</span>
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
                cost_optimizer.py • {selectedPillar}
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
                Billing Audit
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
                <p className="text-slate-400">&gt;&gt; Workload: 10,000 multi-turn agent turns / day</p>
                <p className="text-rose-400">   [Unoptimized Baseline] 100% Claude 3.5 Sonnet: $450.00 / day</p>
                <p className="text-sky-300">   [Model Tiering] 68% routed to GPT-4o-mini: Saved $235.00</p>
                <p className="text-emerald-400">   [Prompt Prefix Cache] 90% discount on 4,000 token system prompt: Saved $128.00</p>
                <p className="text-amber-400">   [Semantic Cache] 18% query exact/near-match hit: Saved $32.00</p>
                <p className="text-emerald-400 font-bold">&gt;&gt; New Daily Cost: $55.00 / day (87.7% Net Savings!)</p>
              </div>
            )}
          </div>
        </div>

        {/* Simulation Banner */}
        {simStep > 0 && (
          <div className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/80 dark:bg-amber-950/30 flex items-center justify-between text-xs font-mono">
            <span className="text-amber-800 dark:text-amber-200">
              {simStep === 1 && "Evaluating incoming query semantics against Redis semantic vector cache..."}
              {simStep === 2 && "Triage router assigns simple tasks to mini models with 100x cost reduction..."}
              {simStep === 3 && "Static system instructions pinned with ephemeral prefix cache control..."}
              {simStep === 4 && "Billing audit verified: 87.7% total cost reduction with zero quality loss!"}
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
            2. Interactive Cost Optimizer Studio
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Real-Time Token &amp; Billing Calculator
          </span>
        </div>
        <CostOptimizerStudio />
      </section>

      {/* SECTION 4: HANDWRITTEN PRODUCTION INSIGHT */}
      <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/90 dark:bg-amber-500/10 shadow-sm">
        <span className="font-['Caveat',cursive] text-base text-amber-950 dark:text-amber-200 block">
          📌 Production Insight: Keep dynamic variables out of the top of your system prompt! If you put current timestamp or session_id on line 1 of your system prompt, every turn looks like a brand-new prompt to OpenAI and Anthropic, completely destroying your prompt caching! Put all timestamps and dynamic variables at the very end of the user message.
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
              TRAP #1: Caching Non-Idempotent Tool Calls
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Applying a generic HTTP cache over all agent tools. If the agent calls <code>send_email()</code> or <code>charge_credit_card()</code> and the cache intercepts it with an old cached confirmation, the real transaction never executes. Only cache read-only idempotent tools.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-500/5 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
              TRAP #2: The One-Model-Fits-All Fallacy
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Using Claude 3.5 Sonnet or GPT-4o for every single node in your graph. Nodes that simply format markdown or extract a stock symbol do not need an expensive frontier model. Route 70%+ of simple intermediate nodes to lightweight models.
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
            ["1.", "Model Tiering:", "Delegate simple formatting and routing to mini models, saving up to 70% in baseline API bills."],
            ["2.", "Protect Cache Prefixes:", "Keep static instructions and tool definitions strictly at the top of the prompt to maximize prompt cache hits."],
            ["3.", "Semantic Deduplication:", "Intercept high-frequency recurring user questions with vector caching for 2ms zero-cost answers."],
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
                Concept Check: Cost Optimization
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {showQuiz ? "Click to collapse" : "Test your understanding of model tiering, prompt caching, and tool memoization (3 questions)"}
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
              <Module4_16Quiz />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* SECTION 8: NEXT MODULE BRIDGE */}
      <section className="rounded-2xl border border-amber-200 dark:border-amber-500/30 bg-gradient-to-r from-amber-50 via-white to-slate-50 dark:from-amber-500/10 dark:via-slate-900 dark:to-slate-950 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
            <span>Up Next • Module 4.17 • Final Capstone</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Building Deep Agents for Complex Tasks</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
            The ultimate capstone of the entire AgenticCraft curriculum. Synthesize everything: planning, multi-agent swarms, time-travel debugging, async workers, and self-improving feedback loops into an autonomous Deep Research Agent.
          </p>
        </div>
        <Link
          href="/learn/level-4/module-4-17"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow-amber-500/20 transition-all shrink-0 cursor-pointer"
        >
          <span>Begin Final Capstone</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
