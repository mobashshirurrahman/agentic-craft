"use client";

import React, { useState } from "react";
import {
  Play,
  RotateCcw,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  UserCheck,
  ShieldCheck,
  Zap,
  Terminal,
  Clock,
  ArrowRight,
  Sparkles,
} from "lucide-react";

type SimState = "idle" | "running_step1" | "awaiting_approval" | "approved" | "rejected" | "completed";

interface LogItem {
  time: string;
  sender: "SYSTEM" | "AGENT" | "TOOL" | "HUMAN";
  text: string;
  badge?: string;
  type: "info" | "tool" | "gate" | "success" | "warning";
}

export default function GraduatedAutonomySimulator() {
  const [simState, setSimState] = useState<SimState>("idle");
  const [logs, setLogs] = useState<LogItem[]>([]);

  const startSimulation = () => {
    setSimState("running_step1");
    setLogs([
      {
        time: "00:00.080",
        sender: "SYSTEM",
        text: "Incoming Customer Request: 'Order #9021 arrived late. Requesting $120 refund.'",
        type: "info",
      },
    ]);

    // Step 1: Autonomous Read Action
    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        {
          time: "00:00.420",
          sender: "AGENT",
          text: "THOUGHT: Low-risk read action. Querying order database autonomously.",
          badge: "Autonomous (Read)",
          type: "tool",
        },
        {
          time: "00:00.750",
          sender: "TOOL",
          text: "INVOKED: check_order_status(9021) -> Status: Delivered. Amount: $120.00.",
          type: "info",
        },
      ]);

      // Step 2: Policy Evaluation -> Hits Human Approval Gate
      setTimeout(() => {
        setLogs((prev) => [
          ...prev,
          {
            time: "00:01.100",
            sender: "AGENT",
            text: "POLICY CHECK: Refund amount ($120) exceeds autonomous threshold ($50.00).",
            badge: "Policy Gate",
            type: "warning",
          },
          {
            time: "00:01.250",
            sender: "SYSTEM",
            text: "PAUSING WORKFLOW: Escalating to Human-in-the-Loop (HITL) for authorization.",
            badge: "Awaiting Human",
            type: "gate",
          },
        ]);
        setSimState("awaiting_approval");
      }, 700);
    }, 600);
  };

  const handleHumanDecision = (decision: "approve" | "reject") => {
    if (decision === "approve") {
      setSimState("approved");
      setLogs((prev) => [
        ...prev,
        {
          time: "00:02.150",
          sender: "HUMAN",
          text: "OPERATOR ACTION: Refund of $120.00 APPROVED with override key.",
          badge: "Authorized",
          type: "success",
        },
        {
          time: "00:02.500",
          sender: "TOOL",
          text: "INVOKED: process_refund(order_id='9021', amount=120) -> Stripe TXN #8401 OK.",
          badge: "Write Action",
          type: "tool",
        },
        {
          time: "00:02.780",
          sender: "AGENT",
          text: "RESOLVED: 'Hello, your refund of $120.00 has been approved and processed successfully.'",
          badge: "Complete",
          type: "success",
        },
      ]);
      setSimState("completed");
    } else {
      setSimState("rejected");
      setLogs((prev) => [
        ...prev,
        {
          time: "00:02.150",
          sender: "HUMAN",
          text: "OPERATOR ACTION: Refund REJECTED. Delivery was within promised delivery window.",
          badge: "Rejected",
          type: "warning",
        },
        {
          time: "00:02.650",
          sender: "AGENT",
          text: "RESOLVED: 'Hello, after review, order #9021 met delivery SLA terms. A $15 store credit has been offered instead.'",
          badge: "Fallback Path",
          type: "info",
        },
      ]);
      setSimState("completed");
    }
  };

  const resetSimulation = () => {
    setSimState("idle");
    setLogs([]);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
      {/* Top Header */}
      <div className="p-4 md:p-5 border-b border-slate-800 bg-slate-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-400">
            <UserCheck className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              Graduated Autonomy &amp; Human-in-the-Loop Simulator
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                Interactive Gate
              </span>
            </h4>
            <p className="text-xs text-slate-400">
              Low-risk actions run autonomously; high-stakes operations pause for human sign-off
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          {simState === "idle" && (
            <button
              onClick={startSimulation}
              className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-teal-500/20 transition"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Start Graduated Flow
            </button>
          )}

          {simState !== "idle" && (
            <button
              onClick={resetSimulation}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition"
              title="Reset simulation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main Simulation Arena */}
      <div className="p-5 space-y-4">
        {/* HITL Live Gate Alert (Visible when agent requests authorization) */}
        {simState === "awaiting_approval" && (
          <div className="p-4 rounded-xl border border-amber-500/50 bg-amber-500/10 space-y-3 animate-pulse">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-xs font-mono">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>HUMAN-IN-THE-LOOP APPROVAL REQUIRED</span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                Policy Limit: $50.00 Max
              </span>
            </div>

            <p className="text-xs md:text-sm text-slate-200">
              The AI agent is requesting authorization to execute:{" "}
              <code className="text-amber-300 font-mono font-bold">process_refund(order_id=&apos;9021&apos;, amount=$120.00)</code>.
              Do you authorize this transaction?
            </p>

            <div className="flex items-center gap-2.5 pt-1">
              <button
                onClick={() => handleHumanDecision("approve")}
                className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20 transition"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Approve Refund ($120.00)
              </button>
              <button
                onClick={() => handleHumanDecision("reject")}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1.5 transition border border-slate-700"
              >
                <XCircle className="w-3.5 h-3.5 text-red-400" />
                Reject &amp; Offer Credit
              </button>
            </div>
          </div>
        )}

        {/* Live Terminal Stream */}
        <div className="rounded-xl border border-slate-850 bg-slate-950 p-4 font-mono text-xs">
          <div className="flex items-center justify-between text-slate-500 pb-2 mb-3 border-b border-slate-900 text-[11px]">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-teal-400" />
              <span className="text-slate-300 font-bold">Execution &amp; Audit Trail</span>
            </div>
            <span className="text-slate-500">Autonomous Tier: Hybrid L5/L6</span>
          </div>

          {logs.length === 0 ? (
            <div className="py-6 text-center text-slate-600">
              Click <strong className="text-slate-400">Start Graduated Flow</strong> to trace how low-risk tasks execute automatically and high-risk actions halt for operator sign-off.
            </div>
          ) : (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {logs.map((log, idx) => (
                <div
                  key={idx}
                  className={`p-2.5 rounded-lg border flex items-start gap-2.5 ${
                    log.type === "success"
                      ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-200"
                      : log.type === "gate"
                      ? "bg-amber-950/40 border-amber-500/40 text-amber-200 font-semibold"
                      : log.type === "warning"
                      ? "bg-amber-950/20 border-amber-500/30 text-amber-300"
                      : "bg-slate-900/60 border-slate-850 text-slate-300"
                  }`}
                >
                  <span className="text-[10px] text-slate-500 shrink-0 mt-0.5">{log.time}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] font-bold text-slate-400">{log.sender}</span>
                      {log.badge && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                          {log.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] leading-relaxed break-words">{log.text}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
