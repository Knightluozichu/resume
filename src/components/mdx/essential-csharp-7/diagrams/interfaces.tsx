"use client";

import { useState } from "react";

const senders = [
  { label: "EmailSender", runtime: "EmailSender", trace: ["IMessageSender.Send", "validate address", "SMTP adapter"], result: "email queued" },
  { label: "SmsSender", runtime: "SmsSender", trace: ["IMessageSender.Send", "validate phone", "SMS gateway"], result: "sms queued" },
  { label: "FakeSender", runtime: "FakeSender", trace: ["IMessageSender.Send", "record message", "no external I/O"], result: "test evidence captured" },
];

export function Ec7InterfaceDispatchLab() {
  const [selected, setSelected] = useState(0);
  const item = senders[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 border border-border">{senders.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-11 text-xs sm:text-sm ${selected === index ? "bg-primary text-bg" : "bg-bg text-primary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-[1fr_2fr]"><div className="border border-violet-500/40 bg-violet-500/10 p-4"><span className="text-xs text-secondary">variable static type</span><strong className="mt-2 block text-primary">IMessageSender</strong><span className="mt-4 block text-xs text-secondary">runtime type</span><strong className="mt-2 block text-primary">{item.runtime}</strong></div><ol className="border border-border bg-bg p-4 text-sm leading-7 text-primary">{item.trace.map((entry, index) => <li key={entry}><span className="mr-2 text-cyan-400">{index + 1}</span>{entry}</li>)}</ol></div><p className="mt-3 border border-emerald-500/40 bg-emerald-500/10 p-3 text-sm text-primary">{item.result}</p></div><figcaption className="mt-2 text-center text-sm text-secondary">切换implementing type，以同一interface call观察runtime polymorphic behavior。</figcaption></figure>;
}

const implementationCases = [
  { label: "implicit", variable: "Report report", call: "report.Save()", visible: "public Save visible on class and interface", selected: "Report.Save" },
  { label: "implicit via interface", variable: "ISaveable item", call: "item.Save()", visible: "interface surface only", selected: "Report.Save" },
  { label: "explicit A", variable: "ITextFormatter formatter", call: "formatter.Format()", visible: "explicit member visible only through ITextFormatter", selected: "ITextFormatter.Format" },
  { label: "explicit B", variable: "IJsonFormatter formatter", call: "formatter.Format()", visible: "same member name, separate interface contract", selected: "IJsonFormatter.Format" },
];

export function Ec7ImplementationCastLab() {
  const [selected, setSelected] = useState(0);
  const item = implementationCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{implementationCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-amber-500 bg-amber-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-3">{[["static variable", item.variable], ["call site", item.call], ["visibility", item.visible]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div><strong className="mt-3 block border border-cyan-500/40 bg-cyan-500/10 p-3 text-sm text-primary">dispatch → {item.selected}</strong></div><figcaption className="mt-2 text-center text-sm text-secondary">切换class/interface static type，比较implicit与explicit implementation的可见surface。</figcaption></figure>;
}

const designCases = [
  { label: "interface", need: "objects must perform Save()", model: "ISaveable capability", evolution: "new required member breaks existing implementations in C# 7" },
  { label: "base class", need: "shared identity, state and protected behavior", model: "abstract Document base", evolution: "virtual members can provide default implementation; single class base" },
  { label: "attribute", need: "attach metadata for tools/reflection", model: "[Serializable] marker/data", evolution: "does not create callable polymorphic behavior" },
  { label: "extension", need: "helper over public interface surface", model: "SaveAll(this IEnumerable<ISaveable>)", evolution: "static helper; cannot add required contract member" },
  { label: "derived interface", need: "combine capabilities", model: "IRepository : IReadable, IWritable", evolution: "implementer must satisfy inherited member union" },
];

export function Ec7InterfaceEvolutionLab() {
  const [selected, setSelected] = useState(0);
  const item = designCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-2 gap-2 sm:grid-cols-5">{designCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-violet-500 bg-violet-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-3">{[["need", item.need], ["model", item.model], ["version boundary", item.evolution]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">切换interface/class/attribute/extension设计，比较contract、state与versioning后果。</figcaption></figure>;
}
