const lazyChoices = [
  {
    model: "Eager value",
    stores: "materialized result",
    evaluates: "at expression site",
    bestWhen: "result is cheap and certainly consumed",
  },
  {
    model: "Lazy proxy",
    stores: "operation + operands",
    evaluates: "at conversion / dereference",
    bestWhen: "work can be skipped or fused",
  },
  {
    model: "Memoized proxy",
    stores: "expression + optional cache",
    evaluates: "once, then reuse",
    bestWhen: "repeated expensive observation",
  },
] as const;

export function ChpLazyMaterializationDecisionMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="立即值惰性代理和缓存代理按保存内容求值时机与适用场景的决策图"
          className="grid gap-4 lg:grid-cols-3"
        >
          {lazyChoices.map((item, index) => (
            <section
              key={item.model}
              className="min-h-64 border border-cyan-500/30 bg-cyan-500/10 p-4"
            >
              <span className="text-xs text-secondary">model 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">
                {item.model}
              </strong>
              <code className="mt-4 block break-words text-xs text-accent">
                {item.stores}
              </code>
              <p className="mb-0 mt-4 text-xs text-primary">{item.evaluates}</p>
              <p className="mb-0 mt-3 text-xs text-secondary">
                use: {item.bestWhen}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        lazy只移动求值边界，memoization才改变重复求值；两者都要支付state、lifetime与debug成本。
      </figcaption>
    </figure>
  );
}

const operandPolicies = [
  {
    operand: "Lvalue string",
    capture: "borrow by view/reference",
    lifetime: "owner outlives expression",
  },
  {
    operand: "Rvalue string",
    capture: "move value into expression node",
    lifetime: "node owns characters",
  },
  {
    operand: "Literal",
    capture: "static view",
    lifetime: "program lifetime",
  },
  {
    operand: "Materialized result",
    capture: "one allocation after total size",
    lifetime: "independent std::string value",
  },
] as const;

export function ChpStringProxyLifetimeMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="字符串代理针对左值右值字面量和最终结果的捕获及生命周期图"
          className="space-y-3"
        >
          {operandPolicies.map((item, index) => (
            <section
              key={item.operand}
              className="grid min-h-36 gap-3 border border-violet-500/30 bg-violet-500/10 p-4 md:grid-cols-[0.8fr_1.3fr_1.5fr] md:items-center"
            >
              <strong className="text-sm text-primary">
                <span className="mr-2 text-xs text-secondary">
                  0{index + 1}
                </span>
                {item.operand}
              </strong>
              <code className="break-words text-xs text-accent">
                {item.capture}
              </code>
              <span className="text-xs text-secondary">{item.lifetime}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        零拷贝borrow只适合稳定lvalue；rvalue必须进入expression
        ownership，最终物化才产生独立连续字符串。
      </figcaption>
    </figure>
  );
}

const operatorPaths = [
  {
    path: "DistProxy compare",
    expression: "squared_a < squared_b",
    deferred: "sqrt until value()",
    risk: "overflow / NaN / repeated conversion",
  },
  {
    path: "Pipe operator",
    expression: "value | adaptor | sink",
    deferred: "each adaptor chooses value or proxy",
    risk: "borrowed state and hidden materialization",
  },
  {
    path: "Infix proxy",
    expression: "lhs <op> rhs",
    deferred: "middle temporary stores lhs + operation",
    risk: "original operator precedence still applies",
  },
] as const;

export function ChpDistanceOperatorPipelineMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="距离代理管道运算符和中缀代理从表达式到推迟工作与风险的操作图"
          className="grid gap-4 lg:grid-cols-3"
        >
          {operatorPaths.map((item, index) => (
            <section
              key={item.path}
              className="min-h-64 border border-amber-500/35 bg-amber-500/10 p-4"
            >
              <span className="text-xs text-secondary">path 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">
                {item.path}
              </strong>
              <code className="mt-4 block break-words text-xs text-accent">
                {item.expression}
              </code>
              <p className="mb-0 mt-4 text-xs text-primary">{item.deferred}</p>
              <p className="mb-0 mt-3 text-xs text-secondary">
                risk: {item.risk}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        operator
        syntax只承载expression；真正收益来自跳过或融合工作，真正风险来自隐藏的conversion、precedence与lifetime。
      </figcaption>
    </figure>
  );
}
