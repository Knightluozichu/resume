const dispatchRows = [
  { call: "operation(element)", dynamic: "operation object only", missing: "element overload chosen statically" },
  { call: "element.accept(visitor)", dynamic: "element virtual dispatch", missing: "enters ConcreteElement" },
  { call: "visitor.visit(*this)", dynamic: "visitor virtual overload", missing: "selects operation for concrete element" },
] as const;

export function McdVisitorDispatchMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="普通调用和 Visitor accept visit 两步动态分派如何选择具体元素操作" className="grid gap-3 lg:grid-cols-3">
          {dispatchRows.map((row, index) => (
            <section key={row.call} className="min-h-60 border border-cyan-500/35 bg-cyan-500/10 p-4">
              <span className="text-xs text-secondary">dispatch 0{index + 1}</span>
              <code className="mt-2 block break-words text-xs text-accent">{row.call}</code>
              <strong className="mt-4 block text-xs text-primary">dynamic · {row.dynamic}</strong>
              <p className="mb-0 mt-4 text-xs text-secondary">{row.missing}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Double dispatch 不是语言一次完成，而是 Element virtual accept 后再调用 Visitor virtual visit overload。
      </figcaption>
    </figure>
  );
}

const acyclicRows = [
  { actor: "BaseVisitor", knows: "no concrete elements", changes: "stable root" },
  { actor: "Visitor<T>", knows: "one Visit(T&)", changes: "added per supported type" },
  { actor: "ConcreteOperation", knows: "selected Visitor<T> bases", changes: "need not support every element" },
  { actor: "Element<T>::accept", knows: "dynamic_cast Visitor<T>*", changes: "fallback when unsupported" },
] as const;

export function McdAcyclicVisitorMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="Acyclic Visitor 的 BaseVisitor Visitor T 操作与元素 accept 关系" className="grid gap-3 sm:grid-cols-2">
          {acyclicRows.map((row, index) => (
            <section key={row.actor} className="min-h-52 border border-violet-500/35 bg-violet-500/10 p-4">
              <span className="text-xs text-secondary">role 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">{row.actor}</strong>
              <code className="mt-4 block break-words text-xs text-accent">{row.knows}</code>
              <p className="mb-0 mt-3 text-xs text-secondary">{row.changes}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Acyclic Visitor 拆开对 concrete element 集合的全量依赖，代价是 RTTI cast 和“未支持类型”的运行时路径。
      </figcaption>
    </figure>
  );
}

const variationRows = [
  { variant: "Cyclic", addOperation: "cheap", addElement: "update Visitor interface + all visitors", cost: "direct virtual overload" },
  { variant: "Acyclic", addOperation: "implement selected Visitor<T>", addElement: "new Visitor<T> interface only", cost: "dynamic_cast per visit" },
  { variant: "Generic generated", addOperation: "derive generated visitor", addElement: "change typelist + regenerate", cost: "compile-time coupling/diagnostics" },
] as const;

export function McdVisitorVariationMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="Cyclic Acyclic 和 Typelist 生成 Visitor 在新增操作元素与成本方面比较" className="grid gap-3 lg:grid-cols-3">
          {variationRows.map((row, index) => (
            <section key={row.variant} className="min-h-64 border border-emerald-500/35 bg-emerald-500/10 p-4">
              <span className="text-xs text-secondary">variant 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">{row.variant}</strong>
              <span className="mt-4 block text-xs text-primary">new operation · {row.addOperation}</span>
              <span className="mt-3 block text-xs text-primary">new element · {row.addElement}</span>
              <code className="mt-4 block break-words text-xs text-accent">{row.cost}</code>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Visitor 的选择取决于哪一维更稳定：element set、operation set，以及是否接受 RTTI 或 compile-time coupling。
      </figcaption>
    </figure>
  );
}
