"use client";

import { CvcOfficialLab } from "./official-lab";

const poolCases = [
  { label: "Queue", fields: [["State", "Work waiting for a worker"], ["Evidence", "Queue length and delay"], ["Risk", "Unbounded backlog"]] },
  { label: "Inject", fields: [["State", "Pool adds workers heuristically"], ["Evidence", "Thread count/injection rate"], ["Risk", "Blocking causes slow ramp and oversubscription"]] },
  { label: "Execute", fields: [["State", "Worker runs callback/task"], ["Evidence", "CPU duration, context, exceptions"], ["Risk", "Long blocking monopolizes worker"]] },
  { label: "Retire", fields: [["State", "Idle excess workers removed"], ["Evidence", "Utilization over time"], ["Risk", "Oscillation under bursty load"]] },
] as const;

const taskCases = [
  { label: "Created", fields: [["Outcome", "Not yet scheduled or promise not completed"], ["Owner", "Producer/scheduler"], ["Control", "Avoid cold tasks unless explicit"]] },
  { label: "Running", fields: [["Outcome", "Delegate executing or async operation pending"], ["Owner", "Scheduler/operation"], ["Control", "Cancellation cooperative"]] },
  { label: "RanToCompletion", fields: [["Outcome", "Result available"], ["Owner", "Consumer observes/awaits"], ["Control", "Continuation scheduling"]] },
  { label: "Faulted/Cancelled", fields: [["Outcome", "Exception aggregate or matching cancellation"], ["Owner", "Consumer must observe"], ["Control", "Cleanup and sibling policy"]] },
] as const;

const parallelCases = [
  { label: "Task graph", fields: [["Fit", "Independent coarse compute units"], ["Partition", "Explicit dependencies/continuations"], ["Risk", "Child attachment and exception observation"]] },
  { label: "Parallel loop", fields: [["Fit", "CPU loop with independent iterations"], ["Partition", "Range/data partitioner"], ["Risk", "Shared state and overfine work"]] },
  { label: "PLINQ", fields: [["Fit", "Declarative in-memory CPU query"], ["Partition", "Provider partitions sequence"], ["Risk", "Ordering, side effects, merge cost"]] },
  { label: "Timer", fields: [["Fit", "Periodic scheduling signal"], ["Partition", "Each tick queues callback"], ["Risk", "Overlap, drift, disposal race"]], alert: "Parallelism helps only when useful compute exceeds partition, scheduling, synchronization, and merge costs." },
] as const;

export function CvcThreadPoolLifecycleLab() { return <CvcOfficialLab cases={poolCases} caption="Queueing, worker injection, execution, and retirement explain thread-pool latency and starvation." tone="cyan" />; }
export function CvcTaskStateLab() { return <CvcOfficialLab cases={taskCases} caption="Tasks complete exactly once with result, exception, or cancellation and require an observing owner." tone="violet" />; }
export function CvcParallelChoiceLab() { return <CvcOfficialLab cases={parallelCases} caption="Task graphs, parallel loops, PLINQ, and timers suit different compute and scheduling shapes." tone="amber" />; }
