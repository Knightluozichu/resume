"use client";

import { CtcOfficialLab } from "./official-lab";

const executionCases = [
  { label: "Thread", fields: [["unit", "Dedicated OS execution thread"], ["fit", "Long blocking or special affinity only"]] },
  { label: "ThreadPool", fields: [["unit", "Shared worker and I/O completion pool"], ["fit", "Short nonblocking callbacks"]] },
  { label: "Task", fields: [["unit", "Future result, not necessarily a thread"], ["fit", "Composition, completion, error"]] },
  { label: "SyncContext", fields: [["unit", "Continuation scheduling policy"], ["fit", "UI/request affinity when present"]] },
] as const;

const asyncCases = [
  { label: "sync prefix", fields: [["state", "Runs until first incomplete await"], ["owner", "Caller receives Task after suspension"]] },
  { label: "suspended", fields: [["state", "State machine stores live locals"], ["owner", "Awaiter registers continuation"]] },
  { label: "resumed", fields: [["state", "Continuation executes on scheduler/context"], ["owner", "Method advances or awaits again"]] },
  { label: "completed", fields: [["state", "Result, fault, or cancellation"], ["owner", "Await observes final outcome"]] },
] as const;

const compositionCases = [
  { label: "WhenAll", fields: [["contract", "Wait for every operation"], ["gate", "Observe aggregate outcomes and bound fan-out"]] },
  { label: "WhenAny", fields: [["contract", "Select first completion"], ["gate", "Cancel and observe losing tasks"]] },
  { label: "Cancellation", fields: [["contract", "Cooperative stop request"], ["gate", "Checkpoint and ownership policy"]] },
  { label: "SemaphoreSlim", fields: [["contract", "Awaitable mutual exclusion or limit"], ["gate", "Release in finally; no lock across unknown code"]] },
] as const;

export function CtcExecutionCarrierLab() { return <CtcOfficialLab cases={executionCases} caption="Threads, the pool, tasks, and synchronization contexts describe different layers of concurrent execution." tone="cyan" />; }
export function CtcAsyncStateMachineLab() { return <CtcOfficialLab cases={asyncCases} caption="An async method runs synchronously, suspends at an incomplete await, and completes with one explicit outcome." tone="violet" />; }
export function CtcAsyncCompositionLab() { return <CtcOfficialLab cases={compositionCases} caption="Composition must define fan-out, cancellation ownership, loser observation, and asynchronous exclusion." tone="amber" />; }
