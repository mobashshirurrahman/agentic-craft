import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  Scale,
  ArrowLeft,
  ShieldCheck,
  FileCheck,
  CheckCircle2,
  AlertTriangle,
  Mail,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service — AgenticCraft Academy",
  description:
    "Terms of Service for AgenticCraft Academy. Review guidelines for course usage, credentials, zero-data selling, and complete limitation of liability.",
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
            Terms of Service & Usage Agreement
          </h1>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl">
            Welcome to AgenticCraft Academy. By accessing our platform, tutorials, and certificate programs, you agree to these Terms of Service.
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

          {/* Section 2: Marketing & Communication */}
          <section className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Mail className="w-4 h-4 text-teal-400" />
              2. Email Communications & Marketing Updates
            </h2>
            <p>
              By creating an account, you agree that we may occasionally send educational emails containing curriculum announcements, major AI industry updates, and new lesson releases.
            </p>
            <p>
              We strictly <strong>do not sell, rent, or trade your data</strong> to third-party commercial marketing brokers. You may opt out or unsubscribe at any time.
            </p>
          </section>

          {/* Section 3 */}
          <section className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              3. User Accounts & Verified Credentials
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

          {/* Section 4: Limitation of Liability ("If anything happens, we are not responsible") */}
          <section className="p-6 rounded-2xl bg-slate-900/60 border border-amber-500/30 bg-amber-500/5 space-y-3">
            <h2 className="text-lg font-bold text-amber-300 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              4. Complete Disclaimer of Liability (&quot;Not Responsible&quot;)
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              AgenticCraft is provided purely as an educational learning service on an <strong>&quot;AS-IS&quot; and &quot;AS-AVAILABLE&quot;</strong> basis without any express or implied warranties.
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-300 text-xs sm:text-sm pl-2">
              <li>
                <strong>No Responsibility for Incidents:</strong> If any technical failure, hosting outage, unauthorized third-party access, data loss, or unforeseen security event occurs, <strong>AgenticCraft and its creators, maintainers, and contributors are NOT responsible or liable</strong> under any circumstances.
              </li>
              <li>
                <strong>Autonomous Agents & API Costs:</strong> Users are solely responsible for testing and monitoring their own LLM calls, autonomous agent loops, and third-party API keys (e.g., OpenAI, Anthropic, Gemini, Groq). AgenticCraft bears <strong>zero liability</strong> for unexpected agent behaviors, infinite loops, API overages, token costs, or external side effects produced by user code.
              </li>
              <li>
                <strong>Hold Harmless:</strong> By using the website, you agree to hold harmless and indemnify AgenticCraft from any claims, damages, liabilities, or expenses arising from your use of the platform.
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
            <h2 className="text-lg font-bold text-white">5. Contact Information</h2>
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
