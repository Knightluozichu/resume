import type { ReactNode } from "react";

function Frame({ caption, children }: { caption: string; children: ReactNode }) {
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">{children}</div><figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption></figure>;
}

const contracts = [
  ["Exclusive", "unique_ptr<T>", "单一所有者，可移动不可拷贝"],
  ["Shared", "shared_ptr + control block", "最后一个强引用触发删除器"],
  ["Observe", "weak_ptr.lock()", "不延长生命周期，先锁定再访问"],
  ["Raw allocation", "new/delete · new[]/delete[]", "分配形式与释放形式必须匹配"],
  ["Uninitialized storage", "allocator allocate → construct", "把原始存储与对象构造分离"],
  ["Shared result", "TextQuery ↔ QueryResult", "共享文本与行号，结果无需深拷贝"],
] as const;

export function CppDynamicMemoryOwnershipDiagram() {
  return <Frame caption="Chapter 12 从所有权选择走到原始存储，再用 TextQuery 展示共享数据如何跨对象结果安全存活。"><div role="img" aria-label="C++ Primer第十二章独占共享弱引用原始动态内存allocator和文本查询所有权契约" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{contracts.map(([title,code,meaning],index)=><section key={title} className="min-h-32 border border-border bg-bg/40 p-4"><div className="flex items-center justify-between gap-3"><strong className="text-sm text-primary">{title}</strong><span className="text-xs tabular-nums text-secondary">0{index + 1}</span></div><code className="mt-3 block text-xs text-accent">{code}</code><p className="mb-0 mt-3 text-xs leading-5 text-secondary">{meaning}</p></section>)}</div></Frame>;
}
