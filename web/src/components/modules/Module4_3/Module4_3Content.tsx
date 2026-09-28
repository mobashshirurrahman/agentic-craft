"use client";

import React from "react";
import { Network, Code2, Layers, Sparkles, Lightbulb, CheckCircle2, ArrowRight } from "lucide-react";
import SwarmAgentStudio from "./SwarmAgentStudio";
import Module4_3Quiz from "./Module4_3Quiz";

export default function Module4_3Content() {
  return (
    <div className="space-y-10">
      {/* Hero Banner */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-teal-500/10 via-cyan-500/5 to-slate-50 dark:to-slate-950 p-6 md:p-8 transition-colors">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-teal-500/20 text-teal-700 dark:text-teal-300 border border-teal-500/30">
              Module 4.3 • Production, Scaling & Optimization
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">~35 min hands-on</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Building Multi-Agent Swarm Systems
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            The Supervisor pattern has one weakness: <strong>the supervisor becomes a single point of failure</strong> — and a bottleneck for complex workflows. Swarm fixes this by removing the central coordinator entirely. Think of how a hospital ER works: no one is calling a supervisor before sending you to radiology. Each specialist evaluates, treats, and hands you off to the right next person — autonomously.
          </p>
        </div>
      </div>

      {/* Section 1: Supervisor vs Swarm */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-teal-500" />
          1. Supervisor vs Swarm — The Core Difference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800">
                <th className="p-3 font-mono font-bold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">Aspect</th>
                <th className="p-3 font-mono font-bold text-amber-600 dark:text-amber-400 border border-slate-200 dark:border-slate-700">Supervisor</th>
                <th className="p-3 font-mono font-bold text-teal-600 dark:text-teal-400 border border-slate-200 dark:border-slate-700">Swarm</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Control", "Centralized — Supervisor LLM routes everything", "Decentralized — each agent decides its own handoff"],
                ["Bottleneck", "Yes — supervisor is on every request path", "No — agents hand off directly"],
                ["Audit Trail", "Single, clean routing log", "Distributed — trace per agent"],
                ["New Agent", "Register with supervisor", "Define handoff tools to/from existing agents"],
                ["Best for", "Compliance, auditability, strict routing control", "Customer support, research, unpredictable flows"],
              ].map(([aspect, sup, swarm], i) => (
                <tr key={i} className="border-b border-slate-200 dark:border-slate-800">
                  <td className="p-3 font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">{aspect}</td>
                  <td className="p-3 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">{sup}</td>
                  <td className="p-3 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">{swarm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 2: Handoff Mechanism */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <ArrowRight className="w-5 h-5 text-cyan-500" />
          2. The Handoff Tool — How Agents Transfer Control
        </h2>
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 space-y-3">
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Every agent in a Swarm is given <em>handoff tools</em> — not data tools, but control-transfer tools. When the Billing Agent calls <code>transfer_to_language_agent()</code>, it passes the entire conversation context to the Language Agent and steps aside. No supervisor involved.
          </p>
          <div className="flex items-center gap-2 text-xs font-mono flex-wrap">
            <span className="px-2 py-1 rounded bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300">Triage Agent</span>
            <ArrowRight className="w-4 h-4 text-slate-400" />
            <code className="text-[10px] text-slate-500">transfer_to_billing_agent(context)</code>
            <ArrowRight className="w-4 h-4 text-slate-400" />
            <span className="px-2 py-1 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">Billing Agent</span>
            <ArrowRight className="w-4 h-4 text-slate-400" />
            <code className="text-[10px] text-slate-500">transfer_to_language_agent(context)</code>
            <ArrowRight className="w-4 h-4 text-slate-400" />
            <span className="px-2 py-1 rounded bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300">Language Agent</span>
          </div>
        </div>
      </section>

      {/* Section 3: Code */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Code2 className="w-5 h-5 text-teal-500" />
          3. Swarm Pattern in LangGraph
        </h2>
        <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs border border-slate-800 overflow-x-auto">
          <pre>{`from langgraph_swarm import create_handoff_tool, create_swarm
from langgraph.prebuilt import create_react_agent
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(model="gpt-4o-mini")

# ── Define each agent with its tools + handoff tools ──
triage_agent = create_react_agent(
    llm,
    tools=[
        create_handoff_tool(agent_name="billing_agent"),
        create_handoff_tool(agent_name="language_agent"),
    ],
    prompt="You are a triage agent. Route billing questions to billing_agent, "
           "and language/translation requests to language_agent."
)

billing_agent = create_react_agent(
    llm,
    tools=[
        process_refund, lookup_order, check_payment_status,
        create_handoff_tool(agent_name="language_agent"),
    ],
    prompt="You are a billing specialist. Handle refunds and payment queries. "
           "If the user wants a response in another language, hand off to language_agent."
)

language_agent = create_react_agent(
    llm,
    tools=[translate_text, detect_language],
    prompt="You are a language specialist. Translate and localize any response."
)

# ── Swarm — no central supervisor ─────────────────
app = create_swarm(
    agents=[triage_agent, billing_agent, language_agent],
    default_active_agent="triage_agent"  # entry point
).compile()

result = app.invoke({
    "messages": [("user", "I need a refund for #12345 — and reply in Spanish")]
})`}</pre>
        </div>
      </section>

      {/* Interactive Studio */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-teal-500" />
            4. Interactive Swarm Studio
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Live Handoff Trace</span>
        </div>
        <SwarmAgentStudio />
      </section>

      {/* Golden Rule */}
      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 space-y-2">
        <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-semibold text-sm">
          <Lightbulb className="w-4 h-4 text-teal-500 shrink-0" />
          Choose Swarm When Routing Logic Lives in the Domain
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          If the <em>agent itself</em> is the best judge of when to hand off — because it understands the domain deeply enough to know its own limits — Swarm is the right pattern. If routing decisions need to be auditable, testable, and independently updatable, use Supervisor. In practice: customer support and creative workflows → Swarm. Financial compliance and healthcare → Supervisor.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />Key Takeaways
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { title: "Handoff Tools = Control Transfer", body: "Calling a handoff tool passes both control AND the full conversation context to the receiving agent. It's not data passing — it's a baton relay." },
            { title: "No Single Point of Failure", body: "If one Swarm agent is slow or degraded, others continue. There's no supervisor whose failure breaks everything." },
            { title: "Agent Prompts Define Handoff Logic", body: "Each agent's system prompt tells it when to hand off and to whom. This is where routing logic lives — in the agent, not in a central router." },
          ].map((item) => (
            <div key={item.title} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
              <h3 className="text-xs font-bold text-teal-700 dark:text-teal-400">{item.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4"><Module4_3Quiz /></section>
    </div>
  );
}
