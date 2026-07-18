"use client";

import { useState } from "react";

type AdtOperation = "construct" | "mutate" | "query";

const adtOperations = {
  construct: { client: "new Counter(\"hits\")", contract: "valid object with tally 0", implementation: "name=id; count=0" },
  mutate: { client: "hits.increment()", contract: "tally increases by exactly 1", implementation: "private count++" },
  query: { client: "hits.tally()", contract: "return current count", implementation: "read private count" },
} as const;

export function Algs4AdtBoundaryDiagram() {
  const [operation, setOperation] = useState<AdtOperation>("mutate");
  const active = adtOperations[operation];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 gap-2">
          {(Object.keys(adtOperations) as AdtOperation[]).map((candidate) => (
            <button key={candidate} type="button" onClick={() => setOperation(candidate)} className={"min-h-10 border text-xs font-semibold " + (operation === candidate ? "border-accent bg-accent text-background" : "border-border bg-background text-primary")}>{candidate}</button>
          ))}
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-[1fr_auto_1fr_auto_1fr]">
          <div className="border border-border bg-background p-3 text-xs text-secondary">client<div className="mt-1 font-mono text-primary">{active.client}</div></div>
          <div className="flex items-center justify-center font-mono text-accent">-&gt;</div>
          <div className="border border-accent bg-accent/10 p-3 text-xs text-secondary">API contract<div className="mt-1 font-mono text-accent">{active.contract}</div></div>
          <div className="flex items-center justify-center font-mono text-accent">-&gt;</div>
          <div className="border border-success bg-success/10 p-3 text-xs text-secondary">private representation<div className="mt-1 font-mono text-success">{active.implementation}</div></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Client依赖public behavior，private fields与算法可在不破坏API时替换。
      </figcaption>
    </figure>
  );
}

export function Algs4CounterTraceLab() {
  const [increments, setIncrements] = useState(4);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          increment calls = {increments}
          <input className="mt-2 w-full accent-current" type="range" min="0" max="10" value={increments} onChange={(event) => setIncrements(Number(event.target.value))} />
        </label>
        <div className="mt-4 grid gap-2 sm:grid-cols-[1fr_1fr_1fr]">
          <div className="border border-border bg-background p-3 text-xs text-secondary">identity<div className="mt-1 font-mono text-primary">Counter@hits</div></div>
          <div className="border border-warning bg-warning/10 p-3 text-xs text-secondary">mutable state<div className="mt-1 font-mono text-warning">count = {increments}</div></div>
          <div className="border border-success bg-success/10 p-3 text-xs text-secondary">tally()<div className="mt-1 font-mono text-success">{increments}</div></div>
        </div>
        <div className="mt-3 grid grid-cols-10 gap-1">
          {Array.from({ length: 10 }, (_, index) => <div key={index} className={"h-8 border " + (index < increments ? "border-accent bg-accent/30" : "border-border bg-background")} />)}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Counter保持object identity并原地改变count；name是final field，count是mutable representation。
      </figcaption>
    </figure>
  );
}

export function Algs4ObjectAliasLab() {
  const [mode, setMode] = useState<"alias" | "independent">("alias");
  const [increments, setIncrements] = useState(2);
  const left = mode === "alias" ? increments : 0;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-2">
          {(["alias", "independent"] as const).map((candidate) => <button key={candidate} type="button" onClick={() => setMode(candidate)} className={"min-h-10 border text-xs font-semibold " + (mode === candidate ? "border-accent bg-accent text-background" : "border-border bg-background text-primary")}>{candidate}</button>)}
        </div>
        <label className="mt-4 block text-sm font-semibold text-primary">
          b.increment() calls = {increments}
          <input className="mt-2 w-full accent-current" type="range" min="0" max="6" value={increments} onChange={(event) => setIncrements(Number(event.target.value))} />
        </label>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="border border-border bg-background p-3 text-xs text-secondary">a.tally()<div className="mt-1 font-mono text-primary">{left}</div></div>
          <div className="border border-success bg-success/10 p-3 text-xs text-secondary">b.tally()<div className="mt-1 font-mono text-success">{increments}</div></div>
        </div>
        <div className="mt-2 border border-warning bg-warning/10 p-3 font-mono text-xs text-warning">
          {mode === "alias" ? "Counter b = a; one object, two references" : "Counter b = new Counter(...); two objects"}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Mutable object的reference assignment会共享state；重新构造才得到独立identity。
      </figcaption>
    </figure>
  );
}

const dateCases = [
  { label: "02/29/2024", month: 2, day: 29, year: 2024 },
  { label: "02/29/2100", month: 2, day: 29, year: 2100 },
  { label: "04/31/2025", month: 4, day: 31, year: 2025 },
  { label: "12/31/2025", month: 12, day: 31, year: 2025 },
] as const;

