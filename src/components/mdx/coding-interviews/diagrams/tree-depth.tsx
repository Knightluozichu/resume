"use client";

import { useState } from "react";
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
          <text x="410" y="34" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">深度 = 最长根→叶路径的节点数</text>
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
