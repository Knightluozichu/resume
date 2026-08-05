"use client";

import { useState } from "react";
export function NumberOf1RecursiveDecompositionDiagram() {
  const parts = [
    { label: "最高位为 1", detail: "10000～19999", value: "10000 次", color: "var(--success)" },
    { label: "其余位为 1", detail: "2 × 4 × 1000", value: "8000 次", color: "var(--accent)" },
    { label: "递归后缀 F(1345)", detail: "去掉首位再算", value: "821 次", color: "var(--warning)" },
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 820 420"
          role="img"
          aria-label="1 到 n 整数中 1 出现的次数图。以 n=21345 为例，按最高位拆解：最高位（万位）为 1 的贡献是 10000 到 19999 共 10000 次；其余四个位为 1 的贡献是 首位2 × 位数4 × 1000 共 8000 次；去掉首位后的后缀 1345 递归计算得 821 次。三者相加 10000+8000+821 = 18821。后缀继续同样拆解：1345→345→45→5（基例）。"
          className="mx-auto block h-auto w-full max-w-[820px]"
        >
          <text x="410" y="34" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">按最高位拆解：F(n) = 最高位贡献 + 其余位贡献 + F(后缀)</text>
          {/* 顶部 n */}
          <rect x="310" y="52" width="200" height="46" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.6" />
          <text x="410" y="80" textAnchor="middle" fontSize="16" fontWeight="800" fontFamily="monospace" fill="var(--accent)">n = 21345</text>
          <text x="410" y="116" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">首位 2、长度 5，拆为三部分</text>
          {/* 三部分 */}
          {parts.map((p, i) => {
            const x = 70 + i * 240;
            return (
              <g key={p.label}>
                <path d={`M 410 100 L ${x + 105} 150`} stroke="var(--border)" strokeWidth="1.2" />
                <rect x={x} y={150} width={210} height={92} rx="8" fill={p.color} fillOpacity="0.1" stroke={p.color} strokeWidth="1.4" />
                <text x={x + 105} y={176} textAnchor="middle" fontSize="12" fontWeight="800" fill={p.color}>{p.label}</text>
                <text x={x + 105} y={200} textAnchor="middle" fontSize="11" fontFamily="monospace" fill="var(--text-secondary)">{p.detail}</text>
                <text x={x + 105} y={226} textAnchor="middle" fontSize="15" fontWeight="800" fontFamily="monospace" fill={p.color}>{p.value}</text>
              </g>
            );
          })}
          {/* 求和 */}
          <text x="410" y="288" textAnchor="middle" fontSize="15" fontWeight="800" fill="var(--success)">10000 + 8000 + 821 = 18821</text>
          {/* 递归链 */}
          <text x="410" y="326" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">后缀同样拆解：21345 → 1345 → 345 → 45 → 5（基例返回 1）</text>
          <text x="410" y="352" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">首位&gt;1 贡献整块 10^(len-1)；首位=1 贡献 后缀+1；其余位 = 首位×(len-1)×10^(len-2)。</text>
          <text x="410" y="388" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">等价按位视角（high/cur/low）逐位累加也得 18821；把对 n 个数的枚举降为对十进制位的处理。</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        作者每层把答案拆成最高位贡献、其余位贡献和去掉首字符后的递归贡献。
      </figcaption>
    </figure>
  );
}
export function NumberOf1HighestDigitDiagram() {
  const rows = [
    ["first等于0", "0", "最高位范围尚未进入1区间", "递归处理后缀"],
    ["first等于1", "suffix + 1", "从10的幂到n，后缀从0走到suffix", "21345的千位递归层"],
    ["first大于1", "10的length-1次方", "完整覆盖首位为1的一整块", "21345贡献10000"],
    ["其余位置", "first × (length-1) × 10的length-2次方", "每个非首位在完整前缀块中均匀轮换", "21345贡献8000"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[980px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["首位条件", "贡献", "区间解释", "示例"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={`${row[0]}-${index}`} className={"p-3 " + (index === 1 ? "font-semibold text-success" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        首位是否越过1决定最高位贡献是零、部分区间还是完整一块。
      </figcaption>
    </figure>
  );
}

export function NumberOf1ComplexityDiagram() {
  const rows = [
    ["逐数拆位", "作者解法一", "O(n × 位数)", "O(1)", "简单参考实现"],
    ["字符串递归", "作者解法二", "源码约O(位数²)", "O(位数)栈", "每层strlen和幂循环"],
    ["high/cur/low迭代", "等价扩展", "O(位数)", "O(1)", "逐十进制位统计"],
    ["预计算幂的递归", "优化作者结构", "O(位数)", "O(位数)栈", "避免每层重复求幂"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[900px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["方法", "身份", "时间", "空间", "说明"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={`${row[0]}-${index}`} className={"p-3 " + (index === 2 ? "font-semibold text-warning" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        数学分解把对n个整数的枚举降为对十进制位的处理；源码常数虽小，仍应区分原实现与优化版。
      </figcaption>
    </figure>
  );
}
