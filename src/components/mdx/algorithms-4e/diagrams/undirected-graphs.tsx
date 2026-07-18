"use client";

import { useMemo, useState } from "react";

type Edge = readonly [number, number];
type Point = { x: number; y: number };

const vertices = Array.from({ length: 10 }, (_, index) => index);
const edges: Edge[] = [
  [0, 1], [0, 2], [1, 3], [2, 3], [2, 4], [3, 5], [4, 5],
  [6, 7], [7, 8], [6, 8],
];
const points: Point[] = [
  { x: 70, y: 130 }, { x: 165, y: 55 }, { x: 165, y: 205 },
  { x: 270, y: 85 }, { x: 270, y: 225 }, { x: 375, y: 150 },
  { x: 455, y: 55 }, { x: 545, y: 120 }, { x: 460, y: 205 },
  { x: 560, y: 260 },
];

function buildAdjacency(vertexCount: number, graphEdges: readonly Edge[]) {
  const adjacency = Array.from({ length: vertexCount }, () => [] as number[]);
  for (const [v, w] of graphEdges) {
    adjacency[v].push(w);
    adjacency[w].push(v);
  }
  for (const list of adjacency) list.sort((a, b) => a - b);
  return adjacency;
}

const adjacency = buildAdjacency(vertices.length, edges);

function edgeKey(v: number, w: number) {
  return v < w ? `${v}-${w}` : `${w}-${v}`;
}

