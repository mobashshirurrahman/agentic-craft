"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  SkipBack,
  Sparkles,
  Cpu,
  Wrench,
  Eye,
  CheckCircle2,
  Terminal,
  Lightbulb,
} from "lucide-react";

interface StepData {
  id: number;
  phase: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgGlow: string;
  borderGlow: string;
  thought: string;
  actionPayload: string;
  tutorTip: string;
}

const STEPS: StepData[] = [
  {
    id: 1,
    phase: "1. PERCEIVE & RECEIVE",
    title: "User Prompt Ingestion",
    icon: Eye,
    color: "text-sky-400",
    bgGlow: "bg-sky-500/10",
    borderGlow: "border-sky-500/40 shadow-sky-500/20",
    thought: 'User asked: "Find the latest quarterly revenue for TechCorp and write a 2-line summary."',
    actionPayload: JSON.stringify(
      {
        goal: "Find Q3 TechCorp revenue and summarize",
        constraints: ["Must use verified financial data", "Max 2 lines"],
      },
      null,
      2
    ),
    tutorTip:
      "Arrey bhai, notice carefully: An agent does not just jump into answering. First, it ingests the goal and checks what information is missing!",
  },
  {
    id: 2,
    phase: "2. REASON & PLAN",
    title: "LLM Cognitive Deliberation",
    icon: Cpu,
    color: "text-violet-400",
    bgGlow: "bg-violet-500/10",
    borderGlow: "border-violet-500/40 shadow-violet-500/20",
    thought:
      "THOUGHT: I do not have real-time financial data in my pre-trained weights. I need to call the web_search tool with a targeted query.",
    actionPayload: JSON.stringify(
      {
        reasoning_step: 1,
        selected_tool: "web_search",
        tool_input: { query: "TechCorp Q3 2026 earnings report revenue" },
      },
      null,
      2
    ),
    tutorTip:
      "This is the 'Reasoning Engine' in action! The LLM realizes its own limitations and formulates a plan rather than hallucinating fake numbers.",
  },
  {
    id: 3,
    phase: "3. ACT / TOOL EXECUTION",
    title: "Invoking External Tool",
    icon: Wrench,
    color: "text-emerald-400",
    bgGlow: "bg-emerald-500/10",
    borderGlow: "border-emerald-500/40 shadow-emerald-500/20",
    thought:
      "DISPATCHING: Calling external web_search API with parameters via Model Context Protocol (MCP)...",
    actionPayload: JSON.stringify(
      {
        status: "invoking_tool",
        endpoint: "mcp://finance_tools/web_search",
        timestamp: "2026-09-27T20:30:15Z",
        latency: "142ms",
      },
      null,
      2
    ),
    tutorTip:
      "See how the tool execution happens outside the LLM? The LLM pauses, hands off control to the tool, and awaits real-world data!",
  },
  {
    id: 4,
    phase: "4. OBSERVE & INGEST",
    title: "Environment Observation",
    icon: Sparkles,
    color: "text-amber-400",
    bgGlow: "bg-amber-500/10",
    borderGlow: "border-amber-500/40 shadow-amber-500/20",
    thought:
      "OBSERVATION: Tool returned official SEC filing snippet: TechCorp reported Q3 revenue of $14.2B, beating estimates by 4%.",
    actionPayload: JSON.stringify(
      {
        tool_result: {
          company: "TechCorp",
          quarter: "Q3 2026",
          revenue: "$14.2 Billion",
          growth: "+18% YoY",
          verified: true,
        },
      },
      null,
      2
    ),
    tutorTip:
      "The tool output gets fed right back into the LLM's context window as an 'Observation'. The agent now has fresh ground-truth facts.",
  },
  {
    id: 5,
    phase: "5. REFLECT & FINALIZE",
    title: "Reflection & Goal Completion",
    icon: CheckCircle2,
    color: "text-emerald-400",
    bgGlow: "bg-emerald-500/10",
    borderGlow: "border-emerald-500/40 shadow-emerald-500/20",
    thought:
      "CRITIQUE: Do I have everything requested? Yes: revenue figure ($14.2B) and summary under 2 lines. Stop loop and return final answer.",
    actionPayload: JSON.stringify(
      {
        status: "complete",
        total_steps: 2,
        final_answer:
          "TechCorp posted strong Q3 2026 revenue of $14.2B, an 18% YoY increase that surpassed consensus estimates by 4%. Growth was driven primarily by cloud enterprise adoption.",
      },
      null,
      2
    ),
    tutorTip:
      "Shabash! The agent verifies that the user's constraints are met before producing the final response. This prevents endless hallucination loops!",
  },
];

