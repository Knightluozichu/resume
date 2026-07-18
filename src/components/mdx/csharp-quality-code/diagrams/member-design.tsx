"use client";

import { useState } from "react";

const constructionCases = [
  { label: "abstract ctor", surface: "protected constructor", invariant: "base state valid before derived body", caller: "only derived construction path", risk: "public visibility implies an impossible direct API" },
  { label: "public field", surface: "uncontrolled storage", invariant: "caller can bypass validation/versioning", caller: "reads and writes representation", risk: "cannot later intercept mutation compatibly" },
  { label: "property", surface: "named get/set contract", invariant: "validation/init/access can be controlled", caller: "uses behavior-shaped member", risk: "returning mutable collection still leaks ownership" },
  { label: "constructor", surface: "required arguments + validated factory", invariant: "object is usable at publication", caller: "cannot observe partial required state", risk: "too many optional setters create temporal invalidity" },
  { label: "virtual in ctor", surface: "dispatches to derived override early", invariant: "derived fields are not initialized yet", caller: "construction invokes partially built object", risk: "null/default state and leaked this" },
];

export function CqcConstructionInvariantLab() {
  const [selected, setSelected] = useState(3);
  const item = constructionCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{constructionCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-cyan-500 bg-cyan-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-2">{[["API surface", item.surface], ["invariant", item.invariant], ["caller capability", item.caller], ["risk", item.risk]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">切换constructor、field/property、collection和virtual call，检查对象何时成为valid与caller获得哪些能力。</figcaption></figure>;
}

const abstractionCases = [
  { label: "return interface", concrete: "List<Order>", contract: "IReadOnlyList<Order> / IEnumerable<Order>", freedom: "implementation can change storage", variance: "exposes only required read capability", risk: "live view may still change" },
  { label: "parameter base", concrete: "FileStream", contract: "Stream", freedom: "memory/test/network streams accepted", variance: "caller supplies any valid subtype", risk: "method must not assume FileStream-only members" },
  { label: "params", concrete: "repeated arguments", contract: "params T[] at final parameter", freedom: "zero or many call-site values", variance: "array allocation/overload resolution apply", risk: "large/hot calls may need span/list overload" },
  { label: "override input", concrete: "base accepts Animal", contract: "override still accepts Animal", freedom: "base-typed caller remains valid", variance: "cannot narrow to Dog", risk: "narrowing violates substitutability" },
  { label: "collection return", concrete: "mutable owned List", contract: "immutable snapshot or controlled view", freedom: "owner retains mutation policy", variance: "caller cannot add/remove", risk: "element mutability and aliasing remain" },
];

export function CqcAbstractionSurfaceLab() {
  const [selected, setSelected] = useState(0);
  const item = abstractionCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{abstractionCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-violet-500 bg-violet-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto_1fr]"><div className="border border-border bg-bg p-4"><span className="text-xs text-secondary">concrete</span><strong className="mt-2 block text-sm leading-6 text-primary">{item.concrete}</strong></div><div className="flex min-h-12 items-center justify-center text-xl text-violet-400">→</div><div className="border border-violet-500/40 bg-violet-500/10 p-4"><span className="text-xs text-secondary">contract</span><strong className="mt-2 block text-sm leading-6 text-primary">{item.contract}</strong></div></div><div className="mt-3 grid gap-3 md:grid-cols-3">{[["freedom", item.freedom], ["type direction", item.variance], ["risk", item.risk]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-3"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">把concrete storage/caller type收敛为满足用途的最小public contract，并验证substitutability。</figcaption></figure>;
}

const dispatchCases = [
  { label: "override", declared: "virtual base slot", selected: "runtime type override", polymorphism: "preserved through base reference", limitation: "signature contract cannot be narrowed" },
  { label: "new", declared: "new member hides same name", selected: "compile-time reference type", polymorphism: "two independent slots", limitation: "base callers still reach base member" },
  { label: "instance", declared: "member receives this", selected: "virtual/nonvirtual dispatch rules", polymorphism: "can access instance state and override", limitation: "requires a valid receiver" },
  { label: "static", declared: "type-owned function", selected: "compile-time member binding", polymorphism: "no virtual instance dispatch", limitation: "hidden dependencies hurt testing if global state is used" },
  { label: "extension", declared: "static method with this parameter", selected: "compile-time receiver type + namespace scope", polymorphism: "instance member always wins", limitation: "cannot access private state or truly add virtual behavior" },
];

export function CqcDispatchBindingLab() {
  const [selected, setSelected] = useState(0);
  const item = dispatchCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{dispatchCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-emerald-500 bg-emerald-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-2">{[["declared shape", item.declared], ["selection", item.selected], ["polymorphism", item.polymorphism], ["limitation", item.limitation]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">比较override、new、instance/static与extension method的compile-time和runtime binding。</figcaption></figure>;
}
