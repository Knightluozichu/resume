const abstractionPaths = [
  {
    source: "value type + algorithm",
    compile: "specialize / inline / optimize",
    runtime: "direct operations on data",
    cost: "pay for selected representation",
  },
  {
    source: "virtual interface",
    compile: "preserve runtime target set",
    runtime: "indirect dispatch unless proven",
    cost: "pay for dynamic choice",
  },
  {
    source: "unused abstraction",
    compile: "dead-code elimination",
    runtime: "no remaining work",
    cost: "no runtime payment",
  },
] as const;

export function ChpZeroCostAbstractionMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="C++值类型虚接口和未使用抽象从源码经过编译优化到运行时成本的零开销原则比较图"
          className="grid gap-4 lg:grid-cols-3"
        >
          {abstractionPaths.map((item, index) => (
            <section
              key={item.source}
              className="min-h-60 border border-cyan-500/30 bg-cyan-500/10 p-4"
            >
              <span className="text-xs text-secondary">path 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">
                {item.source}
              </strong>
              <code className="mt-4 block break-words text-xs text-accent">
                {item.compile}
              </code>
              <p className="mb-0 mt-4 text-xs text-primary">{item.runtime}</p>
              <p className="mb-0 mt-3 text-xs text-secondary">{item.cost}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        零开销原则不是“所有抽象免费”，而是未使用能力不付运行时成本，使用的能力难以用更低层代码普遍做得更好。
      </figcaption>
    </figure>
  );
}

const ownershipRows = [
  {
    form: "Value member",
    identity: "independent object state",
    owner: "containing object",
    failure: "copy/move semantics must be valid",
  },
  {
    form: "const T&",
    identity: "borrowed existing object",
    owner: "external lifetime",
    failure: "dangling if owner ends",
  },
  {
    form: "unique_ptr<T>",
    identity: "exclusive dynamic object",
    owner: "one movable handle",
    failure: "transfer must be explicit",
  },
  {
    form: "shared_ptr<T>",
    identity: "shared dynamic object",
    owner: "reference-counted group",
    failure: "cycles and atomic overhead",
  },
] as const;

export function ChpValueOwnershipContractMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="值成员常量引用unique ptr和shared ptr在对象身份所有权与失败风险上的契约比较图"
          className="space-y-3"
        >
          {ownershipRows.map((item, index) => (
            <section
              key={item.form}
              className="grid min-h-36 gap-3 border border-violet-500/30 bg-violet-500/10 p-4 md:grid-cols-[0.7fr_1.1fr_1fr_1.1fr] md:items-center"
            >
              <code className="break-words text-xs text-accent">
                <span className="mr-2 text-secondary">0{index + 1}</span>
                {item.form}
              </code>
              <strong className="text-xs text-primary">{item.identity}</strong>
              <span className="text-xs text-primary">{item.owner}</span>
              <span className="text-xs text-secondary">{item.failure}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        高性能接口先让 object identity 与 ownership 明确；少一次 allocation
        不值得换来悬空或模糊释放责任。
      </figcaption>
    </figure>
  );
}

const interfaceStates = [
  {
    state: "Precondition",
    check: "inputs satisfy documented domain",
    success: "enter operation",
    failure: "reject before mutation",
  },
  {
    state: "Acquire resources",
    check: "RAII owners become active",
    success: "all resources represented",
    failure: "constructed owners unwind",
  },
  {
    state: "Commit invariant",
    check: "new state is complete",
    success: "publish valid object",
    failure: "old state remains valid",
  },
  {
    state: "Report outcome",
    check: "exception or explicit result",
    success: "value returned",
    failure: "typed error crosses boundary",
  },
] as const;

export function ChpInterfaceFailureStateMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="严格类接口从前置条件资源获取不变量提交到异常或错误结果报告的失败安全状态图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {interfaceStates.map((item, index) => (
            <section
              key={item.state}
              className="min-h-56 border border-amber-500/35 bg-amber-500/10 p-4"
            >
              <span className="text-xs text-secondary">0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">
                {item.state}
              </strong>
              <code className="mt-3 block break-words text-xs text-accent">
                {item.check}
              </code>
              <p className="mb-0 mt-3 text-xs text-primary">
                success: {item.success}
              </p>
              <p className="mb-0 mt-3 text-xs text-secondary">
                failure: {item.failure}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        接口性能建立在可证明的有效状态上；RAII
        让异常和早退都复用同一资源回收路径。
      </figcaption>
    </figure>
  );
}
