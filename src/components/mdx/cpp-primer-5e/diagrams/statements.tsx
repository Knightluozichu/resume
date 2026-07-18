import type { ReactNode } from "react";

function Frame({ caption, children }: { caption: string; children: ReactNode }) {
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">{children}</div><figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption></figure>;
}

const transfers = [
  ["Expression / null", "expr; / ;", "完成一个动作或明确什么也不做"],
  ["Compound block", "{ declarations; statements; }", "形成单条语句和局部作用域"],
  ["Selection", "if / switch", "只进入选定分支；注意 dangling else/case"],
  ["Iteration", "while / for / do", "建立重复区与循环局部对象"],
  ["Jump", "break / continue / goto", "转移控制但不得绕过对象初始化"],
  ["Exception", "throw → matching catch", "沿调用栈退出作用域并销毁对象"],
] as const;

export function CppStatementScopeDiagram() {
  return <Frame caption="Statement 不只决定下一条指令，也决定名字可见范围、对象生命周期和控制转移是否合法。"><div role="img" aria-label="C++ Primer第五章简单复合条件循环跳转和异常语句及作用域表" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{transfers.map(([title,syntax,effect])=><section key={title} className="min-h-32 border border-border bg-bg/40 p-4"><strong className="text-sm text-primary">{title}</strong><code className="mt-3 block text-xs text-accent">{syntax}</code><p className="mb-0 mt-3 text-xs leading-5 text-secondary">{effect}</p></section>)}</div></Frame>;
}
