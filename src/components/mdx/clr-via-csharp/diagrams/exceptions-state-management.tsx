"use client";

import { CvcOfficialLab } from "./official-lab";

const flowCases = [
  { label: "try", fields: [["Role", "Define protected operation region"], ["State", "May be partially changed before failure"], ["Evidence", "Exact throw site and completed steps"]] },
  { label: "catch", fields: [["Role", "Handle only understood failure types"], ["State", "Recover, translate, or rethrow preserving stack"], ["Evidence", "Original exception plus boundary context"]] },
  { label: "finally", fields: [["Role", "Release/restore regardless of outcome"], ["State", "Must tolerate partial acquisition"], ["Evidence", "Cleanup attempted and failures observed"]] },
  { label: "filter", fields: [["Role", "Select handler without catching unmatched exception"], ["State", "Avoid mutating while evaluating"], ["Evidence", "Predicate inputs and false continuation"]], alert: "A catch block is correct only when it can restore a valid state, translate at a boundary, or add evidence before rethrowing." },
] as const;

const taxonomyCases = [
  { label: "Argument", fields: [["Owner", "Caller contract violation"], ["Recovery", "Fix caller/input"], ["Type", "ArgumentException family"]] },
  { label: "State", fields: [["Owner", "Operation invalid for current object state"], ["Recovery", "Change sequence/state"], ["Type", "InvalidOperation/domain exception"]] },
  { label: "External", fields: [["Owner", "I/O, network, dependency"], ["Recovery", "Retry/fallback only under explicit policy"], ["Type", "IOException/Http/timeout translated at boundary"]] },
  { label: "Cancellation", fields: [["Owner", "Cooperative request to stop"], ["Recovery", "Propagate expected outcome"], ["Type", "OperationCanceledException with matching token"]] },
] as const;

const stateCases = [
  { label: "Validate first", fields: [["Technique", "Reject before mutation"], ["Guarantee", "Strong state guarantee"], ["Limit", "External state can still change"]] },
  { label: "Commit swap", fields: [["Technique", "Build new state then atomically replace"], ["Guarantee", "Old or new snapshot"], ["Limit", "Memory/copy cost"]] },
  { label: "Compensate", fields: [["Technique", "Record completed side effects and undo"], ["Guarantee", "Best effort/domain-specific"], ["Limit", "Undo may fail or be non-invertible"]] },
  { label: "Terminate", fields: [["Technique", "Fail fast on corrupted invariant"], ["Guarantee", "Do not continue unknown state"], ["Limit", "Requires durable recovery outside process"]], alert: "Reliability means preserving known invariants and evidence, not catching every exception and continuing." },
] as const;

export function CvcExceptionFlowLab() { return <CvcOfficialLab cases={flowCases} caption="Try, catch, finally, and filters divide operation, recovery, cleanup, and selection responsibilities." tone="cyan" />; }
export function CvcExceptionTaxonomyLab() { return <CvcOfficialLab cases={taxonomyCases} caption="Argument, state, external, and cancellation failures have different owners and recovery policies." tone="violet" />; }
export function CvcStateRecoveryLab() { return <CvcOfficialLab cases={stateCases} caption="Validation, commit-swap, compensation, and termination provide different state guarantees after failure." tone="amber" />; }
