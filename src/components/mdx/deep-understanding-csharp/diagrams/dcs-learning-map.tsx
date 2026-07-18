"use client";

import { DcsOfficialLab } from "./official-lab";

const roadmapCases = [
  { label: "Part 1", fields: [["chapters", "1: Survival of the sharpest"], ["question", "How do language, platform, community, and this edition co-evolve?"]] },
  { label: "Part 2", fields: [["chapters", "2-7: C# 2 through C# 5"], ["question", "Which type, query, interop, and async foundations changed programming style?"]] },
  { label: "Part 3", fields: [["chapters", "8-10: C# 6"], ["question", "How can code become concise without hiding construction, text, null, or failure boundaries?"]] },
  { label: "Part 4", fields: [["chapters", "11-15: C# 7 and beyond"], ["question", "How do shapes, patterns, aliases, and preview features expand the type/execution model?"]] },
] as const;

const dependencyCases = [
  { label: "type pipeline", fields: [["foundation", "Generics, nullable values, inference, anonymous types"], ["later payoff", "LINQ, tuples, patterns, nullable references"]] },
  { label: "execution", fields: [["foundation", "Delegates, iterators, expression trees"], ["later payoff", "Async state machines, filters, async streams"]] },
  { label: "data shape", fields: [["foundation", "Initializers, properties, dynamic/interop"], ["later payoff", "Tuples, deconstruction, recursive patterns"]] },
  { label: "memory", fields: [["foundation", "Value/reference and generated-state reasoning"], ["later payoff", "in, readonly, ref returns, ref-like structs"]] },
] as const;

const evidenceCases = [
  { label: "outline", fields: [["input", "Manning fourth-edition identity and 15 chapter titles"], ["pass", "Every official chapter and first-level concept is mapped once"]] },
  { label: "semantics", fields: [["input", "One compiler/runtime boundary per concept cluster"], ["pass", "Prediction and executable evidence agree"]] },
  { label: "visual", fields: [["input", "Three chapter-specific state experiments"], ["pass", "Each exposes a different decision, transition, or failure"]] },
  { label: "practice", fields: [["input", "Normal, boundary, failure, and compatibility cases"], ["pass", "Reader can reproduce and explain outcomes"]] },
  { label: "version", fields: [["input", "Original C# 2-8 historical position plus modern note"], ["pass", "Later syntax is labeled and never rewrites book history"]] },
] as const;

export function DcsEditionRoadmapLab() {
  return <DcsOfficialLab cases={roadmapCases.map((item) => ({ ...item, fields: [...item.fields] }))} caption="The fourth edition advances through four parts and fifteen chapters, with each version building on earlier type and execution machinery." tone="cyan" />;
}

export function DcsVersionDependencyLab() {
  return <DcsOfficialLab cases={dependencyCases.map((item) => ({ ...item, fields: [...item.fields] }))} caption="Read vertically by language version, then revise horizontally by type, execution, data shape, and memory chains." tone="violet" />;
}

export function DcsStudyEvidenceLab() {
  return <DcsOfficialLab cases={evidenceCases.map((item) => ({ ...item, fields: [...item.fields] }))} caption="A chapter passes only when outline, semantics, visuals, practice, and version boundaries all have reproducible evidence." tone="emerald" />;
}
