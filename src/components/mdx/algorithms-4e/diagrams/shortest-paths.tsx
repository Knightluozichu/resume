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
    <svg viewBox="0 0 620 300" className="h-auto w-full border border-border bg-background" role="img" aria-label="edge-weighted digraph">
      <defs>
        <marker id={markerId} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
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
        const strokeClass = selected ? "text-warning" : active ? "text-success" : edge.weight < 0 ? "text-danger" : "text-border";
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
              className="fill-primary stroke-background text-[10px] font-mono"
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
          <circle cx={point.x} cy={point.y} r="22" className={settled.includes(vertex) ? "fill-accent/20 stroke-accent" : "fill-background stroke-border"} strokeWidth="2" />
          <text x={point.x} y={point.y + (distances ? 0 : 4)} textAnchor="middle" className="fill-primary text-xs font-semibold">{vertex}</text>
          {distances ? <text x={point.x} y={point.y + 14} textAnchor="middle" className="fill-secondary text-[9px] font-mono">{formatDistance(distances[vertex])}</text> : null}
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
      if (!settled[candidate] && Number.isFinite(dist[candidate]) && (vertex === -1 || dist[candidate] < dist[vertex])) vertex = candidate;
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
const finalDijkstra = dijkstraStates[dijkstraStates.length - 1];

export function Algs4WeightedDigraphModelMap() {
  const [edgeIndex, setEdgeIndex] = useState(2);
  const edge = edges[edgeIndex];
  const outgoing = edges.filter((item) => item.from === edge.from);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          DirectedEdge = {edgeLabel(edge)}
          <input className="mt-2 w-full accent-current" type="range" min="0" max={edges.length - 1} value={edgeIndex} onChange={(event) => setEdgeIndex(Number(event.target.value))} />
        </label>
        <div className="mt-4"><WeightedDigraphCanvas current={edge} /></div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-secondary">
          <div className="border border-accent p-3">from()<div className="font-mono text-accent">{edge.from}</div></div>
          <div className="border border-warning p-3">to()<div className="font-mono text-warning">{edge.to}</div></div>
          <div className="border border-success p-3">weight()<div className="font-mono text-success">{edge.weight.toFixed(2)}</div></div>
        </div>
        <div className="mt-3 border border-border bg-background p-3 text-xs text-secondary">
          adj({edge.from}) = <span className="font-mono text-primary">{outgoing.map(edgeLabel).join(" · ")}</span>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        DirectedEdge只有from端的outgoing adjacency list持有它；direction与weight都是path contract的一部分。
      </figcaption>
    </figure>
  );
}

export function Algs4EdgeRelaxationLab() {
  const [edgeIndex, setEdgeIndex] = useState(7);
  const [known, setKnown] = useState(1.4);
  const [apply, setApply] = useState(false);
  const edge = edges[edgeIndex];
  const sourceDistance = finalDijkstra.dist[edge.from];
  const candidate = sourceDistance + edge.weight;
  const improves = candidate < known;
  const result = apply && improves ? candidate : known;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          relax edge {edgeLabel(edge)}
          <input className="mt-2 w-full accent-current" type="range" min="0" max={edges.length - 1} value={edgeIndex} onChange={(event) => setEdgeIndex(Number(event.target.value))} />
        </label>
        <label className="mt-4 block text-xs text-secondary">
          current distTo[{edge.to}] = {known.toFixed(2)}
          <input className="mt-2 w-full accent-current" type="range" min="0.2" max="2.4" step="0.1" value={known} onChange={(event) => setKnown(Number(event.target.value))} />
        </label>
        <div className="mt-4"><WeightedDigraphCanvas current={edge} distances={finalDijkstra.dist.map((value, vertex) => vertex === edge.to ? result : value)} /></div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3 text-xs">
          <div className="border border-border p-3 text-secondary">prefix dist<div className="font-mono text-primary">{formatDistance(sourceDistance)}</div></div>
          <div className="border border-border p-3 text-secondary">candidate<div className="font-mono text-primary">{sourceDistance.toFixed(2)} + {edge.weight.toFixed(2)} = {candidate.toFixed(2)}</div></div>
          <div className={"border p-3 " + (improves ? "border-success text-success" : "border-warning text-warning")}>{improves ? "strict improvement" : "no update"}<div className="font-mono">{result.toFixed(2)}</div></div>
        </div>
        <label className="mt-3 flex items-center gap-2 text-sm text-primary"><input type="checkbox" checked={apply} onChange={(event) => setApply(event.target.checked)} />apply relaxation update</label>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Relaxation只在prefix distance加edge weight严格更小时，同时更新distTo与edgeTo。
      </figcaption>
    </figure>
  );
}

