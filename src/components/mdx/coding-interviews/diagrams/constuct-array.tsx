"use client";

import { useState } from "react";

import { CodingInterviewLab } from "./official-lab";

const prefixStates = [
  { index: 0, output: "1, _, _, _, _", note: "B[0] 左侧为空积，写入 1" },
  { index: 1, output: "1, 1, _, _, _", note: "B[1] = B[0] × A[0] = 1" },
  { index: 2, output: "1, 1, 2, _, _", note: "B[2] = B[1] × A[1] = 2" },
  { index: 3, output: "1, 1, 2, 6, _", note: "B[3] = B[2] × A[2] = 6" },
  { index: 4, output: "1, 1, 2, 6, 24", note: "B[4] = B[3] × A[3] = 24" },
] as const;

const suffixStates = [
  { index: 4, temp: 1, output: "1, 1, 2, 6, 24", note: "末项右侧为空积，无需进入循环" },
  { index: 3, temp: 5, output: "1, 1, 2, 30, 24", note: "temp ×= A[4]，再乘入 B[3]" },
  { index: 2, temp: 20, output: "1, 1, 40, 30, 24", note: "temp ×= A[3]，得到右积 4×5" },
  { index: 1, temp: 60, output: "1, 60, 40, 30, 24", note: "temp ×= A[2]，得到右积 3×4×5" },
  { index: 0, temp: 120, output: "120, 60, 40, 30, 24", note: "temp ×= A[1]，完成最终数组" },
] as const;

const officialCases = [
  { label: "Test1 无零", fields: [["输入", "1,2,3,4,5"], ["输出", "120,60,40,30,24"], ["零数量", "0"], ["用途", "标准双扫描"]] },
  { label: "Test2 一个零", fields: [["输入", "1,2,0,4,5"], ["输出", "0,0,40,0,0"], ["零数量", "1"], ["用途", "零位置保留其余积"]] },
  { label: "Test3 两个零", fields: [["输入", "1,2,0,4,0"], ["输出", "0,0,0,0,0"], ["零数量", "2"], ["用途", "每项都含一个零"]] },
  { label: "Test4 正负", fields: [["输入", "1,-2,3,-4,5"], ["输出", "120,-60,40,-30,24"], ["负数", "2 个"], ["用途", "符号传播"]] },
  { label: "Test5 两元素", fields: [["输入", "1,-2"], ["输出", "-2,1"], ["长度", "2"], ["用途", "最小有效长度"]] },
] as const;

export function ConstructArrayMatrixDiagram() {
  const values = [1, 2, 3, 4, 5];
  const cellW = 88;
  const cellH = 50;
  const gap = 4;
  const gridX = 180;
  const gridY = 92;
  const colX = (j: number) => gridX + j * (cellW + gap);
  const rowY = (i: number) => gridY + i * (cellH + gap);
  const legend = [
    { label: "下三角：左侧前缀积（第一遍左→右）", color: "var(--success)" },
    { label: "对角线：排除 A[i]（不乘自身）", color: "var(--danger)" },
    { label: "上三角：右侧后缀积（第二遍右→左）", color: "var(--accent)" },
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 820 480"
          role="img"
          aria-label="构造数组矩阵图。B[i] 等于 A 中除 A[i] 外所有元素的乘积。把乘积展开成 5 行 5 列矩阵：第 i 行对应 B[i]，对角格 A[i] 被排除，对角左下方的格来自左侧前缀积，由第一遍从左到右扫描得到；对角右上方的格来自右侧后缀积，由第二遍从右到左扫描得到。"
          className="mx-auto block h-auto w-full max-w-[820px]"
        >
          <text x="410" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            B[i] = A[0]×…×A[i-1] · A[i+1]×…×A[n-1]：对角排除，两次扫描填充
          </text>
          {/* 列头 A[j] */}
          {values.map((_, j) => (
            <text key={"col" + j} x={colX(j) + cellW / 2} y={gridY - 14} textAnchor="middle" fontSize="12" fontWeight="700" fontFamily="monospace" fill="var(--text-primary)">
              A[{j}]
            </text>
          ))}
          {/* 行头 B[i] 与矩阵格 */}
          {values.map((_, i) => (
            <g key={"row" + i}>
              <text x={gridX - 16} y={rowY(i) + cellH / 2 + 4} textAnchor="end" fontSize="12" fontWeight="700" fontFamily="monospace" fill="var(--text-primary)">
                B[{i}]
              </text>
              {values.map((v, j) => {
                const excluded = j === i;
                const prefix = j < i;
                const tone = excluded ? "var(--danger)" : prefix ? "var(--success)" : "var(--accent)";
                return (
                  <g key={"cell" + i + "-" + j}>
                    <rect x={colX(j)} y={rowY(i)} width={cellW} height={cellH} rx="5" fill={tone} fillOpacity={excluded ? 0.12 : 0.1} stroke={tone} strokeWidth="1.2" />
                    <text x={colX(j) + cellW / 2} y={rowY(i) + cellH / 2 + 5} textAnchor="middle" fontSize={excluded ? 11 : 14} fontWeight="700" fontFamily="monospace" fill={tone}>
                      {excluded ? "排除" : v}
                    </text>
                  </g>
                );
              })}
            </g>
          ))}
          {/* 图例 */}
          {legend.map((item, idx) => (
            <g key={item.label}>
              <rect x={130} y={392 + idx * 28} width={16} height={16} rx="3" fill={item.color} fillOpacity="0.15" stroke={item.color} strokeWidth="1.2" />
              <text x={156} y={404 + idx * 28} fontSize="12" fill="var(--text-secondary)">{item.label}</text>
            </g>
          ))}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        每一行排除对角元素；下三角由左到右的前缀扫描、上三角由右到左的后缀扫描分别提供，全程不做除法。
      </figcaption>
    </figure>
  );
}

