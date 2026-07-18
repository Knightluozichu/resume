"use client";

import { useState } from "react";

const executionCases = [
  { label: "I/O wait", workload: "network/file/database waits", primitive: "async API + Task", resource: "no dedicated blocked thread per wait", budget: "bound requests and downstream concurrency", proof: "throughput, latency and connection pool under load" },
  { label: "CPU work", workload: "independent compute over enough data", primitive: "Task.Run at app boundary or Parallel", resource: "ThreadPool workers and CPU cores", budget: "near available cores; avoid oversubscription", proof: "wall time, CPU utilization and allocation" },
  { label: "dedicated thread", workload: "thread affinity, priority-sensitive integration or blocking pump", primitive: "explicit Thread", resource: "reserved stack + OS thread", budget: "rare and lifecycle-owned", proof: "startup/stop/join and process-exit tests" },
  { label: "UI work", workload: "short state/render interaction", primitive: "UI dispatcher / SynchronizationContext", resource: "single UI thread", budget: "never block it; marshal minimal update", proof: "responsiveness and thread-affinity assertions" },
  { label: "legacy worker", workload: "old event-based desktop background operation", primitive: "BackgroundWorker only for compatibility", resource: "ThreadPool/event callbacks", budget: "migrate new code to Task + cancellation/progress", proof: "completion, cancellation and error observation" },
];

export function CqcExecutionModelLab() {
  const [selected, setSelected] = useState(0);
  const item = executionCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{executionCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-cyan-500 bg-cyan-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto_1fr]"><div className="border border-border bg-bg p-4"><span className="text-xs text-secondary">workload</span><strong className="mt-2 block text-sm leading-6 text-primary">{item.workload}</strong></div><div className="flex min-h-12 items-center justify-center text-xl text-cyan-400">→</div><div className="border border-cyan-500/40 bg-cyan-500/10 p-4"><span className="text-xs text-secondary">primitive</span><strong className="mt-2 block text-sm leading-6 text-primary">{item.primitive}</strong></div></div><div className="mt-3 grid gap-3 md:grid-cols-3">{[["resource", item.resource], ["budget", item.budget], ["proof", item.proof]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-3"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">按I/O wait、CPU work、thread affinity与UI ownership选择async、Task、Parallel或explicit Thread。</figcaption></figure>;
}

const coordinationCases = [
  { label: "SemaphoreSlim", protects: "maximum concurrent entries", misuse: "treating it as object-state mutual exclusion without invariant", cancellation: "WaitAsync(token)", lifecycle: "release exactly once after successful wait", proof: "peak active count never exceeds limit" },
  { label: "lock", protects: "small synchronous invariant", misuse: "locking this, public Type, interned string or blocking await inside", cancellation: "not cancellable while waiting", lifecycle: "private stable gate identity", proof: "race test plus short hold-time trace" },
  { label: "background flag", protects: "nothing; controls process-exit waiting", misuse: "expecting finally/flush when process exits", cancellation: "explicit token still required", lifecycle: "foreground thread can keep process alive", proof: "shutdown behavior with pending work" },
  { label: "priority", protects: "nothing; scheduler hint", misuse: "using priority to establish correctness or ordering", cancellation: "independent cooperative stop", lifecycle: "starvation and platform behavior vary", proof: "correctness remains without priority assumption" },
  { label: "CancellationToken", protects: "cooperative lifecycle transition", misuse: "Thread.Abort or checking token too rarely", cancellation: "observe, unwind and clean up", lifecycle: "owner cancels and awaits completion", proof: "bounded stop latency and no leaked resources" },
];

export function CqcCoordinationLab() {
  const [selected, setSelected] = useState(4);
  const item = coordinationCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{coordinationCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-violet-500 bg-violet-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-2">{[["protects", item.protects], ["misuse", item.misuse], ["cancellation", item.cancellation], ["lifecycle", item.lifecycle]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div><div className="mt-3 border border-emerald-500/40 bg-emerald-500/10 p-3 text-sm text-primary">proof: {item.proof}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">区分concurrency limiter、mutual exclusion、process-exit flag、scheduler hint与cooperative cancellation。</figcaption></figure>;
}

const parallelCases = [
  { label: "Parallel.For", shape: "finite synchronous CPU loop", order: "unspecified by default", exceptions: "aggregate after participating work", state: "thread-local state + final reduction", risk: "blocking I/O and tiny iterations waste workers" },
  { label: "Task.WhenAll", shape: "known async operations", order: "result array follows input task order", exceptions: "await observes failure; inspect tasks/Exception for all causes", state: "independent task results", risk: "unbounded fan-out overloads dependency" },
  { label: "PLINQ", shape: "large pure in-memory query", order: "unordered unless AsOrdered", exceptions: "AggregateException", state: "pure projection/reduction preferred", risk: "ordering, merge and partition overhead" },
  { label: "UI marshal", shape: "background result applied to UI", order: "dispatcher queue/context policy", exceptions: "observe before posting or at UI boundary", state: "UI state owned by UI thread", risk: "sync wait creates deadlock or freeze" },
  { label: "lock in body", shape: "parallel iterations serialize on shared gate", order: "lock acquisition dependent", exceptions: "lock still releases via finally", state: "shared bottleneck", risk: "contention can make parallel slower than sequential" },
];

export function CqcParallelContractLab() {
  const [selected, setSelected] = useState(0);
  const item = parallelCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{parallelCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-emerald-500 bg-emerald-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-2">{[["work shape", item.shape], ["ordering", item.order], ["exception", item.exceptions], ["state", item.state]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div><div className="mt-3 border border-rose-500/40 bg-rose-500/10 p-3 text-sm text-primary">risk: {item.risk}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">比较Parallel、WhenAll、PLINQ、UI marshal和parallel-body lock的ordering、fault与state contract。</figcaption></figure>;
}
