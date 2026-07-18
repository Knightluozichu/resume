"use client";

import { useMemo, useState } from "react";

type BNode = {
  id: number;
  keys: number[];
  children: BNode[];
};

let nodeSequence = 0;

function newNode(keys: number[] = [], children: BNode[] = []): BNode {
  return { id: nodeSequence++, keys, children };
}

function splitChild(parent: BNode, index: number) {
  const child = parent.children[index];
  const median = child.keys[1];
  const right = newNode(
    child.keys.slice(2),
    child.children.length > 0 ? child.children.slice(2) : [],
  );
  child.keys = child.keys.slice(0, 1);
  if (child.children.length > 0) child.children = child.children.slice(0, 2);
  parent.keys.splice(index, 0, median);
  parent.children.splice(index + 1, 0, right);
}

function insertNonFull(node: BNode, key: number) {
  if (node.children.length === 0) {
    if (!node.keys.includes(key)) node.keys.push(key);
    node.keys.sort((left, right) => left - right);
    return;
  }
  let index = 0;
  while (index < node.keys.length && key > node.keys[index]) index += 1;
  if (node.keys[index] === key) return;
  if (node.children[index].keys.length === 3) {
    splitChild(node, index);
    if (key === node.keys[index]) return;
    if (key > node.keys[index]) index += 1;
  }
  insertNonFull(node.children[index], key);
}

function insert(root: BNode, key: number) {
  if (root.keys.length === 3) {
    const nextRoot = newNode([], [root]);
    splitChild(nextRoot, 0);
    insertNonFull(nextRoot, key);
    return nextRoot;
  }
  insertNonFull(root, key);
  return root;
}

function buildTree(keys: number[]) {
  nodeSequence = 0;
  let root = newNode();
  for (const key of keys) root = insert(root, key);
  return root;
}

function treeHeight(root: BNode) {
  let height = 0;
  let node = root;
  while (node.children.length > 0) {
    height += 1;
    node = node.children[0];
  }
  return height;
}

function searchPath(root: BNode, key: number) {
  const path: { node: BNode; slot: number; found: boolean }[] = [];
  let node: BNode | undefined = root;
  while (node) {
    let slot = 0;
    while (slot < node.keys.length && key > node.keys[slot]) slot += 1;
    const found = node.keys[slot] === key;
    path.push({ node, slot, found });
    if (found || node.children.length === 0) break;
    node = node.children[slot];
  }
  return path;
}

function collectLeafDepths(node: BNode, depth = 0, result: number[] = []) {
  if (node.children.length === 0) result.push(depth);
  else for (const child of node.children) collectLeafDepths(child, depth + 1, result);
  return result;
}

function validateTree(root: BNode) {
  let ordered = true;
  let occupancy = true;
  let arity = true;
  let separator = true;

  function visit(node: BNode, low: number, high: number, isRoot: boolean) {
    if (node.keys.some((key, index) => (index > 0 && key <= node.keys[index - 1]) || key <= low || key >= high)) ordered = false;
    if ((!isRoot && node.keys.length < 1) || node.keys.length > 3) occupancy = false;
    if (node.children.length > 0 && node.children.length !== node.keys.length + 1) arity = false;
    if (node.children.length > 0) {
      for (let index = 0; index < node.children.length; index++) {
        const childLow = index === 0 ? low : node.keys[index - 1];
        const childHigh = index === node.keys.length ? high : node.keys[index];
        const childKeys = flattenKeys(node.children[index]);
        if (childKeys.some((key) => key <= childLow || key >= childHigh)) separator = false;
        visit(node.children[index], childLow, childHigh, false);
      }
    }
  }

  visit(root, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, true);
  const depths = collectLeafDepths(root);
  const balanced = depths.every((depth) => depth === depths[0]);
  return { ordered, occupancy, arity, separator, balanced };
}

function flattenKeys(node: BNode): number[] {
  return [...node.keys, ...node.children.flatMap(flattenKeys)];
}

function NodeView({ node, activeId }: { node: BNode; activeId?: number }) {
  return (
    <div className="flex min-w-max flex-col items-center">
      <div className={"flex border p-1 " + (node.id === activeId ? "border-warning bg-warning/10" : "border-border bg-background")}>{node.keys.map((key) => <div key={key} className="min-w-9 border-r border-border px-2 py-1 text-center font-mono text-xs text-primary last:border-r-0">{key}</div>)}</div>
      {node.children.length > 0 ? <div className="mt-4 flex items-start gap-3">{node.children.map((child) => <NodeView key={child.id} node={child} activeId={activeId} />)}</div> : null}
    </div>
  );
}

const insertionSequence = [40, 20, 60, 10, 30, 50, 70, 5, 15, 25, 35, 45, 55, 65, 75];
const stableTree = buildTree(insertionSequence);

