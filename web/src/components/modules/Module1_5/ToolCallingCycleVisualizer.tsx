"use client";

import React, { useState, useEffect } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  Cpu,
  User,
  Wrench,
  Database,
  Send,
  Eye,
  Edit3,
} from "lucide-react";

interface StepDetail {
  step: number;
  title: string;
  actor: "User" | "Agent" | "Runtime" | "Tool";
  icon: string;
  description: string;
  payload: string;
  badge: string;
}

const READ_STEPS: StepDetail[] = [
  {
    step: 1,
    title: "User Provides Input",
    actor: "User",
    icon: "user",
    description: "The user issues a prompt requiring external or real-time information.",
    payload: `User: "What is the current weather in Tokyo and convert 18°C to Fahrenheit?"`,
    badge: "Input Stage",
  },
  {
    step: 2,
    title: "Agent Analyzes Task",
    actor: "Agent",
    icon: "brain",
    description: "The LLM reasoning engine parses the prompt, recognizing it lacks live weather data and needs accurate conversion.",
    payload: `Internal Thought:
• Need live meteorological data for 'Tokyo' (training data is frozen).
• Need deterministic temperature conversion formula: (18 * 9/5) + 32.`,
    badge: "Intent Analysis",
  },
  {
    step: 3,
    title: "Agent Decides Tool is Needed",
    actor: "Agent",
    icon: "brain",
    description: "The agent evaluates its registered tool catalog and selects the 'get_current_weather' tool.",
    payload: `Tool Selection:
• Candidate: get_current_weather(city: str) -> Matches goal!
• Category: Information Retrieval (Read Action)`,
    badge: "Tool Decision",
  },
  {
    step: 4,
    title: "Agent Generates Structured Tool Call",
    actor: "Agent",
    icon: "brain",
    description: "The agent outputs a valid JSON tool call conforming to the registered function schema.",
    payload: `{
  "tool_call_id": "call_tokyo_weather_01",
  "function": {
    "name": "get_current_weather",
    "arguments": {
      "city": "Tokyo",
      "units": "celsius"
    }
  }
}`,
    badge: "JSON Schema Output",
  },
  {
    step: 5,
    title: "System Executes Tool",
    actor: "Runtime",
    icon: "runtime",
    description: "The host runtime catches the tool call, verifies parameters against Pydantic schema, and triggers the weather API.",
    payload: `[Host Runtime]: Intercepted call_tokyo_weather_01
Validating input: city='Tokyo' (type: str) -> PASS
Executing HTTP GET https://api.weather.com/v1/current?city=Tokyo...
HTTP 200 OK (Execution Time: 142ms)`,
    badge: "Safe Read Execution",
  },
  {
    step: 6,
    title: "Tool Returns Result",
    actor: "Tool",
    icon: "tool",
    description: "The external service returns the raw data payload back to the agent runtime.",
    payload: `{
  "city": "Tokyo",
  "temperature_c": 18,
  "condition": "Clear Sky",
  "humidity": 45,
  "wind_kmh": 12
}`,
    badge: "Raw Observation",
  },
  {
    step: 7,
    title: "Agent Processes Result",
    actor: "Agent",
    icon: "brain",
    description: "The agent consumes the observation in its context window and executes the deterministic math conversion.",
    payload: `Observation Ingested: Tokyo is 18°C and Clear Sky.
Math Computation: (18 * 9/5) + 32 = 64.4°F.
Goal Check: Both requirements fulfilled. Ready for final synthesis.`,
    badge: "Observation Processing",
  },
  {
    step: 8,
    title: "Agent Continues or Responds",
    actor: "Agent",
    icon: "brain",
    description: "The agent constructs the polite, complete response synthesizing external real-time data with computation.",
    payload: `Agent Response:
"The current weather in Tokyo is 18°C (64.4°F) with clear skies and 45% humidity. Have a wonderful day!"`,
    badge: "Final Answer Synthesized",
  },
];

