"use client";

import { useMemo, useState } from "react";

type FlowEdge = {
  from: number;
  to: number;
  capacity: number;
  flow: number;
};

type ParentArc = {
  from: number;
  edgeIndex: number;
  direction: 1 | -1;
  residual: number;
};

type Augmentation = {
  path: number[];
  edgeIndices: number[];
  directions: (1 | -1)[];
  bottleneck: number;
  flows: number[];
};

const vertexNames = ["s", "a", "b", "c", "t"];
const baseEdges: FlowEdge[] = [
  { from: 0, to: 1, capacity: 10, flow: 0 },
  { from: 0, to: 2, capacity: 5, flow: 0 },
  { from: 1, to: 2, capacity: 15, flow: 0 },
  { from: 1, to: 3, capacity: 10, flow: 0 },
  { from: 2, to: 3, capacity: 10, flow: 0 },
  { from: 2, to: 4, capacity: 5, flow: 0 },
  { from: 3, to: 4, capacity: 10, flow: 0 },
];

function residualArcs(edges: FlowEdge[], vertex: number) {
  const arcs: { to: number; edgeIndex: number; direction: 1 | -1; residual: number }[] = [];
  edges.forEach((edge, edgeIndex) => {
    if (edge.from === vertex && edge.capacity - edge.flow > 1e-9) {
      arcs.push({ to: edge.to, edgeIndex, direction: 1, residual: edge.capacity - edge.flow });
    }
    if (edge.to === vertex && edge.flow > 1e-9) {
      arcs.push({ to: edge.from, edgeIndex, direction: -1, residual: edge.flow });
    }
  });
  return arcs;
}

function bfs(edges: FlowEdge[], source: number, sink: number) {
  const parent: (ParentArc | undefined)[] = Array.from({ length: vertexNames.length });
  const marked = Array.from({ length: vertexNames.length }, () => false);
  const queue = [source];
  marked[source] = true;
  while (queue.length > 0 && !marked[sink]) {
    const vertex = queue.shift();
    if (vertex === undefined) break;
    for (const arc of residualArcs(edges, vertex)) {
      if (marked[arc.to]) continue;
      marked[arc.to] = true;
      parent[arc.to] = { from: vertex, edgeIndex: arc.edgeIndex, direction: arc.direction, residual: arc.residual };
      queue.push(arc.to);
    }
  }
  return { parent, marked };
}

function solveMaxflow(initialEdges = baseEdges, source = 0, sink = 4) {
  const edges = initialEdges.map((edge) => ({ ...edge }));
  const augmentations: Augmentation[] = [];

  while (true) {
    const search = bfs(edges, source, sink);
    if (!search.marked[sink]) {
      return { edges, augmentations, cut: search.marked };
    }
    const reversedPath = [sink];
    const reversedEdges: number[] = [];
    const reversedDirections: (1 | -1)[] = [];
    let bottleneck = Number.POSITIVE_INFINITY;
    for (let vertex = sink; vertex !== source;) {
      const arc = search.parent[vertex];
      if (!arc) throw new Error("broken augmenting path");
      bottleneck = Math.min(bottleneck, arc.residual);
      reversedEdges.push(arc.edgeIndex);
      reversedDirections.push(arc.direction);
      vertex = arc.from;
      reversedPath.push(vertex);
    }
    const path = [...reversedPath].reverse();
    const edgeIndices = [...reversedEdges].reverse();
    const directions = [...reversedDirections].reverse();
    edgeIndices.forEach((edgeIndex, index) => {
      edges[edgeIndex].flow += directions[index] * bottleneck;
    });
    augmentations.push({
      path,
      edgeIndices,
      directions,
      bottleneck,
      flows: edges.map((edge) => edge.flow),
    });
  }
}

function flowValue(edges: FlowEdge[], source = 0) {
  return edges.reduce((value, edge) => {
    if (edge.from === source) return value + edge.flow;
    if (edge.to === source) return value - edge.flow;
    return value;
  }, 0);
}

function excess(edges: FlowEdge[], vertex: number) {
  return edges.reduce((value, edge) => {
    if (edge.to === vertex) return value + edge.flow;
    if (edge.from === vertex) return value - edge.flow;
    return value;
  }, 0);
}

