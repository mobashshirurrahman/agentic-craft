"use client";
import React from "react";
import {
  Compass,
  Cpu,
  Layers,
  Code2,
  Sparkles,
  Lightbulb,
  CheckCircle2,
  Film,
  Award,
  Users,
  Terminal,
  ShieldCheck,
  Zap,
} from "lucide-react";
import DeepAgentStudio from "./DeepAgentStudio";
import Module4_17Quiz from "./Module4_17Quiz";

export default function Module4_17Content() {
  return (
    <div className="space-y-10">
      {/* Hero Header */}
      <div className="rounded-2xl border border-teal-500/30 bg-gradient-to-br from-teal-500/20 via-indigo-500/10 to-slate-950 p-6 md:p-8 text-slate-100 relative overflow-hidden">
        <div className="space-y-3 max-w-3xl relative z-10">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-teal-500/30 text-teal-300 border border-teal-500/40">
              Module 4.17 • Final Capstone Lesson
            </span>
            <span className="text-xs font-mono text-slate-400">~18 min</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Building Deep Agents for Complex Tasks
          </h1>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            Welcome to the final capstone of Level 4 and the culmination of our entire Agentic AI curriculum. In this module, we examine how state-of-the-art agent systems like <strong>Claude Code</strong>, <strong>Devin</strong>, and <strong>LangGraph Deep Agents</strong> tackle massive, non-trivial engineering tasks by decomposing them into specialized sub-agents with clean, isolated context boundaries.
          </p>
        </div>
      </div>

      {/* Real-World Analogy */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Film className="w-5 h-5 text-indigo-500" />
          1. The Hollywood Movie Production Analogy
        </h2>
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-3 text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            Imagine filming an Oscar-winning movie:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
            <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-900/40 bg-rose-50/50 dark:bg-rose-950/20 space-y-1.5">
              <span className="font-bold text-rose-700 dark:text-rose-400 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                ❌ The Monolithic &ldquo;One-Person&rdquo; Crew
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                You hire one single person to write the script, operate 4 cameras, record the sound, compose the orchestral score, and edit 400 hours of footage. Their brain explodes from context exhaustion. The movie never releases.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-teal-200 dark:border-teal-900/40 bg-teal-50/50 dark:bg-teal-950/20 space-y-1.5">
              <span className="font-bold text-teal-700 dark:text-teal-400 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                ✅ Deep Agent Crew: Director & Specialized Department Heads
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                The <strong>Director (Supervisor)</strong> holds the vision and script breakdown. They delegate scenes to the <strong>Cinematographer (Researcher)</strong>, <strong>Actors (Implementers)</strong>, and <strong>Editor (QA Auditor)</strong>. Each specialist works with their own clean tools and passes only verified deliverables back to the director.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Two Patterns of Specialization */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-teal-500" />
          2. Functional vs. Domain Specialization
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-indigo-200 dark:border-indigo-900/40 bg-indigo-50/50 dark:bg-indigo-950/20 space-y-2">
            <h3 className="text-sm font-bold text-indigo-800 dark:text-indigo-300 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-indigo-500" /> Pattern 1: Functional Specialization
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Decomposes by <em>task phase</em> along an assembly line:
            </p>
            <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-indigo-100 dark:border-indigo-900/60 font-mono text-[11px] text-slate-700 dark:text-slate-300">
              Researcher &rarr; Architect &rarr; Implementer &rarr; QA Tester
            </div>
            <p className="text-[11px] text-slate-500">
              Used by Claude Code and coding agents. Prevents implementers from being distracted by exploratory search noise.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-teal-200 dark:border-teal-900/40 bg-teal-50/50 dark:bg-teal-950/20 space-y-2">
            <h3 className="text-sm font-bold text-teal-800 dark:text-teal-300 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-teal-500" /> Pattern 2: Domain Specialization
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Decomposes by <em>business or microservice boundary</em>:
            </p>
            <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-teal-100 dark:border-teal-900/60 font-mono text-[11px] text-slate-700 dark:text-slate-300">
              Payments Agent &bull; Logistics Agent &bull; Auth Agent
            </div>
            <p className="text-[11px] text-slate-500">
              Used in enterprise customer service. Each agent has deep domain schemas and distinct database credentials.
            </p>
          </div>
        </div>
      </section>

      {/* Production Deep Agent Supervisor Code */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Code2 className="w-5 h-5 text-indigo-500" />
          3. Production LangGraph Deep Agent Supervisor Pattern (Python)
        </h2>
        <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs border border-slate-800 overflow-x-auto">
          <pre>{`from typing import TypedDict, List
from langgraph.graph import StateGraph, END
from pydantic import BaseModel, Field

class SubTask(BaseModel):
    assigned_worker: str = Field(description="'archaeologist', 'coder', or 'tester'")
    instructions: str = Field(description="Precise instructions and context slice")

class Plan(BaseModel):
    epic_goal: str
    tasks: List[SubTask]

class DeepAgentState(TypedDict):
    user_goal: str
    plan: Plan
    current_step: int
    worker_artifacts: dict # Isolated scratchpads per worker

# ── 1. Supervisor / Planner Node (High-Level Only) ──
def supervisor_planner(state: DeepAgentState):
    llm = ChatOpenAI(model="gpt-4o", temperature=0.0)
    structured_planner = llm.with_structured_output(Plan)
    
    plan = structured_planner.invoke(
        f"Decompose this software goal into specialized sub-tasks:\\n{state['user_goal']}"
    )
    return {"plan": plan, "current_step": 0, "worker_artifacts": {}}

# ── 2. Specialized Worker Dispatcher ───────────────
def worker_dispatcher(state: DeepAgentState):
    step_idx = state["current_step"]
    task = state["plan"].tasks[step_idx]
    
    # Run the worker with ISOLATED context (doesn't inherit the entire conversation history!)
    worker_fn = WORKER_REGISTRY[task.assigned_worker]
    result = worker_fn.invoke({
        "instructions": task.instructions,
        "dependencies": state["worker_artifacts"]
    })
    
    # Store clean artifact and advance step
    updated_artifacts = {**state["worker_artifacts"], task.assigned_worker: result}
    next_step = step_idx + 1
    
    return {"worker_artifacts": updated_artifacts, "current_step": next_step}`}</pre>
        </div>
      </section>

      {/* Interactive Studio Workbench */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-teal-500" />
            4. Interactive Studio: Deep Agent Orchestrator Workbench
          </h2>
          <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Watch a Supervisor decompose a full GitHub OAuth2 implementation into 4 specialized sub-agents with isolated toolsets. Run the workflow and claim your Graduation Certificate!
          </p>
        </div>
        <DeepAgentStudio />
      </section>

      {/* Interview Gold Callout */}
      <section className="p-6 rounded-2xl border border-teal-300 dark:border-teal-800/60 bg-gradient-to-br from-teal-500/10 via-teal-500/5 to-transparent space-y-3">
        <div className="flex items-center gap-2 text-teal-700 dark:text-teal-400 font-bold text-sm">
          <Lightbulb className="w-5 h-5 text-teal-500" />
          💡 Interview Gold: &ldquo;Design a Coding Agent Like Claude Code or Devin&rdquo;
        </div>
        <div className="text-xs md:text-sm text-slate-700 dark:text-slate-300 space-y-2 leading-relaxed">
          <p>
            <strong>Question:</strong> &ldquo;How would you architect an autonomous software engineer agent capable of resolving complex GitHub pull requests across a 1-million-line codebase?&rdquo;
          </p>
          <div className="pl-4 border-l-2 border-teal-400 space-y-1 font-mono text-xs text-slate-800 dark:text-slate-200">
            <p>1. <strong>Strict Separation of Planning vs. Execution:</strong> The Supervisor never reads thousands of files or runs low-level shell commands. It delegates to specialized sub-agents.</p>
            <p>2. <strong>Context Isolation:</strong> When the &ldquo;Code Archaeologist&rdquo; greps 400 files, only its final 10-line summary is handed over to the &ldquo;Code Implementer&rdquo;. This keeps the coder&apos;s context window fresh and free of distracting file bloat.</p>
            <p>3. <strong>Fine-Grained Tool Bundles:</strong> Assign each agent no more than 3–5 purpose-built tools. Coder gets <code className="text-teal-400">write_file</code> and <code className="text-teal-400">apply_diff</code>; QA gets <code className="text-teal-400">run_test_suite</code>.</p>
            <p>4. <strong>Automated Verification Gate:</strong> Never accept an agent PR on model confidence alone. The final supervisor node runs a headless test suite and linter; if tests fail, it dispatches a bugfix sub-task back to the coder.</p>
          </div>
        </div>
      </section>

      {/* Grand Course Graduation Banner */}
      <section className="p-8 rounded-3xl border border-teal-500/40 bg-gradient-to-br from-teal-500/20 via-indigo-500/10 to-slate-900 text-center space-y-4">
        <div className="inline-block p-3 rounded-full bg-teal-500/20 text-teal-400 border border-teal-500/30">
          <Award className="w-12 h-12" />
        </div>
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-teal-400">
            🎉 Curriculum Completed
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">
            Congratulations on Completing Level 4 & The Entire Course!
          </h2>
          <p className="text-xs md:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            You have now mastered all 59 modules across all 4 levels: Core ReAct loops, multi-agent frameworks (CrewAI & LangGraph), semantic vector memory, production eval harnesses, async APIs, worker fleets, cost optimization, and deep agents. You are equipped to build enterprise-grade, world-class autonomous AI systems!
          </p>
        </div>
      </section>

      {/* Final Mastery Quiz */}
      <section className="space-y-4">
        <Module4_17Quiz />
      </section>
    </div>
  );
}
