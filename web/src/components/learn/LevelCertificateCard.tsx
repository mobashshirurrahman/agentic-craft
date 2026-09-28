"use client";

import React from "react";
import { useAuth } from "@/lib/auth-context";
import {
  Award,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Printer,
  CheckCircle2,
  Flame,
} from "lucide-react";
import confetti from "canvas-confetti";

interface LevelCertificateCardProps {
  levelNumber: number;
  levelTitle: string;
  isFinalModule?: boolean;
}

export default function LevelCertificateCard({
  levelNumber,
  levelTitle,
  isFinalModule = false,
}: LevelCertificateCardProps) {
  const {
    isAuthenticated,
    setAuthModalOpen,
    certificates,
    claimLevelCertificate,
    claimMasterCertificate,
    setCertificateModalData,
  } = useAuth();

  const levelCert = certificates.find((c) => c.levelNumber === levelNumber);
  const masterCert = certificates.find((c) => c.type === "master");

  const handleClaimLevel = () => {
    if (!isAuthenticated) {
      setAuthModalOpen(true);
      return;
    }

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {}

    claimLevelCertificate(levelNumber, levelTitle);
  };

  const handleClaimMaster = () => {
    if (!isAuthenticated) {
      setAuthModalOpen(true);
      return;
    }

    try {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.5 },
      });
    } catch {}

    claimMasterCertificate();
  };

  return (
    <div className="space-y-6 my-8">
      {/* 1. LEVEL CERTIFICATE CARD */}
      <div className="relative overflow-hidden rounded-3xl border-2 border-teal-500/40 bg-gradient-to-r from-teal-500/15 via-slate-900/90 to-emerald-500/15 p-6 sm:p-8 shadow-xl shadow-teal-500/10">
        {/* Ambient Decorative Blurs */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-teal-500/15 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-400 to-emerald-600 text-slate-950 flex items-center justify-center shrink-0 shadow-lg shadow-teal-500/20">
              <Award className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/40">
                  🎉 Level {levelNumber} Milestone Completed
                </span>
                <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Official Free Credential
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Level {levelNumber} Specialist: {levelTitle}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                {levelCert ? (
                  <>
                    Congratulations! Your official Level {levelNumber} certificate has been issued and verified. You can view, customize your name, and export it as a high-resolution PDF for LinkedIn.
                  </>
                ) : (
                  <>
                    You have reached the final milestone of Level {levelNumber}. Claim your verified Specialist Certificate now to prove your mastery of modern autonomous agent engineering!
                  </>
                )}
              </p>

              {levelCert && (
                <div className="pt-2 flex items-center gap-3 text-xs font-mono text-teal-400">
                  <span>Credential ID: <strong className="text-white">{levelCert.verificationCode}</strong></span>
                  <span>•</span>
                  <span>Issued: {levelCert.issuedAt}</span>
                </div>
              )}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            {levelCert ? (
              <button
                onClick={() => setCertificateModalData(levelCert)}
                className="px-5 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs font-mono flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20 transition-all hover:scale-[1.02] cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>View & Print Certificate</span>
              </button>
            ) : (
              <button
                onClick={handleClaimLevel}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-extrabold text-xs font-mono flex items-center justify-center gap-2 shadow-xl shadow-teal-500/30 transition-all hover:scale-[1.02] cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Claim Level {levelNumber} Certificate</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. GRAND FINAL MASTER DIPLOMA (On Course Completion Module 4.17) */}
      {isFinalModule && (
        <div className="relative overflow-hidden rounded-3xl border-2 border-amber-500/60 bg-gradient-to-r from-amber-500/20 via-slate-900/95 to-orange-500/20 p-6 sm:p-8 shadow-2xl shadow-amber-500/15">
          <div className="absolute -top-14 -right-14 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-14 -left-14 w-48 h-48 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-600 text-slate-950 flex items-center justify-center shrink-0 shadow-xl shadow-amber-500/30 animate-pulse">
                <Award className="w-9 h-9" />
              </div>

              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    🏆 Grand Finale • Full Course Completion
                  </span>
                  <span className="text-[11px] font-mono text-amber-300 flex items-center gap-1 font-bold">
                    Master of Agentic AI Engineering
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  Master of Agentic AI Engineering (Distinction)
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                  {masterCert ? (
                    <>
                      You have graduated from the AgenticCraft Academy! Your honorary Master Diploma has been verified and registered. Showcase your distinction on LinkedIn or print it for your portfolio.
                    </>
                  ) : (
                    <>
                      You have reached the pinnacle of the 59-module curriculum! Claim your honorary Master Diploma with distinction, verifying your autonomous agent architecture skills worldwide.
                    </>
                  )}
                </p>

                {masterCert && (
                  <div className="pt-2 flex items-center gap-3 text-xs font-mono text-amber-400">
                    <span>Master Credential ID: <strong className="text-white">{masterCert.verificationCode}</strong></span>
                    <span>•</span>
                    <span>Issued: {masterCert.issuedAt}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Action CTAs */}
            <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              {masterCert ? (
                <button
                  onClick={() => setCertificateModalData(masterCert)}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold text-xs font-mono flex items-center justify-center gap-2 shadow-xl shadow-amber-500/30 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>View Master Diploma</span>
                </button>
              ) : (
                <button
                  onClick={handleClaimMaster}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-extrabold text-xs font-mono flex items-center justify-center gap-2 shadow-2xl shadow-amber-500/40 transition-all hover:scale-[1.03] cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Claim Final Master Diploma</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
