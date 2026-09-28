"use client";

import React, { useState } from "react";
import {
  DollarSign,
  Clock,
  TrendingUp,
  Users,
  Sparkles,
  Zap,
  BarChart3,
  ShieldCheck,
  RotateCcw,
  ArrowRight,
  Headphones,
  Code,
  Search,
} from "lucide-react";

interface DomainPreset {
  id: string;
  name: string;
  icon: any;
  defaultStaff: number;
  defaultSalary: number;
  defaultTasksPerMonth: number;
  defaultMinutesPerTask: number;
  expectedAutomationRate: number;
  description: string;
}

const DOMAIN_PRESETS: DomainPreset[] = [
  {
    id: "support",
    name: "Customer Support & Triage",
    icon: Headphones,
    defaultStaff: 25,
    defaultSalary: 55000,
    defaultTasksPerMonth: 30000,
    defaultMinutesPerTask: 14,
    expectedAutomationRate: 65,
    description: "Tier-1 ticket resolution, order lookups, FAQ answers, and intelligent ticket routing.",
  },
  {
    id: "engineering",
    name: "Software Engineering & QA",
    icon: Code,
    defaultStaff: 15,
    defaultSalary: 120000,
    defaultTasksPerMonth: 600,
    defaultMinutesPerTask: 180,
    expectedAutomationRate: 35,
    description: "Boilerplate generation, test writing, PR review summaries, and bug diagnosis.",
  },
  {
    id: "research",
    name: "Market & Legal Intelligence",
    icon: Search,
    defaultStaff: 10,
    defaultSalary: 85000,
    defaultTasksPerMonth: 450,
    defaultMinutesPerTask: 240,
    expectedAutomationRate: 50,
    description: "Multi-source web synthesis, competitive analysis, and regulatory compliance reviews.",
  },
];

