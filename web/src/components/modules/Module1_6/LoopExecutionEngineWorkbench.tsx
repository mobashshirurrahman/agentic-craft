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

  const handleCopy = () => {
    navigator.clipboard.writeText(pythonLoopCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const runLoopSimulation = () => {
    setIsRunning(true);
    setLogs([]);

    const simulationLogs: string[] = [];

    simulationLogs.push(`[*] Initializing Agentic Loop (Safety Cap = ${maxIterations} steps)...`);
    simulationLogs.push(`[*] User Goal: "Audit Q3 revenue anomaly and patch discrepancy"`);

    let step = 1;
    let finished = false;

    while (step <= maxIterations && !finished) {
      const s = step;
      simulationLogs.push(`\n[--- CYCLE ${s} of ${maxIterations} ---]`);
      simulationLogs.push(`[1. PERCEIVE]: Context loaded (${s - 1} prior turns).`);

      if (simulateInfiniteLoop) {
        simulationLogs.push(`[2. REASON]: Vague instructions detected. Re-querying same database table...`);
        simulationLogs.push(`[3. ACT]: Tool call: query_db(table="sales_cache")`);
        simulationLogs.push(`[4. OBSERVE]: Returned 400 rows identical to previous turn.`);
        simulationLogs.push(`[5. ITERATE]: Goal NOT satisfied. No state change detected. Continuing loop...`);
      } else if (simulateFlakyTool && s === 1) {
        simulationLogs.push(`[2. REASON]: Inspecting balance sheet line items...`);
        simulationLogs.push(`[3. ACT]: Tool call: fetch_erp_balance_sheet()`);
        simulationLogs.push(`[4. OBSERVE]: [503 Service Unavailable]: ERP gateway timeout.`);
        simulationLogs.push(`[5. ITERATE]: Failure caught! Re-entering loop with backoff retry strategy...`);
      } else if (simulateFlakyTool && s === 2) {
        simulationLogs.push(`[2. REASON]: Retrying ERP query with exponential backoff...`);
        simulationLogs.push(`[3. ACT]: Tool call: fetch_erp_balance_sheet(retry=True)`);
        simulationLogs.push(`[4. OBSERVE]: 200 OK -> Retrieved ledger records.`);
        simulationLogs.push(`[5. ITERATE]: Anomaly found: duplicate billing on Invoice #884. Proceeding to fix.`);
      } else {
        if (s === 1) {
          simulationLogs.push(`[2. REASON]: Fetching anomaly report for Q3 revenue.`);
          simulationLogs.push(`[3. ACT]: Tool call: fetch_anomaly_records(quarter="Q3")`);
          simulationLogs.push(`[4. OBSERVE]: Identified $12,400 duplicate billing.`);
          simulationLogs.push(`[5. ITERATE]: Discrepancy isolated. Moving to Cycle 2 to adjust ledger.`);
        } else if (s === 2) {
          simulationLogs.push(`[2. REASON]: Adjusting ledger to credit customer for duplicate billing.`);
          simulationLogs.push(`[3. ACT]: Tool call: issue_credit_memo(amount=12400)`);
          simulationLogs.push(`[4. OBSERVE]: Credit memo #CM-901 confirmed by ERP.`);
          simulationLogs.push(`[5. ITERATE]: Goal completely resolved! Exiting loop.`);
          finished = true;
        }
      }

      step++;
    }

    if (!finished && simulateInfiniteLoop) {
      simulationLogs.push(`\n[💥 SAFETY CEILING HIT]: Loop exceeded max_iterations limit (${maxIterations}).`);
      simulationLogs.push(`[SAFETY INTERCEPT]: Halting execution to prevent token drain and runaway billing.`);
    }

    simulationLogs.forEach((line, idx) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, line]);
        if (idx === simulationLogs.length - 1) setIsRunning(false);
      }, (idx + 1) * 220);
    });
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden shadow-sm dark:shadow-2xl">
      {/* Header bar */}
      <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30 text-teal-700 dark:text-teal-400">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              Agentic Loop Engine Workbench
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-500/20 text-teal-800 dark:text-teal-300 font-semibold border border-teal-200 dark:border-teal-500/30">
                Python 3.11
              </span>
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Configure stopping boundaries, test flaky tool self-healing, and trigger safety limits
            </p>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-teal-600 dark:hover:text-teal-400 self-start sm:self-center transition touch-manipulation active:scale-95"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? "Copied Engine!" : "Copy Python Loop"}</span>
        </button>
      </div>

      {/* Main Grid: Code Left, Interactive Config Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-slate-200 dark:border-slate-800">
        {/* Code Left */}
        <div className="lg:col-span-6 bg-slate-950 p-4 font-mono text-xs overflow-x-auto">
          <div className="flex items-center justify-between text-slate-500 pb-2 mb-2 border-b border-slate-800 text-[11px]">
            <span>autonomous_agent_loop.py</span>
            <span>while not is_complete:</span>
          </div>
          <pre className="text-slate-300 leading-relaxed overflow-x-auto max-h-[380px] scrollbar-thin">
            <code>{pythonLoopCode}</code>
          </pre>
        </div>

        {/* Interactive Controls & Terminal Right */}
        <div className="lg:col-span-6 p-4 sm:p-5 flex flex-col justify-between gap-4 bg-slate-50 dark:bg-slate-900/30">
          <div className="space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 block">
              Loop Safety Parameters
            </span>

            {/* Max iterations slider */}
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 space-y-2 shadow-sm">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-600 dark:text-slate-400">max_iterations Safety Ceiling:</span>
                <span className="font-bold text-teal-700 dark:text-teal-400 px-2 py-0.5 rounded bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30">
                  {maxIterations} Cycles Max
                </span>
              </div>
              <input
                type="range"
                min="2"
                max="8"
                step="1"
                value={maxIterations}
                onChange={(e) => setMaxIterations(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-600 touch-manipulation"
              />
            </div>

            {/* Checkbox Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <label className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex items-center gap-2 cursor-pointer shadow-sm touch-manipulation">
                <input
                  type="checkbox"
                  checked={simulateFlakyTool}
                  onChange={(e) => {
                    setSimulateFlakyTool(e.target.checked);
                    if (e.target.checked) setSimulateInfiniteLoop(false);
                  }}
                  className="rounded text-teal-600 focus:ring-teal-500"
                />
                <span className="text-slate-700 dark:text-slate-300 font-medium">
                  Simulate Flaky Tool (503 Error)
                </span>
              </label>

              <label className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex items-center gap-2 cursor-pointer shadow-sm touch-manipulation">
                <input
                  type="checkbox"
                  checked={simulateInfiniteLoop}
                  onChange={(e) => {
                    setSimulateInfiniteLoop(e.target.checked);
                    if (e.target.checked) setSimulateFlakyTool(false);
                  }}
                  className="rounded text-rose-600 focus:ring-rose-500"
                />
                <span className="text-rose-700 dark:text-rose-400 font-medium flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5" />
                  Simulate Infinite Loop Drift
                </span>
              </label>
            </div>

            {/* Run Button */}
            <button
              onClick={runLoopSimulation}
              disabled={isRunning}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-500 text-white shadow-sm transition-all disabled:opacity-50 touch-manipulation active:scale-95"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isRunning ? "Engine Cycling..." : "Simulate Agentic Loop Execution"}</span>
            </button>
          </div>

          {/* Terminal output */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-3.5 font-mono text-xs shadow-inner flex flex-col min-h-[180px]">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-slate-400 text-[11px]">
              <div className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-teal-400" />
                <span>Live State Log Stream</span>
              </div>
              <span>stdout</span>
            </div>
            <div className="flex-1 overflow-y-auto mt-2 space-y-1 text-slate-300 text-[11px] leading-relaxed max-h-48 scrollbar-thin">
              {logs.length === 0 ? (
                <span className="text-slate-600 italic">
                  Click &quot;Simulate Agentic Loop Execution&quot; to test the Python while-loop engine...
                </span>
              ) : (
                logs.map((log, idx) => (
                  <div
                    key={idx}
                    className={
                      log.includes("💥") || log.includes("503")
                        ? "text-rose-400 font-semibold"
                        : log.includes("200 OK") || log.includes("completely resolved")
                        ? "text-emerald-300 font-semibold"
                        : log.includes("CYCLE")
                        ? "text-teal-400 font-bold"
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
