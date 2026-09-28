"use client";

import React, { useState } from "react";
import {
  DollarSign,
  Clock,
  Activity,
  Layers,
  Sparkles,
  TrendingDown,
  CheckCircle2,
  Cpu,
  BarChart3,
  Sliders,
} from "lucide-react";

interface ModelConfig {
  name: string;
  provider: string;
  inputPerM: number;
  outputPerM: number;
  avgTtftMs: number;
  avgTotalSec: number;
}

const MODELS: Record<string, ModelConfig> = {
  "gpt-4o": {
    name: "GPT-4o",
    provider: "OpenAI",
    inputPerM: 2.5,
    outputPerM: 10.0,
    avgTtftMs: 380,
    avgTotalSec: 1.8,
  },
  "claude-3-5-sonnet": {
    name: "Claude 3.5 Sonnet",
    provider: "Anthropic",
    inputPerM: 3.0,
    outputPerM: 15.0,
    avgTtftMs: 420,
    avgTotalSec: 2.1,
  },
  "gemini-1-5-flash": {
    name: "Gemini 1.5 Flash",
    provider: "Google",
    inputPerM: 0.075,
    outputPerM: 0.3,
    avgTtftMs: 190,
    avgTotalSec: 0.9,
  },
};

export default function AgentTelemetryCostStudio() {
  const [selectedModelKey, setSelectedModelKey] = useState<string>("gpt-4o");
  const [dailyVolume, setDailyVolume] = useState<number>(5000);
  const [avgInputTokens, setAvgInputTokens] = useState<number>(1500);
  const [avgOutputTokens, setAvgOutputTokens] = useState<number>(400);
  const [enablePromptCaching, setEnablePromptCaching] = useState<boolean>(true);

  const model = MODELS[selectedModelKey];

  // Financial Calculations
  const cacheDiscount = enablePromptCaching ? 0.5 : 0; // 50% discount on cached input tokens
  const effectiveInputCostPerM = model.inputPerM * (1 - cacheDiscount * 0.7); // assuming 70% cache hit rate

  const costPerTask =
    (avgInputTokens / 1_000_000) * effectiveInputCostPerM +
    (avgOutputTokens / 1_000_000) * model.outputPerM;

  const monthlyCost = costPerTask * dailyVolume * 30;
  const costPer1kTasks = costPerTask * 1000;

  // Latency Waterfall Nodes
  const nodes = [
    { name: "guardrail_verification", timeMs: 14, color: "bg-emerald-500", pct: 1 },
    { name: "planner_reasoning_node", timeMs: Math.round(model.avgTotalSec * 450), color: "bg-blue-500", pct: 45 },
    { name: "tool_execution_api", timeMs: 280, color: "bg-amber-500", pct: 20 },
    { name: "synthesis_and_formatting", timeMs: Math.round(model.avgTotalSec * 350), color: "bg-purple-500", pct: 34 },
  ];

  const totalLatencyMs = nodes.reduce((acc, n) => acc + n.timeMs, 0);

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm overflow-hidden transition-colors">
      {/* Header */}
      <div className="p-5 md:p-6 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-sky-500/10 via-blue-500/5 to-transparent">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base md:text-lg text-slate-900 dark:text-white">
                Production Agent Telemetry & Cost Studio
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Model real-world agent operating expenses, node latencies, and token unit economics
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/30">
              Live Financial Model
            </span>
          </div>
        </div>
      </div>

      <div className="p-5 md:p-6 space-y-6">
        {/* Controls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Model Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase">
              Primary Model
            </label>
            <div className="space-y-1">
              {Object.entries(MODELS).map(([key, cfg]) => (
                <button
                  key={key}
                  onClick={() => setSelectedModelKey(key)}
                  className={`w-full text-left p-2.5 rounded-lg border text-xs font-mono transition flex items-center justify-between ${
                    selectedModelKey === key
                      ? "border-sky-500 bg-sky-50/50 dark:bg-sky-950/40 text-sky-900 dark:text-sky-200 font-bold"
                      : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:border-slate-300"
                  }`}
                >
                  <span>{cfg.name}</span>
                  <span className="text-[10px] text-slate-500">{cfg.provider}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Daily Task Volume Slider */}
          <div className="space-y-2 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="font-bold text-slate-700 dark:text-slate-300">Daily Requests</span>
              <span className="text-sky-600 dark:text-sky-400 font-bold">
                {dailyVolume.toLocaleString()} / day
              </span>
            </div>
            <input
              type="range"
              min={500}
              max={50000}
              step={500}
              value={dailyVolume}
              onChange={(e) => setDailyVolume(Number(e.target.value))}
              className="w-full accent-sky-500 cursor-pointer"
            />
            <span className="text-[11px] text-slate-500 block">
              {(dailyVolume * 30).toLocaleString()} requests/month
            </span>
          </div>

          {/* Input & Output Token Length */}
          <div className="space-y-2 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="font-bold text-slate-700 dark:text-slate-300">Input Tokens</span>
              <span className="text-sky-600 dark:text-sky-400 font-bold">{avgInputTokens}</span>
            </div>
            <input
              type="range"
              min={200}
              max={8000}
              step={100}
              value={avgInputTokens}
              onChange={(e) => setAvgInputTokens(Number(e.target.value))}
              className="w-full accent-sky-500 cursor-pointer"
            />
            <div className="flex justify-between items-center text-xs font-mono pt-1">
              <span className="font-bold text-slate-700 dark:text-slate-300">Output Tokens</span>
              <span className="text-purple-600 dark:text-purple-400 font-bold">{avgOutputTokens}</span>
            </div>
            <input
              type="range"
              min={50}
              max={2000}
              step={50}
              value={avgOutputTokens}
              onChange={(e) => setAvgOutputTokens(Number(e.target.value))}
              className="w-full accent-purple-500 cursor-pointer"
            />
          </div>

          {/* Optimization Toggle */}
          <div className="space-y-2 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase block mb-1">
                Prompt Caching
              </span>
              <p className="text-[11px] text-slate-500 leading-tight">
                Anthropic/OpenAI prompt cache reuse (cuts input token costs by up to 50%).
              </p>
            </div>
            <button
              onClick={() => setEnablePromptCaching(!enablePromptCaching)}
              className={`w-full py-2 rounded-lg text-xs font-mono font-bold transition flex items-center justify-center gap-2 ${
                enablePromptCaching
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              {enablePromptCaching ? "Caching Enabled (-35%)" : "No Caching (Standard)"}
            </button>
          </div>
        </div>

        {/* Real-Time Telemetry KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase text-slate-500">
              Monthly LLM API Bill
            </span>
            <div className="text-2xl font-mono font-extrabold text-slate-900 dark:text-white flex items-baseline gap-1">
              <span>${monthlyCost.toFixed(2)}</span>
              <span className="text-xs font-normal text-slate-500">/mo</span>
            </div>
            <p className="text-[11px] text-slate-500">
              ${costPer1kTasks.toFixed(3)} per 1,000 tasks
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase text-slate-500">
              Unit Cost Per Resolution
            </span>
            <div className="text-2xl font-mono font-extrabold text-sky-600 dark:text-sky-400 flex items-baseline gap-1">
              <span>${(costPerTask * 100).toFixed(3)}¢</span>
              <span className="text-xs font-normal text-slate-500">/task</span>
            </div>
            <p className="text-[11px] text-slate-500">
              {avgInputTokens + avgOutputTokens} tokens consumed
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase text-slate-500">
              Time to First Token (TTFT)
            </span>
            <div className="text-2xl font-mono font-extrabold text-emerald-600 dark:text-emerald-400 flex items-baseline gap-1">
              <span>{model.avgTtftMs}ms</span>
              <span className="text-xs font-normal text-slate-500">P50</span>
            </div>
            <p className="text-[11px] text-slate-500">User perceives instant response</p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase text-slate-500">
              End-to-End Latency
            </span>
            <div className="text-2xl font-mono font-extrabold text-purple-600 dark:text-purple-400 flex items-baseline gap-1">
              <span>{(totalLatencyMs / 1000).toFixed(2)}s</span>
              <span className="text-xs font-normal text-slate-500">total</span>
            </div>
            <p className="text-[11px] text-slate-500">Across all 4 graph nodes</p>
          </div>
        </div>

        {/* Per-Node Latency Waterfall Breakdown */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase text-slate-700 dark:text-slate-300">
              Graph Node Latency Waterfall Breakdown
            </span>
            <span className="text-xs font-mono text-slate-500">
              Total Execution: {totalLatencyMs}ms
            </span>
          </div>

          {/* Stacked Bar */}
          <div className="h-3 w-full rounded-full bg-slate-200 dark:bg-slate-800 flex overflow-hidden">
            {nodes.map((n) => (
              <div
                key={n.name}
                style={{ width: `${(n.timeMs / totalLatencyMs) * 100}%` }}
                className={`${n.color} transition-all`}
                title={`${n.name}: ${n.timeMs}ms`}
              />
            ))}
          </div>

          {/* Node Items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 pt-1">
            {nodes.map((n) => (
              <div
                key={n.name}
                className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono space-y-1"
              >
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${n.color}`} />
                  <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 truncate">
                    {n.name}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-[11px] text-slate-500">
                  <span>{n.timeMs}ms</span>
                  <span>{((n.timeMs / totalLatencyMs) * 100).toFixed(0)}% of total</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
