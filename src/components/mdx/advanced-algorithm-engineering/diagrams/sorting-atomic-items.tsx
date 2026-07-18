"use client";

import { useState } from "react";

export function PaeExternalMergePassDiagram() {
  const levels = [
    ["初始 runs", "每段约 M 项", "n / M 段"],
    ["第1次多路归并", "每次合并 M/B 段", "减少 M/B 倍"],
    ["后续归并", "每层顺序读写全部 n 项", "每层 Theta(n/B) I/O"],
    ["最终输出", "单个有序 run", "约 log_(M/B)(n/M) 层"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="grid gap-2 border border-border bg-elevated p-4 sm:grid-cols-4 sm:p-5">
        {levels.map(([title, detail, cost], index) => <div key={title} className={"relative border p-3 " + (index === levels.length - 1 ? "border-success bg-success/10" : "border-border bg-background")}><div className="text-sm font-semibold text-primary">{title}</div><p className="mb-0 mt-2 text-xs leading-5 text-secondary">{detail}</p><div className="mt-3 border-t border-border pt-2 text-xs font-semibold text-accent">{cost}</div>{index < levels.length - 1 && <span className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 bg-elevated px-1 text-accent sm:block">→</span>}</div>)}
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        内存先生成大 run，随后每轮用 M/B 路合并，归并层数而非比较次数主导外存传输。
      </figcaption>
    </figure>
  );
}

export function PaeSnowPlowLab() {
  const cases = [
    { incoming: 9, minimum: 4, action: "进入堆 H", reason: "9 不小于本 run 已输出下界4" },
    { incoming: 2, minimum: 4, action: "冻结到 U", reason: "2 会破坏当前 run 的非递减顺序" },
    { incoming: 7, minimum: 6, action: "进入堆 H", reason: "7 可在当前 run 后续输出" },
    { incoming: 1, minimum: 8, action: "冻结到 U", reason: "留给下一 phase 重新建堆" },
  ] as const;
  const [cursor, setCursor] = useState(1);
  const current = cases[cursor];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-4 gap-2">{cases.map((item, index) => <button key={index} type="button" onClick={() => setCursor(index)} aria-pressed={cursor === index} className={"h-11 border text-xs font-semibold " + (cursor === index ? "border-accent bg-accent/15 text-accent" : "border-border bg-background text-secondary")}>next = {item.incoming}</button>)}</div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          <div className="border border-border bg-background p-3"><div className="text-xs text-muted">刚输出 min</div><div className="mt-1 font-semibold text-primary">{current.minimum}</div></div>
          <div className="border border-border bg-background p-3"><div className="text-xs text-muted">新读 next</div><div className="mt-1 font-semibold text-primary">{current.incoming}</div></div>
          <div className={"border p-3 " + (current.action.includes("H") ? "border-success bg-success/10" : "border-danger bg-danger/10")}><div className="text-xs text-muted">决策</div><div className="mt-1 font-semibold text-primary">{current.action}</div></div>
        </div>
        <p className="mb-0 mt-3 text-sm leading-6 text-secondary">{current.reason}</p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        H 与 U 总计占 M；随机排列下约一半新项继续当前 run，初始 run 平均长度约2M。
      </figcaption>
    </figure>
  );
}

export function PaeSortingLowerBoundMap() {
  const rows = [
    ["RAM 排序", "Theta(n log n)", "比较决定排列"],
    ["RAM 置换", "Theta(n)", "目标排列已给出"],
    ["外存排序", "(n/B) log_(M/B)(n/M)", "比较与搬运"],
    ["外存置换", "min(n, (n/B) log_(M/B)(n/M))", "实际参数下常与排序同阶"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[760px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["问题与模型", "最优量级", "瓶颈"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row, index) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, column) => <td key={cell} className={"p-3 " + (index >= 2 && column === 1 ? "font-semibold text-success" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        在 RAM 中置换比排序少一个对数；在现实外存参数下，移动到目标位置本身已接近排序的 I/O 下界。
      </figcaption>
    </figure>
  );
}

export function PaeThreeWayPartitionLab() {
  const [pivot, setPivot] = useState(5);
  const values = [7, 2, 5, 9, 5, 1, 8, 5, 3] as const;
  const less = values.filter((value) => value < pivot);
  const equal = values.filter((value) => value === pivot);
  const greater = values.filter((value) => value > pivot);
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="flex items-center gap-2"><span className="text-sm font-semibold text-primary">Pivot</span>{[3, 5, 7].map((value) => <button key={value} type="button" onClick={() => setPivot(value)} aria-pressed={pivot === value} className={"size-10 border text-sm font-semibold " + (pivot === value ? "border-accent bg-accent/15 text-accent" : "border-border bg-background text-secondary")}>{value}</button>)}</div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          <div className="min-h-24 border border-border bg-background p-3"><div className="text-xs font-semibold text-success">小于</div><div className="mt-3 flex flex-wrap gap-1">{less.map((value, index) => <span key={index} className="grid size-8 place-items-center bg-success/10 text-xs text-success">{value}</span>)}</div></div>
          <div className="min-h-24 border border-accent bg-accent/10 p-3"><div className="text-xs font-semibold text-accent">等于</div><div className="mt-3 flex flex-wrap gap-1">{equal.map((value, index) => <span key={index} className="grid size-8 place-items-center bg-background text-xs text-accent">{value}</span>)}</div></div>
          <div className="min-h-24 border border-border bg-background p-3"><div className="text-xs font-semibold text-danger">大于</div><div className="mt-3 flex flex-wrap gap-1">{greater.map((value, index) => <span key={index} className="grid size-8 place-items-center bg-danger/10 text-xs text-danger">{value}</span>)}</div></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        三路划分让所有等于 pivot 的项一次到位，不再进入递归，重复键多时尤为重要。
      </figcaption>
    </figure>
  );
}

export function PaeMultiwaySortDualityDiagram() {
  const merge = ["M/B 个有序输入块", "最小堆选下一项", "1 个输出块"];
  const distribute = ["1 个输入块", "M/B-1 个枢轴", "M/B 个输出桶"];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="grid gap-3 border border-border bg-elevated p-4 sm:grid-cols-2 sm:p-5">
        <div className="border border-border bg-background p-4"><div className="text-sm font-semibold text-primary">多路归并</div>{merge.map((item, index) => <div key={item} className="mt-2 border-l-4 border-accent bg-elevated p-2 text-xs text-secondary">{index + 1}. {item}</div>)}</div>
        <div className="border border-border bg-background p-4"><div className="text-sm font-semibold text-primary">多路分布</div>{distribute.map((item, index) => <div key={item} className="mt-2 border-l-4 border-success bg-elevated p-2 text-xs text-secondary">{index + 1}. {item}</div>)}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        归并把多路收成一路，分布把一路拆成多桶；两者都用 M/B 的扇出减少外存层数。
      </figcaption>
    </figure>
  );
}

export function PaeMultiDiskConflictDiagram() {
  const disks = [
    ["D1", "run A: 已写", "下一块空"],
    ["D2", "run B: 已写", "A/B/C 下一块都指向这里"],
    ["D3", "run C: 已写", "下一块空"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="grid gap-2 border border-border bg-elevated p-4 sm:grid-cols-3 sm:p-5">{disks.map(([disk, state, next], index) => <div key={disk} className={"border p-4 " + (index === 1 ? "border-danger bg-danger/10" : "border-border bg-background")}><div className="font-semibold text-primary">{disk}</div><div className="mt-3 text-xs text-secondary">{state}</div><div className={"mt-2 text-xs font-semibold " + (index === 1 ? "text-danger" : "text-muted")}>{next}</div></div>)}</div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        D 个满输出块若下一位置落在同一磁盘，就需串行写入；条带化保证单 run 顺扫，却不自动消除多 run 冲突。
      </figcaption>
    </figure>
  );
}