function GraphCanvas({
  highlighted = [],
  current,
  path = [],
  labels,
  componentIds,
}: {
  highlighted?: number[];
  current?: number;
  path?: number[];
  labels?: string[];
  componentIds?: number[];
}) {
  const pathEdges = new Set(path.slice(1).map((vertex, index) => edgeKey(path[index], vertex)));
  const componentClasses = ["fill-accent/15 stroke-accent", "fill-warning/15 stroke-warning", "fill-success/15 stroke-success", "fill-danger/15 stroke-danger"];

  return (
    <svg viewBox="0 0 620 310" className="h-auto w-full border border-border bg-background" role="img" aria-label="undirected graph">
      <g className="text-secondary">
        {edges.map(([v, w]) => (
          <line
            key={edgeKey(v, w)}
            x1={points[v].x}
            y1={points[v].y}
            x2={points[w].x}
            y2={points[w].y}
            className={pathEdges.has(edgeKey(v, w)) ? "stroke-success" : "stroke-border"}
            strokeWidth={pathEdges.has(edgeKey(v, w)) ? 5 : 2}
          />
        ))}
      </g>
      {vertices.map((vertex) => {
        const active = highlighted.includes(vertex);
        const selected = current === vertex;
        const componentClass = componentIds ? componentClasses[componentIds[vertex] % componentClasses.length] : "fill-background stroke-border";
        return (
          <g key={vertex}>
            <circle
              cx={points[vertex].x}
              cy={points[vertex].y}
              r={selected ? 24 : 21}
              className={selected ? "fill-warning/20 stroke-warning" : active ? "fill-accent/20 stroke-accent" : componentClass}
              strokeWidth={selected ? 4 : 2}
            />
            <text x={points[vertex].x} y={points[vertex].y + 4} textAnchor="middle" className="fill-primary text-xs font-semibold">
              {labels?.[vertex] ?? vertex}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function Algs4UndirectedGraphModelMap() {
  const [selected, setSelected] = useState(2);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          selected vertex = {selected} · degree = {adjacency[selected].length}
          <input className="mt-2 w-full accent-current" type="range" min="0" max={vertices.length - 1} value={selected} onChange={(event) => setSelected(Number(event.target.value))} />
        </label>
        <div className="mt-4"><GraphCanvas current={selected} highlighted={adjacency[selected]} /></div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-secondary">
          <div className="border border-accent p-3">V<div className="font-mono text-accent">{vertices.length}</div></div>
          <div className="border border-warning p-3">E<div className="font-mono text-warning">{edges.length}</div></div>
          <div className="border border-success p-3">adj({selected})<div className="font-mono text-success">{adjacency[selected].join(" ") || "empty"}</div></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Undirected edge v-w同时出现在adj(v)与adj(w)；isolated vertex仍属于V，但adjacency list为空。
      </figcaption>
    </figure>
  );
}

const candidateEdges: Edge[] = Array.from({ length: 10 }, (_, v) => Array.from({ length: 10 - v - 1 }, (_, offset) => [v, v + offset + 1] as const)).flat();

export function Algs4GraphRepresentationLab() {
  const [edgeCount, setEdgeCount] = useState(12);
  const listEntries = 10 + 2 * edgeCount;
  const matrixEntries = 10 * 10;
  const density = edgeCount / candidateEdges.length;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          V = 10 · E = {edgeCount} · density = {(density * 100).toFixed(1)}%
          <input className="mt-2 w-full accent-current" type="range" min="0" max={candidateEdges.length} value={edgeCount} onChange={(event) => setEdgeCount(Number(event.target.value))} />
        </label>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="border border-success bg-success/10 p-4">
            <div className="text-xs text-secondary">adjacency lists · V + 2E entries</div>
            <div className="mt-2 font-mono text-2xl text-success">{listEntries}</div>
            <div className="mt-3 h-3 bg-border"><div className="h-full bg-success" style={{ width: `${Math.min(100, listEntries)}%` }} /></div>
          </div>
          <div className="border border-danger bg-danger/10 p-4">
            <div className="text-xs text-secondary">adjacency matrix · V squared cells</div>
            <div className="mt-2 font-mono text-2xl text-danger">{matrixEntries}</div>
            <div className="mt-3 h-3 bg-border"><div className="h-full w-full bg-danger" /></div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-secondary">
          <div className="border border-accent p-3">iterate adj(v)<div className="font-mono text-accent">degree(v)</div></div>
          <div className="border border-warning p-3">add edge<div className="font-mono text-warning">constant</div></div>
          <div className="border border-success p-3">space<div className="font-mono text-success">Theta(V+E)</div></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Algs4 Graph用vertex-indexed Bag array，面向常见sparse graphs把space与neighbor iteration绑定到实际edges。
      </figcaption>
    </figure>
  );
}

type DfsEvent = { current: number; marked: number[]; stack: number[]; edgeTo: Record<number, number> };

function depthFirstTrace(source: number) {
  const marked = new Set<number>();
  const edgeTo: Record<number, number> = {};
  const stack: number[] = [];
  const events: DfsEvent[] = [];
  function visit(vertex: number) {
    marked.add(vertex);
    stack.push(vertex);
    events.push({ current: vertex, marked: [...marked], stack: [...stack], edgeTo: { ...edgeTo } });
    for (const neighbor of adjacency[vertex]) {
      if (!marked.has(neighbor)) {
        edgeTo[neighbor] = vertex;
        visit(neighbor);
        events.push({ current: vertex, marked: [...marked], stack: [...stack], edgeTo: { ...edgeTo } });
      }
    }
    stack.pop();
  }
  visit(source);
  return events;
}

function reconstructPath(source: number, target: number, edgeTo: Record<number, number>, marked: readonly number[]) {
  if (!marked.includes(target)) return [];
  const path = [target];
  let current = target;
  while (current !== source) {
    const parent = edgeTo[current];
    if (parent === undefined) return [];
    path.push(parent);
    current = parent;
  }
  return path.reverse();
}

export function Algs4DepthFirstTraceLab() {
  const events = useMemo(() => depthFirstTrace(0), []);
  const [step, setStep] = useState(3);
  const event = events[Math.min(step, events.length - 1)];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          DFS source 0 · event {step + 1}/{events.length} · current {event.current}
          <input className="mt-2 w-full accent-current" type="range" min="0" max={events.length - 1} value={step} onChange={(eventInput) => setStep(Number(eventInput.target.value))} />
        </label>
        <div className="mt-4"><GraphCanvas highlighted={event.marked} current={event.current} /></div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-secondary">
          <div className="border border-accent p-3">marked<div className="font-mono text-accent">{event.marked.join(" ")}</div></div>
          <div className="border border-warning p-3">call stack<div className="font-mono text-warning">{event.stack.join(" → ") || "empty"}</div></div>
          <div className="border border-success p-3">tree edges<div className="font-mono text-success">{Object.entries(event.edgeTo).map(([v, parent]) => `${parent}-${v}`).join(" ")}</div></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        DFS在递归前mark，沿一个unmarked neighbor走到底再backtrack；edgeTo只记录首次发现vertex的parent edge。
      </figcaption>
    </figure>
  );
}

export function Algs4DepthFirstPathLab() {
  const [target, setTarget] = useState(5);
  const events = useMemo(() => depthFirstTrace(0), []);
  const final = events.at(-1) ?? events[0];
  const path = reconstructPath(0, target, final.edgeTo, final.marked);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">DFS path 0 to {target}<input className="mt-2 w-full accent-current" type="range" min="0" max={vertices.length - 1} value={target} onChange={(event) => setTarget(Number(event.target.value))} /></label>
        <div className="mt-4"><GraphCanvas highlighted={final.marked} current={target} path={path} /></div>
        <div className={"mt-4 border p-3 text-xs " + (path.length ? "border-success bg-success/10 text-success" : "border-danger bg-danger/10 text-danger")}>
          {path.length ? `edgeTo chain: ${path.join(" → ")} · ${path.length - 1} edges` : "No path: target is outside source component"}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        EdgeTo是source-rooted DFS tree的parent array；它给出some path，但不承诺edge count最少。
      </figcaption>
    </figure>
  );
}

type BfsResult = { order: number[]; edgeTo: Record<number, number>; distTo: number[]; marked: number[] };

function breadthFirst(source: number, graphAdjacency = adjacency): BfsResult {
  const marked = new Set([source]);
  const queue = [source];
  const order: number[] = [];
  const edgeTo: Record<number, number> = {};
  const distTo = Array(graphAdjacency.length).fill(Number.POSITIVE_INFINITY);
  distTo[source] = 0;
  while (queue.length > 0) {
    const vertex = queue.shift();
    if (vertex === undefined) break;
    order.push(vertex);
    for (const neighbor of graphAdjacency[vertex]) {
      if (!marked.has(neighbor)) {
        marked.add(neighbor);
        edgeTo[neighbor] = vertex;
        distTo[neighbor] = distTo[vertex] + 1;
        queue.push(neighbor);
      }
    }
  }
  return { order, edgeTo, distTo, marked: [...marked] };
}

export function Algs4BreadthFirstLayersLab() {
  const [target, setTarget] = useState(5);
  const result = useMemo(() => breadthFirst(0), []);
  const path = reconstructPath(0, target, result.edgeTo, result.marked);
  const maxDistance = Math.max(...result.distTo.filter(Number.isFinite), 0);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">BFS target = {target} · distTo = {Number.isFinite(result.distTo[target]) ? result.distTo[target] : "infinity"}<input className="mt-2 w-full accent-current" type="range" min="0" max={vertices.length - 1} value={target} onChange={(event) => setTarget(Number(event.target.value))} /></label>
        <div className="mt-4"><GraphCanvas highlighted={result.marked} current={target} path={path} /></div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          {Array.from({ length: maxDistance + 1 }, (_, distance) => <div key={distance} className="border border-border bg-background p-3 text-xs text-secondary"><div>distance {distance}</div><div className="mt-1 font-mono text-accent">{vertices.filter((vertex) => result.distTo[vertex] === distance).join(" ")}</div></div>)}
        </div>
        <div className="mt-3 border border-success bg-success/10 p-3 text-xs text-success">dequeue order: {result.order.join(" → ")} · shortest path: {path.join(" → ") || "none"}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        FIFO queue让distance d的vertices全部先于distance d+1展开，因此first-discovery edgeTo组成unweighted shortest-path tree。
      </figcaption>
    </figure>
  );
}

export function Algs4DfsBfsComparisonLab() {
  const [target, setTarget] = useState(5);
  const dfsEvents = useMemo(() => depthFirstTrace(0), []);
  const dfs = dfsEvents.at(-1) ?? dfsEvents[0];
  const bfs = useMemo(() => breadthFirst(0), []);
  const dfsPath = reconstructPath(0, target, dfs.edgeTo, dfs.marked);
  const bfsPath = reconstructPath(0, target, bfs.edgeTo, bfs.marked);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">compare paths to {target}<input className="mt-2 w-full accent-current" type="range" min="0" max="5" value={target} onChange={(event) => setTarget(Number(event.target.value))} /></label>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div><div className="mb-2 text-center text-xs font-semibold text-warning">DFS · some path</div><GraphCanvas path={dfsPath} highlighted={dfs.marked} current={target} /></div>
          <div><div className="mb-2 text-center text-xs font-semibold text-success">BFS · fewest edges</div><GraphCanvas path={bfsPath} highlighted={bfs.marked} current={target} /></div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs"><div className="border border-warning p-3 text-warning">{dfsPath.join(" → ")} ({Math.max(0, dfsPath.length - 1)} edges)</div><div className="border border-success p-3 text-success">{bfsPath.join(" → ")} ({Math.max(0, bfsPath.length - 1)} edges)</div></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        DFS与BFS都在Theta(V+E)内判reachability；只有BFS的FIFO layer invariant证明unweighted shortest path。
      </figcaption>
    </figure>
  );
}

