"use client";

import { useMemo, useState } from "react";

type SortItem = {
  key: number;
  label: string;
};

const baseItems: SortItem[] = [
  { key: 8, label: "S" },
  { key: 4, label: "O" },
  { key: 7, label: "R" },
  { key: 6, label: "T" },
  { key: 2, label: "E" },
  { key: 9, label: "X" },
  { key: 1, label: "A" },
  { key: 5, label: "M" },
  { key: 3, label: "P" },
  { key: 2, label: "L" },
  { key: 2, label: "E" },
];

function clone(items: SortItem[]) {
  return items.map((item) => ({ ...item }));
}

function selectionFrames(items: SortItem[]) {
  const values = clone(items);
  const frames = [{ values: clone(values), fixed: 0, selected: -1 }];
  for (let i = 0; i < values.length; i += 1) {
    let min = i;
    for (let j = i + 1; j < values.length; j += 1) {
      if (values[j].key < values[min].key) min = j;
    }
    [values[i], values[min]] = [values[min], values[i]];
    frames.push({ values: clone(values), fixed: i + 1, selected: min });
  }
  return frames;
}

function insertionFrames(items: SortItem[]) {
  const values = clone(items);
  const frames = [{ values: clone(values), fixed: 1, selected: 0 }];
  for (let i = 1; i < values.length; i += 1) {
    let j = i;
    while (j > 0 && values[j].key < values[j - 1].key) {
      [values[j], values[j - 1]] = [values[j - 1], values[j]];
      j -= 1;
    }
    frames.push({ values: clone(values), fixed: i + 1, selected: j });
  }
  return frames;
}

function inversionCount(items: SortItem[]) {
  let count = 0;
  for (let i = 0; i < items.length; i += 1) {
    for (let j = i + 1; j < items.length; j += 1) {
      if (items[i].key > items[j].key) count += 1;
    }
  }
  return count;
}

