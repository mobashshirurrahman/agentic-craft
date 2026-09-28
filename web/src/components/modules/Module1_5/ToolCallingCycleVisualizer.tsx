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
  FileCheck,
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
    description: "Agent parses intent: this is a WRITE action with external financial and client consequences.",
    payload: `Internal Thought:
• Requires drafting formal communication.
• Requires invoking send_email() API (State Mutation / Write Action).
• High consequence: Cannot be undone once transmitted.`,
    badge: "Risk Assessment",
  },
  {
    step: 3,
    title: "Agent Decides Tool is Needed",
    actor: "Agent",
    icon: "brain",
    description: "The agent selects 'send_client_email' from its Communication tool category.",
    payload: `Tool Selection:
• Candidate: send_client_email(recipient, subject, body, credit_amount)
• Consequence Level: HIGH (External State Modification)`,
    badge: "Tool Decision",
  },
  {
    step: 4,
    title: "Agent Generates Structured Tool Call",
    actor: "Agent",
    icon: "brain",
    description: "Agent generates structured arguments with proposed subject, recipient, and credit amount.",
    payload: `{
  "tool_call_id": "call_send_email_99",
  "function": {
    "name": "send_client_email",
    "arguments": {
      "recipient": "billing@acmecorp.com",
      "subject": "Update on Ticket #4092 - Service Credit Confirmation",
      "credit_percentage": 10,
      "body": "Dear Acme Corp Team, we sincerely apologize for the delay..."
    }
  }
}`,
    badge: "Structured Tool Call",
  },
  {
    step: 5,
    title: "Safety Confirmation Gate Triggered",
    actor: "Runtime",
    icon: "runtime",
    description: "CRITICAL: Because this is a Write Action, the runtime pauses execution and requests human confirmation before firing the API.",
    payload: `[SAFETY GATE: HUMAN-IN-THE-LOOP ACTIVE]
Action: External Email & Financial Credit (10%)
Recipient: billing@acmecorp.com
Status: Execution PAUSED. Awaiting human supervisor approval...
-> Supervisor clicks: [APPROVED]`,
    badge: "Human Confirmation Gate",
  },
  {
    step: 6,
    title: "Tool Returns Result",
    actor: "Tool",
    icon: "tool",
    description: "Upon human approval, the email API executes the transaction and returns a message ID.",
    payload: `{
  "status": "SENT",
  "message_id": "msg_01k992fa_acme",
  "timestamp": "2026-09-28T09:30:15Z",
  "credit_applied": true
}`,
    badge: "State Modified (Success)",
  },
  {
    step: 7,
    title: "Agent Processes Result",
    actor: "Agent",
    icon: "brain",
    description: "Agent observes the confirmed dispatch receipt and records the transaction in session memory.",
    payload: `Observation Ingested: Email dispatched with msg_id msg_01k992fa_acme.
State update confirmed. Closing ticket lifecycle.`,
    badge: "State Verification",
  },
  {
    step: 8,
    title: "Agent Continues or Responds",
    actor: "Agent",
    icon: "brain",
    description: "Agent reports success back to the user with full confirmation details.",
    payload: `Agent Response:
"The apology email has been successfully sent to billing@acmecorp.com with a 10% credit confirmation. Confirmation ID: msg_01k992fa_acme."`,
    badge: "Action Completed",
  },
];

