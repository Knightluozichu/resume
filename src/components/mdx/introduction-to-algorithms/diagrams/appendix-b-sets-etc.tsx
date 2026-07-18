"use client";

import { useState, type ReactNode } from "react";

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

function setText(values: Set<number>) {
  return `{${[...values].sort((a, b) => a - b).join(",")}}`;
}

export function CLRS4SetOperationsLab() {
  const [includeFour, setIncludeFour] = useState(true);
  const left = new Set([1, 2, 3, ...(includeFour ? [4] : [])]);
  const right = new Set([3, 4, 5]);
  const union = new Set([...left, ...right]);
  const intersection = new Set([...left].filter((value) => right.has(value)));
  const difference = new Set([...left].filter((value) => !right.has(value)));
  return (
    <Figure caption="Union keeps elements in either set, intersection keeps elements in both, and difference is directional.">
      <label className="flex items-center gap-3 text-sm font-semibold text-primary"><input type="checkbox" checked={includeFour} onChange={(event) => setIncludeFour(event.target.checked)} />include 4 in A</label>
      <div className="mt-4 grid gap-2 sm:grid-cols-3"><Stat label="A union B" value={setText(union)} /><Stat label="A intersection B" value={setText(intersection)} tone="success" /><Stat label="A minus B" value={setText(difference)} tone="warning" /></div>
    </Figure>
  );
}

