"use client";

import React, { useState, useEffect } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  ArrowRight,
  Eye,
  Brain,
  Zap,
  CheckCircle2,
  AlertTriangle,
  RotateCw,
  Cpu,
  Terminal,
  Activity,
} from "lucide-react";

interface LoopPhase {
  id: "perceive" | "reason" | "act" | "observe" | "iterate";
  name: string;
  phaseNum: number;
  icon: any;
  color: string;
  badgeBg: string;
  summary: string;
}

const PHASES: LoopPhase[] = [
  {
    id: "perceive",
    name: "Perception",
    phaseNum: 1,
    icon: Eye,
    color: "text-sky-700 dark:text-sky-400",
    badgeBg: "bg-sky-50 dark:bg-sky-500/20 text-sky-800 dark:text-sky-300 border-sky-200 dark:border-sky-500/40",
    summary: "Ingest current environment state, interaction history, user inputs, and available tools.",
  },
  {
    id: "reason",
    name: "Reasoning",
    phaseNum: 2,
    icon: Brain,
    color: "text-purple-700 dark:text-purple-400",
    badgeBg: "bg-purple-50 dark:bg-purple-500/20 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-500/40",
    summary: "Evaluate goal, analyze what is known vs. missing, formulate a strategy, and decide next action.",
  },
  {
    id: "act",
    name: "Action",
    phaseNum: 3,
    icon: Zap,
    color: "text-amber-700 dark:text-amber-400",
    badgeBg: "bg-amber-50 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-500/40",
    summary: "Execute the chosen action: trigger a tool call, run sandboxed code, or update state.",
  },
  {
    id: "observe",
    name: "Observation",
    phaseNum: 4,
    icon: Activity,
    color: "text-teal-700 dark:text-teal-400",
    badgeBg: "bg-teal-50 dark:bg-teal-500/20 text-teal-800 dark:text-teal-300 border-teal-200 dark:border-teal-500/40",
    summary: "Capture the raw tool response or environment feedback and append it into the conversation history.",
  },
  {
    id: "iterate",
    name: "Iterate / Stop",
    phaseNum: 5,
    icon: RotateCw,
    color: "text-emerald-700 dark:text-emerald-400",
    badgeBg: "bg-emerald-50 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/40",
    summary: "Evaluate if objective is satisfied. If yes, generate final response; if not, loop back to Phase 1.",
  },
];

interface SimulationStep {
  cycle: number;
  phaseId: "perceive" | "reason" | "act" | "observe" | "iterate";
  title: string;
  details: string;
  payload: string;
  stateBadge: string;
}

