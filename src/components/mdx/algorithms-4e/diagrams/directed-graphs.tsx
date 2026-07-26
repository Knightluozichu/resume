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

export function Algs4DirectedReachabilityLab() {
  const [source, setSource] = useState(0);
  const adjacency = useMemo(() => buildAdjacency(8, cyclicEdges), []);
  const reverseAdjacency = useMemo(() => buildAdjacency(8, reverseEdges(cyclicEdges)), []);
  const outward = reachableFrom([source], adjacency);
  const inward = reachableFrom([source], reverseAdjacency);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">source = {source}<input className="mt-2 w-full accent-current" type="range" min="0" max="7" value={source} onChange={(event) => setSource(Number(event.target.value))} /></label>
        <div className="mt-4"><DirectedGraphCanvas graphEdges={cyclicEdges} current={source} highlighted={outward} /></div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2"><div className="border border-success bg-success/10 p-3 text-xs text-secondary">reachable from {source}<div className="mt-1 font-mono text-success">{outward.join(" ")}</div></div><div className="border border-warning bg-warning/10 p-3 text-xs text-secondary">can reach {source}<div className="mt-1 font-mono text-warning">{inward.join(" ")}</div></div></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Reachable-from-s在G运行DFS；can-reach-s等价于在reverse(G)从s可达，两者通常不是同一集合。
      </figcaption>
    </figure>
  );
}

export function Algs4MultiSourceReachabilityLab() {
  const [secondSource, setSecondSource] = useState(6);
  const adjacency = useMemo(() => buildAdjacency(8, cyclicEdges), []);
  const fromZero = reachableFrom([0], adjacency);
  const combined = reachableFrom([0, secondSource], adjacency);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">sources = {`{0, ${secondSource}}`}<input className="mt-2 w-full accent-current" type="range" min="0" max="7" value={secondSource} onChange={(event) => setSecondSource(Number(event.target.value))} /></label>
        <div className="mt-4"><DirectedGraphCanvas graphEdges={cyclicEdges} highlighted={combined} current={secondSource} /></div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-secondary"><div className="border border-accent p-3">from 0<div className="font-mono text-accent">{fromZero.length}</div></div><div className="border border-warning p-3">added source<div className="font-mono text-warning">{secondSource}</div></div><div className="border border-success p-3">union reach<div className="font-mono text-success">{combined.join(" ")}</div></div></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Multi-source DirectedDFS从每个尚未marked source启动同一DFS，结果是各source reachability sets的union。
      </figcaption>
    </figure>
  );
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

export function Algs4DirectedCycleTraceLab() {
  const trace = useMemo(() => directedCycleTrace(cyclicEdges), []);
  const [step, setStep] = useState(Math.min(7, trace.events.length - 1));
  const event = trace.events[step];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">cycle DFS event {step + 1}/{trace.events.length} · current {event.current}<input className="mt-2 w-full accent-current" type="range" min="0" max={trace.events.length - 1} value={step} onChange={(eventInput) => setStep(Number(eventInput.target.value))} /></label>
        <div className="mt-4"><DirectedGraphCanvas graphEdges={cyclicEdges} current={event.current} highlighted={event.marked} path={event.cycle} /></div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-secondary"><div className="border border-accent p-3">marked<div className="font-mono text-accent">{event.marked.join(" ")}</div></div><div className="border border-warning p-3">onStack<div className="font-mono text-warning">{event.onStack.join(" ")}</div></div><div className={"border p-3 " + (event.cycle.length ? "border-danger text-danger" : "border-success text-success")}>cycle<div className="font-mono">{event.cycle.join(" → ") || "not yet"}</div></div></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Edge to an onStack ancestor is a directed back edge and closes a cycle；edge to merely marked-but-finished vertex does not。
      </figcaption>
    </figure>
  );
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

export function Algs4DfsOrderLab() {
  const [mode, setMode] = useState<OrderMode>("reverse postorder");
  const orders = useMemo(() => depthFirstOrder(dagEdges), []);
  const order = mode === "preorder" ? orders.pre : mode === "postorder" ? orders.post : orders.reversePost;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 border border-border" role="group" aria-label="DFS order">{(["preorder", "postorder", "reverse postorder"] as OrderMode[]).map((option) => <button key={option} type="button" onClick={() => setMode(option)} className={"min-h-11 border-r border-border px-2 py-2 text-xs last:border-r-0 " + (mode === option ? "bg-primary text-background" : "bg-background text-secondary")}>{option}</button>)}</div>
        <div className="mt-5"><DirectedGraphCanvas graphEdges={dagEdges} /></div>
        <div className="mt-4 flex flex-wrap justify-center gap-2">{order.map((vertex, rank) => <div key={vertex} className="min-w-12 border border-accent bg-accent/10 p-2 text-center"><div className="font-mono text-xs text-accent">{vertex}</div><div className="text-[9px] text-secondary">rank {rank}</div></div>)}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Preorder在enter时enqueue，postorder在所有out-neighbors完成后enqueue；DAG的reverse postorder让每条edge都从earlier指向later。
      </figcaption>
    </figure>
  );
}

