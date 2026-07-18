const memoryLevels = [
  {
    level: "Registers",
    scope: "current instructions",
    unit: "machine words",
    consequence: "few, compiler allocated, fastest visible state",
    tone: "border-emerald-500/35 bg-emerald-500/10",
  },
  {
    level: "L1 / L2 cache",
    scope: "current core",
    unit: "cache lines",
    consequence: "locality decides whether data arrives on time",
    tone: "border-cyan-500/35 bg-cyan-500/10",
  },
  {
    level: "Shared cache",
    scope: "core cluster / socket",
    unit: "cache lines",
    consequence: "capacity and coherence compete across streams",
    tone: "border-violet-500/35 bg-violet-500/10",
  },
  {
    level: "DRAM",
    scope: "process working set",
    unit: "bursts and pages",
    consequence: "latency is hidden only with locality or overlap",
    tone: "border-amber-500/35 bg-amber-500/10",
  },
] as const;

export function OpcMemoryHierarchyAccessMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="寄存器私有缓存共享缓存和内存的访问范围传输粒度与优化后果层级图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {memoryLevels.map((row, index) => (
            <section
              key={row.level}
              className={`min-h-72 border p-4 ${row.tone}`}
            >
              <span className="text-xs text-secondary">level 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">
                {row.level}
              </strong>
              <p className="mb-0 mt-4 text-xs text-primary">{row.scope}</p>
              <code className="mt-4 block break-words text-xs text-accent">
                transfer: {row.unit}
              </code>
              <p className="mb-0 mt-4 text-xs text-secondary">
                {row.consequence}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        C++ 看起来按对象和字节访问内存，硬件却以 cache line、burst 和 page
        搬运；连续、复用和 working-set 大小决定一次 load 落在哪一级。
      </figcaption>
    </figure>
  );
}

const pipelineStages = [
  {
    stage: "Fetch + decode",
    question: "which instructions should enter next?",
    hazard: "front-end bandwidth and instruction-cache miss",
  },
  {
    stage: "Predict",
    question: "which branch path is likely?",
    hazard: "unpredictable decision discards speculative work",
  },
  {
    stage: "Schedule",
    question: "which operands are ready now?",
    hazard: "dependency chain limits instruction-level parallelism",
  },
  {
    stage: "Execute + retire",
    question: "what can finish while preserving visible order?",
    hazard: "slow load, divide or resource contention",
  },
] as const;

export function OpcInstructionPipelineMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="取指解码分支预测乱序调度执行提交的处理器流水线与性能风险图"
          className="grid gap-3 lg:grid-cols-4"
        >
          {pipelineStages.map((row, index) => (
            <section
              key={row.stage}
              className="relative min-h-64 border border-fuchsia-500/30 bg-fuchsia-500/10 p-4"
            >
              <span className="text-xs text-secondary">stage 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">
                {row.stage}
              </strong>
              <p className="mb-0 mt-4 text-xs text-primary">{row.question}</p>
              <p className="mb-0 mt-4 border-t border-border pt-4 text-xs text-secondary">
                {row.hazard}
              </p>
              {index < pipelineStages.length - 1 ? (
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
        statements are not executed in order：处理器可以提前调度 ready work， 但
        dependency chain、分支误判和慢 load 会使昂贵阶段暴露出来。
      </figcaption>
    </figure>
  );
}

const boundaryCases = [
  {
    boundary: "Function / inlined call",
    transition: "same thread, user mode",
    hiddenCost: "calling convention or none after inlining",
    optimization: "keep semantics visible; do not fear all calls",
  },
  {
    boundary: "Thread / task",
    transition: "another execution stream",
    hiddenCost: "queueing, synchronization, coherence, scheduling",
    optimization: "batch work and minimize shared writable state",
  },
  {
    boundary: "System call",
    transition: "user mode to kernel service",
    hiddenCost: "boundary crossing, validation, scheduler and device",
    optimization: "buffer, batch and use asynchronous APIs where fit",
  },
  {
    boundary: "Storage / network",
    transition: "external device or peer",
    hiddenCost: "orders-of-magnitude latency and variable tails",
    optimization: "amortize round trips and overlap independent work",
  },
] as const;

export function OpcExecutionBoundaryCostMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="普通函数任务线程系统调用外部设备四类执行边界隐藏成本和批处理策略比较图"
          className="space-y-3"
        >
          {boundaryCases.map((row, index) => (
            <section
              key={row.boundary}
              className="grid min-h-40 gap-3 border border-rose-500/30 bg-rose-500/10 p-4 lg:grid-cols-[0.75fr_1fr_1.35fr_1.25fr] lg:items-center"
            >
              <div>
                <span className="text-xs text-secondary">
                  boundary 0{index + 1}
                </span>
                <strong className="mt-2 block text-sm text-primary">
                  {row.boundary}
                </strong>
              </div>
              <code className="break-words text-xs text-accent">
                {row.transition}
              </code>
              <span className="text-xs text-primary">{row.hiddenCost}</span>
              <span className="text-xs text-secondary">{row.optimization}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        multiple streams of program execution 能隐藏等待，也会引入协调成本；
        calling into the operating system is expensive
        时，批处理通常先于增加线程。
      </figcaption>
    </figure>
  );
}
