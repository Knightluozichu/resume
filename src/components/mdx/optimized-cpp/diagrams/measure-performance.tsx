const amdahlCases = [
  {
    optimized: "10% hot region",
    localSpeedup: "10x",
    total: "1 / (0.90 + 0.10 / 10) = 1.10x",
    lesson: "spectacular local result, small system result",
  },
  {
    optimized: "50% hot region",
    localSpeedup: "4x",
    total: "1 / (0.50 + 0.50 / 4) = 1.60x",
    lesson: "remaining half becomes the limit",
  },
  {
    optimized: "90% hot region",
    localSpeedup: "2x",
    total: "1 / (0.10 + 0.90 / 2) = 1.82x",
    lesson: "broad coverage can beat extreme micro-speedup",
  },
  {
    optimized: "90% hot region",
    localSpeedup: "infinite",
    total: "1 / (0.10 + 0) = 10x",
    lesson: "serial/unoptimized fraction is a hard ceiling",
  },
] as const;

export function OpcAmdahlHuntingMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="不同热点占比和局部加速倍数通过阿姆达尔定律换算成整体加速的比较图"
          className="grid gap-3 sm:grid-cols-2"
        >
          {amdahlCases.map((row, index) => (
            <section
              key={`${row.optimized}-${row.localSpeedup}`}
              className="min-h-60 border border-amber-500/35 bg-amber-500/10 p-4"
            >
              <span className="text-xs text-secondary">case 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">
                {row.optimized} · {row.localSpeedup}
              </strong>
              <code className="mt-4 block break-words text-xs text-accent">
                {row.total}
              </code>
              <p className="mb-0 mt-4 text-xs text-secondary">{row.lesson}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        90/10 rule 用 profile 寻找“大猎物”，Amdahl&apos;s law
        则在动手前计算局部优化对端到端结果的理论上限。
      </figcaption>
    </figure>
  );
}

const experimentStages = [
  {
    stage: "Question + goal",
    artifact: "metric, workload, correctness, target",
    reject: "faster is not defined",
    tone: "border-cyan-500/35 bg-cyan-500/10",
  },
  {
    stage: "Baseline",
    artifact: "version, machine, build, samples, counters",
    reject: "no comparable before state",
    tone: "border-violet-500/35 bg-violet-500/10",
  },
  {
    stage: "One controlled change",
    artifact: "hypothesis, diff, fixed inputs, repetitions",
    reject: "multiple causes moved together",
    tone: "border-rose-500/35 bg-rose-500/10",
  },
  {
    stage: "Decision + guard",
    artifact: "effect, uncertainty, correctness, regression test",
    reject: "noise or shifted cost is reported as a win",
    tone: "border-emerald-500/35 bg-emerald-500/10",
  },
] as const;

export function OpcPerformanceExperimentLoopMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="问题目标基线单变量实验决策回归守卫组成的性能实验闭环图"
          className="grid gap-3 lg:grid-cols-4"
        >
          {experimentStages.map((row, index) => (
            <section
              key={row.stage}
              className={`relative min-h-72 border p-4 ${row.tone}`}
            >
              <span className="text-xs text-secondary">stage 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">
                {row.stage}
              </strong>
              <code className="mt-4 block break-words text-xs text-accent">
                {row.artifact}
              </code>
              <p className="mb-0 mt-4 text-xs text-secondary">{row.reject}</p>
              {index < experimentStages.length - 1 ? (
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
        lab notebook
        保存的不只是“快了多少”，还要保存问题、环境、样本、代码版本、 correctness
        和拒绝条件，使任何结论都能被再次执行。
      </figcaption>
    </figure>
  );
}

const measurementLayers = [
  {
    layer: "Production / scenario trace",
    bestFor: "end-to-end goal and representative workload",
    observes: "latency, throughput, CPU, memory, queue and tails",
    blindSpot: "harder attribution and uncontrolled variance",
  },
  {
    layer: "Sampling profiler",
    bestFor: "long-running code and hot spots",
    observes: "where execution time accumulates",
    blindSpot: "short runs, inlining and sampling resolution",
  },
  {
    layer: "Stopwatch region",
    bestFor: "one operation in realistic context",
    observes: "elapsed distribution around a chosen boundary",
    blindSpot: "timer overhead and surrounding interference",
  },
  {
    layer: "Micro test harness",
    bestFor: "individual C++ statements and loops",
    observes: "amortized cost under controlled inputs",
    blindSpot: "dead-code elimination and lost system context",
  },
] as const;

export function OpcMeasurementLayerMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="生产追踪采样分析器局部计时和微基准测试夹具四层性能测量工具选择图"
          className="space-y-3"
        >
          {measurementLayers.map((row, index) => (
            <section
              key={row.layer}
              className="grid min-h-40 gap-3 border border-sky-500/30 bg-sky-500/10 p-4 lg:grid-cols-[0.8fr_1.2fr_1.3fr_1.15fr] lg:items-center"
            >
              <div>
                <span className="text-xs text-secondary">
                  layer 0{index + 1}
                </span>
                <strong className="mt-2 block text-sm text-primary">
                  {row.layer}
                </strong>
              </div>
              <span className="text-xs text-primary">{row.bestFor}</span>
              <code className="break-words text-xs text-accent">
                {row.observes}
              </code>
              <span className="text-xs text-secondary">{row.blindSpot}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        从端到端目标向下钻到 micro
        cost，再回到真实场景验证；任何一层都不能独自证明 product performance
        已改善。
      </figcaption>
    </figure>
  );
}
