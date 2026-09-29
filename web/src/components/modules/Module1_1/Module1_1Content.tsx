"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  Check,
  BookOpen,
  ChefHat,
  ArrowRight,
  Brain,
  Wrench,
  Database,
  Eye,
  RotateCcw,
  Sparkles,
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Code2,
  FileText,
  Play,
  Layers,
} from "lucide-react";
import LiveAgentTraceVisualizer from "./LiveAgentTraceVisualizer";
import InteractiveCodeExecutor from "./InteractiveCodeExecutor";
import Module1_1Quiz from "./Module1_1Quiz";

export default function Module1_1Content() {
  const [selectedComponent, setSelectedComponent] = useState<string>("reasoning");
  const [activeLoopStep, setActiveLoopStep] = useState<number>(1);
  const [showQuiz, setShowQuiz] = useState<boolean>(false);

  const components = [
    {
      id: "reasoning",
      title: "1. Reasoning",
      tagline: "The Brain (LLM)",
      desc: "Evaluates the user's objective, inspects observations, and decides the next action.",
      icon: Brain,
      color: "text-violet-600 dark:text-violet-400",
      bg: "bg-violet-50 dark:bg-violet-500/10",
      border: "border-violet-200 dark:border-violet-500/30",
      badge: "Cognitive Engine",
      codeSnippet: `if "financial" in user_goal:
    next_action = "call_mock_financial_db"`,
    },
    {
      id: "tools",
      title: "2. Tools",
      tagline: "The Hands (Actuators)",
      desc: "External APIs, SQL databases, and calculators that give the agent real-world superpowers.",
      icon: Wrench,
      color: "text-sky-600 dark:text-sky-400",
      bg: "bg-sky-50 dark:bg-sky-500/10",
      border: "border-sky-200 dark:border-sky-500/30",
      badge: "Action Layer",
      codeSnippet: `TOOLS = {
    "financial_db": mock_financial_db,
    "calculator": calculate_growth
}`,
    },
    {
      id: "memory",
      title: "3. Memory",
      tagline: "The Notebook (State Buffer)",
      desc: "Stores conversational context and tool responses across multiple execution turns.",
      icon: Database,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      border: "border-emerald-200 dark:border-emerald-500/30",
      badge: "Context & State",
      codeSnippet: `class AgentMemory:
    def record(self, role, content):
        self.history.append({"role": role, "content": content})`,
    },
    {
      id: "input",
      title: "4. Perception",
      tagline: "The Eyes & Ears (Sensors)",
      desc: "Ingests user prompts, environment webhooks, and raw tool output observations.",
      icon: Eye,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      border: "border-amber-200 dark:border-amber-500/30",
      badge: "Feedback Ingestion",
      codeSnippet: `observation = tool.execute(params)
memory.record("observation", observation)`,
    },
  ];

  const loopSteps = [
    {
      id: 1,
      title: "Perception",
      icon: Eye,
      desc: "Agent receives user prompt or environment trigger.",
    },
    {
      id: 2,
      title: "Reasoning",
      icon: Brain,
      desc: "LLM analyzes intent, reviews memory, and selects a tool.",
    },
    {
      id: 3,
      title: "Tool Call",
      icon: Wrench,
      desc: "Agent executes external code or API call.",
    },
    {
      id: 4,
      title: "Observation",
      icon: FileText,
      desc: "Tool output returns and updates internal memory.",
    },
    {
      id: 5,
      title: "Repeat",
      icon: RotateCcw,
      desc: "Cycle repeats until the objective is 100% solved!",
    },
  ];

  const currentComp = components.find((c) => c.id === selectedComponent) || components[0];

  return (
    <div className="space-y-10 text-slate-800 dark:text-slate-200 pb-12">
      {/* ───────────────────────────────────────────────────────────── */}
      {/* TOP LEARNING OBJECTIVE CARD                                   */}
      {/* ───────────────────────────────────────────────────────────── */}
      {/* ───────────────────────────────────────────────────────────── */}
      {/* TOP LEARNING OBJECTIVE CARD                                   */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="rounded-2xl sm:rounded-3xl border border-sky-200/90 dark:border-sky-500/30 bg-sky-50/70 dark:bg-sky-500/10 p-4 sm:p-7 shadow-xs">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-sky-500/15 border border-sky-500/30 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0 shadow-xs">
            <Target className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="space-y-2 sm:space-y-2.5 flex-1 min-w-0">
            <h2 className="text-sm sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
              By the end of this module, you will:
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
                <span>Understand what an AI agent is and how it differs from a simple LLM</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
                <span>Learn the 4 core components: Reasoning, Tools, Memory & Perception</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
                <span>Explore the agent loop (perception → reasoning → action → observation)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
                <span>Run live agent code simulation in browser</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* SECTION 1: WHAT IS AN AI AGENT?                               */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="space-y-3.5 sm:space-y-4">
        <div className="space-y-1.5">
          <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            1. What is an AI Agent?
          </h2>
          <p className="text-xs sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            An AI agent is more than just a chatbot. It can understand its environment, make
            decisions, use external tools, and take actions to achieve a goal — with minimal human
            intervention.
          </p>
        </div>

        {/* Visual Analogy Card: Recipe Book vs Executive Chef */}
        <div className="p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-5 transition hover:shadow-sm">
          {/* Recipe Book */}
          <div className="flex items-center gap-3.5 sm:gap-4 flex-1 w-full p-3 sm:p-0 rounded-xl sm:rounded-none bg-violet-50/50 dark:bg-violet-500/10 sm:bg-transparent sm:dark:bg-transparent border border-violet-100 dark:border-violet-500/20 sm:border-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-violet-100 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0 border border-violet-200 dark:border-violet-500/30">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h3 className="text-xs sm:text-base font-bold text-slate-900 dark:text-white">
                LLM = Recipe Book
              </h3>
              <p className="text-[11px] sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                Contains immense knowledge and text recipes, but cannot touch the stove.
              </p>
            </div>
          </div>

          {/* Center Divider / Arrow */}
          <div className="text-slate-300 dark:text-slate-600 shrink-0 hidden sm:block">
            <ArrowRight className="w-6 h-6" />
          </div>
          <div className="text-slate-400 dark:text-slate-500 shrink-0 block sm:hidden py-0.5">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 uppercase font-bold">
              vs
            </span>
          </div>

          {/* Executive Chef */}
          <div className="flex items-center gap-3.5 sm:gap-4 flex-1 w-full p-3 sm:p-0 rounded-xl sm:rounded-none bg-emerald-50/50 dark:bg-emerald-500/10 sm:bg-transparent sm:dark:bg-transparent border border-emerald-100 dark:border-emerald-500/20 sm:border-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-200 dark:border-emerald-500/30">
              <ChefHat className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h3 className="text-xs sm:text-base font-bold text-slate-900 dark:text-white">
                Agent = Executive Chef
              </h3>
              <p className="text-[11px] sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                Takes action, holds utensils, tastes feedback, and adapts to finish the dish.
              </p>
            </div>
          </div>
        </div>

        {/* Handwritten Teacher Note */}
        <div className="flex items-start sm:items-center gap-2.5 sm:gap-3 p-3.5 sm:p-4 rounded-2xl bg-amber-50/90 dark:bg-amber-500/10 border border-amber-300/80 dark:border-amber-500/30 text-amber-950 dark:text-amber-200 sm:-rotate-0.5 shadow-2xs">
          <span className="text-xl sm:text-2xl shrink-0 mt-0.5 sm:mt-0">✍️</span>
          <p className="font-handwriting text-base sm:text-xl leading-snug">
            "Instructor note: Chatbots talk, but Agents work! An LLM generates words; an agent takes real actions in the world."
          </p>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* SECTION 2: THE 4 CORE COMPONENTS                              */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="space-y-3.5 sm:space-y-4">
        <div className="space-y-1.5">
          <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            2. The 4 Core Components
          </h2>
          <p className="text-xs sm:text-base text-slate-600 dark:text-slate-300">
            Every production AI agent is composed of four interconnected modules:
          </p>
        </div>

        {/* 4 Interactive Cards (2x2 Grid on Mobile, 4 Cols on Desktop) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3.5">
          {components.map((comp) => {
            const Icon = comp.icon;
            const isSelected = selectedComponent === comp.id;

            return (
              <button
                key={comp.id}
                onClick={() => setSelectedComponent(comp.id)}
                className={`p-2.5 sm:p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[145px] sm:min-h-[160px] active:scale-[0.98] touch-manipulation ${
                  isSelected
                    ? `${comp.border} ${comp.bg} ring-2 ring-teal-500/40 shadow-xs`
                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                <div>
                  <div
                    className={`w-7 h-7 sm:w-9 sm:h-9 rounded-xl ${comp.bg} ${comp.color} border ${comp.border} flex items-center justify-center mb-1.5 sm:mb-3`}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-tight">
                    {comp.title}
                  </h3>
                  <span className="text-[9px] sm:text-[10px] font-mono uppercase font-bold text-slate-500 dark:text-slate-400 block mt-0.5 truncate">
                    {comp.tagline}
                  </span>
                  <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-300 mt-1 leading-snug line-clamp-3 sm:line-clamp-none">
                    {comp.desc}
                  </p>
                </div>

                <div className="mt-2 pt-1.5 border-t border-slate-100 dark:border-slate-800 text-[10px] sm:text-[11px] font-mono text-teal-600 dark:text-teal-400 flex items-center justify-between">
                  <span>{isSelected ? "Active" : "Inspect"}</span>
                  <span>→</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Component Code Deep-Dive Box */}
        <div className="p-3 sm:p-5 rounded-2xl bg-slate-950 text-slate-100 border border-slate-800 shadow-xs space-y-2 sm:space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span
                className={`text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md shrink-0 ${currentComp.bg} ${currentComp.color}`}
              >
                {currentComp.badge}
              </span>
              <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                Implementation: {currentComp.title}
              </h4>
            </div>
            <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 self-end sm:self-auto shrink-0">
              Pure Python
            </span>
          </div>

          <pre className="p-3 sm:p-3.5 rounded-xl bg-slate-900 text-emerald-300 font-mono text-xs font-semibold overflow-x-auto border border-slate-800">
            <code>{currentComp.codeSnippet}</code>
          </pre>
        </div>

        {/* Handwritten Mental Model Note */}
        <div className="flex items-start sm:items-center gap-2.5 sm:gap-3 p-3.5 rounded-2xl bg-teal-50/90 dark:bg-teal-500/10 border border-teal-200/80 dark:border-teal-500/30 text-teal-950 dark:text-teal-200 sm:rotate-0.5 shadow-2xs">
          <span className="text-xl shrink-0 mt-0.5 sm:mt-0">💡</span>
          <p className="font-handwriting text-base sm:text-lg leading-snug">
            "Mental model: Brain = Reasoning, Hands = Tools, Notebook = Memory, Eyes = Perception!"
          </p>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* SECTION 3: THE AGENT LOOP                                     */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="space-y-3.5 sm:space-y-4">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              3. The Agent Loop
            </h2>
            <span className="text-[10px] font-mono text-teal-600 dark:text-teal-400 sm:hidden">
              Swipe steps →
            </span>
          </div>
          <p className="text-xs sm:text-base text-slate-600 dark:text-slate-300">
            The agent continuously loops through perception, reasoning, and action until its task is
            solved:
          </p>
        </div>

        {/* Loop Interactive Step Badges (Mobile Touch Swipe) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none snap-x touch-pan-x -mx-1 px-1">
          {loopSteps.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = activeLoopStep === step.id;

            return (
              <React.Fragment key={step.id}>
                <button
                  onClick={() => setActiveLoopStep(step.id)}
                  className={`px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl text-xs font-mono font-medium flex items-center gap-1.5 shrink-0 transition-all cursor-pointer snap-start active:scale-95 touch-manipulation ${
                    isSelected
                      ? "bg-teal-600 text-white font-bold shadow-md shadow-teal-500/20"
                      : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{step.title}</span>
                </button>
                {idx < loopSteps.length - 1 && (
                  <span className="text-slate-300 dark:text-slate-600 shrink-0 font-bold">→</span>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Active Step Explainer Card */}
        <div className="p-3 sm:p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm font-mono flex items-center gap-2.5 sm:gap-3">
          <span className="font-bold text-teal-600 dark:text-teal-400 shrink-0">
            Step {activeLoopStep}:
          </span>
          <span className="text-slate-700 dark:text-slate-300">
            {loopSteps.find((s) => s.id === activeLoopStep)?.desc}
          </span>
        </div>

        {/* Handwritten Loop Rule Note */}
        <div className="flex items-start sm:items-center gap-2.5 sm:gap-3 p-3.5 rounded-2xl bg-sky-50/80 dark:bg-sky-500/10 border border-sky-200/80 dark:border-sky-500/30 text-sky-950 dark:text-sky-200 sm:-rotate-0.5 shadow-2xs">
          <span className="text-xl shrink-0 mt-0.5 sm:mt-0">📌</span>
          <p className="font-handwriting text-base sm:text-lg leading-snug">
            "Loop rule: The cycle repeats until the agent declares 'task complete' or hits a safe max turn safeguard."
          </p>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* SECTION 4: SEE IT IN ACTION (Interactive Simulation Right Here!)*/}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="space-y-3.5 sm:space-y-4 pt-1 sm:pt-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-teal-600 dark:text-teal-400 shrink-0" />
              <span>4. See It in Action (Live Simulation)</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Watch the agent loop execute in real-time. Tap{" "}
              <strong className="text-teal-600 dark:text-teal-400">Play Trace</strong> to step through:
            </p>
          </div>
        </div>

        <LiveAgentTraceVisualizer />
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* SECTION 5: TRY IT YOURSELF (Live Hands-on Python Simulator)    */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="space-y-3.5 sm:space-y-4 pt-1 sm:pt-2">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Code2 className="w-5 h-5 sm:w-6 sm:h-6 text-sky-600 dark:text-sky-400 shrink-0" />
            <span>5. Try It Yourself (Interactive Code Runner)</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Pure Python agent implementation. Choose target company and tap{" "}
            <strong className="text-violet-600 dark:text-violet-400">Run</strong>:
          </p>
        </div>

        <InteractiveCodeExecutor />

        {/* Handwritten Note on Tools */}
        <div className="flex items-start sm:items-center gap-2.5 sm:gap-3 p-3.5 rounded-2xl bg-amber-50/80 dark:bg-amber-500/10 border border-amber-200/80 dark:border-amber-500/30 text-amber-950 dark:text-amber-200 sm:rotate-0.5 shadow-2xs">
          <span className="text-xl shrink-0 mt-0.5 sm:mt-0">📝</span>
          <p className="font-handwriting text-base sm:text-lg leading-snug">
            "Notice: The agent never guessed or hallucinated the growth math — it invoked the calculator tool deterministically!"
          </p>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* SECTION 6: COMMON MISCONCEPTIONS & CRITICAL GOTCHAS           */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="space-y-3.5 sm:space-y-4 pt-1 sm:pt-2">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500 shrink-0" />
            <span>6. Common Misconceptions</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Two traps that beginner AI engineers frequently fall into:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {/* Gotcha 1 */}
          <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-amber-50/70 dark:bg-amber-500/10 border border-amber-200/80 dark:border-amber-500/30 space-y-1.5 sm:space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 inline-block">
              Trap #1
            </span>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
              A single prompt is NOT an agent
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              A long system prompt in a single API call is just prompt engineering. An agent requires
              an autonomous loop, tools, and observation feedback.
            </p>
          </div>

          {/* Gotcha 2 */}
          <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5 sm:space-y-2 shadow-xs">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 inline-block">
              Trap #2
            </span>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
              LLMs are NOT calculators
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              LLMs predict text statistically. They cannot do exact math reliably. Equipping agents
              with calculators or Python execution tools is non-negotiable.
            </p>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* SECTION 7: KEY TAKEAWAYS & KNOWLEDGE CHECK                    */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="space-y-3.5 sm:space-y-4 pt-1 sm:pt-2">
        {/* Key Takeaways Card */}
        <div className="p-4 sm:p-7 rounded-2xl sm:rounded-3xl bg-amber-50/80 dark:bg-amber-500/10 border border-amber-200/90 dark:border-amber-500/30 space-y-3 sm:space-y-3.5 shadow-xs">
          <div className="flex items-center gap-2 text-amber-900 dark:text-amber-300">
            <Lightbulb className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider font-mono">
              Key Takeaways
            </h3>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
            <li className="flex items-start gap-2 sm:gap-2.5">
              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span>An agent is <strong>autonomous</strong>, <strong>goal-directed</strong>, and <strong>adaptive</strong>.</span>
            </li>
            <li className="flex items-start gap-2 sm:gap-2.5">
              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span>It has 4 core components: reasoning, tools, memory, and perception.</span>
            </li>
            <li className="flex items-start gap-2 sm:gap-2.5">
              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span>The <strong>agent loop</strong> drives the action-observation cycle to solve tasks.</span>
            </li>
          </ul>

          {/* Handwritten Pro Tip Note */}
          <div className="pt-2.5 sm:pt-3 border-t border-amber-200/80 dark:border-amber-500/20">
            <p className="font-handwriting text-base sm:text-lg text-amber-950 dark:text-amber-200 leading-snug">
              "Pro tip: Always write automated unit tests for your tools before handing them over to an autonomous LLM loop!"
            </p>
          </div>
        </div>

        {/* Knowledge Check Card */}
        <div className="p-4 sm:p-7 rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-violet-100 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  Knowledge Check Quiz
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Quick 3-question check to test what you learned in Module 1.1.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowQuiz(!showQuiz)}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-mono text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-95 touch-manipulation"
            >
              <span>{showQuiz ? "Hide Quiz" : "Start Quiz"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <AnimatePresence>
            {showQuiz && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="pt-3 sm:pt-4 border-t border-slate-200 dark:border-slate-800 overflow-hidden"
              >
                <Module1_1Quiz />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* SECTION 8: BRIDGE TO NEXT MODULE                              */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-teal-500/10 via-emerald-500/10 to-teal-500/10 border border-teal-500/30 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 shadow-xs">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
            Ready to Level Up?
          </span>
          <h3 className="text-sm sm:text-lg font-bold text-slate-900 dark:text-white mt-0.5">
            Next: Module 1.2 • The Agent Loop & Prompt Engineering
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Learn how prompt chaining and Chain-of-Thought unlock structured agent reasoning.
          </p>
        </div>

        <Link
          href="/learn/level-1/module-1-2"
          className="w-full sm:w-auto justify-center px-5 py-3 sm:py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs font-mono flex items-center gap-1.5 shadow-md shadow-teal-500/20 transition-all hover:scale-[1.02] active:scale-95 shrink-0"
        >
          <span>Next Module</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
