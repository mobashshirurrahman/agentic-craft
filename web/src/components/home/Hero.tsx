"use client";

import React from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Terminal,
  ShieldCheck,
  Compass,
  Cpu,
  Layers,
  BookOpen,
} from "lucide-react";
import AgenticLoopVisualizer from "@/components/interactive/AgenticLoopVisualizer";

export default function Hero() {
  return (
    <div className="relative pt-12 pb-20 overflow-hidden">
      {/* Glow gradient orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-teal-500/15 via-sky-500/10 to-purple-600/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Announcement Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-teal-500/30 shadow-lg shadow-teal-500/10 backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
            <span className="text-xs font-mono font-medium text-slate-200">
              59 In-Depth Lessons • 4 Mastery Levels
            </span>
            <span className="text-xs text-teal-400 font-semibold flex items-center">
              100% Practical Learning <ArrowRight className="w-3 h-3 ml-0.5" />
            </span>
          </div>
        </div>

        {/* Main Title & Subtitle */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
            Master <span className="bg-gradient-to-r from-teal-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent">Agentic AI</span>
            <br />
            From Scratch to Production Systems
          </h1>
          <p className="mt-5 text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
            Clear, visual, and practical. Learn how autonomous agents actually work under the hood—from LLM reasoning and MCP tools to LangGraph state machines and multi-agent swarms.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/learn/level-1/module-1-1"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold text-sm tracking-wide shadow-xl shadow-teal-500/25 hover:shadow-teal-500/35 transition flex items-center gap-2"
            >
              <span>Start Module 1.1 Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="#curriculum"
              className="px-5 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-sm transition flex items-center gap-2 shadow-inner"
            >
              <Compass className="w-4 h-4 text-sky-400" />
              <span>Explore Curriculum (59 Modules)</span>
            </Link>
          </div>

          {/* Value Props Strip */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 text-left max-w-3xl mx-auto">
            <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
              <span className="text-[11px] font-mono text-teal-400 block font-bold">Hands-On Code</span>
              <span className="text-xs text-slate-300">Clean, runnable Python examples</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
              <span className="text-[11px] font-mono text-sky-400 block font-bold">Clear & Intuitive</span>
              <span className="text-xs text-slate-300">Everyday analogies & zero jargon</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
              <span className="text-[11px] font-mono text-violet-400 block font-bold">Video-Smooth Motion</span>
              <span className="text-xs text-slate-300">Interactive 60fps GPU state graphs</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
              <span className="text-[11px] font-mono text-amber-400 block font-bold">Production-Ready</span>
              <span className="text-xs text-slate-300">LangGraph, MCP & FastAPI</span>
            </div>
          </div>
        </div>

        {/* Live Interactive Simulator Section */}
        <div id="simulator" className="mt-14 max-w-5xl mx-auto scroll-mt-24">
          <div className="text-center mb-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400">
              Try It Live
            </span>
            <h3 className="text-2xl font-bold text-white mt-1">
              Interactive Agent Execution Simulator
            </h3>
            <p className="text-xs md:text-sm text-slate-400 mt-1">
              Watch how an autonomous agent receives an objective, deliberates, invokes tools via MCP, and reflects before returning an answer.
            </p>
          </div>
          <AgenticLoopVisualizer />
        </div>
      </div>
    </div>
  );
}