export function Algs4TopologicalOrderLab() {
  const [cyclic, setCyclic] = useState(false);
  const graphEdges = useMemo(
    () => cyclic ? [...dagEdges, [6, 0] as const] : dagEdges,
    [cyclic],
  );
  const trace = useMemo(() => directedCycleTrace(graphEdges), [graphEdges]);
  const order = trace.cycle.length === 0 ? depthFirstOrder(graphEdges).reversePost : [];
  const rank = Object.fromEntries(order.map((vertex, index) => [vertex, index]));
  const validEdges = graphEdges.filter(([from, to]) => order.length > 0 && rank[from] < rank[to]).length;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={cyclic} onChange={(event) => setCyclic(event.target.checked)} />add dependency 6 to 0</label>
        <div className="mt-4"><DirectedGraphCanvas graphEdges={graphEdges} path={trace.cycle} /></div>
        {order.length > 0 ? <div className="mt-4 border border-success bg-success/10 p-3 text-xs text-success">topological order: {order.join(" → ")} · forward edges {validEdges}/{graphEdges.length}</div> : <div className="mt-4 border border-danger bg-danger/10 p-3 text-xs text-danger">no topological order · directed cycle {trace.cycle.join(" → ")}</div>}
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Digraph has a topological order iff it is a DAG；one directed cycle is a complete certificate that no linear precedence order exists。
      </figcaption>
    </figure>
  );
}

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

export function Algs4KosarajuSccLab() {
  const [phase, setPhase] = useState(1);
  const result = useMemo(() => kosarajuSharir(sccEdges), []);
  const processedComponents = Math.min(result.count, phase);
  const visible = new Set(result.componentOrders.slice(0, processedComponents).flat());
  const displayIds = result.ids.map((id, vertex) => visible.has(vertex) ? id : 3);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">second-pass components completed = {processedComponents}/{result.count}<input className="mt-2 w-full accent-current" type="range" min="0" max={result.count} value={phase} onChange={(event) => setPhase(Number(event.target.value))} /></label>
        <div className="mt-4"><DirectedGraphCanvas graphEdges={sccEdges} componentIds={displayIds} highlighted={[...visible]} /></div>
        <div className="mt-4 border border-warning bg-warning/10 p-3 text-xs text-secondary">reverse(G) reverse postorder: <span className="font-mono text-warning">{result.reverseOrder.join(" → ")}</span></div>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">{result.componentOrders.map((component, id) => <div key={id} className="border border-border bg-background p-3 text-xs text-secondary">SCC {id}<div className="mt-1 font-mono text-accent">{component.join(" ")}</div></div>)}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Kosaraju-Sharir先按reverse(G)的reverse postorder选roots，再在G中DFS；每次search恰好封闭一个strong component。
      </figcaption>
    </figure>
  );
}

export function Algs4KernelDagLab() {
  const result = useMemo(() => kosarajuSharir(sccEdges), []);
  const kernelEdges = [...new Set(sccEdges.map(([from, to]) => edgeKey(result.ids[from], result.ids[to])).filter((key) => {
    const [from, to] = key.split("->").map(Number);
    return from !== to;
  }))];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-5 lg:grid-cols-2">
          <div><div className="mb-2 text-center text-xs font-semibold text-secondary">original digraph</div><DirectedGraphCanvas graphEdges={sccEdges} componentIds={result.ids} /></div>
          <div className="border border-border bg-background p-4"><div className="text-xs font-semibold text-primary">kernel DAG after contraction</div><div className="mt-4 space-y-2">{result.componentOrders.map((component, id) => <div key={id} className="border border-accent/50 p-3 text-xs text-secondary">component {id}: <span className="font-mono text-accent">{component.join(" ")}</span></div>)}</div><div className="mt-4 border border-success bg-success/10 p-3 font-mono text-xs text-success">{kernelEdges.join(" · ") || "no cross edges"}</div></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Contract each SCC to one vertex and deduplicate cross edges；the kernel graph must be a DAG, otherwise its cycle would merge those components。
      </figcaption>
    </figure>
  );
}

export function Algs4TransitiveClosureLab() {
  const [source, setSource] = useState(2);
  const [target, setTarget] = useState(6);
  const adjacency = useMemo(() => buildAdjacency(8, cyclicEdges), []);
  const closure = useMemo(() => Array.from({ length: 8 }, (_, vertex) => new Set(reachableFrom([vertex], adjacency))), [adjacency]);
  const reachable = closure[source].has(target);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">v = {source}<input className="mt-2 w-full accent-current" type="range" min="0" max="7" value={source} onChange={(event) => setSource(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">w = {target}<input className="mt-2 w-full accent-current" type="range" min="0" max="7" value={target} onChange={(event) => setTarget(Number(event.target.value))} /></label></div>
        <div className="mt-5 grid grid-cols-8 gap-1 border border-border bg-background p-2">{closure.map((row, from) => Array.from({ length: 8 }, (_, to) => <div key={`${from}-${to}`} className={"aspect-square border p-1 text-center font-mono text-[9px] " + (row.has(to) ? "border-accent bg-accent/15 text-accent" : "border-border text-secondary")}>{from},{to}</div>))}</div>
        <div className={"mt-4 border p-3 text-xs " + (reachable ? "border-success bg-success/10 text-success" : "border-danger bg-danger/10 text-danger")}>reachable({source}, {target}) = {String(reachable)}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Transitive closure precomputes one DirectedDFS per source, usingTheta(V(V+E)) time andTheta(V squared) query table for constant-time reachability。
      </figcaption>
    </figure>
  );
}
