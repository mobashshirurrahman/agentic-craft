"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target, Check, ArrowRight, GitFork, Layers, Code2,
  AlertTriangle, Sparkles, HelpCircle, Copy, CheckCheck,
  Play, RotateCcw, FileText, Terminal, ArrowDownRight, Cpu,
} from "lucide-react";
import ConditionalEdgeSimulator from "./ConditionalEdgeSimulator";
import Module3_1Quiz from "./Module3_1Quiz";

export default function Module3_1Content() {
  const [selectedComponent, setSelectedComponent] = useState<string>("source");
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [activeCodeTab, setActiveCodeTab] = useState<"code" | "output">("code");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);
  const [simRoute, setSimRoute] = useState<"tools" | "end" | null>(null);

  const components = [
    {
      id: "source",
      title: "1. Source Node",
      tagline: "Where It Begins",
      desc: "The node that just finished executing and updated state — e.g., the 'agent' node after an LLM call. Its return value determines the routing decision.",
      icon: Cpu,
      color: "text-violet-600 dark:text-violet-400",
      bg: "bg-violet-50 dark:bg-violet-500/10",
      border: "border-violet-200 dark:border-violet-500/30",
      badge: "\"agent\"",
      codeSnippet: `# SOURCE NODE: The node whose output triggers the routing decision
# This runs the LLM and updates state["messages"]

from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage

model = ChatOpenAI(model="gpt-4o-mini").bind_tools([search_web, get_weather])

def agent_node(state: AgentState) -> dict:
    """Calls LLM with tool bindings — result drives routing decision."""
    response = model.invoke(state["messages"])
    # State update: routing function will inspect this later
    return {"messages": [response]}

# After agent_node runs:
#   - If LLM chose to call a tool → response.tool_calls is non-empty
#   - If LLM wrote a final answer → response.tool_calls is empty
# The routing function reads this to decide where to go next`,
    },
    {
      id: "router",
      title: "2. Routing Function",
      tagline: "The State Inspector",
      desc: "A pure Python function that reads state and returns a decision string like 'call_tools' or '__end__'. Must be lightweight (<1ms) — no LLM calls, no DB queries.",
      icon: GitFork,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-500/10",
      border: "border-purple-200 dark:border-purple-500/30",
      badge: "Pure Function",
      codeSnippet: `# ROUTING FUNCTION: Pure Python — reads state, returns a string
# CRITICAL: Never call APIs or LLMs here! < 1ms target

from typing import Literal
from langgraph.graph import END

def should_continue(state: AgentState) -> Literal["call_tools", "__end__"]:
    """Inspects last message. If tool_calls exist → route to tools."""
    last_message = state["messages"][-1]
    
    # ✅ Read-only state inspection — extremely fast
    if hasattr(last_message, "tool_calls") and last_message.tool_calls:
        return "call_tools"  # → route to execute tools
    
    return "__end__"  # → stop, return answer to user

# ❌ TRAPS TO AVOID in routing functions:
# - Never: model.invoke(state) inside router → defeats the purpose
# - Never: db.query(state["id"]) → async I/O in sync routing function
# - Never: time.sleep(1) → blocks the graph indefinitely`,
    },
    {
      id: "pathmap",
      title: "3. Path Map",
      tagline: "The Destination Table",
      desc: "A dictionary that maps the router's returned string to the actual target node or END. The graph looks up this table to determine where execution continues.",
      icon: ArrowDownRight,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      border: "border-emerald-200 dark:border-emerald-500/30",
      badge: "Dict[str, str]",
      codeSnippet: `# PATH MAP: Maps router string output → actual graph node names
from langgraph.graph import StateGraph, START, END

builder = StateGraph(AgentState)
builder.add_node("agent", agent_node)
builder.add_node("call_tools", execute_tools_node)

builder.add_edge(START, "agent")

# add_conditional_edges wires: source node → router fn → path map
builder.add_conditional_edges(
    "agent",                 # Source node
    should_continue,         # Routing function
    {
        "call_tools": "call_tools",  # "call_tools" → call_tools node
        "__end__": END,              # "__end__" → terminates graph
    }
)

# After tools execute, loop BACK to agent for next LLM call
builder.add_edge("call_tools", "agent")

app = builder.compile()`,
    },
    {
      id: "advanced",
      title: "4. Multi-Branch Router",
      tagline: "N-Way Routing",
      desc: "Routing functions can return N different strings for N different destination nodes. This enables triage patterns — route to billing, tech, or support based on classified intent.",
      icon: Layers,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      border: "border-amber-200 dark:border-amber-500/30",
      badge: "N-Way Triage",
      codeSnippet: `# N-WAY ROUTING: Route to multiple different specialist nodes

from typing import Literal

def triage_router(state: AgentState) -> Literal["billing", "tech_support", "general", "__end__"]:
    """Routes user intent to the appropriate specialist agent."""
    intent = state.get("classified_intent", "")
    
    if intent == "billing_issue":
        return "billing"           # → BillingSpecialistNode
    elif intent == "technical_bug":
        return "tech_support"      # → TechSupportNode
    elif intent == "general_question":
        return "general"           # → GeneralQANode
    else:
        return "__end__"           # → Exit (unrecognized intent)

builder.add_conditional_edges(
    "intent_classifier",     # Source: after LLM classifies intent
    triage_router,
    {
        "billing": "billing_specialist",
        "tech_support": "tech_support_specialist",
        "general": "general_qa",
        "__end__": END,
    }
)`,
    },
  ];

  const currentComponent = components.find((c) => c.id === selectedComponent) || components[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentComponent.codeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setActiveCodeTab("output");
    setSimStep(1);
    const route = Math.random() > 0.5 ? "tools" : "end";
    setSimRoute(route);
    setTimeout(() => setSimStep(2), 700);
    setTimeout(() => setSimStep(3), 1400);
    setTimeout(() => { setSimStep(4); setIsSimulating(false); }, 2100);
  };

  return (
    <div className="space-y-10 max-w-5xl mx-auto pb-16">
      {/* 🎯 OBJECTIVE BANNER */}
      <section className="rounded-2xl border border-violet-200 dark:border-violet-500/30 bg-violet-50/60 dark:bg-violet-500/5 p-4 sm:p-6 shadow-sm">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-violet-600 text-white shrink-0 shadow-sm mt-0.5"><Target className="w-5 h-5" /></div>
          <div className="space-y-2 flex-1">
            <h2 className="text-sm font-mono uppercase tracking-wider text-violet-800 dark:text-violet-400 font-bold">🎯 By the end of this module, you will:</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              {[
                "Explain the 3 components of a conditional edge: source node, routing function, path map",
                "Write a Literal-typed routing function that inspects tool_calls to decide the next step",
                "Wire add_conditional_edges() with a path map dictionary into a LangGraph builder",
                "Extend to N-way routing for multi-specialist triage workflows",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-violet-600 dark:text-violet-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: 4 CONCEPT CARDS */}
      <section className="space-y-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/30 text-violet-700 dark:text-violet-300 text-xs font-mono font-semibold mb-2">
            <GitFork className="w-3.5 h-3.5" /><span>Conditional Routing • Dynamic Edges</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Implementing Conditional Edges in LangGraph</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Standard pipelines flow in a straight line. Real agents make decisions. <strong>Conditional edges</strong> are the railway switches of LangGraph — they inspect current state and dynamically route execution to the right destination node.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {components.map((comp) => {
            const Icon = comp.icon;
            const isSelected = selectedComponent === comp.id;
            return (
              <button key={comp.id} onClick={() => setSelectedComponent(comp.id)}
                className={`p-3.5 sm:p-4 rounded-xl border text-left transition-all flex flex-col justify-between min-h-[145px] sm:min-h-[160px] active:scale-95 cursor-pointer ${isSelected ? "border-violet-500 bg-white dark:bg-slate-900 shadow-md ring-2 ring-violet-500/20" : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700"}`}>
                <div className="space-y-2">
                  <div className={`inline-flex p-1.5 rounded-lg ${comp.bg} border ${comp.border}`}><Icon className={`w-4 h-4 ${comp.color}`} /></div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">{comp.title}</div>
                    <div className={`text-[10px] font-mono ${comp.color} mt-0.5`}>{comp.tagline}</div>
                  </div>
                </div>
                <div className="mt-2 space-y-1">
                  <p className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{comp.desc}</p>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${comp.bg} ${comp.color} border ${comp.border}`}>{comp.badge}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* CODE INSPECTOR */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`inline-flex p-1.5 rounded-lg ${currentComponent.bg} border ${currentComponent.border}`}><currentComponent.icon className={`w-4 h-4 ${currentComponent.color}`} /></div>
              <span className="text-xs font-bold text-slate-900 dark:text-white">{currentComponent.title}: {currentComponent.tagline}</span>
            </div>
            <button onClick={handleCopyCode} className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer">
              {copiedCode ? <CheckCheck className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedCode ? "Copied!" : "Copy"}
            </button>
          </div>
          <div className="rounded-xl border border-slate-800 overflow-hidden bg-slate-950">
            <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-slate-800">
              <div className="flex gap-1">
                {(["code", "output"] as const).map((tab) => (
                  <button key={tab} onClick={() => setActiveCodeTab(tab)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono cursor-pointer ${activeCodeTab === tab ? "bg-slate-700 text-white" : "text-slate-400 hover:text-slate-200"}`}>
                    {tab === "code" ? <FileText className="w-3 h-3" /> : <Terminal className="w-3 h-3" />}
                    {tab === "code" ? "Python Code" : "Routing Trace"}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                {simStep > 0 && <button onClick={() => { setSimStep(0); setActiveCodeTab("code"); setSimRoute(null); }} className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 cursor-pointer"><RotateCcw className="w-3 h-3" /> Reset</button>}
                <button onClick={handleRunSimulation} disabled={isSimulating}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-violet-600 hover:bg-violet-500 text-white text-xs font-mono disabled:opacity-50 cursor-pointer">
                  <Play className="w-3 h-3" />{isSimulating ? "Routing..." : "Run Graph"}
                </button>
              </div>
            </div>
            <div className="p-4 min-h-[120px] font-mono text-xs">
              {activeCodeTab === "code" ? (
                <pre className="text-slate-300 whitespace-pre-wrap leading-relaxed">{currentComponent.codeSnippet}</pre>
              ) : (
                <div className="space-y-1.5 text-slate-300">
                  {simStep === 0 && <div className="text-slate-500 italic">Click &apos;Run Graph&apos; to trace the routing decision...</div>}
                  {simStep >= 1 && <div className="text-violet-400">➜ [AGENT NODE] LLM inference complete. Inspecting response...</div>}
                  {simStep >= 2 && (
                    <div className="text-slate-400 pl-4">
                      last_message.tool_calls = {simRoute === "tools" ? '[{"name": "get_weather", "args": {"location": "Tokyo"}}]' : "[]"}
                    </div>
                  )}
                  {simStep >= 3 && (
                    <div className={simRoute === "tools" ? "text-amber-400 pl-4" : "text-emerald-400 pl-4"}>
                      should_continue() → &quot;{simRoute === "tools" ? "call_tools" : "__end__"}&quot;
                      <br />Path Map: &quot;{simRoute === "tools" ? "call_tools" : "__end__"}&quot; → {simRoute === "tools" ? "call_tools node" : "END"}
                    </div>
                  )}
                  {simStep >= 4 && (
                    <div className={`font-bold pt-2 border-t border-slate-800 ${simRoute === "tools" ? "text-amber-400" : "text-emerald-400"}`}>
                      ✔ [{simRoute === "tools" ? "TOOLS" : "END"}] Executing {simRoute === "tools" ? "get_weather(location='Tokyo')..." : "Final answer returned to user."}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: INTERACTIVE SIMULATOR */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">🔬 Railway Switch Simulator</h3>
        <ConditionalEdgeSimulator />
      </section>

      {/* SECTION 3: NOTES */}
      <section className="space-y-3">
        <div className="p-4 rounded-xl border border-amber-300 dark:border-amber-500/30 bg-amber-50/90 dark:bg-amber-500/10 shadow-sm">
          <span className="font-['Caveat',cursive] text-base text-amber-950 dark:text-amber-200 block">✍️ Instructor Note: &quot;The routing function is the ONLY place where you decide WHERE to go. Never put routing logic inside a node. Nodes do work. Routers make decisions. Keep them completely separate — this is the core architectural rule.&quot;</span>
        </div>
        <div className="p-4 rounded-xl border border-violet-200 dark:border-violet-500/30 bg-violet-50/90 dark:bg-violet-500/10 shadow-sm">
          <span className="font-['Caveat',cursive] text-base text-violet-950 dark:text-violet-200 block">📌 Golden Rule: Routing functions must be PURE — read-only, no side effects, &lt;1ms. If your routing logic requires a DB lookup or LLM call, move that logic into a dedicated predecessor node and store the result in state for the router to read.</span>
        </div>
      </section>

      {/* SECTION 4: TRAPS */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-500" /><span>Conditional Edge Traps</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-500/30 bg-rose-50/50 dark:bg-rose-500/5 space-y-2">
            <span className="text-xs font-mono font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider block">TRAP #1: Incomplete Path Map</span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">If your routing function returns &quot;retry&quot; but your path map only has keys for &quot;call_tools&quot; and &quot;__end__&quot;, LangGraph will raise a KeyError at runtime. Always ensure every possible return value of your routing function has a corresponding key in the path map.</p>
          </div>
          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-500/5 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">TRAP #2: No Loop Ceiling</span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">A cyclic edge (tools → agent → tools → ...) with no escape condition creates an infinite loop that burns tokens until your budget limit hits. Always add a loop_count field to state and route to END when loop_count exceeds your maximum iteration threshold.</p>
          </div>
        </div>
      </section>

      {/* SECTION 5: KEY TAKEAWAYS */}
      <section className="rounded-xl border border-violet-200 dark:border-violet-500/30 bg-violet-50/50 dark:bg-violet-500/5 p-5 space-y-3">
        <h4 className="font-bold text-sm text-violet-900 dark:text-violet-300 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-violet-600 dark:text-violet-400" /><span>Key Takeaways</span>
        </h4>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          {[
            ["1.", "3 Components, Not 1:", "add_conditional_edges() needs all three: source node, routing function, path map. The path map is what makes the routing function's string output meaningful — without it, the string has no target."],
            ["2.", "Typing Prevents Runtime Errors:", "Use Literal['call_tools', '__end__'] as the return type of routing functions. This lets TypeScript/pyright catch missing path map keys at write-time, before any runtime error."],
            ["3.", "Always Add a Loop Ceiling:", "Any cyclic conditional edge (agent ↔ tools loop) needs a termination condition. Add a recursion_limit parameter to builder.compile() or track iterations in state. A tool error without a ceiling = infinite loop."],
          ].map(([n, bold, rest]) => (
            <li key={n} className="flex items-start gap-2">
              <span className="text-violet-600 dark:text-violet-400 font-bold">{n}</span>
              <span><strong>{bold}</strong> {rest}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* QUIZ */}
      <section className="space-y-3">
        <button onClick={() => setShowQuiz(!showQuiz)}
          className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all text-left cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400"><HelpCircle className="w-5 h-5" /></div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">Concept Check: Conditional Edges</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">{showQuiz ? "Click to collapse" : "3 questions"}</p>
            </div>
          </div>
          <span className="text-xs font-mono font-semibold px-3 py-1.5 rounded-lg bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-400 border border-violet-200 dark:border-violet-500/30">
            {showQuiz ? "Hide" : "Start"}
          </span>
        </button>
        <AnimatePresence>
          {showQuiz && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }}>
              <Module3_1Quiz />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* NEXT MODULE */}
      <section className="rounded-2xl border border-violet-200 dark:border-violet-500/30 bg-gradient-to-r from-violet-50 via-white to-slate-50 dark:from-violet-500/10 dark:via-slate-900 dark:to-slate-950 p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <div className="text-xs font-mono font-bold text-violet-700 dark:text-violet-400 uppercase tracking-wider">Up Next • Module 3.2</div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Designing Custom Workflows with State Graphs</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">Master the 3 canonical graph topologies: Linear Pipelines, Cyclic Reflection Loops, and Branching Triage Networks.</p>
        </div>
        <Link href="/learn/level-3/module-3-2" className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs sm:text-sm shadow-sm transition-all shrink-0 cursor-pointer">
          <span>Continue to Module 3.2</span><ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