function connectedComponents() {
  const marked = new Set<number>();
  const ids = Array(vertices.length).fill(-1);
  const sizes: number[] = [];
  let count = 0;
  function visit(vertex: number) {
    marked.add(vertex);
    ids[vertex] = count;
    sizes[count] += 1;
    for (const neighbor of adjacency[vertex]) if (!marked.has(neighbor)) visit(neighbor);
  }
  for (const vertex of vertices) {
    if (!marked.has(vertex)) {
      sizes[count] = 0;
      visit(vertex);
      count += 1;
    }
  }
  return { ids, sizes, count };
}

export function Algs4ConnectedComponentsLab() {
  const [left, setLeft] = useState(1);
  const [right, setRight] = useState(8);
  const result = useMemo(() => connectedComponents(), []);
  const connected = result.ids[left] === result.ids[right];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">v = {left}<input className="mt-2 w-full accent-current" type="range" min="0" max="9" value={left} onChange={(event) => setLeft(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">w = {right}<input className="mt-2 w-full accent-current" type="range" min="0" max="9" value={right} onChange={(event) => setRight(Number(event.target.value))} /></label></div>
        <div className="mt-4"><GraphCanvas componentIds={result.ids} current={left} highlighted={[right]} /></div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-secondary"><div className="border border-accent p-3">component count<div className="font-mono text-accent">{result.count}</div></div><div className="border border-warning p-3">sizes<div className="font-mono text-warning">{result.sizes.join(" / ")}</div></div><div className={"border p-3 " + (connected ? "border-success text-success" : "border-danger text-danger")}>connected(v,w)<div className="font-mono">{String(connected)}</div></div></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        CC从每个unmarked vertex启动一次DFS并赋同一id；preprocessing Theta(V+E)后，connected query只比较两个ids。
      </figcaption>
    </figure>
  );
}

