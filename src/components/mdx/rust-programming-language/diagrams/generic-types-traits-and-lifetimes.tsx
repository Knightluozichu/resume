"use client";

import { useState } from "react";

type GenericShape = "function" | "struct" | "enum" | "method";
type ConcreteType = "i32" | "f64" | "String";

const genericShapes = {
  function: { declaration: "fn largest<T: PartialOrd>(list: &[T]) -> &T", instantiated: (type: ConcreteType) => `fn largest_${type.replace("String", "string")}(list: &[${type}]) -> &${type}`, relation: "同一算法，T 必须支持比较" },
  struct: { declaration: "struct Point<T, U> { x: T, y: U }", instantiated: (type: ConcreteType) => `struct Point_${type.replace("String", "string")}_char { x: ${type}, y: char }`, relation: "不同参数可表达字段类型独立" },
  enum: { declaration: "enum Option<T> { Some(T), None }", instantiated: (type: ConcreteType) => `enum Option_${type.replace("String", "string")} { Some(${type}), None }`, relation: "变体共享具体化后的一个枚举类型" },
  method: { declaration: "impl<T> Point<T> { fn x(&self) -> &T }", instantiated: (type: ConcreteType) => `impl Point<${type}> { fn x(&self) -> &${type} }`, relation: "通用 impl 覆盖每个具体 Point<T>" },
} as const;

export function RplGenericInstantiationLab() {
  const [shape, setShape] = useState<GenericShape>("function");
  const [type, setType] = useState<ConcreteType>("i32");
  const selected = genericShapes[shape];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 border border-border sm:grid-cols-4" role="group" aria-label="泛型定义形状">
          {(Object.keys(genericShapes) as GenericShape[]).map((item) => <button key={item} type="button" aria-pressed={shape === item} onClick={() => setShape(item)} className={`min-h-11 border-b border-r border-border text-xs sm:border-b-0 sm:text-sm ${shape === item ? "bg-primary text-bg" : "bg-bg text-secondary hover:text-primary"}`}>{item}</button>)}
        </div>
        <div className="mt-4 grid grid-cols-3 border border-border" role="group" aria-label="具体类型">
          {(["i32", "f64", "String"] as ConcreteType[]).map((item) => <button key={item} type="button" aria-pressed={type === item} onClick={() => setType(item)} className={`min-h-11 border-r border-border font-mono text-sm last:border-r-0 ${type === item ? "bg-cyan-500 text-bg" : "bg-bg text-secondary hover:text-primary"}`}>{item}</button>)}
        </div>
        <div className="mt-5 grid min-h-80 gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          <section className="min-h-56 border border-cyan-500/40 bg-cyan-500/10 p-4"><span className="text-xs text-secondary">源码中的泛型定义</span><code className="mt-4 block break-words text-sm leading-7 text-primary">{selected.declaration}</code><p className="mt-6 text-sm text-secondary">{selected.relation}</p></section>
          <span className="hidden text-xl text-secondary lg:block">→</span>
          <section className="min-h-56 border border-emerald-500/40 bg-emerald-500/10 p-4" aria-live="polite"><span className="text-xs text-secondary">编译期具体化示意</span><code className="mt-4 block break-words text-sm leading-7 text-primary">{selected.instantiated(type)}</code><p className="mt-6 text-sm text-secondary">运行时执行具体类型代码；抽象主要付出编译时间和代码尺寸，而非动态类型检查。</p></section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">monomorphization 为实际使用的类型生成具体代码，保留泛型复用与静态性能。</figcaption>
    </figure>
  );
}

type TraitScenario = "bound" | "coherence" | "conditional";

