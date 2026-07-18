"use client";

import { useState } from "react";

import { CodingInterviewLab } from "./official-lab";

const gapCases = [
  { label: "一张王刚好补齐", cards: "0,3,2,6,4", sorted: "0 | 2,3,4,6", zeros: 1, gaps: "0+0+1 = 1", duplicate: "无", result: "顺子" },
  { label: "一张王不够", cards: "0,3,1,6,4", sorted: "0 | 1,3,4,6", zeros: 1, gaps: "1+0+1 = 2", duplicate: "无", result: "失败" },
  { label: "非零对子", cards: "1,0,0,1,0", sorted: "0,0,0 | 1,1", zeros: 3, gaps: "无需继续", duplicate: "1 重复", result: "失败" },
  { label: "全是大小王", cards: "0,0,0,0,0", sorted: "0,0,0,0,0", zeros: 5, gaps: "0", duplicate: "无非零牌", result: "顺子" },
] as const;

const officialCases = [
  { label: "Test1", fields: [["输入", "1,3,2,5,4"], ["0 数量", "0"], ["空缺", "0"], ["期望", "true"]] },
  { label: "Test2", fields: [["输入", "1,3,2,6,4"], ["0 数量", "0"], ["空缺", "1"], ["期望", "false"]] },
  { label: "Test3", fields: [["输入", "0,3,2,6,4"], ["0 数量", "1"], ["空缺", "1"], ["期望", "true"]] },
  { label: "Test4", fields: [["输入", "0,3,1,6,4"], ["0 数量", "1"], ["空缺", "2"], ["期望", "false"]] },
  { label: "Test5", fields: [["输入", "1,3,0,5,0"], ["0 数量", "2"], ["空缺", "2"], ["期望", "true"]] },
  { label: "Test6", fields: [["输入", "1,3,0,7,0"], ["0 数量", "2"], ["空缺", "4"], ["期望", "false"]] },
  { label: "Test7", fields: [["输入", "1,0,0,5,0"], ["0 数量", "3"], ["空缺", "3"], ["期望", "true"]] },
  { label: "Test8", fields: [["输入", "1,0,0,7,0"], ["0 数量", "3"], ["空缺", "5"], ["期望", "false"]] },
  { label: "Test9", fields: [["输入", "3,0,0,0,0"], ["非零牌", "3"], ["0 数量", "4"], ["期望", "true"]] },
  { label: "Test10", fields: [["输入", "0,0,0,0,0"], ["非零牌", "无"], ["0 数量", "5"], ["期望", "true"]] },
  { label: "Test11", fields: [["输入", "1,0,0,1,0"], ["重复", "1"], ["0 数量", "3"], ["期望", "false"]] },
  { label: "Test12", fields: [["输入", "nullptr, 0"], ["入口", "拒绝"], ["排序", "不执行"], ["期望", "false"]] },
] as const;

export function ContinuousCardsSortDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
          <div className="border border-border bg-background p-4">
            <div className="text-xs text-muted">原始抽牌顺序</div>
            <div className="mt-3 grid grid-cols-5 gap-2">
              {[0, 3, 2, 6, 4].map((card, index) => <div key={index} className={"flex h-14 items-center justify-center border text-lg font-semibold " + (card === 0 ? "border-success bg-success/10 text-success" : "border-border text-primary")}>{card}</div>)}
            </div>
          </div>
          <div className="text-center text-xl text-accent">→</div>
          <div className="border border-accent bg-accent/10 p-4">
            <div className="text-xs text-muted">排序并分离 0</div>
            <div className="mt-3 grid grid-cols-5 gap-2">
              {[0, 2, 3, 4, 6].map((card, index) => <div key={index} className={"flex h-14 items-center justify-center border text-lg font-semibold " + (card === 0 ? "border-success bg-success/10 text-success" : "border-accent bg-background text-primary")}>{card}</div>)}
            </div>
          </div>
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          <div className="border border-border bg-background p-3 text-sm text-secondary">大小王：1 张</div>
          <div className="border border-border bg-background p-3 text-sm text-secondary">非零空缺：缺少 5</div>
          <div className="border border-success bg-success/10 p-3 text-sm font-semibold text-success">1 张王恰好补齐</div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        排序把所有 0 聚到左侧，也让重复牌与相邻空缺能够一次线性扫描发现。
      </figcaption>
    </figure>
  );
}

