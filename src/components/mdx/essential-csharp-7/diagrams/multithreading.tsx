"use client";

import { useState } from "react";

const interleavings = [
  { label: "serial", lanes: [["T1 read 0", "T1 write 1"], ["T2 read 1", "T2 write 2"]], result: "counter=2", cause: "no overlap" },
  { label: "lost update", lanes: [["T1 read 0", "T1 write 1"], ["T2 read 0", "T2 write 1"]], result: "counter=1", cause: "read-modify-write interleaved" },
  { label: "Thread", lanes: [["allocate dedicated thread", "Start", "Join"], ["OS scheduling", "foreground/background lifetime"]], result: "explicit thread identity", cause: "higher creation/context cost" },
  { label: "ThreadPool", lanes: [["queue work item", "worker picks work"], ["pool reuses workers", "no per-work Join"]], result: "throughput-oriented scheduling", cause: "avoid blocking pool workers" },
];

export function Ec7ThreadInterleavingLab() {
  const [selected, setSelected] = useState(1);
  const item = interleavings[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{interleavings.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-cyan-500 bg-cyan-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-2">{item.lanes.map((lane, laneIndex) => <div key={laneIndex} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">lane {laneIndex + 1}</span>{lane.map((step, index) => <div key={step} className="mt-2 border border-violet-500/40 bg-violet-500/10 p-2 text-xs text-primary"><span className="mr-2 text-cyan-400">{index + 1}</span>{step}</div>)}</div>)}</div><div className="mt-3 grid gap-3 md:grid-cols-2"><strong className="border border-emerald-500/40 bg-emerald-500/10 p-3 text-sm text-primary">{item.result}</strong><div className="border border-border bg-bg p-3 text-sm text-secondary">{item.cause}</div></div></div><figcaption className="mt-2 text-center text-sm text-secondary">切换interleaving与scheduler，观察race结果和Thread/ThreadPool ownership。</figcaption></figure>;
}

const taskCases = [
  { label: "async I/O", call: "Task<string> task = ReadAsync(token)", timeline: ["method runs synchronously", "await incomplete I/O", "return Task to caller", "resume continuation"], terminal: "RanToCompletion" },
  { label: "already complete", call: "await Task.FromResult(42)", timeline: ["get awaiter", "IsCompleted=true", "continue synchronously", "return result"], terminal: "RanToCompletion" },
  { label: "cancel", call: "cts.Cancel(); await operation", timeline: ["token signaled", "operation observes token", "throw OperationCanceledException", "Task records cancellation"], terminal: "Canceled" },
  { label: "fault", call: "await FaultingAsync()", timeline: ["operation throws", "Task stores exception", "await rethrows original", "caller catch handles"], terminal: "Faulted" },
  { label: "TAP violation", call: "Task.Run(() => BlockingIo())", timeline: ["consume pool thread", "block waiting I/O", "extra scheduling", "poor scalability"], terminal: "Task shape, wrong implementation" },
];

export function Ec7TaskCancellationLab() {
  const [selected, setSelected] = useState(0);
  const item = taskCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{taskCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-amber-500 bg-amber-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><code className="mt-4 block border border-border bg-bg p-4 text-sm text-primary">{item.call}</code><div className="mt-3 grid gap-2 md:grid-cols-4">{item.timeline.map((step, index) => <div key={step} className="border border-border bg-bg p-3 text-xs text-secondary"><span className="mr-2 text-cyan-400">{index + 1}</span>{step}</div>)}</div><strong className="mt-3 block border border-violet-500/40 bg-violet-500/10 p-3 text-sm text-primary">terminal: {item.terminal}</strong></div><figcaption className="mt-2 text-center text-sm text-secondary">切换async/await/cancellation/fault cases，读取Task状态、continuation和TAP边界。</figcaption></figure>;
}

const parallelCases = [
  { label: "sequential", source: "8 items", partition: "one ordered loop", order: "source order", risk: "baseline time; no coordination" },
  { label: "Parallel.ForEach", source: "8 CPU-heavy items", partition: "dynamic ranges across workers", order: "completion unspecified", risk: "shared writes/race; aggregate failures" },
  { label: "PLINQ", source: "source.AsParallel()", partition: "query partitions + merge", order: "unordered unless AsOrdered", risk: "partition/merge overhead" },
  { label: "small work", source: "8 trivial items", partition: "scheduling exceeds work", order: "parallel adds no value", risk: "slower than sequential" },
  { label: "canceled", source: "large query + token", partition: "workers observe cancellation", order: "partial work may have run", risk: "OperationCanceledException / cleanup" },
];

export function Ec7ParallelPartitionLab() {
  const [selected, setSelected] = useState(1);
  const item = parallelCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{parallelCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-violet-500 bg-violet-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-2">{[["source/work", item.source], ["partition", item.partition], ["ordering", item.order], ["cost/failure", item.risk]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">切换sequential/parallel cases，比较partition、ordering、cancellation与overhead。</figcaption></figure>;
}
