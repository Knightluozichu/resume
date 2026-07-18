const selectionStages = [
  {
    input: "Type / template value",
    mechanism: "instantiation",
    output: "specialized type or member",
  },
  {
    input: "Constant expression",
    mechanism: "constexpr evaluation",
    output: "compile-time value or runtime fallback",
  },
  {
    input: "Compile-time predicate",
    mechanism: "if constexpr",
    output: "one instantiated branch",
  },
  {
    input: "Required invariant",
    mechanism: "static_assert",
    output: "program or diagnostic",
  },
] as const;

export function ChpCompileTimeSelectionMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="类型模板值常量表达式和编译期断言从输入到选择机制与输出的求值图"
          className="grid gap-4 md:grid-cols-2"
        >
          {selectionStages.map((item, index) => (
            <section
              key={item.input}
              className="min-h-52 border border-cyan-500/30 bg-cyan-500/10 p-4"
            >
              <span className="text-xs text-secondary">case 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">
                {item.input}
              </strong>
              <code className="mt-4 block break-words text-xs text-accent">
                {item.mechanism}
              </code>
              <p className="mb-0 mt-5 text-xs text-primary">{item.output}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        编译期收益只来自编译期可知输入；constexpr提供能力，constant
        context和arguments才决定是否实际提前求值。
      </figcaption>
    </figure>
  );
}

const detectionStages = [
  {
    stage: "Form expression",
    operation: "decltype(declval<T&>().reserve(n))",
    proof: "syntax and overload are valid",
  },
  {
    stage: "Substitute",
    operation: "void_t<operation<T>>",
    proof: "failure removes specialization",
  },
  {
    stage: "Expose trait",
    operation: "is_detected<operation, T>",
    proof: "compile-time boolean/type",
  },
  {
    stage: "Constrain path",
    operation: "enable_if / if constexpr",
    proof: "selected implementation only",
  },
] as const;

export function ChpDetectionTraitsMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="从decltype形成表达式经void_t替换is_detected到约束实现的检测习惯用法图"
          className="space-y-3"
        >
          {detectionStages.map((item, index) => (
            <section
              key={item.stage}
              className="grid min-h-36 gap-3 border border-violet-500/30 bg-violet-500/10 p-4 md:grid-cols-[0.7fr_1.4fr_1.4fr] md:items-center"
            >
              <strong className="text-sm text-primary">
                <span className="mr-2 text-xs text-secondary">
                  0{index + 1}
                </span>
                {item.stage}
              </strong>
              <code className="break-words text-xs text-accent">
                {item.operation}
              </code>
              <span className="text-xs text-secondary">{item.proof}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        detection只证明表达式成立；semantic、complexity和lifetime仍需独立contract与tests。
      </figcaption>
    </figure>
  );
}

const heterogeneousModels = [
  {
    model: "tuple<Ts...>",
    typeSet: "fixed positions and types",
    access: "compile-time index / apply",
    risk: "index-only domain meaning",
  },
  {
    model: "variant<Ts...>",
    typeSet: "closed alternatives",
    access: "visit / get_if",
    risk: "visitor must cover alternatives",
  },
  {
    model: "any",
    typeSet: "open runtime type",
    access: "any_cast",
    risk: "runtime mismatch + allocation",
  },
  {
    model: "metadata + hash",
    typeSet: "explicit registered schema",
    access: "traits / generated dispatch",
    risk: "collision + schema version",
  },
] as const;

export function ChpHeterogeneousReflectionMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="tuple variant any和注册元数据按类型集合访问方式与失败边界的异构表示图"
          className="grid gap-4 lg:grid-cols-4"
        >
          {heterogeneousModels.map((item, index) => (
            <section
              key={item.model}
              className="min-h-64 border border-amber-500/35 bg-amber-500/10 p-4"
            >
              <span className="text-xs text-secondary">model 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">
                {item.model}
              </strong>
              <code className="mt-4 block break-words text-xs text-accent">
                {item.typeSet}
              </code>
              <p className="mb-0 mt-4 text-xs text-primary">{item.access}</p>
              <p className="mb-0 mt-3 text-xs text-secondary">
                risk: {item.risk}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        异构设计先决定type
        set是位置固定、封闭、开放还是显式注册，再选择compile-time与runtime检查边界。
      </figcaption>
    </figure>
  );
}
