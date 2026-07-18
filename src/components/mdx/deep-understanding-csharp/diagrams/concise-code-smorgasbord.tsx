"use client";

import { DcsOfficialLab } from "./official-lab";

const scopeCases = [
  { label: "explicit", fields: [["lookup", "Math.Sqrt(value) keeps the owner visible"], ["review signal", "Dependency and collision risk are local"]] },
  { label: "using static", fields: [["lookup", "Sqrt(value) imports eligible static members"], ["review signal", "Shorter expression, wider unqualified lookup"]] },
  { label: "index init", fields: [["construction", "[key] = value invokes the indexer during initialization"], ["failure", "A setter or duplicate-key exception aborts the expression"]] },
  { label: "nested init", fields: [["construction", "Existing child is mutated without assigning a new child"], ["precondition", "The child instance must already be non-null"]] },
] as const;

const nullCases = [
  { label: "receiver null", fields: [["expression", "customer?.Address.City"], ["result", "The conditional chain produces null without member access"]] },
  { label: "member null", fields: [["expression", "customer?.Address?.City"], ["result", "Each nullable hop needs its own conditional access"]] },
  { label: "parentheses", fields: [["expression", "(customer?.Address).City"], ["result", "The conditional chain ends before City"]], alert: "Parentheses can resume ordinary member access and reintroduce NullReferenceException." },
  { label: "delegate", fields: [["expression", "Changed?.Invoke(this, args)"], ["result", "The delegate snapshot is invoked only when non-null"]] },
] as const;

const filterCases = [
  { label: "type miss", fields: [["catch candidate", "Exception type is not compatible"], ["runtime action", "Continue searching without evaluating the filter"]] },
  { label: "filter false", fields: [["catch candidate", "Type matches, diagnostic predicate returns false"], ["runtime action", "Continue search; this handler does not own the failure"]] },
  { label: "filter true", fields: [["catch candidate", "Type and predicate match"], ["runtime action", "Select handler, then unwind and execute its body"]] },
  { label: "filter throws", fields: [["catch candidate", "Predicate itself throws"], ["runtime action", "Filter failure is treated as false"]], alert: "Keep filters side-effect-light and independently observable." },
] as const;

export function DcsScopeAndInitializerLab() {
  return <DcsOfficialLab cases={scopeCases.map((item) => ({ ...item, fields: [...item.fields] }))} caption="Scope reduction and initializer syntax move different risks; inspect lookup and construction separately." tone="violet" />;
}

export function DcsNullConditionalFlowLab() {
  return <DcsOfficialLab cases={nullCases.map((item) => ({ ...item, fields: [...item.fields] }))} caption="Conditional access propagates only through the syntactic chain that remains conditional." tone="cyan" />;
}

export function DcsExceptionFilterLab() {
  return <DcsOfficialLab cases={filterCases.map((item) => ({ ...item, fields: [...item.fields] }))} caption="A filter chooses ownership before the selected catch body runs." tone="rose" />;
}
