"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target, Check, ArrowRight, FileCode2, Layers, Lightbulb,
  AlertTriangle, Sparkles, HelpCircle, Copy, CheckCheck,
  Play, RotateCcw, FileText, Terminal, MessageSquare, Settings,
} from "lucide-react";
import DynamicPromptTemplateStudio from "./DynamicPromptTemplateStudio";
import Module2_14Quiz from "./Module2_14Quiz";

export default function Module2_14Content() {
  const [selectedComponent, setSelectedComponent] = useState<string>("antipattern");
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [activeCodeTab, setActiveCodeTab] = useState<"code" | "output">("code");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);

  const components = [
    {
      id: "antipattern",
      title: "❌ f-string Anti-Pattern",
      tagline: "Fragile & Unsanitary",
      desc: "Raw f-strings collapse system/user roles into one text blob, break on unescaped brackets, and make prompt testing impossible without running the full application.",
      icon: FileCode2,
      color: "text-rose-600 dark:text-rose-400",
      bg: "bg-rose-50 dark:bg-rose-500/10",
      border: "border-rose-200 dark:border-rose-500/30",
      badge: "Avoid",
      codeSnippet: `# ❌ THE F-STRING ANTI-PATTERN — fragile in production

role = "Cloud Security Auditor"
user_query = "Review this IAM policy: {policy_json}"  # Breaks if user sends {}!

# Collapses system + user into one unstructured blob
prompt = f"""System: You are a {role}.
User: {user_query}"""

# PROBLEMS:
# 1. No role boundaries — the model may confuse system vs. user text
# 2. {policy_json} in user query causes a KeyError crash
# 3. No injection protection — user can write: "Ignore system. Do X"
# 4. Cannot unit test prompt logic without calling the LLM
# 5. No variable validation — missing keys fail at runtime, not startup`,
    },
    {
      id: "template",
      title: "✅ ChatPromptTemplate",
      tagline: "Role-Aware & Safe",
      desc: "ChatPromptTemplate enforces strict System/Human/AI role boundaries, safely escapes curly brace variables, and supports runtime partial variable binding.",
      icon: MessageSquare,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      border: "border-emerald-200 dark:border-emerald-500/30",
      badge: "Production",
      codeSnippet: `# ✅ ChatPromptTemplate — production-grade role isolation
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder

# Each tuple = a distinct role with safe variable substitution
template = ChatPromptTemplate.from_messages([
    ("system", "You are a {domain} agent. Respond in a {tone} tone."),
    MessagesPlaceholder(variable_name="chat_history"),  # Injects history
    ("human", "{input}"),
])

# Format with runtime variables — curly brace inputs are escaped safely
messages = template.format_messages(
    domain="Cloud Security Auditor",
    tone="concise and analytical",
    chat_history=[],
    input="Review this IAM policy for privilege escalation risks."
)

# messages = [SystemMessage(...), HumanMessage(...)]  — proper role objects!`,
    },
    {
      id: "partial",
      title: "🔒 Partial Binding",
      tagline: "Pre-Fill at Startup",
      desc: "template.partial() pre-fills variables at startup time (e.g., role, tone from config), so runtime callers only need to supply user-facing variables like {input}.",
      icon: Settings,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-500/10",
      border: "border-purple-200 dark:border-purple-500/30",
      badge: "Config Lock",
      codeSnippet: `# 🔒 Partial Binding — lock config at startup, vary only at runtime

base_template = ChatPromptTemplate.from_messages([
    ("system", "You are a {domain} agent. Tone: {tone}. Language: {language}."),
    MessagesPlaceholder("history"),
    ("human", "{input}"),
])

# At startup: lock domain + tone + language from environment config
security_prompt = base_template.partial(
    domain=os.getenv("AGENT_DOMAIN", "Security Auditor"),
    tone=os.getenv("AGENT_TONE", "strictly formal"),
    language=os.getenv("AGENT_LANGUAGE", "English"),
)

# At request time: only {input} + {history} needed!
messages = security_prompt.format_messages(
    input="Does this policy allow cross-account assume-role?",
    history=prior_conversation_messages
)`,
    },
    {
      id: "pipeline",
      title: "⛓️ LCEL Pipeline",
      tagline: "Template → LLM Chain",
      desc: "Chain your ChatPromptTemplate directly to a model using LangChain Expression Language (LCEL) pipe syntax. The pipe operator builds a reusable, testable prompt-to-completion pipeline.",
      icon: Layers,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      border: "border-amber-200 dark:border-amber-500/30",
      badge: "LCEL Chain",
      codeSnippet: `# ⛓️ LCEL Pipeline — template | model | output_parser
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI
from langchain_core.output_parsers import StrOutputParser

template = ChatPromptTemplate.from_messages([
    ("system", "You are a {domain} expert. Be {tone}."),
    ("human", "{input}")
])

model = ChatOpenAI(model="gpt-4o-mini", temperature=0)
parser = StrOutputParser()

# Pipe operator builds the chain: template → LLM → string output
chain = template | model | parser

# Invoke like any callable — fully typed and composable!
result = chain.invoke({
    "domain": "Python performance engineer",
    "tone": "direct and concise",
    "input": "How do I profile async Python code?"
})
print(result)  # Direct string output, no .content needed`,
    },
  ];

  const currentComponent = components.find((c) => c.id === selectedComponent) || components[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentComponent.codeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setActiveCodeTab("output");
    setSimStep(1);
    setTimeout(() => setSimStep(2), 800);
    setTimeout(() => setSimStep(3), 1600);
    setTimeout(() => { setSimStep(4); setIsSimulating(false); }, 2400);
  };

  return (
    <div className="space-y-10 max-w-5xl mx-auto pb-16">
      {/* 🎯 OBJECTIVE BANNER */}
      <section className="rounded-2xl border border-purple-200 dark:border-purple-500/30 bg-purple-50/60 dark:bg-purple-500/5 p-4 sm:p-6 shadow-sm">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-purple-600 text-white shrink-0 shadow-sm mt-0.5"><Target className="w-5 h-5" /></div>
          <div className="space-y-2 flex-1">
            <h2 className="text-sm font-mono uppercase tracking-wider text-purple-800 dark:text-purple-400 font-bold">🎯 By the end of this module, you will:</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              {[
                "Explain why raw f-strings fail in production and why ChatPromptTemplate solves them",
                "Build a multi-role template with MessagesPlaceholder for conversation history injection",
                "Use template.partial() to pre-fill config variables and expose only runtime inputs",
                "Chain templates to LLMs and parsers using LCEL pipe syntax",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: 4 TEMPLATE COMPONENT CARDS */}
      <section className="space-y-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/30 text-purple-700 dark:text-purple-300 text-xs font-mono font-semibold mb-2">
            <FileCode2 className="w-3.5 h-3.5" /><span>Prompt Templates • LCEL Chaining</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Creating Reusable Dynamic Prompt Templates</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Hardcoded f-strings break in production. Real agent systems decouple prompt engineering from application logic using <strong>structured, composable templates</strong> with role isolation, history placeholders, and partial variable binding.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {components.map((comp) => {
            const Icon = comp.icon;
            const isSelected = selectedComponent === comp.id;
            return (
              <button key={comp.id} onClick={() => setSelectedComponent(comp.id)}
                className={`p-3.5 sm:p-4 rounded-xl border text-left transition-all flex flex-col justify-between min-h-[145px] sm:min-h-[160px] active:scale-95 cursor-pointer ${isSelected ? "border-purple-500 bg-white dark:bg-slate-900 shadow-md ring-2 ring-purple-500/20" : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700"}`}>
                <div className="space-y-2">
                  <div className={`inline-flex p-1.5 rounded-lg ${comp.bg} border ${comp.border}`}><Icon className={`w-4 h-4 ${comp.color}`} /></div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">{comp.title}</div>
                    <div className={`text-[10px] font-mono ${comp.color} mt-0.5`}>{comp.tagline}</div>
                  </div>
                </div>
                <p className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-2">{comp.desc}</p>
              </button>
            );
          })}
        </div>

        {/* CODE INSPECTOR */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`inline-flex p-1.5 rounded-lg ${currentComponent.bg} border ${currentComponent.border}`}><currentComponent.icon className={`w-4 h-4 ${currentComponent.color}`} /></div>
              <span className="text-xs font-bold text-slate-900 dark:text-white">{currentComponent.title}</span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${currentComponent.bg} ${currentComponent.color} border ${currentComponent.border}`}>{currentComponent.badge}</span>
            </div>
            <button onClick={handleCopyCode} className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer">
              {copiedCode ? <CheckCheck className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedCode ? "Copied!" : "Copy"}
            </button>
          </div>
          <div className="rounded-xl border border-slate-800 overflow-hidden bg-slate-950">
            <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-slate-800">
              <div className="flex gap-1">
                {(["code", "output"] as const).map((tab) => (
                  <button key={tab} onClick={() => setActiveCodeTab(tab)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono cursor-pointer ${activeCodeTab === tab ? "bg-slate-700 text-white" : "text-slate-400 hover:text-slate-200"}`}>
                    {tab === "code" ? <FileText className="w-3 h-3" /> : <Terminal className="w-3 h-3" />}
                    {tab === "code" ? "Python Code" : "Formatted Output"}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                {simStep > 0 && <button onClick={() => { setSimStep(0); setActiveCodeTab("code"); }} className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 cursor-pointer"><RotateCcw className="w-3 h-3" /> Reset</button>}
                <button onClick={handleRunSimulation} disabled={isSimulating || currentComponent.id === "antipattern"}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-purple-600 hover:bg-purple-500 text-white text-xs font-mono disabled:opacity-40 cursor-pointer">
                  <Play className="w-3 h-3" />{isSimulating ? "Formatting..." : currentComponent.id === "antipattern" ? "Broken ❌" : "Run"}
                </button>
              </div>
            </div>
            <div className="p-4 min-h-[140px] font-mono text-xs">
              {activeCodeTab === "code" ? (
                <pre className="text-slate-300 whitespace-pre-wrap leading-relaxed">{currentComponent.codeSnippet}</pre>
              ) : (
                <div className="space-y-2 text-slate-300">
                  {simStep === 0 && <div className="text-slate-500 italic">Click &apos;Run&apos; to format the template and inspect output messages...</div>}
                  {simStep >= 1 && <div className="text-purple-400">➜ [FORMAT] Template variables bound: domain, tone, input</div>}
                  {simStep >= 2 && (
                    <div className="text-slate-300 pl-4 space-y-1">
                      <div className="text-sky-400">messages[0] = SystemMessage(content=&quot;You are a Cloud Security Auditor agent. Respond in a concise and analytical tone.&quot;)</div>
                      <div className="text-emerald-400">messages[1] = HumanMessage(content=&quot;Review this IAM policy for privilege escalation risks.&quot;)</div>
                    </div>
                  )}
                  {simStep >= 3 && <div className="text-slate-400">Role boundaries preserved: System ≠ Human ≠ AI<br />All {"{}"} variables safely interpolated — no crash risk</div>}
                  {simStep >= 4 && (
                    <div className="text-emerald-400 font-bold pt-2 border-t border-slate-800">
                      ✔ [SUCCESS] 2 role-isolated messages ready for LLM<br />
                      <span className="text-slate-400 font-normal text-[10px]">ChatPromptTemplate ensures safe variable substitution and proper role objects</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: TEMPLATE ANATOMY */}
      <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">📄 Anatomy of a Production Agent Prompt</h3>
        </div>
        <div className="p-5 space-y-3">
          {[
            { role: "System Message", color: "text-sky-600 dark:text-sky-400", bg: "bg-sky-50 dark:bg-sky-500/10", border: "border-sky-200 dark:border-sky-500/30", example: "You are a {domain} expert. Tone: {tone}.", note: "Sets persona + behavior. Pre-filled via partial()." },
            { role: "MessagesPlaceholder", color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-500/10", border: "border-amber-200 dark:border-amber-500/30", example: "MessagesPlaceholder(variable_name='chat_history')", note: "Injects conversation history as proper message objects." },
            { role: "Human Message", color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10", border: "border-emerald-200 dark:border-emerald-500/30", example: "{input}", note: "Runtime user query. The only variable supplied per-request." },
          ].map(({ role, color, bg, border, example, note }) => (
            <div key={role} className={`p-3.5 rounded-xl border ${border} ${bg} flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4`}>
              <div className={`text-xs font-mono font-bold ${color} shrink-0 w-40`}>{role}</div>
              <code className="text-xs text-slate-800 dark:text-slate-200 font-mono flex-1">{example}</code>
              <div className="text-xs text-slate-600 dark:text-slate-400 shrink-0 max-w-[200px]">{note}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: INTERACTIVE STUDIO */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">🔬 Prompt Template Studio</h3>
        <DynamicPromptTemplateStudio />
      </section>

      {/* SECTION 4: NOTES */}
      <section className="space-y-3">
        <div className="p-4 rounded-xl border border-amber-300 dark:border-amber-500/30 bg-amber-50/90 dark:bg-amber-500/10 shadow-sm">
          <span className="font-['Caveat',cursive] text-base text-amber-950 dark:text-amber-200 block">✍️ Instructor Note: &quot;Store your ChatPromptTemplates in dedicated YAML or Python config files — NOT scattered across function bodies. Treat prompts as code: version control them, code-review them, and test them in isolation from your agent logic.&quot;</span>
        </div>
        <div className="p-4 rounded-xl border border-purple-200 dark:border-purple-500/30 bg-purple-50/90 dark:bg-purple-500/10 shadow-sm">
          <span className="font-['Caveat',cursive] text-base text-purple-950 dark:text-purple-200 block">📌 Core Rule: Always validate that all {"{variables}"} in your template match the keys you supply at runtime — BEFORE making the LLM call. Use Pydantic validation on your request model so missing variables are caught at the API boundary, not inside the LLM call stack.</span>
        </div>
      </section>

      {/* SECTION 5: TRAPS */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-500" /><span>Prompt Template Traps</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-500/30 bg-rose-50/50 dark:bg-rose-500/5 space-y-2">
            <span className="text-xs font-mono font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider block">TRAP #1: Literal Curly Braces in Content</span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">If your prompt text contains literal JSON like {`{"key": "value"}`}, ChatPromptTemplate will try to resolve it as a variable and raise a KeyError. Escape literal braces by doubling them: {`{{"key": "value"}}`} in the template string.</p>
          </div>
          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-500/5 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">TRAP #2: Forgetting MessagesPlaceholder</span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">Without MessagesPlaceholder in your template, conversation history has nowhere to inject. Many developers add history to the Human message as a raw string — this collapses roles and breaks the model&apos;s ability to distinguish user from assistant turns.</p>
          </div>
        </div>
      </section>

      {/* SECTION 6: KEY TAKEAWAYS */}
      <section className="rounded-xl border border-purple-200 dark:border-purple-500/30 bg-purple-50/50 dark:bg-purple-500/5 p-5 space-y-3">
        <h4 className="font-bold text-sm text-purple-900 dark:text-purple-300 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" /><span>Key Takeaways</span>
        </h4>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          {[
            ["1.", "Treat Prompts as Code:", "Version-control templates in YAML or Python config files. Code-review all prompt changes. A 5-word prompt change can cause catastrophic behavior shifts in production."],
            ["2.", "partial() for Config Separation:", "Pre-fill env-dependent variables (model persona, language, tone) at application startup via template.partial(). Runtime callers only need to provide user-facing inputs like {input} and {history}."],
            ["3.", "LCEL for Composable Chains:", "The pipe operator (template | model | parser) builds reusable, testable, composable chains. Each component is independently testable and swappable without touching other parts."],
          ].map(([n, bold, rest]) => (
            <li key={n} className="flex items-start gap-2">
              <span className="text-purple-600 dark:text-purple-400 font-bold">{n}</span>
              <span><strong>{bold}</strong> {rest}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* SECTION 7: QUIZ */}
      <section className="space-y-3">
        <button onClick={() => setShowQuiz(!showQuiz)}
          className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all text-left cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400"><HelpCircle className="w-5 h-5" /></div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">Concept Check: Prompt Templates</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">{showQuiz ? "Click to collapse" : "Test your template intuition (3 questions)"}</p>
            </div>
          </div>
          <span className="text-xs font-mono font-semibold px-3 py-1.5 rounded-lg bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-500/30">
            {showQuiz ? "Hide Quiz" : "Start Quiz"}
          </span>
        </button>
        <AnimatePresence>
          {showQuiz && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }}>
              <Module2_14Quiz />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* NEXT MODULE BRIDGE */}
      <section className="rounded-2xl border border-purple-200 dark:border-purple-500/30 bg-gradient-to-r from-purple-50 via-white to-slate-50 dark:from-purple-500/10 dark:via-slate-900 dark:to-slate-950 p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <div className="text-xs font-mono font-bold text-purple-700 dark:text-purple-400 uppercase tracking-wider">Up Next • Module 2.15</div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Implementing Input Validation & Guardrails</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">Build a 3-tier Defense-in-Depth pipeline — regex circuit breakers, XML quarantine isolation, and semantic LLM judges — to protect your agent from adversarial inputs.</p>
        </div>
        <Link href="/learn/level-2/module-2-15" className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs sm:text-sm shadow-sm transition-all shrink-0 cursor-pointer">
          <span>Continue to Module 2.15</span><ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
