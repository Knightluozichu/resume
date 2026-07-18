"use client";

import { CfpOfficialLab } from "./official-lab";

const paradigmCases = [
  { label: "first-class", fields: [["program unit", "A function can be stored, passed, and returned"], ["design effect", "Behavior becomes an explicit dependency"]] },
  { label: "mutation", fields: [["program unit", "In-place state change is visible across aliases"], ["design effect", "Ordering and ownership become hidden inputs"]] },
  { label: "immutable", fields: [["program unit", "A transformation returns a new value"], ["design effect", "Old value remains a stable observation"]] },
  { label: "guarantee", fields: [["program unit", "Same explicit input and controlled effects"], ["design effect", "Reasoning, testing, and safe composition improve"]] },
] as const;

const functionCases = [
  { label: "method", fields: [["representation", "Named C# method"], ["boundary", "Becomes a value only through method-group conversion"]] },
  { label: "lambda", fields: [["representation", "Inline anonymous function"], ["boundary", "Target delegate/expression type and captured storage matter"]] },
  { label: "adapter", fields: [["representation", "Function that reshapes another function"], ["boundary", "Preserves core behavior while changing call contract"]] },
  { label: "factory", fields: [["representation", "Function returning a function"], ["boundary", "Configuration is captured into a specialized operation"]] },
] as const;

const hofCases = [
  { label: "setup", fields: [["duplicate", "Open connection, begin scope, configure context"], ["HOF role", "Own setup before invoking supplied operation"]] },
  { label: "execute", fields: [["duplicate", "Business action differs at each call site"], ["HOF role", "Receive behavior as a function argument"]] },
  { label: "teardown", fields: [["duplicate", "Dispose/rollback/close on every path"], ["HOF role", "Centralize cleanup with explicit ownership"]] },
  { label: "tradeoff", fields: [["duplicate", "Too many generic wrappers hide control flow"], ["HOF role", "Use only when lifecycle and semantics stay readable"]] },
] as const;

export function CfpParadigmBoundaryLab() {
  return <CfpOfficialLab cases={paradigmCases} caption="Functional style makes behavior and state transitions explicit enough to reason about as values." tone="emerald" />;
}

export function CfpFunctionRepresentationLab() {
  return <CfpOfficialLab cases={functionCases} caption="Methods, lambdas, adapters, and factories represent functions with different binding and capture boundaries." tone="cyan" />;
}

export function CfpHofLifecycleLab() {
  return <CfpOfficialLab cases={hofCases} caption="A lifecycle HOF removes duplication only when setup, behavior, teardown, and ownership remain visible." tone="violet" />;
}
