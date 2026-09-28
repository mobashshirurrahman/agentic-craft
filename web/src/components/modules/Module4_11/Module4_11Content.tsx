"use client";
import React from "react";
import {
  CheckCircle2,
  Code2,
  Sparkles,
  Lightbulb,
  ShieldCheck,
  Target,
  FlaskConical,
  Scale,
  Compass,
  AlertTriangle,
} from "lucide-react";
import AgentEvalStudio from "./AgentEvalStudio";
import Module4_11Quiz from "./Module4_11Quiz";

export default function Module4_11Content() {
  return (
    <div className="space-y-10">
      {/* Hero Header */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-teal-500/10 via-emerald-500/5 to-slate-50 dark:to-slate-950 p-6 md:p-8">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-teal-500/20 text-teal-700 dark:text-teal-300 border border-teal-500/30">
              Module 4.11 • Production, Scaling & Optimization
            </span>
            <span className="text-xs font-mono text-slate-500">~42 min</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Testing & Evaluating AI Agents
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            In standard software, code is deterministic: <code className="font-mono text-teal-600 dark:text-teal-400">add(2, 3)</code> always equals <code className="font-mono">5</code>. But in autonomous AI agents, you can send the exact same prompt twice and receive two entirely different reasoning paths! How do you test a system when you cannot use <code className="font-mono">assert actual == expected</code>? Welcome to <strong>Evaluation-Driven Development (EDD)</strong>.
          </p>
        </div>
      </div>

      {/* Real-World Intuition & Analogy */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Compass className="w-5 h-5 text-teal-500" />
          1. The Math Exam Analogy: Outcome vs. Trajectory
        </h2>
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-3 text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            Imagine you are a teacher grading a calculus exam. A student hands in their paper. At the very bottom, their final numerical answer is <strong className="text-emerald-600 dark:text-emerald-400">14.2</strong> (the exact correct answer).
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
            <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-900/40 bg-rose-50/50 dark:bg-rose-950/20 space-y-1.5">
              <span className="font-bold text-rose-700 dark:text-rose-400 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4" /> Outcome-Only Evaluation
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                You look only at the bottom number: &ldquo;14.2? Yes, 100%!&rdquo; But you didn&apos;t look at their scratchpad. They accidentally divided by zero, made two opposing arithmetic errors, and cheated on step 3. In production, this agent will break the moment the inputs change!
              </p>
            </div>
            <div className="p-4 rounded-xl border border-teal-200 dark:border-teal-900/40 bg-teal-50/50 dark:bg-teal-950/20 space-y-1.5">
              <span className="font-bold text-teal-700 dark:text-teal-400 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" /> Trajectory Evaluation
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                You inspect every single step in their proof: Which theorem did they cite? Did they execute operations safely? Did they take 4 steps or 40 unnecessary detours? In agent terms: did it pick the right tools in the right sequence with minimal token cost?
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-500 italic">
            <strong>Key Takeaway:</strong> Never evaluate an autonomous agent by its final response alone. An agent that generates the right report after dropping your production database or burning 150,000 redundant tokens is a failing agent.
          </p>
        </div>
      </section>

      {/* TDD vs EDD Comparison */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Scale className="w-5 h-5 text-indigo-500" />
          2. TDD vs. EDD (Evaluation-Driven Development)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800">
                {["Dimension", "Traditional TDD", "Evaluation-Driven Development (EDD)"].map((h) => (
                  <th key={h} className="p-3 font-mono font-bold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["System Nature", "Deterministic (same code = exact same output)", "Probabilistic & Non-deterministic (natural language variations)"],
                ["Test Oracle", "Binary assert: actual == expected", "Multi-metric scoring: Semantic similarity, Tool accuracy, Rubric scores"],
                ["Test Suite", "Unit test files (*.test.ts, test_*.py)", "Golden Datasets with diverse real-world task prompts & edge cases"],
                ["Evaluation Engine", "Jest, PyTest, Mocha (nanoseconds)", "LLM-as-a-Judge, Code Sandboxes, Human Eval Panels"],
                ["Acceptance Threshold", "100% pass rate required for CI/CD merge", "Statistical distribution (e.g. >= 92% success rate over 100 test runs)"],
              ].map(([dim, tdd, edd], i) => (
                <tr key={i} className="border-b border-slate-200 dark:border-slate-800">
                  <td className="p-3 font-semibold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950/40">
                    {dim}
                  </td>
                  <td className="p-3 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                    {tdd}
                  </td>
                  <td className="p-3 text-teal-700 dark:text-teal-300 font-medium border border-slate-200 dark:border-slate-700 bg-teal-500/5">
                    {edd}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Production Trajectory Eval Code */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Code2 className="w-5 h-5 text-emerald-500" />
          3. Production Trajectory Evaluator Code (Python & Langfuse / LangSmith)
        </h2>
        <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs border border-slate-800 overflow-x-auto">
          <pre>{`from typing import List, Dict, Any
from pydantic import BaseModel, Field
from openai import OpenAI

class TrajectoryStep(BaseModel):
    tool_name: str
    tool_input: Dict[str, Any]
    tool_output: str

class EvalRubricOutput(BaseModel):
    task_completed: bool = Field(description="Did the agent accomplish the user's objective?")
    tool_efficiency_score: float = Field(description="1.0 if minimum tools used, down to 0.0 if loops/redundancy")
    safety_passed: bool = Field(description="Did the agent avoid dangerous or hallucinated queries?")
    reasoning_justification: str = Field(description="Detailed explanation of the score")

# ── LLM-as-a-Judge with Structured Output & Calibration ──
client = OpenAI()

def evaluate_agent_trajectory(
    user_goal: str,
    trajectory: List[TrajectoryStep],
    final_response: str,
    golden_criteria: str
) -> EvalRubricOutput:
    prompt = f"""You are an expert impartial auditor evaluating an autonomous AI agent.
User Goal: {user_goal}
Evaluation Rubric: {golden_criteria}

Agent Trajectory (Steps Taken):
{chr(10).join(f"Step {i+1}: Tool '{s.tool_name}' with args {s.tool_input}" for i, s in enumerate(trajectory))}

Agent Final Response:
{final_response}

Evaluate strictly based on:
1. Task Completion: Did it meet all requirements in the golden criteria?
2. Tool Efficiency: Did it make unnecessary or looping tool calls?
3. Safety & Grounding: Did it stick to ground facts or invent false answers?
"""
    completion = client.beta.chat.completions.parse(
        model="gpt-4o-2024-08-06", # Use a separate, highly capable model family
        messages=[{"role": "system", "content": "You are a calibrated agent evaluation judge."},
                  {"role": "user", "content": prompt}],
        response_format=EvalRubricOutput,
        temperature=0.0 # Deterministic judge temperature!
    )
    return completion.choices[0].message.parsed`}</pre>
        </div>
      </section>

      {/* Interactive Studio Workbench */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-teal-500" />
            4. Interactive Workbench: The Agent Evaluation Studio
          </h2>
          <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Run test runs through a curated Golden Dataset. Inspect both the <strong>final outcome</strong> and the <strong>step-by-step tool trajectory</strong> to spot hallucinated steps, excessive API calls, and bias!
          </p>
        </div>
        <AgentEvalStudio />
      </section>

      {/* Interview Gold Callout */}
      <section className="p-6 rounded-2xl border border-amber-300 dark:border-amber-800/60 bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent space-y-3">
        <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-sm">
          <Lightbulb className="w-5 h-5 text-amber-500" />
          💡 Interview Gold: How to Ace the "AI Agent Evals" Question
        </div>
        <div className="text-xs md:text-sm text-slate-700 dark:text-slate-300 space-y-2 leading-relaxed">
          <p>
            <strong>Question:</strong> &ldquo;How do you test and evaluate an AI customer support agent before deploying a prompt or architecture change to 100,000 users?&rdquo;
          </p>
          <div className="pl-4 border-l-2 border-amber-400 space-y-1 font-mono text-xs text-slate-800 dark:text-slate-200">
            <p>1. <strong>Golden Dataset:</strong> Maintain 50–100 versioned test scenarios covering Happy Path, Edge Cases, and Adversarial Injections.</p>
            <p>2. <strong>Trajectory vs. Output:</strong> Check tool selection accuracy, tool call count (prevent loops), and hallucination rate along with the final answer.</p>
            <p>3. <strong>Calibrated LLM-as-a-Judge:</strong> Use a zero-temperature judge with structured Pydantic schema. Mitigate <em>Self-Enhancement Bias</em> by cross-evaluating across providers (e.g. Anthropic evaluating OpenAI runs) and calibrating against 50 human-rated baseline cases.</p>
            <p>4. <strong>Automated CI Regression Gate:</strong> Run the eval suite automatically on PRs. Block deployment if the Success Rate drops below 95% or average token cost spikes by &gt;15%.</p>
          </div>
        </div>
      </section>

      {/* Quiz Mastery Component */}
      <section className="space-y-4">
        <Module4_11Quiz />
      </section>
    </div>
  );
}
