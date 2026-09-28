"use client";
import React, { useState } from "react";
import confetti from "canvas-confetti";
import {
  Compass,
  Cpu,
  Layers,
  Sparkles,
  CheckCircle2,
  Play,
  RotateCcw,
  Award,
  ArrowRight,
  ShieldCheck,
  Code2,
  Terminal,
  FileCode,
  Users,
} from "lucide-react";

interface SubAgent {
  id: string;
  role: string;
  name: string;
  tools: string[];
  status: "WAITING" | "ACTIVE" | "COMPLETED";
  summary: string;
}

const INITIAL_SUB_AGENTS: SubAgent[] = [
  {
    id: "archaeologist",
    role: "Codebase Archaeologist",
    name: "Repo Explorer",
    tools: ["ripgrep", "ast_parser", "env_inspector"],
    status: "WAITING",
    summary: "Maps existing session cookies, auth middleware, and environment config.",
  },
  {
    id: "architect",
    role: "Security Architect",
    name: "OAuth2 Designer",
    tools: ["pkce_generator", "jwt_spec_validator", "crypto_tool"],
    status: "WAITING",
    summary: "Designs stateful PKCE flow, token rotation schema, and refresh lifetimes.",
  },
  {
    id: "coder",
    role: "Code Synthesizer",
    name: "Full-Stack Implementer",
    tools: ["file_edit", "typescript_compiler", "route_handler"],
    status: "WAITING",
    summary: "Writes auth callback route, token refresh helper, and middleware hooks.",
  },
  {
    id: "tester",
    role: "QA & Security Auditor",
    name: "Test Runner",
    tools: ["jest_runner", "csrf_scanner", "playwright_e2e"],
    status: "WAITING",
    summary: "Runs 12 unit tests and verifies CSRF and token expiration safety.",
  },
];

