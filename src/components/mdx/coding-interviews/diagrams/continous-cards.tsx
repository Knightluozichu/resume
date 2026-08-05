"use client";

import { useState } from "react";
export function ContinuousCardsSortDiagram() {
  const PRESETS = [
    {
      label: "缺 5 一张王补上",
      original: [0, 3, 2, 6, 4],
    },
    {
      label: "缺 2、5 王不够",
      original: [0, 3, 1, 6, 4],
    },
    {
      label: "非零对子直接失败",
      original: [0, 3, 3, 6, 4],
    },
    {
      label: "五张全王",
      original: [0, 0, 0, 0, 0],
    },
  ];
  const [presetIndex, setPresetIndex] = useState(0);
  const original = PRESETS[presetIndex].original;
  const sorted = [...original].sort((a, b) => a - b);
  const jokers = sorted.filter((c) => c === 0).length;
  const nonZero = sorted.filter((c) => c !== 0);
  const hasDup = new Set(nonZero).size !== nonZero.length;
  let gaps = 0;
  for (let i = 1; i < nonZero.length; i += 1) {
    gaps += nonZero[i] - nonZero[i - 1] - 1;
  }
  const isStraight = !hasDup && gaps <= jokers;
  const cardW = 60;
  const cardH = 52;
  const gapW = 10;
  const rowX = 240;
  const cx = (i: number) => rowX + i * (cardW + gapW);
  const lineY = 288;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {PRESETS.map((preset, i) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => setPresetIndex(i)}
              aria-pressed={i === presetIndex}
              className={"rounded-control border px-3 py-1.5 text-sm transition-colors " + (i === presetIndex ? "border-accent text-accent" : "border-border text-secondary hover:border-accent")}
            >
              {preset.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setPresetIndex(0)}
            className="rounded-control border border-border px-3 py-1.5 text-sm text-secondary transition-colors hover:border-accent hover:text-accent"
          >
            重置
          </button>
        </div>
        <svg
          viewBox="0 0 820 420"
          role="img"
          aria-label={`扑克牌顺子判定交互图。当前牌组 ${original.join("、")}，排序后 ${sorted.join("、")}。王 ${jokers} 张，非零 ${nonZero.join("、")}${hasDup ? "，存在对子" : `，空缺 ${gaps}`}，判定${isStraight ? "为顺子" : "不是顺子"}。`}
          className="mx-auto block h-auto w-full max-w-[820px]"
        >
          <defs>
            <marker id="cards-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="var(--accent)" /></marker>
          </defs>
          <text x="410" y="34" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">排序聚 0，再数空缺：王的张数 ≥ 空缺总数即顺子</text>
          {/* 原始顺序 */}
          <text x="410" y="62" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">原始抽牌顺序（点击上方按钮切换牌组）</text>
          {original.map((card, i) => (
            <g key={"o" + i}>
              <rect x={cx(i)} y={72} width={cardW} height={cardH} rx="6" fill={card === 0 ? "var(--success)" : "var(--bg)"} fillOpacity={card === 0 ? 0.12 : 1} stroke={card === 0 ? "var(--success)" : "var(--border)"} strokeWidth="1.4" />
              <text x={cx(i) + cardW / 2} y={72 + cardH / 2 + 6} textAnchor="middle" fontSize="18" fontWeight="700" fontFamily="monospace" fill={card === 0 ? "var(--success)" : "var(--text-primary)"}>{card}</text>
            </g>
          ))}
          {/* 向下箭头 */}
          <path d="M 410 132 L 410 158" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#cards-arrow)" />
          <text x="430" y="150" fontSize="11" fill="var(--accent)">排序</text>
          {/* 排序后 */}
          <text x="410" y="184" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">排序后：0（王）聚左，非零牌递增</text>
          {sorted.map((card, i) => (
            <g key={"s" + i}>
              <rect x={cx(i)} y={194} width={cardW} height={cardH} rx="6" fill={card === 0 ? "var(--success)" : "var(--accent)"} fillOpacity={card === 0 ? 0.12 : 0.1} stroke={card === 0 ? "var(--success)" : "var(--accent)"} strokeWidth="1.4" />
              <text x={cx(i) + cardW / 2} y={194 + cardH / 2 + 6} textAnchor="middle" fontSize="18" fontWeight="700" fontFamily="monospace" fill={card === 0 ? "var(--success)" : "var(--accent)"}>{card}</text>
            </g>
          ))}
          {/* 数轴空缺 */}
          <text x="410" y={lineY - 12} textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{hasDup ? "存在非零对子：直接判负" : `非零牌在数轴上的空缺：共 ${gaps} 处`}</text>
          {nonZero.length > 0 && (
            <g>
              {nonZero.map((n, i) => {
                const x = 250 + i * 70;
                return (
                  <g key={"nn" + i}>
                    <rect x={x} y={lineY} width={58} height={46} rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.2" />
                    <text x={x + 29} y={lineY + 29} textAnchor="middle" fontSize="16" fontWeight="700" fontFamily="monospace" fill="var(--accent)">{n}</text>
                  </g>
                );
              })}
            </g>
          )}
          <text x="410" y={lineY + 78} textAnchor="middle" fontSize="13" fontWeight="700" fill={isStraight ? "var(--success)" : "var(--danger)"}>{hasDup ? "非零重复 → 王无法消除对子，不是顺子" : `空缺 = ${gaps}，王 = ${jokers} → ${gaps <= jokers ? "恰好补齐，是顺子" : "王不够，不是顺子"}`}</text>
          <text x="410" y={lineY + 102} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">条件：空缺数 ≤ 王数，且无非零对子。</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        排序把所有 0 聚到左侧，也让重复牌与相邻空缺能够一次线性扫描发现；点击按钮可切换牌组验证判定。
      </figcaption>
    </figure>
  );
}
export function ContinuousCardsJokerBudgetMap() {
  const rows = [
    ["0,2,3,4,6", "1", "缺 5，共 1", "刚好补齐", "true"],
    ["0,1,3,4,6", "1", "缺 2、5，共 2", "预算不足", "false"],
    ["0,0,1,3,5", "2", "缺 2、4，共 2", "刚好补齐", "true"],
    ["0,0,0,1,5", "3", "缺 2、3、4，共 3", "刚好补齐", "true"],
    ["0,0,0,1,7", "3", "缺 2..6，共 5", "预算不足", "false"],
    ["0,0,0,1,1", "3", "非零牌重复", "不能用王消除对子", "false"],
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[880px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["排序结果", "王的数量", "需要填的空缺", "预算结论", "结果"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={`${row[0]}-${index}`} className={"p-3 " + (index === 4 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        0 只能填缺失点数，不能让两张相同非零牌同时出现在一条顺子中。
      </figcaption>
    </figure>
  );
}

export function ContinuousCardsContractDiagram() {
  const rows = [
    ["牌面映射", "A=1，2..10，J=11，Q=12，K=13", "0 代表大小王", "不支持 A 同时作 14"],
    ["作者长度", "指针非空且 length 大于 0", "可判断任意正长度", "题面实际固定抽 5 张"],
    ["输入副作用", "qsort 原地排序", "调用后顺序改变", "现代接口可复制后排序"],
    ["重复规则", "相邻非零值相同立即 false", "王不能消除对子", "全 0 没有非零重复"],
    ["空缺规则", "所有相邻差减 1 后求和", "空缺不超过 0 数量", "剩余王可补区间两端"],
    ["比较器", "用两个 int 相减", "普通牌面安全", "通用整数可能溢出"],
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[940px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["维度", "作者实现", "结论", "工程边界"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={`${row[0]}-${index}`} className={"p-3 " + (index === 2 ? "font-semibold text-success" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        算法核心适用于任意长度，但固定五张牌、合法牌面和是否保留输入顺序属于接口契约。
      </figcaption>
    </figure>
  );
}
