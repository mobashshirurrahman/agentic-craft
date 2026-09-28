"use client";

import React, { useState } from "react";
import {
  Headphones,
  Code2,
  Search,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  Sparkles,
  Terminal,
  ExternalLink,
  GitPullRequest,
  Database,
  ArrowRight,
  ShieldAlert,
  UserCheck,
} from "lucide-react";

interface CaseStudy {
  id: string;
  name: string;
  tagline: string;
  domain: string;
  icon: any;
  accentColor: string;
  badgeBg: string;
  prompt: string;
  steps: {
    id: number;
    title: string;
    actionType: "thought" | "tool" | "observation" | "escalation" | "final";
    detail: string;
    code?: string;
  }[];
  keyTakeaway: string;
  roiStat: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "support",
    name: "Zendesk AI / Intercom Fin",
    tagline: "Autonomous Tier-1 Support with Seamless Human Escalation",
    domain: "Customer Support & Operations",
    icon: Headphones,
    accentColor: "text-amber-500 border-amber-500/40 bg-amber-500/10",
    badgeBg: "bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/30",
    prompt: "Customer: 'Where is my order #8921 and can I change the delivery address to 742 Evergreen Terrace?'",
    steps: [
      {
        id: 1,
        title: "Thought: Identify User Intent & Required Policy",
        actionType: "thought",
        detail: "User is asking two things: 1) status of order #8921, and 2) modifying the delivery destination address. I need to consult policy guidelines on destination alterations before executing changes.",
      },
      {
        id: 2,
        title: "Tool Call: Knowledge Base RAG",
        actionType: "tool",
        detail: "Querying internal support knowledge base for shipping address alteration rules.",
        code: `kb_search(query="shipping address change policy in transit")`,
      },
      {
        id: 3,
        title: "Observation: Policy Retrieved",
        actionType: "observation",
        detail: "Policy Rule 4.2: 'Address modification is allowed only if order status is <Processing>. Once status is <In Transit>, carrier rerouting requires human supervisor verification.'",
      },
      {
        id: 4,
        title: "Tool Call: ERP Order Database API",
        actionType: "tool",
        detail: "Checking real-time status of order #8921.",
        code: `erp_lookup_order(order_id="8921")\n# Returns: {"status": "In Transit", "carrier": "FedEx", "tracking": "FX-99210", "eta": "Tomorrow 3 PM"}`,
      },
      {
        id: 5,
        title: "Escalation: Human-in-the-Loop Hand-off",
        actionType: "escalation",
        detail: "Since status is 'In Transit', policy forbids autonomous address changes. Creating Zendesk ticket with priority 'Urgent Carrier Intervention', drafting the reply, and routing directly to the human shipping desk.",
        code: `zendesk_create_ticket(\n  priority="URGENT",\n  tags=["address_change", "in_transit"],\n  draft_response="Your order FX-99210 is in transit. Our logistics desk has taken this ticket to contact FedEx directly."\n)`,
      },
      {
        id: 6,
        title: "Final Output to Customer",
        actionType: "final",
        detail: "Hello! Order #8921 is currently in transit with FedEx (tracking FX-99210, ETA tomorrow 3 PM). Because it is already on the road, our logistics specialist Sarah has immediately been assigned to your ticket to coordinate the address change with the carrier. You will receive an email update within 15 minutes!",
      },
    ],
    keyTakeaway: "Great support agents do NOT pretend to do what they aren't authorized to do. They resolve standard queries autonomously via tools, but gracefully escalate edge cases with pre-populated context to humans.",
    roiStat: "60-70% autonomous resolution rate with 4x faster first-contact response time.",
  },
  {
    id: "coding",
    name: "GitHub Copilot / Claude Code",
    tagline: "Autonomous Multi-File Code Repair & Test-Driven Verification",
    domain: "Software Engineering & QA",
    icon: Code2,
    accentColor: "text-sky-500 border-sky-500/40 bg-sky-500/10",
    badgeBg: "bg-sky-500/20 text-sky-700 dark:text-sky-300 border-sky-500/30",
    prompt: "Engineer: 'Fix the flaky session bug in auth_service.py where expired tokens crash with a 500 instead of a clean 401.'",
    steps: [
      {
        id: 1,
        title: "Tool Call: Repository Code Search",
        actionType: "tool",
        detail: "Searching codebase for token expiration handling in auth module.",
        code: `grep_search(query="jwt.decode", search_path="src/auth")`,
      },
      {
        id: 2,
        title: "Observation & Reproduction",
        actionType: "observation",
        detail: "Found `auth_service.py:84`. The code catches `ValueError` but forgets `jwt.ExpiredSignatureError`, causing an unhandled exception bubble.",
      },
      {
        id: 3,
        title: "Tool Call: Run Test Suite Before Edit",
        actionType: "tool",
        detail: "Executing existing test suite to reproduce failure state.",
        code: `run_pytest(test_file="tests/test_auth.py::test_expired_token")\n# Result: FAILED (Unhandled ExpiredSignatureError -> 500)`,
      },
      {
        id: 4,
        title: "Tool Call: Apply Code Patch",
        actionType: "tool",
        detail: "Editing `auth_service.py` to catch `ExpiredSignatureError` and return `HTTP 401 Unauthorized` with detail message.",
        code: `replace_file_content(\n  file="src/auth/auth_service.py",\n  target="except ValueError:\n    raise InvalidCredentials()",\n  replacement="except jwt.ExpiredSignatureError:\n    raise AuthenticationError(status_code=401, detail='Token expired')\n  except ValueError:\n    raise InvalidCredentials()"\n)`,
      },
      {
        id: 5,
        title: "Tool Call: Re-Run Verification Test",
        actionType: "tool",
        detail: "Running test suite again to verify regression and fix.",
        code: `run_pytest(test_file="tests/test_auth.py")\n# Result: PASSED (12 passed in 1.42s)`,
      },
      {
        id: 6,
        title: "Final Output: PR Draft & Commit",
        actionType: "final",
        detail: "Bug fixed! Added explicit `jwt.ExpiredSignatureError` catch returning 401. Verified with unit tests. Ready to merge via PR #412.",
      },
    ],
    keyTakeaway: "Agentic coding goes far beyond next-token autocomplete: it forms a complete ReAct loop of searching, test running, patching, verifying, and committing.",
    roiStat: "Reduces routine bug remediation and boilerplate test writing time by 55%.",
  },
  {
    id: "research",
    name: "Deep Research (Gemini / Claude / OpenAI)",
    tagline: "Recursive Web Crawling & Multi-Source Synthesis",
    domain: "Deep Research & Intelligence",
    icon: Search,
    accentColor: "text-purple-500 border-purple-500/40 bg-purple-500/10",
    badgeBg: "bg-purple-500/20 text-purple-700 dark:text-purple-300 border-purple-500/30",
    prompt: "Executive: 'Synthesize enterprise migration trends from Kubernetes to serverless containers with cost benchmarks and security concerns.'",
    steps: [
      {
        id: 1,
        title: "Thought: Decompose Into 4 Research Dimensions",
        actionType: "thought",
        detail: "Decomposing query: 1) Cloud adoption rates (AWS ECS/Fargate vs EKS), 2) Total Cost of Ownership (TCO) benchmarks, 3) Cold start latency comparisons, 4) Compliance and multi-tenant isolation.",
      },
      {
        id: 2,
        title: "Tool Calls: Parallel Web Searches",
        actionType: "tool",
        detail: "Dispatching search queries across industry analyst reports and cloud benchmarks.",
        code: `search_web(query="Gartner serverless container adoption 2025")\nsearch_web(query="AWS Fargate vs EKS TCO benchmark case studies")\nsearch_web(query="serverless container cold start microVM security isolation")`,
      },
      {
        id: 3,
        title: "Observation: Conflicting Data Detected",
        actionType: "observation",
        detail: "Source A (Cloud vendor whitepaper) claims 40% cost reduction. Source B (Independent DevOps audit) shows cost parity unless cluster utilization is under 30%. Flagging variance for nuanced synthesis.",
      },
      {
        id: 4,
        title: "Tool Call: Follow-Up Deep Exploration",
        actionType: "tool",
        detail: "Querying specific utilization thresholds where serverless containers become more expensive than reserved nodes.",
        code: `search_web(query="break-even utilization rate ECS Fargate vs EC2 reserved instances")`,
      },
      {
        id: 5,
        title: "Final Output: Comprehensive Executive Synthesis",
        actionType: "final",
        detail: "Synthesized 18 sources into structured executive brief with: 1) Executive Summary, 2) TCO Break-Even Matrix (serverless cheaper below 42% steady-state utilization), 3) MicroVM Firecracker security audit, 4) Citations table with conflict resolution notes.",
      },
    ],
    keyTakeaway: "Deep Research agents don't just dump a list of search links—they recursively follow leads, detect conflicting claims, test hypotheses, and synthesize structured intelligence.",
    roiStat: "Compresses 3 to 5 days of manual analyst research into 15 minutes of structured synthesis.",
  },
];