export function Algs4StorageHierarchyMap() {
  const [level, setLevel] = useState<"CPU cache" | "DRAM" | "SSD" | "network storage">("SSD");
  const levels = [
    { name: "CPU cache", unit: "cache line", latency: 1, tone: "border-success text-success" },
    { name: "DRAM", unit: "memory page", latency: 20, tone: "border-accent text-accent" },
    { name: "SSD", unit: "4–16 KiB page", latency: 2000, tone: "border-warning text-warning" },
    { name: "network storage", unit: "remote block", latency: 20000, tone: "border-danger text-danger" },
  ] as const;
  const selected = levels.find((item) => item.name === level) ?? levels[2];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-2 sm:grid-cols-4">{levels.map((item) => <button key={item.name} type="button" onClick={() => setLevel(item.name)} className={"border p-3 text-left text-xs " + (level === item.name ? item.tone : "border-border text-secondary")}><div className="font-semibold">{item.name}</div><div>{item.unit}</div></button>)}</div>
        <div className="mt-4 grid grid-cols-[7rem_1fr_6rem] items-center gap-2 text-xs"><span className="font-semibold text-primary">relative access</span><div className="h-4 border border-border bg-background"><div className="h-full bg-warning" style={{ width: `${Math.max(2, selected.latency / 200)}%` }} /></div><span className="text-right font-mono text-secondary">{selected.latency}×</span></div>
        <div className="mt-3 text-[10px] text-secondary">Relative values are pedagogical scale markers, not hardware benchmarks.</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        External-memory search optimizes expensive page transfers；many comparisons inside an already-loaded page are comparatively cheap.
      </figcaption>
    </figure>
  );
}

export function Algs4PageFanoutLab() {
  const [pageKiB, setPageKiB] = useState(8);
  const [keyBytes, setKeyBytes] = useState(16);
  const pointerBytes = 8;
  const overhead = 64;
  const pageBytes = pageKiB * 1024;
  const fanout = Math.max(2, Math.floor((pageBytes - overhead) / (keyBytes + pointerBytes)));
  const records = 1_000_000_000;
  const height = Math.ceil(Math.log(records) / Math.log(fanout));

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-3 sm:grid-cols-2"><label className="text-xs text-secondary">page = {pageKiB} KiB<input className="mt-2 w-full accent-current" type="range" min="4" max="32" step="4" value={pageKiB} onChange={(event) => setPageKiB(Number(event.target.value))} /></label><label className="text-xs text-secondary">key = {keyBytes} bytes<input className="mt-2 w-full accent-current" type="range" min="8" max="64" step="8" value={keyBytes} onChange={(event) => setKeyBytes(Number(event.target.value))} /></label></div>
        <div className="mt-4 grid grid-cols-2 gap-3"><div className="border border-accent p-4 text-center"><div className="text-xs text-secondary">approx fanout</div><div className="font-mono text-3xl text-accent">{fanout}</div></div><div className="border border-success p-4 text-center"><div className="text-xs text-secondary">1B records height</div><div className="font-mono text-3xl text-success">{height}</div></div></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Page-sized multiway nodes create high fanout，so billion-key search can require only a few page accesses.
      </figcaption>
    </figure>
  );
}

export function Algs4MultiwayRouteLab() {
  const [key, setKey] = useState(42);
  const separators = [20, 40, 70];
  let child = 0;
  while (child < separators.length && key >= separators[child]) child += 1;
  const ranges = ["(-∞,20)", "[20,40)", "[40,70)", "[70,+∞)"];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">search key = {key}<input className="mt-2 w-full accent-current" type="range" min="0" max="90" value={key} onChange={(event) => setKey(Number(event.target.value))} /></label>
        <div className="mt-4 flex justify-center"><div className="flex border border-accent bg-background">{separators.map((separator) => <div key={separator} className="border-r border-border px-6 py-3 font-mono text-accent last:border-r-0">{separator}</div>)}</div></div>
        <div className="mt-4 grid grid-cols-4 gap-2">{ranges.map((range, index) => <div key={range} className={"border p-3 text-center text-xs " + (child === index ? "border-warning bg-warning/10 text-warning" : "border-border text-secondary")}><div className="font-mono">child {index}</div><div>{range}</div></div>)}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Ordered separator keys partition key space；one in-page search selects exactly one child page.
      </figcaption>
    </figure>
  );
}

