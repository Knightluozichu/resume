"use client";

import { useMemo, useState, type ReactNode } from "react";

function Panel({ children }: { children: ReactNode }) {
  return <div className="border border-border bg-elevated p-4 sm:p-5">{children}</div>;
}

function Caption({ children }: { children: ReactNode }) {
  return <figcaption className="mt-2 text-center text-sm text-secondary">{children}</figcaption>;
}

const sample = [55, 41, 59, 26, 53, 58, 97, 93];

export function PP2SortDecisionLab() {
  const [size, setSize] = useState(10000);
  const [shape, setShape] = useState<"random" | "nearly sorted" | "unknown">("random");
  const [customOrder, setCustomOrder] = useState(false);
  const choice = !customOrder ? "library sort" : size < 64 || shape === "nearly sorted" ? "Insertion Sort" : "randomized Quicksort";

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="grid gap-3 sm:grid-cols-2"><label className="text-xs text-secondary">records = {size.toLocaleString()}<input className="mt-2 w-full accent-current" type="range" min="8" max="1000000" step="8" value={size} onChange={(event) => setSize(Number(event.target.value))} /></label><label className="text-xs text-secondary">input shape<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={shape} onChange={(event) => setShape(event.target.value as typeof shape)}><option>random</option><option>nearly sorted</option><option>unknown</option></select></label></div>
        <label className="mt-3 flex items-center gap-2 text-sm text-primary"><input type="checkbox" checked={customOrder} onChange={(event) => setCustomOrder(event.target.checked)} />System library cannot express the required order or data access.</label>
        <div className="mt-4 border border-accent p-4 text-accent"><div className="text-xs">first implementation to evaluate</div><div className="mt-1 text-xl font-semibold">{choice}</div></div>
      </Panel>
      <Caption>Column 11 starts with the practical default: use a library sort unless measured constraints force a custom implementation.</Caption>
    </figure>
  );
}

export function PP2InsertionInvariantLab() {
  const states = [[3, 1, 4, 2], [1, 3, 4, 2], [1, 3, 4, 2], [1, 2, 3, 4]];
  const [step, setStep] = useState(0);
  const boundary = step + 1;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-xs text-secondary">insert step = {step + 1}<input className="mt-2 w-full accent-current" type="range" min="0" max="3" value={step} onChange={(event) => setStep(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-4 gap-2">{states[step].map((value, index) => <div key={index} className={"relative border p-4 text-center font-mono text-lg " + (index < boundary ? "border-success text-success" : "border-border text-secondary")}>{value}{index === boundary - 1 && boundary < 4 ? <span className="absolute -right-1 top-0 h-full border-r-2 border-warning" /> : null}</div>)}</div>
        <div className="mt-3 border border-warning p-3 text-sm text-warning">invariant: x[0..{boundary - 1}] is sorted</div>
      </Panel>
      <Caption>The boundary moves right one record at a time; each iteration restores the sorted-prefix invariant.</Caption>
    </figure>
  );
}

export function PP2InsertionCostLab() {
  const [n, setN] = useState(10000);
  const [disorder, setDisorder] = useState(100);
  const inversions = Math.round(n * (n - 1) / 4 * disorder / 100);
  const estimates = [11.9, 3.8, 3.2].map((constant) => constant * inversions * 2 / 1e9);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="grid gap-3 sm:grid-cols-2"><label className="text-xs text-secondary">n = {n.toLocaleString()}<input className="mt-2 w-full accent-current" type="range" min="100" max="30000" step="100" value={n} onChange={(event) => setN(Number(event.target.value))} /></label><label className="text-xs text-secondary">relative disorder = {disorder}%<input className="mt-2 w-full accent-current" type="range" min="0" max="100" value={disorder} onChange={(event) => setDisorder(Number(event.target.value))} /></label></div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">{["swap call", "inline swap", "shift saved value"].map((name, index) => <div key={name} className={"border p-3 " + (index === 2 ? "border-success text-success" : "border-border text-secondary")}><div className="text-xs">{name}</div><div className="mt-1 font-mono">{estimates[index].toFixed(3)} s</div></div>)}</div>
        <div className="mt-3 text-xs text-secondary">illustrative work scales with inversions: {inversions.toLocaleString()}</div>
      </Panel>
      <Caption>Moving a saved value and shifting larger records removes repeated swap work; nearly sorted input also reduces the number of shifts.</Caption>
    </figure>
  );
}

