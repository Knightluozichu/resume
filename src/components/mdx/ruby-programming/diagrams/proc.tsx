"use client";

import { RubyOfficialLab } from "./official-lab";

const callableCases = [
  { label: "Block", fields: [["Creation", "Attached to one method call"], ["Object", "Implicit unless captured with &"], ["Use", "Immediate control inversion/yield"]] },
  { label: "Proc.new", fields: [["Creation", "Proc.new { ... }"], ["Arity", "Lenient positional argument handling"], ["Return", "May attempt non-local return from defining method"]] },
  { label: "lambda", fields: [["Creation", "lambda { } or ->(...) { }"], ["Arity", "Strict like a method"], ["Return", "Returns from lambda call only"]] },
  { label: "Method", fields: [["Creation", "object.method(:name)"], ["Arity", "Method signature"], ["Conversion", "to_proc for block passing"]] },
] as const;

const boundaryCases = [
  { label: "&block", fields: [["Direction", "Implicit block -> Proc parameter"], ["Use", "Store, forward, call later"], ["Cost", "Capture only when object semantics are needed"]] },
  { label: "&proc", fields: [["Direction", "Proc/to_proc -> method block"], ["Use", "Pass reusable callable to iterator"], ["Boundary", "Exactly one block channel"]] },
  { label: "to_proc", fields: [["Protocol", "Object returns a Proc"], ["Example", ":upcase.to_proc"], ["Risk", "Shorthand hides receiver/argument shape"]] },
  { label: "Closure", fields: [["Capture", "Lexical local bindings"], ["Lifetime", "Can retain object graph after scope exits"], ["Concurrency", "Shared mutable captures need synchronization"]] },
] as const;

const methodCases = [
  { label: "call", fields: [["Aliases", "call, [], .()"], ["Input", "Arguments/keywords by Ruby version"], ["Result", "Final expression or lambda-local return"]] },
  { label: "arity", fields: [["Result", "Required count or negative encoded optional/rest"], ["Use", "Diagnostics, not full schema"], ["Rule", "Invoke/tests remain authoritative"]] },
  { label: "parameters", fields: [["Result", "Kinds and optional names"], ["Use", "Introspection/documentation"], ["Boundary", "Does not encode value/domain semantics"]] },
  { label: "curry / compose", fields: [["Use", "Partial application and pipeline"], ["Boundary", "Arity and error propagation"], ["Rule", "Prefer named object when state/lifecycle grows"]], alert: "A callable's method list does not replace its behavioral protocol: arguments, result, effects, failures, and lifetime still need a contract." },
] as const;

export function RubyCallableKindsLab() {
  return <RubyOfficialLab cases={callableCases} caption="Block, Proc, lambda, and Method differ in object identity, arity, return control, and intended lifetime." tone="cyan" />;
}

export function RubyProcBoundaryLab() {
  return <RubyOfficialLab cases={boundaryCases} caption="&block, &proc, to_proc, and closure capture move behavior across invocation and lifetime boundaries." tone="violet" />;
}

export function RubyProcMethodsLab() {
  return <RubyOfficialLab cases={methodCases} caption="Calling, arity/parameter introspection, currying, and composition expose only part of a callable's complete protocol." tone="amber" />;
}
