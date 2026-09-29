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
    name: "Planning & Replanning",
    subtitle: "Deconstruct, Order, and Dynamically Adapt",
    icon: GitFork,
    color: "text-sky-700 dark:text-sky-400",
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
    name: "Self-Reflection (Reflexion)",
    subtitle: "Actor-Critic Quality Optimization",
    icon: Repeat,
    color: "text-purple-700 dark:text-purple-400",
    badge: "Evaluator-Optimizer",
    summary:
      "A dual-node loop where an Actor generates an initial solution and an independent Critic evaluates it against strict quality rubrics, prompting iterative refinement.",
    architectureDiagram: [
      "User Request ➔ Actor Node (Generates draft solution)",
      "Critic Node ➔ Evaluates draft against safety, style, and correctness rubrics",
      "Decision Gate ➔ Passed rubrics? If NO: Return structured critique to Actor",
      "Actor Node ➔ Incorporates critique and regenerates refined solution",
    ],
    concreteExample:
      "Code Refactoring Agent: Actor generates SQL query ➔ Critic identifies missing index and SQL injection risk ➔ Actor rewrites using parameterized queries ➔ Critic approves.",
    whenToUse: "High-stakes writing, code generation, translation, and complex reasoning where first-pass outputs have subtle bugs.",
    tradeoffs: "Multiplies token costs and latency by 2x to 3x per reflection cycle.",
  },
  {
    id: "map_reduce",
    name: "Parallel Fan-Out / Fan-In",
    subtitle: "Concurrent Execution for Independent Tasks",
    icon: Layers,
    color: "text-teal-700 dark:text-teal-400",
    badge: "High-Throughput Concurrency",
    summary:
      "A lead agent breaks a large task into independent subproblems, dispatches them across concurrent workers in parallel, and merges findings in a reducer pass.",
    architectureDiagram: [
      "User Prompt ➔ Fan-Out Router (Splits task into N independent items)",
      "Worker Threads [1..N] ➔ Execute concurrently via asyncio.gather()",
      "Fan-In Reducer ➔ Synthesizes all N results into a cohesive final output",
    ],
    concreteExample:
      "Contract Risk Audit: Splits a 150-page legal document into 10 sections. Dispatches 10 parallel LLM workers to audit indemnification clauses, then merges findings in 4 seconds.",
    whenToUse: "High-volume data extraction, batch document processing, or querying multiple independent databases simultaneously.",
    tradeoffs: "Risk of context fragmentation; requires idempotent, stateless subproblems.",
  },
  {
    id: "multi_agent",
    name: "Orchestrator-Workers",
    subtitle: "Specialized Squads Coordinated by a Manager",
    icon: Users,
    color: "text-amber-700 dark:text-amber-400",
    badge: "Multi-Agent Architecture",
    summary:
      "A central Orchestrator agent maintains the global goal and delegates sub-workflows to specialized domain agents (Researcher, Coder, Reviewer).",
    architectureDiagram: [
      "Lead Orchestrator ➔ Assigns specialized sub-goals to domain agents",
      "Research Agent ➔ Retrieves web facts & documentation",
      "Code Agent ➔ Writes implementation using research findings",
      "QA Agent ➔ Runs tests and flags regressions back to Orchestrator",
    ],
    concreteExample:
      "Autonomous Feature Dev: Product Manager agent drafts spec ➔ Software Engineer agent writes code ➔ QA agent writes unit tests ➔ DevOps agent creates deployment PR.",
    whenToUse: "Complex, multidisciplinary domains requiring distinct personas, tools, or permissions.",
    tradeoffs: "High orchestration overhead; inter-agent communication can drift without strict message schemas.",
  },
  {
    id: "hitl",
    name: "Human-in-the-Loop (HITL)",
    subtitle: "State Interception & Approval Gates",
    icon: UserCheck,
    color: "text-emerald-700 dark:text-emerald-400",
    badge: "Safety & Governance",
    summary:
      "The agent pauses execution before triggering irreversible or high-consequence tools, yielding state control to a human operator for sign-off or parameter modification.",
    architectureDiagram: [
      "Agent Reasoning ➔ Formulates tool call for sensitive action (e.g. transfer funds)",
      "Interception Gate ➔ Pauses loop; saves persistent checkpoint to database",
      "Human Review Dashboard ➔ Operator inspects proposed action and clicks [Approve / Reject]",
      "Resume Trigger ➔ Workflow resumes from checkpoint with human authorization verified",
    ],
    concreteExample:
      "Fintech Fraud Agent: Autonomously gathers KYC records and transaction history, but pauses for a compliance officer to sign off before freezing an account.",
    whenToUse: "Production financial actions, database migrations, customer-facing emails, or legal filings.",
    tradeoffs: "Introduces asynchronous latency while waiting for human review.",
  },
];

export default function AgenticDesignPatternsExplorer() {
  const [selectedPatternId, setSelectedPatternId] = useState<PatternId>("planning");
  const selectedPattern = PATTERNS.find((p) => p.id === selectedPatternId) || PATTERNS[0];
  const Icon = selectedPattern.icon;

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-4 sm:p-6 shadow-sm dark:shadow-2xl space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400 px-2.5 py-0.5 rounded-full bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30">
              Interactive Pattern Catalog
            </span>
            <span className="text-[11px] font-mono text-slate-500">5 Canonical Topologies</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-1">
            Proven Agentic Design Patterns
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Select a design pattern to inspect its architectural topology, real-world applications, and engineering trade-offs
          </p>
        </div>

        <div className="px-3 py-1 rounded-xl bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30 text-teal-800 dark:text-teal-300 font-mono text-xs font-bold self-start sm:self-center">
          {selectedPattern.badge}
        </div>
      </div>

      {/* Pattern Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {PATTERNS.map((p) => {
          const PIcon = p.icon;
          const isSelected = p.id === selectedPatternId;

          return (
            <button
              key={p.id}
              onClick={() => setSelectedPatternId(p.id)}
              className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between min-h-[90px] touch-manipulation active:scale-95 ${
                isSelected
                  ? "border-teal-500 bg-teal-50 dark:bg-teal-500/15 shadow-sm ring-1 ring-teal-500/30"
                  : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <PIcon className={`w-4 h-4 ${isSelected ? "text-teal-700 dark:text-teal-400" : "text-slate-500"}`} />
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />}
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                  {p.name.split(" ")[0]}
                </h4>
                <span className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                  {p.badge}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Pattern Detail Card */}
      <div className="p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-500/20 text-teal-700 dark:text-teal-400 flex items-center justify-center shrink-0">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                {selectedPattern.name}
              </h4>
              <p className="text-xs text-teal-700 dark:text-teal-400 font-mono">
                {selectedPattern.subtitle}
              </p>
            </div>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          {selectedPattern.summary}
        </p>

        {/* Architecture flow steps */}
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 block">
            Execution Flow Topology
          </span>
          <div className="grid grid-cols-1 gap-2">
            {selectedPattern.architectureDiagram.map((step, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 flex items-center gap-2 shadow-sm"
              >
                <span className="w-5 h-5 rounded-full bg-teal-50 dark:bg-teal-500/20 text-teal-800 dark:text-teal-300 flex items-center justify-center text-[10px] font-bold shrink-0">
                  {idx + 1}
                </span>
                <span className="leading-snug">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Concrete example & tradeoffs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="p-3 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
            <span className="text-[11px] font-mono font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider block">
              Production Example
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {selectedPattern.concreteExample}
            </p>
          </div>

          <div className="p-3 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
            <span className="text-[11px] font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
              Engineering Trade-Offs
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {selectedPattern.tradeoffs}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
