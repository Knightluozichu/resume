"use client";

import { CodingInterviewLab } from "./official-lab";

const methodCases = [
  {
    label: "朴素递归",
    fields: [["状态", "F(n)展开为两个子调用"], ["重复", "F(n-2)等子问题多次计算"], ["时间", "指数级"], ["空间", "递归深度O(n)"]],
    alert: "定义直观，但F(40)已经产生大量重复调用。",
  },
  {
    label: "滚动迭代",
    fields: [["状态", "只保存前两项"], ["更新", "next=prev1+prev2"], ["时间", "O(n)"], ["空间", "O(1)"]],
  },
  {
    label: "矩阵快速幂",
    fields: [["状态", "2×2转移矩阵"], ["更新", "平方并按二进制指数合并"], ["时间", "O(log n)"], ["空间", "递归版O(log n)"]],
  },
  {
    label: "数值边界",
    fields: [["F(40)", "102334155"], ["F(92)", "signed 64位内"], ["F(93)", "signed 64位溢出"], ["策略", "检查/大整数/取模"]],
  },
] as const;

export function FibonacciRecursionOverlapDiagram() {
  const nodes = [
    ["F(6)", 410, 52, true],
    ["F(5)", 250, 126, false],
    ["F(4)", 570, 126, true],
    ["F(4)", 155, 210, true],
    ["F(3)", 345, 210, false],
    ["F(3)", 500, 210, false],
    ["F(2)", 640, 210, true],
    ["F(3)", 95, 294, false],
    ["F(2)", 215, 294, true],
    ["F(2)", 310, 294, true],
    ["F(1)", 380, 294, false],
  ] as const;
  const edges = [
    [410, 70, 250, 108], [410, 70, 570, 108],
    [250, 144, 155, 192], [250, 144, 345, 192],
    [570, 144, 500, 192], [570, 144, 640, 192],
    [155, 228, 95, 276], [155, 228, 215, 276],
    [345, 228, 310, 276], [345, 228, 380, 276],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg viewBox="0 0 820 390" role="img" aria-label="F6递归树中F4和F2等子问题重复出现。" className="mx-auto block h-auto w-full max-w-[820px]">
          <text x="410" y="24" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">递归树增长来自同一子问题被反复展开</text>
          {edges.map((edge, index) => <line key={index} x1={edge[0]} y1={edge[1]} x2={edge[2]} y2={edge[3]} stroke="var(--border)" strokeWidth="2" />)}
          {nodes.map(([label, x, y, repeated]) => (
            <g key={label + x}>
              <rect x={x - 37} y={y - 17} width="74" height="34" rx="5" fill={repeated ? "var(--warning)" : "var(--bg)"} fillOpacity={repeated ? 0.1 : 1} stroke={repeated ? "var(--warning)" : "var(--border)"} />
              <text x={x} y={y + 4} textAnchor="middle" fontSize="11" fontWeight={repeated ? 700 : 500} fill="var(--text-primary)">{label}</text>
            </g>
          ))}
          <rect x="150" y="338" width="520" height="34" rx="5" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" />
          <text x="410" y="360" textAnchor="middle" fontSize="11" fill="var(--text-primary)">记忆化让每个n只求一次；自底向上连递归栈也省掉。</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">高亮节点在不同分支重复出现，n增大后调用数按指数级增长。</figcaption>
    </figure>
  );
}

export function FibonacciRollingStateMap() {
  const rows = [
    ["初始", "0", "1", "尚未计算", "对应F(0)、F(1)"],
    ["i=2", "0", "1", "1", "滚动后保存F(1)、F(2)"],
    ["i=3", "1", "1", "2", "滚动后保存F(2)、F(3)"],
    ["i=4", "1", "2", "3", "滚动后保存F(3)、F(4)"],
    ["i=5", "2", "3", "5", "返回F(5)=5"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[700px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["轮次", "前两项", "前一项", "当前项", "循环不变量"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 3 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">每轮计算前两个变量恰好保存下一项所需的两个历史状态。</figcaption>
    </figure>
  );
}

export function FibonacciMethodLab() {
  return <CodingInterviewLab cases={methodCases} caption="比较作者三种实现的状态、时间、空间与数值边界。" />;
}

export function FrogStepCorrespondenceDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg viewBox="0 0 820 300" role="img" aria-label="到达第n级台阶的最后一步只能来自n减1或n减2，因此方案数相加。" className="mx-auto block h-auto w-full max-w-[820px]">
          <defs><marker id="frog-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="var(--accent)" /></marker></defs>
          <text x="410" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">按最后一步分类：两类方案互斥且穷尽</text>
          {[1, 2, 3, 4, 5].map((step) => <g key={step}><rect x={80 + step * 115} y={230 - step * 30} width="94" height={step * 30} fill="var(--bg)" stroke="var(--border)" /><text x={127 + step * 115} y={250 - step * 30} textAnchor="middle" fontSize="11" fill="var(--text-primary)">第{step}级</text></g>)}
          <path d="M426 126 C475 84 535 86 585 96" fill="none" stroke="var(--accent)" strokeWidth="3" markerEnd="url(#frog-arrow)" />
          <text x="505" y="72" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">从n-1跳1级</text>
          <path d="M311 160 C390 84 500 70 585 96" fill="none" stroke="var(--success)" strokeWidth="3" strokeDasharray="6 4" markerEnd="url(#frog-arrow)" />
          <text x="392" y="62" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--success)">从n-2跳2级</text>
          <text x="410" y="282" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">J(n)=J(n-1)+J(n-2)，初值J(1)=1、J(2)=2。</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">递推式来自最后一步的完备分类，不是看到数列后机械套公式。</figcaption>
    </figure>
  );
}
