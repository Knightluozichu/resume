"use client";

import { useMemo, useState } from "react";

type PatternContext = "match" | "let" | "if-let" | "while-let" | "for" | "parameter" | "let-else";
type PatternShape = "binding" | "some" | "literal";

const contextInfo = {
  match: { label: "match arm", needsIrrefutable: false, conditional: false },
  let: { label: "let statement", needsIrrefutable: true, conditional: false },
  "if-let": { label: "if let", needsIrrefutable: false, conditional: true },
  "while-let": { label: "while let", needsIrrefutable: false, conditional: true },
  for: { label: "for pattern", needsIrrefutable: true, conditional: false },
  parameter: { label: "function parameter", needsIrrefutable: true, conditional: false },
  "let-else": { label: "let...else", needsIrrefutable: false, conditional: true },
} as const;

const patternInfo = {
  binding: { source: "value", refutable: false },
  some: { source: "Some(value)", refutable: true },
  literal: { source: "3", refutable: true },
} as const;

export function RplPatternContextLab() {
  const [context, setContext] = useState<PatternContext>("match");
  const [shape, setShape] = useState<PatternShape>("some");
  const [catchAll, setCatchAll] = useState(true);
  const contextRule = contextInfo[context];
  const pattern = patternInfo[shape];
  const contextMismatch = contextRule.needsIrrefutable && pattern.refutable;
  const nonExhaustive = context === "match" && pattern.refutable && !catchAll;
  const compiles = !contextMismatch && !nonExhaustive;
  const warning = contextRule.conditional && !pattern.refutable;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 border border-border" role="group" aria-label="模式形状">{(["binding", "some", "literal"] as PatternShape[]).map((value) => <button key={value} type="button" aria-pressed={shape === value} onClick={() => setShape(value)} className={`min-h-11 border-r border-border text-sm last:border-r-0 ${shape === value ? "bg-primary text-bg" : "bg-bg text-secondary"}`}>{patternInfo[value].source}</button>)}</div>
        <div className="mt-5 grid min-h-[28rem] gap-4 lg:grid-cols-[0.9fr_1.25fr]">
          <section className="space-y-4 border border-border bg-bg p-4">
            <select value={context} onChange={(event) => setContext(event.target.value as PatternContext)} className="min-h-11 w-full border border-border bg-elevated px-3 text-sm text-primary">{(Object.keys(contextInfo) as PatternContext[]).map((value) => <option key={value} value={value}>{contextInfo[value].label}</option>)}</select>
            <label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={catchAll} onChange={(event) => setCatchAll(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />match 具有 catch-all arm</label>
            <code className="block border border-border bg-elevated p-3 text-xs leading-6 text-primary">{context === "match" ? `match input {
    ${pattern.source} => use_value(),${catchAll ? "\n    _ => fallback()," : ""}
}` : context === "let" ? `let ${pattern.source} = input;` : context === "if-let" ? `if let ${pattern.source} = input { use_value(); }` : context === "while-let" ? `while let ${pattern.source} = next() { use_value(); }` : context === "for" ? `for ${pattern.source} in items { use_value(); }` : context === "parameter" ? `fn consume(${pattern.source}: Input) {}` : `let ${pattern.source} = input else { return; };`}</code>
          </section>
          <section className={`border p-4 ${compiles && !warning ? "border-emerald-500/40 bg-emerald-500/10" : compiles ? "border-amber-500/40 bg-amber-500/10" : "border-rose-500/40 bg-rose-500/10"}`} aria-live="polite">
            <span className="text-xs text-secondary">refutability contract</span>
            <h3 className="mt-4 text-base font-semibold text-primary">{contextMismatch ? "E0005：该位置要求 irrefutable pattern" : nonExhaustive ? "E0004：match 未覆盖剩余 values" : warning ? "可编译但条件永远成功，else 分支无意义" : "模式与使用位置匹配"}</h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-3"><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">pattern</span><strong className="mt-2 block text-sm text-primary">{pattern.refutable ? "refutable" : "irrefutable"}</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">context</span><strong className="mt-2 block text-sm text-primary">{contextRule.needsIrrefutable ? "must always match" : contextRule.conditional ? "expects possible failure" : "arms may fail"}</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">failure path</span><strong className="mt-2 block text-sm text-primary">{context === "match" ? "another arm" : contextRule.conditional ? "else / loop exit" : "none available"}</strong></div></div>
            <p className="mt-5 text-sm text-secondary">let、for 和 function parameter 必须对输入类型始终匹配；if let、while let 与 let-else 正是为可失败匹配准备；match 允许每个 arm refutable，但所有 arms 合起来必须 exhaustive。</p>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">模式是否可能失败决定它能出现在哪种控制流位置；match 还额外要求 arms 覆盖全部输入空间。</figcaption>
    </figure>
  );
}

type MessageKind = "move" | "rgb" | "hsv" | "write";
type MessagePattern = "move" | "rgb" | "color" | "write-ignore" | "catch-all";

const messages = {
  move: { label: "Move { x: 3, y: -2 }" },
  rgb: { label: "ChangeColor(Rgb(20, 40, 80))" },
  hsv: { label: "ChangeColor(Hsv(200, 60, 90))" },
  write: { label: "Write(\"hello\")" },
} as const;

const patterns = {
  move: "Message::Move { x, y }",
  rgb: "Message::ChangeColor(Color::Rgb(r, g, b))",
  color: "Message::ChangeColor(color)",
  "write-ignore": "Message::Write(_)",
  "catch-all": "_",
} as const;

export function RplPatternDestructuringLab() {
  const [message, setMessage] = useState<MessageKind>("hsv");
  const [pattern, setPattern] = useState<MessagePattern>("color");
  const matched = pattern === "catch-all" || pattern === message || (pattern === "color" && (message === "rgb" || message === "hsv")) || (pattern === "write-ignore" && message === "write");
  const bindings = !matched ? [] : pattern === "move" ? ["x = 3", "y = -2"] : pattern === "rgb" ? ["r = 20", "g = 40", "b = 80"] : pattern === "color" ? [`color = ${message === "rgb" ? "Rgb(...)" : "Hsv(...)"}`] : [];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid min-h-[28rem] gap-4 lg:grid-cols-[0.9fr_1.25fr]">
          <section className="space-y-4 border border-border bg-bg p-4">
            <label className="block text-sm text-primary">input value<select value={message} onChange={(event) => setMessage(event.target.value as MessageKind)} className="mt-2 min-h-11 w-full border border-border bg-elevated px-3 text-sm text-primary">{(Object.keys(messages) as MessageKind[]).map((value) => <option key={value} value={value}>{messages[value].label}</option>)}</select></label>
            <label className="block text-sm text-primary">candidate pattern<select value={pattern} onChange={(event) => setPattern(event.target.value as MessagePattern)} className="mt-2 min-h-11 w-full border border-border bg-elevated px-3 text-sm text-primary">{(Object.keys(patterns) as MessagePattern[]).map((value) => <option key={value} value={value}>{patterns[value]}</option>)}</select></label>
            <code className="block border border-border bg-elevated p-3 text-xs leading-6 text-primary">{`match message {
    ${patterns[pattern]} => handle(),
    _ => fallback(),
}`}</code>
          </section>
          <section className={`border p-4 ${matched ? "border-emerald-500/40 bg-emerald-500/10" : "border-amber-500/40 bg-amber-500/10"}`} aria-live="polite">
            <span className="text-xs text-secondary">shape comparison</span>
            <h3 className="mt-4 text-base font-semibold text-primary">{matched ? "pattern matched" : "shape mismatch，继续检查下一 arm"}</h3>
            <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-3"><div className="border border-border bg-bg p-4 text-center text-xs text-primary">{messages[message].label}</div><span className="text-secondary">{matched ? "fits" : "does not fit"}</span><div className="border border-border bg-bg p-4 text-center text-xs text-primary">{patterns[pattern]}</div></div>
            <div className="mt-5 border border-border bg-bg p-4"><span className="text-xs text-secondary">bindings available to arm expression</span><div className="mt-3 flex min-h-11 flex-wrap gap-2">{bindings.length > 0 ? bindings.map((binding) => <span key={binding} className="border border-cyan-500/40 bg-cyan-500/10 px-3 py-2 text-xs text-primary">{binding}</span>) : <span className="text-sm text-secondary">{matched ? "matched without binding" : "none"}</span>}</div></div>
            <p className="mt-5 text-sm text-secondary">nested pattern 可一次穿过 Message 与 Color 两层 enum；`_` 测试形状但不绑定 payload；named binding 保存值。模式只声明结构和绑定，不执行任意 boolean 计算。</p>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">struct、enum、tuple 与 nested patterns 同时完成 shape test 和字段绑定；不关心的部分可用 `_` 或 `..` 忽略。</figcaption>
    </figure>
  );
}

