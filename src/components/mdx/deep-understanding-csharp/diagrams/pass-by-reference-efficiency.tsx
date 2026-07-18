"use client";

import { DcsOfficialLab } from "./official-lab";

const aliasCases = [
  { label: "value local", fields: [["storage", "A copy of the element value"], ["mutation", "Changes the local copy only"]] },
  { label: "ref local", fields: [["storage", "Alias to the original element storage"], ["mutation", "Writes through to the collection/array slot"]] },
  { label: "ref return", fields: [["storage", "Caller receives an alias selected by callee"], ["mutation", "Allowed only when returned reference is writable and lifetime-safe"]] },
  { label: "ref readonly", fields: [["storage", "Read-only alias to original storage"], ["mutation", "No write through this alias; receiver copies may still matter"]] },
] as const;

const copyCases = [
  { label: "by value", fields: [["call boundary", "Whole struct value is copied conceptually"], ["best question", "Is the measured copy cost material?"]] },
  { label: "in variable", fields: [["call boundary", "Read-only by-reference parameter can alias a variable"], ["best question", "Are members readonly so defensive copies are avoided?"]] },
  { label: "in expression", fields: [["call boundary", "Compiler may create a temporary for the argument"], ["best question", "Did syntax actually remove a copy on this call site?"]] },
  { label: "readonly struct", fields: [["call boundary", "Type promises instance state is not mutated"], ["best question", "Can compiler safely call members without defensive receiver copies?"]] },
] as const;

const lifetimeCases = [
  { label: "array span", fields: [["referent", "Managed array storage"], ["escape", "Span view remains stack-only even though storage is heap-backed"]] },
  { label: "stackalloc", fields: [["referent", "Current stack frame memory"], ["escape", "Cannot be returned or captured beyond its safe scope"]] },
  { label: "field in class", fields: [["referent", "Would require a ref-like value on the heap"], ["escape", "Rejected for ordinary class fields"]], alert: "Ref-like restrictions prevent a view from outliving or being detached from safe storage." },
  { label: "async capture", fields: [["referent", "State would cross suspension"], ["escape", "C# 7.2 ref-like values cannot cross await/yield boundaries"]] },
] as const;

export function DcsAliasMutationLab() {
  return <DcsOfficialLab cases={aliasCases.map((item) => ({ ...item, fields: [...item.fields] }))} caption="Value assignment copies a value; ref assignment creates an alias to a storage location." tone="rose" />;
}

export function DcsCopyCostLab() {
  return <DcsOfficialLab cases={copyCases.map((item) => ({ ...item, fields: [...item.fields] }))} caption="in and readonly can remove copies only when call-site shape and member semantics support it." tone="amber" />;
}

export function DcsRefLifetimeLab() {
  return <DcsOfficialLab cases={lifetimeCases.map((item) => ({ ...item, fields: [...item.fields] }))} caption="Ref safety is a lifetime proof: aliases and ref-like values cannot escape their referents." tone="violet" />;
}
