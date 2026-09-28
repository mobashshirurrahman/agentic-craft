"use client";

import React from "react";
import Link from "next/link";
import { CourseModule, CourseLevel } from "@/lib/curriculum-data";
import { useProgress } from "@/lib/store";
import {
  CheckCircle2,
  Circle,
  Bookmark,
  Clock,
  FileText,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Layers,
  Code2,
  Lightbulb,
  Terminal,
} from "lucide-react";
import confetti from "canvas-confetti";
import Module1_1Content from "@/components/modules/Module1_1/Module1_1Content";
import Module1_2Content from "@/components/modules/Module1_2/Module1_2Content";
import Module1_3Content from "@/components/modules/Module1_3/Module1_3Content";
import Module1_4Content from "@/components/modules/Module1_4/Module1_4Content";
import Module1_5Content from "@/components/modules/Module1_5/Module1_5Content";
import Module1_6Content from "@/components/modules/Module1_6/Module1_6Content";
import Module1_7Content from "@/components/modules/Module1_7/Module1_7Content";
import Module1_8Content from "@/components/modules/Module1_8/Module1_8Content";
import Module1_9Content from "@/components/modules/Module1_9/Module1_9Content";
import Module1_10Content from "@/components/modules/Module1_10/Module1_10Content";
import Module1_11Content from "@/components/modules/Module1_11/Module1_11Content";
import Module1_12Content from "@/components/modules/Module1_12/Module1_12Content";
import Module1_13Content from "@/components/modules/Module1_13/Module1_13Content";
import Module2_1Content from "@/components/modules/Module2_1/Module2_1Content";
import Module2_2Content from "@/components/modules/Module2_2/Module2_2Content";
import Module2_3Content from "@/components/modules/Module2_3/Module2_3Content";
import Module2_4Content from "@/components/modules/Module2_4/Module2_4Content";
import Module2_5Content from "@/components/modules/Module2_5/Module2_5Content";
import Module2_6Content from "@/components/modules/Module2_6/Module2_6Content";
import Module2_7Content from "@/components/modules/Module2_7/Module2_7Content";
import Module2_8Content from "@/components/modules/Module2_8/Module2_8Content";
import Module2_9Content from "@/components/modules/Module2_9/Module2_9Content";
import Module2_10Content from "@/components/modules/Module2_10/Module2_10Content";
import Module2_11Content from "@/components/modules/Module2_11/Module2_11Content";
import Module2_12Content from "@/components/modules/Module2_12/Module2_12Content";
import Module2_13Content from "@/components/modules/Module2_13/Module2_13Content";
import Module2_14Content from "@/components/modules/Module2_14/Module2_14Content";
import Module2_15Content from "@/components/modules/Module2_15/Module2_15Content";
import Module2_16Content from "@/components/modules/Module2_16/Module2_16Content";
import Module2_17Content from "@/components/modules/Module2_17/Module2_17Content";
import Module3_1Content from "@/components/modules/Module3_1/Module3_1Content";
import Module3_2Content from "@/components/modules/Module3_2/Module3_2Content";
import Module3_3Content from "@/components/modules/Module3_3/Module3_3Content";
import Module3_4Content from "@/components/modules/Module3_4/Module3_4Content";
import Module3_5Content from "@/components/modules/Module3_5/Module3_5Content";
import Module3_6Content from "@/components/modules/Module3_6/Module3_6Content";
import Module3_7Content from "@/components/modules/Module3_7/Module3_7Content";
import Module3_8Content from "@/components/modules/Module3_8/Module3_8Content";
import Module3_9Content from "@/components/modules/Module3_9/Module3_9Content";
import Module3_10Content from "@/components/modules/Module3_10/Module3_10Content";
import Module3_11Content from "@/components/modules/Module3_11/Module3_11Content";
import Module3_12Content from "@/components/modules/Module3_12/Module3_12Content";
import Module4_1Content from "@/components/modules/Module4_1/Module4_1Content";
import Module4_2Content from "@/components/modules/Module4_2/Module4_2Content";
import Module4_3Content from "@/components/modules/Module4_3/Module4_3Content";
import Module4_4Content from "@/components/modules/Module4_4/Module4_4Content";
import Module4_5Content from "@/components/modules/Module4_5/Module4_5Content";
import Module4_6Content from "@/components/modules/Module4_6/Module4_6Content";
import Module4_7Content from "@/components/modules/Module4_7/Module4_7Content";
import Module4_8Content from "@/components/modules/Module4_8/Module4_8Content";
import Module4_9Content from "@/components/modules/Module4_9/Module4_9Content";
import Module4_10Content from "@/components/modules/Module4_10/Module4_10Content";
import Module4_11Content from "@/components/modules/Module4_11/Module4_11Content";
import Module4_12Content from "@/components/modules/Module4_12/Module4_12Content";
import Module4_13Content from "@/components/modules/Module4_13/Module4_13Content";
import Module4_14Content from "@/components/modules/Module4_14/Module4_14Content";
import Module4_15Content from "@/components/modules/Module4_15/Module4_15Content";
import Module4_16Content from "@/components/modules/Module4_16/Module4_16Content";
import Module4_17Content from "@/components/modules/Module4_17/Module4_17Content";

