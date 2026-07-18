"use client";

import { useState } from "react";

const collectionCases = [
  { label: "variable count", shape: "append-heavy sequence", candidate: "List<T>", operation: "indexed scan + amortized append", boundary: "use array when the length is fixed or an exact snapshot is required" },
  { label: "key lookup", shape: "unique key to value", candidate: "Dictionary<TKey,TValue>", operation: "hash lookup with an explicit comparer", boundary: "key equality and mutation rules are part of the contract" },
  { label: "membership", shape: "unique values", candidate: "HashSet<T>", operation: "contains, union and intersection", boundary: "iteration order is not the value contract" },
  { label: "work queue", shape: "first-in, first-out", candidate: "Queue<T> / Channel<T>", operation: "enqueue and dequeue", boundary: "Channel adds async waiting, backpressure and completion" },
  { label: "shared writes", shape: "multiple concurrent owners", candidate: "ConcurrentDictionary / Channel", operation: "atomic collection operation or message transfer", boundary: "thread-safe members do not make a multi-step workflow atomic" },
];

export function CqcCollectionDecisionLab() {
  const [selected, setSelected] = useState(0);
  const item = collectionCases[selected];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          {collectionCases.map((entry, index) => (
            <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-cyan-500 bg-cyan-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>
              {entry.label}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto_1fr]">
          <div className="border border-border bg-bg p-4"><span className="text-xs text-secondary">required shape</span><strong className="mt-2 block text-sm leading-6 text-primary">{item.shape}</strong></div>
          <div className="flex min-h-12 items-center justify-center text-xl text-cyan-400">→</div>
          <div className="border border-cyan-500/40 bg-cyan-500/10 p-4"><span className="text-xs text-secondary">candidate</span><strong className="mt-2 block text-sm leading-6 text-primary">{item.candidate}</strong></div>
        </div>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <div className="border border-border bg-bg p-3 text-sm text-primary">dominant operation: {item.operation}</div>
          <div className="border border-amber-500/40 bg-amber-500/10 p-3 text-sm text-primary">boundary: {item.boundary}</div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">切换数据shape，先按dominant operation与ownership选集合，再验证复杂度、allocation和并发语义。</figcaption>
    </figure>
  );
}

const enumerationCases = [
  { label: "foreach", intent: "consume every element", guarantee: "works through the enumeration contract", risk: "mutation may invalidate the enumerator", decision: "default for a full read-only traversal" },
  { label: "for", intent: "control index, direction or stride", guarantee: "exposes position and supports reverse traversal", risk: "off-by-one and collection-size changes", decision: "use when the index is part of the algorithm" },
  { label: "initializer", intent: "construct a complete valid value", guarantee: "centralizes creation syntax", risk: "setters may expose invalid intermediate state", decision: "combine with constructors/required members for invariants" },
  { label: "iterator", intent: "stream values lazily", guarantee: "consumer can observe values but cannot assign through Current", risk: "source state can still change between enumerations", decision: "document snapshot, live-view and repeatability semantics" },
  { label: "custom collection", intent: "protect domain invariants", guarantee: "composition exposes only allowed operations", risk: "deriving from List leaks mutation paths", decision: "implement the smallest interface and delegate internally" },
  { label: "property", intent: "expose owned members", guarantee: "read-only interface narrows caller capability", risk: "a getter-only mutable List can still be changed", decision: "return immutable snapshot or controlled read-only view" },
];

export function CqcEnumerationContractLab() {
  const [selected, setSelected] = useState(0);
  const item = enumerationCases[selected];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          {enumerationCases.map((entry, index) => (
            <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-violet-500 bg-violet-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>
              {entry.label}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {[["intent", item.intent], ["guarantee", item.guarantee], ["risk", item.risk], ["decision", item.decision]].map(([title, value]) => (
            <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">比较遍历、初始化、iterator、自定义集合与collection property实际暴露的能力和ownership。</figcaption>
    </figure>
  );
}

const queryCases = [
  { label: "projection", source: "in-memory domain objects", plan: "Select into an anonymous shape", execution: "deferred until enumeration", proof: "project only fields needed by the next local step", warning: "anonymous values should not escape the method boundary" },
  { label: "lambda", source: "IEnumerable<T>", plan: "Where(predicate).Select(selector)", execution: "delegates run in the local process", proof: "tests exercise the actual predicate and ordering", warning: "side effects make repeated enumeration observable" },
  { label: "materialize", source: "expensive or mutable sequence", plan: "ToArray/ToList at an ownership boundary", execution: "one eager pass creates a snapshot", proof: "enumeration counter equals one", warning: "materializing an unbounded stream is invalid" },
  { label: "queryable", source: "remote provider", plan: "expression tree translated by provider", execution: "terminal operation becomes remote query", proof: "inspect generated SQL and round trips", warning: "a compilable method may be untranslatable" },
  { label: "ordering", source: "sequence with a sort policy", plan: "OrderBy/ThenBy with comparer or key selector", execution: "buffering sort before output", proof: "stable tie-breaker and comparer tests", warning: "OrderBy is not a streaming shortcut" },
  { label: "re-enumerate", source: "deferred sequence", plan: "Count + First + foreach", execution: "source and predicates run repeatedly", proof: "trace source reads and side effects", warning: "remote queries may produce multiple round trips" },
];

export function CqcLinqExecutionLab() {
  const [selected, setSelected] = useState(2);
  const item = queryCases[selected];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          {queryCases.map((entry, index) => (
            <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-emerald-500 bg-emerald-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>
              {entry.label}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <div className="border border-border bg-bg p-4"><span className="text-xs text-secondary">source</span><strong className="mt-2 block text-sm leading-6 text-primary">{item.source}</strong></div>
          <div className="border border-border bg-bg p-4"><span className="text-xs text-secondary">query plan</span><strong className="mt-2 block text-sm leading-6 text-primary">{item.plan}</strong></div>
          <div className="border border-border bg-bg p-4"><span className="text-xs text-secondary">execution</span><strong className="mt-2 block text-sm leading-6 text-primary">{item.execution}</strong></div>
        </div>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <div className="border border-emerald-500/40 bg-emerald-500/10 p-3 text-sm text-primary">proof: {item.proof}</div>
          <div className="border border-rose-500/40 bg-rose-500/10 p-3 text-sm text-primary">warning: {item.warning}</div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">从source、expression shape追到execution location，识别deferred execution、translation和重复枚举成本。</figcaption>
    </figure>
  );
}
