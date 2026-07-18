"use client";

import { CfpOfficialLab } from "./official-lab";

const sharingCases = [
  { label: "lock", fields: [["coordination", "Callers share memory under mutual exclusion"], ["failure", "Deadlock, contention, forgotten lock"]] },
  { label: "atomic", fields: [["coordination", "Single-word transition"], ["failure", "Compound invariant still needs a protocol"]] },
  { label: "immutable", fields: [["coordination", "Publish snapshots"], ["failure", "Writers still arbitrate replacement"]] },
  { label: "agent", fields: [["coordination", "One mailbox owns mutable state"], ["failure", "Backlog, crash, and reply timeout"]] },
] as const;

const mailboxCases = [
  { label: "send", fields: [["protocol", "Immutable command enters mailbox"], ["ordering", "Per-mailbox enqueue policy"]] },
  { label: "handle", fields: [["protocol", "Owner processes one message"], ["ordering", "State transition is serialized"]] },
  { label: "reply", fields: [["protocol", "Typed result channel"], ["ordering", "Timeout does not imply cancellation"]] },
  { label: "fail", fields: [["protocol", "Handler throws or process stops"], ["ordering", "Supervision and mailbox policy decide recovery"]], alert: "Message passing moves concurrency risk into protocol and lifecycle design." },
] as const;

const lobCases = [
  { label: "account", fields: [["partition", "One agent per account/shard"], ["invariant", "Balance transitions serialized"]] },
  { label: "pricing", fields: [["partition", "Workers compute independent quotes"], ["invariant", "Versioned market snapshot"]] },
  { label: "risk", fields: [["partition", "Aggregate by portfolio key"], ["invariant", "Explicit stale-data policy"]] },
  { label: "gateway", fields: [["partition", "Bounded ingress and routing"], ["invariant", "Backpressure, dedup, observability"]] },
] as const;

export function CfpSharedStateChoiceLab() { return <CfpOfficialLab cases={sharingCases} caption="Locks, atomics, immutable snapshots, and agents protect different invariant shapes." tone="violet" />; }
export function CfpMailboxProtocolLab() { return <CfpOfficialLab cases={mailboxCases} caption="An agent serializes state access, while protocol, timeout, failure, and mailbox capacity remain explicit." tone="rose" />; }
export function CfpLobTopologyLab() { return <CfpOfficialLab cases={lobCases} caption="Line-of-business message topologies follow ownership keys, consistency boundaries, and load limits." tone="cyan" />; }