function feasible(edges: FlowEdge[], source = 0, sink = 4) {
  const capacity = edges.every((edge) => edge.flow >= -1e-9 && edge.flow <= edge.capacity + 1e-9);
  const conservation = vertexNames.every((_, vertex) => vertex === source || vertex === sink || Math.abs(excess(edges, vertex)) < 1e-9);
  const balance = Math.abs(flowValue(edges, source) - excess(edges, sink)) < 1e-9;
  return { capacity, conservation, balance };
}

const solution = solveMaxflow();

function edgeLabel(edge: FlowEdge) {
  return `${vertexNames[edge.from]}→${vertexNames[edge.to]}`;
}

export function Algs4FlowNetworkMap() {
  const [step, setStep] = useState(solution.augmentations.length);
  const flows = step === 0 ? baseEdges.map(() => 0) : solution.augmentations[step - 1].flows;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">augmentation state = {step}<input className="mt-2 w-full accent-current" type="range" min="0" max={solution.augmentations.length} value={step} onChange={(event) => setStep(Number(event.target.value))} /></label>
        <div className="mt-4 flex items-center justify-between">{vertexNames.map((name, index) => <div key={name} className={"grid h-11 w-11 place-items-center rounded-full border-2 font-semibold " + (index === 0 ? "border-success text-success" : index === 4 ? "border-danger text-danger" : "border-accent text-accent")}>{name}</div>)}</div>
        <div className="mt-5 grid gap-2 sm:grid-cols-4">{baseEdges.map((edge, index) => <div key={edgeLabel(edge)} className={"border p-3 text-xs " + (flows[index] === edge.capacity ? "border-warning text-warning" : flows[index] > 0 ? "border-success text-success" : "border-border text-secondary")}><div className="font-mono">{edgeLabel(edge)}</div><div>{flows[index]} / {edge.capacity}</div></div>)}</div>
        <div className="mt-3 border border-accent p-3 text-sm text-accent">flow value = {flows[0] + flows[1]}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        A flow network stores directed capacity and mutable flow on each edge；source outflow is the current flow value.
      </figcaption>
    </figure>
  );
}

export function Algs4FlowFeasibilityLab() {
  const [mode, setMode] = useState<"feasible" | "over capacity" | "leak at b">("feasible");
  const edges = solution.edges.map((edge) => ({ ...edge }));
  if (mode === "over capacity") edges[0].flow = 12;
  if (mode === "leak at b") edges[4].flow -= 1;
  const checks = feasible(edges);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">candidate flow<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={mode} onChange={(event) => setMode(event.target.value as typeof mode)}><option>feasible</option><option>over capacity</option><option>leak at b</option></select></label>
        <div className="mt-4 grid grid-cols-3 gap-2">{Object.entries(checks).map(([name, accepted]) => <div key={name} className={"border p-3 text-center text-xs " + (accepted ? "border-success text-success" : "border-danger text-danger")}><div>{name}</div><div className="font-mono">{accepted ? "pass" : "fail"}</div></div>)}</div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-[10px] text-secondary">{[1, 2, 3].map((vertex) => <div key={vertex} className="border border-border p-2">excess({vertexNames[vertex]}) = {excess(edges, vertex)}</div>)}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Feasible s-t flow satisfies edge capacity bounds and zero net excess at every internal vertex.
      </figcaption>
    </figure>
  );
}

export function Algs4ResidualEdgeLab() {
  const [capacity, setCapacity] = useState(10);
  const [flow, setFlow] = useState(6);
  const boundedFlow = Math.min(flow, capacity);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-3 sm:grid-cols-2"><label className="text-xs text-secondary">capacity c = {capacity}<input className="mt-2 w-full accent-current" type="range" min="1" max="20" value={capacity} onChange={(event) => setCapacity(Number(event.target.value))} /></label><label className="text-xs text-secondary">flow f = {boundedFlow}<input className="mt-2 w-full accent-current" type="range" min="0" max={capacity} value={boundedFlow} onChange={(event) => setFlow(Number(event.target.value))} /></label></div>
        <div className="mt-4 grid grid-cols-2 gap-3"><div className="border border-success p-4 text-center"><div className="text-xs text-secondary">forward residual</div><div className="font-mono text-2xl text-success">c − f = {capacity - boundedFlow}</div></div><div className="border border-warning p-4 text-center"><div className="text-xs text-secondary">backward residual</div><div className="font-mono text-2xl text-warning">f = {boundedFlow}</div></div></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Forward residual adds unused capacity；backward residual can cancel existing flow and repair an earlier route choice.
      </figcaption>
    </figure>
  );
}

