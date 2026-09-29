"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  Check,
  ArrowRight,
  Wrench,
  Cpu,
  Database,
  Globe,
  Calculator,
  HardDrive,
  CreditCard,
  Network,
  HelpCircle,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  Layers,
  ShieldCheck,
  Code2,
} from "lucide-react";
import ToolCallingCycleVisualizer from "./ToolCallingCycleVisualizer";
import ToolExecutionStudio from "./ToolExecutionStudio";
import Module1_5Quiz from "./Module1_5Quiz";

export default function Module1_5Content() {
  const [selectedToolCat, setSelectedToolCat] = useState<string>("apis");
  const [showQuiz, setShowQuiz] = useState<boolean>(false);

  const toolCategories = [
    {
      id: "search",
      title: "1. Search & Web",
      tagline: "Live Information",
      desc: "Fetches live weather, stock tickers, recent documentation, and web content beyond model cutoff date.",
      icon: Globe,
      color: "text-sky-600 dark:text-sky-400",
      bg: "bg-sky-50 dark:bg-sky-500/10",
      border: "border-sky-200 dark:border-sky-500/30",
      badge: "Idempotent Read",
      codeSnippet: `@tool
def google_search(query: str, max_results: int = 5) -> list[dict]:
    """Retrieves live web search snippets for recent news and facts."""
    return search_api.get(query, limit=max_results)`,
    },
    {
      id: "math",
      title: "2. Math & Logic",
      tagline: "Deterministic Execution",
      desc: "Executes exact floating-point math, Python code interpreters, and statistical regression without hallucinating.",
      icon: Calculator,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      border: "border-emerald-200 dark:border-emerald-500/30",
      badge: "Pure Computation",
      codeSnippet: `@tool
def calculate_compound_interest(principal: float, rate: float, years: int) -> float:
    """Calculates deterministic compound interest formula: P * (1 + r)^t"""
    return round(principal * ((1 + rate) ** years), 2)`,
    },
    {
      id: "db",
      title: "3. DB & File I/O",
      tagline: "State & Retrieval",
      desc: "Executes parameterized SQL queries, vector embedding searches, and reads repo files safely.",
      icon: Database,
      color: "text-violet-600 dark:text-violet-400",
      bg: "bg-violet-50 dark:bg-violet-500/10",
      border: "border-violet-200 dark:border-violet-500/30",
      badge: "Structured Data",
      codeSnippet: `@tool
def query_customer_db(customer_id: int) -> dict:
    """Runs parameterized SQL SELECT on CRM database to retrieve client tier."""
    return db.execute("SELECT * FROM customers WHERE id = :id", {"id": customer_id})`,
    },
    {
      id: "apis",
      title: "4. Mutating APIs",
      tagline: "Real-World Action",
      desc: "Sends emails, charges Stripe accounts, triggers GitHub pull requests, and writes to production systems.",
      icon: CreditCard,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      border: "border-amber-200 dark:border-amber-500/30",
      badge: "Mutating Write (HITL)",
      codeSnippet: `@tool
def process_stripe_refund(charge_id: str, amount_usd: float) -> dict:
    """Issues Stripe refund. Mutates financial state; requires supervisor sign-off!"""
    return stripe.Refund.create(charge=charge_id, amount=int(amount_usd * 100))`,
    },
  ];

  const currentCategory =
    toolCategories.find((t) => t.id === selectedToolCat) || toolCategories[3];

  return (
    <div className="space-y-10 max-w-5xl mx-auto pb-16">
      {/* 🎯 TOP OBJECTIVE BANNER */}
      <section className="rounded-2xl border border-teal-200 dark:border-teal-500/30 bg-teal-50/60 dark:bg-teal-500/5 p-4 sm:p-6 backdrop-blur-sm shadow-sm">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-teal-600 text-white shrink-0 shadow-sm mt-0.5">
            <Target className="w-5 h-5" />
          </div>
          <div className="space-y-2 flex-1">
            <h2 className="text-sm font-mono uppercase tracking-wider text-teal-800 dark:text-teal-400 font-bold">
              🎯 By the end of this module, you will:
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                <span>Understand why frozen neural weights require external tools to interact with reality</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                <span>Master the 8-step tool execution loop from intent to observation ingestion</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                <span>Differentiate safe idempotent Read tools from mutating Write tools requiring HITL gates</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                <span>Explore the Model Context Protocol (MCP) universal client-server standard</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: THE SURGEON IN THE GLASS ROOM */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30 text-teal-700 dark:text-teal-400 font-mono text-xs font-bold">
            Section 1 • Grounding LLMs in Reality
          </span>
          <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
        </div>

        <div className="space-y-2">
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            The Surgeon in the Soundproof Glass Room
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Even the most capable frontier LLM cannot know what the current time is, cannot look up today&apos;s stock price, cannot verify a user&apos;s account balance, and cannot dispatch an email on its own.
          </p>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Neural network weights are frozen snapshots of past training data. <strong className="text-teal-700 dark:text-teal-400 font-semibold">Tools</strong> are the stethoscopes, calculators, databases, and API keys that give the model eyes and hands in the physical world.
          </p>
        </div>

        {/* Visual Analogy: Surgeon in Glass Room vs Surgeon with Instruments */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-1">
          <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-500/30 bg-rose-50/50 dark:bg-rose-950/10 space-y-2">
            <span className="text-xs font-mono font-bold uppercase text-rose-700 dark:text-rose-400 block">
              🔇 Trapped in the Glass Room (LLM Alone)
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              A brilliant physician who has memorized every textbook, but is locked inside a soundproof room without instruments. They cannot measure vitals or administer treatment.
            </p>
            <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/50 text-[11px] font-mono text-rose-700 dark:text-rose-400">
              Prompt: &quot;Check today&apos;s AAPL price&quot; ──▶ 💥 Hallucinated past price
            </div>
          </div>

          <div className="p-4 rounded-xl border border-teal-200 dark:border-teal-500/30 bg-teal-50/50 dark:bg-teal-950/10 space-y-2">
            <span className="text-xs font-mono font-bold uppercase text-teal-700 dark:text-teal-400 block">
              🩺 Equipped with Medical Instruments (Agent + Tools)
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              The surgeon is equipped with a digital stethoscope, real-time monitors, and laser scalpels. They perceive live patient vitals and execute precise interventions.
            </p>
            <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-teal-200 dark:border-teal-900/50 text-[11px] font-mono text-teal-700 dark:text-teal-400">
              Prompt: &quot;Check today&apos;s AAPL price&quot; ──▶ 🛠️ `fetch_ticker(&apos;AAPL&apos;)` ──▶ ✅ $224.50
            </div>
          </div>
        </div>

        {/* ✍️ HANDWRITTEN INSTRUCTOR NOTE */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-amber-50/90 dark:bg-amber-500/10 border border-amber-300 dark:border-amber-500/30 shadow-sm sm:-rotate-0.5 transition-transform">
          <div className="flex items-start gap-2.5">
            <span className="text-lg">✍️</span>
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-amber-950 dark:text-amber-300 font-mono uppercase tracking-wider block">
                Instructor Note • The Execution Boundary
              </span>
              <p className="text-xs sm:text-sm text-amber-950 dark:text-amber-200 font-handwriting leading-snug">
                &quot;Remember this fundamental law: The LLM NEVER runs python code or APIs itself. It only generates a JSON string declaring intent. Your host environment catches that string, validates it, runs the real function, and hands the result back!&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE 4 CORE TOOL CATEGORIES (INTERACTIVE GRID) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30 text-teal-700 dark:text-teal-400 font-mono text-xs font-bold">
            Section 2 • Tool Taxonomy
          </span>
          <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
        </div>

        <div className="space-y-1">
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            The 4 Core Tool Categories
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
            Select a category to inspect its schema definition and invocation signature:
          </p>
        </div>

        {/* 2x2 MOBILE / 4-COL DESKTOP SYMMETRICAL CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3.5">
          {toolCategories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedToolCat === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedToolCat(cat.id)}
                className={`p-3 sm:p-4 rounded-xl border text-left transition-all relative flex flex-col justify-between min-h-[145px] sm:min-h-[160px] touch-manipulation active:scale-95 ${
                  isSelected
                    ? "bg-white dark:bg-slate-900 border-teal-500 ring-2 ring-teal-500/20 shadow-md"
                    : "bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-2 rounded-lg ${cat.bg} ${cat.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                    )}
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-tight">
                    {cat.title}
                  </h4>
                  <p className="text-[10px] sm:text-xs font-mono text-teal-700 dark:text-teal-400 mt-0.5">
                    {cat.tagline}
                  </p>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mt-2">
                  {cat.desc}
                </p>
              </button>
            );
          })}
        </div>

        {/* Dynamic Deep-Dive Inspection Box */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCategory.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400">
                  Category: {currentCategory.title}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  {currentCategory.badge}
                </span>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                Python @tool Signature
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {currentCategory.desc}
            </p>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 overflow-x-auto">
              <pre className="text-[11px] sm:text-xs text-emerald-400 leading-relaxed">
                <code>{currentCategory.codeSnippet}</code>
              </pre>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* 💡 HANDWRITTEN MENTAL MODEL NOTE */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-teal-50/90 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30 shadow-sm">
          <div className="flex items-start gap-2.5">
            <span className="text-lg">💡</span>
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-teal-950 dark:text-teal-300 font-mono uppercase tracking-wider block">
                Mental Model • The Restaurant Waiter
              </span>
              <p className="text-xs sm:text-sm text-teal-950 dark:text-teal-200 font-handwriting leading-snug">
                &quot;The LLM is like a polite waiter who takes your order on a notepad (JSON). The waiter doesn&apos;t cook the meal or bake the bread—they pass the ticket to the kitchen (Runtime API), wait for the dish, and bring it back to your table!&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: READ VS WRITE & THE MCP STANDARD */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30 text-teal-700 dark:text-teal-400 font-mono text-xs font-bold">
            Section 3 • Safety &amp; Open Standards
          </span>
          <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
        </div>

        <div className="space-y-1">
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Read vs. Write Tools &amp; The Model Context Protocol
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
            In production agent engineering, two foundational concepts protect your systems and eliminate integration fragmentation:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 space-y-2 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-slate-900 dark:text-white">
                Read vs. Write Governance
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-500/30">
                Security Policy
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong>Read tools</strong> (querying weather, searching docs) are idempotent: executing them 10 times causes zero external side effects.
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong>Write tools</strong> (charging credit cards, dropping database tables, emailing customers) permanently alter external state and must always be protected with approval gates.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 space-y-2 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-slate-900 dark:text-white">
                Model Context Protocol (MCP)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-50 dark:bg-sky-500/10 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-500/30">
                Universal Standard
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Before MCP, every AI framework had to write custom connectors for Slack, GitHub, Postgres, and Linear (an M × N nightmare).
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              MCP establishes a universal JSON-RPC client-server protocol: tool creators build <strong>one MCP Server</strong>, and any compliant agent can immediately discover and run it!
            </p>
          </div>
        </div>

        {/* 📌 CORE RULE NOTE */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-sky-50/90 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/30 shadow-sm">
          <div className="flex items-start gap-2.5">
            <span className="text-lg">📌</span>
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-sky-950 dark:text-sky-300 font-mono uppercase tracking-wider block">
                The Strict Schema Contract Rule
              </span>
              <p className="text-xs sm:text-sm text-sky-950 dark:text-sky-200 font-handwriting leading-snug">
                &quot;Every tool description is a prompt to the model. Write docstrings like you are explaining the function to a junior developer: specify exactly what parameters mean, provide boundary constraints, and define return schemas!&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: IN-CONTEXT SIMULATION (ToolCallingCycleVisualizer) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30 text-teal-700 dark:text-teal-400 font-mono text-xs font-bold">
            Section 4 • Interactive Simulator
          </span>
          <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
        </div>

        <ToolCallingCycleVisualizer />
      </section>

      {/* SECTION 5: HANDS-ON TOOL STUDIO (ToolExecutionStudio) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30 text-teal-700 dark:text-teal-400 font-mono text-xs font-bold">
            Section 5 • Hands-On Code Laboratory
          </span>
          <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
        </div>

        <ToolExecutionStudio />

        {/* 📝 PRO-TIP NOTE */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-amber-50/90 dark:bg-amber-500/10 border border-amber-300 dark:border-amber-500/30 shadow-sm">
          <div className="flex items-start gap-2.5">
            <span className="text-lg">📝</span>
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-amber-950 dark:text-amber-300 font-mono uppercase tracking-wider block">
                Production Pro-Tip • Schema Self-Healing
              </span>
              <p className="text-xs sm:text-sm text-amber-950 dark:text-amber-200 font-handwriting leading-snug">
                &quot;When an LLM supplies invalid arguments that fail Pydantic validation, do not throw an unhandled exception! Catch the ValidationError, pass the exact error message back to the LLM as a tool result, and allow the model to self-correct its parameters on the next turn!&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: COMMON MISCONCEPTIONS (TRAPS) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30 text-rose-700 dark:text-rose-400 font-mono text-xs font-bold">
            Section 6 • Production Gotchas
          </span>
          <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-500/30 bg-rose-50/50 dark:bg-rose-950/10 space-y-2">
            <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold text-xs font-mono uppercase">
              <AlertTriangle className="w-4 h-4" />
              TRAP #1: Vague Docstrings &amp; Tool Confusion
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Giving tools generic descriptions like `def search(q): &quot;searches stuff&quot;` causes the agent to pick the wrong tool or hallucinate invalid argument formats.
            </p>
            <p className="text-xs text-rose-800 dark:text-rose-300 font-semibold pt-1">
              Fix: Write exhaustive docstrings detailing expected formats, boundary limits, and concrete examples.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-950/10 space-y-2">
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-xs font-mono uppercase">
              <AlertTriangle className="w-4 h-4" />
              TRAP #2: Raw Database Access Without Limits
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Exposing raw, unparameterized SQL execution to an LLM risks SQL injection, accidental table truncation, or runaway queries locking production clusters.
            </p>
            <p className="text-xs text-amber-800 dark:text-amber-300 font-semibold pt-1">
              Fix: Connect agents to read-only database replicas with strict query timeouts and parameterized Pydantic wrappers.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 7: KEY TAKEAWAYS & KNOWLEDGE CHECK */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30 text-teal-700 dark:text-teal-400 font-mono text-xs font-bold">
            Section 7 • Key Takeaways &amp; Quiz
          </span>
          <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
        </div>

        <div className="p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 space-y-3">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
            Summary Checklist
          </h4>
          <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
              <span>
                <strong>Tools bridge text generation to the real world:</strong> LLMs cannot know live data or compute complex math without external tools.
              </span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
              <span>
                <strong>Strict Pydantic schemas enforce type safety:</strong> JSON schema compilation ensures parameters conform to strict types, enabling self-healing recovery loops.
              </span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
              <span>
                <strong>Model Context Protocol (MCP) unifies tool ecosystems:</strong> Eliminates bespoke connectors by providing a universal JSON-RPC standard for agents and data sources.
              </span>
            </div>
          </div>
        </div>

        {/* Expandable Quiz Container */}
        <div className="pt-2">
          {!showQuiz ? (
            <button
              onClick={() => setShowQuiz(true)}
              className="w-full py-3.5 px-4 rounded-xl border border-teal-200 dark:border-teal-500/30 bg-teal-50/60 dark:bg-teal-500/10 hover:bg-teal-100/60 dark:hover:bg-teal-500/20 text-teal-800 dark:text-teal-300 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-sm touch-manipulation active:scale-[0.99]"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Take Knowledge Check (3 Questions)</span>
            </button>
          ) : (
            <Module1_5Quiz />
          )}
        </div>
      </section>

      {/* SECTION 8: BRIDGE TO MODULE 1.6 */}
      <section className="pt-4">
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-r from-teal-50/70 via-slate-50 to-sky-50/70 dark:from-teal-950/20 dark:via-slate-900/40 dark:to-sky-950/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div className="space-y-1">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400">
              Next Step in Level 1
            </span>
            <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Module 1.6: Fundamentals of the Agentic Loop
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Master the core engine of agency: Perceive ➔ Reason ➔ Act ➔ Observe ➔ Terminate.
            </p>
          </div>

          <Link
            href="/learn/level-1/module-1-6"
            className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center gap-2 transition shadow-sm shrink-0 touch-manipulation active:scale-95"
          >
            <span>Proceed to 1.6</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
