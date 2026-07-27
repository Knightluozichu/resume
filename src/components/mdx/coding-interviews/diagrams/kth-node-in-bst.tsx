"use client";

import { useState } from "react";

import { CodingInterviewLab } from "./official-lab";

const visits = [
  { value: 5, rank: 1, remaining: 4, action: "k 从 4 减到 3" },
  { value: 6, rank: 2, remaining: 3, action: "k 从 3 减到 2" },
  { value: 7, rank: 3, remaining: 2, action: "k 从 2 减到 1" },
  { value: 8, rank: 4, remaining: 1, action: "k 等于 1，返回节点 8" },
  { value: 9, rank: 5, remaining: 0, action: "目标已找到，不再访问" },
  { value: 10, rank: 6, remaining: 0, action: "目标已找到，不再访问" },
  { value: 11, rank: 7, remaining: 0, action: "目标已找到，不再访问" },
] as const;

const officialCases = [
  {
    label: "完整平衡树 A",
    fields: [["节点", "5,6,7,8,9,10,11"], ["k=1..7", "依次返回 5..11"], ["非法", "k=0 / 8 返回空"], ["断言数", "9"]],
  },
  {
    label: "纯左链 B",
    fields: [["根到叶", "5,4,3,2,1"], ["中序", "1,2,3,4,5"], ["非法", "k=0 / 6 返回空"], ["断言数", "7"]],
  },
  {
    label: "纯右链 C",
    fields: [["根到叶", "1,2,3,4,5"], ["中序", "1,2,3,4,5"], ["非法", "k=0 / 6 返回空"], ["断言数", "7"]],
  },
  {
    label: "单节点 D",
    fields: [["节点", "1"], ["k=1", "返回 1"], ["非法", "k=0 / 2 返回空"], ["断言数", "3"]],
  },
  {
    label: "空树 E",
    fields: [["根", "nullptr"], ["k=0", "返回空"], ["k=1", "返回空"], ["断言数", "2"]],
  },
] as const;

export function KthNodeBstOrderDiagram() {
  const order = [5, 6, 7, 8, 9, 10, 11];
  const N = ({ x, y, label, hot = false }: { x: number; y: number; label: number; hot?: boolean }) => (
    <g>
      <circle cx={x} cy={y} r="18" fill={hot ? "var(--success)" : "var(--bg)"} fillOpacity={hot ? 0.16 : 1} stroke={hot ? "var(--success)" : "var(--border)"} strokeWidth={hot ? 2 : 1.4} />
      <text x={x} y={y + 5} textAnchor="middle" fontSize="14" fontWeight="800" fontFamily="monospace" fill={hot ? "var(--success)" : "var(--text-primary)"}>{label}</text>
    </g>
  );
  const E = ({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) => (
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--border)" strokeWidth="1.4" />
  );
  const cellW = 70;
  const ox = 130;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 820 420"
          role="img"
          aria-label="二叉搜索树的第 k 小节点图。BST 中序遍历（左、根、右）得到递增序列：树 8；6,10；5,7,9,11 的中序为 5,6,7,8,9,10,11。所以第 k 小就是中序遍历的第 k 个节点。以 k=4 为例，中序访问到节点 8 时是第 4 个，命中返回；之后的 9、10、11 不再访问。k 从 1 计，k=0 或超过节点数返回空。"
          className="mx-auto block h-auto w-full max-w-[820px]"
        >
          <text x="410" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">BST 中序 = 递增序列：第 k 小即中序第 k 个</text>
          {/* 树 */}
          <E x1={410} y1={78} x2={280} y2={140} />
          <E x1={410} y1={78} x2={540} y2={140} />
          <E x1={280} y1={160} x2={200} y2={220} />
          <E x1={280} y1={160} x2={360} y2={220} />
          <E x1={540} y1={160} x2={480} y2={220} />
          <E x1={540} y1={160} x2={620} y2={220} />
          <N x={410} y={64} label={8} hot />
          <N x={280} y={150} label={6} />
          <N x={540} y={150} label={10} />
          <N x={200} y={230} label={5} />
          <N x={360} y={230} label={7} />
          <N x={480} y={230} label={9} />
          <N x={620} y={230} label={11} />
          {/* 中序序列 */}
          <text x="410" y="292" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-secondary)">中序遍历（左→根→右）：</text>
          {order.map((v, i) => (
            <g key={v}>
              <rect x={ox + i * (cellW + 8)} y={304} width={cellW} height={44} rx="6" fill={v === 8 ? "var(--success)" : "var(--accent)"} fillOpacity={v === 8 ? 0.16 : 0.08} stroke={v === 8 ? "var(--success)" : "var(--accent)"} strokeWidth={v === 8 ? 1.8 : 1.2} />
              <text x={ox + i * (cellW + 8) + cellW / 2} y={326} textAnchor="middle" fontSize="15" fontWeight="800" fontFamily="monospace" fill={v === 8 ? "var(--success)" : "var(--accent)"}>{v}</text>
              <text x={ox + i * (cellW + 8) + cellW / 2} y={342} textAnchor="middle" fontSize="9" fill="var(--text-secondary)">第{i + 1}</text>
            </g>
          ))}
          <text x="410" y="378" textAnchor="middle" fontSize="13" fontWeight="800" fill="var(--success)">k=4 → 中序第 4 个 = 8（命中后 9、10、11 不再访问）</text>
          <text x="410" y="404" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">k 由引用在递归层共享递减；k=1 返回最小节点 5；k=0 或越界返回空。O(h+k) 时间、O(h) 栈。</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        二叉搜索树中序遍历得到 5 到 11 的有序节点序列；作者的 k=1 返回 5。
      </figcaption>
    </figure>
  );
}

