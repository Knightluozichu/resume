"use client";

import { useState } from "react";

const pairs = [[4, 3], [3, 8], [6, 5], [9, 4], [2, 1], [5, 0], [7, 2], [6, 1]] as const;

function root(parent: number[], p: number) {
  let current = p;
  while (current !== parent[current]) current = parent[current];
  return current;
}

function quickFindState(steps: number) {
  const id = Array.from({ length: 10 }, (_, index) => index);
  let count = 10;
  for (const [p, q] of pairs.slice(0, steps)) {
    const pId = id[p];
    const qId = id[q];
    if (pId === qId) continue;
    for (let i = 0; i < id.length; i += 1) if (id[i] === pId) id[i] = qId;
    count -= 1;
  }
  return { id, count };
}

function quickUnionState(steps: number, weighted: boolean) {
  const parent = Array.from({ length: 10 }, (_, index) => index);
  const size = Array.from({ length: 10 }, () => 1);
  let count = 10;
  for (const [p, q] of pairs.slice(0, steps)) {
    const rootP = root(parent, p);
    const rootQ = root(parent, q);
    if (rootP === rootQ) continue;
    if (weighted && size[rootP] < size[rootQ]) {
      parent[rootP] = rootQ;
      size[rootQ] += size[rootP];
    } else {
      parent[rootQ] = rootP;
      size[rootP] += size[rootQ];
    }
    count -= 1;
  }
  return { parent, size, count };
}

export function Algs4DynamicConnectivityLab() {
  const [steps, setSteps] = useState(5);
  const state = quickUnionState(steps, true);
  const active = pairs[steps - 1];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">processed pairs = {steps}<input className="mt-2 w-full accent-current" type="range" min="1" max={pairs.length} value={steps} onChange={(event) => setSteps(Number(event.target.value))} /></label>
        <div className="mt-4 flex flex-wrap gap-2">{pairs.map(([p, q], index) => <span key={`${p}-${q}`} className={"border px-3 py-2 font-mono text-xs " + (index < steps ? "border-accent bg-accent/10 text-accent" : "border-border bg-background text-secondary")}>{p}-{q}</span>)}</div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
          <div className="border border-border bg-background p-3 text-secondary">last pair<div className="font-mono text-primary">{active[0]}-{active[1]}</div></div>
          <div className="border border-success bg-success/10 p-3 text-secondary">connected<div className="font-mono text-success">{root(state.parent, active[0]) === root(state.parent, active[1]) ? "yes" : "no"}</div></div>
          <div className="border border-accent bg-accent/10 p-3 text-secondary">components<div className="font-mono text-accent">{state.count}</div></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Dynamic connectivity把pair stream累积成equivalence components；重复连接不改变partition或count。
      </figcaption>
    </figure>
  );
}

type UfOperation = "find" | "union" | "count";

const apiOperations = {
  find: { input: "site p", output: "canonical representative", mutation: "may compress path in UF" },
  union: { input: "sites p, q", output: "void", mutation: "merge roots; decrement count iff distinct" },
  count: { input: "none", output: "number of components", mutation: "none" },
} as const;

export function Algs4UnionFindApiMap() {
  const [operation, setOperation] = useState<UfOperation>("union");
  const active = apiOperations[operation];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 gap-2">{(Object.keys(apiOperations) as UfOperation[]).map((candidate) => <button key={candidate} type="button" onClick={() => setOperation(candidate)} className={"min-h-11 border text-xs font-semibold " + (operation === candidate ? "border-accent bg-accent text-background" : "border-border bg-background text-primary")}>{candidate}</button>)}</div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
          {Object.entries(active).map(([key, value]) => <div key={key} className="border border-border bg-background p-3 text-secondary">{key}<div className="mt-1 font-mono text-primary">{value}</div></div>)}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        同一Union-Find API可由多种representations实现，canonical representative本身不是永久业务ID。
      </figcaption>
    </figure>
  );
}

export function Algs4QuickFindIdLab() {
  const [steps, setSteps] = useState(4);
  const state = quickFindState(steps);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">quick-find unions = {steps}<input className="mt-2 w-full accent-current" type="range" min="0" max={pairs.length} value={steps} onChange={(event) => setSteps(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-10 gap-1">{state.id.map((id, index) => <div key={index} className="border border-border bg-background text-center"><div className="border-b border-border py-1 font-mono text-[10px] text-secondary">{index}</div><div className="py-2 font-mono text-xs text-primary">{id}</div></div>)}</div>
        <div className="mt-2 border border-warning bg-warning/10 p-3 text-xs text-warning">find = one read; union scans all {state.id.length} entries; components = {state.count}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Quick-find让component id直接可读，但union必须重写旧id的全部sites。
      </figcaption>
    </figure>
  );
}

