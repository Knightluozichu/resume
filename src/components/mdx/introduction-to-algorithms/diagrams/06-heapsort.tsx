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

const heap = [16, 14, 10, 8, 7, 9, 3, 2, 4, 1];

function ArrayCells({ values, active = -1, sortedFrom = values.length }: { values: number[]; active?: number; sortedFrom?: number }) {
  return <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">{values.map((value, index) => <div key={index} className={`border p-2 text-center ${index === active ? "border-warning bg-warning/10 text-warning" : index >= sortedFrom ? "border-success bg-success/10 text-success" : "border-accent text-accent"}`}><div className="font-mono">{value}</div><div className="text-[10px] text-secondary">{index + 1}</div></div>)}</div>;
}

export function CLRS4HeapArrayTreeLab() {
  const [level, setLevel] = useState(2);
  const rows = [[heap[0]], heap.slice(1, 3), heap.slice(3, 7), heap.slice(7)];
  return (
    <Figure caption="A binary heap is a nearly complete binary tree stored level by level in one contiguous array.">
      <label className="text-sm font-semibold text-primary">highlight tree level = {level}<input className="mt-2 w-full accent-current" type="range" min="0" max="3" value={level} onChange={(event) => setLevel(Number(event.target.value))} /></label>
      <div className="mt-4 space-y-2">{rows.map((row, rowIndex) => <div key={rowIndex} className="flex justify-center gap-2">{row.map((value, index) => <div key={index} className={`w-12 border p-3 text-center font-mono ${rowIndex === level ? "border-warning bg-warning/10 text-warning" : "border-border text-secondary"}`}>{value}</div>)}</div>)}</div>
      <div className="mt-4"><ArrayCells values={heap} active={2 ** level - 1} /></div>
    </Figure>
  );
}

