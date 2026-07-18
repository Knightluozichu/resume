const readabilityRows = [
  {
    concern: "Callable",
    lambda: "setAlarm(...) appears in the body",
    bind: "first positional argument",
  },
  {
    concern: "Arguments",
    lambda: "named parameters and expressions",
    bind: "_1, _2 plus stored values",
  },
  {
    concern: "Evaluation",
    lambda: "body expressions run on invocation",
    bind: "bound expressions run at construction",
  },
  {
    concern: "Types",
    lambda: "normal overload resolution",
    bind: "casts may select a function pointer",
  },
] as const;

export function EmcppLambdaBindReadabilityMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="lambda 与 std bind 在被调函数参数求值时机和类型解析上的可读性对照图"
          className="space-y-3"
        >
          {readabilityRows.map((item, index) => (
            <section
              key={item.concern}
              className="grid gap-3 border border-cyan-500/30 bg-cyan-500/10 p-4 md:grid-cols-[0.7fr_1.2fr_1.2fr] md:items-center"
            >
              <strong className="text-sm text-primary">
                <span className="mr-2 text-xs text-secondary">
                  0{index + 1}
                </span>
                {item.concern}
              </strong>
              <span className="text-xs text-secondary">
                lambda: {item.lambda}
              </span>
              <code className="text-xs text-accent">bind: {item.bind}</code>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        lambda body 保留普通函数调用的语法和执行顺序；bind expression
        把同样语义编码成位置协议。
      </figcaption>
    </figure>
  );
}

const timingEvents = [
  {
    phase: "Create adaptor",
    lambda: "capture policy only",
    bind: "evaluate now() + 1h immediately",
  },
  {
    phase: "Wait 10 min",
    lambda: "no alarm time yet",
    bind: "stored time is already aging",
  },
  {
    phase: "Invoke",
    lambda: "compute invocation time + 1h",
    bind: "reuse construction time + 1h",
  },
  {
    phase: "Observed alarm",
    lambda: "one hour after invocation",
    bind: "only fifty minutes after invocation",
  },
] as const;

export function EmcppBindEvaluationTimingFlowMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="lambda 在调用时计算闹钟时间而 std bind 在适配器创建时求值导致延迟十分钟后语义偏移的时间线"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {timingEvents.map((item, index) => (
            <section
              key={item.phase}
              className={`min-h-52 border p-4 ${
                index >= 2
                  ? "border-rose-500/35 bg-rose-500/10"
                  : "border-amber-500/35 bg-amber-500/10"
              }`}
            >
              <span className="text-xs text-secondary">0{index + 1}</span>
              <strong className="mt-3 block text-sm text-primary">
                {item.phase}
              </strong>
              <p className="mb-0 mt-3 text-xs text-secondary">
                lambda: {item.lambda}
              </p>
              <code className="mt-3 block text-xs text-accent">
                bind: {item.bind}
              </code>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        bound arguments are evaluated when std::bind is called; lambda body
        expressions run when the closure is invoked.
      </figcaption>
    </figure>
  );
}

const typePaths = [
  {
    input: "overloaded setAlarm",
    lambda: "call syntax supplies argument types",
    bind: "requires exact function-pointer cast",
    result: "lambda keeps overload resolution local",
  },
  {
    input: "lvalue payload",
    lambda: "forward<decltype(x)>(x)",
    bind: "placeholder protocol forwards opaquely",
    result: "lambda states category policy",
  },
  {
    input: "stored bound value",
    lambda: "capture spelling shows value/ref",
    bind: "decay-stored then passed as lvalue-like",
    result: "lambda exposes ownership",
  },
] as const;

export function EmcppLambdaBindTypeSemanticsMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="lambda 与 std bind 对重载函数转发参数及存储参数的类型和所有权语义对照图"
          className="space-y-3"
        >
          {typePaths.map((item, index) => (
            <section
              key={item.input}
              className="grid gap-3 border border-violet-500/30 bg-violet-500/10 p-4 md:grid-cols-[0.8fr_1.1fr_1.1fr_1.1fr] md:items-center"
            >
              <strong className="text-sm text-primary">
                <span className="mr-2 text-xs text-secondary">
                  0{index + 1}
                </span>
                {item.input}
              </strong>
              <span className="text-xs text-secondary">{item.lambda}</span>
              <code className="text-xs text-accent">{item.bind}</code>
              <strong className="text-xs text-primary">{item.result}</strong>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        lambda 并非自动正确，但其 capture、call 与 forward 都在源码表面；bind 的
        generated call protocol 更难逐项审查。
      </figcaption>
    </figure>
  );
}
