"use client";

import { useState } from "react";

const contractRows = [
  { role: "container", provides: "storage + begin/end + invalidation rules", requires: "element lifetime/operations", failure: "iterator invalidated by mutation" },
  { role: "iterator", provides: "position + traversal category", requires: "valid range and owner", failure: "dereference end or stale iterator" },
  { role: "algorithm", provides: "generic operation over [first,last)", requires: "iterator category + callable contract", failure: "wrong ordering/range precondition" },
  { role: "functor", provides: "comparison/predicate/transform policy", requires: "stable semantics and state", failure: "violated strict weak ordering" },
] as const;

export function EppStlContractMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="STL容器迭代器算法和函数对象的协作契约图" className="grid gap-3 lg:grid-cols-4">
          {contractRows.map((row, index) => (
            <section key={row.role} className="min-h-64 border border-cyan-500/35 bg-cyan-500/10 p-4">
              <span className="text-xs text-secondary">role 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">{row.role}</strong>
              <p className="mt-4 text-xs text-primary">provides · {row.provides}</p>
              <code className="mt-4 block break-words text-xs text-accent">requires · {row.requires}</code>
              <p className="mb-0 mt-3 text-xs text-secondary">failure · {row.failure}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        STL 的复用边界不是某个容器类，而是 iterator category、半开范围与 callable 语义组成的协议。
      </figcaption>
    </figure>
  );
}

const pointerRows = [
  { pointer: "unique_ptr<T>", owner: "exactly one", copyMove: "move transfers; copy deleted", release: "owner destruction/delete", risk: "borrow outlives owner" },
  { pointer: "shared_ptr<T>", owner: "reference-counted group", copyMove: "copy increments count", release: "last strong owner", risk: "cycles + hidden lifetime" },
  { pointer: "weak_ptr<T>", owner: "non-owning observer", copyMove: "copy observer", release: "does not extend lifetime", risk: "lock may fail" },
  { pointer: "raw T*", owner: "unspecified", copyMove: "address aliases", release: "external protocol", risk: "leak/dangling/double delete" },
] as const;

export function EppSmartPointerOwnershipFlow() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="unique shared weak和裸指针的所有权与释放流程" className="space-y-3">
          {pointerRows.map((row) => (
            <section key={row.pointer} className="grid min-h-32 gap-3 border border-border bg-background/60 p-4 lg:grid-cols-[0.8fr_1fr_1.1fr_1fr_1.1fr] lg:items-center">
              <code className="text-sm text-accent">{row.pointer}</code>
              <span className="text-xs text-primary">owner · {row.owner}</span>
              <span className="text-xs text-secondary">copy/move · {row.copyMove}</span>
              <span className="text-xs text-primary">release · {row.release}</span>
              <span className="text-xs text-secondary">risk · {row.risk}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        smart pointer 模板编码的是所有权协议；它不自动决定借用有效期、线程同步或共享可变状态是否合理。
      </figcaption>
    </figure>
  );
}

const pipelineCases = [
  { label: "sort", input: "vector {4,1,3,2}", operation: "sort(begin,end,less)", output: "{1,2,3,4}", requirement: "random-access + strict weak ordering" },
  { label: "filter", input: "vector {1,2,3,4}", operation: "copy_if(..., is_even)", output: "{2,4} in destination", requirement: "valid output capacity/inserter" },
  { label: "transform", input: "list {1,2,3}", operation: "transform(..., square)", output: "{1,4,9}", requirement: "input traversal + writable output" },
  { label: "valarray", input: "valarray {1,2,3}", operation: "values * 2.0 + 1.0", output: "{3,5,7}", requirement: "elementwise numeric expression" },
] as const;

export function EppAlgorithmPipelineLab() {
  const [active, setActive] = useState(0);
  const current = pipelineCases[active];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="tablist" aria-label="选择STL算法或valarray管线" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {pipelineCases.map((item, index) => (
            <button key={item.label} type="button" role="tab" aria-selected={active === index} onClick={() => setActive(index)} className={`min-h-12 border px-3 py-2 text-sm transition-colors ${active === index ? "border-accent bg-accent/15 text-primary" : "border-border bg-background text-secondary hover:text-primary"}`}>{item.label}</button>
          ))}
        </div>
        <section role="tabpanel" className="mt-4 min-h-80 border border-border bg-background/60 p-4 sm:p-5">
          <code className="block break-words text-sm text-accent">{current.operation}</code>
          <div className="mt-5 grid gap-3 lg:grid-cols-3">
            <div className="min-h-36 border border-cyan-500/35 bg-cyan-500/10 p-4"><strong className="text-sm text-primary">input</strong><p className="mb-0 mt-3 text-xs text-secondary">{current.input}</p></div>
            <div className="min-h-36 border border-emerald-500/35 bg-emerald-500/10 p-4"><strong className="text-sm text-primary">output</strong><p className="mb-0 mt-3 text-xs text-secondary">{current.output}</p></div>
            <div className="min-h-36 border border-amber-500/35 bg-amber-500/10 p-4"><strong className="text-sm text-primary">requirement</strong><p className="mb-0 mt-3 text-xs text-secondary">{current.requirement}</p></div>
          </div>
        </section>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        先从算法所需 iterator/callable contract 反推容器和输出策略，而不是先选容器再手写循环。
      </figcaption>
    </figure>
  );
}
