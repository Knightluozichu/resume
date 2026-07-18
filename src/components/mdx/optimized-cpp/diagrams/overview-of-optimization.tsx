const strategyRows = [
  {
    lever: "Compiler",
    action: "newer optimizer, release flags, LTO/PGO where valid",
    multiplier: "whole-program code quality",
    risk: "undefined behavior and build drift become visible",
  },
  {
    lever: "Algorithm",
    action: "replace growth class or exploit input properties",
    multiplier: "orders of magnitude at scale",
    risk: "wrong distribution/complexity assumption",
  },
  {
    lever: "Library",
    action: "reuse tuned primitives and clearer abstractions",
    multiplier: "vectorization and mature implementation",
    risk: "hidden allocation or unsuitable contract",
  },
  {
    lever: "Allocation and copying",
    action: "reuse storage, move, borrow, batch",
    multiplier: "less allocator and memory traffic",
    risk: "dangling views or muddled ownership",
  },
  {
    lever: "Computation",
    action: "precompute, cache, skip, evaluate less often",
    multiplier: "work removed is faster than work tuned",
    risk: "stale cache and extra memory",
  },
  {
    lever: "Data structure",
    action: "match access pattern and locality",
    multiplier: "fewer probes and cache misses",
    risk: "benchmark ignores mutation workload",
  },
  {
    lever: "Concurrency",
    action: "parallelize independent, sufficiently large work",
    multiplier: "use available cores and overlap latency",
    risk: "contention, coordination and nondeterminism",
  },
  {
    lever: "Memory management",
    action: "arenas, fixed blocks, custom allocation policy",
    multiplier: "predictable hot-path allocation",
    risk: "fragmentation, lifetime and thread-safety policy",
  },
] as const;

export function OpcOptimizationStrategyPortfolioMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="编译器算法库分配复制计算数据结构并发和内存管理八类C++优化策略组合图"
          className="space-y-3"
        >
          {strategyRows.map((row, index) => (
            <section
              key={row.lever}
              className="grid min-h-40 gap-3 border border-cyan-500/30 bg-cyan-500/10 p-4 lg:grid-cols-[0.7fr_1.35fr_1.2fr_1.25fr] lg:items-center"
            >
              <div>
                <span className="text-xs text-secondary">
                  lever 0{index + 1}
                </span>
                <strong className="mt-2 block text-sm text-primary">
                  {row.lever}
                </strong>
              </div>
              <code className="break-words text-xs text-accent">
                {row.action}
              </code>
              <span className="text-xs text-primary">{row.multiplier}</span>
              <span className="text-xs text-secondary">{row.risk}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        优化不是只抠一条指令；先找能移除最多 work/traffic 的 lever，再为该 lever
        建立 correctness、measurement 和 rollback 证据。
      </figcaption>
    </figure>
  );
}

const scaleRows = [
  {
    scope: "One operation",
    count: "1 ns × 1",
    total: "1 ns",
    decision: "below user-visible scale",
  },
  {
    scope: "Inner loop",
    count: "1 ns × 10^8",
    total: "100 ms",
    decision: "may dominate a frame/request batch",
  },
  {
    scope: "Fleet workload",
    count: "1 ns × 10^12/day",
    total: "1,000 CPU-seconds/day",
    decision: "capacity and energy become material",
  },
  {
    scope: "Cold path",
    count: "1 ms × 1/day",
    total: "1 ms/day",
    decision: "large local saving, negligible system value",
  },
] as const;

export function OpcOptimizationScaleMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="单次纳秒内层循环大规模服务和冷路径的单次节省调用次数累计收益比较图"
          className="grid gap-3 sm:grid-cols-2"
        >
          {scaleRows.map((row, index) => (
            <section
              key={row.scope}
              className="min-h-56 border border-violet-500/30 bg-violet-500/10 p-4"
            >
              <span className="text-xs text-secondary">case 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">
                {row.scope}
              </strong>
              <code className="mt-4 block break-words text-xs text-accent">
                {row.count}
              </code>
              <p className="mb-0 mt-4 text-xs text-primary">{row.total}</p>
              <p className="mb-0 mt-3 text-xs text-secondary">{row.decision}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        “A nanosecond here, a nanosecond there” 的价值由 execution count
        放大；同样必须用低频率折损冷路径上的毫秒级局部改进。
      </figcaption>
    </figure>
  );
}

const developmentGates = [
  {
    gate: "Correct contract",
    question: "what behavior and constraints must remain?",
    artifact: "tests + workload definition",
    reject: "optimization changes results or ownership",
  },
  {
    gate: "Material goal",
    question: "which user/capacity metric must improve?",
    artifact: "latency/throughput/memory target",
    reject: "no measurable product/system effect",
  },
  {
    gate: "Highest-leverage strategy",
    question: "can we remove work before tuning work?",
    artifact: "strategy comparison and cost model",
    reject: "micro-tuning while algorithm dominates",
  },
  {
    gate: "Repeatable result",
    question: "does the improvement survive validation?",
    artifact: "A/B data + regression guard",
    reject: "noise, shifted bottleneck or new tail risk",
  },
] as const;

export function OpcOptimizationDevelopmentGateMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="正确契约目标价值高杠杆策略和可重复结果四道软件开发优化验收门图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {developmentGates.map((row, index) => (
            <section
              key={row.gate}
              className="min-h-72 border border-amber-500/35 bg-amber-500/10 p-4"
            >
              <span className="text-xs text-secondary">gate 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">
                {row.gate}
              </strong>
              <p className="mb-0 mt-4 text-xs text-primary">{row.question}</p>
              <code className="mt-4 block break-words text-xs text-accent">
                {row.artifact}
              </code>
              <p className="mb-0 mt-3 text-xs text-secondary">{row.reject}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        optimization 属于 development
        lifecycle：正确、目标、策略、验证四道门缺一不可，
        不是项目结束后的神秘“调优阶段”。
      </figcaption>
    </figure>
  );
}
