"use client";

import { useState } from "react";

const copyRows = [
  { policy: "memberwise pointer copy", source: "a.ptr -> heap A", target: "b.ptr -> same heap A", destroy: "double delete + aliasing", verdict: "invalid unique ownership" },
  { policy: "deep copy", source: "a.ptr -> heap A", target: "b.ptr -> heap B clone", destroy: "each owner deletes once", verdict: "independent values" },
  { policy: "move/transfer", source: "a.ptr -> null", target: "b.ptr -> heap A", destroy: "one remaining owner", verdict: "source valid but empty" },
  { policy: "RAII member", source: "a.string owns storage", target: "b.string copies by contract", destroy: "member destructor handles it", verdict: "rule of zero" },
] as const;

export function EppCopyControlStateMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="类的浅复制深复制移动和RAII成员四种所有权状态" className="space-y-3">
          {copyRows.map((row) => (
            <section key={row.policy} className="grid min-h-36 gap-3 border border-border bg-background/60 p-4 lg:grid-cols-[1fr_1fr_1fr_1.1fr_1fr] lg:items-center">
              <strong className="text-sm text-primary">{row.policy}</strong>
              <code className="break-words text-xs text-accent">{row.source}</code>
              <code className="break-words text-xs text-accent">{row.target}</code>
              <span className="text-xs text-secondary">destroy · {row.destroy}</span>
              <span className="text-xs text-primary">{row.verdict}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        默认 memberwise copy 只复制地址；只要类宣称唯一拥有动态对象，就必须定义复制语义或改用自带复制契约的 RAII 成员。
      </figcaption>
    </figure>
  );
}

const assignmentRows = [
  { stage: "self-check", action: "if (this == &rhs) return *this", invariant: "do not destroy source when aliases are same" },
  { stage: "allocate", action: "new char[rhs.length + 1]", invariant: "old state remains valid if allocation fails" },
  { stage: "copy", action: "copy rhs bytes into fresh storage", invariant: "new buffer owns a complete value" },
  { stage: "commit", action: "delete[] old; ptr = fresh; length = rhs.length", invariant: "exactly one owner after commit" },
  { stage: "return", action: "return *this", invariant: "supports chained assignment" },
] as const;

export function EppAssignmentTransactionFlow() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="深复制赋值运算符从自赋值检查到提交的事务流程" className="grid gap-3 lg:grid-cols-5">
          {assignmentRows.map((row, index) => (
            <section key={row.stage} className="min-h-64 border border-cyan-500/35 bg-cyan-500/10 p-4">
              <span className="text-xs text-secondary">phase 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">{row.stage}</strong>
              <code className="mt-4 block break-words text-xs text-accent">{row.action}</code>
              <p className="mb-0 mt-4 text-xs text-secondary">proof · {row.invariant}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        先取得完整新状态再提交，能避免“先 delete 后分配失败”把左值留成悬空或半初始化对象。
      </figcaption>
    </figure>
  );
}

const queueCases = [
  { label: "stable", arrival: "2 customers/min", service: "3 customers/min", trend: "queue drains between bursts", wait: "bounded in this model" },
  { label: "critical", arrival: "3 customers/min", service: "3 customers/min", trend: "variance creates persistent lines", wait: "sensitive to bursts" },
  { label: "overload", arrival: "4 customers/min", service: "3 customers/min", trend: "backlog grows roughly 1/min", wait: "unbounded without rejection" },
  { label: "capacity", arrival: "4 customers/min, cap 5", service: "3 customers/min", trend: "queue bounded by dropped arrivals", wait: "loss rate becomes output" },
] as const;

export function EppQueueSimulationLab() {
  const [active, setActive] = useState(0);
  const current = queueCases[active];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="tablist" aria-label="选择队列到达和服务场景" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {queueCases.map((item, index) => (
            <button key={item.label} type="button" role="tab" aria-selected={active === index} onClick={() => setActive(index)} className={`min-h-12 border px-3 py-2 text-sm transition-colors ${active === index ? "border-accent bg-accent/15 text-primary" : "border-border bg-background text-secondary hover:text-primary"}`}>{item.label}</button>
          ))}
        </div>
        <section role="tabpanel" className="mt-4 min-h-80 border border-border bg-background/60 p-4 sm:p-5">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="min-h-28 border border-emerald-500/35 bg-emerald-500/10 p-4"><strong className="text-sm text-primary">arrival</strong><code className="mt-3 block text-xs text-secondary">{current.arrival}</code></div>
            <div className="min-h-28 border border-cyan-500/35 bg-cyan-500/10 p-4"><strong className="text-sm text-primary">service</strong><code className="mt-3 block text-xs text-secondary">{current.service}</code></div>
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="min-h-32 border border-amber-500/35 bg-amber-500/10 p-4"><strong className="text-sm text-primary">queue trend</strong><p className="mb-0 mt-3 text-xs text-secondary">{current.trend}</p></div>
            <div className="min-h-32 border border-border bg-background p-4"><strong className="text-sm text-primary">observed wait</strong><p className="mb-0 mt-3 text-xs text-secondary">{current.wait}</p></div>
          </div>
        </section>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        队列实现正确只保证 FIFO；模拟还必须报告到达、服务、拒绝和等待统计，才能判断系统是否稳定。
      </figcaption>
    </figure>
  );
}
