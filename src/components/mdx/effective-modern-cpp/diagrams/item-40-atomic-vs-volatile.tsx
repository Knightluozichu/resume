const semanticsRows = [
  {
    type: "ordinary T",
    atomicity: "none across threads",
    ordering: "none without synchronization",
    optimization: "normal compiler freedom",
    use: "single-threaded / externally locked data",
  },
  {
    type: "std::atomic<T>",
    atomicity: "atomic operations",
    ordering: "selectable memory_order",
    optimization: "compiler honors synchronization",
    use: "concurrent shared state",
  },
  {
    type: "volatile T",
    atomicity: "not guaranteed",
    ordering: "no inter-thread happens-before",
    optimization: "observable accesses retained",
    use: "special / device memory",
  },
] as const;

export function EmcppAtomicVolatileSemanticsMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="普通类型 atomic 类型和 volatile 类型在原子性内存顺序编译器优化及用途上的语义矩阵"
          className="space-y-3"
        >
          {semanticsRows.map((item, index) => (
            <section
              key={item.type}
              className="grid gap-3 border border-cyan-500/30 bg-cyan-500/10 p-4 md:grid-cols-[0.8fr_1fr_1fr_1.1fr_1.1fr] md:items-center"
            >
              <strong className="text-sm text-primary">
                <span className="mr-2 text-xs text-secondary">
                  0{index + 1}
                </span>
                {item.type}
              </strong>
              <span className="text-xs text-secondary">{item.atomicity}</span>
              <code className="text-xs text-accent">{item.ordering}</code>
              <span className="text-xs text-secondary">
                {item.optimization}
              </span>
              <strong className="text-xs text-primary">{item.use}</strong>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        atomic 面向 C++ 并发内存模型；volatile
        面向访问本身具有外部副作用的特殊内存，两者不是强弱替代关系。
      </figcaption>
    </figure>
  );
}

const incrementSteps = [
  {
    phase: "Read",
    threadA: "loads 0",
    threadB: "loads 0",
    shared: "value remains 0",
  },
  {
    phase: "Compute",
    threadA: "computes 1",
    threadB: "computes 1",
    shared: "private results",
  },
  {
    phase: "Write A",
    threadA: "stores 1",
    threadB: "pending store",
    shared: "value becomes 1",
  },
  {
    phase: "Write B",
    threadA: "done",
    threadB: "stores 1",
    shared: "final value is 1, not 2",
  },
] as const;

export function EmcppVolatileLostUpdateFlowMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="两个线程对 volatile counter 执行非原子 read modify write 后发生丢更新和数据竞争的交错流程图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {incrementSteps.map((item, index) => (
            <section
              key={item.phase}
              className={`min-h-52 border p-4 ${index === 3 ? "border-rose-500/35 bg-rose-500/10" : "border-amber-500/35 bg-amber-500/10"}`}
            >
              <span className="text-xs text-secondary">0{index + 1}</span>
              <strong className="mt-3 block text-sm text-primary">
                {item.phase}
              </strong>
              <p className="mb-0 mt-3 text-xs text-secondary">
                A: {item.threadA}
              </p>
              <p className="mb-0 mt-2 text-xs text-secondary">
                B: {item.threadB}
              </p>
              <code className="mt-3 block text-xs text-accent">
                {item.shared}
              </code>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        volatile 迫使 reads/writes 发生，却不把三步 read-modify-write 合成一个
        atomic operation；并发冲突仍是 data race。
      </figcaption>
    </figure>
  );
}

const boundaryRows = [
  {
    target: "Thread-shared flag",
    compiler: "must respect atomic ordering",
    hardware: "uses atomic/coherence primitives",
    tool: "std::atomic + memory_order",
  },
  {
    target: "MMIO status register",
    compiler: "must emit each volatile access",
    hardware: "device defines read/write effects",
    tool: "platform-qualified volatile access",
  },
  {
    target: "DMA/device buffer",
    compiler: "volatile alone is insufficient",
    hardware: "cache/fence protocol is platform-specific",
    tool: "driver API + barriers/cache management",
  },
] as const;

export function EmcppMemoryAccessBoundaryMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="线程共享标志 MMIO 寄存器和 DMA 缓冲区在编译器硬件及正确工具上的访问边界图"
          className="space-y-3"
        >
          {boundaryRows.map((item, index) => (
            <section
              key={item.target}
              className="grid gap-3 border border-violet-500/30 bg-violet-500/10 p-4 md:grid-cols-[0.9fr_1.2fr_1.2fr_1fr] md:items-center"
            >
              <strong className="text-sm text-primary">
                <span className="mr-2 text-xs text-secondary">
                  0{index + 1}
                </span>
                {item.target}
              </strong>
              <span className="text-xs text-secondary">
                compiler: {item.compiler}
              </span>
              <code className="text-xs text-accent">
                hardware: {item.hardware}
              </code>
              <strong className="text-xs text-primary">{item.tool}</strong>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        C++ qualifiers 只覆盖语言层契约；设备缓存、总线顺序和 DMA
        一致性仍需目标平台提供的 driver/barrier protocol。
      </figcaption>
    </figure>
  );
}
