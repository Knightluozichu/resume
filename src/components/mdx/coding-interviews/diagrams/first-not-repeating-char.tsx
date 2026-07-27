"use client";

import { useState } from "react";

import { CodingInterviewLab } from "./official-lab";

const passStates = [
  { label: "计数a", phase: "第一遍", cursor: 0, counts: "a:1", action: "只累计频次，暂不决定答案" },
  { label: "计数b", phase: "第一遍", cursor: 1, counts: "a:1, b:1", action: "b目前唯一，但后续仍可能重复" },
  { label: "计数a", phase: "第一遍", cursor: 2, counts: "a:2, b:1", action: "a变成重复字符" },
  { label: "计数c", phase: "第一遍", cursor: 3, counts: "a:2, b:1, c:1", action: "继续完成整串计数" },
  { label: "计数c", phase: "第一遍", cursor: 4, counts: "a:2, b:1, c:2", action: "c变成重复字符" },
  { label: "计数d/e/f/f", phase: "第一遍", cursor: 8, counts: "a:2, b:1, c:2, d:1, e:1, f:2", action: "频次表最终完成" },
  { label: "检查a", phase: "第二遍", cursor: 0, counts: "count[a] = 2", action: "不是唯一，按原顺序继续" },
  { label: "检查b", phase: "第二遍", cursor: 1, counts: "count[b] = 1", action: "第一个频次为1的字符，立即返回b" },
] as const;

const officialCases = [
  { label: "存在唯一", fields: [["输入", "google"], ["频次1", "l、e"], ["返回", "l"], ["原因", "l更靠前"]] },
  { label: "没有唯一", fields: [["输入", "aabccdbd"], ["所有字符", "频次大于1"], ["返回", "\\0"], ["语义", "无答案"]] },
  { label: "全部唯一", fields: [["输入", "abcdefg"], ["所有字符", "频次1"], ["返回", "a"], ["原因", "首字符"]] },
  { label: "空指针", fields: [["输入", "nullptr"], ["入口", "立即返回"], ["返回", "\\0"], ["语义", "无效输入"]] },
] as const;

export function FirstUniqueFrequencyDiagram() {
  const chars = [
    { ch: "g", count: 2 },
    { ch: "o", count: 2 },
    { ch: "o", count: 2 },
    { ch: "g", count: 2 },
    { ch: "l", count: 1 },
    { ch: "e", count: 1 },
  ] as const;
  const cellW = 76;
  const cellH = 52;
  const gapW = 8;
  const rowX = 130;
  const cx = (i: number) => rowX + i * (cellW + gapW);
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 820 400"
          role="img"
          aria-label="第一个只出现一次的字符图。以 google 为例：第一遍统计频次 g:2、o:2、l:1、e:1；第二遍按原顺序扫描，g 和 o 频次为 2 跳过，l 频次为 1 是第一个唯一字符，返回 l。频次表能回答谁唯一，但不能回答谁最早，所以必须第二遍按原顺序扫描。"
          className="mx-auto block h-auto w-full max-w-[820px]"
        >
          <defs>
            <marker id="fu-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="var(--accent)" /></marker>
          </defs>
          <text x="410" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">两遍扫描：先计频次，再按原顺序找首个频次1</text>
          {/* 字符串 */}
          {chars.map((c, i) => {
            const unique = c.count === 1;
            const found = c.ch === "l";
            return (
              <g key={i}>
                <rect x={cx(i)} y={64} width={cellW} height={cellH} rx="6" fill={unique ? "var(--success)" : "var(--warning)"} fillOpacity={found ? 0.2 : 0.1} stroke={unique ? "var(--success)" : "var(--warning)"} strokeWidth={found ? 2.2 : 1.3} />
                <text x={cx(i) + cellW / 2} y={64 + cellH / 2 + 7} textAnchor="middle" fontSize="20" fontWeight="800" fontFamily="monospace" fill={unique ? "var(--success)" : "var(--warning)"}>{c.ch}</text>
                <text x={cx(i) + cellW / 2} y={136} textAnchor="middle" fontSize="10" fill="var(--text-secondary)">{i}</text>
              </g>
            );
          })}
          {/* 频次 */}
          <text x="410" y="166" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">第一遍频次：g:2（重复）、o:2（重复）、l:1、e:1</text>
          {/* 第二遍扫描 */}
          <path d={`M ${cx(0) + cellW / 2} 186 L ${cx(4) + cellW / 2} 186`} stroke="var(--accent)" strokeWidth="1.6" markerEnd="url(#fu-arrow)" />
          <text x="410" y="206" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">第二遍按原顺序扫描：g→跳、o→跳、l 频次1→命中</text>
          {/* 结果 */}
          <text x="410" y="248" textAnchor="middle" fontSize="15" fontWeight="800" fill="var(--success)">第一个只出现一次的字符 = l（l 早于 e）</text>
          {/* 对比 */}
          <text x="410" y="290" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">频次表只能回答“谁唯一”，不能回答“谁最早”；第二遍按原顺序扫描不可省略。</text>
          <text x="410" y="316" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">例：abac 与 acab 频次表相同（a:2,b:1,c:1），但答案分别是 b 和 c。</text>
          <text x="410" y="352" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">无唯一字符或空指针返回 NUL；两遍扫描 O(n)，频次数组 O(1)（256 槽）。</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        google中l与e都只出现一次；第二遍按原顺序先遇到l，所以答案是l。
      </figcaption>
    </figure>
  );
}

