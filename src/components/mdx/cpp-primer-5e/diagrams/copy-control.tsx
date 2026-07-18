import type { ReactNode } from "react";

function Frame({ caption, children }: { caption: string; children: ReactNode }) {
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">{children}</div><figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption></figure>;
}

const operations = [
  ["Copy construct", "new object ← const source", "建立独立值或共享语义"],
  ["Copy assign", "existing target ← source", "先取得新状态，再提交并自赋值安全"],
  ["Destroy", "release owned resource", "成员随后按逆序自动销毁"],
  ["Move construct", "new target ← xvalue", "按类型契约转移状态"],
  ["Move assign", "existing target ← xvalue", "释放旧状态并处理自移动"],
  ["Policy", "zero · copy · move · delete", "用 RAII 成员优先争取零法则"],
] as const;

export function CppCopyControlContractDiagram() {
  return <Frame caption="Chapter 13 的五个入口共同定义值语义；先选所有权政策，再决定默认、删除或自定义哪些特殊成员。"><div role="img" aria-label="C++ Primer第十三章拷贝构造拷贝赋值析构移动构造移动赋值与零法则契约" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{operations.map(([title,code,meaning],index)=><section key={title} className="min-h-32 border border-border bg-bg/40 p-4"><div className="flex items-center justify-between gap-3"><strong className="text-sm text-primary">{title}</strong><span className="text-xs tabular-nums text-secondary">0{index + 1}</span></div><code className="mt-3 block text-xs text-accent">{code}</code><p className="mb-0 mt-3 text-xs leading-5 text-secondary">{meaning}</p></section>)}</div></Frame>;
}
