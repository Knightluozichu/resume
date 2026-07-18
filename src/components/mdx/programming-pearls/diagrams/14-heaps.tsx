"use client";

import { useState, type ReactNode } from "react";

function Panel({ children }: { children: ReactNode }) {
  return <div className="border border-border bg-elevated p-4 sm:p-5">{children}</div>;
}

function Caption({ children }: { children: ReactNode }) {
  return <figcaption className="mt-2 text-center text-sm text-secondary">{children}</figcaption>;
}

const minHeap = [12, 20, 15, 29, 23, 17, 22, 35, 40, 26, 51, 19];

export function PP2HeapShapeLab() {
  const [n, setN] = useState(12);
  const levels = Math.floor(Math.log2(Math.max(1, n))) + 1;
  const bottom = n - (2 ** (levels - 1) - 1);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-xs text-secondary">complete-tree nodes n = {n}<input className="mt-2 w-full accent-current" type="range" min="1" max="31" value={n} onChange={(event) => setN(Number(event.target.value))} /></label>
        <div className="mt-4 space-y-2">{Array.from({ length: levels }, (_, level) => { const count = level === levels - 1 ? bottom : 2 ** level; return <div key={level} className="flex justify-center gap-1">{Array.from({ length: count }, (_, index) => <span key={index} className={"h-6 w-6 border " + (level === levels - 1 ? "border-warning bg-warning/20" : "border-accent bg-accent/20")} />)}</div>; })}</div>
        <div className="mt-3 grid gap-2 sm:grid-cols-3"><div className="border border-success p-3 text-success">levels <span className="float-right font-mono">{levels}</span></div><div className="border border-warning p-3 text-warning">bottom nodes <span className="float-right font-mono">{bottom}</span></div><div className="border border-accent p-3 text-accent">max edge depth <span className="float-right font-mono">{levels - 1}</span></div></div>
      </Panel>
      <Caption>The shape property fills every level before the next and packs the bottom level leftward, bounding every root-to-node path by floor(log2 n).</Caption>
    </figure>
  );
}

export function PP2ArrayIndexLab() {
  const [index, setIndex] = useState(6);
  const parent = Math.floor(index / 2);
  const left = 2 * index;
  const right = left + 1;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-xs text-secondary">selected 1-based index i = {index}<input className="mt-2 w-full accent-current" type="range" min="1" max="12" value={index} onChange={(event) => setIndex(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-6 gap-1 sm:grid-cols-12">{minHeap.map((value, position) => { const i = position + 1; const active = i === index; const relation = i === parent || i === left || i === right; return <div key={i} className={"border p-2 text-center text-xs " + (active ? "border-warning text-warning" : relation ? "border-accent text-accent" : "border-border text-secondary")}><div className="font-mono">{value}</div><div className="mt-1 text-[9px]">{i}</div></div>; })}</div>
        <div className="mt-3 grid gap-2 sm:grid-cols-3"><div className="border border-accent p-3 text-accent">parent <span className="float-right font-mono">{index === 1 ? "none" : parent}</span></div><div className="border border-success p-3 text-success">left <span className="float-right font-mono">{left <= 12 ? left : "null"}</span></div><div className="border border-success p-3 text-success">right <span className="float-right font-mono">{right <= 12 ? right : "null"}</span></div></div>
      </Panel>
      <Caption>A 1-based array encodes parent i/2 and children 2i, 2i+1 without pointers; the representation guarantees the heap’s shape property.</Caption>
    </figure>
  );
}

export function PP2SiftUpLab() {
  const states = [
    [12, 20, 15, 29, 23, 17, 22, 35, 40, 26, 51, 19, 13],
    [12, 20, 15, 29, 23, 13, 22, 35, 40, 26, 51, 19, 17],
    [12, 20, 13, 29, 23, 15, 22, 35, 40, 26, 51, 19, 17],
  ];
  const active = [13, 6, 3];
  const [step, setStep] = useState(0);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-xs text-secondary">siftup step = {step}<input className="mt-2 w-full accent-current" type="range" min="0" max="2" value={step} onChange={(event) => setStep(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-7 gap-1 sm:grid-cols-13">{states[step].map((value, index) => <div key={index} className={"border p-2 text-center font-mono text-xs " + (index + 1 === active[step] ? "border-warning text-warning" : "border-border text-secondary")}>{value}</div>)}</div>
        <div className="mt-3 border border-accent p-3 text-accent">possible broken edge <span className="float-right font-mono">i={active[step]}, parent={Math.floor(active[step] / 2)}</span></div>
      </Panel>
      <Caption>Starting from the book’s 12-item heap, the new 13 moves from index 13 to 6 to 3; every other parent-child edge remains valid.</Caption>
    </figure>
  );
}

