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

const cuts = [
  [0], [0, 1, 2], [0, 1, 2, 3], [0, 1, 2, 3, 4], [0, 1, 2, 3, 4, 5],
] as const;

function crossingEdges(left: readonly number[]) {
  const side = new Set(left);
  return weightedEdges.filter((edge) => side.has(edge.v) !== side.has(edge.w)).sort((a, b) => a.weight - b.weight);
}

export function Algs4CutPropertyLab() {
  const [cutIndex, setCutIndex] = useState(2);
  const left = cuts[cutIndex];
  const crossing = crossingEdges(left);
  const minimum = crossing[0];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">cut S = {`{${left.join(",")}}`} · minimum crossing edge = {edgeLabel(minimum)}<input className="mt-2 w-full accent-current" type="range" min="0" max={cuts.length - 1} value={cutIndex} onChange={(event) => setCutIndex(Number(event.target.value))} /></label>
        <div className="mt-4"><WeightedGraphCanvas crossing={crossing} selected={minimum} marked={[...left]} /></div>
        <div className="mt-4 overflow-hidden border border-border bg-background">{crossing.map((edge, rank) => <div key={edgeKey(edge)} className="grid grid-cols-[3rem_1fr_5rem] border-b border-border p-2 text-xs last:border-b-0"><span className="font-mono text-secondary">#{rank + 1}</span><span className="font-mono text-primary">{edge.v}-{edge.w}</span><span className={rank === 0 ? "font-mono text-success" : "font-mono text-secondary"}>{edge.weight.toFixed(2)}</span></div>)}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        对任意不穿过已选forest edge的cut，minimum-weight crossing edge是safe edge；distinct weights时它必在唯一MST中。
      </figcaption>
    </figure>
  );
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

export function Algs4CutExchangeLab() {
  const [improved, setImproved] = useState(false);
  const safe = weightedEdges.find((edge) => edgeKey(edge) === "3-4") ?? weightedEdges[0];
  const heavy = weightedEdges.find((edge) => edgeKey(edge) === "2-4") ?? weightedEdges[0];
  const nonoptimal = mstEdges.filter((edge) => edgeKey(edge) !== edgeKey(safe)).concat(heavy);
  const shown = improved ? mstEdges : nonoptimal;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={improved} onChange={(event) => setImproved(event.target.checked)} />exchange heavy edge 2-4 with safe edge 3-4</label>
        <div className="mt-4"><WeightedGraphCanvas highlighted={shown} selected={improved ? safe : heavy} /></div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-secondary"><div className="border border-warning p-3">removed<div className="font-mono text-warning">{improved ? edgeLabel(heavy) : "none"}</div></div><div className="border border-success p-3">added<div className="font-mono text-success">{improved ? edgeLabel(safe) : "none"}</div></div><div className="border border-accent p-3">tree weight<div className="font-mono text-accent">{shown.reduce((sum, edge) => sum + edge.weight, 0).toFixed(2)}</div></div></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Add safe crossing edge creates one cycle；remove that cycle上更重的crossing edge，tree remains spanning且total weight strictly decreases。
      </figcaption>
    </figure>
  );
}

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

export function Algs4LazyPrimLab() {
  const steps = useMemo(() => lazyPrimTrace(), []);
  const [step, setStep] = useState(4);
  const state = steps[Math.min(step, steps.length - 1)];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">Lazy Prim pop {edgeLabel(state.edge)} · {state.status}<input className="mt-2 w-full accent-current" type="range" min="0" max={steps.length - 1} value={step} onChange={(event) => setStep(Number(event.target.value))} /></label>
        <div className="mt-4"><WeightedGraphCanvas highlighted={state.mst} marked={state.marked} selected={state.edge} /></div>
        <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_2fr]"><div className={"border p-3 text-xs " + (state.status === "accept" ? "border-success text-success" : "border-danger text-danger")}>{state.status === "accept" ? "crossing edge accepted" : "both endpoints marked: discard"}</div><div className="border border-border bg-background p-3 text-xs text-secondary">PQ front: <span className="font-mono text-primary">{state.pq.slice(0, 6).map(edgeLabel).join(" · ") || "empty"}</span></div></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Lazy Prim pushes all incident crossing candidates and leaves later-ineligible edges inMinPQ；validity is checked only atdelMin。
      </figcaption>
    </figure>
  );
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

