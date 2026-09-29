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
  Clock,
  Radio,
  Send,
  XCircle,
  Webhook,
} from "lucide-react";
import AsyncJobApiStudio from "./AsyncJobApiStudio";
import Module4_13Quiz from "./Module4_13Quiz";

export default function Module4_13Content() {
  const [selectedPillar, setSelectedPillar] = useState<string>("http_202");
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [activeCodeTab, setActiveCodeTab] = useState<"code" | "output">("code");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);

  const pillars = [
    {
      id: "http_202",
      title: "1. HTTP 202 Accepted + Polling",
      tagline: "The Async Job Ticket Pattern",
      desc: "Return HTTP 202 immediately with a job ID and status URL. Clients poll every 2-5 seconds, bypassing load balancer 504 timeouts completely.",
      icon: Clock,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      border: "border-amber-200 dark:border-amber-500/30",
      badge: "HTTP 202 Pattern",
      codeSnippet: `# 1. FASTAPI ASYNC JOB TICKET PATTERN
from fastapi import FastAPI, BackgroundTasks, status
from fastapi.responses import JSONResponse
import uuid

app = FastAPI()
tasks_db = {}

@app.post("/api/v1/agent/research", status_code=status.HTTP_202_ACCEPTED)
async def submit_agent_task(prompt: str, bg_tasks: BackgroundTasks):
    task_id = str(uuid.uuid4())
    tasks_db[task_id] = {"status": "queued", "progress": 0}
    
    # Offload execution to background worker
    bg_tasks.add_task(run_agent_pipeline, task_id, prompt)
    
    return {
        "task_id": task_id,
        "status": "queued",
        "poll_url": f"/api/v1/agent/tasks/{task_id}"
    }`,
    },
    {
      id: "sse_streaming",
      title: "2. Server-Sent Events (SSE)",
      tagline: "Unidirectional Live Telemetry",
      desc: "Stream real-time tokens, tool call notifications, and intermediate node outputs over a single persistent HTTP connection using standard EventSource.",
      icon: Radio,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-500/10",
      border: "border-blue-200 dark:border-blue-500/30",
      badge: "SSE Streaming",
      codeSnippet: `# 2. SERVER-SENT EVENTS (SSE) STREAMING
from fastapi.responses import StreamingResponse
import json

@app.get("/api/v1/agent/tasks/{task_id}/stream")
async def stream_agent_events(task_id: str):
    async def event_generator():
        async for event in agent_app.astream_events({"task_id": task_id}, version="v2"):
            kind = event["event"]
            if kind == "on_chat_model_stream":
                chunk = event["data"]["chunk"].content
                yield f"data: {json.dumps({'type': 'token', 'content': chunk})}\\n\\n"
            elif kind == "on_tool_start":
                yield f"data: {json.dumps({'type': 'tool', 'name': event['name']})}\\n\\n"
    
    return StreamingResponse(event_generator(), media_type="text/event-stream")`,
    },
    {
      id: "webhooks",
      title: "3. Signed Webhook Callbacks",
      tagline: "HMAC-Secured Server Delivery",
      desc: "When agents finish multi-minute research batches, POST the final report to the customer's callback URL signed with HMAC-SHA256 headers.",
      icon: Webhook,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-500/10",
      border: "border-purple-200 dark:border-purple-500/30",
      badge: "HMAC Webhooks",
      codeSnippet: `# 3. HMAC-SIGNED WEBHOOK DISPATCH
import hmac, hashlib, httpx

async def dispatch_webhook(callback_url: str, secret_key: str, payload: dict):
    body_bytes = json.dumps(payload).encode("utf-8")
    signature = hmac.new(secret_key.encode(), body_bytes, hashlib.sha256).hexdigest()
    
    headers = {
        "Content-Type": "application/json",
        "X-Agent-Signature": signature
    }
    async with httpx.AsyncClient() as client:
        await client.post(callback_url, content=body_bytes, headers=headers, timeout=10.0)`,
    },
    {
      id: "cancellation",
      title: "4. Distributed Abort Signals",
      tagline: "Task Cancellation & Resource Freeing",
      desc: "If a user navigates away or cancels their request, broadcast an abort signal to Redis so the worker stops burning LLM API tokens immediately.",
      icon: XCircle,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      border: "border-emerald-200 dark:border-emerald-500/30",
      badge: "Abort Signal",
      codeSnippet: `# 4. CANCELLATION VIA DISTRIBUTED REDIS FLAG
@app.post("/api/v1/agent/tasks/{task_id}/cancel")
async def cancel_task(task_id: str):
    await redis_client.set(f"cancel:{task_id}", "1", ex=3600)
    return {"status": "cancellation_requested"}

# Inside agent worker node execution loop:
async def check_cancellation(task_id: str):
    if await redis_client.exists(f"cancel:{task_id}"):
        raise AgentTaskCancelledException("User requested cancellation")`,
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
              Module 4.13 • Production, Scaling & Optimization
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              ~25 min interactive
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Designing APIs for Long-Running Agent Tasks
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Standard web APIs return in 80ms. An autonomous agent researching 10 websites can take 3 minutes. Holding synchronous HTTP connections open triggers <strong>504 Gateway Timeouts</strong>. Master <strong>HTTP 202 Accepted</strong>, Server-Sent Events (SSE), signed webhooks, and distributed cancellation.
          </p>
        </div>
      </div>

      {/* SECTION 1: 4 ARCHITECTURE PILLARS */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-amber-500" />
            1. Core Pillars of Asynchronous Agent APIs
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Select an API pattern
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
              Async API &amp; Stream Inspector
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
                  <span>Streaming Job...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Simulate Async Flow</span>
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
                async_api.py • {selectedPillar}
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
                HTTP Wire Traffic
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
                <p className="text-slate-400">&gt;&gt; POST /api/v1/agent/research HTTP/1.1 (Latency: 12ms)</p>
                <p className="text-emerald-400">   HTTP/1.1 202 Accepted {`{"task_id": "job_941", "status": "queued"}`}</p>
                <p className="text-slate-300">   [Client SSE Connection Opened]: /api/v1/agent/tasks/job_941/stream</p>
                <p className="text-sky-300">   event: token | data: &quot;Initiating SEC 10-K search...&quot;</p>
                <p className="text-sky-300">   event: tool  | data: {`{"name": "fetch_10q", "ticker": "NVDA"}`}</p>
                <p className="text-emerald-400 font-bold">&gt;&gt; event: done  | data: {`{"status": "completed", "duration_ms": 34100}`}</p>
              </div>
            )}
          </div>
        </div>

        {/* Simulation Banner */}
        {simStep > 0 && (
          <div className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/80 dark:bg-amber-950/30 flex items-center justify-between text-xs font-mono">
            <span className="text-amber-800 dark:text-amber-200">
              {simStep === 1 && "Client submits long task -> API responds in 12ms with HTTP 202 Accepted"}
              {simStep === 2 && "Client attaches SSE Stream listener for live progress tokens & tool logs"}
              {simStep === 3 && "Worker executes multi-node agent pipeline asynchronously in background"}
              {simStep === 4 && "Final report delivered with HMAC signature -> Zero 504 timeouts occurred!"}
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
            2. Interactive Async Job API Studio
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            HTTP 202 Polling vs SSE Streamer
          </span>
        </div>
        <AsyncJobApiStudio />
      </section>

      {/* SECTION 4: HANDWRITTEN PRODUCTION INSIGHT */}
      <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/90 dark:bg-amber-500/10 shadow-sm">
        <span className="font-['Caveat',cursive] text-base text-amber-950 dark:text-amber-200 block">
          📌 Production Insight: Never return a synchronous HTTP 200 for an agent pipeline that can run for &gt; 10 seconds! AWS Application Load Balancers and Cloudflare have default 60-second idle connection timeouts. If your agent is waiting on an external API or generating a complex synthesis, the load balancer will tear down the TCP socket with a 504 error while your agent keeps running in the background, wasting money!
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
              TRAP #1: The In-Memory BackgroundTasks Trap
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Using FastAPI&apos;s built-in <code>BackgroundTasks</code> in production. If your web container restarts or auto-scales down while an agent is mid-execution, all in-flight jobs die silently with zero recovery. Always push jobs to an external persistent queue like Celery or Redis Streams.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-500/5 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
              TRAP #2: Missing Zombie Task Cancellation
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              When a user closes their browser tab, the frontend disconnects. If your backend doesn&apos;t register an abort signal or check connection liveness, the agent worker keeps invoking expensive LLM tools for minutes on behalf of a user who is no longer there.
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
            ["1.", "HTTP 202 Decoupling:", "Immediately return a ticket ID so clients can poll or stream status without hitting HTTP 504 timeouts."],
            ["2.", "SSE Streaming:", "Use Server-Sent Events to provide real-time token and tool transparency to end users."],
            ["3.", "Distributed Cancellation:", "Check Redis cancellation flags on every agent graph turn to abort abandoned tasks instantly."],
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
                Concept Check: Async Agent APIs
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {showQuiz ? "Click to collapse" : "Test your understanding of HTTP 202, SSE, and task abort signals (3 questions)"}
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
              <Module4_13Quiz />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* SECTION 8: NEXT MODULE BRIDGE */}
      <section className="rounded-2xl border border-amber-200 dark:border-amber-500/30 bg-gradient-to-r from-amber-50 via-white to-slate-50 dark:from-amber-500/10 dark:via-slate-900 dark:to-slate-950 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
            <span>Up Next • Module 4.14</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Deploying Agents in Worker Node Architectures</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
            Keep your web servers lightweight. Learn how to decouple HTTP intake from compute-heavy agent loops using Redis Streams, Celery, and auto-scaling worker pools.
          </p>
        </div>
        <Link
          href="/learn/level-4/module-4-14"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow-amber-500/20 transition-all shrink-0 cursor-pointer"
        >
          <span>Continue to Module 4.14</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
