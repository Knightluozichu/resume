"use client";

import { CtcOfficialLab } from "./official-lab";

const typeCases = [
  { label: "class", fields: [["semantics", "Reference identity and nullable reference"], ["best fit", "Entity, service, shared polymorphic object"]] },
  { label: "struct", fields: [["semantics", "Value copy and inline storage"], ["best fit", "Small immutable value with clear default"]] },
  { label: "interface", fields: [["semantics", "Capability contract"], ["best fit", "Substitution across unrelated implementations"]] },
  { label: "enum", fields: [["semantics", "Named integral closed-ish set"], ["best fit", "Stable finite codes with unknown-value policy"]] },
] as const;

const dispatchCases = [
  { label: "overload", fields: [["selection", "Compile-time candidate resolution"], ["input", "Static argument types"]] },
  { label: "virtual", fields: [["selection", "Runtime override dispatch"], ["input", "Actual receiver type"]] },
  { label: "hide", fields: [["selection", "Static member lookup"], ["input", "Receiver expression static type"]] },
  { label: "interface", fields: [["selection", "Runtime implementation dispatch"], ["input", "Interface map and actual type"]] },
] as const;

const genericCases = [
  { label: "constraint", fields: [["guarantee", "Operations available for T"], ["failure", "Invalid type argument rejected at compile time"]] },
  { label: "covariant", fields: [["guarantee", "T appears in output positions"], ["failure", "Input use is prohibited"]] },
  { label: "contravariant", fields: [["guarantee", "T appears in input positions"], ["failure", "Output use is prohibited"]] },
  { label: "invariant", fields: [["guarantee", "T used both ways"], ["failure", "No generic reference conversion"]] },
] as const;

export function CtcTypeChoiceLab() { return <CtcOfficialLab cases={typeCases} caption="Choose class, struct, interface, or enum from identity, copy, capability, and versioning semantics." tone="emerald" />; }
export function CtcDispatchResolutionLab() { return <CtcOfficialLab cases={dispatchCases} caption="Overload, virtual dispatch, hiding, and interface dispatch resolve at different phases." tone="violet" />; }
export function CtcGenericContractLab() { return <CtcOfficialLab cases={genericCases} caption="Constraints define capabilities; variance defines safe direction of generic reference conversion." tone="cyan" />; }
