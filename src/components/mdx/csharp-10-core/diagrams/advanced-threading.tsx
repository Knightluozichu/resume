"use client";

import { CtcOfficialLab } from "./official-lab";

const lockCases = [
  { label: "Monitor", fields: [["scope", "In-process object mutual exclusion"], ["gate", "Invariant, order, short critical section"]] },
  { label: "Mutex", fields: [["scope", "Kernel and optional cross-process exclusion"], ["gate", "Abandonment, name security, release owner"]] },
  { label: "ReaderWriter", fields: [["scope", "Many readers or one writer"], ["gate", "Read ratio, upgrade policy, starvation"]] },
  { label: "Semaphore", fields: [["scope", "Bounded concurrent entrants"], ["gate", "Capacity, timeout, release exactly once"]] },
] as const;

const signalCases = [
  { label: "AutoResetEvent", fields: [["semantics", "One stored signal releases one waiter"], ["gate", "Coalescing can lose event counts"]] },
  { label: "ManualResetEvent", fields: [["semantics", "Gate remains open until reset"], ["gate", "Reset race and state ownership"]] },
  { label: "CountdownEvent", fields: [["semantics", "Wait for N completions"], ["gate", "Every producer signals once"]] },
  { label: "Barrier", fields: [["semantics", "Participants rendezvous by phase"], ["gate", "Add/remove, timeout, broken participant"]] },
] as const;

const lifetimeCases = [
  { label: "Lazy", fields: [["state", "One value initialized on demand"], ["gate", "Mode, recursion, exception caching"]] },
  { label: "ThreadLocal", fields: [["state", "One value per physical thread"], ["gate", "Pool reuse, disposal, aggregation"]] },
  { label: "Timer", fields: [["state", "Callback scheduled by time"], ["gate", "Overlap, owner, clock, shutdown"]] },
  { label: "PeriodicTimer", fields: [["state", "One async consumer observes ticks"], ["gate", "Coalescing, cancellation, disposal"]] },
] as const;

export function CtcLockPrimitiveLab() { return <CtcOfficialLab cases={lockCases} caption="Synchronization primitives differ by scope, ownership, cardinality, kernel cost, and failure behavior." tone="cyan" />; }
export function CtcSignalPhaseLab() { return <CtcOfficialLab cases={signalCases} caption="Signals represent state or permits, while barriers coordinate a known participant set across phases." tone="violet" />; }
export function CtcThreadLifetimeLab() { return <CtcOfficialLab cases={lifetimeCases} caption="Lazy values, thread-local state, and timers must align their lifetime with threads, hosts, and shutdown." tone="amber" />; }
