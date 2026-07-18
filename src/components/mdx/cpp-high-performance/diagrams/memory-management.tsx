const virtualMemoryStates = [
  {
    state: "Reserved address",
    mapping: "virtual range exists",
    cost: "physical pages may be absent",
  },
  {
    state: "First touch",
    mapping: "fault + zero/map page",
    cost: "latency appears on access",
  },
  {
    state: "Resident working set",
    mapping: "active pages in RAM + TLB",
    cost: "cache and translation pressure",
  },
  {
    state: "Thrashing",
    mapping: "evict then fault again",
    cost: "page movement dominates work",
  },
] as const;

export function ChpVirtualMemoryPressureMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="虚拟地址从预留首次触页驻留工作集到页面抖动的内存压力状态图"
          className="grid gap-4 md:grid-cols-2"
        >
          {virtualMemoryStates.map((item, index) => (
            <section
              key={item.state}
              className="min-h-52 border border-cyan-500/30 bg-cyan-500/10 p-4"
            >
              <span className="text-xs text-secondary">state 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">
                {item.state}
              </strong>
              <code className="mt-4 block break-words text-xs text-accent">
                {item.mapping}
              </code>
              <p className="mb-0 mt-5 text-xs text-primary">{item.cost}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        virtual range、resident page和warm
        data是三个状态；把成本放在哪一步取决于touch与mapping策略。
      </figcaption>
    </figure>
  );
}

const storageLifetimeLayers = [
  {
    layer: "Raw storage",
    operation: "operator new / arena allocate",
    invariant: "enough bytes + correct alignment",
  },
  {
    layer: "Live object",
    operation: "constructor / placement new",
    invariant: "lifetime begins only on success",
  },
  {
    layer: "Ownership",
    operation: "value / unique / shared / observer",
    invariant: "exactly one valid cleanup contract",
  },
  {
    layer: "Release",
    operation: "destructor then deallocation",
    invariant: "match original storage provider",
  },
] as const;

export function ChpStorageLifetimeOwnershipMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="从原始存储对象构造所有权到析构释放的内存与生命周期分层图"
          className="space-y-3"
        >
          {storageLifetimeLayers.map((item, index) => (
            <section
              key={item.layer}
              className="grid min-h-36 gap-3 border border-violet-500/30 bg-violet-500/10 p-4 md:grid-cols-[0.7fr_1.2fr_1.6fr] md:items-center"
            >
              <strong className="text-sm text-primary">
                <span className="mr-2 text-xs text-secondary">
                  0{index + 1}
                </span>
                {item.layer}
              </strong>
              <code className="break-words text-xs text-accent">
                {item.operation}
              </code>
              <span className="text-xs text-secondary">{item.invariant}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        storage存在不等于object存活；placement
        new、RAII和deallocation分别负责不同层，异常路径也必须维持顺序。
      </figcaption>
    </figure>
  );
}

const allocationStrategies = [
  {
    strategy: "Inline small buffer",
    pattern: "small values dominate",
    release: "object destructor",
    tradeoff: "larger fixed object footprint",
  },
  {
    strategy: "Arena / bump",
    pattern: "many objects share one phase",
    release: "destruct records + bulk reset",
    tradeoff: "retains peak until reset",
  },
  {
    strategy: "Fixed-size pool",
    pattern: "same-size allocate/free repeatedly",
    release: "return slot to free list",
    tradeoff: "size classes and concurrency",
  },
  {
    strategy: "General allocator",
    pattern: "mixed size, lifetime and threads",
    release: "arbitrary individual free",
    tradeoff: "metadata and fragmentation policy",
  },
] as const;

export function ChpSmallObjectArenaMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="小对象内联arena固定池和通用分配器按分配模式回收方式与取舍的策略图"
          className="grid gap-4 lg:grid-cols-4"
        >
          {allocationStrategies.map((item, index) => (
            <section
              key={item.strategy}
              className="min-h-64 border border-amber-500/35 bg-amber-500/10 p-4"
            >
              <span className="text-xs text-secondary">path 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">
                {item.strategy}
              </strong>
              <code className="mt-4 block break-words text-xs text-accent">
                {item.pattern}
              </code>
              <p className="mb-0 mt-4 text-xs text-primary">{item.release}</p>
              <p className="mb-0 mt-3 text-xs text-secondary">
                trade-off: {item.tradeoff}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        分配策略由size与lifetime分布决定：inline、phase、slot
        reuse和任意free分别优化不同模式。
      </figcaption>
    </figure>
  );
}
