"use client";

import { useState, type ReactNode } from "react";

function Panel({ children }: { children: ReactNode }) {
  return <div className="border border-border bg-elevated p-4 sm:p-5">{children}</div>;
}

function Caption({ children }: { children: ReactNode }) {
  return <figcaption className="mt-2 text-center text-sm text-secondary">{children}</figcaption>;
}

function Stat({ label, value, tone = "accent" }: { label: string; value: string; tone?: "accent" | "warning" | "success" | "danger" }) {
  const classes = {
    accent: "border-accent text-accent",
    warning: "border-warning text-warning",
    success: "border-success text-success",
    danger: "border-danger text-danger",
  }[tone];
  return <div className={`border p-3 text-center ${classes}`}><div className="text-xs">{label}</div><div className="mt-1 break-words font-mono text-lg">{value}</div></div>;
}

const insertionValues = [5, 2, 4, 6, 1, 3];

function insertionPrefix(iteration: number) {
  const values = [...insertionValues];
  for (let j = 1; j <= iteration; j += 1) {
    const key = values[j];
    let i = j - 1;
    while (i >= 0 && values[i] > key) {
      values[i + 1] = values[i];
      i -= 1;
    }
    values[i + 1] = key;
  }
  return values;
}

export function CLRS4InsertionTraceLab() {
  const [iteration, setIteration] = useState(0);
  const values = insertionPrefix(iteration);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">completed outer iterations = {iteration}<input className="mt-2 w-full accent-current" type="range" min="0" max={insertionValues.length - 1} value={iteration} onChange={(event) => setIteration(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-6 gap-2">{values.map((value, index) => <div key={index} className={`border p-4 text-center font-mono text-xl ${index <= iteration ? "border-success bg-success/10 text-success" : "border-border text-secondary"}`}>{value}</div>)}</div>
        <div className="mt-3 grid grid-cols-3 gap-2"><Stat label="sorted prefix" value={`0…${iteration}`} tone="success" /><Stat label="next key" value={iteration + 1 < values.length ? `${values[iteration + 1]}` : "done"} tone="warning" /><Stat label="multiset preserved" value="yes" /></div>
      </Panel>
      <Caption>Insertion sort grows a sorted prefix by removing one key, shifting larger prefix elements right, and inserting the key into its unique gap.</Caption>
    </figure>
  );
}

export function CLRS4LoopInvariantLab() {
  const [stage, setStage] = useState(0);
  const stages = [
    ["initialization", "before j = 1, the one-element prefix A[0..0] is sorted"],
    ["maintenance", "inserting A[j] preserves the same elements and sorted order in A[0..j]"],
    ["termination", "when j = n, the invariant describes the complete array"],
  ];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">proof obligation: {stage + 1} / 3<input className="mt-2 w-full accent-current" type="range" min="0" max="2" value={stage} onChange={(event) => setStage(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-3 gap-2">{stages.map(([name], index) => <div key={name} className={`border p-3 text-center text-sm ${index === stage ? "border-accent bg-accent/10 text-accent" : index < stage ? "border-success text-success" : "border-border text-secondary"}`}>{name}</div>)}</div>
        <div className="mt-3 border border-accent p-4 text-sm text-accent">{stages[stage][1]}</div>
      </Panel>
      <Caption>A loop invariant plays the role of induction: establish it, preserve it, and combine it with the loop exit condition.</Caption>
    </figure>
  );
}

export function CLRS4StableInsertionLab() {
  const [strict, setStrict] = useState(true);
  const records = [{ key: 2, id: "A" }, { key: 1, id: "B" }, { key: 2, id: "C" }, { key: 1, id: "D" }];
  const output = [...records].sort((a, b) => strict ? a.key - b.key : a.key === b.key ? b.id.localeCompare(a.id) : a.key - b.key);
  const stable = output.filter((item) => item.key === 1).map((item) => item.id).join("") === "BD" && output.filter((item) => item.key === 2).map((item) => item.id).join("") === "AC";

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="block border border-border p-3 text-sm text-secondary"><input className="mr-2 accent-current" type="checkbox" checked={strict} onChange={(event) => setStrict(event.target.checked)} />shift only when previous key is strictly greater</label>
        <div className="mt-4 flex justify-center gap-2">{output.map((item) => <div key={item.id} className={`border p-3 text-center ${item.key === 1 ? "border-accent text-accent" : "border-warning text-warning"}`}><div className="font-mono text-xl">{item.key}</div><div className="text-xs">{item.id}</div></div>)}</div>
        <div className={`mt-3 border p-3 text-center ${stable ? "border-success text-success" : "border-danger text-danger"}`}>relative order of equal keys: {stable ? "preserved" : "reversed"}</div>
      </Panel>
      <Caption>Using a strict greater-than comparison keeps equal records in original order, making insertion sort stable.</Caption>
    </figure>
  );
}

