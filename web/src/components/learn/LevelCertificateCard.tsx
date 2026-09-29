"use client";

import React from "react";
import { useAuth } from "@/lib/auth-context";
import { useProgress } from "@/lib/store";
import { COURSE_LEVELS } from "@/lib/curriculum-data";
import {
  Award,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Printer,
  CheckCircle2,
  Flame,
  Lock,
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
  const { isCompleted } = useProgress();

  const currentLvl = COURSE_LEVELS.find((l) => l.levelNumber === levelNumber);
  const totalModulesInLevel = currentLvl?.modulesCount || 13;
  const completedInLevel = currentLvl
    ? currentLvl.modules.filter((m) => isCompleted(m.id)).length
    : 0;
  const isLevelComplete = completedInLevel >= totalModulesInLevel;

  const totalCourseModules = COURSE_LEVELS.flatMap((l) => l.modules);
  const totalCourseCompleted = totalCourseModules.filter((m) =>
    isCompleted(m.id)
  ).length;
  const isCourseComplete = totalCourseCompleted >= 59;

  const levelCert = certificates.find((c) => c.levelNumber === levelNumber);
  const masterCert = certificates.find((c) => c.type === "master");

  const handleClaimLevel = () => {
    if (!isLevelComplete) {
      alert(`⚠️ You must complete all ${totalModulesInLevel} lessons in Level ${levelNumber} to generate this certificate! (${completedInLevel}/${totalModulesInLevel} completed)`);
      return;
    }

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
    if (!isCourseComplete) {
      alert(`⚠️ You must complete all 59 curriculum lessons to generate the Master Diploma! (${totalCourseCompleted}/59 completed)`);
      return;
    }

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
      <div
        className={`relative overflow-hidden rounded-3xl border-2 p-6 sm:p-8 shadow-xl transition-all ${
          isLevelComplete
            ? "border-teal-500/40 bg-gradient-to-r from-teal-500/15 via-slate-900/90 to-emerald-500/15 shadow-teal-500/10"
            : "border-slate-300 dark:border-slate-800 bg-slate-100/90 dark:bg-slate-900/80 shadow-slate-900/5"
        }`}
      >
        {/* Ambient Decorative Blurs */}
        {isLevelComplete && (
          <>
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-teal-500/15 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none" />
          </>
        )}

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${
                isLevelComplete
                  ? "bg-gradient-to-br from-teal-400 to-emerald-600 text-slate-950 shadow-teal-500/20"
                  : "bg-slate-200 dark:bg-slate-800 text-slate-500 shadow-slate-900/10"
              }`}
            >
              {isLevelComplete ? (
                <Award className="w-8 h-8" />
              ) : (
                <Lock className="w-7 h-7" />
              )}
            </div>

            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                {isLevelComplete ? (
                  <>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-700 dark:text-teal-300 border border-teal-500/40">
                      🎉 Level {levelNumber} Milestone Completed
                    </span>
                    <span className="text-[11px] font-mono text-teal-700 dark:text-teal-300 flex items-center gap-1 font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5" /> Informational Completion Certificate
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/40">
                      🔒 Certificate Locked • {completedInLevel}/{totalModulesInLevel} Lessons Done
                    </span>
                    <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      Complete All Lessons to Unlock
                    </span>
                  </>
                )}
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                Level {levelNumber}: {levelTitle}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                {isLevelComplete ? (
                  levelCert ? (
                    <>
                      Congratulations on completing all {totalModulesInLevel} lessons in Level {levelNumber}! Your informational completion certificate is available below for download or print.
                    </>
                  ) : (
                    <>
                      You have completed all {totalModulesInLevel} lessons in Level {levelNumber}! Generate your informal completion certificate now for study tracking and personal portfolio reference.
                    </>
                  )
                ) : (
                  <>
                    To generate the Level {levelNumber} certificate, you must complete all {totalModulesInLevel} lessons in this level. You currently have completed <strong>{completedInLevel} of {totalModulesInLevel}</strong> lessons ({totalModulesInLevel - completedInLevel} remaining).
                  </>
                )}
              </p>

              {/* Progress bar when locked */}
              {!isLevelComplete && (
                <div className="pt-1 max-w-md">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-1">
                    <span>Level {levelNumber} Progress</span>
                    <span className="font-bold text-teal-600 dark:text-teal-400">
                      {Math.round((completedInLevel / totalModulesInLevel) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-teal-500 to-emerald-500 h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.max(
                          4,
                          (completedInLevel / totalModulesInLevel) * 100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              )}

              {levelCert && isLevelComplete && (
                <div className="pt-2 flex items-center gap-3 text-xs font-mono text-teal-600 dark:text-teal-400">
                  <span>
                    Credential ID: <strong className="text-slate-900 dark:text-white">{levelCert.verificationCode}</strong>
                  </span>
                  <span>•</span>
                  <span>Issued: {levelCert.issuedAt}</span>
                </div>
              )}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            {!isLevelComplete ? (
              <button
                disabled
                className="px-5 py-3 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-bold text-xs font-mono flex items-center justify-center gap-2 cursor-not-allowed border border-slate-300 dark:border-slate-700/60"
                title={`Complete ${totalModulesInLevel - completedInLevel} more lessons to unlock`}
              >
                <Lock className="w-4 h-4" />
                <span>Locked ({completedInLevel}/{totalModulesInLevel} Lessons)</span>
              </button>
            ) : levelCert ? (
              <button
                onClick={() => setCertificateModalData(levelCert)}
                className="px-5 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs font-mono flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20 transition-all hover:scale-[1.02] cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>View & Download Certificate</span>
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
        <div
          className={`relative overflow-hidden rounded-3xl border-2 p-6 sm:p-8 shadow-2xl transition-all ${
            isCourseComplete
              ? "border-amber-500/60 bg-gradient-to-r from-amber-500/20 via-slate-900/95 to-orange-500/20 shadow-amber-500/15"
              : "border-slate-300 dark:border-slate-800 bg-slate-100/90 dark:bg-slate-900/80 shadow-slate-900/5"
          }`}
        >
          {isCourseComplete && (
            <>
              <div className="absolute -top-14 -right-14 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-14 -left-14 w-48 h-48 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />
            </>
          )}

          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-xl ${
                  isCourseComplete
                    ? "bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-600 text-slate-950 shadow-amber-500/30 animate-pulse"
                    : "bg-slate-200 dark:bg-slate-800 text-slate-500"
                }`}
              >
                {isCourseComplete ? (
                  <Award className="w-9 h-9" />
                ) : (
                  <Lock className="w-8 h-8" />
                )}
              </div>

              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  {isCourseComplete ? (
                    <>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/40">
                        🏆 Curriculum Complete • 59 Modules Mastered
                      </span>
                      <span className="text-[11px] font-mono text-amber-700 dark:text-amber-300 flex items-center gap-1 font-bold">
                        Master Diploma Badge
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/40">
                        🔒 Master Diploma Locked • {totalCourseCompleted}/59 Completed
                      </span>
                      <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                        Complete All 59 Lessons to Unlock
                      </span>
                    </>
                  )}
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Master of Agentic AI Engineering (Completion Badge)
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                  {isCourseComplete ? (
                    masterCert ? (
                      <>
                        Congratulations on completing all 59 modules! Your informal completion recognition is available below for download or print. (Note: Informal completion token, not an accredited academic degree).
                      </>
                    ) : (
                      <>
                        You have completed all 59 modules across the entire curriculum! Generate your Master completion badge now for study tracking and portfolio reference.
                      </>
                    )
                  ) : (
                    <>
                      To unlock the Grand Master Diploma, you must complete all 59 lessons in the curriculum. You currently have completed <strong>{totalCourseCompleted} of 59</strong> lessons ({59 - totalCourseCompleted} remaining across all levels).
                    </>
                  )}
                </p>

                {/* Progress bar when locked */}
                {!isCourseComplete && (
                  <div className="pt-1 max-w-md">
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-1">
                      <span>Full Curriculum Progress</span>
                      <span className="font-bold text-amber-600 dark:text-amber-400">
                        {Math.round((totalCourseCompleted / 59) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-amber-500 to-orange-500 h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.max(
                            4,
                            (totalCourseCompleted / 59) * 100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                )}

                {masterCert && isCourseComplete && (
                  <div className="pt-2 flex items-center gap-3 text-xs font-mono text-amber-600 dark:text-amber-400">
                    <span>
                      Master Credential ID: <strong className="text-slate-900 dark:text-white">{masterCert.verificationCode}</strong>
                    </span>
                    <span>•</span>
                    <span>Issued: {masterCert.issuedAt}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Action CTAs */}
            <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              {!isCourseComplete ? (
                <button
                  disabled
                  className="px-6 py-3.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-bold text-xs font-mono flex items-center justify-center gap-2 cursor-not-allowed border border-slate-300 dark:border-slate-700/60"
                  title={`Complete all 59 lessons to unlock (${totalCourseCompleted}/59 completed)`}
                >
                  <Lock className="w-4 h-4" />
                  <span>Locked ({totalCourseCompleted}/59 Lessons)</span>
                </button>
              ) : masterCert ? (
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
