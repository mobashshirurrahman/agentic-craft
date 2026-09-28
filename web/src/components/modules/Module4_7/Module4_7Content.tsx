"use client";
import React from "react";
import { AlertTriangle, Code2, Sparkles, Lightbulb, CheckCircle2 } from "lucide-react";
import ErrorRecoverySimulator from "./ErrorRecoverySimulator";
import Module4_7Quiz from "./Module4_7Quiz";

export default function Module4_7Content() {
  return (
    <div className="space-y-10">
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-red-500/10 via-rose-500/5 to-slate-50 dark:to-slate-950 p-6 md:p-8">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-red-500/20 text-red-700 dark:text-red-300 border border-red-500/30">Module 4.7 • Production, Scaling & Optimization</span>
            <span className="text-xs font-mono text-slate-500">~27 min</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Developing Error Handling and Recovery Pathways</h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Here&apos;s what 3am production oncall looks like without proper error handling: your agent gets a 503, raises an unhandled exception, the supervisor retries it 50 times simultaneously, and now <em>your retries are the reason</em> the service is down for everyone. Proper error handling isn&apos;t defensive programming — it&apos;s the difference between a 2-minute incident and a 2-hour outage.
          </p>
        </div>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-red-500" />1. The 4 Error Types — Know Them Before You Handle Them</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { type: "Transient", color: "amber", examples: "HTTP 503, 429, 500, network timeout", handling: "Retry with exponential backoff. These self-resolve with time." },
            { type: "Permanent", color: "red", examples: "HTTP 401, 403, 404, malformed input", handling: "Never retry. Detect and route to error handler immediately." },
            { type: "Partial", color: "orange", examples: "2 of 3 parallel tools succeed", handling: "Continue with available data. Flag missing data in state." },
            { type: "Cascading", color: "purple", examples: "One failure triggers wave of failures downstream", handling: "Circuit breaker — stop calling the failing service." },
          ].map((e) => (
            <div key={e.type} className={`p-4 rounded-xl border border-${e.color}-200 dark:border-${e.color}-900/40 bg-${e.color}-50 dark:bg-${e.color}-950/20 space-y-2`}>
              <h3 className={`text-sm font-bold text-${e.color}-700 dark:text-${e.color}-400`}>{e.type}</h3>
              <p className="text-[10px] font-mono text-slate-500">{e.examples}</p>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{e.handling}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2"><Code2 className="w-5 h-5 text-teal-500" />2. Circuit Breaker Pattern in LangGraph</h2>
        <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs border border-slate-800 overflow-x-auto">
          <pre>{`from typing import TypedDict

class AgentState(TypedDict):
    messages: list
    errors: list[dict]          # tracks errors through workflow
    circuit_breaker: dict       # { "failures": int, "state": "closed|open|half_open" }
    last_error: str | None

def tool_node_with_circuit_breaker(state: AgentState):
    cb = state.get("circuit_breaker", {"failures": 0, "state": "closed"})
    
    # If circuit is OPEN — fail fast without calling the service
    if cb["state"] == "open":
        return {
            "last_error": "CIRCUIT_OPEN",
            "errors": state["errors"] + [{"node": "search", "type": "CIRCUIT_OPEN"}]
        }
    
    try:
        result = search_api(state["messages"][-1].content)
        # Success — reset failure count, keep circuit closed
        return {
            "messages": state["messages"] + [result],
            "circuit_breaker": {"failures": 0, "state": "closed"}
        }
    except TransientError:
        failures = cb["failures"] + 1
        new_state = "open" if failures >= 5 else "closed"
        return {
            "last_error": "NETWORK_ERROR",
            "circuit_breaker": {"failures": failures, "state": new_state},
            "errors": state["errors"] + [{"node": "search", "type": "TRANSIENT", "attempt": failures}]
        }
    except PermanentError as e:
        # Don't increment circuit breaker — route directly to error handler
        return {"last_error": str(e), "errors": state["errors"] + [{"type": "PERMANENT"}]}`}</pre>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2"><Sparkles className="w-5 h-5 text-red-500" />3. Error Recovery Simulator</h2>
          <span className="text-xs font-mono text-slate-500">4 Scenarios</span>
        </div>
        <ErrorRecoverySimulator />
      </section>

      <div className="p-4 rounded-xl border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-950/20 space-y-2">
        <div className="flex items-center gap-2 text-red-800 dark:text-red-300 font-semibold text-sm"><AlertTriangle className="w-4 h-4 shrink-0" />The Silent Failure Trap: Your Worst Production Bug</div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          <code>try: ... except Exception: log.warning("error"); return {"{}"}</code> — this pattern looks harmless but causes the most damage. The agent continues reasoning on empty data, produces a confident-sounding but wrong answer, and logs nothing alarming. You find out two weeks later when 15% of your users have been getting incorrect answers. Always propagate errors explicitly through agent state.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500" />Key Takeaways</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { title: "Classify Before Handling", body: "Transient = retry. Permanent = fail fast. Partial = skip + flag. Cascading = circuit break. The wrong handler for the wrong error type makes things worse." },
            { title: "Circuit Breakers Protect Everyone", body: "When a service is down, aggressive retries from multiple agents amplify the outage. Open the circuit: fail fast locally, give the service breathing room to recover." },
            { title: "Errors Are State", body: "Carry error information through your agent state. Downstream nodes need to know what failed and why — or they'll reason on top of missing data and produce wrong answers." },
          ].map((item) => (
            <div key={item.title} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
              <h3 className="text-xs font-bold text-red-700 dark:text-red-400">{item.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="space-y-4"><Module4_7Quiz /></section>
    </div>
  );
}
