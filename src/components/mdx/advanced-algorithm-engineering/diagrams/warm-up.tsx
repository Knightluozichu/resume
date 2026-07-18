"use client";

import { useState } from "react";

const stockDiffs = [4, -6, 3, 1, 3, -2, 3, -4, 1, -9, 6] as const;
const kadaneRows = [
  { s: 1, value: 4, begin: 1, candidate: 4, best: 4, action: "保留" },
  { s: 2, value: -6, begin: 1, candidate: -2, best: 4, action: "归零，下一段从 3 开始" },
  { s: 3, value: 3, begin: 3, candidate: 3, best: 4, action: "保留" },
  { s: 4, value: 1, begin: 3, candidate: 4, best: 4, action: "保留" },
  { s: 5, value: 3, begin: 3, candidate: 7, best: 7, action: "更新最优" },
  { s: 6, value: -2, begin: 3, candidate: 5, best: 7, action: "保留" },
  { s: 7, value: 3, begin: 3, candidate: 8, best: 8, action: "更新为 [3,7]" },
  { s: 8, value: -4, begin: 3, candidate: 4, best: 8, action: "保留" },
  { s: 9, value: 1, begin: 3, candidate: 5, best: 8, action: "保留" },
  { s: 10, value: -9, begin: 3, candidate: -4, best: 8, action: "归零，下一段从 11 开始" },
  { s: 11, value: 6, begin: 11, candidate: 6, best: 8, action: "结束" },
] as const;

export function PaeStockAbstractionDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-11 gap-1">
          {stockDiffs.map((value, index) => {
            const optimal = index >= 2 && index <= 6;
            return (
              <div key={index} className={"min-w-0 border px-1 py-3 text-center " + (optimal ? "border-success bg-success/15" : "border-border bg-background")}>
                <div className="text-[10px] text-muted">D{index + 1}</div>
                <div className={"mt-1 text-xs font-semibold sm:text-sm " + (value > 0 ? "text-success" : "text-danger")}>{value > 0 ? "+" : ""}{value}</div>
              </div>
            );
          })}
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          <div className="border border-border bg-background p-3 text-sm text-secondary">买入日 <strong className="text-primary">b = 3</strong></div>
          <div className="border border-success bg-success/10 p-3 text-sm text-secondary">最优收益 <strong className="text-success">8</strong></div>
          <div className="border border-border bg-background p-3 text-sm text-secondary">卖出日 <strong className="text-primary">s = 7</strong></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        股价起点不影响决策；逐日差分数组中最大和连续片段就是最佳买卖窗口。
      </figcaption>
    </figure>
  );
}

export function PaeComplexityLadderDiagram() {
  const levels = [
    ["三次方", "枚举 b、s，再重算区间和", "Theta(n^3)", "重复读取同一区间"],
    ["二次方", "固定 b，向右增量累加", "Theta(n^2)", "消除最内层重算"],
    ["线性 A", "负候选归零并重启", "Theta(n)", "利用最优片段结构"],
    ["线性 B", "当前前缀减历史最小前缀", "Theta(n)", "代数分解并滚动维护"],
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="grid gap-2 border border-border bg-elevated p-4 sm:grid-cols-4 sm:p-5">
        {levels.map(([name, method, cost, insight], index) => (
          <div key={name} className={"border p-3 " + (index === levels.length - 1 ? "border-success bg-success/10" : "border-border bg-background")}>
            <div className="flex items-center justify-between gap-2"><strong className="text-sm text-primary">{name}</strong><span className="text-xs font-semibold text-accent">{cost}</span></div>
            <p className="mb-0 mt-3 text-xs leading-5 text-secondary">{method}</p>
            <p className="mb-0 mt-2 border-t border-border pt-2 text-xs text-muted">{insight}</p>
          </div>
        ))}
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        每次改进都保留正确性，只消除可证明的重复工作或不可能成为最优的候选。
      </figcaption>
    </figure>
  );
}

