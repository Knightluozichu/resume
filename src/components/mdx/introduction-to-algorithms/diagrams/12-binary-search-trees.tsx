"use client";

import { useState, type ReactNode } from "react";

function Panel({ children }: { children: ReactNode }) {
  return <div className="border border-border bg-elevated p-4 sm:p-5">{children}</div>;
}

function Caption({ children }: { children: ReactNode }) {
  return <figcaption className="mt-2 text-center text-sm text-secondary">{children}</figcaption>;
}

function Figure({ children, caption }: { children: ReactNode; caption: string }) {
  return <figure className="mdx-figure not-prose mx-auto my-6"><Panel>{children}</Panel><Caption>{caption}</Caption></figure>;
}

function Stat({ label, value, tone = "accent" }: { label: string; value: string; tone?: "accent" | "warning" | "success" | "danger" }) {
  const classes = { accent: "border-accent text-accent", warning: "border-warning text-warning", success: "border-success text-success", danger: "border-danger text-danger" }[tone];
  return <div className={`border p-3 text-center ${classes}`}><div className="text-xs">{label}</div><div className="mt-1 break-words font-mono text-base">{value}</div></div>;
}

const bst = [15, 6, 18, 3, 7, 17, 20, 2, 4, 13, 9];

export function CLRS4BSTInvariantLab() {
  const [node, setNode] = useState(6);
  const rows: Record<number, [string, string]> = {
    15: ["2,3,4,6,7,9,13", "17,18,20"],
    6: ["2,3,4", "7,9,13"],
    18: ["17", "20"],
    7: ["none", "9,13"],
  };
  const selected = rows[node] ?? ["leaf", "leaf"];
  return (
    <Figure caption="The binary-search-tree property applies to every subtree: all left keys precede the node and all right keys follow it under the duplicate policy.">
      <label className="text-sm font-semibold text-primary">subtree root<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={node} onChange={(event) => setNode(Number(event.target.value))}><option value="15">15</option><option value="6">6</option><option value="18">18</option><option value="7">7</option></select></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="left-subtree keys" value={selected[0]} tone="success" /><Stat label="root" value={node.toString()} /><Stat label="right-subtree keys" value={selected[1]} tone="warning" /></div>
    </Figure>
  );
}

function searchPath(target: number) {
  const children: Record<number, [number | null, number | null]> = {
    15: [6, 18], 6: [3, 7], 18: [17, 20], 3: [2, 4], 7: [null, 13], 13: [9, null], 2: [null, null], 4: [null, null], 9: [null, null], 17: [null, null], 20: [null, null],
  };
  const path: number[] = [];
  let current: number | null = 15;
  while (current !== null) {
    path.push(current);
    if (target === current) break;
    current = children[current][target < current ? 0 : 1];
  }
  return path;
}

export function CLRS4BSTSearchPathLab() {
  const [target, setTarget] = useState(13);
  const path = searchPath(target);
  const found = path.at(-1) === target;
  return (
    <Figure caption="BST search compares once per level and discards one whole subtree according to the target's relation to the current key.">
      <label className="text-sm font-semibold text-primary">target key = {target}<input className="mt-2 w-full accent-current" type="range" min="1" max="21" value={target} onChange={(event) => setTarget(Number(event.target.value))} /></label>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">{path.map((value, index) => <div key={index} className={`border p-3 font-mono ${index === path.length - 1 ? found ? "border-success text-success" : "border-danger text-danger" : "border-accent text-accent"}`}>{value}{index < path.length - 1 ? " →" : ""}</div>)}</div>
      <div className="mt-3 text-center text-sm text-secondary">{found ? `found in ${path.length} comparisons` : `nil reached after ${path.length} comparisons`}</div>
    </Figure>
  );
}

