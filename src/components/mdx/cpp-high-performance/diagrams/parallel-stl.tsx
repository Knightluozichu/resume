const partitionStages = [
  {
    stage: "Partition",
    work: "split n by grain size",
    risk: "too many tasks or too little parallelism",
  },
  {
    stage: "Execute",
    work: "independent chunk transforms",
    risk: "callable state or bandwidth saturation",
  },
  {
    stage: "Balance",
    work: "static chunks or work stealing",
    risk: "tail worker dominates completion",
  },
  {
    stage: "Merge",
    work: "join outputs / reduce partials",
    risk: "serial merge erases speedup",
  },
] as const;

export function ChpDivideConquerGrainMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="并行算法从分块执行平衡到合并的divide and conquer及grain size图"
          className="grid gap-4 lg:grid-cols-4"
        >
          {partitionStages.map((item, index) => (
            <section
              key={item.stage}
              className="min-h-60 border border-cyan-500/30 bg-cyan-500/10 p-4"
            >
              <span className="text-xs text-secondary">stage 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">
                {item.stage}
              </strong>
              <code className="mt-4 block break-words text-xs text-accent">
                {item.work}
              </code>
              <p className="mb-0 mt-5 text-xs text-secondary">
                risk: {item.risk}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        并行收益由整条路径决定：task足够粗、chunks独立、负载平衡且merge不重新串行化。
      </figcaption>
    </figure>
  );
}

const copyIfStages = [
  {
    phase: "Flags + local count",
    state: "one predicate result per input",
    ownership: "each chunk writes disjoint flags",
  },
  {
    phase: "Exclusive prefix",
    state: "output base per chunk",
    ownership: "ordered, non-overlapping intervals",
  },
  {
    phase: "Stable scatter",
    state: "copy matches in local input order",
    ownership: "no synchronized per-item index",
  },
] as const;

export function ChpParallelCopyIfPipelineMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="稳定parallel copy if从标记计数exclusive prefix到独占区间scatter的管线图"
          className="grid gap-4 lg:grid-cols-3"
        >
          {copyIfStages.map((item, index) => (
            <section
              key={item.phase}
              className="min-h-64 border border-violet-500/30 bg-violet-500/10 p-4"
            >
              <span className="text-xs text-secondary">phase 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">
                {item.phase}
              </strong>
              <code className="mt-4 block break-words text-xs text-accent">
                {item.state}
              </code>
              <p className="mb-0 mt-5 text-xs text-primary">{item.ownership}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        prefix sum把不确定输出数量转换为每chunk确定区间，兼顾唯一write
        position与stable order。
      </figcaption>
    </figure>
  );
}

const executionTargets = [
  {
    target: "seq",
    permission: "sequenced calls",
    fit: "small or order-sensitive work",
    boundary: "serial baseline",
  },
  {
    target: "par",
    permission: "multiple worker threads",
    fit: "independent, coarse CPU work",
    boundary: "thread-safe callable",
  },
  {
    target: "par_unseq",
    permission: "parallel + unsequenced lanes",
    fit: "pure vectorizable element work",
    boundary: "no blocking/vector-unsafe operation",
  },
  {
    target: "GPU / OpenCL",
    permission: "device kernels + queues",
    fit: "resident, regular, arithmetic-heavy data",
    boundary: "transfer + launch + precision",
  },
] as const;

export function ChpExecutionPolicyGpuMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="seq par par unseq和GPU OpenCL按执行许可适用工作与边界的选择图"
          className="space-y-3"
        >
          {executionTargets.map((item, index) => (
            <section
              key={item.target}
              className="grid min-h-36 gap-3 border border-amber-500/35 bg-amber-500/10 p-4 md:grid-cols-[0.55fr_1.2fr_1.4fr_1.4fr] md:items-center"
            >
              <strong className="text-sm text-primary">
                <span className="mr-2 text-xs text-secondary">
                  0{index + 1}
                </span>
                {item.target}
              </strong>
              <code className="break-words text-xs text-accent">
                {item.permission}
              </code>
              <span className="text-xs text-primary">{item.fit}</span>
              <span className="text-xs text-secondary">{item.boundary}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        execution
        policy和device只是执行许可；正确callable、数据位置、粒度与end-to-end开销决定实际收益。
      </figcaption>
    </figure>
  );
}
