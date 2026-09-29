"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  Copy,
  Check,
  RotateCcw,
  Terminal,
  Code2,
  Cpu,
  Layers,
  Sparkles,
  CheckCircle2,
  Clock,
  Settings2,
} from "lucide-react";

interface LogEntry {
  id: string;
  type: "system" | "perceive" | "reason" | "act" | "observe" | "complete";
  text: string;
  timestamp: string;
}

const PYTHON_CODE_LINES = [
  { num: 1, text: '"""', type: "comment" },
  { num: 2, text: "Module 1.1: Anatomy of an AI Agent in Pure Python", type: "comment" },
  { num: 3, text: "Demonstrating the 4 Core Components:", type: "comment" },
  { num: 4, text: "1. Reasoning Engine (Cognitive brain)", type: "comment" },
  { num: 5, text: "2. Tools (External capabilities)", type: "comment" },
  { num: 6, text: "3. Memory (Context & state buffer)", type: "comment" },
  { num: 7, text: "4. Perception (User input & tool observations)", type: "comment" },
  { num: 8, text: '"""', type: "comment" },
  { num: 9, text: "", type: "plain" },
  { num: 10, text: "import json", type: "import" },
  { num: 11, text: "from typing import Dict, Any, List", type: "import" },
  { num: 12, text: "", type: "plain" },
  { num: 13, text: "# --- COMPONENT 2: TOOLS (Actuators) ---", type: "comment" },
  { num: 14, text: "def calculate_growth(revenue_2025: float, revenue_2026: float) -> str:", type: "func" },
  { num: 15, text: '    """Calculates percentage growth between two financial years."""', type: "comment" },
  { num: 16, text: "    growth = ((revenue_2026 - revenue_2025) / revenue_2025) * 100", type: "code" },
  { num: 17, text: '    return f"{growth:.2f}% YoY Growth"', type: "code" },
  { num: 18, text: "", type: "plain" },
  { num: 19, text: "def mock_financial_db(ticker: str) -> Dict[str, Any]:", type: "func" },
  { num: 20, text: '    """Simulates a database lookup for verified company earnings."""', type: "comment" },
  { num: 21, text: "    data = {", type: "code" },
  { num: 22, text: '        "TECH": {"2025": 12.0, "2026": 14.2, "unit": "Billion USD"},', type: "code" },
  { num: 23, text: '        "AUTO": {"2025": 8.5,  "2026": 9.1,  "unit": "Billion USD"}', type: "code" },
  { num: 24, text: "    }", type: "code" },
  { num: 25, text: '    return data.get(ticker.upper(), {"error": "Company ticker not found"})', type: "code" },
  { num: 26, text: "", type: "plain" },
  { num: 27, text: "TOOLS = {", type: "code" },
  { num: 28, text: '    "mock_financial_db": mock_financial_db,', type: "code" },
  { num: 29, text: '    "calculate_growth": calculate_growth', type: "code" },
  { num: 30, text: "}", type: "code" },
  { num: 31, text: "", type: "plain" },
  { num: 32, text: "# --- COMPONENT 3: MEMORY MECHANISM ---", type: "comment" },
  { num: 33, text: "class AgentMemory:", type: "class" },
  { num: 34, text: "    def __init__(self):", type: "func" },
  { num: 35, text: "        self.history: List[Dict[str, str]] = []", type: "code" },
  { num: 36, text: "", type: "plain" },
  { num: 37, text: "    def record(self, role: str, content: str):", type: "func" },
  { num: 38, text: '        self.history.append({"role": role, "content": content})', type: "code" },
  { num: 39, text: "", type: "plain" },
  { num: 40, text: "# --- COMPONENT 1 & 4: REASONING ENGINE & PERCEPTION-ACTION ---", type: "comment" },
  { num: 41, text: "class SimpleAIAgent:", type: "class" },
  { num: 42, text: "    def __init__(self, name: str):", type: "func" },
  { num: 43, text: "        self.name = name", type: "code" },
  { num: 44, text: "        self.memory = AgentMemory()", type: "code" },
  { num: 45, text: "", type: "plain" },
  { num: 46, text: "    def reason_and_act(self, user_goal: str) -> str:", type: "func" },
  { num: 47, text: '        # 1. Perception', type: "comment" },
  { num: 48, text: '        self.memory.record("user", user_goal)', type: "code" },
  { num: 49, text: "        ", type: "plain" },
  { num: 50, text: '        # 2. Reasoning & Tool Invocation', type: "comment" },
  { num: 51, text: '        tool_output = TOOLS["mock_financial_db"]("TECH")', type: "code" },
  { num: 52, text: '        self.memory.record("observation", json.dumps(tool_output))', type: "code" },
  { num: 53, text: "        ", type: "plain" },
  { num: 54, text: '        # 3. Second Reasoning Step & Math', type: "comment" },
  { num: 55, text: '        growth = TOOLS["calculate_growth"](tool_output["2025"], tool_output["2026"])', type: "code" },
  { num: 56, text: "        ", type: "plain" },
  { num: 57, text: '        # 4. Final Reflection & Output', type: "comment" },
  { num: 58, text: '        answer = f"TechCorp achieved {growth}."', type: "code" },
  { num: 59, text: '        self.memory.record("assistant", answer)', type: "code" },
  { num: 60, text: "        return answer", type: "code" },
];

