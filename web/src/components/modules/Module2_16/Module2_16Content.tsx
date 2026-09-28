"use client";

import React from "react";
import {
  Terminal,
  CheckCircle2,
  AlertTriangle,
  Code2,
  Layers,
  Sparkles,
  Cpu,
  FileCheck2,
} from "lucide-react";
import AgentTestCaseStudio from "./AgentTestCaseStudio";
import Module2_16Quiz from "./Module2_16Quiz";

export default function Module2_16Content() {
  return (
    <div className="space-y-10">
      {/* Hero Banner */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-slate-50 dark:to-slate-950 p-6 md:p-8 relative overflow-hidden transition-colors">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
              Module 2.16 • Core Implementation
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              ~20 min hands-on
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Writing Test Cases for Agent Actions
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Traditional software tests assert strict equality: <code>assert add(2, 2) == 4</code>. Agents combine <strong>deterministic components</strong> (isolated tools, state reducers, Pydantic schemas) with <strong>stochastic reasoning</strong>. Effective test suites verify tool selection and parameter extraction under real-world conditions.
          </p>
        </div>
      </div>

      {/* Section 1: The Dual-Testing Paradigm */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-emerald-500" />
          1. The Dual-Testing Paradigm
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase flex items-center gap-1.5">
              ⚙️ Deterministic Testing (Exact Assertions)
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Verify pure Python functions in isolation: tool argument schemas, database queries, API mocking, and LangGraph state reducers (<code>Annotated[list, operator.add]</code>).
            </p>
            <div className="p-2 rounded bg-slate-900 text-blue-300 font-mono text-[11px]">
              assert len(state["messages"]) == 3
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400 uppercase flex items-center gap-1.5">
              🧠 Stochastic Testing (Action Verification)
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Verify that the LLM reasons correctly: Did it pick the right tool? Were arguments extracted cleanly? Did it recover from simulated 404 tool failures?
            </p>
            <div className="p-2 rounded bg-slate-900 text-purple-300 font-mono text-[11px]">
              assert tool_calls[0]["name"] == "search_db"
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Arrange-Act-Assert Pattern for Agents */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Code2 className="w-5 h-5 text-teal-500" />
          2. The Arrange-Act-Assert (AAA) Pattern in Pytest
        </h2>
        <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs border border-slate-800 overflow-x-auto">
          <pre>{`import pytest
from langchain_core.messages import HumanMessage

def test_agent_extracts_correct_weather_parameters(mock_weather_agent):
    # 1. Arrange: Setup realistic input state
    input_state = {
        "messages": [HumanMessage(content="What's the weather in Tokyo for tomorrow?")]
    }

    # 2. Act: Invoke the agent graph
    result_state = mock_weather_agent.invoke(input_state)

    # 3. Assert: 4 Critical Checkpoints
    tool_calls = result_state["messages"][-1].tool_calls
    assert len(tool_calls) == 1, "Agent should trigger exactly one tool"
    assert tool_calls[0]["name"] == "get_weather", "Incorrect tool chosen"
    assert tool_calls[0]["args"]["location"].lower() == "tokyo"
    assert tool_calls[0]["args"].get("days") == 1`}</pre>
        </div>
      </section>

      {/* Interactive Studio */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-500" />
            3. Interactive Pytest Suite Runner
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Live AAA Inspector
          </span>
        </div>
        <AgentTestCaseStudio />
      </section>

      {/* Section 4: Common Pitfall Card */}
      <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-900/40 bg-amber-50/50 dark:bg-amber-950/20 space-y-2">
        <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-semibold text-sm">
          <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
          Production Pitfall: Never Test With Clean Inputs Only
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          In staging, developers write pristine queries like <em>"Please fetch the current price of AAPL"</em>. Real users send <em>"aapl price rn pls"</em>, compound questions, and typos. Your test suite must include noisy, incomplete, and adversarial inputs to guarantee production robustness.
        </p>
      </div>

      {/* Quiz */}
      <section className="space-y-4">
        <Module2_16Quiz />
      </section>
    </div>
  );
}
