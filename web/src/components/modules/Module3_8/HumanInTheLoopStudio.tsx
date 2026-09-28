"use client";

import React, { useState } from "react";
import {
  UserCheck,
  Play,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Edit3,
  PauseCircle,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";

export default function HumanInTheLoopStudio() {
  const [customerName, setCustomerName] = useState<string>("Acme Corp (ID: #4091)");
  const [proposedRefund, setProposedRefund] = useState<number>(2500);
  const [editedRefund, setEditedRefund] = useState<number>(2500);
  const [reason, setReason] = useState<string>("SLA breach: 4 hours server downtime on Production cluster.");

  const [graphStatus, setGraphStatus] = useState<"idle" | "running" | "paused_breakpoint" | "approved" | "rejected">("idle");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [finalLog, setFinalLog] = useState<string | null>(null);

  const startAgent = () => {
    setGraphStatus("running");
    setFinalLog(null);
    setIsEditing(false);

    // Runs analysis node, then pauses at breakpoint
    setTimeout(() => {
      setGraphStatus("paused_breakpoint");
    }, 700);
  };

  const handleApprove = () => {
    setGraphStatus("approved");
    setFinalLog(`✅ Transaction approved by human admin: $${editedRefund} credited to ${customerName}.`);
  };

  const handleReject = () => {
    setGraphStatus("rejected");
    setFinalLog(`❌ Transaction rejected by human admin. Ticket escalated to Customer Success.`);
  };

  const resetAll = () => {
    setGraphStatus("idle");
    setProposedRefund(2500);
    setEditedRefund(2500);
    setFinalLog(null);
    setIsEditing(false);
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm overflow-hidden transition-colors">
      {/* Header */}
      <div className="p-5 md:p-6 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-transparent">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base md:text-lg text-slate-900 dark:text-white">
                Human-in-the-Loop Breakpoint Simulator
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Experience how LangGraph pauses before high-stakes actions, awaiting human Approval or State Edits
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={resetAll}
              disabled={graphStatus === "idle"}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 text-slate-600 dark:text-slate-400 text-xs font-mono transition"
              title="Reset"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={startAgent}
              disabled={graphStatus === "running" || graphStatus === "paused_breakpoint"}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-40 text-white font-mono text-xs font-bold transition shadow-sm"
            >
              <Play className={`w-3.5 h-3.5 ${graphStatus === "running" ? "animate-spin" : ""}`} />
              {graphStatus === "idle" ? "Start Agent Request" : "Restart Request"}
            </button>
          </div>
        </div>
      </div>

      <div className="p-5 md:p-6 space-y-6">
        {/* Graph Pipeline Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div
            className={`p-3.5 rounded-xl border text-center transition-all ${
              graphStatus === "running"
                ? "border-amber-500 bg-amber-500/20 text-amber-900 dark:text-amber-200 font-bold"
                : graphStatus !== "idle"
                ? "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-500"
            }`}
          >
            <span className="text-[10px] font-mono uppercase block text-slate-400">Step 1</span>
            <span className="text-xs font-mono font-bold">analyze_ticket</span>
            <p className="text-[11px] text-slate-500 mt-1">Calculates refund request</p>
          </div>

          <div
            className={`p-3.5 rounded-xl border text-center transition-all ${
              graphStatus === "paused_breakpoint"
                ? "border-amber-500 bg-amber-500/30 text-amber-900 dark:text-amber-200 font-bold scale-105 shadow-md animate-pulse"
                : graphStatus === "approved" || graphStatus === "rejected"
                ? "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-500"
            }`}
          >
            <div className="flex items-center justify-center gap-1">
              <PauseCircle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span className="text-[10px] font-mono uppercase font-bold text-amber-600 dark:text-amber-400">
                Breakpoint
              </span>
            </div>
            <span className="text-xs font-mono font-bold">human_approval_node</span>
            <p className="text-[11px] text-slate-500 mt-1">Suspends graph to checkpointer</p>
          </div>

          <div
            className={`p-3.5 rounded-xl border text-center transition-all ${
              graphStatus === "approved"
                ? "border-emerald-500 bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 font-bold"
                : graphStatus === "rejected"
                ? "border-red-500 bg-red-500/20 text-red-800 dark:text-red-300 font-bold"
                : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-500"
            }`}
          >
            <span className="text-[10px] font-mono uppercase block text-slate-400">Step 3</span>
            <span className="text-xs font-mono font-bold">process_payment_tool</span>
            <p className="text-[11px] text-slate-500 mt-1">Dispatches wire API transfer</p>
          </div>
        </div>

        {/* Breakpoint Inspection Modal / Card */}
        {graphStatus === "paused_breakpoint" && (
          <div className="p-5 rounded-2xl border-2 border-amber-500 bg-amber-50/50 dark:bg-amber-950/30 space-y-4 shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                <h4 className="text-sm font-bold font-mono text-slate-900 dark:text-white uppercase">
                  Action Intercepted: Approval Required
                </h4>
              </div>
              <span className="text-[11px] font-mono font-bold bg-amber-500/20 text-amber-700 dark:text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                interrupt_before=["process_payment"]
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900/60 space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-slate-500">Customer:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{customerName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Proposed Amount:</span>
                {isEditing ? (
                  <div className="flex items-center gap-1.5">
                    <span>$</span>
                    <input
                      type="number"
                      value={editedRefund}
                      onChange={(e) => setEditedRefund(Number(e.target.value))}
                      className="w-24 p-1 rounded border border-amber-400 bg-slate-50 dark:bg-slate-950 text-right font-bold text-xs"
                    />
                  </div>
                ) : (
                  <span className="font-extrabold text-amber-600 dark:text-amber-400 text-sm">
                    ${editedRefund.toLocaleString()}
                  </span>
                )}
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Stated Reason:</span>
                <span className="text-slate-700 dark:text-slate-300 text-right max-w-xs">{reason}</span>
              </div>
            </div>

            {/* Human Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-mono transition"
              >
                <Edit3 className="w-3.5 h-3.5 text-slate-500" />
                <span>{isEditing ? "Lock Edited Amount" : "Edit State (Modify Amount)"}</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleReject}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold transition shadow-sm"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Reject & Escalate</span>
                </button>
                <button
                  onClick={handleApprove}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold transition shadow-sm"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Approve & Resume Graph</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Execution Log */}
        {finalLog && (
          <div
            className={`p-4 rounded-xl border text-xs font-mono leading-relaxed ${
              graphStatus === "approved"
                ? "border-emerald-300 dark:border-emerald-800/60 bg-emerald-50/30 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300"
                : "border-red-300 dark:border-red-800/60 bg-red-50/30 dark:bg-red-950/20 text-red-800 dark:text-red-300"
            }`}
          >
            {finalLog}
          </div>
        )}
      </div>
    </div>
  );
}
