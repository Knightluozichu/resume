"use client";

import { useId, useMemo, useState } from "react";

type DirectedEdge = { from: number; to: number; weight: number };
type Point = { x: number; y: number };

const points: Point[] = [
  { x: 52, y: 150 },
  { x: 150, y: 62 },
  { x: 155, y: 238 },
  { x: 275, y: 75 },
  { x: 285, y: 225 },
  { x: 410, y: 62 },
  { x: 420, y: 235 },
  { x: 555, y: 148 },
];

const edges: DirectedEdge[] = [
  { from: 0, to: 1, weight: 0.5 },
  { from: 0, to: 2, weight: 0.2 },
  { from: 2, to: 1, weight: 0.1 },
  { from: 1, to: 3, weight: 0.4 },
  { from: 1, to: 4, weight: 0.8 },
  { from: 2, to: 3, weight: 0.9 },
  { from: 2, to: 4, weight: 0.8 },
  { from: 3, to: 4, weight: 0.2 },
  { from: 3, to: 5, weight: 0.6 },
  { from: 4, to: 5, weight: 0.3 },
  { from: 4, to: 6, weight: 0.4 },
  { from: 6, to: 5, weight: 0.1 },
  { from: 5, to: 7, weight: 0.5 },
  { from: 6, to: 7, weight: 0.2 },
];

function edgeKey(edge: DirectedEdge) {
  return `${edge.from}-${edge.to}-${edge.weight}`;
}

function edgeLabel(edge: DirectedEdge) {
  return `${edge.from}→${edge.to}@${edge.weight.toFixed(2)}`;
}

function formatDistance(value: number) {
  return Number.isFinite(value) ? value.toFixed(2) : "∞";
}

function WeightedDigraphCanvas({
  graphEdges = edges,
  graphPoints = points,
  highlighted = [],
  current,
  settled = [],
  distances,
}: {
  graphEdges?: DirectedEdge[];
  graphPoints?: Point[];
  highlighted?: DirectedEdge[];
  current?: DirectedEdge;
  settled?: number[];
  distances?: number[];
}) {
  const markerId = useId().replaceAll(":", "");
  const highlightedKeys = new Set(highlighted.map(edgeKey));
  const currentKey = current ? edgeKey(current) : null;

  return (
    <svg
      viewBox="0 0 620 300"
      className="h-auto w-full border border-border bg-background"
      role="img"
      aria-label="edge-weighted digraph"
    >
      <defs>
        <marker
          id={markerId}
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-current" />
        </marker>
      </defs>
      {graphEdges.map((edge) => {
        const start = graphPoints[edge.from];
        const end = graphPoints[edge.to];
        const dx = end.x - start.x;
        const dy = end.y - start.y;
        const length = Math.hypot(dx, dy) || 1;
        const ux = dx / length;
        const uy = dy / length;
        const active = highlightedKeys.has(edgeKey(edge));
        const selected = currentKey === edgeKey(edge);
        const strokeClass = selected
          ? "text-warning"
          : active
            ? "text-success"
            : edge.weight < 0
              ? "text-danger"
              : "text-border";
        return (
          <g key={edgeKey(edge)} className={strokeClass}>
            <line
              x1={start.x + ux * 23}
              y1={start.y + uy * 23}
              x2={end.x - ux * 27}
              y2={end.y - uy * 27}
              stroke="currentColor"
              strokeWidth={selected ? 6 : active ? 5 : 2}
              markerEnd={`url(#${markerId})`}
            />
            <text
              x={(start.x + end.x) / 2 + uy * 9}
              y={(start.y + end.y) / 2 - ux * 9}
              textAnchor="middle"
              className="fill-primary stroke-background text-[11px] font-mono"
              strokeWidth="5"
              style={{ paintOrder: "stroke" }}
            >
              {edge.weight.toFixed(2)}
            </text>
          </g>
        );
      })}
      {graphPoints.map((point, vertex) => (
        <g key={vertex}>
          <circle
            cx={point.x}
            cy={point.y}
            r="22"
            className={
              settled.includes(vertex)
                ? "fill-accent/20 stroke-accent"
                : "fill-background stroke-border"
            }
            strokeWidth="2"
          />
          <text
            x={point.x}
            y={point.y + (distances ? 0 : 4)}
            textAnchor="middle"
            className="fill-primary text-xs font-semibold"
          >
            {vertex}
          </text>
          {distances ? (
            <text
              x={point.x}
              y={point.y + 14}
              textAnchor="middle"
              className="fill-secondary text-[11px] font-mono"
            >
              {formatDistance(distances[vertex])}
            </text>
          ) : null}
        </g>
      ))}
    </svg>
  );
}