export function ConstructArrayPrefixLab() {
  const [cursor, setCursor] = useState(0);
  const state = prefixStates[cursor];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-5 gap-2">{prefixStates.map((item, index) => <button key={item.index} type="button" onClick={() => setCursor(index)} aria-pressed={cursor === index} className={"h-11 border text-xs font-semibold " + (cursor === index ? "border-success bg-success/15 text-success" : "border-border bg-background text-secondary")}>i={item.index}</button>)}</div>
        <div className="mt-4 border border-success bg-success/10 p-4 font-mono text-sm text-primary">B = [{state.output}]</div>
        <p className="mb-0 mt-3 border-l-4 border-success bg-background p-3 text-sm text-secondary">{state.note}</p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        第一遍从左到右写入每个位置之前的全部输入乘积。
      </figcaption>
    </figure>
  );
}

export function ConstructArraySuffixLab() {
  const [cursor, setCursor] = useState(0);
  const state = suffixStates[cursor];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-5 gap-2">{suffixStates.map((item, index) => <button key={item.index} type="button" onClick={() => setCursor(index)} aria-pressed={cursor === index} className={"h-11 border text-xs font-semibold " + (cursor === index ? "border-accent bg-accent/15 text-accent" : "border-border bg-background text-secondary")}>i={item.index}</button>)}</div>
        <div className="mt-4 grid gap-2 sm:grid-cols-[160px_1fr]">
          <div className="border border-accent bg-accent/10 p-4"><div className="text-xs text-muted">右侧 temp</div><div className="mt-1 font-semibold text-accent">{state.temp}</div></div>
          <div className="border border-border bg-background p-4 font-mono text-sm text-primary">B = [{state.output}]</div>
        </div>
        <p className="mb-0 mt-3 border-l-4 border-accent bg-background p-3 text-sm text-secondary">{state.note}</p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        第二遍从右到左滚动维护后缀积，并原地乘入已保存的前缀积。
      </figcaption>
    </figure>
  );
}

export function ConstructArrayZeroMap() {
  const rows = [
    ["没有 0", "每个 B[i] 是除自身外全部乘积", "全部位置可非零", "1,2,3,4,5 → 120,60,40,30,24"],
    ["恰好一个 0", "非零位置的乘积都包含该 0", "只有 0 所在位置可能非零", "1,2,0,4,5 → 0,0,40,0,0"],
    ["至少两个 0", "排除任意一个位置后仍剩一个 0", "所有输出都为 0", "1,2,0,4,0 → 全 0"],
    ["包含负数", "符号由排除后的负数个数决定", "双扫描自然处理", "1,-2,3,-4,5 → 120,-60,40,-30,24"],
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[980px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["输入特征", "原因", "结果形态", "官方示例"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 2 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        双扫描从不除以 A[i]，零和负数无需额外分支便可得到正确结构。
      </figcaption>
    </figure>
  );
}

export function ConstructArrayOfficialCaseLab() {
  return <CodingInterviewLab cases={officialCases} caption="作者 5 组测试覆盖零的数量、正负符号以及最小有效长度 2。" />;
}
