"use client";

import { useState } from "react";

const bindingSteps = [
  { code: "message = 'draft'", message: "draft", backup: "unbound", fact: "message标签指向字符串对象'draft'" },
  { code: "backup = message", message: "draft", backup: "draft", fact: "两个名字暂时指向同一个不可变字符串" },
  { code: "message = 'published'", message: "published", backup: "draft", fact: "重绑定message不会修改backup指向的旧对象" },
];

export function PccVariableBindingLab() {
  const [step, setStep] = useState(0);
  const current = bindingSteps[step];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 gap-2">{bindingSteps.map((item, index) => <button key={item.code} type="button" onClick={() => setStep(index)} className={`min-h-16 border p-2 text-xs ${step === index ? "border-cyan-500 bg-cyan-500/10 text-primary" : "border-border bg-bg text-secondary"}`}>0{index + 1}<code className="mt-1 block break-all">{item.code}</code></button>)}</div>
        <div className="mt-4 grid gap-3 sm:grid-cols-[0.7fr_0.7fr_1.6fr]">
          <div className="border border-violet-500/40 bg-violet-500/10 p-3"><span className="text-xs text-secondary">message</span><strong className="mt-2 block text-sm text-primary">{current.message}</strong></div>
          <div className="border border-amber-500/40 bg-amber-500/10 p-3"><span className="text-xs text-secondary">backup</span><strong className="mt-2 block text-sm text-primary">{current.backup}</strong></div>
          <div className="border border-emerald-500/40 bg-emerald-500/10 p-3"><span className="text-xs text-secondary">binding fact</span><p className="mt-2 text-sm leading-6 text-primary">{current.fact}</p></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Variables Are Labels：赋值改变名字的绑定；它不等同于把值永久装进一个盒子。</figcaption>
    </figure>
  );
}

const stringOperations = [
  { label: "strip", input: "  ada lovelace  ", output: "ada lovelace", use: "移除两端空白，不改变中间空格" },
  { label: "title", input: "ada lovelace", output: "Ada Lovelace", use: "返回新的标题化字符串" },
  { label: "removeprefix", input: "https://example.com", output: "example.com", use: "只在开头匹配时移除前缀" },
  { label: "removesuffix", input: "report.txt", output: "report", use: "只在末尾匹配时移除后缀" },
];

export function PccStringTransformLab() {
  const [selected, setSelected] = useState(2);
  const operation = stringOperations[selected];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 border border-border sm:grid-cols-4" role="group" aria-label="字符串方法">{stringOperations.map((item, index) => <button key={item.label} type="button" onClick={() => setSelected(index)} className={`min-h-11 border-border text-xs sm:text-sm ${index < stringOperations.length - 1 ? "border-r" : ""} ${selected === index ? "bg-primary text-bg" : "bg-bg text-primary hover:bg-elevated"}`}>{item.label}</button>)}</div>
        <div className="mt-5 grid items-center gap-3 sm:grid-cols-[1fr_auto_1fr]">
          <div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">input</span><code className="mt-2 block break-all text-sm text-primary">{JSON.stringify(operation.input)}</code></div>
          <span className="text-center text-lg text-secondary">→</span>
          <div className="border border-cyan-500/40 bg-cyan-500/10 p-3"><span className="text-xs text-secondary">new string</span><code className="mt-2 block break-all text-sm text-primary">{JSON.stringify(operation.output)}</code></div>
        </div>
        <p className="mt-4 border border-border bg-bg p-3 text-sm leading-7 text-secondary">{operation.use}</p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">字符串方法返回新值；只有把结果重新绑定给名字，后续代码才会使用转换后的字符串。</figcaption>
    </figure>
  );
}

const numericCases = [
  { label: "integer", expression: "1_000_000 + 24", value: "1000024", type: "int", warning: "下划线只提高源码可读性" },
  { label: "float", expression: "0.1 + 0.2", value: "0.30000000000000004", type: "float", warning: "二进制浮点通常不能精确表示十进制小数" },
  { label: "division", expression: "7 / 2", value: "3.5", type: "float", warning: "/ 总是产生浮点结果；// 才是整除" },
  { label: "power", expression: "2 ** 8", value: "256", type: "int", warning: "** 的优先级高于普通加减" },
];

export function PccNumericExpressionLab() {
  const [selected, setSelected] = useState(1);
  const item = numericCases[selected];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <label className="block text-sm text-primary">numeric expression<select value={selected} onChange={(event) => setSelected(Number(event.target.value))} className="mt-2 min-h-11 w-full border border-border bg-bg px-3 text-sm text-primary">{numericCases.map((entry, index) => <option key={entry.label} value={index}>{entry.label}: {entry.expression}</option>)}</select></label>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">value</span><code className="mt-2 block break-all text-sm text-primary">{item.value}</code></div>
          <div className="border border-violet-500/40 bg-violet-500/10 p-3"><span className="text-xs text-secondary">runtime type</span><strong className="mt-2 block text-sm text-primary">{item.type}</strong></div>
          <div className="border border-amber-500/40 bg-amber-500/10 p-3"><span className="text-xs text-secondary">reasoning check</span><p className="mt-2 text-sm leading-6 text-primary">{item.warning}</p></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">先预测表达式的value与runtime type，再运行验证；显示结果不一定等于数学上的十进制精确值。</figcaption>
    </figure>
  );
}
