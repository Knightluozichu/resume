"use client";

import { CtcOfficialLab } from "./official-lab";

const callableCases = [
  { label: "delegate", fields: [["contract", "Typed callable value"], ["risk", "Target lifetime and multicast return semantics"]] },
  { label: "event", fields: [["contract", "Publisher-controlled subscription"], ["risk", "Subscriber retention and exception policy"]] },
  { label: "lambda", fields: [["contract", "Anonymous function converted to target"], ["risk", "Capture allocation and variable timing"]] },
  { label: "local method", fields: [["contract", "Named lexical helper"], ["risk", "Capture still possible; recursion/debug differs"]] },
] as const;

const flowCases = [
  { label: "exception", fields: [["flow", "Stack unwinds to matching catch"], ["cleanup", "Finally runs on exit paths"]] },
  { label: "iterator", fields: [["flow", "MoveNext advances deferred state machine"], ["cleanup", "Dispose triggers iterator finally"]] },
  { label: "nullable", fields: [["flow", "Absence represented/annotated"], ["cleanup", "Warnings do not validate runtime data"]] },
  { label: "extension", fields: [["flow", "Static method selected by lookup"], ["cleanup", "No virtual dispatch or private access"]] },
] as const;

const boundaryCases = [
  { label: "record/pattern", fields: [["boundary", "Value-like data and structural branching"], ["gate", "Equality, exhaustiveness, shallow copy"]] },
  { label: "attribute", fields: [["boundary", "Metadata attached to target"], ["gate", "Consumer must interpret it"]] },
  { label: "dynamic", fields: [["boundary", "Member binding deferred"], ["gate", "Runtime binder failure matrix"]] },
  { label: "unsafe", fields: [["boundary", "Pointer/native memory operations"], ["gate", "Lifetime, bounds, ABI, platform"]], alert: "Every escape from static and memory safety needs a narrow adapter and target-specific tests." },
] as const;

export function CtcCallableLifetimeLab() { return <CtcOfficialLab cases={callableCases} caption="Delegates, events, lambdas, and local methods differ in ownership, capture, and invocation contracts." tone="violet" />; }
export function CtcAdvancedFlowLab() { return <CtcOfficialLab cases={flowCases} caption="Exceptions, iterators, nullable analysis, and extension lookup alter control flow at different phases." tone="amber" />; }
export function CtcAdvancedBoundaryLab() { return <CtcOfficialLab cases={boundaryCases} caption="Records, metadata, dynamic binding, and unsafe code each cross a distinct compile-time or runtime boundary." tone="rose" />; }
