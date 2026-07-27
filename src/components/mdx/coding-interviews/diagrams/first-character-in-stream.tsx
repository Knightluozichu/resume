"use client";

import { useState } from "react";

import { CodingInterviewLab } from "./official-lab";

const streamStates = [
  { label: "初始", stream: "空", inserted: "无", nextIndex: 0, occurrence: "全部为 -1", answer: "NUL", note: "没有出现一次的字符" },
  { label: "读g", stream: "g", inserted: "g @ 0", nextIndex: 1, occurrence: "g: 0", answer: "g", note: "g首次出现，保存位置0" },
  { label: "读o", stream: "go", inserted: "o @ 1", nextIndex: 2, occurrence: "g: 0，o: 1", answer: "g", note: "两个唯一字符中g位置更小" },
  { label: "再读o", stream: "goo", inserted: "o @ 2", nextIndex: 3, occurrence: "g: 0，o: -2", answer: "g", note: "o从首次位置转为永久重复" },
  { label: "再读g", stream: "goog", inserted: "g @ 3", nextIndex: 4, occurrence: "g: -2，o: -2", answer: "NUL", note: "当前没有只出现一次的字符" },
  { label: "读l", stream: "googl", inserted: "l @ 4", nextIndex: 5, occurrence: "g: -2，o: -2，l: 4", answer: "l", note: "l成为唯一候选" },
  { label: "读e", stream: "google", inserted: "e @ 5", nextIndex: 6, occurrence: "g: -2，o: -2，l: 4，e: 5", answer: "l", note: "l的位置4早于e的位置5" },
] as const;

const officialCases = [
  { label: "初始", fields: [["流", "空"], ["唯一字符", "无"], ["返回", "NUL"], ["测试", "Test1"]] },
  { label: "g", fields: [["流", "g"], ["g状态", "位置0"], ["返回", "g"], ["测试", "Test2"]] },
  { label: "go", fields: [["流", "go"], ["候选", "g@0、o@1"], ["返回", "g"], ["测试", "Test3"]] },
  { label: "goo", fields: [["流", "goo"], ["o状态", "-2"], ["返回", "g"], ["测试", "Test4"]] },
  { label: "goog", fields: [["流", "goog"], ["g/o", "均为-2"], ["返回", "NUL"], ["测试", "Test5"]] },
  { label: "googl", fields: [["流", "googl"], ["l状态", "位置4"], ["返回", "l"], ["测试", "Test6"]] },
  { label: "google", fields: [["流", "google"], ["l/e", "位置4/5"], ["返回", "l"], ["测试", "Test7"]] },
] as const;

export function StreamOccurrenceStateLab() {
  const [cursor, setCursor] = useState(streamStates.length - 1);
  const state = streamStates[cursor];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-7 gap-1.5">
          {streamStates.map((item, index) => (
            <button key={item.label} type="button" onClick={() => setCursor(index)} aria-pressed={cursor === index} className={"min-h-11 border px-1 text-xs font-semibold " + (cursor === index ? "border-accent bg-accent/15 text-accent" : "border-border bg-background text-secondary")}>{item.label}</button>
          ))}
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          <div className="border border-border bg-background p-3"><div className="text-xs text-muted">当前流</div><div className="mt-1 font-semibold text-primary">{state.stream}</div></div>
          <div className="border border-border bg-background p-3"><div className="text-xs text-muted">本次插入 / 下个位置</div><div className="mt-1 font-semibold text-primary">{state.inserted} / {state.nextIndex}</div></div>
          <div className="border border-border bg-background p-3"><div className="text-xs text-muted">查询结果</div><div className="mt-1 font-semibold text-success">{state.answer}</div></div>
        </div>
        <div className="mt-3 border border-border bg-background p-3 text-sm text-secondary">{state.occurrence}</div>
        <p className="mb-0 mt-3 text-sm text-secondary">{state.note}</p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        逐步插入google；表中非负数保存首次位置，-2表示已经重复。
      </figcaption>
    </figure>
  );
}

