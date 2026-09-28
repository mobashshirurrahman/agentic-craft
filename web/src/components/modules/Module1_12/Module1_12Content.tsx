"use client";

import React from "react";
import {
  Briefcase,
  Headphones,
  Code2,
  Search,
  DollarSign,
  Zap,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  BarChart3,
  CheckCircle2,
  Building2,
  ArrowRight,
  Lightbulb,
} from "lucide-react";
import EnterpriseRoiImpactCalculator from "./EnterpriseRoiImpactCalculator";
import RealWorldAgentCaseStudies from "./RealWorldAgentCaseStudies";
import Module1_12Quiz from "./Module1_12Quiz";

export default function Module1_12Content() {
  return (
    <div className="space-y-12">
      {/* Teacher Welcome Hero */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-slate-50 dark:to-slate-950 p-6 md:p-8 relative overflow-hidden transition-colors">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                Module 1.12 • Enterprise Foundations
              </span>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                ~50 min read & sandbox
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Real-World Applications for AI Agents
            </h1>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Hello and welcome! Throughout Level 1, we have explored the anatomy of an agent: reasoning loops, working and episodic memories, multi-agent topologies, RAG tools, and framework trade-offs. Now, it is time to ask the defining question: <strong className="text-slate-900 dark:text-white">How do we translate these agentic capabilities into tangible, multi-million dollar business outcomes?</strong>
            </p>
          </div>

          <div className="hidden lg:flex flex-col items-center justify-center p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur shrink-0 text-center w-52 shadow-sm">
            <Building2 className="w-8 h-8 text-emerald-500 mb-2" />
            <span className="text-xs font-mono font-bold text-slate-900 dark:text-white">
              Enterprise Adoption
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              79% of organizations now deploy active AI agents (PwC, 2025)
            </span>
          </div>
        </div>
      </div>

      {/* Part 1: The Three Canonical Agent Archetypes */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5">
            <Briefcase className="w-4 h-4" />
            Part 1: The Industry Landscape
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mt-1">
            The Three Canonical Agent Archetypes
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
            While agents can theoretically be built for anything, real-world commercial traction has concentrated heavily into three high-ROI archetypes. Understanding their structure helps us design systems that solve actual business bottlenecks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Customer Support */}
          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3">
                <Headphones className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                1. Customer Support & Operations
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-mono">
                Zendesk AI, Intercom Fin, Decagon
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                Connects RAG knowledge bases with transactional order APIs and ticketing systems. Autonomously handles 60%+ of routine inquiries (returns, tracking, FAQs) and detects policy limits to escalate complex or high-risk cases to human agents.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-mono text-amber-600 dark:text-amber-400 font-medium">
              Primary Goal: 24/7 instant resolution & reduced cost per ticket
            </div>
          </div>

          {/* Card 2: Software Engineering */}
          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-3">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                2. Autonomous Coding & QA
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-mono">
                GitHub Copilot Workspace, Claude Code, Cursor
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                Moves past inline code completion into active agent loops: parses GitHub issues, explores directory trees, executes test runners, iterates on compiler error messages, and opens verified pull requests.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-mono text-sky-600 dark:text-sky-400 font-medium">
              Primary Goal: Eliminating developer toil & speeding release velocity
            </div>
          </div>

          {/* Card 3: Deep Research */}
          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                3. Deep Research & Synthesis
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-mono">
                Deep Research (ChatGPT, Claude, Gemini)
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                Executes multi-turn exploratory search routines. Decomposes high-level strategic inquiries into sub-queries, navigates dozens of external sources, reconciles contradictory claims, and generates cited multi-page whitepapers.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-mono text-purple-600 dark:text-purple-400 font-medium">
              Primary Goal: Compressing days of manual research into minutes
            </div>
          </div>
        </div>
      </section>

      {/* Part 2: The 4 Core Business Value Vectors */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-teal-600 dark:text-teal-400 font-bold flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            Part 2: The Economic Framework
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mt-1">
            The 4 Business Value Vectors
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
            When proposing an agent project to leadership or evaluating your own architecture, frame its return around these four foundational vectors. An agent that cannot articulate its contribution to at least one of these vectors is a science experiment, not a business asset.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Vector 1: Cost Reduction */}
          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  1. Cost Reduction
                </h3>
                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                  Labor hours reclaimed & lower marginal task cost
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-2">
              By automating repetitive, low-variance workflows (e.g. password resets, shipment status checks, standard data transformations), organizations reclaim hundreds of thousands of human labor hours per year without proportional license increases.
            </p>
          </div>

          {/* Vector 2: Speed and Efficiency */}
          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-sky-500/20 text-sky-600 dark:text-sky-400">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  2. Speed and Efficiency
                </h3>
                <span className="text-[11px] font-mono text-sky-600 dark:text-sky-400">
                  24/7/365 instant turnarounds & parallel execution
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-2">
              Human workers operate in shifts and take hours or days to cycle through backlogs. Agents respond within seconds and can execute dozens of API calls, web searches, and database queries in parallel.
            </p>
          </div>

          {/* Vector 3: Consistency and Quality */}
          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-teal-500/20 text-teal-600 dark:text-teal-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  3. Consistency and Quality
                </h3>
                <span className="text-[11px] font-mono text-teal-600 dark:text-teal-400">
                  Zero cognitive fatigue & strict protocol compliance
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-2">
              Unlike human operators who experience afternoon fatigue or forget compliance disclosures under pressure, an agent executes its system prompt and policy guardrails with consistent precision across millions of interactions.
            </p>
          </div>

          {/* Vector 4: Instant Scalability */}
          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-purple-500/20 text-purple-600 dark:text-purple-400">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  4. Instant Scalability
                </h3>
                <span className="text-[11px] font-mono text-purple-600 dark:text-purple-400">
                  Elastic capacity without hiring bottlenecks
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-2">
              Handling a sudden 10x traffic spike (product launches, outages, flash sales) traditionally requires months of recruiting and temporary agency contracts. Agents scale horizontally in the cloud with zero onboarding lag.
            </p>
          </div>
        </div>
      </section>

      {/* Part 3: Interactive ROI Calculator */}
      <section className="space-y-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5">
            <BarChart3 className="w-4 h-4" />
            Part 3: Interactive Financial Modeling
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mt-1">
            Simulate Your Enterprise ROI
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
            Adjust the sliders below to calculate reclaimed hours, net dollar savings, and speedup ratios across Customer Support, Engineering, or Market Research teams.
          </p>
        </div>

        <EnterpriseRoiImpactCalculator />
      </section>

      {/* Part 4: Production Case Studies Trace Walkthrough */}
      <section className="space-y-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-sky-600 dark:text-sky-400 font-bold flex items-center gap-1.5">
            <Search className="w-4 h-4" />
            Part 4: Production Deep Dive
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mt-1">
            Interactive Production Case Studies
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
            Walk step-by-step through real production agent traces to inspect how tools, RAG policies, and Human-in-the-Loop (HITL) hand-offs operate in the wild.
          </p>
        </div>

        <RealWorldAgentCaseStudies />
      </section>

      {/* Part 5: Enterprise Benchmark Proof Points */}
      <section className="p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-teal-500/20 text-teal-600 dark:text-teal-400">
            <Lightbulb className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              The Reality Check: What the Industry Data Shows
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Documented surveys and real enterprise deployment results
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
            <div className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400">
              $3.5 Billion
            </div>
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">
              IBM AskHR Savings
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-normal">
              11.5M+ interactions handled; 94% of routine tasks resolved without human escalation.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
            <div className="text-2xl font-black font-mono text-teal-600 dark:text-teal-400">
              79%
            </div>
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">
              Enterprise Adoption
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-normal">
              According to PwC&apos;s 2025 survey, nearly four in five companies already have active agents in production.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
            <div className="text-2xl font-black font-mono text-sky-600 dark:text-sky-400">
              66%
            </div>
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">
              Documented Gains
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-normal">
              66% of deploying organizations measure concrete productivity boosts and 57% document direct operational savings.
            </p>
          </div>
        </div>
      </section>

      {/* Part 6: Knowledge Check Quiz */}
      <section className="space-y-4">
        <Module1_12Quiz />
      </section>

      {/* Teacher Wrap-up Callout */}
      <div className="rounded-2xl border border-teal-500/30 bg-gradient-to-r from-teal-500/10 via-slate-50 dark:via-slate-900/80 to-transparent p-6 relative overflow-hidden">
        <div className="flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-teal-500/20 text-teal-600 dark:text-teal-400 shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
              Teacher&apos;s Lesson Summary
            </span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
              Agents Are Business Multipliers, Not Generic Chatbots
            </h3>
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
              When designing your agents, remember that real enterprise value doesn&apos;t come from open-ended conversational fluff. It comes from solving concrete bottlenecks—cutting support ticket resolution times from hours to seconds, automating tedious pull requests, or synthesizing complex market data—while honoring strict policy boundaries with human escalation.
            </p>
            <div className="mt-3 text-xs font-mono text-teal-600 dark:text-teal-400 font-semibold flex items-center gap-1.5">
              <span>Next up: Module 1.13 — Core Principles for Building Agentic Systems (The Level 1 Capstone!)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
