"use client";

import React, { useState } from "react";
import {
  GitFork,
  Brain,
  Repeat,
  Layers,
  Users,
  UserCheck,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  Sliders,
  History,
  FileEdit,
  ShieldCheck,
  Workflow,
} from "lucide-react";

type PatternId = "planning" | "reflection" | "map_reduce" | "multi_agent" | "hitl";

interface PatternData {
  id: PatternId;
  name: string;
  subtitle: string;
  icon: any;
  color: string;
  badge: string;
  summary: string;
  architectureDiagram: string[];
  concreteExample: string;
  whenToUse: string;
  tradeoffs: string;
}

const PATTERNS: PatternData[] = [
  {
    id: "planning",
    name: "Planning & Dynamic Replanning",
    subtitle: "Deconstruct, Order, and Dynamically Adapt",
    icon: GitFork,
    color: "text-sky-400",
    badge: "Structural Decomposition",
    summary:
      "The agent explicitly breaks an ambiguous objective into an ordered sequence of discrete subtasks before executing, and dynamically refines the plan as new observations arrive.",
    architectureDiagram: [
      "User Goal ➔ Planner Node (LLM decomposes into Step 1, Step 2, Step 3)",
      "Executor Node ➔ Executes Step 1 via Tools",
      "Plan Refinement Node ➔ Observes Step 1 output; updates/reorders remaining steps",
      "Termination Gate ➔ Concludes when all plan nodes reach SUCCESS",
    ],
    concreteExample:
      "Enterprise Tech Migration: (1) Audit dependencies ➔ (2) Check version compatibility ➔ (3) Rewrite deprecated APIs ➔ (4) Run test suite ➔ If tests fail, inject new bugfix subtask dynamically.",
    whenToUse: "Multi-step complex tasks requiring logical ordering and long-horizon dependency tracking.",
    tradeoffs: "Higher initial latency before first action; potential over-planning on trivial requests.",
  },
  {
    id: "reflection",
    name: "Reflection & Self-Correction",
    subtitle: "Actor-Critic Dual-Loop Quality Enhancement",
    icon: Repeat,
    color: "text-purple-400",
    badge: "Iterative Refinement",
    summary:
      "An agent reviews its own past actions and generated outputs, prompts an LLM critic node to evaluate quality against strict rubrics, and refines the output until it meets acceptance thresholds.",
    architectureDiagram: [
      "Actor Node ➔ Generates initial draft or code implementation",
      "Critic / Evaluator Node ➔ Inspects output against rubric (syntax, security, tone, logic)",
      "Decision Branch ➔ Meets threshold? YES: Output answer | NO: Generate detailed feedback",
      "Actor Node ➔ Receives critique in context and produces refined Version 2",
    ],
    concreteExample:
      "Secure SQL Generator: Actor produces SQL query ➔ Critic analyzes query for SQL injection vulnerabilities and missing indexes ➔ Rejects draft with recommendations ➔ Actor rewrites parameterized query.",
    whenToUse: "High-stakes code generation, mathematical derivations, translations, and formal technical documentation.",
    tradeoffs: "Doubles or triples token consumption and latency due to multiple LLM critique passes.",
  },
  {
    id: "map_reduce",
    name: "Map-Reduce Pattern",
    subtitle: "High-Throughput Parallel Fan-Out & Aggregation",
    icon: Layers,
    color: "text-amber-400",
    badge: "Concurrent Processing",
    summary:
      "A dispatcher node splits a large dataset or multi-document corpus into independent items (Map Phase), executes parallel workers on each item concurrently, and combines results into a unified summary (Reduce Phase).",
    architectureDiagram: [
      "Dispatcher / Splitter ➔ Breaks 100 customer reviews into 10 parallel chunks",
      "Map Nodes (Concurrent) ➔ 10 Worker Agents analyze sentiment & feature requests in parallel",
      "Reduce Node (Aggregator) ➔ Ingests all 10 outputs and synthesizes an executive summary matrix",
    ],
    concreteExample:
      "Earnings Call Transcripts: Concurrently extract key financial metrics from 50 corporate PDF reports across different sectors, then reduce into an industry-wide quarterly trend benchmark.",
    whenToUse: "Batch document processing, data synthesis across large repositories, and embarrassingly parallel workflows.",
    tradeoffs: "Requires graph frameworks that support dynamic conditional branching (e.g. LangGraph `Send` API) and shared state synchronization.",
  },
  {
    id: "multi_agent",
    name: "Multi-Agent Architectures",
    subtitle: "Role Specialization & Collaborative Division of Labor",
    icon: Users,
    color: "text-emerald-400",
    badge: "Team Collaboration",
    summary:
      "Instead of forcing a single generalist agent with 50 tools, tasks are divided among specialized agents (e.g., Researcher, Coder, Reviewer) coordinated by a supervisor or peer communication graph.",
    architectureDiagram: [
      "Supervisor / Router ➔ Evaluates task and delegates subtasks to specialized agents",
      "Research Agent (equipped with Web/Search tools) ➔ Gathers verified facts & API docs",
      "Coding Agent (equipped with Sandbox/REPL) ➔ Writes modular Python code based on research",
      "QA Agent (equipped with Linter/Test Runner) ➔ Validates syntax and executes test suite",
    ],
    concreteExample:
      "Automated Feature Builder: Product Manager Agent drafts user stories ➔ Architect Agent designs database schema ➔ Engineer Agent writes backend routes ➔ QA Agent runs integration tests.",
    whenToUse: "Complex domain applications where a single prompt/toolset causes model confusion or context overflow.",
    tradeoffs: "Higher architectural complexity; inter-agent communication overhead; risk of circular debates without a decisive supervisor.",
  },
  {
    id: "hitl",
    name: "Human-in-the-Loop (HITL)",
    subtitle: "Governance, Time Travel, and Safety Gates",
    icon: UserCheck,
    color: "text-teal-400",
    badge: "Safety & Governance",
    summary:
      "The workflow pauses execution at critical junctures, allowing human operators to approve sensitive actions, supply missing inputs, review tool arguments, or rewind state via time travel.",
    architectureDiagram: [
      "Agent Pipeline ➔ Executes safe read operations autonomously",
      "Checkpoint Interrupt Gate ➔ Pauses state before irreversible Write Action (e.g. wire transfer)",
      "Human Reviewer UI ➔ (1) Approve, (2) Edit Tool Arguments, or (3) Time-Travel rewind to prior state",
      "Resumed Pipeline ➔ Continues execution with human-verified state checkpoint",
    ],
    concreteExample:
      "Clinical Trial Data Analysis: Agent generates draft regulatory compliance filing ➔ Pauses at checkpoint ➔ Chief Medical Officer reviews and edits claims ➔ Agent logs signed audit trail.",
    whenToUse: "Financial transactions, client-facing communications, sensitive database writes, and regulatory compliance.",
    tradeoffs: "Introduces human latency; requires durable state persistence (checkpoint databases) to pause/resume cleanly.",
  },
];

