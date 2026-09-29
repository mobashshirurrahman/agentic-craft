"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  Check,
  ArrowRight,
  Layers,
  Code2,
  Cpu,
  GitCommit,
  AlertTriangle,
  Sparkles,
  HelpCircle,
  Copy,
  CheckCheck,
  Play,
  RotateCcw,
  Terminal,
  FileText,
  Workflow,
} from "lucide-react";
import MultiStepChainBuilder from "./MultiStepChainBuilder";
import Module2_4Quiz from "./Module2_4Quiz";

export default function Module2_4Content() {
  const [selectedStep, setSelectedStep] = useState<string>("template");
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [activeCodeTab, setActiveCodeTab] = useState<"code" | "output">("code");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);

  const chainSteps = [
    {
      id: "template",
      title: "1. Prompt Template",
      tagline: "Safe Variable Injection",
      desc: "ChatPromptTemplate injects dynamic variables into predefined prompt patterns safely — no f-string injection vulnerabilities, with full variable validation.",
      icon: FileText,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-500/10",
      border: "border-purple-200 dark:border-purple-500/30",
      badge: "Block 1",
      codeSnippet: `# Block 1: Prompt Template with dynamic variables
from langchain_core.prompts import ChatPromptTemplate

draft_prompt = ChatPromptTemplate.from_messages([
    ("system", "You are an expert technical writer."),
    ("human", "Write a detailed but concise blog post about: {topic}")
])

# Variables are safely injected at runtime, not as f-strings
# This prevents prompt injection attacks from user input`,
    },
    {
      id: "llm",
      title: "2. LLM Call",
      tagline: "API Processing",
      desc: "The formatted prompt is sent to the LLM endpoint (OpenAI, Anthropic, Gemini). Temperature controls creativity; lower = more deterministic output.",
      icon: Cpu,
      color: "text-sky-600 dark:text-sky-400",
      bg: "bg-sky-50 dark:bg-sky-500/10",
      border: "border-sky-200 dark:border-sky-500/30",
      badge: "Block 2",
      codeSnippet: `# Block 2: LLM Call with temperature control
from langchain_openai import ChatOpenAI

# temperature=0 → deterministic (good for structured tasks)
# temperature=0.7 → creative (good for drafting, brainstorming)
model = ChatOpenAI(model="gpt-4o-mini", temperature=0.7)

# Model receives the formatted prompt from Block 1
# Returns an AIMessage with the generated content`,
    },
    {
      id: "parser",
      title: "3. Output Parser",
      tagline: "Type Extraction",
      desc: "The parser converts the raw AIMessage into the exact Python type you need — plain string, JSON dict, or Pydantic model. Zero manual parsing code.",
      icon: Code2,
      color: "text-teal-600 dark:text-teal-400",
      bg: "bg-teal-50 dark:bg-teal-500/10",
      border: "border-teal-200 dark:border-teal-500/30",
      badge: "Block 3",
      codeSnippet: `# Block 3: Output Parser options
from langchain_core.output_parsers import StrOutputParser, JsonOutputParser
from pydantic import BaseModel

# Option A: Simple string (most common)
str_parser = StrOutputParser()

# Option B: JSON dict
json_parser = JsonOutputParser()

# Option C: Typed Pydantic object
class BlogPost(BaseModel):
    title: str; content: str; word_count: int
pydantic_parser = JsonOutputParser(pydantic_object=BlogPost)`,
    },
    {
      id: "compose",
      title: "4. LCEL Compose",
      tagline: "Pipe Chaining ( | )",
      desc: "LCEL's pipe operator (|) composes blocks into sequential chains. Each block's output becomes the next block's input — declarative, readable, and composable.",
      icon: Workflow,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      border: "border-amber-200 dark:border-amber-500/30",
      badge: "Block 4",
      codeSnippet: `# Block 4: Compose into a multi-step workflow
from langchain_core.output_parsers import StrOutputParser

# Full 3-step chain using the LCEL pipe operator
draft_chain = draft_prompt | model | StrOutputParser()

# Second step: polish the draft
polish_prompt = ChatPromptTemplate.from_messages([
    ("human", "Make this punchy and concise (max 100 words): {draft}")
])
polish_chain = polish_prompt | model | StrOutputParser()

# Run the pipeline: draft → polish
raw_draft = draft_chain.invoke({"topic": "LangGraph State Management"})
final_text = polish_chain.invoke({"draft": raw_draft})`,
    },
  ];

  const currentStep =
    chainSteps.find((s) => s.id === selectedStep) || chainSteps[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentStep.codeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setActiveCodeTab("output");
    setSimStep(1);
    setTimeout(() => setSimStep(2), 800);
    setTimeout(() => setSimStep(3), 1600);
    setTimeout(() => {
      setSimStep(4);
      setIsSimulating(false);
    }, 2600);
  };

  return (
    <div className="space-y-10 max-w-5xl mx-auto pb-16">
      {/* 🎯 TOP OBJECTIVE BANNER */}
      <section className="rounded-2xl border border-purple-200 dark:border-purple-500/30 bg-purple-50/60 dark:bg-purple-500/5 p-4 sm:p-6 backdrop-blur-sm shadow-sm">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-purple-600 text-white shrink-0 shadow-sm mt-0.5">
            <Target className="w-5 h-5" />
          </div>
          <div className="space-y-2 flex-1">
            <h2 className="text-sm font-mono uppercase tracking-wider text-purple-800 dark:text-purple-400 font-bold">
              🎯 By the end of this module, you will:
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                <span>Build multi-step LLM workflows using LCEL&apos;s pipe operator (|)</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                <span>Compose PromptTemplate → LLM → OutputParser chains without boilerplate</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                <span>Pass state between sequential chain steps as structured typed objects</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                <span>Choose correctly between deterministic chains vs autonomous agent loops</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: THE 3 CORE BUILDING BLOCKS */}
      <section className="space-y-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/30 text-purple-700 dark:text-purple-300 text-xs font-mono font-semibold mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>LCEL Chains • Sequential Workflows</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Building Multi-Step LLM Workflows
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Sequential chains give you 100% predictable, deterministic pipelines — when you know every step in advance, chains beat autonomous loops every time for speed, cost, and reliability.
          </p>
        </div>

        {/* 4 SYMMETRICAL CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {chainSteps.map((step) => {
            const Icon = step.icon;
            const isSelected = selectedStep === step.id;
            return (
              <button key={step.id} onClick={() => setSelectedStep(step.id)}
                className={`p-3.5 sm:p-4 rounded-xl border text-left transition-all flex flex-col justify-between min-h-[145px] sm:min-h-[160px] active:scale-95 touch-manipulation cursor-pointer ${
                  isSelected ? "border-purple-500 bg-white dark:bg-slate-900 shadow-md ring-2 ring-purple-500/20" : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700"
                }`}>
                <div className="space-y-2">
                  <div className={`inline-flex p-1.5 rounded-lg ${step.bg} border ${step.border}`}>
                    <Icon className={`w-4 h-4 ${step.color}`} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">{step.title}</div>
                    <div className={`text-[10px] font-mono ${step.color} mt-0.5`}>{step.tagline}</div>
                  </div>
                </div>
                <p className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-2">{step.desc}</p>
              </button>
            );
          })}
        </div>

        {/* CODE INSPECTOR */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`inline-flex p-1.5 rounded-lg ${currentStep.bg} border ${currentStep.border}`}>
                <currentStep.icon className={`w-4 h-4 ${currentStep.color}`} />
              </div>
              <span className="text-xs font-bold text-slate-900 dark:text-white">{currentStep.title}: {currentStep.tagline}</span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${currentStep.bg} ${currentStep.color} border ${currentStep.border}`}>{currentStep.badge}</span>
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
                  className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-purple-600 hover:bg-purple-500 text-white text-xs font-mono transition-all disabled:opacity-50 cursor-pointer">
                  <Play className="w-3 h-3" />
                  {isSimulating ? "Chaining..." : "Run"}
                </button>
              </div>
            </div>
            <div className="p-4 min-h-[140px] font-mono text-xs">
              {activeCodeTab === "code" ? (
                <pre className="text-slate-300 whitespace-pre-wrap leading-relaxed">{currentStep.codeSnippet}</pre>
              ) : (
                <div className="space-y-2 text-slate-300">
                  {simStep === 0 && <div className="text-slate-500 italic">Click &apos;Run&apos; to simulate chain execution...</div>}
                  {simStep >= 1 && <div className="text-purple-400">➜ [STEP 1] draft_chain invoked with topic: &quot;LangGraph State Management&quot;</div>}
                  {simStep >= 2 && <div className="text-slate-400 pl-4">[LLM CALL] gpt-4o-mini → temperature=0.7 → 847 completion tokens<br /><span className="text-sky-400">✔ Draft: 280 word blog post generated in 1.2s</span></div>}
                  {simStep >= 3 && <div className="text-amber-300">➜ [STEP 2] polish_chain invoked with draft as input</div>}
                  {simStep >= 4 && (
                    <div className="text-emerald-400 font-bold pt-2 border-t border-slate-800">
                      ✔ [FINAL OUTPUT] 94 word polished article produced<br />
                      &quot;LangGraph State Management transforms complex agent workflows into typed, inspectable, and resumable state machines...&quot;<br />
                      <span className="text-slate-400 font-normal text-[10px]">Total pipeline: 2 LLM calls, 1.4s, ~$0.003</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: CHAIN VS AGENT ANALOGY */}
      <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">⚖️ When to Use Chains vs. Agents</h3>
        </div>
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-purple-200 dark:border-purple-500/30 bg-purple-50 dark:bg-purple-500/10 space-y-2">
            <div className="text-xs font-mono font-bold text-purple-700 dark:text-purple-400">✅ Use a Chain When:</div>
            <ul className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-1">
              <li>• Steps are known in advance (deterministic)</li>
              <li>• You need strict cost control per request</li>
              <li>• Predictable latency is required (&lt;2s SLA)</li>
              <li>• Output quality is consistent across runs</li>
            </ul>
          </div>
          <div className="p-4 rounded-xl border border-sky-200 dark:border-sky-500/30 bg-sky-50 dark:bg-sky-500/10 space-y-2">
            <div className="text-xs font-mono font-bold text-sky-700 dark:text-sky-400">✅ Use an Agent When:</div>
            <ul className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-1">
              <li>• Steps cannot be predicted in advance</li>
              <li>• Task requires adaptive tool selection</li>
              <li>• Multiple attempts/retries may be needed</li>
              <li>• Task complexity varies widely per query</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 3: MULTI-STEP CHAIN BUILDER */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">🔬 Multi-Step Chain Builder</h3>
        <MultiStepChainBuilder />
      </section>

      {/* SECTION 4: HANDWRITTEN NOTES */}
      <section className="space-y-3">
        <div className="p-4 rounded-xl border border-amber-300 dark:border-amber-500/30 bg-amber-50/90 dark:bg-amber-500/10 shadow-sm">
          <span className="font-['Caveat',cursive] text-base text-amber-950 dark:text-amber-200 block sm:-rotate-0.5">
            ✍️ Instructor Note: &quot;LCEL chains are synchronous by default. If you&apos;re building a web server, use chain.ainvoke() for async execution — synchronous chain.invoke() in a FastAPI handler will block your entire event loop!&quot;
          </span>
        </div>
        <div className="p-4 rounded-xl border border-teal-200 dark:border-teal-500/30 bg-teal-50/90 dark:bg-teal-500/10 shadow-sm">
          <span className="font-['Caveat',cursive] text-base text-teal-950 dark:text-teal-200 block">
            💡 Mental Model: LCEL chains are like an assembly line in a factory — Part A goes to Station 1 (template), gets processed, goes to Station 2 (LLM), gets processed, then to Station 3 (parser). Each station does exactly one job.
          </span>
        </div>
        <div className="p-4 rounded-xl border border-sky-200 dark:border-sky-500/30 bg-sky-50/90 dark:bg-sky-500/10 shadow-sm">
          <span className="font-['Caveat',cursive] text-base text-sky-950 dark:text-sky-200 block">
            📌 Core Rule: Don&apos;t chain more than 3-4 LLM calls in a single user request. Each call adds latency, cost, and a chance of error. If your workflow has 8+ LLM steps, redesign it as an agent loop with early exit conditions.
          </span>
        </div>
      </section>

      {/* SECTION 5: TRAPS */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          <span>Multi-Step Chain Traps</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-500/30 bg-rose-50/50 dark:bg-rose-500/5 space-y-2">
            <span className="text-xs font-mono font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider block">TRAP #1: Context Loss Between Steps</span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              By default, each chain step only sees what you explicitly pass to it. If Step 2 needs context from Step 1 AND the original input, you must manually pass both. Always design state passing explicitly — nothing flows automatically.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-500/5 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">TRAP #2: Using Chains for Dynamic Tasks</span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Don&apos;t force a sequential chain onto tasks that require conditional branching (e.g., &quot;if the search fails, try a different query&quot;). Conditional logic belongs in a LangGraph agent, not a linear LCEL chain.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6: KEY TAKEAWAYS */}
      <section className="rounded-xl border border-purple-200 dark:border-purple-500/30 bg-purple-50/50 dark:bg-purple-500/5 p-5 space-y-3">
        <h4 className="font-bold text-sm text-purple-900 dark:text-purple-300 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          <span>Key Takeaways</span>
        </h4>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          <li className="flex items-start gap-2">
            <span className="text-purple-600 dark:text-purple-400 font-bold">1.</span>
            <span><strong>Chains for Determinism:</strong> Use LCEL chains when every step is known, latency is critical, and cost must be predictable. Chains give you assembly-line reliability.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-600 dark:text-purple-400 font-bold">2.</span>
            <span><strong>Pipe Operator (|) is Declarative:</strong> <code>prompt | model | parser</code> reads exactly like the data flow. LCEL chains are self-documenting by design.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-600 dark:text-purple-400 font-bold">3.</span>
            <span><strong>Explicit State Passing:</strong> Nothing flows between chain steps unless you pass it. Design your state contracts (what each step receives) before writing any code.</span>
          </li>
        </ul>
      </section>

      {/* SECTION 7: QUIZ */}
      <section className="space-y-3">
        <button onClick={() => setShowQuiz(!showQuiz)}
          className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all text-left shadow-xs cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">Concept Check: Multi-Step Workflows</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">{showQuiz ? "Click to collapse" : "Test your LCEL chain intuition (3 questions)"}</p>
            </div>
          </div>
          <span className="text-xs font-mono font-semibold px-3 py-1.5 rounded-lg bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-500/30">
            {showQuiz ? "Hide Quiz" : "Start Quiz"}
          </span>
        </button>
        <AnimatePresence>
          {showQuiz && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }}>
              <Module2_4Quiz />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* SECTION 8: NEXT MODULE BRIDGE */}
      <section className="rounded-2xl border border-purple-200 dark:border-purple-500/30 bg-gradient-to-r from-purple-50 via-white to-slate-50 dark:from-purple-500/10 dark:via-slate-900 dark:to-slate-950 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-purple-700 dark:text-purple-400 uppercase tracking-wider">
            <span>Up Next • Module 2.5</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Create an Agent Class from Scratch in Python</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
            Strip away all frameworks. Build a raw Python Agent class with an LLM caller, a tool executor, and a manual ReAct while loop — so you understand every abstraction from the inside out.
          </p>
        </div>
        <Link href="/learn/level-2/module-2-5"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow-purple-500/20 transition-all shrink-0 cursor-pointer">
          <span>Continue to Module 2.5</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
