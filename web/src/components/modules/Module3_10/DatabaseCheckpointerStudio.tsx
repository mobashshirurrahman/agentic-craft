"use client";

import React, { useState } from "react";
import {
  Database,
  Play,
  RotateCcw,
  CheckCircle2,
  Send,
  MessageSquare,
  Key,
  HardDrive,
  Layers,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

interface CheckpointRecord {
  checkpointId: string;
  parentCheckpointId: string | null;
  threadId: string;
  stepNumber: number;
  timestamp: string;
  messageContent: string;
}

export default function DatabaseCheckpointerStudio() {
  const [selectedThread, setSelectedThread] = useState<string>("thread-user-alice");
  const [userInput, setUserInput] = useState<string>("What is my account balance?");
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const [checkpoints, setCheckpoints] = useState<Record<string, CheckpointRecord[]>>({
    "thread-user-alice": [
      {
        checkpointId: "chk_001",
        parentCheckpointId: null,
        threadId: "thread-user-alice",
        stepNumber: 1,
        timestamp: "10:14:02",
        messageContent: "User: Hi, I am Alice.",
      },
      {
        checkpointId: "chk_002",
        parentCheckpointId: "chk_001",
        threadId: "thread-user-alice",
        stepNumber: 2,
        timestamp: "10:14:04",
        messageContent: "Assistant: Hello Alice! How can I assist you today?",
      },
    ],
    "thread-user-bob": [
      {
        checkpointId: "chk_101",
        parentCheckpointId: null,
        threadId: "thread-user-bob",
        stepNumber: 1,
        timestamp: "11:02:15",
        messageContent: "User: I need to book a flight to London.",
      },
    ],
  });

  const currentRecords = checkpoints[selectedThread] || [];

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    setIsSaving(true);
    const newStepNum = currentRecords.length + 1;
    const parentId = currentRecords.length > 0 ? currentRecords[currentRecords.length - 1].checkpointId : null;
    const newId = `chk_${Date.now().toString().slice(-4)}`;

    const newRecord: CheckpointRecord = {
      checkpointId: newId,
      parentCheckpointId: parentId,
      threadId: selectedThread,
      stepNumber: newStepNum,
      timestamp: new Date().toLocaleTimeString(),
      messageContent: `User: ${userInput}`,
    };

    setTimeout(() => {
      setCheckpoints((prev) => ({
        ...prev,
        [selectedThread]: [...(prev[selectedThread] || []), newRecord],
      }));
      setUserInput("");
      setIsSaving(false);
    }, 350);
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm overflow-hidden transition-colors">
      {/* Header */}
      <div className="p-5 md:p-6 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-emerald-500/10 via-cyan-500/5 to-transparent">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base md:text-lg text-slate-900 dark:text-white">
                Database Checkpointer & Thread Isolation Studio
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Inspect how PostgresSaver chains immutable checkpoints and isolates multi-tenant threads
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/30">
              PostgresSaver Simulator
            </span>
          </div>
        </div>
      </div>

      <div className="p-5 md:p-6 space-y-6">
        {/* Thread Selector Tabs */}
        <div className="space-y-1.5">
          <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase">
            Active Session / Thread Key (thread_id)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              onClick={() => setSelectedThread("thread-user-alice")}
              className={`p-3 text-left rounded-xl border text-xs font-mono transition flex items-center justify-between ${
                selectedThread === "thread-user-alice"
                  ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold"
                  : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:border-slate-300"
              }`}
            >
              <div>
                <span className="block font-bold">thread_id: "thread-user-alice"</span>
                <span className="text-[11px] text-slate-500">Alice's Bank Session ({checkpoints["thread-user-alice"]?.length || 0} checkpoints)</span>
              </div>
              {selectedThread === "thread-user-alice" && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
            </button>

            <button
              onClick={() => setSelectedThread("thread-user-bob")}
              className={`p-3 text-left rounded-xl border text-xs font-mono transition flex items-center justify-between ${
                selectedThread === "thread-user-bob"
                  ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold"
                  : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:border-slate-300"
              }`}
            >
              <div>
                <span className="block font-bold">thread_id: "thread-user-bob"</span>
                <span className="text-[11px] text-slate-500">Bob's Travel Session ({checkpoints["thread-user-bob"]?.length || 0} checkpoints)</span>
              </div>
              {selectedThread === "thread-user-bob" && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
            </button>
          </div>
        </div>

        {/* Live Postgres Checkpoints Table */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="font-bold text-slate-700 dark:text-slate-300 uppercase">
              Database Table: checkpoints (Linked History Chain)
            </span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">
              {currentRecords.length} Rows Stored
            </span>
          </div>

          <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-[10px] uppercase text-slate-500">
                  <th className="pb-2">Step</th>
                  <th className="pb-2">Checkpoint ID</th>
                  <th className="pb-2">Parent ID</th>
                  <th className="pb-2">Timestamp</th>
                  <th className="pb-2">Saved State Snapshot</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {currentRecords.map((rec) => (
                  <tr key={rec.checkpointId} className="text-slate-700 dark:text-slate-300">
                    <td className="py-2.5 font-bold text-emerald-600 dark:text-emerald-400">
                      #{rec.stepNumber}
                    </td>
                    <td className="py-2.5 font-mono">{rec.checkpointId}</td>
                    <td className="py-2.5 text-slate-400">{rec.parentCheckpointId || "NULL (Root)"}</td>
                    <td className="py-2.5 text-slate-500">{rec.timestamp}</td>
                    <td className="py-2.5 max-w-xs truncate text-slate-800 dark:text-slate-200 font-semibold">
                      {rec.messageContent}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Send Next Message Input */}
        <div className="space-y-2 pt-1">
          <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase">
            Append New Message (Simulate State Transition Write)
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type message to trigger database checkpoint write..."
              className="flex-1 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            />
            <button
              onClick={handleSendMessage}
              disabled={isSaving || !userInput.trim()}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-mono text-xs font-bold transition shadow-sm shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSaving ? "Writing to DB..." : "Save Checkpoint"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
