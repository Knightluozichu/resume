"use client";

import { LuaOfficialLab } from "./official-lab";

const partCases = [
  { label: "The Basics", fields: [["Chapters", "1-8"], ["Core", "Chunks, values, tables, functions, I/O, and control gaps"], ["Proof", "Run the Eight-Queen program and explain its invariant"]] },
  { label: "Real Programming", fields: [["Chapters", "9-19"], ["Core", "Closures, patterns, data/time/bits, serialization, modules, iterators"], ["Proof", "Build frequency and Markov programs with deterministic evidence"]] },
  { label: "Lua-isms", fields: [["Chapters", "20-26"], ["Core", "Metatables, objects, environments, GC, coroutines, reflection"], ["Proof", "Design explicit dispatch, lifetime, and scheduler ownership"]] },
  { label: "The C API", fields: [["Chapters", "27-33"], ["Core", "Virtual stack, extensions, userdata, resources, threads, and states"], ["Proof", "State every stack delta, owner, error, and cleanup path"]], alert: "The book has 33 official chapters in four parts. The map and final review are navigation pages, not replacements for any official chapter." },
] as const;

const dependencyCases = [
  { label: "Value", fields: [["Question", "What value exists and who owns it?"], ["Depends on", "Types, numbers, strings, tables"], ["Unlocks", "Stable representations and boundary checks"]] },
  { label: "Control", fields: [["Question", "Which function/frame resumes next?"], ["Depends on", "Functions, closures, iterators, errors"], ["Unlocks", "Backtracking, modules, and coroutines"]] },
  { label: "Protocol", fields: [["Question", "What does each boundary consume and produce?"], ["Depends on", "Metamethods, environments, scheduler requests"], ["Unlocks", "Composable Lua systems"]] },
  { label: "Native", fields: [["Question", "Which stack, state, and resource owner is active?"], ["Depends on", "All three previous layers"], ["Unlocks", "Correct C embedding and parallel states"]], alert: "The dependency path is cumulative. The C API is not a separate syntax appendix; it reuses Lua value, control, and protocol semantics through a virtual stack." },
] as const;

const gateCases = [
  { label: "Predict", fields: [["Action", "Write the expected values, stack, state, or owner before running"], ["Evidence", "A falsifiable trace or invariant"], ["Failure", "Vague intuition without an observable result"]] },
  { label: "Execute", fields: [["Action", "Run the smallest complete example"], ["Evidence", "Output, status, stack top, or known count"], ["Failure", "Reading code without testing boundary cases"]] },
  { label: "Perturb", fields: [["Action", "Inject nil, wrong type, error, timeout, early exit, or OOM"], ["Evidence", "Same invariant holds on non-happy paths"], ["Failure", "A demo that only survives ideal input"]] },
  { label: "Explain", fields: [["Action", "Reconstruct the mechanism without the page"], ["Evidence", "Diagram, code, and independent test agree"], ["Failure", "Memorized API names with no ownership model"]], alert: "A chapter is complete only when prediction, execution, perturbation, and explanation produce consistent evidence." },
] as const;

export function PilBookPartMapLab() {
  return <LuaOfficialLab cases={partCases} caption="Programming in Lua 4e progresses through four parts and all 33 official chapters." tone="cyan" />;
}

export function PilLearningDependencyLab() {
  return <LuaOfficialLab cases={dependencyCases} caption="Value, control, protocol, and native layers form the cumulative learning dependency path." tone="violet" />;
}

export function PilStudyGateLab() {
  return <LuaOfficialLab cases={gateCases} caption="Prediction, execution, perturbation, and explanation turn each chapter into verifiable mastery." tone="emerald" />;
}

export const LupLearningMapDiagram = PilBookPartMapLab;