export default function AgenticLoopVisualizer() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentStep = STEPS[currentStepIndex];

  // Auto-play interval
  useEffect(() => {
    if (isPlaying) {
      const stepDuration = 3200 / playbackSpeed;
      timerRef.current = setTimeout(() => {
        setCurrentStepIndex((prev) => (prev + 1) % STEPS.length);
      }, stepDuration);
    } else if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, currentStepIndex, playbackSpeed]);

  const handleNext = () => {
    setIsPlaying(false);
    setCurrentStepIndex((prev) => (prev + 1) % STEPS.length);
  };

  const handlePrev = () => {
    setIsPlaying(false);
    setCurrentStepIndex((prev) => (prev - 1 + STEPS.length) % STEPS.length);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="w-full rounded-2xl border border-slate-800 bg-slate-950/80 p-5 md:p-7 shadow-2xl backdrop-blur-xl relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-violet-500/10 blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
            </span>
            <h3 className="text-lg md:text-xl font-bold tracking-tight text-white flex items-center gap-2">
              The Living Agentic Loop <span className="text-teal-400 font-mono text-sm">(ReAct Cycle)</span>
            </h3>
          </div>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Real-time 60fps simulation of an autonomous agent perceiving, reasoning, acting, and reflecting.
          </p>
        </div>

        {/* Video-player style controls */}
        <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 rounded-xl p-1.5 shadow-inner">
          <button
            onClick={handlePrev}
            className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition"
            title="Previous Step"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            onClick={togglePlay}
            className={`px-3 py-2 rounded-lg font-semibold text-xs flex items-center gap-1.5 transition ${
              isPlaying
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                : "bg-teal-500/20 text-teal-300 border border-teal-500/40 hover:bg-teal-500/30"
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" /> Pause
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" /> Play Flow
              </>
            )}
          </button>

          <button
            onClick={handleNext}
            className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition"
            title="Next Step"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          <button
            onClick={handleReset}
            className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition"
            title="Restart Loop"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <div className="h-4 w-[1px] bg-slate-800 mx-1" />

          {/* Speed selector */}
          <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
            {[0.5, 1, 2].map((spd) => (
              <button
                key={spd}
                onClick={() => setPlaybackSpeed(spd)}
                className={`px-1.5 py-0.5 rounded transition ${
                  playbackSpeed === spd
                    ? "bg-slate-700 text-white font-bold"
                    : "hover:text-slate-200"
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Step Timeline Scrubber */}
      <div className="py-5">
        <div className="grid grid-cols-5 gap-2 relative">
          {STEPS.map((step, idx) => {
            const isActive = idx === currentStepIndex;
            const isPassed = idx < currentStepIndex;
            const Icon = step.icon;

            return (
              <button
                key={step.id}
                onClick={() => {
                  setIsPlaying(false);
                  setCurrentStepIndex(idx);
                }}
                className={`flex flex-col items-center text-center p-2 rounded-xl transition-all duration-300 relative group ${
                  isActive
                    ? `${step.bgGlow} border ${step.borderGlow} shadow-lg scale-105`
                    : isPassed
                    ? "bg-slate-900/60 border border-slate-800 text-slate-400 hover:bg-slate-800/60"
                    : "bg-slate-900/30 border border-slate-800/40 text-slate-600 hover:bg-slate-900"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center mb-1.5 transition-transform ${
                    isActive
                      ? `${step.color} bg-slate-950 shadow-inner scale-110`
                      : "text-slate-400"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 hidden sm:block">
                  Step {step.id}
                </span>
                <span
                  className={`text-xs font-semibold leading-tight line-clamp-1 ${
                    isActive ? "text-white" : "text-slate-400"
                  }`}
                >
                  {step.title.split(" ")[0]}
                </span>

                {/* Animated active beacon bar */}
                {isActive && (
                  <motion.div
                    layoutId="activeTabBeacon"
                    className="absolute -bottom-1.5 left-2 right-2 h-1 rounded-full bg-gradient-to-r from-teal-400 to-sky-400 shadow-md shadow-teal-400/50"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Simulation Stage: Animated State Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep.id}
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.98 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-2"
        >
          {/* Left panel: Active Node Concept & State */}
          <div className="lg:col-span-7 rounded-xl border border-slate-800 bg-slate-900/60 p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold tracking-widest text-teal-400 px-2.5 py-1 rounded-md bg-teal-500/10 border border-teal-500/20">
                  {currentStep.phase}
                </span>
                <span className="text-xs font-mono text-slate-500">
                  Stage {currentStepIndex + 1} of 5
                </span>
              </div>

              <h4 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                {currentStep.title}
              </h4>

              {/* Thought block */}
              <div className="mt-4 p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-sm leading-relaxed font-sans text-slate-200">
                <div className="flex items-center gap-2 text-xs font-mono text-violet-400 uppercase tracking-wider mb-1.5">
                  <Cpu className="w-3.5 h-3.5" /> Agent Internal Thought Trace
                </div>
                <p className="italic text-slate-300">"{currentStep.thought}"</p>
              </div>
            </div>

            {/* Indian Tutor Explainer Callout */}
            <div className="mt-5 p-3.5 rounded-xl bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-transparent border border-amber-500/25 flex items-start gap-3">
              <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300 shrink-0 mt-0.5">
                <Lightbulb className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block font-mono">
                  Tutor's Practical Insight
                </span>
                <p className="text-xs text-amber-100/90 mt-1 leading-relaxed">
                  {currentStep.tutorTip}
                </p>
              </div>
            </div>
          </div>

          {/* Right panel: Live JSON / State Payload Terminal */}
          <div className="lg:col-span-5 rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono flex flex-col justify-between shadow-inner">
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-850">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Terminal className="w-3.5 h-3.5 text-teal-400" />
                  <span>state_payload.json</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
              </div>

              <pre className="text-[12px] text-teal-300/90 overflow-x-auto p-1 leading-snug">
                <code>{currentStep.actionPayload}</code>
              </pre>
            </div>

            <div className="pt-3 mt-3 border-t border-slate-850 flex items-center justify-between text-[11px] text-slate-500">
              <span>Agent Memory: Thread #8491</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Active Loop
              </span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