const routeNames = ["JFK", "ORD", "ATL", "DEN", "DFW", "SEA", "SFO"];
const routeEdges: Edge[] = [[0, 1], [0, 2], [1, 3], [2, 4], [4, 3], [5, 6]];
const routeAdjacency = buildAdjacency(routeNames.length, routeEdges);

export function Algs4SymbolGraphLab() {
  const [target, setTarget] = useState(3);
  const result = useMemo(() => breadthFirst(0, routeAdjacency), []);
  const path = reconstructPath(0, target, result.edgeTo, result.marked);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">degrees from JFK to {routeNames[target]}<input className="mt-2 w-full accent-current" type="range" min="0" max={routeNames.length - 1} value={target} onChange={(event) => setTarget(Number(event.target.value))} /></label>
        <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1.4fr]">
          <div className="border border-border bg-background">
            {routeNames.map((name, index) => <div key={name} className="grid grid-cols-[3rem_1fr] border-b border-border text-xs last:border-b-0"><span className="border-r border-border p-2 text-center font-mono text-accent">{index}</span><span className="p-2 font-mono text-primary">{name}</span></div>)}
          </div>
          <div className="space-y-3">
            <div className="border border-border bg-background p-3 text-xs text-secondary">ST name → index · keys[index] → name · Graph indices → adjacency</div>
            <div className={"border p-4 font-mono text-xs " + (path.length ? "border-success bg-success/10 text-success" : "border-danger bg-danger/10 text-danger")}>{path.length ? path.map((vertex) => routeNames[vertex]).join(" → ") : "not connected"}</div>
            <div className="border border-warning bg-warning/10 p-3 text-xs text-warning">distance = {Number.isFinite(result.distTo[target]) ? result.distTo[target] : "infinity"}</div>
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        SymbolGraph以ST与inverse array隔离domain names和dense integer algorithm core；BFS结果再映射回names供client展示。
      </figcaption>
    </figure>
  );
}

type DfsApplication = "cycle" | "bipartite" | "bridge" | "flood fill";
const applicationNotes: Record<DfsApplication, { state: string; certificate: string }> = {
  cycle: { state: "parent + edgeTo", certificate: "return to marked non-parent vertex" },
  bipartite: { state: "two-color assignment", certificate: "edge endpoints have opposite colors" },
  bridge: { state: "preorder + low link", certificate: "child low exceeds parent preorder" },
  "flood fill": { state: "implicit grid neighbors", certificate: "all reachable same-region cells marked" },
};

export function Algs4DfsApplicationMap() {
  const [application, setApplication] = useState<DfsApplication>("cycle");
  const note = applicationNotes[application];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 border border-border sm:grid-cols-4" role="group" aria-label="DFS application">
          {(["cycle", "bipartite", "bridge", "flood fill"] as DfsApplication[]).map((option) => <button key={option} type="button" onClick={() => setApplication(option)} className={"min-h-11 border-b border-r border-border px-2 py-2 text-xs sm:border-b-0 last:border-r-0 " + (application === option ? "bg-primary text-background" : "bg-background text-secondary")}>{option}</button>)}
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-3"><div className="border border-accent bg-accent/10 p-4"><div className="text-xs text-secondary">shared traversal</div><div className="mt-2 font-mono text-accent">DFS marked[]</div></div><div className="border border-warning bg-warning/10 p-4"><div className="text-xs text-secondary">extra state</div><div className="mt-2 font-mono text-warning">{note.state}</div></div><div className="border border-success bg-success/10 p-4"><div className="text-xs text-secondary">result certificate</div><div className="mt-2 text-xs text-success">{note.certificate}</div></div></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        DFS skeleton不变，problem-specific state决定cycle、two-color、bridge与implicit-region semantics。
      </figcaption>
    </figure>
  );
}
