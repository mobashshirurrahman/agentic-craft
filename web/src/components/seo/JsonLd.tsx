import React from "react";
import { CourseModule, CourseLevel } from "@/lib/curriculum-data";

interface CourseJsonLdProps {
  module?: CourseModule;
  level?: CourseLevel;
  url: string;
}

export function CourseJsonLd({ module, level, url }: CourseJsonLdProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://agenticcraft.vercel.app";

  if (module && level) {
    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Course",
          name: `Module ${module.number}: ${module.title}`,
          description: `Master ${module.title} in Level ${level.levelNumber} (${level.subtitle}). In-depth hands-on agentic engineering with pure Python, state machines, and practical examples.`,
          provider: {
            "@type": "Organization",
            name: "AgenticCraft Academy",
            url: baseUrl,
            sameAs: "https://github.com/mobashshirurrahman/agentic-craft",
          },
          url: url,
          educationalLevel: level.subtitle,
          inLanguage: "en",
          isAccessibleForFree: true,
          offers: {
            "@type": "Offer",
            category: "Free",
            price: "0",
            priceCurrency: "USD",
          },
          hasCourseInstance: {
            "@type": "CourseInstance",
            courseMode: "Online",
            courseWorkload: `PT${module.estimatedMinutes}M`,
          },
          about: [
            "Agentic AI",
            "Autonomous Agents",
            "LangGraph",
            "LLM Tool Calling",
            "Multi-Agent Systems",
          ],
          teaches: module.keyTopics || [module.title],
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: baseUrl,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Curriculum",
              item: `${baseUrl}/learn`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: `Level ${level.levelNumber}: ${level.subtitle}`,
              item: `${baseUrl}/learn#level-${level.levelNumber}`,
            },
            {
              "@type": "ListItem",
              position: 4,
              name: `Module ${module.number}: ${module.title}`,
              item: url,
            },
          ],
        },
      ],
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    );
  }

  // Entire Academy Course Schema for Home / Learn page
  const fullCourseJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Course",
        name: "AgenticCraft: Master Agentic AI by Building (Zero to Production)",
        description:
          "The definitive, production-grade tutorial platform for building autonomous AI agents. Covers foundational reasoning, tool invocation, LangGraph, Model Context Protocol (MCP), and production swarms across 59 interactive modules.",
        provider: {
          "@type": "Organization",
          name: "AgenticCraft Academy",
          url: baseUrl,
        },
        url: baseUrl,
        educationalLevel: "Beginner to Advanced",
        isAccessibleForFree: true,
        offers: {
          "@type": "Offer",
          category: "Free",
          price: "0",
          priceCurrency: "USD",
        },
        hasCourseInstance: {
          "@type": "CourseInstance",
          courseMode: "Online",
        },
      },
      {
        "@type": "WebSite",
        name: "AgenticCraft",
        url: baseUrl,
        description:
          "Learn Agentic AI from First Principles. Free interactive curriculum with hands-on Python and LangGraph code.",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(fullCourseJsonLd) }}
    />
  );
}
