"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth, CertificateRecord } from "@/lib/auth-context";
import {
  Award,
  X,
  Printer,
  Share2,
  Check,
  Copy,
  Sparkles,
  ShieldCheck,
  Edit3,
  ExternalLink,
  Flame,
} from "lucide-react";
import confetti from "canvas-confetti";

export default function CertificateModal() {
  const { certificateModalData, setCertificateModalData, user } = useAuth();
  const [copied, setCopied] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [customName, setCustomName] = useState("");

  if (!certificateModalData) return null;

  const displayName =
    customName ||
    certificateModalData.studentName ||
    user?.name ||
    "Agentic AI Engineer";

  const handleCopyCode = () => {
    navigator.clipboard.writeText(certificateModalData.verificationCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleLinkedInShare = () => {
    const text = `I just earned the official ${certificateModalData.title} from AgenticCraft! Mastered autonomous agent reasoning, LangGraph, and Model Context Protocol. Check out my verified credential: ${certificateModalData.verificationCode}`;
    const url = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {}
  };

  const isMaster = certificateModalData.type === "master";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.93, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.93, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-4xl bg-slate-950 border border-slate-800 rounded-3xl p-4 sm:p-8 shadow-2xl my-auto text-slate-200"
        >
          {/* Header Controls (Hidden on Print) */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-850 print:hidden">
            <div className="flex items-center gap-2">
              <span className={`p-1.5 rounded-lg border ${
                isMaster
                  ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
                  : "bg-teal-500/20 text-teal-400 border-teal-500/30"
              }`}>
                <Award className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                  <span>{isMaster ? "Grand Master Credential" : "Level Specialist Credential"}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Verified
                  </span>
                </h3>
                <p className="text-[11px] text-slate-400 font-mono">
                  Code: {certificateModalData.verificationCode}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1.5 transition cursor-pointer"
                title="Print or Save as PDF"
              >
                <Printer className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">Print / PDF</span>
              </button>

              <button
                onClick={handleLinkedInShare}
                className="px-3 py-1.5 rounded-xl bg-sky-600/20 border border-sky-500/30 hover:bg-sky-600/30 text-xs font-mono text-sky-300 flex items-center gap-1.5 transition cursor-pointer"
                title="Share to LinkedIn"
              >
                <Share2 className="w-3.5 h-3.5 text-sky-400" />
                <span className="hidden sm:inline">Share</span>
              </button>

              <button
                onClick={() => setCertificateModalData(null)}
                className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* EDIT NAME ACCORDION (Hidden on Print) */}
          <div className="mb-4 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between text-xs font-mono print:hidden">
            <div className="flex items-center gap-2 text-slate-300">
              <Edit3 className="w-4 h-4 text-teal-400" />
              <span>Recipient Name: <strong className="text-white">{displayName}</strong></span>
            </div>
            {isEditingName ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="Type Full Legal Name"
                  className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-teal-500 font-mono w-44 sm:w-60"
                  autoFocus
                />
                <button
                  onClick={() => setIsEditingName(false)}
                  className="px-2.5 py-1 rounded-lg bg-teal-500 text-slate-950 font-bold hover:bg-teal-400 transition"
                >
                  Save
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setCustomName(displayName);
                  setIsEditingName(true);
                }}
                className="text-teal-400 hover:text-teal-300 underline underline-offset-2"
              >
                Edit Name on Certificate
              </button>
            )}
          </div>

          {/* THE OFFICIAL CERTIFICATE CANVAS */}
          <div
            id="certificate-print-area"
            className={`relative rounded-2xl border-4 p-6 sm:p-12 text-center overflow-hidden transition-all shadow-2xl ${
              isMaster
                ? "border-amber-500/50 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 shadow-amber-500/10"
                : "border-teal-500/50 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 shadow-teal-500/10"
            }`}
          >
            {/* Ornamental Border Corners */}
            <div className={`absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 ${isMaster ? "border-amber-400" : "border-teal-400"}`} />
            <div className={`absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 ${isMaster ? "border-amber-400" : "border-teal-400"}`} />
            <div className={`absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 ${isMaster ? "border-amber-400" : "border-teal-400"}`} />
            <div className={`absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 ${isMaster ? "border-amber-400" : "border-teal-400"}`} />

            {/* Subtle Watermark Background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
              <Award className="w-96 h-96 text-white" />
            </div>

            {/* Certificate Header */}
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-2">
                <span className={`text-[11px] font-mono uppercase tracking-[0.25em] font-bold ${
                  isMaster ? "text-amber-400" : "text-teal-400"
                }`}>
                  AgenticCraft Academy • Global Credential
                </span>
              </div>

              <h4 className="text-xs sm:text-sm font-mono tracking-widest text-slate-400 uppercase pt-1">
                {isMaster
                  ? "HONORARY DIPLOMA OF DISTINCTION"
                  : "SPECIALIST CERTIFICATE OF ENGINEERING MASTERY"}
              </h4>
            </div>

            {/* Certificate Seal Badge */}
            <div className="my-5 flex justify-center">
              <div
                onClick={triggerConfetti}
                className={`w-16 h-16 rounded-full border-2 flex items-center justify-center shadow-lg cursor-pointer transform hover:scale-105 transition-all ${
                  isMaster
                    ? "bg-gradient-to-br from-amber-400 to-amber-600 border-amber-300 text-slate-950"
                    : "bg-gradient-to-br from-teal-400 to-emerald-600 border-teal-300 text-slate-950"
                }`}
                title="Click for celebration!"
              >
                <Award className="w-9 h-9" />
              </div>
            </div>

            {/* "This is to certify that" */}
            <p className="text-xs font-serif italic text-slate-400 tracking-wider">
              This official credential is proudly awarded to
            </p>

            {/* Recipient Name */}
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-wide py-2 capitalize border-b border-slate-800 max-w-lg mx-auto">
              {displayName}
            </h2>

            {/* Narrative Description */}
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed pt-3">
              {isMaster ? (
                <>
                  For successfully mastering the complete <strong>59-Module Autonomous AI Curriculum</strong>, demonstrating verified competency across <strong>ReAct Cognitive Loops</strong>, <strong>LangGraph Multi-Agent Workflows</strong>, <strong>Model Context Protocol (MCP)</strong>, and <strong>Enterprise Production Architecture</strong>.
                </>
              ) : (
                <>
                  For demonstrating verified engineering competency and completing all architectural modules in{" "}
                  <strong className="text-white">{certificateModalData.title}</strong>.
                </>
              )}
            </p>

            {/* Skills Verification Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
              {[
                "Autonomous Reasoning",
                "Tool Use & Feedback Loops",
                "LangGraph Workflows",
                "MCP Client/Server",
                "Deterministic State",
              ].map((badge) => (
                <span
                  key={badge}
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-slate-900 border border-slate-800 text-slate-400"
                >
                  ✓ {badge}
                </span>
              ))}
            </div>

            {/* Signatures & Seal Verification Block */}
            <div className="pt-8 mt-6 border-t border-slate-850 grid grid-cols-1 sm:grid-cols-3 gap-6 items-end text-center">
              {/* Signature 1 */}
              <div className="space-y-1">
                <div className="h-8 flex items-center justify-center font-serif italic text-slate-300 text-sm border-b border-slate-800 w-36 mx-auto">
                  AgenticCraft Faculty
                </div>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                  Curriculum Committee
                </span>
              </div>

              {/* Center Seal */}
              <div className="space-y-1">
                <div className="text-[10px] font-mono text-emerald-400 font-bold flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> VERIFIED ON-CHAIN & WEB
                </div>
                <span className="text-[10px] font-mono text-slate-500 block">
                  Issued: {certificateModalData.issuedAt}
                </span>
              </div>

              {/* Signature 2 */}
              <div className="space-y-1">
                <div className="h-8 flex items-center justify-center font-serif italic text-slate-300 text-sm border-b border-slate-800 w-36 mx-auto">
                  Autonomous Systems Lab
                </div>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                  Credential Authority
                </span>
              </div>
            </div>

            {/* Verification Footer */}
            <div className="pt-4 mt-4 border-t border-slate-850/60 flex flex-col sm:flex-row items-center justify-between text-[10px] font-mono text-slate-500 gap-2">
              <span>Verification ID: <strong className="text-slate-300">{certificateModalData.verificationCode}</strong></span>
              <span>Verify at: <strong className="text-teal-400">agenticcraft.vercel.app</strong></span>
            </div>
          </div>

          {/* Action Footer (Hidden on Print) */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono print:hidden">
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 text-slate-400 hover:text-white transition cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Code Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Credential Code</span>
                </>
              )}
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold transition flex items-center gap-2 cursor-pointer shadow-md shadow-teal-500/20"
              >
                <Printer className="w-4 h-4" />
                <span>Download / Print Certificate</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
