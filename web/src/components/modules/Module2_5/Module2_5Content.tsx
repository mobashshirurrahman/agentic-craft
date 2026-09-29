"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  Check,
  ArrowRight,
  Terminal,
  Cpu,
  Layers,
  Code2,
  AlertTriangle,
  Sparkles,
  HelpCircle,
  Copy,
  CheckCheck,
  Play,
  RotateCcw,
  FileText,
  Workflow,
  Search,
} from "lucide-react";
import ScratchAgentDebugger from "./ScratchAgentDebugger";
import Module2_5Quiz from "./Module2_5Quiz";

export default function Module2_5Content() {
  const [selectedPillar, setSelectedPillar] = useState<string>("contract");
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [activeCodeTab, setActiveCodeTab] = useState<"code" | "output">("code");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);

  const pillars = [
    {
      id: "contract",
      title: "1. The ReAct Prompt Contract",
      tagline: "Thought • Action • PAUSE • Observation",
      desc: "Before JSON tool calling existed, ReAct governed agent execution using a rigid text grammar. The LLM produces Thought + Action, then stops at PAUSE so Python can execute the tool.",
      icon: Terminal,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-500/10",
      border: "border-purple-200 dark:border-purple-500/30",
      badge: "Grammar Contract",
      codeSnippet: `# 1. SYSTEM PROMPT: Enforcing the strict ReAct grammar
REACT_SYSTEM_PROMPT = """
You run in a loop of Thought, Action, PAUSE, Observation.
At the end of the loop you output an Answer.

Use Thought to describe your thoughts about the question you have been asked.
Use Action to run one of the actions available to you - then return PAUSE.
Observation will be the result of running those actions.

Your available actions are:
calculate:
e.g. calculate: 4 * 7 / 3
Runs a calculation and returns the number

get_planet_mass:
e.g. get_planet_mass: Jupiter
Returns the mass of a celestial body

Example session:
Question: What is the mass of Earth times 2?
Thought: I need to find the mass of Earth first.
Action: get_planet_mass: Earth
PAUSE
""".strip()`,
    },
    {
      id: "regex",
      title: "2. Regex Action Parsing",
      tagline: "Extracting Intent from Free Text",
      desc: "The agent engine searches the raw text completion using regex to extract action_name and action_input. If PAUSE is detected without an action, it gracefully re-prompts.",
      icon: Search,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-500/10",
      border: "border-blue-200 dark:border-blue-500/30",
      badge: "re.compile()",
      codeSnippet: `import re

# Regex to capture: Action: <tool_name>: <tool_input>
ACTION_REGEX = re.compile(r"^Action:\\s*([a-zA-Z0-9_]+):\\s*(.*?)$", re.MULTILINE)

def parse_action(text: str):
    """Scans raw model output for the Action: tool: arg pattern."""
    match = ACTION_REGEX.search(text)
    if match:
        tool_name = match.group(1).strip()
        tool_arg = match.group(2).strip()
        return tool_name, tool_arg
    return None, None

# Test parser
sample_output = "Thought: I should calculate this.\\nAction: calculate: 18 * 4\\nPAUSE"
tool, arg = parse_action(sample_output)
print(f"Parsed Tool: {tool}, Arg: {arg}")
# -> Parsed Tool: calculate, Arg: 18 * 4`,
    },
    {
      id: "dispatch",
      title: "3. Action Dispatcher",
      tagline: "Dictionary-Driven Execution",
      desc: "Tools are stored in a standard Python dictionary mapping strings to callables. The engine inspects the tool name, looks up the function, executes it safely, and catches errors.",
      icon: Cpu,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      border: "border-emerald-200 dark:border-emerald-500/30",
      badge: "dict[str, Callable]",
      codeSnippet: `# 3. ACTION DISPATCH TABLE: Pure Python functions
def calculate(expr: str) -> str:
    """Safely evaluates basic mathematical arithmetic."""
    try:
        # In production, use AST parsing rather than raw eval
        return str(eval(expr, {"__builtins__": None}, {}))
    except Exception as e:
        return f"Error evaluating expression: {e}"

def get_planet_mass(planet: str) -> str:
    masses = {"earth": "5.972e24 kg", "jupiter": "1.898e27 kg", "mars": "6.39e23 kg"}
    return masses.get(planet.lower().strip(), f"Unknown planet: {planet}")

# Registered tool registry
KNOWN_ACTIONS = {
    "calculate": calculate,
    "get_planet_mass": get_planet_mass,
}`,
    },
    {
      id: "loop",
      title: "4. The Agent Loop & Class",
      tagline: "The Autonomous While Engine",
      desc: "The complete Agent class maintains an internal message list, invokes the model in a while loop, appends observations, and enforces a hard max_iterations boundary to stop infinite loops.",
      icon: Workflow,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      border: "border-amber-200 dark:border-amber-500/30",
      badge: "while turns < max",
      codeSnippet: `class ScratchAgent:
    def __init__(self, system_prompt: str, actions: dict, client, max_turns: int = 5):
        self.system = system_prompt
        self.actions = actions
        self.client = client
        self.max_turns = max_turns
        self.messages = []

    def __call__(self, message: str) -> str:
        self.messages.append({"role": "user", "content": message})
        turns = 0
        
        while turns < self.max_turns:
            turns += 1
            # 1. Query the LLM
            response = self.client.chat(messages=self.messages, system=self.system)
            self.messages.append({"role": "assistant", "content": response})
            
            # 2. Check for Action
            tool, arg = parse_action(response)
            if not tool:
                # No action means final answer achieved
                return response
                
            # 3. Dispatch & inject Observation
            if tool in self.actions:
                obs = self.actions[tool](arg)
                self.messages.append({"role": "user", "content": f"Observation: {obs}"})
            else:
                self.messages.append({"role": "user", "content": f"Observation: Tool {tool} not found."})

        return "Max execution turns exceeded without final answer."`,
    },
  ];

  const currentSnippet = pillars.find((p) => p.id === selectedPillar)?.codeSnippet || "";

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const runSimulation = () => {
    setIsSimulating(true);
    setSimStep(1);
    setTimeout(() => setSimStep(2), 700);
    setTimeout(() => setSimStep(3), 1400);
    setTimeout(() => {
      setSimStep(4);
      setIsSimulating(false);
    }, 2100);
  };

  return (
    <div className="space-y-10">
      {/* HERO BANNER */}
      <div className="rounded-2xl border border-purple-200 dark:border-purple-500/30 bg-gradient-to-br from-purple-500/10 via-indigo-500/5 to-slate-50 dark:to-slate-950 p-6 md:p-8 relative overflow-hidden transition-colors">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/30">
              Module 2.5 • Architecture Deep Dive
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              ~20 min interactive
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Create an Agent Class from Scratch in Python
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Strip away LangChain, LangGraph, and CrewAI. In this lesson, we build a <strong>complete autonomous Agent class in vanilla Python</strong> to master the raw mechanics of message state, regex action parsing, function dispatching, and loop control.
          </p>
        </div>
      </div>

      {/* SECTION 1: 4 PILLARS OF A SCRATCH AGENT */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-500" />
            1. Core Architecture of a Vanilla Python Agent
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Select a component to inspect
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            const isSelected = selectedPillar === pillar.id;
            return (
              <button
                key={pillar.id}
                onClick={() => setSelectedPillar(pillar.id)}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? `${pillar.border} ${pillar.bg} shadow-md ring-1 ring-purple-500/50`
                    : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className={`p-2 rounded-lg ${pillar.bg} ${pillar.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 font-semibold">
                      {pillar.badge}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    {pillar.title}
                  </h3>
                  <div className="text-[11px] font-medium text-purple-600 dark:text-purple-400">
                    {pillar.tagline}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* SECTION 2: CODE & EXECUTION INSPECTOR */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-purple-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white font-mono uppercase tracking-wider">
              Python Implementation Inspector
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={runSimulation}
              disabled={isSimulating}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-xs disabled:opacity-50 transition-all cursor-pointer"
            >
              {isSimulating ? (
                <>
                  <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                  <span>Simulating...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Run Step-Through</span>
                </>
              )}
            </button>
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 text-slate-600 dark:text-slate-400 text-xs font-mono transition-all cursor-pointer"
            >
              {copiedCode ? <CheckCheck className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? "Copied" : "Copy"}</span>
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden text-xs font-mono shadow-md">
          <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800/80 bg-slate-900/60">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
              <span className="text-slate-400 text-[11px] ml-2 font-mono">
                scratch_agent.py • {selectedPillar}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveCodeTab("code")}
                className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition-all ${
                  activeCodeTab === "code"
                    ? "bg-purple-600/30 text-purple-300 border border-purple-500/40"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Code
              </button>
              <button
                onClick={() => setActiveCodeTab("output")}
                className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition-all ${
                  activeCodeTab === "output"
                    ? "bg-purple-600/30 text-purple-300 border border-purple-500/40"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Terminal Output
              </button>
            </div>
          </div>

          <div className="p-4 overflow-x-auto text-slate-300 leading-relaxed font-mono">
            {activeCodeTab === "code" ? (
              <pre>
                <code>{currentSnippet}</code>
              </pre>
            ) : (
              <div className="space-y-2 text-emerald-400 font-mono text-[11px]">
                <p className="text-slate-400">$ python scratch_agent.py</p>
                <p className="text-purple-300">[Turn 1] Prompt: "What is 18 multiplied by 4?"</p>
                <p className="text-sky-300">&gt;&gt; LLM Response: Thought: I need to multiply 18 by 4.\nAction: calculate: 18 * 4\nPAUSE</p>
                <p className="text-amber-300">&gt;&gt; Dispatching: calculate("18 * 4")</p>
                <p className="text-emerald-300">&gt;&gt; Observation: 72</p>
                <p className="text-purple-300">[Turn 2] Injecting Observation into message history</p>
                <p className="text-sky-300">&gt;&gt; LLM Response: Thought: I now have the calculation result.\nAnswer: 18 multiplied by 4 is 72.</p>
                <p className="text-emerald-400 font-bold">&gt;&gt; Loop finished in 2 turns. Final answer returned!</p>
              </div>
            )}
          </div>
        </div>

        {/* Simulation Banner */}
        {simStep > 0 && (
          <div className="p-3.5 rounded-xl border border-purple-200 dark:border-purple-500/30 bg-purple-50/80 dark:bg-purple-950/30 flex items-center justify-between text-xs font-mono">
            <span className="text-purple-800 dark:text-purple-200">
              {simStep === 1 && "Turn 1: User message sent -> Model generates Thought + Action: calculate: 18 * 4"}
              {simStep === 2 && "Turn 1: Action regex matches -> Dispatching calculate() in Python"}
              {simStep === 3 && "Turn 2: Tool returns '72' -> Observation fed back to Model"}
              {simStep === 4 && "Turn 2: Model outputs final Answer -> Agent returns string without tool call"}
            </span>
            <span className="text-purple-600 dark:text-purple-400 font-bold">
              Step {simStep}/4
            </span>
          </div>
        )}
      </section>

      {/* SECTION 3: INTERACTIVE STUDIO */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            2. Interactive Scratch Agent Debugger
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Step-by-Step Message Memory
          </span>
        </div>
        <ScratchAgentDebugger />
      </section>

      {/* SECTION 4: HANDWRITTEN NOTE */}
      <div className="p-4 rounded-xl border border-purple-200 dark:border-purple-500/30 bg-purple-50/90 dark:bg-purple-500/10 shadow-sm">
        <span className="font-['Caveat',cursive] text-base text-purple-950 dark:text-purple-200 block">
          📌 Production Insight: Every framework you use (LangGraph, CrewAI, AutoGen) is fundamentally this while loop + message list + function dispatcher. Never treat them as black boxes. When an agent breaks in production, 90% of failures are either a regex/JSON parse failure or an unbounded loop missing a max_turns ceiling.
        </span>
      </div>

      {/* SECTION 5: TRAPS & PITFALLS */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          Common Engineering Traps
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-500/30 bg-rose-50/50 dark:bg-rose-500/5 space-y-2">
            <span className="text-xs font-mono font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider block">
              TRAP #1: Unbounded While Loops
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              If an agent enters a state where the LLM repeats the same failing tool call indefinitely, an unbounded <code>while True:</code> loop will rapidly drain your API quota and spike latency. Always enforce a strict <code>max_turns</code> parameter (typically 5 to 10 iterations max).
            </p>
          </div>
          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-500/5 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
              TRAP #2: Using raw eval() for Calculations
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Allowing an agent to pass arbitrary string arguments into Python&apos;s native <code>eval()</code> or <code>exec()</code> introduces catastrophic Remote Code Execution (RCE) vulnerabilities. Always sanitize expressions using AST parsing or dedicated math parsers like <code>numexpr</code>.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6: KEY TAKEAWAYS */}
      <section className="rounded-xl border border-purple-200 dark:border-purple-500/30 bg-purple-50/50 dark:bg-purple-500/5 p-5 space-y-3">
        <h4 className="font-bold text-sm text-purple-900 dark:text-purple-300 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          Key Architectural Takeaways
        </h4>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          {[
            ["1.", "Three Core State Elements:", "A stateful agent only needs three things: a system prompt contract, a mutable message history list, and a dictionary of callable Python functions."],
            ["2.", "The ReAct Loop Cycle:", "The cycle consists of Model Invocation -> Action Parsing -> Local Function Dispatch -> Observation Injection. This repeats until the model emits an Answer."],
            ["3.", "Framework Decoupling:", "Understanding this architecture allows you to easily debug LangGraph or CrewAI traces, because you know what every node and edge translates to under the hood."],
          ].map(([n, bold, rest]) => (
            <li key={n} className="flex items-start gap-2">
              <span className="text-purple-600 dark:text-purple-400 font-bold">{n}</span>
              <span><strong>{bold}</strong> {rest}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* SECTION 7: QUIZ */}
      <section className="space-y-3">
        <button
          onClick={() => setShowQuiz(!showQuiz)}
          className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all text-left cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                Concept Check: Scratch Agent Mechanics
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {showQuiz ? "Click to collapse" : "Test your understanding of the vanilla agent loop (3 questions)"}
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-semibold px-3 py-1.5 rounded-lg bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-500/30">
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
              <Module2_5Quiz />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* SECTION 8: NEXT MODULE BRIDGE */}
      <section className="rounded-2xl border border-purple-200 dark:border-purple-500/30 bg-gradient-to-r from-purple-50 via-white to-slate-50 dark:from-purple-500/10 dark:via-slate-900 dark:to-slate-950 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-purple-700 dark:text-purple-400 uppercase tracking-wider">
            <span>Up Next • Module 2.6</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Building Tools with Schema Validation (Pydantic)</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
            Upgrade from fragile text parsing to industry-standard Pydantic schemas. Learn how modern LLMs use function calling with type-enforced JSON validation.
          </p>
        </div>
        <Link
          href="/learn/level-2/module-2-6"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow-purple-500/20 transition-all shrink-0 cursor-pointer"
        >
          <span>Continue to Module 2.6</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
