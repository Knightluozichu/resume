"use client";

import { useMemo, useState } from "react";

type MergeItem = {
  key: number;
  label: string;
  side: "L" | "R";
};

const leftRun: MergeItem[] = [
  { key: 1, label: "1A", side: "L" },
  { key: 4, label: "4B", side: "L" },
  { key: 7, label: "7C", side: "L" },
  { key: 9, label: "9D", side: "L" },
];

const rightRun: MergeItem[] = [
  { key: 2, label: "2E", side: "R" },
  { key: 4, label: "4F", side: "R" },
  { key: 6, label: "6G", side: "R" },
  { key: 8, label: "8H", side: "R" },
];

function mergeTrace(left: MergeItem[], right: MergeItem[], stable = true) {
  let i = 0;
  let j = 0;
  const output: MergeItem[] = [];
  const frames = [{ i, j, output: [...output], decision: "copy runs to aux" }];
  while (i < left.length || j < right.length) {
    if (i >= left.length) {
      output.push(right[j]);
      j += 1;
    } else if (j >= right.length) {
      output.push(left[i]);
      i += 1;
    } else if (right[j].key < left[i].key || (!stable && right[j].key === left[i].key)) {
      output.push(right[j]);
      j += 1;
    } else {
      output.push(left[i]);
      i += 1;
    }
    frames.push({
      i,
      j,
      output: [...output],
      decision: output.at(-1)?.side === "L" ? "take left" : "take right",
    });
  }
  return frames;
}

const stableMerge = mergeTrace(leftRun, rightRun);

function Run({
  title,
  items,
  pointer,
}: {
  title: string;
  items: MergeItem[];
  pointer: number;
}) {
  return (
    <div className="border border-border bg-background p-3">
      <div className="mb-2 flex items-center justify-between text-[11px] text-secondary">
        <span>{title}</span>
        <span className="font-mono">pointer {pointer}</span>
      </div>
      <div className="grid grid-cols-4 gap-1">
        {items.map((item, index) => (
          <div
            key={item.label}
            className={
              "border p-2 text-center font-mono text-xs " +
              (index === pointer
                ? "border-warning bg-warning/10 text-warning"
                : index < pointer
                  ? "border-border bg-elevated text-secondary"
                  : "border-accent bg-accent/10 text-accent")
            }
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Algs4AbstractMergeLab() {
  const [step, setStep] = useState(4);
  const frame = stableMerge[step];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          merge writes = {step}
          <input
            className="mt-2 w-full accent-current"
            type="range"
            min="0"
            max={stableMerge.length - 1}
            value={step}
            onChange={(event) => setStep(Number(event.target.value))}
          />
        </label>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <Run title="aux[lo..mid]" items={leftRun} pointer={frame.i} />
          <Run title="aux[mid+1..hi]" items={rightRun} pointer={frame.j} />
        </div>
        <div className="mt-3 border border-success bg-success/10 p-3">
          <div className="mb-2 flex items-center justify-between text-[11px] text-secondary">
            <span>a[lo..k)</span>
            <span className="font-mono text-success">{frame.decision}</span>
          </div>
          <div className="grid min-h-10 grid-cols-8 gap-1">
            {Array.from({ length: 8 }, (_, index) => (
              <div
                key={index}
                className="border border-success/50 bg-background p-2 text-center font-mono text-xs text-success"
              >
                {frame.output[index]?.label ?? "·"}
              </div>
            ))}
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        两个指针只前进；相等时先取左run，输出prefix始终是尚未处理元素中的最小前缀。
      </figcaption>
    </figure>
  );
}

export function Algs4MergeStabilityLab() {
  const [stable, setStable] = useState(true);
  const trace = mergeTrace(leftRun, rightRun, stable);
  const output = trace.at(-1)?.output ?? [];
  const equalFours = output.filter((item) => item.key === 4).map((item) => item.label).join(" before ");

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setStable(true)}
            className={
              "min-h-11 border text-xs font-semibold " +
              (stable ? "border-success bg-success text-background" : "border-border bg-background text-primary")
            }
          >
            left on equal
          </button>
          <button
            type="button"
            onClick={() => setStable(false)}
            className={
              "min-h-11 border text-xs font-semibold " +
              (!stable ? "border-danger bg-danger text-background" : "border-border bg-background text-primary")
            }
          >
            right on equal
          </button>
        </div>
        <div className="mt-4 grid grid-cols-8 gap-1">
          {output.map((item) => (
            <div
              key={item.label}
              className={
                "border p-2 text-center font-mono text-xs " +
                (item.key === 4
                  ? stable
                    ? "border-success bg-success/10 text-success"
                    : "border-danger bg-danger/10 text-danger"
                  : "border-border bg-background text-primary")
              }
            >
              {item.label}
            </div>
          ))}
        </div>
        <div className="mt-3 border border-border bg-background p-3 text-xs text-secondary">
          equal-key order: <span className="font-mono text-primary">{equalFours}</span>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Merge只需改变equal分支就会改变稳定性；sortedness本身检测不到identity顺序反转。
      </figcaption>
    </figure>
  );
}

const topDownLevels = [
  [[0, 7]],
  [[0, 3], [4, 7]],
  [[0, 1], [2, 3], [4, 5], [6, 7]],
  [[0, 0], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7]],
] as const;

export function Algs4TopDownRecursionDiagram() {
  const [level, setLevel] = useState(2);
  const runs = topDownLevels[level];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          recursion depth = {level}
          <input
            className="mt-2 w-full accent-current"
            type="range"
            min="0"
            max={topDownLevels.length - 1}
            value={level}
            onChange={(event) => setLevel(Number(event.target.value))}
          />
        </label>
        <div
          className="mt-4 grid gap-2"
          style={{ gridTemplateColumns: `repeat(${runs.length}, minmax(0, 1fr))` }}
        >
          {runs.map(([lo, hi]) => (
            <div
              key={`${lo}-${hi}`}
              className={
                "border p-3 text-center font-mono text-xs " +
                (lo === hi
                  ? "border-success bg-success/10 text-success"
                  : "border-accent bg-accent/10 text-accent")
              }
            >
              [{lo}..{hi}]
              <div className="mt-1 text-[10px] text-secondary">N={hi - lo + 1}</div>
            </div>
          ))}
        </div>
        <div className="mt-3 border border-warning bg-warning/10 p-3 text-xs text-warning">
          Every level covers all 8 items once; merge work is linear per level.
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        自顶向下先递归到singleton，再沿树向上merge；每层总数据量保持N。
      </figcaption>
    </figure>
  );
}

