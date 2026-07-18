"use client";

import { CvcOfficialLab } from "./official-lab";

const lockCases = [
  { label: "Monitor", fields: [["Fast path", "User-mode acquisition when uncontended"], ["Slow path", "Runtime wait queue/synchronization block"], ["Semantics", "Exclusive, reentrant, Pulse/Wait condition"]] },
  { label: "SemaphoreSlim", fields: [["Fast path", "Managed permit count"], ["Slow path", "Sync/async waiter queues"], ["Semantics", "Bounded concurrency, no thread ownership"]] },
  { label: "ReaderWriterLockSlim", fields: [["Fast path", "Concurrent readers or one writer"], ["Slow path", "Queued modes and upgrade path"], ["Semantics", "Read-heavy, nontrivial recursion/upgrade"]] },
  { label: "ManualResetEventSlim", fields: [["Fast path", "Brief spinning/user state"], ["Slow path", "Inflates kernel wait handle when needed"], ["Semantics", "Manual-reset gate"]] },
] as const;

const phaseCases = [
  { label: "CountdownEvent", fields: [["Model", "N producers signal toward zero"], ["Reuse", "Reset carefully for next phase"], ["Failure", "Missing/extra signal"]] },
  { label: "Barrier", fields: [["Model", "Known participants rendezvous each phase"], ["Reuse", "Automatically advances phases"], ["Failure", "Participant loss/post-phase exception"]] },
  { label: "Condition", fields: [["Model", "Wait in while loop until state predicate"], ["Reuse", "Pulse after state transition under same lock"], ["Failure", "Lost assumption/spurious wake logic"]] },
  { label: "OneManyLock", fields: [["Model", "Custom reader/writer state machine from book"], ["Reuse", "Requires rigorous state proof"], ["Failure", "Starvation, overflow, missed wake"]], alert: "Use proven framework synchronization constructs unless a measured gap and formal state model justify a custom lock." },
] as const;

const asyncCases = [
  { label: "Double-check", fields: [["Need", "Publish immutable singleton once"], ["Primitive", "Lazy<T>/static initialization preferred"], ["Risk", "Ordering and duplicate creation"]] },
  { label: "Async mutex", fields: [["Need", "Mutual exclusion across awaits"], ["Primitive", "SemaphoreSlim(1,1) or proven async lock"], ["Risk", "Always release in finally; no thread ownership"]] },
  { label: "Concurrent collection", fields: [["Need", "Atomic collection operations"], ["Primitive", "ConcurrentDictionary/Queue/Channel"], ["Risk", "Delegates may run multiple times; compound steps not atomic"]] },
  { label: "Message passing", fields: [["Need", "Owned mutable state with backpressure"], ["Primitive", "Channel/actor/queue"], ["Risk", "Bound capacity, shutdown, failure observation"]] },
] as const;

export function CvcHybridLockLab() { return <CvcOfficialLab cases={lockCases} caption="Monitor and slim/reader-writer constructs combine user-mode fast paths with managed or kernel-assisted waiting." tone="cyan" />; }
export function CvcPhaseSynchronizationLab() { return <CvcOfficialLab cases={phaseCases} caption="Countdowns, barriers, condition variables, and custom one-many locks coordinate different state-machine phases." tone="violet" />; }
export function CvcAsyncSynchronizationLab() { return <CvcOfficialLab cases={asyncCases} caption="Lazy publication, async exclusion, concurrent collections, and message passing solve different compound coordination problems." tone="amber" />; }
