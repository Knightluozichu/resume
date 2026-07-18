"use client";

import { CfpOfficialLab } from "./official-lab";

const purityCases = [
  { label: "pure", fields: [["inputs", "All dependencies are explicit values"], ["observation", "Same input yields the same result; no external mutation"]] },
  { label: "clock", fields: [["inputs", "Hidden DateTime.Now dependency"], ["observation", "Result changes without a visible argument"]] },
  { label: "write", fields: [["inputs", "Explicit values plus implicit database/logger"], ["observation", "Call changes the world and can fail independently"]] },
  { label: "random", fields: [["inputs", "Hidden RNG state"], ["observation", "Replay and tests cannot control generated values"]] },
] as const;

const concurrencyCases = [
  { label: "shared counter", fields: [["parallel action", "Read-modify-write the same mutable location"], ["result", "Interleavings can lose updates"]] },
  { label: "pure map", fields: [["parallel action", "Transform independent immutable inputs"], ["result", "Schedule does not change per-item outputs"]] },
  { label: "ordered effect", fields: [["parallel action", "Compute in parallel, commit through one owner"], ["result", "Pure work scales while effect order stays explicit"]] },
  { label: "cache", fields: [["parallel action", "Memoize a pure function"], ["result", "Optimization can preserve semantics with synchronized storage"]] },
] as const;

const testCases = [
  { label: "example", fields: [["test input", "A fixed value"], ["assertion", "Exact result with no setup"]] },
  { label: "property", fields: [["test input", "Generated domain values"], ["assertion", "A law holds over many cases"]] },
  { label: "effect shell", fields: [["test input", "Fake clock/store supplied at boundary"], ["assertion", "Effect commands and pure decisions are checked separately"]] },
  { label: "refactor", fields: [["test input", "Equivalent implementation"], ["assertion", "Substitution keeps observable behavior"]] },
] as const;

export function CfpPurityBoundaryLab() {
  return <CfpOfficialLab cases={purityCases} caption="Purity is about explicit inputs and observable effects, not about whether a function looks short." tone="amber" />;
}

export function CfpPurityConcurrencyLab() {
  return <CfpOfficialLab cases={concurrencyCases} caption="Pure transformations remove shared-write schedules from the semantic result; effects still need an owner." tone="rose" />;
}

export function CfpPurityTestabilityLab() {
  return <CfpOfficialLab cases={testCases} caption="Pure cores support example, property, and substitution tests while an effect shell is tested as a boundary protocol." tone="emerald" />;
}
