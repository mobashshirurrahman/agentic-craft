"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target, Check, ArrowRight, BarChart3, Clock, DollarSign,
  CheckCircle2, TrendingUp, Code2, Sparkles, HelpCircle,
  Copy, CheckCheck, Play, RotateCcw, FileText, Terminal,
  Award, Layers,
} from "lucide-react";
import AgentTelemetryCostStudio from "./AgentTelemetryCostStudio";
import Module2_17Quiz from "./Module2_17Quiz";

export default function Module2_17Content() {
  const [selectedPillar, setSelectedPillar] = useState<string>("latency");
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [activeCodeTab, setActiveCodeTab] = useState<"code" | "output">("code");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);

  const pillars = [
    {
      id: "latency",
      title: "1. Latency Profile",
      tagline: "TTFT & P95 Tail",
      metric: "Target: TTFT < 400ms",
      desc: "Track Time to First Token (< 400ms for UI responsiveness), per-node waterfall timings, and P95 tail latency. One slow node ruins the entire user experience.",
      icon: Clock,
      color: "text-sky-600 dark:text-sky-400",
      bg: "bg-sky-50 dark:bg-sky-500/10",
      border: "border-sky-200 dark:border-sky-500/30",
      codeSnippet: `# PILLAR 1: Latency profiling with callbacks
from langchain_core.callbacks import BaseCallbackHandler
import time

class LatencyTracker(BaseCallbackHandler):
    def __init__(self):
        self.node_timings = {}
        self.ttft_recorded = False
    
    def on_llm_start(self, serialized, prompts, **kwargs):
        self.node_timings["llm_start"] = time.perf_counter()
    
    def on_llm_new_token(self, token, **kwargs):
        if not self.ttft_recorded:
            # First token = TTFT
            ttft_ms = (time.perf_counter() - self.node_timings["llm_start"]) * 1000
            metrics.record("agent.ttft_ms", ttft_ms)  # Target: < 400ms
            self.ttft_recorded = True
    
    def on_llm_end(self, response, **kwargs):
        total_ms = (time.perf_counter() - self.node_timings["llm_start"]) * 1000
        metrics.record("agent.llm.duration_ms", total_ms)
        metrics.record("agent.llm.p95", total_ms, percentile=95)`,
    },
    {
      id: "tokens",
      title: "2. Token Economics",
      tagline: "Cost Per Resolution",
      metric: "Alert at > $0.05/run",
      desc: "Calculate cost per resolved user goal, input vs. output token ratio, and prompt cache hit rate savings. Unmonitored agents are an open checkbook.",
      icon: DollarSign,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      border: "border-emerald-200 dark:border-emerald-500/30",
      codeSnippet: `# PILLAR 2: Token economics — cost per agent run
from langchain_core.callbacks import BaseCallbackHandler

# Current pricing (GPT-4o as of 2024)
PRICING = {
    "gpt-4o": {"input": 0.0025, "output": 0.010},       # per 1K tokens
    "gpt-4o-mini": {"input": 0.00015, "output": 0.00060},
    "claude-3-5-haiku": {"input": 0.0008, "output": 0.004},
}

class TokenEconomicsTracker(BaseCallbackHandler):
    def on_llm_end(self, response, **kwargs):
        usage = response.llm_output.get("token_usage", {})
        model = response.llm_output.get("model_name", "gpt-4o-mini")
        
        prompt_t = usage.get("prompt_tokens", 0)
        completion_t = usage.get("completion_tokens", 0)
        
        rates = PRICING.get(model, PRICING["gpt-4o-mini"])
        cost = (prompt_t / 1000 * rates["input"] + 
                completion_t / 1000 * rates["output"])
        
        metrics.record("agent.cost_usd", cost)
        metrics.record("agent.tokens.input", prompt_t)
        metrics.record("agent.tokens.output", completion_t)
        metrics.alert_if_exceeds("agent.cost_usd", threshold=0.05)`,
    },
    {
      id: "resolution",
      title: "3. Resolution Rate",
      tagline: "Task Completion %",
      metric: "Target: > 85% resolved",
      desc: "Track what percentage of tasks are resolved without human escalation, tool selection precision rate, and error recovery success. The most important business metric.",
      icon: CheckCircle2,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-500/10",
      border: "border-purple-200 dark:border-purple-500/30",
      codeSnippet: `# PILLAR 3: Resolution rate — business-level success tracking
from enum import Enum

class TaskOutcome(Enum):
    RESOLVED = "resolved"          # Task completed autonomously
    ESCALATED = "escalated"        # Needed human intervention
    FAILED = "failed"              # Error, no recovery
    TIMEOUT = "timeout"            # Exceeded max_steps

class ResolutionTracker:
    def __init__(self):
        self.outcomes = {o: 0 for o in TaskOutcome}
    
    def record(self, outcome: TaskOutcome, run_id: str, task_type: str):
        self.outcomes[outcome] += 1
        metrics.record(f"agent.outcome.{outcome.value}", 1,
                       tags={"run_id": run_id, "task_type": task_type})
    
    @property
    def resolution_rate(self) -> float:
        total = sum(self.outcomes.values())
        if total == 0:
            return 0.0
        return self.outcomes[TaskOutcome.RESOLVED] / total * 100

    # Alert if resolution rate drops below 85%
    def check_health(self):
        if self.resolution_rate < 85.0:
            alerting.fire("resolution_rate_degraded", rate=self.resolution_rate)`,
    },
    {
      id: "efficiency",
      title: "4. System Efficiency",
      tagline: "Tokens per Action",
      metric: "Detect loop drift",
      desc: "Track tokens consumed per successful action. Flag loop drift where agents make redundant tool calls. High tokens/action = runaway loop or poor tool selection.",
      icon: TrendingUp,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      border: "border-amber-200 dark:border-amber-500/30",
      codeSnippet: `# PILLAR 4: System efficiency — detect loop drift
class EfficiencyTracker:
    def __init__(self, max_steps: int = 10):
        self.max_steps = max_steps
        self.step_count = 0
        self.token_count = 0
        self.tool_call_history = []
    
    def record_step(self, tokens: int, tool_name: str | None):
        self.step_count += 1
        self.token_count += tokens
        if tool_name:
            self.tool_call_history.append(tool_name)
        
        # Detect repetitive tool calling (loop drift)
        if len(self.tool_call_history) >= 3:
            last_3 = self.tool_call_history[-3:]
            if len(set(last_3)) == 1:  # Same tool 3x in a row
                metrics.record("agent.loop_drift", 1)
                logger.warning(f"Loop drift: {tool_name} called 3 times consecutively")
        
        # Alert on excessive steps
        if self.step_count > self.max_steps:
            raise AgentLoopError(f"Max {self.max_steps} steps exceeded")
    
    @property
    def tokens_per_action(self) -> float:
        return self.token_count / max(self.step_count, 1)`,
    },
  ];

  const currentPillar = pillars.find((p) => p.id === selectedPillar) || pillars[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentPillar.codeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setActiveCodeTab("output");
    setSimStep(1);
    setTimeout(() => setSimStep(2), 700);
    setTimeout(() => setSimStep(3), 1400);
    setTimeout(() => { setSimStep(4); setIsSimulating(false); }, 2100);
  };

  return (
    <div className="space-y-10 max-w-5xl mx-auto pb-16">
      {/* CAPSTONE HERO */}
      <section className="rounded-2xl border border-sky-300 dark:border-sky-500/50 bg-gradient-to-br from-sky-500/15 via-blue-500/5 to-transparent p-5 sm:p-7 shadow-sm">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-sky-600 text-white shrink-0 shadow-sm mt-0.5 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-wider text-sky-700 dark:text-sky-400 font-bold">Level 2 Capstone • Module 2.17</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">Measuring Agent Performance and Cost</h1>
            <p className="text-sm text-slate-600 dark:text-slate-300">Unmonitored agents are an open checkbook and a latency gamble. Production readiness requires tracking <strong>4 telemetry pillars</strong> — latency, cost, resolution rate, and system efficiency.</p>
          </div>
        </div>
      </section>

      {/* 🎯 OBJECTIVE BANNER */}
      <section className="rounded-2xl border border-sky-200 dark:border-sky-500/30 bg-sky-50/60 dark:bg-sky-500/5 p-4 sm:p-6 shadow-sm">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-sky-600 text-white shrink-0 shadow-sm mt-0.5"><Target className="w-5 h-5" /></div>
          <div className="space-y-2 flex-1">
            <h2 className="text-sm font-mono uppercase tracking-wider text-sky-800 dark:text-sky-400 font-bold">🎯 By the end of this module, you will:</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              {[
                "Implement latency callbacks that track TTFT and P95 tail latency per LangGraph node",
                "Calculate real-time token cost using model pricing tables and alert on cost spikes",
                "Define and track task resolution rate vs. escalation rate for business-level SLAs",
                "Detect loop drift by flagging agents that repeat the same tool call 3+ times",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: 4 TELEMETRY PILLAR CARDS */}
      <section className="space-y-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/30 text-sky-700 dark:text-sky-300 text-xs font-mono font-semibold mb-2">
            <BarChart3 className="w-3.5 h-3.5" /><span>Production Telemetry • Unit Economics</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">The 4 Production Telemetry Pillars</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Moving from local scripts to production means answering 4 questions every run: <em>How fast was it? How much did it cost? Did it succeed? Was it efficient?</em>
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            const isSelected = selectedPillar === pillar.id;
            return (
              <button key={pillar.id} onClick={() => setSelectedPillar(pillar.id)}
                className={`p-3.5 sm:p-4 rounded-xl border text-left transition-all flex flex-col justify-between min-h-[155px] sm:min-h-[170px] active:scale-95 cursor-pointer ${isSelected ? "border-sky-500 bg-white dark:bg-slate-900 shadow-md ring-2 ring-sky-500/20" : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700"}`}>
                <div className="space-y-2">
                  <div className={`inline-flex p-1.5 rounded-lg ${pillar.bg} border ${pillar.border}`}><Icon className={`w-4 h-4 ${pillar.color}`} /></div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">{pillar.title}</div>
                    <div className={`text-[10px] font-mono ${pillar.color} mt-0.5`}>{pillar.tagline}</div>
                  </div>
                </div>
                <div className="mt-2 space-y-1.5">
                  <p className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{pillar.desc}</p>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${pillar.bg} ${pillar.color} border ${pillar.border}`}>{pillar.metric}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* CODE INSPECTOR */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`inline-flex p-1.5 rounded-lg ${currentPillar.bg} border ${currentPillar.border}`}><currentPillar.icon className={`w-4 h-4 ${currentPillar.color}`} /></div>
              <span className="text-xs font-bold text-slate-900 dark:text-white">{currentPillar.title}: {currentPillar.tagline}</span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${currentPillar.bg} ${currentPillar.color} border ${currentPillar.border}`}>{currentPillar.metric}</span>
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
                    {tab === "code" ? "Python Code" : "Metrics Output"}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                {simStep > 0 && <button onClick={() => { setSimStep(0); setActiveCodeTab("code"); }} className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 cursor-pointer"><RotateCcw className="w-3 h-3" /> Reset</button>}
                <button onClick={handleRunSimulation} disabled={isSimulating}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-sky-600 hover:bg-sky-500 text-white text-xs font-mono disabled:opacity-50 cursor-pointer">
                  <Play className="w-3 h-3" />{isSimulating ? "Collecting..." : "Emit Metrics"}
                </button>
              </div>
            </div>
            <div className="p-4 min-h-[140px] font-mono text-xs">
              {activeCodeTab === "code" ? (
                <pre className="text-slate-300 whitespace-pre-wrap leading-relaxed">{currentPillar.codeSnippet}</pre>
              ) : (
                <div className="space-y-1.5 text-slate-300">
                  {simStep === 0 && <div className="text-slate-500 italic">Click &apos;Emit Metrics&apos; to simulate a production agent run with telemetry...</div>}
                  {simStep >= 1 && <div className="text-sky-400">➜ [RUN START] run_id=f4a2b891 | thread=user_2847</div>}
                  {simStep >= 2 && selectedPillar === "latency" && (
                    <div className="text-slate-400 pl-4">
                      [TTFT] First token at 287ms ✔ (target: &lt;400ms)<br />
                      [NODE] guardrail_node: 8ms | [NODE] search_tool: 142ms<br />
                      [NODE] llm_call: 1820ms | [NODE] format: 14ms
                    </div>
                  )}
                  {simStep >= 2 && selectedPillar === "tokens" && (
                    <div className="text-emerald-400 pl-4">
                      [TOKENS] prompt=1240 | completion=387 | total=1627<br />
                      [COST] model=gpt-4o-mini | cost=$0.000297<br />
                      [CACHE] cache_hit=true | saved $0.000186
                    </div>
                  )}
                  {simStep >= 2 && selectedPillar === "resolution" && (
                    <div className="text-purple-400 pl-4">
                      [OUTCOME] TaskOutcome.RESOLVED (autonomous completion)<br />
                      [RATE] 7-day resolution rate: 87.3% ✔ (target: &gt;85%)
                    </div>
                  )}
                  {simStep >= 2 && selectedPillar === "efficiency" && (
                    <div className="text-amber-400 pl-4">
                      [STEPS] 3 steps | [TOOLS] search_db, analyze, summarize<br />
                      [EFFICIENCY] 542 tokens/action (normal range: &lt;800)
                    </div>
                  )}
                  {simStep >= 3 && <div className="text-slate-400">[METRICS] Flushing to Datadog/Prometheus/OpenTelemetry...</div>}
                  {simStep >= 4 && (
                    <div className="text-emerald-400 font-bold pt-2 border-t border-slate-800">
                      ✔ [RUN COMPLETE] All telemetry flushed | No alerts triggered<br />
                      <span className="text-slate-400 font-normal text-[10px]">Dashboard: {currentPillar.metric} — within acceptable thresholds</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: DASHBOARD CARDS */}
      <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">📊 Production Dashboard: What to Alert On</h3>
        </div>
        <div className="p-5 grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { metric: "TTFT", value: "287ms", status: "green", target: "< 400ms", color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
            { metric: "Cost/Run", value: "$0.0003", status: "green", target: "< $0.05", color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
            { metric: "Resolution", value: "87.3%", status: "green", target: "> 85%", color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
            { metric: "Loop Drift", value: "0 runs", status: "green", target: "0 detected", color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
          ].map(({ metric, value, target, color, bg }) => (
            <div key={metric} className={`p-4 rounded-xl border border-slate-200 dark:border-slate-800 ${bg} space-y-1.5 text-center`}>
              <div className="text-xs font-mono text-slate-500 dark:text-slate-400">{metric}</div>
              <div className={`text-xl font-extrabold ${color}`}>{value}</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">target: {target}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: INTERACTIVE COST STUDIO */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">🔬 Telemetry & Unit Economics Studio</h3>
        <AgentTelemetryCostStudio />
      </section>

      {/* SECTION 4: NOTES */}
      <section className="space-y-3">
        <div className="p-4 rounded-xl border border-amber-300 dark:border-amber-500/30 bg-amber-50/90 dark:bg-amber-500/10 shadow-sm">
          <span className="font-['Caveat',cursive] text-base text-amber-950 dark:text-amber-200 block">✍️ Instructor Note: &quot;Don&apos;t wait until your bill arrives to discover a cost problem. Set up automated alerts when agent.cost_usd exceeds $0.05 per run AND when 7-day average crosses your budget threshold. One runaway loop can burn $50 in under a minute.&quot;</span>
        </div>
        <div className="p-4 rounded-xl border border-sky-200 dark:border-sky-500/30 bg-sky-50/90 dark:bg-sky-500/10 shadow-sm">
          <span className="font-['Caveat',cursive] text-base text-sky-950 dark:text-sky-200 block">📌 Core Rule: Track input_tokens vs. output_tokens separately. Prompt caching reduces input token costs by 50–80%. If your cache hit rate is low, your prompts are changing too frequently between requests — optimize for cache stability to cut costs dramatically.</span>
        </div>
      </section>

      {/* SECTION 5: KEY TAKEAWAYS */}
      <section className="rounded-xl border border-sky-200 dark:border-sky-500/30 bg-sky-50/50 dark:bg-sky-500/5 p-5 space-y-3">
        <h4 className="font-bold text-sm text-sky-900 dark:text-sky-300 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-sky-600 dark:text-sky-400" /><span>Key Takeaways</span>
        </h4>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          {[
            ["1.", "4 Pillars = 4 Dashboards:", "Every production agent deployment needs 4 metrics dashboards: Latency (TTFT, P95), Cost (per-run, daily budget), Resolution Rate (success %, escalation %), Efficiency (tokens/action, loop drift count)."],
            ["2.", "Use Callbacks, Not Manual Timing:", "LangChain's BaseCallbackHandler gives you on_llm_start / on_llm_end / on_tool_start hooks that fire automatically. Never add manual timing with time.time() scattered across business logic."],
            ["3.", "Alert Aggressively, Early:", "Set cost alerts at 2x your expected per-run cost, not at your monthly budget limit. A single runaway loop caught in 5 minutes costs $5. Caught after 1 day = catastrophic. Alerting is your circuit breaker."],
          ].map(([n, bold, rest]) => (
            <li key={n} className="flex items-start gap-2">
              <span className="text-sky-600 dark:text-sky-400 font-bold">{n}</span>
              <span><strong>{bold}</strong> {rest}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* SECTION 6: QUIZ */}
      <section className="space-y-3">
        <button onClick={() => setShowQuiz(!showQuiz)}
          className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all text-left cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400"><HelpCircle className="w-5 h-5" /></div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">Capstone Quiz: Agent Telemetry</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">{showQuiz ? "Click to collapse" : "Final Level 2 knowledge check (3 questions)"}</p>
            </div>
          </div>
          <span className="text-xs font-mono font-semibold px-3 py-1.5 rounded-lg bg-sky-50 dark:bg-sky-500/10 text-sky-700 dark:text-sky-400 border border-sky-200 dark:border-sky-500/30">
            {showQuiz ? "Hide Quiz" : "Start Quiz"}
          </span>
        </button>
        <AnimatePresence>
          {showQuiz && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }}>
              <Module2_17Quiz />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* LEVEL 2 GRADUATION */}
      <section className="rounded-2xl border-2 border-sky-400 dark:border-sky-600 bg-gradient-to-br from-sky-500/15 via-blue-500/10 to-transparent p-6 sm:p-8 space-y-5">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-sky-500/20 text-sky-600 dark:text-sky-300 flex items-center justify-center shadow-sm shrink-0">
            <Award className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">🎉 Level 2 Completed! (17 of 17 Modules)</span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-0.5">You Have Mastered Core Implementation & Workflows</h3>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          You now possess the full engineering toolkit to build production agents: LangGraph state graphs, Pydantic schemas, tool calling, streaming telemetry, async concurrency, prompt templates, defense-in-depth guardrails, automated pytest suites, and financial cost monitoring.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            "LangGraph State Graphs",
            "Pydantic Schemas",
            "Streaming Output",
            "Async Concurrency",
            "Prompt Templates",
            "Input Guardrails",
            "Pytest Test Suites",
            "Cost Telemetry",
          ].map((skill) => (
            <div key={skill} className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300">
              <Check className="w-3.5 h-3.5 text-sky-500 shrink-0" />
              <span>{skill}</span>
            </div>
          ))}
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-sky-200 dark:border-sky-700/50">
          <div className="text-xs font-mono text-slate-500 dark:text-slate-400 text-center sm:text-left">
            Next Milestone: <strong className="text-slate-700 dark:text-slate-200">Level 3 • Advanced Patterns & System Design</strong><br />
            <span className="text-slate-400">MCP, Deep Planning, Sub-graphs, Human-in-the-Loop</span>
          </div>
          <Link href="/#curriculum"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs sm:text-sm shadow-sm transition-all shrink-0 cursor-pointer">
            <span>Explore Level 3</span><ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
