"use client";

import { useState } from "react";

import { CodingInterviewLab } from "./official-lab";

const streamStates = [
  { label: "空", value: "—", lower: [] as number[], upper: [] as number[], median: "异常", action: "还没有数字，GetMedian抛出异常" },
  { label: "+5", value: "5", lower: [], upper: [5], median: "5", action: "总数原为偶数，5最终进入上半最小堆" },
  { label: "+2", value: "2", lower: [2], upper: [5], median: "3.5", action: "总数原为奇数，2进入下半最大堆" },
  { label: "+3", value: "3", lower: [2], upper: [3, 5], median: "3", action: "两堆原本等大，3进入上半堆" },
  { label: "+4", value: "4", lower: [3, 2], upper: [4, 5], median: "3.5", action: "4先入上半堆，再把边界3转移到下半堆" },
  { label: "+1", value: "1", lower: [2, 1], upper: [3, 4, 5], median: "3", action: "1先入下半堆，再把边界3转移到上半堆" },
  { label: "+6", value: "6", lower: [3, 2, 1], upper: [4, 5, 6], median: "3.5", action: "6先入上半堆，再把边界3转移到下半堆" },
  { label: "+7", value: "7", lower: [3, 2, 1], upper: [4, 5, 6, 7], median: "4", action: "两堆原本等大，7留在上半堆" },
  { label: "+0", value: "0", lower: [3, 2, 1, 0], upper: [4, 5, 6, 7], median: "3.5", action: "0进入下半堆，恢复两堆等大" },
  { label: "+8", value: "8", lower: [3, 2, 1, 0], upper: [4, 5, 6, 7, 8], median: "4", action: "8进入上半堆，上半堆再次多一个" },
] as const;

const officialCases = streamStates.map((state, index) => ({
  label: index === 0 ? "空流" : state.label,
  fields: [
    ["累计输入", index === 0 ? "无" : "5,2,3,4,1,6,7,0,8".split(",").slice(0, index).join(",")],
    ["下半最大堆", state.lower.length === 0 ? "空" : state.lower.join(",")],
    ["上半最小堆", state.upper.length === 0 ? "空" : state.upper.join(",")],
    ["期望中位数", state.median],
  ],
})) as ReadonlyArray<{ label: string; fields: ReadonlyArray<readonly [string, string]> }>;

