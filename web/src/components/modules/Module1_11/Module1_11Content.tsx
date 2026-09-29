"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  Check,
  ArrowRight,
  Workflow,
  Cpu,
  Layers,
  Terminal,
  HelpCircle,
  AlertTriangle,
  Sparkles,
  Zap,
  Copy,
  CheckCheck,
  Play,
  RotateCcw,
  Compass,
  Code2,
  Users,
  ShieldCheck,
} from "lucide-react";
import FrameworkComparisonMatrixVisualizer from "./FrameworkComparisonMatrixVisualizer";
import FrameworkSelectorCompass from "./FrameworkSelectorCompass";
import Module1_11Quiz from "./Module1_11Quiz";

export default function Module1_11Content() {
  const [selectedFw, setSelectedFw] = useState<string>("langgraph");
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [activeCodeTab, setActiveCodeTab] = useState<"code" | "output">("code");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);

  const frameworks = [
    {
      id: "langgraph",
      title: "1. LangGraph",
      tagline: "State Graph Engine",
      desc: "Cyclic graph workflows with low-level state schemas, durable checkpointing, time-travel, and human approval gates.",
      icon: Workflow,
      color: "text-sky-600 dark:text-sky-400",
      bg: "bg-sky-50 dark:bg-sky-500/10",
      border: "border-sky-200 dark:border-sky-500/30",
      badge: "Enterprise Standard",
      codeSnippet: `# LangGraph: Explicit State & Nodes
from langgraph.graph import StateGraph, START, END

graph = StateGraph(AgentState)
graph.add_node("agent", call_llm)
graph.add_node("tools", run_tools)
graph.add_edge(START, "agent")
graph.add_conditional_edges("agent", route_decision, ["tools", END])
app = graph.compile(checkpointer=PostgresSaver())`,
    },
    {
      id: "crewai",
      title: "2. CrewAI",
      tagline: "Role-Playing Multi-Agent",
      desc: "High-level abstractions modeled on human organizations (Role, Goal, Backstory) with automatic delegation.",
      icon: Users,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-500/10",
      border: "border-purple-200 dark:border-purple-500/30",
      badge: "Fastest Prototyping",
      codeSnippet: `# CrewAI: Role-Playing Agents
researcher = Agent(
    role="Lead Market Analyst",
    goal="Extract AI adoption metrics",
    backstory="Senior researcher with 10 years tech equity experience."
)
task = Task(description="Analyze 2026 agent trends", agent=researcher)
crew = Crew(agents=[researcher], tasks=[task])
crew.kickoff()`,
    },
    {
      id: "autogen",
      title: "3. AutoGen",
      tagline: "Conversational Event Bus",
      desc: "Microsoft Research multi-agent framework centered on asynchronous message exchange, debate, and emergent behavior.",
      icon: Cpu,
      color: "text-teal-600 dark:text-teal-400",
      bg: "bg-teal-50 dark:bg-teal-500/10",
      border: "border-teal-200 dark:border-teal-500/30",
      badge: "Research & Debate",
      codeSnippet: `# AutoGen: Conversational Messaging
assistant = AssistantAgent("assistant", llm_config={"model": "gpt-4o"})
user_proxy = UserProxyAgent("proxy", code_execution_config={"work_dir": "run"})

# Agents converse iteratively to solve the task
user_proxy.initiate_chat(assistant, message="Write and verify a web scraper.")`,
    },
    {
      id: "openai_sdk",
      title: "4. Agents SDK",
      tagline: "Minimal Python Primitives",
      desc: "Lightweight, Pythonic orchestrations with clean function-based handoffs, input/output guardrails, and zero framework bloat.",
      icon: Code2,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      border: "border-amber-200 dark:border-amber-500/30",
      badge: "Zero Bloat",
      codeSnippet: `# OpenAI Agents SDK (Swarm Pattern)
def transfer_to_support():
    return support_agent

triage_agent = Agent(
    name="Triage",
    instructions="Route users to support or sales based on intent.",
    functions=[transfer_to_support]
)
result = Runner.run(triage_agent, input="Help with my subscription.")`,
    },
  ];

  const currentFw =
    frameworks.find((f) => f.id === selectedFw) || frameworks[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentFw.codeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setActiveCodeTab("output");
    setSimStep(1);
    setTimeout(() => setSimStep(2), 900);
    setTimeout(() => setSimStep(3), 1800);
    setTimeout(() => {
      setSimStep(4);
      setIsSimulating(false);
    }, 2800);
  };

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
                <span>Compare the Big 4 frameworks: LangGraph, CrewAI, AutoGen, and OpenAI Agents SDK</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                <span>Understand control abstractions: Explicit State Graphs vs Role-Playing Crews</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                <span>Implement durable state persistence and Human-in-the-Loop approval checkpoints</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                <span>Overcome Framework Lock-in Anxiety by mastering transferable core agent principles</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: THE BIG 4 FRAMEWORKS (2x2 Mobile / 4-Col Desktop Grid) */}
      <section className="space-y-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30 text-teal-700 dark:text-teal-300 text-xs font-mono font-semibold mb-2">
            <Workflow className="w-3.5 h-3.5" />
            <span>Framework Landscape • Abstractions & Tradeoffs</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Evaluating AI Agent Frameworks
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Frameworks provide pre-built state management, cyclic routing, and tool dispatching. Choose based on whether your system prioritizes low-level control or speed of prototyping.
          </p>
        </div>

        {/* 4 SYMMETRICAL CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {frameworks.map((fw) => {
            const Icon = fw.icon;
            const isSelected = selectedFw === fw.id;

            return (
              <button
                key={fw.id}
                onClick={() => setSelectedFw(fw.id)}
                className={`p-3.5 sm:p-4 rounded-xl border text-left transition-all flex flex-col justify-between min-h-[145px] sm:min-h-[160px] active:scale-95 touch-manipulation cursor-pointer ${
                  isSelected
                    ? "border-teal-500 bg-white dark:bg-slate-900 shadow-md ring-2 ring-teal-500/20"
                    : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-2 rounded-lg ${fw.bg}`}>
                      <Icon className={`w-4 h-4 ${fw.color}`} />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {fw.badge}
                    </span>
                  </div>
                  <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                    {fw.title}
                  </h3>
                  <p className="text-[11px] font-medium text-teal-700 dark:text-teal-400 mt-0.5">
                    {fw.tagline}
                  </p>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                  {fw.desc}
                </p>
              </button>
            );
          })}
        </div>

        {/* LIVE STATE / CODE INSPECTOR */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 p-4 sm:p-5 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-teal-500 animate-pulse" />
              <span className="text-xs font-mono font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Framework Focus: {currentFw.title}
              </span>
            </div>
            <span className="text-xs font-mono text-teal-700 dark:text-teal-400 font-semibold">
              {currentFw.tagline}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {currentFw.desc}
          </p>

          <div className="pt-2">
            <pre className="p-3 rounded-lg bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto border border-slate-800">
              <code>{currentFw.codeSnippet}</code>
            </pre>
          </div>
        </div>

        {/* ✍️ REAL-WORLD ANALOGY (Workshop Power Tools) */}
        <div className="rounded-xl border border-amber-300 dark:border-amber-500/30 bg-amber-50/70 dark:bg-amber-500/10 p-4 sm:p-5 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-base">💡</span>
            <h4 className="text-sm font-bold text-amber-950 dark:text-amber-200">
              Mental Model: Workshop Hand Chisels vs. Modular Industrial Power Tools
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-amber-900 dark:text-amber-300 leading-relaxed">
            Could you build a modern kitchen table by manually cutting timber with a pocket knife and hand-carving every dowel? Yes, but you will waste months.
            <br />
            • <strong>LangGraph</strong> is the programmable industrial CNC milling machine: calibrated, total control over every cut, zero surprises.
            <br />
            • <strong>CrewAI</strong> is the modular flat-pack furniture kit: assemble specialized pieces in 2 hours with intuitive role instructions.
            <br />
            • <strong>OpenAI Agents SDK</strong> is the lightweight electric screwdriver: sleek, zero bulk, perfect for straightforward jobs.
          </p>
          <div className="pt-1">
            <span className="font-['Caveat',cursive] text-base text-amber-950 dark:text-amber-200 block sm:-rotate-0.5">
              ✍️ Instructor Note: &quot;Don&apos;t marry a framework for life. Pick the right power tool for the specific product milestone in front of you!&quot;
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 2: FRAMEWORK COMPARISON MATRIX (In-Context Visualizer) */}
      <section className="space-y-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30 text-teal-700 dark:text-teal-300 text-xs font-mono font-semibold mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>Interactive Compass • Architectural Breakdown</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Head-to-Head Framework Comparison
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Review canonical code samples, maintainers, design philosophies, and production strengths across the Big 4 frameworks.
          </p>
        </div>

        <FrameworkComparisonMatrixVisualizer />
      </section>

      {/* SECTION 3: DECISION WIZARD COMPASS */}
      <section className="space-y-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30 text-teal-700 dark:text-teal-300 text-xs font-mono font-semibold mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>Decision Diagnostic • Anti-Paralysis Wizard</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Pick Your Framework in 30 Seconds
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Eliminate endless framework debates by selecting your immediate project constraint.
          </p>
        </div>

        <FrameworkSelectorCompass />
      </section>

      {/* SECTION 4: INTERACTIVE CODE EXECUTOR & RUNNER */}
      <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        {/* Terminal Header */}
        <div className="border-b border-slate-200 dark:border-slate-800 px-4 py-3 bg-slate-50 dark:bg-slate-800/60 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200">
              langgraph_state_machine.py
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex bg-slate-200 dark:bg-slate-700 p-0.5 rounded-lg text-[11px] font-mono">
              <button
                onClick={() => setActiveCodeTab("code")}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  activeCodeTab === "code"
                    ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold shadow-xs"
                    : "text-slate-600 dark:text-slate-400"
                }`}
              >
                Code
              </button>
              <button
                onClick={() => setActiveCodeTab("output")}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  activeCodeTab === "output"
                    ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold shadow-xs"
                    : "text-slate-600 dark:text-slate-400"
                }`}
              >
                Live Output
              </button>
            </div>

            <button
              onClick={handleCopyCode}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              title="Copy code"
            >
              {copiedCode ? (
                <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>

            <button
              onClick={handleRunSimulation}
              disabled={isSimulating}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-mono text-xs font-semibold shadow-xs disabled:opacity-50 transition-all cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isSimulating ? "Compiling..." : "Execute Graph"}</span>
            </button>
          </div>
        </div>

        {/* Tab Body */}
        <div className="p-4 sm:p-5 bg-slate-950 font-mono text-xs text-slate-200 min-h-[220px]">
          {activeCodeTab === "code" ? (
            <pre className="overflow-x-auto leading-relaxed">
              <code>{`# LangGraph: Enterprise State Machine with Human Checkpoint
from typing import TypedDict, Annotated, List
from langgraph.graph import StateGraph, START, END
from langgraph.checkpoint.memory import MemorySaver

class IncidentState(TypedDict):
    service: str
    severity: str
    action: str
    approved: bool

def diagnose_node(state: IncidentState):
    return {"action": "restart_redis_cluster", "approved": False}

def human_approval_gate(state: IncidentState):
    # Pauses graph execution until human operator enters approval
    if not state["approved"]:
        return "await_human"
    return "execute"

workflow = StateGraph(IncidentState)
workflow.add_node("diagnose", diagnose_node)
workflow.add_node("execute", lambda s: {"action": "Restarted successfully"})
workflow.add_conditional_edges("diagnose", human_approval_gate, {
    "await_human": END,
    "execute": "execute"
})
app = workflow.compile(checkpointer=MemorySaver())`}</code>
            </pre>
          ) : (
            <div className="space-y-2 text-slate-300">
              <div className="text-teal-400 font-bold">
                [LANGGRAPH] Initializing StateGraph compiler with MemorySaver checkpointer...
              </div>
              {simStep >= 1 && (
                <div className="text-sky-300">
                  ➜ [NODE: diagnose] Running diagnosis on `service=&apos;auth-db&apos;`...
                  <br />
                  <span className="text-slate-400 pl-4">Proposed remediation: `restart_redis_cluster`</span>
                </div>
              )}
              {simStep >= 2 && (
                <div className="text-amber-300">
                  ⏸ [HUMAN APPROVAL GATE] Action involves critical infra! Execution paused.
                  <br />
                  <span className="text-slate-400 pl-4">State safely checkpointed to thread_id=&apos;tx_9012&apos;.</span>
                </div>
              )}
              {simStep >= 3 && (
                <div className="text-purple-300">
                  ➜ [HUMAN OPERATOR] Approved via webhook signature: `approved=True`
                  <br />
                  <span className="text-slate-400 pl-4">Resuming thread from checkpoint node &apos;execute&apos;...</span>
                </div>
              )}
              {simStep >= 4 && (
                <div className="text-emerald-400 font-bold pt-2 border-t border-slate-800">
                  ✔ [SUCCESS] Action &apos;restart_redis_cluster&apos; completed with full audit trace.
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* SECTION 5: COMMON TRAPS & PITFALLS */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          <span>Framework Traps to Avoid</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-500/30 bg-rose-50/50 dark:bg-rose-500/5 space-y-2">
            <span className="text-xs font-mono font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider block">
              TRAP #1: Framework Analysis Paralysis
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Teams frequently waste 3 to 4 weeks arguing over which framework is &quot;future-proof&quot;. Core agentic principles (tool schemas, prompts, state representations, and evaluation rubrics) are 100% portable. Build with whatever is fastest right now!
            </p>
          </div>

          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-500/5 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
              TRAP #2: Overkill Graph Architectures for Simple Tasks
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Deploying a multi-node cyclical LangGraph graph for a task that requires a single system prompt and 1 tool call introduces massive cognitive and deployment overhead. Only add graph complexity when you need persistence or branching logic!
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6: KEY TAKEAWAYS */}
      <section className="rounded-xl border border-teal-200 dark:border-teal-500/30 bg-teal-50/50 dark:bg-teal-500/5 p-5 space-y-3">
        <h4 className="font-bold text-sm text-teal-900 dark:text-teal-300 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          <span>Key Architectural Takeaways</span>
        </h4>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          <li className="flex items-start gap-2">
            <span className="text-teal-600 dark:text-teal-400 font-bold">1.</span>
            <span><strong>LangGraph for Production Control:</strong> Choose LangGraph when state durability, checkpointing, and human approval gates are mandatory enterprise requirements.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal-600 dark:text-teal-400 font-bold">2.</span>
            <span><strong>CrewAI for Rapid Collaboration:</strong> Choose CrewAI when you want to prototype collaborative multi-agent teams with roleplay personas in hours.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal-600 dark:text-teal-400 font-bold">3.</span>
            <span><strong>Concepts Outlast Frameworks:</strong> Well-designed tool schemas, clear prompts, and robust state machines easily migrate across libraries as the ecosystem matures.</span>
          </li>
        </ul>
      </section>

      {/* SECTION 7: EXPANDABLE KNOWLEDGE CHECK QUIZ */}
      <section className="space-y-3">
        <button
          onClick={() => setShowQuiz(!showQuiz)}
          className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all text-left shadow-xs cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                Concept Check: Framework Evaluation
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {showQuiz ? "Click to collapse questions" : "Click to test your framework evaluation intuition (3 questions)"}
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-semibold px-3 py-1.5 rounded-lg bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-400 border border-teal-200 dark:border-teal-500/30">
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
              <Module1_11Quiz />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* SECTION 8: NEXT MODULE BRIDGE */}
      <section className="rounded-2xl border border-teal-200 dark:border-teal-500/30 bg-gradient-to-r from-teal-50 via-white to-slate-50 dark:from-teal-500/10 dark:via-slate-900 dark:to-slate-950 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider">
            <span>Up Next • Module 1.12</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Real-World Applications for AI Agents
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
            Examine high-impact production agent deployments across Software Engineering, Financial Analysis, Customer Operations, and Legal Due Diligence.
          </p>
        </div>

        <Link
          href="/learn/level-1/module-1-12"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow-teal-500/20 transition-all shrink-0 cursor-pointer"
        >
          <span>Continue to Module 1.12</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
