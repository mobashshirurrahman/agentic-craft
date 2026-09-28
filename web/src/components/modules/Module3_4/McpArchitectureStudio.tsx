"use client";

import React, { useState } from "react";
import {
  Usb,
  Cpu,
  Database,
  FolderGit2,
  HardDrive,
  ArrowRight,
  CheckCircle2,
  Plug,
  Sparkles,
  Layers,
  Code2,
  Terminal,
} from "lucide-react";

interface McpServer {
  id: string;
  name: string;
  category: string;
  icon: any;
  transport: "stdio" | "sse";
  exposedTools: string[];
  sampleRequest: Record<string, any>;
  sampleResponse: Record<string, any>;
}

const MCP_SERVERS: McpServer[] = [
  {
    id: "postgres",
    name: "PostgreSQL Server",
    category: "Databases",
    icon: Database,
    transport: "stdio",
    exposedTools: ["query_table", "describe_schema", "list_indexes"],
    sampleRequest: {
      jsonrpc: "2.0",
      id: 1,
      method: "tools/call",
      params: {
        name: "query_table",
        arguments: { sql: "SELECT * FROM orders WHERE status='pending';" },
      },
    },
    sampleResponse: {
      jsonrpc: "2.0",
      id: 1,
      result: {
        content: [{ type: "text", text: "[{ order_id: 1042, total: $140.00 }]" }],
      },
    },
  },
  {
    id: "filesystem",
    name: "Local Filesystem Server",
    category: "OS & Storage",
    icon: HardDrive,
    transport: "stdio",
    exposedTools: ["read_file", "write_file", "list_directory"],
    sampleRequest: {
      jsonrpc: "2.0",
      id: 2,
      method: "tools/call",
      params: {
        name: "read_file",
        arguments: { path: "/workspace/config.yaml" },
      },
    },
    sampleResponse: {
      jsonrpc: "2.0",
      id: 2,
      result: {
        content: [{ type: "text", text: "env: production\nport: 8080" }],
      },
    },
  },
  {
    id: "github",
    name: "GitHub API Server",
    category: "Developer Tools",
    icon: FolderGit2,
    transport: "sse",
    exposedTools: ["create_issue", "review_pull_request", "search_repo"],
    sampleRequest: {
      jsonrpc: "2.0",
      id: 3,
      method: "tools/call",
      params: {
        name: "create_issue",
        arguments: { title: "Fix token expiration bug", repo: "agentic-core" },
      },
    },
    sampleResponse: {
      jsonrpc: "2.0",
      id: 3,
      result: {
        content: [{ type: "text", text: "Issue #18 created successfully." }],
      },
    },
  },
];

export default function McpArchitectureStudio() {
  const [selectedServerId, setSelectedServerId] = useState<string>("postgres");
  const [activeHost, setActiveHost] = useState<string>("LangGraph Agent");

  const server = MCP_SERVERS.find((s) => s.id === selectedServerId) || MCP_SERVERS[0];
  const IconComponent = server.icon;

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm overflow-hidden transition-colors">
      {/* Header */}
      <div className="p-5 md:p-6 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <Usb className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base md:text-lg text-slate-900 dark:text-white">
                Model Context Protocol (MCP) USB-C Workbench
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Inspect how any AI Host connects universally to external servers via JSON-RPC 2.0
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/30">
              Open Protocol Standard
            </span>
          </div>
        </div>
      </div>

      <div className="p-5 md:p-6 space-y-6">
        {/* Host Selector */}
        <div className="space-y-2">
          <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase">
            1. Select AI Host Application
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {["LangGraph Custom Agent", "Claude Desktop Host", "Cursor IDE"].map((host) => (
              <button
                key={host}
                onClick={() => setActiveHost(host)}
                className={`p-3 text-left rounded-xl border text-xs font-mono transition flex items-center justify-between ${
                  activeHost === host
                    ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold"
                    : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:border-slate-300"
                }`}
              >
                <span>{host}</span>
                {activeHost === host && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
              </button>
            ))}
          </div>
        </div>

        {/* Server Selector */}
        <div className="space-y-2">
          <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase">
            2. Plug In Universal MCP Server
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {MCP_SERVERS.map((srv) => {
              const SrvIcon = srv.icon;
              return (
                <button
                  key={srv.id}
                  onClick={() => setSelectedServerId(srv.id)}
                  className={`p-3 text-left rounded-xl border text-xs font-mono transition-all flex items-center justify-between ${
                    selectedServerId === srv.id
                      ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold shadow-sm"
                      : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <SrvIcon className="w-4 h-4 text-emerald-500" />
                    <span>{srv.name}</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">
                    {srv.transport}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Universal Connection Pipeline Canvas */}
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-2">
            {/* Host Box */}
            <div className="flex-1 p-4 rounded-xl border-2 border-emerald-500 bg-white dark:bg-slate-900 text-center space-y-1 w-full">
              <span className="text-[10px] font-mono font-bold uppercase text-emerald-600 dark:text-emerald-400">
                MCP Host
              </span>
              <div className="text-xs font-bold font-mono text-slate-900 dark:text-white">
                {activeHost}
              </div>
              <div className="text-[10px] text-slate-500">Initiates requests</div>
            </div>

            {/* Universal USB-C Bridge */}
            <div className="flex flex-col items-center justify-center text-emerald-500 px-2 shrink-0">
              <div className="flex items-center gap-1.5 font-mono text-xs font-bold bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30">
                <Plug className="w-3.5 h-3.5" />
                <span>MCP USB-C Protocol</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 mt-1">
                transport: {server.transport}
              </span>
            </div>

            {/* Server Box */}
            <div className="flex-1 p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-center space-y-1 w-full">
              <div className="flex items-center justify-center gap-1.5">
                <IconComponent className="w-4 h-4 text-emerald-500" />
                <span className="text-[10px] font-mono font-bold uppercase text-slate-500">
                  MCP Server
                </span>
              </div>
              <div className="text-xs font-bold font-mono text-slate-900 dark:text-white">
                {server.name}
              </div>
              <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">
                Exposes {server.exposedTools.length} tools: {server.exposedTools.slice(0, 2).join(", ")}...
              </div>
            </div>
          </div>

          {/* JSON-RPC 2.0 Wire Protocol Inspector */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            <div className="space-y-1">
              <span className="text-[11px] font-mono font-bold text-slate-600 dark:text-slate-400 uppercase">
                Host ➔ Server Request (JSON-RPC 2.0)
              </span>
              <pre className="p-3 rounded-lg bg-slate-900 text-emerald-300 font-mono text-[11px] overflow-x-auto border border-slate-800">
                {JSON.stringify(server.sampleRequest, null, 2)}
              </pre>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-mono font-bold text-slate-600 dark:text-slate-400 uppercase">
                Server ➔ Host Response (JSON-RPC 2.0)
              </span>
              <pre className="p-3 rounded-lg bg-slate-900 text-teal-300 font-mono text-[11px] overflow-x-auto border border-slate-800">
                {JSON.stringify(server.sampleResponse, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
