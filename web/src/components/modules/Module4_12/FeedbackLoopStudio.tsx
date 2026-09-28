"use client";
import React, { useState } from "react";
import {
  Sparkles,
  GitBranch,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Users,
  MessageSquare,
  Sliders,
  ShieldCheck,
  RefreshCw,
  Zap,
} from "lucide-react";

interface FeedbackCase {
  id: string;
  userPrompt: string;
  agentResponse: string;
  rating: "negative" | "positive";
  userCritique: string;
  category: "Knowledge Gap" | "Tool Overuse" | "Tone & Persona";
}

const PRODUCTION_FEEDBACK: FeedbackCase[] = [
  {
    id: "fb-1",
    userPrompt: "Can I return open-box headphones bought on Black Friday?",
    agentResponse: "All purchases have a 90-day no-questions-asked refund policy.",
    rating: "negative",
    userCritique: "Wrong! Policy says electronics have a 14-day limit. The agent hallucinated 90 days.",
    category: "Knowledge Gap",
  },
  {
    id: "fb-2",
    userPrompt: "What is your store phone number in Seattle?",
    agentResponse: "[Agent made 8 web searches, 4 database queries, latency: 9.8s] The phone number is 206-555-0199.",
    rating: "negative",
    userCritique: "It took 10 seconds for a simple store phone number. Why so slow?",
    category: "Tool Overuse",
  },
  {
    id: "fb-3",
    userPrompt: "My package was stolen from my porch, please help me immediately!",
    agentResponse: "Per section 4.2 of terms of service, courier handoff terminates carrier liability. Case closed.",
    rating: "negative",
    userCritique: "Completely cold and robotic! No empathy, felt like speaking to a brick wall.",
    category: "Tone & Persona",
  },
];

