"use client";

import { useMemo, useState } from "react";

const dictionaryRows = [
  ["直接寻址", "O(1) 最坏", "O(1) 最坏", "Theta(|U|)", "稠密小宇宙"],
  ["链式哈希", "O(1+alpha) 期望", "O(1) 期望摊还", "O(n+m)", "通用动态字典"],
  ["两级完美表", "O(1) 最坏", "静态重建", "O(n) 期望", "冻结键集"],
  ["布谷鸟哈希", "O(1) 最坏", "O(1) 期望摊还", "O(n)", "读多写少"],
  ["布隆过滤器", "O(r) 单侧误差", "O(r)，不支持普通删除", "m bits", "前置否定过滤"],
] as const;

export function PaeDictionaryOperationMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[900px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["结构", "Search", "更新", "空间", "适用边界"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{dictionaryRows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 0 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        同一个字典接口对应不同保证；先区分静态/动态、精确/近似，再比较时间和空间。
      </figcaption>
    </figure>
  );
}

export function PaeChainingLoadLab() {
  const [count, setCount] = useState(12);
  const bucketCount = 8;
  const loads = useMemo(() => {
    const next = Array.from({ length: bucketCount }, () => 0);
    for (let key = 0; key < count; key += 1) next[((5 * key + 3) % 101) % bucketCount] += 1;
    return next;
  }, [count]);
  const max = Math.max(...loads);
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">键数 n = {count}<input className="mt-2 w-full accent-current" type="range" min="4" max="28" value={count} onChange={(event) => setCount(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-8 gap-1">{loads.map((load, index) => <div key={index} className="flex h-32 flex-col justify-end border border-border bg-background p-1"><div className="bg-accent/70" style={{ height: `${Math.max(8, (load / Math.max(1, max)) * 88)}px` }} /><div className="mt-1 text-center text-[10px] text-muted">{index}: {load}</div></div>)}</div>
        <div className="mt-3 grid gap-2 sm:grid-cols-3"><div className="border border-border bg-background p-3 text-xs text-secondary">m = {bucketCount}</div><div className="border border-border bg-background p-3 text-xs text-secondary">alpha = n/m = {(count / bucketCount).toFixed(2)}</div><div className="border border-accent bg-accent/10 p-3 text-xs font-semibold text-accent">期望扫描约 1+alpha = {(1 + count / bucketCount).toFixed(2)}</div></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        负载因子控制平均链长；扩缩容保持 m 与 n 同阶，才能把期望摊还成本压在常数级。
      </figcaption>
    </figure>
  );
}

const universalChoices = [
  [2, 3],
  [5, 1],
  [11, 7],
  [19, 4],
] as const;
const universalKeys = [8, 19, 42, 73, 98] as const;

export function PaeUniversalHashLab() {
  const [choice, setChoice] = useState(1);
  const [a, b] = universalChoices[choice];
  const values = universalKeys.map((key) => ((a * key + b) % 101) % 11);
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-4 gap-2">{universalChoices.map(([nextA, nextB], index) => <button key={`${nextA}-${nextB}`} type="button" onClick={() => setChoice(index)} aria-pressed={choice === index} className={"min-h-11 border text-xs font-semibold " + (choice === index ? "border-accent bg-accent/15 text-accent" : "border-border bg-background text-secondary")}>a={nextA}, b={nextB}</button>)}</div>
        <div className="mt-4 border border-border bg-background p-3 text-center text-sm text-secondary">h(k) = (({a}k + {b}) mod 101) mod 11</div>
        <div className="mt-3 grid grid-cols-5 gap-2">{universalKeys.map((key, index) => <div key={key} className="border border-border bg-background p-3 text-center"><div className="text-xs text-muted">key {key}</div><div className="mt-1 font-semibold text-accent">slot {values[index]}</div></div>)}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        输入键集不变，运行时从哈希族随机选参数；风险转移到函数选择，使任意键对碰撞概率受控。
      </figcaption>
    </figure>
  );
}

const perfectBuckets = [
  ["T0", [72]],
  ["T1", []],
  ["T2", [1, 79]],
  ["T3", [19, 98]],
  ["T4", [14, 50]],
  ["T5", [3]],
  ["T6", [69]],
] as const;

