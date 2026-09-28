"use client";
import React, { useState } from "react";
import {
  Server,
  Database,
  HardDrive,
  ShieldAlert,
  Sliders,
  DollarSign,
  Activity,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Zap,
} from "lucide-react";

export default function DistributedScaleSimulator() {
  const [trafficRps, setTrafficRps] = useState<number>(500);
  const [tokenBudgetCapEnabled, setTokenBudgetCapEnabled] = useState<boolean>(true);
  const [tenantAttackActive, setTenantAttackActive] = useState<boolean>(false);
  const [gracefulDrainActive, setGracefulDrainActive] = useState<boolean>(false);

  // Calculations
  const baseCostPerMin = (trafficRps * 0.0012).toFixed(2);
  const runawayCostPerMin = tenantAttackActive
    ? tokenBudgetCapEnabled
      ? "$1.40 (Capped by Circuit Breaker)"
      : "$84.50/min (UNLIMITED DRAIN!)"
    : `$${baseCostPerMin}/min`;

  const hotKeysCount = Math.round(trafficRps * 1.8);
  const warmCheckpoints = Math.round(trafficRps * 0.4);
  const coldArtifactsMB = (trafficRps * 0.25).toFixed(1);

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-4 md:p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
            High-Concurrency Architecture
          </span>
          <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white">
            Distributed Scale, 3-Tier Storage & Token Budget Simulator
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold border ${
              tenantAttackActive && !tokenBudgetCapEnabled
                ? "bg-rose-500/20 text-rose-600 border-rose-500/30 animate-pulse"
                : "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
            }`}
          >
            {tenantAttackActive && !tokenBudgetCapEnabled ? "RUNAWAY SPEND DETECTED" : "SYSTEM STABLE"}
          </span>
        </div>
      </div>

      <div className="p-5 md:p-6 space-y-6">
        {/* Controls Toolbar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
          {/* Traffic Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-500">Concurrency Load:</span>
              <strong className="text-slate-900 dark:text-white">{trafficRps} RPS</strong>
            </div>
            <input
              type="range"
              min="50"
              max="2000"
              step="50"
              value={trafficRps}
              onChange={(e) => setTrafficRps(Number(e.target.value))}
              className="w-full accent-teal-500 cursor-pointer"
            />
            <span className="text-[10px] text-slate-400 block">Simulates I/O bound concurrent agent sessions</span>
          </div>

          {/* Token Budget Toggle */}
          <div className="flex flex-col justify-between">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Token Budget Cap</span>
            <button
              onClick={() => setTokenBudgetCapEnabled(!tokenBudgetCapEnabled)}
              className={`py-2 px-3 rounded-lg text-xs font-mono font-bold transition border ${
                tokenBudgetCapEnabled
                  ? "bg-teal-500/20 text-teal-700 dark:text-teal-300 border-teal-500/40"
                  : "bg-rose-500/20 text-rose-700 dark:text-rose-400 border-rose-500/40"
              }`}
            >
              {tokenBudgetCapEnabled ? "Shield Active ($20/tenant cap)" : "Disabled (Dangerous)"}
            </button>
            <span className="text-[10px] text-slate-400 block mt-1">Stops infinite reasoning loops</span>
          </div>

          {/* Runaway Loop Attack Simulation */}
          <div className="flex flex-col justify-between">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Chaos Injection</span>
            <button
              onClick={() => setTenantAttackActive(!tenantAttackActive)}
              className={`py-2 px-3 rounded-lg text-xs font-mono font-bold transition border ${
                tenantAttackActive
                  ? "bg-rose-600 text-white border-rose-700"
                  : "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:border-rose-400"
              }`}
            >
              {tenantAttackActive ? "Stop Runaway Loop" : "Inject Runaway Loop Loophole"}
            </button>
            <span className="text-[10px] text-slate-400 block mt-1">Tenant triggering recursive tools</span>
          </div>
        </div>

        {/* 3-Tier Storage Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Tier 1: Hot Storage (Redis Cluster) */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2.5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500" />
                Hot Storage (Redis)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-700 dark:text-amber-400 font-bold">
                ~1ms Latency
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Holds active conversation memory, current step scratchpad, and ephemeral lock states.
            </p>
            <div className="pt-2 font-mono text-xs space-y-1 text-slate-600 dark:text-slate-300">
              <div>Active Keys: <strong className="text-slate-900 dark:text-white">{hotKeysCount}</strong></div>
              <div>TTL Expiry: <strong className="text-slate-900 dark:text-white">60 min auto-purge</strong></div>
            </div>
          </div>

          {/* Tier 2: Warm Storage (PostgreSQL Replicas) */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2.5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Database className="w-4 h-4 text-indigo-500" />
                Warm Storage (Postgres)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-700 dark:text-indigo-400 font-bold">
                ~12ms Latency
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Durable LangGraph state checkpoints, thread history, and tenant billing logs. Read replicas offload queries.
            </p>
            <div className="pt-2 font-mono text-xs space-y-1 text-slate-600 dark:text-slate-300">
              <div>Checkpoints: <strong className="text-slate-900 dark:text-white">{warmCheckpoints} / min</strong></div>
              <div>Read Replicas: <strong className="text-slate-900 dark:text-white">3 nodes balanced</strong></div>
            </div>
          </div>

          {/* Tier 3: Cold Storage (AWS S3 / Cloud Storage) */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2.5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <HardDrive className="w-4 h-4 text-teal-500" />
                Cold Storage (S3 / Blob)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-500/20 text-teal-700 dark:text-teal-400 font-bold">
                Low-Cost Bucket
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Large raw artifacts offloaded from database (scraped 5MB HTML pages, generated PDFs, audio files).
            </p>
            <div className="pt-2 font-mono text-xs space-y-1 text-slate-600 dark:text-slate-300">
              <div>Ingestion: <strong className="text-slate-900 dark:text-white">{coldArtifactsMB} MB / min</strong></div>
              <div>Storage Cost: <strong className="text-emerald-500">$0.023 / GB</strong></div>
            </div>
          </div>
        </div>

        {/* Live Cost & Spend Burn Rate Monitor */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-900 text-slate-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              Real-Time LLM Token Burn Rate
            </span>
            <span className="text-xs font-mono font-bold text-emerald-400">
              {runawayCostPerMin}
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                tenantAttackActive && !tokenBudgetCapEnabled
                  ? "bg-rose-500 w-full animate-pulse"
                  : "bg-emerald-500 w-1/4"
              }`}
            />
          </div>
          {tenantAttackActive && tokenBudgetCapEnabled && (
            <p className="text-xs text-emerald-400 flex items-center gap-1 font-mono pt-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Token Budget Circuit Breaker blocked rogue tenant after $1.40! Saved ~$5,000/hour.
            </p>
          )}
          {tenantAttackActive && !tokenBudgetCapEnabled && (
            <p className="text-xs text-rose-400 flex items-center gap-1 font-mono pt-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              CRITICAL: Rogue tenant burning tokens uncontrollably without budget enforcement!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