export function Algs4ResidualNetworkLab() {
  const [step, setStep] = useState(1);
  const flows = step === 0 ? baseEdges.map(() => 0) : solution.augmentations[Math.min(step, solution.augmentations.length) - 1].flows;
  const edges = baseEdges.map((edge, index) => ({ ...edge, flow: flows[index] }));
  const arcs = edges.flatMap((edge) => [
    { label: `${vertexNames[edge.from]}→${vertexNames[edge.to]}`, residual: edge.capacity - edge.flow, kind: "forward" },
    { label: `${vertexNames[edge.to]}→${vertexNames[edge.from]}`, residual: edge.flow, kind: "backward" },
  ]).filter((arc) => arc.residual > 0);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">after augmentation {step}<input className="mt-2 w-full accent-current" type="range" min="0" max={solution.augmentations.length} value={step} onChange={(event) => setStep(Number(event.target.value))} /></label>
        <div className="mt-4 grid gap-2 sm:grid-cols-4">{arcs.map((arc) => <div key={`${arc.label}-${arc.kind}`} className={"border p-3 text-xs " + (arc.kind === "forward" ? "border-success text-success" : "border-warning text-warning")}><div className="font-mono">{arc.label}</div><div>{arc.kind} · {arc.residual}</div></div>)}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Residual network contains every direction with positive residual capacity；BFS runs on these arcs, not just original edge directions.
      </figcaption>
    </figure>
  );
}

export function Algs4AugmentingPathLab() {
  const [step, setStep] = useState(0);
  const augmentation = solution.augmentations[step];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">augmenting path {step + 1} / {solution.augmentations.length}<input className="mt-2 w-full accent-current" type="range" min="0" max={solution.augmentations.length - 1} value={step} onChange={(event) => setStep(Number(event.target.value))} /></label>
        <div className="mt-4 flex flex-wrap items-center gap-2">{augmentation.path.map((vertex, index) => <div key={`${vertex}-${index}`} className="flex items-center gap-2"><div className="grid h-10 w-10 place-items-center rounded-full border-2 border-accent text-accent">{vertexNames[vertex]}</div>{index < augmentation.path.length - 1 ? <span className={augmentation.directions[index] === 1 ? "text-success" : "text-warning"}>{augmentation.directions[index] === 1 ? "forward →" : "cancel →"}</span> : null}</div>)}</div>
        <div className="mt-4 grid grid-cols-2 gap-3"><div className="border border-warning p-3 text-warning">bottleneck<div className="font-mono text-2xl">{augmentation.bottleneck}</div></div><div className="border border-success p-3 text-success">flow value after<div className="font-mono text-2xl">{augmentation.flows[0] + augmentation.flows[1]}</div></div></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Path bottleneck is the minimum residual capacity；augmenting by exactly that value saturates at least one residual arc.
      </figcaption>
    </figure>
  );
}

