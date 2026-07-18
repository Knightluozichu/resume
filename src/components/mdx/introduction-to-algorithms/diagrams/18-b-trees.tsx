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

function Page({ keys, active, tone = "accent" }: { keys: number[]; active?: number; tone?: "accent" | "warning" | "success" | "danger" }) {
  const border = { accent: "border-accent", warning: "border-warning", success: "border-success", danger: "border-danger" }[tone];
  return <div className={`flex min-h-12 items-stretch border-2 ${border}`}>{keys.map((key) => <div key={key} className={`min-w-10 flex-1 border-r border-border p-3 text-center font-mono text-sm last:border-r-0 ${active === key ? "bg-accent text-accent-foreground" : "text-primary"}`}>{key}</div>)}</div>;
}

export function CLRS4BTreeFanoutLab() {
  const [degree, setDegree] = useState(3);
  return (
    <Figure caption="A B-tree page packs many sorted keys and child pointers, trading more CPU comparisons per node for far fewer external-memory page accesses.">
      <label className="text-sm font-semibold text-primary">minimum degree t = {degree}<input className="mt-2 w-full accent-current" type="range" min="2" max="8" value={degree} onChange={(event) => setDegree(Number(event.target.value))} /></label>
      <div className="mt-4"><Page keys={Array.from({ length: 2 * degree - 1 }, (_, index) => (index + 1) * 10)} /></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="max keys / page" value={(2 * degree - 1).toString()} /><Stat label="max children" value={(2 * degree).toString()} tone="success" /><Stat label="min nonroot keys" value={(degree - 1).toString()} tone="warning" /></div>
    </Figure>
  );
}

