"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  Check,
  ArrowRight,
  Usb,
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
  Plug,
  Server,
  Terminal,
  Database,
  Globe,
} from "lucide-react";
import McpArchitectureStudio from "./McpArchitectureStudio";
import Module3_4Quiz from "./Module3_4Quiz";

export default function Module3_4Content() {
  const [selectedPillar, setSelectedPillar] = useState<string>("architecture");
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [activeCodeTab, setActiveCodeTab] = useState<"code" | "output">("code");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);

  const pillars = [
    {
      id: "architecture",
      title: "1. Tripartite Architecture",
      tagline: "Host • Client • Server",
      desc: "MCP decouples AI agents from tools. The Host (IDE or LangGraph agent) embeds an MCP Client, which connects over JSON-RPC to independent MCP Servers running anywhere.",
      icon: Layers,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-500/10",
      border: "border-blue-200 dark:border-blue-500/30",
      badge: "JSON-RPC 2.0",
      codeSnippet: `# 1. CONNECTING A LANGGRAPH AGENT AS AN MCP CLIENT
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

# Define parameters for the target MCP server subprocess
server_params = StdioServerParameters(
    command="npx",
    args=["-y", "@modelcontextprotocol/server-filesystem", "/data/documents"],
)

async def initialize_mcp_client():
    async with stdio_client(server_params) as (read_stream, write_stream):
        async with ClientSession(read_stream, write_stream) as session:
            # Protocol handshake & capability negotiation
            await session.initialize()
            
            # Discover available tools dynamically
            tools_list = await session.list_tools()
            print(f"Connected to MCP Server! Discovered {len(tools_list.tools)} tools.")
            return tools_list.tools`,
    },
    {
      id: "primitives",
      title: "2. The 3 Core Primitives",
      tagline: "Tools • Resources • Prompts",
      desc: "MCP organizes capabilities into three primitives: Tools (executable functions with side-effects), Resources (read-only file/DB payloads), and Prompts (pre-baked LLM interaction workflows).",
      icon: Plug,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      border: "border-emerald-200 dark:border-emerald-500/30",
      badge: "3 Primitives",
      codeSnippet: `# 2. BUILDING AN MCP SERVER WITH FASTMCP (Python)
from mcp.server.fastmcp import FastMCP

# Initialize FastMCP Server
mcp = FastMCP("DatabaseOperationsServer")

# PRIMITIVE 1: TOOL (Model-controlled function execution)
@mcp.tool()
def query_customers(status: str) -> list[dict]:
    """Queries customer database filtered by status."""
    return [{"id": 101, "name": "Acme Corp", "status": status}]

# PRIMITIVE 2: RESOURCE (Contextual data read stream)
@mcp.resource("schema://customers")
def get_customer_schema() -> str:
    """Returns database schema definition."""
    return "CREATE TABLE customers (id INT PRIMARY KEY, name TEXT, status TEXT);"

# PRIMITIVE 3: PROMPT (User-guided template)
@mcp.prompt()
def audit_customer(customer_id: int) -> str:
    return f"Perform security and billing audit for customer ID: {customer_id}"

if __name__ == "__main__":
    mcp.run()`,
    },
    {
      id: "transports",
      title: "3. Transports: Stdio vs SSE",
      tagline: "Local Pipes vs Remote Streams",
      desc: "MCP supports two transport protocols: Stdio (standard input/output pipes for local subprocesses like local CLI tools) and Server-Sent Events (SSE over HTTP) for cloud microservices.",
      icon: Server,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-500/10",
      border: "border-purple-200 dark:border-purple-500/30",
      badge: "Stdio & SSE",
      codeSnippet: `# 3. TRANSPORT PROTOCOLS COMPARISON
# OPTION A: Stdio (Local Subprocess Pipe)
# - Subprocess launched by Host
# - Ultra-low latency (<1ms)
# - Zero network overhead, local filesystem access
local_params = StdioServerParameters(
    command="python",
    args=["my_mcp_server.py"]
)

# OPTION B: SSE over HTTP (Remote Microservice)
# - Remote endpoint (e.g. https://mcp.internal.corp/sse)
# - Enables centralized tool servers shared across team
# - Authenticated via Bearer tokens
from mcp.client.sse import sse_client

async def connect_remote_mcp():
    async with sse_client("https://api.company.com/mcp/sse", headers={"Authorization": "Bearer key"}) as streams:
        async with ClientSession(*streams) as session:
            await session.initialize()`,
    },
    {
      id: "langgraph",
      title: "4. LangGraph Integration",
      tagline: "Plugging MCP into Agent Graphs",
      desc: "Use langchain-mcp-adapters to convert any MCP server's tools into standard LangChain BaseTools, instantly binding them to your LangGraph StateGraph nodes.",
      icon: Globe,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      border: "border-amber-200 dark:border-amber-500/30",
      badge: "langchain-mcp-adapters",
      codeSnippet: `# 4. CONVERTING MCP TOOLS FOR LANGGRAPH
from langchain_mcp_adapters.tools import load_mcp_tools
from langgraph.prebuilt import create_react_agent
from langchain_openai import ChatOpenAI

async def build_mcp_langgraph_agent(session):
    # Automatically convert MCP tools to LangChain BaseTools
    tools = await load_mcp_tools(session)
    
    # Model binds MCP tools seamlessly
    model = ChatOpenAI(model="gpt-4o").bind_tools(tools)
    
    # Standard LangGraph ReAct Agent powered by MCP tools!
    agent_graph = create_react_agent(model, tools=tools)
    
    response = await agent_graph.ainvoke({
        "messages": [("user", "List all customer accounts in the database")]
    })
    return response`,
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
      <div className="rounded-2xl border border-blue-200 dark:border-blue-500/30 bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-slate-50 dark:to-slate-950 p-6 md:p-8 relative overflow-hidden transition-colors">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-500/30">
              Module 3.4 • Universal Interoperability
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              ~20 min interactive
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Enabling Tool Interoperability with MCP
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            The <strong>Model Context Protocol (MCP)</strong> is the universal USB-C standard for AI agents. Eliminate M × N integration spaghetti by connecting your LangGraph agents to databases, GitHub, filesystem, and external APIs with zero proprietary glue code.
          </p>
        </div>
      </div>

      {/* SECTION 1: 4 PILLARS OF MCP */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-500" />
            1. The Core Architecture of MCP
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Select an MCP pillar to inspect
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
              MCP Protocol & Client Inspector
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
                  <span>Negotiating Handshake...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Simulate Handshake</span>
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
                mcp_integration.py • {selectedPillar}
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
                Protocol JSON-RPC Trace
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
                <p className="text-slate-400">&gt;&gt; [Client -&gt; Server] JSON-RPC Request:</p>
                <p className="text-sky-300">{"{ 'jsonrpc': '2.0', 'id': 1, 'method': 'initialize', 'params': { 'capabilities': {} } }"}</p>
                <p className="text-slate-400">&gt;&gt; [Server -&gt; Client] JSON-RPC Response:</p>
                <p className="text-emerald-400">{"{ 'jsonrpc': '2.0', 'id': 1, 'result': { 'serverInfo': { 'name': 'PostgresMCPServer' }, 'capabilities': { 'tools': {} } } }"}</p>
                <p className="text-slate-400">&gt;&gt; [Client -&gt; Server] Request tools list:</p>
                <p className="text-amber-300">{"{ 'jsonrpc': '2.0', 'id': 2, 'method': 'tools/list' }"}</p>
                <p className="text-emerald-300">&gt;&gt; [Server] Returned 3 tools: ['execute_sql', 'list_tables', 'describe_table']</p>
                <p className="text-emerald-400 font-bold">&gt;&gt; Handshake verified! LangGraph agent bound to 3 MCP tools.</p>
              </div>
            )}
          </div>
        </div>

        {/* Simulation Banner */}
        {simStep > 0 && (
          <div className="p-3.5 rounded-xl border border-blue-200 dark:border-blue-500/30 bg-blue-50/80 dark:bg-blue-950/30 flex items-center justify-between text-xs font-mono">
            <span className="text-blue-800 dark:text-blue-200">
              {simStep === 1 && "Host spawns MCP Server subprocess via Stdio transport pipe"}
              {simStep === 2 && "JSON-RPC 2.0 initialize request sent -> Capabilities exchanged"}
              {simStep === 3 && "tools/list requested -> Server returns JSON schemas for 3 tools"}
              {simStep === 4 && "langchain-mcp-adapters converts schemas into LangGraph tools!"}
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
            2. Interactive MCP Architecture Studio
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Host-Client-Server Interactive Explorer
          </span>
        </div>
        <McpArchitectureStudio />
      </section>

      {/* SECTION 4: HANDWRITTEN NOTE */}
      <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-500/30 bg-blue-50/90 dark:bg-blue-500/10 shadow-sm">
        <span className="font-['Caveat',cursive] text-base text-blue-950 dark:text-blue-200 block">
          📌 Architectural Paradigm: Why MCP is revolutionary — previously, every time Postgres or GitHub updated an API, 10 different agent frameworks broke. With MCP, database vendors publish one official MCP server, and EVERY agent runtime (LangGraph, Claude, Cursor) gets instant, zero-code compatibility!
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
              TRAP #1: Subprocess Zombie Leaks in Stdio
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              When using Stdio transport, if your Python host process crashes or fails to close the async context manager (<code>async with stdio_client</code>), the spawned npx/Python subprocess keeps running as an orphan zombie process, locking files and hogging RAM. Always manage client sessions with context managers.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-500/5 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
              TRAP #2: Confusing Tools with Resources
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Tools are executed by the LLM (they take parameters and can modify data). Resources are passive context providers read by the client application (like file contents or system schemas). Exposing a destructive write action as an MCP resource bypasses model guardrails and validation.
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
            ["1.", "Standardized Integration:", "MCP standardizes the interface between LLM applications and external data systems via JSON-RPC 2.0."],
            ["2.", "Flexible Deployment Options:", "Use Stdio for ultra-fast local subprocesses, and SSE/HTTP for enterprise microservices with central authentication."],
            ["3.", "Native Ecosystem Support:", "LangChain, LangGraph, and major IDEs natively support MCP adapters, making MCP the future-proof choice for agent tools."],
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
                Concept Check: Model Context Protocol
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {showQuiz ? "Click to collapse" : "Test your understanding of MCP architecture (3 questions)"}
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
              <Module3_4Quiz />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* SECTION 8: NEXT MODULE BRIDGE */}
      <section className="rounded-2xl border border-blue-200 dark:border-blue-500/30 bg-gradient-to-r from-blue-50 via-white to-slate-50 dark:from-blue-500/10 dark:via-slate-900 dark:to-slate-950 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">
            <span>Up Next • Module 3.5</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Building a Basic RAG System for Agents</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
            Give your agents factual grounding. Learn how to construct an agentic retrieval pipeline with chunking, vector indexing, semantic search, and citation synthesis.
          </p>
        </div>
        <Link
          href="/learn/level-3/module-3-5"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow-blue-500/20 transition-all shrink-0 cursor-pointer"
        >
          <span>Continue to Module 3.5</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
