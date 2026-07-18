"use client";

import { useState, type ReactNode } from "react";

function Panel({ children }: { children: ReactNode }) {
  return <div className="border border-border bg-elevated p-4 sm:p-5">{children}</div>;
}

function Caption({ children }: { children: ReactNode }) {
  return <figcaption className="mt-2 text-center text-sm text-secondary">{children}</figcaption>;
}

function Stat({ label, value, tone = "accent" }: { label: string; value: string; tone?: "accent" | "warning" | "success" | "danger" }) {
  const classes = {
    accent: "border-accent text-accent",
    warning: "border-warning text-warning",
    success: "border-success text-success",
    danger: "border-danger text-danger",
  }[tone];
  return <div className={`border p-3 text-center ${classes}`}><div className="text-xs">{label}</div><div className="mt-1 break-words font-mono text-lg">{value}</div></div>;
}

export function CAIDivideTreeLab() {
  const [power, setPower] = useState(5);
  const n = 2 ** power;
  const levels = Array.from({ length: power + 1 }, (_, level) => ({ nodes: 2 ** level, size: n / 2 ** level }));

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">problem size n = {n}<input className="mt-2 w-full accent-current" type="range" min="2" max="8" value={power} onChange={(event) => setPower(Number(event.target.value))} /></label>
        <div className="mt-4 space-y-2">{levels.map((level, index) => <div key={index} className="grid grid-cols-[4rem_1fr_6rem] items-center gap-2 text-xs"><span className="text-secondary">level {index}</span><div className="flex gap-1">{Array.from({ length: Math.min(level.nodes, 32) }, (_, node) => <span key={node} className="h-4 flex-1 border border-accent bg-accent/20" />)}</div><span className="text-right font-mono text-accent">{level.nodes}×{level.size}</span></div>)}</div>
        <div className="mt-3 grid grid-cols-3 gap-2"><Stat label="tree height" value={`${power}`} /><Stat label="leaf problems" value={`${n}`} tone="success" /><Stat label="work per level" value={`Θ(${n})`} tone="warning" /></div>
      </Panel>
      <Caption>A balanced divide tree doubles the number of subproblems while halving their size; linear work per level across log n levels yields n log n.</Caption>
    </figure>
  );
}

export function CAIDivideVsDPLab() {
  const [overlap, setOverlap] = useState(false);
  const [merge, setMerge] = useState(true);
  const method = overlap ? "memoization / dynamic programming" : merge ? "divide and conquer" : "direct decomposition";

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="grid gap-2 sm:grid-cols-2"><label className="border border-border p-3 text-sm text-secondary"><input className="mr-2 accent-current" type="checkbox" checked={overlap} onChange={(event) => setOverlap(event.target.checked)} />subproblems overlap</label><label className="border border-border p-3 text-sm text-secondary"><input className="mr-2 accent-current" type="checkbox" checked={merge} onChange={(event) => setMerge(event.target.checked)} />partial answers need a combine step</label></div>
        <div className="mt-4 border border-success p-4 text-center text-success">{method}</div>
      </Panel>
      <Caption>Divide and conquer expects mostly independent subproblems; dynamic programming explicitly merges repeated states.</Caption>
    </figure>
  );
}

export function CAICellExponentiationLab() {
  const [exponent, setExponent] = useState(13);
  const bits = exponent.toString(2);
  const squarings = Math.max(0, bits.length - 1);
  const multiplies = bits.split("").filter((bit) => bit === "1").length - 1;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">cell generations t = {exponent}<input className="mt-2 w-full accent-current" type="range" min="1" max="63" value={exponent} onChange={(event) => setExponent(Number(event.target.value))} /></label>
        <div className="mt-4 flex justify-center gap-2">{bits.split("").map((bit, index) => <div key={index} className={`border px-4 py-3 font-mono text-xl ${bit === "1" ? "border-accent text-accent" : "border-border text-secondary"}`}>{bit}</div>)}</div>
        <div className="mt-3 grid grid-cols-3 gap-2"><Stat label="binary exponent" value={bits} /><Stat label="squarings" value={`${squarings}`} tone="success" /><Stat label="extra multiplies" value={`${Math.max(0, multiplies)}`} tone="warning" /></div>
      </Panel>
      <Caption>Exponentiation by squaring follows the bits of the generation count, reducing t repeated multiplications to O(log t).</Caption>
    </figure>
  );
}

