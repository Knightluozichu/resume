"use client";

import { useState } from "react";

const interfaceCases = [
  { label: "IEnumerable", members: ["GetEnumerator"], promise: "read sequence", fit: "stream/generator" },
  { label: "ICollection", members: ["Count", "Add", "Remove", "Contains", "CopyTo"], promise: "sized mutable bag", fit: "set-like custom collection" },
  { label: "IList", members: ["ICollection members", "this[int]", "IndexOf", "Insert", "RemoveAt"], promise: "ordered positional mutation", fit: "List<T> / array-like" },
  { label: "IDictionary", members: ["Keys", "Values", "this[TKey]", "Add(key,value)", "TryGetValue"], promise: "unique key lookup", fit: "Dictionary<TKey,TValue>" },
  { label: "read-only", members: ["Count", "index/read operations"], promise: "consumer cannot mutate through view", fit: "IReadOnlyCollection/List" },
];

export function Ec7CollectionCapabilityLab() {
  const [selected, setSelected] = useState(0);
  const item = interfaceCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{interfaceCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-cyan-500 bg-cyan-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-[2fr_1fr]"><div className="flex flex-wrap gap-2 border border-border bg-bg p-4">{item.members.map(member => <span key={member} className="border border-violet-500/40 bg-violet-500/10 px-3 py-2 text-xs text-primary">{member}</span>)}</div><div className="border border-border bg-bg p-4"><span className="text-xs text-secondary">contract</span><strong className="mt-2 block text-sm text-primary">{item.promise}</strong><span className="mt-4 block text-xs text-secondary">best fit</span><strong className="mt-2 block text-sm text-primary">{item.fit}</strong></div></div></div><figcaption className="mt-2 text-center text-sm text-secondary">切换collection interfaces，比较暴露能力、mutation承诺与适用data shape。</figcaption></figure>;
}

const accessCases = [
  { label: "list index", expression: "items[2]", path: "bounds check → positional lookup", success: "third element", failure: "out of range throws" },
  { label: "dictionary index", expression: "map[\"Ada\"]", path: "hash → bucket → equality", success: "value for existing key", failure: "missing key throws" },
  { label: "TryGetValue", expression: "map.TryGetValue(key, out value)", path: "single key lookup", success: "true + value", failure: "false + default value" },
  { label: "empty return", expression: "FindAll() → Array.Empty<T>()", path: "valid result with Count=0", success: "foreach requires no guard", failure: "none; absence represented by empty sequence" },
  { label: "null return", expression: "FindAll() → null", path: "caller must branch", success: "ambiguous absence", failure: "foreach causes NullReferenceException" },
];

export function Ec7IndexerEmptyContractLab() {
  const [selected, setSelected] = useState(0);
  const item = accessCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{accessCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-amber-500 bg-amber-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><code className="mt-4 block border border-border bg-bg p-4 text-sm text-primary">{item.expression}</code><div className="mt-3 grid gap-3 md:grid-cols-3">{[["lookup path", item.path], ["success", item.success], ["failure", item.failure]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">切换indexer/lookup/empty cases，比较访问成本、missing policy与caller ergonomics。</figcaption></figure>;
}

const iteratorCases = [
  { label: "call method", state: "iterator object created", code: "Filter(source)", result: "body has not run" },
  { label: "MoveNext 1", state: "enter body; scan 1,2", code: "yield return 2", result: "suspend with Current=2" },
  { label: "MoveNext 2", state: "resume after first yield; scan 3,4", code: "yield return 4", result: "suspend with Current=4" },
  { label: "complete", state: "resume; source exhausted", code: "reach method end", result: "MoveNext=false" },
  { label: "break early", state: "consumer stops after first", code: "enumerator.Dispose()", result: "iterator finally blocks execute" },
];

export function Ec7IteratorStateMachineLab() {
  const [selected, setSelected] = useState(0);
  const item = iteratorCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{iteratorCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-violet-500 bg-violet-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-3"><div className="border border-border bg-bg p-4"><span className="text-xs text-secondary">state</span><strong className="mt-2 block text-sm text-primary">{item.state}</strong></div><code className="border border-cyan-500/40 bg-cyan-500/10 p-4 text-sm text-primary">{item.code}</code><div className="border border-emerald-500/40 bg-emerald-500/10 p-4"><span className="text-xs text-secondary">observable result</span><strong className="mt-2 block text-sm text-primary">{item.result}</strong></div></div></div><figcaption className="mt-2 text-center text-sm text-secondary">推进yield iterator的创建、暂停、恢复、完成与early Dispose状态。</figcaption></figure>;
}
