"use client";

import React, { useState } from "react";
import {
  Code2,
  Terminal,
  Play,
  RotateCcw,
  Sparkles,
  Server,
  Layers,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Network,
  Cpu,
  ShieldCheck,
} from "lucide-react";

export default function ToolExecutionStudio() {
  const [activeTab, setActiveTab] = useState<"schema" | "mcp">("schema");

  // Tab 1: Schema & Execution States
  const [selectedTestCase, setSelectedTestCase] = useState<"valid" | "invalid">("valid");
  const [showJsonSchema, setShowJsonSchema] = useState<boolean>(false);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [copied, setCopied] = useState<boolean>(false);

  // Tab 2: MCP States
  const [selectedMcpServer, setSelectedMcpServer] = useState<"postgres" | "github" | "filesystem">("postgres");
  const [mcpStep, setMcpStep] = useState<"idle" | "listing" | "calling" | "complete">("idle");
  const [mcpLogs, setMcpLogs] = useState<string[]>([]);

  // Python Tool Code
  const pythonCode = `# Production Tool Definition in Python using Pydantic
from pydantic import BaseModel, Field
from typing import Literal

class FinancialQueryInput(BaseModel):
    """Schema for querying quarterly financial records."""
    ticker: str = Field(
        ..., 
        description="Stock ticker symbol in capital letters, e.g. 'AAPL' or 'GOOGL'"
    )
    quarter: Literal["Q1", "Q2", "Q3", "Q4"] = Field(
        ..., 
        description="Fiscal quarter to analyze"
    )
    fiscal_year: int = Field(
        ..., 
        ge=2015, 
        le=2026, 
        description="Four-digit fiscal year between 2015 and 2026"
    )

def query_financial_metrics(ticker: str, quarter: str, fiscal_year: int) -> dict:
    """
    Retrieves revenue, EPS, and gross margin for public companies.
    Returns: JSON dictionary with audited SEC filing statistics.
    """
    # 1. Pydantic validates inputs automatically
    # 2. Database query executed safely via parameterized SQL
    return {
        "ticker": ticker.upper(),
        "quarter": quarter,
        "fiscal_year": fiscal_year,
        "revenue_billions": 85.78,
        "net_income_billions": 21.45,
        "eps": 1.40,
        "status": "audited"
    }`;

  // Compiled JSON Schema
  const generatedJsonSchema = `{
  "type": "function",
  "function": {
    "name": "query_financial_metrics",
    "description": "Retrieves revenue, EPS, and gross margin for public companies. Returns audited SEC filing statistics.",
    "parameters": {
      "type": "object",
      "properties": {
        "ticker": {
          "type": "string",
          "description": "Stock ticker symbol in capital letters, e.g. 'AAPL' or 'GOOGL'"
        },
        "quarter": {
          "type": "string",
          "enum": ["Q1", "Q2", "Q3", "Q4"],
          "description": "Fiscal quarter to analyze"
        },
        "fiscal_year": {
          "type": "integer",
          "minimum": 2015,
          "maximum": 2026,
          "description": "Four-digit fiscal year between 2015 and 2026"
        }
      },
      "required": ["ticker", "quarter", "fiscal_year"],
      "additionalProperties": false
    }
  }
}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(pythonCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const runToolSimulation = () => {
    setIsExecuting(true);
    setConsoleLogs([]);

    if (selectedTestCase === "valid") {
      const logs = [
        "[*] [Agent LLM]: Received user prompt: 'What was Apple revenue in Q3 2024?'",
        "[*] [Agent LLM]: Evaluated tool catalog. Selected tool: 'query_financial_metrics'",
        "[*] [Agent LLM]: Emitted tool call JSON payload:",
        '    {"ticker": "AAPL", "quarter": "Q3", "fiscal_year": 2024}',
        "[+] [Host Runtime]: Intercepted tool call. Validating against Pydantic schema...",
        "    - Field 'ticker' = 'AAPL' -> PASSED",
        "    - Field 'quarter' = 'Q3' (in ['Q1','Q2','Q3','Q4']) -> PASSED",
        "    - Field 'fiscal_year' = 2024 (2015 <= 2024 <= 2026) -> PASSED",
        "[+] [Database Connection]: Executing parameterized query on SEC database replica...",
        "[+] [Tool Output]: 200 OK -> {\"revenue_billions\": 85.78, \"eps\": 1.40, \"status\": \"audited\"}",
        "[+] [Agent LLM]: Observation ingested into context. Generating final response to user:",
        '    "In Q3 2024, Apple (AAPL) generated $85.78 billion in revenue with an EPS of $1.40."'
      ];

      logs.forEach((log, index) => {
        setTimeout(() => {
          setConsoleLogs((prev) => [...prev, log]);
          if (index === logs.length - 1) setIsExecuting(false);
        }, (index + 1) * 260);
      });
    } else {
      const logs = [
        "[*] [Agent LLM]: Received user prompt: 'Give me finances for summer last year'",
        "[!] [Agent LLM]: Hallucinated invalid parameters in tool call:",
        '    {"ticker": "aapl", "quarter": "SUMMER", "fiscal_year": "last year"}',
        "[X] [Pydantic Validation ERROR]: Input payload rejected by schema validator!",
        "    - ValidationError: quarter='SUMMER' not in Literal['Q1','Q2','Q3','Q4']",
        "    - ValidationError: fiscal_year='last year' is not an integer between 2015 and 2026",
        "[!] [Host Runtime]: Intercepted error. Injecting validation feedback into LLM context...",
        "[*] [Agent LLM (Self-Healing)]: Reading validation error. Correcting parameters autonomously:",
        '    {"ticker": "AAPL", "quarter": "Q3", "fiscal_year": 2024}',
        "[+] [Host Runtime]: Re-validation check: ALL 3 PARAMETERS PASSED!",
        "[+] [Tool Output]: 200 OK -> SEC Data retrieved successfully after recovery cycle."
      ];

      logs.forEach((log, index) => {
        setTimeout(() => {
          setConsoleLogs((prev) => [...prev, log]);
          if (index === logs.length - 1) setIsExecuting(false);
        }, (index + 1) * 300);
      });
    }
  };

  const runMcpSimulation = () => {
    setMcpStep("listing");
    setMcpLogs([
      `[1/3] [Agent Client]: Connecting to '${selectedMcpServer}-mcp' via JSON-RPC stdio...`,
      `[1/3] [Handshake]: Sent initialize request -> Protocol version: 2024-11-05`,
      `[1/3] [Server]: Initialized! Capabilities: { "tools": true, "resources": true }`
    ]);

    setTimeout(() => {
      setMcpStep("calling");
      setMcpLogs((prev) => [
        ...prev,
        `[2/3] [Agent Client]: Sending 'tools/list' request to MCP server...`,
        selectedMcpServer === "postgres"
          ? `[2/3] [Server]: Registered tools: ['query_read_only', 'describe_schema', 'explain_query']`
          : selectedMcpServer === "github"
          ? `[2/3] [Server]: Registered tools: ['search_repositories', 'create_pull_request', 'read_issue']`
          : `[2/3] [Server]: Registered tools: ['read_file', 'write_file', 'list_directory']`,
        `[2/3] [Agent Client]: Invoking 'tools/call' on ${selectedMcpServer} server...`
      ]);

      setTimeout(() => {
        setMcpStep("complete");
        setMcpLogs((prev) => [
          ...prev,
          `[3/3] [MCP JSON-RPC Wire Frame]:`,
          JSON.stringify(
            {
              jsonrpc: "2.0",
              id: "req_mcp_4402",
              result: {
                content: [
                  {
                    type: "text",
                    text:
                      selectedMcpServer === "postgres"
                        ? "Query executed: SELECT count(*) FROM users -> Result: 48,219 active records."
                        : selectedMcpServer === "github"
                        ? "GitHub Issue #104 fetched: 'Fix CSS z-index modal bug on mobile devices'."
                        : "Directory /src/components contains 24 TypeScript files."
                  }
                ],
                isError: false
              }
            },
            null,
            2
          ),
          `[+] [MCP Transaction]: 200 SUCCESS via universal standard.`
        ]);
      }, 700);
    }, 700);
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden shadow-sm dark:shadow-2xl">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-teal-500 animate-pulse" />
            <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
              Interactive Tool Engineering &amp; MCP Studio
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Test Python schemas, validation resilience, and universal Model Context Protocol (MCP) servers
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-white dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm text-xs font-mono self-start sm:self-center">
          <button
            onClick={() => setActiveTab("schema")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all touch-manipulation active:scale-95 ${
              activeTab === "schema"
                ? "bg-teal-600 text-white font-bold shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Python Tool &amp; Schema</span>
          </button>
          <button
            onClick={() => setActiveTab("mcp")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all touch-manipulation active:scale-95 ${
              activeTab === "mcp"
                ? "bg-teal-600 text-white font-bold shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            <span>Model Context Protocol (MCP)</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Python Tool & JSON Schema Explorer */}
      {activeTab === "schema" ? (
        <div className="p-4 sm:p-5 grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left: Code & Schema View */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowJsonSchema(false)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all touch-manipulation ${
                    !showJsonSchema
                      ? "bg-teal-50 dark:bg-teal-500/20 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-500/40"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  Python Definition (@tool)
                </button>
                <button
                  onClick={() => setShowJsonSchema(true)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all touch-manipulation ${
                    showJsonSchema
                      ? "bg-teal-50 dark:bg-teal-500/20 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-500/40"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  Compiled JSON Schema (LLM View)
                </button>
              </div>

              {!showJsonSchema && (
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1 text-xs text-slate-500 hover:text-teal-600 dark:hover:text-teal-400 transition-colors touch-manipulation active:scale-95"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied!" : "Copy Code"}</span>
                </button>
              )}
            </div>

            <div className="relative rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-inner">
              <pre className="p-4 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed max-h-[380px]">
                {showJsonSchema ? generatedJsonSchema : pythonCode}
              </pre>
            </div>

            <div className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2 bg-slate-50 dark:bg-slate-900/40 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
              <Sparkles className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
              <span>
                <strong>How the magic works:</strong> The LLM never sees raw Python code! Frameworks convert Pydantic type annotations into the JSON Schema shown above. The model uses the parameter schema to formulate valid structured tool calls.
              </span>
            </div>
          </div>

          {/* Right: Test Execution Terminal */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold block">
                Simulate Agent Tool Calling Test Case
              </span>

              {/* Scenario options */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setSelectedTestCase("valid")}
                  className={`p-2.5 rounded-lg border text-left transition-all touch-manipulation ${
                    selectedTestCase === "valid"
                      ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-500/15 text-emerald-950 dark:text-emerald-200 shadow-sm"
                      : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      Test Case A: Valid Inputs
                    </span>
                    <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/20 px-1.5 py-0.5 rounded font-bold">
                      Pass
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-mono mt-1">
                    ticker=&quot;AAPL&quot;, quarter=&quot;Q3&quot;, fiscal_year=2024
                  </p>
                </button>

                <button
                  onClick={() => setSelectedTestCase("invalid")}
                  className={`p-2.5 rounded-lg border text-left transition-all touch-manipulation ${
                    selectedTestCase === "invalid"
                      ? "border-rose-500 bg-rose-50 dark:bg-rose-500/15 text-rose-950 dark:text-rose-200 shadow-sm"
                      : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      Test Case B: Schema Validation Failure
                    </span>
                    <span className="text-[10px] font-mono text-rose-700 dark:text-rose-400 bg-rose-100 dark:bg-rose-500/20 px-1.5 py-0.5 rounded font-bold">
                      Self-Healing
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-mono mt-1">
                    quarter=&quot;SUMMER&quot;, fiscal_year=&quot;last year&quot;
                  </p>
                </button>
              </div>

              {/* Run Trigger */}
              <button
                onClick={runToolSimulation}
                disabled={isExecuting}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-500 text-white shadow-sm transition-all disabled:opacity-50 touch-manipulation active:scale-95"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isExecuting ? "Executing Pipeline..." : "Run Tool Call Simulation"}</span>
              </button>
            </div>

            {/* Terminal Window */}
            <div className="flex-1 min-h-[220px] rounded-xl border border-slate-800 bg-slate-950 p-3.5 font-mono text-xs shadow-inner flex flex-col">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-slate-400 text-[11px]">
                <div className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-teal-400" />
                  <span>Runtime Stream &amp; Validation Logs</span>
                </div>
                <span>stdout</span>
              </div>
              <div className="flex-1 overflow-y-auto mt-2 space-y-1.5 text-slate-300 text-[11px] leading-relaxed scrollbar-thin">
                {consoleLogs.length === 0 ? (
                  <span className="text-slate-600 italic">
                    Click &quot;Run Tool Call Simulation&quot; above to view live parsing, validation, and self-healing error traces...
                  </span>
                ) : (
                  consoleLogs.map((log, idx) => (
                    <div
                      key={idx}
                      className={
                        log.includes("ERROR")
                          ? "text-rose-400 font-semibold"
                          : log.includes("200 OK") || log.includes("PASSED")
                          ? "text-emerald-300 font-semibold"
                          : log.includes("Self-Healing") || log.includes("Recovery")
                          ? "text-amber-300"
                          : "text-slate-300"
                      }
                    >
                      {log}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Tab 2: Model Context Protocol (MCP) Architecture */
        <div className="p-4 sm:p-5 grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left: Architecture Comparison */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">
              The M × N Integration Problem vs. Universal MCP
            </h4>

            {/* Comparison boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Old way */}
              <div className="rounded-xl border border-rose-200 dark:border-rose-500/30 bg-rose-50/50 dark:bg-rose-950/10 p-4 flex flex-col shadow-sm">
                <div className="flex items-center gap-1.5 text-rose-700 dark:text-rose-400 text-xs font-bold mb-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>The Old Way (Bespoke)</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                  If you have 4 AI frameworks and 10 external tools (GitHub, Slack, SQL, Drive), you must write and maintain <strong>40 custom connectors</strong>.
                </p>
                <div className="mt-auto bg-white dark:bg-slate-950 rounded p-2 text-[10px] font-mono text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900/50">
                  4 AI Agents × 10 APIs = 40 Custom Connectors (Brittle)
                </div>
              </div>

              {/* MCP Way */}
              <div className="rounded-xl border border-teal-200 dark:border-teal-500/30 bg-teal-50/50 dark:bg-teal-950/10 p-4 flex flex-col shadow-sm">
                <div className="flex items-center gap-1.5 text-teal-700 dark:text-teal-400 text-xs font-bold mb-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>The MCP Standard</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                  The open standard protocol: The tool author creates <strong>1 MCP Server</strong>. Any MCP-compliant client can instantly use it via JSON-RPC!
                </p>
                <div className="mt-auto bg-white dark:bg-slate-950 rounded p-2 text-[10px] font-mono text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-900/50">
                  4 AI Agents + 10 MCP Servers = 14 Components
                </div>
              </div>
            </div>

            {/* Architecture Flow Diagram */}
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 p-4 shadow-sm">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold block mb-3">
                Standard MCP Client-Server Handshake
              </span>
              <div className="flex items-center justify-between text-xs font-mono text-slate-800 dark:text-slate-200 gap-2">
                <div className="p-2.5 rounded-lg bg-teal-50 dark:bg-teal-500/20 border border-teal-200 dark:border-teal-500/40 text-center flex-1 shadow-sm">
                  <div className="font-bold text-teal-800 dark:text-teal-300">AI Client</div>
                  <div className="text-[10px] text-slate-500">Agent / IDE Host</div>
                </div>

                <div className="text-center text-[10px] text-teal-600 dark:text-teal-400 font-semibold px-1">
                  JSON-RPC
                  <br />
                  ⇄ stdio / SSE ⇄
                </div>

                <div className="p-2.5 rounded-lg bg-sky-50 dark:bg-sky-500/20 border border-sky-200 dark:border-sky-500/40 text-center flex-1 shadow-sm">
                  <div className="font-bold text-sky-800 dark:text-sky-300">MCP Server</div>
                  <div className="text-[10px] text-slate-500">Tools &amp; Resources</div>
                </div>

                <div className="text-center text-[10px] text-purple-600 dark:text-purple-400 font-semibold px-1">
                  Executes
                  <br />
                  ➔
                </div>

                <div className="p-2.5 rounded-lg bg-purple-50 dark:bg-purple-500/20 border border-purple-200 dark:border-purple-500/40 text-center flex-1 shadow-sm">
                  <div className="font-bold text-purple-800 dark:text-purple-300">Target System</div>
                  <div className="text-[10px] text-slate-500">Database / API</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Live MCP Inspector Simulator */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-4">
            <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold block">
                Test a Pre-Built MCP Server
              </span>

              <div className="grid grid-cols-3 gap-2">
                {(["postgres", "github", "filesystem"] as const).map((srv) => (
                  <button
                    key={srv}
                    onClick={() => {
                      setSelectedMcpServer(srv);
                      setMcpStep("idle");
                      setMcpLogs([]);
                    }}
                    className={`py-2 px-2 rounded-lg text-xs font-mono font-semibold transition-all border touch-manipulation ${
                      selectedMcpServer === srv
                        ? "bg-teal-600 text-white font-bold border-teal-500 shadow-sm"
                        : "bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800"
                    }`}
                  >
                    {srv}-mcp
                  </button>
                ))}
              </div>

              <button
                onClick={runMcpSimulation}
                disabled={mcpStep === "listing" || mcpStep === "calling"}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-500 text-white shadow-sm transition-all disabled:opacity-50 touch-manipulation active:scale-95"
              >
                <Network className="w-3.5 h-3.5" />
                <span>Simulate MCP Handshake &amp; Tool Invocation</span>
              </button>
            </div>

            {/* MCP Console Stream */}
            <div className="flex-1 min-h-[220px] rounded-xl border border-slate-800 bg-slate-950 p-3.5 font-mono text-xs shadow-inner flex flex-col">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-slate-400 text-[11px]">
                <div className="flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5 text-teal-400" />
                  <span>MCP JSON-RPC Wire Traffic</span>
                </div>
                <span>stdio transport</span>
              </div>
              <div className="flex-1 overflow-y-auto mt-2 space-y-1.5 text-slate-300 text-[11px] leading-relaxed scrollbar-thin">
                {mcpLogs.length === 0 ? (
                  <span className="text-slate-600 italic">
                    Select an MCP Server and click &quot;Simulate MCP Handshake&quot; to inspect the JSON-RPC wire frames...
                  </span>
                ) : (
                  mcpLogs.map((log, idx) => (
                    <div
                      key={idx}
                      className={
                        log.includes("tools/call")
                          ? "text-amber-300"
                          : log.includes("tools/list")
                          ? "text-sky-300"
                          : log.includes("200 SUCCESS")
                          ? "text-emerald-300 font-bold"
                          : "text-slate-300"
                      }
                    >
                      {log}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
