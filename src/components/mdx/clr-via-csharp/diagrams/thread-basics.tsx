"use client";

import { CvcOfficialLab } from "./official-lab";

const costCases = [
  { label: "Stack", fields: [["Cost", "Reserved/committed virtual memory"], ["Benefit", "Independent call state"], ["Risk", "Too many threads consume memory"]] },
  { label: "Context switch", fields: [["Cost", "Scheduler save/restore, cache/TLB disruption"], ["Benefit", "CPU sharing and responsiveness"], ["Risk", "Oversubscription and tail latency"]] },
  { label: "TLS/context", fields: [["Cost", "Per-thread runtime/OS state"], ["Benefit", "Thread affinity and local data"], ["Risk", "Pool reuse and async migration"]] },
  { label: "Synchronization", fields: [["Cost", "Contention, fences, blocking"], ["Benefit", "Shared invariant coordination"], ["Risk", "Deadlock and convoy"]] },
] as const;

const schedulingCases = [
  { label: "Runnable", fields: [["State", "Eligible for CPU"], ["Scheduler", "Priority/time-slice/core chooses"], ["Evidence", "Run queue and CPU samples"]] },
  { label: "Running", fields: [["State", "Executing on one logical processor"], ["Scheduler", "Can be preempted"], ["Evidence", "CPU/core timeline"]] },
  { label: "Waiting", fields: [["State", "Blocked/sleep/I/O/synchronization"], ["Scheduler", "Not consuming CPU until signaled"], ["Evidence", "Wait reason and owner"]] },
  { label: "Starved", fields: [["State", "Runnable but delayed or pool work lacks threads"], ["Scheduler", "Oversubscription/priority/pool injection"], ["Evidence", "Queue latency vs execution latency"]], alert: "Thread priority is a scheduling hint, not a correctness mechanism or guaranteed service level." },
] as const;

const lifetimeCases = [
  { label: "Foreground", fields: [["Process exit", "Keeps CLR process alive"], ["Owner", "Explicit thread lifecycle"], ["Shutdown", "Signal and Join"]] },
  { label: "Background", fields: [["Process exit", "Does not keep process alive"], ["Owner", "Still must clean resources"], ["Shutdown", "May be terminated at process exit"]] },
  { label: "Thread pool", fields: [["Process exit", "Workers are background"], ["Owner", "Runtime pool plus work item/task"], ["Shutdown", "Track/await tasks; no per-work thread ownership"]] },
  { label: "Dedicated", fields: [["Process exit", "Configured foreground/background"], ["Owner", "Component creates and joins"], ["Shutdown", "Use only for affinity/blocking/priority reason"]] },
] as const;

export function CvcThreadCostLab() { return <CvcOfficialLab cases={costCases} caption="Stacks, context switches, per-thread state, and synchronization make threads expensive concurrency resources." tone="amber" />; }
export function CvcThreadSchedulingLab() { return <CvcOfficialLab cases={schedulingCases} caption="Runnable, running, waiting, and starved threads require timeline and wait evidence rather than priority guesses." tone="cyan" />; }
export function CvcThreadLifetimeLab() { return <CvcOfficialLab cases={lifetimeCases} caption="Foreground, background, pool, and dedicated threads differ in process-exit and lifecycle ownership." tone="violet" />; }
