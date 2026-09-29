"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  Brain,
  Wrench,
  FileText,
  CheckCircle2,
  Play,
  RotateCcw,
  Sparkles,
  ChevronRight,
  Terminal,
  Pause,
} from "lucide-react";

interface TraceStep {
  stepNum: number;
  phase: "perception" | "reasoning" | "tool" | "observation" | "answer";
  title: string;
  detail: string;
  icon: React.ComponentType<{ className?: string }>;
  color: {
    bg: string;
    text: string;
    border: string;
    iconBg: string;
  };
}

const TRACE_STEPS: TraceStep[] = [
  {
    stepNum: 1,
    phase: "perception",
    title: "Perception",
    detail: "Received user query & parsed context",
    icon: Eye,
    color: {
      bg: "bg-purple-50 dark:bg-purple-500/10",
      text: "text-purple-800 dark:text-purple-300",
      border: "border-purple-200 dark:border-purple-500/30",
      iconBg: "bg-purple-500 text-white",
    },
  },
  {
    stepNum: 2,
    phase: "reasoning",
    title: "Reasoning",
    detail: "Need to fetch verified financial data for TECH",
    icon: Brain,
    color: {
      bg: "bg-sky-50 dark:bg-sky-500/10",
      text: "text-sky-800 dark:text-sky-300",
      border: "border-sky-200 dark:border-sky-500/30",
      iconBg: "bg-sky-500 text-white",
    },
  },
  {
    stepNum: 3,
    phase: "tool",
    title: "Tool Use",
    detail: "Calling financial_db(ticker='TECH')",
    icon: Wrench,
    color: {
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      text: "text-emerald-800 dark:text-emerald-300",
      border: "border-emerald-200 dark:border-emerald-500/30",
      iconBg: "bg-emerald-500 text-white",
    },
  },
  {
    stepNum: 4,
    phase: "observation",
    title: "Observation",
    detail: "Got data: 2025 = $12.0B, 2026 = $14.2B",
    icon: FileText,
    color: {
      bg: "bg-amber-50 dark:bg-amber-500/10",
      text: "text-amber-800 dark:text-amber-300",
      border: "border-amber-200 dark:border-amber-500/30",
      iconBg: "bg-amber-500 text-white",
    },
  },
  {
    stepNum: 5,
    phase: "reasoning",
    title: "Reasoning",
    detail: "Calculate percentage: ((14.2 - 12) / 12) * 100",
    icon: Brain,
    color: {
      bg: "bg-sky-50 dark:bg-sky-500/10",
      text: "text-sky-800 dark:text-sky-300",
      border: "border-sky-200 dark:border-sky-500/30",
      iconBg: "bg-sky-500 text-white",
    },
  },
  {
    stepNum: 6,
    phase: "answer",
    title: "Final Answer",
    detail: "18.33% YoY Growth synthesized for user",
    icon: CheckCircle2,
    color: {
      bg: "bg-teal-50 dark:bg-teal-500/15",
      text: "text-teal-800 dark:text-teal-300",
      border: "border-teal-200 dark:border-teal-500/40",
      iconBg: "bg-teal-600 text-white",
    },
  },
];

