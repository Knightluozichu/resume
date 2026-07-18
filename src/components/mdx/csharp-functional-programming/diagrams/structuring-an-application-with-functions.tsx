"use client";

import { CfpOfficialLab } from "./official-lab";

const applicationCases = [
  { label: "partial", fields: [["original", "(Config, Request) -> Response"], ["result", "Fix Config to obtain Request -> Response"]] },
  { label: "currying", fields: [["original", "(A, B, C) -> R"], ["result", "A -> B -> C -> R"]] },
  { label: "method group", fields: [["original", "Overloaded C# method"], ["result", "May need explicit delegate target before partial application"]] },
  { label: "closure", fields: [["original", "Captured dependency"], ["result", "Specialized function; lifetime follows the closure"]] },
] as const;

const apiCases = [
  { label: "dependency first", fields: [["parameters", "Clock, store, policy, then request"], ["composition", "Composition root fixes stable dependencies"]] },
  { label: "data first", fields: [["parameters", "Request before dependencies"], ["composition", "Partial application produces awkward per-request factories"]] },
  { label: "overload", fields: [["parameters", "Same method name, multiple shapes"], ["composition", "Inference can fail; adapter gives one explicit signature"]] },
  { label: "named function", fields: [["parameters", "One domain-specific delegate"], ["composition", "Workflow reads at a consistent abstraction level"]] },
] as const;

const foldCases = [
  { label: "sum", fields: [["seed", "0"], ["step", "(total, item) -> new total"]] },
  { label: "state", fields: [["seed", "Initial domain state"], ["step", "Apply event/command result to next state"]] },
  { label: "compose", fields: [["seed", "Identity function"], ["step", "Combine functions into one pipeline"]] },
  { label: "empty", fields: [["seed", "Defines result for no elements"], ["step", "Without seed, empty behavior is partial"]] },
] as const;

export function CfpApplicationShapeLab() { return <CfpOfficialLab cases={applicationCases} caption="Partial application fixes arguments; currying changes a multi-argument function into nested single-argument functions." tone="violet" />; }
export function CfpPartialFriendlyApiLab() { return <CfpOfficialLab cases={apiCases} caption="Parameter order and explicit delegate shapes decide whether application wiring is natural or inference-heavy." tone="cyan" />; }
export function CfpFoldArchitectureLab() { return <CfpOfficialLab cases={foldCases} caption="Fold reduces a list by making the seed and state transition explicit, including the empty case." tone="emerald" />; }
