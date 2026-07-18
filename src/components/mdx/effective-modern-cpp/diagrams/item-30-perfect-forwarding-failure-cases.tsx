const failureFamilies = [
  {
    family: "No deducible type",
    examples: "{1, 2, 3}, overloaded name, template name",
    failure: "T cannot be selected",
    repair: "materialize or disambiguate a type",
  },
  {
    family: "Wrong deduced type",
    examples: "0 / NULL used as null pointer",
    failure: "T becomes integral",
    repair: "use nullptr",
  },
  {
    family: "Reference needs storage",
    examples: "declaration-only static const member",
    failure: "ODR-use requires a definition",
    repair: "define it or pass a value copy",
  },
  {
    family: "Reference cannot bind",
    examples: "bitfield expression",
    failure: "no addressable object",
    repair: "copy into an ordinary variable",
  },
] as const;

export function EmcppForwardingFailureFamilyMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="完美转发因无法推导类型推导错误类型需要存储实体或引用无法绑定而失败的分类地图"
          className="space-y-3"
        >
          {failureFamilies.map((item, index) => (
            <section
              key={item.family}
              className="grid gap-3 border border-rose-500/35 bg-rose-500/10 p-4 md:grid-cols-[0.8fr_1.2fr_0.9fr_1fr] md:items-center"
            >
              <strong className="text-sm text-primary">
                <span className="mr-2 text-xs text-secondary">
                  0{index + 1}
                </span>
                {item.family}
              </strong>
              <code className="text-xs text-accent">{item.examples}</code>
              <span className="text-xs text-secondary">{item.failure}</span>
              <strong className="text-xs text-primary">→ {item.repair}</strong>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        perfect forwarding 只保留已有类型与 value
        category；它不能为无类型语法发明类型，也不能绕过对象存储规则。
      </figcaption>
    </figure>
  );
}

const deductionCases = [
  {
    input: "{1, 2, 3}",
    direct: "target parameter supplies vector<int>",
    wrapper: "no expression type for T",
    repair: "auto values = {1,2,3}",
  },
  {
    input: "processVal",
    direct: "target parameter selects one overload",
    wrapper: "overload set has no single type",
    repair: "function pointer or cast",
  },
  {
    input: "workOnVal<T>",
    direct: "target signature selects specialization",
    wrapper: "template name is not one function",
    repair: "instantiate and type the pointer",
  },
] as const;

export function EmcppForwardingDeductionFailureFlowMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="花括号初始化器重载函数名和函数模板名可由目标参数提供上下文却无法由 forwarding wrapper 单独推导的流程图"
          className="grid gap-3 md:grid-cols-3"
        >
          {deductionCases.map((item, index) => (
            <section
              key={item.input}
              className="min-h-56 border border-amber-500/35 bg-amber-500/10 p-4"
            >
              <span className="text-xs text-secondary">0{index + 1}</span>
              <code className="mt-3 block text-sm text-accent">
                {item.input}
              </code>
              <p className="mb-0 mt-3 text-xs text-secondary">
                direct: {item.direct}
              </p>
              <p className="mb-0 mt-2 text-xs text-secondary">
                wrapper: {item.wrapper}
              </p>
              <strong className="mt-3 block text-xs text-primary">
                repair: {item.repair}
              </strong>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        direct call 可从 target signature 获得上下文；generic wrapper
        必须先独立推导 T，因此失去这份目标类型信息。
      </figcaption>
    </figure>
  );
}

const storageChecks = [
  {
    input: "static const int MinVals",
    ordinaryCall: "value may be propagated",
    forwardingCall: "bind T&& reference",
    requirement: "one definition with storage",
  },
  {
    input: "IPv4Header::totalLength bitfield",
    ordinaryCall: "copy into value parameter",
    forwardingCall: "attempt non-const reference",
    requirement: "copy to ordinary object first",
  },
  {
    input: "nullptr",
    ordinaryCall: "pointer overload selected",
    forwardingCall: "T = nullptr_t",
    requirement: "forwards pointer intent correctly",
  },
] as const;

export function EmcppForwardingStorageBoundaryMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="静态常量成员位域和 nullptr 在普通调用与 forwarding reference 调用中的存储及绑定差异图"
          className="space-y-3"
        >
          {storageChecks.map((item, index) => (
            <section
              key={item.input}
              className="grid gap-3 border border-violet-500/30 bg-violet-500/10 p-4 md:grid-cols-[0.9fr_1fr_1fr_1.1fr] md:items-center"
            >
              <strong className="text-sm text-primary">
                <span className="mr-2 text-xs text-secondary">
                  0{index + 1}
                </span>
                {item.input}
              </strong>
              <span className="text-xs text-secondary">
                direct: {item.ordinaryCall}
              </span>
              <code className="text-xs text-accent">
                wrapper: {item.forwardingCall}
              </code>
              <strong className="text-xs text-primary">
                {item.requirement}
              </strong>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        forwarding wrapper 把 value-taking call 改造成 reference
        boundary；这会暴露 ODR-use 与不可寻址 bitfield 的限制。
      </figcaption>
    </figure>
  );
}
