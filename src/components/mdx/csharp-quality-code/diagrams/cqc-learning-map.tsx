"use client";

import { useState } from "react";

const phases = [
  { label: "1-3 Language", chapters: "基本语言要素；集合和LINQ；泛型、委托和事件", advice: "建议1-45", question: "value、collection、query和callable的compile-time/runtime contract是什么？", evidence: "boundary cases, equality laws, enumeration count, closure/variance tests" },
  { label: "4-6 Runtime", chapters: "资源管理和序列化；异常；异步、多线程、任务和并行", advice: "建议46-89", question: "resource、failure和execution flow由谁拥有，何时结束？", evidence: "handle baseline, cause chain, cancellation, contention and shutdown tests" },
  { label: "7-9 Design", chapters: "成员设计；类型设计；安全性设计", advice: "建议90-121", question: "public capability、variation、trust与permission boundary是否准确？", evidence: "API/substitutability tests, threat model, allow/deny and provenance evidence" },
  { label: "10-12 Delivery", chapters: "命名规范；代码整洁；规范开发行为", advice: "建议122-157", question: "代码能否被搜索、局部修改、测试、版本化并安全发布？", evidence: "analyzers, change rehearsal, layered tests, version matrix and deploy gates" },
];

export function CqcOfficialRoadmapLab() {
  const [selected, setSelected] = useState(0);
  const item = phases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{phases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-cyan-500 bg-cyan-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 border border-border bg-bg p-4"><span className="text-xs text-secondary">chapters</span><strong className="mt-2 block text-sm leading-6 text-primary">{item.chapters}</strong><span className="mt-2 block text-xs text-cyan-400">{item.advice}</span></div><div className="mt-3 grid gap-3 md:grid-cols-2"><div className="border border-border bg-bg p-3 text-sm text-primary">review question: {item.question}</div><div className="border border-emerald-500/40 bg-emerald-500/10 p-3 text-sm text-primary">evidence: {item.evidence}</div></div></div><figcaption className="mt-2 text-center text-sm text-secondary">官方12章按contract、runtime ownership、public design和delivery evidence四段递进，完整覆盖建议1-157。</figcaption></figure>;
}

const clusters = [
  { label: "value", starts: "Ch1 value/equality/default", crosses: "Ch2 key comparer; Ch3 generic variance", ends: "Ch7-8 public type contract", failure: "default/hash/mutation/substitution mismatch" },
  { label: "lifetime", starts: "Ch3 closure/event subscription", crosses: "Ch4 resource ownership", ends: "Ch6 task/thread and Ch8 singleton lifetime", failure: "leak, early release, unobserved work or global state" },
  { label: "failure", starts: "Ch4 cleanup fallback", crosses: "Ch5 exception taxonomy", ends: "Ch6 task faults and Ch11 failure docs", failure: "lost cause, duplicate log, skipped cleanup or undocumented caller action" },
  { label: "boundary", starts: "Ch2 IEnumerable/IQueryable", crosses: "Ch7 member and Ch8 type surface", ends: "Ch9 trust/permission and Ch10 naming", failure: "wrong execution location, excessive capability or ambiguous identity" },
  { label: "delivery", starts: "Ch9 artifact/security evidence", crosses: "Ch10 discoverable names; Ch11 local change", ends: "Ch12 tests/version/release gate", failure: "unverified version, flaky gate or undeployable change" },
];

export function CqcAdviceClusterLab() {
  const [selected, setSelected] = useState(0);
  const item = clusters[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{clusters.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-violet-500 bg-violet-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-3">{[["starts", item.starts], ["crosses", item.crosses], ["ends", item.ends]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div><div className="mt-3 border border-rose-500/40 bg-rose-500/10 p-3 text-sm text-primary">chain failure: {item.failure}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">从横向value、lifetime、failure、boundary和delivery链串联分散在不同章节的建议。</figcaption></figure>;
}

const gates = [
  { label: "read", output: "能复述每条建议的problem与时代背景", reject: "只背标题或旧时代绝对结论", artifact: "chapter notes + original-title index", pass: "157条建议都有modern decision boundary" },
  { label: "predict", output: "在运行前预测default、dispatch、execution、fault和ownership", reject: "只看happy path", artifact: "boundary table", pass: "预测覆盖counterexample和failure semantics" },
  { label: "implement", output: "用最小API表达contract", reject: "复制pattern模板而不画ownership", artifact: "working code + chapter-specific lab", pass: "type/compiler/runtime behavior一致" },
  { label: "verify", output: "用tests, trace, profiler, analyzer或security evidence证明", reject: "以代码review直觉代替measurement", artifact: "repeatable gate output", pass: "normal, boundary, fault和lifecycle cases全覆盖" },
  { label: "transfer", output: "把建议用于真实code review并解释tradeoff", reject: "机械执行rule", artifact: "decision record/refactor diff", pass: "结论绑定target runtime/domain and migration cost" },
];

export function CqcStudyGateLab() {
  const [selected, setSelected] = useState(3);
  const item = gates[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{gates.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-emerald-500 bg-emerald-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-2">{[["output", item.output], ["reject", item.reject], ["artifact", item.artifact], ["pass", item.pass]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">每章从read、predict、implement、verify到transfer，避免“看过建议”被误当成掌握。</figcaption></figure>;
}
