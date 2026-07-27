"use client";

import { useState } from "react";

import { CodingInterviewLab } from "./official-lab";

const roundStates = [
  { round: "初始", left: "0101", right: "0111", xor: "-", carry: "-", note: "5 与 7 等待相加" },
  { round: "第 1 轮", left: "0101", right: "0111", xor: "0010", carry: "1010", note: "相同 1 位产生向左一位的进位" },
  { round: "第 2 轮", left: "0010", right: "1010", xor: "1000", carry: "0100", note: "进位 0010 与暂存和再次碰撞" },
  { round: "第 3 轮", left: "1000", right: "0100", xor: "1100", carry: "0000", note: "进位归零，1100 即十进制 12" },
] as const;

const officialCases = [
  { label: "正数小值", fields: [["num1", "1"], ["num2", "2"], ["结果", "3"], ["用途", "基本异或"]] },
  { label: "多位进位", fields: [["num1", "111"], ["num2", "899"], ["结果", "1010"], ["用途", "连续进位"]] },
  { label: "负正", fields: [["num1", "-1"], ["num2", "2"], ["结果", "1"], ["用途", "跨符号"]] },
  { label: "正负", fields: [["num1", "1"], ["num2", "-2"], ["结果", "-1"], ["用途", "负结果"]] },
  { label: "右侧为零", fields: [["num1", "3"], ["num2", "0"], ["结果", "3"], ["循环", "do 至少一次"]] },
  { label: "左侧为零", fields: [["num1", "0"], ["num2", "-4"], ["结果", "-4"], ["用途", "负数原样"]] },
  { label: "两个负数", fields: [["num1", "-2"], ["num2", "-8"], ["结果", "-10"], ["用途", "负数进位"]] },
] as const;

export function AddTwoNumbersBitDiagram() {
  const headers = ["位 a", "位 b", "a XOR b", "a AND b", "二进制结果"];
  const rows = [
    ["0", "0", "0", "0", "0"],
    ["0", "1", "1", "0", "1"],
    ["1", "0", "1", "0", "1"],
    ["1", "1", "0", "1", "10"],
  ] as const;
  const colX = [120, 250, 390, 530, 670];
  const cellW = 110;
  const cellH = 40;
  const headY = 60;
  const rowY = [104, 148, 192, 236];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 820 400"
          role="img"
          aria-label="不用加减乘除做加法的位级真值表。对两个二进制位：a XOR b 得到不计进位的当前位结果，a AND b 得到是否需要向高一位进位。0+1 和 1+0 的 XOR 为 1、进位 0；1+1 的 XOR 为 0、进位 1（结果 10）。于是 sum = a XOR b，carry = (a AND b) 左移一位，循环直到进位为 0。"
          className="mx-auto block h-auto w-full max-w-[820px]"
        >
          <text x="410" y="34" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">XOR 得当前位，AND 得进位：逐位拆解加法</text>
          {/* 表头 */}
          {headers.map((h, i) => <text key={h} x={colX[i]} y={headY} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">{h}</text>)}
          {/* 数据行 */}
          {rows.map((row, r) => {
            const carry = row[0] === "1" && row[1] === "1";
            return (
              <g key={r}>
                {row.map((cell, c) => (
                  <g key={c}>
                    <rect x={colX[c] - cellW / 2} y={rowY[r]} width={cellW} height={cellH} rx="5" fill={carry ? "var(--warning)" : "var(--bg)"} fillOpacity={carry ? 0.1 : 1} stroke={carry ? "var(--warning)" : "var(--border)"} strokeWidth={carry ? 1.4 : 1} />
                    <text x={colX[c]} y={rowY[r] + cellH / 2 + 5} textAnchor="middle" fontSize="14" fontWeight="700" fontFamily="monospace" fill={c === 2 ? "var(--accent)" : c === 3 ? "var(--success)" : carry ? "var(--warning)" : "var(--text-secondary)"}>{cell}</text>
                  </g>
                ))}
              </g>
            );
          })}
          <text x="410" y="308" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">sum = a XOR b（不计进位的和）</text>
          <text x="410" y="332" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">carry = (a AND b) &lt;&lt; 1（向高一位的进位）</text>
          <text x="410" y="368" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">把 sum 与 carry 再当两个加数重复上述步骤，直到 carry 为 0；例 5+7 需三轮得到 12。</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        XOR 给当前位结果，AND 只标记需要向更高一位传递进位的位置。
      </figcaption>
    </figure>
  );
}

export function AddTwoNumbersRoundLab() {
  const [cursor, setCursor] = useState(0);
  const state = roundStates[cursor];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-4 gap-2">
          {roundStates.map((item, index) => (
            <button key={item.round} type="button" onClick={() => setCursor(index)} aria-pressed={cursor === index} className={"h-11 border text-xs font-semibold " + (cursor === index ? "border-accent bg-accent/15 text-accent" : "border-border bg-background text-secondary")}>
              {item.round}
            </button>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {[["num1", state.left], ["num2 / carry", state.right], ["XOR 暂存和", state.xor], ["左移进位", state.carry]].map(([label, value], index) => <div key={label} className={"border p-3 " + (index === 2 ? "border-accent bg-accent/10" : index === 3 ? "border-success bg-success/10" : "border-border bg-background")}><div className="text-xs text-muted">{label}</div><div className="mt-1 font-mono font-semibold text-primary">{value}</div></div>)}
        </div>
        <p className="mb-0 mt-3 border-l-4 border-accent bg-background p-3 text-sm text-secondary">{state.note}</p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        5 加 7 需要三轮；每轮把无进位和与进位重新作为两个加数。
      </figcaption>
    </figure>
  );
}

export function AddTwoNumbersCarryMap() {
  const rows = [
    ["sum = x XOR y", "不同位保留 1，相同位变 0", "不带进位的和", "不会处理 1+1 的高位"],
    ["carry = (x AND y) << 1", "同时为 1 的位左移", "待加入的进位", "无符号左移才有定义"],
    ["x = sum", "保存本轮暂存和", "下一轮第一个加数", "仍可能与进位碰撞"],
    ["y = carry", "保存本轮进位", "下一轮第二个加数", "为 0 时终止"],
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[900px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["步骤", "位级作用", "循环角色", "边界"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 2 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        循环保持“两个位向量的模和不变”，直到第二个位向量不再携带进位。
      </figcaption>
    </figure>
  );
}

export function AddTwoNumbersSignedDiagram() {
  const rows = [
    ["-1 + 2", "FFFFFFFF", "00000002", "00000001", "1"],
    ["1 + (-2)", "00000001", "FFFFFFFE", "FFFFFFFF", "-1"],
    ["0 + (-4)", "00000000", "FFFFFFFC", "FFFFFFFC", "-4"],
    ["-2 + (-8)", "FFFFFFFE", "FFFFFFF8", "FFFFFFF6", "-10"],
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[860px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["算式", "左 32 位模式", "右 32 位模式", "结果位模式", "有符号解释"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 3 ? "font-mono font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        官方负数用例依赖固定宽度二进制补码位模式；计算应在无符号类型中完成。
      </figcaption>
    </figure>
  );
}

export function AddTwoNumbersOfficialCaseLab() {
  return <CodingInterviewLab cases={officialCases} caption="作者 7 组测试覆盖正正、连续进位、正负两种顺序、零与负负组合。" />;
}
