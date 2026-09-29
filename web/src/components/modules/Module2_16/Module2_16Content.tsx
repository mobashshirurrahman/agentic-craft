"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target, Check, ArrowRight, Terminal, CheckCircle2, Layers,
  AlertTriangle, Sparkles, HelpCircle, Copy, CheckCheck,
  Play, RotateCcw, FileText, XCircle, Cpu, Zap,
} from "lucide-react";
import AgentTestCaseStudio from "./AgentTestCaseStudio";
import Module2_16Quiz from "./Module2_16Quiz";

export default function Module2_16Content() {
  const [selectedParadigm, setSelectedParadigm] = useState<string>("deterministic");
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [activeCodeTab, setActiveCodeTab] = useState<"code" | "output">("code");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);
  const [testResult, setTestResult] = useState<"pass" | "fail" | null>(null);

  const paradigms = [
    {
      id: "deterministic",
      title: "⚙️ Deterministic Testing",
      tagline: "Exact Assertions",
      desc: "Test pure Python functions in isolation: tool schemas, state reducers, Pydantic validators, database queries. These produce identical outputs every run — assert exactly.",
      icon: CheckCircle2,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-500/10",
      border: "border-blue-200 dark:border-blue-500/30",
      badge: "assert x == y",
      codeSnippet: `# DETERMINISTIC: Exact assertions on pure functions & state
import pytest
from langchain_core.messages import HumanMessage, AIMessage

def test_add_messages_reducer_appends_correctly():
    """State reducer must APPEND, not overwrite, messages"""
    from langgraph.graph.message import add_messages
    
    # Arrange: Initial state with existing messages
    existing = [HumanMessage("Hello"), AIMessage("Hi there!")]
    new_messages = [HumanMessage("What is RAG?")]
    
    # Act: Apply reducer
    result = add_messages(existing, new_messages)
    
    # Assert: Deterministic — must have exactly 3 messages
    assert len(result) == 3, "Reducer should append, not replace"
    assert result[-1].content == "What is RAG?"

def test_pydantic_schema_rejects_invalid_input():
    """Schema validation must catch bad data before LLM call"""
    from pydantic import ValidationError
    
    with pytest.raises(ValidationError) as exc_info:
        AgentInput(query="", max_tokens=-1)  # Both fields invalid
    
    errors = exc_info.value.errors()
    assert len(errors) == 2  # Exactly 2 validation failures`,
    },
    {
      id: "stochastic",
      title: "🧠 Stochastic Testing",
      tagline: "Action Verification",
      desc: "Verify that the LLM reasons correctly: Did it select the right tool? Were arguments extracted cleanly? Did it recover from simulated tool failures? Use behavioral assertions, not string equality.",
      icon: Cpu,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-500/10",
      border: "border-purple-200 dark:border-purple-500/30",
      badge: "assert tool == 'X'",
      codeSnippet: `# STOCHASTIC: Behavioral assertions on LLM reasoning
import pytest
from langchain_core.messages import HumanMessage

def test_agent_selects_weather_tool_for_forecast_query(weather_agent):
    """Agent must pick get_weather tool for location-based queries"""
    # Arrange: Realistic user input
    state = {"messages": [HumanMessage(content="What's the weather in Tokyo for tomorrow?")]}
    
    # Act: Invoke agent
    result = weather_agent.invoke(state)
    
    # Assert: BEHAVIORAL checks — not string equality of LLM text!
    last_message = result["messages"][-1]
    tool_calls = last_message.tool_calls
    
    assert len(tool_calls) == 1, "Should call exactly one tool"
    assert tool_calls[0]["name"] == "get_weather", f"Wrong tool: {tool_calls[0]['name']}"
    assert tool_calls[0]["args"].get("location", "").lower() == "tokyo"
    assert tool_calls[0]["args"].get("days") == 1  # "tomorrow" = 1 day ahead`,
    },
    {
      id: "aaa",
      title: "🔁 Arrange-Act-Assert",
      tagline: "The AAA Pattern",
      desc: "The universal structure for agent test cases: Arrange (build state), Act (invoke agent), Assert (check 4 behavioral checkpoints: tool name, args, count, error recovery).",
      icon: Layers,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      border: "border-amber-200 dark:border-amber-500/30",
      badge: "Universal Pattern",
      codeSnippet: `# THE AAA PATTERN for agent tests — 3 mandatory phases
import pytest

@pytest.fixture
def stock_agent():
    """Shared agent fixture — built once, reused across test functions"""
    return build_research_agent(tools=[get_stock_price, search_news])

def test_agent_fetches_stock_price_on_ticker_query(stock_agent):
    
    # ─── ARRANGE ───────────────────────────────────────────────
    # Build realistic agent state — use actual message types!
    state = {
        "messages": [HumanMessage(content="What is AAPL's current stock price?")]
    }
    
    # ─── ACT ────────────────────────────────────────────────────
    # Invoke the agent graph — exactly as production would
    result_state = stock_agent.invoke(state)
    
    # ─── ASSERT ─────────────────────────────────────────────────
    # Checkpoint 1: Did agent use a tool at all?
    tool_calls = result_state["messages"][-1].tool_calls
    assert len(tool_calls) >= 1, "Agent should have called a tool"
    
    # Checkpoint 2: Correct tool selected?
    assert tool_calls[0]["name"] == "get_stock_price"
    
    # Checkpoint 3: Arguments extracted cleanly?
    assert tool_calls[0]["args"]["ticker"].upper() == "AAPL"`,
    },
    {
      id: "mock",
      title: "🎭 Mocking & Fixtures",
      tagline: "Isolation & Speed",
      desc: "Mock external APIs, databases, and LLM responses to make tests deterministic, fast (no real API calls), and runnable offline. pytest fixtures share setup across test functions.",
      icon: Zap,
      color: "text-teal-600 dark:text-teal-400",
      bg: "bg-teal-50 dark:bg-teal-500/10",
      border: "border-teal-200 dark:border-teal-500/30",
      badge: "pytest Fixtures",
      codeSnippet: `# MOCKING: Isolate agents from external dependencies
import pytest
from unittest.mock import AsyncMock, patch
from langchain_core.messages import AIMessage

@pytest.fixture
def mock_llm_response():
    """Fixture: mocked LLM that always calls get_weather"""
    mock_response = AIMessage(
        content="",
        tool_calls=[{
            "name": "get_weather",
            "args": {"location": "tokyo", "days": 1},
            "id": "call_abc123",
        }]
    )
    with patch("langchain_openai.ChatOpenAI.invoke", return_value=mock_response):
        yield mock_response

def test_agent_handles_tool_404_gracefully(weather_agent, mock_llm_response):
    """Agent must recover when tool returns no data"""
    with patch("tools.get_weather", return_value=None):  # Simulate empty result
        state = {"messages": [HumanMessage("Weather in Tokyo?")]}
        result = weather_agent.invoke(state)
        # Agent should have a fallback response, not crash
        assert result["messages"][-1].content != ""`,
    },
  ];

  const currentParadigm = paradigms.find((p) => p.id === selectedParadigm) || paradigms[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentParadigm.codeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setActiveCodeTab("output");
    setTestResult(null);
    setSimStep(1);
    setTimeout(() => setSimStep(2), 700);
    setTimeout(() => setSimStep(3), 1400);
    const willPass = selectedParadigm !== "stochastic" || Math.random() > 0.2;
    setTimeout(() => {
      setSimStep(4);
      setTestResult(willPass ? "pass" : "fail");
      setIsSimulating(false);
    }, 2100);
  };

  return (
    <div className="space-y-10 max-w-5xl mx-auto pb-16">
      {/* 🎯 OBJECTIVE BANNER */}
      <section className="rounded-2xl border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50/60 dark:bg-emerald-500/5 p-4 sm:p-6 shadow-sm">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-emerald-600 text-white shrink-0 shadow-sm mt-0.5"><Target className="w-5 h-5" /></div>
          <div className="space-y-2 flex-1">
            <h2 className="text-sm font-mono uppercase tracking-wider text-emerald-800 dark:text-emerald-400 font-bold">🎯 By the end of this module, you will:</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              {[
                "Distinguish deterministic tests (exact assertions) from stochastic tests (behavioral checks)",
                "Apply the Arrange-Act-Assert pattern to write clean, reproducible agent test cases",
                "Mock LLMs and external APIs with pytest fixtures for fast, offline testing",
                "Write 4 critical behavioral checkpoints: tool name, args, count, and error recovery",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: 4 TESTING PARADIGM CARDS */}
      <section className="space-y-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-mono font-semibold mb-2">
            <Terminal className="w-3.5 h-3.5" /><span>Agent Testing • Pytest Patterns</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Writing Test Cases for Agent Actions</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Traditional tests assert strict equality. Agent tests mix <strong>deterministic components</strong> (state reducers, schemas, tools) with <strong>stochastic LLM reasoning</strong>. Effective suites verify tool selection and parameter extraction under real-world conditions.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {paradigms.map((par) => {
            const Icon = par.icon;
            const isSelected = selectedParadigm === par.id;
            return (
              <button key={par.id} onClick={() => setSelectedParadigm(par.id)}
                className={`p-3.5 sm:p-4 rounded-xl border text-left transition-all flex flex-col justify-between min-h-[145px] sm:min-h-[160px] active:scale-95 cursor-pointer ${isSelected ? "border-emerald-500 bg-white dark:bg-slate-900 shadow-md ring-2 ring-emerald-500/20" : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700"}`}>
                <div className="space-y-2">
                  <div className={`inline-flex p-1.5 rounded-lg ${par.bg} border ${par.border}`}><Icon className={`w-4 h-4 ${par.color}`} /></div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">{par.title}</div>
                    <div className={`text-[10px] font-mono ${par.color} mt-0.5`}>{par.tagline}</div>
                  </div>
                </div>
                <div className="mt-2 space-y-1.5">
                  <p className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{par.desc}</p>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${par.bg} ${par.color} border ${par.border}`}>{par.badge}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* CODE INSPECTOR */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`inline-flex p-1.5 rounded-lg ${currentParadigm.bg} border ${currentParadigm.border}`}><currentParadigm.icon className={`w-4 h-4 ${currentParadigm.color}`} /></div>
              <span className="text-xs font-bold text-slate-900 dark:text-white">{currentParadigm.title}</span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${currentParadigm.bg} ${currentParadigm.color} border ${currentParadigm.border}`}>{currentParadigm.badge}</span>
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
                    {tab === "code" ? "Pytest Code" : "Test Runner"}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                {simStep > 0 && <button onClick={() => { setSimStep(0); setActiveCodeTab("code"); setTestResult(null); }} className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 cursor-pointer"><RotateCcw className="w-3 h-3" /> Reset</button>}
                <button onClick={handleRunSimulation} disabled={isSimulating}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono disabled:opacity-50 cursor-pointer">
                  <Play className="w-3 h-3" />{isSimulating ? "Running..." : "pytest"}
                </button>
              </div>
            </div>
            <div className="p-4 min-h-[140px] font-mono text-xs">
              {activeCodeTab === "code" ? (
                <pre className="text-slate-300 whitespace-pre-wrap leading-relaxed">{currentParadigm.codeSnippet}</pre>
              ) : (
                <div className="space-y-1.5 text-slate-300">
                  {simStep === 0 && <div className="text-slate-500 italic">Click &apos;pytest&apos; to simulate a test run...</div>}
                  {simStep >= 1 && <div className="text-slate-400">pytest -v --tb=short test_agent.py<br /><span className="text-slate-500">collecting tests...</span></div>}
                  {simStep >= 2 && <div className="text-slate-300">
                    <span className="text-slate-400">ARRANGE: Building agent state with HumanMessage...</span><br />
                    <span className="text-slate-400">ACT: Invoking agent graph...</span>
                  </div>}
                  {simStep >= 3 && <div className="text-slate-300">
                    <span className="text-slate-400">ASSERT checkpoint 1: tool_calls length = 1 ✔</span><br />
                    <span className="text-slate-400">ASSERT checkpoint 2: tool name validation...</span>
                  </div>}
                  {simStep >= 4 && testResult === "pass" && (
                    <div className="text-emerald-400 font-bold pt-2 border-t border-slate-800">
                      ✔ PASSED — 1 test in 2.34s<br />
                      <span className="text-emerald-300 font-normal">All 4 behavioral checkpoints passed</span>
                    </div>
                  )}
                  {simStep >= 4 && testResult === "fail" && (
                    <div className="text-rose-400 font-bold pt-2 border-t border-slate-800">
                      ✗ FAILED — AssertionError: tool_calls[0][&apos;name&apos;] == &apos;search_news&apos;, expected &apos;get_weather&apos;<br />
                      <span className="text-rose-300 font-normal text-[10px]">Stochastic test: LLM chose wrong tool — add few-shot examples to prompt</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: TEST PYRAMID */}
      <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">🔺 The Agent Test Pyramid</h3>
        </div>
        <div className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { layer: "Unit (70%)", color: "text-emerald-700 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10", border: "border-emerald-200 dark:border-emerald-500/30", detail: "Test tool functions, state reducers, schemas in isolation. Fast, cheap, deterministic. No LLM calls." },
            { layer: "Integration (20%)", color: "text-amber-700 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-500/10", border: "border-amber-200 dark:border-amber-500/30", detail: "Test agent graph with mocked LLMs. Verify routing, error handling, and tool dispatch logic." },
            { layer: "E2E (10%)", color: "text-purple-700 dark:text-purple-400", bg: "bg-purple-50 dark:bg-purple-500/10", border: "border-purple-200 dark:border-purple-500/30", detail: "Full agent run with real LLM calls. Cover critical user journeys only — expensive but catches real regressions." },
          ].map(({ layer, color, bg, border, detail }) => (
            <div key={layer} className={`p-4 rounded-xl border ${border} ${bg} space-y-2`}>
              <div className={`text-xs font-mono font-bold ${color}`}>{layer}</div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: TEST CASE STUDIO */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">🔬 Pytest Suite Runner</h3>
        <AgentTestCaseStudio />
      </section>

      {/* SECTION 4: NOTES */}
      <section className="space-y-3">
        <div className="p-4 rounded-xl border border-amber-300 dark:border-amber-500/30 bg-amber-50/90 dark:bg-amber-500/10 shadow-sm">
          <span className="font-['Caveat',cursive] text-base text-amber-950 dark:text-amber-200 block">✍️ Instructor Note: &quot;For stochastic LLM tests, run each test case 3–5 times and require it to pass ≥80% of runs. A test that occasionally fails due to model randomness is not a flaky test — it reveals a prompt that needs more few-shot examples to be reliable.&quot;</span>
        </div>
        <div className="p-4 rounded-xl border border-teal-200 dark:border-teal-500/30 bg-teal-50/90 dark:bg-teal-500/10 shadow-sm">
          <span className="font-['Caveat',cursive] text-base text-teal-950 dark:text-teal-200 block">📌 Core Rule: Always include noisy, incomplete, and adversarial inputs in your test suite. In staging, developers test &quot;Please fetch the stock price of AAPL&quot;. Real users send &quot;aapl price rn pls&quot;, compound questions, and typos. Your agent must handle real-world messiness, not lab-clean inputs.</span>
        </div>
      </section>

      {/* SECTION 5: TRAPS */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-500" /><span>Agent Testing Traps</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-500/30 bg-rose-50/50 dark:bg-rose-500/5 space-y-2">
            <span className="text-xs font-mono font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider block">TRAP #1: Asserting LLM Response Text</span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">Never assert that result[&apos;messages&apos;][-1].content == &quot;The weather in Tokyo is 22°C&quot;. LLM text is non-deterministic. Assert behavior: tool_calls[0][&apos;name&apos;] == &apos;get_weather&apos;. Test what the agent DID, not what it SAID.</p>
          </div>
          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-500/5 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">TRAP #2: Testing Clean Inputs Only</span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">Test suites filled only with pristine, well-formatted queries give false confidence. Add noisy inputs (&quot;aapl$$ price?&quot;), empty strings, extremely long queries, and compound questions. Production agents meet all of these — your test suite must too.</p>
          </div>
        </div>
      </section>

      {/* SECTION 6: KEY TAKEAWAYS */}
      <section className="rounded-xl border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-500/5 p-5 space-y-3">
        <h4 className="font-bold text-sm text-emerald-900 dark:text-emerald-300 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /><span>Key Takeaways</span>
        </h4>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          {[
            ["1.", "Dual Testing Strategy:", "Deterministic tests for all pure functions (reducers, schemas, tools) + stochastic behavioral tests for LLM reasoning. Together they give comprehensive agent coverage."],
            ["2.", "AAA Pattern for Every Agent Test:", "Arrange (build realistic state), Act (invoke graph), Assert (verify 4 behavioral checkpoints: tool selected, args extracted, count correct, error recovery). Never skip a phase."],
            ["3.", "Mock for Speed, E2E for Confidence:", "Run mocked integration tests on every commit (fast). Run real LLM E2E tests nightly or on release branches (slow, expensive). This balances development speed with production confidence."],
          ].map(([n, bold, rest]) => (
            <li key={n} className="flex items-start gap-2">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">{n}</span>
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
            <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"><HelpCircle className="w-5 h-5" /></div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">Concept Check: Agent Testing</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">{showQuiz ? "Click to collapse" : "Test your testing strategy intuition (3 questions)"}</p>
            </div>
          </div>
          <span className="text-xs font-mono font-semibold px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30">
            {showQuiz ? "Hide Quiz" : "Start Quiz"}
          </span>
        </button>
        <AnimatePresence>
          {showQuiz && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }}>
              <Module2_16Quiz />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* NEXT MODULE BRIDGE */}
      <section className="rounded-2xl border border-emerald-200 dark:border-emerald-500/30 bg-gradient-to-r from-emerald-50 via-white to-slate-50 dark:from-emerald-500/10 dark:via-slate-900 dark:to-slate-950 p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <div className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">Up Next • Module 2.17 (Capstone)</div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Measuring Agent Performance and Cost</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">The Level 2 capstone — track the 4 production telemetry pillars: TTFT, per-node latency waterfalls, token unit economics, and task completion rates.</p>
        </div>
        <Link href="/learn/level-2/module-2-17" className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-sm transition-all shrink-0 cursor-pointer">
          <span>Continue to Module 2.17</span><ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
