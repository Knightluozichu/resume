import type { ReactNode } from "react";

function Frame({ caption, children }: { caption: string; children: ReactNode }) {
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">{children}</div><figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption></figure>;
}

const stages = [
  ["Read", "std::cin >> item", "输入一条 Sales_item 交易"],
  ["Decide", "while / if", "EOF 结束；ISBN 决定合并或输出"],
  ["Delegate", "item.isbn()", "类接口隐藏数据表示"],
  ["Accumulate", "total += item", "同一 ISBN 的销量与收入聚合"],
  ["Report", "std::cout << total", "输出一组书店统计"],
] as const;

export function CppGettingStartedEvidenceDiagram() {
  return <Frame caption="Chapter 1 的书店程序把 IO、控制流和类接口接成一个可运行闭环，而不只是 Hello World。"><div role="img" aria-label="C++ Primer第一章书店程序从读取交易到控制判断类接口累计和输出的流程" className="grid gap-2">{stages.map(([title,code,meaning],index)=><div key={title} className="grid min-h-12 grid-cols-[2rem_1fr_1.2fr_1.6fr] items-center gap-3 border border-border bg-bg/40 px-3 py-2 text-xs"><span className="grid size-8 place-items-center rounded-full bg-accent/15 font-bold text-accent">{index+1}</span><strong className="text-primary">{title}</strong><code className="text-success">{code}</code><span className="text-secondary">{meaning}</span></div>)}</div></Frame>;
}
