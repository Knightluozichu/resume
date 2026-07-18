"use client";

import { useMemo, useState, type ReactNode } from "react";

function Panel({ children }: { children: ReactNode }) {
  return <div className="border border-border bg-elevated p-4 sm:p-5">{children}</div>;
}

function Figure({ children, caption }: { children: ReactNode; caption: string }) {
  return <figure className="mdx-figure not-prose mx-auto my-6"><Panel>{children}</Panel><figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption></figure>;
}

function Stat({ label, value, tone = "accent" }: { label: string; value: string; tone?: "accent" | "warning" | "success" | "danger" }) {
  const classes = { accent: "border-accent text-accent", warning: "border-warning text-warning", success: "border-success text-success", danger: "border-danger text-danger" }[tone];
  return <div className={`border p-3 text-center ${classes}`}><div className="text-xs">{label}</div><div className="mt-1 break-words font-mono text-sm">{value}</div></div>;
}

type Edge = { u: string; v: string; w: number };
const bfVertices = ["s", "t", "x", "y", "z"];
const bfEdges: Edge[] = [
  { u: "s", v: "t", w: 6 },
  { u: "s", v: "y", w: 7 },
  { u: "t", v: "x", w: 5 },
  { u: "t", v: "y", w: 8 },
  { u: "t", v: "z", w: -4 },
  { u: "x", v: "t", w: -2 },
  { u: "y", v: "x", w: -3 },
  { u: "y", v: "z", w: 9 },
  { u: "z", v: "s", w: 2 },
  { u: "z", v: "x", w: 7 },
];

function bellmanFordPasses(passCount: number, edges = bfEdges) {
  const distance = Object.fromEntries(bfVertices.map((vertex) => [vertex, Infinity])) as Record<string, number>;
  distance.s = 0;
  for (let pass = 0; pass < passCount; pass += 1) {
    for (const edge of edges) {
      if (Number.isFinite(distance[edge.u]) && distance[edge.v] > distance[edge.u] + edge.w)
        distance[edge.v] = distance[edge.u] + edge.w;
    }
  }
  return distance;
}

export function CLRS4ShortestPathContractLab() {
  const [kind, setKind] = useState<"reachable" | "unreachable" | "negative-cycle">("reachable");
  const rows = {
    reachable: ["finite δ(s,v)", "minimum path weight", "predecessor path exists"],
    unreachable: ["infinity", "no directed path from s", "parent remains NIL"],
    "negative-cycle": ["negative infinity", "arbitrarily low walk weight", "no finite shortest path"],
  }[kind];
  return (
    <Figure caption="A shortest-path contract distinguishes finite reachable distance, unreachable infinity, and vertices affected by a reachable negative-weight cycle.">
      <label className="text-sm font-semibold text-primary">vertex status<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={kind} onChange={(event) => setKind(event.target.value as typeof kind)}><option value="reachable">reachable</option><option value="unreachable">unreachable</option><option value="negative-cycle">reachable negative cycle</option></select></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="distance meaning" value={rows[0]} tone={kind === "negative-cycle" ? "danger" : "success"} /><Stat label="contract" value={rows[1]} tone="warning" /><Stat label="witness" value={rows[2]} /></div>
    </Figure>
  );
}

