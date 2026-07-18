"use client";

import { useState } from "react";

const shortList = [10, 23, 50] as const;
const longList = [1, 3, 7, 10, 15, 18, 23, 30, 40, 70] as const;

export function PaeInvertedIndexDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="grid gap-3 border border-border bg-elevated p-4 sm:grid-cols-[180px_1fr] sm:p-5">
        <div className="border border-border bg-background p-3"><div className="text-xs text-muted">查询词</div><div className="mt-2 font-semibold text-primary">abaco AND mathematics</div></div>
        <div className="grid gap-2"><div className="border border-border bg-background p-3 text-sm text-secondary">abaco → 10, 23, 50</div><div className="border border-border bg-background p-3 text-sm text-secondary">mathematics → 1, 3, 7, <strong className="text-success">10</strong>, 15, 18, <strong className="text-success">23</strong>, 30, 40, 70</div><div className="border border-success bg-success/10 p-3 text-sm font-semibold text-success">交集 → 10, 23</div></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        AND 查询转化为有序 posting lists 的 docID 交集，不必扫描全部文档文本。
      </figcaption>
    </figure>
  );
}

export function PaeMergeIntersectionLab() {
  const trace = [
    [10, 1, "右指针前进"],
    [10, 3, "右指针前进"],
    [10, 7, "右指针前进"],
    [10, 10, "命中10，双指针前进"],
    [23, 15, "右指针前进"],
    [23, 18, "右指针前进"],
    [23, 23, "命中23，双指针前进"],
    [50, 30, "右指针前进"],
    [50, 40, "右指针前进"],
    [50, 70, "左指针前进并结束"],
  ] as const;
  const [cursor, setCursor] = useState(3);
  const [a, b, action] = trace[cursor];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <input className="w-full accent-current" type="range" min="0" max={trace.length - 1} value={cursor} onChange={(event) => setCursor(Number(event.target.value))} aria-label="归并求交步骤" />
        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="border border-border bg-background p-3 text-center"><div className="text-xs text-muted">A[i]</div><div className="mt-1 font-semibold text-primary">{a}</div></div>
          <div className="border border-border bg-background p-3 text-center"><div className="text-xs text-muted">B[j]</div><div className="mt-1 font-semibold text-primary">{b}</div></div>
          <div className={"border p-3 text-center " + (a === b ? "border-success bg-success/10" : "border-accent bg-accent/10")}><div className="text-xs text-muted">动作</div><div className="mt-1 text-sm font-semibold text-primary">{action}</div></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        每次比较至少推进一个指针，且被越过的较小值不可能再与未来较大值匹配。
      </figcaption>
    </figure>
  );
}

export function PaeIntersectionStrategyMap() {
  const rows = [
    ["长度接近", "双指针归并", "O(n+m)", "连续扫描"],
    ["m 远小于 n", "逐项二分", "O(m log n)", "会重复检查 A"],
    ["任意比例", "相互分割", "O(m(1+log(n/m)))", "递归与随机访问"],
    ["任意比例", "倍增搜索", "同上", "迭代但仍跳跃"],
    ["外存/压缩", "两级块索引", "n/L + mL", "块级顺扫"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[850px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["形态", "策略", "RAM 时间", "工程特征"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row, index) => <tr key={row[1]} className="border-b border-border last:border-0">{row.map((cell, column) => <td key={cell} className={"p-3 " + (index === rows.length - 1 && column > 0 ? "font-semibold text-success" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        渐进时间最优不等于外存最快；规模比、访问连续性、压缩与递归开销共同决定策略。
      </figcaption>
    </figure>
  );
}

export function PaeMutualPartitionDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="border border-border bg-background p-3"><div className="text-xs font-semibold text-primary">短表 B 的中位数 pivot = 12</div><div className="mt-3 grid grid-cols-5 gap-1">{[2, 5, 8, 10, 12, 17, 25, 31, 44].map((value) => <span key={value} className={"grid h-8 place-items-center text-xs " + (value === 12 ? "bg-accent text-accent-foreground" : "bg-elevated text-secondary")}>{value}</span>)}</div></div>
          <div className="border border-border bg-background p-3"><div className="text-xs font-semibold text-primary">在长表 A 中二分定位</div><div className="mt-3 grid grid-cols-6 gap-1">{[1, 3, 6, 9, 12, 14, 18, 22, 30, 40, 50, 60].map((value) => <span key={value} className={"grid h-8 place-items-center text-xs " + (value === 12 ? "bg-success text-success-foreground" : "bg-elevated text-secondary")}>{value}</span>)}</div></div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2"><div className="border border-accent bg-accent/10 p-3 text-xs text-secondary">递归 A 左部 ∩ B 左半</div><div className="border border-success bg-success/10 p-3 text-xs text-secondary">递归 A 右部 ∩ B 右半</div></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        短表每层至少减半；长表即使极不平衡，也会连同短表一半被整体丢弃。
      </figcaption>
    </figure>
  );
}

export function PaeGallopingSearchLab() {
  const suffix = [14, 16, 20, 22, 27, 31, 35, 39, 42, 47, 53, 60, 71, 80, 91, 105] as const;
  const target = 41;
  const probes = new Set([0, 1, 3, 7, 15]);
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-8 gap-1 sm:grid-cols-16">{suffix.map((value, index) => <div key={value} className={"p-2 text-center text-xs " + (probes.has(index) ? "border border-accent bg-accent/10 text-accent" : "border border-border bg-background text-secondary")}><div>{value}</div><div className="mt-1 text-[10px] text-muted">+{index + 1}</div></div>)}</div>
        <p className="mb-0 mt-3 text-sm leading-6 text-secondary">探测距离1、2、4、8、16，确定41位于39与42之间；随后只在最后指数窗口内二分。</p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        上一匹配位置之后的搜索距离按2的幂增长，窗口大小小于真实前进距离的两倍。
      </figcaption>
    </figure>
  );
}

export function PaeTwoLevelIntersectionDiagram() {
  const blocks = [
    ["A1", "1, 3, 7, 10", "首项1"],
    ["A2", "15, 18, 23, 30", "首项15"],
    ["A3", "40, 50, 60, 70", "首项40"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="border border-accent bg-accent/10 p-3 text-sm text-secondary"><strong className="text-accent">A0 首级：</strong>1 · 15 · 40，与短表 B 归并确定候选块</div>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">{blocks.map(([name, values, head]) => <div key={name} className="border border-border bg-background p-3"><div className="flex justify-between gap-2 text-xs"><strong className="text-primary">{name}</strong><span className="text-muted">{head}</span></div><div className="mt-3 text-sm text-secondary">{values}</div></div>)}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        首级只存每个 L 项块的首元素；先定位 B 项所属块，再只解压和归并非空候选块。
      </figcaption>
    </figure>
  );
}
