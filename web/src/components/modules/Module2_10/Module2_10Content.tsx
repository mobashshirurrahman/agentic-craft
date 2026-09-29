"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target, Check, ArrowRight, AlertTriangle, ShieldCheck, Code2,
  ServerCrash, Clock, RotateCcw, Sparkles, HelpCircle, Copy,
  CheckCheck, Play, FileText, Terminal, Zap, RefreshCw,
} from "lucide-react";
import ApiErrorTroubleshooter from "./ApiErrorTroubleshooter";
import Module2_10Quiz from "./Module2_10Quiz";

export default function Module2_10Content() {
  const [selectedError, setSelectedError] = useState<string>("auth");
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [activeCodeTab, setActiveCodeTab] = useState<"code" | "output">("code");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);

  const errors = [
    {
      id: "auth",
      title: "401/403 Auth",
      tagline: "Fatal Config Error",
      desc: "Invalid or revoked API key. NEVER retry — no amount of retrying will fix a bad key. Alert the developer to rotate their environment variable immediately.",
      icon: ShieldCheck,
      color: "text-rose-600 dark:text-rose-400",
      bg: "bg-rose-50 dark:bg-rose-500/10",
      border: "border-rose-200 dark:border-rose-500/30",
      badge: "No Retry",
      codeSnippet: `# 401/403: Fatal auth error — alert, never retry
from openai import AuthenticationError

try:
    response = client.chat.completions.create(...)
except AuthenticationError as e:
    # NEVER retry auth errors — the key is broken
    logger.critical(json.dumps({
        "event": "auth_error", "http_status": 401,
        "action": "alert_developer",
        "message": "Revoke and rotate API key immediately"
    }))
    # Raise to caller — this needs human intervention
    raise SystemExit("Invalid API key — shutting down agent")`,
    },
    {
      id: "rate",
      title: "429 Rate Limit",
      tagline: "Exponential Backoff",
      desc: "RPM or TPM quota exhausted. Retry with exponential backoff + random jitter to spread load. The tenacity library handles this in 3 lines.",
      icon: Clock,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      border: "border-amber-200 dark:border-amber-500/30",
      badge: "Retry with Backoff",
      codeSnippet: `# 429: Rate limit — exponential backoff with jitter
from tenacity import (
    retry, stop_after_attempt, wait_exponential,
    retry_if_exception_type, before_sleep_log
)
from openai import RateLimitError
import logging

@retry(
    stop=stop_after_attempt(5),
    wait=wait_exponential(multiplier=1, min=2, max=60),
    retry=retry_if_exception_type(RateLimitError),
    before_sleep=before_sleep_log(logger, logging.WARNING)
)
def call_llm_with_retry(messages: list) -> str:
    return client.chat.completions.create(
        model="gpt-4o-mini", messages=messages
    ).choices[0].message.content`,
    },
    {
      id: "server",
      title: "500/503 Outage",
      tagline: "Multi-Provider Fallback",
      desc: "Provider infrastructure failure. Mitigate with multi-provider fallback routing — if OpenAI returns 500, automatically route to Anthropic Claude as backup.",
      icon: ServerCrash,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-500/10",
      border: "border-purple-200 dark:border-purple-500/30",
      badge: "Fallback Route",
      codeSnippet: `# 500/503: Provider outage — automatic fallback routing
from langchain_openai import ChatOpenAI
from langchain_anthropic import ChatAnthropic

# Primary: OpenAI GPT-4o
primary_llm = ChatOpenAI(model="gpt-4o", max_retries=2)

# Fallback: Anthropic Claude (activates on 500/503)
fallback_llm = ChatAnthropic(model="claude-3-5-haiku-20241022")

# LangChain handles fallback routing automatically!
resilient_llm = primary_llm.with_fallbacks([fallback_llm])

# This transparently switches to Claude on OpenAI outage:
response = resilient_llm.invoke("Explain LangGraph state management")`,
    },
    {
      id: "timeout",
      title: "Timeout / Network",
      tagline: "Deadline Enforcement",
      desc: "Network jitter or provider slowness can cause requests to hang for 60+ seconds. Always set explicit request timeouts and treat timeout as a retriable error.",
      icon: RefreshCw,
      color: "text-sky-600 dark:text-sky-400",
      bg: "bg-sky-50 dark:bg-sky-500/10",
      border: "border-sky-200 dark:border-sky-500/30",
      badge: "Set Deadline",
      codeSnippet: `# Network timeout — enforce strict deadlines
import asyncio
from openai import APITimeoutError

async def call_with_deadline(messages: list, timeout_s: float = 15.0):
    try:
        async with asyncio.timeout(timeout_s):
            return await async_client.chat.completions.create(
                model="gpt-4o-mini",
                messages=messages,
                timeout=timeout_s  # OpenAI SDK timeout
            )
    except (APITimeoutError, asyncio.TimeoutError) as e:
        logger.warning({"event": "timeout", "deadline_s": timeout_s})
        raise  # Bubble up — tenacity will retry`,
    },
  ];

  const currentError = errors.find((e) => e.id === selectedError) || errors[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentError.codeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setActiveCodeTab("output");
    setSimStep(1);
    setTimeout(() => setSimStep(2), 900);
    setTimeout(() => setSimStep(3), 1800);
    setTimeout(() => { setSimStep(4); setIsSimulating(false); }, 2700);
  };

  return (
    <div className="space-y-10 max-w-5xl mx-auto pb-16">
      {/* 🎯 OBJECTIVE BANNER */}
      <section className="rounded-2xl border border-rose-200 dark:border-rose-500/30 bg-rose-50/60 dark:bg-rose-500/5 p-4 sm:p-6 shadow-sm">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-rose-600 text-white shrink-0 shadow-sm mt-0.5"><Target className="w-5 h-5" /></div>
          <div className="space-y-2 flex-1">
            <h2 className="text-sm font-mono uppercase tracking-wider text-rose-800 dark:text-rose-400 font-bold">🎯 By the end of this module, you will:</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              {[
                "Categorize 401, 429, 500, and timeout errors with correct retry vs. halt decisions",
                "Implement tenacity exponential backoff with jitter for 429 rate limit handling",
                "Build multi-provider fallback with LangChain's with_fallbacks() API",
                "Enforce strict async timeout deadlines to prevent agent hang on slow APIs",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: 4 ERROR TYPES */}
      <section className="space-y-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30 text-rose-700 dark:text-rose-300 text-xs font-mono font-semibold mb-2">
            <AlertTriangle className="w-3.5 h-3.5" /><span>Error Handling • Resilience Patterns</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Troubleshooting Common LLM API Issues</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Networks flake, rate limits hit during traffic spikes, and providers go down. A self-healing agent handles these predictably — no 3am pages required.</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {errors.map((err) => {
            const Icon = err.icon;
            const isSelected = selectedError === err.id;
            return (
              <button key={err.id} onClick={() => setSelectedError(err.id)}
                className={`p-3.5 sm:p-4 rounded-xl border text-left transition-all flex flex-col justify-between min-h-[145px] sm:min-h-[160px] active:scale-95 cursor-pointer ${isSelected ? "border-rose-500 bg-white dark:bg-slate-900 shadow-md ring-2 ring-rose-500/20" : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700"}`}>
                <div className="space-y-2">
                  <div className={`inline-flex p-1.5 rounded-lg ${err.bg} border ${err.border}`}><Icon className={`w-4 h-4 ${err.color}`} /></div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">{err.title}</div>
                    <div className={`text-[10px] font-mono ${err.color} mt-0.5`}>{err.tagline}</div>
                  </div>
                </div>
                <p className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-2">{err.desc}</p>
              </button>
            );
          })}
        </div>

        {/* CODE INSPECTOR */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`inline-flex p-1.5 rounded-lg ${currentError.bg} border ${currentError.border}`}><currentError.icon className={`w-4 h-4 ${currentError.color}`} /></div>
              <span className="text-xs font-bold text-slate-900 dark:text-white">{currentError.title}: {currentError.tagline}</span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${currentError.bg} ${currentError.color} border ${currentError.border}`}>{currentError.badge}</span>
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
                    {tab === "code" ? "Python Code" : "Error Terminal"}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                {simStep > 0 && <button onClick={() => { setSimStep(0); setActiveCodeTab("code"); }} className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 cursor-pointer"><RotateCcw className="w-3 h-3" /> Reset</button>}
                <button onClick={handleRunSimulation} disabled={isSimulating}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-rose-600 hover:bg-rose-500 text-white text-xs font-mono disabled:opacity-50 cursor-pointer">
                  <Play className="w-3 h-3" />{isSimulating ? "Handling..." : "Simulate"}
                </button>
              </div>
            </div>
            <div className="p-4 min-h-[140px] font-mono text-xs">
              {activeCodeTab === "code" ? (
                <pre className="text-slate-300 whitespace-pre-wrap leading-relaxed">{currentError.codeSnippet}</pre>
              ) : (
                <div className="space-y-2 text-slate-300">
                  {simStep === 0 && <div className="text-slate-500 italic">Click &apos;Simulate&apos; to trigger a {currentError.title} error...</div>}
                  {simStep >= 1 && <div className="text-rose-400">➜ [ERROR] HTTP {currentError.id === "auth" ? "401" : currentError.id === "rate" ? "429" : currentError.id === "server" ? "503" : "TIMEOUT"} received from provider</div>}
                  {simStep >= 2 && currentError.id === "rate" && <div className="text-amber-400 pl-4">⏳ [RETRY] Backoff attempt 1/5 — waiting 2s...<br />⏳ [RETRY] Backoff attempt 2/5 — waiting 4s...</div>}
                  {simStep >= 2 && currentError.id === "server" && <div className="text-purple-400 pl-4">🔀 [FALLBACK] OpenAI unavailable → routing to Claude claude-3-5-haiku...</div>}
                  {simStep >= 2 && currentError.id === "auth" && <div className="text-rose-300 pl-4">🚨 [CRITICAL] Auth failure — alerting developer, shutting down agent</div>}
                  {simStep >= 2 && currentError.id === "timeout" && <div className="text-sky-400 pl-4">⏱️ [TIMEOUT] Deadline exceeded after 15s — raising APITimeoutError</div>}
                  {simStep >= 3 && currentError.id !== "auth" && <div className="text-slate-400">➜ [RECOVERY] Secondary provider responding...</div>}
                  {simStep >= 4 && (
                    <div className={`font-bold pt-2 border-t border-slate-800 ${currentError.id === "auth" ? "text-rose-400" : "text-emerald-400"}`}>
                      {currentError.id === "auth" ? "✗ [HALT] Agent stopped — human intervention required" : "✔ [SUCCESS] Request resolved via resilience pattern"}<br />
                      <span className="text-slate-400 font-normal text-[10px]">{currentError.id === "auth" ? "No retries performed — auth errors are fatal." : "No user-visible failure — handled automatically."}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: DECISION TREE */}
      <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">🔀 Error Decision Tree: Retry vs. Halt vs. Fallback</h3>
        </div>
        <div className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { status: "401 / 403", action: "HALT", color: "text-rose-700 dark:text-rose-400", bg: "bg-rose-50 dark:bg-rose-500/10", border: "border-rose-200 dark:border-rose-500/30", detail: "Invalid API key or insufficient permissions. Fix config, don't retry." },
            { status: "429", action: "RETRY", color: "text-amber-700 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-500/10", border: "border-amber-200 dark:border-amber-500/30", detail: "Exponential backoff + jitter. Max 5 attempts, then escalate." },
            { status: "500 / 503", action: "FALLBACK", color: "text-purple-700 dark:text-purple-400", bg: "bg-purple-50 dark:bg-purple-500/10", border: "border-purple-200 dark:border-purple-500/30", detail: "Route to secondary provider. If all providers fail, queue for retry." },
          ].map(({ status, action, color, bg, border, detail }) => (
            <div key={status} className={`p-4 rounded-xl border ${border} ${bg} space-y-2`}>
              <div className={`text-xs font-mono font-bold ${color}`}>{status} → {action}</div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: INTERACTIVE TROUBLESHOOTER */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">🔬 API Error Troubleshooter</h3>
        <ApiErrorTroubleshooter />
      </section>

      {/* SECTION 4: NOTES */}
      <section className="space-y-3">
        <div className="p-4 rounded-xl border border-amber-300 dark:border-amber-500/30 bg-amber-50/90 dark:bg-amber-500/10 shadow-sm">
          <span className="font-['Caveat',cursive] text-base text-amber-950 dark:text-amber-200 block">✍️ Instructor Note: &quot;Always add jitter (randomized delay) to your backoff! Without jitter, 100 concurrent requests that all get rate-limited will retry at exactly the same time, causing a thundering herd that worsens the 429 problem.&quot;</span>
        </div>
        <div className="p-4 rounded-xl border border-teal-200 dark:border-teal-500/30 bg-teal-50/90 dark:bg-teal-500/10 shadow-sm">
          <span className="font-['Caveat',cursive] text-base text-teal-950 dark:text-teal-200 block">💡 Mental Model: Think of API errors like traffic signals. Red (401) = stop forever, call a mechanic. Yellow (429) = slow down, wait, then proceed. Red-then-detour (500) = road is closed, take the alternate route (fallback provider).</span>
        </div>
      </section>

      {/* SECTION 5: TRAPS */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-500" /><span>API Error Handling Traps</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-500/30 bg-rose-50/50 dark:bg-rose-500/5 space-y-2">
            <span className="text-xs font-mono font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider block">TRAP #1: Retrying Auth Errors</span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">Retrying a 401 error is like trying to swipe a cancelled credit card 5 times. Each attempt wastes latency and fails identically. Detect auth errors immediately, log them as critical, and halt the agent pending human intervention.</p>
          </div>
          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-500/5 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">TRAP #2: Linear Retry Without Jitter</span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">Retrying every 2 seconds with a fixed delay during a 429 storm causes synchronized thundering herds. Always use exponential backoff (2s, 4s, 8s...) plus a random ±30% jitter to stagger retries across concurrent requests.</p>
          </div>
        </div>
      </section>

      {/* SECTION 6: KEY TAKEAWAYS */}
      <section className="rounded-xl border border-rose-200 dark:border-rose-500/30 bg-rose-50/50 dark:bg-rose-500/5 p-5 space-y-3">
        <h4 className="font-bold text-sm text-rose-900 dark:text-rose-300 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-rose-600 dark:text-rose-400" /><span>Key Takeaways</span>
        </h4>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          {[
            ["1.", "Classify Before Responding:", "Not all errors are retryable. 401=halt, 429=backoff, 500=fallback, timeout=retry. Build your error handler as a decision tree, not a catch-all retry loop."],
            ["2.", "Use tenacity for Retries:", "tenacity's @retry decorator with wait_exponential handles the entire backoff/jitter/max-attempt logic in 4 lines. Don't roll your own retry loop."],
            ["3.", "with_fallbacks() is Free Insurance:", "LangChain's with_fallbacks() API gives you multi-provider failover with zero custom code. Primary → backup provider routing happens transparently on any server error."],
          ].map(([n, bold, rest]) => (
            <li key={n} className="flex items-start gap-2">
              <span className="text-rose-600 dark:text-rose-400 font-bold">{n}</span>
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
            <div className="p-2 rounded-lg bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400"><HelpCircle className="w-5 h-5" /></div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">Concept Check: API Error Handling</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">{showQuiz ? "Click to collapse" : "Test your resilience pattern intuition (3 questions)"}</p>
            </div>
          </div>
          <span className="text-xs font-mono font-semibold px-3 py-1.5 rounded-lg bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-500/30">
            {showQuiz ? "Hide Quiz" : "Start Quiz"}
          </span>
        </button>
        <AnimatePresence>
          {showQuiz && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }}>
              <Module2_10Quiz />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* NEXT MODULE BRIDGE */}
      <section className="rounded-2xl border border-rose-200 dark:border-rose-500/30 bg-gradient-to-r from-rose-50 via-white to-slate-50 dark:from-rose-500/10 dark:via-slate-900 dark:to-slate-950 p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <div className="text-xs font-mono font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider">Up Next • Module 2.11</div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Building a Chatbot Agent in LangGraph</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">Build a stateful multi-turn conversational agent using LangGraph checkpointers and thread_id — so your agent remembers what users said across sessions.</p>
        </div>
        <Link href="/learn/level-2/module-2-11" className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs sm:text-sm shadow-sm transition-all shrink-0 cursor-pointer">
          <span>Continue to Module 2.11</span><ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