export function PP2SiftDownLab() {
  const states = [
    [18, 20, 15, 29, 23, 17, 22, 35, 40, 26, 51, 19],
    [15, 20, 18, 29, 23, 17, 22, 35, 40, 26, 51, 19],
    [15, 20, 17, 29, 23, 18, 22, 35, 40, 26, 51, 19],
  ];
  const active = [1, 3, 6];
  const [step, setStep] = useState(0);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-xs text-secondary">siftdown step = {step}<input className="mt-2 w-full accent-current" type="range" min="0" max="2" value={step} onChange={(event) => setStep(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-6 gap-1 sm:grid-cols-12">{states[step].map((value, index) => <div key={index} className={"border p-2 text-center font-mono text-xs " + (index + 1 === active[step] ? "border-warning text-warning" : "border-border text-secondary")}>{value}</div>)}</div>
        <div className="mt-3 border border-success p-3 text-success">choose the lesser child before swapping <span className="float-right font-mono">active i={active[step]}</span></div>
      </Panel>
      <Caption>When 18 replaces the root, siftdown follows the lesser-child path 1 → 3 → 6; choosing either child arbitrarily would not restore a min-heap.</Caption>
    </figure>
  );
}

export function PP2HeapInvariantLab() {
  const [broken, setBroken] = useState<"none" | "shape" | "order" | "path">("none");
  const checks = { completeShape: broken !== "shape", parentOrder: broken !== "order", singleRepairPath: broken !== "path", boundedDepth: broken !== "shape", rootMinimum: broken !== "order" };
  const valid = Object.values(checks).every(Boolean);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-xs text-secondary">invariant scenario<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={broken} onChange={(event) => setBroken(event.target.value as typeof broken)}><option value="none">valid heap / valid repair precondition</option><option value="shape">hole in complete tree</option><option value="order">child smaller than parent</option><option value="path">multiple unrelated broken edges</option></select></label>
        <div className="mt-4 grid grid-cols-5 gap-2">{Object.entries(checks).map(([name, ok]) => <div key={name} className={"border p-2 text-center text-[10px] " + (ok ? "border-success text-success" : "border-danger text-danger")}><div>{name}</div><div className="mt-1 font-mono">{ok ? "pass" : "fail"}</div></div>)}</div>
        <div className={"mt-3 border p-3 " + (valid ? "border-success text-success" : "border-danger text-danger")}>{valid ? "Heap contract or local repair precondition holds." : "A one-path sift cannot justify this state."}</div>
      </Panel>
      <Caption>Shape and order are data-structure invariants; siftup and siftdown additionally require that any possible violation lies on one repair path.</Caption>
    </figure>
  );
}

export function PP2PriorityQueueLab() {
  const [operation, setOperation] = useState<"insert" | "extract">("insert");
  const [n, setN] = useState(1024);
  const levels = Math.ceil(Math.log2(Math.max(2, n)));

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="grid gap-3 sm:grid-cols-2"><label className="text-xs text-secondary">queue size n = {n}<input className="mt-2 w-full accent-current" type="range" min="2" max="100000" step="2" value={n} onChange={(event) => setN(Number(event.target.value))} /></label><label className="text-xs text-secondary">operation<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={operation} onChange={(event) => setOperation(event.target.value as typeof operation)}><option value="insert">insert(t): append + siftup</option><option value="extract">extractmin(): root + last + siftdown</option></select></label></div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3"><div className="border border-accent p-3 text-accent">root minimum <span className="float-right font-mono">O(1)</span></div><div className="border border-warning p-3 text-warning">repair path <span className="float-right font-mono">≤ {levels}</span></div><div className="border border-success p-3 text-success">{operation} <span className="float-right font-mono">O(log n)</span></div></div>
      </Panel>
      <Caption>The priority-queue ADT hides the heap: insert appends then sifts up, while extractmin removes the root, moves the last item, and sifts down.</Caption>
    </figure>
  );
}

export function PP2PQTradeoffLab() {
  const [n, setN] = useState(1000);
  const log = Math.log2(n);
  const rows = [
    ["sorted sequence", n, 1],
    ["heap", log, log],
    ["unsorted sequence", 1, n],
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-xs text-secondary">operation scale n = {n}<input className="mt-2 w-full accent-current" type="range" min="10" max="10000" step="10" value={n} onChange={(event) => setN(Number(event.target.value))} /></label>
        <div className="mt-4 space-y-2">{rows.map(([name, insert, extract]) => <div key={name} className="grid grid-cols-[120px_1fr_1fr] gap-2 text-xs"><span className="text-secondary">{name}</span><span className="border border-accent p-2 text-accent">insert {Math.round(insert)}</span><span className="border border-warning p-2 text-warning">extract {Math.round(extract)}</span></div>)}</div>
        <div className="mt-3 text-xs text-secondary">Illustrative operation counts expose where each representation pays; constants still require measurement.</div>
      </Panel>
      <Caption>Sorted and unsorted sequences make one operation cheap by making the other linear; a heap balances both at logarithmic worst-case cost.</Caption>
    </figure>
  );
}

