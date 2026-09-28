"use client";

import React, { useState } from "react";
import {
  AlertTriangle,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  Play,
  KeyRound,
  Zap,
  ServerCrash,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react";

interface ErrorScenario {
  id: string;
  code: string;
  name: string;
  description: string;
  rawError: string;
}

const ERROR_SCENARIOS: ErrorScenario[] = [
  {
    id: "429",
    code: "HTTP 429",
    name: "Rate Limit Exceeded (TPM/RPM)",
    description: "Your application exceeded the Tokens Per Minute limit during a burst of concurrent tool calls.",
    rawError: "RateLimitError: Error code: 429 - {'error': {'message': 'Rate limit reached for requests per min (RPM) on tier 2.'}}",
  },
  {
    id: "503",
    code: "HTTP 503",
    name: "Service Unavailable / Outage",
    description: "The upstream LLM provider is experiencing an infrastructure outage or high-load throttling.",
    rawError: "APIConnectionError: Error code: 503 - {'error': {'message': 'The server is temporarily unable to service your request due to capacity.'}}",
  },
  {
    id: "401",
    code: "HTTP 401",
    name: "Authentication Failure",
    description: "API key is missing, improperly formatted, or has been revoked.",
    rawError: "AuthenticationError: Error code: 401 - {'error': {'message': 'Incorrect API key provided: sk-proj-***. You can find your API key at...'}}",
  },
];

export default function ApiErrorTroubleshooter() {
  const [selectedErrorId, setSelectedErrorId] = useState<string>("429");
  const [backoffEnabled, setBackoffEnabled] = useState<boolean>(true);
  const [fallbackEnabled, setFallbackEnabled] = useState<boolean>(true);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationLogs, setSimulationLogs] = useState<string[]>([]);

  const selectedScenario =
    ERROR_SCENARIOS.find((s) => s.id === selectedErrorId) || ERROR_SCENARIOS[0];

  const handleSimulate = () => {
    setIsSimulating(true);
    setSimulationLogs([`[Client] Dispatching request to primary model (gpt-4o)...`]);

    setTimeout(() => {
      if (selectedScenario.id === "401") {
        setSimulationLogs((prev) => [
          ...prev,
          `[Response] ❌ ${selectedScenario.rawError}`,
          `[Fatal] 401 Authentication errors cannot be resolved by retrying. Verify API key in .env!`,
        ]);
        setIsSimulating(false);
        return;
      }

      if (selectedScenario.id === "429") {
        setSimulationLogs((prev) => [...prev, `[Response] ⚠️ ${selectedScenario.rawError}`]);

        if (backoffEnabled) {
          setTimeout(() => {
            setSimulationLogs((prev) => [
              ...prev,
              `[Retry 1] Backoff wait 1.2s (with jitter)...`,
              `[Client] Retrying request to primary model...`,
              `[Success] ✅ HTTP 200 OK — Request successfully processed after backoff delay!`,
            ]);
            setIsSimulating(false);
          }, 600);
        } else {
          setSimulationLogs((prev) => [
            ...prev,
            `[Fatal] Exponential backoff is disabled! Burst queries immediately failed. Run crashed.`,
          ]);
          setIsSimulating(false);
        }
        return;
      }

      if (selectedScenario.id === "503") {
        setSimulationLogs((prev) => [...prev, `[Response] ❌ ${selectedScenario.rawError}`]);

        if (fallbackEnabled) {
          setTimeout(() => {
            setSimulationLogs((prev) => [
              ...prev,
              `[Circuit Breaker] Primary provider 503 detected. Activating Fallback Router!`,
              `[Client] Seamlessly routing request to secondary model (claude-3-5-haiku)...`,
              `[Success] ✅ HTTP 200 OK (from Fallback Provider) — Zero user-facing downtime!`,
            ]);
            setIsSimulating(false);
          }, 600);
        } else {
          setSimulationLogs((prev) => [
            ...prev,
            `[Fatal] Fallback routing is disabled! Primary outage caused total service disruption.`,
          ]);
          setIsSimulating(false);
        }
        return;
      }
    }, 600);
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm overflow-hidden transition-colors">
      {/* Header */}
      <div className="p-5 md:p-6 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-red-500/10 via-amber-500/5 to-transparent">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-600 dark:text-red-400 flex items-center justify-center font-bold">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                Production API Error & Resilience Lab
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-red-500/20 text-red-700 dark:text-red-300 border border-red-500/30">
                  HTTP & Retries
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Simulate common API errors (401, 429, 503) and test self-healing mitigations in real time
              </p>
            </div>
          </div>

          <button
            onClick={() => setSimulationLogs([])}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-xs font-mono text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Clear Logs
          </button>
        </div>

        {/* Error Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-5">
          {ERROR_SCENARIOS.map((s) => {
            const isSelected = selectedErrorId === s.id;
            return (
              <button
                key={s.id}
                onClick={() => {
                  setSelectedErrorId(s.id);
                  setSimulationLogs([]);
                }}
                className={`p-3 rounded-xl border text-left transition ${
                  isSelected
                    ? "border-red-500 bg-red-500/15 text-slate-900 dark:text-white ring-1 ring-red-500/30"
                    : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-slate-600 dark:text-slate-400"
                }`}
              >
                <div className="text-xs font-mono font-bold text-red-600 dark:text-red-400">
                  {s.code}
                </div>
                <div className="text-xs font-bold mt-0.5">{s.name}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid */}
      <div className="p-5 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Mitigations & Trigger (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold pb-2 border-b border-slate-200 dark:border-slate-800">
            Resilience Defenses
          </div>

          {/* Toggle 1: Exponential Backoff */}
          <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">
                Exponential Backoff (Tenacity)
              </div>
              <div className="text-[10px] text-slate-500">Jittered delay between 429 retries</div>
            </div>
            <button
              onClick={() => setBackoffEnabled(!backoffEnabled)}
              className={`text-xs font-mono px-3 py-1 rounded-lg border font-bold transition ${
                backoffEnabled
                  ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/40"
                  : "bg-slate-200 dark:bg-slate-800 text-slate-500 border-slate-300 dark:border-slate-700"
              }`}
            >
              {backoffEnabled ? "ON" : "OFF"}
            </button>
          </div>

          {/* Toggle 2: Model Fallback */}
          <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">
                Multi-Provider Fallback Router
              </div>
              <div className="text-[10px] text-slate-500">Auto-routes to Claude/Gemini on 503</div>
            </div>
            <button
              onClick={() => setFallbackEnabled(!fallbackEnabled)}
              className={`text-xs font-mono px-3 py-1 rounded-lg border font-bold transition ${
                fallbackEnabled
                  ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/40"
                  : "bg-slate-200 dark:bg-slate-800 text-slate-500 border-slate-300 dark:border-slate-700"
              }`}
            >
              {fallbackEnabled ? "ON" : "OFF"}
            </button>
          </div>

          <button
            onClick={handleSimulate}
            disabled={isSimulating}
            className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold transition flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>{isSimulating ? "Simulating Error..." : `Simulate ${selectedScenario.code}`}</span>
          </button>

          {/* Python Fallback Pattern Code */}
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-mono text-[11px] overflow-x-auto">
            <span className="text-slate-500"># LangChain Fallback Pattern:</span>
            <pre className="text-amber-300 mt-1">{`primary = ChatOpenAI(model="gpt-4o")
fallback = ChatAnthropic(model="claude-3-5-haiku")

# Self-healing fallback model!
resilient_model = primary.with_fallbacks([fallback])`}</pre>
          </div>
        </div>

        {/* Right: Simulation Telemetry Log (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
            <span>Runtime Network Telemetry</span>
            <span className="text-[10px] font-mono text-red-500">
              Scenario: {selectedScenario.code}
            </span>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            {selectedScenario.description}
          </p>

          <div className="p-4 rounded-xl bg-slate-950 font-mono text-xs border border-slate-800 space-y-2 min-h-[220px]">
            <div className="text-[10px] text-slate-400 border-b border-slate-800 pb-1 flex items-center justify-between">
              <span>HTTP REQUEST / RESPONSE LIFECYCLE</span>
              <span className="text-amber-400">STATUS LOG</span>
            </div>

            {simulationLogs.length > 0 ? (
              <div className="space-y-1.5">
                {simulationLogs.map((log, idx) => (
                  <div
                    key={idx}
                    className={`text-[11px] leading-relaxed ${
                      log.includes("✅")
                        ? "text-emerald-400 font-bold"
                        : log.includes("❌") || log.includes("Fatal")
                        ? "text-red-400 font-bold"
                        : log.includes("⚠️")
                        ? "text-amber-300"
                        : "text-slate-300"
                    }`}
                  >
                    {log}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-slate-500 text-center py-10">
                Click &ldquo;Simulate {selectedScenario.code}&rdquo; to observe network telemetry and mitigation logic.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
