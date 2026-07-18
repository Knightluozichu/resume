"use client";

import { useState } from "react";

import { CodingInterviewLab } from "./official-lab";

const traceStates = [
  { label: "分段", value: "ab | cdefg", first: "A = ab", second: "B = cdefg", action: "定位 n = 2", note: "目标是把 AB 变成 BA" },
  { label: "翻 A", value: "ba | cdefg", first: "reverse(A)", second: "B 不变", action: "Reverse(0, 1)", note: "前段字符次序暂时反转" },
  { label: "翻 B", value: "ba | gfedc", first: "reverse(A)", second: "reverse(B)", action: "Reverse(2, 6)", note: "后段也变成逆序，得到 reverse(A)reverse(B)" },
  { label: "翻全部", value: "cdefg | ab", first: "B 恢复", second: "A 恢复", action: "Reverse(0, 6)", note: "整体反转交换两段位置，并同时恢复两段内部顺序" },
] as const;

const officialCases = [
  { label: "左旋 2 位", fields: [["输入", "abcdefg"], ["n", "2"], ["输出", "cdefgab"], ["用途", "标准三次翻转"]] },
  { label: "左旋 1 位", fields: [["输入", "abcdefg"], ["n", "1"], ["输出", "bcdefga"], ["用途", "最小有效 n"]] },
  { label: "左旋 6 位", fields: [["输入", "abcdefg"], ["n", "6"], ["输出", "gabcdef"], ["用途", "最大有效 n"]] },
  { label: "空指针", fields: [["输入", "nullptr"], ["n", "6"], ["输出", "nullptr"], ["用途", "入口防御"]] },
  { label: "旋转 0 位", fields: [["输入", "abcdefg"], ["n", "0"], ["输出", "abcdefg"], ["用途", "无操作"]] },
  { label: "旋转整长", fields: [["输入", "abcdefg"], ["n", "7"], ["输出", "abcdefg"], ["用途", "作者边界"]] },
] as const;

export function LeftRotatePartitionDiagram() {
  const blocks = [
    ["原串 AB", "ab", "cdefg", "A 在前，B 在后"],
    ["目标 BA", "cdefg", "ab", "两段换位，段内不变"],
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="grid gap-3 border border-border bg-elevated p-4 sm:grid-cols-2 sm:p-5">
        {blocks.map(([title, first, second, note], row) => <div key={title} className="border border-border bg-background p-4"><div className="text-xs font-semibold text-primary">{title}</div><div className="mt-3 grid grid-cols-[2fr_5fr] gap-2 text-center font-mono text-sm"><div className={(row === 0 ? "border-accent bg-accent/10 text-accent" : "border-success bg-success/10 text-success") + " border p-3"}>{first}</div><div className={(row === 0 ? "border-success bg-success/10 text-success" : "border-accent bg-accent/10 text-accent") + " border p-3"}>{second}</div></div><div className="mt-3 text-xs text-secondary">{note}</div></div>)}
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        左旋 n 位就是把前段 A 搬到后段 B 之后，将 AB 变成 BA。
      </figcaption>
    </figure>
  );
}

export function LeftRotateTraceLab() {
  const [cursor, setCursor] = useState(0);
  const state = traceStates[cursor];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-4 gap-2">{traceStates.map((item, index) => <button key={item.label} type="button" onClick={() => setCursor(index)} aria-pressed={cursor === index} className={"h-11 border text-xs font-semibold " + (cursor === index ? "border-accent bg-accent/15 text-accent" : "border-border bg-background text-secondary")}>{item.label}</button>)}</div>
        <div className="mt-4 border border-accent bg-accent/10 p-4 text-center font-mono text-lg text-primary">{state.value}</div>
        <div className="mt-2 grid gap-2 sm:grid-cols-3">
          <div className="border border-border bg-background p-3 text-sm text-secondary">{state.first}</div>
          <div className="border border-border bg-background p-3 text-sm text-secondary">{state.second}</div>
          <div className="border border-success bg-success/10 p-3 text-sm font-semibold text-success">{state.action}</div>
        </div>
        <p className="mb-0 mt-3 border-l-4 border-accent bg-background p-3 text-sm text-secondary">{state.note}</p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        在 abcdefg 上逐步执行 n 等于 2 的三次闭区间翻转。
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
          <tbody>{rows.map((row) => <tr key={row[0] + row[1]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 2 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
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

export function LeftRotateOfficialCaseLab() {
  return <CodingInterviewLab cases={officialCases} caption="作者 6 组测试覆盖三种有效位数、空指针、零位与整长旋转。" />;
}
