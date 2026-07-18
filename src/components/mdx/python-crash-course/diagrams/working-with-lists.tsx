"use client";

import { useMemo, useState } from "react";

const loopCases = [
  { label: "correct body", lines: ["for name in names:", "    print(name)", "print('done')"], output: ["Ada", "Grace", "done"], fact: "缩进语句每次迭代执行，done在循环后执行一次" },
  { label: "missing indent", lines: ["for name in names:", "print(name)", "print('done')"], output: ["IndentationError"], fact: "冒号后的suite必须缩进" },
  { label: "done inside loop", lines: ["for name in names:", "    print(name)", "    print('done')"], output: ["Ada", "done", "Grace", "done"], fact: "额外缩进改变控制流，而不只是格式" },
];

export function PccLoopIndentationLab() {
  const [selected, setSelected] = useState(0);
  const item = loopCases[selected];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6"><div className="rounded-card border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 border border-border">{loopCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-11 border-border text-xs sm:text-sm ${index < 2 ? "border-r" : ""} ${selected === index ? "bg-primary text-bg" : "bg-bg text-primary hover:bg-elevated"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 lg:grid-cols-[1fr_1fr]"><pre className="overflow-x-auto border border-border bg-bg p-3 text-sm leading-7 text-primary"><code>{item.lines.join("\n")}</code></pre><section className="border border-cyan-500/40 bg-cyan-500/10 p-3"><span className="text-xs text-secondary">observable output</span><code className="mt-2 block whitespace-pre-wrap text-sm text-primary">{item.output.join("\n")}</code><p className="mt-3 text-sm leading-6 text-secondary">{item.fact}</p></section></div></div><figcaption className="mt-2 text-center text-sm text-secondary">Python缩进定义suite边界；改变缩进会改变执行次数或直接产生IndentationError。</figcaption></figure>
  );
}

export function PccRangeComprehensionLab() {
  const [start, setStart] = useState(1);
  const [stop, setStop] = useState(8);
  const [step, setStep] = useState(2);
  const values = useMemo(() => {
    if (step === 0) return [];
    const result: number[] = [];
    if (step > 0) for (let value = start; value < stop && result.length < 20; value += step) result.push(value);
    if (step < 0) for (let value = start; value > stop && result.length < 20; value += step) result.push(value);
    return result;
  }, [start, stop, step]);
  return (
    <figure className="mdx-figure not-prose mx-auto my-6"><div className="rounded-card border border-border bg-elevated p-4 sm:p-5"><div className="grid gap-3 sm:grid-cols-3">{[["start", start, setStart], ["stop", stop, setStop], ["step", step, setStep]].map(([label, value, setter]) => <label key={String(label)} className="border border-border bg-bg p-3 text-sm text-primary">{String(label)}<input type="number" value={Number(value)} onChange={(event) => (setter as (value: number) => void)(Number(event.target.value))} className="mt-2 min-h-11 w-full border border-border bg-elevated px-3 text-sm text-primary" /></label>)}</div><div className="mt-4 grid gap-3 sm:grid-cols-2"><div className="border border-violet-500/40 bg-violet-500/10 p-3"><span className="text-xs text-secondary">range(start, stop, step)</span><code className="mt-2 block break-all text-sm text-primary">{step === 0 ? "ValueError: step must not be zero" : JSON.stringify(values)}</code></div><div className="border border-emerald-500/40 bg-emerald-500/10 p-3"><span className="text-xs text-secondary">[n ** 2 for n in range(...)]</span><code className="mt-2 block break-all text-sm text-primary">{step === 0 ? "not evaluated" : JSON.stringify(values.map((value) => value ** 2))}</code></div></div><p className="mt-4 text-sm leading-7 text-secondary">stop不包含在结果中；方向必须与step符号一致。comprehension对每个range value执行同一expression并构造新list。</p></div><figcaption className="mt-2 text-center text-sm text-secondary">range产生整数序列规则，list comprehension把“迭代 + 变换 + 构造”压缩成一个可读表达式。</figcaption></figure>
  );
}

const copyCases = [
  { label: "alias = foods", alias: true, nested: false, fact: "两个名字指向同一外层list；append双方都可见" },
  { label: "copy = foods[:]", alias: false, nested: false, fact: "复制外层list；append只影响copy" },
  { label: "nested shallow copy", alias: false, nested: true, fact: "外层不同，但内部dictionary仍共享；修改元素内容双方可见" },
  { label: "tuple dimensions", alias: false, nested: false, fact: "tuple元素不能原地替换；只能让名字绑定到新tuple" },
];

export function PccSliceCopyTupleLab() {
  const [selected, setSelected] = useState(1);
  const item = copyCases[selected];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6"><div className="rounded-card border border-border bg-elevated p-4 sm:p-5"><label className="block text-sm text-primary">copy experiment<select value={selected} onChange={(event) => setSelected(Number(event.target.value))} className="mt-2 min-h-11 w-full border border-border bg-bg px-3 text-sm text-primary">{copyCases.map((entry, index) => <option key={entry.label} value={index}>{entry.label}</option>)}</select></label><div className="mt-4 grid gap-3 sm:grid-cols-3"><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">outer identity</span><strong className="mt-2 block text-sm text-primary">{item.alias ? "shared" : "separate"}</strong></div><div className="border border-violet-500/40 bg-violet-500/10 p-3"><span className="text-xs text-secondary">inner identity</span><strong className="mt-2 block text-sm text-primary">{item.nested ? "shared nested object" : "not part of this case"}</strong></div><div className="border border-emerald-500/40 bg-emerald-500/10 p-3"><span className="text-xs text-secondary">prediction</span><p className="mt-2 text-sm leading-6 text-primary">{item.fact}</p></div></div></div><figcaption className="mt-2 text-center text-sm text-secondary">slice copy只复制外层引用序列；tuple限制槽位替换，但不自动冻结内部可变对象。</figcaption></figure>
  );
}
