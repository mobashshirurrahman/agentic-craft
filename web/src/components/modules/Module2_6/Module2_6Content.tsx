"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  Check,
  ArrowRight,
  RotateCcw,
  Sparkles,
  HelpCircle,
  Copy,
  CheckCheck,
  Play,
  FileText,
  AlertTriangle,
  Code2,
  Workflow,
  ShieldAlert,
  Zap,
  Clock,
  Layers,
} from "lucide-react";
import AgentLoopSimulator from "./AgentLoopSimulator";
import Module2_6Quiz from "./Module2_6Quiz";

export default function Module2_6Content() {
  const [selectedPillar, setSelectedPillar] = useState<string>("while_engine");
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [activeCodeTab, setActiveCodeTab] = useState<"code" | "output">("code");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);

  const pillars = [
    {
      id: "while_engine",
      title: "1. Iterative While Engine",
      tagline: "Autonomous Turn Orchestration",
      desc: "Multi-step reasoning requires repeated transitions: Model generates Thought + Tool Call -> Dispatcher executes -> Context updates -> Next Turn. The loop drives this orchestrator.",
      icon: RotateCcw,
      color: "text-sky-600 dark:text-sky-400",
      bg: "bg-sky-50 dark:bg-sky-500/10",
      border: "border-sky-200 dark:border-sky-500/30",
      badge: "Turn Engine",
      codeSnippet: `# 1. THE MULTI-STEP WHILE LOOP ENGINE
def run_agent_loop(agent, user_query: str, max_turns: int = 6) -> str:
    """Executes Thought-Action-Observation loop until completion."""
    agent.add_user_message(user_query)
    
    for turn in range(1, max_turns + 1):
        print(f"--- [Turn {turn}/{max_turns}] ---")
        
        # 1. Model evaluates state and decides whether to act
        step_response = agent.step()
        
        # 2. Check termination: Has model produced a final answer?
        if step_response.is_final:
            return step_response.final_content
            
        # 3. Dispatch tool execution
        tool_name = step_response.action_name
        tool_args = step_response.action_args
        observation = agent.dispatch(tool_name, tool_args)
        
        # 4. Append observation back into conversation context
        agent.add_observation(tool_name, observation)

    return "Error: Agent reached maximum iterations without reaching conclusion."`,
    },
    {
      id: "termination",
      title: "2. Termination Detection",
      tagline: "Recognizing Task Completion",
      desc: "An agent must unambiguously signal when it has gathered enough information. In function-calling models, this occurs when tool_calls is empty and text response is non-empty.",
      icon: Zap,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      border: "border-emerald-200 dark:border-emerald-500/30",
      badge: "Exit Condition",
      codeSnippet: `# 2. EXIT CONDITION LOGIC
class StepResult:
    def __init__(self, raw_llm_response):
        self.message = raw_llm_response
        self.tool_calls = getattr(raw_llm_response, "tool_calls", [])
        
    @property
    def is_final(self) -> bool:
        # Exit condition: If model didn't call any tools, it answered the query
        return len(self.tool_calls) == 0
        
    @property
    def final_content(self) -> str:
        return self.message.content or "No content returned."
        
    @property
    def action_name(self) -> str:
        return self.tool_calls[0]["name"] if self.tool_calls else ""
        
    @property
    def action_args(self) -> dict:
        return self.tool_calls[0]["args"] if self.tool_calls else {}`,
    },
    {
      id: "circuit_breaker",
      title: "3. Loop Circuit Breakers",
      tagline: "Preventing Doom Loops",
      desc: "Agents can get trapped in repetitive loops: calling the exact same failing tool with the exact same arguments repeatedly. A circuit breaker tracks previous calls and forces recovery.",
      icon: ShieldAlert,
      color: "text-rose-600 dark:text-rose-400",
      bg: "bg-rose-50 dark:bg-rose-500/10",
      border: "border-rose-200 dark:border-rose-500/30",
      badge: "Repeat Detector",
      codeSnippet: `# 3. CIRCUIT BREAKER: Repetition Detection
class CircuitBreaker:
    def __init__(self, max_consecutive_repeats: int = 2):
        self.history = []
        self.max_repeats = max_consecutive_repeats

    def check(self, tool_name: str, tool_args: dict):
        call_signature = (tool_name, str(sorted(tool_args.items())))
        
        # Count consecutive identical calls
        consecutive = 0
        for past_call in reversed(self.history):
            if past_call == call_signature:
                consecutive += 1
            else:
                break
                
        self.history.append(call_signature)
        
        if consecutive >= self.max_repeats:
            raise RuntimeError(
                f"Loop Aborted: Model called '{tool_name}' with {tool_args} "
                f"{consecutive + 1} times consecutively without state progression!"
            )`,
    },
    {
      id: "history_compaction",
      title: "4. History Compaction",
      tagline: "Preserving Context Window",
      desc: "In an 8-turn loop with large tool observations (e.g. web HTML or DB dumps), token usage explodes. History compaction truncates older observations to keep prompt tokens predictable.",
      icon: Layers,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      border: "border-amber-200 dark:border-amber-500/30",
      badge: "Token Hygiene",
      codeSnippet: `# 4. OBSERVATION TRUNCATION & COMPACTION
def compact_history(messages: list, max_obs_chars: int = 1500) -> list:
    """Truncates verbose tool observations from earlier loop turns."""
    compacted = []
    
    for i, msg in enumerate(messages):
        # Keep recent turns intact, compact older observation turns
        is_recent = i >= len(messages) - 3
        
        if msg.get("role") == "tool" and not is_recent:
            raw_content = msg.get("content", "")
            if len(raw_content) > max_obs_chars:
                summary = (
                    raw_content[:max_obs_chars] + 
                    f"\\n... [Truncated {len(raw_content) - max_obs_chars} chars by Loop Manager] ..."
                )
                compacted.append({**msg, "content": summary})
                continue
                
        compacted.append(msg)
    return compacted`,
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
      <div className="rounded-2xl border border-sky-200 dark:border-sky-500/30 bg-gradient-to-br from-sky-500/10 via-teal-500/5 to-slate-50 dark:to-slate-950 p-6 md:p-8 relative overflow-hidden transition-colors">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-sky-500/20 text-sky-700 dark:text-sky-300 border border-sky-500/30">
              Module 2.6 • Core Implementation
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              ~20 min interactive
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Implementing Loops for Multi-Step Agent Tasks
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Real problems cannot be solved in a single prompt. Master the architecture of <strong>multi-turn execution loops</strong>: handling exit criteria, implementing repetitive-call circuit breakers, and preserving context across prolonged task execution.
          </p>
        </div>
      </div>

      {/* SECTION 1: 4 PILLARS OF MULTI-STEP LOOPS */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-sky-500" />
            1. Core Mechanics of the Agent Loop
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Select a mechanism to inspect
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
                    ? `${pillar.border} ${pillar.bg} shadow-md ring-1 ring-sky-500/50`
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
                  <div className="text-[11px] font-medium text-sky-600 dark:text-sky-400">
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
            <Code2 className="w-4 h-4 text-sky-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white font-mono uppercase tracking-wider">
              Loop Engine Implementation
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={runSimulation}
              disabled={isSimulating}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold shadow-xs disabled:opacity-50 transition-all cursor-pointer"
            >
              {isSimulating ? (
                <>
                  <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                  <span>Iterating...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Simulate Multi-Turn Loop</span>
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
                agent_loop.py • {selectedPillar}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveCodeTab("code")}
                className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition-all ${
                  activeCodeTab === "code"
                    ? "bg-sky-600/30 text-sky-300 border border-sky-500/40"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Code
              </button>
              <button
                onClick={() => setActiveCodeTab("output")}
                className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition-all ${
                  activeCodeTab === "output"
                    ? "bg-sky-600/30 text-sky-300 border border-sky-500/40"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Trace Output
              </button>
            </div>
          </div>

          <div className="p-4 overflow-x-auto text-slate-300 leading-relaxed font-mono">
            {activeCodeTab === "code" ? (
              <pre>
                <code>{currentSnippet}</code>
              </pre>
            ) : (
              <div className="space-y-2 text-sky-400 font-mono text-[11px]">
                <p className="text-slate-400">$ python run_agent_loop.py --query "Find latest stock of SKU #901 and recalculate discount"</p>
                <p className="text-amber-300">[Turn 1/6] Model: Calling tool `lookup_inventory(sku=901)`</p>
                <p className="text-slate-300">&gt;&gt; Dispatching tool... Observation: {"{ 'in_stock': 12, 'base_price': 150 }"}</p>
                <p className="text-amber-300">[Turn 2/6] Model: Calling tool `apply_tier_discount(price=150, units=12)`</p>
                <p className="text-slate-300">&gt;&gt; Dispatching tool... Observation: {"{ 'discounted_price': 127.50, 'savings': '15%' }"}</p>
                <p className="text-emerald-400 font-bold">[Turn 3/6] Model: tool_calls=[] -&gt; is_final=True</p>
                <p className="text-emerald-300">&gt;&gt; Final Answer: SKU #901 has 12 units in stock. With 15% bulk discount, unit price is $127.50.</p>
                <p className="text-sky-300 font-semibold">&gt;&gt; Loop finished successfully in 3 turns (3 tools, 0 repeated calls).</p>
              </div>
            )}
          </div>
        </div>

        {/* Simulation Banner */}
        {simStep > 0 && (
          <div className="p-3.5 rounded-xl border border-sky-200 dark:border-sky-500/30 bg-sky-50/80 dark:bg-sky-950/30 flex items-center justify-between text-xs font-mono">
            <span className="text-sky-800 dark:text-sky-200">
              {simStep === 1 && "Turn 1: User prompt ingested -> Model requests tool `lookup_inventory`"}
              {simStep === 2 && "Turn 1: Inventory returned -> Injected to history -> Turn 2 triggered"}
              {simStep === 3 && "Turn 2: Model requests tool `apply_tier_discount` -> Circuit breaker checks signature"}
              {simStep === 4 && "Turn 3: Model receives calculation -> Emits final answer -> is_final=True exit!"}
            </span>
            <span className="text-sky-600 dark:text-sky-400 font-bold">
              Turn {simStep}/4
            </span>
          </div>
        )}
      </section>

      {/* SECTION 3: INTERACTIVE STUDIO */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-sky-500" />
            2. Interactive Agent Loop Simulator
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Live Multi-Turn State Machine
          </span>
        </div>
        <AgentLoopSimulator />
      </section>

      {/* SECTION 4: HANDWRITTEN NOTE */}
      <div className="p-4 rounded-xl border border-sky-200 dark:border-sky-500/30 bg-sky-50/90 dark:bg-sky-500/10 shadow-sm">
        <span className="font-['Caveat',cursive] text-base text-sky-950 dark:text-sky-200 block">
          📌 Loop Rule of Thumb: Always treat tool observations as untrusted and potentially massive. An agent loop that ingests an entire 50KB JSON response without truncation will exhaust a 128k context window in fewer than 4 turns. Compress early, cap turns strictly!
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
              TRAP #1: The Error Re-try Doom Loop
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              When a tool throws an exception (e.g. <code>UserNotFoundError</code>), poorly written loops return the raw error message to the LLM. If the model has no alternative tool, it re-attempts the exact same call 10 times until crashing. Always provide explicit error hints or prompt the model to request user clarification.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-500/5 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
              TRAP #2: Context Window Accumulation
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              As loop iterations climb from 1 to 8, the accumulated conversation history grows quadratically in cost and latency. Without history compaction or sliding window trimming, later turns become 5x slower and increasingly prone to hallucination.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6: KEY TAKEAWAYS */}
      <section className="rounded-xl border border-sky-200 dark:border-sky-500/30 bg-sky-50/50 dark:bg-sky-500/5 p-5 space-y-3">
        <h4 className="font-bold text-sm text-sky-900 dark:text-sky-300 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-sky-600 dark:text-sky-400" />
          Key Architectural Takeaways
        </h4>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          {[
            ["1.", "Deterministic Termination:", "Never rely on the LLM saying 'I am finished' in natural text. Rely on the structural absence of tool_calls in the model response object."],
            ["2.", "Circuit Breakers Save Budgets:", "A simple hash-based repeat detector prevents 99% of infinite loop billing disasters in autonomous production runs."],
            ["3.", "Graduation to Graph Paradigms:", "While-loops work well for single agents, but branching, conditional routing, and checkpoints quickly turn a raw while-loop into spaghetti code — which is why LangGraph was created."],
          ].map(([n, bold, rest]) => (
            <li key={n} className="flex items-start gap-2">
              <span className="text-sky-600 dark:text-sky-400 font-bold">{n}</span>
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
            <div className="p-2 rounded-lg bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                Concept Check: Multi-Step Loops
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {showQuiz ? "Click to collapse" : "Test your understanding of iteration loops and circuit breakers (3 questions)"}
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
              <Module2_6Quiz />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* SECTION 8: NEXT MODULE BRIDGE */}
      <section className="rounded-2xl border border-sky-200 dark:border-sky-500/30 bg-gradient-to-r from-sky-50 via-white to-slate-50 dark:from-sky-500/10 dark:via-slate-900 dark:to-slate-950 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-sky-700 dark:text-sky-400 uppercase tracking-wider">
            <span>Up Next • Module 2.7</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Understanding Nodes and Edges in LangGraph</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
            When while-loops grow too complex, graphs take over. Discover how LangGraph models agents as cyclical state graphs with discrete nodes, edges, and time-travel persistence.
          </p>
        </div>
        <Link
          href="/learn/level-2/module-2-7"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow-sky-500/20 transition-all shrink-0 cursor-pointer"
        >
          <span>Continue to Module 2.7</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
