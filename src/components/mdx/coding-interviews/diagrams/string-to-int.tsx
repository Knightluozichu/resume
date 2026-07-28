"use client";

import { useState } from "react";
export function StringToIntContractDiagram() {
  const phases = [
    { index: "1", title: "重置", rule: "status=kInvalid", reason: "不沿用上次状态" },
    { index: "2", title: "入口检查", rule: "非空指针且非空串", reason: "否则返回无效零" },
    { index: "3", title: "符号检查", rule: "可选一个 + 或 -", reason: "符号后必须有数字" },
    { index: "4", title: "数字核心", rule: "每位必须 0…9", reason: "负向累加防溢出" },
    { index: "5", title: "提交", rule: "到达终止符", reason: "完整消费才 kValid" },
  ] as const;
  const cardW = 138;
  const cardH = 150;
  const gapW = 12;
  const rowX = 40;
  const cx = (i: number) => rowX + i * (cardW + gapW);
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 820 360"
          role="img"
          aria-label="把字符串转换成整数图。作者采用事务式解析：默认无效，完整消费后才提交有效。五个阶段：①重置状态为 kInvalid；②入口检查非空指针且非空串；③可选消费一个正负号，符号后必须还有数字；④数字核心，每个字符都必须是 0 到 9，负数按负方向累加 num = num×10 - digit 以避免先得到正的 2147483648 溢出；⑤指针走到终止符且未越界才置 kValid。返回 0 有两种含义，必须与状态一起读。"
          className="mx-auto block h-auto w-full max-w-[820px]"
        >
          <defs>
            <marker id="si-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="var(--accent)" /></marker>
          </defs>
          <text x="410" y="34" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">事务式解析：默认无效，完整消费后提交有效</text>
          {phases.map((p, i) => (
            <g key={p.index}>
              <rect x={cx(i)} y={64} width={cardW} height={cardH} rx="8" fill="var(--accent)" fillOpacity="0.07" stroke="var(--accent)" strokeWidth="1.4" />
              <circle cx={cx(i) + 22} cy={86} r="13" fill="var(--accent)" fillOpacity="0.16" stroke="var(--accent)" strokeWidth="1.4" />
              <text x={cx(i) + 22} y={91} textAnchor="middle" fontSize="13" fontWeight="800" fill="var(--accent)">{p.index}</text>
              <text x={cx(i) + 44} y={91} fontSize="13" fontWeight="800" fill="var(--text-primary)">{p.title}</text>
              <text x={cx(i) + cardW / 2} y={130} textAnchor="middle" fontSize="11" fontFamily="monospace" fill="var(--accent)">{p.rule}</text>
              <text x={cx(i) + cardW / 2} y={160} textAnchor="middle" fontSize="10" fill="var(--text-secondary)">{p.reason}</text>
              {i < phases.length - 1 && <path d={`M ${cx(i) + cardW} ${64 + cardH / 2} L ${cx(i + 1)} ${64 + cardH / 2}`} stroke="var(--accent)" strokeWidth="1.6" markerEnd="url(#si-arrow)" />}
            </g>
          ))}
          <text x="410" y="256" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">负向累加：num = num × 10 − digit，可直接表示 INT_MIN（-2147483648）而不溢出。</text>
          <text x="410" y="282" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">越界（如 +2147483648、-2147483649）或非法字符（1a33）立即失败；作者不跳过空白。</text>
          <text x="410" y="316" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">返回值 0 有“合法零”与“失败”两种含义，必须与全局状态 kValid/kInvalid 一起读取。</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        作者采用“默认无效，完整消费后提交有效”的事务式解析流程。
      </figcaption>
    </figure>
  );
}
export function StringToIntBoundaryMap() {
  const rows = [
    ["+2147483647", "2147483647", "不超过 INT_MAX", "0x7FFFFFFF", "有效"],
    ["+2147483648", "2147483648", "大于 INT_MAX", "上溢 1", "无效，返回 0"],
    ["-2147483647", "-2147483647", "不低于 INT_MIN", "下界前 1", "有效"],
    ["-2147483648", "-2147483648", "恰好等于 INT_MIN", "0x80000000", "有效"],
    ["-2147483649", "-2147483649", "小于 INT_MIN", "下溢 1", "无效，返回 0"],
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[850px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["输入", "累加结果", "范围判断", "位置", "作者结果"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 4 ? (cell === "有效" ? "font-semibold text-success" : "font-semibold text-danger") : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        32 位有符号范围不对称；负向累加可以直接表示 INT_MIN。
      </figcaption>
    </figure>
  );
}

export function StringToIntValidityDiagram() {
  const rows = [
    ["\"0\"", "0", "kValid", "数字完整消费"],
    ["\"+0\"", "0", "kValid", "合法正号与数字"],
    ["\"\"", "0", "kInvalid", "没有数字"],
    ["\"+\"", "0", "kInvalid", "符号后没有数字"],
    ["\"1a33\"", "0", "kInvalid", "中途遇到非法字符"],
    ["\" 123\"", "0", "kInvalid", "作者不跳过空白"],
    ["\"123 \"", "0", "kInvalid", "作者不接受尾随字符"],
    ["\"2147483648\"", "0", "kInvalid", "超出 int 范围"],
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["输入", "返回值", "状态", "为何可区分"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 2 ? (cell === "kValid" ? "font-semibold text-success" : "font-semibold text-danger") : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        返回值 0 有两种含义，必须与状态一起读取，才能区分合法零与失败。
      </figcaption>
    </figure>
  );
}
