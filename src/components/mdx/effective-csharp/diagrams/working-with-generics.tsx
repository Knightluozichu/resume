"use client";

import { useState } from "react";

const algorithmCases = [
  { label: "minimum constraint", need: "compare two T values", contract: "where T : IComparable<T>", specialization: "generic path stays primary", proof: "unsupported T fails compilation" },
  { label: "runtime fast path", need: "byte sequence has a measured vectorized path", contract: "same result for every T", specialization: "typeof(T) == typeof(byte) branch", proof: "differential tests plus benchmark" },
  { label: "ordering", need: "domain natural order", contract: "IComparable<T> is intrinsic; IComparer<T> is contextual", specialization: "multiple comparers remain external", proof: "sign, transitivity and equality consistency" },
  { label: "generic math", need: "static operator on modern .NET", contract: "static abstract interface constraint", specialization: "compile-time member resolution", proof: "target framework and numeric law tests" },
];

export function EcsGenericAlgorithmLab() {
  const [selected, setSelected] = useState(0);
  const item = algorithmCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{algorithmCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-cyan-500 bg-cyan-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-2">{[["algorithm need", item.need], ["type contract", item.contract], ["specialization", item.specialization], ["proof", item.proof]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">最小约束先表达共同能力，runtime specialization只优化可证明等价的hot path。</figcaption></figure>;
}

const capabilityCases = [
  { label: "owned T", position: "container creates or receives ownership", declaration: "where T : IDisposable", lifecycle: "container Dispose cascades exactly once", variance: "invariant because T may be stored and released" },
  { label: "producer", position: "T only leaves the interface", declaration: "IProducer<out T>", lifecycle: "producer owns produced sequence state", variance: "covariant reference conversion" },
  { label: "consumer", position: "T only enters the interface", declaration: "IConsumer<in T>", lifecycle: "caller owns argument unless transferred", variance: "contravariant reference conversion" },
  { label: "method capability", position: "algorithm needs a callable operation", declaration: "Func<T, TResult> parameter", lifecycle: "caller controls capture and reuse", variance: "delegate signature expresses input/output" },
];

export function EcsGenericCapabilityLab() {
  const [selected, setSelected] = useState(1);
  const item = capabilityCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{capabilityCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-emerald-500 bg-emerald-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-2">{[["position", item.position], ["declaration", item.declaration], ["lifecycle", item.lifecycle], ["variance", item.variance]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">从T的输入、输出、存储与释放位置推导constraint、variance和ownership。</figcaption></figure>;
}

const apiCases = [
  { label: "base specialization", smell: "DerivedForString : GenericBase<string>", choice: "composition or overload on the generic API", compatibility: "one substitution contract", test: "generic and special path return identical semantics" },
  { label: "generic method", smell: "class T exists only for one operation", choice: "Move<T>(T value) method", compatibility: "caller infers T", test: "multiple T share the same instance state" },
  { label: "classic interface", smell: "legacy consumer expects IEnumerable", choice: "implement generic plus non-generic bridge", compatibility: "old framework entry remains valid", test: "both enumerators expose same order" },
  { label: "minimal extension", smell: "interface grows convenience members", choice: "extension composed from minimal primitives", compatibility: "implementers need no new member", test: "all implementations pass extension contract" },
  { label: "constructed extension", smell: "helper targets one closed generic shape", choice: "extension on IDictionary<string, T>", compatibility: "narrow discoverable API", test: "no ambiguous overload or namespace collision" },
];

export function EcsGenericApiShapeLab() {
  const [selected, setSelected] = useState(1);
  const item = apiCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{apiCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-violet-500 bg-violet-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-2">{[["smell", item.smell], ["API choice", item.choice], ["compatibility", item.compatibility], ["test", item.test]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">用generic method、compatibility bridge和extension补能力，避免用inheritance伪造specialization。</figcaption></figure>;
}
