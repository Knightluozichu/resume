"use client";

import { CtcOfficialLab } from "./official-lab";

const decisionCases = [
  { label: "model", fields: [["choose", "Type, collection, LINQ, serialization"], ["gate", "Invariant, equality, query and schema"]] },
  { label: "operate", fields: [["choose", "Async, stream, network, parallel"], ["gate", "Owner, capacity, cancellation, completion"]] },
  { label: "inspect", fields: [["choose", "Diagnostics, reflection, dynamic"], ["gate", "Evidence, identity, execution boundary"]] },
  { label: "protect", fields: [["choose", "Crypto, interop, regex limits"], ["gate", "Threat, ABI, timeout, version"]] },
] as const;

const failureCases = [
  { label: "wrong value", fields: [["trace", "Type/parse/query/schema"], ["evidence", "Input, invariant, result diff"]] },
  { label: "stuck work", fields: [["trace", "Lock/task/I/O/queue"], ["evidence", "Timeline, stacks, wait-for graph"]] },
  { label: "retained resource", fields: [["trace", "Dispose/root/pool/callback"], ["evidence", "Owner graph and heap/root path"]] },
  { label: "boundary fault", fields: [["trace", "Network/assembly/native/regex"], ["evidence", "Identity, bytes, limits, timeout"]] },
] as const;

const examCases = [
  { label: "explain", fields: [["deliver", "State mechanism and counterexample"], ["pass", "No API-name-only answer"]] },
  { label: "implement", fields: [["deliver", "Small bounded solution"], ["pass", "Owner and failure paths explicit"]] },
  { label: "diagnose", fields: [["deliver", "Evidence-backed causal chain"], ["pass", "Reproduce before changing code"]] },
  { label: "transfer", fields: [["deliver", "Apply to unfamiliar system"], ["pass", "Defend tradeoff and gate"]] },
] as const;

export function CtcReviewDecisionLab() { return <CtcOfficialLab cases={decisionCases} caption="A final review chooses models and mechanisms from invariants, ownership, evidence, and boundary risk." tone="cyan" />; }
export function CtcReviewFailureLab() { return <CtcOfficialLab cases={failureCases} caption="Failures become diagnosable when values, work, resources, and external boundaries are traced separately." tone="violet" />; }
export function CtcReviewExamLab() { return <CtcOfficialLab cases={examCases} caption="Mastery requires explanation, implementation, diagnosis, and transfer with explicit evidence gates." tone="amber" />; }
