"use client";

import { useState } from "react";

import { CodingInterviewLab } from "./official-lab";

const traceStates = [
  { label: "原句", text: "I am a student.", begin: "0", end: "14", action: "等待整体翻转", note: "单词顺序与单词内部字母都保持原样" },
  { label: "整句翻转", text: ".tneduts a ma I", begin: "0", end: "14", action: "Reverse(首, 尾)", note: "单词顺序已经反转，但每个单词内部也被反转" },
  { label: "student.", text: "student. a ma I", begin: "0", end: "7", action: "翻转首词", note: "pEnd 遇到空格，回退一格后翻转当前单词" },
  { label: "a", text: "student. a ma I", begin: "9", end: "9", action: "单字符不变", note: "长度 1 的单词进入 Reverse 但不会交换" },
  { label: "am", text: "student. a am I", begin: "11", end: "12", action: "翻转 ma", note: "继续恢复当前单词内部顺序" },
  { label: "完成", text: "student. a am I", begin: "14", end: "14", action: "翻转 I", note: "pEnd 到终止符，最后一个单词也被处理" },
] as const;

const officialCases = [
  { label: "多个单词", fields: [["输入", "I am a student."], ["输出", "student. a am I"], ["分隔", "单空格"], ["用途", "标准两遍翻转"]] },
  { label: "单个单词", fields: [["输入", "Wonderful"], ["输出", "Wonderful"], ["效果", "翻转两次"], ["用途", "顺序不变"]] },
  { label: "空指针", fields: [["输入", "nullptr"], ["返回", "nullptr"], ["写入", "无"], ["用途", "鲁棒性"]] },
  { label: "空字符串", fields: [["输入", "空串"], ["期望", "空串"], ["源码风险", "尾指针先减一"], ["用途", "边界"]] },
  { label: "全是空格", fields: [["输入", "三个空格"], ["输出", "三个空格"], ["单词", "0 个"], ["用途", "分隔符扫描"]] },
] as const;

export function ReverseWordsTwoPassDiagram() {
  const rows = [
    { title: "输入", text: "I am a student.", tone: "var(--text-primary)", note: "单词顺序与单词内部都保持原样" },
    { title: "① 整句翻转", text: ".tneduts a ma I", tone: "var(--accent)", note: "单词顺序反转，但每个单词内部也被反转" },
    { title: "② 逐词翻转", text: "student. a am I", tone: "var(--success)", note: "恢复各单词内部字符顺序" },
  ] as const;
  const rowY = [70, 150, 230];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 820 360"
          role="img"
          aria-label="翻转单词顺序图。句子 I am a student. 要变成 student. a am I。两遍翻转：第一遍整体翻转得到 .tneduts a ma I（单词顺序反了，但每个单词内部也反了）；第二遍逐个单词翻转，恢复每个单词内部字符顺序，得到 student. a am I。两次翻转作用范围不同，组合后只改变单词排列而不改变单词字符。"
          className="mx-auto block h-auto w-full max-w-[820px]"
        >
          <defs>
            <marker id="rw-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="var(--accent)" /></marker>
          </defs>
          <text x="410" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">两遍翻转：先整句、再逐词（原地 O(1)）</text>
          {rows.map((r, i) => (
            <g key={r.title}>
              <text x="120" y={rowY[i] + 30} textAnchor="end" fontSize="12" fontWeight="800" fill={r.tone}>{r.title}</text>
              <rect x="140" y={rowY[i]} width="420" height="46" rx="7" fill={r.tone} fillOpacity={i === 0 ? 0 : 0.1} stroke={r.tone} strokeWidth={i === 0 ? 1.2 : 1.6} />
              <text x="350" y={rowY[i] + 29} textAnchor="middle" fontSize="16" fontWeight="700" fontFamily="monospace" fill={i === 0 ? "var(--text-primary)" : r.tone}>{r.text}</text>
              <text x="580" y={rowY[i] + 29} fontSize="11" fill="var(--text-secondary)">{r.note}</text>
            </g>
          ))}
          <path d="M 350 118 L 350 146" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#rw-arrow)" />
          <path d="M 350 198 L 350 226" stroke="var(--success)" strokeWidth="2" markerEnd="url(#rw-arrow)" />
          <text x="410" y="306" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">结果：student. a am I（单词逆序，单词内部不变）</text>
          <text x="410" y="334" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">第一遍改变单词顺序，第二遍只恢复各单词内部字符顺序；逐词扫描以空格/终止符为界。O(n)、O(1)。</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        第一次改变单词顺序，第二次只恢复各单词内部字符顺序。
      </figcaption>
    </figure>
  );
}

