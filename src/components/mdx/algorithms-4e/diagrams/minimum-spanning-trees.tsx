"use client";

import { useMemo, useState } from "react";

type WeightedEdge = { v: number; w: number; weight: number };
type Point = { x: number; y: number };

const points: Point[] = [
  { x: 60, y: 145 }, { x: 150, y: 55 }, { x: 165, y: 225 },
  { x: 280, y: 115 }, { x: 350, y: 235 }, { x: 435, y: 120 },
  { x: 535, y: 55 }, { x: 555, y: 225 },
];

const weightedEdges: WeightedEdge[] = [
  { v: 0, w: 1, weight: 0.4 }, { v: 0, w: 2, weight: 0.3 },
  { v: 1, w: 2, weight: 0.2 }, { v: 1, w: 3, weight: 0.5 },
  { v: 2, w: 3, weight: 0.35 }, { v: 2, w: 4, weight: 0.6 },
  { v: 3, w: 4, weight: 0.45 }, { v: 3, w: 5, weight: 0.7 },
  { v: 4, w: 5, weight: 0.25 }, { v: 4, w: 6, weight: 0.55 },
  { v: 5, w: 6, weight: 0.15 }, { v: 5, w: 7, weight: 0.5 },
  { v: 6, w: 7, weight: 0.1 }, { v: 2, w: 7, weight: 0.9 },
];

function edgeKey(edge: WeightedEdge) {
  return edge.v < edge.w ? `${edge.v}-${edge.w}` : `${edge.w}-${edge.v}`;
}

function edgeLabel(edge: WeightedEdge) {
  return `${edge.v}-${edge.w}@${edge.weight.toFixed(2)}`;
}

function other(edge: WeightedEdge, vertex: number) {
  return edge.v === vertex ? edge.w : edge.v;
}

function WeightedGraphCanvas({
  highlighted = [],
  crossing = [],
  marked = [],
  selected,
}: {
  highlighted?: WeightedEdge[];
  crossing?: WeightedEdge[];
  marked?: number[];
  selected?: WeightedEdge;
}) {
  const activeKeys = new Set(highlighted.map(edgeKey));
  const crossingKeys = new Set(crossing.map(edgeKey));
  const selectedKey = selected ? edgeKey(selected) : null;

  return (
    <svg viewBox="0 0 620 300" className="h-auto w-full border border-border bg-background" role="img" aria-label="edge-weighted graph">
      {weightedEdges.map((edge) => {
        const start = points[edge.v];
        const end = points[edge.w];
        const active = activeKeys.has(edgeKey(edge));
        const cut = crossingKeys.has(edgeKey(edge));
        const current = selectedKey === edgeKey(edge);
        return (
          <g key={edgeKey(edge)}>
            <line x1={start.x} y1={start.y} x2={end.x} y2={end.y} className={current ? "stroke-warning" : active ? "stroke-success" : cut ? "stroke-accent" : "stroke-border"} strokeWidth={current ? 6 : active ? 5 : cut ? 4 : 2} />
            <text x={(start.x + end.x) / 2} y={(start.y + end.y) / 2 - 5} textAnchor="middle" className="fill-primary stroke-background text-[10px] font-mono" strokeWidth="5" style={{ paintOrder: "stroke" }}>{edge.weight.toFixed(2)}</text>
          </g>
        );
      })}
      {points.map((point, vertex) => (
        <g key={vertex}>
          <circle cx={point.x} cy={point.y} r="21" className={marked.includes(vertex) ? "fill-accent/20 stroke-accent" : "fill-background stroke-border"} strokeWidth="2" />
          <text x={point.x} y={point.y + 4} textAnchor="middle" className="fill-primary text-xs font-semibold">{vertex}</text>
        </g>
      ))}
    </svg>
  );
}

function incident(vertex: number) {
  return weightedEdges.filter((edge) => edge.v === vertex || edge.w === vertex);
}

