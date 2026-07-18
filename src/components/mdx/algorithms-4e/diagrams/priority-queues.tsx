"use client";

import { useState } from "react";

type PqOperation = "insert" | "max" | "delMax" | "isEmpty";

const operations = {
  insert: { input: "Key x", result: "void", mutation: "add x; restore order" },
  max: { input: "none", result: "largest key", mutation: "none" },
  delMax: { input: "none", result: "largest key", mutation: "remove one maximum" },
  isEmpty: { input: "none", result: "boolean", mutation: "none" },
} as const;

export function Algs4PriorityQueueApiMap() {
  const [operation, setOperation] = useState<PqOperation>("delMax");
  const active = operations[operation];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-4 gap-1">
          {(Object.keys(operations) as PqOperation[]).map((candidate) => (
            <button
              key={candidate}
              type="button"
              onClick={() => setOperation(candidate)}
              className={
                "min-h-11 border px-1 text-[11px] font-semibold " +
                (operation === candidate
                  ? "border-accent bg-accent text-background"
                  : "border-border bg-background text-primary")
              }
            >
              {candidate}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          {Object.entries(active).map(([key, value], index) => (
            <div
              key={key}
              className={
                "border p-3 text-xs text-secondary " +
                (index === 1
                  ? "border-success bg-success/10"
                  : index === 2
                    ? "border-warning bg-warning/10"
                    : "border-border bg-background")
              }
            >
              {key}<div className="mt-1 font-mono text-primary">{value}</div>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        优先队列只承诺当前extreme key的访问与删除，不承诺遍历时全体有序。
      </figcaption>
    </figure>
  );
}

type ElementaryVariant = "unordered array" | "ordered array" | "binary heap";

function operationCost(variant: ElementaryVariant, n: number, insertShare: number) {
  const inserts = insertShare;
  const deletes = 100 - insertShare;
  if (variant === "unordered array") return inserts + deletes * n;
  if (variant === "ordered array") return inserts * n + deletes;
  return (inserts + deletes) * Math.log2(Math.max(2, n));
}

export function Algs4PriorityQueueTradeoffLab() {
  const [insertShare, setInsertShare] = useState(75);
  const n = 64;
  const variants: ElementaryVariant[] = ["unordered array", "ordered array", "binary heap"];
  const costs = variants.map((variant) => operationCost(variant, n, insertShare));
  const best = Math.min(...costs);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          insert share = {insertShare}%
          <input
            className="mt-2 w-full accent-current"
            type="range"
            min="0"
            max="100"
            value={insertShare}
            onChange={(event) => setInsertShare(Number(event.target.value))}
          />
        </label>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          {variants.map((variant, index) => (
            <div
              key={variant}
              className={
                "border p-3 text-xs text-secondary " +
                (costs[index] === best
                  ? "border-success bg-success/10"
                  : "border-border bg-background")
              }
            >
              {variant}
              <div className="mt-1 font-mono text-primary">{Math.round(costs[index])} model units</div>
              <div className="mt-2 h-2 bg-border">
                <div
                  className={costs[index] === best ? "h-full bg-success" : "h-full bg-accent"}
                  style={{ width: `${Math.max(3, (costs[index] / Math.max(...costs)) * 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        无序数组把成本放在delMax，有序数组放在insert；heap让两者都保持logarithmic。
      </figcaption>
    </figure>
  );
}

export function Algs4BinaryHeapIndexMap() {
  const [size, setSize] = useState(11);
  const [selected, setSelected] = useState(3);
  const safeSelected = Math.min(selected, size);
  const parent = safeSelected > 1 ? Math.floor(safeSelected / 2) : null;
  const left = safeSelected * 2 <= size ? safeSelected * 2 : null;
  const right = safeSelected * 2 + 1 <= size ? safeSelected * 2 + 1 : null;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          heap size = {size}
          <input
            className="mt-2 w-full accent-current"
            type="range"
            min="1"
            max="15"
            value={size}
            onChange={(event) => setSize(Number(event.target.value))}
          />
        </label>
        <label className="mt-4 block text-sm font-semibold text-primary">
          selected index k = {safeSelected}
          <input
            className="mt-2 w-full accent-current"
            type="range"
            min="1"
            max={size}
            value={safeSelected}
            onChange={(event) => setSelected(Number(event.target.value))}
          />
        </label>
        <div className="mt-4 grid grid-cols-8 gap-1">
          <div className="border border-dashed border-border p-2 text-center font-mono text-[10px] text-secondary">0 unused</div>
          {Array.from({ length: size }, (_, offset) => offset + 1).map((index) => (
            <div
              key={index}
              className={
                "border p-2 text-center font-mono text-xs " +
                (index === safeSelected
                  ? "border-warning bg-warning/10 text-warning"
                  : index === parent
                    ? "border-success bg-success/10 text-success"
                    : index === left || index === right
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-border bg-background text-primary")
              }
            >
              {index}
            </div>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
          <div className="border border-success bg-success/10 p-3 text-secondary">parent<div className="font-mono text-success">{parent ?? "none"}</div></div>
          <div className="border border-accent bg-accent/10 p-3 text-secondary">left child<div className="font-mono text-accent">{left ?? "none"}</div></div>
          <div className="border border-accent bg-accent/10 p-3 text-secondary">right child<div className="font-mono text-accent">{right ?? "none"}</div></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        1-based level-order表示让parent为floor(k/2)，children为2k与2k+1；complete shape由size隐含。
      </figcaption>
    </figure>
  );
}

type HeapFrame = {
  values: number[];
  active: number;
  note: string;
};

function swimTrace(heap: number[], inserted: number) {
  const values = [0, ...heap, inserted];
  let k = values.length - 1;
  const frames: HeapFrame[] = [{ values: [...values], active: k, note: `append ${inserted}` }];
  while (k > 1 && values[Math.floor(k / 2)] < values[k]) {
    const parent = Math.floor(k / 2);
    [values[parent], values[k]] = [values[k], values[parent]];
    k = parent;
    frames.push({ values: [...values], active: k, note: "exchange with smaller parent" });
  }
  frames.push({ values: [...values], active: k, note: "heap order restored" });
  return frames;
}

const swim = swimTrace([15, 12, 11, 7, 9, 8, 10], 14);

export function Algs4HeapSwimLab() {
  const [step, setStep] = useState(1);
  const frame = swim[step];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          swim frame = {step}
          <input
            className="mt-2 w-full accent-current"
            type="range"
            min="0"
            max={swim.length - 1}
            value={step}
            onChange={(event) => setStep(Number(event.target.value))}
          />
        </label>
        <div className="mt-4 grid grid-cols-8 gap-1">
          {frame.values.slice(1).map((value, offset) => {
            const index = offset + 1;
            return (
              <div
                key={index}
                className={
                  "border p-3 text-center font-mono text-xs " +
                  (index === frame.active
                    ? "border-warning bg-warning/10 text-warning"
                    : "border-border bg-background text-primary")
                }
              >
                <div className="text-[9px] text-secondary">{index}</div>{value}
              </div>
            );
          })}
        </div>
        <div className="mt-3 border border-success bg-success/10 p-3 font-mono text-xs text-success">{frame.note}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Insert只可能破坏新leaf到root这条path；swim沿parent links逐层修复。
      </figcaption>
    </figure>
  );
}

function sinkTrace(heap: number[]) {
  const values = [0, ...heap];
  const max = values[1];
  const n = heap.length - 1;
  [values[1], values[heap.length]] = [values[heap.length], values[1]];
  values.pop();
  let k = 1;
  const frames: HeapFrame[] = [{ values: [...values], active: k, note: `remove max ${max}; move tail to root` }];
  while (2 * k <= n) {
    let child = 2 * k;
    if (child < n && values[child] < values[child + 1]) child += 1;
    if (values[k] >= values[child]) break;
    [values[k], values[child]] = [values[child], values[k]];
    k = child;
    frames.push({ values: [...values], active: k, note: "exchange with larger child" });
  }
  frames.push({ values: [...values], active: k, note: "heap order restored" });
  return frames;
}

const sink = sinkTrace([15, 12, 11, 7, 9, 8, 10, 3, 5, 6, 4]);

export function Algs4HeapSinkLab() {
  const [step, setStep] = useState(1);
  const frame = sink[step];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          delMax / sink frame = {step}
          <input
            className="mt-2 w-full accent-current"
            type="range"
            min="0"
            max={sink.length - 1}
            value={step}
            onChange={(event) => setStep(Number(event.target.value))}
          />
        </label>
        <div className="mt-4 grid grid-cols-10 gap-1">
          {frame.values.slice(1).map((value, offset) => {
            const index = offset + 1;
            return (
              <div
                key={index}
                className={
                  "border p-2 text-center font-mono text-xs " +
                  (index === frame.active
                    ? "border-warning bg-warning/10 text-warning"
                    : "border-border bg-background text-primary")
                }
              >
                <div className="text-[9px] text-secondary">{index}</div>{value}
              </div>
            );
          })}
        </div>
        <div className="mt-3 border border-success bg-success/10 p-3 font-mono text-xs text-success">{frame.note}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        DelMax把tail放到root；sink每层选择较大child，才能同时恢复两条child边的heap order。
      </figcaption>
    </figure>
  );
}

type PracticalTopic = "resize" | "immutable keys" | "indexed PQ" | "d-ary";

const practicalTopics = {
  resize: {
    purpose: "arbitrary queue size",
    state: "capacity, n, unused slots",
    rule: "double when full; halve near one-quarter",
  },
  "immutable keys": {
    purpose: "preserve heap invariant",
    state: "client-owned key objects",
    rule: "do not mutate priority while item is inside PQ",
  },
  "indexed PQ": {
    purpose: "change/delete existing item",
    state: "pq position map plus inverse qp",
    rule: "every exchange updates both permutations",
  },
  "d-ary": {
    purpose: "trade height for child scan",
    state: "d children per node",
    rule: "shallower swim; wider sink comparison",
  },
} as const;

export function Algs4PriorityQueuePracticalMap() {
  const [topic, setTopic] = useState<PracticalTopic>("indexed PQ");
  const active = practicalTopics[topic];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <select
          className="min-h-11 w-full border border-border bg-background px-3 text-sm text-primary"
          value={topic}
          onChange={(event) => setTopic(event.target.value as PracticalTopic)}
        >
          {(Object.keys(practicalTopics) as PracticalTopic[]).map((candidate) => (
            <option key={candidate}>{candidate}</option>
          ))}
        </select>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          {Object.entries(active).map(([key, value], index) => (
            <div
              key={key}
              className={
                "border p-3 text-xs text-secondary " +
                (index === 2 ? "border-warning bg-warning/10" : "border-border bg-background")
              }
            >
              {key}<div className="mt-1 font-mono text-primary">{value}</div>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        实用扩展改变的是capacity、ownership或addressability contract，swim/sink核心仍可复用。
      </figcaption>
    </figure>
  );
}

const heapSortInput = [4, 10, 3, 5, 1, 8, 7, 6, 2, 9];

type HeapSortFrame = {
  values: number[];
  heapSize: number;
  phase: "input" | "heapify" | "sortdown";
  note: string;
};

function sinkRange(values: number[], start: number, size: number) {
  let root = start;
  while (2 * root + 1 < size) {
    let child = 2 * root + 1;
    if (child + 1 < size && values[child] < values[child + 1]) child += 1;
    if (values[root] >= values[child]) break;
    [values[root], values[child]] = [values[child], values[root]];
    root = child;
  }
}

function heapSortFrames(input: number[]) {
  const values = [...input];
  const frames: HeapSortFrame[] = [{ values: [...values], heapSize: values.length, phase: "input", note: "original array" }];
  for (let root = Math.floor(values.length / 2) - 1; root >= 0; root -= 1) {
    sinkRange(values, root, values.length);
  }
  frames.push({ values: [...values], heapSize: values.length, phase: "heapify", note: "bottom-up max heap complete" });
  for (let end = values.length - 1; end > 0; end -= 1) {
    [values[0], values[end]] = [values[end], values[0]];
    sinkRange(values, 0, end);
    frames.push({ values: [...values], heapSize: end, phase: "sortdown", note: `fixed maximum at index ${end}` });
  }
  return frames;
}

const heapSort = heapSortFrames(heapSortInput);

export function Algs4HeapsortLab() {
  const [step, setStep] = useState(2);
  const frame = heapSort[step];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          heapsort frame = {step}
          <input
            className="mt-2 w-full accent-current"
            type="range"
            min="0"
            max={heapSort.length - 1}
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
                (index < frame.heapSize
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-success bg-success/10 text-success")
              }
            >
              {value}
            </div>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
          <div className="border border-border bg-background p-3 text-secondary">phase<div className="font-mono text-primary">{frame.phase}</div></div>
          <div className="border border-warning bg-warning/10 p-3 text-secondary">invariant<div className="font-mono text-warning">{frame.note}</div></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Heapify在线性时间建立max heap；sortdown逐次把root最大值固定到右侧有序suffix。
      </figcaption>
    </figure>
  );
}

export function Algs4HeapCostLab() {
  const [n, setN] = useState(64);
  const height = Math.floor(Math.log2(n));
  const insertBuild = n * Math.log2(n);
  const bottomUp = 2 * n;
  const sortdown = 2 * n * Math.log2(n);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          heap items N = {n}
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
        <div className="mt-4 grid gap-2 sm:grid-cols-4">
          <div className="border border-border bg-background p-3 text-xs text-secondary">height<div className="font-mono text-primary">{height}</div></div>
          <div className="border border-danger bg-danger/10 p-3 text-xs text-secondary">insert-build model<div className="font-mono text-danger">{Math.round(insertBuild)}</div></div>
          <div className="border border-success bg-success/10 p-3 text-xs text-secondary">bottom-up bound<div className="font-mono text-success">{Math.round(bottomUp)}</div></div>
          <div className="border border-warning bg-warning/10 p-3 text-xs text-secondary">sortdown bound<div className="font-mono text-warning">{Math.round(sortdown)}</div></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Bottom-up heap construction对多数低节点只sink很短距离，因此总成本linear；sortdown仍是N log N。
      </figcaption>
    </figure>
  );
}
