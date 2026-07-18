"use client";

import { useState } from "react";

const initializerCases = [
  { label: "list", source: "new List<int> { 3, 1, 2 }", calls: ["construct List<int>()", "Add(3)", "Add(1)", "Add(2)"], result: "Count=3; insertion order retained" },
  { label: "dictionary", source: "new Dictionary<string,int> { { \"A\", 1 }, { \"B\", 2 } }", calls: ["construct Dictionary", "Add(\"A\",1)", "Add(\"B\",2)"], result: "duplicate key would throw during initialization" },
  { label: "custom", source: "new ScoreBoard { { \"Ada\", 9 } }", calls: ["construct ScoreBoard", "resolve accessible Add(string,int)", "invoke Add once"], result: "initializer capability comes from Add + IEnumerable" },
  { label: "failure", source: "new List<int> { Read(1), Read(2) }", calls: ["construct list", "Read(1); Add", "Read(2) throws"], result: "expression aborts; partially built object not returned" },
];

export function Ec7CollectionInitializerLab() {
  const [selected, setSelected] = useState(0);
  const item = initializerCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{initializerCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-cyan-500 bg-cyan-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><code className="mt-4 block border border-border bg-bg p-4 text-sm text-primary">{item.source}</code><div className="mt-3 grid gap-2 md:grid-cols-4">{item.calls.map((call, index) => <div key={call} className="border border-border bg-bg p-3 text-xs text-secondary"><span className="mr-2 text-cyan-400">{index + 1}</span>{call}</div>)}</div><strong className="mt-3 block border border-emerald-500/40 bg-emerald-500/10 p-3 text-sm text-primary">{item.result}</strong></div><figcaption className="mt-2 text-center text-sm text-secondary">切换initializer形式，展开constructor、element evaluation与Add调用顺序。</figcaption></figure>;
}

const enumeratorCases = [
  { label: "before first", state: "created", move: "MoveNext not called", current: "Current invalid", dispose: "not yet" },
  { label: "first item", state: "active index 0", move: "MoveNext → true", current: "Current = Ada", dispose: "foreach owns enumerator" },
  { label: "next item", state: "active index 1", move: "MoveNext → true", current: "Current = Lin", dispose: "still active" },
  { label: "complete", state: "after last", move: "MoveNext → false", current: "do not read Current", dispose: "foreach Dispose()" },
  { label: "mutated", state: "source version changed", move: "MoveNext detects mismatch", current: "enumeration invalid", dispose: "finally still disposes" },
];

export function Ec7EnumerationProtocolLab() {
  const [selected, setSelected] = useState(0);
  const item = enumeratorCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{enumeratorCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-amber-500 bg-amber-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-2">{[["enumerator state", item.state], ["MoveNext", item.move], ["Current", item.current], ["cleanup", item.dispose]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm text-primary">{value}</strong></div>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">推进enumerator状态，观察GetEnumerator、MoveNext、Current与Dispose协议。</figcaption></figure>;
}

const queryCases = [
  { label: "compose", source: [3, 1, 4, 2], stages: ["Where: not run", "Select: not run", "OrderBy: not run"], output: "query object only; source untouched" },
  { label: "first enumerate", source: [3, 1, 4, 2], stages: ["Where even → 4,2", "Select anonymous {Value,Square}", "OrderBy Value → 2,4"], output: "{2,4}, {4,16}" },
  { label: "source changes", source: [3, 1, 4, 2, 6], stages: ["query still deferred", "new 6 is observed", "sort buffers current matches"], output: "{2,4}, {4,16}, {6,36}" },
  { label: "ToList snapshot", source: [3, 1, 4, 2], stages: ["enumerate now", "materialize values", "later source changes ignored"], output: "stable list snapshot" },
  { label: "side effect", source: [2, 4], stages: ["predicate increments counter", "each enumeration runs again", "counter doubles"], output: "deferred query should avoid hidden effects" },
];

export function Ec7DeferredQueryLab() {
  const [selected, setSelected] = useState(0);
  const item = queryCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{queryCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-violet-500 bg-violet-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 border border-border bg-bg p-3 font-mono text-sm text-primary">source: [{item.source.join(", ")}]</div><div className="mt-3 grid gap-2 md:grid-cols-3">{item.stages.map((stage, index) => <div key={stage} className="border border-border bg-bg p-3 text-xs text-secondary"><span className="mr-2 text-cyan-400">{index + 1}</span>{stage}</div>)}</div><strong className="mt-3 block border border-emerald-500/40 bg-emerald-500/10 p-3 text-sm text-primary">output: {item.output}</strong></div><figcaption className="mt-2 text-center text-sm text-secondary">切换query composition/enumeration/materialization，观察deferred execution与anonymous projection。</figcaption></figure>;
}