type BindingMode = "shadow" | "guard" | "at";

export function RplGuardAndBindingLab() {
  const [mode, setMode] = useState<BindingMode>("guard");
  const [value, setValue] = useState(5);
  const [outerY, setOuterY] = useState(7);
  const result = useMemo(() => {
    if (mode === "shadow") return { matched: true, binding: `inner y = ${value}`, reason: "Some(y) creates a new binding; it does not compare outer y" };
    if (mode === "guard") return { matched: value === outerY, binding: `n = ${value}`, reason: value === outerY ? "pattern and guard both true" : "Some(n) matched, but n == outer y is false" };
    return { matched: value >= 3 && value <= 7, binding: value >= 3 && value <= 7 ? `id = ${value}` : "none", reason: "@ keeps the value while range tests it" };
  }, [mode, value, outerY]);
  const source = mode === "shadow" ? "Some(y) => use_inner(y)" : mode === "guard" ? "Some(n) if n == y => equal(n)" : "Some(id @ 3..=7) => in_range(id)";

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 border border-border" role="group" aria-label="绑定与条件模式">{(["shadow", "guard", "at"] as BindingMode[]).map((valueMode) => <button key={valueMode} type="button" aria-pressed={mode === valueMode} onClick={() => setMode(valueMode)} className={`min-h-11 border-r border-border text-sm last:border-r-0 ${mode === valueMode ? "bg-primary text-bg" : "bg-bg text-secondary"}`}>{valueMode === "shadow" ? "named shadow" : valueMode === "guard" ? "match guard" : "@ binding"}</button>)}</div>
        <div className="mt-5 grid min-h-[27rem] gap-4 lg:grid-cols-[0.9fr_1.25fr]">
          <section className="space-y-4 border border-border bg-bg p-4">
            <label className="block text-sm text-primary">Some value：{value}<input type="range" min="0" max="12" value={value} onChange={(event) => setValue(Number(event.target.value))} className="mt-2 w-full accent-[var(--accent)]" /></label>
            <label className="block text-sm text-primary">outer y：{outerY}<input type="range" min="0" max="12" value={outerY} onChange={(event) => setOuterY(Number(event.target.value))} className="mt-2 w-full accent-[var(--accent)]" /></label>
            <code className="block border border-border bg-elevated p-3 text-xs leading-6 text-primary">{`let y = ${outerY};
match Some(${value}) {
    ${source},
    _ => fallback(),
}`}</code>
          </section>
          <section className={`border p-4 ${result.matched ? "border-emerald-500/40 bg-emerald-500/10" : "border-amber-500/40 bg-amber-500/10"}`} aria-live="polite">
            <span className="text-xs text-secondary">pattern binding scope</span>
            <h3 className="mt-4 text-base font-semibold text-primary">{result.matched ? "first arm selected" : "guard/range failed，fallback selected"}</h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-3"><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">outer y</span><strong className="mt-2 block text-sm text-primary">{outerY}</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">arm binding</span><strong className="mt-2 block text-sm text-primary">{result.binding}</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">selected</span><strong className="mt-2 block text-sm text-primary">{result.matched ? "specific" : "catch-all"}</strong></div></div>
            <p className="mt-5 text-sm text-secondary">{result.reason}. Named variables inside patterns bind and shadow outer names. Guard 是 pattern 成功后的额外 boolean 条件；`@` 在同一个 pattern 中同时约束范围并保留具体值。</p>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">named binding、match guard 与 `@` 解决不同问题：捕获、额外条件，以及“测试同时保留值”。</figcaption>
    </figure>
  );
}