type DijkstraState = {
  current: number;
  settled: number[];
  dist: number[];
  edgeTo: (DirectedEdge | null)[];
  changed: DirectedEdge[];
};

function dijkstraTrace() {
  const dist = Array(points.length).fill(Number.POSITIVE_INFINITY);
  const edgeTo: (DirectedEdge | null)[] = Array(points.length).fill(null);
  const settled = Array(points.length).fill(false);
  const states: DijkstraState[] = [];
  dist[0] = 0;

  while (true) {
    let vertex = -1;
    for (let candidate = 0; candidate < points.length; candidate++) {
      if (
        !settled[candidate] &&
        Number.isFinite(dist[candidate]) &&
        (vertex === -1 || dist[candidate] < dist[vertex])
      )
        vertex = candidate;
    }
    if (vertex === -1) break;
    settled[vertex] = true;
    const changed: DirectedEdge[] = [];
    for (const edge of edges.filter((item) => item.from === vertex)) {
      const candidate = dist[vertex] + edge.weight;
      if (candidate < dist[edge.to]) {
        dist[edge.to] = candidate;
        edgeTo[edge.to] = edge;
        changed.push(edge);
      }
    }
    states.push({
      current: vertex,
      settled: settled.flatMap((value, index) => (value ? [index] : [])),
      dist: [...dist],
      edgeTo: [...edgeTo],
      changed,
    });
  }
  return states;
}

const dijkstraStates = dijkstraTrace();
export function Algs4WeightedDigraphModelMap() {
  const [edgeIndex, setEdgeIndex] = useState(2);
  const edge = edges[edgeIndex];
  const outgoing = edges.filter((item) => item.from === edge.from);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          DirectedEdge = {edgeLabel(edge)}
          <input
            className="mt-2 w-full accent-current"
            type="range"
            min="0"
            max={edges.length - 1}
            value={edgeIndex}
            onChange={(event) => setEdgeIndex(Number(event.target.value))}
          />
        </label>
        <div className="mt-4">
          <WeightedDigraphCanvas current={edge} />
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-secondary">
          <div className="border border-accent p-3">
            from()<div className="font-mono text-accent">{edge.from}</div>
          </div>
          <div className="border border-warning p-3">
            to()<div className="font-mono text-warning">{edge.to}</div>
          </div>
          <div className="border border-success p-3">
            weight()
            <div className="font-mono text-success">
              {edge.weight.toFixed(2)}
            </div>
          </div>
        </div>
        <div className="mt-3 border border-border bg-background p-3 text-xs text-secondary">
          adj({edge.from}) ={" "}
          <span className="font-mono text-primary">
            {outgoing.map(edgeLabel).join(" · ")}
          </span>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        DirectedEdge只有from端的outgoing adjacency
        list持有它；direction与weight都是path contract的一部分。
      </figcaption>
    </figure>
  );
}
const dagPoints: Point[] = [
  { x: 55, y: 150 },
  { x: 155, y: 65 },
  { x: 155, y: 235 },
  { x: 310, y: 70 },
  { x: 405, y: 210 },
  { x: 555, y: 145 },
];

const dagEdges: DirectedEdge[] = [
  { from: 0, to: 1, weight: 5 },
  { from: 0, to: 2, weight: 3 },
  { from: 1, to: 2, weight: 2 },
  { from: 1, to: 3, weight: 6 },
  { from: 2, to: 3, weight: 7 },
  { from: 2, to: 4, weight: 4 },
  { from: 2, to: 5, weight: 3 },
  { from: 3, to: 4, weight: -1 },
  { from: 4, to: 5, weight: -2 },
];

