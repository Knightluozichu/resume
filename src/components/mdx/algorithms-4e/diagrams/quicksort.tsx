"use client";

import { useMemo, useState } from "react";

function seededShuffle(values: number[], seed: number) {
  const result = [...values];
  let state = seed >>> 0;
  const random = () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

const ordered = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export function Algs4RandomShuffleMap() {
  const [seed, setSeed] = useState(3);
  const values = useMemo(() => seededShuffle(ordered, seed), [seed]);
  const pivotRank = [...values].sort((a, b) => a - b).indexOf(values[0]) + 1;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          deterministic shuffle seed = {seed}
          <input
            className="mt-2 w-full accent-current"
            type="range"
            min="1"
            max="12"
            value={seed}
            onChange={(event) => setSeed(Number(event.target.value))}
          />
        </label>
        <div className="mt-4 grid grid-cols-12 gap-1">
          {values.map((value, index) => (
            <div
              key={value}
              className={
                "border p-2 text-center font-mono text-xs " +
                (index === 0
                  ? "border-warning bg-warning/10 text-warning"
                  : "border-border bg-background text-primary")
              }
            >
              {value}
            </div>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
          <div className="border border-warning bg-warning/10 p-3 text-secondary">
            first pivot<div className="font-mono text-warning">{values[0]}</div>
          </div>
          <div className="border border-success bg-success/10 p-3 text-secondary">
            pivot rank<div className="font-mono text-success">{pivotRank} of {values.length}</div>
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        随机打乱让每个subarray的首项对其items仍是均匀随机pivot，避免输入顺序控制递归形状。
      </figcaption>
    </figure>
  );
}

type PartitionFrame = {
  values: number[];
  i: number;
  j: number;
  note: string;
  done?: boolean;
};

const partitionInput = [5, 1, 8, 4, 5, 2, 9, 5, 3];

function partitionTrace(input: number[]) {
  const values = [...input];
  const lo = 0;
  const hi = values.length - 1;
  const pivot = values[lo];
  let i = lo;
  let j = hi + 1;
  const frames: PartitionFrame[] = [{ values: [...values], i, j, note: "pivot fixed at lo" }];

  while (true) {
    do {
      i += 1;
    } while (i < hi && values[i] < pivot);
    do {
      j -= 1;
    } while (j > lo && pivot < values[j]);
    frames.push({ values: [...values], i, j, note: "scans stopped" });
    if (i >= j) break;
    [values[i], values[j]] = [values[j], values[i]];
    frames.push({ values: [...values], i, j, note: "exchange out-of-place pair" });
  }
  [values[lo], values[j]] = [values[j], values[lo]];
  frames.push({ values: [...values], i, j, note: `pivot placed at ${j}`, done: true });
  return frames;
}

const partition = partitionTrace(partitionInput);

export function Algs4TwoWayPartitionLab() {
  const [step, setStep] = useState(2);
  const frame = partition[step];
  const pivot = partitionInput[0];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          partition frame = {step}
          <input
            className="mt-2 w-full accent-current"
            type="range"
            min="0"
            max={partition.length - 1}
            value={step}
            onChange={(event) => setStep(Number(event.target.value))}
          />
        </label>
        <div className="mt-4 grid grid-cols-9 gap-1">
          {frame.values.map((value, index) => (
            <div
              key={index}
              className={
                "border p-2 text-center font-mono text-xs " +
                (frame.done && index === frame.j
                  ? "border-success bg-success/10 text-success"
                  : index === frame.i
                    ? "border-warning bg-warning/10 text-warning"
                    : index === frame.j
                      ? "border-danger bg-danger/10 text-danger"
                      : "border-border bg-background text-primary")
              }
            >
              <div className="text-[9px] text-secondary">{index}</div>
              {value}
            </div>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
          <div className="border border-border bg-background p-3 text-secondary">
            pivot<div className="font-mono text-primary">{pivot}</div>
          </div>
          <div className="border border-accent bg-accent/10 p-3 text-secondary">
            pointers<div className="font-mono text-accent">i={frame.i}, j={frame.j}</div>
          </div>
          <div className="border border-success bg-success/10 p-3 text-secondary">
            action<div className="font-mono text-success">{frame.note}</div>
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        左扫停在大于等于pivot，右扫停在小于等于pivot；交叉后pivot与a[j]交换到最终位置。
      </figcaption>
    </figure>
  );
}

type SplitMode = "balanced" | "quarter" | "degenerate";

function largestPath(n: number, mode: SplitMode) {
  const path = [n];
  let current = n;
  while (current > 1 && path.length < 14) {
    if (mode === "balanced") current = Math.floor((current - 1) / 2);
    else if (mode === "quarter") current = Math.floor(((current - 1) * 3) / 4);
    else current -= 1;
    if (current > 0) path.push(current);
  }
  return path;
}

export function Algs4QuickRecursionDiagram() {
  const [mode, setMode] = useState<SplitMode>("balanced");
  const path = largestPath(64, mode);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 gap-2">
          {(["balanced", "quarter", "degenerate"] as SplitMode[]).map((candidate) => (
            <button
              key={candidate}
              type="button"
              onClick={() => setMode(candidate)}
              className={
                "min-h-11 border px-1 text-xs font-semibold " +
                (mode === candidate
                  ? "border-accent bg-accent text-background"
                  : "border-border bg-background text-primary")
              }
            >
              {candidate}
            </button>
          ))}
        </div>
        <div className="mt-4 space-y-2">
          {path.map((size, depth) => (
            <div key={depth} className="flex items-center gap-2">
              <span className="w-12 font-mono text-[10px] text-secondary">d{depth}</span>
              <div
                className={
                  "h-6 border " +
                  (mode === "degenerate"
                    ? "border-danger bg-danger/15"
                    : depth === path.length - 1
                      ? "border-success bg-success/15"
                      : "border-accent bg-accent/15")
                }
                style={{ width: `${Math.max(4, (size / 64) * 88)}%` }}
              />
              <span className="font-mono text-[10px] text-primary">{size}</span>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Pivot rank决定递归树；平衡路径为log N，连续极端pivot会形成近N深度链。
      </figcaption>
    </figure>
  );
}

export function Algs4QuickPerformanceLab() {
  const [n, setN] = useState(40);
  const average = 2 * n * Math.log(n);
  const worst = (n * (n - 1)) / 2;
  const averageExchanges = average / 6;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          distinct keys N = {n}
          <input
            className="mt-2 w-full accent-current"
            type="range"
            min="8"
            max="256"
            step="8"
            value={n}
            onChange={(event) => setN(Number(event.target.value))}
          />
        </label>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          <div className="border border-success bg-success/10 p-3 text-xs text-secondary">
            average compares<div className="font-mono text-success">{Math.round(average)}</div>
            <div className="mt-1">about 2 N ln N</div>
          </div>
          <div className="border border-accent bg-accent/10 p-3 text-xs text-secondary">
            average exchanges<div className="font-mono text-accent">{Math.round(averageExchanges)}</div>
            <div className="mt-1">about one-sixth compares</div>
          </div>
          <div className="border border-danger bg-danger/10 p-3 text-xs text-secondary">
            worst compares<div className="font-mono text-danger">{worst}</div>
            <div className="mt-1">extreme pivot chain</div>
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Quicksort平均线性对数、inner loop很短；worst case仍是平方级，随机化保护的是概率而非绝对上界。
      </figcaption>
    </figure>
  );
}

export function Algs4EqualKeysPolicyLab() {
  const [stopOnEqual, setStopOnEqual] = useState(true);
  const n = 15;
  const left = stopOnEqual ? 7 : 0;
  const right = stopOnEqual ? 7 : 14;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setStopOnEqual(true)}
            className={
              "min-h-11 border text-xs font-semibold " +
              (stopOnEqual ? "border-success bg-success text-background" : "border-border bg-background text-primary")
            }
          >
            stop scans on equal
          </button>
          <button
            type="button"
            onClick={() => setStopOnEqual(false)}
            className={
              "min-h-11 border text-xs font-semibold " +
              (!stopOnEqual ? "border-danger bg-danger text-background" : "border-border bg-background text-primary")
            }
          >
            skip equal keys
          </button>
        </div>
        <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-2 text-center">
          <div className="border border-accent bg-accent/10 p-4 text-xs text-secondary">
            left subproblem<div className="font-mono text-accent">{left}</div>
          </div>
          <div className="border border-warning bg-warning/10 p-3 font-mono text-xs text-warning">pivot A</div>
          <div className="border border-success bg-success/10 p-4 text-xs text-secondary">
            right subproblem<div className="font-mono text-success">{right}</div>
          </div>
        </div>
        <div className="mt-3 border border-border bg-background p-3 text-xs text-secondary">
          input: <span className="font-mono text-primary">A repeated {n} times</span>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        双向扫描若越过equal keys，会在全相等输入上产生0与N-1切分并退化为平方级。
      </figcaption>
    </figure>
  );
}

type ThreeWayFrame = {
  values: string[];
  lt: number;
  i: number;
  gt: number;
  action: string;
};

const threeWayInput = ["B", "A", "B", "A", "B", "C", "A", "B", "C", "B"];

function threeWayTrace(input: string[]) {
  const values = [...input];
  const pivot = values[0];
  let lt = 0;
  let i = 1;
  let gt = values.length - 1;
  const frames: ThreeWayFrame[] = [{ values: [...values], lt, i, gt, action: "initialize four regions" }];
  while (i <= gt) {
    const cmp = values[i].localeCompare(pivot);
    if (cmp < 0) {
      [values[lt], values[i]] = [values[i], values[lt]];
      lt += 1;
      i += 1;
      frames.push({ values: [...values], lt, i, gt, action: "less: swap lt/i; advance both" });
    } else if (cmp > 0) {
      [values[i], values[gt]] = [values[gt], values[i]];
      gt -= 1;
      frames.push({ values: [...values], lt, i, gt, action: "greater: swap i/gt; recheck i" });
    } else {
      i += 1;
      frames.push({ values: [...values], lt, i, gt, action: "equal: advance i" });
    }
  }
  return frames;
}

const threeWay = threeWayTrace(threeWayInput);

export function Algs4ThreeWayPartitionLab() {
  const [step, setStep] = useState(4);
  const frame = threeWay[step];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          Dutch-flag frame = {step}
          <input
            className="mt-2 w-full accent-current"
            type="range"
            min="0"
            max={threeWay.length - 1}
            value={step}
            onChange={(event) => setStep(Number(event.target.value))}
          />
        </label>
        <div className="mt-4 grid grid-cols-10 gap-1">
          {frame.values.map((value, index) => (
            <div
              key={index}
              className={
                "border p-2 text-center font-mono text-xs " +
                (index < frame.lt
                  ? "border-accent bg-accent/10 text-accent"
                  : index < frame.i
                    ? "border-success bg-success/10 text-success"
                    : index <= frame.gt
                      ? "border-warning bg-warning/10 text-warning"
                      : "border-danger bg-danger/10 text-danger")
              }
            >
              {value}
            </div>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-4 gap-1 text-center text-[10px]">
          <div className="border border-accent p-2 text-accent">&lt; B</div>
          <div className="border border-success p-2 text-success">= B</div>
          <div className="border border-warning p-2 text-warning">unknown</div>
          <div className="border border-danger p-2 text-danger">&gt; B</div>
        </div>
        <div className="mt-2 border border-border bg-background p-3 font-mono text-xs text-primary">{frame.action}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        三向切分只递归小于和大于区；等于pivot的整段一次扫描后永久完成。
      </figcaption>
    </figure>
  );
}

type Distribution = "all equal" | "binary" | "skewed four" | "distinct";

const distributions = {
  "all equal": [64],
  binary: [32, 32],
  "skewed four": [40, 12, 8, 4],
  distinct: Array.from({ length: 64 }, () => 1),
} as const;

export function Algs4EntropyOptimalLab() {
  const [distribution, setDistribution] = useState<Distribution>("skewed four");
  const counts = distributions[distribution];
  const n = counts.reduce((sum, count) => sum + count, 0);
  const entropy = counts.reduce((sum, count) => {
    const probability = count / n;
    return sum - probability * Math.log2(probability);
  }, 0);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <select
          className="min-h-11 w-full border border-border bg-background px-3 text-sm text-primary"
          value={distribution}
          onChange={(event) => setDistribution(event.target.value as Distribution)}
        >
          {(Object.keys(distributions) as Distribution[]).map((candidate) => (
            <option key={candidate}>{candidate}</option>
          ))}
        </select>
        <div className="mt-4 flex h-20 items-end gap-1 border-b border-border bg-background px-2 pt-2">
          {counts.map((count, index) => (
            <div
              key={index}
              className="min-w-0 flex-1 border border-b-0 border-accent bg-accent/20"
              style={{ height: `${Math.max(8, (count / Math.max(...counts)) * 100)}%` }}
              title={`frequency ${count}`}
            />
          ))}
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
          <div className="border border-border bg-background p-3 text-secondary">
            distinct keys<div className="font-mono text-primary">{counts.length}</div>
          </div>
          <div className="border border-success bg-success/10 p-3 text-secondary">
            entropy H bits<div className="font-mono text-success">{entropy.toFixed(3)}</div>
          </div>
          <div className="border border-warning bg-warning/10 p-3 text-secondary">
            N times H<div className="font-mono text-warning">{Math.round(n * entropy)}</div>
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        重复越集中，frequency entropy越低；三向快速排序把equal band一次消除，比较量随信息量下降。
      </figcaption>
    </figure>
  );
}
