"use client";

import { useState } from "react";

const words = ["all", "ally", "also", "alter", "beta", "better"] as const;

export function PaeStringPointerCostDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="grid gap-3 border border-border bg-elevated p-4 sm:grid-cols-2 sm:p-5">
        <div className="border border-border bg-background p-4"><div className="text-sm font-semibold text-primary">指针数组</div><div className="mt-3 grid grid-cols-3 gap-1">{["p3", "p1", "p6", "p2", "p5", "p4"].map((item) => <span key={item} className="border border-border bg-elevated p-2 text-center text-xs text-accent">{item}</span>)}</div><p className="mb-0 mt-3 text-xs leading-5 text-secondary">交换指针便宜，但每次比较要追到另一片内存。</p></div>
        <div className="border border-border bg-background p-4"><div className="text-sm font-semibold text-primary">变长字符串存储</div><div className="mt-3 space-y-1">{words.slice(0, 4).map((word, index) => <div key={word} className="flex items-center gap-2 text-xs"><span className="w-8 text-muted">p{index + 1}</span><span className="flex-1 border border-border bg-elevated p-2 text-secondary">{word}</span></div>)}</div><p className="mb-0 mt-3 text-xs leading-5 text-secondary">公共前缀可能在不同比较中被重复读取。</p></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        比较排序移动的是指针，却反复随机访问字符串正文；指针页和字符页还会争夺缓存。
      </figcaption>
    </figure>
  );
}

export function PaeDistinguishingPrefixLab() {
  const [cursor, setCursor] = useState(1);
  const prefixes = ["all", "ally", "als", "alt", "bet", "bett"] as const;
  const word = words[cursor];
  const prefix = prefixes[cursor];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">{words.map((item, index) => <button key={item} type="button" onClick={() => setCursor(index)} aria-pressed={cursor === index} className={"h-10 border text-xs font-semibold " + (cursor === index ? "border-accent bg-accent/15 text-accent" : "border-border bg-background text-secondary")}>{item}</button>)}</div>
        <div className="mt-4 border border-border bg-background p-4 text-center"><span className="text-lg font-semibold text-accent">{prefix}</span><span className="text-lg text-muted">{word.slice(prefix.length)}</span><div className="mt-2 text-xs text-secondary">最短区分前缀长度 d_s = {prefix.length}</div></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        排序无需总是读取字符串尾部；读到足以与其余字符串区分的最短前缀即可确定叶子。
      </figcaption>
    </figure>
  );
}

export function PaeMsdRadixTrieDiagram() {
  const groups = [
    ["a", ["all", "ally", "also", "alter"]],
    ["b", ["beta", "better"]],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-3 sm:grid-cols-2">{groups.map(([digit, items]) => <div key={digit} className="border border-border bg-background p-3"><div className="grid size-9 place-items-center border border-accent bg-accent/10 font-semibold text-accent">{digit}</div><div className="mt-3 grid grid-cols-2 gap-1">{items.map((item) => <span key={item} className="bg-elevated p-2 text-xs text-secondary">{item}</span>)}</div></div>)}</div>
        <p className="mb-0 mt-3 text-sm leading-6 text-secondary">只有含多个字符串的桶继续查看下一字符；单元素桶已确定相对位置。</p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        MSD-first 的递归分桶隐式构造 trie，沿公共前缀向下，分支后按字符顺序拼接。
      </figcaption>
    </figure>
  );
}

export function PaeLsdStabilityLab() {
  const phases = [
    ["初始", ["017", "042", "666", "111", "911", "999", "007"]],
    ["个位稳定排序", ["111", "911", "042", "666", "017", "007", "999"]],
    ["十位稳定排序", ["007", "911", "017", "111", "042", "666", "999"]],
    ["百位稳定排序", ["007", "017", "042", "111", "666", "911", "999"]],
  ] as const;
  const [phase, setPhase] = useState(1);
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-4 gap-2">{phases.map(([label], index) => <button key={label as string} type="button" onClick={() => setPhase(index)} aria-pressed={phase === index} className={"min-h-11 border px-1 text-xs font-semibold " + (phase === index ? "border-accent bg-accent/15 text-accent" : "border-border bg-background text-secondary")}>{label}</button>)}</div>
        <div className="mt-4 grid grid-cols-7 gap-1">{phases[phase][1].map((item) => <span key={item} className="border border-border bg-background p-2 text-center text-xs text-primary">{item}</span>)}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        从低位到高位必须稳定排序；当前位相等时保留先前低位已经建立的次序。
      </figcaption>
    </figure>
  );
}

export function PaeMultikeyQuicksortLab() {
  const [offset, setOffset] = useState(1);
  const pivot = "ally";
  const charAt = (word: string) => word[offset] ?? "\0";
  const pivotChar = charAt(pivot);
  const less = words.filter((word) => charAt(word) < pivotChar);
  const equal = words.filter((word) => charAt(word) === pivotChar);
  const greater = words.filter((word) => charAt(word) > pivotChar);
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">字符偏移 i = {offset}<input className="mt-2 w-full accent-current" type="range" min="0" max="3" value={offset} onChange={(event) => setOffset(Number(event.target.value))} /></label>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">{[["小于", less], ["等于", equal], ["大于", greater]].map(([label, items], index) => <div key={label as string} className={"min-h-28 border p-3 " + (index === 1 ? "border-accent bg-accent/10" : "border-border bg-background")}><div className="text-xs font-semibold text-primary">{label} pivot[{offset}] = {pivotChar === "\0" ? "END" : pivotChar}</div><div className="mt-3 flex flex-wrap gap-1">{(items as readonly string[]).map((item) => <span key={item} className="bg-elevated p-2 text-xs text-secondary">{item}</span>)}</div></div>)}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        小于和大于桶仍比较偏移 i；等于桶已共享该字符，递归时才推进到 i+1。
      </figcaption>
    </figure>
  );
}

export function PaeStringIoModelMap() {
  const rows = [
    ["A", "外存中不可拆字符；长串仅按 B 块处理", "多路归并 + 内存 lazy trie"],
    ["B", "只在内部存储中可拆字符", "长短串分治，长串收益更明显"],
    ["C", "内外存都可拆字符", "随机哈希片段 + 谨慎恢复字典序"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5"><table className="w-full min-w-[820px] border-collapse text-left text-sm"><thead><tr className="border-b border-border">{["模型", "允许操作", "算法方向"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 0 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody></table></div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        外存字符串能否拆分不是实现细节，而是决定可达 I/O 上界和下界的模型能力。
      </figcaption>
    </figure>
  );
}
