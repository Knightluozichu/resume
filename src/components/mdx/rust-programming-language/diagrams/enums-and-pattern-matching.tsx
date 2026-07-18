"use client";

import { useState } from "react";

const messageVariants = {
  quit: { constructor: "Message::Quit", shape: "无关联数据", payload: "unit-like", handler: "停止处理", tone: "border-rose-500/40 bg-rose-500/10" },
  move: { constructor: "Message::Move { x: 10, y: 20 }", shape: "命名字段", payload: "x: i32, y: i32", handler: "更新坐标", tone: "border-cyan-500/40 bg-cyan-500/10" },
  write: { constructor: 'Message::Write(String::from("hello"))', shape: "单个 tuple payload", payload: "String", handler: "输出文本", tone: "border-emerald-500/40 bg-emerald-500/10" },
  color: { constructor: "Message::ChangeColor(255, 128, 0)", shape: "多个 tuple payload", payload: "i32, i32, i32", handler: "更新颜色", tone: "border-amber-500/40 bg-amber-500/10" },
} as const;

type MessageVariant = keyof typeof messageVariants;

export function RplEnumVariantLab() {
  const [variant, setVariant] = useState<MessageVariant>("write");
  const selected = messageVariants[variant];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 border border-border sm:grid-cols-4" role="group" aria-label="Message enum 变体">
          {(Object.keys(messageVariants) as MessageVariant[]).map((item) => <button key={item} type="button" aria-pressed={variant === item} onClick={() => setVariant(item)} className={`min-h-11 border-r border-border px-2 text-sm last:border-r-0 ${variant === item ? "bg-primary text-bg" : "bg-bg text-secondary hover:text-primary"}`}>{item}</button>)}
        </div>
        <div className="mt-5 grid min-h-72 gap-4 lg:grid-cols-[1.2fr_1fr]">
          <div className={`border p-4 ${selected.tone}`}>
            <span className="text-xs text-secondary">同一个静态类型：Message</span>
            <code className="mt-4 block min-h-16 break-words text-sm leading-6 text-primary">{selected.constructor}</code>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">数据形状</span><strong className="mt-2 block text-sm text-primary">{selected.shape}</strong></div>
              <div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">payload</span><code className="mt-2 block text-xs text-primary">{selected.payload}</code></div>
            </div>
          </div>
          <section className="min-h-64 border border-border bg-bg p-4" aria-live="polite">
            <span className="text-xs text-secondary">匹配后行为</span>
            <h3 className="mt-3 text-base font-semibold text-primary">{selected.handler}</h3>
            <p className="mt-6 text-sm text-secondary">每个值在任一时刻只属于一个变体；模式既检查 tag，也绑定该变体独有的数据。</p>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">enum 把互斥状态和每种状态独有的数据放进一个类型，避免无效字段组合。</figcaption>
    </figure>
  );
}

export function RplOptionBoundaryLab() {
  const [present, setPresent] = useState(true);
  const [value, setValue] = useState(5);
  const result = present ? `Some(${value + 1})` : "None";
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid min-h-72 gap-5 lg:grid-cols-[1fr_1.25fr]">
          <div className="space-y-5 border border-border bg-bg p-4">
            <label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={present} onChange={(event) => setPresent(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />Some 值存在</label>
            <label className="block text-sm text-primary">inner value：{value}<input type="range" min="-10" max="20" value={value} disabled={!present} onChange={(event) => setValue(Number(event.target.value))} className="mt-2 w-full accent-[var(--accent)] disabled:opacity-40" /></label>
          </div>
          <section className={`min-h-64 border p-4 ${present ? "border-emerald-500/40 bg-emerald-500/10" : "border-amber-500/40 bg-amber-500/10"}`} aria-live="polite">
            <span className="text-xs text-secondary">Option&lt;i32&gt;</span>
            <code className="mt-3 block text-lg text-primary">{present ? `Some(${value})` : "None"}</code>
            <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
              <div className="border border-border bg-bg p-3 text-center text-xs text-primary">match</div><span className="text-secondary">→</span><div className="border border-border bg-bg p-3 text-center font-mono text-xs text-primary">{result}</div>
            </div>
            <p className="mt-6 text-sm text-secondary">`Option&lt;i32&gt;` 与 `i32` 是不同类型；必须先处理 None，才能对内部 i32 做加法。</p>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Option 让“缺失”成为显式变体，普通 T 不再携带隐式 null 状态。</figcaption>
    </figure>
  );
}

const flowModes = {
  match: { code: "match coin { Penny => 1, Nickel => 5, Dime => 10, Quarter(s) => 25 }", guarantee: "必须覆盖所有变体，arm 可绑定 payload 并产生统一类型", missing: "漏掉 Dime → 编译错误 non-exhaustive patterns", tone: "border-cyan-500/40 bg-cyan-500/10" },
  iflet: { code: "if let Some(value) = maybe { use_value(value); } else { fallback(); }", guarantee: "只关心一个模式时更短，其他情况可由 else 合并", missing: "没有 else 也合法，但非匹配路径被忽略", tone: "border-emerald-500/40 bg-emerald-500/10" },
  letelse: { code: "let Some(value) = maybe else { return; }; use_value(value);", guarantee: "成功绑定进入后续主路径，else 必须发散", missing: "else 必须 return/break/continue/panic，不能落回主路径", tone: "border-amber-500/40 bg-amber-500/10" },
} as const;

type FlowMode = keyof typeof flowModes;

export function RplPatternControlLab() {
  const [mode, setMode] = useState<FlowMode>("match");
  const [matched, setMatched] = useState(true);
  const selected = flowModes[mode];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 border border-border" role="group" aria-label="模式控制流选择">
          {(Object.keys(flowModes) as FlowMode[]).map((item) => <button key={item} type="button" aria-pressed={mode === item} onClick={() => setMode(item)} className={`min-h-11 border-r border-border px-2 font-mono text-sm last:border-r-0 ${mode === item ? "bg-primary text-bg" : "bg-bg text-secondary hover:text-primary"}`}>{item === "iflet" ? "if let" : item === "letelse" ? "let...else" : "match"}</button>)}
        </div>
        <div className="mt-5 grid min-h-80 gap-4 lg:grid-cols-[1.25fr_1fr]">
          <div className={`border p-4 ${selected.tone}`}><code className="block min-h-24 break-words text-sm leading-6 text-primary">{selected.code}</code><label className="mt-6 flex min-h-11 items-center gap-3 border border-border bg-bg px-3 text-sm text-primary"><input type="checkbox" checked={matched} onChange={(event) => setMatched(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />输入符合目标模式</label></div>
          <section className="min-h-72 border border-border bg-bg p-4" aria-live="polite"><span className="text-xs text-secondary">控制流保证</span><h3 className="mt-3 text-base font-semibold text-primary">{matched ? "执行匹配主路径" : mode === "letelse" ? "执行发散 else" : "执行其他/忽略路径"}</h3><p className="mt-6 text-sm text-primary">{selected.guarantee}</p><p className="mt-4 border-t border-border pt-4 text-xs text-secondary">{selected.missing}</p></section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">match 强制穷尽，if let 压缩单模式分支，let...else 把失败路径提前发散。</figcaption>
    </figure>
  );
}