export default function ToolCallingCycleVisualizer() {
  const [mode, setMode] = useState<"read" | "write">("read");
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [humanApproved, setHumanApproved] = useState<boolean>(false);

  const steps = mode === "read" ? READ_STEPS : WRITE_STEPS;
  const activeStepData = steps[currentStep - 1];

  // Auto-play timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setTimeout(() => {
        if (mode === "write" && currentStep === 5 && !humanApproved) {
          // Pause for human approval in write mode!
          setIsPlaying(false);
          return;
        }
        if (currentStep < 8) {
          setCurrentStep((prev) => prev + 1);
        } else {
          setIsPlaying(false);
        }
      }, 2500);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, mode, humanApproved]);

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(1);
    setHumanApproved(false);
  };

  const handleModeChange = (newMode: "read" | "write") => {
    setMode(newMode);
    setCurrentStep(1);
    setIsPlaying(false);
    setHumanApproved(false);
  };

  return (
    <div className="rounded-2xl border border-slate-700/60 bg-slate-900/90 dark:bg-slate-900/90 light:bg-white light:border-slate-300 shadow-xl overflow-hidden my-8">
      {/* Header bar */}
      <div className="border-b border-slate-700/60 dark:border-slate-700/60 light:border-slate-200 px-5 py-4 bg-slate-800/50 dark:bg-slate-800/50 light:bg-slate-50 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-teal-400 animate-pulse" />
            <h3 className="font-bold text-base md:text-lg text-white dark:text-white light:text-slate-900">
              Interactive 8-Step Tool Calling Lifecycle Explorer
            </h3>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 mt-0.5">
            Follow how an Agent bridges internal reasoning to external functions in real time.
          </p>
        </div>

        {/* Action Type Toggle: Read vs Write */}
        <div className="flex items-center bg-slate-900/80 dark:bg-slate-900/80 light:bg-slate-200/90 p-1 rounded-xl border border-slate-700/80 dark:border-slate-700/80 light:border-slate-300">
          <button
            onClick={() => handleModeChange("read")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              mode === "read"
                ? "bg-teal-500 text-white shadow-sm"
                : "text-slate-400 dark:text-slate-400 light:text-slate-700 hover:text-white dark:hover:text-white"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Read Action (Safe Query)</span>
          </button>
          <button
            onClick={() => handleModeChange("write")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              mode === "write"
                ? "bg-amber-500 text-slate-950 font-bold shadow-sm"
                : "text-slate-400 dark:text-slate-400 light:text-slate-700 hover:text-white dark:hover:text-white"
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Write Action (State Mutation)</span>
          </button>
        </div>
      </div>

      {/* Stepper Strip */}
      <div className="px-5 py-4 bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-100/70 border-b border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 overflow-x-auto">
        <div className="flex items-center min-w-[700px] justify-between gap-1">
          {steps.map((s) => {
            const isCompleted = s.step < currentStep;
            const isCurrent = s.step === currentStep;

            return (
              <button
                key={s.step}
                onClick={() => {
                  setCurrentStep(s.step);
                  setIsPlaying(false);
                }}
                className={`flex-1 flex flex-col items-center p-2 rounded-lg transition-all relative ${
                  isCurrent
                    ? mode === "read"
                      ? "bg-teal-500/20 border border-teal-500/50"
                      : "bg-amber-500/20 border border-amber-500/50"
                    : isCompleted
                    ? "bg-slate-800/40 dark:bg-slate-800/40 light:bg-white text-slate-400"
                    : "opacity-40 hover:opacity-70"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-mono mb-1 ${
                    isCurrent
                      ? mode === "read"
                        ? "bg-teal-400 text-slate-950"
                        : "bg-amber-400 text-slate-950"
                      : isCompleted
                      ? "bg-emerald-500/30 text-emerald-300"
                      : "bg-slate-700 text-slate-400"
                  }`}
                >
                  {isCompleted ? "✓" : s.step}
                </div>
                <span className="text-[11px] font-medium text-center line-clamp-1 text-slate-200 dark:text-slate-200 light:text-slate-800">
                  {s.title.split(" ")[0]} {s.title.split(" ")[1] || ""}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="p-5 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Visual Actor Flow */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-slate-800/40 dark:bg-slate-800/40 light:bg-slate-50 border border-slate-700/50 dark:border-slate-700/50 light:border-slate-200 rounded-xl p-4">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-400 light:text-slate-600 block mb-3">
              Actor & Lifecycle Position
            </span>

            {/* Three key entities */}
            <div className="flex flex-col gap-3">
              {/* User Actor */}
              <div
                className={`p-3 rounded-lg border flex items-center justify-between transition-all ${
                  activeStepData.actor === "User"
                    ? "border-sky-500 bg-sky-500/15 text-sky-200"
                    : "border-slate-700/40 dark:border-slate-700/40 light:border-slate-200 bg-slate-900/40 dark:bg-slate-900/40 light:bg-white text-slate-400"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-sky-500/20 flex items-center justify-center text-sky-400">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white dark:text-white light:text-slate-900">
                      User / Client
                    </h4>
                    <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600">
                      Issues prompt & receives response
                    </p>
                  </div>
                </div>
                {activeStepData.actor === "User" && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-sky-500/20 text-sky-300 font-bold animate-pulse">
                    ACTIVE
                  </span>
                )}
              </div>

              {/* Agent LLM Brain */}
              <div
                className={`p-3 rounded-lg border flex items-center justify-between transition-all ${
                  activeStepData.actor === "Agent"
                    ? "border-teal-500 bg-teal-500/15 text-teal-200"
                    : "border-slate-700/40 dark:border-slate-700/40 light:border-slate-200 bg-slate-900/40 dark:bg-slate-900/40 light:bg-white text-slate-400"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-500/20 flex items-center justify-center text-teal-400">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white dark:text-white light:text-slate-900">
                      Agent (LLM Reasoning Engine)
                    </h4>
                    <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600">
                      Decides tool, crafts schema, interprets outputs
                    </p>
                  </div>
                </div>
                {activeStepData.actor === "Agent" && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-teal-500/20 text-teal-300 font-bold animate-pulse">
                    ACTIVE
                  </span>
                )}
              </div>

              {/* System Runtime & Tool */}
              <div
                className={`p-3 rounded-lg border flex items-center justify-between transition-all ${
                  activeStepData.actor === "Runtime" || activeStepData.actor === "Tool"
                    ? mode === "write" && activeStepData.step === 5
                      ? "border-amber-500 bg-amber-500/20 text-amber-200"
                      : "border-purple-500 bg-purple-500/15 text-purple-200"
                    : "border-slate-700/40 dark:border-slate-700/40 light:border-slate-200 bg-slate-900/40 dark:bg-slate-900/40 light:bg-white text-slate-400"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400">
                    <Wrench className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white dark:text-white light:text-slate-900">
                      Host Runtime & External Tool
                    </h4>
                    <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600">
                      Executes sandboxed API or database call
                    </p>
                  </div>
                </div>
                {(activeStepData.actor === "Runtime" || activeStepData.actor === "Tool") && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/20 text-purple-300 font-bold animate-pulse">
                    ACTIVE
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Teacher Commentary Note */}
          <div className="bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 rounded-xl p-4 text-xs leading-relaxed text-slate-300 dark:text-slate-300 light:text-slate-700">
            <span className="font-bold text-teal-400 dark:text-teal-400 light:text-teal-600 block mb-1">
              💡 Teacher Note: Who actually executes the code?
            </span>
            Remember this golden rule: <strong>The LLM does NOT execute tools directly!</strong> The LLM only generates a string of JSON describing what function to call and what arguments to supply. The surrounding host runtime (Python, Node.js, or framework) intercepts that JSON, calls the actual function, and feeds the string result back to the model.
          </div>
        </div>

        {/* Right Column: Step Inspector & Live Payload */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-4">
          <div className="bg-slate-950 dark:bg-slate-950 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 rounded-xl p-5 shadow-inner">
            {/* Step header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 dark:border-slate-800/80 light:border-slate-200">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-slate-800 dark:bg-slate-800 light:bg-slate-200 text-slate-200 dark:text-slate-200 light:text-slate-800">
                  Step {activeStepData.step} of 8
                </span>
                <h4 className="font-bold text-white dark:text-white light:text-slate-900 text-base">
                  {activeStepData.title}
                </h4>
              </div>
              <span
                className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded ${
                  mode === "read"
                    ? "bg-teal-500/20 text-teal-300"
                    : "bg-amber-500/20 text-amber-300"
                }`}
              >
                {activeStepData.badge}
              </span>
            </div>

            {/* Step description */}
            <p className="text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 mt-3 leading-relaxed">
              {activeStepData.description}
            </p>

            {/* Payload Terminal Display */}
            <div className="mt-4">
              <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900 dark:bg-slate-900 light:bg-slate-100 rounded-t-lg border-t border-x border-slate-800 dark:border-slate-800 light:border-slate-200 text-xs font-mono text-slate-400">
                <span>Payload / Runtime Stream</span>
                <span>json / text</span>
              </div>
              <pre className="p-3.5 bg-slate-900/90 dark:bg-slate-900/90 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 rounded-b-lg font-mono text-xs text-teal-300 dark:text-teal-300 light:text-teal-700 whitespace-pre-wrap overflow-x-auto leading-relaxed max-h-56">
                {activeStepData.payload}
              </pre>
            </div>

            {/* Special Human in the Loop approval button for Write Step 5 */}
            {mode === "write" && activeStepData.step === 5 && (
              <div className="mt-4 p-4 rounded-xl border border-amber-500/40 bg-amber-500/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-amber-300 text-xs">
                  <ShieldAlert className="w-5 h-5 flex-shrink-0" />
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
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-md ${
                    humanApproved
                      ? "bg-emerald-600 text-white cursor-default"
                      : "bg-amber-400 hover:bg-amber-300 text-slate-950 cursor-pointer active:scale-95"
                  }`}
                >
                  {humanApproved ? "✓ Approved by Supervisor" : "Confirm & Execute Tool"}
                </button>
              </div>
            )}
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
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border border-slate-700 dark:border-slate-700 light:border-slate-300 text-slate-300 dark:text-slate-300 light:text-slate-700 hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-slate-100 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
                disabled={currentStep === 1}
                className="px-3 py-2 rounded-xl text-xs font-medium border border-slate-700 dark:border-slate-700 light:border-slate-300 text-slate-300 dark:text-slate-300 light:text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-slate-100"
              >
                Previous Step
              </button>
              <button
                onClick={() => setCurrentStep((prev) => Math.min(prev + 1, 8))}
                disabled={currentStep === 8 || (mode === "write" && currentStep === 5 && !humanApproved)}
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
