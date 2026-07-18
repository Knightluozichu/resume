"use client";

import { DcsOfficialLab } from "./official-lab";

const shapeCases = [
  { label: "literal", fields: [["source shape", "(id: 42, total: 9.5m)"], ["compile-time view", "Two positions with optional element names"]] },
  { label: "inferred names", fields: [["source shape", "(customerId, total)"], ["compile-time view", "Names can be inferred from simple variable/member expressions"]] },
  { label: "unnamed", fields: [["source shape", "(int, decimal)"], ["compile-time view", "Access remains Item1 and Item2"]] },
  { label: "eight items", fields: [["source shape", "Eight logical positions"], ["runtime view", "Nested ValueTuple Rest field represents positions beyond seven"]] },
] as const;

const conversionCases = [
  { label: "same types", fields: [["source", "(int x, string label)"], ["target", "(int id, string name): position-compatible; names do not drive conversion"]] },
  { label: "numeric widen", fields: [["source", "(int count, float ratio)"], ["target", "(long count, double ratio): element-wise implicit conversions"]] },
  { label: "name mismatch", fields: [["source", "Tuple literal names differ from target"], ["target", "Compiler can warn, but runtime values remain positional"]] },
  { label: "arity mismatch", fields: [["source", "Two elements"], ["target", "Three elements: no tuple conversion"]], alert: "Tuple conversion requires the same arity and a conversion at every position." },
] as const;

const ownershipCases = [
  { label: "private helper", fields: [["change owner", "One implementation and its nearby callers"], ["best fit", "Tuple keeps temporary composition lightweight"]] },
  { label: "public API", fields: [["change owner", "External source and binary consumers"], ["best fit", "A nominal type carries docs, invariants, versioning, and behavior"]] },
  { label: "dictionary key", fields: [["change owner", "Equality and mutability assumptions"], ["best fit", "Tuple can fit when all element semantics are explicit and stable"]] },
  { label: "domain value", fields: [["change owner", "Business meaning and validation"], ["best fit", "Dedicated type prevents position-based misuse"]] },
] as const;

export function DcsTupleShapeLab() {
  return <DcsOfficialLab cases={shapeCases.map((item) => ({ ...item, fields: [...item.fields] }))} caption="Tuple syntax supplies a compile-time shape over a positional ValueTuple representation." tone="emerald" />;
}

export function DcsTupleConversionLab() {
  return <DcsOfficialLab cases={conversionCases.map((item) => ({ ...item, fields: [...item.fields] }))} caption="Arity and element conversions control compatibility; element names mainly help source readers." tone="cyan" />;
}

export function DcsTupleOwnershipLab() {
  return <DcsOfficialLab cases={ownershipCases.map((item) => ({ ...item, fields: [...item.fields] }))} caption="Choose tuples by ownership radius and semantic stability, not by keystroke count alone." tone="amber" />;
}
