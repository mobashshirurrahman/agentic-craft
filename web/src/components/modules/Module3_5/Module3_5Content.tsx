"use client";

import React from "react";
import {
  BookOpen,
  CheckCircle2,
  Code2,
  Layers,
  Sparkles,
  Database,
  Search,
  Lightbulb,
} from "lucide-react";
import RAGPipelineWorkbench from "./RAGPipelineWorkbench";
import Module3_5Quiz from "./Module3_5Quiz";

export default function Module3_5Content() {
  return (
    <div className="space-y-10">
      {/* Hero Banner */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-slate-50 dark:to-slate-950 p-6 md:p-8 relative overflow-hidden transition-colors">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30">
              Module 3.5 • Advanced Patterns
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              ~20 min hands-on
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Building a Basic RAG System for Agents
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Think of RAG as giving your agent an <strong>open-book exam</strong>. Instead of forcing the model to memorize company manuals during training, the agent looks up the exact paragraphs in real time and uses them to write accurate, grounded answers.
          </p>
        </div>
      </div>

      {/* Section 1: The Two-Phase Lifecycle */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-amber-500" />
          1. The Two-Phase RAG Lifecycle
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 uppercase flex items-center gap-1.5">
              📦 Phase 1: Ingestion (Offline / Batch)
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Run once when files update: <strong>Load</strong> documents ➔ <strong>Chunk</strong> into bite-sized passages ➔ <strong>Embed</strong> into vectors ➔ <strong>Store</strong> in vector database (Chroma, Pinecone, pgvector).
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase flex items-center gap-1.5">
              ⚡ Phase 2: Inference (Runtime Query)
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Run on every user question: <strong>Embed Query</strong> ➔ <strong>Cosine Similarity Search</strong> ➔ <strong>Augment Prompt</strong> with top chunks ➔ <strong>Generate</strong> hallucination-free answer.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: RAG as LangGraph Nodes */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Code2 className="w-5 h-5 text-orange-500" />
          2. Implementing RAG as Graph Nodes
        </h2>
        <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs border border-slate-800 overflow-x-auto">
          <pre>{`from langgraph.graph import StateGraph, START, END

def retrieve_node(state: AgentState):
    user_query = state["question"]
    # 1. Similarity search against vector store
    matched_chunks = vector_db.similarity_search(user_query, k=2)
    return {"context_chunks": [doc.page_content for doc in matched_chunks]}

def generate_node(state: AgentState):
    # 2. Build augmented prompt with retrieved context
    prompt = f"Context:\\n{state['context_chunks']}\\n\\nQuestion: {state['question']}"
    response = llm.invoke(prompt)
    return {"answer": response.content}

# Clean Graph Flow
builder = StateGraph(AgentState)
builder.add_node("retrieve", retrieve_node)
builder.add_node("generate", generate_node)

builder.add_edge(START, "retrieve")
builder.add_edge("retrieve", "generate")
builder.add_edge("generate", END)`}</pre>
        </div>
      </section>

      {/* Interactive Studio */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            3. Interactive Two-Phase RAG Studio
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Live Vector Search
          </span>
        </div>
        <RAGPipelineWorkbench />
      </section>

      {/* Section 4: Golden Rule */}
      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 space-y-2">
        <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-semibold text-sm">
          <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
          The Goldilocks Chunking Rule
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Don't pick arbitrary chunk sizes. If chunks are too small (e.g. 50 tokens), sentences get severed and lose meaning. If chunks are too large (e.g. 2,000 tokens), the vector gets diluted by unrelated topics. Aim for <strong>200–500 tokens with 10–20% overlap</strong>.
        </p>
      </div>

      {/* Quiz */}
      <section className="space-y-4">
        <Module3_5Quiz />
      </section>
    </div>
  );
}
