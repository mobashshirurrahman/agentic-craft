"use client";

import React, { useState } from "react";
import {
  Code2,
  Terminal,
  Play,
  RotateCcw,
  ShieldAlert,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Check,
  Copy,
  Cpu,
  RefreshCw,
} from "lucide-react";

export default function LoopExecutionEngineWorkbench() {
  const [maxIterations, setMaxIterations] = useState<number>(5);
  const [simulateFlakyTool, setSimulateFlakyTool] = useState<boolean>(false);
  const [simulateInfiniteLoop, setSimulateInfiniteLoop] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [copied, setCopied] = useState<boolean>(false);

  const pythonLoopCode = `# Production Agentic Loop Engine in Python
class AutonomousAgent:
    def __init__(self, tools: dict, max_iterations: int = 5):
        self.tools = tools
        self.max_iterations = max_iterations
        self.state = {
            "history": [],
            "current_step": 0,
            "is_complete": False,
            "final_answer": None
        }

    def run(self, goal: str) -> str:
        self.state["history"].append({"role": "user", "content": goal})
        
        # Core Loop: Continues until termination condition or safety ceiling
        while not self.state["is_complete"] and self.state["current_step"] < self.max_iterations:
            self.state["current_step"] += 1
            step = self.state["current_step"]
            
            # Phase 1: PERCEIVE
            context = self.perceive(self.state["history"])
            
            # Phase 2: REASON
            thought, action_plan = self.reason(context)
            
            # Phase 3: ACT
            raw_result = self.act(action_plan)
            
            # Phase 4: OBSERVE
            observation = self.observe(raw_result)
            self.state["history"].append({"role": "tool", "content": observation})
            
            # Phase 5: ITERATE (Exit Condition Check)
            if self.is_goal_achieved(observation):
                self.state["is_complete"] = True
                self.state["final_answer"] = self.synthesize_response()
                break
                
        # Safety Gate: Triggered if max_iterations exceeded without completion
        if not self.state["is_complete"]:
            raise TimeoutError(f"Loop exceeded safety threshold of {self.max_iterations} iterations.")
            
        return self.state["final_answer"]`;

  const runSimulation = () => {
    setIsRunning(true);
    setLogs(["[Engine Init] Booting AutonomousAgent with max_iterations=" + maxIterations]);

    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        "[Goal Ingested]: 'Investigate latency spike on payment webhook'",
        "--- CYCLE 1 START ---",
        "[Phase 1: Perceive] Ingested user goal and 4 registered tools: [query_metrics, inspect_logs, ping_endpoint, restart_service]",
        "[Phase 2: Reason] Decision: Check query_metrics(service='payments', window='15m')",
      ]);
    }, 400);

    setTimeout(() => {
      if (simulateFlakyTool) {
        setLogs((prev) => [
          ...prev,
          "[Phase 3: Act] Dispatched `query_metrics` tool...",
          "[Phase 4: Observe] ⚠️ HTTP 503 SERVICE_UNAVAILABLE from metrics server!",
          "[Phase 5: Iterate] Goal NOT achieved. Error detected. Self-healing protocol engaged.",
          "--- CYCLE 2 START (Self-Healing) ---",
          "[Phase 1: Perceive] Error in context: Metrics server is unreachable.",
          "[Phase 2: Reason] Fallback Strategy: Inspect raw file logs instead via `inspect_logs`",
          "[Phase 3: Act] Dispatched `inspect_logs(service='payments', tail=20)`",
          "[Phase 4: Observe] Log entry found: 'ConnectionPoolTimeout: 50 open connections saturated'",
          "[Phase 5: Iterate] Root cause identified! Goal completed.",
          "--- LOOP TERMINATED ---",
          "[Final Output]: 'Latency spike caused by connection pool saturation (50 connections). Recommended action: Increase pool size.'",
        ]);
        setIsRunning(false);
      } else if (simulateInfiniteLoop) {
        let infiniteTrace = [
          ...logs,
          "[Phase 3: Act] Dispatched `query_metrics` tool...",
          "[Phase 4: Observe] Metric: latency=420ms (unclear cause)",
          "[Phase 5: Iterate] Goal not complete. Model repeating same question.",
        ];

        for (let i = 2; i <= maxIterations; i++) {
          infiniteTrace.push(
            `--- CYCLE ${i} START ---`,
            `[Phase 2: Reason] Re-querying metrics... (Loop Drift detected)`,
            `[Phase 3: Act] query_metrics(service='payments')`,
            `[Phase 4: Observe] Result unchanged.`
          );
        }

        infiniteTrace.push(
          `⚠️ [SAFETY SHUTDOWN TRIGGERED]`,
          `Max iterations ceiling (${maxIterations}) reached!`,
          `Safety brake engaged to prevent runaway token spend and infinite loop lock.`,
          `Agent cleanly exited and notified human operator for escalation.`
        );

        setLogs(infiniteTrace);
        setIsRunning(false);
      } else {
        // Normal clean 2-cycle success
        setLogs((prev) => [
          ...prev,
          "[Phase 3: Act] Dispatched `query_metrics`...",
          "[Phase 4: Observe] Metric: P99 latency = 1,420ms (Normal: 120ms). Found spike at 09:14 UTC.",
          "[Phase 5: Iterate] Goal partially complete. Identified spike time. Now need log traces.",
          "--- CYCLE 2 START ---",
          "[Phase 1: Perceive] Target timestamp 09:14 UTC identified.",
          "[Phase 2: Reason] Call `inspect_logs(timestamp='09:14', level='ERROR')`",
          "[Phase 3: Act] Dispatched `inspect_logs`...",
          "[Phase 4: Observe] Found 3 occurrences of 'Redis cache miss cascade'.",
          "[Phase 5: Iterate] Goal fully achieved! Terminating loop cleanly.",
          "--- LOOP TERMINATED ---",
          "[Final Output]: 'P99 latency spiked to 1,420ms at 09:14 UTC due to a Redis cache miss cascade.'",
        ]);
        setIsRunning(false);
      }
    }, 1200);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(pythonLoopCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-slate-700/60 bg-slate-900/90 dark:bg-slate-900/90 light:bg-white light:border-slate-300 shadow-xl overflow-hidden my-8">
      {/* Header */}
      <div className="border-b border-slate-700/60 dark:border-slate-700/60 light:border-slate-200 px-5 py-4 bg-slate-800/50 dark:bg-slate-800/50 light:bg-slate-50 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-teal-400 animate-pulse" />
            <h3 className="font-bold text-base md:text-lg text-white dark:text-white light:text-slate-900">
              Agentic Loop Engine & Guardrails Workbench
            </h3>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 mt-0.5">
            Test the while-loop execution flow, self-healing retries, and the critical max-iterations safety brake.
          </p>
        </div>

        <button
          onClick={handleCopyCode}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300 dark:text-slate-300 light:text-slate-700 hover:bg-slate-700/50 dark:hover:bg-slate-700/50 light:hover:bg-slate-100 transition-colors border border-slate-700/60 dark:border-slate-700/60 light:border-slate-300"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? "Copied!" : "Copy Loop Architecture"}</span>
        </button>
      </div>

      <div className="p-5 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Python Loop Architecture & Config */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="relative rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200 overflow-hidden bg-slate-950 dark:bg-slate-950 light:bg-slate-900 shadow-inner">
            <div className="px-3.5 py-1.5 bg-slate-900 dark:bg-slate-900 light:bg-slate-800 border-b border-slate-800 text-xs font-mono text-slate-400 flex items-center justify-between">
              <span>agent_loop_engine.py</span>
              <span className="text-[10px] text-teal-400">Pure Python Implementation</span>
            </div>
            <pre className="p-4 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed max-h-[340px]">
              {pythonLoopCode}
            </pre>
          </div>

          {/* Teacher explanation box */}
          <div className="rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-800/40 dark:bg-slate-800/40 light:bg-slate-50 p-4 text-xs text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
            <strong className="text-teal-300 dark:text-teal-300 light:text-teal-700 block mb-1">
              Why the `while` loop needs a strict termination condition:
            </strong>
            Without <code className="text-teal-400 font-mono">max_iterations</code>, an agent trapped in an ambiguous task or receiving repetitive errors will call LLM APIs indefinitely. That drains your credit card in minutes and hangs your system! Production loops always enforce a hard cap.
          </div>
        </div>

        {/* Right Column: Interactive Guardrail Controls & Live Terminal */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-4">
          {/* Controls Panel */}
          <div className="bg-slate-800/40 dark:bg-slate-800/40 light:bg-slate-50 border border-slate-700/50 dark:border-slate-700/50 light:border-slate-200 rounded-xl p-4 space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-400 light:text-slate-600 block">
              Loop Parameters & Chaos Injections
            </span>

            {/* Max iterations slider */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-white dark:text-white light:text-slate-900">
                  Max Iterations Safety Cap:
                </span>
                <span className="font-mono font-bold text-teal-400 bg-teal-500/20 px-2 py-0.5 rounded">
                  {maxIterations} cycles
                </span>
              </div>
              <input
                type="range"
                min={2}
                max={8}
                value={maxIterations}
                onChange={(e) => setMaxIterations(Number(e.target.value))}
                className="w-full accent-teal-400 cursor-pointer"
              />
            </div>

            {/* Chaos toggles */}
            <div className="space-y-2">
              <label className="flex items-center justify-between p-2.5 rounded-lg border border-slate-700/50 dark:border-slate-700/50 light:border-slate-200 bg-slate-900/50 dark:bg-slate-900/50 light:bg-white cursor-pointer">
                <div>
                  <div className="text-xs font-bold text-white dark:text-white light:text-slate-900">
                    Simulate Flaky Tool (503 Error)
                  </div>
                  <div className="text-[11px] text-slate-400">Tests autonomous self-healing pivot</div>
                </div>
                <input
                  type="checkbox"
                  checked={simulateFlakyTool}
                  onChange={(e) => {
                    setSimulateFlakyTool(e.target.checked);
                    if (e.target.checked) setSimulateInfiniteLoop(false);
                  }}
                  className="w-4 h-4 accent-teal-400"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-lg border border-slate-700/50 dark:border-slate-700/50 light:border-slate-200 bg-slate-900/50 dark:bg-slate-900/50 light:bg-white cursor-pointer">
                <div>
                  <div className="text-xs font-bold text-white dark:text-white light:text-slate-900">
                    Simulate Infinite Loop (Drift)
                  </div>
                  <div className="text-[11px] text-slate-400">Tests the max_iterations safety brake</div>
                </div>
                <input
                  type="checkbox"
                  checked={simulateInfiniteLoop}
                  onChange={(e) => {
                    setSimulateInfiniteLoop(e.target.checked);
                    if (e.target.checked) setSimulateFlakyTool(false);
                  }}
                  className="w-4 h-4 accent-amber-400"
                />
              </label>
            </div>

            {/* Run button */}
            <button
              onClick={runSimulation}
              disabled={isRunning}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold bg-teal-400 hover:bg-teal-300 text-slate-950 shadow-md transition-all disabled:opacity-50 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isRunning ? "Executing Loop..." : "Run Agentic Loop Engine"}</span>
            </button>
          </div>

          {/* Terminal Output */}
          <div className="flex-1 min-h-[200px] rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-950 dark:bg-slate-950 light:bg-slate-900 p-3.5 font-mono text-xs shadow-inner flex flex-col">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-slate-400 text-[11px]">
              <div className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-teal-400" />
                <span>Engine Runtime stdout</span>
              </div>
              <span>execution trace</span>
            </div>
            <div className="flex-1 overflow-y-auto mt-2 space-y-1.5 text-slate-300 text-[11px] leading-relaxed max-h-52">
              {logs.length === 0 ? (
                <span className="text-slate-600 dark:text-slate-600 italic">
                  Click "Run Agentic Loop Engine" to watch the loop initialize, cycle through phases, and handle exit conditions...
                </span>
              ) : (
                logs.map((log, idx) => (
                  <div
                    key={idx}
                    className={
                      log.includes("SAFETY SHUTDOWN")
                        ? "text-rose-400 font-bold"
                        : log.includes("503 SERVICE_UNAVAILABLE")
                        ? "text-amber-400 font-semibold"
                        : log.includes("LOOP TERMINATED")
                        ? "text-emerald-400 font-bold"
                        : log.includes("CYCLE")
                        ? "text-teal-300 font-semibold"
                        : "text-slate-300"
                    }
                  >
                    {log}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
