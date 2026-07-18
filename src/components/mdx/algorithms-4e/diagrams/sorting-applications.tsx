"use client";

import { useMemo, useState } from "react";

type OrderingMode = "natural" | "comparator" | "references" | "primitive";

const orderingModes = {
  natural: {
    key: "Transaction.compareTo()",
    benefit: "one canonical order",
    boundary: "must satisfy total-order contract",
  },
  comparator: {
    key: "BY_DATE / BY_AMOUNT / BY_WHO",
    benefit: "multiple contextual orders",
    boundary: "comparator equality may differ from object equality",
  },
  references: {
    key: "move object references",
    benefit: "large records stay in place",
    boundary: "keys must not mutate after sorting",
  },
  primitive: {
    key: "direct numeric comparison",
    benefit: "avoids boxing and callbacks",
    boundary: "define NaN and signed-zero order",
  },
} as const;

export function Algs4DataOrderingMap() {
  const [mode, setMode] = useState<OrderingMode>("comparator");
  const active = orderingModes[mode];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-4 gap-1">
          {(Object.keys(orderingModes) as OrderingMode[]).map((candidate) => (
            <button
              key={candidate}
              type="button"
              onClick={() => setMode(candidate)}
              className={
                "min-h-11 border px-1 text-[10px] font-semibold " +
                (mode === candidate
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
        数据表示、key ownership与ordering source共同决定sort contract，不只是algorithm name。
      </figcaption>
    </figure>
  );
}

type SortConstraints = {
  stable: boolean;
  lowMemory: boolean;
  worstCase: boolean;
  duplicates: boolean;
  nearlySorted: boolean;
};

function recommendSort(constraints: SortConstraints) {
  if (constraints.nearlySorted) return { name: "insertion sort", reason: "cost follows inversion count" };
  if (constraints.stable) return { name: "mergesort", reason: "stable with guaranteed N log N time" };
  if (constraints.lowMemory && constraints.worstCase) return { name: "heapsort", reason: "constant array space and N log N worst case" };
  if (constraints.duplicates) return { name: "3-way quicksort", reason: "equal bands are removed in one pass" };
  if (constraints.worstCase) return { name: "mergesort", reason: "predictable N log N upper bound" };
  return { name: "quicksort", reason: "short inner loop and strong general-purpose constants" };
}

export function Algs4SortSelectionLab() {
  const [constraints, setConstraints] = useState<SortConstraints>({
    stable: true,
    lowMemory: false,
    worstCase: true,
    duplicates: false,
    nearlySorted: false,
  });
  const recommendation = recommendSort(constraints);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-2 sm:grid-cols-5">
          {(Object.keys(constraints) as (keyof SortConstraints)[]).map((key) => (
            <label key={key} className="flex min-h-11 items-center gap-2 border border-border bg-background px-3 text-xs text-primary">
              <input
                type="checkbox"
                checked={constraints[key]}
                onChange={(event) => setConstraints((current) => ({ ...current, [key]: event.target.checked }))}
                className="size-4 accent-current"
              />
              {key}
            </label>
          ))}
        </div>
        <div className="mt-4 border border-success bg-success/10 p-4">
          <div className="text-xs text-secondary">recommended starting point</div>
          <div className="mt-1 font-mono text-lg text-success">{recommendation.name}</div>
          <div className="mt-2 text-xs text-primary">{recommendation.reason}</div>
        </div>
        {constraints.stable && constraints.lowMemory ? (
          <div className="mt-2 border border-warning bg-warning/10 p-3 text-xs text-warning">
            Stable plus constant-array-space is not provided by the standard choices; revisit the constraint or use a specialized algorithm.
          </div>
        ) : null}
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Stability、space、worst-case、duplicates与presortedness是算法选择输入；推荐结果还需实测。
      </figcaption>
    </figure>
  );
}

type Transaction = {
  id: string;
  city: "BJ" | "SH" | "SZ";
  time: number;
};

const transactions: Transaction[] = [
  { id: "T1", city: "SH", time: 9 },
  { id: "T2", city: "BJ", time: 10 },
  { id: "T3", city: "SH", time: 11 },
  { id: "T4", city: "SZ", time: 12 },
  { id: "T5", city: "BJ", time: 13 },
  { id: "T6", city: "SH", time: 14 },
];

function citySorted(stable: boolean) {
  const sorted = [...transactions].sort((a, b) => a.city.localeCompare(b.city) || (stable ? a.time - b.time : b.time - a.time));
  return sorted;
}

export function Algs4StableMultiKeyLab() {
  const [stable, setStable] = useState(true);
  const values = citySorted(stable);

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
            stable city sort
          </button>
          <button
            type="button"
            onClick={() => setStable(false)}
            className={
              "min-h-11 border text-xs font-semibold " +
              (!stable ? "border-danger bg-danger text-background" : "border-border bg-background text-primary")
            }
          >
            unstable counterexample
          </button>
        </div>
        <div className="mt-4 grid grid-cols-6 gap-1">
          {values.map((item) => (
            <div
              key={item.id}
              className={
                "border p-2 text-center text-xs " +
                (stable ? "border-success bg-success/10" : "border-danger bg-danger/10")
              }
            >
              <div className="font-mono text-primary">{item.city}</div>
              <div className="mt-1 text-[10px] text-secondary">{item.id} @ {item.time}</div>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        先按time已有序，再stable sort by city，便得到city主键、time次键；不稳定排序会抹掉第一层顺序。
      </figcaption>
    </figure>
  );
}

const records = [
  { id: "R0", key: 42, payload: "large-image-A" },
  { id: "R1", key: 7, payload: "large-image-B" },
  { id: "R2", key: 19, payload: "large-image-C" },
  { id: "R3", key: 7, payload: "large-image-D" },
  { id: "R4", key: 31, payload: "large-image-E" },
];

export function Algs4IndirectSortLab() {
  const [indirect, setIndirect] = useState(true);
  const permutation = records.map((_, index) => index).sort((a, b) => records[a].key - records[b].key || a - b);
  const visible = indirect ? permutation.map((index) => records[index]) : [...records].sort((a, b) => a.key - b.key);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setIndirect(true)}
            className={
              "min-h-11 border text-xs font-semibold " +
              (indirect ? "border-accent bg-accent text-background" : "border-border bg-background text-primary")
            }
          >
            index permutation
          </button>
          <button
            type="button"
            onClick={() => setIndirect(false)}
            className={
              "min-h-11 border text-xs font-semibold " +
              (!indirect ? "border-warning bg-warning text-background" : "border-border bg-background text-primary")
            }
          >
            direct record order
          </button>
        </div>
        <div className="mt-4 grid grid-cols-5 gap-1">
          {visible.map((record) => (
            <div key={record.id} className="border border-border bg-background p-2 text-center text-xs">
              <div className="font-mono text-primary">{record.id}: {record.key}</div>
              <div className="mt-1 truncate text-[10px] text-secondary" title={record.payload}>{record.payload}</div>
            </div>
          ))}
        </div>
        <div className="mt-3 border border-success bg-success/10 p-3 text-xs text-secondary">
          permutation: <span className="font-mono text-success">[{permutation.join(", ")}]</span>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        间接排序返回stable index permutation，原records不移动；适合large objects与多种order views。
      </figcaption>
    </figure>
  );
}

type Reduction = "dedup" | "frequency" | "Kendall tau" | "selection" | "TopM" | "multiway merge";

const reductions = {
  dedup: ["sort keys", "scan adjacent equals", "emit one per run"],
  frequency: ["sort keys", "count equal runs", "sort or heap counts"],
  "Kendall tau": ["invert second ranking", "map first ranking", "count inversions"],
  selection: ["partition", "keep side containing k", "stop when pivot rank is k"],
  TopM: ["stream insert", "delete minimum above M", "emit retained items"],
  "multiway merge": ["seed one head per stream", "delete minimum head", "insert next from same stream"],
} as const;

export function Algs4ReductionPipelineMap() {
  const [reduction, setReduction] = useState<Reduction>("Kendall tau");
  const stages = reductions[reduction];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <select
          className="min-h-11 w-full border border-border bg-background px-3 text-sm text-primary"
          value={reduction}
          onChange={(event) => setReduction(event.target.value as Reduction)}
        >
          {(Object.keys(reductions) as Reduction[]).map((candidate) => (
            <option key={candidate}>{candidate}</option>
          ))}
        </select>
        <div className="mt-4 grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2 text-center text-xs">
          {stages.map((stage, index) => (
            <div key={stage} className="contents">
              <div className={index === stages.length - 1 ? "border border-success bg-success/10 p-4 text-success" : "border border-accent bg-accent/10 p-4 text-accent"}>{stage}</div>
              {index < stages.length - 1 ? <span className="text-secondary">→</span> : null}
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        归约把目标问题转成已知sorting、partition或priority-queue primitives，再把结果解释回原问题。
      </figcaption>
    </figure>
  );
}

const rankA = [0, 3, 1, 6, 2, 5, 4];
const rankB = [1, 0, 3, 6, 4, 2, 5];

function kendallTransform(first: number[], second: number[]) {
  const inverse = Array.from({ length: second.length }, () => 0);
  second.forEach((value, index) => {
    inverse[value] = index;
  });
  return first.map((value) => inverse[value]);
}

function inversionPairs(values: number[]) {
  const pairs: [number, number][] = [];
  for (let i = 0; i < values.length; i += 1) {
    for (let j = i + 1; j < values.length; j += 1) {
      if (values[i] > values[j]) pairs.push([i, j]);
    }
  }
  return pairs;
}

export function Algs4KendallTauLab() {
  const transformed = kendallTransform(rankA, rankB);
  const pairs = inversionPairs(transformed);
  const [shown, setShown] = useState(pairs.length);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="space-y-2 font-mono text-xs">
          <div className="border border-border bg-background p-3 text-primary">A: {rankA.join(" ")}</div>
          <div className="border border-border bg-background p-3 text-primary">B: {rankB.join(" ")}</div>
          <div className="border border-accent bg-accent/10 p-3 text-accent">B⁻¹(A): {transformed.join(" ")}</div>
        </div>
        <label className="mt-4 block text-sm font-semibold text-primary">
          inversion witnesses shown = {shown}
          <input
            className="mt-2 w-full accent-current"
            type="range"
            min="0"
            max={pairs.length}
            value={shown}
            onChange={(event) => setShown(Number(event.target.value))}
          />
        </label>
        <div className="mt-3 flex min-h-10 flex-wrap gap-2">
          {pairs.slice(0, shown).map(([i, j]) => (
            <span key={`${i}-${j}`} className="border border-warning bg-warning/10 px-3 py-2 font-mono text-xs text-warning">({i},{j})</span>
          ))}
        </div>
        <div className="mt-2 border border-success bg-success/10 p-3 text-xs text-success">Kendall tau distance = {pairs.length}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        把第二个ranking反转成positions，再映射第一个ranking；两排名分歧恰等于映射数组的逆序数。
      </figcaption>
    </figure>
  );
}

const selectValues = [9, 1, 8, 2, 7, 3, 6, 4, 5, 0];

export function Algs4OrderStatisticLab() {
  const [k, setK] = useState(4);
  const orderedValues = useMemo(() => [...selectValues].sort((a, b) => a - b), []);
  const pivot = orderedValues[k];
  const lower = selectValues.filter((value) => value < pivot);
  const equal = selectValues.filter((value) => value === pivot);
  const higher = selectValues.filter((value) => value > pivot);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          order statistic k = {k}
          <input
            className="mt-2 w-full accent-current"
            type="range"
            min="0"
            max={selectValues.length - 1}
            value={k}
            onChange={(event) => setK(Number(event.target.value))}
          />
        </label>
        <div className="mt-4 grid grid-cols-[1fr_auto_1fr] gap-2 text-center text-xs">
          <div className="border border-accent bg-accent/10 p-3 text-accent">{lower.join(" ")}<div className="mt-1 text-secondary">less</div></div>
          <div className="border border-warning bg-warning/10 p-3 font-mono text-warning">{equal.join(" ")}</div>
          <div className="border border-success bg-success/10 p-3 text-success">{higher.join(" ")}<div className="mt-1 text-secondary">greater</div></div>
        </div>
        <div className="mt-3 border border-border bg-background p-3 text-xs text-secondary">
          kth smallest = <span className="font-mono text-primary">{pivot}</span>; only one partition side is needed at each iteration.
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Selection只维护包含rank k的subarray，randomized expected linear；其余items无需完成全排序。
      </figcaption>
    </figure>
  );
}

type Application = "commerce" | "search" | "scheduling" | "simulation" | "graphs" | "compression" | "strings";

const applications = {
  commerce: { primitive: "stable multi-key sort", result: "accounts, transactions, mail, files" },
  search: { primitive: "sort + binary search", result: "logarithmic membership queries" },
  scheduling: { primitive: "SPT/LPT + priority queue", result: "completion-time and load objectives" },
  simulation: { primitive: "event priority queue", result: "next event in chronological order" },
  graphs: { primitive: "edge sort / indexed PQ", result: "Kruskal, Prim, Dijkstra" },
  compression: { primitive: "min priority queue", result: "combine least frequencies for Huffman" },
  strings: { primitive: "sort suffixes / domains", result: "prefix and repeated-substring structure" },
} as const;

export function Algs4SortingApplicationsMap() {
  const [application, setApplication] = useState<Application>("graphs");
  const active = applications[application];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <select
          className="min-h-11 w-full border border-border bg-background px-3 text-sm text-primary"
          value={application}
          onChange={(event) => setApplication(event.target.value as Application)}
        >
          {(Object.keys(applications) as Application[]).map((candidate) => (
            <option key={candidate}>{candidate}</option>
          ))}
        </select>
        <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-center">
          <div className="border border-accent bg-accent/10 p-4 text-xs text-accent">{active.primitive}</div>
          <span className="text-secondary">→</span>
          <div className="border border-success bg-success/10 p-4 text-xs text-success">{active.result}</div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Sorting与priority queues作为基础primitive进入商业处理、搜索、调度、仿真、图、压缩和字符串算法。
      </figcaption>
    </figure>
  );
}