export default function AgenticDesignPatternsExplorer() {
  const [activePatternId, setActivePatternId] = useState<PatternId>("planning");
  const activePattern = PATTERNS.find((p) => p.id === activePatternId)!;

  return (
    <div className="rounded-2xl border border-slate-700/60 bg-slate-900/90 dark:bg-slate-900/90 light:bg-white light:border-slate-300 shadow-xl overflow-hidden my-8">
      {/* Explorer Header */}
      <div className="border-b border-slate-700/60 dark:border-slate-700/60 light:border-slate-200 px-5 py-4 bg-slate-800/50 dark:bg-slate-800/50 light:bg-slate-50 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-teal-400 animate-pulse" />
            <h3 className="font-bold text-base md:text-lg text-white dark:text-white light:text-slate-900">
              Interactive Agentic Design Patterns Switchboard
            </h3>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 mt-0.5">
            Explore the 5 foundational structural blueprints that elevate simple scripts into resilient enterprise systems.
          </p>
        </div>

        <span className="px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-teal-500/10 text-teal-300 dark:text-teal-300 light:text-teal-700 border border-teal-500/30">
          5 Core Architectural Patterns
        </span>
      </div>

      {/* Pattern Selector Tabs */}
      <div className="px-5 py-3 bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-100/80 border-b border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 overflow-x-auto">
        <div className="flex items-center min-w-[620px] gap-2">
          {PATTERNS.map((p) => {
            const isActive = p.id === activePatternId;
            const Icon = p.icon;
            return (
              <button
                key={p.id}
                onClick={() => setActivePatternId(p.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all border ${
                  isActive
                    ? "bg-teal-500 text-slate-950 font-bold border-teal-400 shadow-sm"
                    : "bg-slate-900/40 dark:bg-slate-900/40 light:bg-white text-slate-300 dark:text-slate-300 light:text-slate-700 border-slate-700/60 dark:border-slate-700/60 light:border-slate-200 hover:border-slate-600"
                }`}
              >
                <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="whitespace-nowrap">{p.name.split(" ")[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Pattern Detail Stage */}
      <div className="p-5 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Pattern Description & Architecture Flow */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-5">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider">
                Pattern Deep-Dive
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-slate-800 dark:bg-slate-800 light:bg-slate-200 text-slate-300 dark:text-slate-300 light:text-slate-700">
                {activePattern.badge}
              </span>
            </div>

            <h4 className="text-lg md:text-xl font-bold text-white dark:text-white light:text-slate-900">
              {activePattern.name}
            </h4>
            <p className="text-xs font-medium text-teal-300 dark:text-teal-300 light:text-teal-700 mt-0.5">
              {activePattern.subtitle}
            </p>

            <p className="text-xs md:text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 mt-3 leading-relaxed">
              {activePattern.summary}
            </p>

            {/* Architecture Pipeline Flow */}
            <div className="mt-5 space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2">
                Execution Graph Topology
              </span>
              {activePattern.architectureDiagram.map((step, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg border border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-50 flex items-start gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-300 flex items-center justify-center text-[10px] font-mono font-bold flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <span className="text-xs font-mono text-slate-200 dark:text-slate-200 light:text-slate-800 leading-relaxed">
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Teacher Architectural Rationale */}
          <div className="p-4 rounded-xl border border-teal-500/30 bg-teal-950/20 dark:bg-teal-950/20 light:bg-teal-50/60 text-xs text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed">
            <strong className="text-teal-400 dark:text-teal-400 light:text-teal-700 block mb-1">
              💡 Why use this over a single basic ReAct loop?
            </strong>
            A basic ReAct loop tries to do everything in one unguided thought-action thread. As complexity grows, the model loses context coherence and loops aimlessly. <strong>{activePattern.name}</strong> introduces explicit structural guardrails that guarantee deterministic coordination across complex multi-step pipelines.
          </div>
        </div>

        {/* Right Column: Case Study, When to Use & Tradeoffs */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-4">
          {/* Concrete Case Study */}
          <div className="rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-950/80 dark:bg-slate-950/80 light:bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2 text-teal-400 text-xs font-mono font-bold mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Real-World Production Case Study</span>
            </div>
            <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed">
              {activePattern.concreteExample}
            </p>
          </div>

          {/* When to Use */}
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 dark:bg-emerald-500/5 light:bg-emerald-50/50 p-4">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold mb-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>When to Select this Pattern</span>
            </div>
            <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed">
              {activePattern.whenToUse}
            </p>
          </div>

          {/* Engineering Tradeoffs */}
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 dark:bg-amber-500/5 light:bg-amber-50/50 p-4">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold mb-1.5">
              <AlertCircle className="w-4 h-4" />
              <span>Engineering Costs & Tradeoffs</span>
            </div>
            <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed">
              {activePattern.tradeoffs}
            </p>
          </div>

          {/* Quick Stat Pill */}
          <div className="p-3 rounded-lg border border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-900/60 dark:bg-slate-900/60 light:bg-slate-50 text-[11px] font-mono text-slate-400 flex items-center justify-between">
            <span>Pattern Classification:</span>
            <span className="text-teal-400 font-bold">Standard Production Graph</span>
          </div>
        </div>
      </div>
    </div>
  );
}
