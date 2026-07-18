"use client";

import { useState } from "react";

import { CodingInterviewLab } from "./official-lab";

const circleNodes = [
  { value: 0, left: "50%", top: "8%" },
  { value: 1, left: "88%", top: "36%" },
  { value: 2, left: "73%", top: "82%" },
  { value: 3, left: "27%", top: "82%" },
  { value: 4, left: "12%", top: "36%" },
] as const;

const simulationStates = [
  { action: "开始", circle: "0 → 1 → 2 → 3 → 4 → 0", removed: "-", next: "0", note: "从 0 报数，0 本身算第 1 个" },
  { action: "删除 2", circle: "0 → 1 → 3 → 4 → 0", removed: "2", next: "3", note: "0、1、2 对应第 1、2、3 个" },
  { action: "删除 0", circle: "1 → 3 → 4 → 1", removed: "0", next: "1", note: "从 3 继续数 3、4、0" },
  { action: "删除 4", circle: "1 → 3 → 1", removed: "4", next: "1", note: "从 1 继续数 1、3、4" },
  { action: "删除 1", circle: "3", removed: "1", next: "3", note: "从 1 计数 1、3、1，最后剩 3" },
] as const;

const recurrenceStates = [
  { size: 1, before: "-", expression: "f(1,3)=0", result: 0 },
  { size: 2, before: "0", expression: "(0+3)%2", result: 1 },
  { size: 3, before: "1", expression: "(1+3)%3", result: 1 },
  { size: 4, before: "1", expression: "(1+3)%4", result: 0 },
  { size: 5, before: "0", expression: "(0+3)%5", result: 3 },
] as const;

const officialCases = [
  { label: "Test1", fields: [["n", "5"], ["m", "3"], ["删除序列", "2,0,4,1"], ["最后", "3"]] },
  { label: "Test2", fields: [["n", "5"], ["m", "2"], ["删除序列", "1,3,0,4"], ["最后", "2"]] },
  { label: "Test3", fields: [["n", "6"], ["m", "7"], ["公式结果", "4"], ["用途", "m 大于 n"]] },
  { label: "Test4", fields: [["n", "6"], ["m", "6"], ["公式结果", "3"], ["用途", "整圈计数"]] },
  { label: "Test5", fields: [["n", "0"], ["m", "0"], ["入口", "无效"], ["最后", "-1"]] },
  { label: "Test6", fields: [["n", "4000"], ["m", "997"], ["规模", "较大"], ["最后", "1027"]] },
] as const;

export function LastNumberCircleDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="relative mx-auto aspect-square w-full max-w-[360px] rounded-full border-2 border-border bg-background">
          {circleNodes.map((node) => (
            <div
              key={node.value}
              className={"absolute flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 text-base font-semibold " + (node.value === 2 ? "border-danger bg-danger/10 text-danger" : node.value === 0 ? "border-accent bg-accent/10 text-accent" : "border-border bg-elevated text-primary")}
              style={{ left: node.left, top: node.top }}
            >
              {node.value}
            </div>
          ))}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-xs text-muted">n=5, m=3</span>
            <span className="mt-1 font-semibold text-danger">首次删除 2</span>
            <span className="mt-1 text-xs text-secondary">下一轮从 3 开始</span>
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        从 0 开始把当前节点算第一个；每次删除后，从它的后继重新报数。
      </figcaption>
    </figure>
  );
}

export function LastNumberSimulationLab() {
  const [cursor, setCursor] = useState(0);
  const state = simulationStates[cursor];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-5 gap-2">
          {simulationStates.map((item, index) => (
            <button key={item.action} type="button" onClick={() => setCursor(index)} aria-pressed={cursor === index} className={"min-h-11 border px-1 text-xs font-semibold " + (cursor === index ? "border-accent bg-accent/15 text-accent" : "border-border bg-background text-secondary")}>
              {item.action}
            </button>
          ))}
        </div>
        <div className="mt-4 border border-border bg-background p-4 text-center font-mono text-sm text-primary">{state.circle}</div>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          <div className="border border-border bg-background p-3"><div className="text-xs text-muted">本轮删除</div><div className="mt-1 font-semibold text-danger">{state.removed}</div></div>
          <div className="border border-border bg-background p-3"><div className="text-xs text-muted">下轮起点</div><div className="mt-1 font-semibold text-accent">{state.next}</div></div>
          <div className="border border-border bg-background p-3"><div className="text-xs text-muted">计数说明</div><div className="mt-1 text-sm text-secondary">{state.note}</div></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        n=5、m=3 的链表模拟依次删除 2、0、4、1，最终剩下 3。
      </figcaption>
    </figure>
  );
}

export function LastNumberRelabelMap() {
  const rows = [
    ["新编号 0", "旧编号 3", "(0+3)%5", "删除 2 后的新起点"],
    ["新编号 1", "旧编号 4", "(1+3)%5", "顺时针下一项"],
    ["新编号 2", "旧编号 0", "(2+3)%5", "跨过环尾"],
    ["新编号 3", "旧编号 1", "(3+3)%5", "删除点之前"],
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[760px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["长度 4 子问题", "原长度 5 编号", "逆向映射", "含义"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 2 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        删除旧编号 2 后，把旧编号 3 当作新 0；新结果加 m 再模 n 即映回旧坐标。
      </figcaption>
    </figure>
  );
}

export function LastNumberRecurrenceLab() {
  const [cursor, setCursor] = useState(4);
  const state = recurrenceStates[cursor];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-5 gap-2">
          {recurrenceStates.map((item, index) => (
            <button key={item.size} type="button" onClick={() => setCursor(index)} aria-pressed={cursor === index} className={"h-11 border text-xs font-semibold " + (cursor === index ? "border-accent bg-accent/15 text-accent" : "border-border bg-background text-secondary")}>
              i={item.size}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          <div className="border border-border bg-background p-3"><div className="text-xs text-muted">较小规模结果</div><div className="mt-1 font-semibold text-primary">{state.before}</div></div>
          <div className="border border-accent bg-accent/10 p-3"><div className="text-xs text-muted">映回公式</div><div className="mt-1 font-mono text-sm text-accent">{state.expression}</div></div>
          <div className="border border-success bg-success/10 p-3"><div className="text-xs text-muted">当前规模结果</div><div className="mt-1 font-semibold text-success">{state.result}</div></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        m=3 时从 f(1,3)=0 逐步恢复到 f(5,3)=3，无需保存圆圈。
      </figcaption>
    </figure>
  );
}

export function LastNumberOfficialCaseLab() {
  return <CodingInterviewLab cases={officialCases} caption="作者用同一期望值同时校验链表模拟与数学递推，覆盖普通、m 大于 n、无效和较大规模输入。" />;
}
