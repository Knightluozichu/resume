const deductionCases = [
  {
    declaration: "auto value = expr",
    rule: "template-by-value style",
    result: "drop top-level cv/ref",
    use: "independent value",
  },
  {
    declaration: "const auto& view = expr",
    rule: "reference binding",
    result: "preserve referred type, add const view",
    use: "read-only borrow",
  },
  {
    declaration: "auto& view = expr",
    rule: "lvalue reference deduction",
    result: "preserve cv and identity",
    use: "mutable or const borrow",
  },
  {
    declaration: "auto&& forward = expr",
    rule: "forwarding-reference deduction",
    result: "collapse by value category",
    use: "perfect forwarding context",
  },
] as const;

export function ChpAutoReferenceDeductionMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="auto按值const引用可变引用和转发引用从声明形式到推导结果与所有权意图的比较图"
          className="space-y-3"
        >
          {deductionCases.map((item, index) => (
            <section
              key={item.declaration}
              className="grid min-h-36 gap-3 border border-cyan-500/30 bg-cyan-500/10 p-4 md:grid-cols-[1fr_1fr_1.2fr_0.9fr] md:items-center"
            >
              <code className="break-words text-xs text-accent">
                <span className="mr-2 text-secondary">0{index + 1}</span>
                {item.declaration}
              </code>
              <strong className="text-xs text-primary">{item.rule}</strong>
              <span className="text-xs text-secondary">{item.result}</span>
              <span className="text-xs text-primary">{item.use}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        `auto` 不是一个统一的“省略类型”动作；声明中的 `&amp;`、`const` 与
        `&amp;&amp;` 决定 identity、cv 与 value category 如何保留。
      </figcaption>
    </figure>
  );
}

const callablePaths = [
  {
    form: "Concrete lambda",
    storage: "closure object stores captures",
    call: "known operator() target",
    optimization: "direct inline is often available",
  },
  {
    form: "Captureless function pointer",
    storage: "plain function address",
    call: "indirect call through pointer",
    optimization: "target may propagate if constant",
  },
  {
    form: "std::function",
    storage: "type-erased manager + callable",
    call: "erased invocation path",
    optimization: "SBO or allocation is implementation-dependent",
  },
] as const;

export function ChpLambdaCallableCostMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="具体lambda无捕获函数指针和std function在捕获存储调用路径与优化机会上的成本比较图"
          className="grid gap-4 lg:grid-cols-3"
        >
          {callablePaths.map((item, index) => (
            <section
              key={item.form}
              className="min-h-60 border border-violet-500/30 bg-violet-500/10 p-4"
            >
              <span className="text-xs text-secondary">path 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">
                {item.form}
              </strong>
              <code className="mt-4 block break-words text-xs text-accent">
                {item.storage}
              </code>
              <p className="mb-0 mt-4 text-xs text-primary">{item.call}</p>
              <p className="mb-0 mt-3 text-xs text-secondary">
                {item.optimization}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        先决定是否需要运行时替换 callable，再选择 concrete
        lambda、函数指针或类型擦除；捕获方式同时决定 closure lifetime。
      </figcaption>
    </figure>
  );
}

const valueTransitions = [
  {
    topic: "Move resource owner",
    before: "source owns handle",
    operation: "transfer handle + reset source",
    after: "destination owns; source valid but unspecified",
  },
  {
    topic: "std::optional<T>",
    before: "disengaged or inline T storage",
    operation: "construct/destroy contained T",
    after: "absence is explicit in the type",
  },
  {
    topic: "std::any",
    before: "empty or erased concrete value",
    operation: "copy/move through manager operations",
    after: "type checked at any_cast boundary",
  },
] as const;

export function ChpMoveOptionalAnyMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="资源所有者移动optional内联可选值和any类型擦除值从操作前到操作后的状态转换图"
          className="space-y-3"
        >
          {valueTransitions.map((item, index) => (
            <section
              key={item.topic}
              className="grid min-h-40 gap-3 border border-amber-500/35 bg-amber-500/10 p-4 md:grid-cols-[0.8fr_1fr_1.2fr_1.3fr] md:items-center"
            >
              <strong className="text-sm text-primary">
                <span className="mr-2 text-xs text-secondary">
                  0{index + 1}
                </span>
                {item.topic}
              </strong>
              <span className="text-xs text-secondary">{item.before}</span>
              <code className="break-words text-xs text-accent">
                {item.operation}
              </code>
              <span className="text-xs text-primary">{item.after}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        move、optional 与 any
        都改变值的表示契约：分别显式转移资源、表达缺失、或推迟具体类型检查，成本来自所选语义。
      </figcaption>
    </figure>
  );
}