export function Algs4BTreeSearchLab() {
  const [key, setKey] = useState(55);
  const path = searchPath(stableTree, key);
  const active = path.at(-1);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">lookup key<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={key} onChange={(event) => setKey(Number(event.target.value))}>{[5, 25, 42, 55, 75, 88].map((item) => <option key={item}>{item}</option>)}</select></label>
        <div className="mt-4 overflow-x-auto pb-2"><NodeView node={stableTree} activeId={active?.node.id} /></div>
        <div className="mt-4 flex flex-wrap gap-2">{path.map((item, index) => <div key={item.node.id} className="border border-accent p-2 font-mono text-xs text-accent">page {index} · [{item.node.keys.join(",")}] · slot {item.slot}</div>)}</div>
        <div className={"mt-3 border p-3 text-sm " + (active?.found ? "border-success text-success" : "border-danger text-danger")}>{active?.found ? `found ${key}` : `${key} absent at leaf`}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Search performs one route decision per level；page access count is root-to-leaf path length.
      </figcaption>
    </figure>
  );
}

export function Algs4BTreeInsertionLab() {
  const [count, setCount] = useState(8);
  const keys = insertionSequence.slice(0, count);
  const tree = buildTree(keys);
  const validation = validateTree(tree);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">insertions = {count} · latest {keys.at(-1)}<input className="mt-2 w-full accent-current" type="range" min="1" max={insertionSequence.length} value={count} onChange={(event) => setCount(Number(event.target.value))} /></label>
        <div className="mt-4 overflow-x-auto pb-2"><NodeView node={tree} /></div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs"><div className="border border-accent p-3 text-accent">height<div className="font-mono">{treeHeight(tree)}</div></div><div className="border border-success p-3 text-success">ordered<div className="font-mono">{String(validation.ordered)}</div></div><div className="border border-success p-3 text-success">leaf-balanced<div className="font-mono">{String(validation.balanced)}</div></div></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Insert descends to one leaf；a full page splits around its median and promotes one separator toward the root.
      </figcaption>
    </figure>
  );
}

export function Algs4NodeSplitLab() {
  const [incoming, setIncoming] = useState(30);
  const before = [10, 20, 40];
  const full = [...before, incoming].sort((left, right) => left - right);
  const promoteIndex = 2;
  const promoted = full[promoteIndex];
  const left = full.slice(0, promoteIndex);
  const right = full.slice(promoteIndex + 1);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">incoming key<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={incoming} onChange={(event) => setIncoming(Number(event.target.value))}>{[5, 15, 30, 50].map((key) => <option key={key}>{key}</option>)}</select></label>
        <div className="mt-4 flex justify-center"><div className="flex border border-danger bg-danger/10">{full.map((key) => <div key={key} className="border-r border-danger px-4 py-2 font-mono text-danger last:border-r-0">{key}</div>)}</div></div>
        <div className="mt-5 grid grid-cols-[1fr_5rem_1fr] items-center gap-3"><div className="flex justify-center border border-success p-3 font-mono text-success">{left.join(" · ")}</div><div className="border border-warning p-3 text-center font-mono text-warning">↑ {promoted}</div><div className="flex justify-center border border-accent p-3 font-mono text-accent">{right.join(" · ")}</div></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Abstract B-tree split redistributes keys and promotes a separator；exact occupancy depends on order and implementation convention.
      </figcaption>
    </figure>
  );
}

export function Algs4RootGrowthLab() {
  const [records, setRecords] = useState(1_000_000);
  const [fanout, setFanout] = useState(128);
  const height = Math.max(0, Math.ceil(Math.log(Math.max(1, records)) / Math.log(fanout)));

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-3 sm:grid-cols-2"><label className="text-xs text-secondary">records = {records.toLocaleString()}<input className="mt-2 w-full accent-current" type="range" min="1000" max="1000000000" step="1000000" value={records} onChange={(event) => setRecords(Number(event.target.value))} /></label><label className="text-xs text-secondary">fanout = {fanout}<input className="mt-2 w-full accent-current" type="range" min="4" max="512" step="4" value={fanout} onChange={(event) => setFanout(Number(event.target.value))} /></label></div>
        <div className="mt-4 flex flex-col items-center gap-2">{Array.from({ length: height + 1 }, (_, level) => <div key={level} className="border border-accent bg-accent/10 py-2 text-center text-xs text-accent" style={{ width: `${Math.min(100, 20 + level * 16)}%` }}>level {level} · capacity scale {fanout ** Math.min(level, 4)}</div>)}</div>
        <div className="mt-3 border border-success p-3 text-center font-mono text-success">{height + 1} page probes including root</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Tree height increases only when root splits；all leaves remain at the same depth.
      </figcaption>
    </figure>
  );
}