export function CAIKaratsubaLab() {
  const [x, setX] = useState(1234);
  const y = 5678;
  const base = 100;
  const a = Math.floor(x / base);
  const b = x % base;
  const c = Math.floor(y / base);
  const d = y % base;
  const z2 = a * c;
  const z0 = b * d;
  const z1 = (a + b) * (c + d) - z2 - z0;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">x = {x}, y = {y}<input className="mt-2 w-full accent-current" type="range" min="1000" max="9999" step="111" value={x} onChange={(event) => setX(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4"><Stat label="split x" value={`${a}|${String(b).padStart(2, "0")}`} /><Stat label="split y" value={`${c}|${String(d).padStart(2, "0")}`} /><Stat label="3 products" value={`z₂=${z2}, z₁=${z1}, z₀=${z0}`} tone="warning" /><Stat label="recombined" value={(z2 * base * base + z1 * base + z0).toLocaleString()} tone="success" /></div>
      </Panel>
      <Caption>Karatsuba replaces four half-size products with three by recovering the cross term from (a+b)(c+d).</Caption>
    </figure>
  );
}

export function CAIMatrixBlockLab() {
  const [size, setSize] = useState(8);
  const half = size / 2;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">square matrix n = {size}<input className="mt-2 w-full accent-current" type="range" min="2" max="16" step="2" value={size} onChange={(event) => setSize(Number(event.target.value))} /></label>
        <div className="mx-auto mt-4 grid max-w-xs grid-cols-2 gap-1">{["11", "12", "21", "22"].map((block) => <div key={block} className="aspect-square border border-accent bg-accent/10 p-5 text-center text-accent"><div className="font-mono text-xl">A{block}</div><div className="text-xs">{half}×{half}</div></div>)}</div>
        <div className="mt-3 grid grid-cols-3 gap-2"><Stat label="classical block products" value="8" tone="warning" /><Stat label="block additions" value="4+" /><Stat label="same asymptotic" value="Θ(n³)" tone="danger" /></div>
      </Panel>
      <Caption>Block multiplication reveals eight half-size products; merely recursing preserves cubic complexity until an algebraic identity reduces that count.</Caption>
    </figure>
  );
}

export function CAIStrassenLab() {
  const [sizePower, setSizePower] = useState(8);
  const n = 2 ** sizePower;
  const classical = n ** 3;
  const strassen = n ** Math.log2(7);
  const ratio = classical / strassen;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">idealized matrix n = {n}<input className="mt-2 w-full accent-current" type="range" min="2" max="12" value={sizePower} onChange={(event) => setSizePower(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="classical n³" value={classical.toExponential(2)} tone="warning" /><Stat label="Strassen n^log₂7" value={strassen.toExponential(2)} tone="success" /><Stat label="operation ratio" value={`${ratio.toFixed(2)}×`} /></div>
      </Panel>
      <Caption>Seven recursive products give exponent log2 7 ≈ 2.807; additions, memory traffic, padding, and numerical error determine the practical crossover.</Caption>
    </figure>
  );
}

const buffetValues = [-3, 5, -1, 6, -4, 2, 3, -7];

export function CAILinearMergeLab() {
  const [mid, setMid] = useState(4);
  const left = buffetValues.slice(0, mid);
  const right = buffetValues.slice(mid);
  let suffix = Number.NEGATIVE_INFINITY;
  let sum = 0;
  for (let i = left.length - 1; i >= 0; i -= 1) {
    sum += left[i];
    suffix = Math.max(suffix, sum);
  }
  let prefix = Number.NEGATIVE_INFINITY;
  sum = 0;
  for (const value of right) {
    sum += value;
    prefix = Math.max(prefix, sum);
  }

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">linear split after index {mid - 1}<input className="mt-2 w-full accent-current" type="range" min="1" max={buffetValues.length - 1} value={mid} onChange={(event) => setMid(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-8 gap-1">{buffetValues.map((value, index) => <div key={index} className={`border p-3 text-center font-mono ${index < mid ? "border-accent text-accent" : "border-warning text-warning"}`}>{value}</div>)}</div>
        <div className="mt-3 grid grid-cols-3 gap-2"><Stat label="best left suffix" value={`${suffix}`} /><Stat label="best right prefix" value={`${prefix}`} tone="warning" /><Stat label="best crossing sum" value={`${suffix + prefix}`} tone="success" /></div>
      </Panel>
      <Caption>A linear-array divide step combines local answers with the best suffix of the left half plus the best prefix of the right half.</Caption>
    </figure>
  );
}

