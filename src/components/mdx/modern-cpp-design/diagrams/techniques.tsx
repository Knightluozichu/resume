const specializationRows = [
  { input: "Traits<T>", match: "primary template", role: "默认规则", example: "unknown type" },
  { input: "Traits<T*>", match: "partial specialization", role: "形状规则", example: "any pointer" },
  { input: "Traits<int>", match: "full specialization", role: "精确规则", example: "exact int" },
] as const;

export function McdSpecializationSelectionMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="主模板、偏特化和全特化按类型形状匹配的选择图" className="grid gap-3 lg:grid-cols-3">
          {specializationRows.map((row, index) => (
            <section key={row.input} className="min-h-56 border border-violet-500/35 bg-violet-500/10 p-4">
              <span className="text-xs text-secondary">candidate 0{index + 1}</span>
              <code className="mt-2 block text-sm text-accent">{row.input}</code>
              <strong className="mt-4 block text-sm text-primary">{row.match}</strong>
              <p className="mb-0 mt-3 text-xs text-secondary">{row.role}</p>
              <span className="mt-4 block border-t border-border pt-3 text-xs text-primary">{row.example}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        编译器选择最特化且可匹配的规则；偏特化是对“类型形状”编程，不是运行时 if。
      </figcaption>
    </figure>
  );
}

const mappingRows = [
  { source: "int value", bridge: "Int2Type<value>", target: "overload set", use: "同一类型的不同常量走不同实现" },
  { source: "class T", bridge: "Type2Type<T>", target: "overload set", use: "把目标类型作为普通函数参数传递" },
  { source: "bool cond", bridge: "Select<cond,A,B>", target: "Result type", use: "编译期二选一形成结构" },
] as const;

export function McdTypeMappingMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="Int2Type、Type2Type 与 Select 把值或类型转换为编译期分派信号的映射图" className="space-y-3">
          {mappingRows.map((row, index) => (
            <section key={row.bridge} className="grid min-h-36 gap-3 border border-cyan-500/35 bg-cyan-500/10 p-4 sm:grid-cols-[0.8fr_1fr_0.9fr_1.5fr] sm:items-center">
              <span className="text-xs text-secondary">0{index + 1} · {row.source}</span>
              <code className="text-xs text-accent">{row.bridge}</code>
              <strong className="text-xs text-primary">{row.target}</strong>
              <span className="text-xs text-secondary">{row.use}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        空标签对象不承载业务数据，它们只把 compile-time information 搬进 overload resolution 与类型构造。
      </figcaption>
    </figure>
  );
}

const traitPipeline = [
  { stage: "Normalize", artifact: "remove const / reference", failure: "同一底层类型被误分成多类" },
  { stage: "Classify", artifact: "pointer / arithmetic / user type", failure: "默认规则覆盖特殊表示" },
  { stage: "Relate", artifact: "convertible / base-of", failure: "只看名称，不验证表达式" },
  { stage: "Select", artifact: "parameter type / operation / storage", failure: "trait 结果未改变真实设计" },
] as const;

export function McdTraitDecisionPipelineMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="类型归一化、分类、关系检测和实现选择组成的 traits 决策流水线" className="grid gap-3 lg:grid-cols-4">
          {traitPipeline.map((row, index) => (
            <section key={row.stage} className="relative min-h-64 border border-emerald-500/35 bg-emerald-500/10 p-4">
              <span className="text-xs text-secondary">stage 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">{row.stage}</strong>
              <code className="mt-4 block break-words text-xs text-accent">{row.artifact}</code>
              <p className="mb-0 mt-4 text-xs text-secondary">{row.failure}</p>
              {index < traitPipeline.length - 1 ? <span aria-hidden="true" className="absolute -right-3 top-1/2 z-10 hidden text-accent lg:block">→</span> : null}
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Trait 不是标签仓库；它把可证明的类型事实送入参数传递、存储或算法选择，并让错误路径不参与实例化。
      </figcaption>
    </figure>
  );
}
