"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  Check,
  ArrowRight,
  Repeat,
  CheckCircle2,
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
  Eye,
  Award,
  Sparkle,
} from "lucide-react";
import ReflectionEngineStudio from "./ReflectionEngineStudio";
import Module3_9Quiz from "./Module3_9Quiz";

export default function Module3_9Content() {
  const [selectedPillar, setSelectedPillar] = useState<string>("generator");
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [activeCodeTab, setActiveCodeTab] = useState<"code" | "output">("code");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);

  const pillars = [
    {
      id: "generator",
      title: "1. The Generator (Draftsman)",
      tagline: "Unconstrained Initial Output",
      desc: "Produces the initial draft rapidly. It focuses on completeness and answering the prompt without getting bogged down in endless self-critique on turn 1.",
      icon: FileText,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-500/10",
      border: "border-blue-200 dark:border-blue-500/30",
      badge: "Draft Generator",
      codeSnippet: `# 1. INITIAL GENERATOR NODE
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate

generator_llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.7)

def generator_node(state: ReflectionState) -> dict:
    """Generates initial draft based on user request."""
    user_topic = state["topic"]
    prompt = f"Write an initial technical guide on: {user_topic}"
    draft = generator_llm.invoke(prompt).content
    return {"draft": draft, "revision_count": 0}`,
    },
    {
      id: "critic",
      title: "2. The Critic (Evaluator)",
      tagline: "Rigid Quality Auditing",
      desc: "An adversarial persona evaluates the draft against a strict rubric (technical accuracy, edge case handling, concise style) and returns specific actionable critiques.",
      icon: Eye,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-500/10",
      border: "border-purple-200 dark:border-purple-500/30",
      badge: "Rubric Auditor",
      codeSnippet: `# 2. CRITIC EVALUATION NODE
from pydantic import BaseModel, Field

class ReflectionAudit(BaseModel):
    is_satisfactory: bool = Field(description="True if quality rubric is met.")
    score: int = Field(description="Score from 1 to 10")
    critique_points: list[str] = Field(description="Actionable defects and omissions.")

critic_llm = ChatOpenAI(model="gpt-4o", temperature=0).with_structured_output(ReflectionAudit)

def critic_node(state: ReflectionState) -> dict:
    """Strictly evaluates current draft against professional rubrics."""
    audit = critic_llm.invoke(f"""
    Evaluate this draft:
    {state['draft']}
    
    Check for: Accuracy, missing edge cases, and actionable code examples.
    """)
    return {
        "is_satisfactory": audit.is_satisfactory,
        "critique": audit.critique_points
    }`,
    },
    {
      id: "reviser",
      title: "3. The Reviser",
      tagline: "Point-by-Point Correction",
      desc: "Receives the draft AND the critic's itemized feedback. It surgically modifies the content to address every reported defect, yielding a drastically superior revision.",
      icon: Repeat,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      border: "border-emerald-200 dark:border-emerald-500/30",
      badge: "Targeted Refinement",
      codeSnippet: `# 3. REVISER NODE
reviser_llm = ChatOpenAI(model="gpt-4o", temperature=0.3)

def reviser_node(state: ReflectionState) -> dict:
    """Rewrites draft incorporating critic's specific objections."""
    prompt = f"""
    Current Draft:
    {state['draft']}
    
    Criticism to Address:
    {state['critique']}
    
    Rewrite the draft to resolve all points raised above.
    """
    improved_draft = reviser_llm.invoke(prompt).content
    return {
        "draft": improved_draft,
        "revision_count": state["revision_count"] + 1
    }`,
    },
    {
      id: "loop",
      title: "4. The Reflection Cycle in LangGraph",
      tagline: "Conditional Termination Loop",
      desc: "LangGraph coordinates the generator, critic, and reviser into an iterative loop. A conditional router checks if is_satisfactory == True OR revision_count >= max_revisions.",
      icon: Workflow,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      border: "border-amber-200 dark:border-amber-500/30",
      badge: "LangGraph Cycle",
      codeSnippet: `# 4. REFLECTION STATEGRAPH WORKFLOW
from typing import TypedDict, List
from langgraph.graph import StateGraph, START, END

class ReflectionState(TypedDict):
    topic: str
    draft: str
    critique: List[str]
    is_satisfactory: bool
    revision_count: int

builder = StateGraph(ReflectionState)
builder.add_node("generate", generator_node)
builder.add_node("critique", critic_node)
builder.add_node("revise", reviser_node)

builder.add_edge(START, "generate")
builder.add_edge("generate", "critique")

def should_stop(state: ReflectionState):
    if state["is_satisfactory"] or state["revision_count"] >= 3:
        return END
    return "revise"

builder.add_conditional_edges("critique", should_stop, [END, "revise"])
builder.add_edge("revise", "critique")

reflection_agent = builder.compile()`,
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
      <div className="rounded-2xl border border-blue-200 dark:border-blue-500/30 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-slate-50 dark:to-slate-950 p-6 md:p-8 relative overflow-hidden transition-colors">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-500/30">
              Module 3.9 • Cognitive Patterns
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              ~20 min interactive
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Implementing the Reflection Pattern
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Allow your agents to look in the mirror. In this lesson, we build a <strong>self-correcting Reflection agent</strong> in LangGraph: orchestrating Generator, Critic, and Reviser nodes to dramatically improve output accuracy and polish.
          </p>
        </div>
      </div>

      {/* SECTION 1: 4 PILLARS OF REFLECTION */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-500" />
            1. The Reflection Triad Architecture
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Select a role to inspect
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
              Reflection Cycle Inspector
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
                  <span>Iterating Refinement...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Simulate Reflection Cycle</span>
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
                reflection_pattern.py • {selectedPillar}
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
                Audit Trace Output
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
                <p className="text-slate-400">$ python run_reflection.py --task "Implement Python LRU Cache"</p>
                <p className="text-purple-300">[Generator: Turn 1] Drafted initial LRUCache using dict.</p>
                <p className="text-amber-400">[Critic: Turn 1] Score: 6/10. Critique: O(1) eviction is not achieved; use OrderedDict or DoublyLinkedList.</p>
                <p className="text-sky-300">[Reviser: Turn 2] Refactored implementation to use collections.OrderedDict.</p>
                <p className="text-emerald-400 font-bold">[Critic: Turn 2] Score: 10/10. All criteria met: O(1) get and put, memory ceiling enforced. is_satisfactory=True!</p>
                <p className="text-emerald-300 font-semibold">&gt;&gt; High-quality polished artifact delivered in 2 iterations.</p>
              </div>
            )}
          </div>
        </div>

        {/* Simulation Banner */}
        {simStep > 0 && (
          <div className="p-3.5 rounded-xl border border-blue-200 dark:border-blue-500/30 bg-blue-50/80 dark:bg-blue-950/30 flex items-center justify-between text-xs font-mono">
            <span className="text-blue-800 dark:text-blue-200">
              {simStep === 1 && "Generator outputs raw initial draft rapidly without second-guessing"}
              {simStep === 2 && "Critic evaluates draft against rubrics -> Identifies missing edge cases"}
              {simStep === 3 && "Reviser reads critique -> Generates updated draft addressing defects"}
              {simStep === 4 && "Critic verifies improvements -> Marks is_satisfactory=True -> Exit!"}
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
            2. Interactive Reflection Engine Studio
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Generator-Critic-Reviser Live Cycle
          </span>
        </div>
        <ReflectionEngineStudio />
      </section>

      {/* SECTION 4: HANDWRITTEN NOTE */}
      <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-500/30 bg-blue-50/90 dark:bg-blue-500/10 shadow-sm">
        <span className="font-['Caveat',cursive] text-base text-blue-950 dark:text-blue-200 block">
          📌 Model Persona Separation: Never ask the same model prompt to 'write and critique simultaneously'. LLMs suffer from cognitive confirmation bias on their own text. Splitting the persona into a Generator node and a distinct Critic node yields 40% higher defect detection!
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
              TRAP #1: The Hyper-Critical Perfectionist Loop
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              An overly aggressive critic prompt can find stylistic nits on every single iteration, causing the reflection cycle to loop indefinitely until max tokens are burned. Always enforce a hard ceiling on <code>revision_count &lt;= 3</code>.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-500/5 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
              TRAP #2: Vague Non-Actionable Critiques
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              If the critic says &quot;Make it better and more professional&quot;, the reviser produces random semantic variations without actually fixing flaws. Force the critic to use a structured schema with itemized defect bullets.
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
            ["1.", "Decoupled Cognitive Roles:", "Isolating drafting from evaluating breaks the LLM's natural confirmation bias, yielding higher quality."],
            ["2.", "Strict Structured Feedback:", "Pydantic output parsing for the critic ensures the reviser receives precise, itemized instructions."],
            ["3.", "Guaranteed Convergence:", "Enforcing both quality score criteria AND maximum revision ceilings ensures reliable, bounded latency in production."],
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
                Concept Check: Reflection Pattern
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {showQuiz ? "Click to collapse" : "Test your understanding of self-correction loops (3 questions)"}
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
              <Module3_9Quiz />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* SECTION 8: NEXT MODULE BRIDGE */}
      <section className="rounded-2xl border border-blue-200 dark:border-blue-500/30 bg-gradient-to-r from-blue-50 via-white to-slate-50 dark:from-blue-500/10 dark:via-slate-900 dark:to-slate-950 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">
            <span>Up Next • Module 3.10</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Managing Conversation History in a Database</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
            In-memory state vanishes on server restart. Learn how to connect LangGraph to PostgreSQL and Redis checkpointers for durable multi-tenant session persistence.
          </p>
        </div>
        <Link
          href="/learn/level-3/module-3-10"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow-blue-500/20 transition-all shrink-0 cursor-pointer"
        >
          <span>Continue to Module 3.10</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
