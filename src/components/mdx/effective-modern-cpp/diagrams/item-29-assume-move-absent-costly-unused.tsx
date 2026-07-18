const assumptionFailures = [
  {
    assumption: "Move is present",
    counterexample: "legacy / copy-only type",
    actual: "rvalue binds to const T& copy",
  },
  {
    assumption: "Move is cheap",
    counterexample: "array or small-string storage",
    actual: "elements/bytes still relocate",
  },
  {
    assumption: "Move is used",
    counterexample: "throwing move in vector growth",
    actual: "copy preserves strong guarantee",
  },
] as const;

export function EmcppMoveAssumptionFailureMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="移动操作存在性成本和实际采用三类乐观假设分别被复制类型内嵌存储与异常保证打破的地图"
          className="grid gap-3 md:grid-cols-3"
        >
          {assumptionFailures.map((item, index) => (
            <section
              key={item.assumption}
              className="min-h-48 border border-rose-500/35 bg-rose-500/10 p-4"
            >
              <span className="text-xs text-secondary">0{index + 1}</span>
              <strong className="mt-3 block text-sm text-primary">
                {item.assumption}
              </strong>
              <code className="mt-3 block text-xs text-accent">
                {item.counterexample}
              </code>
              <p className="mb-0 mt-3 text-xs text-secondary">
                reality: {item.actual}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        “可写 std::move”只表达允许把对象当 rvalue；它不证明有 move
        overload、不证明成本更低，也不证明 library 会选择它。
      </figcaption>
    </figure>
  );
}

const storageModels = [
  {
    type: "vector<T>",
    object: "pointer + size + capacity",
    resource: "heap buffer",
    move: "steal three words",
    cost: "usually O(1)",
  },
  {
    type: "array<T, N>",
    object: "N elements inline",
    resource: "inside object",
    move: "move each element",
    cost: "O(N)",
  },
  {
    type: "large string",
    object: "metadata + pointer",
    resource: "heap characters",
    move: "transfer allocation",
    cost: "often O(1)",
  },
  {
    type: "SSO string",
    object: "characters inline",
    resource: "inside object",
    move: "copy inline bytes",
    cost: "similar to copy",
  },
] as const;

export function EmcppMoveStorageCostMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="vector array 大字符串和小字符串优化对象的资源位置决定移动复杂度的对照图"
          className="space-y-3"
        >
          {storageModels.map((item, index) => (
            <section
              key={item.type}
              className="grid gap-3 border border-cyan-500/30 bg-cyan-500/10 p-4 md:grid-cols-[0.7fr_1fr_0.9fr_0.9fr_0.7fr] md:items-center"
            >
              <strong className="text-sm text-primary">
                <span className="mr-2 text-xs text-secondary">
                  0{index + 1}
                </span>
                {item.type}
              </strong>
              <span className="text-xs text-secondary">{item.object}</span>
              <code className="text-xs text-accent">{item.resource}</code>
              <span className="text-xs text-secondary">{item.move}</span>
              <strong className="text-xs text-primary">{item.cost}</strong>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        move 的成本由 resource topology
        决定：可转交外部所有权时通常便宜，资源内嵌时仍需逐项搬运。
      </figcaption>
    </figure>
  );
}

const reallocationGates = [
  {
    gate: "Need relocation",
    check: "vector capacity exhausted",
    yes: "allocate new storage",
    no: "construct in place",
  },
  {
    gate: "Move guarantee",
    check: "is_nothrow_move_constructible<T>",
    yes: "move existing elements",
    no: "inspect copy path",
  },
  {
    gate: "Copy available",
    check: "is_copy_constructible<T>",
    yes: "copy for strong guarantee",
    no: "move with weaker outcome",
  },
  {
    gate: "Observed result",
    check: "constructor counters",
    yes: "verify move/copy calls",
    no: "do not infer from syntax",
  },
] as const;

export function EmcppVectorRelocationDecisionFlowMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="vector 扩容根据 move 是否 noexcept 和 copy 是否可用选择移动或复制已有元素的决策流程图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {reallocationGates.map((item, index) => (
            <section
              key={item.gate}
              className="min-h-52 border border-violet-500/30 bg-violet-500/10 p-4"
            >
              <span className="text-xs text-secondary">0{index + 1}</span>
              <strong className="mt-3 block text-sm text-primary">
                {item.gate}
              </strong>
              <code className="mt-3 block break-words text-xs text-accent">
                {item.check}
              </code>
              <p className="mb-0 mt-3 text-xs text-secondary">
                yes: {item.yes}
              </p>
              <p className="mb-0 mt-2 text-xs text-secondary">no: {item.no}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        vector 重分配需要维护异常保证；可复制但 move
        可能抛异常时，标准库通常选择复制回退。
      </figcaption>
    </figure>
  );
}
