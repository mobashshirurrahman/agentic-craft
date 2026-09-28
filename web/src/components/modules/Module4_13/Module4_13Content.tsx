"use client";
import React from "react";
import {
  Globe,
  Code2,
  Sparkles,
  Lightbulb,
  Radio,
  CheckCircle2,
  Clock,
  Send,
  Coffee,
  Layers,
  ShieldCheck,
} from "lucide-react";
import AsyncJobApiStudio from "./AsyncJobApiStudio";
import Module4_13Quiz from "./Module4_13Quiz";

export default function Module4_13Content() {
  return (
    <div className="space-y-10">
      {/* Hero Header */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-teal-500/10 via-sky-500/5 to-slate-50 dark:to-slate-950 p-6 md:p-8">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-teal-500/20 text-teal-700 dark:text-teal-300 border border-teal-500/30">
              Module 4.13 • Production, Scaling & Optimization
            </span>
            <span className="text-xs font-mono text-slate-500">~24 min</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Designing APIs for Long-Running Agent Tasks
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Standard web APIs are designed for milliseconds: user clicks &ldquo;Save&rdquo;, server updates a row, and returns in 80ms. But when an AI agent needs to search 15 web pages, write Python code, execute it in a sandbox, and verify the output, it can take <strong>30 seconds to 5+ minutes</strong>. If you try to hold a standard HTTP connection open for 3 minutes, your load balancer (AWS ALB, Cloudflare, NGINX) will slam the door shut with a <code className="font-mono text-rose-500 font-bold">504 Gateway Timeout</code>. Here is how to design enterprise async APIs for AI agents.
          </p>
        </div>
      </div>

      {/* Real-World Analogy */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Coffee className="w-5 h-5 text-teal-500" />
          1. The Restaurant Buzzer Analogy
        </h2>
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-3 text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            Imagine you walk into a busy bakery and order a custom anniversary cake that takes 45 minutes to bake and decorate:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
            <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-900/40 bg-rose-50/50 dark:bg-rose-950/20 space-y-1.5">
              <span className="font-bold text-rose-700 dark:text-rose-400 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                ❌ Synchronous HTTP (Standing at the Register)
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                You stand frozen right at the counter. The cashier cannot take another customer&apos;s order. The line out the door grows to 200 angry people. After 60 seconds of silence, security escorts you out (Load Balancer Timeout).
              </p>
            </div>
            <div className="p-4 rounded-xl border border-teal-200 dark:border-teal-900/40 bg-teal-50/50 dark:bg-teal-950/20 space-y-1.5">
              <span className="font-bold text-teal-700 dark:text-teal-400 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                ✅ Asynchronous HTTP 202 (The Order Pager / Buzzer)
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                The cashier immediately hands you a vibrating buzzer with <strong>Order #492</strong> and says &ldquo;We are on it!&rdquo; (HTTP 202 Accepted). You go sit at a table, sip coffee, and glance at the screen or wait for your buzzer to vibrate (Polling / Webhook).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Protocol Architecture Matrix */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-500" />
          2. The Four Agent API Protocols Compared
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800">
                {["Protocol", "Client Flow", "Best Used For", "Complexity"].map((h) => (
                  <th key={h} className="p-3 font-mono font-bold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Synchronous HTTP", "POST -> Wait 180s -> 200 OK", "Sub-second LLM completions only", "Very Low (Fails on long agent runs)"],
                ["HTTP 202 + Polling", "POST -> 202 {task_id} -> Loop GET /tasks/{id}", "Mobile apps, legacy systems, batch jobs", "Low / Moderate (Predictable & robust)"],
                ["Webhooks (Callbacks)", "POST {callback_url} -> Server POSTs result later", "B2B integrations, server-to-server pipelines", "Moderate (Requires public callback URL & HMAC)"],
                ["Server-Sent Events (SSE)", "GET /stream -> Real-time token & step stream", "Modern web UIs, live AI copilots (ChatGPT style)", "Moderate (Unidirectional, native in browser)"],
              ].map(([p, flow, best, comp], i) => (
                <tr key={i} className="border-b border-slate-200 dark:border-slate-800">
                  <td className="p-3 font-semibold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950/40">
                    {p}
                  </td>
                  <td className="p-3 font-mono text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                    {flow}
                  </td>
                  <td className="p-3 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                    {best}
                  </td>
                  <td className="p-3 text-teal-700 dark:text-teal-300 font-mono border border-slate-200 dark:border-slate-700">
                    {comp}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Production FastAPI Async Implementation */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Code2 className="w-5 h-5 text-teal-500" />
          3. Production FastAPI Async Agent Endpoints (Polling & SSE)
        </h2>
        <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs border border-slate-800 overflow-x-auto">
          <pre>{`from fastapi import FastAPI, BackgroundTasks, status, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
import uuid, asyncio, json

app = FastAPI(title="Long-Running Agent API")
task_db = {} # In production: use Redis or Postgres

class AgentRequest(BaseModel):
    user_goal: str
    callback_url: str | None = None

# ── 1. Submit Endpoint: Immediate 202 Accepted ──────
@app.post("/api/v1/tasks", status_code=status.HTTP_202_ACCEPTED)
async def submit_agent_task(req: AgentRequest, bg_tasks: BackgroundTasks):
    task_id = str(uuid.uuid4())
    task_db[task_id] = {"status": "QUEUED", "progress": 0, "result": None}
    
    # Enqueue background execution (or send to Celery/Redis Queue)
    bg_tasks.add_task(run_agent_workflow, task_id, req.user_goal, req.callback_url)
    
    return {
        "task_id": task_id,
        "status_url": f"/api/v1/tasks/{task_id}",
        "stream_url": f"/api/v1/tasks/{task_id}/stream",
        "estimated_seconds": 45
    }

# ── 2. Polling Endpoint: Inspect Status & Progress ───
@app.get("/api/v1/tasks/{task_id}")
async def get_task_status(task_id: str):
    if task_id not in task_db:
        raise HTTPException(status_code=404, detail="Task not found")
    return task_db[task_id]

# ── 3. Server-Sent Events (SSE) Real-Time Stream ─────
@app.get("/api/v1/tasks/{task_id}/stream")
async def stream_agent_events(task_id: str):
    async def event_generator():
        while True:
            task = task_db.get(task_id)
            if not task:
                break
            
            # Send formatted SSE chunk
            yield f"event: progress\\ndata: {json.dumps(task)}\\n\\n"
            
            if task["status"] in ["COMPLETED", "FAILED"]:
                yield f"event: done\\ndata: {json.dumps(task)}\\n\\n"
                break
            await asyncio.sleep(1.0)
            
    return StreamingResponse(event_generator(), media_type="text/event-stream")`}</pre>
        </div>
      </section>

      {/* Interactive Studio Workbench */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Radio className="w-5 h-5 text-teal-500" />
            4. Interactive Studio: Protocol Comparison Simulator
          </h2>
          <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Test a simulated 3-minute agent research task across Synchronous HTTP, HTTP 202 Polling, Webhooks, and Server-Sent Events. Watch how network packets behave in real-time!
          </p>
        </div>
        <AsyncJobApiStudio />
      </section>

      {/* Interview Gold Callout */}
      <section className="p-6 rounded-2xl border border-teal-300 dark:border-teal-800/60 bg-gradient-to-br from-teal-500/10 via-teal-500/5 to-transparent space-y-3">
        <div className="flex items-center gap-2 text-teal-700 dark:text-teal-400 font-bold text-sm">
          <Lightbulb className="w-5 h-5 text-teal-500" />
          💡 Interview Gold: System Design Question — &ldquo;Design the API for a Financial Agent&rdquo;
        </div>
        <div className="text-xs md:text-sm text-slate-700 dark:text-slate-300 space-y-2 leading-relaxed">
          <p>
            <strong>Interviewer:</strong> &ldquo;The financial research agent takes anywhere from 45 seconds to 4 minutes to generate an equity analysis report. How would you design the API?&rdquo;
          </p>
          <div className="pl-4 border-l-2 border-teal-400 space-y-1 font-mono text-xs text-slate-800 dark:text-slate-200">
            <p>1. <strong>Do Not Block HTTP:</strong> Immediately reject a synchronous blocking request pattern. State that proxy servers and browser HTTP timeouts will terminate the connection.</p>
            <p>2. <strong>Dual Protocol Design:</strong> Offer both <strong>HTTP 202 Accepted + Polling</strong> (for robust server-to-server or mobile clients) and <strong>Server-Sent Events (SSE)</strong> (for web browsers that want to stream token chunks and live tool progress).</p>
            <p>3. <strong>Idempotency Keys:</strong> Require an <code className="text-teal-400">Idempotency-Key: uuid</code> header on the initial POST to prevent duplicate expensive LLM agent runs if the client network drops and retries.</p>
            <p>4. <strong>Webhooks with HMAC Signing:</strong> If delivering results via webhook, sign payloads with SHA-256 HMAC in an <code className="text-teal-400">X-Signature-256</code> header and support automatic retries with exponential backoff.</p>
          </div>
        </div>
      </section>

      {/* Mastery Quiz */}
      <section className="space-y-4">
        <Module4_13Quiz />
      </section>
    </div>
  );
}
