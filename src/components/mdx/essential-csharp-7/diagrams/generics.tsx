"use client";

import { useState } from "react";

const collectionCases = [
  { label: "object + int", store: "items.Add(42)", representation: "box Int32 into object", read: "(int)items[0] → 42", risk: "allocation + runtime cast" },
  { label: "object + text", store: "items.Add(\"42\")", representation: "string reference as object", read: "(int)items[0] → InvalidCastException", risk: "wrong type accepted at Add" },
  { label: "List<int>", store: "items.Add(42)", representation: "Int32 element", read: "items[0] → 42", risk: "wrong type rejected at compile time" },
  { label: "List<string>", store: "items.Add(\"42\")", representation: "string reference", read: "items[0] → \"42\"", risk: "no element cast" },
];

export function Ec7ObjectGenericCollectionLab() {
  const [selected, setSelected] = useState(0);
  const item = collectionCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{collectionCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-cyan-500 bg-cyan-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-2">{[["store", item.store], ["representation", item.representation], ["read", item.read], ["boundary", item.risk]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">切换object/generic collections，比较type check时机、cast与boxing。</figcaption></figure>;
}

const constraintCases = [
  { label: "none", declaration: "T Echo<T>(T value)", legal: "assignment/object members", rejected: "cannot call CompareTo", inference: "Echo(7) → T is int" },
  { label: "class", declaration: "where T : class", legal: "null/reference semantics", rejected: "Echo<int>(7)", inference: "reference type required" },
  { label: "struct", declaration: "where T : struct", legal: "non-nullable value type", rejected: "string and int?", inference: "value type required" },
  { label: "interface", declaration: "where T : IComparable<T>", legal: "left.CompareTo(right)", rejected: "type without contract", inference: "arguments infer one T" },
  { label: "new()", declaration: "where T : new()", legal: "new T()", rejected: "abstract/no public parameterless ctor", inference: "constructor constraint last" },
];

export function Ec7ConstraintInferenceLab() {
  const [selected, setSelected] = useState(3);
  const item = constraintCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{constraintCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-11 border px-2 text-xs ${selected === index ? "border-amber-500 bg-amber-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><code className="mt-4 block border border-border bg-bg p-4 text-sm text-primary">{item.declaration}</code><div className="mt-3 grid gap-3 md:grid-cols-3"><div className="border border-emerald-500/40 bg-emerald-500/10 p-4 text-sm text-primary">legal: {item.legal}</div><div className="border border-red-500/40 bg-red-500/10 p-4 text-sm text-primary">rejected: {item.rejected}</div><div className="border border-violet-500/40 bg-violet-500/10 p-4 text-sm text-primary">inference: {item.inference}</div></div></div><figcaption className="mt-2 text-center text-sm text-secondary">切换where constraints，观察generic body能力、call-site rejection与type inference。</figcaption></figure>;
}

const varianceCases = [
  { label: "covariant out", source: "IEnumerable<Cat>", target: "IEnumerable<Animal>", direction: "producer: Cat → Animal", result: "safe implicit conversion" },
  { label: "contravariant in", source: "Action<Animal>", target: "Action<Cat>", direction: "consumer accepts every Animal, therefore Cat", result: "safe implicit conversion" },
  { label: "invariant", source: "List<Cat>", target: "List<Animal>", direction: "list both consumes and produces T", result: "compile-time rejection" },
  { label: "constructed types", source: "Cache<int>", target: "Cache<string>", direction: "same generic definition, distinct closed types", result: "separate type identity/static state" },
  { label: "open type", source: "typeof(Dictionary<,>)", target: "Dictionary<string,int>", direction: "open definition → closed constructed type", result: "runtime metadata preserves arguments" },
];

export function Ec7VarianceRuntimeLab() {
  const [selected, setSelected] = useState(0);
  const item = varianceCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-2 gap-2 sm:grid-cols-5">{varianceCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-violet-500 bg-violet-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto_1fr]"><div className="border border-cyan-500/40 bg-cyan-500/10 p-4 text-center text-sm text-primary">{item.source}</div><div className="flex items-center justify-center text-xl text-secondary">→</div><div className="border border-amber-500/40 bg-amber-500/10 p-4 text-center text-sm text-primary">{item.target}</div></div><div className="mt-3 grid gap-3 md:grid-cols-2"><div className="border border-border bg-bg p-3 text-sm text-secondary">{item.direction}</div><strong className="border border-emerald-500/40 bg-emerald-500/10 p-3 text-sm text-primary">{item.result}</strong></div></div><figcaption className="mt-2 text-center text-sm text-secondary">切换variance与constructed type cases，验证转换方向和runtime type identity。</figcaption></figure>;
}
