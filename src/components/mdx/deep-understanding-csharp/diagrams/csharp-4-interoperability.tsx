"use client";

import { DcsOfficialLab, type OfficialLabCase } from "./official-lab";

const bindingCases: OfficialLabCase[] = [
  { label: "static", fields: [["input", "compile-time receiver and arguments"], ["binder", "C# compiler"], ["cache", "normal emitted call"], ["failure", "diagnostic before execution"]] },
  { label: "dynamic", fields: [["input", "runtime receiver/argument types"], ["binder", "C# runtime binder via DLR call site"], ["cache", "rules cached by observed shape"], ["failure", "RuntimeBinderException"]] },
  { label: "object", fields: [["input", "static type object"], ["binder", "compiler sees only object members"], ["cache", "none beyond normal dispatch"], ["failure", "cast/reflection required for unknown member"]] },
  { label: "reflection", fields: [["input", "member metadata/name"], ["binder", "application reflection API"], ["cache", "application may cache metadata/delegate"], ["failure", "lookup/invocation wrappers"]] },
];

export function DcsBindingTimeLab() {
  return <DcsOfficialLab cases={bindingCases} tone="violet" initial={1} caption="Static、dynamic、object和reflection的关键差异是binding input、时机、cache与failure surface。" />;
}

const argumentCases: OfficialLabCase[] = [
  { label: "optional", fields: [["declaration", "parameter has compile-time default"], ["call", "omitted argument is baked by caller"], ["interop", "reduces ceremony for versioned APIs"], ["risk", "changing default does not update old callers"]] },
  { label: "named", fields: [["declaration", "parameter names become source contract"], ["call", "arguments reordered by name"], ["interop", "clarifies long COM signatures"], ["risk", "renaming parameter can break source callers"]] },
  { label: "COM", fields: [["declaration", "metadata exposes optional/ref/indexed members"], ["call", "compiler omits ref and embeds interop types where allowed"], ["interop", "less primary interop assembly friction"], ["risk", "runtime COM behavior remains external"]] },
  { label: "version", fields: [["declaration", "library evolves signature/default"], ["call", "old binary preserves emitted arguments"], ["interop", "compatibility needs explicit matrix"], ["risk", "source rebuild silently changes behavior"]] },
];

export function DcsArgumentInteropLab() {
  return <DcsOfficialLab cases={argumentCases} tone="cyan" caption="Optional、named与COM syntax减少call ceremony，却把default和parameter name纳入version contract。" />;
}

const varianceCases: OfficialLabCase[] = [
  { label: "covariant", fields: [["shape", "IEnumerable<out T>"], ["position", "T only produced"], ["conversion", "Derived sequence to Base sequence"], ["limit", "reference-type conversion only"]] },
  { label: "contravariant", fields: [["shape", "IComparer<in T>"], ["position", "T only consumed"], ["conversion", "Base comparer serves Derived"], ["limit", "cannot return T"]] },
  { label: "invariant", fields: [["shape", "List<T>"], ["position", "T both input and output"], ["conversion", "exact constructed type only"], ["limit", "mutable safety forbids covariance"]] },
  { label: "delegate", fields: [["shape", "Func<in T, out TResult>"], ["position", "input and output independently variant"], ["conversion", "safe reference substitutions"], ["limit", "method compatibility and generic variance are related but distinct"]] },
];

export function DcsVariancePositionLab() {
  return <DcsOfficialLab cases={varianceCases} tone="emerald" caption="Variance从T的输入/输出位置推导；mutable storage同时读写，因此保持invariant。" />;
}
