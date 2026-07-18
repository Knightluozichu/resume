import type { ReactNode } from "react";

function Frame({ caption, children }: { caption: string; children: ReactNode }) {
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">{children}</div><figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption></figure>;
}

const contracts = [
  ["Syntax fixed", "arity · precedence · associativity", "重载不能发明新语法或改变解析"],
  ["Member only", "assign · subscript · call · arrow", "左操作数必须绑定 this"],
  ["Symmetric", "arithmetic · relation", "非成员允许两侧参与转换"],
  ["Mutation", "compound assign · prefix", "修改自身时常返回自身引用"],
  ["Callable", "function · pointer · functor · lambda", "模板或 function 统一调用接口"],
  ["Conversion", "ctor ↔ conversion operator", "控制 explicit 并消除二义路径"],
] as const;

export function CppOperatorAndConversionContractDiagram() {
  return <Frame caption="Chapter 14 从固定语法出发，分别设计成员/非成员运算符、可调用对象和双向类类型转换，最后检查二义性。"><div role="img" aria-label="C++ Primer第十四章运算符语法成员选择返回语义可调用对象和类型转换二义性契约" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{contracts.map(([title,code,meaning],index)=><section key={title} className="min-h-32 border border-border bg-bg/40 p-4"><div className="flex items-center justify-between gap-3"><strong className="text-sm text-primary">{title}</strong><span className="text-xs tabular-nums text-secondary">0{index + 1}</span></div><code className="mt-3 block text-xs text-accent">{code}</code><p className="mb-0 mt-3 text-xs leading-5 text-secondary">{meaning}</p></section>)}</div></Frame>;
}
