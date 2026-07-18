"use client";

import { useState } from "react";

const equalityCases = [
  { label: "same value", left: "Money(10, USD)", right: "Money(10, USD)", equals: true, hash: "same hash required", op: "== true", collection: "one logical dictionary key" },
  { label: "different amount", left: "Money(10, USD)", right: "Money(12, USD)", equals: false, hash: "may differ", op: "== false", collection: "two values" },
  { label: "different currency", left: "Money(10, USD)", right: "Money(10, EUR)", equals: false, hash: "currency participates", op: "== false", collection: "two domains" },
  { label: "mutable key", left: "key before: 10 USD", right: "same object after: 12 USD", equals: false, hash: "bucket changed", op: "lookup may fail", collection: "invalid key design" },
];

export function Ec7EqualityContractLab() {
  const [selected, setSelected] = useState(0);
  const item = equalityCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{equalityCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-cyan-500 bg-cyan-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-2"><div className="border border-border bg-bg p-4 text-sm text-primary">left: {item.left}<br/>right: {item.right}</div><div className={`border p-4 text-sm ${item.equals ? "border-emerald-500/40 bg-emerald-500/10" : "border-violet-500/40 bg-violet-500/10"} text-primary`}>Equals → {String(item.equals)}<br/>{item.op}</div></div><div className="mt-3 grid gap-2 md:grid-cols-2"><div className="border border-border bg-bg p-3 text-xs text-secondary">GetHashCode: {item.hash}</div><div className="border border-border bg-bg p-3 text-xs text-secondary">collection: {item.collection}</div></div></div><figcaption className="mt-2 text-center text-sm text-secondary">切换value cases，验证Equals、GetHashCode、operators与hashed collection的一致契约。</figcaption></figure>;
}

const compilationCases = [
  { label: "namespace", source: "using Billing; Money value;", requirement: "compiler resolves full type name Billing.Money", output: "source organization only" },
  { label: "assembly ref", source: "<Reference Include=\"Billing.Core\" />", requirement: "metadata assembly available at compile time", output: "type/member identities become resolvable" },
  { label: "NuGet", source: "PackageReference Billing.Core 2.1.0", requirement: "restore package assets for target framework", output: "assembly references + transitive assets" },
  { label: "XML docs", source: "/// <summary>Represents money.</summary>", requirement: "compiler emits documentation XML when enabled", output: "IDE/tooling contract beside assembly" },
];

export function Ec7AssemblyDocumentationLab() {
  const [selected, setSelected] = useState(0);
  const item = compilationCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{compilationCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-amber-500 bg-amber-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><code className="mt-4 block border border-border bg-bg p-4 text-sm text-primary">{item.source}</code><div className="mt-3 grid gap-3 md:grid-cols-2"><div className="border border-violet-500/40 bg-violet-500/10 p-4 text-sm text-primary">required: {item.requirement}</div><div className="border border-emerald-500/40 bg-emerald-500/10 p-4 text-sm text-primary">result: {item.output}</div></div></div><figcaption className="mt-2 text-center text-sm text-secondary">切换namespace/reference/package/docs，区分name lookup、binary dependency与tooling artifact。</figcaption></figure>;
}

const lifetimeCases = [
  { label: "reachable", state: "strong root → object", action: "GC keeps object", evidence: "memory remains managed; no cleanup signal" },
  { label: "unreachable", state: "no strong path", action: "GC may reclaim later", evidence: "timing nondeterministic" },
  { label: "Dispose", state: "using scope exits", action: "Dispose runs now", evidence: "file/socket handle released deterministically" },
  { label: "finalizer", state: "unreachable finalizable object", action: "queued, later finalizer", evidence: "fallback only; delays reclamation" },
  { label: "weak ref", state: "WeakReference only", action: "target may disappear", evidence: "TryGetTarget required each use" },
  { label: "Lazy", state: "factory not invoked", action: "first Value initializes", evidence: "success/value or cached failure depends on mode" },
];

export function Ec7LifetimeLazyLab() {
  const [selected, setSelected] = useState(0);
  const item = lifetimeCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 gap-2 sm:grid-cols-6">{lifetimeCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-11 border px-2 text-xs ${selected === index ? "border-violet-500 bg-violet-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-3">{[["state", item.state], ["transition", item.action], ["evidence", item.evidence]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">切换GC/resource/lazy状态，区分reachability、deterministic cleanup与deferred creation。</figcaption></figure>;
}
