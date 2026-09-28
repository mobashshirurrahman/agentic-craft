"use client";

import React, { useState } from "react";
import Link from "next/link";
import { COURSE_LEVELS, CourseModule } from "@/lib/curriculum-data";
import { useProgress } from "@/lib/store";
import {
  ChevronLeft,
  ChevronDown,
  CheckCircle2,
  Circle,
  FileText,
  Compass,
  Bookmark,
  Layers,
  Sparkles,
  Menu,
  X,
  BookOpen,
} from "lucide-react";

interface LearnSidebarProps {
  currentModuleId: string;
  currentLevelId: string;
}

export default function LearnSidebar({
  currentModuleId,
  currentLevelId,
}: LearnSidebarProps) {
  const { isCompleted, toggleComplete } = useProgress();
  const [activeLevelAccordion, setActiveLevelAccordion] =
    useState<string>(currentLevelId);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState<boolean>(false);

  const currentLevel = COURSE_LEVELS.find((l) => l.id === currentLevelId);
  const currentModule = currentLevel?.modules.find(
    (m) => m.id === currentModuleId
  );

  const sidebarContent = (isMobile: boolean) => (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Top back link & course title */}
      <div className="p-4 border-b border-slate-800/80 flex items-center justify-between shrink-0">
        <Link
          href="/#curriculum"
          onClick={() => isMobile && setMobileDrawerOpen(false)}
          className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1.5 transition"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Curriculum Hub</span>
        </Link>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-teal-400 px-2 py-0.5 rounded bg-teal-500/10 border border-teal-500/20">
            59 Modules
          </span>
          {isMobile && (
            <button
              onClick={() => setMobileDrawerOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              aria-label="Close curriculum drawer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Level Accordion List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {COURSE_LEVELS.map((lvl) => {
          const isOpen = activeLevelAccordion === lvl.id;
          const levelCompletedCount = lvl.modules.filter((m) =>
            isCompleted(m.id)
          ).length;

          return (
            <div
              key={lvl.id}
              className="rounded-xl border border-slate-850 bg-slate-900/40 overflow-hidden"
            >
              {/* Level Accordion Header */}
              <button
                onClick={() =>
                  setActiveLevelAccordion(isOpen ? "" : lvl.id)
                }
                className="w-full p-3 flex items-center justify-between text-left hover:bg-slate-850/60 transition"
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      lvl.levelNumber === 1
                        ? "bg-emerald-400"
                        : lvl.levelNumber === 2
                        ? "bg-sky-400"
                        : lvl.levelNumber === 3
                        ? "bg-violet-400"
                        : "bg-amber-400"
                    }`}
                  />
                  <div>
                    <span className="text-xs font-bold text-white block">
                      Level {lvl.levelNumber}: {lvl.subtitle}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      {levelCompletedCount}/{lvl.modulesCount} completed
                    </span>
                  </div>
                </div>

                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Modules list under this level */}
              {isOpen && (
                <div className="p-1 space-y-0.5 border-t border-slate-850/80 bg-slate-950/60">
                  {lvl.modules.map((mod) => {
                    const isCurrent = mod.id === currentModuleId;
                    const done = isCompleted(mod.id);

                    return (
                      <Link
                        key={mod.id}
                        href={`/learn/${lvl.id}/${mod.id}`}
                        onClick={() => isMobile && setMobileDrawerOpen(false)}
                        className={`flex items-center justify-between px-2.5 py-2 rounded-lg text-xs transition ${
                          isCurrent
                            ? "bg-teal-500/15 text-teal-300 font-semibold border border-teal-500/30"
                            : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate pr-2">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              toggleComplete(mod.id);
                            }}
                            className="shrink-0 text-slate-500 hover:text-emerald-400 p-0.5"
                            title={done ? "Mark Incomplete" : "Mark Complete"}
                          >
                            {done ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Circle className="w-3.5 h-3.5" />
                            )}
                          </button>
                          <span className="font-mono text-[11px] text-slate-500 shrink-0">
                            {mod.number}
                          </span>
                          <span className="truncate">{mod.title}</span>
                        </div>

                        <span className="text-[10px] font-mono text-slate-600 shrink-0">
                          {mod.estimatedMinutes}m
                        </span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      {/* ── 1. Desktop Persistent Sidebar (>= lg) ── */}
      <aside className="hidden lg:flex w-80 shrink-0 border-r border-slate-800/80 bg-slate-950/95 flex-col h-[calc(100vh-4rem)] sticky top-16 overflow-hidden">
        {sidebarContent(false)}
      </aside>

      {/* ── 2. Mobile/Tablet Navigation Bar (< lg) ── */}
      <div className="lg:hidden w-full sticky top-16 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 py-2.5 flex items-center justify-between gap-3 shadow-md">
        <button
          onClick={() => setMobileDrawerOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-mono text-slate-200 transition active:scale-95"
        >
          <BookOpen className="w-3.5 h-3.5 text-teal-400" />
          <span>Curriculum (59)</span>
          <ChevronDown className="w-3 h-3 text-slate-400" />
        </button>

        <div className="flex items-center gap-2 truncate text-right">
          <span className="text-xs font-mono font-bold text-teal-400 shrink-0">
            Mod {currentModule?.number}
          </span>
          <span className="text-xs text-slate-400 truncate max-w-[140px] sm:max-w-[240px]">
            {currentModule?.title}
          </span>
        </div>
      </div>

      {/* ── 3. Mobile Slide-Over Drawer (< lg) ── */}
      {mobileDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop blur overlay */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileDrawerOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="relative w-full max-w-xs sm:max-w-sm bg-slate-950 border-r border-slate-850 h-full flex flex-col z-10 shadow-2xl">
            {sidebarContent(true)}
          </div>
        </div>
      )}
    </>
  );
}
