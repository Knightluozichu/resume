"use client";

import { useState } from "react";

type AdvancedStructure = "splay" | "red-black" | "skip-list" | "AA" | "treap" | "k-d" | "pairing";

export function DsaAdvancedStructureChoiceLab() {
  const [structure, setStructure] = useState<AdvancedStructure>("red-black");
  const details = {
    splay: { invariant: "BST only; self-adjust on access", strength: "locality + amortized access" },
    "red-black": { invariant: "color + equal black height", strength: "worst-case logarithmic map" },
    "skip-list": { invariant: "bounded deterministic gaps", strength: "layered ordered search" },
    AA: { invariant: "right-horizontal levels only", strength: "two balancing primitives" },
    treap: { invariant: "BST keys + heap priorities", strength: "randomized expected balance" },
    "k-d": { invariant: "alternate spatial dimensions", strength: "orthogonal range pruning" },
    pairing: { invariant: "heap order + multiway tree", strength: "simple meld/decrease-key" },
  }[structure];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <select className="min-h-11 w-full border border-border bg-background px-3 text-sm text-primary" value={structure} onChange={(event) => setStructure(event.target.value as AdvancedStructure)}>
          {(Object.keys(details) as AdvancedStructure[]).map((candidate) => <option key={candidate}>{candidate}</option>)}
        </select>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <div className="border border-border bg-background p-3 text-xs text-secondary">invariant<div className="mt-1 font-mono text-primary">{details.invariant}</div></div>
          <div className="border border-success bg-success/10 p-3 text-xs text-secondary">best fit<div className="mt-1 font-mono text-success">{details.strength}</div></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Advanced structures优化不同operation；复杂实现必须由workload与可验证invariant支撑。</figcaption>
    </figure>
  );
}

export function DsaTopDownSplayLab() {
  const [target, setTarget] = useState(35);
  const values = [10, 20, 30, 40, 50, 60];
  const less = values.filter((value) => value < target);
  const greater = values.filter((value) => value > target);
  const found = values.includes(target);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">search key = {target}<input className="mt-2 w-full accent-current" type="range" min="5" max="65" step="5" value={target} onChange={(event) => setTarget(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-[1fr_auto_1fr] gap-2">
          <div className="border border-accent bg-accent/10 p-3 text-center font-mono text-xs text-accent">{less.join(", ") || "empty"}</div>
          <div className="border border-success bg-success/10 p-3 text-center font-mono text-xs text-success">{found ? target : "last"}</div>
          <div className="border border-warning bg-warning/10 p-3 text-center font-mono text-xs text-warning">{greater.join(", ") || "empty"}</div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Top-down splay在下降时把smaller/larger fragments挂到header两侧，最后一次性assemble。</figcaption>
    </figure>
  );
}

export function DsaRedBlackInvariantLab() {
  const [violation, setViolation] = useState<"none" | "red-red" | "black-height">("red-red");
  const details = {
    none: { color: "success", text: "root black; no red-red; equal black height" },
    "red-red": { color: "warning", text: "red parent has red child -> recolor/rotate" },
    "black-height": { color: "warning", text: "root-to-null paths disagree -> invariant broken" },
  }[violation];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 gap-2">
          {(["none", "red-red", "black-height"] as const).map((candidate) => <button key={candidate} type="button" onClick={() => setViolation(candidate)} className={"min-h-11 border px-1 text-[10px] font-semibold sm:text-xs " + (violation === candidate ? "border-accent bg-accent text-background" : "border-border bg-background text-primary")}>{candidate}</button>)}
        </div>
        <div className={"mt-4 border p-3 text-center font-mono text-xs " + (details.color === "success" ? "border-success bg-success/10 text-success" : "border-warning bg-warning/10 text-warning")}>{details.text}</div>
        <div className="mt-3 grid grid-cols-4 gap-1">{["B", "R", "B", "B"].map((color, index) => <span key={index} className={"aspect-square border p-2 text-center font-mono text-xs " + (color === "R" ? "border-danger bg-danger/10 text-danger" : "border-border bg-background text-primary")}>{color}</span>)}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Red-black invariants把最长path限制在最短path的两倍以内；rotation与color flip必须一起验。</figcaption>
    </figure>
  );
}

export function DsaDeterministicSkipListLab() {
  const [gap, setGap] = useState<1 | 2 | 3>(3);
  const bottom = [10, 20, 30, 40, 50, 60, 70];
  const promoted = bottom.filter((_, index) => index % gap === Math.floor(gap / 2));

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 gap-2">{([1, 2, 3] as const).map((candidate) => <button key={candidate} type="button" onClick={() => setGap(candidate)} className={"min-h-10 border text-xs font-semibold " + (gap === candidate ? "border-accent bg-accent text-background" : "border-border bg-background text-primary")}>gap {candidate}</button>)}</div>
        <div className="mt-4 border border-accent bg-accent/10 p-3 font-mono text-xs text-accent">upper: {promoted.join(" -> ")}</div>
        <div className="mt-2 border border-border bg-background p-3 font-mono text-xs text-primary">bottom: {bottom.join(" -> ")}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Deterministic skip list在gap达到3时promote middle item，以层级不变量取代random heights。</figcaption>
    </figure>
  );
}

