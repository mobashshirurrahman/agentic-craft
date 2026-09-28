"use client";
import React from "react";
import { Layers, Code2, Sparkles, Lightbulb, CheckCircle2, AlertTriangle } from "lucide-react";
import ContextWindowManager from "./ContextWindowManager";
import Module4_10Quiz from "./Module4_10Quiz";

export default function Module4_10Content() {
  return (
    <div className="space-y-10">
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-cyan-500/10 via-teal-500/5 to-slate-50 dark:to-slate-950 p-6 md:p-8">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30">Module 4.10 • Production, Scaling & Optimization</span>
            <span className="text-xs font-mono text-slate-500">~36 min</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Managing Context Windows Effectively</h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            &ldquo;Our model supports 200K tokens — just dump everything in!&rdquo; Every engineer has said this at some point. Then the quality starts degrading mysteriously. Then costs spike. Then the model starts <em>losing things in the middle</em> of the conversation. The context window is not a bucket — it&apos;s more like human working memory: <strong>the more you fill it, the less attention goes to what actually matters.</strong>
          </p>
        </div>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-amber-500" />1. The Two Limits — Hard and Soft</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-950/20 space-y-2">
            <h3 className="text-sm font-bold text-red-700 dark:text-red-400">Hard Limit — The Technical Cap</h3>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">Exceeding the context limit causes errors or automatic truncation. Easy to monitor with token counting. Obvious when hit.</p>
            <p className="text-xs font-mono text-red-500 dark:text-red-400">GPT-4o: 128K tokens | Claude 3.5: 200K | Gemini 1.5: 1M</p>
          </div>
          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-900/40 bg-amber-50 dark:bg-amber-950/20 space-y-2">
            <h3 className="text-sm font-bold text-amber-700 dark:text-amber-400">Soft Limit — The Performance Cliff</h3>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">LLM quality degrades <em>before</em> you hit the hard limit. The &ldquo;Lost in the Middle&rdquo; effect: information at the middle of a long context gets less attention than content at the beginning and end.</p>
            <p className="text-xs font-mono text-amber-600 dark:text-amber-400">Research: quality drops noticeably at ~40% of max context</p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2"><Layers className="w-5 h-5 text-cyan-500" />2. The 5 Pruning Strategies</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800">
                {["Strategy", "How", "Best For", "Tradeoff"].map((h) => (
                  <th key={h} className="p-3 font-mono font-bold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["✂️ Simple Truncation", "Keep last N messages", "Short-context tasks", "May cut critical context"],
                ["🔢 Token-Aware", "Keep messages within exact token budget", "Precise control", "Requires token counting per model"],
                ["🗑️ Selective Deletion", "Remove stale/off-topic messages by ID", "Topic-shift conversations", "Needs importance scoring logic"],
                ["📝 Summarization", "Compress old turns into 1–2 sentences", "Long multi-topic conversations", "Adds 1 LLM call per summary"],
                ["⭐ Importance Scoring", "Score each message, keep top-K", "Complex conversations", "Most sophisticated to implement"],
              ].map(([s, h, b, t], i) => (
                <tr key={i} className="border-b border-slate-200 dark:border-slate-800">
                  <td className="p-3 font-semibold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">{s}</td>
                  <td className="p-3 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">{h}</td>
                  <td className="p-3 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">{b}</td>
                  <td className="p-3 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">{t}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2"><Code2 className="w-5 h-5 text-teal-500" />3. LangGraph Context Management Code</h2>
        <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs border border-slate-800 overflow-x-auto">
          <pre>{`from langchain_core.messages import trim_messages, RemoveMessage
from langgraph.graph import StateGraph, MessagesState

# ── Strategy 1: Token-Aware Trimming ─────────────
def manage_context_node(state: MessagesState):
    trimmed = trim_messages(
        state["messages"],
        max_tokens=4096,             # hard token budget
        strategy="last",             # keep most recent messages
        token_counter=llm,           # uses actual model tokenizer
        include_system=True,         # always keep system prompt
        allow_partial=False,         # never cut a message mid-way
    )
    return {"messages": trimmed}

# ── Strategy 2: Summarize Old Messages ────────────
def summarize_old_messages(state: MessagesState):
    messages = state["messages"]
    if len(messages) > 20:          # trigger when history gets long
        # Summarize everything except last 4 messages
        old_messages = messages[:-4]
        summary = llm.invoke(
            f"Summarize this conversation history in 2 sentences:\\n\\n"
            + "\\n".join(f"{m.role}: {m.content}" for m in old_messages)
        )
        # Remove old messages and prepend summary
        delete_messages = [RemoveMessage(id=m.id) for m in old_messages]
        return {
            "messages": delete_messages + [
                SystemMessage(content=f"[Earlier conversation summary: {summary.content}]"),
                *messages[-4:]
            ]
        }
    return {}  # No pruning needed

# ── Strategy 3: Selective Deletion ────────────────
def selective_delete(state: MessagesState):
    to_delete = [
        RemoveMessage(id=m.id)
        for m in state["messages"]
        if hasattr(m, "name") and m.name == "completed_subtask"
    ]
    return {"messages": to_delete}`}</pre>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2"><Sparkles className="w-5 h-5 text-cyan-500" />4. Interactive Context Window Manager</h2>
          <span className="text-xs font-mono text-slate-500">4 Strategies Live</span>
        </div>
        <ContextWindowManager />
      </section>

      <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-900/40 bg-amber-50 dark:bg-amber-950/20 space-y-2">
        <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-semibold text-sm"><AlertTriangle className="w-4 h-4 shrink-0" />The Biggest Context Management Mistake</div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Trusting that a large context window means good performance at large context sizes. It doesn&apos;t. GPT-4 Turbo was advertised as 128K tokens, but OpenAI&apos;s own research showed performance degrading meaningfully past 16K. Design your context management strategy for <em>quality</em>, not <em>technical limits</em>. If you wouldn&apos;t hand a human a 400-page document to answer a 1-sentence question, don&apos;t do it to your LLM either.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500" />Key Takeaways</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { title: "Soft Limit > Hard Limit", body: "Performance degrades long before you hit the technical limit. Manage context for quality, not just to avoid errors." },
            { title: "Use Token Counting, Not Message Counting", body: "Messages vary wildly in length. Token-aware pruning uses the actual tokenizer to stay within exact model budgets." },
            { title: "Summarization = Memory Compression", body: "When conversation history gets long, compress old turns into a 2-sentence summary. The agent keeps the semantic meaning without the token cost." },
          ].map((item) => (
            <div key={item.title} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
              <h3 className="text-xs font-bold text-cyan-700 dark:text-cyan-400">{item.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="space-y-4"><Module4_10Quiz /></section>
    </div>
  );
}
