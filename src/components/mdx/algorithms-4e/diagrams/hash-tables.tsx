"use client";

import { useMemo, useState } from "react";

const bookKeys = ["S", "E", "A", "R", "C", "H", "X", "M", "P", "L", "B", "T", "N", "G", "D", "F"] as const;
const probeKeys = ["A", "I", "Q", "Y", "B", "J"] as const;

function javaStringHash(value: string) {
  let hash = 0;
  for (const character of value) hash = (Math.imul(31, hash) + character.charCodeAt(0)) | 0;
  return hash;
}

function mixedHash(value: string) {
  let hash = javaStringHash(value);
  hash ^= (hash >>> 20) ^ (hash >>> 12) ^ (hash >>> 7) ^ (hash >>> 4);
  return hash | 0;
}

function tableIndex(hash: number, capacity: number) {
  return (hash & 0x7fffffff) % capacity;
}

type HashMode = "mixed" | "low bits" | "constant";

function indexFor(key: string, capacity: number, mode: HashMode = "mixed") {
  if (mode === "constant") return 3 % capacity;
  if (mode === "low bits") return key.charCodeAt(0) & Math.min(3, capacity - 1);
  return tableIndex(mixedHash(key), capacity);
}

function bucketize(keys: readonly string[], capacity: number, mode: HashMode = "mixed") {
  const buckets = Array.from({ length: capacity }, () => [] as string[]);
  for (const key of keys) buckets[indexFor(key, capacity, mode)].push(key);
  return buckets;
}

