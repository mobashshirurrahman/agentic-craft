"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "agentic_craft_progress_v1";

export interface ProgressState {
  completedModules: string[]; // array of module IDs like 'module-1-1'
  bookmarkedModules: string[];
  lastVisitedModule: string | null;
  quizScores: Record<string, number>; // moduleId -> score
}

const defaultProgress: ProgressState = {
  completedModules: [],
  bookmarkedModules: [],
  lastVisitedModule: "module-1-1",
  quizScores: {},
};

export function useProgress() {
  const [progress, setProgress] = useState<ProgressState>(defaultProgress);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setProgress(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load progress from localStorage:", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const saveProgress = (newProgress: ProgressState) => {
    setProgress(newProgress);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
    } catch (e) {
      console.error("Failed to save progress to localStorage:", e);
    }
  };

  const toggleComplete = (moduleId: string) => {
    const isCompleted = progress.completedModules.includes(moduleId);
    const updated = isCompleted
      ? progress.completedModules.filter((id) => id !== moduleId)
      : [...progress.completedModules, moduleId];

    saveProgress({
      ...progress,
      completedModules: updated,
    });
  };

  const toggleBookmark = (moduleId: string) => {
    const isBookmarked = progress.bookmarkedModules.includes(moduleId);
    const updated = isBookmarked
      ? progress.bookmarkedModules.filter((id) => id !== moduleId)
      : [...progress.bookmarkedModules, moduleId];

    saveProgress({
      ...progress,
      bookmarkedModules: updated,
    });
  };

  const setLastVisited = (moduleId: string) => {
    saveProgress({
      ...progress,
      lastVisitedModule: moduleId,
    });
  };

  const saveQuizScore = (moduleId: string, score: number) => {
    saveProgress({
      ...progress,
      quizScores: {
        ...progress.quizScores,
        [moduleId]: score,
      },
    });
  };

  return {
    progress,
    isLoaded,
    toggleComplete,
    toggleBookmark,
    setLastVisited,
    saveQuizScore,
    isCompleted: (moduleId: string) => progress.completedModules.includes(moduleId),
    isBookmarked: (moduleId: string) => progress.bookmarkedModules.includes(moduleId),
  };
}
