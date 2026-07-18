"use client";

import { CtcOfficialLab } from "./official-lab";

const speedupCases = [
  { label: "sequential", fields: [["shape", "One ordered execution path"], ["gate", "Correctness and latency baseline"]] },
  { label: "fine grain", fields: [["shape", "Many tiny independent items"], ["gate", "Scheduling and merge overhead can dominate"]] },
  { label: "coarse grain", fields: [["shape", "Partitioned CPU-heavy chunks"], ["gate", "Load balance and local state"]] },
  { label: "oversubscribed", fields: [["shape", "More runnable work than useful cores"], ["gate", "Contention, cache pressure, nested parallelism"]] },
] as const;

const modelCases = [
  { label: "PLINQ", fields: [["model", "Declarative parallel query"], ["gate", "Ordering, merge, side effects, degree"]] },
  { label: "Parallel", fields: [["model", "Loop/invoke data parallelism"], ["gate", "Partitioning, local reduction, stop/cancel"]] },
  { label: "Task DAG", fields: [["model", "Independent/dependent work graph"], ["gate", "Fault observation and continuation semantics"]] },
  { label: "scheduler", fields: [["model", "Policy maps tasks to execution"], ["gate", "Affinity, concurrency cap, inlining"]] },
] as const;

const queueCases = [
  { label: "ConcurrentQueue", fields: [["contract", "Thread-safe nonblocking FIFO operations"], ["gate", "No built-in wait or completion"]] },
  { label: "BlockingCollection", fields: [["contract", "Bounded blocking queue + completion"], ["gate", "Thread-blocking consumers and cancellation"]] },
  { label: "Channel", fields: [["contract", "Bounded async producer/consumer"], ["gate", "Full mode, single/multi reader, completion"]] },
  { label: "partition local", fields: [["contract", "Local accumulator then merge"], ["gate", "Associative reduction and bounded merge"]] },
] as const;

export function CtcParallelSpeedupLab() { return <CtcOfficialLab cases={speedupCases} caption="Parallel speedup depends on independent coarse work, useful cores, balanced partitions, and low coordination overhead." tone="cyan" />; }
export function CtcParallelModelLab() { return <CtcOfficialLab cases={modelCases} caption="PLINQ, Parallel loops, task graphs, and custom schedulers express different parallel decomposition policies." tone="violet" />; }
export function CtcProducerConsumerLab() { return <CtcOfficialLab cases={queueCases} caption="Concurrent collections provide atomic operations; a complete pipeline also needs capacity, waiting, completion, and fault ownership." tone="amber" />; }
