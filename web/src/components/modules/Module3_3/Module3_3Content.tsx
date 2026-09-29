"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target, Check, ArrowRight, History, Eye, Search,
  AlertTriangle, Sparkles, HelpCircle, Copy, CheckCheck,
  Play, RotateCcw, FileText, Terminal, Bug, Layers,
} from "lucide-react";
import StateTransitionTimeTravelStudio from "./StateTransitionTimeTravelStudio";
import Module3_3Quiz from "./Module3_3Quiz";

export default function Module3_3Content() {
  const [selectedMode, setSelectedMode] = useState<string>("values");
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [activeCodeTab, setActiveCodeTab] = useState<"code" | "output">("code");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);

  const modes = [
    {
      id: "values",
      title: "stream_mode='values'",
      tagline: "Full State Snapshot",
      desc: "Emits the complete state dictionary after every node completes. Best for seeing accumulated context and overall progress across the whole graph run.",
      icon: Eye,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-500/10",
      border: "border-blue-200 dark:border-blue-500/30",
      badge: "Complete State",
      codeSnippet: `# stream_mode="values": Full state snapshot after each node
# Shows ALL state fields after every node completes

for state_snapshot in app.stream(
    {"messages": [HumanMessage("What is the Q3 revenue?")]},
    stream_mode="values"
):
    # state_snapshot = entire state dict at this point in time
    print("\\n=== FULL STATE SNAPSHOT ===")
    print(f"messages: {len(state_snapshot['messages'])} messages")
    print(f"query_result: {state_snapshot.get('query_result', 'NOT SET YET')}")
    print(f"generated_sql: {state_snapshot.get('generated_sql', 'NOT SET YET')}")

# Example output showing accumulated state across nodes:
# === After sql_planner ===
#   messages: 2, generated_sql: "SELECT SUM(amount)...", query_result: NOT SET YET
# === After sql_executor ===
#   messages: 2, generated_sql: "SELECT SUM...", query_result: [{'total': 4820000}]
# === After formatter ===
#   messages: 3, generated_sql: "SELECT...", query_result: [...]`,
    },
    {
      id: "updates",
      title: "stream_mode='updates'",
      tagline: "Node Delta Only",
      desc: "Emits ONLY the dictionary returned by each node. Perfect for catching accidental key overwrites, missing fields, or unexpected None returns from specific nodes.",
      icon: Search,
      color: "text-cyan-600 dark:text-cyan-400",
      bg: "bg-cyan-50 dark:bg-cyan-500/10",
      border: "border-cyan-200 dark:border-cyan-500/30",
      badge: "Delta Only",
      codeSnippet: `# stream_mode="updates": Only the DELTA from each node
# Ideal for catching: null returns, overwritten keys, missing fields

for event in app.stream(
    {"messages": [HumanMessage("What is the Q3 revenue?")]},
    stream_mode="updates"
):
    for node_name, state_delta in event.items():
        print(f"\\n--- Node Finished: [{node_name}] ---")
        for key, value in state_delta.items():
            # Shows ONLY what this specific node returned
            print(f"  + {key}: {repr(value)[:80]}")  # Truncate long values

# Example output — immediately shows which node set what:
# --- Node Finished: [sql_planner] ---
#   + generated_sql: "SELECT SUM(amount) FROM sales WHERE quarter='Q3'"
# --- Node Finished: [sql_executor] ---
#   + query_result: [{'total': 4820000}]  ← if None here, bug is in executor
# --- Node Finished: [formatter] ---
#   + messages: [AIMessage(content="Q3 revenue: $4.82M")]`,
    },
    {
      id: "debug",
      title: "Breakpoint Pattern",
      tagline: "Pause & Inspect",
      desc: "Use interrupt_before=[node_name] to pause the graph before a specific node runs. Inspect the state, modify it if needed, then resume — the agentic equivalent of a Python debugger breakpoint.",
      icon: Bug,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      border: "border-amber-200 dark:border-amber-500/30",
      badge: "interrupt_before",
      codeSnippet: `# BREAKPOINT: Pause graph before a specific node for inspection
# Exactly like Python's breakpoint() — but for graph nodes

from langgraph.graph import StateGraph
from langgraph.checkpoint.memory import MemorySaver

checkpointer = MemorySaver()
app = builder.compile(
    checkpointer=checkpointer,
    interrupt_before=["sql_executor"]  # PAUSE before this node!
)

config = {"configurable": {"thread_id": "debug_session_1"}}

# First invocation: pauses BEFORE sql_executor runs
result = app.invoke({"messages": [HumanMessage("Q3 revenue?")]}, config=config)
print("Paused! Inspect state before SQL executes:")
print(result["generated_sql"])  # "SELECT SUM(amount)..."

# Optional: Modify state before resuming
# app.update_state(config, {"generated_sql": "SELECT..."})

# Resume from breakpoint — sql_executor now runs
final = app.invoke(None, config=config)
print(f"Final result: {final['query_result']}")`,
    },
    {
      id: "trace",
      title: "Execution Trace Log",
      tagline: "Full Audit Trail",
      desc: "Combine stream_mode='updates' with custom logging to build a complete audit trace showing every node, its input, output, timing, and whether it overwrote any shared state keys.",
      icon: Layers,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-500/10",
      border: "border-purple-200 dark:border-purple-500/30",
      badge: "Audit Log",
      codeSnippet: `# FULL AUDIT TRACE: Track every node's mutations with timing
import time

def debug_stream_with_trace(app, initial_state: dict) -> dict:
    """Streams graph with full audit trace logging."""
    trace = []
    
    for event in app.stream(initial_state, stream_mode="updates"):
        for node_name, delta in event.items():
            entry = {
                "node": node_name,
                "timestamp": time.perf_counter(),
                "wrote_keys": list(delta.keys()),
                "null_keys": [k for k, v in delta.items() if v is None],
                "overwrite_risk": [],
            }
            
            # DETECT OVERWRITES: warn if node writes a key that already has data
            for key in delta.keys():
                if initial_state.get(key) and delta[key] != initial_state.get(key):
                    entry["overwrite_risk"].append(key)
            
            trace.append(entry)
            print(f"[{node_name}] wrote: {entry['wrote_keys']}")
            if entry["null_keys"]:
                print(f"  ⚠️  NULL RETURN: {entry['null_keys']}")
            if entry["overwrite_risk"]:
                print(f"  ⚠️  OVERWRITE RISK: {entry['overwrite_risk']}")
    
    return trace`,
    },
  ];

  const currentMode = modes.find((m) => m.id === selectedMode) || modes[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentMode.codeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setActiveCodeTab("output");
    setSimStep(1);
    setTimeout(() => setSimStep(2), 700);
    setTimeout(() => setSimStep(3), 1400);
    setTimeout(() => { setSimStep(4); setIsSimulating(false); }, 2100);
  };

  return (
    <div className="space-y-10 max-w-5xl mx-auto pb-16">
      {/* 🎯 OBJECTIVE BANNER */}
      <section className="rounded-2xl border border-blue-200 dark:border-blue-500/30 bg-blue-50/60 dark:bg-blue-500/5 p-4 sm:p-6 shadow-sm">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-blue-600 text-white shrink-0 shadow-sm mt-0.5"><Target className="w-5 h-5" /></div>
          <div className="space-y-2 flex-1">
            <h2 className="text-sm font-mono uppercase tracking-wider text-blue-800 dark:text-blue-400 font-bold">🎯 By the end of this module, you will:</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              {[
                "Use stream_mode='values' to capture full state snapshots after each node",
                "Use stream_mode='updates' to inspect per-node deltas and catch null returns",
                "Set interrupt_before=[node] breakpoints to pause and inspect graph state mid-execution",
                "Build an audit trace logger that flags null returns and overwrite risks automatically",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: 4 DEBUG MODE CARDS */}
      <section className="space-y-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 text-blue-700 dark:text-blue-300 text-xs font-mono font-semibold mb-2">
            <History className="w-3.5 h-3.5" /><span>State Debugging • Time-Travel Inspection</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Debugging Agents by Analyzing State Transitions</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            When an agent produces a wrong answer, staring at the final output tells you nothing. Agent behavior emerges from <strong>state mutations across nodes</strong>. Inspecting transitions frame-by-frame reveals the exact node where data was dropped or corrupted.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {modes.map((mode) => {
            const Icon = mode.icon;
            const isSelected = selectedMode === mode.id;
            return (
              <button key={mode.id} onClick={() => setSelectedMode(mode.id)}
                className={`p-3.5 sm:p-4 rounded-xl border text-left transition-all flex flex-col justify-between min-h-[155px] sm:min-h-[170px] active:scale-95 cursor-pointer ${isSelected ? "border-blue-500 bg-white dark:bg-slate-900 shadow-md ring-2 ring-blue-500/20" : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700"}`}>
                <div className="space-y-2">
                  <div className={`inline-flex p-1.5 rounded-lg ${mode.bg} border ${mode.border}`}><Icon className={`w-4 h-4 ${mode.color}`} /></div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white font-mono">{mode.title}</div>
                    <div className={`text-[10px] font-mono ${mode.color} mt-0.5`}>{mode.tagline}</div>
                  </div>
                </div>
                <div className="mt-2 space-y-1.5">
                  <p className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{mode.desc}</p>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${mode.bg} ${mode.color} border ${mode.border}`}>{mode.badge}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* CODE INSPECTOR */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`inline-flex p-1.5 rounded-lg ${currentMode.bg} border ${currentMode.border}`}><currentMode.icon className={`w-4 h-4 ${currentMode.color}`} /></div>
              <span className="text-xs font-bold text-slate-900 dark:text-white font-mono">{currentMode.title}</span>
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
                    {tab === "code" ? "Python Code" : "Debug Output"}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                {simStep > 0 && <button onClick={() => { setSimStep(0); setActiveCodeTab("code"); }} className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 cursor-pointer"><RotateCcw className="w-3 h-3" /> Reset</button>}
                <button onClick={handleRunSimulation} disabled={isSimulating}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono disabled:opacity-50 cursor-pointer">
                  <Play className="w-3 h-3" />{isSimulating ? "Streaming..." : "Stream Graph"}
                </button>
              </div>
            </div>
            <div className="p-4 min-h-[120px] font-mono text-xs">
              {activeCodeTab === "code" ? (
                <pre className="text-slate-300 whitespace-pre-wrap leading-relaxed">{currentMode.codeSnippet}</pre>
              ) : (
                <div className="space-y-1.5 text-slate-300">
                  {simStep === 0 && <div className="text-slate-500 italic">Click &apos;Stream Graph&apos; to see the {currentMode.tagline} debug output...</div>}
                  {simStep >= 1 && <div className="text-blue-400">➜ Streaming graph with {currentMode.title}...</div>}
                  {simStep >= 2 && (selectedMode === "values") && (
                    <div className="text-slate-400 pl-4">
                      === After sql_planner ===<br />
                      messages: 2, generated_sql: &quot;SELECT SUM(amount)...&quot;, query_result: NOT SET YET
                    </div>
                  )}
                  {simStep >= 2 && selectedMode === "updates" && (
                    <div className="text-cyan-400 pl-4">
                      --- [sql_planner] ---<br />
                      + generated_sql: &quot;SELECT SUM(amount) FROM sales&quot;<br />
                      --- [sql_executor] ---<br />
                      + query_result: [{`{`}&apos;total&apos;: 4820000{`}`}]
                    </div>
                  )}
                  {simStep >= 2 && selectedMode === "debug" && <div className="text-amber-400 pl-4">Paused before [sql_executor]<br />State: generated_sql = &quot;SELECT SUM(amount)...&quot;<br />Ready to resume. Run app.invoke(None, config) to continue.</div>}
                  {simStep >= 2 && selectedMode === "trace" && <div className="text-purple-400 pl-4">[sql_planner] wrote: [&apos;generated_sql&apos;]<br />[sql_executor] wrote: [&apos;query_result&apos;]<br />[formatter] wrote: [&apos;messages&apos;]</div>}
                  {simStep >= 3 && <div className="text-slate-400">Graph completed. All node mutations captured.</div>}
                  {simStep >= 4 && <div className="text-emerald-400 font-bold pt-2 border-t border-slate-800">✔ No null returns detected. No overwrite risks flagged. Graph state is clean.</div>}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE STUDIO */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">🔬 State Time-Travel Studio</h3>
        <StateTransitionTimeTravelStudio />
      </section>

      {/* NOTES */}
      <section className="space-y-3">
        <div className="p-4 rounded-xl border border-amber-300 dark:border-amber-500/30 bg-amber-50/90 dark:bg-amber-500/10 shadow-sm">
          <span className="font-['Caveat',cursive] text-base text-amber-950 dark:text-amber-200 block">✍️ Instructor Note: &quot;When messages disappear between nodes, 95% of engineers blame the LLM. The real culprit is a node that returned {'{'}&apos;messages&apos;: [new_message]{'}' } without an additive reducer — overwriting the entire list. Always use add_messages as your message reducer.&quot;</span>
        </div>
        <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-500/30 bg-blue-50/90 dark:bg-blue-500/10 shadow-sm">
          <span className="font-['Caveat',cursive] text-base text-blue-950 dark:text-blue-200 block">📌 Debugging Rule: For any agent bug — start with stream_mode=&quot;updates&quot;. It gives you the frame-by-frame X-ray of every node&apos;s output. The bug is always in the first node whose output doesn&apos;t match what you expected. Never start debugging at the end.</span>
        </div>
      </section>

      {/* TRAPS */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-amber-500" />Debugging Traps</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-500/30 bg-rose-50/50 dark:bg-rose-500/5 space-y-2">
            <span className="text-xs font-mono font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider block">TRAP #1: Overwriting Instead of Appending</span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">A node returns {`{"messages": [ai_msg]}`} instead of using the add_messages reducer. This replaces the entire message history with a single message. Every prior turn vanishes silently. Use Annotated[list, add_messages] in your TypedDict, not plain list.</p>
          </div>
          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-500/5 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">TRAP #2: Debugging with stream_mode=&quot;values&quot;</span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">stream_mode=&quot;values&quot; shows accumulated state — but if Node B overwrites Node A&apos;s output, you only see Node B&apos;s version. Use stream_mode=&quot;updates&quot; instead to see what EACH individual node returned separately. Values hides overwrites; updates reveals them.</p>
          </div>
        </div>
      </section>

      {/* KEY TAKEAWAYS */}
      <section className="rounded-xl border border-blue-200 dark:border-blue-500/30 bg-blue-50/50 dark:bg-blue-500/5 p-5 space-y-3">
        <h4 className="font-bold text-sm text-blue-900 dark:text-blue-300 flex items-center gap-2"><Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />Key Takeaways</h4>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          {[
            ["1.", "updates > values for Debugging:", "stream_mode='updates' shows exactly what each node returned. When data is missing, the first node with a wrong delta is the culprit — fix the reducer or the node logic, not the prompt."],
            ["2.", "Breakpoints for Mid-Run Inspection:", "interrupt_before=[node] is the graph-equivalent of Python's breakpoint(). Use it to pause before expensive or destructive nodes (DB writes, email sends) to verify state before committing the action."],
            ["3.", "Null Returns are Silent Killers:", "A node that returns {} or {key: None} corrupts downstream state silently without raising an exception. Always validate node return values in tests — check that every expected key has a non-None value."],
          ].map(([n, bold, rest]) => (
            <li key={n} className="flex items-start gap-2"><span className="text-blue-600 dark:text-blue-400 font-bold">{n}</span><span><strong>{bold}</strong> {rest}</span></li>
          ))}
        </ul>
      </section>

      {/* QUIZ */}
      <section className="space-y-3">
        <button onClick={() => setShowQuiz(!showQuiz)} className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all text-left cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400"><HelpCircle className="w-5 h-5" /></div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">Concept Check: State Debugging</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">{showQuiz ? "Click to collapse" : "3 questions"}</p>
            </div>
          </div>
          <span className="text-xs font-mono font-semibold px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30">{showQuiz ? "Hide" : "Start"}</span>
        </button>
        <AnimatePresence>
          {showQuiz && (<motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }}><Module3_3Quiz /></motion.div>)}
        </AnimatePresence>
      </section>

      {/* NEXT MODULE */}
      <section className="rounded-2xl border border-blue-200 dark:border-blue-500/30 bg-gradient-to-r from-blue-50 via-white to-slate-50 dark:from-blue-500/10 dark:via-slate-900 dark:to-slate-950 p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <div className="text-xs font-mono font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">Up Next • Module 3.4</div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Enabling Tool Interoperability with MCP</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">The Model Context Protocol is the USB-C for AI — learn to connect any LangGraph agent to databases, file systems, and developer tools without writing custom glue code.</p>
        </div>
        <Link href="/learn/level-3/module-3-4" className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-sm transition-all shrink-0 cursor-pointer">
          <span>Continue to Module 3.4</span><ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
