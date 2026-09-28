"use client";

import React from "react";
import {
  MessageSquare,
  Sparkles,
  ArrowRight,
  Code2,
  Database,
  Bot,
  CheckCircle2,
} from "lucide-react";
import LangGraphChatbotStudio from "./LangGraphChatbotStudio";
import Module2_11Quiz from "./Module2_11Quiz";

export default function Module2_11Content() {
  return (
    <div className="space-y-10">
      {/* Hero Banner */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-sky-500/10 via-teal-500/5 to-slate-50 dark:to-slate-950 p-6 md:p-8 relative overflow-hidden transition-colors">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-sky-500/20 text-sky-700 dark:text-sky-300 border border-sky-500/30">
              Module 2.11 • Core Implementation
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              ~15 min hands-on
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Building a Chatbot Agent in LangGraph
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Most tutorials show stateless single-shot agents. In this lesson, we build a true <strong>stateful multi-turn conversational agent</strong> in LangGraph using checkpointers and thread IDs.
          </p>
        </div>
      </div>

      {/* Section 1: MemorySaver & thread_id */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Database className="w-5 h-5 text-sky-500" />
          1. Checkpointers & Thread IDs
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
            <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 uppercase">
              1. The Checkpointer
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Persists state snapshots after every graph step. Use <code className="font-mono text-slate-800 dark:text-slate-200">MemorySaver()</code> for local testing, or Postgres/Redis checkpointers in production.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
            <span className="text-xs font-mono font-bold text-teal-600 dark:text-teal-400 uppercase">
              2. The thread_id
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Passed via <code className="font-mono text-slate-800 dark:text-slate-200">{`config={"configurable": {"thread_id": "user_42"}}`}</code>. Ensures conversations remain completely isolated without cross-user leakage.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Code Walkthrough */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Code2 className="w-5 h-5 text-teal-500" />
          2. Complete Chatbot Graph in Python
        </h2>
        <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs border border-slate-800 overflow-x-auto">
          <pre>{`from langgraph.graph import StateGraph, START, MessagesState
from langgraph.checkpoint.memory import MemorySaver
from langchain_openai import ChatOpenAI

model = ChatOpenAI(model="gpt-4o-mini")

def chatbot_node(state: MessagesState):
    return {"messages": [model.invoke(state["messages"])]}

# 1. Build and compile with checkpointer
builder = StateGraph(MessagesState)
builder.add_node("chatbot", chatbot_node)
builder.add_edge(START, "chatbot")

memory = MemorySaver()
app = builder.compile(checkpointer=memory)

# 2. Invoke with thread_id for conversation persistence
config = {"configurable": {"thread_id": "session_101"}}
app.invoke({"messages": [("user", "My name is Alice.")]}, config)

# Follow-up turn remembers past state automatically!
reply = app.invoke({"messages": [("user", "What is my name?")]}, config)
print(reply["messages"][-1].content)  # "Your name is Alice."`}</pre>
        </div>
      </section>

      {/* Interactive Chatbot Studio */}
      <section className="space-y-4">
        <LangGraphChatbotStudio />
      </section>

      {/* Quiz */}
      <section className="space-y-4">
        <Module2_11Quiz />
      </section>

      {/* Next Step Callout */}
      <div className="p-4 rounded-xl border border-sky-500/30 bg-sky-500/10 text-xs font-mono text-slate-700 dark:text-slate-300 flex items-center justify-between">
        <span>Up Next: Module 2.12 — Implementing Streaming Output for Real-Time Responses</span>
        <ArrowRight className="w-4 h-4 text-sky-500" />
      </div>
    </div>
  );
}
