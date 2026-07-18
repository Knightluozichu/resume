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

export function CLRS4ComputationDAGLab() {
  const [stage, setStage] = useState(1);
  const levels = [["entry"], ["left task", "right task"], ["left result", "right result"], ["sync / combine"]];
  return (
    <Figure caption="A fork-join computation expands into a DAG of strands and dependencies; scheduler freedom exists only among ready vertices.">
      <label className="text-sm font-semibold text-primary">completed DAG levels = {stage + 1}<input className="mt-2 w-full accent-current" type="range" min="0" max="3" value={stage} onChange={(event) => setStage(Number(event.target.value))} /></label>
      <div className="mt-4 space-y-3">{levels.map((items, level) => <div key={level} className="flex justify-center gap-3">{items.map((item) => <div key={item} className={`min-w-28 border p-3 text-center text-xs ${level <= stage ? "border-success text-success" : "border-border text-secondary"}`}>{item}</div>)}</div>)}</div>
    </Figure>
  );
}

export function CLRS4WorkSpanLab() {
  const [branches, setBranches] = useState(8);
  const depth = Math.ceil(Math.log2(branches)) + 2;
  const work = 2 * branches + 2;
  return (
    <Figure caption="Work T1 sums every strand cost; span T∞ follows the longest dependency path and ignores parallel siblings.">
      <label className="text-sm font-semibold text-primary">independent leaf tasks = {branches}<input className="mt-2 w-full accent-current" type="range" min="2" max="32" step="2" value={branches} onChange={(event) => setBranches(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="work T1" value={work.toString()} /><Stat label="span T∞" value={depth.toString()} tone="warning" /><Stat label="parallelism T1/T∞" value={(work / depth).toFixed(1)} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4SchedulerBoundLab() {
  const [processors, setProcessors] = useState(4);
  const work = 80;
  const span = 12;
  const lower = Math.max(work / processors, span);
  const greedy = work / processors + span;
  return (
    <Figure caption="Any P-processor execution obeys work and span lower bounds; a greedy scheduler completes within T1/P plus T∞.">
      <label className="text-sm font-semibold text-primary">processors P = {processors}<input className="mt-2 w-full accent-current" type="range" min="1" max="16" value={processors} onChange={(event) => setProcessors(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="lower bound" value={lower.toFixed(1)} /><Stat label="greedy upper bound" value={greedy.toFixed(1)} tone="warning" /><Stat label="ideal speedup cap" value={Math.min(processors, work / span).toFixed(1)} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4RaceConditionLab() {
  const [privateOutput, setPrivateOutput] = useState(true);
  return (
    <Figure caption="Parallel writes are deterministic only when tasks own disjoint output or synchronize a reduction; two unsynchronized writes to one cell create a race.">
      <label className="flex items-center gap-3 text-sm font-semibold text-primary"><input type="checkbox" checked={privateOutput} onChange={(event) => setPrivateOutput(event.target.checked)} />assign each task a private output cell</label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="task A writes" value={privateOutput ? "C[0,0]" : "sum"} /><Stat label="task B writes" value={privateOutput ? "C[0,1]" : "sum"} /><Stat label="deterministic" value={privateOutput ? "yes" : "no"} tone={privateOutput ? "success" : "danger"} /></div>
    </Figure>
  );
}

export function CLRS4ParallelForLab() {
  const [grain, setGrain] = useState(4);
  const items = 32;
  const tasks = Math.ceil(items / grain);
  return (
    <Figure caption="A parallel loop needs a grain size: too fine creates scheduler overhead, while too coarse leaves processors idle and lengthens span.">
      <label className="text-sm font-semibold text-primary">items per task = {grain}<input className="mt-2 w-full accent-current" type="range" min="1" max="16" value={grain} onChange={(event) => setGrain(Number(event.target.value))} /></label>
      <div className="mt-4 flex flex-wrap gap-1">{Array.from({ length: tasks }, (_, index) => <div key={index} className="border border-accent p-2 text-center font-mono text-xs text-accent">task {index + 1}</div>)}</div>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="task count" value={tasks.toString()} /><Stat label="largest chunk" value={grain.toString()} tone="warning" /></div>
    </Figure>
  );
}

const matrixA = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
const matrixB = [[9, 8, 7], [6, 5, 4], [3, 2, 1]];

export function CLRS4MatrixCellLab() {
  const [row, setRow] = useState(0);
  const [col, setCol] = useState(1);
  const products = matrixA[row].map((value, k) => value * matrixB[k][col]);
  return (
    <Figure caption="Every output C[i,j] is independent after A and B are fixed; its dot product can be one task or an internal parallel reduction.">
      <div className="grid gap-3 sm:grid-cols-2"><label className="text-sm text-primary">row i<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={row} onChange={(event) => setRow(Number(event.target.value))}>{[0, 1, 2].map((value) => <option key={value}>{value}</option>)}</select></label><label className="text-sm text-primary">column j<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={col} onChange={(event) => setCol(Number(event.target.value))}>{[0, 1, 2].map((value) => <option key={value}>{value}</option>)}</select></label></div>
      <div className="mt-4 grid grid-cols-4 gap-2">{products.map((value, k) => <Stat key={k} label={`k=${k}`} value={value.toString()} />)}<Stat label={`C[${row},${col}]`} value={products.reduce((a, b) => a + b, 0).toString()} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4ReductionTreeLab() {
  const [level, setLevel] = useState(1);
  const levels = [["8 products"], ["4 partial sums"], ["2 partial sums"], ["1 dot product"]];
  return (
    <Figure caption="A balanced reduction keeps Θ(n) work for one dot product while reducing its span from Θ(n) to Θ(log n), at the cost of temporary storage and tasks.">
      <label className="text-sm font-semibold text-primary">reduction level = {level}<input className="mt-2 w-full accent-current" type="range" min="0" max="3" value={level} onChange={(event) => setLevel(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-4 gap-2">{levels.map(([name], index) => <div key={name} className={`border p-3 text-center text-xs ${index <= level ? "border-success text-success" : "border-border text-secondary"}`}>{name}</div>)}</div>
    </Figure>
  );
}

const leftRun = [2, 5, 7, 12, 18, 21];
const rightRun = [1, 4, 9, 13, 20, 25];

export function CLRS4MergePartitionLab() {
  const [pivotIndex, setPivotIndex] = useState(3);
  const pivot = leftRun[pivotIndex];
  const split = rightRun.findIndex((value) => value >= pivot);
  const rightSplit = split === -1 ? rightRun.length : split;
  return (
    <Figure caption="Parallel merge chooses a median pivot from the longer run and binary-searches its rank in the other run, creating two independent output subranges.">
      <label className="text-sm font-semibold text-primary">pivot in left run = {pivot}<input className="mt-2 w-full accent-current" type="range" min="0" max={leftRun.length - 1} value={pivotIndex} onChange={(event) => setPivotIndex(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="left rank" value={pivotIndex.toString()} /><Stat label="right insertion rank" value={rightSplit.toString()} tone="warning" /><Stat label="output rank" value={(pivotIndex + rightSplit).toString()} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4ParallelMergeLab() {
  const [depth, setDepth] = useState(1);
  const tasks = 2 ** depth;
  const largest = Math.ceil((leftRun.length + rightRun.length) * (3 / 4) ** depth);
  return (
    <Figure caption="Each parallel-merge split reduces the largest child problem to at most a constant fraction while the two recursive submerges write disjoint output ranges.">
      <label className="text-sm font-semibold text-primary">recursive split depth = {depth}<input className="mt-2 w-full accent-current" type="range" min="0" max="3" value={depth} onChange={(event) => setDepth(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="independent submerges" value={tasks.toString()} tone="success" /><Stat label="largest subproblem" value={largest.toString()} tone="warning" /></div>
    </Figure>
  );
}

export function CLRS4ParallelMergeSortLab() {
  const [n, setN] = useState(64);
  const log = Math.log2(n);
  return (
    <Figure caption="Parallel merge sort spawns both half-sorts, syncs, then invokes parallel merge; merge span accumulates across recursion levels.">
      <label className="text-sm font-semibold text-primary">input size n = {n}<input className="mt-2 w-full accent-current" type="range" min="8" max="256" step="8" value={n} onChange={(event) => setN(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="work" value={`≈ n log n = ${Math.round(n * log)}`} /><Stat label="merge span" value={`≈ log² n = ${Math.round(log * log)}`} tone="warning" /><Stat label="sort span" value={`≈ log³ n = ${Math.round(log ** 3)}`} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4ParallelCertificateLab() {
  const [issue, setIssue] = useState<"valid" | "race" | "span" | "overhead" | "sync">("valid");
  const checks = {
    "dependencies and sync are complete": issue !== "sync",
    "parallel writes are race-free": issue !== "race",
    "work and span recurrences are separate": issue !== "span",
    "grain size accounts for overhead": issue !== "overhead",
  };
  return (
    <Figure caption="A parallel certificate checks computation-DAG dependencies, race freedom, work/span bounds, scheduler assumptions, and practical grain size.">
      <label className="text-sm font-semibold text-primary">audit scenario<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={issue} onChange={(event) => setIssue(event.target.value as typeof issue)}><option value="valid">valid parallel algorithm</option><option value="race">shared output race</option><option value="span">reports work as span</option><option value="overhead">one task per scalar</option><option value="sync">missing sync</option></select></label>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{Object.entries(checks).map(([name, ok]) => <div key={name} className={`border p-3 text-center text-xs ${ok ? "border-success text-success" : "border-danger text-danger"}`}>{name}<div className="mt-1 font-mono">{ok ? "pass" : "fail"}</div></div>)}</div>
    </Figure>
  );
}
