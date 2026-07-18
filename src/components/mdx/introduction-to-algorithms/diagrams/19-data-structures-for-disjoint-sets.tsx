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

function SetBox({ label, values, tone = "accent" }: { label: string; values: string[]; tone?: "accent" | "success" | "warning" }) {
  const border = { accent: "border-accent text-accent", success: "border-success text-success", warning: "border-warning text-warning" }[tone];
  return <div className={`border p-3 ${border}`}><div className="text-xs">{label}</div><div className="mt-2 flex flex-wrap gap-1">{values.map((value) => <span key={value} className="border border-current px-2 py-1 font-mono text-xs">{value}</span>)}</div></div>;
}

export function CLRS4DisjointSetPartitionLab() {
  const [merged, setMerged] = useState(false);
  return (
    <Figure caption="A disjoint-set structure stores a partition: every element belongs to exactly one set, and UNION replaces two sets by their union.">
      <button type="button" className="border border-accent px-4 py-2 text-sm text-accent" onClick={() => setMerged((value) => !value)}>{merged ? "undo UNION(B,E)" : "UNION(B,E)"}</button>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">{merged ? <><SetBox label="representative A" values={["A", "B", "C", "D", "E"]} tone="success" /><SetBox label="representative F" values={["F"]} /></> : <><SetBox label="representative A" values={["A", "B", "C"]} /><SetBox label="representative D" values={["D", "E"]} tone="warning" /><SetBox label="representative F" values={["F"]} /></>}</div>
    </Figure>
  );
}