export default function EnterpriseRoiImpactCalculator() {
  const [selectedPreset, setSelectedPreset] = useState<string>("support");
  const [teamSize, setTeamSize] = useState<number>(25);
  const [avgSalary, setAvgSalary] = useState<number>(55000);
  const [monthlyTasks, setMonthlyTasks] = useState<number>(30000);
  const [automationRate, setAutomationRate] = useState<number>(65);

  const applyPreset = (preset: DomainPreset) => {
    setSelectedPreset(preset.id);
    setTeamSize(preset.defaultStaff);
    setAvgSalary(preset.defaultSalary);
    setMonthlyTasks(preset.defaultTasksPerMonth);
    setAutomationRate(preset.expectedAutomationRate);
  };

  // ROI Calculations
  const annualTeamCost = teamSize * avgSalary;
  const automatedMonthlyTasks = Math.round(monthlyTasks * (automationRate / 100));
  const automatedAnnualTasks = automatedMonthlyTasks * 12;

  // Blended cost per task manually vs agentic
  const workingHoursPerYearPerPerson = 2000;
  const hourlyRate = avgSalary / workingHoursPerYearPerPerson;
  
  // Estimate task duration based on preset
  const presetConfig = DOMAIN_PRESETS.find((p) => p.id === selectedPreset) || DOMAIN_PRESETS[0];
  const hoursPerTask = presetConfig.defaultMinutesPerTask / 60;
  const humanCostPerTask = hoursPerTask * hourlyRate;

  // LLM agent cost estimate (~$0.08 per autonomous ticket/task execution on blended fast model + RAG)
  const agentCostPerTask = 0.08;
  const annualAgentOperationalCost = Math.round(automatedAnnualTasks * agentCostPerTask);

  // Reclaimed labor value
  const annualLaborHoursReclaimed = Math.round(automatedAnnualTasks * hoursPerTask);
  const annualGrossSavings = Math.round(annualLaborHoursReclaimed * hourlyRate);
  const annualNetSavings = Math.max(0, annualGrossSavings - annualAgentOperationalCost);

  // Speedup ratio
  const humanTurnaroundHours = hoursPerTask;
  const agentTurnaroundHours = 0.02; // ~1.2 minutes
  const speedupFactor = Math.round(humanTurnaroundHours / agentTurnaroundHours);

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm overflow-hidden transition-colors">
      {/* Header */}
      <div className="p-5 md:p-6 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                Enterprise ROI & Value Impact Calculator
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                  Interactive Simulator
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Model real-world business returns across Cost Reduction, Speed Acceleration, and Scalability
              </p>
            </div>
          </div>
          <button
            onClick={() => applyPreset(DOMAIN_PRESETS[0])}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-xs font-mono text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Defaults
          </button>
        </div>

        {/* Preset Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-5">
          {DOMAIN_PRESETS.map((preset) => {
            const Icon = preset.icon;
            const isSelected = selectedPreset === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => applyPreset(preset)}
                className={`p-3 rounded-xl border text-left transition flex items-start gap-3 ${
                  isSelected
                    ? "border-emerald-500 bg-emerald-500/15 dark:bg-emerald-500/10 text-emerald-950 dark:text-white shadow-sm ring-1 ring-emerald-500/30"
                    : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                <div
                  className={`p-2 rounded-lg shrink-0 ${
                    isSelected
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold font-mono tracking-tight">
                    {preset.name}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                    {preset.description}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Body: Sliders on Left, Impact Cards on Right */}
      <div className="p-5 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Input Parameters (5 cols) */}
        <div className="lg:col-span-5 space-y-5 bg-slate-50 dark:bg-slate-950/70 p-4 md:p-5 rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold flex items-center gap-1.5 pb-2 border-b border-slate-200 dark:border-slate-800">
            <Users className="w-3.5 h-3.5 text-emerald-500" />
            Operational Inputs
          </div>

          {/* Team Size */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="text-slate-700 dark:text-slate-300 font-medium">Team Size (Full-Time)</span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                {teamSize} specialists
              </span>
            </div>
            <input
              type="range"
              min="2"
              max="200"
              step="1"
              value={teamSize}
              onChange={(e) => setTeamSize(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
              <span>2</span>
              <span>100</span>
              <span>200</span>
            </div>
          </div>

          {/* Avg Annual Salary */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="text-slate-700 dark:text-slate-300 font-medium">Average Annual Compensation</span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                ${avgSalary.toLocaleString()} / yr
              </span>
            </div>
            <input
              type="range"
              min="30000"
              max="200000"
              step="5000"
              value={avgSalary}
              onChange={(e) => setAvgSalary(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
              <span>$30k</span>
              <span>$115k</span>
              <span>$200k</span>
            </div>
          </div>

          {/* Monthly Inquiries / Tasks */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="text-slate-700 dark:text-slate-300 font-medium">Monthly Task Volume</span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                {monthlyTasks.toLocaleString()} tasks/mo
              </span>
            </div>
            <input
              type="range"
              min="200"
              max="100000"
              step="200"
              value={monthlyTasks}
              onChange={(e) => setMonthlyTasks(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
              <span>200</span>
              <span>50,000</span>
              <span>100,000</span>
            </div>
          </div>

          {/* Target Automation Rate */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="text-slate-700 dark:text-slate-300 font-medium">Autonomous Resolution Rate</span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                {automationRate}% of volume
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="90"
              step="5"
              value={automationRate}
              onChange={(e) => setAutomationRate(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
              <span>10% (conservative)</span>
              <span>50%</span>
              <span>90% (aggressive)</span>
            </div>
          </div>

          {/* Summary pill */}
          <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span>Human Team Annual Baseline:</span>
            <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
              ${annualTeamCost.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Right: The 4 Value Pillars Output (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold flex items-center gap-1.5 pb-2 border-b border-slate-200 dark:border-slate-800">
            <Sparkles className="w-3.5 h-3.5 text-teal-500" />
            The 4 Business Value Vectors In Action
          </div>

          {/* Primary Top Highlight: Net Annual Savings */}
          <div className="p-4 md:p-5 rounded-xl border border-emerald-500/40 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-slate-50 dark:to-slate-950 relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5" />
                  Vector 1: Cost Reduction & Net ROI
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1 font-mono tracking-tight">
                  ${annualNetSavings.toLocaleString()}
                  <span className="text-xs font-normal text-slate-500 dark:text-slate-400 ml-1.5">
                    / year net savings
                  </span>
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 shrink-0">
                <BarChart3 className="w-6 h-6" />
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-2.5 leading-relaxed">
              Based on reclaiming <strong className="text-emerald-600 dark:text-emerald-400 font-mono">{annualLaborHoursReclaimed.toLocaleString()} hours</strong> of repetitive work per year. Replaces high-cost routine manual triage with autonomous execution (est. API & compute overhead: ${annualAgentOperationalCost.toLocaleString()}/yr).
            </p>
          </div>

          {/* Grid of the 3 other vectors */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Speed & Efficiency */}
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60">
              <div className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-2">
                <Zap className="w-4 h-4" />
              </div>
              <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase">
                Vector 2: Speed
              </div>
              <div className="text-base font-bold text-slate-900 dark:text-white font-mono mt-0.5">
                {speedupFactor}x Faster
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                Instant 24/7/365 availability. Turnaround dropped from ~{presetConfig.defaultMinutesPerTask}m to ~1.2m.
              </p>
            </div>

            {/* Consistency & Quality */}
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60">
              <div className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-2">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase">
                Vector 3: Quality
              </div>
              <div className="text-base font-bold text-slate-900 dark:text-white font-mono mt-0.5">
                Zero Fatigue
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                100% adherence to standard operating procedures without cognitive burnout or shift degradation.
              </p>
            </div>

            {/* Instant Scalability */}
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60">
              <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-2">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase">
                Vector 4: Scale
              </div>
              <div className="text-base font-bold text-slate-900 dark:text-white font-mono mt-0.5">
                Instant 10x
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                Absorbs traffic surges without months of hiring, onboarding, or overtime costs.
              </p>
            </div>
          </div>

          {/* Hard Industry Proof Points */}
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-xs text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white mb-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Real Enterprise Baseline Benchmarks:
            </div>
            <ul className="space-y-1 text-[11px] text-slate-500 dark:text-slate-400 list-disc list-inside">
              <li>
                <strong className="text-slate-700 dark:text-slate-200">IBM AskHR Case Study:</strong> Delivered $3.5B in productivity savings across 11.5M+ interactions, automating 94% of routine inquiries.
              </li>
              <li>
                <strong className="text-slate-700 dark:text-slate-200">PwC Enterprise Survey (2025):</strong> 79% of organizations have active AI agents; 66% report documented productivity gains and 57% report direct operational cost cuts.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
