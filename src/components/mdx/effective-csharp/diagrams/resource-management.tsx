"use client";

import { useState } from "react";

const lifetimeCases = [
  { label: "managed memory", owner: "GC traces reachability", release: "collector reclaims memory", fallback: "none needed", failure: "assuming GC closes scarce handles promptly" },
  { label: "owned stream", owner: "creator/container", release: "Dispose or await using", fallback: "underlying SafeHandle where applicable", failure: "container forgets to cascade disposal" },
  { label: "borrowed service", owner: "DI scope/caller", release: "do not dispose in borrower", fallback: "owner controls lifecycle", failure: "double-dispose or ending a shared scope" },
  { label: "native handle", owner: "SafeHandle wrapper", release: "deterministic Dispose", fallback: "SafeHandle finalizer", failure: "raw IntPtr plus fragile application finalizer" },
  { label: "temporary buffer", owner: "method scope", release: "return pool lease in finally", fallback: "none", failure: "retaining oversized objects without evidence" },
];

export function EcsLifetimeOwnershipLab() {
  const [selected, setSelected] = useState(1);
  const item = lifetimeCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{lifetimeCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-emerald-500 bg-emerald-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-2">{[["owner", item.owner], ["deterministic release", item.release], ["fallback", item.fallback], ["failure to test", item.failure]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">GC只管理managed memory；资源是否释放取决于ownership、deterministic scope和SafeHandle边界。</figcaption></figure>;
}

const initCases = [
  { label: "member default", trigger: "every construction path", place: "field/property initializer", invariant: "same safe default before constructor body", fault: "simple and local to the member" },
  { label: "constructor input", trigger: "caller supplies required state", place: "one chained primary constructor", invariant: "validate once before publish", fault: "argument-specific exception" },
  { label: "static data", trigger: "first type use", place: "static initializer or constructor", invariant: "single type-wide initialization", fault: "failure poisons type initialization" },
  { label: "expensive shared", trigger: "first actual demand", place: "Lazy<T> or host startup", invariant: "explicit retry/lifetime policy", fault: "observable dependency failure" },
  { label: "duplicate paths", trigger: "multiple overloads", place: "constructor chaining/factory", invariant: "one source of initialization truth", fault: "tests cover every public entry" },
];

export function EcsInitializationPathLab() {
  const [selected, setSelected] = useState(0);
  const item = initCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{initCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-cyan-500 bg-cyan-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-2">{[["trigger", item.trigger], ["placement", item.place], ["invariant", item.invariant], ["failure contract", item.fault]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">把初始化放在唯一、可预测且失败语义明确的路径，防止overload和static state漂移。</figcaption></figure>;
}

const constructionCases = [
  { label: "base ctor call", state: "derived fields are not initialized", dispatch: "virtual call can reach derived override", result: "override observes partial object", repair: "constructor establishes base invariants only" },
  { label: "factory phase", state: "complete object exists", dispatch: "explicit Initialize/Start after construction", result: "override sees valid state", repair: "separate creation from activation" },
  { label: "extra allocation", state: "object created in a repeated path", dispatch: "allocation and GC add cost", result: "optimize only after measurement", repair: "reuse immutable/cache/pool with bounded ownership" },
  { label: "dispose twice", state: "owner and fallback paths converge", dispatch: "Dispose may be called repeatedly", result: "second call must be harmless", repair: "idempotent guard and cascade once" },
];

export function EcsConstructionSafetyLab() {
  const [selected, setSelected] = useState(0);
  const item = constructionCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{constructionCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-rose-500 bg-rose-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-2">{[["state", item.state], ["dispatch/lifetime", item.dispatch], ["observable result", item.result], ["repair", item.repair]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">构造、激活、复用和释放分成明确阶段，避免partial object与重复ownership。</figcaption></figure>;
}