export function PaePerfectHashDiagram() {
  const [query, setQuery] = useState(98);
  const primary = perfectBuckets.findIndex(([, keys]) => (keys as readonly number[]).includes(query));
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="flex flex-wrap gap-2">{[98, 19, 50, 8].map((key) => <button key={key} type="button" onClick={() => setQuery(key)} aria-pressed={query === key} className={"h-10 min-w-14 border px-3 text-xs font-semibold " + (query === key ? "border-accent bg-accent/15 text-accent" : "border-border bg-background text-secondary")}>{key}</button>)}</div>
        <div className="mt-4 grid grid-cols-7 gap-1">{perfectBuckets.map(([name, keys], index) => <div key={name} className={"min-h-24 border p-2 " + (index === primary ? "border-accent bg-accent/10" : "border-border bg-background")}><div className="text-[10px] font-semibold text-primary">{name}</div><div className="mt-2 text-[10px] text-secondary">q={keys.length}</div><div className="text-[10px] text-muted">二级 {keys.length ** 2} 槽</div></div>)}</div>
        <div className="mt-3 border border-border bg-background p-3 text-sm text-secondary">{primary >= 0 ? `先到 ${perfectBuckets[primary][0]}，再用该桶独立的 h_j 做第二次访问并核对 key ${query}。` : `key ${query} 的一级/二级位置即使非空，最终键值不等也必须返回 false。`}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        一级把 n 个键分桶，含 q 个键的二级表分配 q 的平方个槽；期望总空间仍小于 2n。
      </figcaption>
    </figure>
  );
}

const cuckooTrace = [
  { table: ["·", "A", "·", "C", "B", "·"], moving: "K", note: "K 的两个位置都占用，选择槽 1" },
  { table: ["·", "K", "·", "C", "B", "·"], moving: "A", note: "K 占槽 1，A 被逐出并转向备用槽 3" },
  { table: ["·", "K", "·", "A", "B", "·"], moving: "C", note: "A 占槽 3，C 被逐出并转向备用槽 5" },
  { table: ["·", "K", "·", "A", "B", "C"], moving: "完成", note: "C 找到空槽 5，逐出链结束" },
] as const;

export function PaeCuckooEvictionLab() {
  const [step, setStep] = useState(1);
  const current = cuckooTrace[step];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <input className="w-full accent-current" type="range" min="0" max={cuckooTrace.length - 1} value={step} onChange={(event) => setStep(Number(event.target.value))} aria-label="布谷鸟逐出步骤" />
        <div className="mt-4 grid grid-cols-6 gap-2">{current.table.map((value, index) => <div key={index} className={"grid h-16 place-items-center border text-sm font-semibold " + (value === "·" ? "border-border bg-background text-muted" : "border-accent bg-accent/10 text-accent")}><span>{value}</span><span className="text-[10px] text-muted">slot {index}</span></div>)}</div>
        <div className="mt-3 grid gap-2 sm:grid-cols-[120px_1fr]"><div className="border border-border bg-background p-3 text-xs text-secondary">移动中：<strong className="text-primary">{current.moving}</strong></div><div className="border border-border bg-background p-3 text-xs text-secondary">{current.note}</div></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        每个键只有两个候选槽；Search 固定查两处，Insert 沿布谷鸟图路径逐出，检测到环时重哈希或放入 stash。
      </figcaption>
    </figure>
  );
}

export function PaeBloomFilterLab() {
  const [bitsPerKey, setBitsPerKey] = useState(10);
  const [hashes, setHashes] = useState(7);
  const oneProbability = 1 - Math.exp(-hashes / bitsPerKey);
  const falsePositive = oneProbability ** hashes;
  const optimalHashes = bitsPerKey * Math.log(2);
  const bits = Array.from({ length: 32 }, (_, index) => ((index * 37 + hashes * 11) % 100) / 100 < oneProbability);
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">每键位数 m/n = {bitsPerKey}<input className="mt-2 w-full accent-current" type="range" min="4" max="24" value={bitsPerKey} onChange={(event) => setBitsPerKey(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">哈希数 r = {hashes}<input className="mt-2 w-full accent-current" type="range" min="1" max="16" value={hashes} onChange={(event) => setHashes(Number(event.target.value))} /></label></div>
        <div className="mt-4 grid grid-cols-16 gap-1">{bits.map((set, index) => <span key={index} className={"h-7 border " + (set ? "border-accent bg-accent" : "border-border bg-background")} title={`bit ${index}: ${set ? 1 : 0}`} />)}</div>
        <div className="mt-3 grid gap-2 sm:grid-cols-3"><div className="border border-border bg-background p-3 text-xs text-secondary">1 位占比约 {(oneProbability * 100).toFixed(1)}%</div><div className="border border-border bg-background p-3 text-xs text-secondary">最优 r 约 {optimalHashes.toFixed(1)}</div><div className="border border-accent bg-accent/10 p-3 text-xs font-semibold text-accent">误报率约 {(falsePositive * 100).toPrecision(3)}%</div></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        哈希太少，指纹区分力不足；哈希太多，位图过快变满。最优点让 0/1 占比接近一半。
      </figcaption>
    </figure>
  );
}
