"use client";

import React from "react";
import {
  FileJson,
  CheckCircle2,
  Code2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import PydanticSchemaVisualizer from "./PydanticSchemaVisualizer";
import Module2_2Quiz from "./Module2_2Quiz";

export default function Module2_2Content() {
  return (
    <div className="space-y-10">
      {/* Hero Banner */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-slate-50 dark:to-slate-950 p-6 md:p-8 relative overflow-hidden transition-colors">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
              Module 2.2 • Core Implementation
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              ~15 min hands-on
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Implementing Structured Outputs with JSON and Pydantic
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            LLMs naturally output free-form conversational text. But in production agent systems, downstream database writes and tool calls demand <strong>guaranteed, type-safe data structures</strong>.
          </p>
        </div>
      </div>

      {/* Section 1: The Problem & JSON Schema */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Zap className="w-5 h-5 text-emerald-500" />
          1. The Problem: Text vs. Types
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-xs text-slate-700 dark:text-slate-300 space-y-1.5">
            <span className="text-red-600 dark:text-red-400 font-mono font-bold uppercase text-[10px]">
              ❌ Unstructured Output (Fragile)
            </span>
            <p className="text-slate-800 dark:text-slate-200 italic">
              &quot;Sure! The customer sentiment is negative and they had an issue with latency. Confidence is around 90%.&quot;
            </p>
            <p className="text-[11px] text-red-700 dark:text-red-300 pt-1">
              Downstream failure: Impossible to feed directly into SQL or trigger an automated refund API without error-prone regex.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-xs text-slate-700 dark:text-slate-300 space-y-1.5">
            <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold uppercase text-[10px]">
              ✅ Structured Output (Robust)
            </span>
            <pre className="p-2 rounded bg-slate-900 text-emerald-300 font-mono text-[11px]">{`{"sentiment": "negative", "confidence": 0.90, "issue_type": "latency"}`}</pre>
            <p className="text-[11px] text-emerald-700 dark:text-emerald-300 pt-1">
              Downstream success: Directly deserialized into typed Python objects with zero parsing ambiguity.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Pydantic & with_structured_output */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Code2 className="w-5 h-5 text-teal-500" />
          2. Pydantic Models & with_structured_output
        </h2>
        <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Pydantic validates fields, types, and constraints at runtime. Using <code className="text-emerald-600 dark:text-emerald-400 font-mono">with_structured_output</code>, LangChain forces the underlying model to return data that matches your Pydantic class:
        </p>

        <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs border border-slate-800 overflow-x-auto">
          <pre>{`from pydantic import BaseModel, Field
from langchain_openai import ChatOpenAI

class UserProfile(BaseModel):
    name: str = Field(description="The user's full name")
    age: int = Field(ge=0, le=120, description="Age in years")
    interests: list[str] = Field(description="List of user hobbies")

llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)
extractor = llm.with_structured_output(UserProfile)

# Result is directly an instance of UserProfile!
profile: UserProfile = extractor.invoke("Alex is a 29 year old who loves chess and hiking.")
print(profile.name)       # "Alex"
print(profile.interests)  # ["chess", "hiking"]`}</pre>
        </div>
      </section>

      {/* Interactive Sandbox */}
      <section className="space-y-4">
        <PydanticSchemaVisualizer />
      </section>

      {/* Quiz */}
      <section className="space-y-4">
        <Module2_2Quiz />
      </section>

      {/* Next Step Callout */}
      <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-xs font-mono text-slate-700 dark:text-slate-300 flex items-center justify-between">
        <span>Up Next: Module 2.3 — Integrating External Tools into an Agent</span>
        <ArrowRight className="w-4 h-4 text-emerald-500" />
      </div>
    </div>
  );
}
