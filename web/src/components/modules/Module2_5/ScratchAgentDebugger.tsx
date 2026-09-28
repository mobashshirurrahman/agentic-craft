"use client";

import React, { useState } from "react";
import {
  Code,
  Play,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Terminal,
  Database,
  CheckCircle2,
  Cpu,
  Layers,
} from "lucide-react";

export default function ScratchAgentDebugger() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);

  const steps = [
    {
      step: 0,
      title: "Class Instantiation",
      description: "Initialize Agent with system prompt and dictionary of callable actions.",
      code: `agent = Agent(
    system="You run in a loop of Thought, Action, PAUSE, Observation.",
    actions={"calculate": calculate, "get_time": get_time}
)`,
      messagesState: [
        { role: "system", content: "You run in a loop of Thought, Action, PAUSE, Observation." },
      ],
    },
    {
      step: 1,
      title: "User Prompt Ingestion",
      description: "User input is appended to self.messages.",
      code: `agent("What is 18 multiplied by 4?")`,
      messagesState: [
        { role: "system", content: "You run in a loop of Thought, Action, PAUSE, Observation." },
        { role: "user", content: "What is 18 multiplied by 4?" },
      ],
    },
    {
      step: 2,
      title: "LLM Thought & Action Generation",
      description: "LLM generates a reasoning Thought and outputs a formatted Action string.",
      code: `result = client.chat(messages=self.messages)
# Output:
# Thought: I need to multiply 18 by 4.
# Action: calculate[18 * 4]
# PAUSE`,
      messagesState: [
        { role: "system", content: "You run in a loop of Thought, Action, PAUSE, Observation." },
        { role: "user", content: "What is 18 multiplied by 4?" },
        { role: "assistant", content: "Thought: I need to multiply 18 by 4.\nAction: calculate[18 * 4]\nPAUSE" },
      ],
    },
    {
      step: 3,
      title: "Regex Action Extraction & Dispatch",
      description: "Python parses action name and parameter using regex, then invokes self.actions.",
      code: `match = re.search(r"Action:\\s*(\\w+)\\[(.*)\\]", result)
tool_name, tool_arg = match.groups()  # ("calculate", "18 * 4")
observation = self.actions[tool_name](tool_arg)  # 72`,
      messagesState: [
        { role: "system", content: "You run in a loop of Thought, Action, PAUSE, Observation." },
        { role: "user", content: "What is 18 multiplied by 4?" },
        { role: "assistant", content: "Thought: I need to multiply 18 by 4.\nAction: calculate[18 * 4]\nPAUSE" },
      ],
    },
    {
      step: 4,
      title: "Observation Grounding & Final Synthesis",
      description: "Observation is appended to self.messages and final response is generated.",
      code: `self.messages.append({"role": "user", "content": f"Observation: {observation}"})
final_answer = client.chat(messages=self.messages)
# "18 multiplied by 4 is 72."`,
      messagesState: [
        { role: "system", content: "You run in a loop of Thought, Action, PAUSE, Observation." },
        { role: "user", content: "What is 18 multiplied by 4?" },
        { role: "assistant", content: "Thought: I need to multiply 18 by 4.\nAction: calculate[18 * 4]\nPAUSE" },
        { role: "user", content: "Observation: 72" },
        { role: "assistant", content: "18 multiplied by 4 is 72." },
      ],
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
  };

  const current = steps[currentStep];

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm overflow-hidden transition-colors">
      {/* Header */}
      <div className="p-5 md:p-6 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-emerald-500/10 via-sky-500/5 to-transparent">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <Code className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                Pure Python Agent Class Execution Debugger
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                  Zero Frameworks
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Step line-by-line through the raw Python mechanics of self.messages, regex dispatch, and tool execution
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
              Stage {currentStep + 1} of {steps.length}
            </span>
            <button
              onClick={handleReset}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition"
              title="Reset"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="p-5 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Code Execution Stepper (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold pb-2 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <span>Execution Stage: {current.title}</span>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {current.description}
          </p>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 font-mono text-xs overflow-x-auto min-h-[160px]">
            <pre className="text-emerald-300">{current.code}</pre>
          </div>

          {/* Stepper Controls */}
          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300 disabled:opacity-40 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentStep === steps.length - 1}
              className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold shadow-sm disabled:opacity-40 transition flex items-center gap-1.5"
            >
              <span>Next Stage</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right: self.messages State Inspector (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
            <span className="flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-sky-500" />
              Inside `self.messages` List
            </span>
            <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
              {current.messagesState.length} Messages
            </span>
          </div>

          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
            {current.messagesState.map((msg, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl border text-xs font-mono space-y-1 ${
                  msg.role === "system"
                    ? "border-purple-500/30 bg-purple-500/10 text-purple-950 dark:text-purple-200"
                    : msg.role === "user"
                    ? "border-sky-500/30 bg-sky-500/10 text-sky-950 dark:text-sky-200"
                    : "border-emerald-500/30 bg-emerald-500/10 text-emerald-950 dark:text-emerald-200"
                }`}
              >
                <div className="flex items-center justify-between text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">
                  <span>Role: {msg.role}</span>
                  <span>Entry #{idx}</span>
                </div>
                <div className="whitespace-pre-wrap leading-relaxed text-[11px]">
                  {msg.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
