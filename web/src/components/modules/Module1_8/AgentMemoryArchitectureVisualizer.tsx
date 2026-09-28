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
  const [isSimulatingRetrieval, setIsSimulatingRetrieval] = useState<boolean>(false);
  const [sessionDay, setSessionDay] = useState<"day1" | "day30">("day1");

  return (
    <div className="rounded-2xl border border-slate-700/60 bg-slate-900/90 dark:bg-slate-900/90 light:bg-white light:border-slate-300 shadow-xl overflow-hidden my-8">
      {/* Header */}
      <div className="border-b border-slate-700/60 dark:border-slate-700/60 light:border-slate-200 px-5 py-4 bg-slate-800/50 dark:bg-slate-800/50 light:bg-slate-50 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-teal-400 animate-pulse" />
            <h3 className="font-bold text-base md:text-lg text-white dark:text-white light:text-slate-900">
              Interactive Dual-Memory Architecture Visualizer
            </h3>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 mt-0.5">
            Short-Term Working Context (RAM) vs. Long-Term Persistent Knowledge Vault (SSD).
          </p>
        </div>

        {/* Multi-Session Time Jump Switcher */}
        <div className="flex items-center bg-slate-900/80 dark:bg-slate-900/80 light:bg-slate-200 p-1 rounded-xl border border-slate-700/80 dark:border-slate-700/80 light:border-slate-300">
          <button
            onClick={() => setSessionDay("day1")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              sessionDay === "day1"
                ? "bg-teal-500 text-slate-950 font-bold shadow-sm"
                : "text-slate-400 dark:text-slate-400 light:text-slate-700 hover:text-white dark:hover:text-white"
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Day 1: Initial Onboarding</span>
          </button>
          <button
            onClick={() => setSessionDay("day30")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              sessionDay === "day30"
                ? "bg-teal-500 text-slate-950 font-bold shadow-sm"
                : "text-slate-400 dark:text-slate-400 light:text-slate-700 hover:text-white dark:hover:text-white"
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Day 30: Brand New Session</span>
          </button>
        </div>
      </div>

      <div className="p-5 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Short-Term Memory (Working Context Window) */}
        <div className="lg:col-span-6 flex flex-col justify-between gap-4">
          <div className="bg-slate-800/40 dark:bg-slate-800/40 light:bg-slate-50 border border-slate-700/50 dark:border-slate-700/50 light:border-slate-200 rounded-xl p-4 flex flex-col flex-1">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-700/60 dark:border-slate-700/60 light:border-slate-200">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-sky-400" />
                <h4 className="text-sm font-bold text-white dark:text-white light:text-slate-900">
                  Short-Term Memory (Context Window / RAM)
                </h4>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-sky-500/20 text-sky-300 font-bold">
                Session Scope Only
              </span>
            </div>

            <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600 mb-3 leading-relaxed">
              Holds active conversation turns, task scratchpad, intermediate tool outputs, and working variables for the immediate interaction.
            </p>

            {/* Conversation Window Display */}
            <div className="space-y-2.5 flex-1 font-mono text-xs">
              {sessionDay === "day1" ? (
                <>
                  <div className="p-2.5 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-200 dark:text-sky-200 light:text-sky-800">
                    <span className="font-bold block text-[10px] uppercase text-sky-400">User (Turn 1):</span>
                    "Hello! My name is Rahul. I lead backend engineering at FinCorp. We build exclusively in Python and use PostgreSQL."
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-200 text-slate-300 dark:text-slate-300 light:text-slate-800">
                    <span className="font-bold block text-[10px] uppercase text-teal-400">Agent (Turn 1):</span>
                    "Great to meet you, Rahul! I have noted your stack (Python + PostgreSQL at FinCorp). How can I assist today?"
                  </div>
                  <div className="p-2.5 rounded-lg border border-teal-500/40 bg-teal-500/10 text-teal-300 text-[11px] font-mono">
                    ⚡ <strong>Background Memory Worker:</strong> Automatically extracted 3 facts and persisted to Long-Term Memory Vault!
                  </div>
                </>
              ) : (
                <>
                  <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px]">
                    ℹ️ <strong>Fresh Session Notice:</strong> Short-term conversation history was cleared when the session ended 30 days ago.
                  </div>
                  <div className="p-2.5 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-200 dark:text-sky-200 light:text-sky-800">
                    <span className="font-bold block text-[10px] uppercase text-sky-400">User (Day 30, Turn 1):</span>
                    "Hey, generate a production database connection pool script for our services."
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-200 text-slate-300 dark:text-slate-300 light:text-slate-800">
                    <span className="font-bold block text-[10px] uppercase text-teal-400">Agent Response (Synthesized with Long-Term Memory):</span>
                    "Welcome back, Rahul! Here is a production connection pool using <strong>asyncpg</strong> in <strong>Python</strong> for your <strong>PostgreSQL</strong> cluster at FinCorp..."
                  </div>
                </>
              )}
            </div>

            {/* Context prep button */}
            {sessionDay === "day30" && (
              <button
                onClick={() => {
                  setIsSimulatingRetrieval(true);
                  setTimeout(() => setIsSimulatingRetrieval(false), 1200);
                }}
                className="mt-3 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold bg-sky-500 text-slate-950 hover:bg-sky-400 transition cursor-pointer"
              >
                <Search className="w-3.5 h-3.5" />
                <span>{isSimulatingRetrieval ? "Querying Vector Memory Vault..." : "Simulate Memory Retrieval Injection"}</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Long-Term Memory Vault */}
        <div className="lg:col-span-6 flex flex-col justify-between gap-4">
          <div className="bg-slate-800/40 dark:bg-slate-800/40 light:bg-slate-50 border border-slate-700/50 dark:border-slate-700/50 light:border-slate-200 rounded-xl p-4 flex flex-col flex-1">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-700/60 dark:border-slate-700/60 light:border-slate-200">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-teal-400" />
                <h4 className="text-sm font-bold text-white dark:text-white light:text-slate-900">
                  Long-Term Persistent Memory Vault
                </h4>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-teal-500/20 text-teal-300 font-bold">
                Survives Across Months
              </span>
            </div>

            {/* 3 Classical Long-Term Memory Categories */}
            <div className="flex items-center gap-1 bg-slate-900/60 dark:bg-slate-900/60 light:bg-slate-200 p-1 rounded-lg border border-slate-800 dark:border-slate-800 light:border-slate-300 mb-3 text-xs font-semibold">
              <button
                onClick={() => setActiveTab("all")}
                className={`flex-1 py-1 rounded text-center transition ${
                  activeTab === "all" ? "bg-teal-500 text-slate-950 font-bold" : "text-slate-400 hover:text-white"
                }`}
              >
                All (3)
              </button>
              <button
                onClick={() => setActiveTab("semantic")}
                className={`flex-1 py-1 rounded text-center transition ${
                  activeTab === "semantic" ? "bg-teal-500 text-slate-950 font-bold" : "text-slate-400 hover:text-white"
                }`}
              >
                Semantic
              </button>
              <button
                onClick={() => setActiveTab("episodic")}
                className={`flex-1 py-1 rounded text-center transition ${
                  activeTab === "episodic" ? "bg-teal-500 text-slate-950 font-bold" : "text-slate-400 hover:text-white"
                }`}
              >
                Episodic
              </button>
              <button
                onClick={() => setActiveTab("procedural")}
                className={`flex-1 py-1 rounded text-center transition ${
                  activeTab === "procedural" ? "bg-teal-500 text-slate-950 font-bold" : "text-slate-400 hover:text-white"
                }`}
              >
                Procedural
              </button>
            </div>

            {/* Memory Items Cards */}
            <div className="space-y-2.5 flex-1 font-mono text-xs">
              {(activeTab === "all" || activeTab === "semantic") && (
                <div className="p-3 rounded-lg border border-purple-500/40 bg-purple-500/10 text-purple-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-[10px] text-purple-400 uppercase">Semantic Memory (Facts & Knowledge)</span>
                    <span className="text-[10px] text-slate-400">Vector Store (Pinecone)</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    • <strong>User Profile:</strong> Name: Rahul | Title: Lead Engineer at FinCorp
                    <br />
                    • <strong>Tech Stack:</strong> Primary Language: Python | Database: PostgreSQL
                  </p>
                </div>
              )}

              {(activeTab === "all" || activeTab === "episodic") && (
                <div className="p-3 rounded-lg border border-sky-500/40 bg-sky-500/10 text-sky-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-[10px] text-sky-400 uppercase">Episodic Memory (Events & Experiences)</span>
                    <span className="text-[10px] text-slate-400">Relational DB (Postgres)</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    • <strong>2026-08-29 (Session #01):</strong> Rahul successfully completed architecture review for FinCorp's ledger engine.
                  </p>
                </div>
              )}

              {(activeTab === "all" || activeTab === "procedural") && (
                <div className="p-3 rounded-lg border border-emerald-500/40 bg-emerald-500/10 text-emerald-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-[10px] text-emerald-400 uppercase">Procedural Memory (Rules & Skills)</span>
                    <span className="text-[10px] text-slate-400">Rules / System Prompt</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    • <strong>FinCorp Security Policy:</strong> Always enforce connection pool limits (`max_connections=20`) and type hints in all Python code.
                  </p>
                </div>
              )}
            </div>

            {/* Storage note */}
            <div className="mt-3 p-2.5 rounded-lg bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-200 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Persistence Layer:</span>
              <span className="text-teal-400 font-bold">Hybrid Vector + PostgreSQL</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
