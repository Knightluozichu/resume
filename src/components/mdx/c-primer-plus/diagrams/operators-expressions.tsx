const layers = [
  ["Parse", "precedence + associativity", "决定表达式如何分组，不决定操作数先算谁"],
  ["Sequence", "sequenced / unsequenced", "同一标量对象的副作用必须满足排序规则"],
  ["Convert", "promotions + usual conversions", "按类型等级和可表示范围选择共同类型"],
  ["Commit", "assignment + side effect", "检查窄化、溢出和循环状态推进"],
] as const;

export function CPrimerExpressionSemanticsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="C Primer Plus第五章表达式语法分组求值排序类型转换和副作用" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {layers.map(([title, code, meaning], index) => (
            <section key={title} className="min-h-36 border border-border bg-bg/40 p-4">
              <span className="text-xs tabular-nums text-secondary">0{index + 1}</span>
              <strong className="mt-3 block text-sm text-primary">{title}</strong>
              <code className="mt-3 block text-xs text-accent">{code}</code>
              <p className="mb-0 mt-3 text-xs leading-5 text-secondary">{meaning}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Chapter 5 的表达式检查顺序：先看语法分组，再看副作用排序，最后核对共同类型与结果范围。
      </figcaption>
    </figure>
  );
}