export function DsaAATreeSkewSplitLab() {
  const [operation, setOperation] = useState<"skew" | "split">("skew");
  const detail = operation === "skew"
    ? { before: "left child level == node level", action: "rotate right", after: "remove left horizontal link" }
    : { before: "two consecutive right links at same level", action: "rotate left + level++", after: "break double right link" };

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-2">{(["skew", "split"] as const).map((candidate) => <button key={candidate} type="button" onClick={() => setOperation(candidate)} className={"min-h-10 border text-xs font-semibold " + (operation === candidate ? "border-accent bg-accent text-background" : "border-border bg-background text-primary")}>{candidate}</button>)}</div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          <div className="border border-warning bg-warning/10 p-3 font-mono text-xs text-warning">{detail.before}</div>
          <div className="border border-accent bg-accent/10 p-3 font-mono text-xs text-accent">{detail.action}</div>
          <div className="border border-success bg-success/10 p-3 font-mono text-xs text-success">{detail.after}</div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">AA-tree把red-black的多种cases规范成skew与split两个local primitives。</figcaption>
    </figure>
  );
}

const treapNodes = [
  { key: 20, priority: 70 },
  { key: 10, priority: 90 },
  { key: 40, priority: 30 },
  { key: 30, priority: 60 },
] as const;

export function DsaTreapDualOrderLab() {
  const [view, setView] = useState<"key" | "priority">("key");
  const sorted = [...treapNodes].sort((a, b) => view === "key" ? a.key - b.key : a.priority - b.priority);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-2">{(["key", "priority"] as const).map((candidate) => <button key={candidate} type="button" onClick={() => setView(candidate)} className={"min-h-10 border text-xs font-semibold " + (view === candidate ? "border-accent bg-accent text-background" : "border-border bg-background text-primary")}>{candidate} order</button>)}</div>
        <div className="mt-4 flex gap-2">{sorted.map((node) => <div key={node.key} className="flex-1 border border-border bg-background p-2 text-center font-mono text-[10px]"><div>k={node.key}</div><div className="mt-1 text-accent">p={node.priority}</div></div>)}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Treap同时保持BST key order与min-heap random priority；rotation恢复priority而不破坏inorder。</figcaption>
    </figure>
  );
}

const kdPoints = [
  [2, 7], [3, 3], [5, 6], [6, 2], [7, 8], [8, 4],
] as const;

export function DsaKdRangeLab() {
  const [low, setLow] = useState(3);
  const [high, setHigh] = useState(7);
  const matches = kdPoints.filter(([x, y]) => x >= low && x <= high && y >= low && y <= high);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-semibold text-primary">low = {low}<input className="mt-2 w-full accent-current" type="range" min="0" max="5" value={low} onChange={(event) => setLow(Math.min(Number(event.target.value), high))} /></label>
          <label className="text-sm font-semibold text-primary">high = {high}<input className="mt-2 w-full accent-current" type="range" min="5" max="10" value={high} onChange={(event) => setHigh(Math.max(Number(event.target.value), low))} /></label>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">{kdPoints.map(([x, y]) => { const selected = matches.some(([mx, my]) => mx === x && my === y); return <div key={`${x}-${y}`} className={"border p-2 text-center font-mono text-xs " + (selected ? "border-success bg-success/10 text-success" : "border-border bg-background text-muted")}>({x},{y})</div>; })}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">k-d range query按当前split dimension判断哪些subtrees可能与query box相交并剪枝。</figcaption>
    </figure>
  );
}

export function DsaPairingHeapMergeLab() {
  const [siblings, setSiblings] = useState(7);
  const firstPass = Math.ceil(siblings / 2);
  const secondPass = Math.max(0, firstPass - 1);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">children after deleteMin = {siblings}<input className="mt-2 w-full accent-current" type="range" min="1" max="12" value={siblings} onChange={(event) => setSiblings(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
          <div className="border border-border bg-background p-3 text-secondary">input trees<div className="mt-1 font-mono text-primary">{siblings}</div></div>
          <div className="border border-accent bg-accent/10 p-3 text-secondary">left-right pairs<div className="mt-1 font-mono text-accent">{firstPass}</div></div>
          <div className="border border-success bg-success/10 p-3 text-secondary">right-left combines<div className="mt-1 font-mono text-success">{secondPass}</div></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Pairing heap deleteMin先left-to-right pair siblings，再right-to-left fold，避免单向退化合并。</figcaption>
    </figure>
  );
}