export function Algs4WeightedGraphModelMap() {
  const [edgeIndex, setEdgeIndex] = useState(6);
  const edge = weightedEdges[edgeIndex];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">selected edge = {edgeLabel(edge)}<input className="mt-2 w-full accent-current" type="range" min="0" max={weightedEdges.length - 1} value={edgeIndex} onChange={(event) => setEdgeIndex(Number(event.target.value))} /></label>
        <div className="mt-4"><WeightedGraphCanvas selected={edge} /></div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-secondary"><div className="border border-accent p-3">either()<div className="font-mono text-accent">{edge.v}</div></div><div className="border border-warning p-3">other({edge.v})<div className="font-mono text-warning">{other(edge, edge.v)}</div></div><div className="border border-success p-3">weight()<div className="font-mono text-success">{edge.weight.toFixed(2)}</div></div></div>
        <div className="mt-3 border border-border bg-background p-3 text-xs text-secondary">adj({edge.v}) = <span className="font-mono text-primary">{incident(edge.v).map(edgeLabel).join(" · ")}</span></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Immutable Edge storestwo endpoints与real weight；undirected adjacency lists在两端引用同一个Edge object。
      </figcaption>
    </figure>
  );
}
function crossingEdges(left: readonly number[]) {
  const side = new Set(left);
  return weightedEdges.filter((edge) => side.has(edge.v) !== side.has(edge.w)).sort((a, b) => a.weight - b.weight);
}
class UnionFind {
  private parent: number[];
  private size: number[];

  constructor(count: number) {
    this.parent = Array.from({ length: count }, (_, index) => index);
    this.size = Array(count).fill(1);
  }

  find(vertex: number) {
    let root = vertex;
    while (root !== this.parent[root]) root = this.parent[root];
    while (vertex !== root) {
      const next = this.parent[vertex];
      this.parent[vertex] = root;
      vertex = next;
    }
    return root;
  }

  connected(v: number, w: number) {
    return this.find(v) === this.find(w);
  }

  union(v: number, w: number) {
    let rootV = this.find(v);
    let rootW = this.find(w);
    if (rootV === rootW) return;
    if (this.size[rootV] < this.size[rootW]) [rootV, rootW] = [rootW, rootV];
    this.parent[rootW] = rootV;
    this.size[rootV] += this.size[rootW];
  }

  ids(count: number) {
    const roots = Array.from({ length: count }, (_, vertex) => this.find(vertex));
    const mapping = new Map<number, number>();
    return roots.map((root) => {
      if (!mapping.has(root)) mapping.set(root, mapping.size);
      return mapping.get(root) ?? 0;
    });
  }
}

function kruskalTrace() {
  const sorted = [...weightedEdges].sort((a, b) => a.weight - b.weight);
  const uf = new UnionFind(points.length);
  const mst: WeightedEdge[] = [];
  const steps: { edge: WeightedEdge; accepted: boolean; mst: WeightedEdge[]; ids: number[] }[] = [];
  for (const edge of sorted) {
    const accepted = !uf.connected(edge.v, edge.w);
    if (accepted) {
      uf.union(edge.v, edge.w);
      mst.push(edge);
    }
    steps.push({ edge, accepted, mst: [...mst], ids: uf.ids(points.length) });
    if (mst.length === points.length - 1) break;
  }
  return { sorted, steps, mst };
}

const mstEdges = kruskalTrace().mst;
type LazyStep = { edge: WeightedEdge; status: "accept" | "obsolete"; marked: number[]; mst: WeightedEdge[]; pq: WeightedEdge[] };

