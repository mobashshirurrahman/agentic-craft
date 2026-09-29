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
            badge: "HITL Triggered",
            type: "gate",
          },
          {
            time: "00:01.150",
            sender: "SYSTEM",
            text: "PAUSING WORKFLOW: High-risk financial write action requires human sign-off.",
            type: "warning",
          },
        ]);
        setSimState("awaiting_approval");
      }, 700);
    }, 600);
  };

  const handleApprove = () => {
    setSimState("approved");
    setLogs((prev) => [
      ...prev,
      {
        time: "00:02.100",
        sender: "HUMAN",
        text: "HUMAN OPERATOR: Approved $120 refund for Order #9021.",
        badge: "Authorized",
        type: "success",
      },
      {
        time: "00:02.500",
        sender: "AGENT",
        text: "RESUMING: Executing Stripe API call process_refund(order_id=9021, amount=120.00)...",
        type: "tool",
      },
      {
        time: "00:02.900",
        sender: "TOOL",
        text: "STRIPE SUCCESS: Refund transaction tx_88291 confirmed.",
        type: "info",
      },
      {
        time: "00:03.200",
        sender: "AGENT",
        text: "WORKFLOW COMPLETE: Customer notification dispatched via email.",
        badge: "Done",
        type: "success",
      },
    ]);
    setTimeout(() => setSimState("completed"), 400);
  };

  const handleReject = () => {
    setSimState("rejected");
    setLogs((prev) => [
      ...prev,
      {
        time: "00:02.050",
        sender: "HUMAN",
        text: "HUMAN OPERATOR: Rejected full refund. Counter-offer $25 store credit voucher.",
        badge: "Rejected & Modified",
        type: "warning",
      },
      {
        time: "00:02.400",
        sender: "AGENT",
        text: "RESUMING: Issuing $25 promotional voucher code instead...",
        type: "tool",
      },
      {
        time: "00:02.800",
        sender: "AGENT",
        text: "WORKFLOW COMPLETE: Customer issued apology voucher.",
        badge: "Done",
        type: "success",
      },
    ]);
    setTimeout(() => setSimState("completed"), 400);
  };

  const resetSim = () => {
    setSimState("idle");
    setLogs([]);
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-4 sm:p-6 shadow-sm dark:shadow-2xl space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400 px-2.5 py-0.5 rounded-full bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30">
              Interactive Governance Simulator
            </span>
            <span className="text-[11px] font-mono text-slate-500">HITL Gate</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-1">
            Graduated Autonomy: Human-in-the-Loop Gate
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Test policy evaluation: Read actions execute autonomously; write actions ($120 refund) halt for human authorization
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <button
            onClick={resetSim}
            disabled={simState === "idle"}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 transition disabled:opacity-40 touch-manipulation active:scale-95"
            title="Reset simulation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={startSimulation}
            disabled={simState !== "idle"}
            className={`px-4 sm:px-5 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition shadow-sm touch-manipulation active:scale-95 ${
              simState !== "idle"
                ? "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed"
                : "bg-teal-600 hover:bg-teal-500 text-white shadow-teal-500/20"
            }`}
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            {simState === "idle" ? "Simulate Customer Refund" : "Workflow in Progress..."}
          </button>
        </div>
      </div>

      {/* Terminal Display */}
      <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs overflow-hidden">
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800 text-slate-400 text-[11px]">
          <span className="flex items-center gap-1.5 text-teal-400 font-bold">
            <Terminal className="w-3.5 h-3.5" />
            Live Execution Audit Trail
          </span>
          <span className="text-[10px] text-slate-500">
            {simState === "awaiting_approval" ? (
              <span className="text-amber-400 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                PAUSED: AWAITING HUMAN SIGN-OFF
              </span>
            ) : simState === "completed" ? (
              <span className="text-emerald-400 font-bold">WORKFLOW COMPLETED</span>
            ) : (
              "POLICY ENGINE ACTIVE"
            )}
          </span>
        </div>

        <div className="space-y-2 max-h-[260px] overflow-y-auto scrollbar-thin">
          {logs.length === 0 ? (
            <div className="text-slate-500 text-center py-10">
              <Play className="w-6 h-6 mx-auto mb-2 opacity-30" />
              <p>Click &quot;Simulate Customer Refund&quot; to test graduated autonomy gates</p>
            </div>
          ) : (
            logs.map((item, idx) => (
              <div
                key={idx}
                className={`p-2 rounded border text-xs leading-relaxed ${
                  item.type === "gate"
                    ? "bg-amber-950/40 border-amber-500/30 text-amber-200"
                    : item.type === "success"
                    ? "bg-emerald-950/40 border-emerald-500/30 text-emerald-300"
                    : item.type === "warning"
                    ? "bg-rose-950/30 border-rose-500/30 text-rose-300"
                    : item.type === "tool"
                    ? "bg-sky-950/40 border-sky-500/30 text-sky-200"
                    : "bg-slate-900 border-slate-800 text-slate-300"
                }`}
              >
                <div className="flex items-center justify-between text-[10px] text-slate-400 mb-0.5">
                  <span>[{item.time}] {item.sender}</span>
                  {item.badge && (
                    <span className="px-1.5 py-0.2 rounded bg-slate-800 text-slate-200 font-bold text-[9px]">
                      {item.badge}
                    </span>
                  )}
                </div>
                <div>{item.text}</div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Human-in-the-Loop Intercept Modal / Card */}
      {simState === "awaiting_approval" && (
        <div className="p-4 rounded-xl border border-amber-300 dark:border-amber-500/40 bg-amber-50 dark:bg-amber-950/20 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-800 dark:text-amber-400 shrink-0 mt-0.5">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-amber-950 dark:text-amber-200">
                Action Intercepted: High-Value Financial Write ($120.00)
              </h4>
              <p className="text-xs text-amber-900 dark:text-amber-300/90 leading-relaxed">
                Autonomous limit is set to <strong>$50.00</strong>. The agent has paused execution and generated a proposed Stripe refund payload. Please authorize or modify:
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
            <button
              onClick={handleApprove}
              className="w-full sm:w-auto px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-sm touch-manipulation active:scale-95"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Authorize $120 Refund</span>
            </button>

            <button
              onClick={handleReject}
              className="w-full sm:w-auto px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition touch-manipulation active:scale-95"
            >
              <XCircle className="w-4 h-4 text-rose-500" />
              <span>Reject &amp; Offer $25 Voucher</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
