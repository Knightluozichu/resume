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
const routeNames = ["JFK", "ORD", "ATL", "DEN", "DFW", "SEA", "SFO"];
const routeEdges: Edge[] = [[0, 1], [0, 2], [1, 3], [2, 4], [4, 3], [5, 6]];
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
