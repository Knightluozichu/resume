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

export function CLRS4DecisionOptimizationLab() {
  const [mode, setMode] = useState<"decision" | "optimization">("decision");
  const data = mode === "decision"
    ? { input: "G, bound k=12", output: "yes / no", claim: "tour cost ≤ 12?" }
    : { input: "G", output: "minimum cost", claim: "find the best tour" };
  return (
    <Figure caption="Complexity classes are defined on decision problems; an optimization problem is often related through a bound-query decision version.">
      <div className="flex border border-border">
        {(["decision", "optimization"] as const).map((item) => <button key={item} type="button" className={`flex-1 p-2 text-sm font-semibold ${mode === item ? "bg-accent text-background" : "text-primary"}`} onClick={() => setMode(item)}>{item}</button>)}
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-3"><Stat label="input" value={data.input} /><Stat label="output" value={data.output} tone="warning" /><Stat label="question" value={data.claim} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4EncodingGrowthLab() {
  const [value, setValue] = useState(32);
  const binaryLength = Math.floor(Math.log2(value)) + 1;
  return (
    <Figure caption="Running time is measured against encoded input length: writing an integer in unary or binary can change which bounds are polynomial in the input size.">
      <label className="text-sm font-semibold text-primary">integer value = {value}<input className="mt-2 w-full accent-current" type="range" min="2" max="128" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="unary length" value={value.toString()} tone="warning" /><Stat label="binary length" value={binaryLength.toString()} tone="success" /><Stat label="value / binary bits" value={(value / binaryLength).toFixed(1)} /></div>
    </Figure>
  );
}

export function CLRS4PolynomialScaleLab() {
  const [n, setN] = useState(12);
  const polynomial = n ** 3;
  const exponential = 2 ** n;
  return (
    <Figure caption="Polynomial time is stable under composition and machine-model changes; exponential growth eventually dominates every fixed-degree polynomial.">
      <label className="text-sm font-semibold text-primary">encoded input length n = {n}<input className="mt-2 w-full accent-current" type="range" min="2" max="24" value={n} onChange={(event) => setN(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="n³" value={polynomial.toLocaleString()} tone="success" /><Stat label="2ⁿ" value={exponential.toLocaleString()} tone="danger" /><Stat label="ratio 2ⁿ/n³" value={(exponential / polynomial).toFixed(2)} /></div>
    </Figure>
  );
}

const verifierEdges = new Set(["A-B", "B-C", "C-D", "A-D", "A-C"]);

function hasUndirectedEdge(left: string, right: string) {
  return verifierEdges.has(`${left}-${right}`) || verifierEdges.has(`${right}-${left}`);
}

function verifyCycle(order: string[]) {
  return order.every((vertex, index) => hasUndirectedEdge(vertex, order[(index + 1) % order.length]));
}

export function CLRS4VerifierLab() {
  const [certificate, setCertificate] = useState<"valid" | "invalid">("valid");
  const order = certificate === "valid" ? ["A", "B", "C", "D"] : ["A", "B", "D", "C"];
  const accepted = verifyCycle(order);
  return (
    <Figure caption="A Hamiltonian-cycle verifier receives both the graph and a proposed vertex order, then checks uniqueness and every consecutive edge in polynomial time.">
      <label className="text-sm font-semibold text-primary">candidate certificate<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={certificate} onChange={(event) => setCertificate(event.target.value as typeof certificate)}><option value="valid">A-B-C-D-A</option><option value="invalid">A-B-D-C-A</option></select></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="certificate" value={`${order.join("→")}→${order[0]}`} /><Stat label="edge checks" value={order.length.toString()} /><Stat label="verifier" value={accepted ? "accept" : "reject"} tone={accepted ? "success" : "danger"} /></div>
    </Figure>
  );
}

export function CLRS4CertificateLengthLab() {
  const [vertices, setVertices] = useState(16);
  const labelBits = Math.ceil(Math.log2(vertices));
  const certificateBits = vertices * labelBits;
  return (
    <Figure caption="NP requires a certificate whose encoded length and verification time are polynomial in the original instance length.">
      <label className="text-sm font-semibold text-primary">vertices n = {vertices}<input className="mt-2 w-full accent-current" type="range" min="2" max="128" value={vertices} onChange={(event) => setVertices(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="bits per label" value={labelBits.toString()} /><Stat label="cycle certificate" value={`${certificateBits} bits`} tone="success" /><Stat label="verification" value="O(n²)" tone="accent" /></div>
    </Figure>
  );
}

export function CLRS4ReductionDirectionLab() {
  const [direction, setDirection] = useState<"correct" | "reversed">("correct");
  const correct = direction === "correct";
  return (
    <Figure caption="To transfer hardness from known problem A to target B, transform every A instance into B and preserve yes/no answers: A ≤p B.">
      <div className="flex border border-border">
        <button type="button" className={`flex-1 p-2 text-sm font-semibold ${correct ? "bg-accent text-background" : "text-primary"}`} onClick={() => setDirection("correct")}>known A → target B</button>
        <button type="button" className={`flex-1 p-2 text-sm font-semibold ${!correct ? "bg-danger text-background" : "text-primary"}`} onClick={() => setDirection("reversed")}>target B → known A</button>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="mapping" value={correct ? "A ≤p B" : "B ≤p A"} /><Stat label="if target is easy" value={correct ? "A becomes easy" : "does not prove A easy"} tone={correct ? "success" : "warning"} /><Stat label="hardness proof" value={correct ? "direction valid" : "direction wrong"} tone={correct ? "success" : "danger"} /></div>
    </Figure>
  );
}

export function CLRS4ReductionCompositionLab() {
  const [links, setLinks] = useState(2);
  const path = ["CIRCUIT-SAT", "3-CNF-SAT", "CLIQUE", "VERTEX-COVER"].slice(0, links + 1);
  return (
    <Figure caption="Polynomial reductions compose: if A reduces to B and B reduces to C, evaluating both mappings gives a polynomial reduction from A to C.">
      <label className="text-sm font-semibold text-primary">composed links = {links}<input className="mt-2 w-full accent-current" type="range" min="1" max="3" value={links} onChange={(event) => setLinks(Number(event.target.value))} /></label>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm font-semibold text-primary">{path.map((problem, index) => <span key={problem} className="contents"><span className="border border-border p-2">{problem}</span>{index < path.length - 1 ? <span aria-hidden="true">→</span> : null}</span>)}</div>
      <div className="mt-4"><Stat label="composed conclusion" value={`${path[0]} ≤p ${path[path.length - 1]}`} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4ComplexityClassMapLab() {
  const [problem, setProblem] = useState<"shortest" | "sat" | "halting">("sat");
  const details = {
    shortest: ["in P", "in NP", "not known NP-complete"],
    sat: ["not known in P", "in NP", "NP-complete"],
    halting: ["undecidable", "not in NP", "not NP-complete"],
  }[problem];
  return (
    <Figure caption="P is contained in NP. NP-complete problems are exactly those in NP that are also NP-hard; some NP-hard problems need not belong to NP.">
      <label className="text-sm font-semibold text-primary">problem<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={problem} onChange={(event) => setProblem(event.target.value as typeof problem)}><option value="shortest">shortest-path decision</option><option value="sat">SAT</option><option value="halting">halting problem</option></select></label>
      <div className="mt-4 grid grid-cols-3 gap-2">{details.map((detail, index) => <Stat key={detail} label={["P status", "NP status", "hardness"][index]} value={detail} tone={index === 2 && problem === "sat" ? "success" : "accent"} />)}</div>
    </Figure>
  );
}

export function CLRS4ProofChecklistLab() {
  const [stage, setStage] = useState(2);
  const stages = ["state decision problem B", "prove B is in NP", "choose known NP-complete A", "construct f: A → B", "prove iff and polynomial time"];
  return (
    <Figure caption="A complete NP-completeness proof has two independent obligations: membership in NP and NP-hardness through a correctly directed polynomial reduction.">
      <label className="text-sm font-semibold text-primary">completed proof stages = {stage + 1}<input className="mt-2 w-full accent-current" type="range" min="0" max={stages.length - 1} value={stage} onChange={(event) => setStage(Number(event.target.value))} /></label>
      <ol className="mt-4 grid gap-2 sm:grid-cols-5">{stages.map((item, index) => <li key={item} className={`border p-3 text-xs ${index <= stage ? "border-success text-success" : "border-border text-secondary"}`}>{index + 1}. {item}</li>)}</ol>
    </Figure>
  );
}

export function CLRS4CircuitSATLab() {
  const [x, setX] = useState(false);
  const [y, setY] = useState(true);
  const output = (x || y) && (!x || y);
  return (
    <Figure caption="CIRCUIT-SAT asks whether some Boolean input makes a combinational circuit output 1; a proposed assignment is checked by evaluating gates once.">
      <div className="grid grid-cols-2 gap-3"><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={x} onChange={(event) => setX(event.target.checked)} />input x = {Number(x)}</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={y} onChange={(event) => setY(event.target.checked)} />input y = {Number(y)}</label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="x OR y" value={Number(x || y).toString()} /><Stat label="NOT x OR y" value={Number(!x || y).toString()} /><Stat label="circuit output" value={Number(output).toString()} tone={output ? "success" : "danger"} /></div>
    </Figure>
  );
}

const clauses = [
  (x: boolean, y: boolean, z: boolean) => x || !y || z,
  (x: boolean, y: boolean, z: boolean) => !x || y || z,
  (x: boolean, y: boolean, z: boolean) => x || y || !z,
];

export function CLRS43SATClauseLab() {
  const [mask, setMask] = useState(5);
  const values = [Boolean(mask & 4), Boolean(mask & 2), Boolean(mask & 1)];
  const results = clauses.map((clause) => clause(values[0], values[1], values[2]));
  return (
    <Figure caption="3-CNF-SAT is accepted only when one assignment makes every clause true; the assignment is the certificate and clause evaluation is polynomial.">
      <label className="text-sm font-semibold text-primary">assignment index = {mask}<input className="mt-2 w-full accent-current" type="range" min="0" max="7" value={mask} onChange={(event) => setMask(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="x,y,z" value={values.map(Number).join(",")} /><Stat label="clause values" value={results.map(Number).join(",")} tone={results.every(Boolean) ? "success" : "warning"} /><Stat label="formula" value={results.every(Boolean) ? "satisfied" : "unsatisfied"} tone={results.every(Boolean) ? "success" : "danger"} /></div>
    </Figure>
  );
}

const cliqueEdges = new Set(["A-B", "A-C", "B-C", "B-D", "C-D"]);

function cliqueExists(size: number) {
  const vertices = ["A", "B", "C", "D"];
  const subsets: string[][] = [];
  function choose(start: number, selected: string[]) {
    if (selected.length === size) {
      subsets.push(selected);
      return;
    }
    for (let index = start; index < vertices.length; index += 1) choose(index + 1, [...selected, vertices[index]]);
  }
  choose(0, []);
  return subsets.find((subset) => subset.every((left, index) => subset.slice(index + 1).every((right) => cliqueEdges.has(`${left}-${right}`) || cliqueEdges.has(`${right}-${left}`))));
}

export function CLRS4CliqueLab() {
  const [size, setSize] = useState(3);
  const witness = cliqueExists(size);
  return (
    <Figure caption="CLIQUE asks whether a graph contains k mutually adjacent vertices; a k-vertex subset is verified by checking every pair.">
      <label className="text-sm font-semibold text-primary">requested clique size k = {size}<input className="mt-2 w-full accent-current" type="range" min="2" max="4" value={size} onChange={(event) => setSize(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="graph edges" value="AB,AC,BC,BD,CD" /><Stat label="witness" value={witness?.join(",") ?? "none"} tone={witness ? "success" : "warning"} /><Stat label="decision" value={witness ? "yes" : "no"} tone={witness ? "success" : "danger"} /></div>
    </Figure>
  );
}

const coverEdges: [string, string][] = [["A", "B"], ["A", "C"], ["B", "C"], ["B", "D"], ["C", "D"]];

export function CLRS4VertexCoverLab() {
  const [cover, setCover] = useState<"BC" | "AB" | "A">("BC");
  const selected = new Set(cover.split(""));
  const covered = coverEdges.filter(([left, right]) => selected.has(left) || selected.has(right)).length;
  return (
    <Figure caption="A vertex cover touches every edge. In a graph G, C is a vertex cover exactly when V−C is an independent set, linking cover and clique through complements.">
      <label className="text-sm font-semibold text-primary">candidate cover<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={cover} onChange={(event) => setCover(event.target.value as typeof cover)}><option value="BC">B,C</option><option value="AB">A,B</option><option value="A">A</option></select></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="selected vertices" value={cover.split("").join(",")} /><Stat label="covered edges" value={`${covered}/${coverEdges.length}`} /><Stat label="verifier" value={covered === coverEdges.length ? "accept" : "reject"} tone={covered === coverEdges.length ? "success" : "danger"} /></div>
    </Figure>
  );
}

export function CLRS4HamiltonianLab() {
  const [route, setRoute] = useState<"cycle" | "walk">("cycle");
  const order = route === "cycle" ? ["A", "B", "C", "D"] : ["A", "C", "B", "D"];
  const valid = verifyCycle(order);
  return (
    <Figure caption="A Hamiltonian cycle visits every vertex exactly once and returns to the start; it is about vertices, unlike an Euler tour, which covers edges.">
      <label className="text-sm font-semibold text-primary">proposed order<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={route} onChange={(event) => setRoute(event.target.value as typeof route)}><option value="cycle">A-B-C-D-A</option><option value="walk">A-C-B-D-A</option></select></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="visits" value={`${order.join("→")}→A`} /><Stat label="all vertices once" value="yes" tone="success" /><Stat label="all edges exist" value={valid ? "yes" : "no"} tone={valid ? "success" : "danger"} /></div>
    </Figure>
  );
}

export function CLRS4TSPDecisionLab() {
  const [bound, setBound] = useState(13);
  const tourCosts = [12, 15, 17];
  const witness = Math.min(...tourCosts);
  const accepted = witness <= bound;
  return (
    <Figure caption="The TSP decision version asks whether a tour of cost at most B exists; a proposed tour can be checked by summing its edge weights.">
      <label className="text-sm font-semibold text-primary">cost bound B = {bound}<input className="mt-2 w-full accent-current" type="range" min="10" max="18" value={bound} onChange={(event) => setBound(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="candidate costs" value={tourCosts.join(",")} /><Stat label="best certificate" value={witness.toString()} tone="success" /><Stat label="decision" value={accepted ? "yes" : "no"} tone={accepted ? "success" : "danger"} /></div>
    </Figure>
  );
}

export function CLRS4NPCertificateLab() {
  const [membership, setMembership] = useState(true);
  const [reduction, setReduction] = useState(true);
  const [equivalence, setEquivalence] = useState(false);
  const complete = membership && reduction && equivalence;
  return (
    <Figure caption="The final proof certificate should expose NP membership, a polynomial mapping from a known hard problem, and a two-way correctness argument.">
      <div className="grid gap-3 sm:grid-cols-3"><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={membership} onChange={(event) => setMembership(event.target.checked)} />B ∈ NP</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={reduction} onChange={(event) => setReduction(event.target.checked)} />A ≤p B</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={equivalence} onChange={(event) => setEquivalence(event.target.checked)} />iff proof</label></div>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="membership obligation" value={membership ? "shown" : "missing"} tone={membership ? "success" : "danger"} /><Stat label="NP-complete conclusion" value={complete ? "supported" : "not yet"} tone={complete ? "success" : "warning"} /></div>
    </Figure>
  );
}
