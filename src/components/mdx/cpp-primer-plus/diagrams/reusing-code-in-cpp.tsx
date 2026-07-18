"use client";

import { useState } from "react";

const reuseRows = [
  { mechanism: "containment", relation: "has-a", publicSurface: "owner chooses what to forward", coupling: "member public API", use: "default implementation reuse" },
  { mechanism: "private inheritance", relation: "implemented-in-terms-of", publicSurface: "Base public becomes private", coupling: "Base protected + virtual hooks", use: "empty-base/override need" },
  { mechanism: "protected inheritance", relation: "derived implementation reuse", publicSurface: "Base public/protected become protected", coupling: "all future derived types", use: "rare framework layer" },
  { mechanism: "public inheritance", relation: "is-a", publicSurface: "Base contract remains public", coupling: "substitutability obligation", use: "true polymorphic taxonomy" },
] as const;

export function EppReuseMechanismMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="包含私有继承保护继承和公有继承的复用契约决策图" className="space-y-3">
          {reuseRows.map((row) => (
            <section key={row.mechanism} className="grid min-h-36 gap-3 border border-border bg-background/60 p-4 lg:grid-cols-[0.85fr_0.8fr_1.25fr_1.15fr_1fr] lg:items-center">
              <strong className="text-sm text-primary">{row.mechanism}</strong>
              <code className="text-xs text-accent">{row.relation}</code>
              <span className="text-xs text-primary">surface · {row.publicSurface}</span>
              <span className="text-xs text-secondary">coupling · {row.coupling}</span>
              <span className="text-xs text-primary">use · {row.use}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        先选择领域关系和暴露面，再选择语法；代码复用本身不足以证明继承访问方式。
      </figcaption>
    </figure>
  );
}

const diamondRows = [
  { stage: "nonvirtual diamond", state: "Worker appears twice", lookup: "ambiguous Worker::name", construction: "each branch constructs its own base" },
  { stage: "virtual inheritance", state: "one shared Worker subobject", lookup: "qualified branch behavior if needed", construction: "most-derived class owns virtual-base init" },
  { stage: "override merge", state: "two final overriders may conflict", lookup: "most-derived override resolves", construction: "delegates to chosen branch contracts" },
  { stage: "destruction", state: "derived, branches, virtual base", lookup: "virtual destructor follows full object", construction: "reverse of completed construction" },
] as const;

export function EppDiamondResolutionFlow() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="多重继承菱形重复基类到虚基类消歧的流程" className="grid gap-3 lg:grid-cols-4">
          {diamondRows.map((row, index) => (
            <section key={row.stage} className="min-h-64 border border-amber-500/35 bg-amber-500/10 p-4">
              <span className="text-xs text-secondary">case 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">{row.stage}</strong>
              <p className="mt-4 text-xs text-primary">state · {row.state}</p>
              <code className="mt-4 block break-words text-xs text-accent">lookup · {row.lookup}</code>
              <p className="mb-0 mt-3 text-xs text-secondary">lifetime · {row.construction}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        virtual base 解决的是共享祖先身份与初始化责任，不会自动消除同名函数或 final overrider 冲突。
      </figcaption>
    </figure>
  );
}

const templateCases = [
  { label: "Stack<int>", storage: "int items[capacity]", operation: "copy + assignment available", result: "push/pop compile", boundary: "capacity still runtime state" },
  { label: "Stack<string>", storage: "string items[capacity]", operation: "default construction + copy", result: "value lifetime managed", boundary: "allocation may occur inside string" },
  { label: "Stack<unique_ptr>", storage: "unique_ptr items[capacity]", operation: "copy expression unavailable", result: "copy-based push fails", boundary: "API should move or constrain" },
  { label: "Stack<NoDefault>", storage: "T items[capacity]", operation: "array default-constructs T", result: "class instantiation fails", boundary: "representation imposed hidden requirement" },
] as const;

export function EppClassTemplateLab() {
  const [active, setActive] = useState(0);
  const current = templateCases[active];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="tablist" aria-label="选择类模板实例化类型" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {templateCases.map((item, index) => (
            <button key={item.label} type="button" role="tab" aria-selected={active === index} onClick={() => setActive(index)} className={`min-h-14 border px-3 py-2 text-xs transition-colors ${active === index ? "border-accent bg-accent/15 text-primary" : "border-border bg-background text-secondary hover:text-primary"}`}>{item.label}</button>
          ))}
        </div>
        <section role="tabpanel" className="mt-4 min-h-80 border border-border bg-background/60 p-4 sm:p-5">
          <code className="block break-words text-sm text-accent">{current.storage}</code>
          <div className="mt-5 grid gap-3 lg:grid-cols-3">
            <div className="min-h-36 border border-cyan-500/35 bg-cyan-500/10 p-4"><strong className="text-sm text-primary">required operation</strong><p className="mb-0 mt-3 text-xs text-secondary">{current.operation}</p></div>
            <div className="min-h-36 border border-emerald-500/35 bg-emerald-500/10 p-4"><strong className="text-sm text-primary">instantiation</strong><p className="mb-0 mt-3 text-xs text-secondary">{current.result}</p></div>
            <div className="min-h-36 border border-amber-500/35 bg-amber-500/10 p-4"><strong className="text-sm text-primary">design boundary</strong><p className="mb-0 mt-3 text-xs text-secondary">{current.boundary}</p></div>
          </div>
        </section>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        class template 复用的是类型模式；每次实例化都必须满足模板体和表示实际使用的操作要求。
      </figcaption>
    </figure>
  );
}
