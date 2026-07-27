"use client";

import { useState } from "react";

import { CodingInterviewLab } from "./official-lab";

const scanStates = [
  { token: "入口", rest: "-2147483648", number: "0", status: "kInvalid", note: "每次调用先清空旧状态，尚未证明输入有效" },
  { token: "-", rest: "2147483648", number: "0", status: "kInvalid", note: "消费负号，minus 置为 true；符号本身不是数字" },
  { token: "2", rest: "147483648", number: "-2", status: "kInvalid", note: "作者直接按负方向累加，避免先得到正的 2147483648" },
  { token: "1", rest: "47483648", number: "-21", status: "kInvalid", note: "每轮都是 num × 10 - digit" },
  { token: "4…6", rest: "8", number: "-214748364", status: "kInvalid", note: "中间值仍在 32 位有符号范围内" },
  { token: "8", rest: "字符串末尾", number: "-2147483648", status: "kValid", note: "最后一位恰好等于 INT_MIN，且指针走到终止符后才提交有效" },
] as const;

const officialCases = [
  { label: "空指针", fields: [["输入", "nullptr"], ["返回", "0"], ["状态", "kInvalid"], ["边界", "没有可读字符串"]] },
  { label: "空串", fields: [["输入", "\"\""], ["返回", "0"], ["状态", "kInvalid"], ["边界", "首字符就是终止符"]] },
  { label: "正整数", fields: [["输入", "\"123\""], ["返回", "123"], ["状态", "kValid"], ["路径", "无显式符号"]] },
  { label: "正号", fields: [["输入", "\"+123\""], ["返回", "123"], ["状态", "kValid"], ["路径", "消费正号"]] },
  { label: "负号", fields: [["输入", "\"-123\""], ["返回", "-123"], ["状态", "kValid"], ["路径", "负向累加"]] },
  { label: "夹杂字母", fields: [["输入", "\"1a33\""], ["返回", "0"], ["状态", "kInvalid"], ["边界", "拒绝部分解析"]] },
  { label: "正零", fields: [["输入", "\"+0\""], ["返回", "0"], ["状态", "kValid"], ["用途", "区分合法零"]] },
  { label: "负零", fields: [["输入", "\"-0\""], ["返回", "0"], ["状态", "kValid"], ["用途", "符号不改变整数零"]] },
  { label: "最大值", fields: [["输入", "\"+2147483647\""], ["返回", "2147483647"], ["状态", "kValid"], ["边界", "INT_MAX"]] },
  { label: "负最大值", fields: [["输入", "\"-2147483647\""], ["返回", "-2147483647"], ["状态", "kValid"], ["边界", "下界前一格"]] },
  { label: "正越界一", fields: [["输入", "\"+2147483648\""], ["返回", "0"], ["状态", "kInvalid"], ["边界", "超过 INT_MAX"]] },
  { label: "最小值", fields: [["输入", "\"-2147483648\""], ["返回", "-2147483648"], ["状态", "kValid"], ["边界", "INT_MIN"]] },
  { label: "正越界二", fields: [["输入", "\"+2147483649\""], ["返回", "0"], ["状态", "kInvalid"], ["边界", "继续超过上界"]] },
  { label: "负越界", fields: [["输入", "\"-2147483649\""], ["返回", "0"], ["状态", "kInvalid"], ["边界", "低于 INT_MIN"]] },
  { label: "只有正号", fields: [["输入", "\"+\""], ["返回", "0"], ["状态", "kInvalid"], ["边界", "符号后无数字"]] },
  { label: "只有负号", fields: [["输入", "\"-\""], ["返回", "0"], ["状态", "kInvalid"], ["边界", "符号后无数字"]] },
] as const;

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
          <text x="410" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">事务式解析：默认无效，完整消费后提交有效</text>
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

export function StringToIntScanLab() {
  const [cursor, setCursor] = useState(0);
  const state = scanStates[cursor];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          {scanStates.map((item, index) => (
            <button
              key={item.token}
              type="button"
              onClick={() => setCursor(index)}
              aria-pressed={cursor === index}
              className={"h-11 border text-xs font-semibold " + (cursor === index ? "border-accent bg-accent/15 text-accent" : "border-border bg-background text-secondary")}
            >
              {item.token}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          <div className="border border-border bg-background p-3"><div className="text-xs text-muted">尚未处理</div><div className="mt-1 font-mono text-sm text-primary">{state.rest}</div></div>
          <div className="border border-accent bg-accent/10 p-3"><div className="text-xs text-muted">num</div><div className="mt-1 font-mono text-sm font-semibold text-accent">{state.number}</div></div>
          <div className={"border p-3 " + (state.status === "kValid" ? "border-success bg-success/10" : "border-danger bg-danger/10")}><div className="text-xs text-muted">状态</div><div className="mt-1 font-mono text-sm font-semibold text-primary">{state.status}</div></div>
        </div>
        <p className="mb-0 mt-3 border-l-4 border-accent bg-background p-3 text-sm text-secondary">{state.note}</p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        沿作者的负向累加路径逐步解析 -2147483648，直到末尾才标记成功。
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

export function StringToIntOfficialCaseLab() {
  return <CodingInterviewLab cases={officialCases} caption="作者主函数的 16 次调用覆盖空输入、符号、非法字符、合法零和 32 位上下界。" />;
}
