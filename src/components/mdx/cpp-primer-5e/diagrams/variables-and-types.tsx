import type { ReactNode } from "react";

function Frame({ caption, children }: { caption: string; children: ReactNode }) {
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">{children}</div><figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption></figure>;
}

const contracts = [
  ["Object", "int value{42}", "有类型、存储期与值"],
  ["Reference", "int& ref = value", "已有对象的别名，不可改绑"],
  ["Pointer", "int* ptr = &value", "保存地址，可改指向或为空"],
  ["const", "const int limit{64}", "通过该名字不可修改对象"],
  ["Deduction", "auto / decltype", "从初始化式或表达式规则得到类型"],
  ["User type", "struct Sales_data", "把数据与领域含义组成新类型"],
] as const;

export function CppVariablesTypesContractDiagram() {
  return <Frame caption="Chapter 2 从内置对象扩展到别名、地址、const 契约、类型推断和用户自定义数据结构。"><div role="img" aria-label="C++ Primer第二章对象引用指针const类型推断和自定义类型契约图" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{contracts.map(([title,code,meaning])=><section key={title} className="min-h-28 border border-border bg-bg/40 p-3"><strong className="text-sm text-primary">{title}</strong><code className="mt-3 block text-xs text-accent">{code}</code><p className="mb-0 mt-3 text-xs text-secondary">{meaning}</p></section>)}</div></Frame>;
}
