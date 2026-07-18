const boundaries = [
  {
    zone: "widget.h",
    sees: "Widget API + forward Impl",
    hides: "string/vector/Gadget details",
  },
  {
    zone: "consumer.cpp",
    sees: "fixed Widget layout",
    hides: "Impl size and members",
  },
  {
    zone: "widget.cpp",
    sees: "complete Widget::Impl",
    hides: "nothing needed for implementation",
  },
  {
    zone: "link boundary",
    sees: "out-of-line symbols",
    hides: "representation changes",
  },
] as const;

export function EmcppPimplCompilationBoundaryMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="Widget public header consumer implementation source 和链接边界的 Pimpl 依赖隔离图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {boundaries.map((item, index) => (
            <section
              key={item.zone}
              className="min-h-48 border border-sky-500/30 bg-sky-500/10 p-4"
            >
              <span className="text-xs text-secondary">0{index + 1}</span>
              <strong className="mt-3 block text-sm text-primary">
                {item.zone}
              </strong>
              <code className="mt-3 block text-xs leading-5 text-accent">
                sees: {item.sees}
              </code>
              <p className="mb-0 mt-3 text-xs text-secondary">
                hides: {item.hides}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Pimpl 把 representation 与 heavy includes 留在 widget.cpp；consumer
        只依赖稳定 handle-sized public layout。
      </figcaption>
    </figure>
  );
}

const failure = [
  [
    "No destructor declaration",
    "compiler generates inline ~Widget",
    "header context",
  ],
  ["Destroy member", "~unique_ptr<Impl>()", "instantiate default_delete"],
  ["Delete target", "delete Impl*", "Impl still incomplete"],
  ["Diagnostic", "complete-type assertion fails", "consumer compilation stops"],
  ["Fix", "~Widget() defined after Impl", "deleter sees complete type"],
] as const;

export function EmcppIncompleteDestructionFailureMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="隐式 Widget 析构到 unique pointer default delete 不完整 Impl 失败并以 source 定义修复的链路图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5"
        >
          {failure.map(([label, code, detail], index) => (
            <section
              key={label}
              className={`min-h-48 border p-4 ${index === 3 ? "border-rose-500/35 bg-rose-500/10" : index === 4 ? "border-emerald-500/35 bg-emerald-500/10" : "border-amber-500/35 bg-amber-500/10"}`}
            >
              <span className="text-xs text-secondary">0{index + 1}</span>
              <strong className="mt-3 block text-sm text-primary">
                {label}
              </strong>
              <code className="mt-3 block text-xs text-accent">{code}</code>
              <p className="mb-0 mt-3 text-xs text-secondary">{detail}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        问题不在 unique_ptr declaration，而在 deleter 的实例化位置；把
        destructor definition 移过 complete-type boundary 即可。
      </figcaption>
    </figure>
  );
}

const placements = [
  {
    operation: "Destructor",
    header: "~Widget();",
    source: "~Widget() = default",
    reason: "delete complete Impl",
  },
  {
    operation: "Move ctor",
    header: "Widget(Widget&&) noexcept;",
    source: "= default after Impl",
    reason: "restore suppressed move",
  },
  {
    operation: "Move assign",
    header: "operator=(Widget&&);",
    source: "= default after Impl",
    reason: "transfer unique owner",
  },
  {
    operation: "Copy ctor",
    header: "Widget(const Widget&);",
    source: "make_unique<Impl>(*rhs.impl)",
    reason: "optional deep copy",
  },
  {
    operation: "Copy assign",
    header: "operator=(const Widget&);",
    source: "copy-and-swap",
    reason: "strong guarantee",
  },
] as const;

export function EmcppPimplSpecialMemberPlacementMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="Pimpl destructor move constructor move assignment copy constructor copy assignment 在 header 声明和 source 定义的放置矩阵图"
          className="space-y-3"
        >
          {placements.map((item, index) => (
            <section
              key={item.operation}
              className="grid gap-3 border border-violet-500/30 bg-violet-500/10 p-4 md:grid-cols-[0.7fr_1fr_1.2fr_1fr] md:items-center"
            >
              <strong className="text-sm text-primary">
                <span className="mr-2 text-xs text-secondary">
                  0{index + 1}
                </span>
                {item.operation}
              </strong>
              <code className="text-xs text-accent">header: {item.header}</code>
              <code className="text-xs text-accent">source: {item.source}</code>
              <span className="text-xs text-secondary">{item.reason}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        统一规则：API declaration 留在 header，任何需要 Impl
        ownership/representation 的 definition 放在 complete Impl 之后。
      </figcaption>
    </figure>
  );
}