export function FirstUniqueTwoPassLab() {
  const [cursor, setCursor] = useState(passStates.length - 1);
  const state = passStates[cursor];
  const chars = "abaccdeff".split("");

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-8 gap-1.5">
          {passStates.map((item, index) => (
            <button key={item.label + index} type="button" onClick={() => setCursor(index)} aria-pressed={cursor === index} className={"min-h-11 border px-1 text-xs font-semibold " + (cursor === index ? "border-accent bg-accent/15 text-accent" : "border-border bg-background text-secondary")}>{item.label}</button>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          {chars.map((char, index) => (
            <div key={index} className={"flex h-10 w-10 items-center justify-center border font-semibold " + (index === state.cursor ? "border-accent bg-accent/15 text-accent" : "border-border bg-background text-primary")}>{char}</div>
          ))}
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-[120px_1fr]">
          <div className="border border-border bg-background p-3 text-sm font-semibold text-primary">{state.phase}</div>
          <div className="border border-border bg-background p-3 text-sm text-secondary">{state.counts}</div>
        </div>
        <p className="mb-0 mt-3 text-sm text-secondary">{state.action}</p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        第一遍只统计完整频次；第二遍回到原串，首个count等于1的b就是答案。
      </figcaption>
    </figure>
  );
}

export function FirstUniqueOrderMap() {
  const examples = [
    { text: "abac", counts: "a:2, b:1, c:1", answer: "b", reason: "b先于c" },
    { text: "acab", counts: "a:2, b:1, c:1", answer: "c", reason: "c先于b" },
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="grid gap-3 md:grid-cols-2">
        {examples.map((item) => (
          <div key={item.text} className="border border-border bg-elevated p-4">
            <div className="text-xl font-semibold text-primary">{item.text}</div>
            <div className="mt-3 border-y border-border py-3 text-sm text-secondary">相同频次表：{item.counts}</div>
            <div className="mt-3 text-sm text-secondary">第一个唯一字符：<strong className="text-success">{item.answer}</strong>，{item.reason}</div>
          </div>
        ))}
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        频次表能回答谁唯一，却不能回答谁最早；第二次按原顺序扫描不可省略。
      </figcaption>
    </figure>
  );
}

export function FirstUniqueContractDiagram() {
  const rows = [
    ["nullptr", "立即返回\\0", "无效输入", "与无答案同一哨兵"],
    ["空字符串", "第一遍零次、第二遍零次", "返回\\0", "源码未单测"],
    ["没有唯一字符", "第二遍走到终止符", "返回\\0", "与nullptr不可区分"],
    ["内嵌NUL", "在首个NUL停止", "后半段不可见", "C字符串限制"],
    ["高位字节", "char可能为负", "数组负下标风险", "转unsigned char"],
    ["Unicode文本", "UTF-8按字节计数", "不等于字符频次", "先解码码点或字素簇"],
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[940px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["输入/维度", "源码行为", "结果", "工程处理"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 2 ? "font-semibold text-warning" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        源码是以NUL结尾的字节字符串算法；返回NUL同时承担无效输入和无答案两种语义。
      </figcaption>
    </figure>
  );
}

export function FirstNotRepeatingOfficialCaseLab() {
  return <CodingInterviewLab cases={officialCases} caption="作者main执行4组静态字符串测试；题干示例abaccdeff返回b，但未写入测试函数。" />;
}
