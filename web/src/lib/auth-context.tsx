"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "./supabase";
import { COURSE_LEVELS } from "./curriculum-data";

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
}

export interface StreakData {
  count: number;
  lastActiveDate: string;
  longestStreak: number;
}

export interface CertificateRecord {
  id: string;
  type: "level" | "master";
  levelId?: string;
  levelNumber?: number;
  title: string;
  issuedAt: string;
  verificationCode: string;
  studentName: string;
}

export const isLevelCompletedInStorage = (levelNumber: number): boolean => {
  if (typeof window === "undefined") return false;
  try {
    const raw = localStorage.getItem("agentic_craft_progress_v1");
    if (!raw) return false;
    const data = JSON.parse(raw);
    const completedList: string[] = Array.isArray(data?.completedModules)
      ? data.completedModules
      : [];
    const lvl = COURSE_LEVELS.find((l) => l.levelNumber === levelNumber);
    if (!lvl) return false;
    return lvl.modules.every((m) => completedList.includes(m.id));
  } catch {
    return false;
  }
};

export const isCourseCompletedInStorage = (): boolean => {
  if (typeof window === "undefined") return false;
  try {
    const raw = localStorage.getItem("agentic_craft_progress_v1");
    if (!raw) return false;
    const data = JSON.parse(raw);
    const completedList: string[] = Array.isArray(data?.completedModules)
      ? data.completedModules
      : [];
    return COURSE_LEVELS.every((lvl) =>
      lvl.modules.every((m) => completedList.includes(m.id))
    );
  } catch {
    return false;
  }
};

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  streak: StreakData;
  certificates: CertificateRecord[];
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  certificateModalData: CertificateRecord | null;
  setCertificateModalData: (cert: CertificateRecord | null) => void;
  loginWithGoogle: () => Promise<void>;
  loginWithGithub: () => Promise<void>;
  loginWithEmail: (email: string, name?: string) => Promise<void>;
  loginWithDemo: (name?: string, email?: string) => void;
  logout: () => Promise<void>;
  claimLevelCertificate: (levelNumber: number, levelTitle: string) => CertificateRecord | null;
  claimMasterCertificate: () => CertificateRecord | null;
  hasLevelCertificate: (levelNumber: number) => boolean;
  hasMasterCertificate: () => boolean;
  isLevelCompleted: (levelNumber: number) => boolean;
  isMasterCompleted: () => boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  streak: { count: 1, lastActiveDate: "", longestStreak: 1 },
  certificates: [],
  authModalOpen: false,
  setAuthModalOpen: () => {},
  certificateModalData: null,
  setCertificateModalData: () => {},
  loginWithGoogle: async () => {},
  loginWithGithub: async () => {},
  loginWithEmail: async () => {},
  loginWithDemo: () => {},
  logout: async () => {},

  claimLevelCertificate: () => null,
  claimMasterCertificate: () => null,
  hasLevelCertificate: () => false,
  hasMasterCertificate: () => false,
  isLevelCompleted: () => false,
  isMasterCompleted: () => false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [certificateModalData, setCertificateModalData] = useState<CertificateRecord | null>(null);

  const [streak, setStreak] = useState<StreakData>({
    count: 1,
    lastActiveDate: "",
    longestStreak: 1,
  });

  const [certificates, setCertificates] = useState<CertificateRecord[]>([]);

  // 1. Initialize user, streaks, and certificates from LocalStorage or Supabase
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];

    // Load local streak
    const savedStreak = localStorage.getItem("agentic_user_streak");
    if (savedStreak) {
      try {
        const parsed: StreakData = JSON.parse(savedStreak);
        const lastDate = parsed.lastActiveDate;

        if (lastDate === today) {
          // Already active today
          setStreak(parsed);
        } else {
          const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
          if (lastDate === yesterday) {
            // Consecutive day!
            const newCount = parsed.count + 1;
            const updated = {
              count: newCount,
              lastActiveDate: today,
              longestStreak: Math.max(parsed.longestStreak || 1, newCount),
            };
            setStreak(updated);
            localStorage.setItem("agentic_user_streak", JSON.stringify(updated));
          } else if (lastDate) {
            // Missed streak, reset to 1
            const updated = {
              count: 1,
              lastActiveDate: today,
              longestStreak: parsed.longestStreak || 1,
            };
            setStreak(updated);
            localStorage.setItem("agentic_user_streak", JSON.stringify(updated));
          } else {
            const updated = { count: 1, lastActiveDate: today, longestStreak: 1 };
            setStreak(updated);
            localStorage.setItem("agentic_user_streak", JSON.stringify(updated));
          }
        }
      } catch {
        setStreak({ count: 1, lastActiveDate: today, longestStreak: 1 });
      }
    } else {
      const initial = { count: 1, lastActiveDate: today, longestStreak: 1 };
      setStreak(initial);
      localStorage.setItem("agentic_user_streak", JSON.stringify(initial));
    }

    // Load certificates (only keep ones where the level was truly completed)
    const savedCerts = localStorage.getItem("agentic_certificates");
    if (savedCerts) {
      try {
        const rawCerts = JSON.parse(savedCerts);
        if (Array.isArray(rawCerts)) {
          const verifiedCerts = rawCerts.filter((c: CertificateRecord) => {
            if (c.type === "master") return isCourseCompletedInStorage();
            if (c.type === "level" && c.levelNumber) return isLevelCompletedInStorage(c.levelNumber);
            return false;
          });
          setCertificates(verifiedCerts);
          if (verifiedCerts.length !== rawCerts.length) {
            localStorage.setItem("agentic_certificates", JSON.stringify(verifiedCerts));
          }
        }
      } catch {}
    }

    // Load user: check Supabase session if configured, or check local demo auth
    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || "",
            name:
              session.user.user_metadata?.full_name ||
              session.user.user_metadata?.name ||
              session.user.email?.split("@")[0] ||
              "Learner",
            avatarUrl: session.user.user_metadata?.avatar_url,
          });
        }
        setIsLoading(false);
      });

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || "",
            name:
              session.user.user_metadata?.full_name ||
              session.user.user_metadata?.name ||
              session.user.email?.split("@")[0] ||
              "Learner",
            avatarUrl: session.user.user_metadata?.avatar_url,
          });
        } else {
          setUser(null);
        }
        setIsLoading(false);
      });

      return () => {
        subscription.unsubscribe();
      };
    } else {
      // Local/Demo Auth support (ensures local dev without Supabase keys still works seamlessly)
      const localUser = localStorage.getItem("agentic_local_user");
      if (localUser) {
        try {
          setUser(JSON.parse(localUser));
        } catch {}
      }
      setIsLoading(false);
    }
  }, []);

  const loginWithGoogle = async () => {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin,
        },
      });
      if (error) {
        if (error.message?.includes("provider is not enabled") || error.message?.includes("Unsupported provider")) {
          throw new Error("Google login is not enabled in your Supabase project yet. Go to Supabase Dashboard → Authentication → Providers → Google to enable it!");
        }
        throw error;
      }
    } else {
      throw new Error(
        "Supabase is not configured on this deployment. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your Vercel Dashboard → Settings → Environment Variables, then Redeploy!"
      );
    }
  };

  const loginWithGithub = async () => {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: window.location.origin,
        },
      });
      if (error) {
        if (error.message?.includes("provider is not enabled") || error.message?.includes("Unsupported provider")) {
          throw new Error("GitHub login is not enabled in your Supabase project yet. Go to Supabase Dashboard → Authentication → Providers → GitHub to enable it!");
        }
        throw error;
      }
    } else {
      throw new Error(
        "Supabase is not configured on this deployment. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your Vercel Dashboard → Settings → Environment Variables, then Redeploy!"
      );
    }
  };



  const loginWithEmail = async (email: string, name?: string) => {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.origin,
        },
      });
      if (error) throw error;
    } else {
      throw new Error(
        "Supabase is not configured on this deployment. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your Vercel Dashboard → Settings → Environment Variables, then Redeploy!"
      );
    }
  };


  const loginWithDemo = (name?: string, email?: string) => {
    const demoUser: UserProfile = {
      id: `user-${Date.now()}`,
      email: email || "craftsman@agenticcraft.dev",
      name: name || "Agentic Craftsman",
      avatarUrl: "",
    };
    setUser(demoUser);
    localStorage.setItem("agentic_local_user", JSON.stringify(demoUser));
    setAuthModalOpen(false);
  };

  const logout = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    localStorage.removeItem("agentic_local_user");
  };

  // Certificate claim functions with STRICT COMPLETION GATING
  const claimLevelCertificate = (levelNumber: number, levelTitle: string): CertificateRecord | null => {
    // 1. Enforce all lessons in this level completed
    if (!isLevelCompletedInStorage(levelNumber)) {
      alert(`⚠️ You cannot generate this certificate yet! You must complete all lessons in Level ${levelNumber} first.`);
      return null;
    }

    const existing = certificates.find((c) => c.levelNumber === levelNumber);
    if (existing) {
      setCertificateModalData(existing);
      return existing;
    }

    const studentName = user?.name || "Agentic Craftsman";
    const verificationCode = `AC-L${levelNumber}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    const newCert: CertificateRecord = {
      id: `cert-level-${levelNumber}-${Date.now()}`,
      type: "level",
      levelNumber,
      title: `Level ${levelNumber} Specialist: ${levelTitle}`,
      issuedAt: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      verificationCode,
      studentName,
    };

    const updated = [...certificates, newCert];
    setCertificates(updated);
    localStorage.setItem("agentic_certificates", JSON.stringify(updated));
    setCertificateModalData(newCert);
    return newCert;
  };

  const claimMasterCertificate = (): CertificateRecord | null => {
    // 1. Enforce all 59 lessons in curriculum completed
    if (!isCourseCompletedInStorage()) {
      alert("⚠️ You cannot generate the Master Diploma yet! You must complete all 59 lessons across all 4 levels first.");
      return null;
    }

    const existing = certificates.find((c) => c.type === "master");
    if (existing) {
      setCertificateModalData(existing);
      return existing;
    }

    const studentName = user?.name || "Agentic Craftsman";
    const verificationCode = `AC-MAST-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    const masterCert: CertificateRecord = {
      id: `cert-master-${Date.now()}`,
      type: "master",
      title: "Master of Agentic AI Engineering (Completion Badge)",
      issuedAt: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      verificationCode,
      studentName,
    };

    const updated = [...certificates, masterCert];
    setCertificates(updated);
    localStorage.setItem("agentic_certificates", JSON.stringify(updated));
    setCertificateModalData(masterCert);
    return masterCert;
  };

  const hasLevelCertificate = (levelNumber: number) => {
    return certificates.some((c) => c.levelNumber === levelNumber);
  };

  const hasMasterCertificate = () => {
    return certificates.some((c) => c.type === "master");
  };

  const isLevelCompleted = (levelNumber: number) => {
    return isLevelCompletedInStorage(levelNumber);
  };

  const isMasterCompleted = () => {
    return isCourseCompletedInStorage();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isLoading,
        streak,
        certificates,
        authModalOpen,
        setAuthModalOpen,
        certificateModalData,
        setCertificateModalData,
        loginWithGoogle,
        loginWithGithub,
        loginWithEmail,
        loginWithDemo,
        logout,

        claimLevelCertificate,
        claimMasterCertificate,
        hasLevelCertificate,
        hasMasterCertificate,
        isLevelCompleted,
        isMasterCompleted,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
