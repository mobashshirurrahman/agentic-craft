"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  Check,
  ArrowRight,
  Brain,
  Search,
  Database,
  Layers,
  Sparkles,
  HelpCircle,
  Copy,
  CheckCheck,
  Play,
  RotateCcw,
  FileText,
  AlertTriangle,
  Code2,
  Workflow,
  Cpu,
  User,
} from "lucide-react";
import SemanticMemoryStudio from "./SemanticMemoryStudio";
import Module3_11Quiz from "./Module3_11Quiz";

export default function Module3_11Content() {
  const [selectedPillar, setSelectedPillar] = useState<string>("concept");
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [activeCodeTab, setActiveCodeTab] = useState<"code" | "output">("code");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);

  const pillars = [
    {
      id: "concept",
      title: "1. Short-Term vs Long-Term",
      tagline: "Thread Memory vs Semantic Recall",
      desc: "Checkpointers store chronological messages inside one session (short-term). Vector stores extract meaningful user preferences and facts to persist them forever across multiple sessions (long-term).",
      icon: Brain,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-500/10",
      border: "border-blue-200 dark:border-blue-500/30",
      badge: "Dual-Memory",
      codeSnippet: `# 1. DUAL MEMORY ARCHITECTURE IN LANGGRAPH
# Short-Term Memory: Checkpointer (Session-bound, raw messages)
# Long-Term Memory: Vector Store (Cross-session, distilled facts)

from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import Chroma

# Long-term semantic memory store
embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
long_term_memory = Chroma(
    collection_name="user_semantic_memories",
    embedding_function=embeddings
)`,
    },
    {
      id: "extraction",
      title: "2. Memory Extraction",
      tagline: "Distilling Facts from Conversation",
      desc: "An asynchronous background worker analyzes completed conversations, extracting enduring facts (e.g. 'User prefers TypeScript and dark mode') and embedding them with user_id metadata.",
      icon: FileText,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-500/10",
      border: "border-purple-200 dark:border-purple-500/30",
      badge: "Fact Extraction",
      codeSnippet: `# 2. EXTRACTING LONG-TERM MEMORY FACTS
from pydantic import BaseModel, Field

class MemoryItem(BaseModel):
    category: str = Field(description="preference | personal_fact | workflow")
    fact: str = Field(description="Concise permanent fact about the user.")

extractor = ChatOpenAI(model="gpt-4o-mini").with_structured_output(MemoryItem)

def extract_and_store_memory(user_id: str, conversation_text: str):
    """Extracts persistent facts and saves to vector store."""
    extracted = extractor.invoke(f"Extract permanent user facts: {conversation_text}")
    
    if extracted and extracted.fact:
        long_term_memory.add_texts(
            texts=[extracted.fact],
            metadatas=[{"user_id": user_id, "category": extracted.category}]
        )`,
    },
    {
      id: "retrieval",
      title: "3. User-Scoped Vector Query",
      tagline: "Strict Metadata Partitioning",
      desc: "When a user asks a new question, the agent retrieves semantic memories filtered strictly by user_id to prevent any privacy leaks between different organizational accounts.",
      icon: Search,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      border: "border-emerald-200 dark:border-emerald-500/30",
      badge: "Scoped Vector Search",
      codeSnippet: `# 3. USER-SCOPED SEMANTIC RETRIEVAL
def retrieve_user_memories(user_id: str, current_query: str, k: int = 3) -> list[str]:
    """Retrieves top-k relevant long-term memories for this specific user."""
    results = long_term_memory.similarity_search(
        query=current_query,
        k=k,
        filter={"user_id": user_id} # Critical multi-tenant security barrier!
    )
    return [doc.page_content for doc in results]`,
    },
    {
      id: "injection",
      title: "4. Dynamic System Injection",
      tagline: "Personalized Agent Reasoning",
      desc: "In LangGraph, a pre-model hook queries semantic memory and formats the top matches into a personalized system prompt snippet, creating an effortlessly continuous user experience.",
      icon: Workflow,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      border: "border-amber-200 dark:border-amber-500/30",
      badge: "Prompt Personalization",
      codeSnippet: `# 4. INJECTING SEMANTIC MEMORIES INTO AGENT STATE
def prepare_context_node(state: AgentState) -> dict:
    user_id = state["user_id"]
    latest_query = state["messages"][-1].content
    
    # Retrieve relevant long-term memories
    memories = retrieve_user_memories(user_id, latest_query)
    
    memory_context = "\\n- ".join(memories) if memories else "No prior history."
    system_instruction = f"""
    You are an intelligent coding partner.
    What you remember about this user across past sessions:
    - {memory_context}
    
    Tailor your code and explanations to match these preferences.
    """
    return {"system_prompt": system_instruction}`,
    },
  ];

  const currentSnippet = pillars.find((p) => p.id === selectedPillar)?.codeSnippet || "";

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const runSimulation = () => {
    setIsSimulating(true);
    setSimStep(1);
    setTimeout(() => setSimStep(2), 700);
    setTimeout(() => setSimStep(3), 1400);
    setTimeout(() => {
      setSimStep(4);
      setIsSimulating(false);
    }, 2100);
  };

  return (
    <div className="space-y-10">
      {/* HERO BANNER */}
      <div className="rounded-2xl border border-blue-200 dark:border-blue-500/30 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-slate-50 dark:to-slate-950 p-6 md:p-8 relative overflow-hidden transition-colors">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-500/30">
              Module 3.11 • Long-Term Cognitive Memory
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              ~20 min interactive
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Implementing Semantic Memory with Vector Stores
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Short-term memory tracks the current session; <strong>Semantic Memory</strong> preserves user context across months. Learn how to extract episodic facts, store them in vector databases, and inject personalized preferences dynamically into agent prompts.
          </p>
        </div>
      </div>

      {/* SECTION 1: 4 PILLARS OF SEMANTIC MEMORY */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-500" />
            1. Core Mechanics of Semantic Memory
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Select a memory mechanism to inspect
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            const isSelected = selectedPillar === pillar.id;
            return (
              <button
                key={pillar.id}
                onClick={() => setSelectedPillar(pillar.id)}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? `${pillar.border} ${pillar.bg} shadow-md ring-1 ring-blue-500/50`
                    : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className={`p-2 rounded-lg ${pillar.bg} ${pillar.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 font-semibold">
                      {pillar.badge}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    {pillar.title}
                  </h3>
                  <div className="text-[11px] font-medium text-blue-600 dark:text-blue-400">
                    {pillar.tagline}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* SECTION 2: CODE & EXECUTION INSPECTOR */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-blue-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white font-mono uppercase tracking-wider">
              Semantic Memory Inspector
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={runSimulation}
              disabled={isSimulating}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-xs disabled:opacity-50 transition-all cursor-pointer"
            >
              {isSimulating ? (
                <>
                  <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                  <span>Querying Embeddings...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Simulate Memory Recall</span>
                </>
              )}
            </button>
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 text-slate-600 dark:text-slate-400 text-xs font-mono transition-all cursor-pointer"
            >
              {copiedCode ? <CheckCheck className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? "Copied" : "Copy"}</span>
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden text-xs font-mono shadow-md">
          <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800/80 bg-slate-900/60">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
              <span className="text-slate-400 text-[11px] ml-2 font-mono">
                semantic_memory.py • {selectedPillar}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveCodeTab("code")}
                className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition-all ${
                  activeCodeTab === "code"
                    ? "bg-blue-600/30 text-blue-300 border border-blue-500/40"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Code
              </button>
              <button
                onClick={() => setActiveCodeTab("output")}
                className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition-all ${
                  activeCodeTab === "output"
                    ? "bg-blue-600/30 text-blue-300 border border-blue-500/40"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Recall Trace
              </button>
            </div>
          </div>

          <div className="p-4 overflow-x-auto text-slate-300 leading-relaxed font-mono">
            {activeCodeTab === "code" ? (
              <pre>
                <code>{currentSnippet}</code>
              </pre>
            ) : (
              <div className="space-y-2 text-blue-300 font-mono text-[11px]">
                <p className="text-slate-400">$ python run_agent.py --user "dev_sarah" --query "Write me a function to parse CSV"</p>
                <p className="text-purple-300">[Semantic Memory Search] Querying Chroma with user_id='dev_sarah' filter</p>
                <p className="text-emerald-300">&gt;&gt; Found 2 matching memories (similarity: 0.91, 0.86):</p>
                <p className="text-slate-300">   1. "Sarah writes backend code in Python and prefers Polars over Pandas"</p>
                <p className="text-slate-300">   2. "Sarah always requires full typing and type annotations"</p>
                <p className="text-amber-300">[Prompt Injection] Injected memories into System Context</p>
                <p className="text-emerald-400 font-bold">&gt;&gt; Agent generates CSV function using Polars with complete Python type hints!</p>
              </div>
            )}
          </div>
        </div>

        {/* Simulation Banner */}
        {simStep > 0 && (
          <div className="p-3.5 rounded-xl border border-blue-200 dark:border-blue-500/30 bg-blue-50/80 dark:bg-blue-950/30 flex items-center justify-between text-xs font-mono">
            <span className="text-blue-800 dark:text-blue-200">
              {simStep === 1 && "User submits prompt -> Vector store searched with user_id metadata filter"}
              {simStep === 2 && "Semantic search identifies cross-session user preferences"}
              {simStep === 3 && "Facts injected into system prompt before LLM reasoning"}
              {simStep === 4 && "Agent responds with personalized syntax without user having to repeat themselves!"}
            </span>
            <span className="text-blue-600 dark:text-blue-400 font-bold">
              Step {simStep}/4
            </span>
          </div>
        )}
      </section>

      {/* SECTION 3: INTERACTIVE STUDIO */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-500" />
            2. Interactive Semantic Memory Studio
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Vector Preference Sandbox
          </span>
        </div>
        <SemanticMemoryStudio />
      </section>

      {/* SECTION 4: HANDWRITTEN NOTE */}
      <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-500/30 bg-blue-50/90 dark:bg-blue-500/10 shadow-sm">
        <span className="font-['Caveat',cursive] text-base text-blue-950 dark:text-blue-200 block">
          📌 Browser History vs Human Brain: Checkpointers are like your browser history — 500 lines of exact logs. Semantic vector memory is like your brain — you don&apos;t remember the exact sentence a colleague said 3 months ago, but you remember they prefer dark mode and TypeScript!
        </span>
      </div>

      {/* SECTION 5: TRAPS & PITFALLS */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          Common Engineering Traps
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-500/30 bg-rose-50/50 dark:bg-rose-500/5 space-y-2">
            <span className="text-xs font-mono font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider block">
              TRAP #1: Unfiltered Cross-Tenant Vector Bleed
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Querying a vector database without a strict metadata filter (<code>filter={'{ "user_id": uid }'}</code>) allows User A to retrieve private memories and API keys stored by User B if semantic similarity is high. Always enforce user-scoped metadata partitioning.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-500/5 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
              TRAP #2: Storing Ephemeral Noise as Permanent Facts
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Embedding raw chat messages like &quot;I will be back in 5 minutes&quot; clutters vector indices with useless junk. Always use an extraction model to filter for enduring facts (preferences, roles, long-term project parameters).
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6: KEY TAKEAWAYS */}
      <section className="rounded-xl border border-blue-200 dark:border-blue-500/30 bg-blue-50/50 dark:bg-blue-500/5 p-5 space-y-3">
        <h4 className="font-bold text-sm text-blue-900 dark:text-blue-300 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          Key Architectural Takeaways
        </h4>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          {[
            ["1.", "Dual Memory Stratum:", "Checkpointers provide session auditability, while vector stores provide cross-session personalization."],
            ["2.", "Fact Distillation:", "Extract only high-signal permanent preferences, ignoring transient chit-chat."],
            ["3.", "Multi-Tenant Privacy:", "Mandatory metadata filtering guarantees user memory boundaries are completely airtight."],
          ].map(([n, bold, rest]) => (
            <li key={n} className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400 font-bold">{n}</span>
              <span><strong>{bold}</strong> {rest}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* SECTION 7: QUIZ */}
      <section className="space-y-3">
        <button
          onClick={() => setShowQuiz(!showQuiz)}
          className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all text-left cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                Concept Check: Semantic Memory
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {showQuiz ? "Click to collapse" : "Test your understanding of vector stores and cross-session memory (3 questions)"}
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-semibold px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30">
            {showQuiz ? "Hide Quiz" : "Start Quiz"}
          </span>
        </button>
        <AnimatePresence>
          {showQuiz && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Module3_11Quiz />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* SECTION 8: NEXT MODULE BRIDGE */}
      <section className="rounded-2xl border border-blue-200 dark:border-blue-500/30 bg-gradient-to-r from-blue-50 via-white to-slate-50 dark:from-blue-500/10 dark:via-slate-900 dark:to-slate-950 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">
            <span>Up Next • Module 3.12</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Deploying Agents with FastAPI</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
            Take your LangGraph agents to production. Learn how to wrap agents in async FastAPI endpoints with Server-Sent Events (SSE) streaming and background task queues.
          </p>
        </div>
        <Link
          href="/learn/level-3/module-3-12"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow-blue-500/20 transition-all shrink-0 cursor-pointer"
        >
          <span>Continue to Module 3.12</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