export default function DeepAgentStudio() {
  const [subAgents, setSubAgents] = useState<SubAgent[]>(INITIAL_SUB_AGENTS);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [showCertificate, setShowCertificate] = useState<boolean>(false);

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setCurrentStep(1);

    // Step 1: Archaeologist
    setSubAgents((prev) =>
      prev.map((a, i) => (i === 0 ? { ...a, status: "ACTIVE" } : { ...a, status: "WAITING" }))
    );

    setTimeout(() => {
      // Step 2: Architect
      setCurrentStep(2);
      setSubAgents((prev) =>
        prev.map((a, i) =>
          i === 0 ? { ...a, status: "COMPLETED" } : i === 1 ? { ...a, status: "ACTIVE" } : a
        )
      );

      setTimeout(() => {
        // Step 3: Coder
        setCurrentStep(3);
        setSubAgents((prev) =>
          prev.map((a, i) =>
            i <= 1 ? { ...a, status: "COMPLETED" } : i === 2 ? { ...a, status: "ACTIVE" } : a
          )
        );

        setTimeout(() => {
          // Step 4: Tester
          setCurrentStep(4);
          setSubAgents((prev) =>
            prev.map((a, i) =>
              i <= 2 ? { ...a, status: "COMPLETED" } : i === 3 ? { ...a, status: "ACTIVE" } : a
            )
          );

          setTimeout(() => {
            // All complete
            setCurrentStep(5);
            setIsSimulating(false);
            setSubAgents((prev) => prev.map((a) => ({ ...a, status: "COMPLETED" })));
            confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
          }, 900);
        }, 900);
      }, 900);
    }, 900);
  };

  const handleReset = () => {
    setIsSimulating(false);
    setCurrentStep(0);
    setSubAgents(INITIAL_SUB_AGENTS);
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-4 md:p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
            Autonomous Multi-Agent Architecture
          </span>
          <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white">
            Deep Agent Orchestrator Studio (Claude Code / LangGraph Pattern)
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-mono transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>
      </div>

      <div className="p-5 md:p-6 space-y-6">
        {/* Epic Task Banner */}
        <div className="p-4 rounded-xl border border-indigo-200 dark:border-indigo-900/50 bg-gradient-to-r from-indigo-50/40 via-teal-50/30 to-white dark:from-indigo-950/30 dark:to-slate-900 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" /> High-Level Epic Goal
            </span>
            <h4 className="text-sm md:text-base font-bold text-slate-900 dark:text-white">
              &ldquo;Implement GitHub OAuth2 & JWT Token Rotation in Next.js App&rdquo;
            </h4>
            <p className="text-xs text-slate-500">
              Supervisor isolates sub-agent context to avoid 200K token context window exhaustion.
            </p>
          </div>

          <button
            onClick={handleRunSimulation}
            disabled={isSimulating || currentStep === 5}
            className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-semibold text-xs tracking-wider uppercase flex items-center gap-2 transition shadow-sm"
          >
            <Play className="w-3.5 h-3.5" />
            {isSimulating ? "Executing Deep Agent..." : currentStep === 5 ? "Epic Completed!" : "Execute Deep Agent Workflow"}
          </button>
        </div>

        {/* Supervisor Orchestrator Flow */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-teal-500" />
              Supervisor & Specialized Worker Fleet
            </span>
            <span className="text-xs font-mono text-slate-400">
              Step {currentStep} of 4
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {subAgents.map((agent, index) => {
              const isActive = agent.status === "ACTIVE";
              const isDone = agent.status === "COMPLETED";

              return (
                <div
                  key={agent.id}
                  className={`p-4 rounded-xl border text-xs transition space-y-2.5 flex flex-col justify-between ${
                    isActive
                      ? "border-teal-500 bg-teal-50/40 dark:bg-teal-950/40 ring-2 ring-teal-500/20"
                      : isDone
                      ? "border-emerald-300 dark:border-emerald-900/60 bg-emerald-50/20 dark:bg-emerald-950/20"
                      : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        Agent #{index + 1}
                      </span>
                      <span
                        className={`text-[10px] font-mono font-bold uppercase ${
                          isActive
                            ? "text-teal-600 dark:text-teal-300 animate-pulse"
                            : isDone
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-slate-400"
                        }`}
                      >
                        {agent.status}
                      </span>
                    </div>

                    <h5 className="font-bold text-slate-900 dark:text-white text-xs">
                      {agent.role}
                    </h5>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      {agent.summary}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1">
                    <span className="text-[10px] font-mono text-slate-400 block">Isolated Toolset:</span>
                    <div className="flex flex-wrap gap-1">
                      {agent.tools.map((t) => (
                        <span
                          key={t}
                          className="px-1.5 py-0.5 rounded font-mono text-[10px] bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Synthesis & Acceptance Verification */}
        {currentStep === 5 && (
          <div className="p-4 rounded-xl border border-emerald-300 dark:border-emerald-800/60 bg-emerald-50/40 dark:bg-emerald-950/20 flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Supervisor Synthesis Complete: All 4 Sub-Tasks Verified!
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                12 Unit Tests Passed. Zero CSRF vulnerabilities detected. PR #104 ready for merge.
              </p>
            </div>

            <button
              onClick={() => {
                setShowCertificate(true);
                confetti({ particleCount: 120, spread: 90, origin: { y: 0.5 } });
              }}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-semibold text-xs tracking-wider uppercase flex items-center gap-1.5 shadow-sm transition"
            >
              <Award className="w-4 h-4" />
              View Course Graduation Certificate
            </button>
          </div>
        )}
      </div>

      {/* Graduation Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-teal-500/40 rounded-3xl max-w-xl w-full p-8 shadow-2xl relative text-center space-y-6">
            <div className="inline-block p-3 rounded-full bg-teal-500/20 text-teal-500 border border-teal-500/30">
              <Award className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-teal-600 dark:text-teal-400">
                Official Certificate of Mastery
              </span>
              <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
                Master of Agentic AI Engineering
              </h3>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-md mx-auto">
                Successfully mastered all 4 Levels (59 Modules) of the Agentic AI Curriculum: Core Foundations, Tool Calling & Multi-Agent Teams, Advanced Patterns & Vector Memory, and Enterprise Production Scaling & Optimization!
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-2 text-center text-xs font-mono">
              <div>
                <span className="text-[10px] text-slate-400 block">Level 1</span>
                <span className="font-bold text-teal-600 dark:text-teal-400">Foundations</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Level 2</span>
                <span className="font-bold text-teal-600 dark:text-teal-400">Frameworks</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Level 3</span>
                <span className="font-bold text-teal-600 dark:text-teal-400">Vector Mem</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Level 4</span>
                <span className="font-bold text-teal-600 dark:text-teal-400">Scaling</span>
              </div>
            </div>

            <button
              onClick={() => setShowCertificate(false)}
              className="w-full py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-xs tracking-wider uppercase transition shadow"
            >
              Continue Exploring Course
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