export function PP2PQSortLab() {
  const [n, setN] = useState(1000000);
  const itemBytes = 8;
  const extraMiB = n * itemBytes / 1024 / 1024;
  const operations = 2 * n * Math.log2(n);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-xs text-secondary">items n = {n.toLocaleString()}<input className="mt-2 w-full accent-current" type="range" min="1000" max="5000000" step="1000" value={n} onChange={(event) => setN(Number(event.target.value))} /></label>
        <div className="mt-4 grid gap-2 sm:grid-cols-3"><div className="border border-accent p-3 text-accent">n inserts <span className="float-right font-mono">n log n</span></div><div className="border border-warning p-3 text-warning">n extracts <span className="float-right font-mono">n log n</span></div><div className="border border-danger p-3 text-danger">extra queue <span className="float-right font-mono">{extraMiB.toFixed(1)} MiB</span></div></div>
        <div className="mt-3 text-xs text-secondary">comparison-path upper model: {Math.round(operations).toLocaleString()}</div>
      </Panel>
      <Caption>pqsort is conceptually clean but stores another n-item queue; Heapsort overlays heap and output in the input array to remove that extra space.</Caption>
    </figure>
  );
}

export function PP2HeapSortPartitionLab() {
  const [boundary, setBoundary] = useState(12);
  const n = 16;
  const sorted = n - boundary;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-xs text-secondary">active heap size i = {boundary}<input className="mt-2 w-full accent-current" type="range" min="1" max={n} value={boundary} onChange={(event) => setBoundary(Number(event.target.value))} /></label>
        <div className="mt-4 flex h-12 border border-border"><div className="flex items-center justify-center bg-accent/20 text-xs text-accent" style={{ width: `${boundary / n * 100}%` }}>max-heap · {boundary}</div><div className="flex items-center justify-center bg-success/20 text-xs text-success" style={{ width: `${sorted / n * 100}%` }}>{sorted > 0 ? `sorted · ${sorted}` : ""}</div></div>
        <div className="mt-3 border border-warning p-3 text-warning">cross-region relation <span className="float-right font-mono">heap values ≤ sorted suffix</span></div>
      </Panel>
      <Caption>Heapsort overlays two abstractions in one array: a shrinking max-heap prefix and a growing sorted suffix whose values dominate the prefix.</Caption>
    </figure>
  );
}

export function PP2HeapBuildLab() {
  const [n, setN] = useState(1000000);
  const incremental = n * Math.log2(n);
  const bottomUp = 2 * n;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-xs text-secondary">array size n = {n.toLocaleString()}<input className="mt-2 w-full accent-current" type="range" min="1000" max="5000000" step="1000" value={n} onChange={(event) => setN(Number(event.target.value))} /></label>
        <div className="mt-4 grid gap-3 sm:grid-cols-2"><div className="border border-warning p-4 text-warning"><div className="text-xs">incremental siftup upper model</div><div className="mt-1 font-mono text-xl">{Math.round(incremental).toLocaleString()}</div></div><div className="border border-success p-4 text-success"><div className="text-xs">bottom-up heapify model</div><div className="mt-1 font-mono text-xl">{Math.round(bottomUp).toLocaleString()}</div></div></div>
        <div className="mt-3 text-xs text-secondary">Leaves need zero work; half the nodes have height 1, a quarter height 2, so weighted repair heights sum to O(n).</div>
      </Panel>
      <Caption>The book’s main derivation builds by repeated siftup, while its problems lead to bottom-up siftdown heap construction in linear time and less code.</Caption>
    </figure>
  );
}

export function PP2HeapCertificateLab() {
  const [missing, setMissing] = useState<"none" | "shape" | "order" | "bounds" | "oracle" | "comparison">("none");
  const checks = { shape: missing !== "shape", order: missing !== "order", capacity: missing !== "bounds", differentialOracle: missing !== "oracle", comparisonBaseline: missing !== "comparison", partitionInvariant: true };
  const accepted = Object.values(checks).every(Boolean);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-xs text-secondary">heap review<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={missing} onChange={(event) => setMissing(event.target.value as typeof missing)}><option value="none">complete evidence</option><option value="shape">shape proof missing</option><option value="order">parent-child checks missing</option><option value="bounds">empty/full behavior missing</option><option value="oracle">library differential oracle missing</option><option value="comparison">sort/PQ baseline missing</option></select></label>
        <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6">{Object.entries(checks).map(([name, ok]) => <div key={name} className={"border p-2 text-center text-[10px] " + (ok ? "border-success text-success" : "border-danger text-danger")}><div>{name}</div><div className="mt-1 font-mono">{ok ? "pass" : "fail"}</div></div>)}</div>
        <div className={"mt-3 border p-3 text-sm " + (accepted ? "border-success text-success" : "border-danger text-danger")}>{accepted ? "The heap-backed operation is ready for its stated contract." : "The heap claim is missing required evidence."}</div>
      </Panel>
      <Caption>Release evidence joins structural invariants with boundary behavior, a library oracle, Heapsort’s partition invariant, and workload-specific baselines.</Caption>
    </figure>
  );
}
