"use client";

import { useState } from "react";

const featureRows = [
  { feature: "uniform initialization", replaces: "mixed (), =, aggregate forms", contract: "brace syntax + narrowing diagnostics", proof: "initializer_list preference audited" },
  { feature: "auto / decltype", replaces: "repeated dependent type spelling", contract: "deduction follows precise rules", proof: "reference/cv preservation checked" },
  { feature: "scoped enum", replaces: "unscoped names + implicit int", contract: "qualified names + no implicit integer", proof: "underlying representation deliberate" },
  { feature: "default/delete/override", replaces: "implicit special-member guesses", contract: "class intent compiler-checked", proof: "copy/move/virtual surface explicit" },
] as const;

export function EppModernFeatureMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="统一初始化自动推导作用域枚举和新类特性的契约地图" className="grid gap-3 lg:grid-cols-4">
          {featureRows.map((row, index) => (
            <section key={row.feature} className="min-h-64 border border-cyan-500/35 bg-cyan-500/10 p-4">
              <span className="text-xs text-secondary">feature 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">{row.feature}</strong>
              <p className="mt-4 text-xs text-secondary">replaces · {row.replaces}</p>
              <code className="mt-4 block break-words text-xs text-accent">contract · {row.contract}</code>
              <p className="mb-0 mt-3 text-xs text-primary">proof · {row.proof}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        新语法的价值在于把 narrowing、owner、override 和名字作用域交给类型系统检查，而非单纯缩短代码。
      </figcaption>
    </figure>
  );
}

const moveRows = [
  { stage: "lvalue source", expression: "buffer", selected: "copy overload by default", sourceAfter: "unchanged", target: "independent resource" },
  { stage: "xvalue request", expression: "std::move(buffer)", selected: "rvalue-reference overload", sourceAfter: "valid but unspecified", target: "resource transferred" },
  { stage: "temporary", expression: "Buffer{size}", selected: "move or elision", sourceAfter: "temporary lifetime ends", target: "constructed efficiently" },
  { stage: "reuse source", expression: "buffer = Buffer{}", selected: "assign known state", sourceAfter: "valid known empty", target: "old owner releases/replaces" },
] as const;

export function EppMoveStateFlow() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="左值右值引用移动和move后源对象状态流程" className="space-y-3">
          {moveRows.map((row, index) => (
            <section key={row.stage} className="grid min-h-32 gap-3 border border-border bg-background/60 p-4 lg:grid-cols-[0.8fr_1fr_1.15fr_1.1fr_1fr] lg:items-center">
              <div><span className="text-xs text-secondary">move 0{index + 1}</span><strong className="mt-2 block text-sm text-primary">{row.stage}</strong></div>
              <code className="break-words text-xs text-accent">{row.expression}</code>
              <span className="text-xs text-primary">select · {row.selected}</span>
              <span className="text-xs text-secondary">source · {row.sourceAfter}</span>
              <span className="text-xs text-primary">target · {row.target}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        std::move 只把表达式转换为可移动类别；真正是否转移、源对象保留什么状态由目标类型的 move operation 决定。
      </figcaption>
    </figure>
  );
}

const callableCases = [
  { label: "lambda", declaration: "[limit](int x){ return x < limit; }", storage: "unique closure type", invocation: "direct/inlined candidate", boundary: "capture lifetime + mutability" },
  { label: "std::function", declaration: "function<bool(int)> pred", storage: "type-erased callable", invocation: "uniform runtime wrapper", boundary: "allocation/indirection + copyability" },
  { label: "bind", declaration: "bind(compare, _1, limit)", storage: "bound callable object", invocation: "placeholder remaps arguments", boundary: "value/reference binding visibility" },
  { label: "variadic", declaration: "template<class... Ts> log(Ts&&... xs)", storage: "parameter pack per call", invocation: "compile-time expansion", boundary: "forwarding + empty pack/base case" },
] as const;

export function EppCallableVariadicLab() {
  const [active, setActive] = useState(0);
  const current = callableCases[active];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="tablist" aria-label="选择lambda包装器bind或可变参数模板" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {callableCases.map((item, index) => (
            <button key={item.label} type="button" role="tab" aria-selected={active === index} onClick={() => setActive(index)} className={`min-h-12 border px-3 py-2 text-sm transition-colors ${active === index ? "border-accent bg-accent/15 text-primary" : "border-border bg-background text-secondary hover:text-primary"}`}>{item.label}</button>
          ))}
        </div>
        <section role="tabpanel" className="mt-4 min-h-80 border border-border bg-background/60 p-4 sm:p-5">
          <code className="block break-words text-sm text-accent">{current.declaration}</code>
          <div className="mt-5 grid gap-3 lg:grid-cols-3">
            <div className="min-h-36 border border-cyan-500/35 bg-cyan-500/10 p-4"><strong className="text-sm text-primary">storage</strong><p className="mb-0 mt-3 text-xs text-secondary">{current.storage}</p></div>
            <div className="min-h-36 border border-emerald-500/35 bg-emerald-500/10 p-4"><strong className="text-sm text-primary">invocation</strong><p className="mb-0 mt-3 text-xs text-secondary">{current.invocation}</p></div>
            <div className="min-h-36 border border-amber-500/35 bg-amber-500/10 p-4"><strong className="text-sm text-primary">boundary</strong><p className="mb-0 mt-3 text-xs text-secondary">{current.boundary}</p></div>
          </div>
        </section>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        callable 复用要区分编译期具体类型、运行时 type erasure、绑定参数和 parameter-pack expansion 四种成本模型。
      </figcaption>
    </figure>
  );
}
