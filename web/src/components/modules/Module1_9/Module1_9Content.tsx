"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  Check,
  ArrowRight,
  Users,
  Cpu,
  GitBranch,
  Workflow,
  Network,
  HelpCircle,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  Zap,
  Layers,
  Copy,
  CheckCheck,
  Play,
  RotateCcw,
  Terminal,
} from "lucide-react";
import MultiAgentTopologySimulator from "./MultiAgentTopologySimulator";
import SingleVsMultiDecisionStudio from "./SingleVsMultiDecisionStudio";
import Module1_9Quiz from "./Module1_9Quiz";

export default function Module1_9Content() {
  const [selectedArch, setSelectedArch] = useState<string>("single");
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [activeCodeTab, setActiveCodeTab] = useState<"code" | "output">("code");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);

  const architectures = [
    {
      id: "single",
      title: "1. Solo ReAct",
      tagline: "Single-Loop Workhorse",
      desc: "One prompt, one LLM loop, and a focused tool catalog (<15 tools). Easiest to test, debug, and monitor.",
      icon: Cpu,
      color: "text-sky-600 dark:text-sky-400",
      bg: "bg-sky-50 dark:bg-sky-500/10",
      border: "border-sky-200 dark:border-sky-500/30",
      badge: "Lowest Latency",
      codeSnippet: `# Single-Agent ReAct Loop
agent = ReActAgent(
    model="gemini-2.0-flash",
    tools=[search_db, run_sql, format_table],
    system_prompt="You are a SQL data analyst."
)
response = agent.run("Show last month's churn rate by region.")`,
    },
    {
      id: "supervisor",
      title: "2. Supervisor",
      tagline: "Central Orchestrator",
      desc: "Master coordinator plans tasks and delegates sub-tasks to isolated worker agents, discarding exploration noise.",
      icon: GitBranch,
      color: "text-teal-600 dark:text-teal-400",
      bg: "bg-teal-50 dark:bg-teal-500/10",
      border: "border-teal-200 dark:border-teal-500/30",
      badge: "Industry Standard",
      codeSnippet: `# Supervisor Orchestration (Claude Code Pattern)
supervisor = SupervisorAgent(
    workers=[code_search_agent, test_runner_agent, git_agent]
)
# Supervisor delegates to isolated worker sandboxes
result = supervisor.execute_plan("Fix flaky unit tests in auth_service")`,
    },
    {
      id: "sequential",
      title: "3. Sequential",
      tagline: "Deterministic Pipeline",
      desc: "Static linear chain where each specialized agent transforms and feeds structured output to the next agent.",
      icon: Workflow,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-500/10",
      border: "border-purple-200 dark:border-purple-500/30",
      badge: "Zero Deviation",
      codeSnippet: `# Sequential Pipeline (Deep Research Pattern)
pipeline = SequentialPipeline([
    RequirementsClarifier(),  # Step 1
    DeepWebResearcher(),       # Step 2
    ReportSynthesizer()        # Step 3
])
executive_summary = pipeline.run("Analyze Q3 market shift in AI chips")`,
    },
    {
      id: "network",
      title: "4. Peer Swarm",
      tagline: "Decentralized Handoff",
      desc: "Autonomous peer agents hand off conversation state directly using transfer tools without central bottlenecks.",
      icon: Network,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      border: "border-amber-200 dark:border-amber-500/30",
      badge: "Dynamic Handoff",
      codeSnippet: `# Decentralized Swarm Handoff
triage_agent = Agent(name="Triage", tools=[transfer_to_billing, transfer_to_support])
billing_agent = Agent(name="Billing", tools=[process_refund, transfer_to_triage])

# Agents autonomously invoke transfer tools based on user intent`,
    },
  ];

  const currentArch =
    architectures.find((a) => a.id === selectedArch) || architectures[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentArch.codeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setActiveCodeTab("output");
    setSimStep(1);
    setTimeout(() => setSimStep(2), 1000);
    setTimeout(() => setSimStep(3), 2000);
    setTimeout(() => {
      setSimStep(4);
      setIsSimulating(false);
    }, 3000);
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
                <span>Evaluate single-agent vs multi-agent trade-offs without falling for hype</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                <span>Recognize the 15-tool confusion threshold where single agents start failing</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                <span>Master the 3 topologies: Supervisor, Sequential Pipeline, and Peer Network</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                <span>Apply the Architect's Simplicity Rule: Start solo, partition only when needed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: ARCHITECTURAL PARADIGMS (2x2 Mobile / 4-Col Desktop Grid) */}
      <section className="space-y-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30 text-teal-700 dark:text-teal-300 text-xs font-mono font-semibold mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>Architecture Patterns • Core Taxonomies</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Single-Agent vs. Multi-Agent Systems
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Single agents minimize latency, cost, and debugging headaches for focused tasks. Multi-agent teams partition complexity across specialized subagents with isolated context sandboxes.
          </p>
        </div>

        {/* 4 SYMMETRICAL CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {architectures.map((arch) => {
            const Icon = arch.icon;
            const isSelected = selectedArch === arch.id;

            return (
              <button
                key={arch.id}
                onClick={() => setSelectedArch(arch.id)}
                className={`p-3.5 sm:p-4 rounded-xl border text-left transition-all flex flex-col justify-between min-h-[145px] sm:min-h-[160px] active:scale-95 touch-manipulation cursor-pointer ${
                  isSelected
                    ? "border-teal-500 bg-white dark:bg-slate-900 shadow-md ring-2 ring-teal-500/20"
                    : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-2 rounded-lg ${arch.bg}`}>
                      <Icon className={`w-4 h-4 ${arch.color}`} />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {arch.badge}
                    </span>
                  </div>
                  <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                    {arch.title}
                  </h3>
                  <p className="text-[11px] font-medium text-teal-700 dark:text-teal-400 mt-0.5">
                    {arch.tagline}
                  </p>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                  {arch.desc}
                </p>
              </button>
            );
          })}
        </div>

        {/* LIVE STATE / ARCHITECTURE INSPECTOR */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 p-4 sm:p-5 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-teal-500 animate-pulse" />
              <span className="text-xs font-mono font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Active Architecture: {currentArch.title}
              </span>
            </div>
            <span className="text-xs font-mono text-teal-700 dark:text-teal-400 font-semibold">
              {currentArch.tagline}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {currentArch.desc}
          </p>

          <div className="pt-2">
            <pre className="p-3 rounded-lg bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto border border-slate-800">
              <code>{currentArch.codeSnippet}</code>
            </pre>
          </div>
        </div>

        {/* ✍️ REAL-WORLD ANALOGY (Clinic Doctor vs Hospital Surgical Team) */}
        <div className="rounded-xl border border-amber-300 dark:border-amber-500/30 bg-amber-50/70 dark:bg-amber-500/10 p-4 sm:p-5 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-base">💡</span>
            <h4 className="text-sm font-bold text-amber-950 dark:text-amber-200">
              Mental Model: Family Clinic Doctor vs. Hospital Surgical Team
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-amber-900 dark:text-amber-300 leading-relaxed">
            For a common fever, visiting a <strong>single doctor</strong> takes 10 minutes and gives immediate relief. Summoning a committee of 6 surgeons, an anesthesiologist, and a radiologist for a mild cold would be absurdly slow and expensive.
            <br />
            However, for open-heart surgery, that solo doctor cannot do it alone. You need a <strong>specialized hospital team</strong> (surgeon, cardiologist, anesthesiologist, scrub nurse) following strict surgical protocols.
          </p>
          <div className="pt-1">
            <span className="font-['Caveat',cursive] text-base text-amber-950 dark:text-amber-200 block sm:-rotate-0.5">
              ✍️ Instructor Note: &quot;Start with a single doctor! Only recruit the specialized surgical team when tool count (&gt;15) and parallel complexity demand it.&quot;
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 2: TOPOLOGY SIMULATOR (In-Context Workbench) */}
      <section className="space-y-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30 text-teal-700 dark:text-teal-300 text-xs font-mono font-semibold mb-2">
            <Workflow className="w-3.5 h-3.5" />
            <span>Interactive Simulator • Topologies in Action</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            The 3 Canonical Multi-Agent Topologies
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Explore how multi-agent teams communicate: Hierarchical Supervisors (Claude Code), Deterministic Pipelines (Deep Research), and Swarm Networks (Customer Service).
          </p>
        </div>

        <MultiAgentTopologySimulator />
      </section>

      {/* SECTION 3: DECISION DIAGNOSTIC STUDIO */}
      <section className="space-y-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30 text-teal-700 dark:text-teal-300 text-xs font-mono font-semibold mb-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>Architectural Compass • Diagnostic Studio</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Single-Agent vs. Multi-Agent Decision Engine
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Adjust your project parameters (tool count, concurrency needs, and persona divergence) to receive an immediate architecture recommendation.
          </p>
        </div>

        <SingleVsMultiDecisionStudio />
      </section>

      {/* SECTION 4: INTERACTIVE CODE EXECUTOR & RUNNER */}
      <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        {/* Terminal Header */}
        <div className="border-b border-slate-200 dark:border-slate-800 px-4 py-3 bg-slate-50 dark:bg-slate-800/60 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200">
              multi_agent_supervisor.py
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
              <span>{isSimulating ? "Running..." : "Run Pipeline"}</span>
            </button>
          </div>
        </div>

        {/* Tab Body */}
        <div className="p-4 sm:p-5 bg-slate-950 font-mono text-xs text-slate-200 min-h-[220px]">
          {activeCodeTab === "code" ? (
            <pre className="overflow-x-auto leading-relaxed">
              <code>{`# LangGraph Multi-Agent Supervisor Pattern
from langchain_core.messages import HumanMessage
from langgraph.graph import StateGraph, START, END

# 1. Define Specialized Subagents
def researcher_agent(state):
    # Runs search tools in isolation; returns factual summary
    return {"messages": ["Researcher: Retrieved 5 relevant financial reports."]}

def coder_agent(state):
    # Runs code interpreter in clean sandbox
    return {"messages": ["Coder: Executed pandas script; churn rate = 3.2%."]}

# 2. Supervisor Orchestrator Router
def supervisor_node(state):
    # Decides whether to route to researcher, coder, or finish
    last_msg = state["messages"][-1]
    if "Retrieved" in last_msg:
        return "coder"
    return END

# 3. Compile Graph with Shallow Hierarchy
workflow = StateGraph(dict)
workflow.add_node("researcher", researcher_agent)
workflow.add_node("coder", coder_agent)
workflow.add_conditional_edges("researcher", supervisor_node)
app = workflow.compile()`}</code>
            </pre>
          ) : (
            <div className="space-y-2 text-slate-300">
              <div className="text-teal-400 font-bold">
                [SYSTEM] Initializing Supervisor Graph Orchestrator...
              </div>
              {simStep >= 1 && (
                <div className="text-sky-300">
                  ➜ [SUPERVISOR] Delegating task to isolated subagent: `researcher`
                </div>
              )}
              {simStep >= 2 && (
                <div className="text-slate-400 pl-4">
                  [RESEARCHER] Executing web_search(&quot;SaaS churn benchmark 2026&quot;)... (discarding 120 raw HTML docs)
                  <br />
                  <span className="text-emerald-400">✔ Done: Retrieved verified summary.</span>
                </div>
              )}
              {simStep >= 3 && (
                <div className="text-purple-300">
                  ➜ [SUPERVISOR] Routing verified payload to: `coder`
                  <br />
                  <span className="text-slate-400 pl-4">[CODER] Running sandbox calculation: churn_rate = 3.2%</span>
                </div>
              )}
              {simStep >= 4 && (
                <div className="text-emerald-400 font-bold pt-2 border-t border-slate-800">
                  ✔ [SUPERVISOR] Task complete! Clean final synthesis returned to user.
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* SECTION 5: COMMON TRAPS & ARCHITECTURAL PITFALLS */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          <span>Architectural Traps to Avoid</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-500/30 bg-rose-50/50 dark:bg-rose-500/5 space-y-2">
            <span className="text-xs font-mono font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider block">
              TRAP #1: Premature Multi-Agent Swarms
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Splitting a simple CRUD or search task into 5 debating agents creates massive token latency, high bills, and non-deterministic loops. If a single prompt with 4 tools can do the job, keep it single-agent!
            </p>
          </div>

          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-500/5 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
              TRAP #2: The 15-Tool Hallucination Wall
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Research demonstrates model accuracy plunges when one agent is loaded with &gt;15-20 tools at once (tool confusion). When you cross this threshold, partition into specialized subagents holding 3-5 tools each!
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
            <span><strong>Default to Single-Agent:</strong> It delivers the lowest latency, lowest cost, and easiest observability.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal-600 dark:text-teal-400 font-bold">2.</span>
            <span><strong>Partition on 3 Triggers:</strong> Split only when tool count &gt;15, strict parallel concurrency is required, or roles directly conflict.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal-600 dark:text-teal-400 font-bold">3.</span>
            <span><strong>Use Shallow Hierarchies:</strong> In supervisor setups (like Claude Code), worker subagents run in isolated sandboxes and discard noise before reporting back.</span>
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
                Concept Check: Single-Agent vs. Multi-Agent
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {showQuiz ? "Click to collapse questions" : "Click to test your architecture intuition (3 questions)"}
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
              <Module1_9Quiz />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* SECTION 8: NEXT MODULE BRIDGE */}
      <section className="rounded-2xl border border-teal-200 dark:border-teal-500/30 bg-gradient-to-r from-teal-50 via-white to-slate-50 dark:from-teal-500/10 dark:via-slate-900 dark:to-slate-950 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider">
            <span>Up Next • Module 1.10</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Enhancing Agents with Retrieval-Augmented Generation (RAG)
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
            Learn how autonomous agents convert static RAG pipelines into dynamic, agentic search tools with self-correction, query re-writing, and iterative chunk retrieval.
          </p>
        </div>

        <Link
          href="/learn/level-1/module-1-10"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow-teal-500/20 transition-all shrink-0 cursor-pointer"
        >
          <span>Continue to Module 1.10</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
