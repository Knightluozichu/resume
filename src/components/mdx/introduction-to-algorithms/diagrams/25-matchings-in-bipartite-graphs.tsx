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

export function CLRS4MatchingAugmentLab() {
  const [augmented, setAugmented] = useState(false);
  const before = ["L1–R1", "L2–R2"];
  const after = ["L1–R2", "L2–R3", "L3–R1"];
  const edges = augmented ? after : before;
  return (
    <Figure caption="Taking the symmetric difference with an augmenting path removes its matched edges and adds its unmatched edges, increasing matching size by exactly one.">
      <button type="button" className="border border-accent px-4 py-2 text-sm text-accent" onClick={() => setAugmented((value) => !value)}>{augmented ? "undo augmentation" : "augment along path"}</button>
      <div className="mt-4 flex flex-wrap gap-2">{edges.map((edge) => <div key={edge} className="border border-success px-3 py-2 font-mono text-success">{edge}</div>)}</div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="path endpoints" value="both free" /><Stat label="alternation" value="unmatched / matched" tone="warning" /><Stat label="matching size" value={edges.length.toString()} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4BergeCertificateLab() {
  const [path, setPath] = useState<"none" | "augmenting" | "alternating-only">("none");
  const rows = {
    none: ["no augmenting path", "matching is maximum", "Berge certificate passes"],
    augmenting: ["free-to-free alternating path", "symmetric difference grows matching", "not maximum"],
    "alternating-only": ["one endpoint matched", "does not increase cardinality", "not an augmentation witness"],
  }[path];
  return (
    <Figure caption="Berge's theorem characterizes maximum cardinality exactly: a matching is maximum if and only if no augmenting path exists.">
      <label className="text-sm font-semibold text-primary">alternating-path search<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={path} onChange={(event) => setPath(event.target.value as typeof path)}><option value="none">none found</option><option value="augmenting">augmenting path</option><option value="alternating-only">alternating but not augmenting</option></select></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="search result" value={rows[0]} /><Stat label="conclusion" value={rows[1]} tone={path === "augmenting" ? "danger" : "success"} /><Stat label="certificate" value={rows[2]} tone="warning" /></div>
    </Figure>
  );
}

export function CLRS4HopcroftKarpLayersLab() {
  const [layer, setLayer] = useState(2);
  const layers = [["free L1", "free L3"], ["R1", "R2"], ["L2"], ["free R3"]];
  return (
    <Figure caption="Hopcroft-Karp BFS builds alternating layers from all free left vertices and stops at the shortest free-right layer.">
      <label className="text-sm font-semibold text-primary">visible BFS layers through {layer}<input className="mt-2 w-full accent-current" type="range" min="0" max="3" value={layer} onChange={(event) => setLayer(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-4 gap-2">{layers.map((nodes, index) => <div key={index} className={`border p-3 text-center text-xs ${index <= layer ? "border-success text-success" : "border-border text-secondary"}`}><div>layer {index}</div><div className="mt-2 font-mono">{index <= layer ? nodes.join(", ") : "?"}</div></div>)}</div>
    </Figure>
  );
}

export function CLRS4DisjointAugmentLab() {
  const [paths, setPaths] = useState(2);
  return (
    <Figure caption="Within one Hopcroft-Karp phase, DFS finds a maximal set of vertex-disjoint shortest augmenting paths so all can be applied simultaneously.">
      <label className="text-sm font-semibold text-primary">disjoint shortest paths = {paths}<input className="mt-2 w-full accent-current" type="range" min="0" max="3" value={paths} onChange={(event) => setPaths(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2">{["L1→R2", "L3→R1", "L4→R4"].map((path, index) => <div key={path} className={`border p-3 text-center font-mono text-sm ${index < paths ? "border-success text-success" : "border-border text-secondary"}`}>{path}</div>)}</div>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="one phase gain" value={paths.toString()} tone="success" /><Stat label="shared vertices" value="0" /></div>
    </Figure>
  );
}

const preferences: Record<string, string[]> = {
  A: ["X", "Y", "Z"],
  B: ["Y", "X", "Z"],
  C: ["Y", "Z", "X"],
  X: ["B", "A", "C"],
  Y: ["A", "C", "B"],
  Z: ["C", "B", "A"],
};

export function CLRS4PreferenceProfileLab() {
  const [person, setPerson] = useState("A");
  return (
    <Figure caption="A stable-marriage instance gives every participant a strict ranking of the opposite side; preference order, not numeric distance, drives proposals and blocking pairs.">
      <label className="text-sm font-semibold text-primary">participant<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={person} onChange={(event) => setPerson(event.target.value)}>{Object.keys(preferences).map((name) => <option key={name}>{name}</option>)}</select></label>
      <div className="mt-4 flex gap-2">{preferences[person].map((name, index) => <div key={name} className="flex-1 border border-accent p-3 text-center text-accent"><div className="text-xs">rank {index + 1}</div><div className="mt-1 font-mono">{name}</div></div>)}</div>
    </Figure>
  );
}

export function CLRS4DeferredAcceptanceLab() {
  const [round, setRound] = useState(1);
  const stages = [
    ["A→X, B→Y, C→Y", "X holds A; Y holds C and rejects B", "B remains free"],
    ["B→X", "X prefers B to A, holds B and rejects A", "A remains free"],
    ["A→Y", "Y prefers A to C, holds A and rejects C", "C remains free"],
    ["C→Z", "Z holds C", "matching complete"],
  ];
  return (
    <Figure caption="Deferred acceptance lets receivers hold their best proposal so far; rejected proposers advance down their lists and never repeat a proposal.">
      <label className="text-sm font-semibold text-primary">proposal round = {round + 1}<input className="mt-2 w-full accent-current" type="range" min="0" max="3" value={round} onChange={(event) => setRound(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="proposals" value={stages[round][0]} /><Stat label="receiver action" value={stages[round][1]} tone="warning" /><Stat label="state" value={stages[round][2]} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4BlockingPairLab() {
  const [candidate, setCandidate] = useState<"stable" | "blocking">("stable");
  const rows = {
    stable: ["A with Y; B with X", "A does not prefer X over Y", "not blocking"],
    blocking: ["A with Z; X with C", "A prefers X and X prefers A", "blocking pair (A,X)"],
  }[candidate];
  return (
    <Figure caption="A blocking pair consists of two participants who each prefer one another over their assigned partners; a matching is stable exactly when none exists.">
      <label className="text-sm font-semibold text-primary">candidate matching<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={candidate} onChange={(event) => setCandidate(event.target.value as typeof candidate)}><option value="stable">stable candidate</option><option value="blocking">unstable candidate</option></select></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="assignments" value={rows[0]} /><Stat label="preference test" value={rows[1]} tone="warning" /><Stat label="verdict" value={rows[2]} tone={candidate === "blocking" ? "danger" : "success"} /></div>
    </Figure>
  );
}

export function CLRS4StableOptimalityLab() {
  const [side, setSide] = useState<"proposer" | "receiver">("proposer");
  const rows = {
    proposer: ["proposer-optimal", "each gets best attainable stable partner", "depends on which side proposes"],
    receiver: ["receiver-pessimal", "each gets worst attainable stable partner", "same proposer-side run"],
  }[side];
  return (
    <Figure caption="The proposer-side deferred-acceptance result is optimal for all proposers and pessimal for all receivers among stable matchings; stability does not imply side-neutral fairness.">
      <label className="text-sm font-semibold text-primary">viewpoint<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={side} onChange={(event) => setSide(event.target.value as typeof side)}><option value="proposer">proposer</option><option value="receiver">receiver</option></select></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="theorem" value={rows[0]} /><Stat label="meaning" value={rows[1]} tone="success" /><Stat label="caveat" value={rows[2]} tone="warning" /></div>
    </Figure>
  );
}

const assignmentWeights = [
  [9, 2, 7],
  [6, 4, 3],
  [5, 8, 1],
];
const leftLabels = [9, 6, 8];
const rightLabels = [0, 0, 0];

export function CLRS4AssignmentMatrixLab() {
  const [row, setRow] = useState(0);
  const [col, setCol] = useState(2);
  return (
    <Figure caption="The assignment problem asks for a perfect bipartite matching maximizing total edge weight, equivalently one distinct column for every row.">
      <div className="grid gap-3 sm:grid-cols-2"><label className="text-sm text-primary">worker<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={row} onChange={(event) => setRow(Number(event.target.value))}>{["W1", "W2", "W3"].map((name, index) => <option key={name} value={index}>{name}</option>)}</select></label><label className="text-sm text-primary">job<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={col} onChange={(event) => setCol(Number(event.target.value))}>{["J1", "J2", "J3"].map((name, index) => <option key={name} value={index}>{name}</option>)}</select></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2">{assignmentWeights[row].map((value, index) => <Stat key={index} label={`W${row + 1}→J${index + 1}`} value={value.toString()} tone={index === col ? "success" : "accent"} />)}</div>
    </Figure>
  );
}

export function CLRS4FeasibleLabelLab() {
  const [edge, setEdge] = useState<"11" | "12" | "32">("32");
  const row = Number(edge[0]) - 1;
  const col = Number(edge[1]) - 1;
  const lhs = leftLabels[row] + rightLabels[col];
  const weight = assignmentWeights[row][col];
  return (
    <Figure caption="A feasible vertex labeling satisfies l(x)+l(y)≥w(x,y) on every edge; equality edges are tight candidates for the primal matching.">
      <label className="text-sm font-semibold text-primary">edge<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={edge} onChange={(event) => setEdge(event.target.value as typeof edge)}><option value="11">W1-J1</option><option value="12">W1-J2</option><option value="32">W3-J2</option></select></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="label sum" value={lhs.toString()} /><Stat label="edge weight" value={weight.toString()} tone="warning" /><Stat label="slack" value={(lhs - weight).toString()} tone={lhs === weight ? "success" : "accent"} /></div>
    </Figure>
  );
}

export function CLRS4EqualityGraphLab() {
  const [perfect, setPerfect] = useState(false);
  const equality = perfect ? ["W1-J1", "W2-J3", "W3-J2"] : ["W1-J1", "W2-J1", "W3-J2"];
  return (
    <Figure caption="If the equality graph contains a perfect matching, its weight equals the feasible-label upper bound, so primal and dual certificates meet at optimum.">
      <label className="flex items-center gap-3 text-sm font-semibold text-primary"><input type="checkbox" checked={perfect} onChange={(event) => setPerfect(event.target.checked)} />after label adjustment</label>
      <div className="mt-4 grid grid-cols-3 gap-2">{equality.map((edge) => <div key={edge} className={`border p-3 text-center font-mono ${perfect ? "border-success text-success" : "border-warning text-warning"}`}>{edge}</div>)}</div>
      <div className="mt-3 text-center text-sm text-secondary">{perfect ? "perfect equality matching found" : "two workers compete for J1"}</div>
    </Figure>
  );
}

export function CLRS4HungarianAdjustLab() {
  const [adjusted, setAdjusted] = useState(false);
  return (
    <Figure caption="When the equality graph lacks an augmenting path, Hungarian adjustment uses minimum slack δ to create at least one new equality edge without violating feasibility.">
      <button type="button" className="border border-accent px-4 py-2 text-sm text-accent" onClick={() => setAdjusted((value) => !value)}>{adjusted ? "restore labels" : "apply δ = 2"}</button>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="labels on S" value={adjusted ? "decrease by 2" : "unchanged"} /><Stat label="labels on T" value={adjusted ? "increase by 2" : "unchanged"} tone="warning" /><Stat label="new equality edge" value={adjusted ? "created" : "none"} tone={adjusted ? "success" : "accent"} /></div>
    </Figure>
  );
}

export function CLRS4BipartiteMatchingCertificateLab() {
  const [issue, setIssue] = useState<"valid" | "augmenting" | "blocking" | "label" | "perfect">("valid");
  const checks = {
    "no augmenting path for maximum matching": issue !== "augmenting",
    "no blocking pair for stable matching": issue !== "blocking",
    "labels are feasible for all weighted edges": issue !== "label",
    "equality matching is perfect": issue !== "perfect",
  };
  return (
    <Figure caption="The chapter's three matching problems need different certificates: no augmenting path, no blocking pair, or feasible labels plus a perfect equality matching.">
      <label className="text-sm font-semibold text-primary">audit scenario<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={issue} onChange={(event) => setIssue(event.target.value as typeof issue)}><option value="valid">all certificates valid</option><option value="augmenting">augmenting path remains</option><option value="blocking">blocking pair exists</option><option value="label">infeasible labels</option><option value="perfect">equality matching incomplete</option></select></label>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{Object.entries(checks).map(([name, ok]) => <div key={name} className={`border p-3 text-center text-xs ${ok ? "border-success text-success" : "border-danger text-danger"}`}>{name}<div className="mt-1 font-mono">{ok ? "pass" : "fail"}</div></div>)}</div>
    </Figure>
  );
}
