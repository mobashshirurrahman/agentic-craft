"use client";

import React from "react";
import {
  Server,
  Zap,
  Code2,
  Layers,
  Sparkles,
  Lightbulb,
  CheckCircle2,
  Globe,
  Shield,
} from "lucide-react";
import FastApiDeploymentStudio from "./FastApiDeploymentStudio";
import Module3_12Quiz from "./Module3_12Quiz";

export default function Module3_12Content() {
  return (
    <div className="space-y-10">
      {/* Hero Banner */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-teal-500/10 via-emerald-500/5 to-slate-50 dark:to-slate-950 p-6 md:p-8 relative overflow-hidden transition-colors">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-teal-500/20 text-teal-700 dark:text-teal-300 border border-teal-500/30">
              Module 3.12 • Advanced Patterns
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              ~25 min hands-on
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Deploying Agents with FastAPI
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            A LangGraph agent running in a Jupyter notebook is a science project. The same agent behind a{" "}
            <strong>FastAPI server</strong> is a product. FastAPI gives your agent an HTTP address, a
            streaming endpoint, a health check for Kubernetes, and the async concurrency to handle
            thousands of users — all with around 50 lines of Python.
          </p>
        </div>
      </div>

      {/* Section 1: Why FastAPI */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-teal-500" />
          1. Why FastAPI — The One-Minute Answer
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              icon: <Zap className="w-4 h-4 text-yellow-500" />,
              title: "Async Native",
              body: "Built on ASGI (not WSGI). A single FastAPI worker handles thousands of concurrent streaming connections — no threading hacks.",
              color: "yellow",
            },
            {
              icon: <Shield className="w-4 h-4 text-blue-500" />,
              title: "Auto-Validated Requests",
              body: "Pydantic models validate every incoming request body automatically. Malformed payloads never reach your agent.",
              color: "blue",
            },
            {
              icon: <Globe className="w-4 h-4 text-emerald-500" />,
              title: "OpenAPI Docs Free",
              body: "Visit /docs for an interactive Swagger UI — auto-generated from your type hints. Zero extra configuration.",
              color: "emerald",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2"
            >
              <div className="flex items-center gap-2">
                {item.icon}
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">{item.title}</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: The 4-Endpoint Blueprint */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Code2 className="w-5 h-5 text-teal-500" />
          2. The Production FastAPI Agent Blueprint
        </h2>
        <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs border border-slate-800 overflow-x-auto">
          <pre>{`from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from langgraph.graph import StateGraph
import asyncio, json

app = FastAPI(title="AgentAPI", version="1.0.0")

# ── Load your compiled LangGraph app once at startup ──
agent_app = build_and_compile_graph()  # returns compiled LangGraph

class RunRequest(BaseModel):
    input: str
    thread_id: str = "default"

# 1. Synchronous endpoint — blocks until complete
@app.post("/run")
async def run_agent(req: RunRequest):
    config = {"configurable": {"thread_id": req.thread_id}}
    result = await agent_app.ainvoke({"messages": [("user", req.input)]}, config)
    return {"output": result["messages"][-1].content}

# 2. Streaming endpoint — returns Server-Sent Events
@app.post("/stream")
async def stream_agent(req: RunRequest):
    config = {"configurable": {"thread_id": req.thread_id}}

    async def event_generator():
        async for chunk in agent_app.astream(
            {"messages": [("user", req.input)]}, config, stream_mode="values"
        ):
            last_msg = chunk["messages"][-1]
            if hasattr(last_msg, "content") and last_msg.content:
                yield f"data: {json.dumps({'token': last_msg.content})}\\n\\n"
        yield "data: [DONE]\\n\\n"

    return StreamingResponse(event_generator(), media_type="text/event-stream")

# 3. History endpoint — fetch conversation from checkpointer
@app.get("/history/{thread_id}")
async def get_history(thread_id: str):
    config = {"configurable": {"thread_id": thread_id}}
    state = await agent_app.aget_state(config)
    return {"messages": state.values.get("messages", [])}

# 4. Health check — required for Kubernetes liveness probes
@app.get("/health")
async def health():
    return {"status": "ok", "version": "1.0.0"}`}</pre>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center">
          {[
            { path: "POST /run", desc: "Blocking response", color: "blue" },
            { path: "POST /stream", desc: "SSE token stream", color: "teal" },
            { path: "GET /history", desc: "Checkpoint retrieval", color: "purple" },
            { path: "GET /health", desc: "K8s liveness probe", color: "emerald" },
          ].map((item) => (
            <div
              key={item.path}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60"
            >
              <p className="font-mono text-[10px] font-bold text-slate-700 dark:text-slate-300">
                {item.path}
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Streaming explained */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-500" />
          3. Streaming vs Blocking — Why It Matters to Users
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/20 space-y-2">
            <span className="text-xs font-mono font-bold text-red-600 dark:text-red-400 uppercase">
              ❌ Blocking /run
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              User sends request. Cursor spins for 8 seconds. Full answer appears at once. <strong>Perceived wait: 8 seconds.</strong> Users assume the app is broken after 3 seconds.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50 dark:bg-emerald-950/20 space-y-2">
            <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase">
              ✅ Streaming /stream
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              First token arrives in ~200ms. Text streams word-by-word like a human typing. <strong>Perceived wait: 0.2 seconds.</strong> TTFT (Time-To-First-Token) is the metric that matters for UX.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Studio */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-teal-500" />
            4. Interactive FastAPI Deployment Studio
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Live API Simulator
          </span>
        </div>
        <FastApiDeploymentStudio />
      </section>

      {/* Golden Rule */}
      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 space-y-2">
        <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-semibold text-sm">
          <Lightbulb className="w-4 h-4 text-teal-500 shrink-0" />
          Production Rule: Start with /run, Graduate to /stream
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Build <code>/run</code> first — it is simpler to test, debug, and integrate. Once the agent logic is solid,
          add <code>/stream</code> as a thin wrapper around the same <code>agent_app</code>. The LangGraph graph itself doesn&rsquo;t change — only the HTTP layer does.
        </p>
      </div>

      {/* Key Takeaways */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          Key Takeaways
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { title: "ASGI = Concurrency", body: "FastAPI handles thousands of simultaneous streaming connections with a single Python process. Flask cannot do this without complex multi-threading setup." },
            { title: "4 Endpoints, One Agent", body: "One compiled LangGraph app powers all 4 endpoints. /run, /stream, /history, /health are just different HTTP views of the same graph." },
            { title: "uvicorn to Production", body: "Run locally with `uvicorn main:app --reload`. In production, replace with `gunicorn -k uvicorn.workers.UvicornWorker` behind an Nginx reverse proxy." },
          ].map((item) => (
            <div
              key={item.title}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5"
            >
              <h3 className="text-xs font-bold text-teal-700 dark:text-teal-400">{item.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Level 3 Graduation Banner */}
      <div className="rounded-2xl border border-emerald-400/40 bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent p-6 space-y-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🎓</span>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Level 3 Complete — Advanced Patterns &amp; System Design!
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-1">
              You have mastered conditional routing, custom state graphs, HITL checkpoints, reflection loops, MCP tool interoperability, RAG pipelines, plan-and-execute agents, database checkpointers, semantic memory, and production API deployment. You are now ready for <strong>Level 4: Production, Scaling &amp; Optimization</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Quiz */}
      <section className="space-y-4">
        <Module3_12Quiz />
      </section>
    </div>
  );
}
