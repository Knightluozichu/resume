"use client";

import { useState } from "react";

import { CodingInterviewLab } from "./official-lab";

const prices = [9, 11, 5, 7, 16, 1, 4, 2] as const;

const scanStates = [
  { day: 1, price: 11, minimum: 9, diff: 2, best: 2, note: "买 9、卖 11，建立首个合法交易" },
  { day: 2, price: 5, minimum: 9, diff: -4, best: 2, note: "当天 5 只能作为卖价；下一天起才成为历史最低" },
  { day: 3, price: 7, minimum: 5, diff: 2, best: 2, note: "买 5、卖 7，与当前最佳持平" },
  { day: 4, price: 16, minimum: 5, diff: 11, best: 11, note: "买 5、卖 16，刷新最大利润" },
  { day: 5, price: 1, minimum: 5, diff: -4, best: 11, note: "更低价格出现得太晚，不能配对之前的 16" },
  { day: 6, price: 4, minimum: 1, diff: 3, best: 11, note: "买 1、卖 4，仍不超过 11" },
  { day: 7, price: 2, minimum: 1, diff: 1, best: 11, note: "最终答案保持 11" },
] as const;

const officialCases = [
  { label: "Test1", fields: [["价格", "4,1,3,2,5"], ["买入", "1"], ["卖出", "5"], ["结果", "4"]] },
  { label: "Test2", fields: [["价格", "1,2,4,7,11,16"], ["形态", "严格递增"], ["交易", "1 → 16"], ["结果", "15"]] },
  { label: "Test3", fields: [["价格", "16,11,7,4,2,1"], ["形态", "严格递减"], ["最小亏损", "2 → 1"], ["结果", "-1"]] },
  { label: "Test4", fields: [["价格", "16,16,16,16,16"], ["形态", "全部相同"], ["交易", "任意先后两天"], ["结果", "0"]] },
  { label: "Test5", fields: [["价格", "9,11,5,7,16,1,4,2"], ["买入", "5"], ["卖出", "16"], ["结果", "11"]] },
  { label: "Test6", fields: [["价格", "2,4"], ["唯一交易", "2 → 4"], ["长度", "2"], ["结果", "2"]] },
  { label: "Test7", fields: [["价格", "4,2"], ["唯一交易", "4 → 2"], ["长度", "2"], ["结果", "-2"]] },
  { label: "Test8", fields: [["价格", "nullptr"], ["长度", "0"], ["入口", "无效"], ["结果", "0"]] },
] as const;

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
          <text x="410" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">最大利润 = 某个卖出日价格 − 此前历史最低价</text>
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

export function MaximalProfitScanLab() {
  const [cursor, setCursor] = useState(0);
  const state = scanStates[cursor];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
          {scanStates.map((item, index) => (
            <button key={item.day} type="button" onClick={() => setCursor(index)} aria-pressed={cursor === index} className={"h-11 border text-xs font-semibold " + (cursor === index ? "border-accent bg-accent/15 text-accent" : "border-border bg-background text-secondary")}>
              {item.day}:{item.price}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-4">
          <div className="border border-border bg-background p-3"><div className="text-xs text-muted">当前卖价</div><div className="mt-1 font-semibold text-primary">{state.price}</div></div>
          <div className="border border-success bg-success/10 p-3"><div className="text-xs text-muted">此前最低</div><div className="mt-1 font-semibold text-success">{state.minimum}</div></div>
          <div className="border border-border bg-background p-3"><div className="text-xs text-muted">候选利润</div><div className="mt-1 font-semibold text-primary">{state.diff}</div></div>
          <div className="border border-accent bg-accent/10 p-3"><div className="text-xs text-muted">当前最大</div><div className="mt-1 font-semibold text-accent">{state.best}</div></div>
        </div>
        <p className="mb-0 mt-3 border-l-4 border-accent bg-background p-3 text-sm text-secondary">{state.note}</p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        点击每个卖出时刻，观察此前最低价、当前差值和全局最大差值。
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
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 2 ? "font-semibold text-success" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
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
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 2 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        “必须交易”和“最多交易一次”是不同契约；不能只改一句题意却保留相同初始化。
      </figcaption>
    </figure>
  );
}

export function MaximalProfitOfficialCaseLab() {
  return <CodingInterviewLab cases={officialCases} caption="作者 8 组测试证明其语义是强制一次交易，并覆盖递增、递减、相等、两元素和空输入。" />;
}
