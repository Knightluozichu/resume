import type { ReactNode } from "react";

function Frame({ caption, children }: { caption: string; children: ReactNode }) {
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">{children}</div><figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption></figure>;
}

const contracts = [
  ["Range", "[first, last)", "算法接收位置，不拥有容器"],
  ["Capability", "input → forward → bidi → random", "算法声明最低迭代器能力"],
  ["Operation", "predicate · lambda · bind", "调用者注入比较或变换规则"],
  ["Destination", "out · back/front/inserter", "目标必须有效或能创建元素"],
  ["View", "stream · reverse iterator", "把设备或反向遍历适配为范围"],
  ["Container member", "list sort · merge · splice", "节点结构需要专用算法"],
] as const;

export function CppGenericAlgorithmContractDiagram() {
  return <Frame caption="Chapter 10 的泛型契约由范围、迭代器能力、定制操作、输出位置、迭代器适配和容器专用成员共同组成。"><div role="img" aria-label="C++ Primer第十章泛型算法范围迭代器类别定制操作输出适配和链表成员算法契约" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{contracts.map(([title,code,meaning],index)=><section key={title} className="min-h-32 border border-border bg-bg/40 p-4"><div className="flex items-center justify-between gap-3"><strong className="text-sm text-primary">{title}</strong><span className="text-xs tabular-nums text-secondary">0{index + 1}</span></div><code className="mt-3 block text-xs text-accent">{code}</code><p className="mb-0 mt-3 text-xs leading-5 text-secondary">{meaning}</p></section>)}</div></Frame>;
}