// Scenario A: Standard 2-Cycle Compound Task
const SCENARIO_A: SimulationStep[] = [
  // Cycle 1
  {
    cycle: 1,
    phaseId: "perceive",
    title: "Cycle 1 • Perceive: Ingest User Request",
    details: "Agent receives user goal: 'Calculate 18% GST tax on 140,000 INR and generate customer receipt PDF.'",
    payload: `[Perception Input]:
Prompt: "Calculate 18% GST on 140,000 INR and generate customer receipt PDF"
Available Tools: [calculate_gst, generate_pdf_invoice]
History: None (Initial Turn)`,
    stateBadge: "Cycle 1 / Step 1",
  },
  {
    cycle: 1,
    phaseId: "reason",
    title: "Cycle 1 • Reason: Determine Subtask 1",
    details: "Agent analyzes requirements: Cannot generate PDF before computing tax amount.",
    payload: `[Reasoning Engine]:
• Objective: Compute tax first, then pass total to PDF generator.
• Missing Info: exact 18% GST amount for 140,000 INR.
• Action Decision: Call calculate_gst(amount=140000, rate=18).`,
    stateBadge: "Cycle 1 / Step 2",
  },
  {
    cycle: 1,
    phaseId: "act",
    title: "Cycle 1 • Act: Emit Tool Call",
    details: "Agent emits structured tool call to calculate tax.",
    payload: `[Action Dispatched]:
Tool: calculate_gst
Arguments: {"base_amount": 140000, "rate_percent": 18}`,
    stateBadge: "Cycle 1 / Step 3",
  },
  {
    cycle: 1,
    phaseId: "observe",
    title: "Cycle 1 • Observe: Ingest Calculation Result",
    details: "Host runtime runs calculator tool and returns result.",
    payload: `[Observation Ingested]:
{
  "base_amount": 140000,
  "tax_amount": 25200,
  "total_amount": 165200,
  "currency": "INR"
}`,
    stateBadge: "Cycle 1 / Step 4",
  },
  {
    cycle: 1,
    phaseId: "iterate",
    title: "Cycle 1 • Iterate: Check Goal Completion",
    details: "Tax is calculated, but PDF is not generated yet! Loop decides to continue to Cycle 2.",
    payload: `[Iteration Evaluation]:
• Is total goal achieved? NO. (PDF invoice still pending).
• Decision: CONTINUE LOOP -> Re-enter Perception with updated context.`,
    stateBadge: "Cycle 1 / Step 5",
  },

  // Cycle 2
  {
    cycle: 2,
    phaseId: "perceive",
    title: "Cycle 2 • Perceive: Ingest Updated Memory",
    details: "Agent context now includes the tax calculation result from Cycle 1.",
    payload: `[Perception Input]:
Context Buffer: Tax calculated (Total: 165,200 INR).
Remaining Subtask: Generate PDF receipt.`,
    stateBadge: "Cycle 2 / Step 1",
  },
  {
    cycle: 2,
    phaseId: "reason",
    title: "Cycle 2 • Reason: Formulate PDF Generation",
    details: "Agent recognizes all parameters for PDF invoice are now available.",
    payload: `[Reasoning Engine]:
• Needed for PDF: base_amount (140,000), tax (25,200), total (165,200).
• Action Decision: Call generate_pdf_invoice(...) with computed values.`,
    stateBadge: "Cycle 2 / Step 2",
  },
  {
    cycle: 2,
    phaseId: "act",
    title: "Cycle 2 • Act: Dispatch PDF Generator Tool",
    details: "Agent executes the second tool.",
    payload: `[Action Dispatched]:
Tool: generate_pdf_invoice
Arguments: {"customer": "Client Corp", "total": 165200, "tax": 25200}`,
    stateBadge: "Cycle 2 / Step 3",
  },
  {
    cycle: 2,
    phaseId: "observe",
    title: "Cycle 2 • Observe: Ingest PDF Receipt URL",
    details: "PDF generator returns cloud storage link for receipt.",
    payload: `[Observation Ingested]:
{
  "status": "success",
  "receipt_id": "rec_401",
  "download_url": "https://s3.aws.com/receipts/rec_401.pdf"
}`,
    stateBadge: "Cycle 2 / Step 4",
  },
  {
    cycle: 2,
    phaseId: "iterate",
    title: "Cycle 2 • Iterate: Goal Complete -> Terminate",
    details: "All subtasks completed! Loop terminates and generates final answer to user.",
    payload: `[Iteration Evaluation]:
• Is total goal achieved? YES (Tax calculated + PDF generated).
• Decision: TERMINATE LOOP.
• Final Output: "Receipt rec_401.pdf generated successfully. Total: 165,200 INR (including 25,200 INR GST)."`,
    stateBadge: "Cycle 2 / Step 5 (Finished)",
  },
];