interface ModuleReaderViewProps {
  module: CourseModule;
  level: CourseLevel;
  prevModule: CourseModule | null;
  nextModule: CourseModule | null;
}

export default function ModuleReaderView({
  module,
  level,
  prevModule,
  nextModule,
}: ModuleReaderViewProps) {
  const { isCompleted, toggleComplete, isBookmarked, toggleBookmark } =
    useProgress();
  const completed = isCompleted(module.id);
  const bookmarked = isBookmarked(module.id);

  const handleCompleteClick = () => {
    if (!completed) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
    toggleComplete(module.id);
  };

  const isModule1_1 = module.id === "module-1-1";
  const isModule1_2 = module.id === "module-1-2";
  const isModule1_3 = module.id === "module-1-3";
  const isModule1_4 = module.id === "module-1-4";
  const isModule1_5 = module.id === "module-1-5";
  const isModule1_6 = module.id === "module-1-6";
  const isModule1_7 = module.id === "module-1-7";
  const isModule1_8 = module.id === "module-1-8";
  const isModule1_9 = module.id === "module-1-9";
  const isModule1_10 = module.id === "module-1-10";
  const isModule1_11 = module.id === "module-1-11";
  const isModule1_12 = module.id === "module-1-12";
  const isModule1_13 = module.id === "module-1-13";
  const isModule2_1 = module.id === "module-2-1";
  const isModule2_2 = module.id === "module-2-2";
  const isModule2_3 = module.id === "module-2-3";
  const isModule2_4 = module.id === "module-2-4";
  const isModule2_5 = module.id === "module-2-5";
  const isModule2_6 = module.id === "module-2-6";
  const isModule2_7 = module.id === "module-2-7";
  const isModule2_8 = module.id === "module-2-8";
  const isModule2_9 = module.id === "module-2-9";
  const isModule2_10 = module.id === "module-2-10";
  const isModule2_11 = module.id === "module-2-11";
  const isModule2_12 = module.id === "module-2-12";
  const isModule2_13 = module.id === "module-2-13";
  const isModule2_14 = module.id === "module-2-14";
  const isModule2_15 = module.id === "module-2-15";
  const isModule2_16 = module.id === "module-2-16";
  const isModule2_17 = module.id === "module-2-17";
  const isModule3_1 = module.id === "module-3-1";
  const isModule3_2 = module.id === "module-3-2";
  const isModule3_3 = module.id === "module-3-3";
  const isModule3_4 = module.id === "module-3-4";
  const isModule3_5 = module.id === "module-3-5";
  const isModule3_6 = module.id === "module-3-6";
  const isModule3_7 = module.id === "module-3-7";
  const isModule3_8 = module.id === "module-3-8";
  const isModule3_9 = module.id === "module-3-9";
  const isModule3_10 = module.id === "module-3-10";
  const isModule3_11 = module.id === "module-3-11";
  const isModule3_12 = module.id === "module-3-12";
  const isModule4_1 = module.id === "module-4-1";
  const isModule4_2 = module.id === "module-4-2";
  const isModule4_3 = module.id === "module-4-3";
  const isModule4_4 = module.id === "module-4-4";
  const isModule4_5 = module.id === "module-4-5";
  const isModule4_6 = module.id === "module-4-6";
  const isModule4_7 = module.id === "module-4-7";
  const isModule4_8 = module.id === "module-4-8";
  const isModule4_9 = module.id === "module-4-9";
  const isModule4_10 = module.id === "module-4-10";
  const isModule4_11 = module.id === "module-4-11";
  const isModule4_12 = module.id === "module-4-12";
  const isModule4_13 = module.id === "module-4-13";
  const isModule4_14 = module.id === "module-4-14";
  const isModule4_15 = module.id === "module-4-15";
  const isModule4_16 = module.id === "module-4-16";
  const isModule4_17 = module.id === "module-4-17";

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-mono text-slate-400 overflow-x-auto whitespace-nowrap pb-1 scrollbar-none">
        <Link href="/" className="hover:text-slate-200 transition shrink-0">
          Home
        </Link>
        <span className="shrink-0">/</span>
        <Link href="/#curriculum" className="hover:text-slate-200 transition shrink-0">
          Curriculum
        </Link>
        <span className="shrink-0">/</span>
        <span className="text-slate-300 shrink-0">Level {level.levelNumber}</span>
        <span className="shrink-0">/</span>
        <span className="text-teal-400 font-semibold shrink-0">Module {module.number}</span>
      </nav>

      {/* Module Title Header Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 sm:p-6 md:p-8 backdrop-blur-xl relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${level.color.badge}`}
            >
              Level {level.levelNumber}: {level.subtitle}
            </span>
            <span className="text-xs font-mono text-slate-400">
              Module {module.number}
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleBookmark(module.id)}
              className={`p-2 rounded-xl border transition flex items-center gap-1.5 text-xs font-mono ${
                bookmarked
                  ? "bg-amber-500/20 border-amber-500/40 text-amber-300"
                  : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              <Bookmark className="w-3.5 h-3.5 fill-current" />
              <span>{bookmarked ? "Bookmarked" : "Bookmark"}</span>
            </button>

            <button
              onClick={handleCompleteClick}
              className={`px-3 py-2 rounded-xl border transition flex items-center gap-1.5 text-xs font-mono font-bold ${
                completed
                  ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"
                  : "bg-teal-500/10 border-teal-500/30 text-teal-300 hover:bg-teal-500/20"
              }`}
            >
              {completed ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Completed</span>
                </>
              ) : (
                <>
                  <Circle className="w-3.5 h-3.5" />
                  <span>Mark Complete</span>
                </>
              )}
            </button>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
          {module.title}
        </h1>

        <p className="text-sm md:text-base text-slate-300 mt-3 leading-relaxed">
          {module.summary}
        </p>

        {/* Metadata Strip */}
        <div className="flex flex-wrap items-center gap-4 mt-6 pt-5 border-t border-slate-800/80 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-1.5 text-teal-400">
            <Layers className="w-4 h-4" />
            <span>
              Level {level.levelNumber} • <strong className="text-slate-200">{level.subtitle}</strong>
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-slate-500" />
            <span>Est. ~{module.estimatedMinutes} mins</span>
          </div>

          <div className="flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-slate-500" />
            <span>{module.keyTopics.length || 5} Key Topics</span>
          </div>
        </div>
      </div>

      {/* Render Module Content if Generated, else Syllabus Outline */}
      {isModule1_1 ? (
        <Module1_1Content />
      ) : isModule1_2 ? (
        <Module1_2Content />
      ) : isModule1_3 ? (
        <Module1_3Content />
      ) : isModule1_4 ? (
        <Module1_4Content />
      ) : isModule1_5 ? (
        <Module1_5Content />
      ) : isModule1_6 ? (
        <Module1_6Content />
      ) : isModule1_7 ? (
        <Module1_7Content />
      ) : isModule1_8 ? (
        <Module1_8Content />
      ) : isModule1_9 ? (
        <Module1_9Content />
      ) : isModule1_10 ? (
        <Module1_10Content />
      ) : isModule1_11 ? (
        <Module1_11Content />
      ) : isModule1_12 ? (
        <Module1_12Content />
      ) : isModule1_13 ? (
        <Module1_13Content />
      ) : isModule2_1 ? (
        <Module2_1Content />
      ) : isModule2_2 ? (
        <Module2_2Content />
      ) : isModule2_3 ? (
        <Module2_3Content />
      ) : isModule2_4 ? (
        <Module2_4Content />
      ) : isModule2_5 ? (
        <Module2_5Content />
      ) : isModule2_6 ? (
        <Module2_6Content />
      ) : isModule2_7 ? (
        <Module2_7Content />
      ) : isModule2_8 ? (
        <Module2_8Content />
      ) : isModule2_9 ? (
        <Module2_9Content />
      ) : isModule2_10 ? (
        <Module2_10Content />
      ) : isModule2_11 ? (
        <Module2_11Content />
      ) : isModule2_12 ? (
        <Module2_12Content />
      ) : isModule2_13 ? (
        <Module2_13Content />
      ) : isModule2_14 ? (
        <Module2_14Content />
      ) : isModule2_15 ? (
        <Module2_15Content />
      ) : isModule2_16 ? (
        <Module2_16Content />
      ) : isModule2_17 ? (
        <Module2_17Content />
      ) : isModule3_1 ? (
        <Module3_1Content />
      ) : isModule3_2 ? (
        <Module3_2Content />
      ) : isModule3_3 ? (
        <Module3_3Content />
      ) : isModule3_4 ? (
        <Module3_4Content />
      ) : isModule3_5 ? (
        <Module3_5Content />
      ) : isModule3_6 ? (
        <Module3_6Content />
      ) : isModule3_7 ? (
        <Module3_7Content />
      ) : isModule3_8 ? (
        <Module3_8Content />
      ) : isModule3_9 ? (
        <Module3_9Content />
      ) : isModule3_10 ? (
        <Module3_10Content />
      ) : isModule3_11 ? (
        <Module3_11Content />
      ) : isModule3_12 ? (
        <Module3_12Content />
      ) : isModule4_1 ? (
        <Module4_1Content />
      ) : isModule4_2 ? (
        <Module4_2Content />
      ) : isModule4_3 ? (
        <Module4_3Content />
      ) : isModule4_4 ? (
        <Module4_4Content />
      ) : isModule4_5 ? (
        <Module4_5Content />
      ) : isModule4_6 ? (
        <Module4_6Content />
      ) : isModule4_7 ? (
        <Module4_7Content />
      ) : isModule4_8 ? (
        <Module4_8Content />
      ) : isModule4_9 ? (
        <Module4_9Content />
      ) : isModule4_10 ? (
        <Module4_10Content />
      ) : isModule4_11 ? (
        <Module4_11Content />
      ) : isModule4_12 ? (
        <Module4_12Content />
      ) : isModule4_13 ? (
        <Module4_13Content />
      ) : isModule4_14 ? (
        <Module4_14Content />
      ) : isModule4_15 ? (
        <Module4_15Content />
      ) : isModule4_16 ? (
        <Module4_16Content />
      ) : isModule4_17 ? (
        <Module4_17Content />
      ) : (
        <>
          {/* Module Ready / Next Instruction Callout */}
          <div className="rounded-2xl border border-teal-500/30 bg-gradient-to-r from-teal-500/10 via-slate-900/80 to-transparent p-6 relative overflow-hidden">
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-teal-500/20 text-teal-300 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400">
                    Curriculum Mapped
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-900 text-slate-400 border border-slate-800">
                    Ready to Generate
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-1">
                  Ready for: <code className="text-teal-300 font-mono">Create Module {module.number}</code>
                </h3>
                <p className="text-xs md:text-sm text-slate-300 mt-2 leading-relaxed">
                  As per our course roadmap, say <strong className="text-teal-300">"Create Module {module.number}"</strong> when you are ready to generate this specific module. It will be built with interactive animated diagrams, hands-on code, and knowledge checks!
                </p>
              </div>
            </div>
          </div>

          {/* Core Topics & Curriculum Preview */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-850">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-teal-400" />
                  Lesson Curriculum & Key Concepts
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Core architectural concepts and practical milestones covered in this lesson
                </p>
              </div>
              <span className="text-xs font-mono text-slate-500">
                {module.slides.length} Key Concepts
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {module.slides.map((s, idx) => (
                <div
                  key={s.page}
                  className="p-3.5 rounded-xl border border-slate-850 bg-slate-900/40 hover:bg-slate-900/70 transition"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mb-1">
                    <span>Part {idx + 1}</span>
                    <span className="text-teal-400/80">Topic #{idx + 1}</span>
                  </div>
                  <h4 className="text-xs font-semibold text-slate-200 line-clamp-1">
                    {s.heading || `Topic ${idx + 1}`}
                  </h4>
                  {s.bullets.length > 0 && (
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                      {s.bullets[0]}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Bottom Previous / Next Navigation */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-6 border-t border-slate-800">
        {prevModule ? (
          <Link
            href={`/learn/${prevModule.levelId}/${prevModule.id}`}
            className="flex items-center justify-center sm:justify-start gap-2 px-4 py-3 sm:py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-mono text-slate-300 hover:text-white transition group w-full sm:w-auto"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <div className="text-left">
              <span className="block text-[10px] text-slate-500">Previous</span>
              <span className="font-bold">Module {prevModule.number}</span>
            </div>
          </Link>
        ) : (
          <div className="hidden sm:block" />
        )}

        {nextModule ? (
          <Link
            href={`/learn/${nextModule.levelId}/${nextModule.id}`}
            className="flex items-center justify-center sm:justify-end gap-2 px-4 py-3 sm:py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-mono text-slate-300 hover:text-white transition group w-full sm:w-auto"
          >
            <div className="text-right">
              <span className="block text-[10px] text-slate-500">Next</span>
              <span className="font-bold">Module {nextModule.number}</span>
            </div>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        ) : (
          <div className="hidden sm:block" />
        )}
      </div>
    </div>
  );
}
