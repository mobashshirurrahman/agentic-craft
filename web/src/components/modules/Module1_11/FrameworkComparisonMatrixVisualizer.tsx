"use client";

import React, { useState } from "react";
import {
  Workflow,
  Users,
  Terminal,
  Cpu,
  Layers,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Code2,
  Sparkles,
  Server,
} from "lucide-react";

type FrameworkId = "langgraph" | "crewai" | "autogen" | "openai_sdk";

interface FrameworkData {
  id: FrameworkId;
  name: string;
  creator: string;
  philosophy: string;
  abstractionLevel: "Low-Level (Max Control)" | "High-Level (Fast Setup)" | "Event-Driven" | "Lightweight SDK";
  bestFor: string;
  keyFeatures: string[];
  sampleCode: string;
  verdict: string;
}

const FRAMEWORKS: FrameworkData[] = [
  {
    id: "langgraph",
    name: "LangGraph",
    creator: "LangChain Ecosystem",
    philosophy: "Graph-based deterministic state modeling with durable persistence and fine-grained control.",
    abstractionLevel: "Low-Level (Max Control)",
    bestFor: "Production enterprise systems, complex cyclic workflows, Human-in-the-Loop approval gates.",
    keyFeatures: [
      "Explicit nodes, edges, and conditional routing",
      "Built-in state checkpointing for error recovery & time travel",
      "Native streaming of token and state events",
      "Maximum auditability and compliance logging",
    ],
    sampleCode: `from langgraph.graph import StateGraph, START, END

# Define explicit state graph
workflow = StateGraph(AgentState)
workflow.add_node("agent", call_model)
workflow.add_node("tools", execute_tools)

workflow.add_edge(START, "agent")
workflow.add_conditional_edges("agent", should_continue, ["tools", END])
workflow.add_edge("tools", "agent")

app = workflow.compile(checkpointer=MemorySaver())`,
    verdict: "Industry Gold Standard for enterprise production where you need absolute control over state.",
  },
  {
    id: "crewai",
    name: "CrewAI",
    creator: "João Moura / CrewAI Inc.",
    philosophy: "Intuitive role-playing multi-agent teams with shared goals, processes, and automated task delegation.",
    abstractionLevel: "High-Level (Fast Setup)",
    bestFor: "Quick multi-agent prototyping, role-based workflows, content generation and marketing pipelines.",
    keyFeatures: [
      "Role-playing agent abstractions (Role, Goal, Backstory)",
      "Automated task delegation and inter-agent memory",
      "Sequential and hierarchical crew execution modes",
      "Plug-and-play tool integration",
    ],
    sampleCode: `from crewai import Agent, Task, Crew

researcher = Agent(
    role="Senior Market Analyst",
    goal="Discover emerging AI trends",
    backstory="You are an expert researcher with deep financial acumen."
)

task = Task(
    description="Analyze 2026 enterprise agent adoption",
    expected_output="A 3-bullet summary",
    agent=researcher
)

crew = Crew(agents=[researcher], tasks=[task])
crew.kickoff()`,
    verdict: "Best for assembling collaborative multi-agent teams in hours rather than weeks.",
  },
  {
    id: "autogen",
    name: "AutoGen",
    creator: "Microsoft Research",
    philosophy: "Multi-agent conversational framework centered on event-driven message exchange and open dialogue.",
    abstractionLevel: "Event-Driven",
    bestFor: "Academic research, multi-agent debate simulations, complex conversational modeling.",
    keyFeatures: [
      "Conversational multi-agent messaging",
      "Asynchronous, event-driven architecture",
      "Layered, extensible message buses",
      "Transitioning to Microsoft Agent Framework",
    ],
    sampleCode: `from autogen import AssistantAgent, UserProxyAgent

assistant = AssistantAgent("assistant", llm_config={"model": "gpt-4o"})
user_proxy = UserProxyAgent("user_proxy", code_execution_config={"work_dir": "coding"})

# Agents converse iteratively to solve the task
user_proxy.initiate_chat(assistant, message="Plot a chart of NVDA stock price.")`,
    verdict: "Ideal for researchers experimenting with emergent conversational behaviors.",
  },
  {
    id: "openai_sdk",
    name: "OpenAI Agents SDK",
    creator: "OpenAI",
    philosophy: "Lightweight, Python-first multi-agent orchestration with native OpenAI model primitives.",
    abstractionLevel: "Lightweight SDK",
    bestFor: "Developers starting out, lean Python apps, straightforward agent handoffs without bloated abstractions.",
    keyFeatures: [
      "Lean primitives: Agent (instructions + tools)",
      "Clean peer-to-peer handoffs via transfer functions",
      "Integrated input/output guardrails and session management",
      "Minimal boilerplate and zero framework bloat",
    ],
    sampleCode: `from agents import Agent, Runner

def transfer_to_refund():
    return refund_agent

triage_agent = Agent(
    name="Triage Agent",
    instructions="Determine if the user wants billing or support.",
    functions=[transfer_to_refund]
)

result = Runner.run(triage_agent, input="I want my money back!")`,
    verdict: "Best for clean, no-nonsense Python implementations leveraging native OpenAI models.",
  },
];

