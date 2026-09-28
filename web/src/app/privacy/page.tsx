import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ShieldCheck, ArrowLeft, Lock, Eye, FileText, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy — AgenticCraft Academy",
  description:
    "Privacy Policy for AgenticCraft Academy. Learn how we handle your authentication data, learning streaks, and certificates with strict security and zero data sharing.",
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
            Privacy Policy
          </h1>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl">
            At AgenticCraft (accessible via agenticcraft.vercel.app), your privacy and data security are fundamental. This policy outlines how we collect, use, and protect your information.
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
              AgenticCraft is an open-access educational platform. All course content, code snippets, and architecture simulators are public and crawlable without requiring an account. We only collect personal information when you explicitly choose to sign in:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-slate-300 text-xs sm:text-sm pl-2">
              <li>
                <strong>Authentication Data:</strong> When signing in with Google or Email, we receive your email address, name, and profile avatar solely to maintain your session and populate your certificates.
              </li>
              <li>
                <strong>Learning Progress & Streaks:</strong> We record which modules you mark as completed and your consecutive daily study streaks to display your progress metrics and award credentials.
              </li>
              <li>
                <strong>Issued Certificates:</strong> When you claim a Level Specialist Certificate or the Master Diploma, we generate a unique verification identifier (e.g., <code className="text-teal-300 font-mono text-xs">AC-L1-XXXX</code>) stored alongside your chosen name.
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-teal-400" />
              2. Google OAuth & API Data Compliance
            </h2>
            <p>
              When you sign in using Google OAuth:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-slate-300 text-xs sm:text-sm pl-2">
              <li>
                We only request the minimal standard scopes (<code className="text-teal-300 font-mono text-xs">openid</code>, <code className="text-teal-300 font-mono text-xs">email</code>, <code className="text-teal-300 font-mono text-xs">profile</code>) required to authenticate your identity.
              </li>
              <li>
                We <strong>never</strong> request access to your Google Drive, Gmail, Contacts, or any sensitive Google Workspace data.
              </li>
              <li>
                AgenticCraft complies fully with Google API Services User Data Policy, including the Limited Use requirements.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              3. Zero Selling or Commercial Sharing
            </h2>
            <p>
              We do <strong>not</strong> sell, rent, trade, or monetize your personal information or email address to third-party advertisers, data brokers, or external entities under any circumstances.
            </p>
            <p>
              Your data is processed securely through our verified infrastructure partners (Supabase PostgreSQL with encrypted at-rest storage and Vercel edge deployment).
            </p>
          </section>

          {/* Section 4 */}
          <section className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-teal-400" />
              4. Data Retention & Deletion Requests
            </h2>
            <p>
              You maintain full ownership of your data. You may request the complete deletion of your account, learning history, streak logs, and certificate records at any time by contacting our support team:
            </p>
            <p className="font-mono text-xs text-teal-300">
              Email: mobashshirurrahman7870@gmail.com
            </p>
            <p className="text-xs text-slate-400">
              Upon request, all associated identifiers and database records will be permanently expunged within 30 days.
            </p>
          </section>

          {/* Section 5 */}
          <section className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
            <h2 className="text-lg font-bold text-white">5. Changes to This Privacy Policy</h2>
            <p className="text-xs sm:text-sm text-slate-400">
              We may update this policy periodically to reflect platform enhancements or legal requirements. Material updates will be indicated by the &quot;Last Updated&quot; timestamp at the top of this document.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