export function StreamMedianHeapInvariantDiagram() {
  const rows = [
    ["max向量 / 最大堆", "保存较小一半", "max[0]是下半最大值", "数量等于min或少1"],
    ["min向量 / 最小堆", "保存较大一半", "min[0]是上半最小值", "数量等于max或多1"],
    ["有序边界", "所有max项不大于min项", "max[0]不大于min[0]", "根节点夹住中位数"],
    ["奇数总量", "min多一个", "中位数为min[0]", "作者固定的配额方向"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[900px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["结构", "保存范围", "根节点", "数量规则"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 2 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        作者变量名按堆类型命名：min是上半最小堆，max是下半最大堆。
      </figcaption>
    </figure>
  );
}

export function StreamMedianInsertionLab() {
  const [cursor, setCursor] = useState(streamStates.length - 1);
  const state = streamStates[cursor];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-3">
          <div className="border border-border bg-background p-3">
            <div className="text-xs text-muted">下半最大堆 max</div>
            <div className="mt-3 grid min-h-11 grid-cols-4 gap-1.5">
              {Array.from({ length: 4 }, (_, index) => <div key={index} className="flex h-10 items-center justify-center border border-border text-sm font-semibold text-primary">{state.lower[index] ?? "·"}</div>)}
            </div>
          </div>
          <div className="border border-border bg-background p-3">
            <div className="text-xs text-muted">上半最小堆 min</div>
            <div className="mt-3 grid min-h-11 grid-cols-5 gap-1.5">
              {Array.from({ length: 5 }, (_, index) => <div key={index} className="flex h-10 items-center justify-center border border-border text-sm font-semibold text-primary">{state.upper[index] ?? "·"}</div>)}
            </div>
          </div>
        </div>

        <div className="mt-4 grid min-h-[76px] grid-cols-3 gap-3 border-y border-border py-3 text-center">
          <div><div className="text-xs text-muted">本步</div><div className="mt-1 font-semibold text-primary">{state.label}</div></div>
          <div><div className="text-xs text-muted">插入值</div><div className="mt-1 font-semibold text-accent">{state.value}</div></div>
          <div><div className="text-xs text-muted">中位数</div><div className="mt-1 font-semibold text-success">{state.median}</div></div>
        </div>

        <div className="mt-4 flex min-h-11 items-center justify-between gap-3">
          <p className="m-0 text-sm text-secondary">{state.action}</p>
          <div className="flex shrink-0 items-center gap-1">
            <button type="button" title="上一步" aria-label="上一步" disabled={cursor === 0} onClick={() => setCursor((value) => Math.max(0, value - 1))} className="inline-flex size-9 items-center justify-center border border-border text-secondary disabled:opacity-35"><span aria-hidden="true" className="text-lg leading-none">←</span></button>
            <button type="button" title="重置" aria-label="重置" onClick={() => setCursor(0)} className="inline-flex size-9 items-center justify-center border border-border text-secondary"><span aria-hidden="true" className="text-lg leading-none">↻</span></button>
            <button type="button" title="下一步" aria-label="下一步" disabled={cursor === streamStates.length - 1} onClick={() => setCursor((value) => Math.min(streamStates.length - 1, value + 1))} className="inline-flex size-9 items-center justify-center border border-border text-secondary disabled:opacity-35"><span aria-hidden="true" className="text-lg leading-none">→</span></button>
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        回放作者完整插入序列；格内按数值边界排列，根节点分别位于两边最靠近中位数的位置。
      </figcaption>
    </figure>
  );
}

export function StreamMedianRoutingDiagram() {
  const rows = [
    ["插入前总数为偶数", "新值最终进入min", "若小于max根，先入max再把max根移到min", "min比max多1"],
    ["插入前总数为奇数", "新值最终进入max", "若大于min根，先入min再把min根移到max", "两堆重新等大"],
    ["值落在正确半区", "直接push_heap", "不需要跨堆转移", "边界与配额同时成立"],
    ["值落在错误半区", "先放入其应属堆", "弹出该堆边界到目标堆", "一次转移完成修复"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[980px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["插入状态", "配额目标", "越界处理", "插入后"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 2 ? "font-semibold text-success" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        作者不是“先随便入堆再反复平衡”，而是由奇偶决定目标堆，必要时经另一堆转移边界值。
      </figcaption>
    </figure>
  );
}

export function StreamMedianContractDiagram() {
  const rows = [
    ["空流查询", "抛std::exception", "标准库构造在不同编译器不兼容", "现代接口可返回optional"],
    ["奇数个double", "返回min[0]", "上半最小堆固定多一个", "O(1)查询"],
    ["偶数个double", "(min[0]+max[0])/2", "测试保留小数", "大整数需防加法溢出"],
    ["模板实例为int", "整数除法截断", "类名虽泛型，结果语义不泛化", "单独定义中位数类型"],
    ["并发插入/查询", "源码无同步", "vector堆会被并发写破坏", "外部锁或快照"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[960px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["场景", "作者行为", "边界", "工程策略"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 2 ? "font-semibold text-warning" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        作者以double完成官方测试；模板换成int或并发服务后，需要重新定义返回与同步契约。
      </figcaption>
    </figure>
  );
}

export function StreamMedianOfficialCaseLab() {
  return <CodingInterviewLab cases={officialCases} caption="切换空流和9次插入后的作者检查点，核对两堆边界、数量与期望中位数。" />;
}
