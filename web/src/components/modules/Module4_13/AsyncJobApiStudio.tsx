"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Zap,
  Globe,
  Radio,
  FileCode,
  ShieldCheck,
  Server,
  Play,
  RotateCcw,
} from "lucide-react";

type ApiProtocol = "sync" | "polling" | "webhook" | "sse";

interface LogPacket {
  id: string;
  timestamp: string;
  source: "Client" | "Server" | "Worker";
  message: string;
  type: "info" | "success" | "error" | "event";
}

export default function AsyncJobApiStudio() {
  const [protocol, setProtocol] = useState<ApiProtocol>("polling");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [statusMessage, setStatusMessage] = useState<string>("Idle. Ready to test request.");
  const [packets, setPackets] = useState<LogPacket[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const addPacket = (source: LogPacket["source"], message: string, type: LogPacket["type"] = "info") => {
    const newPacket: LogPacket = {
      id: Math.random().toString(),
      timestamp: new Date().toLocaleTimeString().split(" ")[0],
      source,
      message,
      type,
    };
    setPackets((prev) => [newPacket, ...prev.slice(0, 14)]);
  };

  const handleStartSimulation = () => {
    setIsRunning(true);
    setProgress(0);
    setPackets([]);

    if (protocol === "sync") {
      addPacket("Client", "POST /api/generate-research (Synchronous blocking HTTP)");
      setStatusMessage("Connection waiting for agent... (0s / 10s timeout)");

      let elapsed = 0;
      timerRef.current = setInterval(() => {
        elapsed += 2;
        setProgress((prev) => Math.min(prev + 20, 80));
        if (elapsed < 6) {
          addPacket("Server", `Still processing agent reasoning... (${elapsed}s elapsed)`);
        } else {
          clearInterval(timerRef.current!);
          setIsRunning(false);
          setProgress(100);
          addPacket("Client", "504 GATEWAY TIMEOUT: Client/Load balancer dropped connection!", "error");
          setStatusMessage("CRASH: Standard HTTP timed out before agent finished!");
        }
      }, 700);
    } else if (protocol === "polling") {
      addPacket("Client", "POST /api/tasks (Async submit)");
      setTimeout(() => {
        addPacket("Server", "HTTP 202 ACCEPTED -> { task_id: 'job_4981', status_url: '/api/tasks/job_4981' }", "success");
        setStatusMessage("Task accepted! Client entering polling loop...");

        let pollCount = 0;
        timerRef.current = setInterval(() => {
          pollCount += 1;
          const currProgress = pollCount * 25;
          setProgress(currProgress);

          if (pollCount === 1) {
            addPacket("Client", "GET /api/tasks/job_4981 -> Status: QUEUED");
          } else if (pollCount === 2) {
            addPacket("Client", "GET /api/tasks/job_4981 -> Status: RUNNING (Step 2: Searching SEC 10-K filings)");
          } else if (pollCount === 3) {
            addPacket("Client", "GET /api/tasks/job_4981 -> Status: RUNNING (Step 4: Synthesizing financial ratios)");
          } else if (pollCount >= 4) {
            clearInterval(timerRef.current!);
            setIsRunning(false);
            addPacket("Client", "GET /api/tasks/job_4981 -> HTTP 200 OK! { status: 'COMPLETED', result: 'Q3 Report Summary...' }", "success");
            setStatusMessage("SUCCESS: Polling retrieved complete result cleanly!");
          }
        }, 800);
      }, 400);
    } else if (protocol === "webhook") {
      addPacket("Client", "POST /api/tasks { prompt: '...', callback_url: 'https://client.app/webhook' }");
      setTimeout(() => {
        addPacket("Server", "HTTP 202 ACCEPTED -> Task scheduled on Celery worker. Client disconnected.", "success");
        setStatusMessage("Connection closed! Worker processing asynchronously in background...");

        let step = 0;
        timerRef.current = setInterval(() => {
          step += 1;
          setProgress(step * 33);
          if (step === 1) {
            addPacket("Worker", "Worker node #3 executing tools (Financial Analyzer)");
          } else if (step === 2) {
            addPacket("Worker", "Worker completed task in 4.2 seconds. Generating HMAC signature...");
          } else if (step >= 3) {
            clearInterval(timerRef.current!);
            setIsRunning(false);
            addPacket("Server", "POST https://client.app/webhook with X-Hub-Signature-256 (Result delivered!)", "success");
            setStatusMessage("SUCCESS: Webhook callback successfully posted result to client endpoint!");
          }
        }, 800);
      }, 400);
    } else if (protocol === "sse") {
      addPacket("Client", "GET /api/tasks/stream (Server-Sent Events connection established)");
      setStatusMessage("Single persistent HTTP connection open! Streaming events...");

      let step = 0;
      const sseEvents = [
        "event: status\\ndata: {\"state\": \"plan_created\", \"steps\": 3}",
        "event: step\\ndata: {\"tool\": \"sql_query\", \"records\": 142}",
        "event: token\\ndata: \"Based on Q3 earnings revenue grew 14%...\"",
        "event: done\\ndata: {\"task_id\": \"job_4981\", \"cost\": \"$0.012\"}",
      ];

      timerRef.current = setInterval(() => {
        if (step < sseEvents.length) {
          addPacket("Server", `SSE Stream >> ${sseEvents[step]}`, "event");
          step += 1;
          setProgress((step / sseEvents.length) * 100);
        } else {
          clearInterval(timerRef.current!);
          setIsRunning(false);
          setStatusMessage("SUCCESS: Full agent trace and answer streamed live without timeouts!");
        }
      }, 700);
    }
  };

  const handleReset = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsRunning(false);
    setProgress(0);
    setStatusMessage("Ready to test.");
    setPackets([]);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-4 md:p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
            Protocol Comparison Simulator
          </span>
          <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white">
            Long-Running Agent API Architecture Studio
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-mono transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>
      </div>

      <div className="p-5 md:p-6 space-y-6">
        {/* Protocol Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
          {[
            { id: "sync", label: "Synchronous (Anti-Pattern)", desc: "Blocks HTTP connection until 504 Gateway Timeout" },
            { id: "polling", label: "HTTP 202 + Polling", desc: "Immediate 202 Accepted, client polls /tasks/{id}" },
            { id: "webhook", label: "Webhooks (Callbacks)", desc: "Don't call us, we'll call your webhook URL" },
            { id: "sse", label: "Server-Sent Events (SSE)", desc: "Stream tokens & step events in real-time" },
          ].map((item) => (
            <button
              key={item.id}
              disabled={isRunning}
              onClick={() => {
                setProtocol(item.id as ApiProtocol);
                handleReset();
              }}
              className={`p-3 rounded-xl border text-left transition space-y-1 ${
                protocol === item.id
                  ? "border-teal-500 bg-teal-50/50 dark:bg-teal-950/40 text-teal-900 dark:text-teal-200 shadow-sm"
                  : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 hover:border-slate-300"
              }`}
            >
              <span className="font-bold text-xs block">{item.label}</span>
              <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">{item.desc}</p>
            </button>
          ))}
        </div>

        {/* Live Execution Panel */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-0.5">
              <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">
                Current Status
              </span>
              <p className="text-xs md:text-sm font-semibold text-slate-800 dark:text-slate-200">
                {statusMessage}
              </p>
            </div>

            <button
              onClick={handleStartSimulation}
              disabled={isRunning}
              className="py-2 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-semibold text-xs tracking-wider uppercase flex items-center gap-1.5 transition shadow-sm"
            >
              <Play className="w-3.5 h-3.5" />
              {isRunning ? "Running Agent..." : "Trigger 3-Minute Agent Task"}
            </button>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-[11px] font-mono text-slate-500">
              <span>Task Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  protocol === "sync" && progress === 100
                    ? "bg-rose-500"
                    : "bg-teal-500"
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Network Packet Stream Visualizer */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-teal-500" />
              Live Wire / HTTP Network Logs
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              Protocol: <strong className="uppercase text-teal-600 dark:text-teal-400">{protocol}</strong>
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs space-y-1.5 min-h-[160px] max-h-[220px] overflow-y-auto">
            {packets.length === 0 ? (
              <div className="text-slate-500 text-center py-10 italic">
                Click &ldquo;Trigger 3-Minute Agent Task&rdquo; to visualize the HTTP packet flow!
              </div>
            ) : (
              packets.map((pkt) => (
                <div key={pkt.id} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-slate-500 text-[10px] shrink-0">[{pkt.timestamp}]</span>
                  <span
                    className={`px-1.5 py-0.2 rounded text-[10px] shrink-0 font-bold ${
                      pkt.source === "Client"
                        ? "bg-sky-500/20 text-sky-400"
                        : pkt.source === "Server"
                        ? "bg-teal-500/20 text-teal-400"
                        : "bg-amber-500/20 text-amber-400"
                    }`}
                  >
                    {pkt.source}
                  </span>
                  <span
                    className={`${
                      pkt.type === "error"
                        ? "text-rose-400 font-bold"
                        : pkt.type === "success"
                        ? "text-emerald-400 font-bold"
                        : pkt.type === "event"
                        ? "text-indigo-300"
                        : "text-slate-300"
                    }`}
                  >
                    {pkt.message}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
