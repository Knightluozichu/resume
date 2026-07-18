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
const vertices = ["A", "B", "C", "D", "E", "F"];
const edges: Edge[] = [
  { u: "B", v: "C", w: 1 },
  { u: "A", v: "C", w: 2 },
  { u: "D", v: "E", w: 2 },
  { u: "E", v: "F", w: 3 },
  { u: "A", v: "B", w: 4 },
  { u: "B", v: "D", w: 5 },
  { u: "D", v: "F", w: 6 },
  { u: "C", v: "D", w: 8 },
  { u: "C", v: "E", w: 10 },
];

function edgeName(edge: Edge) {
  return `${edge.u}${edge.v}:${edge.w}`;
}

function kruskalTrace() {
  const parent = Object.fromEntries(vertices.map((vertex) => [vertex, vertex])) as Record<string, string>;
  const find = (vertex: string): string => parent[vertex] === vertex ? vertex : find(parent[vertex]);
  const accepted: Edge[] = [];
  return edges.map((edge) => {
    const different = find(edge.u) !== find(edge.v);
    if (different) {
      parent[find(edge.u)] = find(edge.v);
      accepted.push(edge);
    }
    return { edge, accepted: different, forest: [...accepted] };
  });
}

function primTrace(source: string) {
  const inTree = new Set<string>();
  const chosen: Edge[] = [];
  const stages: { vertex: string; edge?: Edge; tree: string[]; chosen: Edge[] }[] = [];
  inTree.add(source);
  stages.push({ vertex: source, tree: [...inTree], chosen: [] });
  while (inTree.size < vertices.length) {
    const crossing = edges.filter((edge) => inTree.has(edge.u) !== inTree.has(edge.v));
    crossing.sort((left, right) => left.w - right.w || edgeName(left).localeCompare(edgeName(right)));
    const edge = crossing[0];
    const vertex = inTree.has(edge.u) ? edge.v : edge.u;
    inTree.add(vertex);
    chosen.push(edge);
    stages.push({ vertex, edge, tree: [...inTree], chosen: [...chosen] });
  }
  return stages;
}

export function CLRS4MSTContractLab() {
  const [edgeCount, setEdgeCount] = useState(5);
  const [cycle, setCycle] = useState(false);
  const connected = edgeCount >= vertices.length - 1;
  const valid = connected && !cycle && edgeCount === vertices.length - 1;
  return (
    <Figure caption="A spanning tree connects every vertex, has no cycle, and therefore contains exactly |V|−1 edges; the MST minimizes weight among all such trees.">
      <div className="grid gap-3 sm:grid-cols-2"><label className="text-sm text-primary">selected edges = {edgeCount}<input className="mt-2 w-full accent-current" type="range" min="0" max="7" value={edgeCount} onChange={(event) => setEdgeCount(Number(event.target.value))} /></label><label className="flex items-center gap-3 text-sm text-primary"><input type="checkbox" checked={cycle} onChange={(event) => setCycle(event.target.checked)} />selection contains a cycle</label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="connected candidate" value={connected ? "yes" : "no"} /><Stat label="acyclic" value={cycle ? "no" : "yes"} tone={cycle ? "danger" : "success"} /><Stat label="spanning tree" value={valid ? "yes" : "no"} tone={valid ? "success" : "warning"} /></div>
    </Figure>
  );
}

export function CLRS4CutLightEdgeLab() {
  const [cut, setCut] = useState<"ABC" | "A" | "DEF">("ABC");
  const side = new Set(cut.split(""));
  const crossing = edges.filter((edge) => side.has(edge.u) !== side.has(edge.v)).sort((left, right) => left.w - right.w);
  return (
    <Figure caption="A cut partitions vertices into S and V−S; the minimum-weight crossing edge is light for that cut and is safe when the cut respects the current forest.">
      <label className="text-sm font-semibold text-primary">cut side S<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={cut} onChange={(event) => setCut(event.target.value as typeof cut)}><option value="ABC">A,B,C</option><option value="A">A</option><option value="DEF">D,E,F</option></select></label>
      <div className="mt-4 flex flex-wrap gap-2">{crossing.map((edge, index) => <div key={edgeName(edge)} className={`border px-3 py-2 font-mono text-xs ${index === 0 ? "border-success text-success" : "border-border text-secondary"}`}>{edgeName(edge)}</div>)}</div>
      <div className="mt-3 text-center text-sm text-primary">light edge: {edgeName(crossing[0])}</div>
    </Figure>
  );
}

