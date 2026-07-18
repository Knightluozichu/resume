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

function SetBox({ label, values, tone = "accent" }: { label: string; values: string[]; tone?: "accent" | "success" | "warning" }) {
  const border = { accent: "border-accent text-accent", success: "border-success text-success", warning: "border-warning text-warning" }[tone];
  return <div className={`border p-3 ${border}`}><div className="text-xs">{label}</div><div className="mt-2 flex flex-wrap gap-1">{values.map((value) => <span key={value} className="border border-current px-2 py-1 font-mono text-xs">{value}</span>)}</div></div>;
}

const vertices = ["A", "B", "C", "D", "E", "F"];
const adjacency: Record<string, string[]> = {
  A: ["B", "C"],
  B: ["A", "D"],
  C: ["A", "D", "F"],
  D: ["B", "C", "E"],
  E: ["D", "F"],
  F: ["C", "E"],
};

function bfs(source: string) {
  const distance = Object.fromEntries(vertices.map((vertex) => [vertex, Infinity])) as Record<string, number>;
  const parent = Object.fromEntries(vertices.map((vertex) => [vertex, "NIL"])) as Record<string, string>;
  const queue = [source];
  distance[source] = 0;
  for (let head = 0; head < queue.length; head += 1) {
    const current = queue[head];
    for (const next of adjacency[current]) {
      if (!Number.isFinite(distance[next])) {
        distance[next] = distance[current] + 1;
        parent[next] = current;
        queue.push(next);
      }
    }
  }
  return { distance, parent, order: queue };
}

