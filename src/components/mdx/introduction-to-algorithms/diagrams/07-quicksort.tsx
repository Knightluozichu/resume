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

const partitionInput = [2, 8, 7, 1, 3, 5, 6, 4];

function partitionStates() {
  const values = [...partitionInput];
  const pivot = values.at(-1) ?? 0;
  let i = -1;
  const states = [{ values: [...values], i, j: 0 }];
  for (let j = 0; j < values.length - 1; j += 1) {
    if (values[j] <= pivot) {
      i += 1;
      [values[i], values[j]] = [values[j], values[i]];
    }
    states.push({ values: [...values], i, j: j + 1 });
  }
  [values[i + 1], values[values.length - 1]] = [values[values.length - 1], values[i + 1]];
  states.push({ values: [...values], i: i + 1, j: values.length });
  return states;
}

export function CLRS4PartitionTraceLab() {
  const states = useMemo(() => partitionStates(), []);
  const [step, setStep] = useState(0);
  const state = states[step];
  return (
    <Figure caption="Lomuto PARTITION scans once, extending the at-most-pivot region and finally placing the pivot between the two sides.">
      <label className="text-sm font-semibold text-primary">scan step = {step}<input className="mt-2 w-full accent-current" type="range" min="0" max={states.length - 1} value={step} onChange={(event) => setStep(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-8 gap-2">{state.values.map((value, index) => <div key={index} className={`border p-3 text-center font-mono ${step === states.length - 1 && index === state.i ? "border-success bg-success/10 text-success" : index <= state.i ? "border-accent text-accent" : index < state.j ? "border-warning text-warning" : index === state.values.length - 1 ? "border-danger text-danger" : "border-border text-secondary"}`}>{value}</div>)}</div>
      <div className="mt-3 grid grid-cols-3 gap-2"><Stat label="≤ pivot end i" value={state.i.toString()} tone="success" /><Stat label="scan j" value={state.j.toString()} tone="warning" /><Stat label="pivot" value="4" tone="danger" /></div>
    </Figure>
  );
}

export function CLRS4PartitionInvariantLab() {
  const [region, setRegion] = useState<"low" | "high" | "unknown" | "pivot">("unknown");
  const rows = {
    low: ["A[p..i]", "every key ≤ pivot", "finished"],
    high: ["A[i+1..j-1]", "every key > pivot", "finished"],
    unknown: ["A[j..r-1]", "not inspected", "next"],
    pivot: ["A[r]", "saved pivot x", "fixed"],
  }[region];
  return (
    <Figure caption="The partition loop invariant assigns every index to a precise region; the scan moves one unknown element into a finished side.">
      <label className="text-sm font-semibold text-primary">invariant region<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={region} onChange={(event) => setRegion(event.target.value as typeof region)}><option value="low">at most pivot</option><option value="high">greater than pivot</option><option value="unknown">unscanned</option><option value="pivot">pivot</option></select></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="indices" value={rows[0]} /><Stat label="claim" value={rows[1]} tone="success" /><Stat label="status" value={rows[2]} tone="warning" /></div>
    </Figure>
  );
}

export function CLRS4QuicksortTreeLab() {
  const [ratio, setRatio] = useState<"balanced" | "nine-one" | "worst">("balanced");
  const rows = {
    balanced: ["1/2 : 1/2", "lg n", "Θ(n lg n)"],
    "nine-one": ["9/10 : 1/10", "Θ(lg n)", "Θ(n lg n)"],
    worst: ["n−1 : 0", "n−1", "Θ(n²)"],
  }[ratio];
  return (
    <Figure caption="Quicksort cost is linear per partition level; recursion depth determines whether those levels number logarithmically or linearly.">
      <label className="text-sm font-semibold text-primary">split pattern<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={ratio} onChange={(event) => setRatio(event.target.value as typeof ratio)}><option value="balanced">balanced</option><option value="nine-one">9-to-1</option><option value="worst">n−1-to-0</option></select></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="split" value={rows[0]} /><Stat label="depth" value={rows[1]} tone="warning" /><Stat label="total" value={rows[2]} tone={ratio === "worst" ? "danger" : "success"} /></div>
    </Figure>
  );
}

export function CLRS4BestWorstLab() {
  const [n, setN] = useState(64);
  const best = n * Math.log2(n);
  const worst = n * (n - 1) / 2;
  return (
    <Figure caption="Balanced partitions yield n log n work, while repeatedly extracting one pivot leaves a triangular number of comparisons.">
      <label className="text-sm font-semibold text-primary">input size n = {n}<input className="mt-2 w-full accent-current" type="range" min="2" max="256" value={n} onChange={(event) => setN(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="balanced scale" value={Math.round(best).toLocaleString()} tone="success" /><Stat label="degenerate scale" value={Math.round(worst).toLocaleString()} tone="danger" /><Stat label="ratio" value={(worst / best).toFixed(1)} tone="warning" /></div>
    </Figure>
  );
}

export function CLRS4BalancedSplitLab() {
  const [fraction, setFraction] = useState(25);
  const alpha = fraction / 100;
  const shallow = Math.log(1 / 1000) / Math.log(1 - alpha);
  const deep = Math.log(1 / 1000) / Math.log(alpha);
  return (
    <Figure caption="Any fixed proportional split keeps both path lengths logarithmic; perfect halves are unnecessary for Theta(n log n).">
      <label className="text-sm font-semibold text-primary">smaller-side fraction = {fraction}%<input className="mt-2 w-full accent-current" type="range" min="5" max="50" value={fraction} onChange={(event) => setFraction(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="split" value={`${fraction}:${100 - fraction}`} /><Stat label="large-side levels at n=1000" value={Math.ceil(shallow).toString()} tone="warning" /><Stat label="small-side levels" value={Math.ceil(deep).toString()} tone="success" /></div>
    </Figure>
  );
}

function seededPivot(seed: number, n: number) {
  return ((seed * 1664525 + 1013904223) >>> 0) % n;
}

export function CLRS4RandomPivotLab() {
  const [seed, setSeed] = useState(7);
  const n = 12;
  const pivot = seededPivot(seed, n);
  return (
    <Figure caption="RANDOMIZED-PARTITION chooses a uniform pivot index, swaps it to the partition endpoint, then reuses the deterministic partition contract.">
      <label className="text-sm font-semibold text-primary">demo seed = {seed}<input className="mt-2 w-full accent-current" type="range" min="0" max="30" value={seed} onChange={(event) => setSeed(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-12 gap-1">{Array.from({ length: n }, (_, index) => <div key={index} className={`border p-2 text-center text-xs ${index === pivot ? "border-success bg-success/10 text-success" : "border-border text-secondary"}`}>{index}</div>)}</div>
      <div className="mt-3 text-center font-mono text-sm text-accent">chosen pivot index = {pivot}</div>
    </Figure>
  );
}

export function CLRS4RandomizedBoundaryLab() {
  const [adversary, setAdversary] = useState<"fixed input" | "predictable rng" | "adaptive input">("fixed input");
  const rows = {
    "fixed input": ["private fresh pivot bits", "expected Θ(n lg n)", "model holds"],
    "predictable rng": ["adversary predicts pivots", "can arrange bad splits", "model broken"],
    "adaptive input": ["input reacts during execution", "needs stronger adversary model", "reprove"],
  }[adversary];
  return (
    <Figure caption="Randomized quicksort's expectation is over private pivot choices for each fixed input; predictability changes the adversary model.">
      <label className="text-sm font-semibold text-primary">adversary model<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={adversary} onChange={(event) => setAdversary(event.target.value as typeof adversary)}><option value="fixed input">fixed input</option><option value="predictable rng">predictable RNG</option><option value="adaptive input">adaptive input</option></select></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="randomness boundary" value={rows[0]} /><Stat label="consequence" value={rows[1]} tone="warning" /><Stat label="status" value={rows[2]} tone={adversary === "fixed input" ? "success" : "danger"} /></div>
    </Figure>
  );
}

export function CLRS4ExpectedComparisonsLab() {
  const [distance, setDistance] = useState(5);
  const probability = 2 / (distance + 1);
  return (
    <Figure caption="Two sorted-order elements distance d apart are compared only if one is the first pivot chosen from their inclusive interval.">
      <label className="text-sm font-semibold text-primary">rank distance j−i = {distance}<input className="mt-2 w-full accent-current" type="range" min="1" max="30" value={distance} onChange={(event) => setDistance(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="interval size" value={(distance + 1).toString()} /><Stat label="favorable pivots" value="2" tone="warning" /><Stat label="comparison probability" value={`2/${distance + 1} = ${probability.toFixed(3)}`} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4DuplicateKeysLab() {
  const [mode, setMode] = useState<"two-way" | "three-way">("three-way");
  const values = [2, 5, 2, 2, 9, 2, 7, 2, 5, 2];
  const counts = { low: values.filter((v) => v < 2).length, equal: values.filter((v) => v === 2).length, high: values.filter((v) => v > 2).length };
  return (
    <Figure caption="Three-way partition groups keys less than, equal to, and greater than the pivot, avoiding recursive work on a large equal-key block.">
      <label className="text-sm font-semibold text-primary">partition mode<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={mode} onChange={(event) => setMode(event.target.value as typeof mode)}><option value="two-way">two-way</option><option value="three-way">three-way</option></select></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="< pivot" value={counts.low.toString()} /><Stat label="= pivot" value={counts.equal.toString()} tone={mode === "three-way" ? "success" : "warning"} /><Stat label="> pivot" value={counts.high.toString()} /></div>
      <div className="mt-3 text-center text-sm text-secondary">{mode === "three-way" ? "equal block excluded from recursion" : "equal keys distributed into recursive sides"}</div>
    </Figure>
  );
}

export function CLRS4QuicksortCertificateLab() {
  const [issue, setIssue] = useState<"valid" | "lost key" | "pivot recursed" | "biased pivot" | "stack ignored">("valid");
  const checks = {
    "partition permutation": issue !== "lost key",
    "pivot excluded": issue !== "pivot recursed",
    "uniform pivot": issue !== "biased pivot",
    "stack bound": issue !== "stack ignored",
  };
  return (
    <Figure caption="A quicksort certificate combines partition correctness, strict recursion shrinkage, pivot distribution, and implementation stack limits.">
      <label className="text-sm font-semibold text-primary">audit scenario<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={issue} onChange={(event) => setIssue(event.target.value as typeof issue)}><option value="valid">valid</option><option value="lost key">element lost</option><option value="pivot recursed">pivot included again</option><option value="biased pivot">biased pivot</option><option value="stack ignored">stack risk ignored</option></select></label>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{Object.entries(checks).map(([name, ok]) => <div key={name} className={`border p-3 text-center text-xs ${ok ? "border-success text-success" : "border-danger text-danger"}`}>{name}<div className="mt-1 font-mono">{ok ? "pass" : "fail"}</div></div>)}</div>
    </Figure>
  );
}
