"use client";

import { useMemo, useState } from "react";

type StOperation = "put" | "get" | "delete" | "contains" | "keys";

const stOperations = {
  put: { input: "key, value", output: "void", contract: "insert or overwrite; null value deletes" },
  get: { input: "key", output: "value or null", contract: "null means absent under this API" },
  delete: { input: "key", output: "void", contract: "remove pair if present" },
  contains: { input: "key", output: "boolean", contract: "equivalent to get(key) != null" },
  keys: { input: "none", output: "Iterable<Key>", contract: "all current keys exactly once" },
} as const;

export function Algs4SymbolTableApiMap() {
  const [operation, setOperation] = useState<StOperation>("put");
  const active = stOperations[operation];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-5 gap-1">
          {(Object.keys(stOperations) as StOperation[]).map((candidate) => (
            <button
              key={candidate}
              type="button"
              onClick={() => setOperation(candidate)}
              className={
                "min-h-11 border px-1 text-[10px] font-semibold " +
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
                (index === 2 ? "border-warning bg-warning/10" : "border-border bg-background")
              }
            >
              {key}<div className="mt-1 font-mono text-primary">{value}</div>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Symbol table把unique key映射到一个value；重复put更新association而不是新增duplicate key。
      </figcaption>
    </figure>
  );
}

const associativeOperations = [
  { key: "S", value: 0 as number | null },
  { key: "E", value: 1 as number | null },
  { key: "A", value: 2 as number | null },
  { key: "S", value: 3 as number | null },
  { key: "E", value: null },
  { key: "R", value: 5 as number | null },
];

export function Algs4AssociativeArrayLab() {
  const [step, setStep] = useState(4);
  const state = new Map<string, number>();
  associativeOperations.slice(0, step).forEach(({ key, value }) => {
    if (value === null) state.delete(key);
    else state.set(key, value);
  });

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          processed operations = {step}
          <input
            className="mt-2 w-full accent-current"
            type="range"
            min="0"
            max={associativeOperations.length}
            value={step}
            onChange={(event) => setStep(Number(event.target.value))}
          />
        </label>
        <div className="mt-4 flex flex-wrap gap-2">
          {associativeOperations.map(({ key, value }, index) => (
            <span
              key={index}
              className={
                "border px-3 py-2 font-mono text-xs " +
                (index < step
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border bg-background text-secondary")
              }
            >
              put({key},{value === null ? "null" : value})
            </span>
          ))}
        </div>
        <div className="mt-4 grid min-h-14 grid-cols-4 gap-2">
          {[...state.entries()].map(([key, value]) => (
            <div key={key} className="border border-success bg-success/10 p-3 text-center font-mono text-xs text-success">{key} → {value}</div>
          ))}
        </div>
        <div className="mt-2 border border-border bg-background p-3 text-xs text-secondary">size = {state.size}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        S的第二次put覆盖value；E的null put删除association，size只计当前distinct keys。
      </figcaption>
    </figure>
  );
}

const orderedKeys = ["A", "C", "E", "H", "L", "M", "P", "R", "S", "X"];

export function Algs4OrderedSymbolTableLab() {
  const [queryCode, setQueryCode] = useState("G".charCodeAt(0));
  const query = String.fromCharCode(queryCode);
  const rank = orderedKeys.findIndex((key) => key >= query);
  const insertion = rank === -1 ? orderedKeys.length : rank;
  const exact = orderedKeys[insertion] === query;
  const floor = exact ? query : insertion > 0 ? orderedKeys[insertion - 1] : "none";
  const ceiling = insertion < orderedKeys.length ? orderedKeys[insertion] : "none";

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          query key = {query}
          <input
            className="mt-2 w-full accent-current"
            type="range"
            min={65}
            max={90}
            value={queryCode}
            onChange={(event) => setQueryCode(Number(event.target.value))}
          />
        </label>
        <div className="mt-4 grid grid-cols-10 gap-1">
          {orderedKeys.map((key, index) => (
            <div
              key={key}
              className={
                "border p-2 text-center font-mono text-xs " +
                (index === insertion
                  ? "border-warning bg-warning/10 text-warning"
                  : "border-border bg-background text-primary")
              }
            >
              <div className="text-[9px] text-secondary">{index}</div>{key}
            </div>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-4 gap-1 text-xs">
          <div className="border border-accent bg-accent/10 p-3 text-secondary">rank<div className="font-mono text-accent">{insertion}</div></div>
          <div className="border border-success bg-success/10 p-3 text-secondary">exact<div className="font-mono text-success">{exact ? "yes" : "no"}</div></div>
          <div className="border border-border bg-background p-3 text-secondary">floor<div className="font-mono text-primary">{floor}</div></div>
          <div className="border border-border bg-background p-3 text-secondary">ceiling<div className="font-mono text-primary">{ceiling}</div></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Rank是严格小于query的keys数量；它同时定位exact match、floor/ceiling和新key插入点。
      </figcaption>
    </figure>
  );
}

const linkedKeys = ["X", "M", "P", "L", "E", "R", "A", "S"];

export function Algs4SequentialSearchLab() {
  const [queryIndex, setQueryIndex] = useState(4);
  const queries = ["X", "E", "S", "Z", "A", "P"];
  const query = queries[queryIndex];
  const found = linkedKeys.indexOf(query);
  const visited = found === -1 ? linkedKeys.length : found + 1;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          get({query})
          <input
            className="mt-2 w-full accent-current"
            type="range"
            min="0"
            max={queries.length - 1}
            value={queryIndex}
            onChange={(event) => setQueryIndex(Number(event.target.value))}
          />
        </label>
        <div className="mt-4 grid grid-cols-8 gap-1">
          {linkedKeys.map((key, index) => (
            <div
              key={key}
              className={
                "border p-3 text-center font-mono text-xs " +
                (index < visited
                  ? key === query
                    ? "border-success bg-success/10 text-success"
                    : "border-accent bg-accent/10 text-accent"
                  : "border-border bg-background text-secondary")
              }
            >
              {key}
            </div>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
          <div className="border border-warning bg-warning/10 p-3 text-secondary">equals calls<div className="font-mono text-warning">{visited}</div></div>
          <div className="border border-success bg-success/10 p-3 text-secondary">result<div className="font-mono text-success">{found === -1 ? "null" : `node ${found}`}</div></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Unordered linked-list ST从head顺序调用equals；miss与tail hit都要访问全部N nodes。
      </figcaption>
    </figure>
  );
}

type RankFrame = {
  lo: number;
  hi: number;
  mid: number | null;
  note: string;
};

function rankTrace(query: string) {
  let lo = 0;
  let hi = orderedKeys.length - 1;
  const frames: RankFrame[] = [];
  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    const cmp = query.localeCompare(orderedKeys[mid]);
    frames.push({ lo, hi, mid, note: cmp < 0 ? "discard right half" : cmp > 0 ? "discard left half" : "exact rank found" });
    if (cmp < 0) hi = mid - 1;
    else if (cmp > 0) lo = mid + 1;
    else return frames;
  }
  frames.push({ lo, hi, mid: null, note: `miss; insertion rank = ${lo}` });
  return frames;
}

export function Algs4BinarySearchRankLab() {
  const [queryCode, setQueryCode] = useState("G".charCodeAt(0));
  const [step, setStep] = useState(1);
  const query = String.fromCharCode(queryCode);
  const frames = rankTrace(query);
  const safeStep = Math.min(step, frames.length - 1);
  const frame = frames[safeStep];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          query = {query}
          <input
            className="mt-2 w-full accent-current"
            type="range"
            min={65}
            max={90}
            value={queryCode}
            onChange={(event) => {
              setQueryCode(Number(event.target.value));
              setStep(0);
            }}
          />
        </label>
        <label className="mt-4 block text-sm font-semibold text-primary">
          rank frame = {safeStep}
          <input
            className="mt-2 w-full accent-current"
            type="range"
            min="0"
            max={frames.length - 1}
            value={safeStep}
            onChange={(event) => setStep(Number(event.target.value))}
          />
        </label>
        <div className="mt-4 grid grid-cols-10 gap-1">
          {orderedKeys.map((key, index) => (
            <div
              key={key}
              className={
                "border p-2 text-center font-mono text-xs " +
                (index === frame.mid
                  ? "border-warning bg-warning/10 text-warning"
                  : index >= frame.lo && index <= frame.hi
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border bg-background text-secondary")
              }
            >
              {key}
            </div>
          ))}
        </div>
        <div className="mt-3 border border-success bg-success/10 p-3 font-mono text-xs text-success">{frame.note}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Binary-search rank维护candidate interval；miss终止时lo正是strictly-smaller count与插入位置。
      </figcaption>
    </figure>
  );
}

const insertionKeys = ["A", "C", "E", "H", "L", "M", "·"];

export function Algs4ParallelArrayInsertLab() {
  const [phase, setPhase] = useState(0);
  const values = [...insertionKeys];
  const insertionIndex = 3;
  for (let moved = 0; moved < phase; moved += 1) {
    const source = values.length - 2 - moved;
    if (source >= insertionIndex) values[source + 1] = values[source];
  }
  if (phase >= 4) values[insertionIndex] = "G";

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          insert G shift phase = {phase}
          <input
            className="mt-2 w-full accent-current"
            type="range"
            min="0"
            max="4"
            value={phase}
            onChange={(event) => setPhase(Number(event.target.value))}
          />
        </label>
        <div className="mt-4 grid grid-cols-7 gap-1">
          {values.map((key, index) => (
            <div
              key={index}
              className={
                "border p-3 text-center font-mono text-xs " +
                (index === insertionIndex
                  ? "border-warning bg-warning/10 text-warning"
                  : "border-border bg-background text-primary")
              }
            >
              {key}
            </div>
          ))}
        </div>
        <div className="mt-3 border border-border bg-background p-3 text-xs text-secondary">
          keys and values arrays must shift the same indices from back to front.
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Ordered array先用rank找到3，再从末端向后搬移；正向搬会覆盖尚未复制的pairs。
      </figcaption>
    </figure>
  );
}

export function Algs4SymbolTableCostLab() {
  const [putShare, setPutShare] = useState(30);
  const n = 128;
  const gets = 100 - putShare;
  const sequential = 100 * n;
  const ordered = putShare * n + gets * Math.log2(n);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          new-key put share = {putShare}%
          <input
            className="mt-2 w-full accent-current"
            type="range"
            min="0"
            max="100"
            value={putShare}
            onChange={(event) => setPutShare(Number(event.target.value))}
          />
        </label>
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
          <div className="border border-border bg-background p-4 text-secondary">
            sequential linked list<div className="font-mono text-primary">{Math.round(sequential)} compare units</div>
            <div className="mt-1">get and new put are linear</div>
          </div>
          <div className="border border-success bg-success/10 p-4 text-secondary">
            ordered parallel arrays<div className="font-mono text-success">{Math.round(ordered)} model units</div>
            <div className="mt-1">get logarithmic; new put shifts linear</div>
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Read-heavy workloads favor ordered arrays；write-heavy tables still pay linear shifts and motivate later trees/hashes。
      </figcaption>
    </figure>
  );
}

const frequencyWords = ["it", "was", "the", "best", "of", "times", "it", "was", "the", "age", "of", "wisdom", "the", "best"];

export function Algs4FrequencyCounterLab() {
  const [minLength, setMinLength] = useState(3);
  const counts = useMemo(() => {
    const result = new Map<string, number>();
    for (const word of frequencyWords) {
      if (word.length < minLength) continue;
      result.set(word, (result.get(word) ?? 0) + 1);
    }
    return [...result.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }, [minLength]);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          minimum word length = {minLength}
          <input
            className="mt-2 w-full accent-current"
            type="range"
            min="1"
            max="6"
            value={minLength}
            onChange={(event) => setMinLength(Number(event.target.value))}
          />
        </label>
        <div className="mt-4 grid grid-cols-4 gap-2">
          {counts.slice(0, 8).map(([word, count], index) => (
            <div
              key={word}
              className={
                "border p-3 text-center text-xs " +
                (index === 0
                  ? "border-success bg-success/10"
                  : "border-border bg-background")
              }
            >
              <div className="font-mono text-primary">{word}</div>
              <div className="mt-1 text-secondary">{count}</div>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        FrequencyCounter是API client：table负责associations，client负责token filter与maximum scan。
      </figcaption>
    </figure>
  );
}
