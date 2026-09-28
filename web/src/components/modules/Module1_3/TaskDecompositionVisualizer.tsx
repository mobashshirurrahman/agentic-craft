"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  RotateCcw,
  Layers,
  ArrowRight,
  GitBranch,
  Network,
  Clock,
  Zap,
  CheckCircle2,
  AlertCircle,
  Cpu,
  Workflow,
  Sparkles,
} from "lucide-react";

type StrategyType = "sequential" | "parallel" | "hierarchical";

interface Subtask {
  id: number;
  name: string;
  category: "prep" | "research" | "booking" | "comms";
  duration: number; // in relative units
  dependsOn?: number[];
  status: "idle" | "running" | "done";
}

const INITIAL_SUBTASKS: Subtask[] = [
  { id: 1, name: "List Attendees & Budget", category: "prep", duration: 1.0, status: "idle" },
  { id: 2, name: "Survey Preferred Dates", category: "prep", duration: 1.2, dependsOn: [1], status: "idle" },
  { id: 3, name: "Research Venue A (Beach)", category: "research", duration: 1.5, dependsOn: [2], status: "idle" },
  { id: 4, name: "Research Venue B (Mountain)", category: "research", duration: 1.4, dependsOn: [2], status: "idle" },
  { id: 5, name: "Compare Pricing & Amenities", category: "research", duration: 0.9, dependsOn: [3, 4], status: "idle" },
  { id: 6, name: "Book Winning Venue", category: "booking", duration: 1.1, dependsOn: [5], status: "idle" },
  { id: 7, name: "Coordinate Transport Logistics", category: "booking", duration: 1.0, dependsOn: [6], status: "idle" },
  { id: 8, name: "Draft Agenda & Send Calendar Invites", category: "comms", duration: 0.8, dependsOn: [6], status: "idle" },
];

