"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Wrench,
  Database,
  Eye,
  ArrowRight,
  Sparkles,
  CheckCircle,
  AlertCircle,
  HelpCircle,
} from "lucide-react";

interface ComponentDetail {
  id: string;
  name: string;
  role: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgGlow: string;
  borderColor: string;
  tag: string;
  analogy: string;
  principle: string;
  practicalExample: string;
}

const COMPONENTS: ComponentDetail[] = [
  {
    id: "reasoning",
    name: "Reasoning Engine (LLM)",
    role: 'The "Brain" & Cognitive Core',
    icon: Brain,
    color: "text-violet-400",
    bgGlow: "bg-violet-500/10",
    borderColor: "border-violet-500/40",
    tag: "Cognitive Center",
    analogy: "Like the Executive Chef in a kitchen who reads the customer order, decides which recipe to execute, and directs the kitchen staff.",
    principle: "The reasoning engine enables understanding, decision-making, context synthesis, and goal interpretation from human input.",
    practicalExample: "Evaluates user query: 'Check if Tesla earnings beat estimates and calculate the percentage difference.' Breaks it into: 1. Search earnings 2. Compute math.",
  },
  {
    id: "tools",
    name: "Tools (Actuators)",
    role: "The Hands & External APIs",
    icon: Wrench,
    color: "text-emerald-400",
    bgGlow: "bg-emerald-500/10",
    borderColor: "border-emerald-500/40",
    tag: "External Capabilities",
    analogy: "The chef's knives, stove, oven, and food thermometer. Without tools, the chef can only describe cooking, but cannot prepare food!",
    principle: "Tools allow agents to perform actions in external environments: database lookups, calculator execution, web searches, and API calls.",
    practicalExample: "A Python function decorated with @tool: def search_financial_filings(ticker: str) -> str: ...",
  },
  {
    id: "memory",
    name: "Memory Mechanisms",
    role: "Short-Term & Long-Term Context",
    icon: Database,
    color: "text-amber-400",
    bgGlow: "bg-amber-500/10",
    borderColor: "border-amber-500/40",
    tag: "State & Persistence",
    analogy: "Short-term is the chef's active ticket line on the counter. Long-term is the master culinary recipe notebook stored on the shelf.",
    principle: "Agents require memory to maintain situational awareness over multi-turn interactions and retain past learnings across sessions.",
    practicalExample: "Short-term: Message history array in LangGraph state. Long-term: SQLite/PostgreSQL checkpoints or vector database.",
  },
  {
    id: "sensors",
    name: "Perception & Sensors",
    role: "The Eyes & Ears (Inputs)",
    icon: Eye,
    color: "text-sky-400",
    bgGlow: "bg-sky-500/10",
    borderColor: "border-sky-500/40",
    tag: "Environmental Input",
    analogy: "The waiter who brings customer orders and feedback from the dining hall into the kitchen.",
    principle: "Sensors receive user prompts, system events, and feedback/observations returned by tool executions.",
    practicalExample: "User chat prompt, webhook trigger, or error code returned when an API call fails.",
  },
];

export default function AgentArchitectureVisualizer() {
  const [selectedId, setSelectedId] = useState<string>("reasoning");
  const selected = COMPONENTS.find((c) => c.id === selectedId) || COMPONENTS[0];

  return (
    <div className="w-full rounded-2xl border border-slate-800 bg-slate-950/80 p-5 md:p-7 shadow-2xl relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-teal-400 px-2.5 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/30">
              Interactive Architecture Explorer
            </span>
            <span className="text-xs font-mono text-slate-500">
              Click any component to inspect
            </span>
          </div>
          <h3 className="text-xl font-bold text-white mt-1">
            The 4 Essential Components of an AI Agent
          </h3>
        </div>
      </div>

      {/* 4 Components Interactive Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 my-6">
        {COMPONENTS.map((item) => {
          const isSelected = item.id === selectedId;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              className={`p-4 rounded-xl text-left border transition-all duration-300 relative group flex flex-col justify-between ${
                isSelected
                  ? `${item.bgGlow} ${item.borderColor} shadow-lg shadow-slate-950 scale-[1.02]`
                  : "bg-slate-900/40 border-slate-800 hover:bg-slate-900/80 hover:border-slate-700"
              }`}
            >
              <div>
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                    isSelected ? "bg-slate-950 shadow-inner" : "bg-slate-900"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <h4 className="text-sm font-bold text-white leading-tight">
                  {item.name.split(" ")[0]} {item.name.split(" ")[1] || ""}
                </h4>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                  {item.role}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-850/80 text-[10px] font-mono text-slate-500">
                <span>{item.tag}</span>
                {isSelected ? (
                  <span className="text-teal-400 font-bold">ACTIVE</span>
                ) : (
                  <span className="group-hover:text-slate-300">Click</span>
                )}
              </div>

              {isSelected && (
                <motion.div
                  layoutId="activeComponentBeacon"
                  className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-teal-400 shadow-md shadow-teal-400/80"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Component Deep-Dive Inspection Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selected.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className={`rounded-xl border ${selected.borderColor} ${selected.bgGlow} p-5 md:p-6 backdrop-blur-md`}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-slate-950 flex items-center justify-center shrink-0 border border-slate-800">
                <selected.icon className={`w-6 h-6 ${selected.color}`} />
              </div>
              <div>
                <span className="text-xs font-mono text-slate-400">
                  Component Deep-Dive
                </span>
                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                  {selected.name}
                  <span className="text-xs font-normal font-mono text-slate-400">
                    ({selected.role})
                  </span>
                </h4>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm">
            {/* Analogy Box */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-850">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block font-mono mb-1.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Everyday Analogy
              </span>
              <p className="text-slate-200 leading-relaxed">
                {selected.analogy}
              </p>
            </div>

            {/* Architectural Principle */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-850">
              <span className="text-xs font-bold text-sky-300 uppercase tracking-wider block font-mono mb-1.5 flex items-center gap-1.5">
                <Brain className="w-3.5 h-3.5" />
                Core Architectural Principle
              </span>
              <p className="text-slate-200 leading-relaxed">
                {selected.principle}
              </p>
            </div>
          </div>

          {/* Practical Code Context */}
          <div className="mt-4 p-3.5 rounded-xl bg-slate-950/90 border border-slate-850 font-mono text-xs">
            <span className="text-teal-400 font-bold block mb-1">
              💻 Practical Code Context:
            </span>
            <code className="text-slate-300 block overflow-x-auto">
              {selected.practicalExample}
            </code>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