export function Algs4OfficialNodeLayoutLab() {
  const [height, setHeight] = useState<0 | 1>(1);
  const entries = height === 0
    ? [{ key: "A", payload: "value-A" }, { key: "K", payload: "value-K" }, { key: "Z", payload: "value-Z" }]
    : [{ key: "A", payload: "child page 8" }, { key: "K", payload: "child page 21" }, { key: "Z", payload: "child page 34" }];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="flex gap-2"><button type="button" onClick={() => setHeight(1)} className={"border px-3 py-2 text-xs " + (height === 1 ? "border-accent text-accent" : "border-border text-secondary")}>internal node</button><button type="button" onClick={() => setHeight(0)} className={"border px-3 py-2 text-xs " + (height === 0 ? "border-success text-success" : "border-border text-secondary")}>external node</button></div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">{entries.map((entry) => <div key={entry.key} className="border border-border bg-background p-3"><div className="font-mono text-primary">key {entry.key}</div><div className={height === 0 ? "text-success" : "text-accent"}>{height === 0 ? "val" : "next"} = {entry.payload}</div><div className="mt-1 text-[10px] text-secondary">{height === 0 ? "next unused" : "val unused"}</div></div>)}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Official BTree Entry reuses one record type：internal entries use key/next，external entries use key/value.
      </figcaption>
    </figure>
  );
}

export function Algs4BTreeCostLab() {
  const [recordsPower, setRecordsPower] = useState(9);
  const [branching, setBranching] = useState(256);
  const records = 10 ** recordsPower;
  const probes = Math.ceil(Math.log(records) / Math.log(branching));
  const binaryHeight = Math.ceil(Math.log2(records));

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-3 sm:grid-cols-2"><label className="text-xs text-secondary">N = 10^{recordsPower}<input className="mt-2 w-full accent-current" type="range" min="3" max="12" value={recordsPower} onChange={(event) => setRecordsPower(Number(event.target.value))} /></label><label className="text-xs text-secondary">branching m = {branching}<input className="mt-2 w-full accent-current" type="range" min="4" max="512" step="4" value={branching} onChange={(event) => setBranching(Number(event.target.value))} /></label></div>
        <div className="mt-4 grid grid-cols-2 gap-3"><div className="border border-success p-4 text-center"><div className="text-xs text-secondary">B-tree page probes</div><div className="font-mono text-3xl text-success">{probes}</div></div><div className="border border-warning p-4 text-center"><div className="text-xs text-secondary">binary levels</div><div className="font-mono text-3xl text-warning">{binaryHeight}</div></div></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Search/insert visit O(log_m N) pages；in-page comparison strategy affects CPU work but not page-path height.
      </figcaption>
    </figure>
  );
}

export function Algs4BTreeInvariantLab() {
  const validation = validateTree(stableTree);
  const checks = [
    ["sorted keys", validation.ordered],
    ["occupancy", validation.occupancy],
    ["children = keys + 1", validation.arity],
    ["separator ranges", validation.separator],
    ["equal leaf depth", validation.balanced],
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-2 sm:grid-cols-5">{checks.map(([name, accepted]) => <div key={name} className={"border p-3 text-center text-xs " + (accepted ? "border-success text-success" : "border-danger text-danger")}><div>{name}</div><div className="mt-1 font-mono">{accepted ? "pass" : "fail"}</div></div>)}</div>
        <div className="mt-4 overflow-x-auto pb-2"><NodeView node={stableTree} /></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        A valid B-tree combines local ordering/occupancy with global separator ranges and one common leaf depth.
      </figcaption>
    </figure>
  );
}

type BTreeCertificateMode = "valid" | "out of order" | "overfull" | "uneven leaves" | "bad separator";

function mutatedTree(mode: BTreeCertificateMode) {
  const root = buildTree(insertionSequence);
  if (mode === "out of order") root.keys = [...root.keys].reverse();
  if (mode === "overfull") root.children[0].keys.push(12, 13, 14);
  if (mode === "uneven leaves") root.children[0].children = [newNode([1]), newNode([2])];
  if (mode === "bad separator") root.children[0].keys.push(999);
  return root;
}

export function Algs4BTreeCertificateLab() {
  const [mode, setMode] = useState<BTreeCertificateMode>("valid");
  const tree = useMemo(() => mutatedTree(mode), [mode]);
  const result = validateTree(tree);
  const accepted = Object.values(result).every(Boolean);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">candidate tree<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={mode} onChange={(event) => setMode(event.target.value as BTreeCertificateMode)}><option>valid</option><option>out of order</option><option>overfull</option><option>uneven leaves</option><option>bad separator</option></select></label>
        <div className="mt-4 grid grid-cols-5 gap-2">{Object.entries(result).map(([name, valid]) => <div key={name} className={"border p-2 text-center text-[10px] " + (valid ? "border-success text-success" : "border-danger text-danger")}><div>{name}</div><div className="font-mono">{valid ? "pass" : "fail"}</div></div>)}</div>
        <div className={"mt-3 border p-3 text-sm " + (accepted ? "border-success text-success" : "border-danger text-danger")}>{accepted ? "tree certificate accepted" : "tree certificate rejected"}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Independent validator propagates key ranges and leaf depths；a successful lookup sample cannot certify global B-tree structure.
      </figcaption>
    </figure>
  );
}
