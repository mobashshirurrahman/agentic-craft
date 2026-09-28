"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sliders,
  Code,
  Sparkles,
  Layers,
  GitFork,
  RotateCcw,
  Bot,
  UserCheck,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

interface SpectrumLevel {
  level: number;
  id: string;
  name: string;
  category: "human" | "hybrid" | "agent";
  badge: string;
  color: string;
  bgGlow: string;
  borderGlow: string;
  decideOutput: "Human Code" | "LLM (1 Step)" | "LLM (Multi-Step)" | "LLM Autonomous";
  decideNextStep: "Human Code" | "Human Code" | "Human Code" | "LLM Router" | "LLM (with Cycles)" | "LLM Autonomous";
  decideAvailableTools: "Human Code" | "Human Code" | "Human Code" | "Human Code" | "Human Code" | "LLM Autonomous";
  realWorldExample: string;
  summary: string;
  riskProfile: "Lowest Risk" | "Low Risk" | "Moderate Risk" | "Higher Risk / Flexible";
}

const SPECTRUM_LEVELS: SpectrumLevel[] = [
  {
    level: 1,
    id: "code",
    name: "Pure Deterministic Code",
    category: "human",
    badge: "Level 1: Human-Driven",
    color: "text-slate-400",
    bgGlow: "bg-slate-500/10",
    borderGlow: "border-slate-500/30",
    decideOutput: "Human Code",
    decideNextStep: "Human Code",
    decideAvailableTools: "Human Code",
    realWorldExample: "Traditional Python script, regex parser, SQL query pipeline with zero AI.",
    summary: "100% predictable. Every single output, conditional branch, and outcome is explicitly authored by software engineers.",
    riskProfile: "Lowest Risk",
  },
  {
    level: 2,
    id: "llm_call",
    name: "Single LLM Call",
    category: "human",
    badge: "Level 2: Isolated Generation",
    color: "text-emerald-400",
    bgGlow: "bg-emerald-500/10",
    borderGlow: "border-emerald-500/30",
    decideOutput: "LLM (1 Step)",
    decideNextStep: "Human Code",
    decideAvailableTools: "Human Code",
    realWorldExample: "User clicks 'Summarize Document' -> System passes text to LLM -> Shows summary.",
    summary: "The LLM generates text for one isolated operation. Code controls inputs, validation, and what happens next.",
    riskProfile: "Lowest Risk",
  },
  {
    level: 3,
    id: "chain",
    name: "Sequential Chain",
    category: "human",
    badge: "Level 3: Fixed Pipeline",
    color: "text-sky-400",
    bgGlow: "bg-sky-500/10",
    borderGlow: "border-sky-500/30",
    decideOutput: "LLM (Multi-Step)",
    decideNextStep: "Human Code",
    decideAvailableTools: "Human Code",
    realWorldExample: "RAG Pipeline: Search DB -> Inject Context -> Generate Answer -> Format HTML.",
    summary: "Fixed sequence of LLM calls. Output of Step A directly feeds Step B. The route is hardcoded, but intermediate outputs are AI-generated.",
    riskProfile: "Low Risk",
  },
  {
    level: 4,
    id: "router",
    name: "LLM Router / Classifier",
    category: "hybrid",
    badge: "Level 4: Dynamic Branching",
    color: "text-violet-400",
    bgGlow: "bg-violet-500/10",
    borderGlow: "border-violet-500/30",
    decideOutput: "LLM (Multi-Step)",
    decideNextStep: "LLM Router",
    decideAvailableTools: "Human Code",
    realWorldExample: "Customer Support Router: Evaluates query intent -> routes to Billing, Tech Support, or Sales handler.",
    summary: "The LLM actively selects which predefined pathway to take. Execution moves forward through the selected branch with no cyclical loops.",
    riskProfile: "Moderate Risk",
  },
  {
    level: 5,
    id: "state_machine",
    name: "State Machine (Agentic Workflow)",
    category: "hybrid",
    badge: "Level 5: Cyclical Workflow",
    color: "text-indigo-400",
    bgGlow: "bg-indigo-500/10",
    borderGlow: "border-indigo-500/30",
    decideOutput: "LLM (Multi-Step)",
    decideNextStep: "LLM (with Cycles)",
    decideAvailableTools: "Human Code",
    realWorldExample: "LangGraph Writer: Draft Section -> Self-Critique -> If score < 8, loop back to rewrite -> Final Polish.",
    summary: "Predefined graph of nodes and edges with loops. The LLM decides state transitions and retries, but operates within human-designed bounds.",
    riskProfile: "Moderate Risk",
  },
  {
    level: 6,
    id: "autonomous",
    name: "Fully Autonomous Agent",
    category: "agent",
    badge: "Level 6: Autonomous Loop",
    color: "text-amber-400",
    bgGlow: "bg-amber-500/10",
    borderGlow: "border-amber-500/30",
    decideOutput: "LLM Autonomous",
    decideNextStep: "LLM Autonomous",
    decideAvailableTools: "LLM Autonomous",
    realWorldExample: "Claude Code / AutoGPT: Given an objective, explores repo, edits files, executes bash tests, fixes compiler bugs, self-heals.",
    summary: "The agent decides its own goals, selects any tool from its environment, writes its own intermediate workflows, and iterates until satisfied.",
    riskProfile: "Higher Risk / Flexible",
  },
];

