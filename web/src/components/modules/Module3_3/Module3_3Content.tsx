"use client";

import React from "react";
import {
  History,
  CheckCircle2,
  Code2,
  Layers,
  Sparkles,
  Eye,
  Search,
  Lightbulb,
} from "lucide-react";
import StateTransitionTimeTravelStudio from "./StateTransitionTimeTravelStudio";
import Module3_3Quiz from "./Module3_3Quiz";

export default function Module3_3Content() {
  return (
    <div className="space-y-10">
      {/* Hero Banner */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-slate-50 dark:to-slate-950 p-6 md:p-8 relative overflow-hidden transition-colors">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-500/30">
              Module 3.3 • Advanced Patterns
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              ~20 min hands-on
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Debugging Agents by Analyzing State Transitions
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            When an agent produces a wrong answer, staring at the final output tells you nothing. Agent behavior emerges from <strong>state mutations across nodes</strong>. Inspecting state transitions frame-by-frame reveals the exact node where data was dropped or corrupted.
          </p>
        </div>
      </div>

      {/* Section 1: The CCTV Replay Mental Model */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Eye className="w-5 h-5 text-blue-500" />
          1. The Security Camera Replay Principle
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase flex items-center gap-1.5">
              📹 stream_mode="values" (Full Snapshot)
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Yields the <strong>complete state dictionary</strong> after every node finishes. Perfect for seeing accumulated context and overall graph progress.
            </p>
            <div className="p-2 rounded bg-slate-900 text-blue-300 font-mono text-[11px]">
              for state in graph.stream(input, stream_mode="values"): ...
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 uppercase flex items-center gap-1.5">
              🔬 stream_mode="updates" (Node Delta)
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Yields <strong>only the dictionary returned by that specific node</strong>. Perfect for catching accidental key overwrites or unexpected null returns.
            </p>
            <div className="p-2 rounded bg-slate-900 text-cyan-300 font-mono text-[11px]">
              for node_delta in graph.stream(input, stream_mode="updates"): ...
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Code Blueprint */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Code2 className="w-5 h-5 text-blue-500" />
          2. Inspecting State Transitions in Python
        </h2>
        <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs border border-slate-800 overflow-x-auto">
          <pre>{`# Stream mode 'updates' prints exact node mutations:
for event in app.stream({"raw_input": "Q3 Revenue"}, stream_mode="updates"):
    for node_name, state_delta in event.items():
        print(f"\\n--- Node Finished: [{node_name}] ---")
        for key, value in state_delta.items():
            print(f"  + {key}: {value}")

# Output trace makes bugs jump out immediately:
# --- Node Finished: [sql_planner] ---
#   + generated_sql: SELECT SUM(amount) FROM sales;
# --- Node Finished: [sql_executor] ---
#   + query_result: [{'total': 4820000}]`}</pre>
        </div>
      </section>

      {/* Interactive Studio */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-500" />
            3. Interactive State Time-Travel Studio
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Step-by-Step Inspector
          </span>
        </div>
        <StateTransitionTimeTravelStudio />
      </section>

      {/* Section 4: Golden Rule */}
      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 space-y-2">
        <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-semibold text-sm">
          <Lightbulb className="w-4 h-4 text-blue-500 shrink-0" />
          Diagnostic Rule: Fix the State Reducer, Not the Model
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          When messages disappear or tool outputs get overwritten, 95% of the time engineers blame the LLM. In reality, the node forgot to return an additive reducer like <code>Annotated[list, operator.add]</code> and accidentally overwrote the entire message list with a single item.
        </p>
      </div>

      {/* Quiz */}
      <section className="space-y-4">
        <Module3_3Quiz />
      </section>
    </div>
  );
}
