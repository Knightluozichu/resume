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

export function CLRS4RBPropertiesLab() {
  const [property, setProperty] = useState(3);
  const properties = [
    ["node colors", "every node is red or black"],
    ["root", "the root is black"],
    ["leaves", "every NIL leaf is black"],
    ["red rule", "a red node has black children"],
    ["black height", "all paths to descendant NIL leaves contain the same black count"],
  ];
  return (
    <Figure caption="Five red-black properties constrain local colors and every root-to-leaf path while leaving the binary-search-tree key order unchanged.">
      <label className="text-sm font-semibold text-primary">property {property + 1} / 5<input className="mt-2 w-full accent-current" type="range" min="0" max="4" value={property} onChange={(event) => setProperty(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-5 gap-2">{properties.map(([name], index) => <div key={name} className={`border p-2 text-center text-xs ${index === property ? "border-danger bg-danger/10 text-danger" : "border-border text-secondary"}`}>{name}</div>)}</div>
      <div className="mt-3 border border-accent p-4 text-center text-sm text-accent">{properties[property][1]}</div>
    </Figure>
  );
}

export function CLRS4BlackHeightLab() {
  const [bh, setBh] = useState(3);
  const minimumNodes = 2 ** bh - 1;
  return (
    <Figure caption="A subtree of black-height b contains at least 2 to the b minus one internal nodes, proved by induction on its two child subtrees.">
      <label className="text-sm font-semibold text-primary">black-height bh = {bh}<input className="mt-2 w-full accent-current" type="range" min="0" max="8" value={bh} onChange={(event) => setBh(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="child black-height ≥" value={Math.max(0, bh - 1).toString()} /><Stat label="minimum internal nodes" value={minimumNodes.toLocaleString()} tone="success" /><Stat label="recurrence" value="N(b) ≥ 1+2N(b−1)" tone="warning" /></div>
    </Figure>
  );
}

export function CLRS4RBHeightBoundLab() {
  const [n, setN] = useState(127);
  const bound = 2 * Math.log2(n + 1);
  return (
    <Figure caption="No red node has a red child, so a longest path is at most twice a shortest all-black path, yielding height at most 2 lg(n+1).">
      <label className="text-sm font-semibold text-primary">internal nodes n = {n}<input className="mt-2 w-full accent-current" type="range" min="1" max="1023" value={n} onChange={(event) => setN(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="lg(n+1)" value={Math.log2(n + 1).toFixed(2)} /><Stat label="height upper bound" value={bound.toFixed(2)} tone="success" /><Stat label="BST operation" value="O(lg n)" tone="warning" /></div>
    </Figure>
  );
}

export function CLRS4LeftRotationLab() {
  const [rotated, setRotated] = useState(false);
  return (
    <Figure caption="LEFT-ROTATE promotes x's right child y and moves y's left subtree between x and y without changing inorder key order.">
      <label className="block border border-border p-3 text-sm text-secondary"><input className="mr-2 accent-current" type="checkbox" checked={rotated} onChange={(event) => setRotated(event.target.checked)} />apply LEFT-ROTATE at x</label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="subtree root" value={rotated ? "y" : "x"} tone="success" /><Stat label="middle subtree β" value={rotated ? "x.right" : "y.left"} tone="warning" /><Stat label="inorder" value="α, x, β, y, γ" /></div>
    </Figure>
  );
}

export function CLRS4RotationInvariantLab() {
  const [issue, setIssue] = useState<"valid" | "parent stale" | "root stale" | "beta lost">("valid");
  const checks = {
    "inorder preserved": issue !== "beta lost",
    "parent links repaired": issue !== "parent stale",
    "root link repaired": issue !== "root stale",
    "node colors unchanged": true,
  };
  return (
    <Figure caption="A rotation is a constant-size pointer rewrite whose contract preserves inorder sequence and repairs every parent/root edge.">
      <label className="text-sm font-semibold text-primary">rotation audit<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={issue} onChange={(event) => setIssue(event.target.value as typeof issue)}><option value="valid">valid</option><option value="parent stale">parent stale</option><option value="root stale">root stale</option><option value="beta lost">middle subtree lost</option></select></label>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{Object.entries(checks).map(([name, ok]) => <div key={name} className={`border p-3 text-center text-xs ${ok ? "border-success text-success" : "border-danger text-danger"}`}>{name}<div className="mt-1 font-mono">{ok ? "pass" : "fail"}</div></div>)}</div>
    </Figure>
  );
}

export function CLRS4RBInsertTraceLab() {
  const [step, setStep] = useState(0);
  const stages = [
    ["BST insert", "new node z enters as a red leaf"],
    ["detect", "only red parent / red child can be violated"],
    ["fix", "recolor and rotate while moving violation upward"],
    ["finish", "color root black"],
  ];
  return (
    <Figure caption="Red-black insertion starts with ordinary BST placement, colors the leaf red, and repairs only a possible red-red edge.">
      <label className="text-sm font-semibold text-primary">insert fixup stage = {step + 1}<input className="mt-2 w-full accent-current" type="range" min="0" max="3" value={step} onChange={(event) => setStep(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-4 gap-2">{stages.map(([name], index) => <div key={name} className={`border p-3 text-center text-xs ${index === step ? "border-danger bg-danger/10 text-danger" : index < step ? "border-success text-success" : "border-border text-secondary"}`}>{name}</div>)}</div>
      <div className="mt-3 border border-accent p-4 text-center text-sm text-accent">{stages[step][1]}</div>
    </Figure>
  );
}

export function CLRS4RBInsertCasesLab() {
  const [caseId, setCaseId] = useState<"uncle red" | "triangle" | "line">("uncle red");
  const rows = {
    "uncle red": ["recolor parent and uncle black", "grandparent red", "move z upward"],
    triangle: ["rotate parent toward line", "convert geometry", "continue as line"],
    line: ["recolor parent/grandparent", "rotate grandparent", "violation resolved"],
  }[caseId];
  return (
    <Figure caption="Insertion fixup distinguishes uncle color and triangle versus line geometry; mirror cases swap left and right.">
      <label className="text-sm font-semibold text-primary">insert case<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={caseId} onChange={(event) => setCaseId(event.target.value as typeof caseId)}><option value="uncle red">uncle red</option><option value="triangle">uncle black, triangle</option><option value="line">uncle black, line</option></select></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="color action" value={rows[0]} /><Stat label="rotation action" value={rows[1]} tone="warning" /><Stat label="progress" value={rows[2]} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4RBDeleteTraceLab() {
  const [stage, setStage] = useState(0);
  const stages = [
    ["BST delete", "move or remove successor as in ordinary BST"],
    ["remember color", "only deleting a black node reduces path black count"],
    ["extra black", "x carries one missing black unit"],
    ["fixup", "move, absorb, or eliminate the extra black"],
  ];
  return (
    <Figure caption="Deletion records the color of the node physically removed; fixup runs only when a black contribution disappeared.">
      <label className="text-sm font-semibold text-primary">delete stage = {stage + 1}<input className="mt-2 w-full accent-current" type="range" min="0" max="3" value={stage} onChange={(event) => setStage(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-4 gap-2">{stages.map(([name], index) => <div key={name} className={`border p-3 text-center text-xs ${index === stage ? "border-warning bg-warning/10 text-warning" : index < stage ? "border-success text-success" : "border-border text-secondary"}`}>{name}</div>)}</div>
      <div className="mt-3 border border-accent p-4 text-center text-sm text-accent">{stages[stage][1]}</div>
    </Figure>
  );
}

export function CLRS4RBDeleteCasesLab() {
  const [caseId, setCaseId] = useState<"red sibling" | "black two black" | "near red" | "far red">("black two black");
  const rows = {
    "red sibling": ["recolor sibling/parent", "rotate parent", "convert to black-sibling case"],
    "black two black": ["recolor sibling red", "move extra black to parent", "may iterate upward"],
    "near red": ["recolor near child/sibling", "rotate sibling", "convert to far-red case"],
    "far red": ["copy parent color to sibling", "rotate parent", "extra black eliminated"],
  }[caseId];
  return (
    <Figure caption="Deletion fixup classifies sibling and child colors; each case either converts to a later case, moves the deficit upward, or finishes.">
      <label className="text-sm font-semibold text-primary">delete case<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={caseId} onChange={(event) => setCaseId(event.target.value as typeof caseId)}><option value="red sibling">sibling red</option><option value="black two black">sibling black, both children black</option><option value="near red">near child red</option><option value="far red">far child red</option></select></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="recolor" value={rows[0]} /><Stat label="rotation / move" value={rows[1]} tone="warning" /><Stat label="progress" value={rows[2]} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4RBCertificateLab() {
  const [issue, setIssue] = useState<"valid" | "red-red" | "black mismatch" | "red root" | "nil red">("valid");
  const checks = {
    "root black": issue !== "red root",
    "NIL leaves black": issue !== "nil red",
    "red children black": issue !== "red-red",
    "equal path black-height": issue !== "black mismatch",
  };
  return (
    <Figure caption="A red-black certificate computes black-height bottom-up while checking root, NIL leaves, and red-child rules.">
      <label className="text-sm font-semibold text-primary">tree audit<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={issue} onChange={(event) => setIssue(event.target.value as typeof issue)}><option value="valid">valid</option><option value="red-red">red-red edge</option><option value="black mismatch">black-height mismatch</option><option value="red root">red root</option><option value="nil red">nonblack NIL</option></select></label>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{Object.entries(checks).map(([name, ok]) => <div key={name} className={`border p-3 text-center text-xs ${ok ? "border-success text-success" : "border-danger text-danger"}`}>{name}<div className="mt-1 font-mono">{ok ? "pass" : "fail"}</div></div>)}</div>
    </Figure>
  );
}
