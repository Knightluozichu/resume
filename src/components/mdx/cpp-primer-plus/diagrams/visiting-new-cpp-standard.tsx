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
