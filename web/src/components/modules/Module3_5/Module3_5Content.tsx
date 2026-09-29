"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  Check,
  ArrowRight,
  BookOpen,
  Database,
  Search,
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
  FileSearch,
  CheckCircle2,
} from "lucide-react";
import RAGPipelineWorkbench from "./RAGPipelineWorkbench";
import Module3_5Quiz from "./Module3_5Quiz";

export default function Module3_5Content() {
  const [selectedPillar, setSelectedPillar] = useState<string>("ingestion");
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [activeCodeTab, setActiveCodeTab] = useState<"code" | "output">("code");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);

  const pillars = [
    {
      id: "ingestion",
      title: "1. Ingestion & Chunking",
      tagline: "Splitting with Overlap",
      desc: "Raw PDFs and docs cannot fit directly in vector indices. Text splitters divide documents into 500-1000 character chunks with 100-character overlap to preserve semantic context across chunk boundaries.",
      icon: FileText,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-500/10",
      border: "border-blue-200 dark:border-blue-500/30",
      badge: "Chunking & Overlap",
      codeSnippet: `# 1. INGESTION & SEMANTIC CHUNKING
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter

# Load documents
loader = PyPDFLoader("company_policies.pdf")
raw_docs = loader.load()

# Split into semantically sound chunks with overlap
splitter = RecursiveCharacterTextSplitter(
    chunk_size=800,       # ~200 tokens per chunk
    chunk_overlap=120,     # Preserves context across chunk seams
    separators=["\\n\\n", "\\n", " ", ""]
)
chunks = splitter.split_documents(raw_docs)
print(f"Divided {len(raw_docs)} pages into {len(chunks)} searchable chunks.")`,
    },
    {
      id: "vectorstore",
      title: "2. Vector Embeddings & Index",
      tagline: "High-Dimensional Semantic Index",
      desc: "Embedding models map each chunk into a 1536-dimensional float vector. Chroma, Pinecone, or pgvector indexes these vectors to enable sub-10ms nearest-neighbor semantic search.",
      icon: Database,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-500/10",
      border: "border-purple-200 dark:border-purple-500/30",
      badge: "Vector Store",
      codeSnippet: `# 2. EMBEDDINGS & VECTOR STORE (Chroma / In-Memory)
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import Chroma

embedding_model = OpenAIEmbeddings(model="text-embedding-3-small")

# Index chunks into local vector database
vectorstore = Chroma.from_documents(
    documents=chunks,
    embedding=embedding_model,
    collection_name="enterprise_kb"
)

# Convert into a similarity retriever (top 3 matches)
retriever = vectorstore.as_retriever(search_kwargs={"k": 3})`,
    },
    {
      id: "tool_wrapping",
      title: "3. Agentic RAG Tool",
      tagline: "On-Demand Retrieval via Tools",
      desc: "Unlike static RAG where retrieval runs unconditionally on every query, Agentic RAG exposes the retriever as a tool. The agent queries the knowledge base only when it needs domain-specific facts.",
      icon: Search,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      border: "border-emerald-200 dark:border-emerald-500/30",
      badge: "@tool function",
      codeSnippet: `# 3. EXPOSING RETRIEVAL AS AN AGENT TOOL
from langchain_core.tools import tool

@tool
def query_knowledge_base(query: str) -> str:
    """Searches corporate documentation for answers to policies, SLAs, and technical manuals."""
    docs = retriever.invoke(query)
    
    if not docs:
        return "No relevant internal documentation found."
        
    formatted_results = []
    for i, doc in enumerate(docs, 1):
        source = doc.metadata.get("source", "unknown")
        formatted_results.append(f"[Source {i}: {source}]\\n{doc.page_content}")
        
    return "\\n\\n---\\n\\n".join(formatted_results)`,
    },
    {
      id: "grounding",
      title: "4. Grounded Synthesis",
      tagline: "Hallucination Defense",
      desc: "The agent synthesizes the retrieved chunks into a factual answer, citing sources explicitly. If the retrieved context does not contain the answer, the agent gracefully states that information is unavailable.",
      icon: Layers,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      border: "border-amber-200 dark:border-amber-500/30",
      badge: "Grounded Synthesis",
      codeSnippet: `# 4. BINDING RAG TOOL TO LANGGRAPH AGENT
from langgraph.prebuilt import create_react_agent
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)

SYSTEM_RAG_PROMPT = """
You are a factual enterprise assistant.
When answering company questions, you MUST query the knowledge base first.
Base your answers ONLY on the retrieved excerpts.
Always cite your source documents [Source X].
If the retrieved documents do not contain the answer, say 'I cannot find this in our documentation.'
"""

rag_agent = create_react_agent(
    model=llm,
    tools=[query_knowledge_base],
    state_modifier=SYSTEM_RAG_PROMPT
)`,
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
      <div className="rounded-2xl border border-blue-200 dark:border-blue-500/30 bg-gradient-to-br from-blue-500/10 via-sky-500/5 to-slate-50 dark:to-slate-950 p-6 md:p-8 relative overflow-hidden transition-colors">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-500/30">
              Module 3.5 • Retrieval-Augmented Generation
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              ~20 min interactive
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Building a Basic RAG System for Agents
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Give your agents factual grounding. In this lesson, we build an <strong>Agentic RAG pipeline</strong>: transforming proprietary documents into vector embeddings and wrapping retrieval as a model-controlled tool with citation synthesis.
          </p>
        </div>
      </div>

      {/* SECTION 1: 4 PILLARS OF AGENTIC RAG */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-500" />
            1. Core Architecture of Agentic RAG
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Select a stage to inspect
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
              RAG Pipeline Inspector
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
                  <span>Retrieving Chunks...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Simulate RAG Retrieval</span>
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
                agentic_rag.py • {selectedPillar}
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
                RAG Trace Output
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
                <p className="text-slate-400">$ python run_rag_agent.py --query "What is our company maternity leave policy?"</p>
                <p className="text-amber-300">[Turn 1] Agent invokes tool: `query_knowledge_base("maternity leave policy")`</p>
                <p className="text-slate-300">&gt;&gt; Vector Search: Query embedded → 3 nearest chunks retrieved (similarity: 0.89, 0.84, 0.79)</p>
                <p className="text-emerald-300">&gt;&gt; Observation: [Source 1: hr_handbook.pdf] Employees are entitled to 16 weeks fully paid parental leave...</p>
                <p className="text-sky-300">[Turn 2] Model synthesizes grounded response with source citation</p>
                <p className="text-emerald-400 font-bold">&gt;&gt; Final Answer: According to our HR Handbook [Source 1], employees receive 16 weeks of fully paid leave.</p>
              </div>
            )}
          </div>
        </div>

        {/* Simulation Banner */}
        {simStep > 0 && (
          <div className="p-3.5 rounded-xl border border-blue-200 dark:border-blue-500/30 bg-blue-50/80 dark:bg-blue-950/30 flex items-center justify-between text-xs font-mono">
            <span className="text-blue-800 dark:text-blue-200">
              {simStep === 1 && "User submits domain question -> Agent decides it needs factual grounding"}
              {simStep === 2 && "Agent invokes query_knowledge_base() -> Dense vector search retrieves top 3 chunks"}
              {simStep === 3 && "Retrieved chunks injected into Agent State as Tool Observation"}
              {simStep === 4 && "Agent writes grounded answer citing [Source 1] with zero hallucination!"}
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
            2. Interactive RAG Pipeline Workbench
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Chunking & Retrieval Inspector
          </span>
        </div>
        <RAGPipelineWorkbench />
      </section>

      {/* SECTION 4: HANDWRITTEN NOTE */}
      <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-500/30 bg-blue-50/90 dark:bg-blue-500/10 shadow-sm">
        <span className="font-['Caveat',cursive] text-base text-blue-950 dark:text-blue-200 block">
          📌 Agentic RAG vs Standard RAG: In traditional RAG, you retrieve on every single message whether needed or not. In Agentic RAG, the LLM decides WHEN to query the knowledge base and what query to search for. If the first search query returns poor results, an agent can rephrase and try again!
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
              TRAP #1: Zero Chunk Overlap
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Splitting text strictly on character boundaries without overlap chops critical sentences in half. If an important clause starts at character 790 and finishes at 820, neither chunk contains the full meaning, causing similarity scores to plummet. Always set <code>chunk_overlap</code> to 10-15% of chunk size.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-500/5 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
              TRAP #2: The 'Lost in the Middle' Syndrome
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Retrieving 15 chunks (k=15) overwhelms the model with noisy context. Research shows LLMs pay attention to the beginning and end of retrieved passages, frequently ignoring chunks buried in the middle. Retrieve fewer, higher-quality chunks (k=3-5) and use a re-ranker.
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
            ["1.", "Two-Phase Lifecycle:", "RAG consists of offline Ingestion (load, chunk, embed, index) and online Retrieval (query, vector search, tool execution, grounded answer)."],
            ["2.", "Tool-Based Autonomy:", "Treating the vector retriever as a tool gives agents full autonomy to decide whether domain knowledge is required for a specific turn."],
            ["3.", "Explicit Citation Grounding:", "System prompts should strictly instruct the model to ground answers in provided documents and refuse speculation."],
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
                Concept Check: Agentic RAG
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {showQuiz ? "Click to collapse" : "Test your understanding of chunking and retrieval (3 questions)"}
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
              <Module3_5Quiz />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* SECTION 8: NEXT MODULE BRIDGE */}
      <section className="rounded-2xl border border-blue-200 dark:border-blue-500/30 bg-gradient-to-r from-blue-50 via-white to-slate-50 dark:from-blue-500/10 dark:via-slate-900 dark:to-slate-950 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">
            <span>Up Next • Module 3.6</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Constructing Plan-and-Execute Agent Systems</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
            Pure ReAct agents wander off track on complex 10-step workflows. Discover the Plan-and-Execute architecture: separating high-level strategic decomposition from tactical tool execution.
          </p>
        </div>
        <Link
          href="/learn/level-3/module-3-6"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow-blue-500/20 transition-all shrink-0 cursor-pointer"
        >
          <span>Continue to Module 3.6</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