export function Algs4DijkstraLab() {
  const [step, setStep] = useState(2);
  const state = dijkstraStates[step];
  const treeEdges = state.edgeTo.filter((edge): edge is DirectedEdge => edge !== null);
  const frontier = state.dist
    .map((distance, vertex) => ({ distance, vertex }))
    .filter((item) => !state.settled.includes(item.vertex) && Number.isFinite(item.distance))
    .sort((a, b) => a.distance - b.distance);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          settle vertex {state.current} · dist = {state.dist[state.current].toFixed(2)}
          <input className="mt-2 w-full accent-current" type="range" min="0" max={dijkstraStates.length - 1} value={step} onChange={(event) => setStep(Number(event.target.value))} />
        </label>
        <div className="mt-4"><WeightedDigraphCanvas highlighted={treeEdges} settled={state.settled} distances={state.dist} /></div>
        <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_2fr]">
          <div className="border border-success p-3 text-xs text-success">relaxed now<div className="mt-1 font-mono">{state.changed.map(edgeLabel).join(" · ") || "none"}</div></div>
          <div className="border border-border bg-background p-3 text-xs text-secondary">IndexMinPQ front<div className="mt-1 font-mono text-primary">{frontier.slice(0, 5).map((item) => `${item.vertex}@${item.distance.toFixed(2)}`).join(" · ") || "empty"}</div></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Nonnegative weights保证minimum-key vertex一旦settled，其distTo不再可能被后续path降低。
      </figcaption>
    </figure>
  );
}

export function Algs4DijkstraInvariantLab() {
  const [step, setStep] = useState(3);
  const state = dijkstraStates[step];
  const finalDistances = finalDijkstra.dist;
  const finalizedCorrectly = state.settled.every((vertex) => Math.abs(state.dist[vertex] - finalDistances[vertex]) < 1e-9);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          settled-prefix certificate · step {step + 1}
          <input className="mt-2 w-full accent-current" type="range" min="0" max={dijkstraStates.length - 1} value={step} onChange={(event) => setStep(Number(event.target.value))} />
        </label>
        <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-8">
          {state.dist.map((distance, vertex) => {
            const settled = state.settled.includes(vertex);
            return (
              <div key={vertex} className={"border p-2 text-center text-xs " + (settled ? "border-accent bg-accent/10" : "border-border bg-background")}>
                <div className="font-semibold text-primary">v{vertex}</div>
                <div className="font-mono text-secondary">{formatDistance(distance)}</div>
                <div className={settled ? "text-success" : "text-warning"}>{settled ? "final" : "upper bound"}</div>
              </div>
            );
          })}
        </div>
        <div className="mt-4 overflow-hidden border border-border bg-background">
          {state.settled.map((vertex) => (
            <div key={vertex} className="grid grid-cols-[4rem_1fr_1fr] border-b border-border p-2 text-xs last:border-b-0">
              <span className="font-mono text-primary">v{vertex}</span>
              <span className="font-mono text-secondary">settled {state.dist[vertex].toFixed(2)}</span>
              <span className="font-mono text-success">oracle {finalDistances[vertex].toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className={"mt-3 border p-3 text-sm " + (finalizedCorrectly ? "border-success text-success" : "border-danger text-danger")}>{finalizedCorrectly ? "all settled labels equal final shortest distances" : "invariant violated"}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Dijkstra的核心不是“访问过”，而是settled label已成为不可再改善的shortest-path distance。
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
  const states: { current: number; dist: number[]; edgeTo: (DirectedEdge | null)[]; changed: DirectedEdge[] }[] = [];
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
    states.push({ current: vertex, dist: [...dist], edgeTo: [...edgeTo], changed });
  }
  return states;
}

const dagStates = dagShortestTrace();

export function Algs4DagShortestPathLab() {
  const [step, setStep] = useState(2);
  const state = dagStates[step];
  const treeEdges = state.edgeTo.filter((edge): edge is DirectedEdge => edge !== null);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          topological relax vertex {state.current}
          <input className="mt-2 w-full accent-current" type="range" min="0" max={dagStates.length - 1} value={step} onChange={(event) => setStep(Number(event.target.value))} />
        </label>
        <div className="mt-4 flex gap-1">
          {dagPoints.map((_, vertex) => <div key={vertex} className={"min-w-0 flex-1 border p-2 text-center text-xs font-mono " + (vertex === state.current ? "border-warning text-warning" : vertex < state.current ? "border-success text-success" : "border-border text-secondary")}>{vertex}</div>)}
        </div>
        <div className="mt-3"><WeightedDigraphCanvas graphEdges={dagEdges} graphPoints={dagPoints} highlighted={treeEdges} settled={Array.from({ length: state.current + 1 }, (_, vertex) => vertex)} distances={state.dist} /></div>
        <div className="mt-3 border border-border bg-background p-3 text-xs text-secondary">updated edges: <span className="font-mono text-primary">{state.changed.map(edgeLabel).join(" · ") || "none"}</span></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        DAG的topological order让所有进入v的paths在处理v之前完成，因此negative edges也不会要求回头。
      </figcaption>
    </figure>
  );
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
      starts[index] = Math.max(...prerequisites.map((vertex) => starts[vertex] + jobs[vertex].duration));
    }
  }
  return starts;
}

