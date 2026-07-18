"use client";

import { useState } from "react";

import { CodingInterviewLab } from "./official-lab";

const depthStates = [
  { node: 4, left: 0, right: 0, result: 1, note: "叶节点 4 的两个空子树深度都为 0" },
  { node: 7, left: 0, right: 0, result: 1, note: "叶节点 7 返回 1" },
  { node: 5, left: 1, right: 0, result: 2, note: "节点 5 选择左子树 7，返回 2" },
  { node: 2, left: 1, right: 2, result: 3, note: "节点 2 选择更深的右子树 5，返回 3" },
  { node: 6, left: 0, right: 0, result: 1, note: "叶节点 6 返回 1" },
  { node: 3, left: 0, right: 1, result: 2, note: "节点 3 选择右子树 6，返回 2" },
  { node: 1, left: 3, right: 2, result: 4, note: "根节点选择左子树，整棵树深度为 4" },
] as const;

const officialCases = [
  { label: "普通树", fields: [["节点", "1 到 7"], ["最长路径", "1→2→5→7"], ["节点数", "4"], ["期望", "4"]] },
  { label: "纯左链", fields: [["节点", "1→2→3→4→5"], ["树高", "5 层"], ["递归栈", "5 层"], ["期望", "5"]] },
  { label: "纯右链", fields: [["节点", "1→2→3→4→5"], ["树高", "5 层"], ["方向", "全部向右"], ["期望", "5"]] },
  { label: "单节点", fields: [["根", "1"], ["左右子树", "均为空"], ["计算", "max(0,0)+1"], ["期望", "1"]] },
  { label: "空树", fields: [["根", "nullptr"], ["路径", "不存在"], ["基例", "直接返回"], ["期望", "0"]] },
] as const;

function DepthNode({ value, active = false }: { value: number; active?: boolean }) {
  return <div className={"mx-auto flex size-11 items-center justify-center rounded-full border-2 text-sm font-semibold " + (active ? "border-success bg-success/15 text-success" : "border-border bg-background text-primary")}>{value}</div>;
}

export function TreeDepthPathDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-4 gap-y-3">
          <div className="col-span-4"><DepthNode value={1} active /></div>
          <div className="col-span-2"><DepthNode value={2} active /></div>
          <div className="col-span-2"><DepthNode value={3} /></div>
          <DepthNode value={4} />
          <DepthNode value={5} active />
          <div />
          <DepthNode value={6} />
          <div />
          <DepthNode value={7} active />
          <div className="col-span-2" />
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-4">
          {["第 1 层：1", "第 2 层：2", "第 3 层：5", "第 4 层：7"].map((item) => <div key={item} className="border border-success bg-success/10 p-2 text-center text-xs font-semibold text-success">{item}</div>)}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        作者 Test1 的最长根到叶路径为 1、2、5、7，按节点计数深度是 4。
      </figcaption>
    </figure>
  );
}

export function TreeDepthRecurrenceLab() {
  const [cursor, setCursor] = useState(0);
  const state = depthStates[cursor];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-7 gap-2">
          {depthStates.map((item, index) => (
            <button key={item.node} type="button" onClick={() => setCursor(index)} aria-pressed={cursor === index} className={"h-11 border text-sm font-semibold " + (cursor === index ? "border-accent bg-accent/15 text-accent" : "border-border bg-background text-secondary")}>{item.node}</button>
          ))}
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-4">
          <div className="border border-border bg-background p-3"><div className="text-xs text-muted">当前节点</div><div className="mt-1 font-semibold text-primary">{state.node}</div></div>
          <div className="border border-border bg-background p-3"><div className="text-xs text-muted">左深度</div><div className="mt-1 font-semibold text-primary">{state.left}</div></div>
          <div className="border border-border bg-background p-3"><div className="text-xs text-muted">右深度</div><div className="mt-1 font-semibold text-primary">{state.right}</div></div>
          <div className="border border-success bg-success/10 p-3"><div className="text-xs text-muted">返回值</div><div className="mt-1 font-semibold text-success">{state.result}</div></div>
        </div>
        <p className="mb-0 mt-3 border-l-4 border-accent bg-background p-3 text-sm text-secondary">{state.note}</p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        点击节点观察自底向上的递推：返回较深子树的深度再加 1。
      </figcaption>
    </figure>
  );
}

export function TreeDepthCallStackDiagram() {
  const rows = [
    ["进入节点", "递归左、递归右", "等待两个子问题结果"],
    ["空指针", "立即返回 0", "提供叶节点的基线"],
    ["子树返回", "得到 nLeft 与 nRight", "不需要全局变量"],
    ["当前节点", "max 加 1", "沿调用栈向父节点返回"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="grid gap-2 border border-border bg-elevated p-4 sm:grid-cols-4 sm:p-5">
        {rows.map((row, index) => <div key={row[0]} className="border border-border bg-background p-3"><div className="text-xs font-semibold text-accent">阶段 {index + 1}</div><div className="mt-1 font-semibold text-primary">{row[0]}</div><div className="mt-2 text-xs text-secondary">{row[1]}</div><div className="mt-2 border-t border-border pt-2 text-xs text-muted">{row[2]}</div></div>)}
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        每个调用只返回当前子树深度；父层组合两个返回值，形成后序汇总。
      </figcaption>
    </figure>
  );
}

export function TreeDepthContractMap() {
  const rows = [
    ["深度单位", "路径上的节点数", "空树 0、单节点 1", "不是边数"],
    ["递推", "较大子树深度加 1", "最长路径只能走一侧", "不能相加"],
    ["输入权限", "const 根指针", "只读遍历", "不修改树"],
    ["时间", "每个节点访问一次", "O(n)", "无提前跳过整棵子树"],
    ["空间", "递归调用栈", "O(h)", "斜树最坏 O(n)"],
    ["结构前提", "真正的无环二叉树", "每个子指针可终止", "环会无限递归"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[820px] border-collapse text-left text-sm"><thead><tr className="border-b border-border">{["维度", "作者定义或实现", "结论", "边界"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 2 ? "font-semibold text-success" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody></table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        作者按节点数定义二叉树的深度；递归时间看节点总数，空间看树高。
      </figcaption>
    </figure>
  );
}

export function TreeDepthOfficialCaseLab() {
  return <CodingInterviewLab cases={officialCases} caption="作者 main 执行 5 组测试，覆盖普通分叉树、左右单链、单节点和空树。" />;
}
