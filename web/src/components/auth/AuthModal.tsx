"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/auth-context";
import {
  X,
  Sparkles,
  Flame,
  Award,
  ShieldCheck,
  Mail,
  ArrowRight,
  Zap,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";

export default function AuthModal() {
  const {
    authModalOpen,
    setAuthModalOpen,
    loginWithGoogle,
    loginWithGithub,
    loginWithEmail,
    loginWithDemo,
  } = useAuth();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState("");

  if (!authModalOpen) return null;

  const handleOAuthLogin = async (provider: "google" | "github") => {
    setIsSubmitting(true);
    setError("");
    try {
      if (provider === "google") {
        await loginWithGoogle();
      } else {
        await loginWithGithub();
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Authentication provider failed.";
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    setError("");

    try {
      await loginWithEmail(email, name);
      setEmailSent(true);
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Failed to sign in. Please try again.";
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoLogin = () => {
    setIsSubmitting(true);
    try {
      loginWithDemo(name || "Agentic Craftsman", email || "learner@agenticcraft.dev");
      setAuthModalOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-md bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden text-slate-200 max-h-[92vh] overflow-y-auto"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* Close button */}
          <button
            onClick={() => setAuthModalOpen(false)}
            className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="space-y-1 mb-5">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-md bg-teal-500/20 text-teal-400 border border-teal-500/30">
                <Sparkles className="w-3.5 h-3.5" />
              </span>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400">
                AgenticCraft Account
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Sign In or Join Free
            </h3>
            <p className="text-xs text-slate-400">
              Save your daily streak and claim official certificates at the end of each level.
            </p>
          </div>

          {/* Value Highlights */}
          <div className="mb-5 p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-1.5 text-xs">
            <div className="flex items-center gap-2 text-slate-300 font-mono text-[11px]">
              <Flame className="w-3.5 h-3.5 text-orange-400 shrink-0" />
              <span>Track consecutive daily study streak</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300 font-mono text-[11px]">
              <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Unlock 4 Level Certificates + Master Diploma</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300 font-mono text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>100% Free Forever • Open-Access Content</span>
            </div>
          </div>

          {/* Error Banner with Guided Solution */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 space-y-2">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed font-mono text-[11px]">{error}</p>
              </div>
              <div className="pt-1 border-t border-amber-500/20 flex items-center justify-between">
                <span className="text-[10px] text-amber-300/80 font-mono">
                  Tip: Use 1-Click Instant Access below
                </span>
                <button
                  type="button"
                  onClick={handleDemoLogin}
                  className="text-[11px] font-bold text-amber-300 hover:underline flex items-center gap-1 cursor-pointer font-mono"
                >
                  <Zap className="w-3 h-3 text-amber-400" />
                  Instant Access Now
                </button>
              </div>
            </div>
          )}

          {emailSent ? (
            <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-white">Check Your Inbox</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                We sent a secure sign-in link to <strong className="text-emerald-300">{email}</strong>. Click it to log in instantly.
              </p>
              <button
                onClick={() => setEmailSent(false)}
                className="mt-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 hover:text-white"
              >
                Back to Options
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {/* OAuth Providers */}
              <button
                type="button"
                onClick={() => handleOAuthLogin("google")}
                disabled={isSubmitting}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 text-xs font-mono font-semibold text-white flex items-center justify-center gap-2.5 transition cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.3 8.9 5 12 5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.3 14.7c-.2-.7-.4-1.5-.4-2.4s.2-1.7.4-2.4L1.6 7c-.8 1.6-1.3 3.4-1.3 5s.5 3.4 1.3 5l3.7-2.3z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.3-6.7-5.3L1.6 16c1.9 3.8 5.8 7 10.4 7z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>

              <button
                type="button"
                onClick={() => handleOAuthLogin("github")}
                disabled={isSubmitting}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 text-xs font-mono font-semibold text-white flex items-center justify-center gap-2.5 transition cursor-pointer"
              >
                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>Continue with GitHub</span>
              </button>

              <div className="flex items-center gap-2 my-2.5">
                <div className="h-[1px] bg-slate-800 flex-1" />
                <span className="text-[10px] font-mono text-slate-500 uppercase">Or with Email</span>
                <div className="h-[1px] bg-slate-800 flex-1" />
              </div>

              {/* Email Form */}
              <form onSubmit={handleEmailSubmit} className="space-y-2.5">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Full Name (for Certificates)"
                  className="w-full bg-slate-900/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 font-mono"
                />

                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-slate-900/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 font-mono"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold text-xs font-mono flex items-center justify-center gap-2 transition cursor-pointer shadow-md shadow-teal-500/20"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send Magic Link / Sign In</span>
                </button>
              </form>

              {/* Instant 1-Click Access */}
              <div className="pt-3 border-t border-slate-850">
                <button
                  type="button"
                  onClick={handleDemoLogin}
                  disabled={isSubmitting}
                  className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-amber-500/15 to-orange-500/15 hover:from-amber-500/25 hover:to-orange-500/25 border border-amber-500/30 text-amber-300 font-mono text-xs flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Instant 1-Click Access (Testing Mode)</span>
                </button>
                <p className="text-[10px] text-slate-500 font-mono text-center mt-1.5">
                  Allows instant local evaluation of streak & certificates without OAuth setup.
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
