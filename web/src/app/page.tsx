import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Hero from "@/components/home/Hero";
import RoadmapDashboard from "@/components/dashboard/RoadmapDashboard";
import Footer from "@/components/layout/Footer";
import { CourseJsonLd } from "@/components/seo/JsonLd";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://agenticcraft.vercel.app";

export const metadata: Metadata = {
  title: "AgenticCraft — Learn Agentic AI by Building (Zero to Production)",
  description:
    "Master autonomous LLM reasoning, LangGraph, Model Context Protocol (MCP), Multi-Agent Swarms, and production deployment across 59 interactive modules.",
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    title: "AgenticCraft — Learn Agentic AI by Building",
    description: "The definitive tutorial platform for building production autonomous AI agents.",
    url: baseUrl,
    siteName: "AgenticCraft",
    type: "website",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] transition-colors duration-200">
      <CourseJsonLd url={baseUrl} />
      <Header />
      <main className="flex-1">
        <Hero />
        <RoadmapDashboard />
      </main>
      <Footer />
    </div>
  );
}