export function ReverseWordsPointerLab() {
  const [cursor, setCursor] = useState(0);
  const state = traceStates[cursor];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">{traceStates.map((item, index) => <button key={item.label} type="button" onClick={() => setCursor(index)} aria-pressed={cursor === index} className={"h-11 border text-xs font-semibold " + (cursor === index ? "border-accent bg-accent/15 text-accent" : "border-border bg-background text-secondary")}>{item.label}</button>)}</div>
        <div className="mt-4 border border-accent bg-accent/10 p-4 font-mono text-base text-primary">{state.text}</div>
        <div className="mt-2 grid gap-2 sm:grid-cols-3">
          <div className="border border-border bg-background p-3 text-sm text-secondary">pBegin = {state.begin}</div>
          <div className="border border-border bg-background p-3 text-sm text-secondary">pEnd = {state.end}</div>
          <div className="border border-success bg-success/10 p-3 text-sm font-semibold text-success">{state.action}</div>
        </div>
        <p className="mb-0 mt-3 border-l-4 border-accent bg-background p-3 text-sm text-secondary">{state.note}</p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        跟随作者的 pBegin 与 pEnd，逐段恢复翻转后的单词。
      </figcaption>
    </figure>
  );
}

export function ReverseWordsSpaceMap() {
  const rows = [
    ["I am", "am I", "一个 ASCII 空格", "普通词序反转"],
    ["I  am", "am  I", "连续两个空格", "空格数量保留"],
    ["  hello world ", " world hello  ", "首二尾一", "两端空格位置随整体翻转互换"],
    ["三个空格", "三个空格", "只有分隔符", "没有单词需要局部翻转"],
    ["I\tam", "I\tam", "制表符", "作者把整串视为一个单词"],
    ["hello, world!", "world! hello,", "标点紧贴单词", "标点跟随所在单词"],
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[900px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["输入", "输出", "分隔特征", "作者行为"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 3 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        源码只把字符空格当分隔符，不压缩空格，也不把制表符当边界。
      </figcaption>
    </figure>
  );
}

export function ReverseWordsInvariantDiagram() {
  const items = [
    ["整体阶段", "每个字符恰好交换一次", "得到单词逆序 + 单词字符逆序"],
    ["扫描阶段", "pBegin 指向当前词首", "空格时两个指针一起前进"],
    ["闭合阶段", "pEnd 指向空格或终止符", "先回退到词尾，再翻转闭区间"],
    ["完成阶段", "所有单词各翻转一次", "字符恢复，词序保留为反序"],
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="grid gap-2 border border-border bg-elevated p-4 sm:grid-cols-2 sm:p-5">{items.map(([title, invariant, result]) => <div key={title} className="border border-border bg-background p-4"><div className="text-sm font-semibold text-primary">{title}</div><div className="mt-2 text-sm text-accent">{invariant}</div><div className="mt-2 text-xs leading-5 text-secondary">{result}</div></div>)}</div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        两次翻转的作用范围不同，组合后只改变单词排列而不改变单词字符。
      </figcaption>
    </figure>
  );
}

export function ReverseWordsOfficialCaseLab() {
  return <CodingInterviewLab cases={officialCases} caption="作者 5 组测试覆盖多词、单词、空指针、空串和全空格输入。" />;
}
