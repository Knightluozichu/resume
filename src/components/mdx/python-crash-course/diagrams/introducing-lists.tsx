"use client";

import { useState } from "react";

const names = ["Ada", "Linus", "Grace", "Guido"];
const indexCases = [0, 1, -1, -2, 4, -5];

export function PccListIndexLab() {
  const [selected, setSelected] = useState(0);
  const index = indexCases[selected];
  const resolved = index >= 0 ? index : names.length + index;
  const valid = resolved >= 0 && resolved < names.length;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-4 gap-2">{names.map((name, itemIndex) => <div key={name} className={`min-h-20 border p-3 text-center ${valid && resolved === itemIndex ? "border-cyan-500 bg-cyan-500/10" : "border-border bg-bg"}`}><span className="text-xs text-secondary">index {itemIndex} / {itemIndex - names.length}</span><strong className="mt-2 block text-sm text-primary">{name}</strong></div>)}</div>
        <label className="mt-4 block text-sm text-primary">requested index<select value={selected} onChange={(event) => setSelected(Number(event.target.value))} className="mt-2 min-h-11 w-full border border-border bg-bg px-3 text-sm text-primary">{indexCases.map((value, indexValue) => <option key={value} value={indexValue}>{value}</option>)}</select></label>
        <div className={`mt-4 border p-3 text-sm ${valid ? "border-emerald-500/40 bg-emerald-500/10 text-primary" : "border-rose-500/40 bg-rose-500/10 text-primary"}`}>{valid ? `resolved index ${resolved}: ${names[resolved]}` : `IndexError: list index ${index} is out of range`}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">正索引从0开始，负索引从尾部回退；解析后超出`0..len-1`就产生IndexError。</figcaption>
    </figure>
  );
}

const mutationCases = [
  { label: "append('C')", before: ["A", "B"], after: ["A", "B", "C"], returned: "None", reason: "尾部原地添加" },
  { label: "insert(1, 'X')", before: ["A", "B"], after: ["A", "X", "B"], returned: "None", reason: "指定位置插入并移动后续元素" },
  { label: "pop()", before: ["A", "B", "C"], after: ["A", "B"], returned: "'C'", reason: "删除并返回末尾元素" },
  { label: "remove('B')", before: ["A", "B", "B"], after: ["A", "B"], returned: "None", reason: "只删除第一个匹配值" },
];

export function PccListMutationLab() {
  const [selected, setSelected] = useState(0);
  const item = mutationCases[selected];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 border border-border sm:grid-cols-4">{mutationCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border-border px-2 text-xs ${index < mutationCases.length - 1 ? "border-r" : ""} ${selected === index ? "bg-primary text-bg" : "bg-bg text-primary hover:bg-elevated"}`}>{entry.label}</button>)}</div>
        <div className="mt-5 grid items-center gap-3 sm:grid-cols-[1fr_auto_1fr]">
          <div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">before</span><code className="mt-2 block text-sm text-primary">{JSON.stringify(item.before)}</code></div><span className="text-center text-lg text-secondary">→</span><div className="border border-cyan-500/40 bg-cyan-500/10 p-3"><span className="text-xs text-secondary">after</span><code className="mt-2 block text-sm text-primary">{JSON.stringify(item.after)}</code></div>
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2"><div className="border border-violet-500/40 bg-violet-500/10 p-3 text-sm text-primary">returned: <code>{item.returned}</code></div><div className="border border-emerald-500/40 bg-emerald-500/10 p-3 text-sm text-primary">{item.reason}</div></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">同时观察list副作用与method返回值，避免把`None`误当成变更后的列表。</figcaption>
    </figure>
  );
}

const orderingCases = [
  { label: "sorted(items)", original: ["beta", "alpha", "gamma"], result: ["alpha", "beta", "gamma"], returned: "new list", fact: "原列表顺序保留" },
  { label: "items.sort()", original: ["alpha", "beta", "gamma"], result: ["alpha", "beta", "gamma"], returned: "None", fact: "原列表被原地排序" },
  { label: "items.reverse()", original: ["gamma", "alpha", "beta"], result: ["beta", "alpha", "gamma"], returned: "None", fact: "只反转当前顺序，不做排序" },
];

export function PccListOrderingLab() {
  const [selected, setSelected] = useState(0);
  const item = orderingCases[selected];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <label className="block text-sm text-primary">ordering operation<select value={selected} onChange={(event) => setSelected(Number(event.target.value))} className="mt-2 min-h-11 w-full border border-border bg-bg px-3 text-sm text-primary">{orderingCases.map((entry, index) => <option key={entry.label} value={index}>{entry.label}</option>)}</select></label>
        <div className="mt-4 grid gap-3 sm:grid-cols-3"><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">observed list</span><code className="mt-2 block text-sm text-primary">{JSON.stringify(item.original)}</code></div><div className="border border-cyan-500/40 bg-cyan-500/10 p-3"><span className="text-xs text-secondary">ordered view</span><code className="mt-2 block text-sm text-primary">{JSON.stringify(item.result)}</code></div><div className="border border-amber-500/40 bg-amber-500/10 p-3"><span className="text-xs text-secondary">contract</span><strong className="mt-2 block text-sm leading-6 text-primary">{item.returned}; {item.fact}</strong></div></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">`sorted()`产生新列表，`sort()`和`reverse()`原地修改；`len()`只读取元素数量。</figcaption>
    </figure>
  );
}
