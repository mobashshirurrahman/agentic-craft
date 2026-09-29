"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  Check,
  ArrowRight,
  Cpu,
  Zap,
  Wrench,
  Sliders,
  AlertTriangle,
  Sparkles,
  HelpCircle,
  Copy,
  CheckCheck,
  Play,
  RotateCcw,
  Terminal,
  FileText,
} from "lucide-react";
import PrebuiltAgentPlayground from "./PrebuiltAgentPlayground";
import Module2_1Quiz from "./Module2_1Quiz";

export default function Module2_1Content() {
  const [selectedPhase, setSelectedPhase] = useState<string>("perceive");
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [activeCodeTab, setActiveCodeTab] = useState<"code" | "output">("code");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);

  const reactPhases = [
    {
      id: "perceive",
      title: "1. Perceive",
      tagline: "Read & Understand",
      desc: "Agent receives the user message and inspects available tools. It reasons whether any tool is needed to answer the query.",
      icon: Cpu,
      color: "text-sky-600 dark:text-sky-400",
      bg: "bg-sky-50 dark:bg-sky-500/10",
      border: "border-sky-200 dark:border-sky-500/30",
      badge: "Phase 1",
      codeSnippet: `# Phase 1: Agent receives user input
agent = create_react_agent(model=model, tools=[calculate, get_weather])

# Invoke starts the ReAct loop
result = agent.invoke({
    "messages": [("user", "What is 42 * 17?")]
})
# LLM reads the input and decides: "I need calculate tool"`,
    },
    {
      id: "reason",
      title: "2. Reason",
      tagline: "Think & Plan",
      desc: "The LLM generates a structured tool call JSON specifying which tool to use and with which arguments. This is NOT guessing — it is reasoning from the JSON schema.",
      icon: Zap,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-500/10",
      border: "border-purple-200 dark:border-purple-500/30",
      badge: "Phase 2",
      codeSnippet: `# Phase 2: LLM emits structured tool call
# (This happens internally inside create_react_agent)
tool_call_output = {
    "name": "calculate",
    "args": {"expression": "42 * 17"},
    "id": "call_abc123"
}
# The agent runtime sees this and dispatches to Python`,
    },
    {
      id: "act",
      title: "3. Act",
      tagline: "Execute & Observe",
      desc: "The framework executes your Python @tool function with the extracted arguments. The return value is injected back as a ToolMessage into the conversation history.",
      icon: Wrench,
      color: "text-teal-600 dark:text-teal-400",
      bg: "bg-teal-50 dark:bg-teal-500/10",
      border: "border-teal-200 dark:border-teal-500/30",
      badge: "Phase 3",
      codeSnippet: `# Phase 3: Framework dispatches to your Python function
@tool
def calculate(expression: str) -> float:
    """Evaluates arithmetic expressions safely.
    Args: expression: A valid math string e.g. '42 * 17'
    """
    return eval(expression, {"__builtins__": None}, {})

# Result: 714.0 → injected as ToolMessage back to LLM`,
    },
    {
      id: "synthesize",
      title: "4. Synthesize",
      tagline: "Respond & Exit",
      desc: "The LLM receives the tool result and synthesizes a natural language final answer. If no more tools are needed, the loop terminates with an AIMessage.",
      icon: Sliders,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      border: "border-amber-200 dark:border-amber-500/30",
      badge: "Phase 4",
      codeSnippet: `# Phase 4: LLM synthesizes final answer
# Tool result 714.0 is injected as observation
# LLM now generates final AIMessage:
# "42 multiplied by 17 equals 714."

# Loop exits — no more tool calls in the output
print(result["messages"][-1].content)
# → "42 multiplied by 17 equals 714."`,
    },
  ];

  const currentPhase =
    reactPhases.find((p) => p.id === selectedPhase) || reactPhases[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentPhase.codeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setActiveCodeTab("output");
    setSimStep(1);
    setTimeout(() => setSimStep(2), 900);
    setTimeout(() => setSimStep(3), 1800);
    setTimeout(() => {
      setSimStep(4);
      setIsSimulating(false);
    }, 2800);
  };

  return (
    <div className="space-y-10 max-w-5xl mx-auto pb-16">
      {/* 🎯 TOP OBJECTIVE BANNER */}
      <section className="rounded-2xl border border-sky-200 dark:border-sky-500/30 bg-sky-50/60 dark:bg-sky-500/5 p-4 sm:p-6 backdrop-blur-sm shadow-sm">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-sky-600 text-white shrink-0 shadow-sm mt-0.5">
            <Target className="w-5 h-5" />
          </div>
          <div className="space-y-2 flex-1">
            <h2 className="text-sm font-mono uppercase tracking-wider text-sky-800 dark:text-sky-400 font-bold">
              🎯 By the end of this module, you will:
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
                <span>Run a 4-line LangGraph pre-built ReAct agent end-to-end</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
                <span>Understand the 4-phase Perceive → Reason → Act → Synthesize loop</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
                <span>Define type-hinted Python @tool functions that the LLM can call</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
                <span>Identify the 3 limitations of pre-built agents vs custom LangGraph graphs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: THE 4-PHASE REACT LOOP */}
      <section className="space-y-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/30 text-sky-700 dark:text-sky-300 text-xs font-mono font-semibold mb-2">
            <Zap className="w-3.5 h-3.5" />
            <span>Core Implementation • ReAct Pattern</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Running Your First Pre-Built Agent
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            A pre-built agent abstracts the entire ReAct state machine into a single function call — giving you a production-grade reasoning loop in 4 lines of Python.
          </p>
        </div>

        {/* 4 SYMMETRICAL CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {reactPhases.map((phase) => {
            const Icon = phase.icon;
            const isSelected = selectedPhase === phase.id;

            return (
              <button
                key={phase.id}
                onClick={() => setSelectedPhase(phase.id)}
                className={`p-3.5 sm:p-4 rounded-xl border text-left transition-all flex flex-col justify-between min-h-[145px] sm:min-h-[160px] active:scale-95 touch-manipulation cursor-pointer ${
                  isSelected
                    ? "border-sky-500 bg-white dark:bg-slate-900 shadow-md ring-2 ring-sky-500/20"
                    : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                <div className="space-y-2">
                  <div
                    className={`inline-flex p-1.5 rounded-lg ${phase.bg} border ${phase.border}`}
                  >
                    <Icon className={`w-4 h-4 ${phase.color}`} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">
                      {phase.title}
                    </div>
                    <div className={`text-[10px] font-mono ${phase.color} mt-0.5`}>
                      {phase.tagline}
                    </div>
                  </div>
                </div>
                <p className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-2">
                  {phase.desc}
                </p>
              </button>
            );
          })}
        </div>

        {/* CODE INSPECTOR */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className={`inline-flex p-1.5 rounded-lg ${currentPhase.bg} border ${currentPhase.border}`}
              >
                <currentPhase.icon
                  className={`w-4 h-4 ${currentPhase.color}`}
                />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  {currentPhase.title}: {currentPhase.tagline}
                </span>
                <span
                  className={`ml-2 text-[10px] font-mono px-2 py-0.5 rounded-full ${currentPhase.bg} ${currentPhase.color} border ${currentPhase.border}`}
                >
                  {currentPhase.badge}
                </span>
              </div>
            </div>
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer"
            >
              {copiedCode ? (
                <CheckCheck className="w-3.5 h-3.5 text-emerald-500" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              {copiedCode ? "Copied!" : "Copy"}
            </button>
          </div>

          {/* TABBED CODE / OUTPUT */}
          <div className="rounded-xl border border-slate-800 overflow-hidden bg-slate-950">
            <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-slate-800">
              <div className="flex gap-1">
                {(["code", "output"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveCodeTab(tab)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono transition-all cursor-pointer ${
                      activeCodeTab === tab
                        ? "bg-slate-700 text-white"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {tab === "code" ? (
                      <FileText className="w-3 h-3" />
                    ) : (
                      <Terminal className="w-3 h-3" />
                    )}
                    {tab === "code" ? "Python Code" : "Output Terminal"}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                {simStep > 0 && (
                  <button
                    onClick={() => { setSimStep(0); setActiveCodeTab("code"); }}
                    className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset
                  </button>
                )}
                <button
                  onClick={handleRunSimulation}
                  disabled={isSimulating}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-sky-600 hover:bg-sky-500 text-white text-xs font-mono transition-all disabled:opacity-50 cursor-pointer"
                >
                  <Play className="w-3 h-3" />
                  {isSimulating ? "Running..." : "Run"}
                </button>
              </div>
            </div>

            <div className="p-4 min-h-[140px] font-mono text-xs">
              {activeCodeTab === "code" ? (
                <pre className="text-slate-300 whitespace-pre-wrap leading-relaxed">
                  {currentPhase.codeSnippet}
                </pre>
              ) : (
                <div className="space-y-2 text-slate-300">
                  {simStep === 0 && (
                    <div className="text-slate-500 italic">
                      Click &apos;Run&apos; to execute...
                    </div>
                  )}
                  {simStep >= 1 && (
                    <div className="text-sky-400">
                      ➜ [AGENT STARTED] create_react_agent invoked with 2 tools
                    </div>
                  )}
                  {simStep >= 2 && (
                    <div className="text-slate-400 pl-4">
                      [LLM REASONING] &quot;User wants 42 * 17. I have a calculate tool. Let me use it.&quot;
                      <br />
                      <span className="text-purple-400">
                        ✔ Tool call emitted: calculate(expression=&quot;42 * 17&quot;)
                      </span>
                    </div>
                  )}
                  {simStep >= 3 && (
                    <div className="text-purple-300">
                      ➜ [TOOL EXECUTION] calculate(&quot;42 * 17&quot;) → 714.0
                    </div>
                  )}
                  {simStep >= 4 && (
                    <div className="text-emerald-400 font-bold pt-2 border-t border-slate-800">
                      ✔ [AGENT RESPONSE] &quot;42 multiplied by 17 equals 714.&quot;
                      <br />
                      <span className="text-slate-400 font-normal text-[10px]">Loop terminated — no further tool calls needed.</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: VISUAL ANALOGY */}
      <section className="space-y-4">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
          <div className="px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              📚 Mental Model: Library → Master Chef
            </h3>
          </div>
          <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-2">
              <div className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 uppercase">
                ❌ Raw LLM Call
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                You send a message, get a response. Like asking a librarian to guess a recipe — it will try, but it can&apos;t actually cook. No tools, no loop, no real actions.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-sky-200 dark:border-sky-500/30 bg-sky-50 dark:bg-sky-500/10 space-y-2">
              <div className="text-xs font-mono font-bold text-sky-700 dark:text-sky-400 uppercase">
                ✅ Pre-Built Agent
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                A master chef who reads the order (perceive), plans the steps (reason), cooks each dish (act), and serves the result (synthesize). The full loop runs autonomously.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: INTERACTIVE PLAYGROUND */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
            🔬 See It in Action: Pre-Built Agent Playground
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Watch the full ReAct loop run live — inspect tool dispatch, observation injection, and final synthesis in real-time.
          </p>
        </div>
        <PrebuiltAgentPlayground />
      </section>

      {/* SECTION 4: HANDWRITTEN NOTES */}
      <section className="space-y-3">
        <div className="p-4 rounded-xl border border-amber-300 dark:border-amber-500/30 bg-amber-50/90 dark:bg-amber-500/10 shadow-sm">
          <span className="font-['Caveat',cursive] text-base text-amber-950 dark:text-amber-200 block sm:-rotate-0.5">
            ✍️ Instructor Note: &quot;The LLM never sees your Python function body — only the JSON Schema generated from your docstrings. Write perfect docstrings or the LLM will use the tool incorrectly!&quot;
          </span>
        </div>
        <div className="p-4 rounded-xl border border-teal-200 dark:border-teal-500/30 bg-teal-50/90 dark:bg-teal-500/10 shadow-sm">
          <span className="font-['Caveat',cursive] text-base text-teal-950 dark:text-teal-200 block">
            💡 Mental Model: Think of the ReAct loop as a GPS navigation system — it checks current position (perceive), calculates next step (reason), takes the turn (act), then recalculates based on the new road ahead (synthesize).
          </span>
        </div>
        <div className="p-4 rounded-xl border border-sky-200 dark:border-sky-500/30 bg-sky-50/90 dark:bg-sky-500/10 shadow-sm">
          <span className="font-['Caveat',cursive] text-base text-sky-950 dark:text-sky-200 block">
            📌 Core Rule: Pre-built agents use a hardcoded message list as state. If you need custom fields (user ID, permissions, session data), you MUST build a custom StateGraph — pre-built won&apos;t cut it.
          </span>
        </div>
        <div className="p-4 rounded-xl border border-violet-200 dark:border-violet-500/30 bg-violet-50/90 dark:bg-violet-500/10 shadow-sm">
          <span className="font-['Caveat',cursive] text-base text-violet-950 dark:text-violet-200 block">
            📝 Pro Tip: Always set temperature=0.0 for tool-calling agents. Non-zero temperature introduces random variation in tool selection, causing flaky non-deterministic test failures!
          </span>
        </div>
      </section>

      {/* SECTION 5: TRAPS */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          <span>Common Pre-Built Agent Traps</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-500/30 bg-rose-50/50 dark:bg-rose-500/5 space-y-2">
            <span className="text-xs font-mono font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider block">
              TRAP #1: The Prototype-to-Production Illusion
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Pre-built agents have no retry logic, rate limit handling, structured logging, or custom state. Shipping one to production without wrapping it in error handling is a 3am incident waiting to happen.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-500/5 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
              TRAP #2: Missing Docstrings in @tool Functions
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              The LLM literally reads your docstring to know WHEN to use a tool. An empty or vague docstring causes the agent to either never call the tool, or call it with hallucinated arguments.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6: KEY TAKEAWAYS */}
      <section className="rounded-xl border border-sky-200 dark:border-sky-500/30 bg-sky-50/50 dark:bg-sky-500/5 p-5 space-y-3">
        <h4 className="font-bold text-sm text-sky-900 dark:text-sky-300 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-sky-600 dark:text-sky-400" />
          <span>Key Takeaways</span>
        </h4>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          <li className="flex items-start gap-2">
            <span className="text-sky-600 dark:text-sky-400 font-bold">1.</span>
            <span><strong>4 Lines to a Working Agent:</strong> <code>create_react_agent</code> builds the full state machine — perceive, reason, act, synthesize — without any manual loop code.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-sky-600 dark:text-sky-400 font-bold">2.</span>
            <span><strong>Docstrings Are the API Contract:</strong> The LLM only sees your function&apos;s name, type hints, and docstring — never the function body. Write them as LLM instructions, not for human readers.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-sky-600 dark:text-sky-400 font-bold">3.</span>
            <span><strong>Prototype Fast, Graduate to Custom:</strong> Pre-built agents are exceptional for proving a concept in 10 minutes. Production workloads need custom LangGraph state graphs with proper observability.</span>
          </li>
        </ul>
      </section>

      {/* SECTION 7: QUIZ */}
      <section className="space-y-3">
        <button
          onClick={() => setShowQuiz(!showQuiz)}
          className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all text-left shadow-xs cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                Concept Check: Pre-Built Agents
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {showQuiz ? "Click to collapse" : "Test your ReAct agent intuition (3 questions)"}
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-semibold px-3 py-1.5 rounded-lg bg-sky-50 dark:bg-sky-500/10 text-sky-700 dark:text-sky-400 border border-sky-200 dark:border-sky-500/30">
            {showQuiz ? "Hide Quiz" : "Start Quiz"}
          </span>
        </button>

        <AnimatePresence>
          {showQuiz && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Module2_1Quiz />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* SECTION 8: NEXT MODULE BRIDGE */}
      <section className="rounded-2xl border border-sky-200 dark:border-sky-500/30 bg-gradient-to-r from-sky-50 via-white to-slate-50 dark:from-sky-500/10 dark:via-slate-900 dark:to-slate-950 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-sky-700 dark:text-sky-400 uppercase tracking-wider">
            <span>Up Next • Module 2.2</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Structured Outputs with JSON &amp; Pydantic
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
            Enforce strict output schemas with Pydantic BaseModel so your agents always return well-formed, type-safe data — eliminating JSON parsing failures in production.
          </p>
        </div>
        <Link
          href="/learn/level-2/module-2-2"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow-sky-500/20 transition-all shrink-0 cursor-pointer"
        >
          <span>Continue to Module 2.2</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
