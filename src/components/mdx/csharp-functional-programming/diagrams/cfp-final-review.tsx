"use client";

import { CfpOfficialLab } from "./official-lab";

const architectureCases = [
  { label: "input", fields: [["boundary", "Parse and validate into typed values"], ["evidence", "Invalid inputs never enter pure core"]] },
  { label: "decide", fields: [["boundary", "Pure functions produce outcome/effects"], ["evidence", "Same input and state give same decision"]] },
  { label: "execute", fields: [["boundary", "Interpreter performs I/O"], ["evidence", "Cancellation, retry, idempotency are explicit"]] },
  { label: "publish", fields: [["boundary", "Versioned state and messages become visible"], ["evidence", "Conflict and replay are measurable"]] },
] as const;

const effectCases = [
  { label: "absence", fields: [["type", "Option"], ["gate", "No hidden null or exception"]] },
  { label: "expected fail", fields: [["type", "Either / Validation"], ["gate", "Stable domain error taxonomy"]] },
  { label: "async/stream", fields: [["type", "Task / Observable"], ["gate", "Terminal and cancellation semantics"]] },
  { label: "state/concurrency", fields: [["type", "State / agent protocol"], ["gate", "Version, capacity, ownership"]] },
] as const;

const releaseCases = [
  { label: "correctness", fields: [["proof", "Examples, properties, laws"], ["failure injection", "Boundary, duplicate, reordering"]] },
  { label: "compatibility", fields: [["proof", "Schema and consumer matrix"], ["failure injection", "Old data/messages and rolling versions"]] },
  { label: "capacity", fields: [["proof", "Queue, in-flight, replay duration"], ["failure injection", "Burst, hot key, slow dependency"]] },
  { label: "recovery", fields: [["proof", "Checkpoint, idempotency, runbook"], ["failure injection", "Crash and unknown completion"]] },
] as const;

export function CfpArchitectureReviewLab() { return <CfpOfficialLab cases={architectureCases} caption="A functional architecture separates typed input, pure decision, effect execution, and versioned publication." tone="emerald" />; }
export function CfpEffectSelectionLab() { return <CfpOfficialLab cases={effectCases} caption="Choose an effect type by the observable contract it must preserve, not by naming fashion." tone="violet" />; }
export function CfpReleaseGateLab() { return <CfpOfficialLab cases={releaseCases} caption="Production acceptance requires correctness, compatibility, capacity, and recovery evidence." tone="rose" />; }
