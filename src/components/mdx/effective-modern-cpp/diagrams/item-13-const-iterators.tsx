const capabilities = [
  {
    handle: "iterator",
    move: "yes",
    read: "yes",
    write: "yes",
    intent: "read + mutate",
  },
  {
    handle: "const_iterator",
    move: "yes",
    read: "yes",
    write: "blocked",
    intent: "read-only traversal",
  },
  {
    handle: "const iterator object",
    move: "blocked",
    read: "yes",
    write: "often yes",
    intent: "fixed cursor, mutable element",
  },
] as const;

export function EmcppConstIteratorCapabilityMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="普通迭代器常量迭代器和 const 迭代器对象的移动读取写入能力矩阵图"
          className="grid gap-3 lg:grid-cols-3"
        >
          {capabilities.map((item, index) => (
            <section
              key={item.handle}
              className="min-h-52 border border-border bg-bg/40 p-4"
            >
              <div className="flex justify-between gap-3">
                <strong className="text-sm text-primary">{item.handle}</strong>
                <span className="text-xs text-secondary">0{index + 1}</span>
              </div>
              <dl className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="border border-border p-2">
                  <dt className="text-secondary">move</dt>
                  <dd className="m-0 text-primary">{item.move}</dd>
                </div>
                <div className="border border-border p-2">
                  <dt className="text-secondary">read</dt>
                  <dd className="m-0 text-primary">{item.read}</dd>
                </div>
                <div className="border border-border p-2">
                  <dt className="text-secondary">write</dt>
                  <dd className="m-0 text-primary">{item.write}</dd>
                </div>
              </dl>
              <p className="mb-0 mt-3 text-xs text-secondary">{item.intent}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        const_iterator 将 const 放在 element access 层；const iterator object 将
        const 放在 cursor object 层。
      </figcaption>
    </figure>
  );
}

const mutationFlow = [
  ["Read-only range", "values.cbegin(), values.cend()", "no element writes"],
  ["Find boundary", "find(..., 1983)", "returns const_iterator"],
  [
    "Container mutation",
    "values.insert(position, 1998)",
    "non-const owner changes structure",
  ],
  [
    "Invalidate audit",
    "reacquire cursor if required",
    "old position may be invalid",
  ],
] as const;

export function EmcppConstIteratorMutationFlowMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="从 cbegin cend 只读范围查找 const iterator 位置到容器插入和失效审计的四阶段流程图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {mutationFlow.map(([label, code, detail], index) => (
            <section
              key={label}
              className={`min-h-48 border p-4 ${index === 2 ? "border-amber-500/35 bg-amber-500/10" : "border-emerald-500/35 bg-emerald-500/10"}`}
            >
              <span className="text-xs text-secondary">0{index + 1}</span>
              <strong className="mt-3 block text-sm text-primary">
                {label}
              </strong>
              <code className="mt-3 block text-xs leading-5 text-accent">
                {code}
              </code>
              <p className="mb-0 mt-3 text-xs leading-5 text-secondary">
                {detail}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        position 的只读能力与 owner 的结构修改能力相互独立；mutation 后仍要执行
        container-specific invalidation audit。
      </figcaption>
    </figure>
  );
}

const accessRows = [
  {
    range: "std container",
    entry: "std::cbegin/cend",
    result: "container::const_iterator",
  },
  {
    range: "const container",
    entry: "std::begin/end",
    result: "const_iterator",
  },
  {
    range: "built-in array",
    entry: "std::cbegin/cend",
    result: "pointer to const element",
  },
  {
    range: "custom range",
    entry: "std fallback + ADL",
    result: "user const cursor",
  },
] as const;

export function EmcppGenericContainerAccessMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="标准容器 const 容器内建数组和自定义 range 的泛型只读访问入口与结果类型图"
          className="space-y-3"
        >
          {accessRows.map((row, index) => (
            <section
              key={row.range}
              className="grid gap-3 border border-sky-500/30 bg-sky-500/10 p-4 md:grid-cols-[0.8fr_1fr_1.2fr] md:items-center"
            >
              <strong className="text-sm text-primary">
                <span className="mr-2 text-xs text-secondary">
                  0{index + 1}
                </span>
                {row.range}
              </strong>
              <code className="text-xs text-accent">{row.entry}</code>
              <span className="text-xs text-secondary">{row.result}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        泛型代码依赖 range access contract，而不是写死
        container::const_iterator；数组与用户类型因此共享算法。
      </figcaption>
    </figure>
  );
}