export function CLRS4HeapIndexLab() {
  const [i, setI] = useState(3);
  const parent = i > 1 ? Math.floor(i / 2) : null;
  const left = 2 * i <= heap.length ? 2 * i : null;
  const right = 2 * i + 1 <= heap.length ? 2 * i + 1 : null;
  return (
    <Figure caption="One-based heap indices encode tree navigation arithmetically, eliminating explicit child pointers.">
      <label className="text-sm font-semibold text-primary">node index i = {i}<input className="mt-2 w-full accent-current" type="range" min="1" max={heap.length} value={i} onChange={(event) => setI(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-4 gap-2"><Stat label="A[i]" value={heap[i - 1].toString()} /><Stat label="parent ⌊i/2⌋" value={parent ? `${parent}: ${heap[parent - 1]}` : "none"} tone="warning" /><Stat label="left 2i" value={left ? `${left}: ${heap[left - 1]}` : "none"} tone="success" /><Stat label="right 2i+1" value={right ? `${right}: ${heap[right - 1]}` : "none"} tone="success" /></div>
    </Figure>
  );
}

function heapifyStates(input: number[], index: number, size = input.length) {
  const values = [...input];
  const states = [[...values]];
  let i = index;
  while (true) {
    const left = 2 * i + 1;
    const right = left + 1;
    let largest = i;
    if (left < size && values[left] > values[largest]) largest = left;
    if (right < size && values[right] > values[largest]) largest = right;
    if (largest === i) break;
    [values[i], values[largest]] = [values[largest], values[i]];
    i = largest;
    states.push([...values]);
  }
  return states;
}

export function CLRS4MaxHeapifyTraceLab() {
  const states = useMemo(() => heapifyStates([16, 4, 10, 14, 7, 9, 3, 2, 8, 1], 1), []);
  const [step, setStep] = useState(0);
  return (
    <Figure caption="MAX-HEAPIFY follows the larger child downward; every swap repairs the current root while moving the only possible violation into one subtree.">
      <label className="text-sm font-semibold text-primary">heapify swaps completed = {step}<input className="mt-2 w-full accent-current" type="range" min="0" max={states.length - 1} value={step} onChange={(event) => setStep(Number(event.target.value))} /></label>
      <div className="mt-4"><ArrayCells values={states[step]} /></div>
      <div className="mt-3 grid grid-cols-2 gap-2"><Stat label="start violation" value="4 below 14" tone="danger" /><Stat label="remaining path height" value={(states.length - 1 - step).toString()} tone={step === states.length - 1 ? "success" : "warning"} /></div>
    </Figure>
  );
}

export function CLRS4HeapifyInvariantLab() {
  const [issue, setIssue] = useState<"valid" | "left broken" | "right broken" | "wrong child">("valid");
  const checks = {
    "left subtree is heap": issue !== "left broken",
    "right subtree is heap": issue !== "right broken",
    "swap with larger child": issue !== "wrong child",
    "violation moves downward": issue === "valid",
  };
  return (
    <Figure caption="MAX-HEAPIFY assumes both child subtrees already satisfy the heap property; only the root may violate it.">
      <label className="text-sm font-semibold text-primary">precondition audit<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={issue} onChange={(event) => setIssue(event.target.value as typeof issue)}><option value="valid">valid call</option><option value="left broken">left subtree broken</option><option value="right broken">right subtree broken</option><option value="wrong child">swap with smaller child</option></select></label>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{Object.entries(checks).map(([name, ok]) => <div key={name} className={`border p-3 text-center text-xs ${ok ? "border-success text-success" : "border-danger text-danger"}`}>{name}<div className="mt-1 font-mono">{ok ? "pass" : "fail"}</div></div>)}</div>
    </Figure>
  );
}

function buildStates(input: number[]) {
  const values = [...input];
  const states = [[...values]];
  for (let i = Math.floor(values.length / 2) - 1; i >= 0; i -= 1) {
    const next = heapifyStates(values, i).at(-1) ?? values;
    values.splice(0, values.length, ...next);
    states.push([...values]);
  }
  return states;
}

export function CLRS4BuildHeapLab() {
  const states = useMemo(() => buildStates([4, 1, 3, 2, 16, 9, 10, 14, 8, 7]), []);
  const [step, setStep] = useState(0);
  const nextIndex = Math.max(1, Math.floor(10 / 2) - step);
  return (
    <Figure caption="BUILD-MAX-HEAP processes internal nodes bottom-up because all leaves are already one-node heaps.">
      <label className="text-sm font-semibold text-primary">bottom-up heapify calls = {step}<input className="mt-2 w-full accent-current" type="range" min="0" max={states.length - 1} value={step} onChange={(event) => setStep(Number(event.target.value))} /></label>
      <div className="mt-4"><ArrayCells values={states[step]} active={step < states.length - 1 ? nextIndex - 1 : -1} /></div>
      <div className="mt-3 text-center text-sm text-secondary">{step === states.length - 1 ? "complete max-heap" : `next internal node: ${nextIndex}`}</div>
    </Figure>
  );
}

export function CLRS4BuildCostLab() {
  const [power, setPower] = useState(8);
  const n = 2 ** power;
  const levels = Array.from({ length: power }, (_, h) => ({ h, nodes: Math.ceil(n / 2 ** (h + 1)), work: Math.ceil(n / 2 ** (h + 1)) * h }));
  const total = levels.reduce((sum, row) => sum + row.work, 0);
  return (
    <Figure caption="Bottom-up build is linear because many low nodes have tiny height; summing node count times height gives a convergent weighted series.">
      <label className="text-sm font-semibold text-primary">heap capacity n = 2^{power} = {n}<input className="mt-2 w-full accent-current" type="range" min="3" max="12" value={power} onChange={(event) => setPower(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="internal nodes" value={Math.floor(n / 2).toString()} /><Stat label="loose n lg n bound" value={(n * power).toLocaleString()} tone="warning" /><Stat label="height-weight sum" value={`${total.toLocaleString()} = O(n)`} tone="success" /></div>
    </Figure>
  );
}

function heapsortStates(input: number[]) {
  const values = buildStates(input).at(-1) ?? [...input];
  const states = [{ values: [...values], sortedFrom: values.length }];
  for (let end = values.length - 1; end > 0; end -= 1) {
    [values[0], values[end]] = [values[end], values[0]];
    const next = heapifyStates(values, 0, end).at(-1) ?? values;
    values.splice(0, values.length, ...next);
    states.push({ values: [...values], sortedFrom: end });
  }
  return states;
}

export function CLRS4HeapsortTraceLab() {
  const states = useMemo(() => heapsortStates([4, 1, 3, 2, 16, 9, 10, 14, 8, 7]), []);
  const [step, setStep] = useState(0);
  const state = states[step];
  return (
    <Figure caption="Heapsort swaps the maximum root into the shrinking sorted suffix, then restores the heap on the remaining prefix.">
      <label className="text-sm font-semibold text-primary">extractions completed = {step}<input className="mt-2 w-full accent-current" type="range" min="0" max={states.length - 1} value={step} onChange={(event) => setStep(Number(event.target.value))} /></label>
      <div className="mt-4"><ArrayCells values={state.values} sortedFrom={state.sortedFrom} /></div>
      <div className="mt-3 grid grid-cols-2 gap-2"><Stat label="heap size" value={state.sortedFrom.toString()} /><Stat label="sorted suffix" value={(state.values.length - state.sortedFrom).toString()} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4HeapsortInvariantLab() {
  const [step, setStep] = useState(4);
  const n = 10;
  return (
    <Figure caption="The heapsort loop maintains a max-heap prefix and an ascending suffix containing the largest extracted keys.">
      <label className="text-sm font-semibold text-primary">loop iteration = {step}<input className="mt-2 w-full accent-current" type="range" min="0" max={n - 1} value={step} onChange={(event) => setStep(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-2"><div className="border border-accent p-5 text-center text-accent"><div className="font-mono text-xl">{n - step}</div><div className="text-xs">max-heap prefix</div></div><div className="border border-success p-5 text-center text-success"><div className="font-mono text-xl">{step}</div><div className="text-xs">sorted largest keys</div></div></div>
    </Figure>
  );
}

export function CLRS4PriorityQueueLab() {
  const [operation, setOperation] = useState<"maximum" | "extract" | "increase" | "insert">("extract");
  const rows = {
    maximum: ["read A[1]", "Θ(1)", "heap unchanged"],
    extract: ["move last to root, heapify", "O(lg n)", "maximum removed"],
    increase: ["raise key, bubble toward root", "O(lg n)", "ancestors repaired"],
    insert: ["append −∞, then increase key", "O(lg n)", "size grows by one"],
  }[operation];
  return (
    <Figure caption="A max-priority queue exposes heap operations whose costs follow the height of the complete binary tree.">
      <label className="text-sm font-semibold text-primary">operation<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={operation} onChange={(event) => setOperation(event.target.value as typeof operation)}><option value="maximum">MAXIMUM</option><option value="extract">EXTRACT-MAX</option><option value="increase">INCREASE-KEY</option><option value="insert">INSERT</option></select></label>
      <div className="mt-4 grid gap-2 sm:grid-cols-3"><Stat label="mechanism" value={rows[0]} /><Stat label="cost" value={rows[1]} tone="success" /><Stat label="postcondition" value={rows[2]} tone="warning" /></div>
    </Figure>
  );
}

export function CLRS4HeapCertificateLab() {
  const [issue, setIssue] = useState<"valid" | "bad index" | "bad build order" | "bad heap size" | "bad key update">("valid");
  const checks = {
    "index mapping": issue !== "bad index",
    "bottom-up build": issue !== "bad build order",
    "heap-size boundary": issue !== "bad heap size",
    "key monotonicity": issue !== "bad key update",
  };
  return (
    <Figure caption="A heap certificate tracks array/tree mapping, heap-size ownership, repair preconditions, and operation-specific key constraints.">
      <label className="text-sm font-semibold text-primary">implementation audit<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={issue} onChange={(event) => setIssue(event.target.value as typeof issue)}><option value="valid">valid</option><option value="bad index">bad index mapping</option><option value="bad build order">top-down heapify</option><option value="bad heap size">sorted suffix included</option><option value="bad key update">decrease in INCREASE-KEY</option></select></label>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{Object.entries(checks).map(([name, ok]) => <div key={name} className={`border p-3 text-center text-xs ${ok ? "border-success text-success" : "border-danger text-danger"}`}>{name}<div className="mt-1 font-mono">{ok ? "pass" : "fail"}</div></div>)}</div>
    </Figure>
  );
}
