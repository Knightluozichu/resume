"use client";

import { useState } from "react";

const tests = [
  { label: "case-normalized equality", expression: "name.lower() == 'ada'", result: true, evidence: "'Ada'.lower()产生'ada'，原字符串不变" },
  { label: "numeric range", expression: "18 <= age < 65", result: true, evidence: "age=42同时满足下界和上界" },
  { label: "and", expression: "active and verified", result: false, evidence: "active=True但verified=False，两个条件未同时成立" },
  { label: "or", expression: "is_admin or is_owner", result: true, evidence: "只要一个operands为真；is_owner=True" },
  { label: "membership", expression: "'python' in skills", result: true, evidence: "skills包含完全相等的元素python" },
  { label: "not in", expression: "user not in banned", result: true, evidence: "user不在banned collection中" },
];

export function PccConditionalTruthLab() {
  const [selected, setSelected] = useState(0);
  const item = tests[selected];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6"><div className="rounded-card border border-border bg-elevated p-4 sm:p-5"><label className="block text-sm text-primary">conditional test<select value={selected} onChange={(event) => setSelected(Number(event.target.value))} className="mt-2 min-h-11 w-full border border-border bg-bg px-3 text-sm text-primary">{tests.map((entry, index) => <option key={entry.label} value={index}>{entry.label}</option>)}</select></label><div className="mt-4 grid gap-3 sm:grid-cols-[1fr_0.45fr_1.35fr]"><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">expression</span><code className="mt-2 block break-all text-sm text-primary">{item.expression}</code></div><div className={`border p-3 text-center ${item.result ? "border-emerald-500/40 bg-emerald-500/10" : "border-rose-500/40 bg-rose-500/10"}`}><span className="text-xs text-secondary">bool</span><strong className="mt-2 block text-primary">{String(item.result)}</strong></div><div className="border border-cyan-500/40 bg-cyan-500/10 p-3"><span className="text-xs text-secondary">evidence</span><p className="mt-2 text-sm leading-6 text-primary">{item.evidence}</p></div></div></div><figcaption className="mt-2 text-center text-sm text-secondary">每个conditional test都应能说明输入、比较规则和True/False证据。</figcaption></figure>
  );
}

const branchCases = [
  { score: 95, checks: ["score >= 90 → True", "score >= 75 → skipped", "else → skipped"], selected: "excellent", fact: "if-elif-else只执行第一个为真的分支" },
  { score: 82, checks: ["score >= 90 → False", "score >= 75 → True", "else → skipped"], selected: "pass", fact: "分支顺序从更严格条件到更宽条件" },
  { score: 60, checks: ["score >= 90 → False", "score >= 75 → False", "else → selected"], selected: "retry", fact: "else覆盖所有前置条件都失败的剩余空间" },
];

export function PccBranchSelectionLab() {
  const [selected, setSelected] = useState(1);
  const item = branchCases[selected];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6"><div className="rounded-card border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 border border-border">{branchCases.map((entry, index) => <button key={entry.score} type="button" onClick={() => setSelected(index)} className={`min-h-11 border-border text-sm ${index < 2 ? "border-r" : ""} ${selected === index ? "bg-primary text-bg" : "bg-bg text-primary hover:bg-elevated"}`}>score {entry.score}</button>)}</div><div className="mt-4 grid gap-3 lg:grid-cols-[1fr_0.72fr]"> <ol className="space-y-2 border border-border bg-bg p-4">{item.checks.map((check, index) => <li key={check} className="border border-border p-2 text-sm text-primary">0{index + 1} · {check}</li>)}</ol><section className="border border-emerald-500/40 bg-emerald-500/10 p-4"><span className="text-xs text-secondary">selected outcome</span><strong className="mt-2 block text-lg text-primary">{item.selected}</strong><p className="mt-3 text-sm leading-7 text-secondary">{item.fact}</p></section></div></div><figcaption className="mt-2 text-center text-sm text-secondary">if-elif-else是ordered decision：首个True分支终止后续检查。</figcaption></figure>
  );
}

const listCases = [
  { label: "empty request", requested: [], available: ["mushrooms", "olives"], output: ["choose at least one topping"], contract: "先用truthiness处理空列表" },
  { label: "mixed availability", requested: ["mushrooms", "pineapple"], available: ["mushrooms", "olives"], output: ["add mushrooms", "pineapple unavailable"], contract: "逐个membership检查两个列表" },
  { label: "special item", requested: ["green peppers", "olives"], available: ["green peppers", "olives"], output: ["skip green peppers", "add olives"], contract: "special branch只影响当前元素" },
];

export function PccListConditionLab() {
  const [selected, setSelected] = useState(1);
  const item = listCases[selected];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6"><div className="rounded-card border border-border bg-elevated p-4 sm:p-5"><label className="block text-sm text-primary">list scenario<select value={selected} onChange={(event) => setSelected(Number(event.target.value))} className="mt-2 min-h-11 w-full border border-border bg-bg px-3 text-sm text-primary">{listCases.map((entry, index) => <option key={entry.label} value={index}>{entry.label}</option>)}</select></label><div className="mt-4 grid gap-3 sm:grid-cols-3"><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">requested</span><code className="mt-2 block break-all text-sm text-primary">{JSON.stringify(item.requested)}</code></div><div className="border border-violet-500/40 bg-violet-500/10 p-3"><span className="text-xs text-secondary">available</span><code className="mt-2 block break-all text-sm text-primary">{JSON.stringify(item.available)}</code></div><div className="border border-cyan-500/40 bg-cyan-500/10 p-3"><span className="text-xs text-secondary">output</span><code className="mt-2 block whitespace-pre-wrap text-sm text-primary">{item.output.join("\n")}</code></div></div><p className="mt-3 border border-emerald-500/40 bg-emerald-500/10 p-3 text-sm text-primary">{item.contract}</p></div><figcaption className="mt-2 text-center text-sm text-secondary">列表条件要同时处理empty case、special item和跨列表membership。</figcaption></figure>
  );
}
