"use client";

import { useMemo, useState } from "react";

const relationClasses = [
  [0, 2, 4],
  [1, 3, 5],
] as const;

function sameClass(a: number, b: number) {
  return relationClasses.some((group) => group.includes(a as never) && group.includes(b as never));
}

export function DsaEquivalenceRelationLab() {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(4);
  const equivalent = sameClass(left, right);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-semibold text-primary">a = {left}<input className="mt-2 w-full accent-current" type="range" min="0" max="5" value={left} onChange={(event) => setLeft(Number(event.target.value))} /></label>
          <label className="text-sm font-semibold text-primary">b = {right}<input className="mt-2 w-full accent-current" type="range" min="0" max="5" value={right} onChange={(event) => setRight(Number(event.target.value))} /></label>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {relationClasses.map((group, index) => (
            <div key={index} className="border border-border bg-background p-3 text-center font-mono text-xs text-primary">{`C${index}: {${group.join(", ")}}`}</div>
          ))}
        </div>
        <div className={"mt-3 border p-3 text-center font-mono text-sm font-semibold " + (equivalent ? "border-success bg-success/10 text-success" : "border-warning bg-warning/10 text-warning")}>{left} ~ {right}: {equivalent ? "true" : "false"}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Equivalence relation 把universe唯一分成互不相交的classes。</figcaption>
    </figure>
  );
}

const unionOperations = [
  [0, 1],
  [2, 3],
  [4, 5],
  [1, 3],
  [3, 5],
] as const;

function buildParents(step: number, compress = false) {
  const parent = Array.from({ length: 6 }, (_, index) => index);
  const rank = Array(6).fill(0) as number[];
  const find = (x: number): number => {
    if (parent[x] === x) return x;
    const root = find(parent[x]);
    if (compress) parent[x] = root;
    return root;
  };
  for (let i = 0; i < step; i += 1) {
    const [a, b] = unionOperations[i];
    let rootA = find(a);
    let rootB = find(b);
    if (rootA === rootB) continue;
    if (rank[rootA] < rank[rootB]) [rootA, rootB] = [rootB, rootA];
    parent[rootB] = rootA;
    if (rank[rootA] === rank[rootB]) rank[rootA] += 1;
  }
  if (compress) {
    for (let i = 0; i < parent.length; i += 1) find(i);
  }
  return { parent, rank };
}

export function DsaDynamicEquivalenceLab() {
  const [step, setStep] = useState(3);
  const state = buildParents(step);
  const groups = useMemo(() => {
    const result = new Map<number, number[]>();
    const rootOf = (x: number): number => state.parent[x] === x ? x : rootOf(state.parent[x]);
    for (let item = 0; item < state.parent.length; item += 1) {
      const root = rootOf(item);
      result.set(root, [...(result.get(root) ?? []), item]);
    }
    return [...result.values()];
  }, [state.parent]);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">processed unions = {step}<input className="mt-2 w-full accent-current" type="range" min="0" max={unionOperations.length} value={step} onChange={(event) => setStep(Number(event.target.value))} /></label>
        <div className="mt-4 flex flex-wrap gap-2">
          {groups.map((group) => (
            <div key={group[0]} className="border border-accent bg-accent/10 px-3 py-2 font-mono text-xs text-accent">{`{${group.join(", ")}}`}</div>
          ))}
        </div>
        <div className="mt-3 border border-border bg-background p-3 font-mono text-xs text-secondary">next: {step < unionOperations.length ? `union(${unionOperations[step][0]}, ${unionOperations[step][1]})` : "all operations consumed"}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Dynamic equivalence 只合并classes；find查询当前representative，不枚举整张relation matrix。</figcaption>
    </figure>
  );
}

