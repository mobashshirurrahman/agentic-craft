import React from "react";
import Link from "next/link";
import { Bot, Layers, BookOpen } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-800/80 bg-slate-950 pt-12 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-900">
          {/* Brand & mission */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
                <Bot className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-lg text-white">
                Agentic<span className="text-teal-400 font-mono">Craft</span> Academy
              </span>
            </div>
            <p className="text-xs md:text-sm text-slate-400 max-w-md leading-relaxed">
              An interactive, visual, animated tutorial platform designed to make Agentic AI accessible, practical, and production-ready for engineers of all levels.
            </p>
            <div className="mt-4 p-3 rounded-xl bg-slate-900/60 border border-slate-850 text-[11px] font-mono text-slate-400 max-w-md">
              <strong className="text-slate-300">Master Curriculum:</strong> 59 hands-on lessons designed for engineers building production autonomous systems.
            </div>
          </div>

          {/* Curriculum Quick Links */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-3">
              Curriculum Levels
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/learn/level-1/module-1-1" className="hover:text-teal-400 transition">
                  Level 1: Foundations & Architecture (13 Mods)
                </Link>
              </li>
              <li>
                <Link href="/learn/level-2/module-2-1" className="hover:text-sky-400 transition">
                  Level 2: Core Implementation (17 Mods)
                </Link>
              </li>
              <li>
                <Link href="/learn/level-3/module-3-1" className="hover:text-violet-400 transition">
                  Level 3: Advanced Patterns & MCP (12 Mods)
                </Link>
              </li>
              <li>
                <Link href="/learn/level-4/module-4-1" className="hover:text-amber-400 transition">
                  Level 4: Production & Scaling (17 Mods)
                </Link>
              </li>
            </ul>
          </div>

          {/* Key Frameworks */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-3">
              Core Tech Stack
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 font-mono">
              <li>LangGraph (State Graphs)</li>
              <li>Model Context Protocol (MCP)</li>
              <li>Pydantic & Structured Outputs</li>
              <li>Multi-Agent Swarms & Supervisors</li>
              <li>FastAPI Microservices</li>
              <li>Vector Stores & Semantic Memory</li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 font-mono">
          <p>© 2026 AgenticCraft Academy. Built for hands-on practical learning.</p>
          <p className="flex items-center gap-1">
            Explained with simple English & relatable everyday analogies.
          </p>
        </div>
      </div>
    </footer>
  );
}
