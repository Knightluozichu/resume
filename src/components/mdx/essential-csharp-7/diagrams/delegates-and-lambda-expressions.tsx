"use client";

import { useState } from "react";

const bindingCases = [
  { label: "static method", declaration: "Transformer f = Double", target: "Program.Double(int)", receiver: "none", invoke: "f(3) → 6" },
  { label: "instance method", declaration: "Transformer f = scaler.Scale", target: "Scaler.Scale(int)", receiver: "scaler object retained", invoke: "f(3) → 12" },
  { label: "lambda", declaration: "Transformer f = x => x + 1", target: "compiler-generated method/closure", receiver: "only if capture needed", invoke: "f(3) → 4" },
  { label: "mismatch", declaration: "Transformer f = Print", target: "Print(string) returns void", receiver: "signature incompatible", invoke: "compile-time rejection" },
];

export function Ec7DelegateBindingLab() {
  const [selected, setSelected] = useState(0);
  const item = bindingCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{bindingCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-cyan-500 bg-cyan-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><code className="mt-4 block border border-border bg-bg p-4 text-sm text-primary">{item.declaration}</code><div className="mt-3 grid gap-3 md:grid-cols-3">{[["method target", item.target], ["receiver", item.receiver], ["invocation", item.invoke]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">切换method group/lambda binding，检查delegate signature、target method与receiver。</figcaption></figure>;
}

const multicastCases = [
  { label: "two handlers", list: ["Audit(5) → 10", "Transform(5) → 15"], result: "delegate call returns 15", failure: "all invoked in order" },
  { label: "remove one", list: ["Audit removed", "Transform(5) → 15"], result: "returns 15", failure: "matching last occurrence removed" },
  { label: "middle throws", list: ["Audit(5) completes", "Fail(5) throws", "Transform not invoked"], result: "exception propagates", failure: "default invocation stops" },
  { label: "inspect list", list: ["GetInvocationList()", "invoke each in own try", "collect outcomes"], result: "caller defines aggregation", failure: "explicit per-target policy" },
];

export function Ec7MulticastInvocationLab() {
  const [selected, setSelected] = useState(0);
  const item = multicastCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{multicastCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-amber-500 bg-amber-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><ol className="mt-4 border border-border bg-bg p-4 text-sm leading-7 text-primary">{item.list.map((entry, index) => <li key={entry}><span className="mr-2 text-cyan-400">{index + 1}</span>{entry}</li>)}</ol><div className="mt-3 grid gap-3 md:grid-cols-2"><strong className="border border-emerald-500/40 bg-emerald-500/10 p-3 text-sm text-primary">result: {item.result}</strong><div className="border border-violet-500/40 bg-violet-500/10 p-3 text-sm text-primary">failure: {item.failure}</div></div></div><figcaption className="mt-2 text-center text-sm text-secondary">切换multicast invocation list，观察顺序、最后返回值、remove与异常停止行为。</figcaption></figure>;
}

const closureCases = [
  { label: "expression lambda", syntax: "x => x * factor", capture: "factor variable", timeline: ["factor = 2", "create delegate", "invoke(3) → 6"] },
  { label: "capture changes", syntax: "x => x * factor", capture: "same variable, not frozen value", timeline: ["create while factor = 2", "factor = 4", "invoke(3) → 12"] },
  { label: "statement lambda", syntax: "x => { Log(x); return x * 2; }", capture: "may capture logger", timeline: ["enter block", "perform statements", "return result"] },
  { label: "anonymous method", syntax: "delegate(int x) { return x * 2; }", capture: "same closure rules", timeline: ["legacy anonymous-function syntax", "convert to delegate", "invoke(3) → 6"] },
  { label: "loop capture", syntax: "actions.Add(() => i)", capture: "one loop variable in older semantics/context", timeline: ["create several delegates", "loop advances i", "calls may see same final value"] },
];

export function Ec7ClosureCaptureLab() {
  const [selected, setSelected] = useState(0);
  const item = closureCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-2 gap-2 sm:grid-cols-5">{closureCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-violet-500 bg-violet-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><code className="mt-4 block border border-border bg-bg p-4 text-sm text-primary">{item.syntax}</code><p className="mt-3 border border-cyan-500/40 bg-cyan-500/10 p-3 text-sm text-primary">capture: {item.capture}</p><div className="mt-3 grid gap-2 md:grid-cols-3">{item.timeline.map((entry, index) => <div key={entry} className="border border-border bg-bg p-3 text-sm text-secondary"><span className="mr-2 text-cyan-400">{index + 1}</span>{entry}</div>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">切换lambda/anonymous method cases，追踪captured variable的creation与invocation时间。</figcaption></figure>;
}
