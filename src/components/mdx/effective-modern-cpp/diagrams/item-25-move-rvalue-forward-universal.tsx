const rules = [
  {
    parameter: "Widget&&",
    entry: "rvalue only",
    restore: "std::move(param)",
    meaning: "unconditional consume permission",
  },
  {
    parameter: "T&& deduced",
    entry: "lvalue or rvalue",
    restore: "std::forward<T>(param)",
    meaning: "preserve caller category",
  },
  {
    parameter: "const Widget&",
    entry: "read-only values",
    restore: "no move/forward",
    meaning: "observe or copy",
  },
] as const;

export function EmcppReferenceConsumptionRuleMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="普通右值引用 forwarding reference 和 const reference 参数对应 move forward 或观察规则图"
          className="grid gap-3 lg:grid-cols-3"
        >
          {rules.map((item, index) => (
            <section
              key={item.parameter}
              className="min-h-52 border border-sky-500/30 bg-sky-500/10 p-4"
            >
              <span className="text-xs text-secondary">0{index + 1}</span>
              <strong className="mt-3 block text-sm text-primary">
                {item.parameter}
              </strong>
              <code className="mt-3 block text-xs text-accent">
                {item.restore}
              </code>
              <p className="mt-3 text-xs text-secondary">entry: {item.entry}</p>
              <p className="mb-0 text-xs text-secondary">{item.meaning}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        move/forward 选择来自入口能绑定哪些 callers；两者都应放在当前 value
        的最终消费点。
      </figcaption>
    </figure>
  );
}

const timeline = [
  ["Receive", "parameter has full value", "named expression is lvalue"],
  ["Validate", "read invariants", "must not consume"],
  ["Audit", "record metadata", "still needs full value"],
  ["Sink", "move/forward into storage", "last use: consumption allowed"],
  ["After", "source valid but unspecified", "destroy or assign only"],
] as const;

export function EmcppLastUseTimelineMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="参数从接收验证审计最终 sink 到 moved-from 状态的最后一次使用时间线图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5"
        >
          {timeline.map(([label, state, rule], index) => (
            <section
              key={label}
              className={`min-h-48 border p-4 ${index === 3 ? "border-emerald-500/35 bg-emerald-500/10" : index === 4 ? "border-amber-500/35 bg-amber-500/10" : "border-violet-500/30 bg-violet-500/10"}`}
            >
              <span className="text-xs text-secondary">0{index + 1}</span>
              <strong className="mt-3 block text-sm text-primary">
                {label}
              </strong>
              <code className="mt-3 block text-xs text-accent">{state}</code>
              <p className="mb-0 mt-3 text-xs text-secondary">{rule}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        value-category cast
        是时间敏感操作：提前一格会破坏后续读取，晚一格则失去资源转移。
      </figcaption>
    </figure>
  );
}

const returns = [
  {
    source: "named local T result",
    expression: "return result",
    optimization: "NRVO, else implicit move",
  },
  {
    source: "rvalue-reference param",
    expression: "return std::move(param)",
    optimization: "no NRVO; explicit transfer",
  },
  {
    source: "forwarding param",
    expression: "return std::forward<T>(param)",
    optimization: "copy lvalue / move rvalue",
  },
  {
    source: "by-value param",
    expression: "return param",
    optimization: "implicit move eligible",
  },
] as const;

export function EmcppReturnRvoDecisionMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="命名 local 右值引用参数 forwarding 参数和按值参数的 return RVO move forward 决策图"
          className="space-y-3"
        >
          {returns.map((item, index) => (
            <section
              key={item.source}
              className="grid gap-3 border border-emerald-500/30 bg-emerald-500/10 p-4 md:grid-cols-[1fr_1fr_1.2fr] md:items-center"
            >
              <strong className="text-sm text-primary">
                <span className="mr-2 text-xs text-secondary">
                  0{index + 1}
                </span>
                {item.source}
              </strong>
              <code className="text-xs text-accent">{item.expression}</code>
              <span className="text-xs text-secondary">
                {item.optimization}
              </span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        return 决策先区分“own local”与“reference parameter”：local 要保护
        RVO，reference 要显式恢复正确 category。
      </figcaption>
    </figure>
  );
}
