import type { ReactNode } from "react";

function Frame({ caption, children }: { caption: string; children: ReactNode }) {
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">{children}</div><figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption></figure>;
}

const contracts = [
  ["Shape", "map value · set key", "决定元素是键值对还是纯键"],
  ["Multiplicity", "unique · multi", "决定等价键能否重复"],
  ["Ordering", "Compare strict weak order", "支持有序遍历和范围查询"],
  ["Hashing", "Hash + KeyEqual", "等价键必须产生相同哈希值"],
  ["Mutation", "insert · find · erase · subscript", "区分只读查询与隐式插入"],
  ["Stability", "rehash invalidates iterators", "桶变化后重新取得位置"],
] as const;

export function CppAssociativeContainerContractDiagram() {
  return <Frame caption="Chapter 11 的选择不是只比较 O(1) 与 O(log n)：还要确定元素形态、键重复性、顺序语义、哈希等价契约和修改后的失效规则。"><div role="img" aria-label="C++ Primer第十一章关联容器元素形态重复键排序哈希操作和失效契约" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{contracts.map(([title,code,meaning],index)=><section key={title} className="min-h-32 border border-border bg-bg/40 p-4"><div className="flex items-center justify-between gap-3"><strong className="text-sm text-primary">{title}</strong><span className="text-xs tabular-nums text-secondary">0{index + 1}</span></div><code className="mt-3 block text-xs text-accent">{code}</code><p className="mb-0 mt-3 text-xs leading-5 text-secondary">{meaning}</p></section>)}</div></Frame>;
}
