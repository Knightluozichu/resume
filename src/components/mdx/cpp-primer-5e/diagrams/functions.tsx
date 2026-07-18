import type { ReactNode } from "react";

function Frame({ caption, children }: { caption: string; children: ReactNode }) {
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">{children}</div><figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption></figure>;
}

const contracts = [
  ["Declare", "header: return name(params);", "跨 translation unit 共享类型契约"],
  ["Call", "arguments → parameters", "值/引用/const、数组与可变形参"],
  ["Return", "value / ref / pointer / array pointer", "返回对象必须在调用后仍有效"],
  ["Resolve", "candidate → viable → best", "重载与隐式转换排序"],
  ["Specialize", "default / inline / constexpr / assert", "调用便利、ODR 与调试契约"],
  ["Indirect", "R (*pf)(Args...) = function", "把函数地址作为值传递与调用"],
] as const;

export function CppFunctionContractDiagram() {
  return <Frame caption="Chapter 6 的函数契约横跨声明、参数、返回、重载、专用设施和函数指针，不只是一张调用栈图。"><div role="img" aria-label="C++ Primer第六章函数声明调用返回重载专用设施和函数指针契约" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{contracts.map(([title,code,meaning])=><section key={title} className="min-h-32 border border-border bg-bg/40 p-4"><strong className="text-sm text-primary">{title}</strong><code className="mt-3 block text-xs text-accent">{code}</code><p className="mb-0 mt-3 text-xs leading-5 text-secondary">{meaning}</p></section>)}</div></Frame>;
}