export function Algs4EagerPrimLab() {
  const states = useMemo(() => eagerPrimTrace(), []);
  const [step, setStep] = useState(3);
  const state = states[Math.min(step, states.length - 1)];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">Eager Prim scan vertex {state.current} · tree vertices {state.marked.length}<input className="mt-2 w-full accent-current" type="range" min="0" max={states.length - 1} value={step} onChange={(event) => setStep(Number(event.target.value))} /></label>
        <div className="mt-4"><WeightedGraphCanvas highlighted={state.mst} marked={state.marked} /></div>
        <div className="mt-4 overflow-hidden border border-border bg-background">{points.map((_, vertex) => <div key={vertex} className="grid grid-cols-[3rem_1fr_5rem] border-b border-border p-2 text-xs last:border-b-0"><span className="font-mono text-secondary">v={vertex}</span><span className="font-mono text-primary">{state.edgeTo[vertex] ? edgeLabel(state.edgeTo[vertex] as WeightedEdge) : "root / unset"}</span><span className="font-mono text-accent">{Number.isFinite(state.distTo[vertex]) ? state.distTo[vertex].toFixed(2) : "inf"}</span></div>)}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Eager Prim只保留每个non-tree vertex到current tree的best edge，并以IndexMinPQ执行insert/decreaseKey。
      </figcaption>
    </figure>
  );
}

export function Algs4KruskalLab() {
  const trace = useMemo(() => kruskalTrace(), []);
  const [step, setStep] = useState(5);
  const state = trace.steps[Math.min(step, trace.steps.length - 1)];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">Kruskal considers {edgeLabel(state.edge)} · {state.accepted ? "accept" : "cycle reject"}<input className="mt-2 w-full accent-current" type="range" min="0" max={trace.steps.length - 1} value={step} onChange={(event) => setStep(Number(event.target.value))} /></label>
        <div className="mt-4"><WeightedGraphCanvas highlighted={state.mst} selected={state.edge} /></div>
        <div className="mt-4 grid grid-cols-4 gap-2">{Array.from(new Set(state.ids)).map((id) => <div key={id} className="border border-accent/50 bg-background p-3 text-center text-xs text-secondary">UF {id}<div className="mt-1 font-mono text-accent">{state.ids.flatMap((value, vertex) => value === id ? [vertex] : []).join(" ")}</div></div>)}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Kruskal按global edge weight排序；UF endpoints已connected则edge会成cycle，否则union并加入growing forest。
      </figcaption>
    </figure>
  );
}

export function Algs4MstCostComparisonLab() {
  const [edgeScale, setEdgeScale] = useState(40);
  const vertexScale = 16;
  const lazy = edgeScale * Math.log2(Math.max(2, edgeScale));
  const eager = edgeScale * Math.log2(vertexScale);
  const kruskal = lazy;
  const denseScan = vertexScale * vertexScale;
  const values = [
    { name: "lazy Prim", value: lazy, space: "E", color: "bg-warning" },
    { name: "eager Prim", value: eager, space: "V", color: "bg-success" },
    { name: "Kruskal", value: kruskal, space: "E", color: "bg-accent" },
    { name: "dense Prim scan", value: denseScan, space: "V", color: "bg-danger" },
  ];
  const maximum = Math.max(...values.map((item) => item.value));

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">V = {vertexScale} · E = {edgeScale}<input className="mt-2 w-full accent-current" type="range" min="15" max="120" value={edgeScale} onChange={(event) => setEdgeScale(Number(event.target.value))} /></label>
        <div className="mt-5 space-y-3">{values.map((item) => <div key={item.name} className="grid grid-cols-[7rem_1fr_4rem] items-center gap-3 text-xs"><span className="text-secondary">{item.name}</span><div className="h-4 bg-border"><div className={`h-full ${item.color}`} style={{ width: `${Math.max(3, item.value / maximum * 100)}%` }} /></div><span className="font-mono text-primary">space {item.space}</span></div>)}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Lazy Prim与Kruskal worst E log E；indexed eager Prim E log V且extra space V；dense graph可用V-scan Prim达到V squared。
      </figcaption>
    </figure>
  );
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

export function Algs4MstCertificateLab() {
  const [mode, setMode] = useState<CertificateMode>("valid MST");
  const candidate = candidateEdges(mode);
  const result = certify(candidate);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 border border-border sm:grid-cols-4" role="group" aria-label="MST candidate">{(["valid MST", "cycle", "disconnected", "nonoptimal"] as CertificateMode[]).map((option) => <button key={option} type="button" onClick={() => setMode(option)} className={"min-h-11 border-b border-r border-border px-2 py-2 text-xs sm:border-b-0 last:border-r-0 " + (mode === option ? "bg-primary text-background" : "bg-background text-secondary")}>{option}</button>)}</div>
        <div className="mt-4"><WeightedGraphCanvas highlighted={candidate} /></div>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4"><Certificate label="V-1 edges" pass={result.edgeCount} /><Certificate label="acyclic" pass={result.acyclic} /><Certificate label="spanning" pass={result.connected} /><Certificate label="cut optimality" pass={result.cutOptimal} /></div>
        <div className="mt-3 border border-border bg-background p-3 text-xs text-secondary">candidate weight = <span className="font-mono text-primary">{candidate.reduce((sum, edge) => sum + edge.weight, 0).toFixed(2)}</span></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        MST certificate先证明spanning tree，再逐tree edge移除形成cut，确认没有更轻original crossing edge可替换它。
      </figcaption>
    </figure>
  );
}
