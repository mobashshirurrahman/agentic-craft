"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  BookOpen,
  Brain,
  Wrench,
  Database,
  Layers,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Copy,
  Check,
  ArrowRight,
  Code2,
  Cpu,
  Terminal,
  Zap,
  Clock,
  ShieldCheck,
  FileCode,
  Compass,
} from "lucide-react";
import EvolutionComparisonVisualizer from "./EvolutionComparisonVisualizer";
import Module1_2CodeExecutor from "./Module1_2CodeExecutor";
import Module1_2Quiz from "./Module1_2Quiz";

export default function Module1_2Content() {
  const [copiedContextSnippet, setCopiedContextSnippet] = useState(false);

  const contextEngineeringSnippet = `# Production Context Engineering for a Customer Service AI Agent
context = f"""
[ROLE & PERSONA]
You are a helpful customer service agent for TechCorp.

[CUSTOMER INFORMATION]
- Name: {customer.name}
- Account Type: {customer.account_type}
- Recent Orders: {format_orders(customer.recent_orders)}

[CONVERSATION HISTORY]
{format_conversation_history(conversation_history)}

[COMPANY POLICIES & CONSTRAINTS]
- Return window: 30 days from delivery
- Shipping: Free for orders over $50
- SLA: All issues must be acknowledged within 24 hours

[AVAILABLE TOOLS]
1. check_order_status(order_id)
2. process_refund(order_id, reason)
3. escalate_to_human(issue_summary)

[CURRENT USER QUERY]
{query}
"""`;

  const handleCopyContext = () => {
    navigator.clipboard.writeText(contextEngineeringSnippet);
    setCopiedContextSnippet(true);
    setTimeout(() => setCopiedContextSnippet(false), 2000);
  };

  return (
    <div className="space-y-12">
      {/* Friendly Tutor Introduction */}
      <section className="rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/80 to-slate-950/80 p-6 md:p-8 backdrop-blur-sm relative overflow-hidden shadow-xl">
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <div className="p-3 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-teal-400 shrink-0">
            <Compass className="w-6 h-6" />
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400">
                Core Architectural Lesson
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs font-mono text-slate-400">
                Foundations &amp; Evolution
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Hello and welcome! In this lesson, we will master the evolution from Prompts to Chains and Autonomous Agents.
            </h2>

            <p className="text-sm md:text-base text-slate-300 leading-relaxed">
              When building with LLMs, one of the most common mistakes engineering teams make is
              <strong className="text-amber-300"> jumping straight to autonomous agents</strong> when a simple deterministic chain or prompt would work better, faster, and cheaper.
            </p>

            <p className="text-sm md:text-base text-slate-300 leading-relaxed">
              In this module, we will explore the 4 evolutionary paradigms of LLM applications, understand the architectural trade-offs between prompt chains and autonomous loops, and master <strong>Context Engineering</strong>—the discipline that makes agents reliable in production.
            </p>
          </div>
        </div>
      </section>

      {/* Part 1: The 4-Stage Evolution */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 font-mono text-xs font-bold">
            Part 1 • The Evolutionary Ladder
          </span>
          <div className="h-px bg-slate-800 flex-1" />
        </div>

        <div className="space-y-3">
          <h3 className="text-2xl font-extrabold text-white tracking-tight">
            How LLM Systems Evolved: 4 Key Paradigms
          </h3>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Every step up this evolutionary ladder provides greater control over model behavior and allows systems to handle increasingly complex real-world tasks.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Stage 1: Prompt Engineering */}
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/50 space-y-3 hover:border-slate-700 transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                Stage 1
              </span>
              <span className="text-xs font-mono text-slate-500">Single Input ➔ Single Output</span>
            </div>
            <h4 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              Prompt Engineering
            </h4>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Crafting instructions to guide LLM outputs for a specific task using a single API call.
            </p>
            <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-850 text-slate-400 space-y-1">
              <div><strong className="text-slate-200">Simple:</strong> &quot;Summarize this article in 3 bullets.&quot;</div>
              <div><strong className="text-slate-200">Complex:</strong> Multiple constraints, persona, negative keywords, and exact JSON output schema.</div>
            </div>
          </div>

          {/* Stage 2: Chain of Thought */}
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/50 space-y-3 hover:border-slate-700 transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-sky-400 px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/20">
                Stage 2
              </span>
              <span className="text-xs font-mono text-slate-500">Internal Deliberation</span>
            </div>
            <h4 className="text-lg font-bold text-white flex items-center gap-2">
              <Brain className="w-4 h-4 text-sky-400" />
              Chain of Thought (CoT)
            </h4>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Induces the model to output intermediate reasoning steps before delivering the final answer.
            </p>
            <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-850 text-slate-400 space-y-1">
              <div><strong className="text-slate-200">Technique:</strong> &quot;Think step by step before answering...&quot;</div>
              <div className="text-sky-300/80">Now integrated natively into modern frontier reasoning models (&apos;thinking mode&apos;).</div>
            </div>
          </div>

          {/* Stage 3: Chains / Prompt Chaining */}
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/50 space-y-3 hover:border-slate-700 transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-violet-400 px-2 py-0.5 rounded bg-violet-500/10 border border-violet-500/20">
                Stage 3
              </span>
              <span className="text-xs font-mono text-slate-500">Sequential Pipeline</span>
            </div>
            <h4 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-violet-400" />
              Chains (Prompt Chaining)
            </h4>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              A fixed sequence of LLM invocations and programmatic transformations where Output A feeds Input B.
            </p>
            <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-850 text-slate-400 space-y-1">
              <div><strong className="text-slate-200">Nature:</strong> Linear and deterministic.</div>
              <div><strong className="text-slate-200">Classic Example:</strong> RAG (Retrieve documents ➔ Format context ➔ Generate response).</div>
            </div>
          </div>

          {/* Stage 4: AI Agents */}
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/50 space-y-3 hover:border-slate-700 transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                Stage 4
              </span>
              <span className="text-xs font-mono text-slate-500">Autonomous Feedback Loop</span>
            </div>
            <h4 className="text-lg font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              Autonomous AI Agents
            </h4>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              The model actively evaluates state, chooses external tools, executes actions, and loops until the goal is satisfied.
            </p>
            <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-850 text-slate-400 space-y-1">
              <div><strong className="text-slate-200">Key Feature:</strong> Dynamic decision-making with self-correction loops.</div>
              <div><strong className="text-slate-200">Tool Use:</strong> Read and write access to APIs, databases, and environments.</div>
            </div>
          </div>
        </div>

        {/* Real-World Case: The Content Writing Evolution */}
        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/30 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400">
              Comparative Walkthrough
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400">Case Study: Generating a Technical Blog Post</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            {/* Approach A */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-850 space-y-2">
              <div className="flex items-center justify-between text-slate-500 font-mono text-[10px]">
                <span>Approach 1</span>
                <span className="text-emerald-400">Prompt Only</span>
              </div>
              <h5 className="font-bold text-white text-sm">Single Prompt</h5>
              <p className="text-slate-400">
                &quot;Write a blog post about machine learning.&quot; ➔ LLM generates the entire article in one single pass.
              </p>
              <div className="text-[11px] text-slate-500 font-mono pt-2 border-t border-slate-900">
                Outcome: Fast, but generic; cannot verify citations or structure beforehand.
              </div>
            </div>

            {/* Approach B */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-850 space-y-2">
              <div className="flex items-center justify-between text-slate-500 font-mono text-[10px]">
                <span>Approach 2</span>
                <span className="text-violet-400">Prompt Chain</span>
              </div>
              <h5 className="font-bold text-white text-sm">Prompt Chaining</h5>
              <p className="text-slate-400">
                Step 1: &quot;Generate outline&quot; ➔ Output: Outline.
                <br />
                Step 2: &quot;Based on this outline, write the blog post.&quot; ➔ Finished Post.
              </p>
              <div className="text-[11px] text-slate-500 font-mono pt-2 border-t border-slate-900">
                Outcome: High quality, structured, predictable cost, zero loop overhead.
              </div>
            </div>

            {/* Approach C */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-850 space-y-2">
              <div className="flex items-center justify-between text-slate-500 font-mono text-[10px]">
                <span>Approach 3</span>
                <span className="text-amber-400">AI Agent</span>
              </div>
              <h5 className="font-bold text-white text-sm">Autonomous Agent</h5>
              <p className="text-slate-400">
                Goal: &quot;Publish top-tier ML post&quot; ➔ Loops dynamically: Researches web ➔ Outlines ➔ Drafts sections ➔ Tests code snippets ➔ Refines weak parts ➔ Publishes.
              </p>
              <div className="text-[11px] text-slate-500 font-mono pt-2 border-t border-slate-900">
                Outcome: Deepest quality, self-healing, but higher latency and variable token cost.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Part 2: Interactive Decision Matrix */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 font-mono text-xs font-bold">
            Part 2 • Interactive Comparison
          </span>
          <div className="h-px bg-slate-800 flex-1" />
        </div>

        <EvolutionComparisonVisualizer />

        {/* Feature Comparison Table */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden">
          <div className="p-4 border-b border-slate-800 bg-slate-900/50">
            <h4 className="text-sm font-bold text-white">
              Direct Feature Comparison Matrix
            </h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/80 text-slate-400 font-mono text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="p-3.5 border-b border-slate-800">Feature</th>
                  <th className="p-3.5 border-b border-slate-800 text-emerald-400">Prompt Engineering</th>
                  <th className="p-3.5 border-b border-slate-800 text-violet-400">Prompt Chains</th>
                  <th className="p-3.5 border-b border-slate-800 text-amber-400">AI Agents</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850 font-mono">
                <tr>
                  <td className="p-3.5 font-bold text-white">Interaction</td>
                  <td className="p-3.5">Single Call</td>
                  <td className="p-3.5">Sequential Pipeline</td>
                  <td className="p-3.5">Dynamic Feedback Loop</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-white">Decision Making</td>
                  <td className="p-3.5">Predefined</td>
                  <td className="p-3.5">Hardcoded in Code</td>
                  <td className="p-3.5 text-amber-300 font-semibold">LLM-Driven Runtime Choice</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-white">Tool Use</td>
                  <td className="p-3.5 text-slate-500">None</td>
                  <td className="p-3.5">Limited (Pre-wired)</td>
                  <td className="p-3.5 text-teal-400 font-semibold">Extensive (Dynamic selection)</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-white">Iteration / Loops</td>
                  <td className="p-3.5 text-slate-500">No</td>
                  <td className="p-3.5 text-slate-500">No (Linear)</td>
                  <td className="p-3.5 text-amber-300 font-semibold">Yes (Adaptive retry &amp; reflect)</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-white">Cost &amp; Latency</td>
                  <td className="p-3.5 text-emerald-400 font-bold">Lowest ($)</td>
                  <td className="p-3.5 text-violet-300 font-medium">Predictable ($$)</td>
                  <td className="p-3.5 text-amber-400 font-medium">Variable ($$$ to $$$$)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Part 3: The Golden Rule & The Common Pitfall */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 font-mono text-xs font-bold">
            Part 3 • The Golden Architectural Rule
          </span>
          <div className="h-px bg-slate-800 flex-1" />
        </div>

        {/* Warning Callout Card */}
        <div className="p-6 rounded-2xl border border-amber-500/30 bg-amber-500/5 relative overflow-hidden space-y-4">
          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-300 shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                Common Production Pitfall: Jumping Straight to Agents
              </span>
              <h3 className="text-lg md:text-xl font-bold text-white">
                Never build an autonomous agent when a simple chain suffices.
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Autonomous agents add <strong className="text-white">latency</strong>, <strong className="text-white">token cost</strong>, and <strong className="text-white">unpredictability</strong>. When an agent enters a self-directed loop, it might take 1 loop or 8 loops, drastically changing the user response time and API bill.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-amber-500/20 text-xs md:text-sm font-mono text-slate-300">
            <span className="text-teal-400 font-bold block mb-1">💡 The Golden Heuristic Question:</span>
            &quot;Do I actually need the LLM to make runtime decisions about what to do next, or do I just need multiple steps?
            <br />
            <strong className="text-emerald-400">If the steps are known upfront ➔ USE A CHAIN.</strong>
            <br />
            <strong className="text-amber-400">If the sequence of actions depends unpredictably on external feedback ➔ USE AN AGENT.&quot;</strong>
          </div>
        </div>

        {/* Decision Criteria Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <span className="text-xs font-mono font-bold text-emerald-400">Choose Prompts When:</span>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
              <li>Task is simple &amp; self-contained</li>
              <li>A single LLM call is sufficient</li>
              <li>No external live data or tools needed</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <span className="text-xs font-mono font-bold text-violet-400">Choose Chains When:</span>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
              <li>Task requires multiple sequential stages</li>
              <li>The workflow steps are fixed &amp; predictable</li>
              <li>Combining RAG retrieval with synthesis</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-400">Choose Agents When:</span>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
              <li>Unknown number of steps required</li>
              <li>Multiple tools or APIs must be dynamically orchestrated</li>
              <li>Task requires self-correction and validation</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Part 4: Context Engineering */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 font-mono text-xs font-bold">
            Part 4 • Context Engineering
          </span>
          <div className="h-px bg-slate-800 flex-1" />
        </div>

        <div className="space-y-3">
          <h3 className="text-2xl font-extrabold text-white tracking-tight">
            Context Engineering: The Heart of Agent Reliability
          </h3>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            While <strong className="text-slate-100">prompt engineering</strong> focuses on crafting the right words, <strong className="text-teal-400">context engineering</strong> is the engineering practice of systematically organizing, filtering, and updating all the information presented in the model&apos;s context window at any given moment.
          </p>
        </div>

        {/* 4 Pillars of Context Engineering */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-850 space-y-2">
            <Database className="w-5 h-5 text-teal-400" />
            <h5 className="font-bold text-white text-sm">State &amp; Memory</h5>
            <p className="text-xs text-slate-400">
              Maintaining user attributes, session variables, and past tool results across turns without exceeding token budgets.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-850 space-y-2">
            <Wrench className="w-5 h-5 text-sky-400" />
            <h5 className="font-bold text-white text-sm">Tool Schemas</h5>
            <p className="text-xs text-slate-400">
              Describing available tools cleanly with strict JSON types so the LLM invokes the right tool with exact arguments.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-850 space-y-2">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <h5 className="font-bold text-white text-sm">Policy Constraints</h5>
            <p className="text-xs text-slate-400">
              Explicit guardrails (e.g., 30-day return window, max transaction limit) to prevent unauthorized agent actions.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-850 space-y-2">
            <Clock className="w-5 h-5 text-emerald-400" />
            <h5 className="font-bold text-white text-sm">Window Optimization</h5>
            <p className="text-xs text-slate-400">
              Summarizing older history and pruning irrelevant data to keep the context window compact and prevent attention degradation.
            </p>
          </div>
        </div>

        {/* The Concrete Code Architecture Pattern */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-xl">
          <div className="p-4 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
              <FileCode className="w-4 h-4 text-teal-400" />
              <span>production_agent_context_template.py</span>
            </div>

            <button
              onClick={handleCopyContext}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded bg-slate-800 border border-slate-700 transition"
            >
              {copiedContextSnippet ? (
                <>
                  <Check className="w-3.5 h-3.5 text-teal-400" />
                  <span className="text-teal-400 font-bold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Snippet</span>
                </>
              )}
            </button>
          </div>

          <div className="p-4 md:p-5 overflow-x-auto font-mono text-xs text-slate-300 leading-relaxed bg-slate-950">
            <pre>
              <code>{contextEngineeringSnippet}</code>
            </pre>
          </div>

          <div className="p-4 border-t border-slate-800 bg-slate-900/30 text-xs text-slate-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
            <span>Notice how the prompt cleanly segregates persona, state, history, policies, and tools. This eliminates tool confusion and keeps agent decision-making deterministic and auditable.</span>
          </div>
        </div>
      </section>

      {/* Part 5: Interactive Code Execution Studio */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 font-mono text-xs font-bold">
            Part 5 • Hands-On Code Studio
          </span>
          <div className="h-px bg-slate-800 flex-1" />
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-extrabold text-white tracking-tight">
            Run the Comparison: Chain vs. Autonomous Agent Loop
          </h3>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Switch between the deterministic Prompt Chain and the Autonomous Agent Loop below. Click <strong>Run</strong> to observe how each pattern behaves, consumes tokens, and logs execution steps.
          </p>
        </div>

        <Module1_2CodeExecutor />
      </section>

      {/* Part 6: Interactive Knowledge Check */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 font-mono text-xs font-bold">
            Part 6 • Knowledge Check
          </span>
          <div className="h-px bg-slate-800 flex-1" />
        </div>

        <Module1_2Quiz />
      </section>

      {/* Part 7: Summary & What's Next */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              Module 1.2 Summary: Key Takeaways
            </h3>
            <p className="text-xs text-slate-400">
              The four foundational principles to remember as you build production AI systems
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-850 space-y-1">
            <span className="font-bold text-teal-400 block font-mono text-xs">
              1. 4 Evolutionary Paradigms
            </span>
            <p className="text-slate-300">
              Prompts provide immediate answers; CoT induces internal reasoning; Chains connect deterministic steps; Agents add dynamic runtime decision loops and tool actuation.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-850 space-y-1">
            <span className="font-bold text-teal-400 block font-mono text-xs">
              2. Avoid Premature Complexity
            </span>
            <p className="text-slate-300">
              If the workflow steps are predictable and known upfront, build a Prompt Chain. Only deploy an autonomous agent loop when runtime branching or dynamic tool orchestration is truly required.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-850 space-y-1">
            <span className="font-bold text-teal-400 block font-mono text-xs">
              3. Context Engineering is Critical
            </span>
            <p className="text-slate-300">
              Agents live and die by their context window. Carefully structuring persona, user state, history, policies, and tool schemas prevents hallucinations and keeps agent trajectories on track.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-850 space-y-1">
            <span className="font-bold text-teal-400 block font-mono text-xs">
              4. Cost &amp; Latency Awareness
            </span>
            <p className="text-slate-300">
              Chains have predictable cost and near-instant turnaround. Agents incur variable token usage and higher latency across multi-turn reasoning loops.
            </p>
          </div>
        </div>

        {/* Bridge to Module 1.3 */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">
              Up Next • Module 1.3
            </span>
            <h4 className="text-sm font-bold text-white">
              Tackling Complex Tasks with AI Systems (Task Decomposition &amp; Workflows vs. Agents)
            </h4>
          </div>

          <Link
            href="/learn/level-1/module-1-3"
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition shadow-lg shadow-teal-500/20"
          >
            <span>Continue to Module 1.3</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
