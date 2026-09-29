"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  Check,
  ArrowRight,
  UserCheck,
  PauseCircle,
  ShieldAlert,
  Layers,
  Sparkles,
  HelpCircle,
  Copy,
  CheckCheck,
  Play,
  RotateCcw,
  FileText,
  AlertTriangle,
  Code2,
  Workflow,
  Lock,
  Edit3,
} from "lucide-react";
import HumanInTheLoopStudio from "./HumanInTheLoopStudio";
import Module3_8Quiz from "./Module3_8Quiz";

export default function Module3_8Content() {
  const [selectedPillar, setSelectedPillar] = useState<string>("breakpoints");
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [activeCodeTab, setActiveCodeTab] = useState<"code" | "output">("code");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);

  const pillars = [
    {
      id: "breakpoints",
      title: "1. Interrupts & Breakpoints",
      tagline: "Atomic Execution Pausing",
      desc: "LangGraph enables native pausing via interrupt_before or interrupt_after. When execution reaches a protected node, the graph serializes state to disk and suspends without holding active CPU threads.",
      icon: PauseCircle,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      border: "border-amber-200 dark:border-amber-500/30",
      badge: "interrupt_before=['node']",
      codeSnippet: `# 1. CONFIGURING BREAKPOINTS WITH LANGGRAPH
from langgraph.checkpoint.memory import MemorySaver
from langgraph.graph import StateGraph, START, END

checkpointer = MemorySaver()
builder = StateGraph(FinancialAgentState)

builder.add_node("research", research_node)
builder.add_node("execute_wire_transfer", transfer_node) # Critical destructive action

builder.add_edge(START, "research")
builder.add_edge("research", "execute_wire_transfer")
builder.add_edge("execute_wire_transfer", END)

# Breakpoint: Pause BEFORE executing the dangerous financial transfer!
app = builder.compile(
    checkpointer=checkpointer,
    interrupt_before=["execute_wire_transfer"]
)`,
    },
    {
      id: "approval",
      title: "2. Approval & Rejection Flow",
      tagline: "Binary Go/No-Go Decision",
      desc: "The client app checks app.get_state(config).next. If execution is paused at a breakpoint, it presents an approval card. Resuming with None approves; routing to a cancel node rejects.",
      icon: UserCheck,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-500/10",
      border: "border-blue-200 dark:border-blue-500/30",
      badge: "app.stream(None, config)",
      codeSnippet: `# 2. INSPECTING STATE AND RESUMING EXECUTION
thread_config = {"configurable": {"thread_id": "user_session_42"}}

# 1. Run agent until it hits the breakpoint
events = app.stream({"amount": 5000, "recipient": "Vendor LLC"}, thread_config)
for e in events:
    print(e)

# 2. Inspect state at breakpoint
snapshot = app.get_state(thread_config)
print("Next pending node:", snapshot.next) # -> ('execute_wire_transfer',)

# 3. Resume execution upon human approval:
# Passing None tells LangGraph to continue from current breakpoint
app.stream(None, thread_config)`,
    },
    {
      id: "state_edit",
      title: "3. State Editing Before Resume",
      tagline: "Human-in-the-Loop State Mutation",
      desc: "Humans don't just say yes or no; they can edit parameters. If an agent drafts a $5,000 transfer with a typo, the human updates state['amount'] = 4500 before resuming.",
      icon: Edit3,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-500/10",
      border: "border-purple-200 dark:border-purple-500/30",
      badge: "update_state()",
      codeSnippet: `# 3. MODIFYING STATE BEFORE RESUMING
# The supervisor notices the transfer amount should be $4,500 instead of $5,000
app.update_state(
    thread_config,
    {"amount": 4500, "supervisor_notes": "Approved with $500 discount applied"},
    as_node="research" # State appears as if research node produced this corrected value
)

# Verify updated state snapshot
new_snapshot = app.get_state(thread_config)
print("Updated amount:", new_snapshot.values["amount"]) # -> 4500

# Resume — execute_wire_transfer now receives the corrected $4,500!
app.stream(None, thread_config)`,
    },
    {
      id: "persistence",
      title: "4. Durable Multi-Day Inboxes",
      tagline: "Asynchronous Persistence",
      desc: "By backing checkpoints with Postgres or Redis, execution can remain paused for 10 seconds or 10 days. The approval request sits safely in a queue without consuming compute.",
      icon: Lock,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      border: "border-emerald-200 dark:border-emerald-500/30",
      badge: "PostgresCheckpointer",
      codeSnippet: `# 4. PRODUCTION DURABILITY WITH POSTGRES
from langgraph.checkpoint.postgres import PostgresSaver

# In production, state persists across server restarts
with PostgresSaver.from_conn_string("postgresql://user:pass@db:5432/agents") as checkpointer:
    checkpointer.setup()
    
    prod_app = builder.compile(
        checkpointer=checkpointer,
        interrupt_before=["execute_wire_transfer"]
    )
    
    # Server can restart or crash — thread state is safe in Postgres!
    # Human approves 3 days later via Slack or Admin Dashboard webhook`,
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
      <div className="rounded-2xl border border-blue-200 dark:border-blue-500/30 bg-gradient-to-br from-blue-500/10 via-amber-500/5 to-slate-50 dark:to-slate-950 p-6 md:p-8 relative overflow-hidden transition-colors">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-500/30">
              Module 3.8 • Safety & Control
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              ~20 min interactive
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Adding Human-in-the-Loop Checkpoints
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Never allow autonomous agents to execute destructive actions unchecked. Master <strong>Human-in-the-Loop (HITL)</strong> in LangGraph: implementing native breakpoints, review workflows, state editing, and durable persistence.
          </p>
        </div>
      </div>

      {/* SECTION 1: 4 PILLARS OF HITL */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-500" />
            1. Core Mechanics of Human-in-the-Loop
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Select an interaction pattern to inspect
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
                    ? `${pillar.border} ${pillar.bg} shadow-md ring-1 ring-blue-500/50`
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
                  <div className="text-[11px] font-medium text-blue-600 dark:text-blue-400">
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
            <Code2 className="w-4 h-4 text-blue-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white font-mono uppercase tracking-wider">
              HITL Implementation Inspector
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={runSimulation}
              disabled={isSimulating}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-xs disabled:opacity-50 transition-all cursor-pointer"
            >
              {isSimulating ? (
                <>
                  <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                  <span>Suspending Run...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Simulate Breakpoint Flow</span>
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
                hitl_workflow.py • {selectedPillar}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveCodeTab("code")}
                className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition-all ${
                  activeCodeTab === "code"
                    ? "bg-blue-600/30 text-blue-300 border border-blue-500/40"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Code
              </button>
              <button
                onClick={() => setActiveCodeTab("output")}
                className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition-all ${
                  activeCodeTab === "output"
                    ? "bg-blue-600/30 text-blue-300 border border-blue-500/40"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Approval Trace
              </button>
            </div>
          </div>

          <div className="p-4 overflow-x-auto text-slate-300 leading-relaxed font-mono">
            {activeCodeTab === "code" ? (
              <pre>
                <code>{currentSnippet}</code>
              </pre>
            ) : (
              <div className="space-y-2 text-blue-300 font-mono text-[11px]">
                <p className="text-slate-400">$ python run_financial_agent.py --action "Wire $5000 to ACME Corp"</p>
                <p className="text-emerald-400">[Node: research] Completed verification. Invoice #4092 matches.</p>
                <p className="text-amber-400 font-bold">⏸️ [LANGGRAPH BREAKPOINT] Paused BEFORE: 'execute_wire_transfer'</p>
                <p className="text-slate-300">&gt;&gt; State snapshotted to thread_id='tx_992'. Waiting for Human in the Loop...</p>
                <p className="text-purple-300">[Human Action] Supervisor reviewed invoice in Admin Portal -&gt; Clicked 'Approve'</p>
                <p className="text-sky-300">&gt;&gt; Invoking app.stream(None, config={'{"thread_id": "tx_992"}'})</p>
                <p className="text-emerald-400 font-bold">[Node: execute_wire_transfer] Executed! Confirmation: TXN-88219</p>
              </div>
            )}
          </div>
        </div>

        {/* Simulation Banner */}
        {simStep > 0 && (
          <div className="p-3.5 rounded-xl border border-blue-200 dark:border-blue-500/30 bg-blue-50/80 dark:bg-blue-950/30 flex items-center justify-between text-xs font-mono">
            <span className="text-blue-800 dark:text-blue-200">
              {simStep === 1 && "Agent initiates transfer -> Runs research and drafts transaction"}
              {simStep === 2 && "Interrupt triggers: Execution halts before transfer node runs"}
              {simStep === 3 && "Snapshot saved to Checkpointer -> Alert sent to Admin Portal"}
              {simStep === 4 && "Supervisor clicks Approve -> Graph resumes from exact breakpoint!"}
            </span>
            <span className="text-blue-600 dark:text-blue-400 font-bold">
              Step {simStep}/4
            </span>
          </div>
        )}
      </section>

      {/* SECTION 3: INTERACTIVE STUDIO */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-500" />
            2. Interactive Human-in-the-Loop Studio
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Approval & Breakpoint Sandbox
          </span>
        </div>
        <HumanInTheLoopStudio />
      </section>

      {/* SECTION 4: HANDWRITTEN NOTE */}
      <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-500/30 bg-blue-50/90 dark:bg-blue-500/10 shadow-sm">
        <span className="font-['Caveat',cursive] text-base text-blue-950 dark:text-blue-200 block">
          📌 Production Mandate: Any action with side-effects that cannot be undone (sending an email blast, charging a credit card, running DROP TABLE, modifying production DNS) MUST have an interrupt_before checkpoint. AI is your co-pilot, not the captain!
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
              TRAP #1: Breakpoints Without a Checkpointer
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Configuring <code>interrupt_before=[...]</code> without passing a <code>checkpointer</code> to <code>compile()</code> raises an immediate exception. LangGraph cannot pause execution without a persistence store to record the checkpoint snapshot. Always provide a checkpointer.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-500/5 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
              TRAP #2: Thread ID Collisions
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Using a static thread_id (e.g. <code>"default_thread"</code>) causes concurrent user approvals to overwrite each other&apos;s paused states. Always generate unique session IDs (e.g. <code>uuid4()</code>) for every user flow to ensure complete thread isolation.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6: KEY TAKEAWAYS */}
      <section className="rounded-xl border border-blue-200 dark:border-blue-500/30 bg-blue-50/50 dark:bg-blue-500/5 p-5 space-y-3">
        <h4 className="font-bold text-sm text-blue-900 dark:text-blue-300 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          Key Architectural Takeaways
        </h4>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          {[
            ["1.", "Native Graph Pausing:", "LangGraph handles suspension cleanly via interrupt_before, serializing state without blocking worker thread memory."],
            ["2.", "Dynamic State Mutation:", "Humans can intervene, review tool parameters, and call app.update_state() to rectify mistakes prior to node execution."],
            ["3.", "Enterprise Compliance:", "Human checkpoints provide auditable governance trails required for ISO, SOC2, and financial regulations."],
          ].map(([n, bold, rest]) => (
            <li key={n} className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400 font-bold">{n}</span>
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
            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                Concept Check: Human-in-the-Loop
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {showQuiz ? "Click to collapse" : "Test your understanding of breakpoints and state editing (3 questions)"}
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-semibold px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30">
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
              <Module3_8Quiz />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* SECTION 8: NEXT MODULE BRIDGE */}
      <section className="rounded-2xl border border-blue-200 dark:border-blue-500/30 bg-gradient-to-r from-blue-50 via-white to-slate-50 dark:from-blue-500/10 dark:via-slate-900 dark:to-slate-950 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">
            <span>Up Next • Module 3.9</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Implementing the Reflection Pattern</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
            Give agents the ability to critique and self-correct their own work. Learn how dual-agent generator/critic architectures drastically improve code generation and technical writing.
          </p>
        </div>
        <Link
          href="/learn/level-3/module-3-9"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow-blue-500/20 transition-all shrink-0 cursor-pointer"
        >
          <span>Continue to Module 3.9</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
