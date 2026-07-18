import type { ReactNode } from "react";

function Frame({ caption, children }: { caption: string; children: ReactNode }) {
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">{children}</div><figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption></figure>;
}

const layers = [
  ["Name access", "using std::string", "只引入所需标准库名字"],
  ["Owning dynamic", "string / vector<T>", "管理长度、容量和资源"],
  ["Traversal", "iterator [begin,end)", "以尾后哨兵统一算法边界"],
  ["Fixed storage", "T[N]", "长度属于类型，可能退化为指针"],
  ["Nested fixed", "T[R][C]", "连续的数组之数组，逐层遍历"],
] as const;

export function CppSequenceAbstractionDiagram() {
  return <Frame caption="Chapter 3 从名字访问到动态容器、统一迭代边界，再落到固定与多维数组的类型/存储契约。"><div role="img" aria-label="C++ Primer第三章using声明string vector迭代器数组和多维数组层级图" className="grid gap-2">{layers.map(([title,code,meaning],i)=><div key={title} className="grid min-h-12 grid-cols-[2rem_1fr_1.2fr_1.6fr] items-center gap-3 border border-border bg-bg/40 px-3 py-2 text-xs"><span className="grid size-8 place-items-center rounded-full bg-accent/15 font-bold text-accent">{i+1}</span><strong className="text-primary">{title}</strong><code className="text-success">{code}</code><span className="text-secondary">{meaning}</span></div>)}</div></Frame>;
}
