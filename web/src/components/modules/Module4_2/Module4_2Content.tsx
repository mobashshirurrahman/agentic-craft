"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  Check,
  ArrowRight,
  Users,
  Code2,
  Layers,
  Sparkles,
  HelpCircle,
  Copy,
  CheckCheck,
  Play,
  RotateCcw,
  FileText,
  AlertTriangle,
  GitBranch,
  Crown,
  Cpu,
  Workflow,
} from "lucide-react";
import SupervisorAgentStudio from "./SupervisorAgentStudio";
import Module4_2Quiz from "./Module4_2Quiz";

export default function Module4_2Content() {
  const [selectedPillar, setSelectedPillar] = useState<string>("supervisor");
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [activeCodeTab, setActiveCodeTab] = useState<"code" | "output">("code");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);

  const pillars = [
    {
      id: "supervisor",
      title: "1. The Supervisor Router",
      tagline: "Central Task Dispatcher",
      desc: "An orchestrator LLM with no tools of its own. It reads user goals, tracks worker progress, and outputs structured routing decisions specifying which worker acts next.",
      icon: Crown,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      border: "border-amber-200 dark:border-amber-500/30",
      badge: "Router LLM",
      codeSnippet: `# 1. SUPERVISOR ROUTING NODE
from typing import Literal
from pydantic import BaseModel, Field
from langchain_openai import ChatOpenAI

members = ["researcher", "coder", "reviewer"]

class RouteResponse(BaseModel):
    next_worker: Literal["researcher", "coder", "reviewer", "FINISH"] = Field(
        description="The next specialized worker agent to act, or FINISH if done."
    )
    instructions: str = Field(description="Specific subtask delegated to the worker.")

supervisor_llm = ChatOpenAI(model="gpt-4o", temperature=0)
supervisor_chain = supervisor_llm.with_structured_output(RouteResponse)

def supervisor_node(state: SupervisorState) -> dict:
    decision = supervisor_chain.invoke(state["messages"])
    return {"next": decision.next_worker, "delegated_task": decision.instructions}`,
    },
    {
      id: "specialists",
      title: "2. Focused Worker Nodes",
      tagline: "Context-Isolated Agents",
      desc: "Each worker possesses only 3-5 tools specific to its domain. With minimal tool noise and zero context clutter, worker accuracy remains high.",
      icon: Cpu,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-500/10",
      border: "border-blue-200 dark:border-blue-500/30",
      badge: "create_react_agent",
      codeSnippet: `# 2. SPECIALIST WORKER AGENTS
from langgraph.prebuilt import create_react_agent

# Research Specialist: Has only search and scrapers
researcher_agent = create_react_agent(
    model=ChatOpenAI(model="gpt-4o-mini"),
    tools=[tavily_search, scrape_web_page],
    name="researcher"
)

# Coding Specialist: Has only python execution and linter
coder_agent = create_react_agent(
    model=ChatOpenAI(model="gpt-4o"),
    tools=[python_repl, run_tests],
    name="coder"
)

def researcher_node(state: SupervisorState) -> dict:
    result = researcher_agent.invoke(state["messages"])
    return {"messages": [result["messages"][-1]]}`,
    },
    {
      id: "hub_and_spoke",
      title: "3. Hub-and-Spoke Flow",
      tagline: "Zero Peer-to-Peer Spaghetti",
      desc: "Workers never message each other directly. All intermediate observations flow back to the central Supervisor, creating a clean, centralized audit trail.",
      icon: Workflow,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-500/10",
      border: "border-purple-200 dark:border-purple-500/30",
      badge: "Hub & Spoke",
      codeSnippet: `# 3. HUB-AND-SPOKE TOPOLOGY IN LANGGRAPH
from langgraph.graph import StateGraph, START, END

builder = StateGraph(SupervisorState)
builder.add_node("supervisor", supervisor_node)
builder.add_node("researcher", researcher_node)
builder.add_node("coder", coder_node)

builder.add_edge(START, "supervisor")

# Conditional edge routes from Supervisor to chosen worker or END
builder.add_conditional_edges(
    "supervisor",
    lambda state: state["next"],
    {"researcher": "researcher", "coder": "coder", "FINISH": END}
)

# All workers strictly report BACK to the supervisor
builder.add_edge("researcher", "supervisor")
builder.add_edge("coder", "supervisor")

team_app = builder.compile()`,
    },
    {
      id: "handoffs",
      title: "4. State Message Synthesis",
      tagline: "Shared Blackboard Memory",
      desc: "Messages exchanged by workers are labeled with sender metadata. The supervisor synthesizes the team's collective findings into a single cohesive response.",
      icon: Layers,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      border: "border-emerald-200 dark:border-emerald-500/30",
      badge: "Blackboard State",
      codeSnippet: `# 4. BLACKBOARD STATE WITH SENDER LABELS
from typing import TypedDict, Annotated
from langgraph.graph.message import add_messages
from langchain_core.messages import BaseMessage

class SupervisorState(TypedDict):
    messages: Annotated[list[BaseMessage], add_messages]
    next: str
    delegated_task: str

# Example message trace:
# 1. User: "Analyze Nvidia revenue and write a Python visualizer"
# 2. Supervisor -> routes to 'researcher'
# 3. Researcher: "Nvidia FY24 revenue was $60.9B (up 126%)"
# 4. Supervisor -> routes to 'coder' with revenue data
# 5. Coder: "import matplotlib.pyplot as plt..."
# 6. Supervisor -> routes to 'FINISH'`,
    },
  ];

  const currentSnippet = pillars.find((p) => p.id === selectedPillar)?.codeSnippet || "";

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const runSimulation = () => {
    setIsSimulating(true);
    setSimStep(1);
    setTimeout(() => setSimStep(2), 700);
    setTimeout(() => setSimStep(3), 1400);
    setTimeout(() => {
      setSimStep(4);
      setIsSimulating(false);
    }, 2100);
  };

  return (
    <div className="space-y-10">
      {/* HERO BANNER */}
      <div className="rounded-2xl border border-amber-200 dark:border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-yellow-500/5 to-slate-50 dark:to-slate-950 p-6 md:p-8 relative overflow-hidden transition-colors">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30">
              Module 4.2 • Multi-Agent Orchestration
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              ~20 min interactive
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Building Multi-Agent Supervisor Systems
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Giving a single agent 20 tools degrades its reasoning capabilities. In this lesson, we architect a <strong>Multi-Agent Supervisor system</strong>: a centralized manager routing subtasks to isolated, specialized worker agents in a clean Hub-and-Spoke topology.
          </p>
        </div>
      </div>

      {/* SECTION 1: 4 PILLARS OF SUPERVISOR SYSTEMS */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-amber-500" />
            1. Core Mechanics of Supervisor Systems
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Select an architecture component
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            const isSelected = selectedPillar === pillar.id;
            return (
              <button
                key={pillar.id}
                onClick={() => setSelectedPillar(pillar.id)}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? `${pillar.border} ${pillar.bg} shadow-md ring-1 ring-amber-500/50`
                    : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className={`p-2 rounded-lg ${pillar.bg} ${pillar.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 font-semibold">
                      {pillar.badge}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    {pillar.title}
                  </h3>
                  <div className="text-[11px] font-medium text-amber-600 dark:text-amber-400">
                    {pillar.tagline}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* SECTION 2: CODE & EXECUTION INSPECTOR */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-amber-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white font-mono uppercase tracking-wider">
              Supervisor Graph Inspector
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={runSimulation}
              disabled={isSimulating}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold shadow-xs disabled:opacity-50 transition-all cursor-pointer"
            >
              {isSimulating ? (
                <>
                  <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                  <span>Routing Agents...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Simulate Delegation</span>
                </>
              )}
            </button>
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 text-slate-600 dark:text-slate-400 text-xs font-mono transition-all cursor-pointer"
            >
              {copiedCode ? <CheckCheck className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? "Copied" : "Copy"}</span>
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden text-xs font-mono shadow-md">
          <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800/80 bg-slate-900/60">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
              <span className="text-slate-400 text-[11px] ml-2 font-mono">
                supervisor_team.py • {selectedPillar}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveCodeTab("code")}
                className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition-all ${
                  activeCodeTab === "code"
                    ? "bg-amber-600/30 text-amber-300 border border-amber-500/40"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Code
              </button>
              <button
                onClick={() => setActiveCodeTab("output")}
                className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition-all ${
                  activeCodeTab === "output"
                    ? "bg-amber-600/30 text-amber-300 border border-amber-500/40"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Team Execution Log
              </button>
            </div>
          </div>

          <div className="p-4 overflow-x-auto text-slate-300 leading-relaxed font-mono">
            {activeCodeTab === "code" ? (
              <pre>
                <code>{currentSnippet}</code>
              </pre>
            ) : (
              <div className="space-y-2 text-amber-300 font-mono text-[11px]">
                <p className="text-slate-400">&gt;&gt; Prompt: &quot;Find AAPL Q3 revenue and build a matplotlib bar chart&quot;</p>
                <p className="text-purple-400">[Supervisor] Evaluated prompt -&gt; Decision: next_worker=&apos;researcher&apos;</p>
                <p className="text-blue-300">[Researcher] Querying financial web API... Result: $85.8B revenue reported</p>
                <p className="text-purple-400">[Supervisor] Read research result -&gt; Decision: next_worker=&apos;coder&apos;</p>
                <p className="text-emerald-300">[Coder] Generated and executed script: chart saved to revenue_chart.png ✅</p>
                <p className="text-purple-400 font-bold">[Supervisor] Verified both subtasks complete -&gt; Decision: FINISH</p>
              </div>
            )}
          </div>
        </div>

        {/* Simulation Banner */}
        {simStep > 0 && (
          <div className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/80 dark:bg-amber-950/30 flex items-center justify-between text-xs font-mono">
            <span className="text-amber-800 dark:text-amber-200">
              {simStep === 1 && "Goal arrives -> Supervisor chooses 'researcher' specialist for step 1"}
              {simStep === 2 && "Researcher executes search tools in isolation -> returns finding to Supervisor"}
              {simStep === 3 && "Supervisor delegates findings to 'coder' specialist for chart generation"}
              {simStep === 4 && "Coder finishes -> Supervisor confirms all requirements met -> FINISH!"}
            </span>
            <span className="text-amber-600 dark:text-amber-400 font-bold">
              Step {simStep}/4
            </span>
          </div>
        )}
      </section>

      {/* SECTION 3: INTERACTIVE STUDIO */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            2. Interactive Supervisor Agent Studio
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Hub-and-Spoke Live Simulation
          </span>
        </div>
        <SupervisorAgentStudio />
      </section>

      {/* SECTION 4: HANDWRITTEN NOTE */}
      <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/90 dark:bg-amber-500/10 shadow-sm">
        <span className="font-['Caveat',cursive] text-base text-amber-950 dark:text-amber-200 block">
          📌 Cognitive Load Law: An LLM with 20 tools degrades in accuracy by over 35%. By splitting 20 tools across 4 specialized workers (5 tools each) managed by 1 supervisor, overall system accuracy jumps back to 95%!
        </span>
      </div>

      {/* SECTION 5: TRAPS & PITFALLS */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          Common Engineering Traps
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-500/30 bg-rose-50/50 dark:bg-rose-500/5 space-y-2">
            <span className="text-xs font-mono font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider block">
              TRAP #1: The Ping-Pong Routing Loop
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              If Worker A produces an ambiguous observation, the Supervisor might delegate back to Worker B, who delegates back to Worker A. Enforce a hard ceiling on <code>recursion_limit</code> (e.g. 15 turns) to prevent token-draining ping-pong cycles.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-500/5 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
              TRAP #2: Giving the Supervisor Tools
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Never give the supervisor direct tool access. If the manager can query search itself, it frequently gets lazy, attempts to do all work directly, and bypasses the worker specialists entirely. The supervisor must ONLY orchestrate.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6: KEY TAKEAWAYS */}
      <section className="rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-500/5 p-5 space-y-3">
        <h4 className="font-bold text-sm text-amber-900 dark:text-amber-300 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          Key Architectural Takeaways
        </h4>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          {[
            ["1.", "Hub-and-Spoke Efficiency:", "Centralized routing avoids peer-to-peer network complexity and maintains clean message history."],
            ["2.", "Cognitive Specialization:", "Restricting workers to 3-5 tools ensures high tool selection precision."],
            ["3.", "Independent Scalability:", "Specialist agents can use different models (e.g. gpt-4o-mini for scraping, gpt-4o for code generation) to optimize cost and latency."],
          ].map(([n, bold, rest]) => (
            <li key={n} className="flex items-start gap-2">
              <span className="text-amber-600 dark:text-amber-400 font-bold">{n}</span>
              <span><strong>{bold}</strong> {rest}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* SECTION 7: QUIZ */}
      <section className="space-y-3">
        <button
          onClick={() => setShowQuiz(!showQuiz)}
          className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all text-left cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                Concept Check: Supervisor Systems
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {showQuiz ? "Click to collapse" : "Test your understanding of supervisor patterns (3 questions)"}
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-semibold px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30">
            {showQuiz ? "Hide Quiz" : "Start Quiz"}
          </span>
        </button>
        <AnimatePresence>
          {showQuiz && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Module4_2Quiz />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* SECTION 8: NEXT MODULE BRIDGE */}
      <section className="rounded-2xl border border-amber-200 dark:border-amber-500/30 bg-gradient-to-r from-amber-50 via-white to-slate-50 dark:from-amber-500/10 dark:via-slate-900 dark:to-slate-950 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
            <span>Up Next • Module 4.3</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Building Multi-Agent Swarm Systems</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
            What happens when there is no manager? Discover OpenAI-style Swarm architectures: decentralized agent handoffs where agents pass conversations directly to peers.
          </p>
        </div>
        <Link
          href="/learn/level-4/module-4-3"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow-amber-500/20 transition-all shrink-0 cursor-pointer"
        >
          <span>Continue to Module 4.3</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