const WRITE_STEPS: StepDetail[] = [
  {
    step: 1,
    title: "User Provides Input",
    actor: "User",
    icon: "user",
    description: "The user issues a prompt requesting a real-world state change (mutating an external database or sending messages).",
    payload: `User: "Draft and send an apology email to client Acme Corp regarding ticket #4092, offering a 10% credit."`,
    badge: "State Change Request",
  },
  {
    step: 2,
    title: "Agent Analyzes Task",
    actor: "Agent",
    icon: "brain",
    description: "The LLM identifies that sending an email alters external communications and financial credit modifies accounting.",
    payload: `Internal Thought:
• Request involves sending external email + financial credit mutation.
• Classified as: MUTATING / WRITE ACTION.
• Requires Human-in-the-Loop review before dispatching.`,
    badge: "Risk Classification",
  },
  {
    step: 3,
    title: "Agent Decides Tool is Needed",
    actor: "Agent",
    icon: "brain",
    description: "The agent selects 'send_customer_email' from its tool catalog.",
    payload: `Tool Selection:
• Candidate: send_customer_email(recipient, subject, body, credit_amount)
• Sensitivity Level: HIGH (Requires Approval Gate)`,
    badge: "Tool Decision",
  },
  {
    step: 4,
    title: "Agent Generates Structured Tool Call",
    actor: "Agent",
    icon: "brain",
    description: "The agent outputs strict JSON parameters matching the enterprise email tool schema.",
    payload: `{
  "tool_call_id": "call_email_dispatch_99",
  "function": {
    "name": "send_customer_email",
    "arguments": {
      "recipient": "support@acmecorp.com",
      "ticket_id": 4092,
      "credit_percentage": 10,
      "subject": "Apology Regarding Ticket #4092 & Account Credit"
    }
  }
}`,
    badge: "JSON Schema Output",
  },
  {
    step: 5,
    title: "HITL Approval Gate (Write Action)",
    actor: "Runtime",
    icon: "runtime",
    description: "The host runtime halts execution! Because this is a mutating write action, a human must approve before email fires.",
    payload: `[POLICY INTERCEPT]: Action 'send_customer_email' flagged as WRITE OPERATION.
Credit Impact: 10% on Ticket #4092.
Execution Status: PAUSED -> Awaiting Human Approval in Dashboard...`,
    badge: "Human-in-the-Loop Gate",
  },
  {
    step: 6,
    title: "Tool Executes Post-Approval",
    actor: "Tool",
    icon: "tool",
    description: "Upon human sign-off, runtime dispatches the authenticated SMTP/SendGrid webhook.",
    payload: `[Host Runtime]: Human supervisor clicked [CONFIRM & EXECUTE].
Calling SendGrid API: POST /v3/mail/send
Response: 202 Accepted (Message ID: msg_acme_4092_ok)`,
    badge: "Authorized Write",
  },
  {
    step: 7,
    title: "Agent Processes Result",
    actor: "Agent",
    icon: "brain",
    description: "Agent receives confirmation that the email and credit memo were successfully recorded in external CRM.",
    payload: `Observation Ingested: SendGrid accepted payload.
CRM updated: Ticket #4092 marked as 'Resolved with 10% credit'.`,
    badge: "State Verification",
  },
  {
    step: 8,
    title: "Agent Responds to User",
    actor: "Agent",
    icon: "brain",
    description: "Agent notifies user that email was authorized, delivered, and logged in customer record.",
    payload: `Agent Response:
"Apology email with 10% credit successfully sent to Acme Corp (Ticket #4092) following supervisor authorization."`,
    badge: "Task Resolved",
  },
];