export function KthNodeTraversalLab() {
  const [cursor, setCursor] = useState(0);
  const state = visits[cursor];
  const found = state.rank === 4;
  const skipped = state.rank > 4;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-7 gap-2">
          {visits.map((item, index) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setCursor(index)}
              aria-pressed={cursor === index}
              className={
                "h-12 border text-sm font-semibold " +
                (cursor === index
                  ? "border-accent bg-accent/15 text-accent"
                  : index > 3
                    ? "border-border bg-muted/10 text-muted"
                    : "border-border bg-background text-secondary")
              }
            >
              {item.value}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-4">
          <div className="border border-border bg-background p-3"><div className="text-xs text-muted">中序排名</div><div className="mt-1 font-semibold text-primary">{state.rank}</div></div>
          <div className="border border-border bg-background p-3"><div className="text-xs text-muted">节点值</div><div className="mt-1 font-semibold text-primary">{state.value}</div></div>
          <div className="border border-border bg-background p-3"><div className="text-xs text-muted">访问前 k</div><div className="mt-1 font-semibold text-primary">{state.remaining}</div></div>
          <div className="border border-border bg-background p-3"><div className="text-xs text-muted">状态</div><div className={"mt-1 font-semibold " + (found ? "text-success" : skipped ? "text-muted" : "text-accent")}>{found ? "命中" : skipped ? "已剪枝" : "继续"}</div></div>
        </div>
        <p className="mb-0 mt-3 border-l-4 border-accent bg-background p-3 text-sm text-secondary">{state.action}</p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        以 k=4 为例，访问到节点 8 时命中；9、10、11 不再递归访问。
      </figcaption>
    </figure>
  );
}

export function KthNodeCounterFlowDiagram() {
  const phases = [
    ["递归左子树", "先取得更小节点", "target 可能被左侧设置"],
    ["检查 target", "非空则直接回传", "阻止重复递减 k"],
    ["访问当前节点", "k 为 1 时命中", "否则 k 减 1"],
    ["递归右子树", "仅 target 仍为空时进入", "继续较大节点"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="grid gap-2 border border-border bg-elevated p-4 sm:grid-cols-4 sm:p-5">
        {phases.map((phase, index) => (
          <div key={phase[0]} className="relative border border-border bg-background p-3">
            <div className="text-xs font-semibold text-accent">阶段 {index + 1}</div>
            <div className="mt-1 font-semibold text-primary">{phase[0]}</div>
            <div className="mt-2 text-xs text-secondary">{phase[1]}</div>
            <div className="mt-2 border-t border-border pt-2 text-xs text-muted">{phase[2]}</div>
          </div>
        ))}
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        k 通过引用在所有递归层共享；target 非空后沿调用栈回传并停止后续遍历。
      </figcaption>
    </figure>
  );
}

export function KthNodeContractMap() {
  const rows = [
    ["排名起点", "k 从 1 开始", "k=1 是最小节点", "k=0 返回空"],
    ["遍历方向", "左、根、右", "结果按升序", "源码实际求第 k 小"],
    ["超出节点数", "遍历结束仍未命中", "返回 nullptr", "k 保持正数"],
    ["共享状态", "unsigned int 引用", "跨递归层递减", "命中后不可再减"],
    ["树形", "平衡、左链、右链", "结果语义相同", "栈深度由高度决定"],
    ["空树", "根为 nullptr", "入口直接返回空", "核心函数不接收空根"],
    ["复杂度", "访问前 k 个节点及路径", "O(h+k) 时间", "O(h) 递归栈"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[900px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["维度", "作者实现", "含义", "边界"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 2 ? "font-semibold text-success" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        题面“第 k 大”与源码升序计数不一致；本表按可执行代码和断言定义行为。
      </figcaption>
    </figure>
  );
}

export function KthNodeOfficialCaseLab() {
  return (
    <CodingInterviewLab
      cases={officialCases}
      caption="作者按 5 种树形执行 28 个断言：完整树、两种单链、单节点与空树，并覆盖 k=0 和越界。"
    />
  );
}