export function CLRS4BTreeInvariantLab() {
  const [role, setRole] = useState<"root" | "internal" | "leaf">("internal");
  const [keys, setKeys] = useState(3);
  const degree = 3;
  const min = role === "root" ? 1 : degree - 1;
  const max = 2 * degree - 1;
  const valid = keys >= min && keys <= max;
  return (
    <Figure caption="Every nonroot node has between t−1 and 2t−1 keys, internal nodes have one more child than keys, and every leaf has the same depth.">
      <div className="grid gap-3 sm:grid-cols-2"><label className="text-sm text-primary">node role<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={role} onChange={(event) => setRole(event.target.value as typeof role)}><option value="root">root</option><option value="internal">internal</option><option value="leaf">leaf</option></select></label><label className="text-sm text-primary">key count = {keys}<input className="mt-2 w-full accent-current" type="range" min="0" max="6" value={keys} onChange={(event) => setKeys(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="allowed range" value={`${min}…${max}`} /><Stat label="child count" value={role === "leaf" ? "0" : (keys + 1).toString()} /><Stat label="valid occupancy" value={valid ? "yes" : "no"} tone={valid ? "success" : "danger"} /></div>
    </Figure>
  );
}

export function CLRS4BTreeHeightLab() {
  const [degree, setDegree] = useState(4);
  const [nodes, setNodes] = useState(1000000);
  const bound = Math.floor(Math.log((nodes + 1) / 2) / Math.log(degree));
  return (
    <Figure caption="Large minimum degree makes B-tree height tiny: each nonroot internal node has at least t children, so one page access eliminates a large key range.">
      <div className="grid gap-3 sm:grid-cols-2"><label className="text-sm text-primary">minimum degree t = {degree}<input className="mt-2 w-full accent-current" type="range" min="2" max="32" value={degree} onChange={(event) => setDegree(Number(event.target.value))} /></label><label className="text-sm text-primary">stored keys = {nodes.toLocaleString()}<input className="mt-2 w-full accent-current" type="range" min="1000" max="5000000" step="1000" value={nodes} onChange={(event) => setNodes(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="height upper bound" value={bound.toString()} tone="success" /><Stat label="page levels" value={(bound + 1).toString()} /><Stat label="binary-tree log2 n" value={Math.ceil(Math.log2(nodes)).toString()} tone="warning" /></div>
    </Figure>
  );
}

const searchKeys = [8, 17, 26, 41, 55];

export function CLRS4BTreeSearchLab() {
  const [target, setTarget] = useState(26);
  const index = searchKeys.findIndex((key) => target <= key);
  const hit = searchKeys.includes(target);
  const child = index === -1 ? searchKeys.length : index;
  return (
    <Figure caption="Search locates the first page key not smaller than the target; equality returns, otherwise the corresponding child page contains the only possible range.">
      <label className="text-sm font-semibold text-primary">target key = {target}<input className="mt-2 w-full accent-current" type="range" min="1" max="65" value={target} onChange={(event) => setTarget(Number(event.target.value))} /></label>
      <div className="mt-4"><Page keys={searchKeys} active={hit ? target : undefined} /></div>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="page result" value={hit ? `found slot ${searchKeys.indexOf(target)}` : `descend child ${child}`} tone={hit ? "success" : "warning"} /><Stat label="page I/O" value="1" /></div>
    </Figure>
  );
}

export function CLRS4SplitChildLab() {
  const [split, setSplit] = useState(false);
  return (
    <Figure caption="Splitting a full 2t−1-key child promotes its median into the parent and leaves t−1 keys on each side before descent.">
      <button type="button" className="border border-accent px-4 py-2 text-sm text-accent" onClick={() => setSplit((value) => !value)}>{split ? "restore full child" : "split full child"}</button>
      <div className="mt-4 space-y-4">{split ? <><div className="mx-auto max-w-32"><Page keys={[15]} tone="success" /></div><div className="grid grid-cols-2 gap-6"><Page keys={[5, 10]} /><Page keys={[20, 25]} /></div></> : <Page keys={[5, 10, 15, 20, 25]} tone="warning" />}</div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="minimum degree" value="3" /><Stat label="promoted median" value={split ? "15" : "pending"} tone="warning" /><Stat label="child occupancy" value={split ? "2 and 2" : "5 full"} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4BTreeInsertLab() {
  const [stage, setStage] = useState(0);
  const stages = [
    ["inspect root", "root is nonfull, choose child range for key 17"],
    ["split before descent", "target child is full, promote its median"],
    ["choose new side", "compare 17 with promoted separator 15"],
    ["insert in leaf", "shift larger keys and write 17 into a nonfull leaf"],
  ];
  return (
    <Figure caption="Top-down insertion never descends into a full child; it splits first, so the final leaf always has space for the new key.">
      <label className="text-sm font-semibold text-primary">insert 17 · stage {stage + 1}<input className="mt-2 w-full accent-current" type="range" min="0" max="3" value={stage} onChange={(event) => setStage(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-4 gap-2">{stages.map(([name], index) => <div key={name} className={`border p-3 text-center text-xs ${index === stage ? "border-accent bg-accent/10 text-accent" : index < stage ? "border-success text-success" : "border-border text-secondary"}`}>{name}</div>)}</div>
      <div className="mt-3 border border-warning p-4 text-center text-sm text-warning">{stages[stage][1]}</div>
    </Figure>
  );
}

export function CLRS4BTreeDeleteCaseLab() {
  const [kind, setKind] = useState<"leaf" | "predecessor" | "successor" | "merge">("leaf");
  const rows = {
    leaf: ["key is in a leaf", "delete directly", "leaf remains at least t−1 keys"],
    predecessor: ["key is internal; left child has at least t keys", "replace by predecessor", "delete predecessor recursively"],
    successor: ["key is internal; right child has at least t keys", "replace by successor", "delete successor recursively"],
    merge: ["both adjacent children have t−1 keys", "merge child + separator + child", "recurse into 2t−1-key node"],
  }[kind];
  return (
    <Figure caption="Deleting a key found in an internal node uses a predecessor, successor, or merge according to adjacent child occupancy.">
      <label className="text-sm font-semibold text-primary">deletion case<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={kind} onChange={(event) => setKind(event.target.value as typeof kind)}><option value="leaf">leaf</option><option value="predecessor">use predecessor</option><option value="successor">use successor</option><option value="merge">merge children</option></select></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="condition" value={rows[0]} /><Stat label="action" value={rows[1]} tone="warning" /><Stat label="next step" value={rows[2]} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4BorrowSiblingLab() {
  const [borrowed, setBorrowed] = useState(false);
  return (
    <Figure caption="Before descending into a minimum-size child, rotate one key through the parent from a sibling with at least t keys; key order and occupancy both remain valid.">
      <button type="button" className="border border-accent px-4 py-2 text-sm text-accent" onClick={() => setBorrowed((value) => !value)}>{borrowed ? "undo borrow" : "borrow from left sibling"}</button>
      <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-3"><Page keys={borrowed ? [5, 10] : [5, 10, 15]} tone="success" /><Page keys={[borrowed ? 15 : 20]} tone="warning" /><Page keys={borrowed ? [20, 25, 30] : [25, 30]} /></div>
      <div className="mt-3 text-center text-sm text-secondary">{borrowed ? "15 rises to parent; 20 descends into target child" : "target child has t−1 keys and sibling can lend"}</div>
    </Figure>
  );
}

export function CLRS4MergeRootLab() {
  const [merged, setMerged] = useState(false);
  return (
    <Figure caption="Merging two minimum children with their separator can empty the root; replacing it by the merged child is the only operation that decreases B-tree height.">
      <button type="button" className="border border-accent px-4 py-2 text-sm text-accent" onClick={() => setMerged((value) => !value)}>{merged ? "restore root" : "merge through root"}</button>
      <div className="mt-4 space-y-4">{merged ? <div className="mx-auto max-w-md"><Page keys={[5, 10, 15, 20, 25]} tone="success" /></div> : <><div className="mx-auto max-w-20"><Page keys={[15]} tone="warning" /></div><div className="grid grid-cols-2 gap-6"><Page keys={[5, 10]} /><Page keys={[20, 25]} /></div></>}</div>
      <div className="mt-3 text-center text-sm text-secondary">height {merged ? "decreases from 1 to 0" : "is 1"}</div>
    </Figure>
  );
}

export function CLRS4BTreeCertificateLab() {
  const [issue, setIssue] = useState<"valid" | "order" | "occupancy" | "depth" | "descent">("valid");
  const checks = {
    "keys and child ranges sorted": issue !== "order",
    "occupancy within t bounds": issue !== "occupancy",
    "all leaves same depth": issue !== "depth",
    "descent child prepared": issue !== "descent",
  };
  return (
    <Figure caption="A B-tree certificate checks sorted separators, child-range partitioning, occupancy, equal leaf depth, and the top-down precondition before every descent.">
      <label className="text-sm font-semibold text-primary">audit scenario<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={issue} onChange={(event) => setIssue(event.target.value as typeof issue)}><option value="valid">valid tree</option><option value="order">bad key range</option><option value="occupancy">underfull node</option><option value="depth">unequal leaf depth</option><option value="descent">descend into minimum child</option></select></label>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{Object.entries(checks).map(([name, ok]) => <div key={name} className={`border p-3 text-center text-xs ${ok ? "border-success text-success" : "border-danger text-danger"}`}>{name}<div className="mt-1 font-mono">{ok ? "pass" : "fail"}</div></div>)}</div>
    </Figure>
  );
}
