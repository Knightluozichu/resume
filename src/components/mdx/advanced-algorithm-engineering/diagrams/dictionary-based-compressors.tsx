"use client";

import { useState } from "react";

export function PaeDictionaryCompressionPipelineDiagram() {
  const statistical = [["输入", "symbols"], ["建模", "probabilities"], ["编码", "bits"]] as const;
  const dictionary = [["输入", "substrings"], ["匹配", "old phrase"], ["替换", "token / distance"]] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="grid gap-3 border border-border bg-elevated p-4 sm:grid-cols-2 sm:p-5">
        {[{ title: "统计编码", rows: statistical, color: "accent" }, { title: "字典编码", rows: dictionary, color: "success" }].map((lane) => (
          <div key={lane.title} className="border border-border bg-background p-3">
            <div className={"text-sm font-semibold " + (lane.color === "accent" ? "text-accent" : "text-success")}>{lane.title}</div>
            <div className="mt-3 grid grid-cols-3 gap-1">{lane.rows.map(([label, detail], index) => <div key={label} className="relative border border-border p-2 text-center text-xs text-secondary"><strong className="block text-primary">{label}</strong><span className="mt-1 block break-words">{detail}</span>{index < 2 ? <span className="absolute -right-2 top-1/2 z-10 -translate-y-1/2 bg-background text-accent">→</span> : null}</div>)}</div>
          </div>
        ))}
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        统计编码显式估计概率；字典压缩把重复子串替换成引用，再对引用中的整数与字面量继续编码。
      </figcaption>
    </figure>
  );
}

const lz77Steps = [
  { parsed: "", rest: "aabbabab", phrase: "literal a", token: "⟨0,a⟩" },
  { parsed: "a", rest: "abbabab", phrase: "copy distance 1, length 1", token: "⟨1,1⟩" },
  { parsed: "aa", rest: "bbabab", phrase: "literal b", token: "⟨0,b⟩" },
  { parsed: "aab", rest: "babab", phrase: "copy distance 1, length 1", token: "⟨1,1⟩" },
  { parsed: "aabb", rest: "abab", phrase: "copy distance 3, length 2", token: "⟨3,2⟩" },
  { parsed: "aabbab", rest: "ab", phrase: "copy distance 2, length 2", token: "⟨2,2⟩" },
] as const;

export function PaeLz77WindowLab() {
  const [step, setStep] = useState(0);
  const current = lz77Steps[step];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">LZSS 解析 aabbabab：phrase {step + 1} / {lz77Steps.length}<input className="mt-2 w-full accent-current" type="range" min="0" max={lz77Steps.length - 1} value={step} onChange={(event) => setStep(Number(event.target.value))} /></label>
        <div className="mt-4 flex overflow-hidden border border-border bg-background font-mono text-lg">
          <div className="min-h-16 flex-1 bg-success/10 p-4 text-right text-success">{current.parsed || "∅"}</div>
          <div className="min-h-16 flex-1 border-l-2 border-accent bg-accent/10 p-4 text-accent">{current.rest}</div>
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2"><div className="border border-border bg-background p-3 text-xs text-secondary">本轮最长匹配<div className="mt-2 text-primary">{current.phrase}</div></div><div className="border border-accent bg-accent/10 p-3 text-xs text-secondary">输出 token<div className="mt-2 font-mono text-sm font-semibold text-accent">{current.token}</div></div></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        LZ77 的字典是已处理窗口中的全部子串；LZSS 用 literal 或 distance-length 二元组表示每个 phrase。
      </figcaption>
    </figure>
  );
}

export function PaeLz77OverlapCopyDiagram() {
  const [copied, setCopied] = useState(0);
  const seed = ["a", "b"];
  const output = [...seed];
  for (let index = 0; index < copied; index += 1) output.push(output[index]);
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">解码 ⟨distance=2, length=6⟩：已复制 {copied} / 6<input className="mt-2 w-full accent-current" type="range" min="0" max="6" value={copied} onChange={(event) => setCopied(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-8 gap-1">{Array.from({ length: 8 }, (_, index) => <div key={index} className={"min-h-12 border p-3 text-center font-mono text-sm " + (index < 2 ? "border-success bg-success/10 text-success" : index < output.length ? "border-accent bg-accent/10 text-accent" : "border-border bg-background text-muted")}>{output[index] ?? "·"}</div>)}</div>
        <p className="mb-0 mt-3 text-xs leading-5 text-secondary">每次从当前位置向后2格读取；新写出的字符立刻可成为后续 source，所以短 seed 能扩展成周期串。</p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        copy length 可以大于 distance；按前向顺序逐字符复制即可安全处理 source 与 destination 重叠。
      </figcaption>
    </figure>
  );
}

const gzipCandidates = [
  { position: 21, lcp: 9, distance: 7 },
  { position: 15, lcp: 5, distance: 13 },
  { position: 8, lcp: 11, distance: 20 },
  { position: 2, lcp: 4, distance: 26 },
] as const;

