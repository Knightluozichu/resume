"use client";

import { useState } from "react";

const contractRows = [
  { relation: "public inheritance", promise: "Derived usable wherever Base is required", evidence: "preserve Base pre/postconditions", reject: "reuse implementation only" },
  { relation: "protected state", promise: "derived implementation may access", evidence: "all future derived classes become dependants", reject: "representation freedom" },
  { relation: "override", promise: "same virtual contract, specialized behavior", evidence: "override keyword + base-facing tests", reject: "stronger precondition" },
  { relation: "virtual destructor", promise: "delete through Base* destroys full object", evidence: "derived then base cleanup", reject: "partial destruction" },
] as const;

export function EppInheritanceContractMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="公有继承替换性覆盖和虚析构契约地图" className="grid gap-3 lg:grid-cols-4">
          {contractRows.map((row, index) => (
            <section key={row.relation} className="min-h-64 border border-cyan-500/35 bg-cyan-500/10 p-4">
              <span className="text-xs text-secondary">contract 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">{row.relation}</strong>
              <p className="mt-4 text-xs text-primary">promise · {row.promise}</p>
              <code className="mt-4 block break-words text-xs text-accent">proof · {row.evidence}</code>
              <p className="mb-0 mt-3 text-xs text-secondary">avoid · {row.reject}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        public inheritance 是替换承诺，不是代码搬运工具；实现复用若不满足 is-a，应改用 containment。
      </figcaption>
    </figure>
  );
}

const lifetimeRows = [
  { stage: "base construction", active: "Base subobject", dispatch: "Base virtual implementation", reason: "Derived invariant not established" },
  { stage: "derived construction", active: "Derived members then body", dispatch: "current construction layer", reason: "object opens layer by layer" },
  { stage: "full lifetime", active: "complete Derived object", dispatch: "most-derived override", reason: "dynamic type is fully active" },
  { stage: "derived destruction", active: "Derived body/resources", dispatch: "current destruction layer", reason: "Derived contract is closing" },
  { stage: "base destruction", active: "Base subobject only", dispatch: "Base virtual implementation", reason: "Derived lifetime has ended" },
] as const;

export function EppConstructionDispatchFlow() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="继承对象构造完整生命周期和析构期间的虚函数分派时序" className="space-y-3">
          {lifetimeRows.map((row, index) => (
            <section key={row.stage} className="grid min-h-32 gap-3 border border-border bg-background/60 p-4 lg:grid-cols-[0.8fr_1.1fr_1.1fr_1.2fr] lg:items-center">
              <div><span className="text-xs text-secondary">life 0{index + 1}</span><strong className="mt-2 block text-sm text-primary">{row.stage}</strong></div>
              <span className="text-xs text-primary">active · {row.active}</span>
              <code className="break-words text-xs text-accent">dispatch · {row.dispatch}</code>
              <span className="text-xs text-secondary">why · {row.reason}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        构造和析构期间不会分派到尚未建立或已经关闭的派生层；不要从这些阶段依赖派生 override。
      </figcaption>
    </figure>
  );
}

const bindingCases = [
  { label: "by value", declaration: "void render(Shape value)", object: "Circle passed", call: "value.draw()", result: "sliced Shape; derived state gone" },
  { label: "reference", declaration: "void render(const Shape& value)", object: "Circle bound", call: "value.draw()", result: "virtual dispatch to Circle::draw" },
  { label: "nonvirtual", declaration: "Shape& value", object: "Circle bound", call: "value.name()", result: "static binding to Shape::name" },
  { label: "pure virtual", declaration: "virtual area() = 0", object: "Shape construction rejected", call: "circle.area()", result: "concrete override required" },
] as const;

export function EppPolymorphismLab() {
  const [active, setActive] = useState(0);
  const current = bindingCases[active];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="tablist" aria-label="选择静态或动态绑定场景" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {bindingCases.map((item, index) => (
            <button key={item.label} type="button" role="tab" aria-selected={active === index} onClick={() => setActive(index)} className={`min-h-12 border px-3 py-2 text-sm transition-colors ${active === index ? "border-accent bg-accent/15 text-primary" : "border-border bg-background text-secondary hover:text-primary"}`}>{item.label}</button>
          ))}
        </div>
        <section role="tabpanel" className="mt-4 min-h-80 border border-border bg-background/60 p-4 sm:p-5">
          <code className="block break-words text-sm text-accent">{current.declaration}</code>
          <div className="mt-5 grid gap-3 lg:grid-cols-3">
            <div className="min-h-36 border border-cyan-500/35 bg-cyan-500/10 p-4"><strong className="text-sm text-primary">dynamic object</strong><p className="mb-0 mt-3 text-xs text-secondary">{current.object}</p></div>
            <div className="min-h-36 border border-amber-500/35 bg-amber-500/10 p-4"><strong className="text-sm text-primary">expression</strong><code className="mt-3 block break-words text-xs text-secondary">{current.call}</code></div>
            <div className="min-h-36 border border-emerald-500/35 bg-emerald-500/10 p-4"><strong className="text-sm text-primary">result</strong><p className="mb-0 mt-3 text-xs text-secondary">{current.result}</p></div>
          </div>
        </section>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        多态需要基类 pointer/reference 保留动态对象身份，并要求被调用成员是 virtual；按值传递会发生 slicing。
      </figcaption>
    </figure>
  );
}
