const raceSteps = [
  {
    step: "Read flag",
    threadA: "false",
    threadB: "false",
    risk: "both enter compute",
  },
  {
    step: "Compute",
    threadA: "compute roots A",
    threadB: "compute roots B",
    risk: "duplicated work",
  },
  {
    step: "Write cache",
    threadA: "assign rootValues",
    threadB: "assign rootValues",
    risk: "data race / corruption",
  },
  {
    step: "Publish valid",
    threadA: "valid = true",
    threadB: "valid = true",
    risk: "no ordering for readers",
  },
] as const;

export function EmcppConstCacheRaceTimeline() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="两个线程同时读取 cache flag 计算写缓存和发布 valid 的竞态时间线图"
          className="space-y-3"
        >
          {raceSteps.map((item, index) => (
            <section
              key={item.step}
              className="grid gap-3 border border-rose-500/30 bg-rose-500/10 p-4 md:grid-cols-[0.7fr_1fr_1fr_1.2fr] md:items-center"
            >
              <strong className="text-sm text-primary">
                <span className="mr-2 text-xs text-secondary">
                  0{index + 1}
                </span>
                {item.step}
              </strong>
              <code className="text-xs text-accent">A: {item.threadA}</code>
              <code className="text-xs text-accent">B: {item.threadB}</code>
              <span className="text-xs text-secondary">{item.risk}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        const call 的两条时间线仍共享 mutable storage；没有 happens-before
        就不是“只重复计算”。
      </figcaption>
    </figure>
  );
}

const decisions = [
  {
    state: "Independent counter",
    mechanism: "atomic",
    reason: "one location, no compound invariant",
    tone: "border-emerald-500/35 bg-emerald-500/10",
  },
  {
    state: "valid + cached value",
    mechanism: "mutex",
    reason: "multi-field atomic publication",
    tone: "border-sky-500/35 bg-sky-500/10",
  },
  {
    state: "immutable snapshot pointer",
    mechanism: "atomic + lifetime protocol",
    reason: "advanced lock-free publication",
    tone: "border-amber-500/35 bg-amber-500/10",
  },
] as const;

export function EmcppAtomicMutexDecisionMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="独立计数复合缓存和不可变快照三种共享状态选择 atomic mutex 或完整发布协议的决策图"
          className="grid gap-3 lg:grid-cols-3"
        >
          {decisions.map((item, index) => (
            <section
              key={item.state}
              className={`min-h-48 border p-4 ${item.tone}`}
            >
              <span className="text-xs text-secondary">0{index + 1}</span>
              <strong className="mt-3 block text-sm text-primary">
                {item.state}
              </strong>
              <code className="mt-3 block text-xs text-accent">
                {item.mechanism}
              </code>
              <p className="mb-0 mt-3 text-xs leading-5 text-secondary">
                {item.reason}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        选择同步原语的单位是 invariant，不是字段数量表面上能否声明 atomic。
      </figcaption>
    </figure>
  );
}

const layers = [
  ["Abstract value", "polynomial coefficients", "const call must not change"],
  ["Derived state", "roots cache + valid flag", "mutable but synchronized"],
  ["Sync state", "mutex / atomic counter", "mutable implementation detail"],
  [
    "Concurrent contract",
    "const + const calls",
    "race-free and invariant-preserving",
  ],
] as const;

export function EmcppLogicalConstSynchronizationMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="多项式抽象值派生缓存同步状态和并发契约四层逻辑 const 模型图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {layers.map(([label, state, rule], index) => (
            <section
              key={label}
              className="min-h-48 border border-violet-500/30 bg-violet-500/10 p-4"
            >
              <span className="text-xs text-secondary">0{index + 1}</span>
              <strong className="mt-3 block text-sm text-primary">
                {label}
              </strong>
              <code className="mt-3 block text-xs leading-5 text-accent">
                {state}
              </code>
              <p className="mb-0 mt-3 text-xs leading-5 text-secondary">
                {rule}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        logical const 允许改变派生与同步状态，但要求抽象值稳定，并对共享 mutable
        层建立线程安全协议。
      </figcaption>
    </figure>
  );
}
