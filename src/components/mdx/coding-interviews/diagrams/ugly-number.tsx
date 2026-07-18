"use client";

import { useState } from "react";

import { CodingInterviewLab } from "./official-lab";

const mergeStates = [
  { index: 2, sequence: "1", p2: 0, p3: 0, p5: 0, c2: 2, c3: 3, c5: 5, next: 2, moved: "p2" },
  { index: 3, sequence: "1, 2", p2: 1, p3: 0, p5: 0, c2: 4, c3: 3, c5: 5, next: 3, moved: "p3" },
  { index: 4, sequence: "1, 2, 3", p2: 1, p3: 1, p5: 0, c2: 4, c3: 6, c5: 5, next: 4, moved: "p2" },
  { index: 5, sequence: "1, 2, 3, 4", p2: 2, p3: 1, p5: 0, c2: 6, c3: 6, c5: 5, next: 5, moved: "p5" },
  { index: 6, sequence: "1, 2, 3, 4, 5", p2: 2, p3: 1, p5: 1, c2: 6, c3: 6, c5: 10, next: 6, moved: "p2、p3" },
  { index: 7, sequence: "1, 2, 3, 4, 5, 6", p2: 3, p3: 2, p5: 1, c2: 8, c3: 9, c5: 10, next: 8, moved: "p2" },
  { index: 8, sequence: "1, 2, 3, 4, 5, 6, 8", p2: 4, p3: 2, p5: 1, c2: 10, c3: 9, c5: 10, next: 9, moved: "p3" },
  { index: 9, sequence: "1, 2, 3, 4, 5, 6, 8, 9", p2: 4, p3: 3, p5: 1, c2: 10, c3: 12, c5: 10, next: 10, moved: "p2、p5" },
  { index: 10, sequence: "1, 2, 3, 4, 5, 6, 8, 9, 10", p2: 5, p3: 3, p5: 2, c2: 12, c3: 12, c5: 15, next: 12, moved: "p2、p3" },
  { index: 11, sequence: "1, 2, 3, 4, 5, 6, 8, 9, 10, 12", p2: 6, p3: 4, p5: 2, c2: 16, c3: 15, c5: 15, next: 15, moved: "p3、p5" },
  { index: 12, sequence: "1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 15", p2: 6, p3: 5, p5: 3, c2: 16, c3: 18, c5: 20, next: 16, moved: "p2" },
  { index: 13, sequence: "1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 15, 16", p2: 7, p3: 5, p5: 3, c2: 18, c3: 18, c5: 20, next: 18, moved: "p2、p3" },
  { index: 14, sequence: "1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 15, 16, 18", p2: 8, p3: 6, p5: 3, c2: 20, c3: 24, c5: 20, next: 20, moved: "p2、p5" },
  { index: 15, sequence: "1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 15, 16, 18, 20", p2: 9, p3: 6, p5: 4, c2: 24, c3: 24, c5: 25, next: 24, moved: "p2、p3" },
] as const;

const officialCases = [
  { label: "第1个", fields: [["index", "1"], ["期望", "1"], ["语义", "约定基例"], ["两解法", "均执行"]] },
  { label: "第2个", fields: [["index", "2"], ["期望", "2"], ["因子", "2"], ["两解法", "均执行"]] },
  { label: "第3个", fields: [["index", "3"], ["期望", "3"], ["因子", "3"], ["两解法", "均执行"]] },
  { label: "第4个", fields: [["index", "4"], ["期望", "4"], ["分解", "2×2"], ["两解法", "均执行"]] },
  { label: "第5个", fields: [["index", "5"], ["期望", "5"], ["因子", "5"], ["两解法", "均执行"]] },
  { label: "第6个", fields: [["index", "6"], ["期望", "6"], ["分解", "2×3"], ["两解法", "均执行"]] },
  { label: "第7个", fields: [["index", "7"], ["期望", "8"], ["跳过", "7"], ["两解法", "均执行"]] },
  { label: "第8个", fields: [["index", "8"], ["期望", "9"], ["分解", "3×3"], ["两解法", "均执行"]] },
  { label: "第9个", fields: [["index", "9"], ["期望", "10"], ["分解", "2×5"], ["两解法", "均执行"]] },
  { label: "第10个", fields: [["index", "10"], ["期望", "12"], ["分解", "2²×3"], ["两解法", "均执行"]] },
  { label: "第11个", fields: [["index", "11"], ["期望", "15"], ["分解", "3×5"], ["两解法", "均执行"]] },
  { label: "第1500个", fields: [["index", "1500"], ["期望", "859963392"], ["算法1", "极慢"], ["算法2", "线性生成"]] },
  { label: "无效下标", fields: [["index", "0"], ["期望", "0"], ["入口", "立即返回"], ["IsUgly", "不会收到0"]] },
] as const;

