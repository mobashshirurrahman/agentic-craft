"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  Check,
  ArrowRight,
  GitBranch,
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
  Cpu,
  GitFork,
  ArrowDownRight,
} from "lucide-react";
import LangGraphVisualizer from "./LangGraphVisualizer";
import Module2_7Quiz from "./Module2_7Quiz";

export default function Module2_7Content() {
  const [selectedPillar, setSelectedPillar] = useState<string>("nodes");
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [activeCodeTab, setActiveCodeTab] = useState<"code" | "output">("code");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);

  const pillars = [
    {
      id: "nodes",
      title: "1. Graph Nodes",
      tagline: "Pure State Transformations",
      desc: "In LangGraph, every node is a standard Python function that accepts the global State object and returns a dictionary with partial updates. Nodes never modify state in-place.",
      icon: Cpu,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-500/10",
      border: "border-purple-200 dark:border-purple-500/30",
      badge: "fn(state) -> dict",
      codeSnippet: `# 1. NODES: Standard Python functions returning partial state updates
from typing import TypedDict, Annotated
from langchain_core.messages import BaseMessage, HumanMessage, AIMessage

class AgentState(TypedDict):
    messages: list[BaseMessage]
    sender: str

def agent_node(state: AgentState) -> dict:
    """Node: Calls LLM and returns the new assistant message."""
    messages = state["messages"]
    model_response = model.invoke(messages)
    
    # Return partial update — LangGraph merges this into state
    return {"messages": [model_response], "sender": "agent"}

def tool_executor_node(state: AgentState) -> dict:
    """Node: Executes tools requested by model."""
    last_msg = state["messages"][-1]
    results = []
    for tool_call in last_msg.tool_calls:
        output = run_tool(tool_call["name"], tool_call["args"])
        results.append(output)
    return {"messages": results, "sender": "tools"}`,
    },
    {
      id: "edges",
      title: "2. Directed Normal Edges",
      tagline: "Deterministic Sequential Flow",
      desc: "Normal edges specify fixed, non-branching transitions between two nodes. For example, after the 'tools' node completes execution, it always loops back to the 'agent' node.",
      icon: ArrowRight,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-500/10",
      border: "border-blue-200 dark:border-blue-500/30",
      badge: "builder.add_edge()",
      codeSnippet: `# 2. DIRECTED NORMAL EDGES
from langgraph.graph import StateGraph, START, END

builder = StateGraph(AgentState)

# Register nodes
builder.add_node("agent", agent_node)
builder.add_node("tools", tool_executor_node)

# START edge: Where execution enters the graph
builder.add_edge(START, "agent")

# Deterministic edge: After executing tools, always cycle back to agent
builder.add_edge("tools", "agent")`,
    },
    {
      id: "conditional_edges",
      title: "3. Conditional Routing Edges",
      tagline: "Dynamic State Inspection",
      desc: "Conditional edges inspect state and return a routing key. This allows the graph to decide dynamically at runtime whether to call tools or terminate at END.",
      icon: GitFork,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      border: "border-emerald-200 dark:border-emerald-500/30",
      badge: "add_conditional_edges()",
      codeSnippet: `# 3. CONDITIONAL EDGES: Dynamic Branching
from typing import Literal

def router_decision(state: AgentState) -> Literal["tools", "__end__"]:
    """Pure router function: Evaluates last message to pick next path."""
    last_msg = state["messages"][-1]
    
    # If the LLM requested tools -> route to tools node
    if hasattr(last_msg, "tool_calls") and last_msg.tool_calls:
        return "tools"
    
    # Otherwise -> route to END (task complete)
    return "__end__"

# Wire conditional edge: source node -> router -> path mapping
builder.add_conditional_edges(
    "agent",
    router_decision,
    {
        "tools": "tools",
        "__end__": END
    }
)`,
    },
    {
      id: "compilation",
      title: "4. Compilation & Runtime",
      tagline: "Executable State Machine",
      desc: "Calling builder.compile() validates the graph structure for missing edges or orphan nodes, returning an executable Pregel runner with streaming and checkpoint capabilities.",
      icon: Layers,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      border: "border-amber-200 dark:border-amber-500/30",
      badge: "builder.compile()",
      codeSnippet: `# 4. COMPILATION & EXECUTION
# Compile into a runnable state machine
app = builder.compile()

# Visualize graph ASCII representation
print(app.get_graph().draw_ascii())

# Invoke with initial state
initial_input = {
    "messages": [HumanMessage(content="What is the weather in Tokyo?")]
}

# Stream node execution updates in real-time
for event in app.stream(initial_input, stream_mode="updates"):
    for node_name, output in event.items():
        print(f"--- Node [{node_name}] finished execution ---")
        print(output)`,
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
              Module 2.7 • Core Implementation
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              ~20 min interactive
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Understanding Nodes and Edges in LangGraph
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Move beyond fragile while-loops. In this lesson, we transition to <strong>LangGraph state machines</strong>: modeling agents as discrete functional nodes connected by directed and conditional edges with built-in cyclical loops.
          </p>
        </div>
      </div>

      {/* SECTION 1: 4 PILLARS OF LANGGRAPH */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-500" />
            1. Core Anatomy of a Graph Agent
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Select a concept to inspect
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
              LangGraph Construction Inspector
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
                  <span>Traversing Graph...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Simulate Graph Run</span>
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
                langgraph_agent.py • {selectedPillar}
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
                Graph Trace Output
              </button>
            </div>
          </div>

          <div className="p-4 overflow-x-auto text-slate-300 leading-relaxed font-mono">
            {activeCodeTab === "code" ? (
              <pre>
                <code>{currentSnippet}</code>
              </pre>
            ) : (
              <div className="space-y-2 text-purple-300 font-mono text-[11px]">
                <p className="text-slate-400">$ python langgraph_agent.py</p>
                <p className="text-emerald-400">[Graph Start] --&gt; Entering node: 'agent'</p>
                <p className="text-slate-300">&gt;&gt; State updated: 'messages' + 1 (AIMessage with tool_calls=['weather'])</p>
                <p className="text-sky-300">[Conditional Edge: router_decision] -&gt; 'tools'</p>
                <p className="text-amber-300">[Entering node: 'tools']</p>
                <p className="text-slate-300">&gt;&gt; Executing weather('Tokyo') -&gt; '22°C Sunny'</p>
                <p className="text-purple-400">[Normal Edge] 'tools' --&gt; 'agent'</p>
                <p className="text-emerald-400">[Entering node: 'agent']</p>
                <p className="text-slate-300">&gt;&gt; Model generates final answer: 'The weather in Tokyo is 22°C and sunny.'</p>
                <p className="text-sky-300">[Conditional Edge: router_decision] -&gt; '__end__'</p>
                <p className="text-emerald-400 font-bold">&gt;&gt; Graph execution completed successfully.</p>
              </div>
            )}
          </div>
        </div>

        {/* Simulation Banner */}
        {simStep > 0 && (
          <div className="p-3.5 rounded-xl border border-purple-200 dark:border-purple-500/30 bg-purple-50/80 dark:bg-purple-950/30 flex items-center justify-between text-xs font-mono">
            <span className="text-purple-800 dark:text-purple-200">
              {simStep === 1 && "START -> 'agent' node: Model called, outputs tool_call for 'weather'"}
              {simStep === 2 && "Conditional Edge evaluated -> router returns 'tools' branch"}
              {simStep === 3 && "'tools' node executes tool -> Directed edge loops back to 'agent' node"}
              {simStep === 4 && "'agent' produces final response -> Conditional edge routes to END!"}
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
            2. Interactive LangGraph Topology Visualizer
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Node-Edge Interactive Inspector
          </span>
        </div>
        <LangGraphVisualizer />
      </section>

      {/* SECTION 4: HANDWRITTEN NOTE */}
      <div className="p-4 rounded-xl border border-purple-200 dark:border-purple-500/30 bg-purple-50/90 dark:bg-purple-500/10 shadow-sm">
        <span className="font-['Caveat',cursive] text-base text-purple-950 dark:text-purple-200 block">
          📌 Mental Model: Think of a LangGraph agent as an assembly line. Nodes are workstations that modify the conveyor belt item (State). Edges are tracks directing the item to the next station. Never let a workstation reach into another workstation&apos;s drawer — all communication happens through the State on the belt!
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
              TRAP #1: In-Place State Mutation
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Writing <code>state[&quot;messages&quot;].append(msg)</code> inside a node breaks LangGraph&apos;s time-travel, checkpointing, and branch rollback capabilities. Nodes must always return a new dictionary with updates (e.g. <code>return {`{"messages": [msg]}`}</code>) so LangGraph reducers manage state immutably.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-500/5 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
              TRAP #2: Deadlock from Missing END Edges
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              If your conditional router function has an unhandled condition branch that returns an unregistered string, LangGraph raises a runtime KeyError. Always define an explicit fallback mapping to <code>END</code> in your path dictionary.
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
            ["1.", "Decoupled Architecture:", "Nodes don't know who called them or who runs next. They just transform State. The graph topology alone controls workflow order."],
            ["2.", "Cyclic Workflows Supported:", "Unlike DAG-only orchestrators (Airflow), LangGraph is built natively for cycles — allowing agents to loop indefinitely until exit conditions are met."],
            ["3.", "Persistence Ready:", "Because every step transition is a state snapshot, you can attach any checkpointer (Postgres, Redis) to enable full time-travel debugging and pause-and-resume."],
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
                Concept Check: Nodes & Edges
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {showQuiz ? "Click to collapse" : "Test your understanding of graph topology (3 questions)"}
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
              <Module2_7Quiz />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* SECTION 8: NEXT MODULE BRIDGE */}
      <section className="rounded-2xl border border-purple-200 dark:border-purple-500/30 bg-gradient-to-r from-purple-50 via-white to-slate-50 dark:from-purple-500/10 dark:via-slate-900 dark:to-slate-950 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-purple-700 dark:text-purple-400 uppercase tracking-wider">
            <span>Up Next • Module 2.8</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Defining and Managing State in LangGraph</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
            State is the lifeblood of your graph. Learn how TypedDict schemas, add_messages reducers, and custom aggregation functions prevent data loss during multi-node execution.
          </p>
        </div>
        <Link
          href="/learn/level-2/module-2-8"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow-purple-500/20 transition-all shrink-0 cursor-pointer"
        >
          <span>Continue to Module 2.8</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
