import type { ReactNode } from "react";

function Frame({ caption, children }: { caption: string; children: ReactNode }) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">{children}</div>
      <figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption>
    </figure>
  );
}

const headers = [
  ["Containers", "vector map unordered_map", "sequence / ordered / hashed"],
  ["Algorithms", "algorithm numeric iterator", "transform / reduce / adapt"],
  ["Utilities", "memory tuple functional", "ownership / records / callables"],
  ["I/O + text", "iostream fstream regex", "streams / files / patterns"],
  ["Random", "random", "engine + distribution"],
] as const;

export function CppLibraryHeaderMapDiagram() {
  return (
    <Frame caption="Appendix A 的头文件地图：按设施家族查入口，再核对具体名字的声明位置。">
      <div role="img" aria-label="C++标准库容器算法工具输入输出文本和随机数头文件地图" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {headers.map(([title, names, use]) => (
          <section key={title} className="min-h-36 border border-border bg-bg/40 p-4">
            <strong className="text-sm text-primary">{title}</strong>
            <code className="mt-3 block text-xs text-accent">{names}</code>
            <p className="mb-0 mt-3 text-xs leading-5 text-secondary">{use}</p>
          </section>
        ))}
      </div>
    </Frame>
  );
}

const algorithmStages = [
  ["Range", "iterator category + [first,last)", "先确认算法可接受的迭代器能力"],
  ["Meaning", "find / sort / partition / copy", "按后置条件选算法，而不是按名字猜"],
  ["Result", "iterator / count / reordered range", "检查返回值和容器失效规则"],
] as const;

export function CppAlgorithmSelectionDiagram({ step = 1 }: { step?: 1 | 2 | 3 }) {
  return (
    <Frame caption="算法选择三步：确认区间能力、选择语义、解释返回值与后置条件。">
      <div role="img" aria-label="C++标准库算法按区间语义和结果选择的三步流程" className="grid gap-3 md:grid-cols-3">
        {algorithmStages.map(([title, code, meaning], index) => {
          const active = index + 1 === step;
          return (
            <section key={title} className={`min-h-36 border p-4 ${active ? "border-accent bg-accent/5" : "border-border bg-bg/40"}`}>
              <span className="text-xs tabular-nums text-secondary">0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">{title}</strong>
              <code className="mt-3 block text-xs text-accent">{code}</code>
              <p className="mb-0 mt-3 text-xs leading-5 text-secondary">{meaning}</p>
            </section>
          );
        })}
      </div>
    </Frame>
  );
}

const randomRows = [
  ["mt19937", "deterministic engine", "reproducible sequence from seed"],
  ["uniform_int_distribution", "closed integer range", "dice, indexes, bounded samples"],
  ["uniform_real_distribution", "real interval", "simulation parameters"],
  ["normal_distribution", "mean + deviation", "measurement-like samples"],
] as const;

export function CppRandomCatalogDiagram() {
  return (
    <Frame caption="随机设施目录：引擎决定可复现序列，分布把序列映射成目标统计形状。">
      <div role="img" aria-label="C++随机数引擎与均匀整数均匀实数正态分布目录" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {randomRows.map(([name, role, use]) => (
          <section key={name} className="min-h-32 border border-border bg-bg/40 p-4">
            <code className="text-xs text-accent">{name}</code>
            <strong className="mt-3 block text-sm text-primary">{role}</strong>
            <p className="mb-0 mt-3 text-xs leading-5 text-secondary">{use}</p>
          </section>
        ))}
      </div>
    </Frame>
  );
}
