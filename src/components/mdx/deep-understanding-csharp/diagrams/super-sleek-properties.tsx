"use client";

import { DcsOfficialLab, type OfficialLabCase } from "./official-lab";

const historyCases: OfficialLabCase[] = [
  { label: "manual", fields: [["source", "explicit field and accessors"], ["state", "developer owns storage"], ["contract", "validation/computation possible"], ["cost", "more ceremony"]] },
  { label: "auto C# 3", fields: [["source", "get; set;"], ["state", "compiler backing field"], ["contract", "mutable property surface"], ["cost", "no accessor body"]] },
  { label: "getter-only C# 6", fields: [["source", "get; initialized in ctor/initializer"], ["state", "readonly-like backing field"], ["contract", "external mutation blocked"], ["cost", "referenced object may still mutate"]] },
  { label: "initializer C# 6", fields: [["source", "property = expression"], ["state", "assignment before constructor body"], ["contract", "shared default across constructors"], ["cost", "order and failure still matter"]] },
];

export function DcsPropertyHistoryLab() {
  return <DcsOfficialLab cases={historyCases} tone="cyan" initial={2} caption="Property演进逐步减少storage ceremony，但mutability与initialization order仍由contract决定。" />;
}

const expressionCases: OfficialLabCase[] = [
  { label: "method", fields: [["shape", "M() => expression"], ["return", "expression result or void expression"], ["good fit", "one obvious operation"], ["reject", "multiple steps/fault cleanup"]] },
  { label: "property", fields: [["shape", "P => expression"], ["return", "computed on every access"], ["good fit", "cheap deterministic value"], ["reject", "hidden I/O/allocation"]] },
  { label: "indexer", fields: [["shape", "this[i] => expression"], ["return", "computed element"], ["good fit", "simple bounds/delegation"], ["reject", "complex mutation"]] },
  { label: "operator", fields: [["shape", "operator +(a,b) => expression"], ["return", "new value"], ["good fit", "pure value semantics"], ["reject", "surprising side effects"]] },
];

export function DcsExpressionBodyLab() {
  return <DcsOfficialLab cases={expressionCases} tone="violet" caption="Expression body是单表达式member syntax；它不缓存property，也不自动保证pure或cheap。" />;
}

const designCases: OfficialLabCase[] = [
  { label: "public data", fields: [["need", "stable API with future validation"], ["choose", "property, not public field"], ["proof", "consumer compiles against accessor"], ["evolution", "body can be added later"]] },
  { label: "immutable ref", fields: [["need", "reference cannot be reassigned externally"], ["choose", "getter-only auto property"], ["proof", "all constructors establish value"], ["evolution", "deep immutability assessed separately"]] },
  { label: "computed", fields: [["need", "derive cheap value from current state"], ["choose", "expression-bodied getter"], ["proof", "repeat access benchmark/side-effect test"], ["evolution", "promote to method if expensive"]] },
  { label: "validated", fields: [["need", "reject invalid mutation"], ["choose", "full property/private setter/domain method"], ["proof", "invariant and failure tests"], ["evolution", "do not hide business command in setter"]] },
];

export function DcsPropertyDesignLab() {
  return <DcsOfficialLab cases={designCases} tone="emerald" caption="选择property form时先写mutability、cost、validation和evolution contract，再追求source简洁。" />;
}