export function PP2LomutoPartitionLab() {
  const pivot = sample[0];
  const [scan, setScan] = useState(1);
  const processed = sample.slice(1, scan + 1);
  const low = processed.filter((value) => value < pivot);
  const high = processed.filter((value) => value >= pivot);
  const rest = sample.slice(scan + 1);
  const view = [pivot, ...low, ...high, ...rest];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-xs text-secondary">scan i = {scan}<input className="mt-2 w-full accent-current" type="range" min="1" max="7" value={scan} onChange={(event) => setScan(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-8">{view.map((value, index) => <div key={`${value}-${index}`} className={"border p-2 text-center font-mono text-xs " + (index === 0 ? "border-warning text-warning" : index <= low.length ? "border-success text-success" : index <= low.length + high.length ? "border-danger text-danger" : "border-border text-secondary")}>{value}</div>)}</div>
        <div className="mt-3 grid gap-2 sm:grid-cols-3"><div className="border border-warning p-2 text-warning">pivot t = {pivot}</div><div className="border border-success p-2 text-success">&lt; t: {low.length}</div><div className="border border-danger p-2 text-danger">≥ t: {high.length}</div></div>
      </Panel>
      <Caption>Lomuto partitioning keeps one scanned low region and one scanned high region; after the scan, swapping the pivot into m completes the partition.</Caption>
    </figure>
  );
}

export function PP2QuicksortTreeLab() {
  const [size, setSize] = useState(1024);
  const [leftPercent, setLeftPercent] = useState(50);
  const left = Math.max(0, Math.floor((size - 1) * leftPercent / 100));
  const right = size - 1 - left;
  const depth = leftPercent === 0 || leftPercent === 100 ? size : Math.ceil(Math.log2(size));

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="grid gap-3 sm:grid-cols-2"><label className="text-xs text-secondary">subarray n = {size}<input className="mt-2 w-full accent-current" type="range" min="8" max="4096" step="8" value={size} onChange={(event) => setSize(Number(event.target.value))} /></label><label className="text-xs text-secondary">pivot rank = {leftPercent}%<input className="mt-2 w-full accent-current" type="range" min="0" max="100" value={leftPercent} onChange={(event) => setLeftPercent(Number(event.target.value))} /></label></div>
        <div className="mt-4 flex h-12 border border-border"><div className="flex items-center justify-center bg-success/20 text-xs text-success" style={{ width: `${leftPercent}%` }}>{left}</div><div className="w-2 bg-warning" /><div className="flex flex-1 items-center justify-center bg-accent/20 text-xs text-accent">{right}</div></div>
        <div className={"mt-3 border p-3 " + (depth > 64 ? "border-danger text-danger" : "border-success text-success")}>estimated recursion depth <span className="float-right font-mono">{depth.toLocaleString()}</span></div>
      </Panel>
      <Caption>Balanced partitions lead to logarithmic depth; repeatedly choosing an extreme element creates quadratic work and linear stack depth.</Caption>
    </figure>
  );
}