export function DsaParentArrayLab() {
  const [compressed, setCompressed] = useState(false);
  const state = buildParents(unionOperations.length, compressed);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="flex min-h-11 items-center gap-3 text-sm font-semibold text-primary"><input type="checkbox" checked={compressed} onChange={(event) => setCompressed(event.target.checked)} />run find on every element</label>
        <div className="mt-4 grid grid-cols-6 gap-1">
          {state.parent.map((parent, index) => (
            <div key={index} className="border border-border bg-background p-2 text-center font-mono text-xs">
              <div className="text-muted">{index}</div>
              <div className="mt-1 font-semibold text-primary">p={parent}</div>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Parent array把每个set表示成rooted tree；root是自身parent，教材负值版本还在root编码rank。</figcaption>
    </figure>
  );
}

export function DsaUnionHeuristicLab() {
  const [strategy, setStrategy] = useState<"naive" | "size" | "rank">("rank");
  const details = {
    naive: { choice: "root2 -> root1", bound: "can form height N-1" },
    size: { choice: "smaller tree -> larger root", bound: "height at most log2 N" },
    rank: { choice: "lower rank -> higher rank", bound: "rank rises only on equal ranks" },
  }[strategy];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 gap-2">
          {(["naive", "size", "rank"] as const).map((candidate) => (
            <button key={candidate} type="button" onClick={() => setStrategy(candidate)} className={"min-h-11 border text-xs font-semibold " + (strategy === candidate ? "border-accent bg-accent text-background" : "border-border bg-background text-primary")}>{candidate}</button>
          ))}
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <div className="border border-border bg-background p-3 text-xs text-secondary">attach rule<div className="mt-1 font-mono text-primary">{details.choice}</div></div>
          <div className="border border-success bg-success/10 p-3 text-xs text-secondary">shape effect<div className="mt-1 font-mono text-success">{details.bound}</div></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Union heuristic只决定两棵rooted trees如何连接；调用者必须先find roots。</figcaption>
    </figure>
  );
}

const chainParents = [0, 0, 1, 2, 3, 4, 5, 6] as const;

export function DsaPathCompressionLab() {
  const [compressed, setCompressed] = useState(false);
  const path = compressed ? [7, 0] : [7, 6, 5, 4, 3, 2, 1, 0];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <button type="button" onClick={() => setCompressed((value) => !value)} className="min-h-11 w-full border border-accent bg-accent px-3 text-sm font-semibold text-background">{compressed ? "reset chain" : "find(7) with path compression"}</button>
        <div className="mt-4 flex gap-1">
          {chainParents.map((parent, index) => (
            <div key={index} className={"flex-1 border p-2 text-center font-mono text-[10px] " + (path.includes(index) ? "border-success bg-success/10 text-success" : "border-border bg-background text-muted")}>
              <div>{index}</div>
              <div>p={compressed && index > 0 ? 0 : parent}</div>
            </div>
          ))}
        </div>
        <div className="mt-3 border border-border bg-background p-3 font-mono text-xs text-primary">visited: {path.join(" -> ")}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Path compression在find返回时把访问路径直接挂到root，让后续queries复用这次工作。</figcaption>
    </figure>
  );
}

export function DsaInverseAckermannLab() {
  const [scale, setScale] = useState<0 | 1 | 2>(1);
  const rows = [
    { label: "N <= 2^16", alpha: 3, note: "ordinary arrays" },
    { label: "N <= 2^65536", alpha: 4, note: "far beyond memory" },
    { label: "practical universe", alpha: 4, note: "effectively constant" },
  ] as const;
  const row = rows[scale];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 gap-2">
          {rows.map((item, index) => (
            <button key={item.label} type="button" onClick={() => setScale(index as 0 | 1 | 2)} className={"min-h-12 border px-1 text-[10px] font-semibold " + (scale === index ? "border-accent bg-accent text-background" : "border-border bg-background text-primary")}>{item.label}</button>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-[auto_1fr] gap-2">
          <div className="border border-success bg-success/10 p-3 font-mono text-sm font-semibold text-success">alpha = {row.alpha}</div>
          <div className="border border-border bg-background p-3 text-xs text-secondary">{row.note}</div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Union-by-rank加path compression的amortized bound含inverse Ackermann function，增长极慢但并非字面常数。</figcaption>
    </figure>
  );
}

const graphEdges = [
  { edge: "A-B", weight: 1, accepted: true },
  { edge: "C-D", weight: 2, accepted: true },
  { edge: "B-C", weight: 3, accepted: true },
  { edge: "A-D", weight: 4, accepted: false },
] as const;

export function DsaDisjointSetApplicationLab() {
  const [step, setStep] = useState(2);
  const edge = graphEdges[step];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-4 gap-1">
          {graphEdges.map((item, index) => (
            <button key={item.edge} type="button" onClick={() => setStep(index)} className={"min-h-12 border p-1 font-mono text-[10px] " + (step === index ? "border-accent bg-accent text-background" : "border-border bg-background text-primary")}>{item.edge}<span className="block">w={item.weight}</span></button>
          ))}
        </div>
        <div className={"mt-4 border p-3 text-center text-sm font-semibold " + (edge.accepted ? "border-success bg-success/10 text-success" : "border-warning bg-warning/10 text-warning")}>{edge.edge}: {edge.accepted ? "different roots -> accept + union" : "same root -> reject cycle"}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Kruskal按weight扫描edges，用find判断是否成环，用union记录新连通分量。</figcaption>
    </figure>
  );
}
