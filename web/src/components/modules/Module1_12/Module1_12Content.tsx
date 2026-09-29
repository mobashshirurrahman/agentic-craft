"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  Check,
  ArrowRight,
  Briefcase,
  Headphones,
  Code2,
  Search,
  Scale,
  DollarSign,
  Zap,
  TrendingUp,
  Sparkles,
  HelpCircle,
  AlertTriangle,
  Copy,
  CheckCheck,
  Play,
  RotateCcw,
  Terminal,
  Building2,
  ShieldCheck,
} from "lucide-react";
import RealWorldAgentCaseStudies from "./RealWorldAgentCaseStudies";
import EnterpriseRoiImpactCalculator from "./EnterpriseRoiImpactCalculator";
import Module1_12Quiz from "./Module1_12Quiz";

export default function Module1_12Content() {
  const [selectedDomain, setSelectedDomain] = useState<string>("support");
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [activeCodeTab, setActiveCodeTab] = useState<"code" | "output">("code");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);

  const domains = [
    {
      id: "support",
      title: "1. Customer Ops",
      tagline: "Tier-1 Autonomous Triage",
      desc: "Connects CRM and ERP APIs to resolve 60%+ of routine inquiries (returns, tracking) while escalating complex edge cases.",
      icon: Headphones,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      border: "border-amber-200 dark:border-amber-500/30",
      badge: "65% Automation",
      codeSnippet: `# Customer Support Agent Workflow
def support_loop(ticket):
    order = erp.lookup_order(ticket.order_id)
    policy = kb.retrieve_policy("cancellation_window")
    
    if order.status == "Processing" and order.hours_elapsed <= 24:
        return erp.cancel_and_refund(order.id)
    else:
        # Graceful human escalation with pre-filled context
        return zendesk.escalate_to_human(ticket, context=order)`,
    },
    {
      id: "coding",
      title: "2. Software QA",
      tagline: "Test-Driven Code Repair",
      desc: "Autonomously searches codebases, reproduces bugs with test cases, modifies files, and verifies pull requests before review.",
      icon: Code2,
      color: "text-sky-600 dark:text-sky-400",
      bg: "bg-sky-50 dark:bg-sky-500/10",
      border: "border-sky-200 dark:border-sky-500/30",
      badge: "4x Faster PRs",
      codeSnippet: `# Software Engineering Agent Loop
def code_repair_loop(issue_description):
    repro_test = generate_test(issue_description)
    sandbox.run_pytest(repro_test)  # Fails
    
    diff = generate_code_fix(issue_description)
    sandbox.apply_patch(diff)
    
    if sandbox.run_pytest() == 0:
        return github.open_pr(branch="fix-issue", diff=diff)`,
    },
    {
      id: "research",
      title: "3. Deep Research",
      tagline: "Multi-Source Synthesis",
      desc: "Crawls hundreds of financial or academic sources, correlates citations, and synthesizes structured executive whitepapers.",
      icon: Search,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-500/10",
      border: "border-purple-200 dark:border-purple-500/30",
      badge: "100+ Sources",
      codeSnippet: `# Deep Research Pipeline
queries = decompose_into_subqueries(topic)
raw_evidence = parallel_web_crawl(queries, depth=2)
verified_facts = deduplicate_and_fact_check(raw_evidence)
report = generate_markdown_report(verified_facts, include_citations=True)`,
    },
    {
      id: "legal",
      title: "4. Legal Audits",
      tagline: "Contract Compliance",
      desc: "Analyzes NDAs and vendor contracts to flag liability caps, non-standard indemnity clauses, and GDPR compliance risks.",
      icon: Scale,
      color: "text-teal-600 dark:text-teal-400",
      bg: "bg-teal-50 dark:bg-teal-500/10",
      border: "border-teal-200 dark:border-teal-500/30",
      badge: "Zero Oversight",
      codeSnippet: `# Legal Due Diligence Agent
for clause in contract.extract_clauses():
    audit_rule = playbook.get_rule(clause.type)
    if not audit_rule.conforms(clause):
        audit_log.flag_anomaly(
            clause_id=clause.id,
            risk_level="HIGH",
            recommendation="Cap liability to 12 months fees"
        )`,
    },
  ];

  const currentDomain =
    domains.find((d) => d.id === selectedDomain) || domains[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentDomain.codeSnippet);
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
      <section className="rounded-2xl border border-teal-200 dark:border-teal-500/30 bg-teal-50/60 dark:bg-teal-500/5 p-4 sm:p-6 backdrop-blur-sm shadow-sm">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-teal-600 text-white shrink-0 shadow-sm mt-0.5">
            <Target className="w-5 h-5" />
          </div>
          <div className="space-y-2 flex-1">
            <h2 className="text-sm font-mono uppercase tracking-wider text-teal-800 dark:text-teal-400 font-bold">
              🎯 By the end of this module, you will:
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                <span>Analyze the 4 core business vectors: Cost Reduction, Speed, Scalability, and Consistency</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                <span>Dissect 4 production archetypes: Support Ops, Software QA, Deep Research, and Legal Auditing</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                <span>Calculate quantitative ROI models across team size, task volume, and labor reclamation</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                <span>Design graceful Human-in-the-Loop escalation paths for high-risk transactional boundaries</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: THE 4 ENTERPRISE ARCHETYPES (2x2 Mobile / 4-Col Desktop Grid) */}
      <section className="space-y-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30 text-teal-700 dark:text-teal-300 text-xs font-mono font-semibold mb-2">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Commercial Deployment • Production Domains</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Real-World Applications for AI Agents
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Real-world commercial value concentrates in high-repetition, API-connected enterprise workflows. Explore the four highest-ROI application domains below.
          </p>
        </div>

        {/* 4 SYMMETRICAL CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {domains.map((dom) => {
            const Icon = dom.icon;
            const isSelected = selectedDomain === dom.id;

            return (
              <button
                key={dom.id}
                onClick={() => setSelectedDomain(dom.id)}
                className={`p-3.5 sm:p-4 rounded-xl border text-left transition-all flex flex-col justify-between min-h-[145px] sm:min-h-[160px] active:scale-95 touch-manipulation cursor-pointer ${
                  isSelected
                    ? "border-teal-500 bg-white dark:bg-slate-900 shadow-md ring-2 ring-teal-500/20"
                    : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-2 rounded-lg ${dom.bg}`}>
                      <Icon className={`w-4 h-4 ${dom.color}`} />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {dom.badge}
                    </span>
                  </div>
                  <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                    {dom.title}
                  </h3>
                  <p className="text-[11px] font-medium text-teal-700 dark:text-teal-400 mt-0.5">
                    {dom.tagline}
                  </p>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                  {dom.desc}
                </p>
              </button>
            );
          })}
        </div>

        {/* LIVE STATE / CODE INSPECTOR */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 p-4 sm:p-5 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-teal-500 animate-pulse" />
              <span className="text-xs font-mono font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Production Pattern: {currentDomain.title}
              </span>
            </div>
            <span className="text-xs font-mono text-teal-700 dark:text-teal-400 font-semibold">
              {currentDomain.tagline}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {currentDomain.desc}
          </p>

          <div className="pt-2">
            <pre className="p-3 rounded-lg bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto border border-slate-800">
              <code>{currentDomain.codeSnippet}</code>
            </pre>
          </div>
        </div>

        {/* ✍️ REAL-WORLD ANALOGY (Switchboard Operator vs Elastic Swarm) */}
        <div className="rounded-xl border border-amber-300 dark:border-amber-500/30 bg-amber-50/70 dark:bg-amber-500/10 p-4 sm:p-5 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-base">💡</span>
            <h4 className="text-sm font-bold text-amber-950 dark:text-amber-200">
              Mental Model: The 19th Century Switchboard vs. Modern Elastic Swarm
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-amber-900 dark:text-amber-300 leading-relaxed">
            In early telecommunications, human switchboard operators manually plugged copper patch cables into sockets for every call. During unexpected news surges, switchboards backlogged completely.
            <br />
            Modern AI agents replace physical bottlenecks with <strong>elastic digital routing</strong>: routine transactions execute in sub-seconds via tool calling, while human experts focus exclusively on high-touch relationship disputes.
          </p>
          <div className="pt-1">
            <span className="font-['Caveat',cursive] text-base text-amber-950 dark:text-amber-200 block sm:-rotate-0.5">
              ✍️ Instructor Note: &quot;Top production agents do NOT try to do 100% of everything alone. They resolve 60-70% autonomously and escalate edge cases with pre-drafted context!&quot;
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 2: PRODUCTION CASE STUDIES (Interactive Stepper) */}
      <section className="space-y-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30 text-teal-700 dark:text-teal-300 text-xs font-mono font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Interactive Stepper • Case Studies</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            How Industry Leaders Deploy Agents
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Step through end-to-end execution traces from Zendesk Fin, GitHub Copilot/Claude Code, and Deep Research.
          </p>
        </div>

        <RealWorldAgentCaseStudies />
      </section>

      {/* SECTION 3: ENTERPRISE ROI IMPACT CALCULATOR */}
      <section className="space-y-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30 text-teal-700 dark:text-teal-300 text-xs font-mono font-semibold mb-2">
            <DollarSign className="w-3.5 h-3.5" />
            <span>Quantitative ROI • Business Simulator</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Enterprise Value & ROI Calculator
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Model labor cost reclamation, operational speedups, and net savings across support, engineering, and research teams.
          </p>
        </div>

        <EnterpriseRoiImpactCalculator />
      </section>

      {/* SECTION 4: INTERACTIVE CODE EXECUTOR & RUNNER */}
      <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        {/* Terminal Header */}
        <div className="border-b border-slate-200 dark:border-slate-800 px-4 py-3 bg-slate-50 dark:bg-slate-800/60 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200">
              enterprise_triage_loop.py
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex bg-slate-200 dark:bg-slate-700 p-0.5 rounded-lg text-[11px] font-mono">
              <button
                onClick={() => setActiveCodeTab("code")}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  activeCodeTab === "code"
                    ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold shadow-xs"
                    : "text-slate-600 dark:text-slate-400"
                }`}
              >
                Code
              </button>
              <button
                onClick={() => setActiveCodeTab("output")}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  activeCodeTab === "output"
                    ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold shadow-xs"
                    : "text-slate-600 dark:text-slate-400"
                }`}
              >
                Live Output
              </button>
            </div>

            <button
              onClick={handleCopyCode}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              title="Copy code"
            >
              {copiedCode ? (
                <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>

            <button
              onClick={handleRunSimulation}
              disabled={isSimulating}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-mono text-xs font-semibold shadow-xs disabled:opacity-50 transition-all cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isSimulating ? "Processing..." : "Run Ticket Triage"}</span>
            </button>
          </div>
        </div>

        {/* Tab Body */}
        <div className="p-4 sm:p-5 bg-slate-950 font-mono text-xs text-slate-200 min-h-[220px]">
          {activeCodeTab === "code" ? (
            <pre className="overflow-x-auto leading-relaxed">
              <code>{`# Enterprise Support Agent with Guarded Human Escalation
from pydantic import BaseModel, Field

class OrderAction(BaseModel):
    order_id: str
    action: str  # "refund", "address_change", "tracking"
    allow_autonomous: bool

def process_support_inquiry(user_msg: str, order_id: str):
    # 1. Query ERP database for order status
    order = erp.get_order(order_id)
    
    # 2. Check Corporate Policy Guardrail
    if order.status == "In Transit":
        # Policy: Cannot alter destination mid-transit autonomously!
        return {
            "status": "ESCALATED_TO_HUMAN",
            "reason": "Carrier rerouting requires human shipping desk approval",
            "draft_note": f"Order {order_id} is in transit with FedEx. Customer requested reroute."
        }
    
    # 3. Autonomous Execution for valid status
    return erp.update_shipping_address(order_id, user_msg)`}</code>
            </pre>
          ) : (
            <div className="space-y-2 text-slate-300">
              <div className="text-teal-400 font-bold">
                [INCOMING TICKET #9941] Customer: &quot;Please change delivery address for order #4019 to 742 Evergreen Terr.&quot;
              </div>
              {simStep >= 1 && (
                <div className="text-sky-300">
                  ➜ [TOOL CALL] erp.get_order(&quot;4019&quot;) ➔ Status: &apos;In Transit&apos; (Carrier: FedEx)
                </div>
              )}
              {simStep >= 2 && (
                <div className="text-amber-300">
                  ⚠️ [POLICY GUARD] Rule 4.2: In-transit destination modifications forbid autonomous execution!
                </div>
              )}
              {simStep >= 3 && (
                <div className="text-purple-300">
                  ➜ [HITL ESCALATION] Assigned Zendesk ticket to Human Specialist &apos;Sarah M.&apos;
                  <br />
                  <span className="text-slate-400 pl-4">Pre-populated context: Carrier FedEx, Tracking #FX-99210.</span>
                </div>
              )}
              {simStep >= 4 && (
                <div className="text-emerald-400 font-bold pt-2 border-t border-slate-800">
                  ✔ [CUSTOMER RESPONSE] &quot;Your order is in transit with FedEx. Specialist Sarah has been assigned to contact the carrier directly. ETA 15 mins!&quot;
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* SECTION 5: COMMON TRAPS & PITFALLS */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          <span>Real-World Implementation Pitfalls</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-500/30 bg-rose-50/50 dark:bg-rose-500/5 space-y-2">
            <span className="text-xs font-mono font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider block">
              TRAP #1: The 100% Autonomous Fallacy
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Assuming an AI agent must handle 100% of cases without human involvement destroys user trust. Designing an agent that cleanly resolves 65% of routine workflows and cleanly escalates 35% delivers massive ROI with zero customer friction!
            </p>
          </div>

          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-500/5 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
              TRAP #2: Read-Only Chatbots Disguised as Agents
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              An agent that only answers questions from a PDF is just an expensive FAQ search. True agentic value unlocks when the agent has write-capable transactional tools: modifying database records, opening GitHub pull requests, or dispatching webhooks.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6: KEY TAKEAWAYS */}
      <section className="rounded-xl border border-teal-200 dark:border-teal-500/30 bg-teal-50/50 dark:bg-teal-500/5 p-5 space-y-3">
        <h4 className="font-bold text-sm text-teal-900 dark:text-teal-300 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          <span>Key Architectural Takeaways</span>
        </h4>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          <li className="flex items-start gap-2">
            <span className="text-teal-600 dark:text-teal-400 font-bold">1.</span>
            <span><strong>Target High-Repetition Bottlenecks:</strong> Customer support triage, automated bug reproduction, and multi-source document synthesis deliver the highest commercial ROI.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal-600 dark:text-teal-400 font-bold">2.</span>
            <span><strong>Design for Bounded Autonomy:</strong> Equip agents with transactional tools, but enforce strict programmatic boundaries where sensitive actions hand off to human supervisors.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal-600 dark:text-teal-400 font-bold">3.</span>
            <span><strong>Quantify the 4 Value Vectors:</strong> Measure not just cost savings, but turnaround velocity, elastic scalability during traffic spikes, and compliance consistency.</span>
          </li>
        </ul>
      </section>

      {/* SECTION 7: EXPANDABLE KNOWLEDGE CHECK QUIZ */}
      <section className="space-y-3">
        <button
          onClick={() => setShowQuiz(!showQuiz)}
          className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all text-left shadow-xs cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                Concept Check: Real-World Applications & ROI
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {showQuiz ? "Click to collapse questions" : "Click to test your enterprise deployment intuition (3 questions)"}
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-semibold px-3 py-1.5 rounded-lg bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-400 border border-teal-200 dark:border-teal-500/30">
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
              <Module1_12Quiz />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* SECTION 8: NEXT MODULE BRIDGE */}
      <section className="rounded-2xl border border-teal-200 dark:border-teal-500/30 bg-gradient-to-r from-teal-50 via-white to-slate-50 dark:from-teal-500/10 dark:via-slate-900 dark:to-slate-950 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider">
            <span>Level 1 Grand Finale • Module 1.13</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Core Principles for Building Agentic Systems
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
            Synthesize all 12 modules into the definitive architectural manifesto: simplicity first, explicit state machines, bounded autonomy, and end-to-end evaluation.
          </p>
        </div>

        <Link
          href="/learn/level-1/module-1-13"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow-teal-500/20 transition-all shrink-0 cursor-pointer"
        >
          <span>Continue to Module 1.13 Capstone</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
