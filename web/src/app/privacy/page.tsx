import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  ShieldCheck,
  ArrowLeft,
  Lock,
  Eye,
  FileText,
  CheckCircle2,
  Mail,
  AlertTriangle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy — AgenticCraft Academy",
  description:
    "Privacy Policy for AgenticCraft Academy. Details on how we handle authentication, marketing updates, strict zero-data-selling policy, and limitation of liability.",
  alternates: {
    canonical: "https://agenticcraft.vercel.app/privacy",
  },
};

export default function PrivacyPolicyPage() {
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
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            <span>Last Updated: September 2026</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Privacy Policy & Data Protection
          </h1>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl">
            At AgenticCraft (agenticcraft.vercel.app), we believe in transparent, student-first privacy. We do not sell your personal data and only communicate relevant educational news and platform updates.
          </p>
        </div>

        <div className="prose prose-invert prose-slate max-w-none space-y-8 text-sm sm:text-base text-slate-300 leading-relaxed">
          {/* Section 1 */}
          <section className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Eye className="w-4 h-4 text-teal-400" />
              1. Information We Collect
            </h2>
            <p>
              AgenticCraft is an open-access educational platform. All 59 curriculum modules, interactive simulators, and architectural diagrams are free and public without requiring an account. We only receive personal information when you explicitly choose to sign in:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-slate-300 text-xs sm:text-sm pl-2">
              <li>
                <strong>Authentication Profile:</strong> When signing in with Google or Email, we store your email address, name, and profile avatar to maintain your session and populate your name on official certificates.
              </li>
              <li>
                <strong>Study Streaks & Milestones:</strong> We record daily active timestamps to calculate your learning flame streak (e.g., <code className="text-amber-400 font-mono text-xs">🔥 X Days</code>) and track module completions.
              </li>
              <li>
                <strong>Credential Records:</strong> When you claim Level Specialist Certificates or the Master Diploma, we generate a unique verification code (e.g., <code className="text-teal-300 font-mono text-xs">AC-L1-XXXX</code>) stored in our database.
              </li>
            </ul>
          </section>

          {/* Section 2: Marketing Updates & AI News */}
          <section className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Mail className="w-4 h-4 text-teal-400" />
              2. How We Use Your Email (Marketing Updates & Tech/ Our New Launch News Only)
            </h2>
            <p>
              We only use your provided email address for the following educational and platform-related purposes:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-slate-300 text-xs sm:text-sm pl-2">
              <li>
                <strong>Curriculum & Module Releases:</strong> Notifying you when new hands-on Agentic AI modules, LangGraph tutorials, or MCP architecture lessons are published.
              </li>
              <li>
                <strong>Latest AI News & Industry Updates:</strong> Sharing curated, high-signal breakdowns of autonomous AI frameworks, model breakthroughs, and production engineering practices.
              </li>
              <li>
                <strong>Credential & Streak Reminders:</strong> Notifying you of milestone accomplishments or streak maintenance.
              </li>
            </ul>
            <p className="text-xs text-slate-400 pt-1">
              You can easily unsubscribe or opt out from newsletters and marketing communications at any time with a single click in any email footer.
            </p>
          </section>

          {/* Section 3: Absolute Zero Selling */}
          <section className="p-6 rounded-2xl bg-slate-900/60 border border-teal-500/30 bg-teal-500/5 space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              3. We Strictly Do NOT Sell Your Data
            </h2>
            <p>
              Your trust is our priority. Under no circumstances do we sell, rent, trade, lease, or commercially share your personal data, email address, or learning metrics with third-party advertisers, data aggregators, or external marketing brokers.
            </p>
            <p className="text-xs text-slate-300">
              All data is handled solely by verified, secure infrastructure services (Supabase PostgreSQL encryption at rest and Vercel edge deployment) necessary to operate the application.
            </p>
          </section>

          {/* Section 4: Google OAuth Compliance */}
          <section className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-teal-400" />
              4. Google API User Data Policy Compliance
            </h2>
            <p>
              AgenticCraft uses Google OAuth strictly for user authentication. We request only the minimal basic profile information (<code className="text-teal-300 font-mono text-xs">openid</code>, <code className="text-teal-300 font-mono text-xs">email</code>, <code className="text-teal-300 font-mono text-xs">profile</code>) necessary to identify you and create your certificate.
            </p>
            <p className="text-xs text-slate-300">
              We never access, read, or request access to your Google Drive, Gmail, Docs, Contacts, or any sensitive private data. AgenticCraft complies fully with the Google API Services User Data Policy, including Limited Use requirements.
            </p>
          </section>

          {/* Section 5: Limitation of Liability & Disclaimer */}
          <section className="p-6 rounded-2xl bg-slate-900/60 border border-amber-500/30 bg-amber-500/5 space-y-3">
            <h2 className="text-lg font-bold text-amber-300 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              5. Disclaimer of Liability & &quot;As-Is&quot; Service
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              AgenticCraft is provided on an <strong>&quot;AS-IS&quot; and &quot;AS-AVAILABLE&quot;</strong> basis for educational and tutorial purposes. While we take comprehensive precautions to maintain system security and uptime:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-slate-300 text-xs sm:text-sm pl-2">
              <li>
                <strong>No Liability for Disruptions or Incidents:</strong> To the maximum extent permitted by applicable law, AgenticCraft, its developers, operators, and affiliates <strong>shall NOT be held liable or responsible</strong> for any direct, indirect, incidental, punitive, or consequential damages, service disruptions, third-party hosting or database outages, data corruption, or unauthorized security incidents occurring beyond our direct control.
              </li>
              <li>
                <strong>Autonomous Code Disclaimer:</strong> All code examples, autonomous agent workflows, LangGraph graphs, and API integrations are intended for safe learning. You are solely responsible for testing and validating any autonomous agents or third-party API spend before executing code in private or production systems. We are not responsible for any financial costs, API charges, or autonomous execution outcomes.
              </li>
            </ul>
          </section>

          {/* Section 6: Data Deletion */}
          <section className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-teal-400" />
              6. Your Rights & Account Deletion
            </h2>
            <p>
              You maintain full control of your account. You can request the complete deletion of your profile, email, streak logs, and certificate records at any time:
            </p>
            <p className="font-mono text-xs text-teal-300">
              Support & Inquiries: mobashshirurrahman7870@gmail.com
            </p>
            <p className="text-xs text-slate-400">
              Upon request, your data will be permanently purged from our database records within 30 calendar days.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