export default function LiveAgentTraceVisualizer() {
  const [currentStep, setCurrentStep] = useState<number>(TRACE_STEPS.length); // default full view
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      if (currentStep >= TRACE_STEPS.length) {
        setCurrentStep(1);
      }
      timer = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= TRACE_STEPS.length) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1400);
    }
    return () => clearInterval(timer);
  }, [isPlaying, currentStep]);

  const handlePlay = () => {
    if (currentStep >= TRACE_STEPS.length) {
      setCurrentStep(1);
    }
    setIsPlaying(true);
  };

  const handleStepNext = () => {
    setIsPlaying(false);
    setCurrentStep((prev) => (prev < TRACE_STEPS.length ? prev + 1 : 1));
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(1);
  };

  const isCompleted = currentStep >= TRACE_STEPS.length;

  return (
    <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 text-slate-900 dark:text-white overflow-hidden shadow-xs transition hover:shadow-sm">
      {/* Top Bar with Controls */}
      <div className="px-3 sm:px-5 py-2.5 sm:py-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 bg-slate-50/80 dark:bg-slate-950/60">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse shrink-0" />
          <span className="text-xs font-mono font-bold tracking-tight text-slate-800 dark:text-slate-200 flex items-center gap-1 truncate">
            <Terminal className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0 hidden sm:inline" />
            <span className="hidden xs:inline">Live </span>Trace
          </span>
          <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 shrink-0">
            ({currentStep}/{TRACE_STEPS.length})
          </span>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          <button
            onClick={isPlaying ? () => setIsPlaying(false) : handlePlay}
            className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-[11px] sm:text-xs font-mono font-bold flex items-center gap-1 transition cursor-pointer shadow-xs active:scale-95 touch-manipulation"
            title={isPlaying ? "Pause" : "Auto Play Trace"}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3 h-3" /> <span className="hidden sm:inline">Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 fill-current" /> <span>{isCompleted ? "Replay" : "Play"}</span>
              </>
            )}
          </button>

          <button
            onClick={handleStepNext}
            className="px-2 sm:px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-[11px] sm:text-xs font-mono flex items-center gap-1 transition cursor-pointer shadow-2xs active:scale-95 touch-manipulation"
            title="Next Step"
          >
            <span>Step</span>
            <ChevronRight className="w-3 h-3" />
          </button>

          <button
            onClick={handleReset}
            className="p-1.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 transition cursor-pointer shadow-2xs active:scale-95 touch-manipulation"
            title="Reset"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </div>

      <div className="p-3 sm:p-6 space-y-3 sm:space-y-4">
        {/* User Prompt Message Bubble */}
        <div className="flex items-start gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-sky-50/70 dark:bg-sky-500/10 border border-sky-200/80 dark:border-sky-500/30">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-sky-500/20 text-sky-700 dark:text-sky-300 flex items-center justify-center shrink-0 text-xs sm:text-sm font-bold border border-sky-500/30">
            👤
          </div>
          <div className="text-xs">
            <span className="font-mono text-[9px] sm:text-[10px] uppercase font-bold text-sky-700 dark:text-sky-400 block mb-0.5">
              User Goal Prompt
            </span>
            <p className="text-slate-900 dark:text-slate-100 font-semibold text-xs sm:text-sm leading-snug">
              &ldquo;What is the YoY revenue growth for TECH?&rdquo;
            </p>
          </div>
        </div>

        {/* Execution Trace Steps Vertical Stream */}
        <div className="space-y-2 sm:space-y-2.5 relative">
          {TRACE_STEPS.map((step, idx) => {
            const isVisible = idx < currentStep;
            const isCurrent = idx === currentStep - 1;
            const Icon = step.icon;

            if (!isVisible) return null;

            return (
              <div
                key={step.stepNum}
                className={`flex items-start gap-2.5 sm:gap-3.5 p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border transition-all ${
                  isCurrent
                    ? `${step.color.bg} ${step.color.border} ring-2 ring-teal-500/40 shadow-xs`
                    : "bg-slate-50/80 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800/80"
                }`}
              >
                <div
                  className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg sm:rounded-xl ${step.color.iconBg} flex items-center justify-center shrink-0 mt-0.5 shadow-xs`}
                >
                  <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1.5">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white truncate">
                      {step.stepNum}. {step.title}
                    </span>
                    {isCurrent && (
                      <span className="text-[9px] sm:text-[10px] font-mono px-1.5 sm:px-2 py-0.2 sm:py-0.5 rounded-full bg-teal-500 text-slate-950 font-bold animate-pulse shrink-0">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-mono mt-0.5 sm:mt-1 leading-relaxed break-words">
                    {step.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Completion Status Banner */}
        {isCompleted && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-emerald-50 dark:bg-emerald-500/15 border border-emerald-300 dark:border-emerald-500/40 text-emerald-800 dark:text-emerald-300 text-xs font-mono flex items-center justify-center gap-2 font-bold shadow-2xs text-center"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>Agent completed the task! Result: 18.33% YoY Growth.</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
