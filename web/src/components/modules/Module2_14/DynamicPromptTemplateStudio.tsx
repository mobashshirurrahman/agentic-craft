"use client";

import React, { useState } from "react";
import {
  FileCode2,
  Sparkles,
  RotateCcw,
  Sliders,
  CheckCircle2,
  Code2,
  Copy,
  Layers,
} from "lucide-react";

export default function DynamicPromptTemplateStudio() {
  const [persona, setPersona] = useState<string>("Senior Cyber-Security Architect");
  const [tone, setTone] = useState<string>("concise and technical");
  const [userInput, setUserInput] = useState<string>("Audit our JWT authentication flow for token replay vulnerabilities.");
  const [includeHistory, setIncludeHistory] = useState<boolean>(true);

  // Formatted Output Preview
  const formattedMessages = [
    {
      role: "system",
      content: `You are an expert ${persona}. Your tone is strictly ${tone}. Answer the user with precision and code references.`,
    },
    ...(includeHistory
      ? [
          { role: "user", content: "Hi, I am configuring our OAuth server." },
          { role: "assistant", content: "Understood. Please provide your token expiration and signing mechanism." },
        ]
      : []),
    {
      role: "user",
      content: userInput,
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm overflow-hidden transition-colors">
      {/* Header */}
      <div className="p-5 md:p-6 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-purple-500/10 via-pink-500/5 to-transparent">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
              <FileCode2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                Dynamic ChatPromptTemplate Studio
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/30">
                  Reusable Variables
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Design multi-message prompt templates with dynamic variable injection and MessagesPlaceholder
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setPersona("Senior Cyber-Security Architect");
              setTone("concise and technical");
              setUserInput("Audit our JWT authentication flow for token replay vulnerabilities.");
              setIncludeHistory(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-xs font-mono text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="p-5 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Input Variables (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold pb-2 border-b border-slate-200 dark:border-slate-800">
            Template Variables
          </div>

          <div>
            <label className="block text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-1">
              Variable: {`{persona}`}
            </label>
            <input
              type="text"
              value={persona}
              onChange={(e) => setPersona(e.target.value)}
              className="w-full text-xs font-mono p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-1">
              Variable: {`{tone}`}
            </label>
            <input
              type="text"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full text-xs font-mono p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-1">
              Variable: {`{user_input}`}
            </label>
            <textarea
              rows={2}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="w-full text-xs font-mono p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200"
            />
          </div>

          {/* Toggle: MessagesPlaceholder */}
          <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">
                MessagesPlaceholder(&quot;history&quot;)
              </div>
              <div className="text-[10px] text-slate-500">Inject multi-turn past conversation</div>
            </div>
            <button
              onClick={() => setIncludeHistory(!includeHistory)}
              className={`text-xs font-mono px-3 py-1 rounded-lg border font-bold transition ${
                includeHistory
                  ? "bg-purple-500/20 text-purple-700 dark:text-purple-300 border-purple-500/40"
                  : "bg-slate-200 dark:bg-slate-800 text-slate-500 border-slate-300 dark:border-slate-700"
              }`}
            >
              {includeHistory ? "ACTIVE" : "EMPTY"}
            </button>
          </div>

          {/* Python Template Code */}
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-mono text-[11px] overflow-x-auto">
            <span className="text-slate-500"># LangChain ChatPromptTemplate:</span>
            <pre className="text-purple-300 mt-1">{`from langchain_core.prompts import (
    ChatPromptTemplate, MessagesPlaceholder
)

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are an expert {persona}. Tone: {tone}."),
    MessagesPlaceholder("history"),
    ("user", "{user_input}")
])`}</pre>
          </div>
        </div>

        {/* Right: Formatted Message Array Preview (7 cols) */}
        <div className="lg:col-span-7 space-y-3 font-mono text-xs">
          <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold pb-2 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <span>Formatted Messages Sent to LLM</span>
            <span className="text-[10px] text-purple-600 dark:text-purple-400">
              {formattedMessages.length} Messages
            </span>
          </div>

          <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
            {formattedMessages.map((m, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl border space-y-1 ${
                  m.role === "system"
                    ? "border-purple-500/30 bg-purple-500/10 text-purple-950 dark:text-purple-200"
                    : m.role === "assistant"
                    ? "border-teal-500/30 bg-teal-500/10 text-teal-950 dark:text-teal-200"
                    : "border-sky-500/30 bg-sky-500/10 text-sky-950 dark:text-sky-200"
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-bold uppercase text-slate-500">
                  <span>Role: {m.role}</span>
                  <span>Payload #{idx + 1}</span>
                </div>
                <div className="text-[11px] leading-relaxed font-sans">{m.content}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
