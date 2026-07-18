"use client";

import { useState } from "react";

const conversionCases = [
  { label: "concat value", source: "\"count=\" + count", mechanism: "selected Concat overload / value formatting", allocation: "result string; boxing depends on overload and target runtime", decision: "measure generated IL/runtime; prefer interpolation for intent" },
  { label: "StringBuilder", source: "loop: builder.Append(value)", mechanism: "mutable character buffer grows and appends", allocation: "amortized buffer growth, one final string", decision: "use for unknown/repeated concatenation, not every two-part expression" },
  { label: "explicit cast", source: "(Order)candidate", mechanism: "runtime type check; mismatch throws", allocation: "no wrapper copy for reference conversion", decision: "use when mismatch violates the contract" },
  { label: "as / pattern", source: "candidate is Order order", mechanism: "test and bind one typed variable", allocation: "no object copy", decision: "use when alternate runtime shape is an expected branch" },
  { label: "TryParse", source: "int.TryParse(text, out value)", mechanism: "returns success and parsed value", allocation: "no exception object for ordinary invalid input", decision: "use when invalid text belongs to normal input domain" },
];

export function CqcStringConversionLab() {
  const [selected, setSelected] = useState(0);
  const item = conversionCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{conversionCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-cyan-500 bg-cyan-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 border border-border bg-bg p-4"><code className="text-sm text-primary">{item.source}</code></div><div className="mt-3 grid gap-3 md:grid-cols-3">{[["mechanism", item.mechanism], ["allocation", item.allocation], ["decision", item.decision]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-3"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">切换字符串、转换与解析case，区分正常失败、contract violation和真实allocation。</figcaption></figure>;
}

const valueCases = [
  { label: "nullable", rule: "absence is part of the domain", bad: "magic sentinel 0/-1", proof: "HasValue/null paths and boundary serialization", connection: "TryParse output, database null and API contract" },
  { label: "const/readonly", rule: "const is compile-time substituted; readonly is assigned per object/type at runtime", bad: "public const value changed across assembly versions", proof: "recompile-consumer compatibility test", connection: "versioning and initialization ownership" },
  { label: "enum zero", rule: "default all-zero bits should have documented meaning", bad: "default value is an unnamed invalid state", proof: "default/deserialize/unknown-value cases", connection: "Flags.None, validation and persistence" },
  { label: "equality/hash", rule: "equal values must produce equal hashes for the comparer lifetime", bad: "override Equals but inherit identity hash", proof: "reflexive/symmetric/transitive/hash property tests", connection: "Dictionary/HashSet key stability" },
  { label: "comparison", rule: "ordering and equality semantics must be intentionally compatible", bad: "CompareTo returns 0 while Equals is false without documentation", proof: "antisymmetry/transitivity/sort tests", connection: "IComparable and IComparer policy" },
];

export function CqcValueContractLab() {
  const [selected, setSelected] = useState(3);
  const item = valueCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{valueCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-violet-500 bg-violet-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-2">{[["contract", item.rule], ["failure", item.bad], ["proof", item.proof], ["connects to", item.connection]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">比较nullable、const/readonly、enum、equality/hash与ordering的跨API契约。</figcaption></figure>;
}

const representationCases = [
  { label: "format", input: "Money value + format + culture", operation: "IFormattable/ToString creates external representation", output: "symbol, precision and culture-specific text", risk: "logs, UI and wire formats need different policies" },
  { label: "shallow copy", input: "object with nested mutable reference", operation: "copy top-level fields/references", output: "two roots share nested object", risk: "mutation leaks across copies" },
  { label: "deep copy", input: "owned object graph", operation: "clone every owned mutable node with identity policy", output: "independent graph where required", risk: "cycles, shared aliases and external resources" },
  { label: "dynamic", input: "runtime receiver and arguments", operation: "defer member/overload binding to runtime", output: "value or RuntimeBinderException", risk: "typos and signature drift escape compile-time checks" },
  { label: "reflection", input: "Type/MemberInfo and explicit signature", operation: "metadata lookup then validated invoke", output: "typed adapter or invocation result", risk: "ambiguous members, wrapping and hot-path cost" },
];

export function CqcRepresentationBoundaryLab() {
  const [selected, setSelected] = useState(0);
  const item = representationCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{representationCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-amber-500 bg-amber-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto_1fr]"><div className="border border-border bg-bg p-4"><span className="text-xs text-secondary">input</span><strong className="mt-2 block text-sm leading-6 text-primary">{item.input}</strong></div><div className="flex min-h-12 items-center justify-center text-xl text-amber-400">→</div><div className="border border-border bg-bg p-4"><span className="text-xs text-secondary">output</span><strong className="mt-2 block text-sm leading-6 text-primary">{item.output}</strong></div></div><div className="mt-3 grid gap-3 md:grid-cols-2"><div className="border border-cyan-500/40 bg-cyan-500/10 p-3 text-sm text-primary">operation: {item.operation}</div><div className="border border-rose-500/40 bg-rose-500/10 p-3 text-sm text-primary">risk: {item.risk}</div></div></div><figcaption className="mt-2 text-center text-sm text-secondary">切换格式化、复制与dynamic/reflection，检查representation、identity和binding边界。</figcaption></figure>;
}
