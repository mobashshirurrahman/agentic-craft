"use client";

import React from "react";
import {
  Cpu,
  Zap,
  Wrench,
  Sliders,
  CheckCircle2,
  ArrowRight,
  Code2,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";
import PrebuiltAgentPlayground from "./PrebuiltAgentPlayground";
import Module2_1Quiz from "./Module2_1Quiz";

export default function Module2_1Content() {
  return (
    <div className="space-y-10">
      {/* Hero Banner */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-sky-500/10 via-blue-500/5 to-slate-50 dark:to-slate-950 p-6 md:p-8 relative overflow-hidden transition-colors">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-sky-500/20 text-sky-700 dark:text-sky-300 border border-sky-500/30">
              Module 2.1 • Core Implementation
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              ~20 min hands-on
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Running Your First Pre-Built Agent
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Welcome to Level 2! In Level 1, we mastered the architecture. Now, we write Python code. A <strong>pre-built agent</strong> is the fastest way to get an autonomous ReAct loop running with minimal boilerplate.
          </p>
        </div>
      </div>

      {/* Concept 1: What is a Pre-Built Agent? */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Zap className="w-5 h-5 text-sky-500" />
          1. What is a Pre-Built Agent?
        </h2>
        <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Instead of manually managing state loops, message histories, and tool invocation dispatchers, modern frameworks provide agent builder functions (such as <code className="text-sky-600 dark:text-sky-400 font-mono">create_react_agent</code> in LangGraph / LangChain).
        </p>

        <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs border border-slate-800 overflow-x-auto">
          <div className="text-slate-400 text-[10px] pb-1.5 border-b border-slate-800 mb-2">
            # The 4-Line Pre-Built Agent Pattern
          </div>
          <pre>{`from langgraph.prebuilt import create_react_agent
from langchain_openai import ChatOpenAI

model = ChatOpenAI(model="gpt-4o-mini", temperature=0.0)
agent = create_react_agent(model=model, tools=[get_weather, calculate])

# Run the ReAct loop
response = agent.invoke({"messages": [("user", "What is 42 * 17?")]})`}</pre>
        </div>
      </section>

      {/* Concept 2: The Under-the-Hood ReAct Loop */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Cpu className="w-5 h-5 text-teal-500" />
          2. The ReAct Loop Under the Hood
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <span className="text-[11px] font-mono text-purple-600 dark:text-purple-400 font-bold uppercase">
              Phase 1
            </span>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-1">Perceive & Reason</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Agent inspects user input and reasons whether it needs to invoke an external tool.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <span className="text-[11px] font-mono text-sky-600 dark:text-sky-400 font-bold uppercase">
              Phase 2
            </span>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-1">Tool Dispatch</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              If tool needed, agent outputs a structured tool call. The runtime invokes the Python function.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold uppercase">
              Phase 3
            </span>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-1">Synthesize & Exit</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Observation fed back to LLM. Loop terminates once the task is solved.
            </p>
          </div>
        </div>
      </section>

      {/* Concept 3: Defining Type-Hinted Tools */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Wrench className="w-5 h-5 text-amber-500" />
          3. Defining Tools with Docstrings
        </h2>
        <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          The LLM never reads your Python source code. It only reads the <strong>JSON Schema</strong> automatically generated from your type hints and docstrings.
        </p>

        <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs border border-slate-800 overflow-x-auto">
          <pre>{`from langchain_core.tools import tool

@tool
def calculate(expression: str) -> float:
    """Evaluates mathematical expressions safely.
    
    Args:
        expression: A valid arithmetic string, e.g., '14 * 25 + 10'.
    """
    return eval(expression, {"__builtins__": None}, {})`}</pre>
        </div>
      </section>

      {/* Interactive Sandbox */}
      <section className="space-y-4">
        <PrebuiltAgentPlayground />
      </section>

      {/* Concept 4: Prototype vs Production Warning */}
      <section className="p-5 rounded-xl border border-amber-500/30 bg-amber-500/10 text-xs text-slate-700 dark:text-slate-300 space-y-2">
        <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
          <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          The Prototyping Trap
        </div>
        <p className="text-[11px] leading-relaxed">
          Pre-built agents are magnificent for validating an idea in 10 minutes. However, production applications require custom state schemas, rate limiting, human approval checkpoints, and observability graphs. Use pre-built agents to prototype fast, then graduate to custom LangGraph workflows!
        </p>
      </section>

      {/* Quiz */}
      <section className="space-y-4">
        <Module2_1Quiz />
      </section>

      {/* Next Step Callout */}
      <div className="p-4 rounded-xl border border-sky-500/30 bg-sky-500/10 text-xs font-mono text-slate-700 dark:text-slate-300 flex items-center justify-between">
        <span>Up Next: Module 2.2 — Structured Outputs with JSON & Pydantic</span>
        <ArrowRight className="w-4 h-4 text-sky-500" />
      </div>
    </div>
  );
}
