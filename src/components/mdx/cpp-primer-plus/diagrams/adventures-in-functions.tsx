"use client";

import { useState } from "react";

const featureRows = [
  { feature: "inline", solves: "small function definition across TUs", contract: "same definition; compiler may inline call", risk: "code growth / ODR mismatch" },
  { feature: "reference", solves: "alias an existing object", contract: "non-null binding; lifetime covers use", risk: "hidden mutation / dangling" },
  { feature: "default argument", solves: "omit trailing common arguments", contract: "visible at call site", risk: "duplicate defaults / API drift" },
  { feature: "overload", solves: "one operation name for distinct signatures", contract: "unique best viable function", risk: "ambiguity / surprising conversion" },
  { feature: "function template", solves: "generate family from type pattern", contract: "operations valid for deduced type", risk: "late diagnostics / unintended instantiation" },
] as const;

export function EppFunctionFeatureMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="inline reference default argument overload 和 function template 的用途契约与风险" className="space-y-3">
          {featureRows.map((row, index) => (
            <section key={row.feature} className="grid min-h-32 gap-3 border border-border bg-background/60 p-4 lg:grid-cols-[0.5fr_1fr_1.2fr_1fr] lg:items-center">
              <div><span className="text-xs text-secondary">feature 0{index + 1}</span><strong className="mt-2 block text-sm text-primary">{row.feature}</strong></div>
              <span className="text-xs text-primary">use · {row.solves}</span>
              <code className="break-words text-xs text-accent">gate · {row.contract}</code>
              <span className="text-xs text-secondary">risk · {row.risk}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        五种机制解决不同问题；把它们都当“减少代码量”会遗漏别名、候选集和实例化契约。
      </figcaption>
    </figure>
  );
}

const aliasRows = [
  { form: "T value", binding: "independent copy", mutation: "changes local copy", lifetime: "parameter object in call frame" },
  { form: "T& value", binding: "alias mutable lvalue", mutation: "writes caller object", lifetime: "caller object must outlive call" },
  { form: "const T& value", binding: "alias read-only lvalue or temporary", mutation: "cannot write through reference", lifetime: "temporary may extend for binding context" },
  { form: "T* value", binding: "nullable address", mutation: "writes pointee if valid", lifetime: "explicit non-null/owner/range proof" },
] as const;

export function EppReferenceBindingFlow() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="按值可写引用 const 引用和指针参数的绑定修改与生命周期区别" className="grid gap-3 lg:grid-cols-2">
          {aliasRows.map((row) => (
            <section key={row.form} className="min-h-56 border border-cyan-500/35 bg-cyan-500/10 p-4">
              <code className="text-sm text-accent">{row.form}</code>
              <p className="mt-4 text-xs text-primary">binding · {row.binding}</p>
              <p className="mt-3 text-xs text-primary">mutation · {row.mutation}</p>
              <p className="mb-0 mt-3 text-xs text-secondary">lifetime · {row.lifetime}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        参数形式同时表达复制、可空性、写权限和生命周期；性能只是选择依据之一。
      </figcaption>
    </figure>
  );
}

const resolutionCases = [
  { label: "精确匹配", call: "show(42)", candidates: "show(int), show(double), template<T>", winner: "show(int)", reason: "exact non-template match" },
  { label: "提升", call: "show(shortValue)", candidates: "show(int), show(double)", winner: "show(int)", reason: "integral promotion beats conversion" },
  { label: "模板", call: "swap_values(a, b)", candidates: "template<class T> swap_values(T&,T&)", winner: "T deduced from both arguments", reason: "both deductions must agree" },
  { label: "歧义", call: "mix(1, 1)", candidates: "mix(long,double), mix(double,long)", winner: "none", reason: "each candidate is better for one argument" },
] as const;

export function EppOverloadResolutionLab() {
  const [active, setActive] = useState(0);
  const current = resolutionCases[active];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="tablist" aria-label="选择重载解析案例" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {resolutionCases.map((item, index) => (
            <button key={item.label} type="button" role="tab" aria-selected={active === index} onClick={() => setActive(index)} className={`min-h-12 border px-3 py-2 text-sm transition-colors ${active === index ? "border-accent bg-accent/15 text-primary" : "border-border bg-background text-secondary hover:text-primary"}`}>{item.label}</button>
          ))}
        </div>
        <section role="tabpanel" className="mt-4 min-h-80 border border-border bg-background/60 p-4 sm:p-5">
          <code className="block text-base text-accent">{current.call}</code>
          <div className="mt-5 grid gap-3 lg:grid-cols-3">
            <div className="min-h-40 border border-amber-500/35 bg-amber-500/10 p-4"><strong className="text-sm text-primary">候选</strong><p className="mb-0 mt-3 text-xs text-secondary">{current.candidates}</p></div>
            <div className="min-h-40 border border-emerald-500/35 bg-emerald-500/10 p-4"><strong className="text-sm text-primary">结果</strong><p className="mb-0 mt-3 text-xs text-secondary">{current.winner}</p></div>
            <div className="min-h-40 border border-cyan-500/35 bg-cyan-500/10 p-4"><strong className="text-sm text-primary">理由</strong><p className="mb-0 mt-3 text-xs text-secondary">{current.reason}</p></div>
          </div>
        </section>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        重载解析先形成可行候选，再比较转换等级；返回类型不参与候选区分，模板推导也可能失败。
      </figcaption>
    </figure>
  );
}
