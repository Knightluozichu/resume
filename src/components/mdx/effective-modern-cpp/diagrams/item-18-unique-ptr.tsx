const lifecycle = [
  ["Create", "make_unique<T>()", "one owner acquires resource"],
  ["Use", "owner.get() / *owner", "borrow without transfer"],
  ["Transfer", "next = move(owner)", "source empty, destination owns"],
  ["Destroy", "scope exit / reset", "deleter runs exactly once"],
] as const;

export function EmcppUniqueOwnershipLifecycleMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="unique pointer 从创建借用移动转移到销毁的单一所有权生命周期图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {lifecycle.map(([label, code, detail], index) => (
            <section
              key={label}
              className="min-h-48 border border-emerald-500/30 bg-emerald-500/10 p-4"
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
        ownership token 始终只有一份；borrow 不复制责任，move 明确把责任交给下一
        owner。
      </figcaption>
    </figure>
  );
}

const adaptations = [
  {
    caller: "Exclusive caller",
    action: "keep unique_ptr<Base>",
    cost: "pointer + deleter only",
  },
  {
    caller: "Derived factory",
    action: "move unique_ptr<Derived> to Base",
    cost: "no shared control block",
  },
  {
    caller: "Shared caller",
    action: "move into shared_ptr<Base>",
    cost: "create control block once",
  },
] as const;

export function EmcppFactoryReturnAdaptationMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="工厂返回 unique pointer 后独占调用方派生到基类转换和升级 shared pointer 的三条适配路径图"
          className="grid gap-3 lg:grid-cols-3"
        >
          {adaptations.map((item, index) => (
            <section
              key={item.caller}
              className="min-h-48 border border-sky-500/30 bg-sky-500/10 p-4"
            >
              <span className="text-xs text-secondary">0{index + 1}</span>
              <strong className="mt-3 block text-sm text-primary">
                {item.caller}
              </strong>
              <code className="mt-3 block text-xs leading-5 text-accent">
                {item.action}
              </code>
              <p className="mb-0 mt-3 text-xs text-secondary">{item.cost}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        factory 从最小 ownership
        承诺开始；独占可单向升级共享，而共享无法可靠退回独占。
      </figcaption>
    </figure>
  );
}

const deleters = [
  { kind: "default_delete", state: "empty", layout: "typically one pointer" },
  { kind: "stateless lambda", state: "empty type", layout: "often compressed" },
  {
    kind: "stateful functor",
    state: "Pool* / policy",
    layout: "pointer plus stored state",
  },
  {
    kind: "function pointer",
    state: "deleter address",
    layout: "usually two pointers",
  },
] as const;

export function EmcppCustomDeleterLayoutMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="默认删除器无状态 lambda 有状态 functor 和函数指针删除器对 unique pointer 布局的影响图"
          className="space-y-3"
        >
          {deleters.map((item, index) => (
            <section
              key={item.kind}
              className="grid gap-3 border border-violet-500/30 bg-violet-500/10 p-4 md:grid-cols-[0.8fr_1fr_1.2fr] md:items-center"
            >
              <strong className="text-sm text-primary">
                <span className="mr-2 text-xs text-secondary">
                  0{index + 1}
                </span>
                {item.kind}
              </strong>
              <code className="text-xs text-accent">{item.state}</code>
              <span className="text-xs text-secondary">{item.layout}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        deleter 既是行为也是 layout：具体无状态 type 最轻，运行期 type erasure
        用额外存储换灵活性。
      </figcaption>
    </figure>
  );
}
