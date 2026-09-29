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
  Server,
  Cpu,
  RefreshCw,
  Archive,
  Database,
} from "lucide-react";
import WorkerQueueSimulator from "./WorkerQueueSimulator";
import Module4_14Quiz from "./Module4_14Quiz";

export default function Module4_14Content() {
  const [selectedPillar, setSelectedPillar] = useState<string>("three_tier");
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [activeCodeTab, setActiveCodeTab] = useState<"code" | "output">("code");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);

  const pillars = [
    {
      id: "three_tier",
      title: "1. 3-Tier Decoupled Architecture",
      tagline: "Web Ingestion vs Worker Fleet",
      desc: "Web servers validate JWTs and enqueue tasks in <30ms. Independent worker pools ingest tasks and run LLM reasoning loops without blocking HTTP ports.",
      icon: Server,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      border: "border-amber-200 dark:border-amber-500/30",
      badge: "3-Tier Design",
      codeSnippet: `# 1. CELERY WORKER TASK DEFINITION
from celery import Celery

celery_app = Celery("agent_workers", broker="redis://redis:6379/0", backend="redis://redis:6379/1")

@celery_app.task(bind=True, max_retries=3, time_limit=300)
def execute_agent_task(self, session_id: str, prompt: str):
    """Executes long-running agent pipeline in dedicated worker process."""
    try:
        result = app.invoke({"messages": [("user", prompt)]}, {"configurable": {"thread_id": session_id}})
        return {"status": "success", "output": result["messages"][-1].content}
    except Exception as exc:
        raise self.retry(exc=exc, countdown=10)`,
    },
    {
      id: "redis_streams",
      title: "2. Redis Streams & Consumer Groups",
      tagline: "Guaranteed Delivery with ACKs",
      desc: "Use Redis Streams with consumer groups. Workers claim tasks with XREADGROUP and send XACK upon completion. Un-ACKed tasks are re-claimed on crash.",
      icon: RefreshCw,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-500/10",
      border: "border-blue-200 dark:border-blue-500/30",
      badge: "Redis Streams",
      codeSnippet: `# 2. REDIS STREAM WORKER LOOP
import redis, time

r = redis.Redis(host="localhost", port=6379, decode_responses=True)

def consume_stream_tasks():
    while True:
        # Pull 1 message assigned to consumer_1 in group 'agent_workers'
        entries = r.xreadgroup("agent_workers", "worker_node_1", {"agent_tasks": ">"}, count=1, block=5000)
        if entries:
            stream_name, messages = entries[0]
            msg_id, payload = messages[0]
            
            # Process agent graph
            run_agent(payload["prompt"])
            
            # Acknowledge task completion!
            r.xack("agent_tasks", "agent_workers", msg_id)`,
    },
    {
      id: "visibility_timeout",
      title: "3. Visibility Timeouts & Heartbeats",
      tagline: "Resilient Crash Recovery",
      desc: "If a worker node suffers an OOM crash or network failure mid-execution, its visibility lease expires, and a healthy peer node automatically resumes the job.",
      icon: Cpu,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-500/10",
      border: "border-purple-200 dark:border-purple-500/30",
      badge: "Visibility Timeout",
      codeSnippet: `# 3. REDIS VISIBILITY LEASE & HEARTBEAT
async def heartbeat_worker(task_id: str):
    """Refreshes worker lock every 30 seconds to prevent auto-reclaiming."""
    while True:
        await redis.set(f"lock:task:{task_id}", "worker_node_1", ex=60)
        await asyncio.sleep(30)

# If worker dies, lock expires in 60s -> Watchdog re-queues task to pending stream!`,
    },
    {
      id: "dlq",
      title: "4. Dead Letter Queues (DLQ)",
      tagline: "Quarantining Malformed Tasks",
      desc: "Tasks that fail 3 consecutive times due to unrecoverable prompt bugs or malformed input are routed to a Dead Letter Queue to prevent infinite retry loops.",
      icon: Archive,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      border: "border-emerald-200 dark:border-emerald-500/30",
      badge: "DLQ Quarantine",
      codeSnippet: `# 4. DEAD LETTER QUEUE (DLQ) QUARANTINE ROUTER
def handle_failed_task(task_id: str, error: str, retry_count: int):
    if retry_count >= 3:
        # Move to Dead Letter Queue for engineering review
        redis.xadd("agent_dlq", {
            "task_id": task_id,
            "error": str(error),
            "quarantine_time": time.time()
        })
        notify_pagerduty(f"Task {task_id} quarantined to DLQ: {error}")
    else:
        schedule_exponential_backoff_retry(task_id, retry_count + 1)`,
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
              Module 4.14 • Production, Scaling & Optimization
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              ~25 min interactive
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Deploying Agents in Worker Node Architectures
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Running <code className="font-mono">agent.invoke()</code> inside a web request freezes HTTP threads and crashes web tiers under heavy load. The production standard is <strong>Worker Node Architecture</strong>: Redis Streams message brokers, auto-scaling worker fleets, and Dead Letter Queues.
          </p>
        </div>
      </div>

      {/* SECTION 1: 4 ARCHITECTURE PILLARS */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-amber-500" />
            1. Core Pillars of Worker Queue Systems
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Select a queue pattern
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
              Worker Fleet &amp; Queue Inspector
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
                  <span>Processing Queue...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Simulate Worker Flow</span>
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
                queue_worker.py • {selectedPillar}
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
                Worker Logs
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
                <p className="text-slate-400">&gt;&gt; Inbound burst: 400 user requests queued in Redis Stream</p>
                <p className="text-slate-300">   [Web Tier] Avg intake response time: 14ms (HTTP 202 Accepted)</p>
                <p className="text-sky-300">   [Auto-Scaler] Queue depth &gt; 50. Scaling worker replicas from 4 to 12.</p>
                <p className="text-emerald-400">   [Worker #07] Claimed task &apos;job_491&apos; via XREADGROUP. Running LangGraph node.</p>
                <p className="text-slate-300">   [Worker #07] Execution complete. XACK sent. Result written to PostgreSQL.</p>
                <p className="text-emerald-400 font-bold">&gt;&gt; Queue cleared: 0 dropped requests, 0 web thread crashes!</p>
              </div>
            )}
          </div>
        </div>

        {/* Simulation Banner */}
        {simStep > 0 && (
          <div className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/80 dark:bg-amber-950/30 flex items-center justify-between text-xs font-mono">
            <span className="text-amber-800 dark:text-amber-200">
              {simStep === 1 && "Burst traffic enqueued safely into Redis Streams without blocking web servers..."}
              {simStep === 2 && "Worker consumer group claims tasks and maintains active visibility heartbeats..."}
              {simStep === 3 && "Kubernetes KEDA auto-scaler dynamically provisions additional worker pods..."}
              {simStep === 4 && "All tasks processed with zero HTTP drops and full fault-tolerant ACKs!"}
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
            2. Interactive Worker Queue Simulator
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Real-Time Queue Depth & Worker Auto-Scaling
          </span>
        </div>
        <WorkerQueueSimulator />
      </section>

      {/* SECTION 4: HANDWRITTEN PRODUCTION INSIGHT */}
      <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/90 dark:bg-amber-500/10 shadow-sm">
        <span className="font-['Caveat',cursive] text-base text-amber-950 dark:text-amber-200 block">
          📌 Production Insight: Never scale worker nodes based on CPU usage alone! LLM agents spend 90% of their execution time waiting on network I/O from OpenAI or Anthropic. Their CPU utilization will hover around 5%. If you scale workers on CPU, your auto-scaler will never add pods during a traffic spike! Always scale on Queue Depth or Queue Latency via KEDA.
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
              TRAP #1: The Poison Pill Infinite Retry Loop
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              A user submits an input that triggers a Python unhandled exception. The worker crashes, fails to acknowledge the message, and restarts. The message goes back to the queue and crashes the next worker. Soon your entire worker fleet is crash-looping. Enforce a Dead Letter Queue (DLQ) after 3 retries.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-500/5 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
              TRAP #2: Pre-fetching Too Many Tasks
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Celery workers default to pre-fetching tasks. If Worker A grabs 10 agent tasks that each take 2 minutes, other idle workers sit empty while users on Worker A wait 20 minutes. Set <code>worker_prefetch_multiplier = 1</code> for long-running agent workloads.
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
            ["1.", "3-Tier Separation:", "Isolate fast HTTP ingestion from resource-intensive agent execution fleets."],
            ["2.", "Queue Depth Scaling:", "Scale worker replicas based on pending job count rather than misleading CPU utilization."],
            ["3.", "DLQ Quarantine:", "Isolate fatal task exceptions to prevent systemic cascade failures across your worker nodes."],
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
                Concept Check: Worker Queue Architecture
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {showQuiz ? "Click to collapse" : "Test your understanding of queues, consumer groups, and DLQs (3 questions)"}
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
              <Module4_14Quiz />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* SECTION 8: NEXT MODULE BRIDGE */}
      <section className="rounded-2xl border border-amber-200 dark:border-amber-500/30 bg-gradient-to-r from-amber-50 via-white to-slate-50 dark:from-amber-500/10 dark:via-slate-900 dark:to-slate-950 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
            <span>Up Next • Module 4.15</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Scaling Agents for Production Environments</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
            When hundreds of agent workers hit upstream LLM APIs, 429 Rate Limits will bring down your system. Learn how to implement leaky bucket rate limiters and multi-region load balancing.
          </p>
        </div>
        <Link
          href="/learn/level-4/module-4-15"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow-amber-500/20 transition-all shrink-0 cursor-pointer"
        >
          <span>Continue to Module 4.15</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
