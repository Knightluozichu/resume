const mappingStages = [
  {
    stage: "Virtual address",
    data: "process VA: page + offset",
    owner: "current address space",
    failure: "not-present / permission fault",
  },
  {
    stage: "Translation",
    data: "TLB lookup, page-table walk",
    owner: "MMU + OS tables",
    failure: "page fault enters kernel",
  },
  {
    stage: "Backing",
    data: "physical frame / file / zero page",
    owner: "memory manager",
    failure: "allocate, load, or reject",
  },
  {
    stage: "Cache access",
    data: "cache line + byte offset",
    owner: "CPU memory hierarchy",
    failure: "miss fetches lower level",
  },
] as const;

export function CpuEyeVirtualAddressMappingMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="进程虚拟地址经TLB页表和缺页处理映射到物理页或文件后进入CPU缓存层级的地址映射图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {mappingStages.map((item, index) => (
            <section
              key={item.stage}
              className="min-h-56 border border-cyan-500/30 bg-cyan-500/10 p-4"
            >
              <span className="text-xs text-secondary">0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">
                {item.stage}
              </strong>
              <code className="mt-3 block break-words text-xs text-accent">
                {item.data}
              </code>
              <p className="mb-0 mt-3 text-xs text-primary">
                owner: {item.owner}
              </p>
              <p className="mb-0 mt-3 text-xs text-secondary">{item.failure}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        每个进程只直接使用自己的虚拟地址；相同数值可映射到不同
        frame，共享映射也可让不同地址指向同一 backing。
      </figcaption>
    </figure>
  );
}

const boundaryRows = [
  {
    topic: "volatile access",
    source: "read status register",
    machine: "observable load/store retained",
    boundary: "not atomic or thread synchronization",
  },
  {
    topic: "constant value",
    source: "const / constexpr input",
    machine: "immediate, folded value, or storage",
    boundary: "const does not mean compile-time",
  },
  {
    topic: "system call",
    source: "read(fd, buffer, size)",
    machine: "wrapper -> syscall ABI -> kernel",
    boundary: "validation and error return",
  },
  {
    topic: "endianness",
    source: "0x12345678 as bytes",
    machine: "78 56 34 12 or 12 34 56 78",
    boundary: "byte order, not bit order",
  },
] as const;

export function CpuEyeBoundarySemanticsMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="volatile常量系统调用与大小端从源码语义到机器动作及适用边界的对照图"
          className="space-y-3"
        >
          {boundaryRows.map((item, index) => (
            <section
              key={item.topic}
              className="grid min-h-36 gap-3 border border-amber-500/35 bg-amber-500/10 p-4 md:grid-cols-[0.7fr_1fr_1.2fr_1.2fr] md:items-center"
            >
              <strong className="text-sm text-primary">
                <span className="mr-2 text-xs text-secondary">
                  0{index + 1}
                </span>
                {item.topic}
              </strong>
              <code className="break-words text-xs text-accent">
                {item.source}
              </code>
              <span className="text-xs text-primary">{item.machine}</span>
              <span className="text-xs text-secondary">{item.boundary}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        这些特性都位于边界处：必须写清它保证什么、没有保证什么，以及跨平台交换时由谁转换。
      </figcaption>
    </figure>
  );
}

const contextSteps = [
  {
    step: "Running thread A",
    state: "PC, SP, registers, address space",
    lock: "owns mutex / modifies shared state",
  },
  {
    step: "Contention",
    state: "thread B atomic attempt fails",
    lock: "spin briefly or enter wait path",
  },
  {
    step: "Scheduler boundary",
    state: "save A, restore runnable thread",
    lock: "blocked B no longer consumes CPU",
  },
  {
    step: "Unlock + wake",
    state: "release publishes prior writes",
    lock: "one waiter becomes runnable",
  },
  {
    step: "Thread B resumes",
    state: "acquire observes protected state",
    lock: "critical section has one owner",
  },
] as const;

export function CpuEyeContextLockProtocolMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="线程上下文从运行到锁竞争阻塞调度释放唤醒和重新获得锁的状态协议图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5"
        >
          {contextSteps.map((item, index) => (
            <section
              key={item.step}
              className="min-h-52 border border-violet-500/30 bg-violet-500/10 p-4"
            >
              <span className="text-xs text-secondary">0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">
                {item.step}
              </strong>
              <code className="mt-3 block break-words text-xs text-accent">
                {item.state}
              </code>
              <p className="mb-0 mt-3 text-xs text-secondary">{item.lock}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        mutex 将 mutual exclusion、acquire/release ordering
        和等待唤醒组合起来；竞争时才可能跨入 scheduler 路径。
      </figcaption>
    </figure>
  );
}
