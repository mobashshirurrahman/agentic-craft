"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  ArrowRight,
  Code2,
  Layers,
  Sparkles,
  HelpCircle,
  Copy,
  CheckCheck,
  Play,
  RotateCcw,
  FileText,
  AlertTriangle,
  Award,
  GraduationCap,
  Trophy,
  CheckCircle2,
  GitBranch,
  ShieldCheck,
  Boxes,
  Compass,
} from "lucide-react";
import DeepAgentStudio from "./DeepAgentStudio";
import Module4_17Quiz from "./Module4_17Quiz";

export default function Module4_17Content() {
  const [selectedPillar, setSelectedPillar] = useState<string>("task_decomposition");
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [activeCodeTab, setActiveCodeTab] = useState<"code" | "output">("code");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);

  const pillars = [
    {
      id: "task_decomposition",
      title: "1. Hierarchical Decomposition",
      tagline: "Breaking Massive Goals into Subgraphs",
      desc: "Deep agents never solve complex prompts in a single thought. A Lead Orchestrator recursively decomposes the user objective into an executable tree of specialized sub-agent tasks.",
      icon: Compass,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      border: "border-amber-200 dark:border-amber-500/30",
      badge: "Decomposition Tree",
      codeSnippet: `# 1. HIERARCHICAL TASK DECOMPOSITION
class ResearchPlan(BaseModel):
    objective: str
    sub_tasks: list[SubTask] = Field(description="Ordered list of independent sub-agent objectives")

planner = ChatAnthropic(model="claude-3-5-sonnet-20241022").with_structured_output(ResearchPlan)

def plan_deep_task(state: MasterState):
    plan = planner.invoke(f"Decompose this complex research query: {state['user_prompt']}")
    return {"plan": plan, "pending_subtasks": plan.sub_tasks}`,
    },
    {
      id: "context_isolation",
      title: "2. Clean Context Sandboxes",
      tagline: "Zero Cross-Subagent Context Bloat",
      desc: "Each sub-agent executes in a localized state graph with only the tools it requires. Intermediate web scraping or compiler error dumps never leak back into the master state.",
      icon: Boxes,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-500/10",
      border: "border-blue-200 dark:border-blue-500/30",
      badge: "Context Isolation",
      codeSnippet: `# 2. CONTEXT-ISOLATED SUB-AGENT INVOCATION
async def run_isolated_subagent(subtask: SubTask, master_config: dict):
    # Isolated state: only receives subtask scope, zero historical noise
    isolated_state = {"objective": subtask.description, "messages": []}
    
    # Subgraph runs with dedicated search/code tools
    subgraph_result = await researcher_subgraph.ainvoke(isolated_state)
    
    # Only return synthesized verified summary to master thread!
    return {
        "subtask_id": subtask.id,
        "verified_summary": subgraph_result["summary"],
        "token_usage": subgraph_result["tokens"]
    }`,
    },
    {
      id: "verification_loop",
      title: "3. Adversarial Red-Teaming QA",
      tagline: "Independent Verification Node",
      desc: "Implement a dedicated Critic/Auditor node with access to unit testing sandboxes and fact-checking search tools. The Auditor must sign off before final delivery.",
      icon: ShieldCheck,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-500/10",
      border: "border-purple-200 dark:border-purple-500/30",
      badge: "Critic Loop",
      codeSnippet: `# 3. ADVERSARIAL AUDITOR VERIFICATION NODE
def audit_findings_node(state: MasterState):
    report = state["draft_report"]
    audit_results = fact_checker.invoke(f"Audit this synthesis for hallucinations: {report}")
    
    if audit_results.has_flaws:
        # Route back to researcher with explicit correction instructions
        return Command(goto="researcher_node", update={"critique": audit_results.feedback})
    
    return Command(goto="final_synthesis_node")`,
    },
    {
      id: "artifact_synthesis",
      title: "4. State Synthesis & Assembly",
      tagline: "Executive Deliverable Generation",
      desc: "The Lead Agent compiles verified sub-agent deliverables into formatted markdown reports, structured database records, or executable code repositories.",
      icon: Layers,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      border: "border-emerald-200 dark:border-emerald-500/30",
      badge: "Artifact Assembly",
      codeSnippet: `# 4. EXECUTIVE ARTIFACT GENERATOR
def assemble_final_artifact(state: MasterState):
    summaries = [r["verified_summary"] for r in state["subagent_deliverables"]]
    
    final_output = synthesizer.invoke(f"""
    Assemble the master deliverables from these verified sub-agent streams:
    {json.dumps(summaries, indent=2)}
    
    Format: Executive Summary -> In-Depth Methodology -> Production Code -> Citations.
    """)
    return {"final_report": final_output.content, "status": "COMPLETED"}`,
    },
  ];

  const currentSnippet = pillars.find((p) => p.id === selectedPillar)?.codeSnippet || "";

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const runSimulation = () => {
    setIsSimulating(true);
    setSimStep(1);
    setTimeout(() => setSimStep(2), 700);
    setTimeout(() => setSimStep(3), 1400);
    setTimeout(() => {
      setSimStep(4);
      setIsSimulating(false);
    }, 2100);
  };

  return (
    <div className="space-y-10">
      {/* HERO BANNER */}
      <div className="rounded-2xl border border-amber-200 dark:border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-slate-50 dark:to-slate-950 p-6 md:p-8 relative overflow-hidden transition-colors">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30">
              Module 4.17 • Final Capstone Lesson
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              ~30 min interactive
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Building Deep Agents for Complex Tasks
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Welcome to the final capstone of Level 4 and the culmination of our entire curriculum. Explore how systems like <strong>Claude Code</strong>, <strong>Devin</strong>, and <strong>LangGraph Deep Agents</strong> execute multi-hour tasks through recursive decomposition, isolated sub-agent sandboxes, and adversarial critique loops.
          </p>
        </div>
      </div>

      {/* SECTION 1: 4 ARCHITECTURE PILLARS */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-amber-500" />
            1. Core Architecture of Deep Agents
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Select a deep agent architectural pattern
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            const isSelected = selectedPillar === pillar.id;
            return (
              <button
                key={pillar.id}
                onClick={() => setSelectedPillar(pillar.id)}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? `${pillar.border} ${pillar.bg} shadow-md ring-1 ring-amber-500/50`
                    : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className={`p-2 rounded-lg ${pillar.bg} ${pillar.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 font-semibold">
                      {pillar.badge}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    {pillar.title}
                  </h3>
                  <div className="text-[11px] font-medium text-amber-600 dark:text-amber-400">
                    {pillar.tagline}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* SECTION 2: CODE & EXECUTION INSPECTOR */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-amber-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white font-mono uppercase tracking-wider">
              Deep Agent Orchestrator Inspector
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={runSimulation}
              disabled={isSimulating}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold shadow-xs disabled:opacity-50 transition-all cursor-pointer"
            >
              {isSimulating ? (
                <>
                  <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                  <span>Synthesizing Deep Run...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Simulate Deep Execution</span>
                </>
              )}
            </button>
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 text-slate-600 dark:text-slate-400 text-xs font-mono transition-all cursor-pointer"
            >
              {copiedCode ? <CheckCheck className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? "Copied" : "Copy"}</span>
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden text-xs font-mono shadow-md">
          <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800/80 bg-slate-900/60">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
              <span className="text-slate-400 text-[11px] ml-2 font-mono">
                deep_agent_core.py • {selectedPillar}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveCodeTab("code")}
                className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition-all ${
                  activeCodeTab === "code"
                    ? "bg-amber-600/30 text-amber-300 border border-amber-500/40"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Code
              </button>
              <button
                onClick={() => setActiveCodeTab("output")}
                className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition-all ${
                  activeCodeTab === "output"
                    ? "bg-amber-600/30 text-amber-300 border border-amber-500/40"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Agent Hierarchy Trace
              </button>
            </div>
          </div>

          <div className="p-4 overflow-x-auto text-slate-300 leading-relaxed font-mono">
            {activeCodeTab === "code" ? (
              <pre>
                <code>{currentSnippet}</code>
              </pre>
            ) : (
              <div className="space-y-2 text-amber-300 font-mono text-[11px]">
                <p className="text-slate-400">&gt;&gt; Goal: &quot;Build and audit a full SOC2 compliance report for Cloud K8s cluster&quot;</p>
                <p className="text-slate-300">   [Lead Director] Generated 3-stage plan: Discovery -&gt; Implementation -&gt; QA</p>
                <p className="text-sky-300">   [Sub-Agent: Infra Auditor] Scanning Terraform &amp; IAM configs in sandbox...</p>
                <p className="text-sky-300">   [Sub-Agent: Policy Checker] Comparing findings against CIS Benchmarks v1.4...</p>
                <p className="text-amber-400">   [QA Critic Loop] Detected missing encryption at rest flag on EBS volumes.</p>
                <p className="text-purple-300">   [Sub-Agent: Patch Engineer] Emitted Terraform remediation snippet.</p>
                <p className="text-emerald-400 font-bold">&gt;&gt; Artifact Assembly: 42-page SOC2 report + verified Terraform patch delivered!</p>
              </div>
            )}
          </div>
        </div>

        {/* Simulation Banner */}
        {simStep > 0 && (
          <div className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/80 dark:bg-amber-950/30 flex items-center justify-between text-xs font-mono">
            <span className="text-amber-800 dark:text-amber-200">
              {simStep === 1 && "Lead agent constructs recursive hierarchical task plan with isolated scope boundaries..."}
              {simStep === 2 && "Specialized sub-agents run in parallel sandboxes with zero cross-context pollution..."}
              {simStep === 3 && "Independent QA Critic verifies findings, catching edge-case flaws..."}
              {simStep === 4 && "Master deliverable assembled with full verification proofs and citations!"}
            </span>
            <span className="text-amber-600 dark:text-amber-400 font-bold">
              Step {simStep}/4
            </span>
          </div>
        )}
      </section>

      {/* SECTION 3: INTERACTIVE STUDIO */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            2. Interactive Deep Agent Studio
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Multi-Tier Deep Agent Workbench
          </span>
        </div>
        <DeepAgentStudio />
      </section>

      {/* SECTION 4: HANDWRITTEN PRODUCTION INSIGHT */}
      <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/90 dark:bg-amber-500/10 shadow-sm">
        <span className="font-['Caveat',cursive] text-base text-amber-950 dark:text-amber-200 block">
          📌 Production Insight: The secret to Deep Agents like Claude Code or Devin is context isolation. If you allow all sub-agents to dump their raw search outputs and code test runs into one shared conversation thread, the context window explodes, costs skyrocket, and the agent hallucinates. Give each worker its own fresh scratchpad and return only synthesized findings to the parent!
        </span>
      </div>

      {/* SECTION 5: TRAPS & PITFALLS */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          Common Engineering Traps
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-500/30 bg-rose-50/50 dark:bg-rose-500/5 space-y-2">
            <span className="text-xs font-mono font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider block">
              TRAP #1: The Unbounded Recursive Tree Explosion
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Allowing sub-agents to spawn sub-sub-agents with no depth limit. A single ambiguous prompt can trigger an exponential explosion of hundreds of concurrent agent loops. Always hard-cap recursion depth at 2 or 3 levels and set strict total-token budgets per master run.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-500/5 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
              TRAP #2: Skipping Independent QA Verification
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Allowing the implementer agent to declare its own work complete without an independent Auditor node. The implementer often rationalizes subtle bugs. An adversarial Critic node with separate evaluation prompts is mandatory for enterprise reliability.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6: KEY TAKEAWAYS */}
      <section className="rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-500/5 p-5 space-y-3">
        <h4 className="font-bold text-sm text-amber-900 dark:text-amber-300 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          Key Architectural Takeaways
        </h4>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          {[
            ["1.", "Hierarchical Decomposition:", "Break multi-hour objectives into structured, independent sub-agent scopes."],
            ["2.", "Isolated Context Sandboxes:", "Keep intermediate scratchpad noise confined to sub-graphs to prevent master thread bloat."],
            ["3.", "Adversarial Critique:", "Enforce separate Critic auditor validation before releasing master artifacts to users."],
          ].map(([n, bold, rest]) => (
            <li key={n} className="flex items-start gap-2">
              <span className="text-amber-600 dark:text-amber-400 font-bold">{n}</span>
              <span><strong>{bold}</strong> {rest}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* SECTION 7: QUIZ */}
      <section className="space-y-3">
        <button
          onClick={() => setShowQuiz(!showQuiz)}
          className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all text-left cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                Concept Check: Deep Agents Capstone
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {showQuiz ? "Click to collapse" : "Final curriculum exam: test your deep agent systems understanding (3 questions)"}
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-semibold px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30">
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
              <Module4_17Quiz />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* SECTION 8: MASTER GRADUATION DIPLOMA CARD */}
      <section className="rounded-3xl border-2 border-amber-300 dark:border-amber-500/40 bg-gradient-to-br from-amber-500/15 via-orange-500/10 to-emerald-500/15 p-6 md:p-10 relative overflow-hidden shadow-xl text-center space-y-6">
        <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 shadow-inner">
          <GraduationCap className="w-12 h-12" />
        </div>

        <div className="space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 text-xs font-mono font-bold uppercase tracking-wider">
            <Trophy className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Curriculum Complete • 59 of 59 Modules Mastered</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Certified Master Agentic AI Engineer
          </h2>

          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            You have traversed the entire continuum of modern agentic engineering: from Level 1 Foundations and Level 2 LangGraph Architectures to Level 3 Human-in-the-Loop Orchestration and Level 4 Production Scale &amp; Deep Agents. You are now equipped to architect world-class autonomous systems!
          </p>
        </div>

        {/* Milestone Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto pt-2">
          {[
            { level: "Level 1", title: "Foundations", count: "13 Modules", color: "text-emerald-700 dark:text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
            { level: "Level 2", title: "LangGraph Core", count: "17 Modules", color: "text-indigo-700 dark:text-indigo-400", bg: "bg-indigo-500/10 border-indigo-500/20" },
            { level: "Level 3", title: "Advanced HITL", count: "12 Modules", color: "text-blue-700 dark:text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
            { level: "Level 4", title: "Production Scale", count: "17 Modules", color: "text-amber-700 dark:text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
          ].map((milestone) => (
            <div key={milestone.level} className={`p-3 rounded-xl border ${milestone.bg} space-y-1`}>
              <div className="flex items-center justify-center gap-1">
                <CheckCircle2 className={`w-3.5 h-3.5 ${milestone.color}`} />
                <span className="text-[11px] font-mono font-bold text-slate-800 dark:text-slate-200">{milestone.level}</span>
              </div>
              <p className={`text-xs font-bold ${milestone.color}`}>{milestone.title}</p>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-mono">{milestone.count}</span>
            </div>
          ))}
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/learn"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm shadow-md hover:shadow-amber-500/30 transition-all cursor-pointer"
          >
            <span>Return to Curriculum Hub</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
