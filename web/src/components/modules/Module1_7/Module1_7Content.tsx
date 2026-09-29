"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  Check,
  ArrowRight,
  Workflow,
  Brain,
  Repeat,
  Layers,
  Users,
  UserCheck,
  HelpCircle,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  GitFork,
  History,
  ShieldCheck,
  Code2,
} from "lucide-react";
import AgenticDesignPatternsExplorer from "./AgenticDesignPatternsExplorer";
import ReActVsReflectionStudio from "./ReActVsReflectionStudio";
import Module1_7Quiz from "./Module1_7Quiz";

export default function Module1_7Content() {
  const [selectedPattern, setSelectedPattern] = useState<string>("reflection");
  const [showQuiz, setShowQuiz] = useState<boolean>(false);

  const patterns = [
    {
      id: "react",
      title: "1. ReAct",
      tagline: "Interleaved Trajectory",
      desc: "Alternates Thought ➔ Action ➔ Observation, grounding internal reasoning in verified tool outputs.",
      icon: Brain,
      color: "text-sky-600 dark:text-sky-400",
      bg: "bg-sky-50 dark:bg-sky-500/10",
      border: "border-sky-200 dark:border-sky-500/30",
      badge: "Hallucination Reduction",
      codeSnippet: `# ReAct Pattern: Yao et al., 2023
thought_1 = llm.generate("Thought: What book inspired Blade Runner?")
action_1 = tool.search("Blade Runner inspiration novel")
thought_2 = llm.generate(f"Observation: {action_1}. Thought: Philip K. Dick wrote it.")
final_answer = llm.generate("Final Answer: Philip K. Dick.")`,
    },
    {
      id: "reflection",
      title: "2. Reflection",
      tagline: "Actor-Critic Dual Node",
      desc: "Actor drafts an initial output; an independent Critic scores it against strict rubrics for self-healing.",
      icon: Repeat,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-500/10",
      border: "border-purple-200 dark:border-purple-500/30",
      badge: "Evaluator-Optimizer",
      codeSnippet: `# Reflection Loop (Self-Correction)
draft = actor.generate_code(spec)
critique = critic.evaluate(draft, rubric=["security", "performance"])
while critique.has_vulnerabilities and turns < max_retries:
    draft = actor.refine(draft, feedback=critique.issues)
    critique = critic.evaluate(draft)`,
    },
    {
      id: "orchestrator",
      title: "3. Orchestrator",
      tagline: "Manager & Workers",
      desc: "Central lead agent maintains global state and dispatches sub-goals to specialized domain agents.",
      icon: Users,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      border: "border-amber-200 dark:border-amber-500/30",
      badge: "Hierarchical Delegation",
      codeSnippet: `# Orchestrator-Workers Architecture
tasks = orchestrator.decompose(enterprise_goal)
research_res = research_agent.run(tasks.research)
code_res = coding_agent.run(tasks.code, context=research_res)
final_report = orchestrator.synthesize([research_res, code_res])`,
    },
    {
      id: "timetravel",
      title: "4. Time Travel",
      tagline: "Persistent Checkpoints",
      desc: "Saves memory snapshots at every step, allowing humans to rewind, modify parameters, and fork branches.",
      icon: History,
      color: "text-teal-600 dark:text-teal-400",
      bg: "bg-teal-50 dark:bg-teal-500/10",
      border: "border-teal-200 dark:border-teal-500/30",
      badge: "LangGraph Checkpointing",
      codeSnippet: `# State Rollback & Human Intervention
checkpoint = graph.get_state(thread_id, checkpoint_id="cp_step_2")
# Modify flawed recipient before action execution
graph.update_state(thread_id, {"recipient": "security@acme.com"})
graph.resume(thread_id) # Forks execution cleanly`,
    },
  ];

  const currentPattern =
    patterns.find((p) => p.id === selectedPattern) || patterns[1];

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
                <span>Master proven agent design patterns: ReAct, Reflection, Orchestrator-Workers, &amp; Time Travel</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                <span>Understand why ReAct cuts hallucinations from 14% down to 6% on HotpotQA</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                <span>Implement Actor-Critic reflection loops that self-correct security and syntax bugs</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                <span>Leverage persistent checkpointing to rewind and fork agent state with zero wasted work</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: DIRECTING A HOLLYWOOD BLOCKBUSTER */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30 text-teal-700 dark:text-teal-400 font-mono text-xs font-bold">
            Section 1 • Architectural Blueprints
          </span>
          <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
        </div>

        <div className="space-y-2">
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Directing a Hollywood Film vs. A Lone Solo Creator
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            In production, you cannot deploy a single unconstrained loop and expect it to magically handle everything. Big systems require <strong className="text-slate-900 dark:text-white">proven design patterns</strong> to ensure predictability, auditability, and speed.
          </p>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Just as software engineering evolved MVC and microservices, agentic AI has developed canonical patterns: ReAct, Reflection, Orchestrator-Workers, and Checkpoint Time-Travel.
          </p>
        </div>

        {/* Visual Analogy: Lone Amateur vs Hollywood Film Crew */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-1">
          <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-500/30 bg-rose-50/50 dark:bg-rose-950/10 space-y-2">
            <span className="text-xs font-mono font-bold uppercase text-rose-700 dark:text-rose-400 block">
              📹 The Solo Amateur (Monolithic Agent)
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              One person attempts to write the script, operate the camera, perform the stunts, record audio, and color grade simultaneously. They get overwhelmed, miss crucial flaws, and produce a shaky final cut.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-teal-200 dark:border-teal-500/30 bg-teal-50/50 dark:bg-teal-950/10 space-y-2">
            <span className="text-xs font-mono font-bold uppercase text-teal-700 dark:text-teal-400 block">
              🎬 The Hollywood Crew (Agentic Design Patterns)
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              A specialized director coordinates a cinematographer, a stunt coordinator, and a dedicated film editor. Independent review passes ensure cinema-quality perfection before the film hits theaters.
            </p>
          </div>
        </div>

        {/* ✍️ HANDWRITTEN INSTRUCTOR NOTE */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-amber-50/90 dark:bg-amber-500/10 border border-amber-300 dark:border-amber-500/30 shadow-sm sm:-rotate-0.5 transition-transform">
          <div className="flex items-start gap-2.5">
            <span className="text-lg">✍️</span>
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-amber-950 dark:text-amber-300 font-mono uppercase tracking-wider block">
                Instructor Note • Start Simple First
              </span>
              <p className="text-xs sm:text-sm text-amber-950 dark:text-amber-200 font-handwriting leading-snug">
                &quot;Beginners always rush to build complex 8-agent swarm systems. In production, 80% of problems are solved with a simple 2-step ReAct pattern or an Actor-Critic reflection pass. Master the foundational patterns before adding multi-agent complexity!&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE 4 CORE PATTERNS (INTERACTIVE GRID) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30 text-teal-700 dark:text-teal-400 font-mono text-xs font-bold">
            Section 2 • Architectural Topologies
          </span>
          <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
        </div>

        <div className="space-y-1">
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            The 4 Foundational Design Patterns
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
            Select a design pattern below to inspect its topology and code implementation:
          </p>
        </div>

        {/* 2x2 MOBILE / 4-COL DESKTOP SYMMETRICAL CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3.5">
          {patterns.map((p) => {
            const Icon = p.icon;
            const isSelected = selectedPattern === p.id;

            return (
              <button
                key={p.id}
                onClick={() => setSelectedPattern(p.id)}
                className={`p-3 sm:p-4 rounded-xl border text-left transition-all relative flex flex-col justify-between min-h-[145px] sm:min-h-[160px] touch-manipulation active:scale-95 ${
                  isSelected
                    ? "bg-white dark:bg-slate-900 border-teal-500 ring-2 ring-teal-500/20 shadow-md"
                    : "bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-2 rounded-lg ${p.bg} ${p.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                    )}
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-tight">
                    {p.title}
                  </h4>
                  <p className="text-[10px] sm:text-xs font-mono text-teal-700 dark:text-teal-400 mt-0.5">
                    {p.tagline}
                  </p>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mt-2">
                  {p.desc}
                </p>
              </button>
            );
          })}
        </div>

        {/* Dynamic Deep-Dive Inspection Box */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPattern.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400">
                  Pattern: {currentPattern.title}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  {currentPattern.badge}
                </span>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                Code Blueprint
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {currentPattern.desc}
            </p>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 overflow-x-auto">
              <pre className="text-[11px] sm:text-xs text-emerald-400 leading-relaxed">
                <code>{currentPattern.codeSnippet}</code>
              </pre>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* 💡 HANDWRITTEN MENTAL MODEL NOTE */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-teal-50/90 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30 shadow-sm">
          <div className="flex items-start gap-2.5">
            <span className="text-lg">💡</span>
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-teal-950 dark:text-teal-300 font-mono uppercase tracking-wider block">
                Mental Model • Author and Editor
              </span>
              <p className="text-xs sm:text-sm text-teal-950 dark:text-teal-200 font-handwriting leading-snug">
                &quot;The Reflection pattern is simply the relationship between a novelist and their copy editor. The author writes freely with creative flow; the editor reads with critical eyes for plot holes and typos. Together, they produce masterworks!&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: ANTHROPIC & LANGCHAIN PATTERN TAXONOMY */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30 text-teal-700 dark:text-teal-400 font-mono text-xs font-bold">
            Section 3 • Pattern Selection Matrix
          </span>
          <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
        </div>

        <div className="space-y-1">
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            When to Use Which Pattern
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
            Selecting the right pattern for your problem balances accuracy against latency and token cost:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 space-y-2 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-slate-900 dark:text-white">
                ReAct (Single Agent + Tools)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-50 dark:bg-sky-500/10 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-500/30">
                Fast &amp; Grounded
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Best for: Information retrieval, customer support lookups, and tasks requiring 1 to 5 sequential tool queries.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 space-y-2 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-slate-900 dark:text-white">
                Reflection (Actor-Critic)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30">
                Maximum Accuracy
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Best for: Complex code generation, translation, legal contract drafting, and high-consequence calculations.
            </p>
          </div>
        </div>

        {/* 📌 CORE RULE NOTE */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-sky-50/90 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/30 shadow-sm">
          <div className="flex items-start gap-2.5">
            <span className="text-lg">📌</span>
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-sky-950 dark:text-sky-300 font-mono uppercase tracking-wider block">
                The Single-Agent First Rule
              </span>
              <p className="text-xs sm:text-sm text-sky-950 dark:text-sky-200 font-handwriting leading-snug">
                &quot;Exhaust single-agent patterns (ReAct with structured outputs and Reflection) before reaching for multi-agent swarms. Single agents are 10x easier to debug, have predictable latency, and don&apos;t suffer from inter-agent communication drift!&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: IN-CONTEXT SIMULATION (AgenticDesignPatternsExplorer) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30 text-teal-700 dark:text-teal-400 font-mono text-xs font-bold">
            Section 4 • Interactive Pattern Explorer
          </span>
          <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
        </div>

        <AgenticDesignPatternsExplorer />
      </section>

      {/* SECTION 5: HANDS-ON STUDIO (ReActVsReflectionStudio) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30 text-teal-700 dark:text-teal-400 font-mono text-xs font-bold">
            Section 5 • Hands-On Pattern Laboratory
          </span>
          <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
        </div>

        <ReActVsReflectionStudio />

        {/* 📝 PRO-TIP NOTE */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-amber-50/90 dark:bg-amber-500/10 border border-amber-300 dark:border-amber-500/30 shadow-sm">
          <div className="flex items-start gap-2.5">
            <span className="text-lg">📝</span>
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-amber-950 dark:text-amber-300 font-mono uppercase tracking-wider block">
                Production Pro-Tip • Independent Critic Models
              </span>
              <p className="text-xs sm:text-sm text-amber-950 dark:text-amber-200 font-handwriting leading-snug">
                &quot;When using Reflection, consider having a different, more powerful model act as the Critic (e.g., fast model drafts initial code; reasoning model critiques security). Models struggle to spot their own subtle blindspots when self-evaluating in the same prompt!&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: COMMON MISCONCEPTIONS (TRAPS) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30 text-rose-700 dark:text-rose-400 font-mono text-xs font-bold">
            Section 6 • Production Traps
          </span>
          <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-500/30 bg-rose-50/50 dark:bg-rose-950/10 space-y-2">
            <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold text-xs font-mono uppercase">
              <AlertTriangle className="w-4 h-4" />
              TRAP #1: The Premature Multi-Agent Swarm
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Splitting a simple workflow into 5 autonomous agents talking to each other. Inter-agent chatter explodes token costs and leads to conversational deadlocks.
            </p>
            <p className="text-xs text-rose-800 dark:text-rose-300 font-semibold pt-1">
              Fix: Start with a single ReAct loop or deterministic DAG. Only branch to multi-agent when distinct tools or security scopes demand it.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-950/10 space-y-2">
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-xs font-mono uppercase">
              <AlertTriangle className="w-4 h-4" />
              TRAP #2: The Infinite Reflection Spiral
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Allowing an Actor and Critic to endlessly nitpick stylistic trivialities without a stopping threshold.
            </p>
            <p className="text-xs text-amber-800 dark:text-amber-300 font-semibold pt-1">
              Fix: Cap reflection passes at `max_reflections = 3`. If quality thresholds aren&apos;t met in 3 rounds, return the best candidate.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 7: KEY TAKEAWAYS & KNOWLEDGE CHECK */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30 text-teal-700 dark:text-teal-400 font-mono text-xs font-bold">
            Section 7 • Key Takeaways &amp; Quiz
          </span>
          <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
        </div>

        <div className="p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 space-y-3">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
            Summary Checklist
          </h4>
          <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
              <span>
                <strong>Design patterns convert chaos into engineering:</strong> ReAct, Reflection, and Orchestration provide tested structural blueprints for reliability.
              </span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
              <span>
                <strong>ReAct grounds thought in observation:</strong> Alternating reasoning with real-world tool execution slashes hallucination rates by more than half.
              </span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
              <span>
                <strong>Time travel enables rapid human recovery:</strong> Saving state checkpoints lets engineers rewind, fix flawed arguments, and resume workflows without starting over.
              </span>
            </div>
          </div>
        </div>

        {/* Expandable Quiz Container */}
        <div className="pt-2">
          {!showQuiz ? (
            <button
              onClick={() => setShowQuiz(true)}
              className="w-full py-3.5 px-4 rounded-xl border border-teal-200 dark:border-teal-500/30 bg-teal-50/60 dark:bg-teal-500/10 hover:bg-teal-100/60 dark:hover:bg-teal-500/20 text-teal-800 dark:text-teal-300 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-sm touch-manipulation active:scale-[0.99]"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Take Knowledge Check (3 Questions)</span>
            </button>
          ) : (
            <Module1_7Quiz />
          )}
        </div>
      </section>

      {/* SECTION 8: BRIDGE TO MODULE 1.8 */}
      <section className="pt-4">
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-r from-teal-50/70 via-slate-50 to-sky-50/70 dark:from-teal-950/20 dark:via-slate-900/40 dark:to-sky-950/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div className="space-y-1">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400">
              Next Step in Level 1
            </span>
            <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Module 1.8: Short-Term and Long-Term Agent Memory
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Explore in-context short term scratchpads vs persistent vector &amp; relational long-term memory.
            </p>
          </div>

          <Link
            href="/learn/level-1/module-1-8"
            className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center gap-2 transition shadow-sm shrink-0 touch-manipulation active:scale-95"
          >
            <span>Proceed to 1.8</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