function leapYear(year: number) {
  if (year % 400 === 0) return true;
  if (year % 100 === 0) return false;
  return year % 4 === 0;
}

function validDate(month: number, day: number, year: number) {
  const days = [0, 31, leapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return month >= 1 && month <= 12 && day >= 1 && day <= days[month];
}

export function Algs4DateInvariantLab() {
  const [index, setIndex] = useState(0);
  const active = dateCases[index];
  const valid = validDate(active.month, active.day, active.year);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {dateCases.map((candidate, candidateIndex) => <button key={candidate.label} type="button" onClick={() => setIndex(candidateIndex)} className={"min-h-10 border font-mono text-xs " + (index === candidateIndex ? "border-accent bg-accent text-background" : "border-border bg-background text-primary")}>{candidate.label}</button>)}
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
          <div className="border border-border bg-background p-3 text-secondary">month<div className="font-mono text-primary">{active.month}</div></div>
          <div className="border border-border bg-background p-3 text-secondary">day<div className="font-mono text-primary">{active.day}</div></div>
          <div className="border border-border bg-background p-3 text-secondary">leap year<div className="font-mono text-primary">{leapYear(active.year) ? "yes" : "no"}</div></div>
        </div>
        <div className={"mt-2 border p-3 text-center font-mono text-xs " + (valid ? "border-success bg-success/10 text-success" : "border-danger bg-danger/10 text-danger")}>
          {valid ? "constructor establishes valid Date" : "throw IllegalArgumentException"}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Immutable Date在constructor入口建立representation invariant，invalid object不会逃逸。
      </figcaption>
    </figure>
  );
}

const streamValues = [1e9 + 4, 1e9 + 7, 1e9 + 13, 1e9 + 16, 1e9 + 25];

function accumulate(values: number[]) {
  let n = 0;
  let mean = 0;
  let sum = 0;
  for (const value of values) {
    n += 1;
    const delta = value - mean;
    mean += delta / n;
    sum += ((n - 1) / n) * delta * delta;
  }
  return { n, mean, variance: n > 1 ? sum / (n - 1) : Number.NaN };
}

export function Algs4AccumulatorStateLab() {
  const [count, setCount] = useState(3);
  const activeValues = streamValues.slice(0, count);
  const state = accumulate(activeValues);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          stream prefix = {count}
          <input className="mt-2 w-full accent-current" type="range" min="1" max={streamValues.length} value={count} onChange={(event) => setCount(Number(event.target.value))} />
        </label>
        <div className="mt-4 border border-border bg-background p-3 font-mono text-xs text-secondary">{activeValues.join(", ")}</div>
        <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
          <div className="border border-border bg-background p-3 text-secondary">n<div className="font-mono text-primary">{state.n}</div></div>
          <div className="border border-accent bg-accent/10 p-3 text-secondary">mean<div className="font-mono text-accent">{state.mean.toFixed(2)}</div></div>
          <div className="border border-success bg-success/10 p-3 text-secondary">sample variance<div className="font-mono text-success">{Number.isNaN(state.variance) ? "NaN" : state.variance.toFixed(2)}</div></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Accumulator以n、running mean和deviation sum保持constant memory，并减少大数相减的roundoff风险。
      </figcaption>
    </figure>
  );
}

type DesignChoice = "mutable counter" | "immutable date" | "stream accumulator";

const designChoices = {
  "mutable counter": { identity: "stable object", update: "increment in place", invariant: "count >= 0", exposure: "query tally only" },
  "immutable date": { identity: "value object", update: "next returns new Date", invariant: "valid calendar date", exposure: "final primitive fields" },
  "stream accumulator": { identity: "stateful summary", update: "one-pass recurrence", invariant: "n matches observations", exposure: "mean/var/count queries" },
} as const;

export function Algs4ApiDesignMatrix() {
  const [choice, setChoice] = useState<DesignChoice>("immutable date");
  const active = designChoices[choice];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <select className="min-h-11 w-full border border-border bg-background px-3 text-sm text-primary" value={choice} onChange={(event) => setChoice(event.target.value as DesignChoice)}>
          {(Object.keys(designChoices) as DesignChoice[]).map((candidate) => <option key={candidate}>{candidate}</option>)}
        </select>
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
          {Object.entries(active).map(([key, value]) => <div key={key} className="border border-border bg-background p-3 text-secondary">{key}<div className="mt-1 font-mono text-primary">{value}</div></div>)}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        ADT设计要同时决定identity、mutation、representation invariant与暴露面。
      </figcaption>
    </figure>
  );
}