export function Algs4EdmondsKarpLab() {
  const [step, setStep] = useState(solution.augmentations.length);
  const completed = solution.augmentations.slice(0, step);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">completed BFS augmentations = {step}<input className="mt-2 w-full accent-current" type="range" min="0" max={solution.augmentations.length} value={step} onChange={(event) => setStep(Number(event.target.value))} /></label>
        <div className="mt-4 space-y-2">{solution.augmentations.map((augmentation, index) => <div key={index} className={"grid grid-cols-[3rem_1fr_6rem] border p-3 text-xs " + (index < step ? "border-success text-success" : "border-border text-secondary")}><span>#{index + 1}</span><span className="font-mono">{augmentation.path.map((vertex) => vertexNames[vertex]).join(" → ")}</span><span className="text-right">+{augmentation.bottleneck}</span></div>)}</div>
        <div className="mt-3 border border-accent p-3 text-sm text-accent">value = {completed.reduce((sum, augmentation) => sum + augmentation.bottleneck, 0)}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Edmonds–Karp repeatedly uses BFS shortest residual path；termination occurs when t is unreachable from s.
      </figcaption>
    </figure>
  );
}

export function Algs4MinCutLab() {
  const sourceSide = solution.cut.map((marked, vertex) => marked ? vertex : -1).filter((vertex) => vertex >= 0);
  const sinkSide = solution.cut.map((marked, vertex) => !marked ? vertex : -1).filter((vertex) => vertex >= 0);
  const crossing = solution.edges.filter((edge) => solution.cut[edge.from] && !solution.cut[edge.to]);
  const capacity = crossing.reduce((sum, edge) => sum + edge.capacity, 0);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-4"><div className="border border-success p-4"><div className="font-semibold text-success">S · residual reachable</div><div className="mt-3 flex gap-2">{sourceSide.map((vertex) => <div key={vertex} className="grid h-9 w-9 place-items-center rounded-full border border-success text-success">{vertexNames[vertex]}</div>)}</div></div><div className="border border-danger p-4"><div className="font-semibold text-danger">T · unreachable</div><div className="mt-3 flex gap-2">{sinkSide.map((vertex) => <div key={vertex} className="grid h-9 w-9 place-items-center rounded-full border border-danger text-danger">{vertexNames[vertex]}</div>)}</div></div></div>
        <div className="mt-4 flex flex-wrap gap-2">{crossing.map((edge) => <div key={edgeLabel(edge)} className="border border-warning p-3 font-mono text-xs text-warning">{edgeLabel(edge)} · cap {edge.capacity} · flow {edge.flow}</div>)}</div>
        <div className="mt-3 border border-accent p-3 text-sm text-accent">cut capacity = {capacity}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        After final BFS，marked vertices form source side S；every forward edge crossing S to T is saturated.
      </figcaption>
    </figure>
  );
}

export function Algs4MaxflowMincutLab() {
  const flow = flowValue(solution.edges);
  const cut = solution.edges.filter((edge) => solution.cut[edge.from] && !solution.cut[edge.to]).reduce((sum, edge) => sum + edge.capacity, 0);
  const allCrossingSaturated = solution.edges.filter((edge) => solution.cut[edge.from] && !solution.cut[edge.to]).every((edge) => edge.flow === edge.capacity);
  const noBackwardCrossingFlow = solution.edges.filter((edge) => !solution.cut[edge.from] && solution.cut[edge.to]).every((edge) => edge.flow === 0);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-[1fr_4rem_1fr] items-center gap-3"><div className="border border-success p-5 text-center"><div className="text-xs text-secondary">max flow value</div><div className="font-mono text-3xl text-success">{flow}</div></div><div className="text-center text-2xl text-primary">=</div><div className="border border-warning p-5 text-center"><div className="text-xs text-secondary">min cut capacity</div><div className="font-mono text-3xl text-warning">{cut}</div></div></div>
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs"><div className={"border p-3 " + (allCrossingSaturated ? "border-success text-success" : "border-danger text-danger")}>S→T saturated · {String(allCrossingSaturated)}</div><div className={"border p-3 " + (noBackwardCrossingFlow ? "border-success text-success" : "border-danger text-danger")}>T→S zero flow · {String(noBackwardCrossingFlow)}</div></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Feasible flow plus an equal-capacity s-t cut is an optimality certificate for both maximum flow and minimum cut.
      </figcaption>
    </figure>
  );
}

const matchingEdges = [
  ["L1", "R1"], ["L1", "R2"], ["L2", "R1"], ["L2", "R3"], ["L3", "R2"],
] as const;

function maximumMatching() {
  const rightMatch = new Map<string, string>();
  function augment(left: string, seen: Set<string>): boolean {
    for (const [candidateLeft, right] of matchingEdges) {
      if (candidateLeft !== left || seen.has(right)) continue;
      seen.add(right);
      const owner = rightMatch.get(right);
      if (!owner || augment(owner, seen)) {
        rightMatch.set(right, left);
        return true;
      }
    }
    return false;
  }
  for (const left of ["L1", "L2", "L3"]) augment(left, new Set());
  return [...rightMatch].map(([right, left]) => [left, right] as const);
}