// Scenario B: Error Recovery & Self-Healing Loop
const SCENARIO_B: SimulationStep[] = [
  // Cycle 1: Failure
  {
    cycle: 1,
    phaseId: "perceive",
    title: "Cycle 1 • Perceive: User Query",
    details: "User asks: 'Find the total sales for customer Acme Corp in our database.'",
    payload: `[Perception Input]:
Prompt: "Find total sales for customer Acme Corp in database"
Available Tools: [execute_sql, inspect_schema]`,
    stateBadge: "Cycle 1 / Step 1",
  },
  {
    cycle: 1,
    phaseId: "reason",
    title: "Cycle 1 • Reason: Attempt Direct Query",
    details: "Agent hypothesizes column name is 'customer_id' and constructs SQL query.",
    payload: `[Reasoning Engine]:
• Hypothesis: table is 'orders', customer column is 'customer_id'.
• Next Action: execute_sql("SELECT SUM(amount) FROM orders WHERE customer_id = 'Acme Corp'")`,
    stateBadge: "Cycle 1 / Step 2",
  },
  {
    cycle: 1,
    phaseId: "act",
    title: "Cycle 1 • Act: Dispatch SQL Query",
    details: "Agent executes SQL tool against internal PostgreSQL database.",
    payload: `[Action Dispatched]:
Tool: execute_sql
SQL: SELECT SUM(amount) FROM orders WHERE customer_id = 'Acme Corp';`,
    stateBadge: "Cycle 1 / Step 3",
  },
  {
    cycle: 1,
    phaseId: "observe",
    title: "Cycle 1 • Observe: Database Error Returned",
    details: "CRITICAL: The database returns a ColumnNotFoundError.",
    payload: `[Observation Ingested]:
{
  "error": "ColumnNotFoundError",
  "detail": "column 'customer_id' does not exist in relation 'orders'"
}`,
    stateBadge: "Cycle 1 / Step 4 (Error Caught)",
  },
  {
    cycle: 1,
    phaseId: "iterate",
    title: "Cycle 1 • Iterate: Detect Failure -> Self-Heal",
    details: "Goal NOT satisfied, but agent doesn't crash! It decides to inspect schema in Cycle 2.",
    payload: `[Iteration Evaluation]:
• Is goal achieved? NO (Execution error).
• Can we fix it? YES, inspect table schema to find true column name.
• Decision: CONTINUE LOOP with recovery strategy.`,
    stateBadge: "Cycle 1 / Step 5",
  },

  // Cycle 2: Schema Inspection
  {
    cycle: 2,
    phaseId: "perceive",
    title: "Cycle 2 • Perceive: Previous Error Context",
    details: "Agent now has the error message in its context window.",
    payload: `[Perception Input]:
Previous Action Failed: Column 'customer_id' does not exist.
Goal: Discover schema of 'orders' table.`,
    stateBadge: "Cycle 2 / Step 1",
  },
  {
    cycle: 2,
    phaseId: "reason",
    title: "Cycle 2 • Reason: Inspect Schema Tool",
    details: "Agent pivots to 'inspect_schema' tool to look up real column names.",
    payload: `[Reasoning Engine]:
• Pivot: Instead of guessing column names, call inspect_schema('orders').`,
    stateBadge: "Cycle 2 / Step 2",
  },
  {
    cycle: 2,
    phaseId: "act",
    title: "Cycle 2 • Act: Execute Schema Inspector",
    details: "Agent dispatches schema lookup tool.",
    payload: `[Action Dispatched]:
Tool: inspect_schema
Arguments: {"table_name": "orders"}`,
    stateBadge: "Cycle 2 / Step 3",
  },
  {
    cycle: 2,
    phaseId: "observe",
    title: "Cycle 2 • Observe: Discovered Real Columns",
    details: "Schema returned: Real column name is 'client_name', not 'customer_id'!",
    payload: `[Observation Ingested]:
Columns: ['id', 'client_name', 'amount', 'created_at']
Key Finding: Column is 'client_name'!`,
    stateBadge: "Cycle 2 / Step 4",
  },
  {
    cycle: 2,
    phaseId: "iterate",
    title: "Cycle 2 • Iterate: Ready to Re-query",
    details: "We have the missing information. Loop proceeds to Cycle 3 with corrected SQL.",
    payload: `[Iteration Evaluation]:
• Schema verified. Ready to rerun query.
• Decision: CONTINUE LOOP to Cycle 3.`,
    stateBadge: "Cycle 2 / Step 5",
  },

  // Cycle 3: Success
  {
    cycle: 3,
    phaseId: "perceive",
    title: "Cycle 3 • Perceive: Corrected Schema",
    details: "Agent perceives verified schema with 'client_name'.",
    payload: `[Perception Input]:
Schema confirmed: 'client_name' is the correct column.`,
    stateBadge: "Cycle 3 / Step 1",
  },
  {
    cycle: 3,
    phaseId: "reason",
    title: "Cycle 3 • Reason: Formulate Correct Query",
    details: "Formulate SQL using the verified 'client_name' column.",
    payload: `[Reasoning Engine]:
• Construct: SELECT SUM(amount) FROM orders WHERE client_name = 'Acme Corp';`,
    stateBadge: "Cycle 3 / Step 2",
  },
  {
    cycle: 3,
    phaseId: "act",
    title: "Cycle 3 • Act: Execute Corrected SQL",
    details: "Agent executes valid SQL query.",
    payload: `[Action Dispatched]:
Tool: execute_sql
SQL: SELECT SUM(amount) FROM orders WHERE client_name = 'Acme Corp';`,
    stateBadge: "Cycle 3 / Step 3",
  },
  {
    cycle: 3,
    phaseId: "observe",
    title: "Cycle 3 • Observe: Sales Data Returned",
    details: "Database query succeeds! Returns total sales volume.",
    payload: `[Observation Ingested]:
{"sum": 284500.00}`,
    stateBadge: "Cycle 3 / Step 4",
  },
  {
    cycle: 3,
    phaseId: "iterate",
    title: "Cycle 3 • Iterate: Goal Satisfied -> Terminate",
    details: "Goal achieved via autonomous error recovery!",
    payload: `[Iteration Evaluation]:
• Is goal achieved? YES! Total sales retrieved.
• Decision: TERMINATE LOOP.
• Final Answer: "Total sales for Acme Corp are $284,500.00."`,
    stateBadge: "Cycle 3 / Step 5 (Resolved)",
  },
];

