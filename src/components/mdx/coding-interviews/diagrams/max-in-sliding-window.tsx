"use client";

import { useState } from "react";
export function MaxSlidingWindowCandidateDiagram() {
  const values = [2, 3, 4, 2, 6, 2, 5, 1];
  const cellW = 76;
  const cellH = 52;
  const gapW = 8;
  const rowX = 78;
  const cx = (i: number) => rowX + i * (cellW + gapW);
  const inWindow = (i: number) => i >= 2 && i <= 4;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 820 400"
          role="img"
          aria-label="滑动窗口最大值图。数组 2、3、4、2、6、2、5、1，窗口大小 3。当前窗口下标 2 到 4（值 4、2、6），最大值 6。单调双端队列保存仍可能成为最大值的候选下标，从队首到队尾值严格递减：新值大于等于队尾就从队尾弹出（更早且更小水远不会优先），队首下标越出窗口就从队首弹出（过期）。队首即当前窗口最大值。"
          className="mx-auto block h-auto w-full max-w-[820px]"
        >
          <text x="410" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">单调队列：队首到队尾值递减，队首即窗口最大</text>
          {/* 窗口括号 */}
          <path d={`M ${cx(2)} 56 L ${cx(2)} 48 L ${cx(4) + cellW} 48 L ${cx(4) + cellW} 56`} fill="none" stroke="var(--accent)" strokeWidth="2" />
          <text x={(cx(2) + cx(4) + cellW) / 2} y="42" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">窗口 [2, 4]（size=3）</text>
          {/* 数组行 */}
          {values.map((v, i) => (
            <g key={i}>
              <rect x={cx(i)} y={64} width={cellW} height={cellH} rx="6" fill={inWindow(i) ? "var(--accent)" : "var(--bg)"} fillOpacity={inWindow(i) ? 0.1 : 1} stroke={inWindow(i) ? "var(--accent)" : "var(--border)"} strokeWidth={inWindow(i) ? 1.6 : 1.2} />
              <text x={cx(i) + cellW / 2} y={64 + cellH / 2 + 6} textAnchor="middle" fontSize="17" fontWeight="700" fontFamily="monospace" fill={inWindow(i) ? "var(--accent)" : "var(--text-primary)"}>{v}</text>
              <text x={cx(i) + cellW / 2} y={136} textAnchor="middle" fontSize="10" fill="var(--text-secondary)">{i}</text>
            </g>
          ))}
          {/* max 标记 */}
          <text x={cx(4) + cellW / 2} y={160} textAnchor="middle" fontSize="12" fontWeight="800" fill="var(--success)">max=6</text>
          {/* 单调队列 */}
          <text x="410" y="200" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">单调双端队列（下标:值，队首→队尾递减）</text>
          <rect x="330" y="214" width="160" height="44" rx="6" fill="var(--success)" fillOpacity="0.14" stroke="var(--success)" strokeWidth="1.6" />
          <text x="410" y="242" textAnchor="middle" fontSize="15" fontWeight="800" fontFamily="monospace" fill="var(--success)">[4:6]</text>
          <text x="300" y="242" textAnchor="end" fontSize="11" fill="var(--success)">队首</text>
          <text x="520" y="242" fontSize="11" fill="var(--text-secondary)">队尾</text>
          {/* 规则 */}
          <text x="410" y="292" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">队尾淘汰：新值 ≥ 队尾值 → 弹出队尾（更早且更小，永不优先）</text>
          <text x="410" y="316" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">队首过期：队首下标 ≤ i-size → 弹出队首（已离开窗口）</text>
          <text x="410" y="340" textAnchor="middle" fontSize="12" fill="var(--success)">输出：num[队首] 即窗口最大值（本窗口 4,4,6,6,6,5）</text>
          <text x="410" y="372" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">每个下标入队一次、出队至多一次，O(n) 摊还；队列空间 O(size)。</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        双端队列保存仍可能成为当前或未来窗口最大值的候选下标。
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
    <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5"><table className="w-full min-w-[900px] border-collapse text-left text-sm"><thead><tr className="border-b border-border">{["条件", "事实", "结论", "动作"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={`${row[0]}-${index}`} className={"p-3 " + (index === 3 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody></table></div><figcaption className="mt-2 text-center text-sm text-secondary">队尾按值淘汰，队首按时间过期；两种删除解决不同问题。</figcaption></figure>
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
    <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5"><table className="w-full min-w-[860px] border-collapse text-left text-sm"><thead><tr className="border-b border-border">{["维度", "作者契约或不变式", "结论", "边界"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={`${row[0]}-${index}`} className={"p-3 " + (index === 2 ? "font-semibold text-success" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody></table></div><figcaption className="mt-2 text-center text-sm text-secondary">单调队列同时编码候选优先级与过期时间，合法窗口才产生结果。</figcaption></figure>
  );
}
