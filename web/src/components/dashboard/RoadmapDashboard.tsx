"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { COURSE_LEVELS, CourseLevel, CourseModule } from "@/lib/curriculum-data";
import { useProgress } from "@/lib/store";
import {
  Search,
  CheckCircle2,
  Clock,
  FileText,
  ArrowRight,
  Sparkles,
  BookOpen,
  Filter,
  Layers,
  ChevronRight,
  Bookmark,
} from "lucide-react";

export default function RoadmapDashboard() {
  const { isCompleted, isBookmarked, toggleBookmark } = useProgress();
  const [selectedLevelId, setSelectedLevelId] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<string>("all");

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

  // Filter modules
  const filteredLevels = useMemo(() => {
    return COURSE_LEVELS.map((level) => {
      // Filter modules within this level
      const matchingModules = level.modules.filter((mod) => {
        const matchesLevel =
          selectedLevelId === "all" || selectedLevelId === level.id;
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

        return matchesLevel && matchesTag && matchesSearch;
      });

      return {
        ...level,
        filteredModules: matchingModules,
      };
    }).filter((level) => level.filteredModules.length > 0);
  }, [selectedLevelId, searchQuery, selectedTag]);

  const totalMatchingModules = useMemo(() => {
    return filteredLevels.reduce(
      (acc, lvl) => acc + lvl.filteredModules.length,
      0
    );
  }, [filteredLevels]);

  return (
    <section id="curriculum" className="w-full py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-mono mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>EXHAUSTIVE 4-LEVEL CURRICULUM</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            The Complete Agentic AI Roadmap
          </h2>
          <p className="text-slate-400 text-sm md:text-base mt-2 max-w-2xl leading-relaxed">
            A comprehensive, structured roadmap taking you from foundational agent reasoning to production-scale multi-agent architectures with interactive visualizations and runnable code.
          </p>
        </div>

        {/* Quick Stats Pill */}
        <div className="flex items-center gap-4 bg-slate-900/80 border border-slate-800 p-3 rounded-2xl shadow-inner self-start md:self-auto">
          <div className="text-center px-2">
            <span className="text-xl font-bold font-mono text-white block">4</span>
            <span className="text-[11px] text-slate-400 uppercase tracking-wider">Levels</span>
          </div>
          <div className="h-7 w-[1px] bg-slate-800" />
          <div className="text-center px-2">
            <span className="text-xl font-bold font-mono text-teal-400 block">59</span>
            <span className="text-[11px] text-slate-400 uppercase tracking-wider">Lessons</span>
          </div>
          <div className="h-7 w-[1px] bg-slate-800" />
          <div className="text-center px-2">
            <span className="text-xl font-bold font-mono text-violet-400 block">100%</span>
            <span className="text-[11px] text-slate-400 uppercase tracking-wider">Hands-On</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4 mb-10 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 md:p-5 backdrop-blur-md">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Level Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedLevelId("all")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedLevelId === "all"
                  ? "bg-teal-500 text-slate-950 shadow-md shadow-teal-500/25"
                  : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              All Levels (59)
            </button>
            {COURSE_LEVELS.map((lvl) => {
              const isActive = selectedLevelId === lvl.id;
              return (
                <button
                  key={lvl.id}
                  onClick={() => setSelectedLevelId(lvl.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
                    isActive
                      ? "bg-slate-100 text-slate-950 font-bold"
                      : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
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
                  L{lvl.levelNumber}: {lvl.subtitle.split("&")[0]}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search LangGraph, MCP, Swarm..."
              className="w-full bg-slate-950 border border-slate-850 rounded-xl pl-9 pr-3.5 py-2 text-xs md:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-500/60 focus:ring-1 focus:ring-teal-500/30 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-300"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Tag pills */}
        <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-slate-800/60">
          <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1 mr-1">
            <Filter className="w-3 h-3" /> Topic:
          </span>
          <button
            onClick={() => setSelectedTag("all")}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition ${
              selectedTag === "all"
                ? "bg-slate-700 text-teal-300"
                : "bg-slate-950 text-slate-400 hover:text-slate-200"
            }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag === selectedTag ? "all" : tag)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition ${
                selectedTag === tag
                  ? "bg-teal-500/20 text-teal-300 border border-teal-500/40"
                  : "bg-slate-950 border border-slate-850 text-slate-400 hover:text-slate-200 hover:border-slate-800"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Result Count Announcement */}
      {searchQuery && (
        <div className="mb-6 text-xs font-mono text-slate-400">
          Showing <span className="text-teal-400 font-bold">{totalMatchingModules}</span> matching modules
        </div>
      )}

      {/* Levels and Modules Render */}
      <div className="space-y-14">
        {filteredLevels.map((lvl) => {
          return (
            <div key={lvl.id} className="relative">
              {/* Level Category Banner */}
              <div
                className={`p-6 rounded-2xl border ${lvl.color.border} bg-gradient-to-r ${lvl.color.gradient} backdrop-blur-sm mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className={`text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${lvl.color.badge}`}
                    >
                      Level {lvl.levelNumber}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {lvl.modulesCount} Core Modules
                    </span>
                  </div>
                  <h3 className="text-2xl font-extrabold text-white tracking-tight">
                    {lvl.title}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                    {lvl.description}
                  </p>
                </div>
              </div>

              {/* Module Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {lvl.filteredModules.map((mod) => {
                  const completed = isCompleted(mod.id);
                  const bookmarked = isBookmarked(mod.id);

                  return (
                    <div
                      key={mod.id}
                      className="group rounded-2xl border border-slate-800/90 bg-slate-950/70 hover:bg-slate-900/80 p-5 flex flex-col justify-between transition-all duration-300 hover:border-slate-700 hover:shadow-xl hover:shadow-slate-950/50 relative overflow-hidden"
                    >
                      {/* Top bar with module badge and bookmark */}
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span
                            className={`font-mono text-xs font-bold px-2 py-0.5 rounded-md border ${
                              completed
                                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                                : "bg-slate-900 text-teal-400 border-slate-800"
                            }`}
                          >
                            Module {mod.number}
                          </span>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                toggleBookmark(mod.id);
                              }}
                              className={`p-1.5 rounded-lg hover:bg-slate-800 transition ${
                                bookmarked
                                  ? "text-amber-400"
                                  : "text-slate-600 hover:text-slate-400"
                              }`}
                              title={bookmarked ? "Bookmarked" : "Bookmark Module"}
                            >
                              <Bookmark className="w-3.5 h-3.5 fill-current" />
                            </button>

                            {completed && (
                              <span
                                className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20"
                                title="Module Completed"
                              >
                                <CheckCircle2 className="w-3 h-3" /> Done
                              </span>
                            )}
                          </div>
                        </div>

                        <Link
                          href={`/learn/${mod.levelId}/${mod.id}`}
                          className="block group-hover:text-teal-300 transition-colors"
                        >
                          <h4 className="text-base font-bold text-white line-clamp-2 leading-snug">
                            {mod.title}
                          </h4>
                        </Link>

                        <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                          {mod.summary}
                        </p>
                      </div>

                      {/* Meta information & CTA footer */}
                      <div className="pt-4 mt-4 border-t border-slate-850">
                        {/* Tags */}
                        <div className="flex items-center gap-1.5 flex-wrap mb-3">
                          {mod.tags.map((t) => (
                            <span
                              key={t}
                              className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-900 border border-slate-800"
                            >
                              {t}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                          <span className="flex items-center gap-1.5 text-slate-400">
                            <Clock className="w-3.5 h-3.5 text-slate-500" />
                            ~{mod.estimatedMinutes} mins
                          </span>

                          <Link
                            href={`/learn/${mod.levelId}/${mod.id}`}
                            className="inline-flex items-center gap-1 font-semibold text-teal-400 hover:text-teal-300 group-hover:translate-x-0.5 transition-transform"
                          >
                            <span>Learn</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
