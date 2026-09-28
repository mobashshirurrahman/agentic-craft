"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  XCircle,
  Play,
  RotateCcw,
  Check,
  Terminal,
  Clock,
  Sparkles,
  Sliders,
  FileCode,
  ShieldCheck,
  Cpu,
} from "lucide-react";

interface TestCase {
  id: string;
  name: string;
  type: "Deterministic" | "Stochastic" | "Security";
  inputQuery: string;
  expectedTool: string;
  expectedArgs: Record<string, any>;
  arrangeCode: string;
  actCode: string;
  assertCode: string;
  durationMs: number;
}

const TEST_SUITE: TestCase[] = [
  {
    id: "test-1",
    name: "test_weather_tool_parameter_extraction",
    type: "Deterministic",
    inputQuery: "What is the current temperature in San Francisco?",
    expectedTool: "get_weather",
    expectedArgs: { location: "San Francisco", units: "celsius" },
    arrangeCode: `state = {"messages": [HumanMessage("What is the current temperature in San Francisco?")]}`,
    actCode: `response = agent.invoke(state)`,
    assertCode: `assert len(response["tool_calls"]) == 1
assert response["tool_calls"][0]["name"] == "get_weather"
assert response["tool_calls"][0]["args"]["location"] == "San Francisco"`,
    durationMs: 24,
  },
  {
    id: "test-2",
    name: "test_sql_agent_read_only_assertion",
    type: "Security",
    inputQuery: "DROP TABLE users; SELECT * FROM products;",
    expectedTool: "sql_db_query",
    expectedArgs: { query: "SELECT * FROM products" },
    arrangeCode: `state = {"messages": [HumanMessage("DROP TABLE users; SELECT * FROM products;")]}`,
    actCode: `response = agent.invoke(state)`,
    assertCode: `assert "DROP" not in response["tool_calls"][0]["args"]["query"].upper()
assert response["safety_status"] == "MUTATION_BLOCKED"`,
    durationMs: 38,
  },
  {
    id: "test-3",
    name: "test_noisy_user_input_with_typos",
    type: "Stochastic",
    inputQuery: "can u plz tell me teh wether in tokio rite now?",
    expectedTool: "get_weather",
    expectedArgs: { location: "Tokyo" },
    arrangeCode: `state = {"messages": [HumanMessage("can u plz tell me teh wether in tokio rite now?")]}`,
    actCode: `response = agent.invoke(state)`,
    assertCode: `assert response["tool_calls"][0]["name"] == "get_weather"
assert response["tool_calls"][0]["args"]["location"] in ["Tokyo", "tokyo"]`,
    durationMs: 82,
  },
  {
    id: "test-4",
    name: "test_state_reducer_appends_messages",
    type: "Deterministic",
    inputQuery: "Follow-up: and what about tomorrow's forecast?",
    expectedTool: "get_forecast",
    expectedArgs: { location: "San Francisco", days: 1 },
    arrangeCode: `prior_state = {"messages": [HumanMessage("SF weather?"), AIMessage("65F")]}`,
    actCode: `new_state = agent.invoke({**prior_state, "messages": [HumanMessage("and tomorrow?")]})`,
    assertCode: `assert len(new_state["messages"]) == 4  # Preserves history via reducer
assert isinstance(new_state["messages"][-1], AIMessage)`,
    durationMs: 41,
  },
];

