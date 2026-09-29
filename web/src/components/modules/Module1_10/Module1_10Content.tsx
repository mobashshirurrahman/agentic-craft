"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  Check,
  ArrowRight,
  Search,
  Database,
  Layers,
  Cpu,
  HelpCircle,
  AlertTriangle,
  Sparkles,
  Zap,
  Copy,
  CheckCheck,
  Play,
  RotateCcw,
  Terminal,
  FileText,
  ShieldCheck,
} from "lucide-react";
import RagNodeVsToolVisualizer from "./RagNodeVsToolVisualizer";
import RagIngestionInferenceStudio from "./RagIngestionInferenceStudio";
import Module1_10Quiz from "./Module1_10Quiz";

export default function Module1_10Content() {
  const [selectedPhase, setSelectedPhase] = useState<string>("chunking");
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [activeCodeTab, setActiveCodeTab] = useState<"code" | "output">("code");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);

  const ragPhases = [
    {
      id: "chunking",
      title: "1. Chunking",
      tagline: "Semantic Segmentation",
      desc: "Raw docs are segmented into 256-512 token chunks with 10-20% overlap so crucial conditions are never sliced in half.",
      icon: Layers,
      color: "text-sky-600 dark:text-sky-400",
      bg: "bg-sky-50 dark:bg-sky-500/10",
      border: "border-sky-200 dark:border-sky-500/30",
      badge: "Ingestion Phase",
      codeSnippet: `# 1. Semantic Chunking with Overlap
from langchain_text_splitters import RecursiveCharacterTextSplitter

splitter = RecursiveCharacterTextSplitter(
    chunk_size=400,
    chunk_overlap=60,
    separators=["\\n\\n", "\\n", ". ", " "]
)
chunks = splitter.split_text(raw_enterprise_policy)`,
    },
    {
      id: "embedding",
      title: "2. Vector Index",
      tagline: "Mathematical Embedding",
      desc: "Each text chunk is converted into high-dimensional vector embeddings and stored in Pinecone, pgvector, or Qdrant.",
      icon: Database,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-500/10",
      border: "border-purple-200 dark:border-purple-500/30",
      badge: "Storage Vault",
      codeSnippet: `# 2. Embedding & Vector Indexing
embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
vector_store = PineconeVectorStore.from_documents(
    documents=chunks,
    embedding=embeddings,
    index_name="corp-policies"
)`,
    },
    {
      id: "retrieval",
      title: "3. Top-K Search",
      tagline: "Cosine Similarity",
      desc: "At inference time, query vectors find the Top-K nearest chunk neighbors using cosine distance or hybrid BM25 search.",
      icon: Search,
      color: "text-teal-600 dark:text-teal-400",
      bg: "bg-teal-50 dark:bg-teal-500/10",
      border: "border-teal-200 dark:border-teal-500/30",
      badge: "Sub-50ms Query",
      codeSnippet: `# 3. Top-K Vector Retrieval with Score Filter
results = vector_store.similarity_search_with_score(
    query="enterprise SLA downtime compensation",
    k=3
)
# Filter noisy chunks below relevance threshold
relevant_docs = [doc for doc, score in results if score >= 0.82]`,
    },
    {
      id: "grounding",
      title: "4. Grounding",
      tagline: "Prompt Augmentation",
      desc: "Retrieved chunks are injected directly into the LLM prompt with strict system instructions to cite source IDs.",
      icon: ShieldCheck,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      border: "border-amber-200 dark:border-amber-500/30",
      badge: "Factual Anchor",
      codeSnippet: `# 4. Context Grounded Generation
prompt = f"""You are a corporate advisor. Answer strictly using the context below.
If the answer cannot be verified, state 'Information not found'.

CONTEXT:
{relevant_docs}

QUESTION:
{user_query}"""`,
    },
  ];

  const currentPhase =
    ragPhases.find((p) => p.id === selectedPhase) || ragPhases[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentPhase.codeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setActiveCodeTab("output");
    setSimStep(1);
    setTimeout(() => setSimStep(2), 900);
    setTimeout(() => setSimStep(3), 1800);
    setTimeout(() => {
      setSimStep(4);
      setIsSimulating(false);
    }, 2800);
  };

  return (
    <div className="space-y-10 max-w-5xl mx-auto pb-16">
      {/* 🎯 TOP OBJECTIVE BANNER */}
      <section className="rounded-2xl border border-teal-200 dark:border-teal-500/30 bg-teal-50/60 dark:bg-teal-500/5 p-4 sm:p-6 backdrop-blur-sm shadow-sm">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-teal-600 text-white shrink-0 shadow-sm mt-0.5">
            <Target className="w-5 h-5" />
          </div>
          <div className="space-y-2 flex-1">
            <h2 className="text-sm font-mono uppercase tracking-wider text-teal-800 dark:text-teal-400 font-bold">
              🎯 By the end of this module, you will:
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                <span>Understand the 2-phase RAG lifecycle: Offline Ingestion vs Online Inference</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                <span>Implement optimal chunking (256-512 tokens with overlap) to avoid boundary slicing</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                <span>Architect RAG as an autonomous agent tool vs a rigid deterministic workflow node</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                <span>Debunk the &quot;RAG eliminates hallucinations&quot; myth and apply context validation guards</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: THE RAG LIFECYCLE (2x2 Mobile / 4-Col Desktop Grid) */}
      <section className="space-y-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30 text-teal-700 dark:text-teal-300 text-xs font-mono font-semibold mb-2">
            <Search className="w-3.5 h-3.5" />
            <span>Architecture Patterns • Knowledge Grounding</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Retrieval-Augmented Generation (RAG)
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            RAG bridges the gap between frozen model weights and dynamic, private enterprise documents without costly fine-tuning.
          </p>
        </div>

        {/* 4 SYMMETRICAL CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {ragPhases.map((phase) => {
            const Icon = phase.icon;
            const isSelected = selectedPhase === phase.id;

            return (
              <button
                key={phase.id}
                onClick={() => setSelectedPhase(phase.id)}
                className={`p-3.5 sm:p-4 rounded-xl border text-left transition-all flex flex-col justify-between min-h-[145px] sm:min-h-[160px] active:scale-95 touch-manipulation cursor-pointer ${
                  isSelected
                    ? "border-teal-500 bg-white dark:bg-slate-900 shadow-md ring-2 ring-teal-500/20"
                    : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-2 rounded-lg ${phase.bg}`}>
                      <Icon className={`w-4 h-4 ${phase.color}`} />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {phase.badge}
                    </span>
                  </div>
                  <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                    {phase.title}
                  </h3>
                  <p className="text-[11px] font-medium text-teal-700 dark:text-teal-400 mt-0.5">
                    {phase.tagline}
                  </p>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                  {phase.desc}
                </p>
              </button>
            );
          })}
        </div>

        {/* LIVE STATE / CODE INSPECTOR */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 p-4 sm:p-5 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-teal-500 animate-pulse" />
              <span className="text-xs font-mono font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Phase Mechanics: {currentPhase.title}
              </span>
            </div>
            <span className="text-xs font-mono text-teal-700 dark:text-teal-400 font-semibold">
              {currentPhase.tagline}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {currentPhase.desc}
          </p>

          <div className="pt-2">
            <pre className="p-3 rounded-lg bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto border border-slate-800">
              <code>{currentPhase.codeSnippet}</code>
            </pre>
          </div>
        </div>

        {/* ✍️ REAL-WORLD ANALOGY (Closed-Book Cramming vs Open-Book Exam) */}
        <div className="rounded-xl border border-amber-300 dark:border-amber-500/30 bg-amber-50/70 dark:bg-amber-500/10 p-4 sm:p-5 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-base">💡</span>
            <h4 className="text-sm font-bold text-amber-950 dark:text-amber-200">
              Mental Model: Closed-Book Cramming vs. The Open-Book Exam
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-amber-900 dark:text-amber-300 leading-relaxed">
            • <strong>Closed-Book Exam (Standalone LLM):</strong> A student tries to memorize 10,000 pages of corporate bylaws. When asked about a specific 2026 refund formula, their memory blurs and they invent a convincing fake answer (<strong>Hallucination</strong>).
            <br />
            • <strong>Open-Book Exam with a Library (RAG):</strong> The student doesn&apos;t memorize every nuance. When asked the question, they walk to the catalog, pull the exact SLA handbook, and quote the exact sentence with page citations.
          </p>
          <div className="pt-1">
            <span className="font-['Caveat',cursive] text-base text-amber-950 dark:text-amber-200 block sm:-rotate-0.5">
              ✍️ Instructor Note: &quot;RAG transforms every query into an open-book exam, grounding the agent in verified corporate evidence!&quot;
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 2: RAG AS A NODE VS RAG AS A TOOL (In-Context Visualizer) */}
      <section className="space-y-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30 text-teal-700 dark:text-teal-300 text-xs font-mono font-semibold mb-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>Agentic Evolution • Node vs. Tool</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            RAG as a Workflow Node vs. Autonomous Agent Tool
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Compare fixed pipeline execution (where retrieval is mandatory on every step) against agentic tool calling (where the agent autonomously decides if, when, and what to query).
          </p>
        </div>

        <RagNodeVsToolVisualizer />
      </section>

      {/* SECTION 3: INGESTION & INFERENCE LABORATORY */}
      <section className="space-y-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30 text-teal-700 dark:text-teal-300 text-xs font-mono font-semibold mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>Interactive Laboratory • Ingestion & Noise</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            RAG Lifecycle & Noise Impact Studio
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Experiment with document chunk size in the Ingestion phase, and observe how noisy vector retrieval triggers hallucinations in the Inference phase.
          </p>
        </div>

        <RagIngestionInferenceStudio />
      </section>

      {/* SECTION 4: INTERACTIVE CODE EXECUTOR & RUNNER */}
      <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        {/* Terminal Header */}
        <div className="border-b border-slate-200 dark:border-slate-800 px-4 py-3 bg-slate-50 dark:bg-slate-800/60 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200">
              agentic_rag_tool.py
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex bg-slate-200 dark:bg-slate-700 p-0.5 rounded-lg text-[11px] font-mono">
              <button
                onClick={() => setActiveCodeTab("code")}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  activeCodeTab === "code"
                    ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold shadow-xs"
                    : "text-slate-600 dark:text-slate-400"
                }`}
              >
                Code
              </button>
              <button
                onClick={() => setActiveCodeTab("output")}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  activeCodeTab === "output"
                    ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold shadow-xs"
                    : "text-slate-600 dark:text-slate-400"
                }`}
              >
                Live Output
              </button>
            </div>

            <button
              onClick={handleCopyCode}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              title="Copy code"
            >
              {copiedCode ? (
                <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>

            <button
              onClick={handleRunSimulation}
              disabled={isSimulating}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-mono text-xs font-semibold shadow-xs disabled:opacity-50 transition-all cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isSimulating ? "Searching..." : "Execute Agent Search"}</span>
            </button>
          </div>
        </div>

        {/* Tab Body */}
        <div className="p-4 sm:p-5 bg-slate-950 font-mono text-xs text-slate-200 min-h-[220px]">
          {activeCodeTab === "code" ? (
            <pre className="overflow-x-auto leading-relaxed">
              <code>{`# Agentic RAG: Giving the Agent a Knowledge Search Tool
from langchain_core.tools import tool

@tool
def search_corporate_kb(query: str, domain: str = "all") -> str:
    """Search internal enterprise knowledge base for policies, SLAs, and technical manuals."""
    # 1. Embed incoming search query
    query_vector = embed_model.embed_query(query)
    
    # 2. Query Vector DB with metadata filtering
    results = vector_db.query(
        vector=query_vector,
        filter={"domain": domain} if domain != "all" else None,
        top_k=2
    )
    
    # 3. Format grounded passages with citation IDs
    return "\\n".join([f"[{r.id}] {r.metadata['title']}: {r.text}" for r in results])

# Agent can now autonomously decide IF and WHEN to call search_corporate_kb!
agent = initialize_agent(tools=[search_corporate_kb, calculate_refund])`}</code>
            </pre>
          ) : (
            <div className="space-y-2 text-slate-300">
              <div className="text-teal-400 font-bold">
                [USER] &quot;What is the credit for a 45-minute unplanned outage under our enterprise SLA?&quot;
              </div>
              {simStep >= 1 && (
                <div className="text-sky-300">
                  ➜ [AGENT THOUGHT] Need official SLA credit schedule. Invoking `search_corporate_kb`...
                </div>
              )}
              {simStep >= 2 && (
                <div className="text-slate-400 pl-4">
                  [TOOL EXECUTION] search_corporate_kb(query=&quot;enterprise SLA outage credit duration&quot;)
                  <br />
                  <span className="text-emerald-400">✔ Retrieved: [doc_sla_09] &quot;Outages &gt; 15 min qualify for 15% billing credit.&quot;</span>
                </div>
              )}
              {simStep >= 3 && (
                <div className="text-purple-300">
                  ➜ [AGENT THOUGHT] Outage of 45 min &gt; 15 min threshold. Applying 15% credit rate.
                </div>
              )}
              {simStep >= 4 && (
                <div className="text-emerald-400 font-bold pt-2 border-t border-slate-800">
                  ✔ [AGENT FINAL RESPONSE] Based on [doc_sla_09], because your 45-minute outage exceeds the 15-minute threshold, your account is eligible for a <strong>15% billing credit</strong> upon submitting a claim within 30 days.
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* SECTION 5: COMMON TRAPS & PITFALLS */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          <span>Architectural Traps in RAG Systems</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-500/30 bg-rose-50/50 dark:bg-rose-500/5 space-y-2">
            <span className="text-xs font-mono font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider block">
              TRAP #1: The Hallucination Immunity Myth
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              RAG does NOT eliminate hallucinations; it shifts the problem to <em>retrieval quality</em>. If your vector database returns irrelevant chunks, the model will hallucinate around the noise to please the prompt!
            </p>
          </div>

          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-500/5 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
              TRAP #2: Zero-Overlap Chunk Slicing
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Splitting text strictly by token count without sentence overlap risks slicing critical conditions in half (e.g. &quot;Except in cases of...&quot; moves to chunk 2, inverting the legal meaning in chunk 1). Always include 10-20% chunk overlap!
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6: KEY TAKEAWAYS */}
      <section className="rounded-xl border border-teal-200 dark:border-teal-500/30 bg-teal-50/50 dark:bg-teal-500/5 p-5 space-y-3">
        <h4 className="font-bold text-sm text-teal-900 dark:text-teal-300 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          <span>Key Architectural Takeaways</span>
        </h4>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          <li className="flex items-start gap-2">
            <span className="text-teal-600 dark:text-teal-400 font-bold">1.</span>
            <span><strong>Decouple Ingestion from Inference:</strong> Ingestion (chunking, embedding, indexing) happens offline; Inference (vector similarity, grounding) happens live.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal-600 dark:text-teal-400 font-bold">2.</span>
            <span><strong>Use RAG as a Tool for Dynamic Agents:</strong> Give the agent an explicit search tool so it can query multiple databases conditionally rather than forcing rigid pipeline retrievals.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal-600 dark:text-teal-400 font-bold">3.</span>
            <span><strong>Enforce Strict Relevance Filters:</strong> Discard retrieved chunks with low cosine similarity scores (&lt;0.80) to prevent the model from hallucinating plausible nonsense.</span>
          </li>
        </ul>
      </section>

      {/* SECTION 7: EXPANDABLE KNOWLEDGE CHECK QUIZ */}
      <section className="space-y-3">
        <button
          onClick={() => setShowQuiz(!showQuiz)}
          className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all text-left shadow-xs cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                Concept Check: Agentic RAG Systems
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {showQuiz ? "Click to collapse questions" : "Click to test your RAG architecture intuition (3 questions)"}
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-semibold px-3 py-1.5 rounded-lg bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-400 border border-teal-200 dark:border-teal-500/30">
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
              <Module1_10Quiz />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* SECTION 8: NEXT MODULE BRIDGE */}
      <section className="rounded-2xl border border-teal-200 dark:border-teal-500/30 bg-gradient-to-r from-teal-50 via-white to-slate-50 dark:from-teal-500/10 dark:via-slate-900 dark:to-slate-950 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider">
            <span>Up Next • Module 1.11</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Evaluating AI Agent Frameworks
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
            Compare LangGraph, CrewAI, AutoGen, LlamaIndex, and the OpenAI Agents SDK to choose the exact right framework for your production architecture.
          </p>
        </div>

        <Link
          href="/learn/level-1/module-1-11"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow-teal-500/20 transition-all shrink-0 cursor-pointer"
        >
          <span>Continue to Module 1.11</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
