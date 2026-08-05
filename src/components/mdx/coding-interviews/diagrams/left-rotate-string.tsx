"use client";

import { useState } from "react";
export function LeftRotatePartitionDiagram() {
  const A = ["a", "b"];
  const B = ["c", "d", "e", "f", "g"];
  const cellW = 56;
  const cellH = 48;
  const gapW = 6;
  const rowX = 120;
  const cx = (i: number) => rowX + i * (cellW + gapW);
  const Cell = ({ i, ch, tone }: { i: number; ch: string; tone: string }) => (
    <g>
      <rect x={cx(i)} y={0} width={cellW} height={cellH} rx="5" fill={tone} fillOpacity="0.12" stroke={tone} strokeWidth="1.4" />
      <text x={cx(i) + cellW / 2} y={cellH / 2 + 6} textAnchor="middle" fontSize="17" fontWeight="800" fontFamily="monospace" fill={tone}>{ch}</text>
    </g>
  );
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 820 420"
          role="img"
          aria-label="左旋转字符串图。把字符串看成 A 与 B 两段，左旋 n 位就是把 AB 变成 BA。例 abcdefg、n=2：A=ab、B=cdefg，目标 cdefgab。三次翻转法：先翻 A 得 ba|cdefg，再翻 B 得 ba|gfedc，最后整体翻转得 cdefg|ab。原理：(AʳBʳ)ʳ = (Bʳ)ʳ(Aʳ)ʳ = BA。"
          className="mx-auto block h-auto w-full max-w-[820px]"
        >
          <defs>
            <marker id="lr-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="var(--accent)" /></marker>
          </defs>
          <text x="410" y="34" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">左旋 n 位 = 把 AB 变成 BA（例 abcdefg，n=2）</text>
          {/* 原串 AB */}
          <text x={rowX - 16} y={78} textAnchor="end" fontSize="12" fontWeight="700" fill="var(--text-primary)">原串</text>
          <g transform="translate(0,56)">
            {A.map((ch, i) => <Cell key={"a" + i} i={i} ch={ch} tone="var(--accent)" />)}
            {B.map((ch, i) => <Cell key={"b" + i} i={i + A.length} ch={ch} tone="var(--success)" />)}
          </g>
          <text x={cx(0) + cellW / 2} y={128} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">A=ab</text>
          <text x={(cx(2) + cx(6) + cellW) / 2} y={128} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--success)">B=cdefg</text>
          {/* 箭头 */}
          <path d="M 410 140 L 410 164" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#lr-arrow)" />
          {/* 目标 BA */}
          <text x={rowX - 16} y={204} textAnchor="end" fontSize="12" fontWeight="700" fill="var(--text-primary)">目标</text>
          <g transform="translate(0,182)">
            {B.map((ch, i) => <Cell key={"b2" + i} i={i} ch={ch} tone="var(--success)" />)}
            {A.map((ch, i) => <Cell key={"a2" + i} i={i + B.length} ch={ch} tone="var(--accent)" />)}
          </g>
          <text x={(cx(0) + cx(4) + cellW) / 2} y={254} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--success)">B=cdefg</text>
          <text x={cx(6) + cellW / 2} y={254} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">A=ab</text>
          {/* 三次翻转 */}
          <text x="410" y="292" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">三次翻转法（原地、不额外分配）</text>
          <text x="410" y="318" textAnchor="middle" fontSize="12" fontFamily="monospace" fill="var(--accent)">① 翻 A：ab|cdefg → ba|cdefg</text>
          <text x="410" y="342" textAnchor="middle" fontSize="12" fontFamily="monospace" fill="var(--accent)">② 翻 B：ba|cdefg → ba|gfedc</text>
          <text x="410" y="366" textAnchor="middle" fontSize="12" fontFamily="monospace" fill="var(--success)">③ 翻整体：ba|gfedc → cdefg|ab</text>
          <text x="410" y="398" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">原理：(AʳBʳ)ʳ = (Bʳ)ʳ(Aʳ)ʳ = BA；每段二次翻转恢复，整体翻转交换段序。O(n)、O(1)。</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        左旋 n 位就是把前段 A 搬到后段 B 之后，将 AB 变成 BA。
      </figcaption>
    </figure>
  );
}
export function LeftRotateContractMap() {
  const rows = [
    ["nullptr", "任意", "nullptr", "入口直接返回"],
    ["空串", "任意", "空串", "长度不大于 0"],
    ["abcdefg", "-1", "abcdefg", "n 不大于 0"],
    ["abcdefg", "0", "abcdefg", "n 不大于 0"],
    ["abcdefg", "1…6", "执行左旋", "0 小于 n 且 n 小于长度"],
    ["abcdefg", "7", "abcdefg", "n 等于长度"],
    ["abcdefg", "9", "abcdefg", "n 大于长度，不取模"],
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[760px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["输入", "n", "作者结果", "判断"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0] + row[1]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={`${row[0]}-${index}`} className={"p-3 " + (index === 2 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        作者只处理严格位于 0 与长度之间的 n，其他情况保持输入不变。
      </figcaption>
    </figure>
  );
}

export function LeftRotateProofDiagram() {
  const items = [
    ["起点", "A B", "希望得到 B A"],
    ["分别翻转", "Aʳ Bʳ", "两段位置未变，段内反向"],
    ["整体翻转", "(Aʳ Bʳ)ʳ", "整体反转会交换段序"],
    ["反转分配", "(Bʳ)ʳ (Aʳ)ʳ", "每段二次反转恢复"],
    ["终点", "B A", "恰好完成左旋"],
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="grid gap-2 border border-border bg-elevated p-4 sm:grid-cols-5 sm:p-5">{items.map(([title, form, note], index) => <div key={title} className={"border p-3 " + (index === items.length - 1 ? "border-success bg-success/10" : "border-border bg-background")}><div className="text-xs font-semibold text-primary">{title}</div><div className="mt-3 font-mono text-sm text-accent">{form}</div><div className="mt-2 text-xs leading-5 text-secondary">{note}</div></div>)}</div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        反转的自反性与整体段序交换共同证明三次翻转得到 BA。
      </figcaption>
    </figure>
  );
}
