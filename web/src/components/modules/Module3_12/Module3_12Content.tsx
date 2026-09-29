"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  Check,
  ArrowRight,
  Server,
  Zap,
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
  Workflow,
  Globe,
  Shield,
  Activity,
  Award,
} from "lucide-react";
import FastApiDeploymentStudio from "./FastApiDeploymentStudio";
import Module3_12Quiz from "./Module3_12Quiz";

export default function Module3_12Content() {
  const [selectedPillar, setSelectedPillar] = useState<string>("endpoint");
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [activeCodeTab, setActiveCodeTab] = useState<"code" | "output">("code");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);

  const pillars = [
    {
      id: "endpoint",
      title: "1. Async POST Endpoint",
      tagline: "Pydantic-Validated REST API",
      desc: "FastAPI handles asynchronous I/O natively. Wrap your compiled LangGraph app inside an async POST route with Pydantic request schemas and thread_id session headers.",
      icon: Server,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-500/10",
      border: "border-blue-200 dark:border-blue-500/30",
      badge: "FastAPI Async",
      codeSnippet: `# 1. PRODUCTION FASTAPI AGENT ROUTE
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from langgraph_agent import agent_app

app = FastAPI(title="LangGraph Agent Service", version="1.0.0")

class ChatRequest(BaseModel):
    message: str = Field(..., example="What were our Q3 metrics?")
    thread_id: str = Field(..., example="sess_user_99")

class ChatResponse(BaseModel):
    response: str
    thread_id: str

@app.post("/api/chat", response_model=ChatResponse)
async def chat_endpoint(req: ChatRequest):
    config = {"configurable": {"thread_id": req.thread_id}}
    
    # Run agent asynchronously
    result = await agent_app.ainvoke({"messages": [("user", req.message)]}, config)
    
    final_message = result["messages"][-1].content
    return ChatResponse(response=final_message, thread_id=req.thread_id)`,
    },
    {
      id: "streaming",
      title: "2. Real-Time SSE Streaming",
      tagline: "Server-Sent Events Token Stream",
      desc: "Users will not wait 15 seconds for a full answer. FastAPI's StreamingResponse streams tokens and node state transitions over SSE in real time as the model outputs them.",
      icon: Zap,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-500/10",
      border: "border-purple-200 dark:border-purple-500/30",
      badge: "text/event-stream",
      codeSnippet: `# 2. SERVER-SENT EVENTS (SSE) STREAMING ENDPOINT
import json
from fastapi.responses import StreamingResponse

@app.post("/api/chat/stream")
async def chat_stream_endpoint(req: ChatRequest):
    config = {"configurable": {"thread_id": req.thread_id}}
    
    async def event_generator():
        # Stream intermediate node deltas in real-time
        async for event in agent_app.astream({"messages": [("user", req.message)]}, config, stream_mode="messages"):
            message_chunk, metadata = event
            if message_chunk.content:
                yield f"data: {json.dumps({'chunk': message_chunk.content})}\\n\\n"
        yield "data: [DONE]\\n\\n"

    return StreamingResponse(event_generator(), media_type="text/event-stream")`,
    },
    {
      id: "background",
      title: "3. Async Background Jobs",
      tagline: "Long-Running Task Offloading",
      desc: "For complex deep research tasks taking 2+ minutes, HTTP requests will timeout. Dispatch jobs with BackgroundTasks or Celery, returning an immediate job_id for polling.",
      icon: Workflow,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      border: "border-emerald-200 dark:border-emerald-500/30",
      badge: "BackgroundTasks",
      codeSnippet: `# 3. DEFERRED EXECUTION WITH BACKGROUND JOBS
from fastapi import BackgroundTasks
import uuid

JOBS = {} # In production, use Redis or Postgres

async def execute_heavy_agent_task(job_id: str, prompt: str):
    JOBS[job_id] = {"status": "processing"}
    res = await agent_app.ainvoke({"messages": [("user", prompt)]})
    JOBS[job_id] = {"status": "completed", "result": res["messages"][-1].content}

@app.post("/api/jobs/submit")
async def submit_job(prompt: str, background_tasks: BackgroundTasks):
    job_id = str(uuid.uuid4())
    background_tasks.add_task(execute_heavy_agent_task, job_id, prompt)
    return {"job_id": job_id, "status": "queued"}

@app.get("/api/jobs/{job_id}")
async def get_job_status(job_id: str):
    if job_id not in JOBS:
        raise HTTPException(status_code=404, detail="Job not found")
    return JOBS[job_id]`,
    },
    {
      id: "production",
      title: "4. Production Readiness",
      tagline: "Healthchecks & Middleware",
      desc: "Enterprise deployments require CORS configuration for web clients, /healthz endpoints for Kubernetes liveness probes, and Prometheus metrics middleware.",
      icon: Shield,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      border: "border-amber-200 dark:border-amber-500/30",
      badge: "K8s Ready",
      codeSnippet: `# 4. PRODUCTION MIDDLEWARE & HEALTH PROBES
from fastapi.middleware.cors import CORSMiddleware

# Enable CORS for React/Next.js frontend applications
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://mycompany.com", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/healthz")
async def health_check():
    """Kubernetes liveness and readiness probe."""
    # Verify database pool connectivity
    is_db_healthy = check_db_pool_ping()
    if not is_db_healthy:
        raise HTTPException(status_code=503, detail="Database checkpointer unreachable")
    return {"status": "healthy", "service": "langgraph-agent"}`,
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
      <div className="rounded-2xl border border-blue-200 dark:border-blue-500/30 bg-gradient-to-br from-blue-500/10 via-teal-500/5 to-slate-50 dark:to-slate-950 p-6 md:p-8 relative overflow-hidden transition-colors">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-500/30">
              Module 3.12 • Capstone Deployment
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              ~25 min hands-on
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Deploying Agents with FastAPI
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Take your LangGraph agents to production. In this capstone lesson, we wrap agent workflows in <strong>high-performance asynchronous FastAPI servers</strong>: implementing Server-Sent Events (SSE) streaming, background queues, and production health probes.
          </p>
        </div>
      </div>

      {/* SECTION 1: 4 PILLARS OF FASTAPI DEPLOYMENT */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-500" />
            1. Core Architecture of Agent Microservices
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Select a deployment component
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
              FastAPI Server Inspector
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
                  <span>Streaming Tokens...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Simulate HTTP Request</span>
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
                fastapi_server.py • {selectedPillar}
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
                SSE Client Stream
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
                <p className="text-slate-400">$ curl -N -X POST http://localhost:8000/api/chat/stream -H &quot;Content-Type: application/json&quot; -d &apos;{`{"message": "Hello", "thread_id": "t1"}`}&apos;</p>
                <p className="text-sky-300">data: {`{"chunk": "Hello"}`}</p>
                <p className="text-sky-300">data: {`{"chunk": "! How"}`}</p>
                <p className="text-sky-300">data: {`{"chunk": " can I"}`}</p>
                <p className="text-sky-300">data: {`{"chunk": " assist you today?"}`}</p>
                <p className="text-emerald-400 font-bold">data: [DONE]</p>
                <p className="text-slate-400">&gt;&gt; HTTP 200 OK — First Token in 180ms (TTFT).</p>
              </div>
            )}
          </div>
        </div>

        {/* Simulation Banner */}
        {simStep > 0 && (
          <div className="p-3.5 rounded-xl border border-blue-200 dark:border-blue-500/30 bg-blue-50/80 dark:bg-blue-950/30 flex items-center justify-between text-xs font-mono">
            <span className="text-blue-800 dark:text-blue-200">
              {simStep === 1 && "Client connects to /api/chat/stream -> Uvicorn allocates async task"}
              {simStep === 2 && "LangGraph begins execution -> First node yields initial token"}
              {simStep === 3 && "FastAPI streams data chunks over open HTTP connection in real time"}
              {simStep === 4 && "Stream concludes with [DONE] -> Connection closed without worker thread lock!"}
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
            2. Interactive FastAPI Deployment Studio
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Live Endpoint & SSE Sandbox
          </span>
        </div>
        <FastApiDeploymentStudio />
      </section>

      {/* SECTION 4: HANDWRITTEN NOTE */}
      <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-500/30 bg-blue-50/90 dark:bg-blue-500/10 shadow-sm">
        <span className="font-['Caveat',cursive] text-base text-blue-950 dark:text-blue-200 block">
          📌 Notebook vs Production: A Jupyter notebook agent is only accessible to you. FastAPI transforms your LangGraph code into a 1000-user microservice with streaming responses, CORS for React web clients, and Kubernetes health checks in under 50 lines of code!
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
              TRAP #1: Blocking Sync Calls in Async Endpoints
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Calling <code>app.invoke()</code> (synchronous) instead of <code>await app.ainvoke()</code> inside an async FastAPI route blocks Python&apos;s single event loop. While one agent runs for 10 seconds, all other incoming HTTP requests freeze. Always use async methods in production.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-500/5 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
              TRAP #2: Gateway Timeouts on Long Agent Runs
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Cloudflare, AWS ALB, and Nginx enforce 60-second default request timeouts. If an agent performs 8 tool calls taking 70 seconds over a non-streaming POST, the proxy terminates the connection with a 504 Gateway Timeout. Always use SSE streaming or background jobs with polling.
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
            ["1.", "Async by Default:", "Leverage ainvoke and astream to prevent blocking server threads and maximize concurrent throughput."],
            ["2.", "SSE Keeps Clients Informed:", "StreamingResponse provides immediate Time-To-First-Token (TTFT) and prevents proxy timeout disconnections."],
            ["3.", "Resilient Health Probes:", "Implement /healthz checks that verify database and model connectivity for auto-healing Kubernetes clusters."],
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
                Capstone Quiz: FastAPI Agent Deployment
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {showQuiz ? "Click to collapse" : "Final Level 3 knowledge check (3 questions)"}
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
              <Module3_12Quiz />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* LEVEL 3 GRADUATION CELEBRATION */}
      <section className="rounded-2xl border-2 border-blue-400 dark:border-blue-600 bg-gradient-to-br from-blue-500/15 via-indigo-500/10 to-transparent p-6 sm:p-8 space-y-5">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-500/20 text-blue-600 dark:text-blue-300 flex items-center justify-center shadow-sm shrink-0">
            <Award className="w-7 h-7" />
          </div>
          <div>
            <div className="text-xs font-mono font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">Level 3 Milestone Achieved</div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">Congratulations! You&apos;ve Mastered LangGraph & Advanced Workflows</h3>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          You now command the complete LangGraph stack: Conditional Routing, State Reducers, MCP Protocol, Agentic RAG, Plan-and-Execute Decomposition, Deep Planning Trees, Human-in-the-Loop Gates, Reflection Loops, Database Checkpointing, Semantic Memory, and Production FastAPI Deployment.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-blue-200 dark:border-blue-500/30">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Ready for the final frontier? Level 4: Production Multi-Agent Systems & Enterprise Scale.
          </div>
          <Link
            href="/learn/level-4/module-4-1"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all shrink-0 cursor-pointer"
          >
            <span>Proceed to Level 4 • Module 4.1</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