export function CLRS4OperationCountLab() {
  const [n, setN] = useState(20);
  const best = n - 1;
  const worstComparisons = n * (n - 1) / 2;
  const worstShifts = worstComparisons;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">array length n = {n}<input className="mt-2 w-full accent-current" type="range" min="2" max="200" value={n} onChange={(event) => setN(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="best comparisons" value={best.toLocaleString()} tone="success" /><Stat label="worst comparisons" value={worstComparisons.toLocaleString()} tone="danger" /><Stat label="worst shifts" value={worstShifts.toLocaleString()} tone="warning" /></div>
      </Panel>
      <Caption>Already sorted input triggers one failed while-test per key; reverse input shifts the entire prefix and realizes the quadratic worst case.</Caption>
    </figure>
  );
}

function inversions(values: number[]) {
  let count = 0;
  for (let i = 0; i < values.length; i += 1) for (let j = i + 1; j < values.length; j += 1) if (values[i] > values[j]) count += 1;
  return count;
}

export function CLRS4InputDistributionLab() {
  const [pattern, setPattern] = useState<"sorted" | "nearly sorted" | "reverse">("nearly sorted");
  const values = {
    sorted: [1, 2, 3, 4, 5, 6],
    "nearly sorted": [1, 2, 5, 3, 4, 6],
    reverse: [6, 5, 4, 3, 2, 1],
  }[pattern];
  const count = inversions(values);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">input distribution<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={pattern} onChange={(event) => setPattern(event.target.value as typeof pattern)}><option value="sorted">sorted</option><option value="nearly sorted">nearly sorted</option><option value="reverse">reverse</option></select></label>
        <div className="mt-4 grid grid-cols-6 gap-2">{values.map((value, index) => <div key={index} className="border border-accent p-3 text-center font-mono text-accent">{value}</div>)}</div>
        <div className="mt-3 grid grid-cols-2 gap-2"><Stat label="inversions" value={`${count}`} tone="warning" /><Stat label="insertion shifts" value={`${count}`} tone="success" /></div>
      </Panel>
      <Caption>Insertion-sort shifts equal the inversion count, connecting input disorder directly to running time beyond best and worst cases.</Caption>
    </figure>
  );
}

export function CLRS4RAMCostLab() {
  const [operation, setOperation] = useState<"register add" | "array access" | "disk read" | "big integer multiply">("array access");
  const rows = {
    "register add": ["constant in word-RAM", "word fits machine width", "yes"],
    "array access": ["constant in RAM model", "address fits one word", "yes"],
    "disk read": ["not one RAM step", "I/O hierarchy matters", "no"],
    "big integer multiply": ["depends on bit length", "operand exceeds one word", "no"],
  }[operation];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">candidate primitive<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={operation} onChange={(event) => setOperation(event.target.value as typeof operation)}><option value="register add">register add</option><option value="array access">array access</option><option value="disk read">disk read</option><option value="big integer multiply">big integer multiply</option></select></label>
        <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="cost model" value={rows[0]} /><Stat label="assumption" value={rows[1]} tone="warning" /><Stat label="unit cost" value={rows[2]} tone={rows[2] === "yes" ? "success" : "danger"} /></div>
      </Panel>
      <Caption>The RAM model counts ordinary word operations as constant time; I/O and arbitrary-precision arithmetic require richer cost models.</Caption>
    </figure>
  );
}

const mergeLeft = [2, 5, 7, 9];
const mergeRight = [1, 3, 6, 8];

function mergePrefix(steps: number) {
  let i = 0;
  let j = 0;
  const output: number[] = [];
  while (output.length < steps && i < mergeLeft.length && j < mergeRight.length) output.push(mergeLeft[i] <= mergeRight[j] ? mergeLeft[i++] : mergeRight[j++]);
  while (output.length < steps && i < mergeLeft.length) output.push(mergeLeft[i++]);
  while (output.length < steps && j < mergeRight.length) output.push(mergeRight[j++]);
  return { output, i, j };
}