export default function AutonomySpectrumVisualizer() {
  const [selectedLevel, setSelectedLevel] = useState<number>(5);
  const active = SPECTRUM_LEVELS.find((l) => l.level === selectedLevel) || SPECTRUM_LEVELS[4];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 md:p-7 shadow-2xl space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400 px-2.5 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/30">
              The Agentic Spectrum
            </span>
            <span className="text-xs font-mono text-slate-500">
              Andrew Ng &amp; LangChain Taxonomy
            </span>
          </div>
          <h3 className="text-xl font-bold text-white mt-1">
            6 Levels of Autonomy in Modern AI Systems
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Autonomy is not binary—it is a continuous spectrum of control and decision-making authority.
          </p>
        </div>

        <div className="text-xs font-mono px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 self-start sm:self-center">
          Active: <strong className="text-teal-400">Level {active.level} of 6</strong>
        </div>
      </div>

      {/* 6-Level Slider & Interactive Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {SPECTRUM_LEVELS.map((item) => {
          const isSelected = item.level === selectedLevel;

          return (
            <button
              key={item.id}
              onClick={() => setSelectedLevel(item.level)}
              className={`p-3 rounded-xl border text-left transition-all relative ${
                isSelected
                  ? `${item.bgGlow} ${item.borderGlow} shadow-lg scale-[1.02]`
                  : "bg-slate-900/40 border-slate-800 hover:bg-slate-900 hover:border-slate-700"
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mb-1">
                <span>L{item.level}</span>
                {isSelected && (
                  <span className="text-teal-400 font-bold text-[9px]">ACTIVE</span>
                )}
              </div>
              <h4 className="text-xs font-bold text-white leading-tight line-clamp-1">
                {item.name}
              </h4>
              <span className={`text-[10px] font-mono block mt-1 ${item.color}`}>
                {item.category === "human"
                  ? "Human-Led"
                  : item.category === "hybrid"
                  ? "Collaborative"
                  : "Autonomous"}
              </span>
            </button>
          );
        })}
      </div>

      {/* Detailed Inspection Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className={`p-5 md:p-6 rounded-2xl border ${active.borderGlow} ${active.bgGlow} space-y-5`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                {active.badge}
              </span>
              <h4 className="text-lg md:text-xl font-bold text-white flex items-center gap-2 mt-0.5">
                {active.name}
              </h4>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-slate-300">
                Risk Profile: <strong className="text-teal-400">{active.riskProfile}</strong>
              </span>
            </div>
          </div>

          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            {active.summary}
          </p>

          {/* Decision Governance Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-850">
              <span className="text-slate-500 text-[10px] block uppercase">1. Output of Step</span>
              <span className="text-white font-bold block mt-1">{active.decideOutput}</span>
              <span className="text-slate-400 text-[10px] block mt-0.5">
                {active.decideOutput.includes("Human") ? "Hardcoded by developer" : "Generated dynamically by LLM"}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-850">
              <span className="text-slate-500 text-[10px] block uppercase">2. Which Step to Take</span>
              <span className="text-teal-300 font-bold block mt-1">{active.decideNextStep}</span>
              <span className="text-slate-400 text-[10px] block mt-0.5">
                {active.decideNextStep.includes("Human") ? "Deterministic code branch" : "LLM decides navigation path"}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-850">
              <span className="text-slate-500 text-[10px] block uppercase">3. Available Tools &amp; Actions</span>
              <span className="text-amber-300 font-bold block mt-1">{active.decideAvailableTools}</span>
              <span className="text-slate-400 text-[10px] block mt-0.5">
                {active.decideAvailableTools.includes("Human") ? "Pre-wired schema whitelist" : "Agent discovers/registers tools"}
              </span>
            </div>
          </div>

          {/* Real World Concrete Example */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-850 text-xs">
            <span className="text-teal-400 font-mono font-bold block mb-1">
              🏢 Real-World Production Example:
            </span>
            <p className="text-slate-300 font-mono leading-relaxed">
              {active.realWorldExample}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
