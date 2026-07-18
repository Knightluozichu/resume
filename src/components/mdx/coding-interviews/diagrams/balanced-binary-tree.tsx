"use client";

import { useState } from "react";

import { CodingInterviewLab } from "./official-lab";

const postorderStates = [
  { node: "叶 4", left: 0, right: 0, depth: 1, balanced: true, note: "两个空孩子平衡，叶节点深度为 1" },
  { node: "叶 7", left: 0, right: 0, depth: 1, balanced: true, note: "返回平衡与深度 1" },
  { node: "节点 5", left: 1, right: 0, depth: 2, balanced: true, note: "深度差 1，仍然平衡" },
  { node: "节点 2", left: 1, right: 2, depth: 3, balanced: true, note: "两个孩子先完成，再汇总当前节点" },
  { node: "节点 3", left: 0, right: 1, depth: 2, balanced: true, note: "深度差 1，返回深度 2" },
  { node: "根 1", left: 3, right: 2, depth: 4, balanced: true, note: "根深度差 1，整棵树平衡" },
] as const;

const officialCases = [
  { label: "完全二叉树", fields: [["节点", "1 到 7"], ["每层", "全部填满"], ["期望", "true"], ["两方案", "均通过"]] },
  { label: "非完全但平衡", fields: [["最长深度", "4"], ["根左右深度", "3 / 2"], ["期望", "true"], ["关键", "完全不等于平衡"]] },
  { label: "局部失衡", fields: [["节点 1", "左深 3 / 右深 1"], ["差值", "2"], ["期望", "false"], ["传播", "向根返回失败"]] },
  { label: "纯左链", fields: [["节点", "1→2→3→4→5"], ["根差值", "4"], ["期望", "false"], ["方向", "左"]] },
  { label: "纯右链", fields: [["节点", "1→2→3→4→5"], ["根差值", "-4"], ["期望", "false"], ["方向", "右"]] },
  { label: "单节点", fields: [["左右深度", "0 / 0"], ["自身深度", "1"], ["期望", "true"], ["最小非空", "覆盖"]] },
  { label: "空树", fields: [["根", "nullptr"], ["深度", "0"], ["期望", "true"], ["基例", "覆盖"]] },
] as const;

export function BalancedBinaryTreeLocalRuleDiagram() {
  const rows = [
    ["完全树", "左深 2", "右深 2", "差 0", "平衡"],
    ["非完全树", "左深 3", "右深 2", "差 1", "平衡"],
    ["局部偏斜", "左深 3", "右深 1", "差 2", "失衡"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="grid gap-3 border border-border bg-elevated p-4 sm:grid-cols-3 sm:p-5">
        {rows.map((row) => {
          const ok = row[4] === "平衡";
          return <div key={row[0]} className={"border p-4 " + (ok ? "border-success bg-success/10" : "border-danger bg-danger/10")}><div className="font-semibold text-primary">{row[0]}</div><div className="mt-3 grid grid-cols-2 gap-2 text-xs text-secondary"><span>{row[1]}</span><span>{row[2]}</span></div><div className="mt-3 text-sm text-secondary">{row[3]}</div><div className={"mt-2 font-semibold " + (ok ? "text-success" : "text-danger")}>{row[4]}</div></div>;
        })}
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        平衡检查作用于每个节点；非完全树也可以平衡，任一节点差值超过 1 就失败。
      </figcaption>
    </figure>
  );
}

export function BalancedBinaryTreePostorderLab() {
  const [cursor, setCursor] = useState(0);
  const state = postorderStates[cursor];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          {postorderStates.map((item, index) => <button key={item.node} type="button" onClick={() => setCursor(index)} aria-pressed={cursor === index} className={"h-11 border text-xs font-semibold " + (cursor === index ? "border-accent bg-accent/15 text-accent" : "border-border bg-background text-secondary")}>{item.node}</button>)}
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-5">
          <div className="border border-border bg-background p-3"><div className="text-xs text-muted">节点</div><div className="mt-1 font-semibold text-primary">{state.node}</div></div>
          <div className="border border-border bg-background p-3"><div className="text-xs text-muted">左深度</div><div className="mt-1 font-semibold text-primary">{state.left}</div></div>
          <div className="border border-border bg-background p-3"><div className="text-xs text-muted">右深度</div><div className="mt-1 font-semibold text-primary">{state.right}</div></div>
          <div className="border border-success bg-success/10 p-3"><div className="text-xs text-muted">自身深度</div><div className="mt-1 font-semibold text-success">{state.depth}</div></div>
          <div className="border border-success bg-success/10 p-3"><div className="text-xs text-muted">平衡</div><div className="mt-1 font-semibold text-success">{state.balanced ? "是" : "否"}</div></div>
        </div>
        <p className="mb-0 mt-3 border-l-4 border-accent bg-background p-3 text-sm text-secondary">{state.note}</p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        后序遍历先得到左右深度与状态，再一次性计算当前节点结果。
      </figcaption>
    </figure>
  );
}

export function BalancedBinaryTreeWorkDiagram() {
  const rows = [
    ["方案一", "当前节点先各求一次左右深度", "再递归检查两个孩子", "同一子树可能被反复求深度"],
    ["方案二", "孩子返回平衡状态与深度", "当前节点只做常数次比较", "每个节点只遍历一次"],
    ["哨兵版", "高度函数以 -1 表示失衡", "单一返回值携带两种状态", "与方案二语义等价"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5"><table className="w-full min-w-[820px] border-collapse text-left text-sm"><thead><tr className="border-b border-border">{["实现", "取得信息", "当前工作", "遍历代价"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 3 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody></table></div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        作者先给出重复求深度的直观方案，再用深度出参把平衡检查合并进一次后序遍历。
      </figcaption>
    </figure>
  );
}

export function BalancedBinaryTreeContractMap() {
  const rows = [
    ["空树", "平衡，深度 0", "true", "递归基例"],
    ["局部阈值", "左右深度差在 -1 到 1", "继续向父层", "包含正负方向"],
    ["子树失败", "布尔 false", "短路另一分支或父层", "深度值不可再读"],
    ["完全性", "不要求每层填满", "与平衡独立", "Test2 专门覆盖"],
    ["时间", "优化版每节点一次", "O(n)", "朴素版有重复深度计算"],
    ["空间", "递归栈 O(h)", "斜树 O(n)", "与上一题相同"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5"><table className="w-full min-w-[820px] border-collapse text-left text-sm"><thead><tr className="border-b border-border">{["维度", "作者契约", "结果", "说明"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 2 ? "font-semibold text-success" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody></table></div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        空树与单节点都平衡；优化版在 false 路径不承诺输出深度。
      </figcaption>
    </figure>
  );
}

export function BalancedBinaryTreeOfficialCaseLab() {
  return <CodingInterviewLab cases={officialCases} caption="作者用 7 种树形同时检验两套方案，共 14 次结果核对。" />;
}
