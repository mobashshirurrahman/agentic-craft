"use client";
import React from "react";
import {
  Server,
  Database,
  HardDrive,
  Code2,
  Sparkles,
  Lightbulb,
  CheckCircle2,
  ShieldAlert,
  Sliders,
  DollarSign,
  Activity,
  Layers,
  Box,
} from "lucide-react";
import DistributedScaleSimulator from "./DistributedScaleSimulator";
import Module4_15Quiz from "./Module4_15Quiz";

export default function Module4_15Content() {
  return (
    <div className="space-y-10">
      {/* Hero Header */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-teal-500/10 via-emerald-500/5 to-slate-50 dark:to-slate-950 p-6 md:p-8">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-teal-500/20 text-teal-700 dark:text-teal-300 border border-teal-500/30">
              Module 4.15 • Production, Scaling & Optimization
            </span>
            <span className="text-xs font-mono text-slate-500">~33 min</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Scaling Agents for Production Environments
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            In standard web apps, scaling is straightforward: add a database read replica and throw more compute at the problem. But AI agents behave radically differently: they are <strong>intensely I/O bound</strong>, accumulate massive conversation state, and consume tokens with linear billing. One rogue infinite loop can drain your company&apos;s bank account in hours. Here is how to architect robust, scalable distributed agent systems.
          </p>
        </div>
      </div>

      {/* Real-World Analogy */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Box className="w-5 h-5 text-teal-500" />
          1. The Office Memory Analogy: Sticky Notes vs. Filing Cabinets vs. Warehouses
        </h2>
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-3 text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            Think of how an executive assistant manages knowledge:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-2">
            <div className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-900/40 bg-amber-50/50 dark:bg-amber-950/20 space-y-1">
              <span className="font-bold text-amber-800 dark:text-amber-300 block text-xs">1. Sticky Note on Desk (Hot Storage / Redis)</span>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                &ldquo;User currently on step 2 of flight booking.&rdquo; Accessed in 1 millisecond. When the task finishes, you crumple it and throw it in the trash (TTL auto-purge).
              </p>
            </div>
            <div className="p-3.5 rounded-xl border border-indigo-200 dark:border-indigo-900/40 bg-indigo-50/50 dark:bg-indigo-950/20 space-y-1">
              <span className="font-bold text-indigo-800 dark:text-indigo-300 block text-xs">2. Office Filing Cabinet (Warm / Postgres)</span>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Durable historical customer folder with permanent invoices, user preferences, and thread checkpoints. Indexed, structured, and backed up daily.
              </p>
            </div>
            <div className="p-3.5 rounded-xl border border-teal-200 dark:border-teal-900/40 bg-teal-50/50 dark:bg-teal-950/20 space-y-1">
              <span className="font-bold text-teal-800 dark:text-teal-300 block text-xs">3. Basement Warehouse (Cold Storage / S3)</span>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Heavy cardboard boxes with 500-page scanned PDF contracts and audio recordings. Extremely cheap ($0.02/GB), offloading physical desk space so the office runs at top speed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The 3-Tier Storage Table */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-500" />
          2. The 3-Tier Storage Architecture for Agents
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800">
                {["Storage Tier", "Technology", "Latency", "What Belongs Here?", "Retention"].map((h) => (
                  <th key={h} className="p-3 font-mono font-bold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Hot Storage", "Redis Cluster / DragonFly", "~1ms", "Active session scratchpad, tool lock states, token bucket limits", "TTL 1–2 hours"],
                ["Warm Storage", "PostgreSQL / DynamoDB", "~10–25ms", "Thread checkpoints (LangGraph state), user profiles, billing logs", "Permanent / Months"],
                ["Cold Storage", "AWS S3 / Google Cloud Storage", "~100–250ms", "Scraped HTML snapshots, generated PDF reports, vector store dumps", "Glacier / Long-term"],
              ].map(([tier, tech, lat, what, ret], i) => (
                <tr key={i} className="border-b border-slate-200 dark:border-slate-800">
                  <td className="p-3 font-semibold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950/40">
                    {tier}
                  </td>
                  <td className="p-3 font-mono text-teal-600 dark:text-teal-400 border border-slate-200 dark:border-slate-700">
                    {tech}
                  </td>
                  <td className="p-3 font-mono text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                    {lat}
                  </td>
                  <td className="p-3 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                    {what}
                  </td>
                  <td className="p-3 text-slate-500 font-mono text-[11px] border border-slate-200 dark:border-slate-700">
                    {ret}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Production Rate Limiting & Token Budget Code */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Code2 className="w-5 h-5 text-teal-500" />
          3. Token Budget Circuit Breaker & Rate Limiter (Python + Redis)
        </h2>
        <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs border border-slate-800 overflow-x-auto">
          <pre>{`import redis
from fastapi import HTTPException

redis_client = redis.Redis(host="localhost", port=6379, db=0)

DAILY_TOKEN_BUDGET = 250_000   # Max 250K tokens per tenant/day (~$10 budget)
MAX_CONCURRENT_TASKS = 3       # Max 3 parallel agent workflows per tenant

def check_tenant_guardrails(tenant_id: str, estimated_tokens: int = 4000):
    pipe = redis_client.pipeline()
    
    # 1. Enforce Concurrency Cap
    active_tasks = int(redis_client.get(f"tenant:{tenant_id}:active_tasks") or 0)
    if active_tasks >= MAX_CONCURRENT_TASKS:
        raise HTTPException(
            status_code=429,
            detail="Tenant concurrency cap reached. Max 3 concurrent agents."
        )
        
    # 2. Enforce Daily Token Budget
    spend_key = f"tenant:{tenant_id}:tokens_today"
    current_tokens = int(redis_client.get(spend_key) or 0)
    
    if current_tokens + estimated_tokens > DAILY_TOKEN_BUDGET:
        raise HTTPException(
            status_code=402, # Payment Required / Quota Exceeded
            detail=f"Daily token budget exceeded ({current_tokens}/{DAILY_TOKEN_BUDGET})."
        )
        
    # Atomic increment and 24-hour TTL expiry
    pipe.incrby(spend_key, estimated_tokens)
    pipe.expire(spend_key, 86400)
    pipe.incr(f"tenant:{tenant_id}:active_tasks")
    pipe.execute()`}</pre>
        </div>
      </section>

      {/* Interactive Studio Workbench */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-teal-500" />
            4. Interactive Studio: Distributed Scale & Spend Simulator
          </h2>
          <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Simulate hundreds of concurrent agent requests. Watch hot, warm, and cold storage distribute load, and inject a rogue runaway tenant loop to see the circuit breaker in action!
          </p>
        </div>
        <DistributedScaleSimulator />
      </section>

      {/* Interview Gold Callout */}
      <section className="p-6 rounded-2xl border border-teal-300 dark:border-teal-800/60 bg-gradient-to-br from-teal-500/10 via-teal-500/5 to-transparent space-y-3">
        <div className="flex items-center gap-2 text-teal-700 dark:text-teal-400 font-bold text-sm">
          <Lightbulb className="w-5 h-5 text-teal-500" />
          💡 Interview Gold: System Design Question — &ldquo;Scale a Multi-Tenant Agent to 100K Users&rdquo;
        </div>
        <div className="text-xs md:text-sm text-slate-700 dark:text-slate-300 space-y-2 leading-relaxed">
          <p>
            <strong>Question:</strong> &ldquo;How do you architect a multi-tenant agent system handling 100,000 active users while protecting against runaway token bills and node failures?&rdquo;
          </p>
          <div className="pl-4 border-l-2 border-teal-400 space-y-1 font-mono text-xs text-slate-800 dark:text-slate-200">
            <p>1. <strong>Stateless Workers:</strong> Worker nodes must never store user conversation memory locally on disk or RAM. State is fetched from Redis on each step and saved back immediately, allowing any worker to pick up the next turn.</p>
            <p>2. <strong>Decoupled Tiered Storage:</strong> Redis Cluster for hot active step scratchpad (TTL 1hr); Postgres with Read Replicas for thread checkpoints; S3 for large artifacts (keeping DB indices lean).</p>
            <p>3. <strong>Tenant Token Quotas & Backpressure:</strong> Implement Token Bucket rate limiting per tenant in Redis. Enforce both a hard monetary cap ($/day) and a concurrency cap (max 5 simultaneous runs) to isolate noisy neighbors.</p>
            <p>4. <strong>Kubernetes Graceful Draining:</strong> Configure <code className="text-teal-400">terminationGracePeriodSeconds: 180</code> with a SIGTERM handler so workers finish in-flight agent thought steps before pod eviction.</p>
          </div>
        </div>
      </section>

      {/* Mastery Quiz */}
      <section className="space-y-4">
        <Module4_15Quiz />
      </section>
    </div>
  );
}