export default function AgenticLoopFivePhaseVisualizer() {
  const [scenario, setScenario] = useState<"standard" | "error_recovery">("standard");
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const steps = scenario === "standard" ? SCENARIO_A : SCENARIO_B;
  const currentStep = steps[currentStepIndex] || steps[0];
  const activePhase = PHASES.find((p) => p.id === currentStep.phaseId) || PHASES[0];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      if (currentStepIndex < steps.length - 1) {
        timer = setTimeout(() => {
          setCurrentStepIndex((prev) => prev + 1);
        }, 1900);
      } else {
        setIsPlaying(false);
      }
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStepIndex, steps.length]);

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  const handleScenarioChange = (newScenario: "standard" | "error_recovery") => {
    setScenario(newScenario);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm dark:shadow-2xl overflow-hidden space-y-0">
      {/* Header bar */}
      <div className="border-b border-slate-100 dark:border-slate-800 p-4 sm:p-5 bg-slate-50 dark:bg-slate-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-teal-500 animate-pulse" />
            <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
              Interactive 5-Phase Agentic Loop Simulator
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Perceive ➔ Reason ➔ Act ➔ Observe ➔ Iterate: See how autonomous intelligence cycles until completion
          </p>
        </div>

        {/* Scenario Selector */}
        <div className="flex items-center bg-white dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono self-start sm:self-center shadow-sm">
          <button
            onClick={() => handleScenarioChange("standard")}
            className={`px-3 py-1.5 rounded-lg transition-all touch-manipulation active:scale-95 ${
              scenario === "standard"
                ? "bg-teal-600 text-white font-bold shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <span>Scenario A: Multi-Cycle Task</span>
          </button>
          <button
            onClick={() => handleScenarioChange("error_recovery")}
            className={`px-3 py-1.5 rounded-lg transition-all touch-manipulation active:scale-95 ${
              scenario === "error_recovery"
                ? "bg-teal-600 text-white font-bold shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <span>Scenario B: Error Self-Healing</span>
          </button>
        </div>
      </div>

      {/* 5-Phase Linear Diagram Strip */}
      <div className="p-3 sm:p-4 bg-slate-50/60 dark:bg-slate-900/40 border-b border-slate-100 dark:border-slate-800 overflow-x-auto">
        <div className="flex items-center min-w-[550px] justify-between gap-2">
          {PHASES.map((phase) => {
            const isActive = phase.id === currentStep.phaseId;
            const Icon = phase.icon;

            return (
              <div
                key={phase.id}
                className={`flex-1 p-2.5 rounded-xl border flex flex-col items-center transition-all ${
                  isActive
                    ? "border-teal-500 bg-teal-50 dark:bg-teal-500/15 shadow-sm scale-[1.02] ring-1 ring-teal-500/30"
                    : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 opacity-60"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center mb-1 ${
                    isActive ? "bg-teal-600 text-white font-bold" : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="text-center">
                  <span className="text-[9px] font-mono uppercase tracking-wider block text-slate-400">
                    Phase {phase.phaseNum}
                  </span>
                  <span
                    className={`text-xs font-bold ${
                      isActive ? "text-teal-900 dark:text-teal-300" : "text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    {phase.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Simulation Stage */}
      <div className="p-4 sm:p-5 grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Phase Card & Loop Status */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-4">
          <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400">
                Active Phase Focus
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 shadow-sm">
                {currentStep.stateBadge}
              </span>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-500/20 text-teal-700 dark:text-teal-400 flex items-center justify-center shrink-0">
                {React.createElement(activePhase.icon, { className: "w-5 h-5" })}
              </div>
              <div>
                <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                  Phase {activePhase.phaseNum}: {activePhase.name}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  {activePhase.summary}
                </p>
              </div>
            </div>

            {/* Loop progress metrics */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2 rounded bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm">
                <span className="text-slate-400 block text-[10px]">Current Loop Cycle:</span>
                <span className="font-bold text-teal-700 dark:text-teal-400 text-sm">Cycle {currentStep.cycle}</span>
              </div>
              <div className="p-2 rounded bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm">
                <span className="text-slate-400 block text-[10px]">Total Steps Trace:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                  {currentStepIndex + 1} / {steps.length}
                </span>
              </div>
            </div>
          </div>

          {/* Teacher Insight Box */}
          <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 text-xs leading-relaxed text-slate-600 dark:text-slate-300 shadow-sm">
            <span className="font-bold text-teal-700 dark:text-teal-400 font-mono text-[11px] block mb-1">
              💡 What Makes this an &quot;Agent&quot;?
            </span>
            A standard script executes step 1, 2, 3 blindly. An <strong>Agent</strong> runs an ongoing closed loop: after every Action, it pauses to <em>Observe the real outcome</em>. If something failed, the Reasoner pivots and tries a new strategy.
          </div>
        </div>

        {/* Right Column: Step Inspector & Wire Output */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-4">
          <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                {currentStep.title}
              </h4>
              <span
                className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded border ${
                  activePhase.badgeBg
                }`}
              >
                {activePhase.name}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {currentStep.details}
            </p>

            {/* Terminal payload */}
            <div>
              <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900 rounded-t-lg border-t border-x border-slate-800 text-[11px] font-mono text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-teal-400" />
                  <span>Agent State &amp; Payload Stream</span>
                </div>
                <span>Step {currentStepIndex + 1} of {steps.length}</span>
              </div>
              <pre className="p-3.5 bg-slate-950 border border-slate-800 rounded-b-lg font-mono text-xs text-teal-300 whitespace-pre-wrap overflow-x-auto leading-relaxed max-h-56">
                {currentStep.payload}
              </pre>
            </div>
          </div>

          {/* Stepper Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm touch-manipulation active:scale-95 ${
                  isPlaying
                    ? "bg-rose-600 hover:bg-rose-500 text-white"
                    : "bg-teal-600 hover:bg-teal-500 text-white shadow-teal-500/20"
                }`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    <span>Pause Loop</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    <span>Auto-Play Loop</span>
                  </>
                )}
              </button>

              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 transition touch-manipulation active:scale-95"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentStepIndex((prev) => Math.max(prev - 1, 0))}
                disabled={currentStepIndex === 0}
                className="px-3 py-2 rounded-xl text-xs font-medium border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-900 transition touch-manipulation active:scale-95"
              >
                Previous Step
              </button>
              <button
                onClick={() => setCurrentStepIndex((prev) => Math.min(prev + 1, steps.length - 1))}
                disabled={currentStepIndex === steps.length - 1}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white disabled:opacity-40 disabled:cursor-not-allowed transition touch-manipulation active:scale-95 shadow-sm"
              >
                <span>Next Step</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
