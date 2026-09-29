"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  Check,
  ArrowRight,
  Database,
  HardDrive,
  Key,
  Layers,
  Sparkles,
  HelpCircle,
  Copy,
  CheckCheck,
  Play,
  RotateCcw,
  FileText,
  AlertTriangle,
  Code2,
  Workflow,
  Server,
  History,
} from "lucide-react";
import DatabaseCheckpointerStudio from "./DatabaseCheckpointerStudio";
import Module3_10Quiz from "./Module3_10Quiz";

export default function Module3_10Content() {
  const [selectedPillar, setSelectedPillar] = useState<string>("checkpointer");
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [activeCodeTab, setActiveCodeTab] = useState<"code" | "output">("code");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);

  const pillars = [
    {
      id: "checkpointer",
      title: "1. Checkpoint Snapshots",
      tagline: "Immutable Superstep Persistence",
      desc: "At every graph step, the checkpointer serializes state, config, and pending node tasks into an immutable database row with atomic commit semantics.",
      icon: Database,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-500/10",
      border: "border-blue-200 dark:border-blue-500/30",
      badge: "ACID Snapshots",
      codeSnippet: `# 1. POSTGRES CHECKPOINTER SETUP
from psycopg_pool import ConnectionPool
from langgraph.checkpoint.postgres import PostgresSaver
from langgraph.graph import StateGraph

# Initialize enterprise connection pool
DB_URI = "postgresql://agent_admin:secret@pg-cluster.internal:5432/agents_db"
pool = ConnectionPool(conninfo=DB_URI, max_size=20)

# Instantiate checkpointer and migrate tables
checkpointer = PostgresSaver(pool)
checkpointer.setup() # Automatically creates 'checkpoints' and 'checkpoint_blobs'

# Compile agent with database persistence
app = graph_builder.compile(checkpointer=checkpointer)`,
    },
    {
      id: "threads",
      title: "2. Thread Partitioning",
      tagline: "Multi-Tenant Session Isolation",
      desc: "Every conversation is partitioned by a unique thread_id in the configurable dictionary. Multiple users execute simultaneously with zero state bleed or cross-talk.",
      icon: Key,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-500/10",
      border: "border-purple-200 dark:border-purple-500/30",
      badge: "thread_id Isolation",
      codeSnippet: `# 2. RUNNING MULTI-TENANT CONVERSATION THREADS
# User Alice's thread
alice_config = {"configurable": {"thread_id": "usr_alice_sess_01"}}
app.invoke({"messages": [("user", "My name is Alice")]}, alice_config)

# User Bob's thread (Completely separate session in DB!)
bob_config = {"configurable": {"thread_id": "usr_bob_sess_99"}}
app.invoke({"messages": [("user", "My name is Bob")]}, bob_config)

# Later turn for Alice: LangGraph queries DB for Alice's checkpoint only!
response = app.invoke({"messages": [("user", "What is my name?")]}, alice_config)
print(response["messages"][-1].content) # -> "Your name is Alice."`,
    },
    {
      id: "timetravel",
      title: "3. Time-Travel & Forking",
      tagline: "Rewinding Historical Checkpoints",
      desc: "Because checkpoints are immutable logs rather than destructive updates, you can inspect app.get_state_history(config), pick any prior turn, and fork execution from the past.",
      icon: History,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      border: "border-emerald-200 dark:border-emerald-500/30",
      badge: "State Time-Travel",
      codeSnippet: `# 3. TIME-TRAVEL FORKING FROM PRIOR TURNS
# Get full history of snapshots for this session
history = list(app.get_state_history(alice_config))
print(f"Total turns recorded in DB: {len(history)}")

# Pick the snapshot from 2 turns ago
target_checkpoint = history[2]
print(f"Checkpoint ID: {target_checkpoint.config['configurable']['checkpoint_id']}")

# Resume / fork execution from that exact historical checkpoint:
forked_config = {
    "configurable": {
        "thread_id": "usr_alice_sess_01",
        "checkpoint_id": target_checkpoint.config["configurable"]["checkpoint_id"]
    }
}
app.invoke({"messages": [("user", "Let's change direction...")]}, forked_config)`,
    },
    {
      id: "lifecycle",
      title: "4. Production Resilience",
      tagline: "Crash Recovery & Zero Data Loss",
      desc: "If your Kubernetes pod dies mid-execution, the incoming container picks up the thread_id from Postgres and resumes from the exact last completed node without missing a token.",
      icon: Server,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      border: "border-amber-200 dark:border-amber-500/30",
      badge: "Crash Fault-Tolerance",
      codeSnippet: `# 4. CRASH FAULT-TOLERANCE PATTERN
def execute_resilient_job(thread_id: str, prompt: str):
    config = {"configurable": {"thread_id": thread_id}}
    
    # 1. Inspect if thread was already in-flight before container crash
    state_snapshot = app.get_state(config)
    
    if state_snapshot.next:
        print(f"Resuming interrupted execution from pending node: {state_snapshot.next}")
        return app.invoke(None, config)
        
    # 2. Otherwise run new turn normally
    return app.invoke({"messages": [("user", prompt)]}, config)`,
    },
  ];

  const currentSnippet = pillars.find((p) => p.id === selectedPillar)?.codeSnippet || "";

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const runSimulation = () => {
    setIsSimulating(true);
    setSimStep(1);
    setTimeout(() => setSimStep(2), 700);
    setTimeout(() => setSimStep(3), 1400);
    setTimeout(() => {
      setSimStep(4);
      setIsSimulating(false);
    }, 2100);
  };

  return (
    <div className="space-y-10">
      {/* HERO BANNER */}
      <div className="rounded-2xl border border-blue-200 dark:border-blue-500/30 bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-slate-50 dark:to-slate-950 p-6 md:p-8 relative overflow-hidden transition-colors">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-500/30">
              Module 3.10 • Database Persistence
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              ~20 min interactive
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Managing Conversation History in a Database
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            In-memory state vanishes when servers reboot. In this lesson, we connect LangGraph to <strong>PostgreSQL and Redis checkpointers</strong>: implementing thread-partitioned sessions, immutable audit logs, crash recovery, and time-travel debugging.
          </p>
        </div>
      </div>

      {/* SECTION 1: 4 PILLARS OF DATABASE CHECKPOINTING */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-500" />
            1. Core Architecture of Database Checkpointers
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Select a database mechanism to inspect
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            const isSelected = selectedPillar === pillar.id;
            return (
              <button
                key={pillar.id}
                onClick={() => setSelectedPillar(pillar.id)}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? `${pillar.border} ${pillar.bg} shadow-md ring-1 ring-blue-500/50`
                    : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className={`p-2 rounded-lg ${pillar.bg} ${pillar.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 font-semibold">
                      {pillar.badge}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    {pillar.title}
                  </h3>
                  <div className="text-[11px] font-medium text-blue-600 dark:text-blue-400">
                    {pillar.tagline}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* SECTION 2: CODE & EXECUTION INSPECTOR */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-blue-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white font-mono uppercase tracking-wider">
              Postgres Checkpointer Inspector
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={runSimulation}
              disabled={isSimulating}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-xs disabled:opacity-50 transition-all cursor-pointer"
            >
              {isSimulating ? (
                <>
                  <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                  <span>Committing Snapshot...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Simulate DB Commit</span>
                </>
              )}
            </button>
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 text-slate-600 dark:text-slate-400 text-xs font-mono transition-all cursor-pointer"
            >
              {copiedCode ? <CheckCheck className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? "Copied" : "Copy"}</span>
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden text-xs font-mono shadow-md">
          <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800/80 bg-slate-900/60">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
              <span className="text-slate-400 text-[11px] ml-2 font-mono">
                postgres_checkpoint.py • {selectedPillar}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveCodeTab("code")}
                className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition-all ${
                  activeCodeTab === "code"
                    ? "bg-blue-600/30 text-blue-300 border border-blue-500/40"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Code
              </button>
              <button
                onClick={() => setActiveCodeTab("output")}
                className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition-all ${
                  activeCodeTab === "output"
                    ? "bg-blue-600/30 text-blue-300 border border-blue-500/40"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Postgres SQL Logs
              </button>
            </div>
          </div>

          <div className="p-4 overflow-x-auto text-slate-300 leading-relaxed font-mono">
            {activeCodeTab === "code" ? (
              <pre>
                <code>{currentSnippet}</code>
              </pre>
            ) : (
              <div className="space-y-2 text-blue-300 font-mono text-[11px]">
                <p className="text-slate-400">&gt;&gt; [PostgresSaver Pool] Connecting to postgres-cluster:5432</p>
                <p className="text-sky-300">INSERT INTO checkpoints (thread_id, checkpoint_ns, checkpoint_id, parent_checkpoint_id, type) VALUES ('usr_alice_sess_01', '', '1ef92-a8b2', '1ef92-a8b1', 'jsonb');</p>
                <p className="text-amber-300">INSERT INTO checkpoint_blobs (thread_id, checkpoint_id, channel, version, type, blob) VALUES ('usr_alice_sess_01', '1ef92-a8b2', 'messages', '1.0', 'bytes', '\\x800495...');</p>
                <p className="text-emerald-400 font-bold">&gt;&gt; COMMIT TRANSACTION. Snapshot saved with zero latency impact (&lt;3ms).</p>
                <p className="text-slate-300">&gt;&gt; Thread 'usr_alice_sess_01' safely checkpointed to disk.</p>
              </div>
            )}
          </div>
        </div>

        {/* Simulation Banner */}
        {simStep > 0 && (
          <div className="p-3.5 rounded-xl border border-blue-200 dark:border-blue-500/30 bg-blue-50/80 dark:bg-blue-950/30 flex items-center justify-between text-xs font-mono">
            <span className="text-blue-800 dark:text-blue-200">
              {simStep === 1 && "User turn begins -> LangGraph looks up latest checkpoint row by thread_id"}
              {simStep === 2 && "State loaded into memory -> Node executes and returns delta"}
              {simStep === 3 && "Reducer aggregates state -> Serializer writes new row to checkpoints table"}
              {simStep === 4 && "Transaction commits atomically -> Response delivered to user!"}
            </span>
            <span className="text-blue-600 dark:text-blue-400 font-bold">
              Step {simStep}/4
            </span>
          </div>
        )}
      </section>

      {/* SECTION 3: INTERACTIVE STUDIO */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-500" />
            2. Interactive Database Checkpointer Studio
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Multi-Tenant Thread Inspector
          </span>
        </div>
        <DatabaseCheckpointerStudio />
      </section>

      {/* SECTION 4: HANDWRITTEN NOTE */}
      <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-500/30 bg-blue-50/90 dark:bg-blue-500/10 shadow-sm">
        <span className="font-['Caveat',cursive] text-base text-blue-950 dark:text-blue-200 block">
          📌 Video Game Save Slots: MemorySaver is like keeping game progress in your RAM — turn off the console, and it is gone forever. PostgresSaver gives you permanent hard drive save slots. Each thread_id is a different player profile with their own saved games!
        </span>
      </div>

      {/* SECTION 5: TRAPS & PITFALLS */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          Common Engineering Traps
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-500/30 bg-rose-50/50 dark:bg-rose-500/5 space-y-2">
            <span className="text-xs font-mono font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider block">
              TRAP #1: Connection Pool Starvation
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Creating a new database connection inside every agent invocation will quickly exhaust PostgreSQL&apos;s <code>max_connections</code> under traffic. Always instantiate a single shared <code>ConnectionPool</code> at application startup and pass it to the checkpointer.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-500/5 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
              TRAP #2: Storing Giant Blobs in Checkpoint State
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Placing raw 20MB PDF byte arrays or images directly into the State dictionary means every node execution writes a new 20MB record into Postgres, swelling the database to hundreds of gigabytes within days. Save blobs to S3 and store only the S3 URL in State.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6: KEY TAKEAWAYS */}
      <section className="rounded-xl border border-blue-200 dark:border-blue-500/30 bg-blue-50/50 dark:bg-blue-500/5 p-5 space-y-3">
        <h4 className="font-bold text-sm text-blue-900 dark:text-blue-300 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          Key Architectural Takeaways
        </h4>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          {[
            ["1.", "Thread Partitioning:", "Use thread_id to isolate multi-tenant user conversations cleanly in PostgreSQL or Redis."],
            ["2.", "Immutable Audit Trail:", "Checkpointers append snapshots rather than overwriting, giving you full compliance history and rollback capabilities."],
            ["3.", "Crash Resilience:", "Severed network connections or pod restarts can pick up right where they left off by querying the latest thread checkpoint."],
          ].map(([n, bold, rest]) => (
            <li key={n} className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400 font-bold">{n}</span>
              <span><strong>{bold}</strong> {rest}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* SECTION 7: QUIZ */}
      <section className="space-y-3">
        <button
          onClick={() => setShowQuiz(!showQuiz)}
          className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all text-left cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                Concept Check: Database Checkpointers
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {showQuiz ? "Click to collapse" : "Test your understanding of threads and persistence (3 questions)"}
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-semibold px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30">
            {showQuiz ? "Hide Quiz" : "Start Quiz"}
          </span>
        </button>
        <AnimatePresence>
          {showQuiz && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Module3_10Quiz />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* SECTION 8: NEXT MODULE BRIDGE */}
      <section className="rounded-2xl border border-blue-200 dark:border-blue-500/30 bg-gradient-to-r from-blue-50 via-white to-slate-50 dark:from-blue-500/10 dark:via-slate-900 dark:to-slate-950 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">
            <span>Up Next • Module 3.11</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Implementing Semantic Memory with Vector Stores</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
            Short-term memory tracks the current chat, but long-term memory tracks user preferences across weeks and months. Learn how to build persistent episodic and semantic memory.
          </p>
        </div>
        <Link
          href="/learn/level-3/module-3-11"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow-blue-500/20 transition-all shrink-0 cursor-pointer"
        >
          <span>Continue to Module 3.11</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
