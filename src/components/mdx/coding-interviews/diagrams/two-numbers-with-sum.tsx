"use client";

import { useState } from "react";

import { CodingInterviewLab } from "./official-lab";

const traceStates = [
  { range: "[0, 5]", left: 1, right: 15, sum: 16, relation: "大于 15", action: "右指针左移到 11" },
  { range: "[0, 4]", left: 1, right: 11, sum: 12, relation: "小于 15", action: "左指针右移到 2" },
  { range: "[1, 4]", left: 2, right: 11, sum: 13, relation: "小于 15", action: "左指针右移到 4" },
  { range: "[2, 4]", left: 4, right: 11, sum: 15, relation: "等于 15", action: "返回 4 与 11" },
] as const;

const officialCases = [
  { label: "答案在中间", fields: [["数组", "1,2,4,7,11,15"], ["目标", "15"], ["作者结果", "4 与 11"], ["期望", "true"]] },
  { label: "答案在两端", fields: [["数组", "1,2,4,7,11,16"], ["目标", "17"], ["作者结果", "1 与 16"], ["期望", "true"]] },
  { label: "不存在答案", fields: [["数组", "1,2,4,7,11,16"], ["目标", "10"], ["指针", "最终相遇"], ["期望", "false"]] },
  { label: "空输入", fields: [["数组", "nullptr"], ["长度", "0"], ["入口", "长度先拒绝"], ["期望", "false"]] },
] as const;

export function TwoNumbersWithSumPointerDiagram() {
  const values = [1, 2, 4, 7, 11, 15];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-6 gap-2">{values.map((value, index) => <div key={value} className={"relative flex min-h-[82px] flex-col items-center justify-center border " + (index === 0 || index === 5 ? "border-accent bg-accent/10" : "border-border bg-background")}><span className="text-lg font-semibold text-primary">{value}</span><span className="mt-1 text-xs text-muted">下标 {index}</span>{index === 0 && <span className="absolute -bottom-2 bg-accent px-1 text-[10px] font-semibold text-white">behind</span>}{index === 5 && <span className="absolute -bottom-2 bg-accent px-1 text-[10px] font-semibold text-white">ahead</span>}</div>)}</div>
        <div className="mt-5 grid gap-2 sm:grid-cols-3"><div className="border border-border bg-background p-3 text-sm text-secondary">当前和：1 + 15 = 16</div><div className="border border-warning bg-warning/10 p-3 text-sm font-semibold text-warning">16 大于目标 15</div><div className="border border-accent bg-accent/10 p-3 text-sm font-semibold text-accent">最大端左移</div></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        首尾双指针夹住尚未排除的搜索区间；当前和偏大时只能减小右端。
      </figcaption>
    </figure>
  );
}

export function TwoNumbersWithSumTraceLab() {
  const [cursor, setCursor] = useState(0);
  const state = traceStates[cursor];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-4 gap-2">{traceStates.map((item, index) => <button key={item.range} type="button" onClick={() => setCursor(index)} aria-pressed={cursor === index} className={"h-11 border text-sm font-semibold " + (cursor === index ? "border-accent bg-accent/15 text-accent" : "border-border bg-background text-secondary")}>第 {index + 1} 步</button>)}</div>
        <div className="mt-4 grid gap-2 sm:grid-cols-5"><div className="border border-border bg-background p-3"><div className="text-xs text-muted">区间</div><div className="mt-1 font-semibold text-primary">{state.range}</div></div><div className="border border-border bg-background p-3"><div className="text-xs text-muted">左值</div><div className="mt-1 font-semibold text-primary">{state.left}</div></div><div className="border border-border bg-background p-3"><div className="text-xs text-muted">右值</div><div className="mt-1 font-semibold text-primary">{state.right}</div></div><div className="border border-border bg-background p-3"><div className="text-xs text-muted">当前和</div><div className="mt-1 font-semibold text-primary">{state.sum}</div></div><div className="border border-accent bg-accent/10 p-3"><div className="text-xs text-muted">关系</div><div className="mt-1 text-sm font-semibold text-accent">{state.relation}</div></div></div>
        <p className="mb-0 mt-3 border-l-4 border-accent bg-background p-3 text-sm text-secondary">{state.action}</p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        对目标 15，指针经过四次比较命中 4 与 11；每次只朝一个方向移动。
      </figcaption>
    </figure>
  );
}

export function TwoNumbersWithSumEliminationMap() {
  const rows = [
    ["当前和小于 s", "固定右端时左端是区间最小值", "当前左端无法与任何更小右端达标", "left 右移"],
    ["当前和等于 s", "两个不同下标组成合法对", "题目只要任意一对", "立即返回"],
    ["当前和大于 s", "固定左端时右端是区间最大值", "当前右端无法与任何更大左端降到目标", "right 左移"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5"><table className="w-full min-w-[900px] border-collapse text-left text-sm"><thead><tr className="border-b border-border">{["比较", "有序事实", "排除依据", "动作"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 3 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody></table></div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        根据当前和移动边界时，被删除的一整行或一整列都不可能再形成目标和。
      </figcaption>
    </figure>
  );
}

export function TwoNumbersWithSumContractDiagram() {
  const rows = [
    ["顺序", "递增排序数组", "保证移动方向单调", "无序输入结果无保证"],
    ["答案数量", "任意一对", "首次命中即返回", "不枚举全部组合"],
    ["下标", "ahead 大于 behind", "必须是两个不同元素", "单元素不能自配"],
    ["失败", "返回 false", "输出不写入", "调用方不可读取旧值"],
    ["入口", "长度小于 1 或输出指针空", "返回 false", "data 空仅由长度间接保护"],
    ["求和", "源码声明 long long 结果", "意图避免溢出", "操作数仍先按 int 相加"],
    ["复杂度", "每个指针单向移动", "O(n) 时间", "O(1) 空间"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5"><table className="w-full min-w-[900px] border-collapse text-left text-sm"><thead><tr className="border-b border-border">{["维度", "作者契约或实现", "含义", "边界"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 2 ? "font-semibold text-success" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody></table></div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        作者接口返回布尔状态并仅在成功时写两个输出；排序和有效内存由调用方保证。
      </figcaption>
    </figure>
  );
}

export function TwoNumbersWithSumOfficialCaseLab() {
  return <CodingInterviewLab cases={officialCases} caption="作者 main 执行 4 组测试：中间答案、两端答案、无解与空输入。" />;
}