export function RplTraitContractLab() {
  const [scenario, setScenario] = useState<TraitScenario>("bound");
  const [summary, setSummary] = useState(true);
  const [display, setDisplay] = useState(false);
  const [localTrait, setLocalTrait] = useState(false);
  const [localType, setLocalType] = useState(true);
  const allowed = scenario === "bound" ? summary && display : scenario === "coherence" ? localTrait || localType : display;
  const signature = scenario === "bound" ? "fn notify<T: Summary + Display>(item: &T)" : scenario === "coherence" ? "impl Display for Vec<T>" : "impl<T: Display + PartialOrd> Pair<T>";
  const verdict = scenario === "bound" ? allowed ? "可调用 summarize() 与 {} 格式化" : "缺少函数体所需 trait bound" : scenario === "coherence" ? allowed ? "trait 或 type 至少一个属于当前 crate" : "orphan rule：外部 trait 不能实现到外部 type" : allowed ? "Pair<T> 获得 cmp_display 方法" : "Pair<T> 只有无约束 impl 中的方法";
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 border border-border" role="group" aria-label="trait 契约场景">
          {(["bound", "coherence", "conditional"] as TraitScenario[]).map((item) => <button key={item} type="button" aria-pressed={scenario === item} onClick={() => setScenario(item)} className={`min-h-11 border-r border-border px-2 text-xs last:border-r-0 sm:text-sm ${scenario === item ? "bg-primary text-bg" : "bg-bg text-secondary hover:text-primary"}`}>{item}</button>)}
        </div>
        <div className="mt-5 grid min-h-80 gap-4 lg:grid-cols-[0.9fr_1.25fr]">
          <section className="space-y-3 border border-border bg-bg p-4">
            {scenario === "bound" && <><label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={summary} onChange={(event) => setSummary(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />T: Summary</label><label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={display} onChange={(event) => setDisplay(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />T: Display</label></>}
            {scenario === "coherence" && <><label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={localTrait} onChange={(event) => setLocalTrait(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />trait 属于当前 crate</label><label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={localType} onChange={(event) => setLocalType(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />type 属于当前 crate</label></>}
            {scenario === "conditional" && <><label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={display} onChange={(event) => setDisplay(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />T 实现 Display</label><div className="min-h-11 border border-border px-3 py-3 text-sm text-primary">T 实现 PartialOrd：固定为是</div></>}
          </section>
          <section className={`min-h-80 border p-4 ${allowed ? "border-emerald-500/40 bg-emerald-500/10" : "border-rose-500/40 bg-rose-500/10"}`} aria-live="polite">
            <span className="text-xs text-secondary">待验证声明</span><code className="mt-4 block min-h-20 break-words border border-border bg-bg p-3 text-sm leading-7 text-primary">{signature}</code>
            <h3 className="mt-6 text-base font-semibold text-primary">{allowed ? "编译契约成立" : "编译契约不成立"}</h3>
            <p className="mt-4 text-sm text-secondary">{verdict}</p>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">trait 描述行为；bounds 决定泛型代码可用能力，coherence 决定实现归属，条件 impl 决定方法集合。</figcaption>
    </figure>
  );
}

type LifetimeSignature = "longest" | "first" | "elided" | "static";

const lifetimeSignatures = {
  longest: { code: "fn longest<'a>(x: &'a str, y: &'a str) -> &'a str", output: "min(lifetime(x), lifetime(y))", meaning: "返回值可能来自任一输入，因此不能比较短输入活得更久。" },
  first: { code: "fn first<'a>(x: &'a str, y: &str) -> &'a str", output: "lifetime(x)", meaning: "返回值只来自 x，y 的寿命与输出没有关系。" },
  elided: { code: "fn first_word(s: &str) -> &str", output: "input lifetime", meaning: "单输入引用触发生命周期省略规则，输出绑定该输入。" },
  static: { code: "let s: &'static str = \"stored in binary\";", output: "whole program", meaning: "字符串字面量可活到程序结束，但普通局部借用不能通过标注变成 static。" },
} as const;

export function RplLifetimeRelationLab() {
  const [signature, setSignature] = useState<LifetimeSignature>("longest");
  const [xLifetime, setXLifetime] = useState(8);
  const [yLifetime, setYLifetime] = useState(4);
  const [useAt, setUseAt] = useState(6);
  const selected = lifetimeSignatures[signature];
  const permittedUntil = signature === "longest" ? Math.min(xLifetime, yLifetime) : signature === "first" || signature === "elided" ? xLifetime : 10;
  const valid = useAt <= permittedUntil;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 border border-border sm:grid-cols-4" role="group" aria-label="生命周期签名">
          {(Object.keys(lifetimeSignatures) as LifetimeSignature[]).map((item) => <button key={item} type="button" aria-pressed={signature === item} onClick={() => setSignature(item)} className={`min-h-11 border-b border-r border-border font-mono text-xs sm:border-b-0 sm:text-sm ${signature === item ? "bg-primary text-bg" : "bg-bg text-secondary hover:text-primary"}`}>{item}</button>)}
        </div>
        <div className="mt-5 grid min-h-96 gap-5 lg:grid-cols-[0.9fr_1.25fr]">
          <section className="space-y-5 border border-border bg-bg p-4">
            <label className="block text-sm text-primary">x 有效到 t={xLifetime}<input type="range" min="2" max="10" value={xLifetime} onChange={(event) => setXLifetime(Number(event.target.value))} className="mt-2 w-full accent-[var(--accent)]" /></label>
            <label className="block text-sm text-primary">y 有效到 t={yLifetime}<input type="range" min="2" max="10" value={yLifetime} onChange={(event) => setYLifetime(Number(event.target.value))} className="mt-2 w-full accent-[var(--accent)]" /></label>
            <label className="block text-sm text-primary">返回引用使用于 t={useAt}<input type="range" min="1" max="10" value={useAt} onChange={(event) => setUseAt(Number(event.target.value))} className="mt-2 w-full accent-[var(--accent)]" /></label>
          </section>
          <section className={`border p-4 ${valid ? "border-emerald-500/40 bg-emerald-500/10" : "border-rose-500/40 bg-rose-500/10"}`} aria-live="polite">
            <span className="text-xs text-secondary">签名表达的借用关系</span><code className="mt-3 block min-h-20 break-words border border-border bg-bg p-3 text-xs leading-6 text-primary">{selected.code}</code>
            <div className="mt-5 grid grid-cols-10 gap-1">{Array.from({ length: 10 }, (_, index) => <div key={index} className={`aspect-square min-h-7 border text-center text-[10px] leading-7 ${index + 1 <= permittedUntil ? "border-cyan-500/50 bg-cyan-500/10 text-primary" : "border-border bg-bg text-secondary"}`}>{index + 1}</div>)}</div>
            <h3 className="mt-6 text-base font-semibold text-primary">{valid ? `引用可在 t=${useAt} 使用` : `E0597：只保证到 t=${permittedUntil}`}</h3>
            <p className="mt-3 text-sm text-secondary">输出关系：{selected.output}。{selected.meaning}</p>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">生命周期标注描述引用之间的约束；它不会延长 owner，也不能让局部值逃出作用域。</figcaption>
    </figure>
  );
}
