"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target, Check, ArrowRight, MessageSquare, Database, Bot, Code2,
  AlertTriangle, Sparkles, HelpCircle, Copy, CheckCheck, Play,
  RotateCcw, FileText, Terminal, Key, Users,
} from "lucide-react";
import LangGraphChatbotStudio from "./LangGraphChatbotStudio";
import Module2_11Quiz from "./Module2_11Quiz";

export default function Module2_11Content() {
  const [selectedConcept, setSelectedConcept] = useState<string>("checkpointer");
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [activeCodeTab, setActiveCodeTab] = useState<"code" | "output">("code");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);

  const concepts = [
    {
      id: "checkpointer",
      title: "1. Checkpointer",
      tagline: "State Persistence",
      desc: "The checkpointer persists the full LangGraph state dict after every node execution. MemorySaver works in RAM; use PostgresSaver or RedisSaver for multi-server production deployments.",
      icon: Database,
      color: "text-sky-600 dark:text-sky-400",
      bg: "bg-sky-50 dark:bg-sky-500/10",
      border: "border-sky-200 dark:border-sky-500/30",
      badge: "Layer 1",
      codeSnippet: `# Layer 1: Checkpointer — the state persistence engine
from langgraph.checkpoint.memory import MemorySaver
from langgraph.graph import StateGraph, MessagesState, START

model = ChatOpenAI(model="gpt-4o-mini", temperature=0)

def chatbot_node(state: MessagesState):
    return {"messages": [model.invoke(state["messages"])]}

builder = StateGraph(MessagesState)
builder.add_node("chatbot", chatbot_node)
builder.add_edge(START, "chatbot")

# MemorySaver = in-memory (dev/testing only)
# Use PostgresSaver or RedisSaver in production!
memory = MemorySaver()
app = builder.compile(checkpointer=memory)`,
    },
    {
      id: "thread_id",
      title: "2. thread_id",
      tagline: "Conversation Isolation",
      desc: "Each unique thread_id creates a completely isolated conversation namespace. User A's messages never bleed into User B's context — even running on the same server.",
      icon: Key,
      color: "text-teal-600 dark:text-teal-400",
      bg: "bg-teal-50 dark:bg-teal-500/10",
      border: "border-teal-200 dark:border-teal-500/30",
      badge: "Layer 2",
      codeSnippet: `# Layer 2: thread_id — conversation isolation
# Every user gets a unique thread_id that namespaces their conversation

config_user_a = {"configurable": {"thread_id": "user_alice_session_42"}}
config_user_b = {"configurable": {"thread_id": "user_bob_session_99"}}

# Turn 1 — Alice tells agent her name
app.invoke({"messages": [("user", "Hi, I'm Alice!")]}, config_user_a)

# Turn 1 — Bob asks something unrelated (completely isolated)
app.invoke({"messages": [("user", "What's the weather?")]}, config_user_b)

# Turn 2 — Alice's context is preserved across the gap
reply = app.invoke({"messages": [("user", "What's my name?")]}, config_user_a)
print(reply["messages"][-1].content)  # "Your name is Alice."`,
    },
    {
      id: "history",
      title: "3. Auto History",
      tagline: "Message Accumulation",
      desc: "The add_messages reducer automatically appends new messages to the existing history. The LLM receives the full conversation on every turn without you writing any accumulation code.",
      icon: MessageSquare,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-500/10",
      border: "border-purple-200 dark:border-purple-500/30",
      badge: "Layer 3",
      codeSnippet: `# Layer 3: History auto-accumulates via add_messages reducer
from typing import Annotated
from langgraph.graph.message import add_messages
from typing import TypedDict

class ChatState(TypedDict):
    # add_messages: new messages are APPENDED, not overwritten
    # Without this annotation, node updates would erase prior history!
    messages: Annotated[list, add_messages]

# How it works under the hood:
# Turn 1 state: messages = [HumanMessage("Hi Alice")]
# Turn 2 state: messages = [HumanMessage("Hi Alice"), AIMessage("Hello!"), HumanMessage("My name?")]
# The LLM sees the full history on every invoke — zero extra code`,
    },
    {
      id: "production",
      title: "4. Production Saver",
      tagline: "Persistent Backend",
      desc: "MemorySaver resets on server restart. For multi-user production, use PostgresSaver (for relational persistence) or RedisSaver (for low-latency session caching).",
      icon: Users,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      border: "border-amber-200 dark:border-amber-500/30",
      badge: "Layer 4",
      codeSnippet: `# Layer 4: Production persistence with PostgresSaver
from langgraph.checkpoint.postgres import PostgresSaver
import psycopg

# Connect to your production PostgreSQL database
conn = psycopg.connect("postgresql://user:pass@host:5432/agentdb")
checkpointer = PostgresSaver(conn)
checkpointer.setup()  # Creates LangGraph tables if they don't exist

# Compile with persistent checkpointer
app = builder.compile(checkpointer=checkpointer)

# Now conversations persist across server restarts!
# thread_id="user_123" resumes exactly where it left off`,
    },
  ];

  const currentConcept = concepts.find((c) => c.id === selectedConcept) || concepts[0];

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
    setTimeout(() => { setSimStep(4); setIsSimulating(false); }, 2700);
  };

  return (
    <div className="space-y-10 max-w-5xl mx-auto pb-16">
      {/* 🎯 OBJECTIVE BANNER */}
      <section className="rounded-2xl border border-sky-200 dark:border-sky-500/30 bg-sky-50/60 dark:bg-sky-500/5 p-4 sm:p-6 shadow-sm">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-sky-600 text-white shrink-0 shadow-sm mt-0.5"><Target className="w-5 h-5" /></div>
          <div className="space-y-2 flex-1">
            <h2 className="text-sm font-mono uppercase tracking-wider text-sky-800 dark:text-sky-400 font-bold">🎯 By the end of this module, you will:</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              {[
                "Build a stateful multi-turn LangGraph chatbot using MessagesState and MemorySaver",
                "Use thread_id to isolate conversations — preventing cross-user context leakage",
                "Understand how the add_messages reducer auto-accumulates conversation history",
                "Swap MemorySaver for PostgresSaver for production multi-server deployments",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: 4 CHATBOT CONCEPTS */}
      <section className="space-y-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/30 text-sky-700 dark:text-sky-300 text-xs font-mono font-semibold mb-2">
            <Bot className="w-3.5 h-3.5" /><span>Stateful Chatbots • LangGraph Checkpointing</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Building a Chatbot Agent in LangGraph</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Most tutorials show stateless single-shot agents. Real chatbots need 4 layers: a checkpointer to persist state, a thread_id to isolate users, an add_messages reducer to accumulate history, and a production backend that survives server restarts.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {concepts.map((concept) => {
            const Icon = concept.icon;
            const isSelected = selectedConcept === concept.id;
            return (
              <button key={concept.id} onClick={() => setSelectedConcept(concept.id)}
                className={`p-3.5 sm:p-4 rounded-xl border text-left transition-all flex flex-col justify-between min-h-[145px] sm:min-h-[160px] active:scale-95 cursor-pointer ${isSelected ? "border-sky-500 bg-white dark:bg-slate-900 shadow-md ring-2 ring-sky-500/20" : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700"}`}>
                <div className="space-y-2">
                  <div className={`inline-flex p-1.5 rounded-lg ${concept.bg} border ${concept.border}`}><Icon className={`w-4 h-4 ${concept.color}`} /></div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">{concept.title}</div>
                    <div className={`text-[10px] font-mono ${concept.color} mt-0.5`}>{concept.tagline}</div>
                  </div>
                </div>
                <p className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-2">{concept.desc}</p>
              </button>
            );
          })}
        </div>

        {/* CODE INSPECTOR */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`inline-flex p-1.5 rounded-lg ${currentConcept.bg} border ${currentConcept.border}`}><currentConcept.icon className={`w-4 h-4 ${currentConcept.color}`} /></div>
              <span className="text-xs font-bold text-slate-900 dark:text-white">{currentConcept.title}: {currentConcept.tagline}</span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${currentConcept.bg} ${currentConcept.color} border ${currentConcept.border}`}>{currentConcept.badge}</span>
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
                    {tab === "code" ? "Python Code" : "Chat Output"}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                {simStep > 0 && <button onClick={() => { setSimStep(0); setActiveCodeTab("code"); }} className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 cursor-pointer"><RotateCcw className="w-3 h-3" /> Reset</button>}
                <button onClick={handleRunSimulation} disabled={isSimulating}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-sky-600 hover:bg-sky-500 text-white text-xs font-mono disabled:opacity-50 cursor-pointer">
                  <Play className="w-3 h-3" />{isSimulating ? "Chatting..." : "Run"}
                </button>
              </div>
            </div>
            <div className="p-4 min-h-[140px] font-mono text-xs">
              {activeCodeTab === "code" ? (
                <pre className="text-slate-300 whitespace-pre-wrap leading-relaxed">{currentConcept.codeSnippet}</pre>
              ) : (
                <div className="space-y-2 text-slate-300">
                  {simStep === 0 && <div className="text-slate-500 italic">Click &apos;Run&apos; to simulate a multi-turn conversation...</div>}
                  {simStep >= 1 && <div className="text-sky-400">➜ [TURN 1] thread_id=&quot;user_alice_42&quot;<br /><span className="text-slate-400">User: &quot;Hi! My name is Alice.&quot;</span></div>}
                  {simStep >= 2 && <div className="text-slate-400 pl-4">[CHECKPOINTER] State saved: {"{"} messages: [HumanMsg, AIMsg] {"}"}<br /><span className="text-emerald-400">Agent: &quot;Hi Alice! Nice to meet you. How can I help?&quot;</span></div>}
                  {simStep >= 3 && <div className="text-sky-400">➜ [TURN 2] thread_id=&quot;user_alice_42&quot; (same session)<br /><span className="text-slate-400">User: &quot;What&apos;s my name?&quot;</span></div>}
                  {simStep >= 4 && <div className="text-emerald-400 font-bold pt-2 border-t border-slate-800">
                    ✔ Agent: &quot;Your name is Alice!&quot;<br />
                    <span className="text-slate-400 font-normal text-[10px]">History persisted across turns via MemorySaver — add_messages reducer appended messages automatically.</span>
                  </div>}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: STATELESS VS STATEFUL */}
      <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">🧠 Mental Model: Stateless vs. Stateful Chatbot</h3>
        </div>
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-2">
            <div className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">❌ Stateless Agent (No Checkpointer)</div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">Like talking to someone with severe anterograde amnesia — every message is a fresh start. You say &quot;My name is Alice&quot; and on the very next turn they say &quot;Nice to meet you, I don&apos;t know your name.&quot;</p>
          </div>
          <div className="p-4 rounded-xl border border-sky-200 dark:border-sky-500/30 bg-sky-50 dark:bg-sky-500/10 space-y-2">
            <div className="text-xs font-mono font-bold text-sky-700 dark:text-sky-400">✅ Stateful Agent (With Checkpointer)</div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">Like a trusted personal assistant who takes notes during every conversation. They remember your name, preferences, and prior decisions across multiple sessions — even after the server restarts.</p>
          </div>
        </div>
      </section>

      {/* SECTION 3: CHATBOT STUDIO */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">🔬 LangGraph Chatbot Studio</h3>
        <LangGraphChatbotStudio />
      </section>

      {/* SECTION 4: NOTES */}
      <section className="space-y-3">
        <div className="p-4 rounded-xl border border-amber-300 dark:border-amber-500/30 bg-amber-50/90 dark:bg-amber-500/10 shadow-sm">
          <span className="font-['Caveat',cursive] text-base text-amber-950 dark:text-amber-200 block">✍️ Instructor Note: &quot;Never use MemorySaver in production with multiple server instances! Each server process has its own RAM-based checkpointer, so user A&apos;s conversation on Server 1 is invisible to Server 2. Always use PostgresSaver or RedisSaver behind a load balancer.&quot;</span>
        </div>
        <div className="p-4 rounded-xl border border-teal-200 dark:border-teal-500/30 bg-teal-50/90 dark:bg-teal-500/10 shadow-sm">
          <span className="font-['Caveat',cursive] text-base text-teal-950 dark:text-teal-200 block">💡 Mental Model: thread_id is like a hotel room key. Every guest (user) gets their own key (thread_id). Inserting your key opens only your room (conversation namespace) — never another guest&apos;s. The front desk (checkpointer) keeps all rooms&apos; states on file.</span>
        </div>
        <div className="p-4 rounded-xl border border-sky-200 dark:border-sky-500/30 bg-sky-50/90 dark:bg-sky-500/10 shadow-sm">
          <span className="font-['Caveat',cursive] text-base text-sky-950 dark:text-sky-200 block">📌 Core Rule: Long conversations blow up your context window and cost. Implement a rolling window trim strategy: keep the last N messages or M tokens. Use a summarization node that compresses old history into a single summary message before it gets trimmed.</span>
        </div>
      </section>

      {/* SECTION 5: TRAPS */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-500" /><span>Stateful Chatbot Traps</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-500/30 bg-rose-50/50 dark:bg-rose-500/5 space-y-2">
            <span className="text-xs font-mono font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider block">TRAP #1: Overwriting History Without add_messages</span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">If your state field is just <code>messages: list</code> without the Annotated[list, add_messages] reducer, each node update REPLACES the entire list. Turn 2 erases Turn 1. Always use the add_messages reducer for conversational state.</p>
          </div>
          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-500/5 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">TRAP #2: Infinite Context Growth</span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">Without a trim strategy, a chatbot&apos;s message list grows indefinitely. After 100 turns, you&apos;re sending 50,000+ tokens on every request — hitting context limits and spending $0.30+ per user message. Implement token-aware trimming from day one.</p>
          </div>
        </div>
      </section>

      {/* SECTION 6: KEY TAKEAWAYS */}
      <section className="rounded-xl border border-sky-200 dark:border-sky-500/30 bg-sky-50/50 dark:bg-sky-500/5 p-5 space-y-3">
        <h4 className="font-bold text-sm text-sky-900 dark:text-sky-300 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-sky-600 dark:text-sky-400" /><span>Key Takeaways</span>
        </h4>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          {[
            ["1.", "Checkpointer + thread_id = Memory:", "These two components together are all you need for a stateful multi-turn chatbot. Checkpointer stores state; thread_id routes each user to their own namespace."],
            ["2.", "add_messages Reducer is Critical:", "Without Annotated[list, add_messages] on your messages field, node updates silently erase conversation history. This is the #1 mistake beginners make with LangGraph chatbots."],
            ["3.", "MemorySaver → PostgresSaver Before Launch:", "MemorySaver is fine for local development and testing. The moment you deploy to more than one server, switch to a shared persistence backend or users will randomly lose their conversation history."],
          ].map(([n, bold, rest]) => (
            <li key={n} className="flex items-start gap-2">
              <span className="text-sky-600 dark:text-sky-400 font-bold">{n}</span>
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
            <div className="p-2 rounded-lg bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400"><HelpCircle className="w-5 h-5" /></div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">Concept Check: LangGraph Chatbots</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">{showQuiz ? "Click to collapse" : "Test your stateful chatbot intuition (3 questions)"}</p>
            </div>
          </div>
          <span className="text-xs font-mono font-semibold px-3 py-1.5 rounded-lg bg-sky-50 dark:bg-sky-500/10 text-sky-700 dark:text-sky-400 border border-sky-200 dark:border-sky-500/30">
            {showQuiz ? "Hide Quiz" : "Start Quiz"}
          </span>
        </button>
        <AnimatePresence>
          {showQuiz && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }}>
              <Module2_11Quiz />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* NEXT MODULE BRIDGE */}
      <section className="rounded-2xl border border-sky-200 dark:border-sky-500/30 bg-gradient-to-r from-sky-50 via-white to-slate-50 dark:from-sky-500/10 dark:via-slate-900 dark:to-slate-950 p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <div className="text-xs font-mono font-bold text-sky-700 dark:text-sky-400 uppercase tracking-wider">Up Next • Module 2.12</div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Implementing Streaming Output for Real-Time Responses</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">Stream tokens as they&apos;re generated to slash perceived latency — delivering the ChatGPT-like typing experience your users expect.</p>
        </div>
        <Link href="/learn/level-2/module-2-12" className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs sm:text-sm shadow-sm transition-all shrink-0 cursor-pointer">
          <span>Continue to Module 2.12</span><ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
