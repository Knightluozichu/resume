const contractPaths = [
  {
    path: "Normal return",
    result: "caller continues",
    tone: "border-emerald-500/35 bg-emerald-500/10",
  },
  {
    path: "Internal throw + catch",
    result: "function converts/absorbs error",
    tone: "border-sky-500/35 bg-sky-500/10",
  },
  {
    path: "Exception escapes",
    result: "std::terminate",
    tone: "border-rose-500/35 bg-rose-500/10",
  },
] as const;

export function EmcppNoexceptContractMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="noexcept 函数正常返回内部捕获和异常逃逸终止三条契约路径图"
          className="grid gap-3 lg:grid-cols-3"
        >
          {contractPaths.map((item, index) => (
            <section
              key={item.path}
              className={`min-h-44 border p-4 ${item.tone}`}
            >
              <span className="text-xs text-secondary">0{index + 1}</span>
              <strong className="mt-3 block text-sm text-primary">
                {item.path}
              </strong>
              <p className="mb-0 mt-4 text-xs leading-5 text-secondary">
                {item.result}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        noexcept 约束边界结果，不禁止内部 throw；唯一不可接受的是 exception
        逃逸。
      </figcaption>
    </figure>
  );
}

const relocation = [
  {
    condition: "move noexcept",
    action: "move elements",
    guarantee: "no mid-move exception",
    tone: "border-emerald-500/35 bg-emerald-500/10",
  },
  {
    condition: "move may throw + copy available",
    action: "copy elements",
    guarantee: "old vector remains intact on failure",
    tone: "border-amber-500/35 bg-amber-500/10",
  },
  {
    condition: "move may throw + no copy",
    action: "move is required",
    guarantee: "guarantee may be weaker",
    tone: "border-rose-500/35 bg-rose-500/10",
  },
] as const;

export function EmcppVectorRelocationDecisionMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="vector 扩容根据 move 是否 noexcept 和 copy 是否可用选择迁移策略的决策图"
          className="grid gap-3 lg:grid-cols-3"
        >
          {relocation.map((item, index) => (
            <section
              key={item.condition}
              className={`min-h-52 border p-4 ${item.tone}`}
            >
              <span className="text-xs text-secondary">0{index + 1}</span>
              <strong className="mt-3 block text-sm text-primary">
                {item.condition}
              </strong>
              <code className="mt-4 block text-xs text-accent">
                {item.action}
              </code>
              <p className="mb-0 mt-3 text-xs leading-5 text-secondary">
                {item.guarantee}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        move_if_noexcept
        的目标不是盲目移动，而是在可用能力中尽量保住异常安全保证。
      </figcaption>
    </figure>
  );
}

const composition = [
  { layer: "Member A", test: "nothrow move = true", result: "true" },
  { layer: "Member B", test: "nothrow move = true", result: "true" },
  { layer: "Aggregate", test: "A && B", result: "noexcept move" },
  {
    layer: "Throwing member",
    test: "one false",
    result: "wrapper noexcept = false",
  },
] as const;

export function EmcppConditionalNoexceptCompositionMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="成员 nothrow move traits 通过逻辑合取组成聚合类型 conditional noexcept 的能力图"
          className="space-y-3"
        >
          {composition.map((item, index) => (
            <section
              key={item.layer}
              className="grid gap-3 border border-sky-500/30 bg-sky-500/10 p-4 md:grid-cols-[0.8fr_1fr_1fr] md:items-center"
            >
              <strong className="text-sm text-primary">
                <span className="mr-2 text-xs text-secondary">
                  0{index + 1}
                </span>
                {item.layer}
              </strong>
              <code className="text-xs text-accent">{item.test}</code>
              <span className="text-xs text-secondary">{item.result}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        conditional noexcept 像能力电路：所有必要 leaf operations
        不抛，aggregate 才能公开不抛承诺。
      </figcaption>
    </figure>
  );
}
