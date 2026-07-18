const lifecycleStages = [
  {
    stage: "Acquire raw storage",
    operation: "allocator/resource/operator new",
    obligation: "size, alignment, failure and owner recorded",
  },
  {
    stage: "Begin object lifetime",
    operation: "new-expression or construct_at in valid storage",
    obligation: "constructor success; rollback storage on throw",
  },
  {
    stage: "Use / transfer ownership",
    operation: "typed access under lifetime and alias rules",
    obligation: "one destroy path, no use-after-free/reuse",
  },
  {
    stage: "Destroy + release",
    operation: "delete-expression or destroy_at + deallocate",
    obligation: "matching API, exact once, alignment preserved",
  },
] as const;

export function OpcDynamicVariableLifecycleMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="取得原始内存开始对象生命周期使用转移所有权和销毁释放四阶段动态变量生命周期图"
          className="grid gap-3 lg:grid-cols-4"
        >
          {lifecycleStages.map((row, index) => (
            <section
              key={row.stage}
              className="relative min-h-72 border border-cyan-500/35 bg-cyan-500/10 p-4"
            >
              <span className="text-xs text-secondary">stage 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">
                {row.stage}
              </strong>
              <code className="mt-4 block break-words text-xs text-accent">
                {row.operation}
              </code>
              <p className="mb-0 mt-4 text-xs text-secondary">
                prove: {row.obligation}
              </p>
              {index < lifecycleStages.length - 1 ? (
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
        object lifetime 与 raw storage 是两条契约；普通 delete 同时
        destroy+release，placement construction
        才需要显式分开，任何优化都必须保持匹配和 exactly-once。
      </figcaption>
    </figure>
  );
}

const managerChoices = [
  {
    manager: "General allocator",
    fit: "mixed sizes/lifetimes/threads",
    gain: "mature correctness and broad behavior",
    risk: "metadata, synchronization, fragmentation under a hot pattern",
  },
  {
    manager: "Class-specific manager",
    fit: "one measured class has stable allocation pattern",
    gain: "known size/alignment and local reuse",
    risk: "operator new/delete completeness and inheritance",
  },
  {
    manager: "Fixed-size block pool",
    fit: "many same-size objects with independent release",
    gain: "O(1)-like free-list acquire/release and compact metadata",
    risk: "block alignment, stale pointers, capacity and fragmentation",
  },
  {
    manager: "Block arena",
    fit: "objects share phase/request lifetime",
    gain: "bump allocation and bulk teardown",
    risk: "destructors, exceptional cleanup and retained peak memory",
  },
] as const;

export function OpcMemoryManagerDecisionMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="通用分配器类专用管理器固定块池和块区域四种内存管理器适配收益风险图"
          className="grid gap-3 sm:grid-cols-2"
        >
          {managerChoices.map((row, index) => (
            <section
              key={row.manager}
              className="min-h-72 border border-violet-500/30 bg-violet-500/10 p-4"
            >
              <span className="text-xs text-secondary">
                choice 0{index + 1}
              </span>
              <strong className="mt-2 block text-sm text-primary">
                {row.manager}
              </strong>
              <p className="mb-0 mt-4 text-xs text-primary">{row.fit}</p>
              <code className="mt-4 block break-words text-xs text-accent">
                {row.gain}
              </code>
              <p className="mb-0 mt-4 text-xs text-secondary">{row.risk}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        high-performance memory manager 是 pattern-specific；只有
        size/lifetime/thread model 稳定且 allocation 仍是 hotspot
        时，specialized manager 才可能覆盖其 correctness/maintenance 成本。
      </figcaption>
    </figure>
  );
}

const allocatorLayers = [
  {
    layer: "Resource / manager",
    role: "owns blocks, alignment, synchronization and lifetime",
    test: "allocate/deallocate, exhaustion and teardown",
  },
  {
    layer: "C++11 allocator adapter",
    role: "value_type + allocate/deallocate + equality/traits",
    test: "rebind via allocator_traits and container operations",
  },
  {
    layer: "Legacy C++98 allocator",
    role: "older required typedef/rebind/construct boilerplate",
    test: "only when legacy toolchain/API contract requires it",
  },
  {
    layer: "Container/string workload",
    role: "growth, move/swap propagation and element lifetime",
    test: "allocations, capacity, RSS, exceptions and equality",
  },
] as const;

export function OpcAllocatorIntegrationMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="资源管理器C++11分配器适配器C++98旧分配器和容器字符串工作负载四层集成图"
          className="space-y-3"
        >
          {allocatorLayers.map((row, index) => (
            <section
              key={row.layer}
              className="grid min-h-36 gap-3 border border-amber-500/35 bg-amber-500/10 p-4 lg:grid-cols-[0.75fr_1.35fr_1.35fr] lg:items-center"
            >
              <div>
                <span className="text-xs text-secondary">
                  layer 0{index + 1}
                </span>
                <strong className="mt-2 block text-sm text-primary">
                  {row.layer}
                </strong>
              </div>
              <code className="break-words text-xs text-accent">
                {row.role}
              </code>
              <span className="text-xs text-secondary">{row.test}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        custom allocator 只是 container 与 manager 之间的协议适配；性能来自底层
        pattern，正确性还依赖
        equality/propagation/lifetime/alignment，不能只实现 allocate
        后就投入使用。
      </figcaption>
    </figure>
  );
}
