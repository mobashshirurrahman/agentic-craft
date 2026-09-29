"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  Check,
  ArrowRight,
  FileJson,
  ShieldCheck,
  Zap,
  Code2,
  AlertTriangle,
  Sparkles,
  HelpCircle,
  Copy,
  CheckCheck,
  Play,
  RotateCcw,
  Terminal,
  FileText,
  Database,
} from "lucide-react";
import PydanticSchemaVisualizer from "./PydanticSchemaVisualizer";
import Module2_2Quiz from "./Module2_2Quiz";

export default function Module2_2Content() {
  const [selectedOutput, setSelectedOutput] = useState<string>("schema");
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [activeCodeTab, setActiveCodeTab] = useState<"code" | "output">("code");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);

  const outputConcepts = [
    {
      id: "schema",
      title: "1. Schema Design",
      tagline: "Field Definitions",
      desc: "Define your expected output structure as a Pydantic BaseModel. Each field gets a type annotation and a Field() descriptor that guides the LLM.",
      icon: FileJson,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      border: "border-emerald-200 dark:border-emerald-500/30",
      badge: "Step 1",
      codeSnippet: `# Step 1: Define output schema as a Pydantic model
from pydantic import BaseModel, Field
from typing import Literal

class SentimentAnalysis(BaseModel):
    sentiment: Literal["positive", "negative", "neutral"]
    confidence: float = Field(ge=0.0, le=1.0)
    issue_type: str = Field(description="Category of the user's issue")
    requires_escalation: bool`,
    },
    {
      id: "binding",
      title: "2. Model Binding",
      tagline: "Forced Schema Output",
      desc: "Call model.with_structured_output(YourModel) to instruct the LLM to emit responses that match your Pydantic schema exactly — no regex or manual parsing needed.",
      icon: Database,
      color: "text-sky-600 dark:text-sky-400",
      bg: "bg-sky-50 dark:bg-sky-500/10",
      border: "border-sky-200 dark:border-sky-500/30",
      badge: "Step 2",
      codeSnippet: `# Step 2: Bind schema to model
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)
extractor = llm.with_structured_output(SentimentAnalysis)

# The model is now forced to return a SentimentAnalysis object
# It will use function calling internally to enforce the schema`,
    },
    {
      id: "invocation",
      title: "3. Type-Safe Result",
      tagline: "Validated & Parsed",
      desc: "Invoke with any text input and receive a fully validated Python object. If the model violates the schema, Pydantic raises a ValidationError before it reaches your code.",
      icon: ShieldCheck,
      color: "text-teal-600 dark:text-teal-400",
      bg: "bg-teal-50 dark:bg-teal-500/10",
      border: "border-teal-200 dark:border-teal-500/30",
      badge: "Step 3",
      codeSnippet: `# Step 3: Invoke and use the typed result
review = "The checkout was buggy and I lost my cart three times!"

result: SentimentAnalysis = extractor.invoke(review)

print(result.sentiment)             # "negative"
print(result.confidence)            # 0.95
print(result.issue_type)            # "checkout_bug"
print(result.requires_escalation)   # True`,
    },
    {
      id: "validation",
      title: "4. Error Handling",
      tagline: "Validation Guards",
      desc: "Pydantic validates types, ranges (ge, le), and literal sets at parse time. Invalid LLM outputs raise structured ValidationError exceptions you can catch and retry.",
      icon: AlertTriangle,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      border: "border-amber-200 dark:border-amber-500/30",
      badge: "Step 4",
      codeSnippet: `# Step 4: Handle validation errors gracefully
from pydantic import ValidationError

try:
    result: SentimentAnalysis = extractor.invoke(review)
    await db.save(result.model_dump())

except ValidationError as e:
    # Log field-level errors, trigger retry with refined prompt
    logger.error(f"Schema violation: {e.errors()}")
    await retry_with_stricter_prompt(review)`,
    },
  ];

  const currentConcept =
    outputConcepts.find((c) => c.id === selectedOutput) || outputConcepts[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentConcept.codeSnippet);
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
      <section className="rounded-2xl border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50/60 dark:bg-emerald-500/5 p-4 sm:p-6 backdrop-blur-sm shadow-sm">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-emerald-600 text-white shrink-0 shadow-sm mt-0.5">
            <Target className="w-5 h-5" />
          </div>
          <div className="space-y-2 flex-1">
            <h2 className="text-sm font-mono uppercase tracking-wider text-emerald-800 dark:text-emerald-400 font-bold">
              🎯 By the end of this module, you will:
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Define Pydantic BaseModel schemas that force LLM output into structured types</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Use <code className="font-mono text-[11px] bg-slate-100 dark:bg-slate-800 px-1 rounded">with_structured_output()</code> to bind schemas to any LangChain model</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Add Field validators (ge, le, Literal) to enforce business logic at the LLM layer</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Handle ValidationError exceptions and implement structured retry patterns</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: THE 4-STEP PATTERN */}
      <section className="space-y-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-mono font-semibold mb-2">
            <FileJson className="w-3.5 h-3.5" />
            <span>Schema Engineering • Type Safety</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Structured Outputs with Pydantic
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Free-form LLM text is useless downstream. Pydantic + <code className="font-mono text-xs bg-slate-100 dark:bg-slate-800 px-1 rounded">with_structured_output</code> turns any model into a typed data extractor — no regex, no brittle JSON parsing.
          </p>
        </div>

        {/* 4 SYMMETRICAL CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {outputConcepts.map((concept) => {
            const Icon = concept.icon;
            const isSelected = selectedOutput === concept.id;

            return (
              <button
                key={concept.id}
                onClick={() => setSelectedOutput(concept.id)}
                className={`p-3.5 sm:p-4 rounded-xl border text-left transition-all flex flex-col justify-between min-h-[145px] sm:min-h-[160px] active:scale-95 touch-manipulation cursor-pointer ${
                  isSelected
                    ? "border-emerald-500 bg-white dark:bg-slate-900 shadow-md ring-2 ring-emerald-500/20"
                    : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                <div className="space-y-2">
                  <div className={`inline-flex p-1.5 rounded-lg ${concept.bg} border ${concept.border}`}>
                    <Icon className={`w-4 h-4 ${concept.color}`} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">{concept.title}</div>
                    <div className={`text-[10px] font-mono ${concept.color} mt-0.5`}>{concept.tagline}</div>
                  </div>
                </div>
                <p className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-2">
                  {concept.desc}
                </p>
              </button>
            );
          })}
        </div>

        {/* CODE INSPECTOR */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`inline-flex p-1.5 rounded-lg ${currentConcept.bg} border ${currentConcept.border}`}>
                <currentConcept.icon className={`w-4 h-4 ${currentConcept.color}`} />
              </div>
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                {currentConcept.title}: {currentConcept.tagline}
              </span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${currentConcept.bg} ${currentConcept.color} border ${currentConcept.border}`}>
                {currentConcept.badge}
              </span>
            </div>
            <button onClick={handleCopyCode} className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer">
              {copiedCode ? <CheckCheck className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedCode ? "Copied!" : "Copy"}
            </button>
          </div>

          <div className="rounded-xl border border-slate-800 overflow-hidden bg-slate-950">
            <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-slate-800">
              <div className="flex gap-1">
                {(["code", "output"] as const).map((tab) => (
                  <button key={tab} onClick={() => setActiveCodeTab(tab)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono transition-all cursor-pointer ${activeCodeTab === tab ? "bg-slate-700 text-white" : "text-slate-400 hover:text-slate-200"}`}>
                    {tab === "code" ? <FileText className="w-3 h-3" /> : <Terminal className="w-3 h-3" />}
                    {tab === "code" ? "Python Code" : "Output Terminal"}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                {simStep > 0 && (
                  <button onClick={() => { setSimStep(0); setActiveCodeTab("code"); }} className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 cursor-pointer">
                    <RotateCcw className="w-3 h-3" /> Reset
                  </button>
                )}
                <button onClick={handleRunSimulation} disabled={isSimulating}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono transition-all disabled:opacity-50 cursor-pointer">
                  <Play className="w-3 h-3" />
                  {isSimulating ? "Extracting..." : "Run"}
                </button>
              </div>
            </div>
            <div className="p-4 min-h-[140px] font-mono text-xs">
              {activeCodeTab === "code" ? (
                <pre className="text-slate-300 whitespace-pre-wrap leading-relaxed">{currentConcept.codeSnippet}</pre>
              ) : (
                <div className="space-y-2 text-slate-300">
                  {simStep === 0 && <div className="text-slate-500 italic">Click &apos;Run&apos; to simulate extraction...</div>}
                  {simStep >= 1 && <div className="text-emerald-400">➜ [MODEL] gpt-4o-mini invoked with SentimentAnalysis schema</div>}
                  {simStep >= 2 && <div className="text-slate-400 pl-4">[SCHEMA ENFORCEMENT] Function calling activated → JSON output forced<br /><span className="text-sky-400">✔ LLM output validated against Pydantic model</span></div>}
                  {simStep >= 3 && <div className="text-purple-300">➜ [PARSED RESULT] SentimentAnalysis object instantiated</div>}
                  {simStep >= 4 && (
                    <div className="text-emerald-400 font-bold pt-2 border-t border-slate-800">
                      ✔ result.sentiment = &quot;negative&quot;<br />
                      ✔ result.confidence = 0.95<br />
                      ✔ result.requires_escalation = True<br />
                      <span className="text-slate-400 font-normal text-[10px]">All fields valid — no ValidationError raised.</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: ANALOGY */}
      <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">📋 Mental Model: Unstructured vs Structured</h3>
        </div>
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-500/30 bg-rose-50 dark:bg-rose-500/5 space-y-2">
            <div className="text-xs font-mono font-bold text-rose-700 dark:text-rose-400">❌ Free-Form Text Output</div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed">
              &quot;The sentiment is negative and confidence around 90%. The issue seems to be latency.&quot;
            </p>
            <p className="text-[10px] text-rose-700 dark:text-rose-300">Cannot write to DB. Cannot trigger API. Requires brittle regex.</p>
          </div>
          <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 space-y-2">
            <div className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">✅ Pydantic Structured Output</div>
            <pre className="text-[11px] bg-slate-900 text-emerald-300 p-2 rounded font-mono">{`{"sentiment": "negative",\n "confidence": 0.90,\n "requires_escalation": true}`}</pre>
            <p className="text-[10px] text-emerald-700 dark:text-emerald-300">Directly writable to PostgreSQL. Zero parsing code.</p>
          </div>
        </div>
      </section>

      {/* SECTION 3: PYDANTIC SCHEMA VISUALIZER */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">🔬 Schema Builder Visualizer</h3>
        <PydanticSchemaVisualizer />
      </section>

      {/* SECTION 4: HANDWRITTEN NOTES */}
      <section className="space-y-3">
        <div className="p-4 rounded-xl border border-amber-300 dark:border-amber-500/30 bg-amber-50/90 dark:bg-amber-500/10 shadow-sm">
          <span className="font-['Caveat',cursive] text-base text-amber-950 dark:text-amber-200 block sm:-rotate-0.5">
            ✍️ Instructor Note: &quot;Always use temperature=0 with structured outputs. Any temperature &gt; 0 can cause the LLM to randomly deviate from your schema constraints — especially for Literal and constrained float fields!&quot;
          </span>
        </div>
        <div className="p-4 rounded-xl border border-teal-200 dark:border-teal-500/30 bg-teal-50/90 dark:bg-teal-500/10 shadow-sm">
          <span className="font-['Caveat',cursive] text-base text-teal-950 dark:text-teal-200 block">
            💡 Mental Model: Think of Pydantic like a customs officer at an airport. Every piece of luggage (LLM output) must match the declared manifest (schema) — wrong type, wrong format, or missing field? Confiscated! ValidationError raised.
          </span>
        </div>
        <div className="p-4 rounded-xl border border-sky-200 dark:border-sky-500/30 bg-sky-50/90 dark:bg-sky-500/10 shadow-sm">
          <span className="font-['Caveat',cursive] text-base text-sky-950 dark:text-sky-200 block">
            📌 Core Rule: Write Field() descriptions in your schema like instructions to the LLM, not documentation for developers. &quot;The severity score from 1 to 10 where 10 means immediate P0 outage&quot; is far more reliable than &quot;severity score&quot;.
          </span>
        </div>
      </section>

      {/* SECTION 5: TRAPS */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          <span>Structured Output Traps</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-500/30 bg-rose-50/50 dark:bg-rose-500/5 space-y-2">
            <span className="text-xs font-mono font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider block">TRAP #1: Ambiguous Field Descriptions</span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              A field named <code>score: float</code> with no description will cause the model to guess what to put there. Always include a Field() description that specifies the exact meaning, range, and expected values.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-500/5 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">TRAP #2: Deeply Nested Optional Fields</span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Complex nested schemas with many Optional fields confuse smaller models. Flatten your schema to 1-2 levels. For complex extractions, break into multiple sequential structured calls.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6: KEY TAKEAWAYS */}
      <section className="rounded-xl border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-500/5 p-5 space-y-3">
        <h4 className="font-bold text-sm text-emerald-900 dark:text-emerald-300 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Key Takeaways</span>
        </h4>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          <li className="flex items-start gap-2">
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">1.</span>
            <span><strong>Schema-First Design:</strong> Define your Pydantic model before writing the prompt. The schema IS the interface contract between your LLM and your application code.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">2.</span>
            <span><strong>Field() Descriptions are LLM Instructions:</strong> Write field descriptions as if explaining to the LLM exactly what value to put there — with examples and boundary conditions.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">3.</span>
            <span><strong>Catch ValidationError Early:</strong> Wrap every structured output call in try/except. Log the field-level Pydantic errors and implement an automatic retry with a clarifying prompt.</span>
          </li>
        </ul>
      </section>

      {/* SECTION 7: QUIZ */}
      <section className="space-y-3">
        <button onClick={() => setShowQuiz(!showQuiz)}
          className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all text-left shadow-xs cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">Concept Check: Structured Outputs</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">{showQuiz ? "Click to collapse" : "Test your Pydantic schema intuition (3 questions)"}</p>
            </div>
          </div>
          <span className="text-xs font-mono font-semibold px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30">
            {showQuiz ? "Hide Quiz" : "Start Quiz"}
          </span>
        </button>
        <AnimatePresence>
          {showQuiz && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }}>
              <Module2_2Quiz />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* SECTION 8: NEXT MODULE BRIDGE */}
      <section className="rounded-2xl border border-emerald-200 dark:border-emerald-500/30 bg-gradient-to-r from-emerald-50 via-white to-slate-50 dark:from-emerald-500/10 dark:via-slate-900 dark:to-slate-950 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
            <span>Up Next • Module 2.3</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Integrating External Tools into an Agent</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
            Connect Tavily Search, calculator tools, and external APIs to give your agent real-world access — and learn the golden rules of tool selection.
          </p>
        </div>
        <Link href="/learn/level-2/module-2-3"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow-emerald-500/20 transition-all shrink-0 cursor-pointer">
          <span>Continue to Module 2.3</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
