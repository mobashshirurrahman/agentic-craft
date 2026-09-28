"use client";

import React from "react";
import {
  Sparkles,
  FileCode2,
  Code2,
  Layers,
  CheckCircle2,
  Lightbulb,
} from "lucide-react";
import DynamicPromptTemplateStudio from "./DynamicPromptTemplateStudio";
import Module2_14Quiz from "./Module2_14Quiz";

export default function Module2_14Content() {
  return (
    <div className="space-y-10">
      {/* Hero Banner */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-slate-50 dark:to-slate-950 p-6 md:p-8 relative overflow-hidden transition-colors">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/30">
              Module 2.14 • Core Implementation
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              ~20 min hands-on
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Creating Reusable Dynamic Prompt Templates
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Hardcoded Python strings and raw f-strings break in production. Real-world agent systems decouple prompt engineering from application logic using <strong>structured, composable prompt templates</strong> with role isolation and message history placeholders.
          </p>
        </div>
      </div>

      {/* Section 1: Raw Strings vs ChatPromptTemplate */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <FileCode2 className="w-5 h-5 text-purple-500" />
          1. Why Raw String Interpolation Fails
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-red-200 dark:border-red-900/40 bg-red-50/60 dark:bg-red-950/20 space-y-2">
            <span className="text-xs font-mono font-bold text-red-700 dark:text-red-400 uppercase flex items-center gap-1.5">
              ⚠️ The Fragile Anti-Pattern (Raw f-strings)
            </span>
            <p className="text-xs text-slate-700 dark:text-slate-400 leading-relaxed">
              Embedding user input directly inside f-strings collapses roles into one blob, breaks on unescaped brackets or quotes, and prevents testing prompts without executing code.
            </p>
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-rose-300 font-mono text-[11px] overflow-x-auto shadow-inner">
              {'prompt = f"System: {role}\\nUser: {query}"'}
            </div>
          </div>

          <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/60 dark:bg-emerald-950/20 space-y-2">
            <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 uppercase flex items-center gap-1.5">
              ✅ Production Pattern (ChatPromptTemplate)
            </span>
            <p className="text-xs text-slate-700 dark:text-slate-400 leading-relaxed">
              Encapsulates role boundaries (System, Human, AI), escapes input variables safely, accepts dynamic history streams, and allows runtime partial variable binding.
            </p>
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-emerald-300 font-mono text-[11px] overflow-x-auto shadow-inner">
              template = ChatPromptTemplate.from_messages(...)
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Core Components & MessagesPlaceholder */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-pink-500" />
          2. Anatomy of a Production Agent Template
        </h2>
        <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs border border-slate-800 overflow-x-auto">
          <pre>{`from langchain_core.prompts import (
    ChatPromptTemplate,
    MessagesPlaceholder,
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
)

# 1. Compose multi-role template with history placeholder
template = ChatPromptTemplate.from_messages([
    ("system", "You are an expert {domain} agent. Tone: {tone}."),
    MessagesPlaceholder(variable_name="chat_history"), # Injects previous messages
    ("human", "{input}"),
])

# 2. Format with runtime parameters
formatted_messages = template.format_messages(
    domain="Cloud Security Auditor",
    tone="concise and analytical",
    chat_history=[],
    input="Review this IAM policy for privilege escalation risks."
)

# 3. Partial pre-filling (e.g., config locked at startup)
auditor_prompt = template.partial(domain="Security Auditor", tone="strictly formal")`}</pre>
        </div>
      </section>

      {/* Interactive Studio */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            3. Interactive Prompt Template Studio
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Live Parameter Interpolation
          </span>
        </div>
        <DynamicPromptTemplateStudio />
      </section>

      {/* Section 4: Best Practices Card */}
      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 space-y-2">
        <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-semibold text-sm">
          <Lightbulb className="w-4 h-4 text-amber-500" />
          Production Engineering Rule: Treat Prompts as Code
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Store templates in dedicated YAML or Python configuration modules rather than scattering strings across function bodies. Always validate that required template variables match incoming payload keys using Pydantic or schema validators before invocation.
        </p>
      </div>

      {/* Quiz */}
      <section className="space-y-4">
        <Module2_14Quiz />
      </section>
    </div>
  );
}
