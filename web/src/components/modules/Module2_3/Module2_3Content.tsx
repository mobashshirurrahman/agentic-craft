"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  Check,
  ArrowRight,
  Globe,
  Search,
  Code2,
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
  Zap,
  ShieldCheck,
} from "lucide-react";
import ExternalToolStudio from "./ExternalToolStudio";
import Module2_3Quiz from "./Module2_3Quiz";

export default function Module2_3Content() {
  const [selectedConcept, setSelectedConcept] = useState<string>("schema");
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [activeCodeTab, setActiveCodeTab] = useState<"code" | "output">("code");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);

  const toolConcepts = [
    {
      id: "schema",
      title: "1. Schema Gen",
      tagline: "Docstring → JSON",
      desc: "The framework reads your Python function's name, type hints, and docstring to auto-generate a JSON Schema. This is the only thing the LLM reads.",
      icon: Code2,
      color: "text-teal-600 dark:text-teal-400",
      bg: "bg-teal-50 dark:bg-teal-500/10",
      border: "border-teal-200 dark:border-teal-500/30",
      badge: "Step 1",
      codeSnippet: `# Step 1: Schema auto-generated from your docstring
from langchain_core.tools import tool

@tool
def search_web(query: str, max_results: int = 3) -> list[dict]:
    """Searches the live web for current news and facts.
    
    Args:
        query: The search query string to look up.
        max_results: Maximum number of results to return (1-10).
    
    Returns:
        A list of dicts with 'title', 'url', and 'content' keys.
    """
    # LLM sees the JSON schema, not this implementation
    ...`,
    },
    {
      id: "binding",
      title: "2. Model Bind",
      tagline: "Tool Registration",
      desc: "Bind one or more tool functions to your model via model.bind_tools([tool1, tool2]). The LLM now knows which tools exist and when to call them.",
      icon: Globe,
      color: "text-sky-600 dark:text-sky-400",
      bg: "bg-sky-50 dark:bg-sky-500/10",
      border: "border-sky-200 dark:border-sky-500/30",
      badge: "Step 2",
      codeSnippet: `# Step 2: Bind tools to the model
from langchain_community.tools.tavily_search import TavilySearchResults
from langchain_openai import ChatOpenAI

search_tool = TavilySearchResults(max_results=3)
calculator_tool = calculate  # our @tool function

model = ChatOpenAI(model="gpt-4o-mini", temperature=0)

# Now model knows about both tools via JSON schema
model_with_tools = model.bind_tools([search_tool, calculator_tool])`,
    },
    {
      id: "dispatch",
      title: "3. Auto Dispatch",
      tagline: "Call & Observe",
      desc: "When the LLM decides to use a tool, the framework automatically calls your Python function with the parsed arguments, then injects the result back as an observation.",
      icon: Zap,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      border: "border-amber-200 dark:border-amber-500/30",
      badge: "Step 3",
      codeSnippet: `# Step 3: Framework dispatches tool call automatically
from langgraph.prebuilt import create_react_agent

agent = create_react_agent(model, [search_tool, calculator_tool])

# LLM emits: {"name": "search_web", "args": {"query": "cricket score today"}}
# Framework executes Python function, injects observation
result = agent.invoke({"messages": [
    ("user", "What is today's cricket match score?")
]})`,
    },
    {
      id: "rules",
      title: "4. Golden Rules",
      tagline: "Selection Strategy",
      desc: "Start with one tool, test thoroughly, then add more. Account for latency (search = 300ms), cost (API calls), and failure modes. Write docstrings as tool usage guides for the LLM.",
      icon: ShieldCheck,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-500/10",
      border: "border-purple-200 dark:border-purple-500/30",
      badge: "Best Practice",
      codeSnippet: `# Step 4: Tool selection golden rules

# ✅ Rule 1: Start with ONE tool, test, then expand
agent = create_react_agent(model, [search_tool])  # not 20 tools

# ✅ Rule 2: Clear docstrings that say WHEN to use the tool
@tool
def search_web(query: str) -> list:
    """Use ONLY for current events after Oct 2024.
    Do NOT use for math, coding, or general knowledge.
    """

# ✅ Rule 3: Account for latency + cost in production
# search_web → 300-800ms + $0.002/call → use sparingly`,
    },
  ];

  const currentConcept =
    toolConcepts.find((c) => c.id === selectedConcept) || toolConcepts[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentConcept.codeSnippet);
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
      <section className="rounded-2xl border border-teal-200 dark:border-teal-500/30 bg-teal-50/60 dark:bg-teal-500/5 p-4 sm:p-6 backdrop-blur-sm shadow-sm">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-teal-600 text-white shrink-0 shadow-sm mt-0.5">
            <Target className="w-5 h-5" />
          </div>
          <div className="space-y-2 flex-1">
            <h2 className="text-sm font-mono uppercase tracking-wider text-teal-800 dark:text-teal-400 font-bold">
              🎯 By the end of this module, you will:
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                <span>Build custom @tool functions with type hints and descriptive docstrings</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                <span>Integrate Tavily Search to give agents real-time web access</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                <span>Understand schema generation, model binding, and tool auto-dispatch</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                <span>Apply golden rules for tool selection to avoid latency and cost traps</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: TOOL INTEGRATION PATTERN */}
      <section className="space-y-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30 text-teal-700 dark:text-teal-300 text-xs font-mono font-semibold mb-2">
            <Globe className="w-3.5 h-3.5" />
            <span>Tool Engineering • External APIs</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Integrating External Tools into an Agent
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            An LLM without tools is frozen at its training cutoff. By wrapping APIs as @tool functions, you give your agent live eyes on the world — from web search to database queries.
          </p>
        </div>

        {/* 4 SYMMETRICAL CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {toolConcepts.map((concept) => {
            const Icon = concept.icon;
            const isSelected = selectedConcept === concept.id;
            return (
              <button key={concept.id} onClick={() => setSelectedConcept(concept.id)}
                className={`p-3.5 sm:p-4 rounded-xl border text-left transition-all flex flex-col justify-between min-h-[145px] sm:min-h-[160px] active:scale-95 touch-manipulation cursor-pointer ${
                  isSelected ? "border-teal-500 bg-white dark:bg-slate-900 shadow-md ring-2 ring-teal-500/20" : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700"
                }`}>
                <div className="space-y-2">
                  <div className={`inline-flex p-1.5 rounded-lg ${concept.bg} border ${concept.border}`}>
                    <Icon className={`w-4 h-4 ${concept.color}`} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">{concept.title}</div>
                    <div className={`text-[10px] font-mono ${concept.color} mt-0.5`}>{concept.tagline}</div>
                  </div>
                </div>
                <p className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-2">{concept.desc}</p>
              </button>
            );
          })}
        </div>

        {/* CODE INSPECTOR */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`inline-flex p-1.5 rounded-lg ${currentConcept.bg} border ${currentConcept.border}`}>
                <currentConcept.icon className={`w-4 h-4 ${currentConcept.color}`} />
              </div>
              <span className="text-xs font-bold text-slate-900 dark:text-white">{currentConcept.title}: {currentConcept.tagline}</span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${currentConcept.bg} ${currentConcept.color} border ${currentConcept.border}`}>{currentConcept.badge}</span>
            </div>
            <button onClick={handleCopyCode} className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer">
              {copiedCode ? <CheckCheck className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedCode ? "Copied!" : "Copy"}
            </button>
          </div>

          <div className="rounded-xl border border-slate-800 overflow-hidden bg-slate-950">
            <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-slate-800">
              <div className="flex gap-1">
                {(["code", "output"] as const).map((tab) => (
                  <button key={tab} onClick={() => setActiveCodeTab(tab)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono transition-all cursor-pointer ${activeCodeTab === tab ? "bg-slate-700 text-white" : "text-slate-400 hover:text-slate-200"}`}>
                    {tab === "code" ? <FileText className="w-3 h-3" /> : <Terminal className="w-3 h-3" />}
                    {tab === "code" ? "Python Code" : "Output Terminal"}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                {simStep > 0 && (
                  <button onClick={() => { setSimStep(0); setActiveCodeTab("code"); }} className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 cursor-pointer">
                    <RotateCcw className="w-3 h-3" /> Reset
                  </button>
                )}
                <button onClick={handleRunSimulation} disabled={isSimulating}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-teal-600 hover:bg-teal-500 text-white text-xs font-mono transition-all disabled:opacity-50 cursor-pointer">
                  <Play className="w-3 h-3" />
                  {isSimulating ? "Searching..." : "Run"}
                </button>
              </div>
            </div>
            <div className="p-4 min-h-[140px] font-mono text-xs">
              {activeCodeTab === "code" ? (
                <pre className="text-slate-300 whitespace-pre-wrap leading-relaxed">{currentConcept.codeSnippet}</pre>
              ) : (
                <div className="space-y-2 text-slate-300">
                  {simStep === 0 && <div className="text-slate-500 italic">Click &apos;Run&apos; to execute Tavily search...</div>}
                  {simStep >= 1 && <div className="text-teal-400">➜ [AGENT] Query received: &quot;What is today&apos;s cricket match score?&quot;</div>}
                  {simStep >= 2 && <div className="text-slate-400 pl-4">[TOOL DISPATCH] search_web(query=&quot;cricket score today 2024&quot;)<br /><span className="text-sky-400">✔ Tavily API responded in 342ms — 3 results returned</span></div>}
                  {simStep >= 3 && <div className="text-purple-300">➜ [OBSERVATION] India scored 287/4 in 50 overs vs Australia in Pune</div>}
                  {simStep >= 4 && (
                    <div className="text-emerald-400 font-bold pt-2 border-t border-slate-800">
                      ✔ [AGENT RESPONSE] &quot;India scored 287/4 in today&apos;s ODI match against Australia in Pune.&quot;
                      <br /><span className="text-slate-400 font-normal text-[10px]">Live data sourced from web search — not LLM training data.</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: ANALOGY */}
      <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">🔧 Mental Model: LLM Alone vs. LLM + Tools</h3>
        </div>
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-2">
            <div className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">❌ LLM Alone (Knowledge Cutoff)</div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Like asking a very smart professor who&apos;s been in a coma since 2024 about today&apos;s cricket score. They know everything that happened before, but cannot access live information.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-teal-200 dark:border-teal-500/30 bg-teal-50 dark:bg-teal-500/10 space-y-2">
            <div className="text-xs font-mono font-bold text-teal-700 dark:text-teal-400">✅ LLM + External Tool</div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Like giving that same professor a smartphone with internet. Now they can look up live facts, current events, and real-time data — and still apply all their expertise to synthesize the answer.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: EXTERNAL TOOL STUDIO */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">🔬 External Tool Integration Studio</h3>
        <ExternalToolStudio />
      </section>

      {/* SECTION 4: HANDWRITTEN NOTES */}
      <section className="space-y-3">
        <div className="p-4 rounded-xl border border-amber-300 dark:border-amber-500/30 bg-amber-50/90 dark:bg-amber-500/10 shadow-sm">
          <span className="font-['Caveat',cursive] text-base text-amber-950 dark:text-amber-200 block sm:-rotate-0.5">
            ✍️ Instructor Note: &quot;The LLM never runs your Python code — it only generates tool call JSON. The framework runs it. This means if your tool has a bug, the LLM won&apos;t know until it sees the traceback as an observation!&quot;
          </span>
        </div>
        <div className="p-4 rounded-xl border border-teal-200 dark:border-teal-500/30 bg-teal-50/90 dark:bg-teal-500/10 shadow-sm">
          <span className="font-['Caveat',cursive] text-base text-teal-950 dark:text-teal-200 block">
            💡 Mental Model: Think of tools as specialized restaurant departments — the LLM is the head chef who decides which department to order from (kitchen, bar, dessert station), but doesn&apos;t cook the dish themselves.
          </span>
        </div>
        <div className="p-4 rounded-xl border border-sky-200 dark:border-sky-500/30 bg-sky-50/90 dark:bg-sky-500/10 shadow-sm">
          <span className="font-['Caveat',cursive] text-base text-sky-950 dark:text-sky-200 block">
            📌 Core Rule: Never give an agent more than 5-7 tools at once. With 20+ tools, the LLM spends so many tokens deciding which tool to use that reasoning quality collapses. Use tool retrieval for large tool libraries.
          </span>
        </div>
      </section>

      {/* SECTION 5: TRAPS */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          <span>External Tool Integration Traps</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-500/30 bg-rose-50/50 dark:bg-rose-500/5 space-y-2">
            <span className="text-xs font-mono font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider block">TRAP #1: Tool Overload</span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Binding 15 tools to an agent causes the LLM to become indecisive — it picks the wrong tool or skips tool calls entirely. Always start with the minimum tool set, then add only what tests prove is needed.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-500/5 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">TRAP #2: No Error Handling in Tools</span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              If your @tool raises an unhandled exception, the raw Python traceback is injected as the observation. The LLM tries to reason about it and often hallucinate a fix. Always catch exceptions and return structured error dicts.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6: KEY TAKEAWAYS */}
      <section className="rounded-xl border border-teal-200 dark:border-teal-500/30 bg-teal-50/50 dark:bg-teal-500/5 p-5 space-y-3">
        <h4 className="font-bold text-sm text-teal-900 dark:text-teal-300 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          <span>Key Takeaways</span>
        </h4>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          <li className="flex items-start gap-2">
            <span className="text-teal-600 dark:text-teal-400 font-bold">1.</span>
            <span><strong>Docstrings are Tool Instructions:</strong> Write the @tool docstring as if instructing the LLM exactly when to call it, what to pass, and what it will receive back.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal-600 dark:text-teal-400 font-bold">2.</span>
            <span><strong>The Framework Handles Dispatch:</strong> You never manually call your tool function in agent code. The framework parses the LLM&apos;s tool call JSON and executes it automatically.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal-600 dark:text-teal-400 font-bold">3.</span>
            <span><strong>Account for Latency &amp; Cost:</strong> Web searches cost money and time. Design your agent to prefer cached knowledge (RAG) over live search when recency isn&apos;t required.</span>
          </li>
        </ul>
      </section>

      {/* SECTION 7: QUIZ */}
      <section className="space-y-3">
        <button onClick={() => setShowQuiz(!showQuiz)}
          className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all text-left shadow-xs cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">Concept Check: External Tool Integration</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">{showQuiz ? "Click to collapse" : "Test your tool integration intuition (3 questions)"}</p>
            </div>
          </div>
          <span className="text-xs font-mono font-semibold px-3 py-1.5 rounded-lg bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-400 border border-teal-200 dark:border-teal-500/30">
            {showQuiz ? "Hide Quiz" : "Start Quiz"}
          </span>
        </button>
        <AnimatePresence>
          {showQuiz && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }}>
              <Module2_3Quiz />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* SECTION 8: NEXT MODULE BRIDGE */}
      <section className="rounded-2xl border border-teal-200 dark:border-teal-500/30 bg-gradient-to-r from-teal-50 via-white to-slate-50 dark:from-teal-500/10 dark:via-slate-900 dark:to-slate-950 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider">
            <span>Up Next • Module 2.4</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Building Simple Multi-Step LLM Workflows</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
            Not every task needs an autonomous agent. Learn when deterministic sequential chains beat loops — and build them with LCEL&apos;s elegant pipe composition.
          </p>
        </div>
        <Link href="/learn/level-2/module-2-4"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow-teal-500/20 transition-all shrink-0 cursor-pointer">
          <span>Continue to Module 2.4</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
