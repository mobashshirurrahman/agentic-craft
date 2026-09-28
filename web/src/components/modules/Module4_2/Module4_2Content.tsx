"use client";

import React from "react";
import { Users, Code2, Layers, Sparkles, Lightbulb, CheckCircle2, GitBranch } from "lucide-react";
import SupervisorAgentStudio from "./SupervisorAgentStudio";
import Module4_2Quiz from "./Module4_2Quiz";

export default function Module4_2Content() {
  return (
    <div className="space-y-10">
      {/* Hero Banner */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-amber-500/10 via-yellow-500/5 to-slate-50 dark:to-slate-950 p-6 md:p-8 transition-colors">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30">
              Module 4.2 • Production, Scaling & Optimization
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">~15 min hands-on</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Building Multi-Agent Supervisor Systems
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            A single agent with 20 tools is like asking one employee to be your accountant, lawyer, marketer, and engineer simultaneously. They&apos;ll drop the ball — not because they&apos;re not smart, but because <strong>context switching is cognitively expensive</strong>, even for LLMs. The Supervisor pattern solves this the same way every well-run company does: a manager who routes work to the right specialist.
          </p>
        </div>
      </div>

      {/* Section 1: The Problem */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-amber-500" />
          1. Why Single Agents Break Under Load
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-950/20 space-y-2">
            <span className="text-xs font-mono font-bold text-red-600 dark:text-red-400 uppercase">❌ Single Agent: 20 Tools</span>
            <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1.5 leading-relaxed">
              <li>• GPT-4 starts making wrong tool choices above ~15 tools <em>(Masterman et al., 2024)</em></li>
              <li>• All tools compete for attention in the same context window</li>
              <li>• One agent failure halts the entire workflow</li>
              <li>• Impossible to test tools in isolation</li>
            </ul>
          </div>
          <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/40 bg-emerald-50 dark:bg-emerald-950/20 space-y-2">
            <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase">✅ Supervisor + 3 Specialists</span>
            <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1.5 leading-relaxed">
              <li>• Each specialist has 4–7 tools — well within reliable range</li>
              <li>• Supervisor only routes — zero domain knowledge required</li>
              <li>• Individual agents can be tested, upgraded, and swapped</li>
              <li>• Clear audit trail: supervisor log shows every routing decision</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 2: Architecture */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <GitBranch className="w-5 h-5 text-blue-500" />
          2. How the Supervisor Pattern Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          {[
            { step: "1", label: "User sends task", detail: "to Supervisor LLM", color: "slate" },
            { step: "2", label: "Supervisor routes", detail: "to the right sub-agent", color: "amber" },
            { step: "3", label: "Sub-agent executes", detail: "with its specialist tools", color: "blue" },
            { step: "4", label: "Result returns", detail: "to Supervisor", color: "amber" },
            { step: "5", label: "Supervisor decides", detail: "next step or final answer", color: "emerald" },
            { step: "→", label: "Repeat until", detail: "task is complete", color: "slate" },
          ].map((item, i) => (
            <div key={i} className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-0.5">
              <span className="text-lg font-bold text-slate-300 dark:text-slate-700">{item.step}</span>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{item.label}</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Code */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Code2 className="w-5 h-5 text-teal-500" />
          3. Supervisor Pattern in LangGraph
        </h2>
        <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs border border-slate-800 overflow-x-auto">
          <pre>{`from langgraph_supervisor import create_supervisor
from langgraph.prebuilt import create_react_agent
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(model="gpt-4o-mini")

# ── Specialist Sub-Agents ─────────────────────────
research_agent = create_react_agent(
    llm,
    tools=[web_search, arxiv_search, wikipedia_lookup],
    prompt="You are a research specialist. Search, retrieve, and return factual data only."
)

analysis_agent = create_react_agent(
    llm,
    tools=[compute_statistics, create_chart, compare_values],
    prompt="You are an analysis specialist. Compute, compare, and interpret data."
)

sentiment_agent = create_react_agent(
    llm,
    tools=[analyze_sentiment, scan_news, summarize_opinions],
    prompt="You are a sentiment specialist. Assess tone, opinions, and analyst views."
)

# ── Supervisor — routes, never executes domain work ─
supervisor = create_supervisor(
    agents=[research_agent, analysis_agent, sentiment_agent],
    model=llm,
    prompt=(
        "You coordinate specialist agents. Route each sub-task to the right agent. "
        "Only return a final answer once all required sub-tasks are complete."
    )
)

app = supervisor.compile()

# ── Invoke ───────────────────────────────────────
result = app.invoke({
    "messages": [("user", "Analyze Tesla Q4 2024: revenue, margins, and analyst sentiment")]
})`}</pre>
        </div>
      </section>

      {/* Interactive Studio */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            4. Interactive Supervisor Agent Studio
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Live Routing Trace</span>
        </div>
        <SupervisorAgentStudio />
      </section>

      {/* Golden Rule */}
      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 space-y-2">
        <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-semibold text-sm">
          <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
          The Split Test: When Does a Single Agent Become a Supervisor System?
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          If your agent has more than 10–12 tools, or if the same agent is being asked to do things that require completely different expertise (research AND financial modeling AND UI generation), those are the signals to split. Start with a single agent, add tools until you see reliability degrade, then introduce the supervisor. Never over-engineer upfront.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />Key Takeaways
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { title: "Supervisor = Router Only", body: "The supervisor LLM never touches domain tools. It only reads the task and writes a routing decision. This keeps it fast and reliable." },
            { title: "Centralized Audit Trail", body: "Every routing decision is logged in one place. In regulated industries (finance, healthcare), this auditability is the main reason to choose Supervisor over Swarm." },
            { title: "Nested Supervisors Scale", body: "For very large systems: a top-level supervisor routes to domain supervisors (Finance, Research, Operations), each managing their own specialists." },
          ].map((item) => (
            <div key={item.title} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
              <h3 className="text-xs font-bold text-amber-700 dark:text-amber-400">{item.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4"><Module4_2Quiz /></section>
    </div>
  );
}
