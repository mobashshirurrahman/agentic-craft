"use client";

import React from "react";
import {
  Code,
  Sparkles,
  Layers,
  ArrowRight,
  Terminal,
  Database,
  CheckCircle2,
  Cpu,
} from "lucide-react";
import ScratchAgentDebugger from "./ScratchAgentDebugger";
import Module2_5Quiz from "./Module2_5Quiz";

export default function Module2_5Content() {
  return (
    <div className="space-y-10">
      {/* Hero Banner */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-emerald-500/10 via-sky-500/5 to-slate-50 dark:to-slate-950 p-6 md:p-8 relative overflow-hidden transition-colors">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
              Module 2.5 • Core Implementation
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              ~15 min hands-on
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Create an Agent Class from Scratch in Python
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Time to strip away all framework magic. In this lesson, we build an <strong>Agent class entirely from scratch</strong> in vanilla Python to understand how message state, regex action parsing, and function dispatching truly work.
          </p>
        </div>
      </div>

      {/* Section 1: The Raw ReAct Pattern */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Terminal className="w-5 h-5 text-emerald-500" />
          1. The Raw ReAct Prompt Contract
        </h2>
        <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Before modern JSON tool calling existed, ReAct operated on pure text formatting:
        </p>

        <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs border border-slate-800 overflow-x-auto space-y-1">
          <div className="text-slate-400 text-[10px] pb-1 border-b border-slate-800 mb-1.5">
            # The Universal ReAct Text Pattern
          </div>
          <p className="text-purple-300">Thought: I need to check the inventory status for item #402.</p>
          <p className="text-sky-300">Action: check_inventory[402]</p>
          <p className="text-amber-300">PAUSE</p>
          <p className="text-emerald-300">Observation: In stock: 14 units available.</p>
          <p className="text-slate-100">Answer: Item #402 is in stock with 14 units available.</p>
        </div>
      </section>

      {/* Section 2: Pure Python Agent Implementation */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Code className="w-5 h-5 text-sky-500" />
          2. The Pure Python Agent Class
        </h2>
        <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs border border-slate-800 overflow-x-auto">
          <pre>{`import re
from openai import OpenAI

class Agent:
    def __init__(self, system_prompt: str, actions: dict):
        self.system = system_prompt
        self.actions = actions
        self.messages = [{"role": "system", "content": self.system}]
        self.client = OpenAI()

    def __call__(self, user_message: str) -> str:
        self.messages.append({"role": "user", "content": user_message})
        
        # 1. First model call (Thought + Action)
        response = self.client.chat.completions.create(
            model="gpt-4o-mini",
            messages=self.messages
        ).choices[0].message.content
        self.messages.append({"role": "assistant", "content": response})

        # 2. Extract Action: action_name[args] using Regex
        action_match = re.search(r"Action:\\s*(\\w+)\\[(.*)\\]", response)
        if action_match:
            action_name, action_input = action_match.groups()
            if action_name in self.actions:
                # 3. Dispatch to Python function!
                observation = self.actions[action_name](action_input)
                self.messages.append({"role": "user", "content": f"Observation: {observation}"})
                
                # 4. Synthesize final grounded answer
                final_res = self.client.chat.completions.create(
                    model="gpt-4o-mini",
                    messages=self.messages
                ).choices[0].message.content
                return final_res

        return response`}</pre>
        </div>
      </section>

      {/* Interactive Debugger */}
      <section className="space-y-4">
        <ScratchAgentDebugger />
      </section>

      {/* Quiz */}
      <section className="space-y-4">
        <Module2_5Quiz />
      </section>

      {/* Next Step Callout */}
      <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-xs font-mono text-slate-700 dark:text-slate-300 flex items-center justify-between">
        <span>Up Next: Module 2.6 — Implementing Loops for Multi-Step Agent Tasks</span>
        <ArrowRight className="w-4 h-4 text-emerald-500" />
      </div>
    </div>
  );
}
