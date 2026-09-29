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
  Globe,
  Gauge,
  Lock,
  HardDrive,
} from "lucide-react";
import DistributedScaleSimulator from "./DistributedScaleSimulator";
import Module4_15Quiz from "./Module4_15Quiz";

export default function Module4_15Content() {
  const [selectedPillar, setSelectedPillar] = useState<string>("state_tiers");
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [activeCodeTab, setActiveCodeTab] = useState<"code" | "output">("code");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);

  const pillars = [
    {
      id: "state_tiers",
      title: "1. 3-Tier State Hierarchy",
      tagline: "Hot, Warm, and Cold Memory",
      desc: "Split memory into sub-millisecond Redis ephemeral state (hot), Postgres durable checkpoints (warm), and S3 blob storage for heavy PDFs/HTML (cold).",
      icon: HardDrive,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      border: "border-amber-200 dark:border-amber-500/30",
      badge: "Storage Tiers",
      codeSnippet: `# 1. 3-TIER AGENT STORAGE PATTERN
# Tier 1 (Hot): Redis for active turn scratchpads and short-lived locks
redis_client.set(f"thread:{thread_id}:scratchpad", json.dumps(active_vars), ex=3600)

# Tier 2 (Warm): Postgres for durable thread checkpoints and message history
await postgres_saver.put(config, checkpoint_snapshot)

# Tier 3 (Cold): Offload massive 5MB PDF report artifact to S3
s3_client.upload_file(Filename="q3_report.pdf", Bucket="agent-artifacts", Key=f"{thread_id}/report.pdf")`,
    },
    {
      id: "token_bucket",
      title: "2. Leaky Bucket Rate Limiting",
      tagline: "Preventing Upstream 429 Errors",
      desc: "When 100 workers invoke OpenAI simultaneously, you hit TPM/RPM quotas. Use distributed Redis token buckets to throttle outbound LLM calls cooperatively.",
      icon: Gauge,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-500/10",
      border: "border-blue-200 dark:border-blue-500/30",
      badge: "Token Bucket",
      codeSnippet: `# 2. REDIS DISTRIBUTED RATE LIMITER
import redis

class UpstreamRateLimiter:
    def __init__(self, r: redis.Redis, max_tpm: int = 150000):
        self.r = r
        self.max_tpm = max_tpm

    async def acquire_tokens(self, estimated_tokens: int):
        current = await self.r.incrby("openai:tpm_counter", estimated_tokens)
        if current == estimated_tokens:
            await self.r.expire("openai:tpm_counter", 60)
        
        if current > self.max_tpm:
            sleep_duration = await self.r.ttl("openai:tpm_counter")
            await asyncio.sleep(max(sleep_duration, 1))`,
    },
    {
      id: "fallback_routing",
      title: "3. Multi-Provider Fallbacks",
      tagline: "Automated API Outage Circuit Breaking",
      desc: "If OpenAI returns 503s or latency spikes past 8s, fail over transparently to Anthropic Claude or Azure OpenAI without failing the user request.",
      icon: Globe,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-500/10",
      border: "border-purple-200 dark:border-purple-500/30",
      badge: "Failover Router",
      codeSnippet: `# 3. MULTI-MODEL RESILIENCE ROUTER
from langchain_openai import ChatOpenAI
from langchain_anthropic import ChatAnthropic

primary_model = ChatOpenAI(model="gpt-4o", timeout=6.0)
fallback_model = ChatAnthropic(model="claude-3-5-sonnet-20241022", timeout=6.0)

# LangChain native fallback: automatically invokes Claude if GPT-4o times out or errors!
resilient_agent_llm = primary_model.with_fallbacks([fallback_model])`,
    },
    {
      id: "concurrency_locks",
      title: "4. Distributed Thread Locks",
      tagline: "Preventing State Corruption",
      desc: "If a user fires two queries into the same conversation thread simultaneously, acquire a Redis distributed lock (Redlock) to process them sequentially.",
      icon: Lock,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      border: "border-emerald-200 dark:border-emerald-500/30",
      badge: "Redlock Mutex",
      codeSnippet: `# 4. DISTRIBUTED MUTEX PER CONVERSATION THREAD
from redis.asyncio import Redis

async def execute_locked_turn(thread_id: str, prompt: str):
    lock_key = f"mutex:thread:{thread_id}"
    # Acquire lock with 30s timeout
    is_acquired = await redis.set(lock_key, "locked", nx=True, ex=30)
    
    if not is_acquired:
        raise ConcurrentTurnConflictException("A turn is already actively running for this thread.")
    
    try:
        return await app.ainvoke({"messages": [("user", prompt)]}, {"configurable": {"thread_id": thread_id}})
    finally:
        await redis.delete(lock_key)`,
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
              Module 4.15 • Production, Scaling & Optimization
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              ~25 min interactive
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Scaling Agents for Production Environments
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Scaling agents is fundamentally different from scaling CRUD apps. Agents are heavily <strong>I/O bound</strong>, accumulate complex state graphs, and trigger upstream API rate limits. Master <strong>3-tier memory</strong>, leaky-bucket rate limiting, multi-model failover, and thread mutexes.
          </p>
        </div>
      </div>

      {/* SECTION 1: 4 ARCHITECTURE PILLARS */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-amber-500" />
            1. Core Pillars of Distributed Scale
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Select a distributed scaling strategy
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
              Distributed System &amp; Rate Limiter Inspector
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
                  <span>Balancing Traffic...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Simulate Scale Test</span>
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
                distributed_scale.py • {selectedPillar}
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
                Scale Telemetry
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
                <p className="text-slate-400">&gt;&gt; Simulating 2,000 Concurrent Agent Sessions across 4 Regions</p>
                <p className="text-slate-300">   [Redis Mutex] 2,000 thread locks acquired with 0 race conditions.</p>
                <p className="text-sky-300">   [Token Bucket] Outbound rate: 142,000 TPM (Under 150K quota ceiling).</p>
                <p className="text-amber-400">   [Circuit Breaker Alert] OpenAI us-east-1 503 error detected on 12 calls.</p>
                <p className="text-emerald-400">   [Failover Triggered] Routed 12 requests to Claude 3.5 Sonnet fallback automatically (0 dropped users).</p>
                <p className="text-emerald-400 font-bold">&gt;&gt; Overall Uptime: 99.99% | Zero 429 rate limit rejections!</p>
              </div>
            )}
          </div>
        </div>

        {/* Simulation Banner */}
        {simStep > 0 && (
          <div className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/80 dark:bg-amber-950/30 flex items-center justify-between text-xs font-mono">
            <span className="text-amber-800 dark:text-amber-200">
              {simStep === 1 && "Ingesting 2,000 concurrent agent threads across multi-region worker pods..."}
              {simStep === 2 && "Acquiring Redis mutex locks to enforce single-flight turn execution per thread..."}
              {simStep === 3 && "Leaky bucket limiter throttling outbound tokens below provider limits..."}
              {simStep === 4 && "Automated circuit breaker failover succeeds with 99.99% availability!"}
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
            2. Interactive Distributed Scale Simulator
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Multi-Region Concurrency &amp; Throttling
          </span>
        </div>
        <DistributedScaleSimulator />
      </section>

      {/* SECTION 4: HANDWRITTEN PRODUCTION INSIGHT */}
      <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/90 dark:bg-amber-500/10 shadow-sm">
        <span className="font-['Caveat',cursive] text-base text-amber-950 dark:text-amber-200 block">
          📌 Production Insight: Never save raw PDF files, scanned images, or HTML dumps into your LangGraph PostgreSQL database! Doing that causes checkpoint table sizes to explode into terabytes within weeks, destroying query latency. Store the heavy artifact in AWS S3 or Cloudflare R2 and store only the secure S3 URL in your agent state!
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
              TRAP #1: Unbounded In-Flight Agent Spawning
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Allowing users to spawn unlimited parallel sub-agents. One user script loops 50 times, creating 50 sub-agents that each call tools in parallel. Within 10 seconds, your OpenAI organization account is banned with HTTP 429 Too Many Requests. Enforce strict per-tenant concurrency semaphores.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-500/5 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
              TRAP #2: The Single-Provider Single Point of Failure
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Hardcoding a single LLM API. When that provider experiences an outage, your entire business is paralyzed. Always configure model fallbacks using <code>with_fallbacks([backup_model])</code> so traffic immediately reroutes to an alternate vendor.
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
            ["1.", "3-Tier Storage Segregation:", "Keep active memory in Redis, checkpoints in Postgres, and heavy blobs in S3."],
            ["2.", "Distributed Throttling:", "Use Redis token buckets to cap outbound LLM requests before hitting provider 429 quotas."],
            ["3.", "Thread Mutex Locking:", "Acquire single-flight locks per conversation thread to eliminate race conditions and state divergence."],
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
                Concept Check: Distributed Scaling
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {showQuiz ? "Click to collapse" : "Test your understanding of storage tiers, rate limiters, and thread locks (3 questions)"}
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
              <Module4_15Quiz />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* SECTION 8: NEXT MODULE BRIDGE */}
      <section className="rounded-2xl border border-amber-200 dark:border-amber-500/30 bg-gradient-to-r from-amber-50 via-white to-slate-50 dark:from-amber-500/10 dark:via-slate-900 dark:to-slate-950 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
            <span>Up Next • Module 4.16</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Implementing Cost Optimization Strategies</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
            LLM bills represent 80% of agent infrastructure costs. Learn how to slash expenses by 75% using prompt caching, tiered model routing, and semantic exact match caches.
          </p>
        </div>
        <Link
          href="/learn/level-4/module-4-16"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow-amber-500/20 transition-all shrink-0 cursor-pointer"
        >
          <span>Continue to Module 4.16</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