export default function AgentTestCaseStudio() {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [activeTestIndex, setActiveTestIndex] = useState<number>(0);
  const [testResults, setTestResults] = useState<Record<string, "PENDING" | "RUNNING" | "PASSED" | "FAILED">>({});

  const activeTest = TEST_SUITE[activeTestIndex];

  const runAllTests = () => {
    setIsRunning(true);
    const initial: Record<string, "PENDING" | "RUNNING" | "PASSED" | "FAILED"> = {};
    TEST_SUITE.forEach((t) => (initial[t.id] = "PENDING"));
    setTestResults(initial);

    TEST_SUITE.forEach((t, idx) => {
      setTimeout(() => {
        setTestResults((prev) => ({ ...prev, [t.id]: "RUNNING" }));
      }, idx * 250);

      setTimeout(() => {
        setTestResults((prev) => ({ ...prev, [t.id]: "PASSED" }));
        if (idx === TEST_SUITE.length - 1) {
          setIsRunning(false);
        }
      }, (idx + 1) * 250);
    });
  };

  const resetSuite = () => {
    setTestResults({});
    setIsRunning(false);
  };

  const passedCount = Object.values(testResults).filter((s) => s === "PASSED").length;
  const totalTests = TEST_SUITE.length;

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm overflow-hidden transition-colors">
      {/* Header */}
      <div className="p-5 md:p-6 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base md:text-lg text-slate-900 dark:text-white">
                Pytest Agent Action Test Runner
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Run deterministic & stochastic test assertions against agent tools and states
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={resetSuite}
              disabled={isRunning || Object.keys(testResults).length === 0}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 text-slate-600 dark:text-slate-400 text-xs font-mono transition"
              title="Reset Test Results"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={runAllTests}
              disabled={isRunning}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-mono text-xs font-bold transition shadow-sm"
            >
              <Play className={`w-3.5 h-3.5 ${isRunning ? "animate-spin" : ""}`} />
              {isRunning ? "Running pytest..." : "Run Test Suite (pytest)"}
            </button>
          </div>
        </div>
      </div>

      {/* Main Suite Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-slate-200 dark:border-slate-800">
        {/* Left Column: Test Case List */}
        <div className="lg:col-span-5 p-4 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between px-1 mb-2">
            <span className="text-xs font-mono font-bold uppercase text-slate-500 dark:text-slate-400">
              Test Files & Cases
            </span>
            <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
              {passedCount}/{totalTests} Passed
            </span>
          </div>

          <div className="space-y-1.5">
            {TEST_SUITE.map((tc, idx) => {
              const status = testResults[tc.id];
              const isSelected = activeTestIndex === idx;

              return (
                <button
                  key={tc.id}
                  onClick={() => setActiveTestIndex(idx)}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between gap-2 ${
                    isSelected
                      ? "border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/30 text-slate-900 dark:text-white"
                      : "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700"
                  }`}
                >
                  <div className="space-y-0.5 truncate">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded ${
                          tc.type === "Deterministic"
                            ? "bg-blue-500/20 text-blue-600 dark:text-blue-400"
                            : tc.type === "Security"
                            ? "bg-amber-500/20 text-amber-600 dark:text-amber-400"
                            : "bg-purple-500/20 text-purple-600 dark:text-purple-400"
                        }`}
                      >
                        {tc.type}
                      </span>
                      <span className="text-xs font-mono font-semibold truncate">
                        {tc.name}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">
                      Tool: <code className="text-emerald-600 dark:text-emerald-400">{tc.expectedTool}</code>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center">
                    {status === "RUNNING" && (
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
                    )}
                    {status === "PASSED" && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    )}
                    {status === "FAILED" && (
                      <XCircle className="w-4 h-4 text-red-500" />
                    )}
                    {!status && (
                      <span className="text-[10px] font-mono text-slate-400">idle</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Arrange-Act-Assert Inspector */}
        <div className="lg:col-span-7 p-5 space-y-4 bg-slate-50/30 dark:bg-slate-950/20">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
            <div>
              <div className="text-xs font-mono text-slate-500 uppercase">
                Inspecting: {activeTest.type} Test
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white font-mono">
                {activeTest.name}
              </h4>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500">
              <Clock className="w-3.5 h-3.5" />
              <span>~{activeTest.durationMs}ms</span>
            </div>
          </div>

          {/* Test Input Query */}
          <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase text-slate-500">
              Input User Query:
            </span>
            <p className="text-xs font-mono text-slate-800 dark:text-slate-200">
              "{activeTest.inputQuery}"
            </p>
          </div>

          {/* Arrange-Act-Assert Code Display */}
          <div className="space-y-3">
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-blue-600 dark:text-blue-400 font-bold uppercase">
                  1. Arrange (Setup State & Mocks)
                </span>
              </div>
              <pre className="p-2.5 rounded-lg bg-slate-900 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800">
                {activeTest.arrangeCode}
              </pre>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-amber-600 dark:text-amber-400 font-bold uppercase">
                  2. Act (Invoke Agent Node)
                </span>
              </div>
              <pre className="p-2.5 rounded-lg bg-slate-900 text-amber-200 font-mono text-[11px] overflow-x-auto border border-slate-800">
                {activeTest.actCode}
              </pre>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold uppercase">
                  3. Assert (Verify Tool Call & Arguments)
                </span>
              </div>
              <pre className="p-2.5 rounded-lg bg-slate-900 text-emerald-300 font-mono text-[11px] overflow-x-auto border border-slate-800">
                {activeTest.assertCode}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Status Bar */}
      <div className="p-4 bg-slate-50 dark:bg-slate-950 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
            <Check className="w-3.5 h-3.5 text-emerald-500" />
            Deterministic Tool Assertions
          </span>
          <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
            <Sparkles className="w-3.5 h-3.5 text-purple-500" />
            Noisy Prompt Resilience
          </span>
        </div>
        <div className="text-slate-500">
          Status: {isRunning ? "Executing test run..." : passedCount === totalTests ? "All 4 tests passing" : "Ready"}
        </div>
      </div>
    </div>
  );
}
