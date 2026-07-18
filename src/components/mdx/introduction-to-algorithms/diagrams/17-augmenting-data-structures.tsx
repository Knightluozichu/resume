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

const ordered = [5, 8, 12, 15, 19, 25, 30];

function TreeRows({ active }: { active?: number }) {
  const node = (value: number, size: number) => <div className={`mx-auto w-20 border p-2 text-center ${active === value ? "border-accent bg-accent/10 text-accent" : "border-border text-primary"}`}><div className="font-mono font-semibold">{value}</div><div className="text-[10px] text-secondary">size={size}</div></div>;
  return (
    <div className="space-y-3">
      <div>{node(15, 7)}</div>
      <div className="grid grid-cols-2 gap-8"><div>{node(8, 3)}</div><div>{node(25, 3)}</div></div>
      <div className="grid grid-cols-4 gap-2"><div>{node(5, 1)}</div><div>{node(12, 1)}</div><div>{node(19, 1)}</div><div>{node(30, 1)}</div></div>
    </div>
  );
}

export function CLRS4OrderStatisticTreeLab() {
  const [inserted, setInserted] = useState(false);
  return (
    <Figure caption="An order-statistic tree is a red-black tree whose size field counts every node in the rooted subtree, including the node itself.">
      <label className="flex items-center gap-3 text-sm font-semibold text-primary"><input type="checkbox" checked={inserted} onChange={(event) => setInserted(event.target.checked)} />insert key 10 and repair sizes upward</label>
      <div className="mt-4"><TreeRows active={inserted ? 8 : undefined} /></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="root size before" value="7" /><Stat label="changed ancestors" value={inserted ? "8, 15" : "none"} tone="warning" /><Stat label="root size after" value={inserted ? "8" : "7"} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4OSSelectPathLab() {
  const [rank, setRank] = useState(4);
  const key = ordered[rank - 1];
  const path = rank === 4 ? "15" : rank < 4 ? `15 → 8 → ${key}` : `15 → 25 → ${key}`;
  return (
    <Figure caption="OS-SELECT compares i with left-subtree size plus one, then descends left or right with an adjusted rank.">
      <label className="text-sm font-semibold text-primary">requested rank i = {rank}<input className="mt-2 w-full accent-current" type="range" min="1" max="7" value={rank} onChange={(event) => setRank(Number(event.target.value))} /></label>
      <div className="mt-4"><TreeRows active={key} /></div>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="search path" value={path} /><Stat label="i-th smallest" value={key.toString()} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4OSRankPathLab() {
  const [key, setKey] = useState(19);
  const index = ordered.indexOf(key);
  const local = ({ 5: 1, 8: 2, 12: 1, 15: 4, 19: 1, 25: 2, 30: 1 } as Record<number, number>)[key];
  const added = ({ 5: 0, 8: 0, 12: 2, 15: 0, 19: 4, 25: 4, 30: 6 } as Record<number, number>)[key];
  return (
    <Figure caption="OS-RANK starts with the node's local left size and adds parent-left size plus the parent whenever climbing from a right child.">
      <label className="text-sm font-semibold text-primary">node key<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={key} onChange={(event) => setKey(Number(event.target.value))}>{ordered.map((value) => <option key={value} value={value}>{value}</option>)}</select></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="local contribution" value={local.toString()} /><Stat label="ancestor additions" value={added.toString()} tone="warning" /><Stat label="global rank" value={(index + 1).toString()} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4AugmentationDependencyLab() {
  const [field, setField] = useState<"size" | "max" | "depth">("size");
  const rows = {
    size: ["size[x]", "size[left], size[right]", "local and maintainable"],
    max: ["max[x]", "interval.high, max[left], max[right]", "local and maintainable"],
    depth: ["depth[x]", "all ancestors", "not child-local"],
  }[field];
  return (
    <Figure caption="The augmentation theorem applies when a field can be recomputed from the node and its children; ancestor-dependent fields need a different argument.">
      <label className="text-sm font-semibold text-primary">candidate field<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={field} onChange={(event) => setField(event.target.value as typeof field)}><option value="size">subtree size</option><option value="max">interval max</option><option value="depth">node depth</option></select></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="field" value={rows[0]} /><Stat label="dependencies" value={rows[1]} tone="warning" /><Stat label="verdict" value={rows[2]} tone={field === "depth" ? "danger" : "success"} /></div>
    </Figure>
  );
}

export function CLRS4RotationRepairLab() {
  const [rotated, setRotated] = useState(false);
  return (
    <Figure caption="A rotation preserves every subtree outside x and y; recomputing the lower node first and the new parent second repairs a child-local field in constant time.">
      <button type="button" className="border border-accent px-4 py-2 text-sm text-accent" onClick={() => setRotated((value) => !value)}>{rotated ? "undo rotation" : "rotate left at x"}</button>
      <div className="mt-4 grid grid-cols-2 gap-4 text-center"><div className={`border p-4 ${rotated ? "border-border text-secondary" : "border-accent text-accent"}`}><div className="font-mono">x → y</div><div className="mt-2 text-xs">repair x, then y</div></div><div className={`border p-4 ${rotated ? "border-success text-success" : "border-border text-secondary"}`}><div className="font-mono">y ← x</div><div className="mt-2 text-xs">same inorder sequence</div></div></div>
    </Figure>
  );
}

export function CLRS4AugmentationChecklistLab() {
  const [step, setStep] = useState(0);
  const steps = [
    ["base structure", "choose a tree that already supports update and traversal invariants"],
    ["extra field", "define exact semantics and NIL sentinel value"],
    ["maintenance", "repair along search paths and after rotations"],
    ["new operation", "prove pruning or rank decisions from the maintained field"],
  ];
  return (
    <Figure caption="The four-step augmentation method separates choosing a base structure, defining metadata, maintaining it, and proving the new operation.">
      <label className="text-sm font-semibold text-primary">design step = {step + 1}<input className="mt-2 w-full accent-current" type="range" min="0" max="3" value={step} onChange={(event) => setStep(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-4 gap-2">{steps.map(([name], index) => <div key={name} className={`border p-3 text-center text-xs ${index === step ? "border-accent bg-accent/10 text-accent" : index < step ? "border-success text-success" : "border-border text-secondary"}`}>{name}</div>)}</div>
      <div className="mt-3 border border-warning p-4 text-center text-sm text-warning">{steps[step][1]}</div>
    </Figure>
  );
}

type Interval = { name: string; low: number; high: number };
const intervals: Interval[] = [
  { name: "a", low: 5, high: 8 },
  { name: "b", low: 8, high: 9 },
  { name: "c", low: 15, high: 23 },
  { name: "d", low: 16, high: 21 },
  { name: "e", low: 17, high: 19 },
  { name: "f", low: 25, high: 30 },
  { name: "g", low: 26, high: 26 },
];

function overlaps(left: Interval, right: Interval) {
  return left.low <= right.high && right.low <= left.high;
}

export function CLRS4IntervalOverlapLab() {
  const [low, setLow] = useState(20);
  const [high, setHigh] = useState(22);
  const query = { name: "q", low: Math.min(low, high), high: Math.max(low, high) };
  const hits = intervals.filter((item) => overlaps(item, query));
  return (
    <Figure caption="Closed intervals overlap exactly when each interval starts no later than the other interval ends; endpoint policy belongs in the contract.">
      <div className="grid gap-3 sm:grid-cols-2"><label className="text-sm text-primary">query low = {low}<input className="mt-2 w-full accent-current" type="range" min="0" max="30" value={low} onChange={(event) => setLow(Number(event.target.value))} /></label><label className="text-sm text-primary">query high = {high}<input className="mt-2 w-full accent-current" type="range" min="0" max="30" value={high} onChange={(event) => setHigh(Number(event.target.value))} /></label></div>
      <div className="mt-4 flex flex-wrap gap-2">{intervals.map((item) => <div key={item.name} className={`border px-3 py-2 font-mono text-xs ${hits.includes(item) ? "border-success text-success" : "border-border text-secondary"}`}>{item.name} [{item.low},{item.high}]</div>)}</div>
      <div className="mt-3 text-center text-sm text-primary">overlaps: {hits.map((item) => item.name).join(", ") || "none"}</div>
    </Figure>
  );
}

export function CLRS4IntervalTreeMaxLab() {
  const [subtree, setSubtree] = useState<"left" | "root" | "right">("root");
  const rows = {
    left: ["rooted at [8,9]", "23", "max of node high and child maxima"],
    root: ["rooted at [16,21]", "30", "covers the entire tree"],
    right: ["rooted at [25,30]", "30", "rightmost high endpoint"],
  }[subtree];
  return (
    <Figure caption="Each interval-tree node stores the maximum high endpoint in its subtree, so one comparison can rule out an entire left subtree.">
      <label className="text-sm font-semibold text-primary">inspect subtree<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={subtree} onChange={(event) => setSubtree(event.target.value as typeof subtree)}><option value="left">left</option><option value="root">root</option><option value="right">right</option></select></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="subtree" value={rows[0]} /><Stat label="stored max" value={rows[1]} tone="success" /><Stat label="meaning" value={rows[2]} tone="warning" /></div>
    </Figure>
  );
}

export function CLRS4IntervalSearchPathLab() {
  const [query, setQuery] = useState<"22-24" | "12-14" | "27-28">("22-24");
  const rows = {
    "22-24": ["[16,21] → [8,9] → [15,23]", "[15,23]", "left.max is 23, so search left"],
    "12-14": ["[16,21] → [8,9] → [15,23]", "none", "all candidate maxima fall below 12"],
    "27-28": ["[16,21] → [25,30]", "[25,30]", "left.max is 23 below 27, so go right"],
  }[query];
  return (
    <Figure caption="INTERVAL-SEARCH goes left only when left.max can still reach the query's low endpoint; otherwise no interval there can overlap.">
      <label className="text-sm font-semibold text-primary">query interval<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={query} onChange={(event) => setQuery(event.target.value as typeof query)}><option value="22-24">[22,24]</option><option value="12-14">[12,14]</option><option value="27-28">[27,28]</option></select></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="path" value={rows[0]} /><Stat label="result" value={rows[1]} tone={rows[1] === "none" ? "warning" : "success"} /><Stat label="pruning reason" value={rows[2]} /></div>
    </Figure>
  );
}

export function CLRS4AugmentationCertificateLab() {
  const [issue, setIssue] = useState<"valid" | "sentinel" | "rotation" | "pruning" | "semantics">("valid");
  const checks = {
    "field semantics exact": issue !== "semantics",
    "sentinel base defined": issue !== "sentinel",
    "rotations repair fields": issue !== "rotation",
    "query pruning proved": issue !== "pruning",
  };
  return (
    <Figure caption="An augmentation certificate checks metadata semantics, sentinel values, update and rotation repair, and the proof behind every pruned subtree.">
      <label className="text-sm font-semibold text-primary">audit scenario<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={issue} onChange={(event) => setIssue(event.target.value as typeof issue)}><option value="valid">valid augmentation</option><option value="sentinel">missing NIL value</option><option value="rotation">stale after rotation</option><option value="pruning">unproved pruning</option><option value="semantics">ambiguous field</option></select></label>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{Object.entries(checks).map(([name, ok]) => <div key={name} className={`border p-3 text-center text-xs ${ok ? "border-success text-success" : "border-danger text-danger"}`}>{name}<div className="mt-1 font-mono">{ok ? "pass" : "fail"}</div></div>)}</div>
    </Figure>
  );
}
