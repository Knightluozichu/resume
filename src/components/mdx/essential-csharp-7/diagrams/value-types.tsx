"use client";

import { useState } from "react";

export function Ec7StructCopyLab() {
  const [leftX, setLeftX] = useState(2);
  const [rightX, setRightX] = useState(2);
  const [mutable, setMutable] = useState(true);
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-2 gap-3"><div className="border border-cyan-500/40 bg-cyan-500/10 p-4 text-center"><span className="text-xs text-secondary">Point a</span><strong className="mt-2 block text-xl text-primary">X={leftX}, Y=3</strong></div><div className="border border-violet-500/40 bg-violet-500/10 p-4 text-center"><span className="text-xs text-secondary">Point b = a</span><strong className="mt-2 block text-xl text-primary">X={rightX}, Y=3</strong></div></div><div className="mt-3 grid grid-cols-2 gap-2"><button type="button" onClick={() => { setMutable(value => !value); setLeftX(2); setRightX(2); }} className="min-h-11 border border-border bg-bg text-sm text-primary">{mutable ? "mutable struct" : "readonly design"}</button><button type="button" onClick={() => mutable ? setRightX(9) : undefined} disabled={!mutable} className="min-h-11 border border-primary bg-primary text-sm text-bg disabled:opacity-40">b.X = 9</button></div><p className="mt-3 text-xs leading-5 text-secondary">{mutable ? "assignment copied all fields; changing b does not change a, but hidden copies can confuse callers" : "constructor establishes the value; operations return a new Point instead of mutating a copy"}</p></div><figcaption className="mt-2 text-center text-sm text-secondary">切换mutable/readonly struct设计，执行copy后mutation并观察value semantics。</figcaption></figure>;
}

const boxingCases = [
  { label: "box int", source: "int n = 7", operation: "object box = n", heap: "boxed Int32 copy: 7", result: "n and box are independent" },
  { label: "change source", source: "n = 8", operation: "boxed object unchanged", heap: "boxed Int32 copy: 7", result: "boxing copied the earlier value" },
  { label: "unbox exact", source: "object box holds Int32", operation: "int x = (int)box", heap: "unbox then copy: 7", result: "exact boxed value type succeeds" },
  { label: "wrong unbox", source: "object box holds Int32", operation: "long x = (long)box", heap: "InvalidCastException", result: "unbox is not numeric conversion" },
  { label: "interface box", source: "struct implements IFormattable", operation: "IFormattable f = value", heap: "boxed struct for interface reference", result: "interface call may allocate a box" },
];

export function Ec7BoxingBoundaryLab() {
  const [selected, setSelected] = useState(0);
  const item = boxingCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-2 gap-2 sm:grid-cols-5">{boxingCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-amber-500 bg-amber-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-3">{[["source", item.source], ["operation", item.operation], ["object representation", item.heap]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div><p className="mt-3 border border-cyan-500/40 bg-cyan-500/10 p-3 text-sm text-primary">{item.result}</p></div><figcaption className="mt-2 text-center text-sm text-secondary">切换boxing/unboxing路径，追踪value copy、boxed runtime type与failure。</figcaption></figure>;
}

const permissions = [
  { name: "Read", bit: 1 },
  { name: "Write", bit: 2 },
  { name: "Execute", bit: 4 },
];

export function Ec7EnumFlagsLab() {
  const [mask, setMask] = useState(1);
  const [raw, setRaw] = useState(false);
  const value = raw ? 8 : mask;
  const names = permissions.filter(item => (value & item.bit) === item.bit).map(item => item.name);
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 gap-2">{permissions.map(item => <button key={item.name} type="button" onClick={() => { setRaw(false); setMask(current => current ^ item.bit); }} className={`min-h-11 border text-xs ${!raw && (mask & item.bit) !== 0 ? "border-violet-500 bg-violet-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{item.name} ({item.bit})</button>)}</div><button type="button" onClick={() => setRaw(value => !value)} className="mt-3 min-h-11 w-full border border-border bg-bg text-sm text-primary">{raw ? "raw value 8 (unnamed bit)" : "use named flag mask"}</button><div className="mt-4 grid gap-3 md:grid-cols-2"><div className="border border-border bg-bg p-4 font-mono text-primary">decimal {value}<br/>binary {value.toString(2).padStart(4, "0")}</div><div className="border border-emerald-500/40 bg-emerald-500/10 p-4 text-sm text-primary">names: {names.length ? names.join(" | ") : raw ? "none; unnamed bit still exists" : "None"}</div></div></div><figcaption className="mt-2 text-center text-sm text-secondary">组合Flags values或注入unnamed raw value，验证bit tests与enum validity边界。</figcaption></figure>;
}
