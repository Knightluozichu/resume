"use client";

import { DcsOfficialLab, type OfficialLabCase } from "./official-lab";

const constructionCases: OfficialLabCase[] = [
  { label: "auto property", fields: [["source", "get/set without explicit field"], ["compiler", "generated backing field and accessors"], ["type", "declared property contract remains"], ["risk", "mutable public setter may weaken invariant"]] },
  { label: "implicit local", fields: [["source", "var from initializer"], ["compiler", "exact static type inferred"], ["type", "not dynamic and never typeless"], ["risk", "opaque method name can hide important type"]] },
  { label: "initializer", fields: [["source", "member/Add assignments after construction"], ["compiler", "ordered calls in one expression"], ["type", "constructor still runs first"], ["risk", "partial mutation if later assignment fails"]] },
  { label: "anonymous", fields: [["source", "new { Name, Total }"], ["compiler", "internal immutable structural type"], ["type", "property names/types define equality"], ["risk", "not a public contract across assemblies"]] },
];

export function DcsCsharp3ConstructionLab() {
  return <DcsOfficialLab cases={constructionCases} tone="cyan" caption="C# 3减少data-shaping ceremony，但每种syntax仍有明确generated members、order和scope。" />;
}

const behaviorCases: OfficialLabCase[] = [
  { label: "lambda delegate", fields: [["target", "Func<T, bool>"], ["output", "compiled method/delegate"], ["binding", "normal CLR execution"], ["capture", "closure may retain variable storage"]] },
  { label: "expression tree", fields: [["target", "Expression<Func<T, bool>>"], ["output", "object graph describing code"], ["binding", "provider inspects/translates nodes"], ["capture", "captured values become expression members/constants"]] },
  { label: "extension", fields: [["target", "receiver static type plus namespace"], ["output", "static method call"], ["binding", "compile-time candidate resolution"], ["capture", "no virtual dispatch; instance member wins"]] },
  { label: "overload", fields: [["target", "delegate vs expression candidates"], ["output", "selected method shapes lambda"], ["binding", "overload resolution before execution"], ["capture", "ambiguous signatures require explicit type"]] },
];

export function DcsLambdaBindingLab() {
  return <DcsOfficialLab cases={behaviorCases} tone="violet" initial={1} caption="同一lambda text可变成delegate或expression tree，取决于target type与overload resolution。" />;
}

const queryCases: OfficialLabCase[] = [
  { label: "from/where", fields: [["query", "from x in source where p"], ["mapping", "source.Where(x => p)"], ["execution", "deferred for standard operators"], ["proof", "expand method chain and count enumeration"]] },
  { label: "select", fields: [["query", "select new { ... }"], ["mapping", "Select projection"], ["execution", "per element on enumeration/provider"], ["proof", "inspect output type/expression"]] },
  { label: "join/group", fields: [["query", "relational query clauses"], ["mapping", "Join/GroupJoin/GroupBy calls"], ["execution", "operator/provider-specific buffering"], ["proof", "check generated command and memory"]] },
  { label: "LINQ result", fields: [["query", "composed operator pipeline"], ["mapping", "Enumerable or Queryable family"], ["execution", "terminal operator materializes/aggregates"], ["proof", "record source static type and terminal count"]] },
];

export function DcsQueryTranslationLab() {
  return <DcsOfficialLab cases={queryCases} tone="emerald" caption="Query expression映射到operator calls；source static type和terminal决定真正执行引擎与时机。" />;
}
