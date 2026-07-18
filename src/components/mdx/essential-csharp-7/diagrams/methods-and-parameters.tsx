"use client";

import { useMemo, useState } from "react";

const overloadCases = [
  { label: "Print(7)", candidates: ["Print(int) exact", "Print(long) implicit", "Print(object) boxing"], winner: "Print(int)" },
  { label: "Print(7L)", candidates: ["Print(int) invalid narrowing", "Print(long) exact", "Print(object) boxing"], winner: "Print(long)" },
  { label: "Print(\"7\")", candidates: ["Print(int) no text conversion", "Print(long) no text conversion", "Print(object) reference conversion"], winner: "Print(object)" },
  { label: "Print(null)", candidates: ["Print(int) invalid", "Print(long) invalid", "Print(object) valid"], winner: "Print(object)" },
];

export function Ec7MethodResolutionLab() {
  const [selected, setSelected] = useState(0);
  const [named, setNamed] = useState(false);
  const item = overloadCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{overloadCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-cyan-500 bg-cyan-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-[2fr_1fr]"><div className="space-y-2">{item.candidates.map(candidate => <div key={candidate} className={`border p-3 text-sm ${candidate.startsWith(item.winner) ? "border-emerald-500 bg-emerald-500/10 text-primary" : "border-border bg-bg text-secondary"}`}>{candidate}</div>)}</div><div className="border border-violet-500/40 bg-violet-500/10 p-4"><span className="text-xs text-secondary">selected signature</span><strong className="mt-2 block text-lg text-primary">{item.winner}</strong><button type="button" onClick={() => setNamed(value => !value)} className="mt-4 min-h-11 w-full border border-border bg-bg px-2 text-xs text-primary">{named ? "Format(width: 8, value: 3)" : "Format(3, 8)"}</button><p className="mt-2 text-xs text-secondary">named arguments change mapping/readability, not the declared signature.</p></div></div></div><figcaption className="mt-2 text-center text-sm text-secondary">切换argument type，比较applicable candidates、conversion quality与最终overload。</figcaption></figure>;
}

const modes = [
  { label: "value", before: "caller x = 5", during: "parameter copy = 5 → 9", after: "caller x = 5", rule: "callee changes its copy" },
  { label: "ref", before: "caller x = 5; assigned", during: "alias caller storage → 9", after: "caller x = 9", rule: "must assign before call; callee may read/write" },
  { label: "out", before: "caller x need not be assigned", during: "callee must assign x = 9", after: "caller x = 9", rule: "output contract requires assignment" },
  { label: "in", before: "caller x = 5; assigned", during: "readonly alias observes 5", after: "caller x = 5", rule: "C# 7.2 readonly reference parameter" },
  { label: "params", before: "arguments 2, 3, 4", during: "parameter sees int[]", after: "sum = 9", rule: "zero or more trailing arguments become an array" },
];

export function Ec7ParameterModeLab() {
  const [selected, setSelected] = useState(0);
  const item = modes[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{modes.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-11 border text-xs ${selected === index ? "border-amber-500 bg-amber-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-2 md:grid-cols-3">{[["before call", item.before], ["inside method", item.during], ["after return", item.after]].map(([title, text]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{text}</strong></div>)}</div><p className="mt-3 border border-cyan-500/40 bg-cyan-500/10 p-3 text-sm text-primary">{item.rule}</p></div><figcaption className="mt-2 text-center text-sm text-secondary">切换parameter mode，追踪caller storage在调用前、method内和返回后的状态。</figcaption></figure>;
}

export function Ec7CallStackValidationLab() {
  const [input, setInput] = useState(4);
  const [valid, setValid] = useState(true);
  const frames = useMemo(() => valid ? Array.from({ length: Math.min(input, 6) }, (_, index) => input - index) : [], [input, valid]);
  const result = valid ? Array.from({ length: Math.max(input, 1) }, (_, index) => index + 1).reduce((total, value) => total * value, 1) : null;
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="flex items-center gap-3"><button type="button" onClick={() => setValid(value => !value)} className={`min-h-11 flex-1 border text-sm ${valid ? "border-emerald-500 bg-emerald-500/15 text-primary" : "border-red-500 bg-red-500/10 text-primary"}`}>{valid ? `n = ${input}` : "n = -1"}</button><button type="button" onClick={() => setInput(value => value >= 6 ? 1 : value + 1)} disabled={!valid} className="min-h-11 border border-border bg-bg px-4 text-sm text-primary disabled:opacity-40">increase depth</button></div>{valid ? <div className="mt-4 grid gap-3 md:grid-cols-[2fr_1fr]"><div className="flex min-h-40 flex-col-reverse gap-2 border border-border bg-bg p-4">{frames.map(frame => <div key={frame} className="border border-violet-500/40 bg-violet-500/10 p-2 text-center font-mono text-xs text-primary">Factorial({frame})</div>)}</div><div className="border border-emerald-500/40 bg-emerald-500/10 p-4"><span className="text-xs text-secondary">base case n ≤ 1</span><strong className="mt-2 block text-2xl text-primary">result {result}</strong><p className="mt-3 text-xs leading-5 text-secondary">each return removes one frame and combines n × smaller result.</p></div></div> : <div className="mt-4 border border-red-500/40 bg-red-500/10 p-5"><strong className="text-primary">throw new ArgumentOutOfRangeException(nameof(n))</strong><p className="mt-2 text-xs text-secondary">validation fails before recursion; caller receives exception evidence.</p></div>}</div><figcaption className="mt-2 text-center text-sm text-secondary">改变input与depth，观察argument validation、recursive frames、base case和return unwind。</figcaption></figure>;
}
