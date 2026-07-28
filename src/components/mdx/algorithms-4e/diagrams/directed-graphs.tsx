"use client";

import { useId, useMemo, useState } from "react";

type Edge = readonly [number, number];
type Point = { x: number; y: number };

const points: Point[] = [
  { x: 60, y: 150 }, { x: 155, y: 55 }, { x: 155, y: 235 },
  { x: 275, y: 85 }, { x: 285, y: 225 }, { x: 400, y: 150 },
  { x: 500, y: 65 }, { x: 550, y: 225 },
];

const cyclicEdges: Edge[] = [
  [0, 1], [0, 2], [1, 3], [2, 3], [3, 4], [4, 2], [4, 5], [5, 6], [6, 7], [7, 6],
];

const dagEdges: Edge[] = [
  [0, 1], [0, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 5], [4, 5], [5, 6], [4, 7],
];

function buildAdjacency(vertexCount: number, graphEdges: readonly Edge[]) {
  const adjacency = Array.from({ length: vertexCount }, () => [] as number[]);
  for (const [from, to] of graphEdges) adjacency[from].push(to);
  for (const list of adjacency) list.sort((a, b) => a - b);
  return adjacency;
}

function reverseEdges(graphEdges: readonly Edge[]): Edge[] {
  return graphEdges.map(([from, to]) => [to, from] as const);
}

function edgeKey(from: number, to: number) {
  return `${from}->${to}`;
}

function DirectedGraphCanvas({
  graphEdges,
  vertexCount = 8,
  highlighted = [],
  current,
  path = [],
  componentIds,
  labels,
}: {
  graphEdges: readonly Edge[];
  vertexCount?: number;
  highlighted?: number[];
  current?: number;
  path?: number[];
  componentIds?: number[];
  labels?: string[];
}) {
  const markerId = useId().replace(/:/g, "");
  const pathEdges = new Set(path.slice(1).map((vertex, index) => edgeKey(path[index], vertex)));
  const componentClasses = ["fill-accent/15 stroke-accent", "fill-warning/15 stroke-warning", "fill-success/15 stroke-success", "fill-danger/15 stroke-danger"];

  return (
    <svg viewBox="0 0 620 300" className="h-auto w-full border border-border bg-background" role="img" aria-label="directed graph">
      <defs>
        <marker id={markerId} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="context-stroke" />
        </marker>
      </defs>
      {graphEdges.map(([from, to], edgeIndex) => {
        const start = points[from];
        const end = points[to];
        const dx = end.x - start.x;
        const dy = end.y - start.y;
        const length = Math.max(1, Math.hypot(dx, dy));
        const active = pathEdges.has(edgeKey(from, to));
        const offset = graphEdges.some(([otherFrom, otherTo]) => otherFrom === to && otherTo === from) ? (edgeIndex % 2 === 0 ? 5 : -5) : 0;
        const normalX = -dy / length * offset;
        const normalY = dx / length * offset;
        return (
          <line
            key={`${from}-${to}-${edgeIndex}`}
            x1={start.x + (dx / length) * 23 + normalX}
            y1={start.y + (dy / length) * 23 + normalY}
            x2={end.x - (dx / length) * 29 + normalX}
            y2={end.y - (dy / length) * 29 + normalY}
            className={active ? "stroke-success" : "stroke-border"}
            strokeWidth={active ? 5 : 2}
            markerEnd={`url(#${markerId})`}
          />
        );
      })}
      {Array.from({ length: vertexCount }, (_, vertex) => {
        const selected = current === vertex;
        const active = highlighted.includes(vertex);
        const componentClass = componentIds ? componentClasses[componentIds[vertex] % componentClasses.length] : "fill-background stroke-border";
        return (
          <g key={vertex}>
            <circle cx={points[vertex].x} cy={points[vertex].y} r={selected ? 24 : 21} className={selected ? "fill-warning/20 stroke-warning" : active ? "fill-accent/20 stroke-accent" : componentClass} strokeWidth={selected ? 4 : 2} />
            <text x={points[vertex].x} y={points[vertex].y + 4} textAnchor="middle" className="fill-primary text-xs font-semibold">{labels?.[vertex] ?? vertex}</text>
          </g>
        );
      })}
    </svg>
  );
}

