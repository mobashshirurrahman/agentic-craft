"use client";

import React from "react";
import { ShieldCheck, Code2, Layers, Sparkles, Lightbulb, CheckCircle2, AlertTriangle, Bug } from "lucide-react";
import RobustToolStudio from "./RobustToolStudio";
import Module4_1Quiz from "./Module4_1Quiz";

export default function Module4_1Content() {
  return (
    <div className="space-y-10">
      {/* Hero Banner */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-slate-50 dark:to-slate-950 p-6 md:p-8 transition-colors">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30">
              Module 4.1 • Production, Scaling & Optimization
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">~25 min hands-on</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Building Robust Tools with Validation and Logging
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Here&apos;s a hard truth I wish someone had told me earlier: <strong>most agent failures in production aren&apos;t LLM failures — they&apos;re tool failures.</strong> A silent crash in a search tool, a missing error message from a database query, a retry storm that takes the API down for everyone — these kill production agents. This module shows you exactly how to build tools that are bulletproof.
          </p>
        </div>
      </div>

      {/* Section 1: Why Tools Fail Silently */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Bug className="w-5 h-5 text-red-500" />
          1. The Silent Failure Problem
        </h2>
        <div className="p-4 rounded-xl border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-950/20 space-y-3">
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            Imagine your agent calls a web search tool with <code>max_results: 999</code> — a typo. The tool hits the API, which returns HTTP 400. Your tool has no error handling, so it raises a raw Python exception. The agent receives a traceback. It has no idea what went wrong, so it <em>hallucinates a fix</em> and retries with <code>max_results: &quot;all&quot;</code>. Now it&apos;s stuck in a loop.
          </p>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            The fix: return a <strong>structured error that the agent can reason about</strong> — not a Python traceback. Think of it like the difference between a doctor saying &ldquo;something is wrong&rdquo; vs &ldquo;your potassium is 2.8 mEq/L, which is below the safe range of 3.5&rdquo;. The second gives you enough to act.
          </p>
        </div>
      </section>

      {/* Section 2: The 4 Pillars */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-amber-500" />
          2. The 4 Pillars of a Production Tool
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { num: "01", title: "Input Validation", color: "blue", desc: "Use Pydantic to define explicit schemas. Check types, ranges, formats, and business rules BEFORE executing. Return `VALIDATION_ERROR` with field-level detail on failure." },
            { num: "02", title: "Structured Error Contracts", color: "red", desc: "Every error the tool can return must have a type (`VALIDATION_ERROR`, `NETWORK_ERROR`, `AUTH_ERROR`), a human-readable message, and a field name if applicable. The agent reads this like a contract." },
            { num: "03", title: "Retry with Exponential Backoff", color: "amber", desc: "HTTP 503? Don't give up immediately. Retry with delays: 0.5s, 1s, 2s. After 3 attempts, return a structured NETWORK_ERROR. Use the Tenacity library — 3 lines of Python." },
            { num: "04", title: "Structured Logging with Correlation IDs", color: "emerald", desc: "Log EVERY tool call with a correlation ID, the sanitized input, status, and latency. When a complex agent workflow fails in production at 3am, the correlation ID is the thread that unravels exactly what happened." },
          ].map((p) => (
            <div key={p.num} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
              <div className="flex items-center gap-2">
                <span className={`text-xs font-mono font-bold text-${p.color}-600 dark:text-${p.color}-400`}>{p.num}</span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">{p.title}</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Code */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Code2 className="w-5 h-5 text-teal-500" />
          3. The Production Tool Pattern — All 4 Pillars in One
        </h2>
        <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs border border-slate-800 overflow-x-auto">
          <pre>{`from pydantic import BaseModel, Field, validator
from tenacity import retry, stop_after_attempt, wait_exponential
import structlog, uuid, time

log = structlog.get_logger()

# ── Pillar 1: Explicit schema ──────────────────────
class SearchInput(BaseModel):
    query: str = Field(..., min_length=1, max_length=500)
    max_results: int = Field(5, ge=1, le=10)

    @validator("query")
    def no_injection(cls, v):
        if any(c in v for c in ["<script>", "DROP TABLE"]):
            raise ValueError("query contains disallowed pattern")
        return v

# ── Pillar 3: Retry with exponential backoff ───────
@retry(
    stop=stop_after_attempt(3),
    wait=wait_exponential(multiplier=0.5, min=0.5, max=4),
    reraise=False
)
async def _call_search_api(query: str, max_results: int) -> dict:
    # actual HTTP call here
    ...

# ── Pillars 2 + 4: Structured errors + logging ────
async def web_search_tool(raw_input: dict) -> dict:
    correlation_id = str(uuid.uuid4())[:8]
    t0 = time.monotonic()

    # Pillar 1: validate input
    try:
        params = SearchInput(**raw_input)
    except Exception as e:
        log.warning("tool.validation_fail", cid=correlation_id, error=str(e))
        return {"error": "VALIDATION_ERROR", "detail": str(e), "field": "query"}

    log.info("tool.start", cid=correlation_id, tool="web_search",
             query=params.query[:50], max_results=params.max_results)

    # Pillar 3: call with retry
    try:
        result = await _call_search_api(params.query, params.max_results)
    except Exception as e:
        log.error("tool.network_fail", cid=correlation_id, error=str(e))
        return {"error": "NETWORK_ERROR", "detail": "Search API unavailable after 3 retries"}

    latency = round((time.monotonic() - t0) * 1000)
    log.info("tool.success", cid=correlation_id, results=len(result), latency_ms=latency)
    return {"results": result, "count": len(result)}`}</pre>
        </div>
      </section>

      {/* Interactive Studio */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            4. Interactive Robust Tool Studio
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">4 Scenarios</span>
        </div>
        <RobustToolStudio />
      </section>

      {/* Golden Rule */}
      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 space-y-2">
        <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-semibold text-sm">
          <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
          The Production Mindset: Fail Loudly, Fail Informatively
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          A tool that silently fails is your worst nightmare at 2am. A tool that returns a clear, structured error — <code>{`{"error":"NETWORK_ERROR","detail":"503 after 3 retries"}`}</code> — is your best friend. The agent can reason about it, escalate it, or inform the user. Design your tools for the failure case first, and the happy path second.
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
            { title: "Pydantic = Free Validation", body: "Define your tool schema with Pydantic, and all type checking, range validation, and business rules run automatically. No if/else validation chains." },
            { title: "4 Error Types to Handle", body: "VALIDATION_ERROR (bad input), NETWORK_ERROR (external service), AUTH_ERROR (credentials), RESOURCE_ERROR (rate limits/quotas). Handle each explicitly." },
            { title: "Tenacity in 3 Lines", body: "`@retry(stop=stop_after_attempt(3), wait=wait_exponential())` gives you enterprise-grade retry logic. It's battle-tested at Uber, Airbnb, and Netflix." },
          ].map((item) => (
            <div key={item.title} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
              <h3 className="text-xs font-bold text-amber-700 dark:text-amber-400">{item.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4"><Module4_1Quiz /></section>
    </div>
  );
}
