"use client";

import { useState } from "react";

export function PaeSamplingUniformityDiagram() {
  const n = 8;
  const m = 3;
  const samples = [
    [1, 3, 6],
    [2, 4, 8],
    [1, 5, 7],
    [3, 4, 6],
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-2 sm:grid-cols-4">{samples.map((sample, row) => <div key={row} className="grid grid-cols-8 gap-1 border border-border bg-background p-2">{Array.from({ length: n }, (_, index) => <span key={index} className={"grid aspect-square place-items-center text-[10px] " + (sample.includes((index + 1) as never) ? "bg-accent text-accent-foreground" : "bg-elevated text-muted")}>{index + 1}</span>)}</div>)}</div>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          <div className="border border-border bg-background p-3 text-sm text-secondary">样本大小 <strong className="text-primary">m = {m}</strong></div>
          <div className="border border-border bg-background p-3 text-sm text-secondary">位置总数 <strong className="text-primary">n = {n}</strong></div>
          <div className="border border-success bg-success/10 p-3 text-sm text-secondary">每项包含概率 <strong className="text-success">m / n</strong></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        均匀无放回抽样要求所有大小为 m 的子集等概率，因此每个位置的边缘包含概率是 m/n。
      </figcaption>
    </figure>
  );
}

export function PaeDiskSamplingMap() {
  const rows = [
    ["复制指针并交换", "Theta(n) 指针", "Theta(m) 随机 I/O", "不重复，但复制大"],
    ["哈希位置去重", "Theta(m)", "min(m,n/B)", "平均常数重采样"],
    ["排序位置去重", "Theta(m)", "min(m,n/B)", "批量排序并流式提取"],
    ["桶排序特化", "Theta(m)", "min(m,n/B)", "随机整数桶期望常数负载"],
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[820px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["磁盘已知 n", "额外空间", "提取 I/O", "核心取舍"].map((cell) => <th key={cell} className="p-3 text-primary">{cell}</th>)}</tr></thead>
          <tbody>{rows.map((row, index) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, column) => <td key={cell} className={"p-3 " + (index === rows.length - 1 && column > 0 ? "font-semibold text-success" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        先生成并排序位置，再顺序提取对象，可避免直接在大文件中执行 m 次随机访问。
      </figcaption>
    </figure>
  );
}

export function PaeKnownLengthStreamLab() {
  const n = 10;
  const m = 4;
  const [position, setPosition] = useState(5);
  const [selected, setSelected] = useState(2);
  const remainingItems = n - position + 1;
  const remainingSlots = Math.max(0, m - selected);
  const probability = Math.min(1, remainingSlots / remainingItems);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-semibold text-primary">当前位置 j = {position}<input className="mt-2 w-full accent-current" type="range" min="1" max={n} value={position} onChange={(event) => setPosition(Number(event.target.value))} /></label>
          <label className="text-sm font-semibold text-primary">已选 s = {selected}<input className="mt-2 w-full accent-current" type="range" min="0" max={m} value={selected} onChange={(event) => setSelected(Number(event.target.value))} /></label>
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          <div className="border border-border bg-background p-3"><div className="text-xs text-muted">剩余元素</div><div className="mt-1 font-semibold text-primary">{remainingItems}</div></div>
          <div className="border border-border bg-background p-3"><div className="text-xs text-muted">剩余名额</div><div className="mt-1 font-semibold text-accent">{remainingSlots}</div></div>
          <div className="border border-success bg-success/10 p-3"><div className="text-xs text-muted">接受当前项概率</div><div className="mt-1 font-semibold text-success">{probability.toFixed(3)}</div></div>
        </div>
        <p className="mb-0 mt-3 text-sm leading-6 text-secondary">当剩余名额等于剩余元素时，概率自动变为1，保证最终样本恰好有 m 项。</p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        已知 n 的单遍流在位置 j 以 (m-s)/(n-j+1) 接受当前项，不回看已跳过数据。
      </figcaption>
    </figure>
  );
}

export function PaeRandomKeyHeapDiagram() {
  const items = [
    ["A", 0.18],
    ["B", 0.91],
    ["C", 0.43],
    ["D", 0.76],
    ["E", 0.12],
    ["F", 0.68],
  ] as const;
  const threshold = 0.68;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-6 gap-2">{items.map(([item, key]) => <div key={item} className={"border p-3 text-center " + (key >= threshold ? "border-success bg-success/10" : "border-border bg-background")}><div className="font-semibold text-primary">{item}</div><div className="mt-2 text-xs text-secondary">{key.toFixed(2)}</div></div>)}</div>
        <div className="mt-3 border-l-4 border-accent bg-background p-3 text-sm text-secondary">m = 3 时保留最大三个随机键：B、D、F；最小堆根保存当前门槛0.68。</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        连续随机键几乎不会并列，所有项对进入 top-m 的机会对称；代价是每次候选更新需堆操作。
      </figcaption>
    </figure>
  );
}

export function PaeReservoirSamplingLab() {
  const [step, setStep] = useState(8);
  const m = 3;
  const replacement = step % 5;
  const accepted = replacement >= 1 && replacement <= m;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">处理第 j = {step} 项<input className="mt-3 w-full accent-current" type="range" min={m + 1} max="20" value={step} onChange={(event) => setStep(Number(event.target.value))} /></label>
        <div className="mt-4 grid gap-2 sm:grid-cols-4">
          <div className="border border-border bg-background p-3"><div className="text-xs text-muted">蓄水池大小</div><div className="mt-1 font-semibold text-primary">{m}</div></div>
          <div className="border border-border bg-background p-3"><div className="text-xs text-muted">示例随机 h</div><div className="mt-1 font-semibold text-primary">{replacement || step}</div></div>
          <div className={"border p-3 " + (accepted ? "border-success bg-success/10" : "border-border bg-background")}><div className="text-xs text-muted">当前项</div><div className="mt-1 font-semibold text-primary">{accepted ? "替换 R[h]" : "跳过"}</div></div>
          <div className="border border-accent bg-accent/10 p-3"><div className="text-xs text-muted">进入概率</div><div className="mt-1 font-semibold text-accent">{m}/{step}</div></div>
        </div>
        <p className="mb-0 mt-3 text-sm leading-6 text-secondary">实际算法从1到 j 均匀生成 h；这里只用确定性示例演示 h 是否落入1到 m 的替换区间。</p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        新项以 m/j 进入，池中旧项恰以1/j被替换，处理 j 项后每项包含概率保持为 m/j。
      </figcaption>
    </figure>
  );
}
