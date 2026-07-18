import type { ReactNode } from "react";

function Frame({ caption, children }: { caption: string; children: ReactNode }) {
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">{children}</div><figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption></figure>;
}

const stages = [
  ["Declare", "template parameters + pattern", "模板本身不是某个具体函数或类"],
  ["Deduce", "arguments → template arguments", "引用、数组和 const 规则影响推断"],
  ["Select", "overload + partial ordering", "先选候选模板，再应用特化"],
  ["Instantiate", "substitute → semantic check", "只有使用到的成员通常才实例化"],
  ["Forward", "T&& + forward<T>", "保留调用点左值或右值类别"],
  ["Expand", "pattern containing pack...", "包扩展可生成类型、形参或表达式序列"],
] as const;

export function CppTemplateResolutionDiagram() {
  return <Frame caption="Chapter 16 的编译链：声明模板、推断实参、选择重载、实例化语义，再处理转发和参数包展开。"><div role="img" aria-label="C++ Primer第十六章模板声明推断重载选择实例化完美转发和参数包展开流程" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{stages.map(([title,code,meaning],index)=><section key={title} className="min-h-32 border border-border bg-bg/40 p-4"><div className="flex items-center justify-between gap-3"><strong className="text-sm text-primary">{title}</strong><span className="text-xs tabular-nums text-secondary">0{index + 1}</span></div><code className="mt-3 block text-xs text-accent">{code}</code><p className="mb-0 mt-3 text-xs leading-5 text-secondary">{meaning}</p></section>)}</div></Frame>;
}