export function CLRS4GraphRepresentationLab() {
  const [mode, setMode] = useState<"list" | "matrix">("list");
  return (
    <Figure caption="Adjacency lists enumerate actual neighbors in Θ(V+E) space, while an adjacency matrix answers edge membership in constant time using Θ(V²) space.">
      <label className="text-sm font-semibold text-primary">representation<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={mode} onChange={(event) => setMode(event.target.value as typeof mode)}><option value="list">adjacency list</option><option value="matrix">adjacency matrix</option></select></label>
      {mode === "list" ? <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">{vertices.map((vertex) => <div key={vertex} className="border border-border p-3 font-mono text-sm"><span className="text-accent">{vertex}</span> → {adjacency[vertex].join(", ")}</div>)}</div> : <div className="mt-4 grid grid-cols-7 gap-1 text-center font-mono text-xs"><div />{vertices.map((vertex) => <div key={vertex} className="p-2 text-accent">{vertex}</div>)}{vertices.flatMap((row) => [<div key={`${row}-head`} className="p-2 text-accent">{row}</div>, ...vertices.map((col) => <div key={`${row}-${col}`} className={`border p-2 ${adjacency[row].includes(col) ? "border-success text-success" : "border-border text-secondary"}`}>{adjacency[row].includes(col) ? "1" : "0"}</div>)])}</div>}
    </Figure>
  );
}

export function CLRS4GraphStorageLab() {
  const [vertexCount, setVertexCount] = useState(100);
  const [edgeCount, setEdgeCount] = useState(250);
  const possible = vertexCount * vertexCount;
  const storedEdges = Math.min(edgeCount, possible);
  return (
    <Figure caption="Representation choice follows graph density and operations: sparse graphs avoid V² empty cells, while dense graphs may benefit from matrix membership tests.">
      <div className="grid gap-3 sm:grid-cols-2"><label className="text-sm text-primary">vertices = {vertexCount}<input className="mt-2 w-full accent-current" type="range" min="10" max="500" step="10" value={vertexCount} onChange={(event) => setVertexCount(Number(event.target.value))} /></label><label className="text-sm text-primary">directed edges = {edgeCount}<input className="mt-2 w-full accent-current" type="range" min="10" max="2000" step="10" value={edgeCount} onChange={(event) => setEdgeCount(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="list cells" value={(vertexCount + storedEdges).toLocaleString()} tone="success" /><Stat label="matrix cells" value={possible.toLocaleString()} tone="warning" /><Stat label="density" value={`${(storedEdges / possible * 100).toFixed(2)}%`} /></div>
    </Figure>
  );
}

export function CLRS4BFSFrontierLab() {
  const [layer, setLayer] = useState(1);
  const result = useMemo(() => bfs("A"), []);
  const layers = [0, 1, 2, 3].map((distance) => vertices.filter((vertex) => result.distance[vertex] === distance));
  return (
    <Figure caption="BFS processes a FIFO frontier by nondecreasing distance; when a white vertex is discovered, its distance and parent become final.">
      <label className="text-sm font-semibold text-primary">visible layers through distance {layer}<input className="mt-2 w-full accent-current" type="range" min="0" max="3" value={layer} onChange={(event) => setLayer(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-4 gap-2">{layers.map((nodes, index) => <div key={index} className={`border p-3 text-center ${index <= layer ? "border-success text-success" : "border-border text-secondary"}`}><div className="text-xs">distance {index}</div><div className="mt-2 font-mono">{index <= layer ? nodes.join(" ") || "—" : "?"}</div></div>)}</div>
      <div className="mt-3 text-center text-sm text-secondary">dequeue order: {result.order.join(" → ")}</div>
    </Figure>
  );
}

export function CLRS4BFSShortestPathLab() {
  const [source, setSource] = useState("A");
  const [target, setTarget] = useState("E");
  const result = bfs(source);
  const path: string[] = [];
  for (let node = target; node !== "NIL"; node = result.parent[node]) {
    path.push(node);
    if (node === source) break;
  }
  path.reverse();
  return (
    <Figure caption="Parent pointers reconstruct a shortest unweighted path because the first discovery of each vertex occurs through the earliest possible BFS layer.">
      <div className="grid gap-3 sm:grid-cols-2"><label className="text-sm text-primary">source<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={source} onChange={(event) => setSource(event.target.value)}>{vertices.map((vertex) => <option key={vertex}>{vertex}</option>)}</select></label><label className="text-sm text-primary">target<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={target} onChange={(event) => setTarget(event.target.value)}>{vertices.map((vertex) => <option key={vertex}>{vertex}</option>)}</select></label></div>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="distance" value={result.distance[target].toString()} tone="success" /><Stat label="parent path" value={path.join(" → ")} /></div>
    </Figure>
  );
}

const timestamps: Record<string, [number, number]> = {
  A: [1, 12],
  B: [2, 7],
  D: [3, 6],
  E: [4, 5],
  C: [8, 11],
  F: [9, 10],
};

export function CLRS4DFSTimestampsLab() {
  const [node, setNode] = useState("B");
  const [discover, finish] = timestamps[node];
  const descendants = vertices.filter((vertex) => timestamps[vertex][0] > discover && timestamps[vertex][1] < finish);
  return (
    <Figure caption="DFS discovery and finish intervals are nested for ancestor relationships and disjoint for separate DFS subtrees.">
      <label className="text-sm font-semibold text-primary">inspect vertex<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={node} onChange={(event) => setNode(event.target.value)}>{vertices.map((vertex) => <option key={vertex}>{vertex}</option>)}</select></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="discover time" value={discover.toString()} /><Stat label="finish time" value={finish.toString()} tone="warning" /><Stat label="descendants" value={descendants.join(", ") || "none"} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4DFSEdgeClassLab() {
  const [kind, setKind] = useState<"tree" | "back" | "forward" | "cross">("back");
  const rows = {
    tree: ["u discovers white v", "v becomes a DFS child", "nested intervals"],
    back: ["v is gray ancestor of u", "edge returns to active stack", "directed cycle certificate"],
    forward: ["v is black descendant of u", "nontree ancestor-to-descendant edge", "nested intervals"],
    cross: ["v is finished outside u subtree", "edge crosses subtrees", "disjoint intervals"],
  }[kind];
  return (
    <Figure caption="DFS classifies directed edges by target color and timestamp relationship; a back edge is exactly the signal needed for directed cycle detection.">
      <label className="text-sm font-semibold text-primary">edge type<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={kind} onChange={(event) => setKind(event.target.value as typeof kind)}><option value="tree">tree</option><option value="back">back</option><option value="forward">forward</option><option value="cross">cross</option></select></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="observation" value={rows[0]} /><Stat label="meaning" value={rows[1]} tone="warning" /><Stat label="use" value={rows[2]} tone={kind === "back" ? "danger" : "success"} /></div>
    </Figure>
  );
}

const dagOrder = ["A", "C", "B", "D", "F", "E"];

export function CLRS4TopologicalOrderLab() {
  const [valid, setValid] = useState(true);
  const order = valid ? dagOrder : ["D", "A", "C", "B", "F", "E"];
  const position = Object.fromEntries(order.map((vertex, index) => [vertex, index]));
  const directedEdges = [["A", "B"], ["A", "C"], ["B", "D"], ["C", "D"], ["C", "F"], ["D", "E"], ["F", "E"]];
  const violations = directedEdges.filter(([from, to]) => position[from] >= position[to]);
  return (
    <Figure caption="A topological order places every directed edge from an earlier vertex to a later one; reverse DFS finish order produces such an order exactly for a DAG.">
      <label className="flex items-center gap-3 text-sm font-semibold text-primary"><input type="checkbox" checked={valid} onChange={(event) => setValid(event.target.checked)} />use reverse DFS finish order</label>
      <div className="mt-4 flex flex-wrap gap-2">{order.map((vertex, index) => <div key={vertex} className={`border p-3 font-mono ${violations.some((edge) => edge.includes(vertex)) ? "border-danger text-danger" : "border-success text-success"}`}>{index + 1}. {vertex}</div>)}</div>
      <div className="mt-3 text-center text-sm text-secondary">{violations.length ? `violations: ${violations.map((edge) => edge.join("→")).join(", ")}` : "all edges point forward"}</div>
    </Figure>
  );
}

export function CLRS4DAGCycleLab() {
  const [cycle, setCycle] = useState(false);
  return (
    <Figure caption="A directed graph is acyclic if and only if DFS finds no back edge; adding E→A closes a cycle through the active ancestor chain.">
      <label className="flex items-center gap-3 text-sm font-semibold text-primary"><input type="checkbox" checked={cycle} onChange={(event) => setCycle(event.target.checked)} />add edge E → A</label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="new edge" value={cycle ? "E → A" : "none"} /><Stat label="DFS classification" value={cycle ? "back edge" : "no back edge"} tone={cycle ? "danger" : "success"} /><Stat label="topological order" value={cycle ? "impossible" : "exists"} tone={cycle ? "danger" : "success"} /></div>
    </Figure>
  );
}

const sccGroups = [["A", "B"], ["C", "D", "E"], ["F"]];

export function CLRS4SCCPassLab() {
  const [pass, setPass] = useState<"first" | "transpose">("first");
  return (
    <Figure caption="Kosaraju first records finish order in G, then explores G transpose in decreasing finish order; each second-pass DFS tree is one SCC.">
      <label className="text-sm font-semibold text-primary">DFS pass<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={pass} onChange={(event) => setPass(event.target.value as typeof pass)}><option value="first">first pass on G</option><option value="transpose">second pass on transpose</option></select></label>
      {pass === "first" ? <div className="mt-4 grid grid-cols-6 gap-2">{["F", "E", "D", "C", "B", "A"].map((vertex, index) => <div key={vertex} className="border border-warning p-3 text-center font-mono text-warning">{vertex}<div className="text-[10px]">finish {index + 1}</div></div>)}</div> : <div className="mt-4 grid grid-cols-3 gap-3">{sccGroups.map((group, index) => <SetBox key={group.join("")} label={`SCC ${index + 1}`} values={group} tone="success" />)}</div>}
    </Figure>
  );
}

export function CLRS4CondensationLab() {
  const [showOriginal, setShowOriginal] = useState(false);
  return (
    <Figure caption="Contracting each strongly connected component yields a condensation graph that is always a DAG; a cycle among components would imply they were one SCC.">
      <label className="flex items-center gap-3 text-sm font-semibold text-primary"><input type="checkbox" checked={showOriginal} onChange={(event) => setShowOriginal(event.target.checked)} />show vertices inside components</label>
      <div className="mt-4 flex items-center justify-center gap-3">{sccGroups.map((group, index) => <div key={group.join("")} className="flex items-center gap-3"><SetBox label={`C${index + 1}`} values={showOriginal ? group : [`${group.length} vertices`]} tone="success" />{index < sccGroups.length - 1 && <span className="text-accent">→</span>}</div>)}</div>
    </Figure>
  );
}

export function CLRS4GraphCertificateLab() {
  const [issue, setIssue] = useState<"valid" | "representation" | "queue" | "timestamps" | "transpose">("valid");
  const checks = {
    "representation matches directedness": issue !== "representation",
    "BFS discovers each vertex once": issue !== "queue",
    "DFS timestamps nest or separate": issue !== "timestamps",
    "SCC second pass uses transpose": issue !== "transpose",
  };
  return (
    <Figure caption="A graph-algorithm certificate checks representation semantics, one-time discovery, DFS interval invariants, edge direction, and the exact transpose pass.">
      <label className="text-sm font-semibold text-primary">audit scenario<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={issue} onChange={(event) => setIssue(event.target.value as typeof issue)}><option value="valid">valid run</option><option value="representation">missing reverse adjacency</option><option value="queue">duplicate BFS discovery</option><option value="timestamps">bad finish time</option><option value="transpose">second pass on G</option></select></label>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{Object.entries(checks).map(([name, ok]) => <div key={name} className={`border p-3 text-center text-xs ${ok ? "border-success text-success" : "border-danger text-danger"}`}>{name}<div className="mt-1 font-mono">{ok ? "pass" : "fail"}</div></div>)}</div>
    </Figure>
  );
}
