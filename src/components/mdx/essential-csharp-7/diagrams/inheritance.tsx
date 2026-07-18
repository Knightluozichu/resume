"use client";

import { useState } from "react";

const hierarchyCases = [
  { label: "Document", chain: ["System.Object", "Document"], owns: ["Title", "Print()"], assignable: "Document variable: yes" },
  { label: "Invoice", chain: ["System.Object", "Document", "Invoice"], owns: ["Title", "Print()", "Total"], assignable: "Document variable: yes (upcast)" },
  { label: "Image", chain: ["System.Object", "Document", "Image"], owns: ["Title", "Print()", "Pixels"], assignable: "Invoice variable: no (siblings)" },
];

export function Ec7DerivationContractLab() {
  const [selected, setSelected] = useState(1);
  const item = hierarchyCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 border border-border">{hierarchyCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-11 text-sm ${selected === index ? "bg-primary text-bg" : "bg-bg text-primary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-[1fr_2fr]"><div className="space-y-2">{item.chain.map((entry, index) => <div key={entry} className="border border-cyan-500/40 bg-cyan-500/10 p-3 text-center text-sm text-primary"><span className="mr-2 text-xs text-secondary">{index}</span>{entry}</div>)}</div><div className="border border-border bg-bg p-4"><span className="text-xs text-secondary">available contract</span><div className="mt-3 flex flex-wrap gap-2">{item.owns.map(member => <span key={member} className="border border-violet-500/40 bg-violet-500/10 px-3 py-2 text-xs text-primary">{member}</span>)}</div><strong className="mt-4 block text-sm text-primary">{item.assignable}</strong><p className="mt-2 text-xs leading-5 text-secondary">one class base only; interface contracts may be additional.</p></div></div></div><figcaption className="mt-2 text-center text-sm text-secondary">切换runtime type，观察single class inheritance、inherited surface与assignment方向。</figcaption></figure>;
}

const dispatchCases = [
  { label: "virtual override", staticType: "Document", runtimeType: "Invoice", call: "doc.Render()", selected: "Invoice.Render override", why: "virtual slot dispatches by runtime type" },
  { label: "base call", staticType: "Invoice", runtimeType: "Invoice", call: "base.Render()", selected: "Document.Render", why: "base explicitly invokes base implementation" },
  { label: "new hidden", staticType: "Document", runtimeType: "Invoice", call: "doc.Export()", selected: "Document.Export", why: "nonvirtual member selection follows static type" },
  { label: "new hidden cast", staticType: "Invoice", runtimeType: "Invoice", call: "invoice.Export()", selected: "Invoice.Export new member", why: "different static type exposes hidden member" },
];

export function Ec7DispatchLab() {
  const [selected, setSelected] = useState(0);
  const item = dispatchCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{dispatchCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-amber-500 bg-amber-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-3">{[["static type", item.staticType], ["runtime type", item.runtimeType], ["call", item.call]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm text-primary">{value}</strong></div>)}</div><div className="mt-3 border border-emerald-500/40 bg-emerald-500/10 p-4"><strong className="text-primary">{item.selected}</strong><p className="mt-2 text-xs text-secondary">{item.why}</p></div></div><figcaption className="mt-2 text-center text-sm text-secondary">切换override、base与new hiding cases，区分static lookup和runtime virtual dispatch。</figcaption></figure>;
}

const runtimeValues = [
  { label: "Invoice", value: "Invoice { Total=25 }", isDocument: true, asInvoice: true, branch: "case Invoice invoice when Total > 0" },
  { label: "Image", value: "Image { Pixels=4096 }", isDocument: true, asInvoice: false, branch: "case Image image" },
  { label: "Document", value: "Document { Title=Notes }", isDocument: true, asInvoice: false, branch: "case Document document" },
  { label: "null", value: "null", isDocument: false, asInvoice: false, branch: "case null" },
  { label: "42", value: "boxed Int32 42", isDocument: false, asInvoice: false, branch: "default" },
];

export function Ec7TypePatternLab() {
  const [selected, setSelected] = useState(0);
  const item = runtimeValues[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{runtimeValues.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-11 border text-xs ${selected === index ? "border-violet-500 bg-violet-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><code className="mt-4 block border border-border bg-bg p-4 text-sm text-primary">object value = {item.value};</code><div className="mt-3 grid gap-2 md:grid-cols-3"><div className="border border-border bg-bg p-3 text-sm text-primary">value is Document → <strong>{String(item.isDocument)}</strong></div><div className="border border-border bg-bg p-3 text-sm text-primary">value as Invoice → <strong>{item.asInvoice ? "Invoice reference" : "null"}</strong></div><div className="border border-emerald-500/40 bg-emerald-500/10 p-3 text-sm text-primary">{item.branch}</div></div></div><figcaption className="mt-2 text-center text-sm text-secondary">切换runtime value，比较is test/declaration pattern、as conversion与switch pattern branch。</figcaption></figure>;
}
