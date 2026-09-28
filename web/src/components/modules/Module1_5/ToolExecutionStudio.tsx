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
  FileCode,
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
    Retrieves official audited revenue and profit margins from the SEC database.
    Use this tool whenever the user asks for financial, balance sheet, or revenue data.
    """
    # Deterministic database lookup (executed by Host Runtime)
    return {
        "status": "success",
        "ticker": ticker.upper(),
        "period": f"{fiscal_year}-{quarter}",
        "revenue_usd_billions": 85.4,
        "net_margin_pct": 24.2,
        "filing_date": f"{fiscal_year}-10-24"
    }`;

  // Generated JSON Schema
  const generatedJsonSchema = `{
  "type": "function",
  "function": {
    "name": "query_financial_metrics",
    "description": "Retrieves official audited revenue and profit margins from the SEC database. Use this tool whenever the user asks for financial, balance sheet, or revenue data.",
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

  const runToolSimulation = () => {
    setIsExecuting(true);
    setConsoleLogs(["[Host Runtime] Initiating tool invocation pipeline..."]);

    setTimeout(() => {
      setConsoleLogs((prev) => [
        ...prev,
        "[LLM Output] Parsing generated function call: `query_financial_metrics`",
      ]);
    }, 500);

    setTimeout(() => {
      if (selectedTestCase === "valid") {
        setConsoleLogs((prev) => [
          ...prev,
          "[Pydantic] Validating inputs: ticker='AAPL', quarter='Q3', fiscal_year=2024",
          "[Pydantic] Schema validation: 100% PASSED (Strict types confirmed)",
          "[Execution] Connecting to audited financial metrics service...",
          "[Result 200 OK] Received payload:",
          JSON.stringify(
            {
              status: "success",
              ticker: "AAPL",
              period: "2024-Q3",
              revenue_usd_billions: 85.78,
              net_margin_pct: 25.3,
            },
            null,
            2
          ),
          "[Agent State] Observation ingested into context. Ready for final synthesis.",
        ]);
      } else {
        setConsoleLogs((prev) => [
          ...prev,
          "[Pydantic] Validating inputs: ticker='AAPL', quarter='SUMMER', fiscal_year='last year'",
          "[VALIDATION ERROR]: Value error on 'quarter': 'SUMMER' is not a permitted enum value (allowed: Q1, Q2, Q3, Q4)",
          "[VALIDATION ERROR]: Value error on 'fiscal_year': Input should be a valid integer, unable to parse string 'last year'",
          "[Self-Healing Protocol] Returning structured error back to LLM context window:",
          "  ToolError: Parameter validation failed. 'quarter' must be in ['Q1','Q2','Q3','Q4'] and 'fiscal_year' must be an integer.",
          "[LLM Recovery] Agent reads error string, self-corrects arguments, and re-submits valid call.",
        ]);
      }
      setIsExecuting(false);
    }, 1400);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(pythonCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // MCP Simulator handler
  const runMcpSimulation = () => {
    setMcpStep("listing");
    setMcpLogs([`[Client] Establishing JSON-RPC stdio transport with \`${selectedMcpServer}-mcp\` server...`]);

    setTimeout(() => {
      setMcpLogs((prev) => [
        ...prev,
        `[Client -> Server] JSON-RPC Request: {"method": "tools/list", "id": 1}`,
        `[Server -> Client] JSON-RPC Response: Found 3 tools registered on \`${selectedMcpServer}-mcp\`:`,
        selectedMcpServer === "postgres"
          ? "  • query_sql(sql: string) -> rows\n  • list_tables() -> tables[]\n  • describe_schema(table: string) -> columns[]"
          : selectedMcpServer === "github"
          ? "  • list_pull_requests(repo: string, state: string)\n  • create_issue(title: string, body: string)\n  • search_code(query: string)"
          : "  • read_file(path: string)\n  • write_file(path: string, content: string)\n  • list_directory(path: string)",
      ]);
      setMcpStep("calling");
    }, 1000);

    setTimeout(() => {
      setMcpLogs((prev) => [
        ...prev,
        `[Client -> Server] JSON-RPC Request: {"method": "tools/call", "params": {"name": "${
          selectedMcpServer === "postgres"
            ? "query_sql"
            : selectedMcpServer === "github"
            ? "list_pull_requests"
            : "read_file"
        }", "arguments": {...}}, "id": 2}`,
        `[Server] Executing capability locally through standard protocol...`,
        `[Server -> Client] JSON-RPC Result: 200 SUCCESS (0 bespoke adapter code required)`,
      ]);
      setMcpStep("complete");
    }, 2200);
  };

  return (
    <div className="rounded-2xl border border-slate-700/60 bg-slate-900/90 dark:bg-slate-900/90 light:bg-white light:border-slate-300 shadow-xl overflow-hidden my-8">
      {/* Studio Header */}
      <div className="border-b border-slate-700/60 dark:border-slate-700/60 light:border-slate-200 px-5 py-4 bg-slate-800/50 dark:bg-slate-800/50 light:bg-slate-50 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <h3 className="font-bold text-base md:text-lg text-white dark:text-white light:text-slate-900">
              Interactive Tool Engineering & MCP Studio
            </h3>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 mt-0.5">
            Test Python schemas, validation resilience, and universal Model Context Protocol (MCP) servers.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-slate-900/80 dark:bg-slate-900/80 light:bg-slate-200 p-1 rounded-xl border border-slate-700/80 dark:border-slate-700/80 light:border-slate-300">
          <button
            onClick={() => setActiveTab("schema")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "schema"
                ? "bg-cyan-500 text-slate-950 font-bold shadow-sm"
                : "text-slate-400 dark:text-slate-400 light:text-slate-700 hover:text-white dark:hover:text-white"
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Python Tool & Schema</span>
          </button>
          <button
            onClick={() => setActiveTab("mcp")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "mcp"
                ? "bg-cyan-500 text-slate-950 font-bold shadow-sm"
                : "text-slate-400 dark:text-slate-400 light:text-slate-700 hover:text-white dark:hover:text-white"
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            <span>Model Context Protocol (MCP)</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Python Tool & JSON Schema Explorer */}
      {activeTab === "schema" ? (
        <div className="p-5 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Code & Schema View */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowJsonSchema(false)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    !showJsonSchema
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Python Definition (@tool)
                </button>
                <button
                  onClick={() => setShowJsonSchema(true)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    showJsonSchema
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Compiled JSON Schema (LLM View)
                </button>
              </div>

              {!showJsonSchema && (
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1 text-xs text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied!" : "Copy Code"}</span>
                </button>
              )}
            </div>

            <div className="relative rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200 overflow-hidden bg-slate-950 dark:bg-slate-950 light:bg-slate-900 shadow-inner">
              <pre className="p-4 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed max-h-[380px]">
                {showJsonSchema ? generatedJsonSchema : pythonCode}
              </pre>
            </div>

            <div className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 flex items-start gap-2 bg-slate-800/40 dark:bg-slate-800/40 light:bg-slate-50 p-3 rounded-lg border border-slate-700/50 dark:border-slate-700/50 light:border-slate-200">
              <Sparkles className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
              <span>
                <strong>How the magic works:</strong> The LLM never sees raw Python code! Frameworks convert the Pydantic type annotations and docstring into the strict JSON Schema shown above. The model uses the description to decide <em>when</em> to call the tool and the parameter schema to formulate valid JSON.
              </span>
            </div>
          </div>

          {/* Right: Test Execution Terminal */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            <div className="bg-slate-800/40 dark:bg-slate-800/40 light:bg-slate-50 border border-slate-700/50 dark:border-slate-700/50 light:border-slate-200 rounded-xl p-4">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-400 light:text-slate-600 block mb-3">
                Simulate Agent Tool Calling Test Case
              </span>

              {/* Scenario options */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setSelectedTestCase("valid")}
                  className={`p-2.5 rounded-lg border text-left transition-all ${
                    selectedTestCase === "valid"
                      ? "border-emerald-500 bg-emerald-500/15 text-emerald-200"
                      : "border-slate-700/50 dark:border-slate-700/50 light:border-slate-200 bg-slate-900/50 dark:bg-slate-900/50 light:bg-white text-slate-400"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white dark:text-white light:text-slate-900">
                      Test Case A: Valid Inputs
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/20 px-1.5 py-0.5 rounded">
                      Pass
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 dark:text-slate-400 light:text-slate-600 mt-1 font-mono">
                    ticker="AAPL", quarter="Q3", fiscal_year=2024
                  </p>
                </button>

                <button
                  onClick={() => setSelectedTestCase("invalid")}
                  className={`p-2.5 rounded-lg border text-left transition-all ${
                    selectedTestCase === "invalid"
                      ? "border-rose-500 bg-rose-500/15 text-rose-200"
                      : "border-slate-700/50 dark:border-slate-700/50 light:border-slate-200 bg-slate-900/50 dark:bg-slate-900/50 light:bg-white text-slate-400"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white dark:text-white light:text-slate-900">
                      Test Case B: Schema Validation Failure
                    </span>
                    <span className="text-[10px] font-mono text-rose-400 bg-rose-500/20 px-1.5 py-0.5 rounded">
                      Self-Healing
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 dark:text-slate-400 light:text-slate-600 mt-1 font-mono">
                    quarter="SUMMER", fiscal_year="last year"
                  </p>
                </button>
              </div>

              {/* Run Trigger */}
              <button
                onClick={runToolSimulation}
                disabled={isExecuting}
                className="w-full mt-4 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold bg-cyan-400 hover:bg-cyan-300 text-slate-950 shadow-md transition-all disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isExecuting ? "Executing Pipeline..." : "Run Tool Call Simulation"}</span>
              </button>
            </div>

            {/* Terminal Window */}
            <div className="flex-1 min-h-[220px] rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-950 dark:bg-slate-950 light:bg-slate-900 p-3.5 font-mono text-xs shadow-inner flex flex-col">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-slate-400 text-[11px]">
                <div className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Runtime Stream & Validation Logs</span>
                </div>
                <span>stdout</span>
              </div>
              <div className="flex-1 overflow-y-auto mt-2 space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
                {consoleLogs.length === 0 ? (
                  <span className="text-slate-600 dark:text-slate-600 italic">
                    Click "Run Tool Call Simulation" above to view live parsing, validation, and self-healing error traces...
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
        <div className="p-5 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Architecture Comparison */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <h4 className="font-bold text-white dark:text-white light:text-slate-900 text-sm">
              The M × N Integration Problem vs. Universal MCP
            </h4>

            {/* Comparison boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Old way */}
              <div className="rounded-xl border border-rose-500/30 bg-rose-500/5 p-4 flex flex-col">
                <div className="flex items-center gap-1.5 text-rose-400 text-xs font-bold mb-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>The Old Way (Bespoke)</span>
                </div>
                <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed mb-3">
                  If you have 4 AI frameworks and 10 external tools (GitHub, Slack, SQL, Drive), you must write and maintain <strong>40 custom connectors</strong>.
                </p>
                <div className="mt-auto bg-slate-950 dark:bg-slate-950 light:bg-slate-100 rounded p-2 text-[10px] font-mono text-rose-300 dark:text-rose-300 light:text-rose-700">
                  4 AI Agents × 10 APIs = 40 Custom Connectors (Brittle & fragmented)
                </div>
              </div>

              {/* MCP Way */}
              <div className="rounded-xl border border-cyan-500/40 bg-cyan-500/5 p-4 flex flex-col">
                <div className="flex items-center gap-1.5 text-cyan-400 text-xs font-bold mb-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>The MCP Standard</span>
                </div>
                <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed mb-3">
                  Anthropic's open standard protocol: The tool author creates <strong>1 MCP Server</strong>. Any MCP-compliant client can instantly use it via JSON-RPC!
                </p>
                <div className="mt-auto bg-slate-950 dark:bg-slate-950 light:bg-slate-100 rounded p-2 text-[10px] font-mono text-cyan-300 dark:text-cyan-300 light:text-cyan-700">
                  4 AI Agents + 10 MCP Servers = 14 Components (Build once, work everywhere)
                </div>
              </div>
            </div>

            {/* Architecture Flow Diagram */}
            <div className="rounded-xl border border-slate-700/60 dark:border-slate-700/60 light:border-slate-200 bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-50 p-4">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-3">
                Standard MCP Client-Server Handshake
              </span>
              <div className="flex items-center justify-between text-xs font-mono text-slate-200 gap-2">
                <div className="p-2.5 rounded-lg bg-teal-500/20 border border-teal-500/40 text-center flex-1">
                  <div className="font-bold text-teal-300">AI Client</div>
                  <div className="text-[10px] text-slate-400">Agent / IDE Host</div>
                </div>

                <div className="text-center text-[10px] text-cyan-400 font-semibold px-1">
                  JSON-RPC
                  <br />
                  ⇄ stdio / SSE ⇄
                </div>

                <div className="p-2.5 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-center flex-1">
                  <div className="font-bold text-cyan-300">MCP Server</div>
                  <div className="text-[10px] text-slate-400">Tools & Resources</div>
                </div>

                <div className="text-center text-[10px] text-purple-400 font-semibold px-1">
                  Executes
                  <br />
                  ➔
                </div>

                <div className="p-2.5 rounded-lg bg-purple-500/20 border border-purple-500/40 text-center flex-1">
                  <div className="font-bold text-purple-300">Database / API</div>
                  <div className="text-[10px] text-slate-400">Target System</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Live MCP Inspector Simulator */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-4">
            <div className="bg-slate-800/40 dark:bg-slate-800/40 light:bg-slate-50 border border-slate-700/50 dark:border-slate-700/50 light:border-slate-200 rounded-xl p-4">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-400 light:text-slate-600 block mb-2">
                Test a Pre-Built MCP Server
              </span>

              <div className="grid grid-cols-3 gap-2 mb-4">
                {(["postgres", "github", "filesystem"] as const).map((srv) => (
                  <button
                    key={srv}
                    onClick={() => {
                      setSelectedMcpServer(srv);
                      setMcpStep("idle");
                      setMcpLogs([]);
                    }}
                    className={`py-2 px-2 rounded-lg text-xs font-mono font-semibold transition-all border ${
                      selectedMcpServer === srv
                        ? "bg-cyan-500 text-slate-950 font-bold border-cyan-400"
                        : "bg-slate-900/60 dark:bg-slate-900/60 light:bg-white text-slate-300 dark:text-slate-300 light:text-slate-800 border-slate-700 dark:border-slate-700 light:border-slate-200"
                    }`}
                  >
                    {srv}-mcp
                  </button>
                ))}
              </div>

              <button
                onClick={runMcpSimulation}
                disabled={mcpStep === "listing" || mcpStep === "calling"}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold bg-cyan-400 hover:bg-cyan-300 text-slate-950 shadow-md transition-all disabled:opacity-50"
              >
                <Network className="w-3.5 h-3.5" />
                <span>Simulate MCP Handshake & Tool Invocation</span>
              </button>
            </div>

            {/* MCP Console Stream */}
            <div className="flex-1 min-h-[220px] rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-950 dark:bg-slate-950 light:bg-slate-900 p-3.5 font-mono text-xs shadow-inner flex flex-col">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-slate-400 text-[11px]">
                <div className="flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5 text-cyan-400" />
                  <span>MCP JSON-RPC Wire Traffic</span>
                </div>
                <span>stdio transport</span>
              </div>
              <div className="flex-1 overflow-y-auto mt-2 space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
                {mcpLogs.length === 0 ? (
                  <span className="text-slate-600 dark:text-slate-600 italic">
                    Select an MCP Server and click "Simulate MCP Handshake" to inspect the JSON-RPC wire frames...
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