export default function InteractiveCodeExecutor() {
  const [activeTab, setActiveTab] = useState<"code" | "terminal">("code");
  const [selectedTicker, setSelectedTicker] = useState<"TECH" | "AUTO">("TECH");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [copied, setCopied] = useState<boolean>(false);
  const [hasExecuted, setHasExecuted] = useState<boolean>(false);
  const [executionTime, setExecutionTime] = useState<number>(0);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll terminal on new logs
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  const runSimulation = () => {
    setIsRunning(true);
    setHasExecuted(true);
    setLogs([]);
    setActiveTab("terminal");

    const startTime = performance.now();
    const ticker = selectedTicker;
    const isTech = ticker === "TECH";
    const rev25 = isTech ? 12.0 : 8.5;
    const rev26 = isTech ? 14.2 : 9.1;
    const company = isTech ? "TechCorp" : "AutoDrive Inc";
    const growth = (((rev26 - rev25) / rev25) * 100).toFixed(2);

    const steps: { delay: number; log: LogEntry }[] = [
      {
        delay: 200,
        log: {
          id: "1",
          type: "system",
          text: `$ python basic_agent_anatomy.py --goal "Calculate YoY revenue for ${ticker}"`,
          timestamp: "0.00s",
        },
      },
      {
        delay: 500,
        log: {
          id: "2",
          type: "perceive",
          text: `🎯 [PERCEIVE] Ingested user goal: "Calculate YoY revenue growth for ${ticker}."`,
          timestamp: "0.05s",
        },
      },
      {
        delay: 1100,
        log: {
          id: "3",
          type: "reason",
          text: `🧠 [REASON] Analyzing intent. Missing live earnings for '${ticker}'. Deciding to invoke 'mock_financial_db' tool.`,
          timestamp: "0.12s",
        },
      },
      {
        delay: 1700,
        log: {
          id: "4",
          type: "act",
          text: `🛠️ [ACT] Calling registered tool: mock_financial_db(ticker="${ticker}")`,
          timestamp: "0.18s",
        },
      },
      {
        delay: 2300,
        log: {
          id: "5",
          type: "observe",
          text: `👁️ [OBSERVE] Database response returned: {"2025": ${rev25}, "2026": ${rev26}, "unit": "Billion USD"}. Context updated.`,
          timestamp: "0.22s",
        },
      },
      {
        delay: 2900,
        log: {
          id: "6",
          type: "reason",
          text: `🧠 [REASON] Got numbers (${rev25}B -> ${rev26}B). Need percentage calculation. Invoking 'calculate_growth' tool.`,
          timestamp: "0.28s",
        },
      },
      {
        delay: 3500,
        log: {
          id: "7",
          type: "act",
          text: `🛠️ [ACT] Calling tool: calculate_growth(${rev25}, ${rev26}) -> Result: "+${growth}% YoY Growth"`,
          timestamp: "0.33s",
        },
      },
      {
        delay: 4100,
        log: {
          id: "8",
          type: "complete",
          text: `✅ [GOAL COMPLETE] Final Agent Output: "${company} achieved ${growth}% YoY Growth, expanding revenue from $${rev25}B in 2025 to $${rev26}B in 2026."`,
          timestamp: "0.38s",
        },
      },
    ];

    steps.forEach(({ delay, log }, index) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, log]);
        if (index === steps.length - 1) {
          setIsRunning(false);
          setExecutionTime(Math.round(performance.now() - startTime));
        }
      }, delay);
    });
  };

  const handleCopy = () => {
    const raw = PYTHON_CODE_LINES.map((l) => l.text).join("\n");
    navigator.clipboard.writeText(raw);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-950 overflow-hidden shadow-xl transition-all">
      {/* IDE Top Navigation Bar */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-900 border-b border-slate-800 gap-2">
        {/* Left: Window Controls & Active File Tab */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <div className="hidden sm:flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>

          <div className="hidden sm:block h-3.5 w-[1px] bg-slate-800" />

          {/* Tab Selector */}
          <div className="flex items-center gap-0.5 sm:gap-1 bg-slate-950 rounded-lg p-0.5 text-xs font-mono border border-slate-800/80">
            <button
              onClick={() => setActiveTab("code")}
              className={`px-2 sm:px-2.5 py-1 rounded-md transition flex items-center gap-1 sm:gap-1.5 cursor-pointer text-[11px] sm:text-xs ${
                activeTab === "code"
                  ? "bg-slate-800 text-teal-300 font-bold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Code2 className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-teal-400" />
              <span>Python</span>
            </button>

            <button
              onClick={() => setActiveTab("terminal")}
              className={`px-2 sm:px-2.5 py-1 rounded-md transition flex items-center gap-1 sm:gap-1.5 cursor-pointer text-[11px] sm:text-xs ${
                activeTab === "terminal"
                  ? "bg-slate-800 text-sky-300 font-bold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Terminal className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-sky-400" />
              <span>Output</span>
              {hasExecuted && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
              )}
            </button>
          </div>
        </div>

        {/* Right: Parameter Controls & Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Target Company Parameter Selector */}
          <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded-lg px-1.5 sm:px-2 py-1 text-[10px] sm:text-[11px] font-mono">
            <span className="text-slate-400">Target:</span>
            <select
              value={selectedTicker}
              disabled={isRunning}
              onChange={(e) => setSelectedTicker(e.target.value as "TECH" | "AUTO")}
              className="bg-transparent text-teal-300 font-bold focus:outline-none cursor-pointer"
            >
              <option value="TECH" className="bg-slate-900 text-white">
                TECH
              </option>
              <option value="AUTO" className="bg-slate-900 text-white">
                AUTO
              </option>
            </select>
          </div>

          {/* Run Code Button */}
          <button
            onClick={runSimulation}
            disabled={isRunning}
            className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1 sm:gap-1.5 transition shadow-md cursor-pointer ${
              isRunning
                ? "bg-slate-800 text-slate-400 border border-slate-700 cursor-not-allowed"
                : "bg-gradient-to-r from-violet-500 to-indigo-600 text-white hover:from-violet-400 hover:to-indigo-500 shadow-violet-500/20 hover:scale-[1.02]"
            }`}
          >
            <Play className={`w-3.5 h-3.5 fill-current ${isRunning ? "animate-spin" : ""}`} />
            <span>{isRunning ? "Running..." : "Run"}</span>
          </button>
        </div>
      </div>

      {/* Main Content Area: Tabbed Full-Width View */}
      <div className="min-h-[320px] max-h-[420px] flex flex-col overflow-hidden">
        {/* CODE VIEW */}
        {activeTab === "code" && (
          <div className="relative flex-1 bg-slate-950 p-3 sm:p-4 font-mono text-xs overflow-y-auto max-h-[380px] scrollbar-thin">
            {/* Quick Copy Button */}
            <div className="sticky top-0 float-right -mt-0.5 -mr-0.5 z-10">
              <button
                onClick={handleCopy}
                className="px-2 py-1 rounded-lg bg-slate-850/90 hover:bg-slate-750 text-slate-300 border border-slate-750 text-[10px] font-mono flex items-center gap-1 backdrop-blur-xs transition shadow-xs active:scale-95 cursor-pointer"
                title="Copy Python Code"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <div className="space-y-0.5 select-text clear-both sm:clear-none">
              {PYTHON_CODE_LINES.map((line) => {
                let textClass = "text-slate-300";
                if (line.type === "comment") textClass = "text-slate-500 italic";
                if (line.type === "import") textClass = "text-violet-400 font-semibold";
                if (line.type === "func") textClass = "text-sky-300 font-semibold";
                if (line.type === "class") textClass = "text-amber-300 font-bold";

                return (
                  <div key={line.num} className="flex items-start hover:bg-slate-900/50 rounded px-1 group">
                    <span className="w-6 shrink-0 text-slate-600 select-none text-[11px] text-right pr-2 font-mono group-hover:text-slate-400">
                      {line.num}
                    </span>
                    <span className={`whitespace-pre leading-relaxed text-[11px] sm:text-xs ${textClass}`}>
                      {line.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TERMINAL VIEW */}
        {activeTab === "terminal" && (
          <div className="flex-1 bg-[#070b12] p-3 sm:p-4 font-mono flex flex-col justify-between overflow-y-auto max-h-[380px]">
            <div>
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-850 text-xs">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-teal-400" />
                  <span>Output</span>
                </span>

                <div className="flex items-center gap-2 text-[11px]">
                  {isRunning ? (
                    <span className="text-amber-400 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                      Executing...
                    </span>
                  ) : hasExecuted ? (
                    <span className="text-emerald-400 flex items-center gap-1 font-mono">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Exit 0 ({executionTime}ms)
                    </span>
                  ) : (
                    <span className="text-slate-500 font-mono">Status: Ready</span>
                  )}
                </div>
              </div>

              {/* Terminal Logs */}
              <div className="space-y-2 text-xs overflow-y-auto max-h-[260px] sm:max-h-[300px] pr-1 scrollbar-thin">
                {logs.length === 0 ? (
                  <div className="p-6 text-center text-slate-500 space-y-2.5">
                    <Cpu className="w-7 h-7 mx-auto text-slate-700" />
                    <p className="text-xs">
                      No active run. Tap{" "}
                      <strong className="text-teal-400">Run</strong> above to execute this
                      agent step-by-step!
                    </p>
                  </div>
                ) : (
                  logs.map((log) => {
                    let badgeColor = "text-slate-400";
                    let borderColor = "border-slate-850";
                    let bgColor = "bg-slate-900/30";

                    if (log.type === "system") {
                      badgeColor = "text-slate-400";
                    } else if (log.type === "perceive") {
                      badgeColor = "text-sky-300";
                      borderColor = "border-sky-500/20";
                      bgColor = "bg-sky-500/5";
                    } else if (log.type === "reason") {
                      badgeColor = "text-violet-300";
                      borderColor = "border-violet-500/20";
                      bgColor = "bg-violet-500/5";
                    } else if (log.type === "act") {
                      badgeColor = "text-emerald-300";
                      borderColor = "border-emerald-500/20";
                      bgColor = "bg-emerald-500/5";
                    } else if (log.type === "observe") {
                      badgeColor = "text-amber-300";
                      borderColor = "border-amber-500/20";
                      bgColor = "bg-amber-500/5";
                    } else if (log.type === "complete") {
                      badgeColor = "text-teal-300 font-bold";
                      borderColor = "border-teal-500/40";
                      bgColor = "bg-teal-500/10";
                    }

                    return (
                      <div
                        key={log.id}
                        className={`p-2 sm:p-2.5 rounded-lg border ${borderColor} ${bgColor} text-xs leading-relaxed`}
                      >
                        <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono mb-1">
                          <span className="uppercase">{log.type}</span>
                          <span>+{log.timestamp}</span>
                        </div>
                        <div className={`${badgeColor} font-mono break-words`}>{log.text}</div>
                      </div>
                    );
                  })
                )}
                <div ref={terminalEndRef} />
              </div>
            </div>

            {/* Terminal Footer Strip */}
            <div className="pt-2 sm:pt-3 mt-2 sm:mt-3 border-t border-slate-850 flex items-center justify-between text-[10px] sm:text-[11px] text-slate-500 font-mono">
              <span>Python 3.12 (Simulated)</span>
              {hasExecuted && (
                <button
                  onClick={() => setLogs([])}
                  className="text-slate-400 hover:text-white flex items-center gap-1 transition active:scale-95 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" /> Clear Console
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