export function Algs4BipartiteMatchingLab() {
  const [showMatching, setShowMatching] = useState(true);
  const matching = useMemo(() => maximumMatching(), []);
  const selected = new Set(matching.map(([left, right]) => `${left}-${right}`));

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="flex items-center gap-3 text-sm font-semibold text-primary"><input type="checkbox" checked={showMatching} onChange={(event) => setShowMatching(event.target.checked)} />show unit-flow matching</label>
        <div className="mt-4 grid grid-cols-2 gap-8"><div className="space-y-3">{["L1", "L2", "L3"].map((vertex) => <div key={vertex} className="border border-accent p-3 text-center text-accent">{vertex}</div>)}</div><div className="space-y-3">{["R1", "R2", "R3"].map((vertex) => <div key={vertex} className="border border-warning p-3 text-center text-warning">{vertex}</div>)}</div></div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">{matchingEdges.map(([left, right]) => <div key={`${left}-${right}`} className={"border p-2 text-center font-mono text-xs " + (showMatching && selected.has(`${left}-${right}`) ? "border-success bg-success/10 text-success" : "border-border text-secondary")}>{left} → {right}</div>)}</div>
        <div className="mt-3 border border-success p-3 text-sm text-success">matching size = {matching.length} = integral maxflow</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Source-to-left、allowed left-to-right、right-to-sink edges all get unit capacity；integral maxflow selects a bipartite matching.
      </figcaption>
    </figure>
  );
}

export function Algs4MaxflowCostLab() {
  const [vertices, setVertices] = useState(50);
  const [edges, setEdges] = useState(200);
  const bfsWork = vertices + edges;
  const augmentationBound = vertices * edges;
  const total = bfsWork * augmentationBound;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-3 sm:grid-cols-2"><label className="text-xs text-secondary">V = {vertices}<input className="mt-2 w-full accent-current" type="range" min="5" max="200" step="5" value={vertices} onChange={(event) => setVertices(Number(event.target.value))} /></label><label className="text-xs text-secondary">E = {edges}<input className="mt-2 w-full accent-current" type="range" min="10" max="1000" step="10" value={edges} onChange={(event) => setEdges(Number(event.target.value))} /></label></div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3"><div className="border border-accent p-3 text-accent">BFS scale<div className="font-mono">{bfsWork.toLocaleString()}</div></div><div className="border border-warning p-3 text-warning">augmentations bound<div className="font-mono">{augmentationBound.toLocaleString()}</div></div><div className="border border-danger p-3 text-danger">O(VE(E+V)) scale<div className="font-mono">{total.toLocaleString()}</div></div></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Official shortest-augmenting-path implementation uses BFS and documents O(VE(E+V))，equivalent to O(VE²) on typical connected graphs.
      </figcaption>
    </figure>
  );
}

type MaxflowCertificateMode = "valid" | "capacity violation" | "conservation leak" | "wrong cut";

export function Algs4MaxflowCertificateLab() {
  const [mode, setMode] = useState<MaxflowCertificateMode>("valid");
  const edges = solution.edges.map((edge) => ({ ...edge }));
  const cut = [...solution.cut];
  if (mode === "capacity violation") edges[0].flow = edges[0].capacity + 1;
  if (mode === "conservation leak") edges[4].flow -= 1;
  if (mode === "wrong cut") cut[3] = true;
  const checks = feasible(edges);
  const sourceSeparated = cut[0] && !cut[4];
  const cutCapacity = edges.filter((edge) => cut[edge.from] && !cut[edge.to]).reduce((sum, edge) => sum + edge.capacity, 0);
  const dualEquality = sourceSeparated && Math.abs(flowValue(edges) - cutCapacity) < 1e-9;
  const accepted = checks.capacity && checks.conservation && checks.balance && dualEquality;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">candidate certificate<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={mode} onChange={(event) => setMode(event.target.value as MaxflowCertificateMode)}><option>valid</option><option>capacity violation</option><option>conservation leak</option><option>wrong cut</option></select></label>
        <div className="mt-4 grid grid-cols-4 gap-2">{[["capacity", checks.capacity], ["conservation", checks.conservation], ["source/sink balance", checks.balance], ["flow = cut", dualEquality]].map(([name, valid]) => <div key={String(name)} className={"border p-2 text-center text-[10px] " + (valid ? "border-success text-success" : "border-danger text-danger")}><div>{name}</div><div className="font-mono">{valid ? "pass" : "fail"}</div></div>)}</div>
        <div className={"mt-3 border p-3 text-sm " + (accepted ? "border-success text-success" : "border-danger text-danger")}>{accepted ? "maxflow certificate accepted" : "maxflow certificate rejected"}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Optimality certificate combines primal feasibility with a separating cut whose capacity equals flow value.
      </figcaption>
    </figure>
  );
}
