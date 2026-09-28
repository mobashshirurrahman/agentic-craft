import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Scale, ArrowLeft, ShieldCheck, FileCheck, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service — AgenticCraft Academy",
  description:
    "Terms of Service for AgenticCraft Academy. Review guidelines for course usage, credentials, and open-source materials.",
  alternates: {
    canonical: "https://agenticcraft.vercel.app/terms",
  },
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-200">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-teal-400 hover:text-teal-300 transition mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to AgenticCraft Academy</span>
        </Link>

        <div className="space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-mono">
            <Scale className="w-4 h-4 text-teal-400" />
            <span>Last Updated: September 2026</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Terms of Service
          </h1>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl">
            Welcome to AgenticCraft. By accessing our platform, tutorials, and certificate programs, you agree to these Terms of Service.
          </p>
        </div>

        <div className="prose prose-invert prose-slate max-w-none space-y-8 text-sm sm:text-base text-slate-300 leading-relaxed">
          {/* Section 1 */}
          <section className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-teal-400" />
              1. Educational Use & Open Access
            </h2>
            <p>
              AgenticCraft provides free, public access to 59 curriculum modules covering Autonomous AI Agents, LangGraph, Model Context Protocol, and Production Architecture.
            </p>
            <p>
              You are free to study, reference, and build real-world applications using the code patterns and architectural concepts provided.
            </p>
          </section>

          {/* Section 2 */}
          <section className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              2. User Accounts & Verified Credentials
            </h2>
            <p>
              When creating an account to track your daily streak and claim certificates:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-slate-300 text-xs sm:text-sm pl-2">
              <li>You agree to provide accurate information for the name appearing on your official credential.</li>
              <li>You may not impersonate others or attempt to forge verification identifiers.</li>
              <li>Official certificates may be shared on LinkedIn, CVs, and portfolios with their unique verification code.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              3. Disclaimer of Warranties
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              The platform and tutorial code are provided &quot;as is&quot; for educational purposes without warranties of any kind. AgenticCraft is not responsible for autonomous actions taken by your custom AI agents deployed on third-party APIs.
            </p>
          </section>

          {/* Section 4 */}
          <section className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
            <h2 className="text-lg font-bold text-white">4. Contact Information</h2>
            <p className="text-xs sm:text-sm text-slate-400">
              For legal inquiries or terms clarification, reach out to:
            </p>
            <p className="font-mono text-xs text-teal-300">
              mobashshirurrahman7870@gmail.com
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
