"use client";

import { useMemo, useState } from "react";

const baseValues = [8, 3, 6, 1, 7, 2, 5, 4] as const;

export function DsaSortingContractLab() {
  const [property, setProperty] = useState<"stable" | "memory" | "adaptivity">("stable");
  const details = {
    stable: { question: "equal keys keep original order?", example: "A2, B2 -> A2, B2" },
    memory: { question: "how much auxiliary storage?", example: "in-place vs O(N) buffer" },
    adaptivity: { question: "does nearly sorted input help?", example: "inversions drive insertion work" },
  }[property];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 gap-2">
          {(["stable", "memory", "adaptivity"] as const).map((candidate) => (
            <button key={candidate} type="button" onClick={() => setProperty(candidate)} className={"min-h-11 border px-1 text-xs font-semibold " + (property === candidate ? "border-accent bg-accent text-background" : "border-border bg-background text-primary")}>{candidate}</button>
          ))}
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <div className="border border-border bg-background p-3 text-xs text-secondary">{details.question}</div>
          <div className="border border-success bg-success/10 p-3 font-mono text-xs text-success">{details.example}</div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">“Sorted”之外还要明确 stability、space、adaptivity、comparison 与 move cost。</figcaption>
    </figure>
  );
}

function insertionFrames(values: readonly number[]) {
  const a = [...values];
  const frames = [[...a]];
  for (let p = 1; p < a.length; p += 1) {
    const value = a[p];
    let j = p;
    while (j > 0 && value < a[j - 1]) {
      a[j] = a[j - 1];
      j -= 1;
    }
    a[j] = value;
    frames.push([...a]);
  }
  return frames;
}

const insertionTrace = insertionFrames(baseValues);

export function DsaInsertionSortLab() {
  const [pass, setPass] = useState(3);
  const values = insertionTrace[pass];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="flex gap-1">
          {values.map((value, index) => (
            <span key={`${value}-${index}`} className={"flex-1 border p-2 text-center font-mono text-xs " + (index <= pass ? "border-success bg-success/10 text-success" : "border-border bg-background text-primary")}>{value}</span>
          ))}
        </div>
        <label className="mt-4 block text-sm font-semibold text-primary">sorted prefix pass = {pass}<input className="mt-2 w-full accent-current" type="range" min="0" max={insertionTrace.length - 1} value={pass} onChange={(event) => setPass(Number(event.target.value))} /></label>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Insertion sort 在每一轮维护 sorted prefix；移动次数与 inversions 同阶。</figcaption>
    </figure>
  );
}

