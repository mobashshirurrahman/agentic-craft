"use client";

import React, { useState } from "react";
import {
  Brain,
  CheckCircle2,
  FolderGit2,
  ListChecks,
  Users,
  GitBranch,
  Play,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Cpu,
} from "lucide-react";

interface SubAgentTask {
  id: string;
  specialist: string;
  role: string;
  task: string;
  status: "idle" | "working" | "done";
  output?: string;
}

export default function DeepAgentPlannerWorkbench() {
  const [activeTab, setActiveTab] = useState<"todo" | "decisionTree" | "subagents">("todo");
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const [todoItems, setTodoItems] = useState([
    { id: 1, text: "Audit auth token expiration in backend", done: true },
    { id: 2, text: "Implement refresh token rotation endpoint", done: true },
    { id: 3, text: "Update frontend Axios interceptor for 401 retry", done: false },
    { id: 4, text: "Run end-to-end Cypress authentication test suite", done: false },
  ]);

  const [subAgents, setSubAgents] = useState<SubAgentTask[]>([
    {
      id: "agent-1",
      specialist: "Security Auditor",
      role: "Backend specialist",
      task: "Inspect JWT signing key rotation and revocation list",
      status: "done",
      output: "Vulnerability patched: RS256 algorithm locked.",
    },
    {
      id: "agent-2",
      specialist: "Frontend Engineer",
      role: "Client specialist",
      task: "Hook silent refresh into browser local storage & cookies",
      status: "working",
      output: "Wired into HTTP client interceptors...",
    },
    {
      id: "agent-3",
      specialist: "QA Test Runner",
      role: "Testing specialist",
      task: "Simulate concurrent token expiry race conditions",
      status: "idle",
    },
  ]);

  const toggleTodo = (id: number) => {
    setTodoItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm overflow-hidden transition-colors">
      {/* Header */}
      <div className="p-5 md:p-6 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-blue-500/10 via-indigo-500/5 to-transparent">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base md:text-lg text-slate-900 dark:text-white">
                Deep Planning Agent Architecture Studio
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Explore the 4 pillars of deep agents: Todo list tracking, decision trees, sub-agent delegation, and filesystem memory
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-blue-500/20 text-blue-600 dark:text-blue-400 font-bold border border-blue-500/30">
              Deep Agent Pattern
            </span>
          </div>
        </div>
      </div>

      <div className="p-5 md:p-6 space-y-6">
        {/* Navigation Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <button
            onClick={() => setActiveTab("todo")}
            className={`p-3 text-left rounded-xl border text-xs font-mono transition ${
              activeTab === "todo"
                ? "border-blue-500 bg-blue-50/50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 font-bold"
                : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:border-slate-300"
            }`}
          >
            <div className="flex items-center gap-1.5 mb-1">
              <ListChecks className="w-4 h-4 text-blue-500" />
              <span>1. Context Todo Tracker</span>
            </div>
            <span className="text-[11px] text-slate-500">Prevents context drift</span>
          </button>

          <button
            onClick={() => setActiveTab("decisionTree")}
            className={`p-3 text-left rounded-xl border text-xs font-mono transition ${
              activeTab === "decisionTree"
                ? "border-blue-500 bg-blue-50/50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 font-bold"
                : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:border-slate-300"
            }`}
          >
            <div className="flex items-center gap-1.5 mb-1">
              <GitBranch className="w-4 h-4 text-indigo-500" />
              <span>2. Decision Tree Heuristics</span>
            </div>
            <span className="text-[11px] text-slate-500">Structured prompt logic</span>
          </button>

          <button
            onClick={() => setActiveTab("subagents")}
            className={`p-3 text-left rounded-xl border text-xs font-mono transition ${
              activeTab === "subagents"
                ? "border-blue-500 bg-blue-50/50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 font-bold"
                : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:border-slate-300"
            }`}
          >
            <div className="flex items-center gap-1.5 mb-1">
              <Users className="w-4 h-4 text-purple-500" />
              <span>3. Sub-Agent Delegation</span>
            </div>
            <span className="text-[11px] text-slate-500">Task decomposition</span>
          </button>
        </div>

        {/* Tab 1: Context Todo List */}
        {activeTab === "todo" && (
          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase font-mono">
                  Dynamic Step Progress Monitor
                </h4>
                <p className="text-[11px] text-slate-500">
                  How deep agents like Claude Code keep track of multi-hour software engineering tasks
                </p>
              </div>
              <span className="text-xs font-mono text-blue-600 dark:text-blue-400 font-bold">
                {todoItems.filter((i) => i.done).length}/{todoItems.length} Finished
              </span>
            </div>

            <div className="space-y-2">
              {todoItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleTodo(item.id)}
                  className={`p-3 rounded-lg border text-xs font-mono transition cursor-pointer flex items-center justify-between ${
                    item.done
                      ? "border-emerald-300 dark:border-emerald-800/60 bg-emerald-50/20 dark:bg-emerald-950/20 text-slate-500 line-through"
                      : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:border-blue-400"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={item.done}
                      onChange={() => toggleTodo(item.id)}
                      className="accent-blue-600 cursor-pointer"
                    />
                    <span>{item.text}</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">
                    {item.done ? "Done" : "In Progress"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Decision Tree Heuristics */}
        {activeTab === "decisionTree" && (
          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase font-mono">
              Explicit Engineering Heuristics (System Prompt Architecture)
            </h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Shallow agents use generic prompts ("You are an assistant"). Deep agents receive strict algorithmic decision trees embedded in their system prompt:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-lg bg-slate-900 text-slate-200 font-mono text-xs border border-slate-800 space-y-1">
                <span className="text-blue-400 font-bold uppercase text-[10px]">
                  Rule 1: Code Search Priority
                </span>
                <p className="text-[11px] text-slate-300">
                  "When searching code: Always search function definitions first. If not found, search call sites. Never read full files until specific line numbers are identified."
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-900 text-slate-200 font-mono text-xs border border-slate-800 space-y-1">
                <span className="text-indigo-400 font-bold uppercase text-[10px]">
                  Rule 2: Error Recovery Tree
                </span>
                <p className="text-[11px] text-slate-300">
                  "If error contains 'ModuleNotFoundError': Check requirements.txt, then verify virtualenv path, then install package. Do not modify source code."
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Sub-Agent Delegation */}
        {activeTab === "subagents" && (
          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase font-mono">
                  Sub-Agent Task Decomposition
                </h4>
                <p className="text-[11px] text-slate-500">
                  Breaking complex work into isolated specialized sub-agents with dedicated contexts
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {subAgents.map((sa) => (
                <div
                  key={sa.id}
                  className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-900 dark:text-white">
                      {sa.specialist}
                    </span>
                    <span
                      className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                        sa.status === "done"
                          ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300"
                          : sa.status === "working"
                          ? "bg-amber-500/20 text-amber-700 dark:text-amber-300 animate-pulse"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                      }`}
                    >
                      {sa.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400">
                    {sa.task}
                  </p>
                  {sa.output && (
                    <div className="p-2 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[10px] font-mono text-slate-500">
                      {sa.output}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
