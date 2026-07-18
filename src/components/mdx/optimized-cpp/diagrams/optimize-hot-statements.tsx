const loopTransformations = [
  {
    lever: "Remove",
    before: "parse/config/call/recompute inside every iteration",
    after: "delete work or hoist true invariants",
    proof: "same side effects and values for all iterations",
  },
  {
    lever: "Cache / batch",
    before: "opaque end query or one call per item",
    after: "cache stable end; push full range into one function",
    proof: "range cannot change and batching preserves order/errors",
  },
  {
    lever: "Reduce frequency",
    before: "expensive update every loop tick",
    after: "event/dirty flag/periodic update",
    proof: "freshness and latency contract still holds",
  },
  {
    lever: "Reshape loop",
    before: "dependency-heavy body and awkward termination",
    after: "clear induction, independent accumulators, measured direction",
    proof: "compiler output and representative data improve",
  },
] as const;

export function OpcHotLoopTransformationMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="删除循环工作缓存批处理降低频率和重塑循环四类热点循环变换图"
          className="grid gap-3 sm:grid-cols-2"
        >
          {loopTransformations.map((row, index) => (
            <section
              key={row.lever}
              className="min-h-72 border border-cyan-500/35 bg-cyan-500/10 p-4"
            >
              <span className="text-xs text-secondary">lever 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">
                {row.lever}
              </strong>
              <p className="mb-0 mt-4 text-xs text-secondary">
                before: {row.before}
              </p>
              <code className="mt-4 block break-words text-xs text-accent">
                after: {row.after}
              </code>
              <p className="mb-0 mt-4 text-xs text-primary">
                prove: {row.proof}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        hot loop 的首选不是换一条指令，而是减少每次 iteration 做的 work、call 与
        decision； 只有语义和 workload 都固定后才比较 loop shape。
      </figcaption>
    </figure>
  );
}

const callForms = [
  {
    form: "Visible direct / inline",
    benefit: "optimizer sees body and constants",
    cost: "code growth and compile dependency",
    useWhen: "brief hot function, stable implementation boundary",
  },
  {
    form: "Template / static dispatch",
    benefit: "compile-time implementation selection",
    cost: "instantiation/code size and exposed implementation",
    useWhen: "closed policy set and hot polymorphic call",
  },
  {
    form: "Virtual dispatch",
    benefit: "runtime-open substitution and object interface",
    cost: "indirection; may inhibit inline/devirtualization",
    useWhen: "runtime variability is required",
  },
  {
    form: "PIMPL / DLL boundary",
    benefit: "ABI stability and compile isolation",
    cost: "opaque body, indirection and boundary overhead",
    useWhen: "architecture value outweighs measured hot-call cost",
  },
] as const;

export function OpcCallDispatchBoundaryMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="直接内联模板静态分派虚函数和PIMPL动态库调用边界的优化能力与架构成本比较图"
          className="space-y-3"
        >
          {callForms.map((row, index) => (
            <section
              key={row.form}
              className="grid min-h-40 gap-3 border border-violet-500/30 bg-violet-500/10 p-4 lg:grid-cols-[0.8fr_1.15fr_1.15fr_1.3fr] lg:items-center"
            >
              <div>
                <span className="text-xs text-secondary">
                  form 0{index + 1}
                </span>
                <strong className="mt-2 block text-sm text-primary">
                  {row.form}
                </strong>
              </div>
              <code className="break-words text-xs text-accent">
                {row.benefit}
              </code>
              <span className="text-xs text-secondary">{row.cost}</span>
              <span className="text-xs text-primary">{row.useWhen}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        dispatch choice 同时服务 performance 与 architecture；先证明 call site
        是热点且 runtime variability 不需要，才用 inline/template 替换
        polymorphism 或 DLL/PIMPL 边界。
      </figcaption>
    </figure>
  );
}

const statementChoices = [
  {
    question: "Repeated expression?",
    cheaperShape: "group constants, hoist invariant, reuse result",
    guard: "rounding, overflow, alias and side effects unchanged",
    tone: "border-emerald-500/35 bg-emerald-500/10",
  },
  {
    question: "Expensive operator / loop?",
    cheaperShape: "closed form, shift/multiply only when semantics match",
    guard: "compiler may already transform; integer range must be proven",
    tone: "border-amber-500/35 bg-amber-500/10",
  },
  {
    question: "Many-way decision?",
    cheaperShape: "switch/table/if/virtual selected by distribution and design",
    guard: "predictability, density, extensibility and fallback preserved",
    tone: "border-rose-500/35 bg-rose-500/10",
  },
  {
    question: "Exceptional failure?",
    cheaperShape: "exceptions off hot success path; errors remain explicit",
    guard: "throw frequency, unwind, code size and ABI measured",
    tone: "border-fuchsia-500/35 bg-fuchsia-500/10",
  },
] as const;

export function OpcHotStatementDecisionMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="重复表达式昂贵运算多路控制流和异常路径四类热点语句决策图"
          className="grid gap-3 lg:grid-cols-4"
        >
          {statementChoices.map((row, index) => (
            <section
              key={row.question}
              className={`min-h-80 border p-4 ${row.tone}`}
            >
              <span className="text-xs text-secondary">
                decision 0{index + 1}
              </span>
              <strong className="mt-2 block text-sm text-primary">
                {row.question}
              </strong>
              <code className="mt-4 block break-words text-xs text-accent">
                {row.cheaperShape}
              </code>
              <p className="mb-0 mt-4 text-xs text-secondary">{row.guard}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        simplify expression/control flow 只能在 type、overflow、rounding、side
        effect 与 error semantics 相同的前提下成立；最终比较 optimized machine
        work，不按 source 行数评分。
      </figcaption>
    </figure>
  );
}