function dagShortestTrace() {
  const dist = Array(dagPoints.length).fill(Number.POSITIVE_INFINITY);
  const edgeTo: (DirectedEdge | null)[] = Array(dagPoints.length).fill(null);
  const states: {
    current: number;
    dist: number[];
    edgeTo: (DirectedEdge | null)[];
    changed: DirectedEdge[];
  }[] = [];
  dist[0] = 0;
  for (let vertex = 0; vertex < dagPoints.length; vertex++) {
    const changed: DirectedEdge[] = [];
    for (const edge of dagEdges.filter((item) => item.from === vertex)) {
      const candidate = dist[vertex] + edge.weight;
      if (candidate < dist[edge.to]) {
        dist[edge.to] = candidate;
        edgeTo[edge.to] = edge;
        changed.push(edge);
      }
    }
    states.push({
      current: vertex,
      dist: [...dist],
      edgeTo: [...edgeTo],
      changed,
    });
  }
  return states;
}
const jobs = [
  { name: "A", duration: 3, prerequisites: [] as number[] },
  { name: "B", duration: 2, prerequisites: [] as number[] },
  { name: "C", duration: 4, prerequisites: [0, 1] },
  { name: "D", duration: 2, prerequisites: [2] },
];

function computeEarliestStarts() {
  const starts = Array(jobs.length).fill(0);
  for (let index = 0; index < jobs.length; index++) {
    const prerequisites = jobs[index].prerequisites;
    if (prerequisites.length > 0) {
      starts[index] = Math.max(
        ...prerequisites.map(
          (vertex) => starts[vertex] + jobs[vertex].duration,
        ),
      );
    }
  }
  return starts;
}
const bellmanPoints: Point[] = [
  { x: 55, y: 150 },
  { x: 180, y: 65 },
  { x: 180, y: 230 },
  { x: 335, y: 85 },
  { x: 430, y: 220 },
  { x: 555, y: 130 },
];

const bellmanEdges: DirectedEdge[] = [
  { from: 0, to: 1, weight: 5 },
  { from: 0, to: 2, weight: 2 },
  { from: 2, to: 1, weight: -4 },
  { from: 1, to: 3, weight: 3 },
  { from: 2, to: 3, weight: 4 },
  { from: 3, to: 4, weight: 2 },
  { from: 4, to: 5, weight: -1 },
  { from: 1, to: 5, weight: 8 },
  { from: 5, to: 3, weight: 3 },
];

type BellmanState = {
  current: number;
  dist: number[];
  edgeTo: (DirectedEdge | null)[];
  queue: number[];
  changed: DirectedEdge[];
};

function bellmanFordQueueTrace() {
  const dist = Array(bellmanPoints.length).fill(Number.POSITIVE_INFINITY);
  const edgeTo: (DirectedEdge | null)[] = Array(bellmanPoints.length).fill(
    null,
  );
  const queue = [0];
  const onQueue = Array(bellmanPoints.length).fill(false);
  const states: BellmanState[] = [];
  dist[0] = 0;
  onQueue[0] = true;

  let guard = 0;
  while (queue.length > 0 && guard++ < 40) {
    const vertex = queue.shift();
    if (vertex === undefined) break;
    onQueue[vertex] = false;
    const changed: DirectedEdge[] = [];
    for (const edge of bellmanEdges.filter((item) => item.from === vertex)) {
      const candidate = dist[vertex] + edge.weight;
      if (candidate < dist[edge.to]) {
        dist[edge.to] = candidate;
        edgeTo[edge.to] = edge;
        changed.push(edge);
        if (!onQueue[edge.to]) {
          queue.push(edge.to);
          onQueue[edge.to] = true;
        }
      }
    }
    states.push({
      current: vertex,
      dist: [...dist],
      edgeTo: [...edgeTo],
      queue: [...queue],
      changed,
    });
  }
  return states;
}
const negativeCycleEdge: DirectedEdge = { from: 5, to: 1, weight: -5 };
