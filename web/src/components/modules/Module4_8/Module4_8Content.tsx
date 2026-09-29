"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  Check,
  ArrowRight,
  Clock,
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
  History,
  GitFork,
  FastForward,
  RotateCw,
} from "lucide-react";
import TimeTravelDebugger from "./TimeTravelDebugger";
import Module4_8Quiz from "./Module4_8Quiz";

export default function Module4_8Content() {
  const [selectedPillar, setSelectedPillar] = useState<string>("history");
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [activeCodeTab, setActiveCodeTab] = useState<"code" | "output">("code");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);

  const pillars = [
    {
      id: "history",
      title: "1. The Checkpoint Log",
      tagline: "Git Log for Agent Execution",
      desc: "Every node completion creates an immutable checkpoint. Calling app.get_state_history(config) yields the complete chronological execution log with full state payloads.",
      icon: History,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      border: "border-amber-200 dark:border-amber-500/30",
      badge: "get_state_history()",
      codeSnippet: `# 1. INSPECTING EXECUTION HISTORY
config = {"configurable": {"thread_id": "session_alpha"}}

# Retrieve the full chronological timeline of checkpoints (newest first)
history = list(app.get_state_history(config))

for snapshot in history:
    print(f"Checkpoint ID: {snapshot.config['configurable']['checkpoint_id']}")
    print(f"Parent Checkpoint: {snapshot.parent_config['configurable']['checkpoint_id'] if snapshot.parent_config else 'ROOT'}")
    print(f"Next Pending Node: {snapshot.next}")
    print(f"Message Count: {len(snapshot.values.get('messages', []))}\\n")`,
    },
    {
      id: "diffing",
      title: "2. Checkpoint State Diffing",
      tagline: "Locating the Root Cause",
      desc: "Compare two arbitrary snapshots to see exactly which node introduced a corrupt variable or hallucination without having to re-run the agent.",
      icon: Layers,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-500/10",
      border: "border-blue-200 dark:border-blue-500/30",
      badge: "Snapshot Diff",
      codeSnippet: `# 2. DIFFING TWO SNAPSHOTS
def diff_checkpoints(snap_a, snap_b):
    """Compares state delta between two steps."""
    keys_a = set(snap_a.values.keys())
    keys_b = set(snap_b.values.keys())
    
    print("New keys added in B:", keys_b - keys_a)
    for k in keys_a.intersection(keys_b):
        if snap_a.values[k] != snap_b.values[k]:
            print(f"Key [{k}] mutated from: {snap_a.values[k]} -> {snap_b.values[k]}")`,
    },
    {
      id: "rewind",
      title: "3. Rewind & Branch Execution",
      tagline: "Forking a New Timeline",
      desc: "Specify checkpoint_id in your invocation config. LangGraph re-attaches execution to that historical point and creates a new branch without overwriting original history.",
      icon: GitFork,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-500/10",
      border: "border-purple-200 dark:border-purple-500/30",
      badge: "checkpoint_id Fork",
      codeSnippet: `# 3. FORKING FROM A PRIOR CHECKPOINT
target_checkpoint = history[3] # Select step 4 from earlier in the run

fork_config = {
    "configurable": {
        "thread_id": "session_alpha",
        "checkpoint_id": target_checkpoint.config["configurable"]["checkpoint_id"]
    }
}

# Invoke from the past checkpoint: creates a new timeline branch!
response = app.invoke({"messages": [("user", "Actually, search for Python 3.12 instead")]}, fork_config)`,
    },
    {
      id: "patching",
      title: "4. State Mutation & Correction",
      tagline: "Surgical In-Flight Edits",
      desc: "Use app.update_state() on a past checkpoint to fix an erroneous tool result or typos. When execution resumes, the agent reasons over the corrected reality.",
      icon: RotateCw,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      border: "border-emerald-200 dark:border-emerald-500/30",
      badge: "update_state()",
      codeSnippet: `# 4. SURGICAL STATE CORRECTION BEFORE REPLAY
# Suppose node 2 produced a bad search result:
corrected_state = {
    "search_results": ["Verified fact: Python 3.12 was released in October 2023"]
}

# Update state at the checkpoint:
app.update_state(fork_config, corrected_state, as_node="search_node")

# Resume execution: agent now produces accurate synthesis based on corrected fact!
app.invoke(None, fork_config)`,
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
      <div className="rounded-2xl border border-amber-200 dark:border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-purple-500/5 to-slate-50 dark:to-slate-950 p-6 md:p-8 relative overflow-hidden transition-colors">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30">
              Module 4.8 • Time Travel & Debugging
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              ~20 min interactive
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Using Time Travel for State Branching
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            LangGraph checkpoints are Git for agent execution. In this lesson, master <strong>Time Travel debugging</strong>: inspecting historical snapshot trees, diffing state transitions, and rewinding to fork alternate execution realities.
          </p>
        </div>
      </div>

      {/* SECTION 1: 4 PILLARS OF TIME TRAVEL */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-amber-500" />
            1. Core Mechanics of Time Travel
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Select a time-travel mechanism
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
              Time Travel Inspector
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
                  <span>Rewinding Checkpoint...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Simulate Time Rewind</span>
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
                time_travel.py • {selectedPillar}
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
                Timeline Graph
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
                <p className="text-slate-400">&gt;&gt; Timeline for thread_id=&apos;session_alpha&apos;:</p>
                <p className="text-slate-300">   [cp_01] Turn 1: User asks question</p>
                <p className="text-slate-300">   [cp_02] Turn 1: Agent searches web (output: $500)</p>
                <p className="text-rose-400">   [cp_03] Turn 2: Agent hallucinates calculation based on bad data</p>
                <p className="text-purple-300 font-bold">&gt;&gt; Rewinding to [cp_02]...</p>
                <p className="text-sky-300">&gt;&gt; Mutating state: search_result=&apos;$450 (verified)&apos;</p>
                <p className="text-emerald-400 font-bold">&gt;&gt; Forked branch [cp_02_fork]! Agent recalculated accurately: $450.</p>
              </div>
            )}
          </div>
        </div>

        {/* Simulation Banner */}
        {simStep > 0 && (
          <div className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/80 dark:bg-amber-950/30 flex items-center justify-between text-xs font-mono">
            <span className="text-amber-800 dark:text-amber-200">
              {simStep === 1 && "Developer inspects state history list -> Identifies corrupted turn 2"}
              {simStep === 2 && "Picks checkpoint ID from turn 1 -> Loads immutable state snapshot"}
              {simStep === 3 && "Injects corrected value into State via app.update_state()"}
              {simStep === 4 && "Execution resumed on new branch -> Original history preserved without deletion!"}
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
            2. Interactive Time Travel Debugger
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Live Checkpoint Forking Studio
          </span>
        </div>
        <TimeTravelDebugger />
      </section>

      {/* SECTION 4: HANDWRITTEN NOTE */}
      <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/90 dark:bg-amber-500/10 shadow-sm">
        <span className="font-['Caveat',cursive] text-base text-amber-950 dark:text-amber-200 block">
          📌 Git for Agents: Checkpoints never get deleted or overwritten. When you rewind and re-run, LangGraph creates a new commit in the tree with parent_id pointing to the historical snapshot. You can branch, compare, and A/B test prompt versions across identical historical states!
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
              TRAP #1: External Side Effect Re-Execution
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Rewinding state rewinds the agent&apos;s memory — it does NOT unsend an email or undo an API charge. If a node executed external side-effects, replaying across that node will trigger duplicate side-effects. Use mock adapters or check execution flags before replaying.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-500/5 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
              TRAP #2: Omitting the checkpoint_id Argument
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Calling <code>app.invoke(..., {"{ 'thread_id': 'id' }"})</code> without specifying <code>checkpoint_id</code> defaults to the HEAD of the thread (the latest snapshot). To time-travel, you must explicitly supply the historical checkpoint ID.
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
            ["1.", "Immutable Checkpoint Log:", "Every turn records an unchangeable snapshot, creating a complete audit trail."],
            ["2.", "Seamless Branching:", "Supply a past checkpoint_id to fork reality into an alternate testing branch."],
            ["3.", "Surgical In-Flight Edits:", "Call app.update_state() to patch corrupted variables before re-invoking downstream reasoning."],
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
                Concept Check: Time Travel
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {showQuiz ? "Click to collapse" : "Test your understanding of checkpoints and state branching (3 questions)"}
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
              <Module4_8Quiz />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* SECTION 8: NEXT MODULE BRIDGE */}
      <section className="rounded-2xl border border-amber-200 dark:border-amber-500/30 bg-gradient-to-r from-amber-50 via-white to-slate-50 dark:from-amber-500/10 dark:via-slate-900 dark:to-slate-950 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
            <span>Up Next • Module 4.9</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Optimizing Prompts and Tool Selection</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
            Tool description engineering is the highest leverage prompt engineering. Learn how to write tool docstrings that guide LLMs to make zero tool selection errors.
          </p>
        </div>
        <Link
          href="/learn/level-4/module-4-9"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow-amber-500/20 transition-all shrink-0 cursor-pointer"
        >
          <span>Continue to Module 4.9</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
