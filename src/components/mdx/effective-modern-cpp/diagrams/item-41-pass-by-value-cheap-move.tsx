const costRows = [
  {
    caller: "lvalue string",
    overloads: "1 copy",
    forwarding: "1 copy",
    byValue: "1 copy + 1 move",
  },
  {
    caller: "rvalue string",
    overloads: "1 move",
    forwarding: "1 move",
    byValue: "2 moves (often optimizable)",
  },
  {
    caller: "convertible input",
    overloads: "temporary + move/copy",
    forwarding: "direct construction",
    byValue: "parameter construction + move",
  },
] as const;

export function EmcppPassByValueCostMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="字符串左值右值和可转换输入在重载 forwarding 与按值传参接口中的复制移动成本矩阵"
          className="space-y-3"
        >
          {costRows.map((item, index) => (
            <section
              key={item.caller}
              className="grid gap-3 border border-cyan-500/30 bg-cyan-500/10 p-4 md:grid-cols-[0.8fr_1fr_1fr_1.1fr] md:items-center"
            >
              <strong className="text-sm text-primary">
                <span className="mr-2 text-xs text-secondary">
                  0{index + 1}
                </span>
                {item.caller}
              </strong>
              <span className="text-xs text-secondary">
                overloads: {item.overloads}
              </span>
              <code className="text-xs text-accent">
                forward: {item.forwarding}
              </code>
              <strong className="text-xs text-primary">
                value: {item.byValue}
              </strong>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        按值方案用最多一次额外 move 换取单一 non-template API；只有 move
        真便宜时这笔交换才成立。
      </figcaption>
    </figure>
  );
}

const gates = [
  {
    gate: "Copyable?",
    pass: "lvalue callers can construct parameter",
    fail: "move-only lvalues are excluded",
  },
  {
    gate: "Cheap to move?",
    pass: "extra move is bounded and small",
    fail: "array/inline state may be O(N)",
  },
  {
    gate: "Always copied?",
    pass: "function owns/stores a new value",
    fail: "read-only/conditional copy pays eagerly",
  },
  {
    gate: "No slicing?",
    pass: "concrete value type is intended",
    fail: "base-by-value loses derived state",
  },
  {
    gate: "Allocation acceptable?",
    pass: "sink construction is natural",
    fail: "assignment could have reused capacity",
  },
] as const;

export function EmcppPassByValueSuitabilityMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="按值传参需要同时通过可复制移动便宜总会复制无切片和可接受分配五道条件门的决策图"
          className="space-y-3"
        >
          {gates.map((item, index) => (
            <section
              key={item.gate}
              className="grid gap-3 border border-violet-500/30 bg-violet-500/10 p-4 md:grid-cols-[0.8fr_1.3fr_1.3fr] md:items-center"
            >
              <strong className="text-sm text-primary">
                <span className="mr-2 text-xs text-secondary">
                  0{index + 1}
                </span>
                {item.gate}
              </strong>
              <span className="text-xs text-secondary">pass: {item.pass}</span>
              <code className="text-xs text-accent">reject: {item.fail}</code>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Item 41 是 consider pass by value，不是默认改写；五项条件应按具体
        parameter 与 operation 分别验证。
      </figcaption>
    </figure>
  );
}

const assignmentPaths = [
  {
    phase: "Existing member",
    constRef: "capacity 128, size 20",
    byValue: "capacity 128, size 20",
  },
  {
    phase: "Receive lvalue 60",
    constRef: "reference only",
    byValue: "copy-construct parameter; allocate 60",
  },
  {
    phase: "Assign",
    constRef: "reuse member capacity 128",
    byValue: "move buffer; release old 128",
  },
  {
    phase: "Result",
    constRef: "zero new allocations possible",
    byValue: "one new allocation + deallocation",
  },
] as const;

export function EmcppAssignmentAllocationFlowMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="已有字符串容量足够时 const reference assignment 可复用容量而按值参数先分配再移动导致额外分配的时间线"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {assignmentPaths.map((item, index) => (
            <section
              key={item.phase}
              className={`min-h-52 border p-4 ${index >= 2 ? "border-rose-500/35 bg-rose-500/10" : "border-amber-500/35 bg-amber-500/10"}`}
            >
              <span className="text-xs text-secondary">0{index + 1}</span>
              <strong className="mt-3 block text-sm text-primary">
                {item.phase}
              </strong>
              <p className="mb-0 mt-3 text-xs text-secondary">
                const&amp;: {item.constRef}
              </p>
              <code className="mt-3 block text-xs text-accent">
                value: {item.byValue}
              </code>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        “总会复制”若实际是 assignment，目标对象可能复用已有 storage；按值
        parameter 会在进入函数前丢失这次复用机会。
      </figcaption>
    </figure>
  );
}
