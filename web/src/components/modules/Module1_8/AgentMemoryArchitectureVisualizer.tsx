"use client";

import React, { useState } from "react";
import {
  Brain,
  Database,
  HardDrive,
  Cpu,
  ArrowRight,
  Sparkles,
  Search,
  CheckCircle2,
  Calendar,
  Layers,
  History,
  RotateCcw,
  Zap,
} from "lucide-react";

type MemoryTab = "all" | "semantic" | "episodic" | "procedural";

export default function AgentMemoryArchitectureVisualizer() {
  const [activeTab, setActiveTab] = useState<MemoryTab>("all");
  const [sessionDay, setSessionDay] = useState<"day1" | "day30">("day1");

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-4 sm:p-6 shadow-sm dark:shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400 px-2.5 py-0.5 rounded-full bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30">
              Interactive Dual-Memory Architecture
            </span>
            <span className="text-[11px] font-mono text-slate-500">RAM vs SSD</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-1">
            Short-Term (RAM) vs. Long-Term (Vault) Memory
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Compare volatile in-context working scratchpad with persistent multi-session memory
          </p>
        </div>

        {/* Multi-Session Time Jump Switcher */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono self-start sm:self-center shadow-sm">
          <button
            onClick={() => setSessionDay("day1")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all touch-manipulation active:scale-95 ${
              sessionDay === "day1"
                ? "bg-teal-600 text-white font-bold shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Day 1: Onboarding</span>
          </button>
          <button
            onClick={() => setSessionDay("day30")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all touch-manipulation active:scale-95 ${
              sessionDay === "day30"
                ? "bg-teal-600 text-white font-bold shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Day 30: Persistent Recall</span>
          </button>
        </div>
      </div>

      {/* Main Dual Architecture Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Short-Term Memory (In-Context RAM) */}
        <div className="lg:col-span-6 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 space-y-3 shadow-sm">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 text-sky-700 dark:text-sky-400 font-bold text-xs font-mono">
              <Cpu className="w-4 h-4" />
              <span>SHORT-TERM MEMORY (In-Context RAM)</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-100 dark:bg-sky-500/20 text-sky-800 dark:text-sky-300 font-bold">
              Volatile
            </span>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Lives strictly inside the active context window. Fast, instantaneous to read, but erased the moment the session closes.
          </p>

          <div className="p-3 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono space-y-2 shadow-sm">
            <span className="text-slate-400 text-[10px] uppercase block">
              Active Context Buffer:
            </span>
            {sessionDay === "day1" ? (
              <div className="space-y-1 text-slate-700 dark:text-slate-300">
                <div>[Turn 1] User: &quot;I work in Python backend and deploy on AWS.&quot;</div>
                <div>[Turn 2] Agent: &quot;Got it! I will remember your AWS and Python stack.&quot;</div>
                <div className="text-sky-700 dark:text-sky-400 font-bold pt-1">
                  ✓ Active in context window (Tokens: ~240)
                </div>
              </div>
            ) : (
              <div className="space-y-1 text-slate-700 dark:text-slate-300">
                <div>[Turn 1] User: &quot;Draft a deployment script for our service.&quot;</div>
                <div className="text-slate-500 text-[11px] italic">
                  Note: User did not mention Python or AWS in this prompt!
                </div>
                <div className="text-emerald-700 dark:text-emerald-400 font-bold pt-1">
                  ⚡ Retrieved from Long-Term Vault into Context: &quot;Stack: Python + AWS ECS&quot;
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Long-Term Memory (Persistent Vault) */}
        <div className="lg:col-span-6 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 space-y-3 shadow-sm">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 text-teal-700 dark:text-teal-400 font-bold text-xs font-mono">
              <HardDrive className="w-4 h-4" />
              <span>LONG-TERM MEMORY (Vector &amp; Relational Vault)</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-100 dark:bg-teal-500/20 text-teal-800 dark:text-teal-300 font-bold">
              Persistent
            </span>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Persisted outside the LLM in vector databases (Chroma, Pinecone) or PostgreSQL. Survives browser restarts and lasts across months.
          </p>

          <div className="p-3 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono space-y-2 shadow-sm">
            <span className="text-slate-400 text-[10px] uppercase block">
              Indexed Memory Records:
            </span>
            <div className="space-y-1 text-xs">
              <div className="p-2 rounded bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="text-purple-700 dark:text-purple-400 font-bold block">[Semantic Memory]:</span>
                <span className="text-slate-700 dark:text-slate-300">&quot;User Tech Stack: Python 3.11, FastAPI, AWS ECS, PostgreSQL&quot;</span>
              </div>
              <div className="p-2 rounded bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="text-sky-700 dark:text-sky-400 font-bold block">[Episodic Memory]:</span>
                <span className="text-slate-700 dark:text-slate-300">&quot;Day 1: Onboarded user, established AWS ECS architecture&quot;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