export function PaeGzipMatchSearchLab() {
  const [budget, setBudget] = useState(2);
  const checked = gzipCandidates.slice(0, budget);
  const best = checked.reduce((winner, item) => item.lcp > winner.lcp ? item : winner, checked[0]);
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">3-gram hash chain 检查预算：{budget} candidates<input className="mt-2 w-full accent-current" type="range" min="1" max={gzipCandidates.length} value={budget} onChange={(event) => setBudget(Number(event.target.value))} /></label>
        <div className="mt-4 grid gap-2 sm:grid-cols-4">{gzipCandidates.map((item, index) => <div key={item.position} className={"border p-3 text-xs " + (index < budget ? "border-border bg-background text-secondary" : "border-border/50 bg-background/40 text-muted")}><strong className="text-primary">pos {item.position}</strong><div className="mt-2">distance {item.distance}</div><div>LCP {item.lcp}</div></div>)}</div>
        <div className="mt-3 border border-accent bg-accent/10 p-3 text-xs text-secondary">当前选择：distance <strong className="text-accent">{best.distance}</strong>，length <strong className="text-accent">{best.lcp}</strong>。增加预算可能找到更长 match，也会增加压缩时间。</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        gzip 用 look-ahead 的首个 3-gram 找候选链，再逐候选计算 LCP；从近到远搜索并限制候选数形成速度/压缩率档位。
      </figcaption>
    </figure>
  );
}

const lz78Rows = [
  ["a", "⟨0,a⟩", "1:a"],
  ["ab", "⟨1,b⟩", "2:ab"],
  ["b", "⟨0,b⟩", "3:b"],
  ["aba", "⟨2,a⟩", "4:aba"],
  ["bb", "⟨3,b⟩", "5:bb"],
  ["ba", "⟨3,a⟩", "6:ba"],
  ["abab", "⟨4,b⟩", "7:abab"],
  ["aa", "⟨1,a⟩", "8:aa"],
] as const;

export function PaeLz78TrieGrowthLab() {
  const [step, setStep] = useState(3);
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">LZ78 字典增长：已处理 {step + 1} phrases<input className="mt-2 w-full accent-current" type="range" min="0" max={lz78Rows.length - 1} value={step} onChange={(event) => setStep(Number(event.target.value))} /></label>
        <div className="mt-4 grid gap-2 sm:grid-cols-4">{lz78Rows.slice(0, step + 1).map(([input, token, entry], index) => <div key={entry} className={"border p-3 text-xs " + (index === step ? "border-accent bg-accent/10" : "border-border bg-background")}><div className="font-mono text-primary">{input}</div><div className="mt-1 text-secondary">{token}</div><div className="mt-2 font-semibold text-accent">{entry}</div></div>)}</div>
        <p className="mb-0 mt-3 text-xs leading-5 text-secondary">每个新条目等于“已有 phrase + 一个字符”，所以所有前缀都已存在，字典可表示成单字符边的 uncompacted trie。</p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        LZ78 显式保存 prefix-complete phrase 字典；输出已有 phrase id 与新字符，并把两者拼接成下一条字典项。
      </figcaption>
    </figure>
  );
}

const lzwSteps = [
  { code: "97", previous: "-", decoded: "a", inserted: "-", note: "首个 code 直接输出" },
  { code: "97", previous: "a", decoded: "a", inserted: "256: aa", note: "previous + first(current)" },
  { code: "98", previous: "a", decoded: "b", inserted: "257: ab", note: "双方同步增长" },
  { code: "257", previous: "b", decoded: "ab", inserted: "259: ba", note: "读取已有 phrase" },
  { code: "260", previous: "ab", decoded: "aba", inserted: "260: aba", note: "code 尚未存在，使用 previous + first(previous)" },
] as const;

export function PaeLzwDictionarySyncLab() {
  const [step, setStep] = useState(0);
  const current = lzwSteps[step];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">LZW decoder 同步步骤 {step + 1} / {lzwSteps.length}<input className="mt-2 w-full accent-current" type="range" min="0" max={lzwSteps.length - 1} value={step} onChange={(event) => setStep(Number(event.target.value))} /></label>
        <div className="mt-4 grid gap-2 sm:grid-cols-4">{[["code", current.code], ["previous", current.previous], ["decoded", current.decoded], ["insert", current.inserted]].map(([label, value], index) => <div key={label} className={"border p-3 text-center text-xs text-secondary " + (index === 3 ? "border-success bg-success/10" : "border-border bg-background")}><div>{label}</div><div className={"mt-2 font-mono text-sm font-semibold " + (index === 3 ? "text-success" : "text-primary")}>{value}</div></div>)}</div>
        <p className="mb-0 mt-3 text-xs leading-5 text-secondary">{current.note}。</p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        LZW 只输出 phrase id；decoder 用 previous phrase 与 current phrase 首字符补建相同字典，特殊缺项也可由 previous 自举。
      </figcaption>
    </figure>
  );
}

export function PaeCompressorOptimalityMap() {
  const rows = [
    ["LZ78", "coarsely optimal", "不是任意 λ-optimal", "低熵串仍可能有大相对误差"],
    ["bounded LZ77", "非 coarse", "固定窗口忘记远处重复", "周期块可让 Hk 接近 0"],
    ["unbounded LZ77", "coarse；H0 下 8-optimal", "k≥1 非任意 λ-optimal", "远 distance 的整数成本仍高"],
    ["BWT family", "下一章", "同时面向多阶 Hk", "重排后再做统计/游程编码"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <div className="min-w-[45rem]"><div className="grid grid-cols-4 border-b border-border pb-2 text-center text-xs font-semibold text-secondary"><span>算法</span><span>可证明上界</span><span>不足</span><span>原因</span></div>{rows.map((row) => <div key={row[0]} className="grid grid-cols-4 border-b border-border/60 py-3 text-center text-xs leading-5 text-secondary"><strong className="text-primary">{row[0]}</strong><span className="text-success">{row[1]}</span><span>{row[2]}</span><span>{row[3]}</span></div>)}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        “最优”必须说明比较基准与加性/乘性误差；固定窗口的工程优势并不等同于经验熵意义下的渐近最优。
      </figcaption>
    </figure>
  );
}
