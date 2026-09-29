"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  Check,
  ArrowRight,
  Database,
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
  Cpu,
  PlusCircle,
  Sliders,
} from "lucide-react";
import LangGraphStateInspector from "./LangGraphStateInspector";
import Module2_8Quiz from "./Module2_8Quiz";

export default function Module2_8Content() {
  const [selectedPillar, setSelectedPillar] = useState<string>("schema");
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [activeCodeTab, setActiveCodeTab] = useState<"code" | "output">("code");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);

  const pillars = [
    {
      id: "schema",
      title: "1. State Schemas",
      tagline: "TypedDict vs Pydantic",
      desc: "State defines the shared schema of your graph. TypedDict provides compile-time safety with zero serialization overhead, making it the industry standard for LangGraph agents.",
      icon: Database,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-500/10",
      border: "border-purple-200 dark:border-purple-500/30",
      badge: "TypedDict Schema",
      codeSnippet: `# 1. DEFINING AN AGENT STATE SCHEMA WITH TYPEDDICT
from typing import TypedDict, Annotated, List, Optional
from langchain_core.messages import BaseMessage
from langgraph.graph.message import add_messages

class AgentState(TypedDict):
    # Annotated with a reducer: messages are appended, not overwritten
    messages: Annotated[List[BaseMessage], add_messages]
    
    # Standard scalar fields: default behavior is overwrite with new value
    current_step: int
    user_id: str
    is_authorized: bool
    context_documents: List[str]`,
    },
    {
      id: "reducers",
      title: "2. add_messages Reducer",
      tagline: "Preventing Accidental Memory Loss",
      desc: "By default, LangGraph overwrites state keys with whatever a node returns. The add_messages reducer appends new messages, tracks UUIDs, and updates messages in-place if IDs match.",
      icon: PlusCircle,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      border: "border-emerald-200 dark:border-emerald-500/30",
      badge: "Annotated[list, add_messages]",
      codeSnippet: `# 2. THE CRITICAL DIFFERENCE A REDUCER MAKES

# ❌ WITHOUT REDUCER (Default Overwrite):
# If node returns {"messages": [new_msg]}, state["messages"] becomes ONLY [new_msg]
# All previous conversation history is permanently destroyed!

# ✅ WITH REDUCER:
from langgraph.graph.message import add_messages

class SafeState(TypedDict):
    # add_messages appends new_msg to existing list seamlessly:
    messages: Annotated[list[BaseMessage], add_messages]

def model_node(state: SafeState) -> dict:
    # Safely returns only the delta
    ai_msg = model.invoke(state["messages"])
    return {"messages": [ai_msg]} # LangGraph appends this automatically!`,
    },
    {
      id: "custom_reducers",
      title: "3. Custom Reducer Functions",
      tagline: "Custom State Aggregation",
      desc: "You can supply any standard Python function as a reducer. Use operator.add for lists, or write custom merge functions for token counts, metrics, or set unions.",
      icon: Sliders,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-500/10",
      border: "border-blue-200 dark:border-blue-500/30",
      badge: "Custom Reducer",
      codeSnippet: `# 3. CUSTOM STATE REDUCERS
import operator
from typing import Annotated, TypedDict

def merge_sets(left: set, right: set) -> set:
    """Combines sets across parallel node executions."""
    return left.union(right)

def accumulate_tokens(total: int, delta: int) -> int:
    """Running tally of total tokens consumed."""
    return total + delta

class AdvancedState(TypedDict):
    # Overwrites on update
    status: str
    
    # Uses standard operator.add for list concatenation
    audit_log: Annotated[list[str], operator.add]
    
    # Custom reducers
    visited_urls: Annotated[set[str], merge_sets]
    total_tokens: Annotated[int, accumulate_tokens]`,
    },
    {
      id: "isolation",
      title: "4. State Key Scoping",
      tagline: "Private Node State",
      desc: "Avoid monolithic state bloat. Subgraphs and specialist nodes can accept narrow input schemas and emit only what the parent graph requires, preventing state pollution.",
      icon: Layers,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      border: "border-amber-200 dark:border-amber-500/30",
      badge: "Scoped Schema",
      codeSnippet: `# 4. STATE ISOLATION & SUBGRAPH SCOPING
class ResearchInputState(TypedDict):
    topic: str

class ResearchOutputState(TypedDict):
    summary: str
    citations: list[str]

# Internal research subgraph state — completely isolated from main graph
class InternalResearchState(ResearchInputState, ResearchOutputState):
    raw_search_dumps: list[dict] # Not exposed to top-level agent

research_builder = StateGraph(
    InternalResearchState,
    input=ResearchInputState,
    output=ResearchOutputState
)
# Top-level graph only sees clean summary and citations!`,
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
      <div className="rounded-2xl border border-purple-200 dark:border-purple-500/30 bg-gradient-to-br from-purple-500/10 via-teal-500/5 to-slate-50 dark:to-slate-950 p-6 md:p-8 relative overflow-hidden transition-colors">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/30">
              Module 2.8 • Core Implementation
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              ~20 min interactive
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Defining and Managing State in LangGraph
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            State is the central memory backbone of your agent. In this lesson, master <strong>TypedDict schemas</strong>, understand the critical difference between overwrites and <strong>reducers</strong>, and learn how <code>add_messages</code> prevents accidental history loss.
          </p>
        </div>
      </div>

      {/* SECTION 1: 4 PILLARS OF STATE MANAGEMENT */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-500" />
            1. Core Mechanics of LangGraph State
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Select a state pattern to inspect
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
                    ? `${pillar.border} ${pillar.bg} shadow-md ring-1 ring-purple-500/50`
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
                  <div className="text-[11px] font-medium text-purple-600 dark:text-purple-400">
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
            <Code2 className="w-4 h-4 text-purple-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white font-mono uppercase tracking-wider">
              State Reducer Inspector
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={runSimulation}
              disabled={isSimulating}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-xs disabled:opacity-50 transition-all cursor-pointer"
            >
              {isSimulating ? (
                <>
                  <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                  <span>Merging State...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Simulate State Reducer</span>
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
                state_schema.py • {selectedPillar}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveCodeTab("code")}
                className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition-all ${
                  activeCodeTab === "code"
                    ? "bg-purple-600/30 text-purple-300 border border-purple-500/40"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Code
              </button>
              <button
                onClick={() => setActiveCodeTab("output")}
                className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition-all ${
                  activeCodeTab === "output"
                    ? "bg-purple-600/30 text-purple-300 border border-purple-500/40"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                State Transition
              </button>
            </div>
          </div>

          <div className="p-4 overflow-x-auto text-slate-300 leading-relaxed font-mono">
            {activeCodeTab === "code" ? (
              <pre>
                <code>{currentSnippet}</code>
              </pre>
            ) : (
              <div className="space-y-2 text-purple-300 font-mono text-[11px]">
                <p className="text-slate-400"># Initial State at START</p>
                <p className="text-slate-300">state = {'{"messages": [HumanMessage(id="1", content="Check DB")], "total_tokens": 0}'}</p>
                <p className="text-amber-300"># Node 'agent' returns partial dictionary:</p>
                <p className="text-emerald-300">&gt;&gt; delta = {'{"messages": [AIMessage(id="2", content="Querying...")], "total_tokens": 120}'}</p>
                <p className="text-sky-300"># LangGraph applies reducers:</p>
                <p className="text-slate-200">&gt;&gt; add_messages: [id:1] + [id:2] -&gt; list has 2 messages ✅ (Not overwritten!)</p>
                <p className="text-slate-200">&gt;&gt; accumulate_tokens: 0 + 120 -&gt; 120 ✅</p>
                <p className="text-emerald-400 font-bold">&gt;&gt; Resulting State Snapshot committed to Checkpointer.</p>
              </div>
            )}
          </div>
        </div>

        {/* Simulation Banner */}
        {simStep > 0 && (
          <div className="p-3.5 rounded-xl border border-purple-200 dark:border-purple-500/30 bg-purple-50/80 dark:bg-purple-950/30 flex items-center justify-between text-xs font-mono">
            <span className="text-purple-800 dark:text-purple-200">
              {simStep === 1 && "Initial State: messages list contains 1 user message"}
              {simStep === 2 && "Node executes -> returns delta dictionary with 1 new AIMessage"}
              {simStep === 3 && "Reducer executes -> add_messages verifies IDs and appends without data loss"}
              {simStep === 4 && "Checkpointer records atomic snapshot of updated State object!"}
            </span>
            <span className="text-purple-600 dark:text-purple-400 font-bold">
              Step {simStep}/4
            </span>
          </div>
        )}
      </section>

      {/* SECTION 3: INTERACTIVE STUDIO */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            2. Interactive State Reducer Inspector
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Real-time Reducer Sandbox
          </span>
        </div>
        <LangGraphStateInspector />
      </section>

      {/* SECTION 4: HANDWRITTEN NOTE */}
      <div className="p-4 rounded-xl border border-purple-200 dark:border-purple-500/30 bg-purple-50/90 dark:bg-purple-500/10 shadow-sm">
        <span className="font-['Caveat',cursive] text-base text-purple-950 dark:text-purple-200 block">
          📌 Cardinal Rule of LangGraph State: If a field is a list and you don&apos;t attach a reducer like Annotated[list, add_messages], the very first node that returns a message will wipe out the entire user conversation history! Always annotate lists that aggregate data over turns.
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
              TRAP #1: Plain list vs Annotated[list, add_messages]
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Defining <code>messages: list[BaseMessage]</code> in your TypedDict means any node returning <code>{`{"messages": [new_msg]}`}</code> overwrites the prior array. The agent appears amnesiac on turn 2 because turn 1 was erased. Always annotate with <code>add_messages</code>.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-500/5 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
              TRAP #2: Storing Non-Serializable Objects in State
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Placing live database connections, client sessions, or open file pointers inside State will crash Postgres/Redis checkpointers during serialization. Keep State pure data (strings, ints, lists, dicts, BaseMessages) and initialize clients externally.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6: KEY TAKEAWAYS */}
      <section className="rounded-xl border border-purple-200 dark:border-purple-500/30 bg-purple-50/50 dark:bg-purple-500/5 p-5 space-y-3">
        <h4 className="font-bold text-sm text-purple-900 dark:text-purple-300 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          Key Architectural Takeaways
        </h4>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          {[
            ["1.", "State is Immutable & Functional:", "Nodes return partial deltas, and LangGraph merges them deterministically using registered reducer functions."],
            ["2.", "add_messages Handles Deduplication:", "The add_messages reducer uses message IDs. If an existing message has ID 'x' and a new message arrives with ID 'x', it replaces that specific message in place rather than duplicating it."],
            ["3.", "Checkpointers Require Clean Schemas:", "Clean primitive schemas enable checkpoint persistence, rewind capability, and multi-tenant thread isolation."],
          ].map(([n, bold, rest]) => (
            <li key={n} className="flex items-start gap-2">
              <span className="text-purple-600 dark:text-purple-400 font-bold">{n}</span>
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
            <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                Concept Check: State & Reducers
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {showQuiz ? "Click to collapse" : "Test your understanding of state reducers and schemas (3 questions)"}
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-semibold px-3 py-1.5 rounded-lg bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-500/30">
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
              <Module2_8Quiz />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* SECTION 8: NEXT MODULE BRIDGE */}
      <section className="rounded-2xl border border-purple-200 dark:border-purple-500/30 bg-gradient-to-r from-purple-50 via-white to-slate-50 dark:from-purple-500/10 dark:via-slate-900 dark:to-slate-950 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-purple-700 dark:text-purple-400 uppercase tracking-wider">
            <span>Up Next • Module 2.9</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Structured Logging and Observability</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
            You cannot optimize what you do not measure. Learn how to log agent runs, track token expenditure, trace multi-step tool calls, and diagnose production agent failures.
          </p>
        </div>
        <Link
          href="/learn/level-2/module-2-9"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow-purple-500/20 transition-all shrink-0 cursor-pointer"
        >
          <span>Continue to Module 2.9</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