function ItemStrip({
  values,
  fixed,
  selected,
  prefixLabel,
}: {
  values: SortItem[];
  fixed: number;
  selected: number;
  prefixLabel: string;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-[11px] text-secondary">
        <span>{prefixLabel}</span>
        <span className="font-mono">{fixed}/{values.length}</span>
      </div>
      <div className="overflow-x-auto">
        <div className="grid min-w-[550px] grid-cols-11 gap-1">
          {values.map((item, index) => (
            <div
              key={`${item.label}-${index}`}
              className={
                "border px-1 py-3 text-center font-mono text-xs " +
                (index < fixed
                  ? "border-success bg-success/10 text-success"
                  : index === selected
                    ? "border-warning bg-warning/10 text-warning"
                    : "border-border bg-background text-primary")
              }
            >
              <div>{item.label}</div>
              <div className="mt-1 text-[10px] text-secondary">{item.key}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

type ContractView = "order" | "cost" | "space";

const contractViews = {
  order: {
    title: "total order",
    check: "reflexive, antisymmetric, transitive",
    boundary: "compareTo must reject null or incompatible values",
  },
  cost: {
    title: "cost model",
    check: "count compares and exchanges",
    boundary: "for non-exchange sorts, count array accesses",
  },
  space: {
    title: "extra memory",
    check: "in-place means only constant local storage",
    boundary: "a second array changes the space contract",
  },
} as const;

export function Algs4SortContractMap() {
  const [view, setView] = useState<ContractView>("cost");
  const active = contractViews[view];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 gap-2">
          {(Object.keys(contractViews) as ContractView[]).map((candidate) => (
            <button
              key={candidate}
              type="button"
              aria-pressed={view === candidate}
              onClick={() => setView(candidate)}
              className={
                "min-h-11 border px-2 text-xs font-semibold " +
                (view === candidate
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
            contract
            <div className="mt-1 font-mono text-primary">{active.title}</div>
          </div>
          <div className="border border-success bg-success/10 p-3 text-xs text-secondary">
            verify
            <div className="mt-1 font-mono text-success">{active.check}</div>
          </div>
          <div className="border border-warning bg-warning/10 p-3 text-xs text-secondary">
            boundary
            <div className="mt-1 font-mono text-warning">{active.boundary}</div>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-center gap-3 border border-border bg-background p-3 font-mono text-xs text-primary">
          <span>Comparable[]</span>
          <span className="text-accent">less / exch</span>
          <span>sorted permutation</span>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        排序API只通过比较与交换观察数据；顺序、成本与额外空间是三类独立契约。
      </figcaption>
    </figure>
  );
}

const selection = selectionFrames(baseItems);

export function Algs4SelectionScanLab() {
  const [pass, setPass] = useState(4);
  const frame = selection[pass];
  const n = baseItems.length;
  const compares = pass * n - (pass * (pass + 1)) / 2;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          completed selection passes = {pass}
          <input
            className="mt-2 w-full accent-current"
            type="range"
            min="0"
            max={baseItems.length}
            value={pass}
            onChange={(event) => setPass(Number(event.target.value))}
          />
        </label>
        <div className="mt-4">
          <ItemStrip
            values={frame.values}
            fixed={frame.fixed}
            selected={frame.selected}
            prefixLabel="smallest fixed prefix"
          />
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
          <div className="border border-accent bg-accent/10 p-3 text-secondary">
            comparisons so far
            <div className="font-mono text-accent">{compares}</div>
          </div>
          <div className="border border-warning bg-warning/10 p-3 text-secondary">
            exchanges in official loop
            <div className="font-mono text-warning">{pass}</div>
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        每一轮从未排序后缀选最小项，交换到边界；输入原本多有序也不会减少比较次数。
      </figcaption>
    </figure>
  );
}

const insertionInputs = {
  nearly: [
    { key: 1, label: "A" },
    { key: 2, label: "B" },
    { key: 3, label: "C" },
    { key: 5, label: "E" },
    { key: 4, label: "D" },
    { key: 6, label: "F" },
    { key: 7, label: "G" },
    { key: 8, label: "H" },
    { key: 9, label: "I" },
    { key: 10, label: "J" },
    { key: 11, label: "K" },
  ],
  reverse: [...baseItems].sort((a, b) => b.key - a.key),
  sample: baseItems,
} satisfies Record<string, SortItem[]>;

type InsertionInput = keyof typeof insertionInputs;

export function Algs4InsertionInversionLab() {
  const [input, setInput] = useState<InsertionInput>("nearly");
  const frames = useMemo(() => insertionFrames(insertionInputs[input]), [input]);
  const [pass, setPass] = useState(4);
  const safePass = Math.min(pass, frames.length - 1);
  const initialInversions = inversionCount(insertionInputs[input]);
  const remainingInversions = inversionCount(frames[safePass].values);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 gap-2">
          {(Object.keys(insertionInputs) as InsertionInput[]).map((candidate) => (
            <button
              key={candidate}
              type="button"
              onClick={() => {
                setInput(candidate);
                setPass(0);
              }}
              className={
                "min-h-10 border text-xs font-semibold " +
                (input === candidate
                  ? "border-accent bg-accent text-background"
                  : "border-border bg-background text-primary")
              }
            >
              {candidate}
            </button>
          ))}
        </div>
        <label className="mt-4 block text-sm font-semibold text-primary">
          inserted items = {safePass}
          <input
            className="mt-2 w-full accent-current"
            type="range"
            min="0"
            max={frames.length - 1}
            value={safePass}
            onChange={(event) => setPass(Number(event.target.value))}
          />
        </label>
        <div className="mt-4">
          <ItemStrip
            values={frames[safePass].values}
            fixed={frames[safePass].fixed}
            selected={frames[safePass].selected}
            prefixLabel="sorted prefix"
          />
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
          <div className="border border-border bg-background p-3 text-secondary">
            initial inversions
            <div className="font-mono text-primary">{initialInversions}</div>
          </div>
          <div className="border border-success bg-success/10 p-3 text-secondary">
            remaining inversions
            <div className="font-mono text-success">{remainingInversions}</div>
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        插入排序每次相邻交换恰好消去一个逆序；近乎有序输入因此接近线性。
      </figcaption>
    </figure>
  );
}

type BarAlgorithm = "selection" | "insertion";

export function Algs4SortingBarsLab() {
  const [algorithm, setAlgorithm] = useState<BarAlgorithm>("selection");
  const frames = algorithm === "selection" ? selection : insertionFrames(baseItems);
  const [step, setStep] = useState(3);
  const safeStep = Math.min(step, frames.length - 1);
  const frame = frames[safeStep];
  const max = Math.max(...baseItems.map((item) => item.key));

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-2">
          {(["selection", "insertion"] as BarAlgorithm[]).map((candidate) => (
            <button
              key={candidate}
              type="button"
              onClick={() => {
                setAlgorithm(candidate);
                setStep(0);
              }}
              className={
                "min-h-10 border text-xs font-semibold " +
                (algorithm === candidate
                  ? "border-accent bg-accent text-background"
                  : "border-border bg-background text-primary")
              }
            >
              {candidate}
            </button>
          ))}
        </div>
        <label className="mt-4 block text-sm font-semibold text-primary">
          algorithm snapshot = {safeStep}
          <input
            className="mt-2 w-full accent-current"
            type="range"
            min="0"
            max={frames.length - 1}
            value={safeStep}
            onChange={(event) => setStep(Number(event.target.value))}
          />
        </label>
        <div className="mt-4 flex h-44 items-end gap-1 border-b border-border bg-background px-2 pt-3">
          {frame.values.map((item, index) => (
            <div
              key={`${item.label}-${index}`}
              className={
                "flex min-w-0 flex-1 items-end justify-center border border-b-0 text-[9px] font-semibold " +
                (index < frame.fixed
                  ? "border-success bg-success/20 text-success"
                  : index === frame.selected
                    ? "border-warning bg-warning/20 text-warning"
                    : "border-accent bg-accent/15 text-accent")
              }
              style={{ height: `${Math.max(18, (item.key / max) * 100)}%` }}
              title={`${item.label}: ${item.key}`}
            >
              <span className="pb-1">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        柱高编码key，颜色编码已确认区域；快照帮助观察数据移动，但不替代不变量证明。
      </figcaption>
    </figure>
  );
}

const stableInput: SortItem[] = [
  { key: 2, label: "2A" },
  { key: 2, label: "2B" },
  { key: 1, label: "1C" },
];

function renderOrder(items: SortItem[]) {
  return items.map((item) => item.label).join("  ");
}

export function Algs4StabilityCounterexampleLab() {
  const selectionOutput = selectionFrames(stableInput).at(-1)?.values ?? stableInput;
  const insertionOutput = insertionFrames(stableInput).at(-1)?.values ?? stableInput;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="border border-border bg-background p-3 text-xs text-secondary">
          input
          <div className="mt-1 font-mono text-primary">{renderOrder(stableInput)}</div>
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <div className="border border-danger bg-danger/10 p-3 text-xs text-secondary">
            selection
            <div className="mt-1 font-mono text-danger">{renderOrder(selectionOutput)}</div>
            <div className="mt-2">equal-key 2A / 2B reversed</div>
          </div>
          <div className="border border-success bg-success/10 p-3 text-xs text-secondary">
            insertion with strict less
            <div className="mt-1 font-mono text-success">{renderOrder(insertionOutput)}</div>
            <div className="mt-2">equal-key order preserved</div>
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        稳定性关注相等key的原相对次序；选择排序的一次远距离交换即可破坏它。
      </figcaption>
    </figure>
  );
}

const shellInput = [19, 2, 31, 45, 6, 11, 121, 27, 18, 3, 7, 14, 9];

function shellFrames(values: number[]) {
  const array = [...values];
  let h = 1;
  while (h < array.length / 3) h = 3 * h + 1;
  const frames: { h: number | null; values: number[] }[] = [{ h: null, values: [...array] }];
  while (h >= 1) {
    for (let i = h; i < array.length; i += 1) {
      for (let j = i; j >= h && array[j] < array[j - h]; j -= h) {
        [array[j], array[j - h]] = [array[j - h], array[j]];
      }
    }
    frames.push({ h, values: [...array] });
    h = Math.floor(h / 3);
  }
  return frames;
}

const shell = shellFrames(shellInput);

export function Algs4ShellsortResidueLab() {
  const [step, setStep] = useState(1);
  const frame = shell[step];
  const h = frame.h ?? shellInput.length;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          completed gap passes = {step}
          <input
            className="mt-2 w-full accent-current"
            type="range"
            min="0"
            max={shell.length - 1}
            value={step}
            onChange={(event) => setStep(Number(event.target.value))}
          />
        </label>
        <div className="mt-4 overflow-x-auto">
          <div className="grid min-w-[650px] grid-cols-13 gap-1">
            {frame.values.map((value, index) => (
              <div
                key={index}
                className={
                  "border p-2 text-center font-mono text-xs " +
                  (frame.h === 1
                    ? "border-success bg-success/10 text-success"
                    : index % Math.max(1, h) === 0
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-border bg-background text-primary")
                }
              >
                <div className="text-[9px] text-secondary">{index}</div>
                {value}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-3 border border-warning bg-warning/10 p-3 text-xs text-warning">
          {frame.h === null
            ? "initial array: no gap invariant yet"
            : frame.h === 1
              ? "1-sorted means globally sorted"
              : `${frame.h}-sorted: every residue subsequence is ordered`}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Knuth gaps让元素先跨远距离移动；每个gap pass完成后，所有同余子序列分别有序。
      </figcaption>
    </figure>
  );
}

export function Algs4ElementaryCostModelLab() {
  const [n, setN] = useState(12);
  const maxInversions = (n * (n - 1)) / 2;
  const [density, setDensity] = useState(20);
  const inversions = Math.round((maxInversions * density) / 100);
  const selectionCompares = maxInversions;
  const insertionMinCompares = inversions;
  const insertionMaxCompares = inversions + n - 1;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          N = {n}
          <input
            className="mt-2 w-full accent-current"
            type="range"
            min="4"
            max="40"
            value={n}
            onChange={(event) => setN(Number(event.target.value))}
          />
        </label>
        <label className="mt-4 block text-sm font-semibold text-primary">
          inversion density = {density}%
          <input
            className="mt-2 w-full accent-current"
            type="range"
            min="0"
            max="100"
            value={density}
            onChange={(event) => setDensity(Number(event.target.value))}
          />
        </label>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          <div className="border border-border bg-background p-3 text-xs text-secondary">
            selection compares
            <div className="font-mono text-primary">{selectionCompares}</div>
            <div className="mt-1">independent of disorder</div>
          </div>
          <div className="border border-success bg-success/10 p-3 text-xs text-secondary">
            insertion exchanges
            <div className="font-mono text-success">{inversions}</div>
            <div className="mt-1">exactly inversion count</div>
          </div>
          <div className="border border-warning bg-warning/10 p-3 text-xs text-secondary">
            insertion compares
            <div className="font-mono text-warning">{insertionMinCompares}..{insertionMaxCompares}</div>
            <div className="mt-1">input-sensitive interval</div>
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        同一个N不能决定插入排序成本；逆序数把“接近有序”变成可计算参数。
      </figcaption>
    </figure>
  );
}
