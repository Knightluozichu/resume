const dependencyRows = [
  {
    syntax: "[&]",
    visible: "all used local names look implicit",
    hidden: "reference lifetime requirements",
    safer: "[divisorRef] with documented owner",
  },
  {
    syntax: "[=]",
    visible: "looks like a value snapshot",
    hidden: "this pointer and external static state",
    safer: "[divisor = divisor]",
  },
  {
    syntax: "explicit",
    visible: "each closure dependency is named",
    hidden: "lifetime still needs review",
    safer: "choose value/reference per dependency",
  },
] as const;

export function EmcppCaptureDependencyReviewMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="按引用默认捕获按值默认捕获与显式捕获在依赖可见性隐藏风险和替代写法上的对照图"
          className="space-y-3"
        >
          {dependencyRows.map((item, index) => (
            <section
              key={item.syntax}
              className="grid gap-3 border border-cyan-500/30 bg-cyan-500/10 p-4 md:grid-cols-[0.6fr_1fr_1fr_1fr] md:items-center"
            >
              <code className="text-sm text-accent">
                <span className="mr-2 text-xs text-secondary">
                  0{index + 1}
                </span>
                {item.syntax}
              </code>
              <span className="text-xs text-secondary">{item.visible}</span>
              <strong className="text-xs text-primary">{item.hidden}</strong>
              <code className="text-xs text-accent">{item.safer}</code>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        capture list 是 closure 的 dependency manifest；默认模式把 dependency 和
        lifetime policy 都藏起来。
      </figcaption>
    </figure>
  );
}

const lifetimeEvents = [
  {
    phase: "Create local",
    state: "divisor lives in addFilter stack frame",
    closure: "[&] stores a reference",
  },
  {
    phase: "Store closure",
    state: "filter moves into long-lived container",
    closure: "reference still points to local",
  },
  {
    phase: "Return",
    state: "divisor lifetime ends",
    closure: "captured reference dangles",
  },
  {
    phase: "Invoke later",
    state: "stack storage may be reused",
    closure: "read causes undefined behavior",
  },
] as const;

export function EmcppReferenceCaptureLifetimeFlowMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="局部 divisor 被引用捕获后闭包存入容器函数返回再延迟调用导致悬空引用的时间线"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {lifetimeEvents.map((item, index) => (
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
              <p className="mb-0 mt-3 text-xs text-secondary">{item.state}</p>
              <code className="mt-3 block text-xs text-accent">
                {item.closure}
              </code>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        closure 的 lifetime
        与被引用对象独立；只证明创建时有效，不能证明延迟调用时有效。
      </figcaption>
    </figure>
  );
}

const valueCaptureTruth = [
  {
    source: "local variable",
    captured: "a copied data member",
    laterChange: "does not affect snapshot",
    ownerRisk: "copied value owns itself",
  },
  {
    source: "class data member",
    captured: "this pointer by value",
    laterChange: "reads current member value",
    ownerRisk: "object may be destroyed",
  },
  {
    source: "global / static object",
    captured: "nothing",
    laterChange: "reads current external value",
    ownerRisk: "shared mutable state",
  },
] as const;

export function EmcppValueCaptureRealityMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="按值默认捕获对局部变量类成员和全局静态对象分别复制值捕获 this 指针或不捕获的真实语义图"
          className="space-y-3"
        >
          {valueCaptureTruth.map((item, index) => (
            <section
              key={item.source}
              className="grid gap-3 border border-violet-500/30 bg-violet-500/10 p-4 md:grid-cols-[0.8fr_1fr_1fr_1fr] md:items-center"
            >
              <strong className="text-sm text-primary">
                <span className="mr-2 text-xs text-secondary">
                  0{index + 1}
                </span>
                {item.source}
              </strong>
              <code className="text-xs text-accent">{item.captured}</code>
              <span className="text-xs text-secondary">
                later: {item.laterChange}
              </span>
              <strong className="text-xs text-primary">
                risk: {item.ownerRisk}
              </strong>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        [=] 只复制可捕获的 local variables；member access 与 static state
        并不自动形成值快照。
      </figcaption>
    </figure>
  );
}