export function CLRS4PowerSetLab() {
  const [size, setSize] = useState(3);
  const count = 2 ** size;
  const preview = Array.from({ length: Math.min(count, 8) }, (_, mask) => `{${Array.from({ length: size }, (__, index) => index + 1).filter((__, index) => mask & (1 << index)).join(",")}}`);
  return (
    <Figure caption="Every element is independently included or excluded, so an n-element set has exactly 2ⁿ subsets in its power set.">
      <label className="text-sm font-semibold text-primary">set size n = {size}<input className="mt-2 w-full accent-current" type="range" min="0" max="8" value={size} onChange={(event) => setSize(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="power-set size" value={count.toString()} tone="success" /><Stat label="first subsets" value={preview.join(" ")} /></div>
    </Figure>
  );
}

export function CLRS4CartesianProductLab() {
  const [leftSize, setLeftSize] = useState(2);
  const [rightSize, setRightSize] = useState(3);
  const pairs = Array.from({ length: leftSize }, (_, left) => Array.from({ length: rightSize }, (__, right) => `(${left + 1},${String.fromCharCode(97 + right)})`)).flat();
  return (
    <Figure caption="The Cartesian product A×B contains ordered pairs, so reversing the factors generally changes both pair order and meaning.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">|A| = {leftSize}<input className="mt-2 w-full accent-current" type="range" min="1" max="4" value={leftSize} onChange={(event) => setLeftSize(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">|B| = {rightSize}<input className="mt-2 w-full accent-current" type="range" min="1" max="4" value={rightSize} onChange={(event) => setRightSize(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="|A×B|" value={(leftSize * rightSize).toString()} tone="success" /><Stat label="ordered pairs" value={pairs.join(" ")} /></div>
    </Figure>
  );
}

const relationPairs = new Set(["1-1", "2-2", "3-3", "1-2", "2-1"]);

export function CLRS4RelationMatrixLab() {
  const [row, setRow] = useState(1);
  const [column, setColumn] = useState(2);
  const related = relationPairs.has(`${row}-${column}`);
  return (
    <Figure caption="A binary relation on A is a subset of A×A and can be inspected as ordered pairs, a Boolean matrix, or a directed graph.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">first element = {row}<input className="mt-2 w-full accent-current" type="range" min="1" max="3" value={row} onChange={(event) => setRow(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">second element = {column}<input className="mt-2 w-full accent-current" type="range" min="1" max="3" value={column} onChange={(event) => setColumn(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="queried pair" value={`(${row},${column})`} /><Stat label="belongs to R" value={related ? "yes" : "no"} tone={related ? "success" : "warning"} /></div>
    </Figure>
  );
}

export function CLRS4RelationPropertiesLab() {
  const [kind, setKind] = useState<"equality" | "less" | "adjacent">("equality");
  const properties = {
    equality: ["yes", "yes", "yes"],
    less: ["no", "no", "yes"],
    adjacent: ["no", "yes", "no"],
  }[kind];
  return (
    <Figure caption="Reflexive, symmetric, and transitive are independent properties; equivalence requires all three, while partial order uses antisymmetry instead of symmetry.">
      <label className="text-sm font-semibold text-primary">relation<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={kind} onChange={(event) => setKind(event.target.value as typeof kind)}><option value="equality">equality</option><option value="less">strict less-than</option><option value="adjacent">undirected adjacency</option></select></label>
      <div className="mt-4 grid grid-cols-3 gap-2">{properties.map((value, index) => <Stat key={index} label={["reflexive", "symmetric", "transitive"][index]} value={value} tone={value === "yes" ? "success" : "warning"} />)}</div>
    </Figure>
  );
}

export function CLRS4EquivalenceClassLab() {
  const [modulus, setModulus] = useState(3);
  const [value, setValue] = useState(8);
  const residue = ((value % modulus) + modulus) % modulus;
  const members = Array.from({ length: 5 }, (_, index) => residue + index * modulus);
  return (
    <Figure caption="Congruence modulo m partitions integers into disjoint equivalence classes; each integer belongs to exactly one residue class.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">modulus m = {modulus}<input className="mt-2 w-full accent-current" type="range" min="2" max="8" value={modulus} onChange={(event) => setModulus(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">integer x = {value}<input className="mt-2 w-full accent-current" type="range" min="0" max="30" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="class label" value={`[${residue}]`} tone="success" /><Stat label="sample members" value={members.join(",")} /></div>
    </Figure>
  );
}

export function CLRS4PartialOrderLab() {
  const [left, setLeft] = useState<"A" | "B" | "C">("A");
  const [right, setRight] = useState<"A" | "B" | "C">("C");
  const sets = { A: new Set([1]), B: new Set([2]), C: new Set([1, 2]) };
  const subset = [...sets[left]].every((value) => sets[right].has(value));
  const reverse = [...sets[right]].every((value) => sets[left].has(value));
  return (
    <Figure caption="Subset inclusion is a partial order: some pairs are incomparable, and mutual inclusion forces equality by antisymmetry.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">left set<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={left} onChange={(event) => setLeft(event.target.value as typeof left)}>{Object.keys(sets).map((key) => <option key={key}>{key}</option>)}</select></label><label className="text-sm font-semibold text-primary">right set<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={right} onChange={(event) => setRight(event.target.value as typeof right)}>{Object.keys(sets).map((key) => <option key={key}>{key}</option>)}</select></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label={`${left} subset ${right}`} value={subset ? "yes" : "no"} tone={subset ? "success" : "warning"} /><Stat label={`${right} subset ${left}`} value={reverse ? "yes" : "no"} /><Stat label="comparison" value={subset || reverse ? "comparable" : "incomparable"} tone={subset || reverse ? "success" : "warning"} /></div>
    </Figure>
  );
}

export function CLRS4FunctionMappingLab() {
  const [kind, setKind] = useState<"bijective" | "injective" | "surjective" | "neither">("bijective");
  const mapping = {
    bijective: ["a→1", "b→2", "c→3"],
    injective: ["a→1", "b→2", "c→3"],
    surjective: ["a→1", "b→1", "c→2"],
    neither: ["a→1", "b→1", "c→1"],
  }[kind];
  const codomain = kind === "injective" ? "{1,2,3,4}" : kind === "surjective" ? "{1,2}" : "{1,2,3}";
  return (
    <Figure caption="A function assigns exactly one output to each domain element; injective controls collisions and surjective controls uncovered codomain values.">
      <label className="text-sm font-semibold text-primary">mapping type<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={kind} onChange={(event) => setKind(event.target.value as typeof kind)}><option value="bijective">bijective</option><option value="injective">injective only</option><option value="surjective">surjective only</option><option value="neither">neither</option></select></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="mapping" value={mapping.join(",")} /><Stat label="codomain" value={codomain} /><Stat label="classification" value={kind} tone={kind === "bijective" ? "success" : "accent"} /></div>
    </Figure>
  );
}

export function CLRS4FunctionCompositionLab() {
  const [input, setInput] = useState(2);
  const g = input + 1;
  const fAfterG = 2 * g;
  const f = 2 * input;
  const gAfterF = f + 1;
  return (
    <Figure caption="Composition order matters: (f∘g)(x) applies g first, while (g∘f)(x) applies f first and can produce a different value.">
      <label className="text-sm font-semibold text-primary">input x = {input}<input className="mt-2 w-full accent-current" type="range" min="-5" max="8" value={input} onChange={(event) => setInput(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="f(x)=2x" value={f.toString()} /><Stat label="f(g(x))" value={fAfterG.toString()} tone="success" /><Stat label="g(f(x))" value={gAfterF.toString()} tone="warning" /></div>
    </Figure>
  );
}

const graphEdges: [string, string][] = [["A", "B"], ["A", "C"], ["B", "C"], ["C", "D"]];

export function CLRS4GraphDegreeLab() {
  const [vertex, setVertex] = useState("C");
  const vertices = ["A", "B", "C", "D"];
  const degree = graphEdges.filter((edge) => edge.includes(vertex)).length;
  const degreeSum = vertices.reduce((sum, item) => sum + graphEdges.filter((edge) => edge.includes(item)).length, 0);
  return (
    <Figure caption="In an undirected graph each edge contributes one to two endpoint degrees, so the degree sum equals twice the edge count.">
      <label className="text-sm font-semibold text-primary">vertex<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={vertex} onChange={(event) => setVertex(event.target.value)}>{vertices.map((item) => <option key={item}>{item}</option>)}</select></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label={`degree(${vertex})`} value={degree.toString()} /><Stat label="sum of degrees" value={degreeSum.toString()} tone="success" /><Stat label="2|E|" value={(2 * graphEdges.length).toString()} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4GraphRepresentationLab() {
  const [representation, setRepresentation] = useState<"list" | "matrix">("list");
  const detail = representation === "list"
    ? ["Θ(V+E) space", "iterate neighbors", "sparse graphs"]
    : ["Θ(V²) space", "O(1) edge test", "dense graphs"];
  return (
    <Figure caption="Adjacency lists scale with vertices plus edges, while adjacency matrices spend quadratic space for constant-time edge queries.">
      <div className="flex border border-border">{(["list", "matrix"] as const).map((item) => <button key={item} type="button" className={`flex-1 p-2 text-sm font-semibold ${representation === item ? "bg-accent text-background" : "text-primary"}`} onClick={() => setRepresentation(item)}>{item}</button>)}</div>
      <div className="mt-4 grid grid-cols-3 gap-2">{detail.map((value, index) => <Stat key={value} label={["space", "strength", "fit"][index]} value={value} tone={index === 1 ? "success" : "accent"} />)}</div>
    </Figure>
  );
}

export function CLRS4PathCycleLab() {
  const [route, setRoute] = useState<"path" | "walk" | "cycle">("path");
  const routes = {
    path: ["A", "B", "C", "D"],
    walk: ["A", "B", "C", "B"],
    cycle: ["A", "B", "C", "A"],
  }[route];
  return (
    <Figure caption="A walk may repeat vertices, a simple path does not, and a cycle closes at its start while keeping interior vertices distinct.">
      <label className="text-sm font-semibold text-primary">route kind<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={route} onChange={(event) => setRoute(event.target.value as typeof route)}><option value="path">simple path</option><option value="walk">walk with repeat</option><option value="cycle">cycle</option></select></label>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="vertex sequence" value={routes.join("→")} /><Stat label="classification" value={route} tone={route === "path" ? "success" : "accent"} /></div>
    </Figure>
  );
}

export function CLRS4TreeEdgeCountLab() {
  const [vertices, setVertices] = useState(8);
  return (
    <Figure caption="A finite undirected graph is a tree exactly when it is connected and acyclic; every n-vertex tree has n−1 edges.">
      <label className="text-sm font-semibold text-primary">vertices n = {vertices}<input className="mt-2 w-full accent-current" type="range" min="1" max="30" value={vertices} onChange={(event) => setVertices(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="vertices" value={vertices.toString()} /><Stat label="tree edges" value={Math.max(0, vertices - 1).toString()} tone="success" /><Stat label="extra edge effect" value={vertices > 1 ? "creates a cycle" : "self-loop"} tone="warning" /></div>
    </Figure>
  );
}

export function CLRS4RootedTreeLab() {
  const [node, setNode] = useState<"A" | "B" | "D" | "E">("D");
  const data = {
    A: ["none", "0", "B,C,D,E"],
    B: ["A", "1", "D,E"],
    D: ["B", "2", "none"],
    E: ["B", "2", "none"],
  }[node];
  return (
    <Figure caption="Choosing a root orients parent-child relations and defines depth, ancestors, descendants, and subtrees without changing the underlying undirected edges.">
      <label className="text-sm font-semibold text-primary">selected node<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={node} onChange={(event) => setNode(event.target.value as typeof node)}>{Object.keys(dataForOptions).map((item) => <option key={item}>{item}</option>)}</select></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="parent" value={data[0]} /><Stat label="depth" value={data[1]} tone="success" /><Stat label="descendants" value={data[2]} /></div>
    </Figure>
  );
}

const dataForOptions = { A: true, B: true, D: true, E: true };

export function CLRS4FoundationCertificateLab() {
  const [objects, setObjects] = useState(true);
  const [properties, setProperties] = useState(true);
  const [representation, setRepresentation] = useState(false);
  const complete = objects && properties && representation;
  return (
    <Figure caption="A discrete-structure certificate states the carrier objects, required properties, chosen representation, and invariants used by the algorithm.">
      <div className="grid gap-3 sm:grid-cols-3"><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={objects} onChange={(event) => setObjects(event.target.checked)} />objects</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={properties} onChange={(event) => setProperties(event.target.checked)} />properties</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={representation} onChange={(event) => setRepresentation(event.target.checked)} />representation</label></div>
      <div className="mt-4"><Stat label="foundation certificate" value={complete ? "complete" : "incomplete"} tone={complete ? "success" : "warning"} /></div>
    </Figure>
  );
}
