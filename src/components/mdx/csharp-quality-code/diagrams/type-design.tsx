"use client";

import { useState } from "react";

const reuseCases = [
  { label: "interface", owns: "capability contract, no instance ownership", varies: "many unrelated implementations", caller: "depends on role", test: "contract suite across implementations", risk: "fat interface and accidental breaking evolution" },
  { label: "abstract class", owns: "shared protected invariant/state", varies: "one designed hierarchy", caller: "may use base polymorphism", test: "base + each override preserves invariant", risk: "fragile base and constructor coupling" },
  { label: "composition", owns: "explicit collaborators", varies: "swap behavior independently", caller: "depends on composed facade", test: "fake each interface and integration wiring", risk: "too many pass-through layers" },
  { label: "inheritance", owns: "is-a substitution contract", varies: "only designed virtual points", caller: "base caller accepts subtype", test: "LSP properties and base behavior", risk: "reuse-only inheritance leaks base changes" },
  { label: "polymorphism", owns: "strategy-specific branch", varies: "implementation per behavior family", caller: "invokes one stable operation", test: "same inputs across strategies", risk: "over-modeling a small closed switch" },
];

export function CqcReuseBoundaryLab() {
  const [selected, setSelected] = useState(2);
  const item = reuseCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{reuseCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-cyan-500 bg-cyan-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-2">{[["owns", item.owns], ["variation", item.varies], ["caller sees", item.caller], ["proof", item.test]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div><div className="mt-3 border border-rose-500/40 bg-rose-500/10 p-3 text-sm text-primary">risk: {item.risk}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">比较interface、abstract class、composition、inheritance和polymorphic strategy的ownership与variation边界。</figcaption></figure>;
}

const lifetimeCases = [
  { label: "private singleton", construction: "private ctor + Lazy<T>", lifetime: "process-global unless resettable host scope", substitution: "hard if accessed through static Instance", failure: "initialization may poison global path", decision: "prefer DI singleton when consumers need abstraction" },
  { label: "static ctor", construction: "runtime runs once before first static use", lifetime: "AppDomain/load-context type lifetime", substitution: "none for static type", failure: "TypeInitializationException repeats for type use", decision: "keep deterministic, fast and side-effect-light" },
  { label: "static class", construction: "no instances", lifetime: "type-owned functions/state", substitution: "no interface/instance polymorphism", failure: "global mutable state couples tests", decision: "use for stateless pure helpers/constants" },
  { label: "DI singleton", construction: "container/factory owns creation", lifetime: "configured application scope", substitution: "consumer depends on interface", failure: "startup validation and disposal can be supervised", decision: "use for shared service with dependencies/lifecycle" },
  { label: "sealed type", construction: "normal ctor/factory", lifetime: "owner-defined", substitution: "implements interfaces but no class derivation", failure: "no unknown override during construction/dispose", decision: "seal unless inheritance is an explicit supported contract" },
];

export function CqcLifetimeTypeLab() {
  const [selected, setSelected] = useState(3);
  const item = lifetimeCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{lifetimeCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-violet-500 bg-violet-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-2">{[["construction", item.construction], ["lifetime", item.lifetime], ["substitution", item.substitution], ["failure", item.failure]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div><div className="mt-3 border border-amber-500/40 bg-amber-500/10 p-3 text-sm text-primary">decision: {item.decision}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">比较private singleton、static initialization、DI lifetime与sealed extensibility contract。</figcaption></figure>;
}

const modelCases = [
  { label: "nested helper", shape: "private implementation type inside owner", boundary: "shares conceptual/lifetime scope", coupling: "intentionally high to owner", evolution: "can move without public break", warning: "public nested type ties consumer naming to owner" },
  { label: "enum", shape: "small closed named value set", boundary: "switch/exhaustive policy at consumers", coupling: "values shared, behavior external", evolution: "adding member affects consumers", warning: "do not add class hierarchy for simple flags/state" },
  { label: "rich value class", shape: "validated value + behavior + metadata", boundary: "constructor/factory protects invariant", coupling: "behavior stays with value", evolution: "new behavior behind stable API", warning: "identity/reference semantics may be unnecessary" },
  { label: "one-way dependency", shape: "A depends on abstraction owned toward stable side", boundary: "events/ports return information", coupling: "direction is explicit", evolution: "replace one side independently", warning: "callback cycles can recreate hidden bidirectionality" },
  { label: "namespace", shape: "cohesive public vocabulary", boundary: "domain/module ownership and discoverability", coupling: "does not enforce runtime isolation", evolution: "types can move only with API impact", warning: "namespace is not a substitute for package/assembly boundary" },
];

export function CqcModelBoundaryLab() {
  const [selected, setSelected] = useState(1);
  const item = modelCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{modelCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-emerald-500 bg-emerald-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-2">{[["shape", item.shape], ["boundary", item.boundary], ["coupling", item.coupling], ["evolution", item.evolution]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div><div className="mt-3 border border-rose-500/40 bg-rose-500/10 p-3 text-sm text-primary">warning: {item.warning}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">切换nested type、enum/rich class、dependency direction与namespace，检查真实module boundary。</figcaption></figure>;
}
