"use client";

import { useState } from "react";

const prices = [9, 11, 5, 7, 16, 1, 4, 2] as const;
export function MaximalProfitTimelineDiagram() {
  const chartX = (day: number) => 80 + day * 94.3;
  const chartY = (p: number) => 280 - ((p - 1) / 15) * 220;
  const points = prices.map((p, i) => `${chartX(i)},${chartY(p)}`).join(" ");
  const buyDay = 2;
  const sellDay = 4;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 820 400"
          role="img"
          aria-label="股票最大利润时间线图。价格依次为 9、11、5、7、16、1、4、2。在时刻 2 价格 5 买入、时刻 4 价格 16 卖出，利润 11 是最大差值。后面出现的更低价格 1 不能与已经过去的 16 配对，因为买入必须早于卖出。"
          className="mx-auto block h-auto w-full max-w-[820px]"
        >
          <defs>
            <marker id="profit-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="var(--accent)" /></marker>
          </defs>
          <text x="410" y="34" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">最大利润 = 某个卖出日价格 − 此前历史最低价</text>
          {/* 坐标轴 */}
          <line x1="80" y1="280" x2="760" y2="280" stroke="var(--border)" strokeWidth="1.4" />
          <line x1="80" y1="50" x2="80" y2="280" stroke="var(--border)" strokeWidth="1.4" />
          <text x="60" y="64" textAnchor="end" fontSize="10" fill="var(--text-secondary)">16</text>
          <text x="60" y="284" textAnchor="end" fontSize="10" fill="var(--text-secondary)">1</text>
          {/* 价格折线 */}
          <polyline points={points} fill="none" stroke="var(--accent)" strokeWidth="2.4" />
          {prices.map((p, i) => (
            <g key={i}>
              <circle cx={chartX(i)} cy={chartY(p)} r="4.5" fill={i === buyDay ? "var(--success)" : i === sellDay ? "var(--accent)" : "var(--bg)"} stroke={i === buyDay ? "var(--success)" : i === sellDay ? "var(--accent)" : "var(--border)"} strokeWidth="1.6" />
              <text x={chartX(i)} y={chartY(p) - 12} textAnchor="middle" fontSize="11" fontWeight="700" fontFamily="monospace" fill="var(--text-primary)">{p}</text>
              <text x={chartX(i)} y={300} textAnchor="middle" fontSize="10" fill="var(--text-secondary)">t{i}</text>
            </g>
          ))}
          {/* 买入/卖出标注 */}
          <text x={chartX(buyDay)} y={chartY(5) + 26} textAnchor="middle" fontSize="12" fontWeight="800" fill="var(--success)">买入 5</text>
          <text x={chartX(sellDay)} y={chartY(16) + 24} textAnchor="middle" fontSize="12" fontWeight="800" fill="var(--accent)">卖出 16</text>
          <path d={`M ${chartX(buyDay) + 34} ${chartY(5) - 30} C ${chartX(3)} ${chartY(5) - 70}, ${chartX(3.5)} ${chartY(16) - 40}, ${chartX(sellDay) - 34} ${chartY(16) - 6}`} fill="none" stroke="var(--success)" strokeWidth="2" strokeDasharray="5 4" markerEnd="url(#profit-arrow)" />
          <text x={chartX(3)} y={chartY(5) - 66} textAnchor="middle" fontSize="13" fontWeight="800" fill="var(--success)">利润 16 − 5 = 11</text>
          {/* 说明 */}
          <text x="410" y="340" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">扫描时先以“此前最低价”算当天卖出的利润，再把当天价格纳入未来买入候选。</text>
          <text x="410" y="364" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">后面出现的 1 不能与已过去的 16 配对：买入必须早于卖出。一次遍历 O(n)、O(1)。</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        后面虽出现更低的 1，却不能与已经过去的 16 组成合法交易。
      </figcaption>
    </figure>
  );
}
export function MaximalProfitInvariantMap() {
  const rows = [
    ["进入卖出日 i", "min = prices[0..i-1] 的最小值", "买入严格早于卖出", "不能先纳入 prices[i]"],
    ["计算 currentDiff", "prices[i] - min", "以 i 卖出的最佳交易", "可以为负数"],
    ["更新 maxDiff", "所有已扫描卖出日的最大差值", "保留全局最佳", "初值是首个合法交易"],
    ["准备下一日", "min 纳入 prices[i]", "新低价只服务未来卖出日", "不与过去高价配对"],
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[900px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["扫描时刻", "不变式", "保证", "易错边界"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={`${row[0]}-${index}`} className={"p-3 " + (index === 2 ? "font-semibold text-success" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        先用历史最低价计算当天卖出利润，再把当天价格纳入未来买入候选。
      </figcaption>
    </figure>
  );
}

export function MaximalProfitContractDiagram() {
  const rows = [
    ["作者交易语义", "必须选两个不同时间点", "递减序列返回负数", "Test3、Test7"],
    ["常见平台变体", "允许不交易", "答案至少为 0", "需要显式改初值"],
    ["入口条件", "源码使用 nullptr 且 length<2", "只覆盖 nullptr,0", "正确保护应使用或"],
    ["时序", "买入下标小于卖出下标", "不能用后来的低价买过去高价", "扫描最低值只含此前"],
    ["数值类型", "int 价格与差值", "普通样例安全", "极值相减可能溢出"],
    ["复杂度", "一次线性扫描", "O(n) 时间、O(1) 空间", "暴力枚举 O(n²)"],
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[940px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["维度", "源码或变体", "行为", "验证点"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={`${row[0]}-${index}`} className={"p-3 " + (index === 2 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        “必须交易”和“最多交易一次”是不同契约；不能只改一句题意却保留相同初始化。
      </figcaption>
    </figure>
  );
}
