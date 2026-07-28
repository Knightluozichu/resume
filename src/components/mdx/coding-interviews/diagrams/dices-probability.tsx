"use client";

import { useState } from "react";

const distributions = [
  { dice: 1, min: 1, counts: [1, 1, 1, 1, 1, 1] },
  { dice: 2, min: 2, counts: [1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1] },
  { dice: 3, min: 3, counts: [1, 3, 6, 10, 15, 21, 25, 27, 27, 25, 21, 15, 10, 6, 3, 1] },
  { dice: 4, min: 4, counts: [1, 4, 10, 20, 35, 56, 80, 104, 125, 140, 146, 140, 125, 104, 80, 56, 35, 20, 10, 4, 1] },
] as const;
export function DicesProbabilityStateDiagram() {
  const counts = [1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1];
  const max = 6;
  const baseY = 290;
  const barW = 46;
  const slotX = (i: number) => 90 + i * 60;
  const barH = (c: number) => Math.round((c / max) * 180);
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 820 420"
          role="img"
          aria-label="n 个骰子点数和的概率分布图。以 2 个骰子为例，和 2 到 12 的有序结果数依次为 1、2、3、4、5、6、5、4、3、2、1，关于和 7 对称，总样本 36。动态规划递推：f(n,s) 等于 f(n-1,s-1) 到 f(n-1,s-6) 之和，即最后一颗骰子可能是 1 到 6 点。概率为该和的计数除以 6 的 n 次方。"
          className="mx-auto block h-auto w-full max-w-[820px]"
        >
          <text x="410" y="34" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">点数和分布（以 2 骰为例）：计数关于峰值对称</text>
          {/* 坐标轴 */}
          <line x1="70" y1={baseY} x2="760" y2={baseY} stroke="var(--border)" strokeWidth="1.4" />
          {/* 柱状图 */}
          {counts.map((c, i) => {
            const sum = i + 2;
            const peak = c === max;
            return (
              <g key={sum}>
                <rect x={slotX(i)} y={baseY - barH(c)} width={barW} height={barH(c)} rx="3" fill={peak ? "var(--success)" : "var(--accent)"} fillOpacity={peak ? 0.3 : 0.18} stroke={peak ? "var(--success)" : "var(--accent)"} strokeWidth="1.3" />
                <text x={slotX(i) + barW / 2} y={baseY - barH(c) - 6} textAnchor="middle" fontSize="11" fontWeight="700" fontFamily="monospace" fill={peak ? "var(--success)" : "var(--accent)"}>{c}</text>
                <text x={slotX(i) + barW / 2} y={baseY + 18} textAnchor="middle" fontSize="11" fontFamily="monospace" fill="var(--text-secondary)">{sum}</text>
              </g>
            );
          })}
          <text x="410" y={baseY + 40} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">点数和 s（2..12）；峰值和 7 有 6 种，总样本 6² = 36</text>
          {/* 递推 */}
          <text x="410" y="376" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">递推：f(n, s) = Σ f(n-1, s-i)，i=1..6（末颗骰子的 6 种点数）</text>
          <text x="410" y="402" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">n 骰可达和 n..6n，共 5n+1 个状态；概率 = 计数 / 6ⁿ。滚动数组只需上一轮与当前轮两张表。</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        计数数组只需覆盖可达和；概率分母来自所有等可能的有序投掷结果。
      </figcaption>
    </figure>
  );
}
export function DicesProbabilityDistributionChart() {
  const state = distributions[3];
  const max = Math.max(...state.counts);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <div className="flex min-w-[900px] items-end gap-2 border-b border-border px-2 pt-5">
          {state.counts.map((count, index) => (
            <div key={index} className="flex flex-1 flex-col items-center justify-end">
              <span className="mb-1 text-[10px] text-muted">{count}</span>
              <div className={(index === 10 ? "bg-success" : "bg-accent") + " w-full min-w-4"} style={{ height: 24 + Math.round((count / max) * 130) }} />
              <span className="mt-1 text-[10px] text-secondary">{state.min + index}</span>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        四颗骰子的计数关于和 14 对称，峰值 146；两端和 4、24 都只有一种路径。
      </figcaption>
    </figure>
  );
}
