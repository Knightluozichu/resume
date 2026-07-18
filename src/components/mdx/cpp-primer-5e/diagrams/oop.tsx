import type { ReactNode } from "react";

function Frame({ caption, children }: { caption: string; children: ReactNode }) {
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">{children}</div><figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption></figure>;
}

const contracts = [
  ["Subtype", "Derived is-a Base", "public 继承允许安全向上转换"],
  ["Lookup", "derived scope → base scope", "先找名字，再做重载决议"],
  ["Dispatch", "base ref/pointer → final overrider", "语言保证动态绑定，不规定表布局"],
  ["Lifetime", "base construct → derived · reverse destroy", "构造析构期间只分派到当前层"],
  ["Ownership", "virtual destructor · clone", "多态删除与值式复制都需明确接口"],
  ["Composition", "Basket · Query handle", "容器保存多态所有者，不保存切片对象"],
] as const;

export function CppOOPContractDiagram() {
  return <Frame caption="Chapter 15 的多态契约横跨子类型转换、名字查找、动态分派、生命周期、所有权与容器组合。"><div role="img" aria-label="C++ Primer第十五章继承作用域动态绑定生命周期虚析构clone和容器多态契约" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{contracts.map(([title,code,meaning],index)=><section key={title} className="min-h-32 border border-border bg-bg/40 p-4"><div className="flex items-center justify-between gap-3"><strong className="text-sm text-primary">{title}</strong><span className="text-xs tabular-nums text-secondary">0{index + 1}</span></div><code className="mt-3 block text-xs text-accent">{code}</code><p className="mb-0 mt-3 text-xs leading-5 text-secondary">{meaning}</p></section>)}</div></Frame>;
}