export default function TaskDecompositionVisualizer() {
  const [strategy, setStrategy] = useState<StrategyType>("sequential");
  const [isRunning, setIsRunning] = useState(false);
  const [activeStep, setActiveStep] = useState<number[]>([]);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [elapsedTime, setElapsedTime] = useState(0);

  const resetSimulation = () => {
    setIsRunning(false);
    setActiveStep([]);
    setCompletedSteps([]);
    setElapsedTime(0);
  };

  const handleStrategyChange = (newStrategy: StrategyType) => {
    setStrategy(newStrategy);
    resetSimulation();
  };

  const runSimulation = () => {
    if (isRunning) return;
    resetSimulation();
    setIsRunning(true);

    if (strategy === "sequential") {
      // 1 by 1: Total 8 steps
      const stepOrder = [1, 2, 3, 4, 5, 6, 7, 8];
      stepOrder.forEach((stepId, index) => {
        setTimeout(() => {
          setActiveStep([stepId]);
          setElapsedTime((prev) => prev + 1.1);

          setTimeout(() => {
            setCompletedSteps((prev) => [...prev, stepId]);
            if (index === stepOrder.length - 1) {
              setActiveStep([]);
              setIsRunning(false);
            }
          }, 450);
        }, index * 550);
      });
    } else if (strategy === "parallel") {
      // Waves with parallel steps:
      // Wave 1: [1]
      // Wave 2: [2]
      // Wave 3: [3, 4] (Venues in parallel!)
      // Wave 4: [5]
      // Wave 5: [6]
      // Wave 6: [7, 8] (Transport & Invites in parallel!)
      const waves = [[1], [2], [3, 4], [5], [6], [7, 8]];

      waves.forEach((wave, index) => {
        setTimeout(() => {
          setActiveStep(wave);
          setElapsedTime((prev) => prev + (wave.length > 1 ? 0.8 : 1.0));

          setTimeout(() => {
            setCompletedSteps((prev) => [...prev, ...wave]);
            if (index === waves.length - 1) {
              setActiveStep([]);
              setIsRunning(false);
            }
          }, 500);
        }, index * 650);
      });
    } else {
      // Hierarchical:
      // Coordinator dispatches:
      // Stage 1: Planning Sub-tree [1, 2]
      // Stage 2: Research Sub-tree [3, 4, 5] (concurrent worker threads)
      // Stage 3: Execution Sub-tree [6, 7, 8]
      const stages = [
        { label: "Coordinator decomposes", tasks: [1, 2] },
        { label: "Research Squad executes", tasks: [3, 4, 5] },
        { label: "Logistics Squad executes", tasks: [6, 7, 8] },
      ];

      stages.forEach((stage, idx) => {
        setTimeout(() => {
          setActiveStep(stage.tasks);
          setElapsedTime((prev) => prev + 1.2);

          setTimeout(() => {
            setCompletedSteps((prev) => [...prev, ...stage.tasks]);
            if (idx === stages.length - 1) {
              setActiveStep([]);
              setIsRunning(false);
            }
          }, 600);
        }, idx * 750);
      });
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 md:p-7 shadow-2xl space-y-6">
      {/* Top Header & Strategy Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400 px-2.5 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/30">
              Interactive Execution Topologies
            </span>
            <span className="text-xs font-mono text-slate-500">Live Simulator</span>
          </div>
          <h3 className="text-xl font-bold text-white mt-1">
            Task Decomposition &amp; Strategy Simulator
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Complex Goal: &quot;Plan a 3-Day Team Offsite&quot; (Decomposed into 8 discrete subproblems)
          </p>
        </div>

        {/* Strategy Switcher Tabs */}
        <div className="flex items-center p-1 bg-slate-900 rounded-xl border border-slate-800 text-xs font-mono self-start sm:self-center">
          <button
            onClick={() => handleStrategyChange("sequential")}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              strategy === "sequential"
                ? "bg-violet-600 text-white font-bold shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <ArrowRight className="w-3.5 h-3.5" />
            Sequential
          </button>
          <button
            onClick={() => handleStrategyChange("parallel")}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              strategy === "parallel"
                ? "bg-teal-600 text-white font-bold shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <GitBranch className="w-3.5 h-3.5" />
            Parallel
          </button>
          <button
            onClick={() => handleStrategyChange("hierarchical")}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              strategy === "hierarchical"
                ? "bg-amber-600 text-white font-bold shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            Hierarchical
          </button>
        </div>
      </div>

      {/* Strategy Comparison Insight Box */}
      <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase text-teal-400">
              {strategy === "sequential"
                ? "Strategy 1: Sequential Pipeline"
                : strategy === "parallel"
                ? "Strategy 2: Parallel Fork-Join Execution"
                : "Strategy 3: Hierarchical Coordinator Pattern"}
            </span>
          </div>
          <p className="text-xs md:text-sm text-slate-300">
            {strategy === "sequential" &&
              "Executes one subtask at a time in strict order. Best when clear step dependencies exist. Simple to trace, but highest total execution latency."}
            {strategy === "parallel" &&
              "Runs independent tasks simultaneously without shared state. Venue research and invitations run concurrently, reducing runtime by ~55%."}
            {strategy === "hierarchical" &&
              "A lead planning agent breaks high-level goals into sub-workflows assigned to specialized worker agents. Maximizes both speed and domain depth."}
          </p>
        </div>

        {/* Metrics Pill Grid */}
        <div className="flex items-center gap-2 text-xs font-mono shrink-0">
          <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-center min-w-[85px]">
            <span className="text-[10px] text-slate-500 block">Est. Time</span>
            <span className={`font-bold ${strategy === "sequential" ? "text-amber-400" : "text-emerald-400"}`}>
              {strategy === "sequential" ? "8.8s (100%)" : strategy === "parallel" ? "4.2s (-52%)" : "3.8s (-57%)"}
            </span>
          </div>

          <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-center min-w-[85px]">
            <span className="text-[10px] text-slate-500 block">Complexity</span>
            <span className="font-bold text-slate-300">
              {strategy === "sequential" ? "Low (O(N))" : strategy === "parallel" ? "Medium" : "Advanced"}
            </span>
          </div>
        </div>
      </div>

      {/* The Visual Task Decomposition Graph */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400">
          <span>Decomposition Subtask Graph (8 Nodes)</span>
          <span>{completedSteps.length}/8 Completed</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {INITIAL_SUBTASKS.map((task) => {
            const isActive = activeStep.includes(task.id);
            const isDone = completedSteps.includes(task.id);

            let statusColor = "border-slate-800 bg-slate-900/30 text-slate-400";
            if (isActive) {
              statusColor = "border-teal-500 bg-teal-500/15 text-white shadow-lg shadow-teal-500/20 scale-[1.02]";
            } else if (isDone) {
              statusColor = "border-emerald-500/50 bg-emerald-950/20 text-emerald-300";
            }

            return (
              <motion.div
                key={task.id}
                layout
                className={`p-3.5 rounded-xl border transition-all relative flex flex-col justify-between ${statusColor}`}
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mb-1.5">
                    <span>Step {task.id}</span>
                    {isActive ? (
                      <span className="text-teal-400 font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping" />
                        RUNNING
                      </span>
                    ) : isDone ? (
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        DONE
                      </span>
                    ) : (
                      <span>QUEUED</span>
                    )}
                  </div>

                  <h5 className="text-xs font-bold text-slate-200 leading-snug">
                    {task.name}
                  </h5>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span className="uppercase">{task.category}</span>
                  {task.dependsOn && (
                    <span>Dep: [{task.dependsOn.join(",")}]</span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Simulator Control Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-800">
        <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
          <Clock className="w-4 h-4 text-teal-400" />
          <span>Simulation Latency: <strong className="text-white">{elapsedTime.toFixed(1)}s</strong></span>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={runSimulation}
            disabled={isRunning}
            className={`flex-1 sm:flex-none px-5 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition shadow-lg ${
              isRunning
                ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                : "bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-teal-500/20"
            }`}
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            {isRunning ? "Simulating Strategy..." : "Run Execution Trace"}
          </button>

          <button
            onClick={resetSimulation}
            disabled={isRunning || completedSteps.length === 0}
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-800 transition disabled:opacity-40"
            title="Reset simulation graph"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
