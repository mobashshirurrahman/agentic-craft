"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  BookOpen,
  Brain,
  Wrench,
  Database,
  Eye,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Copy,
  Check,
  ArrowRight,
  Code2,
  Cpu,
  Layers,
  Terminal,
} from "lucide-react";
import AgentArchitectureVisualizer from "./AgentArchitectureVisualizer";
import Module1_1Quiz from "./Module1_1Quiz";
import InteractiveCodeExecutor from "./InteractiveCodeExecutor";

export default function Module1_1Content() {
  const [copiedCode, setCopiedCode] = useState(false);

  const samplePythonCode = `"""
Module 1.1: Anatomy of an AI Agent in Pure Python
Demonstrating the 4 Core Components:
1. Reasoning Engine (Cognitive brain)
2. Tools (External capabilities)
3. Memory (Context & state buffer)
4. Perception (User input & tool observations)
"""

import json
from typing import Dict, Any, List

# --- COMPONENT 2: TOOLS (Actuators) ---
def calculate_growth(revenue_2025: float, revenue_2026: float) -> str:
    """Calculates percentage growth between two financial years."""
    growth = ((revenue_2026 - revenue_2025) / revenue_2025) * 100
    return f"{growth:.2f}% YoY Growth"

def mock_financial_db(ticker: str) -> Dict[str, Any]:
    """Simulates a database lookup for verified company earnings."""
    data = {
        "TECH": {"2025": 12.0, "2026": 14.2, "unit": "Billion USD"},
        "AUTO": {"2025": 8.5,  "2026": 9.1,  "unit": "Billion USD"}
    }
    return data.get(ticker.upper(), {"error": "Company ticker not found"})

# Registry of tools available to our agent
TOOLS = {
    "mock_financial_db": mock_financial_db,
    "calculate_growth": calculate_growth
}

# --- COMPONENT 3: MEMORY MECHANISM ---
class AgentMemory:
    def __init__(self):
        self.history: List[Dict[str, str]] = []

    def record(self, role: str, content: str):
        self.history.append({"role": role, "content": content})

    def get_context(self) -> List[Dict[str, str]]:
        return self.history

# --- COMPONENT 1 & 4: REASONING ENGINE & PERCEPTION-ACTION LOOP ---
class SimpleAIAgent:
    def __init__(self, name: str):
        self.name = name
        self.memory = AgentMemory()

    def reason_and_act(self, user_goal: str) -> str:
        # Step 1: Perceive user goal
        print(f"\\n🎯 [PERCEIVE] New Goal Received: '{user_goal}'")
        self.memory.record("user", user_goal)

        # Step 2: Reasoning Engine (Analyzes situation and selects necessary tool)
        print("🧠 [REASON] Analyzing goal... I need verified financial data for 'TECH'.")
        print("🛠️ [ACT] Executing Tool: mock_financial_db(ticker='TECH')")
        
        # Tool execution
        tool_output = TOOLS["mock_financial_db"]("TECH")
        print(f"👁️ [OBSERVE] Tool Result: {tool_output}")
        self.memory.record("observation", json.dumps(tool_output))

        # Step 3: Second Reasoning Step (Calculating percentage)
        rev_25 = tool_output["2025"]
        rev_26 = tool_output["2026"]
        print(f"🧠 [REASON] Calculating YoY growth between {rev_25}B and {rev_26}B...")
        calc_result = TOOLS["calculate_growth"](rev_25, rev_26)
        print(f"👁️ [OBSERVE] Calculation Result: {calc_result}")

        # Step 4: Reflection & Final Synthesis
        final_answer = (
            f"TechCorp achieved {calc_result}, growing from \${rev_25}B in 2025 "
            f"to \${rev_26}B in 2026."
        )
        self.memory.record("assistant", final_answer)
        print(f"✅ [GOAL COMPLETE] {final_answer}")
        return final_answer

# --- RUNNING THE AGENT ---
if __name__ == "__main__":
    agent = SimpleAIAgent(name="FinancialAnalystBot")
    agent.reason_and_act("Calculate YoY revenue growth for TECH.")`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(samplePythonCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <article className="space-y-12 text-slate-200">
      {/* ------------------------------------------------------------- */}
      {/* SECTION 1: THE BIG PICTURE & REAL-WORLD ANALOGY */}
      {/* ------------------------------------------------------------- */}
      <section className="space-y-5">
        <div className="flex items-center gap-2 text-teal-400 font-mono text-xs uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Part 1 • The Big Picture & Foundations</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          What is an AI Agent? <span className="text-teal-400">(The Chef vs The Recipe)</span>
        </h2>

        <div className="p-5 rounded-2xl bg-gradient-to-r from-teal-500/10 via-sky-500/5 to-transparent border border-teal-500/25 leading-relaxed text-sm md:text-base">
          <p className="font-medium text-slate-100 mb-2">
            👨‍🏫 <strong>Hello and welcome! Let's start with a simple, crystal-clear analogy:</strong>
          </p>
          <p className="text-slate-300">
            Imagine you walk into a kitchen and ask: <em>"How do I cook a butter chicken biryani?"</em>
          </p>
          <p className="text-slate-300 mt-2">
            A traditional LLM prompt response is like a <strong>recipe book</strong>. It will give you a beautiful, articulate 10-step recipe. But if your stove runs out of gas, or if the onions start to burn, the recipe book just sits there silently on the counter. It cannot taste the gravy, it cannot turn down the flame, and it cannot order extra butter from the store.
          </p>
          <p className="text-slate-300 mt-2">
            An <strong>AI Agent</strong>, on the other hand, is like the <strong>Executive Chef</strong>! The chef reads your goal, plans the sequence of steps, turns on the stove (uses a tool), tastes the seasoning (gathers feedback and observation), adjusts the spices if salt is low (adapts to errors), and delivers the finished dish.
          </p>
        </div>

        {/* 3 Core Definition Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-2 text-teal-400 font-mono text-xs font-bold uppercase mb-1.5">
              <CheckCircle2 className="w-4 h-4" /> 1. Autonomous
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Operates independently within defined boundaries. You set the high-level objective, and the agent determines the step-by-step path to achieve it.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-2 text-sky-400 font-mono text-xs font-bold uppercase mb-1.5">
              <CheckCircle2 className="w-4 h-4" /> 2. Goal-Directed
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Not merely predicting the next sentence! Every single step, tool call, and deliberation is executed specifically to fulfill the user's objective.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-2 text-violet-400 font-mono text-xs font-bold uppercase mb-1.5">
              <CheckCircle2 className="w-4 h-4" /> 3. Adaptive
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Uses feedback from the environment. If a tool call fails or returns an unexpected error, the agent self-corrects and tries an alternative path.
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 2: THE 4 CORE COMPONENTS */}
      {/* ------------------------------------------------------------- */}
      <section className="space-y-5 pt-6 border-t border-slate-800/80">
        <div className="flex items-center gap-2 text-violet-400 font-mono text-xs uppercase tracking-wider">
          <Brain className="w-4 h-4" />
          <span>Part 2 • Architecture & Core Anatomy</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          The 4 Core Components of an AI Agent
        </h2>

        <p className="text-sm md:text-base text-slate-300 leading-relaxed">
          Every real-world agent system—whether built using LangGraph, CrewAI, AutoGen, or pure Python—consists of four fundamental components working in concert:
        </p>

        {/* Interactive 4 Components Visualizer */}
        <AgentArchitectureVisualizer />

        {/* Detailed Explanation Breakdown */}
        <div className="space-y-4 pt-4">
          <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-2">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Brain className="w-4 h-4 text-violet-400" />
              1. Reasoning Engine (LLM) — The Cognitive Brain
            </h3>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              The LLM acts as the cognitive engine. It does <strong>not</strong> just produce text; it performs <em>Context Synthesis</em> (interpreting user intent, retrieved documents, and past conversation) and <em>Decision Making</em> (evaluating which tool to invoke, when to ask for human help, and when the goal is achieved).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-2">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Wrench className="w-4 h-4 text-emerald-400" />
              2. Tools (Actuators) — The Hands
            </h3>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              LLMs by themselves are trapped in a digital box with fixed weights. Tools are external APIs, code interpreters, database connectors, and web search engines that give the LLM superpowers to interact with external systems.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-2">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Database className="w-4 h-4 text-amber-400" />
              3. Memory Mechanisms — The Scratchpad & Archive
            </h3>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Agents require two types of memory:
              <br />
              • <strong>Short-term memory</strong>: In-context message history and current execution state (the active scratchpad).
              <br />
              • <strong>Long-term memory</strong>: External vector databases or SQL stores to remember past user interactions, learned preferences, and enterprise domain knowledge across multiple days or sessions.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-2">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Eye className="w-4 h-4 text-sky-400" />
              4. Perception & Sensors — The Eyes & Ears
            </h3>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              How the agent receives information from its environment: user chat prompts, API webhooks, file uploads, and critically, the <strong>Observation</strong> returned by a tool after it finishes executing.
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 3: HOW COMPONENTS WORK TOGETHER (THE PERCEPTION-ACTION CYCLE) */}
      {/* ------------------------------------------------------------- */}
      <section className="space-y-5 pt-6 border-t border-slate-800/80">
        <div className="flex items-center gap-2 text-sky-400 font-mono text-xs uppercase tracking-wider">
          <Layers className="w-4 h-4" />
          <span>Part 3 • The Perception-Action Cycle</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          How the Components Work Together: The Feedback Loop
        </h2>

        <p className="text-sm md:text-base text-slate-300 leading-relaxed">
          Every autonomous agent operates on a continuous feedback loop that drives perception into action:
        </p>

        {/* Step-by-step cycle block */}
        <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-900 border border-sky-500/30">
              <span className="text-xs font-mono text-sky-400 font-bold block mb-1">
                STEP 1: PERCEPTION
              </span>
              <p className="text-xs text-slate-300">
                The agent perceives the user's objective and environmental state.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-violet-500/30">
              <span className="text-xs font-mono text-violet-400 font-bold block mb-1">
                STEP 2: REASONING
              </span>
              <p className="text-xs text-slate-300">
                The LLM evaluates the goal against available tools and chooses an action.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-emerald-500/30">
              <span className="text-xs font-mono text-emerald-400 font-bold block mb-1">
                STEP 3: ACTION
              </span>
              <p className="text-xs text-slate-300">
                The agent issues a structured tool call (e.g. database query, API invocation).
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-amber-500/30">
              <span className="text-xs font-mono text-amber-400 font-bold block mb-1">
                STEP 4: OBSERVATION
              </span>
              <p className="text-xs text-slate-300">
                The environment returns the result, feeding back into memory to repeat or conclude!
              </p>
            </div>
          </div>
        </div>

        {/* Real-world Agentic Behaviors */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-850 space-y-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            📌 Key Real-World Agentic Behaviors:
          </h3>
          <ul className="space-y-2 text-xs md:text-sm text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">•</span>
              <span><strong>Routing:</strong> Dynamically deciding between different application paths depending on what the user asks.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">•</span>
              <span><strong>Tool Selection:</strong> Looking through a catalog of functions and picking the exact right tool with correct arguments.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">•</span>
              <span><strong>Planning & Sub-goals:</strong> Breaking a large, vague problem into concrete, sequential mini-goals.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">•</span>
              <span><strong>Self-Correction / Retry:</strong> Detecting if a tool failed, parsing the error message, and attempting an alternate strategy.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 4: PRACTICAL CODE IMPLEMENTATION */}
      {/* ------------------------------------------------------------- */}
      <section className="space-y-5 pt-6 border-t border-slate-800/80">
        <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-wider">
          <Code2 className="w-4 h-4" />
          <span>Part 4 • Practical Implementation (Pure Python)</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Anatomy of an Agent: Pure Python Walkthrough
        </h2>

        <p className="text-sm md:text-base text-slate-300 leading-relaxed">
          Before we jump into complex frameworks like LangGraph or CrewAI later in Level 2, let's understand how an agent actually works under the hood in pure Python:
        </p>

        {/* Interactive Code Execution Playground */}
        <InteractiveCodeExecutor />

        {/* Code Architecture Breakdown Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-teal-400 font-bold font-mono block mb-1">
              1. Tools Registry (Lines 13–30)
            </span>
            <p className="text-slate-300 leading-relaxed">
              Standard Python functions decorated or registered in a dictionary. The agent accesses external capabilities through these callable definitions.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-amber-400 font-bold font-mono block mb-1">
              2. Memory Buffer (Lines 32–39)
            </span>
            <p className="text-slate-300 leading-relaxed">
              Maintains working state across turns. Observations from tools get appended to context so the reasoning engine stays grounded.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-sky-400 font-bold font-mono block mb-1">
              3. Perception-Action Loop (Lines 40–60)
            </span>
            <p className="text-slate-300 leading-relaxed">
              Notice the sequence: Perception receives goal ➔ Reasoning identifies missing data ➔ Tool is executed ➔ Final answer is synthesized.
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 5: COMMON GOTCHAS & PITFALLS */}
      {/* ------------------------------------------------------------- */}
      <section className="space-y-5 pt-6 border-t border-slate-800/80">
        <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-wider">
          <AlertTriangle className="w-4 h-4" />
          <span>Part 5 • Critical Gotchas & Common Pitfalls</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Watch Out! 3 Critical Misconceptions
        </h2>

        <div className="space-y-4">
          {/* Gotcha 1 */}
          <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Gotcha #1
              </span>
              <h3 className="text-base font-bold text-white">
                "Is a single API call an Agent?" — NO!
              </h3>
            </div>
            <p className="text-xs md:text-sm text-amber-100/90 leading-relaxed">
              <em>Core Rule:</em> "There is a tendency to label any LLM application an 'agent.' A single API call with a good prompt isn't an agent: it's just an LLM call."
            </p>
            <p className="text-xs text-slate-300 mt-1">
              <strong>Rule of thumb:</strong> If there is no decision loop, no tool execution, and no observation feedback, it is simply <em>Prompt Engineering</em>, not an agent!
            </p>
          </div>

          {/* Gotcha 2 */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                Gotcha #2
              </span>
              <h3 className="text-base font-bold text-white">
                LLMs are Pattern Recognizers, NOT Omniscient Calculators
              </h3>
            </div>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              LLMs generate text based on statistical probabilities learned during training. They do <strong>not</strong> possess intrinsic calculators or real-time internet connections. That is why giving them <strong>Tools</strong> is non-negotiable for mathematical accuracy and fresh data.
            </p>
          </div>

          {/* Gotcha 3 */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                Key Capability
              </span>
              <h3 className="text-base font-bold text-white">
                What Has Emerged in Modern LLMs?
              </h3>
            </div>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Modern reasoning models have emerged with the ability to: (1) follow complex multi-step instructions, (2) chain information across long contexts, and (3) simulate step-by-step reasoning (Chain-of-Thought) before taking action.
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 6: INTERACTIVE KNOWLEDGE CHECK */}
      {/* ------------------------------------------------------------- */}
      <section className="space-y-5 pt-6 border-t border-slate-800/80">
        <div className="flex items-center gap-2 text-teal-400 font-mono text-xs uppercase tracking-wider">
          <CheckCircle2 className="w-4 h-4" />
          <span>Part 6 • Test Your Understanding</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Module 1.1 Knowledge Check
        </h2>

        <Module1_1Quiz />
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 7: SUMMARY & BRIDGE TO MODULE 1.2 */}
      {/* ------------------------------------------------------------- */}
      <section className="p-6 md:p-8 rounded-2xl border border-teal-500/30 bg-gradient-to-r from-teal-500/10 via-slate-900/90 to-transparent space-y-4">
        <div className="flex items-center gap-2 text-teal-400 font-mono text-xs font-bold uppercase">
          <Sparkles className="w-4 h-4" />
          <span>Part 7 • Summary & Next Steps</span>
        </div>

        <h3 className="text-xl md:text-2xl font-bold text-white">
          Congratulations! You've Completed Module 1.1 🎉
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm text-slate-300">
          <div>
            <strong className="text-white block mb-1">What You Mastered:</strong>
            <ul className="space-y-1 list-disc list-inside text-slate-300">
              <li>The 3 Pillars of an Agent: Autonomous, Goal-directed, Adaptive.</li>
              <li>The 4 Core Components: Reasoning, Tools, Memory, Sensors.</li>
              <li>The Perception-Action-Observation iterative loop.</li>
              <li>The critical pitfall: A single API call is NOT an agent.</li>
            </ul>
          </div>

          <div>
            <strong className="text-white block mb-1">Coming Next in Module 1.2:</strong>
            <p className="text-slate-300 leading-relaxed">
              In <strong>Module 1.2</strong>, we will explore the evolution from simple <em>Prompt Engineering</em> to <em>Chain-of-Thought</em>, <em>Prompt Chaining</em>, and <em>Context Engineering</em> for agents!
            </p>
          </div>
        </div>

        <div className="pt-4 flex items-center justify-between border-t border-slate-800">
          <span className="text-xs font-mono text-slate-400">
            Next: Module 1.2 (Prompt & Context Engineering)
          </span>

          <Link
            href="/learn/level-1/module-1-2"
            className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs font-mono flex items-center gap-1.5 transition"
          >
            <span>Proceed to Module 1.2</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </article>
  );
}
