"use client";

import React, { useState } from "react";
import {
  Network,
  ArrowRight,
  RotateCcw,
  Play,
  Sparkles,
  CheckCircle2,
  Cpu,
  Layers,
  Repeat,
  GitBranch,
} from "lucide-react";

type WorkflowType = "linear" | "cyclic" | "branching";

interface TopologyDetails {
  title: string;
  analogy: string;
  bestFor: string;
  nodes: string[];
  edgesDescription: string;
}

const TOPOLOGIES: Record<WorkflowType, TopologyDetails> = {
  linear: {
    title: "1. Linear Pipeline (Assembly Line)",
    analogy: "Like baking a cake: Measure Ingredients ➔ Mix Batter ➔ Bake in Oven.",
    bestFor: "Deterministic tasks with fixed steps (e.g., Ingest PDF ➔ Summarize ➔ Format JSON).",
    nodes: ["parse_document", "extract_entities", "format_output"],
    edgesDescription: "START ➔ parse_document ➔ extract_entities ➔ format_output ➔ END",
  },
  cyclic: {
    title: "2. Cyclic Loop with Reflection (Author & Editor)",
    analogy: "Like a writer polishing a draft: Write Draft ➔ Review Flaws ➔ Rewrite until Grade A.",
    bestFor: "Tasks needing self-correction and quality checks (Code Generation, Writing, SQL Refinement).",
    nodes: ["draft_generator", "critique_evaluator", "revision_agent"],
    edgesDescription: "START ➔ draft_generator ➔ critique_evaluator ➔ [Pass? END : revision_agent ➔ critique_evaluator]",
  },
  branching: {
    title: "3. Branching / Multi-Path (Hospital Triage)",
    analogy: "Like a triage nurse at an ER: Checks symptoms ➔ routes patient to Heart, Bone, or General Clinic.",
    bestFor: "Customer support systems routing user queries to specialized domain sub-agents.",
    nodes: ["classifier_router", "billing_specialist", "technical_specialist", "general_qa"],
    edgesDescription: "START ➔ classifier_router ➔ [billing | tech | general] ➔ END",
  },
};

