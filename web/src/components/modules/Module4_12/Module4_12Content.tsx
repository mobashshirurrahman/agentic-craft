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
  Activity,
  GitFork,
  Radio,
  RefreshCw,
  PieChart,
} from "lucide-react";
import FeedbackLoopStudio from "./FeedbackLoopStudio";
import Module4_12Quiz from "./Module4_12Quiz";

export default function Module4_12Content() {
  const [selectedPillar, setSelectedPillar] = useState<string>("telemetry");
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [activeCodeTab, setActiveCodeTab] = useState<"code" | "output">("code");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);

  const pillars = [
    {
      id: "telemetry",
      title: "1. OpenTelemetry & Tracing",
      tagline: "Granular Production Observability",
      desc: "Instrument every node invocation, LLM completion, and tool call with distributed trace IDs, recording latencies, token consumption, and intermediate outputs.",
      icon: Activity,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      border: "border-amber-200 dark:border-amber-500/30",
      badge: "OpenTelemetry / LangSmith",
      codeSnippet: `# 1. INSTRUMENTING AGENT TRACES WITH OPENTELEMETRY
from langsmith import traceable

@traceable(name="financial_research_agent", tags=["prod", "v4.2"])
def run_agent_turn(query: str, session_id: str):
    """Executes agent with end-to-end tracing across all subgraph nodes."""
    config = {
        "configurable": {"thread_id": session_id},
        "metadata": {"user_tier": "enterprise", "model_version": "gpt-4o"}
    }
    return app.invoke({"messages": [("user", query)]}, config)`,
    },
    {
      id: "feedback_flywheel",
      title: "2. The Feedback Flywheel",
      tagline: "Explicit & Implicit User Signals",
      desc: "Capture explicit ratings (thumbs up/down) alongside implicit signals (re-prompts, copy actions, rage clicks) to flag sessions requiring manual triage.",
      icon: RefreshCw,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-500/10",
      border: "border-blue-200 dark:border-blue-500/30",
      badge: "Feedback Collector",
      codeSnippet: `# 2. RECORDING EXPLICIT & IMPLICIT FEEDBACK
from langsmith import Client

client = Client()

def log_user_feedback(run_id: str, score: float, comment: str, implicit_reprompt: bool):
    """Logs user satisfaction score directly attached to the execution trace."""
    client.create_feedback(
        run_id=run_id,
        key="user_satisfaction",
        score=score, # 1.0 for positive, 0.0 for negative
        comment=comment,
        metadata={"implicit_reprompt": implicit_reprompt}
    )`,
    },
    {
      id: "failure_clustering",
      title: "3. Automated Error Clustering",
      tagline: "Embedding-Based Root Cause Discovery",
      desc: "Embed user negative feedback transcripts to discover patterns. Cluster complaints into common themes: 'tool timeout', 'outdated pricing', 'unclear response'.",
      icon: PieChart,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-500/10",
      border: "border-purple-200 dark:border-purple-500/30",
      badge: "Trace Clustering",
      codeSnippet: `# 3. CLUSTERING FAILURE TRACES WITH EMBEDDINGS
import numpy as np
from sklearn.cluster import HDBSCAN

def cluster_failed_traces(failure_records):
    """Groups negative traces by semantic intent to diagnose failure root causes."""
    embeddings = [embed_model.embed_query(f["error_summary"]) for f in failure_records]
    clusterer = HDBSCAN(min_cluster_size=5)
    labels = clusterer.fit_predict(embeddings)
    
    # Identify top clusters: e.g. "Cluster 0: SEC 10-K extraction failure"
    return {rec["id"]: label for rec, label in zip(failure_records, labels)}`,
    },
    {
      id: "canary_rollout",
      title: "4. Canary & Traffic Splitting",
      tagline: "Safe 90/10 Prompt A/B Deployments",
      desc: "Never replace a production prompt wholesale. Route 10% of live traffic to the candidate prompt, compare feedback metrics, then roll out to 100%.",
      icon: GitFork,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      border: "border-emerald-200 dark:border-emerald-500/30",
      badge: "Canary A/B Router",
      codeSnippet: `# 4. CANARY TRAFFIC SPLITTING FOR PROMPT RELEASES
import random

def route_to_prompt_variant(session_id: str):
    """Splits traffic: 90% stable baseline, 10% candidate prompt."""
    random.seed(session_id)
    if random.random() < 0.10:
        return "prompt_v4_candidate", CANARY_PROMPT
    return "prompt_v3_stable", STABLE_PROMPT

# Monitor satisfaction delta between canary and baseline in real time!`,
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
              Module 4.12 • Production, Scaling & Optimization
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              ~25 min interactive
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Fine-Tuning Agents with Feedback & Monitoring
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Deploying an AI agent to production is not the finish line — it is <strong>Day 1</strong>. When users expose edge cases, you must capture distributed traces, cluster failure modalities, and deploy iterative fixes via safe <strong>canary traffic splitting</strong>.
          </p>
        </div>
      </div>

      {/* SECTION 1: 4 ARCHITECTURE PILLARS */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-amber-500" />
            1. Core Pillars of Feedback & Observability
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Select a feedback loop mechanism
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
              Feedback Loop & Observability Inspector
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
                  <span>Processing Flywheel...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Simulate Feedback Loop</span>
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
                monitoring_flywheel.py • {selectedPillar}
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
                Live Metrics
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
                <p className="text-slate-400">&gt;&gt; Ingesting 2,500 production agent traces...</p>
                <p className="text-slate-300">   [Explicit Feedback] 128 thumbs-up (94.8%), 7 thumbs-down (5.2%)</p>
                <p className="text-amber-400">   [HDBSCAN Clustering] Identified 1 high-frequency failure cluster:</p>
                <p className="text-rose-400">     - Cluster 1: &quot;Ambiguous stock ticker when company has multiple share classes (GOOG vs GOOGL)&quot;</p>
                <p className="text-sky-300">   [Auto-Patch Candidate] Generated disambiguation prompt rule.</p>
                <p className="text-emerald-400 font-bold">&gt;&gt; Canary 10% deployed: Disambiguation errors reduced to 0.0%!</p>
              </div>
            )}
          </div>
        </div>

        {/* Simulation Banner */}
        {simStep > 0 && (
          <div className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/80 dark:bg-amber-950/30 flex items-center justify-between text-xs font-mono">
            <span className="text-amber-800 dark:text-amber-200">
              {simStep === 1 && "Ingesting real-time OpenTelemetry trace spans and latency metadata..."}
              {simStep === 2 && "Capturing thumbs-down feedback and user re-prompt corrections..."}
              {simStep === 3 && "Running HDBSCAN semantic clustering on low-satisfaction sessions..."}
              {simStep === 4 && "Canary A/B traffic split deployed with automated regression monitoring!"}
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
            2. Interactive Feedback Loop Studio
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Real-Time Trace Clustering & Canary Routing
          </span>
        </div>
        <FeedbackLoopStudio />
      </section>

      {/* SECTION 4: HANDWRITTEN PRODUCTION INSIGHT */}
      <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/90 dark:bg-amber-500/10 shadow-sm">
        <span className="font-['Caveat',cursive] text-base text-amber-950 dark:text-amber-200 block">
          📌 Production Insight: When a customer gives a 👎, never edit your master prompt in production on an emotional reaction! One ad-hoc prompt tweak might fix that one user&apos;s edge case while silently breaking 10 other workflows. Always curate negative traces into a test dataset, verify zero regressions, and canary test with a 10% traffic split.
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
              TRAP #1: Relying Solely on Explicit Feedback
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Only 2% to 5% of users ever click a thumbs up or down button. If you only look at explicit votes, you are blind to 95% of user experiences. You must track implicit signals: user re-prompts, session drop-offs, and copy actions.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-500/5 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
              TRAP #2: The &quot;Big Bang&quot; Prompt Release
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Shipping a revised system prompt to 100% of production users all at once. If subtle unintended behaviors arise, thousands of users suffer instantly. Always use a 90/10 traffic split with automated rollback triggers based on satisfaction scores.
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
            ["1.", "Distributed Tracing:", "Instrument every step with OpenTelemetry or LangSmith to understand exact execution timelines."],
            ["2.", "Automated Clustering:", "Group low-satisfaction sessions with semantic embeddings to spot systematic root causes."],
            ["3.", "Canary Rollouts:", "Deploy prompt revisions to 10% of traffic before declaring production readiness."],
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
                Concept Check: Feedback Loops & Monitoring
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {showQuiz ? "Click to collapse" : "Test your understanding of telemetry, clustering, and canary rollouts (3 questions)"}
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
              <Module4_12Quiz />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* SECTION 8: NEXT MODULE BRIDGE */}
      <section className="rounded-2xl border border-amber-200 dark:border-amber-500/30 bg-gradient-to-r from-amber-50 via-white to-slate-50 dark:from-amber-500/10 dark:via-slate-900 dark:to-slate-950 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
            <span>Up Next • Module 4.13</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Designing APIs for Long-Running Agent Tasks</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
            When agents execute multi-minute research jobs, synchronous HTTP 504s will break your clients. Learn how to architect async 202 Accepted polling and WebSocket streaming.
          </p>
        </div>
        <Link
          href="/learn/level-4/module-4-13"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow-amber-500/20 transition-all shrink-0 cursor-pointer"
        >
          <span>Continue to Module 4.13</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
