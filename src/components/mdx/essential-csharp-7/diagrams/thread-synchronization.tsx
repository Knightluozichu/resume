"use client";

import { useState } from "react";

const criticalCases = [
  { label: "unsynchronized", lanes: [["T1 read A=100", "T1 A=90"], ["T2 read A=100", "T2 A=80"]], invariant: "expected total preserved", result: "lost update / invalid balance" },
  { label: "lock transfer", lanes: [["T1 acquire gate", "update A and B", "release"], ["T2 waits", "acquire after T1", "update atomically"]], invariant: "A+B unchanged at lock boundaries", result: "serial critical sections" },
  { label: "Interlocked", lanes: [["T1 Increment(ref count)", "atomic RMW"], ["T2 Increment(ref count)", "atomic RMW"]], invariant: "single integer operation", result: "no lost increment" },
  { label: "wrong lock", lanes: [["T1 lock gateA", "update shared state"], ["T2 lock gateB", "update same state"]], invariant: "locks do not coordinate", result: "race remains" },
];

export function Ec7CriticalSectionLab() {
  const [selected, setSelected] = useState(1);
  const item = criticalCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{criticalCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-cyan-500 bg-cyan-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-2">{item.lanes.map((lane, laneIndex) => <div key={laneIndex} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">thread {laneIndex + 1}</span>{lane.map((step, index) => <div key={step} className="mt-2 border border-violet-500/40 bg-violet-500/10 p-2 text-xs text-primary"><span className="mr-2 text-cyan-400">{index + 1}</span>{step}</div>)}</div>)}</div><div className="mt-3 grid gap-3 md:grid-cols-2"><div className="border border-border bg-bg p-3 text-sm text-secondary">invariant: {item.invariant}</div><strong className="border border-emerald-500/40 bg-emerald-500/10 p-3 text-sm text-primary">{item.result}</strong></div></div><figcaption className="mt-2 text-center text-sm text-secondary">切换race/lock/Interlocked cases，观察临界区、同一gate与invariant恢复。</figcaption></figure>;
}

const primitiveCases = [
  { label: "lock", owner: "one process object monitor", waiting: "blocks until mutual exclusion", fit: "multi-step in-memory invariant", risk: "hold short; never await/unknown callback" },
  { label: "Monitor wait", owner: "same monitor + condition queue", waiting: "Wait releases lock; Pulse wakes waiter to recheck", fit: "condition-based producer/consumer", risk: "always loop on predicate" },
  { label: "Interlocked", owner: "single memory location", waiting: "lock-free atomic primitive", fit: "increment/exchange/compare-exchange", risk: "not multi-field transaction" },
  { label: "SemaphoreSlim", owner: "permit count", waiting: "sync/async wait for capacity", fit: "bound concurrency", risk: "release exactly once" },
  { label: "deadlock", owner: "T1 owns A; T2 owns B", waiting: "T1 waits B; T2 waits A", fit: "none", risk: "global lock order or timeout/cancellation" },
];

export function Ec7SynchronizationPrimitiveLab() {
  const [selected, setSelected] = useState(0);
  const item = primitiveCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{primitiveCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-amber-500 bg-amber-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-2">{[["ownership/state", item.owner], ["waiting behavior", item.waiting], ["best fit", item.fit], ["risk/control", item.risk]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">切换同步原语与deadlock，比较owner、wait semantics、适用范围和风险。</figcaption></figure>;
}

const timerCases = [
  { label: "normal tick", schedule: "due=0, period=1000ms", callback: "finishes in 200ms", overlap: "none", lifetime: "keep Timer reference" },
  { label: "overlap", schedule: "period=1000ms", callback: "takes 1500ms", overlap: "next pool callback starts before prior ends", lifetime: "shared state needs guard" },
  { label: "non-reentrant", schedule: "one-shot; callback reschedules", callback: "finish then Change(next)", overlap: "prevented by design", lifetime: "handle dispose race" },
  { label: "gate callback", schedule: "periodic", callback: "Interlocked.Exchange running flag", overlap: "extra tick skips or queues by policy", lifetime: "reset flag in finally" },
  { label: "dispose", schedule: "stop future callbacks", callback: "in-flight callback may still run", overlap: "wait/coordination may be required", lifetime: "Dispose timer and owned resources" },
];

export function Ec7TimerReentrancyLab() {
  const [selected, setSelected] = useState(0);
  const item = timerCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{timerCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-violet-500 bg-violet-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-2">{[["schedule", item.schedule], ["callback", item.callback], ["overlap", item.overlap], ["lifetime", item.lifetime]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">切换timer tick、overlap、gating和Dispose，观察callback reentrancy与lifetime。</figcaption></figure>;
}
