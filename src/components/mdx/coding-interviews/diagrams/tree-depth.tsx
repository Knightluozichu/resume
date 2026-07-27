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

export function TreeDepthPathDiagram() {
  const onPath = (v: number) => v === 1 || v === 2 || v === 5 || v === 7;
  const N = ({ x, y, label }: { x: number; y: number; label: number }) => {
    const hot = onPath(label);
    return (
      <g>
        <circle cx={x} cy={y} r="18" fill={hot ? "var(--success)" : "var(--bg)"} fillOpacity={hot ? 0.16 : 1} stroke={hot ? "var(--success)" : "var(--border)"} strokeWidth={hot ? 2.2 : 1.4} />
        <text x={x} y={y + 5} textAnchor="middle" fontSize="14" fontWeight="800" fontFamily="monospace" fill={hot ? "var(--success)" : "var(--text-primary)"}>{label}</text>
      </g>
    );
  };
  const E = ({ x1, y1, x2, y2, hot = false }: { x1: number; y1: number; x2: number; y2: number; hot?: boolean }) => (
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={hot ? "var(--success)" : "var(--border)"} strokeWidth={hot ? 2.4 : 1.4} />
  );
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 820 420"
          role="img"
          aria-label="二叉树的深度图。深度是最长根到叶路径上的节点数。树 1；2,3；4,5,_,6；7（5 的孩子 7）。最长路径为 1→2→5→7，按节点计数深度是 4。递推：depth(node) = max(depth(左), depth(右)) + 1，空树返回 0。根节点 1 左子树深 3、右子树深 2，取较大者加 1 得 4。"
          className="mx-auto block h-auto w-full max-w-[820px]"
        >
          <text x="410" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">深度 = 最长根→叶路径的节点数</text>
          {/* 边 */}
          <E x1={410} y1={78} x2={280} y2={140} hot />
          <E x1={410} y1={78} x2={540} y2={140} />
          <E x1={280} y1={160} x2={200} y2={220} />
          <E x1={280} y1={160} x2={360} y2={220} hot />
          <E x1={540} y1={160} x2={620} y2={220} />
          <E x1={360} y1={240} x2={360} y2={300} hot />
          {/* 节点 */}
          <N x={410} y={64} label={1} />
          <N x={280} y={150} label={2} />
          <N x={540} y={150} label={3} />
          <N x={200} y={230} label={4} />
          <N x={360} y={230} label={5} />
          <N x={620} y={230} label={6} />
          <N x={360} y={310} label={7} />
          {/* 路径标注 */}
          <text x="180" y="330" fontSize="12" fontWeight="800" fill="var(--success)">最长路径 1→2→5→7</text>
          {/* 层标注 */}
          <text x="700" y="68" fontSize="11" fill="var(--text-secondary)">第 1 层</text>
          <text x="700" y="154" fontSize="11" fill="var(--text-secondary)">第 2 层</text>
          <text x="700" y="234" fontSize="11" fill="var(--text-secondary)">第 3 层</text>
          <text x="700" y="314" fontSize="11" fill="var(--text-secondary)">第 4 层</text>
          {/* 递推 */}
          <text x="410" y="366" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">深度 = max(左子树深, 右子树深) + 1；根：max(3, 2) + 1 = 4</text>
          <text x="410" y="394" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">后序汇总：叶返回 1，空树返回 0；每个节点访问一次 O(n)，递归栈 O(h)。</text>
        </svg>
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