export function Algs4QuickUnionForestLab() {
  const [weighted, setWeighted] = useState(false);
  const [steps, setSteps] = useState(7);
  const state = quickUnionState(steps, weighted);
  const depths = state.parent.map((_, index) => {
    let depth = 0;
    let current = index;
    while (current !== state.parent[current]) {
      depth += 1;
      current = state.parent[current];
    }
    return depth;
  });

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-2">{[false, true].map((candidate) => <button key={String(candidate)} type="button" onClick={() => setWeighted(candidate)} className={"min-h-11 border text-xs font-semibold " + (weighted === candidate ? "border-accent bg-accent text-background" : "border-border bg-background text-primary")}>{candidate ? "weighted by size" : "plain quick-union"}</button>)}</div>
        <label className="mt-4 block text-sm font-semibold text-primary">unions = {steps}<input className="mt-2 w-full accent-current" type="range" min="0" max={pairs.length} value={steps} onChange={(event) => setSteps(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-10 gap-1">{state.parent.map((parent, index) => <div key={index} className="border border-border bg-background p-2 text-center font-mono text-[10px] text-primary"><div>{index}-&gt;{parent}</div><div className="mt-1 text-secondary">d{depths[index]}</div></div>)}</div>
        <div className="mt-2 border border-success bg-success/10 p-3 text-xs text-success">max depth = {Math.max(...depths)}; components = {state.count}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Quick-union的find cost等于root path；size weighting把smaller tree挂到larger root。
      </figcaption>
    </figure>
  );
}

const halvingFrames = [
  [0, 0, 1, 2, 3, 4, 5, 6],
  [0, 0, 1, 2, 3, 4, 5, 5],
  [0, 0, 1, 2, 3, 3, 5, 5],
  [0, 0, 1, 1, 3, 3, 5, 5],
  [0, 0, 1, 1, 3, 3, 5, 5],
] as const;

export function Algs4PathHalvingLab() {
  const [step, setStep] = useState(0);
  const parent = halvingFrames[step];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">find(7) halving step = {step}<input className="mt-2 w-full accent-current" type="range" min="0" max={halvingFrames.length - 1} value={step} onChange={(event) => setStep(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-8 gap-1">{parent.map((value, index) => <div key={index} className={"border p-3 text-center font-mono text-xs " + (value !== halvingFrames[0][index] ? "border-success bg-success/10 text-success" : "border-border bg-background text-primary")}>{index}-&gt;{value}</div>)}</div>
        <div className="mt-2 border border-accent bg-accent/10 p-3 font-mono text-xs text-accent">parent[p] = parent[parent[p]]</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Path halving让visited nodes跳向grandparents，保留root与component partition并缩短future finds。
      </figcaption>
    </figure>
  );
}

type UfVariant = "quick-find" | "quick-union" | "weighted" | "rank + halving";

const costRows = {
  "quick-find": { find: "Theta(1)", union: "Theta(N)", sequence: "too slow for many unions" },
  "quick-union": { find: "Theta(N) worst", union: "Theta(N) worst", sequence: "tall trees possible" },
  weighted: { find: "Theta(log N)", union: "Theta(log N)", sequence: "tree depth <= lg N" },
  "rank + halving": { find: "Theta(log N) worst", union: "Theta(log N) worst", sequence: "O(M alpha(N)) amortized" },
} as const;

export function Algs4UnionFindCostModelLab() {
  const [variant, setVariant] = useState<UfVariant>("rank + halving");
  const active = costRows[variant];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <select className="min-h-11 w-full border border-border bg-background px-3 text-sm text-primary" value={variant} onChange={(event) => setVariant(event.target.value as UfVariant)}>
          {(Object.keys(costRows) as UfVariant[]).map((candidate) => <option key={candidate}>{candidate}</option>)}
        </select>
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
          <div className="border border-border bg-background p-3 text-secondary">find<div className="font-mono text-primary">{active.find}</div></div>
          <div className="border border-border bg-background p-3 text-secondary">union<div className="font-mono text-primary">{active.union}</div></div>
          <div className="border border-success bg-success/10 p-3 text-secondary">sequence<div className="font-mono text-success">{active.sequence}</div></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Worst-case单次bound与intermixed-sequence amortized bound必须分开陈述。
      </figcaption>
    </figure>
  );
}
