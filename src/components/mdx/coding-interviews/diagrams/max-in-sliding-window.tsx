"use client";

import { useState } from "react";

import { CodingInterviewLab } from "./official-lab";

const traceStates = [
  { index: 0, value: 2, deque: "[0:2]", output: "-", action: "首个候选入队" },
  { index: 1, value: 3, deque: "[1:3]", output: "-", action: "3 淘汰队尾 2" },
  { index: 2, value: 4, deque: "[2:4]", output: "4", action: "首窗完成，4 为最大值" },
  { index: 3, value: 2, deque: "[2:4, 3:2]", output: "4", action: "2 小于队尾 4，保留两个候选" },
  { index: 4, value: 6, deque: "[4:6]", output: "6", action: "6 从队尾淘汰 2 与 4" },
  { index: 5, value: 2, deque: "[4:6, 5:2]", output: "6", action: "6 仍在窗内并位于队首" },
  { index: 6, value: 5, deque: "[4:6, 6:5]", output: "6", action: "5 淘汰 2，但不能淘汰 6" },
  { index: 7, value: 1, deque: "[6:5, 7:1]", output: "5", action: "下标 4 过期，队首变为 5" },
] as const;

const officialCases = [
  { label: "书中示例", fields: [["数组", "2,3,4,2,6,2,5,1"], ["窗口", "3"], ["输出", "4,4,6,6,6,5"], ["用途", "综合轨迹"]] },
  { label: "经典正负", fields: [["数组", "1,3,-1,-3,5,3,6,7"], ["窗口", "3"], ["输出", "3,3,5,5,6,7"], ["用途", "过期与淘汰"]] },
  { label: "单调递增", fields: [["数组", "1,3,5,7,9,11,13,15"], ["窗口", "4"], ["输出", "7,9,11,13,15"], ["队列", "始终近似一个下标"]] },
  { label: "单调递减", fields: [["数组", "16,14,12,10,8,6,4"], ["窗口", "5"], ["输出", "16,14,12"], ["队列", "靠队首过期"]] },
  { label: "窗口为 1", fields: [["数组", "10,14,12,11"], ["窗口", "1"], ["输出", "原数组"], ["数量", "4"]] },
  { label: "窗口等于长度", fields: [["数组", "10,14,12,11"], ["窗口", "4"], ["输出", "14"], ["数量", "1"]] },
  { label: "窗口为 0", fields: [["数组", "10,14,12,11"], ["窗口", "0"], ["输出", "空"], ["入口", "拒绝"]] },
  { label: "窗口过大", fields: [["数组长度", "4"], ["窗口", "5"], ["输出", "空"], ["入口", "拒绝"]] },
  { label: "空数组", fields: [["数组", "空"], ["窗口", "5"], ["输出", "空"], ["入口", "拒绝"]] },
] as const;

export function MaxSlidingWindowCandidateDiagram() {
  const values = [2, 3, 4, 2, 6, 2, 5, 1];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-8 gap-2">{values.map((value, index) => <div key={index} className={"relative flex min-h-[76px] flex-col items-center justify-center border " + (index >= 2 && index <= 4 ? "border-accent bg-accent/10" : "border-border bg-background")}><span className="font-semibold text-primary">{value}</span><span className="mt-1 text-[10px] text-muted">{index}</span>{index === 4 && <span className="absolute -top-2 bg-success px-1 text-[10px] font-semibold text-white">max</span>}</div>)}</div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3"><div className="border border-border bg-background p-3 text-sm text-secondary">窗口下标：[2, 4]</div><div className="border border-success bg-success/10 p-3 text-sm font-semibold text-success">队首候选 4:6</div><div className="border border-accent bg-accent/10 p-3 text-sm text-accent">较小且更早的候选已淘汰</div></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        双端队列保存仍可能成为当前或未来窗口最大值的候选下标。
      </figcaption>
    </figure>
  );
}

export function MaxSlidingWindowDequeLab() {
  const [cursor, setCursor] = useState(0);
  const state = traceStates[cursor];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">{traceStates.map((item, index) => <button key={item.index} type="button" onClick={() => setCursor(index)} aria-pressed={cursor === index} className={"h-11 border text-xs font-semibold " + (cursor === index ? "border-accent bg-accent/15 text-accent" : "border-border bg-background text-secondary")}>{item.index}:{item.value}</button>)}</div>
        <div className="mt-4 grid gap-2 sm:grid-cols-4"><div className="border border-border bg-background p-3"><div className="text-xs text-muted">新下标</div><div className="mt-1 font-semibold text-primary">{state.index}</div></div><div className="border border-border bg-background p-3"><div className="text-xs text-muted">新值</div><div className="mt-1 font-semibold text-primary">{state.value}</div></div><div className="border border-border bg-background p-3"><div className="text-xs text-muted">队列 下标:值</div><div className="mt-1 font-mono text-sm text-primary">{state.deque}</div></div><div className="border border-success bg-success/10 p-3"><div className="text-xs text-muted">本窗输出</div><div className="mt-1 font-semibold text-success">{state.output}</div></div></div>
        <p className="mb-0 mt-3 border-l-4 border-accent bg-background p-3 text-sm text-secondary">{state.action}</p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        点击每个输入观察队尾淘汰、队首过期与窗口最大值的变化。
      </figcaption>
    </figure>
  );
}

export function MaxSlidingWindowExpiryMap() {
  const rows = [
    ["新值大于等于队尾值", "队尾更早且不更大", "未来窗口永远不会优先", "从队尾弹出"],
    ["队首下标不大于 i-size", "已离开新窗口", "即使值最大也失效", "从队首弹出"],
    ["其余候选", "下标递增、值递减", "各有可能在前者过期后接任", "保留"],
    ["完成窗口", "队首仍在窗内且值最大", "直接读取 num[index.front]", "输出"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5"><table className="w-full min-w-[900px] border-collapse text-left text-sm"><thead><tr className="border-b border-border">{["条件", "事实", "结论", "动作"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 3 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody></table></div><figcaption className="mt-2 text-center text-sm text-secondary">队尾按值淘汰，队首按时间过期；两种删除解决不同问题。</figcaption></figure>
  );
}

export function MaxSlidingWindowContractDiagram() {
  const rows = [
    ["合法窗口", "1 到数组长度", "输出 n-size+1 个", "否则返回空"],
    ["队列内容", "候选元素下标", "可判断过期", "只存值不够"],
    ["值顺序", "从队首到队尾严格递减", "队首即最大值", "相等时保留较新下标"],
    ["下标顺序", "严格递增", "队首最早过期", "每步最多一个旧边界"],
    ["复杂度", "每个下标入队一次、出队至多一次", "O(n) 摊还", "队列空间 O(size)"],
    ["索引类型", "源码 deque<int>", "普通规模可用", "超大 vector 应用 size_t"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5"><table className="w-full min-w-[860px] border-collapse text-left text-sm"><thead><tr className="border-b border-border">{["维度", "作者契约或不变式", "结论", "边界"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 2 ? "font-semibold text-success" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody></table></div><figcaption className="mt-2 text-center text-sm text-secondary">单调队列同时编码候选优先级与过期时间，合法窗口才产生结果。</figcaption></figure>
  );
}

export function MaxSlidingWindowOfficialCaseLab() {
  return <CodingInterviewLab cases={officialCases} caption="作者 main 执行 9 组断言，覆盖综合序列、单双调、窗口边界和三类无效输入。" />;
}
