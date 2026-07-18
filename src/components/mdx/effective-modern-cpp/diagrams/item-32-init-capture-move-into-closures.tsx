const initCaptureScopes = [
  {
    fragment: "resource =",
    scope: "new closure member name",
    evaluated: "usable only inside lambda body",
  },
  {
    fragment: "std::move(resource)",
    scope: "enclosing lexical scope",
    evaluated: "runs when closure is created",
  },
  {
    fragment: "closure.resource",
    scope: "closure object lifetime",
    evaluated: "owns the moved value",
  },
] as const;

export function EmcppInitCaptureScopeMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="初始化捕获等号左侧命名闭包数据成员右侧在外层作用域求值并在闭包创建时初始化成员的作用域图"
          className="grid gap-3 md:grid-cols-3"
        >
          {initCaptureScopes.map((item, index) => (
            <section
              key={item.fragment}
              className="min-h-48 border border-cyan-500/30 bg-cyan-500/10 p-4"
            >
              <span className="text-xs text-secondary">0{index + 1}</span>
              <code className="mt-3 block text-sm text-accent">
                {item.fragment}
              </code>
              <strong className="mt-3 block text-xs text-primary">
                {item.scope}
              </strong>
              <p className="mb-0 mt-3 text-xs text-secondary">
                {item.evaluated}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        `[member = expression]` 的左右两侧属于不同 scope；它等价于为生成的
        closure class 声明并初始化 data member。
      </figcaption>
    </figure>
  );
}

const ownershipTimeline = [
  {
    phase: "Before capture",
    outer: "owner -> Widget",
    closure: "not created",
  },
  {
    phase: "Evaluate initializer",
    outer: "std::move(owner)",
    closure: "construct member from rvalue",
  },
  {
    phase: "After capture",
    outer: "owner == nullptr",
    closure: "member -> Widget",
  },
  {
    phase: "Move closure",
    outer: "no ownership",
    closure: "ownership follows closure object",
  },
] as const;

export function EmcppClosureOwnershipTransferFlowMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="unique_ptr 从外层变量经初始化捕获移动到闭包数据成员并随闭包继续移动的所有权时间线"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {ownershipTimeline.map((item, index) => (
            <section
              key={item.phase}
              className="min-h-48 border border-emerald-500/35 bg-emerald-500/10 p-4"
            >
              <span className="text-xs text-secondary">0{index + 1}</span>
              <strong className="mt-3 block text-sm text-primary">
                {item.phase}
              </strong>
              <code className="mt-3 block text-xs text-accent">
                outer: {item.outer}
              </code>
              <p className="mb-0 mt-3 text-xs text-secondary">
                closure: {item.closure}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        move-only resource 不再依赖外层 local lifetime；它成为 closure
        state，并随 closure 的 move semantics 转移。
      </figcaption>
    </figure>
  );
}

const emulationOptions = [
  {
    option: "C++14 init capture",
    state: "generated closure member",
    construction: "[p = std::move(p)]",
    tradeoff: "short and direct",
  },
  {
    option: "C++11 functor",
    state: "explicit class data member",
    construction: "constructor takes unique_ptr",
    tradeoff: "verbose but transparent",
  },
  {
    option: "C++11 bind + lambda",
    state: "bind object stores argument",
    construction: "bind(callable, std::move(p))",
    tradeoff: "compact, more type machinery",
  },
] as const;

export function EmcppInitCaptureEmulationMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="C++14 初始化捕获与 C++11 手写函数对象及 bind lambda 模拟在状态位置构造方式和取舍上的对照图"
          className="space-y-3"
        >
          {emulationOptions.map((item, index) => (
            <section
              key={item.option}
              className="grid gap-3 border border-violet-500/30 bg-violet-500/10 p-4 md:grid-cols-[0.9fr_1fr_1.2fr_0.8fr] md:items-center"
            >
              <strong className="text-sm text-primary">
                <span className="mr-2 text-xs text-secondary">
                  0{index + 1}
                </span>
                {item.option}
              </strong>
              <span className="text-xs text-secondary">{item.state}</span>
              <code className="text-xs text-accent">{item.construction}</code>
              <strong className="text-xs text-primary">{item.tradeoff}</strong>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        三种写法都把 state 按值放进 callable object；差异在于 closure member
        是由语言、手写 class 还是 bind object 表达。
      </figcaption>
    </figure>
  );
}