export function CLRS4MergeTraceLab() {
  const [steps, setSteps] = useState(4);
  const trace = mergePrefix(steps);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">merge outputs produced = {steps}<input className="mt-2 w-full accent-current" type="range" min="0" max={mergeLeft.length + mergeRight.length} value={steps} onChange={(event) => setSteps(Number(event.target.value))} /></label>
        <div className="mt-4 grid gap-2 sm:grid-cols-3"><div className="border border-accent p-3 text-accent"><div className="text-xs">left remaining</div><div className="mt-2 font-mono">{mergeLeft.slice(trace.i).join(", ") || "empty"}</div></div><div className="border border-warning p-3 text-warning"><div className="text-xs">right remaining</div><div className="mt-2 font-mono">{mergeRight.slice(trace.j).join(", ") || "empty"}</div></div><div className="border border-success p-3 text-success"><div className="text-xs">merged prefix</div><div className="mt-2 font-mono">{trace.output.join(", ") || "empty"}</div></div></div>
      </Panel>
      <Caption>Merging compares the first unconsumed elements of two sorted sequences; the smaller one is globally next.</Caption>
    </figure>
  );
}

export function CLRS4DivideTreeLab() {
  const [power, setPower] = useState(5);
  const n = 2 ** power;
  const levels = Array.from({ length: power + 1 }, (_, level) => ({ nodes: 2 ** level, subproblem: n / 2 ** level }));

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">merge-sort size n = {n}<input className="mt-2 w-full accent-current" type="range" min="1" max="8" value={power} onChange={(event) => setPower(Number(event.target.value))} /></label>
        <div className="mt-4 space-y-2">{levels.map((level, index) => <div key={index} className="grid grid-cols-[4rem_1fr_7rem] items-center gap-2 text-xs"><span className="text-secondary">level {index}</span><div className="h-3 border border-border bg-background"><div className="h-full bg-accent" style={{ width: "100%" }} /></div><span className="text-right font-mono text-accent">{level.nodes}×{level.subproblem}</span></div>)}</div>
      </Panel>
      <Caption>Merge sort has log2 n split levels, and merging across all subproblems on each level processes n elements.</Caption>
    </figure>
  );
}

export function CLRS4RecurrenceLab() {
  const [power, setPower] = useState(6);
  const n = 2 ** power;
  const mergeWork = n * power;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">n = 2^{power} = {n}<input className="mt-2 w-full accent-current" type="range" min="1" max="12" value={power} onChange={(event) => setPower(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="recurrence" value="2T(n/2)+Θ(n)" /><Stat label="levels" value={`${power}`} tone="warning" /><Stat label="merge work" value={`${mergeWork}`} tone="success" /></div>
      </Panel>
      <Caption>The recurrence records algorithm structure: two half-size recursive calls plus linear work to merge their sorted outputs.</Caption>
    </figure>
  );
}

export function CLRS4AnalysisCertificateLab() {
  const [issue, setIssue] = useState<"valid" | "wrong invariant" | "missing model" | "bad recurrence" | "no base case">("valid");
  const checks = {
    contract: true,
    invariant: issue !== "wrong invariant",
    costModel: issue !== "missing model",
    recurrence: issue !== "bad recurrence",
    termination: issue !== "no base case",
  };

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">chapter-2 certificate<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={issue} onChange={(event) => setIssue(event.target.value as typeof issue)}><option value="valid">valid</option><option value="wrong invariant">wrong invariant</option><option value="missing model">missing cost model</option><option value="bad recurrence">bad recurrence</option><option value="no base case">no base case</option></select></label>
        <div className="mt-4 grid grid-cols-5 gap-2">{Object.entries(checks).map(([name, ok]) => <div key={name} className={`border p-2 text-center text-[11px] ${ok ? "border-success text-success" : "border-danger text-danger"}`}><div>{name}</div><div className="font-mono">{ok ? "pass" : "fail"}</div></div>)}</div>
      </Panel>
      <Caption>A complete analysis ties the problem contract to a proof invariant, a cost model, a recurrence or count, and a terminating base case.</Caption>
    </figure>
  );
}
