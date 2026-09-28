"use client";

import React from "react";
import Link from "next/link";
import {
  Wrench,
  Cpu,
  Database,
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe,
  Mail,
  Calculator,
  HardDrive,
  CreditCard,
  Network,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Sparkles,
  BookOpen,
  Terminal,
  FileCode,
  Lock,
} from "lucide-react";
import ToolCallingCycleVisualizer from "./ToolCallingCycleVisualizer";
import ToolExecutionStudio from "./ToolExecutionStudio";
import Module1_5Quiz from "./Module1_5Quiz";

export default function Module1_5Content() {
  return (
    <div className="space-y-12">
      {/* SECTION 1: Friendly Welcome & The Core Analogy */}
      <section className="rounded-2xl border border-teal-500/30 bg-gradient-to-br from-teal-500/10 via-slate-900/80 to-slate-950 p-6 md:p-8 relative overflow-hidden dark:from-teal-500/10 dark:via-slate-900/80 dark:to-slate-950 light:from-teal-50 light:via-white light:to-slate-50 light:border-teal-200">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-500/40 text-teal-300 dark:text-teal-300 light:text-teal-700 text-xs font-mono font-semibold mb-4">
            <Wrench className="w-3.5 h-3.5" />
            <span>Module 1.5 • Foundations & Architecture</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold text-white dark:text-white light:text-slate-900 tracking-tight">
            Hello and Welcome! Let's Master How AI Agents Use Tools
          </h2>

          <p className="mt-3 text-slate-300 dark:text-slate-300 light:text-slate-700 text-sm md:text-base leading-relaxed">
            In our previous modules, we saw how agents reason and navigate the spectrum of autonomy. But here is the elephant in the room: <em>even the most brilliant LLM in the world cannot know what time it is, cannot look up today's stock price, cannot verify your bank balance, and cannot send an email on its own!</em>
          </p>

          {/* The Doctor in the Glass Room Analogy */}
          <div className="mt-6 p-5 rounded-xl border border-teal-500/40 bg-teal-950/30 dark:bg-teal-950/30 light:bg-teal-50/80 flex flex-col md:flex-row gap-4 items-start">
            <div className="w-12 h-12 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400 flex-shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white dark:text-white light:text-slate-900 text-base">
                The Intuition: The Surgeon in a Soundproof Glass Room
              </h4>
              <p className="text-xs md:text-sm text-slate-300 dark:text-slate-300 light:text-slate-700 mt-1 leading-relaxed">
                Imagine a world-renowned surgeon who has memorized every medical encyclopedia. But they are trapped inside an airtight glass room without a stethoscope, thermometer, X-ray machine, or scalpel. Can they heal a patient standing outside? <strong>No!</strong> They have vast intelligence, but <em>zero physical instruments to perceive live vitals or execute treatment</em>.
              </p>
              <p className="text-xs md:text-sm text-teal-300 dark:text-teal-300 light:text-teal-800 mt-2 font-medium">
                Tools are the stethoscope, calculator, database key, and scalpel that connect an LLM's frozen brain to the living, changing outside world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: What are Tools & Why are they needed? */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
            <Cpu className="w-4 h-4" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white dark:text-white light:text-slate-900">
            What are Tools? (And Why LLMs Alone Fall Short)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Definition Card */}
          <div className="rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-900/60 dark:bg-slate-900/60 light:bg-white p-5 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider block mb-2">
                Formal Definition
              </span>
              <h4 className="text-base font-bold text-white dark:text-white light:text-slate-900 mb-2">
                External Functions, Services, or APIs
              </h4>
              <p className="text-xs md:text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
                Tools are programmatically callable functions, APIs, or system utilities that an AI agent can invoke to interact with environments beyond its trained weights. They act as the ultimate bridge between <strong>text generation</strong> and <strong>real-world action</strong>.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 dark:border-slate-800 light:border-slate-100 flex items-center gap-2 text-xs font-mono text-teal-300 dark:text-teal-300 light:text-teal-700">
              <CheckCircle2 className="w-4 h-4 text-teal-400" />
              <span>Bridge: Generation ➔ Real-World Impact</span>
            </div>
          </div>

          {/* Why Needed: The 4 LLM Limitations */}
          <div className="rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-900/60 dark:bg-slate-900/60 light:bg-white p-5">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block mb-2">
              The 4 Hard Limitations of Standalone LLMs
            </span>
            <ul className="space-y-2.5 text-xs md:text-sm text-slate-300 dark:text-slate-300 light:text-slate-600">
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>
                  <strong>Cannot access real-time information:</strong> Neural weights are frozen upon training cutoff. A model cannot know today's weather or currency exchange rates.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>
                  <strong>Cannot modify databases or files:</strong> LLMs only produce strings. Without file system or SQL write tools, they cannot store or update state.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>
                  <strong>Cannot perform calculations reliably:</strong> Multi-digit multiplication, logarithms, and financial compounding suffer from token hallucination.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>
                  <strong>Cannot interact with external services:</strong> LLMs cannot trigger webhooks, ping Stripe for payments, or push commits to GitHub.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 3: Common Actions: Read Actions vs. Write Actions */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
            <Database className="w-4 h-4" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white dark:text-white light:text-slate-900">
            Common Actions: Read Actions vs. Write Actions
          </h3>
        </div>

        <p className="text-xs md:text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
          In production software engineering, not all tool calls are created equal. Every tool you equip your agent with falls into one of two fundamental operational categories:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Read Actions */}
          <div className="rounded-xl border border-teal-500/40 bg-teal-500/5 dark:bg-teal-500/5 light:bg-teal-50/50 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-base md:text-lg text-white dark:text-white light:text-slate-900 flex items-center gap-2">
                  <span>📖 Read Actions</span>
                </h4>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-teal-500/20 text-teal-300 dark:text-teal-300 light:text-teal-800">
                  Idempotent • Safe
                </span>
              </div>
              <p className="text-xs md:text-sm text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed mb-4">
                Retrieving data from external sources <strong>without modifying system state</strong>. You can run a read action 100 times consecutively and the external world remains unchanged.
              </p>
              <div className="space-y-2 text-xs font-mono text-slate-300 dark:text-slate-300 light:text-slate-800">
                <div className="p-2 rounded bg-slate-900/60 dark:bg-slate-900/60 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200">
                  ✓ Fetch live weather data (OpenWeatherMap API)
                </div>
                <div className="p-2 rounded bg-slate-900/60 dark:bg-slate-900/60 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200">
                  ✓ Query database records (<code className="text-teal-400">SELECT * FROM orders</code>)
                </div>
                <div className="p-2 rounded bg-slate-900/60 dark:bg-slate-900/60 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200">
                  ✓ Search the live web (Google / Tavily Search API)
                </div>
                <div className="p-2 rounded bg-slate-900/60 dark:bg-slate-900/60 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200">
                  ✓ Read files from local disk or cloud bucket
                </div>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-teal-500/20 text-xs text-teal-300 dark:text-teal-300 light:text-teal-800 font-semibold">
              Governance: Can safely run with full autonomy.
            </div>
          </div>

          {/* Write Actions */}
          <div className="rounded-xl border border-amber-500/40 bg-amber-500/5 dark:bg-amber-500/5 light:bg-amber-50/50 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-base md:text-lg text-white dark:text-white light:text-slate-900 flex items-center gap-2">
                  <span>✍️ Write Actions</span>
                </h4>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 dark:text-amber-300 light:text-amber-800">
                  State Mutating • High Consequence
                </span>
              </div>
              <p className="text-xs md:text-sm text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed mb-4">
                Modifying, creating, or deleting data in external systems. These actions <strong>alter the state of the world</strong> and cannot easily be rolled back.
              </p>
              <div className="space-y-2 text-xs font-mono text-slate-300 dark:text-slate-300 light:text-slate-800">
                <div className="p-2 rounded bg-slate-900/60 dark:bg-slate-900/60 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200">
                  ⚠️ Send emails to clients (SMTP / Gmail API)
                </div>
                <div className="p-2 rounded bg-slate-900/60 dark:bg-slate-900/60 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200">
                  ⚠️ Mutate database (<code className="text-amber-400">UPDATE accounts SET balance = ...</code>)
                </div>
                <div className="p-2 rounded bg-slate-900/60 dark:bg-slate-900/60 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200">
                  ⚠️ Create, overwrite, or delete local system files
                </div>
                <div className="p-2 rounded bg-slate-900/60 dark:bg-slate-900/60 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200">
                  ⚠️ Trigger external webhooks or charge credit cards
                </div>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-amber-500/20 text-xs text-amber-300 dark:text-amber-300 light:text-amber-800 font-semibold">
              Governance: Requires strict validation & Human-in-the-Loop gates.
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: The 5 Common Tool Categories */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
            <Layers className="w-4 h-4" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white dark:text-white light:text-slate-900">
            The 5 Common Tool Categories
          </h3>
        </div>

        <p className="text-xs md:text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
          Virtually all production tools used in agentic systems cluster into 5 core domains:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Category 1 */}
          <div className="rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-900/60 dark:bg-slate-900/60 light:bg-white p-4">
            <div className="flex items-center gap-2.5 text-teal-400 mb-2">
              <Globe className="w-4 h-4" />
              <h4 className="font-bold text-sm text-white dark:text-white light:text-slate-900">
                1. Information Retrieval
              </h4>
            </div>
            <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600 mb-2">
              Pulling dynamic external data into the model context.
            </p>
            <ul className="text-[11px] font-mono text-slate-400 space-y-1">
              <li>• Web search APIs (Google, Tavily)</li>
              <li>• SQL / NoSQL database queries</li>
              <li>• Vector databases (Pinecone, OpenSearch)</li>
            </ul>
          </div>

          {/* Category 2 */}
          <div className="rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-900/60 dark:bg-slate-900/60 light:bg-white p-4">
            <div className="flex items-center gap-2.5 text-cyan-400 mb-2">
              <Mail className="w-4 h-4" />
              <h4 className="font-bold text-sm text-white dark:text-white light:text-slate-900">
                2. Communication
              </h4>
            </div>
            <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600 mb-2">
              Connecting the agent to human collaboration channels.
            </p>
            <ul className="text-[11px] font-mono text-slate-400 space-y-1">
              <li>• Email services (SMTP, Gmail API)</li>
              <li>• Messaging platforms (Slack, Teams)</li>
              <li>• Issue trackers (Jira, GitHub Issues)</li>
            </ul>
          </div>

          {/* Category 3 */}
          <div className="rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-900/60 dark:bg-slate-900/60 light:bg-white p-4">
            <div className="flex items-center gap-2.5 text-purple-400 mb-2">
              <Calculator className="w-4 h-4" />
              <h4 className="font-bold text-sm text-white dark:text-white light:text-slate-900">
                3. Computation
              </h4>
            </div>
            <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600 mb-2">
              Executing exact math and arbitrary logic via sandboxes.
            </p>
            <ul className="text-[11px] font-mono text-slate-400 space-y-1">
              <li>• Code execution (Python REPL, Bash)</li>
              <li>• Financial calculator functions</li>
              <li>• Symbolic mathematical solvers (SymPy)</li>
            </ul>
          </div>

          {/* Category 4 */}
          <div className="rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-900/60 dark:bg-slate-900/60 light:bg-white p-4">
            <div className="flex items-center gap-2.5 text-amber-400 mb-2">
              <HardDrive className="w-4 h-4" />
              <h4 className="font-bold text-sm text-white dark:text-white light:text-slate-900">
                4. Data Manipulation
              </h4>
            </div>
            <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600 mb-2">
              Managing files, storage schemas, and transformations.
            </p>
            <ul className="text-[11px] font-mono text-slate-400 space-y-1">
              <li>• File operations (read, write, delete)</li>
              <li>• Relational database record updates</li>
              <li>• Data formatting (JSON to CSV, schema casts)</li>
            </ul>
          </div>

          {/* Category 5 */}
          <div className="rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-900/60 dark:bg-slate-900/60 light:bg-white p-4 sm:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2.5 text-emerald-400 mb-2">
              <CreditCard className="w-4 h-4" />
              <h4 className="font-bold text-sm text-white dark:text-white light:text-slate-900">
                5. External SaaS & Operational Services
              </h4>
            </div>
            <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600 mb-2">
              Triggering domain-specific enterprise actions with third-party software.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] font-mono text-slate-400">
              <div>• Payment gateways (Stripe, Razorpay)</div>
              <div>• Calendar systems (Google Calendar)</div>
              <div>• Enterprise CRMs (Salesforce, HubSpot)</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: The 8-Step Tool Calling Process (Interactive Explorer) */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
            <Zap className="w-4 h-4" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white dark:text-white light:text-slate-900">
            The 8-Step Tool Calling Process (Interactive Visualizer)
          </h3>
        </div>

        <p className="text-xs md:text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
          How does a user prompt turn into an API call and back into an answer? Follow the exact sequence below. Toggle between <strong>Read Actions</strong> and <strong>Write Actions</strong> to see how safety confirmation gates guard state mutations!
        </p>

        {/* Embedded Interactive 8-step Stepper */}
        <ToolCallingCycleVisualizer />
      </section>

      {/* SECTION 6: Tool Definition & Registration Patterns */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
            <FileCode className="w-4 h-4" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white dark:text-white light:text-slate-900">
            Tool Definition & Registration: How LLMs Actually "See" Tools
          </h3>
        </div>

        <p className="text-xs md:text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
          A common beginner misconception is that you pass raw Python source code to the LLM. <strong>You don't!</strong> The LLM is an API service running on a remote GPU cluster. It never runs your Python interpreter.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-900/60 dark:bg-slate-900/60 light:bg-white">
            <span className="text-xs font-mono font-bold text-teal-400 block mb-1">Step 1: Python Decorator</span>
            <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600">
              You write a standard Python function decorated with <code className="text-teal-300">@tool</code> or Pydantic type annotations.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-900/60 dark:bg-slate-900/60 light:bg-white">
            <span className="text-xs font-mono font-bold text-cyan-400 block mb-1">Step 2: JSON Schema Compilation</span>
            <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600">
              Your framework (LangChain, LangGraph, or raw OpenAI SDK) extracts the docstring and converts type hints into a strict JSON Schema object.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-900/60 dark:bg-slate-900/60 light:bg-white">
            <span className="text-xs font-mono font-bold text-purple-400 block mb-1">Step 3: Wire Transmission</span>
            <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600">
              The JSON schema is bundled alongside the system prompt in the <code className="text-purple-300">tools=[...]</code> parameter on each API call.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 7: Model Context Protocol (MCP) & Interactive Studio */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
            <Network className="w-4 h-4" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white dark:text-white light:text-slate-900">
            The MCP Revolution: Model Context Protocol
          </h3>
        </div>

        <div className="rounded-xl border border-cyan-500/30 bg-gradient-to-r from-cyan-500/10 via-slate-900/60 to-transparent p-5 text-xs md:text-sm text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed">
          <strong className="text-cyan-300 dark:text-cyan-300 light:text-cyan-700 block text-base mb-1">
            Why Model Context Protocol (MCP) Changes Everything
          </strong>
          Traditionally, every AI agent framework had to write bespoke custom connectors for every external tool (Slack connector, GitHub connector, PostgreSQL connector). If 5 frameworks support 20 tools, that's <strong>100 custom integrations to maintain</strong>!
          <br /><br />
          <strong>The MCP Standard (pioneered by Anthropic as an open standard):</strong> Build once, works everywhere. Tools run as independent <strong>MCP Servers</strong> communicating via standardized JSON-RPC over stdio or SSE. Any MCP-compatible AI agent (Claude Desktop, IDEs, LangGraph agents) can instantly connect, discover capabilities, and execute tools without rewriting a single line of adapter code!
        </div>

        {/* Embedded Interactive Code & MCP Studio */}
        <ToolExecutionStudio />
      </section>

      {/* SECTION 8: 5 Best Practices for Tool Engineering */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white dark:text-white light:text-slate-900">
            5 Best Practices for Production Tool Engineering
          </h3>
        </div>

        <div className="space-y-3">
          <div className="p-4 rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-900/60 dark:bg-slate-900/60 light:bg-white flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center font-mono font-bold text-xs flex-shrink-0 mt-0.5">
              1
            </div>
            <div>
              <h4 className="text-sm font-bold text-white dark:text-white light:text-slate-900">
                Ultra-Clear Tool Descriptions
              </h4>
              <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600 mt-0.5">
                The LLM chooses whether to call a tool solely based on your docstring! Explicitly state <em>what the tool does</em>, <em>when to use it</em>, and <em>when NOT to use it</em>.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-900/60 dark:bg-slate-900/60 light:bg-white flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center font-mono font-bold text-xs flex-shrink-0 mt-0.5">
              2
            </div>
            <div>
              <h4 className="text-sm font-bold text-white dark:text-white light:text-slate-900">
                Strict Input Validation (Pydantic / Type Enums)
              </h4>
              <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600 mt-0.5">
                Never pass raw unvalidated parameters directly to system commands or SQL queries. Use strict Pydantic types, regex constraints, and Enums to catch malformed model arguments early.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-900/60 dark:bg-slate-900/60 light:bg-white flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center font-mono font-bold text-xs flex-shrink-0 mt-0.5">
              3
            </div>
            <div>
              <h4 className="text-sm font-bold text-white dark:text-white light:text-slate-900">
                Resilient Error Handling & Informative Error Strings
              </h4>
              <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600 mt-0.5">
                Never let an exception crash your python process! Catch the error, format a clear explanation string (e.g. <code>"DatabaseError: table 'orders' does not have column 'price'. Did you mean 'total_price'?"</code>), and return it to the model so it can self-heal.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-900/60 dark:bg-slate-900/60 light:bg-white flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center font-mono font-bold text-xs flex-shrink-0 mt-0.5">
              4
            </div>
            <div>
              <h4 className="text-sm font-bold text-white dark:text-white light:text-slate-900">
                Appropriate Tool Granularity
              </h4>
              <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600 mt-0.5">
                Avoid monolithic mega-tools that do 5 different things. Keep tools atomic, focused, and composable so the agent can combine them dynamically.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-900/60 dark:bg-slate-900/60 light:bg-white flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center font-mono font-bold text-xs flex-shrink-0 mt-0.5">
              5
            </div>
            <div>
              <h4 className="text-sm font-bold text-white dark:text-white light:text-slate-900">
                Human-in-the-Loop Confirmation Gates for Write Actions
              </h4>
              <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600 mt-0.5">
                For irreversible operations—financial transactions, sending emails, dropping databases, or deleting files—always introduce an explicit confirmation gate before execution!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: Concept Check Quiz */}
      <section>
        <Module1_5Quiz />
      </section>

      {/* SECTION 10: Teacher Wrap-up & Bridge to Module 1.6 */}
      <section className="rounded-2xl border border-teal-500/40 bg-gradient-to-r from-teal-500/10 via-slate-900/70 to-slate-950 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 dark:from-teal-500/10 dark:via-slate-900/70 dark:to-slate-950 light:from-teal-50 light:via-white light:to-slate-50 light:border-teal-200">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-teal-400 font-mono text-xs uppercase tracking-wider font-bold">
            <BookOpen className="w-4 h-4" />
            <span>Teacher Summary • Module 1.5 Complete!</span>
          </div>
          <h4 className="text-lg md:text-xl font-bold text-white dark:text-white light:text-slate-900">
            You now understand how AI Agents reach out into the physical world!
          </h4>
          <p className="text-xs md:text-sm text-slate-300 dark:text-slate-300 light:text-slate-700 max-w-2xl leading-relaxed">
            We covered why tools are necessary, the vital difference between safe Read and consequential Write actions, the 8-step lifecycle, Pydantic tool schemas, and the universal Model Context Protocol (MCP).
            <br />
            Next up: <strong>Module 1.6: Fundamentals of the Agentic Loop</strong>, where we dive into how the agent continuously cycles through Thought, Action, and Observation until the goal is achieved!
          </p>
        </div>

        <Link
          href="/learn/level-1/module-1-6"
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs md:text-sm transition-all shadow-lg hover:shadow-teal-500/20 whitespace-nowrap flex-shrink-0 cursor-pointer"
        >
          <span>Next: Module 1.6</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
