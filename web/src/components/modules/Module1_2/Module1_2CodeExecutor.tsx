"use client";

import React, { useState, useEffect } from "react";
import {
  Play,
  RotateCcw,
  Copy,
  Check,
  Terminal,
  Layers,
  Bot,
  Zap,
  CheckCircle2,
  Clock,
  Coins,
  Cpu,
  ArrowRight,
  Sparkles,
} from "lucide-react";

type ExecutionMode = "chain" | "agent";

interface StepLog {
  time: string;
  step: string;
  detail: string;
  badge?: string;
  type: "info" | "action" | "tool" | "success" | "decision";
}

export default function Module1_2CodeExecutor() {
  const [mode, setMode] = useState<ExecutionMode>("chain");
  const [isRunning, setIsRunning] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState(-1);
  const [logs, setLogs] = useState<StepLog[]>([]);
  const [copied, setCopied] = useState(false);
  const [tokensUsed, setTokensUsed] = useState(0);
  const [elapsedMs, setElapsedMs] = useState(0);

  const chainCode = `# APPROACH 1: DETERMINISTIC PROMPT CHAIN
# Best for: Predictable, fixed-order pipelines (Zero loop overhead)

def blog_post_chain(topic: str) -> str:
    # Step 1: Generate structured outline
    outline_prompt = f"Create a 3-bullet outline for: {topic}"
    outline = llm.generate(outline_prompt)
    print(f"[Step 1 Complete] Outline: {outline}")

    # Step 2: Feed outline directly into draft writer
    draft_prompt = f"Using this outline: {outline}, write the complete post."
    finished_post = llm.generate(draft_prompt)
    print(f"[Step 2 Complete] Post created ({len(finished_post)} chars)")

    return finished_post

# Execution is linear (Step 1 -> Step 2). Fast, low-cost, zero unpredictability.
result = blog_post_chain("Intro to Agentic AI")`;

  const agentCode = `# APPROACH 2: AUTONOMOUS AI AGENT LOOP
# Best for: Dynamic decisions, unknown step counts, tool orchestration

class CustomerSupportAgent:
    def __init__(self, tools, max_iterations=5):
        self.tools = tools
        self.max_iterations = max_iterations

    def run(self, query: str):
        context = {"query": query, "history": []}

        for iteration in range(self.max_iterations):
            # 1. LLM dynamically evaluates state & chooses next action
            decision = llm.decide(context, available_tools=self.tools.keys())

            if decision.type == "FINAL_ANSWER":
                return decision.content

            # 2. Invoke the selected tool dynamically
            tool_fn = self.tools[decision.tool_name]
            observation = tool_fn(**decision.tool_args)
            context["history"].append({"action": decision.tool_name, "result": observation})

            # 3. Agent reflects on observation in next loop iteration

agent = CustomerSupportAgent(tools={"check_order": check_order, "process_refund": refund})
response = agent.run("Order #8491 arrived damaged, can I get a refund?")`;

  const activeCode = mode === "chain" ? chainCode : agentCode;

  const copyCode = () => {
    navigator.clipboard.writeText(activeCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const runSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setLogs([]);
    setActiveStepIndex(0);
    setTokensUsed(0);
    setElapsedMs(0);

    if (mode === "chain") {
      // Prompt Chaining simulation
      const chainSteps: StepLog[] = [
        {
          time: "00:00.120",
          step: "Pipeline Init",
          detail: "Starting 2-step fixed sequential chain for topic: 'Intro to Agentic AI'",
          type: "info",
        },
        {
          time: "00:00.410",
          step: "Step 1: Generate Outline",
          detail: "LLM Call 1 -> Outline generated (3 sections: Core Pillars, Chains vs Agents, Production Tips)",
          badge: "Step 1/2",
          type: "action",
        },
        {
          time: "00:00.680",
          step: "Data Pipe",
          detail: "Outline successfully piped into Step 2 prompt context buffer (0 token loss)",
          type: "info",
        },
        {
          time: "00:01.120",
          step: "Step 2: Draft Article",
          detail: "LLM Call 2 -> Comprehensive blog post generated based on outline",
          badge: "Step 2/2",
          type: "action",
        },
        {
          time: "00:01.150",
          step: "Chain Complete",
          detail: "SUCCESS: Deterministic output returned in exactly 2 predetermined steps.",
          badge: "Finished",
          type: "success",
        },
      ];

      chainSteps.forEach((step, idx) => {
        setTimeout(() => {
          setLogs((prev) => [...prev, step]);
          setActiveStepIndex(idx);
          setTokensUsed((idx + 1) * 320);
          setElapsedMs(Math.round((idx + 1) * 230));

          if (idx === chainSteps.length - 1) {
            setIsRunning(false);
          }
        }, idx * 450);
      });
    } else {
      // AI Agent Simulation
      const agentSteps: StepLog[] = [
        {
          time: "00:00.080",
          step: "Agent Goal Ingestion",
          detail: "Query: 'Order #8491 arrived damaged, can I get a refund?'",
          type: "info",
        },
        {
          time: "00:00.450",
          step: "Reasoning Loop 1",
          detail: "THOUGHT: I need to verify order #8491 status and purchase date before refunding.",
          badge: "Thinking",
          type: "decision",
        },
        {
          time: "00:00.820",
          step: "Tool Execution",
          detail: "INVOKING: check_order_status(order_id='8491') -> Delivered 3 days ago. Value: $49.00.",
          badge: "Tool Call",
          type: "tool",
        },
        {
          time: "00:01.210",
          step: "Reasoning Loop 2",
          detail: "THOUGHT: Order delivered within 30-day return policy. Proceeding with refund tool.",
          badge: "Thinking",
          type: "decision",
        },
        {
          time: "00:01.650",
          step: "Tool Execution",
          detail: "INVOKING: process_refund(order_id='8491', amount=49.00) -> Status: 200 OK. Transaction: txn_91a0.",
          badge: "Tool Call",
          type: "tool",
        },
        {
          time: "00:02.100",
          step: "Reasoning Loop 3",
          detail: "EVALUATION: Refund succeeded. Ready to synthesize polite customer reply.",
          badge: "Self-Check",
          type: "decision",
        },
        {
          time: "00:02.320",
          step: "Goal Resolved",
          detail: "FINAL ANSWER: 'I have processed a full refund of $49.00 for order #8491. Ref: txn_91a0.'",
          badge: "Complete",
          type: "success",
        },
      ];

      agentSteps.forEach((step, idx) => {
        setTimeout(() => {
          setLogs((prev) => [...prev, step]);
          setActiveStepIndex(idx);
          setTokensUsed((idx + 1) * 480);
          setElapsedMs(Math.round((idx + 1) * 330));

          if (idx === agentSteps.length - 1) {
            setIsRunning(false);
          }
        }, idx * 450);
      });
    }
  };

  const resetLogs = () => {
    setLogs([]);
    setActiveStepIndex(-1);
    setTokensUsed(0);
    setElapsedMs(0);
    setIsRunning(false);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
      {/* Top Header & Mode Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 md:p-5 border-b border-slate-800 bg-slate-900/50">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-400">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              Interactive Execution Studio
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                Live Simulator
              </span>
            </h4>
            <p className="text-xs text-slate-400">
              Compare deterministic pipeline chaining against autonomous agent routing
            </p>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex items-center p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono self-start sm:self-center">
          <button
            onClick={() => {
              setMode("chain");
              resetLogs();
            }}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              mode === "chain"
                ? "bg-violet-600 text-white font-bold shadow-md"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Prompt Chaining
          </button>
          <button
            onClick={() => {
              setMode("agent");
              resetLogs();
            }}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              mode === "agent"
                ? "bg-amber-600 text-white font-bold shadow-md"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            AI Agent Loop
          </button>
        </div>
      </div>

      {/* Code Editor Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-slate-800">
        {/* Left: Code Viewer */}
        <div className="lg:col-span-7 bg-slate-950 p-4 font-mono text-xs overflow-x-auto relative">
          <div className="flex items-center justify-between text-slate-500 pb-2 mb-2 border-b border-slate-900 text-[11px]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
              <span className="text-slate-400 ml-1">
                {mode === "chain" ? "prompt_chain_pipeline.py" : "autonomous_agent_loop.py"}
              </span>
            </div>

            <button
              onClick={copyCode}
              className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white px-2 py-0.5 rounded bg-slate-900 border border-slate-800 transition"
              title="Copy code snippet"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-teal-400" />
                  <span className="text-teal-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          <pre className="text-slate-300 leading-relaxed overflow-x-auto select-text font-mono text-[11px] sm:text-xs max-h-[340px]">
            <code>
              {activeCode.split("\n").map((line, idx) => {
                const isComment = line.trim().startsWith("#");
                const isDef = line.includes("def ") || line.includes("class ");
                const isReturn = line.includes("return ");

                return (
                  <div key={idx} className="flex">
                    <span className="text-slate-600 select-none w-7 shrink-0 text-right pr-3">
                      {idx + 1}
                    </span>
                    <span
                      className={
                        isComment
                          ? "text-slate-500 italic"
                          : isDef
                          ? "text-sky-400 font-bold"
                          : isReturn
                          ? "text-amber-400"
                          : "text-slate-300"
                      }
                    >
                      {line}
                    </span>
                  </div>
                );
              })}
            </code>
          </pre>
        </div>

        {/* Right: Metrics & Architecture Overview */}
        <div className="lg:col-span-5 bg-slate-900/40 p-4 md:p-5 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-800">
          <div>
            <span className="text-[10px] font-mono font-bold tracking-wider text-teal-400 uppercase">
              {mode === "chain" ? "Sequential Topology" : "Cyclical Topology"}
            </span>
            <h5 className="text-sm font-bold text-white mt-1">
              {mode === "chain"
                ? "Deterministic 2-Step Chain"
                : "Self-Governing Agent Loop"}
            </h5>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              {mode === "chain"
                ? "The sequence of calls is hardcoded into your program logic. The LLM never decides what step happens next; it only completes the text transformation at each station."
                : "The LLM actively selects which tool to execute based on runtime state, inspects tool results, reflects, and halts only when its goal completion criteria are met."}
            </p>

            {/* Architectural Stats Grid */}
            <div className="grid grid-cols-2 gap-2 mt-4 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-500 text-[10px] block">Execution Path</span>
                <span className="text-slate-200 font-bold">
                  {mode === "chain" ? "Linear (A ➔ B)" : "Loop (Eval ➔ Act ➔ Repeat)"}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-500 text-[10px] block">Step Count</span>
                <span className="text-slate-200 font-bold">
                  {mode === "chain" ? "Fixed (2 Steps)" : "Dynamic (1 to N)"}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-500 text-[10px] block">Cost Profile</span>
                <span className="text-emerald-400 font-bold">
                  {mode === "chain" ? "Guaranteed Fixed $" : "Variable ($$ to $$$$)"}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-500 text-[10px] block">Failure Recovery</span>
                <span className="text-amber-400 font-bold">
                  {mode === "chain" ? "Fail-Fast / Retry Step" : "Autonomous Self-Correction"}
                </span>
              </div>
            </div>
          </div>

          {/* Action Trigger Buttons */}
          <div className="mt-5 pt-4 border-t border-slate-800 flex items-center gap-2">
            <button
              onClick={runSimulation}
              disabled={isRunning}
              className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition ${
                isRunning
                  ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                  : mode === "chain"
                  ? "bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-950"
                  : "bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-950"
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              {isRunning
                ? "Simulating Execution..."
                : mode === "chain"
                ? "Run Sequential Chain"
                : "Run Agent Loop"}
            </button>

            <button
              onClick={resetLogs}
              disabled={isRunning || logs.length === 0}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition disabled:opacity-40 disabled:cursor-not-allowed"
              title="Reset output terminal"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Terminal Output Stream */}
      <div className="p-4 md:p-5 bg-slate-950">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-2 mb-3 border-b border-slate-850">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-teal-400" />
            <span className="font-bold text-slate-200">Terminal Output Stream</span>
          </div>

          {logs.length > 0 && (
            <div className="flex items-center gap-3 text-[11px]">
              <span className="flex items-center gap-1 text-slate-400">
                <Coins className="w-3 h-3 text-amber-400" />
                ~{tokensUsed} Tokens
              </span>
              <span className="flex items-center gap-1 text-slate-400">
                <Clock className="w-3 h-3 text-sky-400" />
                {elapsedMs}ms
              </span>
            </div>
          )}
        </div>

        {logs.length === 0 ? (
          <div className="py-8 text-center text-slate-600 font-mono text-xs">
            Press <strong className="text-slate-400">Run</strong> to trace real-time execution steps, tool interactions, and state updates.
          </div>
        ) : (
          <div className="space-y-2 font-mono text-xs max-h-64 overflow-y-auto pr-1">
            {logs.map((log, i) => (
              <div
                key={i}
                className={`p-2.5 rounded-lg border flex items-start gap-2.5 transition-all ${
                  log.type === "success"
                    ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-200"
                    : log.type === "tool"
                    ? "bg-sky-950/40 border-sky-500/40 text-sky-200"
                    : log.type === "decision"
                    ? "bg-amber-950/40 border-amber-500/40 text-amber-200"
                    : "bg-slate-900/60 border-slate-800 text-slate-300"
                }`}
              >
                <span className="text-[10px] text-slate-500 shrink-0 mt-0.5">{log.time}</span>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-bold text-white text-[11px]">{log.step}</span>
                    {log.badge && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-800 border border-slate-700 text-slate-300 font-mono">
                        {log.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] leading-relaxed break-words">{log.detail}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
