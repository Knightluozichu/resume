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

function factorial(n: number) {
  return Array.from({ length: n }, (_, index) => index + 1).reduce((product, value) => product * value, 1);
}

export function CLRS4DecisionTreeLab() {
  const [n, setN] = useState(5);
  const leaves = factorial(n);
  return (
    <Figure caption="A comparison sort decision tree needs at least one reachable leaf for every input permutation, forcing logarithmic depth in n factorial.">
      <label className="text-sm font-semibold text-primary">distinct keys n = {n}<input className="mt-2 w-full accent-current" type="range" min="2" max="10" value={n} onChange={(event) => setN(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="permutations n!" value={leaves.toLocaleString()} /><Stat label="binary leaves at depth h" value="≤ 2ʰ" tone="warning" /><Stat label="minimum worst depth" value={Math.ceil(Math.log2(leaves)).toString()} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4ComparisonLowerBoundLab() {
  const [n, setN] = useState(128);
  const info = Math.log2(factorial(Math.min(n, 10))) + (n > 10 ? Array.from({ length: n - 10 }, (_, i) => Math.log2(i + 11)).reduce((a, b) => a + b, 0) : 0);
  return (
    <Figure caption="Stirling's approximation turns log2(n!) into Theta(n log n), matching mergesort and heapsort in the comparison model.">
      <label className="text-sm font-semibold text-primary">n = {n}<input className="mt-2 w-full accent-current" type="range" min="2" max="512" value={n} onChange={(event) => setN(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="lg(n!)" value={Math.round(info).toLocaleString()} tone="warning" /><Stat label="n lg n" value={Math.round(n * Math.log2(n)).toLocaleString()} /><Stat label="ratio" value={(info / (n * Math.log2(n))).toFixed(3)} tone="success" /></div>
    </Figure>
  );
}

const countingInput = [2, 5, 3, 0, 2, 3, 0, 3];

export function CLRS4CountingHistogramLab() {
  const [seen, setSeen] = useState(countingInput.length);
  const counts = Array.from({ length: 6 }, (_, key) => countingInput.slice(0, seen).filter((value) => value === key).length);
  return (
    <Figure caption="Counting sort replaces pairwise comparisons with direct key-indexed frequency updates over a bounded integer universe.">
      <label className="text-sm font-semibold text-primary">input items counted = {seen}<input className="mt-2 w-full accent-current" type="range" min="0" max={countingInput.length} value={seen} onChange={(event) => setSeen(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-6 gap-2">{counts.map((count, key) => <div key={key} className="border border-accent p-3 text-center text-accent"><div className="font-mono text-xl">{count}</div><div className="text-xs">key {key}</div></div>)}</div>
    </Figure>
  );
}

export function CLRS4CountingPrefixLab() {
  const [key, setKey] = useState(3);
  const counts = Array.from({ length: 6 }, (_, value) => countingInput.filter((item) => item === value).length);
  const prefix = counts.map((_, index) => counts.slice(0, index + 1).reduce((a, b) => a + b, 0));
  return (
    <Figure caption="Prefix counts change frequency C[k] into the number of input keys at most k, which is the final right boundary for key k.">
      <label className="text-sm font-semibold text-primary">inspect key k = {key}<input className="mt-2 w-full accent-current" type="range" min="0" max="5" value={key} onChange={(event) => setKey(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="frequency" value={counts[key].toString()} /><Stat label="keys ≤ k" value={prefix[key].toString()} tone="warning" /><Stat label="output interval" value={`${prefix[key] - counts[key] + 1}…${prefix[key]}`} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4CountingStableLab() {
  const [backward, setBackward] = useState(true);
  const records = [{ key: 2, id: "A" }, { key: 1, id: "B" }, { key: 2, id: "C" }, { key: 1, id: "D" }];
  const output = [...records].sort((a, b) => a.key === b.key ? (backward ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id)) : a.key - b.key);
  const stable = output.map((item) => item.id).join("") === "BDAC";
  return (
    <Figure caption="Scanning input from right to left while decrementing prefix positions preserves the relative order of equal-key records.">
      <label className="block border border-border p-3 text-sm text-secondary"><input className="mr-2 accent-current" type="checkbox" checked={backward} onChange={(event) => setBackward(event.target.checked)} />place records by a backward input scan</label>
      <div className="mt-4 flex justify-center gap-2">{output.map((item) => <div key={item.id} className={`border p-3 text-center ${item.key === 1 ? "border-accent text-accent" : "border-warning text-warning"}`}><div className="font-mono">{item.key}</div><div className="text-xs">{item.id}</div></div>)}</div>
      <div className={`mt-3 border p-3 text-center ${stable ? "border-success text-success" : "border-danger text-danger"}`}>equal-key order: {stable ? "preserved" : "reversed"}</div>
    </Figure>
  );
}

export function CLRS4CountingRangeLab() {
  const [k, setK] = useState(20);
  const [n, setN] = useState(100);
  return (
    <Figure caption="Counting sort is linear in n plus key-range size k; a huge sparse universe can dominate both initialization time and memory.">
      <div className="grid gap-3 sm:grid-cols-2"><label className="text-sm text-primary">items n = {n}<input className="mt-2 w-full accent-current" type="range" min="10" max="500" value={n} onChange={(event) => setN(Number(event.target.value))} /></label><label className="text-sm text-primary">maximum key k = {k}<input className="mt-2 w-full accent-current" type="range" min="1" max="1000" value={k} onChange={(event) => setK(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="input work" value={n.toString()} /><Stat label="count-array work" value={(k + 1).toString()} tone="warning" /><Stat label="total scale" value={(n + k + 1).toString()} tone={k <= n ? "success" : "danger"} /></div>
    </Figure>
  );
}

const radixInput = [329, 457, 657, 839, 436, 720, 355];

function stableDigitPass(values: number[], digit: number) {
  const power = 10 ** digit;
  return [...values].sort((a, b) => Math.floor(a / power) % 10 - Math.floor(b / power) % 10);
}

export function CLRS4RadixPassLab() {
  const [passes, setPasses] = useState(1);
  let values = [...radixInput];
  for (let digit = 0; digit < passes; digit += 1) values = stableDigitPass(values, digit);
  return (
    <Figure caption="Least-significant-digit radix sort applies a stable digit sort from low to high so later passes retain the order established by lower digits.">
      <label className="text-sm font-semibold text-primary">stable digit passes = {passes}<input className="mt-2 w-full accent-current" type="range" min="0" max="3" value={passes} onChange={(event) => setPasses(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-7 gap-2">{values.map((value, index) => <div key={index} className="border border-accent p-3 text-center font-mono text-accent">{value}</div>)}</div>
      <div className="mt-3 text-center text-sm text-secondary">{passes === 0 ? "unsorted" : `sorted by the lowest ${passes} digit(s)`}</div>
    </Figure>
  );
}

export function CLRS4RadixCostLab() {
  const [bits, setBits] = useState(32);
  const [radixBits, setRadixBits] = useState(8);
  const passes = Math.ceil(bits / radixBits);
  const buckets = 2 ** radixBits;
  return (
    <Figure caption="Radix width trades fewer passes for a larger digit universe; total cost is passes times n plus radix size.">
      <div className="grid gap-3 sm:grid-cols-2"><label className="text-sm text-primary">key bits w = {bits}<input className="mt-2 w-full accent-current" type="range" min="8" max="64" step="8" value={bits} onChange={(event) => setBits(Number(event.target.value))} /></label><label className="text-sm text-primary">bits per digit r = {radixBits}<input className="mt-2 w-full accent-current" type="range" min="1" max="16" value={radixBits} onChange={(event) => setRadixBits(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="passes d" value={passes.toString()} /><Stat label="digit keys 2ʳ" value={buckets.toLocaleString()} tone="warning" /><Stat label="cost form" value={`${passes}·(n + ${buckets})`} tone="success" /></div>
    </Figure>
  );
}

function bucketValues(mode: "uniform" | "skewed") {
  return mode === "uniform" ? [0.78, 0.17, 0.39, 0.26, 0.72, 0.94, 0.21, 0.12, 0.23, 0.68] : [0.01, 0.02, 0.03, 0.04, 0.06, 0.07, 0.08, 0.09, 0.91, 0.95];
}

export function CLRS4BucketScatterLab() {
  const [mode, setMode] = useState<"uniform" | "skewed">("uniform");
  const values = bucketValues(mode);
  const buckets = Array.from({ length: 5 }, (_, index) => values.filter((value) => Math.min(4, Math.floor(value * 5)) === index));
  return (
    <Figure caption="Bucket sort maps a value range to ordered buckets, sorts locally, and concatenates; distribution controls local sorting work.">
      <label className="text-sm font-semibold text-primary">input distribution<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={mode} onChange={(event) => setMode(event.target.value as typeof mode)}><option value="uniform">uniform-like</option><option value="skewed">skewed</option></select></label>
      <div className="mt-4 grid grid-cols-5 gap-2">{buckets.map((bucket, index) => <div key={index} className={`border p-3 text-center ${bucket.length > 4 ? "border-danger text-danger" : "border-accent text-accent"}`}><div className="font-mono text-lg">{bucket.length}</div><div className="text-[10px]">bucket {index}</div></div>)}</div>
    </Figure>
  );
}

export function CLRS4DistributionFitLab() {
  const [mode, setMode] = useState<"matched" | "wrong range" | "skewed" | "dependent">("matched");
  const rows = {
    matched: ["uniform independent keys", "constant expected occupancy", "expected Θ(n)"],
    "wrong range": ["mapping omits boundary", "lost or out-of-range key", "incorrect"],
    skewed: ["mass concentrated in one bucket", "local sort may be quadratic", "assumption broken"],
    dependent: ["keys strongly correlated", "occupancies may cluster", "reanalyse"],
  }[mode];
  return (
    <Figure caption="Bucket-sort linear expectation is a model-dependent theorem, so range mapping and distribution assumptions belong in the correctness and cost certificate.">
      <label className="text-sm font-semibold text-primary">certificate scenario<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={mode} onChange={(event) => setMode(event.target.value as typeof mode)}><option value="matched">matched model</option><option value="wrong range">bad range map</option><option value="skewed">skewed input</option><option value="dependent">dependent keys</option></select></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="assumption" value={rows[0]} /><Stat label="effect" value={rows[1]} tone="warning" /><Stat label="result" value={rows[2]} tone={mode === "matched" ? "success" : "danger"} /></div>
    </Figure>
  );
}
