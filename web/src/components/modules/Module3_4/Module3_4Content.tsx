"use client";

import React from "react";
import {
  Usb,
  CheckCircle2,
  Code2,
  Layers,
  Sparkles,
  Plug,
  Database,
  Lightbulb,
} from "lucide-react";
import McpArchitectureStudio from "./McpArchitectureStudio";
import Module3_4Quiz from "./Module3_4Quiz";

export default function Module3_4Content() {
  return (
    <div className="space-y-10">
      {/* Hero Banner */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-slate-50 dark:to-slate-950 p-6 md:p-8 relative overflow-hidden transition-colors">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
              Module 3.4 • Advanced Patterns
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              ~20 min hands-on
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Enabling Tool Interoperability with MCP
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Before USB-C, every laptop had a different proprietary charger. The <strong>Model Context Protocol (MCP)</strong> is the universal USB-C for AI: an open standard allowing any AI application to seamlessly plug into databases, developer tools, and filesystems without writing custom glue code.
          </p>
        </div>
      </div>

      {/* Section 1: The M x N Integration Problem */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-emerald-500" />
          1. From M × N Spaghetti to M + N Simplicity
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-red-200 dark:border-red-900/40 bg-red-50/50 dark:bg-red-950/20 space-y-2">
            <span className="text-xs font-mono font-bold text-red-700 dark:text-red-400 uppercase flex items-center gap-1.5">
              ⚠️ The Old Way (M × N Integrations)
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              5 AI agents (Claude, Cursor, custom LangGraph, etc.) connecting to 10 tools required <strong>50 custom integrations</strong>. Every tool update broke multiple apps.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/50 dark:bg-emerald-950/20 space-y-2">
            <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 uppercase flex items-center gap-1.5">
              ✅ The MCP Standard (M + N Universal)
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Every app implements 1 MCP Client; every tool exposes 1 MCP Server. 5 agents + 10 tools = <strong>15 clean interfaces</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: MCP Core Architecture */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Plug className="w-5 h-5 text-teal-500" />
          2. The Three Architectural Pillars of MCP
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
            <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase">
              1. Host Application
            </span>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white">Where Users Interact</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              The AI environment (e.g., Claude Desktop, Cursor IDE, or your LangGraph agent). Initiates tool discovery.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
            <span className="text-xs font-mono font-bold text-teal-600 dark:text-teal-400 uppercase">
              2. Transport Layer
            </span>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white">The Wire Connection</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Communicates via JSON-RPC 2.0 over <code>stdio</code> (local subprocess) or <code>SSE</code> (Server-Sent Events over HTTP).
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
            <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400 uppercase">
              3. MCP Server
            </span>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white">The Capability Provider</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Lightweight microservice exposing <strong>Tools</strong> (functions to call), <strong>Resources</strong> (data to read), and <strong>Prompts</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Studio */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-500" />
            3. Interactive MCP Universal Plug-in Studio
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Wire Protocol Explorer
          </span>
        </div>
        <McpArchitectureStudio />
      </section>

      {/* Section 4: Golden Rule */}
      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 space-y-2">
        <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-semibold text-sm">
          <Lightbulb className="w-4 h-4 text-emerald-500 shrink-0" />
          Key Distinction: Tool Calling vs. MCP
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          MCP does not replace tool calling. Your agent's LLM still outputs tool arguments (<code>tool_calls</code>). MCP provides the open highway standardizing how your agent connects to, authorizes, and runs tools living across isolated servers.
        </p>
      </div>

      {/* Quiz */}
      <section className="space-y-4">
        <Module3_4Quiz />
      </section>
    </div>
  );
}
