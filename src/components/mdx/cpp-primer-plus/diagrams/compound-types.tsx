"use client";

import { useState } from "react";

const shapeRows = [
  { type: "array", shape: "N values · same type · contiguous", invariant: "index in [0, N)", use: "fixed-size sequence" },
  { type: "string", shape: "characters + length/terminator", invariant: "C string ends with \\0", use: "text representation" },
  { type: "struct", shape: "named heterogeneous members", invariant: "all members coexist", use: "one record" },
  { type: "union", shape: "members share storage", invariant: "read active member only", use: "exclusive representation" },
  { type: "enum", shape: "finite named values", invariant: "state belongs to domain", use: "closed state set" },
  { type: "pointer", shape: "address of typed object", invariant: "non-null/alive/in-range", use: "indirect access" },
] as const;

export function EppCompoundTypeShapeMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="数组字符串结构体联合体枚举和指针的数据形状不变量与用途" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {shapeRows.map((row) => (
            <section key={row.type} className="min-h-56 border border-cyan-500/35 bg-cyan-500/10 p-4">
              <strong className="text-sm text-primary">{row.type}</strong>
              <code className="mt-3 block break-words text-xs text-accent">{row.shape}</code>
              <p className="mt-4 text-xs text-primary">gate · {row.invariant}</p>
              <p className="mb-0 mt-3 text-xs text-secondary">use · {row.use}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        复合类型不是“字符更多的声明”，而是不同数据形状；选择错误会让不变量只能靠调用者猜。
      </figcaption>
    </figure>
  );
}

const ownershipRows = [
  { stage: "allocate", object: "new int[count]", owner: "raw pointer receives address", gate: "count and allocation success" },
  { stage: "use", object: "elements [0, count)", owner: "same owner, borrowed aliases", gate: "alive + per-access bounds" },
  { stage: "release", object: "delete[] data", owner: "owner ends allocation", gate: "exactly once, matching form" },
  { stage: "invalidate", object: "dangling address", owner: "no access remains legal", gate: "set null / end aliases" },
] as const;

export function EppPointerOwnershipFlow() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="new 分配动态数组使用半开区间 delete[] 释放并使指针失效的所有权流程" className="space-y-3">
          {ownershipRows.map((row, index) => (
            <section key={row.stage} className="grid min-h-32 gap-3 border border-border bg-background/60 p-4 lg:grid-cols-[0.5fr_0.8fr_1fr_1.1fr] lg:items-center">
              <div><span className="text-xs text-secondary">life 0{index + 1}</span><strong className="mt-2 block text-sm text-primary">{row.stage}</strong></div>
              <code className="break-words text-xs text-accent">{row.object}</code>
              <span className="text-xs text-primary">owner · {row.owner}</span>
              <span className="text-xs text-secondary">gate · {row.gate}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        裸指针只保存地址，不自动表达所有者、长度或生命周期；三者必须由外部契约同步维护。
      </figcaption>
    </figure>
  );
}

const boundaryCases = [
  { label: "数组越界", code: "values[count] = 7", violated: "valid indices are [0, count)", symptom: "undefined behavior, maybe silent corruption", repair: "loop i < count; carry length with view/container" },
  { label: "字符串终止", code: "char name[4] = {'A','d','a','!'}", violated: "no space for terminating \\0", symptom: "C-string read continues beyond array", repair: "reserve terminator or use std::string" },
  { label: "union 成员", code: "u.number = 3; read u.text", violated: "text is not active member", symptom: "invalid interpretation / undefined behavior", repair: "synchronize tag or use std::variant" },
  { label: "动态泄漏", code: "data = new int[n]; return;", violated: "owner exits without delete[]", symptom: "allocation remains unreachable", repair: "vector/unique_ptr or scoped owner" },
] as const;

export function EppCompoundBoundaryLab() {
  const [active, setActive] = useState(0);
  const current = boundaryCases[active];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="tablist" aria-label="选择复合类型边界故障" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {boundaryCases.map((item, index) => (
            <button key={item.label} type="button" role="tab" aria-selected={active === index} onClick={() => setActive(index)} className={`min-h-12 border px-3 py-2 text-sm transition-colors ${active === index ? "border-accent bg-accent/15 text-primary" : "border-border bg-background text-secondary hover:text-primary"}`}>{item.label}</button>
          ))}
        </div>
        <section role="tabpanel" className="mt-4 min-h-80 border border-border bg-background/60 p-4 sm:p-5">
          <code className="block break-words text-sm text-accent">{current.code}</code>
          <div className="mt-5 grid gap-3 lg:grid-cols-3">
            <div className="min-h-36 border border-amber-500/35 bg-amber-500/10 p-4"><strong className="text-sm text-primary">破坏契约</strong><p className="mb-0 mt-3 text-xs text-secondary">{current.violated}</p></div>
            <div className="min-h-36 border border-rose-500/35 bg-rose-500/10 p-4"><strong className="text-sm text-primary">可能现象</strong><p className="mb-0 mt-3 text-xs text-secondary">{current.symptom}</p></div>
            <div className="min-h-36 border border-emerald-500/35 bg-emerald-500/10 p-4"><strong className="text-sm text-primary">修复边界</strong><p className="mb-0 mt-3 text-xs text-secondary">{current.repair}</p></div>
          </div>
        </section>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        切换四种故障并指出被破坏的不变量；“没崩溃”不能证明越界、错误活动成员或泄漏合法。
      </figcaption>
    </figure>
  );
}
