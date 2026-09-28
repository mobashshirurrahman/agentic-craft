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
  ShieldAlert,
  HelpCircle,
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
    color: "text-sky-400",
    badgeBg: "bg-sky-500/20 text-sky-300 border-sky-500/40",
    summary: "Ingest current environment state, interaction history, user inputs, and available tools.",
  },
  {
    id: "reason",
    name: "Reasoning",
    phaseNum: 2,
    icon: Brain,
    color: "text-purple-400",
    badgeBg: "bg-purple-500/20 text-purple-300 border-purple-500/40",
    summary: "Evaluate goal, analyze what is known vs. missing, formulate a strategy, and decide next action.",
  },
  {
    id: "act",
    name: "Action",
    phaseNum: 3,
    icon: Zap,
    color: "text-amber-400",
    badgeBg: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    summary: "Execute the chosen action: trigger a tool call, run sandboxed code, or update state.",
  },
  {
    id: "observe",
    name: "Observation",
    phaseNum: 4,
    icon: Activity,
    color: "text-emerald-400",
    badgeBg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    summary: "Examine tool outputs, HTTP status codes, error messages, and newly acquired data.",
  },
  {
    id: "iterate",
    name: "Iteration & Termination",
    phaseNum: 5,
    icon: RotateCw,
    color: "text-teal-400",
    badgeBg: "bg-teal-500/20 text-teal-300 border-teal-500/40",
    summary: "Evaluate completion criteria: Is goal satisfied? Need another loop cycle? Or terminate?",
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

// Scenario A: Multi-turn computation & report generation
const SCENARIO_A: SimulationStep[] = [
  // Cycle 1
  {
    cycle: 1,
    phaseId: "perceive",
    title: "Cycle 1 • Perceive Prompt & Environment",
    details: "User requests: 'Calculate 18% GST on a 140,000 INR order and generate receipt rec_401.pdf'.",
    payload: `[Perception Input]:
User Prompt: "Calculate 18% GST on 140,000 INR and generate receipt rec_401.pdf"
Available Tools: [calculate_tax, generate_pdf_receipt, send_email]
History: None (fresh session)`,
    stateBadge: "Cycle 1 / Step 1",
  },
  {
    cycle: 1,
    phaseId: "reason",
    title: "Cycle 1 • Reason Strategy & Missing Data",
    details: "Decompose into two requirements: (1) accurate tax math, (2) PDF generation. Must calculate tax first.",
    payload: `[Reasoning Engine]:
• Goal: Final receipt PDF with exact amounts.
• What I know: Base amount = 140,000 INR, Rate = 18%.
• What is missing: Exact calculated tax & grand total.
• Next Action: Call tool 'calculate_tax(amount=140000, rate=0.18)'.`,
    stateBadge: "Cycle 1 / Step 2",
  },
  {
    cycle: 1,
    phaseId: "act",
    title: "Cycle 1 • Act: Dispatch Tool Call",
    details: "Agent emits structured JSON tool call to runtime for deterministic calculation.",
    payload: `[Action Dispatched]:
Tool: calculate_tax
Arguments: {"amount": 140000, "rate": 0.18}`,
    stateBadge: "Cycle 1 / Step 3",
  },
  {
    cycle: 1,
    phaseId: "observe",
    title: "Cycle 1 • Observe: Ingest Calculation Result",
    details: "Runtime returns exact math: tax = 25,200 INR, total = 165,200 INR.",
    payload: `[Observation Ingested]:
{
  "status": "success",
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
    title: "Cycle 1 • Iterate: Goal Check",
    details: "Tax is calculated, but receipt PDF is NOT yet created. Loop MUST continue to Cycle 2!",
    payload: `[Iteration Evaluation]:
• Is total goal achieved? NO.
• PDF receipt still pending.
• Decision: CONTINUE LOOP -> Proceed to Cycle 2.`,
    stateBadge: "Cycle 1 / Step 5",
  },

  // Cycle 2
  {
    cycle: 2,
    phaseId: "perceive",
    title: "Cycle 2 • Perceive Updated State",
    details: "Perception now includes previous calculation observation in message memory.",
    payload: `[Perception Input]:
Current Memory: Base=140,000, Tax=25,200, Total=165,200 INR.
Pending Subtask: Generate PDF 'rec_401.pdf'.`,
    stateBadge: "Cycle 2 / Step 1",
  },
  {
    cycle: 2,
    phaseId: "reason",
    title: "Cycle 2 • Reason Next Action",
    details: "All parameters for PDF generator tool are now verified and ready in context.",
    payload: `[Reasoning Engine]:
• Now have all required data.
• Next Action: Call tool 'generate_pdf_receipt(order_id='rec_401', total=165200, tax=25200)'.`,
    stateBadge: "Cycle 2 / Step 2",
  },
  {
    cycle: 2,
    phaseId: "act",
    title: "Cycle 2 • Act: Dispatch PDF Generator",
    details: "Agent calls PDF generation service tool.",
    payload: `[Action Dispatched]:
Tool: generate_pdf_receipt
Arguments: {
  "order_id": "rec_401",
  "base_amount": 140000,
  "tax_amount": 25200,
  "total_amount": 165200
}`,
    stateBadge: "Cycle 2 / Step 3",
  },
  {
    cycle: 2,
    phaseId: "observe",
    title: "Cycle 2 • Observe: PDF File Created",
    details: "External service confirms document creation on storage bucket.",
    payload: `[Observation Ingested]:
{
  "status": "created",
  "file_url": "https://storage.acme.corp/receipts/rec_401.pdf",
  "bytes": 48291,
  "sha256": "8f3b...12c0"
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
    title: "Cycle 3 • Observe: Clean Data Result",
    details: "Query returns: total sales = $428,500.",
    payload: `[Observation Ingested]:
{
  "total_sales_usd": 428500,
  "transaction_count": 14,
  "status": "success"
}`,
    stateBadge: "Cycle 3 / Step 4",
  },
  {
    cycle: 3,
    phaseId: "iterate",
    title: "Cycle 3 • Iterate: Goal Complete -> Terminate",
    details: "Goal fulfilled through autonomous self-healing and error recovery!",
    payload: `[Iteration Evaluation]:
• Is goal achieved? YES ($428,500 retrieved).
• Decision: TERMINATE LOOP.
• Final Answer: "The total sales for Acme Corp across 14 transactions is $428,500."`,
    stateBadge: "Cycle 3 / Step 5 (Success)",
  },
];

export default function AgenticLoopFivePhaseVisualizer() {
  const [scenario, setScenario] = useState<"standard" | "error_recovery">("standard");
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const steps = scenario === "standard" ? SCENARIO_A : SCENARIO_B;
  const currentStep = steps[currentStepIndex];
  const activePhase = PHASES.find((p) => p.id === currentStep.phaseId)!;

  // Auto-play timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setTimeout(() => {
        if (currentStepIndex < steps.length - 1) {
          setCurrentStepIndex((prev) => prev + 1);
        } else {
          setIsPlaying(false);
        }
      }, 2600);
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
    <div className="rounded-2xl border border-slate-700/60 bg-slate-900/90 dark:bg-slate-900/90 light:bg-white light:border-slate-300 shadow-xl overflow-hidden my-8">
      {/* Header bar */}
      <div className="border-b border-slate-700/60 dark:border-slate-700/60 light:border-slate-200 px-5 py-4 bg-slate-800/50 dark:bg-slate-800/50 light:bg-slate-50 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-teal-400 animate-pulse" />
            <h3 className="font-bold text-base md:text-lg text-white dark:text-white light:text-slate-900">
              Interactive 5-Phase Agentic Loop Simulator
            </h3>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 mt-0.5">
            Perceive ➔ Reason ➔ Act ➔ Observe ➔ Iterate: See how autonomous intelligence cycles until completion.
          </p>
        </div>

        {/* Scenario Selector */}
        <div className="flex items-center bg-slate-900/80 dark:bg-slate-900/80 light:bg-slate-200 p-1 rounded-xl border border-slate-700/80 dark:border-slate-700/80 light:border-slate-300">
          <button
            onClick={() => handleScenarioChange("standard")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              scenario === "standard"
                ? "bg-teal-500 text-slate-950 font-bold shadow-sm"
                : "text-slate-400 dark:text-slate-400 light:text-slate-700 hover:text-white dark:hover:text-white"
            }`}
          >
            <span>Scenario A: Multi-Cycle Task</span>
          </button>
          <button
            onClick={() => handleScenarioChange("error_recovery")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              scenario === "error_recovery"
                ? "bg-teal-500 text-slate-950 font-bold shadow-sm"
                : "text-slate-400 dark:text-slate-400 light:text-slate-700 hover:text-white dark:hover:text-white"
            }`}
          >
            <span>Scenario B: Error Self-Healing</span>
          </button>
        </div>
      </div>

      {/* 5-Phase Circular/Linear Diagram Strip */}
      <div className="px-5 py-4 bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-100/70 border-b border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 overflow-x-auto">
        <div className="flex items-center min-w-[650px] justify-between gap-2">
          {PHASES.map((phase) => {
            const isActive = phase.id === currentStep.phaseId;
            const Icon = phase.icon;

            return (
              <div
                key={phase.id}
                className={`flex-1 p-3 rounded-xl border flex flex-col items-center transition-all ${
                  isActive
                    ? "border-teal-400 bg-teal-500/15 shadow-md scale-102"
                    : "border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-900/40 dark:bg-slate-900/40 light:bg-white opacity-60"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center mb-1.5 ${
                    isActive ? "bg-teal-400 text-slate-950 font-bold" : "bg-slate-800 text-slate-400"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-center">
                  <span className="text-[10px] font-mono uppercase tracking-wider block text-slate-400">
                    Phase {phase.phaseNum}
                  </span>
                  <span
                    className={`text-xs font-bold ${
                      isActive ? "text-teal-300 dark:text-teal-300 light:text-teal-700" : "text-slate-300 dark:text-slate-300 light:text-slate-700"
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
      <div className="p-5 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Phase Card & Loop Status */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-4">
          <div className="bg-slate-800/40 dark:bg-slate-800/40 light:bg-slate-50 border border-slate-700/50 dark:border-slate-700/50 light:border-slate-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400">
                Active Phase Focus
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-slate-900 dark:bg-slate-900 light:bg-slate-200 text-slate-300 dark:text-slate-300 light:text-slate-800 border border-slate-700 dark:border-slate-700 light:border-slate-300">
                {currentStep.stateBadge}
              </span>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400 flex-shrink-0">
                {React.createElement(activePhase.icon, { className: "w-5 h-5" })}
              </div>
              <div>
                <h4 className="font-bold text-base text-white dark:text-white light:text-slate-900">
                  Phase {activePhase.phaseNum}: {activePhase.name}
                </h4>
                <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600 mt-1 leading-relaxed">
                  {activePhase.summary}
                </p>
              </div>
            </div>

            {/* Loop progress metrics */}
            <div className="mt-4 pt-4 border-t border-slate-700/50 dark:border-slate-700/50 light:border-slate-200 grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2 rounded bg-slate-900/60 dark:bg-slate-900/60 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200">
                <span className="text-slate-400 block text-[10px]">Current Loop Cycle:</span>
                <span className="font-bold text-teal-400 text-sm">Cycle {currentStep.cycle}</span>
              </div>
              <div className="p-2 rounded bg-slate-900/60 dark:bg-slate-900/60 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200">
                <span className="text-slate-400 block text-[10px]">Total Steps Trace:</span>
                <span className="font-bold text-slate-200 dark:text-slate-200 light:text-slate-800 text-sm">
                  {currentStepIndex + 1} / {steps.length}
                </span>
              </div>
            </div>
          </div>

          {/* Teacher Insight Box */}
          <div className="bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 rounded-xl p-4 text-xs leading-relaxed text-slate-300 dark:text-slate-300 light:text-slate-700">
            <span className="font-bold text-teal-400 dark:text-teal-400 light:text-teal-600 block mb-1">
              💡 Teacher Note: What makes this an "Agent"?
            </span>
            A standard script executes step 1, step 2, step 3 and finishes blindly. An <strong>Agent</strong> runs an ongoing loop: after every Action, it pauses to <em>Observe the real outcome</em>. If something failed or was missing, the Reasoner pivots and tries a new strategy. That dynamic closed loop is the entire secret to autonomous systems!
          </div>
        </div>

        {/* Right Column: Step Inspector & Wire Output */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-4">
          <div className="bg-slate-950 dark:bg-slate-950 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 rounded-xl p-5 shadow-inner">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 dark:border-slate-800 light:border-slate-200">
              <h4 className="font-bold text-white dark:text-white light:text-slate-900 text-sm md:text-base">
                {currentStep.title}
              </h4>
              <span
                className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded ${
                  activePhase.badgeBg
                }`}
              >
                {activePhase.name}
              </span>
            </div>

            <p className="text-xs md:text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 mt-3 leading-relaxed">
              {currentStep.details}
            </p>

            {/* Terminal payload */}
            <div className="mt-4">
              <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900 dark:bg-slate-900 light:bg-slate-100 rounded-t-lg border-t border-x border-slate-800 dark:border-slate-800 light:border-slate-200 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-teal-400" />
                  <span>Agent State & Payload Stream</span>
                </div>
                <span>Step {currentStepIndex + 1} of {steps.length}</span>
              </div>
              <pre className="p-3.5 bg-slate-900/90 dark:bg-slate-900/90 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 rounded-b-lg font-mono text-xs text-teal-300 dark:text-teal-300 light:text-teal-800 whitespace-pre-wrap overflow-x-auto leading-relaxed max-h-56">
                {currentStep.payload}
              </pre>
            </div>
          </div>

          {/* Stepper Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
                  isPlaying
                    ? "bg-rose-500 hover:bg-rose-400 text-white"
                    : "bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold"
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
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border border-slate-700 dark:border-slate-700 light:border-slate-300 text-slate-300 dark:text-slate-300 light:text-slate-700 hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-slate-100 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentStepIndex((prev) => Math.max(prev - 1, 0))}
                disabled={currentStepIndex === 0}
                className="px-3 py-2 rounded-xl text-xs font-medium border border-slate-700 dark:border-slate-700 light:border-slate-300 text-slate-300 dark:text-slate-300 light:text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-slate-100"
              >
                Previous Step
              </button>
              <button
                onClick={() => setCurrentStepIndex((prev) => Math.min(prev + 1, steps.length - 1))}
                disabled={currentStepIndex === steps.length - 1}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 light:bg-slate-200 light:hover:bg-slate-300 text-white dark:text-white light:text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed"
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
