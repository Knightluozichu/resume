const executionPaths = [
  {
    input: "constant arguments",
    context: "array/static_assert",
    execution: "required constant evaluation",
    tone: "border-emerald-500/35 bg-emerald-500/10",
  },
  {
    input: "constant arguments",
    context: "ordinary expression",
    execution: "compile-time fold optional",
    tone: "border-sky-500/35 bg-sky-500/10",
  },
  {
    input: "runtime arguments",
    context: "ordinary expression",
    execution: "runtime execution",
    tone: "border-amber-500/35 bg-amber-500/10",
  },
] as const;

export function EmcppConstexprDualExecutionMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="constexpr function 在强制常量语境普通常量调用和运行期参数下的三条执行路径图"
          className="grid gap-3 lg:grid-cols-3"
        >
          {executionPaths.map((item, index) => (
            <section
              key={`${item.input}-${item.context}`}
              className={`min-h-52 border p-4 ${item.tone}`}
            >
              <span className="text-xs text-secondary">0{index + 1}</span>
              <strong className="mt-3 block text-sm text-primary">
                {item.input}
              </strong>
              <code className="mt-3 block text-xs text-accent">
                {item.context}
              </code>
              <p className="mb-0 mt-4 text-xs leading-5 text-secondary">
                {item.execution}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        constexpr
        是双用途接口：强制语境要求编译期成功，普通语境仍允许运行期执行。
      </figcaption>
    </figure>
  );
}

const contexts = [
  ["Array extent", "std::array<T, power(3,5)>", "must be constant"],
  ["Template argument", "Buffer<power(2,8)>", "type depends on value"],
  ["Enum value", "value = square(8)", "enumerator fixed at translation"],
  ["Alignment", "alignas(square(4))", "layout requires constant"],
] as const;

export function EmcppCompileTimeContextMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="array 大小模板参数枚举值和对齐四种强制编译期上下文图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {contexts.map(([label, code, detail], index) => (
            <section
              key={label}
              className="min-h-44 border border-violet-500/30 bg-violet-500/10 p-4"
            >
              <span className="text-xs text-secondary">0{index + 1}</span>
              <strong className="mt-3 block text-sm text-primary">
                {label}
              </strong>
              <code className="mt-3 block text-xs leading-5 text-accent">
                {code}
              </code>
              <p className="mb-0 mt-3 text-xs text-secondary">{detail}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        这些位置不是优化建议：constant evaluation 失败会使 program ill-formed。
      </figcaption>
    </figure>
  );
}

const pointStages = [
  ["Literal storage", "double x, y", "representable in constant evaluation"],
  ["Construction", "constexpr Point(...) ", "initialize every member"],
  ["Observation", "constexpr x()/y()", "keep reads compile-time capable"],
  ["Composition", "constexpr midpoint", "return a new constant Point"],
] as const;

export function EmcppLiteralPointPipelineMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="Point 从 literal storage 经 constexpr 构造访问器到 midpoint 组合的常量对象流水线图"
          className="space-y-3"
        >
          {pointStages.map(([label, code, detail], index) => (
            <section
              key={label}
              className="grid gap-3 border border-emerald-500/30 bg-emerald-500/10 p-4 md:grid-cols-[0.8fr_1fr_1.2fr] md:items-center"
            >
              <strong className="text-sm text-primary">
                <span className="mr-2 text-xs text-secondary">
                  0{index + 1}
                </span>
                {label}
              </strong>
              <code className="text-xs text-accent">{code}</code>
              <span className="text-xs text-secondary">{detail}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        constexpr object pipeline
        要求每一环都保留常量求值资格；缺一处说明符就会在强制语境断链。
      </figcaption>
    </figure>
  );
}