export default function ToolCallingCycleVisualizer() {
  const [mode, setMode] = useState<"read" | "write">("read");
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [humanApproved, setHumanApproved] = useState<boolean>(false);

  const steps = mode === "read" ? READ_STEPS : WRITE_STEPS;
  const activeStepData = steps[currentStep - 1] || steps[0];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      if (mode === "write" && currentStep === 5 && !humanApproved) {
        setIsPlaying(false);
        return;
      }

      if (currentStep < 8) {
        timer = setTimeout(() => {
          setCurrentStep((prev) => prev + 1);
        }, 1800);
      } else {
        setIsPlaying(false);
      }
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, mode, humanApproved]);

  const handleModeChange = (newMode: "read" | "write") => {
    setMode(newMode);
    setCurrentStep(1);
    setIsPlaying(false);
    setHumanApproved(false);
  };

  const handleReset = () => {
    setCurrentStep(1);
    setIsPlaying(false);
    setHumanApproved(false);
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-4 sm:p-6 shadow-sm dark:shadow-2xl space-y-6">
      {/* Top Header & Mode Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400 px-2.5 py-0.5 rounded-full bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30">
              Interactive 8-Step Tool Cycle
            </span>
            <span className="text-[11px] font-mono text-slate-500">Live Simulator</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-1">
            The Complete Tool Execution Loop
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Compare safe idempotent Read actions with mutating Write actions requiring approval
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono self-start sm:self-center">
          <button
            onClick={() => handleModeChange("read")}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 touch-manipulation active:scale-95 ${
              mode === "read"
                ? "bg-teal-600 text-white font-bold shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            Read Action (Safe)
          </button>
          <button
            onClick={() => handleModeChange("write")}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 touch-manipulation active:scale-95 ${
              mode === "write"
                ? "bg-amber-600 text-white font-bold shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            Write Action (HITL)
          </button>
        </div>
      </div>

      {/* Progress Dots Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono text-slate-600 dark:text-slate-400">
          <span>Step {currentStep} of 8: {activeStepData.title}</span>
          <span className="font-bold text-teal-700 dark:text-teal-400">{activeStepData.badge}</span>
        </div>
        <div className="grid grid-cols-8 gap-1.5 sm:gap-2">
          {steps.map((s) => (
            <button
              key={s.step}
              onClick={() => {
                setCurrentStep(s.step);
                setIsPlaying(false);
              }}
              className={`h-2 sm:h-2.5 rounded-full transition-all touch-manipulation ${
                s.step === currentStep
                  ? "bg-teal-600 dark:bg-teal-400 ring-2 ring-teal-500/30"
                  : s.step < currentStep
                  ? "bg-emerald-500 dark:bg-emerald-400"
                  : "bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700"
              }`}
              title={`Jump to step ${s.step}: ${s.title}`}
            />
          ))}
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Actor Cards & Flow */}
        <div className="lg:col-span-5 space-y-3">
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 space-y-2.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold block">
              Architectural Entities Involved
            </span>

            {/* User */}
            <div
              className={`p-3 rounded-xl border transition-all flex items-center justify-between ${
                activeStepData.actor === "User"
                  ? "border-sky-500 bg-sky-50 dark:bg-sky-500/15 text-sky-950 dark:text-sky-200 shadow-sm"
                  : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-sky-100 dark:bg-sky-500/20 text-sky-700 dark:text-sky-400 flex items-center justify-center font-bold">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Human User</h4>
                  <p className="text-[10px] text-slate-500">Provides natural language intent</p>
                </div>
              </div>
              {activeStepData.actor === "User" && (
                <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-sky-100 dark:bg-sky-500/20 text-sky-800 dark:text-sky-300 font-bold animate-pulse">
                  ACTIVE
                </span>
              )}
            </div>

            {/* Agent LLM Brain */}
            <div
              className={`p-3 rounded-xl border transition-all flex items-center justify-between ${
                activeStepData.actor === "Agent"
                  ? "border-teal-500 bg-teal-50 dark:bg-teal-500/15 text-teal-950 dark:text-teal-200 shadow-sm"
                  : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-teal-100 dark:bg-teal-500/20 text-teal-700 dark:text-teal-400 flex items-center justify-center font-bold">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Agent (LLM Engine)</h4>
                  <p className="text-[10px] text-slate-500">Generates JSON schema tool call</p>
                </div>
              </div>
              {activeStepData.actor === "Agent" && (
                <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-teal-100 dark:bg-teal-500/20 text-teal-800 dark:text-teal-300 font-bold animate-pulse">
                  ACTIVE
                </span>
              )}
            </div>

            {/* Host Runtime & Tool */}
            <div
              className={`p-3 rounded-xl border transition-all flex items-center justify-between ${
                activeStepData.actor === "Runtime" || activeStepData.actor === "Tool"
                  ? mode === "write" && activeStepData.step === 5
                    ? "border-amber-500 bg-amber-50 dark:bg-amber-500/20 text-amber-950 dark:text-amber-200 shadow-sm"
                    : "border-purple-500 bg-purple-50 dark:bg-purple-500/15 text-purple-950 dark:text-purple-200 shadow-sm"
                  : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-400 flex items-center justify-center font-bold">
                  <Wrench className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Host Runtime &amp; Tool</h4>
                  <p className="text-[10px] text-slate-500">Executes actual API / Python function</p>
                </div>
              </div>
              {(activeStepData.actor === "Runtime" || activeStepData.actor === "Tool") && (
                <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-purple-100 dark:bg-purple-500/20 text-purple-800 dark:text-purple-300 font-bold animate-pulse">
                  ACTIVE
                </span>
              )}
            </div>
          </div>

          {/* Teacher Commentary Note */}
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 text-xs leading-relaxed text-slate-600 dark:text-slate-300 shadow-sm">
            <span className="font-bold text-teal-700 dark:text-teal-400 font-mono text-[11px] block mb-1">
              💡 Golden Principle: The LLM Does Not Run Tools!
            </span>
            The model never executes code itself. It emits a structured JSON string. The surrounding host runtime validates it, calls the Python/Node function, and injects the output back into the conversation history.
          </div>
        </div>

        {/* Right Column: Step Inspector & Live Payload */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-4">
          <div className="p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  Step {activeStepData.step}
                </span>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                  {activeStepData.title}
                </h4>
              </div>
              <span
                className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded ${
                  mode === "read"
                    ? "bg-teal-50 dark:bg-teal-500/20 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-500/30"
                    : "bg-amber-50 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30"
                }`}
              >
                {activeStepData.badge}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {activeStepData.description}
            </p>

            {/* Payload Terminal Display */}
            <div>
              <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900 rounded-t-lg border-t border-x border-slate-800 text-[11px] font-mono text-slate-400">
                <span>Payload / Runtime Stream</span>
                <span>json / text</span>
              </div>
              <pre className="p-3.5 bg-slate-950 border border-slate-800 rounded-b-lg font-mono text-xs text-teal-300 whitespace-pre-wrap overflow-x-auto leading-relaxed max-h-56">
                {activeStepData.payload}
              </pre>
            </div>

            {/* Human in the loop gate button */}
            {mode === "write" && activeStepData.step === 5 && (
              <div className="p-3.5 rounded-xl border border-amber-300 dark:border-amber-500/40 bg-amber-50 dark:bg-amber-950/20 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
                <div className="flex items-center gap-2 text-amber-950 dark:text-amber-300 text-xs">
                  <ShieldAlert className="w-5 h-5 shrink-0 text-amber-600 dark:text-amber-400" />
                  <span>
                    <strong>Write Gate:</strong> An irreversible state change was requested. Approve dispatch?
                  </span>
                </div>
                <button
                  onClick={() => {
                    setHumanApproved(true);
                    setCurrentStep(6);
                  }}
                  disabled={humanApproved}
                  className={`w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm touch-manipulation active:scale-95 ${
                    humanApproved
                      ? "bg-emerald-600 text-white cursor-default"
                      : "bg-amber-600 hover:bg-amber-500 text-white"
                  }`}
                >
                  {humanApproved ? "✓ Authorized by Supervisor" : "Confirm & Execute Tool"}
                </button>
              </div>
            )}
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
                    <span>Pause Flow</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    <span>Auto-Play Flow</span>
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
                onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
                disabled={currentStep === 1}
                className="px-3 py-2 rounded-xl text-xs font-medium border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-900 transition touch-manipulation active:scale-95"
              >
                Previous Step
              </button>
              <button
                onClick={() => setCurrentStep((prev) => Math.min(prev + 1, 8))}
                disabled={currentStep === 8 || (mode === "write" && currentStep === 5 && !humanApproved)}
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
