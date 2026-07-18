"use client";

import { useMemo, useState, type ReactNode } from "react";

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

const prices = [0, 1, 5, 8, 9, 10, 17, 17, 20, 24, 30];

function rodSolution(n: number) {
  const revenue = Array(n + 1).fill(0) as number[];
  const first = Array(n + 1).fill(0) as number[];
  for (let length = 1; length <= n; length += 1) {
    let best = -Infinity;
    for (let cut = 1; cut <= length; cut += 1) {
      const candidate = prices[cut] + revenue[length - cut];
      if (candidate > best) {
        best = candidate;
        first[length] = cut;
      }
    }
    revenue[length] = best;
  }
  const cuts: number[] = [];
  for (let rest = n; rest > 0; rest -= first[rest]) cuts.push(first[rest]);
  return { revenue, cuts, first };
}

export function CLRS4RodCutLab() {
  const [n, setN] = useState(7);
  const solution = rodSolution(n);
  return (
    <Figure caption="Rod cutting chooses the first piece length and combines its price with an optimal solution to the remaining suffix.">
      <label className="text-sm font-semibold text-primary">rod length n = {n}<input className="mt-2 w-full accent-current" type="range" min="1" max="10" value={n} onChange={(event) => setN(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="uncut price" value={prices[n].toString()} /><Stat label="optimal revenue" value={solution.revenue[n].toString()} tone="success" /><Stat label="cuts" value={solution.cuts.join(" + ")} tone="warning" /></div>
    </Figure>
  );
}

export function CLRS4RodTableLab() {
  const [filled, setFilled] = useState(5);
  const solution = rodSolution(10);
  return (
    <Figure caption="Bottom-up rod cutting fills shorter lengths before longer ones; a first-cut table reconstructs the revenue-maximizing solution.">
      <label className="text-sm font-semibold text-primary">table lengths solved = 0…{filled}<input className="mt-2 w-full accent-current" type="range" min="0" max="10" value={filled} onChange={(event) => setFilled(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-6 gap-2 sm:grid-cols-11">{solution.revenue.map((value, index) => <div key={index} className={`border p-2 text-center ${index <= filled ? "border-success text-success" : "border-border text-secondary"}`}><div className="font-mono">{index <= filled ? value : "?"}</div><div className="text-[10px]">r[{index}]</div></div>)}</div>
    </Figure>
  );
}

const dims = [30, 35, 15, 5, 10, 20, 25];

export function CLRS4MatrixChainCostLab() {
  const [split, setSplit] = useState(3);
  const leftDims = `${dims[0]}×${dims[split]}`;
  const rightDims = `${dims[split]}×${dims.at(-1)}`;
  const combine = dims[0] * dims[split] * (dims.at(-1) ?? 0);
  return (
    <Figure caption="A matrix-chain split at k adds two optimal subchain costs plus p_(i-1) times p_k times p_j scalar multiplications.">
      <label className="text-sm font-semibold text-primary">top-level split k = {split}<input className="mt-2 w-full accent-current" type="range" min="1" max="5" value={split} onChange={(event) => setSplit(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="left result shape" value={leftDims} /><Stat label="right result shape" value={rightDims} /><Stat label="final combine cost" value={combine.toLocaleString()} tone="warning" /></div>
    </Figure>
  );
}

export function CLRS4MatrixChainOrderLab() {
  const [stage, setStage] = useState(0);
  const stages = [
    ["length 2", "solve adjacent matrix pairs"],
    ["length 3", "reuse both possible shorter chains"],
    ["length 4–6", "increase chain length diagonally"],
    ["reconstruct", "follow s[i,j] split pointers"],
  ];
  return (
    <Figure caption="Matrix-chain bottom-up order moves by increasing interval length; the s table records the minimizing split for reconstruction.">
      <label className="text-sm font-semibold text-primary">DP stage = {stage + 1}<input className="mt-2 w-full accent-current" type="range" min="0" max="3" value={stage} onChange={(event) => setStage(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-4 gap-2">{stages.map(([name], index) => <div key={name} className={`border p-3 text-center text-xs ${index === stage ? "border-accent bg-accent/10 text-accent" : index < stage ? "border-success text-success" : "border-border text-secondary"}`}>{name}</div>)}</div>
      <div className="mt-3 border border-warning p-4 text-center text-sm text-warning">{stages[stage][1]}</div>
    </Figure>
  );
}

export function CLRS4DPElementsLab() {
  const [element, setElement] = useState<"substructure" | "overlap" | "order" | "choice">("substructure");
  const rows = {
    substructure: ["optimal substructure", "optimal solution contains optimal subproblem solutions", "derive recurrence"],
    overlap: ["overlapping subproblems", "same state is requested repeatedly", "store each result once"],
    order: ["dependency order", "all predecessors available before a state", "topological evaluation"],
    choice: ["solution reconstruction", "remember the minimizing or maximizing decision", "trace choices back"],
  }[element];
  return (
    <Figure caption="A dynamic-programming design needs a sufficient state, optimal substructure, overlapping calls, a legal evaluation order, and stored choices.">
      <label className="text-sm font-semibold text-primary">design element<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={element} onChange={(event) => setElement(event.target.value as typeof element)}><option value="substructure">optimal substructure</option><option value="overlap">overlap</option><option value="order">dependency order</option><option value="choice">reconstruction</option></select></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="element" value={rows[0]} /><Stat label="proof obligation" value={rows[1]} tone="warning" /><Stat label="implementation" value={rows[2]} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4StateDAGLab() {
  const [state, setState] = useState(5);
  const dependencies = state === 0 ? [] : Array.from({ length: state }, (_, index) => index);
  return (
    <Figure caption="DP states and dependency edges form a DAG; memoization visits reachable nodes on demand, while bottom-up follows a topological order.">
      <label className="text-sm font-semibold text-primary">rod state r[{state}]<input className="mt-2 w-full accent-current" type="range" min="0" max="8" value={state} onChange={(event) => setState(Number(event.target.value))} /></label>
      <div className="mt-4 flex flex-wrap justify-center gap-2">{dependencies.map((dep) => <div key={dep} className="border border-accent p-3 font-mono text-accent">r[{dep}]</div>)}<div className="border border-success bg-success/10 p-3 font-mono text-success">r[{state}]</div></div>
      <div className="mt-3 text-center text-sm text-secondary">{dependencies.length} predecessor states</div>
    </Figure>
  );
}

function lcsTable(x: string, y: string) {
  const c = Array.from({ length: x.length + 1 }, () => Array(y.length + 1).fill(0) as number[]);
  for (let i = 1; i <= x.length; i += 1) {
    for (let j = 1; j <= y.length; j += 1) c[i][j] = x[i - 1] === y[j - 1] ? c[i - 1][j - 1] + 1 : Math.max(c[i - 1][j], c[i][j - 1]);
  }
  return c;
}

const lcsX = "ABCBDAB";
const lcsY = "BDCABA";

export function CLRS4LCSGridLab() {
  const [row, setRow] = useState(4);
  const [col, setCol] = useState(4);
  const table = useMemo(() => lcsTable(lcsX, lcsY), []);
  return (
    <Figure caption="Each LCS cell depends on the diagonal when characters match, otherwise on the larger of the top and left prefix solutions.">
      <div className="grid gap-3 sm:grid-cols-2"><label className="text-sm text-primary">prefix i = {row}<input className="mt-2 w-full accent-current" type="range" min="0" max={lcsX.length} value={row} onChange={(event) => setRow(Number(event.target.value))} /></label><label className="text-sm text-primary">prefix j = {col}<input className="mt-2 w-full accent-current" type="range" min="0" max={lcsY.length} value={col} onChange={(event) => setCol(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="X prefix" value={lcsX.slice(0, row) || "ε"} /><Stat label="Y prefix" value={lcsY.slice(0, col) || "ε"} /><Stat label="LCS length" value={table[row][col].toString()} tone="success" /></div>
    </Figure>
  );
}

function oneLcs(x: string, y: string) {
  const table = lcsTable(x, y);
  let i = x.length;
  let j = y.length;
  const out: string[] = [];
  while (i > 0 && j > 0) {
    if (x[i - 1] === y[j - 1]) {
      out.push(x[i - 1]);
      i -= 1;
      j -= 1;
    } else if (table[i - 1][j] >= table[i][j - 1]) i -= 1;
    else j -= 1;
  }
  return out.reverse().join("");
}

export function CLRS4LCSReconstructLab() {
  const [tie, setTie] = useState<"up" | "left">("up");
  const result = tie === "up" ? oneLcs(lcsX, lcsY) : oneLcs(lcsY, lcsX).split("").reverse().join("");
  return (
    <Figure caption="Backtracking through equal-value ties may return different valid longest common subsequences; the length optimum need not have a unique witness.">
      <label className="text-sm font-semibold text-primary">tie policy<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={tie} onChange={(event) => setTie(event.target.value as typeof tie)}><option value="up">prefer up</option><option value="left">prefer left</option></select></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="X" value={lcsX} /><Stat label="Y" value={lcsY} /><Stat label="one LCS" value={result} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4OptimalBSTLab() {
  const [root, setRoot] = useState(2);
  const p = [0, 0.15, 0.10, 0.05];
  const q = [0.05, 0.10, 0.05, 0.05];
  const weight = p.slice(1).reduce((a, b) => a + b, 0) + q.reduce((a, b) => a + b, 0);
  return (
    <Figure caption="Optimal-BST recurrence tries each key as root and adds interval probability weight because every child search descends one extra level.">
      <label className="text-sm font-semibold text-primary">candidate root r = k{root}<input className="mt-2 w-full accent-current" type="range" min="1" max="3" value={root} onChange={(event) => setRoot(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="left interval" value={`k1…k${root - 1 || "0"}`} /><Stat label="right interval" value={`k${root + 1}…k3`} /><Stat label="interval weight w" value={weight.toFixed(2)} tone="warning" /></div>
    </Figure>
  );
}

export function CLRS4DPCertificateLab() {
  const [issue, setIssue] = useState<"valid" | "missing state" | "cycle" | "bad base" | "no choice">("valid");
  const checks = {
    "state is sufficient": issue !== "missing state",
    "dependencies acyclic": issue !== "cycle",
    "base cases complete": issue !== "bad base",
    "choices reconstruct": issue !== "no choice",
  };
  return (
    <Figure caption="A DP certificate verifies state sufficiency, acyclic dependencies, complete base cases, transition coverage, and reconstructable choices.">
      <label className="text-sm font-semibold text-primary">DP audit<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={issue} onChange={(event) => setIssue(event.target.value as typeof issue)}><option value="valid">valid</option><option value="missing state">missing state variable</option><option value="cycle">cyclic dependency</option><option value="bad base">missing base</option><option value="no choice">no reconstruction choice</option></select></label>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{Object.entries(checks).map(([name, ok]) => <div key={name} className={`border p-3 text-center text-xs ${ok ? "border-success text-success" : "border-danger text-danger"}`}>{name}<div className="mt-1 font-mono">{ok ? "pass" : "fail"}</div></div>)}</div>
    </Figure>
  );
}
