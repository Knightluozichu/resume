"use client";

import { useState } from "react";

import { CodingInterviewLab } from "./official-lab";

const operationStates = [
  { op: "push 2", data: "[2#0]", maxima: "[2#0]", max: 2, note: "两个队列都加入首元素" },
  { op: "push 3", data: "[2#0, 3#1]", maxima: "[3#1]", max: 3, note: "3 从候选队尾淘汰 2" },
  { op: "push 4", data: "[2#0, 3#1, 4#2]", maxima: "[4#2]", max: 4, note: "4 淘汰旧候选 3" },
  { op: "push 2", data: "[2#0, 3#1, 4#2, 2#3]", maxima: "[4#2, 2#3]", max: 4, note: "较小新值排在候选队尾" },
  { op: "pop", data: "[3#1, 4#2, 2#3]", maxima: "[4#2, 2#3]", max: 4, note: "移除 2#0，它不是候选队首" },
  { op: "pop × 2", data: "[2#3]", maxima: "[2#3]", max: 2, note: "移除 4#2 时同步弹出最大候选" },
  { op: "push 6", data: "[2#3, 6#4]", maxima: "[6#4]", max: 6, note: "6 淘汰候选 2" },
  { op: "push 2,5", data: "[2#3, 6#4, 2#5, 5#6]", maxima: "[6#4, 5#6]", max: 6, note: "5 淘汰 2，但保留更大的 6" },
] as const;

const officialCases = [
  { label: "递增入队", fields: [["操作", "push 2,3,4"], ["最大值", "2→3→4"], ["候选", "每次只保留最新大值"], ["检查", "Test1-3"]] },
  { label: "较小值入队", fields: [["操作", "push 2"], ["数据", "2,3,4,2"], ["最大值", "4"], ["检查", "Test4"]] },
  { label: "连续出队", fields: [["操作", "pop 三次"], ["数据变化", "3,4,2 → 4,2 → 2"], ["最大值", "4,4,2"], ["检查", "Test5-7"]] },
  { label: "新最大值", fields: [["操作", "push 6,2,5"], ["候选", "6,5"], ["最大值", "6"], ["标签", "Test8,9,9"]] },
  { label: "最大值过期", fields: [["操作", "pop 三次"], ["数据变化", "6,2,5 → 2,5 → 5"], ["最大值", "6,5,5"], ["检查", "Test10-12"]] },
  { label: "尾部小值", fields: [["操作", "push 1"], ["数据", "5,1"], ["候选", "5,1"], ["最大值", "5"]] },
] as const;

export function QueueWithMaxDataDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="grid gap-4 border border-border bg-elevated p-4 sm:grid-cols-2 sm:p-5">
        <div className="border border-border bg-background p-4"><div className="text-sm font-semibold text-primary">数据队列</div><div className="mt-3 flex gap-2">{["2#0", "3#1", "4#2", "2#3"].map((item) => <div key={item} className="border border-border px-3 py-2 text-sm text-secondary">{item}</div>)}</div><div className="mt-3 text-xs text-muted">保存每一个元素，队首按 FIFO 弹出</div></div>
        <div className="border border-accent bg-accent/10 p-4"><div className="text-sm font-semibold text-primary">候选最大值队列</div><div className="mt-3 flex gap-2">{["4#2", "2#3"].map((item) => <div key={item} className="border border-accent px-3 py-2 text-sm font-semibold text-accent">{item}</div>)}</div><div className="mt-3 text-xs text-muted">值递减，队首 4#2 即当前最大值</div></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        两个队列都存值与唯一索引；候选队列只是数据队列的单调子序列。
      </figcaption>
    </figure>
  );
}

export function QueueWithMaxOperationLab() {
  const [cursor, setCursor] = useState(0);
  const state = operationStates[cursor];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">{operationStates.map((item, index) => <button key={index} type="button" onClick={() => setCursor(index)} aria-pressed={cursor === index} className={"h-11 border text-xs font-semibold " + (cursor === index ? "border-accent bg-accent/15 text-accent" : "border-border bg-background text-secondary")}>{item.op}</button>)}</div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3"><div className="border border-border bg-background p-3"><div className="text-xs text-muted">数据队列</div><div className="mt-1 font-mono text-sm text-primary">{state.data}</div></div><div className="border border-border bg-background p-3"><div className="text-xs text-muted">最大候选</div><div className="mt-1 font-mono text-sm text-primary">{state.maxima}</div></div><div className="border border-success bg-success/10 p-3"><div className="text-xs text-muted">max()</div><div className="mt-1 font-semibold text-success">{state.max}</div></div></div>
        <p className="mb-0 mt-3 border-l-4 border-accent bg-background p-3 text-sm text-secondary">{state.note}</p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        push 负责队尾支配淘汰，pop 只在两个队首索引相同时同步删除候选。
      </figcaption>
    </figure>
  );
}

export function QueueWithMaxDuplicateMap() {
  const rows = [
    ["push 5#0", "data: 5#0", "max: 5#0", "首个 5 是候选"],
    ["push 5#1", "data: 5#0,5#1", "max: 5#1", "新相等值淘汰旧候选"],
    ["pop 5#0", "data: 5#1", "max: 5#1", "值相同但索引不同，不删候选"],
    ["pop 5#1", "data: 空", "max: 空", "索引相同，同步删除"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5"><table className="w-full min-w-[780px] border-collapse text-left text-sm"><thead><tr className="border-b border-border">{["操作", "数据队列", "候选队列", "索引作用"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 3 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody></table></div><figcaption className="mt-2 text-center text-sm text-secondary">相等值场景证明pop必须比较索引身份，不能只比较数值。</figcaption></figure>
  );
}

export function QueueWithMaxContractDiagram() {
  const rows = [
    ["push_back", "数据队尾插入，候选队尾淘汰", "摊还 O(1)", "单次可能弹出多个"],
    ["pop_front", "数据队首删除，索引相等才删候选", "最坏 O(1)", "空队列抛异常"],
    ["max", "读取候选队首", "最坏 O(1)", "空队列抛异常"],
    ["候选顺序", "值严格递减、索引递增", "队首最大", "相等保留更新者"],
    ["索引", "currentIndex 自增 int", "区分元素身份", "长生命周期可能溢出"],
    ["泛型 T", "需要可复制且支持大于等于", "模板可复用", "比较器未参数化"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5"><table className="w-full min-w-[900px] border-collapse text-left text-sm"><thead><tr className="border-b border-border">{["操作或维度", "作者实现", "复杂度或结论", "边界"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 2 ? "font-semibold text-success" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody></table></div><figcaption className="mt-2 text-center text-sm text-secondary">max 与 pop 最坏常数；push 依靠每个候选只淘汰一次得到摊还常数。</figcaption></figure>
  );
}

export function QueueWithMaxOfficialCaseLab() {
  return <CodingInterviewLab cases={officialCases} caption="作者 main 连续执行 14 次最大值检查；其中 Test9 标签重复一次，但操作序列仍完整。" />;
}
