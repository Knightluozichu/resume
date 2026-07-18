"use client";

import { useMemo, useState } from "react";

const sampleKeys = [19, 14, 23, 1, 68, 20] as const;
const hashWords = ["weiss", "hash", "table", "probe"] as const;
const occupiedSlots = new Set([0, 1, 2, 3, 5, 7]);

export function DsaHashAddressLab() {
  const [tableSize, setTableSize] = useState(7);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          tableSize = {tableSize}
          <input
            className="mt-2 w-full accent-current"
            type="range"
            min="5"
            max="13"
            step="2"
            value={tableSize}
            onChange={(event) => setTableSize(Number(event.target.value))}
          />
        </label>
        <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6">
          {sampleKeys.map((key) => (
            <div key={key} className="border border-border bg-background p-3 text-center">
              <div className="font-mono text-xs text-muted">key {key}</div>
              <div className="mt-1 font-mono text-sm font-semibold text-accent">
                bucket {key % tableSize}
              </div>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        散列表先把大 key space 压到有限 bucket space；碰撞不是异常，而是必须设计的正常分支。
      </figcaption>
    </figure>
  );
}

export function DsaStringHashLab() {
  const [word, setWord] = useState<string>(hashWords[0]);
  const trace = useMemo(() => {
    let hash = 0;
    return Array.from(word).map((character) => {
      hash = (37 * hash + character.charCodeAt(0)) >>> 0;
      return { character, hash };
    });
  }, [word]);
  const finalHash = trace.at(-1)?.hash ?? 0;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {hashWords.map((candidate) => (
            <button
              key={candidate}
              type="button"
              onClick={() => setWord(candidate)}
              className={
                "min-h-10 border px-2 font-mono text-xs font-semibold " +
                (word === candidate
                  ? "border-accent bg-accent text-background"
                  : "border-border bg-background text-primary")
              }
            >
              {candidate}
            </button>
          ))}
        </div>
        <div className="mt-4 overflow-x-auto">
          <div className="flex min-w-max gap-2">
            {trace.map((step, index) => (
              <div
                key={`${step.character}-${index}`}
                className="w-28 border border-border bg-background p-3"
              >
                <div className="font-mono text-xs text-muted">
                  {index + 1}. {step.character}
                </div>
                <div className="mt-1 truncate font-mono text-xs text-primary">{step.hash}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-3 border border-success bg-success/10 p-3 font-mono text-xs text-success">
          unsigned hash = {finalHash}; bucket[101] = {finalHash % 101}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Horner 形式逐字符混合顺序信息；最终还要对当前 tableSize 取模。
      </figcaption>
    </figure>
  );
}

export function DsaSeparateChainingLab() {
  const [selectedKey, setSelectedKey] = useState<number>(23);
  const tableSize = 7;
  const chains = Array.from({ length: tableSize }, (_, bucket) =>
    sampleKeys.filter((key) => key % tableSize === bucket),
  );

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="flex flex-wrap gap-2">
          {sampleKeys.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setSelectedKey(key)}
              className={
                "h-10 min-w-10 border px-2 font-mono text-xs " +
                (selectedKey === key
                  ? "border-accent bg-accent text-background"
                  : "border-border bg-background text-primary")
              }
            >
              {key}
            </button>
          ))}
        </div>
        <div className="mt-4 space-y-2">
          {chains.map((chain, bucket) => (
            <div key={bucket} className="grid grid-cols-[3rem_1fr] items-stretch">
              <div className="flex items-center justify-center border border-border bg-background font-mono text-xs text-muted">
                {bucket}
              </div>
              <div className="flex min-h-10 items-center gap-1 border-y border-r border-border bg-background p-1">
                {chain.length === 0 ? (
                  <span className="px-2 text-xs text-muted">empty</span>
                ) : (
                  chain.map((key) => (
                    <span
                      key={key}
                      className={
                        "border px-3 py-1 font-mono text-xs " +
                        (key === selectedKey
                          ? "border-success bg-success/10 text-success"
                          : "border-accent bg-accent/10 text-accent")
                      }
                    >
                      {key}
                    </span>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Separate chaining 把同一 bucket 的 keys 留在一条 list 中；链长直接反映碰撞分布。
      </figcaption>
    </figure>
  );
}

type ProbeMode = "linear" | "quadratic" | "double";

function buildProbeSequence(mode: ProbeMode, key: number, tableSize: number) {
  const start = key % tableSize;
  const secondaryStep = 7 - (key % 7);
  const sequence: number[] = [];

  for (let attempt = 0; attempt < tableSize; attempt += 1) {
    const offset =
      mode === "linear"
        ? attempt
        : mode === "quadratic"
          ? attempt * attempt
          : attempt * secondaryStep;
    const slot = (start + offset) % tableSize;
    if (!sequence.includes(slot)) sequence.push(slot);
    if (!occupiedSlots.has(slot)) break;
  }

  return sequence;
}

export function DsaOpenAddressingProbeLab() {
  const [mode, setMode] = useState<ProbeMode>("quadratic");
  const [key, setKey] = useState(25);
  const tableSize = 11;
  const sequence = buildProbeSequence(mode, key, tableSize);
  const destination = sequence.at(-1);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 gap-2">
          {(["linear", "quadratic", "double"] as ProbeMode[]).map((candidate) => (
            <button
              key={candidate}
              type="button"
              onClick={() => setMode(candidate)}
              className={
                "min-h-10 border px-1 text-xs font-semibold " +
                (mode === candidate
                  ? "border-accent bg-accent text-background"
                  : "border-border bg-background text-primary")
              }
            >
              {candidate}
            </button>
          ))}
        </div>
        <label className="mt-4 block text-sm font-semibold text-primary">
          key = {key}
          <input
            className="mt-2 w-full accent-current"
            type="range"
            min="11"
            max="54"
            value={key}
            onChange={(event) => setKey(Number(event.target.value))}
          />
        </label>
        <div className="mt-4 grid grid-cols-6 gap-1 sm:grid-cols-11">
          {Array.from({ length: tableSize }, (_, slot) => {
            const visit = sequence.indexOf(slot);
            const isDestination = slot === destination && !occupiedSlots.has(slot);
            return (
              <div
                key={slot}
                className={
                  "aspect-square border p-1 text-center font-mono text-[10px] " +
                  (isDestination
                    ? "border-success bg-success/10 text-success"
                    : visit >= 0
                      ? "border-warning bg-warning/10 text-warning"
                      : occupiedSlots.has(slot)
                        ? "border-border bg-background text-muted"
                        : "border-border bg-elevated text-secondary")
                }
              >
                <div>{slot}</div>
                <div>{visit >= 0 ? `#${visit + 1}` : occupiedSlots.has(slot) ? "used" : "free"}</div>
              </div>
            );
          })}
        </div>
        <div className="mt-3 border border-border bg-background p-3 font-mono text-xs text-primary">
          probe: {sequence.join(" -> ")}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Linear、quadratic 与 double hashing 的区别不是首地址，而是碰撞后的 probe sequence。
      </figcaption>
    </figure>
  );
}

export function DsaRehashingLoadLab() {
  const [entries, setEntries] = useState(6);
  const capacity = 11;
  const load = entries / capacity;
  const shouldRehash = load > 0.5;
  const nextCapacity = 23;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          active entries = {entries}
          <input
            className="mt-2 w-full accent-current"
            type="range"
            min="0"
            max="11"
            value={entries}
            onChange={(event) => setEntries(Number(event.target.value))}
          />
        </label>
        <div className="mt-4 h-4 border border-border bg-background">
          <div
            className={"h-full " + (shouldRehash ? "bg-warning" : "bg-success")}
            style={{ width: `${Math.min(100, load * 100)}%` }}
          />
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          <div className="border border-border bg-background p-3 text-xs text-secondary">
            load factor
            <div className="mt-1 font-mono text-primary">{load.toFixed(2)}</div>
          </div>
          <div className="border border-border bg-background p-3 text-xs text-secondary">
            current capacity
            <div className="mt-1 font-mono text-primary">{capacity}</div>
          </div>
          <div
            className={
              "border p-3 text-xs " +
              (shouldRehash
                ? "border-warning bg-warning/10 text-warning"
                : "border-success bg-success/10 text-success")
            }
          >
            {shouldRehash ? `rehash to ${nextCapacity}` : "keep current table"}
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        官方 quadratic probing 实现在 active entries 超过容量一半时扩到约两倍后的下一个 prime。
      </figcaption>
    </figure>
  );
}

export function DsaStdHashSemanticsLab() {
  const [operation, setOperation] = useState<"insert" | "duplicate" | "lookup">("insert");
  const result = {
    insert: { size: 2, text: "insert Anne -> inserted=true" },
    duplicate: { size: 2, text: "insert Anne again -> inserted=false" },
    lookup: { size: 2, text: "find Bob -> iterator to value 91" },
  }[operation];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 gap-2">
          {(["insert", "duplicate", "lookup"] as const).map((candidate) => (
            <button
              key={candidate}
              type="button"
              onClick={() => setOperation(candidate)}
              className={
                "min-h-10 border px-1 text-xs font-semibold " +
                (operation === candidate
                  ? "border-accent bg-accent text-background"
                  : "border-border bg-background text-primary")
              }
            >
              {candidate}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-[1fr_auto]">
          <div className="border border-border bg-background p-3 font-mono text-xs text-primary">
            {result.text}
          </div>
          <div className="border border-success bg-success/10 p-3 font-mono text-xs text-success">
            size = {result.size}
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        标准库 unordered containers 暴露 value semantics、hash/equality contract 与平均复杂度，而不暴露教材桶布局。
      </figcaption>
    </figure>
  );
}

const extendibleKeys = [1, 5, 9, 13, 2, 6, 10, 14] as const;

export function DsaExtendibleHashingLab() {
  const [globalDepth, setGlobalDepth] = useState<2 | 3>(2);
  const directorySize = 2 ** globalDepth;
  const buckets = Array.from({ length: directorySize }, (_, suffix) => ({
    suffix,
    keys: extendibleKeys.filter((key) => key % directorySize === suffix),
  }));

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-2">
          {([2, 3] as const).map((depth) => (
            <button
              key={depth}
              type="button"
              onClick={() => setGlobalDepth(depth)}
              className={
                "min-h-10 border text-xs font-semibold " +
                (globalDepth === depth
                  ? "border-accent bg-accent text-background"
                  : "border-border bg-background text-primary")
              }
            >
              global depth {depth}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {buckets.map((bucket) => (
            <div key={bucket.suffix} className="grid grid-cols-[4rem_1fr]">
              <div className="flex items-center justify-center border border-border bg-background font-mono text-xs text-muted">
                {bucket.suffix.toString(2).padStart(globalDepth, "0")}
              </div>
              <div
                className={
                  "min-h-10 border-y border-r p-2 font-mono text-xs " +
                  (bucket.keys.length > 2
                    ? "border-warning bg-warning/10 text-warning"
                    : "border-success bg-success/10 text-success")
                }
              >
                {bucket.keys.length ? bucket.keys.join(", ") : "empty"}
              </div>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Extendible hashing 用 hash suffix 索引 directory；bucket overflow 时先局部分裂，必要时才把 directory 加倍。
      </figcaption>
    </figure>
  );
}
