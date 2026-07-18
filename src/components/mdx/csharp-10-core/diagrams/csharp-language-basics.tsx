"use client";

import { CtcOfficialLab } from "./official-lab";

const storageCases = [
  { label: "value", fields: [["assignment", "Copies the value representation"], ["mutation", "One variable does not retarget another"]] },
  { label: "reference", fields: [["assignment", "Copies an object reference"], ["mutation", "Aliases observe object mutation"]] },
  { label: "ref", fields: [["assignment", "Aliases a storage location"], ["mutation", "Writes update the original variable"]] },
  { label: "array", fields: [["assignment", "Array object is a reference type"], ["mutation", "Elements have their own value/reference semantics"]] },
] as const;

const numericCases = [
  { label: "checked", fields: [["conversion", "Overflow throws for integral operation"], ["evidence", "Boundary values fail explicitly"]] },
  { label: "unchecked", fields: [["conversion", "Integral overflow wraps"], ["evidence", "Result follows fixed-width representation"]] },
  { label: "double", fields: [["conversion", "Binary floating-point"], ["evidence", "Many decimal fractions are approximate"]] },
  { label: "decimal", fields: [["conversion", "Base-10-oriented decimal arithmetic"], ["evidence", "Scale/rounding still require policy"]] },
] as const;

const flowCases = [
  { label: "expression", fields: [["role", "Produces a value"], ["gate", "Type, precedence, side effects"]] },
  { label: "statement", fields: [["role", "Controls execution"], ["gate", "Reachability and definite assignment"]] },
  { label: "namespace", fields: [["role", "Organizes names"], ["gate", "Using affects lookup, not deployment"]] },
  { label: "compile", fields: [["role", "Source -> metadata/IL"], ["gate", "SDK, LangVersion, references"]] },
] as const;

export function CtcStorageSemanticsLab() { return <CtcOfficialLab cases={storageCases} caption="Value, reference, ref, and array assignments copy different things and create different alias risks." tone="violet" />; }
export function CtcNumericBoundaryLab() { return <CtcOfficialLab cases={numericCases} caption="Numeric correctness depends on overflow, representation, rounding, and conversion policy." tone="amber" />; }
export function CtcSyntaxFlowLab() { return <CtcOfficialLab cases={flowCases} caption="Expressions, statements, namespaces, and compilation occupy different layers of a C# program." tone="cyan" />; }