export function CLRS4SafeEdgeExchangeLab() {
  const [exchanged, setExchanged] = useState(false);
  return (
    <Figure caption="If an MST T omits a light crossing edge, adding it creates one cycle; removing another crossing edge of no smaller weight yields an MST containing the safe edge.">
      <button type="button" className="border border-accent px-4 py-2 text-sm text-accent" onClick={() => setExchanged((value) => !value)}>{exchanged ? "restore original MST" : "exchange crossing edges"}</button>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="add light edge" value="e:5" tone="success" /><Stat label="cycle edge removed" value={exchanged ? "f:5" : "pending"} tone="warning" /><Stat label="weight change" value={exchanged ? "0" : "≤ 0"} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4GenericMSTInvariantLab() {
  const [stage, setStage] = useState(2);
  const trace = kruskalTrace().filter((item) => item.accepted);
  const selected = trace.slice(0, stage).map((item) => item.edge);
  return (
    <Figure caption="GENERIC-MST maintains a set A contained in some MST; each safe edge preserves this extendability invariant until A has |V|−1 edges.">
      <label className="text-sm font-semibold text-primary">safe edges accepted = {stage}<input className="mt-2 w-full accent-current" type="range" min="0" max="5" value={stage} onChange={(event) => setStage(Number(event.target.value))} /></label>
      <div className="mt-4 flex flex-wrap gap-2">{edges.map((edge) => <div key={edgeName(edge)} className={`border px-3 py-2 font-mono text-xs ${selected.includes(edge) ? "border-success text-success" : "border-border text-secondary"}`}>{edgeName(edge)}</div>)}</div>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="forest edges" value={stage.toString()} /><Stat label="extendable to an MST" value="yes" tone="success" /></div>
    </Figure>
  );
}

export function CLRS4KruskalSortLab() {
  const [index, setIndex] = useState(4);
  const trace = useMemo(() => kruskalTrace(), []);
  const current = trace[index];
  return (
    <Figure caption="Kruskal scans edges in nondecreasing weight and accepts an edge exactly when its endpoints are in different disjoint-set components.">
      <label className="text-sm font-semibold text-primary">sorted edge {index + 1} of {trace.length}<input className="mt-2 w-full accent-current" type="range" min="0" max={trace.length - 1} value={index} onChange={(event) => setIndex(Number(event.target.value))} /></label>
      <div className="mt-4 flex flex-wrap gap-2">{trace.map((item, position) => <div key={edgeName(item.edge)} className={`border px-3 py-2 font-mono text-xs ${position === index ? (item.accepted ? "border-success bg-success/10 text-success" : "border-danger bg-danger/10 text-danger") : position < index ? "border-secondary text-secondary" : "border-border text-secondary"}`}>{edgeName(item.edge)}</div>)}</div>
      <div className="mt-3 text-center text-sm text-primary">{edgeName(current.edge)}: {current.accepted ? "accept and UNION" : "reject cycle"}</div>
    </Figure>
  );
}

export function CLRS4KruskalForestLab() {
  const [processed, setProcessed] = useState(5);
  const trace = useMemo(() => kruskalTrace(), []);
  const accepted = trace.slice(0, processed).filter((item) => item.accepted).map((item) => item.edge);
  const weight = accepted.reduce((sum, edge) => sum + edge.w, 0);
  return (
    <Figure caption="Kruskal grows several components at once; accepted edges remain acyclic, and union-find supplies the exact component test.">
      <label className="text-sm font-semibold text-primary">edges processed = {processed}<input className="mt-2 w-full accent-current" type="range" min="0" max={trace.length} value={processed} onChange={(event) => setProcessed(Number(event.target.value))} /></label>
      <div className="mt-4 flex flex-wrap gap-2">{accepted.map((edge) => <div key={edgeName(edge)} className="border border-success px-3 py-2 font-mono text-success">{edgeName(edge)}</div>)}</div>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="forest edge count" value={accepted.length.toString()} /><Stat label="current weight" value={weight.toString()} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4PrimFrontierLab() {
  const [source, setSource] = useState("A");
  const trace = primTrace(source);
  const [stage, setStage] = useState(2);
  const current = trace[Math.min(stage, trace.length - 1)];
  return (
    <Figure caption="Prim keeps one growing tree; each extract-min vertex enters through the lightest edge crossing from the tree to the remaining vertices.">
      <div className="grid gap-3 sm:grid-cols-2"><label className="text-sm text-primary">start vertex<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={source} onChange={(event) => { setSource(event.target.value); setStage(0); }}>{vertices.map((vertex) => <option key={vertex}>{vertex}</option>)}</select></label><label className="text-sm text-primary">growth stage = {stage}<input className="mt-2 w-full accent-current" type="range" min="0" max="5" value={stage} onChange={(event) => setStage(Number(event.target.value))} /></label></div>
      <div className="mt-4 flex flex-wrap gap-2">{vertices.map((vertex) => <div key={vertex} className={`border p-3 font-mono ${current.tree.includes(vertex) ? "border-success text-success" : "border-border text-secondary"}`}>{vertex}</div>)}</div>
      <div className="mt-3 text-center text-sm text-primary">{current.edge ? `add ${edgeName(current.edge)} to reach ${current.vertex}` : `initialize root ${source}`}</div>
    </Figure>
  );
}

export function CLRS4PrimKeysLab() {
  const [vertex, setVertex] = useState("D");
  const rows: Record<string, [string, string, string]> = {
    B: ["1", "C", "best crossing edge CB"],
    C: ["2", "A", "best crossing edge AC"],
    D: ["5", "B", "best crossing edge BD"],
    E: ["10", "C", "later decreases through D"],
    F: ["∞", "NIL", "not adjacent to current tree yet"],
  };
  const row = rows[vertex];
  return (
    <Figure caption="For each vertex outside Prim's tree, key[v] is the lightest known crossing-edge weight and parent[v] identifies that edge.">
      <label className="text-sm font-semibold text-primary">outside vertex<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={vertex} onChange={(event) => setVertex(event.target.value)}>{Object.keys(rows).map((value) => <option key={value}>{value}</option>)}</select></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="key[v]" value={row[0]} tone="warning" /><Stat label="parent[v]" value={row[1]} /><Stat label="meaning" value={row[2]} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4MSTCompareLab() {
  const [algorithm, setAlgorithm] = useState<"kruskal" | "prim">("kruskal");
  const rows = {
    kruskal: ["global edge order", "disjoint-set forest", "O(E log E)"],
    prim: ["one tree frontier", "min-priority queue", "O(E log V) with binary heap"],
  }[algorithm];
  return (
    <Figure caption="Kruskal and Prim choose different respecting cuts but apply the same light-edge theorem; data structures determine their implementation costs.">
      <label className="text-sm font-semibold text-primary">algorithm<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={algorithm} onChange={(event) => setAlgorithm(event.target.value as typeof algorithm)}><option value="kruskal">Kruskal</option><option value="prim">Prim</option></select></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="growth pattern" value={rows[0]} /><Stat label="core structure" value={rows[1]} tone="warning" /><Stat label="bound" value={rows[2]} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4MSTCertificateLab() {
  const [issue, setIssue] = useState<"valid" | "directed" | "cycle" | "unsafe" | "weight">("valid");
  const checks = {
    "graph is undirected and connected": issue !== "directed",
    "selected edges remain acyclic": issue !== "cycle",
    "each edge is light for respecting cut": issue !== "unsafe",
    "final tree has V−1 edges and audited weight": issue !== "weight",
  };
  return (
    <Figure caption="An MST certificate checks graph contract, forest invariant, a respecting cut and light edge for every choice, and final connectivity plus total weight.">
      <label className="text-sm font-semibold text-primary">audit scenario<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={issue} onChange={(event) => setIssue(event.target.value as typeof issue)}><option value="valid">valid MST</option><option value="directed">directed input</option><option value="cycle">accepted cycle</option><option value="unsafe">nonlight crossing edge</option><option value="weight">wrong total weight</option></select></label>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{Object.entries(checks).map(([name, ok]) => <div key={name} className={`border p-3 text-center text-xs ${ok ? "border-success text-success" : "border-danger text-danger"}`}>{name}<div className="mt-1 font-mono">{ok ? "pass" : "fail"}</div></div>)}</div>
    </Figure>
  );
}
