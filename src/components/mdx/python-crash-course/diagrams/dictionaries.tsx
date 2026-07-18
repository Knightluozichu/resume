"use client";

import { useState } from "react";

const crudCases = [
  { label: "add", before: { color: "green" }, after: { color: "green", points: 5 }, returned: "assignment statement", fact: "新key建立新的key-value pair" },
  { label: "modify", before: { color: "green", points: 5 }, after: { color: "yellow", points: 5 }, returned: "assignment statement", fact: "已有key重新绑定到新value" },
  { label: "remove", before: { color: "yellow", points: 5 }, after: { color: "yellow" }, returned: "del has no value", fact: "del删除key及其关联value" },
  { label: "get missing", before: { color: "green" }, after: { color: "green" }, returned: "0", fact: "get('points', 0)不修改dictionary并返回default" },
];

export function PccDictionaryCrudLab() {
  const [selected, setSelected] = useState(0);
  const item = crudCases[selected];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6"><div className="rounded-card border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-2 border border-border sm:grid-cols-4">{crudCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-11 border-border text-xs sm:text-sm ${index < crudCases.length - 1 ? "border-r" : ""} ${selected === index ? "bg-primary text-bg" : "bg-bg text-primary hover:bg-elevated"}`}>{entry.label}</button>)}</div><div className="mt-4 grid items-center gap-3 sm:grid-cols-[1fr_auto_1fr]"><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">before</span><code className="mt-2 block break-all text-sm text-primary">{JSON.stringify(item.before)}</code></div><span className="text-center text-lg text-secondary">→</span><div className="border border-cyan-500/40 bg-cyan-500/10 p-3"><span className="text-xs text-secondary">after</span><code className="mt-2 block break-all text-sm text-primary">{JSON.stringify(item.after)}</code></div></div><div className="mt-3 grid gap-3 sm:grid-cols-2"><div className="border border-violet-500/40 bg-violet-500/10 p-3 text-sm text-primary">result: {item.returned}</div><div className="border border-emerald-500/40 bg-emerald-500/10 p-3 text-sm text-primary">{item.fact}</div></div></div><figcaption className="mt-2 text-center text-sm text-secondary">CRUD同时改变key space和value binding；`get`只读取并显式处理missing key。</figcaption></figure>
  );
}

const iterationCases = [
  { label: "items()", values: ["Ada → Python", "Grace → COBOL", "Guido → Python"], fact: "同时解包key与value" },
  { label: "keys()", values: ["Ada", "Grace", "Guido"], fact: "只迭代key；直接for mapping语义相同" },
  { label: "values()", values: ["Python", "COBOL", "Python"], fact: "value可重复；set可产生去重视图" },
  { label: "sorted(keys)", values: ["Ada", "Grace", "Guido"], fact: "显式创建按key排序的迭代顺序" },
];

export function PccDictionaryIterationLab() {
  const [selected, setSelected] = useState(0);
  const item = iterationCases[selected];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6"><div className="rounded-card border border-border bg-elevated p-4 sm:p-5"><label className="block text-sm text-primary">dictionary view<select value={selected} onChange={(event) => setSelected(Number(event.target.value))} className="mt-2 min-h-11 w-full border border-border bg-bg px-3 text-sm text-primary">{iterationCases.map((entry, index) => <option key={entry.label} value={index}>{entry.label}</option>)}</select></label><div className="mt-4 grid gap-2 sm:grid-cols-3">{item.values.map((value, index) => <div key={`${value}-${index}`} className="min-h-16 border border-cyan-500/40 bg-cyan-500/10 p-3 text-sm text-primary">{value}</div>)}</div><p className="mt-3 border border-border bg-bg p-3 text-sm leading-7 text-secondary">{item.fact}</p></div><figcaption className="mt-2 text-center text-sm text-secondary">items、keys、values暴露不同view；展示顺序需要显式排序，不能让读者猜。</figcaption></figure>
  );
}

const nestingCases = [
  { label: "list of dictionaries", shape: "users[1]['role']", result: "editor", owner: "list负责顺序，每个dictionary负责一条record" },
  { label: "dictionary of lists", shape: "pizza['toppings'][0]", result: "mushrooms", owner: "dictionary给field命名，list表达一个field有多个value" },
  { label: "dictionary of dictionaries", shape: "users['ada']['location']", result: "london", owner: "外层key做identity，内层dictionary保存record fields" },
];

export function PccDictionaryNestingLab() {
  const [selected, setSelected] = useState(0);
  const item = nestingCases[selected];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6"><div className="rounded-card border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 border border-border">{nestingCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-14 border-border px-2 text-xs ${index < 2 ? "border-r" : ""} ${selected === index ? "bg-primary text-bg" : "bg-bg text-primary hover:bg-elevated"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 sm:grid-cols-3"><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">access path</span><code className="mt-2 block break-all text-sm text-primary">{item.shape}</code></div><div className="border border-violet-500/40 bg-violet-500/10 p-3"><span className="text-xs text-secondary">resolved value</span><strong className="mt-2 block text-sm text-primary">{item.result}</strong></div><div className="border border-emerald-500/40 bg-emerald-500/10 p-3"><span className="text-xs text-secondary">shape contract</span><p className="mt-2 text-sm leading-6 text-primary">{item.owner}</p></div></div></div><figcaption className="mt-2 text-center text-sm text-secondary">嵌套shape应让每一层container表达一种关系：identity、record fields、order或multiplicity。</figcaption></figure>
  );
}
