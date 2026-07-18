const standardLibraryChecks = [
  {
    check: "Semantic contract",
    question: "does the abstraction match ownership, ordering and errors?",
    example: "stable order, iterator invalidation, exception guarantee",
  },
  {
    check: "Complexity contract",
    question: "which operation mix is promised and which is not?",
    example: "lookup, insert, erase, iteration and construction",
  },
  {
    check: "Representation cost",
    question: "what allocation, movement and locality follow?",
    example: "contiguous vector vs node-based container",
  },
  {
    check: "Implementation visibility",
    question: "can the compiler inline/specialize across the call?",
    example: "templates/ranges vs opaque ABI boundary",
  },
] as const;

export function OpcStandardLibraryUseMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="标准库语义复杂度表示成本和实现可见性四项使用审计图"
          className="grid gap-3 sm:grid-cols-2"
        >
          {standardLibraryChecks.map((row, index) => (
            <section
              key={row.check}
              className="min-h-64 border border-cyan-500/35 bg-cyan-500/10 p-4"
            >
              <span className="text-xs text-secondary">check 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">
                {row.check}
              </strong>
              <p className="mb-0 mt-4 text-xs text-primary">{row.question}</p>
              <code className="mt-4 block break-words text-xs text-accent">
                {row.example}
              </code>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        C++ standard library 偏向通用、可组合、复杂度可说明的
        primitives；高效使用来自匹配 contract 与
        workload，而不是默认“标准库总是最快”或“手写总是更快”。
      </figcaption>
    </figure>
  );
}

const changeLevels = [
  {
    level: "Use differently",
    action: "change call pattern, reserve, batch or select another primitive",
    compatibility: "no library semantic change",
    validation: "application A/B and correctness tests",
    tone: "border-emerald-500/35 bg-emerald-500/10",
  },
  {
    level: "Add function",
    action: "introduce batch/range/fast-path API beside existing entry",
    compatibility: "old callers keep behavior",
    validation: "new API equivalence + edge cases",
    tone: "border-violet-500/35 bg-violet-500/10",
  },
  {
    level: "Wrap / adapt",
    action: "put allocation, cache or policy behind an adapter",
    compatibility: "migration remains localized and reversible",
    validation: "adapter ownership/error/performance contract",
    tone: "border-amber-500/35 bg-amber-500/10",
  },
  {
    level: "Change internals",
    action: "replace implementation only after profile proves necessity",
    compatibility: "public semantics/ABI remain explicit",
    validation: "full conformance, rollout and rollback",
    tone: "border-rose-500/35 bg-rose-500/10",
  },
] as const;

export function OpcExistingLibraryChangeMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="改变调用方式新增函数包装适配和修改内部四级已有库优化风险阶梯图"
          className="grid gap-3 lg:grid-cols-4"
        >
          {changeLevels.map((row, index) => (
            <section
              key={row.level}
              className={`relative min-h-80 border p-4 ${row.tone}`}
            >
              <span className="text-xs text-secondary">level 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">
                {row.level}
              </strong>
              <code className="mt-4 block break-words text-xs text-accent">
                {row.action}
              </code>
              <p className="mb-0 mt-4 text-xs text-primary">
                {row.compatibility}
              </p>
              <p className="mb-0 mt-3 text-xs text-secondary">
                prove: {row.validation}
              </p>
              {index < changeLevels.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="absolute -right-3 top-1/2 z-10 hidden text-accent lg:block"
                >
                  →
                </span>
              ) : null}
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        change as little as possible：先改 usage，再新增窄函数或 adapter；只有
        public contract、conformance 与 rollback 都可证明时才替换已有功能。
      </figcaption>
    </figure>
  );
}

const designPressures = [
  {
    pressure: "Parsimony",
    prefer: "small orthogonal functions and explicit policy",
    avoid: "framework lifecycle and speculative features",
  },
  {
    pressure: "Allocation ownership",
    prefer: "caller buffer/resource/range or explicit owning result",
    avoid: "hidden global allocator and surprise temporary",
  },
  {
    pressure: "Call/layer depth",
    prefer: "batch entry and flatten measured forwarding chains",
    avoid: "one item crossing many opaque wrappers",
  },
  {
    pressure: "Dispatch",
    prefer: "direct/static table for closed hot path",
    avoid: "dynamic name/type lookup on every operation",
  },
  {
    pressure: "Architecture",
    prefer: "composable focused functions",
    avoid: "god function created by indiscriminate flattening",
  },
  {
    pressure: "Inheritance",
    prefer: "composition or shallow required runtime interface",
    avoid: "deep hierarchy with forwarding and unused polymorphism",
  },
] as const;

export function OpcOptimizedLibraryDesignMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="克制设计分配所有权调用层次分派架构和继承六项高性能库设计图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {designPressures.map((row, index) => (
            <section
              key={row.pressure}
              className="min-h-64 border border-fuchsia-500/30 bg-fuchsia-500/10 p-4"
            >
              <span className="text-xs text-secondary">
                pressure 0{index + 1}
              </span>
              <strong className="mt-2 block text-sm text-primary">
                {row.pressure}
              </strong>
              <code className="mt-4 block break-words text-xs text-accent">
                prefer: {row.prefer}
              </code>
              <p className="mb-0 mt-4 text-xs text-secondary">
                avoid: {row.avoid}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        functions are easier to optimize than
        frameworks，因为输入、输出、allocation 与 work boundary 更显式；flatten
        只针对测得的 forwarding/dispatch，不把系统揉成 god function。
      </figcaption>
    </figure>
  );
}
