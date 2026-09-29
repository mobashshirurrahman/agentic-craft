"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target, Check, ArrowRight, Timer, Zap, Cpu, Code2,
  AlertTriangle, Sparkles, HelpCircle, Copy, CheckCheck,
  Play, RotateCcw, FileText, Terminal, GitBranch, Users,
} from "lucide-react";
import AsyncVsSyncBenchmarker from "./AsyncVsSyncBenchmarker";
import Module2_13Quiz from "./Module2_13Quiz";

export default function Module2_13Content() {
  const [selectedPattern, setSelectedPattern] = useState<string>("sync");
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [activeCodeTab, setActiveCodeTab] = useState<"code" | "output">("code");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);

  const patterns = [
    {
      id: "sync",
      title: "Sync (Sequential)",
      tagline: "Blocking Execution",
      desc: "Each invoke() call blocks the Python thread until the LLM responds. 6 tasks at 2s each = 12s total. CPU sits idle 99% of the time waiting for the network.",
      icon: Timer,
      color: "text-rose-600 dark:text-rose-400",
      bg: "bg-rose-50 dark:bg-rose-500/10",
      border: "border-rose-200 dark:border-rose-500/30",
      badge: "12s for 6 tasks",
      codeSnippet: `# SYNC: Sequential — blocks on every LLM call
# 6 tasks × 2s each = 12s total wall-clock time

from langchain_openai import ChatOpenAI

model = ChatOpenAI(model="gpt-4o-mini")

def process_sync(prompts: list[str]) -> list[str]:
    results = []
    for prompt in prompts:
        # .invoke() BLOCKS the thread for ~2s each!
        result = model.invoke(prompt)
        results.append(result.content)
    return results

# 6 prompts → executed one by one → 12s total
answers = process_sync([
    "Summarize quantum computing",
    "Explain transformers",
    "What is RAG?",
    "Define agent loops",
    "What is LangGraph?",
    "Explain vector DBs",
])`,
    },
    {
      id: "async",
      title: "Async (Concurrent)",
      tagline: "Non-Blocking I/O",
      desc: "asyncio.gather() dispatches all ainvoke() calls concurrently. 6 tasks at 2s each = ~2.2s total. 5.5x faster because CPU handles all I/O wait periods simultaneously.",
      icon: Zap,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      border: "border-emerald-200 dark:border-emerald-500/30",
      badge: "~2.2s for 6 tasks",
      codeSnippet: `# ASYNC: Concurrent — all 6 LLM calls fire in parallel!
# 6 tasks × 2s each, but overlapping → ~2.2s total

import asyncio
from langchain_openai import ChatOpenAI

model = ChatOpenAI(model="gpt-4o-mini")

async def process_async(prompts: list[str]) -> list[str]:
    # asyncio.gather fires ALL tasks concurrently
    tasks = [model.ainvoke(prompt) for prompt in prompts]
    results = await asyncio.gather(*tasks)
    return [r.content for r in results]

# Same 6 prompts → dispatched simultaneously → ~2.2s total
answers = asyncio.run(process_async([
    "Summarize quantum computing",
    "Explain transformers",
    "What is RAG?",
    "Define agent loops",
    "What is LangGraph?",
    "Explain vector DBs",
]))`,
    },
    {
      id: "blocking",
      title: "Blocking Tool Wrapper",
      tagline: "Legacy Sync → Async",
      desc: "Legacy tools (DB queries, HTTP clients) are often synchronous. Wrapping them with asyncio.to_thread() offloads blocking work to a thread pool, preventing event loop starvation.",
      icon: GitBranch,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      border: "border-amber-200 dark:border-amber-500/30",
      badge: "Thread Pool",
      codeSnippet: `# BLOCKING TOOL: Safely bridge legacy sync tools into async agents

import asyncio
import psycopg2  # Old-school blocking DB driver

# ❌ Never call this directly inside an async agent!
def legacy_db_query(sql: str) -> list:
    conn = psycopg2.connect("postgresql://...")
    cursor = conn.cursor()
    cursor.execute(sql)          # BLOCKS the event loop!
    return cursor.fetchall()

# ✅ Wrap in asyncio.to_thread() to offload to thread pool
async def safe_db_query(sql: str) -> list:
    # Runs legacy_db_query in a worker thread
    # Event loop continues processing other tasks meanwhile!
    return await asyncio.to_thread(legacy_db_query, sql)

# Use inside a LangGraph node:
async def agent_node(state):
    results = await safe_db_query("SELECT * FROM products LIMIT 10")
    return {"context": results}`,
    },
    {
      id: "langgraph",
      title: "LangGraph Async",
      tagline: "ainvoke & astream",
      desc: "All LangGraph graph methods have async twins: ainvoke(), astream(), abatch(). Always prefer async variants in async web servers (FastAPI, Starlette) to avoid blocking the server's event loop.",
      icon: Cpu,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-500/10",
      border: "border-blue-200 dark:border-blue-500/30",
      badge: "FastAPI Ready",
      codeSnippet: `# LANGGRAPH ASYNC: Use ainvoke/astream in async web servers

from fastapi import FastAPI
from langgraph.graph import StateGraph, MessagesState, START
from langchain_openai import ChatOpenAI

model = ChatOpenAI(model="gpt-4o-mini")
app_api = FastAPI()

# Build LangGraph once at startup
builder = StateGraph(MessagesState)
builder.add_node("chat", lambda s: {"messages": [model.invoke(s["messages"])]})
builder.add_edge(START, "chat")
langgraph_app = builder.compile()

@app_api.post("/chat")
async def chat_endpoint(message: str):
    # ainvoke = non-blocking LangGraph execution
    result = await langgraph_app.ainvoke(
        {"messages": [("user", message)]}
    )
    return {"response": result["messages"][-1].content}`,
    },
  ];

  const currentPattern = patterns.find((p) => p.id === selectedPattern) || patterns[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentPattern.codeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setActiveCodeTab("output");
    setSimStep(1);
    setTimeout(() => setSimStep(2), 800);
    setTimeout(() => setSimStep(3), 1600);
    setTimeout(() => { setSimStep(4); setIsSimulating(false); }, 2400);
  };

  return (
    <div className="space-y-10 max-w-5xl mx-auto pb-16">
      {/* 🎯 OBJECTIVE BANNER */}
      <section className="rounded-2xl border border-blue-200 dark:border-blue-500/30 bg-blue-50/60 dark:bg-blue-500/5 p-4 sm:p-6 shadow-sm">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-blue-600 text-white shrink-0 shadow-sm mt-0.5"><Target className="w-5 h-5" /></div>
          <div className="space-y-2 flex-1">
            <h2 className="text-sm font-mono uppercase tracking-wider text-blue-800 dark:text-blue-400 font-bold">🎯 By the end of this module, you will:</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              {[
                "Explain why LLM calls are I/O-bound and why sync agents waste CPU waiting",
                "Use asyncio.gather() to run 6 concurrent LLM calls in the time of 1 sequential call",
                "Wrap legacy blocking tools with asyncio.to_thread() to prevent event loop starvation",
                "Wire LangGraph's ainvoke() and astream() into a FastAPI async endpoint",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: 4 ASYNC PATTERNS */}
      <section className="space-y-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 text-blue-700 dark:text-blue-300 text-xs font-mono font-semibold mb-2">
            <Timer className="w-3.5 h-3.5" /><span>Async Execution • Concurrency Patterns</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Configuring Async and Sync Agent Execution</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            LLM applications are almost entirely <strong>I/O-bound</strong>. While waiting 2s for a model response, your CPU is completely idle. Async execution lets your agent handle dozens of concurrent user tasks simultaneously with zero extra hardware.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {patterns.map((pat) => {
            const Icon = pat.icon;
            const isSelected = selectedPattern === pat.id;
            return (
              <button key={pat.id} onClick={() => setSelectedPattern(pat.id)}
                className={`p-3.5 sm:p-4 rounded-xl border text-left transition-all flex flex-col justify-between min-h-[145px] sm:min-h-[160px] active:scale-95 cursor-pointer ${isSelected ? "border-blue-500 bg-white dark:bg-slate-900 shadow-md ring-2 ring-blue-500/20" : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700"}`}>
                <div className="space-y-2">
                  <div className={`inline-flex p-1.5 rounded-lg ${pat.bg} border ${pat.border}`}><Icon className={`w-4 h-4 ${pat.color}`} /></div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">{pat.title}</div>
                    <div className={`text-[10px] font-mono ${pat.color} mt-0.5`}>{pat.tagline}</div>
                  </div>
                </div>
                <div className="mt-2 space-y-1">
                  <p className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{pat.desc}</p>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${pat.bg} ${pat.color} border ${pat.border}`}>{pat.badge}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* CODE INSPECTOR */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`inline-flex p-1.5 rounded-lg ${currentPattern.bg} border ${currentPattern.border}`}><currentPattern.icon className={`w-4 h-4 ${currentPattern.color}`} /></div>
              <span className="text-xs font-bold text-slate-900 dark:text-white">{currentPattern.title}: {currentPattern.tagline}</span>
            </div>
            <button onClick={handleCopyCode} className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer">
              {copiedCode ? <CheckCheck className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedCode ? "Copied!" : "Copy"}
            </button>
          </div>
          <div className="rounded-xl border border-slate-800 overflow-hidden bg-slate-950">
            <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-slate-800">
              <div className="flex gap-1">
                {(["code", "output"] as const).map((tab) => (
                  <button key={tab} onClick={() => setActiveCodeTab(tab)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono cursor-pointer ${activeCodeTab === tab ? "bg-slate-700 text-white" : "text-slate-400 hover:text-slate-200"}`}>
                    {tab === "code" ? <FileText className="w-3 h-3" /> : <Terminal className="w-3 h-3" />}
                    {tab === "code" ? "Python Code" : "Timing Output"}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                {simStep > 0 && <button onClick={() => { setSimStep(0); setActiveCodeTab("code"); }} className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 cursor-pointer"><RotateCcw className="w-3 h-3" /> Reset</button>}
                <button onClick={handleRunSimulation} disabled={isSimulating}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono disabled:opacity-50 cursor-pointer">
                  <Play className="w-3 h-3" />{isSimulating ? "Running..." : "Run"}
                </button>
              </div>
            </div>
            <div className="p-4 min-h-[140px] font-mono text-xs">
              {activeCodeTab === "code" ? (
                <pre className="text-slate-300 whitespace-pre-wrap leading-relaxed">{currentPattern.codeSnippet}</pre>
              ) : (
                <div className="space-y-2 text-slate-300">
                  {simStep === 0 && <div className="text-slate-500 italic">Click &apos;Run&apos; to see {currentPattern.id === "sync" ? "sequential" : "concurrent"} timing...</div>}
                  {simStep >= 1 && (
                    <div className={currentPattern.id === "async" ? "text-emerald-400" : "text-rose-400"}>
                      ➜ [{currentPattern.id === "sync" ? "SYNC" : currentPattern.id === "async" ? "ASYNC" : currentPattern.id === "blocking" ? "THREAD" : "ASYNC"}] Starting {currentPattern.id === "sync" ? "sequential" : "concurrent"} execution...
                    </div>
                  )}
                  {simStep >= 2 && currentPattern.id === "sync" && (
                    <div className="text-slate-400 pl-4">
                      Task 1: 2.01s ✔<br />Task 2: 2.04s ✔<br />Task 3: 2.07s ✔ (still running...)
                    </div>
                  )}
                  {simStep >= 2 && currentPattern.id === "async" && (
                    <div className="text-emerald-400 pl-4">
                      All 6 tasks dispatched simultaneously at t=0ms<br />
                      Tasks 1–6 complete at t=~2100ms (overlapping I/O wait)
                    </div>
                  )}
                  {simStep >= 2 && currentPattern.id === "blocking" && (
                    <div className="text-amber-400 pl-4">
                      Offloading blocking DB call to thread pool worker...<br />
                      Event loop continues processing other requests
                    </div>
                  )}
                  {simStep >= 2 && currentPattern.id === "langgraph" && (
                    <div className="text-blue-400 pl-4">
                      FastAPI async endpoint received request<br />
                      await langgraph_app.ainvoke() — non-blocking...
                    </div>
                  )}
                  {simStep >= 4 && (
                    <div className={`font-bold pt-2 border-t border-slate-800 ${currentPattern.id === "sync" ? "text-rose-400" : "text-emerald-400"}`}>
                      {currentPattern.id === "sync" ? "✗ Total: 12.3s (6 tasks × 2.05s sequential)" : "✔ Total: 2.2s (6 tasks completed concurrently — 5.5x speedup)"}
                      <br /><span className="text-slate-400 font-normal text-[10px]">{currentPattern.id === "sync" ? "CPU was idle 99% of time waiting for network I/O" : "Same work, 5.5× faster — no extra hardware needed"}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: CHEF ANALOGY */}
      <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">👨‍🍳 Mental Model: Chef Waiting vs. Chef Multitasking</h3>
        </div>
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-500/30 bg-rose-50 dark:bg-rose-500/10 space-y-2">
            <div className="text-xs font-mono font-bold text-rose-700 dark:text-rose-400">❌ Sync Agent (Inefficient Chef)</div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">Chef boils pasta, then stares at the pot for 10 minutes until it&apos;s done. Only then do they start chopping vegetables. Staring = your CPU waiting for the LLM response. Completely idle. 6 dishes = 60 minutes.</p>
          </div>
          <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 space-y-2">
            <div className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">✅ Async Agent (Expert Chef)</div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">Chef starts all 6 dishes, sets timers, and bounces between tasks during each other&apos;s wait periods. 6 dishes in the time it takes to cook 1 — the exact same kitchen, same chef, just no idle waiting. That&apos;s asyncio.</p>
          </div>
        </div>
      </section>

      {/* SECTION 3: BENCHMARKER */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">🔬 Async vs. Sync Benchmarker</h3>
        <AsyncVsSyncBenchmarker />
      </section>

      {/* SECTION 4: NOTES */}
      <section className="space-y-3">
        <div className="p-4 rounded-xl border border-amber-300 dark:border-amber-500/30 bg-amber-50/90 dark:bg-amber-500/10 shadow-sm">
          <span className="font-['Caveat',cursive] text-base text-amber-950 dark:text-amber-200 block">✍️ Instructor Note: &quot;Don&apos;t mix sync and async carelessly! Calling a blocking sync function (like requests.get()) inside an async function will FREEZE your entire event loop — blocking ALL concurrent users, not just one. Always use await httpx.AsyncClient() instead of requests in async code.&quot;</span>
        </div>
        <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-500/30 bg-blue-50/90 dark:bg-blue-500/10 shadow-sm">
          <span className="font-['Caveat',cursive] text-base text-blue-950 dark:text-blue-200 block">📌 Core Rule: CPU-bound work (numpy calculations, image processing) does NOT benefit from asyncio — use multiprocessing instead. asyncio shines for I/O-bound work only: network calls, database queries, file I/O. LLM API calls are 100% I/O-bound.</span>
        </div>
      </section>

      {/* SECTION 5: TRAPS */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-500" /><span>Async Execution Traps</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-500/30 bg-rose-50/50 dark:bg-rose-500/5 space-y-2">
            <span className="text-xs font-mono font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider block">TRAP #1: Blocking the Event Loop</span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">Calling time.sleep() or requests.get() inside an async function blocks the entire event loop, making all concurrent tasks wait in line. Use await asyncio.sleep() and await httpx.AsyncClient.get() instead. One sync call can kill all concurrency.</p>
          </div>
          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-500/5 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">TRAP #2: asyncio.gather() Without Error Handling</span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">If one task in asyncio.gather() raises an exception, all other tasks are cancelled by default. Use asyncio.gather(*tasks, return_exceptions=True) to capture individual failures and continue processing the remaining successful tasks.</p>
          </div>
        </div>
      </section>

      {/* SECTION 6: KEY TAKEAWAYS */}
      <section className="rounded-xl border border-blue-200 dark:border-blue-500/30 bg-blue-50/50 dark:bg-blue-500/5 p-5 space-y-3">
        <h4 className="font-bold text-sm text-blue-900 dark:text-blue-300 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" /><span>Key Takeaways</span>
        </h4>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          {[
            ["1.", "LLM Calls are I/O-Bound:", "While waiting for the API response, your CPU is idle. asyncio lets you fill that idle time by running other requests concurrently — same CPU, 5x+ throughput."],
            ["2.", "asyncio.gather() is the Multiplier:", "Dispatching N tasks with asyncio.gather() makes them run concurrently. N × 2s of sequential work becomes ~2s of concurrent work. Use this for batch processing and multi-user agent servers."],
            ["3.", "asyncio.to_thread() for Legacy Tools:", "Any blocking sync function (DB driver, requests, file I/O) that you can&apos;t swap must be wrapped in asyncio.to_thread() to prevent event loop starvation."],
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
        <button onClick={() => setShowQuiz(!showQuiz)}
          className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all text-left cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400"><HelpCircle className="w-5 h-5" /></div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">Concept Check: Async Execution</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">{showQuiz ? "Click to collapse" : "Test your concurrency intuition (3 questions)"}</p>
            </div>
          </div>
          <span className="text-xs font-mono font-semibold px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30">
            {showQuiz ? "Hide Quiz" : "Start Quiz"}
          </span>
        </button>
        <AnimatePresence>
          {showQuiz && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }}>
              <Module2_13Quiz />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* NEXT MODULE BRIDGE */}
      <section className="rounded-2xl border border-blue-200 dark:border-blue-500/30 bg-gradient-to-r from-blue-50 via-white to-slate-50 dark:from-blue-500/10 dark:via-slate-900 dark:to-slate-950 p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <div className="text-xs font-mono font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">Up Next • Module 2.14</div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Creating Reusable Dynamic Prompt Templates</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">Stop embedding prompts as raw f-strings. Build composable ChatPromptTemplates with role isolation, history placeholders, and runtime variable binding.</p>
        </div>
        <Link href="/learn/level-2/module-2-14" className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-sm transition-all shrink-0 cursor-pointer">
          <span>Continue to Module 2.14</span><ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