export function PP2TwoWayPartitionLab() {
  const [equalPercent, setEqualPercent] = useState(70);
  const n = 1000;
  const oneWayRecursive = Math.round(n * equalPercent / 100);
  const twoWayMoves = Math.ceil(oneWayRecursive / 2);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-xs text-secondary">records equal to pivot = {equalPercent}%<input className="mt-2 w-full accent-current" type="range" min="0" max="100" value={equalPercent} onChange={(event) => setEqualPercent(Number(event.target.value))} /></label>
        <div className="mt-4 grid gap-3 sm:grid-cols-2"><div className="border border-danger p-4 text-danger"><div className="text-xs">one-way partition</div><div className="mt-1 font-mono text-2xl">{oneWayRecursive}</div><div className="text-xs">equal values left for skewed recursion</div></div><div className="border border-success p-4 text-success"><div className="text-xs">two-way scans</div><div className="mt-1 font-mono text-2xl">≈ {twoWayMoves}</div><div className="text-xs">pairwise crossings disperse equals</div></div></div>
      </Panel>
      <Caption>Scanning inward from both ends prevents an all-equal array from repeatedly producing an empty side, though a three-way fat pivot can do still better.</Caption>
    </figure>
  );
}

export function PP2RandomPivotLab() {
  const [n, setN] = useState(1000);
  const [strategy, setStrategy] = useState<"first" | "random">("first");
  const sortedInputDepth = strategy === "first" ? n : Math.ceil(2 * Math.log2(n));
  const expectedComparisons = strategy === "first" ? n * (n - 1) / 2 : 2 * n * Math.log(n);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="grid gap-3 sm:grid-cols-2"><label className="text-xs text-secondary">sorted input n = {n}<input className="mt-2 w-full accent-current" type="range" min="10" max="10000" step="10" value={n} onChange={(event) => setN(Number(event.target.value))} /></label><label className="text-xs text-secondary">pivot strategy<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={strategy} onChange={(event) => setStrategy(event.target.value as typeof strategy)}><option value="first">always first</option><option value="random">uniform random</option></select></label></div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2"><div className="border border-warning p-3 text-warning">depth <span className="float-right font-mono">{sortedInputDepth.toLocaleString()}</span></div><div className="border border-accent p-3 text-accent">comparisons <span className="float-right font-mono">{Math.round(expectedComparisons).toLocaleString()}</span></div></div>
      </Panel>
      <Caption>Randomization moves the probability assumption into the algorithm: expected n log n behavior no longer depends on a friendly input distribution.</Caption>
    </figure>
  );
}

export function PP2CutoffLab() {
  const [n, setN] = useState(1000000);
  const [cutoff, setCutoff] = useState(50);
  const partitions = Math.max(1, Math.round(n / cutoff));
  const insertionShifts = Math.round(n * cutoff / 4);
  const score = partitions * 130 + insertionShifts;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="grid gap-3 sm:grid-cols-2"><label className="text-xs text-secondary">n = {n.toLocaleString()}<input className="mt-2 w-full accent-current" type="range" min="1000" max="2000000" step="1000" value={n} onChange={(event) => setN(Number(event.target.value))} /></label><label className="text-xs text-secondary">cutoff = {cutoff}<input className="mt-2 w-full accent-current" type="range" min="2" max="128" value={cutoff} onChange={(event) => setCutoff(Number(event.target.value))} /></label></div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3"><div className="border border-accent p-3 text-accent">small clumps <span className="float-right font-mono">{partitions.toLocaleString()}</span></div><div className="border border-warning p-3 text-warning">cleanup shifts <span className="float-right font-mono">{insertionShifts.toLocaleString()}</span></div><div className="border border-success p-3 text-success">model score <span className="float-right font-mono">{score.toLocaleString()}</span></div></div>
      </Panel>
      <Caption>Stop Quicksort on small subarrays, then run one Insertion Sort over the nearly sorted whole array; the best cutoff must be measured on the target system.</Caption>
    </figure>
  );
}