export function Algs4DirectedGraphModelMap() {
  const [selected, setSelected] = useState(4);
  const [reversed, setReversed] = useState(false);
  const graphEdges = reversed ? reverseEdges(cyclicEdges) : cyclicEdges;
  const adjacency = useMemo(() => buildAdjacency(8, graphEdges), [graphEdges]);
  const indegree = graphEdges.filter(([, to]) => to === selected).length;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">selected vertex = {selected}<input className="mt-2 w-full accent-current" type="range" min="0" max="7" value={selected} onChange={(event) => setSelected(Number(event.target.value))} /></label>
        <label className="mt-3 flex items-center gap-2 text-xs text-secondary"><input type="checkbox" checked={reversed} onChange={(event) => setReversed(event.target.checked)} />show reverse digraph</label>
        <div className="mt-4"><DirectedGraphCanvas graphEdges={graphEdges} current={selected} highlighted={adjacency[selected]} /></div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-secondary"><div className="border border-accent p-3">outdegree<div className="font-mono text-accent">{adjacency[selected].length}</div></div><div className="border border-warning p-3">indegree<div className="font-mono text-warning">{indegree}</div></div><div className="border border-success p-3">adj({selected})<div className="font-mono text-success">{adjacency[selected].join(" ") || "empty"}</div></div></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Directed edge v-to-w只进入adj(v)；reverse把每条arrow翻转，因此indegree与outdegree交换，reachability也会改变。
      </figcaption>
    </figure>
  );
}

function reachableFrom(sources: readonly number[], adjacency: number[][]) {
  const marked = new Set<number>();
  function visit(vertex: number) {
    marked.add(vertex);
    for (const neighbor of adjacency[vertex]) if (!marked.has(neighbor)) visit(neighbor);
  }
  for (const source of sources) if (!marked.has(source)) visit(source);
  return [...marked].sort((a, b) => a - b);
}
type CycleEvent = { current: number; edge?: Edge; marked: number[]; onStack: number[]; cycle: number[] };

function directedCycleTrace(graphEdges: readonly Edge[], vertexCount = 8) {
  const adjacency = buildAdjacency(vertexCount, graphEdges);
  const marked = new Set<number>();
  const onStack = new Set<number>();
  const edgeTo: Record<number, number> = {};
  const events: CycleEvent[] = [];
  let cycle: number[] = [];

  function visit(vertex: number) {
    onStack.add(vertex);
    marked.add(vertex);
    events.push({ current: vertex, marked: [...marked], onStack: [...onStack], cycle: [] });
    for (const neighbor of adjacency[vertex]) {
      if (cycle.length > 0) break;
      if (!marked.has(neighbor)) {
        edgeTo[neighbor] = vertex;
        events.push({ current: vertex, edge: [vertex, neighbor], marked: [...marked], onStack: [...onStack], cycle: [] });
        visit(neighbor);
      } else if (onStack.has(neighbor)) {
        const reversed = [vertex];
        let current = vertex;
        while (current !== neighbor) {
          current = edgeTo[current];
          reversed.push(current);
        }
        cycle = [...reversed.reverse(), neighbor];
        events.push({ current: vertex, edge: [vertex, neighbor], marked: [...marked], onStack: [...onStack], cycle: [...cycle] });
      }
    }
    onStack.delete(vertex);
  }

  for (let vertex = 0; vertex < vertexCount && cycle.length === 0; vertex += 1) if (!marked.has(vertex)) visit(vertex);
  return { events, cycle };
}
function depthFirstOrder(graphEdges: readonly Edge[], vertexCount = 8) {
  const adjacency = buildAdjacency(vertexCount, graphEdges);
  const marked = new Set<number>();
  const pre: number[] = [];
  const post: number[] = [];
  function visit(vertex: number) {
    marked.add(vertex);
    pre.push(vertex);
    for (const neighbor of adjacency[vertex]) if (!marked.has(neighbor)) visit(neighbor);
    post.push(vertex);
  }
  for (let vertex = 0; vertex < vertexCount; vertex += 1) if (!marked.has(vertex)) visit(vertex);
  return { pre, post, reversePost: [...post].reverse() };
}

type OrderMode = "preorder" | "postorder" | "reverse postorder";
const sccEdges: Edge[] = [
  [0, 1], [1, 2], [2, 0],
  [2, 3], [1, 5],
  [3, 4], [4, 3],
  [4, 5], [5, 6],
  [6, 7], [7, 6],
];

function kosarajuSharir(graphEdges: readonly Edge[], vertexCount = 8) {
  const reverseOrder = depthFirstOrder(reverseEdges(graphEdges), vertexCount).reversePost;
  const adjacency = buildAdjacency(vertexCount, graphEdges);
  const marked = new Set<number>();
  const ids = Array(vertexCount).fill(-1);
  const componentOrders: number[][] = [];
  let count = 0;
  function visit(vertex: number) {
    marked.add(vertex);
    ids[vertex] = count;
    componentOrders[count].push(vertex);
    for (const neighbor of adjacency[vertex]) if (!marked.has(neighbor)) visit(neighbor);
  }
  for (const vertex of reverseOrder) {
    if (!marked.has(vertex)) {
      componentOrders[count] = [];
      visit(vertex);
      count += 1;
    }
  }
  return { reverseOrder, ids, componentOrders, count };
}
