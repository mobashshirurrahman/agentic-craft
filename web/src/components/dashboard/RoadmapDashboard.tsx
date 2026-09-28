"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { COURSE_LEVELS, CourseLevel, CourseModule } from "@/lib/curriculum-data";
import { useProgress } from "@/lib/store";
import {
  Search,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  BookOpen,
  Filter,
  Layers,
  ChevronDown,
  ChevronRight,
  Circle,
  X,
} from "lucide-react";

export default function RoadmapDashboard() {
  const { isCompleted } = useProgress();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [expandedLevels, setExpandedLevels] = useState<Record<string, boolean>>({
    "level-1": true, // Level 1 open by default for immediate exploration
    "level-2": false,
    "level-3": false,
    "level-4": false,
  });

  const toggleLevel = (id: string) => {
    setExpandedLevels((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    setExpandedLevels({
      "level-1": true,
      "level-2": true,
      "level-3": true,
      "level-4": true,
    });
  };

  const collapseAll = () => {
    setExpandedLevels({
      "level-1": false,
      "level-2": false,
      "level-3": false,
      "level-4": false,
    });
  };

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    COURSE_LEVELS.forEach((lvl) => {
      lvl.modules.forEach((mod) => {
        mod.tags.forEach((t) => tags.add(t));
      });
    });
    return Array.from(tags).sort();
  }, []);

  // Filter modules by search or tag
  const filteredLevels = useMemo(() => {
    return COURSE_LEVELS.map((level) => {
      const matchingModules = level.modules.filter((mod) => {
        const matchesTag =
          selectedTag === "all" || mod.tags.includes(selectedTag);
        const matchesSearch =
          searchQuery.trim() === "" ||
          mod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          mod.number.includes(searchQuery) ||
          mod.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
          mod.tags.some((t) =>
            t.toLowerCase().includes(searchQuery.toLowerCase())
          );

        return matchesTag && matchesSearch;
      });

      return {
        ...level,
        filteredModules: matchingModules,
      };
    }).filter((level) => level.filteredModules.length > 0);
  }, [searchQuery, selectedTag]);

  const totalMatchingModules = useMemo(() => {
    return filteredLevels.reduce(
      (acc, lvl) => acc + lvl.filteredModules.length,
      0
    );
  }, [filteredLevels]);

  const isSearching = searchQuery.trim().length > 0 || selectedTag !== "all";

  return (
    <section id="curriculum" className="w-full py-12 md:py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
          Structured Roadmap
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          The 4-Level Curriculum
        </h2>
        <p className="font-handwriting text-xl text-teal-700 dark:text-teal-300 font-bold">
          From first ReAct loop to distributed production scaling 🚀
        </p>
      </div>

      {/* Clean Search & Filter Bar */}
      <div className="mb-8 p-3 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keyword (e.g., LangGraph, MCP, Redis, Celery)..."
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-8 py-2.5 text-xs sm:text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:border-teal-500 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Expand / Collapse All Toggle */}
          {!isSearching && (
            <div className="flex items-center justify-end gap-2 text-xs font-mono shrink-0">
              <button
                onClick={expandAll}
                className="px-2.5 py-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                Expand All
              </button>
              <span className="text-slate-300 dark:text-slate-700">|</span>
              <button
                onClick={collapseAll}
                className="px-2.5 py-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                Collapse All
              </button>
            </div>
          )}
        </div>

        {/* Tag pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap pt-1 scrollbar-none text-xs">
          <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1 shrink-0 mr-1">
            <Filter className="w-3 h-3" /> Filter:
          </span>
          <button
            onClick={() => setSelectedTag("all")}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition shrink-0 ${
              selectedTag === "all"
                ? "bg-teal-600 text-white font-semibold"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag === selectedTag ? "all" : tag)}
              className={`px-2.5 py-1 rounded-lg text-xs transition shrink-0 ${
                selectedTag === tag
                  ? "bg-teal-600 text-white font-semibold"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Active Search Results Count */}
      {isSearching && (
        <div className="mb-4 text-xs font-mono text-slate-500">
          Found <strong className="text-teal-600 dark:text-teal-400">{totalMatchingModules}</strong> matching lessons:
        </div>
      )}

      {/* The 4 Level Milestone Accordion Cards */}
      <div className="space-y-4">
        {filteredLevels.map((lvl) => {
          const isExpanded = isSearching || expandedLevels[lvl.id];
          const completedCount = lvl.modules.filter((m) => isCompleted(m.id)).length;

          return (
            <div
              key={lvl.id}
              className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden transition-all duration-200"
            >
              {/* Level Card Header Button */}
              <button
                onClick={() => !isSearching && toggleLevel(lvl.id)}
                className="w-full p-5 sm:p-6 text-left flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/60 dark:hover:bg-slate-850/50 transition cursor-pointer select-none"
              >
                <div className="space-y-1.5 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${lvl.color.badge}`}
                    >
                      Level {lvl.levelNumber}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {lvl.modulesCount} Lessons
                    </span>
                    <span className="text-xs font-mono text-slate-300 dark:text-slate-700">•</span>
                    <span className="text-xs font-mono text-slate-500">
                      {completedCount}/{lvl.modulesCount} completed
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                    {lvl.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                    {lvl.description}
                  </p>
                </div>

                {/* Right Action / Accordion Indicator */}
                <div className="flex items-center gap-3 self-end md:self-center">
                  <Link
                    href={`/learn/${lvl.id}/${lvl.modules[0].id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 transition flex items-center gap-1"
                  >
                    <span>Start Level</span>
                    <ArrowRight className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                  </Link>

                  {!isSearching && (
                    <div
                      className={`p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 transition-transform duration-200 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  )}
                </div>
              </button>

              {/* Collapsible Module Grid */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/40 p-4 sm:p-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                      {lvl.filteredModules.map((mod) => {
                        const done = isCompleted(mod.id);

                        return (
                          <Link
                            key={mod.id}
                            href={`/learn/${lvl.id}/${mod.id}`}
                            className="p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 hover:border-teal-500/50 hover:shadow-md transition-all flex items-center justify-between gap-3 group"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <span
                                className={`w-2 h-2 rounded-full shrink-0 ${
                                  done ? "bg-emerald-500" : "bg-slate-300 dark:bg-slate-700"
                                }`}
                              />
                              <div className="truncate">
                                <div className="flex items-center gap-1.5">
                                  <span className="font-mono text-[10px] font-bold text-slate-400">
                                    Mod {mod.number}
                                  </span>
                                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                                    {mod.estimatedMinutes}m
                                  </span>
                                </div>
                                <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors truncate">
                                  {mod.title}
                                </h4>
                              </div>
                            </div>

                            <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-teal-500 group-hover:translate-x-0.5 transition-all shrink-0" />
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Gentle Footer Note */}
      <div className="mt-12 text-center select-none">
        <p className="font-handwriting text-xl text-slate-500 dark:text-slate-400">
          ✨ Every single module includes an interactive workbench lab & concept check!
        </p>
      </div>
    </section>
  );
}
