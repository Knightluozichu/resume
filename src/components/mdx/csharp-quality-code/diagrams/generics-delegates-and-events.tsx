"use client";

import { useState } from "react";

const genericCases = [
  { label: "object API", contract: "accept object and cast later", compiler: "cannot prove element/return relationship", runtime: "casts, boxing and delayed type errors", decision: "replace repeated type switching with a generic contract" },
  { label: "generic API", contract: "T flows from input to output", compiler: "preserves type identity at every call", runtime: "specialized value-type code may avoid boxing", decision: "prefer when behavior is uniform across types" },
  { label: "static<T>", contract: "one static state per closed generic type", compiler: "Cache<User> and Cache<Order> are distinct", runtime: "initialization and memory multiply by closed type", decision: "keep only state intentionally partitioned by T" },
  { label: "constraint", contract: "where T : interface/base/new()/notnull", compiler: "permits operations guaranteed by the constraint", runtime: "invalid type arguments fail before body execution", decision: "state the minimum capability actually required" },
  { label: "default", contract: "zero/null bit-pattern semantics of T", compiler: "default(T) is legal without knowing T", runtime: "may be invalid for the domain", decision: "use for storage initialization, not as an unchecked business value" },
];

export function CqcGenericContractLab() {
  const [selected, setSelected] = useState(1);
  const item = genericCases[selected];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
          {genericCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-cyan-500 bg-cyan-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {[["contract", item.contract], ["compiler proof", item.compiler], ["runtime effect", item.runtime], ["decision", item.decision]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">比较object、generic、per-T static、constraint与default，区分compile-time proof和runtime/domain语义。</figcaption>
    </figure>
  );
}

const delegateCases = [
  { label: "FCL delegate", source: "Func<T,TResult> / Action<T> / Predicate<T>", binding: "typed callable value", lifetime: "owned like any other object", boundary: "use a named delegate when parameter meaning needs a domain name or ref/out shape" },
  { label: "lambda", source: "expression or statement body", binding: "compiler converts to a compatible delegate/expression", lifetime: "non-capturing may be cached; do not assume", boundary: "extract a method when logic is long, reused or independently named" },
  { label: "closure", source: "lambda references an outer local", binding: "captures a variable slot, not necessarily its current value", lifetime: "captured state can outlive the declaring stack frame", boundary: "copy loop state deliberately and avoid retaining large owners" },
  { label: "multicast", source: "delegate combination", binding: "ordered invocation list", lifetime: "immutable delegate values are combined/removed", boundary: "one thrown exception stops later handlers unless policy says otherwise" },
  { label: "event", source: "publisher event + subscribers", binding: "outside code may only add/remove handlers", lifetime: "subscription retains target until removed or publisher dies", boundary: "publisher alone raises; define unsubscribe and failure policy" },
];

export function CqcDelegateEventLab() {
  const [selected, setSelected] = useState(2);
  const item = delegateCases[selected];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
          {delegateCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-violet-500 bg-violet-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto_1fr]">
          <div className="border border-border bg-bg p-4"><span className="text-xs text-secondary">source</span><strong className="mt-2 block text-sm leading-6 text-primary">{item.source}</strong></div>
          <div className="flex min-h-12 items-center justify-center text-xl text-violet-400">→</div>
          <div className="border border-violet-500/40 bg-violet-500/10 p-4"><span className="text-xs text-secondary">binding</span><strong className="mt-2 block text-sm leading-6 text-primary">{item.binding}</strong></div>
        </div>
        <div className="mt-3 grid gap-3 md:grid-cols-2"><div className="border border-border bg-bg p-3 text-sm text-primary">lifetime: {item.lifetime}</div><div className="border border-amber-500/40 bg-amber-500/10 p-3 text-sm text-primary">boundary: {item.boundary}</div></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">追踪delegate的target、captured state、invocation list与event subscription lifetime。</figcaption>
    </figure>
  );
}

const varianceCases = [
  { label: "invariant", relation: "Dog : Animal", source: "IList<Dog>", target: "IList<Animal>", result: "rejected", reason: "target could insert Cat into a Dog list" },
  { label: "covariant out", relation: "Dog : Animal", source: "IEnumerable<Dog>", target: "IEnumerable<Animal>", result: "allowed", reason: "interface only produces T values" },
  { label: "contravariant in", relation: "Dog : Animal", source: "IComparer<Animal>", target: "IComparer<Dog>", result: "allowed", reason: "consumer that accepts any Animal can accept Dog" },
  { label: "return variance", relation: "Dog : Animal", source: "method returns Dog", target: "Func<Animal>", result: "allowed", reason: "caller promised only an Animal result" },
  { label: "parameter variance", relation: "Dog : Animal", source: "handler accepts Animal", target: "Action<Dog>", result: "allowed", reason: "handler can consume every Dog supplied" },
];

export function CqcVarianceFlowLab() {
  const [selected, setSelected] = useState(1);
  const item = varianceCases[selected];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
          {varianceCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-emerald-500 bg-emerald-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}
        </div>
        <div className="mt-4 text-center text-xs text-secondary">{item.relation}</div>
        <div className="mt-2 grid gap-3 md:grid-cols-[1fr_auto_1fr_auto]">
          <div className="border border-border bg-bg p-4 text-center text-sm font-semibold text-primary">{item.source}</div>
          <div className="flex min-h-12 items-center justify-center text-xl text-emerald-400">→</div>
          <div className="border border-border bg-bg p-4 text-center text-sm font-semibold text-primary">{item.target}</div>
          <div className={`flex min-h-12 items-center justify-center border px-4 text-sm font-bold ${item.result === "allowed" ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400" : "border-rose-500/40 bg-rose-500/10 text-rose-400"}`}>{item.result}</div>
        </div>
        <div className="mt-3 border border-border bg-bg p-3 text-sm text-primary">reason: {item.reason}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">切换invariance、interface variance和delegate variance，用producer/consumer位置证明conversion是否类型安全。</figcaption>
    </figure>
  );
}