function lazyPrimTrace() {
  const marked = new Set<number>();
  const pq: WeightedEdge[] = [];
  const mst: WeightedEdge[] = [];
  const steps: LazyStep[] = [];
  function scan(vertex: number) {
    marked.add(vertex);
    for (const edge of incident(vertex)) if (!marked.has(other(edge, vertex))) pq.push(edge);
  }
  scan(0);
  while (pq.length > 0 && mst.length < points.length - 1) {
    pq.sort((a, b) => a.weight - b.weight);
    const edge = pq.shift();
    if (!edge) break;
    const obsolete = marked.has(edge.v) && marked.has(edge.w);
    if (!obsolete) {
      mst.push(edge);
      if (!marked.has(edge.v)) scan(edge.v);
      if (!marked.has(edge.w)) scan(edge.w);
    }
    steps.push({ edge, status: obsolete ? "obsolete" : "accept", marked: [...marked], mst: [...mst], pq: [...pq].sort((a, b) => a.weight - b.weight) });
  }
  return steps;
}
type EagerState = { current: number; marked: number[]; edgeTo: (WeightedEdge | null)[]; distTo: number[]; mst: WeightedEdge[] };

function eagerPrimTrace() {
  const marked = Array(points.length).fill(false);
  const edgeTo: (WeightedEdge | null)[] = Array(points.length).fill(null);
  const distTo = Array(points.length).fill(Number.POSITIVE_INFINITY);
  const states: EagerState[] = [];
  distTo[0] = 0;
  while (marked.some((value) => !value)) {
    let current = -1;
    for (let vertex = 0; vertex < points.length; vertex += 1) {
      if (!marked[vertex] && (current === -1 || distTo[vertex] < distTo[current])) current = vertex;
    }
    if (current === -1 || !Number.isFinite(distTo[current])) break;
    marked[current] = true;
    for (const edge of incident(current)) {
      const neighbor = other(edge, current);
      if (!marked[neighbor] && edge.weight < distTo[neighbor]) {
        distTo[neighbor] = edge.weight;
        edgeTo[neighbor] = edge;
      }
    }
    states.push({ current, marked: marked.flatMap((value, vertex) => value ? [vertex] : []), edgeTo: [...edgeTo], distTo: [...distTo], mst: edgeTo.filter((edge): edge is WeightedEdge => edge !== null && marked[edge.v] && marked[edge.w]) });
  }
  return states;
}
type CertificateMode = "valid MST" | "cycle" | "disconnected" | "nonoptimal";

function candidateEdges(mode: CertificateMode) {
  const safe = weightedEdges.find((edge) => edgeKey(edge) === "3-4") ?? weightedEdges[0];
  const heavy = weightedEdges.find((edge) => edgeKey(edge) === "2-4") ?? weightedEdges[0];
  if (mode === "cycle") return [...mstEdges, heavy];
  if (mode === "disconnected") return mstEdges.filter((edge) => edgeKey(edge) !== edgeKey(safe));
  if (mode === "nonoptimal") return mstEdges.filter((edge) => edgeKey(edge) !== edgeKey(safe)).concat(heavy);
  return mstEdges;
}

function certify(candidate: WeightedEdge[]) {
  const uf = new UnionFind(points.length);
  let acyclic = true;
  for (const edge of candidate) {
    if (uf.connected(edge.v, edge.w)) acyclic = false;
    else uf.union(edge.v, edge.w);
  }
  const connected = points.every((_, vertex) => uf.connected(0, vertex));
  const edgeCount = candidate.length === points.length - 1;
  let cutOptimal = acyclic && connected && edgeCount;
  if (cutOptimal) {
    for (const treeEdge of candidate) {
      const cutUf = new UnionFind(points.length);
      for (const edge of candidate) if (edgeKey(edge) !== edgeKey(treeEdge)) cutUf.union(edge.v, edge.w);
      const lighterCrossing = weightedEdges.some((edge) => !cutUf.connected(edge.v, edge.w) && edge.weight < treeEdge.weight - 1e-12);
      if (lighterCrossing) cutOptimal = false;
    }
  }
  return { edgeCount, acyclic, connected, cutOptimal };
}

function Certificate({ label, pass }: { label: string; pass: boolean }) {
  return <div className={"border p-3 text-xs " + (pass ? "border-success bg-success/10 text-success" : "border-danger bg-danger/10 text-danger")}>{label}<div className="mt-1 font-mono">{pass ? "PASS" : "FAIL"}</div></div>;
}
