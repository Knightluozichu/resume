"use client";

import { useState } from "react";

const phaseCases = [
  { label: "01 Language", range: "Ch 1-5", chapters: "Introducing C# · Data Types · More with Data Types · Operators/Control Flow · Methods/Parameters", dependency: "source → values → expressions → decisions → callable contracts", gate: "trace value flow, overload binding and parameter effects without running code" },
  { label: "02 Types", range: "Ch 6-11", chapters: "Classes · Inheritance · Interfaces · Value Types · Well-Formed Types · Exceptions", dependency: "construct invariant → substitute safely → expose capability → own value semantics → obey object contracts → preserve failure evidence", gate: "design one well-formed public type and defend equality, disposal and exception policy" },
  { label: "03 Abstraction", range: "Ch 12-18", chapters: "Generics · Delegates/Lambdas · Events · Collection Interfaces/Operators · Query Expressions · Custom Collections · Reflection/Dynamic", dependency: "parameterize type → pass behavior → publish notifications → enumerate/query → build protocol → inspect metadata", gate: "implement a typed collection/query pipeline with lifecycle-safe events" },
  { label: "04 Boundaries", range: "Ch 19-21", chapters: "Multithreading · Thread Synchronization · Platform Interop/Unsafe", dependency: "schedule operations → protect shared invariants → cross ABI and memory lifetime boundaries", gate: "prove cancellation, lock/timer behavior, buffer ownership and callback lifetime" },
  { label: "05 Runtime", range: "Ch 22", chapters: "The Common Language Infrastructure", dependency: "source → CIL/metadata assembly → loader → JIT/AOT → runtime services", gate: "locate a failure in contract, artifact, loader, native code or execution stage" },
];

export function Ec7OfficialChapterMapLab() {
  const [selected, setSelected] = useState(0);
  const item = phaseCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{phaseCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-cyan-500 bg-cyan-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-[0.35fr_1.65fr]"><div className="grid place-items-center border border-border bg-bg p-4"><strong className="text-xl text-primary">{item.range}</strong></div><div className="border border-border bg-bg p-4"><span className="text-xs text-secondary">official chapters</span><strong className="mt-2 block text-sm leading-6 text-primary">{item.chapters}</strong></div></div><div className="mt-3 grid gap-3 md:grid-cols-2"><div className="border border-violet-500/40 bg-violet-500/10 p-3 text-sm text-primary">dependency: {item.dependency}</div><div className="border border-emerald-500/40 bg-emerald-500/10 p-3 text-sm text-primary">phase gate: {item.gate}</div></div></div><figcaption className="mt-2 text-center text-sm text-secondary">按官方22章切换五阶段，查看每段依赖链与可交付验收门槛。</figcaption></figure>;
}

const routeCases = [
  { label: "language fluency", path: ["Ch 1-5", "Ch 9-11", "Ch 22"], focus: "binding, values, control, methods, object contracts, runtime artifact", proof: "explain compiler/runtime boundary for a small console program" },
  { label: "library design", path: ["Ch 6-14", "Ch 17", "Ch 18"], focus: "invariants, inheritance/interface, equality, exceptions, generics, delegates", proof: "publish a minimal API with tests for substitution, equality and lifecycle" },
  { label: "query pipeline", path: ["Ch 12-17", "Ch 18"], focus: "generic protocols, delegates, enumeration, deferred queries, iterators", proof: "predict execution timing, buffering, mutation and provider boundary" },
  { label: "concurrency", path: ["Ch 13-14", "Ch 19-20", "Ch 11"], focus: "callback ownership, Task/cancellation, synchronization and failure propagation", proof: "draw operation timeline and wait-for graph under cancel/fault" },
  { label: "native/runtime", path: ["Ch 9-10", "Ch 18", "Ch 21-22"], focus: "layout/lifetime, metadata, ABI, unsafe pointers, assembly/JIT/AOT", proof: "audit one P/Invoke wrapper from header through loader and callback disposal" },
];

export function Ec7DependencyRouteLab() {
  const [selected, setSelected] = useState(0);
  const item = routeCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{routeCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-violet-500 bg-violet-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 flex flex-wrap items-center justify-center gap-2">{item.path.map((stage, index) => <div key={stage} className="contents"><strong className="min-w-24 border border-border bg-bg p-3 text-center text-sm text-primary">{stage}</strong>{index < item.path.length - 1 ? <span className="text-violet-400">→</span> : null}</div>)}</div><div className="mt-4 grid gap-3 md:grid-cols-2"><div className="border border-border bg-bg p-3 text-sm text-secondary">focus: {item.focus}</div><div className="border border-emerald-500/40 bg-emerald-500/10 p-3 text-sm text-primary">proof: {item.proof}</div></div></div><figcaption className="mt-2 text-center text-sm text-secondary">选择目标路线，得到必须补齐的章节依赖与最终能力证据。</figcaption></figure>;
}

const checkpointCases = [
  { label: "predict", artifact: "written outcome before execution", test: "value/overload/control-flow trace", failure: "cannot state which rule selects the result", action: "return to the exact earlier chapter, not a random syntax tutorial" },
  { label: "implement", artifact: "small executable slice", test: "happy path plus boundary/failure case", failure: "sample only demonstrates one valid input", action: "add observable assertions and resource cleanup" },
  { label: "inspect", artifact: "debugger, CIL, metadata or timeline evidence", test: "compare mental model with runtime artifact", failure: "explanation depends on folklore such as stack vs heap slogans", action: "name the actual identity, lifetime and execution stage" },
  { label: "explain", artifact: "one-page contract and invariant note", test: "another reader predicts behavior from it", failure: "lists keywords without causal chain", action: "write input → rule → state transition → output/failure" },
  { label: "integrate", artifact: "cross-chapter capstone", test: "fault, cancel, concurrency and deployment scenarios", failure: "features work alone but ownership conflicts when combined", action: "draw producer/consumer and owner/release chains" },
];

export function Ec7StudyCheckpointLab() {
  const [selected, setSelected] = useState(0);
  const item = checkpointCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{checkpointCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-amber-500 bg-amber-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-2">{[["artifact", item.artifact], ["acceptance test", item.test], ["failure signal", item.failure], ["next action", item.action]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">把学习从“读过”转换为预测、实现、检查、解释与整合五类证据。</figcaption></figure>;
}