const earliestStarts = computeEarliestStarts();

export function Algs4CriticalPathLab() {
  const [jobIndex, setJobIndex] = useState(2);
  const finishTimes = jobs.map((job, index) => earliestStarts[index] + job.duration);
  const makespan = Math.max(...finishTimes);
  const job = jobs[jobIndex];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          selected job {job.name} · earliest start {earliestStarts[jobIndex]}
          <input className="mt-2 w-full accent-current" type="range" min="0" max={jobs.length - 1} value={jobIndex} onChange={(event) => setJobIndex(Number(event.target.value))} />
        </label>
        <div className="mt-4 border border-border bg-background p-4">
          {jobs.map((item, index) => (
            <div key={item.name} className="mb-3 grid grid-cols-[2rem_1fr] items-center gap-2 last:mb-0">
              <span className="text-xs font-semibold text-primary">{item.name}</span>
              <div className="relative h-8 border border-border bg-elevated">
                <div
                  className={"absolute top-1 h-6 border " + (index === jobIndex ? "border-warning bg-warning/20" : "border-accent bg-accent/15")}
                  style={{ left: `${(earliestStarts[index] / makespan) * 100}%`, width: `${(item.duration / makespan) * 100}%` }}
                />
                <span className="absolute inset-y-0 flex items-center text-[10px] font-mono text-primary" style={{ left: `calc(${(earliestStarts[index] / makespan) * 100}% + 6px)` }}>{earliestStarts[index]}→{finishTimes[index]}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
          <div className="border border-border p-3 text-secondary">predecessors<div className="font-mono text-primary">{job.prerequisites.map((index) => jobs[index].name).join(", ") || "source"}</div></div>
          <div className="border border-accent p-3 text-accent">duration<div className="font-mono">{job.duration}</div></div>
          <div className="border border-success p-3 text-success">project finish<div className="font-mono">{makespan}</div></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Critical path method把job duration放在DAG edges上；source到job-start的longest path就是earliest start。
      </figcaption>
    </figure>
  );
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
  const edgeTo: (DirectedEdge | null)[] = Array(bellmanPoints.length).fill(null);
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
    states.push({ current: vertex, dist: [...dist], edgeTo: [...edgeTo], queue: [...queue], changed });
  }
  return states;
}

const bellmanStates = bellmanFordQueueTrace();

export function Algs4BellmanFordLab() {
  const [step, setStep] = useState(3);
  const state = bellmanStates[Math.min(step, bellmanStates.length - 1)];
  const treeEdges = state.edgeTo.filter((edge): edge is DirectedEdge => edge !== null);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          dequeue vertex {state.current} · pass event {step + 1}
          <input className="mt-2 w-full accent-current" type="range" min="0" max={bellmanStates.length - 1} value={step} onChange={(event) => setStep(Number(event.target.value))} />
        </label>
        <div className="mt-4"><WeightedDigraphCanvas graphEdges={bellmanEdges} graphPoints={bellmanPoints} highlighted={treeEdges} current={state.changed[0]} distances={state.dist} /></div>
        <div className="mt-4 grid gap-3 sm:grid-cols-[2fr_1fr]">
          <div className="border border-success p-3 text-xs text-success">successful relaxations<div className="mt-1 font-mono">{state.changed.map(edgeLabel).join(" · ") || "none"}</div></div>
          <div className="border border-accent p-3 text-xs text-accent">FIFO queue<div className="mt-1 font-mono">{state.queue.join(" → ") || "empty"}</div></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Queue-based Bellman-Ford只重扫distTo刚变化的vertices；onQueue防止同一vertex重复排队。
      </figcaption>
    </figure>
  );
}

const negativeCycleEdge: DirectedEdge = { from: 5, to: 1, weight: -5 };
const negativeCycleEdges = [
  bellmanEdges.find((edge) => edge.from === 1 && edge.to === 3),
  bellmanEdges.find((edge) => edge.from === 3 && edge.to === 4),
  bellmanEdges.find((edge) => edge.from === 4 && edge.to === 5),
  negativeCycleEdge,
].filter((edge): edge is DirectedEdge => edge !== undefined);