const treeEdges: Array<[number, number]> = [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [5, 6]];

function treeDistances(root: number) {
  const graph = Array.from({ length: 7 }, () => [] as number[]);
  for (const [a, b] of treeEdges) {
    graph[a].push(b);
    graph[b].push(a);
  }
  const distance = Array(7).fill(-1);
  distance[root] = 0;
  const queue = [root];
  for (let i = 0; i < queue.length; i += 1) for (const next of graph[queue[i]]) if (distance[next] < 0) {
    distance[next] = distance[queue[i]] + 1;
    queue.push(next);
  }
  return distance;
}

export function CAITreeDistanceLab() {
  const [root, setRoot] = useState(0);
  const distance = treeDistances(root);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">communication root = {root}<input className="mt-2 w-full accent-current" type="range" min="0" max="6" value={root} onChange={(event) => setRoot(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-7 gap-2">{distance.map((value, node) => <div key={node} className={`border p-3 text-center ${node === root ? "border-accent bg-accent/10 text-accent" : "border-border text-secondary"}`}><div className="font-mono">v{node}</div><div className="text-xs">dist {value}</div></div>)}</div>
        <div className="mt-3 grid grid-cols-2 gap-2"><Stat label="sum distance" value={`${distance.reduce((a, b) => a + b, 0)}`} tone="warning" /><Stat label="farthest" value={`${Math.max(...distance)}`} /></div>
      </Panel>
      <Caption>Communication cost from one root is the sum of distances; recomputing BFS from every root works but repeats most tree structure.</Caption>
    </figure>
  );
}

function subtreeSizes(root: number) {
  const graph = Array.from({ length: 7 }, () => [] as number[]);
  for (const [a, b] of treeEdges) {
    graph[a].push(b);
    graph[b].push(a);
  }
  const parent = Array(7).fill(-1);
  const order = [root];
  for (let i = 0; i < order.length; i += 1) for (const next of graph[order[i]]) if (next !== parent[order[i]]) {
    parent[next] = order[i];
    order.push(next);
  }
  const size = Array(7).fill(1);
  for (let i = order.length - 1; i > 0; i -= 1) size[parent[order[i]]] += size[order[i]];
  return { parent, size };
}

export function CAIRerootLab() {
  const [child, setChild] = useState(1);
  const { parent, size } = subtreeSizes(0);
  const validChild = child === 0 ? 1 : child;
  const p = parent[validChild];
  const delta = 7 - 2 * size[validChild];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">reroot child v = {validChild}<input className="mt-2 w-full accent-current" type="range" min="1" max="6" value={validChild} onChange={(event) => setChild(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="old parent u" value={`${p}`} /><Stat label="subtree size[v]" value={`${size[validChild]}`} tone="success" /><Stat label="answer delta" value={`n−2size = ${delta}`} tone={delta <= 0 ? "success" : "warning"} /></div>
        <div className="mt-3 text-sm text-secondary">Nodes inside the v subtree become one step closer; all other nodes become one step farther.</div>
      </Panel>
      <Caption>Rerooting transfers an all-nodes distance answer across one edge in O(1), after one subtree-size pass.</Caption>
    </figure>
  );
}

export function CAIMapSeparatorLab() {
  const [level, setLevel] = useState(1);
  const size = 8;
  const block = size / 2 ** level;
  const regions = 2 ** level;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">map decomposition level = {level}<input className="mt-2 w-full accent-current" type="range" min="0" max="3" value={level} onChange={(event) => setLevel(Number(event.target.value))} /></label>
        <div className="mx-auto mt-4 grid max-w-sm grid-cols-8 gap-px bg-border p-px">{Array.from({ length: 64 }, (_, index) => { const r = Math.floor(index / 8); const c = index % 8; const region = Math.floor(r / block) * regions + Math.floor(c / block); return <div key={index} className={`aspect-square border border-background ${region % 3 === 0 ? "bg-accent/25" : region % 3 === 1 ? "bg-success/25" : "bg-warning/25"}`} />; })}</div>
        <div className="mt-3 grid grid-cols-3 gap-2"><Stat label="region side" value={`${block}`} /><Stat label="regions" value={`${regions * regions}`} tone="success" /><Stat label="local cells" value={`${block * block}`} /></div>
      </Panel>
      <Caption>Map decomposition solves local path structure inside regions and combines it through boundary portals, trading preprocessing for faster queries.</Caption>
    </figure>
  );
}
