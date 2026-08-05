"use client";

import { useState } from "react";
export function TwoNumbersWithSumPointerDiagram() {
  const values = [1, 2, 4, 7, 11, 15];
  const cellW = 90;
  const cellH = 52;
  const gapW = 10;
  const rowX = 115;
  const cx = (i: number) => rowX + i * (cellW + gapW);
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 820 360"
          role="img"
          aria-label="和为 s 的两个数字双指针图。递增数组 1、2、4、7、11、15，目标 15。behind 指向最小值 1，ahead 指向最大值 15，当前和 1+15=16 大于 15，于是 ahead 左移。和偏大只能减小右端，和偏小只能增大左端，直到相等命中 4 与 11。"
          className="mx-auto block h-auto w-full max-w-[820px]"
        >
          <defs>
            <marker id="tns-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="var(--accent)" /></marker>
          </defs>
          <text x="410" y="34" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">首尾双指针夹逼：和偏大移右端，和偏小移左端</text>
          {/* 数组行 */}
          {values.map((v, i) => {
            const end = i === 0 || i === 5;
            return (
              <g key={i}>
                <rect x={cx(i)} y={64} width={cellW} height={cellH} rx="6" fill={end ? "var(--accent)" : "var(--bg)"} fillOpacity={end ? 0.1 : 1} stroke={end ? "var(--accent)" : "var(--border)"} strokeWidth={end ? 1.6 : 1.2} />
                <text x={cx(i) + cellW / 2} y={64 + cellH / 2 + 6} textAnchor="middle" fontSize="17" fontWeight="700" fontFamily="monospace" fill={end ? "var(--accent)" : "var(--text-primary)"}>{v}</text>
                <text x={cx(i) + cellW / 2} y={136} textAnchor="middle" fontSize="10" fill="var(--text-secondary)">下标 {i}</text>
              </g>
            );
          })}
          {/* 指针 */}
          <text x={cx(0) + cellW / 2} y={160} textAnchor="middle" fontSize="12" fontWeight="800" fill="var(--accent)">behind</text>
          <text x={cx(5) + cellW / 2} y={160} textAnchor="middle" fontSize="12" fontWeight="800" fill="var(--accent)">ahead</text>
          {/* 当前和 */}
          <text x="410" y="200" textAnchor="middle" fontSize="14" fontWeight="700" fontFamily="monospace" fill="var(--text-primary)">当前和 = 1 + 15 = 16</text>
          <text x="410" y="226" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--warning)">16 &gt; 目标 15 → ahead 左移（最大端太大）</text>
          {/* 规则 */}
          <text x="410" y="266" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">和 &lt; s：behind 右移（左端是最小值，无法再配更小的右端）</text>
          <text x="410" y="290" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">和 &gt; s：ahead 左移（右端是最大值，无法再配更大的左端）</text>
          <text x="410" y="314" textAnchor="middle" fontSize="12" fill="var(--success)">和 = s：命中，返回两数（本例最终 4 + 11 = 15）</text>
          <text x="410" y="344" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">每步排除一整行/列，两指针单向移动，O(n) 时间、O(1) 空间。</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        首尾双指针夹住尚未排除的搜索区间；当前和偏大时只能减小右端。
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
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5"><table className="w-full min-w-[900px] border-collapse text-left text-sm"><thead><tr className="border-b border-border">{["比较", "有序事实", "排除依据", "动作"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={`${row[0]}-${index}`} className={"p-3 " + (index === 3 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody></table></div>
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
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5"><table className="w-full min-w-[900px] border-collapse text-left text-sm"><thead><tr className="border-b border-border">{["维度", "作者契约或实现", "含义", "边界"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={`${row[0]}-${index}`} className={"p-3 " + (index === 2 ? "font-semibold text-success" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody></table></div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        作者接口返回布尔状态并仅在成功时写两个输出；排序和有效内存由调用方保证。
      </figcaption>
    </figure>
  );
}
