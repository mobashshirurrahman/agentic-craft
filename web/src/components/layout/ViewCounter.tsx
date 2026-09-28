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
      title="Total Live Website Visitors"
      className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition select-none group shadow-sm"
    >
      <div className="relative flex items-center justify-center shrink-0">
        <Eye className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 group-hover:text-teal-500 transition-colors" />
        <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
      </div>

      <div className="flex items-center gap-1 text-[11px] sm:text-xs font-mono">
        <span className="text-slate-500 dark:text-slate-400 font-sans text-[10px] sm:text-[11px] font-medium tracking-wide shrink-0">
          <span className="hidden sm:inline">Total </span>Visitors:
        </span>
        {views !== null ? (
          <span className="text-teal-700 dark:text-teal-300 font-bold tracking-tight font-mono">
            {views.toLocaleString()}
          </span>
        ) : loading ? (
          <span className="inline-block w-7 h-3 bg-slate-200 dark:bg-slate-800 animate-pulse rounded" />
        ) : (
          <span className="text-slate-400">--</span>
        )}
      </div>
    </div>
  );
}
