import type { ReactNode } from "react";

function Frame({ caption, children }: { caption: string; children: ReactNode }) {
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">{children}</div><figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption></figure>;
}

const rules = [
  ["Grouping", "precedence + associativity", "决定 parse tree，不承诺操作数先后"],
  ["Value category", "lvalue / rvalue", "决定能否定位对象、绑定引用或移动"],
  ["Sequencing", "sequenced / unsequenced", "决定副作用与读取是否合法"],
  ["Conversion", "promotion / usual conversions", "先统一操作数类型再执行运算"],
] as const;

export function CppExpressionContractDiagram() {
  return <Frame caption="读表达式要分四层：先分组，再判断值类别与定序，最后追踪类型转换；只背优先级表不够。"><div role="img" aria-label="C++ Primer第四章表达式分组值类别求值定序和类型转换四层契约" className="grid gap-3 sm:grid-cols-2">{rules.map(([title,rule,result],i)=><section key={title} className="min-h-32 border border-border bg-bg/40 p-4"><span className="text-xs font-bold text-accent">RULE {i+1}</span><strong className="mt-2 block text-sm text-primary">{title}</strong><code className="mt-3 block text-xs text-success">{rule}</code><p className="mb-0 mt-3 text-xs text-secondary">{result}</p></section>)}</div></Frame>;
}
