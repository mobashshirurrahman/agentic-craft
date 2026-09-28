"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  Circle,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Award,
  Layers,
  Activity,
  Lock,
  GitBranch,
  ArrowRight,
} from "lucide-react";

interface AuditItem {
  id: string;
  category: "Architecture" | "Reliability" | "Observability" | "Security";
  title: string;
  description: string;
  weight: number;
}

const AUDIT_ITEMS: AuditItem[] = [
  {
    id: "simple_first",
    category: "Architecture",
    title: "1. Tested Simpler Approaches First",
    description:
      "Verified that a standard prompt, RAG lookup, or deterministic chain cannot solve the problem before deploying an autonomous loop.",
    weight: 20,
  },
  {
    id: "bounded_autonomy",
    category: "Architecture",
    title: "2. Workflow vs Agent Separation",
    description:
      "Used deterministic state machines (graphs) for predictable business steps, reserving autonomous agent exploration only for unstructured sub-goals.",
    weight: 20,
  },
  {
    id: "full_tracing",
    category: "Observability",
    title: "3. Complete Execution Tracing",
    description:
      "Every Thought, Tool Call, Observation, latency spike, and token cost is persistently logged and queryable via an observability tool (e.g. LangSmith, Phoenix).",
    weight: 20,
  },
  {
    id: "resilient_errors",
    category: "Reliability",
    title: "4. Graceful Degradation & Actionable Errors",
    description:
      "When a tool or API fails, the system returns an informative error string back to the agent reasoning loop rather than crashing the entire process.",
    weight: 20,
  },
  {
    id: "least_privilege",
    category: "Security",
    title: "5. Least Privilege & Human-in-the-Loop Gates",
    description:
      "Agent has read-only API access by default; any high-stakes or irreversible write operations (e.g. money transfer, file deletion) require explicit human sign-off.",
    weight: 20,
  },
];

export default function CorePrinciplesChecklistWorkbench() {
  const [checkedIds, setCheckedIds] = useState<{ [key: string]: boolean }>({
    simple_first: true,
    bounded_autonomy: true,
    full_tracing: false,
    resilient_errors: false,
    least_privilege: false,
  });

  const toggleItem = (id: string) => {
    setCheckedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const resetAll = () => {
    setCheckedIds({
      simple_first: false,
      bounded_autonomy: false,
      full_tracing: false,
      resilient_errors: false,
      least_privilege: false,
    });
  };

  const selectAll = () => {
    const all: { [key: string]: boolean } = {};
    AUDIT_ITEMS.forEach((i) => {
      all[i.id] = true;
    });
    setCheckedIds(all);
  };

  // Calculate score
  const totalScore = AUDIT_ITEMS.reduce((acc, item) => {
    return acc + (checkedIds[item.id] ? item.weight : 0);
  }, 0);

  const getReadinessBadge = () => {
    if (totalScore === 100) {
      return {
        label: "Production Enterprise Ready",
        color: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/40",
        message: "Exemplary architecture! Your agent is resilient, observable, cost-conscious, and secure.",
      };
    }
    if (totalScore >= 60) {
      return {
        label: "Developing Staging Architecture",
        color: "bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/40",
        message: "Solid foundation, but missing critical observability or security confirmation gates.",
      };
    }
    return {
      label: "Fragile Toy Prototype",
      color: "bg-red-500/20 text-red-700 dark:text-red-300 border-red-500/40",
      message: "High risk of runtime crashes, infinite token loops, or security vulnerabilities in production.",
    };
  };

  const badge = getReadinessBadge();

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm overflow-hidden transition-colors">
      {/* Header */}
      <div className="p-5 md:p-6 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-teal-500/10 via-emerald-500/5 to-transparent">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                Production Readiness Audit Workbench
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-700 dark:text-teal-300 border border-teal-500/30">
                  Capstone Assessment
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Audit your agent system against the 5 foundational engineering principles of reliable systems
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={selectAll}
              className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-xs font-mono text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition"
            >
              Select All
            </button>
            <button
              onClick={resetAll}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition"
              title="Reset checklist"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Checklist & Scorecard */}
      <div className="p-5 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: The 5 Principles Checklist (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold flex items-center gap-1.5 pb-2 border-b border-slate-200 dark:border-slate-800">
            <Layers className="w-3.5 h-3.5 text-teal-500" />
            Core Architectural Principles
          </div>

          {AUDIT_ITEMS.map((item) => {
            const isChecked = checkedIds[item.id];
            return (
              <button
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`w-full text-left p-3.5 rounded-xl border transition flex items-start gap-3.5 ${
                  isChecked
                    ? "border-teal-500/40 bg-teal-500/10 dark:bg-teal-500/5 shadow-sm"
                    : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {isChecked ? (
                    <CheckCircle2 className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-400" />
                  )}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {item.title}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right: Score Card & Readiness Analysis (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold flex items-center gap-1.5 pb-2 border-b border-slate-200 dark:border-slate-800">
            <Award className="w-3.5 h-3.5 text-emerald-500" />
            Readiness Scorecard
          </div>

          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-center space-y-3">
            <div className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-slate-900 dark:text-white">
              {totalScore}
              <span className="text-lg font-normal text-slate-400"> / 100</span>
            </div>

            <div>
              <span className={`text-xs font-mono px-3 py-1 rounded-full border font-bold ${badge.color}`}>
                {badge.label}
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
              {badge.message}
            </p>
          </div>

          {/* Golden Rule Callout */}
          <div className="p-4 rounded-xl border border-teal-500/30 bg-teal-500/10 text-xs text-slate-700 dark:text-slate-300 space-y-2">
            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-500" />
              The Capstone Golden Rule:
            </div>
            <p className="text-[11px] leading-relaxed">
              &ldquo;Iterative engineering beats clever prompting.&rdquo; The most reliable agent is not the one with the longest, fanciest system prompt, but the one built with tight tool typing, bounded graphs, deep tracing, and human oversight.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
