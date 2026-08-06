"use client";

import { useState } from "react";
export function NumberOfKSortedRunDiagram() {
  const values = [1, 2, 3, 3, 3, 3, 4, 5];
  const first = 2;
  const last = 5;
  const cellW = 76;
  const cellH = 52;
  const gapW = 8;
  const rowX = 78;
  const cx = (i: number) => rowX + i * (cellW + gapW);
  const inRun = (i: number) => i >= first && i <= last;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 820 360"
          role="img"
          aria-label="排序数组中数字 k 出现次数图。数组 1、2、3、3、3、3、4、5 中 3 形成连续区间，第一个 3 在下标 2，最后一个 3 在下标 5。出现次数等于 last 减 first 加 1，即 5 减 2 加 1 等于 4。用二分分别找第一个和最后一个 k，无需逐个扫描重复段。"
          className="mx-auto block h-auto w-full max-w-[820px]"
        >
          <text x="410" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">排序使所有 k 连续：次数 = last − first + 1</text>
          {/* 区间括号 */}
          <path d={`M ${cx(first)} 56 L ${cx(first)} 48 L ${cx(last) + cellW} 48 L ${cx(last) + cellW} 56`} fill="none" stroke="var(--success)" strokeWidth="2" />
          <text x={(cx(first) + cx(last) + cellW) / 2} y="42" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">k=3 的连续区间</text>
          {/* 数组行 */}
          {values.map((v, i) => (
            <g key={i}>
              <rect x={cx(i)} y={64} width={cellW} height={cellH} rx="6" fill={inRun(i) ? "var(--success)" : "var(--bg)"} fillOpacity={inRun(i) ? 0.12 : 1} stroke={inRun(i) ? "var(--success)" : "var(--border)"} strokeWidth={inRun(i) ? 1.6 : 1.2} />
              <text x={cx(i) + cellW / 2} y={64 + cellH / 2 + 6} textAnchor="middle" fontSize="17" fontWeight="700" fontFamily="monospace" fill={inRun(i) ? "var(--success)" : "var(--text-primary)"}>{v}</text>
              <text x={cx(i) + cellW / 2} y={136} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{i}</text>
            </g>
          ))}
          {/* first / last 标记 */}
          <text x={cx(first) + cellW / 2} y={160} textAnchor="middle" fontSize="12" fontWeight="800" fill="var(--accent)">first=2</text>
          <text x={cx(last) + cellW / 2} y={160} textAnchor="middle" fontSize="12" fontWeight="800" fill="var(--accent)">last=5</text>
          {/* 计数 */}
          <text x="410" y="200" textAnchor="middle" fontSize="15" fontWeight="800" fill="var(--success)">出现次数 = 5 − 2 + 1 = 4</text>
          {/* 二分规则 */}
          <text x="410" y="240" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">找 first：命中 k 但左邻仍为 k → 搜左半；位于下标0或左邻不同 → 即 first。</text>
          <text x="410" y="264" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">找 last：命中 k 但右邻仍为 k → 搜右半；位于末端或右邻不同 → 即 last。</text>
          <text x="410" y="300" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">两个边界搜索各 O(log n)；k 不存在时 first/last 为 -1，统一返回计数 0。</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        排序保证所有3形成连续区间；只需找到左右边界，无需逐个扫描重复段。
      </figcaption>
    </figure>
  );
}
export function NumberOfKContractDiagram() {
  const rows = [
    ["输入顺序", "必须非递减排序", "重复值形成连续区间", "无序输入结果无保证"],
    ["空输入", "nullptr或长度小于等于0", "返回0", "不进入两个递归搜索"],
    ["目标不存在", "first或last为-1", "返回0", "不做负下标差值"],
    ["边界命中", "下标0 / length-1", "无需读取越界邻居", "短路条件保护"],
    ["中点计算", "(start+end)/2", "超大下标可能溢出", "start+(end-start)/2"],
    ["重复段长度", "last-first+1", "闭区间计数", "不可漏加1"],
    ["标准库等价", "lower_bound / upper_bound", "两个对数搜索", "distance得到计数"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[940px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["维度", "作者契约/实现", "含义", "工程策略"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={`${row[0]}-${index}`} className={"p-3 " + (index === 2 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        两个边界搜索共享排序前提，但向相反方向收缩；入口把无效输入与不存在统一为计数0。
      </figcaption>
    </figure>
  );
}
