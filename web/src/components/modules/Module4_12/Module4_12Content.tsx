"use client";
import React from "react";
import {
  MessageSquare,
  Code2,
  Sparkles,
  Lightbulb,
  CheckCircle2,
  GitBranch,
  Repeat,
  Activity,
  Layers,
  Utensils,
  Sliders,
} from "lucide-react";
import FeedbackLoopStudio from "./FeedbackLoopStudio";
import Module4_12Quiz from "./Module4_12Quiz";

export default function Module4_12Content() {
  return (
    <div className="space-y-10">
      {/* Hero Header */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-indigo-500/10 via-teal-500/5 to-slate-50 dark:to-slate-950 p-6 md:p-8">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30">
              Module 4.12 • Production, Scaling & Optimization
            </span>
            <span className="text-xs font-mono text-slate-500">~24 min</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Fine-Tuning Agents with Feedback & Monitoring
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Deploying an AI agent to production is not the finish line — it is <em>Day 1</em>. The moment real users interact with your agent, they will ask things you never dreamed of, uncover bizarre edge cases, and push your system prompts to their breaking points. Here is how modern AI teams turn production failure traces into an automated flywheel of continuous improvement.
          </p>
        </div>
      </div>

      {/* Real-World Analogy */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Utensils className="w-5 h-5 text-indigo-500" />
          1. The Master Chef Analogy: Taste-Testing in the Dining Room
        </h2>
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-3 text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            Picture a restaurant kitchen. The head chef creates a new truffle risotto recipe. In the test kitchen with staff, everyone loves it. But when served to 500 customers on a busy Saturday night:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-2">
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-1">
              <span className="font-bold text-slate-800 dark:text-slate-200 block text-xs">1. Raw Customer Signals</span>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Some diners leave half the plate uneaten (implicit signal); two diners tell the waiter it was too salty (explicit feedback).
              </p>
            </div>
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-1">
              <span className="font-bold text-slate-800 dark:text-slate-200 block text-xs">2. Cluster Analysis</span>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                The chef doesn&apos;t panic and throw away the entire menu. They cluster the complaints: &ldquo;The parmesan cheese batch was saltier than expected.&rdquo;
              </p>
            </div>
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-1">
              <span className="font-bold text-slate-800 dark:text-slate-200 block text-xs">3. Controlled Canary Test</span>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                They adjust the seasoning by 15%, test it on 5 tables first (Canary rollout), and only update the master recipe once diner plates come back clean!
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-500 italic">
            <strong>Key Engineering Rule:</strong> When users complain about your agent, never make ad-hoc edits directly to your master prompt in production. Cluster the critiques, generate a candidate patch, test for regressions, and canary-deploy with traffic splitting.
          </p>
        </div>
      </section>

      {/* The 3 Feedback Signal Tiers */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Activity className="w-5 h-5 text-teal-500" />
          2. The Three Tiers of Production Feedback Signals
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/50 dark:bg-emerald-950/20 space-y-2">
            <h3 className="text-sm font-bold text-emerald-800 dark:text-emerald-300">Tier 1: Explicit Feedback</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              👍 / 👎 buttons, star ratings, and open-ended text comments (&ldquo;The agent gave me the wrong store hours&rdquo;). This is your highest-fidelity signal.
            </p>
            <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold">
              Volume: ~2–5% of sessions
            </span>
          </div>

          <div className="p-4 rounded-xl border border-indigo-200 dark:border-indigo-900/40 bg-indigo-50/50 dark:bg-indigo-950/20 space-y-2">
            <h3 className="text-sm font-bold text-indigo-800 dark:text-indigo-300">Tier 2: Implicit Behavioral</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              User re-prompts the exact same question (&ldquo;No, I meant...&rdquo;), copies the code immediately, user abandons session early, or escalates to human support.
            </p>
            <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 font-bold">
              Volume: ~40–60% of sessions
            </span>
          </div>

          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-900/40 bg-amber-50/50 dark:bg-amber-950/20 space-y-2">
            <h3 className="text-sm font-bold text-amber-800 dark:text-amber-300">Tier 3: Automated Trace Monitors</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Synthetic monitors scanning for tool-loop anomalies (agent calls web search 10+ times), token spikes (&gt;8K tokens on single turn), or latency alerts (&gt;15s).
            </p>
            <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold">
              Volume: 100% of telemetry traces
            </span>
          </div>
        </div>
      </section>

      {/* Tracing & Langfuse Code */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Code2 className="w-5 h-5 text-indigo-500" />
          3. Tagging User Feedback & A/B Prompt Versions (Langfuse / OpenTelemetry)
        </h2>
        <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs border border-slate-800 overflow-x-auto">
          <pre>{`from langfuse import Langfuse
from langfuse.openai import openai

langfuse = Langfuse()

# ── 1. Serve Request with Prompt Version Tagging ──
def handle_agent_turn(user_id: str, prompt_version: str, user_message: str):
    # Langfuse automatically instruments OpenAI calls
    trace = langfuse.trace(
        name="customer_support_agent",
        user_id=user_id,
        metadata={"prompt_version": prompt_version, "experiment": "canary_v2_1"}
    )
    
    response = openai.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": get_prompt_by_version(prompt_version)},
            {"role": "user", "content": user_message}
        ],
        trace_id=trace.id
    )
    return {"reply": response.choices[0].message.content, "trace_id": trace.id}

# ── 2. Ingest Explicit User Thumbs Up/Down ──
def record_user_feedback(trace_id: str, score: float, comment: str = None):
    # score: 1.0 (thumbs up) or 0.0 (thumbs down)
    langfuse.score(
        trace_id=trace_id,
        name="user_satisfaction",
        value=score,
        comment=comment
    )
    print(f"Feedback recorded for trace {trace_id}: {score} ({comment})")`}</pre>
        </div>
      </section>

      {/* Interactive Studio Workbench */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sliders className="w-5 h-5 text-teal-500" />
            4. Interactive Studio: Agent Feedback & A/B Canary Workbench
          </h2>
          <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Explore real negative user feedback traces, use Meta-LLM clustering to formulate prompt fixes, run regression checks against golden cases, and adjust canary traffic splits!
          </p>
        </div>
        <FeedbackLoopStudio />
      </section>

      {/* Interview Gold Callout */}
      <section className="p-6 rounded-2xl border border-indigo-300 dark:border-indigo-800/60 bg-gradient-to-br from-indigo-500/10 via-indigo-500/5 to-transparent space-y-3">
        <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 font-bold text-sm">
          <Lightbulb className="w-5 h-5 text-indigo-500" />
          💡 Interview Gold: Explaining Production Agent Monitoring in a System Design Interview
        </div>
        <div className="text-xs md:text-sm text-slate-700 dark:text-slate-300 space-y-2 leading-relaxed">
          <p>
            <strong>Question:</strong> &ldquo;You updated the system prompt to make an agent friendlier, and suddenly customer cancellation requests are failing. How do you detect and prevent this?&rdquo;
          </p>
          <div className="pl-4 border-l-2 border-indigo-400 space-y-1 font-mono text-xs text-slate-800 dark:text-slate-200">
            <p>1. <strong>Semantic Prompt Versioning:</strong> Never overwrite system prompts in-place. Every prompt is checked into Git with a SHA / version tag (e.g. <code className="text-indigo-400">prompt_v2.1.0</code>) attached to every telemetry trace.</p>
            <p>2. <strong>Canary Deployment with Blast Radius Control:</strong> Route 90% of requests to Control and 10% to Treatment. Monitor error rates, token consumption, and cancellation workflow completion rates.</p>
            <p>3. <strong>Pre-Deploy Regression Suite:</strong> Any prompt candidate must score &gt;=98% on the historical Golden Dataset before it is even eligible for a 10% canary split.</p>
            <p>4. <strong>Automated Circuit Breaker:</strong> If the 10% treatment group sees a &gt;5% spike in tool errors or user downvotes over a 15-minute window, traffic is automatically rolled back to Control with zero downtime.</p>
          </div>
        </div>
      </section>

      {/* Mastery Quiz */}
      <section className="space-y-4">
        <Module4_12Quiz />
      </section>
    </div>
  );
}