export default function FrameworkComparisonMatrixVisualizer() {
  const [selectedFramework, setSelectedFramework] = useState<FrameworkId>("langgraph");
  const active = FRAMEWORKS.find((f) => f.id === selectedFramework)!;

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden my-6">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 px-5 py-4 bg-slate-50/80 dark:bg-slate-800/50 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-teal-500 animate-pulse" />
            <h3 className="font-bold text-base md:text-lg text-slate-900 dark:text-white">
              Interactive AI Agent Framework Compass
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            Compare LangGraph, CrewAI, AutoGen, and OpenAI Agents SDK across control, speed, and production readiness.
          </p>
        </div>

        <span className="px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-500/30">
          The Big 4 Frameworks
        </span>
      </div>

      {/* Tabs */}
      <div className="px-5 py-3 bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800/80 overflow-x-auto">
        <div className="flex items-center min-w-[620px] gap-2">
          {FRAMEWORKS.map((fw) => {
            const isSelected = fw.id === selectedFramework;
            return (
              <button
                key={fw.id}
                onClick={() => setSelectedFramework(fw.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
                  isSelected
                    ? "bg-teal-600 text-white font-bold border-teal-500 shadow-sm"
                    : "bg-white dark:bg-slate-900/40 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700/60 hover:border-slate-300"
                }`}
              >
                <span>{fw.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Stage */}
      <div className="p-5 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Architecture Details & Features */}
        <div className="lg:col-span-6 flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                {active.name}
              </h4>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-500/30 font-bold">
                {active.abstractionLevel}
              </span>
            </div>

            <span className="text-xs font-mono text-slate-500 dark:text-slate-400 block mb-3">
              Maintainer: <strong className="text-slate-800 dark:text-slate-200">{active.creator}</strong>
            </span>

            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              {active.philosophy}
            </p>

            <div className="space-y-3">
              <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60">
                <span className="font-bold text-teal-700 dark:text-teal-400 block mb-1.5 text-xs font-mono uppercase">
                  Key Capabilities:
                </span>
                <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300 font-mono">
                  {active.keyFeatures.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-teal-600 dark:text-teal-400">•</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 rounded-lg border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 text-xs">
                <span className="font-bold text-emerald-800 dark:text-emerald-400 block mb-1 text-xs font-mono uppercase">
                  Optimal Use Case:
                </span>
                <p className="text-emerald-950 dark:text-emerald-200">
                  {active.bestFor}
                </p>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[11px] font-mono text-slate-700 dark:text-slate-300">
            <strong>Tutor Verdict:</strong> {active.verdict}
          </div>
        </div>

        {/* Right: Code Sample */}
        <div className="lg:col-span-6 flex flex-col justify-between gap-4">
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-950 overflow-hidden shadow-inner flex-1 flex flex-col">
            <div className="px-3.5 py-1.5 bg-slate-900 border-b border-slate-800 text-xs font-mono text-slate-400 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-teal-400" />
                <span>Canonical Implementation Code</span>
              </div>
              <span className="text-[10px] text-teal-400">{active.id}_agent.py</span>
            </div>
            <pre className="p-4 text-xs font-mono text-teal-300 overflow-x-auto leading-relaxed flex-1">
              {active.sampleCode}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
