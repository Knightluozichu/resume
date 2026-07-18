"use client";

import { useState } from "react";

const listOrder = [2, 5, 1, 4, 3] as const;

export function PaeListEncodingDiagram() {
  const succ = [4, 5, 3, 3, 1] as const;
  const rank = [2, 4, 0, 1, 3] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="flex items-center justify-between gap-1 overflow-x-auto">{listOrder.map((id, index) => <div key={id} className="flex min-w-0 flex-1 items-center"><div className={"grid size-12 shrink-0 place-items-center border text-sm font-semibold " + (index === listOrder.length - 1 ? "border-success bg-success/10 text-success" : "border-border bg-background text-primary")}>{id}</div>{index < listOrder.length - 1 && <span className="mx-1 text-accent">→</span>}</div>)}</div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[580px] border-collapse text-center text-sm">
            <tbody>
              <tr className="border-b border-border"><th className="p-2 text-left text-primary">id</th>{[1, 2, 3, 4, 5].map((id) => <td key={id} className="p-2 text-secondary">{id}</td>)}</tr>
              <tr className="border-b border-border"><th className="p-2 text-left text-primary">Succ</th>{succ.map((value, index) => <td key={index} className="p-2 text-accent">{value}</td>)}</tr>
              <tr><th className="p-2 text-left text-primary">Rank</th>{rank.map((value, index) => <td key={index} className="p-2 font-semibold text-success">{value}</td>)}</tr>
            </tbody>
          </table>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        物理数组按 id 排列，逻辑链为 2→5→1→4→3；Rank 是每个节点到自环尾节点3的边数。
      </figcaption>
    </figure>
  );
}

export function PaePointerJumpingLab() {
  const rounds = [
    { label: "初始", succ: [4, 5, 3, 3, 1], rank: [1, 1, 0, 1, 1], note: "非尾节点先只知道到直接后继的距离1。" },
    { label: "第1轮", succ: [3, 1, 3, 3, 4], rank: [2, 2, 0, 1, 2], note: "每个活动节点跨过一个后继，已知距离最多翻倍。" },
    { label: "第2轮", succ: [3, 3, 3, 3, 3], rank: [2, 4, 0, 1, 3], note: "所有指针到达尾节点，Rank 已是最终距离。" },
  ] as const;
  const [round, setRound] = useState(1);
  const current = rounds[round];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 gap-2">{rounds.map((item, index) => <button key={item.label} type="button" onClick={() => setRound(index)} aria-pressed={round === index} className={"h-10 border text-sm font-semibold " + (round === index ? "border-accent bg-accent/15 text-accent" : "border-border bg-background text-secondary")}>{item.label}</button>)}</div>
        <div className="mt-4 grid grid-cols-5 gap-2">{[1, 2, 3, 4, 5].map((id, index) => <div key={id} className="border border-border bg-background p-2 text-center"><div className="text-xs text-muted">节点 {id}</div><div className="mt-2 text-xs text-secondary">Succ {current.succ[index]}</div><div className="mt-1 text-sm font-semibold text-success">Rank {current.rank[index]}</div></div>)}</div>
        <p className="mb-0 mt-3 border-l-4 border-accent bg-background p-3 text-sm text-secondary">{current.note}</p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        同一轮必须读取旧快照并同步写新状态；原地依次更新会混入本轮新值。
      </figcaption>
    </figure>
  );
}

export function PaeSortScanSimulationDiagram() {
  const phases = [
    ["1", "Scan", "建三元组 (a,b,0)"],
    ["2", "Sort b", "按源地址对齐"],
    ["3", "Scan A", "装入 A[b]"],
    ["4", "Sort a", "按目标地址对齐"],
    ["5", "Scan A", "执行 A[a] op A[b]"],
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="grid gap-2 border border-border bg-elevated p-4 sm:grid-cols-5 sm:p-5">
        {phases.map(([number, action, note], index) => <div key={number} className="relative border border-border bg-background p-3"><div className="flex items-center gap-2"><span className="grid size-7 place-items-center border border-accent bg-accent/10 text-xs font-semibold text-accent">{number}</span><strong className="text-sm text-primary">{action}</strong></div><p className="mb-0 mt-3 text-xs leading-5 text-secondary">{note}</p>{index < phases.length - 1 && <span className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 bg-elevated px-1 text-accent sm:block">→</span>}</div>)}
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        两次排序把随机源地址与目标地址分别变成顺序对齐，三次扫描完成批量读取和更新。
      </figcaption>
    </figure>
  );
}

export function PaeIndependentSetReductionDiagram() {
  const removed = new Set([5, 4]);
  const reduced = [2, 1, 3] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="flex items-center gap-2 overflow-x-auto">{listOrder.map((id, index) => <div key={id} className="flex items-center"><div className={"grid size-11 place-items-center border text-sm font-semibold " + (removed.has(id) ? "border-danger bg-danger/10 text-danger" : "border-border bg-background text-primary")}>{id}</div>{index < listOrder.length - 1 && <span className="ml-2 text-muted">→</span>}</div>)}</div>
        <div className="my-3 border-l-4 border-accent bg-background p-3 text-sm text-secondary">删除独立集 I = {"{5,4}"}；其前驱2和1分别跨过被删节点，局部 Rank 从1累加到2。</div>
        <div className="flex items-center gap-2">{reduced.map((id, index) => <div key={id} className="flex items-center"><div className="grid size-11 place-items-center border border-success bg-success/10 text-sm font-semibold text-success">{id}</div>{index < reduced.length - 1 && <span className="ml-2 text-accent">→</span>}</div>)}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        独立集不含相邻节点，删除后每个被删节点的后继仍留在递归子问题中，便于回填 Rank。
      </figcaption>
    </figure>
  );
}

export function PaeDeterministicCoinMap() {
  const rows = [
    ["节点 id", "1", "2", "3", "4", "5"],
    ["初始 coin", "0", "1", "2", "3", "4"],
    ["压缩色", "2", "1", "0", "2", "1"],
    ["局部选择", "—", "—", "选", "—", "选"],
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[620px] border-collapse text-center text-sm">
          <tbody>{rows.map((row, rowIndex) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={index} className={"p-3 " + (index === 0 ? "text-left font-semibold text-primary" : rowIndex === 3 && cell === "选" ? "font-semibold text-success" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
        <p className="mb-0 mt-3 text-sm leading-6 text-secondary">真实算法从唯一 id 色开始，用与后继首个不同位的位置和该位值压缩到6色，再降到3色；最终取链上局部极小色。</p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        相邻颜色始终不同，局部极小节点不会相邻，并能保证独立集占常数比例。
      </figcaption>
    </figure>
  );
}