export function CLRS4InorderLab() {
  const [visited, setVisited] = useState(6);
  const order = [2, 3, 4, 6, 7, 9, 13, 15, 17, 18, 20];
  return (
    <Figure caption="Inorder traversal visits left subtree, node, then right subtree, producing keys in nondecreasing order.">
      <label className="text-sm font-semibold text-primary">inorder outputs = {visited}<input className="mt-2 w-full accent-current" type="range" min="0" max={order.length} value={visited} onChange={(event) => setVisited(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-6 gap-2 sm:grid-cols-11">{order.map((value, index) => <div key={value} className={`border p-2 text-center font-mono ${index < visited ? "border-success bg-success/10 text-success" : "border-border text-secondary"}`}>{value}</div>)}</div>
    </Figure>
  );
}

export function CLRS4MinMaxLab() {
  const [direction, setDirection] = useState<"minimum" | "maximum">("minimum");
  const path = direction === "minimum" ? [15, 6, 3, 2] : [15, 18, 20];
  return (
    <Figure caption="The minimum follows left pointers until nil; the maximum follows right pointers, each taking time proportional to subtree height.">
      <label className="text-sm font-semibold text-primary">query<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={direction} onChange={(event) => setDirection(event.target.value as typeof direction)}><option value="minimum">minimum</option><option value="maximum">maximum</option></select></label>
      <div className="mt-4 flex items-center justify-center gap-2">{path.map((value, index) => <div key={value} className={`border p-3 font-mono ${index === path.length - 1 ? "border-success text-success" : "border-accent text-accent"}`}>{value}</div>)}</div>
      <div className="mt-3 text-center text-sm text-secondary">answer = {path.at(-1)}</div>
    </Figure>
  );
}

export function CLRS4SuccessorLab() {
  const [key, setKey] = useState<"7" | "13" | "15" | "20">("13");
  const rows = {
    "7": ["right subtree exists", "minimum of subtree rooted at 13", "9"],
    "13": ["no right subtree", "first ancestor reached from a left edge", "15"],
    "15": ["right subtree exists", "minimum of subtree rooted at 18", "17"],
    "20": ["no right subtree", "no qualifying ancestor", "nil"],
  }[key];
  return (
    <Figure caption="A successor is either the minimum of the right subtree or the first ancestor for which the node lies in its left subtree.">
      <label className="text-sm font-semibold text-primary">node key<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={key} onChange={(event) => setKey(event.target.value as typeof key)}><option value="7">7</option><option value="13">13</option><option value="15">15</option><option value="20">20</option></select></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="case" value={rows[0]} /><Stat label="path" value={rows[1]} tone="warning" /><Stat label="successor" value={rows[2]} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4InsertLab() {
  const [key, setKey] = useState(8);
  const path = searchPath(key);
  const parent = path.at(-1);
  return (
    <Figure caption="BST insertion follows the same search path until nil, then attaches the new leaf to the last nonnil parent.">
      <label className="text-sm font-semibold text-primary">new key = {key}<input className="mt-2 w-full accent-current" type="range" min="1" max="21" value={key} onChange={(event) => setKey(Number(event.target.value))} /></label>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">{path.map((value, index) => <div key={index} className="border border-accent p-3 font-mono text-accent">{value}</div>)}<div className="border border-success bg-success/10 p-3 font-mono text-success">{key}</div></div>
      <div className="mt-3 text-center text-sm text-secondary">{bst.includes(key) ? "duplicate policy required" : `attach as ${key < (parent ?? key) ? "left" : "right"} child of ${parent}`}</div>
    </Figure>
  );
}

export function CLRS4DeleteCaseLab() {
  const [target, setTarget] = useState<"2" | "13" | "6">("6");
  const rows = {
    "2": ["no left child", "replace by right child (nil)", "leaf removed"],
    "13": ["one left child", "replace by child 9", "single splice"],
    "6": ["two children", "use successor 7", "successor moves into position"],
  }[target];
  return (
    <Figure caption="BST deletion has three structural cases based on missing children; the two-child case moves the successor into the removed node's position.">
      <label className="text-sm font-semibold text-primary">delete target<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={target} onChange={(event) => setTarget(event.target.value as typeof target)}><option value="2">2 (leaf)</option><option value="13">13 (one child)</option><option value="6">6 (two children)</option></select></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="case" value={rows[0]} /><Stat label="replacement" value={rows[1]} tone="warning" /><Stat label="effect" value={rows[2]} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4TransplantLab() {
  const [v, setV] = useState<"nil" | "right child" | "successor">("successor");
  const rows = {
    nil: ["parent child pointer → nil", "root may become nil", "removed subtree"],
    "right child": ["parent child pointer → v", "v.parent → old parent", "child promoted"],
    successor: ["old position → successor", "successor.parent repaired", "children attached separately"],
  }[v];
  return (
    <Figure caption="TRANSPLANT replaces one subtree root in its parent link and repairs the replacement parent pointer; callers attach any remaining children.">
      <label className="text-sm font-semibold text-primary">replacement v<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={v} onChange={(event) => setV(event.target.value as typeof v)}><option value="nil">nil</option><option value="right child">right child</option><option value="successor">successor</option></select></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="incoming link" value={rows[0]} /><Stat label="parent repair" value={rows[1]} tone="warning" /><Stat label="reading" value={rows[2]} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4HeightShapeLab() {
  const [shape, setShape] = useState<"balanced" | "random-like" | "chain">("balanced");
  const rows = {
    balanced: ["h ≈ lg n", "search/insert/delete O(lg n)", "good"],
    "random-like": ["expected h = O(lg n)", "depends on random insertion model", "expected"],
    chain: ["h = n−1", "operations Θ(n)", "degenerate"],
  }[shape];
  return (
    <Figure caption="Every basic BST operation follows a root-to-leaf path, so tree height rather than node count alone controls cost.">
      <label className="text-sm font-semibold text-primary">tree shape<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={shape} onChange={(event) => setShape(event.target.value as typeof shape)}><option value="balanced">balanced</option><option value="random-like">random insertion</option><option value="chain">sorted insertion chain</option></select></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="height" value={rows[0]} /><Stat label="operation cost" value={rows[1]} tone="warning" /><Stat label="guarantee" value={rows[2]} tone={shape === "chain" ? "danger" : "success"} /></div>
    </Figure>
  );
}

export function CLRS4BSTCertificateLab() {
  const [issue, setIssue] = useState<"valid" | "bad order" | "bad parent" | "cycle" | "duplicate drift">("valid");
  const checks = {
    "subtree ordering": issue !== "bad order",
    "parent/child inverse": issue !== "bad parent",
    "acyclic rooted shape": issue !== "cycle",
    "duplicate policy": issue !== "duplicate drift",
  };
  return (
    <Figure caption="A BST certificate verifies global subtree ordering, bidirectional links, acyclicity, and one consistent duplicate-key policy.">
      <label className="text-sm font-semibold text-primary">audit scenario<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={issue} onChange={(event) => setIssue(event.target.value as typeof issue)}><option value="valid">valid</option><option value="bad order">bad subtree key</option><option value="bad parent">bad parent link</option><option value="cycle">cycle</option><option value="duplicate drift">duplicate drift</option></select></label>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{Object.entries(checks).map(([name, ok]) => <div key={name} className={`border p-3 text-center text-xs ${ok ? "border-success text-success" : "border-danger text-danger"}`}>{name}<div className="mt-1 font-mono">{ok ? "pass" : "fail"}</div></div>)}</div>
    </Figure>
  );
}