export function UglyFactorizationDiagram() {
  const values = [
    { value: "1", chain: "约定为第1个", result: "丑数", tone: "success" },
    { value: "6", chain: "6 ÷ 2 = 3；3 ÷ 3 = 1", result: "丑数", tone: "success" },
    { value: "8", chain: "8 ÷ 2 ÷ 2 ÷ 2 = 1", result: "丑数", tone: "success" },
    { value: "14", chain: "14 ÷ 2 = 7", result: "含因子7", tone: "warning" },
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {values.map((item) => (
          <div key={item.value} className="border border-border bg-elevated p-4">
            <div className="text-2xl font-semibold text-primary">{item.value}</div>
            <div className="mt-3 min-h-[44px] text-sm text-secondary">{item.chain}</div>
            <div className={"mt-3 border-t border-border pt-3 text-sm font-semibold " + (item.tone === "success" ? "text-success" : "text-warning")}>{item.result}</div>
          </div>
        ))}
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        反复除尽2、3、5后若恰好剩1，则原数没有其他质因子；1由题目单独约定为丑数。
      </figcaption>
    </figure>
  );
}

export function UglyCandidateMergeLab() {
  const [cursor, setCursor] = useState(4);
  const state = mergeStates[cursor];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="block text-sm font-semibold text-primary" htmlFor="ugly-index">选择要生成的序号：{state.index}</label>
        <input id="ugly-index" className="mt-3 w-full accent-[var(--accent)]" type="range" min="0" max={mergeStates.length - 1} value={cursor} onChange={(event) => setCursor(Number(event.target.value))} />
        <div className="mt-4 border border-border bg-background p-3 text-sm text-secondary">已生成：<strong className="text-primary">{state.sequence}</strong></div>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {[["2倍流", state.p2, state.c2], ["3倍流", state.p3, state.c3], ["5倍流", state.p5, state.c5]].map(([label, pointer, candidate]) => (
            <div key={String(label)} className={"border p-3 " + (candidate === state.next ? "border-accent bg-accent/10" : "border-border bg-background")}>
              <div className="text-xs text-muted">{label}，指针 {pointer}</div>
              <div className="mt-1 text-xl font-semibold text-primary">{candidate}</div>
            </div>
          ))}
        </div>
        <div className="mt-3 text-sm text-secondary">本轮取最小值 <strong className="text-success">{state.next}</strong>，随后推进：<strong className="text-primary">{state.moved}</strong></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        三个候选相等时必须同时推进对应指针，才能保持输出严格递增。
      </figcaption>
    </figure>
  );
}

export function UglyThreeStreamMap() {
  const streams = [
    { label: "2 × U", values: "2, 4, 6, 8, 10, 12, 16, 18, 20, 24, 30", color: "text-accent" },
    { label: "3 × U", values: "3, 6, 9, 12, 15, 18, 24, 27, 30", color: "text-success" },
    { label: "5 × U", values: "5, 10, 15, 20, 25, 30", color: "text-warning" },
    { label: "有序合并", values: "1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 15, 16, 18, 20, 24", color: "text-primary" },
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="space-y-3 border border-border bg-elevated p-4 sm:p-5">
        {streams.map((stream, index) => (
          <div key={stream.label} className={"grid gap-2 border border-border bg-background p-3 sm:grid-cols-[120px_1fr] " + (index === streams.length - 1 ? "border-l-4 border-l-accent" : "")}>
            <div className={"font-semibold " + stream.color}>{stream.label}</div>
            <div className="text-sm text-secondary">{stream.values}</div>
          </div>
        ))}
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        每个非1丑数必来自已有丑数乘2、3或5；算法2是在去重合并三条递增流。
      </figcaption>
    </figure>
  );
}

export function UglyApproachComparisonDiagram() {
  const rows = [
    ["候选来源", "自然数1、2、3…", "已确认丑数乘2、3、5"],
    ["判定动作", "反复除尽三个因子", "取三路最小候选"],
    ["无效工作", "检查大量非丑数", "只生成丑数候选"],
    ["第1500个", "扫描到859963392", "生成1500项"],
    ["时间尺度", "依赖答案数值", "随index线性"],
    ["辅助空间", "常数", "保存index个丑数"],
    ["零边界", "入口index为0直接返回", "入口index为0直接返回"],
    ["溢出风险", "number持续递增", "候选乘法可能溢出"],
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[860px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["维度", "算法1逐个判断", "算法2按序生成"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 1 ? "text-warning" : index === 2 ? "font-semibold text-success" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        算法2以O(index)内存换掉了对庞大非丑数区间的扫描，是本题的时间优化核心。
      </figcaption>
    </figure>
  );
}

export function UglyNumberOfficialCaseLab() {
  return <CodingInterviewLab cases={officialCases} caption="作者main执行13次Test；每次都会先跑逐数判断法，再跑三指针生成法。" />;
}
