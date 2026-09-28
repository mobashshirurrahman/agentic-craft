"use client";

import React, { useEffect, useState } from "react";
import { Eye, TrendingUp } from "lucide-react";

export default function ViewCounter() {
  const [views, setViews] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // 1. Initial cached value to prevent layout shift
    const cachedViews = localStorage.getItem("agenticcraft_cached_views");
    if (cachedViews) {
      setViews(parseInt(cachedViews, 10));
    }

    // 2. Fetch fresh incremented view count from API
    async function recordView() {
      try {
        const res = await fetch("/api/views", {
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache",
          },
        });
        if (res.ok) {
          const data = await res.json();
          if (data && typeof data.views === "number") {
            setViews(data.views);
            localStorage.setItem("agenticcraft_cached_views", data.views.toString());
          }
        }
      } catch (err) {
        console.warn("Could not fetch latest live views:", err);
      } finally {
        setLoading(false);
      }
    }

    recordView();
  }, []);

  return (
    <div
      title="Total Live Website Visits (Increments on each session & refresh)"
      className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition select-none group"
    >
      <div className="relative flex items-center justify-center">
        <Eye className="w-3.5 h-3.5 text-teal-400 group-hover:text-teal-300 transition-colors" />
        <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
      </div>

      <div className="flex items-center gap-1 text-[11px] sm:text-xs font-mono font-bold text-slate-300">
        {views !== null ? (
          <span className="text-white tracking-tight">
            {views.toLocaleString()}
          </span>
        ) : loading ? (
          <span className="inline-block w-8 h-3 bg-slate-800 animate-pulse rounded" />
        ) : (
          <span className="text-slate-400">--</span>
        )}
        <span className="text-[10px] text-slate-400 uppercase font-sans font-medium hidden xs:inline">
          views
        </span>
      </div>
    </div>
  );
}
