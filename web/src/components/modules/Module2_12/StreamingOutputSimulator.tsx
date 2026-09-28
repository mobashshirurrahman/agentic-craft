"use client";

import React, { useState, useEffect } from "react";
import {
  Zap,
  Play,
  RotateCcw,
  Sparkles,
  Clock,
  Terminal,
  Activity,
  CheckCircle2,
} from "lucide-react";

export default function StreamingOutputSimulator() {
  const [streamMode, setStreamMode] = useState<"messages" | "updates" | "values">("messages");
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [displayedText, setDisplayedText] = useState<string>("");
  const [tokenCount, setTokenCount] = useState<number>(0);
  const [ttftMs, setTtftMs] = useState<number | null>(null);
  const [rawChunks, setRawChunks] = useState<string[]>([]);

  const fullText =
    "LangGraph streaming delivers tokens to users in real time. Rather than waiting 5 seconds for full generation, users perceive instant responsiveness with sub-300ms Time to First Token.";

  const handleStartStream = () => {
    setIsStreaming(true);
    setDisplayedText("");
    setTokenCount(0);
    setTtftMs(null);
    setRawChunks([]);

    const words = fullText.split(" ");
    let index = 0;
    const startTime = Date.now();

    const interval = setInterval(() => {
      if (index === 0) {
        setTtftMs(Date.now() - startTime + 180);
      }

      if (index < words.length) {
        const nextWord = words[index] + " ";
        setDisplayedText((prev) => prev + nextWord);
        setTokenCount((prev) => prev + 1);

        if (streamMode === "messages") {
          setRawChunks((prev) => [...prev, `AIMessageChunk(content='${words[index]}')`]);
        } else if (streamMode === "updates") {
          if (index === Math.floor(words.length / 2)) {
            setRawChunks((prev) => [...prev, `NodeUpdate({'call_model': {'messages': [...]}})`]);
          }
        } else {
          setRawChunks((prev) => [...prev, `StateSnapshot({'messages': [...], 'step': ${index}})`]);
        }

        index++;
      } else {
        clearInterval(interval);
        setIsStreaming(false);
      }
    }, 70);
  };

  const handleReset = () => {
    setIsStreaming(false);
    setDisplayedText("");
    setTokenCount(0);
    setTtftMs(null);
    setRawChunks([]);
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm overflow-hidden transition-colors">
      {/* Header */}
      <div className="p-5 md:p-6 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-teal-500/10 via-sky-500/5 to-transparent">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                Real-Time Token Streaming Studio
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-700 dark:text-teal-300 border border-teal-500/30">
                  TTFT & Stream Modes
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Inspect how LangGraph streams messages, node updates, and state snapshots to eliminate user wait time
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition"
              title="Reset"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mode Selector */}
        <div className="flex flex-wrap gap-2 mt-4">
          {(["messages", "updates", "values"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => {
                setStreamMode(mode);
                handleReset();
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition ${
                streamMode === mode
                  ? "bg-teal-600 text-white font-bold"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
              }`}
            >
              stream_mode=&quot;{mode}&quot;
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="p-5 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Live Stream Viewer (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold pb-2 border-b border-slate-200 dark:border-slate-800">
            <span>Client Render Output</span>
            <div className="flex items-center gap-3 text-[11px] text-teal-600 dark:text-teal-400">
              {ttftMs && <span>⚡ TTFT: {ttftMs}ms</span>}
              <span>Tokens: {tokenCount}</span>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 min-h-[160px] text-xs leading-relaxed font-sans text-slate-800 dark:text-slate-200">
            {displayedText ? (
              <div>
                {displayedText}
                {isStreaming && (
                  <span className="inline-block w-1.5 h-3.5 bg-teal-500 ml-1 animate-pulse" />
                )}
              </div>
            ) : (
              <span className="text-slate-400 italic">
                Awaiting streaming dispatch... Click &ldquo;Start Token Stream&rdquo; below.
              </span>
            )}
          </div>

          <button
            onClick={handleStartStream}
            disabled={isStreaming}
            className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-mono text-xs font-bold transition flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>{isStreaming ? "Streaming Tokens..." : "Start Token Stream"}</span>
          </button>
        </div>

        {/* Right: Raw Chunk Stream Inspector (5 cols) */}
        <div className="lg:col-span-5 space-y-3 font-mono text-xs">
          <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold pb-2 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <span>Emitted Chunk Stream</span>
            <span className="text-[10px] text-teal-600 dark:text-teal-400">
              {rawChunks.length} Chunks
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 text-slate-300 border border-slate-800 h-[210px] overflow-y-auto space-y-1 text-[10px]">
            {rawChunks.length > 0 ? (
              rawChunks.map((chunk, idx) => (
                <div key={idx} className="text-teal-300 truncate">
                  &gt; {chunk}
                </div>
              ))
            ) : (
              <span className="text-slate-500">Chunk payloads will appear here during stream...</span>
            )}
          </div>

          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
            <span className="text-slate-500"># LangGraph Streaming:</span>
            <pre className="text-teal-300 mt-1">{`for chunk in app.stream(inputs, stream_mode="${streamMode}"):
    print(chunk)`}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
