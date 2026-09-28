"use client";

import React, { useState } from "react";
import {
  Play,
  RotateCcw,
  Copy,
  Check,
  Terminal,
  Layers,
  GitBranch,
  Network,
  Clock,
  Coins,
  Cpu,
  CheckCircle2,
} from "lucide-react";

type CodeMode = "sequential" | "parallel" | "dynamic";

interface ExecutionLog {
  time: string;
  step: string;
  detail: string;
  badge?: string;
  type: "info" | "action" | "parallel" | "success";
}

export default function DecompositionCodeExecutor() {
  const [mode, setMode] = useState<CodeMode>("parallel");
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<ExecutionLog[]>([]);
  const [copied, setCopied] = useState(false);
  const [tokensUsed, setTokensUsed] = useState(0);
  const [elapsedMs, setElapsedMs] = useState(0);

  const sequentialCode = `# PATTERN 1: STATIC SEQUENTIAL TASK DECOMPOSITION
# Best for: Strict dependency chains (Order matters for correctness)

def execute_sequential_pipeline(goal: str):
    print(f"[*] Starting sequential pipeline for: {goal}")

    # Subtask 1: Determine head count & budget
    attendees = step_list_people()
    print(f" -> Step 1 Complete: {len(attendees)} confirmed attendees")

    # Subtask 2: Survey dates (Depends on Subtask 1)
    dates = step_survey_dates(attendees)
    print(f" -> Step 2 Complete: Preferred date selected: {dates['best_date']}")

    # Subtask 3: Research venue (Runs sequentially after Step 2)
    venues = step_research_venues(dates['best_date'])
    print(f" -> Step 3 Complete: {len(venues)} venues scouted")

    # Subtask 4: Book venue
    booking = step_book_venue(venues[0])
    return booking

# Each step blocks until the previous finishes: Total Latency = Sum(t1 + t2 + t3 + t4)`;

  const parallelCode = `# PATTERN 2: ASYNC PARALLEL TASK DECOMPOSITION
# Best for: Independent subproblems with zero shared state
import asyncio

async def execute_parallel_pipeline(goal: str):
    print(f"[*] Starting parallel decomposition for: {goal}")

    # Step 1: Prep phase (Sequential prerequisite)
    config = await fetch_event_criteria()

    # Step 2: Parallel research wave (Runs concurrently via asyncio.gather)
    print("[*] Launching parallel venue research tasks simultaneously...")
    venue_task_a = research_resort_venue(config)
    venue_task_b = research_mountain_retreat(config)
    venue_task_c = research_urban_hub(config)

    # All 3 network calls fire in parallel!
    results = await asyncio.gather(venue_task_a, venue_task_b, venue_task_c)
    print(f"[+] All 3 venue reports returned simultaneously!")

    # Step 3: Synthesis & Selection
    best_venue = select_optimal_option(results)
    return best_venue

# Total Latency = Prep + Max(Task_A, Task_B, Task_C) + Selection (~50% faster)`;

  const dynamicCode = `# PATTERN 3: DYNAMIC RUNTIME DECOMPOSITION
# Best for: Open-ended tasks where steps cannot be known upfront

class DynamicDecompositionAgent:
    def __init__(self, llm):
        self.llm = llm

    def solve(self, complex_goal: str):
        # 1. Ask LLM to generate initial plan of subtasks
        plan = self.llm.generate_plan(f"Decompose goal into subtasks: {complex_goal}")
        context = {"plan": plan, "results": {}}

        for step in plan:
            print(f"[*] Executing dynamically planned step: {step.title}")
            res = execute_action(step.action, context)
            context["results"][step.id] = res

            # Dynamic adaptation: re-evaluate if unexpected roadblock occurs
            if res.get("status") == "error":
                print("[!] Roadblock detected. Asking LLM to replan dynamically...")
                plan = self.llm.replan(context, failed_step=step)

        return context["results"]`;

  const activeCode =
    mode === "sequential"
      ? sequentialCode
      : mode === "parallel"
      ? parallelCode
      : dynamicCode;

  const copyCode = () => {
    navigator.clipboard.writeText(activeCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const runSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setLogs([]);
    setTokensUsed(0);
    setElapsedMs(0);

    if (mode === "sequential") {
      const steps: ExecutionLog[] = [
        { time: "00:00.100", step: "Decomposition Init", detail: "Sequential plan loaded: 4 linear stages", type: "info" },
        { time: "00:00.600", step: "Subtask 1: List Attendees", detail: "Parsed headcount: 45 attendees across 3 departments", badge: "Step 1/4", type: "action" },
        { time: "00:01.200", step: "Subtask 2: Survey Dates", detail: "Optimal date chosen: Oct 14-16 (92% availability)", badge: "Step 2/4", type: "action" },
        { time: "00:01.850", step: "Subtask 3: Research Venues", detail: "Queried 3 venue APIs sequentially. 3 candidates compiled.", badge: "Step 3/4", type: "action" },
        { time: "00:02.400", step: "Subtask 4: Book Venue", detail: "Confirmed booking at Pine Valley Lodge. Deposit processed.", badge: "Step 4/4", type: "action" },
        { time: "00:02.450", step: "Pipeline Finished", detail: "Sequential execution complete. Total time: 2450ms.", badge: "Complete", type: "success" },
      ];

      steps.forEach((step, idx) => {
        setTimeout(() => {
          setLogs((prev) => [...prev, step]);
          setTokensUsed((idx + 1) * 290);
          setElapsedMs(Math.round((idx + 1) * 490));
          if (idx === steps.length - 1) setIsRunning(false);
        }, idx * 500);
      });
    } else if (mode === "parallel") {
      const steps: ExecutionLog[] = [
        { time: "00:00.080", step: "Decomposition Init", detail: "Parallel fork-join plan loaded: 1 prep + 3 concurrent workers", type: "info" },
        { time: "00:00.350", step: "Prerequisite Phase", detail: "Step 1: Event criteria & budget extracted ($25k max)", badge: "Prereq", type: "action" },
        { time: "00:00.600", step: "Fork: Launching Workers", detail: "asyncio.gather(BeachResort, MountainLodge, UrbanHub) fired in parallel", badge: "Fork", type: "parallel" },
        { time: "00:01.050", step: "Worker 1 Finished", detail: "Beach Resort report: $22k, beach access, capacity 60", badge: "Thread A", type: "parallel" },
        { time: "00:01.080", step: "Worker 2 Finished", detail: "Mountain Lodge report: $19.5k, hiking trails, capacity 50", badge: "Thread B", type: "parallel" },
        { time: "00:01.120", step: "Worker 3 Finished", detail: "Urban Hub report: $24k, downtown tech hub, capacity 80", badge: "Thread C", type: "parallel" },
        { time: "00:01.350", step: "Join & Final Selection", detail: "Mountain Lodge selected based on price/quality score (9.4/10)", badge: "Join", type: "success" },
      ];

      steps.forEach((step, idx) => {
        setTimeout(() => {
          setLogs((prev) => [...prev, step]);
          setTokensUsed((idx + 1) * 310);
          setElapsedMs(Math.round((idx + 1) * 220));
          if (idx === steps.length - 1) setIsRunning(false);
        }, idx * 350);
      });
    } else {
      const steps: ExecutionLog[] = [
        { time: "00:00.090", step: "Goal Analysis", detail: "Complex Goal: 'Organize high-stakes product launch keynote'", type: "info" },
        { time: "00:00.520", step: "Dynamic Decomposition", detail: "LLM generated dynamic 3-phase DAG with 6 reactive subtasks", badge: "Planning", type: "action" },
        { time: "00:01.050", step: "Subtask 1: Slide Content", detail: "Generated draft presentation deck structure", badge: "Action", type: "action" },
        { time: "00:01.550", step: "Subtask 2: Demo Check", detail: "Detected demo API regression (500 Internal Error)!", badge: "Roadblock", type: "action" },
        { time: "00:01.950", step: "Adaptive Re-Planning", detail: "Agent autonomously created fallback subtask: 'Use cached mock video demo'", badge: "Re-Plan", type: "parallel" },
        { time: "00:02.400", step: "Goal Resolved", detail: "Execution recovered autonomously with fallback asset verified.", badge: "Complete", type: "success" },
      ];

      steps.forEach((step, idx) => {
        setTimeout(() => {
          setLogs((prev) => [...prev, step]);
          setTokensUsed((idx + 1) * 440);
          setElapsedMs(Math.round((idx + 1) * 410));
          if (idx === steps.length - 1) setIsRunning(false);
        }, idx * 450);
      });
    }
  };

  const resetLogs = () => {
    setLogs([]);
    setTokensUsed(0);
    setElapsedMs(0);
    setIsRunning(false);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 md:p-5 border-b border-slate-800 bg-slate-900/50">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-400">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              Decomposition Code Studio
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                Executable Code
              </span>
            </h4>
            <p className="text-xs text-slate-400">
              Run and inspect sequential chains, async parallel forks, and dynamic planning agents
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono self-start sm:self-center">
          <button
            onClick={() => {
              setMode("sequential");
              resetLogs();
            }}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              mode === "sequential"
                ? "bg-violet-600 text-white font-bold shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Sequential
          </button>
          <button
            onClick={() => {
              setMode("parallel");
              resetLogs();
            }}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              mode === "parallel"
                ? "bg-teal-600 text-white font-bold shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <GitBranch className="w-3.5 h-3.5" />
            Async Parallel
          </button>
          <button
            onClick={() => {
              setMode("dynamic");
              resetLogs();
            }}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              mode === "dynamic"
                ? "bg-amber-600 text-white font-bold shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            Dynamic Agent
          </button>
        </div>
      </div>

      {/* Code Editor & Meta Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-slate-800">
        {/* Left: Code Viewer */}
        <div className="lg:col-span-7 bg-slate-950 p-4 font-mono text-xs overflow-x-auto relative">
          <div className="flex items-center justify-between text-slate-500 pb-2 mb-2 border-b border-slate-900 text-[11px]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
              <span className="text-slate-400 ml-1">
                {mode === "sequential"
                  ? "sequential_pipeline.py"
                  : mode === "parallel"
                  ? "parallel_async_gather.py"
                  : "dynamic_planner_agent.py"}
              </span>
            </div>

            <button
              onClick={copyCode}
              className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white px-2 py-0.5 rounded bg-slate-900 border border-slate-800 transition"
              title="Copy snippet"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-teal-400" />
                  <span className="text-teal-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          <pre className="text-slate-300 leading-relaxed overflow-x-auto select-text font-mono text-[11px] sm:text-xs max-h-[340px]">
            <code>
              {activeCode.split("\n").map((line, idx) => (
                <div key={idx} className="flex">
                  <span className="text-slate-600 select-none w-7 shrink-0 text-right pr-3">
                    {idx + 1}
                  </span>
                  <span
                    className={
                      line.trim().startsWith("#")
                        ? "text-slate-500 italic"
                        : line.includes("def ") || line.includes("class ") || line.includes("async ")
                        ? "text-sky-400 font-bold"
                        : line.includes("await ") || line.includes("return ")
                        ? "text-amber-400"
                        : "text-slate-300"
                    }
                  >
                    {line}
                  </span>
                </div>
              ))}
            </code>
          </pre>
        </div>

        {/* Right: Architectural Highlights */}
        <div className="lg:col-span-5 bg-slate-900/40 p-4 md:p-5 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-800">
          <div>
            <span className="text-[10px] font-mono font-bold tracking-wider text-teal-400 uppercase">
              Architecture Analysis
            </span>
            <h5 className="text-sm font-bold text-white mt-1">
              {mode === "sequential"
                ? "Linear Pipeline with Dependency Gating"
                : mode === "parallel"
                ? "Concurrency via asyncio.gather"
                : "Runtime Planning & Self-Repair DAG"}
            </h5>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              {mode === "sequential" &&
                "Guarantees that intermediate inputs are available before each dependent step runs. Ideal when step N strictly requires data from step N-1."}
              {mode === "parallel" &&
                "Dispatches independent research or extraction tasks at the exact same moment. Slashes total wall-clock time from the sum of all tasks down to the single slowest task."}
              {mode === "dynamic" &&
                "The LLM plans tasks on-the-fly and modifies its execution path when runtime tools fail, offering resilience in unpredictable environments."}
            </p>

            <div className="grid grid-cols-2 gap-2 mt-4 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-500 text-[10px] block">Wall-Clock Latency</span>
                <span className="text-slate-200 font-bold">
                  {mode === "sequential" ? "Sum(t1..tN)" : mode === "parallel" ? "Max(t1..tN) (-50%)" : "Adaptive"}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-500 text-[10px] block">State Coupling</span>
                <span className="text-slate-200 font-bold">
                  {mode === "sequential" ? "Tight" : mode === "parallel" ? "Decoupled (Isolated)" : "Flexible"}
                </span>
              </div>
            </div>
          </div>

          {/* Trigger Button */}
          <div className="mt-5 pt-4 border-t border-slate-800 flex items-center gap-2">
            <button
              onClick={runSimulation}
              disabled={isRunning}
              className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition ${
                isRunning
                  ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                  : mode === "sequential"
                  ? "bg-violet-600 hover:bg-violet-500 text-white shadow-lg"
                  : mode === "parallel"
                  ? "bg-teal-600 hover:bg-teal-500 text-white shadow-lg"
                  : "bg-amber-600 hover:bg-amber-500 text-white shadow-lg"
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              {isRunning ? "Simulating Execution..." : `Run ${mode.toUpperCase()} Code`}
            </button>

            <button
              onClick={resetLogs}
              disabled={isRunning || logs.length === 0}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition disabled:opacity-40"
              title="Reset terminal"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Terminal Stream */}
      <div className="p-4 md:p-5 bg-slate-950">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-2 mb-3 border-b border-slate-850">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-teal-400" />
            <span className="font-bold text-slate-200">Terminal Trace Output</span>
          </div>

          {logs.length > 0 && (
            <div className="flex items-center gap-3 text-[11px]">
              <span className="flex items-center gap-1 text-slate-400">
                <Coins className="w-3 h-3 text-amber-400" />
                ~{tokensUsed} Tokens
              </span>
              <span className="flex items-center gap-1 text-slate-400">
                <Clock className="w-3 h-3 text-sky-400" />
                {elapsedMs}ms
              </span>
            </div>
          )}
        </div>

        {logs.length === 0 ? (
          <div className="py-6 text-center text-slate-600 font-mono text-xs">
            Press <strong className="text-slate-400">Run</strong> to trace real-time task dispatch, parallel worker threads, and latency profiling.
          </div>
        ) : (
          <div className="space-y-2 font-mono text-xs max-h-56 overflow-y-auto pr-1">
            {logs.map((log, i) => (
              <div
                key={i}
                className={`p-2.5 rounded-lg border flex items-start gap-2.5 ${
                  log.type === "success"
                    ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-200"
                    : log.type === "parallel"
                    ? "bg-teal-950/40 border-teal-500/40 text-teal-200"
                    : "bg-slate-900/60 border-slate-800 text-slate-300"
                }`}
              >
                <span className="text-[10px] text-slate-500 shrink-0 mt-0.5">{log.time}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-bold text-white text-[11px]">{log.step}</span>
                    {log.badge && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-800 border border-slate-700 text-slate-300 font-mono">
                        {log.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] leading-relaxed break-words">{log.detail}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
