"use client";

import React, { useState } from "react";
import {
  Play,
  RotateCcw,
  Sparkles,
  Terminal,
  Settings,
  Wrench,
  CheckCircle2,
  Code2,
  Cpu,
} from "lucide-react";

interface MockTool {
  name: string;
  signature: string;
  description: string;
  enabled: boolean;
}

const DEFAULT_TOOLS: MockTool[] = [
  {
    name: "get_weather",
    signature: "get_weather(city: str) -> str",
    description: "Fetches live temperature and forecast for a given city.",
    enabled: true,
  },
  {
    name: "calculate",
    signature: "calculate(expression: str) -> float",
    description: "Evaluates mathematical expressions safely.",
    enabled: true,
  },
  {
    name: "search_db",
    signature: "search_db(query: str) -> list[str]",
    description: "Searches internal customer records by keyword.",
    enabled: false,
  },
];

const PRESET_QUERIES = [
  "What is the weather in Tokyo, and what is 45 * 18?",
  "Calculate the compound interest for 1000 * (1 + 0.05)^3",
  "What is the weather in Paris right now?",
];

export default function PrebuiltAgentPlayground() {
  const [query, setQuery] = useState<string>(PRESET_QUERIES[0]);
  const [temperature, setTemperature] = useState<number>(0.2);
  const [model, setModel] = useState<string>("gpt-4o-mini");
  const [tools, setTools] = useState<MockTool[]>(DEFAULT_TOOLS);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [executionTrace, setExecutionTrace] = useState<{
    thought: string;
    toolCall: string;
    observation: string;
    finalAnswer: string;
  } | null>(null);

  const toggleTool = (name: string) => {
    setTools((prev) =>
      prev.map((t) => (t.name === name ? { ...t, enabled: !t.enabled } : t))
    );
  };

  const runAgent = () => {
    setIsExecuting(true);
    setExecutionTrace(null);

    setTimeout(() => {
      setIsExecuting(false);
      if (query.includes("Tokyo") || query.includes("weather")) {
        setExecutionTrace({
          thought: `User asks for weather in Tokyo and calculation (45 * 18). Both 'get_weather' and 'calculate' tools are enabled. I will first query the weather, then evaluate the expression.`,
          toolCall: `get_weather(city="Tokyo")\ncalculate(expression="45 * 18")`,
          observation: `get_weather -> "Tokyo: 19°C, Clear skies, Humidity 62%"\ncalculate -> 810.0`,
          finalAnswer: `The current weather in Tokyo is 19°C with clear skies. Also, 45 * 18 = 810.`,
        });
      } else {
        setExecutionTrace({
          thought: `Task requires numeric calculation. Invoking 'calculate' tool with expression: "${query}".`,
          toolCall: `calculate(expression="1000 * (1 + 0.05)**3")`,
          observation: `calculate -> 1157.625`,
          finalAnswer: `The calculated value is 1,157.63.`,
        });
      }
    }, 600);
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm overflow-hidden transition-colors">
      {/* Header */}
      <div className="p-5 md:p-6 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-sky-500/10 via-blue-500/5 to-transparent">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                Pre-Built Agent Interactive Sandbox
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-700 dark:text-sky-300 border border-sky-500/30">
                  LangGraph create_agent
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Observe how model config, tool bindings, and user queries produce an automated ReAct execution trace
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setTools(DEFAULT_TOOLS);
              setTemperature(0.2);
              setQuery(PRESET_QUERIES[0]);
              setExecutionTrace(null);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-xs font-mono text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>
      </div>

      {/* Main Workbench Body */}
      <div className="p-5 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Configuration & Prompt (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold flex items-center gap-1.5 pb-2 border-b border-slate-200 dark:border-slate-800">
            <Settings className="w-3.5 h-3.5 text-sky-500" />
            1. Agent Configuration
          </div>

          {/* Model Selector & Temperature */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-1">
                LLM Engine
              </label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full text-xs font-mono p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200"
              >
                <option value="gpt-4o-mini">gpt-4o-mini</option>
                <option value="claude-3-5-haiku">claude-3-5-haiku</option>
                <option value="gemini-1.5-flash">gemini-1.5-flash</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between items-center text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-1">
                <span>Temperature</span>
                <span className="font-bold text-sky-600 dark:text-sky-400">{temperature}</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="1.0"
                step="0.1"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-full accent-sky-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Tool Binding Checklist */}
          <div>
            <label className="block text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-1.5 flex items-center gap-1.5">
              <Wrench className="w-3 h-3 text-sky-500" />
              Bind Available Tools
            </label>
            <div className="space-y-2">
              {tools.map((t) => (
                <button
                  key={t.name}
                  onClick={() => toggleTool(t.name)}
                  className={`w-full p-2.5 rounded-lg border text-left text-xs transition flex items-start gap-2.5 ${
                    t.enabled
                      ? "border-sky-500/40 bg-sky-500/10 text-slate-900 dark:text-white"
                      : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-slate-400 opacity-60"
                  }`}
                >
                  <div className="mt-0.5">
                    {t.enabled ? (
                      <CheckCircle2 className="w-4 h-4 text-sky-500" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-400" />
                    )}
                  </div>
                  <div>
                    <div className="font-mono font-bold text-[11px]">{t.signature}</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">
                      {t.description}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Prompt Input */}
          <div>
            <label className="block text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-1">
              User Goal / Query
            </label>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full text-xs font-mono p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-sky-500"
            />
            {/* Quick preset chips */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {PRESET_QUERIES.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => setQuery(p)}
                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-sky-500"
                >
                  Preset {idx + 1}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={runAgent}
            disabled={isExecuting}
            className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-mono text-xs font-bold transition flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>{isExecuting ? "Executing ReAct Loop..." : "Run create_agent"}</span>
          </button>
        </div>

        {/* Right: Code Schema & Execution Trace (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-teal-500" />
              2. ReAct Execution Trace
            </span>
            <span className="text-[10px] font-mono text-sky-600 dark:text-sky-400">
              Live Loop Output
            </span>
          </div>

          {executionTrace ? (
            <div className="space-y-3 font-mono text-xs">
              {/* Thought */}
              <div className="p-3.5 rounded-xl border border-purple-500/30 bg-purple-500/10 text-purple-950 dark:text-purple-200">
                <div className="text-[10px] font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300 mb-1">
                  💭 Agent Thought
                </div>
                <p className="text-xs leading-relaxed font-sans">{executionTrace.thought}</p>
              </div>

              {/* Action / Tool */}
              <div className="p-3.5 rounded-xl border border-sky-500/30 bg-slate-900 text-slate-200">
                <div className="text-[10px] font-bold uppercase tracking-wider text-sky-400 mb-1.5 flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5" />
                  Tool Execution Call
                </div>
                <pre className="text-[11px] text-sky-300 overflow-x-auto whitespace-pre-wrap">
                  {executionTrace.toolCall}
                </pre>
              </div>

              {/* Observation */}
              <div className="p-3.5 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-950 dark:text-amber-200">
                <div className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300 mb-1">
                  👁️ Environment Observation
                </div>
                <pre className="text-[11px] font-sans leading-relaxed">
                  {executionTrace.observation}
                </pre>
              </div>

              {/* Final Answer */}
              <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-950 dark:text-emerald-200">
                <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 mb-1">
                  ✅ Final Answer
                </div>
                <p className="text-xs font-sans font-medium leading-relaxed">
                  {executionTrace.finalAnswer}
                </p>
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-xl border border-dashed border-slate-300 dark:border-slate-800 text-center text-slate-400 space-y-2">
              <Sparkles className="w-6 h-6 mx-auto text-sky-500/60" />
              <div className="text-xs font-mono">
                Click &ldquo;Run create_agent&rdquo; to execute the ReAct loop
              </div>
              <p className="text-[11px] text-slate-500 max-w-sm mx-auto">
                Under the hood, LangGraph coordinates the state graph: Model ➔ Tools ➔ Loop check.
              </p>
            </div>
          )}

          {/* Under the hood code snippet */}
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-mono text-[11px] overflow-x-auto">
            <span className="text-slate-500"># LangGraph / LangChain Implementation:</span>
            <pre className="text-sky-300 mt-1">{`from langgraph.prebuilt import create_react_agent
from langchain_openai import ChatOpenAI

model = ChatOpenAI(model="${model}", temperature=${temperature})
tools = [get_weather, calculate]
agent = create_react_agent(model, tools)
response = agent.invoke({"messages": [("user", "${query}")]})`}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
