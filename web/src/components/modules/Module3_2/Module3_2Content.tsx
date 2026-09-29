"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target, Check, ArrowRight, Network, Repeat, GitBranch,
  AlertTriangle, Sparkles, HelpCircle, Copy, CheckCheck,
  Play, RotateCcw, FileText, Terminal, ArrowRight as ArrowRightIcon,
} from "lucide-react";
import WorkflowTopologyBuilder from "./WorkflowTopologyBuilder";
import Module3_2Quiz from "./Module3_2Quiz";

export default function Module3_2Content() {
  const [selectedTopology, setSelectedTopology] = useState<string>("linear");
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [activeCodeTab, setActiveCodeTab] = useState<"code" | "output">("code");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);

  const topologies = [
    {
      id: "linear",
      title: "1. Linear Pipeline",
      tagline: "Assembly Line",
      desc: "Fixed sequential steps where each node transforms output from the previous one. Best for ETL pipelines: Load PDF → Extract Text → Format JSON → Store DB.",
      icon: ArrowRightIcon,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-500/10",
      border: "border-blue-200 dark:border-blue-500/30",
      badge: "No conditionals",
      flow: "START → load → extract → format → END",
      codeSnippet: `# LINEAR PIPELINE: Sequential, deterministic, no branching
from langgraph.graph import StateGraph, START, END

builder = StateGraph(PipelineState)

# Every node added in order — simple add_edge() chains
builder.add_node("load_pdf", load_and_parse_pdf)
builder.add_node("extract_data", extract_structured_data)
builder.add_node("format_json", format_as_json_schema)
builder.add_node("store_db", write_to_database)

# Fixed sequential edges — no conditions, always runs in order
builder.add_edge(START, "load_pdf")
builder.add_edge("load_pdf", "extract_data")
builder.add_edge("extract_data", "format_json")
builder.add_edge("format_json", "store_db")
builder.add_edge("store_db", END)

pipeline = builder.compile()

# Execution: START → load_pdf → extract_data → format_json → store_db → END
# Every run follows the same path — completely deterministic`,
    },
    {
      id: "cyclic",
      title: "2. Cyclic Reflection",
      tagline: "Author & Editor Loop",
      desc: "Iterative self-improvement: draft → critique → revise until quality_score ≥ 85 or loop_count ≥ 3. Prevents infinite loops with a ceiling.",
      icon: Repeat,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      border: "border-amber-200 dark:border-amber-500/30",
      badge: "Cyclic edges",
      flow: "START → draft → critique ↔ revise (loop ≤ 3)",
      codeSnippet: `# CYCLIC REFLECTION LOOP: Author-Editor self-improvement pattern
from langgraph.graph import StateGraph, START, END

def router_check_quality(state: ReflectionState) -> str:
    """Loop until quality >= 85 OR loop_count >= 3 (safety ceiling)"""
    if state["loop_count"] >= 3:
        return "end"  # SAFETY: prevent infinite burn
    if state["quality_score"] >= 85:
        return "end"  # PASS: quality threshold met!
    return "revise"   # LOOP: quality below threshold, revise again

builder = StateGraph(ReflectionState)
builder.add_node("draft_node", generate_first_draft)
builder.add_node("critique_node", run_critique_and_score)  # Sets quality_score
builder.add_node("revise_node", apply_improvements)        # Increments loop_count

builder.add_edge(START, "draft_node")
builder.add_edge("draft_node", "critique_node")

# Conditional loop: critique → (revise OR end) based on quality
builder.add_conditional_edges(
    "critique_node",
    router_check_quality,
    {"revise": "revise_node", "end": END}
)
builder.add_edge("revise_node", "critique_node")  # Loop back for re-critique`,
    },
    {
      id: "branching",
      title: "3. Branching Triage",
      tagline: "Hospital ER Model",
      desc: "A classifier node inspects input and routes to specialist agents. Intent-based dispatch: Billing → BillingAgent, Tech → TechAgent, General → GeneralAgent.",
      icon: GitBranch,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      border: "border-emerald-200 dark:border-emerald-500/30",
      badge: "N-way branch",
      flow: "START → classifier → billing|tech|general → END",
      codeSnippet: `# BRANCHING TRIAGE: Multi-specialist routing pattern
from typing import Literal
from langgraph.graph import StateGraph, START, END

def triage_router(state: TriageState) -> Literal["billing", "tech", "general"]:
    """Route to specialist based on classified intent."""
    intent = state["classified_intent"]
    if "payment" in intent or "invoice" in intent:
        return "billing"
    elif "bug" in intent or "error" in intent:
        return "tech"
    else:
        return "general"

builder = StateGraph(TriageState)
builder.add_node("intent_classifier", classify_customer_intent)
builder.add_node("billing_specialist", handle_billing_query)
builder.add_node("tech_specialist", handle_tech_support)
builder.add_node("general_agent", handle_general_inquiry)

builder.add_edge(START, "intent_classifier")

# N-way branch: one source → multiple possible destinations
builder.add_conditional_edges(
    "intent_classifier",
    triage_router,
    {"billing": "billing_specialist", "tech": "tech_specialist", "general": "general_agent"}
)
# All specialists flow to END
for node in ["billing_specialist", "tech_specialist", "general_agent"]:
    builder.add_edge(node, END)`,
    },
    {
      id: "hybrid",
      title: "4. Hybrid: Branch + Loop",
      tagline: "Real Enterprise Pattern",
      desc: "Most production agents combine topologies: a classifier branches to specialists, each specialist runs a reflection loop. This is the pattern behind customer support AI, medical triage, and code review agents.",
      icon: Network,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-500/10",
      border: "border-purple-200 dark:border-purple-500/30",
      badge: "Production",
      flow: "START → classify → specialist [→ refine → review ↔] → END",
      codeSnippet: `# HYBRID: Branching triage + cyclic refinement per specialist
# The production pattern: classify first, then iterate to quality

def triage_router(state): return state["intent"]

def quality_router(state):
    if state["quality_score"] >= 80 or state["loop_count"] >= 2:
        return "end"
    return "refine"

builder = StateGraph(HybridState)

# Tier 1: Triage
builder.add_node("classify", classify_intent)
builder.add_node("billing", draft_billing_response)
builder.add_node("tech", draft_tech_response)

# Tier 2: Quality loop (shared by all specialists)
builder.add_node("quality_check", evaluate_response_quality)
builder.add_node("refine", improve_response)

builder.add_edge(START, "classify")

# Branch to specialists
builder.add_conditional_edges("classify", triage_router,
    {"billing": "billing", "tech": "tech"})

# Both specialists → quality loop
for specialist in ["billing", "tech"]:
    builder.add_edge(specialist, "quality_check")

# Quality loop: refine or exit
builder.add_conditional_edges("quality_check", quality_router,
    {"refine": "refine", "end": END})
builder.add_edge("refine", "quality_check")`,
    },
  ];

  const currentTopology = topologies.find((t) => t.id === selectedTopology) || topologies[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentTopology.codeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setActiveCodeTab("output");
    setSimStep(1);
    setTimeout(() => setSimStep(2), 700);
    setTimeout(() => setSimStep(3), 1400);
    setTimeout(() => { setSimStep(4); setIsSimulating(false); }, 2100);
  };

  return (
    <div className="space-y-10 max-w-5xl mx-auto pb-16">
      {/* 🎯 OBJECTIVE BANNER */}
      <section className="rounded-2xl border border-purple-200 dark:border-purple-500/30 bg-purple-50/60 dark:bg-purple-500/5 p-4 sm:p-6 shadow-sm">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-purple-600 text-white shrink-0 shadow-sm mt-0.5"><Target className="w-5 h-5" /></div>
          <div className="space-y-2 flex-1">
            <h2 className="text-sm font-mono uppercase tracking-wider text-purple-800 dark:text-purple-400 font-bold">🎯 By the end of this module, you will:</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              {[
                "Distinguish and implement the 3 master topologies: Linear, Cyclic, Branching",
                "Build a cyclic reflection loop with a quality score ceiling to prevent infinite iteration",
                "Wire N-way triage branching to route intents to specialist agents",
                "Combine topologies into a hybrid pattern for real enterprise agent workflows",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: 4 TOPOLOGY CARDS */}
      <section className="space-y-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/30 text-purple-700 dark:text-purple-300 text-xs font-mono font-semibold mb-2">
            <Network className="w-3.5 h-3.5" /><span>Workflow Design • Graph Topologies</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Designing Custom Workflows with State Graphs</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Real enterprise agents are rarely single functions. They are composed into <strong>State Graphs</strong> matching one of three fundamental patterns — or a hybrid of them.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {topologies.map((topo) => {
            const Icon = topo.icon;
            const isSelected = selectedTopology === topo.id;
            return (
              <button key={topo.id} onClick={() => setSelectedTopology(topo.id)}
                className={`p-3.5 sm:p-4 rounded-xl border text-left transition-all flex flex-col justify-between min-h-[155px] sm:min-h-[170px] active:scale-95 cursor-pointer ${isSelected ? "border-purple-500 bg-white dark:bg-slate-900 shadow-md ring-2 ring-purple-500/20" : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700"}`}>
                <div className="space-y-2">
                  <div className={`inline-flex p-1.5 rounded-lg ${topo.bg} border ${topo.border}`}><Icon className={`w-4 h-4 ${topo.color}`} /></div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">{topo.title}</div>
                    <div className={`text-[10px] font-mono ${topo.color} mt-0.5`}>{topo.tagline}</div>
                  </div>
                </div>
                <div className="mt-2 space-y-1.5">
                  <p className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{topo.desc}</p>
                  <code className={`text-[10px] font-mono block ${topo.color}`}>{topo.flow}</code>
                </div>
              </button>
            );
          })}
        </div>

        {/* CODE INSPECTOR */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`inline-flex p-1.5 rounded-lg ${currentTopology.bg} border ${currentTopology.border}`}><currentTopology.icon className={`w-4 h-4 ${currentTopology.color}`} /></div>
              <span className="text-xs font-bold text-slate-900 dark:text-white">{currentTopology.title}: {currentTopology.tagline}</span>
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
                    {tab === "code" ? "Python Code" : "Execution Trace"}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                {simStep > 0 && <button onClick={() => { setSimStep(0); setActiveCodeTab("code"); }} className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 cursor-pointer"><RotateCcw className="w-3 h-3" /> Reset</button>}
                <button onClick={handleRunSimulation} disabled={isSimulating}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-purple-600 hover:bg-purple-500 text-white text-xs font-mono disabled:opacity-50 cursor-pointer">
                  <Play className="w-3 h-3" />{isSimulating ? "Running..." : "Run Graph"}
                </button>
              </div>
            </div>
            <div className="p-4 min-h-[120px] font-mono text-xs">
              {activeCodeTab === "code" ? (
                <pre className="text-slate-300 whitespace-pre-wrap leading-relaxed">{currentTopology.codeSnippet}</pre>
              ) : (
                <div className="space-y-1.5 text-slate-300">
                  {simStep === 0 && <div className="text-slate-500 italic">Click &apos;Run Graph&apos; to trace the {currentTopology.tagline} execution...</div>}
                  {simStep >= 1 && <div className="text-purple-400">➜ [START] Compiling {currentTopology.title} graph...</div>}
                  {simStep >= 2 && selectedTopology === "linear" && <div className="text-slate-400 pl-4">load_pdf ✔ → extract_data ✔ → format_json ✔ → store_db ✔</div>}
                  {simStep >= 2 && selectedTopology === "cyclic" && <div className="text-amber-400 pl-4">draft ✔ → critique [score=72] → revise [loop=1] → critique [score=88] → END ✔</div>}
                  {simStep >= 2 && selectedTopology === "branching" && <div className="text-emerald-400 pl-4">classify → intent=&quot;billing&quot; → billing_specialist ✔ → END</div>}
                  {simStep >= 2 && selectedTopology === "hybrid" && <div className="text-purple-400 pl-4">classify → tech → quality [68] → refine → quality [84] → END ✔</div>}
                  {simStep >= 3 && <div className="text-slate-400">All nodes executed. State snapshot taken at each node checkpoint.</div>}
                  {simStep >= 4 && <div className="text-emerald-400 font-bold pt-2 border-t border-slate-800">✔ Graph completed — {currentTopology.flow}</div>}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: INTERACTIVE BUILDER */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">🔬 Topology Builder</h3>
        <WorkflowTopologyBuilder />
      </section>

      {/* NOTES */}
      <section className="space-y-3">
        <div className="p-4 rounded-xl border border-amber-300 dark:border-amber-500/30 bg-amber-50/90 dark:bg-amber-500/10 shadow-sm">
          <span className="font-['Caveat',cursive] text-base text-amber-950 dark:text-amber-200 block">✍️ Instructor Note: &quot;Before writing ANY code, sketch your graph on paper. Answer 3 questions: 1) What fields live in State? 2) Which node writes each field? 3) What is the exit condition? State schema first = zero architectural refactors later.&quot;</span>
        </div>
        <div className="p-4 rounded-xl border border-purple-200 dark:border-purple-500/30 bg-purple-50/90 dark:bg-purple-500/10 shadow-sm">
          <span className="font-['Caveat',cursive] text-base text-purple-950 dark:text-purple-200 block">📌 Production Rule: Every cyclic graph MUST have 2 exit conditions: a SUCCESS exit (quality threshold met) and a SAFETY exit (loop_count exceeded). Never ship a cyclic graph with only a success exit — one repeated tool error creates an infinite loop.</span>
        </div>
      </section>

      {/* TRAPS */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-amber-500" />Topology Traps</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-500/30 bg-rose-50/50 dark:bg-rose-500/5 space-y-2">
            <span className="text-xs font-mono font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider block">TRAP #1: State Schema Mismatch</span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">Node A writes state[&apos;result&apos;] as a string. Node B reads state[&apos;result&apos;] as a list. The graph compiles without error and fails silently at runtime. Always define a single TypedDict for state and share it across ALL nodes in the graph.</p>
          </div>
          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-500/5 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">TRAP #2: Missing Loop Counter</span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">A cyclic graph where the quality score never improves (bad prompt, wrong rubric, or broken tool) will loop at full LLM cost until the API rate limiter or your credit balance stops it. Add loop_count to state and increment it in every revision node.</p>
          </div>
        </div>
      </section>

      {/* KEY TAKEAWAYS */}
      <section className="rounded-xl border border-purple-200 dark:border-purple-500/30 bg-purple-50/50 dark:bg-purple-500/5 p-5 space-y-3">
        <h4 className="font-bold text-sm text-purple-900 dark:text-purple-300 flex items-center gap-2"><Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />Key Takeaways</h4>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          {[
            ["1.", "Choose Topology Based on Uncertainty:", "Linear = zero uncertainty (ETL). Cyclic = uncertain quality (drafting, coding). Branching = uncertain intent (customer support). Most real systems combine all three."],
            ["2.", "State Schema is the Foundation:", "Define your TypedDict state before nodes. Every node reads from and writes to this schema. State defines the contract between nodes — break it and the graph silently corrupts data."],
            ["3.", "Hybrid Patterns are the Reality:", "Branching without refinement produces low-quality answers. Reflection loops without triage are expensive. The best production agents combine a fast triage front-end with per-specialist quality loops at the back."],
          ].map(([n, bold, rest]) => (
            <li key={n} className="flex items-start gap-2"><span className="text-purple-600 dark:text-purple-400 font-bold">{n}</span><span><strong>{bold}</strong> {rest}</span></li>
          ))}
        </ul>
      </section>

      {/* QUIZ */}
      <section className="space-y-3">
        <button onClick={() => setShowQuiz(!showQuiz)} className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all text-left cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400"><HelpCircle className="w-5 h-5" /></div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">Concept Check: Workflow Topologies</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">{showQuiz ? "Click to collapse" : "3 questions"}</p>
            </div>
          </div>
          <span className="text-xs font-mono font-semibold px-3 py-1.5 rounded-lg bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-500/30">{showQuiz ? "Hide" : "Start"}</span>
        </button>
        <AnimatePresence>
          {showQuiz && (<motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }}><Module3_2Quiz /></motion.div>)}
        </AnimatePresence>
      </section>

      {/* NEXT MODULE */}
      <section className="rounded-2xl border border-purple-200 dark:border-purple-500/30 bg-gradient-to-r from-purple-50 via-white to-slate-50 dark:from-purple-500/10 dark:via-slate-900 dark:to-slate-950 p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <div className="text-xs font-mono font-bold text-purple-700 dark:text-purple-400 uppercase tracking-wider">Up Next • Module 3.3</div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Debugging Agents by Analyzing State Transitions</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">Use stream_mode=&quot;updates&quot; to replay state changes frame-by-frame and pinpoint exactly which node dropped or corrupted data.</p>
        </div>
        <Link href="/learn/level-3/module-3-3" className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs sm:text-sm shadow-sm transition-all shrink-0 cursor-pointer">
          <span>Continue to Module 3.3</span><ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
