"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target, Check, ArrowRight, Zap, Activity, Clock, Code2,
  AlertTriangle, Sparkles, HelpCircle, Copy, CheckCheck,
  Play, RotateCcw, FileText, Terminal, Radio, BarChart3,
} from "lucide-react";
import StreamingOutputSimulator from "./StreamingOutputSimulator";
import Module2_12Quiz from "./Module2_12Quiz";

export default function Module2_12Content() {
  const [selectedMode, setSelectedMode] = useState<string>("messages");
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [activeCodeTab, setActiveCodeTab] = useState<"code" | "output">("code");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);

  const streamModes = [
    {
      id: "messages",
      title: "stream_mode=\"messages\"",
      tagline: "Token-by-Token",
      desc: "Emits raw AIMessageChunk objects as tokens are sampled by the model. The lowest latency mode — ideal for user-facing chat UIs where every millisecond of perceived speed matters.",
      icon: Radio,
      color: "text-teal-600 dark:text-teal-400",
      bg: "bg-teal-50 dark:bg-teal-500/10",
      border: "border-teal-200 dark:border-teal-500/30",
      badge: "Chat UIs",
      codeSnippet: `# stream_mode="messages" — raw token chunks for chat UIs
# Each chunk arrives as AIMessageChunk with .content str

async def stream_to_ui(user_query: str):
    async for chunk, metadata in app.astream(
        {"messages": [("user", user_query)]},
        stream_mode="messages"
    ):
        if chunk.content and not isinstance(chunk, HumanMessage):
            # Send token immediately via SSE / WebSocket
            yield f"data: {chunk.content}\\n\\n"
            # React UI: setResponse(prev => prev + chunk.content)

# Result: Users see "Q", "ua", "ntum", " comput", "ing..."
# TTFT (Time to First Token) ~150ms vs 8s for batch response`,
    },
    {
      id: "updates",
      title: "stream_mode=\"updates\"",
      tagline: "Node Completion Events",
      desc: "Emits the return dict of each node as it finishes. Perfect for multi-step agent UIs that show progress steps like 'Searching...', 'Analyzing...', 'Generating...'.",
      icon: Activity,
      color: "text-sky-600 dark:text-sky-400",
      bg: "bg-sky-50 dark:bg-sky-500/10",
      border: "border-sky-200 dark:border-sky-500/30",
      badge: "Agent Progress UI",
      codeSnippet: `# stream_mode="updates" — per-node completion events
# Receives {node_name: state_update_dict} on each node finish

async for update in app.astream(
    {"messages": [("user", "What's the weather in Tokyo?")]},
    stream_mode="updates"
):
    # update = {"search_node": {"results": [...]}}  (after search)
    # update = {"agent_node": {"messages": [AIMessage]}}  (after LLM)
    node_name = list(update.keys())[0]
    print(f"✔ {node_name} completed")

# Perfect for: "Step 1/3 ✓ Web Search", "Step 2/3 ✓ Analysis"`,
    },
    {
      id: "values",
      title: "stream_mode=\"values\"",
      tagline: "Full State Snapshots",
      desc: "Emits the complete state dict after every super-step (group of concurrent node executions). Useful for telemetry dashboards and debugging state evolution.",
      icon: BarChart3,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-500/10",
      border: "border-purple-200 dark:border-purple-500/30",
      badge: "Telemetry",
      codeSnippet: `# stream_mode="values" — full state snapshots after each super-step
# Receive the complete AgentState dict at every checkpoint

snapshot_history = []
for state_snapshot in app.stream(
    {"messages": [("user", "Analyze AAPL stock")]},
    stream_mode="values"
):
    # state_snapshot = full AgentState dict
    snapshot_history.append(state_snapshot)
    print(f"State: {len(state_snapshot['messages'])} messages")

# Use for: timeline replay, debugging, state evolution dashboards
# Example: snapshot_history[2] = state after node 3 executed`,
    },
    {
      id: "fastapi",
      title: "FastAPI SSE",
      tagline: "Production Streaming",
      desc: "Wire LangGraph streaming into FastAPI's StreamingResponse using Server-Sent Events (SSE) — the standard protocol for streaming AI responses to web browsers.",
      icon: Zap,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      border: "border-amber-200 dark:border-amber-500/30",
      badge: "Production",
      codeSnippet: `# FastAPI SSE endpoint for production streaming
from fastapi import FastAPI
from fastapi.responses import StreamingResponse

app_api = FastAPI()

@app_api.post("/chat/stream")
async def stream_chat(request: ChatRequest):
    async def token_generator():
        async for chunk, _ in langgraph_app.astream(
            {"messages": [("user", request.message)]},
            stream_mode="messages"
        ):
            if chunk.content:
                # SSE format required by EventSource browser API
                yield f"data: {chunk.content}\\n\\n"
        yield "data: [DONE]\\n\\n"  # Signal stream end

    return StreamingResponse(
        token_generator(),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"}
    )`,
    },
  ];

  const currentMode = streamModes.find((m) => m.id === selectedMode) || streamModes[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentMode.codeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setActiveCodeTab("output");
    setSimStep(1);
    setTimeout(() => setSimStep(2), 600);
    setTimeout(() => setSimStep(3), 1200);
    setTimeout(() => { setSimStep(4); setIsSimulating(false); }, 2000);
  };

  return (
    <div className="space-y-10 max-w-5xl mx-auto pb-16">
      {/* 🎯 OBJECTIVE BANNER */}
      <section className="rounded-2xl border border-teal-200 dark:border-teal-500/30 bg-teal-50/60 dark:bg-teal-500/5 p-4 sm:p-6 shadow-sm">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-teal-600 text-white shrink-0 shadow-sm mt-0.5"><Target className="w-5 h-5" /></div>
          <div className="space-y-2 flex-1">
            <h2 className="text-sm font-mono uppercase tracking-wider text-teal-800 dark:text-teal-400 font-bold">🎯 By the end of this module, you will:</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              {[
                "Distinguish the 3 LangGraph stream modes and choose the right one for your UI",
                "Stream raw token chunks using stream_mode=\"messages\" for chat interfaces",
                "Build a FastAPI SSE endpoint that streams LangGraph output to browsers",
                "Measure Time to First Token (TTFT) and understand its UX impact",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: 4 STREAM MODE CARDS */}
      <section className="space-y-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30 text-teal-700 dark:text-teal-300 text-xs font-mono font-semibold mb-2">
            <Zap className="w-3.5 h-3.5" /><span>Streaming Output • Real-Time UX</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Implementing Streaming Output for Real-Time Responses</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Nobody likes a 8-second spinner. Streaming delivers tokens as they&apos;re generated, slashing TTFT from seconds to milliseconds and giving users the instant typing experience they expect from modern AI apps.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {streamModes.map((mode) => {
            const Icon = mode.icon;
            const isSelected = selectedMode === mode.id;
            return (
              <button key={mode.id} onClick={() => setSelectedMode(mode.id)}
                className={`p-3.5 sm:p-4 rounded-xl border text-left transition-all flex flex-col justify-between min-h-[145px] sm:min-h-[160px] active:scale-95 cursor-pointer ${isSelected ? "border-teal-500 bg-white dark:bg-slate-900 shadow-md ring-2 ring-teal-500/20" : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700"}`}>
                <div className="space-y-2">
                  <div className={`inline-flex p-1.5 rounded-lg ${mode.bg} border ${mode.border}`}><Icon className={`w-4 h-4 ${mode.color}`} /></div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-900 dark:text-white">{mode.title}</div>
                    <div className={`text-[10px] font-mono ${mode.color} mt-0.5`}>{mode.tagline}</div>
                  </div>
                </div>
                <p className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-2">{mode.desc}</p>
              </button>
            );
          })}
        </div>

        {/* CODE INSPECTOR */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`inline-flex p-1.5 rounded-lg ${currentMode.bg} border ${currentMode.border}`}><currentMode.icon className={`w-4 h-4 ${currentMode.color}`} /></div>
              <span className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-[200px]">{currentMode.title}</span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${currentMode.bg} ${currentMode.color} border ${currentMode.border}`}>{currentMode.badge}</span>
            </div>
            <button onClick={handleCopyCode} className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer">
              {copiedCode ? <CheckCheck className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedCode ? "Copied!" : "Copy"}
            </button>
          </div>
          <div className="rounded-xl border border-slate-800 overflow-hidden bg-slate-950">
            <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-slate-800">
              <div className="flex gap-1">
                {(["code", "output"] as const).map((tab) => (
                  <button key={tab} onClick={() => setActiveCodeTab(tab)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono cursor-pointer ${activeCodeTab === tab ? "bg-slate-700 text-white" : "text-slate-400 hover:text-slate-200"}`}>
                    {tab === "code" ? <FileText className="w-3 h-3" /> : <Terminal className="w-3 h-3" />}
                    {tab === "code" ? "Python Code" : "Stream Output"}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                {simStep > 0 && <button onClick={() => { setSimStep(0); setActiveCodeTab("code"); }} className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 cursor-pointer"><RotateCcw className="w-3 h-3" /> Reset</button>}
                <button onClick={handleRunSimulation} disabled={isSimulating}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-teal-600 hover:bg-teal-500 text-white text-xs font-mono disabled:opacity-50 cursor-pointer">
                  <Play className="w-3 h-3" />{isSimulating ? "Streaming..." : "Run"}
                </button>
              </div>
            </div>
            <div className="p-4 min-h-[140px] font-mono text-xs">
              {activeCodeTab === "code" ? (
                <pre className="text-slate-300 whitespace-pre-wrap leading-relaxed">{currentMode.codeSnippet}</pre>
              ) : (
                <div className="space-y-1 text-slate-300">
                  {simStep === 0 && <div className="text-slate-500 italic">Click &apos;Run&apos; to simulate streaming output...</div>}
                  {simStep >= 1 && <div className="text-teal-400">➜ [STREAM START] {currentMode.title} activated<br /><span className="text-slate-500">TTFT: 142ms (first token arrived)</span></div>}
                  {simStep >= 2 && <div className="text-slate-300 pl-4">
                    <span className="text-emerald-300">Qu</span><span className="text-emerald-300">an</span><span className="text-emerald-300">tum</span><span className="text-slate-400"> </span>
                    <span className="text-emerald-300">com</span><span className="text-emerald-300">put</span><span className="text-emerald-300">ing</span><span className="text-slate-400"> </span>
                    <span className="text-emerald-300">har</span><span className="text-emerald-300">ness</span><span className="text-emerald-300">es</span>
                  </div>}
                  {simStep >= 3 && <div className="text-slate-300 pl-4">
                    <span className="text-emerald-300"> qu</span><span className="text-emerald-300">ant</span><span className="text-emerald-300">um</span><span className="text-slate-400"> </span>
                    <span className="text-emerald-300">mech</span><span className="text-emerald-300">an</span><span className="text-emerald-300">ics</span><span className="text-emerald-300">...</span>
                  </div>}
                  {simStep >= 4 && <div className="text-emerald-400 font-bold pt-2 border-t border-slate-800">
                    ✔ [STREAM COMPLETE] 847 tokens streamed in 3.2s<br />
                    <span className="text-slate-400 font-normal text-[10px]">TTFT: 142ms vs batch latency: 3200ms — 22x faster perceived response</span>
                  </div>}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: TTFT ANALOGY */}
      <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">⚡ Mental Model: Restaurant vs. Streaming</h3>
        </div>
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-2">
            <div className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">❌ Batch (No Streaming)</div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">Like a restaurant that serves nothing until the entire 5-course meal is cooked. You wait 25 minutes staring at an empty table before eating your first bite — even if the bread was ready in 30 seconds.</p>
          </div>
          <div className="p-4 rounded-xl border border-teal-200 dark:border-teal-500/30 bg-teal-50 dark:bg-teal-500/10 space-y-2">
            <div className="text-xs font-mono font-bold text-teal-700 dark:text-teal-400">✅ Streaming (Token by Token)</div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">Like a restaurant that brings bread immediately, then soup, then salad as each course finishes. You&apos;re eating within 30 seconds of ordering — even if the full meal takes 25 minutes total to prepare.</p>
          </div>
        </div>
      </section>

      {/* SECTION 3: STREAMING SIMULATOR */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">🔬 Streaming Output Simulator</h3>
        <StreamingOutputSimulator />
      </section>

      {/* SECTION 4: NOTES */}
      <section className="space-y-3">
        <div className="p-4 rounded-xl border border-amber-300 dark:border-amber-500/30 bg-amber-50/90 dark:bg-amber-500/10 shadow-sm">
          <span className="font-['Caveat',cursive] text-base text-amber-950 dark:text-amber-200 block">✍️ Instructor Note: &quot;Streaming only reduces perceived latency (TTFT), NOT total generation time. A 5-second generation takes 5 seconds regardless. Streaming just means your user sees the first word at 150ms instead of waiting all 5 seconds for the full response.&quot;</span>
        </div>
        <div className="p-4 rounded-xl border border-sky-200 dark:border-sky-500/30 bg-sky-50/90 dark:bg-sky-500/10 shadow-sm">
          <span className="font-['Caveat',cursive] text-base text-sky-950 dark:text-sky-200 block">📌 Core Rule: Always set headers X-Accel-Buffering: no and Cache-Control: no-cache on your SSE streaming endpoint. Without these, nginx and cloud load balancers will buffer your entire response before sending it, completely defeating the purpose of streaming!</span>
        </div>
      </section>

      {/* SECTION 5: TRAPS */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-500" /><span>Streaming Output Traps</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-500/30 bg-rose-50/50 dark:bg-rose-500/5 space-y-2">
            <span className="text-xs font-mono font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider block">TRAP #1: Buffering Middleware</span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">Nginx, AWS ALB, and most reverse proxies buffer responses by default. Unless you explicitly set X-Accel-Buffering: no, all tokens accumulate server-side and deliver in one batch — making streaming appear broken to the client.</p>
          </div>
          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-500/5 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">TRAP #2: Calling invoke() Instead of stream()</span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">The most common mistake: developers add streaming code to the UI but forget to change the backend from agent.invoke() to agent.stream(). invoke() waits for the full response before returning — your streaming frontend never gets any chunks to display.</p>
          </div>
        </div>
      </section>

      {/* SECTION 6: KEY TAKEAWAYS */}
      <section className="rounded-xl border border-teal-200 dark:border-teal-500/30 bg-teal-50/50 dark:bg-teal-500/5 p-5 space-y-3">
        <h4 className="font-bold text-sm text-teal-900 dark:text-teal-300 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-teal-600 dark:text-teal-400" /><span>Key Takeaways</span>
        </h4>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          {[
            ["1.", "Choose Mode by Use Case:", "messages for chat UIs (token chunks), updates for progress indicators (node steps), values for telemetry and debugging (full state snapshots)."],
            ["2.", "TTFT Is Your UX Metric:", "Users perceive streaming as dramatically faster even when total latency is identical. Measure and optimize Time to First Token for user-facing features."],
            ["3.", "Fix Your Proxy Headers:", "Always set X-Accel-Buffering: no and Cache-Control: no-cache on your streaming endpoints. This is the #1 reason streaming appears broken in production deployments."],
          ].map(([n, bold, rest]) => (
            <li key={n} className="flex items-start gap-2">
              <span className="text-teal-600 dark:text-teal-400 font-bold">{n}</span>
              <span><strong>{bold}</strong> {rest}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* SECTION 7: QUIZ */}
      <section className="space-y-3">
        <button onClick={() => setShowQuiz(!showQuiz)}
          className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all text-left cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400"><HelpCircle className="w-5 h-5" /></div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">Concept Check: Streaming Output</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">{showQuiz ? "Click to collapse" : "Test your streaming intuition (3 questions)"}</p>
            </div>
          </div>
          <span className="text-xs font-mono font-semibold px-3 py-1.5 rounded-lg bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-400 border border-teal-200 dark:border-teal-500/30">
            {showQuiz ? "Hide Quiz" : "Start Quiz"}
          </span>
        </button>
        <AnimatePresence>
          {showQuiz && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }}>
              <Module2_12Quiz />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* NEXT MODULE BRIDGE */}
      <section className="rounded-2xl border border-teal-200 dark:border-teal-500/30 bg-gradient-to-r from-teal-50 via-white to-slate-50 dark:from-teal-500/10 dark:via-slate-900 dark:to-slate-950 p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <div className="text-xs font-mono font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider">Up Next • Module 2.13</div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Configuring Async and Sync Agent Execution</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">LLM calls are I/O-bound. Learn how async execution lets your agent handle 6 concurrent users in the same time it would take to handle 1 synchronously.</p>
        </div>
        <Link href="/learn/level-2/module-2-13" className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs sm:text-sm shadow-sm transition-all shrink-0 cursor-pointer">
          <span>Continue to Module 2.13</span><ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
