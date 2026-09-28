"use client";

import React from "react";
import Link from "next/link";
import {
  Search,
  Database,
  Layers,
  Cpu,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  BookOpen,
  Terminal,
  ShieldCheck,
  Zap,
  Lock,
  FileText,
} from "lucide-react";
import RagNodeVsToolVisualizer from "./RagNodeVsToolVisualizer";
import RagIngestionInferenceStudio from "./RagIngestionInferenceStudio";
import Module1_10Quiz from "./Module1_10Quiz";

export default function Module1_10Content() {
  return (
    <div className="space-y-12">
      {/* SECTION 1: Welcome & The Open-Book Exam Analogy */}
      <section className="rounded-2xl border border-teal-500/30 bg-gradient-to-br from-teal-500/10 via-slate-900/80 to-slate-950 p-6 md:p-8 relative overflow-hidden dark:from-teal-500/10 dark:via-slate-900/80 dark:to-slate-950 light:from-teal-50 light:via-white light:to-slate-50 light:border-teal-200">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-500/40 text-teal-300 dark:text-teal-300 light:text-teal-700 text-xs font-mono font-semibold mb-4">
            <Search className="w-3.5 h-3.5" />
            <span>Module 1.10 • Foundations & Architecture</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold text-white dark:text-white light:text-slate-900 tracking-tight">
            Hello and Welcome! Let's Master RAG for AI Agents
          </h2>

          <p className="mt-3 text-slate-300 dark:text-slate-300 light:text-slate-700 text-sm md:text-base leading-relaxed">
            One of the most transformative superpowers you can grant an AI agent is <strong>Retrieval Augmented Generation (RAG)</strong>. While standard LLMs are frozen in the past, RAG connects them to your living enterprise databases, private codebases, and confidential internal manuals!
          </p>

          {/* Open-Book Exam Analogy */}
          <div className="mt-6 p-5 rounded-xl border border-teal-500/40 bg-teal-950/30 dark:bg-teal-950/30 light:bg-teal-50/80 flex flex-col md:flex-row gap-4 items-start">
            <div className="w-12 h-12 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400 flex-shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white dark:text-white light:text-slate-900 text-base">
                The Academic Analogy: Closed-Book Cramming vs. The Open-Book Exam
              </h4>
              <p className="text-xs md:text-sm text-slate-300 dark:text-slate-300 light:text-slate-700 mt-1 leading-relaxed">
                • <strong>Closed-Book Exam (Standalone LLM):</strong> A student tries to memorize 1,000 textbooks in their head. When asked about a specific tax code formula from 2026, their memory gets fuzzy and they invent a convincing-sounding fake answer (<strong>Hallucination</strong>).
                <br /><br />
                • <strong>Open-Book Exam with a Library (RAG):</strong> The student doesn't need to memorize every tiny detail. When presented with the question, they walk over to the indexed bookshelf, pull the exact tax handbook, verify the page, and write down the accurate answer with exact page citations!
              </p>
              <p className="text-xs md:text-sm text-teal-300 dark:text-teal-300 light:text-teal-800 mt-2 font-medium">
                RAG turns every agent query into an open-book exam, grounding responses in your verified external documents!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: What is RAG & The 4 Problems It Solves */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
            <Database className="w-4 h-4" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white dark:text-white light:text-slate-900">
            What is RAG? (And The 4 Problems It Solves)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-900/60 dark:bg-slate-900/60 light:bg-white p-5 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider block mb-1">
                Formal Definition
              </span>
              <h4 className="text-base font-bold text-white dark:text-white light:text-slate-900 mb-2">
                Retrieval + Augmented Generation
              </h4>
              <p className="text-xs md:text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
                RAG is a technique that combines information retrieval with text generation. It searches a corpus of external documents to find relevant context, injects those passages into the model's prompt, and instructs the LLM to synthesize the response using strictly verified sources.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 dark:border-slate-800 light:border-slate-100 flex items-center gap-2 text-xs font-mono text-teal-300 dark:text-teal-300 light:text-teal-700">
              <CheckCircle2 className="w-4 h-4 text-teal-400" />
              <span>Query ➔ Retrieve Chunks ➔ Augment Prompt ➔ Grounded Answer</span>
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-900/60 dark:bg-slate-900/60 light:bg-white p-5 space-y-2.5">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block mb-1">
              The 4 Enterprise Problems RAG Solves
            </span>
            <ul className="space-y-2 text-xs md:text-sm text-slate-300 dark:text-slate-300 light:text-slate-600">
              <li className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">1.</span>
                <span><strong>Overcomes Knowledge Cutoffs:</strong> Accesses events, pricing, and news published after model training.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">2.</span>
                <span><strong>Protects Private Data:</strong> Accesses proprietary enterprise IP on-premise without exposing it to public model training sets.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">3.</span>
                <span><strong>Enforces Factual Grounding:</strong> Answers are tethered to retrieved documents with verifiable source citations.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">4.</span>
                <span><strong>Zero Retraining Cost:</strong> Update documents in your vector database in 1 second; zero GPU fine-tuning required!</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 3: The Paradigm Shift — RAG as a Node vs. RAG as a Tool */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
            <Layers className="w-4 h-4" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white dark:text-white light:text-slate-900">
            RAG as a Node vs. RAG as an Autonomous Tool
          </h3>
        </div>

        <p className="text-xs md:text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
          In early AI engineering, RAG was always a rigid, linear pipeline step. But in agentic architectures, RAG can be either a <strong>deterministic Graph Node</strong> or a <strong>dynamic Tool</strong> that the agent chooses when and how to call!
        </p>

        {/* Embedded Visualizer */}
        <RagNodeVsToolVisualizer />
      </section>

      {/* SECTION 4: Interactive Studio — Ingestion & Inference Lifecycle */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
            <Terminal className="w-4 h-4" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white dark:text-white light:text-slate-900">
            Interactive Studio: Ingestion, Inference & Noise Pitfalls
          </h3>
        </div>

        <p className="text-xs md:text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
          Experience the two core phases of RAG in action! Adjust chunk sizes in the Ingestion phase, then test what happens when retrieval returns noisy or irrelevant documents.
        </p>

        {/* Embedded Studio */}
        <RagIngestionInferenceStudio />
      </section>

      {/* SECTION 5: Critical Pitfall — "RAG Solves Hallucinations" Myth */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-rose-400">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white dark:text-white light:text-slate-900">
            The Myth: "RAG Solves Hallucinations"
          </h3>
        </div>

        <div className="p-6 rounded-2xl border border-rose-500/40 bg-gradient-to-br from-rose-500/10 via-slate-900/80 to-slate-950 space-y-4 text-xs md:text-sm text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed">
          <p>
            You will frequently hear people say: <em>"Just add RAG and hallucinations will disappear!"</em>
            <br />
            <strong>This is an engineering fallacy.</strong>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 font-mono text-xs">
            <div className="p-3 rounded-lg bg-slate-950/80 border border-rose-500/30 space-y-1">
              <span className="font-bold text-rose-400 block">1. Irrelevant Retrieval</span>
              <p className="text-slate-400 text-[11px]">
                If your vector search retrieves irrelevant paragraphs, the model tries to force an answer and hallucinates wildly.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-slate-950/80 border border-rose-500/30 space-y-1">
              <span className="font-bold text-rose-400 block">2. Chunk Truncation</span>
              <p className="text-slate-400 text-[11px]">
                If a vital sentence is sliced in half across two chunk boundaries, the model misinterprets the condition.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-slate-950/80 border border-rose-500/30 space-y-1">
              <span className="font-bold text-rose-400 block">3. Context Extrapolation</span>
              <p className="text-slate-400 text-[11px]">
                Even with perfect documents, models can still extrapolate beyond what the text states unless strictly guarded.
              </p>
            </div>
          </div>
          <p className="pt-2 text-rose-300 dark:text-rose-300 light:text-rose-800 font-semibold">
            Key Takeaway: RAG shifts the challenge from "model memorization" to "retrieval quality and context adherence". High-production agents always pair RAG with re-ranking and verification rubrics!
          </p>
        </div>
      </section>

      {/* SECTION 6: Concept Check Quiz */}
      <section>
        <Module1_10Quiz />
      </section>

      {/* SECTION 7: Teacher Summary & Bridge to Module 1.11 */}
      <section className="rounded-2xl border border-teal-500/40 bg-gradient-to-r from-teal-500/10 via-slate-900/70 to-slate-950 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 dark:from-teal-500/10 dark:via-slate-900/70 dark:to-slate-950 light:from-teal-50 light:via-white light:to-slate-50 light:border-teal-200">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-teal-400 font-mono text-xs uppercase tracking-wider font-bold">
            <BookOpen className="w-4 h-4" />
            <span>Teacher Summary • Module 1.10 Complete!</span>
          </div>
          <h4 className="text-lg md:text-xl font-bold text-white dark:text-white light:text-slate-900">
            You now master grounding AI agents with external knowledge!
          </h4>
          <p className="text-xs md:text-sm text-slate-300 dark:text-slate-300 light:text-slate-700 max-w-2xl leading-relaxed">
            We covered the open-book exam principle, the Ingestion and Inference lifecycles, the critical paradigm shift from fixed RAG Nodes to autonomous RAG Tools, and debunked the hallucination myth.
            <br />
            Next up: <strong>Module 1.11: Evaluating AI Agent Frameworks</strong>, where we compare LangGraph, CrewAI, AutoGen, LlamaIndex, and the OpenAI Agents SDK!
          </p>
        </div>

        <Link
          href="/learn/level-1/module-1-11"
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs md:text-sm transition-all shadow-lg hover:shadow-teal-500/20 whitespace-nowrap flex-shrink-0 cursor-pointer"
        >
          <span>Next: Module 1.11</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