export function CLRS4RelaxEdgeLab() {
  const [du, setDu] = useState(4);
  const [weight, setWeight] = useState(-2);
  const [dv, setDv] = useState(7);
  const candidate = du + weight;
  const changed = candidate < dv;
  return (
    <Figure caption="RELAX tests whether the path to u followed by edge (u,v) improves the current upper bound for v; only then do distance and parent change.">
      <div className="grid grid-cols-3 gap-3"><label className="text-xs text-primary">d[u] = {du}<input className="mt-2 w-full accent-current" type="range" min="-5" max="12" value={du} onChange={(event) => setDu(Number(event.target.value))} /></label><label className="text-xs text-primary">w(u,v) = {weight}<input className="mt-2 w-full accent-current" type="range" min="-8" max="10" value={weight} onChange={(event) => setWeight(Number(event.target.value))} /></label><label className="text-xs text-primary">d[v] = {dv}<input className="mt-2 w-full accent-current" type="range" min="-5" max="20" value={dv} onChange={(event) => setDv(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="candidate" value={candidate.toString()} /><Stat label="RELAX updates" value={changed ? "yes" : "no"} tone={changed ? "success" : "warning"} /><Stat label="new d[v]" value={Math.min(dv, candidate).toString()} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4BellmanFordPassLab() {
  const [passes, setPasses] = useState(1);
  const distance = bellmanFordPasses(passes);
  return (
    <Figure caption="After i complete Bellman-Ford passes, every shortest path using at most i edges has had its edges relaxed in order; |V|−1 passes cover every simple shortest path.">
      <label className="text-sm font-semibold text-primary">completed passes = {passes}<input className="mt-2 w-full accent-current" type="range" min="0" max="4" value={passes} onChange={(event) => setPasses(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-5 gap-2">{bfVertices.map((vertex) => <Stat key={vertex} label={`d[${vertex}]`} value={Number.isFinite(distance[vertex]) ? distance[vertex].toString() : "∞"} tone={vertex === "s" ? "accent" : "success"} />)}</div>
    </Figure>
  );
}

export function CLRS4NegativeCycleLab() {
  const [cycle, setCycle] = useState(false);
  const graphEdges = cycle ? [...bfEdges, { u: "x", v: "y", w: -5 }] : bfEdges;
  const before = bellmanFordPasses(bfVertices.length - 1, graphEdges);
  const improvable = graphEdges.filter((edge) => Number.isFinite(before[edge.u]) && before[edge.v] > before[edge.u] + edge.w);
  return (
    <Figure caption="A fifth scan after |V|−1 passes detects a reachable negative cycle exactly when some edge can still lower a distance upper bound.">
      <label className="flex items-center gap-3 text-sm font-semibold text-primary"><input type="checkbox" checked={cycle} onChange={(event) => setCycle(event.target.checked)} />add edge x → y of weight −5</label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="extra scan" value={improvable.length ? "improvement found" : "stable"} tone={improvable.length ? "danger" : "success"} /><Stat label="witness edge" value={improvable[0] ? `${improvable[0].u}→${improvable[0].v}` : "none"} /><Stat label="finite solution" value={improvable.length ? "no" : "yes"} tone={improvable.length ? "danger" : "success"} /></div>
    </Figure>
  );
}

const dagOrder = ["r", "s", "t", "x", "y", "z"];

export function CLRS4DAGRelaxOrderLab() {
  const [stage, setStage] = useState(2);
  return (
    <Figure caption="In a DAG, topological order guarantees that every edge entering u has been processed before u's outgoing edges, so one pass is enough even with negative weights.">
      <label className="text-sm font-semibold text-primary">vertices processed = {stage + 1}<input className="mt-2 w-full accent-current" type="range" min="0" max="5" value={stage} onChange={(event) => setStage(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-6 gap-2">{dagOrder.map((vertex, index) => <div key={vertex} className={`border p-3 text-center font-mono ${index <= stage ? "border-success text-success" : "border-border text-secondary"}`}>{vertex}<div className="mt-1 text-[10px]">{index <= stage ? "outgoing relaxed" : "pending"}</div></div>)}</div>
    </Figure>
  );
}

type DijkstraEdge = Edge;
const dijkstraEdges: DijkstraEdge[] = [
  { u: "A", v: "B", w: 4 },
  { u: "A", v: "C", w: 1 },
  { u: "C", v: "B", w: 2 },
  { u: "B", v: "D", w: 1 },
  { u: "C", v: "D", w: 5 },
  { u: "D", v: "E", w: 3 },
  { u: "B", v: "E", w: 7 },
];
const dijkstraVertices = ["A", "B", "C", "D", "E"];

function dijkstraTrace() {
  const distance = Object.fromEntries(dijkstraVertices.map((vertex) => [vertex, Infinity])) as Record<string, number>;
  const parent = Object.fromEntries(dijkstraVertices.map((vertex) => [vertex, "NIL"])) as Record<string, string>;
  const settled = new Set<string>();
  const stages: { vertex: string; distance: Record<string, number>; settled: string[]; parent: Record<string, string> }[] = [];
  distance.A = 0;
  while (settled.size < dijkstraVertices.length) {
    const vertex = dijkstraVertices.filter((item) => !settled.has(item)).sort((left, right) => distance[left] - distance[right])[0];
    settled.add(vertex);
    for (const edge of dijkstraEdges.filter((item) => item.u === vertex)) {
      if (distance[edge.v] > distance[vertex] + edge.w) {
        distance[edge.v] = distance[vertex] + edge.w;
        parent[edge.v] = vertex;
      }
    }
    stages.push({ vertex, distance: { ...distance }, settled: [...settled], parent: { ...parent } });
  }
  return stages;
}

export function CLRS4DijkstraFrontierLab() {
  const trace = useMemo(() => dijkstraTrace(), []);
  const [stage, setStage] = useState(1);
  const current = trace[stage];
  return (
    <Figure caption="Dijkstra extracts the minimum upper-bound vertex and permanently settles it; nonnegative outgoing edges prevent any later path from improving that distance.">
      <label className="text-sm font-semibold text-primary">extract-min step {stage + 1}<input className="mt-2 w-full accent-current" type="range" min="0" max={trace.length - 1} value={stage} onChange={(event) => setStage(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-5 gap-2">{dijkstraVertices.map((vertex) => <Stat key={vertex} label={current.settled.includes(vertex) ? `${vertex} settled` : vertex} value={Number.isFinite(current.distance[vertex]) ? current.distance[vertex].toString() : "∞"} tone={current.settled.includes(vertex) ? "success" : "warning"} />)}</div>
      <div className="mt-3 text-center text-sm text-primary">extracted {current.vertex}</div>
    </Figure>
  );
}

export function CLRS4DijkstraHeapLab() {
  const [operation, setOperation] = useState<"extract" | "decrease">("decrease");
  const rows = {
    extract: ["EXTRACT-MIN", "settle smallest d vertex", "V times"],
    decrease: ["DECREASE-KEY", "successful RELAX lowers d[v]", "at most E times"],
  }[operation];
  return (
    <Figure caption="Dijkstra's heap stores unsettled vertices keyed by distance upper bounds; complexity follows V extract-min and at most E decrease-key operations.">
      <label className="text-sm font-semibold text-primary">heap operation<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={operation} onChange={(event) => setOperation(event.target.value as typeof operation)}><option value="extract">extract min</option><option value="decrease">decrease key</option></select></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="operation" value={rows[0]} /><Stat label="meaning" value={rows[1]} tone="warning" /><Stat label="count" value={rows[2]} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4DifferenceConstraintLab() {
  const [constraint, setConstraint] = useState<"12" | "23" | "31">("12");
  const rows = {
    "12": ["x₂ − x₁ ≤ 4", "v₁ → v₂", "weight 4"],
    "23": ["x₃ − x₂ ≤ −2", "v₂ → v₃", "weight −2"],
    "31": ["x₁ − x₃ ≤ 1", "v₃ → v₁", "weight 1"],
  }[constraint];
  return (
    <Figure caption="Each difference constraint x_j−x_i≤b becomes directed edge v_i→v_j of weight b; shortest-path triangle inequalities satisfy all constraints.">
      <label className="text-sm font-semibold text-primary">constraint<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={constraint} onChange={(event) => setConstraint(event.target.value as typeof constraint)}><option value="12">x2 − x1</option><option value="23">x3 − x2</option><option value="31">x1 − x3</option></select></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="inequality" value={rows[0]} /><Stat label="constraint edge" value={rows[1]} tone="warning" /><Stat label="edge weight" value={rows[2]} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4ConstraintFeasibilityLab() {
  const [infeasible, setInfeasible] = useState(false);
  const total = infeasible ? -2 : 3;
  return (
    <Figure caption="The constraint system is feasible exactly when its graph has no negative-weight cycle; summing inequalities around a negative cycle produces an impossible 0≤negative value.">
      <label className="flex items-center gap-3 text-sm font-semibold text-primary"><input type="checkbox" checked={infeasible} onChange={(event) => setInfeasible(event.target.checked)} />tighten one bound to create a negative cycle</label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="cycle weight" value={total.toString()} tone={total < 0 ? "danger" : "success"} /><Stat label="Bellman-Ford" value={total < 0 ? "detects cycle" : "returns distances"} /><Stat label="feasible" value={total < 0 ? "no" : "yes"} tone={total < 0 ? "danger" : "success"} /></div>
    </Figure>
  );
}

export function CLRS4ShortestPathPropertiesLab() {
  const [property, setProperty] = useState<"triangle" | "upper" | "convergence" | "path">("triangle");
  const rows = {
    triangle: ["triangle inequality", "δ(s,v) ≤ δ(s,u)+w(u,v)", "true shortest distances"],
    upper: ["upper-bound property", "d[v] never drops below δ(s,v)", "all RELAX sequences"],
    convergence: ["convergence", "if d[u]=δ(s,u), relaxing (u,v) fixes v on shortest path", "correct order"],
    path: ["path-relaxation", "relax shortest-path edges in order", "interleaving other edges is harmless"],
  }[property];
  return (
    <Figure caption="Shortest-path proofs reuse a small property set: triangle inequality, upper bounds, convergence, and ordered relaxation along a shortest path.">
      <label className="text-sm font-semibold text-primary">proof property<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={property} onChange={(event) => setProperty(event.target.value as typeof property)}><option value="triangle">triangle</option><option value="upper">upper bound</option><option value="convergence">convergence</option><option value="path">path relaxation</option></select></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="property" value={rows[0]} /><Stat label="claim" value={rows[1]} tone="warning" /><Stat label="scope" value={rows[2]} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4PredecessorGraphLab() {
  const [issue, setIssue] = useState<"valid" | "cycle" | "wrong-edge">("valid");
  return (
    <Figure caption="When final distances are finite and correct, predecessor edges form a rooted shortest-path tree over reachable vertices; cycles or absent input edges invalidate the witness.">
      <label className="text-sm font-semibold text-primary">predecessor witness<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={issue} onChange={(event) => setIssue(event.target.value as typeof issue)}><option value="valid">valid tree</option><option value="cycle">parent cycle</option><option value="wrong-edge">parent edge absent</option></select></label>
      <div className="mt-4 flex flex-wrap justify-center gap-2">{["A", "C", "B", "D", "E"].map((vertex, index) => <div key={vertex} className={`border p-3 font-mono ${issue !== "valid" && index > 2 ? "border-danger text-danger" : "border-success text-success"}`}>{index ? "← " : ""}{vertex}</div>)}</div>
      <div className="mt-3 text-center text-sm text-secondary">{issue === "valid" ? "each parent edge is tight: d[v] = d[parent] + w" : issue === "cycle" ? "following parents never reaches source" : "witness references a nonexistent graph edge"}</div>
    </Figure>
  );
}

export function CLRS4ShortestPathCertificateLab() {
  const [issue, setIssue] = useState<"valid" | "source" | "upper" | "negative" | "parent">("valid");
  const checks = {
    "source initialized to zero": issue !== "source",
    "all edges satisfy upper-bound inequality": issue !== "upper",
    "algorithm precondition on weights holds": issue !== "negative",
    "parent edges reconstruct tight paths": issue !== "parent",
  };
  return (
    <Figure caption="A shortest-path certificate checks source initialization, edge inequalities, algorithm-specific weight preconditions, negative-cycle status, and tight predecessor paths.">
      <label className="text-sm font-semibold text-primary">audit scenario<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={issue} onChange={(event) => setIssue(event.target.value as typeof issue)}><option value="valid">valid result</option><option value="source">bad source distance</option><option value="upper">relaxable edge remains</option><option value="negative">Dijkstra with negative edge</option><option value="parent">broken parent path</option></select></label>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{Object.entries(checks).map(([name, ok]) => <div key={name} className={`border p-3 text-center text-xs ${ok ? "border-success text-success" : "border-danger text-danger"}`}>{name}<div className="mt-1 font-mono">{ok ? "pass" : "fail"}</div></div>)}</div>
    </Figure>
  );
}
