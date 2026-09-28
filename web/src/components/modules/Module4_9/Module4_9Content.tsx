"use client";
import React from "react";
import { FileText, Code2, Sparkles, Lightbulb, CheckCircle2 } from "lucide-react";
import PromptOptimizerLab from "./PromptOptimizerLab";
import Module4_9Quiz from "./Module4_9Quiz";

export default function Module4_9Content() {
  return (
    <div className="space-y-10">
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-orange-500/10 via-amber-500/5 to-slate-50 dark:to-slate-950 p-6 md:p-8">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-orange-500/20 text-orange-700 dark:text-orange-300 border border-orange-500/30">Module 4.9 • Production, Scaling & Optimization</span>
            <span className="text-xs font-mono text-slate-500">~33 min</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Optimizing Prompts and Tool Selection</h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            When your agent picks the wrong tool or stops too early, the first instinct is to blame the LLM. <strong>90% of the time, it&apos;s the prompt.</strong> The LLM is only as good as the instructions you gave it — and most production agents run on prompts that were written in 10 minutes and never revisited. This module shows you how to write prompts that produce predictably excellent behavior.
          </p>
        </div>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2"><FileText className="w-5 h-5 text-orange-500" />1. The 4 Sections of a Production System Prompt</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { section: "Background & Role", example: "You are a financial research assistant specializing in equity analysis.", why: "Frames the LLM's knowledge domain and tone. Without this, responses are generic." },
            { section: "Behavioral Instructions", example: "Keep going until the task is COMPLETELY resolved. Never stop after one tool call if the task requires multiple steps.", why: "This 'persistence' instruction alone reduces premature stopping by ~20% (from the slides)." },
            { section: "Tool Selection Criteria", example: "Use live_price() for real-time quotes ONLY. Use web_search() for news and opinions. Never use web_search() for price data.", why: "Explicit decision rules eliminate the ambiguity that causes wrong tool selection." },
            { section: "Output Format", example: "Always end with: { \"answer\": \"...\", \"sources\": [...], \"confidence\": \"high|medium|low\" }", why: "Structured output makes downstream processing reliable. Without it, response format varies." },
          ].map((item) => (
            <div key={item.section} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
              <h3 className="text-sm font-bold text-orange-700 dark:text-orange-400">{item.section}</h3>
              <pre className="text-[10px] font-mono text-slate-500 dark:text-slate-500 bg-slate-950/50 rounded p-2 overflow-x-auto whitespace-pre-wrap">{item.example}</pre>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed"><strong>Why it matters:</strong> {item.why}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2"><Code2 className="w-5 h-5 text-teal-500" />2. Reasoning Models vs Standard Models — When to Switch</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-900/40 bg-blue-50 dark:bg-blue-950/20 space-y-2">
            <h3 className="text-sm font-bold text-blue-700 dark:text-blue-400">Standard Models (GPT-4o, Claude Sonnet)</h3>
            <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1.5 leading-relaxed">
              <li>✅ General queries and conversation</li>
              <li>✅ Simple tool calls and data retrieval</li>
              <li>✅ Low latency responses needed</li>
              <li>✅ Structured output with clear format</li>
              <li>⚡ Fast, cheap, ideal for high-volume tasks</li>
            </ul>
          </div>
          <div className="p-4 rounded-xl border border-purple-200 dark:border-purple-900/40 bg-purple-50 dark:bg-purple-950/20 space-y-2">
            <h3 className="text-sm font-bold text-purple-700 dark:text-purple-400">Reasoning Models (o1, o3, Claude Extended Thinking)</h3>
            <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1.5 leading-relaxed">
              <li>✅ Multi-step mathematical reasoning</li>
              <li>✅ Code debugging with subtle logic errors</li>
              <li>✅ Complex planning with many constraints</li>
              <li>⚠️ Few-shot examples may cause over-rigid behavior</li>
              <li>💰 Higher cost — use only when complexity demands it</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2"><Sparkles className="w-5 h-5 text-orange-500" />3. Prompt Optimizer Lab</h2>
          <span className="text-xs font-mono text-slate-500">Before vs After</span>
        </div>
        <PromptOptimizerLab />
      </section>

      <div className="p-4 rounded-xl border border-orange-200 dark:border-orange-900/40 bg-orange-50 dark:bg-orange-950/20 space-y-2">
        <div className="flex items-center gap-2 text-orange-800 dark:text-orange-300 font-semibold text-sm"><Lightbulb className="w-4 h-4 shrink-0" />The Prompt Testing Trap: 2-3 Queries Is Not a Test</div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          The slides call out a real pattern: &ldquo;Developer tweaks prompt, runs 2-3 queries, declares it better, deploys. Two weeks later, 15% of queries break.&rdquo; Build a golden dataset of 20–50 representative queries including edge cases. Run every prompt change against that dataset. This isn&apos;t optional — it&apos;s the difference between prompt engineering and prompt guessing.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500" />Key Takeaways</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { title: "3 Critical Reminders", body: "Persistence ('keep going'), Tool Planning ('think before calling'), Output Format ('always return JSON'). These 3 lines consistently improve agent reliability." },
            { title: "Tool Descriptions = Agent Instructions", body: "The agent reads your tool docstrings. Vague docstrings → wrong tool selection. Add explicit when-to-use and when-NOT-to-use criteria." },
            { title: "Golden Dataset is Your Test Suite", body: "Never deploy a prompt change without running it against 20+ representative test cases. Version every prompt like you version code." },
          ].map((item) => (
            <div key={item.title} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
              <h3 className="text-xs font-bold text-orange-700 dark:text-orange-400">{item.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="space-y-4"><Module4_9Quiz /></section>
    </div>
  );
}
