import type { ReactNode } from "react";

function Frame({ caption, children }: { caption: string; children: ReactNode }) {
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">{children}</div><figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption></figure>;
}

const layers = [
  ["Public interface", "construct · query · mutate", "调用者只依赖稳定操作"],
  ["Private state", "invariant + representation", "成员函数与友元维护约束"],
  ["Class scope", "names · types · nested declarations", "限定名把类外定义接回作用域"],
  ["Construction", "in-class init → delegation → body", "按声明顺序建立合法对象"],
  ["Conversion", "one-argument ctor + explicit", "控制隐式类类型转换"],
  ["Static member", "one value shared by all objects", "属于类型，不进入每个对象"],
] as const;

export function CppClassContractDiagram() {
  return <Frame caption="Chapter 7 把类视为一组相互约束的契约：接口隐藏表示，作用域解析名字，构造建立不变量，转换和静态成员控制类型级行为。"><div role="img" aria-label="C++ Primer第七章类的接口封装作用域构造转换和静态成员契约" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{layers.map(([title,code,meaning],index)=><section key={title} className="min-h-32 border border-border bg-bg/40 p-4"><div className="flex items-center justify-between gap-3"><strong className="text-sm text-primary">{title}</strong><span className="text-xs tabular-nums text-secondary">0{index + 1}</span></div><code className="mt-3 block text-xs text-accent">{code}</code><p className="mb-0 mt-3 text-xs leading-5 text-secondary">{meaning}</p></section>)}</div></Frame>;
}