function BucketGrid({
  buckets,
  highlighted = -1,
}: {
  buckets: string[][];
  highlighted?: number;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {buckets.map((bucket, index) => (
        <div
          key={index}
          className={
            "grid min-h-12 grid-cols-[2.5rem_1fr] border " +
            (index === highlighted ? "border-warning bg-warning/10" : "border-border bg-background")
          }
        >
          <div className="flex items-center justify-center border-r border-border font-mono text-xs text-secondary">{index}</div>
          <div className="flex min-w-0 flex-wrap items-center gap-1 p-2">
            {bucket.length === 0 ? (
              <span className="font-mono text-xs text-secondary">null</span>
            ) : bucket.map((key) => (
              <span key={key} className="border border-accent bg-accent/10 px-2 py-1 font-mono text-xs text-accent">{key}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function Algs4HashPipelineMap() {
  const [keyIndex, setKeyIndex] = useState(6);
  const key = bookKeys[keyIndex];
  const raw = javaStringHash(key);
  const mixed = mixedHash(key);
  const index = tableIndex(mixed, 8);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          key = {key}
          <input
            className="mt-2 w-full accent-current"
            type="range"
            min="0"
            max={bookKeys.length - 1}
            value={keyIndex}
            onChange={(event) => setKeyIndex(Number(event.target.value))}
          />
        </label>
        <div className="mt-5 grid gap-2 md:grid-cols-5 md:items-stretch">
          {[
            ["key", key],
            ["hashCode", String(raw)],
            ["bit mix", String(mixed)],
            ["mask + mod 8", String(index)],
            ["collision policy", "chain / probe"],
          ].map(([label, value], index) => (
            <div key={label} className="relative border border-border bg-background p-3 text-center">
              <div className="text-[10px] uppercase text-secondary">{label}</div>
              <div className="mt-1 break-all font-mono text-xs text-primary">{value}</div>
              {index < 4 && <span className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 bg-elevated px-1 text-secondary md:block">→</span>}
            </div>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-secondary">
          <div className="border border-success bg-success/10 p-3">deterministic<div className="font-mono text-success">same key</div></div>
          <div className="border border-accent bg-accent/10 p-3">index range<div className="font-mono text-accent">0..M-1</div></div>
          <div className="border border-warning bg-warning/10 p-3">collision<div className="font-mono text-warning">must resolve</div></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Hashing先把key压缩成array index，再由collision policy保证不同keys落到同一index时仍可区分。
      </figcaption>
    </figure>
  );
}

export function Algs4HashDistributionLab() {
  const [mode, setMode] = useState<HashMode>("mixed");
  const [count, setCount] = useState(12);
  const buckets = useMemo(() => bucketize(bookKeys.slice(0, count), 8, mode), [count, mode]);
  const lengths = buckets.map((bucket) => bucket.length);
  const average = count / buckets.length;
  const variance = lengths.reduce((sum, length) => sum + (length - average) ** 2, 0) / buckets.length;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 border border-border" role="group" aria-label="hash quality">
          {(["mixed", "low bits", "constant"] as HashMode[]).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setMode(option)}
              className={"min-h-11 border-r border-border px-2 py-2 text-xs last:border-r-0 " + (mode === option ? "bg-primary text-background" : "bg-background text-secondary")}
            >
              {option}
            </button>
          ))}
        </div>
        <label className="mt-4 block text-sm font-semibold text-primary">
          keys = {count} · expected bucket length = {average.toFixed(2)}
          <input
            className="mt-2 w-full accent-current"
            type="range"
            min="4"
            max={bookKeys.length}
            value={count}
            onChange={(event) => setCount(Number(event.target.value))}
          />
        </label>
        <div className="mt-4 grid grid-cols-8 items-end gap-1 border border-border bg-background p-3">
          {lengths.map((length, index) => (
            <div key={index} className="flex h-36 flex-col justify-end text-center">
              <div className={(length > average * 2 ? "bg-danger" : "bg-accent") + " min-h-1"} style={{ height: `${Math.max(6, length * 24)}px` }} />
              <div className="mt-1 font-mono text-[10px] text-secondary">{index}</div>
            </div>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-secondary">
          <div className="border border-accent p-3">max chain<div className="font-mono text-accent">{Math.max(...lengths)}</div></div>
          <div className="border border-warning p-3">empty buckets<div className="font-mono text-warning">{lengths.filter((length) => length === 0).length}</div></div>
          <div className="border border-success p-3">variance<div className="font-mono text-success">{variance.toFixed(2)}</div></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Uniform hashing是analysis assumption而非API保证；只取低bits或constant hash会把工作集中到少数buckets。
      </figcaption>
    </figure>
  );
}

export function Algs4SeparateChainingLab() {
  const [count, setCount] = useState(10);
  const [queryIndex, setQueryIndex] = useState(3);
  const keys = bookKeys.slice(0, count);
  const query = bookKeys[queryIndex];
  const bucket = indexFor(query, 8);
  const buckets = useMemo(() => bucketize(keys, 8), [keys]);
  const chain = buckets[bucket];
  const comparisons = chain.findIndex((key) => key === query) + 1 || chain.length;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-semibold text-primary">
            inserted keys = {count}
            <input className="mt-2 w-full accent-current" type="range" min="4" max={bookKeys.length} value={count} onChange={(event) => setCount(Number(event.target.value))} />
          </label>
          <label className="text-sm font-semibold text-primary">
            query = {query} · bucket {bucket}
            <input className="mt-2 w-full accent-current" type="range" min="0" max={bookKeys.length - 1} value={queryIndex} onChange={(event) => setQueryIndex(Number(event.target.value))} />
          </label>
        </div>
        <div className="mt-5"><BucketGrid buckets={buckets} highlighted={bucket} /></div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-secondary">
          <div className="border border-accent p-3">load N/M<div className="font-mono text-accent">{(count / 8).toFixed(2)}</div></div>
          <div className="border border-warning p-3">chosen chain<div className="font-mono text-warning">{chain.join(" → ") || "empty"}</div></div>
          <div className="border border-success p-3">equals checks<div className="font-mono text-success">{comparisons}</div></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Separate chaining先hash选唯一list，再在list内用equals顺序查找；collision不会覆盖已有association。
      </figcaption>
    </figure>
  );
}

type LinearResult = {
  slots: (string | null)[];
  homes: Record<string, number>;
  probes: Record<string, number[]>;
};

function linearInsert(keys: readonly string[], capacity = 8): LinearResult {
  const slots: (string | null)[] = Array(capacity).fill(null);
  const homes: Record<string, number> = {};
  const probes: Record<string, number[]> = {};
  for (const key of keys) {
    const home = key.charCodeAt(0) % capacity;
    homes[key] = home;
    probes[key] = [];
    let index = home;
    while (slots[index] !== null && slots[index] !== key) {
      probes[key].push(index);
      index = (index + 1) % capacity;
    }
    probes[key].push(index);
    slots[index] = key;
  }
  return { slots, homes, probes };
}

function LinearTable({
  slots,
  highlighted = [],
  homes = {},
}: {
  slots: (string | null)[];
  highlighted?: number[];
  homes?: Record<string, number>;
}) {
  return (
    <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
      {slots.map((key, index) => (
        <div key={index} className={"min-h-20 border p-2 text-center " + (highlighted.includes(index) ? "border-warning bg-warning/10" : "border-border bg-background")}>
          <div className="font-mono text-[10px] text-secondary">{index}</div>
          <div className={"mt-2 font-mono text-sm " + (key ? "text-primary" : "text-secondary")}>{key ?? "·"}</div>
          {key && <div className="mt-1 font-mono text-[9px] text-secondary">home {homes[key] ?? index}</div>}
        </div>
      ))}
    </div>
  );
}

export function Algs4LinearProbingLab() {
  const [count, setCount] = useState(5);
  const keys = probeKeys.slice(0, count);
  const result = useMemo(() => linearInsert(keys), [keys]);
  const current = keys.at(-1) ?? "A";
  const path = result.probes[current] ?? [];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          inserted = {keys.join(" ")} · current {current} probes {path.join(" → ")}
          <input className="mt-2 w-full accent-current" type="range" min="1" max={probeKeys.length} value={count} onChange={(event) => setCount(Number(event.target.value))} />
        </label>
        <div className="mt-5"><LinearTable slots={result.slots} homes={result.homes} highlighted={path} /></div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-secondary">
          <div className="border border-accent p-3">home index<div className="font-mono text-accent">{result.homes[current]}</div></div>
          <div className="border border-warning p-3">probes<div className="font-mono text-warning">{path.length}</div></div>
          <div className="border border-success p-3">load factor<div className="font-mono text-success">{(count / 8).toFixed(3)}</div></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Linear probing从home开始逐slot前进并wrap around；遇equal为hit，遇null才可判定miss或插入。
      </figcaption>
    </figure>
  );
}

export function Algs4LinearProbeCostLab() {
  const [percent, setPercent] = useState(50);
  const alpha = percent / 100;
  const hit = 0.5 * (1 + 1 / (1 - alpha));
  const miss = 0.5 * (1 + 1 / ((1 - alpha) ** 2));

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          load factor alpha = {alpha.toFixed(2)}
          <input className="mt-2 w-full accent-current" type="range" min="10" max="90" step="5" value={percent} onChange={(event) => setPercent(Number(event.target.value))} />
        </label>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="border border-success bg-success/10 p-4">
            <div className="text-xs text-secondary">average hit probes</div>
            <div className="mt-2 font-mono text-2xl text-success">{hit.toFixed(2)}</div>
            <div className="mt-3 h-3 bg-border"><div className="h-full bg-success" style={{ width: `${Math.min(100, hit * 8)}%` }} /></div>
          </div>
          <div className="border border-danger bg-danger/10 p-4">
            <div className="text-xs text-secondary">average miss / insert probes</div>
            <div className="mt-2 font-mono text-2xl text-danger">{miss.toFixed(2)}</div>
            <div className="mt-3 h-3 bg-border"><div className="h-full bg-danger" style={{ width: `${Math.min(100, miss * 8)}%` }} /></div>
          </div>
        </div>
        <div className="mt-4 border border-warning bg-warning/10 p-3 text-xs text-secondary">
          {alpha <= 0.5 ? "At or below 50% occupancy, empty slots remain frequent and clusters stay controlled." : "Above 50%, unsuccessful search cost accelerates; resize before the denominator approaches zero."}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Uniform hashing下probe cost随1/(1-alpha)增长；table接近full时，miss成本以平方项爆发。
      </figcaption>
    </figure>
  );
}

type DeleteMode = "before" | "naive null" | "rehash cluster";

function deleteFromCluster(mode: DeleteMode) {
  const initial = linearInsert(probeKeys.slice(0, 5));
  if (mode === "before") return initial;
  const deletedIndex = initial.slots.findIndex((key) => key === "A");
  if (mode === "naive null") {
    const slots = [...initial.slots];
    slots[deletedIndex] = null;
    return { ...initial, slots };
  }
  return linearInsert(probeKeys.slice(1, 5));
}

function searchPath(slots: (string | null)[], key: string) {
  const path: number[] = [];
  let index = key.charCodeAt(0) % slots.length;
  for (let count = 0; count < slots.length; count += 1) {
    path.push(index);
    if (slots[index] === null || slots[index] === key) break;
    index = (index + 1) % slots.length;
  }
  return path;
}

export function Algs4LinearDeleteClusterLab() {
  const [mode, setMode] = useState<DeleteMode>("naive null");
  const result = useMemo(() => deleteFromCluster(mode), [mode]);
  const path = searchPath(result.slots, "Q");
  const found = result.slots[path.at(-1) ?? 0] === "Q";

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 border border-border" role="group" aria-label="delete strategy">
          {(["before", "naive null", "rehash cluster"] as DeleteMode[]).map((option) => (
            <button key={option} type="button" onClick={() => setMode(option)} className={"min-h-11 border-r border-border px-2 py-2 text-xs last:border-r-0 " + (mode === option ? "bg-primary text-background" : "bg-background text-secondary")}>{option}</button>
          ))}
        </div>
        <div className="mt-5"><LinearTable slots={result.slots} homes={result.homes} highlighted={path} /></div>
        <div className={"mt-4 border p-3 text-xs " + (found ? "border-success bg-success/10 text-success" : "border-danger bg-danger/10 text-danger")}>
          get(Q): path {path.join(" → ")} · {found ? "hit Q" : "stops at null: false miss"}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Cluster中间不能直接留下null；必须把后续连续keys取出并重新insert，恢复“home到key之间无null”的search invariant。
      </figcaption>
    </figure>
  );
}

export function Algs4HashResizeLab() {
  const [count, setCount] = useState(8);
  const keys = bookKeys.slice(0, count);
  const small = useMemo(() => bucketize(keys, 8), [keys]);
  const large = useMemo(() => bucketize(keys, 16), [keys]);
  const moved = keys.filter((key) => indexFor(key, 8) !== indexFor(key, 16));

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          keys = {count} · moved after M doubles = {moved.length}
          <input className="mt-2 w-full accent-current" type="range" min="4" max={bookKeys.length} value={count} onChange={(event) => setCount(Number(event.target.value))} />
        </label>
        <div className="mt-5 grid gap-6 lg:grid-cols-2">
          <div>
            <div className="mb-2 text-center text-xs font-semibold text-warning">before · M=8</div>
            <BucketGrid buckets={small} />
          </div>
          <div>
            <div className="mb-2 text-center text-xs font-semibold text-success">after rehash · M=16</div>
            <BucketGrid buckets={large} />
          </div>
        </div>
        <div className="mt-4 border border-accent bg-accent/10 p-3 text-xs text-secondary">
          Keys whose index changes: <span className="font-mono text-accent">{moved.join(" ") || "none"}</span>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Index取决于M；resize不能复制旧slots或chains，必须用new capacity重新hash每个key。
      </figcaption>
    </figure>
  );
}

type ContractMode = "valid equal keys" | "hash mismatch" | "mutated key";

export function Algs4HashContractLab() {
  const [mode, setMode] = useState<ContractMode>("valid equal keys");
  const insertedBucket = mode === "mutated key" ? 2 : 5;
  const lookupBucket = mode === "valid equal keys" ? 5 : mode === "hash mismatch" ? 1 : 6;
  const equal = true;
  const hit = insertedBucket === lookupBucket && equal;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 border border-border" role="group" aria-label="hash contract">
          {(["valid equal keys", "hash mismatch", "mutated key"] as ContractMode[]).map((option) => (
            <button key={option} type="button" onClick={() => setMode(option)} className={"min-h-11 border-r border-border px-2 py-2 text-xs last:border-r-0 " + (mode === option ? "bg-primary text-background" : "bg-background text-secondary")}>{option}</button>
          ))}
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
          <div className="border border-accent bg-accent/10 p-4 text-center">
            <div className="text-xs text-secondary">inserted association</div>
            <div className="mt-2 font-mono text-accent">bucket {insertedBucket}</div>
          </div>
          <div className="text-center font-mono text-secondary">equals=true</div>
          <div className="border border-warning bg-warning/10 p-4 text-center">
            <div className="text-xs text-secondary">lookup starts</div>
            <div className="mt-2 font-mono text-warning">bucket {lookupBucket}</div>
          </div>
        </div>
        <div className={"mt-4 border p-3 text-center text-xs " + (hit ? "border-success bg-success/10 text-success" : "border-danger bg-danger/10 text-danger")}>
          {hit ? "HIT: equal keys share one hash destination" : "MISS: equals is never reached because lookup starts in another bucket"}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Equal keys必须有equal hashCode，且key参与hash/equals的fields在table生命周期内不可变；同hash则仍需equals消歧。
      </figcaption>
    </figure>
  );
}