export function DsaShellsortGapLab() {
  const [gap, setGap] = useState<1 | 2 | 4>(4);
  const groups = Array.from({ length: gap }, (_, start) =>
    baseValues.filter((_, index) => index % gap === start),
  );

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 gap-2">
          {([4, 2, 1] as const).map((candidate) => (
            <button key={candidate} type="button" onClick={() => setGap(candidate)} className={"min-h-11 border text-xs font-semibold " + (gap === candidate ? "border-accent bg-accent text-background" : "border-border bg-background text-primary")}>gap {candidate}</button>
          ))}
        </div>
        <div className="mt-4 space-y-2">
          {groups.map((group, index) => (
            <div key={index} className="grid grid-cols-[4rem_1fr] border border-border bg-background">
              <div className="border-r border-border p-2 text-center font-mono text-xs text-muted">g{index}</div>
              <div className="p-2 font-mono text-xs text-primary">{group.join(" -> ")}</div>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Shellsort 先让远距离元素移动，再以 gap 1 的 insertion sort 收尾；increment sequence 决定性能。</figcaption>
    </figure>
  );
}

type NLogNAlgorithm = "heapsort" | "mergesort" | "quicksort";

export function DsaNLogNSortComparisonLab() {
  const [algorithm, setAlgorithm] = useState<NLogNAlgorithm>("quicksort");
  const details = {
    heapsort: { invariant: "max-heap prefix + sorted suffix", extra: "O(1)", stable: "no", risk: "cache-unfriendly sift" },
    mergesort: { invariant: "two sorted runs -> one run", extra: "O(N)", stable: "yes", risk: "buffer/copy traffic" },
    quicksort: { invariant: "< pivot | pivot | > pivot", extra: "O(log N) expected stack", stable: "no", risk: "bad pivot -> O(N^2)" },
  }[algorithm];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 gap-2">
          {(["heapsort", "mergesort", "quicksort"] as NLogNAlgorithm[]).map((candidate) => (
            <button key={candidate} type="button" onClick={() => setAlgorithm(candidate)} className={"min-h-11 border px-1 text-xs font-semibold " + (algorithm === candidate ? "border-accent bg-accent text-background" : "border-border bg-background text-primary")}>{candidate}</button>
          ))}
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <div className="border border-border bg-background p-3 text-xs text-secondary">invariant<div className="mt-1 font-mono text-primary">{details.invariant}</div></div>
          <div className="border border-border bg-background p-3 text-xs text-secondary">extra space<div className="mt-1 font-mono text-primary">{details.extra}</div></div>
          <div className="border border-success bg-success/10 p-3 text-xs text-secondary">stable<div className="mt-1 font-mono text-success">{details.stable}</div></div>
          <div className="border border-warning bg-warning/10 p-3 text-xs text-secondary">dominant risk<div className="mt-1 font-mono text-warning">{details.risk}</div></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">相同 asymptotic class 不代表相同 stability、space、locality 或 worst-case。</figcaption>
    </figure>
  );
}

const records = [
  { id: "A", key: 40, bytes: "4 KB" },
  { id: "B", key: 10, bytes: "4 KB" },
  { id: "C", key: 30, bytes: "4 KB" },
  { id: "D", key: 20, bytes: "4 KB" },
] as const;

export function DsaIndirectSortLab() {
  const [phase, setPhase] = useState<"pointers" | "cycles">("pointers");
  const order = [...records].sort((a, b) => a.key - b.key);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-2">
          {(["pointers", "cycles"] as const).map((candidate) => (
            <button key={candidate} type="button" onClick={() => setPhase(candidate)} className={"min-h-11 border text-xs font-semibold " + (phase === candidate ? "border-accent bg-accent text-background" : "border-border bg-background text-primary")}>{candidate}</button>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          {(phase === "pointers" ? order : records).map((record, index) => (
            <div key={record.id} className="flex-1 border border-border bg-background p-2 text-center">
              <div className="font-mono text-xs text-primary">{phase === "pointers" ? `&${record.id}` : record.id}</div>
              <div className="mt-1 font-mono text-[10px] text-muted">key {record.key}</div>
              <div className="mt-1 text-[10px] text-accent">{phase === "pointers" ? "8 B move" : index === 0 ? "cycle temp" : record.bytes}</div>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Indirect sorting 先排序轻量 pointers，再按 permutation cycles 最少搬移大型 records。</figcaption>
    </figure>
  );
}

function factorial(n: number) {
  let value = 1;
  for (let i = 2; i <= n; i += 1) value *= i;
  return value;
}

export function DsaSortingLowerBoundLab() {
  const [size, setSize] = useState(6);
  const leaves = factorial(size);
  const comparisons = Math.ceil(Math.log2(leaves));

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">distinct keys N = {size}<input className="mt-2 w-full accent-current" type="range" min="2" max="10" value={size} onChange={(event) => setSize(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
          <div className="border border-border bg-background p-3 text-secondary">permutations<div className="mt-1 font-mono text-primary">{leaves.toLocaleString()}</div></div>
          <div className="border border-accent bg-accent/10 p-3 text-secondary">decision leaves<div className="mt-1 font-mono text-accent">at least N!</div></div>
          <div className="border border-success bg-success/10 p-3 text-secondary">worst comparisons<div className="mt-1 font-mono text-success">at least {comparisons}</div></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Comparison sorting decision tree 必须区分 N! permutations，因此高度至少 log2(N!)。</figcaption>
    </figure>
  );
}

const bucketValues = [5, 42, 17, 33, 8, 21, 49, 2, 37, 14] as const;

export function DsaBucketSortLab() {
  const [bucketCount, setBucketCount] = useState(5);
  const buckets = useMemo(
    () =>
      Array.from({ length: bucketCount }, (_, bucket) =>
        bucketValues.filter((value) => Math.min(bucketCount - 1, Math.floor(value / (50 / bucketCount))) === bucket),
      ),
    [bucketCount],
  );

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">bucket count = {bucketCount}<input className="mt-2 w-full accent-current" type="range" min="2" max="10" value={bucketCount} onChange={(event) => setBucketCount(Number(event.target.value))} /></label>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {buckets.map((bucket, index) => (
            <div key={index} className="grid grid-cols-[3rem_1fr] border border-border bg-background">
              <div className="border-r border-border p-2 text-center font-mono text-xs text-muted">{index}</div>
              <div className="p-2 font-mono text-xs text-primary">{bucket.length ? bucket.join(", ") : "empty"}</div>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Bucket sort 用 key domain 换掉纯 comparison 下界；分布偏斜会让单桶重新成为瓶颈。</figcaption>
    </figure>
  );
}

const externalStages = [
  { name: "run generation", detail: "RAM chunks -> sorted runs", files: "8 runs" },
  { name: "4-way merge", detail: "8 runs -> 2 larger runs", files: "2 runs" },
  { name: "final merge", detail: "2 runs -> sorted file", files: "1 run" },
] as const;

export function DsaExternalSortingLab() {
  const [stage, setStage] = useState(0);
  const current = externalStages[stage];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 gap-2">
          {externalStages.map((item, index) => (
            <button key={item.name} type="button" onClick={() => setStage(index)} className={"min-h-12 border px-1 text-[10px] font-semibold sm:text-xs " + (stage === index ? "border-accent bg-accent text-background" : "border-border bg-background text-primary")}>{index + 1}. {item.name}</button>
          ))}
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-[1fr_auto]">
          <div className="border border-border bg-background p-3 text-xs text-secondary">{current.detail}</div>
          <div className="border border-success bg-success/10 p-3 font-mono text-xs text-success">{current.files}</div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">External sorting 优化 sequential I/O 与 merge fan-in；CPU comparisons 通常不是主成本。</figcaption>
    </figure>
  );
}

export function DsaSortingChoiceMatrix() {
  const [scenario, setScenario] = useState<"nearly" | "stable" | "memory" | "disk">("stable");
  const choices = {
    nearly: "insertion sort",
    stable: "mergesort",
    memory: "heapsort / guarded quicksort",
    disk: "external multiway mergesort",
  };

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <select className="min-h-11 w-full border border-border bg-background px-3 text-sm text-primary" value={scenario} onChange={(event) => setScenario(event.target.value as typeof scenario)}>
          <option value="nearly">nearly sorted</option>
          <option value="stable">stable records</option>
          <option value="memory">tight memory</option>
          <option value="disk">larger than RAM</option>
        </select>
        <div className="mt-4 border border-success bg-success/10 p-3 text-center font-mono text-sm font-semibold text-success">{choices[scenario]}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Sort selection 先由数据规模、分布、stability、move cost 与 memory/I/O constraints 驱动。</figcaption>
    </figure>
  );
}
