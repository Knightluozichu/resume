"use client";

import { useState } from "react";

const expressionCases = [
  { label: "local inference", input: "new Dictionary<string, Order>()", choose: "var orders", reason: "right side makes the exact type obvious", check: "hover/IDE still exposes the static type" },
  { label: "numeric result", input: "GetResult() hides an important width", choose: "decimal total", reason: "the declared type communicates the contract", check: "reviewer sees precision without tracing the method" },
  { label: "runtime shape", input: "object payload from a boundary", choose: "payload is Invoice invoice", reason: "test and bind in one branch", check: "the non-match path is explicit" },
  { label: "fixed message", input: "name + amount for a UI label", choose: "$\"{name}: {amount}\"", reason: "interpolation keeps values beside their labels", check: "culture is intentionally the current UI culture" },
  { label: "culture later", input: "message crosses a formatting boundary", choose: "FormattableString", reason: "preserve format plus typed arguments", check: "the sink chooses invariant or requested culture" },
];

export function EcsExpressionChoiceLab() {
  const [selected, setSelected] = useState(0);
  const item = expressionCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-2 gap-2 sm:grid-cols-5">{expressionCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-cyan-500 bg-cyan-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-2">{[["input", item.input], ["choose", item.choose], ["why", item.reason], ["acceptance", item.check]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">根据可读性、静态类型和格式化边界选择 var、pattern、interpolation 或 FormattableString。</figcaption></figure>;
}

const callbackCases = [
  { label: "string command", contract: "\"recalculate\"", replacement: "enum or command type", compiler: "rejects unsupported operations", lifetime: "owned by the command object" },
  { label: "one callback", contract: "Func<Order, Price>", replacement: "typed delegate parameter", compiler: "checks input and return types", lifetime: "caller owns captured state" },
  { label: "notification", contract: "event EventHandler<ChangedEventArgs>", replacement: "publisher-controlled event", compiler: "subscribers may add/remove only", lifetime: "publisher may retain subscribers" },
  { label: "raise event", contract: "Changed?.Invoke(this, args)", replacement: "null-conditional invocation", compiler: "single evaluation of the delegate", lifetime: "document thread and exception policy" },
];

export function EcsCallbackContractLab() {
  const [selected, setSelected] = useState(1);
  const item = callbackCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{callbackCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-emerald-500 bg-emerald-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-2">{[["contract", item.contract], ["typed replacement", item.replacement], ["compiler proof", item.compiler], ["lifetime check", item.lifetime]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">把字符串协议升级为类型契约，并把 delegate、event 的调用权和生命周期写清楚。</figcaption></figure>;
}

const runtimeCases = [
  { label: "non-generic list", source: "ArrayList stores int as object", hidden: "boxing on add, unboxing on read", repair: "List<int>", proof: "allocation profile and no cast" },
  { label: "interface call", source: "struct passed as object/interface", hidden: "boxing may allocate a copy", repair: "generic constrained API", proof: "benchmark representative hot path" },
  { label: "base adds member", source: "dependency update introduces M()", hidden: "derived method now hides unexpectedly", repair: "review call sites, then explicit new only if intended", proof: "base-typed and derived-typed tests" },
  { label: "polymorphism", source: "derived behavior must replace base behavior", hidden: "new dispatches by static reference type", repair: "base virtual plus derived override", proof: "substitutability contract tests" },
];

export function EcsRuntimeDispatchLab() {
  const [selected, setSelected] = useState(0);
  const item = runtimeCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{runtimeCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-amber-500 bg-amber-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-2">{[["source", item.source], ["hidden behavior", item.hidden], ["repair", item.repair], ["proof", item.proof]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">显式检查装箱成本和 new/override 的分派差异，不把语法简短误当运行时免费。</figcaption></figure>;
}
