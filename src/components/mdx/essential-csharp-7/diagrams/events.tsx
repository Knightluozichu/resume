"use client";

import { useState } from "react";

const subscribers = ["AuditView", "StatusBar", "Telemetry"];

export function Ec7PublishSubscribeLab() {
  const [active, setActive] = useState(["AuditView", "StatusBar"]);
  const [raised, setRaised] = useState(0);
  const toggle = (name: string) => setActive(current => current.includes(name) ? current.filter(item => item !== name) : [...current, name]);
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid gap-3 md:grid-cols-[1fr_2fr]"><div className="border border-violet-500/40 bg-violet-500/10 p-4 text-center"><span className="text-xs text-secondary">publisher</span><strong className="mt-2 block text-primary">OrderService</strong><button type="button" onClick={() => setRaised(value => value + 1)} className="mt-4 min-h-11 w-full border border-primary bg-primary text-sm text-bg">raise OrderPlaced #{raised + 1}</button></div><div className="grid grid-cols-3 gap-2">{subscribers.map(name => <button key={name} type="button" onClick={() => toggle(name)} className={`min-h-24 border p-2 text-xs ${active.includes(name) ? "border-emerald-500 bg-emerald-500/10 text-primary" : "border-border bg-bg text-secondary"}`}><strong className="block">{name}</strong><span className="mt-2 block">{active.includes(name) ? `receives #${raised}` : "unsubscribed"}</span></button>)}</div></div><p className="mt-3 text-xs leading-5 text-secondary">Invocation order follows subscription order: {active.length ? active.join(" → ") : "no subscribers; raise is a no-op"}.</p></div><figcaption className="mt-2 text-center text-sm text-secondary">订阅/退订三个observers并raise event，观察publisher与ordered subscriber list。</figcaption></figure>;
}

const accessCases = [
  { label: "delegate field", outsider: "can assign null, replace list, invoke", publisher: "no exclusive control", verdict: "broken encapsulation" },
  { label: "event member", outsider: "can only += and -=", publisher: "can invoke/assign inside declaring type", verdict: "publisher controls notification" },
  { label: "custom accessors", outsider: "uses add/remove accessors", publisher: "can lock, proxy or store differently", verdict: "custom subscription policy" },
  { label: "interface event", outsider: "consumer sees add/remove contract", publisher: "implementer owns raise", verdict: "polymorphic notification surface" },
];

export function Ec7EventEncapsulationLab() {
  const [selected, setSelected] = useState(1);
  const item = accessCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{accessCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-amber-500 bg-amber-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-3">{[["outside code", item.outsider], ["declaring publisher", item.publisher], ["result", item.verdict]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">比较public delegate、event、custom accessors与interface event的访问权限。</figcaption></figure>;
}

const lifecycleCases = [
  { label: "subscribe", sender: "publisher instance", args: "OrderPlacedEventArgs(id,total)", lifetime: "publisher now strongly references handler target", outcome: "future raises notify subscriber" },
  { label: "unsubscribe", sender: "same publisher", args: "same handler identity required", lifetime: "reference removed when last matching subscription removed", outcome: "subscriber can be collected" },
  { label: "forgotten", sender: "long-lived publisher", args: "subscriber expected short lifetime", lifetime: "delegate keeps subscriber alive", outcome: "memory/lifecycle leak" },
  { label: "handler throws", sender: "publisher", args: "current event data", lifetime: "subscription remains", outcome: "default multicast stops later handlers" },
  { label: "snapshot raise", sender: "publisher", args: "immutable event data", lifetime: "copy event delegate before invoke", outcome: "stable local list for this raise" },
];

export function Ec7EventLifecycleLab() {
  const [selected, setSelected] = useState(0);
  const item = lifecycleCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{lifecycleCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-violet-500 bg-violet-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-2">{[["sender", item.sender], ["EventArgs", item.args], ["lifetime", item.lifetime], ["outcome", item.outcome]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">切换EventHandler lifecycle cases，检查sender/data、unsubscribe identity、保活与失败传播。</figcaption></figure>;
}