export default function FeedbackLoopStudio() {
  const [selectedCase, setSelectedCase] = useState<string>("fb-1");
  const [trafficSplit, setTrafficSplit] = useState<number>(10); // 10% Canary Treatment
  const [analyzingWithMetaLLM, setAnalyzingWithMetaLLM] = useState<boolean>(false);
  const [optimizedCandidate, setOptimizedCandidate] = useState<string | null>(null);
  const [regressionTested, setRegressionTested] = useState<boolean>(false);
  const [deployedToProduction, setDeployedToProduction] = useState<boolean>(false);

  const activeFeedback = PRODUCTION_FEEDBACK.find((c) => c.id === selectedCase)!;

  const handleGenerateMetaFix = () => {
    setAnalyzingWithMetaLLM(true);
    setOptimizedCandidate(null);
    setRegressionTested(false);
    setDeployedToProduction(false);

    setTimeout(() => {
      setAnalyzingWithMetaLLM(false);
      if (activeFeedback.category === "Knowledge Gap") {
        setOptimizedCandidate(
          `System Prompt v2.1 Patch:
1. Grounding Rule: Never extrapolate return windows.
2. If electronics or open-box, strictly query the 'policy_lookup_tool' with parameter category='electronics'.
3. Always cite specific section from the retrieved policy document.`
        );
      } else if (activeFeedback.category === "Tool Overuse") {
        setOptimizedCandidate(
          `System Prompt v2.1 Patch:
1. Static Lookup Short-Circuit: Maintain local key-value store of top 100 FAQ facts (store locations, phone numbers, hours).
2. Do not invoke external multi-step search tools for simple directory lookups.`
        );
      } else {
        setOptimizedCandidate(
          `System Prompt v2.1 Patch:
1. Empathetic First Turn: Acknowledge user distress before referencing any policy (e.g. 'I am so sorry to hear your package went missing').
2. Provide actionable escalation path to human logistics claims team.`
        );
      }
    }, 700);
  };

  const handleRunRegressionTest = () => {
    setRegressionTested(true);
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-4 md:p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
            Interactive Continuous Improvement Engine
          </span>
          <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white">
            Agent Feedback & A/B Canary Deployment Studio
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Ingesting Production Traces
        </div>
      </div>

      <div className="p-5 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Negative User Feedback Traces */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-rose-500" />
              1. Flagged User Critiques
            </span>
            <span className="text-[11px] font-mono text-slate-400">3 clusters</span>
          </div>

          <div className="space-y-2.5">
            {PRODUCTION_FEEDBACK.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedCase(item.id);
                  setOptimizedCandidate(null);
                  setRegressionTested(false);
                  setDeployedToProduction(false);
                }}
                className={`w-full text-left p-3.5 rounded-xl border text-xs transition space-y-1.5 ${
                  selectedCase === item.id
                    ? "border-teal-500 bg-teal-50/50 dark:bg-teal-950/30 text-teal-900 dark:text-teal-200 shadow-sm"
                    : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 text-slate-700 dark:text-slate-300"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold truncate">{item.userPrompt}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 shrink-0">
                    {item.category}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-1 italic">
                  &ldquo;{item.userCritique}&rdquo;
                </p>
              </button>
            ))}
          </div>

          {/* Detailed view of selected feedback */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-2.5 text-xs">
            <div className="text-[11px] font-mono font-bold uppercase text-slate-400">
              Trace Breakdown
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">User Input:</span>
              <p className="font-semibold text-slate-800 dark:text-slate-200">{activeFeedback.userPrompt}</p>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Agent Generated Output:</span>
              <p className="text-rose-700 dark:text-rose-400 font-mono text-[11px] bg-rose-50 dark:bg-rose-950/30 p-2 rounded border border-rose-200 dark:border-rose-900/50">
                {activeFeedback.agentResponse}
              </p>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">User Thumbs-Down Critique:</span>
              <p className="text-slate-700 dark:text-slate-300 italic bg-white dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-800">
                &ldquo;{activeFeedback.userCritique}&rdquo;
              </p>
            </div>

            <button
              onClick={handleGenerateMetaFix}
              disabled={analyzingWithMetaLLM}
              className="w-full mt-2 py-2.5 px-3 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-1.5 transition shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              {analyzingWithMetaLLM ? "Analyzing Failure Cluster..." : "Generate Fix via Meta-LLM"}
            </button>
          </div>
        </div>

        {/* Right Column: Meta-LLM Fix Candidate & A/B Canary Split */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <GitBranch className="w-3.5 h-3.5 text-indigo-500" />
              2. Meta-Prompt Improvement & Canary A/B Test
            </span>
            <span className="text-[11px] font-mono text-teal-600 dark:text-teal-400">
              Safe Rollout Gate
            </span>
          </div>

          {/* Generated candidate card */}
          {optimizedCandidate ? (
            <div className="p-4 rounded-xl border border-teal-200 dark:border-teal-900/50 bg-teal-50/30 dark:bg-teal-950/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-teal-700 dark:text-teal-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-teal-500" />
                  Proposed Prompt Treatment Candidate (v2.1)
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-500/20 text-teal-700 dark:text-teal-300">
                  Target: {activeFeedback.category}
                </span>
              </div>

              <pre className="p-3 rounded-lg bg-slate-900 text-teal-300 font-mono text-xs overflow-x-auto whitespace-pre-wrap leading-relaxed">
                {optimizedCandidate}
              </pre>

              {/* Step 3: Run Golden Dataset Regression Test */}
              <div className="pt-2 border-t border-teal-200 dark:border-teal-900/40 flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-slate-600 dark:text-slate-300">
                  {regressionTested ? (
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4" />
                      10/10 Golden Test Cases Passed! No Regressions.
                    </span>
                  ) : (
                    <span>Pre-requisite: Verify against Golden Dataset before traffic split.</span>
                  )}
                </div>

                <button
                  onClick={handleRunRegressionTest}
                  disabled={regressionTested}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition ${
                    regressionTested
                      ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 cursor-default"
                      : "bg-indigo-600 hover:bg-indigo-700 text-white"
                  }`}
                >
                  {regressionTested ? "Validated" : "Run Regression Suite"}
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-xl border border-dashed border-slate-300 dark:border-slate-800 text-center space-y-2">
              <RefreshCw className="w-6 h-6 text-slate-400 mx-auto animate-spin" />
              <p className="text-xs text-slate-500">
                Select a failure trace on the left and click <strong>&ldquo;Generate Fix via Meta-LLM&rdquo;</strong> to generate an optimized prompt candidate!
              </p>
            </div>
          )}

          {/* Traffic Split Slider & Deployment */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-teal-500" />
                Live Traffic Canary Split
              </span>
              <div className="flex items-center gap-3 text-xs font-mono font-bold">
                <span className="text-slate-500">Control (v2.0): {100 - trafficSplit}%</span>
                <span className="text-teal-600 dark:text-teal-400">Treatment (v2.1): {trafficSplit}%</span>
              </div>
            </div>

            <input
              type="range"
              min="1"
              max="50"
              value={trafficSplit}
              onChange={(e) => setTrafficSplit(Number(e.target.value))}
              disabled={!regressionTested}
              className="w-full accent-teal-500 cursor-pointer disabled:opacity-40"
            />

            <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 block">Guardrail Latency</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">1.24s (Safe)</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 block">Token Burn Rate</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">$0.003/req</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 block">User CSAT Delta</span>
                <span className="font-bold text-teal-600 dark:text-teal-400">+14.2%</span>
              </div>
            </div>

            <button
              onClick={() => setDeployedToProduction(true)}
              disabled={!regressionTested || deployedToProduction}
              className={`w-full py-2.5 rounded-xl font-semibold text-xs tracking-wider uppercase transition shadow-sm flex items-center justify-center gap-1.5 ${
                deployedToProduction
                  ? "bg-emerald-600 text-white cursor-default"
                  : "bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 disabled:opacity-40"
              }`}
            >
              {deployedToProduction ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Successfully Promoted to 100% Production Traffic!
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  Promote Canary (v2.1) to 100% Production
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
