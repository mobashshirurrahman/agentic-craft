"use client";

import React, { useState } from "react";
import {
  RotateCcw,
  Play,
  Pause,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Terminal,
  Cpu,
  Layers,
} from "lucide-react";

interface CycleStep {
  iteration: number;
  thought: string;
  action: string | null;
  observation: string | null;
  status: "looping" | "terminated";
}

export default function AgentLoopSimulator() {
  const [maxIterations, setMaxIterations] = useState<number>(5);
  const [currentIter, setCurrentIter] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);
  const [hitLimit, setHitLimit] = useState<boolean>(false);

  const cycleData: CycleStep[] = [
    {
      iteration: 1,
      thought: "Goal: Find hotel in Tokyo under $150 and calculate total for 3 nights with 10% tax. First, search hotels.",
      action: "search_hotels(city='Tokyo', max_price=150)",
      observation: "Found: Hotel Shinjuku Sun ($120/night, availability: confirmed)",
      status: "looping",
    },
    {
      iteration: 2,
      thought: "Hotel found at $120/night. Now I need to calculate total cost: 120 * 3 * 1.10.",
      action: "calculate(expression='120 * 3 * 1.10')",
      observation: "Result: 396.0",
      status: "looping",
    },
    {
      iteration: 3,
      thought: "I have both the hotel name and the verified total cost. No further tools needed. Ready to output final answer.",
      action: null,
      observation: null,
      status: "terminated",
    },
  ];

  const handleRunLoop = () => {
    setIsRunning(true);
    setCurrentIter(0);
    setCompleted(false);
    setHitLimit(false);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step > maxIterations) {
        clearInterval(interval);
        setIsRunning(false);
        setHitLimit(true);
      } else if (step <= cycleData.length) {
        setCurrentIter(step);
        if (cycleData[step - 1].status === "terminated") {
          clearInterval(interval);
          setIsRunning(false);
          setCompleted(true);
        }
      }
    }, 700);
  };

  const handleReset = () => {
    setCurrentIter(0);
    setIsRunning(false);
    setCompleted(false);
    setHitLimit(false);
  };

  const activeSteps = cycleData.slice(0, currentIter);

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm overflow-hidden transition-colors">
      {/* Header */}
      <div className="p-5 md:p-6 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-sky-500/10 via-teal-500/5 to-transparent">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                Multi-Step Agentic Cycle Simulator
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-700 dark:text-sky-300 border border-sky-500/30">
                  while Loop
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Observe how an agent cycles through Thought ➔ Action ➔ Observation until an exit condition or iteration brake fires
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-white transition"
              title="Reset"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="p-5 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Configuration & Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold pb-2 border-b border-slate-200 dark:border-slate-800">
            Loop Safety Controls
          </div>

          {/* Max Iterations Slider */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="text-slate-700 dark:text-slate-300 font-medium">Safety Ceiling (max_iterations)</span>
              <span className="font-mono font-bold text-sky-600 dark:text-sky-400">{maxIterations} loops</span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              step="1"
              value={maxIterations}
              onChange={(e) => setMaxIterations(Number(e.target.value))}
              disabled={isRunning}
              className="w-full accent-sky-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
              <span>1 (forces early brake)</span>
              <span>3 (optimal)</span>
              <span>5</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-1.5">
            <span className="font-bold text-slate-900 dark:text-white font-mono text-[11px] block">
              Test Goal:
            </span>
            <p className="text-[11px] leading-relaxed">
              &quot;Find a hotel in Tokyo under $150 and calculate total cost for 3 nights with 10% tax.&quot;
            </p>
          </div>

          <button
            onClick={handleRunLoop}
            disabled={isRunning}
            className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-mono text-xs font-bold transition flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>{isRunning ? `Looping (Iteration ${currentIter})...` : "Start Multi-Step Loop"}</span>
          </button>

          {/* Python implementation snippet */}
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-mono text-[11px] overflow-x-auto">
            <span className="text-slate-500"># Pure Python while loop with brake:</span>
            <pre className="text-sky-300 mt-1">{`for i in range(max_iterations):
    thought, action = agent.step()
    if not action:
        return final_answer  # EXIT!
    obs = actions[action.name](action.args)
    agent.add_observation(obs)`}</pre>
          </div>
        </div>

        {/* Right: Live Loop Iteration Timeline (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
            <span>Execution Loop Trace</span>
            <span className="text-[10px] font-mono text-sky-600 dark:text-sky-400">
              Iteration {currentIter} / {maxIterations}
            </span>
          </div>

          {currentIter > 0 ? (
            <div className="space-y-3">
              {activeSteps.map((step) => (
                <div
                  key={step.iteration}
                  className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-sky-600 dark:text-sky-400 text-[11px]">
                      CYCLE #{step.iteration}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                        step.status === "terminated"
                          ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300"
                          : "bg-sky-500/20 text-sky-700 dark:text-sky-300"
                      }`}
                    >
                      {step.status === "terminated" ? "Goal Reached" : "Tool Invocation"}
                    </span>
                  </div>

                  <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
                    <strong>💭 Thought:</strong> {step.thought}
                  </p>

                  {step.action && (
                    <div className="p-2 rounded bg-slate-900 text-sky-300 font-mono text-[11px]">
                      ⚡ Action: {step.action}
                    </div>
                  )}

                  {step.observation && (
                    <div className="p-2 rounded bg-amber-500/10 text-amber-900 dark:text-amber-200 font-mono text-[11px]">
                      👁️ Observation: {step.observation}
                    </div>
                  )}
                </div>
              ))}

              {completed && (
                <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-950 dark:text-emerald-200 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>
                    <strong>Loop Successfully Terminated in {currentIter} Cycles:</strong> &quot;Hotel Shinjuku Sun reserved at $120/night. 3 nights with 10% tax = $396.00 total.&quot;
                  </span>
                </div>
              )}

              {hitLimit && (
                <div className="p-3.5 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-950 dark:text-amber-200 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>
                    <strong>Safety Ceiling Reached ({maxIterations} iterations):</strong> Loop halted to prevent runaway token spend.
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="p-8 rounded-xl border border-dashed border-slate-300 dark:border-slate-800 text-center text-slate-400 space-y-2">
              <RotateCcw className="w-6 h-6 mx-auto text-sky-500/60" />
              <div className="text-xs font-mono">
                Click &ldquo;Start Multi-Step Loop&rdquo; to watch the cycle unfold
              </div>
              <p className="text-[11px] text-slate-500 max-w-sm mx-auto">
                Unlike a single-turn agent, a looping agent iterates until it decides no further tools are needed.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
