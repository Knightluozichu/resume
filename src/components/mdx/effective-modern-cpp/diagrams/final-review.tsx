const reviewChains = [
  [
    "Type boundary",
    "deduction / auto / decltype",
    "prove exact type and overload",
  ],
  [
    "Object contract",
    "braces / noexcept / special members",
    "prove valid state and generated operations",
  ],
  [
    "Ownership",
    "unique/shared/weak/Pimpl",
    "prove owner and destruction point",
  ],
  [
    "Value category",
    "move/forward/collapse",
    "prove copy/move and candidate selection",
  ],
  [
    "Callable state",
    "capture/init capture/generic lambda",
    "prove closure dependency lifetime",
  ],
  [
    "Execution",
    "task/thread/future/atomic",
    "prove outcome and happens-before",
  ],
] as const;

export function EmcppCrossChapterReviewFlowMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="从类型边界对象契约 ownership value category callable state 到并发执行的全书复习证据链"
          className="space-y-3"
        >
          {reviewChains.map(([boundary, tools, proof], index) => (
            <section
              key={boundary}
              className="grid gap-3 border border-cyan-500/30 bg-cyan-500/10 p-4 md:grid-cols-[0.8fr_1.2fr_1.4fr] md:items-center"
            >
              <strong className="text-sm text-primary">
                <span className="mr-2 text-xs text-secondary">
                  0{index + 1}
                </span>
                {boundary}
              </strong>
              <code className="text-xs text-accent">{tools}</code>
              <span className="text-xs text-secondary">→ {proof}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        现代 C++ review
        不是按关键词打勾，而是沿对象从调用边界到异步销毁点证明每层 contract。
      </figcaption>
    </figure>
  );
}

const scenarioRows = [
  {
    symptom: "copy is unexpectedly selected",
    inspect: "deduction + named lvalue + noexcept",
    items: "1-4, 14, 23-30",
  },
  {
    symptom: "callback reads destroyed state",
    inspect: "capture + owner + future/thread destruction",
    items: "18-22, 31-39",
  },
  {
    symptom: "optimization changes behavior",
    inspect: "data race vs MMIO + memory order",
    items: "16, 35-40",
  },
  {
    symptom: "faster API allocates more",
    inspect: "pass-by-value/emplace full path",
    items: "29, 41-42",
  },
] as const;

export function EmcppFailureToItemsMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="复制异常悬空回调优化变化和额外分配四类症状映射到检查机制与 Items 的诊断图"
          className="space-y-3"
        >
          {scenarioRows.map((item, index) => (
            <section
              key={item.symptom}
              className="grid gap-3 border border-violet-500/30 bg-violet-500/10 p-4 md:grid-cols-[1fr_1.4fr_0.8fr] md:items-center"
            >
              <strong className="text-sm text-primary">
                <span className="mr-2 text-xs text-secondary">
                  0{index + 1}
                </span>
                {item.symptom}
              </strong>
              <span className="text-xs text-secondary">
                inspect: {item.inspect}
              </span>
              <code className="text-xs text-accent">Items {item.items}</code>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        问题驱动复习从可观察 symptom
        进入，但结论必须回到类型、ownership、lifetime 和 ordering 证据。
      </figcaption>
    </figure>
  );
}

const migrationSteps = [
  ["Inventory", "raw resources, macros, nulls, thread handles"],
  ["Constrain", "types, enum class, deleted/override, explicit ownership"],
  ["Transfer", "move/noexcept, init capture, task outcomes"],
  ["Synchronize", "RAII threads, futures, atomic memory order"],
  ["Optimize", "measure pass-by-value and emplacement conditions"],
  ["Regress", "negative compile tests, failure injection, sanitizers"],
] as const;

export function EmcppMigrationEvidenceMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="旧 C++ 模块从盘点约束转移同步优化到回归验证的迁移流程图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {migrationSteps.map(([step, detail], index) => (
            <section
              key={step}
              className="min-h-36 border border-amber-500/35 bg-amber-500/10 p-4"
            >
              <span className="text-xs text-secondary">0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">
                {step}
              </strong>
              <p className="mb-0 mt-2 text-xs text-secondary">{detail}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        迁移先让 ownership 和 contracts 正确，再引入 move/concurrency，最后才按
        measurement 做成本微调。
      </figcaption>
    </figure>
  );
}
