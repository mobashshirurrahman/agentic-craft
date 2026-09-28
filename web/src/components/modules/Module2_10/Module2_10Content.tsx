"use client";

import React from "react";
import {
  AlertTriangle,
  Sparkles,
  ArrowRight,
  Code2,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ServerCrash,
} from "lucide-react";
import ApiErrorTroubleshooter from "./ApiErrorTroubleshooter";
import Module2_10Quiz from "./Module2_10Quiz";

export default function Module2_10Content() {
  return (
    <div className="space-y-10">
      {/* Hero Banner */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-red-500/10 via-amber-500/5 to-slate-50 dark:to-slate-950 p-6 md:p-8 relative overflow-hidden transition-colors">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-red-500/20 text-red-700 dark:text-red-300 border border-red-500/30">
              Module 2.10 • Core Implementation
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              ~20 min hands-on
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Troubleshooting Common LLM API Issues
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            In production, networks flake, rate limits trigger during traffic spikes, and providers experience outages. Designing a self-healing agent means building <strong>retry backoffs</strong> and <strong>fallback routing</strong> from day one.
          </p>
        </div>
      </div>

      {/* Section 1: The Three Big Errors */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-500" />
          1. The 3 Most Common LLM API Errors
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <span className="text-xs font-mono font-bold text-red-600 dark:text-red-400 uppercase">
              401 / 403 Auth
            </span>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-1">Fatal Config Error</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Invalid or revoked API key. <strong>Never retry!</strong> Alert the developer to verify environment variables.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 uppercase">
              429 Rate Limit
            </span>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-1">Temporary Throttling</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              RPM (Requests) or TPM (Tokens) exhausted. Mitigate using <strong>exponential backoff with jitter</strong>.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400 uppercase">
              500 / 503 Outage
            </span>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-1">Server Incident</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Provider capacity outage. Mitigate via <strong>multi-provider fallback routing</strong> (e.g. OpenAI ➔ Anthropic).
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Code Walkthrough */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Code2 className="w-5 h-5 text-sky-500" />
          2. Implementing Retries & Fallbacks
        </h2>
        <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs border border-slate-800 overflow-x-auto">
          <pre>{`from tenacity import retry, stop_after_attempt, wait_exponential, retry_if_exception_type
from langchain_openai import ChatOpenAI
from langchain_anthropic import ChatAnthropic

# 1. Multi-Provider Fallback Model
primary_llm = ChatOpenAI(model="gpt-4o", max_retries=2)
fallback_llm = ChatAnthropic(model="claude-3-5-haiku", max_retries=2)

# Automatically catches 500/503 errors and routes to fallback!
resilient_llm = primary_llm.with_fallbacks([fallback_llm])

# 2. Tenacity Retry Pattern for custom tool execution
@retry(
    stop=stop_after_attempt(3),
    wait=wait_exponential(multiplier=1, min=1, max=10),
    reraise=True
)
def robust_external_api_call():
    ...`}</pre>
        </div>
      </section>

      {/* Interactive Troubleshooter */}
      <section className="space-y-4">
        <ApiErrorTroubleshooter />
      </section>

      {/* Quiz */}
      <section className="space-y-4">
        <Module2_10Quiz />
      </section>

      {/* Next Step Callout */}
      <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-xs font-mono text-slate-700 dark:text-slate-300 flex items-center justify-between">
        <span>Up Next: Module 2.11 — Building a Chatbot Agent in LangGraph</span>
        <ArrowRight className="w-4 h-4 text-red-500" />
      </div>
    </div>
  );
}
