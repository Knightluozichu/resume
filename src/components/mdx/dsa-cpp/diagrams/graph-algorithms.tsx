"use client";

import { useState } from "react";

const graphAdjacency = {
  A: [{ to: "B", weight: 2 }, { to: "C", weight: 5 }],
  B: [{ to: "C", weight: 1 }, { to: "D", weight: 4 }],
  C: [{ to: "D", weight: 1 }],
  D: [],
} as const;
type GraphNode = keyof typeof graphAdjacency;

export function DsaGraphDefinitionsLab() {
  const [node, setNode] = useState<GraphNode>("B");
  const outgoing = graphAdjacency[node];
  const incoming = (Object.keys(graphAdjacency) as GraphNode[]).flatMap((from) =>
    graphAdjacency[from].filter((edge) => edge.to === node).map((edge) => ({ from, weight: edge.weight })),
  );

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-4 gap-2">
          {(Object.keys(graphAdjacency) as GraphNode[]).map((candidate) => (
            <button key={candidate} type="button" onClick={() => setNode(candidate)} className={"aspect-square border font-mono text-sm font-semibold " + (node === candidate ? "border-accent bg-accent text-background" : "border-border bg-background text-primary")}>{candidate}</button>
          ))}
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <div className="border border-success bg-success/10 p-3 text-xs text-secondary">outgoing<div className="mt-1 font-mono text-success">{outgoing.length ? outgoing.map((edge) => `${node}->${edge.to}(${edge.weight})`).join(", ") : "none"}</div></div>
          <div className="border border-warning bg-warning/10 p-3 text-xs text-secondary">incoming<div className="mt-1 font-mono text-warning">{incoming.length ? incoming.map((edge) => `${edge.from}->${node}(${edge.weight})`).join(", ") : "none"}</div></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Directed weighted graph 中 adjacency、in-degree、out-degree 与 path direction 都有语义。</figcaption>
    </figure>
  );
}

const topoFrames = [
  { ready: ["parse"], output: [] },
  { ready: ["compile"], output: ["parse"] },
  { ready: ["test", "docs"], output: ["parse", "compile"] },
  { ready: ["deploy"], output: ["parse", "compile", "test", "docs"] },
  { ready: [], output: ["parse", "compile", "test", "docs", "deploy"] },
] as const;

export function DsaTopologicalSortLab() {
  const [step, setStep] = useState(0);
  const frame = topoFrames[step];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">Kahn step = {step}<input className="mt-2 w-full accent-current" type="range" min="0" max={topoFrames.length - 1} value={step} onChange={(event) => setStep(Number(event.target.value))} /></label>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <div className="border border-accent bg-accent/10 p-3 text-xs text-secondary">zero in-degree queue<div className="mt-1 font-mono text-accent">{frame.ready.join(", ") || "empty"}</div></div>
          <div className="border border-success bg-success/10 p-3 text-xs text-secondary">output prefix<div className="mt-1 font-mono text-success">{frame.output.join(" -> ") || "empty"}</div></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Topological sort 每次移除zero-in-degree vertex；输出不足V个说明存在directed cycle。</figcaption>
    </figure>
  );
}

type ShortestMode = "unweighted BFS" | "Dijkstra" | "negative edges";

export function DsaShortestPathLab() {
  const [mode, setMode] = useState<ShortestMode>("Dijkstra");
  const details = {
    "unweighted BFS": { precondition: "all edges equal cost", structure: "FIFO queue", result: "distance by edge count" },
    Dijkstra: { precondition: "all edge weights nonnegative", structure: "min-priority queue", result: "settled minimum distance" },
    "negative edges": { precondition: "no reachable negative cycle", structure: "repeated relaxation", result: "Bellman-Ford distances" },
  }[mode];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 gap-2">
          {(["unweighted BFS", "Dijkstra", "negative edges"] as ShortestMode[]).map((candidate) => (
            <button key={candidate} type="button" onClick={() => setMode(candidate)} className={"min-h-12 border px-1 text-[10px] font-semibold sm:text-xs " + (mode === candidate ? "border-accent bg-accent text-background" : "border-border bg-background text-primary")}>{candidate}</button>
          ))}
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          <div className="border border-warning bg-warning/10 p-3 text-xs text-secondary">precondition<div className="mt-1 font-mono text-warning">{details.precondition}</div></div>
          <div className="border border-border bg-background p-3 text-xs text-secondary">worklist<div className="mt-1 font-mono text-primary">{details.structure}</div></div>
          <div className="border border-success bg-success/10 p-3 text-xs text-secondary">meaning<div className="mt-1 font-mono text-success">{details.result}</div></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Shortest-path algorithm 由edge-weight assumptions选择；错误前提会让看似正常的distance静默出错。</figcaption>
    </figure>
  );
}