export default function WorkflowTopologyBuilder() {
  const [selectedType, setSelectedType] = useState<WorkflowType>("linear");
  const [activeStep, setActiveStep] = useState<number>(-1);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [loopCount, setLoopCount] = useState<number>(0);

  const current = TOPOLOGIES[selectedType];

  const runSimulation = () => {
    setIsSimulating(true);
    setActiveStep(0);
    setLoopCount(0);

    if (selectedType === "linear") {
      setTimeout(() => setActiveStep(1), 400);
      setTimeout(() => setActiveStep(2), 800);
      setTimeout(() => {
        setActiveStep(3);
        setIsSimulating(false);
      }, 1200);
    } else if (selectedType === "cyclic") {
      // Simulate: Draft -> Critique (Fail, 60%) -> Revise -> Critique (Pass, 92%) -> END
      setTimeout(() => setActiveStep(0), 300); // draft
      setTimeout(() => {
        setActiveStep(1); // critique
        setLoopCount(1);
      }, 650);
      setTimeout(() => setActiveStep(2), 1050); // revise
      setTimeout(() => {
        setActiveStep(1); // critique again
        setLoopCount(2);
      }, 1450);
      setTimeout(() => {
        setActiveStep(3); // pass to END
        setIsSimulating(false);
      }, 1850);
    } else if (selectedType === "branching") {
      // Simulate: Classifier -> technical_specialist -> END
      setTimeout(() => setActiveStep(0), 300);
      setTimeout(() => setActiveStep(2), 750); // routes to tech
      setTimeout(() => {
        setActiveStep(4);
        setIsSimulating(false);
      }, 1200);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm overflow-hidden transition-colors">
      {/* Header */}
      <div className="p-5 md:p-6 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-purple-500/10 via-pink-500/5 to-transparent">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
              <Network className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base md:text-lg text-slate-900 dark:text-white">
                The 3 Canonical Workflow Topologies
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Compare Linear, Cyclic Reflection, and Branching state graph architectures
              </p>
            </div>
          </div>

          <button
            onClick={runSimulation}
            disabled={isSimulating}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white font-mono text-xs font-bold transition shadow-sm"
          >
            <Play className={`w-3.5 h-3.5 ${isSimulating ? "animate-spin" : ""}`} />
            {isSimulating ? "Running Packet..." : "Simulate Execution"}
          </button>
        </div>
      </div>

      <div className="p-5 md:p-6 space-y-6">
        {/* Topology Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {(["linear", "cyclic", "branching"] as WorkflowType[]).map((type) => (
            <button
              key={type}
              onClick={() => {
                setSelectedType(type);
                setActiveStep(-1);
                setLoopCount(0);
              }}
              className={`p-3 text-left rounded-xl border text-xs font-mono transition-all ${
                selectedType === type
                  ? "border-purple-500 bg-purple-50/50 dark:bg-purple-950/40 text-purple-900 dark:text-purple-200 font-bold"
                  : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:border-slate-300"
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1 capitalize">
                {type === "linear" && <ArrowRight className="w-3.5 h-3.5" />}
                {type === "cyclic" && <Repeat className="w-3.5 h-3.5" />}
                {type === "branching" && <GitBranch className="w-3.5 h-3.5" />}
                <span>{type} Pattern</span>
              </div>
              <div className="text-[11px] text-slate-500 truncate">
                {type === "linear"
                  ? "Sequential stages"
                  : type === "cyclic"
                  ? "Self-healing loops"
                  : "Dynamic triage"}
              </div>
            </button>
          ))}
        </div>

        {/* Selected Topology Details Banner */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/30 space-y-2 text-xs">
          <div className="font-bold text-slate-900 dark:text-white font-mono flex items-center justify-between">
            <span>{current.title}</span>
            <span className="text-[11px] text-purple-600 dark:text-purple-400">
              {current.bestFor}
            </span>
          </div>
          <p className="text-slate-600 dark:text-slate-400 italic">
            "{current.analogy}"
          </p>
          <div className="p-2 rounded bg-slate-900 text-purple-300 font-mono text-[11px] truncate">
            {current.edgesDescription}
          </div>
        </div>

        {/* Interactive Visual Graph Canvas */}
        <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
          {selectedType === "linear" && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              {["parse_document", "extract_entities", "format_output"].map((nodeName, idx) => (
                <React.Fragment key={nodeName}>
                  <div
                    className={`flex-1 p-4 rounded-xl border text-center transition-all ${
                      activeStep === idx
                        ? "border-purple-500 bg-purple-500/20 text-purple-900 dark:text-purple-200 font-bold scale-105 shadow-md"
                        : activeStep > idx
                        ? "border-emerald-500 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300"
                        : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">
                      Stage {idx + 1}
                    </span>
                    <span className="text-xs font-mono font-bold">{nodeName}</span>
                  </div>
                  {idx < 2 && <ArrowRight className="w-5 h-5 text-slate-400 shrink-0" />}
                </React.Fragment>
              ))}
            </div>
          )}

          {selectedType === "cyclic" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div
                  className={`p-4 rounded-xl border text-center transition-all ${
                    activeStep === 0
                      ? "border-purple-500 bg-purple-500/20 text-purple-900 dark:text-purple-200 font-bold scale-105"
                      : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">1. Draft</span>
                  <span className="text-xs font-mono font-bold">draft_generator</span>
                </div>

                <div
                  className={`p-4 rounded-xl border text-center transition-all ${
                    activeStep === 1
                      ? "border-amber-500 bg-amber-500/20 text-amber-900 dark:text-amber-200 font-bold scale-105"
                      : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">
                    2. Critique (Quality Check)
                  </span>
                  <span className="text-xs font-mono font-bold">critique_evaluator</span>
                  {loopCount > 0 && (
                    <span className="text-[10px] font-mono block text-amber-600 dark:text-amber-400">
                      Iteration #{loopCount} {loopCount === 1 ? "(Score: 65% ➔ Revise)" : "(Score: 94% ➔ Pass)"}
                    </span>
                  )}
                </div>

                <div
                  className={`p-4 rounded-xl border text-center transition-all ${
                    activeStep === 2
                      ? "border-purple-500 bg-purple-500/20 text-purple-900 dark:text-purple-200 font-bold scale-105"
                      : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">3. Fix</span>
                  <span className="text-xs font-mono font-bold">revision_agent</span>
                </div>
              </div>
            </div>
          )}

          {selectedType === "branching" && (
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                <div
                  className={`p-4 rounded-xl border text-center max-w-xs w-full transition-all ${
                    activeStep === 0
                      ? "border-purple-500 bg-purple-500/20 text-purple-900 dark:text-purple-200 font-bold scale-105"
                      : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">
                    Triage Gateway
                  </span>
                  <span className="text-xs font-mono font-bold">classifier_router</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {["billing_specialist", "technical_specialist", "general_qa"].map((branch, idx) => (
                  <div
                    key={branch}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      activeStep === idx + 1
                        ? "border-emerald-500 bg-emerald-500/20 text-emerald-900 dark:text-emerald-200 font-bold scale-105"
                        : "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-slate-400 opacity-60"
                    }`}
                  >
                    <span className="text-[10px] font-mono uppercase block text-slate-500">
                      Branch {idx + 1}
                    </span>
                    <span className="text-xs font-mono font-semibold">{branch}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