type Improvement = "cutoff" | "ordered" | "ping-pong";

const improvements = {
  cutoff: {
    action: "use insertion sort for small subarrays",
    gain: "removes tiny recursive-call overhead",
    invariant: "small run must be sorted before parent merge",
  },
  ordered: {
    action: "skip merge when a[mid] <= a[mid+1]",
    gain: "already-sorted input becomes linear",
    invariant: "both halves sorted plus boundary order implies whole run sorted",
  },
  "ping-pong": {
    action: "swap src and dst roles at each recursion",
    gain: "eliminates per-merge copy time",
    invariant: "method contract must say which array owns output",
  },
} as const;

export function Algs4MergeImprovementsMap() {
  const [improvement, setImprovement] = useState<Improvement>("ordered");
  const active = improvements[improvement];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 gap-2">
          {(Object.keys(improvements) as Improvement[]).map((candidate) => (
            <button
              key={candidate}
              type="button"
              onClick={() => setImprovement(candidate)}
              className={
                "min-h-11 border px-1 text-xs font-semibold " +
                (improvement === candidate
                  ? "border-accent bg-accent text-background"
                  : "border-border bg-background text-primary")
              }
            >
              {candidate}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          <div className="border border-border bg-background p-3 text-xs text-secondary">
            action<div className="mt-1 font-mono text-primary">{active.action}</div>
          </div>
          <div className="border border-success bg-success/10 p-3 text-xs text-secondary">
            gain<div className="mt-1 font-mono text-success">{active.gain}</div>
          </div>
          <div className="border border-warning bg-warning/10 p-3 text-xs text-secondary">
            proof obligation<div className="mt-1 font-mono text-warning">{active.invariant}</div>
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        三项改进分别削减小问题、已排序边界与复制常数，但都需要重新陈述方法契约。
      </figcaption>
    </figure>
  );
}

const bottomUpInput = [9, 1, 8, 2, 7, 3, 6, 4, 5, 0, 11, 10, 12];

function bottomUpPasses(input: number[]) {
  const values = [...input];
  const passes = [{ len: 0, values: [...values], runs: values.length }];
  for (let len = 1; len < values.length; len *= 2) {
    for (let lo = 0; lo < values.length - len; lo += len + len) {
      const hi = Math.min(lo + len + len, values.length);
      const merged = values.slice(lo, hi).sort((a, b) => a - b);
      values.splice(lo, merged.length, ...merged);
    }
    passes.push({ len, values: [...values], runs: Math.ceil(values.length / (len + len)) });
  }
  return passes;
}

const bottomUp = bottomUpPasses(bottomUpInput);

export function Algs4BottomUpScheduleLab() {
  const [pass, setPass] = useState(2);
  const frame = bottomUp[pass];
  const width = Math.max(1, frame.len * 2);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          completed bottom-up passes = {pass}
          <input
            className="mt-2 w-full accent-current"
            type="range"
            min="0"
            max={bottomUp.length - 1}
            value={pass}
            onChange={(event) => setPass(Number(event.target.value))}
          />
        </label>
        <div className="mt-4 overflow-x-auto">
          <div className="grid min-w-[650px] grid-cols-13 gap-1">
            {frame.values.map((value, index) => (
              <div
                key={index}
                className={
                  "border p-2 text-center font-mono text-xs " +
                  (Math.floor(index / width) % 2 === 0
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-success bg-success/10 text-success")
                }
              >
                {value}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
          <div className="border border-border bg-background p-3 text-secondary">
            input run length<div className="font-mono text-primary">{frame.len || 1}</div>
          </div>
          <div className="border border-warning bg-warning/10 p-3 text-secondary">
            output runs<div className="font-mono text-warning">{frame.runs}</div>
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        自底向上依次完成1-by-1、2-by-2、4-by-4 merges；尾部不足完整pair时用hi截断。
      </figcaption>
    </figure>
  );
}

export function Algs4MergeCostLab() {
  const [n, setN] = useState(32);
  const lg = Math.log2(n);
  const lower = 0.5 * n * lg;
  const upper = n * lg;
  const accesses = 6 * n * lg;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          N = {n}
          <input
            className="mt-2 w-full accent-current"
            type="range"
            min="2"
            max="128"
            step="2"
            value={n}
            onChange={(event) => setN(Number(event.target.value))}
          />
        </label>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          <div className="border border-success bg-success/10 p-3 text-xs text-secondary">
            compare lower model<div className="font-mono text-success">{Math.ceil(lower)}</div>
          </div>
          <div className="border border-accent bg-accent/10 p-3 text-xs text-secondary">
            compare upper model<div className="font-mono text-accent">{Math.ceil(upper)}</div>
          </div>
          <div className="border border-warning bg-warning/10 p-3 text-xs text-secondary">
            access upper model<div className="font-mono text-warning">{Math.ceil(accesses)}</div>
          </div>
        </div>
        <div className="mt-3 border border-border bg-background p-3 text-xs text-secondary">
          recursion levels about <span className="font-mono text-primary">{lg.toFixed(2)}</span>; auxiliary references = <span className="font-mono text-primary">{n}</span>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        每层线性工作乘以约lg N层，得到稳定的N lg N时间保证与N额外空间。
      </figcaption>
    </figure>
  );
}

function factorial(n: number) {
  let value = 1;
  for (let i = 2; i <= n; i += 1) value *= i;
  return value;
}

export function Algs4ComparisonLowerBoundLab() {
  const [n, setN] = useState(8);
  const leaves = useMemo(() => factorial(n), [n]);
  const height = Math.ceil(Math.log2(leaves));
  const mergeUpper = Math.ceil(n * Math.log2(n));

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          distinct keys N = {n}
          <input
            className="mt-2 w-full accent-current"
            type="range"
            min="2"
            max="12"
            value={n}
            onChange={(event) => setN(Number(event.target.value))}
          />
        </label>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          <div className="border border-border bg-background p-3 text-xs text-secondary">
            possible orders<div className="font-mono text-primary">{leaves.toLocaleString()}</div>
          </div>
          <div className="border border-warning bg-warning/10 p-3 text-xs text-secondary">
            decision-tree height at least<div className="font-mono text-warning">{height}</div>
          </div>
          <div className="border border-success bg-success/10 p-3 text-xs text-secondary">
            mergesort N lg N model<div className="font-mono text-success">{mergeUpper}</div>
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Binary comparisons produce a decision tree with at least N! leaves；其高度给出comparison sorting下界。
      </figcaption>
    </figure>
  );
}
