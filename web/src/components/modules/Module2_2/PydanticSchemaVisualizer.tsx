"use client";

import React, { useState } from "react";
import {
  FileJson,
  CheckCircle2,
  AlertCircle,
  Play,
  RotateCcw,
  Sparkles,
  Code2,
  Sliders,
  Check,
} from "lucide-react";

interface FieldDef {
  name: string;
  type: "str" | "int" | "float" | "bool" | "list[str]";
  required: boolean;
  description: string;
}

const DEFAULT_FIELDS: FieldDef[] = [
  { name: "summary", type: "str", required: true, description: "A one-sentence summary of the text." },
  { name: "sentiment", type: "str", required: true, description: "One of: positive, negative, neutral." },
  { name: "confidence", type: "float", required: true, description: "Confidence score between 0.0 and 1.0." },
  { name: "action_items", type: "list[str]", required: false, description: "Key actionable takeaways." },
];

export default function PydanticSchemaVisualizer() {
  const [fields, setFields] = useState<FieldDef[]>(DEFAULT_FIELDS);
  const [activeTab, setActiveTab] = useState<"pydantic" | "json_schema" | "langchain">("pydantic");
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [validationResult, setValidationResult] = useState<{
    success: boolean;
    rawText: string;
    parsedObject: any;
  } | null>(null);

  const toggleFieldRequired = (index: number) => {
    setFields((prev) =>
      prev.map((f, i) => (i === index ? { ...f, required: !f.required } : f))
    );
  };

  const handleTestParse = () => {
    setIsValidating(true);
    setValidationResult(null);

    setTimeout(() => {
      setIsValidating(false);
      setValidationResult({
        success: true,
        rawText: `{"summary": "Server latency surged during flash sale", "sentiment": "negative", "confidence": 0.94, "action_items": ["scale redis replica", "add rate limit"]}`,
        parsedObject: {
          summary: "Server latency surged during flash sale",
          sentiment: "negative",
          confidence: 0.94,
          action_items: ["scale redis replica", "add rate limit"],
        },
      });
    }, 500);
  };

  // Generate Pydantic Code
  const pydanticCode = `from pydantic import BaseModel, Field
from typing import Optional, List

class IncidentReport(BaseModel):
${fields
  .map(
    (f) =>
      `    ${f.name}: ${f.required ? f.type : `Optional[${f.type}]`} = Field(\n        description="${f.description}"\n    )`
  )
  .join("\n")}`;

  // Generate JSON Schema
  const jsonSchema = {
    title: "IncidentReport",
    type: "object",
    properties: fields.reduce((acc, f) => {
      acc[f.name] = {
        type: f.type === "list[str]" ? "array" : f.type === "int" ? "integer" : f.type === "float" ? "number" : f.type,
        description: f.description,
      };
      return acc;
    }, {} as any),
    required: fields.filter((f) => f.required).map((f) => f.name),
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm overflow-hidden transition-colors">
      {/* Header */}
      <div className="p-5 md:p-6 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <FileJson className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                Pydantic & JSON Schema Visualizer
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                  Type Safety
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Configure schema fields and observe how Python type hints convert into enforceable JSON Schema for LLMs
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setFields(DEFAULT_FIELDS);
              setValidationResult(null);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-xs font-mono text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>
      </div>

      {/* Main Body */}
      <div className="p-5 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Fields Configuration (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
            <span>Model Field Schema</span>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400">
              {fields.length} Fields Defined
            </span>
          </div>

          <div className="space-y-2.5">
            {fields.map((f, idx) => (
              <div
                key={f.name}
                className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-slate-900 dark:text-white">
                    {f.name}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                    {f.type}
                  </span>
                </div>

                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {f.description}
                </p>

                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={() => toggleFieldRequired(idx)}
                    className={`text-[10px] font-mono px-2 py-0.5 rounded flex items-center gap-1 transition ${
                      f.required
                        ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold"
                        : "bg-slate-200 dark:bg-slate-800 text-slate-500"
                    }`}
                  >
                    <Check className="w-3 h-3" />
                    {f.required ? "Required" : "Optional"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleTestParse}
            disabled={isValidating}
            className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold transition flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>{isValidating ? "Validating Output..." : "Test Model Output Validation"}</span>
          </button>
        </div>

        {/* Right: Code Views & Validation Result (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
            <button
              onClick={() => setActiveTab("pydantic")}
              className={`text-xs font-mono px-3 py-1.5 rounded-lg transition ${
                activeTab === "pydantic"
                  ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold"
                  : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              Pydantic Model
            </button>
            <button
              onClick={() => setActiveTab("json_schema")}
              className={`text-xs font-mono px-3 py-1.5 rounded-lg transition ${
                activeTab === "json_schema"
                  ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold"
                  : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              JSON Schema Spec
            </button>
            <button
              onClick={() => setActiveTab("langchain")}
              className={`text-xs font-mono px-3 py-1.5 rounded-lg transition ${
                activeTab === "langchain"
                  ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold"
                  : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              with_structured_output
            </button>
          </div>

          {/* Code Body */}
          <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs border border-slate-800 overflow-x-auto min-h-[220px]">
            {activeTab === "pydantic" && <pre className="text-emerald-300">{pydanticCode}</pre>}
            {activeTab === "json_schema" && (
              <pre className="text-sky-300">{JSON.stringify(jsonSchema, null, 2)}</pre>
            )}
            {activeTab === "langchain" && (
              <pre className="text-purple-300">{`from langchain_openai import ChatOpenAI

llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)

# Bind Pydantic schema to LLM
structured_llm = llm.with_structured_output(IncidentReport)

# Guaranteed typed Python object returned!
report: IncidentReport = structured_llm.invoke("Server crashed during flash sale due to Redis lag.")

print(report.summary)
print(report.confidence)`}</pre>
            )}
          </div>

          {/* Validation Result Box */}
          {validationResult && (
            <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-950 dark:text-emerald-200 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold font-mono">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Validated Runtime Object (Zero Parsing Errors!)
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 text-emerald-400 font-mono text-[11px] overflow-x-auto">
                <pre>{JSON.stringify(validationResult.parsedObject, null, 2)}</pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
