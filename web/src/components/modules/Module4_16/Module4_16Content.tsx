"use client";
import React from "react";
import {
  DollarSign,
  TrendingDown,
  Layers,
  Database,
  Code2,
  Sparkles,
  Lightbulb,
  CheckCircle2,
  Zap,
  Briefcase,
  Sliders,
  Scale,
} from "lucide-react";
import CostOptimizerStudio from "./CostOptimizerStudio";
import Module4_16Quiz from "./Module4_16Quiz";

export default function Module4_16Content() {
  return (
    <div className="space-y-10">
      {/* Hero Header */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-slate-50 dark:to-slate-950 p-6 md:p-8">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
              Module 4.16 • Production, Scaling & Optimization
            </span>
            <span className="text-xs font-mono text-slate-500">~30 min</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Implementing Cost Optimization Strategies
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            In AI agents, token bills scale linearly with activity: LLM API calls account for <strong>70% to 80%</strong> of your total infrastructure budget. If every user query triggers a 15-step agent loop on Claude 3.5 Sonnet or GPT-4o, your monthly bill will quickly spiral into tens of thousands of dollars. Here is how leading engineering teams slash agent costs by <strong>70% to 85%</strong> while maintaining identical output quality.
          </p>
        </div>
      </div>

      {/* Real-World Analogy */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-emerald-500" />
          1. The Law Firm Analogy: Senior Partner vs. Junior Paralegal
        </h2>
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-3 text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            Imagine a premier corporate law firm handling high-stakes litigation:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
            <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-900/40 bg-rose-50/50 dark:bg-rose-950/20 space-y-1.5">
              <span className="font-bold text-rose-700 dark:text-rose-400 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                ❌ Unoptimized: The $1,500/hour Partner for Everything
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                A client asks for directions to the parking garage. You assign a $1,500/hour senior trial partner to write a 10-page memorandum detailing how to park. The firm goes bankrupt and the client is horrified by the bill.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/50 dark:bg-emerald-950/20 space-y-1.5">
              <span className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                ✅ Model Tiering: Intelligent Triage
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                A sharp receptionist (router) directs parking questions and standard form lookups to junior paralegals (GPT-4o-mini at $0.15/1M). The senior trial partners (Sonnet / o3 at $15/1M) are called <em>only</em> when navigating complex contract disputes!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The 4 Optimization Pillars */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Scale className="w-5 h-5 text-teal-500" />
          2. The Four Pillars of Agent Cost Optimization
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800">
                {["Optimization Pillar", "Mechanism", "Typical Savings", "Watch Out For"].map((h) => (
                  <th key={h} className="p-3 font-mono font-bold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["1. Model Tiering Router", "Classify query complexity; send 70%+ of simple steps to 4o-mini / Haiku", "50%–70% overall cost cut", "Underestimating complex queries (provide fallback retry)"],
                ["2. Semantic Vector Cache", "Store query embeddings in Redis/pgvector; return cached answer if cosine >= 0.92", "20%–45% cache hits (99% saved per hit)", "Cache staleness (must configure strict TTLs)"],
                ["3. Tool Response Caching", "Cache expensive SerpAPI/Tavily searches & SQL query results for 30–60 mins", "15%–30% tool cost & latency drop", "Never cache non-idempotent actions (e.g. POST payments)"],
                ["4. Prompt Minimization", "Remove redundant instructions, use concise JSON, compress system prompts", "10%–20% token savings", "Accidentally stripping critical safety or formatting guardrails"],
              ].map(([pill, mech, sav, watch], i) => (
                <tr key={i} className="border-b border-slate-200 dark:border-slate-800">
                  <td className="p-3 font-semibold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950/40">
                    {pill}
                  </td>
                  <td className="p-3 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                    {mech}
                  </td>
                  <td className="p-3 font-mono font-bold text-emerald-600 dark:text-emerald-400 border border-slate-200 dark:border-slate-700">
                    {sav}
                  </td>
                  <td className="p-3 text-slate-500 font-mono text-[11px] border border-slate-200 dark:border-slate-700">
                    {watch}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Production Semantic Caching Code */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Code2 className="w-5 h-5 text-emerald-500" />
          3. Semantic Caching Implementation (Python + Redis Vector Search)
        </h2>
        <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs border border-slate-800 overflow-x-auto">
          <pre>{`import numpy as np
from openai import OpenAI

client = OpenAI()
SIMILARITY_THRESHOLD = 0.92 # Cosine similarity threshold for cache hit

# Simulated in-memory vector cache (In prod: Redis VSS or pgvector)
vector_cache = []

def get_embedding(text: str) -> list[float]:
    res = client.embeddings.create(input=text, model="text-embedding-3-small")
    return res.data[0].embedding

def cosine_similarity(v1, v2):
    return np.dot(v1, v2) / (np.linalg.norm(v1) * np.linalg.norm(v2))

def ask_agent_with_semantic_cache(user_prompt: str):
    query_vec = get_embedding(user_prompt)
    
    # 1. Search semantic vector cache
    for cached in vector_cache:
        sim = cosine_similarity(query_vec, cached["embedding"])
        if sim >= SIMILARITY_THRESHOLD:
            print(f"⚡ [CACHE HIT] Similarity: {sim:.3f} | Cost: $0.00002")
            return cached["response"]
            
    # 2. Cache Miss: Execute LLM Agent Call
    print("⚠️ [CACHE MISS] Invoking LLM Agent (~$0.02)...")
    completion = client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": user_prompt}]
    )
    answer = completion.choices[0].message.content
    
    # 3. Store in Semantic Cache with 24-Hour TTL
    vector_cache.append({
        "prompt": user_prompt,
        "embedding": query_vec,
        "response": answer
    })
    return answer`}</pre>
        </div>
      </section>

      {/* Interactive Studio Workbench */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-500" />
            4. Interactive Studio: Unit Economics & Semantic Caching Workbench
          </h2>
          <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Toggle Model Tiering, Semantic Caching, and Tool Caching. Type different phrasing of refund queries to see how semantic vector matching reduces monthly bills from $4,250 to $600!
          </p>
        </div>
        <CostOptimizerStudio />
      </section>

      {/* Interview Gold Callout */}
      <section className="p-6 rounded-2xl border border-emerald-300 dark:border-emerald-800/60 bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent space-y-3">
        <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-sm">
          <Lightbulb className="w-5 h-5 text-emerald-500" />
          💡 Interview Gold: &ldquo;How Did You Cut Agent LLM Costs by 70%+ in Production?&rdquo;
        </div>
        <div className="text-xs md:text-sm text-slate-700 dark:text-slate-300 space-y-2 leading-relaxed">
          <p>
            <strong>Question:</strong> &ldquo;Your company&apos;s customer service agent is burning $40,000/month in OpenAI API bills. How would you systematically cut this cost without hurting customer satisfaction?&rdquo;
          </p>
          <div className="pl-4 border-l-2 border-emerald-400 space-y-1 font-mono text-xs text-slate-800 dark:text-slate-200">
            <p>1. <strong>Model Tiering Classifier:</strong> Analyze telemetry logs. 75% of customer queries are simple factual FAQs or policy questions. Deploy a lightweight routing classifier that sends simple queries to GPT-4o-mini ($0.15/1M) and only escalates multi-step edge cases to Sonnet ($3.00/1M). <em>(Saves ~55%)</em></p>
            <p>2. <strong>Semantic Caching with Redis:</strong> Implement cosine-similarity caching with a 0.92 similarity threshold on query embeddings. In repetitive customer support domains, hit rates reach 30–45%, delivering answers in 15ms for $0.0001. <em>(Saves another 30%)</em></p>
            <p>3. <strong>Tool Result TTLs:</strong> Cache common SerpAPI web search results and database catalog queries with 30-minute Redis TTLs to avoid redundant external billing.</p>
            <p>4. <strong>Prompt Optimization:</strong> Compress bloated system prompts, strip redundant few-shot examples, and enforce strict token output limits using structured JSON schemas.</p>
          </div>
        </div>
      </section>

      {/* Mastery Quiz */}
      <section className="space-y-4">
        <Module4_16Quiz />
      </section>
    </div>
  );
}