export function PaeKadaneTraceLab() {
  const [cursor, setCursor] = useState(6);
  const row = kadaneRows[cursor];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-11 gap-1">
          {stockDiffs.map((value, index) => (
            <button key={index} type="button" onClick={() => setCursor(index)} aria-label={"查看第 " + (index + 1) + " 天"} aria-pressed={cursor === index} className={"h-11 min-w-0 border text-xs font-semibold " + (cursor === index ? "border-accent bg-accent/15 text-accent" : "border-border bg-background text-secondary")}>
              {value > 0 ? "+" : ""}{value}
            </button>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
          {[
            ["扫描位置", String(row.s)],
            ["当前值", String(row.value)],
            ["候选起点", String(row.begin)],
            ["候选和", String(row.candidate)],
            ["历史最优", String(row.best)],
          ].map(([label, value], index) => (
            <div key={label} className={"border p-3 " + (index === 4 ? "border-success bg-success/10" : "border-border bg-background")}>
              <div className="text-xs text-muted">{label}</div>
              <div className="mt-1 text-sm font-semibold text-primary">{value}</div>
            </div>
          ))}
        </div>
        <p className="mb-0 mt-3 border-l-4 border-accent bg-background p-3 text-sm text-secondary">{row.action}</p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        逐项点击观察：先比较最优，再在候选和为负时丢弃整段，才能正确处理全负数组。
      </figcaption>
    </figure>
  );
}

export function PaePrefixMinimumLab() {
  const prefix = [0, 4, -2, 1, 2, 5, 3, 6, 2, 3, -6, 0] as const;
  const minima = [0, 0, -2, -2, -2, -2, -2, -2, -2, -2, -6] as const;
  const [sellingDay, setSellingDay] = useState(7);
  const minPrefix = minima[sellingDay - 1];
  const gain = prefix[sellingDay] - minPrefix;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary" htmlFor="pae-selling-day">固定卖出日 s = {sellingDay}</label>
        <input id="pae-selling-day" className="mt-3 w-full accent-current" type="range" min="1" max="11" value={sellingDay} onChange={(event) => setSellingDay(Number(event.target.value))} />
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          <div className="border border-border bg-background p-3"><div className="text-xs text-muted">当前前缀 P[s]</div><div className="mt-1 font-semibold text-primary">{prefix[sellingDay]}</div></div>
          <div className="border border-border bg-background p-3"><div className="text-xs text-muted">此前最小前缀</div><div className="mt-1 font-semibold text-accent">{minPrefix}</div></div>
          <div className="border border-success bg-success/10 p-3"><div className="text-xs text-muted">最佳结束于 s 的区间和</div><div className="mt-1 font-semibold text-success">{gain}</div></div>
        </div>
        <p className="mb-0 mt-3 text-sm leading-6 text-secondary">从 P[s] 中减去 s 之前最小的 P[b - 1]，就等价于选择最佳起点 b。</p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        历史最小前缀可随扫描滚动维护，因此无需真的保存 P 与 M 两个数组。
      </figcaption>
    </figure>
  );
}

export function PaeDensityReductionDiagram() {
  const dna = [
    ["G", 1, 0.4],
    ["A", 0, -0.6],
    ["C", 1, 0.4],
    ["T", 0, -0.6],
    ["G", 1, 0.4],
    ["C", 1, 0.4],
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-6 gap-1">{dna.map(([base, bit, shifted], index) => <div key={index} className="border border-border bg-background p-2 text-center"><div className="font-semibold text-primary">{base}</div><div className="mt-2 text-xs text-muted">{bit}</div><div className={"mt-1 text-xs font-semibold " + (shifted > 0 ? "text-success" : "text-danger")}>{shifted > 0 ? "+" : ""}{shifted}</div></div>)}</div>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          <div className="border border-border bg-background p-3 text-xs leading-5 text-secondary">密度至少 0.6</div>
          <div className="border border-accent bg-accent/10 p-3 text-center text-sm font-semibold text-accent">每项减 0.6</div>
          <div className="border border-success bg-success/10 p-3 text-xs leading-5 text-secondary">变换后片段和至少 0</div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        平均密度约束可化为平移后区间和约束，但“最长”“最短”和长度范围会改变问题难度。
      </figcaption>
    </figure>
  );
}