export function Algs4NegativeCycleLab() {
  const [enabled, setEnabled] = useState(true);
  const [laps, setLaps] = useState(2);
  const graphEdges = enabled ? [...bellmanEdges, negativeCycleEdge] : bellmanEdges;
  const cycleWeight = negativeCycleEdges.reduce((sum, edge) => sum + edge.weight, 0);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={enabled} onChange={(event) => setEnabled(event.target.checked)} />enable edge 5→1 @ -5</label>
        <label className="mt-4 block text-xs text-secondary">
          repeat cycle {laps} times
          <input className="mt-2 w-full accent-current" type="range" min="1" max="6" value={laps} onChange={(event) => setLaps(Number(event.target.value))} />
        </label>
        <div className="mt-4"><WeightedDigraphCanvas graphEdges={graphEdges} graphPoints={bellmanPoints} highlighted={enabled ? negativeCycleEdges : []} current={enabled ? negativeCycleEdge : undefined} /></div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
          <div className="border border-border p-3 text-secondary">cycle<div className="font-mono text-primary">1→3→4→5→1</div></div>
          <div className={"border p-3 " + (enabled ? "border-danger text-danger" : "border-success text-success")}>one lap<div className="font-mono">{enabled ? cycleWeight.toFixed(2) : "not closed"}</div></div>
          <div className="border border-warning p-3 text-warning">distance change<div className="font-mono">{enabled ? (cycleWeight * laps).toFixed(2) : "bounded"}</div></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Reachable negative cycle可重复任意次并持续降低path weight，因此不存在finite shortest path。
      </figcaption>
    </figure>
  );
}

type CertificateMode = "valid" | "wrong predecessor" | "overstated distance" | "missing reachable";

export function Algs4ShortestPathCertificateLab() {
  const [mode, setMode] = useState<CertificateMode>("valid");
  const candidate = useMemo(() => {
    const dist = [...finalDijkstra.dist];
    const edgeTo = [...finalDijkstra.edgeTo];
    if (mode === "wrong predecessor") edgeTo[5] = edges.find((edge) => edge.from === 3 && edge.to === 5) ?? null;
    if (mode === "overstated distance") dist[7] = 2;
    if (mode === "missing reachable") dist[5] = Number.POSITIVE_INFINITY;
    return { dist, edgeTo };
  }, [mode]);

  const triangleViolations = edges.filter((edge) => Number.isFinite(candidate.dist[edge.from]) && candidate.dist[edge.to] > candidate.dist[edge.from] + edge.weight + 1e-9);
  const predecessorViolations = candidate.dist.flatMap((distance, vertex) => {
    if (vertex === 0 || !Number.isFinite(distance)) return [];
    const edge = candidate.edgeTo[vertex];
    return !edge || edge.to !== vertex || Math.abs(candidate.dist[edge.from] + edge.weight - distance) > 1e-9 ? [vertex] : [];
  });
  const valid = candidate.dist[0] === 0 && triangleViolations.length === 0 && predecessorViolations.length === 0;
  const treeEdges = candidate.edgeTo.filter((edge): edge is DirectedEdge => edge !== null);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          candidate shortest-path certificate
          <select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={mode} onChange={(event) => setMode(event.target.value as CertificateMode)}>
            <option value="valid">valid</option>
            <option value="wrong predecessor">wrong predecessor</option>
            <option value="overstated distance">overstated distance</option>
            <option value="missing reachable">missing reachable</option>
          </select>
        </label>
        <div className="mt-4"><WeightedDigraphCanvas highlighted={treeEdges} current={triangleViolations[0]} distances={candidate.dist} /></div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3 text-xs">
          <div className={"border p-3 " + (candidate.dist[0] === 0 ? "border-success text-success" : "border-danger text-danger")}>source label<div className="font-mono">{formatDistance(candidate.dist[0])}</div></div>
          <div className={"border p-3 " + (triangleViolations.length === 0 ? "border-success text-success" : "border-danger text-danger")}>edge inequalities<div className="font-mono">{triangleViolations.map(edgeLabel).join(" · ") || "all pass"}</div></div>
          <div className={"border p-3 " + (predecessorViolations.length === 0 ? "border-success text-success" : "border-danger text-danger")}>edgeTo equalities<div className="font-mono">{predecessorViolations.join(", ") || "all pass"}</div></div>
        </div>
        <div className={"mt-3 border p-3 text-sm " + (valid ? "border-success text-success" : "border-danger text-danger")}>{valid ? "certificate accepted" : "certificate rejected"}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        独立validator同时检查source、all-edge triangle inequalities与每个reachable vertex的tight predecessor edge。
      </figcaption>
    </figure>
  );
}
