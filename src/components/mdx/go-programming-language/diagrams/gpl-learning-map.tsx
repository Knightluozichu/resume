"use client";

import { useState } from "react";

const stages = [
  { name: "程序与数据", chapters: ["1 Tutorial", "2 Program Structure", "3 Basic Data Types", "4 Composite Types"], evidence: "能追踪 value、type、scope、ownership 与 encoding" },
  { name: "抽象边界", chapters: ["5 Functions", "6 Methods", "7 Interfaces"], evidence: "能设计 call/error/receiver/behavior contracts" },
  { name: "并发证明", chapters: ["8 Goroutines & Channels", "9 Shared Variables"], evidence: "能证明 lifecycle、backpressure 与 happens-before" },
  { name: "工程与边界", chapters: ["10 Packages & Go Tool", "11 Testing", "12 Reflection", "13 Low-Level"], evidence: "能建立 build/test/runtime/ABI evidence" },
];

export function GoplOfficialChapterMapLab() {
  const [stage, setStage] = useState(0);
  const selected = stages[stage];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6"><div className="rounded-card border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-4 border border-border" role="group" aria-label="Go official chapter stages">{stages.map((item, index) => <button key={item.name} type="button" onClick={() => setStage(index)} className={`min-h-12 text-xs sm:text-sm ${index < 3 ? "border-r border-border" : ""} ${stage === index ? "bg-primary text-bg" : "text-primary hover:bg-bg"}`}>{index + 1}. {item.name}</button>)}</div><div className="mt-5 grid gap-4 lg:grid-cols-[0.76fr_1.24fr]"><section className="border border-border bg-bg p-4"><span className="text-xs text-secondary">selected stage</span><strong className="mt-2 block text-lg text-primary">{selected.name}</strong><p className="mt-3 text-sm leading-7 text-secondary">{selected.evidence}</p></section><section className="grid gap-3 sm:grid-cols-2">{selected.chapters.map((chapter, index) => <div key={chapter} className="min-h-24 border border-cyan-500/40 bg-cyan-500/10 p-3 text-sm text-primary"><span className="text-xs text-secondary">chapter gate {index + 1}</span><strong className="mt-2 block">{chapter}</strong></div>)}</section></div></div><figcaption className="mt-2 text-center text-sm text-secondary">官方 13 章不是 8 个主题卡片：程序/数据 → 抽象 → 并发 → 工程/运行时边界依次建立可验证能力。</figcaption></figure>
  );
}

const dependencyMap = [
  { chapter: "1–4 程序与数据", needs: "none", unlocks: "函数参数、receiver copy、interface dynamic value" },
  { chapter: "5 Functions", needs: "scope、composite values、error", unlocks: "methods、closures、defer/panic" },
  { chapter: "6–7 Methods & Interfaces", needs: "named types、pointers、functions", unlocks: "consumer contracts与dynamic dispatch" },
  { chapter: "8–9 Concurrency", needs: "closures、interfaces、ownership", unlocks: "channel lifecycle与shared invariant proof" },
  { chapter: "10–11 Tooling & Testing", needs: "package/contracts/concurrency", unlocks: "reproducible build和behavior evidence" },
  { chapter: "12–13 Runtime Boundaries", needs: "types、interfaces、tests", unlocks: "reflection/unsafe/cgo受限实现" },
];

export function GoplLearningDependencyLab() {
  const [selected, setSelected] = useState(3);
  const item = dependencyMap[selected];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6"><div className="rounded-card border border-border bg-elevated p-4 sm:p-5"><div className="grid gap-4 lg:grid-cols-[0.86fr_1.14fr]"><section className="border border-border bg-bg p-4"><label className="block text-sm text-primary">dependency checkpoint<select value={selected} onChange={(event) => setSelected(Number(event.target.value))} className="mt-2 min-h-11 w-full border border-border bg-elevated px-3 text-sm text-primary">{dependencyMap.map((entry, index) => <option key={entry.chapter} value={index}>{entry.chapter}</option>)}</select></label></section><section className="border border-violet-500/40 bg-violet-500/10 p-4"><div className="grid gap-3 sm:grid-cols-3"><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">requires</span><strong className="mt-2 block text-sm text-primary">{item.needs}</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">current</span><strong className="mt-2 block text-sm text-primary">{item.chapter}</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">unlocks</span><strong className="mt-2 block text-sm text-primary">{item.unlocks}</strong></div></div><p className="mt-4 text-sm leading-7 text-secondary">依赖图用于决定学习顺序和故障回退点：interface nil问题回到method set/dynamic pair，并发泄漏回到function closure/channel ownership，而不是只重读当前标题。</p></section></div></div><figcaption className="mt-2 text-center text-sm text-secondary">每一阶段都消费前序 contract并产出下一阶段可使用的 proof；薄弱基础会在并发和low-level边界放大。</figcaption></figure>
  );
}

export function GoplLearningGateLab() {
  const [outline, setOutline] = useState(true);
  const [quality, setQuality] = useState(true);
  const [practice, setPractice] = useState(false);
  const [verification, setVerification] = useState(false);
  const gates = [outline, quality, practice, verification];
  const passed = gates.filter(Boolean).length;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6"><div className="rounded-card border border-border bg-elevated p-4 sm:p-5"><div className="grid gap-4 lg:grid-cols-[0.82fr_1.18fr]"><section className="space-y-3 border border-border bg-bg p-4">{[[outline, setOutline, "official outline understood"], [quality, setQuality, "chapter score and review"], [practice, setPractice, "exercise implemented"], [verification, setVerification, "tests/race/build evidence"]].map(([value, setter, label]) => <label key={String(label)} className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={value as boolean} onChange={(event) => (setter as (value: boolean) => void)(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />{String(label)}</label>)}</section><section className={`border p-4 ${passed === 4 ? "border-emerald-500/40 bg-emerald-500/10" : "border-amber-500/40 bg-amber-500/10"}`}><strong className="text-lg text-primary">gate {passed}/4 · {passed === 4 ? "ready to advance" : "evidence incomplete"}</strong><div className="mt-4 grid grid-cols-4 gap-2">{gates.map((value, index) => <div key={index} className={`min-h-20 border p-3 text-center text-sm ${value ? "border-emerald-500/40 bg-bg text-primary" : "border-border bg-bg text-secondary"}`}>0{index + 1}<span className="mt-2 block">{value ? "pass" : "open"}</span></div>)}</div><p className="mt-4 text-sm leading-7 text-secondary">阅读完成不等于掌握。每章至少留下目录覆盖、概念解释、可运行练习和对应verification；并发/unsafe章节还需race/checkptr或边界测试。</p></section></div></div><figcaption className="mt-2 text-center text-sm text-secondary">学习路径的最小验收是“理解 + 实现 + 证据”，不是页面浏览进度。</figcaption></figure>
  );
}
