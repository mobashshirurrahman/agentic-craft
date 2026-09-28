"use client";

import React, { useState } from "react";
import {
  GitCommit,
  Play,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Code2,
  Layers,
  CheckCircle2,
  FileText,
  ChevronRight,
} from "lucide-react";

interface ChainStep {
  name: string;
  type: "PromptTemplate" | "LLM" | "OutputParser";
  input: string;
  output: string;
}

export default function MultiStepChainBuilder() {
  const [selectedWorkflow, setSelectedWorkflow] = useState<"writing" | "rag">("writing");
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [executionDone, setExecutionDone] = useState<boolean>(false);

  const writingSteps: ChainStep[] = [
    {
      name: "Step 1: Prompt Template (Draft)",
      type: "PromptTemplate",
      input: "Topic: 'Why SQLite is great for local agents'",
      output: `Prompt formatted: "Write a 2-sentence draft highlighting speed and zero-configuration for SQLite in local AI agents."`,
    },
    {
      name: "Step 2: LLM Call (Draft Generation)",
      type: "LLM",
      input: `Prompt from Step 1`,
      output: `"SQLite runs in-process with zero network overhead, making it lightning fast for local memory. Furthermore, it requires no standalone server installation, making deployment trivial."`,
    },
    {
      name: "Step 3: Critique & Polish Chain",
      type: "PromptTemplate",
      input: `Draft from Step 2`,
      output: `Prompt formatted: "Refine this draft to be punchy, engaging, and under 25 words: [Draft text]"`,
    },
    {
      name: "Step 4: Final LLM & StrOutputParser",
      type: "OutputParser",
      input: `Refined Output`,
      output: `"Zero server setup, in-process speed, and instant persistence make SQLite the ultimate embedded database for local agentic workflows."`,
    },
  ];

  const ragSteps: ChainStep[] = [
    {
      name: "Step 1: Document Formatter",
      type: "PromptTemplate",
      input: "Retrieved 2 chunks from Vector Store",
      output: `Context: [Chunk A: 'Refunds permitted within 14 days'], [Chunk B: 'Digital downloads non-refundable']`,
    },
    {
      name: "Step 2: Grounded Q&A Prompt",
      type: "PromptTemplate",
      input: "User query: 'Can I refund my downloaded ebook purchased 3 days ago?'",
      output: `System: 'Answer strictly using the provided context.' User: 'Can I refund ebook 3 days ago?'`,
    },
    {
      name: "Step 3: LLM Inference",
      type: "LLM",
      input: `Grounded Prompt`,
      output: `{"eligible": false, "reason": "Digital downloads are strictly non-refundable per policy Chunk B.", "confidence": 0.98}`,
    },
    {
      name: "Step 4: JsonOutputParser",
      type: "OutputParser",
      input: `Raw LLM String`,
      output: `Parsed Python Dict: {'eligible': False, 'reason': 'Digital downloads are non-refundable...', 'confidence': 0.98}`,
    },
  ];

  const steps = selectedWorkflow === "writing" ? writingSteps : ragSteps;

  const handleRunChain = () => {
    setIsExecuting(true);
    setActiveStepIndex(0);
    setExecutionDone(false);

    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current < steps.length) {
        setActiveStepIndex(current);
      } else {
        clearInterval(interval);
        setIsExecuting(false);
        setExecutionDone(true);
      }
    }, 450);
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm overflow-hidden transition-colors">
      {/* Header */}
      <div className="p-5 md:p-6 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-purple-500/10 via-sky-500/5 to-transparent">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                Multi-Step LCEL Chain Simulator
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/30">
                  Prompt | Model | Parser
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Visualize how deterministic multi-step chains pipe state cleanly from one node to the next
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setSelectedWorkflow(selectedWorkflow === "writing" ? "rag" : "writing");
                setActiveStepIndex(0);
                setExecutionDone(false);
              }}
              className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition"
            >
              Switch: {selectedWorkflow === "writing" ? "RAG Chain" : "Writing Chain"}
            </button>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="p-5 md:p-6 space-y-6">
        {/* Pipeline Diagram */}
        <div className="flex flex-wrap items-center justify-between gap-2 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800">
          {steps.map((s, idx) => {
            const isActive = isExecuting && activeStepIndex === idx;
            const isCompleted = executionDone || (isExecuting && activeStepIndex > idx);

            return (
              <React.Fragment key={idx}>
                <div
                  className={`p-2.5 rounded-lg border text-xs font-mono transition-all ${
                    isActive
                      ? "border-purple-500 bg-purple-500/20 text-purple-950 dark:text-purple-200 shadow-sm scale-105"
                      : isCompleted
                      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300"
                      : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-400"
                  }`}
                >
                  <div className="text-[10px] text-slate-400 uppercase">{s.type}</div>
                  <div className="font-bold">{s.name.split(":")[0]}</div>
                </div>
                {idx < steps.length - 1 && (
                  <span className="text-slate-400 font-mono text-sm hidden sm:inline">|</span>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Live Step-by-Step State Inspector */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold block">
              Step Execution Details
            </span>
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-xs space-y-2 min-h-[140px]">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-white">
                  {steps[activeStepIndex].name}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-700 dark:text-purple-300">
                  {steps[activeStepIndex].type}
                </span>
              </div>
              <div className="text-slate-500 text-[11px]">
                <strong>Input:</strong> {steps[activeStepIndex].input}
              </div>
              <div className="p-2.5 rounded bg-slate-900 text-slate-200 font-mono text-[11px] overflow-x-auto">
                <span className="text-purple-400 block text-[10px]"># Output Payload:</span>
                {steps[activeStepIndex].output}
              </div>
            </div>
          </div>

          {/* Python LCEL Code */}
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold block">
              Python LCEL Pipe Architecture
            </span>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-mono text-xs overflow-x-auto min-h-[140px]">
              <pre className="text-purple-300">{`from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_openai import ChatOpenAI

# 1. Compose chain with pipe operator (|)
prompt = ChatPromptTemplate.from_template("Improve this text: {input}")
model = ChatOpenAI(model="gpt-4o-mini")
parser = StrOutputParser()

# Pure, clean, deterministic chain
chain = prompt | model | parser

# 2. Invoke chain
result = chain.invoke({"input": "Draft text..."})`}</pre>
            </div>
          </div>
        </div>

        {/* Trigger Button */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={handleRunChain}
            disabled={isExecuting}
            className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs font-bold transition flex items-center gap-2 shadow-sm disabled:opacity-50"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>{isExecuting ? "Piping State..." : "Run Multi-Step Chain"}</span>
          </button>

          {executionDone && (
            <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              Chain Execution Finished (Zero Latency Variance)
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