export function OccurrenceSentinelDiagram() {
  const states = [
    { value: "-1", label: "从未出现", x: 130, color: "var(--text-secondary)" },
    { value: "index", label: "恰好出现一次", x: 410, color: "var(--success)" },
    { value: "-2", label: "出现多次", x: 690, color: "var(--warning)" },
  ] as const;
  const cy = 130;
  const r = 46;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 820 360"
          role="img"
          aria-label="字符流中第一个只出现一次的字符状态机图。每个字符的 occurrence 有三种状态：-1 从未出现；首次 Insert 后记录首次位置 index（非负）；第二次 Insert 后变为 -2 表示永久重复，之后不再改变。查询时扫描 256 个槽，取 occurrence 为非负的最小位置对应的字符；若没有非负值则返回 NUL。状态只会单向前进，因为输入流只增不删。"
          className="mx-auto block h-auto w-full max-w-[820px]"
        >
          <defs>
            <marker id="occ-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="var(--accent)" /></marker>
          </defs>
          <text x="410" y="34" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">occurrence 状态机：只会单向前进（流只增不删）</text>
          {/* 状态节点 */}
          {states.map((s) => (
            <g key={s.value}>
              <circle cx={s.x} cy={cy} r={r} fill={s.color} fillOpacity="0.1" stroke={s.color} strokeWidth="1.8" />
              <text x={s.x} y={cy + 2} textAnchor="middle" fontSize="18" fontWeight="800" fontFamily="monospace" fill={s.color}>{s.value}</text>
              <text x={s.x} y={cy + 24} textAnchor="middle" fontSize="10" fill="var(--text-secondary)">{s.label}</text>
            </g>
          ))}
          {/* 转移箭头 */}
          <path d={`M ${130 + r} ${cy - 12} L ${410 - r} ${cy - 12}`} stroke="var(--accent)" strokeWidth="1.8" markerEnd="url(#occ-arrow)" />
          <text x="270" y={cy - 22} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">首次 Insert → 记首次位置</text>
          <path d={`M ${410 + r} ${cy - 12} L ${690 - r} ${cy - 12}`} stroke="var(--accent)" strokeWidth="1.8" markerEnd="url(#occ-arrow)" />
          <text x="550" y={cy - 22} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">第二次 Insert</text>
          {/* -2 自环 */}
          <path d={`M ${690 + r - 6} ${cy - 30} C ${760} ${cy - 60}, ${770} ${cy + 20}, ${690 + r - 4} ${cy + 24}`} fill="none" stroke="var(--warning)" strokeWidth="1.6" markerEnd="url(#occ-arrow)" />
          <text x="720" y={cy + 60} textAnchor="middle" fontSize="10" fill="var(--warning)">后续 Insert</text>
          {/* 查询 */}
          <text x="410" y="240" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">查询：扫描 256 槽，取 occurrence 非负的最小位置 → 该字符</text>
          <text x="410" y="266" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">例 google：g、o 都转 -2，l@4、e@5 为非负，最小位置 4 → 返回 l</text>
          <text x="410" y="292" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">无非负值（如 goog）→ 返回 NUL；Insert 为 O(1)，查询扫描 256 槽为 O(1)。</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        状态只会从未出现走向出现一次，再走向永久重复；输入流只增不删，因此无需恢复。
      </figcaption>
    </figure>
  );
}

export function FirstPositionScanMap() {
  const rows = [
    { code: 101, char: "e", state: "5", action: "首个非负位置，暂定e", min: "5 / e" },
    { code: 103, char: "g", state: "-2", action: "重复，跳过", min: "5 / e" },
    { code: 108, char: "l", state: "4", action: "4小于5，替换为l", min: "4 / l" },
    { code: 111, char: "o", state: "-2", action: "重复，跳过", min: "4 / l" },
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[780px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["字符码", "字符", "occurrence", "扫描动作", "当前最小"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row.char} className="border-b border-border last:border-0"><td className="p-3 text-secondary">{row.code}</td><td className="p-3 font-semibold text-primary">{row.char}</td><td className="p-3 text-secondary">{row.state}</td><td className="p-3 text-secondary">{row.action}</td><td className="p-3 font-semibold text-success">{row.min}</td></tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        查询按字符码扫描并不等于按到达顺序扫描；比较保存的位置后，最终仍选出最早的l。
      </figcaption>
    </figure>
  );
}

export function StaticAndStreamUniqueDiagram() {
  const rows = [
    ["输入形态", "完整字符串已存在", "字符持续Insert"],
    ["能否重读历史", "可以第二遍扫描", "接口不提供回看"],
    ["核心状态", "每字符完整频次", "-1 / 首次位置 / -2"],
    ["答案顺序", "第二遍原串", "唯一字符中的最小首次位置"],
    ["更新成本", "一次性两遍O(n)", "每次Insert为O(1)"],
    ["查询成本", "函数结束直接返回", "每次扫描256槽"],
    ["源码结构", "无持久对象", "CharStatistics长期保存状态"],
    ["无答案", "返回NUL", "返回NUL"],
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[880px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["维度", "第50题（一）静态串", "第50题（二）字符流"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 2 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        两题目标相似，但作者为静态输入选择两遍扫描，为流式输入选择持久位置状态。
      </figcaption>
    </figure>
  );
}

export function FirstCharacterInStreamOfficialCaseLab() {
  return <CodingInterviewLab cases={officialCases} caption="作者按空、g、go、goo、goog、googl、google顺序执行7次快照查询。" />;
}
