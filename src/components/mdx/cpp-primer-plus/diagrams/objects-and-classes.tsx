"use client";

import { useState } from "react";

const boundaryRows = [
  { layer: "public interface", contains: "domain operations + observations", promise: "callable without knowing representation", reject: "mechanical field mutation" },
  { layer: "class invariant", contains: "relationships always true after public calls", promise: "every valid object is usable", reject: "temporarily invalid visible state" },
  { layer: "private representation", contains: "members + helper methods", promise: "change without breaking callers", reject: "external dependency on layout" },
] as const;

export function EppClassBoundaryMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="类的公有接口不变量和私有表示三层封装边界" className="grid gap-3 lg:grid-cols-3">
          {boundaryRows.map((row, index) => (
            <section key={row.layer} className="min-h-64 border border-cyan-500/35 bg-cyan-500/10 p-4">
              <span className="text-xs text-secondary">layer 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">{row.layer}</strong>
              <code className="mt-4 block break-words text-xs text-accent">{row.contains}</code>
              <p className="mt-4 text-xs text-primary">promise · {row.promise}</p>
              <p className="mb-0 mt-3 text-xs text-secondary">avoid · {row.reject}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        private 只是访问边界；真正封装要求 public 操作表达领域语义并在返回时恢复不变量。
      </figcaption>
    </figure>
  );
}

const lifecycleRows = [
  { stage: "storage", state: "raw storage reserved", callable: "no object operations", proof: "lifetime not begun" },
  { stage: "member init", state: "members constructed in declaration order", callable: "constructor body not yet", proof: "dependencies follow declaration order" },
  { stage: "constructor body", state: "establish final invariant", callable: "helpers with care", proof: "success means valid object" },
  { stage: "active lifetime", state: "public methods preserve invariant", callable: "this identifies current object", proof: "pre/postconditions" },
  { stage: "destruction", state: "body then members reverse order", callable: "no future access", proof: "owned resources released once" },
] as const;

export function EppObjectLifecycleFlow() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="对象从存储成员初始化构造函数体有效生命周期到析构的状态流程" className="space-y-3">
          {lifecycleRows.map((row, index) => (
            <section key={row.stage} className="grid min-h-32 gap-3 border border-border bg-background/60 p-4 lg:grid-cols-[0.55fr_1.1fr_1fr_1.1fr] lg:items-center">
              <div><span className="text-xs text-secondary">life 0{index + 1}</span><strong className="mt-2 block text-sm text-primary">{row.stage}</strong></div>
              <span className="text-xs text-primary">state · {row.state}</span>
              <code className="break-words text-xs text-accent">call · {row.callable}</code>
              <span className="text-xs text-secondary">proof · {row.proof}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        对象不是分配一块字节就存在；构造成功打开有效期，析构开始后接口契约逐步关闭。
      </figcaption>
    </figure>
  );
}

const stackCases = [
  { label: "push", before: "size = 2, capacity = 4", operation: "push(9)", after: "items[2] = 9, size = 3", invariant: "0 <= size <= capacity" },
  { label: "pop", before: "top = 9, size = 3", operation: "pop(out)", after: "out = 9, size = 2", invariant: "removed value came from old top" },
  { label: "overflow", before: "size = capacity", operation: "push(7)", after: "returns false, state unchanged", invariant: "no out-of-bounds write" },
  { label: "underflow", before: "size = 0", operation: "pop(out)", after: "returns false, out/state policy explicit", invariant: "no read before first element" },
] as const;

export function EppStackAdtLab() {
  const [active, setActive] = useState(0);
  const current = stackCases[active];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="tablist" aria-label="选择栈抽象数据类型操作" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {stackCases.map((item, index) => (
            <button key={item.label} type="button" role="tab" aria-selected={active === index} onClick={() => setActive(index)} className={`min-h-12 border px-3 py-2 text-sm transition-colors ${active === index ? "border-accent bg-accent/15 text-primary" : "border-border bg-background text-secondary hover:text-primary"}`}>{item.label}</button>
          ))}
        </div>
        <section role="tabpanel" className="mt-4 min-h-80 border border-border bg-background/60 p-4 sm:p-5">
          <code className="block text-sm text-accent">{current.operation}</code>
          <div className="mt-5 grid gap-3 lg:grid-cols-3">
            <div className="min-h-36 border border-amber-500/35 bg-amber-500/10 p-4"><strong className="text-sm text-primary">before</strong><p className="mb-0 mt-3 text-xs text-secondary">{current.before}</p></div>
            <div className="min-h-36 border border-emerald-500/35 bg-emerald-500/10 p-4"><strong className="text-sm text-primary">after</strong><p className="mb-0 mt-3 text-xs text-secondary">{current.after}</p></div>
            <div className="min-h-36 border border-cyan-500/35 bg-cyan-500/10 p-4"><strong className="text-sm text-primary">invariant</strong><p className="mb-0 mt-3 text-xs text-secondary">{current.invariant}</p></div>
          </div>
        </section>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        ADT 以操作前后状态定义语义；overflow/underflow 也必须保持对象有效，而不是交给数组越界处理。
      </figcaption>
    </figure>
  );
}
