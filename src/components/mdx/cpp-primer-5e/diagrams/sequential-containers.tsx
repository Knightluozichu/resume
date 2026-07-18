import type { ReactNode } from "react";

function Frame({ caption, children }: { caption: string; children: ReactNode }) {
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">{children}</div><figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption></figure>;
}

const decisions = [
  ["Contiguous", "vector · array · string", "随机访问与局部性优先"],
  ["Segmented", "deque", "两端增长并保留随机访问"],
  ["Linked", "list · forward_list", "已知位置的节点操作优先"],
  ["Mutation", "insert · erase · resize", "先判断移动范围与失效边界"],
  ["Growth", "size ≤ capacity", "reserve 控制重分配，不创建元素"],
  ["Restricted API", "stack · queue · priority_queue", "适配器用接口表达访问纪律"],
] as const;

export function CppSequentialContainerDecisionDiagram() {
  return <Frame caption="Chapter 9 的选型顺序：先看访问模式和变更位置，再核对迭代器失效、增长成本与是否需要受限接口。"><div role="img" aria-label="C++ Primer第九章顺序容器结构变更失效增长和适配器决策" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{decisions.map(([title,code,meaning],index)=><section key={title} className="min-h-32 border border-border bg-bg/40 p-4"><div className="flex items-center justify-between gap-3"><strong className="text-sm text-primary">{title}</strong><span className="text-xs tabular-nums text-secondary">0{index + 1}</span></div><code className="mt-3 block text-xs text-accent">{code}</code><p className="mb-0 mt-3 text-xs leading-5 text-secondary">{meaning}</p></section>)}</div></Frame>;
}
