"use client";

import React from "react";
import {
  ShieldAlert,
  ShieldCheck,
  Code2,
  Layers,
  Sparkles,
  Lock,
  FileCheck2,
  AlertTriangle,
} from "lucide-react";
import GuardrailsPipelineStudio from "./GuardrailsPipelineStudio";
import Module2_15Quiz from "./Module2_15Quiz";

export default function Module2_15Content() {
  return (
    <div className="space-y-10">
      {/* Hero Banner */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-slate-50 dark:to-slate-950 p-6 md:p-8 relative overflow-hidden transition-colors">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
              Module 2.15 • Core Implementation
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              ~20 min hands-on
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Implementing Input Validation & Guardrails
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Direct user input is inherently untrusted. Without safeguards, adversarial prompts can hijack system personas, leak private keys, or induce hallucinations. Production agent architectures enforce <strong>Defense-in-Depth</strong>—quarantining inputs across rule-based, structural, and semantic validation layers.
          </p>
        </div>
      </div>

      {/* Section 1: The 3-Tier Defense-in-Depth Pipeline */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-emerald-500" />
          1. The 3-Tier Defense Pipeline
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                Tier 1: Rules & Regex
              </span>
              <span className="text-[10px] font-mono text-slate-500">&lt;0.2ms • $0.00</span>
            </div>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white">
              Instant Circuit Breakers
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Regex scans for explicit overrides (<em>"ignore previous instructions"</em>, <em>"DAN mode"</em>, <em>"system prompt"</em>) and enforces token/character length ceilings.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold text-teal-600 dark:text-teal-400 uppercase">
                Tier 2: Delimiters
              </span>
              <span className="text-[10px] font-mono text-slate-500">Structural Isolation</span>
            </div>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white">
              XML Quarantine Enclosure
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Wraps untrusted strings in XML tags (<code>&lt;user_input&gt;...&lt;/user_input&gt;</code>). Instructs the model that contents inside tags are passive text to inspect, never commands.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold text-purple-600 dark:text-purple-400 uppercase">
                Tier 3: Semantic Judge
              </span>
              <span className="text-[10px] font-mono text-slate-500">Lightweight Model</span>
            </div>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white">
              LLM Intent Classification
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              A fast, low-cost classifier (e.g., GPT-4o-mini or Claude Haiku) inspects nuanced adversarial jailbreaks and flags sensitive PII exfiltration attempts.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: LangGraph Topology Integration */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Code2 className="w-5 h-5 text-teal-500" />
          2. Implementing Guardrails as LangGraph Nodes
        </h2>
        <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs border border-slate-800 overflow-x-auto">
          <pre>{`from typing import Literal
from langgraph.graph import StateGraph, START, END

def guardrail_node(state: AgentState):
    user_query = state["messages"][-1].content
    
    # 1. Tier 1: Fast regex check
    if any(k in user_query.lower() for k in ["ignore instructions", "dump prompt"]):
        return {"safety_status": "FLAGGED", "error_message": "Adversarial input detected."}
    
    # 2. Tier 2: XML delimiter isolation
    sanitized_input = f"<user_query>\\n{user_query}\\n</user_query>"
    return {"safety_status": "APPROVED", "sanitized_prompt": sanitized_input}

def guardrail_router(state: AgentState) -> Literal["agent_node", "safety_reject_node"]:
    if state.get("safety_status") == "APPROVED":
        return "agent_node"
    return "safety_reject_node"

# Compose Graph with upfront guardrail
builder = StateGraph(AgentState)
builder.add_node("guardrail", guardrail_node)
builder.add_node("agent", main_agent_node)
builder.add_node("safety_reject", safety_fallback_node)

builder.add_edge(START, "guardrail")
builder.add_conditional_edges("guardrail", guardrail_router)
builder.add_edge("agent", END)
builder.add_edge("safety_reject", END)`}</pre>
        </div>
      </section>

      {/* Interactive Studio */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-500" />
            3. Interactive Defense Pipeline Studio
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Live Threat Simulator
          </span>
        </div>
        <GuardrailsPipelineStudio />
      </section>

      {/* Section 4: Dual Guardrails (Input & Output) */}
      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 space-y-2">
        <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-semibold text-sm">
          <FileCheck2 className="w-4 h-4 text-emerald-500" />
          Pro-Tip: Don't Forget Output Guardrails
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Input guardrails prevent jailbreaks; <strong>output guardrails</strong> protect your users. Run output schemas through Pydantic validators to catch hallucinated keys, and scan generated responses with regex to prevent accidental leakage of API keys, SQL query tables, or internal system paths.
        </p>
      </div>

      {/* Quiz */}
      <section className="space-y-4">
        <Module2_15Quiz />
      </section>
    </div>
  );
}
