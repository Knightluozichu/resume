"use client";

import { useState } from "react";

const inputCases = [
  { raw: "42", parsed: "42", valid: true, outcome: "even", evidence: "int成功，42 % 2 == 0" },
  { raw: " 17 ", parsed: "17", valid: true, outcome: "odd", evidence: "strip后int成功，17 % 2 == 1" },
  { raw: "3.5", parsed: "ValueError", valid: false, outcome: "ask again", evidence: "int不接受含小数点的字符串" },
  { raw: "", parsed: "ValueError", valid: false, outcome: "required input", evidence: "空字符串没有整数表示" },
  { raw: "-10", parsed: "-10", valid: true, outcome: "multiple of 10", evidence: "-10 % 10 == 0" },
];

export function PccInputParseLab() {
  const [selected, setSelected] = useState(0);
  const item = inputCases[selected];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6"><div className="rounded-card border border-border bg-elevated p-4 sm:p-5"><label className="block text-sm text-primary">raw input<select value={selected} onChange={(event) => setSelected(Number(event.target.value))} className="mt-2 min-h-11 w-full border border-border bg-bg px-3 text-sm text-primary">{inputCases.map((entry, index) => <option key={`${entry.raw}-${index}`} value={index}>{JSON.stringify(entry.raw)}</option>)}</select></label><div className="mt-4 grid gap-3 sm:grid-cols-4"><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">raw string</span><code className="mt-2 block text-sm text-primary">{JSON.stringify(item.raw)}</code></div><div className={`border p-3 ${item.valid ? "border-violet-500/40 bg-violet-500/10" : "border-rose-500/40 bg-rose-500/10"}`}><span className="text-xs text-secondary">int parse</span><strong className="mt-2 block text-sm text-primary">{item.parsed}</strong></div><div className="border border-cyan-500/40 bg-cyan-500/10 p-3"><span className="text-xs text-secondary">outcome</span><strong className="mt-2 block text-sm text-primary">{item.outcome}</strong></div><div className="border border-emerald-500/40 bg-emerald-500/10 p-3"><span className="text-xs text-secondary">evidence</span><p className="mt-2 text-sm leading-6 text-primary">{item.evidence}</p></div></div></div><figcaption className="mt-2 text-center text-sm text-secondary">`input()`只交付raw string；解析成功后才能执行数值比较或modulo。</figcaption></figure>
  );
}

const loopCases = [
  { label: "sentinel", input: ["hello", "quit"], transitions: ["prompt → hello", "process hello", "prompt → quit", "condition false → stop"], exit: "message == 'quit'" },
  { label: "flag", input: ["start", "stop"], transitions: ["active=True", "process start", "receive stop", "active=False", "next condition → stop"], exit: "state flag becomes False" },
  { label: "break", input: ["work", "quit"], transitions: ["while True", "process work", "receive quit", "break immediately"], exit: "explicit break branch" },
  { label: "continue", input: ["-1", "4", "0"], transitions: ["skip invalid -1", "process 4", "receive 0", "break"], exit: "continue skips body; break exits" },
];

export function PccWhileStateMachineLab() {
  const [selected, setSelected] = useState(0);
  const item = loopCases[selected];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6"><div className="rounded-card border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-4 border border-border">{loopCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-11 border-border text-xs sm:text-sm ${index < 3 ? "border-r" : ""} ${selected === index ? "bg-primary text-bg" : "bg-bg text-primary hover:bg-elevated"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 lg:grid-cols-[0.7fr_1.3fr]"><section className="border border-border bg-bg p-3"><span className="text-xs text-secondary">input sequence</span><code className="mt-2 block text-sm text-primary">{JSON.stringify(item.input)}</code><span className="mt-4 block text-xs text-secondary">exit proof</span><strong className="mt-2 block text-sm text-primary">{item.exit}</strong></section><ol className="grid gap-2 sm:grid-cols-2">{item.transitions.map((transition, index) => <li key={transition} className="min-h-16 border border-cyan-500/40 bg-cyan-500/10 p-3 text-sm text-primary">0{index + 1} · {transition}</li>)}</ol></div></div><figcaption className="mt-2 text-center text-sm text-secondary">while loop必须能指出state如何变化，以及哪条输入或分支最终让循环停止。</figcaption></figure>
  );
}

const transferCases = [
  { label: "move queue", before: "unconfirmed=[A,B], confirmed=[]", operation: "pop() then append()", after: "unconfirmed=[], confirmed=[B,A]", invariant: "每次iteration让source长度减少1" },
  { label: "remove all", before: "pets=[cat,pastrami,dog,pastrami]", operation: "while 'pastrami' in pets: remove", after: "pets=[cat,dog]", invariant: "匹配数量每次减少1" },
  { label: "fill dictionary", before: "responses={}", operation: "responses[name] = answer", after: "responses={Ada:Python, Grace:COBOL}", invariant: "每轮产生一个明确key-value response" },
];

export function PccCollectionTransferLab() {
  const [selected, setSelected] = useState(0);
  const item = transferCases[selected];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6"><div className="rounded-card border border-border bg-elevated p-4 sm:p-5"><label className="block text-sm text-primary">collection loop<select value={selected} onChange={(event) => setSelected(Number(event.target.value))} className="mt-2 min-h-11 w-full border border-border bg-bg px-3 text-sm text-primary">{transferCases.map((entry, index) => <option key={entry.label} value={index}>{entry.label}</option>)}</select></label><div className="mt-4 grid gap-3 sm:grid-cols-3"><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">before</span><code className="mt-2 block break-all text-sm text-primary">{item.before}</code></div><div className="border border-violet-500/40 bg-violet-500/10 p-3"><span className="text-xs text-secondary">operation</span><code className="mt-2 block break-all text-sm text-primary">{item.operation}</code></div><div className="border border-cyan-500/40 bg-cyan-500/10 p-3"><span className="text-xs text-secondary">after</span><code className="mt-2 block break-all text-sm text-primary">{item.after}</code></div></div><p className="mt-3 border border-emerald-500/40 bg-emerald-500/10 p-3 text-sm text-primary">termination invariant: {item.invariant}</p></div><figcaption className="mt-2 text-center text-sm text-secondary">用collection size或remaining matches证明while每轮都接近终止。</figcaption></figure>
  );
}
