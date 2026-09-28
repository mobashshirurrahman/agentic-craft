"use client";

import React from "react";
import {
  Brain,
  Search,
  Database,
  Code2,
  Layers,
  Sparkles,
  Lightbulb,
  CheckCircle2,
} from "lucide-react";
import SemanticMemoryStudio from "./SemanticMemoryStudio";
import Module3_11Quiz from "./Module3_11Quiz";

export default function Module3_11Content() {
  return (
    <div className="space-y-10">
      {/* Hero Banner */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-slate-50 dark:to-slate-950 p-6 md:p-8 relative overflow-hidden transition-colors">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/30">
              Module 3.11 • Advanced Patterns
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              ~20 min hands-on
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Implementing Semantic Memory with Vector Stores
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            A database checkpointer remembers <em>what was said</em>. A vector store lets your agent
            remember <em>what the user means</em> — across sessions, across months. Think of it as the
            difference between your browser history and your brain: one is chronological logs, the other
            is <strong>searchable understanding</strong>.
          </p>
        </div>
      </div>

      {/* Section 1: The Core Mental Model */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-purple-500" />
          1. Two Types of Agent Memory — Know the Difference
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-950/30 space-y-2">
            <span className="text-xs font-mono font-bold text-blue-700 dark:text-blue-400 uppercase">
              Episodic Memory (Checkpointer)
            </span>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              &ldquo;The CCTV Footage&rdquo;
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              PostgresSaver stores every single message in turn order — chronological, exact, retrievable by <code>thread_id</code>. It answers: <em>What was said in this conversation?</em>
            </p>
            <div className="text-[10px] font-mono text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/40 rounded px-2 py-1">
              ✓ Same session context &nbsp; ✗ Cross-session knowledge
            </div>
          </div>
          <div className="p-4 rounded-xl border border-purple-200 dark:border-purple-900/50 bg-purple-50 dark:bg-purple-950/30 space-y-2">
            <span className="text-xs font-mono font-bold text-purple-700 dark:text-purple-400 uppercase">
              Semantic Memory (Vector Store)
            </span>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              &ldquo;The Expert&rsquo;s Intuition&rdquo;
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Pinecone / pgvector stores compressed meaning as high-dimensional vectors. Retrieval is by <strong>semantic similarity</strong>, not keyword. It answers: <em>What does the user care about?</em>
            </p>
            <div className="text-[10px] font-mono text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/40 rounded px-2 py-1">
              ✓ Cross-session knowledge &nbsp; ✓ Scales to millions of facts
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: How Embeddings Work */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Brain className="w-5 h-5 text-pink-500" />
          2. How Embeddings Turn Words Into Numbers
        </h2>
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 space-y-3">
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            An embedding model (like <code>text-embedding-3-small</code>) reads a sentence and outputs a list of ~1,536 floating-point numbers — its &ldquo;meaning coordinates&rdquo; in a geometric space. Sentences with similar meaning end up at similar coordinates, even if they share zero words.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-xs">
            {[
              { phrase: '"I love Python scripting"', emb: "[0.91, 0.12, ...]", color: "purple" },
              { phrase: '"User automates with code"', emb: "[0.89, 0.15, ...]", color: "pink" },
              { phrase: '"Project budget is $40k"', emb: "[0.11, 0.88, ...]", color: "blue" },
            ].map((item) => (
              <div
                key={item.phrase}
                className={`p-3 rounded-xl border border-${item.color}-200 dark:border-${item.color}-900/50 bg-${item.color}-50 dark:bg-${item.color}-950/30 space-y-1`}
              >
                <p className="font-semibold text-slate-800 dark:text-slate-200 text-[11px]">
                  {item.phrase}
                </p>
                <p className="font-mono text-[10px] text-slate-500 dark:text-slate-400">
                  {item.emb}
                </p>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 italic">
            👆 The first two phrases are semantically close (cosine similarity ≈ 0.95). The third is far away. Query &ldquo;Python automation&rdquo; retrieves the first two — not the third.
          </p>
        </div>
      </section>

      {/* Section 3: Code Blueprint */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Code2 className="w-5 h-5 text-teal-500" />
          3. Production Pattern: Memory Node in LangGraph
        </h2>
        <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs border border-slate-800 overflow-x-auto">
          <pre>{`from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import PGVector
from langgraph.graph import StateGraph, MessagesState

embeddings = OpenAIEmbeddings(model="text-embedding-3-small")

# Production: pgvector inside your existing PostgreSQL database
vector_store = PGVector(
    embeddings=embeddings,
    collection_name="agent_memories",
    connection="postgresql://user:pass@localhost:5432/agent_db",
)

def memory_retrieval_node(state: MessagesState):
    """Fetches the 3 most semantically relevant memories before reasoning."""
    query = state["messages"][-1].content
    docs = vector_store.similarity_search(query, k=3)
    memory_context = "\\n".join(d.page_content for d in docs)
    # Inject into state so the LLM node can use it
    return {"memory_context": memory_context}

def memory_write_node(state: MessagesState):
    """After responding, persist any new user facts as a memory."""
    new_fact = state.get("new_fact_to_remember")
    if new_fact:
        vector_store.add_texts([new_fact])
    return {}

# Graph: retrieve → reason → write
builder = StateGraph(MessagesState)
builder.add_node("retrieve", memory_retrieval_node)
builder.add_node("agent", call_model)
builder.add_node("write_memory", memory_write_node)
builder.set_entry_point("retrieve")
builder.add_edge("retrieve", "agent")
builder.add_edge("agent", "write_memory")`}</pre>
        </div>
      </section>

      {/* Interactive Studio */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            4. Interactive Semantic Memory Studio
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Live Vector Search
          </span>
        </div>
        <SemanticMemoryStudio />
      </section>

      {/* Golden Rule */}
      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 space-y-2">
        <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-semibold text-sm">
          <Lightbulb className="w-4 h-4 text-purple-500 shrink-0" />
          Production Rule: Never Trust Retrieval Blindly
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Semantic retrieval is probabilistic, not deterministic. A memory with 0.75 similarity is a <em>suggestion</em>, not a fact. Always instruct the LLM node to treat retrieved memories as context clues and to ask the user if there is ambiguity — especially for high-stakes decisions like financial preferences or medical conditions.
        </p>
      </div>

      {/* Key Takeaways */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          Key Takeaways
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { title: "Embed → Store → Retrieve", body: "Text becomes a vector. Vectors are stored in pgvector or Pinecone. At query time, cosine similarity ranks the most relevant memories in milliseconds." },
            { title: "Use pgvector First", body: "If you're already on PostgreSQL, pgvector is zero extra infrastructure. Only graduate to Pinecone or Weaviate when you exceed ~10M vectors." },
            { title: "Two Memory Nodes", body: "Add a retrieval node before the agent (read) and a write node after it (persist). Keep them separate so each has a single, testable responsibility." },
          ].map((item) => (
            <div
              key={item.title}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5"
            >
              <h3 className="text-xs font-bold text-purple-700 dark:text-purple-400">{item.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-4">
        <Module3_11Quiz />
      </section>
    </div>
  );
}
