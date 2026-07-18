"use client";

import { CvcOfficialLab } from "./official-lab";

const primitiveCases = [
  { label: "Volatile", fields: [["Scope", "One read/write ordering and visibility"], ["Wait", "No blocking"], ["Risk", "Compound invariants not atomic"]] },
  { label: "Interlocked", fields: [["Scope", "Atomic read-modify-write on one location"], ["Wait", "CPU atomic/fence"], ["Risk", "Multi-location protocol complexity"]] },
  { label: "Spin", fields: [["Scope", "Very short owner handoff"], ["Wait", "Consumes CPU while polling/yielding"], ["Risk", "Preemption, single-core, unfairness"]] },
  { label: "Kernel wait", fields: [["Scope", "Cross-thread/process OS object"], ["Wait", "Blocks thread in kernel"], ["Risk", "Transition cost, handle lifetime"]] },
] as const;

const eventCases = [
  { label: "Auto-reset event", fields: [["State", "One stored signal"], ["Release", "At most one waiter per signal"], ["Risk", "Signals coalesce; not a counting semaphore"]] },
  { label: "Manual-reset event", fields: [["State", "Gate remains signaled until reset"], ["Release", "All/current/future waiters while set"], ["Risk", "Reset race and missed phase"]] },
  { label: "Semaphore", fields: [["State", "Count of available permits"], ["Release", "One waiter per permit"], ["Risk", "Over-release and lost ownership"]] },
  { label: "Mutex", fields: [["State", "Named/unnamed kernel ownership"], ["Release", "Owner thread releases"], ["Risk", "Abandonment, cross-process naming/security"]] },
] as const;

const threadSafetyCases = [
  { label: "Immutable", fields: [["Library promise", "No mutation after construction"], ["Caller", "Safe sharing if members deeply immutable"], ["Proof", "No publication of partial state"]] },
  { label: "Thread-compatible", fields: [["Library promise", "Separate instances safe"], ["Caller", "Synchronize shared instance"], ["Proof", "Document mutable state owner"]] },
  { label: "Thread-safe", fields: [["Library promise", "Specified concurrent operations safe"], ["Caller", "Respect operation-level guarantees"], ["Proof", "Linearization/invariant tests"]] },
  { label: "Atomic compound", fields: [["Library promise", "One multi-step operation is indivisible"], ["Caller", "Use provided method, not separate calls"], ["Proof", "Linearization point and stress/model test"]], alert: "A thread-safe collection does not make a sequence of Count/Contains/Add operations atomic." },
] as const;

export function CvcSynchronizationPrimitiveLab() { return <CvcOfficialLab cases={primitiveCases} caption="Volatile, interlocked, spinning, and kernel waits differ by state scope, CPU use, and blocking cost." tone="cyan" />; }
export function CvcKernelConstructLab() { return <CvcOfficialLab cases={eventCases} caption="Events, semaphores, and mutexes encode signal, gate, permit, and ownership semantics." tone="violet" />; }
export function CvcThreadSafetyContractLab() { return <CvcOfficialLab cases={threadSafetyCases} caption="Immutable, compatible, thread-safe, and compound-atomic APIs make progressively stronger promises." tone="amber" />; }
