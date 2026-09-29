"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  ArrowRight,
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
  Scissors,
  FileArchive,
  Trash2,
  Database,
} from "lucide-react";
import ContextWindowManager from "./ContextWindowManager";
import Module4_10Quiz from "./Module4_10Quiz";

export default function Module4_10Content() {
  const [selectedPillar, setSelectedPillar] = useState<string>("trimming");
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [activeCodeTab, setActiveCodeTab] = useState<"code" | "output">("code");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);

  const pillars = [
    {
      id: "trimming",
      title: "1. trim_messages Pruning",
      tagline: "Token-Aware Bounded History",
      desc: "Automatically keep the most recent messages under a strict token ceiling while guaranteeing the system prompt is never severed.",
      icon: Scissors,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      border: "border-amber-200 dark:border-amber-500/30",
      badge: "trim_messages()",
      codeSnippet: `# 1. TOKEN-AWARE TRIM WITH SYSTEM PRESERVATION
from langchain_core.messages import trim_messages
from langgraph.graph import MessagesState

def prune_context_node(state: MessagesState):
    """Keeps messages within strict token budget while retaining system instructions."""
    pruned = trim_messages(
        state["messages"],
        max_tokens=4096,
        strategy="last",
        token_counter=llm,
        include_system=True,
        allow_partial=False,
        start_on="human"
    )
    return {"messages": pruned}`,
    },
    {
      id: "summarization",
      title: "2. Rolling Summarization",
      tagline: "Compressing Old Dialogue",
      desc: "When message history exceeds 20 turns, run a background condensation node that replaces the earliest 15 turns with a compact semantic summary.",
      icon: FileArchive,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-500/10",
      border: "border-blue-200 dark:border-blue-500/30",
      badge: "Rolling Summary",
      codeSnippet: `# 2. ROLLING SUMMARIZATION NODE
from langchain_core.messages import SystemMessage, RemoveMessage

def summarize_history_node(state: MessagesState):
    messages = state["messages"]
    if len(messages) <= 16:
        return {}
    
    old_messages = messages[:-4]
    summary_prompt = f"Summarize key decisions from this dialogue:\\n" + "\\n".join(
        f"{m.type}: {m.content}" for m in old_messages
    )
    summary_text = llm.invoke(summary_prompt).content
    
    # Redact old raw messages and append synthesized context
    delete_ops = [RemoveMessage(id=m.id) for m in old_messages]
    return {
        "messages": delete_ops + [SystemMessage(content=f"Summary of prior context: {summary_text}")]
    }`,
    },
    {
      id: "removal",
      title: "3. RemoveMessage Surgical Redaction",
      tagline: "Pruning Obsolete Tool Payloads",
      desc: "Massive JSON tool returns (e.g. 500-row SQL dumps) poison context windows. Emit RemoveMessage operations after synthesis to strip raw dumps.",
      icon: Trash2,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-500/10",
      border: "border-purple-200 dark:border-purple-500/30",
      badge: "RemoveMessage",
      codeSnippet: `# 3. STRIPPING HEAVY TOOL ARTIFACTS
from langchain_core.messages import RemoveMessage, ToolMessage

def purge_heavy_payloads(state: MessagesState):
    """Finds raw ToolMessages with > 2000 chars and purges them after reading."""
    removals = []
    for msg in state["messages"]:
        if isinstance(msg, ToolMessage) and len(str(msg.content)) > 2000:
            # Replace heavy payload with placeholder or delete
            removals.append(RemoveMessage(id=msg.id))
            
    return {"messages": removals}`,
    },
    {
      id: "vector_offload",
      title: "4. Semantic Memory Offload",
      tagline: "Retrieval-Augmented State",
      desc: "Evict historical conversational turns to a vector store with session filtering. Retrieve only the exact relevant snippets when the user references past turns.",
      icon: Database,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      border: "border-emerald-200 dark:border-emerald-500/30",
      badge: "Vector Offload",
      codeSnippet: `# 4. VECTOR CONVERSATIONAL RETRIEVAL
def retrieve_relevant_history(query: str, session_id: str):
    """Query long-term conversational memory without loading entire history into prompt."""
    results = vector_db.similarity_search(
        query,
        k=3,
        filter={"session_id": session_id}
    )
    return "\\n".join([doc.page_content for doc in results])`,
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
      <div className="rounded-2xl border border-amber-200 dark:border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-slate-50 dark:to-slate-950 p-6 md:p-8 relative overflow-hidden transition-colors">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30">
              Module 4.10 • Production, Scaling & Optimization
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              ~25 min interactive
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Managing Context Windows Effectively
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            A 200K token window is not an invitation to dump unformatted data. LLM attention degrades exponentially in the middle of bloated prompts, and costs scale linearly. Master <strong>token-bounded pruning</strong>, rolling summaries, and surgical payload stripping.
          </p>
        </div>
      </div>

      {/* SECTION 1: 4 ARCHITECTURE PILLARS */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-amber-500" />
            1. Core Strategies for Context Management
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Select a pruning technique
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
              Context Pruning Inspector
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
                  <span>Compressing Context...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Simulate Context Prune</span>
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
                context_manager.py • {selectedPillar}
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
                Memory Telemetry
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
                <p className="text-slate-400">&gt;&gt; Inbound thread state: 28 messages (18,400 tokens)</p>
                <p className="text-rose-400">   [Threshold Warning] Context &gt; 16K tokens. Risk of attention dilution!</p>
                <p className="text-sky-300">   [Running Pruner] trim_messages() triggered with max_tokens=4096...</p>
                <p className="text-slate-300">   [Preservation Check] SystemMessage(id=&apos;sys_01&apos;) retained.</p>
                <p className="text-slate-300">   [Purge] 14 intermediate ToolMessages deleted.</p>
                <p className="text-emerald-400 font-bold">&gt;&gt; New Context: 10 messages (3,820 tokens) - 79.2% reduction achieved!</p>
              </div>
            )}
          </div>
        </div>

        {/* Simulation Banner */}
        {simStep > 0 && (
          <div className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/80 dark:bg-amber-950/30 flex items-center justify-between text-xs font-mono">
            <span className="text-amber-800 dark:text-amber-200">
              {simStep === 1 && "Measuring thread token count using model tokenizer (tiktoken)..."}
              {simStep === 2 && "Evaluating message relevance & age; isolating obsolete tool results..."}
              {simStep === 3 && "Executing trim_messages() with system prompt preservation lock..."}
              {simStep === 4 && "Context window optimized: 79% token reduction with zero context loss!"}
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
            2. Interactive Context Window Manager
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Real-Time Token Budget Simulator
          </span>
        </div>
        <ContextWindowManager />
      </section>

      {/* SECTION 4: HANDWRITTEN PRODUCTION INSIGHT */}
      <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/90 dark:bg-amber-500/10 shadow-sm">
        <span className="font-['Caveat',cursive] text-base text-amber-950 dark:text-amber-200 block">
          📌 Production Insight: Never slice messages with a naive Python array slice like `state[&apos;messages&apos;][-10:]`! If you do that, you slice off the SystemMessage that contains all your agent&apos;s guardrails and tool rules. Always use `trim_messages(..., include_system=True)` or explicitly re-inject the system message at index 0.
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
              TRAP #1: The &quot;200K Tokens Is Plenty&quot; Fallacy
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Engineers assume because an LLM accepts 200,000 tokens, it pays equal attention to all of them. Research on the &quot;Lost in the Middle&quot; effect proves LLM recall degrades significantly past 30,000 tokens. Compact, pruned context yields higher accuracy than bloated context.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-500/5 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
              TRAP #2: Retaining Giant Raw Tool Dumps
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              When an agent executes an API call returning a 500-line JSON response, the agent consumes it in Turn 2. Leaving that 500-line JSON in state for Turns 3 through 15 burns tokens on every turn. Purge or summarize tool outputs after synthesis.
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
            ["1.", "Token-Aware Bounding:", "Use trim_messages() with an exact token budget rather than message counts to avoid unexpected context overflows."],
            ["2.", "Protect System Prompts:", "Always ensure include_system=True during trimming so behavioral guardrails are never dropped."],
            ["3.", "Surgical Redaction:", "Employ RemoveMessage to strip obsolete multi-kilobyte tool responses once the LLM has extracted their key takeaways."],
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
                Concept Check: Context Window Management
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {showQuiz ? "Click to collapse" : "Test your understanding of token budgets and rolling summaries (3 questions)"}
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
              <Module4_10Quiz />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* SECTION 8: NEXT MODULE BRIDGE */}
      <section className="rounded-2xl border border-amber-200 dark:border-amber-500/30 bg-gradient-to-r from-amber-50 via-white to-slate-50 dark:from-amber-500/10 dark:via-slate-900 dark:to-slate-950 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
            <span>Up Next • Module 4.11</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Testing & Evaluating AI Agents</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
            Non-deterministic systems cannot be verified with simple unit tests. Master Evaluation-Driven Development (EDD), trajectory benchmarks, and LLM-as-a-judge scorers.
          </p>
        </div>
        <Link
          href="/learn/level-4/module-4-11"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow-amber-500/20 transition-all shrink-0 cursor-pointer"
        >
          <span>Continue to Module 4.11</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
