"use client";

import React from "react";
import {
  Layers,
  Sparkles,
  Code2,
  ArrowRight,
  GitCommit,
  CheckCircle2,
  Cpu,
} from "lucide-react";
import MultiStepChainBuilder from "./MultiStepChainBuilder";
import Module2_4Quiz from "./Module2_4Quiz";

export default function Module2_4Content() {
  return (
    <div className="space-y-10">
      {/* Hero Banner */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-purple-500/10 via-sky-500/5 to-slate-50 dark:to-slate-950 p-6 md:p-8 relative overflow-hidden transition-colors">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/30">
              Module 2.4 • Core Implementation
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              ~15 min hands-on
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Building Simple Multi-Step LLM Workflows
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Not every task requires an unpredictable autonomous agent. When the sequence of steps is known, <strong>sequential chains</strong> give you 100% deterministic predictability, lower latency, and zero runaway loop risk.
          </p>
        </div>
      </div>

      {/* Section 1: The 3 Core Building Blocks */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-purple-500" />
          1. The 3 Core Building Blocks
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400">1. Prompt Template</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Injects dynamic variables into predefined prompt patterns safely without manual f-string vulnerabilities.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400">2. LLM Call</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Processes the prompt through an API endpoint (e.g. OpenAI, Anthropic, Gemini) with configured temperature.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">3. Output Parser</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Extracts the generated string into clean text, a JSON dict, or a validated Pydantic object.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: LCEL Code Composition */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Code2 className="w-5 h-5 text-sky-500" />
          2. Composing Chains with LCEL (|)
        </h2>
        <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs border border-slate-800 overflow-x-auto">
          <pre>{`from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_openai import ChatOpenAI

# Step 1: Draft chain
draft_prompt = ChatPromptTemplate.from_template("Write a rough draft about: {topic}")
model = ChatOpenAI(model="gpt-4o-mini", temperature=0.7)
parser = StrOutputParser()

draft_chain = draft_prompt | model | parser

# Step 2: Polish chain
polish_prompt = ChatPromptTemplate.from_template("Make this text punchy and concise: {draft}")
polish_chain = polish_prompt | model | parser

# Full multi-step workflow
draft = draft_chain.invoke({"topic": "Distributed Consensus in Agents"})
final_text = polish_chain.invoke({"draft": draft})`}</pre>
        </div>
      </section>

      {/* Interactive Simulator */}
      <section className="space-y-4">
        <MultiStepChainBuilder />
      </section>

      {/* Quiz */}
      <section className="space-y-4">
        <Module2_4Quiz />
      </section>

      {/* Next Step Callout */}
      <div className="p-4 rounded-xl border border-purple-500/30 bg-purple-500/10 text-xs font-mono text-slate-700 dark:text-slate-300 flex items-center justify-between">
        <span>Up Next: Module 2.5 — Create an Agent Class from Scratch in Python</span>
        <ArrowRight className="w-4 h-4 text-purple-500" />
      </div>
    </div>
  );
}
