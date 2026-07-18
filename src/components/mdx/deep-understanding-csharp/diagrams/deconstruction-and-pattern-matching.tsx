"use client";

import { DcsOfficialLab } from "./official-lab";

const deconstructionCases = [
  { label: "tuple", fields: [["producer", "Tuple positions"], ["binding", "var (id, total) binds by arity and position"]] },
  { label: "instance", fields: [["producer", "Accessible instance Deconstruct(out ..., out ...)"], ["binding", "Compiler chooses a matching output shape"]] },
  { label: "extension", fields: [["producer", "Extension Deconstruct for an existing type"], ["binding", "Adds a consumer view without changing the original type"]] },
  { label: "discard", fields: [["producer", "Any matching shape"], ["binding", "_ explicitly ignores an output while preserving arity"]] },
] as const;

const patternCases = [
  { label: "constant", fields: [["test", "value is null / value is 0"], ["binding", "No new typed variable is required"]] },
  { label: "type", fields: [["test", "value is Order order"], ["binding", "Success narrows and binds order; null never matches a type pattern"]] },
  { label: "var", fields: [["test", "value is var observed"], ["binding", "Always matches and captures the current value, including null"]] },
  { label: "guard", fields: [["test", "case Order o when o.Total > 0"], ["binding", "Type match happens before the boolean guard"]] },
] as const;

const switchCases = [
  { label: "specific first", fields: [["order", "Derived/guarded case before broad base case"], ["outcome", "The intended specialized branch remains reachable"]] },
  { label: "broad first", fields: [["order", "Base or var case before a specific case"], ["outcome", "Later branch can be subsumed or rejected as unreachable"]], alert: "Switch statement pattern cases are ordered decision rules, not an unordered type table." },
  { label: "null case", fields: [["order", "Explicit case null"], ["outcome", "Null is handled separately from type patterns"]] },
  { label: "default", fields: [["order", "Final fallback"], ["outcome", "Unknown runtime values receive an explicit policy"]] },
] as const;

export function DcsDeconstructionProtocolLab() {
  return <DcsOfficialLab cases={deconstructionCases.map((item) => ({ ...item, fields: [...item.fields] }))} caption="Deconstruction is a binding protocol: producer shape, output arity, and consumer names are separate." tone="violet" />;
}

export function DcsPatternSemanticsLab() {
  return <DcsOfficialLab cases={patternCases.map((item) => ({ ...item, fields: [...item.fields] }))} caption="C# 7 patterns combine a test with optional binding; each form has distinct null behavior." tone="emerald" />;
}

export function DcsSwitchDecisionLab() {
  return <DcsOfficialLab cases={switchCases.map((item) => ({ ...item, fields: [...item.fields] }))} caption="Pattern switch correctness depends on case order, guards, null policy, and fallback coverage." tone="rose" />;
}
