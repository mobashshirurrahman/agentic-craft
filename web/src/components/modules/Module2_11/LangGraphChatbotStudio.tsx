"use client";

import React, { useState } from "react";
import {
  MessageSquare,
  Send,
  RotateCcw,
  Sparkles,
  Bot,
  User,
  Database,
  Hash,
  Terminal,
} from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "user" | "agent";
  text: string;
  toolCall?: string;
}

export default function LangGraphChatbotStudio() {
  const [threadId, setThreadId] = useState<string>("thread_user_101");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "agent",
      text: "Hello! I am your LangGraph customer concierge. How can I assist you with your orders or travel today?",
    },
  ]);
  const [input, setInput] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const userText = input.trim();
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: userText,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let agentMsg: ChatMessage;

      if (userText.toLowerCase().includes("order") || userText.toLowerCase().includes("status")) {
        agentMsg = {
          id: (Date.now() + 1).toString(),
          sender: "agent",
          text: "I checked your account. Order #8821 (Wireless ANC Headphones) is currently out for delivery with FedEx and expected by 4 PM today!",
          toolCall: "lookup_order(thread_id='thread_user_101', order_id='8821')",
        };
      } else if (userText.toLowerCase().includes("name") || userText.toLowerCase().includes("who am i")) {
        agentMsg = {
          id: (Date.now() + 1).toString(),
          sender: "agent",
          text: `You are connected under session thread '${threadId}'. Your checkpointer has persisted your order inquiries and profile across our state graph!`,
        };
      } else {
        agentMsg = {
          id: (Date.now() + 1).toString(),
          sender: "agent",
          text: `I've noted that in your session history (${threadId}). Is there anything else you'd like me to track or execute?`,
        };
      }

      setMessages((prev) => [...prev, agentMsg]);
    }, 600);
  };

  const handleResetSession = (newThread: string) => {
    setThreadId(newThread);
    setMessages([
      {
        id: "1",
        sender: "agent",
        text: `Switched to ${newThread}. State memory checkpointer refreshed for this isolated conversation thread!`,
      },
    ]);
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm overflow-hidden transition-colors">
      {/* Header */}
      <div className="p-5 md:p-6 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-sky-500/10 via-teal-500/5 to-transparent">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                LangGraph Chatbot State Studio
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-700 dark:text-sky-300 border border-sky-500/30">
                  MemorySaver & Threads
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Experience multi-turn conversation persistence powered by LangGraph state checkpointers and thread IDs
              </p>
            </div>
          </div>

          {/* Thread Switcher */}
          <div className="flex items-center gap-1.5 text-xs font-mono">
            <span className="text-slate-400">Thread:</span>
            <button
              onClick={() => handleResetSession("thread_user_101")}
              className={`px-2 py-1 rounded text-[11px] transition ${
                threadId === "thread_user_101"
                  ? "bg-sky-600 text-white font-bold"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
              }`}
            >
              user_101
            </button>
            <button
              onClick={() => handleResetSession("thread_user_202")}
              className={`px-2 py-1 rounded text-[11px] transition ${
                threadId === "thread_user_202"
                  ? "bg-sky-600 text-white font-bold"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
              }`}
            >
              user_202
            </button>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="p-5 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Chat Window (7 cols) */}
        <div className="lg:col-span-7 flex flex-col h-[380px] rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 overflow-hidden">
          {/* Messages list */}
          <div className="flex-1 p-4 space-y-3 overflow-y-auto">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 max-w-[85%] ${
                  m.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs ${
                    m.sender === "user"
                      ? "bg-sky-600 text-white"
                      : "bg-teal-500/20 text-teal-600 dark:text-teal-400 border border-teal-500/30"
                  }`}
                >
                  {m.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div className="space-y-1">
                  <div
                    className={`p-3 rounded-2xl text-xs leading-relaxed ${
                      m.sender === "user"
                        ? "bg-sky-600 text-white rounded-tr-none"
                        : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none shadow-sm"
                    }`}
                  >
                    {m.text}
                  </div>

                  {m.toolCall && (
                    <div className="p-2 rounded bg-slate-900 text-sky-300 font-mono text-[10px] border border-slate-800">
                      ⚡ Tool Invoked: {m.toolCall}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono italic">
                <Bot className="w-4 h-4 text-teal-500 animate-pulse" />
                <span>Agent graph traversing state...</span>
              </div>
            )}
          </div>

          {/* Input Bar */}
          <div className="p-2.5 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about order #8821 or say hello..."
              className="flex-1 text-xs font-mono p-2 bg-transparent focus:outline-none text-slate-800 dark:text-slate-200"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="p-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white disabled:opacity-40 transition"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right: LangGraph Memory Architecture Code (5 cols) */}
        <div className="lg:col-span-5 space-y-3 font-mono text-xs">
          <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold pb-2 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <span>State Checkpointer Architecture</span>
            <span className="text-[10px] text-sky-600 dark:text-sky-400 font-bold">
              MemorySaver
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900 text-slate-300 border border-slate-800 overflow-x-auto text-[11px] leading-relaxed">
            <pre className="text-sky-300">{`from langgraph.checkpoint.memory import MemorySaver
from langgraph.graph import StateGraph

# 1. In-memory checkpointer for multi-turn sessions
memory = MemorySaver()

# 2. Compile graph with checkpointer
app = workflow.compile(checkpointer=memory)

# 3. Thread configuration isolates each user's history
config = {"configurable": {"thread_id": "${threadId}"}}

# Multi-turn stateful invocation
app.invoke({"messages": [("user", "Where is my order?")]}, config)`}</pre>
          </div>

          <div className="p-3 rounded-lg bg-sky-500/10 border border-sky-500/20 text-xs text-slate-700 dark:text-slate-300">
            💡 <strong className="text-slate-900 dark:text-white">Why thread_id matters:</strong> In web applications, passing <code className="font-mono text-sky-600 dark:text-sky-400">thread_id</code> allows thousands of concurrent users to have completely isolated, persistent state snapshots without colliding.
          </div>
        </div>
      </div>
    </div>
  );
}