export function ContinuousCardsGapLab() {
  const [cursor, setCursor] = useState(0);
  const state = gapCases[cursor];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
          {gapCases.map((item, index) => (
            <button key={item.label} type="button" onClick={() => setCursor(index)} aria-pressed={cursor === index} className={"min-h-12 border px-2 text-xs font-semibold " + (cursor === index ? "border-accent bg-accent/15 text-accent" : "border-border bg-background text-secondary")}>
              {item.label}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {[["输入", state.cards], ["排序", state.sorted], ["0 数量", String(state.zeros)], ["空缺", state.gaps], ["重复", state.duplicate]].map(([label, value]) => <div key={label} className="border border-border bg-background p-3"><div className="text-xs text-muted">{label}</div><div className="mt-1 text-sm font-semibold text-primary">{value}</div></div>)}
        </div>
        <p className={"mb-0 mt-4 border-l-4 p-3 text-sm font-semibold " + (state.result === "顺子" ? "border-success bg-success/10 text-success" : "border-danger bg-danger/10 text-danger")}>
          判定：{state.result}
        </p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        选择官方代表用例，观察替代预算、相邻空缺与重复牌三者的判定顺序。
      </figcaption>
    </figure>
  );
}

export function ContinuousCardsJokerBudgetMap() {
  const rows = [
    ["0,2,3,4,6", "1", "缺 5，共 1", "刚好补齐", "true"],
    ["0,1,3,4,6", "1", "缺 2、5，共 2", "预算不足", "false"],
    ["0,0,1,3,5", "2", "缺 2、4，共 2", "刚好补齐", "true"],
    ["0,0,0,1,5", "3", "缺 2、3、4，共 3", "刚好补齐", "true"],
    ["0,0,0,1,7", "3", "缺 2..6，共 5", "预算不足", "false"],
    ["0,0,0,1,1", "3", "非零牌重复", "不能用王消除对子", "false"],
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[880px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["排序结果", "王的数量", "需要填的空缺", "预算结论", "结果"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 4 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        0 只能填缺失点数，不能让两张相同非零牌同时出现在一条顺子中。
      </figcaption>
    </figure>
  );
}

export function ContinuousCardsContractDiagram() {
  const rows = [
    ["牌面映射", "A=1，2..10，J=11，Q=12，K=13", "0 代表大小王", "不支持 A 同时作 14"],
    ["作者长度", "指针非空且 length 大于 0", "可判断任意正长度", "题面实际固定抽 5 张"],
    ["输入副作用", "qsort 原地排序", "调用后顺序改变", "现代接口可复制后排序"],
    ["重复规则", "相邻非零值相同立即 false", "王不能消除对子", "全 0 没有非零重复"],
    ["空缺规则", "所有相邻差减 1 后求和", "空缺不超过 0 数量", "剩余王可补区间两端"],
    ["比较器", "用两个 int 相减", "普通牌面安全", "通用整数可能溢出"],
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[940px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["维度", "作者实现", "结论", "工程边界"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 2 ? "font-semibold text-success" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        算法核心适用于任意长度，但固定五张牌、合法牌面和是否保留输入顺序属于接口契约。
      </figcaption>
    </figure>
  );
}

export function ContinuousCardsOfficialCaseLab() {
  return <CodingInterviewLab cases={officialCases} caption="作者 12 个测试覆盖无王、多王、预算刚好与不足、单非零、全王、对子以及空指针。" />;
}
