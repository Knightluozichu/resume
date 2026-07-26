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
  return <div className={`min-w-0 border p-3 text-center ${classes}`}><div className="text-xs">{label}</div><div className="mt-1 break-words font-mono text-sm">{value}</div></div>;
}

const SAMPLE = [7, 3, 5, 1, 6, 2, 4];

function inversionCount(values: number[]) {
  let count = 0;
  for (let left = 0; left < values.length; left += 1) for (let right = left + 1; right < values.length; right += 1) if (values[left] > values[right]) count += 1;
  return count;
}

export function TcpPermutationLab() {
  const [rotation, setRotation] = useState(0);
  const values = SAMPLE.map((_, index) => SAMPLE[(index + rotation) % SAMPLE.length]);
  const inversions = inversionCount(values);
  return (
    <Figure caption="An inversion is a pair whose relative order disagrees with sorted order; parity changes under every transposition and insertion cost follows local inversions.">
      <label className="text-sm font-semibold text-primary">cyclic rotation = {rotation}<input className="mt-2 h-11 w-full accent-current" type="range" min="0" max="6" value={rotation} onChange={(event) => setRotation(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-7 gap-1">{values.map((value, index) => <div key={index} className="border border-border bg-background p-3 text-center font-mono text-sm text-primary">{value}</div>)}</div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="inversions" value={inversions.toString()} /><Stat label="parity" value={inversions % 2 ? "odd" : "even"} tone="warning" /><Stat label="permutation" value={values.join(" ")} tone="success" /></div>
    </Figure>
  );
}

type RecordItem = { key: number; id: string };
const RECORDS: RecordItem[] = [{ key: 2, id: "A" }, { key: 1, id: "B" }, { key: 2, id: "C" }, { key: 1, id: "D" }, { key: 2, id: "E" }];

export function TcpStabilityLab() {
  const [stable, setStable] = useState(true);
  const sorted = [...RECORDS].sort((left, right) => left.key - right.key || (stable ? 0 : right.id.localeCompare(left.id)));
  return (
    <Figure caption="Stability concerns records with equal keys: a stable sort preserves their input order, which lets earlier sorting passes remain meaningful.">
      <label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={stable} onChange={(event) => setStable(event.target.checked)} />preserve equal-key order</label>
      <div className="mt-4 grid grid-cols-5 gap-2">{sorted.map((item) => <Stat key={item.id} label={`key ${item.key}`} value={item.id} tone={item.key === 1 ? "success" : "accent"} />)}</div>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="key 1 ids" value={sorted.filter((item) => item.key === 1).map((item) => item.id).join(" → ")} /><Stat label="key 2 ids" value={sorted.filter((item) => item.key === 2).map((item) => item.id).join(" → ")} /></div>
    </Figure>
  );
}

function insertionPrefix(values: number[], limit: number) {
  const output = [...values];
  let comparisons = 0;
  let moves = 0;
  for (let index = 1; index < limit; index += 1) {
    const key = output[index];
    let cursor = index - 1;
    while (cursor >= 0) {
      comparisons += 1;
      if (output[cursor] <= key) break;
      output[cursor + 1] = output[cursor];
      moves += 1;
      cursor -= 1;
    }
    output[cursor + 1] = key;
  }
  return { output, comparisons, moves };
}

export function TcpInsertionLab() {
  const [prefix, setPrefix] = useState(4);
  const result = insertionPrefix(SAMPLE, prefix);
  return (
    <Figure caption="Insertion sort maintains a sorted prefix; the number of element shifts equals the inversions removed from that prefix.">
      <label className="text-sm font-semibold text-primary">sorted prefix length = {prefix}<input className="mt-2 h-11 w-full accent-current" type="range" min="1" max={SAMPLE.length} value={prefix} onChange={(event) => setPrefix(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-7 gap-1">{result.output.map((value, index) => <div key={index} className={`border p-3 text-center font-mono text-sm ${index < prefix ? "border-success bg-success/15 text-success" : "border-border bg-background text-primary"}`}>{value}</div>)}</div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="comparisons" value={result.comparisons.toString()} /><Stat label="moves" value={result.moves.toString()} tone="warning" /><Stat label="prefix invariant" value="sorted" tone="success" /></div>
    </Figure>
  );
}

function shellSort(values: number[], gaps: number[]) {
  const output = [...values];
  let comparisons = 0;
  let moves = 0;
  for (const gap of gaps) for (let index = gap; index < output.length; index += 1) {
    const value = output[index];
    let cursor = index;
    while (cursor >= gap) {
      comparisons += 1;
      if (output[cursor - gap] <= value) break;
      output[cursor] = output[cursor - gap];
      moves += 1;
      cursor -= gap;
    }
    output[cursor] = value;
  }
  return { output, comparisons, moves };
}

export function TcpShellLab() {
  const [family, setFamily] = useState<"halving" | "knuth">("knuth");
  const values = [19, 2, 31, 45, 6, 11, 121, 27, 8, 14, 3, 55, 1, 22, 9];
  const gaps = family === "halving" ? [7, 3, 1] : [13, 4, 1];
  const result = shellSort(values, gaps);
  return (
    <Figure caption="Shellsort performs insertion sorts on interleaved subsequences; the gap sequence controls how quickly distant inversions disappear.">
      <label className="text-sm font-semibold text-primary">gap family<select className="mt-2 block w-full border border-border bg-background p-2" value={family} onChange={(event) => setFamily(event.target.value as typeof family)}><option value="knuth">Knuth-like 13,4,1</option><option value="halving">halving 7,3,1</option></select></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="gaps" value={gaps.join(" → ")} /><Stat label="comparisons" value={result.comparisons.toString()} /><Stat label="moves" value={result.moves.toString()} tone="warning" /></div>
      <div className="mt-2"><Stat label="sorted output" value={result.output.join(" ")} tone="success" /></div>
    </Figure>
  );
}

function partition(values: number[], pivotIndex: number) {
  const pivot = values[pivotIndex];
  const less = values.filter((value, index) => index !== pivotIndex && value < pivot);
  const equal = values.filter((value) => value === pivot);
  const greater = values.filter((value, index) => index !== pivotIndex && value > pivot);
  return { pivot, less, equal, greater };
}

export function TcpPartitionLab() {
  const [pivotIndex, setPivotIndex] = useState(2);
  const result = partition(SAMPLE, pivotIndex);
  return (
    <Figure caption="Quicksort partitioning establishes an order relation around a pivot; balance determines recursion depth while three-way partitioning controls duplicates.">
      <label className="text-sm font-semibold text-primary">pivot position = {pivotIndex}<input className="mt-2 h-11 w-full accent-current" type="range" min="0" max={SAMPLE.length - 1} value={pivotIndex} onChange={(event) => setPivotIndex(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="less" value={result.less.join(" ") || "empty"} /><Stat label="pivot / equal" value={`${result.pivot} / ${result.equal.join(" ")}`} tone="warning" /><Stat label="greater" value={result.greater.join(" ") || "empty"} tone="success" /></div>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="left size" value={result.less.length.toString()} /><Stat label="right size" value={result.greater.length.toString()} /></div>
    </Figure>
  );
}

function merge(left: number[], right: number[], count: number) {
  const output: number[] = [];
  let i = 0;
  let j = 0;
  while (output.length < count && (i < left.length || j < right.length)) {
    if (j >= right.length || (i < left.length && left[i] <= right[j])) output.push(left[i++]);
    else output.push(right[j++]);
  }
  return { output, leftCursor: i, rightCursor: j };
}

export function TcpMergeLab() {
  const [step, setStep] = useState(4);
  const left = [1, 4, 7, 10];
  const right = [2, 3, 8, 9];
  const result = merge(left, right, step);
  return (
    <Figure caption="Merging consumes the smaller current head and maintains a sorted output prefix; equal keys are taken from the left to preserve stability.">
      <label className="text-sm font-semibold text-primary">output items = {step}<input className="mt-2 h-11 w-full accent-current" type="range" min="0" max="8" value={step} onChange={(event) => setStep(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="left unread" value={left.slice(result.leftCursor).join(" ") || "empty"} /><Stat label="right unread" value={right.slice(result.rightCursor).join(" ") || "empty"} /><Stat label="output prefix" value={result.output.join(" ") || "empty"} tone="success" /></div>
    </Figure>
  );
}

function buildMaxHeap(values: number[]) {
  const heap = [...values];
  let swaps = 0;
  for (let root = Math.floor(heap.length / 2) - 1; root >= 0; root -= 1) {
    let current = root;
    while (true) {
      const left = current * 2 + 1;
      const right = left + 1;
      let largest = current;
      if (left < heap.length && heap[left] > heap[largest]) largest = left;
      if (right < heap.length && heap[right] > heap[largest]) largest = right;
      if (largest === current) break;
      [heap[current], heap[largest]] = [heap[largest], heap[current]];
      swaps += 1;
      current = largest;
    }
  }
  return { heap, swaps };
}

export function TcpHeapLab() {
  const [size, setSize] = useState(7);
  const result = buildMaxHeap(SAMPLE.slice(0, size));
  const valid = result.heap.every((value, index) => (index === 0 || result.heap[Math.floor((index - 1) / 2)] >= value));
  return (
    <Figure caption="Bottom-up heap construction restores the parent-dominates-children invariant from the last internal node to the root in linear time.">
      <label className="text-sm font-semibold text-primary">heap size = {size}<input className="mt-2 h-11 w-full accent-current" type="range" min="2" max="7" value={size} onChange={(event) => setSize(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-7 gap-1">{result.heap.map((value, index) => <div key={index} className="border border-border bg-background p-3 text-center font-mono text-sm text-primary">{value}</div>)}</div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="root maximum" value={result.heap[0].toString()} /><Stat label="construction swaps" value={result.swaps.toString()} /><Stat label="heap invariant" value={valid ? "valid" : "broken"} tone={valid ? "success" : "danger"} /></div>
    </Figure>
  );
}

export function TcpDistributionLab() {
  const [range, setRange] = useState(8);
  const values = [6, 1, 4, 1, 7, 3, 4, 0, 6, 2, 3, 1];
  const counts = Array.from({ length: range }, () => 0);
  for (const value of values) if (value < range) counts[value] += 1;
  const retained = counts.reduce((sum, count) => sum + count, 0);
  return (
    <Figure caption="Distribution sorting replaces key comparisons with a bounded key map; its cost depends on both record count and key universe size.">
      <label className="text-sm font-semibold text-primary">accepted key range = 0..{range - 1}<input className="mt-2 h-11 w-full accent-current" type="range" min="2" max="8" value={range} onChange={(event) => setRange(Number(event.target.value))} /></label>
      <div className="mt-4 flex h-36 items-end gap-2 border border-border bg-background p-2">{counts.map((count, key) => <div key={key} className="flex flex-1 flex-col justify-end text-center text-xs text-secondary"><span>{count}</span><div className="bg-accent/70" style={{ height: `${Math.max(3, count * 28)}px` }} /><span>{key}</span></div>)}</div>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="retained records" value={retained.toString()} tone="success" /><Stat label="outside range" value={(values.length - retained).toString()} tone={retained === values.length ? "success" : "warning"} /></div>
    </Figure>
  );
}

function factorial(value: number) {
  let result = 1;
  for (let factor = 2; factor <= value; factor += 1) result *= factor;
  return result;
}

export function TcpDecisionTreeLab() {
  const [size, setSize] = useState(5);
  const leaves = factorial(size);
  const lowerBound = Math.ceil(Math.log2(leaves));
  return (
    <Figure caption="A deterministic comparison sort needs one decision-tree leaf per input permutation, so worst-case comparisons are at least the ceiling of log2(n!).">
      <label className="text-sm font-semibold text-primary">items n = {size}<input className="mt-2 h-11 w-full accent-current" type="range" min="2" max="10" value={size} onChange={(event) => setSize(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="permutations n!" value={leaves.toLocaleString()} /><Stat label="minimum tree depth" value={lowerBound.toString()} tone="warning" /><Stat label="n log2 n" value={(size * Math.log2(size)).toFixed(2)} /></div>
    </Figure>
  );
}

const NETWORK = [[0, 1], [2, 3], [0, 2], [1, 3], [1, 2]] as const;

export function TcpSortingNetworkLab() {
  const [mask, setMask] = useState(10);
  const [stage, setStage] = useState(5);
  const wires = Array.from({ length: 4 }, (_, index) => (mask >> (3 - index)) & 1);
  for (const [left, right] of NETWORK.slice(0, stage)) if (wires[left] > wires[right]) [wires[left], wires[right]] = [wires[right], wires[left]];
  const sorted = wires.every((value, index) => index === 0 || wires[index - 1] <= value);
  return (
    <Figure caption="A sorting network fixes the comparison schedule independently of data; the zero-one principle reduces verification to binary inputs.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">binary input = {mask.toString(2).padStart(4, "0")}<input className="mt-2 h-11 w-full accent-current" type="range" min="0" max="15" value={mask} onChange={(event) => setMask(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">comparators applied = {stage}<input className="mt-2 h-11 w-full accent-current" type="range" min="0" max="5" value={stage} onChange={(event) => setStage(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-4 gap-2">{wires.map((value, index) => <Stat key={index} label={`wire ${index}`} value={value.toString()} tone={sorted ? "success" : "accent"} />)}</div>
      <div className="mt-4"><Stat label="network output" value={sorted ? "sorted" : "unfinished"} tone={sorted ? "success" : "warning"} /></div>
    </Figure>
  );
}

function replacementRuns(input: number[], memorySize: number) {
  const active = input.slice(0, memorySize).sort((a, b) => a - b);
  const frozen: number[] = [];
  const runs: number[][] = [[]];
  let cursor = memorySize;
  while (active.length || frozen.length) {
    if (!active.length) { active.push(...frozen.splice(0).sort((a, b) => a - b)); runs.push([]); }
    const value = active.shift()!;
    runs.at(-1)!.push(value);
    if (cursor < input.length) {
      const incoming = input[cursor++];
      if (incoming >= value) { active.push(incoming); active.sort((a, b) => a - b); }
      else frozen.push(incoming);
    }
  }
  return runs.filter((run) => run.length);
}

export function TcpReplacementSelectionLab() {
  const [memory, setMemory] = useState(4);
  const input = [12, 4, 19, 7, 3, 15, 8, 21, 2, 18, 6, 10, 1, 17];
  const runs = replacementRuns(input, memory);
  return (
    <Figure caption="Replacement selection freezes incoming records that would break the current run; with random input, runs are often longer than memory.">
      <label className="text-sm font-semibold text-primary">records in memory = {memory}<input className="mt-2 h-11 w-full accent-current" type="range" min="2" max="7" value={memory} onChange={(event) => setMemory(Number(event.target.value))} /></label>
      <div className="mt-4 grid gap-2">{runs.map((run, index) => <Stat key={index} label={`run ${index + 1}`} value={run.join(" ")} tone={index === 0 ? "success" : "accent"} />)}</div>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="run count" value={runs.length.toString()} /><Stat label="longest run" value={Math.max(...runs.map((run) => run.length)).toString()} tone="success" /></div>
    </Figure>
  );
}

function kWayPrefix(streams: number[][], count: number) {
  const cursors = streams.map(() => 0);
  const output: number[] = [];
  while (output.length < count) {
    let chosen = -1;
    for (let stream = 0; stream < streams.length; stream += 1) if (cursors[stream] < streams[stream].length && (chosen < 0 || streams[stream][cursors[stream]] < streams[chosen][cursors[chosen]])) chosen = stream;
    if (chosen < 0) break;
    output.push(streams[chosen][cursors[chosen]++]);
  }
  return { output, cursors };
}

export function TcpKWayMergeLab() {
  const [count, setCount] = useState(7);
  const streams = [[1, 8, 15, 22], [2, 4, 17, 19], [3, 6, 9, 21]];
  const result = kWayPrefix(streams, count);
  return (
    <Figure caption="A k-way merge keeps one frontier item per run; a heap or loser tree reduces each output choice from linear scan to logarithmic work.">
      <label className="text-sm font-semibold text-primary">merged outputs = {count}<input className="mt-2 h-11 w-full accent-current" type="range" min="0" max="12" value={count} onChange={(event) => setCount(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2">{streams.map((stream, index) => <Stat key={index} label={`run ${index + 1} unread`} value={stream.slice(result.cursors[index]).join(" ") || "empty"} />)}</div>
      <div className="mt-2"><Stat label="merged prefix" value={result.output.join(" ") || "empty"} tone="success" /></div>
    </Figure>
  );
}

export function TcpSortingCertificateLab() {
  const [ordered, setOrdered] = useState(true);
  const [permutation, setPermutation] = useState(false);
  const [stability, setStability] = useState(true);
  const [cost, setCost] = useState(false);
  const complete = ordered && permutation && stability && cost;
  return (
    <Figure caption="A sorting certificate separates orderedness, permutation preservation, declared stability, and a cost model that includes memory or external I/O.">
      <div className="grid gap-3 sm:grid-cols-4"><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={ordered} onChange={(event) => setOrdered(event.target.checked)} />ordered</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={permutation} onChange={(event) => setPermutation(event.target.checked)} />same multiset</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={stability} onChange={(event) => setStability(event.target.checked)} />stability</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={cost} onChange={(event) => setCost(event.target.checked)} />cost / I-O</label></div>
      <div className="mt-4"><Stat label="Chapter 5 sorting certificate" value={complete ? "complete" : "incomplete"} tone={complete ? "success" : "warning"} /></div>
    </Figure>
  );
}

export function TcpSequencesDiagram() {
  return <TcpPermutationLab />;
}