export function PP2BenchmarkLab() {
  const [n, setN] = useState(1000000);
  const rows = useMemo(() => [
    ["C qsort", 137], ["Quicksort 1", 60], ["Quicksort 2", 56], ["Quicksort 3", 44], ["Quicksort 4", 36], ["C++ sort", 30],
  ] as const, []);
  const scale = n * Math.log2(n) / 1e9;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-xs text-secondary">random integers n = {n.toLocaleString()}<input className="mt-2 w-full accent-current" type="range" min="1000" max="2000000" step="1000" value={n} onChange={(event) => setN(Number(event.target.value))} /></label>
        <div className="mt-4 space-y-2">{rows.map(([name, constant]) => <div key={name} className="grid grid-cols-[90px_1fr_70px] items-center gap-2 text-xs"><span className="text-secondary">{name}</span><span className="h-3 bg-border"><span className="block h-full bg-accent" style={{ width: `${constant / 137 * 100}%` }} /></span><span className="text-right font-mono text-primary">{(constant * scale).toFixed(2)}s</span></div>)}</div>
      </Panel>
      <Caption>The book’s 400 MHz Pentium II model ranged from 137n log2 n nanoseconds for C qsort to 30n log2 n for C++ sort; ratios, not old absolute times, are the lesson.</Caption>
    </figure>
  );
}

export function PP2StabilityLab() {
  const [stable, setStable] = useState(true);
  const input = ["A·1", "B·1", "A·2", "B·2", "A·3"];
  const output = stable ? ["A·1", "A·2", "A·3", "B·1", "B·2"] : ["A·3", "A·1", "A·2", "B·2", "B·1"];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="flex items-center gap-2 text-sm text-primary"><input type="checkbox" checked={stable} onChange={(event) => setStable(event.target.checked)} />Require equal-key records to retain input order</label>
        <div className="mt-4 grid gap-3 sm:grid-cols-2"><div><div className="mb-2 text-xs text-secondary">input</div><div className="flex gap-1">{input.map((item) => <span key={item} className="flex-1 border border-border p-2 text-center text-xs text-secondary">{item}</span>)}</div></div><div><div className="mb-2 text-xs text-secondary">output</div><div className="flex gap-1">{output.map((item) => <span key={item} className={"flex-1 border p-2 text-center text-xs " + (stable ? "border-success text-success" : "border-warning text-warning")}>{item}</span>)}</div></div></div>
      </Panel>
      <Caption>Choosing a sort is a contract decision: stability, memory, comparator cost, data shape, and maintenance matter alongside asymptotic time.</Caption>
    </figure>
  );
}

export function PP2SortCertificateLab() {
  const [missing, setMissing] = useState<"none" | "oracle" | "adversarial" | "stack" | "benchmark">("none");
  const checks = { oracle: missing !== "oracle", adversarial: missing !== "adversarial", stack: missing !== "stack", benchmark: missing !== "benchmark", libraryBaseline: true, stability: true };
  const accepted = Object.values(checks).every(Boolean);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-xs text-secondary">review scenario<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={missing} onChange={(event) => setMissing(event.target.value as typeof missing)}><option value="none">complete evidence</option><option value="oracle">no sortedness/permutation oracle</option><option value="adversarial">no equal/sorted/reverse tests</option><option value="stack">stack bound omitted</option><option value="benchmark">no target benchmark</option></select></label>
        <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6">{Object.entries(checks).map(([name, ok]) => <div key={name} className={"border p-2 text-center text-[10px] " + (ok ? "border-success text-success" : "border-danger text-danger")}><div>{name}</div><div className="mt-1 font-mono">{ok ? "pass" : "fail"}</div></div>)}</div>
        <div className={"mt-3 border p-3 text-sm " + (accepted ? "border-success text-success" : "border-danger text-danger")}>{accepted ? "The sorting choice is ready for the target workload." : "The sorting claim is missing required evidence."}</div>
      </Panel>
      <Caption>A production sorting decision needs a correctness oracle, adversarial inputs, stack and memory bounds, a library baseline, stability requirements, and target-machine measurements.</Caption>
    </figure>
  );
}
