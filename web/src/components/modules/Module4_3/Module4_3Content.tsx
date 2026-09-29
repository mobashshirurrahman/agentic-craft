"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  Check,
  ArrowRight,
  Network,
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
  ArrowRightLeft,
  Users,
  Workflow,
  Share2,
} from "lucide-react";
import SwarmAgentStudio from "./SwarmAgentStudio";
import Module4_3Quiz from "./Module4_3Quiz";

export default function Module4_3Content() {
  const [selectedPillar, setSelectedPillar] = useState<string>("handoff");
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [activeCodeTab, setActiveCodeTab] = useState<"code" | "output">("code");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);

  const pillars = [
    {
      id: "handoff",
      title: "1. Handoff Functions",
      tagline: "Tool-Based Routing",
      desc: "In a Swarm, an agent hands off control by calling a transfer function as a tool: transfer_to_refund_specialist(). The runtime detects the transfer tool and switches the active agent.",
      icon: ArrowRightLeft,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      border: "border-amber-200 dark:border-amber-500/30",
      badge: "transfer_to_*()",
      codeSnippet: `# 1. SWARM HANDOFF FUNCTION PATTERN
from langchain_core.tools import tool

@tool
def transfer_to_billing(reason: str) -> str:
    """Hands off the conversation to the Billing & Refund Specialist."""
    return f"HANDOFF_TO:billing_agent|Reason: {reason}"

@tool
def transfer_to_tech_support(hardware_type: str) -> str:
    """Hands off the conversation to Tech Support."""
    return f"HANDOFF_TO:tech_support_agent|Hardware: {hardware_type}"

# Triage agent has only handoff tools:
triage_tools = [transfer_to_billing, transfer_to_tech_support]`,
    },
    {
      id: "decentralization",
      title: "2. Decentralized Peer Execution",
      tagline: "Zero Bottleneck Architecture",
      desc: "Unlike the Supervisor pattern, there is no master agent overseeing every turn. Specialist agents talk directly to users and execute autonomous handoffs like ER doctors.",
      icon: Share2,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-500/10",
      border: "border-blue-200 dark:border-blue-500/30",
      badge: "Peer-to-Peer",
      codeSnippet: `# 2. DECENTRALIZED SWARM ROUTING LOGIC
def swarm_router(state: SwarmState) -> str:
    last_message = state["messages"][-1]
    
    # Check if a handoff tool was invoked
    for tool_call in getattr(last_message, "tool_calls", []):
        if tool_call["name"].startswith("transfer_to_"):
            # Target agent name extracted dynamically:
            target_agent = tool_call["name"].replace("transfer_to_", "")
            return target_agent
            
    # If no handoff was called, active agent continues or exits
    return "__end__" if state.get("is_complete") else state["active_agent"]`,
    },
    {
      id: "context_vars",
      title: "3. Shared Context Variables",
      tagline: "Cross-Agent State Forwarding",
      desc: "When an agent hands off, user variables (e.g. account_id: 'acc_99', verified: True) stay attached to the session context, so the new agent doesn't ask repetitive questions.",
      icon: Layers,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-500/10",
      border: "border-purple-200 dark:border-purple-500/30",
      badge: "Context Variables",
      codeSnippet: `# 3. FORWARDING CONTEXT VARIABLES
class SwarmState(TypedDict):
    messages: list
    active_agent: str
    context_vars: dict # Shared across all peer handoffs!

# Example context dictionary:
# state["context_vars"] = {
#     "customer_id": "cust_8821",
#     "authenticated": True,
#     "account_tier": "Enterprise VIP"
# }
# Billing agent reads 'account_tier' instantly without re-asking!`,
    },
    {
      id: "langgraph_swarm",
      title: "4. LangGraph Swarm Implementation",
      tagline: "Peer-to-Peer Graph Mesh",
      desc: "In LangGraph, each agent is a node. Conditional edges link every peer to possible handoff targets, forming an autonomous multi-agent state mesh.",
      icon: Workflow,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      border: "border-emerald-200 dark:border-emerald-500/30",
      badge: "Mesh StateGraph",
      codeSnippet: `# 4. WIRING A SWARM MESH IN LANGGRAPH
builder = StateGraph(SwarmState)

builder.add_node("triage", triage_node)
builder.add_node("billing", billing_node)
builder.add_node("tech_support", tech_support_node)

builder.add_edge(START, "triage")

# Triage can hand off to billing or tech support
builder.add_conditional_edges("triage", swarm_router, ["billing", "tech_support", END])

# Billing can resolve issue or hand off to tech support
builder.add_conditional_edges("billing", swarm_router, ["tech_support", END])

# Tech support can resolve or hand off to billing
builder.add_conditional_edges("tech_support", swarm_router, ["billing", END])

swarm_app = builder.compile()`,
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
      <div className="rounded-2xl border border-amber-200 dark:border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-teal-500/5 to-slate-50 dark:to-slate-950 p-6 md:p-8 relative overflow-hidden transition-colors">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30">
              Module 4.3 • Decentralized Architectures
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              ~25 min interactive
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Building Multi-Agent Swarm Systems
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Eliminate the central supervisor bottleneck. In this lesson, we build a <strong>decentralized Swarm multi-agent system</strong>: using tool-based handoffs, shared context variables, and peer-to-peer agent mesh routing.
          </p>
        </div>
      </div>

      {/* SECTION 1: 4 PILLARS OF SWARMS */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-amber-500" />
            1. Core Mechanics of Swarm Architectures
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Select a swarm concept to inspect
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
              Swarm Execution Inspector
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
                  <span>Handoff in Progress...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Simulate Peer Handoff</span>
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
                swarm_orchestration.py • {selectedPillar}
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
                Handoff Trace
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
                <p className="text-slate-400">&gt;&gt; User prompt: &quot;I want a refund for transaction #TX-4091&quot;</p>
                <p className="text-blue-300">[TriageAgent] Received user input. Matches refund pattern.</p>
                <p className="text-amber-400 font-bold">&gt;&gt; Calling Tool: `transfer_to_billing(reason=&quot;Refund inquiry&quot;)`</p>
                <p className="text-purple-300">[Handoff Dispatched] Active agent switched: TriageAgent -&gt; BillingAgent</p>
                <p className="text-emerald-400">[BillingAgent] Reading context: customer_id=&apos;usr_42&apos;, tx=&apos;TX-4091&apos;</p>
                <p className="text-emerald-300">&gt;&gt; Refund $49.00 processed to original payment method. Resolution complete!</p>
              </div>
            )}
          </div>
        </div>

        {/* Simulation Banner */}
        {simStep > 0 && (
          <div className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/80 dark:bg-amber-950/30 flex items-center justify-between text-xs font-mono">
            <span className="text-amber-800 dark:text-amber-200">
              {simStep === 1 && "User enters query -> Initial Triage agent receives message"}
              {simStep === 2 && "Triage invokes transfer_to_billing() tool -> Handoff triggered"}
              {simStep === 3 && "Context variables passed directly to Billing agent without data loss"}
              {simStep === 4 && "Billing agent completes refund and provides direct answer to user!"}
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
            2. Interactive Swarm Agent Studio
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Decentralized Mesh Simulator
          </span>
        </div>
        <SwarmAgentStudio />
      </section>

      {/* SECTION 4: HANDWRITTEN NOTE */}
      <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/90 dark:bg-amber-500/10 shadow-sm">
        <span className="font-['Caveat',cursive] text-base text-amber-950 dark:text-amber-200 block">
          📌 Supervisor vs Swarm: Use a Supervisor when you need strict top-down compliance (finance, auditing) where one brain must approve every step. Use a Swarm when speed and autonomy matter (customer support, triaging) where specialists hand off directly like ER staff!
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
              TRAP #1: The Endless Handoff Loop
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Agent A hands off to Agent B, who thinks the inquiry belongs to Agent C, who hands back to Agent A. Without a central supervisor, Swarms can loop indefinitely. Maintain a <code>handoff_history</code> list in State and raise an exception if an agent appears more than twice.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-500/5 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
              TRAP #2: Dropping Context Variables
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              When handing off to a new agent, failing to pass <code>context_vars</code> forces the recipient agent to re-ask the user for information already provided. Always maintain a shared context dictionary alongside messages.
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
            ["1.", "Handoffs as Tools:", "Transferring execution is treated as a normal tool call, making handoff decisions natural for LLMs."],
            ["2.", "Decentralized Velocity:", "Direct peer-to-peer transitions reduce latency by eliminating unnecessary supervisor intermediary hops."],
            ["3.", "Seamless User Continuity:", "Forwarding context variables creates an uninterrupted, fluid conversational experience."],
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
                Concept Check: Swarm Systems
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {showQuiz ? "Click to collapse" : "Test your understanding of peer handoffs and swarms (3 questions)"}
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
              <Module4_3Quiz />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* SECTION 8: NEXT MODULE BRIDGE */}
      <section className="rounded-2xl border border-amber-200 dark:border-amber-500/30 bg-gradient-to-r from-amber-50 via-white to-slate-50 dark:from-amber-500/10 dark:via-slate-900 dark:to-slate-950 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
            <span>Up Next • Module 4.4</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Structuring Workflows with Subgraphs</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
            Keep monolithic graphs clean and testable. Learn how to encapsulate complex multi-node workflows into reusable, modular Subgraphs with isolated state channels.
          </p>
        </div>
        <Link
          href="/learn/level-4/module-4-4"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow-amber-500/20 transition-all shrink-0 cursor-pointer"
        >
          <span>Continue to Module 4.4</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
