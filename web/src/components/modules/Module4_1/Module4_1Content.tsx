"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  Check,
  ArrowRight,
  ShieldCheck,
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
  Bug,
  Clock,
  Activity,
  Terminal,
} from "lucide-react";
import RobustToolStudio from "./RobustToolStudio";
import Module4_1Quiz from "./Module4_1Quiz";

export default function Module4_1Content() {
  const [selectedPillar, setSelectedPillar] = useState<string>("validation");
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [activeCodeTab, setActiveCodeTab] = useState<"code" | "output">("code");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);

  const pillars = [
    {
      id: "validation",
      title: "1. Pydantic Input Validation",
      tagline: "Pre-Execution Gatekeeper",
      desc: "Use Pydantic Field constraints (ge, le, regex) to sanitize arguments BEFORE executing. Catch invalid inputs before hitting external APIs.",
      icon: ShieldCheck,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      border: "border-amber-200 dark:border-amber-500/30",
      badge: "Pydantic Schema",
      codeSnippet: `# 1. PYDANTIC INPUT VALIDATION SCHEMA
from pydantic import BaseModel, Field

class SearchInput(BaseModel):
    query: str = Field(..., min_length=2, max_length=200, description="Search query string")
    max_results: int = Field(default=5, ge=1, le=20, description="Number of results between 1 and 20")
    domain_filter: str | None = Field(default=None, description="Optional domain restriction")

# If agent passes max_results=999, Pydantic intercepts and returns a clean error
# before any network call occurs!`,
    },
    {
      id: "error_contract",
      title: "2. Structured Error Contracts",
      tagline: "Machine-Readable Feedback",
      desc: "Never return raw Python stack traces. Return a structured dictionary with error_type, message, and actionable suggestions so the LLM can self-correct.",
      icon: Bug,
      color: "text-rose-600 dark:text-rose-400",
      bg: "bg-rose-50 dark:bg-rose-500/10",
      border: "border-rose-200 dark:border-rose-500/30",
      badge: "Structured Error",
      codeSnippet: `# 2. STRUCTURED ERROR CONTRACT
import json

def format_tool_error(error_type: str, message: str, suggestion: str) -> str:
    """Formats structured error payload for the LLM to reason about."""
    return json.dumps({
        "status": "error",
        "error_type": error_type, # VALIDATION_ERROR | TIMEOUT_ERROR | AUTH_ERROR
        "message": message,
        "actionable_suggestion": suggestion
    })

# Example output returned to LLM on bad input:
# {"status": "error", "error_type": "VALIDATION_ERROR", "message": "max_results 999 exceeds limit 20", "actionable_suggestion": "Please retry with max_results between 1 and 20."}`,
    },
    {
      id: "backoff",
      title: "3. Retries with Backoff",
      tagline: "Tenacity Resilience",
      desc: "Network blips and HTTP 503s shouldn't crash agent tasks. Use exponential backoff with jitter to retry transient failures gracefully.",
      icon: Clock,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-500/10",
      border: "border-blue-200 dark:border-blue-500/30",
      badge: "Exponential Backoff",
      codeSnippet: `# 3. TENACITY EXPONENTIAL BACKOFF
from tenacity import retry, stop_after_attempt, wait_exponential, retry_if_exception_type
import requests

@retry(
    stop=stop_after_attempt(3),
    wait=wait_exponential(multiplier=1, min=1, max=10),
    retry=retry_if_exception_type(requests.exceptions.RequestException),
    reraise=False
)
def fetch_api_with_retry(url: str, params: dict):
    """Retries 3 times with 1s, 2s, 4s backoff before reporting failure."""
    response = requests.get(url, params=params, timeout=5.0)
    response.raise_for_status()
    return response.json()`,
    },
    {
      id: "telemetry",
      title: "4. Correlation Telemetry",
      tagline: "Traceable Tool Execution",
      desc: "Attach a correlation_id and timing metrics to every tool call. When multi-agent workflows stall at 3am, correlation logs pinpoint the exact failing tool.",
      icon: Activity,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      border: "border-emerald-200 dark:border-emerald-500/30",
      badge: "Correlation ID",
      codeSnippet: `# 4. TELEMETRY & STRUCTURED LOGGING
import time, logging, uuid

logger = logging.getLogger("agent.tools")

def robust_tool_wrapper(tool_fn, correlation_id: str, **kwargs):
    start_time = time.perf_counter()
    logger.info(f"[{correlation_id}] Invoking {tool_fn.__name__} with params: {kwargs}")
    
    try:
        result = tool_fn(**kwargs)
        duration_ms = (time.perf_counter() - start_time) * 1000
        logger.info(f"[{correlation_id}] {tool_fn.__name__} SUCCEEDED in {duration_ms:.1f}ms")
        return result
    except Exception as e:
        duration_ms = (time.perf_counter() - start_time) * 1000
        logger.error(f"[{correlation_id}] {tool_fn.__name__} FAILED after {duration_ms:.1f}ms: {e}")
        return format_tool_error("EXECUTION_ERROR", str(e), "Check tool parameters")`,
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
              Module 4.1 • Enterprise Tool Engineering
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              ~25 min interactive
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Building Robust Tools with Validation and Logging
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Most agent failures in production aren&apos;t LLM failures — they are <strong>tool failures</strong>. Master enterprise tool engineering: Pydantic pre-validation, structured error contracts, exponential backoff retries, and correlation telemetry.
          </p>
        </div>
      </div>

      {/* SECTION 1: 4 PILLARS OF ROBUST TOOLS */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-amber-500" />
            1. The 4 Pillars of a Production Tool
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Select a pillar to inspect
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
              Robust Tool Implementation
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
                  <span>Executing...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Simulate Tool Call</span>
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
                robust_tool.py • {selectedPillar}
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
                Execution Log
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
                <p className="text-slate-400">&gt;&gt; [CID: a49f-10] Model requested: search_api(query=&quot;LangGraph&quot;, max_results=999)</p>
                <p className="text-rose-400">[Pydantic Validation] max_results=999 failed constraint (le=20)</p>
                <p className="text-amber-400">&gt;&gt; Intercepted! Returning structured error contract to agent.</p>
                <p className="text-sky-300">&gt;&gt; Agent reads error: &quot;Please retry with max_results between 1 and 20&quot;</p>
                <p className="text-emerald-400 font-bold">&gt;&gt; [CID: a49f-11] Model self-corrects: search_api(query=&quot;LangGraph&quot;, max_results=10) -&gt; 200 OK (210ms)</p>
              </div>
            )}
          </div>
        </div>

        {/* Simulation Banner */}
        {simStep > 0 && (
          <div className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/80 dark:bg-amber-950/30 flex items-center justify-between text-xs font-mono">
            <span className="text-amber-800 dark:text-amber-200">
              {simStep === 1 && "Agent generates tool call -> Pydantic validates parameter boundaries"}
              {simStep === 2 && "Input validated -> Request dispatched with Tenacity backoff wrapper"}
              {simStep === 3 && "Correlation ID logged -> Timing recorded to Prometheus metrics"}
              {simStep === 4 && "Structured result returned to agent context with zero silent exceptions!"}
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
            2. Interactive Robust Tool Studio
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Live Tool Validation Sandbox
          </span>
        </div>
        <RobustToolStudio />
      </section>

      {/* SECTION 4: HANDWRITTEN NOTE */}
      <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/90 dark:bg-amber-500/10 shadow-sm">
        <span className="font-['Caveat',cursive] text-base text-amber-950 dark:text-amber-200 block">
          📌 Production Law: Never return raw Python tracebacks to an LLM. An LLM cannot parse a 50-line traceback from psycopg2. Return a structured dictionary with error_type and an actionable suggestion — the LLM will self-correct in turn 2!
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
              TRAP #1: Retry Storms on HTTP 4xx Errors
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Retrying on <code>400 Bad Request</code> or <code>401 Unauthorized</code> is futile — the server will never accept the request without changed credentials. Only retry on transient <code>5xx</code> or network connection timeouts.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-500/5 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
              TRAP #2: Silent Exception Swallowing
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Returning <code>None</code> or an empty string <code>&quot;&quot;</code> when a database tool fails leaves the LLM blind. The agent assumes the database is empty rather than realizing the query syntax was malformed. Always return explicit error objects.
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
            ["1.", "Pydantic Pre-Validation:", "Intercept bad inputs locally to prevent wasting external API quota and tripping rate limits."],
            ["2.", "Actionable Error Contracts:", "Format error outputs as JSON with explicit guidance to trigger model self-correction."],
            ["3.", "Correlation Tracing:", "Pass request IDs through every tool call to debug multi-step autonomous chains in production."],
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
                Concept Check: Robust Tools
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {showQuiz ? "Click to collapse" : "Test your understanding of tool validation and retries (3 questions)"}
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
              <Module4_1Quiz />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* SECTION 8: NEXT MODULE BRIDGE */}
      <section className="rounded-2xl border border-amber-200 dark:border-amber-500/30 bg-gradient-to-r from-amber-50 via-white to-slate-50 dark:from-amber-500/10 dark:via-slate-900 dark:to-slate-950 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
            <span>Up Next • Module 4.2</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Building Multi-Agent Supervisor Systems</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
            When a single agent has too many tools, its reasoning degrades. Learn how to architect a Multi-Agent Supervisor that routes tasks to specialized worker agents.
          </p>
        </div>
        <Link
          href="/learn/level-4/module-4-2"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow-amber-500/20 transition-all shrink-0 cursor-pointer"
        >
          <span>Continue to Module 4.2</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
