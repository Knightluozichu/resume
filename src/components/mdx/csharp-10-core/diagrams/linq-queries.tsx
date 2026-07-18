"use client";

import { CtcOfficialLab } from "./official-lab";

const syntaxCases = [
  { label: "fluent", fields: [["shape", "Method chain with lambdas"], ["strength", "All operators and explicit receiver types"]] },
  { label: "query", fields: [["shape", "from/where/select clauses"], ["strength", "Readable joins and intermediate range variables"]] },
  { label: "mixed", fields: [["shape", "Query then fluent-only operators"], ["strength", "Use each syntax where clearest"]] },
  { label: "translated", fields: [["shape", "Compiler maps clauses to methods"], ["strength", "Binding follows source static type"]] },
] as const;

const executionCases = [
  { label: "define", fields: [["time", "Build query recipe"], ["effect", "Usually no source enumeration"]] },
  { label: "enumerate", fields: [["time", "GetEnumerator/MoveNext"], ["effect", "Source read and lambdas execute"]] },
  { label: "repeat", fields: [["time", "Enumerate again"], ["effect", "Source and captured values may differ"]] },
  { label: "materialize", fields: [["time", "ToList/ToArray"], ["effect", "Snapshot now; allocation and full evaluation"]] },
] as const;

const providerCases = [
  { label: "IEnumerable", fields: [["program", "Delegates execute locally"], ["gate", "Enumeration count and object code"]] },
  { label: "IQueryable", fields: [["program", "Expression tree interpreted by provider"], ["gate", "Translation and generated command"]] },
  { label: "AsEnumerable", fields: [["program", "Switch subsequent operators to local"], ["gate", "Data transfer boundary"]] },
  { label: "EF Core", fields: [["program", "Query translated and tracked/no-tracked"], ["gate", "SQL, parameters, round trips, consistency"]] },
] as const;

export function CtcQuerySyntaxLab() { return <CtcOfficialLab cases={syntaxCases} caption="Fluent, query, mixed, and translated forms are syntactic views over operator binding." tone="cyan" />; }
export function CtcDeferredExecutionLab() { return <CtcOfficialLab cases={executionCases} caption="A LINQ query is often a recipe whose effects occur at enumeration and repeat on reevaluation." tone="amber" />; }
export function CtcQueryProviderLab() { return <CtcOfficialLab cases={providerCases} caption="IEnumerable executes delegates locally; IQueryable providers interpret expression trees remotely or differently." tone="violet" />; }
