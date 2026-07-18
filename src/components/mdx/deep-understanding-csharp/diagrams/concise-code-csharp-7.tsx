"use client";

import { DcsOfficialLab } from "./official-lab";

const localCases = [
  { label: "local eager", fields: [["outer call", "Validate arguments before returning a sequence/task"], ["helper", "Local iterator/async function performs deferred work"]] },
  { label: "lambda", fields: [["outer call", "Delegate allocation/capture depends on usage"], ["helper", "No overloads; recursion and attributes historically differ"]] },
  { label: "out variable", fields: [["outer call", "Declaration sits at the TryParse call"], ["helper", "Scope follows the enclosing statement/block, not only the true branch"]] },
  { label: "discard", fields: [["outer call", "out _ ignores a result intentionally"], ["helper", "No named local should be read later"]] },
] as const;

const expressionCases = [
  { label: "throw expr", fields: [["compact form", "value ?? throw new ..."], ["contract", "Failure remains explicit inside an expression"]] },
  { label: "default literal", fields: [["compact form", "T target supplies the type of default"], ["contract", "Ambiguous contexts still require default(T)"]] },
  { label: "digit separator", fields: [["compact form", "1_000_000 or 0b_1010"], ["contract", "Separators improve reading but do not alter numeric value"]] },
  { label: "tuple compare", fields: [["compact form", "C# 7.3 tuple ==/!= checks elements"], ["contract", "Version-specific minor feature; element semantics still matter"]] },
] as const;

const apiCases = [
  { label: "named argument", fields: [["caller", "Uses parameter name as source-level contract"], ["evolution", "Renaming parameter can break recompilation even when binary signature is stable"]] },
  { label: "nontrailing", fields: [["caller", "C# 7.2 permits in-position named arguments before later positional ones"], ["evolution", "Call order must still match parameter positions"]] },
  { label: "private protected", fields: [["caller", "Accessible only to derived types within the same assembly"], ["evolution", "Intersection of protected and internal, not their union"]] },
  { label: "7.3 minor", fields: [["caller", "Feature availability depends on LangVersion/compiler"], ["evolution", "Build matrix must prove the configured version"]] },
] as const;

export function DcsLocalFunctionBoundaryLab() {
  return <DcsOfficialLab cases={localCases.map((item) => ({ ...item, fields: [...item.fields] }))} caption="Local functions can separate eager validation from deferred execution while keeping implementation nearby." tone="emerald" />;
}

export function DcsExpressionConcisionLab() {
  return <DcsOfficialLab cases={expressionCases.map((item) => ({ ...item, fields: [...item.fields] }))} caption="Concise expressions preserve a contract only when target typing and failure paths remain explicit." tone="cyan" />;
}

export function DcsApiSurfaceLab() {
  return <DcsOfficialLab cases={apiCases.map((item) => ({ ...item, fields: [...item.fields] }))} caption="Call syntax and accessibility modifiers are source contracts with precise version and ownership rules." tone="violet" />;
}
