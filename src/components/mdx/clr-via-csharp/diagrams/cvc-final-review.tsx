"use client";

import { CvcOfficialLab } from "./official-lab";

const mechanismCases = [
  { label: "Load", fields: [["Input", "assembly bytes and identity"], ["Runtime state", "module, metadata and type objects"], ["Evidence", "binding log and loaded assembly set"]] },
  { label: "Execute", fields: [["Input", "IL and arguments"], ["Runtime state", "JIT code, stack and dispatch target"], ["Evidence", "IL/native stack and call timeline"]] },
  { label: "Retain", fields: [["Input", "allocations and references"], ["Runtime state", "roots, generations and finalization"], ["Evidence", "allocation trace and root path"]] },
  { label: "Coordinate", fields: [["Input", "work, cancellation and shared state"], ["Runtime state", "tasks, waits, locks and queues"], ["Evidence", "queue, thread and synchronization timeline"]] },
] as const;

const incidentCases = [
  { label: "Wrong implementation", fields: [["Suspect", "type, interface, delegate or reflection binding"], ["First evidence", "runtime type, method target and metadata"], ["Related parts", "II and III"]] },
  { label: "Retained memory", fields: [["Suspect", "root, event, cache, finalizer or AppDomain/loader"], ["First evidence", "surviving object root path"], ["Related parts", "III and IV"]] },
  { label: "Slow or stuck work", fields: [["Suspect", "CPU queue, sync-over-async, I/O or lock owner"], ["First evidence", "queue delay plus running/waiting stacks"], ["Related parts", "IV and V"]] },
  { label: "Boundary failure", fields: [["Suspect", "assembly identity, serialization or native/WinRT contract"], ["First evidence", "wire/binding/ABI mismatch"], ["Related parts", "I and IV"]], alert: "Start from the cheapest discriminating evidence; do not change GC, thread-pool, or binding settings before proving the causal path." },
] as const;

const acceptanceCases = [
  { label: "Explain", fields: [["Pass", "Predict mechanism and counterexample"], ["Proof", "state graph with invariant"], ["Fail", "Definition-only recall"]] },
  { label: "Implement", fields: [["Pass", "Success, fault, cancel and cleanup paths"], ["Proof", "executable fixture"], ["Fail", "Unbounded or ownerless sample"]] },
  { label: "Diagnose", fields: [["Pass", "Before/after trace identifies owner"], ["Proof", "timeline, root path, IL or binding evidence"], ["Fail", "Metric without causal link"]] },
  { label: "Transfer", fields: [["Pass", "Apply the model to an unseen incident"], ["Proof", "decision, limits and rollback gate"], ["Fail", "Copying the original exercise"]] },
] as const;

export function CvcRuntimeMechanismLab() {
  return <CvcOfficialLab cases={mechanismCases} caption="Load, execute, retain, and coordinate are the four recurring CLR evidence paths." tone="cyan" />;
}

export function CvcIncidentTriageLab() {
  return <CvcOfficialLab cases={incidentCases} caption="Production symptoms map back to specific runtime contracts and official book parts." tone="amber" />;
}

export function CvcAcceptanceGateLab() {
  return <CvcOfficialLab cases={acceptanceCases} caption="Final mastery requires explanation, implementation, diagnosis, and transfer evidence." tone="violet" />;
}
