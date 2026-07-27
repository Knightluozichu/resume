"use client";

import { useState } from "react";

import { CodingInterviewLab } from "./official-lab";

const trace = [
  { index: 0, char: "a", previous: -1, distance: "-", before: 0, after: 1, window: "a", best: 1, branch: "首次出现，长度加1" },
  { index: 1, char: "b", previous: -1, distance: "-", before: 1, after: 2, window: "ab", best: 2, branch: "首次出现，长度加1" },
  { index: 2, char: "c", previous: -1, distance: "-", before: 2, after: 3, window: "abc", best: 3, branch: "首次出现，长度加1" },
  { index: 3, char: "a", previous: 0, distance: "3", before: 3, after: 3, window: "bca", best: 3, branch: "旧a在当前后缀内，长度改为3" },
  { index: 4, char: "c", previous: 2, distance: "2", before: 3, after: 2, window: "ac", best: 3, branch: "旧c在当前后缀内，长度改为2" },
  { index: 5, char: "f", previous: -1, distance: "-", before: 2, after: 3, window: "acf", best: 3, branch: "首次出现，长度加1" },
  { index: 6, char: "r", previous: -1, distance: "-", before: 3, after: 4, window: "acfr", best: 4, branch: "首次出现，长度加1" },
  { index: 7, char: "a", previous: 3, distance: "4", before: 4, after: 4, window: "cfra", best: 4, branch: "距离等于后缀长度，仍需排除旧a" },
  { index: 8, char: "r", previous: 6, distance: "2", before: 4, after: 2, window: "ar", best: 4, branch: "旧r在当前后缀内，长度改为2" },
] as const;

const officialCases = [
  { label: "重复在前", fields: [["输入", "abcacfrar"], ["期望", "4"], ["代表子串", "acfr"], ["覆盖", "多次回退"]] },
  { label: "重复在后", fields: [["输入", "acfrarabc"], ["期望", "4"], ["代表子串", "acfr / rabc"], ["覆盖", "最优在两端"]] },
  { label: "错位重复", fields: [["输入", "arabcacfr"], ["期望", "4"], ["代表子串", "acfr"], ["覆盖", "状态重建"]] },
  { label: "全相同", fields: [["输入", "aaaa"], ["期望", "1"], ["窗口", "任一a"], ["覆盖", "连续重复"]] },
  { label: "全不同", fields: [["输入", "abcdefg"], ["期望", "7"], ["窗口", "全串"], ["覆盖", "只增长"]] },
  { label: "分段重复", fields: [["输入", "aaabbbccc"], ["期望", "2"], ["代表子串", "ab / bc"], ["覆盖", "跨段边界"]] },
  { label: "回文形", fields: [["输入", "abcdcba"], ["期望", "4"], ["代表子串", "abcd / dcba"], ["覆盖", "中心重复"]] },
  { label: "边界旧字符", fields: [["输入", "abcdaef"], ["期望", "6"], ["代表子串", "bcdaef"], ["覆盖", "距离等于窗口"]] },
  { label: "单字符", fields: [["输入", "a"], ["期望", "1"], ["窗口", "a"], ["覆盖", "最小非空"]] },
  { label: "空字符串", fields: [["输入", "空串"], ["期望", "0"], ["循环", "不进入"], ["覆盖", "空边界"]] },
] as const;

export function LongestSubstringTraceLab() {
  const [cursor, setCursor] = useState(trace.length - 1);
  const current = trace[cursor];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-9 gap-1.5">
          {trace.map((item, index) => (
            <button
              key={item.index}
              type="button"
              onClick={() => setCursor(index)}
              aria-label={"查看下标" + item.index + "字符" + item.char}
              aria-pressed={cursor === index}
              className={"flex h-12 items-center justify-center border text-base font-semibold " + (cursor === index ? "border-accent bg-accent/15 text-accent" : "border-border bg-background text-secondary")}
            >
              {item.char}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-4">
          <div className="border border-border bg-background p-3"><div className="text-xs text-muted">上次位置</div><div className="mt-1 font-semibold text-primary">{current.previous}</div></div>
          <div className="border border-border bg-background p-3"><div className="text-xs text-muted">距离</div><div className="mt-1 font-semibold text-primary">{current.distance}</div></div>
          <div className="border border-border bg-background p-3"><div className="text-xs text-muted">当前长度</div><div className="mt-1 font-semibold text-primary">{current.before} → {current.after}</div></div>
          <div className="border border-border bg-background p-3"><div className="text-xs text-muted">历史最大</div><div className="mt-1 font-semibold text-success">{current.best}</div></div>
        </div>
        <div className="mt-3 border border-border bg-background p-3 text-sm text-secondary">
          当前无重复后缀：<strong className="text-primary">{current.window}</strong>。{current.branch}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        点击abcacfrar中的字符，观察curLength如何由上次位置和当前后缀共同决定。
      </figcaption>
    </figure>
  );
}

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

export function LongestSubstringOfficialCaseLab() {
  return <CodingInterviewLab cases={officialCases} caption="切换作者main实际执行的10组输入；蛮力法和动态规划法都与同一期望值比较。" />;
}
