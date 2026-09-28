import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import LearnSidebar from "@/components/learn/LearnSidebar";
import ModuleReaderView from "@/components/learn/ModuleReaderView";
import {
  COURSE_LEVELS,
  getModuleById,
  getLevelById,
  getAllModules,
} from "@/lib/curriculum-data";

export async function generateStaticParams() {
  const params: { levelId: string; moduleId: string }[] = [];
  COURSE_LEVELS.forEach((level) => {
    level.modules.forEach((mod) => {
      params.push({
        levelId: level.id,
        moduleId: mod.id,
      });
    });
  });
  return params;
}

import { CourseJsonLd } from "@/components/seo/JsonLd";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ levelId: string; moduleId: string }>;
}) {
  const { moduleId, levelId } = await params;
  const mod = getModuleById(moduleId);
  const lvl = getLevelById(levelId);

  if (!mod || !lvl) {
    return { title: "Module Not Found | AgenticCraft Academy" };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://agenticcraft.vercel.app";
  const pageUrl = `${baseUrl}/learn/${levelId}/${moduleId}`;

  return {
    title: `Module ${mod.number}: ${mod.title} | ${lvl.subtitle} | AgenticCraft`,
    description: `Learn ${mod.title} step-by-step. Master practical Agentic AI engineering with hands-on code, interactive architecture diagrams, and exercises.`,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `Module ${mod.number}: ${mod.title} | AgenticCraft`,
      description: `Master ${mod.title} in Level ${lvl.levelNumber} (${lvl.subtitle}). 100% free, interactive code walkthroughs and diagrams.`,
      url: pageUrl,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `Module ${mod.number}: ${mod.title} | AgenticCraft`,
      description: `Master ${mod.title} with pure Python code, ReAct loops, and LangGraph architecture.`,
    },
  };
}

export default async function ModulePage({
  params,
}: {
  params: Promise<{ levelId: string; moduleId: string }>;
}) {
  const { levelId, moduleId } = await params;
  const mod = getModuleById(moduleId);
  const lvl = getLevelById(levelId);

  if (!mod || !lvl) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://agenticcraft.vercel.app";
  const pageUrl = `${baseUrl}/learn/${levelId}/${moduleId}`;

  const allModules = getAllModules();
  const currentIndex = allModules.findIndex((m) => m.id === mod.id);
  const prevModule = currentIndex > 0 ? allModules[currentIndex - 1] : null;
  const nextModule =
    currentIndex < allModules.length - 1 ? allModules[currentIndex + 1] : null;

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] transition-colors duration-200">
      <CourseJsonLd module={mod} level={lvl} url={pageUrl} />
      <Header />
      <div className="learn-workspace flex-1 flex flex-col lg:flex-row max-w-7xl w-full mx-auto">
        <LearnSidebar currentModuleId={mod.id} currentLevelId={lvl.id} />
        <main className="flex-1 min-w-0 p-3 sm:p-6 md:p-10 overflow-y-auto">
          <ModuleReaderView
            module={mod}
            level={lvl}
            prevModule={prevModule}
            nextModule={nextModule}
          />
        </main>
      </div>
    </div>
  );
}