export default function RealWorldAgentCaseStudies() {
  const [activeTab, setActiveTab] = useState<string>("support");
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const activeCase = CASE_STUDIES.find((c) => c.id === activeTab) || CASE_STUDIES[0];

  const handleTabChange = (id: string) => {
    setActiveTab(id);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  const handleNextStep = () => {
    if (currentStepIndex < activeCase.steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
  };

  const visibleSteps = activeCase.steps.slice(0, currentStepIndex + 1);

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm overflow-hidden transition-colors">
      {/* Top Banner */}
      <div className="p-5 md:p-6 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-slate-50 via-slate-100/50 dark:from-slate-950 dark:via-slate-900 to-transparent">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-teal-500" />
              Industry In-Depth Case Studies
            </div>
            <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mt-1">
              How Top AI Agents Operate in Production
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
            Step {currentStepIndex + 1} of {activeCase.steps.length}
          </span>
        </div>

        {/* Tab Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {CASE_STUDIES.map((study) => {
            const Icon = study.icon;
            const isSelected = activeTab === study.id;
            return (
              <button
                key={study.id}
                onClick={() => handleTabChange(study.id)}
                className={`p-3 rounded-xl border text-left transition flex items-center gap-3 ${
                  isSelected
                    ? "border-teal-500 bg-teal-500/15 dark:bg-teal-500/10 text-teal-950 dark:text-white shadow-sm ring-1 ring-teal-500/30"
                    : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                <div
                  className={`p-2 rounded-lg shrink-0 ${
                    isSelected
                      ? "bg-teal-500 text-white"
                      : "bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold font-mono tracking-tight">
                    {study.name}
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">
                    {study.domain}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Case Details Header */}
      <div className="p-4 md:p-5 bg-slate-50/70 dark:bg-slate-950/40 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full border ${activeCase.badgeBg}`}>
            {activeCase.domain}
          </span>
          <h4 className="text-sm md:text-base font-bold text-slate-900 dark:text-white mt-1">
            {activeCase.tagline}
          </h4>
        </div>
        <div className="text-xs font-mono font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-lg">
          ROI Impact: {activeCase.roiStat}
        </div>
      </div>

      {/* Prompt Card */}
      <div className="p-4 md:p-5 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="text-[11px] font-mono uppercase text-slate-400 font-semibold mb-1 flex items-center gap-1.5">
          <Terminal className="w-3.5 h-3.5 text-slate-500" />
          Incoming Real-World User Request
        </div>
        <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-800 dark:text-slate-200">
          {activeCase.prompt}
        </div>
      </div>

      {/* Execution Stepper Container */}
      <div className="p-4 md:p-6 space-y-3.5 bg-slate-50/30 dark:bg-slate-950/20 min-h-[320px]">
        {visibleSteps.map((step, idx) => {
          const isLatest = idx === currentStepIndex;

          const getBadgeConfig = () => {
            switch (step.actionType) {
              case "thought":
                return {
                  label: "Reasoning Thought",
                  color: "bg-purple-500/20 text-purple-700 dark:text-purple-300 border-purple-500/30",
                };
              case "tool":
                return {
                  label: "Tool Execution",
                  color: "bg-sky-500/20 text-sky-700 dark:text-sky-300 border-sky-500/30",
                };
              case "observation":
                return {
                  label: "Environment Observation",
                  color: "bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/30",
                };
              case "escalation":
                return {
                  label: "Human Hand-off (HITL)",
                  color: "bg-red-500/20 text-red-700 dark:text-red-300 border-red-500/30",
                };
              case "final":
                return {
                  label: "Final Resolved Output",
                  color: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
                };
            }
          };

          const badge = getBadgeConfig();

          return (
            <div
              key={step.id}
              className={`p-4 rounded-xl border transition-all duration-300 ${
                isLatest
                  ? "border-teal-500/50 bg-white dark:bg-slate-900 shadow-md ring-1 ring-teal-500/20"
                  : "border-slate-200 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/50 opacity-90"
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-mono font-bold flex items-center justify-center">
                    {step.id}
                  </span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {step.title}
                  </span>
                </div>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${badge.color}`}>
                  {badge.label}
                </span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {step.detail}
              </p>

              {step.code && (
                <div className="mt-2.5 p-2.5 rounded-lg bg-slate-900 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800 leading-normal">
                  <pre>{step.code}</pre>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Playback Controls & Key Takeaway */}
      <div className="p-4 md:p-5 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevStep}
            disabled={currentStepIndex === 0}
            className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-200 dark:hover:bg-slate-700 transition"
          >
            Previous Step
          </button>
          <button
            onClick={handleNextStep}
            disabled={currentStepIndex === activeCase.steps.length - 1}
            className="px-4 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-mono font-bold shadow-sm disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-1.5"
          >
            <span>Next Step</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition"
            title="Reset to beginning"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Key Takeaway Banner */}
        <div className="text-xs text-slate-600 dark:text-slate-400 max-w-md bg-slate-50 dark:bg-slate-950 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
          <strong className="text-slate-800 dark:text-slate-200 font-semibold block mb-0.5">
            Architectural Principle:
          </strong>
          {activeCase.keyTakeaway}
        </div>
      </div>
    </div>
  );
}