export function CLRS4DisjointSetOperationsLab() {
  const [operation, setOperation] = useState<"make" | "find" | "union">("find");
  const rows = {
    make: ["MAKE-SET(x)", "create singleton {x}", "x is its own representative"],
    find: ["FIND-SET(x)", "return x's representative", "does not change partition"],
    union: ["UNION(x,y)", "merge two represented sets", "no change if representatives match"],
  }[operation];
  return (
    <Figure caption="MAKE-SET creates a singleton, FIND-SET identifies a component, and UNION changes the partition only when representatives differ.">
      <label className="text-sm font-semibold text-primary">operation<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={operation} onChange={(event) => setOperation(event.target.value as typeof operation)}><option value="make">MAKE-SET</option><option value="find">FIND-SET</option><option value="union">UNION</option></select></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="interface" value={rows[0]} /><Stat label="effect" value={rows[1]} tone="warning" /><Stat label="postcondition" value={rows[2]} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4LinkedListUnionLab() {
  const [weighted, setWeighted] = useState(true);
  const small = ["u", "v"];
  const large = ["a", "b", "c", "d", "e", "f"];
  const updated = weighted ? small.length : large.length;
  return (
    <Figure caption="In a linked-list representation, weighted union appends the shorter list and rewrites only its representative pointers.">
      <label className="flex items-center gap-3 text-sm font-semibold text-primary"><input type="checkbox" checked={weighted} onChange={(event) => setWeighted(event.target.checked)} />attach smaller list to larger list</label>
      <div className="mt-4 grid grid-cols-2 gap-4"><SetBox label="size 2" values={small} tone={weighted ? "warning" : "success"} /><SetBox label="size 6" values={large} tone={weighted ? "success" : "warning"} /></div>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="representative rewrites" value={updated.toString()} tone={weighted ? "success" : "danger"} /><Stat label="new set size" value="8" /></div>
    </Figure>
  );
}

export function CLRS4WeightedDoublingLab() {
  const [moves, setMoves] = useState(3);
  const sizes = Array.from({ length: moves + 1 }, (_, index) => 2 ** index);
  return (
    <Figure caption="Whenever weighted union rewrites an element's representative pointer, the containing set at least doubles, so one element moves at most floor(log2 n) times.">
      <label className="text-sm font-semibold text-primary">times one element moved = {moves}<input className="mt-2 w-full accent-current" type="range" min="0" max="8" value={moves} onChange={(event) => setMoves(Number(event.target.value))} /></label>
      <div className="mt-4 flex flex-wrap items-center gap-2">{sizes.map((size, index) => <div key={size} className="flex items-center gap-2"><div className="border border-success p-3 font-mono text-success">{size}</div>{index < sizes.length - 1 && <span className="text-secondary">→</span>}</div>)}</div>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="current set size at least" value={(2 ** moves).toString()} tone="success" /><Stat label="required universe size" value={`n ≥ ${2 ** moves}`} /></div>
    </Figure>
  );
}

const forestParents: Record<string, string> = { a: "a", b: "a", c: "b", d: "c", e: "c", f: "e" };

function pathToRoot(start: string, parents: Record<string, string>) {
  const path = [start];
  while (parents[path.at(-1) as string] !== path.at(-1)) path.push(parents[path.at(-1) as string]);
  return path;
}

export function CLRS4DisjointSetForestLab() {
  const [node, setNode] = useState("f");
  const path = pathToRoot(node, forestParents);
  return (
    <Figure caption="A disjoint-set forest stores one parent pointer per node; a root points to itself and serves as the set representative.">
      <label className="text-sm font-semibold text-primary">start node<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={node} onChange={(event) => setNode(event.target.value)}>{Object.keys(forestParents).map((value) => <option key={value} value={value}>{value}</option>)}</select></label>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">{path.map((value, index) => <div key={value} className="flex items-center gap-2"><div className={`border p-3 font-mono ${index === path.length - 1 ? "border-success text-success" : "border-accent text-accent"}`}>{value}</div>{index < path.length - 1 && <span className="text-secondary">→ parent</span>}</div>)}</div>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="path length" value={(path.length - 1).toString()} /><Stat label="representative" value={path.at(-1) as string} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4UnionByRankLab() {
  const [equal, setEqual] = useState(true);
  const leftRank = 3;
  const rightRank = equal ? 3 : 1;
  const parentRank = equal ? 4 : 3;
  return (
    <Figure caption="Union by rank links the lower-rank root under the higher-rank root; rank increases only when two equal-rank roots merge.">
      <label className="flex items-center gap-3 text-sm font-semibold text-primary"><input type="checkbox" checked={equal} onChange={(event) => setEqual(event.target.checked)} />merge roots of equal rank</label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="left root rank" value={leftRank.toString()} /><Stat label="right root rank" value={rightRank.toString()} /><Stat label="result root rank" value={parentRank.toString()} tone="success" /></div>
      <div className="mt-3 border border-warning p-3 text-center text-sm text-warning">{equal ? "choose a deterministic root and increment its rank" : "attach rank 1 root below rank 3 root; rank stays 3"}</div>
    </Figure>
  );
}

export function CLRS4PathCompressionLab() {
  const [compressed, setCompressed] = useState(false);
  const before = ["f", "e", "c", "b", "a"];
  const path = compressed ? ["f", "a"] : before;
  return (
    <Figure caption="Path compression makes every node visited by FIND-SET point directly to the root, preserving the represented set while shortening future paths.">
      <button type="button" className="border border-accent px-4 py-2 text-sm text-accent" onClick={() => setCompressed((value) => !value)}>{compressed ? "restore path" : "FIND-SET(f)"}</button>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">{path.map((value, index) => <div key={value} className="flex items-center gap-2"><div className={`border p-3 font-mono ${index === path.length - 1 ? "border-success text-success" : "border-accent text-accent"}`}>{value}</div>{index < path.length - 1 && <span className="text-secondary">→</span>}</div>)}</div>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="nodes rewritten" value={compressed ? "f, e, c, b" : "none"} tone="warning" /><Stat label="next FIND depth" value={compressed ? "1" : "4"} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4FindSetTraceLab() {
  const [recursive, setRecursive] = useState(true);
  return (
    <Figure caption="FIND-SET first discovers the root and then rewires the return path; an iterative implementation needs an explicit second pass or stored path.">
      <label className="flex items-center gap-3 text-sm font-semibold text-primary"><input type="checkbox" checked={recursive} onChange={(event) => setRecursive(event.target.checked)} />recursive implementation</label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="upward phase" value="f → e → c → b → a" /><Stat label="root base case" value="a.parent = a" tone="success" /><Stat label="rewrite phase" value={recursive ? "return unwinds" : "walk stored path"} tone="warning" /></div>
    </Figure>
  );
}

export function CLRS4InverseAckermannLab() {
  const [scale, setScale] = useState<"thousand" | "billion" | "astronomical">("billion");
  const rows = {
    thousand: ["10³", "≤ 3", "practically tiny"],
    billion: ["10⁹", "≤ 4", "practically tiny"],
    astronomical: ["tower-sized n", "≤ 5", "still grows, but extraordinarily slowly"],
  }[scale];
  return (
    <Figure caption="The inverse-Ackermann factor is not literally constant, but it remains tiny for any realizable input; the theorem is a sequence bound, not a per-call promise.">
      <label className="text-sm font-semibold text-primary">universe scale<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={scale} onChange={(event) => setScale(event.target.value as typeof scale)}><option value="thousand">thousand</option><option value="billion">billion</option><option value="astronomical">astronomical</option></select></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="n scale" value={rows[0]} /><Stat label="α(n)" value={rows[1]} tone="success" /><Stat label="interpretation" value={rows[2]} tone="warning" /></div>
    </Figure>
  );
}

export function CLRS4DisjointSetCertificateLab() {
  const [issue, setIssue] = useState<"valid" | "cycle" | "rank" | "representative" | "complexity">("valid");
  const checks = {
    "parent graph is a forest": issue !== "cycle",
    "roots identify partition": issue !== "representative",
    "rank rule maintained": issue !== "rank",
    "bound covers operation sequence": issue !== "complexity",
  };
  return (
    <Figure caption="A disjoint-set certificate checks forest acyclicity, representative consistency, rank updates, path-compression rewrites, and the quantifiers in the sequence bound.">
      <label className="text-sm font-semibold text-primary">audit scenario<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={issue} onChange={(event) => setIssue(event.target.value as typeof issue)}><option value="valid">valid structure</option><option value="cycle">parent cycle</option><option value="rank">bad rank increment</option><option value="representative">split representative</option><option value="complexity">claims worst-case O(1)</option></select></label>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{Object.entries(checks).map(([name, ok]) => <div key={name} className={`border p-3 text-center text-xs ${ok ? "border-success text-success" : "border-danger text-danger"}`}>{name}<div className="mt-1 font-mono">{ok ? "pass" : "fail"}</div></div>)}</div>
    </Figure>
  );
}