export function DsaResidualFlowLab() {
  const [flow, setFlow] = useState(3);
  const capacity = 8;
  const forwardResidual = capacity - flow;
  const backwardResidual = flow;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">flow on edge {"u->v"} = {flow} / {capacity}<input className="mt-2 w-full accent-current" type="range" min="0" max={capacity} value={flow} onChange={(event) => setFlow(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="border border-success bg-success/10 p-3 text-xs text-secondary">forward residual<div className="mt-1 font-mono text-success">{"u->v"}: {forwardResidual}</div></div>
          <div className="border border-warning bg-warning/10 p-3 text-xs text-secondary">reverse residual<div className="mt-1 font-mono text-warning">{"v->u"}: {backwardResidual}</div></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Residual reverse edge允许后续augmenting path撤销先前选择；它不是原graph中额外capacity。</figcaption>
    </figure>
  );
}

const mstEdges = [
  { edge: "A-B", weight: 1, accepted: true },
  { edge: "B-C", weight: 2, accepted: true },
  { edge: "A-C", weight: 3, accepted: false },
  { edge: "C-D", weight: 4, accepted: true },
  { edge: "B-D", weight: 5, accepted: false },
] as const;

export function DsaMinimumSpanningTreeLab() {
  const [step, setStep] = useState(2);
  const current = mstEdges[step];
  const acceptedWeight = mstEdges.slice(0, step + 1).filter((edge) => edge.accepted).reduce((sum, edge) => sum + edge.weight, 0);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-5 gap-1">
          {mstEdges.map((edge, index) => (
            <button key={edge.edge} type="button" onClick={() => setStep(index)} className={"min-h-12 border p-1 font-mono text-[10px] " + (step === index ? "border-accent bg-accent text-background" : "border-border bg-background text-primary")}>{edge.edge}<span className="block">w={edge.weight}</span></button>
          ))}
        </div>
        <div className={"mt-4 border p-3 text-center text-sm font-semibold " + (current.accepted ? "border-success bg-success/10 text-success" : "border-warning bg-warning/10 text-warning")}>{current.accepted ? "accept: joins components" : "reject: closes cycle"}; accepted weight = {acceptedWeight}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Kruskal按weight选择不成环edges；Prim则从一个tree边界选择最轻crossing edge。</figcaption>
    </figure>
  );
}

type DfsApplication = "SCC" | "articulation" | "Euler";

export function DsaDfsApplicationsLab() {
  const [application, setApplication] = useState<DfsApplication>("articulation");
  const details = {
    SCC: { state: "discovery + finish order / low link", output: "maximal mutual reachability components" },
    articulation: { state: "discovery time + low(v)", output: "vertex whose removal disconnects graph" },
    Euler: { state: "unused edge stack", output: "trail consuming each edge exactly once" },
  }[application];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 gap-2">
          {(["SCC", "articulation", "Euler"] as DfsApplication[]).map((candidate) => (
            <button key={candidate} type="button" onClick={() => setApplication(candidate)} className={"min-h-11 border text-xs font-semibold " + (application === candidate ? "border-accent bg-accent text-background" : "border-border bg-background text-primary")}>{candidate}</button>
          ))}
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <div className="border border-border bg-background p-3 text-xs text-secondary">tracked state<div className="mt-1 font-mono text-primary">{details.state}</div></div>
          <div className="border border-success bg-success/10 p-3 text-xs text-secondary">output<div className="mt-1 font-mono text-success">{details.output}</div></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">DFS recursion forest加discovery/finish/low-link信息，可推导connectivity与cycle structure。</figcaption>
    </figure>
  );
}

export function DsaNpCompletenessLab() {
  const [direction, setDirection] = useState<"known-to-new" | "new-to-known">("known-to-new");
  const valid = direction === "known-to-new";

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-2">
          <button type="button" onClick={() => setDirection("known-to-new")} className={"min-h-12 border px-2 text-xs font-semibold " + (valid ? "border-accent bg-accent text-background" : "border-border bg-background text-primary")}>{"known NP-complete -> new problem"}</button>
          <button type="button" onClick={() => setDirection("new-to-known")} className={"min-h-12 border px-2 text-xs font-semibold " + (!valid ? "border-accent bg-accent text-background" : "border-border bg-background text-primary")}>{"new problem -> known NP-complete"}</button>
        </div>
        <div className={"mt-4 border p-3 text-center text-sm font-semibold " + (valid ? "border-success bg-success/10 text-success" : "border-warning bg-warning/10 text-warning")}>{valid ? "supports hardness: solve new => solve known" : "wrong direction for proving new problem hard"}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">证明new problem NP-hard要把known-hard instance多项式归约到new problem，方向不能反。</figcaption>
    </figure>
  );
}
