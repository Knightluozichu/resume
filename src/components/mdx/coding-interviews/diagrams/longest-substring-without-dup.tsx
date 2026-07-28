"use client";

import { useState } from "react";
export function DuplicateDecisionDiagram() {
  const branches = [
    { condition: "从未出现", example: "prev = -1（如 f）", result: "curLength + 1", meaning: "不会制造重复", color: "var(--success)" },
    { condition: "距离 d > curLength", example: "旧字符已在后缀外", result: "curLength + 1", meaning: "直接增长", color: "var(--accent)" },
    { condition: "距离 d ≤ curLength", example: "c@4，d=2，当前长3", result: "curLength = d", meaning: "删旧字符及其左侧", color: "var(--warning)" },
  ] as const;
  const cardW = 224;
  const cardH = 168;
  const gapW = 18;
  const rowX = 60;
  const cx = (i: number) => rowX + i * (cardW + gapW);
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 820 400"
          role="img"
          aria-label="最长不含重复字符的子字符串决策图。动态规划：设 curLength 为以当前字符结尾的最长无重复后缀长度，d 为当前字符到上次出现位置的距离。三分支：从未出现（prev=-1）或 d 大于 curLength（旧字符已在后缀外）→ curLength 加 1；d 小于等于 curLength（旧字符还在后缀内）→ curLength 改为 d，即删除旧字符及其左侧。例 abcacfrar：到 c@4 时 d=2、curLength=3，d≤3 故 curLength=2；历史最大 best=4（acfr）。"
          className="mx-auto block h-auto w-full max-w-[820px]"
        >
          <text x="410" y="34" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">curLength 三分支：d = 到上次出现位置的距离</text>
          {branches.map((b, i) => (
            <g key={b.condition}>
              <rect x={cx(i)} y={56} width={cardW} height={cardH} rx="8" fill={b.color} fillOpacity="0.08" stroke={b.color} strokeWidth="1.5" />
              <text x={cx(i) + cardW / 2} y={82} textAnchor="middle" fontSize="11" fontWeight="700" fill={b.color}>分支 {i + 1}</text>
              <text x={cx(i) + cardW / 2} y={108} textAnchor="middle" fontSize="13" fontWeight="800" fill="var(--text-primary)">{b.condition}</text>
              <text x={cx(i) + cardW / 2} y={132} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{b.example}</text>
              <line x1={cx(i) + 20} y1={146} x2={cx(i) + cardW - 20} y2={146} stroke="var(--border)" strokeWidth="1" />
              <text x={cx(i) + cardW / 2} y={172} textAnchor="middle" fontSize="14" fontWeight="800" fontFamily="monospace" fill={b.color}>{b.result}</text>
              <text x={cx(i) + cardW / 2} y={198} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{b.meaning}</text>
            </g>
          ))}
          <text x="410" y="266" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">best = max(best, curLength)；例 abcacfrar → best = 4（子串 acfr）</text>
          <text x="410" y="296" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">等号属于“旧字符仍在后缀内”分支：源码条件必须是 d &gt; curLength 才增长，d ≤ curLength 则收缩。</text>
          <text x="410" y="322" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">用长 26 的 position 数组记录每个字母上次位置；一次遍历 O(n)、O(1)。</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        等号属于重复仍在当前后缀内的分支，所以源码条件必须是distance大于curLength才增长。
      </figcaption>
    </figure>
  );
}

export function BruteForceSearchMap() {
  const rows = [
    { start: 0, candidates: ["a", "ab", "abc", "abca×"], accepted: "abc，长度3" },
    { start: 1, candidates: ["b", "bc", "bca", "bcac×"], accepted: "bca，长度3" },
    { start: 2, candidates: ["c", "ca", "cac×"], accepted: "ca，长度2" },
    { start: 3, candidates: ["a", "ac", "acf", "acfr", "acfra×"], accepted: "acfr，长度4" },
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[760px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border"><th className="p-3 text-primary">起点</th><th className="p-3 text-primary">逐个扩展并查重</th><th className="p-3 text-primary">该起点最长</th></tr></thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.start} className="border-b border-border last:border-0">
                <td className="p-3 font-semibold text-accent">{row.start}</td>
                <td className="p-3 text-secondary">{row.candidates.join(" → ")}</td>
                <td className="p-3 font-semibold text-success">{row.accepted}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        作者蛮力法为每个起点不断截取子串并从头查重，一旦出现首个重复便停止该起点。
      </figcaption>
    </figure>
  );
}

export function LowercaseAlphabetContractDiagram() {
  const rows = [
    ["字符范围", "仅a到z", "position[ch - 'a']", "下标0到25"],
    ["大写A", "不在题设内", "产生负下标", "先校验或改用映射"],
    ["ASCII标点", "不在题设内", "可能越界", "拒绝或扩展表"],
    ["UTF-8中文", "多字节编码", "按字节不等于按字符", "先解码Unicode码点"],
    ["空字符串", "合法边界", "循环零次", "返回0"],
    ["返回内容", "作者只返回长度", "不保存最佳起点", "扩展时同步记录区间"],
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[920px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["维度", "作者契约", "直接后果", "扩展策略"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 2 ? "font-semibold text-warning" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        长度26的数组是题设优化，不是可直接处理任意文本的通用字符表。
      </figcaption>
    </figure>
  );
}
