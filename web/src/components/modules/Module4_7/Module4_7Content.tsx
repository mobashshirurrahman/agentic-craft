"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  Check,
  ArrowRight,
  AlertTriangle,
  Code2,
  Layers,
  Sparkles,
  HelpCircle,
  Copy,
  CheckCheck,
  Play,
  RotateCcw,
  FileText,
  ShieldAlert,
  ZapOff,
  Cpu,
  RefreshCw,
  Workflow,
} from "lucide-react";
import ErrorRecoverySimulator from "./ErrorRecoverySimulator";
import Module4_7Quiz from "./Module4_7Quiz";

export default function Module4_7Content() {
  const [selectedPillar, setSelectedPillar] = useState<string>("taxonomy");
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [activeCodeTab, setActiveCodeTab] = useState<"code" | "output">("code");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);

  const pillars = [
    {
      id: "taxonomy",
      title: "1. The 4 Error Classes",
      tagline: "Know the Failure Mode",
      desc: "Distinguish between Transient (HTTP 503/429 -> backoff retry), Permanent (HTTP 401/404 -> immediate fail), Partial (1 of 3 tools fail -> continue), and Cascading (circuit break).",
      icon: AlertTriangle,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      border: "border-amber-200 dark:border-amber-500/30",
      badge: "Error Taxonomy",
      codeSnippet: `# 1. CLASSIFYING AGENT EXCEPTIONS
class AgentErrorClassifier:
    @staticmethod
    def classify(status_code: int) -> str:
        if status_code in (429, 502, 503, 504):
            return "TRANSIENT"  # Retry with exponential backoff
        elif status_code in (400, 401, 403, 404):
            return "PERMANENT"  # Terminate, do NOT waste retry tokens
        return "UNKNOWN"`,
    },
    {
      id: "circuit_breaker",
      title: "2. Graph Circuit Breakers",
      tagline: "Failing Fast on Infrastructure Outages",
      desc: "When an external tool fails 3 times consecutively, the circuit breaker opens — routing future requests immediately to a cached or mock response without waiting for timeouts.",
      icon: ZapOff,
      color: "text-rose-600 dark:text-rose-400",
      bg: "bg-rose-50 dark:bg-rose-500/10",
      border: "border-rose-200 dark:border-rose-500/30",
      badge: "Circuit Breaker",
      codeSnippet: `# 2. STATEGRAPH CIRCUIT BREAKER PATTERN
class CircuitState(TypedDict):
    failure_counts: dict[str, int]
    circuit_open: dict[str, bool]

def call_payment_api_node(state: CircuitState) -> dict:
    if state["circuit_open"].get("payment_api"):
        print("⚠️ Circuit OPEN! Diverting to fallback degraded queue.")
        return {"payment_status": "queued_offline"}

    try:
        res = charge_card()
        return {"payment_status": "success", "failure_counts": {"payment_api": 0}}
    except Exception as e:
        count = state["failure_counts"].get("payment_api", 0) + 1
        return {
            "failure_counts": {"payment_api": count},
            "circuit_open": {"payment_api": count >= 3}
        }`,
    },
    {
      id: "model_fallback",
      title: "3. Model Fallback Cascades",
      tagline: "Multi-Provider Fault Tolerance",
      desc: "If OpenAI suffers an outage or severe latency spike, LangChain's with_fallbacks automatically swaps the node to Anthropic Claude 3.5 Sonnet or Gemini 1.5 Pro instantly.",
      icon: RefreshCw,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-500/10",
      border: "border-purple-200 dark:border-purple-500/30",
      badge: "with_fallbacks()",
      codeSnippet: `# 3. MULTI-MODEL FALLBACK CASCADE
from langchain_openai import ChatOpenAI
from langchain_anthropic import ChatAnthropic

# Primary model: GPT-4o
primary_model = ChatOpenAI(model="gpt-4o", max_retries=1, timeout=10.0)

# Fallback model: Claude 3.5 Sonnet
backup_model = ChatAnthropic(model="claude-3-5-sonnet-20241022", timeout=10.0)

# Composite model with automatic seamless failover:
resilient_model = primary_model.with_fallbacks([backup_model])

# If OpenAI returns 500 or times out after 10s, Claude answers automatically!`,
    },
    {
      id: "error_edges",
      title: "4. Explicit Error Routing Edges",
      tagline: "Graceful Degraded Outputs",
      desc: "Rather than letting unhandled exceptions crash the LangGraph run, catch errors inside nodes, record the failure status in State, and route to a recovery node via conditional edges.",
      icon: Workflow,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      border: "border-emerald-200 dark:border-emerald-500/30",
      badge: "Error Recovery Node",
      codeSnippet: `# 4. ERROR RECOVERY EDGES IN LANGGRAPH
def route_after_tool(state: AgentState) -> str:
    if state.get("tool_error"):
        # Graceful degradation route: notify user and suggest manual action
        return "fallback_notification_node"
    return "synthesizer_node"

builder.add_conditional_edges(
    "execute_tool",
    route_after_tool,
    {"fallback_notification_node": "fallback_notification", "synthesizer_node": "synthesizer"}
)`,
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
      <div className="rounded-2xl border border-amber-200 dark:border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-rose-500/5 to-slate-50 dark:to-slate-950 p-6 md:p-8 relative overflow-hidden transition-colors">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30">
              Module 4.7 • Enterprise Reliability
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              ~25 min interactive
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Developing Error Handling and Recovery Pathways
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            In production, systems fail constantly. In this lesson, we build <strong>self-healing agent recovery pathways</strong>: classifying failure modes, tripping graph circuit breakers, and cascading to backup model providers.
          </p>
        </div>
      </div>

      {/* SECTION 1: 4 PILLARS OF ERROR RECOVERY */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-amber-500" />
            1. Core Mechanics of Resilient Error Handling
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Select a resilience strategy
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
              Fault Tolerance Inspector
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
                  <span>Failing Over...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Simulate Outage Failover</span>
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
                error_recovery.py • {selectedPillar}
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
                Failover Trace
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
                <p className="text-slate-400">[Invocation] Primary Provider: OpenAI gpt-4o</p>
                <p className="text-rose-400">❌ [HTTP 503] OpenAI Service Unavailable (Transient Error)</p>
                <p className="text-purple-300">&gt;&gt; with_fallbacks triggered! Routing to backup: Claude 3.5 Sonnet</p>
                <p className="text-emerald-400 font-bold">&gt;&gt; Claude responded in 820ms! User received complete answer with zero downtime.</p>
              </div>
            )}
          </div>
        </div>

        {/* Simulation Banner */}
        {simStep > 0 && (
          <div className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/80 dark:bg-amber-950/30 flex items-center justify-between text-xs font-mono">
            <span className="text-amber-800 dark:text-amber-200">
              {simStep === 1 && "Primary API call initiated -> Encounters unexpected HTTP 503 outage"}
              {simStep === 2 && "Error classified as TRANSIENT -> with_fallbacks intercepts exception"}
              {simStep === 3 && "Secondary model provider automatically invoked with identical state context"}
              {simStep === 4 && "Backup succeeds -> Agent completes turn seamlessly without crashing!"}
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
            2. Interactive Error Recovery Simulator
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Outage & Circuit Breaker Sandbox
          </span>
        </div>
        <ErrorRecoverySimulator />
      </section>

      {/* SECTION 4: HANDWRITTEN NOTE */}
      <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/90 dark:bg-amber-500/10 shadow-sm">
        <span className="font-['Caveat',cursive] text-base text-amber-950 dark:text-amber-200 block">
          📌 Production Reality: LLM providers go down. Search APIs return 503s. Never deploy an agent tied to a single vendor. Using with_fallbacks([backup_model]) turns an existential service outage into a 500ms blip your users will never even notice!
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
              TRAP #1: Retrying on 401 Unauthorized
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              When an API key expires, naive agents retry 10 times with exponential backoff, delaying user error notification by 60 seconds. Only retry transient 5xx/429 errors. Fail permanent errors immediately.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-500/5 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
              TRAP #2: The Infinite Self-Healing Retry Loop
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              If an error recovery node attempts to prompt the LLM to fix a bug, but the LLM repeats the same bug, the agent loops infinitely. Enforce a strict <code>max_recovery_attempts = 2</code> counter in State.
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
            ["1.", "Classify Before Action:", "Categorize errors into Transient, Permanent, Partial, and Cascading before selecting a recovery strategy."],
            ["2.", "Circuit Breakers Save Dependencies:", "Trip the breaker after 3 failures to protect downstream databases from cascading thundering herds."],
            ["3.", "Multi-Provider Redundancy:", "Deploy with_fallbacks across diverse model providers to achieve five-nines availability."],
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
                Concept Check: Error Recovery
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {showQuiz ? "Click to collapse" : "Test your understanding of circuit breakers and failovers (3 questions)"}
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
              <Module4_7Quiz />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* SECTION 8: NEXT MODULE BRIDGE */}
      <section className="rounded-2xl border border-amber-200 dark:border-amber-500/30 bg-gradient-to-r from-amber-50 via-white to-slate-50 dark:from-amber-500/10 dark:via-slate-900 dark:to-slate-950 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
            <span>Up Next • Module 4.8</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Using Time Travel for State Branching</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
            What if you could rewind an agent run, change a single tool result, and fork reality? Master LangGraph Time Travel debugging, checkpoint diffing, and speculative branching.
          </p>
        </div>
        <Link
          href="/learn/level-4/module-4-8"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow-amber-500/20 transition-all shrink-0 cursor-pointer"
        >
          <span>Continue to Module 4.8</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
