"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  Check,
  ArrowRight,
  ListTodo,
  CheckCircle2,
  Layers,
  Sparkles,
  HelpCircle,
  Copy,
  CheckCheck,
  Play,
  RotateCcw,
  FileText,
  AlertTriangle,
  Code2,
  Workflow,
  Cpu,
  GitFork,
} from "lucide-react";
import PlanAndExecuteStudio from "./PlanAndExecuteStudio";
import Module3_6Quiz from "./Module3_6Quiz";

export default function Module3_6Content() {
  const [selectedPillar, setSelectedPillar] = useState<string>("planner");
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [activeCodeTab, setActiveCodeTab] = useState<"code" | "output">("code");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);

  const pillars = [
    {
      id: "planner",
      title: "1. The Strategic Planner",
      tagline: "High-Level Goal Decomposition",
      desc: "A reasoning model analyzes the overall user goal and decomposes it into an explicit, sequential step-by-step itinerary using Pydantic structured output.",
      icon: ListTodo,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-500/10",
      border: "border-blue-200 dark:border-blue-500/30",
      badge: "Pydantic Plan",
      codeSnippet: `# 1. THE STRATEGIC PLANNER NODE
from pydantic import BaseModel, Field
from langchain_openai import ChatOpenAI

class Plan(BaseModel):
    """Structured plan containing sequential action steps."""
    steps: list[str] = Field(
        description="Sequential list of distinct subtasks required to solve the goal."
    )

planner_llm = ChatOpenAI(model="gpt-4o", temperature=0)
planner = planner_llm.with_structured_output(Plan)

def plan_node(state: PlanExecuteState) -> dict:
    """Generates initial itinerary from user query."""
    user_query = state["input"]
    plan = planner.invoke(f"Decompose this task into distinct steps: {user_query}")
    return {"plan": plan.steps}`,
    },
    {
      id: "executor",
      title: "2. The Tactical Executor",
      tagline: "Isolated Step Execution",
      desc: "A fast agent receives ONLY the current step and relevant tools. Because its task scope is laser-focused, it does not get distracted by the 10 other steps in the overarching mission.",
      icon: Cpu,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-500/10",
      border: "border-purple-200 dark:border-purple-500/30",
      badge: "create_react_agent",
      codeSnippet: `# 2. TACTICAL EXECUTOR NODE
from langgraph.prebuilt import create_react_agent

# Fast execution agent with tool access
executor_agent = create_react_agent(
    model=ChatOpenAI(model="gpt-4o-mini"),
    tools=[search_tool, python_repl, database_tool]
)

def execute_step_node(state: PlanExecuteState) -> dict:
    """Executes the very first pending step in the plan."""
    current_step = state["plan"][0]
    
    # Run tactical agent to solve just this single subtask
    response = executor_agent.invoke({
        "messages": [("user", f"Execute this step: {current_step}")]
    })
    
    observation = response["messages"][-1].content
    return {
        "past_steps": [(current_step, observation)]
    }`,
    },
    {
      id: "replanner",
      title: "3. Dynamic Replanner",
      tagline: "Adaptive Route Recalculation",
      desc: "After each step completes, the replanner evaluates the new observation. If unexpected obstacles arose or the goal is satisfied early, it mutates the remaining steps.",
      icon: GitFork,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      border: "border-emerald-200 dark:border-emerald-500/30",
      badge: "Replan Decision",
      codeSnippet: `# 3. THE REPLANNER NODE
class ResponseOrReplan(BaseModel):
    response: str | None = Field(description="Final answer if goal is complete.")
    steps: list[str] | None = Field(description="Remaining updated steps if continuing.")

replanner = ChatOpenAI(model="gpt-4o").with_structured_output(ResponseOrReplan)

def replan_node(state: PlanExecuteState) -> dict:
    """Evaluates progress and either yields final answer or updates plan."""
    prompt = f"""
    Original Goal: {state['input']}
    Completed Steps: {state['past_steps']}
    Current Remaining Plan: {state['plan'][1:]}
    
    Based on the observations, either update remaining steps or provide final answer.
    """
    decision = replanner.invoke(prompt)
    
    if decision.response:
        return {"response": decision.response}
    return {"plan": decision.steps}`,
    },
    {
      id: "graph_loop",
      title: "4. StateGraph Architecture",
      tagline: "Cyclic Replanning Flow",
      desc: "LangGraph coordinates the planner, executor, and replanner nodes into a cyclical graph. The conditional router inspects state['response'] to either loop or exit to END.",
      icon: Workflow,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      border: "border-amber-200 dark:border-amber-500/30",
      badge: "StateGraph Loop",
      codeSnippet: `# 4. WIRING THE PLAN-AND-EXECUTE STATEGRAPH
from typing import TypedDict, Annotated, List, Tuple
import operator
from langgraph.graph import StateGraph, START, END

class PlanExecuteState(TypedDict):
    input: str
    plan: List[str]
    past_steps: Annotated[List[Tuple[str, str]], operator.add]
    response: str

workflow = StateGraph(PlanExecuteState)
workflow.add_node("planner", plan_node)
workflow.add_node("executor", execute_step_node)
workflow.add_node("replanner", replan_node)

workflow.add_edge(START, "planner")
workflow.add_edge("planner", "executor")
workflow.add_edge("executor", "replanner")

def should_end(state: PlanExecuteState):
    return END if state.get("response") else "executor"

workflow.add_conditional_edges("replanner", should_end, [END, "executor"])
app = workflow.compile()`,
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
      <div className="rounded-2xl border border-blue-200 dark:border-blue-500/30 bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-slate-50 dark:to-slate-950 p-6 md:p-8 relative overflow-hidden transition-colors">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-500/30">
              Module 3.6 • Strategic Patterns
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              ~20 min interactive
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Constructing Plan-and-Execute Agent Systems
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Pure ReAct agents wander off course on long, multi-step tasks. In this lesson, we build a <strong>Plan-and-Execute agent architecture</strong> in LangGraph: decoupling high-level strategic roadmapping from tactical tool execution with continuous replanning.
          </p>
        </div>
      </div>

      {/* SECTION 1: 4 PILLARS OF PLAN-AND-EXECUTE */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-500" />
            1. Core Mechanics of Plan-and-Execute
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Select an architecture node to inspect
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
                    ? `${pillar.border} ${pillar.bg} shadow-md ring-1 ring-blue-500/50`
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
                  <div className="text-[11px] font-medium text-blue-600 dark:text-blue-400">
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
            <Code2 className="w-4 h-4 text-blue-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white font-mono uppercase tracking-wider">
              Plan-and-Execute Implementation
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={runSimulation}
              disabled={isSimulating}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-xs disabled:opacity-50 transition-all cursor-pointer"
            >
              {isSimulating ? (
                <>
                  <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                  <span>Executing Plan...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Simulate Plan Run</span>
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
                plan_and_execute.py • {selectedPillar}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveCodeTab("code")}
                className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition-all ${
                  activeCodeTab === "code"
                    ? "bg-blue-600/30 text-blue-300 border border-blue-500/40"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Code
              </button>
              <button
                onClick={() => setActiveCodeTab("output")}
                className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition-all ${
                  activeCodeTab === "output"
                    ? "bg-blue-600/30 text-blue-300 border border-blue-500/40"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Planning Trace
              </button>
            </div>
          </div>

          <div className="p-4 overflow-x-auto text-slate-300 leading-relaxed font-mono">
            {activeCodeTab === "code" ? (
              <pre>
                <code>{currentSnippet}</code>
              </pre>
            ) : (
              <div className="space-y-2 text-blue-300 font-mono text-[11px]">
                <p className="text-slate-400">$ python run_plan_execute.py --goal "Research and compare Q3 EV deliveries"</p>
                <p className="text-purple-300">[Planner] Generated 3 distinct steps:</p>
                <p className="text-slate-300">&gt;&gt; 1. Search Tesla Q3 2024 deliveries</p>
                <p className="text-slate-300">&gt;&gt; 2. Search BYD Q3 2024 deliveries</p>
                <p className="text-slate-300">&gt;&gt; 3. Calculate percentage differential</p>
                <p className="text-amber-300">[Executor] Step 1 complete -&gt; Tesla reported 462,890 units</p>
                <p className="text-sky-300">[Replanner] Step 1 marked complete. 2 steps remaining.</p>
                <p className="text-amber-300">[Executor] Step 2 complete -&gt; BYD reported 443,426 BEV units</p>
                <p className="text-emerald-400 font-bold">[Replanner] Calculation executed -&gt; Final response emitted!</p>
              </div>
            )}
          </div>
        </div>

        {/* Simulation Banner */}
        {simStep > 0 && (
          <div className="p-3.5 rounded-xl border border-blue-200 dark:border-blue-500/30 bg-blue-50/80 dark:bg-blue-950/30 flex items-center justify-between text-xs font-mono">
            <span className="text-blue-800 dark:text-blue-200">
              {simStep === 1 && "Goal ingested -> Planner generates structured 3-step itinerary"}
              {simStep === 2 && "Executor agent runs Step 1 in isolation -> records observation"}
              {simStep === 3 && "Replanner inspects state -> verifies progress and queues Step 2"}
              {simStep === 4 && "All steps solved -> Replanner outputs final synthesized response -> Graph ends!"}
            </span>
            <span className="text-blue-600 dark:text-blue-400 font-bold">
              Step {simStep}/4
            </span>
          </div>
        )}
      </section>

      {/* SECTION 3: INTERACTIVE STUDIO */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-500" />
            2. Interactive Plan-and-Execute Studio
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Step-by-Step Execution Graph
          </span>
        </div>
        <PlanAndExecuteStudio />
      </section>

      {/* SECTION 4: HANDWRITTEN NOTE */}
      <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-500/30 bg-blue-50/90 dark:bg-blue-500/10 shadow-sm">
        <span className="font-['Caveat',cursive] text-base text-blue-950 dark:text-blue-200 block">
          📌 ReAct vs Plan-and-Execute: ReAct chooses its next action blindly after every step, making it wander off topic when goals exceed 5 steps. Plan-and-Execute creates a flight itinerary first, keeps the executor focused on one ticket at a time, and only recalibrates when a flight is delayed!
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
              TRAP #1: The Rigid Unchanging Plan
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Generating an 8-step plan and executing it blindly without a replanning step is fatal. If Step 2 discovers that an API endpoint requires authentication or a file does not exist, steps 3 through 8 will blindly execute on invalid assumptions. Always include a replanner node.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-500/5 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
              TRAP #2: Planner Prompt Bloat
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Feeding the executor&apos;s full tool schema descriptions into the planner prompts causes the planner to hallucinate tool parameters rather than writing strategic natural language tasks. Let the planner write human-like directives, and let the executor choose the tools.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6: KEY TAKEAWAYS */}
      <section className="rounded-xl border border-blue-200 dark:border-blue-500/30 bg-blue-50/50 dark:bg-blue-500/5 p-5 space-y-3">
        <h4 className="font-bold text-sm text-blue-900 dark:text-blue-300 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          Key Architectural Takeaways
        </h4>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          {[
            ["1.", "Role Specialization:", "Separate strategic reasoning (Planner) from tactical tool calling (Executor). Smaller, cheaper models can run individual steps safely."],
            ["2.", "Dynamic Replanning:", "The replanner inspects intermediate observations and dynamically prunes, inserts, or finishes steps as real-world data arrives."],
            ["3.", "State Schema Isolation:", "Tracking state['plan'] and state['past_steps'] keeps the context clean, avoiding token exhaustion over long tasks."],
          ].map(([n, bold, rest]) => (
            <li key={n} className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400 font-bold">{n}</span>
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
            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                Concept Check: Plan-and-Execute
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {showQuiz ? "Click to collapse" : "Test your understanding of planning and replanning (3 questions)"}
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-semibold px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30">
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
              <Module3_6Quiz />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* SECTION 8: NEXT MODULE BRIDGE */}
      <section className="rounded-2xl border border-blue-200 dark:border-blue-500/30 bg-gradient-to-r from-blue-50 via-white to-slate-50 dark:from-blue-500/10 dark:via-slate-900 dark:to-slate-950 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">
            <span>Up Next • Module 3.7</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Implementing Deep Planning Agents</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
            Scale from simple lists to hierarchical tree search. Explore Monte Carlo Tree Search (MCTS), beam search, and backtracking for non-linear agent problem solving.
          </p>
        </div>
        <Link
          href="/learn/level-3/module-3-7"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow-blue-500/20 transition-all shrink-0 cursor-pointer"
        >
          <span>Continue to Module 3.7</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
